---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
archive_class: archive--cv
redirect_from:
  - /resume
---

<section class="cv-hero">
  <p>My work sits at the intersection of machine learning, optimization, and decision-making systems, with a focus on large-scale optimization for supply chain, logistics, manufacturing, and solver workflows.</p>
  <div class="cv-quick-grid">
    <article>
      <strong>Current Role</strong>
      <span>PhD Student in Machine Learning, Georgia Tech</span>
    </article>
    <article>
      <strong>Research Home</strong>
      <span>AI Institute for Advances in Optimization</span>
    </article>
    <article>
      <strong>Contact</strong>
      <span><a href="mailto:adeza3@gatech.edu">adeza3@gatech.edu</a></span>
    </article>
  </div>
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
      <img class="entity-logo" src="/images/Georgia-Tech-Logo.jpg" alt="" onerror="this.hidden=true">
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
      <img class="entity-logo" src="/images/amazon_logo.jpeg" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">Fall 2026</p>
        <h3>Incoming Applied Scientist</h3>
        <p>Amazon</p>
      </div>
    </article>
    <article class="cv-entry">
      <img class="entity-logo" src="/images/Salesforce%20Logo.jpeg" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">Summer 2026</p>
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
        <p class="cv-entry__date">Summer 2023</p>
        <h3>Research Engineer</h3>
        <p>Huawei Technologies Canada, Vancouver Research Centre</p>
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
