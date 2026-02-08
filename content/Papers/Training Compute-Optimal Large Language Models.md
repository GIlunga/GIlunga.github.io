---
updated: 2023-10-29
Year: "2022"
Institution: DeepMind
Conference/Journal: Arxiv
URL: http://arxiv.org/abs/2203.15556
tags:
  - LM
  - Transformer
Related: "[[Measuring Massive Multitask Language Understanding]]"
Read: false
Contributions: Introduces Chinchilla. Shows with large scale experiments (400+ models) that LMs should be scaled linearly in terms of their size (parameters) and number of training tokens. They show that a "compute-optimal" model with less parameters than GPT-3 and Gopher can outperform them.
aliases:
  - Chinchilla
publish: "false"
---


## What is the paper about? Why is the problem important?

The paper is trying to answer the following question: 
>Given a fixed FLOPs budget (for example, knowing the number of accelerators and a target training duration), how should one trade-off model size and the number of training tokens?

Follow-up from previous work (Gopher, do I have it?)

At the point this paper was published, a series of [[Attention Is All You Need|Transformer]] based Large Language Models (LLMs) had just been introduced (TODO: have them and list them!Brown et al., 2020; Lieber et al., 2021; Rae et al., 2021; Smith et al., 2022; Thoppilan et al., 2022), with sizes up to 500B parameters. 


Recently a series of Large Language Models (LLMs) have been introduced (Brown et al., 2020; Lieber et al., 2021; Rae et al., 2021; Smith et al., 2022; Thoppilan et al., 2022), with the largest dense
language models now having over 500 billion parameters. These large autoregressive transformers
(Vaswani et al., 2017) have demonstrated impressive performance on many tasks using a variety of
evaluation protocols such as zero-shot, few-shot, and fine-tuning.
The compute and energy cost for training large language models is substantial (Rae et al., 2021;
Thoppilan et al., 2022) and rises with increasing model size. In practice, the allocated training
compute budget is often known in advance: how many accelerators are available and for how long
we want to use them. Since it is typically only feasible to train these large models once, accurately
estimating the best model hyperparameters for a given compute budget is critical (Tay et al., 2021).
Kaplan et al. (2020) showed that there is a power law relationship between the number of
parameters in an autoregressive language model (LM) and its performance. As a result, the field has
been training larger and larger models, expecting performance improvements. One notable conclusion
in Kaplan et al. (2020) is that large models should not be trained to their lowest possible loss to be
compute optimal. Whilst we reach the same conclusion, we estimate that large models should be
trained for many more training tokens than recommended by the authors. Specifically, given a 10
increase computational budget, they suggests that the size of the model should increase 55 while
the number of training tokens should only increase 1.8. Instead, we find that model size and the
number of training tokens should be scaled in equal proportions.
## How does the paper address the problem?


## Conclusions, limitations, and next steps








- Typically models are trained on datasets of 300B tokens but the model size is increased when the compute is increased
- "In this work, we revisit the question: Given a fixed FLOPs budget (For example, knowing the number of accelerators and a target training duration), how should one trade-off model size and the number of training tokens?"
- reduced model size reduces inference cost considerably and greatly facilitates downstream uses on smaller hardware
- The drive to train larger and larger models is clear—so far increasing the size of language models has been responsible for improving the state-of-the-art in many language modelling tasks. Nonetheless, large language models face several challenges, including their overwhelming computational requirements (the cost of training and inference increase with model size) (Rae et al., 2021; Thoppilan et al., 2022) and the need for acquiring more high-quality training data. 
-  In contrast, we find that setting the learning rate schedule to approximately match the number of training tokens results in the best final loss regardless of model size
- "based on our estimated compute-optimal frontier, we predict that for the compute budget used to train Gopher, an optimal model should be 4 times smaller, while being training on 4 times more tokens. We verify this by training a more compute-optimal 70B model, called Chinchilla, on 1.4 trillion tokens. Not only does Chinchilla outperform its much larger counterpart, Gopher, but its reduced model size reduces inference cost considerably and greatly facilitates downstream uses on smaller hardware."
- 


%% Import Date: 2023-07-24T22:46:12.188+01:00 %%
