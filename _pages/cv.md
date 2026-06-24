---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
archive_class: archive--cv
redirect_from:
  - /resume
---

{% include base_path %}


<div class="cv-grid">
  <section class="cv-panel">
    <h2>Education</h2>
    <div class="cv-entry">
      <img class="entity-logo" src="/images/Georgia-Tech-Logo.jpg" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">2024-Present</p>
        <h3>PhD in Machine Learning</h3>
        <p>Georgia Institute of Technology (ISyE)</p>
      </div>
    </div>
    <div class="cv-entry">
      <img class="entity-logo" src="/images/uni_toronto.png" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">2022-2024</p>
        <h3>MASc in Industrial Engineering</h3>
        <p>University of Toronto</p>
      </div>
    </div>
    <div class="cv-entry">
      <img class="entity-logo" src="/images/uni_toronto.png" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">2018-2022</p>
        <h3>BASc in Engineering Science</h3>
        <p>Machine Intelligence, University of Toronto</p>
      </div>
    </div>
  </section>

  <section class="cv-panel">
    <h2>Work Experience</h2>
    <div class="cv-entry">
      <img class="entity-logo" src="/images/amazon_logo.jpeg" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">Fall 2026</p>
        <h3>Incoming Applied Scientist</h3>
        <p>Amazon</p>
      </div>
    </div>
    <div class="cv-entry">
      <img class="entity-logo" src="/images/Salesforce%20Logo.jpeg" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">Summer 2026</p>
        <h3>Applied Scientist</h3>
        <p>Salesforce</p>
      </div>
    </div>
    <div class="cv-entry">
      <img class="entity-logo" src="/images/Georgia-Tech-Logo.jpg" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">2024-Present</p>
        <h3>Graduate Researcher</h3>
        <p>AI Institute for Advances in Optimization</p>
      </div>
    </div>
    <div class="cv-entry">
      <img class="entity-logo" src="/images/Huawei_Standard_logo.svg" alt="" onerror="this.hidden=true">
      <div>
        <p class="cv-entry__date">Summer 2023</p>
        <h3>Research Engineer</h3>
        <p>Huawei Technologies Canada, Vancouver Research Centre</p>
      </div>
    </div>
  </section>

  <section class="cv-panel">
    <h2>Research Interests</h2>
    <div class="tag-list cv-tags">
      <span>Machine learning for optimization</span>
      <span>Operations research</span>
      <span>Large-scale optimization</span>
      <span>Discrete optimization</span>
      <span>Optimization solvers</span>
      <span>Supply chain, logistics, and manufacturing</span>
    </div>
  </section>

  <section class="cv-panel">
    <h2>Fellowships and Funding</h2>
    <div class="cv-entry cv-entry--plain">
      <div>
        <h3>ISyE Presidential Herren Fellowship</h3>
        <p>Georgia Institute of Technology</p>
      </div>
    </div>
    <div class="cv-entry cv-entry--plain">
      <div>
        <h3>NSERC CGS-M</h3>
        <p>University of Toronto</p>
      </div>
    </div>
  </section>
</div>

<section class="cv-panel cv-panel--wide">
  <h2>Publications</h2>
  <div class="cv-publications">
    {% for post in site.publications reversed %}
      <article class="cv-publication">
        <h3><a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a></h3>
        {% assign pub_year = post.date | default: "1900-01-01" | date: "%Y" %}
        {% if post.venue %}
          <p class="cv-entry__date">{{ post.venue }}, {{ pub_year }}</p>
        {% endif %}
        {% if post.citation %}
          <p>{{ post.citation }}</p>
        {% endif %}
        {% if post.paperurl %}
          <a class="cv-link" href="{{ post.paperurl }}">Paper</a>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</section>

<div class="cv-grid">
  <section class="cv-panel">
    <h2>Teaching</h2>
    <div class="cv-entry cv-entry--plain">
      <div>
        <h3>University of Toronto</h3>
        <p>MIE1622, MIE1624, MIE262, MIE424, CSC343</p>
        <p class="cv-entry__date">Teaching Assistant, 2023-2024</p>
      </div>
    </div>
  </section>

  <section class="cv-panel">
    <h2>Selected Skills</h2>
    <div class="tag-list cv-tags">
      <span>Machine learning</span>
      <span>Discrete optimization</span>
      <span>Graph neural networks</span>
      <span>Optimization modeling</span>
      <span>Generative AI</span>
      <span>Research communication</span>
    </div>
  </section>
</div>

<section class="cv-panel cv-panel--wide">
  <h2>Outreach</h2>
  <div class="cv-entry cv-entry--plain">
    <div>
      <h3>AI4OPT Seth Bonder Camp 2025</h3>
      <p>Designed Level 4 GenAI course materials for Atlanta high school students.</p>
    </div>
  </div>
</section>
