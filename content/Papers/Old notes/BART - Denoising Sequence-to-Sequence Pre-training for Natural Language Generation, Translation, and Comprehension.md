---
created: 2023-07-24
updated: 2023-07-24
---
>[!info]  
> **Year**:: 2019
> **Title**: BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation, Translation, and Comprehension
> **Authors**: Mike Lewis, Yinhan Liu, Naman Goyal, Marjan Ghazvininejad, Abdelrahman Mohamed, Omer Levy, Ves Stoyanov, Luke Zettlemoyer
>   
> **URL**: http://arxiv.org/abs/1910.13461
> **Status**:: Want to Read
> **Stars**::
> **Tags**:


> [!Abstract]  
> We present BART, a denoising autoencoder for pretraining sequence-to-sequence models. BART is trained by (1) corrupting text with an arbitrary noising function, and (2) learning a model to reconstruct the original text. It uses a standard Tranformer-based neural machine translation architecture which, despite its simplicity, can be seen as generalizing BERT (due to the bidirectional encoder), GPT (with the left-to-right decoder), and many other more recent pretraining schemes. We evaluate a number of noising approaches, ﬁnding the best performance by both randomly shufﬂing the order of the original sentences and using a novel in-ﬁlling scheme, where spans of text are replaced with a single mask token. BART is particularly effective when ﬁne tuned for text generation but also works well for comprehension tasks. It matches the performance of RoBERTa with comparable training resources on GLUE and SQuAD, achieves new stateof-the-art results on a range of abstractive dialogue, question answering, and summarization tasks, with gains of up to 6 ROUGE. BART also provides a 1.1 BLEU increase over a back-translation system for machine translation, with only target language pretraining. We also report ablation experiments that replicate other pretraining schemes within the BART framework, to better measure which factors most inﬂuence end-task performance.  

> [!Quick Summary]  
>**Summary**::



%% Import Date: 2023-07-24T22:39:47.301+01:00 %%
