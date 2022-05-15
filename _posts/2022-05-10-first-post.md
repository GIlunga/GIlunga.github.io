---
title: "First Post - Introductions and Goal Setting"
categories:
  - Meta
classes: wide
toc: true
toc_label: "Contents"
toc_icon: "bookmark"
---

Hello! Since this is the first post, I will write a little bit about myself and my goals for this blog.

## Introduction
### Portuguese poetry generation
My first experience with Machine Learning (ML) was when I was finishing my bachelor's at the University of Lisbon, in 2016. At the time, I was taking the artificial intelligence course which was focused almost exclusively on search algorithms (e.g. A*) and standard ML methods such as decision trees and naive bayes classifiers. I found these methods to be interesting but wanted to get some hands on experience with the latest methods in ML research before deciding what to focus on for my master's. 

After reaching out to some professors, I was able to start an internship working on poetry generation with Recurrent Neural Networks (RNNs). Our approach was to essentially follow "recent" work on chinese poetry generation [[1, 2](#references)] but apply it to portuguese poetry. This was a great opportunity to learn about Neural Networks, Natural Language Processing (NLP), and Tensorflow (note that these were the pre-Pytorch dark ages).

Ultimately, this was a great experience and I decided to pursue ML courses during my master's.

### Master thesis on optimization for architecture
While I did take ML courses during my master's, I struggled to find thesis topics that I was interested in pursuing. In the end, I chose to work with my advanced programming professor on a project with not that much ML in it - optimization for architecture and structural engineering.

The premise was somewhat simple - over the years the [Algorithmic Design for Architecture group](https://algorithmicdesign.github.io/) had developed software to programmatically define "buildings and structures", following algorithmic and parametric design principles. The group also developed several integrations with visualization (e.g. AutoCad) and analysis tools (e.g. Robot). For my master's, I worked on integrating this approach with optimization algorithms, including model-based methods which used radial basis functions and gaussian processes [[3, 4](#references)].

I found this applied project to be quite interesting and overall had a lot of fun doing it! 

### Research engineering at Microsoft Research Cambridge
In September 2018, a few months before presenting my master's thesis, I joined Microsoft Research Cambridge for their inaugural AI Residency program. For one year, I had a chance to work on two projects while also being given the opportunity to attend lectures by some of the researchers there. The first project I worked on was [project InnerEye](https://www.microsoft.com/en-us/research/project/medical-image-analysis/). In this project, we followed work done by previous interns on brain tumour segmentation with 3D Convolutional Neural Networks (CNNs) [[5](#references)]. Our goal was to experiment with different variations of this network on different datasets and tasks, while building a single codebase for the team to use moving forward. This was my first time working with CNNs and Computer Vision (CV) in general. I found it to be a great learning experience and I became much more motivated to learn more about CV instead of just NLP.

In my second project, I worked with the Microsoft Bellevue team on their smart reply product for Outlook and Teams. As a starting point, we used their recently developed model, which matched input text representations to reply representations [[6](#references)]. Unfortunately I cannot discuss in depth what we were working on specifically, but the project was focused on NLP representation learning.

After being an AI resident for 1 year, I joined as a Research Software Engineer II. I worked on multiple projects during this time, e.g., Holographic Storage Devices ([HSD](https://www.microsoft.com/en-us/research/project/hsd/)), privacy-preserving language models (with the [confidential AI group](https://www.microsoft.com/en-us/research/project/confidential-ai/)), and mesh generation (intern project), and also had a chance to supervise new AI residents and interns.

Overall, during my 2.5 years at MSR I worked on multiple projects across CV and NLP and was able to significantly grow as an engineer, scientist, and person.

### Applied science for advertising at Amazon Edinburgh
In May 2021, I joined Amazon Edinburgh as an Applied Scientist in their advertising team. Sadly I cannot go into too much detail regarding my work but I can mention that we are trying to create meaningful contextual user representations for user interest prediction. These representations are part of a new effort to maintain the current targeted advertising but with a reduced or null usage of user data. Contrary to my work thus far, at Amazon I am working directly on a product and see the impact of my research.  

## Goals for this blog
Now that the introduction is out of the way, it's time to talk about this blog and what my goals are. To be honest, I am starting this blog a way of pushing myself to 1) stay up to date with the latest research, 2) improve my writing and summarization skills, and 3) . I found that over time I tend to focus only on learning about research that is close to my current work and start to lose track of the latest advances in areas I am interested in. Also, even when I do read and take quick notes, I never really sit down and write a proper review. So, hopefully, this blog will help!

Besides this first post, I have a few ideas for potential interesting posts (besides paper summaries):
- Vision-Language and generative models, i.e. CLIP, DALL-E, and Flamingo
- Image segmentation and object detection
- Story and/or poetry generation
- Domain adaptation

Besides writing about papers, I will also try to either implement the models or showcase them using Google Colab or HuggingFace Spaces.

Anyway, that's all for this post, if you made it all the way here, thanks for reading!

## References
1. Xingxing Zhang and Mirella Lapata. [_Chinese Poetry Generation with Recurrent Neural Networks_](https://aclanthology.org/D14-1074/). EMNLP 2014.

2. Rui Yan. [_i, Poet: Automatic Poetry Composition through Recurrent Neural Networks with Iterative Polishing Schema_](https://www.ijcai.org/Abstract/16/319). IJCAI 2016.

3. Guilherme Ilunga and António Leitão. [_Derivative-free Methods for Structural Optimization_](http://papers.cumincad.org/cgi-bin/works/paper/ecaade2018_247). eCAADe 2018.

4. Guilherme Ilunga. [_Single-Objective Optimization for Architecture_](https://gilunga.github.io/assets/docs/guilherme_ilunga_msc_thesis.pdf). Master's thesis, 2019.

5. Yao Qin, Konstantinos Kamnitsas, Siddharth Ancha, et al.. [_Autofocus Layer for Semantic Segmentation_](https://arxiv.org/abs/1805.08403). MICCAI 2018.

6. Budhaditya Deb, Peter Bailey, and Milad Shokouhi. [_Diversifying Reply Suggestions Using a Matching-Conditional Variational Autoencoder_](https://aclanthology.org/N19-2006/). NAACL 2019.