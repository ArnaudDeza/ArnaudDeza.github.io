(function () {
  var select = document.getElementById("palette-select");
  var root = document.documentElement;
  var storageKey = "site-palette";
  var palettes = ["default", "sage", "ocean", "plum", "sand"];

  function isValidPalette(value) {
    return palettes.indexOf(value) !== -1;
  }

  function applyPalette(value) {
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
  }

  applyPalette(localStorage.getItem(storageKey) || "default");

  if (select) {
    select.addEventListener("change", function (event) {
      applyPalette(event.target.value);
    });
  }
})();
