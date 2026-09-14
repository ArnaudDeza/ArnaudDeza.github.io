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
npm ci
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

## Tracking and quality reports

The production site retains GA4 `G-KBCZXG6MLQ`. `assets/js/analytics-events.js`
adds two research events: `paper_click` on labeled paper links and `bibtex_copy`
only after a successful copy. Both send a public `publication_id` path; no citation
clipboard contents are sent. Register `publication_id` as an event-scoped custom
dimension in GA4 to break down interactions by paper. Historical clicks cannot be
reconstructed; collection starts after deployment.

Use GA4 enhanced measurement for outbound profile links and PDF download-link clicks;
these are separate from the custom research events and should not be summed as unique
interactions. CV page views work today; a downloadable CV button appears only when
`files/cv.pdf` exists. Development builds omit analytics. Lighthouse blocks Analytics
requests so automated test visits are not counted.

The **Website quality** GitHub Actions workflow runs on master pushes and pull requests,
and can be run manually from Actions. It builds Jekyll, validates sitemap pages and local
links, tests interaction tracking, checks public outbound links, and runs three mobile
Lighthouse samples for the homepage, publications and CV. Download the
`website-quality-reports` artifact for HTML Lighthouse reports and link-check results.
Performance below 80 produces a warning; accessibility/best-practices below 95 or SEO
below 100 fail the check. Scores use median runs and are CI lab data, not real-user scores.
Third-party 403/429/time-out responses are marked unverified; only repeated 404/410
responses are classified as broken. Reports stay in GitHub artifacts for 30 days.

GitHub Pages still publishes master independently of these checks. Review a pull
request's quality results before merging if you want to catch issues before publication;
the workflow does not claim to block direct master deployments.

Run locally:

```sh
npm ci
npm run build:js
node scripts/test_analytics_events.cjs
JEKYLL_ENV=production bundle exec jekyll build --safe
python3 scripts/check_site.py _site
python3 scripts/check_external_links.py _site
node scripts/lighthouse_reports.mjs
```
