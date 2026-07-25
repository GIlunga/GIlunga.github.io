---
title: "Modern LLMs with Nemotron 3 Ultra"
description: "How to build a 550B MoE in 2026"
date: "2026-07-24"
tags: []
---

## Summary attempts

- Pretrain:
  -

## Full notes

### Abstract

- 550B total, 55B active MoE hybrid Mamba-attention
- Pre-trained on 20T text tokens, context length extension to 1M tokens, post-trained with SFT, RL, and multi-teacher on-policy distillation
- Key technologies: LatentMoE, Multi-token prediction, NVFP4 pre-training, multi-environment RLVR, MOPD, and reasoning budget control
- 6x higher inference throughput compared to SOTA public LLMs with on-par accuracy (comparing with GLM 5.1, Kimi K2, and Qwen 3.5)
  - Nemotron 3 Ultra achieves 5.9×, 4.8×, and 1.6× higher inference throughput compared to GLM-5.1-754B-A40B, Kimi-K2.6-1T-A32B, and Qwen-3.5-397B-17B respectively on 8K input / 64K output token setting while also attaining on-par accuracy across a wide range of agentic and reasoning benchmarks.
- They release multiple model checkpoints + data!!!!

### Introduction

- Focus on fast and efficient inference with MoE hybrid Mamba-attention
- LatentMoE: https://www.alphaxiv.org/abs/2601.18089
- MTP: https://www.alphaxiv.org/abs/2508.06471

#### Pre-training

