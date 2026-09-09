---
title: "Distributed Linear Programming on GPU Clusters at Extreme Scale"
collection: publications
category: manuscripts
permalink: /publication/2026-09-08-distributed-linear-programming
date: 2026-09-08
excerpt: "SHARDLP distributes linear programming across GPU clusters, solving problems with up to 13.6 billion variables while keeping the matrix and primal-dual state partitioned from input through output."
venue: "arXiv preprint"
paperurl: "https://arxiv.org/abs/2609.09108"
citation: "Deza, A., Dey, S., &amp; Van Hentenryck, P. (2026). &quot;Distributed Linear Programming on GPU Clusters at Extreme Scale.&quot; arXiv preprint arXiv:2609.09108."
bibtex: |
  @misc{deza2026distributed,
    title = {Distributed Linear Programming on {GPU} Clusters at Extreme Scale},
    author = {Deza, Arnaud and Dey, Santanu and Van Hentenryck, Pascal},
    year = {2026},
    eprint = {2609.09108},
    archivePrefix = {arXiv},
    primaryClass = {math.OC},
    url = {https://arxiv.org/abs/2609.09108}
  }
---

SHARDLP is a distributed GPU solver for linear programs that exceed a single compute node's memory. It keeps the matrix and primal-dual state partitioned from sharded input through solution output. Separately checked multi-node solves reach up to 13.604 billion variables and 40.807 billion nonzeros. On the largest Google PDLP benchmark, eight H200 GPUs solve a 1.185-billion-variable problem in 9.9 minutes.
