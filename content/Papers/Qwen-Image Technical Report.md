---
date: 2025-08-10
tags:
  - "#paper"
  - recsys
  - stub
  - institution/ByteDance
publish: "false"
aliases:
  - Qwen-Image
Year: "2025"
---
- achieves significant advances in complex text rendering and precise image editing
- To address the challenges of complex text rendering, we design a comprehensive data pipeline that includes large-scale data collection, filtering, annotation, synthesis, and balancing.
- Moreover, we adopt a progressive training strategy that starts with non-text-to-text rendering, evolves from simple to complex textual inputs, and gradually scales up to paragraph-level descriptions. This curriculum learning approach substantially enhances the model’s native text rendering capabilities
- To enhance image editing consistency, we introduce an improved multi-task training paradigm that incorporates not only traditional text-to-image (T2I) and text-image-to-image (TI2I, aka image editing) tasks but also image-to-image (I2I) reconstruction, effectively aligning the latent representations between Qwen2.5-VL and MMDiT.
- Furthermore, we separately feed the original image into Qwen2.5-VL and the VAE encoder to obtain semantic and reconstructive representations, respectively. This dual-encoding mechanism enables the editing module to strike a balance between preserving semantic consistency and maintaining visual fidelity.



# Summary
The [paper](https://arxiv.org/abs/2209.07663) ([Github](https://github.com/bytedance/monolith?tab=readme-ov-file)) introduces Monolith, ByteDance's recommendation system powering TikTok (and the [BytePlus Recommend product](https://www.byteplus.com/en/product/recommend)). The paper details the infrastructure and system design that allows for industrial-scale recommendations (millions of users).

**Key Findings:**
1. **Collision-less hash tables improve performance for sparse categorical features:** Industrial recommender systems handle a massive number of users and ranking items, making it difficult to store large embedding tables. Traditional low-collision hashing can be problematic because some users/items are much more popular than others, so grouping them in the same bucket can harm model performance. Collision-less hashing (specifically, [cuckoo hashing](https://en.wikipedia.org/wiki/Cuckoo_hashing)) can accommodate a larger number of unique IDs and improves AUC without overfitting
2. **Models can be updated in chunks:** Using TensorFlow parameter servers, the model can be updated incrementally during training, removing the need for synchronised replacement of the entire distributed model. Parameter servers (model chunks) can be synced independently because each update tends to be small
3. **Collision-less hash tables and fast online training address concept drift:** Online training with collision-less hash tables, updated frequently, improves performance and reduces the impact of concept drift over time


