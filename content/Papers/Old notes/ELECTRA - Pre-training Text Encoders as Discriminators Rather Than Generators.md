---
created: 2023-07-24
updated: 2023-07-24
---
>[!info]  
> **Year**:: 2020
> **Title**: ELECTRA: Pre-training Text Encoders as Discriminators Rather Than Generators
> **Authors**: Kevin Clark, Minh-Thang Luong, Quoc V. Le, Christopher D. Manning
>   
> **URL**: http://arxiv.org/abs/2003.10555
> **Status**:: Want to Read
> **Stars**::
> **Tags**:


> [!Abstract]  
> Masked language modeling (MLM) pre-training methods such as BERT corrupt the input by replacing some tokens with [MASK] and then train a model to reconstruct the original tokens. While they produce good results when transferred to downstream NLP tasks, they generally require large amounts of compute to be effective. As an alternative, we propose a more sample-efﬁcient pre-training task called replaced token detection. Instead of masking the input, our approach corrupts it by replacing some tokens with plausible alternatives sampled from a small generator network. Then, instead of training a model that predicts the original identities of the corrupted tokens, we train a discriminative model that predicts whether each token in the corrupted input was replaced by a generator sample or not. Thorough experiments demonstrate this new pre-training task is more efﬁcient than MLM because the task is deﬁned over all input tokens rather than just the small subset that was masked out. As a result, the contextual representations learned by our approach substantially outperform the ones learned by BERT given the same model size, data, and compute. The gains are particularly strong for small models; for example, we train a model on one GPU for 4 days that outperforms GPT (trained using 30x more compute) on the GLUE natural language understanding benchmark. Our approach also works well at scale, where it performs comparably to RoBERTa and XLNet while using less than 1/4 of their compute and outperforms them when using the same amount of compute.  

> [!Quick Summary]  
>**Summary**::



%% Import Date: 2023-07-24T22:33:39.296+01:00 %%
