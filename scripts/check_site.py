"""Check generated public pages for SEO regressions and broken local references.

Usage: python3 scripts/check_site.py _site
No third-party dependencies. Run against a production Jekyll build.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import sys
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.meta, self.canonicals, self.refs, self.jsonld = [], [], [], []
        self.h1 = 0
        self.title = ''
        self.in_title = False
        self.in_json = False
        self.json_text = ''
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta':
            self.meta.append(attrs)
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonicals.append(attrs.get('href'))
        if tag == 'h1':
            self.h1 += 1
        if tag == 'title':
            self.in_title = True
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.in_json = True
            self.json_text = ''
        if tag in ('a', 'img', 'script', 'source', 'link'):
            for key in ('href', 'src'):
                if attrs.get(key):
                    self.refs.append(attrs[key])
            if attrs.get('srcset'):
                self.refs.extend(part.strip().split()[0] for part in attrs['srcset'].split(','))

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'script' and self.in_json:
            self.jsonld.append(json.loads(self.json_text))
            self.in_json = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_json:
            self.json_text += data


def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else '_site').resolve()
    origin = 'https://arnauddeza.github.io'
    urls = [e.text for e in ET.parse(root / 'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    errors = []
    titles = set()
    descriptions = set()

    def check(condition, message):
        if not condition:
            errors.append(message)

    def resolve(url):
        path = root / unquote(urlsplit(url).path).lstrip('/')
        if path.is_dir():
            path /= 'index.html'
        if not path.exists() and not path.suffix:
            path = path.with_suffix('.html')
        return path

    for url in urls:
        check(url.startswith(origin + '/'), f'Wrong sitemap origin: {url}')
        check('/files/' not in url and '/images/logos/' not in url and 'googlec8980' not in url,
              f'Utility file advertised in sitemap: {url}')
        path = resolve(url)
        check(path.exists(), f'Missing sitemap target: {url}')
        if not path.exists() or path.suffix != '.html':
            continue
        page = Page(path.read_text())
        desc = [m.get('content', '') for m in page.meta if m.get('name') == 'description']
        check(len(desc) == 1 and bool(desc[0]), f'{url}: expected one nonempty description')
        check(page.canonicals == [url], f'{url}: canonical mismatch: {page.canonicals}')
        check(page.h1 == 1, f'{url}: expected one h1, got {page.h1}')
        check(bool(page.title) and page.title not in titles, f'{url}: missing/duplicate title')
        titles.add(page.title)
        if desc:
            check(desc[0] not in descriptions, f'{url}: duplicate description across pages')
            descriptions.add(desc[0])
        check(not any('noindex' in m.get('content', '') for m in page.meta if m.get('name') == 'robots'),
              f'{url}: noindex page advertised in sitemap')
        check(any(m.get('property') == 'og:image' for m in page.meta), f'{url}: missing social image')
        for reference in page.refs:
            parsed = urlsplit(reference)
            if parsed.scheme not in ('', 'http', 'https') or parsed.netloc not in ('', 'arnauddeza.github.io'):
                continue
            if not parsed.path or not parsed.path.startswith('/'):
                continue
            check(resolve(reference).exists(), f'{url}: broken reference {reference}')
    home = Page((root / 'index.html').read_text())
    check(len(home.jsonld) == 1, 'Homepage should have one consolidated JSON-LD block')
    graph = home.jsonld[0].get('@graph', []) if home.jsonld else []
    check({node.get('@type') for node in graph} == {'Person', 'WebSite', 'ProfilePage'}, 'Unexpected homepage identity graph')
    for demo in ('cv-json/index.html', 'collection-archive/index.html', '404.html'):
        page = Page((root / demo).read_text())
        check(any('noindex' in m.get('content', '') for m in page.meta if m.get('name') == 'robots'), f'{demo}: missing noindex')
    verification = root / 'googlec8980eec6bbc51ec.html'
    source = Path(__file__).resolve().parents[1] / verification.name
    check(verification.read_bytes() == source.read_bytes(), 'Google ownership file changed')
    homepage_html = (root / 'index.html').read_text()
    check('G-KBCZXG6MLQ' in homepage_html.split('</head>')[0], 'Production GA4 tag must be in head for Search Console verification')
    check(homepage_html.count('googletagmanager.com/gtag/js') == 1, 'Expected exactly one production GA4 loader')
    check('Disallow: /' not in (root / 'robots.txt').read_text(), 'robots.txt blocks crawlers')
    if errors:
        print('\n'.join(errors))
        raise SystemExit(1)
    print(f'PASS: {len(urls)} sitemap targets; metadata, identity graph, local references, noindex, verification and production analytics checked.')


if __name__ == '__main__':
    main()
