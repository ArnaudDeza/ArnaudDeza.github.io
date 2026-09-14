# Arnaud Deza's personal website

Source for https://arnauddeza.github.io/, built with Jekyll on GitHub Pages.
Based on [Academic Pages](https://github.com/academicpages/academicpages.github.io).
The original theme license remains in LICENSE.

## Content map

- `_pages/about.md`: homepage, current position, news.
- `_pages/publications.html` and `_publications/`: publication list and individual papers.
- `_pages/cv.md`: CV (the active CV is Markdown, not `_data/cv.json`).
- `_pages/teaching.html`: teaching experience.
- `_config.yml`: identity, profile links, analytics, build settings.
- `_data/navigation.yml`: primary navigation.
- `_includes/seo.html`: canonical URLs, descriptions, social previews, structured identity data.
- `_sass/_custom.scss`: personal styling over the inherited theme.

## Preview and build

```sh
bundle install
npm install
npm run build:js
bundle exec jekyll serve --host 127.0.0.1
```

Local development previews omit Google Analytics so test visits do not pollute reporting.
For a build matching production (including the existing GA4 tag):

```sh
JEKYLL_ENV=production bundle exec jekyll build --safe
python3 scripts/check_site.py _site
```

GitHub Pages publishes from `master`; pushing is a separate release action.
A local build does not publish the site.

## Optimized assets

Font subsets and responsive profile images are checked in, so GitHub Pages needs no
extra Python build step. After adding icon classes to templates or changing the portrait:

```sh
python3 -m venv local/assets-venv
local/assets-venv/bin/pip install -r scripts/requirements-assets.txt
local/assets-venv/bin/python scripts/optimize_assets.py
```

The generator scans templates, content, data and JavaScript for icon classes. Keep icon
class names literal so they can be detected. It preserves original fonts and photographs.
Font Awesome and Academicons retain their upstream font/code license notices.

## Search and inherited files

Google Analytics tracks visits. Google Search Console is needed to inspect indexing,
Google-selected canonical URLs, sitemap processing, queries and search impressions.
Keep `googlec8980eec6bbc51ec.html` intact: it is an existing ownership-verification file.

Inactive template pages retain `noindex` and `sitemap: false`, allowing crawlers to see
the exclusion directive. Do not block those URLs in robots.txt. Sample files in `files/`
remain reachable for compatibility but are omitted from the XML sitemap. Review them
before deletion or replacing them with actual research PDFs. For a real PDF that should
be listed in the sitemap, override the `files` default in `_config.yml` for that path.

Unused theme layouts, demo content, the JSON CV generator, talk-map notebooks and old
image variants are candidates for a later deletion pass after checking historical URLs.
