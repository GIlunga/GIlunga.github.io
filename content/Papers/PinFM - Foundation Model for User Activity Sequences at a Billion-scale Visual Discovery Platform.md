---
date: 2025-08-13
tags:
  - "#paper"
  - recsys
  - stub
  - institution/Pinterest
publish: "true"
aliases:
  - PinFM
Year: "2025"
---
# Summary
The [paper](https://www.arxiv.org/abs/2507.12704), 

- Foundation model for pinterest, 20B parameter transformer
- Pretrained with user activity data, then finetuned for specific applications
- Harder than normal NLP because there are millions of items to score every second
- Needs to handle new items
- Deployed to half a billion users
- For personalization, recommender systems need to comprehend users’ past interaction histories, often referred to as user activity sequences.
- For each downstream application they fine-tune the model with specific features
- Though the effectiveness of large sequence models is well known in industrial recommender systems [21 , 30 ], to our knowledge, there is no existing literature regarding developing foundational models for user sequences to be integrated with multiple downstream recommender system models. Instead, large sequence models such as HSTU [ 30], TIGER [ 21], and TWIN-V2 [ 23] are often used as standalone models trained for specific applications, which can become prohibitively expensive if applied across many applications.
- 2 years of user activity history
- Avoid using high dimensional features and instead use items/action IDs and learn an embedding
- Once pretraining is complete, we integrate the pretrained transformer and embedding tables within the recommender system models for multiple applications. Each downstream ranking model uses this pretrained transformer and embedding table to encode user activity sequences and combine it with other existing features.
- 



The [paper](https://arxiv.org/abs/2209.07663) ([Github](https://github.com/bytedance/monolith?tab=readme-ov-file)) introduces Monolith, ByteDance's recommendation system powering TikTok (and the [BytePlus Recommend product](https://www.byteplus.com/en/product/recommend)). The paper details the infrastructure and system design that allows for industrial-scale recommendations (millions of users).

**Key Findings:**
1. **Collision-less hash tables improve performance for sparse categorical features:** Industrial recommender systems handle a massive number of users and ranking items, making it difficult to store large embedding tables. Traditional low-collision hashing can be problematic because some users/items are much more popular than others, so grouping them in the same bucket can harm model performance. Collision-less hashing (specifically, [cuckoo hashing](https://en.wikipedia.org/wiki/Cuckoo_hashing)) can accommodate a larger number of unique IDs and improves AUC without overfitting
2. **Models can be updated in chunks:** Using TensorFlow parameter servers, the model can be updated incrementally during training, removing the need for synchronised replacement of the entire distributed model. Parameter servers (model chunks) can be synced independently because each update tends to be small
3. **Collision-less hash tables and fast online training address concept drift:** Online training with collision-less hash tables, updated frequently, improves performance and reduces the impact of concept drift over time


