---
title: Generative Retrieval
publish: "true"
---
Traditional neural-based retrieval methods rely on two-tower models, where one tower encodes a query (e.g., a user's search query) and the other encodes items (e.g., products on Amazon). Items are then scored based on the similarity of their embedding with the query embeddings, e.g., using cosine similarity or inner-product. 

On the other hand, generative retrieval models learn a sequence of tokens and then generate new tokens, which can be used for retrieving items. Typically, [[Attention Is All You Need|Transformers]] or [[LLM|LLMs]] are used as the main model. Recent papers (2023-) have shown that this approach generalizes well and can generate different candidates compared to existing approaches. As of 2025, generative retrieval is used at scale to power recommendations for YouTube (see [talk](https://www.youtube.com/watch?v=LxQsQ3vZDqo)) and Pinterest ([[PinRec - Outcome-Conditioned, Multi-Token Generative Retrieval for Industry-Scale Recommendation Systems|PinRec]]).