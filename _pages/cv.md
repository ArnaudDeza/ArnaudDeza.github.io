---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
archive_class: archive--cv
hide_title: true
redirect_from:
  - /resume
---

<section class="cv-hero">
  <p>My work sits at the intersection of machine learning, optimization, and decision-making systems, with a focus on large-scale optimization for supply chain, logistics, manufacturing, and solver workflows.</p>
</section>

<section class="cv-panel cv-panel--wide">
  <h2>Research Interests</h2>
  <div class="tag-list cv-tags">
    {% for interest in site.author.research_interests %}
      <span>{{ interest }}</span>
    {% endfor %}
  </div>
</section>

<div class="cv-grid">
  <section class="cv-panel">
    <h2>Education</h2>
    <article class="cv-entry">
      <img class="entity-logo" src="/images/GTVertical_RGB.svg" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">2024-Present</p>
        <h3>PhD in Machine Learning</h3>
        <p>Georgia Institute of Technology, ISyE</p>
        <p>Supervised by <a href="https://scholar.google.com/citations?user=GxFQz-4AAAAJ&amp;hl=en">Pascal Van Hentenryck</a>.</p>
      </div>
    </article>
    <article class="cv-entry">
      <img class="entity-logo" src="/images/uni_toronto.png" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">2022-2024</p>
        <h3>MASc in Industrial Engineering</h3>
        <p>University of Toronto, MIE Department</p>
        <p>Supervised by <a href="https://scholar.google.com/citations?user=juqDWQMAAAAJ&amp;hl=en">Elias Khalil</a>.</p>
      </div>
    </article>
    <article class="cv-entry">
      <img class="entity-logo" src="/images/uni_toronto.png" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">2018-2022</p>
        <h3>BASc in Engineering Science</h3>
        <p>Machine Learning, University of Toronto</p>
      </div>
    </article>
  </section>

  <section class="cv-panel">
    <h2>Experience</h2>
    <article class="cv-entry">
      <img class="entity-logo" src="/images/amazon-ar21.svg" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date"><span>Fall 2026</span><span class="cv-entry__location">Luxembourg, LU</span></p>
        <h3>Incoming Applied Scientist</h3>
        <p>Amazon</p>
      </div>
    </article>
    <article class="cv-entry">
      <img class="entity-logo" src="/images/salesforce-2.svg" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date"><span>Summer 2026</span><span class="cv-entry__location">San Francisco, CA</span></p>
        <h3>Applied Scientist</h3>
        <p>Salesforce</p>
      </div>
    </article>
    <article class="cv-entry">
      <img class="entity-logo" src="/images/AI4OPT-Logo-2.png" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">2024-Present</p>
        <h3>Graduate Researcher</h3>
        <p>AI Institute for Advances in Optimization</p>
      </div>
    </article>
    <article class="cv-entry">
      <img class="entity-logo" src="/images/Huawei_Standard_logo.svg" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date"><span>Summer 2023</span><span class="cv-entry__location">Vancouver, BC</span></p>
        <h3>Research Engineer</h3>
        <p>Huawei Technologies Canada</p>
      </div>
    </article>
  </section>
</div>

<section class="cv-panel cv-panel--wide">
  <h2>Selected Publications</h2>
  <div class="cv-publications">
    {% for publication in site.publications reversed limit: 4 %}
      <article class="cv-publication">
        <h3>{{ publication.title }}</h3>
        {% if publication.citation %}
          {% assign highlighted_citation = publication.citation | replace: "Deza, A.", "<strong>Deza, A.</strong>" | replace: "Arnaud Deza", "<strong>Arnaud Deza</strong>" %}
          <p>{{ highlighted_citation }}</p>
        {% endif %}
        {% if publication.paperurl %}
          <a class="cv-link" href="{{ publication.paperurl }}">Paper</a>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</section>
