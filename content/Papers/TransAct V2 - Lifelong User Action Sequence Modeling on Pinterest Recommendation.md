---
date: 2025-08-30
tags:
  - "#paper"
  - recsys
  - institution/Pinterest
  - stub
publish: "true"
aliases:
  - TransAct
Year: "2025"
---
<div style="text-align: center; margin: 2rem 0; padding-bottom: 1rem; border-bottom: 2px solid var(--lightgray);">
   <b>
  <p style="margin: 0.5rem 0; color: var(--darkgray); font-style: italic;">
    Xue Xia, Saurabh Vishwas Joshi, Kousik Rajesh, Kangnan Li, Yangyi Lu, Nikil Pancha, Dhruvil Deven Badani, Jiajing Xu, Pong Eksombatchai
  </p>
  <p style="margin: 0.5rem 0; font-style: bold;">
    Pinterest
  </p>
   </b>
  <div style="display: flex; justify-content: center; margin: 1rem 0; gap: 0.5rem;">
    <a href="https://arxiv.org/abs/2506.02267" target="_blank" style="display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; border-radius: 5px; text-decoration: none; font-weight: 600; font-size: 1rem; transition: all 0.2s ease; border: 1px solid var(--secondary); background-color: var(--secondary); color: var(--light); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      📄 Paper
    </a>
  </div>
</div>

<!--
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
-->




