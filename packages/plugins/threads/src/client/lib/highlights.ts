import type { Thread, Anchor } from '../../types.ts';
import { getContentArea } from './selection.ts';

interface AnchorResult {
  threadId: string;
  range: Range | null;
  orphan: boolean;
}

function findTextInNode(
  root: Node,
  searchText: string,
): Range | null {
  const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let accumulated = "";
  const textNodes: { node: Text; start: number }[] = [];

  while (treeWalker.nextNode()) {
    const node = treeWalker.currentNode as Text;
    textNodes.push({ node, start: accumulated.length });
    accumulated += node.textContent || "";
  }

  const idx = accumulated.indexOf(searchText);
  if (idx === -1) return null;

  const endIdx = idx + searchText.length;
  let startNode: Text | null = null;
  let startOffset = 0;
  let endNode: Text | null = null;
  let endOffset = 0;

  for (const { node, start } of textNodes) {
    const nodeEnd = start + (node.textContent?.length || 0);
    if (!startNode && idx >= start && idx < nodeEnd) {
      startNode = node;
      startOffset = idx - start;
    }
    if (endIdx > start && endIdx <= nodeEnd) {
      endNode = node;
      endOffset = endIdx - start;
      break;
    }
  }

  if (!startNode || !endNode) return null;

  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  return range;
}

function tryExactMatch(anchor: Anchor): Range | null {
  if (!anchor.selector || anchor.offset === null) return null;

  const content = getContentArea();
  if (!content) return null;

  const element = content.querySelector(anchor.selector);
  if (!element) return null;

  const text = element.textContent || "";
  const slice = text.slice(anchor.offset, anchor.offset + anchor.quote.length);
  if (slice !== anchor.quote) return null;

  return findTextInNode(element, anchor.quote);
}

function tryElementSearch(anchor: Anchor): Range | null {
  if (!anchor.selector) return null;

  const content = getContentArea();
  if (!content) return null;

  const element = content.querySelector(anchor.selector);
  if (!element) return null;

  return findTextInNode(element, anchor.quote);
}

function tryPageSearch(anchor: Anchor): Range | null {
  const content = getContentArea();
  if (!content) return null;

  const fullText = content.textContent || "";
  const indices: number[] = [];
  let pos = 0;

  while ((pos = fullText.indexOf(anchor.quote, pos)) !== -1) {
    indices.push(pos);
    pos += 1;
  }

  if (indices.length === 0) return null;

  // If single match, use it
  if (indices.length === 1) {
    return findTextInNode(content, anchor.quote);
  }

  // Disambiguate with prefix/suffix
  if (anchor.prefix || anchor.suffix) {
    for (const idx of indices) {
      const before = fullText.slice(Math.max(0, idx - 40), idx);
      const after = fullText.slice(
        idx + anchor.quote.length,
        idx + anchor.quote.length + 40,
      );

      const prefixMatch = !anchor.prefix || before.endsWith(anchor.prefix);
      const suffixMatch = !anchor.suffix || after.startsWith(anchor.suffix);

      if (prefixMatch || suffixMatch) {
        return findTextInNode(content, anchor.quote);
      }
    }
  }

  // Fallback: use first match
  return findTextInNode(content, anchor.quote);
}

export function reanchor(thread: Thread): AnchorResult {
  const anchor = thread.anchor;

  // Untethered comments have no anchor — skip re-anchoring
  if (!anchor || !anchor.quote) {
    return { threadId: thread.id, range: null, orphan: false };
  }

  // Try strategies in order of confidence
  const range =
    tryExactMatch(anchor) ||
    tryElementSearch(anchor) ||
    tryPageSearch(anchor);

  return {
    threadId: thread.id,
    range,
    orphan: range === null,
  };
}

const highlightMap = new Map<string, HTMLElement[]>();

export function clearHighlights(): void {
  for (const [, marks] of highlightMap) {
    for (const mark of marks) {
      const parent = mark.parentNode;
      if (parent) {
        while (mark.firstChild) {
          parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
        parent.normalize();
      }
    }
  }
  highlightMap.clear();
}

export function applyHighlight(
  threadId: string,
  range: Range,
  resolved: boolean,
  onClick: (threadId: string) => void,
): void {
  const marks: HTMLElement[] = [];

  // Handle ranges that span multiple text nodes
  const contents = range.cloneContents();
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(contents, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  // Use surroundContents for simple single-node ranges
  if (
    range.startContainer === range.endContainer &&
    range.startContainer.nodeType === Node.TEXT_NODE
  ) {
    const mark = document.createElement("mark");
    mark.dataset["threadId"] = threadId;
    mark.className = `threads-highlight${resolved ? " threads-highlight--resolved" : ""}`;
    mark.addEventListener("click", () => onClick(threadId));
    range.surroundContents(mark);
    marks.push(mark);
  } else {
    // For multi-node ranges, highlight each text node individually
    const treeWalker = document.createTreeWalker(
      range.commonAncestorContainer,
      NodeFilter.SHOW_TEXT,
    );
    const nodesToWrap: { node: Text; start: number; end: number }[] = [];

    while (treeWalker.nextNode()) {
      const textNode = treeWalker.currentNode as Text;
      if (!range.intersectsNode(textNode)) continue;

      let start = 0;
      let end = textNode.length;

      if (textNode === range.startContainer) start = range.startOffset;
      if (textNode === range.endContainer) end = range.endOffset;

      if (start < end) {
        nodesToWrap.push({ node: textNode, start, end });
      }
    }

    // Wrap in reverse order to preserve offsets
    for (let i = nodesToWrap.length - 1; i >= 0; i--) {
      const entry = nodesToWrap[i];
      if (!entry) continue;
      const { node, start, end } = entry;
      const subRange = document.createRange();
      subRange.setStart(node, start);
      subRange.setEnd(node, end);

      const mark = document.createElement("mark");
      mark.dataset["threadId"] = threadId;
      mark.className = `threads-highlight${resolved ? " threads-highlight--resolved" : ""}`;
      mark.addEventListener("click", () => onClick(threadId));
      subRange.surroundContents(mark);
      marks.push(mark);
    }
  }

  highlightMap.set(threadId, marks);
}

export function scrollToHighlight(threadId: string): void {
  const marks = highlightMap.get(threadId);
  if (marks && marks[0]) {
    marks[0].scrollIntoView({ behavior: "smooth", block: "center" });
    // Flash effect
    for (const mark of marks) {
      mark.classList.add("threads-highlight--flash");
      setTimeout(() => mark.classList.remove("threads-highlight--flash"), 1000);
    }
  }
}
