---
created: 2023-07-24
updated: 2023-10-04
Year: "2023"
Institution: Microsoft
Conference/Journal: Arxiv
URL: http://arxiv.org/abs/2309.10400
tags:
  - LM
  - context_len
Related: 
Read: 
Contributions:
---
> [!Abstract]  
> In this paper, we introduce Positional Skip-wisE (PoSE) training for efficient adaptation of large language models (LLMs) to extremely long context windows. PoSE decouples train length from target context window size by simulating long inputs using a fixed context window with manipulated position indices during training. Concretely, we select several short chunks from a long input sequence, and introduce distinct skipping bias terms to modify the position indices of each chunk. These bias terms, along with the length of each chunk, are altered for each training example, allowing the model to adapt to all positions within the target context window without training on full length inputs. Experiments show that, compared with fine-tuning on the full length, PoSE greatly reduces memory and time overhead with minimal impact on performance. Leveraging this advantage, we have successfully extended the LLaMA model to 128k tokens. Furthermore, we empirically confirm that PoSE is compatible with all RoPE-based LLMs and various position interpolation strategies. Notably, by decoupling fine-tuning length from target context window, PoSE can theoretically extend the context window infinitely, constrained only by memory usage for inference. With ongoing advancements for efficient inference, we believe PoSE holds great promise for scaling the context window even further.  


%% Import Date: 2023-09-28T08:57:14.610+01:00 %%
