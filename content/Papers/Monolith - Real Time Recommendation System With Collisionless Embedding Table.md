---
date: 2025-05-15
tags:
  - "#paper"
  - recsys
  - institution/ByteDance
publish: "true"
aliases:
  - monolith
Year: "2022"
---
<div style="text-align: center; margin: 2rem 0; padding-bottom: 1rem; border-bottom: 2px solid var(--lightgray);">
   <b>
  <p style="margin: 0.5rem 0; color: var(--darkgray); font-style: italic;">
    Zhuoran Liu, Leqi Zou, Xuan Zou, Caihua Wang, Biao Zhang, Da Tang, Bolin Zhu, Yijie Zhu, Peng Wu, Ke Wang, et. al.
  </p>
  <p style="margin: 0.5rem 0; font-style: bold;">
    Bytedance
  </p>
   </b>
  <div style="display: flex; justify-content: center; margin: 1rem 0; gap: 0.5rem;">
    <a href="https://arxiv.org/abs/2209.07663" target="_blank" style="display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; border-radius: 5px; text-decoration: none; font-weight: 600; font-size: 1rem; transition: all 0.2s ease; border: 1px solid var(--secondary); background-color: var(--secondary); color: var(--light); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      📄 Paper
    </a>
  </div>
</div>


The [paper](https://arxiv.org/abs/2209.07663) ([Github](https://github.com/bytedance/monolith?tab=readme-ov-file)) introduces Monolith, ByteDance's recommendation system powering TikTok (and the [BytePlus Recommend product](https://www.byteplus.com/en/product/recommend)). The paper details the infrastructure and system design that allows for industrial-scale recommendations (millions of users).

**Key Findings:**
1. **Collision-less hash tables improve performance for sparse categorical features:** Industrial recommender systems handle a massive number of users and ranking items, making it difficult to store large embedding tables. Traditional low-collision hashing can be problematic because some users/items are much more popular than others, so grouping them in the same bucket can harm model performance. Collision-less hashing (specifically, [cuckoo hashing](https://en.wikipedia.org/wiki/Cuckoo_hashing)) can accommodate a larger number of unique IDs and improves AUC without overfitting
2. **Models can be updated in chunks:** Using TensorFlow parameter servers, the model can be updated incrementally during training, removing the need for synchronised replacement of the entire distributed model. Parameter servers (model chunks) can be synced independently because each update tends to be small
3. **Collision-less hash tables and fast online training address concept drift:** Online training with collision-less hash tables, updated frequently, improves performance and reduces the impact of concept drift over time


