// Verify navigation and keep event payloads restricted to public publication paths.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('assets/js/analytics-events.js', 'utf8');
function setup(publicationId = null, readyState = 'complete', analytics = true) {
  const calls = [];
  const handlers = {};
  const context = {
    URL,
    window: {location: {href: 'https://arnauddeza.github.io/publication/example'}},
    document: {
      readyState,
      querySelector: () => publicationId ? {getAttribute: () => publicationId} : null,
      addEventListener: (name, handler) => { handlers[name] = handler; }
    }
  };
  if (analytics) context.window.gtag = (...args) => calls.push(JSON.parse(JSON.stringify(args)));
  vm.runInNewContext(source, context);
  const click = (attributes, inContent = true) => handlers.click({target: {closest: () => ({
    getAttribute: key => attributes[key] || null,
    closest: () => inContent ? {} : null
  })}});
  return {calls, handlers, context, click};
}
const home = setup();
assert.equal(home.calls.length, 0);
home.click({href: 'mailto:private@example.com?subject=Private&body=secret'});
assert.deepEqual(home.calls, [['event', 'email_click', {}]]);
const paper = setup('/publication/example', 'loading');
assert.equal(paper.calls.length, 0);
paper.handlers.DOMContentLoaded();
paper.click({'data-analytics-event': 'paper_click', 'data-publication-id': '/publication/example'});
paper.context.window.trackResearchInteraction('bibtex_copy', '/publication/example');
paper.click({href: 'https://github.com/author/project?private=secret'});
paper.click({href: 'mailto:private@example.com?body=secret'});
assert.deepEqual(paper.calls, [
  ['event', 'publication_view', {publication_id: '/publication/example'}],
  ['event', 'paper_click', {publication_id: '/publication/example'}],
  ['event', 'bibtex_copy', {publication_id: '/publication/example'}],
  ['event', 'code_click', {publication_id: '/publication/example'}],
  ['event', 'email_click', {publication_id: '/publication/example'}]
]);
paper.click({href: 'https://github.com/author'}, false);
paper.click({href: 'https://github.com.evil.example/project'});
paper.click({href: 'javascript:alert(1)'});
paper.context.window.trackResearchInteraction('arbitrary_event', '/publication/example');
paper.context.window.trackResearchInteraction('paper_click', '/publication/example?email=private@example.com');
paper.context.window.trackResearchInteraction('bibtex_copy', 'clipboard content');
paper.handlers.click({target: {}});
assert.equal(paper.calls.length, 5);
assert.equal(setup('/publication/example').calls.length, 1);
assert.equal(setup('/publication/example?private=secret').calls.length, 0);
const unavailable = setup('/publication/example', 'complete', false);
assert.doesNotThrow(() => unavailable.click({href: 'mailto:person@example.com'}));
paper.context.window.gtag = () => { throw new Error('Analytics unavailable'); };
assert.doesNotThrow(() => paper.context.window.trackResearchInteraction('bibtex_copy', '/publication/example'));
assert.doesNotThrow(() => paper.click({href: 'mailto:person@example.com'}));
console.log('PASS: research views/actions, email intent, code-link scope, missing analytics, and payload restrictions');
