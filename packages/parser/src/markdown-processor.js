/**
 * --------------------------------------------------------------------
 * docmd : the minimalist, zero-config documentation generator.
 *
 * @package     @docmd/core (and ecosystem)
 * @website     https://docmd.io
 * @repository  https://github.com/docmd-io/docmd
 * @license     MIT
 * @copyright   Copyright (c) 2025 docmd.io
 *
 * [docmd-source] - Please do not remove this header.
 * --------------------------------------------------------------------
 */

const MarkdownIt = require('markdown-it');
const matter = require('gray-matter');
const hljs = require('highlight.js');

// Standard Plugins
const attrs = require('markdown-it-attrs');
const footnote = require('markdown-it-footnote');
const taskLists = require('markdown-it-task-lists');
const abbr = require('markdown-it-abbr');
const deflist = require('markdown-it-deflist');
const emoji = require('markdown-it-emoji');

// The Feature Registry
const { registerFeatures } = require('./features');

// Custom Heading ID & Anchor Logic
const headingIdPlugin = (md) => {
  md.core.ruler.push('heading_anchors', function(state) {
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i];
      
      if (token.type === 'heading_open') {
        const level = parseInt(token.tag.slice(1), 10);
        const inlineToken = state.tokens[i + 1];
        
        // 1. Generate ID if not present
        let id = token.attrGet('id');
        if (!id && inlineToken && inlineToken.content) {
          id = inlineToken.content
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\u4e00-\u9fa5-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
          if (id) token.attrSet('id', id);
        }

        // 2. Inject Hover Anchor as an HTML Token (for H2, H3, H4)
        if (id && level >= 2 && level <= 4) {
          let existingClass = token.attrGet('class') || '';
          token.attrSet('class', `${existingClass} docmd-heading`.trim());

          if (inlineToken && inlineToken.children) {
            const anchorToken = new state.Token('html_inline', '', 0);
            anchorToken.content = `<a href="#${id}" class="heading-anchor" aria-label="Permalink to this section"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link2-icon lucide-link-2"><path d="M9 17H7A5 5 0 0 1 7 7h2m6 0h2a5 5 0 1 1 0 10h-2m-7-5h8"/></svg></a>`;
            
            // Insert the anchor at the beginning of the heading text
            inlineToken.children.unshift(anchorToken);
          }
        }
      }
    }
  });
};

