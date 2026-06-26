make default mode light and not dark!
make logos better and crop images
move research interests back in main column above news
make the rectanlge for news less tall vertically now that we decrease text size
add photos or visualizations to the papers

add [BibTeX] button to papers section

2. Clean up template/demo pages immediately

This is the biggest issue I saw. Some pages still contain AcademicPages template content, which can dilute the quality/identity signal for your site.

Examples:

Your /cv-json/ page still shows “Your Sidebar Name,” none@example.org, “Red Brick University,” and “GitHub University.”
Your collection archive includes placeholder portfolio items and fake talks like “Portfolio item number 1” and “Talk 1 on Relevant Topic in Your Field.”
Your GitHub display name appears as “Arrnaud Deza” with two r’s, while the rest of your branding uses Arnaud Deza. Fix that typo in your GitHub profile.

Delete those pages, rewrite them, or mark them noindex. For Jekyll sitemap exclusion, add this to unwanted pages’ front matter:

---
sitemap: false
---

The jekyll-sitemap plugin supports sitemap: false for excluding pages from the sitemap. For pages you truly do not want in Google, add a robots noindex meta tag; Google documents this exact pattern:

<meta name="robots" content="noindex">



4. Add structured data for your identity

Add ProfilePage / Person JSON-LD to your homepage:

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Arnaud Deza",
    "alternateName": "ArnaudDeza",
    "url": "https://arnauddeza.github.io/",
    "jobTitle": "PhD Student in Machine Learning",
    "affiliation": {
      "@type": "Organization",
      "name": "Georgia Institute of Technology"
    },
    "sameAs": [
      "https://github.com/ArnaudDeza/",
      "https://scholar.google.com/citations?user=Lg-EG54AAAAJ",
      "https://www.isye.gatech.edu/users/arnaud-deza"
    ]
  }
}
</script>
Run

Google’s ProfilePage documentation says this markup helps Google understand profile pages about people or organizations, and recommends validating it with the Rich Results Test and URL Inspection.