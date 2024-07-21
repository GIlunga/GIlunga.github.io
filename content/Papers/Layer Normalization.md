---
date: 2024-01-27
tags:
  - "#normalization"
  - year_2016
  - arxiv
  - wip
publish: "true"
aliases:
  - layernorm
---
# Summary
The [paper](https://arxiv.org/abs/1607.06450) introduces *Layer Normalization*, a method for normalization which standardizes each input across all of its features, instead of standardizing each feature across all inputs in a batch (batch normalization, BN). Unlike BN, there is no intra-batch dependency, no need to keep track of means and variances, and no changes in inference (so it works for online inference). This new method is also straightforward to apply to RNNs, unlike BN which needs different statistics per time step and layer. 

# Deep dive
## What is goal of the paper?
- Why does it matter?
- What is the significance/impact of the conclusion?

## What is the approach?
- Is the approach well-motivated given existing literature?

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



**Layer Normalization**
Standardizes each input example across all of its features.

- Does not depend on batch size
- Can be easily applied to RNNs
- Does not change during inference


## Results
- Are they correct?
- Are they rigorous?
- What else could be done?
- Datasets + experiments
- Evaluation metrics

## Next steps
- Where do we go from here?

