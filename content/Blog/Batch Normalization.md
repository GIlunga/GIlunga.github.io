---
date: 
tags:
  - normalization
  - wip
  - post
publish: "true"
aliases:
  - BN
  - BatchNorm
---

TODO: make this more than just the original paper. cover why internal covariate shift is incorrect and subsequent papers
- https://arxiv.org/pdf/1805.11604
- https://arxiv.org/pdf/2002.10444
- https://papers.nips.cc/paper/2020/file/9b8619251a19057cff70779273e95aa6-Paper.pdf


This post describes [*Batch Normalization*](https://arxiv.org/abs/1502.03167) (BN) and its effect on deep neural networks (DNNs). BN was introduced in 2015 as way to improving the training of deep image models, which typically suffered from vanishing/exploding gradient issues. The **core idea is to standardize the inputs to each layer**, i.e., removing the mean and dividing by the standard deviation. This became extremely successful and BN become widely used.

However, the justification as to *why* it worked was unclear. The original paper cited the idea of **internal covariate shift, i.e., updates in previous layers change the distribution of inputs into the current layer, impacting training.** However, over time more research into the topic has disproven this idea and presented alternatives such as **BN makes the optimization landscape smoother** or **BN biases residual blocks towards the identity function in DNNs).

The post begins by describing the issues that BN solves, followed up by explaining BN and then addressing why it works!

## Why was Batch Normalization needed

- ResNet
- exploding/vanishing gradient




### Batch Normalization
*MLP case*
Assume $\textbf{X} \in R^{N, F}$ with $N$ being the batch size and $F$ being the number of features. 
Then, for each feature $i$ in $\{1, 2, ..., F\}$ :
1) $\mu_{i} = \dfrac{\sum_{n=1}^{N}X_{n, i}}{N}$  
2) $\sigma_{i}^{2} = \sum_{n=1}^{N}(X_{n, i} - \mu_{i})^{2}$
3) $\mathbf{\hat{x}_{i}} = \dfrac{\mathbf{x_{i}}-\mu_{i}}{\sigma_{i}}$
4) $\mathbf{\hat{x}_{i}} = \gamma_{i}\mathbf{\hat{x}_{i}} + \beta_{i}$

*Extra Notes*
- Highly dependant on batch size
- Hard to apply to RNNs
- Needs to keep track of running statistics for inference, uses momentum



