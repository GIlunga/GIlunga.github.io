---
date: 2025-03-09
tags:
  - paper
  - LLM
  - institution/DeepSeek
  - stub
publish: "true"
aliases:
  - DeepSeek-R1
Year: "2025"
---
# Summary
The [paper](https://arxiv.org/abs/2501.12948) introduces DeepSeek's first reasoning models: DeepSeek-R1 and DeepSeek-R1-Zero ([GitHub](https://github.com/deepseek-ai/DeepSeek-R1?tab=readme-ov-file#deepseek-r1-distill-models)).
The key findings are: 
1. **[[RL]] is all you need for reasoning**: Sophisticated reasoning - self-verification, reflection, and long [[CoT]]s - can emerge just by directly training a base [[LLM]] with RL, no CoT [[SFT]] data needed!
2. **You can distill reasoning to smaller models**: Reasoning patterns can be distilled into smaller models, boosting their performance on reasoning tasks. The DeepSeek team released several distilled models (from 1.5B to 70B) based on [[Qwen2.5]] and [[Llamma3]] ([GitHub](https://github.com/deepseek-ai/DeepSeek-R1?tab=readme-ov-file#deepseek-r1-distill-models)).
3. **SFT + [[GRPO]] = SOTA reasoning**: DeepSeek-R1, trained with both SFT and GRPO, either beats or matches [[OpenAI-o1]] on reasoning tasks!

<figure style="text-align: center;">     <img src="Files/Images/DeepSeek-R1-results.png" alt="Image Description" width="1000">    <figcaption><b>Figure 1</b>: DeepSeek vs OpenAI-o1 performance on reasoning benchmarks</figcaption> </figure>`

<!---
# Background
## What is the problem? Why does it matter?


## What is the current status?

# Approach



- first reasoning models from DeepSeek
- Zero is trained via large scale RL without SFT - good reasoning but has poor readability and language mixing
- R1 has multi-stage training and cold-start data before RL. Performance comparable with o1-1217 on reasoning tasks. Open source models + distilled models (with bases of Qwen and LLama)
- post-training has emerged as an important component of the full training pipeline. It has been shown to enhance accuracy on reasoning tasks, align with social values, and adapt to user preferences, all while requiring relatively minimal computational resources against pre-training. 
- o1 introduced inference-time scaling by increasing the length of the CoT reasoning process
- GOAL: explore potential of LLMs to develop reasoning capabilities without any supervised data, focusing on self-evolution through pure RL
- They use DeepSeek-v3 as base and apply GRPO
- After thousands of RL steps, DeepSeek-R1-Zero exhibits super performance
on reasoning benchmarks. For instance, the pass@1 score on AIME 2024 increases from 15.6% to
71.0%, and with majority voting, the score further improves to 86.7%, matching the performance
of OpenAI-o1-0912.

- pipeline: small amount of cold start data, fine tune v3, reasoning-oriented RL, near convergence create new sft data through rejection sample on the RL checkpoint + v3 supervised data, then retrain v3 model. do this again.
- core part: they show that SFT data is not required to develop reasoning - pure RL is enough
- Deepseek r1 zero
	- previous work: https://arxiv.org/pdf/2402.03300 (grpo)
	- goal is to explore the potential of LLMs to develop reasoning capabilities without supervised data, only a pure RL process
	- They use group relative policy optimization (grpo) from their previous work
		- forgoes the critic model (usually same size as policy model) and instead estimates baselines 
		- For each question (q), GRPO samples a group of outputs from the old policy and then optimizes the policy model by maximizing the objective below
		- very difficult need to read more about it
		- https://www.perplexity.ai/search/how-does-the-grpo-reinforcemen-6uEN_IR_RWiIBuNfh1mSPQ

			![[GRPO formula.png]]
- /a


# Background
## What is the problem? Why does it matter?


## What is the current status?


# Solution/Approach


# Experiments and Results



# Next steps

-->