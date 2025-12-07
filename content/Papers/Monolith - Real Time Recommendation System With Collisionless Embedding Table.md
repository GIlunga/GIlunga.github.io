---
date: 2025-05-15
tags:
  - recsys
publish: "true"
aliases:
  - monolith
Year: "2022"
updated: 2025-12-07
---
The [paper](https://arxiv.org/abs/2209.07663) ([Github](https://github.com/bytedance/monolith?tab=readme-ov-file)) introduces Monolith, ByteDance's recommendation system powering TikTok (and the [BytePlus Recommend product](https://www.byteplus.com/en/product/recommend)). Unfortunately, it doesn't cover any actual modelling, just infrastructure. Still, it offers some clarity on how TikTok is able to so quickly adapt to user actions and new events!

The core setup is simple - just keep training the model online with streamed data, instead of re-training every day or every n hours. But this is easier said than done, especially at TikTok scale. So let's dive deep into it!

## Part 1 - Data

First things first, how do they prep the data? Basically they use log user actions and their features at the time using Kafka, join them using Flink, and then place them into a final Kafka queue of training examples. When changing their architecture, they rely on offline batch training. Basically the online data gets dumped into HDFS and then picked up by a training worker. Otherwise, the training worker directly picks it up (see part 2).
<figure style="text-align: center;">     <img src="Files/Images/Monolith-data.png" alt="Image Description" width="1000">    <figcaption><b>Figure 1</b>: data streaming engine (from the paper)</figcaption> </figure>




They do this by relying on TensorFlow parameter servers, which hold different parts of the model (i.e., weights). They found that when training online they can update the weights incrementally without having to do a full synchronized replacement, which is must faster and easier! The key insight is that each update is small and the model being partially updated for a few minutes shouldn't destroy it's performance.

The other key insight is the usage of collision-less hash tables using [cuckoo hashing](https://en.wikipedia.org/wiki/Cuckoo_hashing). Usually in large-scale #recsys we are unable to store embeddings tables for the huge number of users and content. The typical trick is to rely on low-collision hashing (see [hashing trick](https://en.wikipedia.org/wiki/Feature_hashing) on wikipedia). The paper states that when popular users and items collide this hurts model performance. So their strategy is to use cuckoo hashing. The main idea of cuckoo hashing is that you keep two tables and two hash functions. When you can't insert an item in the first table with the first hash (because the position is occupied), you insert it anyway, and then try to insert the existing one in the other table with the other hash. You keep repeating this loop and may need to rehash at some point. See the link for more info :)

That's basically all there is to it. So not the most interesting paper but it is cool to see that ByteDance is able to do online training at such scale!


