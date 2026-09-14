// Verify tracking does not break navigation or send arbitrary/private payloads.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const calls = [];
let click;
const context = {window: {}, document: {addEventListener: (name, handler) => { click = handler; }}};
vm.runInNewContext(fs.readFileSync('assets/js/analytics-events.js', 'utf8'), context);
assert.doesNotThrow(() => context.window.trackResearchInteraction('paper_click', '/publication/example'));
context.window.gtag = (...args) => calls.push(JSON.parse(JSON.stringify(args)));
click({target: {closest: () => ({getAttribute: key => ({'data-analytics-event': 'paper_click', 'data-publication-id': '/publication/example'})[key]})}});
context.window.trackResearchInteraction('bibtex_copy', '/publication/example');
context.window.trackResearchInteraction('arbitrary_event', '/publication/example');
context.window.trackResearchInteraction('paper_click', '/publication/example?email=private@example.com');
context.window.trackResearchInteraction('bibtex_copy', 'clipboard content');
click({target: {}});
assert.deepEqual(calls, [
  ['event', 'paper_click', {publication_id: '/publication/example'}],
  ['event', 'bibtex_copy', {publication_id: '/publication/example'}]
]);
context.window.gtag = () => { throw new Error('Analytics unavailable'); };
assert.doesNotThrow(() => context.window.trackResearchInteraction('bibtex_copy', '/publication/example'));
console.log('PASS: interaction events, missing analytics, and payload restrictions');
