(function () {
  var root = document.documentElement;
  var storageKey = "site-palette";
  var palettes = {
    default: "#ffffff",
    sage: "#f7faf4",
    ocean: "#f6fbff",
    plum: "#fbf8fc",
    sand: "#fffaf0"
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