// Main Factory Function to Create a Markdown Processor
function createMarkdownProcessor(config = {}, pluginsCallback) {
  const mdOptions = {
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  };

  // Syntax Highlighting
  const highlightFn = (str, lang) => {
    if (lang === 'mermaid') {
      return `<pre class="mermaid">${new MarkdownIt().utils.escapeHtml(str)}</pre>`;
    }
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
        return `<pre class="hljs"><code>${highlighted}</code></pre>`;
      } catch (e) { /* ignore */ }
    }
    return `<pre class="hljs"><code>${new MarkdownIt().utils.escapeHtml(str)}</code></pre>`;
  };

  mdOptions.highlight = config.theme?.codeHighlight !== false ? highlightFn : (str, lang) => {
    if (lang === 'mermaid') return `<pre class="mermaid">${new MarkdownIt().utils.escapeHtml(str)}</pre>`;
    return `<pre><code>${new MarkdownIt().utils.escapeHtml(str)}</code></pre>`;
  };

  const md = new MarkdownIt(mdOptions);

  // Core Plugins
  md.use(attrs, { leftDelimiter: '{', rightDelimiter: '}' });
  md.use(footnote);
  md.use(taskLists);
  md.use(abbr);
  md.use(deflist);
  md.use(emoji);
  md.use(headingIdPlugin);

  // Register Built-in Features
  registerFeatures(md);

  // Source-map & block-ID renderer plugin (dev mode only)
  if (config.isDev) {
    // A. Core rule: assign block IDs to all tokens
    md.core.ruler.push('assign_block_ids', function(state) {
      const tokens = state.tokens;
      const stack = []; // stack of sibling counters per nesting level
      let idx = 0;

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.nesting === 1) {
          // Opening token — assign ID from current path, then push new level
          const path = stack.length
            ? stack.map(s => s.idx).join('.') + '.' + idx
            : String(idx);
          token.meta = token.meta || {};
          token.meta.blockId = path;
          stack.push({ idx });
          idx = 0; // reset for children
        } else if (token.nesting === -1) {
          // Closing token — pop level, restore parent counter
          const frame = stack.pop();
          if (frame !== undefined) {
            idx = frame.idx + 1;
          }
        } else {
          // Self-closing / block-level token (hr, html_block, inline, etc.)
          if (token.type === 'inline' || token.type === 'hr' || token.type === 'html_block') {
            const path = stack.length
              ? stack.map(s => s.idx).join('.') + '.' + idx
              : String(idx);
            token.meta = token.meta || {};
            token.meta.blockId = path;

            // D. Inline token ID assignment
            if (token.type === 'inline' && token.children) {
              const parentBlockId = token.meta.blockId;
              let inlineIdx = 0;
              const inlineStack = [];
              for (const child of token.children) {
                if (child.nesting === 1) {
                  child.meta = child.meta || {};
                  child.meta.blockId = parentBlockId + ':' + (inlineStack.length ? inlineStack.map(s => s.idx).join('.') + '.' : '') + inlineIdx;
                  inlineStack.push({ idx: inlineIdx });
                  inlineIdx = 0; // reset for children
                } else if (child.nesting === -1) {
                  const frame = inlineStack.pop();
                  if (frame) inlineIdx = frame.idx + 1;
                } else if (child.type === 'code_inline') {
                  child.meta = child.meta || {};
                  child.meta.blockId = parentBlockId + ':' + (inlineStack.length ? inlineStack.map(s => s.idx).join('.') + '.' : '') + inlineIdx;
                  inlineIdx++;
                }
                // text, softbreak, etc. don't get IDs
              }
            }

            if (token.type === 'hr' || token.type === 'html_block') {
              idx++;
            }
          }
        }
      }
    });

    // B. Override renderToken to inject data-source-map and data-block-id
    const originalRenderToken = md.renderer.renderToken.bind(md.renderer);
    md.renderer.renderToken = function(tokens, idx, options) {
      const token = tokens[idx];
      if (token.nesting === 1 && token.map && token.meta && token.meta.blockId) {
        token.attrPush(['data-source-map', token.map[0] + ':' + token.map[1]]);
        token.attrPush(['data-block-id', token.meta.blockId]);
      }
      return originalRenderToken(tokens, idx, options);
    };

    // C. Override inline element renderers to inject data-block-id
    const inlineOpenTypes = ['strong_open', 'em_open', 'link_open', 's_open'];
    for (const type of inlineOpenTypes) {
      const original = md.renderer.rules[type] || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };
      md.renderer.rules[type] = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        if (token.meta && token.meta.blockId) {
          token.attrPush(['data-block-id', token.meta.blockId]);
        }
        return original(tokens, idx, options, env, self);
      };
    }

    // code_inline is self-closing, so we wrap the output
    const originalCodeInline = md.renderer.rules.code_inline || function(tokens, idx, options, env, self) {
      const token = tokens[idx];
      return '<code>' + md.utils.escapeHtml(token.content) + '</code>';
    };
    md.renderer.rules.code_inline = function(tokens, idx, options, env, self) {
      const token = tokens[idx];
      if (token.meta && token.meta.blockId) {
        return '<code data-block-id="' + md.utils.escapeHtml(token.meta.blockId) + '">' + md.utils.escapeHtml(token.content) + '</code>';
      }
      return originalCodeInline(tokens, idx, options, env, self);
    };
  }

  // External Plugins Hook
  if (typeof pluginsCallback === 'function') {
    pluginsCallback(md);
  }

  const defaultLinkOpen = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex('href');
    
    if (hrefIndex >= 0) {
      let href = token.attrs[hrefIndex][1];
      
      const isExternal = href.match(/^(?:[a-z]+:|\/\/)/i);
      const isAsset = href.match(/(^|\/)assets\//);
      const isHashOnly = href.startsWith('#');

      if (!isExternal && !isAsset && !isHashOnly) {
        // Extract hash if it exists (e.g., info.md#section)
        let hash = '';
        const hashIndex = href.indexOf('#');
        if (hashIndex >= 0) {
          hash = href.substring(hashIndex);
          href = href.substring(0, hashIndex);
        }

        if (href.endsWith('.md')) {
          href = href.replace(/\.md$/, '');
          
          // If the page was shifted into a subfolder (Clean URLs), we must traverse up one level
          if (!href.startsWith('/') && env && env.isIndex === false) {
            if (href.startsWith('./')) {
              href = '../' + href.substring(2);
            } else {
              href = '../' + href;
            }
          }
          
          token.attrs[hrefIndex][1] = href + hash;
        }
      }
    }
    return defaultLinkOpen(tokens, idx, options, env, self);
  };

  return md;
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
}

function extractHeadings(html) {
  const headings = [];
  const regex = /<h([1-6])[^>]*?id="([^"]*)"[^>]*?>([\s\S]*?)<\/h\1>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1], 10),
      id: match[2],
      text: match[3].replace(/<\/?[^>]+(>|$)/g, '').trim()
    });
  }
  return headings;
}

function processContent(rawString, mdInstance, config, env = {}) {
  let frontmatter, markdownContent;

  // Compute frontmatterLineCount before gray-matter parse
  let frontmatterLineCount = 0;
  if (rawString.startsWith('---')) {
    const closingIndex = rawString.indexOf('---', 3);
    if (closingIndex !== -1) {
      frontmatterLineCount = rawString.substring(0, closingIndex + 3).split('\n').length;
      if (rawString[closingIndex + 3] === '\n') frontmatterLineCount++;
    }
  }

  try {
    const parsed = matter(rawString);
    frontmatter = parsed.data;
    markdownContent = parsed.content;
  } catch (e) {
    console.error('Error parsing frontmatter:', e.message);
    return null;
  }

  if (!frontmatter.title && config.autoTitleFromH1 !== false) {
    const h1Match = markdownContent.match(/^#\s+(.*)/m);
    if (h1Match) frontmatter.title = h1Match[1].trim();
  }

  let htmlContent, headings;
  if (frontmatter.noStyle === true) {
    htmlContent = markdownContent;
    headings =[];
  } else {
    htmlContent = mdInstance.render(markdownContent, env);
    headings = extractHeadings(htmlContent);
  }

  let searchData = null;
  if (!frontmatter.noindex) {
    searchData = {
      title: frontmatter.title || 'Untitled',
      content: stripHtml(htmlContent).slice(0, 5000),
      headings: headings.map(h => ({ id: h.id, text: h.text }))
    };
  }

  return { frontmatter, htmlContent, headings, searchData, frontmatterLineCount };
}

module.exports = { createMarkdownProcessor, processContent };