- Base model was pre-trained in NVFP4 with 20T text token with warmup-stable-decay (WSD) LR schedule
- Pre-training was divided into two phases with 15T tokens in the first phase focusing on diversity/broad domain coverage followed by 5T tokens in the second phase focusing on high quality data to refine accuracy
- LatentMoE helped achieve better accuracy per parameter than standard granular MoEs (DeepSeek MoE: https://www.alphaxiv.org/abs/2401.06066)
- MTP leads to faster inference with speculative decoding
- Pre-trained base model achieves "significantly better" accuracy than publicly available base models (DeepSeek V3.2, Kimi K2, etc)

#### Post-training

- Initial SFT with curated data mix (Q: no instruction finetuning?)
- Followed by unified RLVR over a wide mix of reasoning, agentic, code, safety, usability, and chat environments
- In parallel, more than ten domain specialised teacher models were trained using targeted recipes, includes agentic teachers built on a dedicated agentic SFT path (??). MOPD consolidated these teachers into Ultra through dense token-level guidance on student-generated rollouts
- Also includes reasoning effort control as an inference-time adjustment of accuracy-compute
- (not mentioned but there is a reward model for RLHF too)

### Pre-training

- Same hybrid Mamba-attention MoE architecture as Nemotron 3 Super, extended to 500B-A55B, leveraging Latent MoE and MTP with two heads in pre-training (again, like Super)
  - Both MTP heads share the same params (??) to "enable robust autoregressive drafting" (described in Super paper) and consist of a single attention layer followed by a single MoE layer

<figure style="text-align: center;">
  <img src="/images/03-nemotron-ultra/Pasted image 20260721223135.png" alt="Nemotron 3 Ultra architecture diagram" width="1000">
  <figcaption><b>Figure 1</b>: Nemotron 3 Ultra architecture</figcaption>
</figure>

<figure style="text-align: center;">
  <img src="/images/03-nemotron-ultra/Pasted image 20260721224414.png" alt="Nemotron 3 Ultra model structure" width="1000">
  <figcaption><b>Figure 2</b>: Nemotron 3 Ultra model structure</figcaption>
</figure>

- Questions:
  - Why no attention at the start? Check Super paper
  - Leaning more towards Mamba-2 than attention, makes sense for efficiency, I think fairly standard nowadays?
  - Why Mamba-2 → attention → MoE, instead of MoE → attention → MoE for the attention bits?

#### NVFP4 pre-training

- Same recipe as Nemotron 3 Super, using Transformer Engine's open-source cuBLAS NVFP4 GEMM kernel for fprop, dgrad, and wgrad (TODO: ask LLM about this)
  - fprop = forward propagation, aka forward pass
  - dgrad = data gradient, calculating gradients wrt to the input during backward pass
  - wgrad = weight gradient, calculating gradients wrt model weights in backward pass
- NVFP4 layers use the E2M1 datatype with two dimensional block quantization on weights, random Hadamard transforms on inputs to wgrad, and stochastic rounding on gradients (TODO: ask LLM about this)
  - Reference: https://www.alphaxiv.org/abs/2509.25149
- Kept the final 15% of the network (16 layers), Mamba output projections, latent projections, QKV and attention projections, MTP layers, and embeddings layers in higher precision following Nano and Super
  - Question: why these in particular? Why the last 16 layers and not more/less?
- To monitor training health, they branched ablations from checkpoints at 5/10/16T, switched all tensors to BF16, and continued pretraining for 74B tokens. They tracked the relative train loss difference with NVFP4. In their NVFP4 paper, they showed that switching all tensors to BF16 substantially recovers the high-precision loss, providing a proxy for high-precision training. The ablations showed a relative train loss gap below 0.4% on average, which is lower than what they saw in the smaller Nemotrons

<figure style="text-align: center;">
  <img src="/images/03-nemotron-ultra/Pasted image 20260721224730.png" alt="NVFP4 training health ablation results" width="1000">
  <figcaption><b>Figure 3</b>: NVFP4 training health ablation</figcaption>
</figure>

#### Pre-training data

- Only describe new data since Nemotron 3 Super
- Refreshed raw source code data from GitHub, adding 173B tokens
  - Q: how to decide what to include vs not include?
- Multiple choice + generative
  - Generated task-seeded synthetic Q&A data from training splits of many public datasets spanning a wide range of domains — STEM, factual, commonsense, logical, math, code, etc. Training examples were seeds to capture structure, domain, difficulty, and format
  - Two datasets, one for questions with normalized multiple choice and another for open ended
  - Generated answer enriched samples that include task-relevant knowledge, reasoning, or context when appropriate
  - Apply formatting checks, schema validation, deduplication, and task-specific filtering to improve quality
  - To validate quality, they did a 100B token phase 3 continue pre-train ablation on a Nemotron family checkpoint. Adding the synth data improved MMLU-Pro from 64.8 to 66., average code from 73.2 to 75.1, etc.
  - NOTES: As expected, synth data still used, makes sense. I wonder what model was used for this. Also how do they validate the answers for open ended stuff? Surely all automated? Also interesting math data remained stable
- Fact seeking
  - Fact-seeking questions from FineWiki (what does this mean??)
  - Two stages: extracting informative, factual statements from FineWiki articles and prompting Qwen3-30B-A3B-Instruct (!) with each statement and its original context to generate either a short-answer or multiple-choice question
  - To verify usefulness, conducted an ablation study using an intermediate checkpoint from Nemotron 3 Nano pretraining. Injected the fact-seeking data during the final 100B tokens of training, improving accuracy on SimpleQA from 40.25 to 50.16 (not directly comparable, since they converted SimpleQA questions into multi-choice format for easier eval)
- Moral scenarios
  - Subsampled pre-existing dataset from them and created a chain of thought version with Qwen3 235B-A22B-thinking-2507
- Legal
  - Curated and generated datasets in legal domain (skipping details)
- Data mixture and ordering
  - Adaptation of Super and Nano with new datasets
  - Ref: https://www.alphaxiv.org/abs/2412.15285, balance diversity and quality
  - Follow ref, two-phase curriculum and transition from a data mix which biases dataset diversity to a data mix which biases quality (how to define this??)
  - Transition after 15T tokens, i.e., 75% of pretraining
  - Pre-training corpus spans 19 high level categories across both data mixes
  - Largest component (49% of phase 1 and 38% of phase 2) is quality filtered and synthetic web crawl data
  - Multilingual data spans 11 languages
  - (more details not written)

<figure style="text-align: center;">
  <img src="/images/03-nemotron-ultra/Pasted image 20260722163724.png" alt="Pre-training data mixture breakdown" width="1000">
  <figcaption><b>Figure 4</b>: Pre-training data mixture</figcaption>
</figure>

#### Hyperparameters

- Same recipe and hyperparameters from Super with a few adjustments
- WSD LR schedule over a total horizon of 20T tokens (how does this work, they count tokens ahead of time?)
  - Warmup LR for 200B tokens to a peak of 2.5 × 10⁻⁴ (how is this decided? MuP?)
  - Final 5T tokens they decay LR according a minus-sqrt decay schedule to a minimum of 2.5×10⁻⁶ (what does this mean)
  - Used offline checkpoint merging for evaluation analysis throughout pretraining with a sliding merge window size of 500B tokens at a checkpoint interval of 25B tokens weighted to emulate LR schedule (WTF is this)
    - Ref: https://www.alphaxiv.org/abs/2507.17634
- At the end of pretrain, final checkpoint selection was performed over a large set of checkpoint merges created with different merge settings: varying tokens seen, merge windows from 125B to 1T tokens, and using sequential, random, and reversed orderings (the fuck). A 500B token merge window checkpoint was a balanced tradeoff, selected for long context phase.
- They use an MTP loss scaling factor of 0.1 (what is this??)
- Other hyperparameters are the same as Super

#### Long context extension

- LC phase at the end of pretrain
- CPT (what does that mean??) to equip the base model with long-context ability
- Constant LR of 2.5×10⁻⁶ (their min from pretrain)
- 32-way context parallelism, 8-way tensor parallelism, 128-way expert parallelism, and 2-way pipeline parallelism, to train on GB200 GPUs (Q: just for LC or for all pretrain)
- Besides long context document QA data, they added long context SFT style data. LC data was 46% and phase 2 data was 54% of the blend (no ruler style data, what is that)
- CPT was on 1M context length for 92% of the iterations and trained on 4K the remaining 8% of the time to maintain accuracy of shot benchmarks
- Each iteration was either 1M or 4K, no mixing
- Each iteration was 25M tokens
- Only put math and code SFT-style data into the 4K iterations, since they found it worked best to maintain the short benchmark metrics while achieving strong long-context RULER scores
- The LC phase was trained for 33B tokens

#### Base model evals
