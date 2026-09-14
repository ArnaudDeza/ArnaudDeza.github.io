import lighthouse from 'lighthouse';
import {launch} from 'chrome-launcher';
import {createServer} from 'node:http';
import {readFile, mkdir, writeFile, stat} from 'node:fs/promises';
import {resolve, extname, sep} from 'node:path';

const root = resolve('_site');
const output = resolve('quality-reports/lighthouse');
const types = {'.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2'};
const server = createServer(async (request, response) => {
  try {
    let path = resolve(root, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
    if (path !== root && !path.startsWith(root + sep)) throw new Error('Invalid path');
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
    response.setHeader('Content-Type', types[extname(path)] || 'application/octet-stream');
    response.end(await readFile(path));
  } catch {
    response.writeHead(404).end('Not found');
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
await mkdir(output, {recursive: true});
let chrome;
const summary = [];
let failed = false;
try {
  chrome = await launch({chromeFlags: ['--headless', ...(process.env.CI ? ['--no-sandbox'] : [])]});
  for (const [name, path] of [['home', '/'], ['publications', '/publications/'], ['cv', '/cv/']]) {
    const scores = [];
    for (let run = 1; run <= 3; run++) {
      const result = await lighthouse(`http://127.0.0.1:${server.address().port}${path}`, {
        port: chrome.port, output: ['html', 'json'], logLevel: 'error',
        blockedUrlPatterns: ['*googletagmanager.com/*', '*google-analytics.com/*']
      });
      if (result.lhr.runtimeError) throw new Error(`${name}: ${result.lhr.runtimeError.message}`);
      await writeFile(resolve(output, `${name}-${run}.html`), result.report[0]);
      await writeFile(resolve(output, `${name}-${run}.json`), result.report[1]);
      scores.push(Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, value.score])));
    }
    const medians = Object.fromEntries(Object.keys(scores[0]).map(key => [key, scores.map(score => score[key]).sort((a, b) => a - b)[1]]));
    summary.push({page: path, scores: medians});
    console.log(path, medians);
    if (medians.performance < 0.8) console.log(`::warning::${path} mobile performance is below 80`);
    if (medians.accessibility < 0.95 || medians['best-practices'] < 0.95 || medians.seo < 1) {
      failed = true;
      console.log(`::error::${path} failed the accessibility, best-practices or SEO threshold`);
    }
  }
} finally {
  if (chrome) await chrome.kill();
  await new Promise(resolve => server.close(resolve));
  await writeFile(resolve(output, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
  const lines = ['## Mobile Lighthouse (median of three runs)', '', '| Page | Performance | Accessibility | Best practices | SEO |', '|---|---:|---:|---:|---:|'];
  for (const row of summary) lines.push(`| ${row.page} | ${['performance', 'accessibility', 'best-practices', 'seo'].map(key => Math.round(row.scores[key] * 100)).join(' | ')} |`);
  lines.push('', 'CI lab measurements with Analytics requests blocked; not real-user traffic metrics.');
  await writeFile(resolve(output, 'summary.md'), lines.join('\n') + '\n');
  if (process.env.GITHUB_STEP_SUMMARY) await writeFile(process.env.GITHUB_STEP_SUMMARY, lines.join('\n') + '\n', {flag: 'a'});
}
if (failed) process.exitCode = 1;
