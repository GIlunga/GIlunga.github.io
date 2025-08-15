---
date: 2025-05-15
tags:
  - "#paper"
  - recsys
  - stub
  - institution/ByteDance
publish: "true"
aliases:
  - monolith
Year: "2022"
---
# Summary
- Our experiments demonstrate that PinRec can successfully balance performance, diversity, and efficiency, delivering a significant positive impact to users using generative models. This paper marks a significant milestone in generative retrieval, as it presents, to our knowledge, the first rigorous study on implementing generative retrieval at the scale of Pinterest.
- A critical prerequisite for effective optimization of a sequential recommendation system is an effective input and output representation for the heterogeneous set of items.
- Based on a set of features F (𝑡) for each item type 𝑡 ∈ {pin, search query}, we construct MLPs 𝑓𝑡 for each item type 𝑡 ∈ T to generate a real-valued embedding. For simplicity, the architecture of each input embedder consists of 2-3 fully connected layers with ReLU activation and layer norms.
- That is, for any future timestep window of size Δ starting at some timestep 𝑡 ′ > 𝑡, all items that are engaged within that window are targets for our prediction task
- 



====
The [paper](https://arxiv.org/abs/2209.07663) ([Github](https://github.com/bytedance/monolith?tab=readme-ov-file)) introduces Monolith, ByteDance's recommendation system powering TikTok (and the [BytePlus Recommend product](https://www.byteplus.com/en/product/recommend)). The paper details the infrastructure and system design that allows for industrial-scale recommendations (millions of users).

**Key Findings:**
1. **Collision-less hash tables improve performance for sparse categorical features:** Industrial recommender systems handle a massive number of users and ranking items, making it difficult to store large embedding tables. Traditional low-collision hashing can be problematic because some users/items are much more popular than others, so grouping them in the same bucket can harm model performance. Collision-less hashing (specifically, [cuckoo hashing](https://en.wikipedia.org/wiki/Cuckoo_hashing)) can accommodate a larger number of unique IDs and improves AUC without overfitting
2. **Models can be updated in chunks:** Using TensorFlow parameter servers, the model can be updated incrementally during training, removing the need for synchronised replacement of the entire distributed model. Parameter servers (model chunks) can be synced independently because each update tends to be small
3. **Collision-less hash tables and fast online training address concept drift:** Online training with collision-less hash tables, updated frequently, improves performance and reduces the impact of concept drift over time


