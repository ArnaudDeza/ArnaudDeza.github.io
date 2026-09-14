/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

// Determine the expected state of the theme toggle, which can be "dark", "light", or
// "system". Default is "system".
let determineThemeSetting = () => {
  let themeSetting;
  try { themeSetting = localStorage.getItem("theme"); } catch (_) { /* Storage may be disabled. */ }
  return (themeSetting != "dark" && themeSetting != "light" && themeSetting != "system") ? "system" : themeSetting;
};

// Determine the computed theme, which can be "dark" or "light". If the theme setting is
// "system", the computed theme is determined based on the user's system preference.
let determineComputedTheme = () => {
  let themeSetting = determineThemeSetting();
  if (themeSetting != "system") {
    return themeSetting;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

// Set the theme on page load or when explicitly called
let setTheme = (theme) => {
  const use_theme = theme || determineComputedTheme();

  if (use_theme === "dark") {
    $("html").attr("data-theme", "dark");
    $("#theme-icon").removeClass("fa-sun").addClass("fa-moon");
  } else if (use_theme === "light") {
    $("html").removeAttr("data-theme");
    $("#theme-icon").removeClass("fa-moon").addClass("fa-sun");
  }

  $("#theme-toggle button").attr({
    "aria-pressed": use_theme === "dark" ? "true" : "false",
    "aria-label": use_theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  });
};

// Toggle the theme manually
var toggleTheme = () => {
  const current_theme = $("html").attr("data-theme");
  const new_theme = current_theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", new_theme); } catch (_) { /* Keep the toggle usable without storage. */ }
  setTheme(new_theme);
};

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

// Read the Plotly data from the code block, hide it, and render the chart as a new node. Plotly is loaded
// only when a page actually contains a chart so ordinary pages do not download the large library.
let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  import('./theme.js').then(({ plotlyDarkLayout, plotlyLightLayout }) => {
    const plotlyScript = document.createElement('script');
    plotlyScript.src = 'https://cdn.plot.ly/plotly-3.3.0.min.js';
    plotlyScript.onload = () => {
      plotlyElements.forEach((elem) => {
        var jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
        if (jsonData.layout) {
          jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
        } else {
          jsonData.layout = { template: theme };
        }
        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    };
    plotlyScript.onerror = () => console.error('Unable to load Plotly for this page.');
    document.head.appendChild(plotlyScript);
  });
}

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS - These should be the same as the settings in the relevant files 
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss
  const scssMastheadHeight = 70;  // pixels, from the current theme (e.g., /_sass/theme/_default.scss)

  // If the user hasn't chosen a theme, follow the OS preference
  setTheme();
  window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener("change", (e) => {
          if (determineThemeSetting() === "system") {
            setTheme(e.matches ? "dark" : "light");
          }
        });

  // Enable the theme toggle
  $('#theme-toggle').on('click', toggleTheme);

  // Enable the sticky footer
  var bumpIt = function () {
    $("body").css("padding-bottom", "0");
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  }
  let resizeFrame;
  $(window).on('resize', function () {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(bumpIt);
  });
  bumpIt();

  // FitVids init
  fitvids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    const button = $(".author__urls-wrapper button");
    button.toggleClass("open").attr("aria-expanded", button.hasClass("open") ? "true" : "false");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

  // Init smooth scroll, this needs to be slightly more than then fixed masthead height
  $("a").smoothScroll({
    offset: -scssMastheadHeight,
    preventDefault: false,
  });

});
