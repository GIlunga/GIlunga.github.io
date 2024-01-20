---
created: 2023-07-24
updated: 2023-09-21
Year: "2016"
Institution: Toyota Technological Institute at Chicago
Conference/Journal: Arxiv
URL: http://arxiv.org/abs/1606.08415
tags:
  - activation_function
Related: 
Read: true
Contributions: Introduces GELU, a new non-linearity which is more performant than ReLU.
---
> [!Abstract]  
> We propose the Gaussian Error Linear Unit (GELU), a high-performing neural network activation function. The GELU activation function is xΦ(x), where Φ(x) the standard Gaussian cumulative distribution function. The GELU nonlinearity weights inputs by their value, rather than gates inputs by their sign as in ReLUs (x1x>0). We perform an empirical evaluation of the GELU nonlinearity against the ReLU and ELU activations and find performance improvements across all considered computer vision, natural language processing, and speech tasks.  

> [!Quick Summary]  
>**Summary**:: Introduces a smooth version of the ReLU which weighs inputs by their value (instead of their sign), specifically $x' = x\phi(x)$, where $\phi$ is the Gaussian cdf. The idea comes from trying to merge nonlinearity with regularisation by multiplying the input with a stochastic binary mask following $m \sim Bernoulli(\phi(x))$. Results on small tasks, e.g., CIFAR, show improvements in convergence speed when compared with ReLU. 






%% Import Date: 2023-07-26T14:26:49.648+01:00 %%
