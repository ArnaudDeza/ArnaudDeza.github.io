(function () {
  var root = document.documentElement;
  var storageKey = "site-palette";
  var palettes = {
    default: "#ffffff",
    sage: "#f7faf4",
    ocean: "#f6fbff",
    slate: "#f7f9fb",
    sand: "#fffaf0",
    rose: "#fff7f8",
    coral: "#fff7f3",
    tangerine: "#fff8ed",
    amber: "#fffbea",
    honey: "#fbf8e8",
    olive: "#f7faee",
    moss: "#f4faf0",
    pine: "#f2faf5",
    teal: "#f1fbfa",
    aqua: "#f0fbff",
    sky: "#f3f9ff",
    cobalt: "#f5f8ff",
    indigo: "#f7f7ff",
    violet: "#faf7ff",
    plum: "#fcf7ff",
    magenta: "#fff6fc",
    ruby: "#fff6f6",
    graphite: "#f8f8f7",
    zinc: "#f8f9fb",
    pearl: "#fbfaf7",
    lagoon: "#f2fbf8",
    denim: "#f4f8fc",
    orchid: "#fcf7fd",
    copper: "#fff8f2",
    espresso: "#fbf7f3"
  };

  function isValidPalette(value) {
    return Object.prototype.hasOwnProperty.call(palettes, value);
  }

  function syncThemeColor(value) {
    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute("content", palettes[value]);
    }
  }

  function applyPalette(value, select) {
    if (!isValidPalette(value)) {
      value = "default";
    }

    if (value === "default") {
      root.removeAttribute("data-palette");
    } else {
      root.setAttribute("data-palette", value);
    }

    localStorage.setItem(storageKey, value);
    if (select) {
      select.value = value;
    }
    syncThemeColor(value);
  }

  function initPalettePicker() {
    var select = document.getElementById("palette-select");
    applyPalette(localStorage.getItem(storageKey) || "default", select);

    if (select) {
      ["input", "change"].forEach(function (eventName) {
        select.addEventListener(eventName, function (event) {
          applyPalette(event.target.value, select);
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPalettePicker);
  } else {
    initPalettePicker();
  }
})();
