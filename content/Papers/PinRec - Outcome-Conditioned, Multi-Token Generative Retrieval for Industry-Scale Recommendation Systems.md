---
date: 2025-08-30
tags:
  - "#paper"
  - recsys
  - gen_retrieval
  - institution/Pinterest
publish: "true"
aliases:
  - PinRec
Year: "2025"
---

<div style="text-align: center; margin: 2rem 0; padding-bottom: 1rem; border-bottom: 2px solid var(--lightgray);">
  <p style="margin: 0.5rem 0; color: var(--darkgray); font-style: italic;">
    Anirudhan Badrinath, Prabhat Agarwal, Laksh Bhasin, Jaewon Yang, Jiajing Xu, Charles Rosenberg
  </p>
  <p style="margin: 0.5rem 0; font-style: bold;">
    Pinterest
  </p>
  
  <div style="display: flex; justify-content: center; margin: 1rem 0; gap: 0.5rem;">
    <a href="https://arxiv.org/abs/2504.10507" target="_blank" style="display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; border-radius: 5px; text-decoration: none; font-weight: 600; font-size: 1rem; transition: all 0.2s ease; border: 1px solid var(--secondary); background-color: var(--secondary); color: var(--light); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      📄 Paper
    </a>
  </div>
</div>

The paper introduces **PinRec**, a [[gen_retrieval|generative retrieval]] system deployed at Pinterest for >500M active users. This is the first rigorous study of generative retrieval at this scale. The approach uses an in-house implementation of [[Language Models are Unsupervised Multitask Learners (GPT-2)|GPT-2]] that processes items as tokens. Each user's recent interaction history forms a sequence where individual item interactions are represented as single embeddings. This follows similar patterns to [[SASRec]], [[PinnerFormer]] (also from Pinterest), [Netflix's foundation model](https://netflixtechblog.com/foundation-model-for-personalized-recommendation-1a0bd8e02d39), and [Amazon's purchase prediction models](https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/Inside_the_predictive_AI_model_powering_Amazon_DSP_Performance_and_Brand.pdf). 

The system generates predictions using a small MLP output head conditioned on the Transformer's hidden state, producing embeddings representing the next item. Training uses a next-token prediction task with sampled softmax loss over actual targets, in-batch negatives, and random negatives. During inference, generated output representations serve as queries for [[approximate nearest neighbours]] search to retrieve the most similar items.

There are two notable components of PinRec:
- **Outcome-conditioned generation:** rather than simply learning existing user behaviour patterns, the system conditions the output head on desired outcomes through learnable embeddings representing intended actions. This allows dynamic control over action budgets and enables steering users toward specific engagement types during inference. Note that outcome-conditioning in recommender systems isn't new but the extension to generative retrieval is.
- **Windowed multi-token generation:** simple next-token prediction assumes a strict ordering which typically doesn't matter for social media platforms - predicting that a user will like post X after Y or Z matters for autoregressive loss but practically speaking it doesn't matter for the business. In order to align the two, they predict multiple tokens at the same time-step and change the loss to predict all items within a future time-window. Again, multi-token generation is not new (see [[DeepSeek-V3]]) and this style of future action prediction was already present in their previous model ([[PinnerFormer]]), but the extension to generative retrieval at scale is new. 

Offline evaluation shows PinRec significantly outperforms [[SASRec]], [[TIGER]], and [[PinnerFormer]]. Online A/B tests also show improvements - adjusting outcome budgets successfully shifts user behaviour toward desired actions, while delivering significant lifts in key metrics including fulfilled sessions (+0.28%), time spent (+0.55%), and grid clicks (+1.73%).






