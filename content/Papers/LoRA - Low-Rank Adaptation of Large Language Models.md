---
created: 2023-07-24
updated: 2023-07-24
---
>[!info]  
> **Year**:: 2021
> **Title**: LoRA: Low-Rank Adaptation of Large Language Models
> **Authors**: Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen
>   
> **URL**: http://arxiv.org/abs/2106.09685
> **Status**:: Want to Read
> **Stars**::
> **Tags**:


> [!Abstract]  
> An important paradigm of natural language processing consists of large-scale pretraining on general domain data and adaptation to particular tasks or domains. As we pre-train larger models, full ﬁne-tuning, which retrains all model parameters, becomes less feasible. Using GPT-3 175B as an example – deploying independent instances of ﬁne-tuned models, each with 175B parameters, is prohibitively expensive. We propose Low-Rank Adaptation, or LoRA, which freezes the pretrained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture, greatly reducing the number of trainable parameters for downstream tasks. Compared to GPT-3 175B ﬁne-tuned with Adam, LoRA can reduce the number of trainable parameters by 10,000 times and the GPU memory requirement by 3 times. LoRA performs on-par or better than ﬁnetuning in model quality on RoBERTa, DeBERTa, GPT-2, and GPT-3, despite having fewer trainable parameters, a higher training throughput, and, unlike adapters, no additional inference latency. We also provide an empirical investigation into rank-deﬁciency in language model adaptation, which sheds light on the efﬁcacy of LoRA. We release a package that facilitates the integration of LoRA with PyTorch models and provide our implementations and model checkpoints for RoBERTa, DeBERTa, and GPT-2 at https://github.com/microsoft/LoRA.  

> [!Quick Summary]  
>**Summary**::



%% Import Date: 2023-07-24T22:39:47.184+01:00 %%
