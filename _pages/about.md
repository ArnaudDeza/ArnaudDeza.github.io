---
permalink: /
title: "Arnaud Deza"
author_profile: true
page_class: page--home
redirect_from: 
  - /about/
  - /about.html
---

<div class="home-layout">
  <main class="home-main">
    <p>I am currently a second year PhD student in the Machine Learning program at Georgia Tech supervised by <a href="https://scholar.google.com/citations?user=GxFQz-4AAAAJ&amp;hl=en">Pascal Van Hentenryck</a>. At Georgia Tech, I am a part of the <a href="https://www.ai4opt.org/">National Science Foundation AI Research Institute for Advances in Optimization</a> where I work on machine learning for large scale optimization in supply chain, logistics and manufacturing. I am grateful to be funded by the ISyE Presidential Herren Fellowship.</p>

    <p>Prior to Georgia Tech, I completed a MASc at the University of Toronto in the Industrial Engineering Department under the supervision of <a href="https://scholar.google.com/citations?user=juqDWQMAAAAJ&amp;hl=en">Elias Khalil</a> funded by an NSERC CGS-M. During this time I worked at the intersection of machine learning, discrete optimization and optimization solvers.</p>

    <p>During my MASc, I was fortunate to intern at Huawei Technologies Canada, in the Vancouver Research Centre. During my internship I worked on integrating machine learning into discrete optimization solver subroutines where I was supervised by <a href="https://scholar.google.com/citations?user=K2zamrwAAAAJ&amp;hl=en">Yong Zhang</a> and <a href="https://scholar.google.com/citations?user=2fKv_JQAAAAJ&amp;hl=en">Zirui Zhou</a>.</p>

    <section class="home-section home-news">
      <h2>News</h2>
      <div class="news-filter" aria-label="Filter news by year">
        <button type="button" class="news-filter__button is-active" data-news-filter="all" aria-pressed="true">All</button>
        <button type="button" class="news-filter__button" data-news-filter="2026" aria-pressed="false">2026</button>
        <button type="button" class="news-filter__button" data-news-filter="2025" aria-pressed="false">2025</button>
        <button type="button" class="news-filter__button" data-news-filter="2024" aria-pressed="false">2024</button>
        <button type="button" class="news-filter__button" data-news-filter="2023" aria-pressed="false">2023</button>
      </div>
      <div class="news-scroll" aria-label="Recent news">
        <article class="news-item" data-year="2026">
          <time datetime="2026-05">May 2026</time>
          <p>I started a summer internship as an Applied Scientist at Salesforce in San Francisco.</p>
        </article>
        <article class="news-item" data-year="2026">
          <time datetime="2026-05">May 2026</time>
          <p>Our new paper <a href="https://arxiv.org/abs/2605.18692">"Democratizing Large-Scale Re-Optimization with LLM-Guided Model Patches"</a> is on arXiv!</p>
        </article>
        <article class="news-item" data-year="2025">
          <time datetime="2025-10">October 2025</time>
          <p>Attended <a href="https://meetings.informs.org/wordpress/annual2025/g">INFORMS 2025</a> in Atlanta Georgia</p>
        </article>
        <article class="news-item" data-year="2025">
          <time datetime="2025-07">July 2025</time>
          <p>Attended ISCP 2025 held at École des Ponts in Paris, France</p>
        </article>
        <article class="news-item" data-year="2025">
          <time datetime="2025-05">May 2025</time>
          <p>Our new paper <a href="https://arxiv.org/abs/2505.21775">"DualSchool: How Reliable are LLMs for Optimization Education?"</a> is on arXiv!</p>
        </article>
        <article class="news-item" data-year="2024">
          <time datetime="2024-12">December 2024</time>
          <p>Our paper <a href="https://doi.org/10.1609/AAAI.V39I25.34900">"Learn2Aggregate: Supervised Generation of Chvátal-Gomory Cuts Using Graph Neural Networks"</a> was accepted at AAAI 2025</p>
        </article>
        <article class="news-item" data-year="2024">
          <time datetime="2024-08">August 2024</time>
          <p>Started my PhD in Machine Learning at Georgia Tech and joined AI4OPT.</p>
        </article>
        <article class="news-item" data-year="2024">
          <time datetime="2024-08">August 2024</time>
          <p>I succesfully defended my master's thesis.</p>
        </article>
        <article class="news-item" data-year="2023">
          <time datetime="2023-10">October 2023</time>
          <p>I presented our work and attended <a href="https://meetings.informs.org/wordpress/phoenix2023/">INFORMS 2023</a> in Pheonix, Arizona.</p>
        </article>
        <article class="news-item" data-year="2023">
          <time datetime="2023-08">August 2023</time>
          <p>I attended <a href="https://cp2023.a4cp.org/">CP 2023</a> in Toronto, Canada.</p>
        </article>
        <article class="news-item" data-year="2023">
          <time datetime="2023-05">May 2023</time>
          <p>Started my internship at Huawei in Vancouver.</p>
        </article>
        <article class="news-item" data-year="2023">
          <time datetime="2023-05">May 2023</time>
          <p>Our paper <a href="https://drops.dagstuhl.de/storage/00lipics/lipics-vol280-cp2023/LIPIcs.CP.2023.14/LIPIcs.CP.2023.14.pdf">"Fast Matrix Multiplication Without Tears: A Constraint Programming Approach"</a> was accepted to <a href="https://cp2023.a4cp.org/">CP 2023</a>.</p>
        </article>
        <article class="news-item" data-year="2023">
          <time datetime="2023-02">February 2023</time>
          <p>Our paper <a href="https://doi.org/10.24963/ijcai.2023/739">"Machine Learning for Cutting Planes in Integer Programming: A Survey"</a> was accepted to IJCAI 2023.</p>
        </article>
        <article class="news-item" data-year="2022">
          <time datetime="2022-08">August 2022</time>
          <p>Started my MaSC at the University of Toronto in the MIE department!</p>
        </article>
      </div>
    </section>

    <script>
      document.addEventListener("DOMContentLoaded", function () {
        const filterButtons = document.querySelectorAll("[data-news-filter]");
        const newsItems = document.querySelectorAll(".news-item[data-year]");

        filterButtons.forEach(function (button) {
          button.addEventListener("click", function () {
            const selectedYear = button.getAttribute("data-news-filter");

            filterButtons.forEach(function (candidate) {
              const isActive = candidate === button;
              candidate.classList.toggle("is-active", isActive);
              candidate.setAttribute("aria-pressed", isActive ? "true" : "false");
            });

            newsItems.forEach(function (item) {
              const shouldShow = selectedYear === "all" || item.getAttribute("data-year") === selectedYear;
              item.hidden = !shouldShow;
            });
          });
        });
      });
    </script>

  </main>

  <aside class="home-rail" aria-label="Profile highlights">
    <section class="rail-section">
      <h2>Education</h2>
      <div class="rail-list">
        <article class="rail-card">
          <img class="entity-logo" src="/images/Georgia-Tech-Logo.jpg" alt="" onerror="this.hidden=true">
          <div>
            <p class="info-card__eyebrow">2024-Present</p>
            <h3>PhD in Machine Learning</h3>
            <p>Georgia Tech (ISyE)</p>
          </div>
        </article>
        <article class="rail-card">
          <img class="entity-logo" src="/images/uni_toronto.png" alt="" onerror="this.hidden=true">
          <div>
            <p class="info-card__eyebrow">2022-2024</p>
            <h3>MASc in Industrial Engineering</h3>
            <p>University of Toronto</p>
          </div>
        </article>
        <article class="rail-card">
          <img class="entity-logo" src="/images/uni_toronto.png" alt="" onerror="this.hidden=true">
          <div>
            <p class="info-card__eyebrow">2018-2022</p>
            <h3>BASc in Engineering Science</h3>
            <p>Machine Learning, University of Toronto</p>
          </div>
        </article>
      </div>
    </section>

    <section class="rail-section">
      <h2>Experience</h2>
      <div class="rail-list">
        <article class="rail-card">
          <img class="entity-logo" src="/images/amazon_logo.jpeg" alt="" onerror="this.hidden=true">
          <div>
            <p class="info-card__eyebrow">Fall 2026</p>
            <h3>Incoming Applied Scientist</h3>
            <p>Amazon</p>
          </div>
        </article>
        <article class="rail-card">
          <img class="entity-logo" src="/images/Salesforce%20Logo.jpeg" alt="" onerror="this.hidden=true">
          <div>
            <p class="info-card__eyebrow">Summer 2026</p>
            <h3>Applied Scientist</h3>
            <p>Salesforce</p>
          </div>
        </article>
        <article class="rail-card">
          <img class="entity-logo" src="/images/AI4OPT-Logo-2.png" alt="" onerror="this.hidden=true">
          <div>
            <p class="info-card__eyebrow">2024-Present</p>
            <h3>Graduate Researcher</h3>
            <p>AI Institute for Advances in Optimization</p>
          </div>
        </article>
        <article class="rail-card">
          <img class="entity-logo" src="/images/Huawei_Standard_logo.svg" alt="" onerror="this.hidden=true">
          <div>
            <p class="info-card__eyebrow">Summer 2023</p>
            <h3>Research Engineer</h3>
            <p>Huawei Technologies Canada</p>
          </div>
        </article>
      </div>
    </section>
  </aside>
</div>
