#!/usr/bin/env node

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Extract arXiv paper ID from URL
 * @param {string} url - arXiv URL
 * @returns {string} - Paper ID
 */
function extractArxivId(url) {
  const match = url.match(/arxiv\.org\/abs\/(.+)/);
  if (!match) {
    throw new Error('Invalid arXiv URL format');
  }
  return match[1];
}

/**
 * Fetch paper metadata from arXiv API
 * @param {string} paperId - arXiv paper ID
 * @returns {Promise<Object>} - Paper metadata
 */
function fetchArxivMetadata(paperId) {
  return new Promise((resolve, reject) => {
    const url = `https://export.arxiv.org/api/query?id_list=${paperId}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          // Parse XML response (with dotall flag for multiline)
          const title = data.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace('arXiv:', '').trim().replace(/\s+/g, ' ');
          const authors = [...data.matchAll(/<name>(.+?)<\/name>/g)]
            .map(match => match[1]);
          const published = data.match(/<published>(.+?)<\/published>/)?.[1];
          const year = published ? new Date(published).getFullYear() : '';
          
          resolve({
            title: title || 'Unknown Title',
            authors: authors.length > 0 ? authors : ['Unknown Authors'],
            year: year.toString(),
            arxivId: paperId,
            arxivUrl: `https://arxiv.org/abs/${paperId}`
          });
        } catch (error) {
          reject(new Error('Failed to parse arXiv response'));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Generate paper markdown content
 * @param {Object} metadata - Paper metadata
 * @returns {string} - Markdown content
 */
function generatePaperMarkdown(metadata) {
  const { title, authors, year, arxivUrl } = metadata;
  const today = new Date().toISOString().split('T')[0];
  
  return `---
date: ${today}
tags:
  - paper
publish: "true"
aliases:
Year: "${year}"
---
<div style="text-align: center; margin: 2rem 0; padding-bottom: 1rem; border-bottom: 2px solid var(--lightgray);">
  <b>
  <p style="margin: 0.5rem 0; color: var(--darkgray); font-style: italic;">
    ${authors.join(', ')}
  </p>
  <p style="margin: 0.5rem 0;">
    
  </p>
  </b>
  <div style="display: flex; justify-content: center; margin: 1rem 0; gap: 0.5rem;">
    <a href="${arxivUrl}" target="_blank" style="display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; border-radius: 5px; text-decoration: none; font-weight: 600; font-size: 1rem; transition: all 0.2s ease; border: 1px solid var(--secondary); background-color: var(--secondary); color: var(--light); box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      📄 Paper
    </a>
  </div>
</div>

`;
}

/**
 * Create paper file
 * @param {string} arxivUrl - arXiv URL
 * @param {boolean} force - Whether to overwrite existing files
 */
async function createPaper(arxivUrl, force = false) {
  try {
    const paperId = extractArxivId(arxivUrl);
    console.log(`Fetching metadata for arXiv paper: ${paperId}`);
    
    const metadata = await fetchArxivMetadata(paperId);
    console.log(`Found paper: "${metadata.title}" by ${metadata.authors.join(', ')}`);
    
    const markdown = generatePaperMarkdown(metadata);
    const filename = `${metadata.title}.md`;
    const filepath = path.join(__dirname, '..', 'content', 'Papers', filename);
    
    // Check if file already exists
    if (fs.existsSync(filepath) && !force) {
      console.log(`File already exists: ${filename}`);
      console.log('Use --force to overwrite');
      return;
    }
    
    fs.writeFileSync(filepath, markdown);
    console.log(`Created paper file: ${filename}`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node generate-paper.js <arxiv-url> [--force]');
    console.log('Example: node generate-paper.js https://arxiv.org/abs/1808.09781');
    console.log('Options:');
    console.log('  --force    Overwrite existing files');
    process.exit(1);
  }
  
  const force = args.includes('--force');
  const url = args.find(arg => !arg.startsWith('--'));
  
  if (!url) {
    console.log('Error: Please provide an arXiv URL');
    process.exit(1);
  }
  
  createPaper(url, force);
}

export { createPaper, extractArxivId, fetchArxivMetadata };