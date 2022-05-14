---
title: "First Post - Introductions and Goal Setting"
categories:
  - Meta
  
toc: true
toc_label: "Contents"
toc_icon: "bookmark"
---

Hello! Since this is the first post, I will write a little bit about myself and my goals for this blog.

## Introduction
### Portuguese poetry generation with Recurrent Neural Networks
My first experience with Machine Learning (ML) was when I was finishing my bachelor's at the University of Lisbon, in 2016. At the time, I was taking the artificial intelligence course which was focused almost exclusively on search algorithms (e.g. A*) and standard ML methods such as decision trees and naive bayes classifiers. I found these methods to be interesting but wanted to get some hands on experience with the latest methods in ML research before deciding what to focus on for my master's. 

After reaching out to some professors, I was able to start an internship working on poetry generation with Recurrent Neural Networks (RNNs). Our approach was to essentially follow "recent" work on chinese poetry generation [[1, 2](#references)] but apply it to portuguese poetry. This was a great opportunity to learn about Neural Networks and Tensorflow (note that these were the pre-Pytorch dark ages).

Ultimately, this was a fantastic experience which convinced me to pursue ML courses during my master's.

### Master thesis on optimization for architecture
While I did take ML courses during my master's, I struggled to find thesis topics that I was interested in pursuing. In the end, I chose to work with my advanced programming professor on a project with not that much ML - optimization for architecture and structural engineering.

The premise was somewhat simple - over the years the Algorithmic Design for Architecture group [[3](#references)] had developed software to programmatically define "buildings and structures", following the algorithmic design principles. There are also integrations with multiple visualization tools (e.g. AutoCad) and with analyis tools (e.g. Robot). For my master's, I worked on integrating this approach with several optimization algorithms, including model-based methods which used radial basis functions and gaussian processes networks [[4](#references)].


### Research engineering at Microsoft Research Cambridge
In September 2018, I joined Microsoft Research Cambridge for their inaugural AI Residency program. I worked on brain tumour segmentation with CNNs (TODO cite papers)


RSE Work

### Applied science for advertising at Amazon Edinburgh
Amazon Work


## Goals for this blog
Now that the introduction is out of the way, what's the point of this blog? Well, to be frank, I am starting this blog a way of pushing myself to 1) stay up to date with research and 2) improve my writing and summarization skills. I found that over time I tend to focus only on learning about research that is close to my current work and start to lose track of the latest advances in areas I am interested in. Also, even when I do read and take quick notes, I never really sit down and write a proper review. So, hopefully, this blog will help!

Besides this first post, I have a few ideas for potential interesting posts (besides simple paper summaries):
- Workflow for storing papers/references, linking with Notion for tracking and note taking, and linking with Xodo for annotating.
- Discussion on latest Vision-Language and generative models, i.e. CLIP, DALL-E, and Flamingo
- Discussion on image segmentation and object detection
- Story and or poetry generation
- style transfer
- domain adaptation

Besides writing about papers, I will also try to either implement the models or showcase them using Google Colab or HuggingFace Spaces.

Anyway, that's all for this post, if you made it all the way here, thanks for reading!

## References
[1] Xingxing Zhang and Mirella Lapata. [_Chinese Poetry Generation with Recurrent Neural Networks_](https://aclanthology.org/D14-1074/). EMNLP 2014.

[2] Rui Yan. [_i, Poet: Automatic Poetry Composition through Recurrent Neural Networks with Iterative Polishing Schema_](https://www.ijcai.org/Abstract/16/319). IJCAI 2016.

[3] [Algorithmic Design for Architecture group page](https://algorithmicdesign.github.io/)

[4] Guilherme Ilunga and António Leitão. [_Derivative-free Methods for Structural Optimization_](http://papers.cumincad.org/cgi-bin/works/paper/ecaade2018_247). Education
and Research in Computer-Aided Architectural Design in Europe Conference (eCAADe) 2018.