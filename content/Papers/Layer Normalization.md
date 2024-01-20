---
created: 2023-07-24
updated: 2023-09-21
Year: "2016"
Institution: University of Toronto
Conference/Journal: Arxiv
URL: http://arxiv.org/abs/1607.06450
tags:
  - normalization_layer
Related: 
Read: true
Contributions: Introduces Layer Normalization, which works for online inference and RNNs.
---
> [!Abstract]  
> Training state-of-the-art, deep neural networks is computationally expensive. One way to reduce the training time is to normalize the activities of the neurons. A recently introduced technique called batch normalization uses the distribution of the summed input to a neuron over a mini-batch of training cases to compute a mean and variance which are then used to normalize the summed input to that neuron on each training case. This signiﬁcantly reduces the training time in feedforward neural networks. However, the effect of batch normalization is dependent on the mini-batch size and it is not obvious how to apply it to recurrent neural networks. In this paper, we transpose batch normalization into layer normalization by computing the mean and variance used for normalization from all of the summed inputs to the neurons in a layer on a single training case. Like batch normalization, we also give each neuron its own adaptive bias and gain which are applied after the normalization but before the non-linearity. Unlike batch normalization, layer normalization performs exactly the same computation at training and test times. It is also straightforward to apply to recurrent neural networks by computing the normalization statistics separately at each time step. Layer normalization is very effective at stabilizing the hidden state dynamics in recurrent networks. Empirically, we show that layer normalization can substantially reduce the training time compared with previously published techniques.  

> [!Quick Summary]  
>**Summary**:: Introduces Layer Normalization, a method for normalization which standardizes each input across all of its features, instead of standardizing each feature across all inputs in a batch (BN). Unlike BN, there is no intra-batch dependency, no need to keep track of means and variances, and no changes in inference (it allows for online inference!). This new method is also straightforward to apply to RNNs, unlike BN (need different statistics per time step and layer). 
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
- 

![[Pasted image 20230810165935.png]]
%% Import Date: 2023-07-26T14:26:49.482+01:00 %%
