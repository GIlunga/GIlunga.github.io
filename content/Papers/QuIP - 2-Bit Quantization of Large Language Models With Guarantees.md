---
created: 2023-07-24
updated: 2023-07-24
---
>[!info]  
> **Year**:: 2023
> **Title**: QuIP: 2-Bit Quantization of Large Language Models With Guarantees
> **Authors**: Jerry Chee, Yaohui Cai, Volodymyr Kuleshov, Christopher De Sa
>   
> **URL**: http://arxiv.org/abs/2307.13304
> **Status**:: Want to Read
> **Stars**::
> **Tags**:


> [!Abstract]  
> This work studies post-training parameter quantization in large language models (LLMs). We introduce quantization with incoherence processing (QuIP), a new method based on the insight that quantization benefits from incoherent weight and Hessian matrices, i.e., from the weights and the directions in which it is important to round them accurately being unaligned with the coordinate axes. QuIP consists of two steps: (1) an adaptive rounding procedure minimizing a quadratic proxy objective; (2) efficient pre- and post-processing that ensures weight and Hessian incoherence via multiplication by random orthogonal matrices. We complement QuIP with the first theoretical analysis for an LLM-scale quantization algorithm, and show that our theory also applies to an existing method, OPTQ. Empirically, we find that our incoherence preprocessing improves several existing quantization algorithms and yields the first LLM quantization methods that produce viable results using only two bits per weight. Our code can be found on GitHub.  

> [!Quick Summary]  
>**Summary**::



%% Import Date: 2023-09-16T14:08:59.730+01:00 %%
