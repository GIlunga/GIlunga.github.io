---
created: 2023-07-24
updated: 2023-07-24
---
>[!info]  
> **Year**:: 2023
> **Title**: Retentive Network: A Successor to Transformer for Large Language Models
> **Authors**: Yutao Sun, Li Dong, Shaohan Huang, Shuming Ma, Yuqing Xia, Jilong Xue, Jianyong Wang, Furu Wei
>   
> **URL**: http://arxiv.org/abs/2307.08621
> **Status**:: Want to Read
> **Stars**::
> **Tags**:


> [!Abstract]  
> In this work, we propose Retentive Network (RETNET) as a foundation architecture for large language models, simultaneously achieving training parallelism, low-cost inference, and good performance. We theoretically derive the connection between recurrence and attention. Then we propose the retention mechanism for sequence modeling, which supports three computation paradigms, i.e., parallel, recurrent, and chunkwise recurrent. Specifically, the parallel representation allows for training parallelism. The recurrent representation enables low-cost O(1) inference, which improves decoding throughput, latency, and GPU memory without sacrificing performance. The chunkwise recurrent representation facilitates efficient long-sequence modeling with linear complexity, where each chunk is encoded parallelly while recurrently summarizing the chunks. Experimental results on language modeling show that RETNET achieves favorable scaling results, parallel training, low-cost deployment, and efficient inference. The intriguing properties make RETNET a strong successor to Transformer for large language models. Code will be available at https://aka.ms/retnet.  

> [!Quick Summary]  
>**Summary**::



%% Import Date: 2023-07-26T12:13:31.789+01:00 %%
