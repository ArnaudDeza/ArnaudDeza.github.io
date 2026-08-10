---
layout: archive
title: "CV"
permalink: /cv-json/
author_profile: false
sitemap: false
noindex: true
redirect_from:
  - /resume-json
---

{% include base_path %}

{% include cv-template.html %}

<div class="cv-download-links">
  {% assign cv_pdf = site.static_files | where: "path", "/files/cv.pdf" | first %}
  {% if cv_pdf %}<a href="{{ base_path }}/files/cv.pdf" class="btn btn--primary">Download CV as PDF</a>{% endif %}
  <a href="{{ base_path }}/cv/" class="btn btn--inverse">View CV</a>
</div>
