---
date: 2025-01-03
tags:
  - wip
  - "#paper"
  - recommender_systems
publish: "false"
aliases:
  - monolith
Year: "2022"
---
- the entire point is around real time updates to recommender systems, instead of the standard train then serve x hours/days later
- problems with deep learning in recommender systems:
	- Sparse, categorical features that are mostly changing and with many being low frequency (not like cv/nlp)
	- Concept drift, i.e., underlying distribution of training data is non-stationary
- We can't map the categorical features to embedding tables in a naive way - too many users/interactions (i.e., features)
	- low collision hashing is a traditional way to get over this
	- Might now work well since the data is not normally distributed
- One way around concept drift is to update the model with the latest user feedback as soon as possible, to ensure we are always adjusted and not drifting
- Collisionless hash tables for embedding tables:
	- goal is to avoid having the same embedding representing different feature ids, which happens when hashes collide
	- They utilize the Cuckoo HashMap which supports inserting new keys without colliding with existing ones - worst case O(1) for lookups/deletions and amortized O(1) for insertions
	- TODO: describe method. Essentially keeps two tables and two hashes, tries inserting in the first one and if it doesn't work, it evict cycles until it is stable or rehashes
	- They also don't insert all IDs into the table - they remove low occurence ones and stale IDs (they expire!)
- Two stage training
	- batch training - useful when they modify architecture
	- online:

# Summary
The [paper](https://arxiv.org/abs/2209.07663) introduces 

# Background
## What is the problem? Why does it matter?


## What is the current status?


# Solution


# Experiments and Results



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

