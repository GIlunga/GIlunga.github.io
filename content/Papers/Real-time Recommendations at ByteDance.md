---
date: 2025-05-15
tags:
  - recsys
publish: "true"
aliases:
  - monolith
Year: "2022"
updated: 2026-01-31
---
In 2022, ByteDance released a [paper](https://arxiv.org/abs/2209.07663) detailing their Monolith real-time recommendation framework, which is the core system behind the [BytePlus Recommend product](https://www.byteplus.com/en/product/recommend) (and maybe even TikTok?). The core setup is simple - just keep training the model online with streamed data, instead of re-training every day or every few hours. But of course that is easier said than done, especially at large scale. So let's dive into it!

## Part 1 - Data

Let's assume we have a fantastic model that learns to recommend videos to user based on their actions on past videos, e.g., time spent, likes, and shares. Our goal is to make the model learn from actions as fast as possible after they occur. For that, we need a good data pipeline.

<figure style="text-align: center;">     <img src="Files/Images/RealtimeRecommendations/Monolith-data.png" alt="Image Description" width="1000">    <figcaption><b>Figure 1</b>: Data streaming engine</figcaption> </figure>

Monolith achieves this by logging user actions and their point-in-time features using [Kafka](https://kafka.apache.org/), joining them using [Flink](https://flink.apache.org/), and then placing them into a final Kafka queue of training examples. Essentially, they build a streaming engine for data collection and processing. The training examples are then used for online training (see part 2) and also stored offline for future batch training (e.g., when re-training the model from scratch or changing it).

One obvious problem with this approach is delayed user actions. For example, it may take users a few days to buy a product after being shown a video ad. So we need to log the ad view event, the purchase event days later, and then merge the two into a single training example (let's ignore the casual attribution problem for now). 

Figure 2 shows their solution to this problem. They simply keep an on-disk key-value store with an in-memory cache. When the action log arrives they pull the original features (user and video features) from the cache or key-value store if too much time has passed. 

Finally, they do negative sampling and later apply a log odds correction to ensure the online model is unbiased.

<figure style="text-align: center;">     <img src="Files/Images/RealtimeRecommendations/Monolith-joiner.png" alt="Image Description" width="1000">    <figcaption><b>Figure 2</b>:  Online Joiner</figcaption> </figure>

We now have a streaming queue of training examples ready for online training!

## Part 2 - Training
TODO: WORKER-PS DIAGRAM

Monolith follows TensorFlow's Worker-Parameter Server (PS) architecture, where parameter servers store and update model parameters and workers perform computations. The model is hosted in chunks across online serving PS and in training the PS are synced.

<figure style="text-align: center;">     <img src="Files/Images/RealtimeRecommendations/Monolith-training.png" alt="Image Description" width="1000">    <figcaption><b>Figure 3</b>:  Training Architecture</figcaption> </figure>

Figure 3 describes the training architecture. Whenever we want to train the model, we host it in training PS and use training workers to load data, get parameters, run forward/backward passes, and sync back with the training PS. When training completes, the training and online PS are synced, so the serving model is updated. 

- Idea:
- Online training
- Skipped the image saying feature IDs only - what about dense features
- Then cover modelling decision of cuckoo hashing
- and how sparse updates are more important than dense embeddings
----

Online serving must not stop. Models are usually several TBs in size so synced replacing doesn't work (think of memory reqs and bandwith!). So they do spars updates on the fly. Because
- Sparse params dominate
- Short time range, so only a subset of IDs gets trained and updated
- Dense variables move much slower than sparse embeddings. Only a few sparse embeddings receive updates in a single data batch
ISSUE: I'm not sure I follow this argument...

- They maintain a hash set of touched keys, i.e., IDs whose embeddings get trained since the last param sync. They push the subset of sparse params whose keys are in the set with a minute-level time interval from train to serv PS. This is lightweight and does not spike memory. Because of point 3, they update dense params less frequently. This means they might be stale but in practice that isn't a problem
- for fault tolerance, they snapshot PS daily. In practice the delay results in only a small degradation
- OPEN QUESTION: This seems very task dependent no? Surely not a fully generalizable result
- 

## Part 3 - Modelling

- Cuckoo hashing

---


They do this by relying on TensorFlow parameter servers, which hold different parts of the model (i.e., weights). They found that when training online they can update the weights incrementally without having to do a full synchronized replacement, which is must faster and easier! The key insight is that each update is small and the model being partially updated for a few minutes shouldn't destroy it's performance.

The other key insight is the usage of collision-less hash tables using [cuckoo hashing](https://en.wikipedia.org/wiki/Cuckoo_hashing). Usually in large-scale #recsys we are unable to store embeddings tables for the huge number of users and content. The typical trick is to rely on low-collision hashing (see [hashing trick](https://en.wikipedia.org/wiki/Feature_hashing) on wikipedia). The paper states that when popular users and items collide this hurts model performance. So their strategy is to use cuckoo hashing. The main idea of cuckoo hashing is that you keep two tables and two hash functions. When you can't insert an item in the first table with the first hash (because the position is occupied), you insert it anyway, and then try to insert the existing one in the other table with the other hash. You keep repeating this loop and may need to rehash at some point. See the link for more info :)

That's basically all there is to it. So not the most interesting paper but it is cool to see that ByteDance is able to do online training at such scale!


