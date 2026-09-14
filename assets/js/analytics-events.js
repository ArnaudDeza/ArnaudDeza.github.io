/* Public research interactions; this file is loaded only with production GA4. */
(function () {
  "use strict";

  window.trackResearchInteraction = function (eventName, publicationId) {
    if (!["paper_click", "bibtex_copy"].includes(eventName) ||
        typeof publicationId !== "string" ||
        !/^\/publication\/[a-zA-Z0-9_/-]+$/.test(publicationId) ||
        typeof window.gtag !== "function") {
      return;
    }
    // Send only the public publication path, never clipboard contents or form data.
    window.gtag("event", eventName, {publication_id: publicationId});
  };

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[data-analytics-event]");
    if (link) {
      window.trackResearchInteraction(
        link.getAttribute("data-analytics-event"),
        link.getAttribute("data-publication-id")
      );
    }
  });
}());
