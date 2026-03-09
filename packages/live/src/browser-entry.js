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

const { createMarkdownProcessor, processContent } = require('@svallory/docmd-parser/src/markdown-processor');
const { renderTemplate } = require('@svallory/docmd-parser/src/html-renderer');
const templates = require('virtual:docmd-templates');

// Expose the compile function to the window.docmd global
function compile(markdown, config = {}) {
    const defaults = {
        siteTitle: 'Live Preview',
        theme: { defaultMode: 'light', name: 'default', codeHighlight: true },
        layout: { spa: false },
        ...config
    };

    // 1. Process Markdown with Plugin Support
    const md = createMarkdownProcessor(defaults, (parser) => {
        const defaultFence = parser.renderer.rules.fence;
        parser.renderer.rules.fence = (tokens, idx, options, env, self) => {
            const info = tokens[idx].info.trim();
            if (info === 'mermaid') {
                return `<div class="mermaid">${parser.utils.escapeHtml(tokens[idx].content)}</div>\n`;
            }
            return defaultFence(tokens, idx, options, env, self);
        };
    });
    const result = processContent(markdown, md, defaults);
    
    if (!result) return '<p>Error parsing markdown</p>';

    // Since we are in the browser, we assume assets are served at ./assets/
    const assetsRoot = './assets';
    
    // 1. CSS Injection
    const cssTags = [
        `<link rel="stylesheet" href="${assetsRoot}/css/docmd-main.css">`
    ];
    
    if (defaults.theme.codeHighlight !== false) {
        const mode = defaults.theme.defaultMode === 'dark' ? 'dark' : 'light';
        cssTags.push(`<link rel="stylesheet" href="${assetsRoot}/css/docmd-highlight-${mode}.css">`);
    }
    
    if (defaults.theme.name && defaults.theme.name !== 'default') {
        cssTags.push(`<link rel="stylesheet" href="${assetsRoot}/css/docmd-theme-${defaults.theme.name}.css">`);
    }

    cssTags.push(`<link rel="stylesheet" href="${assetsRoot}/css/docmd-live-preview.css">`);

    // 2. JS Injection
    const mermaidScript = `
    <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
        async function initMermaid() {
            try {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                mermaid.initialize({
                    startOnLoad: false,
                    theme: isDark ? 'dark' : 'default',
                    securityLevel: 'loose',
                });
                const nodes = document.querySelectorAll('.mermaid');
                if (nodes.length > 0) {
                    await mermaid.run({ nodes });
                }
            } catch (e) { console.error('Mermaid error:', e); }
        }
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            initMermaid();
        } else {
            document.addEventListener('DOMContentLoaded', initMermaid);
        }
    </script>
    `;

    const jsTags = [mermaidScript];

    // 3. Theme Init Script
    let themeInitScript = '';
    if (templates['partials/theme-init.js']) {
        themeInitScript = `<script>${templates['partials/theme-init.js']}</script>`;
    }

    // 4. Prepare Data
    const pageData = {
        content: result.htmlContent,
        frontmatter: result.frontmatter,
        headings: result.headings,
        config: defaults,
        buildHash: 'live',
        siteTitle: defaults.siteTitle,
        pageTitle: result.frontmatter.title || 'Untitled',
        description: result.frontmatter.description || '',
        defaultMode: defaults.theme.defaultMode,

        // Navigation Stub
        navigationHtml: '',
        relativePathToRoot: './',
        outputPath: 'index.html',
        currentPagePath: '/index',
        isOfflineMode: false,
        prevPage: null, nextPage: null,

        // Injecting Assets
        pluginHeadScriptsHtml: cssTags.join('\n'), 
        pluginBodyScriptsHtml: mermaidScript,
        themeInitScript: themeInitScript,

        // Layout & UI Configurations
        faviconLinkHtml: '', 
        logo: defaults.logo, 
        theme: defaults.theme,
        customCssFiles: [], customJsFiles:[],
        
        // Layout Adapters
        headerConfig: { enabled: true },
        sidebarConfig: { collapsible: false, defaultCollapsed: false },
        footerConfig: { style: 'minimal', content: '' },
        optionsMenu: { position: 'header', components: { search: false, themeSwitch: true, sponsor: null } },
        footerHtml: '',
        
        isActivePage: true,
        editUrl: null,
        editLinkText: ''
    };

    // 5. Render
    const templateName = result.frontmatter.noStyle ? 'no-style.ejs' : 'layout.ejs';
    const templateStr = templates[templateName];
    
    if (!templateStr) return `Template ${templateName} not found`;

    const options = {
        includer: (originalPath) => {
            let name = originalPath.endsWith('.ejs') ? originalPath : originalPath + '.ejs';
            if (templates[name]) return { template: templates[name] };
            return null;
        }
    };

    return renderTemplate(templateStr, pageData, options);
}

module.exports = { compile };