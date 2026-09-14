"""Check public outbound links from sitemap pages; report blocked checks separately."""
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit, urlunsplit
from urllib.request import Request, urlopen
import json
import sys
import xml.etree.ElementTree as ET


class Links(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.urls = set()
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            parts = urlsplit(dict(attrs).get('href', ''))
            if parts.scheme in ('http', 'https') and parts.hostname != 'arnauddeza.github.io':
                self.urls.add(urlunsplit(parts._replace(fragment='')))


def probe(url):
    try:
        request = Request(url, headers={'User-Agent': 'ArnaudDeza-Website-Link-Check/1.0'})
        with urlopen(request, timeout=20) as response:
            return response.status
    except HTTPError as error:
        return error.code
    except (URLError, TimeoutError, OSError, ValueError) as error:
        return type(error).__name__


def check(url):
    status = probe(url)
    # A second request confirms permanent missing links; anti-bot responses are inconclusive.
    broken = status in (404, 410) and probe(url) in (404, 410)
    outcome = 'broken' if broken else 'ok' if isinstance(status, int) and 200 <= status < 400 else 'unverified'
    return {'url': url, 'status': status, 'outcome': outcome}


def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else '_site')
    urls = set()
    for loc in ET.parse(root / 'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
        path = root / urlsplit(loc.text).path.lstrip('/')
        if path.is_dir():
            path /= 'index.html'
        if path.suffix == '.html':
            urls.update(Links(path.read_text()).urls)
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(check, sorted(urls)))
    output = Path('quality-reports')
    output.mkdir(exist_ok=True)
    (output / 'external-links.json').write_text(json.dumps(results, indent=2) + '\n')
    rows = ['# External link check', '', 'Blocked/time-out responses are unverified, not proof a link is broken.', '', '| Result | HTTP/status | URL |', '|---|---|---|']
    rows += [f"| {r['outcome']} | {r['status']} | {r['url']} |" for r in results]
    (output / 'external-links.md').write_text('\n'.join(rows) + '\n')
    counts = {kind: sum(r['outcome'] == kind for r in results) for kind in ('ok', 'broken', 'unverified')}
    print(f'External links: {counts}; details in quality-reports/external-links.md')
    for result in results:
        if result['outcome'] == 'broken':
            print(result['status'], result['url'])
    raise SystemExit(bool(counts['broken']))


if __name__ == '__main__':
    main()
