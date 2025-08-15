---
date: 2025-05-15
tags:
  - "#paper"
  - recsys
  - stub
  - institution/Pinterest
publish: "true"
aliases:
  - monolith
Year: "2025"
---
# Summary
- However, industry-scale CTR models often rely on short user sequences, limiting their ability to capture long-term behavior
- Additionally, these models typically lack an integrated action-prediction task within a point-wise ranking framework, reducing their predictive power. 
- three key innovations: (1) leveraging very long user sequences to improve CTR predictions, (2) integrating a Next Action Loss function for enhanced user action forecasting, and (3) employing scalable, low-latency deployment solutions tailored to handle the computational demands of extended user action sequences. 
- The Homefeed recommendation system uses three stages: retrieval, ranking, and blending. 
- By employing a new next-action prediction task, TransAct V2 enhances the understanding of user preference and improves recommendation diversity. 
- TransAct V2 is now serving production traffic on Pinterest’s Homefeed, delivering personalized recommendations to over 500 million users.
- Furthermore, unlike the category of models that can directly predict the next action, these CTR-focused transformers lack direct next-action prediction capabilities.
- Another recent approach employs generative architectures like HSTU [ 30 ], but these typically require models with trillions of parameters to perform well. 
- Pinterest’s Homefeed ranking model uses a point-wise multi-task learning (MTL) architecture. As shown in Figure 2, the model takes context, creator, item, and user features as input to predict the user interaction probability. Similar to existing CTR models [ 2, 9, 14 , 25 , 26 ], it employs a standard wide and deep architecture [ 4], encoding various features including user sequences before applying feature interaction layers [11] and MLPs to generate head scores.
- The core loss function of our ranking model is a weighted cross-entropy loss, tailored for optimizing multi-label classification tasks. 
- real-time sequences typically capture short-term user behaviors, focusing on their most recent interests. While this is effective for immediate relevance, it often overlooks users’ longer-term historical interests, leading to a narrow focus that lacks diversity.
- By incorporating lifelong user sequences, our model aims to balance immediate user preferences with historical patterns, fostering a richer and more varied interaction ecosystem.
- Each lifelong (LL) sequence token has four features: action timestamp, action type (multi-hot vector if multiple interactions with same pin), action surface (e.g., homefeed, search), and 32-d PinSage embedding [29] that encapsulates the content of a pin
- Real-time sequences (𝑆𝑅𝑇 ) and impression sequences 𝑆𝑖𝑚𝑝 use the same features.
- we apply affine quantization to convert the original 32-dimensional fp16 PinSage embedding into a 32-dimensional int8 vector
- we begin by using the candidate item, denoted as 𝑐, as an anchor to perform nearest neighbor (NN) searches on three distinct sequences: the lifelong sequence 𝑺𝐿𝐿 , the real-time sequence 𝑺𝑅𝑇 , and the impression sequence 𝑺𝑖𝑚𝑝
- In addition, we always keep the most recent 𝑟 actions 𝑺𝑅𝑇 [: 𝑟 ] to ensure that the model consumes user’s most fresh actions regardless of the similarity with the candidate item.
- Note that a causal mask is applied to the transformer encoder.
- The choice of loss function for the next action prediction is another important aspect. While cross-entropy is a popular choice for classification, we utilize sampled softmax loss because it offers greater flexibility in adjusting the ratio of positive to negative samples in Equation 5, leading to consistently better performance
- 



----
The [paper](https://arxiv.org/abs/2209.07663) ([Github](https://github.com/bytedance/monolith?tab=readme-ov-file)) introduces Monolith, ByteDance's recommendation system powering TikTok (and the [BytePlus Recommend product](https://www.byteplus.com/en/product/recommend)). The paper details the infrastructure and system design that allows for industrial-scale recommendations (millions of users).

**Key Findings:**
1. **Collision-less hash tables improve performance for sparse categorical features:** Industrial recommender systems handle a massive number of users and ranking items, making it difficult to store large embedding tables. Traditional low-collision hashing can be problematic because some users/items are much more popular than others, so grouping them in the same bucket can harm model performance. Collision-less hashing (specifically, [cuckoo hashing](https://en.wikipedia.org/wiki/Cuckoo_hashing)) can accommodate a larger number of unique IDs and improves AUC without overfitting
2. **Models can be updated in chunks:** Using TensorFlow parameter servers, the model can be updated incrementally during training, removing the need for synchronised replacement of the entire distributed model. Parameter servers (model chunks) can be synced independently because each update tends to be small
3. **Collision-less hash tables and fast online training address concept drift:** Online training with collision-less hash tables, updated frequently, improves performance and reduces the impact of concept drift over time


