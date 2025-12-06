---
date: 2025-08-30
tags:
  - recsys
  - gen_retrieval
publish: "true"
aliases:
  - PinRec
Year: "2025"
---
The [paper](https://arxiv.org/abs/2504.10507) introduces **PinRec**, a [[gen_retrieval|generative retrieval]] system deployed at Pinterest for >500M active users. As far as I know, this is the first published paper on generative retrieval at this scale! 

The core of their approach is fairly simple to follow. They use a GPT-2 model to process users' recent interaction history by tokenizing pin interactions into an item embedding. This is quite standard nowadays but if you are unfamiliar with it, then see [SASRec](https://arxiv.org/abs/1808.09781), [PinnerFormer](https://arxiv.org/abs/2205.04507) (also from Pinterest), [Netflix's foundation model](https://netflixtechblog.com/foundation-model-for-personalized-recommendation-1a0bd8e02d39), or [Amazon's purchase prediction models](https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/Inside_the_predictive_AI_model_powering_Amazon_DSP_Performance_and_Brand.pdf) (I worked on that!). 

They then take the transformer outputs, pass them through an MLP, and use those embeddings for approximate nearest neighbours search on item (pin) space. So in other words, the transformers outputs at each step can be seen as item queries.

To train the model, they use a multi-token prediction task with sampled softmax loss over actual targets, in-batch negatives, and random negatives. To select positives they take all future interactions within a time window, similar to [PinnerFormer](https://arxiv.org/abs/2205.04507)'s dense all-action loss. The idea is that unlike language modelling, predicting if the user will click pin X after Y or Z doesn't really matter, you just want the model to be able to predict that they will click it!

Finally, they also apply outcome-conditioned generation. This is just conditioning the final MLP head on an intended outcome, e.g., repins or clicks. During training, they simply condition on the action of the label they are predicting. However, during inference, this enables them to use action budgets and apply business rules, e.g., suggest 3 pins for clicks and 1 for repin. It is unclear if the model is used directly for ranking or just retrieval though.

So how does this compare to other models? Offline results show that PinRec significantly outperforms [SASRec](https://arxiv.org/abs/1808.09781), [PinnerFormer](https://arxiv.org/abs/2205.04507), and [TIGER](https://openreview.net/forum?id=BJ0fQUU32w). Online A/B tests also show improvements - adjusting outcome budgets shifts user behaviour toward desired actions and delivers significant lifts in key metrics including fulfilled sessions (+0.28%), time spent (+0.55%), and grid clicks (+1.73%).

And with that we have covered the entire paper! Now, in my opinion, while there isn't anything truly novel about it, it is very interesting to see that combining all the latest trends into one model works at scale and outperforms other non generative retrieval models!

