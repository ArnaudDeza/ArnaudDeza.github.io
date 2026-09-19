/* Public research interactions; this file is loaded only with production GA4. */
(function () {
  "use strict";

  function validPublication(publicationId) {
    return typeof publicationId === "string" &&
      /^\/publication\/[a-zA-Z0-9_/-]+$/.test(publicationId);
  }

  function currentPublication() {
    var page = document.querySelector("article[data-publication-id]");
    return page && page.getAttribute("data-publication-id");
  }

  window.trackResearchInteraction = function (eventName, publicationId) {
    var researchEvent = ["paper_click", "bibtex_copy", "publication_view", "code_click"].includes(eventName);
    if ((!researchEvent && eventName !== "email_click") ||
        (researchEvent && !validPublication(publicationId)) ||
        typeof window.gtag !== "function") {
      return;
    }
    var parameters = {};
    if (validPublication(publicationId)) parameters.publication_id = publicationId;
    // Never send email addresses, destination query strings, or clipboard contents.
    try {
      window.gtag("event", eventName, parameters);
    } catch (_) {
      // Analytics must not interrupt navigation or a successful citation copy.
    }
  };

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a");
    if (!link) return;
    var explicitEvent = link.getAttribute("data-analytics-event");
    if (explicitEvent) {
      window.trackResearchInteraction(
        explicitEvent,
        link.getAttribute("data-publication-id")
      );
      return;
    }
    var href = link.getAttribute("href") || "";
    if (/^mailto:/i.test(href)) {
      window.trackResearchInteraction("email_click", currentPublication());
    } else if (link.closest(".page__content") && validPublication(currentPublication())) {
      try {
        var destination = new URL(href, window.location.href);
        if (destination.protocol === "https:" &&
            ["github.com", "gitlab.com", "bitbucket.org"].includes(destination.hostname)) {
          window.trackResearchInteraction("code_click", currentPublication());
        }
      } catch (_) { /* An invalid link must not interrupt navigation. */ }
    }
  });

  function trackPublicationView() {
    window.trackResearchInteraction("publication_view", currentPublication());
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackPublicationView, {once: true});
  } else {
    trackPublicationView();
  }
}());
