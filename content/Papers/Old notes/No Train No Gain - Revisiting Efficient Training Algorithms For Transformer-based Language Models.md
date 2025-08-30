---
created: 2023-07-24
updated: 2023-07-24
---
>[!info]  
> **Year**:: 2023
> **Title**: No Train No Gain: Revisiting Efficient Training Algorithms For Transformer-based Language Models
> **Authors**: Jean Kaddour, Oscar Key, Piotr Nawrot, Pasquale Minervini, Matt J. Kusner
>   
> **URL**: http://arxiv.org/abs/2307.06440
> **Status**:: Want to Read
> **Stars**::
> **Tags**:


> [!Abstract]  
> The computation necessary for training Transformer-based language models has skyrocketed in recent years. This trend has motivated research on efficient training algorithms designed to improve training, validation, and downstream performance faster than standard training. In this work, we revisit three categories of such algorithms: dynamic architectures (layer stacking, layer dropping), batch selection (selective backprop, RHO loss), and efficient optimizers (Lion, Sophia). When pre-training BERT and T5 with a fixed computation budget using such methods, we find that their training, validation, and downstream gains vanish compared to a baseline with a fully-decayed learning rate. We define an evaluation protocol that enables computation to be done on arbitrary machines by mapping all computation time to a reference machine which we call reference system time. We discuss the limitations of our proposed protocol and release our code to encourage rigorous research in efficient training procedures: https://github.com/JeanKaddour/NoTrainNoGain.  

> [!Quick Summary]  
>**Summary**::



%% Import Date: 2023-07-27T22:22:05.075+01:00 %%
