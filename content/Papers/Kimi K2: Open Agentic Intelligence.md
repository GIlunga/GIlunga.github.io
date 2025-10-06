---
date: 2025-09-01
tags:
  - paper
publish: "true"
aliases:
Year: "2025"
---
<div style="text-align: center; margin: 2rem 0; padding-bottom: 1rem; border-bottom: 2px solid var(--lightgray);">
  <b>
  <p style="margin: 0.5rem 0; color: var(--darkgray); font-style: italic;">
     Kimi Team
  </p>
  <p style="margin: 0.5rem 0;">
    Moonshot ai
  </p>
  </b>
  <div style="display: flex; justify-content: center; margin: 1rem 0; gap: 0.5rem;">
    <a href="https://arxiv.org/abs/2507.20534" target="_blank" style="display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; border-radius: 5px; text-decoration: none; font-weight: 600; font-size: 1rem; transition: all 0.2s ease; border: 1px solid var(--secondary); background-color: var(--secondary); color: var(--light); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      📄 Paper
    </a>
  </div>
</div>

Things to highlight:
- Very similar to [[DeepSeek-V3 Technical Report|DeepSeek-V3]],  MoE with MLA (from deepseek v2 originally)
- Muon clip. Especially the Muon instability ideas vs AdamW
- More sparsity than usual (1T params but only 32B activated) - nice sparsity scaling law
- Data generation pipeline
	- rephrasing even just once leads to large accuracy improvements in QA tasks
	- Tool synthesis is cool
	- LLM judge with rubrics
- Less attention heads, since improvement was small and cost was large
- A lot of work on reducing memory overhead - selective recomputation, FP8 storage for some activations, CPU-offloading
- Yarn to extend context-window, done as a second stage with 32K length data
- Simple RL algorithm