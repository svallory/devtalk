var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i7 = decorators.length - 1, decorator; i7 >= 0; i7--)
    if (decorator = decorators[i7])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// ../../../node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t6, e8, o9) {
    if (this._$cssResult$ = true, o9 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t6, this.t = e8;
  }
  get styleSheet() {
    let t6 = this.o;
    const s4 = this.t;
    if (e && void 0 === t6) {
      const e8 = void 0 !== s4 && 1 === s4.length;
      e8 && (t6 = o.get(s4)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e8 && o.set(s4, t6));
    }
    return t6;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t6) => new n("string" == typeof t6 ? t6 : t6 + "", void 0, s);
var i = (t6, ...e8) => {
  const o9 = 1 === t6.length ? t6[0] : e8.reduce((e9, s4, o10) => e9 + ((t7) => {
    if (true === t7._$cssResult$) return t7.cssText;
    if ("number" == typeof t7) return t7;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t6[o10 + 1], t6[0]);
  return new n(o9, t6, s);
};
var S = (s4, o9) => {
  if (e) s4.adoptedStyleSheets = o9.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet);
  else for (const e8 of o9) {
    const o10 = document.createElement("style"), n6 = t.litNonce;
    void 0 !== n6 && o10.setAttribute("nonce", n6), o10.textContent = e8.cssText, s4.appendChild(o10);
  }
};
var c = e ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
  let e8 = "";
  for (const s4 of t7.cssRules) e8 += s4.cssText;
  return r(e8);
})(t6) : t6;

// ../../../node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t6, s4) => t6;
var u = { toAttribute(t6, s4) {
  switch (s4) {
    case Boolean:
      t6 = t6 ? l : null;
      break;
    case Object:
    case Array:
      t6 = null == t6 ? t6 : JSON.stringify(t6);
  }
  return t6;
}, fromAttribute(t6, s4) {
  let i7 = t6;
  switch (s4) {
    case Boolean:
      i7 = null !== t6;
      break;
    case Number:
      i7 = null === t6 ? null : Number(t6);
      break;
    case Object:
    case Array:
      try {
        i7 = JSON.parse(t6);
      } catch (t7) {
        i7 = null;
      }
  }
  return i7;
} };
var f = (t6, s4) => !i2(t6, s4);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t6) {
    this._$Ei(), (this.l ??= []).push(t6);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t6, s4 = b) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t6) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t6, s4), !s4.noAccessor) {
      const i7 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t6, i7, s4);
      void 0 !== h3 && e2(this.prototype, t6, h3);
    }
  }
  static getPropertyDescriptor(t6, s4, i7) {
    const { get: e8, set: r7 } = h(this.prototype, t6) ?? { get() {
      return this[s4];
    }, set(t7) {
      this[s4] = t7;
    } };
    return { get: e8, set(s5) {
      const h3 = e8?.call(this);
      r7?.call(this, s5), this.requestUpdate(t6, h3, i7);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t6) {
    return this.elementProperties.get(t6) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t6 = n2(this);
    t6.finalize(), void 0 !== t6.l && (this.l = [...t6.l]), this.elementProperties = new Map(t6.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t7 = this.properties, s4 = [...r2(t7), ...o2(t7)];
      for (const i7 of s4) this.createProperty(i7, t7[i7]);
    }
    const t6 = this[Symbol.metadata];
    if (null !== t6) {
      const s4 = litPropertyMetadata.get(t6);
      if (void 0 !== s4) for (const [t7, i7] of s4) this.elementProperties.set(t7, i7);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t7, s4] of this.elementProperties) {
      const i7 = this._$Eu(t7, s4);
      void 0 !== i7 && this._$Eh.set(i7, t7);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s4) {
    const i7 = [];
    if (Array.isArray(s4)) {
      const e8 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e8) i7.unshift(c(s5));
    } else void 0 !== s4 && i7.push(c(s4));
    return i7;
  }
  static _$Eu(t6, s4) {
    const i7 = s4.attribute;
    return false === i7 ? void 0 : "string" == typeof i7 ? i7 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t6) => t6(this));
  }
  addController(t6) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t6), void 0 !== this.renderRoot && this.isConnected && t6.hostConnected?.();
  }
  removeController(t6) {
    this._$EO?.delete(t6);
  }
  _$E_() {
    const t6 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i7 of s4.keys()) this.hasOwnProperty(i7) && (t6.set(i7, this[i7]), delete this[i7]);
    t6.size > 0 && (this._$Ep = t6);
  }
  createRenderRoot() {
    const t6 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t6, this.constructor.elementStyles), t6;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t6) => t6.hostConnected?.());
  }
  enableUpdating(t6) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t6) => t6.hostDisconnected?.());
  }
  attributeChangedCallback(t6, s4, i7) {
    this._$AK(t6, i7);
  }
  _$ET(t6, s4) {
    const i7 = this.constructor.elementProperties.get(t6), e8 = this.constructor._$Eu(t6, i7);
    if (void 0 !== e8 && true === i7.reflect) {
      const h3 = (void 0 !== i7.converter?.toAttribute ? i7.converter : u).toAttribute(s4, i7.type);
      this._$Em = t6, null == h3 ? this.removeAttribute(e8) : this.setAttribute(e8, h3), this._$Em = null;
    }
  }
  _$AK(t6, s4) {
    const i7 = this.constructor, e8 = i7._$Eh.get(t6);
    if (void 0 !== e8 && this._$Em !== e8) {
      const t7 = i7.getPropertyOptions(e8), h3 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== t7.converter?.fromAttribute ? t7.converter : u;
      this._$Em = e8;
      const r7 = h3.fromAttribute(s4, t7.type);
      this[e8] = r7 ?? this._$Ej?.get(e8) ?? r7, this._$Em = null;
    }
  }
  requestUpdate(t6, s4, i7, e8 = false, h3) {
    if (void 0 !== t6) {
      const r7 = this.constructor;
      if (false === e8 && (h3 = this[t6]), i7 ??= r7.getPropertyOptions(t6), !((i7.hasChanged ?? f)(h3, s4) || i7.useDefault && i7.reflect && h3 === this._$Ej?.get(t6) && !this.hasAttribute(r7._$Eu(t6, i7)))) return;
      this.C(t6, s4, i7);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t6, s4, { useDefault: i7, reflect: e8, wrapped: h3 }, r7) {
    i7 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t6) && (this._$Ej.set(t6, r7 ?? s4 ?? this[t6]), true !== h3 || void 0 !== r7) || (this._$AL.has(t6) || (this.hasUpdated || i7 || (s4 = void 0), this._$AL.set(t6, s4)), true === e8 && this._$Em !== t6 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t6));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t7) {
      Promise.reject(t7);
    }
    const t6 = this.scheduleUpdate();
    return null != t6 && await t6, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t8, s5] of this._$Ep) this[t8] = s5;
        this._$Ep = void 0;
      }
      const t7 = this.constructor.elementProperties;
      if (t7.size > 0) for (const [s5, i7] of t7) {
        const { wrapped: t8 } = i7, e8 = this[s5];
        true !== t8 || this._$AL.has(s5) || void 0 === e8 || this.C(s5, void 0, i7, e8);
      }
    }
    let t6 = false;
    const s4 = this._$AL;
    try {
      t6 = this.shouldUpdate(s4), t6 ? (this.willUpdate(s4), this._$EO?.forEach((t7) => t7.hostUpdate?.()), this.update(s4)) : this._$EM();
    } catch (s5) {
      throw t6 = false, this._$EM(), s5;
    }
    t6 && this._$AE(s4);
  }
  willUpdate(t6) {
  }
  _$AE(t6) {
    this._$EO?.forEach((t7) => t7.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t6) {
    return true;
  }
  update(t6) {
    this._$Eq &&= this._$Eq.forEach((t7) => this._$ET(t7, this[t7])), this._$EM();
  }
  updated(t6) {
  }
  firstUpdated(t6) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");

// ../../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = (t6) => t6;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t6) => null === t6 || "object" != typeof t6 && "function" != typeof t6;
var u2 = Array.isArray;
var d2 = (t6) => u2(t6) || "function" == typeof t6?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t6) => (i7, ...s4) => ({ _$litType$: t6, strings: i7, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t6, i7) {
  if (!u2(t6) || !t6.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i7) : i7;
}
var N = (t6, i7) => {
  const s4 = t6.length - 1, e8 = [];
  let n6, l6 = 2 === i7 ? "<svg>" : 3 === i7 ? "<math>" : "", c5 = v;
  for (let i8 = 0; i8 < s4; i8++) {
    const s5 = t6[i8];
    let a4, u4, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c5.lastIndex = f3, u4 = c5.exec(s5), null !== u4); ) f3 = c5.lastIndex, c5 === v ? "!--" === u4[1] ? c5 = _ : void 0 !== u4[1] ? c5 = m : void 0 !== u4[2] ? (y2.test(u4[2]) && (n6 = RegExp("</" + u4[2], "g")), c5 = p2) : void 0 !== u4[3] && (c5 = p2) : c5 === p2 ? ">" === u4[0] ? (c5 = n6 ?? v, d3 = -1) : void 0 === u4[1] ? d3 = -2 : (d3 = c5.lastIndex - u4[2].length, a4 = u4[1], c5 = void 0 === u4[3] ? p2 : '"' === u4[3] ? $ : g) : c5 === $ || c5 === g ? c5 = p2 : c5 === _ || c5 === m ? c5 = v : (c5 = p2, n6 = void 0);
    const x2 = c5 === p2 && t6[i8 + 1].startsWith("/>") ? " " : "";
    l6 += c5 === v ? s5 + r3 : d3 >= 0 ? (e8.push(a4), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i8 : x2);
  }
  return [V(t6, l6 + (t6[s4] || "<?>") + (2 === i7 ? "</svg>" : 3 === i7 ? "</math>" : "")), e8];
};
var S2 = class _S {
  constructor({ strings: t6, _$litType$: i7 }, e8) {
    let r7;
    this.parts = [];
    let l6 = 0, a4 = 0;
    const u4 = t6.length - 1, d3 = this.parts, [f3, v2] = N(t6, i7);
    if (this.el = _S.createElement(f3, e8), P.currentNode = this.el.content, 2 === i7 || 3 === i7) {
      const t7 = this.el.content.firstChild;
      t7.replaceWith(...t7.childNodes);
    }
    for (; null !== (r7 = P.nextNode()) && d3.length < u4; ) {
      if (1 === r7.nodeType) {
        if (r7.hasAttributes()) for (const t7 of r7.getAttributeNames()) if (t7.endsWith(h2)) {
          const i8 = v2[a4++], s4 = r7.getAttribute(t7).split(o3), e9 = /([.?@])?(.*)/.exec(i8);
          d3.push({ type: 1, index: l6, name: e9[2], strings: s4, ctor: "." === e9[1] ? I : "?" === e9[1] ? L : "@" === e9[1] ? z : H }), r7.removeAttribute(t7);
        } else t7.startsWith(o3) && (d3.push({ type: 6, index: l6 }), r7.removeAttribute(t7));
        if (y2.test(r7.tagName)) {
          const t7 = r7.textContent.split(o3), i8 = t7.length - 1;
          if (i8 > 0) {
            r7.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i8; s4++) r7.append(t7[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l6 });
            r7.append(t7[i8], c3());
          }
        }
      } else if (8 === r7.nodeType) if (r7.data === n3) d3.push({ type: 2, index: l6 });
      else {
        let t7 = -1;
        for (; -1 !== (t7 = r7.data.indexOf(o3, t7 + 1)); ) d3.push({ type: 7, index: l6 }), t7 += o3.length - 1;
      }
      l6++;
    }
  }
  static createElement(t6, i7) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t6, s4;
  }
};
function M(t6, i7, s4 = t6, e8) {
  if (i7 === E) return i7;
  let h3 = void 0 !== e8 ? s4._$Co?.[e8] : s4._$Cl;
  const o9 = a2(i7) ? void 0 : i7._$litDirective$;
  return h3?.constructor !== o9 && (h3?._$AO?.(false), void 0 === o9 ? h3 = void 0 : (h3 = new o9(t6), h3._$AT(t6, s4, e8)), void 0 !== e8 ? (s4._$Co ??= [])[e8] = h3 : s4._$Cl = h3), void 0 !== h3 && (i7 = M(t6, h3._$AS(t6, i7.values), h3, e8)), i7;
}
var R = class {
  constructor(t6, i7) {
    this._$AV = [], this._$AN = void 0, this._$AD = t6, this._$AM = i7;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t6) {
    const { el: { content: i7 }, parts: s4 } = this._$AD, e8 = (t6?.creationScope ?? l2).importNode(i7, true);
    P.currentNode = e8;
    let h3 = P.nextNode(), o9 = 0, n6 = 0, r7 = s4[0];
    for (; void 0 !== r7; ) {
      if (o9 === r7.index) {
        let i8;
        2 === r7.type ? i8 = new k(h3, h3.nextSibling, this, t6) : 1 === r7.type ? i8 = new r7.ctor(h3, r7.name, r7.strings, this, t6) : 6 === r7.type && (i8 = new Z(h3, this, t6)), this._$AV.push(i8), r7 = s4[++n6];
      }
      o9 !== r7?.index && (h3 = P.nextNode(), o9++);
    }
    return P.currentNode = l2, e8;
  }
  p(t6) {
    let i7 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t6, s4, i7), i7 += s4.strings.length - 2) : s4._$AI(t6[i7])), i7++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t6, i7, s4, e8) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t6, this._$AB = i7, this._$AM = s4, this.options = e8, this._$Cv = e8?.isConnected ?? true;
  }
  get parentNode() {
    let t6 = this._$AA.parentNode;
    const i7 = this._$AM;
    return void 0 !== i7 && 11 === t6?.nodeType && (t6 = i7.parentNode), t6;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t6, i7 = this) {
    t6 = M(this, t6, i7), a2(t6) ? t6 === A || null == t6 || "" === t6 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t6 !== this._$AH && t6 !== E && this._(t6) : void 0 !== t6._$litType$ ? this.$(t6) : void 0 !== t6.nodeType ? this.T(t6) : d2(t6) ? this.k(t6) : this._(t6);
  }
  O(t6) {
    return this._$AA.parentNode.insertBefore(t6, this._$AB);
  }
  T(t6) {
    this._$AH !== t6 && (this._$AR(), this._$AH = this.O(t6));
  }
  _(t6) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t6 : this.T(l2.createTextNode(t6)), this._$AH = t6;
  }
  $(t6) {
    const { values: i7, _$litType$: s4 } = t6, e8 = "number" == typeof s4 ? this._$AC(t6) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e8) this._$AH.p(i7);
    else {
      const t7 = new R(e8, this), s5 = t7.u(this.options);
      t7.p(i7), this.T(s5), this._$AH = t7;
    }
  }
  _$AC(t6) {
    let i7 = C.get(t6.strings);
    return void 0 === i7 && C.set(t6.strings, i7 = new S2(t6)), i7;
  }
  k(t6) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i7 = this._$AH;
    let s4, e8 = 0;
    for (const h3 of t6) e8 === i7.length ? i7.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i7[e8], s4._$AI(h3), e8++;
    e8 < i7.length && (this._$AR(s4 && s4._$AB.nextSibling, e8), i7.length = e8);
  }
  _$AR(t6 = this._$AA.nextSibling, s4) {
    for (this._$AP?.(false, true, s4); t6 !== this._$AB; ) {
      const s5 = i3(t6).nextSibling;
      i3(t6).remove(), t6 = s5;
    }
  }
  setConnected(t6) {
    void 0 === this._$AM && (this._$Cv = t6, this._$AP?.(t6));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t6, i7, s4, e8, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t6, this.name = i7, this._$AM = e8, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t6, i7 = this, s4, e8) {
    const h3 = this.strings;
    let o9 = false;
    if (void 0 === h3) t6 = M(this, t6, i7, 0), o9 = !a2(t6) || t6 !== this._$AH && t6 !== E, o9 && (this._$AH = t6);
    else {
      const e9 = t6;
      let n6, r7;
      for (t6 = h3[0], n6 = 0; n6 < h3.length - 1; n6++) r7 = M(this, e9[s4 + n6], i7, n6), r7 === E && (r7 = this._$AH[n6]), o9 ||= !a2(r7) || r7 !== this._$AH[n6], r7 === A ? t6 = A : t6 !== A && (t6 += (r7 ?? "") + h3[n6 + 1]), this._$AH[n6] = r7;
    }
    o9 && !e8 && this.j(t6);
  }
  j(t6) {
    t6 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t6 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t6) {
    this.element[this.name] = t6 === A ? void 0 : t6;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t6) {
    this.element.toggleAttribute(this.name, !!t6 && t6 !== A);
  }
};
var z = class extends H {
  constructor(t6, i7, s4, e8, h3) {
    super(t6, i7, s4, e8, h3), this.type = 5;
  }
  _$AI(t6, i7 = this) {
    if ((t6 = M(this, t6, i7, 0) ?? A) === E) return;
    const s4 = this._$AH, e8 = t6 === A && s4 !== A || t6.capture !== s4.capture || t6.once !== s4.once || t6.passive !== s4.passive, h3 = t6 !== A && (s4 === A || e8);
    e8 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
  }
  handleEvent(t6) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t6) : this._$AH.handleEvent(t6);
  }
};
var Z = class {
  constructor(t6, i7, s4) {
    this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t6) {
    M(this, t6);
  }
};
var j = { M: h2, P: o3, A: n3, C: 1, L: N, R, D: d2, V: M, I: k, H, N: L, U: z, B: I, F: Z };
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.2");
var D = (t6, i7, s4) => {
  const e8 = s4?.renderBefore ?? i7;
  let h3 = e8._$litPart$;
  if (void 0 === h3) {
    const t7 = s4?.renderBefore ?? null;
    e8._$litPart$ = h3 = new k(i7.insertBefore(c3(), t7), t7, void 0, s4 ?? {});
  }
  return h3._$AI(t6), h3;
};

// ../../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t6 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t6.firstChild, t6;
  }
  update(t6) {
    const r7 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t6), this._$Do = D(r7, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
var o4 = s3.litElementPolyfillSupport;
o4?.({ LitElement: i4 });
(s3.litElementVersions ??= []).push("4.2.2");

// ../../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/is-server.js
var o5 = false;

// ../../../node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/custom-element.js
var t3 = (t6) => (e8, o9) => {
  void 0 !== o9 ? o9.addInitializer(() => {
    customElements.define(t6, e8);
  }) : customElements.define(t6, e8);
};

// ../../../node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js
var o6 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t6 = o6, e8, r7) => {
  const { kind: n6, metadata: i7 } = r7;
  let s4 = globalThis.litPropertyMetadata.get(i7);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i7, s4 = /* @__PURE__ */ new Map()), "setter" === n6 && ((t6 = Object.create(t6)).wrapped = true), s4.set(r7.name, t6), "accessor" === n6) {
    const { name: o9 } = r7;
    return { set(r8) {
      const n7 = e8.get.call(this);
      e8.set.call(this, r8), this.requestUpdate(o9, n7, t6, true, r8);
    }, init(e9) {
      return void 0 !== e9 && this.C(o9, void 0, t6, e9), e9;
    } };
  }
  if ("setter" === n6) {
    const { name: o9 } = r7;
    return function(r8) {
      const n7 = this[o9];
      e8.call(this, r8), this.requestUpdate(o9, n7, t6, true, r8);
    };
  }
  throw Error("Unsupported decorator location: " + n6);
};
function n4(t6) {
  return (e8, o9) => "object" == typeof o9 ? r4(t6, e8, o9) : ((t7, e9, o10) => {
    const r7 = e9.hasOwnProperty(o10);
    return e9.constructor.createProperty(o10, t7), r7 ? Object.getOwnPropertyDescriptor(e9, o10) : void 0;
  })(t6, e8, o9);
}

// ../../../node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js
function r5(r7) {
  return n4({ ...r7, state: true, attribute: false });
}

// ../../../node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/base.js
var e4 = (e8, t6, c5) => (c5.configurable = true, c5.enumerable = true, Reflect.decorate && "object" != typeof t6 && Object.defineProperty(e8, t6, c5), c5);

// ../../../node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query.js
function e5(e8, r7) {
  return (n6, s4, i7) => {
    const o9 = (t6) => t6.renderRoot?.querySelector(e8) ?? null;
    if (r7) {
      const { get: e9, set: r8 } = "object" == typeof s4 ? n6 : i7 ?? /* @__PURE__ */ (() => {
        const t6 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t6];
        }, set(e10) {
          this[t6] = e10;
        } };
      })();
      return e4(n6, s4, { get() {
        let t6 = e9.call(this);
        return void 0 === t6 && (t6 = o9(this), (null !== t6 || this.hasUpdated) && r8.call(this, t6)), t6;
      } });
    }
    return e4(n6, s4, { get() {
      return o9(this);
    } });
  };
}

// src/client/lib/api.ts
function getSourceFile() {
  const file = document.body.dataset["sourceFile"];
  if (!file) throw new Error("[threads] data-source-file not found on body element");
  return file;
}
async function fetchThreads() {
  return docmd.call("threads:get-threads", { file: getSourceFile() });
}
async function createThread(payload) {
  return docmd.call("threads:add-thread", {
    file: getSourceFile(),
    ...payload
  });
}
async function addComment(threadId, payload) {
  return docmd.call("threads:add-comment", {
    file: getSourceFile(),
    threadId,
    ...payload
  });
}
async function deleteComment(threadId, commentId) {
  await docmd.call("threads:delete-comment", {
    file: getSourceFile(),
    threadId,
    commentId
  });
}
async function deleteThread(threadId) {
  await docmd.call("threads:delete-thread", {
    file: getSourceFile(),
    threadId
  });
}

// src/client/lib/identity.ts
var STORAGE_KEY = "threads_author";
function getAuthor() {
  return localStorage.getItem(STORAGE_KEY);
}
function setAuthor(name) {
  localStorage.setItem(STORAGE_KEY, name);
}
function initIdentity() {
}
function ensureAuthor() {
  let author = getAuthor();
  if (!author) {
    author = prompt("Enter your display name for discussions:");
    if (!author || !author.trim()) {
      author = "Anonymous";
    }
    setAuthor(author.trim());
  }
  return author;
}

// src/client/lib/selection.ts
var CONTEXT_CHARS = 40;
var BLOCK_ELEMENTS = /* @__PURE__ */ new Set([
  "P",
  "DIV",
  "LI",
  "TD",
  "TH",
  "BLOCKQUOTE",
  "PRE",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "SECTION",
  "ARTICLE",
  "ASIDE",
  "DT",
  "DD",
  "FIGCAPTION"
]);
function getContentArea() {
  return document.querySelector("[data-docmd-content]") || document.querySelector(".docmd-content") || document.querySelector("article") || document.querySelector("main");
}
function isWithinContent(node) {
  const content = getContentArea();
  return content ? content.contains(node) : false;
}
function getBlockAncestor(node) {
  let current = node;
  while (current && current !== document.body) {
    if (current instanceof HTMLElement && BLOCK_ELEMENTS.has(current.tagName)) {
      return current;
    }
    current = current.parentNode;
  }
  return document.body;
}
function generateSelector(element) {
  const parts = [];
  const content = getContentArea();
  for (let cur = element; cur && cur !== document.body && cur !== content; cur = cur.parentElement) {
    const tag = cur.tagName.toLowerCase();
    const parent = cur.parentElement;
    if (parent) {
      const tagName = cur.tagName;
      const siblings = Array.from(parent.children).filter(
        (sibling) => sibling.tagName === tagName
      );
      if (siblings.length > 1) {
        const index = siblings.indexOf(cur) + 1;
        parts.unshift(`${tag}:nth-of-type(${index})`);
      } else {
        parts.unshift(tag);
      }
    } else {
      parts.unshift(tag);
    }
  }
  return parts.join(" > ");
}
function getTextOffset(container, range) {
  const treeWalker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT
  );
  let offset = 0;
  while (treeWalker.nextNode()) {
    if (treeWalker.currentNode === range.startContainer) {
      return offset + range.startOffset;
    }
    offset += treeWalker.currentNode.length;
  }
  return offset;
}
function extractContext(text, start, end) {
  const prefix = text.slice(Math.max(0, start - CONTEXT_CHARS), start);
  const suffix = text.slice(end, end + CONTEXT_CHARS);
  return { prefix, suffix };
}
function computeAnchor(selection) {
  if (selection.rangeCount === 0) return null;
  const range = selection.getRangeAt(0);
  const quote = selection.toString().trim();
  if (!quote || quote.length < 3) return null;
  if (!isWithinContent(range.startContainer)) return null;
  const blockEl = getBlockAncestor(range.startContainer);
  const selector = generateSelector(blockEl);
  const fullText = blockEl.textContent || "";
  const offset = getTextOffset(blockEl, range);
  const { prefix, suffix } = extractContext(fullText, offset, offset + quote.length);
  return {
    quote,
    prefix: prefix || null,
    suffix: suffix || null,
    selector,
    offset,
    blockText: fullText.trim() || null
  };
}
function getSelectionPosition(selection) {
  if (selection.rangeCount === 0) return null;
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top
  };
}

// src/client/components/styles.ts
function injectComponentStyles() {
  if (document.getElementById("tc-styles")) return;
  const style = document.createElement("style");
  style.id = "tc-styles";
  style.textContent = `
    /* ========= Design tokens ========= */
    :root {
      --tc-bg: var(--bg-color, hsl(0 0% 100%));
      --tc-fg: var(--text-color, hsl(0 0% 9%));
      --tc-muted: var(--sidebar-bg, hsl(0 0% 96.1%));
      --tc-muted-fg: var(--text-muted, hsl(0 0% 45.1%));
      --tc-border: var(--border-color, hsl(0 0% 89.8%));
      --tc-input: var(--border-color, hsl(0 0% 89.8%));
      --tc-ring: var(--text-color, hsl(0 0% 9%));
      --tc-accent: var(--sidebar-bg, hsl(0 0% 96.1%));
      --tc-accent-fg: var(--text-color, hsl(0 0% 9%));
      --tc-card: var(--bg-color, hsl(0 0% 100%));
      --tc-card-fg: var(--text-color, hsl(0 0% 9%));
      --tc-radius: 6px;
      --tc-font: var(--font-family-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
    }

    /* ========= Highlight colors (cycling palette) ========= */
    .threads-highlight {
      border-radius: 2px;
      padding: 1px 0;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .threads-highlight:hover { opacity: 0.75; }

    .threads-hl-yellow  { background: hsl(48 96% 89% / 0.6); }
    .threads-hl-blue    { background: hsl(210 100% 88% / 0.55); }
    .threads-hl-green   { background: hsl(142 60% 82% / 0.55); }
    .threads-hl-pink    { background: hsl(340 80% 88% / 0.55); }
    .threads-hl-purple  { background: hsl(270 70% 88% / 0.55); }
    .threads-hl-orange  { background: hsl(28 100% 86% / 0.55); }

    /* Matching left-border colors for thread cards */
    .threads-border-yellow { border-left-color: hsl(48 96% 53%) !important; }
    .threads-border-blue   { border-left-color: hsl(210 100% 55%) !important; }
    .threads-border-green  { border-left-color: hsl(142 60% 45%) !important; }
    .threads-border-pink   { border-left-color: hsl(340 80% 55%) !important; }
    .threads-border-purple { border-left-color: hsl(270 70% 55%) !important; }
    .threads-border-orange { border-left-color: hsl(28 100% 55%) !important; }

    /* ========= Layout: fixed right sidebar column ========= */
    .tc-sidebar-column {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 40px;
      z-index: 100;
      display: flex;
      flex-direction: column;
      transition: width 0.2s ease;
      font-family: var(--tc-font);
    }

    body.tc-panel-open .tc-sidebar-column {
      width: 380px;
    }

    body.tc-has-sidebar main {
      max-width: 1440px;
    }

    body.tc-has-sidebar .main-content-wrapper {
      margin-right: 40px;
      transition: margin-right 0.2s ease;
    }
    body.tc-panel-open .main-content-wrapper {
      margin-right: 380px;
    }

    @media (max-width: 1400px) {
      body.tc-panel-open .toc-sidebar {
        display: none;
      }
    }

    /* ========= Toggle strip ========= */
    .tc-sidebar-toggle {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      width: 40px;
      height: 100%;
      cursor: pointer;
      border: none;
      background: var(--tc-bg);
      color: var(--tc-muted-fg);
      border-left: 1px solid var(--tc-border);
      transition: color 0.15s, background 0.15s;
      position: relative;
      padding: 16px 0 0 0;
    }
    .tc-sidebar-toggle:hover {
      background: var(--tc-accent);
      color: var(--tc-fg);
    }

    body.tc-panel-open .tc-sidebar-toggle {
      display: none;
    }

    /* ========= Panel ========= */
    .tc-panel {
      flex: 1;
      width: 380px;
      background: var(--tc-bg);
      border-left: 1px solid var(--tc-border);
      display: flex;
      flex-direction: column;
      animation: tc-slide-in 0.2s ease;
    }
    @keyframes tc-slide-in {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .tc-panel__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 12px;
      border-bottom: 1px solid var(--tc-border);
    }
    .tc-panel__title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 14px;
      color: var(--tc-fg);
      letter-spacing: -0.01em;
    }
    .tc-panel__header-actions {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .tc-panel__filters {
      display: flex;
      gap: 4px;
      padding: 10px 16px;
      border-bottom: 1px solid var(--tc-border);
    }
    .tc-panel__body {
      flex: 1;
      overflow-y: auto;
      padding: 8px 0;
    }

    /* ========= Empty state ========= */
    .tc-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: var(--tc-muted-fg);
      padding: 48px 24px;
      font-size: 14px;
      line-height: 1.6;
    }

    /* ========= Thread (shadcn card) ========= */
    .tc-thread {
      margin: 0 8px 6px;
      border: 1px solid var(--tc-border);
      border-radius: var(--tc-radius);
      overflow: hidden;
      background: var(--tc-card);
      transition: box-shadow 0.15s;
    }
    .tc-thread:hover {
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    }
    .tc-thread--focused {
      border-color: var(--tc-ring);
      box-shadow: 0 0 0 1px var(--tc-ring);
    }
    .tc-thread--resolved { opacity: 0.6; }
    .tc-thread__quote {
      padding: 10px 14px;
      border-left: 2px solid var(--tc-border);
      margin: 10px 14px 0;
      cursor: pointer;
      border-radius: 0;
      background: var(--tc-muted);
      transition: background 0.15s;
    }
    .tc-thread__quote:hover {
      background: color-mix(in srgb, var(--tc-muted) 80%, var(--tc-fg) 20%);
    }
    .tc-thread__quote-text {
      font-size: 13px;
      color: var(--tc-muted-fg);
      line-height: 1.5;
      font-style: italic;
    }
    .tc-thread__comments {
      padding: 2px 0;
    }
    .tc-thread__reply {
      border-top: 1px solid var(--tc-border);
    }
    .tc-thread__footer {
      display: flex;
      gap: 2px;
      padding: 6px 10px 8px;
      border-top: 1px solid var(--tc-border);
    }

    /* ========= Comment ========= */
    .tc-comment {
      padding: 10px 14px;
    }
    .tc-comment + .tc-comment {
      border-top: 1px solid var(--tc-border);
    }
    .tc-comment__header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .tc-comment__meta {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }
    .tc-comment__author {
      font-weight: 500;
      font-size: 13px;
      color: var(--tc-fg);
      line-height: 1.2;
    }
    .tc-comment__time {
      font-size: 11px;
      color: var(--tc-muted-fg);
      line-height: 1.2;
    }
    .tc-comment__menu {
      display: flex;
      gap: 1px;
      opacity: 0;
      transition: opacity 0.15s;
    }
    .tc-comment:hover .tc-comment__menu {
      opacity: 1;
    }
    .tc-comment__body {
      font-size: 14px;
      line-height: 1.6;
      color: var(--tc-fg);
      margin-left: 34px;
    }
    .tc-comment__body p { margin: 0 0 4px 0; }
    .tc-comment__body p:last-child { margin-bottom: 0; }
    .tc-comment__body code {
      background: var(--tc-muted);
      padding: 2px 4px;
      border-radius: 3px;
      font-size: 12px;
    }
    .tc-comment__body pre {
      background: var(--tc-muted);
      padding: 8px 12px;
      border-radius: var(--tc-radius);
      overflow-x: auto;
      font-size: 12px;
    }
    .tc-comment__footer {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-left: 34px;
      margin-top: 4px;
    }
    .tc-comment__actions {
      display: flex;
      gap: 1px;
    }

    /* ========= Reactions ========= */
    .tc-reactions {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .tc-reaction {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: 999px;
      border: 1px solid var(--tc-border);
      background: var(--tc-bg);
      cursor: pointer;
      font-size: 13px;
      line-height: 1.4;
      transition: all 0.15s;
    }
    .tc-reaction:hover {
      background: var(--tc-accent);
      border-color: var(--tc-input);
    }
    .tc-reaction--active {
      background: var(--tc-accent);
      border-color: var(--tc-fg);
    }
    .tc-reaction__count {
      font-size: 11px;
      font-weight: 500;
      color: var(--tc-muted-fg);
    }

    /* ========= Emoji picker item (used inside wa-popover) ========= */
    .tc-emoji-picker__item {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      border-radius: var(--tc-radius);
      cursor: pointer;
      font-size: 16px;
      transition: background 0.1s;
    }
    .tc-emoji-picker__item:hover {
      background: var(--tc-accent);
    }

    /* ========= Compose ========= */
    .tc-compose {
      padding: 10px 14px;
    }
    .tc-compose__quote {
      padding: 8px 12px;
      border-left: 2px solid var(--tc-border);
      background: var(--tc-muted);
      border-radius: 0;
      margin-bottom: 8px;
      font-size: 13px;
      color: var(--tc-muted-fg);
      font-style: italic;
      line-height: 1.4;
    }
    .tc-compose__actions {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      justify-content: flex-end;
    }

    /* ========= New thread compose ========= */
    .tc-new-thread {
      margin: 0 8px 6px;
      border: 1px solid var(--tc-border);
      border-radius: var(--tc-radius);
      overflow: hidden;
      background: var(--tc-card);
    }

    /* ========= Server-rendered threads wrapper ========= */
    .threads-sidebar {
      margin: 24px 0 8px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* ========= Server-rendered thread card ========= */
    .threads-thread {
      margin: 12px 0;
      border: 1px solid var(--tc-border);
      border-left: 3px solid var(--tc-ring);
      border-radius: var(--tc-radius);
      background: var(--tc-card);
      overflow: hidden;
      font-family: var(--tc-font);
      transition: box-shadow 0.15s;
    }
    .threads-thread:hover {
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08);
    }
    .threads-thread--resolved {
      opacity: 0.55;
    }

    /* ========= Server-rendered comment ========= */
    .threads-comment {
      padding: 10px 14px;
      font-size: 14px;
    }
    .threads-comment + .threads-comment {
      border-top: 1px solid var(--tc-border);
    }
    .threads-comment__meta {
      font-size: 12px;
      color: var(--tc-muted-fg);
      margin-bottom: 4px;
    }
    .threads-comment__meta strong {
      color: var(--tc-fg);
      font-weight: 500;
    }
    .threads-comment__body {
      color: var(--tc-fg);
      line-height: 1.6;
    }
    .threads-comment__body > :first-child {
      margin-top: 0;
    }
    .threads-comment__body > :last-child {
      margin-bottom: 0;
    }

    /* ========= Thread footer & reply button ========= */
    .threads-thread__footer {
      padding: 6px 14px 8px;
      border-top: 1px solid var(--tc-border);
    }
    .threads-reply-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border: none;
      background: transparent;
      color: var(--tc-muted-fg);
      font-family: var(--tc-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      border-radius: var(--tc-radius);
      transition: color 0.15s, background 0.15s;
    }
    .threads-reply-btn:hover {
      color: var(--tc-fg);
      background: var(--tc-muted);
    }

    /* ========= Server-rendered reactions ========= */
    .threads-reactions {
      margin-top: 8px;
    }
    .threads-reactions ul {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .threads-reactions li {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px 4px 8px;
      border-radius: 999px;
      border: 1px solid var(--tc-border);
      background: var(--tc-muted);
      font-size: 13px;
      line-height: 1;
      cursor: default;
      transition: background 0.15s, border-color 0.15s;
      user-select: none;
    }
    .threads-reactions li:hover {
      background: var(--tc-accent);
      border-color: var(--tc-input);
    }

    /* ========= Heading discussion button (hidden) ========= */
    .threads-heading-discuss { display: none !important; }
    .threads-heading-discuss-OFF {
      float: right;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border: none;
      background: transparent;
      color: transparent;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      border-radius: var(--tc-radius);
      transition: color 0.15s, background 0.15s;
      vertical-align: middle;
    }
    *:hover > .threads-heading-discuss {
      color: var(--tc-muted-fg);
    }
    .threads-heading-discuss:hover {
      color: var(--tc-accent-fg);
      background: var(--tc-accent);
    }

    /* ========= New Thread button ========= */
    .threads-new-thread-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      margin: 8px 0 16px;
      font-family: var(--tc-font);
      font-size: 13px;
      font-weight: 500;
      color: var(--tc-muted-fg);
      background: var(--tc-card);
      border: 1px dashed var(--tc-border);
      border-radius: var(--tc-radius);
      cursor: pointer;
      transition: color 0.15s, border-color 0.15s, background 0.15s;
    }
    .threads-new-thread-btn:hover {
      color: var(--tc-fg);
      border-color: var(--tc-fg);
      background: var(--tc-muted);
    }

    /* ========= Thread flash animation (on highlight click) ========= */
    .threads-thread--flash {
      animation: tc-flash 2s ease-out;
    }
    @keyframes tc-flash {
      0%   { outline: 2px solid var(--tc-ring); outline-offset: 4px; }
      100% { outline: 2px solid transparent; outline-offset: 8px; }
    }

    /* ========= Hide sidebar (disabled for now) ========= */
    .tc-sidebar-column { display: none !important; }
    .tc-has-sidebar { padding-right: 0 !important; }
  `;
  document.head.appendChild(style);
}

// src/client/lib/theme.ts
var THEME_STYLE_ID = "threads-theme-bridge";
function initThemeBridge() {
  injectThemeCSS();
  syncDarkMode();
  observeThemeChanges();
  injectComponentStyles();
}
function injectThemeCSS() {
  if (document.getElementById(THEME_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = THEME_STYLE_ID;
  style.textContent = `
    :root {
      --wa-color-surface-default: var(--tc-bg, hsl(0 0% 100%));
      --wa-color-surface-raised: var(--tc-muted, hsl(0 0% 96.1%));
      --wa-color-surface-border: var(--tc-border, hsl(0 0% 89.8%));
      --wa-color-text-normal: var(--tc-fg, hsl(0 0% 9%));
      --wa-color-text-quiet: var(--tc-muted-fg, hsl(0 0% 45.1%));
      --wa-color-text-link: var(--tc-fg, hsl(0 0% 9%));
      --wa-color-brand-fill-loud: var(--tc-fg, hsl(0 0% 9%));
      --wa-color-brand-on-loud: hsl(0 0% 98%);
      --wa-color-focus: var(--tc-ring, hsl(0 0% 9%));
      --wa-font-sans: var(--tc-font, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
      --wa-font-mono: var(--font-family-mono, SFMono-Regular, Consolas, Menlo, monospace);
    }

    .threads-highlight {
      background-color: hsl(48 96% 89% / 0.5);
      border-bottom: 2px solid hsl(48 96% 53% / 0.6);
      cursor: pointer;
      transition: background-color 0.15s;
      border-radius: 1px;
    }
    .threads-highlight:hover {
      background-color: hsl(48 96% 89% / 0.8);
    }
    .threads-highlight--resolved {
      background-color: hsl(142 76% 36% / 0.1);
      border-bottom-color: hsl(142 76% 36% / 0.3);
    }
    .threads-highlight--resolved:hover {
      background-color: hsl(142 76% 36% / 0.2);
    }
    .threads-highlight--flash {
      animation: threads-flash 0.8s ease-out;
    }
    @keyframes threads-flash {
      0%, 40% { background-color: hsl(48 96% 53% / 0.5); }
      100% { background-color: hsl(48 96% 89% / 0.5); }
    }
  `;
  document.head.appendChild(style);
}
function syncDarkMode() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.classList.toggle("wa-dark", isDark);
  document.documentElement.classList.toggle("wa-light", !isDark);
}
function observeThemeChanges() {
  const observer = new MutationObserver(() => syncDarkMode());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });
}

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.R7QX4M6R.js
var MirrorValidator = () => {
  return {
    checkValidity(element) {
      const formControl = element.input;
      const validity = {
        message: "",
        isValid: true,
        invalidKeys: []
      };
      if (!formControl) {
        return validity;
      }
      let isValid = true;
      if ("checkValidity" in formControl) {
        isValid = formControl.checkValidity();
      }
      if (isValid) {
        return validity;
      }
      validity.isValid = false;
      if ("validationMessage" in formControl) {
        validity.message = formControl.validationMessage;
      }
      if (!("validity" in formControl)) {
        validity.invalidKeys.push("customError");
        return validity;
      }
      for (const key in formControl.validity) {
        if (key === "valid") {
          continue;
        }
        const checkedKey = key;
        if (formControl.validity[checkedKey]) {
          validity.invalidKeys.push(checkedKey);
        }
      }
      return validity;
    }
  };
};

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.VC3BPUZJ.js
var WaInvalidEvent = class extends Event {
  constructor() {
    super("wa-invalid", { bubbles: true, cancelable: false, composed: true });
  }
};

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.7VGCIHDG.js
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __decorateClass2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
  for (var i7 = decorators.length - 1, decorator; i7 >= 0; i7--)
    if (decorator = decorators[i7])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp2(target, key, result);
  return result;
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.EPHHWXK2.js
var host_styles_default = i`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;
var _hasRecordedInitialProperties;
var WebAwesomeElement = class extends i4 {
  constructor() {
    super();
    __privateAdd(this, _hasRecordedInitialProperties, false);
    this.initialReflectedProperties = /* @__PURE__ */ new Map();
    this.didSSR = o5 || Boolean(this.shadowRoot);
    this.customStates = {
      /** Adds or removes the specified custom state. */
      set: (customState, active) => {
        if (!Boolean(this.internals?.states)) return;
        try {
          if (active) {
            this.internals.states.add(customState);
          } else {
            this.internals.states.delete(customState);
          }
        } catch (e8) {
          if (String(e8).includes("must start with '--'")) {
            console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");
          } else {
            throw e8;
          }
        }
      },
      /** Determines whether or not the element currently has the specified state. */
      has: (customState) => {
        if (!Boolean(this.internals?.states)) return false;
        try {
          return this.internals.states.has(customState);
        } catch {
          return false;
        }
      }
    };
    try {
      this.internals = this.attachInternals();
    } catch {
      console.error("Element internals are not supported in your browser. Consider using a polyfill");
    }
    this.customStates.set("wa-defined", true);
    let Self = this.constructor;
    for (let [property2, spec] of Self.elementProperties) {
      if (spec.default === "inherit" && spec.initial !== void 0 && typeof property2 === "string") {
        this.customStates.set(`initial-${property2}-${spec.initial}`, true);
      }
    }
  }
  /** Prepends host styles to the component's styles. */
  static get styles() {
    const styles = Array.isArray(this.css) ? this.css : this.css ? [this.css] : [];
    return [host_styles_default, ...styles];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!__privateGet(this, _hasRecordedInitialProperties)) {
      this.constructor.elementProperties.forEach(
        (obj, prop) => {
          if (obj.reflect && this[prop] != null) {
            this.initialReflectedProperties.set(prop, this[prop]);
          }
        }
      );
      __privateSet(this, _hasRecordedInitialProperties, true);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    this.initialReflectedProperties.forEach((value, prop) => {
      if (changedProperties.has(prop) && this[prop] == null) {
        this[prop] = value;
      }
    });
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.didSSR) {
      this.shadowRoot?.querySelectorAll("slot").forEach((slotElement) => {
        slotElement.dispatchEvent(new Event("slotchange", { bubbles: true, composed: false, cancelable: false }));
      });
    }
  }
  update(changedProperties) {
    try {
      super.update(changedProperties);
    } catch (e8) {
      if (this.didSSR && !this.hasUpdated) {
        const event = new Event("lit-hydration-error", { bubbles: true, composed: true, cancelable: false });
        event.error = e8;
        this.dispatchEvent(event);
      }
      throw e8;
    }
  }
  /**
   * @internal Given a native event, this function cancels it and dispatches it again from the host element using the desired
   * event options.
   */
  relayNativeEvent(event, eventOptions) {
    event.stopImmediatePropagation();
    this.dispatchEvent(
      new event.constructor(event.type, {
        ...event,
        ...eventOptions
      })
    );
  }
};
_hasRecordedInitialProperties = /* @__PURE__ */ new WeakMap();
__decorateClass2([
  n4()
], WebAwesomeElement.prototype, "dir", 2);
__decorateClass2([
  n4()
], WebAwesomeElement.prototype, "lang", 2);
__decorateClass2([
  n4({ type: Boolean, reflect: true, attribute: "did-ssr" })
], WebAwesomeElement.prototype, "didSSR", 2);

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.IPWPRIHZ.js
var CustomErrorValidator = () => {
  return {
    observedAttributes: ["custom-error"],
    checkValidity(element) {
      const validity = {
        message: "",
        isValid: true,
        invalidKeys: []
      };
      if (element.customError) {
        validity.message = element.customError;
        validity.isValid = false;
        validity.invalidKeys = ["customError"];
      }
      return validity;
    }
  };
};
var WebAwesomeFormAssociatedElement = class extends WebAwesomeElement {
  constructor() {
    super();
    this.name = null;
    this.disabled = false;
    this.required = false;
    this.assumeInteractionOn = ["input"];
    this.validators = [];
    this.valueHasChanged = false;
    this.hasInteracted = false;
    this.customError = null;
    this.emittedEvents = [];
    this.emitInvalid = (e8) => {
      if (e8.target !== this) return;
      this.hasInteracted = true;
      this.dispatchEvent(new WaInvalidEvent());
    };
    this.handleInteraction = (event) => {
      const emittedEvents = this.emittedEvents;
      if (!emittedEvents.includes(event.type)) {
        emittedEvents.push(event.type);
      }
      if (emittedEvents.length === this.assumeInteractionOn?.length) {
        this.hasInteracted = true;
      }
    };
    if (!o5) {
      this.addEventListener("invalid", this.emitInvalid);
    }
  }
  /**
   * Validators are static because they have `observedAttributes`, essentially attributes to "watch"
   * for changes. Whenever these attributes change, we want to be notified and update the validator.
   */
  static get validators() {
    return [CustomErrorValidator()];
  }
  // Append all Validator "observedAttributes" into the "observedAttributes" so they can run.
  static get observedAttributes() {
    const parentAttrs = new Set(super.observedAttributes || []);
    for (const validator of this.validators) {
      if (!validator.observedAttributes) {
        continue;
      }
      for (const attr of validator.observedAttributes) {
        parentAttrs.add(attr);
      }
    }
    return [...parentAttrs];
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateValidity();
    this.assumeInteractionOn.forEach((event) => {
      this.addEventListener(event, this.handleInteraction);
    });
  }
  firstUpdated(...args) {
    super.firstUpdated(...args);
    this.updateValidity();
  }
  willUpdate(changedProperties) {
    if (!o5 && changedProperties.has("customError")) {
      if (!this.customError) {
        this.customError = null;
      }
      this.setCustomValidity(this.customError || "");
    }
    if (changedProperties.has("value") || changedProperties.has("disabled") || changedProperties.has("defaultValue")) {
      const value = this.value;
      if (Array.isArray(value)) {
        if (this.name) {
          const formData = new FormData();
          for (const val of value) {
            formData.append(this.name, val);
          }
          this.setValue(formData, formData);
        }
      } else {
        this.setValue(value, value);
      }
    }
    if (changedProperties.has("disabled")) {
      this.customStates.set("disabled", this.disabled);
      if (this.hasAttribute("disabled") || !o5 && !this.matches(":disabled")) {
        this.toggleAttribute("disabled", this.disabled);
      }
    }
    super.willUpdate(changedProperties);
    this.updateValidity();
  }
  get labels() {
    return this.internals.labels;
  }
  getForm() {
    return this.internals.form;
  }
  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  set form(val) {
    if (val) {
      this.setAttribute("form", val);
    } else {
      this.removeAttribute("form");
    }
  }
  get form() {
    return this.internals.form;
  }
  get validity() {
    return this.internals.validity;
  }
  // Not sure if this supports `novalidate`. Will need to test.
  get willValidate() {
    return this.internals.willValidate;
  }
  get validationMessage() {
    return this.internals.validationMessage;
  }
  checkValidity() {
    this.updateValidity();
    return this.internals.checkValidity();
  }
  reportValidity() {
    this.updateValidity();
    this.hasInteracted = true;
    return this.internals.reportValidity();
  }
  /**
   * Override this to change where constraint validation popups are anchored.
   */
  get validationTarget() {
    return this.input || void 0;
  }
  setValidity(...args) {
    const flags = args[0];
    const message = args[1];
    let anchor = args[2];
    if (!anchor) {
      anchor = this.validationTarget;
    }
    this.internals.setValidity(flags, message, anchor || void 0);
    this.requestUpdate("validity");
    this.setCustomStates();
  }
  setCustomStates() {
    const required = Boolean(this.required);
    const isValid = this.internals.validity.valid;
    const hasInteracted = this.hasInteracted;
    this.customStates.set("required", required);
    this.customStates.set("optional", !required);
    this.customStates.set("invalid", !isValid);
    this.customStates.set("valid", isValid);
    this.customStates.set("user-invalid", !isValid && hasInteracted);
    this.customStates.set("user-valid", isValid && hasInteracted);
  }
  /**
   * Do not use this when creating a "Validator". This is intended for end users of components.
   * We track manually defined custom errors so we don't clear them on accident in our validators.
   *
   */
  setCustomValidity(message) {
    if (!message) {
      this.customError = null;
      this.setValidity({});
      return;
    }
    this.customError = message;
    this.setValidity({ customError: true }, message, this.validationTarget);
  }
  formResetCallback() {
    this.resetValidity();
    this.hasInteracted = false;
    this.valueHasChanged = false;
    this.emittedEvents = [];
    this.updateValidity();
  }
  formDisabledCallback(isDisabled) {
    this.disabled = isDisabled;
    this.updateValidity();
  }
  /**
   * Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when
   * the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of
   * "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue.
   */
  formStateRestoreCallback(state, reason) {
    this.value = state;
    if (reason === "restore") {
      this.resetValidity();
    }
    this.updateValidity();
  }
  setValue(...args) {
    const [value, state] = args;
    this.internals.setFormValue(value, state);
  }
  get allValidators() {
    const staticValidators = this.constructor.validators || [];
    const validators = this.validators || [];
    return [...staticValidators, ...validators];
  }
  /**
   * Reset validity is a way of removing manual custom errors and native validation.
   */
  resetValidity() {
    this.setCustomValidity("");
    this.setValidity({});
  }
  updateValidity() {
    if (this.disabled || this.hasAttribute("disabled") || !this.willValidate) {
      this.resetValidity();
      return;
    }
    const validators = this.allValidators;
    if (!validators?.length) {
      return;
    }
    const flags = {
      // Don't trust custom errors from the Browser. Safari breaks the spec.
      customError: Boolean(this.customError)
    };
    const formControl = this.validationTarget || this.input || void 0;
    let finalMessage = "";
    for (const validator of validators) {
      const { isValid, message, invalidKeys } = validator.checkValidity(this);
      if (isValid) {
        continue;
      }
      if (!finalMessage) {
        finalMessage = message;
      }
      if (invalidKeys?.length >= 0) {
        invalidKeys.forEach((str) => flags[str] = true);
      }
    }
    if (!finalMessage) {
      finalMessage = this.validationMessage;
    }
    this.setValidity(flags, finalMessage, formControl);
  }
};
WebAwesomeFormAssociatedElement.formAssociated = true;
__decorateClass2([
  n4({ reflect: true })
], WebAwesomeFormAssociatedElement.prototype, "name", 2);
__decorateClass2([
  n4({ type: Boolean })
], WebAwesomeFormAssociatedElement.prototype, "disabled", 2);
__decorateClass2([
  n4({ state: true, attribute: false })
], WebAwesomeFormAssociatedElement.prototype, "valueHasChanged", 2);
__decorateClass2([
  n4({ state: true, attribute: false })
], WebAwesomeFormAssociatedElement.prototype, "hasInteracted", 2);
__decorateClass2([
  n4({ attribute: "custom-error", reflect: true })
], WebAwesomeFormAssociatedElement.prototype, "customError", 2);
__decorateClass2([
  n4({ attribute: false, state: true, type: Object })
], WebAwesomeFormAssociatedElement.prototype, "validity", 1);

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.KIHB3VMB.js
var HasSlotController = class {
  constructor(host, ...slotNames) {
    this.slotNames = [];
    this.handleSlotChange = (event) => {
      const slot = event.target;
      if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
        this.host.requestUpdate();
      }
    };
    (this.host = host).addController(this);
    this.slotNames = slotNames;
  }
  hasDefaultSlot() {
    if (!this.host.childNodes) {
      return false;
    }
    return [...this.host.childNodes].some((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
        return true;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node;
        const tagName = el.tagName.toLowerCase();
        if (tagName === "wa-visually-hidden") {
          return false;
        }
        if (!el.hasAttribute("slot")) {
          return true;
        }
      }
      return false;
    });
  }
  hasNamedSlot(name) {
    return this.host.querySelector?.(`:scope > [slot="${name}"]`) !== null;
  }
  test(slotName) {
    return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
  }
  hostConnected() {
    this.host.shadowRoot?.addEventListener?.("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    this.host.shadowRoot?.removeEventListener?.("slotchange", this.handleSlotChange);
  }
};

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.6J6QYFHV.js
var size_styles_default = i`
  :host([size='small']),
  .wa-size-s {
    font-size: var(--wa-font-size-s);
  }

  :host([size='medium']),
  .wa-size-m {
    font-size: var(--wa-font-size-m);
  }

  :host([size='large']),
  .wa-size-l {
    font-size: var(--wa-font-size-l);
  }
`;

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.4FOHUBBS.js
var button_styles_default = i`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    line-height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    /* When disabled, prevent mouse events from bubbling up from children */
    .button {
      pointer-events: none;
    }
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  .button.is-icon-button:has(wa-icon) {
    width: auto;
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-radius: var(--wa-border-radius-pill);
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      visibility: hidden;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }

  /*
   * Button group border radius modifications
   */

  /* Remove border radius from all grouped buttons by default */
  :host(.wa-button-group__button) .button {
    border-radius: 0;
  }

  /* Horizontal orientation */
  :host(.wa-button-group__horizontal.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-form-control-border-radius);
    border-end-start-radius: var(--wa-form-control-border-radius);
  }

  :host(.wa-button-group__horizontal.wa-button-group__button-last) .button {
    border-start-end-radius: var(--wa-form-control-border-radius);
    border-end-end-radius: var(--wa-form-control-border-radius);
  }

  /* Vertical orientation */
  :host(.wa-button-group__vertical) {
    flex: 1 1 auto;
  }

  :host(.wa-button-group__vertical) .button {
    width: 100%;
    justify-content: start;
  }

  :host(.wa-button-group__vertical.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-form-control-border-radius);
    border-start-end-radius: var(--wa-form-control-border-radius);
  }

  :host(.wa-button-group__vertical.wa-button-group__button-last) .button {
    border-end-start-radius: var(--wa-form-control-border-radius);
    border-end-end-radius: var(--wa-form-control-border-radius);
  }

  /* Handle pill modifier for button groups */
  :host([pill].wa-button-group__horizontal.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-border-radius-pill);
    border-end-start-radius: var(--wa-border-radius-pill);
  }

  :host([pill].wa-button-group__horizontal.wa-button-group__button-last) .button {
    border-start-end-radius: var(--wa-border-radius-pill);
    border-end-end-radius: var(--wa-border-radius-pill);
  }

  :host([pill].wa-button-group__vertical.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-border-radius-pill);
    border-start-end-radius: var(--wa-border-radius-pill);
  }

  :host([pill].wa-button-group__vertical.wa-button-group__button-last) .button {
    border-end-start-radius: var(--wa-border-radius-pill);
    border-end-end-radius: var(--wa-border-radius-pill);
  }
`;

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.PZAN6FPN.js
function watch(propertyName, options) {
  const resolvedOptions = {
    waitUntilFirstUpdate: false,
    ...options
  };
  return (proto, decoratedFnName) => {
    const { update: update2 } = proto;
    const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];
    proto.update = function(changedProps) {
      watchedProperties.forEach((property) => {
        const key = property;
        if (changedProps.has(key)) {
          const oldValue = changedProps.get(key);
          const newValue = this[key];
          if (oldValue !== newValue) {
            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
              this[decoratedFnName](oldValue, newValue);
            }
          }
        }
      });
      update2.call(this, changedProps);
    };
  };
}

// ../../../node_modules/.pnpm/@shoelace-style+localize@3.2.1/node_modules/@shoelace-style/localize/dist/index.js
var connectedElements = /* @__PURE__ */ new Set();
var translations = /* @__PURE__ */ new Map();
var fallback;
var documentDirection = "ltr";
var documentLanguage = "en";
var isClient = typeof MutationObserver !== "undefined" && typeof document !== "undefined" && typeof document.documentElement !== "undefined";
if (isClient) {
  const documentElementObserver = new MutationObserver(update);
  documentDirection = document.documentElement.dir || "ltr";
  documentLanguage = document.documentElement.lang || navigator.language;
  documentElementObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir", "lang"]
  });
}
function registerTranslation(...translation2) {
  translation2.map((t6) => {
    const code = t6.$code.toLowerCase();
    if (translations.has(code)) {
      translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t6));
    } else {
      translations.set(code, t6);
    }
    if (!fallback) {
      fallback = t6;
    }
  });
  update();
}
function update() {
  if (isClient) {
    documentDirection = document.documentElement.dir || "ltr";
    documentLanguage = document.documentElement.lang || navigator.language;
  }
  [...connectedElements.keys()].map((el) => {
    if (typeof el.requestUpdate === "function") {
      el.requestUpdate();
    }
  });
}
var LocalizeController = class {
  constructor(host) {
    this.host = host;
    this.host.addController(this);
  }
  hostConnected() {
    connectedElements.add(this.host);
  }
  hostDisconnected() {
    connectedElements.delete(this.host);
  }
  dir() {
    return `${this.host.dir || documentDirection}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || documentLanguage}`.toLowerCase();
  }
  getTranslationData(lang) {
    var _a, _b;
    const locale = new Intl.Locale(lang.replace(/_/g, "-"));
    const language = locale === null || locale === void 0 ? void 0 : locale.language.toLowerCase();
    const region = (_b = (_a = locale === null || locale === void 0 ? void 0 : locale.region) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : "";
    const primary = translations.get(`${language}-${region}`);
    const secondary = translations.get(language);
    return { locale, language, region, primary, secondary };
  }
  exists(key, options) {
    var _a;
    const { primary, secondary } = this.getTranslationData((_a = options.lang) !== null && _a !== void 0 ? _a : this.lang());
    options = Object.assign({ includeFallback: false }, options);
    if (primary && primary[key] || secondary && secondary[key] || options.includeFallback && fallback && fallback[key]) {
      return true;
    }
    return false;
  }
  term(key, ...args) {
    const { primary, secondary } = this.getTranslationData(this.lang());
    let term;
    if (primary && primary[key]) {
      term = primary[key];
    } else if (secondary && secondary[key]) {
      term = secondary[key];
    } else if (fallback && fallback[key]) {
      term = fallback[key];
    } else {
      console.error(`No translation found for: ${String(key)}`);
      return String(key);
    }
    if (typeof term === "function") {
      return term(...args);
    }
    return term;
  }
  date(dateToFormat, options) {
    dateToFormat = new Date(dateToFormat);
    return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
  }
  number(numberToFormat, options) {
    numberToFormat = Number(numberToFormat);
    return isNaN(numberToFormat) ? "" : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
  }
  relativeTime(value, unit, options) {
    return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
  }
};

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.72WJND5X.js
var translation = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  carousel: "Carousel",
  clearEntry: "Clear entry",
  close: "Close",
  copied: "Copied",
  copy: "Copy",
  currentValue: "Current value",
  dropFileHere: "Drop file here or click to browse",
  decrement: "Decrement",
  dropFilesHere: "Drop files here or click to browse",
  error: "Error",
  goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
  hidePassword: "Hide password",
  increment: "Increment",
  loading: "Loading",
  nextSlide: "Next slide",
  numOptionsSelected: (num) => {
    if (num === 0) return "No options selected";
    if (num === 1) return "1 option selected";
    return `${num} options selected`;
  },
  pauseAnimation: "Pause animation",
  playAnimation: "Play animation",
  previousSlide: "Previous slide",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollableRegion: "Scrollable region",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: (slide) => `Slide ${slide}`,
  toggleColorFormat: "Toggle color format",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out"
};
registerTranslation(translation);
var en_default = translation;

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.OKXBNRE6.js
var LocalizeController2 = class extends LocalizeController {
};
registerTranslation(en_default);

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.XNTP7DEQ.js
var variants_styles_default = i`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`;

// ../../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e6 = (t6) => (...e8) => ({ _$litDirective$: t6, values: e8 });
var i5 = class {
  constructor(t6) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t6, e8, i7) {
    this._$Ct = t6, this._$AM = e8, this._$Ci = i7;
  }
  _$AS(t6, e8) {
    return this.update(t6, e8);
  }
  update(t6, e8) {
    return this.render(...e8);
  }
};

// ../../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/directives/class-map.js
var e7 = e6(class extends i5 {
  constructor(t6) {
    if (super(t6), t6.type !== t4.ATTRIBUTE || "class" !== t6.name || t6.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t6) {
    return " " + Object.keys(t6).filter((s4) => t6[s4]).join(" ") + " ";
  }
  update(s4, [i7]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s4.strings && (this.nt = new Set(s4.strings.join(" ").split(/\s/).filter((t6) => "" !== t6)));
      for (const t6 in i7) i7[t6] && !this.nt?.has(t6) && this.st.add(t6);
      return this.render(i7);
    }
    const r7 = s4.element.classList;
    for (const t6 of this.st) t6 in i7 || (r7.remove(t6), this.st.delete(t6));
    for (const t6 in i7) {
      const s5 = !!i7[t6];
      s5 === this.st.has(t6) || this.nt?.has(t6) || (s5 ? (r7.add(t6), this.st.add(t6)) : (r7.remove(t6), this.st.delete(t6)));
    }
    return E;
  }
});

// ../../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/directives/if-defined.js
var o7 = (o9) => o9 ?? A;

// ../../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/static.js
var a3 = /* @__PURE__ */ Symbol.for("");
var o8 = (t6) => {
  if (t6?.r === a3) return t6?._$litStatic$;
};
var i6 = (t6, ...r7) => ({ _$litStatic$: r7.reduce((r8, e8, a4) => r8 + ((t7) => {
  if (void 0 !== t7._$litStatic$) return t7._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t7}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e8) + t6[a4 + 1], t6[0]), r: a3 });
var l3 = /* @__PURE__ */ new Map();
var n5 = (t6) => (r7, ...e8) => {
  const a4 = e8.length;
  let s4, i7;
  const n6 = [], u4 = [];
  let c5, $3 = 0, f3 = false;
  for (; $3 < a4; ) {
    for (c5 = r7[$3]; $3 < a4 && void 0 !== (i7 = e8[$3], s4 = o8(i7)); ) c5 += s4 + r7[++$3], f3 = true;
    $3 !== a4 && u4.push(i7), n6.push(c5), $3++;
  }
  if ($3 === a4 && n6.push(r7[a4]), f3) {
    const t7 = n6.join("$$lit$$");
    void 0 === (r7 = l3.get(t7)) && (n6.raw = n6, l3.set(t7, r7 = n6)), e8 = u4;
  }
  return t6(r7, ...e8);
};
var u3 = n5(b2);
var c4 = n5(w);
var $2 = n5(T);

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.B33LOABL.js
var WaButton = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["click"];
    this.hasSlotController = new HasSlotController(this, "[default]", "start", "end");
    this.localize = new LocalizeController2(this);
    this.invalid = false;
    this.isIconButton = false;
    this.title = "";
    this.variant = "neutral";
    this.appearance = "accent";
    this.size = "medium";
    this.withCaret = false;
    this.disabled = false;
    this.loading = false;
    this.pill = false;
    this.type = "button";
  }
  static get validators() {
    return [...super.validators, MirrorValidator()];
  }
  constructLightDOMButton() {
    const button = document.createElement("button");
    for (const attribute of this.attributes) {
      if (attribute.name === "style") {
        continue;
      }
      button.setAttribute(attribute.name, attribute.value);
    }
    button.type = this.type;
    button.style.position = "absolute !important";
    button.style.width = "0 !important";
    button.style.height = "0 !important";
    button.style.clipPath = "inset(50%) !important";
    button.style.overflow = "hidden !important";
    button.style.whiteSpace = "nowrap !important";
    if (this.name) {
      button.name = this.name;
    }
    button.value = this.value || "";
    return button;
  }
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (this.type !== "submit" && this.type !== "reset") {
      return;
    }
    const form = this.getForm();
    if (!form) return;
    const lightDOMButton = this.constructLightDOMButton();
    this.parentElement?.append(lightDOMButton);
    lightDOMButton.click();
    lightDOMButton.remove();
  }
  handleInvalid() {
    this.dispatchEvent(new WaInvalidEvent());
  }
  handleLabelSlotChange() {
    const nodes = this.labelSlot.assignedNodes({ flatten: true });
    let hasIconLabel = false;
    let hasIcon = false;
    let hasText = false;
    let hasOtherElements = false;
    [...nodes].forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        if (element.localName === "wa-icon") {
          hasIcon = true;
          if (!hasIconLabel) hasIconLabel = element.label !== void 0;
        } else {
          hasOtherElements = true;
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim() || "";
        if (text.length > 0) {
          hasText = true;
        }
      }
    });
    this.isIconButton = hasIcon && !hasText && !hasOtherElements;
    if (this.isIconButton && !hasIconLabel) {
      console.warn(
        'Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',
        this
      );
    }
  }
  isButton() {
    return this.href ? false : true;
  }
  isLink() {
    return this.href ? true : false;
  }
  handleDisabledChange() {
    this.updateValidity();
  }
  // eslint-disable-next-line
  setValue(..._args) {
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  render() {
    const isLink = this.isLink();
    const tag = isLink ? i6`a` : i6`button`;
    return u3`
      <${tag}
        part="base"
        class=${e7({
      button: true,
      caret: this.withCaret,
      disabled: this.disabled,
      loading: this.loading,
      rtl: this.localize.dir() === "rtl",
      "has-label": this.hasSlotController.test("[default]"),
      "has-start": this.hasSlotController.test("start"),
      "has-end": this.hasSlotController.test("end"),
      "is-icon-button": this.isIconButton
    })}
        ?disabled=${o7(isLink ? void 0 : this.disabled)}
        type=${o7(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${o7(isLink ? void 0 : this.name)}
        value=${o7(isLink ? void 0 : this.value)}
        href=${o7(isLink ? this.href : void 0)}
        target=${o7(isLink ? this.target : void 0)}
        download=${o7(isLink ? this.download : void 0)}
        rel=${o7(isLink && this.rel ? this.rel : void 0)}
        role=${o7(isLink ? void 0 : "button")}
        aria-disabled=${o7(isLink && this.disabled ? "true" : void 0)}
        tabindex=${this.disabled ? "-1" : "0"}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret ? u3`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              ` : ""}
        ${this.loading ? u3`<wa-spinner part="spinner"></wa-spinner>` : ""}
      </${tag}>
    `;
  }
};
WaButton.shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };
WaButton.css = [button_styles_default, variants_styles_default, size_styles_default];
__decorateClass2([
  e5(".button")
], WaButton.prototype, "button", 2);
__decorateClass2([
  e5("slot:not([name])")
], WaButton.prototype, "labelSlot", 2);
__decorateClass2([
  r5()
], WaButton.prototype, "invalid", 2);
__decorateClass2([
  r5()
], WaButton.prototype, "isIconButton", 2);
__decorateClass2([
  n4()
], WaButton.prototype, "title", 2);
__decorateClass2([
  n4({ reflect: true })
], WaButton.prototype, "variant", 2);
__decorateClass2([
  n4({ reflect: true })
], WaButton.prototype, "appearance", 2);
__decorateClass2([
  n4({ reflect: true })
], WaButton.prototype, "size", 2);
__decorateClass2([
  n4({ attribute: "with-caret", type: Boolean, reflect: true })
], WaButton.prototype, "withCaret", 2);
__decorateClass2([
  n4({ type: Boolean })
], WaButton.prototype, "disabled", 2);
__decorateClass2([
  n4({ type: Boolean, reflect: true })
], WaButton.prototype, "loading", 2);
__decorateClass2([
  n4({ type: Boolean, reflect: true })
], WaButton.prototype, "pill", 2);
__decorateClass2([
  n4()
], WaButton.prototype, "type", 2);
__decorateClass2([
  n4({ reflect: true })
], WaButton.prototype, "name", 2);
__decorateClass2([
  n4({ reflect: true })
], WaButton.prototype, "value", 2);
__decorateClass2([
  n4({ reflect: true })
], WaButton.prototype, "href", 2);
__decorateClass2([
  n4()
], WaButton.prototype, "target", 2);
__decorateClass2([
  n4()
], WaButton.prototype, "rel", 2);
__decorateClass2([
  n4()
], WaButton.prototype, "download", 2);
__decorateClass2([
  n4({ attribute: "formaction" })
], WaButton.prototype, "formAction", 2);
__decorateClass2([
  n4({ attribute: "formenctype" })
], WaButton.prototype, "formEnctype", 2);
__decorateClass2([
  n4({ attribute: "formmethod" })
], WaButton.prototype, "formMethod", 2);
__decorateClass2([
  n4({ attribute: "formnovalidate", type: Boolean })
], WaButton.prototype, "formNoValidate", 2);
__decorateClass2([
  n4({ attribute: "formtarget" })
], WaButton.prototype, "formTarget", 2);
__decorateClass2([
  watch("disabled", { waitUntilFirstUpdate: true })
], WaButton.prototype, "handleDisabledChange", 1);
WaButton = __decorateClass2([
  t3("wa-button")
], WaButton);

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.AGDGRG4E.js
var spinner_styles_default = i`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-dasharray: 75, 100;
    stroke-dashoffset: -5;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.VTAV2SG4.js
var WaSpinner = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
  }
  render() {
    return b2`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        <circle class="indicator" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    `;
  }
};
WaSpinner.css = spinner_styles_default;
WaSpinner = __decorateClass2([
  t3("wa-spinner")
], WaSpinner);

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.YDQCS2HK.js
var WaErrorEvent = class extends Event {
  constructor() {
    super("wa-error", { bubbles: true, cancelable: false, composed: true });
  }
};

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.WDIIGUNP.js
var WaLoadEvent = class extends Event {
  constructor() {
    super("wa-load", { bubbles: true, cancelable: false, composed: true });
  }
};

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.D5I2DWML.js
var icon_styles_default = i`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* Standard */
  :host(:not([auto-width])) {
    width: 1.25em;
    height: 1em;
  }

  /* Auto-width */
  :host([auto-width]) {
    width: auto;
    height: 1em;
  }

  svg {
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* Animations */
  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin-pulse;
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  /* Keyframes */
  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']) {
      animation: none !important;
      transition: none !important;
    }
  }
  @keyframes beat {
    0%,
    90% {
      transform: scale(1);
    }
    45% {
      transform: scale(var(--beat-scale, 1.25));
    }
  }

  @keyframes fade {
    50% {
      opacity: var(--fade-opacity, 0.4);
    }
  }

  @keyframes beat-fade {
    0%,
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.125));
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(var(--bounce-start-scale-x, 1.1), var(--bounce-start-scale-y, 0.9)) translateY(0);
    }
    30% {
      transform: scale(var(--bounce-jump-scale-x, 0.9), var(--bounce-jump-scale-y, 1.1))
        translateY(var(--bounce-height, -0.5em));
    }
    50% {
      transform: scale(var(--bounce-land-scale-x, 1.05), var(--bounce-land-scale-y, 0.95)) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(var(--bounce-rebound, -0.125em));
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes flip {
    50% {
      transform: rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -180deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(-15deg);
    }
    4% {
      transform: rotate(15deg);
    }
    8%,
    24% {
      transform: rotate(-18deg);
    }
    12%,
    28% {
      transform: rotate(18deg);
    }
    16% {
      transform: rotate(-22deg);
    }
    20% {
      transform: rotate(22deg);
    }
    32% {
      transform: rotate(-12deg);
    }
    36% {
      transform: rotate(12deg);
    }
    40%,
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-pulse {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.K6QMUIHP.js
var kitCode = "";
function setKitCode(code) {
  kitCode = code;
}
function getKitCode() {
  if (!kitCode) {
    const el = document.querySelector("[data-fa-kit-code]");
    if (el) {
      setKitCode(el.getAttribute("data-fa-kit-code") || "");
    }
  }
  return kitCode;
}

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.JVTAGR5B.js
var FA_VERSION = "7.2.0";
function getIconUrl(name, family, variant) {
  const kitCode2 = getKitCode();
  const isPro = kitCode2.length > 0;
  let folder = "solid";
  if (family === "chisel") {
    folder = "chisel-regular";
  }
  if (family === "etch") {
    folder = "etch-solid";
  }
  if (family === "graphite") {
    folder = "graphite-thin";
  }
  if (family === "jelly") {
    folder = "jelly-regular";
    if (variant === "duo-regular") folder = "jelly-duo-regular";
    if (variant === "fill-regular") folder = "jelly-fill-regular";
  }
  if (family === "jelly-duo") {
    folder = "jelly-duo-regular";
  }
  if (family === "jelly-fill") {
    folder = "jelly-fill-regular";
  }
  if (family === "notdog") {
    if (variant === "solid") folder = "notdog-solid";
    if (variant === "duo-solid") folder = "notdog-duo-solid";
  }
  if (family === "notdog-duo") {
    folder = "notdog-duo-solid";
  }
  if (family === "slab") {
    if (variant === "solid" || variant === "regular") folder = "slab-regular";
    if (variant === "press-regular") folder = "slab-press-regular";
  }
  if (family === "slab-press") {
    folder = "slab-press-regular";
  }
  if (family === "thumbprint") {
    folder = "thumbprint-light";
  }
  if (family === "utility") {
    folder = "utility-semibold";
  }
  if (family === "utility-duo") {
    folder = "utility-duo-semibold";
  }
  if (family === "utility-fill") {
    folder = "utility-fill-semibold";
  }
  if (family === "whiteboard") {
    folder = "whiteboard-semibold";
  }
  if (family === "classic") {
    if (variant === "thin") folder = "thin";
    if (variant === "light") folder = "light";
    if (variant === "regular") folder = "regular";
    if (variant === "solid") folder = "solid";
  }
  if (family === "duotone") {
    if (variant === "thin") folder = "duotone-thin";
    if (variant === "light") folder = "duotone-light";
    if (variant === "regular") folder = "duotone-regular";
    if (variant === "solid") folder = "duotone";
  }
  if (family === "sharp") {
    if (variant === "thin") folder = "sharp-thin";
    if (variant === "light") folder = "sharp-light";
    if (variant === "regular") folder = "sharp-regular";
    if (variant === "solid") folder = "sharp-solid";
  }
  if (family === "sharp-duotone") {
    if (variant === "thin") folder = "sharp-duotone-thin";
    if (variant === "light") folder = "sharp-duotone-light";
    if (variant === "regular") folder = "sharp-duotone-regular";
    if (variant === "solid") folder = "sharp-duotone-solid";
  }
  if (family === "brands") {
    folder = "brands";
  }
  return isPro ? `https://ka-p.fontawesome.com/releases/v${FA_VERSION}/svgs/${folder}/${name}.svg?token=${encodeURIComponent(kitCode2)}` : `https://ka-f.fontawesome.com/releases/v${FA_VERSION}/svgs/${folder}/${name}.svg`;
}
var library = {
  name: "default",
  resolver: (name, family = "classic", variant = "solid") => {
    return getIconUrl(name, family, variant);
  },
  mutator: (svg, hostEl) => {
    if (hostEl?.family && !svg.hasAttribute("data-duotone-initialized")) {
      const { family, variant } = hostEl;
      if (
        // Duotone
        family === "duotone" || // Sharp duotone
        family === "sharp-duotone" || // Notdog duo (correct usage: family="notdog-duo")
        family === "notdog-duo" || // NOTE: family="notdog" variant="duo-solid" is deprecated
        family === "notdog" && variant === "duo-solid" || // Jelly duo (correct usage: family="jelly-duo")
        family === "jelly-duo" || // NOTE: family="jelly" variant="duo-regular" is deprecated
        family === "jelly" && variant === "duo-regular" || // Utility duo (correct usage: family="utility-duo")
        family === "utility-duo" || // Thumbprint
        family === "thumbprint"
      ) {
        const paths = [...svg.querySelectorAll("path")];
        const primaryPath = paths.find((p4) => !p4.hasAttribute("opacity"));
        const secondaryPath = paths.find((p4) => p4.hasAttribute("opacity"));
        if (!primaryPath || !secondaryPath) return;
        primaryPath.setAttribute("data-duotone-primary", "");
        secondaryPath.setAttribute("data-duotone-secondary", "");
        if (hostEl.swapOpacity && primaryPath && secondaryPath) {
          const originalOpacity = secondaryPath.getAttribute("opacity") || "0.4";
          primaryPath.style.setProperty("--path-opacity", originalOpacity);
          secondaryPath.style.setProperty("--path-opacity", "1");
        }
        svg.setAttribute("data-duotone-initialized", "");
      }
    }
  }
};
var library_default_default = library;

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.KPN3YZ6U.js
function dataUri(svg) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
var icons = {
  //
  // Solid variant
  //
  solid: {
    check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>`,
    "chevron-down": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>`,
    "chevron-left": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>`,
    "chevron-right": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>`,
    circle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>`,
    eyedropper: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>`,
    file: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>`,
    "file-audio": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>`,
    "file-code": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>`,
    "file-excel": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>`,
    "file-image": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>`,
    "file-pdf": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>`,
    "file-powerpoint": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>`,
    "file-video": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>`,
    "file-word": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>`,
    "file-zipper": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>`,
    "grip-vertical": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>`,
    indeterminate: `<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>`,
    minus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>`,
    pause: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>`,
    play: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>`,
    upload: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>`,
    xmark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>`
  },
  //
  // Regular variant
  //
  regular: {
    "circle-question": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>`,
    "circle-xmark": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>`,
    eye: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>`,
    "eye-slash": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>`
  }
};
var systemLibrary = {
  name: "system",
  resolver: (name, _family = "classic", variant = "solid") => {
    let collection = icons[variant];
    let svg = collection[name] ?? icons.regular[name] ?? icons.regular["circle-question"];
    if (svg) {
      return dataUri(svg);
    }
    return "";
  }
};
var library_system_default = systemLibrary;

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.FSRXYGSW.js
var defaultIconFamily = "classic";
var registry = [library_default_default, library_system_default];
var watchedIcons = [];
function watchIcon(icon) {
  watchedIcons.push(icon);
}
function unwatchIcon(icon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}
function getIconLibrary(name) {
  return registry.find((lib) => lib.name === name);
}
function getDefaultIconFamily() {
  return defaultIconFamily;
}

// ../../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/directive-helpers.js
var { I: t5 } = j;
var l4 = (o9, t6) => void 0 === t6 ? void 0 !== o9?._$litType$ : o9?._$litType$ === t6;
var r6 = (o9) => void 0 === o9.strings;
var m2 = {};
var p3 = (o9, t6 = m2) => o9._$AH = t6;

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.JKBNW2TG.js
var CACHEABLE_ERROR = /* @__PURE__ */ Symbol();
var RETRYABLE_ERROR = /* @__PURE__ */ Symbol();
var parser;
var iconCache = /* @__PURE__ */ new Map();
var WaIcon = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.svg = null;
    this.autoWidth = false;
    this.swapOpacity = false;
    this.label = "";
    this.library = "default";
    this.rotate = 0;
    this.resolveIcon = async (url, library2) => {
      let fileData;
      if (library2?.spriteSheet) {
        if (!this.hasUpdated) {
          await this.updateComplete;
        }
        this.svg = b2`<svg part="svg">
        <use part="use" href="${url}"></use>
      </svg>`;
        await this.updateComplete;
        const svg = this.shadowRoot.querySelector("[part='svg']");
        if (typeof library2.mutator === "function") {
          library2.mutator(svg, this);
        }
        return this.svg;
      }
      try {
        fileData = await fetch(url, { mode: "cors" });
        if (!fileData.ok) return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
      } catch {
        return RETRYABLE_ERROR;
      }
      try {
        const div = document.createElement("div");
        div.innerHTML = await fileData.text();
        const svg = div.firstElementChild;
        if (svg?.tagName?.toLowerCase() !== "svg") return CACHEABLE_ERROR;
        if (!parser) parser = new DOMParser();
        const doc = parser.parseFromString(svg.outerHTML, "text/html");
        const svgEl = doc.body.querySelector("svg");
        if (!svgEl) return CACHEABLE_ERROR;
        svgEl.part.add("svg");
        return document.adoptNode(svgEl);
      } catch {
        return CACHEABLE_ERROR;
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.hasAttribute("rotate")) {
      this.style.setProperty("--rotate-angle", `${this.rotate}deg`);
    }
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }
  getIconSource() {
    const library2 = getIconLibrary(this.library);
    const family = this.family || getDefaultIconFamily();
    if (this.name && library2) {
      return {
        url: library2.resolver(this.name, family, this.variant, this.autoWidth),
        fromLibrary: true
      };
    }
    return {
      url: this.src,
      fromLibrary: false
    };
  }
  handleLabelChange() {
    const hasLabel = typeof this.label === "string" && this.label.length > 0;
    if (hasLabel) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.label);
      this.removeAttribute("aria-hidden");
    } else {
      this.removeAttribute("role");
      this.removeAttribute("aria-label");
      this.setAttribute("aria-hidden", "true");
    }
  }
  async setIcon() {
    const { url, fromLibrary } = this.getIconSource();
    const library2 = fromLibrary ? getIconLibrary(this.library) : void 0;
    if (!url) {
      this.svg = null;
      return;
    }
    let iconResolver = iconCache.get(url);
    if (!iconResolver) {
      iconResolver = this.resolveIcon(url, library2);
      iconCache.set(url, iconResolver);
    }
    const svg = await iconResolver;
    if (svg === RETRYABLE_ERROR) {
      iconCache.delete(url);
    }
    if (url !== this.getIconSource().url) {
      return;
    }
    if (l4(svg)) {
      this.svg = svg;
      return;
    }
    switch (svg) {
      case RETRYABLE_ERROR:
      case CACHEABLE_ERROR:
        this.svg = null;
        this.dispatchEvent(new WaErrorEvent());
        break;
      default:
        this.svg = svg.cloneNode(true);
        library2?.mutator?.(this.svg, this);
        this.dispatchEvent(new WaLoadEvent());
    }
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    const library2 = getIconLibrary(this.library);
    if (this.hasAttribute("rotate")) {
      this.style.setProperty("--rotate-angle", `${this.rotate}deg`);
    }
    const svg = this.shadowRoot?.querySelector("svg");
    if (svg) {
      library2?.mutator?.(svg, this);
    }
  }
  render() {
    if (this.hasUpdated) {
      return this.svg;
    }
    return b2`<svg part="svg" width="16" height="16"></svg>`;
  }
};
WaIcon.css = icon_styles_default;
__decorateClass2([
  r5()
], WaIcon.prototype, "svg", 2);
__decorateClass2([
  n4({ reflect: true })
], WaIcon.prototype, "name", 2);
__decorateClass2([
  n4({ reflect: true })
], WaIcon.prototype, "family", 2);
__decorateClass2([
  n4({ reflect: true })
], WaIcon.prototype, "variant", 2);
__decorateClass2([
  n4({ attribute: "auto-width", type: Boolean, reflect: true })
], WaIcon.prototype, "autoWidth", 2);
__decorateClass2([
  n4({ attribute: "swap-opacity", type: Boolean, reflect: true })
], WaIcon.prototype, "swapOpacity", 2);
__decorateClass2([
  n4()
], WaIcon.prototype, "src", 2);
__decorateClass2([
  n4()
], WaIcon.prototype, "label", 2);
__decorateClass2([
  n4({ reflect: true })
], WaIcon.prototype, "library", 2);
__decorateClass2([
  n4({ type: Number, reflect: true })
], WaIcon.prototype, "rotate", 2);
__decorateClass2([
  n4({ type: String, reflect: true })
], WaIcon.prototype, "flip", 2);
__decorateClass2([
  n4({ type: String, reflect: true })
], WaIcon.prototype, "animation", 2);
__decorateClass2([
  watch("label")
], WaIcon.prototype, "handleLabelChange", 1);
__decorateClass2([
  watch(["family", "name", "library", "variant", "src", "autoWidth", "swapOpacity"], { waitUntilFirstUpdate: true })
], WaIcon.prototype, "setIcon", 1);
WaIcon = __decorateClass2([
  t3("wa-icon")
], WaIcon);

// src/client/components/threads-popover.ts
var ThreadsPopover = class extends i4 {
  constructor() {
    super(...arguments);
    this.active = false;
    this.x = 0;
    this.y = 0;
  }
  addComment() {
    this.dispatchEvent(new CustomEvent("add-comment", {
      bubbles: true,
      composed: true
    }));
  }
  render() {
    if (!this.active) return b2``;
    return b2`
      <div
        class="popover-content"
        style="position:fixed; left:${this.x}px; top:${this.y - 10}px; transform:translate(-50%, -100%);"
      >
        <wa-button size="small" appearance="plain" @click=${this.addComment}>
          <wa-icon slot="start" name="comment" variant="regular" label="Add comment"></wa-icon>
          Add comment
        </wa-button>
      </div>
    `;
  }
  show(x2, y3) {
    this.x = x2;
    this.y = y3;
    this.active = true;
  }
  hide() {
    this.active = false;
  }
};
ThreadsPopover.styles = i`
    :host {
      position: fixed;
      z-index: 10001;
    }
    .popover-content {
      background: var(--tc-bg, hsl(0 0% 100%));
      border: 1px solid var(--tc-border, hsl(0 0% 89.8%));
      border-radius: var(--tc-radius, 6px);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      padding: 4px;
    }
    wa-button::part(base) {
      color: var(--tc-fg, hsl(0 0% 9%));
      font-weight: 500;
      font-size: 13px;
    }
    wa-button::part(base):hover {
      background: var(--tc-accent, hsl(0 0% 96.1%));
    }
  `;
__decorateClass([
  n4({ type: Boolean })
], ThreadsPopover.prototype, "active", 2);
__decorateClass([
  n4({ type: Number })
], ThreadsPopover.prototype, "x", 2);
__decorateClass([
  n4({ type: Number })
], ThreadsPopover.prototype, "y", 2);
ThreadsPopover = __decorateClass([
  t3("threads-popover")
], ThreadsPopover);

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.GWWGP7ZL.js
var textarea_styles_default = i`
  :host {
    border-width: 0;
  }

  .textarea {
    display: grid;
    align-items: center;
    margin: 0;
    border: none;
    outline: none;
    cursor: inherit;
    font: inherit;
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    -webkit-appearance: none;

    &:focus-within {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .textarea {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .textarea {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .textarea {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  textarea {
    display: block;
    width: 100%;
    border: none;
    background: transparent;
    font: inherit;
    color: inherit;
    padding: calc(var(--wa-form-control-padding-block) - ((1lh - 1em) / 2)) var(--wa-form-control-padding-inline); /* accounts for the larger line height of textarea content */
    min-height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    box-shadow: none;
    margin: 0;

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &:focus {
      outline: none;
    }
  }

  /* Shared textarea and size-adjuster positioning */
  .control,
  .size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
    padding: 0;
  }

  textarea::-webkit-search-decoration,
  textarea::-webkit-search-cancel-button,
  textarea::-webkit-search-results-button,
  textarea::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /*
   * Resize types
   */

  :host([resize='none']) textarea {
    resize: none;
  }

  textarea,
  :host([resize='vertical']) textarea {
    resize: vertical;
  }

  :host([resize='horizontal']) textarea {
    resize: horizontal;
  }

  :host([resize='both']) textarea {
    resize: both;
  }

  :host([resize='auto']) textarea {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`;

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.5LXXXELE.js
var form_control_styles_default = i`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint) {
      display: none;
    }
  }
`;

// ../../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/directives/live.js
var l5 = e6(class extends i5 {
  constructor(r7) {
    if (super(r7), r7.type !== t4.PROPERTY && r7.type !== t4.ATTRIBUTE && r7.type !== t4.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r6(r7)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r7) {
    return r7;
  }
  update(i7, [t6]) {
    if (t6 === E || t6 === A) return t6;
    const o9 = i7.element, l6 = i7.name;
    if (i7.type === t4.PROPERTY) {
      if (t6 === o9[l6]) return E;
    } else if (i7.type === t4.BOOLEAN_ATTRIBUTE) {
      if (!!t6 === o9.hasAttribute(l6)) return E;
    } else if (i7.type === t4.ATTRIBUTE && o9.getAttribute(l6) === t6 + "") return E;
    return p3(i7), t6;
  }
});

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.6TNOCAA5.js
var WaTextarea = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["blur", "input"];
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.title = "";
    this.name = null;
    this._value = null;
    this.defaultValue = this.getAttribute("value") ?? "";
    this.size = "medium";
    this.appearance = "outlined";
    this.label = "";
    this.hint = "";
    this.placeholder = "";
    this.rows = 4;
    this.resize = "vertical";
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.spellcheck = true;
    this.withLabel = false;
    this.withHint = false;
  }
  static get validators() {
    return [...super.validators, MirrorValidator()];
  }
  /** The current value of the input, submitted as a name/value pair with form data. */
  get value() {
    if (this.valueHasChanged) {
      return this._value;
    }
    return this._value ?? this.defaultValue;
  }
  set value(val) {
    if (this._value === val) {
      return;
    }
    this.valueHasChanged = true;
    this._value = val;
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.setTextareaDimensions());
    this.updateComplete.then(() => {
      this.setTextareaDimensions();
      this.resizeObserver.observe(this.input);
      if (this.didSSR && this.input && this.value !== this.input.value) {
        const value = this.input.value;
        this.value = value;
      }
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.input) {
      this.resizeObserver?.unobserve(this.input);
    }
  }
  handleBlur() {
    this.checkValidity();
  }
  handleChange(event) {
    this.valueHasChanged = true;
    this.value = this.input.value;
    this.setTextareaDimensions();
    this.checkValidity();
    this.relayNativeEvent(event, { bubbles: true, composed: true });
  }
  handleInput(event) {
    this.valueHasChanged = true;
    this.value = this.input.value;
    this.relayNativeEvent(event, { bubbles: true, composed: true });
  }
  setTextareaDimensions() {
    if (this.resize === "none") {
      this.base.style.width = ``;
      this.base.style.height = ``;
      return;
    }
    if (this.resize === "auto") {
      this.sizeAdjuster.style.height = `${this.input.clientHeight}px`;
      this.input.style.height = "auto";
      this.input.style.height = `${this.input.scrollHeight}px`;
      this.base.style.width = ``;
      this.base.style.height = ``;
      return;
    }
    if (this.input.style.width) {
      const width = Number(this.input.style.width.split(/px/)[0]) + 2;
      this.base.style.width = `${width}px`;
    }
    if (this.input.style.height) {
      const height = Number(this.input.style.height.split(/px/)[0]) + 2;
      this.base.style.height = `${height}px`;
    }
  }
  handleRowsChange() {
    this.setTextareaDimensions();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.checkValidity();
    this.setTextareaDimensions();
  }
  updated(changedProperties) {
    if (changedProperties.has("resize")) {
      this.setTextareaDimensions();
    }
    super.updated(changedProperties);
    if (changedProperties.has("value")) {
      this.customStates.set("blank", !this.value);
    }
  }
  /** Sets focus on the textarea. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the textarea. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the textarea. */
  select() {
    this.input.select();
  }
  /** Gets or sets the textarea's scroll position. */
  scrollPosition(position) {
    if (position) {
      if (typeof position.top === "number") this.input.scrollTop = position.top;
      if (typeof position.left === "number") this.input.scrollLeft = position.left;
      return void 0;
    }
    return {
      top: this.input.scrollTop,
      left: this.input.scrollTop
    };
  }
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  setRangeText(replacement, start, end, selectMode = "preserve") {
    const selectionStart = start ?? this.input.selectionStart;
    const selectionEnd = end ?? this.input.selectionEnd;
    this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.setTextareaDimensions();
    }
  }
  formResetCallback() {
    this._value = null;
    if (this.input) {
      this.input.value = this.value || "";
    }
    super.formResetCallback();
  }
  render() {
    const hasLabelSlot = this.hasUpdated ? this.hasSlotController.test("label") : this.withLabel;
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test("hint") : this.withHint;
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    return b2`
      <label
        part="form-control-label label"
        class=${e7({
      label: true,
      "has-label": hasLabel
    })}
        for="input"
        aria-hidden=${hasLabel ? "false" : "true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="textarea">
        <textarea
          part="textarea"
          id="input"
          class="control"
          title=${this.title}
          name=${o7(this.name)}
          .value=${l5(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${o7(this.placeholder)}
          rows=${o7(this.rows)}
          minlength=${o7(this.minlength)}
          maxlength=${o7(this.maxlength)}
          autocapitalize=${o7(this.autocapitalize)}
          autocorrect=${o7(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${o7(this.spellcheck)}
          enterkeyhint=${o7(this.enterkeyhint)}
          inputmode=${o7(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>

        <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
        <div part="textarea-adjuster" class="size-adjuster" ?hidden=${this.resize !== "auto"}></div>
      </div>

      <slot
        id="hint"
        name="hint"
        part="hint"
        aria-hidden=${hasHint ? "false" : "true"}
        class=${e7({
      "has-slotted": hasHint
    })}
        >${this.hint}</slot
      >
    `;
  }
};
WaTextarea.css = [textarea_styles_default, form_control_styles_default, size_styles_default];
__decorateClass2([
  e5(".control")
], WaTextarea.prototype, "input", 2);
__decorateClass2([
  e5('[part~="base"]')
], WaTextarea.prototype, "base", 2);
__decorateClass2([
  e5(".size-adjuster")
], WaTextarea.prototype, "sizeAdjuster", 2);
__decorateClass2([
  n4()
], WaTextarea.prototype, "title", 2);
__decorateClass2([
  n4({ reflect: true })
], WaTextarea.prototype, "name", 2);
__decorateClass2([
  r5()
], WaTextarea.prototype, "value", 1);
__decorateClass2([
  n4({ attribute: "value", reflect: true })
], WaTextarea.prototype, "defaultValue", 2);
__decorateClass2([
  n4({ reflect: true })
], WaTextarea.prototype, "size", 2);
__decorateClass2([
  n4({ reflect: true })
], WaTextarea.prototype, "appearance", 2);
__decorateClass2([
  n4()
], WaTextarea.prototype, "label", 2);
__decorateClass2([
  n4({ attribute: "hint" })
], WaTextarea.prototype, "hint", 2);
__decorateClass2([
  n4()
], WaTextarea.prototype, "placeholder", 2);
__decorateClass2([
  n4({ type: Number })
], WaTextarea.prototype, "rows", 2);
__decorateClass2([
  n4({ reflect: true })
], WaTextarea.prototype, "resize", 2);
__decorateClass2([
  n4({ type: Boolean })
], WaTextarea.prototype, "disabled", 2);
__decorateClass2([
  n4({ type: Boolean, reflect: true })
], WaTextarea.prototype, "readonly", 2);
__decorateClass2([
  n4({ type: Boolean, reflect: true })
], WaTextarea.prototype, "required", 2);
__decorateClass2([
  n4({ type: Number })
], WaTextarea.prototype, "minlength", 2);
__decorateClass2([
  n4({ type: Number })
], WaTextarea.prototype, "maxlength", 2);
__decorateClass2([
  n4()
], WaTextarea.prototype, "autocapitalize", 2);
__decorateClass2([
  n4()
], WaTextarea.prototype, "autocorrect", 2);
__decorateClass2([
  n4()
], WaTextarea.prototype, "autocomplete", 2);
__decorateClass2([
  n4({ type: Boolean })
], WaTextarea.prototype, "autofocus", 2);
__decorateClass2([
  n4()
], WaTextarea.prototype, "enterkeyhint", 2);
__decorateClass2([
  n4({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], WaTextarea.prototype, "spellcheck", 2);
__decorateClass2([
  n4()
], WaTextarea.prototype, "inputmode", 2);
__decorateClass2([
  n4({ attribute: "with-label", type: Boolean })
], WaTextarea.prototype, "withLabel", 2);
__decorateClass2([
  n4({ attribute: "with-hint", type: Boolean })
], WaTextarea.prototype, "withHint", 2);
__decorateClass2([
  watch("rows", { waitUntilFirstUpdate: true })
], WaTextarea.prototype, "handleRowsChange", 1);
__decorateClass2([
  watch("value", { waitUntilFirstUpdate: true })
], WaTextarea.prototype, "handleValueChange", 1);
WaTextarea = __decorateClass2([
  t3("wa-textarea")
], WaTextarea);

// src/client/components/threads-inline-editor.ts
var ThreadsInlineEditor = class extends i4 {
  constructor() {
    super(...arguments);
    this.quote = "";
    this.value = "";
    this.submitting = false;
    this._innerTextarea = null;
    this._nativeInputListener = (e8) => {
      this.value = e8.target.value;
    };
  }
  _attachNativeListener() {
    const waTextarea = this.shadowRoot?.querySelector("wa-textarea");
    if (!waTextarea) return;
    const inner = waTextarea.shadowRoot?.querySelector("textarea");
    if (inner && inner !== this._innerTextarea) {
      if (this._innerTextarea) {
        this._innerTextarea.removeEventListener("input", this._nativeInputListener);
      }
      this._innerTextarea = inner;
      inner.addEventListener("input", this._nativeInputListener);
    }
  }
  firstUpdated() {
    requestAnimationFrame(() => {
      this._attachNativeListener();
      const inner = this._innerTextarea;
      if (inner) {
        inner.focus();
      } else {
        const waTextarea = this.shadowRoot?.querySelector("wa-textarea");
        waTextarea?.focus();
      }
    });
  }
  updated() {
    this._attachNativeListener();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._innerTextarea) {
      this._innerTextarea.removeEventListener("input", this._nativeInputListener);
      this._innerTextarea = null;
    }
  }
  handleInput(e8) {
    this.value = e8.target.value ?? "";
  }
  getTextareaValue() {
    if (this._innerTextarea) return this._innerTextarea.value;
    const waTextarea = this.shadowRoot?.querySelector("wa-textarea");
    if (waTextarea?.value !== void 0) return String(waTextarea.value);
    return this.value;
  }
  submit() {
    const body = this.getTextareaValue().trim();
    if (!body || this.submitting) return;
    this.value = body;
    this.submitting = true;
    this.dispatchEvent(new CustomEvent("inline-submit", {
      bubbles: true,
      composed: true,
      detail: { body }
    }));
  }
  cancel() {
    this.dispatchEvent(new CustomEvent("inline-cancel", {
      bubbles: true,
      composed: true
    }));
  }
  render() {
    return b2`
      <div class="editor">
        <div class="editor-body">
          <wa-textarea
            placeholder="Write your comment..."
            .value=${this.value}
            rows="3"
            resize="vertical"
            size="small"
            @wa-input=${this.handleInput}
            @input=${this.handleInput}
            @keydown=${(e8) => {
      if (e8.key === "Enter" && (e8.metaKey || e8.ctrlKey)) this.submit();
      if (e8.key === "Escape") this.cancel();
    }}
          ></wa-textarea>
        </div>
        <div class="editor-footer">
          <span class="hint">Cmd+Enter to submit</span>
          <div class="actions">
            <wa-button size="small" appearance="outlined" @click=${this.cancel}>Cancel</wa-button>
            <wa-button
              size="small"
              variant="brand"
              ?disabled=${!this.value.trim() || this.submitting}
              @click=${this.submit}
            >${this.submitting ? "Saving..." : "Submit"}</wa-button>
          </div>
        </div>
      </div>
    `;
  }
};
ThreadsInlineEditor.styles = i`
    :host {
      display: block;
      margin: 16px 0;
    }
    .editor {
      border: 1px solid var(--tc-border, hsl(0 0% 89.8%));
      border-radius: var(--tc-radius, 6px);
      overflow: hidden;
      font-size: 14px;
      background: var(--tc-card, hsl(0 0% 100%));
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    }
    .editor-body {
      padding: 12px;
    }
    .editor-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      border-top: 1px solid var(--tc-border, hsl(0 0% 89.8%));
      background: var(--wa-color-surface-raised, hsl(0 0% 96.1%));
    }
    .hint {
      font-size: 12px;
      color: var(--tc-muted-fg, hsl(0 0% 45.1%));
    }
    .actions {
      display: flex;
      gap: 6px;
    }
  `;
__decorateClass([
  n4({ type: String })
], ThreadsInlineEditor.prototype, "quote", 2);
__decorateClass([
  r5()
], ThreadsInlineEditor.prototype, "value", 2);
__decorateClass([
  r5()
], ThreadsInlineEditor.prototype, "submitting", 2);
ThreadsInlineEditor = __decorateClass([
  t3("threads-inline-editor")
], ThreadsInlineEditor);

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.VQZ46MYI.js
var locks = /* @__PURE__ */ new Set();
function getScrollbarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}
function getExistingBodyPadding() {
  const padding = Number(getComputedStyle(document.body).paddingRight.replace(/px/, ""));
  if (isNaN(padding) || !padding) {
    return 0;
  }
  return padding;
}
function lockBodyScrolling(lockingEl) {
  locks.add(lockingEl);
  if (!document.documentElement.classList.contains("wa-scroll-lock")) {
    const scrollbarWidth = getScrollbarWidth() + getExistingBodyPadding();
    let scrollbarGutterProperty = getComputedStyle(document.documentElement).scrollbarGutter;
    if (!scrollbarGutterProperty || scrollbarGutterProperty === "auto") {
      scrollbarGutterProperty = "stable";
    }
    if (scrollbarWidth < 2) {
      scrollbarGutterProperty = "";
    }
    document.documentElement.style.setProperty("--wa-scroll-lock-gutter", scrollbarGutterProperty);
    document.documentElement.classList.add("wa-scroll-lock");
    document.documentElement.style.setProperty("--wa-scroll-lock-size", `${scrollbarWidth}px`);
  }
}
function unlockBodyScrolling(lockingEl) {
  locks.delete(lockingEl);
  if (locks.size === 0) {
    document.documentElement.classList.remove("wa-scroll-lock");
    document.documentElement.style.removeProperty("--wa-scroll-lock-size");
  }
}

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.RMZ7BVDM.js
function parseSpaceDelimitedTokens(input) {
  return input.split(" ").map((token) => token.trim()).filter((token) => token !== "");
}

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.NET5V6NL.js
var dialog_styles_default = i`
  :host {
    --width: 31rem;
    --spacing: var(--wa-space-l);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: var(--width);
    max-width: calc(100% - var(--wa-space-2xl));
    max-height: calc(100% - var(--wa-space-2xl));
    color: inherit;
    background-color: var(--wa-color-surface-raised);
    border-radius: var(--wa-panel-border-radius);
    border: none;
    box-shadow: var(--wa-shadow-l);
    padding: 0;
    margin: auto;

    &.show {
      animation: show-dialog var(--show-duration) ease;

      &::backdrop {
        animation: show-backdrop var(--show-duration, 200ms) ease;
      }
    }

    &.hide {
      animation: show-dialog var(--hide-duration) ease reverse;

      &::backdrop {
        animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .dialog:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog {
      max-height: 80vh;
    }
  }

  .open {
    display: flex;
    opacity: 1;
  }

  .header {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: nowrap;

    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font-family: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:first-of-type)) {
    margin-inline-start: var(--wa-spacing-xs);
  }

  .dialog::backdrop {
    /*
      NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
      remove the fallback values here.
    */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.02;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-dialog {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .dialog {
      border: solid 1px white;
    }
  }
`;

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.52WA2DJO.js
var dismissibleStack = [];
function registerDismissible(key) {
  dismissibleStack.push(key);
}
function unregisterDismissible(key) {
  for (let i7 = dismissibleStack.length - 1; i7 >= 0; i7--) {
    if (dismissibleStack[i7] === key) {
      dismissibleStack.splice(i7, 1);
      break;
    }
  }
}
function isTopDismissible(key) {
  return dismissibleStack.length > 0 && dismissibleStack[dismissibleStack.length - 1] === key;
}

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.4ZAKP7NY.js
var WaShowEvent = class extends Event {
  constructor() {
    super("wa-show", { bubbles: true, cancelable: true, composed: true });
  }
};

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.MQODJ75V.js
var WaHideEvent = class extends Event {
  constructor(detail) {
    super("wa-hide", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
};

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.3NKIHICW.js
var WaAfterHideEvent = class extends Event {
  constructor() {
    super("wa-after-hide", { bubbles: true, cancelable: false, composed: true });
  }
};

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.PX3HMKF7.js
var WaAfterShowEvent = class extends Event {
  constructor() {
    super("wa-after-show", { bubbles: true, cancelable: false, composed: true });
  }
};

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.L6CIKOFQ.js
function animateWithClass(el, className) {
  return new Promise((resolve) => {
    const controller = new AbortController();
    const { signal } = controller;
    if (el.classList.contains(className)) {
      return;
    }
    el.classList.add(className);
    let resolved = false;
    let onEnd = () => {
      if (resolved) {
        return;
      }
      resolved = true;
      el.classList.remove(className);
      resolve();
      controller.abort();
    };
    el.addEventListener("animationend", onEnd, { once: true, signal });
    el.addEventListener("animationcancel", onEnd, { once: true, signal });
    requestAnimationFrame(() => {
      if (!resolved && el.getAnimations().length === 0) {
        onEnd();
      }
    });
  });
}

// ../../../node_modules/.pnpm/@awesome.me+webawesome@3.3.1_@floating-ui+utils@0.2.11_@types+react@19.2.14/node_modules/@awesome.me/webawesome/dist/chunks/chunk.OUY4VDF2.js
var WaDialog = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.hasSlotController = new HasSlotController(this, "footer", "header-actions", "label");
    this.open = false;
    this.label = "";
    this.withoutHeader = false;
    this.lightDismiss = false;
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.preventDefault();
        event.stopPropagation();
        this.requestClose(this.dialog);
      }
    };
  }
  firstUpdated() {
    if (this.open) {
      this.addOpenListeners();
      this.dialog.showModal();
      lockBodyScrolling(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
    this.removeOpenListeners();
  }
  async requestClose(source) {
    const waHideEvent = new WaHideEvent({ source });
    this.dispatchEvent(waHideEvent);
    if (waHideEvent.defaultPrevented) {
      this.open = true;
      animateWithClass(this.dialog, "pulse");
      return;
    }
    this.removeOpenListeners();
    await animateWithClass(this.dialog, "hide");
    this.open = false;
    this.dialog.close();
    unlockBodyScrolling(this);
    const trigger = this.originalTrigger;
    if (typeof trigger?.focus === "function") {
      setTimeout(() => trigger.focus());
    }
    this.dispatchEvent(new WaAfterHideEvent());
  }
  addOpenListeners() {
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    registerDismissible(this);
  }
  removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    unregisterDismissible(this);
  }
  handleDialogCancel(event) {
    event.preventDefault();
    if (!this.dialog.classList.contains("hide") && event.target === this.dialog && isTopDismissible(this)) {
      this.requestClose(this.dialog);
    }
  }
  handleDialogClick(event) {
    const target = event.target;
    const button = target.closest('[data-dialog="close"]');
    if (button) {
      event.stopPropagation();
      this.requestClose(button);
    }
  }
  async handleDialogPointerDown(event) {
    if (event.target === this.dialog) {
      if (this.lightDismiss) {
        this.requestClose(this.dialog);
      } else {
        await animateWithClass(this.dialog, "pulse");
      }
    }
  }
  handleOpenChange() {
    if (this.open && !this.dialog.open) {
      this.show();
    } else if (!this.open && this.dialog.open) {
      this.open = true;
      this.requestClose(this.dialog);
    }
  }
  /** Shows the dialog. */
  async show() {
    const waShowEvent = new WaShowEvent();
    this.dispatchEvent(waShowEvent);
    if (waShowEvent.defaultPrevented) {
      this.open = false;
      return;
    }
    this.addOpenListeners();
    this.originalTrigger = document.activeElement;
    this.open = true;
    this.dialog.showModal();
    lockBodyScrolling(this);
    requestAnimationFrame(() => {
      const elementToFocus = this.querySelector("[autofocus]");
      if (elementToFocus && typeof elementToFocus.focus === "function") {
        elementToFocus.focus();
      } else {
        this.dialog.focus();
      }
    });
    await animateWithClass(this.dialog, "show");
    this.dispatchEvent(new WaAfterShowEvent());
  }
  render() {
    const hasHeader = !this.withoutHeader;
    const hasFooter = this.hasSlotController.test("footer");
    return b2`
      <dialog
        part="dialog"
        class=${e7({
      dialog: true,
      open: this.open
    })}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${hasHeader ? b2`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(8203)} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${(event) => this.requestClose(event.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            ` : ""}

        <div part="body" class="body"><slot></slot></div>

        ${hasFooter ? b2`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            ` : ""}
      </dialog>
    `;
  }
};
WaDialog.css = dialog_styles_default;
__decorateClass2([
  e5(".dialog")
], WaDialog.prototype, "dialog", 2);
__decorateClass2([
  n4({ type: Boolean, reflect: true })
], WaDialog.prototype, "open", 2);
__decorateClass2([
  n4({ reflect: true })
], WaDialog.prototype, "label", 2);
__decorateClass2([
  n4({ attribute: "without-header", type: Boolean, reflect: true })
], WaDialog.prototype, "withoutHeader", 2);
__decorateClass2([
  n4({ attribute: "light-dismiss", type: Boolean })
], WaDialog.prototype, "lightDismiss", 2);
__decorateClass2([
  watch("open", { waitUntilFirstUpdate: true })
], WaDialog.prototype, "handleOpenChange", 1);
WaDialog = __decorateClass2([
  t3("wa-dialog")
], WaDialog);
if (!o5) {
  document.addEventListener("click", (event) => {
    const dialogAttrEl = event.target.closest("[data-dialog]");
    if (dialogAttrEl instanceof Element) {
      const [command, id] = parseSpaceDelimitedTokens(dialogAttrEl.getAttribute("data-dialog") || "");
      if (command === "open" && id?.length) {
        const doc = dialogAttrEl.getRootNode();
        const dialog = doc.getElementById(id);
        if (dialog?.localName === "wa-dialog") {
          dialog.open = true;
        } else {
          console.warn(`A dialog with an ID of "${id}" could not be found in this document.`);
        }
      }
    }
  });
  document.addEventListener("pointerdown", () => {
  });
}

// src/client/components/threads-app.ts
var ThreadsApp = class extends i4 {
  constructor() {
    super(...arguments);
    this.threads = [];
    this.popoverActive = false;
    this.popoverX = 0;
    this.popoverY = 0;
    this.pendingAnchor = null;
    this.pendingBlockEl = null;
    this.deleteTarget = null;
    this.inlineEditorEl = null;
    // ─── Selection popover ────────────────────────────────────────────
    this.handleMouseUp = (e8) => {
      const popover = this.querySelector("threads-popover");
      if (popover?.contains(e8.target)) return;
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        this.popoverActive = false;
        return;
      }
      if (!selection.anchorNode || !isWithinContent(selection.anchorNode)) return;
      const anchor = computeAnchor(selection);
      if (!anchor) return;
      const pos = getSelectionPosition(selection);
      if (!pos) return;
      const BLOCK_TAGS = /* @__PURE__ */ new Set(["P", "DIV", "LI", "BLOCKQUOTE", "PRE", "H1", "H2", "H3", "H4", "H5", "H6"]);
      let blockEl = null;
      let node = selection.getRangeAt(0).startContainer;
      while (node && node !== document.body) {
        if (node instanceof HTMLElement && BLOCK_TAGS.has(node.tagName)) {
          blockEl = node;
          break;
        }
        node = node.parentNode;
      }
      this.pendingAnchor = anchor;
      this.pendingBlockEl = blockEl;
      this.popoverX = pos.x;
      this.popoverY = pos.y;
      this.popoverActive = true;
    };
    this.handleOutsidePopoverClick = (e8) => {
      const popover = this.querySelector("threads-popover");
      if (popover && !e8.composedPath().includes(popover)) {
        this.popoverActive = false;
      }
    };
    // ─── Page lifecycle ───────────────────────────────────────────────
    this.handlePageMounted = (_e) => {
      this.popoverActive = false;
      this.loadThreads();
      this.injectNewThreadButton();
    };
  }
  createRenderRoot() {
    return this;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("mousedown", this.handleOutsidePopoverClick);
    document.removeEventListener("docmd:page-mounted", this.handlePageMounted);
  }
  connectedCallback() {
    super.connectedCallback();
    initThemeBridge();
    initIdentity();
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("mousedown", this.handleOutsidePopoverClick);
    document.addEventListener("docmd:page-mounted", this.handlePageMounted);
    this.loadThreads();
    this.injectNewThreadButton();
    if (typeof docmd !== "undefined" && docmd.afterReload) {
      docmd.afterReload("threads", () => {
        this.loadThreads();
        this.injectNewThreadButton();
      });
    }
  }
  /**
   * Find the content area of the page.
   */
  getContentArea() {
    return document.querySelector("[data-docmd-content]") || document.querySelector(".docmd-content") || document.querySelector("article") || document.querySelector("main");
  }
  /**
   * Find the insertion point for a new top-level thread.
   * If the first or second child of the content area is a heading, insert after it.
   * Otherwise insert at the very top.
   */
  findNewThreadInsertionPoint() {
    const contentArea = this.getContentArea();
    if (!contentArea) return null;
    const children = Array.from(contentArea.children);
    if (children.length === 0) return { mode: "prepend", el: contentArea };
    const HEADING_TAGS = /* @__PURE__ */ new Set(["H1", "H2", "H3", "H4", "H5", "H6"]);
    for (let i7 = 0; i7 < Math.min(2, children.length); i7++) {
      if (HEADING_TAGS.has(children[i7].tagName)) {
        return { mode: "after", el: children[i7] };
      }
    }
    return { mode: "prepend", el: contentArea };
  }
  /**
   * Inject a "New Thread" button at the top of the content area.
   */
  injectNewThreadButton() {
    document.querySelector(".threads-new-thread-btn")?.remove();
    const insertionPoint = this.findNewThreadInsertionPoint();
    if (!insertionPoint) return;
    const btn = document.createElement("button");
    btn.className = "threads-new-thread-btn";
    btn.innerHTML = `<wa-icon name="plus" style="font-size:14px;"></wa-icon> New Thread`;
    btn.title = "Start a new discussion thread";
    btn.addEventListener("click", (e8) => {
      e8.preventDefault();
      e8.stopPropagation();
      this.startNewThread();
    });
    if (insertionPoint.mode === "after") {
      insertionPoint.el.insertAdjacentElement("afterend", btn);
    } else {
      insertionPoint.el.insertBefore(btn, insertionPoint.el.firstChild);
    }
  }
  /**
   * Start a new top-level thread by opening an inline editor at the insertion point.
   */
  startNewThread() {
    this.removeInlineEditor();
    const insertionPoint = this.findNewThreadInsertionPoint();
    if (!insertionPoint) return;
    const editor = document.createElement("threads-inline-editor");
    editor.quote = "";
    editor.addEventListener("inline-submit", async (e8) => {
      const author = ensureAuthor();
      try {
        await createThread({
          anchor: null,
          author,
          body: e8.detail.body
        });
        this.removeInlineEditor();
        if (typeof docmd !== "undefined" && docmd.scheduleReload) {
          docmd.scheduleReload("threads");
        } else {
          await this.loadThreads();
        }
      } catch (err) {
        console.error("[threads] Failed to create thread:", err);
        editor.submitting = false;
      }
    });
    editor.addEventListener("inline-cancel", () => this.removeInlineEditor());
    if (insertionPoint.mode === "after") {
      insertionPoint.el.insertAdjacentElement("afterend", editor);
    } else {
      insertionPoint.el.insertBefore(editor, insertionPoint.el.firstChild);
    }
    this.inlineEditorEl = editor;
  }
  /**
   * Handle popover "add comment" — open inline editor after the block.
   */
  handleAddComment() {
    if (!this.pendingAnchor || !this.pendingBlockEl) return;
    this.removeInlineEditor();
    this.popoverActive = false;
    const anchor = this.pendingAnchor;
    const blockEl = this.pendingBlockEl;
    this.pendingAnchor = null;
    this.pendingBlockEl = null;
    window.getSelection()?.removeAllRanges();
    const editor = document.createElement("threads-inline-editor");
    editor.quote = anchor.quote || "";
    editor.addEventListener("inline-submit", async (e8) => {
      const author = ensureAuthor();
      try {
        await createThread({
          anchor,
          author,
          body: e8.detail.body
        });
        this.removeInlineEditor();
        if (typeof docmd !== "undefined" && docmd.scheduleReload) {
          docmd.scheduleReload("threads");
        } else {
          await this.loadThreads();
        }
      } catch (err) {
        console.error("[threads] Failed to create thread:", err);
        editor.submitting = false;
      }
    });
    editor.addEventListener("inline-cancel", () => this.removeInlineEditor());
    blockEl.insertAdjacentElement("afterend", editor);
    this.inlineEditorEl = editor;
  }
  async loadThreads() {
    try {
      this.threads = await fetchThreads();
    } catch (err) {
      console.error("[threads] Failed to load threads:", err);
      this.threads = [];
    }
    this.scanRenderedHighlights();
  }
  /**
   * Scan the DOM for <mark class="threads-highlight" data-thread-id="..."> elements.
   * Assigns cycling highlight colors, moves thread cards inline after the block
   * containing the highlight, and attaches click handlers.
   */
  scanRenderedHighlights() {
    const marks = document.querySelectorAll("mark.threads-highlight[data-thread-id]");
    const BLOCK_TAGS = /* @__PURE__ */ new Set(["P", "DIV", "LI", "BLOCKQUOTE", "PRE", "H1", "H2", "H3", "H4", "H5", "H6", "UL", "OL", "TABLE"]);
    let colorIndex = 0;
    for (const mark of marks) {
      const threadId = mark.dataset.threadId;
      if (!threadId) continue;
      const colorClass = ThreadsApp.HIGHLIGHT_COLORS[colorIndex % ThreadsApp.HIGHLIGHT_COLORS.length];
      mark.classList.add(colorClass);
      colorIndex++;
      const threadEl = document.querySelector(`.threads-thread[data-thread-id="${threadId}"]`);
      if (threadEl) {
        threadEl.classList.add(colorClass.replace("threads-hl-", "threads-border-"));
        let blockEl = mark;
        while (blockEl && blockEl !== document.body) {
          if (blockEl instanceof HTMLElement && BLOCK_TAGS.has(blockEl.tagName)) {
            break;
          }
          blockEl = blockEl.parentElement;
        }
        if (blockEl && blockEl !== document.body) {
          blockEl.insertAdjacentElement("afterend", threadEl);
        }
      }
      mark.style.cursor = "pointer";
      mark.addEventListener("click", () => {
        const el = document.querySelector(`.threads-thread[data-thread-id="${threadId}"]`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("threads-thread--flash");
          setTimeout(() => el.classList.remove("threads-thread--flash"), 2e3);
        }
      });
    }
    this.injectReplyButtons();
    const sidebar = document.querySelector(".threads-sidebar");
    if (sidebar instanceof HTMLElement) {
      sidebar.style.display = "none";
    }
  }
  /**
   * Add a "Reply" button to the bottom of each .threads-thread card.
   */
  injectReplyButtons() {
    const threads = document.querySelectorAll(".threads-thread[data-thread-id]");
    for (const threadEl of threads) {
      if (threadEl.querySelector(".threads-reply-btn")) continue;
      const threadId = threadEl.dataset.threadId;
      if (!threadId) continue;
      const footer = document.createElement("div");
      footer.className = "threads-thread__footer";
      const btn = document.createElement("button");
      btn.className = "threads-reply-btn";
      btn.innerHTML = `<wa-icon name="reply" style="font-size:13px;"></wa-icon> Reply`;
      btn.addEventListener("click", (e8) => {
        e8.stopPropagation();
        this.openReplyEditor(threadEl, threadId);
      });
      footer.appendChild(btn);
      threadEl.appendChild(footer);
    }
  }
  /**
   * Open an inline editor at the bottom of a thread card for replying.
   */
  openReplyEditor(threadEl, threadId) {
    this.removeInlineEditor();
    const editor = document.createElement("threads-inline-editor");
    editor.quote = "";
    editor.addEventListener("inline-submit", async (e8) => {
      const author = ensureAuthor();
      try {
        await addComment(threadId, {
          author,
          body: e8.detail.body
        });
        this.removeInlineEditor();
        if (typeof docmd !== "undefined" && docmd.scheduleReload) {
          docmd.scheduleReload("threads");
        } else {
          await this.loadThreads();
        }
      } catch (err) {
        console.error("[threads] Failed to add reply:", err);
        editor.submitting = false;
      }
    });
    editor.addEventListener("inline-cancel", () => this.removeInlineEditor());
    const footer = threadEl.querySelector(".threads-thread__footer");
    if (footer) {
      threadEl.insertBefore(editor, footer);
    } else {
      threadEl.appendChild(editor);
    }
    this.inlineEditorEl = editor;
  }
  // ─── Inline editor helpers ────────────────────────────────────────
  removeInlineEditor() {
    this.inlineEditorEl?.remove();
    this.inlineEditorEl = null;
  }
  // ─── Delete confirmation ──────────────────────────────────────────
  handleDeleteRequest(e8, type) {
    const id = type === "thread" ? e8.detail.threadId : e8.detail.commentId;
    const threadId = type === "comment" ? e8.detail.threadId : void 0;
    this.deleteTarget = { type, id, threadId };
    const dialog = this.querySelector("#delete-dialog");
    if (dialog) dialog.open = true;
  }
  async confirmDelete() {
    const dialog = this.querySelector("#delete-dialog");
    if (dialog) dialog.open = false;
    if (!this.deleteTarget) return;
    if (this.deleteTarget.type === "thread") {
      await deleteThread(this.deleteTarget.id);
    } else {
      await deleteComment(this.deleteTarget.threadId, this.deleteTarget.id);
    }
    this.deleteTarget = null;
    if (typeof docmd !== "undefined" && docmd.scheduleReload) {
      docmd.scheduleReload("threads");
    } else {
      await this.loadThreads();
    }
  }
  cancelDelete() {
    const dialog = this.querySelector("#delete-dialog");
    if (dialog) dialog.open = false;
    this.deleteTarget = null;
  }
  render() {
    return b2`
      <threads-popover
        ?active=${this.popoverActive}
        .x=${this.popoverX}
        .y=${this.popoverY}
        @add-comment=${this.handleAddComment}
      ></threads-popover>

      <wa-dialog id="delete-dialog" label="Confirm Delete" light-dismiss>
        Are you sure you want to delete this ${this.deleteTarget?.type ?? "item"}?
        <wa-button slot="footer" appearance="outlined" @click=${this.cancelDelete}>Cancel</wa-button>
        <wa-button slot="footer" variant="danger" @click=${this.confirmDelete}>Delete</wa-button>
      </wa-dialog>
    `;
  }
};
// Color palette for highlights — cycles through these
ThreadsApp.HIGHLIGHT_COLORS = [
  "threads-hl-yellow",
  "threads-hl-blue",
  "threads-hl-green",
  "threads-hl-pink",
  "threads-hl-purple",
  "threads-hl-orange"
];
__decorateClass([
  r5()
], ThreadsApp.prototype, "threads", 2);
__decorateClass([
  r5()
], ThreadsApp.prototype, "popoverActive", 2);
__decorateClass([
  r5()
], ThreadsApp.prototype, "popoverX", 2);
__decorateClass([
  r5()
], ThreadsApp.prototype, "popoverY", 2);
ThreadsApp = __decorateClass([
  t3("threads-app")
], ThreadsApp);

// src/client/index.ts
function init() {
  if (document.querySelector("threads-app")) return;
  const app = document.createElement("threads-app");
  document.body.appendChild(app);
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@awesome.me/webawesome/dist/chunks/chunk.R7QX4M6R.js:
@awesome.me/webawesome/dist/chunks/chunk.VC3BPUZJ.js:
@awesome.me/webawesome/dist/chunks/chunk.7VGCIHDG.js:
@awesome.me/webawesome/dist/chunks/chunk.EPHHWXK2.js:
@awesome.me/webawesome/dist/chunks/chunk.IPWPRIHZ.js:
@awesome.me/webawesome/dist/chunks/chunk.KIHB3VMB.js:
@awesome.me/webawesome/dist/chunks/chunk.6J6QYFHV.js:
@awesome.me/webawesome/dist/chunks/chunk.4FOHUBBS.js:
@awesome.me/webawesome/dist/chunks/chunk.PZAN6FPN.js:
@awesome.me/webawesome/dist/chunks/chunk.72WJND5X.js:
@awesome.me/webawesome/dist/chunks/chunk.OKXBNRE6.js:
@awesome.me/webawesome/dist/chunks/chunk.XNTP7DEQ.js:
@awesome.me/webawesome/dist/chunks/chunk.B33LOABL.js:
@awesome.me/webawesome/dist/chunks/chunk.AGDGRG4E.js:
@awesome.me/webawesome/dist/chunks/chunk.VTAV2SG4.js:
@awesome.me/webawesome/dist/chunks/chunk.YDQCS2HK.js:
@awesome.me/webawesome/dist/chunks/chunk.WDIIGUNP.js:
@awesome.me/webawesome/dist/chunks/chunk.D5I2DWML.js:
@awesome.me/webawesome/dist/chunks/chunk.K6QMUIHP.js:
@awesome.me/webawesome/dist/chunks/chunk.JVTAGR5B.js:
@awesome.me/webawesome/dist/chunks/chunk.KPN3YZ6U.js:
@awesome.me/webawesome/dist/chunks/chunk.FSRXYGSW.js:
@awesome.me/webawesome/dist/chunks/chunk.JKBNW2TG.js:
@awesome.me/webawesome/dist/components/button/button.js:
@awesome.me/webawesome/dist/components/icon/icon.js:
@awesome.me/webawesome/dist/chunks/chunk.GWWGP7ZL.js:
@awesome.me/webawesome/dist/chunks/chunk.5LXXXELE.js:
@awesome.me/webawesome/dist/chunks/chunk.6TNOCAA5.js:
@awesome.me/webawesome/dist/components/textarea/textarea.js:
@awesome.me/webawesome/dist/chunks/chunk.VQZ46MYI.js:
@awesome.me/webawesome/dist/chunks/chunk.RMZ7BVDM.js:
@awesome.me/webawesome/dist/chunks/chunk.NET5V6NL.js:
@awesome.me/webawesome/dist/chunks/chunk.52WA2DJO.js:
@awesome.me/webawesome/dist/chunks/chunk.4ZAKP7NY.js:
@awesome.me/webawesome/dist/chunks/chunk.MQODJ75V.js:
@awesome.me/webawesome/dist/chunks/chunk.3NKIHICW.js:
@awesome.me/webawesome/dist/chunks/chunk.PX3HMKF7.js:
@awesome.me/webawesome/dist/chunks/chunk.L6CIKOFQ.js:
@awesome.me/webawesome/dist/chunks/chunk.OUY4VDF2.js:
@awesome.me/webawesome/dist/components/dialog/dialog.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

lit-html/directives/class-map.js:
lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
lit-html/directive-helpers.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BsaXQrcmVhY3RpdmUtZWxlbWVudEAyLjEuMi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3NyYy9jc3MtdGFnLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AbGl0K3JlYWN0aXZlLWVsZW1lbnRAMi4xLjIvbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9zcmMvcmVhY3RpdmUtZWxlbWVudC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbGl0LWh0bWxAMy4zLjIvbm9kZV9tb2R1bGVzL2xpdC1odG1sL3NyYy9saXQtaHRtbC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbGl0LWVsZW1lbnRANC4yLjIvbm9kZV9tb2R1bGVzL2xpdC1lbGVtZW50L3NyYy9saXQtZWxlbWVudC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbGl0LWh0bWxAMy4zLjIvbm9kZV9tb2R1bGVzL2xpdC1odG1sL3NyYy9pcy1zZXJ2ZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BsaXQrcmVhY3RpdmUtZWxlbWVudEAyLjEuMi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3NyYy9kZWNvcmF0b3JzL2N1c3RvbS1lbGVtZW50LnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AbGl0K3JlYWN0aXZlLWVsZW1lbnRAMi4xLjIvbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9zcmMvZGVjb3JhdG9ycy9wcm9wZXJ0eS50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGxpdCtyZWFjdGl2ZS1lbGVtZW50QDIuMS4yL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvc3JjL2RlY29yYXRvcnMvc3RhdGUudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BsaXQrcmVhY3RpdmUtZWxlbWVudEAyLjEuMi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3NyYy9kZWNvcmF0b3JzL2Jhc2UudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BsaXQrcmVhY3RpdmUtZWxlbWVudEAyLjEuMi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3NyYy9kZWNvcmF0b3JzL3F1ZXJ5LnRzIiwgIi4uLy4uL3NyYy9jbGllbnQvbGliL2FwaS50cyIsICIuLi8uLi9zcmMvY2xpZW50L2xpYi9pZGVudGl0eS50cyIsICIuLi8uLi9zcmMvY2xpZW50L2xpYi9zZWxlY3Rpb24udHMiLCAiLi4vLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL3N0eWxlcy50cyIsICIuLi8uLi9zcmMvY2xpZW50L2xpYi90aGVtZS50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLlI3UVg0TTZSLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuVkMzQlBVWkouanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay43VkdDSUhERy5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLkVQSEhXWEsyLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuSVBXUFJJSFouanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5LSUhCM1ZNQi5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLjZKNlFZRkhWLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuNEZPSFVCQlMuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5QWkFONkZQTi5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQHNob2VsYWNlLXN0eWxlK2xvY2FsaXplQDMuMi4xL25vZGVfbW9kdWxlcy9Ac2hvZWxhY2Utc3R5bGUvbG9jYWxpemUvZGlzdC9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLjcyV0pORDVYLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuT0tYQk5SRTYuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5YTlRQN0RFUS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbGl0LWh0bWxAMy4zLjIvbm9kZV9tb2R1bGVzL2xpdC1odG1sL3NyYy9kaXJlY3RpdmUudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xpdC1odG1sQDMuMy4yL25vZGVfbW9kdWxlcy9saXQtaHRtbC9zcmMvZGlyZWN0aXZlcy9jbGFzcy1tYXAudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xpdC1odG1sQDMuMy4yL25vZGVfbW9kdWxlcy9saXQtaHRtbC9zcmMvZGlyZWN0aXZlcy9pZi1kZWZpbmVkLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9saXQtaHRtbEAzLjMuMi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvc3JjL3N0YXRpYy50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLkIzM0xPQUJMLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuQUdER1JHNEUuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5WVEFWMlNHNC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLllEUUNTMkhLLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuV0RJSUdVTlAuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5ENUkyRFdNTC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLks2UU1VSUhQLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuSlZUQUdSNUIuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5LUE4zWVo2VS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLkZTUlhZR1NXLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9saXQtaHRtbEAzLjMuMi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvc3JjL2RpcmVjdGl2ZS1oZWxwZXJzLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuSktCTlcyVEcuanMiLCAiLi4vLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL3RocmVhZHMtcG9wb3Zlci50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLkdXV0dQN1pMLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuNUxYWFhFTEUuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xpdC1odG1sQDMuMy4yL25vZGVfbW9kdWxlcy9saXQtaHRtbC9zcmMvZGlyZWN0aXZlcy9saXZlLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuNlROT0NBQTUuanMiLCAiLi4vLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL3RocmVhZHMtaW5saW5lLWVkaXRvci50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLlZRWjQ2TVlJLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuUk1aN0JWRE0uanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5ORVQ1VjZOTC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLjUyV0EyREpPLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuNFpBS1A3TlkuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5NUU9ESjc1Vi5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLjNOS0lISUNXLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuUFgzSE1LRjcuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5MNkNJS09GUS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLk9VWTRWREYyLmpzIiwgIi4uLy4uL3NyYy9jbGllbnQvY29tcG9uZW50cy90aHJlYWRzLWFwcC50cyIsICIuLi8uLi9zcmMvY2xpZW50L2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuY29uc3QgTk9ERV9NT0RFID0gZmFsc2U7XG5cbi8vIEFsbG93cyBtaW5pZmllcnMgdG8gcmVuYW1lIHJlZmVyZW5jZXMgdG8gZ2xvYmFsVGhpc1xuY29uc3QgZ2xvYmFsID0gZ2xvYmFsVGhpcztcblxuLyoqXG4gKiBXaGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgYGFkb3B0ZWRTdHlsZVNoZWV0c2AuXG4gKi9cbmV4cG9ydCBjb25zdCBzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHM6IGJvb2xlYW4gPVxuICBnbG9iYWwuU2hhZG93Um9vdCAmJlxuICAoZ2xvYmFsLlNoYWR5Q1NTID09PSB1bmRlZmluZWQgfHwgZ2xvYmFsLlNoYWR5Q1NTLm5hdGl2ZVNoYWRvdykgJiZcbiAgJ2Fkb3B0ZWRTdHlsZVNoZWV0cycgaW4gRG9jdW1lbnQucHJvdG90eXBlICYmXG4gICdyZXBsYWNlJyBpbiBDU1NTdHlsZVNoZWV0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBBIENTU1Jlc3VsdCBvciBuYXRpdmUgQ1NTU3R5bGVTaGVldC5cbiAqXG4gKiBJbiBicm93c2VycyB0aGF0IHN1cHBvcnQgY29uc3RydWN0aWJsZSBDU1Mgc3R5bGUgc2hlZXRzLCBDU1NTdHlsZVNoZWV0XG4gKiBvYmplY3QgY2FuIGJlIHVzZWQgZm9yIHN0eWxpbmcgYWxvbmcgc2lkZSBDU1NSZXN1bHQgZnJvbSB0aGUgYGNzc2BcbiAqIHRlbXBsYXRlIHRhZy5cbiAqL1xuZXhwb3J0IHR5cGUgQ1NTUmVzdWx0T3JOYXRpdmUgPSBDU1NSZXN1bHQgfCBDU1NTdHlsZVNoZWV0O1xuXG5leHBvcnQgdHlwZSBDU1NSZXN1bHRBcnJheSA9IEFycmF5PENTU1Jlc3VsdE9yTmF0aXZlIHwgQ1NTUmVzdWx0QXJyYXk+O1xuXG4vKipcbiAqIEEgc2luZ2xlIENTU1Jlc3VsdCwgQ1NTU3R5bGVTaGVldCwgb3IgYW4gYXJyYXkgb3IgbmVzdGVkIGFycmF5cyBvZiB0aG9zZS5cbiAqL1xuZXhwb3J0IHR5cGUgQ1NTUmVzdWx0R3JvdXAgPSBDU1NSZXN1bHRPck5hdGl2ZSB8IENTU1Jlc3VsdEFycmF5O1xuXG5jb25zdCBjb25zdHJ1Y3Rpb25Ub2tlbiA9IFN5bWJvbCgpO1xuXG5jb25zdCBjc3NUYWdDYWNoZSA9IG5ldyBXZWFrTWFwPFRlbXBsYXRlU3RyaW5nc0FycmF5LCBDU1NTdHlsZVNoZWV0PigpO1xuXG4vKipcbiAqIEEgY29udGFpbmVyIGZvciBhIHN0cmluZyBvZiBDU1MgdGV4dCwgdGhhdCBtYXkgYmUgdXNlZCB0byBjcmVhdGUgYSBDU1NTdHlsZVNoZWV0LlxuICpcbiAqIENTU1Jlc3VsdCBpcyB0aGUgcmV0dXJuIHZhbHVlIG9mIGBjc3NgLXRhZ2dlZCB0ZW1wbGF0ZSBsaXRlcmFscyBhbmRcbiAqIGB1bnNhZmVDU1MoKWAuIEluIG9yZGVyIHRvIGVuc3VyZSB0aGF0IENTU1Jlc3VsdHMgYXJlIG9ubHkgY3JlYXRlZCB2aWEgdGhlXG4gKiBgY3NzYCB0YWcgYW5kIGB1bnNhZmVDU1MoKWAsIENTU1Jlc3VsdCBjYW5ub3QgYmUgY29uc3RydWN0ZWQgZGlyZWN0bHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBDU1NSZXN1bHQge1xuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICBbJ18kY3NzUmVzdWx0JCddID0gdHJ1ZTtcbiAgcmVhZG9ubHkgY3NzVGV4dDogc3RyaW5nO1xuICBwcml2YXRlIF9zdHlsZVNoZWV0PzogQ1NTU3R5bGVTaGVldDtcbiAgcHJpdmF0ZSBfc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXkgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihcbiAgICBjc3NUZXh0OiBzdHJpbmcsXG4gICAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXkgfCB1bmRlZmluZWQsXG4gICAgc2FmZVRva2VuOiBzeW1ib2xcbiAgKSB7XG4gICAgaWYgKHNhZmVUb2tlbiAhPT0gY29uc3RydWN0aW9uVG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0NTU1Jlc3VsdCBpcyBub3QgY29uc3RydWN0YWJsZS4gVXNlIGB1bnNhZmVDU1NgIG9yIGBjc3NgIGluc3RlYWQuJ1xuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5jc3NUZXh0ID0gY3NzVGV4dDtcbiAgICB0aGlzLl9zdHJpbmdzID0gc3RyaW5ncztcbiAgfVxuXG4gIC8vIFRoaXMgaXMgYSBnZXR0ZXIgc28gdGhhdCBpdCdzIGxhenkuIEluIHByYWN0aWNlLCB0aGlzIG1lYW5zIHN0eWxlc2hlZXRzXG4gIC8vIGFyZSBub3QgY3JlYXRlZCB1bnRpbCB0aGUgZmlyc3QgZWxlbWVudCBpbnN0YW5jZSBpcyBtYWRlLlxuICBnZXQgc3R5bGVTaGVldCgpOiBDU1NTdHlsZVNoZWV0IHwgdW5kZWZpbmVkIHtcbiAgICAvLyBJZiBgc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzYCBpcyB0cnVlIHRoZW4gd2UgYXNzdW1lIENTU1N0eWxlU2hlZXQgaXNcbiAgICAvLyBjb25zdHJ1Y3RhYmxlLlxuICAgIGxldCBzdHlsZVNoZWV0ID0gdGhpcy5fc3R5bGVTaGVldDtcbiAgICBjb25zdCBzdHJpbmdzID0gdGhpcy5fc3RyaW5ncztcbiAgICBpZiAoc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzICYmIHN0eWxlU2hlZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgY2FjaGVhYmxlID0gc3RyaW5ncyAhPT0gdW5kZWZpbmVkICYmIHN0cmluZ3MubGVuZ3RoID09PSAxO1xuICAgICAgaWYgKGNhY2hlYWJsZSkge1xuICAgICAgICBzdHlsZVNoZWV0ID0gY3NzVGFnQ2FjaGUuZ2V0KHN0cmluZ3MpO1xuICAgICAgfVxuICAgICAgaWYgKHN0eWxlU2hlZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAodGhpcy5fc3R5bGVTaGVldCA9IHN0eWxlU2hlZXQgPSBuZXcgQ1NTU3R5bGVTaGVldCgpKS5yZXBsYWNlU3luYyhcbiAgICAgICAgICB0aGlzLmNzc1RleHRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGNhY2hlYWJsZSkge1xuICAgICAgICAgIGNzc1RhZ0NhY2hlLnNldChzdHJpbmdzLCBzdHlsZVNoZWV0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVTaGVldDtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3NzVGV4dDtcbiAgfVxufVxuXG50eXBlIENvbnN0cnVjdGFibGVDU1NSZXN1bHQgPSBDU1NSZXN1bHQgJiB7XG4gIG5ldyAoXG4gICAgY3NzVGV4dDogc3RyaW5nLFxuICAgIHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5IHwgdW5kZWZpbmVkLFxuICAgIHNhZmVUb2tlbjogc3ltYm9sXG4gICk6IENTU1Jlc3VsdDtcbn07XG5cbmNvbnN0IHRleHRGcm9tQ1NTUmVzdWx0ID0gKHZhbHVlOiBDU1NSZXN1bHRHcm91cCB8IG51bWJlcikgPT4ge1xuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICBpZiAoKHZhbHVlIGFzIENTU1Jlc3VsdClbJ18kY3NzUmVzdWx0JCddID09PSB0cnVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSBhcyBDU1NSZXN1bHQpLmNzc1RleHQ7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgVmFsdWUgcGFzc2VkIHRvICdjc3MnIGZ1bmN0aW9uIG11c3QgYmUgYSAnY3NzJyBmdW5jdGlvbiByZXN1bHQ6IGAgK1xuICAgICAgICBgJHt2YWx1ZX0uIFVzZSAndW5zYWZlQ1NTJyB0byBwYXNzIG5vbi1saXRlcmFsIHZhbHVlcywgYnV0IHRha2UgY2FyZSBgICtcbiAgICAgICAgYHRvIGVuc3VyZSBwYWdlIHNlY3VyaXR5LmBcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIFdyYXAgYSB2YWx1ZSBmb3IgaW50ZXJwb2xhdGlvbiBpbiBhIHtAbGlua2NvZGUgY3NzfSB0YWdnZWQgdGVtcGxhdGUgbGl0ZXJhbC5cbiAqXG4gKiBUaGlzIGlzIHVuc2FmZSBiZWNhdXNlIHVudHJ1c3RlZCBDU1MgdGV4dCBjYW4gYmUgdXNlZCB0byBwaG9uZSBob21lXG4gKiBvciBleGZpbHRyYXRlIGRhdGEgdG8gYW4gYXR0YWNrZXIgY29udHJvbGxlZCBzaXRlLiBUYWtlIGNhcmUgdG8gb25seSB1c2VcbiAqIHRoaXMgd2l0aCB0cnVzdGVkIGlucHV0LlxuICovXG5leHBvcnQgY29uc3QgdW5zYWZlQ1NTID0gKHZhbHVlOiB1bmtub3duKSA9PlxuICBuZXcgKENTU1Jlc3VsdCBhcyBDb25zdHJ1Y3RhYmxlQ1NTUmVzdWx0KShcbiAgICB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiBTdHJpbmcodmFsdWUpLFxuICAgIHVuZGVmaW5lZCxcbiAgICBjb25zdHJ1Y3Rpb25Ub2tlblxuICApO1xuXG4vKipcbiAqIEEgdGVtcGxhdGUgbGl0ZXJhbCB0YWcgd2hpY2ggY2FuIGJlIHVzZWQgd2l0aCBMaXRFbGVtZW50J3NcbiAqIHtAbGlua2NvZGUgTGl0RWxlbWVudC5zdHlsZXN9IHByb3BlcnR5IHRvIHNldCBlbGVtZW50IHN0eWxlcy5cbiAqXG4gKiBGb3Igc2VjdXJpdHkgcmVhc29ucywgb25seSBsaXRlcmFsIHN0cmluZyB2YWx1ZXMgYW5kIG51bWJlciBtYXkgYmUgdXNlZCBpblxuICogZW1iZWRkZWQgZXhwcmVzc2lvbnMuIFRvIGluY29ycG9yYXRlIG5vbi1saXRlcmFsIHZhbHVlcyB7QGxpbmtjb2RlIHVuc2FmZUNTU31cbiAqIG1heSBiZSB1c2VkIGluc2lkZSBhbiBleHByZXNzaW9uLlxuICovXG5leHBvcnQgY29uc3QgY3NzID0gKFxuICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgLi4udmFsdWVzOiAoQ1NTUmVzdWx0R3JvdXAgfCBudW1iZXIpW11cbik6IENTU1Jlc3VsdCA9PiB7XG4gIGNvbnN0IGNzc1RleHQgPVxuICAgIHN0cmluZ3MubGVuZ3RoID09PSAxXG4gICAgICA/IHN0cmluZ3NbMF1cbiAgICAgIDogdmFsdWVzLnJlZHVjZShcbiAgICAgICAgICAoYWNjLCB2LCBpZHgpID0+IGFjYyArIHRleHRGcm9tQ1NTUmVzdWx0KHYpICsgc3RyaW5nc1tpZHggKyAxXSxcbiAgICAgICAgICBzdHJpbmdzWzBdXG4gICAgICAgICk7XG4gIHJldHVybiBuZXcgKENTU1Jlc3VsdCBhcyBDb25zdHJ1Y3RhYmxlQ1NTUmVzdWx0KShcbiAgICBjc3NUZXh0LFxuICAgIHN0cmluZ3MsXG4gICAgY29uc3RydWN0aW9uVG9rZW5cbiAgKTtcbn07XG5cbi8qKlxuICogQXBwbGllcyB0aGUgZ2l2ZW4gc3R5bGVzIHRvIGEgYHNoYWRvd1Jvb3RgLiBXaGVuIFNoYWRvdyBET00gaXNcbiAqIGF2YWlsYWJsZSBidXQgYGFkb3B0ZWRTdHlsZVNoZWV0c2AgaXMgbm90LCBzdHlsZXMgYXJlIGFwcGVuZGVkIHRvIHRoZVxuICogYHNoYWRvd1Jvb3RgIHRvIFttaW1pYyB0aGUgbmF0aXZlIGZlYXR1cmVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9TaGFkb3dSb290L2Fkb3B0ZWRTdHlsZVNoZWV0cykuXG4gKiBOb3RlLCB3aGVuIHNoaW1taW5nIGlzIHVzZWQsIGFueSBzdHlsZXMgdGhhdCBhcmUgc3Vic2VxdWVudGx5IHBsYWNlZCBpbnRvXG4gKiB0aGUgc2hhZG93Um9vdCBzaG91bGQgYmUgcGxhY2VkICpiZWZvcmUqIGFueSBzaGltbWVkIGFkb3B0ZWQgc3R5bGVzLiBUaGlzXG4gKiB3aWxsIG1hdGNoIHNwZWMgYmVoYXZpb3IgdGhhdCBnaXZlcyBhZG9wdGVkIHNoZWV0cyBwcmVjZWRlbmNlIG92ZXIgc3R5bGVzIGluXG4gKiBzaGFkb3dSb290LlxuICovXG5leHBvcnQgY29uc3QgYWRvcHRTdHlsZXMgPSAoXG4gIHJlbmRlclJvb3Q6IFNoYWRvd1Jvb3QsXG4gIHN0eWxlczogQXJyYXk8Q1NTUmVzdWx0T3JOYXRpdmU+XG4pID0+IHtcbiAgaWYgKHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cykge1xuICAgIChyZW5kZXJSb290IGFzIFNoYWRvd1Jvb3QpLmFkb3B0ZWRTdHlsZVNoZWV0cyA9IHN0eWxlcy5tYXAoKHMpID0+XG4gICAgICBzIGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldCA/IHMgOiBzLnN0eWxlU2hlZXQhXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGNvbnN0IHMgb2Ygc3R5bGVzKSB7XG4gICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgY29uc3Qgbm9uY2UgPSAoZ2xvYmFsIGFzIGFueSlbJ2xpdE5vbmNlJ107XG4gICAgICBpZiAobm9uY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgbm9uY2UpO1xuICAgICAgfVxuICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSAocyBhcyBDU1NSZXN1bHQpLmNzc1RleHQ7XG4gICAgICByZW5kZXJSb290LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGNzc1Jlc3VsdEZyb21TdHlsZVNoZWV0ID0gKHNoZWV0OiBDU1NTdHlsZVNoZWV0KSA9PiB7XG4gIGxldCBjc3NUZXh0ID0gJyc7XG4gIGZvciAoY29uc3QgcnVsZSBvZiBzaGVldC5jc3NSdWxlcykge1xuICAgIGNzc1RleHQgKz0gcnVsZS5jc3NUZXh0O1xuICB9XG4gIHJldHVybiB1bnNhZmVDU1MoY3NzVGV4dCk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29tcGF0aWJsZVN0eWxlID1cbiAgc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzIHx8XG4gIChOT0RFX01PREUgJiYgZ2xvYmFsLkNTU1N0eWxlU2hlZXQgPT09IHVuZGVmaW5lZClcbiAgICA/IChzOiBDU1NSZXN1bHRPck5hdGl2ZSkgPT4gc1xuICAgIDogKHM6IENTU1Jlc3VsdE9yTmF0aXZlKSA9PlxuICAgICAgICBzIGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldCA/IGNzc1Jlc3VsdEZyb21TdHlsZVNoZWV0KHMpIDogcztcbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuLyoqXG4gKiBVc2UgdGhpcyBtb2R1bGUgaWYgeW91IHdhbnQgdG8gY3JlYXRlIHlvdXIgb3duIGJhc2UgY2xhc3MgZXh0ZW5kaW5nXG4gKiB7QGxpbmsgUmVhY3RpdmVFbGVtZW50fS5cbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICovXG5cbmltcG9ydCB7XG4gIGdldENvbXBhdGlibGVTdHlsZSxcbiAgYWRvcHRTdHlsZXMsXG4gIENTU1Jlc3VsdEdyb3VwLFxuICBDU1NSZXN1bHRPck5hdGl2ZSxcbn0gZnJvbSAnLi9jc3MtdGFnLmpzJztcbmltcG9ydCB0eXBlIHtcbiAgUmVhY3RpdmVDb250cm9sbGVyLFxuICBSZWFjdGl2ZUNvbnRyb2xsZXJIb3N0LFxufSBmcm9tICcuL3JlYWN0aXZlLWNvbnRyb2xsZXIuanMnO1xuXG4vLyBJbiB0aGUgTm9kZSBidWlsZCwgdGhpcyBpbXBvcnQgd2lsbCBiZSBpbmplY3RlZCBieSBSb2xsdXA6XG4vLyBpbXBvcnQge0hUTUxFbGVtZW50LCBjdXN0b21FbGVtZW50c30gZnJvbSAnQGxpdC1sYWJzL3Nzci1kb20tc2hpbSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vY3NzLXRhZy5qcyc7XG5leHBvcnQgdHlwZSB7XG4gIFJlYWN0aXZlQ29udHJvbGxlcixcbiAgUmVhY3RpdmVDb250cm9sbGVySG9zdCxcbn0gZnJvbSAnLi9yZWFjdGl2ZS1jb250cm9sbGVyLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBgcmVhZG9ubHlgIG1vZGlmaWVyIGZyb20gcHJvcGVydGllcyBpbiB0aGUgdW5pb24gSy5cbiAqXG4gKiBUaGlzIGlzIGEgc2FmZXIgd2F5IHRvIGNhc3QgYSB2YWx1ZSB0byBhIHR5cGUgd2l0aCBhIG11dGFibGUgdmVyc2lvbiBvZiBhXG4gKiByZWFkb25seSBmaWVsZCwgdGhhbiBjYXN0aW5nIHRvIGFuIGludGVyZmFjZSB3aXRoIHRoZSBmaWVsZCByZS1kZWNsYXJlZFxuICogYmVjYXVzZSBpdCBwcmVzZXJ2ZXMgdGhlIHR5cGUgb2YgYWxsIHRoZSBmaWVsZHMgYW5kIHdhcm5zIG9uIHR5cG9zLlxuICovXG50eXBlIE11dGFibGU8VCwgSyBleHRlbmRzIGtleW9mIFQ+ID0gT21pdDxULCBLPiAmIHtcbiAgLXJlYWRvbmx5IFtQIGluIGtleW9mIFBpY2s8VCwgSz5dOiBQIGV4dGVuZHMgSyA/IFRbUF0gOiBuZXZlcjtcbn07XG5cbi8vIFRPRE8gKGp1c3RpbmZhZ25hbmkpOiBBZGQgYGhhc093bmAgaGVyZSB3aGVuIHdlIHNoaXAgRVMyMDIyXG5jb25zdCB7XG4gIGlzLFxuICBkZWZpbmVQcm9wZXJ0eSxcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGdldFByb3RvdHlwZU9mLFxufSA9IE9iamVjdDtcblxuY29uc3QgTk9ERV9NT0RFID0gZmFsc2U7XG5cbi8vIExldHMgYSBtaW5pZmllciByZXBsYWNlIGdsb2JhbFRoaXMgcmVmZXJlbmNlcyB3aXRoIGEgbWluaWZpZWQgbmFtZVxuY29uc3QgZ2xvYmFsID0gZ2xvYmFsVGhpcztcblxuaWYgKE5PREVfTU9ERSkge1xuICBnbG9iYWwuY3VzdG9tRWxlbWVudHMgPz89IGN1c3RvbUVsZW1lbnRzO1xufVxuXG5jb25zdCBERVZfTU9ERSA9IHRydWU7XG5cbmxldCBpc3N1ZVdhcm5pbmc6IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4gdm9pZDtcblxuY29uc3QgdHJ1c3RlZFR5cGVzID0gKGdsb2JhbCBhcyB1bmtub3duIGFzIHt0cnVzdGVkVHlwZXM/OiB7ZW1wdHlTY3JpcHQ6ICcnfX0pXG4gIC50cnVzdGVkVHlwZXM7XG5cbi8vIFRlbXBvcmFyeSB3b3JrYXJvdW5kIGZvciBodHRwczovL2NyYnVnLmNvbS85OTMyNjhcbi8vIEN1cnJlbnRseSwgYW55IGF0dHJpYnV0ZSBzdGFydGluZyB3aXRoIFwib25cIiBpcyBjb25zaWRlcmVkIHRvIGJlIGFcbi8vIFRydXN0ZWRTY3JpcHQgc291cmNlLiBTdWNoIGJvb2xlYW4gYXR0cmlidXRlcyBtdXN0IGJlIHNldCB0byB0aGUgZXF1aXZhbGVudFxuLy8gdHJ1c3RlZCBlbXB0eVNjcmlwdCB2YWx1ZS5cbmNvbnN0IGVtcHR5U3RyaW5nRm9yQm9vbGVhbkF0dHJpYnV0ZSA9IHRydXN0ZWRUeXBlc1xuICA/ICh0cnVzdGVkVHlwZXMuZW1wdHlTY3JpcHQgYXMgdW5rbm93biBhcyAnJylcbiAgOiAnJztcblxuY29uc3QgcG9seWZpbGxTdXBwb3J0ID0gREVWX01PREVcbiAgPyBnbG9iYWwucmVhY3RpdmVFbGVtZW50UG9seWZpbGxTdXBwb3J0RGV2TW9kZVxuICA6IGdsb2JhbC5yZWFjdGl2ZUVsZW1lbnRQb2x5ZmlsbFN1cHBvcnQ7XG5cbmlmIChERVZfTU9ERSkge1xuICAvLyBFbnN1cmUgd2FybmluZ3MgYXJlIGlzc3VlZCBvbmx5IDF4LCBldmVuIGlmIG11bHRpcGxlIHZlcnNpb25zIG9mIExpdFxuICAvLyBhcmUgbG9hZGVkLlxuICBnbG9iYWwubGl0SXNzdWVkV2FybmluZ3MgPz89IG5ldyBTZXQoKTtcblxuICAvKipcbiAgICogSXNzdWUgYSB3YXJuaW5nIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgYmFzZWQgZWl0aGVyIG9uIGBjb2RlYCBvciBgd2FybmluZ2AuXG4gICAqIFdhcm5pbmdzIGFyZSBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5IG9ubHkgYnkgYHdhcm5pbmdgOyBkaXNhYmxpbmcgdmlhIGBjb2RlYFxuICAgKiBjYW4gYmUgZG9uZSBieSB1c2Vycy5cbiAgICovXG4gIGlzc3VlV2FybmluZyA9IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4ge1xuICAgIHdhcm5pbmcgKz0gYCBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy8ke2NvZGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLmA7XG4gICAgaWYgKFxuICAgICAgIWdsb2JhbC5saXRJc3N1ZWRXYXJuaW5ncyEuaGFzKHdhcm5pbmcpICYmXG4gICAgICAhZ2xvYmFsLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMoY29kZSlcbiAgICApIHtcbiAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbiAgICAgIGdsb2JhbC5saXRJc3N1ZWRXYXJuaW5ncyEuYWRkKHdhcm5pbmcpO1xuICAgIH1cbiAgfTtcblxuICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgaXNzdWVXYXJuaW5nKFxuICAgICAgJ2Rldi1tb2RlJyxcbiAgICAgIGBMaXQgaXMgaW4gZGV2IG1vZGUuIE5vdCByZWNvbW1lbmRlZCBmb3IgcHJvZHVjdGlvbiFgXG4gICAgKTtcblxuICAgIC8vIElzc3VlIHBvbHlmaWxsIHN1cHBvcnQgd2FybmluZy5cbiAgICBpZiAoZ2xvYmFsLlNoYWR5RE9NPy5pblVzZSAmJiBwb2x5ZmlsbFN1cHBvcnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXNzdWVXYXJuaW5nKFxuICAgICAgICAncG9seWZpbGwtc3VwcG9ydC1taXNzaW5nJyxcbiAgICAgICAgYFNoYWRvdyBET00gaXMgYmVpbmcgcG9seWZpbGxlZCB2aWEgXFxgU2hhZHlET01cXGAgYnV0IGAgK1xuICAgICAgICAgIGB0aGUgXFxgcG9seWZpbGwtc3VwcG9ydFxcYCBtb2R1bGUgaGFzIG5vdCBiZWVuIGxvYWRlZC5gXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQ29udGFpbnMgdHlwZXMgdGhhdCBhcmUgcGFydCBvZiB0aGUgdW5zdGFibGUgZGVidWcgQVBJLlxuICpcbiAqIEV2ZXJ5dGhpbmcgaW4gdGhpcyBBUEkgaXMgbm90IHN0YWJsZSBhbmQgbWF5IGNoYW5nZSBvciBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsXG4gKiBldmVuIG9uIHBhdGNoIHJlbGVhc2VzLlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuZXhwb3J0IG5hbWVzcGFjZSBSZWFjdGl2ZVVuc3RhYmxlIHtcbiAgLyoqXG4gICAqIFdoZW4gTGl0IGlzIHJ1bm5pbmcgaW4gZGV2IG1vZGUgYW5kIGB3aW5kb3cuZW1pdExpdERlYnVnTG9nRXZlbnRzYCBpcyB0cnVlLFxuICAgKiB3ZSB3aWxsIGVtaXQgJ2xpdC1kZWJ1ZycgZXZlbnRzIHRvIHdpbmRvdywgd2l0aCBsaXZlIGRldGFpbHMgYWJvdXQgdGhlIHVwZGF0ZSBhbmQgcmVuZGVyXG4gICAqIGxpZmVjeWNsZS4gVGhlc2UgY2FuIGJlIHVzZWZ1bCBmb3Igd3JpdGluZyBkZWJ1ZyB0b29saW5nIGFuZCB2aXN1YWxpemF0aW9ucy5cbiAgICpcbiAgICogUGxlYXNlIGJlIGF3YXJlIHRoYXQgcnVubmluZyB3aXRoIHdpbmRvdy5lbWl0TGl0RGVidWdMb2dFdmVudHMgaGFzIHBlcmZvcm1hbmNlIG92ZXJoZWFkLFxuICAgKiBtYWtpbmcgY2VydGFpbiBvcGVyYXRpb25zIHRoYXQgYXJlIG5vcm1hbGx5IHZlcnkgY2hlYXAgKGxpa2UgYSBuby1vcCByZW5kZXIpIG11Y2ggc2xvd2VyLFxuICAgKiBiZWNhdXNlIHdlIG11c3QgY29weSBkYXRhIGFuZCBkaXNwYXRjaCBldmVudHMuXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuICBleHBvcnQgbmFtZXNwYWNlIERlYnVnTG9nIHtcbiAgICBleHBvcnQgdHlwZSBFbnRyeSA9IFVwZGF0ZTtcbiAgICBleHBvcnQgaW50ZXJmYWNlIFVwZGF0ZSB7XG4gICAgICBraW5kOiAndXBkYXRlJztcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlYnVnTG9nZ2luZ1dpbmRvdyB7XG4gIC8vIEV2ZW4gaW4gZGV2IG1vZGUsIHdlIGdlbmVyYWxseSBkb24ndCB3YW50IHRvIGVtaXQgdGhlc2UgZXZlbnRzLCBhcyB0aGF0J3NcbiAgLy8gYW5vdGhlciBsZXZlbCBvZiBjb3N0LCBzbyBvbmx5IGVtaXQgdGhlbSB3aGVuIERFVl9NT0RFIGlzIHRydWUgX2FuZF8gd2hlblxuICAvLyB3aW5kb3cuZW1pdExpdERlYnVnRXZlbnRzIGlzIHRydWUuXG4gIGVtaXRMaXREZWJ1Z0xvZ0V2ZW50cz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogVXNlZnVsIGZvciB2aXN1YWxpemluZyBhbmQgbG9nZ2luZyBpbnNpZ2h0cyBpbnRvIHdoYXQgdGhlIExpdCB0ZW1wbGF0ZSBzeXN0ZW0gaXMgZG9pbmcuXG4gKlxuICogQ29tcGlsZWQgb3V0IG9mIHByb2QgbW9kZSBidWlsZHMuXG4gKi9cbmNvbnN0IGRlYnVnTG9nRXZlbnQgPSBERVZfTU9ERVxuICA/IChldmVudDogUmVhY3RpdmVVbnN0YWJsZS5EZWJ1Z0xvZy5FbnRyeSkgPT4ge1xuICAgICAgY29uc3Qgc2hvdWxkRW1pdCA9IChnbG9iYWwgYXMgdW5rbm93biBhcyBEZWJ1Z0xvZ2dpbmdXaW5kb3cpXG4gICAgICAgIC5lbWl0TGl0RGVidWdMb2dFdmVudHM7XG4gICAgICBpZiAoIXNob3VsZEVtaXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZ2xvYmFsLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudDxSZWFjdGl2ZVVuc3RhYmxlLkRlYnVnTG9nLkVudHJ5PignbGl0LWRlYnVnJywge1xuICAgICAgICAgIGRldGFpbDogZXZlbnQsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgOiB1bmRlZmluZWQ7XG5cbi8qXG4gKiBXaGVuIHVzaW5nIENsb3N1cmUgQ29tcGlsZXIsIEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkocHJvcGVydHksIG9iamVjdCkgaXNcbiAqIHJlcGxhY2VkIGF0IGNvbXBpbGUgdGltZSBieSB0aGUgbXVuZ2VkIG5hbWUgZm9yIG9iamVjdFtwcm9wZXJ0eV0uIFdlIGNhbm5vdFxuICogYWxpYXMgdGhpcyBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byB1c2UgYSBzbWFsbCBzaGltIHRoYXQgaGFzIHRoZSBzYW1lXG4gKiBiZWhhdmlvciB3aGVuIG5vdCBjb21waWxpbmcuXG4gKi9cbi8qQF9fSU5MSU5FX18qL1xuY29uc3QgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSA9IDxQIGV4dGVuZHMgUHJvcGVydHlLZXk+KFxuICBwcm9wOiBQLFxuICBfb2JqOiB1bmtub3duXG4pOiBQID0+IHByb3A7XG5cbi8qKlxuICogQ29udmVydHMgcHJvcGVydHkgdmFsdWVzIHRvIGFuZCBmcm9tIGF0dHJpYnV0ZSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGxleEF0dHJpYnV0ZUNvbnZlcnRlcjxUeXBlID0gdW5rbm93biwgVHlwZUhpbnQgPSB1bmtub3duPiB7XG4gIC8qKlxuICAgKiBDYWxsZWQgdG8gY29udmVydCBhbiBhdHRyaWJ1dGUgdmFsdWUgdG8gYSBwcm9wZXJ0eVxuICAgKiB2YWx1ZS5cbiAgICovXG4gIGZyb21BdHRyaWJ1dGU/KHZhbHVlOiBzdHJpbmcgfCBudWxsLCB0eXBlPzogVHlwZUhpbnQpOiBUeXBlO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgdG8gY29udmVydCBhIHByb3BlcnR5IHZhbHVlIHRvIGFuIGF0dHJpYnV0ZVxuICAgKiB2YWx1ZS5cbiAgICpcbiAgICogSXQgcmV0dXJucyB1bmtub3duIGluc3RlYWQgb2Ygc3RyaW5nLCB0byBiZSBjb21wYXRpYmxlIHdpdGhcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL1dJQ0cvdHJ1c3RlZC10eXBlcyAoYW5kIHNpbWlsYXIgZWZmb3J0cykuXG4gICAqL1xuICB0b0F0dHJpYnV0ZT8odmFsdWU6IFR5cGUsIHR5cGU/OiBUeXBlSGludCk6IHVua25vd247XG59XG5cbnR5cGUgQXR0cmlidXRlQ29udmVydGVyPFR5cGUgPSB1bmtub3duLCBUeXBlSGludCA9IHVua25vd24+ID1cbiAgfCBDb21wbGV4QXR0cmlidXRlQ29udmVydGVyPFR5cGU+XG4gIHwgKCh2YWx1ZTogc3RyaW5nIHwgbnVsbCwgdHlwZT86IFR5cGVIaW50KSA9PiBUeXBlKTtcblxuLyoqXG4gKiBEZWZpbmVzIG9wdGlvbnMgZm9yIGEgcHJvcGVydHkgYWNjZXNzb3IuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlEZWNsYXJhdGlvbjxUeXBlID0gdW5rbm93biwgVHlwZUhpbnQgPSB1bmtub3duPiB7XG4gIC8qKlxuICAgKiBXaGVuIHNldCB0byBgdHJ1ZWAsIGluZGljYXRlcyB0aGUgcHJvcGVydHkgaXMgaW50ZXJuYWwgcHJpdmF0ZSBzdGF0ZS4gVGhlXG4gICAqIHByb3BlcnR5IHNob3VsZCBub3QgYmUgc2V0IGJ5IHVzZXJzLiBXaGVuIHVzaW5nIFR5cGVTY3JpcHQsIHRoaXMgcHJvcGVydHlcbiAgICogc2hvdWxkIGJlIG1hcmtlZCBhcyBgcHJpdmF0ZWAgb3IgYHByb3RlY3RlZGAsIGFuZCBpdCBpcyBhbHNvIGEgY29tbW9uXG4gICAqIHByYWN0aWNlIHRvIHVzZSBhIGxlYWRpbmcgYF9gIGluIHRoZSBuYW1lLiBUaGUgcHJvcGVydHkgaXMgbm90IGFkZGVkIHRvXG4gICAqIGBvYnNlcnZlZEF0dHJpYnV0ZXNgLlxuICAgKi9cbiAgcmVhZG9ubHkgc3RhdGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IGFuZCB3aGV0aGVyIHRoZSBwcm9wZXJ0eSBiZWNvbWVzIGFuIG9ic2VydmVkIGF0dHJpYnV0ZS5cbiAgICogSWYgdGhlIHZhbHVlIGlzIGBmYWxzZWAsIHRoZSBwcm9wZXJ0eSBpcyBub3QgYWRkZWQgdG8gYG9ic2VydmVkQXR0cmlidXRlc2AuXG4gICAqIElmIHRydWUgb3IgYWJzZW50LCB0aGUgbG93ZXJjYXNlZCBwcm9wZXJ0eSBuYW1lIGlzIG9ic2VydmVkIChlLmcuIGBmb29CYXJgXG4gICAqIGJlY29tZXMgYGZvb2JhcmApLiBJZiBhIHN0cmluZywgdGhlIHN0cmluZyB2YWx1ZSBpcyBvYnNlcnZlZCAoZS5nXG4gICAqIGBhdHRyaWJ1dGU6ICdmb28tYmFyJ2ApLlxuICAgKi9cbiAgcmVhZG9ubHkgYXR0cmlidXRlPzogYm9vbGVhbiB8IHN0cmluZztcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoZSB0eXBlIG9mIHRoZSBwcm9wZXJ0eS4gVGhpcyBpcyB1c2VkIG9ubHkgYXMgYSBoaW50IGZvciB0aGVcbiAgICogYGNvbnZlcnRlcmAgdG8gZGV0ZXJtaW5lIGhvdyB0byBjb252ZXJ0IHRoZSBhdHRyaWJ1dGVcbiAgICogdG8vZnJvbSBhIHByb3BlcnR5LlxuICAgKi9cbiAgcmVhZG9ubHkgdHlwZT86IFR5cGVIaW50O1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IHRvIGNvbnZlcnQgdGhlIGF0dHJpYnV0ZSB0by9mcm9tIGEgcHJvcGVydHkuIElmIHRoaXMgdmFsdWVcbiAgICogaXMgYSBmdW5jdGlvbiwgaXQgaXMgdXNlZCB0byBjb252ZXJ0IHRoZSBhdHRyaWJ1dGUgdmFsdWUgYSB0aGUgcHJvcGVydHlcbiAgICogdmFsdWUuIElmIGl0J3MgYW4gb2JqZWN0LCBpdCBjYW4gaGF2ZSBrZXlzIGZvciBgZnJvbUF0dHJpYnV0ZWAgYW5kXG4gICAqIGB0b0F0dHJpYnV0ZWAuIElmIG5vIGB0b0F0dHJpYnV0ZWAgZnVuY3Rpb24gaXMgcHJvdmlkZWQgYW5kXG4gICAqIGByZWZsZWN0YCBpcyBzZXQgdG8gYHRydWVgLCB0aGUgcHJvcGVydHkgdmFsdWUgaXMgc2V0IGRpcmVjdGx5IHRvIHRoZVxuICAgKiBhdHRyaWJ1dGUuIEEgZGVmYXVsdCBgY29udmVydGVyYCBpcyB1c2VkIGlmIG5vbmUgaXMgcHJvdmlkZWQ7IGl0IHN1cHBvcnRzXG4gICAqIGBCb29sZWFuYCwgYFN0cmluZ2AsIGBOdW1iZXJgLCBgT2JqZWN0YCwgYW5kIGBBcnJheWAuIE5vdGUsXG4gICAqIHdoZW4gYSBwcm9wZXJ0eSBjaGFuZ2VzIGFuZCB0aGUgY29udmVydGVyIGlzIHVzZWQgdG8gdXBkYXRlIHRoZSBhdHRyaWJ1dGUsXG4gICAqIHRoZSBwcm9wZXJ0eSBpcyBuZXZlciB1cGRhdGVkIGFnYWluIGFzIGEgcmVzdWx0IG9mIHRoZSBhdHRyaWJ1dGUgY2hhbmdpbmcsXG4gICAqIGFuZCB2aWNlIHZlcnNhLlxuICAgKi9cbiAgcmVhZG9ubHkgY29udmVydGVyPzogQXR0cmlidXRlQ29udmVydGVyPFR5cGUsIFR5cGVIaW50PjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBwcm9wZXJ0eSBzaG91bGQgcmVmbGVjdCB0byBhbiBhdHRyaWJ1dGUuXG4gICAqIElmIGB0cnVlYCwgd2hlbiB0aGUgcHJvcGVydHkgaXMgc2V0LCB0aGUgYXR0cmlidXRlIGlzIHNldCB1c2luZyB0aGVcbiAgICogYXR0cmlidXRlIG5hbWUgZGV0ZXJtaW5lZCBhY2NvcmRpbmcgdG8gdGhlIHJ1bGVzIGZvciB0aGUgYGF0dHJpYnV0ZWBcbiAgICogcHJvcGVydHkgb3B0aW9uIGFuZCB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IGNvbnZlcnRlZCB1c2luZyB0aGUgcnVsZXNcbiAgICogZnJvbSB0aGUgYGNvbnZlcnRlcmAgcHJvcGVydHkgb3B0aW9uLlxuICAgKi9cbiAgcmVhZG9ubHkgcmVmbGVjdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBpbmRpY2F0ZXMgaWYgYSBwcm9wZXJ0eSBzaG91bGQgYmUgY29uc2lkZXJlZCBjaGFuZ2VkIHdoZW5cbiAgICogaXQgaXMgc2V0LiBUaGUgZnVuY3Rpb24gc2hvdWxkIHRha2UgdGhlIGBuZXdWYWx1ZWAgYW5kIGBvbGRWYWx1ZWAgYW5kXG4gICAqIHJldHVybiBgdHJ1ZWAgaWYgYW4gdXBkYXRlIHNob3VsZCBiZSByZXF1ZXN0ZWQuXG4gICAqL1xuICBoYXNDaGFuZ2VkPyh2YWx1ZTogVHlwZSwgb2xkVmFsdWU6IFR5cGUpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBhbiBhY2Nlc3NvciB3aWxsIGJlIGNyZWF0ZWQgZm9yIHRoaXMgcHJvcGVydHkuIEJ5XG4gICAqIGRlZmF1bHQsIGFuIGFjY2Vzc29yIHdpbGwgYmUgZ2VuZXJhdGVkIGZvciB0aGlzIHByb3BlcnR5IHRoYXQgcmVxdWVzdHMgYW5cbiAgICogdXBkYXRlIHdoZW4gc2V0LiBJZiB0aGlzIGZsYWcgaXMgYHRydWVgLCBubyBhY2Nlc3NvciB3aWxsIGJlIGNyZWF0ZWQsIGFuZFxuICAgKiBpdCB3aWxsIGJlIHRoZSB1c2VyJ3MgcmVzcG9uc2liaWxpdHkgdG8gY2FsbFxuICAgKiBgdGhpcy5yZXF1ZXN0VXBkYXRlKHByb3BlcnR5TmFtZSwgb2xkVmFsdWUpYCB0byByZXF1ZXN0IGFuIHVwZGF0ZSB3aGVuXG4gICAqIHRoZSBwcm9wZXJ0eSBjaGFuZ2VzLlxuICAgKi9cbiAgcmVhZG9ubHkgbm9BY2Nlc3Nvcj86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhpcyBwcm9wZXJ0eSBpcyB3cmFwcGluZyBhY2Nlc3NvcnMuIFRoaXMgaXMgc2V0IGJ5IGBAcHJvcGVydHlgXG4gICAqIHRvIGNvbnRyb2wgdGhlIGluaXRpYWwgdmFsdWUgY2hhbmdlIGFuZCByZWZsZWN0aW9uIGxvZ2ljLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHdyYXBwZWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGVuIGB0cnVlYCwgdXNlcyB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgYXMgdGhlIGRlZmF1bHQgdmFsdWUsXG4gICAqIHdoaWNoIGNoYW5nZXMgaG93IGF0dHJpYnV0ZXMgYXJlIGhhbmRsZWQ6XG4gICAqICAtIFRoZSBpbml0aWFsIHZhbHVlIGRvZXMgKm5vdCogcmVmbGVjdCwgZXZlbiBpZiB0aGUgYHJlZmxlY3RgIG9wdGlvbiBpcyBgdHJ1ZWAuXG4gICAqICAgIFN1YnNlcXVlbnQgY2hhbmdlcyB0byB0aGUgcHJvcGVydHkgd2lsbCByZWZsZWN0LCBldmVuIGlmIHRoZXkgYXJlIGVxdWFsIHRvIHRoZVxuICAgKiAgICAgZGVmYXVsdCB2YWx1ZS5cbiAgICogIC0gV2hlbiB0aGUgYXR0cmlidXRlIGlzIHJlbW92ZWQsIHRoZSBwcm9wZXJ0eSBpcyBzZXQgdG8gdGhlIGRlZmF1bHQgdmFsdWVcbiAgICogIC0gVGhlIGluaXRpYWwgdmFsdWUgd2lsbCBub3QgdHJpZ2dlciBhbiBvbGQgdmFsdWUgaW4gdGhlIGBjaGFuZ2VkUHJvcGVydGllc2AgbWFwXG4gICAqICAgIGFyZ3VtZW50IHRvIHVwZGF0ZSBsaWZlY3ljbGUgbWV0aG9kcy5cbiAgICpcbiAgICogV2hlbiBzZXQsIHByb3BlcnRpZXMgbXVzdCBiZSBpbml0aWFsaXplZCwgZWl0aGVyIHdpdGggYSBmaWVsZCBpbml0aWFsaXplciwgb3IgYW5cbiAgICogYXNzaWdubWVudCBpbiB0aGUgY29uc3RydWN0b3IuIE5vdCBpbml0aWFsaXppbmcgdGhlIHByb3BlcnR5IG1heSBsZWFkIHRvXG4gICAqIGltcHJvcGVyIGhhbmRsaW5nIG9mIHN1YnNlcXVlbnQgcHJvcGVydHkgYXNzaWdubWVudHMuXG4gICAqXG4gICAqIFdoaWxlIHRoaXMgYmVoYXZpb3IgaXMgb3B0LWluLCBtb3N0IHByb3BlcnRpZXMgdGhhdCByZWZsZWN0IHRvIGF0dHJpYnV0ZXMgc2hvdWxkXG4gICAqIHVzZSBgdXNlRGVmYXVsdDogdHJ1ZWAgc28gdGhhdCB0aGVpciBpbml0aWFsIHZhbHVlcyBkbyBub3QgcmVmbGVjdC5cbiAgICovXG4gIHVzZURlZmF1bHQ/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIE1hcCBvZiBwcm9wZXJ0aWVzIHRvIFByb3BlcnR5RGVjbGFyYXRpb24gb3B0aW9ucy4gRm9yIGVhY2ggcHJvcGVydHkgYW5cbiAqIGFjY2Vzc29yIGlzIG1hZGUsIGFuZCB0aGUgcHJvcGVydHkgaXMgcHJvY2Vzc2VkIGFjY29yZGluZyB0byB0aGVcbiAqIFByb3BlcnR5RGVjbGFyYXRpb24gb3B0aW9ucy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcm9wZXJ0eURlY2xhcmF0aW9ucyB7XG4gIHJlYWRvbmx5IFtrZXk6IHN0cmluZ106IFByb3BlcnR5RGVjbGFyYXRpb247XG59XG5cbnR5cGUgUHJvcGVydHlEZWNsYXJhdGlvbk1hcCA9IE1hcDxQcm9wZXJ0eUtleSwgUHJvcGVydHlEZWNsYXJhdGlvbj47XG5cbnR5cGUgQXR0cmlidXRlTWFwID0gTWFwPHN0cmluZywgUHJvcGVydHlLZXk+O1xuXG4vKipcbiAqIEEgTWFwIG9mIHByb3BlcnR5IGtleXMgdG8gdmFsdWVzLlxuICpcbiAqIFRha2VzIGFuIG9wdGlvbmFsIHR5cGUgcGFyYW1ldGVyIFQsIHdoaWNoIHdoZW4gc3BlY2lmaWVkIGFzIGEgbm9uLWFueSxcbiAqIG5vbi11bmtub3duIHR5cGUsIHdpbGwgbWFrZSB0aGUgTWFwIG1vcmUgc3Ryb25nbHktdHlwZWQsIGFzc29jaWF0aW5nIHRoZSBtYXBcbiAqIGtleXMgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nIHZhbHVlIHR5cGUgb24gVC5cbiAqXG4gKiBVc2UgYFByb3BlcnR5VmFsdWVzPHRoaXM+YCB3aGVuIG92ZXJyaWRpbmcgUmVhY3RpdmVFbGVtZW50LnVwZGF0ZSgpIGFuZFxuICogb3RoZXIgbGlmZWN5Y2xlIG1ldGhvZHMgaW4gb3JkZXIgdG8gZ2V0IHN0cm9uZ2VyIHR5cGUtY2hlY2tpbmcgb24ga2V5c1xuICogYW5kIHZhbHVlcy5cbiAqL1xuLy8gVGhpcyB0eXBlIGlzIGNvbmRpdGlvbmFsIHNvIHRoYXQgaWYgdGhlIHBhcmFtZXRlciBUIGlzIG5vdCBzcGVjaWZpZWQsIG9yXG4vLyBpcyBgYW55YCwgdGhlIHR5cGUgd2lsbCBpbmNsdWRlIGBNYXA8UHJvcGVydHlLZXksIHVua25vd24+YC4gU2luY2UgVCBpcyBub3Rcbi8vIGdpdmVuIGluIHRoZSB1c2VzIG9mIFByb3BlcnR5VmFsdWVzIGluIHRoaXMgZmlsZSwgYWxsIHVzZXMgaGVyZSBmYWxsYmFjayB0b1xuLy8gbWVhbmluZyBgTWFwPFByb3BlcnR5S2V5LCB1bmtub3duPmAsIGJ1dCBpZiBhIGRldmVsb3BlciB1c2VzXG4vLyBgUHJvcGVydHlWYWx1ZXM8dGhpcz5gIChvciBhbnkgb3RoZXIgdmFsdWUgZm9yIFQpIHRoZXkgd2lsbCBnZXQgYVxuLy8gc3Ryb25nbHktdHlwZWQgTWFwIHR5cGUuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IHR5cGUgUHJvcGVydHlWYWx1ZXM8VCA9IGFueT4gPSBUIGV4dGVuZHMgb2JqZWN0XG4gID8gUHJvcGVydHlWYWx1ZU1hcDxUPlxuICA6IE1hcDxQcm9wZXJ0eUtleSwgdW5rbm93bj47XG5cbi8qKlxuICogRG8gbm90IHVzZSwgaW5zdGVhZCBwcmVmZXIge0BsaW5rY29kZSBQcm9wZXJ0eVZhbHVlc30uXG4gKi9cbi8vIFRoaXMgdHlwZSBtdXN0IGJlIGV4cG9ydGVkIHN1Y2ggdGhhdCBKYXZhU2NyaXB0IGdlbmVyYXRlZCBieSB0aGUgR29vZ2xlXG4vLyBDbG9zdXJlIENvbXBpbGVyIGNhbiBpbXBvcnQgYSB0eXBlIHJlZmVyZW5jZS5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlWYWx1ZU1hcDxUPiBleHRlbmRzIE1hcDxQcm9wZXJ0eUtleSwgdW5rbm93bj4ge1xuICBnZXQ8SyBleHRlbmRzIGtleW9mIFQ+KGs6IEspOiBUW0tdIHwgdW5kZWZpbmVkO1xuICBzZXQ8SyBleHRlbmRzIGtleW9mIFQ+KGtleTogSywgdmFsdWU6IFRbS10pOiB0aGlzO1xuICBoYXM8SyBleHRlbmRzIGtleW9mIFQ+KGs6IEspOiBib29sZWFuO1xuICBkZWxldGU8SyBleHRlbmRzIGtleW9mIFQ+KGs6IEspOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdENvbnZlcnRlcjogQ29tcGxleEF0dHJpYnV0ZUNvbnZlcnRlciA9IHtcbiAgdG9BdHRyaWJ1dGUodmFsdWU6IHVua25vd24sIHR5cGU/OiB1bmtub3duKTogdW5rbm93biB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEJvb2xlYW46XG4gICAgICAgIHZhbHVlID0gdmFsdWUgPyBlbXB0eVN0cmluZ0ZvckJvb2xlYW5BdHRyaWJ1dGUgOiBudWxsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgT2JqZWN0OlxuICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIGBudWxsYCBvciBgdW5kZWZpbmVkYCBwYXNzIHRoaXMgdGhyb3VnaFxuICAgICAgICAvLyB0byBhbGxvdyByZW1vdmluZy9ubyBjaGFuZ2UgYmVoYXZpb3IuXG4gICAgICAgIHZhbHVlID0gdmFsdWUgPT0gbnVsbCA/IHZhbHVlIDogSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIGZyb21BdHRyaWJ1dGUodmFsdWU6IHN0cmluZyB8IG51bGwsIHR5cGU/OiB1bmtub3duKSB7XG4gICAgbGV0IGZyb21WYWx1ZTogdW5rbm93biA9IHZhbHVlO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBCb29sZWFuOlxuICAgICAgICBmcm9tVmFsdWUgPSB2YWx1ZSAhPT0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE51bWJlcjpcbiAgICAgICAgZnJvbVZhbHVlID0gdmFsdWUgPT09IG51bGwgPyBudWxsIDogTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE9iamVjdDpcbiAgICAgIGNhc2UgQXJyYXk6XG4gICAgICAgIC8vIERvICpub3QqIGdlbmVyYXRlIGV4Y2VwdGlvbiB3aGVuIGludmFsaWQgSlNPTiBpcyBzZXQgYXMgZWxlbWVudHNcbiAgICAgICAgLy8gZG9uJ3Qgbm9ybWFsbHkgY29tcGxhaW4gb24gYmVpbmcgbWlzLWNvbmZpZ3VyZWQuXG4gICAgICAgIC8vIFRPRE8oc29ydmVsbCk6IERvIGdlbmVyYXRlIGV4Y2VwdGlvbiBpbiAqZGV2IG1vZGUqLlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIEFzc2VydCB0byBhZGhlcmUgdG8gQmF6ZWwncyBcIm11c3QgdHlwZSBhc3NlcnQgSlNPTiBwYXJzZVwiIHJ1bGUuXG4gICAgICAgICAgZnJvbVZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSEpIGFzIHVua25vd247XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBmcm9tVmFsdWUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gZnJvbVZhbHVlO1xuICB9LFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBIYXNDaGFuZ2VkIHtcbiAgKHZhbHVlOiB1bmtub3duLCBvbGQ6IHVua25vd24pOiBib29sZWFuO1xufVxuXG4vKipcbiAqIENoYW5nZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIGRpZmZlcmVudCBmcm9tIGBvbGRWYWx1ZWAuXG4gKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGFzIHRoZSBkZWZhdWx0IGZvciBhIHByb3BlcnR5J3MgYGhhc0NoYW5nZWRgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3Qgbm90RXF1YWw6IEhhc0NoYW5nZWQgPSAodmFsdWU6IHVua25vd24sIG9sZDogdW5rbm93bik6IGJvb2xlYW4gPT5cbiAgIWlzKHZhbHVlLCBvbGQpO1xuXG5jb25zdCBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvbjogUHJvcGVydHlEZWNsYXJhdGlvbiA9IHtcbiAgYXR0cmlidXRlOiB0cnVlLFxuICB0eXBlOiBTdHJpbmcsXG4gIGNvbnZlcnRlcjogZGVmYXVsdENvbnZlcnRlcixcbiAgcmVmbGVjdDogZmFsc2UsXG4gIHVzZURlZmF1bHQ6IGZhbHNlLFxuICBoYXNDaGFuZ2VkOiBub3RFcXVhbCxcbn07XG5cbi8qKlxuICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIG9uZSBvZiB0aGUgc3VwcG9ydGVkIGRldiBtb2RlIHdhcm5pbmcgY2F0ZWdvcmllcy5cbiAqL1xuZXhwb3J0IHR5cGUgV2FybmluZ0tpbmQgPVxuICB8ICdjaGFuZ2UtaW4tdXBkYXRlJ1xuICB8ICdtaWdyYXRpb24nXG4gIHwgJ2FzeW5jLXBlcmZvcm0tdXBkYXRlJztcblxuZXhwb3J0IHR5cGUgSW5pdGlhbGl6ZXIgPSAoZWxlbWVudDogUmVhY3RpdmVFbGVtZW50KSA9PiB2b2lkO1xuXG4vLyBUZW1wb3JhcnksIHVudGlsIGdvb2dsZTMgaXMgb24gVHlwZVNjcmlwdCA1LjJcbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFN5bWJvbENvbnN0cnVjdG9yIHtcbiAgICByZWFkb25seSBtZXRhZGF0YTogdW5pcXVlIHN5bWJvbDtcbiAgfVxufVxuXG4vLyBFbnN1cmUgbWV0YWRhdGEgaXMgZW5hYmxlZC4gVHlwZVNjcmlwdCBkb2VzIG5vdCBwb2x5ZmlsbFxuLy8gU3ltYm9sLm1ldGFkYXRhLCBzbyB3ZSBtdXN0IGVuc3VyZSB0aGF0IGl0IGV4aXN0cy5cbihTeW1ib2wgYXMge21ldGFkYXRhOiBzeW1ib2x9KS5tZXRhZGF0YSA/Pz0gU3ltYm9sKCdtZXRhZGF0YScpO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8vIFRoaXMgaXMgcHVibGljIGdsb2JhbCBBUEksIGRvIG5vdCBjaGFuZ2UhXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby12YXJcbiAgdmFyIGxpdFByb3BlcnR5TWV0YWRhdGE6IFdlYWtNYXA8XG4gICAgb2JqZWN0LFxuICAgIE1hcDxQcm9wZXJ0eUtleSwgUHJvcGVydHlEZWNsYXJhdGlvbj5cbiAgPjtcbn1cblxuLy8gTWFwIGZyb20gYSBjbGFzcydzIG1ldGFkYXRhIG9iamVjdCB0byBwcm9wZXJ0eSBvcHRpb25zXG4vLyBOb3RlIHRoYXQgd2UgbXVzdCB1c2UgbnVsbGlzaC1jb2FsZXNjaW5nIGFzc2lnbm1lbnQgc28gdGhhdCB3ZSBvbmx5IHVzZSBvbmVcbi8vIG1hcCBldmVuIGlmIHdlIGxvYWQgbXVsdGlwbGUgdmVyc2lvbiBvZiB0aGlzIG1vZHVsZS5cbmdsb2JhbC5saXRQcm9wZXJ0eU1ldGFkYXRhID8/PSBuZXcgV2Vha01hcDxcbiAgb2JqZWN0LFxuICBNYXA8UHJvcGVydHlLZXksIFByb3BlcnR5RGVjbGFyYXRpb24+XG4+KCk7XG5cbi8qKlxuICogQmFzZSBlbGVtZW50IGNsYXNzIHdoaWNoIG1hbmFnZXMgZWxlbWVudCBwcm9wZXJ0aWVzIGFuZCBhdHRyaWJ1dGVzLiBXaGVuXG4gKiBwcm9wZXJ0aWVzIGNoYW5nZSwgdGhlIGB1cGRhdGVgIG1ldGhvZCBpcyBhc3luY2hyb25vdXNseSBjYWxsZWQuIFRoaXMgbWV0aG9kXG4gKiBzaG91bGQgYmUgc3VwcGxpZWQgYnkgc3ViY2xhc3NlcyB0byByZW5kZXIgdXBkYXRlcyBhcyBkZXNpcmVkLlxuICogQG5vSW5oZXJpdERvY1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVhY3RpdmVFbGVtZW50XG4gIC8vIEluIHRoZSBOb2RlIGJ1aWxkLCB0aGlzIGBleHRlbmRzYCBjbGF1c2Ugd2lsbCBiZSBzdWJzdGl0dXRlZCB3aXRoXG4gIC8vIGAoZ2xvYmFsVGhpcy5IVE1MRWxlbWVudCA/PyBIVE1MRWxlbWVudClgLlxuICAvL1xuICAvLyBUaGlzIHdheSwgd2Ugd2lsbCBmaXJzdCBwcmVmZXIgYW55IGdsb2JhbCBgSFRNTEVsZW1lbnRgIHBvbHlmaWxsIHRoYXQgdGhlXG4gIC8vIHVzZXIgaGFzIGFzc2lnbmVkLCBhbmQgdGhlbiBmYWxsIGJhY2sgdG8gdGhlIGBIVE1MRWxlbWVudGAgc2hpbSB3aGljaCBoYXNcbiAgLy8gYmVlbiBpbXBvcnRlZCAoc2VlIG5vdGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUgYWJvdXQgaG93IHRoaXMgaW1wb3J0IGlzXG4gIC8vIGdlbmVyYXRlZCBieSBSb2xsdXApLiBOb3RlIHRoYXQgdGhlIGBIVE1MRWxlbWVudGAgdmFyaWFibGUgaGFzIGJlZW5cbiAgLy8gc2hhZG93ZWQgYnkgdGhpcyBpbXBvcnQsIHNvIGl0IG5vIGxvbmdlciByZWZlcnMgdG8gdGhlIGdsb2JhbC5cbiAgZXh0ZW5kcyBIVE1MRWxlbWVudFxuICBpbXBsZW1lbnRzIFJlYWN0aXZlQ29udHJvbGxlckhvc3RcbntcbiAgLy8gTm90ZTogdGhlc2UgYXJlIHBhdGNoZWQgaW4gb25seSBpbiBERVZfTU9ERS5cbiAgLyoqXG4gICAqIFJlYWQgb3Igc2V0IGFsbCB0aGUgZW5hYmxlZCB3YXJuaW5nIGNhdGVnb3JpZXMgZm9yIHRoaXMgY2xhc3MuXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgb25seSB1c2VkIGluIGRldmVsb3BtZW50IGJ1aWxkcy5cbiAgICpcbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IGRldi1tb2RlXG4gICAqL1xuICBzdGF0aWMgZW5hYmxlZFdhcm5pbmdzPzogV2FybmluZ0tpbmRbXTtcblxuICAvKipcbiAgICogRW5hYmxlIHRoZSBnaXZlbiB3YXJuaW5nIGNhdGVnb3J5IGZvciB0aGlzIGNsYXNzLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBvbmx5IGV4aXN0cyBpbiBkZXZlbG9wbWVudCBidWlsZHMsIHNvIGl0IHNob3VsZCBiZSBhY2Nlc3NlZFxuICAgKiB3aXRoIGEgZ3VhcmQgbGlrZTpcbiAgICpcbiAgICogYGBgdHNcbiAgICogLy8gRW5hYmxlIGZvciBhbGwgUmVhY3RpdmVFbGVtZW50IHN1YmNsYXNzZXNcbiAgICogUmVhY3RpdmVFbGVtZW50LmVuYWJsZVdhcm5pbmc/LignbWlncmF0aW9uJyk7XG4gICAqXG4gICAqIC8vIEVuYWJsZSBmb3Igb25seSBNeUVsZW1lbnQgYW5kIHN1YmNsYXNzZXNcbiAgICogTXlFbGVtZW50LmVuYWJsZVdhcm5pbmc/LignbWlncmF0aW9uJyk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKiBAY2F0ZWdvcnkgZGV2LW1vZGVcbiAgICovXG4gIHN0YXRpYyBlbmFibGVXYXJuaW5nPzogKHdhcm5pbmdLaW5kOiBXYXJuaW5nS2luZCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogRGlzYWJsZSB0aGUgZ2l2ZW4gd2FybmluZyBjYXRlZ29yeSBmb3IgdGhpcyBjbGFzcy5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgb25seSBleGlzdHMgaW4gZGV2ZWxvcG1lbnQgYnVpbGRzLCBzbyBpdCBzaG91bGQgYmUgYWNjZXNzZWRcbiAgICogd2l0aCBhIGd1YXJkIGxpa2U6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIC8vIERpc2FibGUgZm9yIGFsbCBSZWFjdGl2ZUVsZW1lbnQgc3ViY2xhc3Nlc1xuICAgKiBSZWFjdGl2ZUVsZW1lbnQuZGlzYWJsZVdhcm5pbmc/LignbWlncmF0aW9uJyk7XG4gICAqXG4gICAqIC8vIERpc2FibGUgZm9yIG9ubHkgTXlFbGVtZW50IGFuZCBzdWJjbGFzc2VzXG4gICAqIE15RWxlbWVudC5kaXNhYmxlV2FybmluZz8uKCdtaWdyYXRpb24nKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEBub2NvbGxhcHNlXG4gICAqIEBjYXRlZ29yeSBkZXYtbW9kZVxuICAgKi9cbiAgc3RhdGljIGRpc2FibGVXYXJuaW5nPzogKHdhcm5pbmdLaW5kOiBXYXJuaW5nS2luZCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogQWRkcyBhbiBpbml0aWFsaXplciBmdW5jdGlvbiB0byB0aGUgY2xhc3MgdGhhdCBpcyBjYWxsZWQgZHVyaW5nIGluc3RhbmNlXG4gICAqIGNvbnN0cnVjdGlvbi5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VmdWwgZm9yIGNvZGUgdGhhdCBydW5zIGFnYWluc3QgYSBgUmVhY3RpdmVFbGVtZW50YFxuICAgKiBzdWJjbGFzcywgc3VjaCBhcyBhIGRlY29yYXRvciwgdGhhdCBuZWVkcyB0byBkbyB3b3JrIGZvciBlYWNoXG4gICAqIGluc3RhbmNlLCBzdWNoIGFzIHNldHRpbmcgdXAgYSBgUmVhY3RpdmVDb250cm9sbGVyYC5cbiAgICpcbiAgICogYGBgdHNcbiAgICogY29uc3QgbXlEZWNvcmF0b3IgPSAodGFyZ2V0OiB0eXBlb2YgUmVhY3RpdmVFbGVtZW50LCBrZXk6IHN0cmluZykgPT4ge1xuICAgKiAgIHRhcmdldC5hZGRJbml0aWFsaXplcigoaW5zdGFuY2U6IFJlYWN0aXZlRWxlbWVudCkgPT4ge1xuICAgKiAgICAgLy8gVGhpcyBpcyBydW4gZHVyaW5nIGNvbnN0cnVjdGlvbiBvZiB0aGUgZWxlbWVudFxuICAgKiAgICAgbmV3IE15Q29udHJvbGxlcihpbnN0YW5jZSk7XG4gICAqICAgfSk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIERlY29yYXRpbmcgYSBmaWVsZCB3aWxsIHRoZW4gY2F1c2UgZWFjaCBpbnN0YW5jZSB0byBydW4gYW4gaW5pdGlhbGl6ZXJcbiAgICogdGhhdCBhZGRzIGEgY29udHJvbGxlcjpcbiAgICpcbiAgICogYGBgdHNcbiAgICogY2xhc3MgTXlFbGVtZW50IGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gICAqICAgQG15RGVjb3JhdG9yIGZvbztcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogSW5pdGlhbGl6ZXJzIGFyZSBzdG9yZWQgcGVyLWNvbnN0cnVjdG9yLiBBZGRpbmcgYW4gaW5pdGlhbGl6ZXIgdG8gYVxuICAgKiBzdWJjbGFzcyBkb2VzIG5vdCBhZGQgaXQgdG8gYSBzdXBlcmNsYXNzLiBTaW5jZSBpbml0aWFsaXplcnMgYXJlIHJ1biBpblxuICAgKiBjb25zdHJ1Y3RvcnMsIGluaXRpYWxpemVycyB3aWxsIHJ1biBpbiBvcmRlciBvZiB0aGUgY2xhc3MgaGllcmFyY2h5LFxuICAgKiBzdGFydGluZyB3aXRoIHN1cGVyY2xhc3NlcyBhbmQgcHJvZ3Jlc3NpbmcgdG8gdGhlIGluc3RhbmNlJ3MgY2xhc3MuXG4gICAqXG4gICAqIEBub2NvbGxhcHNlXG4gICAqL1xuICBzdGF0aWMgYWRkSW5pdGlhbGl6ZXIoaW5pdGlhbGl6ZXI6IEluaXRpYWxpemVyKSB7XG4gICAgdGhpcy5fX3ByZXBhcmUoKTtcbiAgICAodGhpcy5faW5pdGlhbGl6ZXJzID8/PSBbXSkucHVzaChpbml0aWFsaXplcik7XG4gIH1cblxuICBzdGF0aWMgX2luaXRpYWxpemVycz86IEluaXRpYWxpemVyW107XG5cbiAgLypcbiAgICogRHVlIHRvIGNsb3N1cmUgY29tcGlsZXIgRVM2IGNvbXBpbGF0aW9uIGJ1Z3MsIEBub2NvbGxhcHNlIGlzIHJlcXVpcmVkIG9uXG4gICAqIGFsbCBzdGF0aWMgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB3aXRoIGluaXRpYWxpemVycy4gIFJlZmVyZW5jZTpcbiAgICogLSBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL2Nsb3N1cmUtY29tcGlsZXIvaXNzdWVzLzE3NzZcbiAgICovXG5cbiAgLyoqXG4gICAqIE1hcHMgYXR0cmlidXRlIG5hbWVzIHRvIHByb3BlcnRpZXM7IGZvciBleGFtcGxlIGBmb29iYXJgIGF0dHJpYnV0ZSB0b1xuICAgKiBgZm9vQmFyYCBwcm9wZXJ0eS4gQ3JlYXRlZCBsYXppbHkgb24gdXNlciBzdWJjbGFzc2VzIHdoZW4gZmluYWxpemluZyB0aGVcbiAgICogY2xhc3MuXG4gICAqIEBub2NvbGxhcHNlXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBfX2F0dHJpYnV0ZVRvUHJvcGVydHlNYXA6IEF0dHJpYnV0ZU1hcDtcblxuICAvKipcbiAgICogTWFya3MgY2xhc3MgYXMgaGF2aW5nIGJlZW4gZmluYWxpemVkLCB3aGljaCBpbmNsdWRlcyBjcmVhdGluZyBwcm9wZXJ0aWVzXG4gICAqIGZyb20gYHN0YXRpYyBwcm9wZXJ0aWVzYCwgYnV0IGRvZXMgKm5vdCogaW5jbHVkZSBhbGwgcHJvcGVydGllcyBjcmVhdGVkXG4gICAqIGZyb20gZGVjb3JhdG9ycy5cbiAgICogQG5vY29sbGFwc2VcbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgZmluYWxpemVkOiB0cnVlIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBNZW1vaXplZCBsaXN0IG9mIGFsbCBlbGVtZW50IHByb3BlcnRpZXMsIGluY2x1ZGluZyBhbnkgc3VwZXJjbGFzc1xuICAgKiBwcm9wZXJ0aWVzLiBDcmVhdGVkIGxhemlseSBvbiB1c2VyIHN1YmNsYXNzZXMgd2hlbiBmaW5hbGl6aW5nIHRoZSBjbGFzcy5cbiAgICpcbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHByb3BlcnRpZXNcbiAgICovXG4gIHN0YXRpYyBlbGVtZW50UHJvcGVydGllczogUHJvcGVydHlEZWNsYXJhdGlvbk1hcDtcblxuICAvKipcbiAgICogVXNlci1zdXBwbGllZCBvYmplY3QgdGhhdCBtYXBzIHByb3BlcnR5IG5hbWVzIHRvIGBQcm9wZXJ0eURlY2xhcmF0aW9uYFxuICAgKiBvYmplY3RzIGNvbnRhaW5pbmcgb3B0aW9ucyBmb3IgY29uZmlndXJpbmcgcmVhY3RpdmUgcHJvcGVydGllcy4gV2hlblxuICAgKiBhIHJlYWN0aXZlIHByb3BlcnR5IGlzIHNldCB0aGUgZWxlbWVudCB3aWxsIHVwZGF0ZSBhbmQgcmVuZGVyLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0IHByb3BlcnRpZXMgYXJlIHB1YmxpYyBmaWVsZHMsIGFuZCBhcyBzdWNoLCB0aGV5IHNob3VsZCBiZVxuICAgKiBjb25zaWRlcmVkIGFzIHByaW1hcmlseSBzZXR0YWJsZSBieSBlbGVtZW50IHVzZXJzLCBlaXRoZXIgdmlhIGF0dHJpYnV0ZSBvclxuICAgKiB0aGUgcHJvcGVydHkgaXRzZWxmLlxuICAgKlxuICAgKiBHZW5lcmFsbHksIHByb3BlcnRpZXMgdGhhdCBhcmUgY2hhbmdlZCBieSB0aGUgZWxlbWVudCBzaG91bGQgYmUgcHJpdmF0ZSBvclxuICAgKiBwcm90ZWN0ZWQgZmllbGRzIGFuZCBzaG91bGQgdXNlIHRoZSBgc3RhdGU6IHRydWVgIG9wdGlvbi4gUHJvcGVydGllc1xuICAgKiBtYXJrZWQgYXMgYHN0YXRlYCBkbyBub3QgcmVmbGVjdCBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIGF0dHJpYnV0ZVxuICAgKlxuICAgKiBIb3dldmVyLCBzb21ldGltZXMgZWxlbWVudCBjb2RlIGRvZXMgbmVlZCB0byBzZXQgYSBwdWJsaWMgcHJvcGVydHkuIFRoaXNcbiAgICogc2hvdWxkIHR5cGljYWxseSBvbmx5IGJlIGRvbmUgaW4gcmVzcG9uc2UgdG8gdXNlciBpbnRlcmFjdGlvbiwgYW5kIGFuIGV2ZW50XG4gICAqIHNob3VsZCBiZSBmaXJlZCBpbmZvcm1pbmcgdGhlIHVzZXI7IGZvciBleGFtcGxlLCBhIGNoZWNrYm94IHNldHMgaXRzXG4gICAqIGBjaGVja2VkYCBwcm9wZXJ0eSB3aGVuIGNsaWNrZWQgYW5kIGZpcmVzIGEgYGNoYW5nZWRgIGV2ZW50LiBNdXRhdGluZ1xuICAgKiBwdWJsaWMgcHJvcGVydGllcyBzaG91bGQgdHlwaWNhbGx5IG5vdCBiZSBkb25lIGZvciBub24tcHJpbWl0aXZlIChvYmplY3Qgb3JcbiAgICogYXJyYXkpIHByb3BlcnRpZXMuIEluIG90aGVyIGNhc2VzIHdoZW4gYW4gZWxlbWVudCBuZWVkcyB0byBtYW5hZ2Ugc3RhdGUsIGFcbiAgICogcHJpdmF0ZSBwcm9wZXJ0eSBzZXQgd2l0aCB0aGUgYHN0YXRlOiB0cnVlYCBvcHRpb24gc2hvdWxkIGJlIHVzZWQuIFdoZW5cbiAgICogbmVlZGVkLCBzdGF0ZSBwcm9wZXJ0aWVzIGNhbiBiZSBpbml0aWFsaXplZCB2aWEgcHVibGljIHByb3BlcnRpZXMgdG9cbiAgICogZmFjaWxpdGF0ZSBjb21wbGV4IGludGVyYWN0aW9ucy5cbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHByb3BlcnRpZXNcbiAgICovXG4gIHN0YXRpYyBwcm9wZXJ0aWVzOiBQcm9wZXJ0eURlY2xhcmF0aW9ucztcblxuICAvKipcbiAgICogTWVtb2l6ZWQgbGlzdCBvZiBhbGwgZWxlbWVudCBzdHlsZXMuXG4gICAqIENyZWF0ZWQgbGF6aWx5IG9uIHVzZXIgc3ViY2xhc3NlcyB3aGVuIGZpbmFsaXppbmcgdGhlIGNsYXNzLlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKiBAY2F0ZWdvcnkgc3R5bGVzXG4gICAqL1xuICBzdGF0aWMgZWxlbWVudFN0eWxlczogQXJyYXk8Q1NTUmVzdWx0T3JOYXRpdmU+ID0gW107XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIHN0eWxlcyB0byBhcHBseSB0byB0aGUgZWxlbWVudC4gVGhlIHN0eWxlcyBzaG91bGQgYmUgZGVmaW5lZFxuICAgKiB1c2luZyB0aGUge0BsaW5rY29kZSBjc3N9IHRhZyBmdW5jdGlvbiwgdmlhIGNvbnN0cnVjdGlibGUgc3R5bGVzaGVldHMsIG9yXG4gICAqIGltcG9ydGVkIGZyb20gbmF0aXZlIENTUyBtb2R1bGUgc2NyaXB0cy5cbiAgICpcbiAgICogTm90ZSBvbiBDb250ZW50IFNlY3VyaXR5IFBvbGljeTpcbiAgICpcbiAgICogRWxlbWVudCBzdHlsZXMgYXJlIGltcGxlbWVudGVkIHdpdGggYDxzdHlsZT5gIHRhZ3Mgd2hlbiB0aGUgYnJvd3NlciBkb2Vzbid0XG4gICAqIHN1cHBvcnQgYWRvcHRlZCBTdHlsZVNoZWV0cy4gVG8gdXNlIHN1Y2ggYDxzdHlsZT5gIHRhZ3Mgd2l0aCB0aGUgc3R5bGUtc3JjXG4gICAqIENTUCBkaXJlY3RpdmUsIHRoZSBzdHlsZS1zcmMgdmFsdWUgbXVzdCBlaXRoZXIgaW5jbHVkZSAndW5zYWZlLWlubGluZScgb3JcbiAgICogYG5vbmNlLTxiYXNlNjQtdmFsdWU+YCB3aXRoIGA8YmFzZTY0LXZhbHVlPmAgcmVwbGFjZWQgYmUgYSBzZXJ2ZXItZ2VuZXJhdGVkXG4gICAqIG5vbmNlLlxuICAgKlxuICAgKiBUbyBwcm92aWRlIGEgbm9uY2UgdG8gdXNlIG9uIGdlbmVyYXRlZCBgPHN0eWxlPmAgZWxlbWVudHMsIHNldFxuICAgKiBgd2luZG93LmxpdE5vbmNlYCB0byBhIHNlcnZlci1nZW5lcmF0ZWQgbm9uY2UgaW4geW91ciBwYWdlJ3MgSFRNTCwgYmVmb3JlXG4gICAqIGxvYWRpbmcgYXBwbGljYXRpb24gY29kZTpcbiAgICpcbiAgICogYGBgaHRtbFxuICAgKiA8c2NyaXB0PlxuICAgKiAgIC8vIEdlbmVyYXRlZCBhbmQgdW5pcXVlIHBlciByZXF1ZXN0OlxuICAgKiAgIHdpbmRvdy5saXROb25jZSA9ICdhMWIyYzNkNCc7XG4gICAqIDwvc2NyaXB0PlxuICAgKiBgYGBcbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHN0eWxlc1xuICAgKi9cbiAgc3RhdGljIHN0eWxlcz86IENTU1Jlc3VsdEdyb3VwO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhdHRyaWJ1dGVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHJlZ2lzdGVyZWQgcHJvcGVydGllcy5cbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IGF0dHJpYnV0ZXNcbiAgICovXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIC8vIEVuc3VyZSB3ZSd2ZSBjcmVhdGVkIGFsbCBwcm9wZXJ0aWVzXG4gICAgdGhpcy5maW5hbGl6ZSgpO1xuICAgIC8vIHRoaXMuX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwIGlzIG9ubHkgdW5kZWZpbmVkIGFmdGVyIGZpbmFsaXplKCkgaW5cbiAgICAvLyBSZWFjdGl2ZUVsZW1lbnQgaXRzZWxmLiBSZWFjdGl2ZUVsZW1lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzIGlzIG9ubHlcbiAgICAvLyBhY2Nlc3NlZCB3aXRoIFJlYWN0aXZlRWxlbWVudCBhcyB0aGUgcmVjZWl2ZXIgd2hlbiBhIHN1YmNsYXNzIG9yIG1peGluXG4gICAgLy8gY2FsbHMgc3VwZXIub2JzZXJ2ZWRBdHRyaWJ1dGVzXG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwICYmIFsuLi50aGlzLl9fYXR0cmlidXRlVG9Qcm9wZXJ0eU1hcC5rZXlzKCldXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX19pbnN0YW5jZVByb3BlcnRpZXM/OiBQcm9wZXJ0eVZhbHVlcyA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHByb3BlcnR5IGFjY2Vzc29yIG9uIHRoZSBlbGVtZW50IHByb3RvdHlwZSBpZiBvbmUgZG9lcyBub3QgZXhpc3RcbiAgICogYW5kIHN0b3JlcyBhIHtAbGlua2NvZGUgUHJvcGVydHlEZWNsYXJhdGlvbn0gZm9yIHRoZSBwcm9wZXJ0eSB3aXRoIHRoZVxuICAgKiBnaXZlbiBvcHRpb25zLiBUaGUgcHJvcGVydHkgc2V0dGVyIGNhbGxzIHRoZSBwcm9wZXJ0eSdzIGBoYXNDaGFuZ2VkYFxuICAgKiBwcm9wZXJ0eSBvcHRpb24gb3IgdXNlcyBhIHN0cmljdCBpZGVudGl0eSBjaGVjayB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3RcbiAgICogdG8gcmVxdWVzdCBhbiB1cGRhdGUuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIG1heSBiZSBvdmVycmlkZGVuIHRvIGN1c3RvbWl6ZSBwcm9wZXJ0aWVzOyBob3dldmVyLFxuICAgKiB3aGVuIGRvaW5nIHNvLCBpdCdzIGltcG9ydGFudCB0byBjYWxsIGBzdXBlci5jcmVhdGVQcm9wZXJ0eWAgdG8gZW5zdXJlXG4gICAqIHRoZSBwcm9wZXJ0eSBpcyBzZXR1cCBjb3JyZWN0bHkuIFRoaXMgbWV0aG9kIGNhbGxzXG4gICAqIGBnZXRQcm9wZXJ0eURlc2NyaXB0b3JgIGludGVybmFsbHkgdG8gZ2V0IGEgZGVzY3JpcHRvciB0byBpbnN0YWxsLlxuICAgKiBUbyBjdXN0b21pemUgd2hhdCBwcm9wZXJ0aWVzIGRvIHdoZW4gdGhleSBhcmUgZ2V0IG9yIHNldCwgb3ZlcnJpZGVcbiAgICogYGdldFByb3BlcnR5RGVzY3JpcHRvcmAuIFRvIGN1c3RvbWl6ZSB0aGUgb3B0aW9ucyBmb3IgYSBwcm9wZXJ0eSxcbiAgICogaW1wbGVtZW50IGBjcmVhdGVQcm9wZXJ0eWAgbGlrZSB0aGlzOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBzdGF0aWMgY3JlYXRlUHJvcGVydHkobmFtZSwgb3B0aW9ucykge1xuICAgKiAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtteU9wdGlvbjogdHJ1ZX0pO1xuICAgKiAgIHN1cGVyLmNyZWF0ZVByb3BlcnR5KG5hbWUsIG9wdGlvbnMpO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKiBAY2F0ZWdvcnkgcHJvcGVydGllc1xuICAgKi9cbiAgc3RhdGljIGNyZWF0ZVByb3BlcnR5KFxuICAgIG5hbWU6IFByb3BlcnR5S2V5LFxuICAgIG9wdGlvbnM6IFByb3BlcnR5RGVjbGFyYXRpb24gPSBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvblxuICApIHtcbiAgICAvLyBJZiB0aGlzIGlzIGEgc3RhdGUgcHJvcGVydHksIGZvcmNlIHRoZSBhdHRyaWJ1dGUgdG8gZmFsc2UuXG4gICAgaWYgKG9wdGlvbnMuc3RhdGUpIHtcbiAgICAgIChvcHRpb25zIGFzIE11dGFibGU8UHJvcGVydHlEZWNsYXJhdGlvbiwgJ2F0dHJpYnV0ZSc+KS5hdHRyaWJ1dGUgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fX3ByZXBhcmUoKTtcbiAgICAvLyBXaGV0aGVyIHRoaXMgcHJvcGVydHkgaXMgd3JhcHBpbmcgYWNjZXNzb3JzLlxuICAgIC8vIEhlbHBzIGNvbnRyb2wgdGhlIGluaXRpYWwgdmFsdWUgY2hhbmdlIGFuZCByZWZsZWN0aW9uIGxvZ2ljLlxuICAgIGlmICh0aGlzLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgb3B0aW9ucyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyk7XG4gICAgICBvcHRpb25zLndyYXBwZWQgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLnNldChuYW1lLCBvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnMubm9BY2Nlc3Nvcikge1xuICAgICAgY29uc3Qga2V5ID0gREVWX01PREVcbiAgICAgICAgPyAvLyBVc2UgU3ltYm9sLmZvciBpbiBkZXYgbW9kZSB0byBtYWtlIGl0IGVhc2llciB0byBtYWludGFpbiBzdGF0ZVxuICAgICAgICAgIC8vIHdoZW4gZG9pbmcgSE1SLlxuICAgICAgICAgIFN5bWJvbC5mb3IoYCR7U3RyaW5nKG5hbWUpfSAoQHByb3BlcnR5KCkgY2FjaGUpYClcbiAgICAgICAgOiBTeW1ib2woKTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSB0aGlzLmdldFByb3BlcnR5RGVzY3JpcHRvcihuYW1lLCBrZXksIG9wdGlvbnMpO1xuICAgICAgaWYgKGRlc2NyaXB0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHRvIGJlIGRlZmluZWQgb24gdGhlIGdpdmVuIG5hbWVkIHByb3BlcnR5LlxuICAgKiBJZiBubyBkZXNjcmlwdG9yIGlzIHJldHVybmVkLCB0aGUgcHJvcGVydHkgd2lsbCBub3QgYmVjb21lIGFuIGFjY2Vzc29yLlxuICAgKiBGb3IgZXhhbXBsZSxcbiAgICpcbiAgICogYGBgdHNcbiAgICogY2xhc3MgTXlFbGVtZW50IGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gICAqICAgc3RhdGljIGdldFByb3BlcnR5RGVzY3JpcHRvcihuYW1lLCBrZXksIG9wdGlvbnMpIHtcbiAgICogICAgIGNvbnN0IGRlZmF1bHREZXNjcmlwdG9yID1cbiAgICogICAgICAgICBzdXBlci5nZXRQcm9wZXJ0eURlc2NyaXB0b3IobmFtZSwga2V5LCBvcHRpb25zKTtcbiAgICogICAgIGNvbnN0IHNldHRlciA9IGRlZmF1bHREZXNjcmlwdG9yLnNldDtcbiAgICogICAgIHJldHVybiB7XG4gICAqICAgICAgIGdldDogZGVmYXVsdERlc2NyaXB0b3IuZ2V0LFxuICAgKiAgICAgICBzZXQodmFsdWUpIHtcbiAgICogICAgICAgICBzZXR0ZXIuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAqICAgICAgICAgLy8gY3VzdG9tIGFjdGlvbi5cbiAgICogICAgICAgfSxcbiAgICogICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKiBAY2F0ZWdvcnkgcHJvcGVydGllc1xuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBnZXRQcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgbmFtZTogUHJvcGVydHlLZXksXG4gICAga2V5OiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgb3B0aW9uczogUHJvcGVydHlEZWNsYXJhdGlvblxuICApOiBQcm9wZXJ0eURlc2NyaXB0b3IgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHtnZXQsIHNldH0gPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcy5wcm90b3R5cGUsIG5hbWUpID8/IHtcbiAgICAgIGdldCh0aGlzOiBSZWFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5IGFzIGtleW9mIHR5cGVvZiB0aGlzXTtcbiAgICAgIH0sXG4gICAgICBzZXQodGhpczogUmVhY3RpdmVFbGVtZW50LCB2OiB1bmtub3duKSB7XG4gICAgICAgICh0aGlzIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgdW5rbm93bj4pW2tleV0gPSB2O1xuICAgICAgfSxcbiAgICB9O1xuICAgIGlmIChERVZfTU9ERSAmJiBnZXQgPT0gbnVsbCkge1xuICAgICAgaWYgKCd2YWx1ZScgaW4gKGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLnByb3RvdHlwZSwgbmFtZSkgPz8ge30pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgRmllbGQgJHtKU09OLnN0cmluZ2lmeShTdHJpbmcobmFtZSkpfSBvbiBgICtcbiAgICAgICAgICAgIGAke3RoaXMubmFtZX0gd2FzIGRlY2xhcmVkIGFzIGEgcmVhY3RpdmUgcHJvcGVydHkgYCArXG4gICAgICAgICAgICBgYnV0IGl0J3MgYWN0dWFsbHkgZGVjbGFyZWQgYXMgYSB2YWx1ZSBvbiB0aGUgcHJvdG90eXBlLiBgICtcbiAgICAgICAgICAgIGBVc3VhbGx5IHRoaXMgaXMgZHVlIHRvIHVzaW5nIEBwcm9wZXJ0eSBvciBAc3RhdGUgb24gYSBtZXRob2QuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaXNzdWVXYXJuaW5nKFxuICAgICAgICAncmVhY3RpdmUtcHJvcGVydHktd2l0aG91dC1nZXR0ZXInLFxuICAgICAgICBgRmllbGQgJHtKU09OLnN0cmluZ2lmeShTdHJpbmcobmFtZSkpfSBvbiBgICtcbiAgICAgICAgICBgJHt0aGlzLm5hbWV9IHdhcyBkZWNsYXJlZCBhcyBhIHJlYWN0aXZlIHByb3BlcnR5IGAgK1xuICAgICAgICAgIGBidXQgaXQgZG9lcyBub3QgaGF2ZSBhIGdldHRlci4gVGhpcyB3aWxsIGJlIGFuIGVycm9yIGluIGEgYCArXG4gICAgICAgICAgYGZ1dHVyZSB2ZXJzaW9uIG9mIExpdC5gXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZ2V0LFxuICAgICAgc2V0KHRoaXM6IFJlYWN0aXZlRWxlbWVudCwgdmFsdWU6IHVua25vd24pIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBnZXQ/LmNhbGwodGhpcyk7XG4gICAgICAgIHNldD8uY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMucmVxdWVzdFVwZGF0ZShuYW1lLCBvbGRWYWx1ZSwgb3B0aW9ucyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHByb3BlcnR5IG9wdGlvbnMgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAgICogVGhlc2Ugb3B0aW9ucyBhcmUgZGVmaW5lZCB3aXRoIGEgYFByb3BlcnR5RGVjbGFyYXRpb25gIHZpYSB0aGUgYHByb3BlcnRpZXNgXG4gICAqIG9iamVjdCBvciB0aGUgYEBwcm9wZXJ0eWAgZGVjb3JhdG9yIGFuZCBhcmUgcmVnaXN0ZXJlZCBpblxuICAgKiBgY3JlYXRlUHJvcGVydHkoLi4uKWAuXG4gICAqXG4gICAqIE5vdGUsIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBjb25zaWRlcmVkIFwiZmluYWxcIiBhbmQgbm90IG92ZXJyaWRkZW4uIFRvXG4gICAqIGN1c3RvbWl6ZSB0aGUgb3B0aW9ucyBmb3IgYSBnaXZlbiBwcm9wZXJ0eSwgb3ZlcnJpZGVcbiAgICoge0BsaW5rY29kZSBjcmVhdGVQcm9wZXJ0eX0uXG4gICAqXG4gICAqIEBub2NvbGxhcHNlXG4gICAqIEBmaW5hbFxuICAgKiBAY2F0ZWdvcnkgcHJvcGVydGllc1xuICAgKi9cbiAgc3RhdGljIGdldFByb3BlcnR5T3B0aW9ucyhuYW1lOiBQcm9wZXJ0eUtleSkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLmdldChuYW1lKSA/PyBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvbjtcbiAgfVxuXG4gIC8vIFRlbXBvcmFyeSwgdW50aWwgZ29vZ2xlMyBpcyBvbiBUeXBlU2NyaXB0IDUuMlxuICBkZWNsYXJlIHN0YXRpYyBbU3ltYm9sLm1ldGFkYXRhXTogb2JqZWN0ICYgUmVjb3JkPFByb3BlcnR5S2V5LCB1bmtub3duPjtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgc3RhdGljIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBjbGFzcyB1c2VkIGluIGJvb2trZWVwaW5nXG4gICAqIGZvciBlbGVtZW50IHByb3BlcnRpZXMsIGluaXRpYWxpemVycywgZXRjLlxuICAgKlxuICAgKiBDYW4gYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGJ5IGNvZGUgdGhhdCBuZWVkcyB0byBlbnN1cmUgdGhlc2VcbiAgICogcHJvcGVydGllcyBleGlzdCBiZWZvcmUgdXNpbmcgdGhlbS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZW5zdXJlcyB0aGUgc3VwZXJjbGFzcyBpcyBmaW5hbGl6ZWQgc28gdGhhdCBpbmhlcml0ZWRcbiAgICogcHJvcGVydHkgbWV0YWRhdGEgY2FuIGJlIGNvcGllZCBkb3duLlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgX19wcmVwYXJlKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnZWxlbWVudFByb3BlcnRpZXMnLCB0aGlzKSlcbiAgICApIHtcbiAgICAgIC8vIEFscmVhZHkgcHJlcGFyZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRmluYWxpemUgYW55IHN1cGVyY2xhc3Nlc1xuICAgIGNvbnN0IHN1cGVyQ3RvciA9IGdldFByb3RvdHlwZU9mKHRoaXMpIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQ7XG4gICAgc3VwZXJDdG9yLmZpbmFsaXplKCk7XG5cbiAgICAvLyBDcmVhdGUgb3duIHNldCBvZiBpbml0aWFsaXplcnMgZm9yIHRoaXMgY2xhc3MgaWYgYW55IGV4aXN0IG9uIHRoZVxuICAgIC8vIHN1cGVyY2xhc3MgYW5kIGNvcHkgdGhlbSBkb3duLiBOb3RlLCBmb3IgYSBzbWFsbCBwZXJmIGJvb3N0LCBhdm9pZFxuICAgIC8vIGNyZWF0aW5nIGluaXRpYWxpemVycyB1bmxlc3MgbmVlZGVkLlxuICAgIGlmIChzdXBlckN0b3IuX2luaXRpYWxpemVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9pbml0aWFsaXplcnMgPSBbLi4uc3VwZXJDdG9yLl9pbml0aWFsaXplcnNdO1xuICAgIH1cbiAgICAvLyBJbml0aWFsaXplIGVsZW1lbnRQcm9wZXJ0aWVzIGZyb20gdGhlIHN1cGVyY2xhc3NcbiAgICB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzID0gbmV3IE1hcChzdXBlckN0b3IuZWxlbWVudFByb3BlcnRpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmlzaGVzIHNldHRpbmcgdXAgdGhlIGNsYXNzIHNvIHRoYXQgaXQncyByZWFkeSB0byBiZSByZWdpc3RlcmVkXG4gICAqIGFzIGEgY3VzdG9tIGVsZW1lbnQgYW5kIGluc3RhbnRpYXRlZC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBSZWFjdGl2ZUVsZW1lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzIGdldHRlci5cbiAgICogSWYgeW91IG92ZXJyaWRlIHRoZSBvYnNlcnZlZEF0dHJpYnV0ZXMgZ2V0dGVyLCB5b3UgbXVzdCBlaXRoZXIgY2FsbFxuICAgKiBzdXBlci5vYnNlcnZlZEF0dHJpYnV0ZXMgdG8gdHJpZ2dlciBmaW5hbGl6YXRpb24sIG9yIGNhbGwgZmluYWxpemUoKVxuICAgKiB5b3Vyc2VsZi5cbiAgICpcbiAgICogQG5vY29sbGFwc2VcbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgZmluYWxpemUoKSB7XG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnZmluYWxpemVkJywgdGhpcykpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZmluYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl9fcHJlcGFyZSgpO1xuXG4gICAgLy8gQ3JlYXRlIHByb3BlcnRpZXMgZnJvbSB0aGUgc3RhdGljIHByb3BlcnRpZXMgYmxvY2s6XG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgncHJvcGVydGllcycsIHRoaXMpKSkge1xuICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BlcnRpZXM7XG4gICAgICBjb25zdCBwcm9wS2V5cyA9IFtcbiAgICAgICAgLi4uZ2V0T3duUHJvcGVydHlOYW1lcyhwcm9wcyksXG4gICAgICAgIC4uLmdldE93blByb3BlcnR5U3ltYm9scyhwcm9wcyksXG4gICAgICBdIGFzIEFycmF5PGtleW9mIHR5cGVvZiBwcm9wcz47XG4gICAgICBmb3IgKGNvbnN0IHAgb2YgcHJvcEtleXMpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVQcm9wZXJ0eShwLCBwcm9wc1twXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHByb3BlcnRpZXMgZnJvbSBzdGFuZGFyZCBkZWNvcmF0b3IgbWV0YWRhdGE6XG4gICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzW1N5bWJvbC5tZXRhZGF0YV07XG4gICAgaWYgKG1ldGFkYXRhICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0gbGl0UHJvcGVydHlNZXRhZGF0YS5nZXQobWV0YWRhdGEpO1xuICAgICAgaWYgKHByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtwLCBvcHRpb25zXSBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50UHJvcGVydGllcy5zZXQocCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIGF0dHJpYnV0ZS10by1wcm9wZXJ0eSBtYXBcbiAgICB0aGlzLl9fYXR0cmlidXRlVG9Qcm9wZXJ0eU1hcCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IFtwLCBvcHRpb25zXSBvZiB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzKSB7XG4gICAgICBjb25zdCBhdHRyID0gdGhpcy5fX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShwLCBvcHRpb25zKTtcbiAgICAgIGlmIChhdHRyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fX2F0dHJpYnV0ZVRvUHJvcGVydHlNYXAuc2V0KGF0dHIsIHApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudFN0eWxlcyA9IHRoaXMuZmluYWxpemVTdHlsZXModGhpcy5zdHlsZXMpO1xuXG4gICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eSgnY3JlYXRlUHJvcGVydHknKSkge1xuICAgICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICAgJ25vLW92ZXJyaWRlLWNyZWF0ZS1wcm9wZXJ0eScsXG4gICAgICAgICAgJ092ZXJyaWRpbmcgUmVhY3RpdmVFbGVtZW50LmNyZWF0ZVByb3BlcnR5KCkgaXMgZGVwcmVjYXRlZC4gJyArXG4gICAgICAgICAgICAnVGhlIG92ZXJyaWRlIHdpbGwgbm90IGJlIGNhbGxlZCB3aXRoIHN0YW5kYXJkIGRlY29yYXRvcnMnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eSgnZ2V0UHJvcGVydHlEZXNjcmlwdG9yJykpIHtcbiAgICAgICAgaXNzdWVXYXJuaW5nKFxuICAgICAgICAgICduby1vdmVycmlkZS1nZXQtcHJvcGVydHktZGVzY3JpcHRvcicsXG4gICAgICAgICAgJ092ZXJyaWRpbmcgUmVhY3RpdmVFbGVtZW50LmdldFByb3BlcnR5RGVzY3JpcHRvcigpIGlzIGRlcHJlY2F0ZWQuICcgK1xuICAgICAgICAgICAgJ1RoZSBvdmVycmlkZSB3aWxsIG5vdCBiZSBjYWxsZWQgd2l0aCBzdGFuZGFyZCBkZWNvcmF0b3JzJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcHRpb25zIHVzZWQgd2hlbiBjYWxsaW5nIGBhdHRhY2hTaGFkb3dgLiBTZXQgdGhpcyBwcm9wZXJ0eSB0byBjdXN0b21pemVcbiAgICogdGhlIG9wdGlvbnMgZm9yIHRoZSBzaGFkb3dSb290OyBmb3IgZXhhbXBsZSwgdG8gY3JlYXRlIGEgY2xvc2VkXG4gICAqIHNoYWRvd1Jvb3Q6IGB7bW9kZTogJ2Nsb3NlZCd9YC5cbiAgICpcbiAgICogTm90ZSwgdGhlc2Ugb3B0aW9ucyBhcmUgdXNlZCBpbiBgY3JlYXRlUmVuZGVyUm9vdGAuIElmIHRoaXMgbWV0aG9kXG4gICAqIGlzIGN1c3RvbWl6ZWQsIG9wdGlvbnMgc2hvdWxkIGJlIHJlc3BlY3RlZCBpZiBwb3NzaWJsZS5cbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgc3RhdGljIHNoYWRvd1Jvb3RPcHRpb25zOiBTaGFkb3dSb290SW5pdCA9IHttb2RlOiAnb3Blbid9O1xuXG4gIC8qKlxuICAgKiBUYWtlcyB0aGUgc3R5bGVzIHRoZSB1c2VyIHN1cHBsaWVkIHZpYSB0aGUgYHN0YXRpYyBzdHlsZXNgIHByb3BlcnR5IGFuZFxuICAgKiByZXR1cm5zIHRoZSBhcnJheSBvZiBzdHlsZXMgdG8gYXBwbHkgdG8gdGhlIGVsZW1lbnQuXG4gICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGludGVncmF0ZSBpbnRvIGEgc3R5bGUgbWFuYWdlbWVudCBzeXN0ZW0uXG4gICAqXG4gICAqIFN0eWxlcyBhcmUgZGVkdXBsaWNhdGVkIHByZXNlcnZpbmcgdGhlIF9sYXN0XyBpbnN0YW5jZSBpbiB0aGUgbGlzdC4gVGhpc1xuICAgKiBpcyBhIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbiB0byBhdm9pZCBkdXBsaWNhdGVkIHN0eWxlcyB0aGF0IGNhbiBvY2N1clxuICAgKiBlc3BlY2lhbGx5IHdoZW4gY29tcG9zaW5nIHZpYSBzdWJjbGFzc2luZy4gVGhlIGxhc3QgaXRlbSBpcyBrZXB0IHRvIHRyeVxuICAgKiB0byBwcmVzZXJ2ZSB0aGUgY2FzY2FkZSBvcmRlciB3aXRoIHRoZSBhc3N1bXB0aW9uIHRoYXQgaXQncyBtb3N0IGltcG9ydGFudFxuICAgKiB0aGF0IGxhc3QgYWRkZWQgc3R5bGVzIG92ZXJyaWRlIHByZXZpb3VzIHN0eWxlcy5cbiAgICpcbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHN0eWxlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBmaW5hbGl6ZVN0eWxlcyhcbiAgICBzdHlsZXM/OiBDU1NSZXN1bHRHcm91cFxuICApOiBBcnJheTxDU1NSZXN1bHRPck5hdGl2ZT4ge1xuICAgIGNvbnN0IGVsZW1lbnRTdHlsZXMgPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZXMpKSB7XG4gICAgICAvLyBEZWR1cGUgdGhlIGZsYXR0ZW5lZCBhcnJheSBpbiByZXZlcnNlIG9yZGVyIHRvIHByZXNlcnZlIHRoZSBsYXN0IGl0ZW1zLlxuICAgICAgLy8gQ2FzdGluZyB0byBBcnJheTx1bmtub3duPiB3b3JrcyBhcm91bmQgVFMgZXJyb3IgdGhhdFxuICAgICAgLy8gYXBwZWFycyB0byBjb21lIGZyb20gdHJ5aW5nIHRvIGZsYXR0ZW4gYSB0eXBlIENTU1Jlc3VsdEFycmF5LlxuICAgICAgY29uc3Qgc2V0ID0gbmV3IFNldCgoc3R5bGVzIGFzIEFycmF5PHVua25vd24+KS5mbGF0KEluZmluaXR5KS5yZXZlcnNlKCkpO1xuICAgICAgLy8gVGhlbiBwcmVzZXJ2ZSBvcmlnaW5hbCBvcmRlciBieSBhZGRpbmcgdGhlIHNldCBpdGVtcyBpbiByZXZlcnNlIG9yZGVyLlxuICAgICAgZm9yIChjb25zdCBzIG9mIHNldCkge1xuICAgICAgICBlbGVtZW50U3R5bGVzLnVuc2hpZnQoZ2V0Q29tcGF0aWJsZVN0eWxlKHMgYXMgQ1NTUmVzdWx0T3JOYXRpdmUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0eWxlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbGVtZW50U3R5bGVzLnB1c2goZ2V0Q29tcGF0aWJsZVN0eWxlKHN0eWxlcykpO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudFN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBOb2RlIG9yIFNoYWRvd1Jvb3QgaW50byB3aGljaCBlbGVtZW50IERPTSBzaG91bGQgYmUgcmVuZGVyZWQuIERlZmF1bHRzXG4gICAqIHRvIGFuIG9wZW4gc2hhZG93Um9vdC5cbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcmVhZG9ubHkgcmVuZGVyUm9vdCE6IEhUTUxFbGVtZW50IHwgRG9jdW1lbnRGcmFnbWVudDtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGdpdmVuIGF0dHJpYnV0ZSBgbmFtZWAuXG4gICAqIEBub2NvbGxhcHNlXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBfX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShcbiAgICBuYW1lOiBQcm9wZXJ0eUtleSxcbiAgICBvcHRpb25zOiBQcm9wZXJ0eURlY2xhcmF0aW9uXG4gICkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG9wdGlvbnMuYXR0cmlidXRlO1xuICAgIHJldHVybiBhdHRyaWJ1dGUgPT09IGZhbHNlXG4gICAgICA/IHVuZGVmaW5lZFxuICAgICAgOiB0eXBlb2YgYXR0cmlidXRlID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGF0dHJpYnV0ZVxuICAgICAgICA6IHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJ1xuICAgICAgICAgID8gbmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBJbml0aWFsaXplIHRvIGFuIHVucmVzb2x2ZWQgUHJvbWlzZSBzbyB3ZSBjYW4gbWFrZSBzdXJlIHRoZSBlbGVtZW50IGhhc1xuICAvLyBjb25uZWN0ZWQgYmVmb3JlIGZpcnN0IHVwZGF0ZS5cbiAgcHJpdmF0ZSBfX3VwZGF0ZVByb21pc2UhOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZXJlIGlzIGEgcGVuZGluZyB1cGRhdGUgYXMgYSByZXN1bHQgb2YgY2FsbGluZyBgcmVxdWVzdFVwZGF0ZSgpYC5cbiAgICogU2hvdWxkIG9ubHkgYmUgcmVhZC5cbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIGlzVXBkYXRlUGVuZGluZyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJcyBzZXQgdG8gYHRydWVgIGFmdGVyIHRoZSBmaXJzdCB1cGRhdGUuIFRoZSBlbGVtZW50IGNvZGUgY2Fubm90IGFzc3VtZVxuICAgKiB0aGF0IGByZW5kZXJSb290YCBleGlzdHMgYmVmb3JlIHRoZSBlbGVtZW50IGBoYXNVcGRhdGVkYC5cbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIGhhc1VwZGF0ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogTWFwIHdpdGgga2V5cyBmb3IgYW55IHByb3BlcnRpZXMgdGhhdCBoYXZlIGNoYW5nZWQgc2luY2UgdGhlIGxhc3RcbiAgICogdXBkYXRlIGN5Y2xlIHdpdGggcHJldmlvdXMgdmFsdWVzLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF8kY2hhbmdlZFByb3BlcnRpZXMhOiBQcm9wZXJ0eVZhbHVlcztcblxuICAvKipcbiAgICogUmVjb3JkcyBwcm9wZXJ0eSBkZWZhdWx0IHZhbHVlcyB3aGVuIHRoZVxuICAgKiBgdXNlRGVmYXVsdGAgb3B0aW9uIGlzIHVzZWQuXG4gICAqL1xuICBwcml2YXRlIF9fZGVmYXVsdFZhbHVlcz86IE1hcDxQcm9wZXJ0eUtleSwgdW5rbm93bj47XG5cbiAgLyoqXG4gICAqIFByb3BlcnRpZXMgdGhhdCBzaG91bGQgYmUgcmVmbGVjdGVkIHdoZW4gdXBkYXRlZC5cbiAgICovXG4gIHByaXZhdGUgX19yZWZsZWN0aW5nUHJvcGVydGllcz86IFNldDxQcm9wZXJ0eUtleT47XG5cbiAgLyoqXG4gICAqIE5hbWUgb2YgY3VycmVudGx5IHJlZmxlY3RpbmcgcHJvcGVydHlcbiAgICovXG4gIHByaXZhdGUgX19yZWZsZWN0aW5nUHJvcGVydHk6IFByb3BlcnR5S2V5IHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFNldCBvZiBjb250cm9sbGVycy5cbiAgICovXG4gIHByaXZhdGUgX19jb250cm9sbGVycz86IFNldDxSZWFjdGl2ZUNvbnRyb2xsZXI+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fX2luaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCBvbmx5IG92ZXJyaWRlIHBvaW50IGZvciBjdXN0b21pemluZyB3b3JrIGRvbmUgd2hlbiBlbGVtZW50c1xuICAgKiBhcmUgY29uc3RydWN0ZWQuXG4gICAqL1xuICBwcml2YXRlIF9faW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLl9fdXBkYXRlUHJvbWlzZSA9IG5ldyBQcm9taXNlPGJvb2xlYW4+KFxuICAgICAgKHJlcykgPT4gKHRoaXMuZW5hYmxlVXBkYXRpbmcgPSByZXMpXG4gICAgKTtcbiAgICB0aGlzLl8kY2hhbmdlZFByb3BlcnRpZXMgPSBuZXcgTWFwKCk7XG4gICAgLy8gVGhpcyBlbnF1ZXVlcyBhIG1pY3JvdGFzayB0aGF0IG11c3QgcnVuIGJlZm9yZSB0aGUgZmlyc3QgdXBkYXRlLCBzbyBpdFxuICAgIC8vIG11c3QgYmUgY2FsbGVkIGJlZm9yZSByZXF1ZXN0VXBkYXRlKClcbiAgICB0aGlzLl9fc2F2ZUluc3RhbmNlUHJvcGVydGllcygpO1xuICAgIC8vIGVuc3VyZXMgZmlyc3QgdXBkYXRlIHdpbGwgYmUgY2F1Z2h0IGJ5IGFuIGVhcmx5IGFjY2VzcyBvZlxuICAgIC8vIGB1cGRhdGVDb21wbGV0ZWBcbiAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgICAodGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50KS5faW5pdGlhbGl6ZXJzPy5mb3JFYWNoKChpKSA9PlxuICAgICAgaSh0aGlzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgYFJlYWN0aXZlQ29udHJvbGxlcmAgdG8gcGFydGljaXBhdGUgaW4gdGhlIGVsZW1lbnQncyByZWFjdGl2ZVxuICAgKiB1cGRhdGUgY3ljbGUuIFRoZSBlbGVtZW50IGF1dG9tYXRpY2FsbHkgY2FsbHMgaW50byBhbnkgcmVnaXN0ZXJlZFxuICAgKiBjb250cm9sbGVycyBkdXJpbmcgaXRzIGxpZmVjeWNsZSBjYWxsYmFja3MuXG4gICAqXG4gICAqIElmIHRoZSBlbGVtZW50IGlzIGNvbm5lY3RlZCB3aGVuIGBhZGRDb250cm9sbGVyKClgIGlzIGNhbGxlZCwgdGhlXG4gICAqIGNvbnRyb2xsZXIncyBgaG9zdENvbm5lY3RlZCgpYCBjYWxsYmFjayB3aWxsIGJlIGltbWVkaWF0ZWx5IGNhbGxlZC5cbiAgICogQGNhdGVnb3J5IGNvbnRyb2xsZXJzXG4gICAqL1xuICBhZGRDb250cm9sbGVyKGNvbnRyb2xsZXI6IFJlYWN0aXZlQ29udHJvbGxlcikge1xuICAgICh0aGlzLl9fY29udHJvbGxlcnMgPz89IG5ldyBTZXQoKSkuYWRkKGNvbnRyb2xsZXIpO1xuICAgIC8vIElmIGEgY29udHJvbGxlciBpcyBhZGRlZCBhZnRlciB0aGUgZWxlbWVudCBoYXMgYmVlbiBjb25uZWN0ZWQsXG4gICAgLy8gY2FsbCBob3N0Q29ubmVjdGVkLiBOb3RlLCByZS11c2luZyBleGlzdGVuY2Ugb2YgYHJlbmRlclJvb3RgIGhlcmVcbiAgICAvLyAod2hpY2ggaXMgc2V0IGluIGNvbm5lY3RlZENhbGxiYWNrKSB0byBhdm9pZCB0aGUgbmVlZCB0byB0cmFjayBhXG4gICAgLy8gZmlyc3QgY29ubmVjdGVkIHN0YXRlLlxuICAgIGlmICh0aGlzLnJlbmRlclJvb3QgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmlzQ29ubmVjdGVkKSB7XG4gICAgICBjb250cm9sbGVyLmhvc3RDb25uZWN0ZWQ/LigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgYFJlYWN0aXZlQ29udHJvbGxlcmAgZnJvbSB0aGUgZWxlbWVudC5cbiAgICogQGNhdGVnb3J5IGNvbnRyb2xsZXJzXG4gICAqL1xuICByZW1vdmVDb250cm9sbGVyKGNvbnRyb2xsZXI6IFJlYWN0aXZlQ29udHJvbGxlcikge1xuICAgIHRoaXMuX19jb250cm9sbGVycz8uZGVsZXRlKGNvbnRyb2xsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpeGVzIGFueSBwcm9wZXJ0aWVzIHNldCBvbiB0aGUgaW5zdGFuY2UgYmVmb3JlIHVwZ3JhZGUgdGltZS5cbiAgICogT3RoZXJ3aXNlIHRoZXNlIHdvdWxkIHNoYWRvdyB0aGUgYWNjZXNzb3IgYW5kIGJyZWFrIHRoZXNlIHByb3BlcnRpZXMuXG4gICAqIFRoZSBwcm9wZXJ0aWVzIGFyZSBzdG9yZWQgaW4gYSBNYXAgd2hpY2ggaXMgcGxheWVkIGJhY2sgYWZ0ZXIgdGhlXG4gICAqIGNvbnN0cnVjdG9yIHJ1bnMuXG4gICAqL1xuICBwcml2YXRlIF9fc2F2ZUluc3RhbmNlUHJvcGVydGllcygpIHtcbiAgICBjb25zdCBpbnN0YW5jZVByb3BlcnRpZXMgPSBuZXcgTWFwPFByb3BlcnR5S2V5LCB1bmtub3duPigpO1xuICAgIGNvbnN0IGVsZW1lbnRQcm9wZXJ0aWVzID0gKHRoaXMuY29uc3RydWN0b3IgYXMgdHlwZW9mIFJlYWN0aXZlRWxlbWVudClcbiAgICAgIC5lbGVtZW50UHJvcGVydGllcztcbiAgICBmb3IgKGNvbnN0IHAgb2YgZWxlbWVudFByb3BlcnRpZXMua2V5cygpIGFzIEl0ZXJhYmxlSXRlcmF0b3I8a2V5b2YgdGhpcz4pIHtcbiAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgIGluc3RhbmNlUHJvcGVydGllcy5zZXQocCwgdGhpc1twXSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzW3BdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaW5zdGFuY2VQcm9wZXJ0aWVzLnNpemUgPiAwKSB7XG4gICAgICB0aGlzLl9faW5zdGFuY2VQcm9wZXJ0aWVzID0gaW5zdGFuY2VQcm9wZXJ0aWVzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBub2RlIGludG8gd2hpY2ggdGhlIGVsZW1lbnQgc2hvdWxkIHJlbmRlciBhbmQgYnkgZGVmYXVsdFxuICAgKiBjcmVhdGVzIGFuZCByZXR1cm5zIGFuIG9wZW4gc2hhZG93Um9vdC4gSW1wbGVtZW50IHRvIGN1c3RvbWl6ZSB3aGVyZSB0aGVcbiAgICogZWxlbWVudCdzIERPTSBpcyByZW5kZXJlZC4gRm9yIGV4YW1wbGUsIHRvIHJlbmRlciBpbnRvIHRoZSBlbGVtZW50J3NcbiAgICogY2hpbGROb2RlcywgcmV0dXJuIGB0aGlzYC5cbiAgICpcbiAgICogQHJldHVybiBSZXR1cm5zIGEgbm9kZSBpbnRvIHdoaWNoIHRvIHJlbmRlci5cbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZVJlbmRlclJvb3QoKTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50IHtcbiAgICBjb25zdCByZW5kZXJSb290ID1cbiAgICAgIHRoaXMuc2hhZG93Um9vdCA/P1xuICAgICAgdGhpcy5hdHRhY2hTaGFkb3coXG4gICAgICAgICh0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpLnNoYWRvd1Jvb3RPcHRpb25zXG4gICAgICApO1xuICAgIGFkb3B0U3R5bGVzKFxuICAgICAgcmVuZGVyUm9vdCxcbiAgICAgICh0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpLmVsZW1lbnRTdHlsZXNcbiAgICApO1xuICAgIHJldHVybiByZW5kZXJSb290O1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIGZpcnN0IGNvbm5lY3Rpb24sIGNyZWF0ZXMgdGhlIGVsZW1lbnQncyByZW5kZXJSb290LCBzZXRzIHVwXG4gICAqIGVsZW1lbnQgc3R5bGluZywgYW5kIGVuYWJsZXMgdXBkYXRpbmcuXG4gICAqIEBjYXRlZ29yeSBsaWZlY3ljbGVcbiAgICovXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIENyZWF0ZSByZW5kZXJSb290IGJlZm9yZSBjb250cm9sbGVycyBgaG9zdENvbm5lY3RlZGBcbiAgICAodGhpcyBhcyBNdXRhYmxlPHR5cGVvZiB0aGlzLCAncmVuZGVyUm9vdCc+KS5yZW5kZXJSb290ID8/PVxuICAgICAgdGhpcy5jcmVhdGVSZW5kZXJSb290KCk7XG4gICAgdGhpcy5lbmFibGVVcGRhdGluZyh0cnVlKTtcbiAgICB0aGlzLl9fY29udHJvbGxlcnM/LmZvckVhY2goKGMpID0+IGMuaG9zdENvbm5lY3RlZD8uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdGUsIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBjb25zaWRlcmVkIGZpbmFsIGFuZCBub3Qgb3ZlcnJpZGRlbi4gSXQgaXNcbiAgICogb3ZlcnJpZGRlbiBvbiB0aGUgZWxlbWVudCBpbnN0YW5jZSB3aXRoIGEgZnVuY3Rpb24gdGhhdCB0cmlnZ2VycyB0aGUgZmlyc3RcbiAgICogdXBkYXRlLlxuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIGVuYWJsZVVwZGF0aW5nKF9yZXF1ZXN0ZWRVcGRhdGU6IGJvb2xlYW4pIHt9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBmb3IgYHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKClgIGluIGV4dGVuc2lvbnMgd2hpbGVcbiAgICogcmVzZXJ2aW5nIHRoZSBwb3NzaWJpbGl0eSBvZiBtYWtpbmcgbm9uLWJyZWFraW5nIGZlYXR1cmUgYWRkaXRpb25zXG4gICAqIHdoZW4gZGlzY29ubmVjdGluZyBhdCBzb21lIHBvaW50IGluIHRoZSBmdXR1cmUuXG4gICAqIEBjYXRlZ29yeSBsaWZlY3ljbGVcbiAgICovXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuX19jb250cm9sbGVycz8uZm9yRWFjaCgoYykgPT4gYy5ob3N0RGlzY29ubmVjdGVkPy4oKSk7XG4gIH1cblxuICAvKipcbiAgICogU3luY2hyb25pemVzIHByb3BlcnR5IHZhbHVlcyB3aGVuIGF0dHJpYnV0ZXMgY2hhbmdlLlxuICAgKlxuICAgKiBTcGVjaWZpY2FsbHksIHdoZW4gYW4gYXR0cmlidXRlIGlzIHNldCwgdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgaXMgc2V0LlxuICAgKiBZb3Ugc2hvdWxkIHJhcmVseSBuZWVkIHRvIGltcGxlbWVudCB0aGlzIGNhbGxiYWNrLiBJZiB0aGlzIG1ldGhvZCBpc1xuICAgKiBvdmVycmlkZGVuLCBgc3VwZXIuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIF9vbGQsIHZhbHVlKWAgbXVzdCBiZVxuICAgKiBjYWxsZWQuXG4gICAqXG4gICAqIFNlZSBbcmVzcG9uZGluZyB0byBhdHRyaWJ1dGUgY2hhbmdlc10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9jb21wb25lbnRzL1VzaW5nX2N1c3RvbV9lbGVtZW50cyNyZXNwb25kaW5nX3RvX2F0dHJpYnV0ZV9jaGFuZ2VzKVxuICAgKiBvbiBNRE4gZm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tgLlxuICAgKiBAY2F0ZWdvcnkgYXR0cmlidXRlc1xuICAgKi9cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBfb2xkOiBzdHJpbmcgfCBudWxsLFxuICAgIHZhbHVlOiBzdHJpbmcgfCBudWxsXG4gICkge1xuICAgIHRoaXMuXyRhdHRyaWJ1dGVUb1Byb3BlcnR5KG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX19wcm9wZXJ0eVRvQXR0cmlidXRlKG5hbWU6IFByb3BlcnR5S2V5LCB2YWx1ZTogdW5rbm93bikge1xuICAgIGNvbnN0IGVsZW1Qcm9wZXJ0aWVzOiBQcm9wZXJ0eURlY2xhcmF0aW9uTWFwID0gKFxuICAgICAgdGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50XG4gICAgKS5lbGVtZW50UHJvcGVydGllcztcbiAgICBjb25zdCBvcHRpb25zID0gZWxlbVByb3BlcnRpZXMuZ2V0KG5hbWUpITtcbiAgICBjb25zdCBhdHRyID0gKFxuICAgICAgdGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50XG4gICAgKS5fX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShuYW1lLCBvcHRpb25zKTtcbiAgICBpZiAoYXR0ciAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVmbGVjdCA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgY29udmVydGVyID1cbiAgICAgICAgKG9wdGlvbnMuY29udmVydGVyIGFzIENvbXBsZXhBdHRyaWJ1dGVDb252ZXJ0ZXIpPy50b0F0dHJpYnV0ZSAhPT1cbiAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICAgPyAob3B0aW9ucy5jb252ZXJ0ZXIgYXMgQ29tcGxleEF0dHJpYnV0ZUNvbnZlcnRlcilcbiAgICAgICAgICA6IGRlZmF1bHRDb252ZXJ0ZXI7XG4gICAgICBjb25zdCBhdHRyVmFsdWUgPSBjb252ZXJ0ZXIudG9BdHRyaWJ1dGUhKHZhbHVlLCBvcHRpb25zLnR5cGUpO1xuICAgICAgaWYgKFxuICAgICAgICBERVZfTU9ERSAmJlxuICAgICAgICAodGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50KS5lbmFibGVkV2FybmluZ3MhLmluY2x1ZGVzKFxuICAgICAgICAgICdtaWdyYXRpb24nXG4gICAgICAgICkgJiZcbiAgICAgICAgYXR0clZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgICkge1xuICAgICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICAgJ3VuZGVmaW5lZC1hdHRyaWJ1dGUtdmFsdWUnLFxuICAgICAgICAgIGBUaGUgYXR0cmlidXRlIHZhbHVlIGZvciB0aGUgJHtuYW1lIGFzIHN0cmluZ30gcHJvcGVydHkgaXMgYCArXG4gICAgICAgICAgICBgdW5kZWZpbmVkIG9uIGVsZW1lbnQgJHt0aGlzLmxvY2FsTmFtZX0uIFRoZSBhdHRyaWJ1dGUgd2lsbCBiZSBgICtcbiAgICAgICAgICAgIGByZW1vdmVkLCBidXQgaW4gdGhlIHByZXZpb3VzIHZlcnNpb24gb2YgXFxgUmVhY3RpdmVFbGVtZW50XFxgLCBgICtcbiAgICAgICAgICAgIGB0aGUgYXR0cmlidXRlIHdvdWxkIG5vdCBoYXZlIGNoYW5nZWQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gVHJhY2sgaWYgdGhlIHByb3BlcnR5IGlzIGJlaW5nIHJlZmxlY3RlZCB0byBhdm9pZFxuICAgICAgLy8gc2V0dGluZyB0aGUgcHJvcGVydHkgYWdhaW4gdmlhIGBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tgLiBOb3RlOlxuICAgICAgLy8gMS4gdGhpcyB0YWtlcyBhZHZhbnRhZ2Ugb2YgdGhlIGZhY3QgdGhhdCB0aGUgY2FsbGJhY2sgaXMgc3luY2hyb25vdXMuXG4gICAgICAvLyAyLiB3aWxsIGJlaGF2ZSBpbmNvcnJlY3RseSBpZiBtdWx0aXBsZSBhdHRyaWJ1dGVzIGFyZSBpbiB0aGUgcmVhY3Rpb25cbiAgICAgIC8vIHN0YWNrIGF0IHRpbWUgb2YgY2FsbGluZy4gSG93ZXZlciwgc2luY2Ugd2UgcHJvY2VzcyBhdHRyaWJ1dGVzXG4gICAgICAvLyBpbiBgdXBkYXRlYCB0aGlzIHNob3VsZCBub3QgYmUgcG9zc2libGUgKG9yIGFuIGV4dHJlbWUgY29ybmVyIGNhc2VcbiAgICAgIC8vIHRoYXQgd2UnZCBsaWtlIHRvIGRpc2NvdmVyKS5cbiAgICAgIC8vIG1hcmsgc3RhdGUgcmVmbGVjdGluZ1xuICAgICAgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSA9IG5hbWU7XG4gICAgICBpZiAoYXR0clZhbHVlID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsdWUgYXMgc3RyaW5nKTtcbiAgICAgIH1cbiAgICAgIC8vIG1hcmsgc3RhdGUgbm90IHJlZmxlY3RpbmdcbiAgICAgIHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydHkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRhdHRyaWJ1dGVUb1Byb3BlcnR5KG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bGwpIHtcbiAgICBjb25zdCBjdG9yID0gdGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50O1xuICAgIC8vIE5vdGUsIGhpbnQgdGhpcyBhcyBhbiBgQXR0cmlidXRlTWFwYCBzbyBjbG9zdXJlIGNsZWFybHkgdW5kZXJzdGFuZHNcbiAgICAvLyB0aGUgdHlwZTsgaXQgaGFzIGlzc3VlcyB3aXRoIHRyYWNraW5nIHR5cGVzIHRocm91Z2ggc3RhdGljc1xuICAgIGNvbnN0IHByb3BOYW1lID0gKGN0b3IuX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwIGFzIEF0dHJpYnV0ZU1hcCkuZ2V0KG5hbWUpO1xuICAgIC8vIFVzZSB0cmFja2luZyBpbmZvIHRvIGF2b2lkIHJlZmxlY3RpbmcgYSBwcm9wZXJ0eSB2YWx1ZSB0byBhbiBhdHRyaWJ1dGVcbiAgICAvLyBpZiBpdCB3YXMganVzdCBzZXQgYmVjYXVzZSB0aGUgYXR0cmlidXRlIGNoYW5nZWQuXG4gICAgaWYgKHByb3BOYW1lICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSAhPT0gcHJvcE5hbWUpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBjdG9yLmdldFByb3BlcnR5T3B0aW9ucyhwcm9wTmFtZSk7XG4gICAgICBjb25zdCBjb252ZXJ0ZXIgPVxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5jb252ZXJ0ZXIgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHtmcm9tQXR0cmlidXRlOiBvcHRpb25zLmNvbnZlcnRlcn1cbiAgICAgICAgICA6IG9wdGlvbnMuY29udmVydGVyPy5mcm9tQXR0cmlidXRlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gb3B0aW9ucy5jb252ZXJ0ZXJcbiAgICAgICAgICAgIDogZGVmYXVsdENvbnZlcnRlcjtcbiAgICAgIC8vIG1hcmsgc3RhdGUgcmVmbGVjdGluZ1xuICAgICAgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSA9IHByb3BOYW1lO1xuICAgICAgY29uc3QgY29udmVydGVkVmFsdWUgPSBjb252ZXJ0ZXIuZnJvbUF0dHJpYnV0ZSEodmFsdWUsIG9wdGlvbnMudHlwZSk7XG4gICAgICB0aGlzW3Byb3BOYW1lIGFzIGtleW9mIHRoaXNdID1cbiAgICAgICAgY29udmVydGVkVmFsdWUgPz9cbiAgICAgICAgdGhpcy5fX2RlZmF1bHRWYWx1ZXM/LmdldChwcm9wTmFtZSkgPz9cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgKGNvbnZlcnRlZFZhbHVlIGFzIGFueSk7XG4gICAgICAvLyBtYXJrIHN0YXRlIG5vdCByZWZsZWN0aW5nXG4gICAgICB0aGlzLl9fcmVmbGVjdGluZ1Byb3BlcnR5ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVxdWVzdHMgYW4gdXBkYXRlIHdoaWNoIGlzIHByb2Nlc3NlZCBhc3luY2hyb25vdXNseS4gVGhpcyBzaG91bGQgYmUgY2FsbGVkXG4gICAqIHdoZW4gYW4gZWxlbWVudCBzaG91bGQgdXBkYXRlIGJhc2VkIG9uIHNvbWUgc3RhdGUgbm90IHRyaWdnZXJlZCBieSBzZXR0aW5nXG4gICAqIGEgcmVhY3RpdmUgcHJvcGVydHkuIEluIHRoaXMgY2FzZSwgcGFzcyBubyBhcmd1bWVudHMuIEl0IHNob3VsZCBhbHNvIGJlXG4gICAqIGNhbGxlZCB3aGVuIG1hbnVhbGx5IGltcGxlbWVudGluZyBhIHByb3BlcnR5IHNldHRlci4gSW4gdGhpcyBjYXNlLCBwYXNzIHRoZVxuICAgKiBwcm9wZXJ0eSBgbmFtZWAgYW5kIGBvbGRWYWx1ZWAgdG8gZW5zdXJlIHRoYXQgYW55IGNvbmZpZ3VyZWQgcHJvcGVydHlcbiAgICogb3B0aW9ucyBhcmUgaG9ub3JlZC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgbmFtZSBvZiByZXF1ZXN0aW5nIHByb3BlcnR5XG4gICAqIEBwYXJhbSBvbGRWYWx1ZSBvbGQgdmFsdWUgb2YgcmVxdWVzdGluZyBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gb3B0aW9ucyBwcm9wZXJ0eSBvcHRpb25zIHRvIHVzZSBpbnN0ZWFkIG9mIHRoZSBwcmV2aW91c2x5XG4gICAqICAgICBjb25maWd1cmVkIG9wdGlvbnNcbiAgICogQHBhcmFtIHVzZU5ld1ZhbHVlIGlmIHRydWUsIHRoZSBuZXdWYWx1ZSBhcmd1bWVudCBpcyB1c2VkIGluc3RlYWQgb2ZcbiAgICogICAgIHJlYWRpbmcgdGhlIHByb3BlcnR5IHZhbHVlLiBUaGlzIGlzIGltcG9ydGFudCB0byB1c2UgaWYgdGhlIHJlYWN0aXZlXG4gICAqICAgICBwcm9wZXJ0eSBpcyBhIHN0YW5kYXJkIHByaXZhdGUgYWNjZXNzb3IsIGFzIG9wcG9zZWQgdG8gYSBwbGFpblxuICAgKiAgICAgcHJvcGVydHksIHNpbmNlIHByaXZhdGUgbWVtYmVycyBjYW4ndCBiZSBkeW5hbWljYWxseSByZWFkIGJ5IG5hbWUuXG4gICAqIEBwYXJhbSBuZXdWYWx1ZSB0aGUgbmV3IHZhbHVlIG9mIHRoZSBwcm9wZXJ0eS4gVGhpcyBpcyBvbmx5IHVzZWQgaWZcbiAgICogICAgIGB1c2VOZXdWYWx1ZWAgaXMgdHJ1ZS5cbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIHJlcXVlc3RVcGRhdGUoXG4gICAgbmFtZT86IFByb3BlcnR5S2V5LFxuICAgIG9sZFZhbHVlPzogdW5rbm93bixcbiAgICBvcHRpb25zPzogUHJvcGVydHlEZWNsYXJhdGlvbixcbiAgICB1c2VOZXdWYWx1ZSA9IGZhbHNlLFxuICAgIG5ld1ZhbHVlPzogdW5rbm93blxuICApOiB2b2lkIHtcbiAgICAvLyBJZiB3ZSBoYXZlIGEgcHJvcGVydHkga2V5LCBwZXJmb3JtIHByb3BlcnR5IHVwZGF0ZSBzdGVwcy5cbiAgICBpZiAobmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoREVWX01PREUgJiYgKG5hbWUgYXMgdW5rbm93bikgaW5zdGFuY2VvZiBFdmVudCkge1xuICAgICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICAgYGAsXG4gICAgICAgICAgYFRoZSByZXF1ZXN0VXBkYXRlKCkgbWV0aG9kIHdhcyBjYWxsZWQgd2l0aCBhbiBFdmVudCBhcyB0aGUgcHJvcGVydHkgbmFtZS4gVGhpcyBpcyBwcm9iYWJseSBhIG1pc3Rha2UgY2F1c2VkIGJ5IGJpbmRpbmcgdGhpcy5yZXF1ZXN0VXBkYXRlIGFzIGFuIGV2ZW50IGxpc3RlbmVyLiBJbnN0ZWFkIGJpbmQgYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2FsbCBpdCB3aXRoIG5vIGFyZ3VtZW50czogKCkgPT4gdGhpcy5yZXF1ZXN0VXBkYXRlKClgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBjdG9yID0gdGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50O1xuICAgICAgaWYgKHVzZU5ld1ZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHRoaXNbbmFtZSBhcyBrZXlvZiB0aGlzXTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPz89IGN0b3IuZ2V0UHJvcGVydHlPcHRpb25zKG5hbWUpO1xuICAgICAgY29uc3QgY2hhbmdlZCA9XG4gICAgICAgIChvcHRpb25zLmhhc0NoYW5nZWQgPz8gbm90RXF1YWwpKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfHxcbiAgICAgICAgLy8gV2hlbiB0aGVyZSBpcyBubyBjaGFuZ2UsIGNoZWNrIGEgY29ybmVyIGNhc2UgdGhhdCBjYW4gb2NjdXIgd2hlblxuICAgICAgICAvLyAxLiB0aGVyZSdzIGEgaW5pdGlhbCB2YWx1ZSB3aGljaCB3YXMgbm90IHJlZmxlY3RlZFxuICAgICAgICAvLyAyLiB0aGUgcHJvcGVydHkgaXMgc3Vic2VxdWVudGx5IHNldCB0byB0aGlzIHZhbHVlLlxuICAgICAgICAvLyBGb3IgZXhhbXBsZSwgYHByb3A6IHt1c2VEZWZhdWx0OiB0cnVlLCByZWZsZWN0OiB0cnVlfWBcbiAgICAgICAgLy8gYW5kIGVsLnByb3AgPSAnZm9vJy4gVGhpcyBzaG91bGQgYmUgY29uc2lkZXJlZCBhIGNoYW5nZSBpZiB0aGVcbiAgICAgICAgLy8gYXR0cmlidXRlIGlzIG5vdCBzZXQgYmVjYXVzZSB3ZSB3aWxsIG5vdyByZWZsZWN0IHRoZSBwcm9wZXJ0eSB0byB0aGUgYXR0cmlidXRlLlxuICAgICAgICAob3B0aW9ucy51c2VEZWZhdWx0ICYmXG4gICAgICAgICAgb3B0aW9ucy5yZWZsZWN0ICYmXG4gICAgICAgICAgbmV3VmFsdWUgPT09IHRoaXMuX19kZWZhdWx0VmFsdWVzPy5nZXQobmFtZSkgJiZcbiAgICAgICAgICAhdGhpcy5oYXNBdHRyaWJ1dGUoY3Rvci5fX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShuYW1lLCBvcHRpb25zKSEpKTtcbiAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMuXyRjaGFuZ2VQcm9wZXJ0eShuYW1lLCBvbGRWYWx1ZSwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBYm9ydCB0aGUgcmVxdWVzdCBpZiB0aGUgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSBjb25zaWRlcmVkIGNoYW5nZWQuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaXNVcGRhdGVQZW5kaW5nID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5fX3VwZGF0ZVByb21pc2UgPSB0aGlzLl9fZW5xdWV1ZVVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF8kY2hhbmdlUHJvcGVydHkoXG4gICAgbmFtZTogUHJvcGVydHlLZXksXG4gICAgb2xkVmFsdWU6IHVua25vd24sXG4gICAge3VzZURlZmF1bHQsIHJlZmxlY3QsIHdyYXBwZWR9OiBQcm9wZXJ0eURlY2xhcmF0aW9uLFxuICAgIGluaXRpYWxpemVWYWx1ZT86IHVua25vd25cbiAgKSB7XG4gICAgLy8gUmVjb3JkIGRlZmF1bHQgdmFsdWUgd2hlbiB1c2VEZWZhdWx0IGlzIHVzZWQuIFRoaXMgYWxsb3dzIHVzIHRvXG4gICAgLy8gcmVzdG9yZSB0aGlzIHZhbHVlIHdoZW4gdGhlIGF0dHJpYnV0ZSBpcyByZW1vdmVkLlxuICAgIGlmICh1c2VEZWZhdWx0ICYmICEodGhpcy5fX2RlZmF1bHRWYWx1ZXMgPz89IG5ldyBNYXAoKSkuaGFzKG5hbWUpKSB7XG4gICAgICB0aGlzLl9fZGVmYXVsdFZhbHVlcy5zZXQoXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluaXRpYWxpemVWYWx1ZSA/PyBvbGRWYWx1ZSA/PyB0aGlzW25hbWUgYXMga2V5b2YgdGhpc11cbiAgICAgICk7XG4gICAgICAvLyBpZiB0aGlzIGlzIG5vdCB3cmFwcGluZyBhbiBhY2Nlc3NvciwgaXQgbXVzdCBiZSBhbiBpbml0aWFsIHNldHRpbmdcbiAgICAgIC8vIGFuZCBpbiB0aGlzIGNhc2Ugd2UgZG8gbm90IHdhbnQgdG8gcmVjb3JkIHRoZSBjaGFuZ2Ugb3IgcmVmbGVjdC5cbiAgICAgIGlmICh3cmFwcGVkICE9PSB0cnVlIHx8IGluaXRpYWxpemVWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVE9ETyAoanVzdGluZmFnbmFuaSk6IENyZWF0ZSBhIGJlbmNobWFyayBvZiBNYXAuaGFzKCkgKyBNYXAuc2V0KFxuICAgIC8vIHZzIGp1c3QgTWFwLnNldCgpXG4gICAgaWYgKCF0aGlzLl8kY2hhbmdlZFByb3BlcnRpZXMuaGFzKG5hbWUpKSB7XG4gICAgICAvLyBPbiB0aGUgaW5pdGlhbCBjaGFuZ2UsIHRoZSBvbGQgdmFsdWUgc2hvdWxkIGJlIGB1bmRlZmluZWRgLCBleGNlcHRcbiAgICAgIC8vIHdpdGggYHVzZURlZmF1bHRgXG4gICAgICBpZiAoIXRoaXMuaGFzVXBkYXRlZCAmJiAhdXNlRGVmYXVsdCkge1xuICAgICAgICBvbGRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHRoaXMuXyRjaGFuZ2VkUHJvcGVydGllcy5zZXQobmFtZSwgb2xkVmFsdWUpO1xuICAgIH1cbiAgICAvLyBBZGQgdG8gcmVmbGVjdGluZyBwcm9wZXJ0aWVzIHNldC5cbiAgICAvLyBOb3RlLCBpdCdzIGltcG9ydGFudCB0aGF0IGV2ZXJ5IGNoYW5nZSBoYXMgYSBjaGFuY2UgdG8gYWRkIHRoZVxuICAgIC8vIHByb3BlcnR5IHRvIGBfX3JlZmxlY3RpbmdQcm9wZXJ0aWVzYC4gVGhpcyBlbnN1cmVzIHNldHRpbmdcbiAgICAvLyBhdHRyaWJ1dGUgKyBwcm9wZXJ0eSByZWZsZWN0cyBjb3JyZWN0bHkuXG4gICAgaWYgKHJlZmxlY3QgPT09IHRydWUgJiYgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSAhPT0gbmFtZSkge1xuICAgICAgKHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydGllcyA/Pz0gbmV3IFNldDxQcm9wZXJ0eUtleT4oKSkuYWRkKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHVwIHRoZSBlbGVtZW50IHRvIGFzeW5jaHJvbm91c2x5IHVwZGF0ZS5cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX19lbnF1ZXVlVXBkYXRlKCkge1xuICAgIHRoaXMuaXNVcGRhdGVQZW5kaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgLy8gRW5zdXJlIGFueSBwcmV2aW91cyB1cGRhdGUgaGFzIHJlc29sdmVkIGJlZm9yZSB1cGRhdGluZy5cbiAgICAgIC8vIFRoaXMgYGF3YWl0YCBhbHNvIGVuc3VyZXMgdGhhdCBwcm9wZXJ0eSBjaGFuZ2VzIGFyZSBiYXRjaGVkLlxuICAgICAgYXdhaXQgdGhpcy5fX3VwZGF0ZVByb21pc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gUmVmaXJlIGFueSBwcmV2aW91cyBlcnJvcnMgYXN5bmMgc28gdGhleSBkbyBub3QgZGlzcnVwdCB0aGUgdXBkYXRlXG4gICAgICAvLyBjeWNsZS4gRXJyb3JzIGFyZSByZWZpcmVkIHNvIGRldmVsb3BlcnMgaGF2ZSBhIGNoYW5jZSB0byBvYnNlcnZlXG4gICAgICAvLyB0aGVtLCBhbmQgdGhpcyBjYW4gYmUgZG9uZSBieSBpbXBsZW1lbnRpbmdcbiAgICAgIC8vIGB3aW5kb3cub251bmhhbmRsZWRyZWplY3Rpb25gLlxuICAgICAgUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc2NoZWR1bGVVcGRhdGUoKTtcbiAgICAvLyBJZiBgc2NoZWR1bGVVcGRhdGVgIHJldHVybnMgYSBQcm9taXNlLCB3ZSBhd2FpdCBpdC4gVGhpcyBpcyBkb25lIHRvXG4gICAgLy8gZW5hYmxlIGNvb3JkaW5hdGluZyB1cGRhdGVzIHdpdGggYSBzY2hlZHVsZXIuIE5vdGUsIHRoZSByZXN1bHQgaXNcbiAgICAvLyBjaGVja2VkIHRvIGF2b2lkIGRlbGF5aW5nIGFuIGFkZGl0aW9uYWwgbWljcm90YXNrIHVubGVzcyB3ZSBuZWVkIHRvLlxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgYXdhaXQgcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gIXRoaXMuaXNVcGRhdGVQZW5kaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjaGVkdWxlcyBhbiBlbGVtZW50IHVwZGF0ZS4gWW91IGNhbiBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBjaGFuZ2UgdGhlXG4gICAqIHRpbWluZyBvZiB1cGRhdGVzIGJ5IHJldHVybmluZyBhIFByb21pc2UuIFRoZSB1cGRhdGUgd2lsbCBhd2FpdCB0aGVcbiAgICogcmV0dXJuZWQgUHJvbWlzZSwgYW5kIHlvdSBzaG91bGQgcmVzb2x2ZSB0aGUgUHJvbWlzZSB0byBhbGxvdyB0aGUgdXBkYXRlXG4gICAqIHRvIHByb2NlZWQuIElmIHRoaXMgbWV0aG9kIGlzIG92ZXJyaWRkZW4sIGBzdXBlci5zY2hlZHVsZVVwZGF0ZSgpYFxuICAgKiBtdXN0IGJlIGNhbGxlZC5cbiAgICpcbiAgICogRm9yIGluc3RhbmNlLCB0byBzY2hlZHVsZSB1cGRhdGVzIHRvIG9jY3VyIGp1c3QgYmVmb3JlIHRoZSBuZXh0IGZyYW1lOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBvdmVycmlkZSBwcm90ZWN0ZWQgYXN5bmMgc2NoZWR1bGVVcGRhdGUoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAqICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiByZXNvbHZlKCkpKTtcbiAgICogICBzdXBlci5zY2hlZHVsZVVwZGF0ZSgpO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHNjaGVkdWxlVXBkYXRlKCk6IHZvaWQgfCBQcm9taXNlPHVua25vd24+IHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnBlcmZvcm1VcGRhdGUoKTtcbiAgICBpZiAoXG4gICAgICBERVZfTU9ERSAmJlxuICAgICAgKHRoaXMuY29uc3RydWN0b3IgYXMgdHlwZW9mIFJlYWN0aXZlRWxlbWVudCkuZW5hYmxlZFdhcm5pbmdzIS5pbmNsdWRlcyhcbiAgICAgICAgJ2FzeW5jLXBlcmZvcm0tdXBkYXRlJ1xuICAgICAgKSAmJlxuICAgICAgdHlwZW9mIChyZXN1bHQgYXMgdW5rbm93biBhcyBQcm9taXNlPHVua25vd24+IHwgdW5kZWZpbmVkKT8udGhlbiA9PT1cbiAgICAgICAgJ2Z1bmN0aW9uJ1xuICAgICkge1xuICAgICAgaXNzdWVXYXJuaW5nKFxuICAgICAgICAnYXN5bmMtcGVyZm9ybS11cGRhdGUnLFxuICAgICAgICBgRWxlbWVudCAke3RoaXMubG9jYWxOYW1lfSByZXR1cm5lZCBhIFByb21pc2UgZnJvbSBwZXJmb3JtVXBkYXRlKCkuIGAgK1xuICAgICAgICAgIGBUaGlzIGJlaGF2aW9yIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSBgICtcbiAgICAgICAgICBgdmVyc2lvbiBvZiBSZWFjdGl2ZUVsZW1lbnQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhbiBlbGVtZW50IHVwZGF0ZS4gTm90ZSwgaWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBkdXJpbmcgdGhlXG4gICAqIHVwZGF0ZSwgYGZpcnN0VXBkYXRlZGAgYW5kIGB1cGRhdGVkYCB3aWxsIG5vdCBiZSBjYWxsZWQuXG4gICAqXG4gICAqIENhbGwgYHBlcmZvcm1VcGRhdGUoKWAgdG8gaW1tZWRpYXRlbHkgcHJvY2VzcyBhIHBlbmRpbmcgdXBkYXRlLiBUaGlzIHNob3VsZFxuICAgKiBnZW5lcmFsbHkgbm90IGJlIG5lZWRlZCwgYnV0IGl0IGNhbiBiZSBkb25lIGluIHJhcmUgY2FzZXMgd2hlbiB5b3UgbmVlZCB0b1xuICAgKiB1cGRhdGUgc3luY2hyb25vdXNseS5cbiAgICpcbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIHByb3RlY3RlZCBwZXJmb3JtVXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIEFib3J0IGFueSB1cGRhdGUgaWYgb25lIGlzIG5vdCBwZW5kaW5nIHdoZW4gdGhpcyBpcyBjYWxsZWQuXG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIGBwZXJmb3JtVXBkYXRlYCBpcyBjYWxsZWQgZWFybHkgdG8gXCJmbHVzaFwiXG4gICAgLy8gdGhlIHVwZGF0ZS5cbiAgICBpZiAoIXRoaXMuaXNVcGRhdGVQZW5kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlYnVnTG9nRXZlbnQ/Lih7a2luZDogJ3VwZGF0ZSd9KTtcbiAgICBpZiAoIXRoaXMuaGFzVXBkYXRlZCkge1xuICAgICAgLy8gQ3JlYXRlIHJlbmRlclJvb3QgYmVmb3JlIGZpcnN0IHVwZGF0ZS4gVGhpcyBvY2N1cnMgaW4gYGNvbm5lY3RlZENhbGxiYWNrYFxuICAgICAgLy8gYnV0IGlzIGRvbmUgaGVyZSB0byBzdXBwb3J0IG91dCBvZiB0cmVlIGNhbGxzIHRvIGBlbmFibGVVcGRhdGluZ2AvYHBlcmZvcm1VcGRhdGVgLlxuICAgICAgKHRoaXMgYXMgTXV0YWJsZTx0eXBlb2YgdGhpcywgJ3JlbmRlclJvb3QnPikucmVuZGVyUm9vdCA/Pz1cbiAgICAgICAgdGhpcy5jcmVhdGVSZW5kZXJSb290KCk7XG4gICAgICBpZiAoREVWX01PREUpIHtcbiAgICAgICAgLy8gUHJvZHVjZSB3YXJuaW5nIGlmIGFueSByZWFjdGl2ZSBwcm9wZXJ0aWVzIG9uIHRoZSBwcm90b3R5cGUgYXJlXG4gICAgICAgIC8vIHNoYWRvd2VkIGJ5IGNsYXNzIGZpZWxkcy4gSW5zdGFuY2UgZmllbGRzIHNldCBiZWZvcmUgdXBncmFkZSBhcmVcbiAgICAgICAgLy8gZGVsZXRlZCBieSB0aGlzIHBvaW50LCBzbyBhbnkgb3duIHByb3BlcnR5IGlzIGNhdXNlZCBieSBjbGFzcyBmaWVsZFxuICAgICAgICAvLyBpbml0aWFsaXphdGlvbiBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgIGNvbnN0IGN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNoYWRvd2VkUHJvcGVydGllcyA9IFsuLi5jdG9yLmVsZW1lbnRQcm9wZXJ0aWVzLmtleXMoKV0uZmlsdGVyKFxuICAgICAgICAgIChwKSA9PiB0aGlzLmhhc093blByb3BlcnR5KHApICYmIHAgaW4gZ2V0UHJvdG90eXBlT2YodGhpcylcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHNoYWRvd2VkUHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgVGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIG9uIGVsZW1lbnQgJHt0aGlzLmxvY2FsTmFtZX0gd2lsbCBub3QgYCArXG4gICAgICAgICAgICAgIGB0cmlnZ2VyIHVwZGF0ZXMgYXMgZXhwZWN0ZWQgYmVjYXVzZSB0aGV5IGFyZSBzZXQgdXNpbmcgY2xhc3MgYCArXG4gICAgICAgICAgICAgIGBmaWVsZHM6ICR7c2hhZG93ZWRQcm9wZXJ0aWVzLmpvaW4oJywgJyl9LiBgICtcbiAgICAgICAgICAgICAgYE5hdGl2ZSBjbGFzcyBmaWVsZHMgYW5kIHNvbWUgY29tcGlsZWQgb3V0cHV0IHdpbGwgb3ZlcndyaXRlIGAgK1xuICAgICAgICAgICAgICBgYWNjZXNzb3JzIHVzZWQgZm9yIGRldGVjdGluZyBjaGFuZ2VzLiBTZWUgYCArXG4gICAgICAgICAgICAgIGBodHRwczovL2xpdC5kZXYvbXNnL2NsYXNzLWZpZWxkLXNoYWRvd2luZyBgICtcbiAgICAgICAgICAgICAgYGZvciBtb3JlIGluZm9ybWF0aW9uLmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBNaXhpbiBpbnN0YW5jZSBwcm9wZXJ0aWVzIG9uY2UsIGlmIHRoZXkgZXhpc3QuXG4gICAgICBpZiAodGhpcy5fX2luc3RhbmNlUHJvcGVydGllcykge1xuICAgICAgICAvLyBUT0RPIChqdXN0aW5mYWduYW5pKTogc2hvdWxkIHdlIHVzZSB0aGUgc3RvcmVkIHZhbHVlPyBDb3VsZCBhIG5ldyB2YWx1ZVxuICAgICAgICAvLyBoYXZlIGJlZW4gc2V0IHNpbmNlIHdlIHN0b3JlZCB0aGUgb3duIHByb3BlcnR5IHZhbHVlP1xuICAgICAgICBmb3IgKGNvbnN0IFtwLCB2YWx1ZV0gb2YgdGhpcy5fX2luc3RhbmNlUHJvcGVydGllcykge1xuICAgICAgICAgIHRoaXNbcCBhcyBrZXlvZiB0aGlzXSA9IHZhbHVlIGFzIHRoaXNba2V5b2YgdGhpc107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX2luc3RhbmNlUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIC8vIFRyaWdnZXIgaW5pdGlhbCB2YWx1ZSByZWZsZWN0aW9uIGFuZCBwb3B1bGF0ZSB0aGUgaW5pdGlhbFxuICAgICAgLy8gYGNoYW5nZWRQcm9wZXJ0aWVzYCBtYXAsIGJ1dCBvbmx5IGZvciB0aGUgY2FzZSBvZiBwcm9wZXJ0aWVzIGNyZWF0ZWRcbiAgICAgIC8vIHZpYSBgY3JlYXRlUHJvcGVydHlgIG9uIGFjY2Vzc29ycywgd2hpY2ggd2lsbCBub3QgaGF2ZSBhbHJlYWR5XG4gICAgICAvLyBwb3B1bGF0ZWQgdGhlIGBjaGFuZ2VkUHJvcGVydGllc2AgbWFwIHNpbmNlIHRoZXkgYXJlIG5vdCBzZXQuXG4gICAgICAvLyBXZSBjYW4ndCBrbm93IGlmIHRoZXNlIGFjY2Vzc29ycyBoYWQgaW5pdGlhbGl6ZXJzLCBzbyB3ZSBqdXN0IHNldFxuICAgICAgLy8gdGhlbSBhbnl3YXkgLSBhIGRpZmZlcmVuY2UgZnJvbSBleHBlcmltZW50YWwgZGVjb3JhdG9ycyBvbiBmaWVsZHMgYW5kXG4gICAgICAvLyBzdGFuZGFyZCBkZWNvcmF0b3JzIG9uIGF1dG8tYWNjZXNzb3JzLlxuICAgICAgLy8gRm9yIGNvbnRleHQgc2VlOlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2xpdC9saXQvcHVsbC80MTgzI2lzc3VlY29tbWVudC0xNzExOTU5NjM1XG4gICAgICBjb25zdCBlbGVtZW50UHJvcGVydGllcyA9ICh0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpXG4gICAgICAgIC5lbGVtZW50UHJvcGVydGllcztcbiAgICAgIGlmIChlbGVtZW50UHJvcGVydGllcy5zaXplID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtwLCBvcHRpb25zXSBvZiBlbGVtZW50UHJvcGVydGllcykge1xuICAgICAgICAgIGNvbnN0IHt3cmFwcGVkfSA9IG9wdGlvbnM7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzW3AgYXMga2V5b2YgdGhpc107XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgd3JhcHBlZCA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgIXRoaXMuXyRjaGFuZ2VkUHJvcGVydGllcy5oYXMocCkgJiZcbiAgICAgICAgICAgIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuXyRjaGFuZ2VQcm9wZXJ0eShwLCB1bmRlZmluZWQsIG9wdGlvbnMsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuICAgIGNvbnN0IGNoYW5nZWRQcm9wZXJ0aWVzID0gdGhpcy5fJGNoYW5nZWRQcm9wZXJ0aWVzO1xuICAgIHRyeSB7XG4gICAgICBzaG91bGRVcGRhdGUgPSB0aGlzLnNob3VsZFVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICAgIHRoaXMud2lsbFVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgICAgIHRoaXMuX19jb250cm9sbGVycz8uZm9yRWFjaCgoYykgPT4gYy5ob3N0VXBkYXRlPy4oKSk7XG4gICAgICAgIHRoaXMudXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX19tYXJrVXBkYXRlZCgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFByZXZlbnQgYGZpcnN0VXBkYXRlZGAgYW5kIGB1cGRhdGVkYCBmcm9tIHJ1bm5pbmcgd2hlbiB0aGVyZSdzIGFuXG4gICAgICAvLyB1cGRhdGUgZXhjZXB0aW9uLlxuICAgICAgc2hvdWxkVXBkYXRlID0gZmFsc2U7XG4gICAgICAvLyBFbnN1cmUgZWxlbWVudCBjYW4gYWNjZXB0IGFkZGl0aW9uYWwgdXBkYXRlcyBhZnRlciBhbiBleGNlcHRpb24uXG4gICAgICB0aGlzLl9fbWFya1VwZGF0ZWQoKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICAgIC8vIFRoZSB1cGRhdGUgaXMgbm8gbG9uZ2VyIGNvbnNpZGVyZWQgcGVuZGluZyBhbmQgZnVydGhlciB1cGRhdGVzIGFyZSBub3cgYWxsb3dlZC5cbiAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICB0aGlzLl8kZGlkVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW52b2tlZCBiZWZvcmUgYHVwZGF0ZSgpYCB0byBjb21wdXRlIHZhbHVlcyBuZWVkZWQgZHVyaW5nIHRoZSB1cGRhdGUuXG4gICAqXG4gICAqIEltcGxlbWVudCBgd2lsbFVwZGF0ZWAgdG8gY29tcHV0ZSBwcm9wZXJ0eSB2YWx1ZXMgdGhhdCBkZXBlbmQgb24gb3RoZXJcbiAgICogcHJvcGVydGllcyBhbmQgYXJlIHVzZWQgaW4gdGhlIHJlc3Qgb2YgdGhlIHVwZGF0ZSBwcm9jZXNzLlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiB3aWxsVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAqICAgLy8gb25seSBuZWVkIHRvIGNoZWNrIGNoYW5nZWQgcHJvcGVydGllcyBmb3IgYW4gZXhwZW5zaXZlIGNvbXB1dGF0aW9uLlxuICAgKiAgIGlmIChjaGFuZ2VkUHJvcGVydGllcy5oYXMoJ2ZpcnN0TmFtZScpIHx8IGNoYW5nZWRQcm9wZXJ0aWVzLmhhcygnbGFzdE5hbWUnKSkge1xuICAgKiAgICAgdGhpcy5zaGEgPSBjb21wdXRlU0hBKGAke3RoaXMuZmlyc3ROYW1lfSAke3RoaXMubGFzdE5hbWV9YCk7XG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIHJlbmRlcigpIHtcbiAgICogICByZXR1cm4gaHRtbGBTSEE6ICR7dGhpcy5zaGF9YDtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIHByb3RlY3RlZCB3aWxsVXBkYXRlKF9jaGFuZ2VkUHJvcGVydGllczogUHJvcGVydHlWYWx1ZXMpOiB2b2lkIHt9XG5cbiAgLy8gTm90ZSwgdGhpcyBpcyBhbiBvdmVycmlkZSBwb2ludCBmb3IgcG9seWZpbGwtc3VwcG9ydC5cbiAgLy8gQGludGVybmFsXG4gIF8kZGlkVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzOiBQcm9wZXJ0eVZhbHVlcykge1xuICAgIHRoaXMuX19jb250cm9sbGVycz8uZm9yRWFjaCgoYykgPT4gYy5ob3N0VXBkYXRlZD8uKCkpO1xuICAgIGlmICghdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICB0aGlzLmhhc1VwZGF0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5maXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIGlmIChcbiAgICAgIERFVl9NT0RFICYmXG4gICAgICB0aGlzLmlzVXBkYXRlUGVuZGluZyAmJlxuICAgICAgKHRoaXMuY29uc3RydWN0b3IgYXMgdHlwZW9mIFJlYWN0aXZlRWxlbWVudCkuZW5hYmxlZFdhcm5pbmdzIS5pbmNsdWRlcyhcbiAgICAgICAgJ2NoYW5nZS1pbi11cGRhdGUnXG4gICAgICApXG4gICAgKSB7XG4gICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICdjaGFuZ2UtaW4tdXBkYXRlJyxcbiAgICAgICAgYEVsZW1lbnQgJHt0aGlzLmxvY2FsTmFtZX0gc2NoZWR1bGVkIGFuIHVwZGF0ZSBgICtcbiAgICAgICAgICBgKGdlbmVyYWxseSBiZWNhdXNlIGEgcHJvcGVydHkgd2FzIHNldCkgYCArXG4gICAgICAgICAgYGFmdGVyIGFuIHVwZGF0ZSBjb21wbGV0ZWQsIGNhdXNpbmcgYSBuZXcgdXBkYXRlIHRvIGJlIHNjaGVkdWxlZC4gYCArXG4gICAgICAgICAgYFRoaXMgaXMgaW5lZmZpY2llbnQgYW5kIHNob3VsZCBiZSBhdm9pZGVkIHVubGVzcyB0aGUgbmV4dCB1cGRhdGUgYCArXG4gICAgICAgICAgYGNhbiBvbmx5IGJlIHNjaGVkdWxlZCBhcyBhIHNpZGUgZWZmZWN0IG9mIHRoZSBwcmV2aW91cyB1cGRhdGUuYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9fbWFya1VwZGF0ZWQoKSB7XG4gICAgdGhpcy5fJGNoYW5nZWRQcm9wZXJ0aWVzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuaXNVcGRhdGVQZW5kaW5nID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBlbGVtZW50IGhhcyBjb21wbGV0ZWQgdXBkYXRpbmcuXG4gICAqIFRoZSBQcm9taXNlIHZhbHVlIGlzIGEgYm9vbGVhbiB0aGF0IGlzIGB0cnVlYCBpZiB0aGUgZWxlbWVudCBjb21wbGV0ZWQgdGhlXG4gICAqIHVwZGF0ZSB3aXRob3V0IHRyaWdnZXJpbmcgYW5vdGhlciB1cGRhdGUuIFRoZSBQcm9taXNlIHJlc3VsdCBpcyBgZmFsc2VgIGlmXG4gICAqIGEgcHJvcGVydHkgd2FzIHNldCBpbnNpZGUgYHVwZGF0ZWQoKWAuIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBhblxuICAgKiBleGNlcHRpb24gd2FzIHRocm93biBkdXJpbmcgdGhlIHVwZGF0ZS5cbiAgICpcbiAgICogVG8gYXdhaXQgYWRkaXRpb25hbCBhc3luY2hyb25vdXMgd29yaywgb3ZlcnJpZGUgdGhlIGBnZXRVcGRhdGVDb21wbGV0ZWBcbiAgICogbWV0aG9kLiBGb3IgZXhhbXBsZSwgaXQgaXMgc29tZXRpbWVzIHVzZWZ1bCB0byBhd2FpdCBhIHJlbmRlcmVkIGVsZW1lbnRcbiAgICogYmVmb3JlIGZ1bGZpbGxpbmcgdGhpcyBQcm9taXNlLiBUbyBkbyB0aGlzLCBmaXJzdCBhd2FpdFxuICAgKiBgc3VwZXIuZ2V0VXBkYXRlQ29tcGxldGUoKWAsIHRoZW4gYW55IHN1YnNlcXVlbnQgc3RhdGUuXG4gICAqXG4gICAqIEByZXR1cm4gQSBwcm9taXNlIG9mIGEgYm9vbGVhbiB0aGF0IHJlc29sdmVzIHRvIHRydWUgaWYgdGhlIHVwZGF0ZSBjb21wbGV0ZWRcbiAgICogICAgIHdpdGhvdXQgdHJpZ2dlcmluZyBhbm90aGVyIHVwZGF0ZS5cbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIGdldCB1cGRhdGVDb21wbGV0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRVcGRhdGVDb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHBvaW50IGZvciB0aGUgYHVwZGF0ZUNvbXBsZXRlYCBwcm9taXNlLlxuICAgKlxuICAgKiBJdCBpcyBub3Qgc2FmZSB0byBvdmVycmlkZSB0aGUgYHVwZGF0ZUNvbXBsZXRlYCBnZXR0ZXIgZGlyZWN0bHkgZHVlIHRvIGFcbiAgICogbGltaXRhdGlvbiBpbiBUeXBlU2NyaXB0IHdoaWNoIG1lYW5zIGl0IGlzIG5vdCBwb3NzaWJsZSB0byBjYWxsIGFcbiAgICogc3VwZXJjbGFzcyBnZXR0ZXIgKGUuZy4gYHN1cGVyLnVwZGF0ZUNvbXBsZXRlLnRoZW4oLi4uKWApIHdoZW4gdGhlIHRhcmdldFxuICAgKiBsYW5ndWFnZSBpcyBFUzUgKGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMzM4KS5cbiAgICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRkZW4gaW5zdGVhZC4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGNsYXNzIE15RWxlbWVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICAgKiAgIG92ZXJyaWRlIGFzeW5jIGdldFVwZGF0ZUNvbXBsZXRlKCkge1xuICAgKiAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3VwZXIuZ2V0VXBkYXRlQ29tcGxldGUoKTtcbiAgICogICAgIGF3YWl0IHRoaXMuX215Q2hpbGQudXBkYXRlQ29tcGxldGU7XG4gICAqICAgICByZXR1cm4gcmVzdWx0O1xuICAgKiAgIH1cbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQHJldHVybiBBIHByb21pc2Ugb2YgYSBib29sZWFuIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgdXBkYXRlIGNvbXBsZXRlZFxuICAgKiAgICAgd2l0aG91dCB0cmlnZ2VyaW5nIGFub3RoZXIgdXBkYXRlLlxuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIGdldFVwZGF0ZUNvbXBsZXRlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9fdXBkYXRlUHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCBgdXBkYXRlKClgIHNob3VsZCBiZSBjYWxsZWQgd2hlbiB0aGUgZWxlbWVudCByZXF1ZXN0c1xuICAgKiBhbiB1cGRhdGUuIEJ5IGRlZmF1bHQsIHRoaXMgbWV0aG9kIGFsd2F5cyByZXR1cm5zIGB0cnVlYCwgYnV0IHRoaXMgY2FuIGJlXG4gICAqIGN1c3RvbWl6ZWQgdG8gY29udHJvbCB3aGVuIHRvIHVwZGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHNob3VsZFVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZWxlbWVudC4gVGhpcyBtZXRob2QgcmVmbGVjdHMgcHJvcGVydHkgdmFsdWVzIHRvIGF0dHJpYnV0ZXMuXG4gICAqIEl0IGNhbiBiZSBvdmVycmlkZGVuIHRvIHJlbmRlciBhbmQga2VlcCB1cGRhdGVkIGVsZW1lbnQgRE9NLlxuICAgKiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlIHRoaXMgbWV0aG9kIHdpbGwgKm5vdCogdHJpZ2dlclxuICAgKiBhbm90aGVyIHVwZGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKSB7XG4gICAgLy8gVGhlIGZvckVhY2goKSBleHByZXNzaW9uIHdpbGwgb25seSBydW4gd2hlbiBfX3JlZmxlY3RpbmdQcm9wZXJ0aWVzIGlzXG4gICAgLy8gZGVmaW5lZCwgYW5kIGl0IHJldHVybnMgdW5kZWZpbmVkLCBzZXR0aW5nIF9fcmVmbGVjdGluZ1Byb3BlcnRpZXMgdG9cbiAgICAvLyB1bmRlZmluZWRcbiAgICB0aGlzLl9fcmVmbGVjdGluZ1Byb3BlcnRpZXMgJiY9IHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydGllcy5mb3JFYWNoKChwKSA9PlxuICAgICAgdGhpcy5fX3Byb3BlcnR5VG9BdHRyaWJ1dGUocCwgdGhpc1twIGFzIGtleW9mIHRoaXNdKVxuICAgICkgYXMgdW5kZWZpbmVkO1xuICAgIHRoaXMuX19tYXJrVXBkYXRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbmV2ZXIgdGhlIGVsZW1lbnQgaXMgdXBkYXRlZC4gSW1wbGVtZW50IHRvIHBlcmZvcm1cbiAgICogcG9zdC11cGRhdGluZyB0YXNrcyB2aWEgRE9NIEFQSXMsIGZvciBleGFtcGxlLCBmb2N1c2luZyBhbiBlbGVtZW50LlxuICAgKlxuICAgKiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlIHRoaXMgbWV0aG9kIHdpbGwgdHJpZ2dlciB0aGUgZWxlbWVudCB0byB1cGRhdGVcbiAgICogYWdhaW4gYWZ0ZXIgdGhpcyB1cGRhdGUgY3ljbGUgY29tcGxldGVzLlxuICAgKlxuICAgKiBAcGFyYW0gX2NoYW5nZWRQcm9wZXJ0aWVzIE1hcCBvZiBjaGFuZ2VkIHByb3BlcnRpZXMgd2l0aCBvbGQgdmFsdWVzXG4gICAqIEBjYXRlZ29yeSB1cGRhdGVzXG4gICAqL1xuICBwcm90ZWN0ZWQgdXBkYXRlZChfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKSB7fVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGVsZW1lbnQgaXMgZmlyc3QgdXBkYXRlZC4gSW1wbGVtZW50IHRvIHBlcmZvcm0gb25lIHRpbWVcbiAgICogd29yayBvbiB0aGUgZWxlbWVudCBhZnRlciB1cGRhdGUuXG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGZpcnN0VXBkYXRlZCgpIHtcbiAgICogICB0aGlzLnJlbmRlclJvb3QuZ2V0RWxlbWVudEJ5SWQoJ215LXRleHQtYXJlYScpLmZvY3VzKCk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCB0cmlnZ2VyIHRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICAgKiBhZ2FpbiBhZnRlciB0aGlzIHVwZGF0ZSBjeWNsZSBjb21wbGV0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSBfY2hhbmdlZFByb3BlcnRpZXMgTWFwIG9mIGNoYW5nZWQgcHJvcGVydGllcyB3aXRoIG9sZCB2YWx1ZXNcbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIHByb3RlY3RlZCBmaXJzdFVwZGF0ZWQoX2NoYW5nZWRQcm9wZXJ0aWVzOiBQcm9wZXJ0eVZhbHVlcykge31cbn1cbi8vIEFzc2lnbmVkIGhlcmUgdG8gd29yayBhcm91bmQgYSBqc2NvbXBpbGVyIGJ1ZyB3aXRoIHN0YXRpYyBmaWVsZHNcbi8vIHdoZW4gY29tcGlsaW5nIHRvIEVTNS5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1jb21waWxlci9pc3N1ZXMvMzE3N1xuKFJlYWN0aXZlRWxlbWVudCBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVtcbiAgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnZWxlbWVudFByb3BlcnRpZXMnLCBSZWFjdGl2ZUVsZW1lbnQpXG5dID0gbmV3IE1hcCgpO1xuKFJlYWN0aXZlRWxlbWVudCBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVtcbiAgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnZmluYWxpemVkJywgUmVhY3RpdmVFbGVtZW50KVxuXSA9IG5ldyBNYXAoKTtcblxuLy8gQXBwbHkgcG9seWZpbGxzIGlmIGF2YWlsYWJsZVxucG9seWZpbGxTdXBwb3J0Py4oe1JlYWN0aXZlRWxlbWVudH0pO1xuXG4vLyBEZXYgbW9kZSB3YXJuaW5ncy4uLlxuaWYgKERFVl9NT0RFKSB7XG4gIC8vIERlZmF1bHQgd2FybmluZyBzZXQuXG4gIFJlYWN0aXZlRWxlbWVudC5lbmFibGVkV2FybmluZ3MgPSBbXG4gICAgJ2NoYW5nZS1pbi11cGRhdGUnLFxuICAgICdhc3luYy1wZXJmb3JtLXVwZGF0ZScsXG4gIF07XG4gIGNvbnN0IGVuc3VyZU93bldhcm5pbmdzID0gZnVuY3Rpb24gKGN0b3I6IHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpIHtcbiAgICBpZiAoXG4gICAgICAhY3Rvci5oYXNPd25Qcm9wZXJ0eShKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdlbmFibGVkV2FybmluZ3MnLCBjdG9yKSlcbiAgICApIHtcbiAgICAgIGN0b3IuZW5hYmxlZFdhcm5pbmdzID0gY3Rvci5lbmFibGVkV2FybmluZ3MhLnNsaWNlKCk7XG4gICAgfVxuICB9O1xuICBSZWFjdGl2ZUVsZW1lbnQuZW5hYmxlV2FybmluZyA9IGZ1bmN0aW9uIChcbiAgICB0aGlzOiB0eXBlb2YgUmVhY3RpdmVFbGVtZW50LFxuICAgIHdhcm5pbmc6IFdhcm5pbmdLaW5kXG4gICkge1xuICAgIGVuc3VyZU93bldhcm5pbmdzKHRoaXMpO1xuICAgIGlmICghdGhpcy5lbmFibGVkV2FybmluZ3MhLmluY2x1ZGVzKHdhcm5pbmcpKSB7XG4gICAgICB0aGlzLmVuYWJsZWRXYXJuaW5ncyEucHVzaCh3YXJuaW5nKTtcbiAgICB9XG4gIH07XG4gIFJlYWN0aXZlRWxlbWVudC5kaXNhYmxlV2FybmluZyA9IGZ1bmN0aW9uIChcbiAgICB0aGlzOiB0eXBlb2YgUmVhY3RpdmVFbGVtZW50LFxuICAgIHdhcm5pbmc6IFdhcm5pbmdLaW5kXG4gICkge1xuICAgIGVuc3VyZU93bldhcm5pbmdzKHRoaXMpO1xuICAgIGNvbnN0IGkgPSB0aGlzLmVuYWJsZWRXYXJuaW5ncyEuaW5kZXhPZih3YXJuaW5nKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICB0aGlzLmVuYWJsZWRXYXJuaW5ncyEuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gSU1QT1JUQU5UOiBkbyBub3QgY2hhbmdlIHRoZSBwcm9wZXJ0eSBuYW1lIG9yIHRoZSBhc3NpZ25tZW50IGV4cHJlc3Npb24uXG4vLyBUaGlzIGxpbmUgd2lsbCBiZSB1c2VkIGluIHJlZ2V4ZXMgdG8gc2VhcmNoIGZvciBSZWFjdGl2ZUVsZW1lbnQgdXNhZ2UuXG4oZ2xvYmFsLnJlYWN0aXZlRWxlbWVudFZlcnNpb25zID8/PSBbXSkucHVzaCgnMi4xLjInKTtcbmlmIChERVZfTU9ERSAmJiBnbG9iYWwucmVhY3RpdmVFbGVtZW50VmVyc2lvbnMubGVuZ3RoID4gMSkge1xuICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgaXNzdWVXYXJuaW5nIShcbiAgICAgICdtdWx0aXBsZS12ZXJzaW9ucycsXG4gICAgICBgTXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0IGxvYWRlZC4gTG9hZGluZyBtdWx0aXBsZSB2ZXJzaW9ucyBgICtcbiAgICAgICAgYGlzIG5vdCByZWNvbW1lbmRlZC5gXG4gICAgKTtcbiAgfSk7XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8vIElNUE9SVEFOVDogdGhlc2UgaW1wb3J0cyBtdXN0IGJlIHR5cGUtb25seVxuaW1wb3J0IHR5cGUge0RpcmVjdGl2ZSwgRGlyZWN0aXZlUmVzdWx0LCBQYXJ0SW5mb30gZnJvbSAnLi9kaXJlY3RpdmUuanMnO1xuaW1wb3J0IHR5cGUge1RydXN0ZWRIVE1MLCBUcnVzdGVkVHlwZXNXaW5kb3d9IGZyb20gJ3RydXN0ZWQtdHlwZXMvbGliL2luZGV4LmpzJztcblxuY29uc3QgREVWX01PREUgPSB0cnVlO1xuY29uc3QgRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTID0gdHJ1ZTtcbmNvbnN0IEVOQUJMRV9TSEFEWURPTV9OT1BBVENIID0gdHJ1ZTtcbmNvbnN0IE5PREVfTU9ERSA9IGZhbHNlO1xuXG4vLyBBbGxvd3MgbWluaWZpZXJzIHRvIHJlbmFtZSByZWZlcmVuY2VzIHRvIGdsb2JhbFRoaXNcbmNvbnN0IGdsb2JhbCA9IGdsb2JhbFRoaXM7XG5cbi8qKlxuICogQ29udGFpbnMgdHlwZXMgdGhhdCBhcmUgcGFydCBvZiB0aGUgdW5zdGFibGUgZGVidWcgQVBJLlxuICpcbiAqIEV2ZXJ5dGhpbmcgaW4gdGhpcyBBUEkgaXMgbm90IHN0YWJsZSBhbmQgbWF5IGNoYW5nZSBvciBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsXG4gKiBldmVuIG9uIHBhdGNoIHJlbGVhc2VzLlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuZXhwb3J0IG5hbWVzcGFjZSBMaXRVbnN0YWJsZSB7XG4gIC8qKlxuICAgKiBXaGVuIExpdCBpcyBydW5uaW5nIGluIGRldiBtb2RlIGFuZCBgd2luZG93LmVtaXRMaXREZWJ1Z0xvZ0V2ZW50c2AgaXMgdHJ1ZSxcbiAgICogd2Ugd2lsbCBlbWl0ICdsaXQtZGVidWcnIGV2ZW50cyB0byB3aW5kb3csIHdpdGggbGl2ZSBkZXRhaWxzIGFib3V0IHRoZSB1cGRhdGUgYW5kIHJlbmRlclxuICAgKiBsaWZlY3ljbGUuIFRoZXNlIGNhbiBiZSB1c2VmdWwgZm9yIHdyaXRpbmcgZGVidWcgdG9vbGluZyBhbmQgdmlzdWFsaXphdGlvbnMuXG4gICAqXG4gICAqIFBsZWFzZSBiZSBhd2FyZSB0aGF0IHJ1bm5pbmcgd2l0aCB3aW5kb3cuZW1pdExpdERlYnVnTG9nRXZlbnRzIGhhcyBwZXJmb3JtYW5jZSBvdmVyaGVhZCxcbiAgICogbWFraW5nIGNlcnRhaW4gb3BlcmF0aW9ucyB0aGF0IGFyZSBub3JtYWxseSB2ZXJ5IGNoZWFwIChsaWtlIGEgbm8tb3AgcmVuZGVyKSBtdWNoIHNsb3dlcixcbiAgICogYmVjYXVzZSB3ZSBtdXN0IGNvcHkgZGF0YSBhbmQgZGlzcGF0Y2ggZXZlbnRzLlxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbiAgZXhwb3J0IG5hbWVzcGFjZSBEZWJ1Z0xvZyB7XG4gICAgZXhwb3J0IHR5cGUgRW50cnkgPVxuICAgICAgfCBUZW1wbGF0ZVByZXBcbiAgICAgIHwgVGVtcGxhdGVJbnN0YW50aWF0ZWRcbiAgICAgIHwgVGVtcGxhdGVJbnN0YW50aWF0ZWRBbmRVcGRhdGVkXG4gICAgICB8IFRlbXBsYXRlVXBkYXRpbmdcbiAgICAgIHwgQmVnaW5SZW5kZXJcbiAgICAgIHwgRW5kUmVuZGVyXG4gICAgICB8IENvbW1pdFBhcnRFbnRyeVxuICAgICAgfCBTZXRQYXJ0VmFsdWU7XG4gICAgZXhwb3J0IGludGVyZmFjZSBUZW1wbGF0ZVByZXAge1xuICAgICAga2luZDogJ3RlbXBsYXRlIHByZXAnO1xuICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlO1xuICAgICAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXk7XG4gICAgICBjbG9uYWJsZVRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgICAgcGFydHM6IFRlbXBsYXRlUGFydFtdO1xuICAgIH1cbiAgICBleHBvcnQgaW50ZXJmYWNlIEJlZ2luUmVuZGVyIHtcbiAgICAgIGtpbmQ6ICdiZWdpbiByZW5kZXInO1xuICAgICAgaWQ6IG51bWJlcjtcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgY29udGFpbmVyOiBSZW5kZXJSb290Tm9kZTtcbiAgICAgIG9wdGlvbnM6IFJlbmRlck9wdGlvbnMgfCB1bmRlZmluZWQ7XG4gICAgICBwYXJ0OiBDaGlsZFBhcnQgfCB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGV4cG9ydCBpbnRlcmZhY2UgRW5kUmVuZGVyIHtcbiAgICAgIGtpbmQ6ICdlbmQgcmVuZGVyJztcbiAgICAgIGlkOiBudW1iZXI7XG4gICAgICB2YWx1ZTogdW5rbm93bjtcbiAgICAgIGNvbnRhaW5lcjogUmVuZGVyUm9vdE5vZGU7XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgICAgcGFydDogQ2hpbGRQYXJ0O1xuICAgIH1cbiAgICBleHBvcnQgaW50ZXJmYWNlIFRlbXBsYXRlSW5zdGFudGlhdGVkIHtcbiAgICAgIGtpbmQ6ICd0ZW1wbGF0ZSBpbnN0YW50aWF0ZWQnO1xuICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlIHwgQ29tcGlsZWRUZW1wbGF0ZTtcbiAgICAgIGluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAgIGZyYWdtZW50OiBOb2RlO1xuICAgICAgcGFydHM6IEFycmF5PFBhcnQgfCB1bmRlZmluZWQ+O1xuICAgICAgdmFsdWVzOiB1bmtub3duW107XG4gICAgfVxuICAgIGV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVJbnN0YW50aWF0ZWRBbmRVcGRhdGVkIHtcbiAgICAgIGtpbmQ6ICd0ZW1wbGF0ZSBpbnN0YW50aWF0ZWQgYW5kIHVwZGF0ZWQnO1xuICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlIHwgQ29tcGlsZWRUZW1wbGF0ZTtcbiAgICAgIGluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAgIGZyYWdtZW50OiBOb2RlO1xuICAgICAgcGFydHM6IEFycmF5PFBhcnQgfCB1bmRlZmluZWQ+O1xuICAgICAgdmFsdWVzOiB1bmtub3duW107XG4gICAgfVxuICAgIGV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVVcGRhdGluZyB7XG4gICAgICBraW5kOiAndGVtcGxhdGUgdXBkYXRpbmcnO1xuICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlIHwgQ29tcGlsZWRUZW1wbGF0ZTtcbiAgICAgIGluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAgIHBhcnRzOiBBcnJheTxQYXJ0IHwgdW5kZWZpbmVkPjtcbiAgICAgIHZhbHVlczogdW5rbm93bltdO1xuICAgIH1cbiAgICBleHBvcnQgaW50ZXJmYWNlIFNldFBhcnRWYWx1ZSB7XG4gICAgICBraW5kOiAnc2V0IHBhcnQnO1xuICAgICAgcGFydDogUGFydDtcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgdmFsdWVJbmRleDogbnVtYmVyO1xuICAgICAgdmFsdWVzOiB1bmtub3duW107XG4gICAgICB0ZW1wbGF0ZUluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlO1xuICAgIH1cblxuICAgIGV4cG9ydCB0eXBlIENvbW1pdFBhcnRFbnRyeSA9XG4gICAgICB8IENvbW1pdE5vdGhpbmdUb0NoaWxkRW50cnlcbiAgICAgIHwgQ29tbWl0VGV4dFxuICAgICAgfCBDb21taXROb2RlXG4gICAgICB8IENvbW1pdEF0dHJpYnV0ZVxuICAgICAgfCBDb21taXRQcm9wZXJ0eVxuICAgICAgfCBDb21taXRCb29sZWFuQXR0cmlidXRlXG4gICAgICB8IENvbW1pdEV2ZW50TGlzdGVuZXJcbiAgICAgIHwgQ29tbWl0VG9FbGVtZW50QmluZGluZztcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0Tm90aGluZ1RvQ2hpbGRFbnRyeSB7XG4gICAgICBraW5kOiAnY29tbWl0IG5vdGhpbmcgdG8gY2hpbGQnO1xuICAgICAgc3RhcnQ6IENoaWxkTm9kZTtcbiAgICAgIGVuZDogQ2hpbGROb2RlIHwgbnVsbDtcbiAgICAgIHBhcmVudDogRGlzY29ubmVjdGFibGUgfCB1bmRlZmluZWQ7XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0VGV4dCB7XG4gICAgICBraW5kOiAnY29tbWl0IHRleHQnO1xuICAgICAgbm9kZTogVGV4dDtcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIENvbW1pdE5vZGUge1xuICAgICAga2luZDogJ2NvbW1pdCBub2RlJztcbiAgICAgIHN0YXJ0OiBOb2RlO1xuICAgICAgcGFyZW50OiBEaXNjb25uZWN0YWJsZSB8IHVuZGVmaW5lZDtcbiAgICAgIHZhbHVlOiBOb2RlO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIENvbW1pdEF0dHJpYnV0ZSB7XG4gICAgICBraW5kOiAnY29tbWl0IGF0dHJpYnV0ZSc7XG4gICAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgdmFsdWU6IHVua25vd247XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0UHJvcGVydHkge1xuICAgICAga2luZDogJ2NvbW1pdCBwcm9wZXJ0eSc7XG4gICAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgdmFsdWU6IHVua25vd247XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0Qm9vbGVhbkF0dHJpYnV0ZSB7XG4gICAgICBraW5kOiAnY29tbWl0IGJvb2xlYW4gYXR0cmlidXRlJztcbiAgICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICB2YWx1ZTogYm9vbGVhbjtcbiAgICAgIG9wdGlvbnM6IFJlbmRlck9wdGlvbnMgfCB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBDb21taXRFdmVudExpc3RlbmVyIHtcbiAgICAgIGtpbmQ6ICdjb21taXQgZXZlbnQgbGlzdGVuZXInO1xuICAgICAgZWxlbWVudDogRWxlbWVudDtcbiAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgb2xkTGlzdGVuZXI6IHVua25vd247XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgICAgLy8gVHJ1ZSBpZiB3ZSdyZSByZW1vdmluZyB0aGUgb2xkIGV2ZW50IGxpc3RlbmVyIChlLmcuIGJlY2F1c2Ugc2V0dGluZ3MgY2hhbmdlZCwgb3IgdmFsdWUgaXMgbm90aGluZylcbiAgICAgIHJlbW92ZUxpc3RlbmVyOiBib29sZWFuO1xuICAgICAgLy8gVHJ1ZSBpZiB3ZSdyZSBhZGRpbmcgYSBuZXcgZXZlbnQgbGlzdGVuZXIgKGUuZy4gYmVjYXVzZSBmaXJzdCByZW5kZXIsIG9yIHNldHRpbmdzIGNoYW5nZWQpXG4gICAgICBhZGRMaXN0ZW5lcjogYm9vbGVhbjtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIENvbW1pdFRvRWxlbWVudEJpbmRpbmcge1xuICAgICAga2luZDogJ2NvbW1pdCB0byBlbGVtZW50IGJpbmRpbmcnO1xuICAgICAgZWxlbWVudDogRWxlbWVudDtcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlYnVnTG9nZ2luZ1dpbmRvdyB7XG4gIC8vIEV2ZW4gaW4gZGV2IG1vZGUsIHdlIGdlbmVyYWxseSBkb24ndCB3YW50IHRvIGVtaXQgdGhlc2UgZXZlbnRzLCBhcyB0aGF0J3NcbiAgLy8gYW5vdGhlciBsZXZlbCBvZiBjb3N0LCBzbyBvbmx5IGVtaXQgdGhlbSB3aGVuIERFVl9NT0RFIGlzIHRydWUgX2FuZF8gd2hlblxuICAvLyB3aW5kb3cuZW1pdExpdERlYnVnRXZlbnRzIGlzIHRydWUuXG4gIGVtaXRMaXREZWJ1Z0xvZ0V2ZW50cz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogVXNlZnVsIGZvciB2aXN1YWxpemluZyBhbmQgbG9nZ2luZyBpbnNpZ2h0cyBpbnRvIHdoYXQgdGhlIExpdCB0ZW1wbGF0ZSBzeXN0ZW0gaXMgZG9pbmcuXG4gKlxuICogQ29tcGlsZWQgb3V0IG9mIHByb2QgbW9kZSBidWlsZHMuXG4gKi9cbmNvbnN0IGRlYnVnTG9nRXZlbnQgPSBERVZfTU9ERVxuICA/IChldmVudDogTGl0VW5zdGFibGUuRGVidWdMb2cuRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHNob3VsZEVtaXQgPSAoZ2xvYmFsIGFzIHVua25vd24gYXMgRGVidWdMb2dnaW5nV2luZG93KVxuICAgICAgICAuZW1pdExpdERlYnVnTG9nRXZlbnRzO1xuICAgICAgaWYgKCFzaG91bGRFbWl0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGdsb2JhbC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQ8TGl0VW5zdGFibGUuRGVidWdMb2cuRW50cnk+KCdsaXQtZGVidWcnLCB7XG4gICAgICAgICAgZGV0YWlsOiBldmVudCxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICA6IHVuZGVmaW5lZDtcbi8vIFVzZWQgZm9yIGNvbm5lY3RpbmcgYmVnaW5SZW5kZXIgYW5kIGVuZFJlbmRlciBldmVudHMgd2hlbiB0aGVyZSBhcmUgbmVzdGVkXG4vLyByZW5kZXJzIHdoZW4gZXJyb3JzIGFyZSB0aHJvd24gcHJldmVudGluZyBhbiBlbmRSZW5kZXIgZXZlbnQgZnJvbSBiZWluZ1xuLy8gY2FsbGVkLlxubGV0IGRlYnVnTG9nUmVuZGVySWQgPSAwO1xuXG5sZXQgaXNzdWVXYXJuaW5nOiAoY29kZTogc3RyaW5nLCB3YXJuaW5nOiBzdHJpbmcpID0+IHZvaWQ7XG5cbmlmIChERVZfTU9ERSkge1xuICBnbG9iYWwubGl0SXNzdWVkV2FybmluZ3MgPz89IG5ldyBTZXQoKTtcblxuICAvKipcbiAgICogSXNzdWUgYSB3YXJuaW5nIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgYmFzZWQgZWl0aGVyIG9uIGBjb2RlYCBvciBgd2FybmluZ2AuXG4gICAqIFdhcm5pbmdzIGFyZSBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5IG9ubHkgYnkgYHdhcm5pbmdgOyBkaXNhYmxpbmcgdmlhIGBjb2RlYFxuICAgKiBjYW4gYmUgZG9uZSBieSB1c2Vycy5cbiAgICovXG4gIGlzc3VlV2FybmluZyA9IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4ge1xuICAgIHdhcm5pbmcgKz0gY29kZVxuICAgICAgPyBgIFNlZSBodHRwczovL2xpdC5kZXYvbXNnLyR7Y29kZX0gZm9yIG1vcmUgaW5mb3JtYXRpb24uYFxuICAgICAgOiAnJztcbiAgICBpZiAoXG4gICAgICAhZ2xvYmFsLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMod2FybmluZykgJiZcbiAgICAgICFnbG9iYWwubGl0SXNzdWVkV2FybmluZ3MhLmhhcyhjb2RlKVxuICAgICkge1xuICAgICAgY29uc29sZS53YXJuKHdhcm5pbmcpO1xuICAgICAgZ2xvYmFsLmxpdElzc3VlZFdhcm5pbmdzIS5hZGQod2FybmluZyk7XG4gICAgfVxuICB9O1xuXG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAnZGV2LW1vZGUnLFxuICAgICAgYExpdCBpcyBpbiBkZXYgbW9kZS4gTm90IHJlY29tbWVuZGVkIGZvciBwcm9kdWN0aW9uIWBcbiAgICApO1xuICB9KTtcbn1cblxuY29uc3Qgd3JhcCA9XG4gIEVOQUJMRV9TSEFEWURPTV9OT1BBVENIICYmXG4gIGdsb2JhbC5TaGFkeURPTT8uaW5Vc2UgJiZcbiAgZ2xvYmFsLlNoYWR5RE9NPy5ub1BhdGNoID09PSB0cnVlXG4gICAgPyAoZ2xvYmFsLlNoYWR5RE9NIS53cmFwIGFzIDxUIGV4dGVuZHMgTm9kZT4obm9kZTogVCkgPT4gVClcbiAgICA6IDxUIGV4dGVuZHMgTm9kZT4obm9kZTogVCkgPT4gbm9kZTtcblxuY29uc3QgdHJ1c3RlZFR5cGVzID0gKGdsb2JhbCBhcyB1bmtub3duIGFzIFRydXN0ZWRUeXBlc1dpbmRvdykudHJ1c3RlZFR5cGVzO1xuXG4vKipcbiAqIE91ciBUcnVzdGVkVHlwZVBvbGljeSBmb3IgSFRNTCB3aGljaCBpcyBkZWNsYXJlZCB1c2luZyB0aGUgaHRtbCB0ZW1wbGF0ZVxuICogdGFnIGZ1bmN0aW9uLlxuICpcbiAqIFRoYXQgSFRNTCBpcyBhIGRldmVsb3Blci1hdXRob3JlZCBjb25zdGFudCwgYW5kIGlzIHBhcnNlZCB3aXRoIGlubmVySFRNTFxuICogYmVmb3JlIGFueSB1bnRydXN0ZWQgZXhwcmVzc2lvbnMgaGF2ZSBiZWVuIG1peGVkIGluLiBUaGVyZWZvciBpdCBpc1xuICogY29uc2lkZXJlZCBzYWZlIGJ5IGNvbnN0cnVjdGlvbi5cbiAqL1xuY29uc3QgcG9saWN5ID0gdHJ1c3RlZFR5cGVzXG4gID8gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSgnbGl0LWh0bWwnLCB7XG4gICAgICBjcmVhdGVIVE1MOiAocykgPT4gcyxcbiAgICB9KVxuICA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBVc2VkIHRvIHNhbml0aXplIGFueSB2YWx1ZSBiZWZvcmUgaXQgaXMgd3JpdHRlbiBpbnRvIHRoZSBET00uIFRoaXMgY2FuIGJlXG4gKiB1c2VkIHRvIGltcGxlbWVudCBhIHNlY3VyaXR5IHBvbGljeSBvZiBhbGxvd2VkIGFuZCBkaXNhbGxvd2VkIHZhbHVlcyBpblxuICogb3JkZXIgdG8gcHJldmVudCBYU1MgYXR0YWNrcy5cbiAqXG4gKiBPbmUgd2F5IG9mIHVzaW5nIHRoaXMgY2FsbGJhY2sgd291bGQgYmUgdG8gY2hlY2sgYXR0cmlidXRlcyBhbmQgcHJvcGVydGllc1xuICogYWdhaW5zdCBhIGxpc3Qgb2YgaGlnaCByaXNrIGZpZWxkcywgYW5kIHJlcXVpcmUgdGhhdCB2YWx1ZXMgd3JpdHRlbiB0byBzdWNoXG4gKiBmaWVsZHMgYmUgaW5zdGFuY2VzIG9mIGEgY2xhc3Mgd2hpY2ggaXMgc2FmZSBieSBjb25zdHJ1Y3Rpb24uIENsb3N1cmUncyBTYWZlXG4gKiBIVE1MIFR5cGVzIGlzIG9uZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIHRlY2huaXF1ZSAoXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL3NhZmUtaHRtbC10eXBlcy9ibG9iL21hc3Rlci9kb2Mvc2FmZWh0bWwtdHlwZXMubWQpLlxuICogVGhlIFRydXN0ZWRUeXBlcyBwb2x5ZmlsbCBpbiBBUEktb25seSBtb2RlIGNvdWxkIGFsc28gYmUgdXNlZCBhcyBhIGJhc2lzXG4gKiBmb3IgdGhpcyB0ZWNobmlxdWUgKGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL3RydXN0ZWQtdHlwZXMpLlxuICpcbiAqIEBwYXJhbSBub2RlIFRoZSBIVE1MIG5vZGUgKHVzdWFsbHkgZWl0aGVyIGEgI3RleHQgbm9kZSBvciBhbiBFbGVtZW50KSB0aGF0XG4gKiAgICAgaXMgYmVpbmcgd3JpdHRlbiB0by4gTm90ZSB0aGF0IHRoaXMgaXMganVzdCBhbiBleGVtcGxhciBub2RlLCB0aGUgd3JpdGVcbiAqICAgICBtYXkgdGFrZSBwbGFjZSBhZ2FpbnN0IGFub3RoZXIgaW5zdGFuY2Ugb2YgdGhlIHNhbWUgY2xhc3Mgb2Ygbm9kZS5cbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIGFuIGF0dHJpYnV0ZSBvciBwcm9wZXJ0eSAoZm9yIGV4YW1wbGUsICdocmVmJykuXG4gKiBAcGFyYW0gdHlwZSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgd3JpdGUgdGhhdCdzIGFib3V0IHRvIGJlIHBlcmZvcm1lZCB3aWxsXG4gKiAgICAgYmUgdG8gYSBwcm9wZXJ0eSBvciBhIG5vZGUuXG4gKiBAcmV0dXJuIEEgZnVuY3Rpb24gdGhhdCB3aWxsIHNhbml0aXplIHRoaXMgY2xhc3Mgb2Ygd3JpdGVzLlxuICovXG5leHBvcnQgdHlwZSBTYW5pdGl6ZXJGYWN0b3J5ID0gKFxuICBub2RlOiBOb2RlLFxuICBuYW1lOiBzdHJpbmcsXG4gIHR5cGU6ICdwcm9wZXJ0eScgfCAnYXR0cmlidXRlJ1xuKSA9PiBWYWx1ZVNhbml0aXplcjtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIGNhbiBzYW5pdGl6ZSB2YWx1ZXMgdGhhdCB3aWxsIGJlIHdyaXR0ZW4gdG8gYSBzcGVjaWZpYyBraW5kXG4gKiBvZiBET00gc2luay5cbiAqXG4gKiBTZWUgU2FuaXRpemVyRmFjdG9yeS5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHNhbml0aXplLiBXaWxsIGJlIHRoZSBhY3R1YWwgdmFsdWUgcGFzc2VkIGludG9cbiAqICAgICB0aGUgbGl0LWh0bWwgdGVtcGxhdGUgbGl0ZXJhbCwgc28gdGhpcyBjb3VsZCBiZSBvZiBhbnkgdHlwZS5cbiAqIEByZXR1cm4gVGhlIHZhbHVlIHRvIHdyaXRlIHRvIHRoZSBET00uIFVzdWFsbHkgdGhlIHNhbWUgYXMgdGhlIGlucHV0IHZhbHVlLFxuICogICAgIHVubGVzcyBzYW5pdGl6YXRpb24gaXMgbmVlZGVkLlxuICovXG5leHBvcnQgdHlwZSBWYWx1ZVNhbml0aXplciA9ICh2YWx1ZTogdW5rbm93bikgPT4gdW5rbm93bjtcblxuY29uc3QgaWRlbnRpdHlGdW5jdGlvbjogVmFsdWVTYW5pdGl6ZXIgPSAodmFsdWU6IHVua25vd24pID0+IHZhbHVlO1xuY29uc3Qgbm9vcFNhbml0aXplcjogU2FuaXRpemVyRmFjdG9yeSA9IChcbiAgX25vZGU6IE5vZGUsXG4gIF9uYW1lOiBzdHJpbmcsXG4gIF90eXBlOiAncHJvcGVydHknIHwgJ2F0dHJpYnV0ZSdcbikgPT4gaWRlbnRpdHlGdW5jdGlvbjtcblxuLyoqIFNldHMgdGhlIGdsb2JhbCBzYW5pdGl6ZXIgZmFjdG9yeS4gKi9cbmNvbnN0IHNldFNhbml0aXplciA9IChuZXdTYW5pdGl6ZXI6IFNhbml0aXplckZhY3RvcnkpID0+IHtcbiAgaWYgKCFFTkFCTEVfRVhUUkFfU0VDVVJJVFlfSE9PS1MpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHNhbml0aXplckZhY3RvcnlJbnRlcm5hbCAhPT0gbm9vcFNhbml0aXplcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBBdHRlbXB0ZWQgdG8gb3ZlcndyaXRlIGV4aXN0aW5nIGxpdC1odG1sIHNlY3VyaXR5IHBvbGljeS5gICtcbiAgICAgICAgYCBzZXRTYW5pdGl6ZURPTVZhbHVlRmFjdG9yeSBzaG91bGQgYmUgY2FsbGVkIGF0IG1vc3Qgb25jZS5gXG4gICAgKTtcbiAgfVxuICBzYW5pdGl6ZXJGYWN0b3J5SW50ZXJuYWwgPSBuZXdTYW5pdGl6ZXI7XG59O1xuXG4vKipcbiAqIE9ubHkgdXNlZCBpbiBpbnRlcm5hbCB0ZXN0cywgbm90IGEgcGFydCBvZiB0aGUgcHVibGljIEFQSS5cbiAqL1xuY29uc3QgX3Rlc3RPbmx5Q2xlYXJTYW5pdGl6ZXJGYWN0b3J5RG9Ob3RDYWxsT3JFbHNlID0gKCkgPT4ge1xuICBzYW5pdGl6ZXJGYWN0b3J5SW50ZXJuYWwgPSBub29wU2FuaXRpemVyO1xufTtcblxuY29uc3QgY3JlYXRlU2FuaXRpemVyOiBTYW5pdGl6ZXJGYWN0b3J5ID0gKG5vZGUsIG5hbWUsIHR5cGUpID0+IHtcbiAgcmV0dXJuIHNhbml0aXplckZhY3RvcnlJbnRlcm5hbChub2RlLCBuYW1lLCB0eXBlKTtcbn07XG5cbi8vIEFkZGVkIHRvIGFuIGF0dHJpYnV0ZSBuYW1lIHRvIG1hcmsgdGhlIGF0dHJpYnV0ZSBhcyBib3VuZCBzbyB3ZSBjYW4gZmluZFxuLy8gaXQgZWFzaWx5LlxuY29uc3QgYm91bmRBdHRyaWJ1dGVTdWZmaXggPSAnJGxpdCQnO1xuXG4vLyBUaGlzIG1hcmtlciBpcyB1c2VkIGluIG1hbnkgc3ludGFjdGljIHBvc2l0aW9ucyBpbiBIVE1MLCBzbyBpdCBtdXN0IGJlXG4vLyBhIHZhbGlkIGVsZW1lbnQgbmFtZSBhbmQgYXR0cmlidXRlIG5hbWUuIFdlIGRvbid0IHN1cHBvcnQgZHluYW1pYyBuYW1lcyAoeWV0KVxuLy8gYnV0IHRoaXMgYXQgbGVhc3QgZW5zdXJlcyB0aGF0IHRoZSBwYXJzZSB0cmVlIGlzIGNsb3NlciB0byB0aGUgdGVtcGxhdGVcbi8vIGludGVudGlvbi5cbmNvbnN0IG1hcmtlciA9IGBsaXQkJHtNYXRoLnJhbmRvbSgpLnRvRml4ZWQoOSkuc2xpY2UoMil9JGA7XG5cbi8vIFN0cmluZyB1c2VkIHRvIHRlbGwgaWYgYSBjb21tZW50IGlzIGEgbWFya2VyIGNvbW1lbnRcbmNvbnN0IG1hcmtlck1hdGNoID0gJz8nICsgbWFya2VyO1xuXG4vLyBUZXh0IHVzZWQgdG8gaW5zZXJ0IGEgY29tbWVudCBtYXJrZXIgbm9kZS4gV2UgdXNlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb25cbi8vIHN5bnRheCBiZWNhdXNlIGl0J3Mgc2xpZ2h0bHkgc21hbGxlciwgYnV0IHBhcnNlcyBhcyBhIGNvbW1lbnQgbm9kZS5cbmNvbnN0IG5vZGVNYXJrZXIgPSBgPCR7bWFya2VyTWF0Y2h9PmA7XG5cbmNvbnN0IGQgPVxuICBOT0RFX01PREUgJiYgZ2xvYmFsLmRvY3VtZW50ID09PSB1bmRlZmluZWRcbiAgICA/ICh7XG4gICAgICAgIGNyZWF0ZVRyZWVXYWxrZXIoKSB7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9LFxuICAgICAgfSBhcyB1bmtub3duIGFzIERvY3VtZW50KVxuICAgIDogZG9jdW1lbnQ7XG5cbi8vIENyZWF0ZXMgYSBkeW5hbWljIG1hcmtlci4gV2UgbmV2ZXIgaGF2ZSB0byBzZWFyY2ggZm9yIHRoZXNlIGluIHRoZSBET00uXG5jb25zdCBjcmVhdGVNYXJrZXIgPSAoKSA9PiBkLmNyZWF0ZUNvbW1lbnQoJycpO1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10eXBlb2Ytb3BlcmF0b3JcbnR5cGUgUHJpbWl0aXZlID0gbnVsbCB8IHVuZGVmaW5lZCB8IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfCBzeW1ib2wgfCBiaWdpbnQ7XG5jb25zdCBpc1ByaW1pdGl2ZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFByaW1pdGl2ZSA9PlxuICB2YWx1ZSA9PT0gbnVsbCB8fCAodHlwZW9mIHZhbHVlICE9ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSAhPSAnZnVuY3Rpb24nKTtcbmNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuY29uc3QgaXNJdGVyYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIEl0ZXJhYmxlPHVua25vd24+ID0+XG4gIGlzQXJyYXkodmFsdWUpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHR5cGVvZiAodmFsdWUgYXMgYW55KT8uW1N5bWJvbC5pdGVyYXRvcl0gPT09ICdmdW5jdGlvbic7XG5cbmNvbnN0IFNQQUNFX0NIQVIgPSBgWyBcXHRcXG5cXGZcXHJdYDtcbmNvbnN0IEFUVFJfVkFMVUVfQ0hBUiA9IGBbXiBcXHRcXG5cXGZcXHJcIidcXGA8Pj1dYDtcbmNvbnN0IE5BTUVfQ0hBUiA9IGBbXlxcXFxzXCInPj0vXWA7XG5cbi8vIFRoZXNlIHJlZ2V4ZXMgcmVwcmVzZW50IHRoZSBmaXZlIHBhcnNpbmcgc3RhdGVzIHRoYXQgd2UgY2FyZSBhYm91dCBpbiB0aGVcbi8vIFRlbXBsYXRlJ3MgSFRNTCBzY2FubmVyLiBUaGV5IG1hdGNoIHRoZSAqZW5kKiBvZiB0aGUgc3RhdGUgdGhleSdyZSBuYW1lZFxuLy8gYWZ0ZXIuXG4vLyBEZXBlbmRpbmcgb24gdGhlIG1hdGNoLCB3ZSB0cmFuc2l0aW9uIHRvIGEgbmV3IHN0YXRlLiBJZiB0aGVyZSdzIG5vIG1hdGNoLFxuLy8gd2Ugc3RheSBpbiB0aGUgc2FtZSBzdGF0ZS5cbi8vIE5vdGUgdGhhdCB0aGUgcmVnZXhlcyBhcmUgc3RhdGVmdWwuIFdlIHV0aWxpemUgbGFzdEluZGV4IGFuZCBzeW5jIGl0XG4vLyBhY3Jvc3MgdGhlIG11bHRpcGxlIHJlZ2V4ZXMgdXNlZC4gSW4gYWRkaXRpb24gdG8gdGhlIGZpdmUgcmVnZXhlcyBiZWxvd1xuLy8gd2UgYWxzbyBkeW5hbWljYWxseSBjcmVhdGUgYSByZWdleCB0byBmaW5kIHRoZSBtYXRjaGluZyBlbmQgdGFncyBmb3IgcmF3XG4vLyB0ZXh0IGVsZW1lbnRzLlxuXG4vKipcbiAqIEVuZCBvZiB0ZXh0IGlzOiBgPGAgZm9sbG93ZWQgYnk6XG4gKiAgIChjb21tZW50IHN0YXJ0KSBvciAodGFnKSBvciAoZHluYW1pYyB0YWcgYmluZGluZylcbiAqL1xuY29uc3QgdGV4dEVuZFJlZ2V4ID0gLzwoPzooIS0tfFxcL1teYS16QS1aXSl8KFxcLz9bYS16QS1aXVtePlxcc10qKXwoXFwvPyQpKS9nO1xuY29uc3QgQ09NTUVOVF9TVEFSVCA9IDE7XG5jb25zdCBUQUdfTkFNRSA9IDI7XG5jb25zdCBEWU5BTUlDX1RBR19OQU1FID0gMztcblxuY29uc3QgY29tbWVudEVuZFJlZ2V4ID0gLy0tPi9nO1xuLyoqXG4gKiBDb21tZW50cyBub3Qgc3RhcnRlZCB3aXRoIDwhLS0sIGxpa2UgPC97LCBjYW4gYmUgZW5kZWQgYnkgYSBzaW5nbGUgYD5gXG4gKi9cbmNvbnN0IGNvbW1lbnQyRW5kUmVnZXggPSAvPi9nO1xuXG4vKipcbiAqIFRoZSB0YWdFbmQgcmVnZXggbWF0Y2hlcyB0aGUgZW5kIG9mIHRoZSBcImluc2lkZSBhbiBvcGVuaW5nXCIgdGFnIHN5bnRheFxuICogcG9zaXRpb24uIEl0IGVpdGhlciBtYXRjaGVzIGEgYD5gLCBhbiBhdHRyaWJ1dGUtbGlrZSBzZXF1ZW5jZSwgb3IgdGhlIGVuZFxuICogb2YgdGhlIHN0cmluZyBhZnRlciBhIHNwYWNlIChhdHRyaWJ1dGUtbmFtZSBwb3NpdGlvbiBlbmRpbmcpLlxuICpcbiAqIFNlZSBhdHRyaWJ1dGVzIGluIHRoZSBIVE1MIHNwZWM6XG4gKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjZWxlbWVudHMtYXR0cmlidXRlc1xuICpcbiAqIFwiIFxcdFxcblxcZlxcclwiIGFyZSBIVE1MIHNwYWNlIGNoYXJhY3RlcnM6XG4gKiBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jYXNjaWktd2hpdGVzcGFjZVxuICpcbiAqIFNvIGFuIGF0dHJpYnV0ZSBpczpcbiAqICAqIFRoZSBuYW1lOiBhbnkgY2hhcmFjdGVyIGV4Y2VwdCBhIHdoaXRlc3BhY2UgY2hhcmFjdGVyLCAoXCIpLCAoJyksIFwiPlwiLFxuICogICAgXCI9XCIsIG9yIFwiL1wiLiBOb3RlOiB0aGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBIVE1MIHNwZWMgd2hpY2ggYWxzbyBleGNsdWRlcyBjb250cm9sIGNoYXJhY3RlcnMuXG4gKiAgKiBGb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgc3BhY2UgY2hhcmFjdGVyc1xuICogICogRm9sbG93ZWQgYnkgXCI9XCJcbiAqICAqIEZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBzcGFjZSBjaGFyYWN0ZXJzXG4gKiAgKiBGb2xsb3dlZCBieTpcbiAqICAgICogQW55IGNoYXJhY3RlciBleGNlcHQgc3BhY2UsICgnKSwgKFwiKSwgXCI8XCIsIFwiPlwiLCBcIj1cIiwgKGApLCBvclxuICogICAgKiAoXCIpIHRoZW4gYW55IG5vbi0oXCIpLCBvclxuICogICAgKiAoJykgdGhlbiBhbnkgbm9uLSgnKVxuICovXG5jb25zdCB0YWdFbmRSZWdleCA9IG5ldyBSZWdFeHAoXG4gIGA+fCR7U1BBQ0VfQ0hBUn0oPzooJHtOQU1FX0NIQVJ9KykoJHtTUEFDRV9DSEFSfSo9JHtTUEFDRV9DSEFSfSooPzoke0FUVFJfVkFMVUVfQ0hBUn18KFwifCcpfCkpfCQpYCxcbiAgJ2cnXG4pO1xuY29uc3QgRU5USVJFX01BVENIID0gMDtcbmNvbnN0IEFUVFJJQlVURV9OQU1FID0gMTtcbmNvbnN0IFNQQUNFU19BTkRfRVFVQUxTID0gMjtcbmNvbnN0IFFVT1RFX0NIQVIgPSAzO1xuXG5jb25zdCBzaW5nbGVRdW90ZUF0dHJFbmRSZWdleCA9IC8nL2c7XG5jb25zdCBkb3VibGVRdW90ZUF0dHJFbmRSZWdleCA9IC9cIi9nO1xuLyoqXG4gKiBNYXRjaGVzIHRoZSByYXcgdGV4dCBlbGVtZW50cy5cbiAqXG4gKiBDb21tZW50cyBhcmUgbm90IHBhcnNlZCB3aXRoaW4gcmF3IHRleHQgZWxlbWVudHMsIHNvIHdlIG5lZWQgdG8gc2VhcmNoIHRoZWlyXG4gKiB0ZXh0IGNvbnRlbnQgZm9yIG1hcmtlciBzdHJpbmdzLlxuICovXG5jb25zdCByYXdUZXh0RWxlbWVudCA9IC9eKD86c2NyaXB0fHN0eWxlfHRleHRhcmVhfHRpdGxlKSQvaTtcblxuLyoqIFRlbXBsYXRlUmVzdWx0IHR5cGVzICovXG5jb25zdCBIVE1MX1JFU1VMVCA9IDE7XG5jb25zdCBTVkdfUkVTVUxUID0gMjtcbmNvbnN0IE1BVEhNTF9SRVNVTFQgPSAzO1xuXG50eXBlIFJlc3VsdFR5cGUgPSB0eXBlb2YgSFRNTF9SRVNVTFQgfCB0eXBlb2YgU1ZHX1JFU1VMVCB8IHR5cGVvZiBNQVRITUxfUkVTVUxUO1xuXG4vLyBUZW1wbGF0ZVBhcnQgdHlwZXNcbi8vIElNUE9SVEFOVDogdGhlc2UgbXVzdCBtYXRjaCB0aGUgdmFsdWVzIGluIFBhcnRUeXBlXG5jb25zdCBBVFRSSUJVVEVfUEFSVCA9IDE7XG5jb25zdCBDSElMRF9QQVJUID0gMjtcbmNvbnN0IFBST1BFUlRZX1BBUlQgPSAzO1xuY29uc3QgQk9PTEVBTl9BVFRSSUJVVEVfUEFSVCA9IDQ7XG5jb25zdCBFVkVOVF9QQVJUID0gNTtcbmNvbnN0IEVMRU1FTlRfUEFSVCA9IDY7XG5jb25zdCBDT01NRU5UX1BBUlQgPSA3O1xuXG4vKipcbiAqIFRoZSByZXR1cm4gdHlwZSBvZiB0aGUgdGVtcGxhdGUgdGFnIGZ1bmN0aW9ucywge0BsaW5rY29kZSBodG1sfSBhbmRcbiAqIHtAbGlua2NvZGUgc3ZnfSB3aGVuIGl0IGhhc24ndCBiZWVuIGNvbXBpbGVkIGJ5IEBsaXQtbGFicy9jb21waWxlci5cbiAqXG4gKiBBIGBUZW1wbGF0ZVJlc3VsdGAgb2JqZWN0IGhvbGRzIGFsbCB0aGUgaW5mb3JtYXRpb24gYWJvdXQgYSB0ZW1wbGF0ZVxuICogZXhwcmVzc2lvbiByZXF1aXJlZCB0byByZW5kZXIgaXQ6IHRoZSB0ZW1wbGF0ZSBzdHJpbmdzLCBleHByZXNzaW9uIHZhbHVlcyxcbiAqIGFuZCB0eXBlIG9mIHRlbXBsYXRlIChodG1sIG9yIHN2ZykuXG4gKlxuICogYFRlbXBsYXRlUmVzdWx0YCBvYmplY3RzIGRvIG5vdCBjcmVhdGUgYW55IERPTSBvbiB0aGVpciBvd24uIFRvIGNyZWF0ZSBvclxuICogdXBkYXRlIERPTSB5b3UgbmVlZCB0byByZW5kZXIgdGhlIGBUZW1wbGF0ZVJlc3VsdGAuIFNlZVxuICogW1JlbmRlcmluZ10oaHR0cHM6Ly9saXQuZGV2L2RvY3MvY29tcG9uZW50cy9yZW5kZXJpbmcpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqL1xuZXhwb3J0IHR5cGUgVW5jb21waWxlZFRlbXBsYXRlUmVzdWx0PFQgZXh0ZW5kcyBSZXN1bHRUeXBlID0gUmVzdWx0VHlwZT4gPSB7XG4gIC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gIFsnXyRsaXRUeXBlJCddOiBUO1xuICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheTtcbiAgdmFsdWVzOiB1bmtub3duW107XG59O1xuXG4vKipcbiAqIFRoaXMgaXMgYSB0ZW1wbGF0ZSByZXN1bHQgdGhhdCBtYXkgYmUgZWl0aGVyIHVuY29tcGlsZWQgb3IgY29tcGlsZWQuXG4gKlxuICogSW4gdGhlIGZ1dHVyZSwgVGVtcGxhdGVSZXN1bHQgd2lsbCBiZSB0aGlzIHR5cGUuIElmIHlvdSB3YW50IHRvIGV4cGxpY2l0bHlcbiAqIG5vdGUgdGhhdCBhIHRlbXBsYXRlIHJlc3VsdCBpcyBwb3RlbnRpYWxseSBjb21waWxlZCwgeW91IGNhbiByZWZlcmVuY2UgdGhpc1xuICogdHlwZSBhbmQgaXQgd2lsbCBjb250aW51ZSB0byBiZWhhdmUgdGhlIHNhbWUgdGhyb3VnaCB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uXG4gKiBvZiBMaXQuIFRoaXMgY2FuIGJlIHVzZWZ1bCBmb3IgY29kZSB0aGF0IHdhbnRzIHRvIHByZXBhcmUgZm9yIHRoZSBuZXh0XG4gKiBtYWpvciB2ZXJzaW9uIG9mIExpdC5cbiAqL1xuZXhwb3J0IHR5cGUgTWF5YmVDb21waWxlZFRlbXBsYXRlUmVzdWx0PFQgZXh0ZW5kcyBSZXN1bHRUeXBlID0gUmVzdWx0VHlwZT4gPVxuICB8IFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdDxUPlxuICB8IENvbXBpbGVkVGVtcGxhdGVSZXN1bHQ7XG5cbi8qKlxuICogVGhlIHJldHVybiB0eXBlIG9mIHRoZSB0ZW1wbGF0ZSB0YWcgZnVuY3Rpb25zLCB7QGxpbmtjb2RlIGh0bWx9IGFuZFxuICoge0BsaW5rY29kZSBzdmd9LlxuICpcbiAqIEEgYFRlbXBsYXRlUmVzdWx0YCBvYmplY3QgaG9sZHMgYWxsIHRoZSBpbmZvcm1hdGlvbiBhYm91dCBhIHRlbXBsYXRlXG4gKiBleHByZXNzaW9uIHJlcXVpcmVkIHRvIHJlbmRlciBpdDogdGhlIHRlbXBsYXRlIHN0cmluZ3MsIGV4cHJlc3Npb24gdmFsdWVzLFxuICogYW5kIHR5cGUgb2YgdGVtcGxhdGUgKGh0bWwgb3Igc3ZnKS5cbiAqXG4gKiBgVGVtcGxhdGVSZXN1bHRgIG9iamVjdHMgZG8gbm90IGNyZWF0ZSBhbnkgRE9NIG9uIHRoZWlyIG93bi4gVG8gY3JlYXRlIG9yXG4gKiB1cGRhdGUgRE9NIHlvdSBuZWVkIHRvIHJlbmRlciB0aGUgYFRlbXBsYXRlUmVzdWx0YC4gU2VlXG4gKiBbUmVuZGVyaW5nXShodHRwczovL2xpdC5kZXYvZG9jcy9jb21wb25lbnRzL3JlbmRlcmluZykgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogSW4gTGl0IDQsIHRoaXMgdHlwZSB3aWxsIGJlIGFuIGFsaWFzIG9mXG4gKiBNYXliZUNvbXBpbGVkVGVtcGxhdGVSZXN1bHQsIHNvIHRoYXQgY29kZSB3aWxsIGdldCB0eXBlIGVycm9ycyBpZiBpdCBhc3N1bWVzXG4gKiB0aGF0IExpdCB0ZW1wbGF0ZXMgYXJlIG5vdCBjb21waWxlZC4gV2hlbiBkZWxpYmVyYXRlbHkgd29ya2luZyB3aXRoIG9ubHlcbiAqIG9uZSwgdXNlIGVpdGhlciB7QGxpbmtjb2RlIENvbXBpbGVkVGVtcGxhdGVSZXN1bHR9IG9yXG4gKiB7QGxpbmtjb2RlIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdH0gZXhwbGljaXRseS5cbiAqL1xuZXhwb3J0IHR5cGUgVGVtcGxhdGVSZXN1bHQ8VCBleHRlbmRzIFJlc3VsdFR5cGUgPSBSZXN1bHRUeXBlPiA9XG4gIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdDxUPjtcblxuZXhwb3J0IHR5cGUgSFRNTFRlbXBsYXRlUmVzdWx0ID0gVGVtcGxhdGVSZXN1bHQ8dHlwZW9mIEhUTUxfUkVTVUxUPjtcblxuZXhwb3J0IHR5cGUgU1ZHVGVtcGxhdGVSZXN1bHQgPSBUZW1wbGF0ZVJlc3VsdDx0eXBlb2YgU1ZHX1JFU1VMVD47XG5cbmV4cG9ydCB0eXBlIE1hdGhNTFRlbXBsYXRlUmVzdWx0ID0gVGVtcGxhdGVSZXN1bHQ8dHlwZW9mIE1BVEhNTF9SRVNVTFQ+O1xuXG4vKipcbiAqIEEgVGVtcGxhdGVSZXN1bHQgdGhhdCBoYXMgYmVlbiBjb21waWxlZCBieSBAbGl0LWxhYnMvY29tcGlsZXIsIHNraXBwaW5nIHRoZVxuICogcHJlcGFyZSBzdGVwLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBpbGVkVGVtcGxhdGVSZXN1bHQge1xuICAvLyBUaGlzIGlzIGEgZmFjdG9yeSBpbiBvcmRlciB0byBtYWtlIHRlbXBsYXRlIGluaXRpYWxpemF0aW9uIGxhenlcbiAgLy8gYW5kIGFsbG93IFNoYWR5UmVuZGVyT3B0aW9ucyBzY29wZSB0byBiZSBwYXNzZWQgaW4uXG4gIC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gIFsnXyRsaXRUeXBlJCddOiBDb21waWxlZFRlbXBsYXRlO1xuICB2YWx1ZXM6IHVua25vd25bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21waWxlZFRlbXBsYXRlIGV4dGVuZHMgT21pdDxUZW1wbGF0ZSwgJ2VsJz4ge1xuICAvLyBlbCBpcyBvdmVycmlkZGVuIHRvIGJlIG9wdGlvbmFsLiBXZSBpbml0aWFsaXplIGl0IG9uIGZpcnN0IHJlbmRlclxuICBlbD86IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgLy8gVGhlIHByZXBhcmVkIEhUTUwgc3RyaW5nIHRvIGNyZWF0ZSBhIHRlbXBsYXRlIGVsZW1lbnQgZnJvbS5cbiAgLy8gVGhlIHR5cGUgaXMgYSBUZW1wbGF0ZVN0cmluZ3NBcnJheSB0byBndWFyYW50ZWUgdGhhdCB0aGUgdmFsdWUgY2FtZSBmcm9tXG4gIC8vIHNvdXJjZSBjb2RlLCBwcmV2ZW50aW5nIGEgSlNPTiBpbmplY3Rpb24gYXR0YWNrLlxuICBoOiBUZW1wbGF0ZVN0cmluZ3NBcnJheTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSB0ZW1wbGF0ZSBsaXRlcmFsIHRhZyBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBUZW1wbGF0ZVJlc3VsdCB3aXRoXG4gKiB0aGUgZ2l2ZW4gcmVzdWx0IHR5cGUuXG4gKi9cbmNvbnN0IHRhZyA9XG4gIDxUIGV4dGVuZHMgUmVzdWx0VHlwZT4odHlwZTogVCkgPT5cbiAgKHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi52YWx1ZXM6IHVua25vd25bXSk6IFRlbXBsYXRlUmVzdWx0PFQ+ID0+IHtcbiAgICAvLyBXYXJuIGFnYWluc3QgdGVtcGxhdGVzIG9jdGFsIGVzY2FwZSBzZXF1ZW5jZXNcbiAgICAvLyBXZSBkbyB0aGlzIGhlcmUgcmF0aGVyIHRoYW4gaW4gcmVuZGVyIHNvIHRoYXQgdGhlIHdhcm5pbmcgaXMgY2xvc2VyIHRvIHRoZVxuICAgIC8vIHRlbXBsYXRlIGRlZmluaXRpb24uXG4gICAgaWYgKERFVl9NT0RFICYmIHN0cmluZ3Muc29tZSgocykgPT4gcyA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnU29tZSB0ZW1wbGF0ZSBzdHJpbmdzIGFyZSB1bmRlZmluZWQuXFxuJyArXG4gICAgICAgICAgJ1RoaXMgaXMgcHJvYmFibHkgY2F1c2VkIGJ5IGlsbGVnYWwgb2N0YWwgZXNjYXBlIHNlcXVlbmNlcy4nXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoREVWX01PREUpIHtcbiAgICAgIC8vIEltcG9ydCBzdGF0aWMtaHRtbC5qcyByZXN1bHRzIGluIGEgY2lyY3VsYXIgZGVwZW5kZW5jeSB3aGljaCBnMyBkb2Vzbid0XG4gICAgICAvLyBoYW5kbGUuIEluc3RlYWQgd2Uga25vdyB0aGF0IHN0YXRpYyB2YWx1ZXMgbXVzdCBoYXZlIHRoZSBmaWVsZFxuICAgICAgLy8gYF8kbGl0U3RhdGljJGAuXG4gICAgICBpZiAoXG4gICAgICAgIHZhbHVlcy5zb21lKCh2YWwpID0+ICh2YWwgYXMge18kbGl0U3RhdGljJDogdW5rbm93bn0pPy5bJ18kbGl0U3RhdGljJCddKVxuICAgICAgKSB7XG4gICAgICAgIGlzc3VlV2FybmluZyhcbiAgICAgICAgICAnJyxcbiAgICAgICAgICBgU3RhdGljIHZhbHVlcyAnbGl0ZXJhbCcgb3IgJ3Vuc2FmZVN0YXRpYycgY2Fubm90IGJlIHVzZWQgYXMgdmFsdWVzIHRvIG5vbi1zdGF0aWMgdGVtcGxhdGVzLlxcbmAgK1xuICAgICAgICAgICAgYFBsZWFzZSB1c2UgdGhlIHN0YXRpYyAnaHRtbCcgdGFnIGZ1bmN0aW9uLiBTZWUgaHR0cHM6Ly9saXQuZGV2L2RvY3MvdGVtcGxhdGVzL2V4cHJlc3Npb25zLyNzdGF0aWMtZXhwcmVzc2lvbnNgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgICAgWydfJGxpdFR5cGUkJ106IHR5cGUsXG4gICAgICBzdHJpbmdzLFxuICAgICAgdmFsdWVzLFxuICAgIH07XG4gIH07XG5cbi8qKlxuICogSW50ZXJwcmV0cyBhIHRlbXBsYXRlIGxpdGVyYWwgYXMgYW4gSFRNTCB0ZW1wbGF0ZSB0aGF0IGNhbiBlZmZpY2llbnRseVxuICogcmVuZGVyIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGhlYWRlciA9ICh0aXRsZTogc3RyaW5nKSA9PiBodG1sYDxoMT4ke3RpdGxlfTwvaDE+YDtcbiAqIGBgYFxuICpcbiAqIFRoZSBgaHRtbGAgdGFnIHJldHVybnMgYSBkZXNjcmlwdGlvbiBvZiB0aGUgRE9NIHRvIHJlbmRlciBhcyBhIHZhbHVlLiBJdCBpc1xuICogbGF6eSwgbWVhbmluZyBubyB3b3JrIGlzIGRvbmUgdW50aWwgdGhlIHRlbXBsYXRlIGlzIHJlbmRlcmVkLiBXaGVuIHJlbmRlcmluZyxcbiAqIGlmIGEgdGVtcGxhdGUgY29tZXMgZnJvbSB0aGUgc2FtZSBleHByZXNzaW9uIGFzIGEgcHJldmlvdXNseSByZW5kZXJlZCByZXN1bHQsXG4gKiBpdCdzIGVmZmljaWVudGx5IHVwZGF0ZWQgaW5zdGVhZCBvZiByZXBsYWNlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGh0bWwgPSB0YWcoSFRNTF9SRVNVTFQpO1xuXG4vKipcbiAqIEludGVycHJldHMgYSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIGFuIFNWRyBmcmFnbWVudCB0aGF0IGNhbiBlZmZpY2llbnRseSByZW5kZXJcbiAqIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IHJlY3QgPSBzdmdgPHJlY3Qgd2lkdGg9XCIxMFwiIGhlaWdodD1cIjEwXCI+PC9yZWN0PmA7XG4gKlxuICogY29uc3QgbXlJbWFnZSA9IGh0bWxgXG4gKiAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAqICAgICAke3JlY3R9XG4gKiAgIDwvc3ZnPmA7XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHN2Z2AgKnRhZyBmdW5jdGlvbiogc2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgU1ZHIGZyYWdtZW50cywgb3IgZWxlbWVudHNcbiAqIHRoYXQgd291bGQgYmUgY29udGFpbmVkICoqaW5zaWRlKiogYW4gYDxzdmc+YCBIVE1MIGVsZW1lbnQuIEEgY29tbW9uIGVycm9yIGlzXG4gKiBwbGFjaW5nIGFuIGA8c3ZnPmAgKmVsZW1lbnQqIGluIGEgdGVtcGxhdGUgdGFnZ2VkIHdpdGggdGhlIGBzdmdgIHRhZ1xuICogZnVuY3Rpb24uIFRoZSBgPHN2Zz5gIGVsZW1lbnQgaXMgYW4gSFRNTCBlbGVtZW50IGFuZCBzaG91bGQgYmUgdXNlZCB3aXRoaW4gYVxuICogdGVtcGxhdGUgdGFnZ2VkIHdpdGggdGhlIHtAbGlua2NvZGUgaHRtbH0gdGFnIGZ1bmN0aW9uLlxuICpcbiAqIEluIExpdEVsZW1lbnQgdXNhZ2UsIGl0J3MgaW52YWxpZCB0byByZXR1cm4gYW4gU1ZHIGZyYWdtZW50IGZyb20gdGhlXG4gKiBgcmVuZGVyKClgIG1ldGhvZCwgYXMgdGhlIFNWRyBmcmFnbWVudCB3aWxsIGJlIGNvbnRhaW5lZCB3aXRoaW4gdGhlIGVsZW1lbnQnc1xuICogc2hhZG93IHJvb3QgYW5kIHRodXMgbm90IGJlIHByb3Blcmx5IGNvbnRhaW5lZCB3aXRoaW4gYW4gYDxzdmc+YCBIVE1MXG4gKiBlbGVtZW50LlxuICovXG5leHBvcnQgY29uc3Qgc3ZnID0gdGFnKFNWR19SRVNVTFQpO1xuXG4vKipcbiAqIEludGVycHJldHMgYSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIE1hdGhNTCBmcmFnbWVudCB0aGF0IGNhbiBlZmZpY2llbnRseSByZW5kZXJcbiAqIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IG51bSA9IG1hdGhtbGA8bW4+MTwvbW4+YDtcbiAqXG4gKiBjb25zdCBlcSA9IGh0bWxgXG4gKiAgIDxtYXRoPlxuICogICAgICR7bnVtfVxuICogICA8L21hdGg+YDtcbiAqIGBgYFxuICpcbiAqIFRoZSBgbWF0aG1sYCAqdGFnIGZ1bmN0aW9uKiBzaG91bGQgb25seSBiZSB1c2VkIGZvciBNYXRoTUwgZnJhZ21lbnRzLCBvclxuICogZWxlbWVudHMgdGhhdCB3b3VsZCBiZSBjb250YWluZWQgKippbnNpZGUqKiBhIGA8bWF0aD5gIEhUTUwgZWxlbWVudC4gQSBjb21tb25cbiAqIGVycm9yIGlzIHBsYWNpbmcgYSBgPG1hdGg+YCAqZWxlbWVudCogaW4gYSB0ZW1wbGF0ZSB0YWdnZWQgd2l0aCB0aGUgYG1hdGhtbGBcbiAqIHRhZyBmdW5jdGlvbi4gVGhlIGA8bWF0aD5gIGVsZW1lbnQgaXMgYW4gSFRNTCBlbGVtZW50IGFuZCBzaG91bGQgYmUgdXNlZFxuICogd2l0aGluIGEgdGVtcGxhdGUgdGFnZ2VkIHdpdGggdGhlIHtAbGlua2NvZGUgaHRtbH0gdGFnIGZ1bmN0aW9uLlxuICpcbiAqIEluIExpdEVsZW1lbnQgdXNhZ2UsIGl0J3MgaW52YWxpZCB0byByZXR1cm4gYW4gTWF0aE1MIGZyYWdtZW50IGZyb20gdGhlXG4gKiBgcmVuZGVyKClgIG1ldGhvZCwgYXMgdGhlIE1hdGhNTCBmcmFnbWVudCB3aWxsIGJlIGNvbnRhaW5lZCB3aXRoaW4gdGhlXG4gKiBlbGVtZW50J3Mgc2hhZG93IHJvb3QgYW5kIHRodXMgbm90IGJlIHByb3Blcmx5IGNvbnRhaW5lZCB3aXRoaW4gYSBgPG1hdGg+YFxuICogSFRNTCBlbGVtZW50LlxuICovXG5leHBvcnQgY29uc3QgbWF0aG1sID0gdGFnKE1BVEhNTF9SRVNVTFQpO1xuXG4vKipcbiAqIEEgc2VudGluZWwgdmFsdWUgdGhhdCBzaWduYWxzIHRoYXQgYSB2YWx1ZSB3YXMgaGFuZGxlZCBieSBhIGRpcmVjdGl2ZSBhbmRcbiAqIHNob3VsZCBub3QgYmUgd3JpdHRlbiB0byB0aGUgRE9NLlxuICovXG5leHBvcnQgY29uc3Qgbm9DaGFuZ2UgPSBTeW1ib2wuZm9yKCdsaXQtbm9DaGFuZ2UnKTtcblxuLyoqXG4gKiBBIHNlbnRpbmVsIHZhbHVlIHRoYXQgc2lnbmFscyBhIENoaWxkUGFydCB0byBmdWxseSBjbGVhciBpdHMgY29udGVudC5cbiAqXG4gKiBgYGB0c1xuICogY29uc3QgYnV0dG9uID0gaHRtbGAke1xuICogIHVzZXIuaXNBZG1pblxuICogICAgPyBodG1sYDxidXR0b24+REVMRVRFPC9idXR0b24+YFxuICogICAgOiBub3RoaW5nXG4gKiB9YDtcbiAqIGBgYFxuICpcbiAqIFByZWZlciB1c2luZyBgbm90aGluZ2Agb3ZlciBvdGhlciBmYWxzeSB2YWx1ZXMgYXMgaXQgcHJvdmlkZXMgYSBjb25zaXN0ZW50XG4gKiBiZWhhdmlvciBiZXR3ZWVuIHZhcmlvdXMgZXhwcmVzc2lvbiBiaW5kaW5nIGNvbnRleHRzLlxuICpcbiAqIEluIGNoaWxkIGV4cHJlc3Npb25zLCBgdW5kZWZpbmVkYCwgYG51bGxgLCBgJydgLCBhbmQgYG5vdGhpbmdgIGFsbCBiZWhhdmUgdGhlXG4gKiBzYW1lIGFuZCByZW5kZXIgbm8gbm9kZXMuIEluIGF0dHJpYnV0ZSBleHByZXNzaW9ucywgYG5vdGhpbmdgIF9yZW1vdmVzXyB0aGVcbiAqIGF0dHJpYnV0ZSwgd2hpbGUgYHVuZGVmaW5lZGAgYW5kIGBudWxsYCB3aWxsIHJlbmRlciBhbiBlbXB0eSBzdHJpbmcuIEluXG4gKiBwcm9wZXJ0eSBleHByZXNzaW9ucyBgbm90aGluZ2AgYmVjb21lcyBgdW5kZWZpbmVkYC5cbiAqL1xuZXhwb3J0IGNvbnN0IG5vdGhpbmcgPSBTeW1ib2wuZm9yKCdsaXQtbm90aGluZycpO1xuXG4vKipcbiAqIFRoZSBjYWNoZSBvZiBwcmVwYXJlZCB0ZW1wbGF0ZXMsIGtleWVkIGJ5IHRoZSB0YWdnZWQgVGVtcGxhdGVTdHJpbmdzQXJyYXlcbiAqIGFuZCBfbm90XyBhY2NvdW50aW5nIGZvciB0aGUgc3BlY2lmaWMgdGVtcGxhdGUgdGFnIHVzZWQuIFRoaXMgbWVhbnMgdGhhdFxuICogdGVtcGxhdGUgdGFncyBjYW5ub3QgYmUgZHluYW1pYyAtIHRoZXkgbXVzdCBzdGF0aWNhbGx5IGJlIG9uZSBvZiBodG1sLCBzdmcsXG4gKiBvciBhdHRyLiBUaGlzIHJlc3RyaWN0aW9uIHNpbXBsaWZpZXMgdGhlIGNhY2hlIGxvb2t1cCwgd2hpY2ggaXMgb24gdGhlIGhvdFxuICogcGF0aCBmb3IgcmVuZGVyaW5nLlxuICovXG5jb25zdCB0ZW1wbGF0ZUNhY2hlID0gbmV3IFdlYWtNYXA8VGVtcGxhdGVTdHJpbmdzQXJyYXksIFRlbXBsYXRlPigpO1xuXG4vKipcbiAqIE9iamVjdCBzcGVjaWZ5aW5nIG9wdGlvbnMgZm9yIGNvbnRyb2xsaW5nIGxpdC1odG1sIHJlbmRlcmluZy4gTm90ZSB0aGF0XG4gKiB3aGlsZSBgcmVuZGVyYCBtYXkgYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzIG9uIHRoZSBzYW1lIGBjb250YWluZXJgIChhbmRcbiAqIGByZW5kZXJCZWZvcmVgIHJlZmVyZW5jZSBub2RlKSB0byBlZmZpY2llbnRseSB1cGRhdGUgdGhlIHJlbmRlcmVkIGNvbnRlbnQsXG4gKiBvbmx5IHRoZSBvcHRpb25zIHBhc3NlZCBpbiBkdXJpbmcgdGhlIGZpcnN0IHJlbmRlciBhcmUgcmVzcGVjdGVkIGR1cmluZ1xuICogdGhlIGxpZmV0aW1lIG9mIHJlbmRlcnMgdG8gdGhhdCB1bmlxdWUgYGNvbnRhaW5lcmAgKyBgcmVuZGVyQmVmb3JlYFxuICogY29tYmluYXRpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBBbiBvYmplY3QgdG8gdXNlIGFzIHRoZSBgdGhpc2AgdmFsdWUgZm9yIGV2ZW50IGxpc3RlbmVycy4gSXQncyBvZnRlblxuICAgKiB1c2VmdWwgdG8gc2V0IHRoaXMgdG8gdGhlIGhvc3QgY29tcG9uZW50IHJlbmRlcmluZyBhIHRlbXBsYXRlLlxuICAgKi9cbiAgaG9zdD86IG9iamVjdDtcbiAgLyoqXG4gICAqIEEgRE9NIG5vZGUgYmVmb3JlIHdoaWNoIHRvIHJlbmRlciBjb250ZW50IGluIHRoZSBjb250YWluZXIuXG4gICAqL1xuICByZW5kZXJCZWZvcmU/OiBDaGlsZE5vZGUgfCBudWxsO1xuICAvKipcbiAgICogTm9kZSB1c2VkIGZvciBjbG9uaW5nIHRoZSB0ZW1wbGF0ZSAoYGltcG9ydE5vZGVgIHdpbGwgYmUgY2FsbGVkIG9uIHRoaXNcbiAgICogbm9kZSkuIFRoaXMgY29udHJvbHMgdGhlIGBvd25lckRvY3VtZW50YCBvZiB0aGUgcmVuZGVyZWQgRE9NLCBhbG9uZyB3aXRoXG4gICAqIGFueSBpbmhlcml0ZWQgY29udGV4dC4gRGVmYXVsdHMgdG8gdGhlIGdsb2JhbCBgZG9jdW1lbnRgLlxuICAgKi9cbiAgY3JlYXRpb25TY29wZT86IHtpbXBvcnROb2RlKG5vZGU6IE5vZGUsIGRlZXA/OiBib29sZWFuKTogTm9kZX07XG4gIC8qKlxuICAgKiBUaGUgaW5pdGlhbCBjb25uZWN0ZWQgc3RhdGUgZm9yIHRoZSB0b3AtbGV2ZWwgcGFydCBiZWluZyByZW5kZXJlZC4gSWYgbm9cbiAgICogYGlzQ29ubmVjdGVkYCBvcHRpb24gaXMgc2V0LCBgQXN5bmNEaXJlY3RpdmVgcyB3aWxsIGJlIGNvbm5lY3RlZCBieVxuICAgKiBkZWZhdWx0LiBTZXQgdG8gYGZhbHNlYCBpZiB0aGUgaW5pdGlhbCByZW5kZXIgb2NjdXJzIGluIGEgZGlzY29ubmVjdGVkIHRyZWVcbiAgICogYW5kIGBBc3luY0RpcmVjdGl2ZWBzIHNob3VsZCBzZWUgYGlzQ29ubmVjdGVkID09PSBmYWxzZWAgZm9yIHRoZWlyIGluaXRpYWxcbiAgICogcmVuZGVyLiBUaGUgYHBhcnQuc2V0Q29ubmVjdGVkKClgIG1ldGhvZCBtdXN0IGJlIHVzZWQgc3Vic2VxdWVudCB0byBpbml0aWFsXG4gICAqIHJlbmRlciB0byBjaGFuZ2UgdGhlIGNvbm5lY3RlZCBzdGF0ZSBvZiB0aGUgcGFydC5cbiAgICovXG4gIGlzQ29ubmVjdGVkPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBUaGUgcm9vdCBET00gbm9kZSBmb3IgcmVuZGVyaW5nLlxuICovXG5leHBvcnQgdHlwZSBSZW5kZXJSb290Tm9kZSA9IEhUTUxFbGVtZW50IHwgU1ZHRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnQ7XG5cbmNvbnN0IHdhbGtlciA9IGQuY3JlYXRlVHJlZVdhbGtlcihcbiAgZCxcbiAgMTI5IC8qIE5vZGVGaWx0ZXIuU0hPV197RUxFTUVOVHxDT01NRU5UfSAqL1xuKTtcblxubGV0IHNhbml0aXplckZhY3RvcnlJbnRlcm5hbDogU2FuaXRpemVyRmFjdG9yeSA9IG5vb3BTYW5pdGl6ZXI7XG5cbi8vXG4vLyBDbGFzc2VzIG9ubHkgYmVsb3cgaGVyZSwgY29uc3QgdmFyaWFibGUgZGVjbGFyYXRpb25zIG9ubHkgYWJvdmUgaGVyZS4uLlxuLy9cbi8vIEtlZXBpbmcgdmFyaWFibGUgZGVjbGFyYXRpb25zIGFuZCBjbGFzc2VzIHRvZ2V0aGVyIGltcHJvdmVzIG1pbmlmaWNhdGlvbi5cbi8vIEludGVyZmFjZXMgYW5kIHR5cGUgYWxpYXNlcyBjYW4gYmUgaW50ZXJsZWF2ZWQgZnJlZWx5LlxuLy9cblxuLy8gVHlwZSBmb3IgY2xhc3NlcyB0aGF0IGhhdmUgYSBgX2RpcmVjdGl2ZWAgb3IgYF9kaXJlY3RpdmVzW11gIGZpZWxkLCB1c2VkIGJ5XG4vLyBgcmVzb2x2ZURpcmVjdGl2ZWBcbmV4cG9ydCBpbnRlcmZhY2UgRGlyZWN0aXZlUGFyZW50IHtcbiAgXyRwYXJlbnQ/OiBEaXJlY3RpdmVQYXJlbnQ7XG4gIF8kaXNDb25uZWN0ZWQ6IGJvb2xlYW47XG4gIF9fZGlyZWN0aXZlPzogRGlyZWN0aXZlO1xuICBfX2RpcmVjdGl2ZXM/OiBBcnJheTxEaXJlY3RpdmUgfCB1bmRlZmluZWQ+O1xufVxuXG5mdW5jdGlvbiB0cnVzdEZyb21UZW1wbGF0ZVN0cmluZyhcbiAgdHNhOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgc3RyaW5nRnJvbVRTQTogc3RyaW5nXG4pOiBUcnVzdGVkSFRNTCB7XG4gIC8vIEEgc2VjdXJpdHkgY2hlY2sgdG8gcHJldmVudCBzcG9vZmluZyBvZiBMaXQgdGVtcGxhdGUgcmVzdWx0cy5cbiAgLy8gSW4gdGhlIGZ1dHVyZSwgd2UgbWF5IGJlIGFibGUgdG8gcmVwbGFjZSB0aGlzIHdpdGggQXJyYXkuaXNUZW1wbGF0ZU9iamVjdCxcbiAgLy8gdGhvdWdoIHdlIG1pZ2h0IG5lZWQgdG8gbWFrZSB0aGF0IGNoZWNrIGluc2lkZSBvZiB0aGUgaHRtbCBhbmQgc3ZnXG4gIC8vIGZ1bmN0aW9ucywgYmVjYXVzZSBwcmVjb21waWxlZCB0ZW1wbGF0ZXMgZG9uJ3QgY29tZSBpbiBhc1xuICAvLyBUZW1wbGF0ZVN0cmluZ0FycmF5IG9iamVjdHMuXG4gIGlmICghaXNBcnJheSh0c2EpIHx8ICF0c2EuaGFzT3duUHJvcGVydHkoJ3JhdycpKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSAnaW52YWxpZCB0ZW1wbGF0ZSBzdHJpbmdzIGFycmF5JztcbiAgICBpZiAoREVWX01PREUpIHtcbiAgICAgIG1lc3NhZ2UgPSBgXG4gICAgICAgICAgSW50ZXJuYWwgRXJyb3I6IGV4cGVjdGVkIHRlbXBsYXRlIHN0cmluZ3MgdG8gYmUgYW4gYXJyYXlcbiAgICAgICAgICB3aXRoIGEgJ3JhdycgZmllbGQuIEZha2luZyBhIHRlbXBsYXRlIHN0cmluZ3MgYXJyYXkgYnlcbiAgICAgICAgICBjYWxsaW5nIGh0bWwgb3Igc3ZnIGxpa2UgYW4gb3JkaW5hcnkgZnVuY3Rpb24gaXMgZWZmZWN0aXZlbHlcbiAgICAgICAgICB0aGUgc2FtZSBhcyBjYWxsaW5nIHVuc2FmZUh0bWwgYW5kIGNhbiBsZWFkIHRvIG1ham9yIHNlY3VyaXR5XG4gICAgICAgICAgaXNzdWVzLCBlLmcuIG9wZW5pbmcgeW91ciBjb2RlIHVwIHRvIFhTUyBhdHRhY2tzLlxuICAgICAgICAgIElmIHlvdSdyZSB1c2luZyB0aGUgaHRtbCBvciBzdmcgdGFnZ2VkIHRlbXBsYXRlIGZ1bmN0aW9ucyBub3JtYWxseVxuICAgICAgICAgIGFuZCBzdGlsbCBzZWVpbmcgdGhpcyBlcnJvciwgcGxlYXNlIGZpbGUgYSBidWcgYXRcbiAgICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vbGl0L2xpdC9pc3N1ZXMvbmV3P3RlbXBsYXRlPWJ1Z19yZXBvcnQubWRcbiAgICAgICAgICBhbmQgaW5jbHVkZSBpbmZvcm1hdGlvbiBhYm91dCB5b3VyIGJ1aWxkIHRvb2xpbmcsIGlmIGFueS5cbiAgICAgICAgYFxuICAgICAgICAudHJpbSgpXG4gICAgICAgIC5yZXBsYWNlKC9cXG4gKi9nLCAnXFxuJyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxuICByZXR1cm4gcG9saWN5ICE9PSB1bmRlZmluZWRcbiAgICA/IHBvbGljeS5jcmVhdGVIVE1MKHN0cmluZ0Zyb21UU0EpXG4gICAgOiAoc3RyaW5nRnJvbVRTQSBhcyB1bmtub3duIGFzIFRydXN0ZWRIVE1MKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIEhUTUwgc3RyaW5nIGZvciB0aGUgZ2l2ZW4gVGVtcGxhdGVTdHJpbmdzQXJyYXkgYW5kIHJlc3VsdCB0eXBlXG4gKiAoSFRNTCBvciBTVkcpLCBhbG9uZyB3aXRoIHRoZSBjYXNlLXNlbnNpdGl2ZSBib3VuZCBhdHRyaWJ1dGUgbmFtZXMgaW5cbiAqIHRlbXBsYXRlIG9yZGVyLiBUaGUgSFRNTCBjb250YWlucyBjb21tZW50IG1hcmtlcnMgZGVub3RpbmcgdGhlIGBDaGlsZFBhcnRgc1xuICogYW5kIHN1ZmZpeGVzIG9uIGJvdW5kIGF0dHJpYnV0ZXMgZGVub3RpbmcgdGhlIGBBdHRyaWJ1dGVQYXJ0c2AuXG4gKlxuICogQHBhcmFtIHN0cmluZ3MgdGVtcGxhdGUgc3RyaW5ncyBhcnJheVxuICogQHBhcmFtIHR5cGUgSFRNTCBvciBTVkdcbiAqIEByZXR1cm4gQXJyYXkgY29udGFpbmluZyBgW2h0bWwsIGF0dHJOYW1lc11gIChhcnJheSByZXR1cm5lZCBmb3IgdGVyc2VuZXNzLFxuICogICAgIHRvIGF2b2lkIG9iamVjdCBmaWVsZHMgc2luY2UgdGhpcyBjb2RlIGlzIHNoYXJlZCB3aXRoIG5vbi1taW5pZmllZCBTU1JcbiAqICAgICBjb2RlKVxuICovXG5jb25zdCBnZXRUZW1wbGF0ZUh0bWwgPSAoXG4gIHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LFxuICB0eXBlOiBSZXN1bHRUeXBlXG4pOiBbVHJ1c3RlZEhUTUwsIEFycmF5PHN0cmluZz5dID0+IHtcbiAgLy8gSW5zZXJ0IG1ha2VycyBpbnRvIHRoZSB0ZW1wbGF0ZSBIVE1MIHRvIHJlcHJlc2VudCB0aGUgcG9zaXRpb24gb2ZcbiAgLy8gYmluZGluZ3MuIFRoZSBmb2xsb3dpbmcgY29kZSBzY2FucyB0aGUgdGVtcGxhdGUgc3RyaW5ncyB0byBkZXRlcm1pbmUgdGhlXG4gIC8vIHN5bnRhY3RpYyBwb3NpdGlvbiBvZiB0aGUgYmluZGluZ3MuIFRoZXkgY2FuIGJlIGluIHRleHQgcG9zaXRpb24sIHdoZXJlXG4gIC8vIHdlIGluc2VydCBhbiBIVE1MIGNvbW1lbnQsIGF0dHJpYnV0ZSB2YWx1ZSBwb3NpdGlvbiwgd2hlcmUgd2UgaW5zZXJ0IGFcbiAgLy8gc2VudGluZWwgc3RyaW5nIGFuZCByZS13cml0ZSB0aGUgYXR0cmlidXRlIG5hbWUsIG9yIGluc2lkZSBhIHRhZyB3aGVyZVxuICAvLyB3ZSBpbnNlcnQgdGhlIHNlbnRpbmVsIHN0cmluZy5cbiAgY29uc3QgbCA9IHN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgLy8gU3RvcmVzIHRoZSBjYXNlLXNlbnNpdGl2ZSBib3VuZCBhdHRyaWJ1dGUgbmFtZXMgaW4gdGhlIG9yZGVyIG9mIHRoZWlyXG4gIC8vIHBhcnRzLiBFbGVtZW50UGFydHMgYXJlIGFsc28gcmVmbGVjdGVkIGluIHRoaXMgYXJyYXkgYXMgdW5kZWZpbmVkXG4gIC8vIHJhdGhlciB0aGFuIGEgc3RyaW5nLCB0byBkaXNhbWJpZ3VhdGUgZnJvbSBhdHRyaWJ1dGUgYmluZGluZ3MuXG4gIGNvbnN0IGF0dHJOYW1lczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBsZXQgaHRtbCA9XG4gICAgdHlwZSA9PT0gU1ZHX1JFU1VMVCA/ICc8c3ZnPicgOiB0eXBlID09PSBNQVRITUxfUkVTVUxUID8gJzxtYXRoPicgOiAnJztcblxuICAvLyBXaGVuIHdlJ3JlIGluc2lkZSBhIHJhdyB0ZXh0IHRhZyAobm90IGl0J3MgdGV4dCBjb250ZW50KSwgdGhlIHJlZ2V4XG4gIC8vIHdpbGwgc3RpbGwgYmUgdGFnUmVnZXggc28gd2UgY2FuIGZpbmQgYXR0cmlidXRlcywgYnV0IHdpbGwgc3dpdGNoIHRvXG4gIC8vIHRoaXMgcmVnZXggd2hlbiB0aGUgdGFnIGVuZHMuXG4gIGxldCByYXdUZXh0RW5kUmVnZXg6IFJlZ0V4cCB8IHVuZGVmaW5lZDtcblxuICAvLyBUaGUgY3VycmVudCBwYXJzaW5nIHN0YXRlLCByZXByZXNlbnRlZCBhcyBhIHJlZmVyZW5jZSB0byBvbmUgb2YgdGhlXG4gIC8vIHJlZ2V4ZXNcbiAgbGV0IHJlZ2V4ID0gdGV4dEVuZFJlZ2V4O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgY29uc3QgcyA9IHN0cmluZ3NbaV07XG4gICAgLy8gVGhlIGluZGV4IG9mIHRoZSBlbmQgb2YgdGhlIGxhc3QgYXR0cmlidXRlIG5hbWUuIFdoZW4gdGhpcyBpc1xuICAgIC8vIHBvc2l0aXZlIGF0IGVuZCBvZiBhIHN0cmluZywgaXQgbWVhbnMgd2UncmUgaW4gYW4gYXR0cmlidXRlIHZhbHVlXG4gICAgLy8gcG9zaXRpb24gYW5kIG5lZWQgdG8gcmV3cml0ZSB0aGUgYXR0cmlidXRlIG5hbWUuXG4gICAgLy8gV2UgYWxzbyB1c2UgYSBzcGVjaWFsIHZhbHVlIG9mIC0yIHRvIGluZGljYXRlIHRoYXQgd2UgZW5jb3VudGVyZWRcbiAgICAvLyB0aGUgZW5kIG9mIGEgc3RyaW5nIGluIGF0dHJpYnV0ZSBuYW1lIHBvc2l0aW9uLlxuICAgIGxldCBhdHRyTmFtZUVuZEluZGV4ID0gLTE7XG4gICAgbGV0IGF0dHJOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgbGV0IGxhc3RJbmRleCA9IDA7XG4gICAgbGV0IG1hdGNoITogUmVnRXhwRXhlY0FycmF5IHwgbnVsbDtcblxuICAgIC8vIFRoZSBjb25kaXRpb25zIGluIHRoaXMgbG9vcCBoYW5kbGUgdGhlIGN1cnJlbnQgcGFyc2Ugc3RhdGUsIGFuZCB0aGVcbiAgICAvLyBhc3NpZ25tZW50cyB0byB0aGUgYHJlZ2V4YCB2YXJpYWJsZSBhcmUgdGhlIHN0YXRlIHRyYW5zaXRpb25zLlxuICAgIHdoaWxlIChsYXN0SW5kZXggPCBzLmxlbmd0aCkge1xuICAgICAgLy8gTWFrZSBzdXJlIHdlIHN0YXJ0IHNlYXJjaGluZyBmcm9tIHdoZXJlIHdlIHByZXZpb3VzbHkgbGVmdCBvZmZcbiAgICAgIHJlZ2V4Lmxhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgIG1hdGNoID0gcmVnZXguZXhlYyhzKTtcbiAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RJbmRleCA9IHJlZ2V4Lmxhc3RJbmRleDtcbiAgICAgIGlmIChyZWdleCA9PT0gdGV4dEVuZFJlZ2V4KSB7XG4gICAgICAgIGlmIChtYXRjaFtDT01NRU5UX1NUQVJUXSA9PT0gJyEtLScpIHtcbiAgICAgICAgICByZWdleCA9IGNvbW1lbnRFbmRSZWdleDtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtDT01NRU5UX1NUQVJUXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gV2Ugc3RhcnRlZCBhIHdlaXJkIGNvbW1lbnQsIGxpa2UgPC97XG4gICAgICAgICAgcmVnZXggPSBjb21tZW50MkVuZFJlZ2V4O1xuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1RBR19OQU1FXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHJhd1RleHRFbGVtZW50LnRlc3QobWF0Y2hbVEFHX05BTUVdKSkge1xuICAgICAgICAgICAgLy8gUmVjb3JkIGlmIHdlIGVuY291bnRlciBhIHJhdy10ZXh0IGVsZW1lbnQuIFdlJ2xsIHN3aXRjaCB0b1xuICAgICAgICAgICAgLy8gdGhpcyByZWdleCBhdCB0aGUgZW5kIG9mIHRoZSB0YWcuXG4gICAgICAgICAgICByYXdUZXh0RW5kUmVnZXggPSBuZXcgUmVnRXhwKGA8LyR7bWF0Y2hbVEFHX05BTUVdfWAsICdnJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlZ2V4ID0gdGFnRW5kUmVnZXg7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbRFlOQU1JQ19UQUdfTkFNRV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmIChERVZfTU9ERSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAnQmluZGluZ3MgaW4gdGFnIG5hbWVzIGFyZSBub3Qgc3VwcG9ydGVkLiBQbGVhc2UgdXNlIHN0YXRpYyB0ZW1wbGF0ZXMgaW5zdGVhZC4gJyArXG4gICAgICAgICAgICAgICAgJ1NlZSBodHRwczovL2xpdC5kZXYvZG9jcy90ZW1wbGF0ZXMvZXhwcmVzc2lvbnMvI3N0YXRpYy1leHByZXNzaW9ucydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlZ2V4ID0gdGFnRW5kUmVnZXg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVnZXggPT09IHRhZ0VuZFJlZ2V4KSB7XG4gICAgICAgIGlmIChtYXRjaFtFTlRJUkVfTUFUQ0hdID09PSAnPicpIHtcbiAgICAgICAgICAvLyBFbmQgb2YgYSB0YWcuIElmIHdlIGhhZCBzdGFydGVkIGEgcmF3LXRleHQgZWxlbWVudCwgdXNlIHRoYXRcbiAgICAgICAgICAvLyByZWdleFxuICAgICAgICAgIHJlZ2V4ID0gcmF3VGV4dEVuZFJlZ2V4ID8/IHRleHRFbmRSZWdleDtcbiAgICAgICAgICAvLyBXZSBtYXkgYmUgZW5kaW5nIGFuIHVucXVvdGVkIGF0dHJpYnV0ZSB2YWx1ZSwgc28gbWFrZSBzdXJlIHdlXG4gICAgICAgICAgLy8gY2xlYXIgYW55IHBlbmRpbmcgYXR0ck5hbWVFbmRJbmRleFxuICAgICAgICAgIGF0dHJOYW1lRW5kSW5kZXggPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtBVFRSSUJVVEVfTkFNRV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIEF0dHJpYnV0ZSBuYW1lIHBvc2l0aW9uXG4gICAgICAgICAgYXR0ck5hbWVFbmRJbmRleCA9IC0yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF0dHJOYW1lRW5kSW5kZXggPSByZWdleC5sYXN0SW5kZXggLSBtYXRjaFtTUEFDRVNfQU5EX0VRVUFMU10ubGVuZ3RoO1xuICAgICAgICAgIGF0dHJOYW1lID0gbWF0Y2hbQVRUUklCVVRFX05BTUVdO1xuICAgICAgICAgIHJlZ2V4ID1cbiAgICAgICAgICAgIG1hdGNoW1FVT1RFX0NIQVJdID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyB0YWdFbmRSZWdleFxuICAgICAgICAgICAgICA6IG1hdGNoW1FVT1RFX0NIQVJdID09PSAnXCInXG4gICAgICAgICAgICAgICAgPyBkb3VibGVRdW90ZUF0dHJFbmRSZWdleFxuICAgICAgICAgICAgICAgIDogc2luZ2xlUXVvdGVBdHRyRW5kUmVnZXg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHJlZ2V4ID09PSBkb3VibGVRdW90ZUF0dHJFbmRSZWdleCB8fFxuICAgICAgICByZWdleCA9PT0gc2luZ2xlUXVvdGVBdHRyRW5kUmVnZXhcbiAgICAgICkge1xuICAgICAgICByZWdleCA9IHRhZ0VuZFJlZ2V4O1xuICAgICAgfSBlbHNlIGlmIChyZWdleCA9PT0gY29tbWVudEVuZFJlZ2V4IHx8IHJlZ2V4ID09PSBjb21tZW50MkVuZFJlZ2V4KSB7XG4gICAgICAgIHJlZ2V4ID0gdGV4dEVuZFJlZ2V4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTm90IG9uZSBvZiB0aGUgZml2ZSBzdGF0ZSByZWdleGVzLCBzbyBpdCBtdXN0IGJlIHRoZSBkeW5hbWljYWxseVxuICAgICAgICAvLyBjcmVhdGVkIHJhdyB0ZXh0IHJlZ2V4IGFuZCB3ZSdyZSBhdCB0aGUgY2xvc2Ugb2YgdGhhdCBlbGVtZW50LlxuICAgICAgICByZWdleCA9IHRhZ0VuZFJlZ2V4O1xuICAgICAgICByYXdUZXh0RW5kUmVnZXggPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICAvLyBJZiB3ZSBoYXZlIGEgYXR0ck5hbWVFbmRJbmRleCwgd2hpY2ggaW5kaWNhdGVzIHRoYXQgd2Ugc2hvdWxkXG4gICAgICAvLyByZXdyaXRlIHRoZSBhdHRyaWJ1dGUgbmFtZSwgYXNzZXJ0IHRoYXQgd2UncmUgaW4gYSB2YWxpZCBhdHRyaWJ1dGVcbiAgICAgIC8vIHBvc2l0aW9uIC0gZWl0aGVyIGluIGEgdGFnLCBvciBhIHF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICBjb25zb2xlLmFzc2VydChcbiAgICAgICAgYXR0ck5hbWVFbmRJbmRleCA9PT0gLTEgfHxcbiAgICAgICAgICByZWdleCA9PT0gdGFnRW5kUmVnZXggfHxcbiAgICAgICAgICByZWdleCA9PT0gc2luZ2xlUXVvdGVBdHRyRW5kUmVnZXggfHxcbiAgICAgICAgICByZWdleCA9PT0gZG91YmxlUXVvdGVBdHRyRW5kUmVnZXgsXG4gICAgICAgICd1bmV4cGVjdGVkIHBhcnNlIHN0YXRlIEInXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFdlIGhhdmUgZm91ciBjYXNlczpcbiAgICAvLyAgMS4gV2UncmUgaW4gdGV4dCBwb3NpdGlvbiwgYW5kIG5vdCBpbiBhIHJhdyB0ZXh0IGVsZW1lbnRcbiAgICAvLyAgICAgKHJlZ2V4ID09PSB0ZXh0RW5kUmVnZXgpOiBpbnNlcnQgYSBjb21tZW50IG1hcmtlci5cbiAgICAvLyAgMi4gV2UgaGF2ZSBhIG5vbi1uZWdhdGl2ZSBhdHRyTmFtZUVuZEluZGV4IHdoaWNoIG1lYW5zIHdlIG5lZWQgdG9cbiAgICAvLyAgICAgcmV3cml0ZSB0aGUgYXR0cmlidXRlIG5hbWUgdG8gYWRkIGEgYm91bmQgYXR0cmlidXRlIHN1ZmZpeC5cbiAgICAvLyAgMy4gV2UncmUgYXQgdGhlIG5vbi1maXJzdCBiaW5kaW5nIGluIGEgbXVsdGktYmluZGluZyBhdHRyaWJ1dGUsIHVzZSBhXG4gICAgLy8gICAgIHBsYWluIG1hcmtlci5cbiAgICAvLyAgNC4gV2UncmUgc29tZXdoZXJlIGVsc2UgaW5zaWRlIHRoZSB0YWcuIElmIHdlJ3JlIGluIGF0dHJpYnV0ZSBuYW1lXG4gICAgLy8gICAgIHBvc2l0aW9uIChhdHRyTmFtZUVuZEluZGV4ID09PSAtMiksIGFkZCBhIHNlcXVlbnRpYWwgc3VmZml4IHRvXG4gICAgLy8gICAgIGdlbmVyYXRlIGEgdW5pcXVlIGF0dHJpYnV0ZSBuYW1lLlxuXG4gICAgLy8gRGV0ZWN0IGEgYmluZGluZyBuZXh0IHRvIHNlbGYtY2xvc2luZyB0YWcgZW5kIGFuZCBpbnNlcnQgYSBzcGFjZSB0b1xuICAgIC8vIHNlcGFyYXRlIHRoZSBtYXJrZXIgZnJvbSB0aGUgdGFnIGVuZDpcbiAgICBjb25zdCBlbmQgPVxuICAgICAgcmVnZXggPT09IHRhZ0VuZFJlZ2V4ICYmIHN0cmluZ3NbaSArIDFdLnN0YXJ0c1dpdGgoJy8+JykgPyAnICcgOiAnJztcbiAgICBodG1sICs9XG4gICAgICByZWdleCA9PT0gdGV4dEVuZFJlZ2V4XG4gICAgICAgID8gcyArIG5vZGVNYXJrZXJcbiAgICAgICAgOiBhdHRyTmFtZUVuZEluZGV4ID49IDBcbiAgICAgICAgICA/IChhdHRyTmFtZXMucHVzaChhdHRyTmFtZSEpLFxuICAgICAgICAgICAgcy5zbGljZSgwLCBhdHRyTmFtZUVuZEluZGV4KSArXG4gICAgICAgICAgICAgIGJvdW5kQXR0cmlidXRlU3VmZml4ICtcbiAgICAgICAgICAgICAgcy5zbGljZShhdHRyTmFtZUVuZEluZGV4KSkgK1xuICAgICAgICAgICAgbWFya2VyICtcbiAgICAgICAgICAgIGVuZFxuICAgICAgICAgIDogcyArIG1hcmtlciArIChhdHRyTmFtZUVuZEluZGV4ID09PSAtMiA/IGkgOiBlbmQpO1xuICB9XG5cbiAgY29uc3QgaHRtbFJlc3VsdDogc3RyaW5nIHwgVHJ1c3RlZEhUTUwgPVxuICAgIGh0bWwgK1xuICAgIChzdHJpbmdzW2xdIHx8ICc8Pz4nKSArXG4gICAgKHR5cGUgPT09IFNWR19SRVNVTFQgPyAnPC9zdmc+JyA6IHR5cGUgPT09IE1BVEhNTF9SRVNVTFQgPyAnPC9tYXRoPicgOiAnJyk7XG5cbiAgLy8gUmV0dXJuZWQgYXMgYW4gYXJyYXkgZm9yIHRlcnNlbmVzc1xuICByZXR1cm4gW3RydXN0RnJvbVRlbXBsYXRlU3RyaW5nKHN0cmluZ3MsIGh0bWxSZXN1bHQpLCBhdHRyTmFtZXNdO1xufTtcblxuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IHR5cGUge1RlbXBsYXRlfTtcbmNsYXNzIFRlbXBsYXRlIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBlbCE6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgcGFydHM6IEFycmF5PFRlbXBsYXRlUGFydD4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgIHtzdHJpbmdzLCBbJ18kbGl0VHlwZSQnXTogdHlwZX06IFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdCxcbiAgICBvcHRpb25zPzogUmVuZGVyT3B0aW9uc1xuICApIHtcbiAgICBsZXQgbm9kZTogTm9kZSB8IG51bGw7XG4gICAgbGV0IG5vZGVJbmRleCA9IDA7XG4gICAgbGV0IGF0dHJOYW1lSW5kZXggPSAwO1xuICAgIGNvbnN0IHBhcnRDb3VudCA9IHN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBwYXJ0cyA9IHRoaXMucGFydHM7XG5cbiAgICAvLyBDcmVhdGUgdGVtcGxhdGUgZWxlbWVudFxuICAgIGNvbnN0IFtodG1sLCBhdHRyTmFtZXNdID0gZ2V0VGVtcGxhdGVIdG1sKHN0cmluZ3MsIHR5cGUpO1xuICAgIHRoaXMuZWwgPSBUZW1wbGF0ZS5jcmVhdGVFbGVtZW50KGh0bWwsIG9wdGlvbnMpO1xuICAgIHdhbGtlci5jdXJyZW50Tm9kZSA9IHRoaXMuZWwuY29udGVudDtcblxuICAgIC8vIFJlLXBhcmVudCBTVkcgb3IgTWF0aE1MIG5vZGVzIGludG8gdGVtcGxhdGUgcm9vdFxuICAgIGlmICh0eXBlID09PSBTVkdfUkVTVUxUIHx8IHR5cGUgPT09IE1BVEhNTF9SRVNVTFQpIHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLmVsLmNvbnRlbnQuZmlyc3RDaGlsZCE7XG4gICAgICB3cmFwcGVyLnJlcGxhY2VXaXRoKC4uLndyYXBwZXIuY2hpbGROb2Rlcyk7XG4gICAgfVxuXG4gICAgLy8gV2FsayB0aGUgdGVtcGxhdGUgdG8gZmluZCBiaW5kaW5nIG1hcmtlcnMgYW5kIGNyZWF0ZSBUZW1wbGF0ZVBhcnRzXG4gICAgd2hpbGUgKChub2RlID0gd2Fsa2VyLm5leHROb2RlKCkpICE9PSBudWxsICYmIHBhcnRzLmxlbmd0aCA8IHBhcnRDb3VudCkge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICAgICAgY29uc3QgdGFnID0gKG5vZGUgYXMgRWxlbWVudCkubG9jYWxOYW1lO1xuICAgICAgICAgIC8vIFdhcm4gaWYgYHRleHRhcmVhYCBpbmNsdWRlcyBhbiBleHByZXNzaW9uIGFuZCB0aHJvdyBpZiBgdGVtcGxhdGVgXG4gICAgICAgICAgLy8gZG9lcyBzaW5jZSB0aGVzZSBhcmUgbm90IHN1cHBvcnRlZC4gV2UgZG8gdGhpcyBieSBjaGVja2luZ1xuICAgICAgICAgIC8vIGlubmVySFRNTCBmb3IgYW55dGhpbmcgdGhhdCBsb29rcyBsaWtlIGEgbWFya2VyLiBUaGlzIGNhdGNoZXNcbiAgICAgICAgICAvLyBjYXNlcyBsaWtlIGJpbmRpbmdzIGluIHRleHRhcmVhIHRoZXJlIG1hcmtlcnMgdHVybiBpbnRvIHRleHQgbm9kZXMuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgL14oPzp0ZXh0YXJlYXx0ZW1wbGF0ZSkkL2khLnRlc3QodGFnKSAmJlxuICAgICAgICAgICAgKG5vZGUgYXMgRWxlbWVudCkuaW5uZXJIVE1MLmluY2x1ZGVzKG1hcmtlcilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IG0gPVxuICAgICAgICAgICAgICBgRXhwcmVzc2lvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW5zaWRlIFxcYCR7dGFnfVxcYCBgICtcbiAgICAgICAgICAgICAgYGVsZW1lbnRzLiBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy9leHByZXNzaW9uLWluLSR7dGFnfSBmb3IgbW9yZSBgICtcbiAgICAgICAgICAgICAgYGluZm9ybWF0aW9uLmA7XG4gICAgICAgICAgICBpZiAodGFnID09PSAndGVtcGxhdGUnKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpc3N1ZVdhcm5pbmcoJycsIG0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPIChqdXN0aW5mYWduYW5pKTogZm9yIGF0dGVtcHRlZCBkeW5hbWljIHRhZyBuYW1lcywgd2UgZG9uJ3RcbiAgICAgICAgLy8gaW5jcmVtZW50IHRoZSBiaW5kaW5nSW5kZXgsIGFuZCBpdCdsbCBiZSBvZmYgYnkgMSBpbiB0aGUgZWxlbWVudFxuICAgICAgICAvLyBhbmQgb2ZmIGJ5IHR3byBhZnRlciBpdC5cbiAgICAgICAgaWYgKChub2RlIGFzIEVsZW1lbnQpLmhhc0F0dHJpYnV0ZXMoKSkge1xuICAgICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiAobm9kZSBhcyBFbGVtZW50KS5nZXRBdHRyaWJ1dGVOYW1lcygpKSB7XG4gICAgICAgICAgICBpZiAobmFtZS5lbmRzV2l0aChib3VuZEF0dHJpYnV0ZVN1ZmZpeCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVhbE5hbWUgPSBhdHRyTmFtZXNbYXR0ck5hbWVJbmRleCsrXTtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAobm9kZSBhcyBFbGVtZW50KS5nZXRBdHRyaWJ1dGUobmFtZSkhO1xuICAgICAgICAgICAgICBjb25zdCBzdGF0aWNzID0gdmFsdWUuc3BsaXQobWFya2VyKTtcbiAgICAgICAgICAgICAgY29uc3QgbSA9IC8oWy4/QF0pPyguKikvLmV4ZWMocmVhbE5hbWUpITtcbiAgICAgICAgICAgICAgcGFydHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogQVRUUklCVVRFX1BBUlQsXG4gICAgICAgICAgICAgICAgaW5kZXg6IG5vZGVJbmRleCxcbiAgICAgICAgICAgICAgICBuYW1lOiBtWzJdLFxuICAgICAgICAgICAgICAgIHN0cmluZ3M6IHN0YXRpY3MsXG4gICAgICAgICAgICAgICAgY3RvcjpcbiAgICAgICAgICAgICAgICAgIG1bMV0gPT09ICcuJ1xuICAgICAgICAgICAgICAgICAgICA/IFByb3BlcnR5UGFydFxuICAgICAgICAgICAgICAgICAgICA6IG1bMV0gPT09ICc/J1xuICAgICAgICAgICAgICAgICAgICAgID8gQm9vbGVhbkF0dHJpYnV0ZVBhcnRcbiAgICAgICAgICAgICAgICAgICAgICA6IG1bMV0gPT09ICdAJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBFdmVudFBhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogQXR0cmlidXRlUGFydCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIChub2RlIGFzIEVsZW1lbnQpLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKG1hcmtlcikpIHtcbiAgICAgICAgICAgICAgcGFydHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogRUxFTUVOVF9QQVJULFxuICAgICAgICAgICAgICAgIGluZGV4OiBub2RlSW5kZXgsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAobm9kZSBhcyBFbGVtZW50KS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE8gKGp1c3RpbmZhZ25hbmkpOiBiZW5jaG1hcmsgdGhlIHJlZ2V4IGFnYWluc3QgdGVzdGluZyBmb3IgZWFjaFxuICAgICAgICAvLyBvZiB0aGUgMyByYXcgdGV4dCBlbGVtZW50IG5hbWVzLlxuICAgICAgICBpZiAocmF3VGV4dEVsZW1lbnQudGVzdCgobm9kZSBhcyBFbGVtZW50KS50YWdOYW1lKSkge1xuICAgICAgICAgIC8vIEZvciByYXcgdGV4dCBlbGVtZW50cyB3ZSBuZWVkIHRvIHNwbGl0IHRoZSB0ZXh0IGNvbnRlbnQgb25cbiAgICAgICAgICAvLyBtYXJrZXJzLCBjcmVhdGUgYSBUZXh0IG5vZGUgZm9yIGVhY2ggc2VnbWVudCwgYW5kIGNyZWF0ZVxuICAgICAgICAgIC8vIGEgVGVtcGxhdGVQYXJ0IGZvciBlYWNoIG1hcmtlci5cbiAgICAgICAgICBjb25zdCBzdHJpbmdzID0gKG5vZGUgYXMgRWxlbWVudCkudGV4dENvbnRlbnQhLnNwbGl0KG1hcmtlcik7XG4gICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gc3RyaW5ncy5sZW5ndGggLSAxO1xuICAgICAgICAgIGlmIChsYXN0SW5kZXggPiAwKSB7XG4gICAgICAgICAgICAobm9kZSBhcyBFbGVtZW50KS50ZXh0Q29udGVudCA9IHRydXN0ZWRUeXBlc1xuICAgICAgICAgICAgICA/ICh0cnVzdGVkVHlwZXMuZW1wdHlTY3JpcHQgYXMgdW5rbm93biBhcyAnJylcbiAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgIC8vIEdlbmVyYXRlIGEgbmV3IHRleHQgbm9kZSBmb3IgZWFjaCBsaXRlcmFsIHNlY3Rpb25cbiAgICAgICAgICAgIC8vIFRoZXNlIG5vZGVzIGFyZSBhbHNvIHVzZWQgYXMgdGhlIG1hcmtlcnMgZm9yIGNoaWxkIHBhcnRzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhc3RJbmRleDsgaSsrKSB7XG4gICAgICAgICAgICAgIChub2RlIGFzIEVsZW1lbnQpLmFwcGVuZChzdHJpbmdzW2ldLCBjcmVhdGVNYXJrZXIoKSk7XG4gICAgICAgICAgICAgIC8vIFdhbGsgcGFzdCB0aGUgbWFya2VyIG5vZGUgd2UganVzdCBhZGRlZFxuICAgICAgICAgICAgICB3YWxrZXIubmV4dE5vZGUoKTtcbiAgICAgICAgICAgICAgcGFydHMucHVzaCh7dHlwZTogQ0hJTERfUEFSVCwgaW5kZXg6ICsrbm9kZUluZGV4fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb3RlIGJlY2F1c2UgdGhpcyBtYXJrZXIgaXMgYWRkZWQgYWZ0ZXIgdGhlIHdhbGtlcidzIGN1cnJlbnRcbiAgICAgICAgICAgIC8vIG5vZGUsIGl0IHdpbGwgYmUgd2Fsa2VkIHRvIGluIHRoZSBvdXRlciBsb29wIChhbmQgaWdub3JlZCksIHNvXG4gICAgICAgICAgICAvLyB3ZSBkb24ndCBuZWVkIHRvIGFkanVzdCBub2RlSW5kZXggaGVyZVxuICAgICAgICAgICAgKG5vZGUgYXMgRWxlbWVudCkuYXBwZW5kKHN0cmluZ3NbbGFzdEluZGV4XSwgY3JlYXRlTWFya2VyKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSA4KSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSAobm9kZSBhcyBDb21tZW50KS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSA9PT0gbWFya2VyTWF0Y2gpIHtcbiAgICAgICAgICBwYXJ0cy5wdXNoKHt0eXBlOiBDSElMRF9QQVJULCBpbmRleDogbm9kZUluZGV4fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGkgPSAtMTtcbiAgICAgICAgICB3aGlsZSAoKGkgPSAobm9kZSBhcyBDb21tZW50KS5kYXRhLmluZGV4T2YobWFya2VyLCBpICsgMSkpICE9PSAtMSkge1xuICAgICAgICAgICAgLy8gQ29tbWVudCBub2RlIGhhcyBhIGJpbmRpbmcgbWFya2VyIGluc2lkZSwgbWFrZSBhbiBpbmFjdGl2ZSBwYXJ0XG4gICAgICAgICAgICAvLyBUaGUgYmluZGluZyB3b24ndCB3b3JrLCBidXQgc3Vic2VxdWVudCBiaW5kaW5ncyB3aWxsXG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHt0eXBlOiBDT01NRU5UX1BBUlQsIGluZGV4OiBub2RlSW5kZXh9KTtcbiAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIGVuZCBvZiB0aGUgbWF0Y2hcbiAgICAgICAgICAgIGkgKz0gbWFya2VyLmxlbmd0aCAtIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBub2RlSW5kZXgrKztcbiAgICB9XG5cbiAgICBpZiAoREVWX01PREUpIHtcbiAgICAgIC8vIElmIHRoZXJlIHdhcyBhIGR1cGxpY2F0ZSBhdHRyaWJ1dGUgb24gYSB0YWcsIHRoZW4gd2hlbiB0aGUgdGFnIGlzXG4gICAgICAvLyBwYXJzZWQgaW50byBhbiBlbGVtZW50IHRoZSBhdHRyaWJ1dGUgZ2V0cyBkZS1kdXBsaWNhdGVkLiBXZSBjYW4gZGV0ZWN0XG4gICAgICAvLyB0aGlzIG1pc21hdGNoIGlmIHdlIGhhdmVuJ3QgcHJlY2lzZWx5IGNvbnN1bWVkIGV2ZXJ5IGF0dHJpYnV0ZSBuYW1lXG4gICAgICAvLyB3aGVuIHByZXBhcmluZyB0aGUgdGVtcGxhdGUuIFRoaXMgd29ya3MgYmVjYXVzZSBgYXR0ck5hbWVzYCBpcyBidWlsdFxuICAgICAgLy8gZnJvbSB0aGUgdGVtcGxhdGUgc3RyaW5nIGFuZCBgYXR0ck5hbWVJbmRleGAgY29tZXMgZnJvbSBwcm9jZXNzaW5nIHRoZVxuICAgICAgLy8gcmVzdWx0aW5nIERPTS5cbiAgICAgIGlmIChhdHRyTmFtZXMubGVuZ3RoICE9PSBhdHRyTmFtZUluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgRGV0ZWN0ZWQgZHVwbGljYXRlIGF0dHJpYnV0ZSBiaW5kaW5ncy4gVGhpcyBvY2N1cnMgaWYgeW91ciB0ZW1wbGF0ZSBgICtcbiAgICAgICAgICAgIGBoYXMgZHVwbGljYXRlIGF0dHJpYnV0ZXMgb24gYW4gZWxlbWVudCB0YWcuIEZvciBleGFtcGxlIGAgK1xuICAgICAgICAgICAgYFwiPGlucHV0ID9kaXNhYmxlZD1cXCR7dHJ1ZX0gP2Rpc2FibGVkPVxcJHtmYWxzZX0+XCIgY29udGFpbnMgYSBgICtcbiAgICAgICAgICAgIGBkdXBsaWNhdGUgXCJkaXNhYmxlZFwiIGF0dHJpYnV0ZS4gVGhlIGVycm9yIHdhcyBkZXRlY3RlZCBpbiBgICtcbiAgICAgICAgICAgIGB0aGUgZm9sbG93aW5nIHRlbXBsYXRlOiBcXG5gICtcbiAgICAgICAgICAgICdgJyArXG4gICAgICAgICAgICBzdHJpbmdzLmpvaW4oJyR7Li4ufScpICtcbiAgICAgICAgICAgICdgJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdlIGNvdWxkIHNldCB3YWxrZXIuY3VycmVudE5vZGUgdG8gYW5vdGhlciBub2RlIGhlcmUgdG8gcHJldmVudCBhIG1lbW9yeVxuICAgIC8vIGxlYWssIGJ1dCBldmVyeSB0aW1lIHdlIHByZXBhcmUgYSB0ZW1wbGF0ZSwgd2UgaW1tZWRpYXRlbHkgcmVuZGVyIGl0XG4gICAgLy8gYW5kIHJlLXVzZSB0aGUgd2Fsa2VyIGluIG5ldyBUZW1wbGF0ZUluc3RhbmNlLl9jbG9uZSgpLlxuICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICBraW5kOiAndGVtcGxhdGUgcHJlcCcsXG4gICAgICAgIHRlbXBsYXRlOiB0aGlzLFxuICAgICAgICBjbG9uYWJsZVRlbXBsYXRlOiB0aGlzLmVsLFxuICAgICAgICBwYXJ0czogdGhpcy5wYXJ0cyxcbiAgICAgICAgc3RyaW5ncyxcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gT3ZlcnJpZGRlbiB2aWEgYGxpdEh0bWxQb2x5ZmlsbFN1cHBvcnRgIHRvIHByb3ZpZGUgcGxhdGZvcm0gc3VwcG9ydC5cbiAgLyoqIEBub2NvbGxhcHNlICovXG4gIHN0YXRpYyBjcmVhdGVFbGVtZW50KGh0bWw6IFRydXN0ZWRIVE1MLCBfb3B0aW9ucz86IFJlbmRlck9wdGlvbnMpIHtcbiAgICBjb25zdCBlbCA9IGQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICBlbC5pbm5lckhUTUwgPSBodG1sIGFzIHVua25vd24gYXMgc3RyaW5nO1xuICAgIHJldHVybiBlbDtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERpc2Nvbm5lY3RhYmxlIHtcbiAgXyRwYXJlbnQ/OiBEaXNjb25uZWN0YWJsZTtcbiAgXyRkaXNjb25uZWN0YWJsZUNoaWxkcmVuPzogU2V0PERpc2Nvbm5lY3RhYmxlPjtcbiAgLy8gUmF0aGVyIHRoYW4gaG9sZCBjb25uZWN0aW9uIHN0YXRlIG9uIGluc3RhbmNlcywgRGlzY29ubmVjdGFibGVzIHJlY3Vyc2l2ZWx5XG4gIC8vIGZldGNoIHRoZSBjb25uZWN0aW9uIHN0YXRlIGZyb20gdGhlIFJvb3RQYXJ0IHRoZXkgYXJlIGNvbm5lY3RlZCBpbiB2aWFcbiAgLy8gZ2V0dGVycyB1cCB0aGUgRGlzY29ubmVjdGFibGUgdHJlZSB2aWEgXyRwYXJlbnQgcmVmZXJlbmNlcy4gVGhpcyBwdXNoZXMgdGhlXG4gIC8vIGNvc3Qgb2YgdHJhY2tpbmcgdGhlIGlzQ29ubmVjdGVkIHN0YXRlIHRvIGBBc3luY0RpcmVjdGl2ZXNgLCBhbmQgYXZvaWRzXG4gIC8vIG5lZWRpbmcgdG8gcGFzcyBhbGwgRGlzY29ubmVjdGFibGVzIChwYXJ0cywgdGVtcGxhdGUgaW5zdGFuY2VzLCBhbmRcbiAgLy8gZGlyZWN0aXZlcykgdGhlaXIgY29ubmVjdGlvbiBzdGF0ZSBlYWNoIHRpbWUgaXQgY2hhbmdlcywgd2hpY2ggd291bGQgYmVcbiAgLy8gY29zdGx5IGZvciB0cmVlcyB0aGF0IGhhdmUgbm8gQXN5bmNEaXJlY3RpdmVzLlxuICBfJGlzQ29ubmVjdGVkOiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRGlyZWN0aXZlKFxuICBwYXJ0OiBDaGlsZFBhcnQgfCBBdHRyaWJ1dGVQYXJ0IHwgRWxlbWVudFBhcnQsXG4gIHZhbHVlOiB1bmtub3duLFxuICBwYXJlbnQ6IERpcmVjdGl2ZVBhcmVudCA9IHBhcnQsXG4gIGF0dHJpYnV0ZUluZGV4PzogbnVtYmVyXG4pOiB1bmtub3duIHtcbiAgLy8gQmFpbCBlYXJseSBpZiB0aGUgdmFsdWUgaXMgZXhwbGljaXRseSBub0NoYW5nZS4gTm90ZSwgdGhpcyBtZWFucyBhbnlcbiAgLy8gbmVzdGVkIGRpcmVjdGl2ZSBpcyBzdGlsbCBhdHRhY2hlZCBhbmQgaXMgbm90IHJ1bi5cbiAgaWYgKHZhbHVlID09PSBub0NoYW5nZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBsZXQgY3VycmVudERpcmVjdGl2ZSA9XG4gICAgYXR0cmlidXRlSW5kZXggIT09IHVuZGVmaW5lZFxuICAgICAgPyAocGFyZW50IGFzIEF0dHJpYnV0ZVBhcnQpLl9fZGlyZWN0aXZlcz8uW2F0dHJpYnV0ZUluZGV4XVxuICAgICAgOiAocGFyZW50IGFzIENoaWxkUGFydCB8IEVsZW1lbnRQYXJ0IHwgRGlyZWN0aXZlKS5fX2RpcmVjdGl2ZTtcbiAgY29uc3QgbmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yID0gaXNQcmltaXRpdmUodmFsdWUpXG4gICAgPyB1bmRlZmluZWRcbiAgICA6IC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gICAgICAodmFsdWUgYXMgRGlyZWN0aXZlUmVzdWx0KVsnXyRsaXREaXJlY3RpdmUkJ107XG4gIGlmIChjdXJyZW50RGlyZWN0aXZlPy5jb25zdHJ1Y3RvciAhPT0gbmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yKSB7XG4gICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICBjdXJyZW50RGlyZWN0aXZlPy5bJ18kbm90aWZ5RGlyZWN0aXZlQ29ubmVjdGlvbkNoYW5nZWQnXT8uKGZhbHNlKTtcbiAgICBpZiAobmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnREaXJlY3RpdmUgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnREaXJlY3RpdmUgPSBuZXcgbmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yKHBhcnQgYXMgUGFydEluZm8pO1xuICAgICAgY3VycmVudERpcmVjdGl2ZS5fJGluaXRpYWxpemUocGFydCwgcGFyZW50LCBhdHRyaWJ1dGVJbmRleCk7XG4gICAgfVxuICAgIGlmIChhdHRyaWJ1dGVJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAoKHBhcmVudCBhcyBBdHRyaWJ1dGVQYXJ0KS5fX2RpcmVjdGl2ZXMgPz89IFtdKVthdHRyaWJ1dGVJbmRleF0gPVxuICAgICAgICBjdXJyZW50RGlyZWN0aXZlO1xuICAgIH0gZWxzZSB7XG4gICAgICAocGFyZW50IGFzIENoaWxkUGFydCB8IERpcmVjdGl2ZSkuX19kaXJlY3RpdmUgPSBjdXJyZW50RGlyZWN0aXZlO1xuICAgIH1cbiAgfVxuICBpZiAoY3VycmVudERpcmVjdGl2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFsdWUgPSByZXNvbHZlRGlyZWN0aXZlKFxuICAgICAgcGFydCxcbiAgICAgIGN1cnJlbnREaXJlY3RpdmUuXyRyZXNvbHZlKHBhcnQsICh2YWx1ZSBhcyBEaXJlY3RpdmVSZXN1bHQpLnZhbHVlcyksXG4gICAgICBjdXJyZW50RGlyZWN0aXZlLFxuICAgICAgYXR0cmlidXRlSW5kZXhcbiAgICApO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IHR5cGUge1RlbXBsYXRlSW5zdGFuY2V9O1xuLyoqXG4gKiBBbiB1cGRhdGVhYmxlIGluc3RhbmNlIG9mIGEgVGVtcGxhdGUuIEhvbGRzIHJlZmVyZW5jZXMgdG8gdGhlIFBhcnRzIHVzZWQgdG9cbiAqIHVwZGF0ZSB0aGUgdGVtcGxhdGUgaW5zdGFuY2UuXG4gKi9cbmNsYXNzIFRlbXBsYXRlSW5zdGFuY2UgaW1wbGVtZW50cyBEaXNjb25uZWN0YWJsZSB7XG4gIF8kdGVtcGxhdGU6IFRlbXBsYXRlO1xuICBfJHBhcnRzOiBBcnJheTxQYXJ0IHwgdW5kZWZpbmVkPiA9IFtdO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRwYXJlbnQ6IENoaWxkUGFydDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJGRpc2Nvbm5lY3RhYmxlQ2hpbGRyZW4/OiBTZXQ8RGlzY29ubmVjdGFibGU+ID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHRlbXBsYXRlOiBUZW1wbGF0ZSwgcGFyZW50OiBDaGlsZFBhcnQpIHtcbiAgICB0aGlzLl8kdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICB0aGlzLl8kcGFyZW50ID0gcGFyZW50O1xuICB9XG5cbiAgLy8gQ2FsbGVkIGJ5IENoaWxkUGFydCBwYXJlbnROb2RlIGdldHRlclxuICBnZXQgcGFyZW50Tm9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fJHBhcmVudC5wYXJlbnROb2RlO1xuICB9XG5cbiAgLy8gU2VlIGNvbW1lbnQgaW4gRGlzY29ubmVjdGFibGUgaW50ZXJmYWNlIGZvciB3aHkgdGhpcyBpcyBhIGdldHRlclxuICBnZXQgXyRpc0Nvbm5lY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fJHBhcmVudC5fJGlzQ29ubmVjdGVkO1xuICB9XG5cbiAgLy8gVGhpcyBtZXRob2QgaXMgc2VwYXJhdGUgZnJvbSB0aGUgY29uc3RydWN0b3IgYmVjYXVzZSB3ZSBuZWVkIHRvIHJldHVybiBhXG4gIC8vIERvY3VtZW50RnJhZ21lbnQgYW5kIHdlIGRvbid0IHdhbnQgdG8gaG9sZCBvbnRvIGl0IHdpdGggYW4gaW5zdGFuY2UgZmllbGQuXG4gIF9jbG9uZShvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkKSB7XG4gICAgY29uc3Qge1xuICAgICAgZWw6IHtjb250ZW50fSxcbiAgICAgIHBhcnRzOiBwYXJ0cyxcbiAgICB9ID0gdGhpcy5fJHRlbXBsYXRlO1xuICAgIGNvbnN0IGZyYWdtZW50ID0gKG9wdGlvbnM/LmNyZWF0aW9uU2NvcGUgPz8gZCkuaW1wb3J0Tm9kZShjb250ZW50LCB0cnVlKTtcbiAgICB3YWxrZXIuY3VycmVudE5vZGUgPSBmcmFnbWVudDtcblxuICAgIGxldCBub2RlID0gd2Fsa2VyLm5leHROb2RlKCkhO1xuICAgIGxldCBub2RlSW5kZXggPSAwO1xuICAgIGxldCBwYXJ0SW5kZXggPSAwO1xuICAgIGxldCB0ZW1wbGF0ZVBhcnQgPSBwYXJ0c1swXTtcblxuICAgIHdoaWxlICh0ZW1wbGF0ZVBhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG5vZGVJbmRleCA9PT0gdGVtcGxhdGVQYXJ0LmluZGV4KSB7XG4gICAgICAgIGxldCBwYXJ0OiBQYXJ0IHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGVtcGxhdGVQYXJ0LnR5cGUgPT09IENISUxEX1BBUlQpIHtcbiAgICAgICAgICBwYXJ0ID0gbmV3IENoaWxkUGFydChcbiAgICAgICAgICAgIG5vZGUgYXMgSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICBub2RlLm5leHRTaWJsaW5nLFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHRlbXBsYXRlUGFydC50eXBlID09PSBBVFRSSUJVVEVfUEFSVCkge1xuICAgICAgICAgIHBhcnQgPSBuZXcgdGVtcGxhdGVQYXJ0LmN0b3IoXG4gICAgICAgICAgICBub2RlIGFzIEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgdGVtcGxhdGVQYXJ0Lm5hbWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVBhcnQuc3RyaW5ncyxcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICh0ZW1wbGF0ZVBhcnQudHlwZSA9PT0gRUxFTUVOVF9QQVJUKSB7XG4gICAgICAgICAgcGFydCA9IG5ldyBFbGVtZW50UGFydChub2RlIGFzIEhUTUxFbGVtZW50LCB0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl8kcGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgdGVtcGxhdGVQYXJ0ID0gcGFydHNbKytwYXJ0SW5kZXhdO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVJbmRleCAhPT0gdGVtcGxhdGVQYXJ0Py5pbmRleCkge1xuICAgICAgICBub2RlID0gd2Fsa2VyLm5leHROb2RlKCkhO1xuICAgICAgICBub2RlSW5kZXgrKztcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gV2UgbmVlZCB0byBzZXQgdGhlIGN1cnJlbnROb2RlIGF3YXkgZnJvbSB0aGUgY2xvbmVkIHRyZWUgc28gdGhhdCB3ZVxuICAgIC8vIGRvbid0IGhvbGQgb250byB0aGUgdHJlZSBldmVuIGlmIHRoZSB0cmVlIGlzIGRldGFjaGVkIGFuZCBzaG91bGQgYmVcbiAgICAvLyBmcmVlZC5cbiAgICB3YWxrZXIuY3VycmVudE5vZGUgPSBkO1xuICAgIHJldHVybiBmcmFnbWVudDtcbiAgfVxuXG4gIF91cGRhdGUodmFsdWVzOiBBcnJheTx1bmtub3duPikge1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgdGhpcy5fJHBhcnRzKSB7XG4gICAgICBpZiAocGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICAgIGtpbmQ6ICdzZXQgcGFydCcsXG4gICAgICAgICAgICBwYXJ0LFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHZhbHVlSW5kZXg6IGksXG4gICAgICAgICAgICB2YWx1ZXMsXG4gICAgICAgICAgICB0ZW1wbGF0ZUluc3RhbmNlOiB0aGlzLFxuICAgICAgICAgIH0pO1xuICAgICAgICBpZiAoKHBhcnQgYXMgQXR0cmlidXRlUGFydCkuc3RyaW5ncyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgKHBhcnQgYXMgQXR0cmlidXRlUGFydCkuXyRzZXRWYWx1ZSh2YWx1ZXMsIHBhcnQgYXMgQXR0cmlidXRlUGFydCwgaSk7XG4gICAgICAgICAgLy8gVGhlIG51bWJlciBvZiB2YWx1ZXMgdGhlIHBhcnQgY29uc3VtZXMgaXMgcGFydC5zdHJpbmdzLmxlbmd0aCAtIDFcbiAgICAgICAgICAvLyBzaW5jZSB2YWx1ZXMgYXJlIGluIGJldHdlZW4gdGVtcGxhdGUgc3BhbnMuIFdlIGluY3JlbWVudCBpIGJ5IDFcbiAgICAgICAgICAvLyBsYXRlciBpbiB0aGUgbG9vcCwgc28gaW5jcmVtZW50IGl0IGJ5IHBhcnQuc3RyaW5ncy5sZW5ndGggLSAyIGhlcmVcbiAgICAgICAgICBpICs9IChwYXJ0IGFzIEF0dHJpYnV0ZVBhcnQpLnN0cmluZ3MhLmxlbmd0aCAtIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFydC5fJHNldFZhbHVlKHZhbHVlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9XG4gIH1cbn1cblxuLypcbiAqIFBhcnRzXG4gKi9cbnR5cGUgQXR0cmlidXRlVGVtcGxhdGVQYXJ0ID0ge1xuICByZWFkb25seSB0eXBlOiB0eXBlb2YgQVRUUklCVVRFX1BBUlQ7XG4gIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgY3RvcjogdHlwZW9mIEF0dHJpYnV0ZVBhcnQ7XG4gIHJlYWRvbmx5IHN0cmluZ3M6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbn07XG50eXBlIENoaWxkVGVtcGxhdGVQYXJ0ID0ge1xuICByZWFkb25seSB0eXBlOiB0eXBlb2YgQ0hJTERfUEFSVDtcbiAgcmVhZG9ubHkgaW5kZXg6IG51bWJlcjtcbn07XG50eXBlIEVsZW1lbnRUZW1wbGF0ZVBhcnQgPSB7XG4gIHJlYWRvbmx5IHR5cGU6IHR5cGVvZiBFTEVNRU5UX1BBUlQ7XG4gIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG59O1xudHlwZSBDb21tZW50VGVtcGxhdGVQYXJ0ID0ge1xuICByZWFkb25seSB0eXBlOiB0eXBlb2YgQ09NTUVOVF9QQVJUO1xuICByZWFkb25seSBpbmRleDogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBBIFRlbXBsYXRlUGFydCByZXByZXNlbnRzIGEgZHluYW1pYyBwYXJ0IGluIGEgdGVtcGxhdGUsIGJlZm9yZSB0aGUgdGVtcGxhdGVcbiAqIGlzIGluc3RhbnRpYXRlZC4gV2hlbiBhIHRlbXBsYXRlIGlzIGluc3RhbnRpYXRlZCBQYXJ0cyBhcmUgY3JlYXRlZCBmcm9tXG4gKiBUZW1wbGF0ZVBhcnRzLlxuICovXG50eXBlIFRlbXBsYXRlUGFydCA9XG4gIHwgQ2hpbGRUZW1wbGF0ZVBhcnRcbiAgfCBBdHRyaWJ1dGVUZW1wbGF0ZVBhcnRcbiAgfCBFbGVtZW50VGVtcGxhdGVQYXJ0XG4gIHwgQ29tbWVudFRlbXBsYXRlUGFydDtcblxuZXhwb3J0IHR5cGUgUGFydCA9XG4gIHwgQ2hpbGRQYXJ0XG4gIHwgQXR0cmlidXRlUGFydFxuICB8IFByb3BlcnR5UGFydFxuICB8IEJvb2xlYW5BdHRyaWJ1dGVQYXJ0XG4gIHwgRWxlbWVudFBhcnRcbiAgfCBFdmVudFBhcnQ7XG5cbmV4cG9ydCB0eXBlIHtDaGlsZFBhcnR9O1xuY2xhc3MgQ2hpbGRQYXJ0IGltcGxlbWVudHMgRGlzY29ubmVjdGFibGUge1xuICByZWFkb25seSB0eXBlID0gQ0hJTERfUEFSVDtcbiAgcmVhZG9ubHkgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgXyRjb21taXR0ZWRWYWx1ZTogdW5rbm93biA9IG5vdGhpbmc7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX19kaXJlY3RpdmU/OiBEaXJlY3RpdmU7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRzdGFydE5vZGU6IENoaWxkTm9kZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJGVuZE5vZGU6IENoaWxkTm9kZSB8IG51bGw7XG4gIHByaXZhdGUgX3RleHRTYW5pdGl6ZXI6IFZhbHVlU2FuaXRpemVyIHwgdW5kZWZpbmVkO1xuICAvKiogQGludGVybmFsICovXG4gIF8kcGFyZW50OiBEaXNjb25uZWN0YWJsZSB8IHVuZGVmaW5lZDtcbiAgLyoqXG4gICAqIENvbm5lY3Rpb24gc3RhdGUgZm9yIFJvb3RQYXJ0cyBvbmx5IChpLmUuIENoaWxkUGFydCB3aXRob3V0IF8kcGFyZW50XG4gICAqIHJldHVybmVkIGZyb20gdG9wLWxldmVsIGByZW5kZXJgKS4gVGhpcyBmaWVsZCBpcyB1bnVzZWQgb3RoZXJ3aXNlLiBUaGVcbiAgICogaW50ZW50aW9uIHdvdWxkIGJlIGNsZWFyZXIgaWYgd2UgbWFkZSBgUm9vdFBhcnRgIGEgc3ViY2xhc3Mgb2YgYENoaWxkUGFydGBcbiAgICogd2l0aCB0aGlzIGZpZWxkIChhbmQgYSBkaWZmZXJlbnQgXyRpc0Nvbm5lY3RlZCBnZXR0ZXIpLCBidXQgdGhlIHN1YmNsYXNzXG4gICAqIGNhdXNlZCBhIHBlcmYgcmVncmVzc2lvbiwgcG9zc2libHkgZHVlIHRvIG1ha2luZyBjYWxsIHNpdGVzIHBvbHltb3JwaGljLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9faXNDb25uZWN0ZWQ6IGJvb2xlYW47XG5cbiAgLy8gU2VlIGNvbW1lbnQgaW4gRGlzY29ubmVjdGFibGUgaW50ZXJmYWNlIGZvciB3aHkgdGhpcyBpcyBhIGdldHRlclxuICBnZXQgXyRpc0Nvbm5lY3RlZCgpIHtcbiAgICAvLyBDaGlsZFBhcnRzIHRoYXQgYXJlIG5vdCBhdCB0aGUgcm9vdCBzaG91bGQgYWx3YXlzIGJlIGNyZWF0ZWQgd2l0aCBhXG4gICAgLy8gcGFyZW50OyBvbmx5IFJvb3RDaGlsZE5vZGUncyB3b24ndCwgc28gdGhleSByZXR1cm4gdGhlIGxvY2FsIGlzQ29ubmVjdGVkXG4gICAgLy8gc3RhdGVcbiAgICByZXR1cm4gdGhpcy5fJHBhcmVudD8uXyRpc0Nvbm5lY3RlZCA/PyB0aGlzLl9faXNDb25uZWN0ZWQ7XG4gIH1cblxuICAvLyBUaGUgZm9sbG93aW5nIGZpZWxkcyB3aWxsIGJlIHBhdGNoZWQgb250byBDaGlsZFBhcnRzIHdoZW4gcmVxdWlyZWQgYnlcbiAgLy8gQXN5bmNEaXJlY3RpdmVcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJGRpc2Nvbm5lY3RhYmxlQ2hpbGRyZW4/OiBTZXQ8RGlzY29ubmVjdGFibGU+ID0gdW5kZWZpbmVkO1xuICAvKiogQGludGVybmFsICovXG4gIF8kbm90aWZ5Q29ubmVjdGlvbkNoYW5nZWQ/KFxuICAgIGlzQ29ubmVjdGVkOiBib29sZWFuLFxuICAgIHJlbW92ZUZyb21QYXJlbnQ/OiBib29sZWFuLFxuICAgIGZyb20/OiBudW1iZXJcbiAgKTogdm9pZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJHJlcGFyZW50RGlzY29ubmVjdGFibGVzPyhwYXJlbnQ6IERpc2Nvbm5lY3RhYmxlKTogdm9pZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzdGFydE5vZGU6IENoaWxkTm9kZSxcbiAgICBlbmROb2RlOiBDaGlsZE5vZGUgfCBudWxsLFxuICAgIHBhcmVudDogVGVtcGxhdGVJbnN0YW5jZSB8IENoaWxkUGFydCB8IHVuZGVmaW5lZCxcbiAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHRoaXMuXyRzdGFydE5vZGUgPSBzdGFydE5vZGU7XG4gICAgdGhpcy5fJGVuZE5vZGUgPSBlbmROb2RlO1xuICAgIHRoaXMuXyRwYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAvLyBOb3RlIF9faXNDb25uZWN0ZWQgaXMgb25seSBldmVyIGFjY2Vzc2VkIG9uIFJvb3RQYXJ0cyAoaS5lLiB3aGVuIHRoZXJlIGlzXG4gICAgLy8gbm8gXyRwYXJlbnQpOyB0aGUgdmFsdWUgb24gYSBub24tcm9vdC1wYXJ0IGlzIFwiZG9uJ3QgY2FyZVwiLCBidXQgY2hlY2tpbmdcbiAgICAvLyBmb3IgcGFyZW50IHdvdWxkIGJlIG1vcmUgY29kZVxuICAgIHRoaXMuX19pc0Nvbm5lY3RlZCA9IG9wdGlvbnM/LmlzQ29ubmVjdGVkID8/IHRydWU7XG4gICAgaWYgKEVOQUJMRV9FWFRSQV9TRUNVUklUWV9IT09LUykge1xuICAgICAgLy8gRXhwbGljaXRseSBpbml0aWFsaXplIGZvciBjb25zaXN0ZW50IGNsYXNzIHNoYXBlLlxuICAgICAgdGhpcy5fdGV4dFNhbml0aXplciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIHBhcmVudCBub2RlIGludG8gd2hpY2ggdGhlIHBhcnQgcmVuZGVycyBpdHMgY29udGVudC5cbiAgICpcbiAgICogQSBDaGlsZFBhcnQncyBjb250ZW50IGNvbnNpc3RzIG9mIGEgcmFuZ2Ugb2YgYWRqYWNlbnQgY2hpbGQgbm9kZXMgb2ZcbiAgICogYC5wYXJlbnROb2RlYCwgcG9zc2libHkgYm9yZGVyZWQgYnkgJ21hcmtlciBub2RlcycgKGAuc3RhcnROb2RlYCBhbmRcbiAgICogYC5lbmROb2RlYCkuXG4gICAqXG4gICAqIC0gSWYgYm90aCBgLnN0YXJ0Tm9kZWAgYW5kIGAuZW5kTm9kZWAgYXJlIG5vbi1udWxsLCB0aGVuIHRoZSBwYXJ0J3MgY29udGVudFxuICAgKiBjb25zaXN0cyBvZiBhbGwgc2libGluZ3MgYmV0d2VlbiBgLnN0YXJ0Tm9kZWAgYW5kIGAuZW5kTm9kZWAsIGV4Y2x1c2l2ZWx5LlxuICAgKlxuICAgKiAtIElmIGAuc3RhcnROb2RlYCBpcyBub24tbnVsbCBidXQgYC5lbmROb2RlYCBpcyBudWxsLCB0aGVuIHRoZSBwYXJ0J3NcbiAgICogY29udGVudCBjb25zaXN0cyBvZiBhbGwgc2libGluZ3MgZm9sbG93aW5nIGAuc3RhcnROb2RlYCwgdXAgdG8gYW5kXG4gICAqIGluY2x1ZGluZyB0aGUgbGFzdCBjaGlsZCBvZiBgLnBhcmVudE5vZGVgLiBJZiBgLmVuZE5vZGVgIGlzIG5vbi1udWxsLCB0aGVuXG4gICAqIGAuc3RhcnROb2RlYCB3aWxsIGFsd2F5cyBiZSBub24tbnVsbC5cbiAgICpcbiAgICogLSBJZiBib3RoIGAuZW5kTm9kZWAgYW5kIGAuc3RhcnROb2RlYCBhcmUgbnVsbCwgdGhlbiB0aGUgcGFydCdzIGNvbnRlbnRcbiAgICogY29uc2lzdHMgb2YgYWxsIGNoaWxkIG5vZGVzIG9mIGAucGFyZW50Tm9kZWAuXG4gICAqL1xuICBnZXQgcGFyZW50Tm9kZSgpOiBOb2RlIHtcbiAgICBsZXQgcGFyZW50Tm9kZTogTm9kZSA9IHdyYXAodGhpcy5fJHN0YXJ0Tm9kZSkucGFyZW50Tm9kZSE7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5fJHBhcmVudDtcbiAgICBpZiAoXG4gICAgICBwYXJlbnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgcGFyZW50Tm9kZT8ubm9kZVR5cGUgPT09IDExIC8qIE5vZGUuRE9DVU1FTlRfRlJBR01FTlQgKi9cbiAgICApIHtcbiAgICAgIC8vIElmIHRoZSBwYXJlbnROb2RlIGlzIGEgRG9jdW1lbnRGcmFnbWVudCwgaXQgbWF5IGJlIGJlY2F1c2UgdGhlIERPTSBpc1xuICAgICAgLy8gc3RpbGwgaW4gdGhlIGNsb25lZCBmcmFnbWVudCBkdXJpbmcgaW5pdGlhbCByZW5kZXI7IGlmIHNvLCBnZXQgdGhlIHJlYWxcbiAgICAgIC8vIHBhcmVudE5vZGUgdGhlIHBhcnQgd2lsbCBiZSBjb21taXR0ZWQgaW50byBieSBhc2tpbmcgdGhlIHBhcmVudC5cbiAgICAgIHBhcmVudE5vZGUgPSAocGFyZW50IGFzIENoaWxkUGFydCB8IFRlbXBsYXRlSW5zdGFuY2UpLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnROb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBwYXJ0J3MgbGVhZGluZyBtYXJrZXIgbm9kZSwgaWYgYW55LiBTZWUgYC5wYXJlbnROb2RlYCBmb3IgbW9yZVxuICAgKiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGdldCBzdGFydE5vZGUoKTogTm9kZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl8kc3RhcnROb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBwYXJ0J3MgdHJhaWxpbmcgbWFya2VyIG5vZGUsIGlmIGFueS4gU2VlIGAucGFyZW50Tm9kZWAgZm9yIG1vcmVcbiAgICogaW5mb3JtYXRpb24uXG4gICAqL1xuICBnZXQgZW5kTm9kZSgpOiBOb2RlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuXyRlbmROb2RlO1xuICB9XG5cbiAgXyRzZXRWYWx1ZSh2YWx1ZTogdW5rbm93biwgZGlyZWN0aXZlUGFyZW50OiBEaXJlY3RpdmVQYXJlbnQgPSB0aGlzKTogdm9pZCB7XG4gICAgaWYgKERFVl9NT0RFICYmIHRoaXMucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVGhpcyBcXGBDaGlsZFBhcnRcXGAgaGFzIG5vIFxcYHBhcmVudE5vZGVcXGAgYW5kIHRoZXJlZm9yZSBjYW5ub3QgYWNjZXB0IGEgdmFsdWUuIFRoaXMgbGlrZWx5IG1lYW5zIHRoZSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIHBhcnQgd2FzIG1hbmlwdWxhdGVkIGluIGFuIHVuc3VwcG9ydGVkIHdheSBvdXRzaWRlIG9mIExpdCdzIGNvbnRyb2wgc3VjaCB0aGF0IHRoZSBwYXJ0J3MgbWFya2VyIG5vZGVzIHdlcmUgZWplY3RlZCBmcm9tIERPTS4gRm9yIGV4YW1wbGUsIHNldHRpbmcgdGhlIGVsZW1lbnQncyBcXGBpbm5lckhUTUxcXGAgb3IgXFxgdGV4dENvbnRlbnRcXGAgY2FuIGRvIHRoaXMuYFxuICAgICAgKTtcbiAgICB9XG4gICAgdmFsdWUgPSByZXNvbHZlRGlyZWN0aXZlKHRoaXMsIHZhbHVlLCBkaXJlY3RpdmVQYXJlbnQpO1xuICAgIGlmIChpc1ByaW1pdGl2ZSh2YWx1ZSkpIHtcbiAgICAgIC8vIE5vbi1yZW5kZXJpbmcgY2hpbGQgdmFsdWVzLiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZXNlIGRvIG5vdCByZW5kZXJcbiAgICAgIC8vIGVtcHR5IHRleHQgbm9kZXMgdG8gYXZvaWQgaXNzdWVzIHdpdGggcHJldmVudGluZyBkZWZhdWx0IDxzbG90PlxuICAgICAgLy8gZmFsbGJhY2sgY29udGVudC5cbiAgICAgIGlmICh2YWx1ZSA9PT0gbm90aGluZyB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICBpZiAodGhpcy5fJGNvbW1pdHRlZFZhbHVlICE9PSBub3RoaW5nKSB7XG4gICAgICAgICAgZGVidWdMb2dFdmVudCAmJlxuICAgICAgICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICAgIGtpbmQ6ICdjb21taXQgbm90aGluZyB0byBjaGlsZCcsXG4gICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLl8kc3RhcnROb2RlLFxuICAgICAgICAgICAgICBlbmQ6IHRoaXMuXyRlbmROb2RlLFxuICAgICAgICAgICAgICBwYXJlbnQ6IHRoaXMuXyRwYXJlbnQsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuXyRjbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IG5vdGhpbmc7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSB0aGlzLl8kY29tbWl0dGVkVmFsdWUgJiYgdmFsdWUgIT09IG5vQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuX2NvbW1pdFRleHQodmFsdWUpO1xuICAgICAgfVxuICAgICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICB9IGVsc2UgaWYgKCh2YWx1ZSBhcyBUZW1wbGF0ZVJlc3VsdClbJ18kbGl0VHlwZSQnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9jb21taXRUZW1wbGF0ZVJlc3VsdCh2YWx1ZSBhcyBUZW1wbGF0ZVJlc3VsdCk7XG4gICAgfSBlbHNlIGlmICgodmFsdWUgYXMgTm9kZSkubm9kZVR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKERFVl9NT0RFICYmIHRoaXMub3B0aW9ucz8uaG9zdCA9PT0gdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY29tbWl0VGV4dChcbiAgICAgICAgICBgW3Byb2JhYmxlIG1pc3Rha2U6IHJlbmRlcmVkIGEgdGVtcGxhdGUncyBob3N0IGluIGl0c2VsZiBgICtcbiAgICAgICAgICAgIGAoY29tbW9ubHkgY2F1c2VkIGJ5IHdyaXRpbmcgXFwke3RoaXN9IGluIGEgdGVtcGxhdGVdYFxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYEF0dGVtcHRlZCB0byByZW5kZXIgdGhlIHRlbXBsYXRlIGhvc3RgLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGBpbnNpZGUgaXRzZWxmLiBUaGlzIGlzIGFsbW9zdCBhbHdheXMgYSBtaXN0YWtlLCBhbmQgaW4gZGV2IG1vZGUgYCxcbiAgICAgICAgICBgd2UgcmVuZGVyIHNvbWUgd2FybmluZyB0ZXh0LiBJbiBwcm9kdWN0aW9uIGhvd2V2ZXIsIHdlJ2xsIGAsXG4gICAgICAgICAgYHJlbmRlciBpdCwgd2hpY2ggd2lsbCB1c3VhbGx5IHJlc3VsdCBpbiBhbiBlcnJvciwgYW5kIHNvbWV0aW1lcyBgLFxuICAgICAgICAgIGBpbiB0aGUgZWxlbWVudCBkaXNhcHBlYXJpbmcgZnJvbSB0aGUgRE9NLmBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29tbWl0Tm9kZSh2YWx1ZSBhcyBOb2RlKTtcbiAgICB9IGVsc2UgaWYgKGlzSXRlcmFibGUodmFsdWUpKSB7XG4gICAgICB0aGlzLl9jb21taXRJdGVyYWJsZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZhbGxiYWNrLCB3aWxsIHJlbmRlciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gICAgICB0aGlzLl9jb21taXRUZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbnNlcnQ8VCBleHRlbmRzIE5vZGU+KG5vZGU6IFQpIHtcbiAgICByZXR1cm4gd3JhcCh3cmFwKHRoaXMuXyRzdGFydE5vZGUpLnBhcmVudE5vZGUhKS5pbnNlcnRCZWZvcmUoXG4gICAgICBub2RlLFxuICAgICAgdGhpcy5fJGVuZE5vZGVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tbWl0Tm9kZSh2YWx1ZTogTm9kZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl8kY29tbWl0dGVkVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl8kY2xlYXIoKTtcbiAgICAgIGlmIChcbiAgICAgICAgRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTICYmXG4gICAgICAgIHNhbml0aXplckZhY3RvcnlJbnRlcm5hbCAhPT0gbm9vcFNhbml0aXplclxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGVOYW1lID0gdGhpcy5fJHN0YXJ0Tm9kZS5wYXJlbnROb2RlPy5ub2RlTmFtZTtcbiAgICAgICAgaWYgKHBhcmVudE5vZGVOYW1lID09PSAnU1RZTEUnIHx8IHBhcmVudE5vZGVOYW1lID09PSAnU0NSSVBUJykge1xuICAgICAgICAgIGxldCBtZXNzYWdlID0gJ0ZvcmJpZGRlbic7XG4gICAgICAgICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZU5hbWUgPT09ICdTVFlMRScpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICAgICAgYExpdCBkb2VzIG5vdCBzdXBwb3J0IGJpbmRpbmcgaW5zaWRlIHN0eWxlIG5vZGVzLiBgICtcbiAgICAgICAgICAgICAgICBgVGhpcyBpcyBhIHNlY3VyaXR5IHJpc2ssIGFzIHN0eWxlIGluamVjdGlvbiBhdHRhY2tzIGNhbiBgICtcbiAgICAgICAgICAgICAgICBgZXhmaWx0cmF0ZSBkYXRhIGFuZCBzcG9vZiBVSXMuIGAgK1xuICAgICAgICAgICAgICAgIGBDb25zaWRlciBpbnN0ZWFkIHVzaW5nIGNzc1xcYC4uLlxcYCBsaXRlcmFscyBgICtcbiAgICAgICAgICAgICAgICBgdG8gY29tcG9zZSBzdHlsZXMsIGFuZCBkbyBkeW5hbWljIHN0eWxpbmcgd2l0aCBgICtcbiAgICAgICAgICAgICAgICBgY3NzIGN1c3RvbSBwcm9wZXJ0aWVzLCA6OnBhcnRzLCA8c2xvdD5zLCBgICtcbiAgICAgICAgICAgICAgICBgYW5kIGJ5IG11dGF0aW5nIHRoZSBET00gcmF0aGVyIHRoYW4gc3R5bGVzaGVldHMuYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPVxuICAgICAgICAgICAgICAgIGBMaXQgZG9lcyBub3Qgc3VwcG9ydCBiaW5kaW5nIGluc2lkZSBzY3JpcHQgbm9kZXMuIGAgK1xuICAgICAgICAgICAgICAgIGBUaGlzIGlzIGEgc2VjdXJpdHkgcmlzaywgYXMgaXQgY291bGQgYWxsb3cgYXJiaXRyYXJ5IGAgK1xuICAgICAgICAgICAgICAgIGBjb2RlIGV4ZWN1dGlvbi5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAga2luZDogJ2NvbW1pdCBub2RlJyxcbiAgICAgICAgICBzdGFydDogdGhpcy5fJHN0YXJ0Tm9kZSxcbiAgICAgICAgICBwYXJlbnQ6IHRoaXMuXyRwYXJlbnQsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSB0aGlzLl9pbnNlcnQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbW1pdFRleHQodmFsdWU6IHVua25vd24pOiB2b2lkIHtcbiAgICAvLyBJZiB0aGUgY29tbWl0dGVkIHZhbHVlIGlzIGEgcHJpbWl0aXZlIGl0IG1lYW5zIHdlIGNhbGxlZCBfY29tbWl0VGV4dCBvblxuICAgIC8vIHRoZSBwcmV2aW91cyByZW5kZXIsIGFuZCB3ZSBrbm93IHRoYXQgdGhpcy5fJHN0YXJ0Tm9kZS5uZXh0U2libGluZyBpcyBhXG4gICAgLy8gVGV4dCBub2RlLiBXZSBjYW4gbm93IGp1c3QgcmVwbGFjZSB0aGUgdGV4dCBjb250ZW50ICguZGF0YSkgb2YgdGhlIG5vZGUuXG4gICAgaWYgKFxuICAgICAgdGhpcy5fJGNvbW1pdHRlZFZhbHVlICE9PSBub3RoaW5nICYmXG4gICAgICBpc1ByaW1pdGl2ZSh0aGlzLl8kY29tbWl0dGVkVmFsdWUpXG4gICAgKSB7XG4gICAgICBjb25zdCBub2RlID0gd3JhcCh0aGlzLl8kc3RhcnROb2RlKS5uZXh0U2libGluZyBhcyBUZXh0O1xuICAgICAgaWYgKEVOQUJMRV9FWFRSQV9TRUNVUklUWV9IT09LUykge1xuICAgICAgICBpZiAodGhpcy5fdGV4dFNhbml0aXplciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5fdGV4dFNhbml0aXplciA9IGNyZWF0ZVNhbml0aXplcihub2RlLCAnZGF0YScsICdwcm9wZXJ0eScpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gdGhpcy5fdGV4dFNhbml0aXplcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICAgIGtpbmQ6ICdjb21taXQgdGV4dCcsXG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgKG5vZGUgYXMgVGV4dCkuZGF0YSA9IHZhbHVlIGFzIHN0cmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKEVOQUJMRV9FWFRSQV9TRUNVUklUWV9IT09LUykge1xuICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgICB0aGlzLl9jb21taXROb2RlKHRleHROb2RlKTtcbiAgICAgICAgLy8gV2hlbiBzZXR0aW5nIHRleHQgY29udGVudCwgZm9yIHNlY3VyaXR5IHB1cnBvc2VzIGl0IG1hdHRlcnMgYSBsb3RcbiAgICAgICAgLy8gd2hhdCB0aGUgcGFyZW50IGlzLiBGb3IgZXhhbXBsZSwgPHN0eWxlPiBhbmQgPHNjcmlwdD4gbmVlZCB0byBiZVxuICAgICAgICAvLyBoYW5kbGVkIHdpdGggY2FyZSwgd2hpbGUgPHNwYW4+IGRvZXMgbm90LiBTbyBmaXJzdCB3ZSBuZWVkIHRvIHB1dCBhXG4gICAgICAgIC8vIHRleHQgbm9kZSBpbnRvIHRoZSBkb2N1bWVudCwgdGhlbiB3ZSBjYW4gc2FuaXRpemUgaXRzIGNvbnRlbnQuXG4gICAgICAgIGlmICh0aGlzLl90ZXh0U2FuaXRpemVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLl90ZXh0U2FuaXRpemVyID0gY3JlYXRlU2FuaXRpemVyKHRleHROb2RlLCAnZGF0YScsICdwcm9wZXJ0eScpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gdGhpcy5fdGV4dFNhbml0aXplcih2YWx1ZSk7XG4gICAgICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICAgIGtpbmQ6ICdjb21taXQgdGV4dCcsXG4gICAgICAgICAgICBub2RlOiB0ZXh0Tm9kZSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgIH0pO1xuICAgICAgICB0ZXh0Tm9kZS5kYXRhID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY29tbWl0Tm9kZShkLmNyZWF0ZVRleHROb2RlKHZhbHVlIGFzIHN0cmluZykpO1xuICAgICAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICBraW5kOiAnY29tbWl0IHRleHQnLFxuICAgICAgICAgICAgbm9kZTogd3JhcCh0aGlzLl8kc3RhcnROb2RlKS5uZXh0U2libGluZyBhcyBUZXh0LFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tbWl0VGVtcGxhdGVSZXN1bHQoXG4gICAgcmVzdWx0OiBUZW1wbGF0ZVJlc3VsdCB8IENvbXBpbGVkVGVtcGxhdGVSZXN1bHRcbiAgKTogdm9pZCB7XG4gICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICBjb25zdCB7dmFsdWVzLCBbJ18kbGl0VHlwZSQnXTogdHlwZX0gPSByZXN1bHQ7XG4gICAgLy8gSWYgJGxpdFR5cGUkIGlzIGEgbnVtYmVyLCByZXN1bHQgaXMgYSBwbGFpbiBUZW1wbGF0ZVJlc3VsdCBhbmQgd2UgZ2V0XG4gICAgLy8gdGhlIHRlbXBsYXRlIGZyb20gdGhlIHRlbXBsYXRlIGNhY2hlLiBJZiBub3QsIHJlc3VsdCBpcyBhXG4gICAgLy8gQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdCBhbmQgXyRsaXRUeXBlJCBpcyBhIENvbXBpbGVkVGVtcGxhdGUgYW5kIHdlIG5lZWRcbiAgICAvLyB0byBjcmVhdGUgdGhlIDx0ZW1wbGF0ZT4gZWxlbWVudCB0aGUgZmlyc3QgdGltZSB3ZSBzZWUgaXQuXG4gICAgY29uc3QgdGVtcGxhdGU6IFRlbXBsYXRlIHwgQ29tcGlsZWRUZW1wbGF0ZSA9XG4gICAgICB0eXBlb2YgdHlwZSA9PT0gJ251bWJlcidcbiAgICAgICAgPyB0aGlzLl8kZ2V0VGVtcGxhdGUocmVzdWx0IGFzIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdClcbiAgICAgICAgOiAodHlwZS5lbCA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAodHlwZS5lbCA9IFRlbXBsYXRlLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIHRydXN0RnJvbVRlbXBsYXRlU3RyaW5nKHR5cGUuaCwgdHlwZS5oWzBdKSxcbiAgICAgICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgICApKSxcbiAgICAgICAgICB0eXBlKTtcblxuICAgIGlmICgodGhpcy5fJGNvbW1pdHRlZFZhbHVlIGFzIFRlbXBsYXRlSW5zdGFuY2UpPy5fJHRlbXBsYXRlID09PSB0ZW1wbGF0ZSkge1xuICAgICAgZGVidWdMb2dFdmVudCAmJlxuICAgICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICBraW5kOiAndGVtcGxhdGUgdXBkYXRpbmcnLFxuICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgIGluc3RhbmNlOiB0aGlzLl8kY29tbWl0dGVkVmFsdWUgYXMgVGVtcGxhdGVJbnN0YW5jZSxcbiAgICAgICAgICBwYXJ0czogKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBUZW1wbGF0ZUluc3RhbmNlKS5fJHBhcnRzLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICB2YWx1ZXMsXG4gICAgICAgIH0pO1xuICAgICAgKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBUZW1wbGF0ZUluc3RhbmNlKS5fdXBkYXRlKHZhbHVlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFRlbXBsYXRlSW5zdGFuY2UodGVtcGxhdGUgYXMgVGVtcGxhdGUsIHRoaXMpO1xuICAgICAgY29uc3QgZnJhZ21lbnQgPSBpbnN0YW5jZS5fY2xvbmUodGhpcy5vcHRpb25zKTtcbiAgICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAga2luZDogJ3RlbXBsYXRlIGluc3RhbnRpYXRlZCcsXG4gICAgICAgICAgdGVtcGxhdGUsXG4gICAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgICAgcGFydHM6IGluc3RhbmNlLl8kcGFydHMsXG4gICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgIGZyYWdtZW50LFxuICAgICAgICAgIHZhbHVlcyxcbiAgICAgICAgfSk7XG4gICAgICBpbnN0YW5jZS5fdXBkYXRlKHZhbHVlcyk7XG4gICAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICAgIGtpbmQ6ICd0ZW1wbGF0ZSBpbnN0YW50aWF0ZWQgYW5kIHVwZGF0ZWQnLFxuICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgIGluc3RhbmNlLFxuICAgICAgICAgIHBhcnRzOiBpbnN0YW5jZS5fJHBhcnRzLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICBmcmFnbWVudCxcbiAgICAgICAgICB2YWx1ZXMsXG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5fY29tbWl0Tm9kZShmcmFnbWVudCk7XG4gICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSBpbnN0YW5jZTtcbiAgICB9XG4gIH1cblxuICAvLyBPdmVycmlkZGVuIHZpYSBgbGl0SHRtbFBvbHlmaWxsU3VwcG9ydGAgdG8gcHJvdmlkZSBwbGF0Zm9ybSBzdXBwb3J0LlxuICAvKiogQGludGVybmFsICovXG4gIF8kZ2V0VGVtcGxhdGUocmVzdWx0OiBVbmNvbXBpbGVkVGVtcGxhdGVSZXN1bHQpIHtcbiAgICBsZXQgdGVtcGxhdGUgPSB0ZW1wbGF0ZUNhY2hlLmdldChyZXN1bHQuc3RyaW5ncyk7XG4gICAgaWYgKHRlbXBsYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRlbXBsYXRlQ2FjaGUuc2V0KHJlc3VsdC5zdHJpbmdzLCAodGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUocmVzdWx0KSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICBwcml2YXRlIF9jb21taXRJdGVyYWJsZSh2YWx1ZTogSXRlcmFibGU8dW5rbm93bj4pOiB2b2lkIHtcbiAgICAvLyBGb3IgYW4gSXRlcmFibGUsIHdlIGNyZWF0ZSBhIG5ldyBJbnN0YW5jZVBhcnQgcGVyIGl0ZW0sIHRoZW4gc2V0IGl0c1xuICAgIC8vIHZhbHVlIHRvIHRoZSBpdGVtLiBUaGlzIGlzIGEgbGl0dGxlIGJpdCBvZiBvdmVyaGVhZCBmb3IgZXZlcnkgaXRlbSBpblxuICAgIC8vIGFuIEl0ZXJhYmxlLCBidXQgaXQgbGV0cyB1cyByZWN1cnNlIGVhc2lseSBhbmQgZWZmaWNpZW50bHkgdXBkYXRlIEFycmF5c1xuICAgIC8vIG9mIFRlbXBsYXRlUmVzdWx0cyB0aGF0IHdpbGwgYmUgY29tbW9ubHkgcmV0dXJuZWQgZnJvbSBleHByZXNzaW9ucyBsaWtlOlxuICAgIC8vIGFycmF5Lm1hcCgoaSkgPT4gaHRtbGAke2l9YCksIGJ5IHJldXNpbmcgZXhpc3RpbmcgVGVtcGxhdGVJbnN0YW5jZXMuXG5cbiAgICAvLyBJZiB2YWx1ZSBpcyBhbiBhcnJheSwgdGhlbiB0aGUgcHJldmlvdXMgcmVuZGVyIHdhcyBvZiBhblxuICAgIC8vIGl0ZXJhYmxlIGFuZCB2YWx1ZSB3aWxsIGNvbnRhaW4gdGhlIENoaWxkUGFydHMgZnJvbSB0aGUgcHJldmlvdXNcbiAgICAvLyByZW5kZXIuIElmIHZhbHVlIGlzIG5vdCBhbiBhcnJheSwgY2xlYXIgdGhpcyBwYXJ0IGFuZCBtYWtlIGEgbmV3XG4gICAgLy8gYXJyYXkgZm9yIENoaWxkUGFydHMuXG4gICAgaWYgKCFpc0FycmF5KHRoaXMuXyRjb21taXR0ZWRWYWx1ZSkpIHtcbiAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IFtdO1xuICAgICAgdGhpcy5fJGNsZWFyKCk7XG4gICAgfVxuXG4gICAgLy8gTGV0cyB1cyBrZWVwIHRyYWNrIG9mIGhvdyBtYW55IGl0ZW1zIHdlIHN0YW1wZWQgc28gd2UgY2FuIGNsZWFyIGxlZnRvdmVyXG4gICAgLy8gaXRlbXMgZnJvbSBhIHByZXZpb3VzIHJlbmRlclxuICAgIGNvbnN0IGl0ZW1QYXJ0cyA9IHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBDaGlsZFBhcnRbXTtcbiAgICBsZXQgcGFydEluZGV4ID0gMDtcbiAgICBsZXQgaXRlbVBhcnQ6IENoaWxkUGFydCB8IHVuZGVmaW5lZDtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgaWYgKHBhcnRJbmRleCA9PT0gaXRlbVBhcnRzLmxlbmd0aCkge1xuICAgICAgICAvLyBJZiBubyBleGlzdGluZyBwYXJ0LCBjcmVhdGUgYSBuZXcgb25lXG4gICAgICAgIC8vIFRPRE8gKGp1c3RpbmZhZ25hbmkpOiB0ZXN0IHBlcmYgaW1wYWN0IG9mIGFsd2F5cyBjcmVhdGluZyB0d28gcGFydHNcbiAgICAgICAgLy8gaW5zdGVhZCBvZiBzaGFyaW5nIHBhcnRzIGJldHdlZW4gbm9kZXNcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2xpdC9saXQvaXNzdWVzLzEyNjZcbiAgICAgICAgaXRlbVBhcnRzLnB1c2goXG4gICAgICAgICAgKGl0ZW1QYXJ0ID0gbmV3IENoaWxkUGFydChcbiAgICAgICAgICAgIHRoaXMuX2luc2VydChjcmVhdGVNYXJrZXIoKSksXG4gICAgICAgICAgICB0aGlzLl9pbnNlcnQoY3JlYXRlTWFya2VyKCkpLFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICAgICkpXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXVzZSBhbiBleGlzdGluZyBwYXJ0XG4gICAgICAgIGl0ZW1QYXJ0ID0gaXRlbVBhcnRzW3BhcnRJbmRleF07XG4gICAgICB9XG4gICAgICBpdGVtUGFydC5fJHNldFZhbHVlKGl0ZW0pO1xuICAgICAgcGFydEluZGV4Kys7XG4gICAgfVxuXG4gICAgaWYgKHBhcnRJbmRleCA8IGl0ZW1QYXJ0cy5sZW5ndGgpIHtcbiAgICAgIC8vIGl0ZW1QYXJ0cyBhbHdheXMgaGF2ZSBlbmQgbm9kZXNcbiAgICAgIHRoaXMuXyRjbGVhcihcbiAgICAgICAgaXRlbVBhcnQgJiYgd3JhcChpdGVtUGFydC5fJGVuZE5vZGUhKS5uZXh0U2libGluZyxcbiAgICAgICAgcGFydEluZGV4XG4gICAgICApO1xuICAgICAgLy8gVHJ1bmNhdGUgdGhlIHBhcnRzIGFycmF5IHNvIF92YWx1ZSByZWZsZWN0cyB0aGUgY3VycmVudCBzdGF0ZVxuICAgICAgaXRlbVBhcnRzLmxlbmd0aCA9IHBhcnRJbmRleDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgbm9kZXMgY29udGFpbmVkIHdpdGhpbiB0aGlzIFBhcnQgZnJvbSB0aGUgRE9NLlxuICAgKlxuICAgKiBAcGFyYW0gc3RhcnQgU3RhcnQgbm9kZSB0byBjbGVhciBmcm9tLCBmb3IgY2xlYXJpbmcgYSBzdWJzZXQgb2YgdGhlIHBhcnQnc1xuICAgKiAgICAgRE9NICh1c2VkIHdoZW4gdHJ1bmNhdGluZyBpdGVyYWJsZXMpXG4gICAqIEBwYXJhbSBmcm9tICBXaGVuIGBzdGFydGAgaXMgc3BlY2lmaWVkLCB0aGUgaW5kZXggd2l0aGluIHRoZSBpdGVyYWJsZSBmcm9tXG4gICAqICAgICB3aGljaCBDaGlsZFBhcnRzIGFyZSBiZWluZyByZW1vdmVkLCB1c2VkIGZvciBkaXNjb25uZWN0aW5nIGRpcmVjdGl2ZXNcbiAgICogICAgIGluIHRob3NlIFBhcnRzLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF8kY2xlYXIoXG4gICAgc3RhcnQ6IENoaWxkTm9kZSB8IG51bGwgPSB3cmFwKHRoaXMuXyRzdGFydE5vZGUpLm5leHRTaWJsaW5nLFxuICAgIGZyb20/OiBudW1iZXJcbiAgKSB7XG4gICAgdGhpcy5fJG5vdGlmeUNvbm5lY3Rpb25DaGFuZ2VkPy4oZmFsc2UsIHRydWUsIGZyb20pO1xuICAgIHdoaWxlIChzdGFydCAhPT0gdGhpcy5fJGVuZE5vZGUpIHtcbiAgICAgIC8vIFRoZSBub24tbnVsbCBhc3NlcnRpb24gaXMgc2FmZSBiZWNhdXNlIGlmIF8kc3RhcnROb2RlLm5leHRTaWJsaW5nIGlzXG4gICAgICAvLyBudWxsLCB0aGVuIF8kZW5kTm9kZSBpcyBhbHNvIG51bGwsIGFuZCB3ZSB3b3VsZCBub3QgaGF2ZSBlbnRlcmVkIHRoaXNcbiAgICAgIC8vIGxvb3AuXG4gICAgICBjb25zdCBuID0gd3JhcChzdGFydCEpLm5leHRTaWJsaW5nO1xuICAgICAgd3JhcChzdGFydCEpLnJlbW92ZSgpO1xuICAgICAgc3RhcnQgPSBuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRhdGlvbiBvZiBSb290UGFydCdzIGBpc0Nvbm5lY3RlZGAuIE5vdGUgdGhhdCB0aGlzIG1ldGhvZFxuICAgKiBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYFJvb3RQYXJ0YHMgKHRoZSBgQ2hpbGRQYXJ0YCByZXR1cm5lZCBmcm9tIGFcbiAgICogdG9wLWxldmVsIGByZW5kZXIoKWAgY2FsbCkuIEl0IGhhcyBubyBlZmZlY3Qgb24gbm9uLXJvb3QgQ2hpbGRQYXJ0cy5cbiAgICogQHBhcmFtIGlzQ29ubmVjdGVkIFdoZXRoZXIgdG8gc2V0XG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgc2V0Q29ubmVjdGVkKGlzQ29ubmVjdGVkOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuXyRwYXJlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fX2lzQ29ubmVjdGVkID0gaXNDb25uZWN0ZWQ7XG4gICAgICB0aGlzLl8kbm90aWZ5Q29ubmVjdGlvbkNoYW5nZWQ/Lihpc0Nvbm5lY3RlZCk7XG4gICAgfSBlbHNlIGlmIChERVZfTU9ERSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAncGFydC5zZXRDb25uZWN0ZWQoKSBtYXkgb25seSBiZSBjYWxsZWQgb24gYSAnICtcbiAgICAgICAgICAnUm9vdFBhcnQgcmV0dXJuZWQgZnJvbSByZW5kZXIoKS4nXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEEgdG9wLWxldmVsIGBDaGlsZFBhcnRgIHJldHVybmVkIGZyb20gYHJlbmRlcmAgdGhhdCBtYW5hZ2VzIHRoZSBjb25uZWN0ZWRcbiAqIHN0YXRlIG9mIGBBc3luY0RpcmVjdGl2ZWBzIGNyZWF0ZWQgdGhyb3VnaG91dCB0aGUgdHJlZSBiZWxvdyBpdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSb290UGFydCBleHRlbmRzIENoaWxkUGFydCB7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjb25uZWN0aW9uIHN0YXRlIGZvciBgQXN5bmNEaXJlY3RpdmVgcyBjb250YWluZWQgd2l0aGluIHRoaXMgcm9vdFxuICAgKiBDaGlsZFBhcnQuXG4gICAqXG4gICAqIGxpdC1odG1sIGRvZXMgbm90IGF1dG9tYXRpY2FsbHkgbW9uaXRvciB0aGUgY29ubmVjdGVkbmVzcyBvZiBET00gcmVuZGVyZWQ7XG4gICAqIGFzIHN1Y2gsIGl0IGlzIHRoZSByZXNwb25zaWJpbGl0eSBvZiB0aGUgY2FsbGVyIHRvIGByZW5kZXJgIHRvIGVuc3VyZSB0aGF0XG4gICAqIGBwYXJ0LnNldENvbm5lY3RlZChmYWxzZSlgIGlzIGNhbGxlZCBiZWZvcmUgdGhlIHBhcnQgb2JqZWN0IGlzIHBvdGVudGlhbGx5XG4gICAqIGRpc2NhcmRlZCwgdG8gZW5zdXJlIHRoYXQgYEFzeW5jRGlyZWN0aXZlYHMgaGF2ZSBhIGNoYW5jZSB0byBkaXNwb3NlIG9mXG4gICAqIGFueSByZXNvdXJjZXMgYmVpbmcgaGVsZC4gSWYgYSBgUm9vdFBhcnRgIHRoYXQgd2FzIHByZXZpb3VzbHlcbiAgICogZGlzY29ubmVjdGVkIGlzIHN1YnNlcXVlbnRseSByZS1jb25uZWN0ZWQgKGFuZCBpdHMgYEFzeW5jRGlyZWN0aXZlYHMgc2hvdWxkXG4gICAqIHJlLWNvbm5lY3QpLCBgc2V0Q29ubmVjdGVkKHRydWUpYCBzaG91bGQgYmUgY2FsbGVkLlxuICAgKlxuICAgKiBAcGFyYW0gaXNDb25uZWN0ZWQgV2hldGhlciBkaXJlY3RpdmVzIHdpdGhpbiB0aGlzIHRyZWUgc2hvdWxkIGJlIGNvbm5lY3RlZFxuICAgKiBvciBub3RcbiAgICovXG4gIHNldENvbm5lY3RlZChpc0Nvbm5lY3RlZDogYm9vbGVhbik6IHZvaWQ7XG59XG5cbmV4cG9ydCB0eXBlIHtBdHRyaWJ1dGVQYXJ0fTtcbmNsYXNzIEF0dHJpYnV0ZVBhcnQgaW1wbGVtZW50cyBEaXNjb25uZWN0YWJsZSB7XG4gIHJlYWRvbmx5IHR5cGU6XG4gICAgfCB0eXBlb2YgQVRUUklCVVRFX1BBUlRcbiAgICB8IHR5cGVvZiBQUk9QRVJUWV9QQVJUXG4gICAgfCB0eXBlb2YgQk9PTEVBTl9BVFRSSUJVVEVfUEFSVFxuICAgIHwgdHlwZW9mIEVWRU5UX1BBUlQgPSBBVFRSSUJVVEVfUEFSVDtcbiAgcmVhZG9ubHkgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogSWYgdGhpcyBhdHRyaWJ1dGUgcGFydCByZXByZXNlbnRzIGFuIGludGVycG9sYXRpb24sIHRoaXMgY29udGFpbnMgdGhlXG4gICAqIHN0YXRpYyBzdHJpbmdzIG9mIHRoZSBpbnRlcnBvbGF0aW9uLiBGb3Igc2luZ2xlLXZhbHVlLCBjb21wbGV0ZSBiaW5kaW5ncyxcbiAgICogdGhpcyBpcyB1bmRlZmluZWQuXG4gICAqL1xuICByZWFkb25seSBzdHJpbmdzPzogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xuICAvKiogQGludGVybmFsICovXG4gIF8kY29tbWl0dGVkVmFsdWU6IHVua25vd24gfCBBcnJheTx1bmtub3duPiA9IG5vdGhpbmc7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX19kaXJlY3RpdmVzPzogQXJyYXk8RGlyZWN0aXZlIHwgdW5kZWZpbmVkPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJHBhcmVudDogRGlzY29ubmVjdGFibGU7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRkaXNjb25uZWN0YWJsZUNoaWxkcmVuPzogU2V0PERpc2Nvbm5lY3RhYmxlPiA9IHVuZGVmaW5lZDtcblxuICBwcm90ZWN0ZWQgX3Nhbml0aXplcjogVmFsdWVTYW5pdGl6ZXIgfCB1bmRlZmluZWQ7XG5cbiAgZ2V0IHRhZ05hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC50YWdOYW1lO1xuICB9XG5cbiAgLy8gU2VlIGNvbW1lbnQgaW4gRGlzY29ubmVjdGFibGUgaW50ZXJmYWNlIGZvciB3aHkgdGhpcyBpcyBhIGdldHRlclxuICBnZXQgXyRpc0Nvbm5lY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fJHBhcmVudC5fJGlzQ29ubmVjdGVkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHN0cmluZ3M6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPixcbiAgICBwYXJlbnQ6IERpc2Nvbm5lY3RhYmxlLFxuICAgIG9wdGlvbnM6IFJlbmRlck9wdGlvbnMgfCB1bmRlZmluZWRcbiAgKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuXyRwYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAoc3RyaW5ncy5sZW5ndGggPiAyIHx8IHN0cmluZ3NbMF0gIT09ICcnIHx8IHN0cmluZ3NbMV0gIT09ICcnKSB7XG4gICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSBuZXcgQXJyYXkoc3RyaW5ncy5sZW5ndGggLSAxKS5maWxsKG5ldyBTdHJpbmcoKSk7XG4gICAgICB0aGlzLnN0cmluZ3MgPSBzdHJpbmdzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSBub3RoaW5nO1xuICAgIH1cbiAgICBpZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICB0aGlzLl9zYW5pdGl6ZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoaXMgcGFydCBieSByZXNvbHZpbmcgdGhlIHZhbHVlIGZyb20gcG9zc2libHkgbXVsdGlwbGVcbiAgICogdmFsdWVzIGFuZCBzdGF0aWMgc3RyaW5ncyBhbmQgY29tbWl0dGluZyBpdCB0byB0aGUgRE9NLlxuICAgKiBJZiB0aGlzIHBhcnQgaXMgc2luZ2xlLXZhbHVlZCwgYHRoaXMuX3N0cmluZ3NgIHdpbGwgYmUgdW5kZWZpbmVkLCBhbmQgdGhlXG4gICAqIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCB3aXRoIGEgc2luZ2xlIHZhbHVlIGFyZ3VtZW50LiBJZiB0aGlzIHBhcnQgaXNcbiAgICogbXVsdGktdmFsdWUsIGB0aGlzLl9zdHJpbmdzYCB3aWxsIGJlIGRlZmluZWQsIGFuZCB0aGUgbWV0aG9kIGlzIGNhbGxlZFxuICAgKiB3aXRoIHRoZSB2YWx1ZSBhcnJheSBvZiB0aGUgcGFydCdzIG93bmluZyBUZW1wbGF0ZUluc3RhbmNlLCBhbmQgYW4gb2Zmc2V0XG4gICAqIGludG8gdGhlIHZhbHVlIGFycmF5IGZyb20gd2hpY2ggdGhlIHZhbHVlcyBzaG91bGQgYmUgcmVhZC5cbiAgICogVGhpcyBtZXRob2QgaXMgb3ZlcmxvYWRlZCB0aGlzIHdheSB0byBlbGltaW5hdGUgc2hvcnQtbGl2ZWQgYXJyYXkgc2xpY2VzXG4gICAqIG9mIHRoZSB0ZW1wbGF0ZSBpbnN0YW5jZSB2YWx1ZXMsIGFuZCBhbGxvdyBhIGZhc3QtcGF0aCBmb3Igc2luZ2xlLXZhbHVlZFxuICAgKiBwYXJ0cy5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIFRoZSBwYXJ0IHZhbHVlLCBvciBhbiBhcnJheSBvZiB2YWx1ZXMgZm9yIG11bHRpLXZhbHVlZCBwYXJ0c1xuICAgKiBAcGFyYW0gdmFsdWVJbmRleCB0aGUgaW5kZXggdG8gc3RhcnQgcmVhZGluZyB2YWx1ZXMgZnJvbS4gYHVuZGVmaW5lZGAgZm9yXG4gICAqICAgc2luZ2xlLXZhbHVlZCBwYXJ0c1xuICAgKiBAcGFyYW0gbm9Db21taXQgY2F1c2VzIHRoZSBwYXJ0IHRvIG5vdCBjb21taXQgaXRzIHZhbHVlIHRvIHRoZSBET00uIFVzZWRcbiAgICogICBpbiBoeWRyYXRpb24gdG8gcHJpbWUgYXR0cmlidXRlIHBhcnRzIHdpdGggdGhlaXIgZmlyc3QtcmVuZGVyZWQgdmFsdWUsXG4gICAqICAgYnV0IG5vdCBzZXQgdGhlIGF0dHJpYnV0ZSwgYW5kIGluIFNTUiB0byBuby1vcCB0aGUgRE9NIG9wZXJhdGlvbiBhbmRcbiAgICogICBjYXB0dXJlIHRoZSB2YWx1ZSBmb3Igc2VyaWFsaXphdGlvbi5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfJHNldFZhbHVlKFxuICAgIHZhbHVlOiB1bmtub3duIHwgQXJyYXk8dW5rbm93bj4sXG4gICAgZGlyZWN0aXZlUGFyZW50OiBEaXJlY3RpdmVQYXJlbnQgPSB0aGlzLFxuICAgIHZhbHVlSW5kZXg/OiBudW1iZXIsXG4gICAgbm9Db21taXQ/OiBib29sZWFuXG4gICkge1xuICAgIGNvbnN0IHN0cmluZ3MgPSB0aGlzLnN0cmluZ3M7XG5cbiAgICAvLyBXaGV0aGVyIGFueSBvZiB0aGUgdmFsdWVzIGhhcyBjaGFuZ2VkLCBmb3IgZGlydHktY2hlY2tpbmdcbiAgICBsZXQgY2hhbmdlID0gZmFsc2U7XG5cbiAgICBpZiAoc3RyaW5ncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBTaW5nbGUtdmFsdWUgYmluZGluZyBjYXNlXG4gICAgICB2YWx1ZSA9IHJlc29sdmVEaXJlY3RpdmUodGhpcywgdmFsdWUsIGRpcmVjdGl2ZVBhcmVudCwgMCk7XG4gICAgICBjaGFuZ2UgPVxuICAgICAgICAhaXNQcmltaXRpdmUodmFsdWUpIHx8XG4gICAgICAgICh2YWx1ZSAhPT0gdGhpcy5fJGNvbW1pdHRlZFZhbHVlICYmIHZhbHVlICE9PSBub0NoYW5nZSk7XG4gICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJbnRlcnBvbGF0aW9uIGNhc2VcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHZhbHVlIGFzIEFycmF5PHVua25vd24+O1xuICAgICAgdmFsdWUgPSBzdHJpbmdzWzBdO1xuXG4gICAgICBsZXQgaSwgdjtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmdzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICB2ID0gcmVzb2x2ZURpcmVjdGl2ZSh0aGlzLCB2YWx1ZXNbdmFsdWVJbmRleCEgKyBpXSwgZGlyZWN0aXZlUGFyZW50LCBpKTtcblxuICAgICAgICBpZiAodiA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgdXNlci1wcm92aWRlZCB2YWx1ZSBpcyBgbm9DaGFuZ2VgLCB1c2UgdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgICAgICAgdiA9ICh0aGlzLl8kY29tbWl0dGVkVmFsdWUgYXMgQXJyYXk8dW5rbm93bj4pW2ldO1xuICAgICAgICB9XG4gICAgICAgIGNoYW5nZSB8fD1cbiAgICAgICAgICAhaXNQcmltaXRpdmUodikgfHwgdiAhPT0gKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBBcnJheTx1bmtub3duPilbaV07XG4gICAgICAgIGlmICh2ID09PSBub3RoaW5nKSB7XG4gICAgICAgICAgdmFsdWUgPSBub3RoaW5nO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBub3RoaW5nKSB7XG4gICAgICAgICAgdmFsdWUgKz0gKHYgPz8gJycpICsgc3RyaW5nc1tpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgYWx3YXlzIHJlY29yZCBlYWNoIHZhbHVlLCBldmVuIGlmIG9uZSBpcyBgbm90aGluZ2AsIGZvciBmdXR1cmVcbiAgICAgICAgLy8gY2hhbmdlIGRldGVjdGlvbi5cbiAgICAgICAgKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBBcnJheTx1bmtub3duPilbaV0gPSB2O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlICYmICFub0NvbW1pdCkge1xuICAgICAgdGhpcy5fY29tbWl0VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbW1pdFZhbHVlKHZhbHVlOiB1bmtub3duKSB7XG4gICAgaWYgKHZhbHVlID09PSBub3RoaW5nKSB7XG4gICAgICAod3JhcCh0aGlzLmVsZW1lbnQpIGFzIEVsZW1lbnQpLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLm5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICAgIGlmICh0aGlzLl9zYW5pdGl6ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuX3Nhbml0aXplciA9IHNhbml0aXplckZhY3RvcnlJbnRlcm5hbChcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCxcbiAgICAgICAgICAgIHRoaXMubmFtZSxcbiAgICAgICAgICAgICdhdHRyaWJ1dGUnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHRoaXMuX3Nhbml0aXplcih2YWx1ZSA/PyAnJyk7XG4gICAgICB9XG4gICAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICAgIGtpbmQ6ICdjb21taXQgYXR0cmlidXRlJyxcbiAgICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICAod3JhcCh0aGlzLmVsZW1lbnQpIGFzIEVsZW1lbnQpLnNldEF0dHJpYnV0ZShcbiAgICAgICAgdGhpcy5uYW1lLFxuICAgICAgICAodmFsdWUgPz8gJycpIGFzIHN0cmluZ1xuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUge1Byb3BlcnR5UGFydH07XG5jbGFzcyBQcm9wZXJ0eVBhcnQgZXh0ZW5kcyBBdHRyaWJ1dGVQYXJ0IHtcbiAgb3ZlcnJpZGUgcmVhZG9ubHkgdHlwZSA9IFBST1BFUlRZX1BBUlQ7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBvdmVycmlkZSBfY29tbWl0VmFsdWUodmFsdWU6IHVua25vd24pIHtcbiAgICBpZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICBpZiAodGhpcy5fc2FuaXRpemVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2FuaXRpemVyID0gc2FuaXRpemVyRmFjdG9yeUludGVybmFsKFxuICAgICAgICAgIHRoaXMuZWxlbWVudCxcbiAgICAgICAgICB0aGlzLm5hbWUsXG4gICAgICAgICAgJ3Byb3BlcnR5J1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSB0aGlzLl9zYW5pdGl6ZXIodmFsdWUpO1xuICAgIH1cbiAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAga2luZDogJ2NvbW1pdCBwcm9wZXJ0eScsXG4gICAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgfSk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAodGhpcy5lbGVtZW50IGFzIGFueSlbdGhpcy5uYW1lXSA9IHZhbHVlID09PSBub3RoaW5nID8gdW5kZWZpbmVkIDogdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUge0Jvb2xlYW5BdHRyaWJ1dGVQYXJ0fTtcbmNsYXNzIEJvb2xlYW5BdHRyaWJ1dGVQYXJ0IGV4dGVuZHMgQXR0cmlidXRlUGFydCB7XG4gIG92ZXJyaWRlIHJlYWRvbmx5IHR5cGUgPSBCT09MRUFOX0FUVFJJQlVURV9QQVJUO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgb3ZlcnJpZGUgX2NvbW1pdFZhbHVlKHZhbHVlOiB1bmtub3duKSB7XG4gICAgZGVidWdMb2dFdmVudCAmJlxuICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgIGtpbmQ6ICdjb21taXQgYm9vbGVhbiBhdHRyaWJ1dGUnLFxuICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgdmFsdWU6ICEhKHZhbHVlICYmIHZhbHVlICE9PSBub3RoaW5nKSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgfSk7XG4gICAgKHdyYXAodGhpcy5lbGVtZW50KSBhcyBFbGVtZW50KS50b2dnbGVBdHRyaWJ1dGUoXG4gICAgICB0aGlzLm5hbWUsXG4gICAgICAhIXZhbHVlICYmIHZhbHVlICE9PSBub3RoaW5nXG4gICAgKTtcbiAgfVxufVxuXG50eXBlIEV2ZW50TGlzdGVuZXJXaXRoT3B0aW9ucyA9IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QgJlxuICBQYXJ0aWFsPEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zPjtcblxuLyoqXG4gKiBBbiBBdHRyaWJ1dGVQYXJ0IHRoYXQgbWFuYWdlcyBhbiBldmVudCBsaXN0ZW5lciB2aWEgYWRkL3JlbW92ZUV2ZW50TGlzdGVuZXIuXG4gKlxuICogVGhpcyBwYXJ0IHdvcmtzIGJ5IGFkZGluZyBpdHNlbGYgYXMgdGhlIGV2ZW50IGxpc3RlbmVyIG9uIGFuIGVsZW1lbnQsIHRoZW5cbiAqIGRlbGVnYXRpbmcgdG8gdGhlIHZhbHVlIHBhc3NlZCB0byBpdC4gVGhpcyByZWR1Y2VzIHRoZSBudW1iZXIgb2YgY2FsbHMgdG9cbiAqIGFkZC9yZW1vdmVFdmVudExpc3RlbmVyIGlmIHRoZSBsaXN0ZW5lciBjaGFuZ2VzIGZyZXF1ZW50bHksIHN1Y2ggYXMgd2hlbiBhblxuICogaW5saW5lIGZ1bmN0aW9uIGlzIHVzZWQgYXMgYSBsaXN0ZW5lci5cbiAqXG4gKiBCZWNhdXNlIGV2ZW50IG9wdGlvbnMgYXJlIHBhc3NlZCB3aGVuIGFkZGluZyBsaXN0ZW5lcnMsIHdlIG11c3QgdGFrZSBjYXNlXG4gKiB0byBhZGQgYW5kIHJlbW92ZSB0aGUgcGFydCBhcyBhIGxpc3RlbmVyIHdoZW4gdGhlIGV2ZW50IG9wdGlvbnMgY2hhbmdlLlxuICovXG5leHBvcnQgdHlwZSB7RXZlbnRQYXJ0fTtcbmNsYXNzIEV2ZW50UGFydCBleHRlbmRzIEF0dHJpYnV0ZVBhcnQge1xuICBvdmVycmlkZSByZWFkb25seSB0eXBlID0gRVZFTlRfUEFSVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgc3RyaW5nczogUmVhZG9ubHlBcnJheTxzdHJpbmc+LFxuICAgIHBhcmVudDogRGlzY29ubmVjdGFibGUsXG4gICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZFxuICApIHtcbiAgICBzdXBlcihlbGVtZW50LCBuYW1lLCBzdHJpbmdzLCBwYXJlbnQsIG9wdGlvbnMpO1xuXG4gICAgaWYgKERFVl9NT0RFICYmIHRoaXMuc3RyaW5ncyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBBIFxcYDwke2VsZW1lbnQubG9jYWxOYW1lfT5cXGAgaGFzIGEgXFxgQCR7bmFtZX09Li4uXFxgIGxpc3RlbmVyIHdpdGggYCArXG4gICAgICAgICAgJ2ludmFsaWQgY29udGVudC4gRXZlbnQgbGlzdGVuZXJzIGluIHRlbXBsYXRlcyBtdXN0IGhhdmUgZXhhY3RseSAnICtcbiAgICAgICAgICAnb25lIGV4cHJlc3Npb24gYW5kIG5vIHN1cnJvdW5kaW5nIHRleHQuJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyBFdmVudFBhcnQgZG9lcyBub3QgdXNlIHRoZSBiYXNlIF8kc2V0VmFsdWUvX3Jlc29sdmVWYWx1ZSBpbXBsZW1lbnRhdGlvblxuICAvLyBzaW5jZSB0aGUgZGlydHkgY2hlY2tpbmcgaXMgbW9yZSBjb21wbGV4XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgb3ZlcnJpZGUgXyRzZXRWYWx1ZShcbiAgICBuZXdMaXN0ZW5lcjogdW5rbm93bixcbiAgICBkaXJlY3RpdmVQYXJlbnQ6IERpcmVjdGl2ZVBhcmVudCA9IHRoaXNcbiAgKSB7XG4gICAgbmV3TGlzdGVuZXIgPVxuICAgICAgcmVzb2x2ZURpcmVjdGl2ZSh0aGlzLCBuZXdMaXN0ZW5lciwgZGlyZWN0aXZlUGFyZW50LCAwKSA/PyBub3RoaW5nO1xuICAgIGlmIChuZXdMaXN0ZW5lciA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb2xkTGlzdGVuZXIgPSB0aGlzLl8kY29tbWl0dGVkVmFsdWU7XG5cbiAgICAvLyBJZiB0aGUgbmV3IHZhbHVlIGlzIG5vdGhpbmcgb3IgYW55IG9wdGlvbnMgY2hhbmdlIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZVxuICAgIC8vIHBhcnQgYXMgYSBsaXN0ZW5lci5cbiAgICBjb25zdCBzaG91bGRSZW1vdmVMaXN0ZW5lciA9XG4gICAgICAobmV3TGlzdGVuZXIgPT09IG5vdGhpbmcgJiYgb2xkTGlzdGVuZXIgIT09IG5vdGhpbmcpIHx8XG4gICAgICAobmV3TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5jYXB0dXJlICE9PVxuICAgICAgICAob2xkTGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5jYXB0dXJlIHx8XG4gICAgICAobmV3TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5vbmNlICE9PVxuICAgICAgICAob2xkTGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5vbmNlIHx8XG4gICAgICAobmV3TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5wYXNzaXZlICE9PVxuICAgICAgICAob2xkTGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5wYXNzaXZlO1xuXG4gICAgLy8gSWYgdGhlIG5ldyB2YWx1ZSBpcyBub3Qgbm90aGluZyBhbmQgd2UgcmVtb3ZlZCB0aGUgbGlzdGVuZXIsIHdlIGhhdmVcbiAgICAvLyB0byBhZGQgdGhlIHBhcnQgYXMgYSBsaXN0ZW5lci5cbiAgICBjb25zdCBzaG91bGRBZGRMaXN0ZW5lciA9XG4gICAgICBuZXdMaXN0ZW5lciAhPT0gbm90aGluZyAmJlxuICAgICAgKG9sZExpc3RlbmVyID09PSBub3RoaW5nIHx8IHNob3VsZFJlbW92ZUxpc3RlbmVyKTtcblxuICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICBraW5kOiAnY29tbWl0IGV2ZW50IGxpc3RlbmVyJyxcbiAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgIHZhbHVlOiBuZXdMaXN0ZW5lcixcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICByZW1vdmVMaXN0ZW5lcjogc2hvdWxkUmVtb3ZlTGlzdGVuZXIsXG4gICAgICAgIGFkZExpc3RlbmVyOiBzaG91bGRBZGRMaXN0ZW5lcixcbiAgICAgICAgb2xkTGlzdGVuZXIsXG4gICAgICB9KTtcbiAgICBpZiAoc2hvdWxkUmVtb3ZlTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICB0aGlzLm5hbWUsXG4gICAgICAgIHRoaXMsXG4gICAgICAgIG9sZExpc3RlbmVyIGFzIEV2ZW50TGlzdGVuZXJXaXRoT3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHNob3VsZEFkZExpc3RlbmVyKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgdGhpcy5uYW1lLFxuICAgICAgICB0aGlzLFxuICAgICAgICBuZXdMaXN0ZW5lciBhcyBFdmVudExpc3RlbmVyV2l0aE9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IG5ld0xpc3RlbmVyO1xuICB9XG5cbiAgaGFuZGxlRXZlbnQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZS5jYWxsKHRoaXMub3B0aW9ucz8uaG9zdCA/PyB0aGlzLmVsZW1lbnQsIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBFdmVudExpc3RlbmVyT2JqZWN0KS5oYW5kbGVFdmVudChldmVudCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB0eXBlIHtFbGVtZW50UGFydH07XG5jbGFzcyBFbGVtZW50UGFydCBpbXBsZW1lbnRzIERpc2Nvbm5lY3RhYmxlIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEVMRU1FTlRfUEFSVDtcblxuICAvKiogQGludGVybmFsICovXG4gIF9fZGlyZWN0aXZlPzogRGlyZWN0aXZlO1xuXG4gIC8vIFRoaXMgaXMgdG8gZW5zdXJlIHRoYXQgZXZlcnkgUGFydCBoYXMgYSBfJGNvbW1pdHRlZFZhbHVlXG4gIF8kY29tbWl0dGVkVmFsdWU6IHVuZGVmaW5lZDtcblxuICAvKiogQGludGVybmFsICovXG4gIF8kcGFyZW50ITogRGlzY29ubmVjdGFibGU7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJGRpc2Nvbm5lY3RhYmxlQ2hpbGRyZW4/OiBTZXQ8RGlzY29ubmVjdGFibGU+ID0gdW5kZWZpbmVkO1xuXG4gIG9wdGlvbnM6IFJlbmRlck9wdGlvbnMgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnQsXG4gICAgcGFyZW50OiBEaXNjb25uZWN0YWJsZSxcbiAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHRoaXMuXyRwYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIC8vIFNlZSBjb21tZW50IGluIERpc2Nvbm5lY3RhYmxlIGludGVyZmFjZSBmb3Igd2h5IHRoaXMgaXMgYSBnZXR0ZXJcbiAgZ2V0IF8kaXNDb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuXyRwYXJlbnQuXyRpc0Nvbm5lY3RlZDtcbiAgfVxuXG4gIF8kc2V0VmFsdWUodmFsdWU6IHVua25vd24pOiB2b2lkIHtcbiAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAga2luZDogJ2NvbW1pdCB0byBlbGVtZW50IGJpbmRpbmcnLFxuICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICB9KTtcbiAgICByZXNvbHZlRGlyZWN0aXZlKHRoaXMsIHZhbHVlKTtcbiAgfVxufVxuXG4vKipcbiAqIEVORCBVU0VSUyBTSE9VTEQgTk9UIFJFTFkgT04gVEhJUyBPQkpFQ1QuXG4gKlxuICogUHJpdmF0ZSBleHBvcnRzIGZvciB1c2UgYnkgb3RoZXIgTGl0IHBhY2thZ2VzLCBub3QgaW50ZW5kZWQgZm9yIHVzZSBieVxuICogZXh0ZXJuYWwgdXNlcnMuXG4gKlxuICogV2UgY3VycmVudGx5IGRvIG5vdCBtYWtlIGEgbWFuZ2xlZCByb2xsdXAgYnVpbGQgb2YgdGhlIGxpdC1zc3IgY29kZS4gSW4gb3JkZXJcbiAqIHRvIGtlZXAgYSBudW1iZXIgb2YgKG90aGVyd2lzZSBwcml2YXRlKSB0b3AtbGV2ZWwgZXhwb3J0cyBtYW5nbGVkIGluIHRoZVxuICogY2xpZW50IHNpZGUgY29kZSwgd2UgZXhwb3J0IGEgXyRMSCBvYmplY3QgY29udGFpbmluZyB0aG9zZSBtZW1iZXJzIChvclxuICogaGVscGVyIG1ldGhvZHMgZm9yIGFjY2Vzc2luZyBwcml2YXRlIGZpZWxkcyBvZiB0aG9zZSBtZW1iZXJzKSwgYW5kIHRoZW5cbiAqIHJlLWV4cG9ydCB0aGVtIGZvciB1c2UgaW4gbGl0LXNzci4gVGhpcyBrZWVwcyBsaXQtc3NyIGFnbm9zdGljIHRvIHdoZXRoZXIgdGhlXG4gKiBjbGllbnQtc2lkZSBjb2RlIGlzIGJlaW5nIHVzZWQgaW4gYGRldmAgbW9kZSBvciBgcHJvZGAgbW9kZS5cbiAqXG4gKiBUaGlzIGhhcyBhIHVuaXF1ZSBuYW1lLCB0byBkaXNhbWJpZ3VhdGUgaXQgZnJvbSBwcml2YXRlIGV4cG9ydHMgaW5cbiAqIGxpdC1lbGVtZW50LCB3aGljaCByZS1leHBvcnRzIGFsbCBvZiBsaXQtaHRtbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgXyRMSCA9IHtcbiAgLy8gVXNlZCBpbiBsaXQtc3NyXG4gIF9ib3VuZEF0dHJpYnV0ZVN1ZmZpeDogYm91bmRBdHRyaWJ1dGVTdWZmaXgsXG4gIF9tYXJrZXI6IG1hcmtlcixcbiAgX21hcmtlck1hdGNoOiBtYXJrZXJNYXRjaCxcbiAgX0hUTUxfUkVTVUxUOiBIVE1MX1JFU1VMVCxcbiAgX2dldFRlbXBsYXRlSHRtbDogZ2V0VGVtcGxhdGVIdG1sLFxuICAvLyBVc2VkIGluIHRlc3RzIGFuZCBwcml2YXRlLXNzci1zdXBwb3J0XG4gIF9UZW1wbGF0ZUluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlLFxuICBfaXNJdGVyYWJsZTogaXNJdGVyYWJsZSxcbiAgX3Jlc29sdmVEaXJlY3RpdmU6IHJlc29sdmVEaXJlY3RpdmUsXG4gIF9DaGlsZFBhcnQ6IENoaWxkUGFydCxcbiAgX0F0dHJpYnV0ZVBhcnQ6IEF0dHJpYnV0ZVBhcnQsXG4gIF9Cb29sZWFuQXR0cmlidXRlUGFydDogQm9vbGVhbkF0dHJpYnV0ZVBhcnQsXG4gIF9FdmVudFBhcnQ6IEV2ZW50UGFydCxcbiAgX1Byb3BlcnR5UGFydDogUHJvcGVydHlQYXJ0LFxuICBfRWxlbWVudFBhcnQ6IEVsZW1lbnRQYXJ0LFxufTtcblxuLy8gQXBwbHkgcG9seWZpbGxzIGlmIGF2YWlsYWJsZVxuY29uc3QgcG9seWZpbGxTdXBwb3J0ID0gREVWX01PREVcbiAgPyBnbG9iYWwubGl0SHRtbFBvbHlmaWxsU3VwcG9ydERldk1vZGVcbiAgOiBnbG9iYWwubGl0SHRtbFBvbHlmaWxsU3VwcG9ydDtcbnBvbHlmaWxsU3VwcG9ydD8uKFRlbXBsYXRlLCBDaGlsZFBhcnQpO1xuXG4vLyBJTVBPUlRBTlQ6IGRvIG5vdCBjaGFuZ2UgdGhlIHByb3BlcnR5IG5hbWUgb3IgdGhlIGFzc2lnbm1lbnQgZXhwcmVzc2lvbi5cbi8vIFRoaXMgbGluZSB3aWxsIGJlIHVzZWQgaW4gcmVnZXhlcyB0byBzZWFyY2ggZm9yIGxpdC1odG1sIHVzYWdlLlxuKGdsb2JhbC5saXRIdG1sVmVyc2lvbnMgPz89IFtdKS5wdXNoKCczLjMuMicpO1xuaWYgKERFVl9NT0RFICYmIGdsb2JhbC5saXRIdG1sVmVyc2lvbnMubGVuZ3RoID4gMSkge1xuICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgaXNzdWVXYXJuaW5nIShcbiAgICAgICdtdWx0aXBsZS12ZXJzaW9ucycsXG4gICAgICBgTXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0IGxvYWRlZC4gYCArXG4gICAgICAgIGBMb2FkaW5nIG11bHRpcGxlIHZlcnNpb25zIGlzIG5vdCByZWNvbW1lbmRlZC5gXG4gICAgKTtcbiAgfSk7XG59XG5cbi8qKlxuICogUmVuZGVycyBhIHZhbHVlLCB1c3VhbGx5IGEgbGl0LWh0bWwgVGVtcGxhdGVSZXN1bHQsIHRvIHRoZSBjb250YWluZXIuXG4gKlxuICogVGhpcyBleGFtcGxlIHJlbmRlcnMgdGhlIHRleHQgXCJIZWxsbywgWm9lIVwiIGluc2lkZSBhIHBhcmFncmFwaCB0YWcsIGFwcGVuZGluZ1xuICogaXQgdG8gdGhlIGNvbnRhaW5lciBgZG9jdW1lbnQuYm9keWAuXG4gKlxuICogYGBganNcbiAqIGltcG9ydCB7aHRtbCwgcmVuZGVyfSBmcm9tICdsaXQnO1xuICpcbiAqIGNvbnN0IG5hbWUgPSBcIlpvZVwiO1xuICogcmVuZGVyKGh0bWxgPHA+SGVsbG8sICR7bmFtZX0hPC9wPmAsIGRvY3VtZW50LmJvZHkpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHZhbHVlIEFueSBbcmVuZGVyYWJsZVxuICogICB2YWx1ZV0oaHR0cHM6Ly9saXQuZGV2L2RvY3MvdGVtcGxhdGVzL2V4cHJlc3Npb25zLyNjaGlsZC1leHByZXNzaW9ucyksXG4gKiAgIHR5cGljYWxseSBhIHtAbGlua2NvZGUgVGVtcGxhdGVSZXN1bHR9IGNyZWF0ZWQgYnkgZXZhbHVhdGluZyBhIHRlbXBsYXRlIHRhZ1xuICogICBsaWtlIHtAbGlua2NvZGUgaHRtbH0gb3Ige0BsaW5rY29kZSBzdmd9LlxuICogQHBhcmFtIGNvbnRhaW5lciBBIERPTSBjb250YWluZXIgdG8gcmVuZGVyIHRvLiBUaGUgZmlyc3QgcmVuZGVyIHdpbGwgYXBwZW5kXG4gKiAgIHRoZSByZW5kZXJlZCB2YWx1ZSB0byB0aGUgY29udGFpbmVyLCBhbmQgc3Vic2VxdWVudCByZW5kZXJzIHdpbGxcbiAqICAgZWZmaWNpZW50bHkgdXBkYXRlIHRoZSByZW5kZXJlZCB2YWx1ZSBpZiB0aGUgc2FtZSByZXN1bHQgdHlwZSB3YXNcbiAqICAgcHJldmlvdXNseSByZW5kZXJlZCB0aGVyZS5cbiAqIEBwYXJhbSBvcHRpb25zIFNlZSB7QGxpbmtjb2RlIFJlbmRlck9wdGlvbnN9IGZvciBvcHRpb25zIGRvY3VtZW50YXRpb24uXG4gKiBAc2VlXG4gKiB7QGxpbmsgaHR0cHM6Ly9saXQuZGV2L2RvY3MvbGlicmFyaWVzL3N0YW5kYWxvbmUtdGVtcGxhdGVzLyNyZW5kZXJpbmctbGl0LWh0bWwtdGVtcGxhdGVzfCBSZW5kZXJpbmcgTGl0IEhUTUwgVGVtcGxhdGVzfVxuICovXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKFxuICB2YWx1ZTogdW5rbm93bixcbiAgY29udGFpbmVyOiBSZW5kZXJSb290Tm9kZSxcbiAgb3B0aW9ucz86IFJlbmRlck9wdGlvbnNcbik6IFJvb3RQYXJ0ID0+IHtcbiAgaWYgKERFVl9NT0RFICYmIGNvbnRhaW5lciA9PSBudWxsKSB7XG4gICAgLy8gR2l2ZSBhIGNsZWFyZXIgZXJyb3IgbWVzc2FnZSB0aGFuXG4gICAgLy8gICAgIFVuY2F1Z2h0IFR5cGVFcnJvcjogQ2Fubm90IHJlYWQgcHJvcGVydGllcyBvZiBudWxsIChyZWFkaW5nXG4gICAgLy8gICAgICdfJGxpdFBhcnQkJylcbiAgICAvLyB3aGljaCByZWFkcyBsaWtlIGFuIGludGVybmFsIExpdCBlcnJvci5cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgY29udGFpbmVyIHRvIHJlbmRlciBpbnRvIG1heSBub3QgYmUgJHtjb250YWluZXJ9YCk7XG4gIH1cbiAgY29uc3QgcmVuZGVySWQgPSBERVZfTU9ERSA/IGRlYnVnTG9nUmVuZGVySWQrKyA6IDA7XG4gIGNvbnN0IHBhcnRPd25lck5vZGUgPSBvcHRpb25zPy5yZW5kZXJCZWZvcmUgPz8gY29udGFpbmVyO1xuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBsZXQgcGFydDogQ2hpbGRQYXJ0ID0gKHBhcnRPd25lck5vZGUgYXMgYW55KVsnXyRsaXRQYXJ0JCddO1xuICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgZGVidWdMb2dFdmVudCh7XG4gICAgICBraW5kOiAnYmVnaW4gcmVuZGVyJyxcbiAgICAgIGlkOiByZW5kZXJJZCxcbiAgICAgIHZhbHVlLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHBhcnQsXG4gICAgfSk7XG4gIGlmIChwYXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBlbmROb2RlID0gb3B0aW9ucz8ucmVuZGVyQmVmb3JlID8/IG51bGw7XG4gICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIChwYXJ0T3duZXJOb2RlIGFzIGFueSlbJ18kbGl0UGFydCQnXSA9IHBhcnQgPSBuZXcgQ2hpbGRQYXJ0KFxuICAgICAgY29udGFpbmVyLmluc2VydEJlZm9yZShjcmVhdGVNYXJrZXIoKSwgZW5kTm9kZSksXG4gICAgICBlbmROb2RlLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgb3B0aW9ucyA/PyB7fVxuICAgICk7XG4gIH1cbiAgcGFydC5fJHNldFZhbHVlKHZhbHVlKTtcbiAgZGVidWdMb2dFdmVudCAmJlxuICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAga2luZDogJ2VuZCByZW5kZXInLFxuICAgICAgaWQ6IHJlbmRlcklkLFxuICAgICAgdmFsdWUsXG4gICAgICBjb250YWluZXIsXG4gICAgICBvcHRpb25zLFxuICAgICAgcGFydCxcbiAgICB9KTtcbiAgcmV0dXJuIHBhcnQgYXMgUm9vdFBhcnQ7XG59O1xuXG5pZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gIHJlbmRlci5zZXRTYW5pdGl6ZXIgPSBzZXRTYW5pdGl6ZXI7XG4gIHJlbmRlci5jcmVhdGVTYW5pdGl6ZXIgPSBjcmVhdGVTYW5pdGl6ZXI7XG4gIGlmIChERVZfTU9ERSkge1xuICAgIHJlbmRlci5fdGVzdE9ubHlDbGVhclNhbml0aXplckZhY3RvcnlEb05vdENhbGxPckVsc2UgPVxuICAgICAgX3Rlc3RPbmx5Q2xlYXJTYW5pdGl6ZXJGYWN0b3J5RG9Ob3RDYWxsT3JFbHNlO1xuICB9XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8qKlxuICogVGhlIG1haW4gTGl0RWxlbWVudCBtb2R1bGUsIHdoaWNoIGRlZmluZXMgdGhlIHtAbGlua2NvZGUgTGl0RWxlbWVudH0gYmFzZVxuICogY2xhc3MgYW5kIHJlbGF0ZWQgQVBJcy5cbiAqXG4gKiBMaXRFbGVtZW50IGNvbXBvbmVudHMgY2FuIGRlZmluZSBhIHRlbXBsYXRlIGFuZCBhIHNldCBvZiBvYnNlcnZlZFxuICogcHJvcGVydGllcy4gQ2hhbmdpbmcgYW4gb2JzZXJ2ZWQgcHJvcGVydHkgdHJpZ2dlcnMgYSByZS1yZW5kZXIgb2YgdGhlXG4gKiBlbGVtZW50LlxuICpcbiAqIEltcG9ydCB7QGxpbmtjb2RlIExpdEVsZW1lbnR9IGFuZCB7QGxpbmtjb2RlIGh0bWx9IGZyb20gdGhpcyBtb2R1bGUgdG9cbiAqIGNyZWF0ZSBhIGNvbXBvbmVudDpcbiAqXG4gKiAgYGBganNcbiAqIGltcG9ydCB7TGl0RWxlbWVudCwgaHRtbH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuICpcbiAqIGNsYXNzIE15RWxlbWVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICpcbiAqICAgLy8gRGVjbGFyZSBvYnNlcnZlZCBwcm9wZXJ0aWVzXG4gKiAgIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAqICAgICByZXR1cm4ge1xuICogICAgICAgYWRqZWN0aXZlOiB7fVxuICogICAgIH1cbiAqICAgfVxuICpcbiAqICAgY29uc3RydWN0b3IoKSB7XG4gKiAgICAgdGhpcy5hZGplY3RpdmUgPSAnYXdlc29tZSc7XG4gKiAgIH1cbiAqXG4gKiAgIC8vIERlZmluZSB0aGUgZWxlbWVudCdzIHRlbXBsYXRlXG4gKiAgIHJlbmRlcigpIHtcbiAqICAgICByZXR1cm4gaHRtbGA8cD55b3VyICR7YWRqZWN0aXZlfSB0ZW1wbGF0ZSBoZXJlPC9wPmA7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ215LWVsZW1lbnQnLCBNeUVsZW1lbnQpO1xuICogYGBgXG4gKlxuICogYExpdEVsZW1lbnRgIGV4dGVuZHMge0BsaW5rY29kZSBSZWFjdGl2ZUVsZW1lbnR9IGFuZCBhZGRzIGxpdC1odG1sXG4gKiB0ZW1wbGF0aW5nLiBUaGUgYFJlYWN0aXZlRWxlbWVudGAgY2xhc3MgaXMgcHJvdmlkZWQgZm9yIHVzZXJzIHRoYXQgd2FudCB0b1xuICogYnVpbGQgdGhlaXIgb3duIGN1c3RvbSBlbGVtZW50IGJhc2UgY2xhc3NlcyB0aGF0IGRvbid0IHVzZSBsaXQtaHRtbC5cbiAqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuaW1wb3J0IHtQcm9wZXJ0eVZhbHVlcywgUmVhY3RpdmVFbGVtZW50fSBmcm9tICdAbGl0L3JlYWN0aXZlLWVsZW1lbnQnO1xuaW1wb3J0IHtyZW5kZXIsIFJlbmRlck9wdGlvbnMsIG5vQ2hhbmdlLCBSb290UGFydH0gZnJvbSAnbGl0LWh0bWwnO1xuZXhwb3J0ICogZnJvbSAnQGxpdC9yZWFjdGl2ZS1lbGVtZW50JztcbmV4cG9ydCAqIGZyb20gJ2xpdC1odG1sJztcblxuaW1wb3J0IHtMaXRVbnN0YWJsZX0gZnJvbSAnbGl0LWh0bWwnO1xuaW1wb3J0IHtSZWFjdGl2ZVVuc3RhYmxlfSBmcm9tICdAbGl0L3JlYWN0aXZlLWVsZW1lbnQnO1xuXG4vKipcbiAqIENvbnRhaW5zIHR5cGVzIHRoYXQgYXJlIHBhcnQgb2YgdGhlIHVuc3RhYmxlIGRlYnVnIEFQSS5cbiAqXG4gKiBFdmVyeXRoaW5nIGluIHRoaXMgQVBJIGlzIG5vdCBzdGFibGUgYW5kIG1heSBjaGFuZ2Ugb3IgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLFxuICogZXZlbiBvbiBwYXRjaCByZWxlYXNlcy5cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbmV4cG9ydCBuYW1lc3BhY2UgVW5zdGFibGUge1xuICAvKipcbiAgICogV2hlbiBMaXQgaXMgcnVubmluZyBpbiBkZXYgbW9kZSBhbmQgYHdpbmRvdy5lbWl0TGl0RGVidWdMb2dFdmVudHNgIGlzIHRydWUsXG4gICAqIHdlIHdpbGwgZW1pdCAnbGl0LWRlYnVnJyBldmVudHMgdG8gd2luZG93LCB3aXRoIGxpdmUgZGV0YWlscyBhYm91dCB0aGUgdXBkYXRlIGFuZCByZW5kZXJcbiAgICogbGlmZWN5Y2xlLiBUaGVzZSBjYW4gYmUgdXNlZnVsIGZvciB3cml0aW5nIGRlYnVnIHRvb2xpbmcgYW5kIHZpc3VhbGl6YXRpb25zLlxuICAgKlxuICAgKiBQbGVhc2UgYmUgYXdhcmUgdGhhdCBydW5uaW5nIHdpdGggd2luZG93LmVtaXRMaXREZWJ1Z0xvZ0V2ZW50cyBoYXMgcGVyZm9ybWFuY2Ugb3ZlcmhlYWQsXG4gICAqIG1ha2luZyBjZXJ0YWluIG9wZXJhdGlvbnMgdGhhdCBhcmUgbm9ybWFsbHkgdmVyeSBjaGVhcCAobGlrZSBhIG5vLW9wIHJlbmRlcikgbXVjaCBzbG93ZXIsXG4gICAqIGJlY2F1c2Ugd2UgbXVzdCBjb3B5IGRhdGEgYW5kIGRpc3BhdGNoIGV2ZW50cy5cbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXG4gIGV4cG9ydCBuYW1lc3BhY2UgRGVidWdMb2cge1xuICAgIGV4cG9ydCB0eXBlIEVudHJ5ID1cbiAgICAgIHwgTGl0VW5zdGFibGUuRGVidWdMb2cuRW50cnlcbiAgICAgIHwgUmVhY3RpdmVVbnN0YWJsZS5EZWJ1Z0xvZy5FbnRyeTtcbiAgfVxufVxuLypcbiAqIFdoZW4gdXNpbmcgQ2xvc3VyZSBDb21waWxlciwgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eShwcm9wZXJ0eSwgb2JqZWN0KSBpc1xuICogcmVwbGFjZWQgYXQgY29tcGlsZSB0aW1lIGJ5IHRoZSBtdW5nZWQgbmFtZSBmb3Igb2JqZWN0W3Byb3BlcnR5XS4gV2UgY2Fubm90XG4gKiBhbGlhcyB0aGlzIGZ1bmN0aW9uLCBzbyB3ZSBoYXZlIHRvIHVzZSBhIHNtYWxsIHNoaW0gdGhhdCBoYXMgdGhlIHNhbWVcbiAqIGJlaGF2aW9yIHdoZW4gbm90IGNvbXBpbGluZy5cbiAqL1xuLypAX19JTkxJTkVfXyovXG5jb25zdCBKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5ID0gPFAgZXh0ZW5kcyBQcm9wZXJ0eUtleT4oXG4gIHByb3A6IFAsXG4gIF9vYmo6IHVua25vd25cbik6IFAgPT4gcHJvcDtcblxuY29uc3QgREVWX01PREUgPSB0cnVlO1xuLy8gQWxsb3dzIG1pbmlmaWVycyB0byByZW5hbWUgcmVmZXJlbmNlcyB0byBnbG9iYWxUaGlzXG5jb25zdCBnbG9iYWwgPSBnbG9iYWxUaGlzO1xuXG5sZXQgaXNzdWVXYXJuaW5nOiAoY29kZTogc3RyaW5nLCB3YXJuaW5nOiBzdHJpbmcpID0+IHZvaWQ7XG5cbmlmIChERVZfTU9ERSkge1xuICAvLyBFbnN1cmUgd2FybmluZ3MgYXJlIGlzc3VlZCBvbmx5IDF4LCBldmVuIGlmIG11bHRpcGxlIHZlcnNpb25zIG9mIExpdFxuICAvLyBhcmUgbG9hZGVkLlxuICBnbG9iYWwubGl0SXNzdWVkV2FybmluZ3MgPz89IG5ldyBTZXQoKTtcblxuICAvKipcbiAgICogSXNzdWUgYSB3YXJuaW5nIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgYmFzZWQgZWl0aGVyIG9uIGBjb2RlYCBvciBgd2FybmluZ2AuXG4gICAqIFdhcm5pbmdzIGFyZSBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5IG9ubHkgYnkgYHdhcm5pbmdgOyBkaXNhYmxpbmcgdmlhIGBjb2RlYFxuICAgKiBjYW4gYmUgZG9uZSBieSB1c2Vycy5cbiAgICovXG4gIGlzc3VlV2FybmluZyA9IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4ge1xuICAgIHdhcm5pbmcgKz0gYCBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy8ke2NvZGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLmA7XG4gICAgaWYgKFxuICAgICAgIWdsb2JhbC5saXRJc3N1ZWRXYXJuaW5ncyEuaGFzKHdhcm5pbmcpICYmXG4gICAgICAhZ2xvYmFsLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMoY29kZSlcbiAgICApIHtcbiAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbiAgICAgIGdsb2JhbC5saXRJc3N1ZWRXYXJuaW5ncyEuYWRkKHdhcm5pbmcpO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBCYXNlIGVsZW1lbnQgY2xhc3MgdGhhdCBtYW5hZ2VzIGVsZW1lbnQgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlcywgYW5kXG4gKiByZW5kZXJzIGEgbGl0LWh0bWwgdGVtcGxhdGUuXG4gKlxuICogVG8gZGVmaW5lIGEgY29tcG9uZW50LCBzdWJjbGFzcyBgTGl0RWxlbWVudGAgYW5kIGltcGxlbWVudCBhXG4gKiBgcmVuZGVyYCBtZXRob2QgdG8gcHJvdmlkZSB0aGUgY29tcG9uZW50J3MgdGVtcGxhdGUuIERlZmluZSBwcm9wZXJ0aWVzXG4gKiB1c2luZyB0aGUge0BsaW5rY29kZSBMaXRFbGVtZW50LnByb3BlcnRpZXMgcHJvcGVydGllc30gcHJvcGVydHkgb3IgdGhlXG4gKiB7QGxpbmtjb2RlIHByb3BlcnR5fSBkZWNvcmF0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaXRFbGVtZW50IGV4dGVuZHMgUmVhY3RpdmVFbGVtZW50IHtcbiAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgc3RhdGljIFsnXyRsaXRFbGVtZW50JCddID0gdHJ1ZTtcblxuICAvKipcbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcmVhZG9ubHkgcmVuZGVyT3B0aW9uczogUmVuZGVyT3B0aW9ucyA9IHtob3N0OiB0aGlzfTtcblxuICBwcml2YXRlIF9fY2hpbGRQYXJ0OiBSb290UGFydCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGNyZWF0ZVJlbmRlclJvb3QoKSB7XG4gICAgY29uc3QgcmVuZGVyUm9vdCA9IHN1cGVyLmNyZWF0ZVJlbmRlclJvb3QoKTtcbiAgICAvLyBXaGVuIGFkb3B0ZWRTdHlsZVNoZWV0cyBhcmUgc2hpbW1lZCwgdGhleSBhcmUgaW5zZXJ0ZWQgaW50byB0aGVcbiAgICAvLyBzaGFkb3dSb290IGJ5IGNyZWF0ZVJlbmRlclJvb3QuIEFkanVzdCB0aGUgcmVuZGVyQmVmb3JlIG5vZGUgc28gdGhhdFxuICAgIC8vIGFueSBzdHlsZXMgaW4gTGl0IGNvbnRlbnQgcmVuZGVyIGJlZm9yZSBhZG9wdGVkU3R5bGVTaGVldHMuIFRoaXMgaXNcbiAgICAvLyBpbXBvcnRhbnQgc28gdGhhdCBhZG9wdGVkU3R5bGVTaGVldHMgaGF2ZSBwcmVjZWRlbmNlIG92ZXIgc3R5bGVzIGluXG4gICAgLy8gdGhlIHNoYWRvd1Jvb3QuXG4gICAgdGhpcy5yZW5kZXJPcHRpb25zLnJlbmRlckJlZm9yZSA/Pz0gcmVuZGVyUm9vdCEuZmlyc3RDaGlsZCBhcyBDaGlsZE5vZGU7XG4gICAgcmV0dXJuIHJlbmRlclJvb3Q7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZWxlbWVudC4gVGhpcyBtZXRob2QgcmVmbGVjdHMgcHJvcGVydHkgdmFsdWVzIHRvIGF0dHJpYnV0ZXNcbiAgICogYW5kIGNhbGxzIGByZW5kZXJgIHRvIHJlbmRlciBET00gdmlhIGxpdC1odG1sLiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgKm5vdCogdHJpZ2dlciBhbm90aGVyIHVwZGF0ZS5cbiAgICogQHBhcmFtIGNoYW5nZWRQcm9wZXJ0aWVzIE1hcCBvZiBjaGFuZ2VkIHByb3BlcnRpZXMgd2l0aCBvbGQgdmFsdWVzXG4gICAqIEBjYXRlZ29yeSB1cGRhdGVzXG4gICAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzOiBQcm9wZXJ0eVZhbHVlcykge1xuICAgIC8vIFNldHRpbmcgcHJvcGVydGllcyBpbiBgcmVuZGVyYCBzaG91bGQgbm90IHRyaWdnZXIgYW4gdXBkYXRlLiBTaW5jZVxuICAgIC8vIHVwZGF0ZXMgYXJlIGFsbG93ZWQgYWZ0ZXIgc3VwZXIudXBkYXRlLCBpdCdzIGltcG9ydGFudCB0byBjYWxsIGByZW5kZXJgXG4gICAgLy8gYmVmb3JlIHRoYXQuXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnJlbmRlcigpO1xuICAgIGlmICghdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICB0aGlzLnJlbmRlck9wdGlvbnMuaXNDb25uZWN0ZWQgPSB0aGlzLmlzQ29ubmVjdGVkO1xuICAgIH1cbiAgICBzdXBlci51cGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIHRoaXMuX19jaGlsZFBhcnQgPSByZW5kZXIodmFsdWUsIHRoaXMucmVuZGVyUm9vdCwgdGhpcy5yZW5kZXJPcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhZGRlZCB0byB0aGUgZG9jdW1lbnQncyBET00uXG4gICAqXG4gICAqIEluIGBjb25uZWN0ZWRDYWxsYmFjaygpYCB5b3Ugc2hvdWxkIHNldHVwIHRhc2tzIHRoYXQgc2hvdWxkIG9ubHkgb2NjdXIgd2hlblxuICAgKiB0aGUgZWxlbWVudCBpcyBjb25uZWN0ZWQgdG8gdGhlIGRvY3VtZW50LiBUaGUgbW9zdCBjb21tb24gb2YgdGhlc2UgaXNcbiAgICogYWRkaW5nIGV2ZW50IGxpc3RlbmVycyB0byBub2RlcyBleHRlcm5hbCB0byB0aGUgZWxlbWVudCwgbGlrZSBhIGtleWRvd25cbiAgICogZXZlbnQgaGFuZGxlciBhZGRlZCB0byB0aGUgd2luZG93LlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICogICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgKiAgIGFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlkb3duKTtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogVHlwaWNhbGx5LCBhbnl0aGluZyBkb25lIGluIGBjb25uZWN0ZWRDYWxsYmFjaygpYCBzaG91bGQgYmUgdW5kb25lIHdoZW4gdGhlXG4gICAqIGVsZW1lbnQgaXMgZGlzY29ubmVjdGVkLCBpbiBgZGlzY29ubmVjdGVkQ2FsbGJhY2soKWAuXG4gICAqXG4gICAqIEBjYXRlZ29yeSBsaWZlY3ljbGVcbiAgICovXG4gIG92ZXJyaWRlIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5fX2NoaWxkUGFydD8uc2V0Q29ubmVjdGVkKHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIHJlbW92ZWQgZnJvbSB0aGUgZG9jdW1lbnQncyBET00uXG4gICAqXG4gICAqIFRoaXMgY2FsbGJhY2sgaXMgdGhlIG1haW4gc2lnbmFsIHRvIHRoZSBlbGVtZW50IHRoYXQgaXQgbWF5IG5vIGxvbmdlciBiZVxuICAgKiB1c2VkLiBgZGlzY29ubmVjdGVkQ2FsbGJhY2soKWAgc2hvdWxkIGVuc3VyZSB0aGF0IG5vdGhpbmcgaXMgaG9sZGluZyBhXG4gICAqIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCAoc3VjaCBhcyBldmVudCBsaXN0ZW5lcnMgYWRkZWQgdG8gbm9kZXMgZXh0ZXJuYWxcbiAgICogdG8gdGhlIGVsZW1lbnQpLCBzbyB0aGF0IGl0IGlzIGZyZWUgdG8gYmUgZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgKiAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAqICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlkb3duKTtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQW4gZWxlbWVudCBtYXkgYmUgcmUtY29ubmVjdGVkIGFmdGVyIGJlaW5nIGRpc2Nvbm5lY3RlZC5cbiAgICpcbiAgICogQGNhdGVnb3J5IGxpZmVjeWNsZVxuICAgKi9cbiAgb3ZlcnJpZGUgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9fY2hpbGRQYXJ0Py5zZXRDb25uZWN0ZWQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludm9rZWQgb24gZWFjaCB1cGRhdGUgdG8gcGVyZm9ybSByZW5kZXJpbmcgdGFza3MuIFRoaXMgbWV0aG9kIG1heSByZXR1cm5cbiAgICogYW55IHZhbHVlIHJlbmRlcmFibGUgYnkgbGl0LWh0bWwncyBgQ2hpbGRQYXJ0YCAtIHR5cGljYWxseSBhXG4gICAqIGBUZW1wbGF0ZVJlc3VsdGAuIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCAqbm90KiB0cmlnZ2VyXG4gICAqIHRoZSBlbGVtZW50IHRvIHVwZGF0ZS5cbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlbmRlcigpOiB1bmtub3duIHtcbiAgICByZXR1cm4gbm9DaGFuZ2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhpcyBjbGFzcyBpcyBtYXJrZWQgYXMgYGZpbmFsaXplZGAgYXMgYW4gb3B0aW1pemF0aW9uIGVuc3VyaW5nXG4gKiBpdCB3aWxsIG5vdCBuZWVkbGVzc2x5IHRyeSB0byBgZmluYWxpemVgLlxuICpcbiAqIE5vdGUgdGhpcyBwcm9wZXJ0eSBuYW1lIGlzIGEgc3RyaW5nIHRvIHByZXZlbnQgYnJlYWtpbmcgQ2xvc3VyZSBKUyBDb21waWxlclxuICogb3B0aW1pemF0aW9ucy4gU2VlIEBsaXQvcmVhY3RpdmUtZWxlbWVudCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqL1xuKExpdEVsZW1lbnQgYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilbXG4gIEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkoJ2ZpbmFsaXplZCcsIExpdEVsZW1lbnQpXG5dID0gdHJ1ZTtcblxuLy8gSW5zdGFsbCBoeWRyYXRpb24gaWYgYXZhaWxhYmxlXG5nbG9iYWwubGl0RWxlbWVudEh5ZHJhdGVTdXBwb3J0Py4oe0xpdEVsZW1lbnR9KTtcblxuLy8gQXBwbHkgcG9seWZpbGxzIGlmIGF2YWlsYWJsZVxuY29uc3QgcG9seWZpbGxTdXBwb3J0ID0gREVWX01PREVcbiAgPyBnbG9iYWwubGl0RWxlbWVudFBvbHlmaWxsU3VwcG9ydERldk1vZGVcbiAgOiBnbG9iYWwubGl0RWxlbWVudFBvbHlmaWxsU3VwcG9ydDtcbnBvbHlmaWxsU3VwcG9ydD8uKHtMaXRFbGVtZW50fSk7XG5cbi8qKlxuICogRU5EIFVTRVJTIFNIT1VMRCBOT1QgUkVMWSBPTiBUSElTIE9CSkVDVC5cbiAqXG4gKiBQcml2YXRlIGV4cG9ydHMgZm9yIHVzZSBieSBvdGhlciBMaXQgcGFja2FnZXMsIG5vdCBpbnRlbmRlZCBmb3IgdXNlIGJ5XG4gKiBleHRlcm5hbCB1c2Vycy5cbiAqXG4gKiBXZSBjdXJyZW50bHkgZG8gbm90IG1ha2UgYSBtYW5nbGVkIHJvbGx1cCBidWlsZCBvZiB0aGUgbGl0LXNzciBjb2RlLiBJbiBvcmRlclxuICogdG8ga2VlcCBhIG51bWJlciBvZiAob3RoZXJ3aXNlIHByaXZhdGUpIHRvcC1sZXZlbCBleHBvcnRzICBtYW5nbGVkIGluIHRoZVxuICogY2xpZW50IHNpZGUgY29kZSwgd2UgZXhwb3J0IGEgXyRMRSBvYmplY3QgY29udGFpbmluZyB0aG9zZSBtZW1iZXJzIChvclxuICogaGVscGVyIG1ldGhvZHMgZm9yIGFjY2Vzc2luZyBwcml2YXRlIGZpZWxkcyBvZiB0aG9zZSBtZW1iZXJzKSwgYW5kIHRoZW5cbiAqIHJlLWV4cG9ydCB0aGVtIGZvciB1c2UgaW4gbGl0LXNzci4gVGhpcyBrZWVwcyBsaXQtc3NyIGFnbm9zdGljIHRvIHdoZXRoZXIgdGhlXG4gKiBjbGllbnQtc2lkZSBjb2RlIGlzIGJlaW5nIHVzZWQgaW4gYGRldmAgbW9kZSBvciBgcHJvZGAgbW9kZS5cbiAqXG4gKiBUaGlzIGhhcyBhIHVuaXF1ZSBuYW1lLCB0byBkaXNhbWJpZ3VhdGUgaXQgZnJvbSBwcml2YXRlIGV4cG9ydHMgaW5cbiAqIGxpdC1odG1sLCBzaW5jZSB0aGlzIG1vZHVsZSByZS1leHBvcnRzIGFsbCBvZiBsaXQtaHRtbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgXyRMRSA9IHtcbiAgXyRhdHRyaWJ1dGVUb1Byb3BlcnR5OiAoXG4gICAgZWw6IExpdEVsZW1lbnQsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHZhbHVlOiBzdHJpbmcgfCBudWxsXG4gICkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIChlbCBhcyBhbnkpLl8kYXR0cmlidXRlVG9Qcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4gIH0sXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBfJGNoYW5nZWRQcm9wZXJ0aWVzOiAoZWw6IExpdEVsZW1lbnQpID0+IChlbCBhcyBhbnkpLl8kY2hhbmdlZFByb3BlcnRpZXMsXG59O1xuXG4vLyBJTVBPUlRBTlQ6IGRvIG5vdCBjaGFuZ2UgdGhlIHByb3BlcnR5IG5hbWUgb3IgdGhlIGFzc2lnbm1lbnQgZXhwcmVzc2lvbi5cbi8vIFRoaXMgbGluZSB3aWxsIGJlIHVzZWQgaW4gcmVnZXhlcyB0byBzZWFyY2ggZm9yIExpdEVsZW1lbnQgdXNhZ2UuXG4oZ2xvYmFsLmxpdEVsZW1lbnRWZXJzaW9ucyA/Pz0gW10pLnB1c2goJzQuMi4yJyk7XG5pZiAoREVWX01PREUgJiYgZ2xvYmFsLmxpdEVsZW1lbnRWZXJzaW9ucy5sZW5ndGggPiAxKSB7XG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBpc3N1ZVdhcm5pbmchKFxuICAgICAgJ211bHRpcGxlLXZlcnNpb25zJyxcbiAgICAgIGBNdWx0aXBsZSB2ZXJzaW9ucyBvZiBMaXQgbG9hZGVkLiBMb2FkaW5nIG11bHRpcGxlIHZlcnNpb25zIGAgK1xuICAgICAgICBgaXMgbm90IHJlY29tbWVuZGVkLmBcbiAgICApO1xuICB9KTtcbn1cbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMiBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKlxuICogVGhpcyBmaWxlIGV4cG9ydHMgYSBib29sZWFuIGNvbnN0IHdob3NlIHZhbHVlIHdpbGwgZGVwZW5kIG9uIHdoYXQgZW52aXJvbm1lbnRcbiAqIHRoZSBtb2R1bGUgaXMgYmVpbmcgaW1wb3J0ZWQgZnJvbS5cbiAqL1xuXG5jb25zdCBOT0RFX01PREUgPSBmYWxzZTtcblxuLyoqXG4gKiBBIGJvb2xlYW4gdGhhdCB3aWxsIGJlIGB0cnVlYCBpbiBzZXJ2ZXIgZW52aXJvbm1lbnRzIGxpa2UgTm9kZSwgYW5kIGBmYWxzZWBcbiAqIGluIGJyb3dzZXIgZW52aXJvbm1lbnRzLiBOb3RlIHRoYXQgeW91ciBzZXJ2ZXIgZW52aXJvbm1lbnQgb3IgdG9vbGNoYWluIG11c3RcbiAqIHN1cHBvcnQgdGhlIGBcIm5vZGVcImAgZXhwb3J0IGNvbmRpdGlvbiBmb3IgdGhpcyB0byBiZSBgdHJ1ZWAuXG4gKlxuICogVGhpcyBjYW4gYmUgdXNlZCB3aGVuIGF1dGhvcmluZyBjb21wb25lbnRzIHRvIGNoYW5nZSBiZWhhdmlvciBiYXNlZCBvblxuICogd2hldGhlciBvciBub3QgdGhlIGNvbXBvbmVudCBpcyBleGVjdXRpbmcgaW4gYW4gU1NSIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NlcnZlciA9IE5PREVfTU9ERTtcbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuLypcbiAqIElNUE9SVEFOVDogRm9yIGNvbXBhdGliaWxpdHkgd2l0aCB0c2lja2xlIGFuZCB0aGUgQ2xvc3VyZSBKUyBjb21waWxlciwgYWxsXG4gKiBwcm9wZXJ0eSBkZWNvcmF0b3JzIChidXQgbm90IGNsYXNzIGRlY29yYXRvcnMpIGluIHRoaXMgZmlsZSB0aGF0IGhhdmVcbiAqIGFuIEBFeHBvcnREZWNvcmF0ZWRJdGVtcyBhbm5vdGF0aW9uIG11c3QgYmUgZGVmaW5lZCBhcyBhIHJlZ3VsYXIgZnVuY3Rpb24sXG4gKiBub3QgYW4gYXJyb3cgZnVuY3Rpb24uXG4gKi9cblxuaW1wb3J0IHR5cGUge0NvbnN0cnVjdG9yfSBmcm9tICcuL2Jhc2UuanMnO1xuXG4vKipcbiAqIEFsbG93IGZvciBjdXN0b20gZWxlbWVudCBjbGFzc2VzIHdpdGggcHJpdmF0ZSBjb25zdHJ1Y3RvcnNcbiAqL1xudHlwZSBDdXN0b21FbGVtZW50Q2xhc3MgPSBPbWl0PHR5cGVvZiBIVE1MRWxlbWVudCwgJ25ldyc+O1xuXG5leHBvcnQgdHlwZSBDdXN0b21FbGVtZW50RGVjb3JhdG9yID0ge1xuICAvLyBsZWdhY3lcbiAgKGNsczogQ3VzdG9tRWxlbWVudENsYXNzKTogdm9pZDtcblxuICAvLyBzdGFuZGFyZFxuICAoXG4gICAgdGFyZ2V0OiBDdXN0b21FbGVtZW50Q2xhc3MsXG4gICAgY29udGV4dDogQ2xhc3NEZWNvcmF0b3JDb250ZXh0PENvbnN0cnVjdG9yPEhUTUxFbGVtZW50Pj5cbiAgKTogdm9pZDtcbn07XG5cbi8qKlxuICogQ2xhc3MgZGVjb3JhdG9yIGZhY3RvcnkgdGhhdCBkZWZpbmVzIHRoZSBkZWNvcmF0ZWQgY2xhc3MgYXMgYSBjdXN0b20gZWxlbWVudC5cbiAqXG4gKiBgYGBqc1xuICogQGN1c3RvbUVsZW1lbnQoJ215LWVsZW1lbnQnKVxuICogY2xhc3MgTXlFbGVtZW50IGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gKiAgIHJlbmRlcigpIHtcbiAqICAgICByZXR1cm4gaHRtbGBgO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqIEBwYXJhbSB0YWdOYW1lIFRoZSB0YWcgbmFtZSBvZiB0aGUgY3VzdG9tIGVsZW1lbnQgdG8gZGVmaW5lLlxuICovXG5leHBvcnQgY29uc3QgY3VzdG9tRWxlbWVudCA9XG4gICh0YWdOYW1lOiBzdHJpbmcpOiBDdXN0b21FbGVtZW50RGVjb3JhdG9yID0+XG4gIChcbiAgICBjbGFzc09yVGFyZ2V0OiBDdXN0b21FbGVtZW50Q2xhc3MgfCBDb25zdHJ1Y3RvcjxIVE1MRWxlbWVudD4sXG4gICAgY29udGV4dD86IENsYXNzRGVjb3JhdG9yQ29udGV4dDxDb25zdHJ1Y3RvcjxIVE1MRWxlbWVudD4+XG4gICkgPT4ge1xuICAgIGlmIChjb250ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIoKCkgPT4ge1xuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXG4gICAgICAgICAgdGFnTmFtZSxcbiAgICAgICAgICBjbGFzc09yVGFyZ2V0IGFzIEN1c3RvbUVsZW1lbnRDb25zdHJ1Y3RvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSh0YWdOYW1lLCBjbGFzc09yVGFyZ2V0IGFzIEN1c3RvbUVsZW1lbnRDb25zdHJ1Y3Rvcik7XG4gICAgfVxuICB9O1xuIiwgIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuXG4vKlxuICogSU1QT1JUQU5UOiBGb3IgY29tcGF0aWJpbGl0eSB3aXRoIHRzaWNrbGUgYW5kIHRoZSBDbG9zdXJlIEpTIGNvbXBpbGVyLCBhbGxcbiAqIHByb3BlcnR5IGRlY29yYXRvcnMgKGJ1dCBub3QgY2xhc3MgZGVjb3JhdG9ycykgaW4gdGhpcyBmaWxlIHRoYXQgaGF2ZVxuICogYW4gQEV4cG9ydERlY29yYXRlZEl0ZW1zIGFubm90YXRpb24gbXVzdCBiZSBkZWZpbmVkIGFzIGEgcmVndWxhciBmdW5jdGlvbixcbiAqIG5vdCBhbiBhcnJvdyBmdW5jdGlvbi5cbiAqL1xuXG5pbXBvcnQge1xuICB0eXBlIFByb3BlcnR5RGVjbGFyYXRpb24sXG4gIHR5cGUgUmVhY3RpdmVFbGVtZW50LFxuICBkZWZhdWx0Q29udmVydGVyLFxuICBub3RFcXVhbCxcbn0gZnJvbSAnLi4vcmVhY3RpdmUtZWxlbWVudC5qcyc7XG5pbXBvcnQgdHlwZSB7SW50ZXJmYWNlfSBmcm9tICcuL2Jhc2UuanMnO1xuXG5jb25zdCBERVZfTU9ERSA9IHRydWU7XG5cbmxldCBpc3N1ZVdhcm5pbmc6IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4gdm9pZDtcblxuaWYgKERFVl9NT0RFKSB7XG4gIC8vIEVuc3VyZSB3YXJuaW5ncyBhcmUgaXNzdWVkIG9ubHkgMXgsIGV2ZW4gaWYgbXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0XG4gIC8vIGFyZSBsb2FkZWQuXG4gIGdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MgPz89IG5ldyBTZXQoKTtcblxuICAvKipcbiAgICogSXNzdWUgYSB3YXJuaW5nIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgYmFzZWQgZWl0aGVyIG9uIGBjb2RlYCBvciBgd2FybmluZ2AuXG4gICAqIFdhcm5pbmdzIGFyZSBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5IG9ubHkgYnkgYHdhcm5pbmdgOyBkaXNhYmxpbmcgdmlhIGBjb2RlYFxuICAgKiBjYW4gYmUgZG9uZSBieSB1c2Vycy5cbiAgICovXG4gIGlzc3VlV2FybmluZyA9IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4ge1xuICAgIHdhcm5pbmcgKz0gYCBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy8ke2NvZGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLmA7XG4gICAgaWYgKFxuICAgICAgIWdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MhLmhhcyh3YXJuaW5nKSAmJlxuICAgICAgIWdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MhLmhhcyhjb2RlKVxuICAgICkge1xuICAgICAgY29uc29sZS53YXJuKHdhcm5pbmcpO1xuICAgICAgZ2xvYmFsVGhpcy5saXRJc3N1ZWRXYXJuaW5ncyEuYWRkKHdhcm5pbmcpO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gT3ZlcmxvYWRzIGZvciBwcm9wZXJ0eSBkZWNvcmF0b3Igc28gdGhhdCBUeXBlU2NyaXB0IGNhbiBpbmZlciB0aGUgY29ycmVjdFxuLy8gcmV0dXJuIHR5cGUgd2hlbiBhIGRlY29yYXRvciBpcyB1c2VkIGFzIGFuIGFjY2Vzc29yIGRlY29yYXRvciBvciBhIHNldHRlclxuLy8gZGVjb3JhdG9yLlxuZXhwb3J0IHR5cGUgUHJvcGVydHlEZWNvcmF0b3IgPSB7XG4gIC8vIGFjY2Vzc29yIGRlY29yYXRvciBzaWduYXR1cmVcbiAgPEMgZXh0ZW5kcyBJbnRlcmZhY2U8UmVhY3RpdmVFbGVtZW50PiwgVj4oXG4gICAgdGFyZ2V0OiBDbGFzc0FjY2Vzc29yRGVjb3JhdG9yVGFyZ2V0PEMsIFY+LFxuICAgIGNvbnRleHQ6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gICk6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JSZXN1bHQ8QywgVj47XG5cbiAgLy8gc2V0dGVyIGRlY29yYXRvciBzaWduYXR1cmVcbiAgPEMgZXh0ZW5kcyBJbnRlcmZhY2U8UmVhY3RpdmVFbGVtZW50PiwgVj4oXG4gICAgdGFyZ2V0OiAodmFsdWU6IFYpID0+IHZvaWQsXG4gICAgY29udGV4dDogQ2xhc3NTZXR0ZXJEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gICk6ICh0aGlzOiBDLCB2YWx1ZTogVikgPT4gdm9pZDtcblxuICAvLyBsZWdhY3kgZGVjb3JhdG9yIHNpZ25hdHVyZVxuICAoXG4gICAgcHJvdG9PckRlc2NyaXB0b3I6IE9iamVjdCxcbiAgICBuYW1lOiBQcm9wZXJ0eUtleSxcbiAgICBkZXNjcmlwdG9yPzogUHJvcGVydHlEZXNjcmlwdG9yXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgKTogYW55O1xufTtcblxuY29uc3QgbGVnYWN5UHJvcGVydHkgPSAoXG4gIG9wdGlvbnM6IFByb3BlcnR5RGVjbGFyYXRpb24gfCB1bmRlZmluZWQsXG4gIHByb3RvOiBPYmplY3QsXG4gIG5hbWU6IFByb3BlcnR5S2V5XG4pID0+IHtcbiAgY29uc3QgaGFzT3duUHJvcGVydHkgPSBwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgKHByb3RvLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpLmNyZWF0ZVByb3BlcnR5KG5hbWUsIG9wdGlvbnMpO1xuICAvLyBGb3IgYWNjZXNzb3JzICh3aGljaCBoYXZlIGEgZGVzY3JpcHRvciBvbiB0aGUgcHJvdG90eXBlKSB3ZSBuZWVkIHRvXG4gIC8vIHJldHVybiBhIGRlc2NyaXB0b3IsIG90aGVyd2lzZSBUeXBlU2NyaXB0IG92ZXJ3cml0ZXMgdGhlIGRlc2NyaXB0b3Igd2VcbiAgLy8gZGVmaW5lIGluIGNyZWF0ZVByb3BlcnR5KCkgd2l0aCB0aGUgb3JpZ2luYWwgZGVzY3JpcHRvci4gV2UgZG9uJ3QgZG8gdGhpc1xuICAvLyBmb3IgZmllbGRzLCB3aGljaCBkb24ndCBoYXZlIGEgZGVzY3JpcHRvciwgYmVjYXVzZSB0aGlzIGNvdWxkIG92ZXJ3cml0ZVxuICAvLyBkZXNjcmlwdG9yIGRlZmluZWQgYnkgb3RoZXIgZGVjb3JhdG9ycy5cbiAgcmV0dXJuIGhhc093blByb3BlcnR5XG4gICAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBuYW1lKVxuICAgIDogdW5kZWZpbmVkO1xufTtcblxuLy8gVGhpcyBpcyBkdXBsaWNhdGVkIGZyb20gYSBzaW1pbGFyIHZhcmlhYmxlIGluIHJlYWN0aXZlLWVsZW1lbnQudHMsIGJ1dFxuLy8gYWN0dWFsbHkgbWFrZXMgc2Vuc2UgdG8gaGF2ZSB0aGlzIGRlZmF1bHQgZGVmaW5lZCB3aXRoIHRoZSBkZWNvcmF0b3IsIHNvXG4vLyB0aGF0IGRpZmZlcmVudCBkZWNvcmF0b3JzIGNvdWxkIGhhdmUgZGlmZmVyZW50IGRlZmF1bHRzLlxuY29uc3QgZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb246IFByb3BlcnR5RGVjbGFyYXRpb24gPSB7XG4gIGF0dHJpYnV0ZTogdHJ1ZSxcbiAgdHlwZTogU3RyaW5nLFxuICBjb252ZXJ0ZXI6IGRlZmF1bHRDb252ZXJ0ZXIsXG4gIHJlZmxlY3Q6IGZhbHNlLFxuICBoYXNDaGFuZ2VkOiBub3RFcXVhbCxcbn07XG5cbi8vIFRlbXBvcmFyeSB0eXBlLCB1bnRpbCBnb29nbGUzIGlzIG9uIFR5cGVTY3JpcHQgNS4yXG50eXBlIFN0YW5kYXJkUHJvcGVydHlDb250ZXh0PEMsIFY+ID0gKFxuICB8IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gIHwgQ2xhc3NTZXR0ZXJEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4pICYge21ldGFkYXRhOiBvYmplY3R9O1xuXG4vKipcbiAqIFdyYXBzIGEgY2xhc3MgYWNjZXNzb3Igb3Igc2V0dGVyIHNvIHRoYXQgYHJlcXVlc3RVcGRhdGUoKWAgaXMgY2FsbGVkIHdpdGggdGhlXG4gKiBwcm9wZXJ0eSBuYW1lIGFuZCBvbGQgdmFsdWUgd2hlbiB0aGUgYWNjZXNzb3IgaXMgc2V0LlxuICovXG5leHBvcnQgY29uc3Qgc3RhbmRhcmRQcm9wZXJ0eSA9IDxDIGV4dGVuZHMgSW50ZXJmYWNlPFJlYWN0aXZlRWxlbWVudD4sIFY+KFxuICBvcHRpb25zOiBQcm9wZXJ0eURlY2xhcmF0aW9uID0gZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb24sXG4gIHRhcmdldDogQ2xhc3NBY2Nlc3NvckRlY29yYXRvclRhcmdldDxDLCBWPiB8ICgodmFsdWU6IFYpID0+IHZvaWQpLFxuICBjb250ZXh0OiBTdGFuZGFyZFByb3BlcnR5Q29udGV4dDxDLCBWPlxuKTogQ2xhc3NBY2Nlc3NvckRlY29yYXRvclJlc3VsdDxDLCBWPiB8ICgodGhpczogQywgdmFsdWU6IFYpID0+IHZvaWQpID0+IHtcbiAgY29uc3Qge2tpbmQsIG1ldGFkYXRhfSA9IGNvbnRleHQ7XG5cbiAgaWYgKERFVl9NT0RFICYmIG1ldGFkYXRhID09IG51bGwpIHtcbiAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAnbWlzc2luZy1jbGFzcy1tZXRhZGF0YScsXG4gICAgICBgVGhlIGNsYXNzICR7dGFyZ2V0fSBpcyBtaXNzaW5nIGRlY29yYXRvciBtZXRhZGF0YS4gVGhpcyBgICtcbiAgICAgICAgYGNvdWxkIG1lYW4gdGhhdCB5b3UncmUgdXNpbmcgYSBjb21waWxlciB0aGF0IHN1cHBvcnRzIGRlY29yYXRvcnMgYCArXG4gICAgICAgIGBidXQgZG9lc24ndCBzdXBwb3J0IGRlY29yYXRvciBtZXRhZGF0YSwgc3VjaCBhcyBUeXBlU2NyaXB0IDUuMS4gYCArXG4gICAgICAgIGBQbGVhc2UgdXBkYXRlIHlvdXIgY29tcGlsZXIuYFxuICAgICk7XG4gIH1cblxuICAvLyBTdG9yZSB0aGUgcHJvcGVydHkgb3B0aW9uc1xuICBsZXQgcHJvcGVydGllcyA9IGdsb2JhbFRoaXMubGl0UHJvcGVydHlNZXRhZGF0YS5nZXQobWV0YWRhdGEpO1xuICBpZiAocHJvcGVydGllcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZ2xvYmFsVGhpcy5saXRQcm9wZXJ0eU1ldGFkYXRhLnNldChtZXRhZGF0YSwgKHByb3BlcnRpZXMgPSBuZXcgTWFwKCkpKTtcbiAgfVxuICBpZiAoa2luZCA9PT0gJ3NldHRlcicpIHtcbiAgICBvcHRpb25zID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zKTtcbiAgICBvcHRpb25zLndyYXBwZWQgPSB0cnVlO1xuICB9XG4gIHByb3BlcnRpZXMuc2V0KGNvbnRleHQubmFtZSwgb3B0aW9ucyk7XG5cbiAgaWYgKGtpbmQgPT09ICdhY2Nlc3NvcicpIHtcbiAgICAvLyBTdGFuZGFyZCBkZWNvcmF0b3JzIGNhbm5vdCBkeW5hbWljYWxseSBtb2RpZnkgdGhlIGNsYXNzLCBzbyB3ZSBjYW4ndFxuICAgIC8vIHJlcGxhY2UgYSBmaWVsZCB3aXRoIGFjY2Vzc29ycy4gVGhlIHVzZXIgbXVzdCB1c2UgdGhlIG5ldyBgYWNjZXNzb3JgXG4gICAgLy8ga2V5d29yZCBpbnN0ZWFkLlxuICAgIGNvbnN0IHtuYW1lfSA9IGNvbnRleHQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldCh0aGlzOiBSZWFjdGl2ZUVsZW1lbnQsIHY6IFYpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSAoXG4gICAgICAgICAgdGFyZ2V0IGFzIENsYXNzQWNjZXNzb3JEZWNvcmF0b3JUYXJnZXQ8QywgVj5cbiAgICAgICAgKS5nZXQuY2FsbCh0aGlzIGFzIHVua25vd24gYXMgQyk7XG4gICAgICAgICh0YXJnZXQgYXMgQ2xhc3NBY2Nlc3NvckRlY29yYXRvclRhcmdldDxDLCBWPikuc2V0LmNhbGwoXG4gICAgICAgICAgdGhpcyBhcyB1bmtub3duIGFzIEMsXG4gICAgICAgICAgdlxuICAgICAgICApO1xuICAgICAgICB0aGlzLnJlcXVlc3RVcGRhdGUobmFtZSwgb2xkVmFsdWUsIG9wdGlvbnMsIHRydWUsIHYpO1xuICAgICAgfSxcbiAgICAgIGluaXQodGhpczogUmVhY3RpdmVFbGVtZW50LCB2OiBWKTogViB7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLl8kY2hhbmdlUHJvcGVydHkobmFtZSwgdW5kZWZpbmVkLCBvcHRpb25zLCB2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH0sXG4gICAgfSBhcyB1bmtub3duIGFzIENsYXNzQWNjZXNzb3JEZWNvcmF0b3JSZXN1bHQ8QywgVj47XG4gIH0gZWxzZSBpZiAoa2luZCA9PT0gJ3NldHRlcicpIHtcbiAgICBjb25zdCB7bmFtZX0gPSBjb250ZXh0O1xuICAgIHJldHVybiBmdW5jdGlvbiAodGhpczogUmVhY3RpdmVFbGVtZW50LCB2YWx1ZTogVikge1xuICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzW25hbWUgYXMga2V5b2YgUmVhY3RpdmVFbGVtZW50XTtcbiAgICAgICh0YXJnZXQgYXMgKHZhbHVlOiBWKSA9PiB2b2lkKS5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgIHRoaXMucmVxdWVzdFVwZGF0ZShuYW1lLCBvbGRWYWx1ZSwgb3B0aW9ucywgdHJ1ZSwgdmFsdWUpO1xuICAgIH0gYXMgdW5rbm93biBhcyAodGhpczogQywgdmFsdWU6IFYpID0+IHZvaWQ7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBkZWNvcmF0b3IgbG9jYXRpb246ICR7a2luZH1gKTtcbn07XG5cbi8qKlxuICogQSBjbGFzcyBmaWVsZCBvciBhY2Nlc3NvciBkZWNvcmF0b3Igd2hpY2ggY3JlYXRlcyBhIHJlYWN0aXZlIHByb3BlcnR5IHRoYXRcbiAqIHJlZmxlY3RzIGEgY29ycmVzcG9uZGluZyBhdHRyaWJ1dGUgdmFsdWUuIFdoZW4gYSBkZWNvcmF0ZWQgcHJvcGVydHkgaXMgc2V0XG4gKiB0aGUgZWxlbWVudCB3aWxsIHVwZGF0ZSBhbmQgcmVuZGVyLiBBIHtAbGlua2NvZGUgUHJvcGVydHlEZWNsYXJhdGlvbn0gbWF5XG4gKiBvcHRpb25hbGx5IGJlIHN1cHBsaWVkIHRvIGNvbmZpZ3VyZSBwcm9wZXJ0eSBmZWF0dXJlcy5cbiAqXG4gKiBUaGlzIGRlY29yYXRvciBzaG91bGQgb25seSBiZSB1c2VkIGZvciBwdWJsaWMgZmllbGRzLiBBcyBwdWJsaWMgZmllbGRzLFxuICogcHJvcGVydGllcyBzaG91bGQgYmUgY29uc2lkZXJlZCBhcyBwcmltYXJpbHkgc2V0dGFibGUgYnkgZWxlbWVudCB1c2VycyxcbiAqIGVpdGhlciB2aWEgYXR0cmlidXRlIG9yIHRoZSBwcm9wZXJ0eSBpdHNlbGYuXG4gKlxuICogR2VuZXJhbGx5LCBwcm9wZXJ0aWVzIHRoYXQgYXJlIGNoYW5nZWQgYnkgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIHByaXZhdGUgb3JcbiAqIHByb3RlY3RlZCBmaWVsZHMgYW5kIHNob3VsZCB1c2UgdGhlIHtAbGlua2NvZGUgc3RhdGV9IGRlY29yYXRvci5cbiAqXG4gKiBIb3dldmVyLCBzb21ldGltZXMgZWxlbWVudCBjb2RlIGRvZXMgbmVlZCB0byBzZXQgYSBwdWJsaWMgcHJvcGVydHkuIFRoaXNcbiAqIHNob3VsZCB0eXBpY2FsbHkgb25seSBiZSBkb25lIGluIHJlc3BvbnNlIHRvIHVzZXIgaW50ZXJhY3Rpb24sIGFuZCBhbiBldmVudFxuICogc2hvdWxkIGJlIGZpcmVkIGluZm9ybWluZyB0aGUgdXNlcjsgZm9yIGV4YW1wbGUsIGEgY2hlY2tib3ggc2V0cyBpdHNcbiAqIGBjaGVja2VkYCBwcm9wZXJ0eSB3aGVuIGNsaWNrZWQgYW5kIGZpcmVzIGEgYGNoYW5nZWRgIGV2ZW50LiBNdXRhdGluZyBwdWJsaWNcbiAqIHByb3BlcnRpZXMgc2hvdWxkIHR5cGljYWxseSBub3QgYmUgZG9uZSBmb3Igbm9uLXByaW1pdGl2ZSAob2JqZWN0IG9yIGFycmF5KVxuICogcHJvcGVydGllcy4gSW4gb3RoZXIgY2FzZXMgd2hlbiBhbiBlbGVtZW50IG5lZWRzIHRvIG1hbmFnZSBzdGF0ZSwgYSBwcml2YXRlXG4gKiBwcm9wZXJ0eSBkZWNvcmF0ZWQgdmlhIHRoZSB7QGxpbmtjb2RlIHN0YXRlfSBkZWNvcmF0b3Igc2hvdWxkIGJlIHVzZWQuIFdoZW5cbiAqIG5lZWRlZCwgc3RhdGUgcHJvcGVydGllcyBjYW4gYmUgaW5pdGlhbGl6ZWQgdmlhIHB1YmxpYyBwcm9wZXJ0aWVzIHRvXG4gKiBmYWNpbGl0YXRlIGNvbXBsZXggaW50ZXJhY3Rpb25zLlxuICpcbiAqIGBgYHRzXG4gKiBjbGFzcyBNeUVsZW1lbnQge1xuICogICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gKiAgIGNsaWNrZWQgPSBmYWxzZTtcbiAqIH1cbiAqIGBgYFxuICogQGNhdGVnb3J5IERlY29yYXRvclxuICogQEV4cG9ydERlY29yYXRlZEl0ZW1zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eShvcHRpb25zPzogUHJvcGVydHlEZWNsYXJhdGlvbik6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIDxDIGV4dGVuZHMgSW50ZXJmYWNlPFJlYWN0aXZlRWxlbWVudD4sIFY+KFxuICAgIHByb3RvT3JUYXJnZXQ6XG4gICAgICB8IG9iamVjdFxuICAgICAgfCBDbGFzc0FjY2Vzc29yRGVjb3JhdG9yVGFyZ2V0PEMsIFY+XG4gICAgICB8ICgodmFsdWU6IFYpID0+IHZvaWQpLFxuICAgIG5hbWVPckNvbnRleHQ6XG4gICAgICB8IFByb3BlcnR5S2V5XG4gICAgICB8IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gICAgICB8IENsYXNzU2V0dGVyRGVjb3JhdG9yQ29udGV4dDxDLCBWPlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICk6IGFueSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiBuYW1lT3JDb250ZXh0ID09PSAnb2JqZWN0J1xuICAgICAgICA/IHN0YW5kYXJkUHJvcGVydHk8QywgVj4oXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgcHJvdG9PclRhcmdldCBhc1xuICAgICAgICAgICAgICB8IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JUYXJnZXQ8QywgVj5cbiAgICAgICAgICAgICAgfCAoKHZhbHVlOiBWKSA9PiB2b2lkKSxcbiAgICAgICAgICAgIG5hbWVPckNvbnRleHQgYXMgU3RhbmRhcmRQcm9wZXJ0eUNvbnRleHQ8QywgVj5cbiAgICAgICAgICApXG4gICAgICAgIDogbGVnYWN5UHJvcGVydHkoXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgcHJvdG9PclRhcmdldCBhcyBPYmplY3QsXG4gICAgICAgICAgICBuYW1lT3JDb250ZXh0IGFzIFByb3BlcnR5S2V5XG4gICAgICAgICAgKVxuICAgICkgYXMgUHJvcGVydHlEZWNvcmF0b3I7XG4gIH07XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8qXG4gKiBJTVBPUlRBTlQ6IEZvciBjb21wYXRpYmlsaXR5IHdpdGggdHNpY2tsZSBhbmQgdGhlIENsb3N1cmUgSlMgY29tcGlsZXIsIGFsbFxuICogcHJvcGVydHkgZGVjb3JhdG9ycyAoYnV0IG5vdCBjbGFzcyBkZWNvcmF0b3JzKSBpbiB0aGlzIGZpbGUgdGhhdCBoYXZlXG4gKiBhbiBARXhwb3J0RGVjb3JhdGVkSXRlbXMgYW5ub3RhdGlvbiBtdXN0IGJlIGRlZmluZWQgYXMgYSByZWd1bGFyIGZ1bmN0aW9uLFxuICogbm90IGFuIGFycm93IGZ1bmN0aW9uLlxuICovXG5cbmltcG9ydCB7cHJvcGVydHl9IGZyb20gJy4vcHJvcGVydHkuanMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlRGVjbGFyYXRpb248VHlwZSA9IHVua25vd24+IHtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBpbmRpY2F0ZXMgaWYgYSBwcm9wZXJ0eSBzaG91bGQgYmUgY29uc2lkZXJlZCBjaGFuZ2VkIHdoZW5cbiAgICogaXQgaXMgc2V0LiBUaGUgZnVuY3Rpb24gc2hvdWxkIHRha2UgdGhlIGBuZXdWYWx1ZWAgYW5kIGBvbGRWYWx1ZWAgYW5kXG4gICAqIHJldHVybiBgdHJ1ZWAgaWYgYW4gdXBkYXRlIHNob3VsZCBiZSByZXF1ZXN0ZWQuXG4gICAqL1xuICBoYXNDaGFuZ2VkPyh2YWx1ZTogVHlwZSwgb2xkVmFsdWU6IFR5cGUpOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSBTdGF0ZURlY2xhcmF0aW9uXG4gKi9cbmV4cG9ydCB0eXBlIEludGVybmFsUHJvcGVydHlEZWNsYXJhdGlvbjxUeXBlID0gdW5rbm93bj4gPVxuICBTdGF0ZURlY2xhcmF0aW9uPFR5cGU+O1xuXG4vKipcbiAqIERlY2xhcmVzIGEgcHJpdmF0ZSBvciBwcm90ZWN0ZWQgcmVhY3RpdmUgcHJvcGVydHkgdGhhdCBzdGlsbCB0cmlnZ2Vyc1xuICogdXBkYXRlcyB0byB0aGUgZWxlbWVudCB3aGVuIGl0IGNoYW5nZXMuIEl0IGRvZXMgbm90IHJlZmxlY3QgZnJvbSB0aGVcbiAqIGNvcnJlc3BvbmRpbmcgYXR0cmlidXRlLlxuICpcbiAqIFByb3BlcnRpZXMgZGVjbGFyZWQgdGhpcyB3YXkgbXVzdCBub3QgYmUgdXNlZCBmcm9tIEhUTUwgb3IgSFRNTCB0ZW1wbGF0aW5nXG4gKiBzeXN0ZW1zLCB0aGV5J3JlIHNvbGVseSBmb3IgcHJvcGVydGllcyBpbnRlcm5hbCB0byB0aGUgZWxlbWVudC4gVGhlc2VcbiAqIHByb3BlcnRpZXMgbWF5IGJlIHJlbmFtZWQgYnkgb3B0aW1pemF0aW9uIHRvb2xzIGxpa2UgY2xvc3VyZSBjb21waWxlci5cbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlKG9wdGlvbnM/OiBTdGF0ZURlY2xhcmF0aW9uKSB7XG4gIHJldHVybiBwcm9wZXJ0eSh7XG4gICAgLi4ub3B0aW9ucyxcbiAgICAvLyBBZGQgYm90aCBgc3RhdGVgIGFuZCBgYXR0cmlidXRlYCBiZWNhdXNlIHdlIGZvdW5kIGEgdGhpcmQgcGFydHlcbiAgICAvLyBjb250cm9sbGVyIHRoYXQgaXMga2V5aW5nIG9mZiBvZiBQcm9wZXJ0eU9wdGlvbnMuc3RhdGUgdG8gZGV0ZXJtaW5lXG4gICAgLy8gd2hldGhlciBhIGZpZWxkIGlzIGEgcHJpdmF0ZSBpbnRlcm5hbCBwcm9wZXJ0eSBvciBub3QuXG4gICAgc3RhdGU6IHRydWUsXG4gICAgYXR0cmlidXRlOiBmYWxzZSxcbiAgfSk7XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcHVibGljIGludGVyZmFjZSB0eXBlIHRoYXQgcmVtb3ZlcyBwcml2YXRlIGFuZCBwcm90ZWN0ZWQgZmllbGRzLlxuICogVGhpcyBhbGxvd3MgYWNjZXB0aW5nIG90aGVyd2lzZSBpbmNvbXBhdGlibGUgdmVyc2lvbnMgb2YgdGhlIHR5cGUgKGUuZy4gZnJvbVxuICogbXVsdGlwbGUgY29waWVzIG9mIHRoZSBzYW1lIHBhY2thZ2UgaW4gYG5vZGVfbW9kdWxlc2ApLlxuICovXG5leHBvcnQgdHlwZSBJbnRlcmZhY2U8VD4gPSB7XG4gIFtLIGluIGtleW9mIFRdOiBUW0tdO1xufTtcblxuZXhwb3J0IHR5cGUgQ29uc3RydWN0b3I8VD4gPSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIG5ldyAoLi4uYXJnczogYW55W10pOiBUO1xufTtcblxuLyoqXG4gKiBXcmFwcyB1cCBhIGZldyBiZXN0IHByYWN0aWNlcyB3aGVuIHJldHVybmluZyBhIHByb3BlcnR5IGRlc2NyaXB0b3IgZnJvbSBhXG4gKiBkZWNvcmF0b3IuXG4gKlxuICogTWFya3MgdGhlIGRlZmluZWQgcHJvcGVydHkgYXMgY29uZmlndXJhYmxlLCBhbmQgZW51bWVyYWJsZSwgYW5kIGhhbmRsZXNcbiAqIHRoZSBjYXNlIHdoZXJlIHdlIGhhdmUgYSBidXN0ZWQgUmVmbGVjdC5kZWNvcmF0ZSB6b21iaWVmaWxsIChlLmcuIGluIEFuZ3VsYXJcbiAqIGFwcHMpLlxuICpcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgZGVzYyA9IChcbiAgb2JqOiBvYmplY3QsXG4gIG5hbWU6IFByb3BlcnR5S2V5IHwgQ2xhc3NBY2Nlc3NvckRlY29yYXRvckNvbnRleHQ8dW5rbm93biwgdW5rbm93bj4sXG4gIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxuKSA9PiB7XG4gIC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSwgd2Uga2VlcCB0aGVtIGNvbmZpZ3VyYWJsZSBhbmQgZW51bWVyYWJsZS5cbiAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSB0cnVlO1xuICBpZiAoXG4gICAgLy8gV2UgY2hlY2sgZm9yIFJlZmxlY3QuZGVjb3JhdGUgZWFjaCB0aW1lLCBpbiBjYXNlIHRoZSB6b21iaWVmaWxsXG4gICAgLy8gaXMgYXBwbGllZCB2aWEgbGF6eSBsb2FkaW5nIHNvbWUgQW5ndWxhciBjb2RlLlxuICAgIChSZWZsZWN0IGFzIHR5cGVvZiBSZWZsZWN0ICYge2RlY29yYXRlPzogdW5rbm93bn0pLmRlY29yYXRlICYmXG4gICAgdHlwZW9mIG5hbWUgIT09ICdvYmplY3QnXG4gICkge1xuICAgIC8vIElmIHdlJ3JlIGNhbGxlZCBhcyBhIGxlZ2FjeSBkZWNvcmF0b3IsIGFuZCBSZWZsZWN0LmRlY29yYXRlIGlzIHByZXNlbnRcbiAgICAvLyB0aGVuIHdlIGhhdmUgbm8gZ3VhcmFudGVlcyB0aGF0IHRoZSByZXR1cm5lZCBkZXNjcmlwdG9yIHdpbGwgYmVcbiAgICAvLyBkZWZpbmVkIG9uIHRoZSBjbGFzcywgc28gd2UgbXVzdCBhcHBseSBpdCBkaXJlY3RseSBvdXJzZWx2ZXMuXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgfVxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn07XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8qXG4gKiBJTVBPUlRBTlQ6IEZvciBjb21wYXRpYmlsaXR5IHdpdGggdHNpY2tsZSBhbmQgdGhlIENsb3N1cmUgSlMgY29tcGlsZXIsIGFsbFxuICogcHJvcGVydHkgZGVjb3JhdG9ycyAoYnV0IG5vdCBjbGFzcyBkZWNvcmF0b3JzKSBpbiB0aGlzIGZpbGUgdGhhdCBoYXZlXG4gKiBhbiBARXhwb3J0RGVjb3JhdGVkSXRlbXMgYW5ub3RhdGlvbiBtdXN0IGJlIGRlZmluZWQgYXMgYSByZWd1bGFyIGZ1bmN0aW9uLFxuICogbm90IGFuIGFycm93IGZ1bmN0aW9uLlxuICovXG5pbXBvcnQgdHlwZSB7UmVhY3RpdmVFbGVtZW50fSBmcm9tICcuLi9yZWFjdGl2ZS1lbGVtZW50LmpzJztcbmltcG9ydCB7ZGVzYywgdHlwZSBJbnRlcmZhY2V9IGZyb20gJy4vYmFzZS5qcyc7XG5cbmNvbnN0IERFVl9NT0RFID0gdHJ1ZTtcblxubGV0IGlzc3VlV2FybmluZzogKGNvZGU6IHN0cmluZywgd2FybmluZzogc3RyaW5nKSA9PiB2b2lkO1xuXG5pZiAoREVWX01PREUpIHtcbiAgLy8gRW5zdXJlIHdhcm5pbmdzIGFyZSBpc3N1ZWQgb25seSAxeCwgZXZlbiBpZiBtdWx0aXBsZSB2ZXJzaW9ucyBvZiBMaXRcbiAgLy8gYXJlIGxvYWRlZC5cbiAgZ2xvYmFsVGhpcy5saXRJc3N1ZWRXYXJuaW5ncyA/Pz0gbmV3IFNldCgpO1xuXG4gIC8qKlxuICAgKiBJc3N1ZSBhIHdhcm5pbmcgaWYgd2UgaGF2ZW4ndCBhbHJlYWR5LCBiYXNlZCBlaXRoZXIgb24gYGNvZGVgIG9yIGB3YXJuaW5nYC5cbiAgICogV2FybmluZ3MgYXJlIGRpc2FibGVkIGF1dG9tYXRpY2FsbHkgb25seSBieSBgd2FybmluZ2A7IGRpc2FibGluZyB2aWEgYGNvZGVgXG4gICAqIGNhbiBiZSBkb25lIGJ5IHVzZXJzLlxuICAgKi9cbiAgaXNzdWVXYXJuaW5nID0gKGNvZGU6IHN0cmluZywgd2FybmluZzogc3RyaW5nKSA9PiB7XG4gICAgd2FybmluZyArPSBjb2RlXG4gICAgICA/IGAgU2VlIGh0dHBzOi8vbGl0LmRldi9tc2cvJHtjb2RlfSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gXG4gICAgICA6ICcnO1xuICAgIGlmIChcbiAgICAgICFnbG9iYWxUaGlzLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMod2FybmluZykgJiZcbiAgICAgICFnbG9iYWxUaGlzLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMoY29kZSlcbiAgICApIHtcbiAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbiAgICAgIGdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MhLmFkZCh3YXJuaW5nKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5RGVjb3JhdG9yID0ge1xuICAvLyBsZWdhY3lcbiAgKFxuICAgIHByb3RvOiBJbnRlcmZhY2U8UmVhY3RpdmVFbGVtZW50PixcbiAgICBuYW1lOiBQcm9wZXJ0eUtleSxcbiAgICBkZXNjcmlwdG9yPzogUHJvcGVydHlEZXNjcmlwdG9yXG4gICAgLy8gTm90ZSBUeXBlU2NyaXB0IHJlcXVpcmVzIHRoZSByZXR1cm4gdHlwZSB0byBiZSBgdm9pZHxhbnlgXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgKTogdm9pZCB8IGFueTtcblxuICAvLyBzdGFuZGFyZFxuICA8QyBleHRlbmRzIEludGVyZmFjZTxSZWFjdGl2ZUVsZW1lbnQ+LCBWIGV4dGVuZHMgRWxlbWVudCB8IG51bGw+KFxuICAgIHZhbHVlOiBDbGFzc0FjY2Vzc29yRGVjb3JhdG9yVGFyZ2V0PEMsIFY+LFxuICAgIGNvbnRleHQ6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gICk6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JSZXN1bHQ8QywgVj47XG59O1xuXG4vKipcbiAqIEEgcHJvcGVydHkgZGVjb3JhdG9yIHRoYXQgY29udmVydHMgYSBjbGFzcyBwcm9wZXJ0eSBpbnRvIGEgZ2V0dGVyIHRoYXRcbiAqIGV4ZWN1dGVzIGEgcXVlcnlTZWxlY3RvciBvbiB0aGUgZWxlbWVudCdzIHJlbmRlclJvb3QuXG4gKlxuICogQHBhcmFtIHNlbGVjdG9yIEEgRE9NU3RyaW5nIGNvbnRhaW5pbmcgb25lIG9yIG1vcmUgc2VsZWN0b3JzIHRvIG1hdGNoLlxuICogQHBhcmFtIGNhY2hlIEFuIG9wdGlvbmFsIGJvb2xlYW4gd2hpY2ggd2hlbiB0cnVlIHBlcmZvcm1zIHRoZSBET00gcXVlcnkgb25seVxuICogICAgIG9uY2UgYW5kIGNhY2hlcyB0aGUgcmVzdWx0LlxuICpcbiAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L3F1ZXJ5U2VsZWN0b3JcbiAqXG4gKiBgYGB0c1xuICogY2xhc3MgTXlFbGVtZW50IHtcbiAqICAgQHF1ZXJ5KCcjZmlyc3QnKVxuICogICBmaXJzdDogSFRNTERpdkVsZW1lbnQ7XG4gKlxuICogICByZW5kZXIoKSB7XG4gKiAgICAgcmV0dXJuIGh0bWxgXG4gKiAgICAgICA8ZGl2IGlkPVwiZmlyc3RcIj48L2Rpdj5cbiAqICAgICAgIDxkaXYgaWQ9XCJzZWNvbmRcIj48L2Rpdj5cbiAqICAgICBgO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5KHNlbGVjdG9yOiBzdHJpbmcsIGNhY2hlPzogYm9vbGVhbik6IFF1ZXJ5RGVjb3JhdG9yIHtcbiAgcmV0dXJuICg8QyBleHRlbmRzIEludGVyZmFjZTxSZWFjdGl2ZUVsZW1lbnQ+LCBWIGV4dGVuZHMgRWxlbWVudCB8IG51bGw+KFxuICAgIHByb3RvT3JUYXJnZXQ6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JUYXJnZXQ8QywgVj4sXG4gICAgbmFtZU9yQ29udGV4dDogUHJvcGVydHlLZXkgfCBDbGFzc0FjY2Vzc29yRGVjb3JhdG9yQ29udGV4dDxDLCBWPixcbiAgICBkZXNjcmlwdG9yPzogUHJvcGVydHlEZXNjcmlwdG9yXG4gICkgPT4ge1xuICAgIGNvbnN0IGRvUXVlcnkgPSAoZWw6IEludGVyZmFjZTxSZWFjdGl2ZUVsZW1lbnQ+KTogViA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSAoZWwucmVuZGVyUm9vdD8ucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgPz8gbnVsbCkgYXMgVjtcbiAgICAgIGlmIChERVZfTU9ERSAmJiByZXN1bHQgPT09IG51bGwgJiYgY2FjaGUgJiYgIWVsLmhhc1VwZGF0ZWQpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9XG4gICAgICAgICAgdHlwZW9mIG5hbWVPckNvbnRleHQgPT09ICdvYmplY3QnXG4gICAgICAgICAgICA/IG5hbWVPckNvbnRleHQubmFtZVxuICAgICAgICAgICAgOiBuYW1lT3JDb250ZXh0O1xuICAgICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICAgJycsXG4gICAgICAgICAgYEBxdWVyeSdkIGZpZWxkICR7SlNPTi5zdHJpbmdpZnkoU3RyaW5nKG5hbWUpKX0gd2l0aCB0aGUgJ2NhY2hlJyBgICtcbiAgICAgICAgICAgIGBmbGFnIHNldCBmb3Igc2VsZWN0b3IgJyR7c2VsZWN0b3J9JyBoYXMgYmVlbiBhY2Nlc3NlZCBiZWZvcmUgYCArXG4gICAgICAgICAgICBgdGhlIGZpcnN0IHVwZGF0ZSBhbmQgcmV0dXJuZWQgbnVsbC4gVGhpcyBpcyBleHBlY3RlZCBpZiB0aGUgYCArXG4gICAgICAgICAgICBgcmVuZGVyUm9vdCB0cmVlIGhhcyBub3QgYmVlbiBwcm92aWRlZCBiZWZvcmVoYW5kIChlLmcuIHZpYSBgICtcbiAgICAgICAgICAgIGBEZWNsYXJhdGl2ZSBTaGFkb3cgRE9NKS4gVGhlcmVmb3JlIHRoZSB2YWx1ZSBoYXNuJ3QgYmVlbiBjYWNoZWQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogaWYgd2Ugd2FudCB0byBhbGxvdyB1c2VycyB0byBhc3NlcnQgdGhhdCB0aGUgcXVlcnkgd2lsbCBuZXZlclxuICAgICAgLy8gcmV0dXJuIG51bGwsIHdlIG5lZWQgYSBuZXcgb3B0aW9uIGFuZCB0byB0aHJvdyBoZXJlIGlmIHRoZSByZXN1bHRcbiAgICAgIC8vIGlzIG51bGwuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgaWYgKGNhY2hlKSB7XG4gICAgICAvLyBBY2Nlc3NvcnMgdG8gd3JhcCBmcm9tIGVpdGhlcjpcbiAgICAgIC8vICAgMS4gVGhlIGRlY29yYXRvciB0YXJnZXQsIGluIHRoZSBjYXNlIG9mIHN0YW5kYXJkIGRlY29yYXRvcnNcbiAgICAgIC8vICAgMi4gVGhlIHByb3BlcnR5IGRlc2NyaXB0b3IsIGluIHRoZSBjYXNlIG9mIGV4cGVyaW1lbnRhbCBkZWNvcmF0b3JzXG4gICAgICAvLyAgICAgIG9uIGF1dG8tYWNjZXNzb3JzLlxuICAgICAgLy8gICAzLiBGdW5jdGlvbnMgdGhhdCBhY2Nlc3Mgb3VyIG93biBjYWNoZS1rZXkgcHJvcGVydHkgb24gdGhlIGluc3RhbmNlLFxuICAgICAgLy8gICAgICBpbiB0aGUgY2FzZSBvZiBleHBlcmltZW50YWwgZGVjb3JhdG9ycyBvbiBmaWVsZHMuXG4gICAgICBjb25zdCB7Z2V0LCBzZXR9ID1cbiAgICAgICAgdHlwZW9mIG5hbWVPckNvbnRleHQgPT09ICdvYmplY3QnXG4gICAgICAgICAgPyBwcm90b09yVGFyZ2V0XG4gICAgICAgICAgOiAoZGVzY3JpcHRvciA/P1xuICAgICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qga2V5ID0gREVWX01PREVcbiAgICAgICAgICAgICAgICA/IFN5bWJvbChgJHtTdHJpbmcobmFtZU9yQ29udGV4dCl9IChAcXVlcnkoKSBjYWNoZSlgKVxuICAgICAgICAgICAgICAgIDogU3ltYm9sKCk7XG4gICAgICAgICAgICAgIHR5cGUgV2l0aENhY2hlID0gUmVhY3RpdmVFbGVtZW50ICYge1xuICAgICAgICAgICAgICAgIFtrZXk6IHN5bWJvbF06IEVsZW1lbnQgfCBudWxsO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcyBhcyBXaXRoQ2FjaGUpW2tleV07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQodikge1xuICAgICAgICAgICAgICAgICAgKHRoaXMgYXMgV2l0aENhY2hlKVtrZXldID0gdjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkoKSk7XG4gICAgICByZXR1cm4gZGVzYyhwcm90b09yVGFyZ2V0LCBuYW1lT3JDb250ZXh0LCB7XG4gICAgICAgIGdldCh0aGlzOiBSZWFjdGl2ZUVsZW1lbnQpOiBWIHtcbiAgICAgICAgICBsZXQgcmVzdWx0OiBWID0gZ2V0IS5jYWxsKHRoaXMpO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZG9RdWVyeSh0aGlzKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IG51bGwgfHwgdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICAgICAgICAgIHNldCEuY2FsbCh0aGlzLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgb2JqZWN0IHdvcmtzIGFzIHRoZSByZXR1cm4gdHlwZSBmb3IgYm90aCBzdGFuZGFyZCBhbmRcbiAgICAgIC8vIGV4cGVyaW1lbnRhbCBkZWNvcmF0b3JzLlxuICAgICAgcmV0dXJuIGRlc2MocHJvdG9PclRhcmdldCwgbmFtZU9yQ29udGV4dCwge1xuICAgICAgICBnZXQodGhpczogUmVhY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGRvUXVlcnkodGhpcyk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH0pIGFzIFF1ZXJ5RGVjb3JhdG9yO1xufVxuIiwgImltcG9ydCB0eXBlIHsgVGhyZWFkLCBDb21tZW50LCBSZWFjdGlvbiB9IGZyb20gJy4uLy4uL3R5cGVzLnRzJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICB2YXIgZG9jbWQ6IHtcbiAgICBjYWxsKGFjdGlvbjogc3RyaW5nLCBwYXlsb2FkOiBhbnkpOiBQcm9taXNlPGFueT47XG4gICAgc2VuZChuYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IHZvaWQ7XG4gICAgb24obmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCk6ICgpID0+IHZvaWQ7XG4gICAgYWZ0ZXJSZWxvYWQobmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGN0eDogYW55KSA9PiB2b2lkKTogdm9pZDtcbiAgICBzY2hlZHVsZVJlbG9hZChuYW1lOiBzdHJpbmcsIGNvbnRleHQ/OiBhbnkpOiB2b2lkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2VGaWxlKCk6IHN0cmluZyB7XG4gIGNvbnN0IGZpbGUgPSBkb2N1bWVudC5ib2R5LmRhdGFzZXRbJ3NvdXJjZUZpbGUnXTtcbiAgaWYgKCFmaWxlKSB0aHJvdyBuZXcgRXJyb3IoJ1t0aHJlYWRzXSBkYXRhLXNvdXJjZS1maWxlIG5vdCBmb3VuZCBvbiBib2R5IGVsZW1lbnQnKTtcbiAgcmV0dXJuIGZpbGU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFRocmVhZHMoKTogUHJvbWlzZTxUaHJlYWRbXT4ge1xuICByZXR1cm4gZG9jbWQuY2FsbCgndGhyZWFkczpnZXQtdGhyZWFkcycsIHsgZmlsZTogZ2V0U291cmNlRmlsZSgpIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVGhyZWFkKHBheWxvYWQ6IHtcbiAgYW5jaG9yOiBhbnkgfCBudWxsO1xuICBhdXRob3I6IHN0cmluZztcbiAgYm9keTogc3RyaW5nO1xufSk6IFByb21pc2U8VGhyZWFkPiB7XG4gIHJldHVybiBkb2NtZC5jYWxsKCd0aHJlYWRzOmFkZC10aHJlYWQnLCB7XG4gICAgZmlsZTogZ2V0U291cmNlRmlsZSgpLFxuICAgIC4uLnBheWxvYWQsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkQ29tbWVudChcbiAgdGhyZWFkSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogeyBhdXRob3I6IHN0cmluZzsgYm9keTogc3RyaW5nIH0sXG4pOiBQcm9taXNlPENvbW1lbnQ+IHtcbiAgcmV0dXJuIGRvY21kLmNhbGwoJ3RocmVhZHM6YWRkLWNvbW1lbnQnLCB7XG4gICAgZmlsZTogZ2V0U291cmNlRmlsZSgpLFxuICAgIHRocmVhZElkLFxuICAgIC4uLnBheWxvYWQsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZWRpdENvbW1lbnQoXG4gIHRocmVhZElkOiBzdHJpbmcsXG4gIGNvbW1lbnRJZDogc3RyaW5nLFxuICBwYXlsb2FkOiB7IGJvZHk6IHN0cmluZyB9LFxuKTogUHJvbWlzZTxDb21tZW50PiB7XG4gIHJldHVybiBkb2NtZC5jYWxsKCd0aHJlYWRzOmVkaXQtY29tbWVudCcsIHtcbiAgICBmaWxlOiBnZXRTb3VyY2VGaWxlKCksXG4gICAgdGhyZWFkSWQsXG4gICAgY29tbWVudElkLFxuICAgIC4uLnBheWxvYWQsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQ29tbWVudChcbiAgdGhyZWFkSWQ6IHN0cmluZyxcbiAgY29tbWVudElkOiBzdHJpbmcsXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgZG9jbWQuY2FsbCgndGhyZWFkczpkZWxldGUtY29tbWVudCcsIHtcbiAgICBmaWxlOiBnZXRTb3VyY2VGaWxlKCksXG4gICAgdGhyZWFkSWQsXG4gICAgY29tbWVudElkLFxuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVRocmVhZCh0aHJlYWRJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGRvY21kLmNhbGwoJ3RocmVhZHM6ZGVsZXRlLXRocmVhZCcsIHtcbiAgICBmaWxlOiBnZXRTb3VyY2VGaWxlKCksXG4gICAgdGhyZWFkSWQsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZVRocmVhZChcbiAgdGhyZWFkSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogeyByZXNvbHZlZF9ieTogc3RyaW5nIH0sXG4pOiBQcm9taXNlPFRocmVhZD4ge1xuICByZXR1cm4gZG9jbWQuY2FsbCgndGhyZWFkczpyZXNvbHZlLXRocmVhZCcsIHtcbiAgICBmaWxlOiBnZXRTb3VyY2VGaWxlKCksXG4gICAgdGhyZWFkSWQsXG4gICAgLi4ucGF5bG9hZCxcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0b2dnbGVSZWFjdGlvbihcbiAgdGhyZWFkSWQ6IHN0cmluZyxcbiAgY29tbWVudElkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IHsgZW1vamk6IHN0cmluZzsgYXV0aG9yOiBzdHJpbmcgfSxcbik6IFByb21pc2U8UmVhY3Rpb25bXT4ge1xuICByZXR1cm4gZG9jbWQuY2FsbCgndGhyZWFkczp0b2dnbGUtcmVhY3Rpb24nLCB7XG4gICAgZmlsZTogZ2V0U291cmNlRmlsZSgpLFxuICAgIHRocmVhZElkLFxuICAgIGNvbW1lbnRJZCxcbiAgICAuLi5wYXlsb2FkLFxuICB9KTtcbn1cbiIsICJjb25zdCBTVE9SQUdFX0tFWSA9ICd0aHJlYWRzX2F1dGhvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdXRob3IoKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdXRob3IobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRJZGVudGl0eSgpOiB2b2lkIHtcbiAgLy8gTm8gc2VydmVyIGlkZW50aXR5IGVuZHBvaW50IFx1MjAxNCBhdXRob3Igc2V0IHZpYSBlbnN1cmVBdXRob3IoKSBwcm9tcHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUF1dGhvcigpOiBzdHJpbmcge1xuICBsZXQgYXV0aG9yID0gZ2V0QXV0aG9yKCk7XG4gIGlmICghYXV0aG9yKSB7XG4gICAgYXV0aG9yID0gcHJvbXB0KCdFbnRlciB5b3VyIGRpc3BsYXkgbmFtZSBmb3IgZGlzY3Vzc2lvbnM6Jyk7XG4gICAgaWYgKCFhdXRob3IgfHwgIWF1dGhvci50cmltKCkpIHtcbiAgICAgIGF1dGhvciA9ICdBbm9ueW1vdXMnO1xuICAgIH1cbiAgICBzZXRBdXRob3IoYXV0aG9yLnRyaW0oKSk7XG4gIH1cbiAgcmV0dXJuIGF1dGhvcjtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEFuY2hvciB9IGZyb20gJy4uLy4uL3R5cGVzLnRzJztcblxuY29uc3QgQ09OVEVYVF9DSEFSUyA9IDQwO1xuY29uc3QgQkxPQ0tfRUxFTUVOVFMgPSBuZXcgU2V0KFtcbiAgXCJQXCIsIFwiRElWXCIsIFwiTElcIiwgXCJURFwiLCBcIlRIXCIsIFwiQkxPQ0tRVU9URVwiLCBcIlBSRVwiLCBcIkgxXCIsIFwiSDJcIiwgXCJIM1wiLFxuICBcIkg0XCIsIFwiSDVcIiwgXCJINlwiLCBcIlNFQ1RJT05cIiwgXCJBUlRJQ0xFXCIsIFwiQVNJREVcIiwgXCJEVFwiLCBcIkREXCIsIFwiRklHQ0FQVElPTlwiLFxuXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZW50QXJlYSgpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAvLyBkb2NtZCBjb250ZW50IGFyZWEgc2VsZWN0b3JzICh0cnkgbXVsdGlwbGUpXG4gIHJldHVybiAoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCJbZGF0YS1kb2NtZC1jb250ZW50XVwiKSB8fFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLmRvY21kLWNvbnRlbnRcIikgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcImFydGljbGVcIikgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIm1haW5cIilcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzV2l0aGluQ29udGVudChub2RlOiBOb2RlKTogYm9vbGVhbiB7XG4gIGNvbnN0IGNvbnRlbnQgPSBnZXRDb250ZW50QXJlYSgpO1xuICByZXR1cm4gY29udGVudCA/IGNvbnRlbnQuY29udGFpbnMobm9kZSkgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0QmxvY2tBbmNlc3Rvcihub2RlOiBOb2RlKTogSFRNTEVsZW1lbnQge1xuICBsZXQgY3VycmVudDogTm9kZSB8IG51bGwgPSBub2RlO1xuICB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgaWYgKFxuICAgICAgY3VycmVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXG4gICAgICBCTE9DS19FTEVNRU5UUy5oYXMoY3VycmVudC50YWdOYW1lKVxuICAgICkge1xuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU2VsZWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgY29udGVudCA9IGdldENvbnRlbnRBcmVhKCk7XG5cbiAgZm9yIChsZXQgY3VyID0gZWxlbWVudCBhcyBIVE1MRWxlbWVudCB8IG51bGw7IGN1ciAmJiBjdXIgIT09IGRvY3VtZW50LmJvZHkgJiYgY3VyICE9PSBjb250ZW50OyBjdXIgPSBjdXIucGFyZW50RWxlbWVudCkge1xuICAgIGNvbnN0IHRhZyA9IGN1ci50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgcGFyZW50ID0gY3VyLnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgY29uc3QgdGFnTmFtZSA9IGN1ci50YWdOYW1lO1xuICAgICAgY29uc3Qgc2libGluZ3MgPSBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuZmlsdGVyKFxuICAgICAgICAoc2libGluZykgPT4gc2libGluZy50YWdOYW1lID09PSB0YWdOYW1lLFxuICAgICAgKTtcbiAgICAgIGlmIChzaWJsaW5ncy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gc2libGluZ3MuaW5kZXhPZihjdXIpICsgMTtcbiAgICAgICAgcGFydHMudW5zaGlmdChgJHt0YWd9Om50aC1vZi10eXBlKCR7aW5kZXh9KWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydHMudW5zaGlmdCh0YWcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KHRhZyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oXCIgPiBcIik7XG59XG5cbmZ1bmN0aW9uIGdldFRleHRPZmZzZXQoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcmFuZ2U6IFJhbmdlKTogbnVtYmVyIHtcbiAgY29uc3QgdHJlZVdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG4gICAgY29udGFpbmVyLFxuICAgIE5vZGVGaWx0ZXIuU0hPV19URVhULFxuICApO1xuICBsZXQgb2Zmc2V0ID0gMDtcblxuICB3aGlsZSAodHJlZVdhbGtlci5uZXh0Tm9kZSgpKSB7XG4gICAgaWYgKHRyZWVXYWxrZXIuY3VycmVudE5vZGUgPT09IHJhbmdlLnN0YXJ0Q29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0ICsgcmFuZ2Uuc3RhcnRPZmZzZXQ7XG4gICAgfVxuICAgIG9mZnNldCArPSAodHJlZVdhbGtlci5jdXJyZW50Tm9kZSBhcyBUZXh0KS5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0O1xufVxuXG5mdW5jdGlvbiBleHRyYWN0Q29udGV4dChcbiAgdGV4dDogc3RyaW5nLFxuICBzdGFydDogbnVtYmVyLFxuICBlbmQ6IG51bWJlcixcbik6IHsgcHJlZml4OiBzdHJpbmc7IHN1ZmZpeDogc3RyaW5nIH0ge1xuICBjb25zdCBwcmVmaXggPSB0ZXh0LnNsaWNlKE1hdGgubWF4KDAsIHN0YXJ0IC0gQ09OVEVYVF9DSEFSUyksIHN0YXJ0KTtcbiAgY29uc3Qgc3VmZml4ID0gdGV4dC5zbGljZShlbmQsIGVuZCArIENPTlRFWFRfQ0hBUlMpO1xuICByZXR1cm4geyBwcmVmaXgsIHN1ZmZpeCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUFuY2hvcihzZWxlY3Rpb246IFNlbGVjdGlvbik6IEFuY2hvciB8IG51bGwge1xuICBpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgPT09IDApIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gIGNvbnN0IHF1b3RlID0gc2VsZWN0aW9uLnRvU3RyaW5nKCkudHJpbSgpO1xuXG4gIGlmICghcXVvdGUgfHwgcXVvdGUubGVuZ3RoIDwgMykgcmV0dXJuIG51bGw7XG4gIGlmICghaXNXaXRoaW5Db250ZW50KHJhbmdlLnN0YXJ0Q29udGFpbmVyKSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgYmxvY2tFbCA9IGdldEJsb2NrQW5jZXN0b3IocmFuZ2Uuc3RhcnRDb250YWluZXIpO1xuICBjb25zdCBzZWxlY3RvciA9IGdlbmVyYXRlU2VsZWN0b3IoYmxvY2tFbCk7XG4gIGNvbnN0IGZ1bGxUZXh0ID0gYmxvY2tFbC50ZXh0Q29udGVudCB8fCBcIlwiO1xuICBjb25zdCBvZmZzZXQgPSBnZXRUZXh0T2Zmc2V0KGJsb2NrRWwsIHJhbmdlKTtcbiAgY29uc3QgeyBwcmVmaXgsIHN1ZmZpeCB9ID0gZXh0cmFjdENvbnRleHQoZnVsbFRleHQsIG9mZnNldCwgb2Zmc2V0ICsgcXVvdGUubGVuZ3RoKTtcblxuICByZXR1cm4ge1xuICAgIHF1b3RlLFxuICAgIHByZWZpeDogcHJlZml4IHx8IG51bGwsXG4gICAgc3VmZml4OiBzdWZmaXggfHwgbnVsbCxcbiAgICBzZWxlY3RvcixcbiAgICBvZmZzZXQsXG4gICAgYmxvY2tUZXh0OiBmdWxsVGV4dC50cmltKCkgfHwgbnVsbCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbGVjdGlvblBvc2l0aW9uKHNlbGVjdGlvbjogU2VsZWN0aW9uKTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgbnVsbCB7XG4gIGlmIChzZWxlY3Rpb24ucmFuZ2VDb3VudCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gIGNvbnN0IHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyByZWN0LndpZHRoIC8gMixcbiAgICB5OiByZWN0LnRvcCxcbiAgfTtcbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gaW5qZWN0Q29tcG9uZW50U3R5bGVzKCk6IHZvaWQge1xuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RjLXN0eWxlcycpKSByZXR1cm47XG5cbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZS5pZCA9ICd0Yy1zdHlsZXMnO1xuICBzdHlsZS50ZXh0Q29udGVudCA9IGBcbiAgICAvKiA9PT09PT09PT0gRGVzaWduIHRva2VucyA9PT09PT09PT0gKi9cbiAgICA6cm9vdCB7XG4gICAgICAtLXRjLWJnOiB2YXIoLS1iZy1jb2xvciwgaHNsKDAgMCUgMTAwJSkpO1xuICAgICAgLS10Yy1mZzogdmFyKC0tdGV4dC1jb2xvciwgaHNsKDAgMCUgOSUpKTtcbiAgICAgIC0tdGMtbXV0ZWQ6IHZhcigtLXNpZGViYXItYmcsIGhzbCgwIDAlIDk2LjElKSk7XG4gICAgICAtLXRjLW11dGVkLWZnOiB2YXIoLS10ZXh0LW11dGVkLCBoc2woMCAwJSA0NS4xJSkpO1xuICAgICAgLS10Yy1ib3JkZXI6IHZhcigtLWJvcmRlci1jb2xvciwgaHNsKDAgMCUgODkuOCUpKTtcbiAgICAgIC0tdGMtaW5wdXQ6IHZhcigtLWJvcmRlci1jb2xvciwgaHNsKDAgMCUgODkuOCUpKTtcbiAgICAgIC0tdGMtcmluZzogdmFyKC0tdGV4dC1jb2xvciwgaHNsKDAgMCUgOSUpKTtcbiAgICAgIC0tdGMtYWNjZW50OiB2YXIoLS1zaWRlYmFyLWJnLCBoc2woMCAwJSA5Ni4xJSkpO1xuICAgICAgLS10Yy1hY2NlbnQtZmc6IHZhcigtLXRleHQtY29sb3IsIGhzbCgwIDAlIDklKSk7XG4gICAgICAtLXRjLWNhcmQ6IHZhcigtLWJnLWNvbG9yLCBoc2woMCAwJSAxMDAlKSk7XG4gICAgICAtLXRjLWNhcmQtZmc6IHZhcigtLXRleHQtY29sb3IsIGhzbCgwIDAlIDklKSk7XG4gICAgICAtLXRjLXJhZGl1czogNnB4O1xuICAgICAgLS10Yy1mb250OiB2YXIoLS1mb250LWZhbWlseS1zYW5zLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBzYW5zLXNlcmlmKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gSGlnaGxpZ2h0IGNvbG9ycyAoY3ljbGluZyBwYWxldHRlKSA9PT09PT09PT0gKi9cbiAgICAudGhyZWFkcy1oaWdobGlnaHQge1xuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgcGFkZGluZzogMXB4IDA7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzO1xuICAgIH1cbiAgICAudGhyZWFkcy1oaWdobGlnaHQ6aG92ZXIgeyBvcGFjaXR5OiAwLjc1OyB9XG5cbiAgICAudGhyZWFkcy1obC15ZWxsb3cgIHsgYmFja2dyb3VuZDogaHNsKDQ4IDk2JSA4OSUgLyAwLjYpOyB9XG4gICAgLnRocmVhZHMtaGwtYmx1ZSAgICB7IGJhY2tncm91bmQ6IGhzbCgyMTAgMTAwJSA4OCUgLyAwLjU1KTsgfVxuICAgIC50aHJlYWRzLWhsLWdyZWVuICAgeyBiYWNrZ3JvdW5kOiBoc2woMTQyIDYwJSA4MiUgLyAwLjU1KTsgfVxuICAgIC50aHJlYWRzLWhsLXBpbmsgICAgeyBiYWNrZ3JvdW5kOiBoc2woMzQwIDgwJSA4OCUgLyAwLjU1KTsgfVxuICAgIC50aHJlYWRzLWhsLXB1cnBsZSAgeyBiYWNrZ3JvdW5kOiBoc2woMjcwIDcwJSA4OCUgLyAwLjU1KTsgfVxuICAgIC50aHJlYWRzLWhsLW9yYW5nZSAgeyBiYWNrZ3JvdW5kOiBoc2woMjggMTAwJSA4NiUgLyAwLjU1KTsgfVxuXG4gICAgLyogTWF0Y2hpbmcgbGVmdC1ib3JkZXIgY29sb3JzIGZvciB0aHJlYWQgY2FyZHMgKi9cbiAgICAudGhyZWFkcy1ib3JkZXIteWVsbG93IHsgYm9yZGVyLWxlZnQtY29sb3I6IGhzbCg0OCA5NiUgNTMlKSAhaW1wb3J0YW50OyB9XG4gICAgLnRocmVhZHMtYm9yZGVyLWJsdWUgICB7IGJvcmRlci1sZWZ0LWNvbG9yOiBoc2woMjEwIDEwMCUgNTUlKSAhaW1wb3J0YW50OyB9XG4gICAgLnRocmVhZHMtYm9yZGVyLWdyZWVuICB7IGJvcmRlci1sZWZ0LWNvbG9yOiBoc2woMTQyIDYwJSA0NSUpICFpbXBvcnRhbnQ7IH1cbiAgICAudGhyZWFkcy1ib3JkZXItcGluayAgIHsgYm9yZGVyLWxlZnQtY29sb3I6IGhzbCgzNDAgODAlIDU1JSkgIWltcG9ydGFudDsgfVxuICAgIC50aHJlYWRzLWJvcmRlci1wdXJwbGUgeyBib3JkZXItbGVmdC1jb2xvcjogaHNsKDI3MCA3MCUgNTUlKSAhaW1wb3J0YW50OyB9XG4gICAgLnRocmVhZHMtYm9yZGVyLW9yYW5nZSB7IGJvcmRlci1sZWZ0LWNvbG9yOiBoc2woMjggMTAwJSA1NSUpICFpbXBvcnRhbnQ7IH1cblxuICAgIC8qID09PT09PT09PSBMYXlvdXQ6IGZpeGVkIHJpZ2h0IHNpZGViYXIgY29sdW1uID09PT09PT09PSAqL1xuICAgIC50Yy1zaWRlYmFyLWNvbHVtbiB7XG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICB0b3A6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgei1pbmRleDogMTAwO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICB0cmFuc2l0aW9uOiB3aWR0aCAwLjJzIGVhc2U7XG4gICAgICBmb250LWZhbWlseTogdmFyKC0tdGMtZm9udCk7XG4gICAgfVxuXG4gICAgYm9keS50Yy1wYW5lbC1vcGVuIC50Yy1zaWRlYmFyLWNvbHVtbiB7XG4gICAgICB3aWR0aDogMzgwcHg7XG4gICAgfVxuXG4gICAgYm9keS50Yy1oYXMtc2lkZWJhciBtYWluIHtcbiAgICAgIG1heC13aWR0aDogMTQ0MHB4O1xuICAgIH1cblxuICAgIGJvZHkudGMtaGFzLXNpZGViYXIgLm1haW4tY29udGVudC13cmFwcGVyIHtcbiAgICAgIG1hcmdpbi1yaWdodDogNDBweDtcbiAgICAgIHRyYW5zaXRpb246IG1hcmdpbi1yaWdodCAwLjJzIGVhc2U7XG4gICAgfVxuICAgIGJvZHkudGMtcGFuZWwtb3BlbiAubWFpbi1jb250ZW50LXdyYXBwZXIge1xuICAgICAgbWFyZ2luLXJpZ2h0OiAzODBweDtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1heC13aWR0aDogMTQwMHB4KSB7XG4gICAgICBib2R5LnRjLXBhbmVsLW9wZW4gLnRvYy1zaWRlYmFyIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gVG9nZ2xlIHN0cmlwID09PT09PT09PSAqL1xuICAgIC50Yy1zaWRlYmFyLXRvZ2dsZSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYmcpO1xuICAgICAgY29sb3I6IHZhcigtLXRjLW11dGVkLWZnKTtcbiAgICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgcGFkZGluZzogMTZweCAwIDAgMDtcbiAgICB9XG4gICAgLnRjLXNpZGViYXItdG9nZ2xlOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLWFjY2VudCk7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgIH1cblxuICAgIGJvZHkudGMtcGFuZWwtb3BlbiAudGMtc2lkZWJhci10b2dnbGUge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gUGFuZWwgPT09PT09PT09ICovXG4gICAgLnRjLXBhbmVsIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICB3aWR0aDogMzgwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1iZyk7XG4gICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGFuaW1hdGlvbjogdGMtc2xpZGUtaW4gMC4ycyBlYXNlO1xuICAgIH1cbiAgICBAa2V5ZnJhbWVzIHRjLXNsaWRlLWluIHtcbiAgICAgIGZyb20geyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7IG9wYWNpdHk6IDA7IH1cbiAgICAgIHRvIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyBvcGFjaXR5OiAxOyB9XG4gICAgfVxuICAgIC50Yy1wYW5lbF9faGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgcGFkZGluZzogMTZweCAxNnB4IDEycHg7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICB9XG4gICAgLnRjLXBhbmVsX190aXRsZSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1mZyk7XG4gICAgICBsZXR0ZXItc3BhY2luZzogLTAuMDFlbTtcbiAgICB9XG4gICAgLnRjLXBhbmVsX19oZWFkZXItYWN0aW9ucyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMnB4O1xuICAgIH1cbiAgICAudGMtcGFuZWxfX2ZpbHRlcnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogNHB4O1xuICAgICAgcGFkZGluZzogMTBweCAxNnB4O1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgfVxuICAgIC50Yy1wYW5lbF9fYm9keSB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgIHBhZGRpbmc6IDhweCAwO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBFbXB0eSBzdGF0ZSA9PT09PT09PT0gKi9cbiAgICAudGMtZW1wdHkge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgICAgcGFkZGluZzogNDhweCAyNHB4O1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gVGhyZWFkIChzaGFkY24gY2FyZCkgPT09PT09PT09ICovXG4gICAgLnRjLXRocmVhZCB7XG4gICAgICBtYXJnaW46IDAgOHB4IDZweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS10Yy1yYWRpdXMpO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLWNhcmQpO1xuICAgICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAwLjE1cztcbiAgICB9XG4gICAgLnRjLXRocmVhZDpob3ZlciB7XG4gICAgICBib3gtc2hhZG93OiAwIDFweCAzcHggMCByZ2IoMCAwIDAgLyAwLjEpLCAwIDFweCAycHggLTFweCByZ2IoMCAwIDAgLyAwLjEpO1xuICAgIH1cbiAgICAudGMtdGhyZWFkLS1mb2N1c2VkIHtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGMtcmluZyk7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAxcHggdmFyKC0tdGMtcmluZyk7XG4gICAgfVxuICAgIC50Yy10aHJlYWQtLXJlc29sdmVkIHsgb3BhY2l0eTogMC42OyB9XG4gICAgLnRjLXRocmVhZF9fcXVvdGUge1xuICAgICAgcGFkZGluZzogMTBweCAxNHB4O1xuICAgICAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgbWFyZ2luOiAxMHB4IDE0cHggMDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1tdXRlZCk7XG4gICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzO1xuICAgIH1cbiAgICAudGMtdGhyZWFkX19xdW90ZTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiBjb2xvci1taXgoaW4gc3JnYiwgdmFyKC0tdGMtbXV0ZWQpIDgwJSwgdmFyKC0tdGMtZmcpIDIwJSk7XG4gICAgfVxuICAgIC50Yy10aHJlYWRfX3F1b3RlLXRleHQge1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgY29sb3I6IHZhcigtLXRjLW11dGVkLWZnKTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuICAgIC50Yy10aHJlYWRfX2NvbW1lbnRzIHtcbiAgICAgIHBhZGRpbmc6IDJweCAwO1xuICAgIH1cbiAgICAudGMtdGhyZWFkX19yZXBseSB7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICB9XG4gICAgLnRjLXRocmVhZF9fZm9vdGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDJweDtcbiAgICAgIHBhZGRpbmc6IDZweCAxMHB4IDhweDtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBDb21tZW50ID09PT09PT09PSAqL1xuICAgIC50Yy1jb21tZW50IHtcbiAgICAgIHBhZGRpbmc6IDEwcHggMTRweDtcbiAgICB9XG4gICAgLnRjLWNvbW1lbnQgKyAudGMtY29tbWVudCB7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICB9XG4gICAgLnRjLWNvbW1lbnRfX2hlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgIH1cbiAgICAudGMtY29tbWVudF9fbWV0YSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBtaW4td2lkdGg6IDA7XG4gICAgfVxuICAgIC50Yy1jb21tZW50X19hdXRob3Ige1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1mZyk7XG4gICAgICBsaW5lLWhlaWdodDogMS4yO1xuICAgIH1cbiAgICAudGMtY29tbWVudF9fdGltZSB7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgICB9XG4gICAgLnRjLWNvbW1lbnRfX21lbnUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogMXB4O1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXM7XG4gICAgfVxuICAgIC50Yy1jb21tZW50OmhvdmVyIC50Yy1jb21tZW50X19tZW51IHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICAgIC50Yy1jb21tZW50X19ib2R5IHtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgICAgbWFyZ2luLWxlZnQ6IDM0cHg7XG4gICAgfVxuICAgIC50Yy1jb21tZW50X19ib2R5IHAgeyBtYXJnaW46IDAgMCA0cHggMDsgfVxuICAgIC50Yy1jb21tZW50X19ib2R5IHA6bGFzdC1jaGlsZCB7IG1hcmdpbi1ib3R0b206IDA7IH1cbiAgICAudGMtY29tbWVudF9fYm9keSBjb2RlIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLW11dGVkKTtcbiAgICAgIHBhZGRpbmc6IDJweCA0cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgfVxuICAgIC50Yy1jb21tZW50X19ib2R5IHByZSB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1tdXRlZCk7XG4gICAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICBvdmVyZmxvdy14OiBhdXRvO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cbiAgICAudGMtY29tbWVudF9fZm9vdGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA2cHg7XG4gICAgICBtYXJnaW4tbGVmdDogMzRweDtcbiAgICAgIG1hcmdpbi10b3A6IDRweDtcbiAgICB9XG4gICAgLnRjLWNvbW1lbnRfX2FjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogMXB4O1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBSZWFjdGlvbnMgPT09PT09PT09ICovXG4gICAgLnRjLXJlYWN0aW9ucyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgfVxuICAgIC50Yy1yZWFjdGlvbiB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDRweDtcbiAgICAgIHBhZGRpbmc6IDJweCA4cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1iZyk7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMTVzO1xuICAgIH1cbiAgICAudGMtcmVhY3Rpb246aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYWNjZW50KTtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGMtaW5wdXQpO1xuICAgIH1cbiAgICAudGMtcmVhY3Rpb24tLWFjdGl2ZSB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1hY2NlbnQpO1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Yy1mZyk7XG4gICAgfVxuICAgIC50Yy1yZWFjdGlvbl9fY291bnQge1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZyk7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IEVtb2ppIHBpY2tlciBpdGVtICh1c2VkIGluc2lkZSB3YS1wb3BvdmVyKSA9PT09PT09PT0gKi9cbiAgICAudGMtZW1vamktcGlja2VyX19pdGVtIHtcbiAgICAgIHdpZHRoOiAzMHB4O1xuICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGMtcmFkaXVzKTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xcztcbiAgICB9XG4gICAgLnRjLWVtb2ppLXBpY2tlcl9faXRlbTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1hY2NlbnQpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBDb21wb3NlID09PT09PT09PSAqL1xuICAgIC50Yy1jb21wb3NlIHtcbiAgICAgIHBhZGRpbmc6IDEwcHggMTRweDtcbiAgICB9XG4gICAgLnRjLWNvbXBvc2VfX3F1b3RlIHtcbiAgICAgIHBhZGRpbmc6IDhweCAxMnB4O1xuICAgICAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtbXV0ZWQpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZyk7XG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgIH1cbiAgICAudGMtY29tcG9zZV9fYWN0aW9ucyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiA4cHg7XG4gICAgICBtYXJnaW4tdG9wOiA4cHg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBOZXcgdGhyZWFkIGNvbXBvc2UgPT09PT09PT09ICovXG4gICAgLnRjLW5ldy10aHJlYWQge1xuICAgICAgbWFyZ2luOiAwIDhweCA2cHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGMtcmFkaXVzKTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1jYXJkKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gU2VydmVyLXJlbmRlcmVkIHRocmVhZHMgd3JhcHBlciA9PT09PT09PT0gKi9cbiAgICAudGhyZWFkcy1zaWRlYmFyIHtcbiAgICAgIG1hcmdpbjogMjRweCAwIDhweDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgZ2FwOiAxMnB4O1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBTZXJ2ZXItcmVuZGVyZWQgdGhyZWFkIGNhcmQgPT09PT09PT09ICovXG4gICAgLnRocmVhZHMtdGhyZWFkIHtcbiAgICAgIG1hcmdpbjogMTJweCAwO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgdmFyKC0tdGMtcmluZyk7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS10Yy1yYWRpdXMpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtY2FyZCk7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgZm9udC1mYW1pbHk6IHZhcigtLXRjLWZvbnQpO1xuICAgICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAwLjE1cztcbiAgICB9XG4gICAgLnRocmVhZHMtdGhyZWFkOmhvdmVyIHtcbiAgICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYigwIDAgMCAvIDAuMDgpLCAwIDFweCAycHggLTFweCByZ2IoMCAwIDAgLyAwLjA4KTtcbiAgICB9XG4gICAgLnRocmVhZHMtdGhyZWFkLS1yZXNvbHZlZCB7XG4gICAgICBvcGFjaXR5OiAwLjU1O1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBTZXJ2ZXItcmVuZGVyZWQgY29tbWVudCA9PT09PT09PT0gKi9cbiAgICAudGhyZWFkcy1jb21tZW50IHtcbiAgICAgIHBhZGRpbmc6IDEwcHggMTRweDtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB9XG4gICAgLnRocmVhZHMtY29tbWVudCArIC50aHJlYWRzLWNvbW1lbnQge1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgfVxuICAgIC50aHJlYWRzLWNvbW1lbnRfX21ldGEge1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgY29sb3I6IHZhcigtLXRjLW11dGVkLWZnKTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICB9XG4gICAgLnRocmVhZHMtY29tbWVudF9fbWV0YSBzdHJvbmcge1xuICAgICAgY29sb3I6IHZhcigtLXRjLWZnKTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuICAgIC50aHJlYWRzLWNvbW1lbnRfX2JvZHkge1xuICAgICAgY29sb3I6IHZhcigtLXRjLWZnKTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgfVxuICAgIC50aHJlYWRzLWNvbW1lbnRfX2JvZHkgPiA6Zmlyc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICB9XG4gICAgLnRocmVhZHMtY29tbWVudF9fYm9keSA+IDpsYXN0LWNoaWxkIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IFRocmVhZCBmb290ZXIgJiByZXBseSBidXR0b24gPT09PT09PT09ICovXG4gICAgLnRocmVhZHMtdGhyZWFkX19mb290ZXIge1xuICAgICAgcGFkZGluZzogNnB4IDE0cHggOHB4O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgfVxuICAgIC50aHJlYWRzLXJlcGx5LWJ0biB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDVweDtcbiAgICAgIHBhZGRpbmc6IDRweCAxMHB4O1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgICAgZm9udC1mYW1pbHk6IHZhcigtLXRjLWZvbnQpO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cywgYmFja2dyb3VuZCAwLjE1cztcbiAgICB9XG4gICAgLnRocmVhZHMtcmVwbHktYnRuOmhvdmVyIHtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1mZyk7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1tdXRlZCk7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IFNlcnZlci1yZW5kZXJlZCByZWFjdGlvbnMgPT09PT09PT09ICovXG4gICAgLnRocmVhZHMtcmVhY3Rpb25zIHtcbiAgICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICB9XG4gICAgLnRocmVhZHMtcmVhY3Rpb25zIHVsIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBnYXA6IDZweDtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIH1cbiAgICAudGhyZWFkcy1yZWFjdGlvbnMgbGkge1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBwYWRkaW5nOiA0cHggMTBweCA0cHggOHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtbXV0ZWQpO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzLCBib3JkZXItY29sb3IgMC4xNXM7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICB9XG4gICAgLnRocmVhZHMtcmVhY3Rpb25zIGxpOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLWFjY2VudCk7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLXRjLWlucHV0KTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gSGVhZGluZyBkaXNjdXNzaW9uIGJ1dHRvbiAoaGlkZGVuKSA9PT09PT09PT0gKi9cbiAgICAudGhyZWFkcy1oZWFkaW5nLWRpc2N1c3MgeyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cbiAgICAudGhyZWFkcy1oZWFkaW5nLWRpc2N1c3MtT0ZGIHtcbiAgICAgIGZsb2F0OiByaWdodDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNHB4O1xuICAgICAgcGFkZGluZzogMnB4IDhweDtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cywgYmFja2dyb3VuZCAwLjE1cztcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgfVxuICAgICo6aG92ZXIgPiAudGhyZWFkcy1oZWFkaW5nLWRpc2N1c3Mge1xuICAgICAgY29sb3I6IHZhcigtLXRjLW11dGVkLWZnKTtcbiAgICB9XG4gICAgLnRocmVhZHMtaGVhZGluZy1kaXNjdXNzOmhvdmVyIHtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1hY2NlbnQtZmcpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYWNjZW50KTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gTmV3IFRocmVhZCBidXR0b24gPT09PT09PT09ICovXG4gICAgLnRocmVhZHMtbmV3LXRocmVhZC1idG4ge1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA2cHg7XG4gICAgICBwYWRkaW5nOiA2cHggMTRweDtcbiAgICAgIG1hcmdpbjogOHB4IDAgMTZweDtcbiAgICAgIGZvbnQtZmFtaWx5OiB2YXIoLS10Yy1mb250KTtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtY2FyZCk7XG4gICAgICBib3JkZXI6IDFweCBkYXNoZWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cywgYm9yZGVyLWNvbG9yIDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzO1xuICAgIH1cbiAgICAudGhyZWFkcy1uZXctdGhyZWFkLWJ0bjpob3ZlciB7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Yy1mZyk7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1tdXRlZCk7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IFRocmVhZCBmbGFzaCBhbmltYXRpb24gKG9uIGhpZ2hsaWdodCBjbGljaykgPT09PT09PT09ICovXG4gICAgLnRocmVhZHMtdGhyZWFkLS1mbGFzaCB7XG4gICAgICBhbmltYXRpb246IHRjLWZsYXNoIDJzIGVhc2Utb3V0O1xuICAgIH1cbiAgICBAa2V5ZnJhbWVzIHRjLWZsYXNoIHtcbiAgICAgIDAlICAgeyBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGMtcmluZyk7IG91dGxpbmUtb2Zmc2V0OiA0cHg7IH1cbiAgICAgIDEwMCUgeyBvdXRsaW5lOiAycHggc29saWQgdHJhbnNwYXJlbnQ7IG91dGxpbmUtb2Zmc2V0OiA4cHg7IH1cbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gSGlkZSBzaWRlYmFyIChkaXNhYmxlZCBmb3Igbm93KSA9PT09PT09PT0gKi9cbiAgICAudGMtc2lkZWJhci1jb2x1bW4geyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cbiAgICAudGMtaGFzLXNpZGViYXIgeyBwYWRkaW5nLXJpZ2h0OiAwICFpbXBvcnRhbnQ7IH1cbiAgYDtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG4iLCAiaW1wb3J0IHsgaW5qZWN0Q29tcG9uZW50U3R5bGVzIH0gZnJvbSAnLi4vY29tcG9uZW50cy9zdHlsZXMudHMnO1xuXG5jb25zdCBUSEVNRV9TVFlMRV9JRCA9ICd0aHJlYWRzLXRoZW1lLWJyaWRnZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0VGhlbWVCcmlkZ2UoKTogdm9pZCB7XG4gIGluamVjdFRoZW1lQ1NTKCk7XG4gIHN5bmNEYXJrTW9kZSgpO1xuICBvYnNlcnZlVGhlbWVDaGFuZ2VzKCk7XG4gIGluamVjdENvbXBvbmVudFN0eWxlcygpO1xufVxuXG5mdW5jdGlvbiBpbmplY3RUaGVtZUNTUygpOiB2b2lkIHtcbiAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFRIRU1FX1NUWUxFX0lEKSkgcmV0dXJuO1xuXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUuaWQgPSBUSEVNRV9TVFlMRV9JRDtcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG4gICAgOnJvb3Qge1xuICAgICAgLS13YS1jb2xvci1zdXJmYWNlLWRlZmF1bHQ6IHZhcigtLXRjLWJnLCBoc2woMCAwJSAxMDAlKSk7XG4gICAgICAtLXdhLWNvbG9yLXN1cmZhY2UtcmFpc2VkOiB2YXIoLS10Yy1tdXRlZCwgaHNsKDAgMCUgOTYuMSUpKTtcbiAgICAgIC0td2EtY29sb3Itc3VyZmFjZS1ib3JkZXI6IHZhcigtLXRjLWJvcmRlciwgaHNsKDAgMCUgODkuOCUpKTtcbiAgICAgIC0td2EtY29sb3ItdGV4dC1ub3JtYWw6IHZhcigtLXRjLWZnLCBoc2woMCAwJSA5JSkpO1xuICAgICAgLS13YS1jb2xvci10ZXh0LXF1aWV0OiB2YXIoLS10Yy1tdXRlZC1mZywgaHNsKDAgMCUgNDUuMSUpKTtcbiAgICAgIC0td2EtY29sb3ItdGV4dC1saW5rOiB2YXIoLS10Yy1mZywgaHNsKDAgMCUgOSUpKTtcbiAgICAgIC0td2EtY29sb3ItYnJhbmQtZmlsbC1sb3VkOiB2YXIoLS10Yy1mZywgaHNsKDAgMCUgOSUpKTtcbiAgICAgIC0td2EtY29sb3ItYnJhbmQtb24tbG91ZDogaHNsKDAgMCUgOTglKTtcbiAgICAgIC0td2EtY29sb3ItZm9jdXM6IHZhcigtLXRjLXJpbmcsIGhzbCgwIDAlIDklKSk7XG4gICAgICAtLXdhLWZvbnQtc2FuczogdmFyKC0tdGMtZm9udCwgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgc2Fucy1zZXJpZik7XG4gICAgICAtLXdhLWZvbnQtbW9ubzogdmFyKC0tZm9udC1mYW1pbHktbW9ubywgU0ZNb25vLVJlZ3VsYXIsIENvbnNvbGFzLCBNZW5sbywgbW9ub3NwYWNlKTtcbiAgICB9XG5cbiAgICAudGhyZWFkcy1oaWdobGlnaHQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDQ4IDk2JSA4OSUgLyAwLjUpO1xuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGhzbCg0OCA5NiUgNTMlIC8gMC42KTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4xNXM7XG4gICAgICBib3JkZXItcmFkaXVzOiAxcHg7XG4gICAgfVxuICAgIC50aHJlYWRzLWhpZ2hsaWdodDpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woNDggOTYlIDg5JSAvIDAuOCk7XG4gICAgfVxuICAgIC50aHJlYWRzLWhpZ2hsaWdodC0tcmVzb2x2ZWQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDE0MiA3NiUgMzYlIC8gMC4xKTtcbiAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IGhzbCgxNDIgNzYlIDM2JSAvIDAuMyk7XG4gICAgfVxuICAgIC50aHJlYWRzLWhpZ2hsaWdodC0tcmVzb2x2ZWQ6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDE0MiA3NiUgMzYlIC8gMC4yKTtcbiAgICB9XG4gICAgLnRocmVhZHMtaGlnaGxpZ2h0LS1mbGFzaCB7XG4gICAgICBhbmltYXRpb246IHRocmVhZHMtZmxhc2ggMC44cyBlYXNlLW91dDtcbiAgICB9XG4gICAgQGtleWZyYW1lcyB0aHJlYWRzLWZsYXNoIHtcbiAgICAgIDAlLCA0MCUgeyBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woNDggOTYlIDUzJSAvIDAuNSk7IH1cbiAgICAgIDEwMCUgeyBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woNDggOTYlIDg5JSAvIDAuNSk7IH1cbiAgICB9XG4gIGA7XG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5mdW5jdGlvbiBzeW5jRGFya01vZGUoKTogdm9pZCB7XG4gIGNvbnN0IGlzRGFyayA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnKSA9PT0gJ2RhcmsnO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnd2EtZGFyaycsIGlzRGFyayk7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCd3YS1saWdodCcsICFpc0RhcmspO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlVGhlbWVDaGFuZ2VzKCk6IHZvaWQge1xuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHN5bmNEYXJrTW9kZSgpKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogWydkYXRhLXRoZW1lJ10sXG4gIH0pO1xufVxuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2ludGVybmFsL3ZhbGlkYXRvcnMvbWlycm9yLXZhbGlkYXRvci50c1xudmFyIE1pcnJvclZhbGlkYXRvciA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBjaGVja1ZhbGlkaXR5KGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGZvcm1Db250cm9sID0gZWxlbWVudC5pbnB1dDtcbiAgICAgIGNvbnN0IHZhbGlkaXR5ID0ge1xuICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgICBpc1ZhbGlkOiB0cnVlLFxuICAgICAgICBpbnZhbGlkS2V5czogW11cbiAgICAgIH07XG4gICAgICBpZiAoIWZvcm1Db250cm9sKSB7XG4gICAgICAgIHJldHVybiB2YWxpZGl0eTtcbiAgICAgIH1cbiAgICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgIGlmIChcImNoZWNrVmFsaWRpdHlcIiBpbiBmb3JtQ29udHJvbCkge1xuICAgICAgICBpc1ZhbGlkID0gZm9ybUNvbnRyb2wuY2hlY2tWYWxpZGl0eSgpO1xuICAgICAgfVxuICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkaXR5O1xuICAgICAgfVxuICAgICAgdmFsaWRpdHkuaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgaWYgKFwidmFsaWRhdGlvbk1lc3NhZ2VcIiBpbiBmb3JtQ29udHJvbCkge1xuICAgICAgICB2YWxpZGl0eS5tZXNzYWdlID0gZm9ybUNvbnRyb2wudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgICB9XG4gICAgICBpZiAoIShcInZhbGlkaXR5XCIgaW4gZm9ybUNvbnRyb2wpKSB7XG4gICAgICAgIHZhbGlkaXR5LmludmFsaWRLZXlzLnB1c2goXCJjdXN0b21FcnJvclwiKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkaXR5O1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybUNvbnRyb2wudmFsaWRpdHkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gXCJ2YWxpZFwiKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2hlY2tlZEtleSA9IGtleTtcbiAgICAgICAgaWYgKGZvcm1Db250cm9sLnZhbGlkaXR5W2NoZWNrZWRLZXldKSB7XG4gICAgICAgICAgdmFsaWRpdHkuaW52YWxpZEtleXMucHVzaChjaGVja2VkS2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbGlkaXR5O1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydCB7XG4gIE1pcnJvclZhbGlkYXRvclxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9ldmVudHMvaW52YWxpZC50c1xudmFyIFdhSW52YWxpZEV2ZW50ID0gY2xhc3MgZXh0ZW5kcyBFdmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFwid2EtaW52YWxpZFwiLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IGZhbHNlLCBjb21wb3NlZDogdHJ1ZSB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgV2FJbnZhbGlkRXZlbnRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX3R5cGVFcnJvciA9IChtc2cpID0+IHtcbiAgdGhyb3cgVHlwZUVycm9yKG1zZyk7XG59O1xudmFyIF9fZGVjb3JhdGVDbGFzcyA9IChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwga2luZCkgPT4ge1xuICB2YXIgcmVzdWx0ID0ga2luZCA+IDEgPyB2b2lkIDAgOiBraW5kID8gX19nZXRPd25Qcm9wRGVzYyh0YXJnZXQsIGtleSkgOiB0YXJnZXQ7XG4gIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDEsIGRlY29yYXRvcjsgaSA+PSAwOyBpLS0pXG4gICAgaWYgKGRlY29yYXRvciA9IGRlY29yYXRvcnNbaV0pXG4gICAgICByZXN1bHQgPSAoa2luZCA/IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcmVzdWx0KSA6IGRlY29yYXRvcihyZXN1bHQpKSB8fCByZXN1bHQ7XG4gIGlmIChraW5kICYmIHJlc3VsdCkgX19kZWZQcm9wKHRhcmdldCwga2V5LCByZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2FjY2Vzc0NoZWNrID0gKG9iaiwgbWVtYmVyLCBtc2cpID0+IG1lbWJlci5oYXMob2JqKSB8fCBfX3R5cGVFcnJvcihcIkNhbm5vdCBcIiArIG1zZyk7XG52YXIgX19wcml2YXRlR2V0ID0gKG9iaiwgbWVtYmVyLCBnZXR0ZXIpID0+IChfX2FjY2Vzc0NoZWNrKG9iaiwgbWVtYmVyLCBcInJlYWQgZnJvbSBwcml2YXRlIGZpZWxkXCIpLCBnZXR0ZXIgPyBnZXR0ZXIuY2FsbChvYmopIDogbWVtYmVyLmdldChvYmopKTtcbnZhciBfX3ByaXZhdGVBZGQgPSAob2JqLCBtZW1iZXIsIHZhbHVlKSA9PiBtZW1iZXIuaGFzKG9iaikgPyBfX3R5cGVFcnJvcihcIkNhbm5vdCBhZGQgdGhlIHNhbWUgcHJpdmF0ZSBtZW1iZXIgbW9yZSB0aGFuIG9uY2VcIikgOiBtZW1iZXIgaW5zdGFuY2VvZiBXZWFrU2V0ID8gbWVtYmVyLmFkZChvYmopIDogbWVtYmVyLnNldChvYmosIHZhbHVlKTtcbnZhciBfX3ByaXZhdGVTZXQgPSAob2JqLCBtZW1iZXIsIHZhbHVlLCBzZXR0ZXIpID0+IChfX2FjY2Vzc0NoZWNrKG9iaiwgbWVtYmVyLCBcIndyaXRlIHRvIHByaXZhdGUgZmllbGRcIiksIHNldHRlciA/IHNldHRlci5jYWxsKG9iaiwgdmFsdWUpIDogbWVtYmVyLnNldChvYmosIHZhbHVlKSwgdmFsdWUpO1xuXG5leHBvcnQge1xuICBfX2RlY29yYXRlQ2xhc3MsXG4gIF9fcHJpdmF0ZUdldCxcbiAgX19wcml2YXRlQWRkLFxuICBfX3ByaXZhdGVTZXRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuaW1wb3J0IHtcbiAgX19kZWNvcmF0ZUNsYXNzLFxuICBfX3ByaXZhdGVBZGQsXG4gIF9fcHJpdmF0ZUdldCxcbiAgX19wcml2YXRlU2V0XG59IGZyb20gXCIuL2NodW5rLjdWR0NJSERHLmpzXCI7XG5cbi8vIHNyYy9pbnRlcm5hbC93ZWJhd2Vzb21lLWVsZW1lbnQudHNcbmltcG9ydCB7IExpdEVsZW1lbnQsIGlzU2VydmVyIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHsgcHJvcGVydHkgfSBmcm9tIFwibGl0L2RlY29yYXRvcnMuanNcIjtcblxuLy8gc3JjL3N0eWxlcy9jb21wb25lbnQvaG9zdC5zdHlsZXMudHNcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJsaXRcIjtcbnZhciBob3N0X3N0eWxlc19kZWZhdWx0ID0gY3NzYFxuICA6aG9zdCB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgfVxuXG4gIDpob3N0ICosXG4gIDpob3N0ICo6OmJlZm9yZSxcbiAgOmhvc3QgKjo6YWZ0ZXIge1xuICAgIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gIH1cblxuICBbaGlkZGVuXSB7XG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICB9XG5gO1xuXG4vLyBzcmMvaW50ZXJuYWwvd2ViYXdlc29tZS1lbGVtZW50LnRzXG52YXIgX2hhc1JlY29yZGVkSW5pdGlhbFByb3BlcnRpZXM7XG52YXIgV2ViQXdlc29tZUVsZW1lbnQgPSBjbGFzcyBleHRlbmRzIExpdEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIF9fcHJpdmF0ZUFkZCh0aGlzLCBfaGFzUmVjb3JkZWRJbml0aWFsUHJvcGVydGllcywgZmFsc2UpO1xuICAgIHRoaXMuaW5pdGlhbFJlZmxlY3RlZFByb3BlcnRpZXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICAgIHRoaXMuZGlkU1NSID0gaXNTZXJ2ZXIgfHwgQm9vbGVhbih0aGlzLnNoYWRvd1Jvb3QpO1xuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbCBNZXRob2RzIGZvciBzZXR0aW5nIGFuZCBjaGVja2luZyBjdXN0b20gc3RhdGVzLlxuICAgICAqL1xuICAgIHRoaXMuY3VzdG9tU3RhdGVzID0ge1xuICAgICAgLyoqIEFkZHMgb3IgcmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGN1c3RvbSBzdGF0ZS4gKi9cbiAgICAgIHNldDogKGN1c3RvbVN0YXRlLCBhY3RpdmUpID0+IHtcbiAgICAgICAgaWYgKCFCb29sZWFuKHRoaXMuaW50ZXJuYWxzPy5zdGF0ZXMpKSByZXR1cm47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5pbnRlcm5hbHMuc3RhdGVzLmFkZChjdXN0b21TdGF0ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxzLnN0YXRlcy5kZWxldGUoY3VzdG9tU3RhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChTdHJpbmcoZSkuaW5jbHVkZXMoXCJtdXN0IHN0YXJ0IHdpdGggJy0tJ1wiKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIllvdXIgYnJvd3NlciBpbXBsZW1lbnRzIGFuIG91dGRhdGVkIHZlcnNpb24gb2YgQ3VzdG9tU3RhdGVTZXQuIENvbnNpZGVyIHVzaW5nIGEgcG9seWZpbGxcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLyoqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlIGVsZW1lbnQgY3VycmVudGx5IGhhcyB0aGUgc3BlY2lmaWVkIHN0YXRlLiAqL1xuICAgICAgaGFzOiAoY3VzdG9tU3RhdGUpID0+IHtcbiAgICAgICAgaWYgKCFCb29sZWFuKHRoaXMuaW50ZXJuYWxzPy5zdGF0ZXMpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxzLnN0YXRlcy5oYXMoY3VzdG9tU3RhdGUpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmludGVybmFscyA9IHRoaXMuYXR0YWNoSW50ZXJuYWxzKCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRWxlbWVudCBpbnRlcm5hbHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBicm93c2VyLiBDb25zaWRlciB1c2luZyBhIHBvbHlmaWxsXCIpO1xuICAgIH1cbiAgICB0aGlzLmN1c3RvbVN0YXRlcy5zZXQoXCJ3YS1kZWZpbmVkXCIsIHRydWUpO1xuICAgIGxldCBTZWxmID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICBmb3IgKGxldCBbcHJvcGVydHkyLCBzcGVjXSBvZiBTZWxmLmVsZW1lbnRQcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAoc3BlYy5kZWZhdWx0ID09PSBcImluaGVyaXRcIiAmJiBzcGVjLmluaXRpYWwgIT09IHZvaWQgMCAmJiB0eXBlb2YgcHJvcGVydHkyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tU3RhdGVzLnNldChgaW5pdGlhbC0ke3Byb3BlcnR5Mn0tJHtzcGVjLmluaXRpYWx9YCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKiBQcmVwZW5kcyBob3N0IHN0eWxlcyB0byB0aGUgY29tcG9uZW50J3Mgc3R5bGVzLiAqL1xuICBzdGF0aWMgZ2V0IHN0eWxlcygpIHtcbiAgICBjb25zdCBzdHlsZXMgPSBBcnJheS5pc0FycmF5KHRoaXMuY3NzKSA/IHRoaXMuY3NzIDogdGhpcy5jc3MgPyBbdGhpcy5jc3NdIDogW107XG4gICAgcmV0dXJuIFtob3N0X3N0eWxlc19kZWZhdWx0LCAuLi5zdHlsZXNdO1xuICB9XG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAoIV9fcHJpdmF0ZUdldCh0aGlzLCBfaGFzUmVjb3JkZWRJbml0aWFsUHJvcGVydGllcykpIHtcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuZWxlbWVudFByb3BlcnRpZXMuZm9yRWFjaChcbiAgICAgICAgKG9iaiwgcHJvcCkgPT4ge1xuICAgICAgICAgIGlmIChvYmoucmVmbGVjdCAmJiB0aGlzW3Byb3BdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbFJlZmxlY3RlZFByb3BlcnRpZXMuc2V0KHByb3AsIHRoaXNbcHJvcF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIF9fcHJpdmF0ZVNldCh0aGlzLCBfaGFzUmVjb3JkZWRJbml0aWFsUHJvcGVydGllcywgdHJ1ZSk7XG4gICAgfVxuICAgIHN1cGVyLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICB9XG4gIHdpbGxVcGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICBzdXBlci53aWxsVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICB0aGlzLmluaXRpYWxSZWZsZWN0ZWRQcm9wZXJ0aWVzLmZvckVhY2goKHZhbHVlLCBwcm9wKSA9PiB7XG4gICAgICBpZiAoY2hhbmdlZFByb3BlcnRpZXMuaGFzKHByb3ApICYmIHRoaXNbcHJvcF0gPT0gbnVsbCkge1xuICAgICAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZmlyc3RVcGRhdGVkKGNoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgc3VwZXIuZmlyc3RVcGRhdGVkKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICBpZiAodGhpcy5kaWRTU1IpIHtcbiAgICAgIHRoaXMuc2hhZG93Um9vdD8ucXVlcnlTZWxlY3RvckFsbChcInNsb3RcIikuZm9yRWFjaCgoc2xvdEVsZW1lbnQpID0+IHtcbiAgICAgICAgc2xvdEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJzbG90Y2hhbmdlXCIsIHsgYnViYmxlczogdHJ1ZSwgY29tcG9zZWQ6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSB9KSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgdXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN1cGVyLnVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKHRoaXMuZGlkU1NSICYmICF0aGlzLmhhc1VwZGF0ZWQpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoXCJsaXQtaHlkcmF0aW9uLWVycm9yXCIsIHsgYnViYmxlczogdHJ1ZSwgY29tcG9zZWQ6IHRydWUsIGNhbmNlbGFibGU6IGZhbHNlIH0pO1xuICAgICAgICBldmVudC5lcnJvciA9IGU7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB9XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQGludGVybmFsIEdpdmVuIGEgbmF0aXZlIGV2ZW50LCB0aGlzIGZ1bmN0aW9uIGNhbmNlbHMgaXQgYW5kIGRpc3BhdGNoZXMgaXQgYWdhaW4gZnJvbSB0aGUgaG9zdCBlbGVtZW50IHVzaW5nIHRoZSBkZXNpcmVkXG4gICAqIGV2ZW50IG9wdGlvbnMuXG4gICAqL1xuICByZWxheU5hdGl2ZUV2ZW50KGV2ZW50LCBldmVudE9wdGlvbnMpIHtcbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgZXZlbnQuY29uc3RydWN0b3IoZXZlbnQudHlwZSwge1xuICAgICAgICAuLi5ldmVudCxcbiAgICAgICAgLi4uZXZlbnRPcHRpb25zXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn07XG5faGFzUmVjb3JkZWRJbml0aWFsUHJvcGVydGllcyA9IG5ldyBXZWFrTWFwKCk7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXZWJBd2Vzb21lRWxlbWVudC5wcm90b3R5cGUsIFwiZGlyXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2ViQXdlc29tZUVsZW1lbnQucHJvdG90eXBlLCBcImxhbmdcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4sIHJlZmxlY3Q6IHRydWUsIGF0dHJpYnV0ZTogXCJkaWQtc3NyXCIgfSlcbl0sIFdlYkF3ZXNvbWVFbGVtZW50LnByb3RvdHlwZSwgXCJkaWRTU1JcIiwgMik7XG5cbmV4cG9ydCB7XG4gIFdlYkF3ZXNvbWVFbGVtZW50XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cbmltcG9ydCB7XG4gIFdhSW52YWxpZEV2ZW50XG59IGZyb20gXCIuL2NodW5rLlZDM0JQVVpKLmpzXCI7XG5pbXBvcnQge1xuICBXZWJBd2Vzb21lRWxlbWVudFxufSBmcm9tIFwiLi9jaHVuay5FUEhIV1hLMi5qc1wiO1xuaW1wb3J0IHtcbiAgX19kZWNvcmF0ZUNsYXNzXG59IGZyb20gXCIuL2NodW5rLjdWR0NJSERHLmpzXCI7XG5cbi8vIHNyYy9pbnRlcm5hbC93ZWJhd2Vzb21lLWZvcm0tYXNzb2NpYXRlZC1lbGVtZW50LnRzXG5pbXBvcnQgeyBpc1NlcnZlciB9IGZyb20gXCJsaXRcIjtcbmltcG9ydCB7IHByb3BlcnR5IH0gZnJvbSBcImxpdC9kZWNvcmF0b3JzLmpzXCI7XG5cbi8vIHNyYy9pbnRlcm5hbC92YWxpZGF0b3JzL2N1c3RvbS1lcnJvci12YWxpZGF0b3IudHNcbnZhciBDdXN0b21FcnJvclZhbGlkYXRvciA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvYnNlcnZlZEF0dHJpYnV0ZXM6IFtcImN1c3RvbS1lcnJvclwiXSxcbiAgICBjaGVja1ZhbGlkaXR5KGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHZhbGlkaXR5ID0ge1xuICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgICBpc1ZhbGlkOiB0cnVlLFxuICAgICAgICBpbnZhbGlkS2V5czogW11cbiAgICAgIH07XG4gICAgICBpZiAoZWxlbWVudC5jdXN0b21FcnJvcikge1xuICAgICAgICB2YWxpZGl0eS5tZXNzYWdlID0gZWxlbWVudC5jdXN0b21FcnJvcjtcbiAgICAgICAgdmFsaWRpdHkuaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICB2YWxpZGl0eS5pbnZhbGlkS2V5cyA9IFtcImN1c3RvbUVycm9yXCJdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbGlkaXR5O1xuICAgIH1cbiAgfTtcbn07XG5cbi8vIHNyYy9pbnRlcm5hbC93ZWJhd2Vzb21lLWZvcm0tYXNzb2NpYXRlZC1lbGVtZW50LnRzXG52YXIgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgV2ViQXdlc29tZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVxdWlyZWQgPSBmYWxzZTtcbiAgICB0aGlzLmFzc3VtZUludGVyYWN0aW9uT24gPSBbXCJpbnB1dFwiXTtcbiAgICB0aGlzLnZhbGlkYXRvcnMgPSBbXTtcbiAgICB0aGlzLnZhbHVlSGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHRoaXMuaGFzSW50ZXJhY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuY3VzdG9tRXJyb3IgPSBudWxsO1xuICAgIHRoaXMuZW1pdHRlZEV2ZW50cyA9IFtdO1xuICAgIHRoaXMuZW1pdEludmFsaWQgPSAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSByZXR1cm47XG4gICAgICB0aGlzLmhhc0ludGVyYWN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBXYUludmFsaWRFdmVudCgpKTtcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlSW50ZXJhY3Rpb24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGVtaXR0ZWRFdmVudHMgPSB0aGlzLmVtaXR0ZWRFdmVudHM7XG4gICAgICBpZiAoIWVtaXR0ZWRFdmVudHMuaW5jbHVkZXMoZXZlbnQudHlwZSkpIHtcbiAgICAgICAgZW1pdHRlZEV2ZW50cy5wdXNoKGV2ZW50LnR5cGUpO1xuICAgICAgfVxuICAgICAgaWYgKGVtaXR0ZWRFdmVudHMubGVuZ3RoID09PSB0aGlzLmFzc3VtZUludGVyYWN0aW9uT24/Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLmhhc0ludGVyYWN0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG4gICAgaWYgKCFpc1NlcnZlcikge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLCB0aGlzLmVtaXRJbnZhbGlkKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFZhbGlkYXRvcnMgYXJlIHN0YXRpYyBiZWNhdXNlIHRoZXkgaGF2ZSBgb2JzZXJ2ZWRBdHRyaWJ1dGVzYCwgZXNzZW50aWFsbHkgYXR0cmlidXRlcyB0byBcIndhdGNoXCJcbiAgICogZm9yIGNoYW5nZXMuIFdoZW5ldmVyIHRoZXNlIGF0dHJpYnV0ZXMgY2hhbmdlLCB3ZSB3YW50IHRvIGJlIG5vdGlmaWVkIGFuZCB1cGRhdGUgdGhlIHZhbGlkYXRvci5cbiAgICovXG4gIHN0YXRpYyBnZXQgdmFsaWRhdG9ycygpIHtcbiAgICByZXR1cm4gW0N1c3RvbUVycm9yVmFsaWRhdG9yKCldO1xuICB9XG4gIC8vIEFwcGVuZCBhbGwgVmFsaWRhdG9yIFwib2JzZXJ2ZWRBdHRyaWJ1dGVzXCIgaW50byB0aGUgXCJvYnNlcnZlZEF0dHJpYnV0ZXNcIiBzbyB0aGV5IGNhbiBydW4uXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIGNvbnN0IHBhcmVudEF0dHJzID0gbmV3IFNldChzdXBlci5vYnNlcnZlZEF0dHJpYnV0ZXMgfHwgW10pO1xuICAgIGZvciAoY29uc3QgdmFsaWRhdG9yIG9mIHRoaXMudmFsaWRhdG9ycykge1xuICAgICAgaWYgKCF2YWxpZGF0b3Iub2JzZXJ2ZWRBdHRyaWJ1dGVzKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBhdHRyIG9mIHZhbGlkYXRvci5vYnNlcnZlZEF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcGFyZW50QXR0cnMuYWRkKGF0dHIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWy4uLnBhcmVudEF0dHJzXTtcbiAgfVxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHRoaXMudXBkYXRlVmFsaWRpdHkoKTtcbiAgICB0aGlzLmFzc3VtZUludGVyYWN0aW9uT24uZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5oYW5kbGVJbnRlcmFjdGlvbik7XG4gICAgfSk7XG4gIH1cbiAgZmlyc3RVcGRhdGVkKC4uLmFyZ3MpIHtcbiAgICBzdXBlci5maXJzdFVwZGF0ZWQoLi4uYXJncyk7XG4gICAgdGhpcy51cGRhdGVWYWxpZGl0eSgpO1xuICB9XG4gIHdpbGxVcGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICBpZiAoIWlzU2VydmVyICYmIGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcImN1c3RvbUVycm9yXCIpKSB7XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRXJyb3IpIHtcbiAgICAgICAgdGhpcy5jdXN0b21FcnJvciA9IG51bGw7XG4gICAgICB9XG4gICAgICB0aGlzLnNldEN1c3RvbVZhbGlkaXR5KHRoaXMuY3VzdG9tRXJyb3IgfHwgXCJcIik7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VkUHJvcGVydGllcy5oYXMoXCJ2YWx1ZVwiKSB8fCBjaGFuZ2VkUHJvcGVydGllcy5oYXMoXCJkaXNhYmxlZFwiKSB8fCBjaGFuZ2VkUHJvcGVydGllcy5oYXMoXCJkZWZhdWx0VmFsdWVcIikpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBpZiAodGhpcy5uYW1lKSB7XG4gICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhbCBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKHRoaXMubmFtZSwgdmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zZXRWYWx1ZShmb3JtRGF0YSwgZm9ybURhdGEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFZhbHVlKHZhbHVlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjaGFuZ2VkUHJvcGVydGllcy5oYXMoXCJkaXNhYmxlZFwiKSkge1xuICAgICAgdGhpcy5jdXN0b21TdGF0ZXMuc2V0KFwiZGlzYWJsZWRcIiwgdGhpcy5kaXNhYmxlZCk7XG4gICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSB8fCAhaXNTZXJ2ZXIgJiYgIXRoaXMubWF0Y2hlcyhcIjpkaXNhYmxlZFwiKSkge1xuICAgICAgICB0aGlzLnRvZ2dsZUF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRoaXMuZGlzYWJsZWQpO1xuICAgICAgfVxuICAgIH1cbiAgICBzdXBlci53aWxsVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICB0aGlzLnVwZGF0ZVZhbGlkaXR5KCk7XG4gIH1cbiAgZ2V0IGxhYmVscygpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMubGFiZWxzO1xuICB9XG4gIGdldEZvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxzLmZvcm07XG4gIH1cbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQsIGZvcm0gY29udHJvbHMgYXJlIGFzc29jaWF0ZWQgd2l0aCB0aGUgbmVhcmVzdCBjb250YWluaW5nIGA8Zm9ybT5gIGVsZW1lbnQuIFRoaXMgYXR0cmlidXRlIGFsbG93cyB5b3VcbiAgICogdG8gcGxhY2UgdGhlIGZvcm0gY29udHJvbCBvdXRzaWRlIG9mIGEgZm9ybSBhbmQgYXNzb2NpYXRlIGl0IHdpdGggdGhlIGZvcm0gdGhhdCBoYXMgdGhpcyBgaWRgLiBUaGUgZm9ybSBtdXN0IGJlIGluXG4gICAqIHRoZSBzYW1lIGRvY3VtZW50IG9yIHNoYWRvdyByb290IGZvciB0aGlzIHRvIHdvcmsuXG4gICAqL1xuICBzZXQgZm9ybSh2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImZvcm1cIiwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoXCJmb3JtXCIpO1xuICAgIH1cbiAgfVxuICBnZXQgZm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMuZm9ybTtcbiAgfVxuICBnZXQgdmFsaWRpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxzLnZhbGlkaXR5O1xuICB9XG4gIC8vIE5vdCBzdXJlIGlmIHRoaXMgc3VwcG9ydHMgYG5vdmFsaWRhdGVgLiBXaWxsIG5lZWQgdG8gdGVzdC5cbiAgZ2V0IHdpbGxWYWxpZGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMud2lsbFZhbGlkYXRlO1xuICB9XG4gIGdldCB2YWxpZGF0aW9uTWVzc2FnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMudmFsaWRhdGlvbk1lc3NhZ2U7XG4gIH1cbiAgY2hlY2tWYWxpZGl0eSgpIHtcbiAgICB0aGlzLnVwZGF0ZVZhbGlkaXR5KCk7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxzLmNoZWNrVmFsaWRpdHkoKTtcbiAgfVxuICByZXBvcnRWYWxpZGl0eSgpIHtcbiAgICB0aGlzLnVwZGF0ZVZhbGlkaXR5KCk7XG4gICAgdGhpcy5oYXNJbnRlcmFjdGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMucmVwb3J0VmFsaWRpdHkoKTtcbiAgfVxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhpcyB0byBjaGFuZ2Ugd2hlcmUgY29uc3RyYWludCB2YWxpZGF0aW9uIHBvcHVwcyBhcmUgYW5jaG9yZWQuXG4gICAqL1xuICBnZXQgdmFsaWRhdGlvblRhcmdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dCB8fCB2b2lkIDA7XG4gIH1cbiAgc2V0VmFsaWRpdHkoLi4uYXJncykge1xuICAgIGNvbnN0IGZsYWdzID0gYXJnc1swXTtcbiAgICBjb25zdCBtZXNzYWdlID0gYXJnc1sxXTtcbiAgICBsZXQgYW5jaG9yID0gYXJnc1syXTtcbiAgICBpZiAoIWFuY2hvcikge1xuICAgICAgYW5jaG9yID0gdGhpcy52YWxpZGF0aW9uVGFyZ2V0O1xuICAgIH1cbiAgICB0aGlzLmludGVybmFscy5zZXRWYWxpZGl0eShmbGFncywgbWVzc2FnZSwgYW5jaG9yIHx8IHZvaWQgMCk7XG4gICAgdGhpcy5yZXF1ZXN0VXBkYXRlKFwidmFsaWRpdHlcIik7XG4gICAgdGhpcy5zZXRDdXN0b21TdGF0ZXMoKTtcbiAgfVxuICBzZXRDdXN0b21TdGF0ZXMoKSB7XG4gICAgY29uc3QgcmVxdWlyZWQgPSBCb29sZWFuKHRoaXMucmVxdWlyZWQpO1xuICAgIGNvbnN0IGlzVmFsaWQgPSB0aGlzLmludGVybmFscy52YWxpZGl0eS52YWxpZDtcbiAgICBjb25zdCBoYXNJbnRlcmFjdGVkID0gdGhpcy5oYXNJbnRlcmFjdGVkO1xuICAgIHRoaXMuY3VzdG9tU3RhdGVzLnNldChcInJlcXVpcmVkXCIsIHJlcXVpcmVkKTtcbiAgICB0aGlzLmN1c3RvbVN0YXRlcy5zZXQoXCJvcHRpb25hbFwiLCAhcmVxdWlyZWQpO1xuICAgIHRoaXMuY3VzdG9tU3RhdGVzLnNldChcImludmFsaWRcIiwgIWlzVmFsaWQpO1xuICAgIHRoaXMuY3VzdG9tU3RhdGVzLnNldChcInZhbGlkXCIsIGlzVmFsaWQpO1xuICAgIHRoaXMuY3VzdG9tU3RhdGVzLnNldChcInVzZXItaW52YWxpZFwiLCAhaXNWYWxpZCAmJiBoYXNJbnRlcmFjdGVkKTtcbiAgICB0aGlzLmN1c3RvbVN0YXRlcy5zZXQoXCJ1c2VyLXZhbGlkXCIsIGlzVmFsaWQgJiYgaGFzSW50ZXJhY3RlZCk7XG4gIH1cbiAgLyoqXG4gICAqIERvIG5vdCB1c2UgdGhpcyB3aGVuIGNyZWF0aW5nIGEgXCJWYWxpZGF0b3JcIi4gVGhpcyBpcyBpbnRlbmRlZCBmb3IgZW5kIHVzZXJzIG9mIGNvbXBvbmVudHMuXG4gICAqIFdlIHRyYWNrIG1hbnVhbGx5IGRlZmluZWQgY3VzdG9tIGVycm9ycyBzbyB3ZSBkb24ndCBjbGVhciB0aGVtIG9uIGFjY2lkZW50IGluIG91ciB2YWxpZGF0b3JzLlxuICAgKlxuICAgKi9cbiAgc2V0Q3VzdG9tVmFsaWRpdHkobWVzc2FnZSkge1xuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgdGhpcy5jdXN0b21FcnJvciA9IG51bGw7XG4gICAgICB0aGlzLnNldFZhbGlkaXR5KHt9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXN0b21FcnJvciA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zZXRWYWxpZGl0eSh7IGN1c3RvbUVycm9yOiB0cnVlIH0sIG1lc3NhZ2UsIHRoaXMudmFsaWRhdGlvblRhcmdldCk7XG4gIH1cbiAgZm9ybVJlc2V0Q2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZXNldFZhbGlkaXR5KCk7XG4gICAgdGhpcy5oYXNJbnRlcmFjdGVkID0gZmFsc2U7XG4gICAgdGhpcy52YWx1ZUhhc0NoYW5nZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXR0ZWRFdmVudHMgPSBbXTtcbiAgICB0aGlzLnVwZGF0ZVZhbGlkaXR5KCk7XG4gIH1cbiAgZm9ybURpc2FibGVkQ2FsbGJhY2soaXNEaXNhYmxlZCkge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMudXBkYXRlVmFsaWRpdHkoKTtcbiAgfVxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGJyb3dzZXIgaXMgdHJ5aW5nIHRvIHJlc3RvcmUgZWxlbWVudFx1MjAxOXMgc3RhdGUgdG8gc3RhdGUgaW4gd2hpY2ggY2FzZSByZWFzb24gaXMgXCJyZXN0b3JlXCIsIG9yIHdoZW5cbiAgICogdGhlIGJyb3dzZXIgaXMgdHJ5aW5nIHRvIGZ1bGZpbGwgYXV0b2ZpbGwgb24gYmVoYWxmIG9mIHVzZXIgaW4gd2hpY2ggY2FzZSByZWFzb24gaXMgXCJhdXRvY29tcGxldGVcIi4gSW4gdGhlIGNhc2Ugb2ZcbiAgICogXCJyZXN0b3JlXCIsIHN0YXRlIGlzIGEgc3RyaW5nLCBGaWxlLCBvciBGb3JtRGF0YSBvYmplY3QgcHJldmlvdXNseSBzZXQgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBzZXRGb3JtVmFsdWUuXG4gICAqL1xuICBmb3JtU3RhdGVSZXN0b3JlQ2FsbGJhY2soc3RhdGUsIHJlYXNvbikge1xuICAgIHRoaXMudmFsdWUgPSBzdGF0ZTtcbiAgICBpZiAocmVhc29uID09PSBcInJlc3RvcmVcIikge1xuICAgICAgdGhpcy5yZXNldFZhbGlkaXR5KCk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlVmFsaWRpdHkoKTtcbiAgfVxuICBzZXRWYWx1ZSguLi5hcmdzKSB7XG4gICAgY29uc3QgW3ZhbHVlLCBzdGF0ZV0gPSBhcmdzO1xuICAgIHRoaXMuaW50ZXJuYWxzLnNldEZvcm1WYWx1ZSh2YWx1ZSwgc3RhdGUpO1xuICB9XG4gIGdldCBhbGxWYWxpZGF0b3JzKCkge1xuICAgIGNvbnN0IHN0YXRpY1ZhbGlkYXRvcnMgPSB0aGlzLmNvbnN0cnVjdG9yLnZhbGlkYXRvcnMgfHwgW107XG4gICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMudmFsaWRhdG9ycyB8fCBbXTtcbiAgICByZXR1cm4gWy4uLnN0YXRpY1ZhbGlkYXRvcnMsIC4uLnZhbGlkYXRvcnNdO1xuICB9XG4gIC8qKlxuICAgKiBSZXNldCB2YWxpZGl0eSBpcyBhIHdheSBvZiByZW1vdmluZyBtYW51YWwgY3VzdG9tIGVycm9ycyBhbmQgbmF0aXZlIHZhbGlkYXRpb24uXG4gICAqL1xuICByZXNldFZhbGlkaXR5KCkge1xuICAgIHRoaXMuc2V0Q3VzdG9tVmFsaWRpdHkoXCJcIik7XG4gICAgdGhpcy5zZXRWYWxpZGl0eSh7fSk7XG4gIH1cbiAgdXBkYXRlVmFsaWRpdHkoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5oYXNBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSB8fCAhdGhpcy53aWxsVmFsaWRhdGUpIHtcbiAgICAgIHRoaXMucmVzZXRWYWxpZGl0eSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB2YWxpZGF0b3JzID0gdGhpcy5hbGxWYWxpZGF0b3JzO1xuICAgIGlmICghdmFsaWRhdG9ycz8ubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZsYWdzID0ge1xuICAgICAgLy8gRG9uJ3QgdHJ1c3QgY3VzdG9tIGVycm9ycyBmcm9tIHRoZSBCcm93c2VyLiBTYWZhcmkgYnJlYWtzIHRoZSBzcGVjLlxuICAgICAgY3VzdG9tRXJyb3I6IEJvb2xlYW4odGhpcy5jdXN0b21FcnJvcilcbiAgICB9O1xuICAgIGNvbnN0IGZvcm1Db250cm9sID0gdGhpcy52YWxpZGF0aW9uVGFyZ2V0IHx8IHRoaXMuaW5wdXQgfHwgdm9pZCAwO1xuICAgIGxldCBmaW5hbE1lc3NhZ2UgPSBcIlwiO1xuICAgIGZvciAoY29uc3QgdmFsaWRhdG9yIG9mIHZhbGlkYXRvcnMpIHtcbiAgICAgIGNvbnN0IHsgaXNWYWxpZCwgbWVzc2FnZSwgaW52YWxpZEtleXMgfSA9IHZhbGlkYXRvci5jaGVja1ZhbGlkaXR5KHRoaXMpO1xuICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoIWZpbmFsTWVzc2FnZSkge1xuICAgICAgICBmaW5hbE1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgfVxuICAgICAgaWYgKGludmFsaWRLZXlzPy5sZW5ndGggPj0gMCkge1xuICAgICAgICBpbnZhbGlkS2V5cy5mb3JFYWNoKChzdHIpID0+IGZsYWdzW3N0cl0gPSB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmaW5hbE1lc3NhZ2UpIHtcbiAgICAgIGZpbmFsTWVzc2FnZSA9IHRoaXMudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgfVxuICAgIHRoaXMuc2V0VmFsaWRpdHkoZmxhZ3MsIGZpbmFsTWVzc2FnZSwgZm9ybUNvbnRyb2wpO1xuICB9XG59O1xuV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudC5mb3JtQXNzb2NpYXRlZCA9IHRydWU7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdlYkF3ZXNvbWVGb3JtQXNzb2NpYXRlZEVsZW1lbnQucHJvdG90eXBlLCBcIm5hbWVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4gfSlcbl0sIFdlYkF3ZXNvbWVGb3JtQXNzb2NpYXRlZEVsZW1lbnQucHJvdG90eXBlLCBcImRpc2FibGVkXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBzdGF0ZTogdHJ1ZSwgYXR0cmlidXRlOiBmYWxzZSB9KVxuXSwgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudC5wcm90b3R5cGUsIFwidmFsdWVIYXNDaGFuZ2VkXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBzdGF0ZTogdHJ1ZSwgYXR0cmlidXRlOiBmYWxzZSB9KVxuXSwgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudC5wcm90b3R5cGUsIFwiaGFzSW50ZXJhY3RlZFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcImN1c3RvbS1lcnJvclwiLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50LnByb3RvdHlwZSwgXCJjdXN0b21FcnJvclwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBmYWxzZSwgc3RhdGU6IHRydWUsIHR5cGU6IE9iamVjdCB9KVxuXSwgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudC5wcm90b3R5cGUsIFwidmFsaWRpdHlcIiwgMSk7XG5cbmV4cG9ydCB7XG4gIFdlYkF3ZXNvbWVGb3JtQXNzb2NpYXRlZEVsZW1lbnRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvaW50ZXJuYWwvc2xvdC50c1xudmFyIEhhc1Nsb3RDb250cm9sbGVyID0gY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcihob3N0LCAuLi5zbG90TmFtZXMpIHtcbiAgICB0aGlzLnNsb3ROYW1lcyA9IFtdO1xuICAgIHRoaXMuaGFuZGxlU2xvdENoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgY29uc3Qgc2xvdCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGlmICh0aGlzLnNsb3ROYW1lcy5pbmNsdWRlcyhcIltkZWZhdWx0XVwiKSAmJiAhc2xvdC5uYW1lIHx8IHNsb3QubmFtZSAmJiB0aGlzLnNsb3ROYW1lcy5pbmNsdWRlcyhzbG90Lm5hbWUpKSB7XG4gICAgICAgIHRoaXMuaG9zdC5yZXF1ZXN0VXBkYXRlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICAodGhpcy5ob3N0ID0gaG9zdCkuYWRkQ29udHJvbGxlcih0aGlzKTtcbiAgICB0aGlzLnNsb3ROYW1lcyA9IHNsb3ROYW1lcztcbiAgfVxuICBoYXNEZWZhdWx0U2xvdCgpIHtcbiAgICBpZiAoIXRoaXMuaG9zdC5jaGlsZE5vZGVzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBbLi4udGhpcy5ob3N0LmNoaWxkTm9kZXNdLnNvbWUoKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSAmJiBub2RlLnRleHRDb250ZW50LnRyaW0oKSAhPT0gXCJcIikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICBjb25zdCBlbCA9IG5vZGU7XG4gICAgICAgIGNvbnN0IHRhZ05hbWUgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICh0YWdOYW1lID09PSBcIndhLXZpc3VhbGx5LWhpZGRlblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZWwuaGFzQXR0cmlidXRlKFwic2xvdFwiKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cbiAgaGFzTmFtZWRTbG90KG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5ob3N0LnF1ZXJ5U2VsZWN0b3I/LihgOnNjb3BlID4gW3Nsb3Q9XCIke25hbWV9XCJdYCkgIT09IG51bGw7XG4gIH1cbiAgdGVzdChzbG90TmFtZSkge1xuICAgIHJldHVybiBzbG90TmFtZSA9PT0gXCJbZGVmYXVsdF1cIiA/IHRoaXMuaGFzRGVmYXVsdFNsb3QoKSA6IHRoaXMuaGFzTmFtZWRTbG90KHNsb3ROYW1lKTtcbiAgfVxuICBob3N0Q29ubmVjdGVkKCkge1xuICAgIHRoaXMuaG9zdC5zaGFkb3dSb290Py5hZGRFdmVudExpc3RlbmVyPy4oXCJzbG90Y2hhbmdlXCIsIHRoaXMuaGFuZGxlU2xvdENoYW5nZSk7XG4gIH1cbiAgaG9zdERpc2Nvbm5lY3RlZCgpIHtcbiAgICB0aGlzLmhvc3Quc2hhZG93Um9vdD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcj8uKFwic2xvdGNoYW5nZVwiLCB0aGlzLmhhbmRsZVNsb3RDaGFuZ2UpO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBIYXNTbG90Q29udHJvbGxlclxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9zdHlsZXMvY29tcG9uZW50L3NpemUuc3R5bGVzLnRzXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwibGl0XCI7XG52YXIgc2l6ZV9zdHlsZXNfZGVmYXVsdCA9IGNzc2BcbiAgOmhvc3QoW3NpemU9J3NtYWxsJ10pLFxuICAud2Etc2l6ZS1zIHtcbiAgICBmb250LXNpemU6IHZhcigtLXdhLWZvbnQtc2l6ZS1zKTtcbiAgfVxuXG4gIDpob3N0KFtzaXplPSdtZWRpdW0nXSksXG4gIC53YS1zaXplLW0ge1xuICAgIGZvbnQtc2l6ZTogdmFyKC0td2EtZm9udC1zaXplLW0pO1xuICB9XG5cbiAgOmhvc3QoW3NpemU9J2xhcmdlJ10pLFxuICAud2Etc2l6ZS1sIHtcbiAgICBmb250LXNpemU6IHZhcigtLXdhLWZvbnQtc2l6ZS1sKTtcbiAgfVxuYDtcblxuZXhwb3J0IHtcbiAgc2l6ZV9zdHlsZXNfZGVmYXVsdFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b24uc3R5bGVzLnRzXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwibGl0XCI7XG52YXIgYnV0dG9uX3N0eWxlc19kZWZhdWx0ID0gY3NzYFxuICBAbGF5ZXIgd2EtY29tcG9uZW50IHtcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cbiAgICAgIC8qIFdvcmthcm91bmQgYmVjYXVzZSBDaHJvbWUgZG9lc24ndCBsaWtlIDpob3N0KDpoYXMoKSkgYmVsb3dcbiAgICAgICAqIGh0dHBzOi8vaXNzdWVzLmNocm9taXVtLm9yZy9pc3N1ZXMvNDAwNjIzNTVcbiAgICAgICAqIEZpcmVmb3ggZG9lc24ndCBsaWtlIHRoaXMgbmVzdGVkIHJ1bGUsIHNvIGJvdGggYXJlIG5lZWRlZCAqL1xuICAgICAgJjpoYXMod2EtYmFkZ2UpIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIEFwcGx5IHJlbGF0aXZlIHBvc2l0aW9uaW5nIG9ubHkgd2hlbiBuZWVkZWQgdG8gcG9zaXRpb24gd2EtYmFkZ2VcbiAgICAgKiBUaGlzIGF2b2lkcyBjcmVhdGluZyBhIG5ldyBzdGFja2luZyBjb250ZXh0IGZvciBldmVyeSBidXR0b24gKi9cbiAgICA6aG9zdCg6aGFzKHdhLWJhZGdlKSkge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cbiAgfVxuXG4gIC5idXR0b24ge1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IGJhY2tncm91bmQsIGJvcmRlciwgYm94LXNoYWRvdywgY29sb3IsIG9wYWNpdHk7XG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogdmFyKC0td2EtdHJhbnNpdGlvbi1mYXN0KTtcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogdmFyKC0td2EtdHJhbnNpdGlvbi1lYXNpbmcpO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBwYWRkaW5nOiAwIHZhcigtLXdhLWZvcm0tY29udHJvbC1wYWRkaW5nLWlubGluZSk7XG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xuICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS13YS1mb250LXdlaWdodC1hY3Rpb24pO1xuICAgIGxpbmUtaGVpZ2h0OiBjYWxjKHZhcigtLXdhLWZvcm0tY29udHJvbC1oZWlnaHQpIC0gdmFyKC0tYm9yZGVyLXdpZHRoKSAqIDIpO1xuICAgIGhlaWdodDogdmFyKC0td2EtZm9ybS1jb250cm9sLWhlaWdodCk7XG4gICAgd2lkdGg6IDEwMCU7XG5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13YS1jb2xvci1maWxsLWxvdWQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1sb3VkKSk7XG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tbG91ZCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1sb3VkKSk7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICAgIGJvcmRlci1zdHlsZTogdmFyKC0td2EtYm9yZGVyLXN0eWxlKTtcbiAgICBib3JkZXItd2lkdGg6IHZhcigtLXdhLWJvcmRlci13aWR0aC1zKTtcbiAgfVxuXG4gIC8qIEFwcGVhcmFuY2UgbW9kaWZpZXJzICovXG4gIDpob3N0KFthcHBlYXJhbmNlPSdwbGFpbiddKSB7XG4gICAgLmJ1dHRvbiB7XG4gICAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tcXVpZXQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tcXVpZXQpKTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgQG1lZGlhIChob3ZlcjogaG92ZXIpIHtcbiAgICAgIC5idXR0b246bm90KC5kaXNhYmxlZCk6bm90KC5sb2FkaW5nKTpob3ZlciB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1xdWlldCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1xdWlldCkpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13YS1jb2xvci1maWxsLXF1aWV0LCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtcXVpZXQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmFjdGl2ZSB7XG4gICAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tcXVpZXQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tcXVpZXQpKTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChcbiAgICAgICAgaW4gb2tsYWIsXG4gICAgICAgIHZhcigtLXdhLWNvbG9yLWZpbGwtcXVpZXQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1xdWlldCkpLFxuICAgICAgICB2YXIoLS13YS1jb2xvci1taXgtYWN0aXZlKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICA6aG9zdChbYXBwZWFyYW5jZT0nb3V0bGluZWQnXSkge1xuICAgIC5idXR0b24ge1xuICAgICAgY29sb3I6IHZhcigtLXdhLWNvbG9yLW9uLXF1aWV0LCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLXF1aWV0KSk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0td2EtY29sb3ItYm9yZGVyLWxvdWQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtYm9yZGVyLWxvdWQpKTtcbiAgICB9XG4gICAgQG1lZGlhIChob3ZlcjogaG92ZXIpIHtcbiAgICAgIC5idXR0b246bm90KC5kaXNhYmxlZCk6bm90KC5sb2FkaW5nKTpob3ZlciB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1xdWlldCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1xdWlldCkpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13YS1jb2xvci1maWxsLXF1aWV0LCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtcXVpZXQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmFjdGl2ZSB7XG4gICAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tcXVpZXQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tcXVpZXQpKTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChcbiAgICAgICAgaW4gb2tsYWIsXG4gICAgICAgIHZhcigtLXdhLWNvbG9yLWZpbGwtcXVpZXQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1xdWlldCkpLFxuICAgICAgICB2YXIoLS13YS1jb2xvci1taXgtYWN0aXZlKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICA6aG9zdChbYXBwZWFyYW5jZT0nZmlsbGVkJ10pIHtcbiAgICAuYnV0dG9uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbm9ybWFsKSk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13YS1jb2xvci1maWxsLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLW5vcm1hbCkpO1xuICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgQG1lZGlhIChob3ZlcjogaG92ZXIpIHtcbiAgICAgIC5idXR0b246bm90KC5kaXNhYmxlZCk6bm90KC5sb2FkaW5nKTpob3ZlciB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbm9ybWFsKSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChcbiAgICAgICAgICBpbiBva2xhYixcbiAgICAgICAgICB2YXIoLS13YS1jb2xvci1maWxsLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLW5vcm1hbCkpLFxuICAgICAgICAgIHZhcigtLXdhLWNvbG9yLW1peC1ob3ZlcilcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmFjdGl2ZSB7XG4gICAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tbm9ybWFsLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLW5vcm1hbCkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICBpbiBva2xhYixcbiAgICAgICAgdmFyKC0td2EtY29sb3ItZmlsbC1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1ub3JtYWwpKSxcbiAgICAgICAgdmFyKC0td2EtY29sb3ItbWl4LWFjdGl2ZSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgOmhvc3QoW2FwcGVhcmFuY2U9J2ZpbGxlZC1vdXRsaW5lZCddKSB7XG4gICAgLmJ1dHRvbiB7XG4gICAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tbm9ybWFsLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLW5vcm1hbCkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2EtY29sb3ItZmlsbC1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1ub3JtYWwpKTtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0td2EtY29sb3ItYm9yZGVyLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1ib3JkZXItbm9ybWFsKSk7XG4gICAgfVxuICAgIEBtZWRpYSAoaG92ZXI6IGhvdmVyKSB7XG4gICAgICAuYnV0dG9uOm5vdCguZGlzYWJsZWQpOm5vdCgubG9hZGluZyk6aG92ZXIge1xuICAgICAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tbm9ybWFsLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLW5vcm1hbCkpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoXG4gICAgICAgICAgaW4gb2tsYWIsXG4gICAgICAgICAgdmFyKC0td2EtY29sb3ItZmlsbC1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1ub3JtYWwpKSxcbiAgICAgICAgICB2YXIoLS13YS1jb2xvci1taXgtaG92ZXIpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIC5idXR0b246bm90KC5kaXNhYmxlZCk6bm90KC5sb2FkaW5nKTphY3RpdmUge1xuICAgICAgY29sb3I6IHZhcigtLXdhLWNvbG9yLW9uLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1ub3JtYWwpKTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChcbiAgICAgICAgaW4gb2tsYWIsXG4gICAgICAgIHZhcigtLXdhLWNvbG9yLWZpbGwtbm9ybWFsLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtbm9ybWFsKSksXG4gICAgICAgIHZhcigtLXdhLWNvbG9yLW1peC1hY3RpdmUpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIDpob3N0KFthcHBlYXJhbmNlPSdhY2NlbnQnXSkge1xuICAgIC5idXR0b24ge1xuICAgICAgY29sb3I6IHZhcigtLXdhLWNvbG9yLW9uLWxvdWQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbG91ZCkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2EtY29sb3ItZmlsbC1sb3VkLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtbG91ZCkpO1xuICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICAgQG1lZGlhIChob3ZlcjogaG92ZXIpIHtcbiAgICAgIC5idXR0b246bm90KC5kaXNhYmxlZCk6bm90KC5sb2FkaW5nKTpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChcbiAgICAgICAgICBpbiBva2xhYixcbiAgICAgICAgICB2YXIoLS13YS1jb2xvci1maWxsLWxvdWQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1sb3VkKSksXG4gICAgICAgICAgdmFyKC0td2EtY29sb3ItbWl4LWhvdmVyKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICAuYnV0dG9uOm5vdCguZGlzYWJsZWQpOm5vdCgubG9hZGluZyk6YWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChcbiAgICAgICAgaW4gb2tsYWIsXG4gICAgICAgIHZhcigtLXdhLWNvbG9yLWZpbGwtbG91ZCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLWxvdWQpKSxcbiAgICAgICAgdmFyKC0td2EtY29sb3ItbWl4LWFjdGl2ZSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyogRm9jdXMgc3RhdGVzICovXG4gIC5idXR0b246Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cblxuICAuYnV0dG9uOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IHZhcigtLXdhLWZvY3VzLXJpbmcpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiB2YXIoLS13YS1mb2N1cy1yaW5nLW9mZnNldCk7XG4gIH1cblxuICAvKiBEaXNhYmxlZCBzdGF0ZSAqL1xuICA6aG9zdChbZGlzYWJsZWRdKSB7XG4gICAgb3BhY2l0eTogMC41O1xuICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG5cbiAgICAvKiBXaGVuIGRpc2FibGVkLCBwcmV2ZW50IG1vdXNlIGV2ZW50cyBmcm9tIGJ1YmJsaW5nIHVwIGZyb20gY2hpbGRyZW4gKi9cbiAgICAuYnV0dG9uIHtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIH1cbiAgfVxuXG4gIC8qIEtlZXAgaXQgbGFzdCBzbyBTYWZhcmkgZG9lc24ndCBzdG9wIHBhcnNpbmcgdGhpcyBibG9jayAqL1xuICAuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyIHtcbiAgICBib3JkZXI6IDA7XG4gIH1cblxuICAvKiBJY29uIGJ1dHRvbnMgKi9cbiAgLmJ1dHRvbi5pcy1pY29uLWJ1dHRvbiB7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgICB3aWR0aDogdmFyKC0td2EtZm9ybS1jb250cm9sLWhlaWdodCk7XG4gICAgYXNwZWN0LXJhdGlvOiAxO1xuICB9XG5cbiAgLmJ1dHRvbi5pcy1pY29uLWJ1dHRvbjpoYXMod2EtaWNvbikge1xuICAgIHdpZHRoOiBhdXRvO1xuICB9XG5cbiAgLyogUGlsbCBtb2RpZmllciAqL1xuICA6aG9zdChbcGlsbF0pIC5idXR0b24ge1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXdhLWJvcmRlci1yYWRpdXMtcGlsbCk7XG4gIH1cblxuICAvKlxuICAgKiBMYWJlbFxuICAgKi9cblxuICAuc3RhcnQsXG4gIC5lbmQge1xuICAgIGZsZXg6IDAgMCBhdXRvO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgfVxuXG4gIC5sYWJlbCB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB9XG5cbiAgLmlzLWljb24tYnV0dG9uIC5sYWJlbCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgfVxuXG4gIC5sYWJlbDo6c2xvdHRlZCh3YS1pY29uKSB7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICB9XG5cbiAgLypcbiAgICogQ2FyZXQgbW9kaWZpZXJcbiAgICovXG5cbiAgd2EtaWNvbltwYXJ0PSdjYXJldCddIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgJjo6cGFydChzdmcpIHtcbiAgICAgIHdpZHRoOiAwLjg3NWVtO1xuICAgICAgaGVpZ2h0OiAwLjg3NWVtO1xuICAgIH1cblxuICAgIC5idXR0b246aGFzKCYpIC5lbmQge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBMb2FkaW5nIG1vZGlmaWVyXG4gICAqL1xuXG4gIC5sb2FkaW5nIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgY3Vyc29yOiB3YWl0O1xuXG4gICAgLnN0YXJ0LFxuICAgIC5sYWJlbCxcbiAgICAuZW5kLFxuICAgIC5jYXJldCB7XG4gICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgfVxuXG4gICAgd2Etc3Bpbm5lciB7XG4gICAgICAtLWluZGljYXRvci1jb2xvcjogY3VycmVudENvbG9yO1xuICAgICAgLS10cmFjay1jb2xvcjogY29sb3ItbWl4KGluIG9rbGFiLCBjdXJyZW50Q29sb3IsIHRyYW5zcGFyZW50IDkwJSk7XG5cbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGZvbnQtc2l6ZTogMWVtO1xuICAgICAgaGVpZ2h0OiAxZW07XG4gICAgICB3aWR0aDogMWVtO1xuICAgICAgdG9wOiBjYWxjKDUwJSAtIDAuNWVtKTtcbiAgICAgIGxlZnQ6IGNhbGMoNTAlIC0gMC41ZW0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIEJhZGdlc1xuICAgKi9cblxuICAuYnV0dG9uIDo6c2xvdHRlZCh3YS1iYWRnZSkge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0td2EtY29sb3Itc3VyZmFjZS1kZWZhdWx0KTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQtYmxvY2stc3RhcnQ6IDA7XG4gICAgaW5zZXQtaW5saW5lLWVuZDogMDtcbiAgICB0cmFuc2xhdGU6IDUwJSAtNTAlO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5cbiAgOmhvc3QoOmRpcihydGwpKSA6OnNsb3R0ZWQod2EtYmFkZ2UpIHtcbiAgICB0cmFuc2xhdGU6IC01MCUgLTUwJTtcbiAgfVxuXG4gIC8qXG4gICogQnV0dG9uIHNwYWNpbmdcbiAgKi9cblxuICBzbG90W25hbWU9J3N0YXJ0J106OnNsb3R0ZWQoKikge1xuICAgIG1hcmdpbi1pbmxpbmUtZW5kOiAwLjc1ZW07XG4gIH1cblxuICBzbG90W25hbWU9J2VuZCddOjpzbG90dGVkKCopLFxuICAuYnV0dG9uOm5vdCgudmlzdWFsbHktaGlkZGVuLWxhYmVsKSBbcGFydD0nY2FyZXQnXSB7XG4gICAgbWFyZ2luLWlubGluZS1zdGFydDogMC43NWVtO1xuICB9XG5cbiAgLypcbiAgICogQnV0dG9uIGdyb3VwIGJvcmRlciByYWRpdXMgbW9kaWZpY2F0aW9uc1xuICAgKi9cblxuICAvKiBSZW1vdmUgYm9yZGVyIHJhZGl1cyBmcm9tIGFsbCBncm91cGVkIGJ1dHRvbnMgYnkgZGVmYXVsdCAqL1xuICA6aG9zdCgud2EtYnV0dG9uLWdyb3VwX19idXR0b24pIC5idXR0b24ge1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gIH1cblxuICAvKiBIb3Jpem9udGFsIG9yaWVudGF0aW9uICovXG4gIDpob3N0KC53YS1idXR0b24tZ3JvdXBfX2hvcml6b250YWwud2EtYnV0dG9uLWdyb3VwX19idXR0b24tZmlyc3QpIC5idXR0b24ge1xuICAgIGJvcmRlci1zdGFydC1zdGFydC1yYWRpdXM6IHZhcigtLXdhLWZvcm0tY29udHJvbC1ib3JkZXItcmFkaXVzKTtcbiAgICBib3JkZXItZW5kLXN0YXJ0LXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICB9XG5cbiAgOmhvc3QoLndhLWJ1dHRvbi1ncm91cF9faG9yaXpvbnRhbC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbi1sYXN0KSAuYnV0dG9uIHtcbiAgICBib3JkZXItc3RhcnQtZW5kLXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICAgIGJvcmRlci1lbmQtZW5kLXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICB9XG5cbiAgLyogVmVydGljYWwgb3JpZW50YXRpb24gKi9cbiAgOmhvc3QoLndhLWJ1dHRvbi1ncm91cF9fdmVydGljYWwpIHtcbiAgICBmbGV4OiAxIDEgYXV0bztcbiAgfVxuXG4gIDpob3N0KC53YS1idXR0b24tZ3JvdXBfX3ZlcnRpY2FsKSAuYnV0dG9uIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xuICB9XG5cbiAgOmhvc3QoLndhLWJ1dHRvbi1ncm91cF9fdmVydGljYWwud2EtYnV0dG9uLWdyb3VwX19idXR0b24tZmlyc3QpIC5idXR0b24ge1xuICAgIGJvcmRlci1zdGFydC1zdGFydC1yYWRpdXM6IHZhcigtLXdhLWZvcm0tY29udHJvbC1ib3JkZXItcmFkaXVzKTtcbiAgICBib3JkZXItc3RhcnQtZW5kLXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICB9XG5cbiAgOmhvc3QoLndhLWJ1dHRvbi1ncm91cF9fdmVydGljYWwud2EtYnV0dG9uLWdyb3VwX19idXR0b24tbGFzdCkgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLWVuZC1zdGFydC1yYWRpdXM6IHZhcigtLXdhLWZvcm0tY29udHJvbC1ib3JkZXItcmFkaXVzKTtcbiAgICBib3JkZXItZW5kLWVuZC1yYWRpdXM6IHZhcigtLXdhLWZvcm0tY29udHJvbC1ib3JkZXItcmFkaXVzKTtcbiAgfVxuXG4gIC8qIEhhbmRsZSBwaWxsIG1vZGlmaWVyIGZvciBidXR0b24gZ3JvdXBzICovXG4gIDpob3N0KFtwaWxsXS53YS1idXR0b24tZ3JvdXBfX2hvcml6b250YWwud2EtYnV0dG9uLWdyb3VwX19idXR0b24tZmlyc3QpIC5idXR0b24ge1xuICAgIGJvcmRlci1zdGFydC1zdGFydC1yYWRpdXM6IHZhcigtLXdhLWJvcmRlci1yYWRpdXMtcGlsbCk7XG4gICAgYm9yZGVyLWVuZC1zdGFydC1yYWRpdXM6IHZhcigtLXdhLWJvcmRlci1yYWRpdXMtcGlsbCk7XG4gIH1cblxuICA6aG9zdChbcGlsbF0ud2EtYnV0dG9uLWdyb3VwX19ob3Jpem9udGFsLndhLWJ1dHRvbi1ncm91cF9fYnV0dG9uLWxhc3QpIC5idXR0b24ge1xuICAgIGJvcmRlci1zdGFydC1lbmQtcmFkaXVzOiB2YXIoLS13YS1ib3JkZXItcmFkaXVzLXBpbGwpO1xuICAgIGJvcmRlci1lbmQtZW5kLXJhZGl1czogdmFyKC0td2EtYm9yZGVyLXJhZGl1cy1waWxsKTtcbiAgfVxuXG4gIDpob3N0KFtwaWxsXS53YS1idXR0b24tZ3JvdXBfX3ZlcnRpY2FsLndhLWJ1dHRvbi1ncm91cF9fYnV0dG9uLWZpcnN0KSAuYnV0dG9uIHtcbiAgICBib3JkZXItc3RhcnQtc3RhcnQtcmFkaXVzOiB2YXIoLS13YS1ib3JkZXItcmFkaXVzLXBpbGwpO1xuICAgIGJvcmRlci1zdGFydC1lbmQtcmFkaXVzOiB2YXIoLS13YS1ib3JkZXItcmFkaXVzLXBpbGwpO1xuICB9XG5cbiAgOmhvc3QoW3BpbGxdLndhLWJ1dHRvbi1ncm91cF9fdmVydGljYWwud2EtYnV0dG9uLWdyb3VwX19idXR0b24tbGFzdCkgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLWVuZC1zdGFydC1yYWRpdXM6IHZhcigtLXdhLWJvcmRlci1yYWRpdXMtcGlsbCk7XG4gICAgYm9yZGVyLWVuZC1lbmQtcmFkaXVzOiB2YXIoLS13YS1ib3JkZXItcmFkaXVzLXBpbGwpO1xuICB9XG5gO1xuXG5leHBvcnQge1xuICBidXR0b25fc3R5bGVzX2RlZmF1bHRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvaW50ZXJuYWwvd2F0Y2gudHNcbmZ1bmN0aW9uIHdhdGNoKHByb3BlcnR5TmFtZSwgb3B0aW9ucykge1xuICBjb25zdCByZXNvbHZlZE9wdGlvbnMgPSB7XG4gICAgd2FpdFVudGlsRmlyc3RVcGRhdGU6IGZhbHNlLFxuICAgIC4uLm9wdGlvbnNcbiAgfTtcbiAgcmV0dXJuIChwcm90bywgZGVjb3JhdGVkRm5OYW1lKSA9PiB7XG4gICAgY29uc3QgeyB1cGRhdGUgfSA9IHByb3RvO1xuICAgIGNvbnN0IHdhdGNoZWRQcm9wZXJ0aWVzID0gQXJyYXkuaXNBcnJheShwcm9wZXJ0eU5hbWUpID8gcHJvcGVydHlOYW1lIDogW3Byb3BlcnR5TmFtZV07XG4gICAgcHJvdG8udXBkYXRlID0gZnVuY3Rpb24oY2hhbmdlZFByb3BzKSB7XG4gICAgICB3YXRjaGVkUHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBwcm9wZXJ0eTtcbiAgICAgICAgaWYgKGNoYW5nZWRQcm9wcy5oYXMoa2V5KSkge1xuICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gY2hhbmdlZFByb3BzLmdldChrZXkpO1xuICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpc1trZXldO1xuICAgICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghcmVzb2x2ZWRPcHRpb25zLndhaXRVbnRpbEZpcnN0VXBkYXRlIHx8IHRoaXMuaGFzVXBkYXRlZCkge1xuICAgICAgICAgICAgICB0aGlzW2RlY29yYXRlZEZuTmFtZV0ob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdXBkYXRlLmNhbGwodGhpcywgY2hhbmdlZFByb3BzKTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQge1xuICB3YXRjaFxufTtcbiIsICJjb25zdCBjb25uZWN0ZWRFbGVtZW50cyA9IG5ldyBTZXQoKTtcbmNvbnN0IHRyYW5zbGF0aW9ucyA9IG5ldyBNYXAoKTtcbmxldCBmYWxsYmFjaztcbmxldCBkb2N1bWVudERpcmVjdGlvbiA9ICdsdHInO1xubGV0IGRvY3VtZW50TGFuZ3VhZ2UgPSAnZW4nO1xuY29uc3QgaXNDbGllbnQgPSAodHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgIT09IFwidW5kZWZpbmVkXCIpO1xuaWYgKGlzQ2xpZW50KSB7XG4gICAgY29uc3QgZG9jdW1lbnRFbGVtZW50T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcih1cGRhdGUpO1xuICAgIGRvY3VtZW50RGlyZWN0aW9uID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRpciB8fCAnbHRyJztcbiAgICBkb2N1bWVudExhbmd1YWdlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgfHwgbmF2aWdhdG9yLmxhbmd1YWdlO1xuICAgIGRvY3VtZW50RWxlbWVudE9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydkaXInLCAnbGFuZyddXG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJUcmFuc2xhdGlvbiguLi50cmFuc2xhdGlvbikge1xuICAgIHRyYW5zbGF0aW9uLm1hcCh0ID0+IHtcbiAgICAgICAgY29uc3QgY29kZSA9IHQuJGNvZGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHRyYW5zbGF0aW9ucy5oYXMoY29kZSkpIHtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9ucy5zZXQoY29kZSwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0cmFuc2xhdGlvbnMuZ2V0KGNvZGUpKSwgdCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNsYXRpb25zLnNldChjb2RlLCB0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZhbGxiYWNrKSB7XG4gICAgICAgICAgICBmYWxsYmFjayA9IHQ7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB1cGRhdGUoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgaWYgKGlzQ2xpZW50KSB7XG4gICAgICAgIGRvY3VtZW50RGlyZWN0aW9uID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRpciB8fCAnbHRyJztcbiAgICAgICAgZG9jdW1lbnRMYW5ndWFnZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nIHx8IG5hdmlnYXRvci5sYW5ndWFnZTtcbiAgICB9XG4gICAgWy4uLmNvbm5lY3RlZEVsZW1lbnRzLmtleXMoKV0ubWFwKChlbCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGVsLnJlcXVlc3RVcGRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGVsLnJlcXVlc3RVcGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGNsYXNzIExvY2FsaXplQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoaG9zdCkge1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgICAgICB0aGlzLmhvc3QuYWRkQ29udHJvbGxlcih0aGlzKTtcbiAgICB9XG4gICAgaG9zdENvbm5lY3RlZCgpIHtcbiAgICAgICAgY29ubmVjdGVkRWxlbWVudHMuYWRkKHRoaXMuaG9zdCk7XG4gICAgfVxuICAgIGhvc3REaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgIGNvbm5lY3RlZEVsZW1lbnRzLmRlbGV0ZSh0aGlzLmhvc3QpO1xuICAgIH1cbiAgICBkaXIoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmhvc3QuZGlyIHx8IGRvY3VtZW50RGlyZWN0aW9ufWAudG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gICAgbGFuZygpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuaG9zdC5sYW5nIHx8IGRvY3VtZW50TGFuZ3VhZ2V9YC50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBnZXRUcmFuc2xhdGlvbkRhdGEobGFuZykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBsb2NhbGUgPSBuZXcgSW50bC5Mb2NhbGUobGFuZy5yZXBsYWNlKC9fL2csICctJykpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGxvY2FsZSA9PT0gbnVsbCB8fCBsb2NhbGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxvY2FsZS5sYW5ndWFnZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCByZWdpb24gPSAoX2IgPSAoX2EgPSBsb2NhbGUgPT09IG51bGwgfHwgbG9jYWxlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsb2NhbGUucmVnaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9Mb3dlckNhc2UoKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJyc7XG4gICAgICAgIGNvbnN0IHByaW1hcnkgPSB0cmFuc2xhdGlvbnMuZ2V0KGAke2xhbmd1YWdlfS0ke3JlZ2lvbn1gKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kYXJ5ID0gdHJhbnNsYXRpb25zLmdldChsYW5ndWFnZSk7XG4gICAgICAgIHJldHVybiB7IGxvY2FsZSwgbGFuZ3VhZ2UsIHJlZ2lvbiwgcHJpbWFyeSwgc2Vjb25kYXJ5IH07XG4gICAgfVxuICAgIGV4aXN0cyhrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB7IHByaW1hcnksIHNlY29uZGFyeSB9ID0gdGhpcy5nZXRUcmFuc2xhdGlvbkRhdGEoKF9hID0gb3B0aW9ucy5sYW5nKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0aGlzLmxhbmcoKSk7XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsgaW5jbHVkZUZhbGxiYWNrOiBmYWxzZSB9LCBvcHRpb25zKTtcbiAgICAgICAgaWYgKChwcmltYXJ5ICYmIHByaW1hcnlba2V5XSkgfHxcbiAgICAgICAgICAgIChzZWNvbmRhcnkgJiYgc2Vjb25kYXJ5W2tleV0pIHx8XG4gICAgICAgICAgICAob3B0aW9ucy5pbmNsdWRlRmFsbGJhY2sgJiYgZmFsbGJhY2sgJiYgZmFsbGJhY2tba2V5XSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGVybShrZXksIC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3QgeyBwcmltYXJ5LCBzZWNvbmRhcnkgfSA9IHRoaXMuZ2V0VHJhbnNsYXRpb25EYXRhKHRoaXMubGFuZygpKTtcbiAgICAgICAgbGV0IHRlcm07XG4gICAgICAgIGlmIChwcmltYXJ5ICYmIHByaW1hcnlba2V5XSkge1xuICAgICAgICAgICAgdGVybSA9IHByaW1hcnlba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWNvbmRhcnkgJiYgc2Vjb25kYXJ5W2tleV0pIHtcbiAgICAgICAgICAgIHRlcm0gPSBzZWNvbmRhcnlba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmYWxsYmFjayAmJiBmYWxsYmFja1trZXldKSB7XG4gICAgICAgICAgICB0ZXJtID0gZmFsbGJhY2tba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYE5vIHRyYW5zbGF0aW9uIGZvdW5kIGZvcjogJHtTdHJpbmcoa2V5KX1gKTtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRlcm0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXJtKC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXJtO1xuICAgIH1cbiAgICBkYXRlKGRhdGVUb0Zvcm1hdCwgb3B0aW9ucykge1xuICAgICAgICBkYXRlVG9Gb3JtYXQgPSBuZXcgRGF0ZShkYXRlVG9Gb3JtYXQpO1xuICAgICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sYW5nKCksIG9wdGlvbnMpLmZvcm1hdChkYXRlVG9Gb3JtYXQpO1xuICAgIH1cbiAgICBudW1iZXIobnVtYmVyVG9Gb3JtYXQsIG9wdGlvbnMpIHtcbiAgICAgICAgbnVtYmVyVG9Gb3JtYXQgPSBOdW1iZXIobnVtYmVyVG9Gb3JtYXQpO1xuICAgICAgICByZXR1cm4gaXNOYU4obnVtYmVyVG9Gb3JtYXQpID8gJycgOiBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy5sYW5nKCksIG9wdGlvbnMpLmZvcm1hdChudW1iZXJUb0Zvcm1hdCk7XG4gICAgfVxuICAgIHJlbGF0aXZlVGltZSh2YWx1ZSwgdW5pdCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuUmVsYXRpdmVUaW1lRm9ybWF0KHRoaXMubGFuZygpLCBvcHRpb25zKS5mb3JtYXQodmFsdWUsIHVuaXQpO1xuICAgIH1cbn1cbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy90cmFuc2xhdGlvbnMvZW4udHNcbmltcG9ydCB7IHJlZ2lzdGVyVHJhbnNsYXRpb24gfSBmcm9tIFwiQHNob2VsYWNlLXN0eWxlL2xvY2FsaXplXCI7XG52YXIgdHJhbnNsYXRpb24gPSB7XG4gICRjb2RlOiBcImVuXCIsXG4gICRuYW1lOiBcIkVuZ2xpc2hcIixcbiAgJGRpcjogXCJsdHJcIixcbiAgY2Fyb3VzZWw6IFwiQ2Fyb3VzZWxcIixcbiAgY2xlYXJFbnRyeTogXCJDbGVhciBlbnRyeVwiLFxuICBjbG9zZTogXCJDbG9zZVwiLFxuICBjb3BpZWQ6IFwiQ29waWVkXCIsXG4gIGNvcHk6IFwiQ29weVwiLFxuICBjdXJyZW50VmFsdWU6IFwiQ3VycmVudCB2YWx1ZVwiLFxuICBkcm9wRmlsZUhlcmU6IFwiRHJvcCBmaWxlIGhlcmUgb3IgY2xpY2sgdG8gYnJvd3NlXCIsXG4gIGRlY3JlbWVudDogXCJEZWNyZW1lbnRcIixcbiAgZHJvcEZpbGVzSGVyZTogXCJEcm9wIGZpbGVzIGhlcmUgb3IgY2xpY2sgdG8gYnJvd3NlXCIsXG4gIGVycm9yOiBcIkVycm9yXCIsXG4gIGdvVG9TbGlkZTogKHNsaWRlLCBjb3VudCkgPT4gYEdvIHRvIHNsaWRlICR7c2xpZGV9IG9mICR7Y291bnR9YCxcbiAgaGlkZVBhc3N3b3JkOiBcIkhpZGUgcGFzc3dvcmRcIixcbiAgaW5jcmVtZW50OiBcIkluY3JlbWVudFwiLFxuICBsb2FkaW5nOiBcIkxvYWRpbmdcIixcbiAgbmV4dFNsaWRlOiBcIk5leHQgc2xpZGVcIixcbiAgbnVtT3B0aW9uc1NlbGVjdGVkOiAobnVtKSA9PiB7XG4gICAgaWYgKG51bSA9PT0gMCkgcmV0dXJuIFwiTm8gb3B0aW9ucyBzZWxlY3RlZFwiO1xuICAgIGlmIChudW0gPT09IDEpIHJldHVybiBcIjEgb3B0aW9uIHNlbGVjdGVkXCI7XG4gICAgcmV0dXJuIGAke251bX0gb3B0aW9ucyBzZWxlY3RlZGA7XG4gIH0sXG4gIHBhdXNlQW5pbWF0aW9uOiBcIlBhdXNlIGFuaW1hdGlvblwiLFxuICBwbGF5QW5pbWF0aW9uOiBcIlBsYXkgYW5pbWF0aW9uXCIsXG4gIHByZXZpb3VzU2xpZGU6IFwiUHJldmlvdXMgc2xpZGVcIixcbiAgcHJvZ3Jlc3M6IFwiUHJvZ3Jlc3NcIixcbiAgcmVtb3ZlOiBcIlJlbW92ZVwiLFxuICByZXNpemU6IFwiUmVzaXplXCIsXG4gIHNjcm9sbGFibGVSZWdpb246IFwiU2Nyb2xsYWJsZSByZWdpb25cIixcbiAgc2Nyb2xsVG9FbmQ6IFwiU2Nyb2xsIHRvIGVuZFwiLFxuICBzY3JvbGxUb1N0YXJ0OiBcIlNjcm9sbCB0byBzdGFydFwiLFxuICBzZWxlY3RBQ29sb3JGcm9tVGhlU2NyZWVuOiBcIlNlbGVjdCBhIGNvbG9yIGZyb20gdGhlIHNjcmVlblwiLFxuICBzaG93UGFzc3dvcmQ6IFwiU2hvdyBwYXNzd29yZFwiLFxuICBzbGlkZU51bTogKHNsaWRlKSA9PiBgU2xpZGUgJHtzbGlkZX1gLFxuICB0b2dnbGVDb2xvckZvcm1hdDogXCJUb2dnbGUgY29sb3IgZm9ybWF0XCIsXG4gIHpvb21JbjogXCJab29tIGluXCIsXG4gIHpvb21PdXQ6IFwiWm9vbSBvdXRcIlxufTtcbnJlZ2lzdGVyVHJhbnNsYXRpb24odHJhbnNsYXRpb24pO1xudmFyIGVuX2RlZmF1bHQgPSB0cmFuc2xhdGlvbjtcblxuZXhwb3J0IHtcbiAgZW5fZGVmYXVsdFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5pbXBvcnQge1xuICBlbl9kZWZhdWx0XG59IGZyb20gXCIuL2NodW5rLjcyV0pORDVYLmpzXCI7XG5cbi8vIHNyYy91dGlsaXRpZXMvbG9jYWxpemUudHNcbmltcG9ydCB7IExvY2FsaXplQ29udHJvbGxlciBhcyBEZWZhdWx0TG9jYWxpemF0aW9uQ29udHJvbGxlciwgcmVnaXN0ZXJUcmFuc2xhdGlvbiB9IGZyb20gXCJAc2hvZWxhY2Utc3R5bGUvbG9jYWxpemVcIjtcbmltcG9ydCB7IHJlZ2lzdGVyVHJhbnNsYXRpb24gYXMgcmVnaXN0ZXJUcmFuc2xhdGlvbjIgfSBmcm9tIFwiQHNob2VsYWNlLXN0eWxlL2xvY2FsaXplXCI7XG52YXIgTG9jYWxpemVDb250cm9sbGVyID0gY2xhc3MgZXh0ZW5kcyBEZWZhdWx0TG9jYWxpemF0aW9uQ29udHJvbGxlciB7XG59O1xucmVnaXN0ZXJUcmFuc2xhdGlvbihlbl9kZWZhdWx0KTtcblxuZXhwb3J0IHtcbiAgTG9jYWxpemVDb250cm9sbGVyLFxuICByZWdpc3RlclRyYW5zbGF0aW9uMiBhcyByZWdpc3RlclRyYW5zbGF0aW9uXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL3N0eWxlcy9jb21wb25lbnQvdmFyaWFudHMuc3R5bGVzLnRzXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwibGl0XCI7XG52YXIgdmFyaWFudHNfc3R5bGVzX2RlZmF1bHQgPSBjc3NgXG4gIDp3aGVyZSg6cm9vdCksXG4gIC53YS1uZXV0cmFsLFxuICA6aG9zdChbdmFyaWFudD0nbmV1dHJhbCddKSB7XG4gICAgLS13YS1jb2xvci1maWxsLWxvdWQ6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLWZpbGwtbm9ybWFsOiB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLWZpbGwtcXVpZXQ6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1xdWlldCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItbG91ZDogdmFyKC0td2EtY29sb3ItbmV1dHJhbC1ib3JkZXItbG91ZCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItbm9ybWFsOiB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWJvcmRlci1ub3JtYWwpO1xuICAgIC0td2EtY29sb3ItYm9yZGVyLXF1aWV0OiB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWJvcmRlci1xdWlldCk7XG4gICAgLS13YS1jb2xvci1vbi1sb3VkOiB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLWxvdWQpO1xuICAgIC0td2EtY29sb3Itb24tbm9ybWFsOiB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1vbi1xdWlldDogdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1xdWlldCk7XG4gIH1cblxuICAud2EtYnJhbmQsXG4gIDpob3N0KFt2YXJpYW50PSdicmFuZCddKSB7XG4gICAgLS13YS1jb2xvci1maWxsLWxvdWQ6IHZhcigtLXdhLWNvbG9yLWJyYW5kLWZpbGwtbG91ZCk7XG4gICAgLS13YS1jb2xvci1maWxsLW5vcm1hbDogdmFyKC0td2EtY29sb3ItYnJhbmQtZmlsbC1ub3JtYWwpO1xuICAgIC0td2EtY29sb3ItZmlsbC1xdWlldDogdmFyKC0td2EtY29sb3ItYnJhbmQtZmlsbC1xdWlldCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItbG91ZDogdmFyKC0td2EtY29sb3ItYnJhbmQtYm9yZGVyLWxvdWQpO1xuICAgIC0td2EtY29sb3ItYm9yZGVyLW5vcm1hbDogdmFyKC0td2EtY29sb3ItYnJhbmQtYm9yZGVyLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItcXVpZXQ6IHZhcigtLXdhLWNvbG9yLWJyYW5kLWJvcmRlci1xdWlldCk7XG4gICAgLS13YS1jb2xvci1vbi1sb3VkOiB2YXIoLS13YS1jb2xvci1icmFuZC1vbi1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLW9uLW5vcm1hbDogdmFyKC0td2EtY29sb3ItYnJhbmQtb24tbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLW9uLXF1aWV0OiB2YXIoLS13YS1jb2xvci1icmFuZC1vbi1xdWlldCk7XG4gIH1cblxuICAud2Etc3VjY2VzcyxcbiAgOmhvc3QoW3ZhcmlhbnQ9J3N1Y2Nlc3MnXSkge1xuICAgIC0td2EtY29sb3ItZmlsbC1sb3VkOiB2YXIoLS13YS1jb2xvci1zdWNjZXNzLWZpbGwtbG91ZCk7XG4gICAgLS13YS1jb2xvci1maWxsLW5vcm1hbDogdmFyKC0td2EtY29sb3Itc3VjY2Vzcy1maWxsLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1maWxsLXF1aWV0OiB2YXIoLS13YS1jb2xvci1zdWNjZXNzLWZpbGwtcXVpZXQpO1xuICAgIC0td2EtY29sb3ItYm9yZGVyLWxvdWQ6IHZhcigtLXdhLWNvbG9yLXN1Y2Nlc3MtYm9yZGVyLWxvdWQpO1xuICAgIC0td2EtY29sb3ItYm9yZGVyLW5vcm1hbDogdmFyKC0td2EtY29sb3Itc3VjY2Vzcy1ib3JkZXItbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1xdWlldDogdmFyKC0td2EtY29sb3Itc3VjY2Vzcy1ib3JkZXItcXVpZXQpO1xuICAgIC0td2EtY29sb3Itb24tbG91ZDogdmFyKC0td2EtY29sb3Itc3VjY2Vzcy1vbi1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLW9uLW5vcm1hbDogdmFyKC0td2EtY29sb3Itc3VjY2Vzcy1vbi1ub3JtYWwpO1xuICAgIC0td2EtY29sb3Itb24tcXVpZXQ6IHZhcigtLXdhLWNvbG9yLXN1Y2Nlc3Mtb24tcXVpZXQpO1xuICB9XG5cbiAgLndhLXdhcm5pbmcsXG4gIDpob3N0KFt2YXJpYW50PSd3YXJuaW5nJ10pIHtcbiAgICAtLXdhLWNvbG9yLWZpbGwtbG91ZDogdmFyKC0td2EtY29sb3Itd2FybmluZy1maWxsLWxvdWQpO1xuICAgIC0td2EtY29sb3ItZmlsbC1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLXdhcm5pbmctZmlsbC1ub3JtYWwpO1xuICAgIC0td2EtY29sb3ItZmlsbC1xdWlldDogdmFyKC0td2EtY29sb3Itd2FybmluZy1maWxsLXF1aWV0KTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1sb3VkOiB2YXIoLS13YS1jb2xvci13YXJuaW5nLWJvcmRlci1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLXdhcm5pbmctYm9yZGVyLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItcXVpZXQ6IHZhcigtLXdhLWNvbG9yLXdhcm5pbmctYm9yZGVyLXF1aWV0KTtcbiAgICAtLXdhLWNvbG9yLW9uLWxvdWQ6IHZhcigtLXdhLWNvbG9yLXdhcm5pbmctb24tbG91ZCk7XG4gICAgLS13YS1jb2xvci1vbi1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLXdhcm5pbmctb24tbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLW9uLXF1aWV0OiB2YXIoLS13YS1jb2xvci13YXJuaW5nLW9uLXF1aWV0KTtcbiAgfVxuXG4gIC53YS1kYW5nZXIsXG4gIDpob3N0KFt2YXJpYW50PSdkYW5nZXInXSkge1xuICAgIC0td2EtY29sb3ItZmlsbC1sb3VkOiB2YXIoLS13YS1jb2xvci1kYW5nZXItZmlsbC1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLWZpbGwtbm9ybWFsOiB2YXIoLS13YS1jb2xvci1kYW5nZXItZmlsbC1ub3JtYWwpO1xuICAgIC0td2EtY29sb3ItZmlsbC1xdWlldDogdmFyKC0td2EtY29sb3ItZGFuZ2VyLWZpbGwtcXVpZXQpO1xuICAgIC0td2EtY29sb3ItYm9yZGVyLWxvdWQ6IHZhcigtLXdhLWNvbG9yLWRhbmdlci1ib3JkZXItbG91ZCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItbm9ybWFsOiB2YXIoLS13YS1jb2xvci1kYW5nZXItYm9yZGVyLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItcXVpZXQ6IHZhcigtLXdhLWNvbG9yLWRhbmdlci1ib3JkZXItcXVpZXQpO1xuICAgIC0td2EtY29sb3Itb24tbG91ZDogdmFyKC0td2EtY29sb3ItZGFuZ2VyLW9uLWxvdWQpO1xuICAgIC0td2EtY29sb3Itb24tbm9ybWFsOiB2YXIoLS13YS1jb2xvci1kYW5nZXItb24tbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLW9uLXF1aWV0OiB2YXIoLS13YS1jb2xvci1kYW5nZXItb24tcXVpZXQpO1xuICB9XG5gO1xuXG5leHBvcnQge1xuICB2YXJpYW50c19zdHlsZXNfZGVmYXVsdFxufTtcbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuaW1wb3J0IHtEaXNjb25uZWN0YWJsZSwgUGFydH0gZnJvbSAnLi9saXQtaHRtbC5qcyc7XG5cbmV4cG9ydCB7XG4gIEF0dHJpYnV0ZVBhcnQsXG4gIEJvb2xlYW5BdHRyaWJ1dGVQYXJ0LFxuICBDaGlsZFBhcnQsXG4gIEVsZW1lbnRQYXJ0LFxuICBFdmVudFBhcnQsXG4gIFBhcnQsXG4gIFByb3BlcnR5UGFydCxcbn0gZnJvbSAnLi9saXQtaHRtbC5qcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlyZWN0aXZlQ2xhc3Mge1xuICBuZXcgKHBhcnQ6IFBhcnRJbmZvKTogRGlyZWN0aXZlO1xufVxuXG4vKipcbiAqIFRoaXMgdXRpbGl0eSB0eXBlIGV4dHJhY3RzIHRoZSBzaWduYXR1cmUgb2YgYSBkaXJlY3RpdmUgY2xhc3MncyByZW5kZXIoKVxuICogbWV0aG9kIHNvIHdlIGNhbiB1c2UgaXQgZm9yIHRoZSB0eXBlIG9mIHRoZSBnZW5lcmF0ZWQgZGlyZWN0aXZlIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgdHlwZSBEaXJlY3RpdmVQYXJhbWV0ZXJzPEMgZXh0ZW5kcyBEaXJlY3RpdmU+ID0gUGFyYW1ldGVyczxDWydyZW5kZXInXT47XG5cbi8qKlxuICogQSBnZW5lcmF0ZWQgZGlyZWN0aXZlIGZ1bmN0aW9uIGRvZXNuJ3QgZXZhbHVhdGUgdGhlIGRpcmVjdGl2ZSwgYnV0IGp1c3RcbiAqIHJldHVybnMgYSBEaXJlY3RpdmVSZXN1bHQgb2JqZWN0IHRoYXQgY2FwdHVyZXMgdGhlIGFyZ3VtZW50cy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RpdmVSZXN1bHQ8QyBleHRlbmRzIERpcmVjdGl2ZUNsYXNzID0gRGlyZWN0aXZlQ2xhc3M+IHtcbiAgLyoqXG4gICAqIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgWydfJGxpdERpcmVjdGl2ZSQnXTogQztcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICB2YWx1ZXM6IERpcmVjdGl2ZVBhcmFtZXRlcnM8SW5zdGFuY2VUeXBlPEM+Pjtcbn1cblxuZXhwb3J0IGNvbnN0IFBhcnRUeXBlID0ge1xuICBBVFRSSUJVVEU6IDEsXG4gIENISUxEOiAyLFxuICBQUk9QRVJUWTogMyxcbiAgQk9PTEVBTl9BVFRSSUJVVEU6IDQsXG4gIEVWRU5UOiA1LFxuICBFTEVNRU5UOiA2LFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgUGFydFR5cGUgPSAodHlwZW9mIFBhcnRUeXBlKVtrZXlvZiB0eXBlb2YgUGFydFR5cGVdO1xuXG5leHBvcnQgaW50ZXJmYWNlIENoaWxkUGFydEluZm8ge1xuICByZWFkb25seSB0eXBlOiB0eXBlb2YgUGFydFR5cGUuQ0hJTEQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXR0cmlidXRlUGFydEluZm8ge1xuICByZWFkb25seSB0eXBlOlxuICAgIHwgdHlwZW9mIFBhcnRUeXBlLkFUVFJJQlVURVxuICAgIHwgdHlwZW9mIFBhcnRUeXBlLlBST1BFUlRZXG4gICAgfCB0eXBlb2YgUGFydFR5cGUuQk9PTEVBTl9BVFRSSUJVVEVcbiAgICB8IHR5cGVvZiBQYXJ0VHlwZS5FVkVOVDtcbiAgcmVhZG9ubHkgc3RyaW5ncz86IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbiAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICByZWFkb25seSB0YWdOYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRWxlbWVudFBhcnRJbmZvIHtcbiAgcmVhZG9ubHkgdHlwZTogdHlwZW9mIFBhcnRUeXBlLkVMRU1FTlQ7XG59XG5cbi8qKlxuICogSW5mb3JtYXRpb24gYWJvdXQgdGhlIHBhcnQgYSBkaXJlY3RpdmUgaXMgYm91bmQgdG8uXG4gKlxuICogVGhpcyBpcyB1c2VmdWwgZm9yIGNoZWNraW5nIHRoYXQgYSBkaXJlY3RpdmUgaXMgYXR0YWNoZWQgdG8gYSB2YWxpZCBwYXJ0LFxuICogc3VjaCBhcyB3aXRoIGRpcmVjdGl2ZSB0aGF0IGNhbiBvbmx5IGJlIHVzZWQgb24gYXR0cmlidXRlIGJpbmRpbmdzLlxuICovXG5leHBvcnQgdHlwZSBQYXJ0SW5mbyA9IENoaWxkUGFydEluZm8gfCBBdHRyaWJ1dGVQYXJ0SW5mbyB8IEVsZW1lbnRQYXJ0SW5mbztcblxuLyoqXG4gKiBDcmVhdGVzIGEgdXNlci1mYWNpbmcgZGlyZWN0aXZlIGZ1bmN0aW9uIGZyb20gYSBEaXJlY3RpdmUgY2xhc3MuIFRoaXNcbiAqIGZ1bmN0aW9uIGhhcyB0aGUgc2FtZSBwYXJhbWV0ZXJzIGFzIHRoZSBkaXJlY3RpdmUncyByZW5kZXIoKSBtZXRob2QuXG4gKi9cbmV4cG9ydCBjb25zdCBkaXJlY3RpdmUgPVxuICA8QyBleHRlbmRzIERpcmVjdGl2ZUNsYXNzPihjOiBDKSA9PlxuICAoLi4udmFsdWVzOiBEaXJlY3RpdmVQYXJhbWV0ZXJzPEluc3RhbmNlVHlwZTxDPj4pOiBEaXJlY3RpdmVSZXN1bHQ8Qz4gPT4gKHtcbiAgICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgIFsnXyRsaXREaXJlY3RpdmUkJ106IGMsXG4gICAgdmFsdWVzLFxuICB9KTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBjcmVhdGluZyBjdXN0b20gZGlyZWN0aXZlcy4gVXNlcnMgc2hvdWxkIGV4dGVuZCB0aGlzIGNsYXNzLFxuICogaW1wbGVtZW50IGByZW5kZXJgIGFuZC9vciBgdXBkYXRlYCwgYW5kIHRoZW4gcGFzcyB0aGVpciBzdWJjbGFzcyB0b1xuICogYGRpcmVjdGl2ZWAuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEaXJlY3RpdmUgaW1wbGVtZW50cyBEaXNjb25uZWN0YWJsZSB7XG4gIC8vQGludGVybmFsXG4gIF9fcGFydCE6IFBhcnQ7XG4gIC8vQGludGVybmFsXG4gIF9fYXR0cmlidXRlSW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgLy9AaW50ZXJuYWxcbiAgX19kaXJlY3RpdmU/OiBEaXJlY3RpdmU7XG5cbiAgLy9AaW50ZXJuYWxcbiAgXyRwYXJlbnQhOiBEaXNjb25uZWN0YWJsZTtcblxuICAvLyBUaGVzZSB3aWxsIG9ubHkgZXhpc3Qgb24gdGhlIEFzeW5jRGlyZWN0aXZlIHN1YmNsYXNzXG4gIC8vQGludGVybmFsXG4gIF8kZGlzY29ubmVjdGFibGVDaGlsZHJlbj86IFNldDxEaXNjb25uZWN0YWJsZT47XG4gIC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gIC8vQGludGVybmFsXG4gIFsnXyRub3RpZnlEaXJlY3RpdmVDb25uZWN0aW9uQ2hhbmdlZCddPyhpc0Nvbm5lY3RlZDogYm9vbGVhbik6IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoX3BhcnRJbmZvOiBQYXJ0SW5mbykge31cblxuICAvLyBTZWUgY29tbWVudCBpbiBEaXNjb25uZWN0YWJsZSBpbnRlcmZhY2UgZm9yIHdoeSB0aGlzIGlzIGEgZ2V0dGVyXG4gIGdldCBfJGlzQ29ubmVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl8kcGFyZW50Ll8kaXNDb25uZWN0ZWQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF8kaW5pdGlhbGl6ZShcbiAgICBwYXJ0OiBQYXJ0LFxuICAgIHBhcmVudDogRGlzY29ubmVjdGFibGUsXG4gICAgYXR0cmlidXRlSW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZFxuICApIHtcbiAgICB0aGlzLl9fcGFydCA9IHBhcnQ7XG4gICAgdGhpcy5fJHBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLl9fYXR0cmlidXRlSW5kZXggPSBhdHRyaWJ1dGVJbmRleDtcbiAgfVxuICAvKiogQGludGVybmFsICovXG4gIF8kcmVzb2x2ZShwYXJ0OiBQYXJ0LCBwcm9wczogQXJyYXk8dW5rbm93bj4pOiB1bmtub3duIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGUocGFydCwgcHJvcHMpO1xuICB9XG5cbiAgYWJzdHJhY3QgcmVuZGVyKC4uLnByb3BzOiBBcnJheTx1bmtub3duPik6IHVua25vd247XG5cbiAgdXBkYXRlKF9wYXJ0OiBQYXJ0LCBwcm9wczogQXJyYXk8dW5rbm93bj4pOiB1bmtub3duIHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXIoLi4ucHJvcHMpO1xuICB9XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbmltcG9ydCB7QXR0cmlidXRlUGFydCwgbm9DaGFuZ2V9IGZyb20gJy4uL2xpdC1odG1sLmpzJztcbmltcG9ydCB7XG4gIGRpcmVjdGl2ZSxcbiAgRGlyZWN0aXZlLFxuICBEaXJlY3RpdmVQYXJhbWV0ZXJzLFxuICBQYXJ0SW5mbyxcbiAgUGFydFR5cGUsXG59IGZyb20gJy4uL2RpcmVjdGl2ZS5qcyc7XG5cbi8qKlxuICogQSBrZXktdmFsdWUgc2V0IG9mIGNsYXNzIG5hbWVzIHRvIHRydXRoeSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2xhc3NJbmZvIHtcbiAgW25hbWU6IHN0cmluZ106IHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXI7XG59XG5cbmNsYXNzIENsYXNzTWFwRGlyZWN0aXZlIGV4dGVuZHMgRGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIFN0b3JlcyB0aGUgQ2xhc3NJbmZvIG9iamVjdCBhcHBsaWVkIHRvIGEgZ2l2ZW4gQXR0cmlidXRlUGFydC5cbiAgICogVXNlZCB0byB1bnNldCBleGlzdGluZyB2YWx1ZXMgd2hlbiBhIG5ldyBDbGFzc0luZm8gb2JqZWN0IGlzIGFwcGxpZWQuXG4gICAqL1xuICBwcml2YXRlIF9wcmV2aW91c0NsYXNzZXM/OiBTZXQ8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfc3RhdGljQ2xhc3Nlcz86IFNldDxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKHBhcnRJbmZvOiBQYXJ0SW5mbykge1xuICAgIHN1cGVyKHBhcnRJbmZvKTtcbiAgICBpZiAoXG4gICAgICBwYXJ0SW5mby50eXBlICE9PSBQYXJ0VHlwZS5BVFRSSUJVVEUgfHxcbiAgICAgIHBhcnRJbmZvLm5hbWUgIT09ICdjbGFzcycgfHxcbiAgICAgIChwYXJ0SW5mby5zdHJpbmdzPy5sZW5ndGggYXMgbnVtYmVyKSA+IDJcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2BjbGFzc01hcCgpYCBjYW4gb25seSBiZSB1c2VkIGluIHRoZSBgY2xhc3NgIGF0dHJpYnV0ZSAnICtcbiAgICAgICAgICAnYW5kIG11c3QgYmUgdGhlIG9ubHkgcGFydCBpbiB0aGUgYXR0cmlidXRlLidcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKGNsYXNzSW5mbzogQ2xhc3NJbmZvKSB7XG4gICAgLy8gQWRkIHNwYWNlcyB0byBlbnN1cmUgc2VwYXJhdGlvbiBmcm9tIHN0YXRpYyBjbGFzc2VzXG4gICAgcmV0dXJuIChcbiAgICAgICcgJyArXG4gICAgICBPYmplY3Qua2V5cyhjbGFzc0luZm8pXG4gICAgICAgIC5maWx0ZXIoKGtleSkgPT4gY2xhc3NJbmZvW2tleV0pXG4gICAgICAgIC5qb2luKCcgJykgK1xuICAgICAgJyAnXG4gICAgKTtcbiAgfVxuXG4gIG92ZXJyaWRlIHVwZGF0ZShwYXJ0OiBBdHRyaWJ1dGVQYXJ0LCBbY2xhc3NJbmZvXTogRGlyZWN0aXZlUGFyYW1ldGVyczx0aGlzPikge1xuICAgIC8vIFJlbWVtYmVyIGR5bmFtaWMgY2xhc3NlcyBvbiB0aGUgZmlyc3QgcmVuZGVyXG4gICAgaWYgKHRoaXMuX3ByZXZpb3VzQ2xhc3NlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9wcmV2aW91c0NsYXNzZXMgPSBuZXcgU2V0KCk7XG4gICAgICBpZiAocGFydC5zdHJpbmdzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc3RhdGljQ2xhc3NlcyA9IG5ldyBTZXQoXG4gICAgICAgICAgcGFydC5zdHJpbmdzXG4gICAgICAgICAgICAuam9pbignICcpXG4gICAgICAgICAgICAuc3BsaXQoL1xccy8pXG4gICAgICAgICAgICAuZmlsdGVyKChzKSA9PiBzICE9PSAnJylcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBjbGFzc0luZm8pIHtcbiAgICAgICAgaWYgKGNsYXNzSW5mb1tuYW1lXSAmJiAhdGhpcy5fc3RhdGljQ2xhc3Nlcz8uaGFzKG5hbWUpKSB7XG4gICAgICAgICAgdGhpcy5fcHJldmlvdXNDbGFzc2VzLmFkZChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKGNsYXNzSW5mbyk7XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NMaXN0ID0gcGFydC5lbGVtZW50LmNsYXNzTGlzdDtcblxuICAgIC8vIFJlbW92ZSBvbGQgY2xhc3NlcyB0aGF0IG5vIGxvbmdlciBhcHBseVxuICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLl9wcmV2aW91c0NsYXNzZXMpIHtcbiAgICAgIGlmICghKG5hbWUgaW4gY2xhc3NJbmZvKSkge1xuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgICAgICB0aGlzLl9wcmV2aW91c0NsYXNzZXMhLmRlbGV0ZShuYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgb3IgcmVtb3ZlIGNsYXNzZXMgYmFzZWQgb24gdGhlaXIgY2xhc3NNYXAgdmFsdWVcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gY2xhc3NJbmZvKSB7XG4gICAgICAvLyBXZSBleHBsaWNpdGx5IHdhbnQgYSBsb29zZSB0cnV0aHkgY2hlY2sgb2YgYHZhbHVlYCBiZWNhdXNlIGl0IHNlZW1zXG4gICAgICAvLyBtb3JlIGNvbnZlbmllbnQgdGhhdCAnJyBhbmQgMCBhcmUgc2tpcHBlZC5cbiAgICAgIGNvbnN0IHZhbHVlID0gISFjbGFzc0luZm9bbmFtZV07XG4gICAgICBpZiAoXG4gICAgICAgIHZhbHVlICE9PSB0aGlzLl9wcmV2aW91c0NsYXNzZXMuaGFzKG5hbWUpICYmXG4gICAgICAgICF0aGlzLl9zdGF0aWNDbGFzc2VzPy5oYXMobmFtZSlcbiAgICAgICkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKG5hbWUpO1xuICAgICAgICAgIHRoaXMuX3ByZXZpb3VzQ2xhc3Nlcy5hZGQobmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgICAgICAgICB0aGlzLl9wcmV2aW91c0NsYXNzZXMuZGVsZXRlKG5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub0NoYW5nZTtcbiAgfVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgYXBwbGllcyBkeW5hbWljIENTUyBjbGFzc2VzLlxuICpcbiAqIFRoaXMgbXVzdCBiZSB1c2VkIGluIHRoZSBgY2xhc3NgIGF0dHJpYnV0ZSBhbmQgbXVzdCBiZSB0aGUgb25seSBwYXJ0IHVzZWQgaW5cbiAqIHRoZSBhdHRyaWJ1dGUuIEl0IHRha2VzIGVhY2ggcHJvcGVydHkgaW4gdGhlIGBjbGFzc0luZm9gIGFyZ3VtZW50IGFuZCBhZGRzXG4gKiB0aGUgcHJvcGVydHkgbmFtZSB0byB0aGUgZWxlbWVudCdzIGBjbGFzc0xpc3RgIGlmIHRoZSBwcm9wZXJ0eSB2YWx1ZSBpc1xuICogdHJ1dGh5OyBpZiB0aGUgcHJvcGVydHkgdmFsdWUgaXMgZmFsc3ksIHRoZSBwcm9wZXJ0eSBuYW1lIGlzIHJlbW92ZWQgZnJvbVxuICogdGhlIGVsZW1lbnQncyBgY2xhc3NgLlxuICpcbiAqIEZvciBleGFtcGxlIGB7Zm9vOiBiYXJ9YCBhcHBsaWVzIHRoZSBjbGFzcyBgZm9vYCBpZiB0aGUgdmFsdWUgb2YgYGJhcmAgaXNcbiAqIHRydXRoeS5cbiAqXG4gKiBAcGFyYW0gY2xhc3NJbmZvXG4gKi9cbmV4cG9ydCBjb25zdCBjbGFzc01hcCA9IGRpcmVjdGl2ZShDbGFzc01hcERpcmVjdGl2ZSk7XG5cbi8qKlxuICogVGhlIHR5cGUgb2YgdGhlIGNsYXNzIHRoYXQgcG93ZXJzIHRoaXMgZGlyZWN0aXZlLiBOZWNlc3NhcnkgZm9yIG5hbWluZyB0aGVcbiAqIGRpcmVjdGl2ZSdzIHJldHVybiB0eXBlLlxuICovXG5leHBvcnQgdHlwZSB7Q2xhc3NNYXBEaXJlY3RpdmV9O1xuIiwgIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuXG5pbXBvcnQge25vdGhpbmd9IGZyb20gJy4uL2xpdC1odG1sLmpzJztcblxuLyoqXG4gKiBGb3IgQXR0cmlidXRlUGFydHMsIHNldHMgdGhlIGF0dHJpYnV0ZSBpZiB0aGUgdmFsdWUgaXMgZGVmaW5lZCBhbmQgcmVtb3Zlc1xuICogdGhlIGF0dHJpYnV0ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLlxuICpcbiAqIEZvciBvdGhlciBwYXJ0IHR5cGVzLCB0aGlzIGRpcmVjdGl2ZSBpcyBhIG5vLW9wLlxuICovXG5leHBvcnQgY29uc3QgaWZEZWZpbmVkID0gPFQ+KHZhbHVlOiBUKSA9PiB2YWx1ZSA/PyBub3RoaW5nO1xuIiwgIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuXG4vLyBBbnkgbmV3IGV4cG9ydHMgbmVlZCB0byBiZSBhZGRlZCB0byB0aGUgZXhwb3J0IHN0YXRlbWVudCBpblxuLy8gYHBhY2thZ2VzL2xpdC9zcmMvaW5kZXguYWxsLnRzYC5cblxuaW1wb3J0IHtcbiAgaHRtbCBhcyBjb3JlSHRtbCxcbiAgc3ZnIGFzIGNvcmVTdmcsXG4gIG1hdGhtbCBhcyBjb3JlTWF0aG1sLFxuICBUZW1wbGF0ZVJlc3VsdCxcbn0gZnJvbSAnLi9saXQtaHRtbC5qcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGljVmFsdWUge1xuICAvKiogVGhlIHZhbHVlIHRvIGludGVycG9sYXRlIGFzLWlzIGludG8gdGhlIHRlbXBsYXRlLiAqL1xuICBfJGxpdFN0YXRpYyQ6IHN0cmluZztcblxuICAvKipcbiAgICogQSB2YWx1ZSB0aGF0IGNhbid0IGJlIGRlY29kZWQgZnJvbSBvcmRpbmFyeSBKU09OLCBtYWtlIGl0IGhhcmRlciBmb3JcbiAgICogYW4gYXR0YWNrZXItY29udHJvbGxlZCBkYXRhIHRoYXQgZ29lcyB0aHJvdWdoIEpTT04ucGFyc2UgdG8gcHJvZHVjZSBhIHZhbGlkXG4gICAqIFN0YXRpY1ZhbHVlLlxuICAgKi9cbiAgcjogdHlwZW9mIGJyYW5kO1xufVxuXG4vKipcbiAqIFByZXZlbnRzIEpTT04gaW5qZWN0aW9uIGF0dGFja3MuXG4gKlxuICogVGhlIGdvYWxzIG9mIHRoaXMgYnJhbmQ6XG4gKiAgIDEpIGZhc3QgdG8gY2hlY2tcbiAqICAgMikgY29kZSBpcyBzbWFsbCBvbiB0aGUgd2lyZVxuICogICAzKSBtdWx0aXBsZSB2ZXJzaW9ucyBvZiBMaXQgaW4gYSBzaW5nbGUgcGFnZSB3aWxsIGFsbCBwcm9kdWNlIG11dHVhbGx5XG4gKiAgICAgIGludGVyb3BlcmFibGUgU3RhdGljVmFsdWVzXG4gKiAgIDQpIG5vcm1hbCBKU09OLnBhcnNlICh3aXRob3V0IGFuIHVudXN1YWwgcmV2aXZlcikgY2FuIG5vdCBwcm9kdWNlIGFcbiAqICAgICAgU3RhdGljVmFsdWVcbiAqXG4gKiBTeW1ib2xzIHNhdGlzZnkgKDEpLCAoMiksIGFuZCAoNCkuIFdlIHVzZSBTeW1ib2wuZm9yIHRvIHNhdGlzZnkgKDMpLCBidXRcbiAqIHdlIGRvbid0IGNhcmUgYWJvdXQgdGhlIGtleSwgc28gd2UgYnJlYWsgdGllcyB2aWEgKDIpIGFuZCB1c2UgdGhlIGVtcHR5XG4gKiBzdHJpbmcuXG4gKi9cbmNvbnN0IGJyYW5kID0gU3ltYm9sLmZvcignJyk7XG5cbi8qKiBTYWZlbHkgZXh0cmFjdHMgdGhlIHN0cmluZyBwYXJ0IG9mIGEgU3RhdGljVmFsdWUuICovXG5jb25zdCB1bndyYXBTdGF0aWNWYWx1ZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmICgodmFsdWUgYXMgUGFydGlhbDxTdGF0aWNWYWx1ZT4pPy5yICE9PSBicmFuZCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuICh2YWx1ZSBhcyBQYXJ0aWFsPFN0YXRpY1ZhbHVlPik/LlsnXyRsaXRTdGF0aWMkJ107XG59O1xuXG4vKipcbiAqIFdyYXBzIGEgc3RyaW5nIHNvIHRoYXQgaXQgYmVoYXZlcyBsaWtlIHBhcnQgb2YgdGhlIHN0YXRpYyB0ZW1wbGF0ZVxuICogc3RyaW5ncyBpbnN0ZWFkIG9mIGEgZHluYW1pYyB2YWx1ZS5cbiAqXG4gKiBVc2VycyBtdXN0IHRha2UgY2FyZSB0byBlbnN1cmUgdGhhdCBhZGRpbmcgdGhlIHN0YXRpYyBzdHJpbmcgdG8gdGhlIHRlbXBsYXRlXG4gKiByZXN1bHRzIGluIHdlbGwtZm9ybWVkIEhUTUwsIG9yIGVsc2UgdGVtcGxhdGVzIG1heSBicmVhayB1bmV4cGVjdGVkbHkuXG4gKlxuICogTm90ZSB0aGF0IHRoaXMgZnVuY3Rpb24gaXMgdW5zYWZlIHRvIHVzZSBvbiB1bnRydXN0ZWQgY29udGVudCwgYXMgaXQgd2lsbCBiZVxuICogZGlyZWN0bHkgcGFyc2VkIGludG8gSFRNTC4gRG8gbm90IHBhc3MgdXNlciBpbnB1dCB0byB0aGlzIGZ1bmN0aW9uXG4gKiB3aXRob3V0IHNhbml0aXppbmcgaXQuXG4gKlxuICogU3RhdGljIHZhbHVlcyBjYW4gYmUgY2hhbmdlZCwgYnV0IHRoZXkgd2lsbCBjYXVzZSBhIGNvbXBsZXRlIHJlLXJlbmRlclxuICogc2luY2UgdGhleSBlZmZlY3RpdmVseSBjcmVhdGUgYSBuZXcgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBjb25zdCB1bnNhZmVTdGF0aWMgPSAodmFsdWU6IHN0cmluZyk6IFN0YXRpY1ZhbHVlID0+ICh7XG4gIFsnXyRsaXRTdGF0aWMkJ106IHZhbHVlLFxuICByOiBicmFuZCxcbn0pO1xuXG5jb25zdCB0ZXh0RnJvbVN0YXRpYyA9ICh2YWx1ZTogU3RhdGljVmFsdWUpID0+IHtcbiAgaWYgKHZhbHVlWydfJGxpdFN0YXRpYyQnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHZhbHVlWydfJGxpdFN0YXRpYyQnXTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgVmFsdWUgcGFzc2VkIHRvICdsaXRlcmFsJyBmdW5jdGlvbiBtdXN0IGJlIGEgJ2xpdGVyYWwnIHJlc3VsdDogJHt2YWx1ZX0uIFVzZSAndW5zYWZlU3RhdGljJyB0byBwYXNzIG5vbi1saXRlcmFsIHZhbHVlcywgYnV0XG4gICAgICAgICAgICB0YWtlIGNhcmUgdG8gZW5zdXJlIHBhZ2Ugc2VjdXJpdHkuYFxuICAgICk7XG4gIH1cbn07XG5cbi8qKlxuICogVGFncyBhIHN0cmluZyBsaXRlcmFsIHNvIHRoYXQgaXQgYmVoYXZlcyBsaWtlIHBhcnQgb2YgdGhlIHN0YXRpYyB0ZW1wbGF0ZVxuICogc3RyaW5ncyBpbnN0ZWFkIG9mIGEgZHluYW1pYyB2YWx1ZS5cbiAqXG4gKiBUaGUgb25seSB2YWx1ZXMgdGhhdCBtYXkgYmUgdXNlZCBpbiB0ZW1wbGF0ZSBleHByZXNzaW9ucyBhcmUgb3RoZXIgdGFnZ2VkXG4gKiBgbGl0ZXJhbGAgcmVzdWx0cyBvciBgdW5zYWZlU3RhdGljYCB2YWx1ZXMgKG5vdGUgdGhhdCB1bnRydXN0ZWQgY29udGVudFxuICogc2hvdWxkIG5ldmVyIGJlIHBhc3NlZCB0byBgdW5zYWZlU3RhdGljYCkuXG4gKlxuICogVXNlcnMgbXVzdCB0YWtlIGNhcmUgdG8gZW5zdXJlIHRoYXQgYWRkaW5nIHRoZSBzdGF0aWMgc3RyaW5nIHRvIHRoZSB0ZW1wbGF0ZVxuICogcmVzdWx0cyBpbiB3ZWxsLWZvcm1lZCBIVE1MLCBvciBlbHNlIHRlbXBsYXRlcyBtYXkgYnJlYWsgdW5leHBlY3RlZGx5LlxuICpcbiAqIFN0YXRpYyB2YWx1ZXMgY2FuIGJlIGNoYW5nZWQsIGJ1dCB0aGV5IHdpbGwgY2F1c2UgYSBjb21wbGV0ZSByZS1yZW5kZXIgc2luY2VcbiAqIHRoZXkgZWZmZWN0aXZlbHkgY3JlYXRlIGEgbmV3IHRlbXBsYXRlLlxuICovXG5leHBvcnQgY29uc3QgbGl0ZXJhbCA9IChcbiAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXksXG4gIC4uLnZhbHVlczogdW5rbm93bltdXG4pOiBTdGF0aWNWYWx1ZSA9PiAoe1xuICBbJ18kbGl0U3RhdGljJCddOiB2YWx1ZXMucmVkdWNlKFxuICAgIChhY2MsIHYsIGlkeCkgPT4gYWNjICsgdGV4dEZyb21TdGF0aWModiBhcyBTdGF0aWNWYWx1ZSkgKyBzdHJpbmdzW2lkeCArIDFdLFxuICAgIHN0cmluZ3NbMF1cbiAgKSBhcyBzdHJpbmcsXG4gIHI6IGJyYW5kLFxufSk7XG5cbmNvbnN0IHN0cmluZ3NDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBUZW1wbGF0ZVN0cmluZ3NBcnJheT4oKTtcblxuLyoqXG4gKiBXcmFwcyBhIGxpdC1odG1sIHRlbXBsYXRlIHRhZyAoYGh0bWxgIG9yIGBzdmdgKSB0byBhZGQgc3RhdGljIHZhbHVlIHN1cHBvcnQuXG4gKi9cbmV4cG9ydCBjb25zdCB3aXRoU3RhdGljID1cbiAgKGNvcmVUYWc6IHR5cGVvZiBjb3JlSHRtbCB8IHR5cGVvZiBjb3JlU3ZnIHwgdHlwZW9mIGNvcmVNYXRobWwpID0+XG4gIChzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4udmFsdWVzOiB1bmtub3duW10pOiBUZW1wbGF0ZVJlc3VsdCA9PiB7XG4gICAgY29uc3QgbCA9IHZhbHVlcy5sZW5ndGg7XG4gICAgbGV0IHN0YXRpY1ZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgbGV0IGR5bmFtaWNWYWx1ZTogdW5rbm93bjtcbiAgICBjb25zdCBzdGF0aWNTdHJpbmdzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgY29uc3QgZHluYW1pY1ZhbHVlczogQXJyYXk8dW5rbm93bj4gPSBbXTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGhhc1N0YXRpY3MgPSBmYWxzZTtcbiAgICBsZXQgczogc3RyaW5nO1xuXG4gICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICBzID0gc3RyaW5nc1tpXTtcbiAgICAgIC8vIENvbGxlY3QgYW55IHVuc2FmZVN0YXRpYyB2YWx1ZXMsIGFuZCB0aGVpciBmb2xsb3dpbmcgdGVtcGxhdGUgc3RyaW5nc1xuICAgICAgLy8gc28gdGhhdCB3ZSB0cmVhdCBhIHJ1biBvZiB0ZW1wbGF0ZSBzdHJpbmdzIGFuZCB1bnNhZmUgc3RhdGljIHZhbHVlcyBhc1xuICAgICAgLy8gYSBzaW5nbGUgdGVtcGxhdGUgc3RyaW5nLlxuICAgICAgd2hpbGUgKFxuICAgICAgICBpIDwgbCAmJlxuICAgICAgICAoKGR5bmFtaWNWYWx1ZSA9IHZhbHVlc1tpXSksXG4gICAgICAgIChzdGF0aWNWYWx1ZSA9IHVud3JhcFN0YXRpY1ZhbHVlKGR5bmFtaWNWYWx1ZSkpKSAhPT0gdW5kZWZpbmVkXG4gICAgICApIHtcbiAgICAgICAgcyArPSBzdGF0aWNWYWx1ZSArIHN0cmluZ3NbKytpXTtcbiAgICAgICAgaGFzU3RhdGljcyA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBJZiB0aGUgbGFzdCB2YWx1ZSBpcyBzdGF0aWMsIHdlIGRvbid0IG5lZWQgdG8gcHVzaCBpdC5cbiAgICAgIGlmIChpICE9PSBsKSB7XG4gICAgICAgIGR5bmFtaWNWYWx1ZXMucHVzaChkeW5hbWljVmFsdWUpO1xuICAgICAgfVxuICAgICAgc3RhdGljU3RyaW5ncy5wdXNoKHMpO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgbGFzdCB2YWx1ZSBpc24ndCBzdGF0aWMgKHdoaWNoIHdvdWxkIGhhdmUgY29uc3VtZWQgdGhlIGxhc3RcbiAgICAvLyBzdHJpbmcpLCB0aGVuIHdlIG5lZWQgdG8gYWRkIHRoZSBsYXN0IHN0cmluZy5cbiAgICBpZiAoaSA9PT0gbCkge1xuICAgICAgc3RhdGljU3RyaW5ncy5wdXNoKHN0cmluZ3NbbF0pO1xuICAgIH1cblxuICAgIGlmIChoYXNTdGF0aWNzKSB7XG4gICAgICBjb25zdCBrZXkgPSBzdGF0aWNTdHJpbmdzLmpvaW4oJyQkbGl0JCQnKTtcbiAgICAgIHN0cmluZ3MgPSBzdHJpbmdzQ2FjaGUuZ2V0KGtleSkhO1xuICAgICAgaWYgKHN0cmluZ3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBCZXdhcmU6IGluIGdlbmVyYWwgdGhpcyBwYXR0ZXJuIGlzIHVuc2FmZSwgYW5kIGRvaW5nIHNvIG1heSBieXBhc3NcbiAgICAgICAgLy8gbGl0J3Mgc2VjdXJpdHkgY2hlY2tzIGFuZCBhbGxvdyBhbiBhdHRhY2tlciB0byBleGVjdXRlIGFyYml0cmFyeVxuICAgICAgICAvLyBjb2RlIGFuZCBpbmplY3QgYXJiaXRyYXJ5IGNvbnRlbnQuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIChzdGF0aWNTdHJpbmdzIGFzIGFueSkucmF3ID0gc3RhdGljU3RyaW5ncztcbiAgICAgICAgc3RyaW5nc0NhY2hlLnNldChcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgKHN0cmluZ3MgPSBzdGF0aWNTdHJpbmdzIGFzIHVua25vd24gYXMgVGVtcGxhdGVTdHJpbmdzQXJyYXkpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB2YWx1ZXMgPSBkeW5hbWljVmFsdWVzO1xuICAgIH1cbiAgICByZXR1cm4gY29yZVRhZyhzdHJpbmdzLCAuLi52YWx1ZXMpO1xuICB9O1xuXG4vKipcbiAqIEludGVycHJldHMgYSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIGFuIEhUTUwgdGVtcGxhdGUgdGhhdCBjYW4gZWZmaWNpZW50bHlcbiAqIHJlbmRlciB0byBhbmQgdXBkYXRlIGEgY29udGFpbmVyLlxuICpcbiAqIEluY2x1ZGVzIHN0YXRpYyB2YWx1ZSBzdXBwb3J0IGZyb20gYGxpdC1odG1sL3N0YXRpYy5qc2AuXG4gKi9cbmV4cG9ydCBjb25zdCBodG1sID0gd2l0aFN0YXRpYyhjb3JlSHRtbCk7XG5cbi8qKlxuICogSW50ZXJwcmV0cyBhIHRlbXBsYXRlIGxpdGVyYWwgYXMgYW4gU1ZHIHRlbXBsYXRlIHRoYXQgY2FuIGVmZmljaWVudGx5XG4gKiByZW5kZXIgdG8gYW5kIHVwZGF0ZSBhIGNvbnRhaW5lci5cbiAqXG4gKiBJbmNsdWRlcyBzdGF0aWMgdmFsdWUgc3VwcG9ydCBmcm9tIGBsaXQtaHRtbC9zdGF0aWMuanNgLlxuICovXG5leHBvcnQgY29uc3Qgc3ZnID0gd2l0aFN0YXRpYyhjb3JlU3ZnKTtcblxuLyoqXG4gKiBJbnRlcnByZXRzIGEgdGVtcGxhdGUgbGl0ZXJhbCBhcyBNYXRoTUwgZnJhZ21lbnQgdGhhdCBjYW4gZWZmaWNpZW50bHkgcmVuZGVyXG4gKiB0byBhbmQgdXBkYXRlIGEgY29udGFpbmVyLlxuICpcbiAqIEluY2x1ZGVzIHN0YXRpYyB2YWx1ZSBzdXBwb3J0IGZyb20gYGxpdC1odG1sL3N0YXRpYy5qc2AuXG4gKi9cbmV4cG9ydCBjb25zdCBtYXRobWwgPSB3aXRoU3RhdGljKGNvcmVNYXRobWwpO1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cbmltcG9ydCB7XG4gIE1pcnJvclZhbGlkYXRvclxufSBmcm9tIFwiLi9jaHVuay5SN1FYNE02Ui5qc1wiO1xuaW1wb3J0IHtcbiAgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudFxufSBmcm9tIFwiLi9jaHVuay5JUFdQUklIWi5qc1wiO1xuaW1wb3J0IHtcbiAgV2FJbnZhbGlkRXZlbnRcbn0gZnJvbSBcIi4vY2h1bmsuVkMzQlBVWkouanNcIjtcbmltcG9ydCB7XG4gIEhhc1Nsb3RDb250cm9sbGVyXG59IGZyb20gXCIuL2NodW5rLktJSEIzVk1CLmpzXCI7XG5pbXBvcnQge1xuICBzaXplX3N0eWxlc19kZWZhdWx0XG59IGZyb20gXCIuL2NodW5rLjZKNlFZRkhWLmpzXCI7XG5pbXBvcnQge1xuICBidXR0b25fc3R5bGVzX2RlZmF1bHRcbn0gZnJvbSBcIi4vY2h1bmsuNEZPSFVCQlMuanNcIjtcbmltcG9ydCB7XG4gIHdhdGNoXG59IGZyb20gXCIuL2NodW5rLlBaQU42RlBOLmpzXCI7XG5pbXBvcnQge1xuICBMb2NhbGl6ZUNvbnRyb2xsZXJcbn0gZnJvbSBcIi4vY2h1bmsuT0tYQk5SRTYuanNcIjtcbmltcG9ydCB7XG4gIHZhcmlhbnRzX3N0eWxlc19kZWZhdWx0XG59IGZyb20gXCIuL2NodW5rLlhOVFA3REVRLmpzXCI7XG5pbXBvcnQge1xuICBfX2RlY29yYXRlQ2xhc3Ncbn0gZnJvbSBcIi4vY2h1bmsuN1ZHQ0lIREcuanNcIjtcblxuLy8gc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbi50c1xuaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgcHJvcGVydHksIHF1ZXJ5LCBzdGF0ZSB9IGZyb20gXCJsaXQvZGVjb3JhdG9ycy5qc1wiO1xuaW1wb3J0IHsgY2xhc3NNYXAgfSBmcm9tIFwibGl0L2RpcmVjdGl2ZXMvY2xhc3MtbWFwLmpzXCI7XG5pbXBvcnQgeyBpZkRlZmluZWQgfSBmcm9tIFwibGl0L2RpcmVjdGl2ZXMvaWYtZGVmaW5lZC5qc1wiO1xuaW1wb3J0IHsgaHRtbCwgbGl0ZXJhbCB9IGZyb20gXCJsaXQvc3RhdGljLWh0bWwuanNcIjtcbnZhciBXYUJ1dHRvbiA9IGNsYXNzIGV4dGVuZHMgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy5hc3N1bWVJbnRlcmFjdGlvbk9uID0gW1wiY2xpY2tcIl07XG4gICAgdGhpcy5oYXNTbG90Q29udHJvbGxlciA9IG5ldyBIYXNTbG90Q29udHJvbGxlcih0aGlzLCBcIltkZWZhdWx0XVwiLCBcInN0YXJ0XCIsIFwiZW5kXCIpO1xuICAgIHRoaXMubG9jYWxpemUgPSBuZXcgTG9jYWxpemVDb250cm9sbGVyKHRoaXMpO1xuICAgIHRoaXMuaW52YWxpZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNJY29uQnV0dG9uID0gZmFsc2U7XG4gICAgdGhpcy50aXRsZSA9IFwiXCI7XG4gICAgdGhpcy52YXJpYW50ID0gXCJuZXV0cmFsXCI7XG4gICAgdGhpcy5hcHBlYXJhbmNlID0gXCJhY2NlbnRcIjtcbiAgICB0aGlzLnNpemUgPSBcIm1lZGl1bVwiO1xuICAgIHRoaXMud2l0aENhcmV0ID0gZmFsc2U7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMucGlsbCA9IGZhbHNlO1xuICAgIHRoaXMudHlwZSA9IFwiYnV0dG9uXCI7XG4gIH1cbiAgc3RhdGljIGdldCB2YWxpZGF0b3JzKCkge1xuICAgIHJldHVybiBbLi4uc3VwZXIudmFsaWRhdG9ycywgTWlycm9yVmFsaWRhdG9yKCldO1xuICB9XG4gIGNvbnN0cnVjdExpZ2h0RE9NQnV0dG9uKCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgZm9yIChjb25zdCBhdHRyaWJ1dGUgb2YgdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICBpZiAoYXR0cmlidXRlLm5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfVxuICAgIGJ1dHRvbi50eXBlID0gdGhpcy50eXBlO1xuICAgIGJ1dHRvbi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGUgIWltcG9ydGFudFwiO1xuICAgIGJ1dHRvbi5zdHlsZS53aWR0aCA9IFwiMCAhaW1wb3J0YW50XCI7XG4gICAgYnV0dG9uLnN0eWxlLmhlaWdodCA9IFwiMCAhaW1wb3J0YW50XCI7XG4gICAgYnV0dG9uLnN0eWxlLmNsaXBQYXRoID0gXCJpbnNldCg1MCUpICFpbXBvcnRhbnRcIjtcbiAgICBidXR0b24uc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlbiAhaW1wb3J0YW50XCI7XG4gICAgYnV0dG9uLnN0eWxlLndoaXRlU3BhY2UgPSBcIm5vd3JhcCAhaW1wb3J0YW50XCI7XG4gICAgaWYgKHRoaXMubmFtZSkge1xuICAgICAgYnV0dG9uLm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgfVxuICAgIGJ1dHRvbi52YWx1ZSA9IHRoaXMudmFsdWUgfHwgXCJcIjtcbiAgICByZXR1cm4gYnV0dG9uO1xuICB9XG4gIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5sb2FkaW5nKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnR5cGUgIT09IFwic3VibWl0XCIgJiYgdGhpcy50eXBlICE9PSBcInJlc2V0XCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuZ2V0Rm9ybSgpO1xuICAgIGlmICghZm9ybSkgcmV0dXJuO1xuICAgIGNvbnN0IGxpZ2h0RE9NQnV0dG9uID0gdGhpcy5jb25zdHJ1Y3RMaWdodERPTUJ1dHRvbigpO1xuICAgIHRoaXMucGFyZW50RWxlbWVudD8uYXBwZW5kKGxpZ2h0RE9NQnV0dG9uKTtcbiAgICBsaWdodERPTUJ1dHRvbi5jbGljaygpO1xuICAgIGxpZ2h0RE9NQnV0dG9uLnJlbW92ZSgpO1xuICB9XG4gIGhhbmRsZUludmFsaWQoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBXYUludmFsaWRFdmVudCgpKTtcbiAgfVxuICBoYW5kbGVMYWJlbFNsb3RDaGFuZ2UoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLmxhYmVsU2xvdC5hc3NpZ25lZE5vZGVzKHsgZmxhdHRlbjogdHJ1ZSB9KTtcbiAgICBsZXQgaGFzSWNvbkxhYmVsID0gZmFsc2U7XG4gICAgbGV0IGhhc0ljb24gPSBmYWxzZTtcbiAgICBsZXQgaGFzVGV4dCA9IGZhbHNlO1xuICAgIGxldCBoYXNPdGhlckVsZW1lbnRzID0gZmFsc2U7XG4gICAgWy4uLm5vZGVzXS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IG5vZGU7XG4gICAgICAgIGlmIChlbGVtZW50LmxvY2FsTmFtZSA9PT0gXCJ3YS1pY29uXCIpIHtcbiAgICAgICAgICBoYXNJY29uID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIWhhc0ljb25MYWJlbCkgaGFzSWNvbkxhYmVsID0gZWxlbWVudC5sYWJlbCAhPT0gdm9pZCAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhhc090aGVyRWxlbWVudHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBub2RlLnRleHRDb250ZW50Py50cmltKCkgfHwgXCJcIjtcbiAgICAgICAgaWYgKHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGhhc1RleHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pc0ljb25CdXR0b24gPSBoYXNJY29uICYmICFoYXNUZXh0ICYmICFoYXNPdGhlckVsZW1lbnRzO1xuICAgIGlmICh0aGlzLmlzSWNvbkJ1dHRvbiAmJiAhaGFzSWNvbkxhYmVsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdJY29uIGJ1dHRvbnMgbXVzdCBoYXZlIGEgbGFiZWwgZm9yIHNjcmVlbiByZWFkZXJzLiBBZGQgPHdhLWljb24gbGFiZWw9XCIuLi5cIj4gdG8gcmVtb3ZlIHRoaXMgd2FybmluZy4nLFxuICAgICAgICB0aGlzXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBpc0J1dHRvbigpIHtcbiAgICByZXR1cm4gdGhpcy5ocmVmID8gZmFsc2UgOiB0cnVlO1xuICB9XG4gIGlzTGluaygpIHtcbiAgICByZXR1cm4gdGhpcy5ocmVmID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG4gIGhhbmRsZURpc2FibGVkQ2hhbmdlKCkge1xuICAgIHRoaXMudXBkYXRlVmFsaWRpdHkoKTtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgc2V0VmFsdWUoLi4uX2FyZ3MpIHtcbiAgfVxuICAvKiogU2ltdWxhdGVzIGEgY2xpY2sgb24gdGhlIGJ1dHRvbi4gKi9cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5idXR0b24uY2xpY2soKTtcbiAgfVxuICAvKiogU2V0cyBmb2N1cyBvbiB0aGUgYnV0dG9uLiAqL1xuICBmb2N1cyhvcHRpb25zKSB7XG4gICAgdGhpcy5idXR0b24uZm9jdXMob3B0aW9ucyk7XG4gIH1cbiAgLyoqIFJlbW92ZXMgZm9jdXMgZnJvbSB0aGUgYnV0dG9uLiAqL1xuICBibHVyKCkge1xuICAgIHRoaXMuYnV0dG9uLmJsdXIoKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgaXNMaW5rID0gdGhpcy5pc0xpbmsoKTtcbiAgICBjb25zdCB0YWcgPSBpc0xpbmsgPyBsaXRlcmFsYGFgIDogbGl0ZXJhbGBidXR0b25gO1xuICAgIHJldHVybiBodG1sYFxuICAgICAgPCR7dGFnfVxuICAgICAgICBwYXJ0PVwiYmFzZVwiXG4gICAgICAgIGNsYXNzPSR7Y2xhc3NNYXAoe1xuICAgICAgYnV0dG9uOiB0cnVlLFxuICAgICAgY2FyZXQ6IHRoaXMud2l0aENhcmV0LFxuICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXG4gICAgICBsb2FkaW5nOiB0aGlzLmxvYWRpbmcsXG4gICAgICBydGw6IHRoaXMubG9jYWxpemUuZGlyKCkgPT09IFwicnRsXCIsXG4gICAgICBcImhhcy1sYWJlbFwiOiB0aGlzLmhhc1Nsb3RDb250cm9sbGVyLnRlc3QoXCJbZGVmYXVsdF1cIiksXG4gICAgICBcImhhcy1zdGFydFwiOiB0aGlzLmhhc1Nsb3RDb250cm9sbGVyLnRlc3QoXCJzdGFydFwiKSxcbiAgICAgIFwiaGFzLWVuZFwiOiB0aGlzLmhhc1Nsb3RDb250cm9sbGVyLnRlc3QoXCJlbmRcIiksXG4gICAgICBcImlzLWljb24tYnV0dG9uXCI6IHRoaXMuaXNJY29uQnV0dG9uXG4gICAgfSl9XG4gICAgICAgID9kaXNhYmxlZD0ke2lmRGVmaW5lZChpc0xpbmsgPyB2b2lkIDAgOiB0aGlzLmRpc2FibGVkKX1cbiAgICAgICAgdHlwZT0ke2lmRGVmaW5lZChpc0xpbmsgPyB2b2lkIDAgOiB0aGlzLnR5cGUpfVxuICAgICAgICB0aXRsZT0ke3RoaXMudGl0bGV9XG4gICAgICAgIG5hbWU9JHtpZkRlZmluZWQoaXNMaW5rID8gdm9pZCAwIDogdGhpcy5uYW1lKX1cbiAgICAgICAgdmFsdWU9JHtpZkRlZmluZWQoaXNMaW5rID8gdm9pZCAwIDogdGhpcy52YWx1ZSl9XG4gICAgICAgIGhyZWY9JHtpZkRlZmluZWQoaXNMaW5rID8gdGhpcy5ocmVmIDogdm9pZCAwKX1cbiAgICAgICAgdGFyZ2V0PSR7aWZEZWZpbmVkKGlzTGluayA/IHRoaXMudGFyZ2V0IDogdm9pZCAwKX1cbiAgICAgICAgZG93bmxvYWQ9JHtpZkRlZmluZWQoaXNMaW5rID8gdGhpcy5kb3dubG9hZCA6IHZvaWQgMCl9XG4gICAgICAgIHJlbD0ke2lmRGVmaW5lZChpc0xpbmsgJiYgdGhpcy5yZWwgPyB0aGlzLnJlbCA6IHZvaWQgMCl9XG4gICAgICAgIHJvbGU9JHtpZkRlZmluZWQoaXNMaW5rID8gdm9pZCAwIDogXCJidXR0b25cIil9XG4gICAgICAgIGFyaWEtZGlzYWJsZWQ9JHtpZkRlZmluZWQoaXNMaW5rICYmIHRoaXMuZGlzYWJsZWQgPyBcInRydWVcIiA6IHZvaWQgMCl9XG4gICAgICAgIHRhYmluZGV4PSR7dGhpcy5kaXNhYmxlZCA/IFwiLTFcIiA6IFwiMFwifVxuICAgICAgICBAaW52YWxpZD0ke3RoaXMuaXNCdXR0b24oKSA/IHRoaXMuaGFuZGxlSW52YWxpZCA6IG51bGx9XG4gICAgICAgIEBjbGljaz0ke3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIDxzbG90IG5hbWU9XCJzdGFydFwiIHBhcnQ9XCJzdGFydFwiIGNsYXNzPVwic3RhcnRcIj48L3Nsb3Q+XG4gICAgICAgIDxzbG90IHBhcnQ9XCJsYWJlbFwiIGNsYXNzPVwibGFiZWxcIiBAc2xvdGNoYW5nZT0ke3RoaXMuaGFuZGxlTGFiZWxTbG90Q2hhbmdlfT48L3Nsb3Q+XG4gICAgICAgIDxzbG90IG5hbWU9XCJlbmRcIiBwYXJ0PVwiZW5kXCIgY2xhc3M9XCJlbmRcIj48L3Nsb3Q+XG4gICAgICAgICR7dGhpcy53aXRoQ2FyZXQgPyBodG1sYFxuICAgICAgICAgICAgICAgIDx3YS1pY29uIHBhcnQ9XCJjYXJldFwiIGNsYXNzPVwiY2FyZXRcIiBsaWJyYXJ5PVwic3lzdGVtXCIgbmFtZT1cImNoZXZyb24tZG93blwiIHZhcmlhbnQ9XCJzb2xpZFwiPjwvd2EtaWNvbj5cbiAgICAgICAgICAgICAgYCA6IFwiXCJ9XG4gICAgICAgICR7dGhpcy5sb2FkaW5nID8gaHRtbGA8d2Etc3Bpbm5lciBwYXJ0PVwic3Bpbm5lclwiPjwvd2Etc3Bpbm5lcj5gIDogXCJcIn1cbiAgICAgIDwvJHt0YWd9PlxuICAgIGA7XG4gIH1cbn07XG5XYUJ1dHRvbi5zaGFkb3dSb290T3B0aW9ucyA9IHsgLi4uV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudC5zaGFkb3dSb290T3B0aW9ucywgZGVsZWdhdGVzRm9jdXM6IHRydWUgfTtcbldhQnV0dG9uLmNzcyA9IFtidXR0b25fc3R5bGVzX2RlZmF1bHQsIHZhcmlhbnRzX3N0eWxlc19kZWZhdWx0LCBzaXplX3N0eWxlc19kZWZhdWx0XTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHF1ZXJ5KFwiLmJ1dHRvblwiKVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImJ1dHRvblwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHF1ZXJ5KFwic2xvdDpub3QoW25hbWVdKVwiKVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImxhYmVsU2xvdFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHN0YXRlKClcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJpbnZhbGlkXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgc3RhdGUoKVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImlzSWNvbkJ1dHRvblwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJ0aXRsZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcInZhcmlhbnRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJhcHBlYXJhbmNlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwic2l6ZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcIndpdGgtY2FyZXRcIiwgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcIndpdGhDYXJldFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImRpc2FibGVkXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwibG9hZGluZ1wiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcInBpbGxcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwidHlwZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcIm5hbWVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJ2YWx1ZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImhyZWZcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwidGFyZ2V0XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcInJlbFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJkb3dubG9hZFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcImZvcm1hY3Rpb25cIiB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImZvcm1BY3Rpb25cIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJmb3JtZW5jdHlwZVwiIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiZm9ybUVuY3R5cGVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJmb3JtbWV0aG9kXCIgfSlcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJmb3JtTWV0aG9kXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwiZm9ybW5vdmFsaWRhdGVcIiwgdHlwZTogQm9vbGVhbiB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImZvcm1Ob1ZhbGlkYXRlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwiZm9ybXRhcmdldFwiIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiZm9ybVRhcmdldFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHdhdGNoKFwiZGlzYWJsZWRcIiwgeyB3YWl0VW50aWxGaXJzdFVwZGF0ZTogdHJ1ZSB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImhhbmRsZURpc2FibGVkQ2hhbmdlXCIsIDEpO1xuV2FCdXR0b24gPSBfX2RlY29yYXRlQ2xhc3MoW1xuICBjdXN0b21FbGVtZW50KFwid2EtYnV0dG9uXCIpXG5dLCBXYUJ1dHRvbik7XG5cbmV4cG9ydCB7XG4gIFdhQnV0dG9uXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyLnN0eWxlcy50c1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcImxpdFwiO1xudmFyIHNwaW5uZXJfc3R5bGVzX2RlZmF1bHQgPSBjc3NgXG4gIDpob3N0IHtcbiAgICAtLXRyYWNrLXdpZHRoOiAycHg7XG4gICAgLS10cmFjay1jb2xvcjogdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLW5vcm1hbCk7XG4gICAgLS1pbmRpY2F0b3ItY29sb3I6IHZhcigtLXdhLWNvbG9yLWJyYW5kLWZpbGwtbG91ZCk7XG4gICAgLS1zcGVlZDogMnM7XG5cbiAgICAvKlxuICAgICAgUmVzaXppbmcgYSBzcGlubmVyIGVsZW1lbnQgdXNpbmcgYW55dGhpbmcgYnV0IGZvbnQtc2l6ZSB3aWxsIGJyZWFrIHRoZSBhbmltYXRpb24gYmVjYXVzZSB0aGUgYW5pbWF0aW9uIHVzZXMgZW1cbiAgICAgIHVuaXRzLiBUaGVyZWZvcmUsIGlmIGEgc3Bpbm5lciBpcyB1c2VkIGluIGEgZmxleCBjb250YWluZXIgd2l0aG91dCBcXGBmbGV4OiBub25lXFxgIGFwcGxpZWQsIHRoZSBzcGlubmVyIGNhblxuICAgICAgZ3Jvdy9zaHJpbmsgYW5kIGJyZWFrIHRoZSBhbmltYXRpb24uIFRoZSB1c2Ugb2YgXFxgZmxleDogbm9uZVxcYCBvbiB0aGUgaG9zdCBlbGVtZW50IHByZXZlbnRzIHRoaXMgYnkgYWx3YXlzIGhhdmluZ1xuICAgICAgdGhlIHNwaW5uZXIgc2l6ZWQgYWNjb3JkaW5nIHRvIGl0cyBhY3R1YWwgZGltZW5zaW9ucy5cbiAgICAqL1xuICAgIGZsZXg6IG5vbmU7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgd2lkdGg6IDFlbTtcbiAgICBoZWlnaHQ6IDFlbTtcbiAgfVxuXG4gIHN2ZyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGFzcGVjdC1yYXRpbzogMTtcbiAgICBhbmltYXRpb246IHNwaW4gdmFyKC0tc3BlZWQpIGxpbmVhciBpbmZpbml0ZTtcbiAgfVxuXG4gIC50cmFjayB7XG4gICAgc3Ryb2tlOiB2YXIoLS10cmFjay1jb2xvcik7XG4gIH1cblxuICAuaW5kaWNhdG9yIHtcbiAgICBzdHJva2U6IHZhcigtLWluZGljYXRvci1jb2xvcik7XG4gICAgc3Ryb2tlLWRhc2hhcnJheTogNzUsIDEwMDtcbiAgICBzdHJva2UtZGFzaG9mZnNldDogLTU7XG4gICAgYW5pbWF0aW9uOiBkYXNoIDEuNXMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XG4gICAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kO1xuICB9XG5cbiAgQGtleWZyYW1lcyBzcGluIHtcbiAgICAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgZGFzaCB7XG4gICAgMCUge1xuICAgICAgc3Ryb2tlLWRhc2hhcnJheTogMSwgMTUwO1xuICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDA7XG4gICAgfVxuICAgIDUwJSB7XG4gICAgICBzdHJva2UtZGFzaGFycmF5OiA5MCwgMTUwO1xuICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IC0zNTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBzdHJva2UtZGFzaGFycmF5OiA5MCwgMTUwO1xuICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IC0xMjQ7XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQge1xuICBzcGlubmVyX3N0eWxlc19kZWZhdWx0XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cbmltcG9ydCB7XG4gIHNwaW5uZXJfc3R5bGVzX2RlZmF1bHRcbn0gZnJvbSBcIi4vY2h1bmsuQUdER1JHNEUuanNcIjtcbmltcG9ydCB7XG4gIExvY2FsaXplQ29udHJvbGxlclxufSBmcm9tIFwiLi9jaHVuay5PS1hCTlJFNi5qc1wiO1xuaW1wb3J0IHtcbiAgV2ViQXdlc29tZUVsZW1lbnRcbn0gZnJvbSBcIi4vY2h1bmsuRVBISFdYSzIuanNcIjtcbmltcG9ydCB7XG4gIF9fZGVjb3JhdGVDbGFzc1xufSBmcm9tIFwiLi9jaHVuay43VkdDSUhERy5qc1wiO1xuXG4vLyBzcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXIudHNcbmltcG9ydCB7IGh0bWwgfSBmcm9tIFwibGl0XCI7XG5pbXBvcnQgeyBjdXN0b21FbGVtZW50IH0gZnJvbSBcImxpdC9kZWNvcmF0b3JzLmpzXCI7XG52YXIgV2FTcGlubmVyID0gY2xhc3MgZXh0ZW5kcyBXZWJBd2Vzb21lRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy5sb2NhbGl6ZSA9IG5ldyBMb2NhbGl6ZUNvbnRyb2xsZXIodGhpcyk7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBodG1sYFxuICAgICAgPHN2Z1xuICAgICAgICBwYXJ0PVwiYmFzZVwiXG4gICAgICAgIHJvbGU9XCJwcm9ncmVzc2JhclwiXG4gICAgICAgIGFyaWEtbGFiZWw9JHt0aGlzLmxvY2FsaXplLnRlcm0oXCJsb2FkaW5nXCIpfVxuICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgNTAgNTBcIlxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgID5cbiAgICAgICAgPGNpcmNsZSBjbGFzcz1cInRyYWNrXCIgY3g9XCIyNVwiIGN5PVwiMjVcIiByPVwiMjBcIiBmaWxsPVwibm9uZVwiIHN0cm9rZS13aWR0aD1cIjVcIiAvPlxuICAgICAgICA8Y2lyY2xlIGNsYXNzPVwiaW5kaWNhdG9yXCIgY3g9XCIyNVwiIGN5PVwiMjVcIiByPVwiMjBcIiBmaWxsPVwibm9uZVwiIHN0cm9rZS13aWR0aD1cIjVcIiAvPlxuICAgICAgPC9zdmc+XG4gICAgYDtcbiAgfVxufTtcbldhU3Bpbm5lci5jc3MgPSBzcGlubmVyX3N0eWxlc19kZWZhdWx0O1xuV2FTcGlubmVyID0gX19kZWNvcmF0ZUNsYXNzKFtcbiAgY3VzdG9tRWxlbWVudChcIndhLXNwaW5uZXJcIilcbl0sIFdhU3Bpbm5lcik7XG5cbmV4cG9ydCB7XG4gIFdhU3Bpbm5lclxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9ldmVudHMvZXJyb3IudHNcbnZhciBXYUVycm9yRXZlbnQgPSBjbGFzcyBleHRlbmRzIEV2ZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJ3YS1lcnJvclwiLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IGZhbHNlLCBjb21wb3NlZDogdHJ1ZSB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgV2FFcnJvckV2ZW50XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2V2ZW50cy9sb2FkLnRzXG52YXIgV2FMb2FkRXZlbnQgPSBjbGFzcyBleHRlbmRzIEV2ZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJ3YS1sb2FkXCIsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2UsIGNvbXBvc2VkOiB0cnVlIH0pO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBXYUxvYWRFdmVudFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb24vaWNvbi5zdHlsZXMudHNcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJsaXRcIjtcbnZhciBpY29uX3N0eWxlc19kZWZhdWx0ID0gY3NzYFxuICA6aG9zdCB7XG4gICAgLS1wcmltYXJ5LWNvbG9yOiBjdXJyZW50Q29sb3I7XG4gICAgLS1wcmltYXJ5LW9wYWNpdHk6IDE7XG4gICAgLS1zZWNvbmRhcnktY29sb3I6IGN1cnJlbnRDb2xvcjtcbiAgICAtLXNlY29uZGFyeS1vcGFjaXR5OiAwLjQ7XG4gICAgLS1yb3RhdGUtYW5nbGU6IDBkZWc7XG5cbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHZlcnRpY2FsLWFsaWduOiAtMC4xMjVlbTtcbiAgfVxuXG4gIC8qIFN0YW5kYXJkICovXG4gIDpob3N0KDpub3QoW2F1dG8td2lkdGhdKSkge1xuICAgIHdpZHRoOiAxLjI1ZW07XG4gICAgaGVpZ2h0OiAxZW07XG4gIH1cblxuICAvKiBBdXRvLXdpZHRoICovXG4gIDpob3N0KFthdXRvLXdpZHRoXSkge1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIGhlaWdodDogMWVtO1xuICB9XG5cbiAgc3ZnIHtcbiAgICBoZWlnaHQ6IDFlbTtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgICB3aWR0aDogYXV0bztcblxuICAgIC8qIER1b3RvbmUgY29sb3JzIHdpdGggcGF0aC1zcGVjaWZpYyBvcGFjaXR5IGZhbGxiYWNrICovXG4gICAgcGF0aFtkYXRhLWR1b3RvbmUtcHJpbWFyeV0ge1xuICAgICAgY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IpO1xuICAgICAgb3BhY2l0eTogdmFyKC0tcGF0aC1vcGFjaXR5LCB2YXIoLS1wcmltYXJ5LW9wYWNpdHkpKTtcbiAgICB9XG5cbiAgICBwYXRoW2RhdGEtZHVvdG9uZS1zZWNvbmRhcnldIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1zZWNvbmRhcnktY29sb3IpO1xuICAgICAgb3BhY2l0eTogdmFyKC0tcGF0aC1vcGFjaXR5LCB2YXIoLS1zZWNvbmRhcnktb3BhY2l0eSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qIFJvdGF0aW9uICovXG4gIDpob3N0KFtyb3RhdGVdKSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUodmFyKC0tcm90YXRlLWFuZ2xlLCAwZGVnKSk7XG4gIH1cblxuICAvKiBGbGlwcGluZyAqL1xuICA6aG9zdChbZmxpcD0neCddKSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZVgoLTEpO1xuICB9XG4gIDpob3N0KFtmbGlwPSd5J10pIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgtMSk7XG4gIH1cbiAgOmhvc3QoW2ZsaXA9J2JvdGgnXSkge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoLTEsIC0xKTtcbiAgfVxuXG4gIC8qIFJvdGF0aW9uIGFuZCBGbGlwcGluZyBjb21iaW5lZCAqL1xuICA6aG9zdChbcm90YXRlXVtmbGlwPSd4J10pIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSh2YXIoLS1yb3RhdGUtYW5nbGUsIDBkZWcpKSBzY2FsZVgoLTEpO1xuICB9XG4gIDpob3N0KFtyb3RhdGVdW2ZsaXA9J3knXSkge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKHZhcigtLXJvdGF0ZS1hbmdsZSwgMGRlZykpIHNjYWxlWSgtMSk7XG4gIH1cbiAgOmhvc3QoW3JvdGF0ZV1bZmxpcD0nYm90aCddKSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUodmFyKC0tcm90YXRlLWFuZ2xlLCAwZGVnKSkgc2NhbGUoLTEsIC0xKTtcbiAgfVxuXG4gIC8qIEFuaW1hdGlvbnMgKi9cbiAgOmhvc3QoW2FuaW1hdGlvbj0nYmVhdCddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IGJlYXQ7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiB2YXIoLS1hbmltYXRpb24tZGVsYXksIDBzKTtcbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiB2YXIoLS1hbmltYXRpb24tZGlyZWN0aW9uLCBub3JtYWwpO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogdmFyKC0tYW5pbWF0aW9uLWR1cmF0aW9uLCAxcyk7XG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogdmFyKC0tYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCwgaW5maW5pdGUpO1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IHZhcigtLWFuaW1hdGlvbi10aW1pbmcsIGVhc2UtaW4tb3V0KTtcbiAgfVxuXG4gIDpob3N0KFthbmltYXRpb249J2ZhZGUnXSkge1xuICAgIGFuaW1hdGlvbi1uYW1lOiBmYWRlO1xuICAgIGFuaW1hdGlvbi1kZWxheTogdmFyKC0tYW5pbWF0aW9uLWRlbGF5LCAwcyk7XG4gICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogdmFyKC0tYW5pbWF0aW9uLWRpcmVjdGlvbiwgbm9ybWFsKTtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWFuaW1hdGlvbi1kdXJhdGlvbiwgMXMpO1xuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHZhcigtLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQsIGluZmluaXRlKTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS1hbmltYXRpb24tdGltaW5nLCBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjYsIDEpKTtcbiAgfVxuXG4gIDpob3N0KFthbmltYXRpb249J2JlYXQtZmFkZSddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IGJlYXQtZmFkZTtcbiAgICBhbmltYXRpb24tZGVsYXk6IHZhcigtLWFuaW1hdGlvbi1kZWxheSwgMHMpO1xuICAgIGFuaW1hdGlvbi1kaXJlY3Rpb246IHZhcigtLWFuaW1hdGlvbi1kaXJlY3Rpb24sIG5vcm1hbCk7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1hbmltYXRpb24tZHVyYXRpb24sIDFzKTtcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiB2YXIoLS1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50LCBpbmZpbml0ZSk7XG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogdmFyKC0tYW5pbWF0aW9uLXRpbWluZywgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC42LCAxKSk7XG4gIH1cblxuICA6aG9zdChbYW5pbWF0aW9uPSdib3VuY2UnXSkge1xuICAgIGFuaW1hdGlvbi1uYW1lOiBib3VuY2U7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiB2YXIoLS1hbmltYXRpb24tZGVsYXksIDBzKTtcbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiB2YXIoLS1hbmltYXRpb24tZGlyZWN0aW9uLCBub3JtYWwpO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogdmFyKC0tYW5pbWF0aW9uLWR1cmF0aW9uLCAxcyk7XG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogdmFyKC0tYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCwgaW5maW5pdGUpO1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IHZhcigtLWFuaW1hdGlvbi10aW1pbmcsIGN1YmljLWJlemllcigwLjI4LCAwLjg0LCAwLjQyLCAxKSk7XG4gIH1cblxuICA6aG9zdChbYW5pbWF0aW9uPSdmbGlwJ10pIHtcbiAgICBhbmltYXRpb24tbmFtZTogZmxpcDtcbiAgICBhbmltYXRpb24tZGVsYXk6IHZhcigtLWFuaW1hdGlvbi1kZWxheSwgMHMpO1xuICAgIGFuaW1hdGlvbi1kaXJlY3Rpb246IHZhcigtLWFuaW1hdGlvbi1kaXJlY3Rpb24sIG5vcm1hbCk7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1hbmltYXRpb24tZHVyYXRpb24sIDFzKTtcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiB2YXIoLS1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50LCBpbmZpbml0ZSk7XG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogdmFyKC0tYW5pbWF0aW9uLXRpbWluZywgZWFzZS1pbi1vdXQpO1xuICB9XG5cbiAgOmhvc3QoW2FuaW1hdGlvbj0nc2hha2UnXSkge1xuICAgIGFuaW1hdGlvbi1uYW1lOiBzaGFrZTtcbiAgICBhbmltYXRpb24tZGVsYXk6IHZhcigtLWFuaW1hdGlvbi1kZWxheSwgMHMpO1xuICAgIGFuaW1hdGlvbi1kaXJlY3Rpb246IHZhcigtLWFuaW1hdGlvbi1kaXJlY3Rpb24sIG5vcm1hbCk7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1hbmltYXRpb24tZHVyYXRpb24sIDFzKTtcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiB2YXIoLS1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50LCBpbmZpbml0ZSk7XG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogdmFyKC0tYW5pbWF0aW9uLXRpbWluZywgbGluZWFyKTtcbiAgfVxuXG4gIDpob3N0KFthbmltYXRpb249J3NwaW4nXSkge1xuICAgIGFuaW1hdGlvbi1uYW1lOiBzcGluO1xuICAgIGFuaW1hdGlvbi1kZWxheTogdmFyKC0tYW5pbWF0aW9uLWRlbGF5LCAwcyk7XG4gICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogdmFyKC0tYW5pbWF0aW9uLWRpcmVjdGlvbiwgbm9ybWFsKTtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWFuaW1hdGlvbi1kdXJhdGlvbiwgMnMpO1xuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHZhcigtLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQsIGluZmluaXRlKTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS1hbmltYXRpb24tdGltaW5nLCBsaW5lYXIpO1xuICB9XG5cbiAgOmhvc3QoW2FuaW1hdGlvbj0nc3Bpbi1wdWxzZSddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IHNwaW4tcHVsc2U7XG4gICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogdmFyKC0tYW5pbWF0aW9uLWRpcmVjdGlvbiwgbm9ybWFsKTtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWFuaW1hdGlvbi1kdXJhdGlvbiwgMXMpO1xuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHZhcigtLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQsIGluZmluaXRlKTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS1hbmltYXRpb24tdGltaW5nLCBzdGVwcyg4KSk7XG4gIH1cblxuICA6aG9zdChbYW5pbWF0aW9uPSdzcGluLXJldmVyc2UnXSkge1xuICAgIGFuaW1hdGlvbi1uYW1lOiBzcGluO1xuICAgIGFuaW1hdGlvbi1kZWxheTogdmFyKC0tYW5pbWF0aW9uLWRlbGF5LCAwcyk7XG4gICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogdmFyKC0tYW5pbWF0aW9uLWRpcmVjdGlvbiwgcmV2ZXJzZSk7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1hbmltYXRpb24tZHVyYXRpb24sIDJzKTtcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiB2YXIoLS1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50LCBpbmZpbml0ZSk7XG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogdmFyKC0tYW5pbWF0aW9uLXRpbWluZywgbGluZWFyKTtcbiAgfVxuXG4gIC8qIEtleWZyYW1lcyAqL1xuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgIDpob3N0KFthbmltYXRpb249J2JlYXQnXSksXG4gICAgOmhvc3QoW2FuaW1hdGlvbj0nYm91bmNlJ10pLFxuICAgIDpob3N0KFthbmltYXRpb249J2ZhZGUnXSksXG4gICAgOmhvc3QoW2FuaW1hdGlvbj0nYmVhdC1mYWRlJ10pLFxuICAgIDpob3N0KFthbmltYXRpb249J2ZsaXAnXSksXG4gICAgOmhvc3QoW2FuaW1hdGlvbj0nc2hha2UnXSksXG4gICAgOmhvc3QoW2FuaW1hdGlvbj0nc3BpbiddKSxcbiAgICA6aG9zdChbYW5pbWF0aW9uPSdzcGluLXB1bHNlJ10pLFxuICAgIDpob3N0KFthbmltYXRpb249J3NwaW4tcmV2ZXJzZSddKSB7XG4gICAgICBhbmltYXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgICAgIHRyYW5zaXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgICB9XG4gIH1cbiAgQGtleWZyYW1lcyBiZWF0IHtcbiAgICAwJSxcbiAgICA5MCUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgNDUlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUodmFyKC0tYmVhdC1zY2FsZSwgMS4yNSkpO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgZmFkZSB7XG4gICAgNTAlIHtcbiAgICAgIG9wYWNpdHk6IHZhcigtLWZhZGUtb3BhY2l0eSwgMC40KTtcbiAgICB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIGJlYXQtZmFkZSB7XG4gICAgMCUsXG4gICAgMTAwJSB7XG4gICAgICBvcGFjaXR5OiB2YXIoLS1iZWF0LWZhZGUtb3BhY2l0eSwgMC40KTtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICAgIDUwJSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSh2YXIoLS1iZWF0LWZhZGUtc2NhbGUsIDEuMTI1KSk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBib3VuY2Uge1xuICAgIDAlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSwgMSkgdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUodmFyKC0tYm91bmNlLXN0YXJ0LXNjYWxlLXgsIDEuMSksIHZhcigtLWJvdW5jZS1zdGFydC1zY2FsZS15LCAwLjkpKSB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgICAzMCUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSh2YXIoLS1ib3VuY2UtanVtcC1zY2FsZS14LCAwLjkpLCB2YXIoLS1ib3VuY2UtanVtcC1zY2FsZS15LCAxLjEpKVxuICAgICAgICB0cmFuc2xhdGVZKHZhcigtLWJvdW5jZS1oZWlnaHQsIC0wLjVlbSkpO1xuICAgIH1cbiAgICA1MCUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSh2YXIoLS1ib3VuY2UtbGFuZC1zY2FsZS14LCAxLjA1KSwgdmFyKC0tYm91bmNlLWxhbmQtc2NhbGUteSwgMC45NSkpIHRyYW5zbGF0ZVkoMCk7XG4gICAgfVxuICAgIDU3JSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEsIDEpIHRyYW5zbGF0ZVkodmFyKC0tYm91bmNlLXJlYm91bmQsIC0wLjEyNWVtKSk7XG4gICAgfVxuICAgIDY0JSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEsIDEpIHRyYW5zbGF0ZVkoMCk7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLCAxKSB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgZmxpcCB7XG4gICAgNTAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlM2QodmFyKC0tZmxpcC14LCAwKSwgdmFyKC0tZmxpcC15LCAxKSwgdmFyKC0tZmxpcC16LCAwKSwgdmFyKC0tZmxpcC1hbmdsZSwgLTE4MGRlZykpO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgc2hha2Uge1xuICAgIDAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0xNWRlZyk7XG4gICAgfVxuICAgIDQlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE1ZGVnKTtcbiAgICB9XG4gICAgOCUsXG4gICAgMjQlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0xOGRlZyk7XG4gICAgfVxuICAgIDEyJSxcbiAgICAyOCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMThkZWcpO1xuICAgIH1cbiAgICAxNiUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTIyZGVnKTtcbiAgICB9XG4gICAgMjAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDIyZGVnKTtcbiAgICB9XG4gICAgMzIlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0xMmRlZyk7XG4gICAgfVxuICAgIDM2JSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxMmRlZyk7XG4gICAgfVxuICAgIDQwJSxcbiAgICAxMDAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgc3BpbiB7XG4gICAgMCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIHNwaW4tcHVsc2Uge1xuICAgIDAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQge1xuICBpY29uX3N0eWxlc19kZWZhdWx0XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL3V0aWxpdGllcy9iYXNlLXBhdGgudHNcbnZhciBiYXNlUGF0aCA9IFwiXCI7XG52YXIga2l0Q29kZSA9IFwiXCI7XG5mdW5jdGlvbiBzZXRCYXNlUGF0aChwYXRoKSB7XG4gIGJhc2VQYXRoID0gcGF0aDtcbn1cbmZ1bmN0aW9uIGdldEJhc2VQYXRoKHN1YnBhdGggPSBcIlwiKSB7XG4gIGlmICghYmFzZVBhdGgpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS13ZWJhd2Vzb21lXVwiKTtcbiAgICBpZiAoZWw/Lmhhc0F0dHJpYnV0ZShcImRhdGEtd2ViYXdlc29tZVwiKSkge1xuICAgICAgY29uc3Qgcm9vdFJlbGF0aXZlVXJsID0gbmV3IFVSTChlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYmF3ZXNvbWVcIikgPz8gXCJcIiwgd2luZG93LmxvY2F0aW9uLmhyZWYpLnBhdGhuYW1lO1xuICAgICAgc2V0QmFzZVBhdGgocm9vdFJlbGF0aXZlVXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2NyaXB0cyA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKV07XG4gICAgICBjb25zdCB3YVNjcmlwdCA9IHNjcmlwdHMuZmluZChcbiAgICAgICAgKHNjcmlwdCkgPT4gc2NyaXB0LnNyYy5lbmRzV2l0aChcIndlYmF3ZXNvbWUuanNcIikgfHwgc2NyaXB0LnNyYy5lbmRzV2l0aChcIndlYmF3ZXNvbWUubG9hZGVyLmpzXCIpIHx8IHNjcmlwdC5zcmMuZW5kc1dpdGgoXCJ3ZWJhd2Vzb21lLnNzci1sb2FkZXIuanNcIilcbiAgICAgICk7XG4gICAgICBpZiAod2FTY3JpcHQpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IFN0cmluZyh3YVNjcmlwdC5nZXRBdHRyaWJ1dGUoXCJzcmNcIikpO1xuICAgICAgICBzZXRCYXNlUGF0aChwYXRoLnNwbGl0KFwiL1wiKS5zbGljZSgwLCAtMSkuam9pbihcIi9cIikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYmFzZVBhdGgucmVwbGFjZSgvXFwvJC8sIFwiXCIpICsgKHN1YnBhdGggPyBgLyR7c3VicGF0aC5yZXBsYWNlKC9eXFwvLywgXCJcIil9YCA6IGBgKTtcbn1cbmZ1bmN0aW9uIHNldEtpdENvZGUoY29kZSkge1xuICBraXRDb2RlID0gY29kZTtcbn1cbmZ1bmN0aW9uIGdldEtpdENvZGUoKSB7XG4gIGlmICgha2l0Q29kZSkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWZhLWtpdC1jb2RlXVwiKTtcbiAgICBpZiAoZWwpIHtcbiAgICAgIHNldEtpdENvZGUoZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1mYS1raXQtY29kZVwiKSB8fCBcIlwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGtpdENvZGU7XG59XG5cbmV4cG9ydCB7XG4gIHNldEJhc2VQYXRoLFxuICBnZXRCYXNlUGF0aCxcbiAgc2V0S2l0Q29kZSxcbiAgZ2V0S2l0Q29kZVxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5pbXBvcnQge1xuICBnZXRLaXRDb2RlXG59IGZyb20gXCIuL2NodW5rLks2UU1VSUhQLmpzXCI7XG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb24vbGlicmFyeS5kZWZhdWx0LnRzXG52YXIgRkFfVkVSU0lPTiA9IFwiNy4yLjBcIjtcbmZ1bmN0aW9uIGdldEljb25VcmwobmFtZSwgZmFtaWx5LCB2YXJpYW50KSB7XG4gIGNvbnN0IGtpdENvZGUgPSBnZXRLaXRDb2RlKCk7XG4gIGNvbnN0IGlzUHJvID0ga2l0Q29kZS5sZW5ndGggPiAwO1xuICBsZXQgZm9sZGVyID0gXCJzb2xpZFwiO1xuICBpZiAoZmFtaWx5ID09PSBcImNoaXNlbFwiKSB7XG4gICAgZm9sZGVyID0gXCJjaGlzZWwtcmVndWxhclwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwiZXRjaFwiKSB7XG4gICAgZm9sZGVyID0gXCJldGNoLXNvbGlkXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJncmFwaGl0ZVwiKSB7XG4gICAgZm9sZGVyID0gXCJncmFwaGl0ZS10aGluXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJqZWxseVwiKSB7XG4gICAgZm9sZGVyID0gXCJqZWxseS1yZWd1bGFyXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwiZHVvLXJlZ3VsYXJcIikgZm9sZGVyID0gXCJqZWxseS1kdW8tcmVndWxhclwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcImZpbGwtcmVndWxhclwiKSBmb2xkZXIgPSBcImplbGx5LWZpbGwtcmVndWxhclwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwiamVsbHktZHVvXCIpIHtcbiAgICBmb2xkZXIgPSBcImplbGx5LWR1by1yZWd1bGFyXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJqZWxseS1maWxsXCIpIHtcbiAgICBmb2xkZXIgPSBcImplbGx5LWZpbGwtcmVndWxhclwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwibm90ZG9nXCIpIHtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJzb2xpZFwiKSBmb2xkZXIgPSBcIm5vdGRvZy1zb2xpZFwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcImR1by1zb2xpZFwiKSBmb2xkZXIgPSBcIm5vdGRvZy1kdW8tc29saWRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcIm5vdGRvZy1kdW9cIikge1xuICAgIGZvbGRlciA9IFwibm90ZG9nLWR1by1zb2xpZFwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwic2xhYlwiKSB7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwic29saWRcIiB8fCB2YXJpYW50ID09PSBcInJlZ3VsYXJcIikgZm9sZGVyID0gXCJzbGFiLXJlZ3VsYXJcIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJwcmVzcy1yZWd1bGFyXCIpIGZvbGRlciA9IFwic2xhYi1wcmVzcy1yZWd1bGFyXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJzbGFiLXByZXNzXCIpIHtcbiAgICBmb2xkZXIgPSBcInNsYWItcHJlc3MtcmVndWxhclwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwidGh1bWJwcmludFwiKSB7XG4gICAgZm9sZGVyID0gXCJ0aHVtYnByaW50LWxpZ2h0XCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJ1dGlsaXR5XCIpIHtcbiAgICBmb2xkZXIgPSBcInV0aWxpdHktc2VtaWJvbGRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcInV0aWxpdHktZHVvXCIpIHtcbiAgICBmb2xkZXIgPSBcInV0aWxpdHktZHVvLXNlbWlib2xkXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJ1dGlsaXR5LWZpbGxcIikge1xuICAgIGZvbGRlciA9IFwidXRpbGl0eS1maWxsLXNlbWlib2xkXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJ3aGl0ZWJvYXJkXCIpIHtcbiAgICBmb2xkZXIgPSBcIndoaXRlYm9hcmQtc2VtaWJvbGRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcImNsYXNzaWNcIikge1xuICAgIGlmICh2YXJpYW50ID09PSBcInRoaW5cIikgZm9sZGVyID0gXCJ0aGluXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwibGlnaHRcIikgZm9sZGVyID0gXCJsaWdodFwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcInJlZ3VsYXJcIikgZm9sZGVyID0gXCJyZWd1bGFyXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwic29saWRcIikgZm9sZGVyID0gXCJzb2xpZFwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwiZHVvdG9uZVwiKSB7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwidGhpblwiKSBmb2xkZXIgPSBcImR1b3RvbmUtdGhpblwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcImxpZ2h0XCIpIGZvbGRlciA9IFwiZHVvdG9uZS1saWdodFwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcInJlZ3VsYXJcIikgZm9sZGVyID0gXCJkdW90b25lLXJlZ3VsYXJcIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJzb2xpZFwiKSBmb2xkZXIgPSBcImR1b3RvbmVcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcInNoYXJwXCIpIHtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJ0aGluXCIpIGZvbGRlciA9IFwic2hhcnAtdGhpblwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcImxpZ2h0XCIpIGZvbGRlciA9IFwic2hhcnAtbGlnaHRcIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJyZWd1bGFyXCIpIGZvbGRlciA9IFwic2hhcnAtcmVndWxhclwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcInNvbGlkXCIpIGZvbGRlciA9IFwic2hhcnAtc29saWRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcInNoYXJwLWR1b3RvbmVcIikge1xuICAgIGlmICh2YXJpYW50ID09PSBcInRoaW5cIikgZm9sZGVyID0gXCJzaGFycC1kdW90b25lLXRoaW5cIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJsaWdodFwiKSBmb2xkZXIgPSBcInNoYXJwLWR1b3RvbmUtbGlnaHRcIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJyZWd1bGFyXCIpIGZvbGRlciA9IFwic2hhcnAtZHVvdG9uZS1yZWd1bGFyXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwic29saWRcIikgZm9sZGVyID0gXCJzaGFycC1kdW90b25lLXNvbGlkXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJicmFuZHNcIikge1xuICAgIGZvbGRlciA9IFwiYnJhbmRzXCI7XG4gIH1cbiAgcmV0dXJuIGlzUHJvID8gYGh0dHBzOi8va2EtcC5mb250YXdlc29tZS5jb20vcmVsZWFzZXMvdiR7RkFfVkVSU0lPTn0vc3Zncy8ke2ZvbGRlcn0vJHtuYW1lfS5zdmc/dG9rZW49JHtlbmNvZGVVUklDb21wb25lbnQoa2l0Q29kZSl9YCA6IGBodHRwczovL2thLWYuZm9udGF3ZXNvbWUuY29tL3JlbGVhc2VzL3Yke0ZBX1ZFUlNJT059L3N2Z3MvJHtmb2xkZXJ9LyR7bmFtZX0uc3ZnYDtcbn1cbnZhciBsaWJyYXJ5ID0ge1xuICBuYW1lOiBcImRlZmF1bHRcIixcbiAgcmVzb2x2ZXI6IChuYW1lLCBmYW1pbHkgPSBcImNsYXNzaWNcIiwgdmFyaWFudCA9IFwic29saWRcIikgPT4ge1xuICAgIHJldHVybiBnZXRJY29uVXJsKG5hbWUsIGZhbWlseSwgdmFyaWFudCk7XG4gIH0sXG4gIG11dGF0b3I6IChzdmcsIGhvc3RFbCkgPT4ge1xuICAgIGlmIChob3N0RWw/LmZhbWlseSAmJiAhc3ZnLmhhc0F0dHJpYnV0ZShcImRhdGEtZHVvdG9uZS1pbml0aWFsaXplZFwiKSkge1xuICAgICAgY29uc3QgeyBmYW1pbHksIHZhcmlhbnQgfSA9IGhvc3RFbDtcbiAgICAgIGlmIChcbiAgICAgICAgLy8gRHVvdG9uZVxuICAgICAgICBmYW1pbHkgPT09IFwiZHVvdG9uZVwiIHx8IC8vIFNoYXJwIGR1b3RvbmVcbiAgICAgICAgZmFtaWx5ID09PSBcInNoYXJwLWR1b3RvbmVcIiB8fCAvLyBOb3Rkb2cgZHVvIChjb3JyZWN0IHVzYWdlOiBmYW1pbHk9XCJub3Rkb2ctZHVvXCIpXG4gICAgICAgIGZhbWlseSA9PT0gXCJub3Rkb2ctZHVvXCIgfHwgLy8gTk9URTogZmFtaWx5PVwibm90ZG9nXCIgdmFyaWFudD1cImR1by1zb2xpZFwiIGlzIGRlcHJlY2F0ZWRcbiAgICAgICAgZmFtaWx5ID09PSBcIm5vdGRvZ1wiICYmIHZhcmlhbnQgPT09IFwiZHVvLXNvbGlkXCIgfHwgLy8gSmVsbHkgZHVvIChjb3JyZWN0IHVzYWdlOiBmYW1pbHk9XCJqZWxseS1kdW9cIilcbiAgICAgICAgZmFtaWx5ID09PSBcImplbGx5LWR1b1wiIHx8IC8vIE5PVEU6IGZhbWlseT1cImplbGx5XCIgdmFyaWFudD1cImR1by1yZWd1bGFyXCIgaXMgZGVwcmVjYXRlZFxuICAgICAgICBmYW1pbHkgPT09IFwiamVsbHlcIiAmJiB2YXJpYW50ID09PSBcImR1by1yZWd1bGFyXCIgfHwgLy8gVXRpbGl0eSBkdW8gKGNvcnJlY3QgdXNhZ2U6IGZhbWlseT1cInV0aWxpdHktZHVvXCIpXG4gICAgICAgIGZhbWlseSA9PT0gXCJ1dGlsaXR5LWR1b1wiIHx8IC8vIFRodW1icHJpbnRcbiAgICAgICAgZmFtaWx5ID09PSBcInRodW1icHJpbnRcIlxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHBhdGhzID0gWy4uLnN2Zy5xdWVyeVNlbGVjdG9yQWxsKFwicGF0aFwiKV07XG4gICAgICAgIGNvbnN0IHByaW1hcnlQYXRoID0gcGF0aHMuZmluZCgocCkgPT4gIXAuaGFzQXR0cmlidXRlKFwib3BhY2l0eVwiKSk7XG4gICAgICAgIGNvbnN0IHNlY29uZGFyeVBhdGggPSBwYXRocy5maW5kKChwKSA9PiBwLmhhc0F0dHJpYnV0ZShcIm9wYWNpdHlcIikpO1xuICAgICAgICBpZiAoIXByaW1hcnlQYXRoIHx8ICFzZWNvbmRhcnlQYXRoKSByZXR1cm47XG4gICAgICAgIHByaW1hcnlQYXRoLnNldEF0dHJpYnV0ZShcImRhdGEtZHVvdG9uZS1wcmltYXJ5XCIsIFwiXCIpO1xuICAgICAgICBzZWNvbmRhcnlQYXRoLnNldEF0dHJpYnV0ZShcImRhdGEtZHVvdG9uZS1zZWNvbmRhcnlcIiwgXCJcIik7XG4gICAgICAgIGlmIChob3N0RWwuc3dhcE9wYWNpdHkgJiYgcHJpbWFyeVBhdGggJiYgc2Vjb25kYXJ5UGF0aCkge1xuICAgICAgICAgIGNvbnN0IG9yaWdpbmFsT3BhY2l0eSA9IHNlY29uZGFyeVBhdGguZ2V0QXR0cmlidXRlKFwib3BhY2l0eVwiKSB8fCBcIjAuNFwiO1xuICAgICAgICAgIHByaW1hcnlQYXRoLnN0eWxlLnNldFByb3BlcnR5KFwiLS1wYXRoLW9wYWNpdHlcIiwgb3JpZ2luYWxPcGFjaXR5KTtcbiAgICAgICAgICBzZWNvbmRhcnlQYXRoLnN0eWxlLnNldFByb3BlcnR5KFwiLS1wYXRoLW9wYWNpdHlcIiwgXCIxXCIpO1xuICAgICAgICB9XG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWR1b3RvbmUtaW5pdGlhbGl6ZWRcIiwgXCJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xudmFyIGxpYnJhcnlfZGVmYXVsdF9kZWZhdWx0ID0gbGlicmFyeTtcblxuZXhwb3J0IHtcbiAgbGlicmFyeV9kZWZhdWx0X2RlZmF1bHRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvY29tcG9uZW50cy9pY29uL2xpYnJhcnkuc3lzdGVtLnRzXG5mdW5jdGlvbiBkYXRhVXJpKHN2Zykge1xuICByZXR1cm4gYGRhdGE6aW1hZ2Uvc3ZnK3htbCwke2VuY29kZVVSSUNvbXBvbmVudChzdmcpfWA7XG59XG52YXIgaWNvbnMgPSB7XG4gIC8vXG4gIC8vIFNvbGlkIHZhcmlhbnRcbiAgLy9cbiAgc29saWQ6IHtcbiAgICBjaGVjazogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTQzNC44IDcwLjFjMTQuMyAxMC40IDE3LjUgMzAuNCA3LjEgNDQuN2wtMjU2IDM1MmMtNS41IDcuNi0xNCAxMi4zLTIzLjQgMTMuMXMtMTguNS0yLjctMjUuMS05LjNsLTEyOC0xMjhjLTEyLjUtMTIuNS0xMi41LTMyLjggMC00NS4zczMyLjgtMTIuNSA0NS4zIDBsMTAxLjUgMTAxLjUgMjM0LTMyMS43YzEwLjQtMTQuMyAzMC40LTE3LjUgNDQuNy03LjF6XCIvPjwvc3ZnPmAsXG4gICAgXCJjaGV2cm9uLWRvd25cIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTIwMS40IDQwNi42YzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwbDE5Mi0xOTJjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNzLTMyLjgtMTIuNS00NS4zIDBMMjI0IDMzOC43IDU0LjYgMTY5LjRjLTEyLjUtMTIuNS0zMi44LTEyLjUtNDUuMyAwcy0xMi41IDMyLjggMCA0NS4zbDE5MiAxOTJ6XCIvPjwvc3ZnPmAsXG4gICAgXCJjaGV2cm9uLWxlZnRcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMzIwIDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTkuNCAyMzMuNGMtMTIuNSAxMi41LTEyLjUgMzIuOCAwIDQ1LjNsMTkyIDE5MmMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMHMxMi41LTMyLjggMC00NS4zTDc3LjMgMjU2IDI0Ni42IDg2LjZjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNzLTMyLjgtMTIuNS00NS4zIDBsLTE5MiAxOTJ6XCIvPjwvc3ZnPmAsXG4gICAgXCJjaGV2cm9uLXJpZ2h0XCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDMyMCA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0zMTEuMSAyMzMuNGMxMi41IDEyLjUgMTIuNSAzMi44IDAgNDUuM2wtMTkyIDE5MmMtMTIuNSAxMi41LTMyLjggMTIuNS00NS4zIDBzLTEyLjUtMzIuOCAwLTQ1LjNMMjQzLjIgMjU2IDczLjkgODYuNmMtMTIuNS0xMi41LTEyLjUtMzIuOCAwLTQ1LjNzMzIuOC0xMi41IDQ1LjMgMGwxOTIgMTkyelwiLz48L3N2Zz5gLFxuICAgIGNpcmNsZTogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTAgMjU2YTI1NiAyNTYgMCAxIDEgNTEyIDAgMjU2IDI1NiAwIDEgMSAtNTEyIDB6XCIvPjwvc3ZnPmAsXG4gICAgZXllZHJvcHBlcjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTM0MS42IDI5LjJsLTEwMS42IDEwMS42LTkuNC05LjRjLTEyLjUtMTIuNS0zMi44LTEyLjUtNDUuMyAwcy0xMi41IDMyLjggMCA0NS4zbDE2MCAxNjBjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBzMTIuNS0zMi44IDAtNDUuM2wtOS40LTkuNCAxMDEuNi0xMDEuNmMzOS0zOSAzOS0xMDIuMiAwLTE0MS4xcy0xMDIuMi0zOS0xNDEuMSAwek01NS40IDMyMy4zYy0xNSAxNS0yMy40IDM1LjQtMjMuNCA1Ni42bDAgNDIuNC0yNi42IDM5LjljLTguNSAxMi43LTYuOCAyOS42IDQgNDAuNHMyNy43IDEyLjUgNDAuNCA0bDM5LjktMjYuNiA0Mi40IDBjMjEuMiAwIDQxLjYtOC40IDU2LjYtMjMuNGwxMDkuNC0xMDkuNC00NS4zLTQ1LjMtMTA5LjQgMTA5LjRjLTMgMy03LjEgNC43LTExLjMgNC43bC0zNi4xIDAgMC0zNi4xYzAtNC4yIDEuNy04LjMgNC43LTExLjNsMTA5LjQtMTA5LjQtNDUuMy00NS4zLTEwOS40IDEwOS40elwiLz48L3N2Zz5gLFxuICAgIGZpbGU6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTkyIDY0QzE1Ni43IDY0IDEyOCA5Mi43IDEyOCAxMjhMMTI4IDUxMkMxMjggNTQ3LjMgMTU2LjcgNTc2IDE5MiA1NzZMNDQ4IDU3NkM0ODMuMyA1NzYgNTEyIDU0Ny4zIDUxMiA1MTJMNTEyIDIzNC41QzUxMiAyMTcuNSA1MDUuMyAyMDEuMiA0OTMuMyAxODkuMkwzODYuNyA4Mi43QzM3NC43IDcwLjcgMzU4LjUgNjQgMzQxLjUgNjRMMTkyIDY0ek00NTMuNSAyNDBMMzYwIDI0MEMzNDYuNyAyNDAgMzM2IDIyOS4zIDMzNiAyMTZMMzM2IDEyMi41TDQ1My41IDI0MHpcIi8+PC9zdmc+YCxcbiAgICBcImZpbGUtYXVkaW9cIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMjggMTI4QzEyOCA5Mi43IDE1Ni43IDY0IDE5MiA2NEwzNDEuNSA2NEMzNTguNSA2NCAzNzQuOCA3MC43IDM4Ni44IDgyLjdMNDkzLjMgMTg5LjNDNTA1LjMgMjAxLjMgNTEyIDIxNy42IDUxMiAyMzQuNkw1MTIgNTEyQzUxMiA1NDcuMyA0ODMuMyA1NzYgNDQ4IDU3NkwxOTIgNTc2QzE1Ni43IDU3NiAxMjggNTQ3LjMgMTI4IDUxMkwxMjggMTI4ek0zMzYgMTIyLjVMMzM2IDIxNkMzMzYgMjI5LjMgMzQ2LjcgMjQwIDM2MCAyNDBMNDUzLjUgMjQwTDMzNiAxMjIuNXpNMzg5LjggMzA3LjdDMzgwLjcgMzAxLjQgMzY4LjMgMzAzLjYgMzYyIDMxMi43QzM1NS43IDMyMS44IDM1Ny45IDMzNC4yIDM2NyAzNDAuNUMzOTAuOSAzNTcuMiA0MDYuNCAzODQuOCA0MDYuNCA0MTZDNDA2LjQgNDQ3LjIgMzkwLjggNDc0LjkgMzY3IDQ5MS41QzM1Ny45IDQ5Ny44IDM1NS43IDUxMC4zIDM2MiA1MTkuM0MzNjguMyA1MjguMyAzODAuOCA1MzAuNiAzODkuOCA1MjQuM0M0MjMuOSA1MDAuNSA0NDYuNCA0NjAuOCA0NDYuNCA0MTZDNDQ2LjQgMzcxLjIgNDI0IDMzMS41IDM4OS44IDMwNy43ek0yMDggMzc2QzE5OS4yIDM3NiAxOTIgMzgzLjIgMTkyIDM5MkwxOTIgNDQwQzE5MiA0NDguOCAxOTkuMiA0NTYgMjA4IDQ1NkwyMzIgNDU2TDI1OS4yIDQ5MEMyNjIuMiA0OTMuOCAyNjYuOCA0OTYgMjcxLjcgNDk2TDI3MiA0OTZDMjgwLjggNDk2IDI4OCA0ODguOCAyODggNDgwTDI4OCAzNTJDMjg4IDM0My4yIDI4MC44IDMzNiAyNzIgMzM2TDI3MS43IDMzNkMyNjYuOCAzMzYgMjYyLjIgMzM4LjIgMjU5LjIgMzQyTDIzMiAzNzZMMjA4IDM3NnpNMzM2IDQ0OC4yQzMzNiA0NTguOSAzNDYuNSA0NjYuNCAzNTQuOSA0NTkuOEMzNjcuOCA0NDkuNSAzNzYgNDMzLjcgMzc2IDQxNkMzNzYgMzk4LjMgMzY3LjggMzgyLjUgMzU0LjkgMzcyLjJDMzQ2LjUgMzY1LjUgMzM2IDM3My4xIDMzNiAzODMuOEwzMzYgNDQ4LjN6XCIvPjwvc3ZnPmAsXG4gICAgXCJmaWxlLWNvZGVcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMjggMTI4QzEyOCA5Mi43IDE1Ni43IDY0IDE5MiA2NEwzNDEuNSA2NEMzNTguNSA2NCAzNzQuOCA3MC43IDM4Ni44IDgyLjdMNDkzLjMgMTg5LjNDNTA1LjMgMjAxLjMgNTEyIDIxNy42IDUxMiAyMzQuNkw1MTIgNTEyQzUxMiA1NDcuMyA0ODMuMyA1NzYgNDQ4IDU3NkwxOTIgNTc2QzE1Ni43IDU3NiAxMjggNTQ3LjMgMTI4IDUxMkwxMjggMTI4ek0zMzYgMTIyLjVMMzM2IDIxNkMzMzYgMjI5LjMgMzQ2LjcgMjQwIDM2MCAyNDBMNDUzLjUgMjQwTDMzNiAxMjIuNXpNMjgyLjIgMzU5LjZDMjkwLjggMzQ5LjUgMjg5LjcgMzM0LjQgMjc5LjYgMzI1LjhDMjY5LjUgMzE3LjIgMjU0LjQgMzE4LjMgMjQ1LjggMzI4LjRMMTk3LjggMzg0LjRDMTkwLjEgMzkzLjQgMTkwLjEgNDA2LjYgMTk3LjggNDE1LjZMMjQ1LjggNDcxLjZDMjU0LjQgNDgxLjcgMjY5LjYgNDgyLjggMjc5LjYgNDc0LjJDMjg5LjYgNDY1LjYgMjkwLjggNDUwLjQgMjgyLjIgNDQwLjRMMjQ3LjYgNDAwTDI4Mi4yIDM1OS42ek0zOTQuMiAzMjguNEMzODUuNiAzMTguMyAzNzAuNCAzMTcuMiAzNjAuNCAzMjUuOEMzNTAuNCAzMzQuNCAzNDkuMiAzNDkuNiAzNTcuOCAzNTkuNkwzOTIuNCA0MDBMMzU3LjggNDQwLjRDMzQ5LjIgNDUwLjUgMzUwLjMgNDY1LjYgMzYwLjQgNDc0LjJDMzcwLjUgNDgyLjggMzg1LjYgNDgxLjcgMzk0LjIgNDcxLjZMNDQyLjIgNDE1LjZDNDQ5LjkgNDA2LjYgNDQ5LjkgMzkzLjQgNDQyLjIgMzg0LjRMMzk0LjIgMzI4LjR6XCIvPjwvc3ZnPmAsXG4gICAgXCJmaWxlLWV4Y2VsXCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTI4IDEyOEMxMjggOTIuNyAxNTYuNyA2NCAxOTIgNjRMMzQxLjUgNjRDMzU4LjUgNjQgMzc0LjggNzAuNyAzODYuOCA4Mi43TDQ5My4zIDE4OS4zQzUwNS4zIDIwMS4zIDUxMiAyMTcuNiA1MTIgMjM0LjZMNTEyIDUxMkM1MTIgNTQ3LjMgNDgzLjMgNTc2IDQ0OCA1NzZMMTkyIDU3NkMxNTYuNyA1NzYgMTI4IDU0Ny4zIDEyOCA1MTJMMTI4IDEyOHpNMzM2IDEyMi41TDMzNiAyMTZDMzM2IDIyOS4zIDM0Ni43IDI0MCAzNjAgMjQwTDQ1My41IDI0MEwzMzYgMTIyLjV6TTI5MiAzMzAuN0MyODQuNiAzMTkuNyAyNjkuNyAzMTYuNyAyNTguNyAzMjRDMjQ3LjcgMzMxLjMgMjQ0LjcgMzQ2LjMgMjUyIDM1Ny4zTDI5MS4yIDQxNkwyNTIgNDc0LjdDMjQ0LjYgNDg1LjcgMjQ3LjYgNTAwLjYgMjU4LjcgNTA4QzI2OS44IDUxNS40IDI4NC42IDUxMi40IDI5MiA1MDEuM0wzMjAgNDU5LjNMMzQ4IDUwMS4zQzM1NS40IDUxMi4zIDM3MC4zIDUxNS4zIDM4MS4zIDUwOEMzOTIuMyA1MDAuNyAzOTUuMyA0ODUuNyAzODggNDc0LjdMMzQ4LjggNDE2TDM4OCAzNTcuM0MzOTUuNCAzNDYuMyAzOTIuNCAzMzEuNCAzODEuMyAzMjRDMzcwLjIgMzE2LjYgMzU1LjQgMzE5LjYgMzQ4IDMzMC43TDMyMCAzNzIuN0wyOTIgMzMwLjd6XCIvPjwvc3ZnPmAsXG4gICAgXCJmaWxlLWltYWdlXCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTI4IDEyOEMxMjggOTIuNyAxNTYuNyA2NCAxOTIgNjRMMzQxLjUgNjRDMzU4LjUgNjQgMzc0LjggNzAuNyAzODYuOCA4Mi43TDQ5My4zIDE4OS4zQzUwNS4zIDIwMS4zIDUxMiAyMTcuNiA1MTIgMjM0LjZMNTEyIDUxMkM1MTIgNTQ3LjMgNDgzLjMgNTc2IDQ0OCA1NzZMMTkyIDU3NkMxNTYuNyA1NzYgMTI4IDU0Ny4zIDEyOCA1MTJMMTI4IDEyOHpNMzM2IDEyMi41TDMzNiAyMTZDMzM2IDIyOS4zIDM0Ni43IDI0MCAzNjAgMjQwTDQ1My41IDI0MEwzMzYgMTIyLjV6TTI1NiAzMjBDMjU2IDMwMi4zIDI0MS43IDI4OCAyMjQgMjg4QzIwNi4zIDI4OCAxOTIgMzAyLjMgMTkyIDMyMEMxOTIgMzM3LjcgMjA2LjMgMzUyIDIyNCAzNTJDMjQxLjcgMzUyIDI1NiAzMzcuNyAyNTYgMzIwek0yMjAuNiA1MTJMNDE5LjQgNTEyQzQzNS4yIDUxMiA0NDggNDk5LjIgNDQ4IDQ4My40QzQ0OCA0NzYuMSA0NDUuMiA0NjkgNDQwLjEgNDYzLjdMMzQzLjMgMzYxLjlDMzM3LjMgMzU1LjYgMzI4LjkgMzUyIDMyMC4xIDM1MkwzMTkuOCAzNTJDMzExIDM1MiAzMDIuNyAzNTUuNiAyOTYuNiAzNjEuOUwxOTkuOSA0NjMuN0MxOTQuOCA0NjkgMTkyIDQ3Ni4xIDE5MiA0ODMuNEMxOTIgNDk5LjIgMjA0LjggNTEyIDIyMC42IDUxMnpcIi8+PC9zdmc+YCxcbiAgICBcImZpbGUtcGRmXCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTI4IDY0QzkyLjcgNjQgNjQgOTIuNyA2NCAxMjhMNjQgNTEyQzY0IDU0Ny4zIDkyLjcgNTc2IDEyOCA1NzZMMjA4IDU3NkwyMDggNDY0QzIwOCA0MjguNyAyMzYuNyA0MDAgMjcyIDQwMEw0NDggNDAwTDQ0OCAyMzQuNUM0NDggMjE3LjUgNDQxLjMgMjAxLjIgNDI5LjMgMTg5LjJMMzIyLjcgODIuN0MzMTAuNyA3MC43IDI5NC41IDY0IDI3Ny41IDY0TDEyOCA2NHpNMzg5LjUgMjQwTDI5NiAyNDBDMjgyLjcgMjQwIDI3MiAyMjkuMyAyNzIgMjE2TDI3MiAxMjIuNUwzODkuNSAyNDB6TTI3MiA0NDRDMjYxIDQ0NCAyNTIgNDUzIDI1MiA0NjRMMjUyIDU5MkMyNTIgNjAzIDI2MSA2MTIgMjcyIDYxMkMyODMgNjEyIDI5MiA2MDMgMjkyIDU5MkwyOTIgNTY0TDMwNCA1NjRDMzM3LjEgNTY0IDM2NCA1MzcuMSAzNjQgNTA0QzM2NCA0NzAuOSAzMzcuMSA0NDQgMzA0IDQ0NEwyNzIgNDQ0ek0zMDQgNTI0TDI5MiA1MjRMMjkyIDQ4NEwzMDQgNDg0QzMxNSA0ODQgMzI0IDQ5MyAzMjQgNTA0QzMyNCA1MTUgMzE1IDUyNCAzMDQgNTI0ek00MDAgNDQ0QzM4OSA0NDQgMzgwIDQ1MyAzODAgNDY0TDM4MCA1OTJDMzgwIDYwMyAzODkgNjEyIDQwMCA2MTJMNDMyIDYxMkM0NjAuNyA2MTIgNDg0IDU4OC43IDQ4NCA1NjBMNDg0IDQ5NkM0ODQgNDY3LjMgNDYwLjcgNDQ0IDQzMiA0NDRMNDAwIDQ0NHpNNDIwIDU3Mkw0MjAgNDg0TDQzMiA0ODRDNDM4LjYgNDg0IDQ0NCA0ODkuNCA0NDQgNDk2TDQ0NCA1NjBDNDQ0IDU2Ni42IDQzOC42IDU3MiA0MzIgNTcyTDQyMCA1NzJ6TTUwOCA0NjRMNTA4IDU5MkM1MDggNjAzIDUxNyA2MTIgNTI4IDYxMkM1MzkgNjEyIDU0OCA2MDMgNTQ4IDU5Mkw1NDggNTQ4TDU3NiA1NDhDNTg3IDU0OCA1OTYgNTM5IDU5NiA1MjhDNTk2IDUxNyA1ODcgNTA4IDU3NiA1MDhMNTQ4IDUwOEw1NDggNDg0TDU3NiA0ODRDNTg3IDQ4NCA1OTYgNDc1IDU5NiA0NjRDNTk2IDQ1MyA1ODcgNDQ0IDU3NiA0NDRMNTI4IDQ0NEM1MTcgNDQ0IDUwOCA0NTMgNTA4IDQ2NHpcIi8+PC9zdmc+YCxcbiAgICBcImZpbGUtcG93ZXJwb2ludFwiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA2NDAgNjQwXCI+PCEtLSFGb250IEF3ZXNvbWUgRnJlZSA3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyOCAxMjhDMTI4IDkyLjcgMTU2LjcgNjQgMTkyIDY0TDM0MS41IDY0QzM1OC41IDY0IDM3NC44IDcwLjcgMzg2LjggODIuN0w0OTMuMyAxODkuM0M1MDUuMyAyMDEuMyA1MTIgMjE3LjYgNTEyIDIzNC42TDUxMiA1MTJDNTEyIDU0Ny4zIDQ4My4zIDU3NiA0NDggNTc2TDE5MiA1NzZDMTU2LjcgNTc2IDEyOCA1NDcuMyAxMjggNTEyTDEyOCAxMjh6TTMzNiAxMjIuNUwzMzYgMjE2QzMzNiAyMjkuMyAzNDYuNyAyNDAgMzYwIDI0MEw0NTMuNSAyNDBMMzM2IDEyMi41ek0yODAgMzIwQzI2Ni43IDMyMCAyNTYgMzMwLjcgMjU2IDM0NEwyNTYgNDg4QzI1NiA1MDEuMyAyNjYuNyA1MTIgMjgwIDUxMkMyOTMuMyA1MTIgMzA0IDUwMS4zIDMwNCA0ODhMMzA0IDQ2NEwzMjggNDY0QzM2Ny44IDQ2NCA0MDAgNDMxLjggNDAwIDM5MkM0MDAgMzUyLjIgMzY3LjggMzIwIDMyOCAzMjBMMjgwIDMyMHpNMzI4IDQxNkwzMDQgNDE2TDMwNCAzNjhMMzI4IDM2OEMzNDEuMyAzNjggMzUyIDM3OC43IDM1MiAzOTJDMzUyIDQwNS4zIDM0MS4zIDQxNiAzMjggNDE2elwiLz48L3N2Zz5gLFxuICAgIFwiZmlsZS12aWRlb1wiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA2NDAgNjQwXCI+PCEtLSFGb250IEF3ZXNvbWUgRnJlZSA3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyOCAxMjhDMTI4IDkyLjcgMTU2LjcgNjQgMTkyIDY0TDM0MS41IDY0QzM1OC41IDY0IDM3NC44IDcwLjcgMzg2LjggODIuN0w0OTMuMyAxODkuM0M1MDUuMyAyMDEuMyA1MTIgMjE3LjYgNTEyIDIzNC42TDUxMiA1MTJDNTEyIDU0Ny4zIDQ4My4zIDU3NiA0NDggNTc2TDE5MiA1NzZDMTU2LjcgNTc2IDEyOCA1NDcuMyAxMjggNTEyTDEyOCAxMjh6TTMzNiAxMjIuNUwzMzYgMjE2QzMzNiAyMjkuMyAzNDYuNyAyNDAgMzYwIDI0MEw0NTMuNSAyNDBMMzM2IDEyMi41ek0yMDggMzY4TDIwOCA0NjRDMjA4IDQ4MS43IDIyMi4zIDQ5NiAyNDAgNDk2TDMzNiA0OTZDMzUzLjcgNDk2IDM2OCA0ODEuNyAzNjggNDY0TDM2OCA0NDBMNDAzIDQ3NUM0MDYuMiA0NzguMiA0MTAuNSA0ODAgNDE1IDQ4MEM0MjQuNCA0ODAgNDMyIDQ3Mi40IDQzMiA0NjNMNDMyIDM2OC45QzQzMiAzNTkuNSA0MjQuNCAzNTEuOSA0MTUgMzUxLjlDNDEwLjUgMzUxLjkgNDA2LjIgMzUzLjcgNDAzIDM1Ni45TDM2OCAzOTEuOUwzNjggMzY3LjlDMzY4IDM1MC4yIDM1My43IDMzNS45IDMzNiAzMzUuOUwyNDAgMzM1LjlDMjIyLjMgMzM1LjkgMjA4IDM1MC4yIDIwOCAzNjcuOXpcIi8+PC9zdmc+YCxcbiAgICBcImZpbGUtd29yZFwiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA2NDAgNjQwXCI+PCEtLSFGb250IEF3ZXNvbWUgRnJlZSA3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyOCAxMjhDMTI4IDkyLjcgMTU2LjcgNjQgMTkyIDY0TDM0MS41IDY0QzM1OC41IDY0IDM3NC44IDcwLjcgMzg2LjggODIuN0w0OTMuMyAxODkuM0M1MDUuMyAyMDEuMyA1MTIgMjE3LjYgNTEyIDIzNC42TDUxMiA1MTJDNTEyIDU0Ny4zIDQ4My4zIDU3NiA0NDggNTc2TDE5MiA1NzZDMTU2LjcgNTc2IDEyOCA1NDcuMyAxMjggNTEyTDEyOCAxMjh6TTMzNiAxMjIuNUwzMzYgMjE2QzMzNiAyMjkuMyAzNDYuNyAyNDAgMzYwIDI0MEw0NTMuNSAyNDBMMzM2IDEyMi41ek0yNjMuNCAzMzguOEMyNjAuNSAzMjUuOSAyNDcuNyAzMTcuNyAyMzQuOCAzMjAuNkMyMjEuOSAzMjMuNSAyMTMuNyAzMzYuMyAyMTYuNiAzNDkuMkwyNDguNiA0OTMuMkMyNTAuOSA1MDMuNyAyNjAgNTExLjQgMjcwLjggNTEyQzI4MS42IDUxMi42IDI5MS40IDUwNS45IDI5NC44IDQ5NS42TDMyMCA0MTkuOUwzNDUuMiA0OTUuNkMzNDguNiA1MDUuOCAzNTguNCA1MTIuNSAzNjkuMiA1MTJDMzgwIDUxMS41IDM4OS4xIDUwMy44IDM5MS40IDQ5My4yTDQyMy40IDM0OS4yQzQyNi4zIDMzNi4zIDQxOC4xIDMyMy40IDQwNS4yIDMyMC42QzM5Mi4zIDMxNy44IDM3OS40IDMyNS45IDM3Ni42IDMzOC44TDM2My40IDM5OC4yTDM0Mi44IDMzNi40QzMzOS41IDMyNi42IDMzMC40IDMyMCAzMjAgMzIwQzMwOS42IDMyMCAzMDAuNSAzMjYuNiAyOTcuMiAzMzYuNEwyNzYuNiAzOTguMkwyNjMuNCAzMzguOHpcIi8+PC9zdmc+YCxcbiAgICBcImZpbGUtemlwcGVyXCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTI4IDEyOEMxMjggOTIuNyAxNTYuNyA2NCAxOTIgNjRMMzQxLjUgNjRDMzU4LjUgNjQgMzc0LjggNzAuNyAzODYuOCA4Mi43TDQ5My4zIDE4OS4zQzUwNS4zIDIwMS4zIDUxMiAyMTcuNiA1MTIgMjM0LjZMNTEyIDUxMkM1MTIgNTQ3LjMgNDgzLjMgNTc2IDQ0OCA1NzZMMTkyIDU3NkMxNTYuNyA1NzYgMTI4IDU0Ny4zIDEyOCA1MTJMMTI4IDEyOHpNMzM2IDEyMi41TDMzNiAyMTZDMzM2IDIyOS4zIDM0Ni43IDI0MCAzNjAgMjQwTDQ1My41IDI0MEwzMzYgMTIyLjV6TTE5MiAxMzZDMTkyIDE0OS4zIDIwMi43IDE2MCAyMTYgMTYwTDI2NCAxNjBDMjc3LjMgMTYwIDI4OCAxNDkuMyAyODggMTM2QzI4OCAxMjIuNyAyNzcuMyAxMTIgMjY0IDExMkwyMTYgMTEyQzIwMi43IDExMiAxOTIgMTIyLjcgMTkyIDEzNnpNMTkyIDIzMkMxOTIgMjQ1LjMgMjAyLjcgMjU2IDIxNiAyNTZMMjY0IDI1NkMyNzcuMyAyNTYgMjg4IDI0NS4zIDI4OCAyMzJDMjg4IDIxOC43IDI3Ny4zIDIwOCAyNjQgMjA4TDIxNiAyMDhDMjAyLjcgMjA4IDE5MiAyMTguNyAxOTIgMjMyek0yNTYgMzA0TDIyNCAzMDRDMjA2LjMgMzA0IDE5MiAzMTguMyAxOTIgMzM2TDE5MiAzODRDMTkyIDQxMC41IDIxMy41IDQzMiAyNDAgNDMyQzI2Ni41IDQzMiAyODggNDEwLjUgMjg4IDM4NEwyODggMzM2QzI4OCAzMTguMyAyNzMuNyAzMDQgMjU2IDMwNHpNMjQwIDM2OEMyNDguOCAzNjggMjU2IDM3NS4yIDI1NiAzODRDMjU2IDM5Mi44IDI0OC44IDQwMCAyNDAgNDAwQzIzMS4yIDQwMCAyMjQgMzkyLjggMjI0IDM4NEMyMjQgMzc1LjIgMjMxLjIgMzY4IDI0MCAzNjh6XCIvPjwvc3ZnPmAsXG4gICAgXCJncmlwLXZlcnRpY2FsXCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDMyMCA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMjggNDBjMC0yMi4xLTE3LjktNDAtNDAtNDBMNDAgMEMxNy45IDAgMCAxNy45IDAgNDBMMCA4OGMwIDIyLjEgMTcuOSA0MCA0MCA0MGw0OCAwYzIyLjEgMCA0MC0xNy45IDQwLTQwbDAtNDh6bTAgMTkyYzAtMjIuMS0xNy45LTQwLTQwLTQwbC00OCAwYy0yMi4xIDAtNDAgMTcuOS00MCA0MGwwIDQ4YzAgMjIuMSAxNy45IDQwIDQwIDQwbDQ4IDBjMjIuMSAwIDQwLTE3LjkgNDAtNDBsMC00OHpNMCA0MjRsMCA0OGMwIDIyLjEgMTcuOSA0MCA0MCA0MGw0OCAwYzIyLjEgMCA0MC0xNy45IDQwLTQwbDAtNDhjMC0yMi4xLTE3LjktNDAtNDAtNDBsLTQ4IDBjLTIyLjEgMC00MCAxNy45LTQwIDQwek0zMjAgNDBjMC0yMi4xLTE3LjktNDAtNDAtNDBMMjMyIDBjLTIyLjEgMC00MCAxNy45LTQwIDQwbDAgNDhjMCAyMi4xIDE3LjkgNDAgNDAgNDBsNDggMGMyMi4xIDAgNDAtMTcuOSA0MC00MGwwLTQ4ek0xOTIgMjMybDAgNDhjMCAyMi4xIDE3LjkgNDAgNDAgNDBsNDggMGMyMi4xIDAgNDAtMTcuOSA0MC00MGwwLTQ4YzAtMjIuMS0xNy45LTQwLTQwLTQwbC00OCAwYy0yMi4xIDAtNDAgMTcuOS00MCA0MHpNMzIwIDQyNGMwLTIyLjEtMTcuOS00MC00MC00MGwtNDggMGMtMjIuMSAwLTQwIDE3LjktNDAgNDBsMCA0OGMwIDIyLjEgMTcuOSA0MCA0MCA0MGw0OCAwYzIyLjEgMCA0MC0xNy45IDQwLTQwbDAtNDh6XCIvPjwvc3ZnPmAsXG4gICAgaW5kZXRlcm1pbmF0ZTogYDxzdmcgcGFydD1cImluZGV0ZXJtaW5hdGUtaWNvblwiIGNsYXNzPVwiaWNvblwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIj48ZyBzdHJva2U9XCJub25lXCIgc3Ryb2tlLXdpZHRoPVwiMVwiIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIj48ZyBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCI+PGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDIuMjg1NzE0IDYuODU3MTQzKVwiPjxwYXRoIGQ9XCJNMTAuMjg1NzE0MywxLjE0Mjg1NzE0IEwxLjE0Mjg1NzE0LDEuMTQyODU3MTRcIi8+PC9nPjwvZz48L2c+PC9zdmc+YCxcbiAgICBtaW51czogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTAgMjU2YzAtMTcuNyAxNC4zLTMyIDMyLTMybDM4NCAwYzE3LjcgMCAzMiAxNC4zIDMyIDMycy0xNC4zIDMyLTMyIDMyTDMyIDI4OGMtMTcuNyAwLTMyLTE0LjMtMzItMzJ6XCIvPjwvc3ZnPmAsXG4gICAgcGF1c2U6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDM4NCA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00OCAzMkMyMS41IDMyIDAgNTMuNSAwIDgwTDAgNDMyYzAgMjYuNSAyMS41IDQ4IDQ4IDQ4bDY0IDBjMjYuNSAwIDQ4LTIxLjUgNDgtNDhsMC0zNTJjMC0yNi41LTIxLjUtNDgtNDgtNDhMNDggMzJ6bTIyNCAwYy0yNi41IDAtNDggMjEuNS00OCA0OGwwIDM1MmMwIDI2LjUgMjEuNSA0OCA0OCA0OGw2NCAwYzI2LjUgMCA0OC0yMS41IDQ4LTQ4bDAtMzUyYzAtMjYuNS0yMS41LTQ4LTQ4LTQ4bC02NCAwelwiLz48L3N2Zz5gLFxuICAgIHBsYXk6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk05MS4yIDM2LjljLTEyLjQtNi44LTI3LjQtNi41LTM5LjYgLjdTMzIgNTcuOSAzMiA3MmwwIDM2OGMwIDE0LjEgNy41IDI3LjIgMTkuNiAzNC40czI3LjIgNy41IDM5LjYgLjdsMzM2LTE4NGMxMi44LTcgMjAuOC0yMC41IDIwLjgtMzUuMXMtOC0yOC4xLTIwLjgtMzUuMWwtMzM2LTE4NHpcIi8+PC9zdmc+YCxcbiAgICBwbHVzOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA2NDAgNjQwXCI+PCEtLSFGb250IEF3ZXNvbWUgRnJlZSA3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTM1MiAxMjhDMzUyIDExMC4zIDMzNy43IDk2IDMyMCA5NkMzMDIuMyA5NiAyODggMTEwLjMgMjg4IDEyOEwyODggMjg4TDEyOCAyODhDMTEwLjMgMjg4IDk2IDMwMi4zIDk2IDMyMEM5NiAzMzcuNyAxMTAuMyAzNTIgMTI4IDM1MkwyODggMzUyTDI4OCA1MTJDMjg4IDUyOS43IDMwMi4zIDU0NCAzMjAgNTQ0QzMzNy43IDU0NCAzNTIgNTI5LjcgMzUyIDUxMkwzNTIgMzUyTDUxMiAzNTJDNTI5LjcgMzUyIDU0NCAzMzcuNyA1NDQgMzIwQzU0NCAzMDIuMyA1MjkuNyAyODggNTEyIDI4OEwzNTIgMjg4TDM1MiAxMjh6XCIvPjwvc3ZnPmAsXG4gICAgc3RhcjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTc2IDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTMwOS41LTE4LjljLTQuMS04LTEyLjQtMTMuMS0yMS40LTEzLjFzLTE3LjMgNS4xLTIxLjQgMTMuMUwxOTMuMSAxMjUuMyAzMy4yIDE1MC43Yy04LjkgMS40LTE2LjMgNy43LTE5LjEgMTYuM3MtLjUgMTggNS44IDI0LjRsMTE0LjQgMTE0LjUtMjUuMiAxNTkuOWMtMS40IDguOSAyLjMgMTcuOSA5LjYgMjMuMnMxNi45IDYuMSAyNSAyTDI4OC4xIDQxNy42IDQzMi40IDQ5MWM4IDQuMSAxNy43IDMuMyAyNS0yczExLTE0LjIgOS42LTIzLjJMNDQxLjcgMzA1LjkgNTU2LjEgMTkxLjRjNi40LTYuNCA4LjYtMTUuOCA1LjgtMjQuNHMtMTAuMS0xNC45LTE5LjEtMTYuM0wzODMgMTI1LjMgMzA5LjUtMTguOXpcIi8+PC9zdmc+YCxcbiAgICB1cGxvYWQ6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMzUyIDE3My4zTDM1MiAzODRDMzUyIDQwMS43IDMzNy43IDQxNiAzMjAgNDE2QzMwMi4zIDQxNiAyODggNDAxLjcgMjg4IDM4NEwyODggMTczLjNMMjQ2LjYgMjE0LjdDMjM0LjEgMjI3LjIgMjEzLjggMjI3LjIgMjAxLjMgMjE0LjdDMTg4LjggMjAyLjIgMTg4LjggMTgxLjkgMjAxLjMgMTY5LjRMMjk3LjMgNzMuNEMzMDkuOCA2MC45IDMzMC4xIDYwLjkgMzQyLjYgNzMuNEw0MzguNiAxNjkuNEM0NTEuMSAxODEuOSA0NTEuMSAyMDIuMiA0MzguNiAyMTQuN0M0MjYuMSAyMjcuMiA0MDUuOCAyMjcuMiAzOTMuMyAyMTQuN0wzNTIgMTczLjN6TTMyMCA0NjRDMzY0LjIgNDY0IDQwMCA0MjguMiA0MDAgMzg0TDQ4MCAzODRDNTE1LjMgMzg0IDU0NCA0MTIuNyA1NDQgNDQ4TDU0NCA0ODBDNTQ0IDUxNS4zIDUxNS4zIDU0NCA0ODAgNTQ0TDE2MCA1NDRDMTI0LjcgNTQ0IDk2IDUxNS4zIDk2IDQ4MEw5NiA0NDhDOTYgNDEyLjcgMTI0LjcgMzg0IDE2MCAzODRMMjQwIDM4NEMyNDAgNDI4LjIgMjc1LjggNDY0IDMyMCA0NjR6TTQ2NCA0ODhDNDc3LjMgNDg4IDQ4OCA0NzcuMyA0ODggNDY0QzQ4OCA0NTAuNyA0NzcuMyA0NDAgNDY0IDQ0MEM0NTAuNyA0NDAgNDQwIDQ1MC43IDQ0MCA0NjRDNDQwIDQ3Ny4zIDQ1MC43IDQ4OCA0NjQgNDg4elwiLz48L3N2Zz5gLFxuICAgIHVzZXI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yMjQgMjQ4YTEyMCAxMjAgMCAxIDAgMC0yNDAgMTIwIDEyMCAwIDEgMCAwIDI0MHptLTI5LjcgNTZDOTUuOCAzMDQgMTYgMzgzLjggMTYgNDgyLjMgMTYgNDk4LjcgMjkuMyA1MTIgNDUuNyA1MTJsMzU2LjYgMGMxNi40IDAgMjkuNy0xMy4zIDI5LjctMjkuNyAwLTk4LjUtNzkuOC0xNzguMy0xNzguMy0xNzguM2wtNTkuNCAwelwiLz48L3N2Zz5gLFxuICAgIHhtYXJrOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAzODQgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNTUuMSA3My40Yy0xMi41LTEyLjUtMzIuOC0xMi41LTQ1LjMgMHMtMTIuNSAzMi44IDAgNDUuM0wxNDcuMiAyNTYgOS45IDM5My40Yy0xMi41IDEyLjUtMTIuNSAzMi44IDAgNDUuM3MzMi44IDEyLjUgNDUuMyAwTDE5Mi41IDMwMS4zIDMyOS45IDQzOC42YzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwczEyLjUtMzIuOCAwLTQ1LjNMMjM3LjggMjU2IDM3NS4xIDExOC42YzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zcy0zMi44LTEyLjUtNDUuMyAwTDE5Mi41IDIxMC43IDU1LjEgNzMuNHpcIi8+PC9zdmc+YFxuICB9LFxuICAvL1xuICAvLyBSZWd1bGFyIHZhcmlhbnRcbiAgLy9cbiAgcmVndWxhcjoge1xuICAgIFwiY2lyY2xlLXF1ZXN0aW9uXCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00NjQgMjU2YTIwOCAyMDggMCAxIDAgLTQxNiAwIDIwOCAyMDggMCAxIDAgNDE2IDB6TTAgMjU2YTI1NiAyNTYgMCAxIDEgNTEyIDAgMjU2IDI1NiAwIDEgMSAtNTEyIDB6bTI1Ni04MGMtMTcuNyAwLTMyIDE0LjMtMzIgMzIgMCAxMy4zLTEwLjcgMjQtMjQgMjRzLTI0LTEwLjctMjQtMjRjMC00NC4yIDM1LjgtODAgODAtODBzODAgMzUuOCA4MCA4MGMwIDQ3LjItMzYgNjcuMi01NiA3NC41bDAgMy44YzAgMTMuMy0xMC43IDI0LTI0IDI0cy0yNC0xMC43LTI0LTI0bDAtOC4xYzAtMjAuNSAxNC44LTM1LjIgMzAuMS00MC4yIDYuNC0yLjEgMTMuMi01LjUgMTguMi0xMC4zIDQuMy00LjIgNy43LTEwIDcuNy0xOS42IDAtMTcuNy0xNC4zLTMyLTMyLTMyek0yMjQgMzY4YTMyIDMyIDAgMSAxIDY0IDAgMzIgMzIgMCAxIDEgLTY0IDB6XCIvPjwvc3ZnPmAsXG4gICAgXCJjaXJjbGUteG1hcmtcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI1NiA0OGEyMDggMjA4IDAgMSAxIDAgNDE2IDIwOCAyMDggMCAxIDEgMC00MTZ6bTAgNDY0YTI1NiAyNTYgMCAxIDAgMC01MTIgMjU2IDI1NiAwIDEgMCAwIDUxMnpNMTY3IDE2N2MtOS40IDkuNC05LjQgMjQuNiAwIDMzLjlsNTUgNTUtNTUgNTVjLTkuNCA5LjQtOS40IDI0LjYgMCAzMy45czI0LjYgOS40IDMzLjkgMGw1NS01NSA1NSA1NWM5LjQgOS40IDI0LjYgOS40IDMzLjkgMHM5LjQtMjQuNiAwLTMzLjlsLTU1LTU1IDU1LTU1YzkuNC05LjQgOS40LTI0LjYgMC0zMy45cy0yNC42LTkuNC0zMy45IDBsLTU1IDU1LTU1LTU1Yy05LjQtOS40LTI0LjYtOS40LTMzLjkgMHpcIi8+PC9zdmc+YCxcbiAgICBjb3B5OiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMzg0IDMzNmwtMTkyIDBjLTguOCAwLTE2LTcuMi0xNi0xNmwwLTI1NmMwLTguOCA3LjItMTYgMTYtMTZsMTMzLjUgMGM0LjIgMCA4LjMgMS43IDExLjMgNC43bDU4LjUgNTguNWMzIDMgNC43IDcuMSA0LjcgMTEuM0w0MDAgMzIwYzAgOC44LTcuMiAxNi0xNiAxNnpNMTkyIDM4NGwxOTIgMGMzNS4zIDAgNjQtMjguNyA2NC02NGwwLTE5Ny41YzAtMTctNi43LTMzLjMtMTguNy00NS4zTDM3MC43IDE4LjdDMzU4LjcgNi43IDM0Mi41IDAgMzI1LjUgMEwxOTIgMGMtMzUuMyAwLTY0IDI4LjctNjQgNjRsMCAyNTZjMCAzNS4zIDI4LjcgNjQgNjQgNjR6TTY0IDEyOGMtMzUuMyAwLTY0IDI4LjctNjQgNjRMMCA0NDhjMCAzNS4zIDI4LjcgNjQgNjQgNjRsMTkyIDBjMzUuMyAwIDY0LTI4LjcgNjQtNjRsMC0xNi00OCAwIDAgMTZjMCA4LjgtNy4yIDE2LTE2IDE2TDY0IDQ2NGMtOC44IDAtMTYtNy4yLTE2LTE2bDAtMjU2YzAtOC44IDcuMi0xNiAxNi0xNmwxNiAwIDAtNDgtMTYgMHpcIi8+PC9zdmc+YCxcbiAgICBleWU6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDU3NiA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yODggODBDMjIyLjggODAgMTY5LjIgMTA5LjYgMTI4LjEgMTQ3LjcgODkuNiAxODMuNSA2MyAyMjYgNDkuNCAyNTYgNjMgMjg2IDg5LjYgMzI4LjUgMTI4LjEgMzY0LjMgMTY5LjIgNDAyLjQgMjIyLjggNDMyIDI4OCA0MzJzMTE4LjgtMjkuNiAxNTkuOS02Ny43QzQ4Ni40IDMyOC41IDUxMyAyODYgNTI2LjYgMjU2IDUxMyAyMjYgNDg2LjQgMTgzLjUgNDQ3LjkgMTQ3LjcgNDA2LjggMTA5LjYgMzUzLjIgODAgMjg4IDgwek05NS40IDExMi42QzE0Mi41IDY4LjggMjA3LjIgMzIgMjg4IDMyczE0NS41IDM2LjggMTkyLjYgODAuNmM0Ni44IDQzLjUgNzguMSA5NS40IDkzIDEzMS4xIDMuMyA3LjkgMy4zIDE2LjcgMCAyNC42LTE0LjkgMzUuNy00Ni4yIDg3LjctOTMgMTMxLjEtNDcuMSA0My43LTExMS44IDgwLjYtMTkyLjYgODAuNlMxNDIuNSA0NDMuMiA5NS40IDM5OS40Yy00Ni44LTQzLjUtNzguMS05NS40LTkzLTEzMS4xLTMuMy03LjktMy4zLTE2LjcgMC0yNC42IDE0LjktMzUuNyA0Ni4yLTg3LjcgOTMtMTMxLjF6TTI4OCAzMzZjNDQuMiAwIDgwLTM1LjggODAtODAgMC0yOS42LTE2LjEtNTUuNS00MC02OS4zLTEuNCA1OS43LTQ5LjYgMTA3LjktMTA5LjMgMTA5LjMgMTMuOCAyMy45IDM5LjcgNDAgNjkuMyA0MHptLTc5LjYtODguNGMyLjUgLjMgNSAuNCA3LjYgLjQgMzUuMyAwIDY0LTI4LjcgNjQtNjQgMC0yLjYtLjItNS4xLS40LTcuNi0zNy40IDMuOS02Ny4yIDMzLjctNzEuMSA3MS4xem00NS42LTExNWMxMC44LTMgMjIuMi00LjUgMzMuOS00LjUgOC44IDAgMTcuNSAuOSAyNS44IDIuNiAuMyAuMSAuNSAuMSAuOCAuMiA1Ny45IDEyLjIgMTAxLjQgNjMuNyAxMDEuNCAxMjUuMiAwIDcwLjctNTcuMyAxMjgtMTI4IDEyOC02MS42IDAtMTEzLTQzLjUtMTI1LjItMTAxLjQtMS44LTguNi0yLjgtMTcuNS0yLjgtMjYuNiAwLTExIDEuNC0yMS44IDQtMzIgLjItLjcgLjMtMS4zIC41LTEuOSAxMS45LTQzLjQgNDYuMS03Ny42IDg5LjUtODkuNXpcIi8+PC9zdmc+YCxcbiAgICBcImV5ZS1zbGFzaFwiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1NzYgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNDEtMjQuOWMtOS40LTkuNC0yNC42LTkuNC0zMy45IDBTLTIuMy0uMyA3IDkuMWw1MjggNTI4YzkuNCA5LjQgMjQuNiA5LjQgMzMuOSAwczkuNC0yNC42IDAtMzMuOWwtOTYuNC05Ni40YzIuNy0yLjQgNS40LTQuOCA4LTcuMiA0Ni44LTQzLjUgNzguMS05NS40IDkzLTEzMS4xIDMuMy03LjkgMy4zLTE2LjcgMC0yNC42LTE0LjktMzUuNy00Ni4yLTg3LjctOTMtMTMxLjEtNDcuMS00My43LTExMS44LTgwLjYtMTkyLjYtODAuNi01Ni44IDAtMTA1LjYgMTguMi0xNDYgNDQuMkw0MS0yNC45ek0xNzYuOSAxMTEuMWMzMi4xLTE4LjkgNjkuMi0zMS4xIDExMS4xLTMxLjEgNjUuMiAwIDExOC44IDI5LjYgMTU5LjkgNjcuNyAzOC41IDM1LjcgNjUuMSA3OC4zIDc4LjYgMTA4LjMtMTMuNiAzMC00MC4yIDcyLjUtNzguNiAxMDguMy0zLjEgMi44LTYuMiA1LjYtOS40IDguNEwzOTMuOCAzMjhjMTQtMjAuNSAyMi4yLTQ1LjMgMjIuMi03MiAwLTcwLjctNTcuMy0xMjgtMTI4LTEyOC0yNi43IDAtNTEuNSA4LjItNzIgMjIuMmwtMzkuMS0zOS4xem0xODIgMTgybC0xMDgtMTA4YzExLjEtNS44IDIzLjctOS4xIDM3LjEtOS4xIDQ0LjIgMCA4MCAzNS44IDgwIDgwIDAgMTMuNC0zLjMgMjYtOS4xIDM3LjF6TTEwMy40IDE3My4ybC0zNC0zNGMtMzIuNiAzNi44LTU1IDc1LjgtNjYuOSAxMDQuNS0zLjMgNy45LTMuMyAxNi43IDAgMjQuNiAxNC45IDM1LjcgNDYuMiA4Ny43IDkzIDEzMS4xIDQ3LjEgNDMuNyAxMTEuOCA4MC42IDE5Mi42IDgwLjYgMzcuMyAwIDcxLjItNy45IDEwMS41LTIwLjZMMzUyLjIgNDIyYy0yMCA2LjQtNDEuNCAxMC02NC4yIDEwLTY1LjIgMC0xMTguOC0yOS42LTE1OS45LTY3LjctMzguNS0zNS43LTY1LjEtNzguMy03OC42LTEwOC4zIDEwLjQtMjMuMSAyOC42LTUzLjYgNTQtODIuOHpcIi8+PC9zdmc+YCxcbiAgICBzdGFyOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1NzYgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjg4LjEtMzJjOSAwIDE3LjMgNS4xIDIxLjQgMTMuMUwzODMgMTI1LjMgNTQyLjkgMTUwLjdjOC45IDEuNCAxNi4zIDcuNyAxOS4xIDE2LjNzLjUgMTgtNS44IDI0LjRMNDQxLjcgMzA1LjkgNDY3IDQ2NS44YzEuNCA4LjktMi4zIDE3LjktOS42IDIzLjJzLTE3IDYuMS0yNSAyTDI4OC4xIDQxNy42IDE0My44IDQ5MWMtOCA0LjEtMTcuNyAzLjMtMjUtMnMtMTEtMTQuMi05LjYtMjMuMkwxMzQuNCAzMDUuOSAyMCAxOTEuNGMtNi40LTYuNC04LjYtMTUuOC01LjgtMjQuNHMxMC4xLTE0LjkgMTkuMS0xNi4zbDE1OS45LTI1LjQgNzMuNi0xNDQuMmM0LjEtOCAxMi40LTEzLjEgMjEuNC0xMy4xem0wIDc2LjhMMjMwLjMgMTU4Yy0zLjUgNi44LTEwIDExLjYtMTcuNiAxMi44bC0xMjUuNSAyMCA4OS44IDg5LjljNS40IDUuNCA3LjkgMTMuMSA2LjcgMjAuN2wtMTkuOCAxMjUuNSAxMTMuMy01Ny42YzYuOC0zLjUgMTQuOS0zLjUgMjEuOCAwbDExMy4zIDU3LjYtMTkuOC0xMjUuNWMtMS4yLTcuNiAxLjMtMTUuMyA2LjctMjAuN2w4OS44LTg5LjktMTI1LjUtMjBjLTcuNi0xLjItMTQuMS02LTE3LjYtMTIuOEwyODguMSA0NC44elwiLz48L3N2Zz5gXG4gIH1cbn07XG52YXIgc3lzdGVtTGlicmFyeSA9IHtcbiAgbmFtZTogXCJzeXN0ZW1cIixcbiAgcmVzb2x2ZXI6IChuYW1lLCBfZmFtaWx5ID0gXCJjbGFzc2ljXCIsIHZhcmlhbnQgPSBcInNvbGlkXCIpID0+IHtcbiAgICBsZXQgY29sbGVjdGlvbiA9IGljb25zW3ZhcmlhbnRdO1xuICAgIGxldCBzdmcgPSBjb2xsZWN0aW9uW25hbWVdID8/IGljb25zLnJlZ3VsYXJbbmFtZV0gPz8gaWNvbnMucmVndWxhcltcImNpcmNsZS1xdWVzdGlvblwiXTtcbiAgICBpZiAoc3ZnKSB7XG4gICAgICByZXR1cm4gZGF0YVVyaShzdmcpO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbiAgfVxufTtcbnZhciBsaWJyYXJ5X3N5c3RlbV9kZWZhdWx0ID0gc3lzdGVtTGlicmFyeTtcblxuZXhwb3J0IHtcbiAgaWNvbnMsXG4gIGxpYnJhcnlfc3lzdGVtX2RlZmF1bHRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuaW1wb3J0IHtcbiAgbGlicmFyeV9kZWZhdWx0X2RlZmF1bHRcbn0gZnJvbSBcIi4vY2h1bmsuSlZUQUdSNUIuanNcIjtcbmltcG9ydCB7XG4gIGxpYnJhcnlfc3lzdGVtX2RlZmF1bHRcbn0gZnJvbSBcIi4vY2h1bmsuS1BOM1laNlUuanNcIjtcblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbi9saWJyYXJ5LnRzXG52YXIgZGVmYXVsdEljb25GYW1pbHkgPSBcImNsYXNzaWNcIjtcbnZhciByZWdpc3RyeSA9IFtsaWJyYXJ5X2RlZmF1bHRfZGVmYXVsdCwgbGlicmFyeV9zeXN0ZW1fZGVmYXVsdF07XG52YXIgd2F0Y2hlZEljb25zID0gW107XG5mdW5jdGlvbiB3YXRjaEljb24oaWNvbikge1xuICB3YXRjaGVkSWNvbnMucHVzaChpY29uKTtcbn1cbmZ1bmN0aW9uIHVud2F0Y2hJY29uKGljb24pIHtcbiAgd2F0Y2hlZEljb25zID0gd2F0Y2hlZEljb25zLmZpbHRlcigoZWwpID0+IGVsICE9PSBpY29uKTtcbn1cbmZ1bmN0aW9uIGdldEljb25MaWJyYXJ5KG5hbWUpIHtcbiAgcmV0dXJuIHJlZ2lzdHJ5LmZpbmQoKGxpYikgPT4gbGliLm5hbWUgPT09IG5hbWUpO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJJY29uTGlicmFyeShuYW1lLCBvcHRpb25zKSB7XG4gIHVucmVnaXN0ZXJJY29uTGlicmFyeShuYW1lKTtcbiAgcmVnaXN0cnkucHVzaCh7XG4gICAgbmFtZSxcbiAgICByZXNvbHZlcjogb3B0aW9ucy5yZXNvbHZlcixcbiAgICBtdXRhdG9yOiBvcHRpb25zLm11dGF0b3IsXG4gICAgc3ByaXRlU2hlZXQ6IG9wdGlvbnMuc3ByaXRlU2hlZXRcbiAgfSk7XG4gIHdhdGNoZWRJY29ucy5mb3JFYWNoKChpY29uKSA9PiB7XG4gICAgaWYgKGljb24ubGlicmFyeSA9PT0gbmFtZSkge1xuICAgICAgaWNvbi5zZXRJY29uKCk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIHVucmVnaXN0ZXJJY29uTGlicmFyeShuYW1lKSB7XG4gIHJlZ2lzdHJ5ID0gcmVnaXN0cnkuZmlsdGVyKChsaWIpID0+IGxpYi5uYW1lICE9PSBuYW1lKTtcbn1cbmZ1bmN0aW9uIHNldERlZmF1bHRJY29uRmFtaWx5KGZhbWlseSkge1xuICBkZWZhdWx0SWNvbkZhbWlseSA9IGZhbWlseTtcbiAgd2F0Y2hlZEljb25zLmZvckVhY2goKGljb24pID0+IGljb24uc2V0SWNvbigpKTtcbn1cbmZ1bmN0aW9uIGdldERlZmF1bHRJY29uRmFtaWx5KCkge1xuICByZXR1cm4gZGVmYXVsdEljb25GYW1pbHk7XG59XG5cbmV4cG9ydCB7XG4gIHdhdGNoSWNvbixcbiAgdW53YXRjaEljb24sXG4gIGdldEljb25MaWJyYXJ5LFxuICByZWdpc3Rlckljb25MaWJyYXJ5LFxuICB1bnJlZ2lzdGVySWNvbkxpYnJhcnksXG4gIHNldERlZmF1bHRJY29uRmFtaWx5LFxuICBnZXREZWZhdWx0SWNvbkZhbWlseVxufTtcbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuaW1wb3J0IHtcbiAgXyRMSCxcbiAgUGFydCxcbiAgRGlyZWN0aXZlUGFyZW50LFxuICBDb21waWxlZFRlbXBsYXRlUmVzdWx0LFxuICBNYXliZUNvbXBpbGVkVGVtcGxhdGVSZXN1bHQsXG4gIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdCxcbn0gZnJvbSAnLi9saXQtaHRtbC5qcyc7XG5pbXBvcnQge1xuICBEaXJlY3RpdmVSZXN1bHQsXG4gIERpcmVjdGl2ZUNsYXNzLFxuICBQYXJ0SW5mbyxcbiAgQXR0cmlidXRlUGFydEluZm8sXG59IGZyb20gJy4vZGlyZWN0aXZlLmpzJztcbnR5cGUgUHJpbWl0aXZlID0gbnVsbCB8IHVuZGVmaW5lZCB8IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfCBzeW1ib2wgfCBiaWdpbnQ7XG5cbmNvbnN0IHtfQ2hpbGRQYXJ0OiBDaGlsZFBhcnR9ID0gXyRMSDtcblxudHlwZSBDaGlsZFBhcnQgPSBJbnN0YW5jZVR5cGU8dHlwZW9mIENoaWxkUGFydD47XG5cbmNvbnN0IEVOQUJMRV9TSEFEWURPTV9OT1BBVENIID0gdHJ1ZTtcblxuY29uc3Qgd3JhcCA9XG4gIEVOQUJMRV9TSEFEWURPTV9OT1BBVENIICYmXG4gIHdpbmRvdy5TaGFkeURPTT8uaW5Vc2UgJiZcbiAgd2luZG93LlNoYWR5RE9NPy5ub1BhdGNoID09PSB0cnVlXG4gICAgPyB3aW5kb3cuU2hhZHlET00hLndyYXBcbiAgICA6IChub2RlOiBOb2RlKSA9PiBub2RlO1xuXG4vKipcbiAqIFRlc3RzIGlmIGEgdmFsdWUgaXMgYSBwcmltaXRpdmUgdmFsdWUuXG4gKlxuICogU2VlIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXR5cGVvZi1vcGVyYXRvclxuICovXG5leHBvcnQgY29uc3QgaXNQcmltaXRpdmUgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBQcmltaXRpdmUgPT5cbiAgdmFsdWUgPT09IG51bGwgfHwgKHR5cGVvZiB2YWx1ZSAhPSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUgIT0gJ2Z1bmN0aW9uJyk7XG5cbmV4cG9ydCBjb25zdCBUZW1wbGF0ZVJlc3VsdFR5cGUgPSB7XG4gIEhUTUw6IDEsXG4gIFNWRzogMixcbiAgTUFUSE1MOiAzLFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgVGVtcGxhdGVSZXN1bHRUeXBlID1cbiAgKHR5cGVvZiBUZW1wbGF0ZVJlc3VsdFR5cGUpW2tleW9mIHR5cGVvZiBUZW1wbGF0ZVJlc3VsdFR5cGVdO1xuXG50eXBlIElzVGVtcGxhdGVSZXN1bHQgPSB7XG4gICh2YWw6IHVua25vd24pOiB2YWwgaXMgTWF5YmVDb21waWxlZFRlbXBsYXRlUmVzdWx0O1xuICA8VCBleHRlbmRzIFRlbXBsYXRlUmVzdWx0VHlwZT4oXG4gICAgdmFsOiB1bmtub3duLFxuICAgIHR5cGU6IFRcbiAgKTogdmFsIGlzIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdDxUPjtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgYSB2YWx1ZSBpcyBhIFRlbXBsYXRlUmVzdWx0IG9yIGEgQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzVGVtcGxhdGVSZXN1bHQ6IElzVGVtcGxhdGVSZXN1bHQgPSAoXG4gIHZhbHVlOiB1bmtub3duLFxuICB0eXBlPzogVGVtcGxhdGVSZXN1bHRUeXBlXG4pOiB2YWx1ZSBpcyBVbmNvbXBpbGVkVGVtcGxhdGVSZXN1bHQgPT5cbiAgdHlwZSA9PT0gdW5kZWZpbmVkXG4gICAgPyAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgICAgKHZhbHVlIGFzIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdCk/LlsnXyRsaXRUeXBlJCddICE9PSB1bmRlZmluZWRcbiAgICA6ICh2YWx1ZSBhcyBVbmNvbXBpbGVkVGVtcGxhdGVSZXN1bHQpPy5bJ18kbGl0VHlwZSQnXSA9PT0gdHlwZTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIHZhbHVlIGlzIGEgQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdCA9IChcbiAgdmFsdWU6IHVua25vd25cbik6IHZhbHVlIGlzIENvbXBpbGVkVGVtcGxhdGVSZXN1bHQgPT4ge1xuICByZXR1cm4gKHZhbHVlIGFzIENvbXBpbGVkVGVtcGxhdGVSZXN1bHQpPy5bJ18kbGl0VHlwZSQnXT8uaCAhPSBudWxsO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIHZhbHVlIGlzIGEgRGlyZWN0aXZlUmVzdWx0LlxuICovXG5leHBvcnQgY29uc3QgaXNEaXJlY3RpdmVSZXN1bHQgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBEaXJlY3RpdmVSZXN1bHQgPT5cbiAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgKHZhbHVlIGFzIERpcmVjdGl2ZVJlc3VsdCk/LlsnXyRsaXREaXJlY3RpdmUkJ10gIT09IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIERpcmVjdGl2ZSBjbGFzcyBmb3IgYSBEaXJlY3RpdmVSZXN1bHRcbiAqL1xuZXhwb3J0IGNvbnN0IGdldERpcmVjdGl2ZUNsYXNzID0gKHZhbHVlOiB1bmtub3duKTogRGlyZWN0aXZlQ2xhc3MgfCB1bmRlZmluZWQgPT5cbiAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgKHZhbHVlIGFzIERpcmVjdGl2ZVJlc3VsdCk/LlsnXyRsaXREaXJlY3RpdmUkJ107XG5cbi8qKlxuICogVGVzdHMgd2hldGhlciBhIHBhcnQgaGFzIG9ubHkgYSBzaW5nbGUtZXhwcmVzc2lvbiB3aXRoIG5vIHN0cmluZ3MgdG9cbiAqIGludGVycG9sYXRlIGJldHdlZW4uXG4gKlxuICogT25seSBBdHRyaWJ1dGVQYXJ0IGFuZCBQcm9wZXJ0eVBhcnQgY2FuIGhhdmUgbXVsdGlwbGUgZXhwcmVzc2lvbnMuXG4gKiBNdWx0aS1leHByZXNzaW9uIHBhcnRzIGhhdmUgYSBgc3RyaW5nc2AgcHJvcGVydHkgYW5kIHNpbmdsZS1leHByZXNzaW9uXG4gKiBwYXJ0cyBkbyBub3QuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NpbmdsZUV4cHJlc3Npb24gPSAocGFydDogUGFydEluZm8pID0+XG4gIChwYXJ0IGFzIEF0dHJpYnV0ZVBhcnRJbmZvKS5zdHJpbmdzID09PSB1bmRlZmluZWQ7XG5cbmNvbnN0IGNyZWF0ZU1hcmtlciA9ICgpID0+IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJycpO1xuXG4vKipcbiAqIEluc2VydHMgYSBDaGlsZFBhcnQgaW50byB0aGUgZ2l2ZW4gY29udGFpbmVyIENoaWxkUGFydCdzIERPTSwgZWl0aGVyIGF0IHRoZVxuICogZW5kIG9mIHRoZSBjb250YWluZXIgQ2hpbGRQYXJ0LCBvciBiZWZvcmUgdGhlIG9wdGlvbmFsIGByZWZQYXJ0YC5cbiAqXG4gKiBUaGlzIGRvZXMgbm90IGFkZCB0aGUgcGFydCB0byB0aGUgY29udGFpbmVyUGFydCdzIGNvbW1pdHRlZCB2YWx1ZS4gVGhhdCBtdXN0XG4gKiBiZSBkb25lIGJ5IGNhbGxlcnMuXG4gKlxuICogQHBhcmFtIGNvbnRhaW5lclBhcnQgUGFydCB3aXRoaW4gd2hpY2ggdG8gYWRkIHRoZSBuZXcgQ2hpbGRQYXJ0XG4gKiBAcGFyYW0gcmVmUGFydCBQYXJ0IGJlZm9yZSB3aGljaCB0byBhZGQgdGhlIG5ldyBDaGlsZFBhcnQ7IHdoZW4gb21pdHRlZCB0aGVcbiAqICAgICBwYXJ0IGFkZGVkIHRvIHRoZSBlbmQgb2YgdGhlIGBjb250YWluZXJQYXJ0YFxuICogQHBhcmFtIHBhcnQgUGFydCB0byBpbnNlcnQsIG9yIHVuZGVmaW5lZCB0byBjcmVhdGUgYSBuZXcgcGFydFxuICovXG5leHBvcnQgY29uc3QgaW5zZXJ0UGFydCA9IChcbiAgY29udGFpbmVyUGFydDogQ2hpbGRQYXJ0LFxuICByZWZQYXJ0PzogQ2hpbGRQYXJ0LFxuICBwYXJ0PzogQ2hpbGRQYXJ0XG4pOiBDaGlsZFBhcnQgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSB3cmFwKGNvbnRhaW5lclBhcnQuXyRzdGFydE5vZGUpLnBhcmVudE5vZGUhO1xuXG4gIGNvbnN0IHJlZk5vZGUgPVxuICAgIHJlZlBhcnQgPT09IHVuZGVmaW5lZCA/IGNvbnRhaW5lclBhcnQuXyRlbmROb2RlIDogcmVmUGFydC5fJHN0YXJ0Tm9kZTtcblxuICBpZiAocGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3Qgc3RhcnROb2RlID0gd3JhcChjb250YWluZXIpLmluc2VydEJlZm9yZShjcmVhdGVNYXJrZXIoKSwgcmVmTm9kZSk7XG4gICAgY29uc3QgZW5kTm9kZSA9IHdyYXAoY29udGFpbmVyKS5pbnNlcnRCZWZvcmUoY3JlYXRlTWFya2VyKCksIHJlZk5vZGUpO1xuICAgIHBhcnQgPSBuZXcgQ2hpbGRQYXJ0KFxuICAgICAgc3RhcnROb2RlLFxuICAgICAgZW5kTm9kZSxcbiAgICAgIGNvbnRhaW5lclBhcnQsXG4gICAgICBjb250YWluZXJQYXJ0Lm9wdGlvbnNcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGVuZE5vZGUgPSB3cmFwKHBhcnQuXyRlbmROb2RlISkubmV4dFNpYmxpbmc7XG4gICAgY29uc3Qgb2xkUGFyZW50ID0gcGFydC5fJHBhcmVudDtcbiAgICBjb25zdCBwYXJlbnRDaGFuZ2VkID0gb2xkUGFyZW50ICE9PSBjb250YWluZXJQYXJ0O1xuICAgIGlmIChwYXJlbnRDaGFuZ2VkKSB7XG4gICAgICBwYXJ0Ll8kcmVwYXJlbnREaXNjb25uZWN0YWJsZXM/Lihjb250YWluZXJQYXJ0KTtcbiAgICAgIC8vIE5vdGUgdGhhdCBhbHRob3VnaCBgXyRyZXBhcmVudERpc2Nvbm5lY3RhYmxlc2AgdXBkYXRlcyB0aGUgcGFydCdzXG4gICAgICAvLyBgXyRwYXJlbnRgIHJlZmVyZW5jZSBhZnRlciB1bmxpbmtpbmcgZnJvbSBpdHMgY3VycmVudCBwYXJlbnQsIHRoYXRcbiAgICAgIC8vIG1ldGhvZCBvbmx5IGV4aXN0cyBpZiBEaXNjb25uZWN0YWJsZXMgYXJlIHByZXNlbnQsIHNvIHdlIG5lZWQgdG9cbiAgICAgIC8vIHVuY29uZGl0aW9uYWxseSBzZXQgaXQgaGVyZVxuICAgICAgcGFydC5fJHBhcmVudCA9IGNvbnRhaW5lclBhcnQ7XG4gICAgICAvLyBTaW5jZSB0aGUgXyRpc0Nvbm5lY3RlZCBnZXR0ZXIgaXMgc29tZXdoYXQgY29zdGx5LCBvbmx5XG4gICAgICAvLyByZWFkIGl0IG9uY2Ugd2Uga25vdyB0aGUgc3VidHJlZSBoYXMgZGlyZWN0aXZlcyB0aGF0IG5lZWRcbiAgICAgIC8vIHRvIGJlIG5vdGlmaWVkXG4gICAgICBsZXQgbmV3Q29ubmVjdGlvblN0YXRlO1xuICAgICAgaWYgKFxuICAgICAgICBwYXJ0Ll8kbm90aWZ5Q29ubmVjdGlvbkNoYW5nZWQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAobmV3Q29ubmVjdGlvblN0YXRlID0gY29udGFpbmVyUGFydC5fJGlzQ29ubmVjdGVkKSAhPT1cbiAgICAgICAgICBvbGRQYXJlbnQhLl8kaXNDb25uZWN0ZWRcbiAgICAgICkge1xuICAgICAgICBwYXJ0Ll8kbm90aWZ5Q29ubmVjdGlvbkNoYW5nZWQobmV3Q29ubmVjdGlvblN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuZE5vZGUgIT09IHJlZk5vZGUgfHwgcGFyZW50Q2hhbmdlZCkge1xuICAgICAgbGV0IHN0YXJ0OiBOb2RlIHwgbnVsbCA9IHBhcnQuXyRzdGFydE5vZGU7XG4gICAgICB3aGlsZSAoc3RhcnQgIT09IGVuZE5vZGUpIHtcbiAgICAgICAgY29uc3QgbjogTm9kZSB8IG51bGwgPSB3cmFwKHN0YXJ0ISkubmV4dFNpYmxpbmc7XG4gICAgICAgIHdyYXAoY29udGFpbmVyKS5pbnNlcnRCZWZvcmUoc3RhcnQhLCByZWZOb2RlKTtcbiAgICAgICAgc3RhcnQgPSBuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0O1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSB2YWx1ZSBvZiBhIFBhcnQuXG4gKlxuICogTm90ZSB0aGF0IHRoaXMgc2hvdWxkIG9ubHkgYmUgdXNlZCB0byBzZXQvdXBkYXRlIHRoZSB2YWx1ZSBvZiB1c2VyLWNyZWF0ZWRcbiAqIHBhcnRzIChpLmUuIHRob3NlIGNyZWF0ZWQgdXNpbmcgYGluc2VydFBhcnRgKTsgaXQgc2hvdWxkIG5vdCBiZSB1c2VkXG4gKiBieSBkaXJlY3RpdmVzIHRvIHNldCB0aGUgdmFsdWUgb2YgdGhlIGRpcmVjdGl2ZSdzIGNvbnRhaW5lciBwYXJ0LiBEaXJlY3RpdmVzXG4gKiBzaG91bGQgcmV0dXJuIGEgdmFsdWUgZnJvbSBgdXBkYXRlYC9gcmVuZGVyYCB0byB1cGRhdGUgdGhlaXIgcGFydCBzdGF0ZS5cbiAqXG4gKiBGb3IgZGlyZWN0aXZlcyB0aGF0IHJlcXVpcmUgc2V0dGluZyB0aGVpciBwYXJ0IHZhbHVlIGFzeW5jaHJvbm91c2x5LCB0aGV5XG4gKiBzaG91bGQgZXh0ZW5kIGBBc3luY0RpcmVjdGl2ZWAgYW5kIGNhbGwgYHRoaXMuc2V0VmFsdWUoKWAuXG4gKlxuICogQHBhcmFtIHBhcnQgUGFydCB0byBzZXRcbiAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSB0byBzZXRcbiAqIEBwYXJhbSBpbmRleCBGb3IgYEF0dHJpYnV0ZVBhcnRgcywgdGhlIGluZGV4IHRvIHNldFxuICogQHBhcmFtIGRpcmVjdGl2ZVBhcmVudCBVc2VkIGludGVybmFsbHk7IHNob3VsZCBub3QgYmUgc2V0IGJ5IHVzZXJcbiAqL1xuZXhwb3J0IGNvbnN0IHNldENoaWxkUGFydFZhbHVlID0gPFQgZXh0ZW5kcyBDaGlsZFBhcnQ+KFxuICBwYXJ0OiBULFxuICB2YWx1ZTogdW5rbm93bixcbiAgZGlyZWN0aXZlUGFyZW50OiBEaXJlY3RpdmVQYXJlbnQgPSBwYXJ0XG4pOiBUID0+IHtcbiAgcGFydC5fJHNldFZhbHVlKHZhbHVlLCBkaXJlY3RpdmVQYXJlbnQpO1xuICByZXR1cm4gcGFydDtcbn07XG5cbi8vIEEgc2VudGluZWwgdmFsdWUgdGhhdCBjYW4gbmV2ZXIgYXBwZWFyIGFzIGEgcGFydCB2YWx1ZSBleGNlcHQgd2hlbiBzZXQgYnlcbi8vIGxpdmUoKS4gVXNlZCB0byBmb3JjZSBhIGRpcnR5LWNoZWNrIHRvIGZhaWwgYW5kIGNhdXNlIGEgcmUtcmVuZGVyLlxuY29uc3QgUkVTRVRfVkFMVUUgPSB7fTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjb21taXR0ZWQgdmFsdWUgb2YgYSBDaGlsZFBhcnQgZGlyZWN0bHkgd2l0aG91dCB0cmlnZ2VyaW5nIHRoZVxuICogY29tbWl0IHN0YWdlIG9mIHRoZSBwYXJ0LlxuICpcbiAqIFRoaXMgaXMgdXNlZnVsIGluIGNhc2VzIHdoZXJlIGEgZGlyZWN0aXZlIG5lZWRzIHRvIHVwZGF0ZSB0aGUgcGFydCBzdWNoXG4gKiB0aGF0IHRoZSBuZXh0IHVwZGF0ZSBkZXRlY3RzIGEgdmFsdWUgY2hhbmdlIG9yIG5vdC4gV2hlbiB2YWx1ZSBpcyBvbWl0dGVkLFxuICogdGhlIG5leHQgdXBkYXRlIHdpbGwgYmUgZ3VhcmFudGVlZCB0byBiZSBkZXRlY3RlZCBhcyBhIGNoYW5nZS5cbiAqXG4gKiBAcGFyYW0gcGFydFxuICogQHBhcmFtIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRDb21taXR0ZWRWYWx1ZSA9IChwYXJ0OiBQYXJ0LCB2YWx1ZTogdW5rbm93biA9IFJFU0VUX1ZBTFVFKSA9PlxuICAocGFydC5fJGNvbW1pdHRlZFZhbHVlID0gdmFsdWUpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGNvbW1pdHRlZCB2YWx1ZSBvZiBhIENoaWxkUGFydC5cbiAqXG4gKiBUaGUgY29tbWl0dGVkIHZhbHVlIGlzIHVzZWQgZm9yIGNoYW5nZSBkZXRlY3Rpb24gYW5kIGVmZmljaWVudCB1cGRhdGVzIG9mXG4gKiB0aGUgcGFydC4gSXQgY2FuIGRpZmZlciBmcm9tIHRoZSB2YWx1ZSBzZXQgYnkgdGhlIHRlbXBsYXRlIG9yIGRpcmVjdGl2ZSBpblxuICogY2FzZXMgd2hlcmUgdGhlIHRlbXBsYXRlIHZhbHVlIGlzIHRyYW5zZm9ybWVkIGJlZm9yZSBiZWluZyBjb21taXR0ZWQuXG4gKlxuICogLSBgVGVtcGxhdGVSZXN1bHRgcyBhcmUgY29tbWl0dGVkIGFzIGEgYFRlbXBsYXRlSW5zdGFuY2VgXG4gKiAtIEl0ZXJhYmxlcyBhcmUgY29tbWl0dGVkIGFzIGBBcnJheTxDaGlsZFBhcnQ+YFxuICogLSBBbGwgb3RoZXIgdHlwZXMgYXJlIGNvbW1pdHRlZCBhcyB0aGUgdGVtcGxhdGUgdmFsdWUgb3IgdmFsdWUgcmV0dXJuZWQgb3JcbiAqICAgc2V0IGJ5IGEgZGlyZWN0aXZlLlxuICpcbiAqIEBwYXJhbSBwYXJ0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDb21taXR0ZWRWYWx1ZSA9IChwYXJ0OiBDaGlsZFBhcnQpID0+IHBhcnQuXyRjb21taXR0ZWRWYWx1ZTtcblxuLyoqXG4gKiBSZW1vdmVzIGEgQ2hpbGRQYXJ0IGZyb20gdGhlIERPTSwgaW5jbHVkaW5nIGFueSBvZiBpdHMgY29udGVudCBhbmQgbWFya2Vycy5cbiAqXG4gKiBOb3RlOiBUaGUgb25seSBkaWZmZXJlbmNlIGJldHdlZW4gdGhpcyBhbmQgY2xlYXJQYXJ0KCkgaXMgdGhhdCB0aGlzIGFsc29cbiAqIHJlbW92ZXMgdGhlIHBhcnQncyBzdGFydCBub2RlLiBUaGlzIG1lYW5zIHRoYXQgdGhlIENoaWxkUGFydCBtdXN0IG93biBpdHNcbiAqIHN0YXJ0IG5vZGUsIGllIGl0IG11c3QgYmUgYSBtYXJrZXIgbm9kZSBzcGVjaWZpY2FsbHkgZm9yIHRoaXMgcGFydCBhbmQgbm90IGFuXG4gKiBhbmNob3IgZnJvbSBzdXJyb3VuZGluZyBjb250ZW50LlxuICpcbiAqIEBwYXJhbSBwYXJ0IFRoZSBQYXJ0IHRvIHJlbW92ZVxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlUGFydCA9IChwYXJ0OiBDaGlsZFBhcnQpID0+IHtcbiAgcGFydC5fJGNsZWFyKCk7XG4gIHBhcnQuXyRzdGFydE5vZGUucmVtb3ZlKCk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJQYXJ0ID0gKHBhcnQ6IENoaWxkUGFydCkgPT4ge1xuICBwYXJ0Ll8kY2xlYXIoKTtcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuaW1wb3J0IHtcbiAgV2FFcnJvckV2ZW50XG59IGZyb20gXCIuL2NodW5rLllEUUNTMkhLLmpzXCI7XG5pbXBvcnQge1xuICBXYUxvYWRFdmVudFxufSBmcm9tIFwiLi9jaHVuay5XRElJR1VOUC5qc1wiO1xuaW1wb3J0IHtcbiAgaWNvbl9zdHlsZXNfZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay5ENUkyRFdNTC5qc1wiO1xuaW1wb3J0IHtcbiAgd2F0Y2hcbn0gZnJvbSBcIi4vY2h1bmsuUFpBTjZGUE4uanNcIjtcbmltcG9ydCB7XG4gIGdldERlZmF1bHRJY29uRmFtaWx5LFxuICBnZXRJY29uTGlicmFyeSxcbiAgdW53YXRjaEljb24sXG4gIHdhdGNoSWNvblxufSBmcm9tIFwiLi9jaHVuay5GU1JYWUdTVy5qc1wiO1xuaW1wb3J0IHtcbiAgV2ViQXdlc29tZUVsZW1lbnRcbn0gZnJvbSBcIi4vY2h1bmsuRVBISFdYSzIuanNcIjtcbmltcG9ydCB7XG4gIF9fZGVjb3JhdGVDbGFzc1xufSBmcm9tIFwiLi9jaHVuay43VkdDSUhERy5qc1wiO1xuXG4vLyBzcmMvY29tcG9uZW50cy9pY29uL2ljb24udHNcbmltcG9ydCB7IGh0bWwgfSBmcm9tIFwibGl0XCI7XG5pbXBvcnQgeyBjdXN0b21FbGVtZW50LCBwcm9wZXJ0eSwgc3RhdGUgfSBmcm9tIFwibGl0L2RlY29yYXRvcnMuanNcIjtcbmltcG9ydCB7IGlzVGVtcGxhdGVSZXN1bHQgfSBmcm9tIFwibGl0L2RpcmVjdGl2ZS1oZWxwZXJzLmpzXCI7XG52YXIgQ0FDSEVBQkxFX0VSUk9SID0gU3ltYm9sKCk7XG52YXIgUkVUUllBQkxFX0VSUk9SID0gU3ltYm9sKCk7XG52YXIgcGFyc2VyO1xudmFyIGljb25DYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG52YXIgV2FJY29uID0gY2xhc3MgZXh0ZW5kcyBXZWJBd2Vzb21lRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy5zdmcgPSBudWxsO1xuICAgIHRoaXMuYXV0b1dpZHRoID0gZmFsc2U7XG4gICAgdGhpcy5zd2FwT3BhY2l0eSA9IGZhbHNlO1xuICAgIHRoaXMubGFiZWwgPSBcIlwiO1xuICAgIHRoaXMubGlicmFyeSA9IFwiZGVmYXVsdFwiO1xuICAgIHRoaXMucm90YXRlID0gMDtcbiAgICAvKiogR2l2ZW4gYSBVUkwsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVzdWx0aW5nIFNWRyBlbGVtZW50IG9yIGFuIGFwcHJvcHJpYXRlIGVycm9yIHN5bWJvbC4gKi9cbiAgICB0aGlzLnJlc29sdmVJY29uID0gYXN5bmMgKHVybCwgbGlicmFyeSkgPT4ge1xuICAgICAgbGV0IGZpbGVEYXRhO1xuICAgICAgaWYgKGxpYnJhcnk/LnNwcml0ZVNoZWV0KSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVDb21wbGV0ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN2ZyA9IGh0bWxgPHN2ZyBwYXJ0PVwic3ZnXCI+XG4gICAgICAgIDx1c2UgcGFydD1cInVzZVwiIGhyZWY9XCIke3VybH1cIj48L3VzZT5cbiAgICAgIDwvc3ZnPmA7XG4gICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQ29tcGxldGU7XG4gICAgICAgIGNvbnN0IHN2ZyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiW3BhcnQ9J3N2ZyddXCIpO1xuICAgICAgICBpZiAodHlwZW9mIGxpYnJhcnkubXV0YXRvciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgbGlicmFyeS5tdXRhdG9yKHN2ZywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgZmlsZURhdGEgPSBhd2FpdCBmZXRjaCh1cmwsIHsgbW9kZTogXCJjb3JzXCIgfSk7XG4gICAgICAgIGlmICghZmlsZURhdGEub2spIHJldHVybiBmaWxlRGF0YS5zdGF0dXMgPT09IDQxMCA/IENBQ0hFQUJMRV9FUlJPUiA6IFJFVFJZQUJMRV9FUlJPUjtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gUkVUUllBQkxFX0VSUk9SO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9IGF3YWl0IGZpbGVEYXRhLnRleHQoKTtcbiAgICAgICAgY29uc3Qgc3ZnID0gZGl2LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICBpZiAoc3ZnPy50YWdOYW1lPy50b0xvd2VyQ2FzZSgpICE9PSBcInN2Z1wiKSByZXR1cm4gQ0FDSEVBQkxFX0VSUk9SO1xuICAgICAgICBpZiAoIXBhcnNlcikgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICBjb25zdCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHN2Zy5vdXRlckhUTUwsIFwidGV4dC9odG1sXCIpO1xuICAgICAgICBjb25zdCBzdmdFbCA9IGRvYy5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCJzdmdcIik7XG4gICAgICAgIGlmICghc3ZnRWwpIHJldHVybiBDQUNIRUFCTEVfRVJST1I7XG4gICAgICAgIHN2Z0VsLnBhcnQuYWRkKFwic3ZnXCIpO1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuYWRvcHROb2RlKHN2Z0VsKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICByZXR1cm4gQ0FDSEVBQkxFX0VSUk9SO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB3YXRjaEljb24odGhpcyk7XG4gIH1cbiAgZmlyc3RVcGRhdGVkKGNoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgc3VwZXIuZmlyc3RVcGRhdGVkKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoXCJyb3RhdGVcIikpIHtcbiAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoXCItLXJvdGF0ZS1hbmdsZVwiLCBgJHt0aGlzLnJvdGF0ZX1kZWdgKTtcbiAgICB9XG4gICAgdGhpcy5zZXRJY29uKCk7XG4gIH1cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB1bndhdGNoSWNvbih0aGlzKTtcbiAgfVxuICBnZXRJY29uU291cmNlKCkge1xuICAgIGNvbnN0IGxpYnJhcnkgPSBnZXRJY29uTGlicmFyeSh0aGlzLmxpYnJhcnkpO1xuICAgIGNvbnN0IGZhbWlseSA9IHRoaXMuZmFtaWx5IHx8IGdldERlZmF1bHRJY29uRmFtaWx5KCk7XG4gICAgaWYgKHRoaXMubmFtZSAmJiBsaWJyYXJ5KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1cmw6IGxpYnJhcnkucmVzb2x2ZXIodGhpcy5uYW1lLCBmYW1pbHksIHRoaXMudmFyaWFudCwgdGhpcy5hdXRvV2lkdGgpLFxuICAgICAgICBmcm9tTGlicmFyeTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHVybDogdGhpcy5zcmMsXG4gICAgICBmcm9tTGlicmFyeTogZmFsc2VcbiAgICB9O1xuICB9XG4gIGhhbmRsZUxhYmVsQ2hhbmdlKCkge1xuICAgIGNvbnN0IGhhc0xhYmVsID0gdHlwZW9mIHRoaXMubGFiZWwgPT09IFwic3RyaW5nXCIgJiYgdGhpcy5sYWJlbC5sZW5ndGggPiAwO1xuICAgIGlmIChoYXNMYWJlbCkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiaW1nXCIpO1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHRoaXMubGFiZWwpO1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoXCJyb2xlXCIpO1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIpO1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gICAgfVxuICB9XG4gIGFzeW5jIHNldEljb24oKSB7XG4gICAgY29uc3QgeyB1cmwsIGZyb21MaWJyYXJ5IH0gPSB0aGlzLmdldEljb25Tb3VyY2UoKTtcbiAgICBjb25zdCBsaWJyYXJ5ID0gZnJvbUxpYnJhcnkgPyBnZXRJY29uTGlicmFyeSh0aGlzLmxpYnJhcnkpIDogdm9pZCAwO1xuICAgIGlmICghdXJsKSB7XG4gICAgICB0aGlzLnN2ZyA9IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBpY29uUmVzb2x2ZXIgPSBpY29uQ2FjaGUuZ2V0KHVybCk7XG4gICAgaWYgKCFpY29uUmVzb2x2ZXIpIHtcbiAgICAgIGljb25SZXNvbHZlciA9IHRoaXMucmVzb2x2ZUljb24odXJsLCBsaWJyYXJ5KTtcbiAgICAgIGljb25DYWNoZS5zZXQodXJsLCBpY29uUmVzb2x2ZXIpO1xuICAgIH1cbiAgICBjb25zdCBzdmcgPSBhd2FpdCBpY29uUmVzb2x2ZXI7XG4gICAgaWYgKHN2ZyA9PT0gUkVUUllBQkxFX0VSUk9SKSB7XG4gICAgICBpY29uQ2FjaGUuZGVsZXRlKHVybCk7XG4gICAgfVxuICAgIGlmICh1cmwgIT09IHRoaXMuZ2V0SWNvblNvdXJjZSgpLnVybCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNUZW1wbGF0ZVJlc3VsdChzdmcpKSB7XG4gICAgICB0aGlzLnN2ZyA9IHN2ZztcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpdGNoIChzdmcpIHtcbiAgICAgIGNhc2UgUkVUUllBQkxFX0VSUk9SOlxuICAgICAgY2FzZSBDQUNIRUFCTEVfRVJST1I6XG4gICAgICAgIHRoaXMuc3ZnID0gbnVsbDtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBXYUVycm9yRXZlbnQoKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5zdmcgPSBzdmcuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBsaWJyYXJ5Py5tdXRhdG9yPy4odGhpcy5zdmcsIHRoaXMpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFdhTG9hZEV2ZW50KCkpO1xuICAgIH1cbiAgfVxuICB1cGRhdGVkKGNoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgc3VwZXIudXBkYXRlZChjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgY29uc3QgbGlicmFyeSA9IGdldEljb25MaWJyYXJ5KHRoaXMubGlicmFyeSk7XG4gICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKFwicm90YXRlXCIpKSB7XG4gICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KFwiLS1yb3RhdGUtYW5nbGVcIiwgYCR7dGhpcy5yb3RhdGV9ZGVnYCk7XG4gICAgfVxuICAgIGNvbnN0IHN2ZyA9IHRoaXMuc2hhZG93Um9vdD8ucXVlcnlTZWxlY3RvcihcInN2Z1wiKTtcbiAgICBpZiAoc3ZnKSB7XG4gICAgICBsaWJyYXJ5Py5tdXRhdG9yPy4oc3ZnLCB0aGlzKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLmhhc1VwZGF0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnN2ZztcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxgPHN2ZyBwYXJ0PVwic3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCI+PC9zdmc+YDtcbiAgfVxufTtcbldhSWNvbi5jc3MgPSBpY29uX3N0eWxlc19kZWZhdWx0O1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgc3RhdGUoKVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJzdmdcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhSWNvbi5wcm90b3R5cGUsIFwibmFtZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJmYW1pbHlcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhSWNvbi5wcm90b3R5cGUsIFwidmFyaWFudFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcImF1dG8td2lkdGhcIiwgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJhdXRvV2lkdGhcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJzd2FwLW9wYWNpdHlcIiwgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJzd2FwT3BhY2l0eVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhSWNvbi5wcm90b3R5cGUsIFwic3JjXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJsYWJlbFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJsaWJyYXJ5XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBOdW1iZXIsIHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhSWNvbi5wcm90b3R5cGUsIFwicm90YXRlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcsIHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhSWNvbi5wcm90b3R5cGUsIFwiZmxpcFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogU3RyaW5nLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUljb24ucHJvdG90eXBlLCBcImFuaW1hdGlvblwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHdhdGNoKFwibGFiZWxcIilcbl0sIFdhSWNvbi5wcm90b3R5cGUsIFwiaGFuZGxlTGFiZWxDaGFuZ2VcIiwgMSk7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICB3YXRjaChbXCJmYW1pbHlcIiwgXCJuYW1lXCIsIFwibGlicmFyeVwiLCBcInZhcmlhbnRcIiwgXCJzcmNcIiwgXCJhdXRvV2lkdGhcIiwgXCJzd2FwT3BhY2l0eVwiXSwgeyB3YWl0VW50aWxGaXJzdFVwZGF0ZTogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJzZXRJY29uXCIsIDEpO1xuV2FJY29uID0gX19kZWNvcmF0ZUNsYXNzKFtcbiAgY3VzdG9tRWxlbWVudChcIndhLWljb25cIilcbl0sIFdhSWNvbik7XG5cbmV4cG9ydCB7XG4gIFdhSWNvblxufTtcbiIsICJpbXBvcnQgeyBMaXRFbGVtZW50LCBodG1sLCBjc3MgfSBmcm9tICdsaXQnO1xuaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgcHJvcGVydHkgfSBmcm9tICdsaXQvZGVjb3JhdG9ycy5qcyc7XG5cbmltcG9ydCAnQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbi5qcyc7XG5pbXBvcnQgJ0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jb21wb25lbnRzL2ljb24vaWNvbi5qcyc7XG5cbkBjdXN0b21FbGVtZW50KCd0aHJlYWRzLXBvcG92ZXInKVxuZXhwb3J0IGNsYXNzIFRocmVhZHNQb3BvdmVyIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIHN0YXRpYyBvdmVycmlkZSBzdHlsZXMgPSBjc3NgXG4gICAgOmhvc3Qge1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgei1pbmRleDogMTAwMDE7XG4gICAgfVxuICAgIC5wb3BvdmVyLWNvbnRlbnQge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYmcsIGhzbCgwIDAlIDEwMCUpKTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlciwgaHNsKDAgMCUgODkuOCUpKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cywgNnB4KTtcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDZweCAtMXB4IHJnYigwIDAgMCAvIDAuMSksIDAgMnB4IDRweCAtMnB4IHJnYigwIDAgMCAvIDAuMSk7XG4gICAgICBwYWRkaW5nOiA0cHg7XG4gICAgfVxuICAgIHdhLWJ1dHRvbjo6cGFydChiYXNlKSB7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcsIGhzbCgwIDAlIDklKSk7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgIH1cbiAgICB3YS1idXR0b246OnBhcnQoYmFzZSk6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYWNjZW50LCBoc2woMCAwJSA5Ni4xJSkpO1xuICAgIH1cbiAgYDtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pIGFjdGl2ZSA9IGZhbHNlO1xuICBAcHJvcGVydHkoeyB0eXBlOiBOdW1iZXIgfSkgeCA9IDA7XG4gIEBwcm9wZXJ0eSh7IHR5cGU6IE51bWJlciB9KSB5ID0gMDtcblxuICBwcml2YXRlIGFkZENvbW1lbnQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnYWRkLWNvbW1lbnQnLCB7XG4gICAgICBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSxcbiAgICB9KSk7XG4gIH1cblxuICBvdmVycmlkZSByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZSkgcmV0dXJuIGh0bWxgYDtcblxuICAgIHJldHVybiBodG1sYFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cInBvcG92ZXItY29udGVudFwiXG4gICAgICAgIHN0eWxlPVwicG9zaXRpb246Zml4ZWQ7IGxlZnQ6JHt0aGlzLnh9cHg7IHRvcDoke3RoaXMueSAtIDEwfXB4OyB0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsIC0xMDAlKTtcIlxuICAgICAgPlxuICAgICAgICA8d2EtYnV0dG9uIHNpemU9XCJzbWFsbFwiIGFwcGVhcmFuY2U9XCJwbGFpblwiIEBjbGljaz0ke3RoaXMuYWRkQ29tbWVudH0+XG4gICAgICAgICAgPHdhLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cImNvbW1lbnRcIiB2YXJpYW50PVwicmVndWxhclwiIGxhYmVsPVwiQWRkIGNvbW1lbnRcIj48L3dhLWljb24+XG4gICAgICAgICAgQWRkIGNvbW1lbnRcbiAgICAgICAgPC93YS1idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgc2hvdyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBoaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIH1cbn1cbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLnN0eWxlcy50c1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcImxpdFwiO1xudmFyIHRleHRhcmVhX3N0eWxlc19kZWZhdWx0ID0gY3NzYFxuICA6aG9zdCB7XG4gICAgYm9yZGVyLXdpZHRoOiAwO1xuICB9XG5cbiAgLnRleHRhcmVhIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGN1cnNvcjogaW5oZXJpdDtcbiAgICBmb250OiBpbmhlcml0O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1ib3JkZXItY29sb3IpO1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXdhLWZvcm0tY29udHJvbC1ib3JkZXItcmFkaXVzKTtcbiAgICBib3JkZXItc3R5bGU6IHZhcigtLXdhLWZvcm0tY29udHJvbC1ib3JkZXItc3R5bGUpO1xuICAgIGJvcmRlci13aWR0aDogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci13aWR0aCk7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuXG4gICAgJjpmb2N1cy13aXRoaW4ge1xuICAgICAgb3V0bGluZTogdmFyKC0td2EtZm9jdXMtcmluZyk7XG4gICAgICBvdXRsaW5lLW9mZnNldDogdmFyKC0td2EtZm9jdXMtcmluZy1vZmZzZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qIEFwcGVhcmFuY2UgbW9kaWZpZXJzICovXG4gIDpob3N0KFthcHBlYXJhbmNlPSdvdXRsaW5lZCddKSAudGV4dGFyZWEge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1ib3JkZXItY29sb3IpO1xuICB9XG5cbiAgOmhvc3QoW2FwcGVhcmFuY2U9J2ZpbGxlZCddKSAudGV4dGFyZWEge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1xdWlldCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtcXVpZXQpO1xuICB9XG5cbiAgOmhvc3QoW2FwcGVhcmFuY2U9J2ZpbGxlZC1vdXRsaW5lZCddKSAudGV4dGFyZWEge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1xdWlldCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLWNvbG9yKTtcbiAgfVxuXG4gIHRleHRhcmVhIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgZm9udDogaW5oZXJpdDtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICBwYWRkaW5nOiBjYWxjKHZhcigtLXdhLWZvcm0tY29udHJvbC1wYWRkaW5nLWJsb2NrKSAtICgoMWxoIC0gMWVtKSAvIDIpKSB2YXIoLS13YS1mb3JtLWNvbnRyb2wtcGFkZGluZy1pbmxpbmUpOyAvKiBhY2NvdW50cyBmb3IgdGhlIGxhcmdlciBsaW5lIGhlaWdodCBvZiB0ZXh0YXJlYSBjb250ZW50ICovXG4gICAgbWluLWhlaWdodDogY2FsYyh2YXIoLS13YS1mb3JtLWNvbnRyb2wtaGVpZ2h0KSAtIHZhcigtLWJvcmRlci13aWR0aCkgKiAyKTtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICAgIG1hcmdpbjogMDtcblxuICAgICY6OnBsYWNlaG9sZGVyIHtcbiAgICAgIGNvbG9yOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtcGxhY2Vob2xkZXItY29sb3IpO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIH1cblxuICAgICY6YXV0b2ZpbGwge1xuICAgICAgJixcbiAgICAgICY6aG92ZXIsXG4gICAgICAmOmZvY3VzLFxuICAgICAgJjphY3RpdmUge1xuICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICBjYXJldC1jb2xvcjogdmFyKC0td2EtZm9ybS1jb250cm9sLXZhbHVlLWNvbG9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmOmZvY3VzIHtcbiAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgfVxuICB9XG5cbiAgLyogU2hhcmVkIHRleHRhcmVhIGFuZCBzaXplLWFkanVzdGVyIHBvc2l0aW9uaW5nICovXG4gIC5jb250cm9sLFxuICAuc2l6ZS1hZGp1c3RlciB7XG4gICAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAyO1xuICB9XG5cbiAgLnNpemUtYWRqdXN0ZXIge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cblxuICB0ZXh0YXJlYTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbixcbiAgdGV4dGFyZWE6Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b24sXG4gIHRleHRhcmVhOjotd2Via2l0LXNlYXJjaC1yZXN1bHRzLWJ1dHRvbixcbiAgdGV4dGFyZWE6Oi13ZWJraXQtc2VhcmNoLXJlc3VsdHMtZGVjb3JhdGlvbiB7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICB9XG5cbiAgLypcbiAgICogUmVzaXplIHR5cGVzXG4gICAqL1xuXG4gIDpob3N0KFtyZXNpemU9J25vbmUnXSkgdGV4dGFyZWEge1xuICAgIHJlc2l6ZTogbm9uZTtcbiAgfVxuXG4gIHRleHRhcmVhLFxuICA6aG9zdChbcmVzaXplPSd2ZXJ0aWNhbCddKSB0ZXh0YXJlYSB7XG4gICAgcmVzaXplOiB2ZXJ0aWNhbDtcbiAgfVxuXG4gIDpob3N0KFtyZXNpemU9J2hvcml6b250YWwnXSkgdGV4dGFyZWEge1xuICAgIHJlc2l6ZTogaG9yaXpvbnRhbDtcbiAgfVxuXG4gIDpob3N0KFtyZXNpemU9J2JvdGgnXSkgdGV4dGFyZWEge1xuICAgIHJlc2l6ZTogYm90aDtcbiAgfVxuXG4gIDpob3N0KFtyZXNpemU9J2F1dG8nXSkgdGV4dGFyZWEge1xuICAgIGhlaWdodDogYXV0bztcbiAgICByZXNpemU6IG5vbmU7XG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xuICB9XG5gO1xuXG5leHBvcnQge1xuICB0ZXh0YXJlYV9zdHlsZXNfZGVmYXVsdFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9zdHlsZXMvY29tcG9uZW50L2Zvcm0tY29udHJvbC5zdHlsZXMudHNcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJsaXRcIjtcbnZhciBmb3JtX2NvbnRyb2xfc3R5bGVzX2RlZmF1bHQgPSBjc3NgXG4gIDpob3N0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cblxuICAvKiBUcmVhdCB3cmFwcGVkIGxhYmVscywgaW5wdXRzLCBhbmQgaGludHMgYXMgZGlyZWN0IGNoaWxkcmVuIG9mIHRoZSBob3N0IGVsZW1lbnQgKi9cbiAgW3BhcnR+PSdmb3JtLWNvbnRyb2wnXSB7XG4gICAgZGlzcGxheTogY29udGVudHM7XG4gIH1cblxuICAvKiBMYWJlbCAqL1xuICA6aXMoW3BhcnR+PSdmb3JtLWNvbnRyb2wtbGFiZWwnXSwgW3BhcnR+PSdsYWJlbCddKTpoYXMoKjpub3QoOmVtcHR5KSksXG4gIDppcyhbcGFydH49J2Zvcm0tY29udHJvbC1sYWJlbCddLCBbcGFydH49J2xhYmVsJ10pLmhhcy1sYWJlbCB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1sYWJlbC1jb2xvcik7XG4gICAgZm9udC13ZWlnaHQ6IHZhcigtLXdhLWZvcm0tY29udHJvbC1sYWJlbC1mb250LXdlaWdodCk7XG4gICAgbGluZS1oZWlnaHQ6IHZhcigtLXdhLWZvcm0tY29udHJvbC1sYWJlbC1saW5lLWhlaWdodCk7XG4gICAgbWFyZ2luLWJsb2NrLWVuZDogMC41ZW07XG4gIH1cblxuICA6aG9zdChbcmVxdWlyZWRdKSA6aXMoW3BhcnR+PSdmb3JtLWNvbnRyb2wtbGFiZWwnXSwgW3BhcnR+PSdsYWJlbCddKTo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IHZhcigtLXdhLWZvcm0tY29udHJvbC1yZXF1aXJlZC1jb250ZW50KTtcbiAgICBtYXJnaW4taW5saW5lLXN0YXJ0OiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtcmVxdWlyZWQtY29udGVudC1vZmZzZXQpO1xuICAgIGNvbG9yOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtcmVxdWlyZWQtY29udGVudC1jb2xvcik7XG4gIH1cblxuICAvKiBIZWxwIHRleHQgKi9cbiAgW3BhcnR+PSdoaW50J10ge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGNvbG9yOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtaGludC1jb2xvcik7XG4gICAgZm9udC13ZWlnaHQ6IHZhcigtLXdhLWZvcm0tY29udHJvbC1oaW50LWZvbnQtd2VpZ2h0KTtcbiAgICBsaW5lLWhlaWdodDogdmFyKC0td2EtZm9ybS1jb250cm9sLWhpbnQtbGluZS1oZWlnaHQpO1xuICAgIG1hcmdpbi1ibG9jay1zdGFydDogMC41ZW07XG4gICAgZm9udC1zaXplOiB2YXIoLS13YS1mb250LXNpemUtc21hbGxlcik7XG5cbiAgICAmOm5vdCguaGFzLXNsb3R0ZWQsIC5oYXMtaGludCkge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCB7XG4gIGZvcm1fY29udHJvbF9zdHlsZXNfZGVmYXVsdFxufTtcbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuaW1wb3J0IHtBdHRyaWJ1dGVQYXJ0LCBub0NoYW5nZSwgbm90aGluZ30gZnJvbSAnLi4vbGl0LWh0bWwuanMnO1xuaW1wb3J0IHtcbiAgZGlyZWN0aXZlLFxuICBEaXJlY3RpdmUsXG4gIERpcmVjdGl2ZVBhcmFtZXRlcnMsXG4gIERpcmVjdGl2ZVJlc3VsdCxcbiAgUGFydEluZm8sXG4gIFBhcnRUeXBlLFxufSBmcm9tICcuLi9kaXJlY3RpdmUuanMnO1xuaW1wb3J0IHtpc1NpbmdsZUV4cHJlc3Npb24sIHNldENvbW1pdHRlZFZhbHVlfSBmcm9tICcuLi9kaXJlY3RpdmUtaGVscGVycy5qcyc7XG5cbmNsYXNzIExpdmVEaXJlY3RpdmU8VD4gZXh0ZW5kcyBEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihwYXJ0SW5mbzogUGFydEluZm8pIHtcbiAgICBzdXBlcihwYXJ0SW5mbyk7XG4gICAgaWYgKFxuICAgICAgIShcbiAgICAgICAgcGFydEluZm8udHlwZSA9PT0gUGFydFR5cGUuUFJPUEVSVFkgfHxcbiAgICAgICAgcGFydEluZm8udHlwZSA9PT0gUGFydFR5cGUuQVRUUklCVVRFIHx8XG4gICAgICAgIHBhcnRJbmZvLnR5cGUgPT09IFBhcnRUeXBlLkJPT0xFQU5fQVRUUklCVVRFXG4gICAgICApXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdUaGUgYGxpdmVgIGRpcmVjdGl2ZSBpcyBub3QgYWxsb3dlZCBvbiBjaGlsZCBvciBldmVudCBiaW5kaW5ncydcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghaXNTaW5nbGVFeHByZXNzaW9uKHBhcnRJbmZvKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgbGl2ZWAgYmluZGluZ3MgY2FuIG9ubHkgY29udGFpbiBhIHNpbmdsZSBleHByZXNzaW9uJyk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKHZhbHVlOiBUKTogVCB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgb3ZlcnJpZGUgdXBkYXRlKHBhcnQ6IEF0dHJpYnV0ZVBhcnQsIFt2YWx1ZV06IERpcmVjdGl2ZVBhcmFtZXRlcnM8dGhpcz4pIHtcbiAgICBpZiAodmFsdWUgPT09IG5vQ2hhbmdlIHx8IHZhbHVlID09PSBub3RoaW5nKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IGVsZW1lbnQgPSBwYXJ0LmVsZW1lbnQ7XG4gICAgY29uc3QgbmFtZSA9IHBhcnQubmFtZTtcblxuICAgIGlmIChwYXJ0LnR5cGUgPT09IFBhcnRUeXBlLlBST1BFUlRZKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgaWYgKHZhbHVlID09PSAoZWxlbWVudCBhcyBhbnkpW25hbWVdKSB7XG4gICAgICAgIHJldHVybiBub0NoYW5nZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBhcnQudHlwZSA9PT0gUGFydFR5cGUuQk9PTEVBTl9BVFRSSUJVVEUpIHtcbiAgICAgIGlmICghIXZhbHVlID09PSBlbGVtZW50Lmhhc0F0dHJpYnV0ZShuYW1lKSkge1xuICAgICAgICByZXR1cm4gbm9DaGFuZ2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwYXJ0LnR5cGUgPT09IFBhcnRUeXBlLkFUVFJJQlVURSkge1xuICAgICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpID09PSBTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBub0NoYW5nZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVzZXRzIHRoZSBwYXJ0J3MgdmFsdWUsIGNhdXNpbmcgaXRzIGRpcnR5LWNoZWNrIHRvIGZhaWwgc28gdGhhdCBpdFxuICAgIC8vIGFsd2F5cyBzZXRzIHRoZSB2YWx1ZS5cbiAgICBzZXRDb21taXR0ZWRWYWx1ZShwYXJ0KTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cblxuaW50ZXJmYWNlIExpdmUge1xuICA8VD4odmFsdWU6IFQpOiBEaXJlY3RpdmVSZXN1bHQ8dHlwZW9mIExpdmVEaXJlY3RpdmU8VD4+O1xufVxuXG4vKipcbiAqIENoZWNrcyBiaW5kaW5nIHZhbHVlcyBhZ2FpbnN0IGxpdmUgRE9NIHZhbHVlcywgaW5zdGVhZCBvZiBwcmV2aW91c2x5IGJvdW5kXG4gKiB2YWx1ZXMsIHdoZW4gZGV0ZXJtaW5pbmcgd2hldGhlciB0byB1cGRhdGUgdGhlIHZhbHVlLlxuICpcbiAqIFRoaXMgaXMgdXNlZnVsIGZvciBjYXNlcyB3aGVyZSB0aGUgRE9NIHZhbHVlIG1heSBjaGFuZ2UgZnJvbSBvdXRzaWRlIG9mXG4gKiBsaXQtaHRtbCwgc3VjaCBhcyB3aXRoIGEgYmluZGluZyB0byBhbiBgPGlucHV0PmAgZWxlbWVudCdzIGB2YWx1ZWAgcHJvcGVydHksXG4gKiBhIGNvbnRlbnQgZWRpdGFibGUgZWxlbWVudHMgdGV4dCwgb3IgdG8gYSBjdXN0b20gZWxlbWVudCB0aGF0IGNoYW5nZXMgaXQnc1xuICogb3duIHByb3BlcnRpZXMgb3IgYXR0cmlidXRlcy5cbiAqXG4gKiBJbiB0aGVzZSBjYXNlcyBpZiB0aGUgRE9NIHZhbHVlIGNoYW5nZXMsIGJ1dCB0aGUgdmFsdWUgc2V0IHRocm91Z2ggbGl0LWh0bWxcbiAqIGJpbmRpbmdzIGhhc24ndCwgbGl0LWh0bWwgd29uJ3Qga25vdyB0byB1cGRhdGUgdGhlIERPTSB2YWx1ZSBhbmQgd2lsbCBsZWF2ZVxuICogaXQgYWxvbmUuIElmIHRoaXMgaXMgbm90IHdoYXQgeW91IHdhbnQtLWlmIHlvdSB3YW50IHRvIG92ZXJ3cml0ZSB0aGUgRE9NXG4gKiB2YWx1ZSB3aXRoIHRoZSBib3VuZCB2YWx1ZSBubyBtYXR0ZXIgd2hhdC0tdXNlIHRoZSBgbGl2ZSgpYCBkaXJlY3RpdmU6XG4gKlxuICogYGBganNcbiAqIGh0bWxgPGlucHV0IC52YWx1ZT0ke2xpdmUoeCl9PmBcbiAqIGBgYFxuICpcbiAqIGBsaXZlKClgIHBlcmZvcm1zIGEgc3RyaWN0IGVxdWFsaXR5IGNoZWNrIGFnYWluc3QgdGhlIGxpdmUgRE9NIHZhbHVlLCBhbmQgaWZcbiAqIHRoZSBuZXcgdmFsdWUgaXMgZXF1YWwgdG8gdGhlIGxpdmUgdmFsdWUsIGRvZXMgbm90aGluZy4gVGhpcyBtZWFucyB0aGF0XG4gKiBgbGl2ZSgpYCBzaG91bGQgbm90IGJlIHVzZWQgd2hlbiB0aGUgYmluZGluZyB3aWxsIGNhdXNlIGEgdHlwZSBjb252ZXJzaW9uLiBJZlxuICogeW91IHVzZSBgbGl2ZSgpYCB3aXRoIGFuIGF0dHJpYnV0ZSBiaW5kaW5nLCBtYWtlIHN1cmUgdGhhdCBvbmx5IHN0cmluZ3MgYXJlXG4gKiBwYXNzZWQgaW4sIG9yIHRoZSBiaW5kaW5nIHdpbGwgdXBkYXRlIGV2ZXJ5IHJlbmRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IGxpdmU6IExpdmUgPSBkaXJlY3RpdmUoTGl2ZURpcmVjdGl2ZSk7XG5cbi8qKlxuICogVGhlIHR5cGUgb2YgdGhlIGNsYXNzIHRoYXQgcG93ZXJzIHRoaXMgZGlyZWN0aXZlLiBOZWNlc3NhcnkgZm9yIG5hbWluZyB0aGVcbiAqIGRpcmVjdGl2ZSdzIHJldHVybiB0eXBlLlxuICovXG5leHBvcnQgdHlwZSB7TGl2ZURpcmVjdGl2ZX07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuaW1wb3J0IHtcbiAgdGV4dGFyZWFfc3R5bGVzX2RlZmF1bHRcbn0gZnJvbSBcIi4vY2h1bmsuR1dXR1A3WkwuanNcIjtcbmltcG9ydCB7XG4gIGZvcm1fY29udHJvbF9zdHlsZXNfZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay41TFhYWEVMRS5qc1wiO1xuaW1wb3J0IHtcbiAgTWlycm9yVmFsaWRhdG9yXG59IGZyb20gXCIuL2NodW5rLlI3UVg0TTZSLmpzXCI7XG5pbXBvcnQge1xuICBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50XG59IGZyb20gXCIuL2NodW5rLklQV1BSSUhaLmpzXCI7XG5pbXBvcnQge1xuICBIYXNTbG90Q29udHJvbGxlclxufSBmcm9tIFwiLi9jaHVuay5LSUhCM1ZNQi5qc1wiO1xuaW1wb3J0IHtcbiAgc2l6ZV9zdHlsZXNfZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay42SjZRWUZIVi5qc1wiO1xuaW1wb3J0IHtcbiAgd2F0Y2hcbn0gZnJvbSBcIi4vY2h1bmsuUFpBTjZGUE4uanNcIjtcbmltcG9ydCB7XG4gIF9fZGVjb3JhdGVDbGFzc1xufSBmcm9tIFwiLi9jaHVuay43VkdDSUhERy5qc1wiO1xuXG4vLyBzcmMvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS50c1xuaW1wb3J0IHsgaHRtbCB9IGZyb20gXCJsaXRcIjtcbmltcG9ydCB7IGN1c3RvbUVsZW1lbnQsIHByb3BlcnR5LCBxdWVyeSwgc3RhdGUgfSBmcm9tIFwibGl0L2RlY29yYXRvcnMuanNcIjtcbmltcG9ydCB7IGNsYXNzTWFwIH0gZnJvbSBcImxpdC9kaXJlY3RpdmVzL2NsYXNzLW1hcC5qc1wiO1xuaW1wb3J0IHsgaWZEZWZpbmVkIH0gZnJvbSBcImxpdC9kaXJlY3RpdmVzL2lmLWRlZmluZWQuanNcIjtcbmltcG9ydCB7IGxpdmUgfSBmcm9tIFwibGl0L2RpcmVjdGl2ZXMvbGl2ZS5qc1wiO1xudmFyIFdhVGV4dGFyZWEgPSBjbGFzcyBleHRlbmRzIFdlYkF3ZXNvbWVGb3JtQXNzb2NpYXRlZEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMuYXNzdW1lSW50ZXJhY3Rpb25PbiA9IFtcImJsdXJcIiwgXCJpbnB1dFwiXTtcbiAgICB0aGlzLmhhc1Nsb3RDb250cm9sbGVyID0gbmV3IEhhc1Nsb3RDb250cm9sbGVyKHRoaXMsIFwiaGludFwiLCBcImxhYmVsXCIpO1xuICAgIHRoaXMudGl0bGUgPSBcIlwiO1xuICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSA/PyBcIlwiO1xuICAgIHRoaXMuc2l6ZSA9IFwibWVkaXVtXCI7XG4gICAgdGhpcy5hcHBlYXJhbmNlID0gXCJvdXRsaW5lZFwiO1xuICAgIHRoaXMubGFiZWwgPSBcIlwiO1xuICAgIHRoaXMuaGludCA9IFwiXCI7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IFwiXCI7XG4gICAgdGhpcy5yb3dzID0gNDtcbiAgICB0aGlzLnJlc2l6ZSA9IFwidmVydGljYWxcIjtcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZWFkb25seSA9IGZhbHNlO1xuICAgIHRoaXMucmVxdWlyZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNwZWxsY2hlY2sgPSB0cnVlO1xuICAgIHRoaXMud2l0aExhYmVsID0gZmFsc2U7XG4gICAgdGhpcy53aXRoSGludCA9IGZhbHNlO1xuICB9XG4gIHN0YXRpYyBnZXQgdmFsaWRhdG9ycygpIHtcbiAgICByZXR1cm4gWy4uLnN1cGVyLnZhbGlkYXRvcnMsIE1pcnJvclZhbGlkYXRvcigpXTtcbiAgfVxuICAvKiogVGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGlucHV0LCBzdWJtaXR0ZWQgYXMgYSBuYW1lL3ZhbHVlIHBhaXIgd2l0aCBmb3JtIGRhdGEuICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICBpZiAodGhpcy52YWx1ZUhhc0NoYW5nZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlID8/IHRoaXMuZGVmYXVsdFZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWwpIHtcbiAgICBpZiAodGhpcy5fdmFsdWUgPT09IHZhbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlSGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWw7XG4gIH1cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMuc2V0VGV4dGFyZWFEaW1lbnNpb25zKCkpO1xuICAgIHRoaXMudXBkYXRlQ29tcGxldGUudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnNldFRleHRhcmVhRGltZW5zaW9ucygpO1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuaW5wdXQpO1xuICAgICAgaWYgKHRoaXMuZGlkU1NSICYmIHRoaXMuaW5wdXQgJiYgdGhpcy52YWx1ZSAhPT0gdGhpcy5pbnB1dC52YWx1ZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsdWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIGlmICh0aGlzLmlucHV0KSB7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyPy51bm9ic2VydmUodGhpcy5pbnB1dCk7XG4gICAgfVxuICB9XG4gIGhhbmRsZUJsdXIoKSB7XG4gICAgdGhpcy5jaGVja1ZhbGlkaXR5KCk7XG4gIH1cbiAgaGFuZGxlQ2hhbmdlKGV2ZW50KSB7XG4gICAgdGhpcy52YWx1ZUhhc0NoYW5nZWQgPSB0cnVlO1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgIHRoaXMuc2V0VGV4dGFyZWFEaW1lbnNpb25zKCk7XG4gICAgdGhpcy5jaGVja1ZhbGlkaXR5KCk7XG4gICAgdGhpcy5yZWxheU5hdGl2ZUV2ZW50KGV2ZW50LCB7IGJ1YmJsZXM6IHRydWUsIGNvbXBvc2VkOiB0cnVlIH0pO1xuICB9XG4gIGhhbmRsZUlucHV0KGV2ZW50KSB7XG4gICAgdGhpcy52YWx1ZUhhc0NoYW5nZWQgPSB0cnVlO1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgIHRoaXMucmVsYXlOYXRpdmVFdmVudChldmVudCwgeyBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSB9KTtcbiAgfVxuICBzZXRUZXh0YXJlYURpbWVuc2lvbnMoKSB7XG4gICAgaWYgKHRoaXMucmVzaXplID09PSBcIm5vbmVcIikge1xuICAgICAgdGhpcy5iYXNlLnN0eWxlLndpZHRoID0gYGA7XG4gICAgICB0aGlzLmJhc2Uuc3R5bGUuaGVpZ2h0ID0gYGA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnJlc2l6ZSA9PT0gXCJhdXRvXCIpIHtcbiAgICAgIHRoaXMuc2l6ZUFkanVzdGVyLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuaW5wdXQuY2xpZW50SGVpZ2h0fXB4YDtcbiAgICAgIHRoaXMuaW5wdXQuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCI7XG4gICAgICB0aGlzLmlucHV0LnN0eWxlLmhlaWdodCA9IGAke3RoaXMuaW5wdXQuc2Nyb2xsSGVpZ2h0fXB4YDtcbiAgICAgIHRoaXMuYmFzZS5zdHlsZS53aWR0aCA9IGBgO1xuICAgICAgdGhpcy5iYXNlLnN0eWxlLmhlaWdodCA9IGBgO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbnB1dC5zdHlsZS53aWR0aCkge1xuICAgICAgY29uc3Qgd2lkdGggPSBOdW1iZXIodGhpcy5pbnB1dC5zdHlsZS53aWR0aC5zcGxpdCgvcHgvKVswXSkgKyAyO1xuICAgICAgdGhpcy5iYXNlLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbnB1dC5zdHlsZS5oZWlnaHQpIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IE51bWJlcih0aGlzLmlucHV0LnN0eWxlLmhlaWdodC5zcGxpdCgvcHgvKVswXSkgKyAyO1xuICAgICAgdGhpcy5iYXNlLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gICAgfVxuICB9XG4gIGhhbmRsZVJvd3NDaGFuZ2UoKSB7XG4gICAgdGhpcy5zZXRUZXh0YXJlYURpbWVuc2lvbnMoKTtcbiAgfVxuICBhc3luYyBoYW5kbGVWYWx1ZUNoYW5nZSgpIHtcbiAgICBhd2FpdCB0aGlzLnVwZGF0ZUNvbXBsZXRlO1xuICAgIHRoaXMuY2hlY2tWYWxpZGl0eSgpO1xuICAgIHRoaXMuc2V0VGV4dGFyZWFEaW1lbnNpb25zKCk7XG4gIH1cbiAgdXBkYXRlZChjaGFuZ2VkUHJvcGVydGllcykge1xuICAgIGlmIChjaGFuZ2VkUHJvcGVydGllcy5oYXMoXCJyZXNpemVcIikpIHtcbiAgICAgIHRoaXMuc2V0VGV4dGFyZWFEaW1lbnNpb25zKCk7XG4gICAgfVxuICAgIHN1cGVyLnVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIGlmIChjaGFuZ2VkUHJvcGVydGllcy5oYXMoXCJ2YWx1ZVwiKSkge1xuICAgICAgdGhpcy5jdXN0b21TdGF0ZXMuc2V0KFwiYmxhbmtcIiwgIXRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuICAvKiogU2V0cyBmb2N1cyBvbiB0aGUgdGV4dGFyZWEuICovXG4gIGZvY3VzKG9wdGlvbnMpIHtcbiAgICB0aGlzLmlucHV0LmZvY3VzKG9wdGlvbnMpO1xuICB9XG4gIC8qKiBSZW1vdmVzIGZvY3VzIGZyb20gdGhlIHRleHRhcmVhLiAqL1xuICBibHVyKCkge1xuICAgIHRoaXMuaW5wdXQuYmx1cigpO1xuICB9XG4gIC8qKiBTZWxlY3RzIGFsbCB0aGUgdGV4dCBpbiB0aGUgdGV4dGFyZWEuICovXG4gIHNlbGVjdCgpIHtcbiAgICB0aGlzLmlucHV0LnNlbGVjdCgpO1xuICB9XG4gIC8qKiBHZXRzIG9yIHNldHMgdGhlIHRleHRhcmVhJ3Mgc2Nyb2xsIHBvc2l0aW9uLiAqL1xuICBzY3JvbGxQb3NpdGlvbihwb3NpdGlvbikge1xuICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiBwb3NpdGlvbi50b3AgPT09IFwibnVtYmVyXCIpIHRoaXMuaW5wdXQuc2Nyb2xsVG9wID0gcG9zaXRpb24udG9wO1xuICAgICAgaWYgKHR5cGVvZiBwb3NpdGlvbi5sZWZ0ID09PSBcIm51bWJlclwiKSB0aGlzLmlucHV0LnNjcm9sbExlZnQgPSBwb3NpdGlvbi5sZWZ0O1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogdGhpcy5pbnB1dC5zY3JvbGxUb3AsXG4gICAgICBsZWZ0OiB0aGlzLmlucHV0LnNjcm9sbFRvcFxuICAgIH07XG4gIH1cbiAgLyoqIFNldHMgdGhlIHN0YXJ0IGFuZCBlbmQgcG9zaXRpb25zIG9mIHRoZSB0ZXh0IHNlbGVjdGlvbiAoMC1iYXNlZCkuICovXG4gIHNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQsIHNlbGVjdGlvbkRpcmVjdGlvbiA9IFwibm9uZVwiKSB7XG4gICAgdGhpcy5pbnB1dC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kLCBzZWxlY3Rpb25EaXJlY3Rpb24pO1xuICB9XG4gIC8qKiBSZXBsYWNlcyBhIHJhbmdlIG9mIHRleHQgd2l0aCBhIG5ldyBzdHJpbmcuICovXG4gIHNldFJhbmdlVGV4dChyZXBsYWNlbWVudCwgc3RhcnQsIGVuZCwgc2VsZWN0TW9kZSA9IFwicHJlc2VydmVcIikge1xuICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ID0gc3RhcnQgPz8gdGhpcy5pbnB1dC5zZWxlY3Rpb25TdGFydDtcbiAgICBjb25zdCBzZWxlY3Rpb25FbmQgPSBlbmQgPz8gdGhpcy5pbnB1dC5zZWxlY3Rpb25FbmQ7XG4gICAgdGhpcy5pbnB1dC5zZXRSYW5nZVRleHQocmVwbGFjZW1lbnQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQsIHNlbGVjdE1vZGUpO1xuICAgIGlmICh0aGlzLnZhbHVlICE9PSB0aGlzLmlucHV0LnZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5pbnB1dC52YWx1ZTtcbiAgICAgIHRoaXMuc2V0VGV4dGFyZWFEaW1lbnNpb25zKCk7XG4gICAgfVxuICB9XG4gIGZvcm1SZXNldENhbGxiYWNrKCkge1xuICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcbiAgICBpZiAodGhpcy5pbnB1dCkge1xuICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9IHRoaXMudmFsdWUgfHwgXCJcIjtcbiAgICB9XG4gICAgc3VwZXIuZm9ybVJlc2V0Q2FsbGJhY2soKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgaGFzTGFiZWxTbG90ID0gdGhpcy5oYXNVcGRhdGVkID8gdGhpcy5oYXNTbG90Q29udHJvbGxlci50ZXN0KFwibGFiZWxcIikgOiB0aGlzLndpdGhMYWJlbDtcbiAgICBjb25zdCBoYXNIaW50U2xvdCA9IHRoaXMuaGFzVXBkYXRlZCA/IHRoaXMuaGFzU2xvdENvbnRyb2xsZXIudGVzdChcImhpbnRcIikgOiB0aGlzLndpdGhIaW50O1xuICAgIGNvbnN0IGhhc0xhYmVsID0gdGhpcy5sYWJlbCA/IHRydWUgOiAhIWhhc0xhYmVsU2xvdDtcbiAgICBjb25zdCBoYXNIaW50ID0gdGhpcy5oaW50ID8gdHJ1ZSA6ICEhaGFzSGludFNsb3Q7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8bGFiZWxcbiAgICAgICAgcGFydD1cImZvcm0tY29udHJvbC1sYWJlbCBsYWJlbFwiXG4gICAgICAgIGNsYXNzPSR7Y2xhc3NNYXAoe1xuICAgICAgbGFiZWw6IHRydWUsXG4gICAgICBcImhhcy1sYWJlbFwiOiBoYXNMYWJlbFxuICAgIH0pfVxuICAgICAgICBmb3I9XCJpbnB1dFwiXG4gICAgICAgIGFyaWEtaGlkZGVuPSR7aGFzTGFiZWwgPyBcImZhbHNlXCIgOiBcInRydWVcIn1cbiAgICAgID5cbiAgICAgICAgPHNsb3QgbmFtZT1cImxhYmVsXCI+JHt0aGlzLmxhYmVsfTwvc2xvdD5cbiAgICAgIDwvbGFiZWw+XG5cbiAgICAgIDxkaXYgcGFydD1cImJhc2VcIiBjbGFzcz1cInRleHRhcmVhXCI+XG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIHBhcnQ9XCJ0ZXh0YXJlYVwiXG4gICAgICAgICAgaWQ9XCJpbnB1dFwiXG4gICAgICAgICAgY2xhc3M9XCJjb250cm9sXCJcbiAgICAgICAgICB0aXRsZT0ke3RoaXMudGl0bGV9XG4gICAgICAgICAgbmFtZT0ke2lmRGVmaW5lZCh0aGlzLm5hbWUpfVxuICAgICAgICAgIC52YWx1ZT0ke2xpdmUodGhpcy52YWx1ZSl9XG4gICAgICAgICAgP2Rpc2FibGVkPSR7dGhpcy5kaXNhYmxlZH1cbiAgICAgICAgICA/cmVhZG9ubHk9JHt0aGlzLnJlYWRvbmx5fVxuICAgICAgICAgID9yZXF1aXJlZD0ke3RoaXMucmVxdWlyZWR9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9JHtpZkRlZmluZWQodGhpcy5wbGFjZWhvbGRlcil9XG4gICAgICAgICAgcm93cz0ke2lmRGVmaW5lZCh0aGlzLnJvd3MpfVxuICAgICAgICAgIG1pbmxlbmd0aD0ke2lmRGVmaW5lZCh0aGlzLm1pbmxlbmd0aCl9XG4gICAgICAgICAgbWF4bGVuZ3RoPSR7aWZEZWZpbmVkKHRoaXMubWF4bGVuZ3RoKX1cbiAgICAgICAgICBhdXRvY2FwaXRhbGl6ZT0ke2lmRGVmaW5lZCh0aGlzLmF1dG9jYXBpdGFsaXplKX1cbiAgICAgICAgICBhdXRvY29ycmVjdD0ke2lmRGVmaW5lZCh0aGlzLmF1dG9jb3JyZWN0KX1cbiAgICAgICAgICA/YXV0b2ZvY3VzPSR7dGhpcy5hdXRvZm9jdXN9XG4gICAgICAgICAgc3BlbGxjaGVjaz0ke2lmRGVmaW5lZCh0aGlzLnNwZWxsY2hlY2spfVxuICAgICAgICAgIGVudGVya2V5aGludD0ke2lmRGVmaW5lZCh0aGlzLmVudGVya2V5aGludCl9XG4gICAgICAgICAgaW5wdXRtb2RlPSR7aWZEZWZpbmVkKHRoaXMuaW5wdXRtb2RlKX1cbiAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PVwiaGludFwiXG4gICAgICAgICAgQGNoYW5nZT0ke3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIEBpbnB1dD0ke3RoaXMuaGFuZGxlSW5wdXR9XG4gICAgICAgICAgQGJsdXI9JHt0aGlzLmhhbmRsZUJsdXJ9XG4gICAgICAgID48L3RleHRhcmVhPlxuXG4gICAgICAgIDwhLS0gVGhpcyBcImFkanVzdGVyXCIgZXhpc3RzIHRvIHByZXZlbnQgbGF5b3V0IHNoaWZ0aW5nLiBodHRwczovL2dpdGh1Yi5jb20vc2hvZWxhY2Utc3R5bGUvc2hvZWxhY2UvaXNzdWVzLzIxODAgLS0+XG4gICAgICAgIDxkaXYgcGFydD1cInRleHRhcmVhLWFkanVzdGVyXCIgY2xhc3M9XCJzaXplLWFkanVzdGVyXCIgP2hpZGRlbj0ke3RoaXMucmVzaXplICE9PSBcImF1dG9cIn0+PC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHNsb3RcbiAgICAgICAgaWQ9XCJoaW50XCJcbiAgICAgICAgbmFtZT1cImhpbnRcIlxuICAgICAgICBwYXJ0PVwiaGludFwiXG4gICAgICAgIGFyaWEtaGlkZGVuPSR7aGFzSGludCA/IFwiZmFsc2VcIiA6IFwidHJ1ZVwifVxuICAgICAgICBjbGFzcz0ke2NsYXNzTWFwKHtcbiAgICAgIFwiaGFzLXNsb3R0ZWRcIjogaGFzSGludFxuICAgIH0pfVxuICAgICAgICA+JHt0aGlzLmhpbnR9PC9zbG90XG4gICAgICA+XG4gICAgYDtcbiAgfVxufTtcbldhVGV4dGFyZWEuY3NzID0gW3RleHRhcmVhX3N0eWxlc19kZWZhdWx0LCBmb3JtX2NvbnRyb2xfc3R5bGVzX2RlZmF1bHQsIHNpemVfc3R5bGVzX2RlZmF1bHRdO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcXVlcnkoXCIuY29udHJvbFwiKVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiaW5wdXRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBxdWVyeSgnW3BhcnR+PVwiYmFzZVwiXScpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJiYXNlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcXVlcnkoXCIuc2l6ZS1hZGp1c3RlclwiKVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwic2l6ZUFkanVzdGVyXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwidGl0bGVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcIm5hbWVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBzdGF0ZSgpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJ2YWx1ZVwiLCAxKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcInZhbHVlXCIsIHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImRlZmF1bHRWYWx1ZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwic2l6ZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiYXBwZWFyYW5jZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImxhYmVsXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwiaGludFwiIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJoaW50XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwicGxhY2Vob2xkZXJcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IE51bWJlciB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwicm93c1wiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwicmVzaXplXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJkaXNhYmxlZFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwicmVhZG9ubHlcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4sIHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcInJlcXVpcmVkXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBOdW1iZXIgfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcIm1pbmxlbmd0aFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogTnVtYmVyIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJtYXhsZW5ndGhcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJhdXRvY2FwaXRhbGl6ZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImF1dG9jb3JyZWN0XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiYXV0b2NvbXBsZXRlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJhdXRvZm9jdXNcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJlbnRlcmtleWhpbnRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBjb252ZXJ0ZXI6IHtcbiAgICAgIC8vIEFsbG93IFwidHJ1ZXxmYWxzZVwiIGF0dHJpYnV0ZSB2YWx1ZXMgYnV0IGtlZXAgdGhlIHByb3BlcnR5IGJvb2xlYW5cbiAgICAgIGZyb21BdHRyaWJ1dGU6ICh2YWx1ZSkgPT4gIXZhbHVlIHx8IHZhbHVlID09PSBcImZhbHNlXCIgPyBmYWxzZSA6IHRydWUsXG4gICAgICB0b0F0dHJpYnV0ZTogKHZhbHVlKSA9PiB2YWx1ZSA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiXG4gICAgfVxuICB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwic3BlbGxjaGVja1wiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImlucHV0bW9kZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcIndpdGgtbGFiZWxcIiwgdHlwZTogQm9vbGVhbiB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwid2l0aExhYmVsXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwid2l0aC1oaW50XCIsIHR5cGU6IEJvb2xlYW4gfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcIndpdGhIaW50XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgd2F0Y2goXCJyb3dzXCIsIHsgd2FpdFVudGlsRmlyc3RVcGRhdGU6IHRydWUgfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImhhbmRsZVJvd3NDaGFuZ2VcIiwgMSk7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICB3YXRjaChcInZhbHVlXCIsIHsgd2FpdFVudGlsRmlyc3RVcGRhdGU6IHRydWUgfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImhhbmRsZVZhbHVlQ2hhbmdlXCIsIDEpO1xuV2FUZXh0YXJlYSA9IF9fZGVjb3JhdGVDbGFzcyhbXG4gIGN1c3RvbUVsZW1lbnQoXCJ3YS10ZXh0YXJlYVwiKVxuXSwgV2FUZXh0YXJlYSk7XG5cbmV4cG9ydCB7XG4gIFdhVGV4dGFyZWFcbn07XG4iLCAiaW1wb3J0IHsgTGl0RWxlbWVudCwgaHRtbCwgY3NzIH0gZnJvbSAnbGl0JztcbmltcG9ydCB7IGN1c3RvbUVsZW1lbnQsIHByb3BlcnR5LCBzdGF0ZSB9IGZyb20gJ2xpdC9kZWNvcmF0b3JzLmpzJztcblxuaW1wb3J0ICdAYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY29tcG9uZW50cy9idXR0b24vYnV0dG9uLmpzJztcbmltcG9ydCAnQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NvbXBvbmVudHMvdGV4dGFyZWEvdGV4dGFyZWEuanMnO1xuXG5AY3VzdG9tRWxlbWVudCgndGhyZWFkcy1pbmxpbmUtZWRpdG9yJylcbmV4cG9ydCBjbGFzcyBUaHJlYWRzSW5saW5lRWRpdG9yIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIHN0YXRpYyBvdmVycmlkZSBzdHlsZXMgPSBjc3NgXG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBtYXJnaW46IDE2cHggMDtcbiAgICB9XG4gICAgLmVkaXRvciB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIsIGhzbCgwIDAlIDg5LjglKSk7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS10Yy1yYWRpdXMsIDZweCk7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtY2FyZCwgaHNsKDAgMCUgMTAwJSkpO1xuICAgICAgYm94LXNoYWRvdzogMCAxcHggMnB4IDAgcmdiKDAgMCAwIC8gMC4wNSk7XG4gICAgfVxuICAgIC5lZGl0b3ItYm9keSB7XG4gICAgICBwYWRkaW5nOiAxMnB4O1xuICAgIH1cbiAgICAuZWRpdG9yLWZvb3RlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IDhweCAxMnB4O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlciwgaHNsKDAgMCUgODkuOCUpKTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdhLWNvbG9yLXN1cmZhY2UtcmFpc2VkLCBoc2woMCAwJSA5Ni4xJSkpO1xuICAgIH1cbiAgICAuaGludCB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcsIGhzbCgwIDAlIDQ1LjElKSk7XG4gICAgfVxuICAgIC5hY3Rpb25zIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDZweDtcbiAgICB9XG4gIGA7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pIHF1b3RlID0gJyc7XG4gIEBzdGF0ZSgpIHByaXZhdGUgdmFsdWUgPSAnJztcbiAgQHN0YXRlKCkgcHJpdmF0ZSBzdWJtaXR0aW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfaW5uZXJUZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9uYXRpdmVJbnB1dExpc3RlbmVyID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgdGhpcy52YWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MVGV4dEFyZWFFbGVtZW50KS52YWx1ZTtcbiAgfTtcblxuICBwcml2YXRlIF9hdHRhY2hOYXRpdmVMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICBjb25zdCB3YVRleHRhcmVhID0gdGhpcy5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yKCd3YS10ZXh0YXJlYScpO1xuICAgIGlmICghd2FUZXh0YXJlYSkgcmV0dXJuO1xuICAgIGNvbnN0IGlubmVyID0gKHdhVGV4dGFyZWEgYXMgRWxlbWVudCkuc2hhZG93Um9vdD8ucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoaW5uZXIgJiYgaW5uZXIgIT09IHRoaXMuX2lubmVyVGV4dGFyZWEpIHtcbiAgICAgIGlmICh0aGlzLl9pbm5lclRleHRhcmVhKSB7XG4gICAgICAgIHRoaXMuX2lubmVyVGV4dGFyZWEucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLl9uYXRpdmVJbnB1dExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2lubmVyVGV4dGFyZWEgPSBpbm5lcjtcbiAgICAgIGlubmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5fbmF0aXZlSW5wdXRMaXN0ZW5lcik7XG4gICAgfVxuICB9XG5cbiAgb3ZlcnJpZGUgZmlyc3RVcGRhdGVkKCkge1xuICAgIC8vIEF0dGFjaCBuYXRpdmUgaW5wdXQgbGlzdGVuZXIgYW5kIGZvY3VzIGFmdGVyIHdhLXRleHRhcmVhIHVwZ3JhZGVzIGl0cyBpbnRlcm5hbCBET00uXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuX2F0dGFjaE5hdGl2ZUxpc3RlbmVyKCk7XG4gICAgICBjb25zdCBpbm5lciA9IHRoaXMuX2lubmVyVGV4dGFyZWE7XG4gICAgICBpZiAoaW5uZXIpIHtcbiAgICAgICAgaW5uZXIuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHdhVGV4dGFyZWEgPSB0aGlzLnNoYWRvd1Jvb3Q/LnF1ZXJ5U2VsZWN0b3IoJ3dhLXRleHRhcmVhJyk7XG4gICAgICAgICh3YVRleHRhcmVhIGFzIHVua25vd24gYXMgSFRNTEVsZW1lbnQpPy5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb3ZlcnJpZGUgdXBkYXRlZCgpIHtcbiAgICB0aGlzLl9hdHRhY2hOYXRpdmVMaXN0ZW5lcigpO1xuICB9XG5cbiAgb3ZlcnJpZGUgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICBpZiAodGhpcy5faW5uZXJUZXh0YXJlYSkge1xuICAgICAgdGhpcy5faW5uZXJUZXh0YXJlYS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuX25hdGl2ZUlucHV0TGlzdGVuZXIpO1xuICAgICAgdGhpcy5faW5uZXJUZXh0YXJlYSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVJbnB1dChlOiBFdmVudCkge1xuICAgIHRoaXMudmFsdWUgPSAoZS50YXJnZXQgYXMgYW55KS52YWx1ZSA/PyAnJztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGV4dGFyZWFWYWx1ZSgpOiBzdHJpbmcge1xuICAgIC8vIFJlYWQgZnJvbSBuYXRpdmUgdGV4dGFyZWEgYXMgc291cmNlIG9mIHRydXRoIChoYW5kbGVzIFBsYXl3cmlnaHQgZmlsbCgpKVxuICAgIGlmICh0aGlzLl9pbm5lclRleHRhcmVhKSByZXR1cm4gdGhpcy5faW5uZXJUZXh0YXJlYS52YWx1ZTtcbiAgICBjb25zdCB3YVRleHRhcmVhID0gdGhpcy5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yKCd3YS10ZXh0YXJlYScpIGFzIGFueTtcbiAgICBpZiAod2FUZXh0YXJlYT8udmFsdWUgIT09IHVuZGVmaW5lZCkgcmV0dXJuIFN0cmluZyh3YVRleHRhcmVhLnZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgc3VibWl0KCkge1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmdldFRleHRhcmVhVmFsdWUoKS50cmltKCk7XG4gICAgaWYgKCFib2R5IHx8IHRoaXMuc3VibWl0dGluZykgcmV0dXJuO1xuICAgIHRoaXMudmFsdWUgPSBib2R5OyAvLyBzeW5jIHN0YXRlXG4gICAgdGhpcy5zdWJtaXR0aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdpbmxpbmUtc3VibWl0Jywge1xuICAgICAgYnViYmxlczogdHJ1ZSwgY29tcG9zZWQ6IHRydWUsXG4gICAgICBkZXRhaWw6IHsgYm9keSB9LFxuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FuY2VsKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2lubGluZS1jYW5jZWwnLCB7XG4gICAgICBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSxcbiAgICB9KSk7XG4gIH1cblxuICBvdmVycmlkZSByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItYm9keVwiPlxuICAgICAgICAgIDx3YS10ZXh0YXJlYVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJXcml0ZSB5b3VyIGNvbW1lbnQuLi5cIlxuICAgICAgICAgICAgLnZhbHVlPSR7dGhpcy52YWx1ZX1cbiAgICAgICAgICAgIHJvd3M9XCIzXCJcbiAgICAgICAgICAgIHJlc2l6ZT1cInZlcnRpY2FsXCJcbiAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICBAd2EtaW5wdXQ9JHt0aGlzLmhhbmRsZUlucHV0fVxuICAgICAgICAgICAgQGlucHV0PSR7dGhpcy5oYW5kbGVJbnB1dH1cbiAgICAgICAgICAgIEBrZXlkb3duPSR7KGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInICYmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSkgdGhpcy5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPjwvd2EtdGV4dGFyZWE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLWZvb3RlclwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGludFwiPkNtZCtFbnRlciB0byBzdWJtaXQ8L3NwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgICAgICAgIDx3YS1idXR0b24gc2l6ZT1cInNtYWxsXCIgYXBwZWFyYW5jZT1cIm91dGxpbmVkXCIgQGNsaWNrPSR7dGhpcy5jYW5jZWx9PkNhbmNlbDwvd2EtYnV0dG9uPlxuICAgICAgICAgICAgPHdhLWJ1dHRvblxuICAgICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgICB2YXJpYW50PVwiYnJhbmRcIlxuICAgICAgICAgICAgICA/ZGlzYWJsZWQ9JHshdGhpcy52YWx1ZS50cmltKCkgfHwgdGhpcy5zdWJtaXR0aW5nfVxuICAgICAgICAgICAgICBAY2xpY2s9JHt0aGlzLnN1Ym1pdH1cbiAgICAgICAgICAgID4ke3RoaXMuc3VibWl0dGluZyA/ICdTYXZpbmcuLi4nIDogJ1N1Ym1pdCd9PC93YS1idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2ludGVybmFsL29mZnNldC50c1xuZnVuY3Rpb24gZ2V0T2Zmc2V0KGVsZW1lbnQsIHBhcmVudCkge1xuICByZXR1cm4ge1xuICAgIHRvcDogTWF0aC5yb3VuZChlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApLFxuICAgIGxlZnQ6IE1hdGgucm91bmQoZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQpXG4gIH07XG59XG5cbi8vIHNyYy9pbnRlcm5hbC9zY3JvbGwudHNcbnZhciBsb2NrcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCk7XG5mdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCgpIHtcbiAgY29uc3QgZG9jdW1lbnRXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgcmV0dXJuIE1hdGguYWJzKHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnRXaWR0aCk7XG59XG5mdW5jdGlvbiBnZXRFeGlzdGluZ0JvZHlQYWRkaW5nKCkge1xuICBjb25zdCBwYWRkaW5nID0gTnVtYmVyKGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkucGFkZGluZ1JpZ2h0LnJlcGxhY2UoL3B4LywgXCJcIikpO1xuICBpZiAoaXNOYU4ocGFkZGluZykgfHwgIXBhZGRpbmcpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICByZXR1cm4gcGFkZGluZztcbn1cbmZ1bmN0aW9uIGxvY2tCb2R5U2Nyb2xsaW5nKGxvY2tpbmdFbCkge1xuICBsb2Nrcy5hZGQobG9ja2luZ0VsKTtcbiAgaWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwid2Etc2Nyb2xsLWxvY2tcIikpIHtcbiAgICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IGdldFNjcm9sbGJhcldpZHRoKCkgKyBnZXRFeGlzdGluZ0JvZHlQYWRkaW5nKCk7XG4gICAgbGV0IHNjcm9sbGJhckd1dHRlclByb3BlcnR5ID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLnNjcm9sbGJhckd1dHRlcjtcbiAgICBpZiAoIXNjcm9sbGJhckd1dHRlclByb3BlcnR5IHx8IHNjcm9sbGJhckd1dHRlclByb3BlcnR5ID09PSBcImF1dG9cIikge1xuICAgICAgc2Nyb2xsYmFyR3V0dGVyUHJvcGVydHkgPSBcInN0YWJsZVwiO1xuICAgIH1cbiAgICBpZiAoc2Nyb2xsYmFyV2lkdGggPCAyKSB7XG4gICAgICBzY3JvbGxiYXJHdXR0ZXJQcm9wZXJ0eSA9IFwiXCI7XG4gICAgfVxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0td2Etc2Nyb2xsLWxvY2stZ3V0dGVyXCIsIHNjcm9sbGJhckd1dHRlclByb3BlcnR5KTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIndhLXNjcm9sbC1sb2NrXCIpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0td2Etc2Nyb2xsLWxvY2stc2l6ZVwiLCBgJHtzY3JvbGxiYXJXaWR0aH1weGApO1xuICB9XG59XG5mdW5jdGlvbiB1bmxvY2tCb2R5U2Nyb2xsaW5nKGxvY2tpbmdFbCkge1xuICBsb2Nrcy5kZWxldGUobG9ja2luZ0VsKTtcbiAgaWYgKGxvY2tzLnNpemUgPT09IDApIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIndhLXNjcm9sbC1sb2NrXCIpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIi0td2Etc2Nyb2xsLWxvY2stc2l6ZVwiKTtcbiAgfVxufVxuZnVuY3Rpb24gc2Nyb2xsSW50b1ZpZXcoZWxlbWVudCwgY29udGFpbmVyLCBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCIsIGJlaGF2aW9yID0gXCJzbW9vdGhcIikge1xuICBjb25zdCBvZmZzZXQgPSBnZXRPZmZzZXQoZWxlbWVudCwgY29udGFpbmVyKTtcbiAgY29uc3Qgb2Zmc2V0VG9wID0gb2Zmc2V0LnRvcCArIGNvbnRhaW5lci5zY3JvbGxUb3A7XG4gIGNvbnN0IG9mZnNldExlZnQgPSBvZmZzZXQubGVmdCArIGNvbnRhaW5lci5zY3JvbGxMZWZ0O1xuICBjb25zdCBtaW5YID0gY29udGFpbmVyLnNjcm9sbExlZnQ7XG4gIGNvbnN0IG1heFggPSBjb250YWluZXIuc2Nyb2xsTGVmdCArIGNvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgY29uc3QgbWluWSA9IGNvbnRhaW5lci5zY3JvbGxUb3A7XG4gIGNvbnN0IG1heFkgPSBjb250YWluZXIuc2Nyb2xsVG9wICsgY29udGFpbmVyLm9mZnNldEhlaWdodDtcbiAgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIgfHwgZGlyZWN0aW9uID09PSBcImJvdGhcIikge1xuICAgIGlmIChvZmZzZXRMZWZ0IDwgbWluWCkge1xuICAgICAgY29udGFpbmVyLnNjcm9sbFRvKHsgbGVmdDogb2Zmc2V0TGVmdCwgYmVoYXZpb3IgfSk7XG4gICAgfSBlbHNlIGlmIChvZmZzZXRMZWZ0ICsgZWxlbWVudC5jbGllbnRXaWR0aCA+IG1heFgpIHtcbiAgICAgIGNvbnRhaW5lci5zY3JvbGxUbyh7IGxlZnQ6IG9mZnNldExlZnQgLSBjb250YWluZXIub2Zmc2V0V2lkdGggKyBlbGVtZW50LmNsaWVudFdpZHRoLCBiZWhhdmlvciB9KTtcbiAgICB9XG4gIH1cbiAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiIHx8IGRpcmVjdGlvbiA9PT0gXCJib3RoXCIpIHtcbiAgICBpZiAob2Zmc2V0VG9wIDwgbWluWSkge1xuICAgICAgY29udGFpbmVyLnNjcm9sbFRvKHsgdG9wOiBvZmZzZXRUb3AsIGJlaGF2aW9yIH0pO1xuICAgIH0gZWxzZSBpZiAob2Zmc2V0VG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQgPiBtYXhZKSB7XG4gICAgICBjb250YWluZXIuc2Nyb2xsVG8oeyB0b3A6IG9mZnNldFRvcCAtIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQgKyBlbGVtZW50LmNsaWVudEhlaWdodCwgYmVoYXZpb3IgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7XG4gIGxvY2tCb2R5U2Nyb2xsaW5nLFxuICB1bmxvY2tCb2R5U2Nyb2xsaW5nLFxuICBzY3JvbGxJbnRvVmlld1xufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9pbnRlcm5hbC9wYXJzZS50c1xuZnVuY3Rpb24gcGFyc2VTcGFjZURlbGltaXRlZFRva2VucyhpbnB1dCkge1xuICByZXR1cm4gaW5wdXQuc3BsaXQoXCIgXCIpLm1hcCgodG9rZW4pID0+IHRva2VuLnRyaW0oKSkuZmlsdGVyKCh0b2tlbikgPT4gdG9rZW4gIT09IFwiXCIpO1xufVxuXG5leHBvcnQge1xuICBwYXJzZVNwYWNlRGVsaW1pdGVkVG9rZW5zXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZy5zdHlsZXMudHNcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJsaXRcIjtcbnZhciBkaWFsb2dfc3R5bGVzX2RlZmF1bHQgPSBjc3NgXG4gIDpob3N0IHtcbiAgICAtLXdpZHRoOiAzMXJlbTtcbiAgICAtLXNwYWNpbmc6IHZhcigtLXdhLXNwYWNlLWwpO1xuICAgIC0tc2hvdy1kdXJhdGlvbjogMjAwbXM7XG4gICAgLS1oaWRlLWR1cmF0aW9uOiAyMDBtcztcblxuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICA6aG9zdChbb3Blbl0pIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuXG4gIC5kaWFsb2cge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IHZhcigtLXdpZHRoKTtcbiAgICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIHZhcigtLXdhLXNwYWNlLTJ4bCkpO1xuICAgIG1heC1oZWlnaHQ6IGNhbGMoMTAwJSAtIHZhcigtLXdhLXNwYWNlLTJ4bCkpO1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWNvbG9yLXN1cmZhY2UtcmFpc2VkKTtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13YS1wYW5lbC1ib3JkZXItcmFkaXVzKTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm94LXNoYWRvdzogdmFyKC0td2Etc2hhZG93LWwpO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbWFyZ2luOiBhdXRvO1xuXG4gICAgJi5zaG93IHtcbiAgICAgIGFuaW1hdGlvbjogc2hvdy1kaWFsb2cgdmFyKC0tc2hvdy1kdXJhdGlvbikgZWFzZTtcblxuICAgICAgJjo6YmFja2Ryb3Age1xuICAgICAgICBhbmltYXRpb246IHNob3ctYmFja2Ryb3AgdmFyKC0tc2hvdy1kdXJhdGlvbiwgMjAwbXMpIGVhc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5oaWRlIHtcbiAgICAgIGFuaW1hdGlvbjogc2hvdy1kaWFsb2cgdmFyKC0taGlkZS1kdXJhdGlvbikgZWFzZSByZXZlcnNlO1xuXG4gICAgICAmOjpiYWNrZHJvcCB7XG4gICAgICAgIGFuaW1hdGlvbjogc2hvdy1iYWNrZHJvcCB2YXIoLS1oaWRlLWR1cmF0aW9uLCAyMDBtcykgZWFzZSByZXZlcnNlO1xuICAgICAgfVxuICAgIH1cblxuICAgICYucHVsc2Uge1xuICAgICAgYW5pbWF0aW9uOiBwdWxzZSAyNTBtcyBlYXNlO1xuICAgIH1cbiAgfVxuXG4gIC5kaWFsb2c6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cblxuICAvKiBFbnN1cmUgdGhlcmUncyBlbm91Z2ggdmVydGljYWwgcGFkZGluZyBmb3IgcGhvbmVzIHRoYXQgZG9uJ3QgdXBkYXRlIHZoIHdoZW4gY2hyb21lIGFwcGVhcnMgKGUuZy4gaVBob25lKSAqL1xuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjBweCkge1xuICAgIC5kaWFsb2cge1xuICAgICAgbWF4LWhlaWdodDogODB2aDtcbiAgICB9XG4gIH1cblxuICAub3BlbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG5cbiAgLmhlYWRlciB7XG4gICAgZmxleDogMCAwIGF1dG87XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IG5vd3JhcDtcblxuICAgIHBhZGRpbmctaW5saW5lLXN0YXJ0OiB2YXIoLS1zcGFjaW5nKTtcbiAgICBwYWRkaW5nLWJsb2NrLWVuZDogMDtcblxuICAgIC8qIFN1YnRyYWN0IHRoZSBjbG9zZSBidXR0b24ncyBwYWRkaW5nIHNvIHRoYXQgdGhlIFggaXMgdmlzdWFsbHkgYWxpZ25lZCB3aXRoIHRoZSBlZGdlcyBvZiB0aGUgZGlhbG9nIGNvbnRlbnQgKi9cbiAgICBwYWRkaW5nLWlubGluZS1lbmQ6IGNhbGModmFyKC0tc3BhY2luZykgLSB2YXIoLS13YS1mb3JtLWNvbnRyb2wtcGFkZGluZy1ibG9jaykpO1xuICAgIHBhZGRpbmctYmxvY2stc3RhcnQ6IGNhbGModmFyKC0tc3BhY2luZykgLSB2YXIoLS13YS1mb3JtLWNvbnRyb2wtcGFkZGluZy1ibG9jaykpO1xuICB9XG5cbiAgLnRpdGxlIHtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgZm9udC1zaXplOiB2YXIoLS13YS1mb250LXNpemUtbCk7XG4gICAgZm9udC13ZWlnaHQ6IHZhcigtLXdhLWZvbnQtd2VpZ2h0LWhlYWRpbmcpO1xuICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS13YS1saW5lLWhlaWdodC1jb25kZW5zZWQpO1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIC5oZWFkZXItYWN0aW9ucyB7XG4gICAgYWxpZ24tc2VsZjogc3RhcnQ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAganVzdGlmeS1jb250ZW50OiBlbmQ7XG4gICAgZ2FwOiB2YXIoLS13YS1zcGFjZS0yeHMpO1xuICAgIHBhZGRpbmctaW5saW5lLXN0YXJ0OiB2YXIoLS1zcGFjaW5nKTtcbiAgfVxuXG4gIC5oZWFkZXItYWN0aW9ucyB3YS1idXR0b24sXG4gIC5oZWFkZXItYWN0aW9ucyA6OnNsb3R0ZWQod2EtYnV0dG9uKSB7XG4gICAgZmxleDogMCAwIGF1dG87XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgLmJvZHkge1xuICAgIGZsZXg6IDEgMSBhdXRvO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBhZGRpbmc6IHZhcigtLXNwYWNpbmcpO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcblxuICAgICY6Zm9jdXMge1xuICAgICAgb3V0bGluZTogbm9uZTtcbiAgICB9XG5cbiAgICAmOmZvY3VzLXZpc2libGUge1xuICAgICAgb3V0bGluZTogdmFyKC0td2EtZm9jdXMtcmluZyk7XG4gICAgICBvdXRsaW5lLW9mZnNldDogdmFyKC0td2EtZm9jdXMtcmluZy1vZmZzZXQpO1xuICAgIH1cbiAgfVxuXG4gIC5mb290ZXIge1xuICAgIGZsZXg6IDAgMCBhdXRvO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGdhcDogdmFyKC0td2Etc3BhY2UteHMpO1xuICAgIGp1c3RpZnktY29udGVudDogZW5kO1xuICAgIHBhZGRpbmc6IHZhcigtLXNwYWNpbmcpO1xuICAgIHBhZGRpbmctYmxvY2stc3RhcnQ6IDA7XG4gIH1cblxuICAuZm9vdGVyIDo6c2xvdHRlZCh3YS1idXR0b246bm90KDpmaXJzdC1vZi10eXBlKSkge1xuICAgIG1hcmdpbi1pbmxpbmUtc3RhcnQ6IHZhcigtLXdhLXNwYWNpbmcteHMpO1xuICB9XG5cbiAgLmRpYWxvZzo6YmFja2Ryb3Age1xuICAgIC8qXG4gICAgICBOT1RFOiB0aGUgOjpiYWNrZHJvcCBlbGVtZW50IGRvZXNuJ3QgaW5oZXJpdCBwcm9wZXJseSBpbiBTYWZhcmkgeWV0LCBidXQgaXQgd2lsbCBpbiAxNy40ISBBdCB0aGF0IHRpbWUsIHdlIGNhblxuICAgICAgcmVtb3ZlIHRoZSBmYWxsYmFjayB2YWx1ZXMgaGVyZS5cbiAgICAqL1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWNvbG9yLW92ZXJsYXktbW9kYWwsIHJnYigwIDAgMCAvIDAuMjUpKTtcbiAgfVxuXG4gIEBrZXlmcmFtZXMgcHVsc2Uge1xuICAgIDAlIHtcbiAgICAgIHNjYWxlOiAxO1xuICAgIH1cbiAgICA1MCUge1xuICAgICAgc2NhbGU6IDEuMDI7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgc2NhbGU6IDE7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBzaG93LWRpYWxvZyB7XG4gICAgZnJvbSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgc2NhbGU6IDAuODtcbiAgICB9XG4gICAgdG8ge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHNjYWxlOiAxO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgc2hvdy1iYWNrZHJvcCB7XG4gICAgZnJvbSB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgICB0byB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgfVxuXG4gIEBtZWRpYSAoZm9yY2VkLWNvbG9yczogYWN0aXZlKSB7XG4gICAgLmRpYWxvZyB7XG4gICAgICBib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCB7XG4gIGRpYWxvZ19zdHlsZXNfZGVmYXVsdFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9pbnRlcm5hbC9kaXNtaXNzaWJsZS1zdGFjay50c1xudmFyIGRpc21pc3NpYmxlU3RhY2sgPSBbXTtcbmZ1bmN0aW9uIHJlZ2lzdGVyRGlzbWlzc2libGUoa2V5KSB7XG4gIGRpc21pc3NpYmxlU3RhY2sucHVzaChrZXkpO1xufVxuZnVuY3Rpb24gdW5yZWdpc3RlckRpc21pc3NpYmxlKGtleSkge1xuICBmb3IgKGxldCBpID0gZGlzbWlzc2libGVTdGFjay5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChkaXNtaXNzaWJsZVN0YWNrW2ldID09PSBrZXkpIHtcbiAgICAgIGRpc21pc3NpYmxlU3RhY2suc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBpc1RvcERpc21pc3NpYmxlKGtleSkge1xuICByZXR1cm4gZGlzbWlzc2libGVTdGFjay5sZW5ndGggPiAwICYmIGRpc21pc3NpYmxlU3RhY2tbZGlzbWlzc2libGVTdGFjay5sZW5ndGggLSAxXSA9PT0ga2V5O1xufVxuXG5leHBvcnQge1xuICByZWdpc3RlckRpc21pc3NpYmxlLFxuICB1bnJlZ2lzdGVyRGlzbWlzc2libGUsXG4gIGlzVG9wRGlzbWlzc2libGVcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvZXZlbnRzL3Nob3cudHNcbnZhciBXYVNob3dFdmVudCA9IGNsYXNzIGV4dGVuZHMgRXZlbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIndhLXNob3dcIiwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgV2FTaG93RXZlbnRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvZXZlbnRzL2hpZGUudHNcbnZhciBXYUhpZGVFdmVudCA9IGNsYXNzIGV4dGVuZHMgRXZlbnQge1xuICBjb25zdHJ1Y3RvcihkZXRhaWwpIHtcbiAgICBzdXBlcihcIndhLWhpZGVcIiwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSB9KTtcbiAgICB0aGlzLmRldGFpbCA9IGRldGFpbDtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgV2FIaWRlRXZlbnRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvZXZlbnRzL2FmdGVyLWhpZGUudHNcbnZhciBXYUFmdGVySGlkZUV2ZW50ID0gY2xhc3MgZXh0ZW5kcyBFdmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFwid2EtYWZ0ZXItaGlkZVwiLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IGZhbHNlLCBjb21wb3NlZDogdHJ1ZSB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgV2FBZnRlckhpZGVFdmVudFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9ldmVudHMvYWZ0ZXItc2hvdy50c1xudmFyIFdhQWZ0ZXJTaG93RXZlbnQgPSBjbGFzcyBleHRlbmRzIEV2ZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJ3YS1hZnRlci1zaG93XCIsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2UsIGNvbXBvc2VkOiB0cnVlIH0pO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBXYUFmdGVyU2hvd0V2ZW50XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2ludGVybmFsL2FuaW1hdGUudHNcbmFzeW5jIGZ1bmN0aW9uIGFuaW1hdGUoZWwsIGtleWZyYW1lcywgb3B0aW9ucykge1xuICByZXR1cm4gZWwuYW5pbWF0ZShrZXlmcmFtZXMsIG9wdGlvbnMpLmZpbmlzaGVkLmNhdGNoKCgpID0+IHtcbiAgfSk7XG59XG5mdW5jdGlvbiBhbmltYXRlV2l0aENsYXNzKGVsLCBjbGFzc05hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICBjb25zdCB7IHNpZ25hbCB9ID0gY29udHJvbGxlcjtcbiAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIGxldCByZXNvbHZlZCA9IGZhbHNlO1xuICAgIGxldCBvbkVuZCA9ICgpID0+IHtcbiAgICAgIGlmIChyZXNvbHZlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXNvbHZlZCA9IHRydWU7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgfTtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIG9uRW5kLCB7IG9uY2U6IHRydWUsIHNpZ25hbCB9KTtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uY2FuY2VsXCIsIG9uRW5kLCB7IG9uY2U6IHRydWUsIHNpZ25hbCB9KTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKCFyZXNvbHZlZCAmJiBlbC5nZXRBbmltYXRpb25zKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG9uRW5kKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gcGFyc2VEdXJhdGlvbihkdXJhdGlvbikge1xuICBkdXJhdGlvbiA9IGR1cmF0aW9uLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgaWYgKGR1cmF0aW9uLmluZGV4T2YoXCJtc1wiKSA+IC0xKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoZHVyYXRpb24pIHx8IDA7XG4gIH1cbiAgaWYgKGR1cmF0aW9uLmluZGV4T2YoXCJzXCIpID4gLTEpIHtcbiAgICByZXR1cm4gKHBhcnNlRmxvYXQoZHVyYXRpb24pIHx8IDApICogMWUzO1xuICB9XG4gIHJldHVybiBwYXJzZUZsb2F0KGR1cmF0aW9uKSB8fCAwO1xufVxuZnVuY3Rpb24gcHJlZmVyc1JlZHVjZWRNb3Rpb24oKSB7XG4gIGNvbnN0IHF1ZXJ5ID0gd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKTtcbiAgcmV0dXJuIHF1ZXJ5Lm1hdGNoZXM7XG59XG5cbmV4cG9ydCB7XG4gIGFuaW1hdGUsXG4gIGFuaW1hdGVXaXRoQ2xhc3MsXG4gIHBhcnNlRHVyYXRpb24sXG4gIHByZWZlcnNSZWR1Y2VkTW90aW9uXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cbmltcG9ydCB7XG4gIGxvY2tCb2R5U2Nyb2xsaW5nLFxuICB1bmxvY2tCb2R5U2Nyb2xsaW5nXG59IGZyb20gXCIuL2NodW5rLlZRWjQ2TVlJLmpzXCI7XG5pbXBvcnQge1xuICBwYXJzZVNwYWNlRGVsaW1pdGVkVG9rZW5zXG59IGZyb20gXCIuL2NodW5rLlJNWjdCVkRNLmpzXCI7XG5pbXBvcnQge1xuICBkaWFsb2dfc3R5bGVzX2RlZmF1bHRcbn0gZnJvbSBcIi4vY2h1bmsuTkVUNVY2TkwuanNcIjtcbmltcG9ydCB7XG4gIGlzVG9wRGlzbWlzc2libGUsXG4gIHJlZ2lzdGVyRGlzbWlzc2libGUsXG4gIHVucmVnaXN0ZXJEaXNtaXNzaWJsZVxufSBmcm9tIFwiLi9jaHVuay41MldBMkRKTy5qc1wiO1xuaW1wb3J0IHtcbiAgV2FTaG93RXZlbnRcbn0gZnJvbSBcIi4vY2h1bmsuNFpBS1A3TlkuanNcIjtcbmltcG9ydCB7XG4gIFdhSGlkZUV2ZW50XG59IGZyb20gXCIuL2NodW5rLk1RT0RKNzVWLmpzXCI7XG5pbXBvcnQge1xuICBXYUFmdGVySGlkZUV2ZW50XG59IGZyb20gXCIuL2NodW5rLjNOS0lISUNXLmpzXCI7XG5pbXBvcnQge1xuICBXYUFmdGVyU2hvd0V2ZW50XG59IGZyb20gXCIuL2NodW5rLlBYM0hNS0Y3LmpzXCI7XG5pbXBvcnQge1xuICBhbmltYXRlV2l0aENsYXNzXG59IGZyb20gXCIuL2NodW5rLkw2Q0lLT0ZRLmpzXCI7XG5pbXBvcnQge1xuICBIYXNTbG90Q29udHJvbGxlclxufSBmcm9tIFwiLi9jaHVuay5LSUhCM1ZNQi5qc1wiO1xuaW1wb3J0IHtcbiAgd2F0Y2hcbn0gZnJvbSBcIi4vY2h1bmsuUFpBTjZGUE4uanNcIjtcbmltcG9ydCB7XG4gIExvY2FsaXplQ29udHJvbGxlclxufSBmcm9tIFwiLi9jaHVuay5PS1hCTlJFNi5qc1wiO1xuaW1wb3J0IHtcbiAgV2ViQXdlc29tZUVsZW1lbnRcbn0gZnJvbSBcIi4vY2h1bmsuRVBISFdYSzIuanNcIjtcbmltcG9ydCB7XG4gIF9fZGVjb3JhdGVDbGFzc1xufSBmcm9tIFwiLi9jaHVuay43VkdDSUhERy5qc1wiO1xuXG4vLyBzcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLnRzXG5pbXBvcnQgeyBodG1sLCBpc1NlcnZlciB9IGZyb20gXCJsaXRcIjtcbmltcG9ydCB7IGN1c3RvbUVsZW1lbnQsIHByb3BlcnR5LCBxdWVyeSB9IGZyb20gXCJsaXQvZGVjb3JhdG9ycy5qc1wiO1xuaW1wb3J0IHsgY2xhc3NNYXAgfSBmcm9tIFwibGl0L2RpcmVjdGl2ZXMvY2xhc3MtbWFwLmpzXCI7XG52YXIgV2FEaWFsb2cgPSBjbGFzcyBleHRlbmRzIFdlYkF3ZXNvbWVFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLmxvY2FsaXplID0gbmV3IExvY2FsaXplQ29udHJvbGxlcih0aGlzKTtcbiAgICB0aGlzLmhhc1Nsb3RDb250cm9sbGVyID0gbmV3IEhhc1Nsb3RDb250cm9sbGVyKHRoaXMsIFwiZm9vdGVyXCIsIFwiaGVhZGVyLWFjdGlvbnNcIiwgXCJsYWJlbFwiKTtcbiAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmxhYmVsID0gXCJcIjtcbiAgICB0aGlzLndpdGhvdXRIZWFkZXIgPSBmYWxzZTtcbiAgICB0aGlzLmxpZ2h0RGlzbWlzcyA9IGZhbHNlO1xuICAgIHRoaXMuaGFuZGxlRG9jdW1lbnRLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiICYmIHRoaXMub3BlbiAmJiBpc1RvcERpc21pc3NpYmxlKHRoaXMpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnJlcXVlc3RDbG9zZSh0aGlzLmRpYWxvZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgaWYgKHRoaXMub3Blbikge1xuICAgICAgdGhpcy5hZGRPcGVuTGlzdGVuZXJzKCk7XG4gICAgICB0aGlzLmRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICAgIGxvY2tCb2R5U2Nyb2xsaW5nKHRoaXMpO1xuICAgIH1cbiAgfVxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHVubG9ja0JvZHlTY3JvbGxpbmcodGhpcyk7XG4gICAgdGhpcy5yZW1vdmVPcGVuTGlzdGVuZXJzKCk7XG4gIH1cbiAgYXN5bmMgcmVxdWVzdENsb3NlKHNvdXJjZSkge1xuICAgIGNvbnN0IHdhSGlkZUV2ZW50ID0gbmV3IFdhSGlkZUV2ZW50KHsgc291cmNlIH0pO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh3YUhpZGVFdmVudCk7XG4gICAgaWYgKHdhSGlkZUV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgICBhbmltYXRlV2l0aENsYXNzKHRoaXMuZGlhbG9nLCBcInB1bHNlXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZU9wZW5MaXN0ZW5lcnMoKTtcbiAgICBhd2FpdCBhbmltYXRlV2l0aENsYXNzKHRoaXMuZGlhbG9nLCBcImhpZGVcIik7XG4gICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgdGhpcy5kaWFsb2cuY2xvc2UoKTtcbiAgICB1bmxvY2tCb2R5U2Nyb2xsaW5nKHRoaXMpO1xuICAgIGNvbnN0IHRyaWdnZXIgPSB0aGlzLm9yaWdpbmFsVHJpZ2dlcjtcbiAgICBpZiAodHlwZW9mIHRyaWdnZXI/LmZvY3VzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdHJpZ2dlci5mb2N1cygpKTtcbiAgICB9XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBXYUFmdGVySGlkZUV2ZW50KCkpO1xuICB9XG4gIGFkZE9wZW5MaXN0ZW5lcnMoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5oYW5kbGVEb2N1bWVudEtleURvd24pO1xuICAgIHJlZ2lzdGVyRGlzbWlzc2libGUodGhpcyk7XG4gIH1cbiAgcmVtb3ZlT3Blbkxpc3RlbmVycygpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmhhbmRsZURvY3VtZW50S2V5RG93bik7XG4gICAgdW5yZWdpc3RlckRpc21pc3NpYmxlKHRoaXMpO1xuICB9XG4gIGhhbmRsZURpYWxvZ0NhbmNlbChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCF0aGlzLmRpYWxvZy5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRlXCIpICYmIGV2ZW50LnRhcmdldCA9PT0gdGhpcy5kaWFsb2cgJiYgaXNUb3BEaXNtaXNzaWJsZSh0aGlzKSkge1xuICAgICAgdGhpcy5yZXF1ZXN0Q2xvc2UodGhpcy5kaWFsb2cpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVEaWFsb2dDbGljayhldmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBidXR0b24gPSB0YXJnZXQuY2xvc2VzdCgnW2RhdGEtZGlhbG9nPVwiY2xvc2VcIl0nKTtcbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMucmVxdWVzdENsb3NlKGJ1dHRvbik7XG4gICAgfVxuICB9XG4gIGFzeW5jIGhhbmRsZURpYWxvZ1BvaW50ZXJEb3duKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcy5kaWFsb2cpIHtcbiAgICAgIGlmICh0aGlzLmxpZ2h0RGlzbWlzcykge1xuICAgICAgICB0aGlzLnJlcXVlc3RDbG9zZSh0aGlzLmRpYWxvZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBhbmltYXRlV2l0aENsYXNzKHRoaXMuZGlhbG9nLCBcInB1bHNlXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBoYW5kbGVPcGVuQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLm9wZW4gJiYgIXRoaXMuZGlhbG9nLm9wZW4pIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMub3BlbiAmJiB0aGlzLmRpYWxvZy5vcGVuKSB7XG4gICAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICAgICAgdGhpcy5yZXF1ZXN0Q2xvc2UodGhpcy5kaWFsb2cpO1xuICAgIH1cbiAgfVxuICAvKiogU2hvd3MgdGhlIGRpYWxvZy4gKi9cbiAgYXN5bmMgc2hvdygpIHtcbiAgICBjb25zdCB3YVNob3dFdmVudCA9IG5ldyBXYVNob3dFdmVudCgpO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh3YVNob3dFdmVudCk7XG4gICAgaWYgKHdhU2hvd0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFkZE9wZW5MaXN0ZW5lcnMoKTtcbiAgICB0aGlzLm9yaWdpbmFsVHJpZ2dlciA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5vcGVuID0gdHJ1ZTtcbiAgICB0aGlzLmRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICBsb2NrQm9keVNjcm9sbGluZyh0aGlzKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudFRvRm9jdXMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCJbYXV0b2ZvY3VzXVwiKTtcbiAgICAgIGlmIChlbGVtZW50VG9Gb2N1cyAmJiB0eXBlb2YgZWxlbWVudFRvRm9jdXMuZm9jdXMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaWFsb2cuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBhd2FpdCBhbmltYXRlV2l0aENsYXNzKHRoaXMuZGlhbG9nLCBcInNob3dcIik7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBXYUFmdGVyU2hvd0V2ZW50KCkpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBoYXNIZWFkZXIgPSAhdGhpcy53aXRob3V0SGVhZGVyO1xuICAgIGNvbnN0IGhhc0Zvb3RlciA9IHRoaXMuaGFzU2xvdENvbnRyb2xsZXIudGVzdChcImZvb3RlclwiKTtcbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxkaWFsb2dcbiAgICAgICAgcGFydD1cImRpYWxvZ1wiXG4gICAgICAgIGNsYXNzPSR7Y2xhc3NNYXAoe1xuICAgICAgZGlhbG9nOiB0cnVlLFxuICAgICAgb3BlbjogdGhpcy5vcGVuXG4gICAgfSl9XG4gICAgICAgIEBjYW5jZWw9JHt0aGlzLmhhbmRsZURpYWxvZ0NhbmNlbH1cbiAgICAgICAgQGNsaWNrPSR7dGhpcy5oYW5kbGVEaWFsb2dDbGlja31cbiAgICAgICAgQHBvaW50ZXJkb3duPSR7dGhpcy5oYW5kbGVEaWFsb2dQb2ludGVyRG93bn1cbiAgICAgID5cbiAgICAgICAgJHtoYXNIZWFkZXIgPyBodG1sYFxuICAgICAgICAgICAgICA8aGVhZGVyIHBhcnQ9XCJoZWFkZXJcIiBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxoMiBwYXJ0PVwidGl0bGVcIiBjbGFzcz1cInRpdGxlXCIgaWQ9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgPCEtLSBJZiB0aGVyZSdzIG5vIGxhYmVsLCB1c2UgYW4gaW52aXNpYmxlIGNoYXJhY3RlciB0byBwcmV2ZW50IHRoZSBoZWFkZXIgZnJvbSBjb2xsYXBzaW5nIC0tPlxuICAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImxhYmVsXCI+ICR7dGhpcy5sYWJlbC5sZW5ndGggPiAwID8gdGhpcy5sYWJlbCA6IFN0cmluZy5mcm9tQ2hhckNvZGUoODIwMyl9IDwvc2xvdD5cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIDxkaXYgcGFydD1cImhlYWRlci1hY3Rpb25zXCIgY2xhc3M9XCJoZWFkZXItYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImhlYWRlci1hY3Rpb25zXCI+PC9zbG90PlxuICAgICAgICAgICAgICAgICAgPHdhLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBwYXJ0PVwiY2xvc2UtYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0cGFydHM9XCJiYXNlOmNsb3NlLWJ1dHRvbl9fYmFzZVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICBhcHBlYXJhbmNlPVwicGxhaW5cIlxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCIkeyhldmVudCkgPT4gdGhpcy5yZXF1ZXN0Q2xvc2UoZXZlbnQudGFyZ2V0KX1cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8d2EtaWNvblxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ4bWFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw9JHt0aGlzLmxvY2FsaXplLnRlcm0oXCJjbG9zZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgICBsaWJyYXJ5PVwic3lzdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwic29saWRcIlxuICAgICAgICAgICAgICAgICAgICA+PC93YS1pY29uPlxuICAgICAgICAgICAgICAgICAgPC93YS1idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgYCA6IFwiXCJ9XG5cbiAgICAgICAgPGRpdiBwYXJ0PVwiYm9keVwiIGNsYXNzPVwiYm9keVwiPjxzbG90Pjwvc2xvdD48L2Rpdj5cblxuICAgICAgICAke2hhc0Zvb3RlciA/IGh0bWxgXG4gICAgICAgICAgICAgIDxmb290ZXIgcGFydD1cImZvb3RlclwiIGNsYXNzPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImZvb3RlclwiPjwvc2xvdD5cbiAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICBgIDogXCJcIn1cbiAgICAgIDwvZGlhbG9nPlxuICAgIGA7XG4gIH1cbn07XG5XYURpYWxvZy5jc3MgPSBkaWFsb2dfc3R5bGVzX2RlZmF1bHQ7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBxdWVyeShcIi5kaWFsb2dcIilcbl0sIFdhRGlhbG9nLnByb3RvdHlwZSwgXCJkaWFsb2dcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4sIHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhRGlhbG9nLnByb3RvdHlwZSwgXCJvcGVuXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYURpYWxvZy5wcm90b3R5cGUsIFwibGFiZWxcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJ3aXRob3V0LWhlYWRlclwiLCB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYURpYWxvZy5wcm90b3R5cGUsIFwid2l0aG91dEhlYWRlclwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcImxpZ2h0LWRpc21pc3NcIiwgdHlwZTogQm9vbGVhbiB9KVxuXSwgV2FEaWFsb2cucHJvdG90eXBlLCBcImxpZ2h0RGlzbWlzc1wiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHdhdGNoKFwib3BlblwiLCB7IHdhaXRVbnRpbEZpcnN0VXBkYXRlOiB0cnVlIH0pXG5dLCBXYURpYWxvZy5wcm90b3R5cGUsIFwiaGFuZGxlT3BlbkNoYW5nZVwiLCAxKTtcbldhRGlhbG9nID0gX19kZWNvcmF0ZUNsYXNzKFtcbiAgY3VzdG9tRWxlbWVudChcIndhLWRpYWxvZ1wiKVxuXSwgV2FEaWFsb2cpO1xuaWYgKCFpc1NlcnZlcikge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZGlhbG9nQXR0ckVsID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1kaWFsb2ddXCIpO1xuICAgIGlmIChkaWFsb2dBdHRyRWwgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICBjb25zdCBbY29tbWFuZCwgaWRdID0gcGFyc2VTcGFjZURlbGltaXRlZFRva2VucyhkaWFsb2dBdHRyRWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1kaWFsb2dcIikgfHwgXCJcIik7XG4gICAgICBpZiAoY29tbWFuZCA9PT0gXCJvcGVuXCIgJiYgaWQ/Lmxlbmd0aCkge1xuICAgICAgICBjb25zdCBkb2MgPSBkaWFsb2dBdHRyRWwuZ2V0Um9vdE5vZGUoKTtcbiAgICAgICAgY29uc3QgZGlhbG9nID0gZG9jLmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgaWYgKGRpYWxvZz8ubG9jYWxOYW1lID09PSBcIndhLWRpYWxvZ1wiKSB7XG4gICAgICAgICAgZGlhbG9nLm9wZW4gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgQSBkaWFsb2cgd2l0aCBhbiBJRCBvZiBcIiR7aWR9XCIgY291bGQgbm90IGJlIGZvdW5kIGluIHRoaXMgZG9jdW1lbnQuYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgKCkgPT4ge1xuICB9KTtcbn1cblxuZXhwb3J0IHtcbiAgV2FEaWFsb2dcbn07XG4iLCAiaW1wb3J0IHsgTGl0RWxlbWVudCwgaHRtbCB9IGZyb20gJ2xpdCc7XG5pbXBvcnQgeyBjdXN0b21FbGVtZW50LCBzdGF0ZSB9IGZyb20gJ2xpdC9kZWNvcmF0b3JzLmpzJztcbmltcG9ydCB0eXBlIHsgVGhyZWFkLCBBbmNob3IgfSBmcm9tICcuLi8uLi90eXBlcy50cyc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi4vbGliL2FwaS50cyc7XG5pbXBvcnQgeyBlbnN1cmVBdXRob3IsIGluaXRJZGVudGl0eSB9IGZyb20gJy4uL2xpYi9pZGVudGl0eS50cyc7XG5pbXBvcnQgeyBjb21wdXRlQW5jaG9yLCBnZXRTZWxlY3Rpb25Qb3NpdGlvbiwgaXNXaXRoaW5Db250ZW50IH0gZnJvbSAnLi4vbGliL3NlbGVjdGlvbi50cyc7XG5pbXBvcnQgeyBpbml0VGhlbWVCcmlkZ2UgfSBmcm9tICcuLi9saWIvdGhlbWUudHMnO1xuXG5pbXBvcnQgJy4vdGhyZWFkcy1wb3BvdmVyLnRzJztcbmltcG9ydCAnLi90aHJlYWRzLWlubGluZS1lZGl0b3IudHMnO1xuXG5pbXBvcnQgJ0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cuanMnO1xuaW1wb3J0ICdAYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY29tcG9uZW50cy9idXR0b24vYnV0dG9uLmpzJztcbmltcG9ydCAnQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NvbXBvbmVudHMvaWNvbi9pY29uLmpzJztcblxuQGN1c3RvbUVsZW1lbnQoJ3RocmVhZHMtYXBwJylcbmV4cG9ydCBjbGFzcyBUaHJlYWRzQXBwIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIG92ZXJyaWRlIGNyZWF0ZVJlbmRlclJvb3QoKSB7IHJldHVybiB0aGlzOyB9XG5cbiAgQHN0YXRlKCkgcHJpdmF0ZSB0aHJlYWRzOiBUaHJlYWRbXSA9IFtdO1xuICBAc3RhdGUoKSBwcml2YXRlIHBvcG92ZXJBY3RpdmUgPSBmYWxzZTtcbiAgQHN0YXRlKCkgcHJpdmF0ZSBwb3BvdmVyWCA9IDA7XG4gIEBzdGF0ZSgpIHByaXZhdGUgcG9wb3ZlclkgPSAwO1xuXG4gIHByaXZhdGUgcGVuZGluZ0FuY2hvcjogQW5jaG9yIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcGVuZGluZ0Jsb2NrRWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgZGVsZXRlVGFyZ2V0OiB7IHR5cGU6ICd0aHJlYWQnIHwgJ2NvbW1lbnQnOyBpZDogc3RyaW5nOyB0aHJlYWRJZD86IHN0cmluZyB9IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgaW5saW5lRWRpdG9yRWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgb3ZlcnJpZGUgZGlzY29ubmVjdGVkQ2FsbGJhY2soKTogdm9pZCB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZU91dHNpZGVQb3BvdmVyQ2xpY2spO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RvY21kOnBhZ2UtbW91bnRlZCcsIHRoaXMuaGFuZGxlUGFnZU1vdW50ZWQgYXMgRXZlbnRMaXN0ZW5lcik7XG4gIH1cblxuICBvdmVycmlkZSBjb25uZWN0ZWRDYWxsYmFjaygpOiB2b2lkIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIGluaXRUaGVtZUJyaWRnZSgpO1xuICAgIGluaXRJZGVudGl0eSgpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlT3V0c2lkZVBvcG92ZXJDbGljayk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZG9jbWQ6cGFnZS1tb3VudGVkJywgdGhpcy5oYW5kbGVQYWdlTW91bnRlZCBhcyBFdmVudExpc3RlbmVyKTtcblxuICAgIHRoaXMubG9hZFRocmVhZHMoKTtcbiAgICB0aGlzLmluamVjdE5ld1RocmVhZEJ1dHRvbigpO1xuXG4gICAgLy8gUmVnaXN0ZXIgYWZ0ZXJSZWxvYWQgaGFuZGxlciBmb3IgcG9zdC1tdXRhdGlvbiBjb250aW51aXR5XG4gICAgaWYgKHR5cGVvZiBkb2NtZCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jbWQuYWZ0ZXJSZWxvYWQpIHtcbiAgICAgIGRvY21kLmFmdGVyUmVsb2FkKCd0aHJlYWRzJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRUaHJlYWRzKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0TmV3VGhyZWFkQnV0dG9uKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgY29udGVudCBhcmVhIG9mIHRoZSBwYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRDb250ZW50QXJlYSgpOiBFbGVtZW50IHwgbnVsbCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRvY21kLWNvbnRlbnRdJylcbiAgICAgIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kb2NtZC1jb250ZW50JylcbiAgICAgIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FydGljbGUnKVxuICAgICAgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIGluc2VydGlvbiBwb2ludCBmb3IgYSBuZXcgdG9wLWxldmVsIHRocmVhZC5cbiAgICogSWYgdGhlIGZpcnN0IG9yIHNlY29uZCBjaGlsZCBvZiB0aGUgY29udGVudCBhcmVhIGlzIGEgaGVhZGluZywgaW5zZXJ0IGFmdGVyIGl0LlxuICAgKiBPdGhlcndpc2UgaW5zZXJ0IGF0IHRoZSB2ZXJ5IHRvcC5cbiAgICovXG4gIHByaXZhdGUgZmluZE5ld1RocmVhZEluc2VydGlvblBvaW50KCk6IHsgbW9kZTogJ2FmdGVyJzsgZWw6IEVsZW1lbnQgfSB8IHsgbW9kZTogJ3ByZXBlbmQnOyBlbDogRWxlbWVudCB9IHwgbnVsbCB7XG4gICAgY29uc3QgY29udGVudEFyZWEgPSB0aGlzLmdldENvbnRlbnRBcmVhKCk7XG4gICAgaWYgKCFjb250ZW50QXJlYSkgcmV0dXJuIG51bGw7XG5cbiAgICAvLyBHZXQgdGhlIGRpcmVjdCBjaGlsZHJlbiB0aGF0IGFyZSBlbGVtZW50cyAoc2tpcCB0ZXh0IG5vZGVzLCB3aGl0ZXNwYWNlKVxuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShjb250ZW50QXJlYS5jaGlsZHJlbik7XG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHsgbW9kZTogJ3ByZXBlbmQnLCBlbDogY29udGVudEFyZWEgfTtcblxuICAgIGNvbnN0IEhFQURJTkdfVEFHUyA9IG5ldyBTZXQoWydIMScsICdIMicsICdIMycsICdINCcsICdINScsICdINiddKTtcblxuICAgIC8vIENoZWNrIGZpcnN0IHR3byBlbGVtZW50cyBmb3IgYSBoZWFkaW5nXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLm1pbigyLCBjaGlsZHJlbi5sZW5ndGgpOyBpKyspIHtcbiAgICAgIGlmIChIRUFESU5HX1RBR1MuaGFzKGNoaWxkcmVuW2ldLnRhZ05hbWUpKSB7XG4gICAgICAgIHJldHVybiB7IG1vZGU6ICdhZnRlcicsIGVsOiBjaGlsZHJlbltpXSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IG1vZGU6ICdwcmVwZW5kJywgZWw6IGNvbnRlbnRBcmVhIH07XG4gIH1cblxuICAvKipcbiAgICogSW5qZWN0IGEgXCJOZXcgVGhyZWFkXCIgYnV0dG9uIGF0IHRoZSB0b3Agb2YgdGhlIGNvbnRlbnQgYXJlYS5cbiAgICovXG4gIHByaXZhdGUgaW5qZWN0TmV3VGhyZWFkQnV0dG9uKCk6IHZvaWQge1xuICAgIC8vIFJlbW92ZSBleGlzdGluZyBidXR0b24gaWYgcHJlc2VudCAoZS5nLiBhZnRlciByZWxvYWQpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRocmVhZHMtbmV3LXRocmVhZC1idG4nKT8ucmVtb3ZlKCk7XG5cbiAgICBjb25zdCBpbnNlcnRpb25Qb2ludCA9IHRoaXMuZmluZE5ld1RocmVhZEluc2VydGlvblBvaW50KCk7XG4gICAgaWYgKCFpbnNlcnRpb25Qb2ludCkgcmV0dXJuO1xuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnRuLmNsYXNzTmFtZSA9ICd0aHJlYWRzLW5ldy10aHJlYWQtYnRuJztcbiAgICBidG4uaW5uZXJIVE1MID0gYDx3YS1pY29uIG5hbWU9XCJwbHVzXCIgc3R5bGU9XCJmb250LXNpemU6MTRweDtcIj48L3dhLWljb24+IE5ldyBUaHJlYWRgO1xuICAgIGJ0bi50aXRsZSA9ICdTdGFydCBhIG5ldyBkaXNjdXNzaW9uIHRocmVhZCc7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnN0YXJ0TmV3VGhyZWFkKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoaW5zZXJ0aW9uUG9pbnQubW9kZSA9PT0gJ2FmdGVyJykge1xuICAgICAgaW5zZXJ0aW9uUG9pbnQuZWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIGJ0bik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc2VydGlvblBvaW50LmVsLmluc2VydEJlZm9yZShidG4sIGluc2VydGlvblBvaW50LmVsLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCBhIG5ldyB0b3AtbGV2ZWwgdGhyZWFkIGJ5IG9wZW5pbmcgYW4gaW5saW5lIGVkaXRvciBhdCB0aGUgaW5zZXJ0aW9uIHBvaW50LlxuICAgKi9cbiAgcHJpdmF0ZSBzdGFydE5ld1RocmVhZCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZUlubGluZUVkaXRvcigpO1xuXG4gICAgY29uc3QgaW5zZXJ0aW9uUG9pbnQgPSB0aGlzLmZpbmROZXdUaHJlYWRJbnNlcnRpb25Qb2ludCgpO1xuICAgIGlmICghaW5zZXJ0aW9uUG9pbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGVkaXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RocmVhZHMtaW5saW5lLWVkaXRvcicpIGFzIGFueTtcbiAgICBlZGl0b3IucXVvdGUgPSAnJztcblxuICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKCdpbmxpbmUtc3VibWl0JywgYXN5bmMgKGU6IEN1c3RvbUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBhdXRob3IgPSBlbnN1cmVBdXRob3IoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGFwaS5jcmVhdGVUaHJlYWQoe1xuICAgICAgICAgIGFuY2hvcjogbnVsbCxcbiAgICAgICAgICBhdXRob3IsXG4gICAgICAgICAgYm9keTogZS5kZXRhaWwuYm9keSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVtb3ZlSW5saW5lRWRpdG9yKCk7XG4gICAgICAgIGlmICh0eXBlb2YgZG9jbWQgIT09ICd1bmRlZmluZWQnICYmIGRvY21kLnNjaGVkdWxlUmVsb2FkKSB7XG4gICAgICAgICAgZG9jbWQuc2NoZWR1bGVSZWxvYWQoJ3RocmVhZHMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRUaHJlYWRzKCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbdGhyZWFkc10gRmFpbGVkIHRvIGNyZWF0ZSB0aHJlYWQ6JywgZXJyKTtcbiAgICAgICAgZWRpdG9yLnN1Ym1pdHRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKCdpbmxpbmUtY2FuY2VsJywgKCkgPT4gdGhpcy5yZW1vdmVJbmxpbmVFZGl0b3IoKSk7XG5cbiAgICBpZiAoaW5zZXJ0aW9uUG9pbnQubW9kZSA9PT0gJ2FmdGVyJykge1xuICAgICAgaW5zZXJ0aW9uUG9pbnQuZWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIGVkaXRvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc2VydGlvblBvaW50LmVsLmluc2VydEJlZm9yZShlZGl0b3IsIGluc2VydGlvblBvaW50LmVsLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICB0aGlzLmlubGluZUVkaXRvckVsID0gZWRpdG9yO1xuICB9XG5cbiAgLy8gXHUyNTAwXHUyNTAwXHUyNTAwIFNlbGVjdGlvbiBwb3BvdmVyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4gIHByaXZhdGUgaGFuZGxlTW91c2VVcCA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgY29uc3QgcG9wb3ZlciA9IHRoaXMucXVlcnlTZWxlY3RvcigndGhyZWFkcy1wb3BvdmVyJyk7XG4gICAgaWYgKHBvcG92ZXI/LmNvbnRhaW5zKGUudGFyZ2V0IGFzIE5vZGUpKSByZXR1cm47XG5cbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKCFzZWxlY3Rpb24gfHwgc2VsZWN0aW9uLmlzQ29sbGFwc2VkKSB7XG4gICAgICB0aGlzLnBvcG92ZXJBY3RpdmUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXNlbGVjdGlvbi5hbmNob3JOb2RlIHx8ICFpc1dpdGhpbkNvbnRlbnQoc2VsZWN0aW9uLmFuY2hvck5vZGUpKSByZXR1cm47XG5cbiAgICBjb25zdCBhbmNob3IgPSBjb21wdXRlQW5jaG9yKHNlbGVjdGlvbik7XG4gICAgaWYgKCFhbmNob3IpIHJldHVybjtcblxuICAgIGNvbnN0IHBvcyA9IGdldFNlbGVjdGlvblBvc2l0aW9uKHNlbGVjdGlvbik7XG4gICAgaWYgKCFwb3MpIHJldHVybjtcblxuICAgIC8vIEZpbmQgdGhlIGVuY2xvc2luZyBibG9jayBlbGVtZW50IGZvciBpbmxpbmUgZWRpdG9yIGluc2VydGlvblxuICAgIGNvbnN0IEJMT0NLX1RBR1MgPSBuZXcgU2V0KFtcIlBcIiwgXCJESVZcIiwgXCJMSVwiLCBcIkJMT0NLUVVPVEVcIiwgXCJQUkVcIiwgXCJIMVwiLCBcIkgyXCIsIFwiSDNcIiwgXCJINFwiLCBcIkg1XCIsIFwiSDZcIl0pO1xuICAgIGxldCBibG9ja0VsOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIGxldCBub2RlOiBOb2RlIHwgbnVsbCA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApLnN0YXJ0Q29udGFpbmVyO1xuICAgIHdoaWxlIChub2RlICYmIG5vZGUgIT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgQkxPQ0tfVEFHUy5oYXMobm9kZS50YWdOYW1lKSkge1xuICAgICAgICBibG9ja0VsID0gbm9kZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIHRoaXMucGVuZGluZ0FuY2hvciA9IGFuY2hvcjtcbiAgICB0aGlzLnBlbmRpbmdCbG9ja0VsID0gYmxvY2tFbDtcbiAgICB0aGlzLnBvcG92ZXJYID0gcG9zLng7XG4gICAgdGhpcy5wb3BvdmVyWSA9IHBvcy55O1xuICAgIHRoaXMucG9wb3ZlckFjdGl2ZSA9IHRydWU7XG4gIH07XG5cbiAgcHJpdmF0ZSBoYW5kbGVPdXRzaWRlUG9wb3ZlckNsaWNrID0gKGU6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5xdWVyeVNlbGVjdG9yKCd0aHJlYWRzLXBvcG92ZXInKTtcbiAgICBpZiAocG9wb3ZlciAmJiAhZS5jb21wb3NlZFBhdGgoKS5pbmNsdWRlcyhwb3BvdmVyKSkge1xuICAgICAgdGhpcy5wb3BvdmVyQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGUgcG9wb3ZlciBcImFkZCBjb21tZW50XCIgXHUyMDE0IG9wZW4gaW5saW5lIGVkaXRvciBhZnRlciB0aGUgYmxvY2suXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUFkZENvbW1lbnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnBlbmRpbmdBbmNob3IgfHwgIXRoaXMucGVuZGluZ0Jsb2NrRWwpIHJldHVybjtcblxuICAgIHRoaXMucmVtb3ZlSW5saW5lRWRpdG9yKCk7XG4gICAgdGhpcy5wb3BvdmVyQWN0aXZlID0gZmFsc2U7XG5cbiAgICBjb25zdCBhbmNob3IgPSB0aGlzLnBlbmRpbmdBbmNob3I7XG4gICAgY29uc3QgYmxvY2tFbCA9IHRoaXMucGVuZGluZ0Jsb2NrRWw7XG4gICAgdGhpcy5wZW5kaW5nQW5jaG9yID0gbnVsbDtcbiAgICB0aGlzLnBlbmRpbmdCbG9ja0VsID0gbnVsbDtcbiAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk/LnJlbW92ZUFsbFJhbmdlcygpO1xuXG4gICAgY29uc3QgZWRpdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhyZWFkcy1pbmxpbmUtZWRpdG9yJykgYXMgYW55O1xuICAgIGVkaXRvci5xdW90ZSA9IGFuY2hvci5xdW90ZSB8fCAnJztcblxuICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKCdpbmxpbmUtc3VibWl0JywgYXN5bmMgKGU6IEN1c3RvbUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBhdXRob3IgPSBlbnN1cmVBdXRob3IoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGFwaS5jcmVhdGVUaHJlYWQoe1xuICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICBhdXRob3IsXG4gICAgICAgICAgYm9keTogZS5kZXRhaWwuYm9keSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVtb3ZlSW5saW5lRWRpdG9yKCk7XG4gICAgICAgIGlmICh0eXBlb2YgZG9jbWQgIT09ICd1bmRlZmluZWQnICYmIGRvY21kLnNjaGVkdWxlUmVsb2FkKSB7XG4gICAgICAgICAgZG9jbWQuc2NoZWR1bGVSZWxvYWQoJ3RocmVhZHMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRUaHJlYWRzKCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbdGhyZWFkc10gRmFpbGVkIHRvIGNyZWF0ZSB0aHJlYWQ6JywgZXJyKTtcbiAgICAgICAgZWRpdG9yLnN1Ym1pdHRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKCdpbmxpbmUtY2FuY2VsJywgKCkgPT4gdGhpcy5yZW1vdmVJbmxpbmVFZGl0b3IoKSk7XG5cbiAgICBibG9ja0VsLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBlZGl0b3IpO1xuICAgIHRoaXMuaW5saW5lRWRpdG9yRWwgPSBlZGl0b3I7XG4gIH1cblxuICAvLyBcdTI1MDBcdTI1MDBcdTI1MDAgUGFnZSBsaWZlY3ljbGUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG5cbiAgcHJpdmF0ZSBoYW5kbGVQYWdlTW91bnRlZCA9IChfZTogQ3VzdG9tRXZlbnQpOiB2b2lkID0+IHtcbiAgICB0aGlzLnBvcG92ZXJBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmxvYWRUaHJlYWRzKCk7XG4gICAgdGhpcy5pbmplY3ROZXdUaHJlYWRCdXR0b24oKTtcbiAgfTtcblxuICBwcml2YXRlIGFzeW5jIGxvYWRUaHJlYWRzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnRocmVhZHMgPSBhd2FpdCBhcGkuZmV0Y2hUaHJlYWRzKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdbdGhyZWFkc10gRmFpbGVkIHRvIGxvYWQgdGhyZWFkczonLCBlcnIpO1xuICAgICAgdGhpcy50aHJlYWRzID0gW107XG4gICAgfVxuICAgIHRoaXMuc2NhblJlbmRlcmVkSGlnaGxpZ2h0cygpO1xuICB9XG5cbiAgLy8gQ29sb3IgcGFsZXR0ZSBmb3IgaGlnaGxpZ2h0cyBcdTIwMTQgY3ljbGVzIHRocm91Z2ggdGhlc2VcbiAgcHJpdmF0ZSBzdGF0aWMgSElHSExJR0hUX0NPTE9SUyA9IFtcbiAgICAndGhyZWFkcy1obC15ZWxsb3cnLFxuICAgICd0aHJlYWRzLWhsLWJsdWUnLFxuICAgICd0aHJlYWRzLWhsLWdyZWVuJyxcbiAgICAndGhyZWFkcy1obC1waW5rJyxcbiAgICAndGhyZWFkcy1obC1wdXJwbGUnLFxuICAgICd0aHJlYWRzLWhsLW9yYW5nZScsXG4gIF07XG5cbiAgLyoqXG4gICAqIFNjYW4gdGhlIERPTSBmb3IgPG1hcmsgY2xhc3M9XCJ0aHJlYWRzLWhpZ2hsaWdodFwiIGRhdGEtdGhyZWFkLWlkPVwiLi4uXCI+IGVsZW1lbnRzLlxuICAgKiBBc3NpZ25zIGN5Y2xpbmcgaGlnaGxpZ2h0IGNvbG9ycywgbW92ZXMgdGhyZWFkIGNhcmRzIGlubGluZSBhZnRlciB0aGUgYmxvY2tcbiAgICogY29udGFpbmluZyB0aGUgaGlnaGxpZ2h0LCBhbmQgYXR0YWNoZXMgY2xpY2sgaGFuZGxlcnMuXG4gICAqL1xuICBwcml2YXRlIHNjYW5SZW5kZXJlZEhpZ2hsaWdodHMoKTogdm9pZCB7XG4gICAgY29uc3QgbWFya3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignbWFyay50aHJlYWRzLWhpZ2hsaWdodFtkYXRhLXRocmVhZC1pZF0nKTtcbiAgICBjb25zdCBCTE9DS19UQUdTID0gbmV3IFNldChbJ1AnLCAnRElWJywgJ0xJJywgJ0JMT0NLUVVPVEUnLCAnUFJFJywgJ0gxJywgJ0gyJywgJ0gzJywgJ0g0JywgJ0g1JywgJ0g2JywgJ1VMJywgJ09MJywgJ1RBQkxFJ10pO1xuICAgIGxldCBjb2xvckluZGV4ID0gMDtcblxuICAgIGZvciAoY29uc3QgbWFyayBvZiBtYXJrcykge1xuICAgICAgY29uc3QgdGhyZWFkSWQgPSBtYXJrLmRhdGFzZXQudGhyZWFkSWQ7XG4gICAgICBpZiAoIXRocmVhZElkKSBjb250aW51ZTtcblxuICAgICAgLy8gMS4gQXNzaWduIGN5Y2xpbmcgaGlnaGxpZ2h0IGNvbG9yXG4gICAgICBjb25zdCBjb2xvckNsYXNzID0gVGhyZWFkc0FwcC5ISUdITElHSFRfQ09MT1JTW2NvbG9ySW5kZXggJSBUaHJlYWRzQXBwLkhJR0hMSUdIVF9DT0xPUlMubGVuZ3RoXTtcbiAgICAgIG1hcmsuY2xhc3NMaXN0LmFkZChjb2xvckNsYXNzKTtcbiAgICAgIGNvbG9ySW5kZXgrKztcblxuICAgICAgLy8gMi4gTW92ZSB0aHJlYWQgY2FyZCBmcm9tIHRoZSBib3R0b20gdGhyZWFkcy1zaWRlYmFyIHRvIGFmdGVyIHRoZSBlbmNsb3NpbmcgYmxvY2tcbiAgICAgIGNvbnN0IHRocmVhZEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYC50aHJlYWRzLXRocmVhZFtkYXRhLXRocmVhZC1pZD1cIiR7dGhyZWFkSWR9XCJdYCk7XG4gICAgICBpZiAodGhyZWFkRWwpIHtcbiAgICAgICAgLy8gQXBwbHkgbWF0Y2hpbmcgYm9yZGVyIGNvbG9yXG4gICAgICAgIHRocmVhZEVsLmNsYXNzTGlzdC5hZGQoY29sb3JDbGFzcy5yZXBsYWNlKCd0aHJlYWRzLWhsLScsICd0aHJlYWRzLWJvcmRlci0nKSk7XG5cbiAgICAgICAgLy8gRmluZCB0aGUgZW5jbG9zaW5nIGJsb2NrIGVsZW1lbnQgb2YgdGhlIGhpZ2hsaWdodFxuICAgICAgICBsZXQgYmxvY2tFbDogRWxlbWVudCB8IG51bGwgPSBtYXJrO1xuICAgICAgICB3aGlsZSAoYmxvY2tFbCAmJiBibG9ja0VsICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgaWYgKGJsb2NrRWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBCTE9DS19UQUdTLmhhcyhibG9ja0VsLnRhZ05hbWUpKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYmxvY2tFbCA9IGJsb2NrRWwucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChibG9ja0VsICYmIGJsb2NrRWwgIT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICBibG9ja0VsLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCB0aHJlYWRFbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gMy4gQ2xpY2sgaGFuZGxlcjogc2Nyb2xsIHRvIHRocmVhZCBhbmQgZmxhc2hcbiAgICAgIG1hcmsuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgbWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudGhyZWFkcy10aHJlYWRbZGF0YS10aHJlYWQtaWQ9XCIke3RocmVhZElkfVwiXWApO1xuICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICBlbC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInIH0pO1xuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3RocmVhZHMtdGhyZWFkLS1mbGFzaCcpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgndGhyZWFkcy10aHJlYWQtLWZsYXNoJyksIDIwMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyA0LiBJbmplY3QgcmVwbHkgYnV0dG9ucyBpbnRvIGFsbCB0aHJlYWQgY2FyZHNcbiAgICB0aGlzLmluamVjdFJlcGx5QnV0dG9ucygpO1xuXG4gICAgLy8gSGlkZSB0aGUgbm93LWVtcHR5IHRocmVhZHMtc2lkZWJhciB3cmFwcGVyXG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aHJlYWRzLXNpZGViYXInKTtcbiAgICBpZiAoc2lkZWJhciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICBzaWRlYmFyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIFwiUmVwbHlcIiBidXR0b24gdG8gdGhlIGJvdHRvbSBvZiBlYWNoIC50aHJlYWRzLXRocmVhZCBjYXJkLlxuICAgKi9cbiAgcHJpdmF0ZSBpbmplY3RSZXBseUJ1dHRvbnMoKTogdm9pZCB7XG4gICAgY29uc3QgdGhyZWFkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KCcudGhyZWFkcy10aHJlYWRbZGF0YS10aHJlYWQtaWRdJyk7XG4gICAgZm9yIChjb25zdCB0aHJlYWRFbCBvZiB0aHJlYWRzKSB7XG4gICAgICAvLyBTa2lwIGlmIGFscmVhZHkgaGFzIGEgcmVwbHkgYnV0dG9uXG4gICAgICBpZiAodGhyZWFkRWwucXVlcnlTZWxlY3RvcignLnRocmVhZHMtcmVwbHktYnRuJykpIGNvbnRpbnVlO1xuXG4gICAgICBjb25zdCB0aHJlYWRJZCA9IHRocmVhZEVsLmRhdGFzZXQudGhyZWFkSWQ7XG4gICAgICBpZiAoIXRocmVhZElkKSBjb250aW51ZTtcblxuICAgICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBmb290ZXIuY2xhc3NOYW1lID0gJ3RocmVhZHMtdGhyZWFkX19mb290ZXInO1xuXG4gICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIGJ0bi5jbGFzc05hbWUgPSAndGhyZWFkcy1yZXBseS1idG4nO1xuICAgICAgYnRuLmlubmVySFRNTCA9IGA8d2EtaWNvbiBuYW1lPVwicmVwbHlcIiBzdHlsZT1cImZvbnQtc2l6ZToxM3B4O1wiPjwvd2EtaWNvbj4gUmVwbHlgO1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5vcGVuUmVwbHlFZGl0b3IodGhyZWFkRWwsIHRocmVhZElkKTtcbiAgICAgIH0pO1xuXG4gICAgICBmb290ZXIuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgIHRocmVhZEVsLmFwcGVuZENoaWxkKGZvb3Rlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW4gYW4gaW5saW5lIGVkaXRvciBhdCB0aGUgYm90dG9tIG9mIGEgdGhyZWFkIGNhcmQgZm9yIHJlcGx5aW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBvcGVuUmVwbHlFZGl0b3IodGhyZWFkRWw6IEhUTUxFbGVtZW50LCB0aHJlYWRJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVJbmxpbmVFZGl0b3IoKTtcblxuICAgIGNvbnN0IGVkaXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RocmVhZHMtaW5saW5lLWVkaXRvcicpIGFzIGFueTtcbiAgICBlZGl0b3IucXVvdGUgPSAnJztcblxuICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKCdpbmxpbmUtc3VibWl0JywgYXN5bmMgKGU6IEN1c3RvbUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBhdXRob3IgPSBlbnN1cmVBdXRob3IoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGFwaS5hZGRDb21tZW50KHRocmVhZElkLCB7XG4gICAgICAgICAgYXV0aG9yLFxuICAgICAgICAgIGJvZHk6IGUuZGV0YWlsLmJvZHksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbW92ZUlubGluZUVkaXRvcigpO1xuICAgICAgICBpZiAodHlwZW9mIGRvY21kICE9PSAndW5kZWZpbmVkJyAmJiBkb2NtZC5zY2hlZHVsZVJlbG9hZCkge1xuICAgICAgICAgIGRvY21kLnNjaGVkdWxlUmVsb2FkKCd0aHJlYWRzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5sb2FkVGhyZWFkcygpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW3RocmVhZHNdIEZhaWxlZCB0byBhZGQgcmVwbHk6JywgZXJyKTtcbiAgICAgICAgZWRpdG9yLnN1Ym1pdHRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVkaXRvci5hZGRFdmVudExpc3RlbmVyKCdpbmxpbmUtY2FuY2VsJywgKCkgPT4gdGhpcy5yZW1vdmVJbmxpbmVFZGl0b3IoKSk7XG5cbiAgICAvLyBJbnNlcnQgZWRpdG9yIGJlZm9yZSB0aGUgZm9vdGVyIChyZXBseSBidXR0b24pXG4gICAgY29uc3QgZm9vdGVyID0gdGhyZWFkRWwucXVlcnlTZWxlY3RvcignLnRocmVhZHMtdGhyZWFkX19mb290ZXInKTtcbiAgICBpZiAoZm9vdGVyKSB7XG4gICAgICB0aHJlYWRFbC5pbnNlcnRCZWZvcmUoZWRpdG9yLCBmb290ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJlYWRFbC5hcHBlbmRDaGlsZChlZGl0b3IpO1xuICAgIH1cbiAgICB0aGlzLmlubGluZUVkaXRvckVsID0gZWRpdG9yO1xuICB9XG5cbiAgLy8gXHUyNTAwXHUyNTAwXHUyNTAwIElubGluZSBlZGl0b3IgaGVscGVycyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuICBwcml2YXRlIHJlbW92ZUlubGluZUVkaXRvcigpOiB2b2lkIHtcbiAgICB0aGlzLmlubGluZUVkaXRvckVsPy5yZW1vdmUoKTtcbiAgICB0aGlzLmlubGluZUVkaXRvckVsID0gbnVsbDtcbiAgfVxuXG4gIC8vIFx1MjUwMFx1MjUwMFx1MjUwMCBEZWxldGUgY29uZmlybWF0aW9uIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4gIHByaXZhdGUgaGFuZGxlRGVsZXRlUmVxdWVzdChlOiBDdXN0b21FdmVudCwgdHlwZTogJ3RocmVhZCcgfCAnY29tbWVudCcpOiB2b2lkIHtcbiAgICBjb25zdCBpZCA9IHR5cGUgPT09ICd0aHJlYWQnID8gZS5kZXRhaWwudGhyZWFkSWQgOiBlLmRldGFpbC5jb21tZW50SWQ7XG4gICAgY29uc3QgdGhyZWFkSWQgPSB0eXBlID09PSAnY29tbWVudCcgPyBlLmRldGFpbC50aHJlYWRJZCA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRlbGV0ZVRhcmdldCA9IHsgdHlwZSwgaWQsIHRocmVhZElkIH07XG4gICAgY29uc3QgZGlhbG9nID0gdGhpcy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50ICYgeyBvcGVuOiBib29sZWFuIH0+KCcjZGVsZXRlLWRpYWxvZycpO1xuICAgIGlmIChkaWFsb2cpIGRpYWxvZy5vcGVuID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY29uZmlybURlbGV0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkaWFsb2cgPSB0aGlzLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQgJiB7IG9wZW46IGJvb2xlYW4gfT4oJyNkZWxldGUtZGlhbG9nJyk7XG4gICAgaWYgKGRpYWxvZykgZGlhbG9nLm9wZW4gPSBmYWxzZTtcblxuICAgIGlmICghdGhpcy5kZWxldGVUYXJnZXQpIHJldHVybjtcbiAgICBpZiAodGhpcy5kZWxldGVUYXJnZXQudHlwZSA9PT0gJ3RocmVhZCcpIHtcbiAgICAgIGF3YWl0IGFwaS5kZWxldGVUaHJlYWQodGhpcy5kZWxldGVUYXJnZXQuaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBhcGkuZGVsZXRlQ29tbWVudCh0aGlzLmRlbGV0ZVRhcmdldC50aHJlYWRJZCEsIHRoaXMuZGVsZXRlVGFyZ2V0LmlkKTtcbiAgICB9XG4gICAgdGhpcy5kZWxldGVUYXJnZXQgPSBudWxsO1xuICAgIGlmICh0eXBlb2YgZG9jbWQgIT09ICd1bmRlZmluZWQnICYmIGRvY21kLnNjaGVkdWxlUmVsb2FkKSB7XG4gICAgICBkb2NtZC5zY2hlZHVsZVJlbG9hZCgndGhyZWFkcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB0aGlzLmxvYWRUaHJlYWRzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYW5jZWxEZWxldGUoKTogdm9pZCB7XG4gICAgY29uc3QgZGlhbG9nID0gdGhpcy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50ICYgeyBvcGVuOiBib29sZWFuIH0+KCcjZGVsZXRlLWRpYWxvZycpO1xuICAgIGlmIChkaWFsb2cpIGRpYWxvZy5vcGVuID0gZmFsc2U7XG4gICAgdGhpcy5kZWxldGVUYXJnZXQgPSBudWxsO1xuICB9XG5cbiAgb3ZlcnJpZGUgcmVuZGVyKCkge1xuICAgIHJldHVybiBodG1sYFxuICAgICAgPHRocmVhZHMtcG9wb3ZlclxuICAgICAgICA/YWN0aXZlPSR7dGhpcy5wb3BvdmVyQWN0aXZlfVxuICAgICAgICAueD0ke3RoaXMucG9wb3Zlclh9XG4gICAgICAgIC55PSR7dGhpcy5wb3BvdmVyWX1cbiAgICAgICAgQGFkZC1jb21tZW50PSR7dGhpcy5oYW5kbGVBZGRDb21tZW50fVxuICAgICAgPjwvdGhyZWFkcy1wb3BvdmVyPlxuXG4gICAgICA8d2EtZGlhbG9nIGlkPVwiZGVsZXRlLWRpYWxvZ1wiIGxhYmVsPVwiQ29uZmlybSBEZWxldGVcIiBsaWdodC1kaXNtaXNzPlxuICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgJHt0aGlzLmRlbGV0ZVRhcmdldD8udHlwZSA/PyAnaXRlbSd9P1xuICAgICAgICA8d2EtYnV0dG9uIHNsb3Q9XCJmb290ZXJcIiBhcHBlYXJhbmNlPVwib3V0bGluZWRcIiBAY2xpY2s9JHt0aGlzLmNhbmNlbERlbGV0ZX0+Q2FuY2VsPC93YS1idXR0b24+XG4gICAgICAgIDx3YS1idXR0b24gc2xvdD1cImZvb3RlclwiIHZhcmlhbnQ9XCJkYW5nZXJcIiBAY2xpY2s9JHt0aGlzLmNvbmZpcm1EZWxldGV9PkRlbGV0ZTwvd2EtYnV0dG9uPlxuICAgICAgPC93YS1kaWFsb2c+XG4gICAgYDtcbiAgfVxufVxuIiwgImltcG9ydCAnQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L3N0eWxlcy90aGVtZXMvZGVmYXVsdC5jc3MnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvdGhyZWFkcy1hcHAudHMnO1xuXG5mdW5jdGlvbiBpbml0KCk6IHZvaWQge1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGhyZWFkcy1hcHAnKSkgcmV0dXJuO1xuICBjb25zdCBhcHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aHJlYWRzLWFwcCcpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcCk7XG59XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXQpO1xufSBlbHNlIHtcbiAgaW5pdCgpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7O0FBTUEsSUFHTUEsSUFBU0M7QUFIZixJQVFhQyxJQUNYRixFQUFPRyxlQUFBQSxXQUNOSCxFQUFPSSxZQUEwQkosRUFBT0ksU0FBU0MsaUJBQ2xELHdCQUF3QkMsU0FBU0MsYUFDakMsYUFBYUMsY0FBY0Q7QUFaN0IsSUE4Qk1FLElBQW9CQyx1QkFBQUE7QUE5QjFCLElBZ0NNQyxJQUFjLG9CQUFJQztBQUFBQSxJQVNYQyxJQVRXRCxNQVNYQztFQU9YLFlBQ0VDLElBQ0FDLElBQ0FDLElBQUFBO0FBRUEsUUFWRkMsS0FBZSxlQUFBLE1BVVRELE9BQWNQLEVBQ2hCLE9BQVVTLE1BQ1IsbUVBQUE7QUFHSkQsU0FBS0gsVUFBVUEsSUFDZkcsS0FBS0Us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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeWhCcEIsV0FBUyxLQUFLLFlBQVksS0FBSztBQUNqQzs7O0FDN2hCQSxJQUFNLGlCQUFpQjtBQUVoQixTQUFTLGtCQUF3QjtBQUN0QyxpQkFBZTtBQUNmLGVBQWE7QUFDYixzQkFBb0I7QUFDcEIsd0JBQXNCO0FBQ3hCO0FBRUEsU0FBUyxpQkFBdUI7QUFDOUIsTUFBSSxTQUFTLGVBQWUsY0FBYyxFQUFHO0FBRTdDLFFBQU0sUUFBUSxTQUFTLGNBQWMsT0FBTztBQUM1QyxRQUFNLEtBQUs7QUFDWCxRQUFNLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF3Q3BCLFdBQVMsS0FBSyxZQUFZLEtBQUs7QUFDakM7QUFFQSxTQUFTLGVBQXFCO0FBQzVCLFFBQU0sU0FBUyxTQUFTLGdCQUFnQixhQUFhLFlBQVksTUFBTTtBQUN2RSxXQUFTLGdCQUFnQixVQUFVLE9BQU8sV0FBVyxNQUFNO0FBQzNELFdBQVMsZ0JBQWdCLFVBQVUsT0FBTyxZQUFZLENBQUMsTUFBTTtBQUMvRDtBQUVBLFNBQVMsc0JBQTRCO0FBQ25DLFFBQU0sV0FBVyxJQUFJLGlCQUFpQixNQUFNLGFBQWEsQ0FBQztBQUMxRCxXQUFTLFFBQVEsU0FBUyxpQkFBaUI7QUFBQSxJQUN6QyxZQUFZO0FBQUEsSUFDWixpQkFBaUIsQ0FBQyxZQUFZO0FBQUEsRUFDaEMsQ0FBQztBQUNIOzs7QUNwRUEsSUFBSSxrQkFBa0IsTUFBTTtBQUMxQixTQUFPO0FBQUEsSUFDTCxjQUFjLFNBQVM7QUFDckIsWUFBTSxjQUFjLFFBQVE7QUFDNUIsWUFBTSxXQUFXO0FBQUEsUUFDZixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsUUFDVCxhQUFhLENBQUM7QUFBQSxNQUNoQjtBQUNBLFVBQUksQ0FBQyxhQUFhO0FBQ2hCLGVBQU87QUFBQSxNQUNUO0FBQ0EsVUFBSSxVQUFVO0FBQ2QsVUFBSSxtQkFBbUIsYUFBYTtBQUNsQyxrQkFBVSxZQUFZLGNBQWM7QUFBQSxNQUN0QztBQUNBLFVBQUksU0FBUztBQUNYLGVBQU87QUFBQSxNQUNUO0FBQ0EsZUFBUyxVQUFVO0FBQ25CLFVBQUksdUJBQXVCLGFBQWE7QUFDdEMsaUJBQVMsVUFBVSxZQUFZO0FBQUEsTUFDakM7QUFDQSxVQUFJLEVBQUUsY0FBYyxjQUFjO0FBQ2hDLGlCQUFTLFlBQVksS0FBSyxhQUFhO0FBQ3ZDLGVBQU87QUFBQSxNQUNUO0FBQ0EsaUJBQVcsT0FBTyxZQUFZLFVBQVU7QUFDdEMsWUFBSSxRQUFRLFNBQVM7QUFDbkI7QUFBQSxRQUNGO0FBQ0EsY0FBTSxhQUFhO0FBQ25CLFlBQUksWUFBWSxTQUFTLFVBQVUsR0FBRztBQUNwQyxtQkFBUyxZQUFZLEtBQUssVUFBVTtBQUFBLFFBQ3RDO0FBQUEsTUFDRjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNGOzs7QUN2Q0EsSUFBSSxpQkFBaUIsY0FBYyxNQUFNO0FBQUEsRUFDdkMsY0FBYztBQUNaLFVBQU0sY0FBYyxFQUFFLFNBQVMsTUFBTSxZQUFZLE9BQU8sVUFBVSxLQUFLLENBQUM7QUFBQSxFQUMxRTtBQUNGOzs7QUNOQSxJQUFJTSxhQUFZLE9BQU87QUFDdkIsSUFBSUMsb0JBQW1CLE9BQU87QUFDOUIsSUFBSSxjQUFjLENBQUMsUUFBUTtBQUN6QixRQUFNLFVBQVUsR0FBRztBQUNyQjtBQUNBLElBQUlDLG1CQUFrQixDQUFDLFlBQVksUUFBUSxLQUFLLFNBQVM7QUFDdkQsTUFBSSxTQUFTLE9BQU8sSUFBSSxTQUFTLE9BQU9ELGtCQUFpQixRQUFRLEdBQUcsSUFBSTtBQUN4RSxXQUFTRSxLQUFJLFdBQVcsU0FBUyxHQUFHLFdBQVdBLE1BQUssR0FBR0E7QUFDckQsUUFBSSxZQUFZLFdBQVdBLEVBQUM7QUFDMUIsZ0JBQVUsT0FBTyxVQUFVLFFBQVEsS0FBSyxNQUFNLElBQUksVUFBVSxNQUFNLE1BQU07QUFDNUUsTUFBSSxRQUFRLE9BQVEsQ0FBQUgsV0FBVSxRQUFRLEtBQUssTUFBTTtBQUNqRCxTQUFPO0FBQ1Q7QUFDQSxJQUFJLGdCQUFnQixDQUFDLEtBQUssUUFBUSxRQUFRLE9BQU8sSUFBSSxHQUFHLEtBQUssWUFBWSxZQUFZLEdBQUc7QUFDeEYsSUFBSSxlQUFlLENBQUMsS0FBSyxRQUFRLFlBQVksY0FBYyxLQUFLLFFBQVEseUJBQXlCLEdBQUcsU0FBUyxPQUFPLEtBQUssR0FBRyxJQUFJLE9BQU8sSUFBSSxHQUFHO0FBQzlJLElBQUksZUFBZSxDQUFDLEtBQUssUUFBUSxVQUFVLE9BQU8sSUFBSSxHQUFHLElBQUksWUFBWSxtREFBbUQsSUFBSSxrQkFBa0IsVUFBVSxPQUFPLElBQUksR0FBRyxJQUFJLE9BQU8sSUFBSSxLQUFLLEtBQUs7QUFDbk0sSUFBSSxlQUFlLENBQUMsS0FBSyxRQUFRLE9BQU8sWUFBWSxjQUFjLEtBQUssUUFBUSx3QkFBd0IsR0FBRyxTQUFTLE9BQU8sS0FBSyxLQUFLLEtBQUssSUFBSSxPQUFPLElBQUksS0FBSyxLQUFLLEdBQUc7OztBQ0hySyxJQUFJLHNCQUFzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpQjFCLElBQUk7QUFDSixJQUFJLG9CQUFvQixjQUFjSSxHQUFXO0FBQUEsRUFDL0MsY0FBYztBQUNaLFVBQU07QUFDTixpQkFBYSxNQUFNLCtCQUErQixLQUFLO0FBQ3ZELFNBQUssNkJBQTZDLG9CQUFJLElBQUk7QUFDMUQsU0FBSyxTQUFTQyxNQUFZLFFBQVEsS0FBSyxVQUFVO0FBSWpELFNBQUssZUFBZTtBQUFBO0FBQUEsTUFFbEIsS0FBSyxDQUFDLGFBQWEsV0FBVztBQUM1QixZQUFJLENBQUMsUUFBUSxLQUFLLFdBQVcsTUFBTSxFQUFHO0FBQ3RDLFlBQUk7QUFDRixjQUFJLFFBQVE7QUFDVixpQkFBSyxVQUFVLE9BQU8sSUFBSSxXQUFXO0FBQUEsVUFDdkMsT0FBTztBQUNMLGlCQUFLLFVBQVUsT0FBTyxPQUFPLFdBQVc7QUFBQSxVQUMxQztBQUFBLFFBQ0YsU0FBU0MsSUFBRztBQUNWLGNBQUksT0FBT0EsRUFBQyxFQUFFLFNBQVMsc0JBQXNCLEdBQUc7QUFDOUMsb0JBQVEsTUFBTSwwRkFBMEY7QUFBQSxVQUMxRyxPQUFPO0FBQ0wsa0JBQU1BO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUE7QUFBQSxNQUVBLEtBQUssQ0FBQyxnQkFBZ0I7QUFDcEIsWUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLE1BQU0sRUFBRyxRQUFPO0FBQzdDLFlBQUk7QUFDRixpQkFBTyxLQUFLLFVBQVUsT0FBTyxJQUFJLFdBQVc7QUFBQSxRQUM5QyxRQUFRO0FBQ04saUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxRQUFJO0FBQ0YsV0FBSyxZQUFZLEtBQUssZ0JBQWdCO0FBQUEsSUFDeEMsUUFBUTtBQUNOLGNBQVEsTUFBTSxnRkFBZ0Y7QUFBQSxJQUNoRztBQUNBLFNBQUssYUFBYSxJQUFJLGNBQWMsSUFBSTtBQUN4QyxRQUFJLE9BQU8sS0FBSztBQUNoQixhQUFTLENBQUMsV0FBVyxJQUFJLEtBQUssS0FBSyxtQkFBbUI7QUFDcEQsVUFBSSxLQUFLLFlBQVksYUFBYSxLQUFLLFlBQVksVUFBVSxPQUFPLGNBQWMsVUFBVTtBQUMxRixhQUFLLGFBQWEsSUFBSSxXQUFXLFNBQVMsSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJO0FBQUEsTUFDcEU7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxXQUFXLFNBQVM7QUFDbEIsVUFBTSxTQUFTLE1BQU0sUUFBUSxLQUFLLEdBQUcsSUFBSSxLQUFLLE1BQU0sS0FBSyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUM3RSxXQUFPLENBQUMscUJBQXFCLEdBQUcsTUFBTTtBQUFBLEVBQ3hDO0FBQUEsRUFDQSx5QkFBeUIsTUFBTSxVQUFVLFVBQVU7QUFDakQsUUFBSSxDQUFDLGFBQWEsTUFBTSw2QkFBNkIsR0FBRztBQUN0RCxXQUFLLFlBQVksa0JBQWtCO0FBQUEsUUFDakMsQ0FBQyxLQUFLLFNBQVM7QUFDYixjQUFJLElBQUksV0FBVyxLQUFLLElBQUksS0FBSyxNQUFNO0FBQ3JDLGlCQUFLLDJCQUEyQixJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUM7QUFBQSxVQUN0RDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQ0EsbUJBQWEsTUFBTSwrQkFBK0IsSUFBSTtBQUFBLElBQ3hEO0FBQ0EsVUFBTSx5QkFBeUIsTUFBTSxVQUFVLFFBQVE7QUFBQSxFQUN6RDtBQUFBLEVBQ0EsV0FBVyxtQkFBbUI7QUFDNUIsVUFBTSxXQUFXLGlCQUFpQjtBQUNsQyxTQUFLLDJCQUEyQixRQUFRLENBQUMsT0FBTyxTQUFTO0FBQ3ZELFVBQUksa0JBQWtCLElBQUksSUFBSSxLQUFLLEtBQUssSUFBSSxLQUFLLE1BQU07QUFDckQsYUFBSyxJQUFJLElBQUk7QUFBQSxNQUNmO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsYUFBYSxtQkFBbUI7QUFDOUIsVUFBTSxhQUFhLGlCQUFpQjtBQUNwQyxRQUFJLEtBQUssUUFBUTtBQUNmLFdBQUssWUFBWSxpQkFBaUIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0I7QUFDakUsb0JBQVksY0FBYyxJQUFJLE1BQU0sY0FBYyxFQUFFLFNBQVMsTUFBTSxVQUFVLE9BQU8sWUFBWSxNQUFNLENBQUMsQ0FBQztBQUFBLE1BQzFHLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTyxtQkFBbUI7QUFDeEIsUUFBSTtBQUNGLFlBQU0sT0FBTyxpQkFBaUI7QUFBQSxJQUNoQyxTQUFTQSxJQUFHO0FBQ1YsVUFBSSxLQUFLLFVBQVUsQ0FBQyxLQUFLLFlBQVk7QUFDbkMsY0FBTSxRQUFRLElBQUksTUFBTSx1QkFBdUIsRUFBRSxTQUFTLE1BQU0sVUFBVSxNQUFNLFlBQVksTUFBTSxDQUFDO0FBQ25HLGNBQU0sUUFBUUE7QUFDZCxhQUFLLGNBQWMsS0FBSztBQUFBLE1BQzFCO0FBQ0EsWUFBTUE7QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxpQkFBaUIsT0FBTyxjQUFjO0FBQ3BDLFVBQU0seUJBQXlCO0FBQy9CLFNBQUs7QUFBQSxNQUNILElBQUksTUFBTSxZQUFZLE1BQU0sTUFBTTtBQUFBLFFBQ2hDLEdBQUc7QUFBQSxRQUNILEdBQUc7QUFBQSxNQUNMLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGO0FBQ0EsZ0NBQWdDLG9CQUFJLFFBQVE7QUFDNUNDLGlCQUFnQjtBQUFBLEVBQ2RDLEdBQVM7QUFDWCxHQUFHLGtCQUFrQixXQUFXLE9BQU8sQ0FBQztBQUN4Q0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUztBQUNYLEdBQUcsa0JBQWtCLFdBQVcsUUFBUSxDQUFDO0FBQ3pDRCxpQkFBZ0I7QUFBQSxFQUNkQyxHQUFTLEVBQUUsTUFBTSxTQUFTLFNBQVMsTUFBTSxXQUFXLFVBQVUsQ0FBQztBQUNqRSxHQUFHLGtCQUFrQixXQUFXLFVBQVUsQ0FBQzs7O0FDdkkzQyxJQUFJLHVCQUF1QixNQUFNO0FBQy9CLFNBQU87QUFBQSxJQUNMLG9CQUFvQixDQUFDLGNBQWM7QUFBQSxJQUNuQyxjQUFjLFNBQVM7QUFDckIsWUFBTSxXQUFXO0FBQUEsUUFDZixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsUUFDVCxhQUFhLENBQUM7QUFBQSxNQUNoQjtBQUNBLFVBQUksUUFBUSxhQUFhO0FBQ3ZCLGlCQUFTLFVBQVUsUUFBUTtBQUMzQixpQkFBUyxVQUFVO0FBQ25CLGlCQUFTLGNBQWMsQ0FBQyxhQUFhO0FBQUEsTUFDdkM7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDRjtBQUdBLElBQUksa0NBQWtDLGNBQWMsa0JBQWtCO0FBQUEsRUFDcEUsY0FBYztBQUNaLFVBQU07QUFDTixTQUFLLE9BQU87QUFDWixTQUFLLFdBQVc7QUFDaEIsU0FBSyxXQUFXO0FBQ2hCLFNBQUssc0JBQXNCLENBQUMsT0FBTztBQUNuQyxTQUFLLGFBQWEsQ0FBQztBQUNuQixTQUFLLGtCQUFrQjtBQUN2QixTQUFLLGdCQUFnQjtBQUNyQixTQUFLLGNBQWM7QUFDbkIsU0FBSyxnQkFBZ0IsQ0FBQztBQUN0QixTQUFLLGNBQWMsQ0FBQ0MsT0FBTTtBQUN4QixVQUFJQSxHQUFFLFdBQVcsS0FBTTtBQUN2QixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLGNBQWMsSUFBSSxlQUFlLENBQUM7QUFBQSxJQUN6QztBQUNBLFNBQUssb0JBQW9CLENBQUMsVUFBVTtBQUNsQyxZQUFNLGdCQUFnQixLQUFLO0FBQzNCLFVBQUksQ0FBQyxjQUFjLFNBQVMsTUFBTSxJQUFJLEdBQUc7QUFDdkMsc0JBQWMsS0FBSyxNQUFNLElBQUk7QUFBQSxNQUMvQjtBQUNBLFVBQUksY0FBYyxXQUFXLEtBQUsscUJBQXFCLFFBQVE7QUFDN0QsYUFBSyxnQkFBZ0I7QUFBQSxNQUN2QjtBQUFBLElBQ0Y7QUFDQSxRQUFJLENBQUNDLElBQVU7QUFDYixXQUFLLGlCQUFpQixXQUFXLEtBQUssV0FBVztBQUFBLElBQ25EO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxXQUFXLGFBQWE7QUFDdEIsV0FBTyxDQUFDLHFCQUFxQixDQUFDO0FBQUEsRUFDaEM7QUFBQTtBQUFBLEVBRUEsV0FBVyxxQkFBcUI7QUFDOUIsVUFBTSxjQUFjLElBQUksSUFBSSxNQUFNLHNCQUFzQixDQUFDLENBQUM7QUFDMUQsZUFBVyxhQUFhLEtBQUssWUFBWTtBQUN2QyxVQUFJLENBQUMsVUFBVSxvQkFBb0I7QUFDakM7QUFBQSxNQUNGO0FBQ0EsaUJBQVcsUUFBUSxVQUFVLG9CQUFvQjtBQUMvQyxvQkFBWSxJQUFJLElBQUk7QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUFDQSxXQUFPLENBQUMsR0FBRyxXQUFXO0FBQUEsRUFDeEI7QUFBQSxFQUNBLG9CQUFvQjtBQUNsQixVQUFNLGtCQUFrQjtBQUN4QixTQUFLLGVBQWU7QUFDcEIsU0FBSyxvQkFBb0IsUUFBUSxDQUFDLFVBQVU7QUFDMUMsV0FBSyxpQkFBaUIsT0FBTyxLQUFLLGlCQUFpQjtBQUFBLElBQ3JELENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxnQkFBZ0IsTUFBTTtBQUNwQixVQUFNLGFBQWEsR0FBRyxJQUFJO0FBQzFCLFNBQUssZUFBZTtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxXQUFXLG1CQUFtQjtBQUM1QixRQUFJLENBQUNBLE1BQVksa0JBQWtCLElBQUksYUFBYSxHQUFHO0FBQ3JELFVBQUksQ0FBQyxLQUFLLGFBQWE7QUFDckIsYUFBSyxjQUFjO0FBQUEsTUFDckI7QUFDQSxXQUFLLGtCQUFrQixLQUFLLGVBQWUsRUFBRTtBQUFBLElBQy9DO0FBQ0EsUUFBSSxrQkFBa0IsSUFBSSxPQUFPLEtBQUssa0JBQWtCLElBQUksVUFBVSxLQUFLLGtCQUFrQixJQUFJLGNBQWMsR0FBRztBQUNoSCxZQUFNLFFBQVEsS0FBSztBQUNuQixVQUFJLE1BQU0sUUFBUSxLQUFLLEdBQUc7QUFDeEIsWUFBSSxLQUFLLE1BQU07QUFDYixnQkFBTSxXQUFXLElBQUksU0FBUztBQUM5QixxQkFBVyxPQUFPLE9BQU87QUFDdkIscUJBQVMsT0FBTyxLQUFLLE1BQU0sR0FBRztBQUFBLFVBQ2hDO0FBQ0EsZUFBSyxTQUFTLFVBQVUsUUFBUTtBQUFBLFFBQ2xDO0FBQUEsTUFDRixPQUFPO0FBQ0wsYUFBSyxTQUFTLE9BQU8sS0FBSztBQUFBLE1BQzVCO0FBQUEsSUFDRjtBQUNBLFFBQUksa0JBQWtCLElBQUksVUFBVSxHQUFHO0FBQ3JDLFdBQUssYUFBYSxJQUFJLFlBQVksS0FBSyxRQUFRO0FBQy9DLFVBQUksS0FBSyxhQUFhLFVBQVUsS0FBSyxDQUFDQSxNQUFZLENBQUMsS0FBSyxRQUFRLFdBQVcsR0FBRztBQUM1RSxhQUFLLGdCQUFnQixZQUFZLEtBQUssUUFBUTtBQUFBLE1BQ2hEO0FBQUEsSUFDRjtBQUNBLFVBQU0sV0FBVyxpQkFBaUI7QUFDbEMsU0FBSyxlQUFlO0FBQUEsRUFDdEI7QUFBQSxFQUNBLElBQUksU0FBUztBQUNYLFdBQU8sS0FBSyxVQUFVO0FBQUEsRUFDeEI7QUFBQSxFQUNBLFVBQVU7QUFDUixXQUFPLEtBQUssVUFBVTtBQUFBLEVBQ3hCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTUEsSUFBSSxLQUFLLEtBQUs7QUFDWixRQUFJLEtBQUs7QUFDUCxXQUFLLGFBQWEsUUFBUSxHQUFHO0FBQUEsSUFDL0IsT0FBTztBQUNMLFdBQUssZ0JBQWdCLE1BQU07QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLElBQUksT0FBTztBQUNULFdBQU8sS0FBSyxVQUFVO0FBQUEsRUFDeEI7QUFBQSxFQUNBLElBQUksV0FBVztBQUNiLFdBQU8sS0FBSyxVQUFVO0FBQUEsRUFDeEI7QUFBQTtBQUFBLEVBRUEsSUFBSSxlQUFlO0FBQ2pCLFdBQU8sS0FBSyxVQUFVO0FBQUEsRUFDeEI7QUFBQSxFQUNBLElBQUksb0JBQW9CO0FBQ3RCLFdBQU8sS0FBSyxVQUFVO0FBQUEsRUFDeEI7QUFBQSxFQUNBLGdCQUFnQjtBQUNkLFNBQUssZUFBZTtBQUNwQixXQUFPLEtBQUssVUFBVSxjQUFjO0FBQUEsRUFDdEM7QUFBQSxFQUNBLGlCQUFpQjtBQUNmLFNBQUssZUFBZTtBQUNwQixTQUFLLGdCQUFnQjtBQUNyQixXQUFPLEtBQUssVUFBVSxlQUFlO0FBQUEsRUFDdkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlBLElBQUksbUJBQW1CO0FBQ3JCLFdBQU8sS0FBSyxTQUFTO0FBQUEsRUFDdkI7QUFBQSxFQUNBLGVBQWUsTUFBTTtBQUNuQixVQUFNLFFBQVEsS0FBSyxDQUFDO0FBQ3BCLFVBQU0sVUFBVSxLQUFLLENBQUM7QUFDdEIsUUFBSSxTQUFTLEtBQUssQ0FBQztBQUNuQixRQUFJLENBQUMsUUFBUTtBQUNYLGVBQVMsS0FBSztBQUFBLElBQ2hCO0FBQ0EsU0FBSyxVQUFVLFlBQVksT0FBTyxTQUFTLFVBQVUsTUFBTTtBQUMzRCxTQUFLLGNBQWMsVUFBVTtBQUM3QixTQUFLLGdCQUFnQjtBQUFBLEVBQ3ZCO0FBQUEsRUFDQSxrQkFBa0I7QUFDaEIsVUFBTSxXQUFXLFFBQVEsS0FBSyxRQUFRO0FBQ3RDLFVBQU0sVUFBVSxLQUFLLFVBQVUsU0FBUztBQUN4QyxVQUFNLGdCQUFnQixLQUFLO0FBQzNCLFNBQUssYUFBYSxJQUFJLFlBQVksUUFBUTtBQUMxQyxTQUFLLGFBQWEsSUFBSSxZQUFZLENBQUMsUUFBUTtBQUMzQyxTQUFLLGFBQWEsSUFBSSxXQUFXLENBQUMsT0FBTztBQUN6QyxTQUFLLGFBQWEsSUFBSSxTQUFTLE9BQU87QUFDdEMsU0FBSyxhQUFhLElBQUksZ0JBQWdCLENBQUMsV0FBVyxhQUFhO0FBQy9ELFNBQUssYUFBYSxJQUFJLGNBQWMsV0FBVyxhQUFhO0FBQUEsRUFDOUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNQSxrQkFBa0IsU0FBUztBQUN6QixRQUFJLENBQUMsU0FBUztBQUNaLFdBQUssY0FBYztBQUNuQixXQUFLLFlBQVksQ0FBQyxDQUFDO0FBQ25CO0FBQUEsSUFDRjtBQUNBLFNBQUssY0FBYztBQUNuQixTQUFLLFlBQVksRUFBRSxhQUFhLEtBQUssR0FBRyxTQUFTLEtBQUssZ0JBQWdCO0FBQUEsRUFDeEU7QUFBQSxFQUNBLG9CQUFvQjtBQUNsQixTQUFLLGNBQWM7QUFDbkIsU0FBSyxnQkFBZ0I7QUFDckIsU0FBSyxrQkFBa0I7QUFDdkIsU0FBSyxnQkFBZ0IsQ0FBQztBQUN0QixTQUFLLGVBQWU7QUFBQSxFQUN0QjtBQUFBLEVBQ0EscUJBQXFCLFlBQVk7QUFDL0IsU0FBSyxXQUFXO0FBQ2hCLFNBQUssZUFBZTtBQUFBLEVBQ3RCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTUEseUJBQXlCLE9BQU8sUUFBUTtBQUN0QyxTQUFLLFFBQVE7QUFDYixRQUFJLFdBQVcsV0FBVztBQUN4QixXQUFLLGNBQWM7QUFBQSxJQUNyQjtBQUNBLFNBQUssZUFBZTtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxZQUFZLE1BQU07QUFDaEIsVUFBTSxDQUFDLE9BQU8sS0FBSyxJQUFJO0FBQ3ZCLFNBQUssVUFBVSxhQUFhLE9BQU8sS0FBSztBQUFBLEVBQzFDO0FBQUEsRUFDQSxJQUFJLGdCQUFnQjtBQUNsQixVQUFNLG1CQUFtQixLQUFLLFlBQVksY0FBYyxDQUFDO0FBQ3pELFVBQU0sYUFBYSxLQUFLLGNBQWMsQ0FBQztBQUN2QyxXQUFPLENBQUMsR0FBRyxrQkFBa0IsR0FBRyxVQUFVO0FBQUEsRUFDNUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlBLGdCQUFnQjtBQUNkLFNBQUssa0JBQWtCLEVBQUU7QUFDekIsU0FBSyxZQUFZLENBQUMsQ0FBQztBQUFBLEVBQ3JCO0FBQUEsRUFDQSxpQkFBaUI7QUFDZixRQUFJLEtBQUssWUFBWSxLQUFLLGFBQWEsVUFBVSxLQUFLLENBQUMsS0FBSyxjQUFjO0FBQ3hFLFdBQUssY0FBYztBQUNuQjtBQUFBLElBQ0Y7QUFDQSxVQUFNLGFBQWEsS0FBSztBQUN4QixRQUFJLENBQUMsWUFBWSxRQUFRO0FBQ3ZCO0FBQUEsSUFDRjtBQUNBLFVBQU0sUUFBUTtBQUFBO0FBQUEsTUFFWixhQUFhLFFBQVEsS0FBSyxXQUFXO0FBQUEsSUFDdkM7QUFDQSxVQUFNLGNBQWMsS0FBSyxvQkFBb0IsS0FBSyxTQUFTO0FBQzNELFFBQUksZUFBZTtBQUNuQixlQUFXLGFBQWEsWUFBWTtBQUNsQyxZQUFNLEVBQUUsU0FBUyxTQUFTLFlBQVksSUFBSSxVQUFVLGNBQWMsSUFBSTtBQUN0RSxVQUFJLFNBQVM7QUFDWDtBQUFBLE1BQ0Y7QUFDQSxVQUFJLENBQUMsY0FBYztBQUNqQix1QkFBZTtBQUFBLE1BQ2pCO0FBQ0EsVUFBSSxhQUFhLFVBQVUsR0FBRztBQUM1QixvQkFBWSxRQUFRLENBQUMsUUFBUSxNQUFNLEdBQUcsSUFBSSxJQUFJO0FBQUEsTUFDaEQ7QUFBQSxJQUNGO0FBQ0EsUUFBSSxDQUFDLGNBQWM7QUFDakIscUJBQWUsS0FBSztBQUFBLElBQ3RCO0FBQ0EsU0FBSyxZQUFZLE9BQU8sY0FBYyxXQUFXO0FBQUEsRUFDbkQ7QUFDRjtBQUNBLGdDQUFnQyxpQkFBaUI7QUFDakRDLGlCQUFnQjtBQUFBLEVBQ2RDLEdBQVMsRUFBRSxTQUFTLEtBQUssQ0FBQztBQUM1QixHQUFHLGdDQUFnQyxXQUFXLFFBQVEsQ0FBQztBQUN2REQsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzVCLEdBQUcsZ0NBQWdDLFdBQVcsWUFBWSxDQUFDO0FBQzNERCxpQkFBZ0I7QUFBQSxFQUNkQyxHQUFTLEVBQUUsT0FBTyxNQUFNLFdBQVcsTUFBTSxDQUFDO0FBQzVDLEdBQUcsZ0NBQWdDLFdBQVcsbUJBQW1CLENBQUM7QUFDbEVELGlCQUFnQjtBQUFBLEVBQ2RDLEdBQVMsRUFBRSxPQUFPLE1BQU0sV0FBVyxNQUFNLENBQUM7QUFDNUMsR0FBRyxnQ0FBZ0MsV0FBVyxpQkFBaUIsQ0FBQztBQUNoRUQsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLFdBQVcsZ0JBQWdCLFNBQVMsS0FBSyxDQUFDO0FBQ3ZELEdBQUcsZ0NBQWdDLFdBQVcsZUFBZSxDQUFDO0FBQzlERCxpQkFBZ0I7QUFBQSxFQUNkQyxHQUFTLEVBQUUsV0FBVyxPQUFPLE9BQU8sTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUMxRCxHQUFHLGdDQUFnQyxXQUFXLFlBQVksQ0FBQzs7O0FDeFMzRCxJQUFJLG9CQUFvQixNQUFNO0FBQUEsRUFDNUIsWUFBWSxTQUFTLFdBQVc7QUFDOUIsU0FBSyxZQUFZLENBQUM7QUFDbEIsU0FBSyxtQkFBbUIsQ0FBQyxVQUFVO0FBQ2pDLFlBQU0sT0FBTyxNQUFNO0FBQ25CLFVBQUksS0FBSyxVQUFVLFNBQVMsV0FBVyxLQUFLLENBQUMsS0FBSyxRQUFRLEtBQUssUUFBUSxLQUFLLFVBQVUsU0FBUyxLQUFLLElBQUksR0FBRztBQUN6RyxhQUFLLEtBQUssY0FBYztBQUFBLE1BQzFCO0FBQUEsSUFDRjtBQUNBLEtBQUMsS0FBSyxPQUFPLE1BQU0sY0FBYyxJQUFJO0FBQ3JDLFNBQUssWUFBWTtBQUFBLEVBQ25CO0FBQUEsRUFDQSxpQkFBaUI7QUFDZixRQUFJLENBQUMsS0FBSyxLQUFLLFlBQVk7QUFDekIsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPLENBQUMsR0FBRyxLQUFLLEtBQUssVUFBVSxFQUFFLEtBQUssQ0FBQyxTQUFTO0FBQzlDLFVBQUksS0FBSyxhQUFhLEtBQUssYUFBYSxLQUFLLFlBQVksS0FBSyxNQUFNLElBQUk7QUFDdEUsZUFBTztBQUFBLE1BQ1Q7QUFDQSxVQUFJLEtBQUssYUFBYSxLQUFLLGNBQWM7QUFDdkMsY0FBTSxLQUFLO0FBQ1gsY0FBTSxVQUFVLEdBQUcsUUFBUSxZQUFZO0FBQ3ZDLFlBQUksWUFBWSxzQkFBc0I7QUFDcEMsaUJBQU87QUFBQSxRQUNUO0FBQ0EsWUFBSSxDQUFDLEdBQUcsYUFBYSxNQUFNLEdBQUc7QUFDNUIsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUNBLGFBQU87QUFBQSxJQUNULENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxhQUFhLE1BQU07QUFDakIsV0FBTyxLQUFLLEtBQUssZ0JBQWdCLG1CQUFtQixJQUFJLElBQUksTUFBTTtBQUFBLEVBQ3BFO0FBQUEsRUFDQSxLQUFLLFVBQVU7QUFDYixXQUFPLGFBQWEsY0FBYyxLQUFLLGVBQWUsSUFBSSxLQUFLLGFBQWEsUUFBUTtBQUFBLEVBQ3RGO0FBQUEsRUFDQSxnQkFBZ0I7QUFDZCxTQUFLLEtBQUssWUFBWSxtQkFBbUIsY0FBYyxLQUFLLGdCQUFnQjtBQUFBLEVBQzlFO0FBQUEsRUFDQSxtQkFBbUI7QUFDakIsU0FBSyxLQUFLLFlBQVksc0JBQXNCLGNBQWMsS0FBSyxnQkFBZ0I7QUFBQSxFQUNqRjtBQUNGOzs7QUM1Q0EsSUFBSSxzQkFBc0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0ExQixJQUFJLHdCQUF3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0ExQixJQUFJLFVBQVU7QUF1QmQsU0FBUyxX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ZUFBZSxXQUFXO0FBQ3JDLFdBQVMsaUJBQWlCLG9CQUFvQixJQUFJO0FBQ3BELE9BQU87QUFDTCxPQUFLO0FBQ1A7IiwKICAibmFtZXMiOiBbImdsb2JhbCIsICJnbG9iYWxUaGlzIiwgInN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cyIsICJTaGFkb3dSb290IiwgIlNoYWR5Q1NTIiwgIm5hdGl2ZVNoYWRvdyIsICJEb2N1bWVudCIsICJwcm90b3R5cGUiLCAiQ1NTU3R5bGVTaGVldCIsICJjb25zdHJ1Y3Rpb25Ub2tlbiIsICJTeW1ib2wiLCAiY3NzVGFnQ2FjaGUiLCAiV2Vha01hcCIsICJDU1NSZXN1bHQiLCAiY3NzVGV4dCIsICJzdHJpbmdzIiwgInNhZmVUb2tlbiIsICJ0aGlzIiwgIkVycm9yIiwgIl9zdHJpbmdzIiwgInN0eWxlU2hlZXQiLCAiX3N0eWxlU2hlZXQiLCAiY2FjaGVhYmxlIiwgImxlbmd0aCIsICJnZXQiLCAicmVwbGFjZVN5bmMiLCAic2V0IiwgInRvU3RyaW5nIiwgInVuc2FmZUNTUyIsICJ2YWx1ZSIsICJTdHJpbmciLCAiY3NzIiwgInZhbHVlcyIsICJyZWR1Y2UiLCAiYWNjIiwgInYiLCAiaWR4IiwgImFkb3B0U3R5bGVzIiwgInJlbmRlclJvb3QiLCAic3R5bGVzIiwgImFkb3B0ZWRTdHlsZVNoZWV0cyIsICJtYXAiLCAicyIsICJzdHlsZSIsICJkb2N1bWVudCIsICJjcmVhdGVFbGVtZW50IiwgIm5vbmNlIiwgInNldEF0dHJpYnV0ZSIsICJ0ZXh0Q29udGVudCIsICJhcHBlbmRDaGlsZCIsICJnZXRDb21wYXRpYmxlU3R5bGUiLCAic2hlZXQiLCAicnVsZSIsICJjc3NSdWxlcyIsICJpcyIsICJkZWZpbmVQcm9wZXJ0eSIsICJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCAiZ2V0T3duUHJvcGVydHlOYW1lcyIsICJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCAiZ2V0UHJvdG90eXBlT2YiLCAiT2JqZWN0IiwgImdsb2JhbCIsICJnbG9iYWxUaGlzIiwgInRydXN0ZWRUeXBlcyIsICJlbXB0eVN0cmluZ0ZvckJvb2xlYW5BdHRyaWJ1dGUiLCAiZW1wdHlTY3JpcHQiLCAicG9seWZpbGxTdXBwb3J0IiwgInJlYWN0aXZlRWxlbWVudFBvbHlmaWxsU3VwcG9ydCIsICJKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5IiwgInByb3AiLCAiX29iaiIsICJkZWZhdWx0Q29udmVydGVyIiwgInZhbHVlIiwgInR5cGUiLCAiQm9vbGVhbiIsICJBcnJheSIsICJKU09OIiwgInN0cmluZ2lmeSIsICJmcm9tVmFsdWUiLCAiTnVtYmVyIiwgInBhcnNlIiwgImUiLCAibm90RXF1YWwiLCAib2xkIiwgImRlZmF1bHRQcm9wZXJ0eURlY2xhcmF0aW9uIiwgImF0dHJpYnV0ZSIsICJTdHJpbmciLCAiY29udmVydGVyIiwgInJlZmxlY3QiLCAidXNlRGVmYXVsdCIsICJoYXNDaGFuZ2VkIiwgIlN5bWJvbCIsICJtZXRhZGF0YSIsICJsaXRQcm9wZXJ0eU1ldGFkYXRhIiwgIldlYWtNYXAiLCAiUmVhY3RpdmVFbGVtZW50IiwgIkhUTUxFbGVtZW50IiwgImluaXRpYWxpemVyIiwgInRoaXMiLCAiX19wcmVwYXJlIiwgIl9pbml0aWFsaXplcnMiLCAicHVzaCIsICJvYnNlcnZlZEF0dHJpYnV0ZXMiLCAiZmluYWxpemUiLCAiX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwIiwgImtleXMiLCAibmFtZSIsICJvcHRpb25zIiwgInN0YXRlIiwgInByb3RvdHlwZSIsICJoYXNPd25Qcm9wZXJ0eSIsICJjcmVhdGUiLCAid3JhcHBlZCIsICJlbGVtZW50UHJvcGVydGllcyIsICJzZXQiLCAibm9BY2Nlc3NvciIsICJrZXkiLCAiZGVzY3JpcHRvciIsICJnZXRQcm9wZXJ0eURlc2NyaXB0b3IiLCAiZ2V0IiwgInYiLCAib2xkVmFsdWUiLCAiY2FsbCIsICJyZXF1ZXN0VXBkYXRlIiwgImNvbmZpZ3VyYWJsZSIsICJlbnVtZXJhYmxlIiwgInN1cGVyQ3RvciIsICJNYXAiLCAiZmluYWxpemVkIiwgInByb3BzIiwgInByb3BlcnRpZXMiLCAicHJvcEtleXMiLCAicCIsICJjcmVhdGVQcm9wZXJ0eSIsICJhdHRyIiwgIl9fYXR0cmlidXRlTmFtZUZvclByb3BlcnR5IiwgImVsZW1lbnRTdHlsZXMiLCAiZmluYWxpemVTdHlsZXMiLCAic3R5bGVzIiwgImlzQXJyYXkiLCAiU2V0IiwgImZsYXQiLCAiSW5maW5pdHkiLCAicmV2ZXJzZSIsICJzIiwgInVuc2hpZnQiLCAiZ2V0Q29tcGF0aWJsZVN0eWxlIiwgInRvTG93ZXJDYXNlIiwgImNvbnN0cnVjdG9yIiwgInN1cGVyIiwgIl9faW5zdGFuY2VQcm9wZXJ0aWVzIiwgImlzVXBkYXRlUGVuZGluZyIsICJoYXNVcGRhdGVkIiwgIl9fcmVmbGVjdGluZ1Byb3BlcnR5IiwgIl9faW5pdGlhbGl6ZSIsICJfX3VwZGF0ZVByb21pc2UiLCAiUHJvbWlzZSIsICJyZXMiLCAiZW5hYmxlVXBkYXRpbmciLCAiXyRjaGFuZ2VkUHJvcGVydGllcyIsICJfX3NhdmVJbnN0YW5jZVByb3BlcnRpZXMiLCAiZm9yRWFjaCIsICJpIiwgImNvbnRyb2xsZXIiLCAiX19jb250cm9sbGVycyIsICJhZGQiLCAicmVuZGVyUm9vdCIsICJpc0Nvbm5lY3RlZCIsICJob3N0Q29ubmVjdGVkIiwgImRlbGV0ZSIsICJpbnN0YW5jZVByb3BlcnRpZXMiLCAic2l6ZSIsICJjcmVhdGVSZW5kZXJSb290IiwgInNoYWRvd1Jvb3QiLCAiYXR0YWNoU2hhZG93IiwgInNoYWRvd1Jvb3RPcHRpb25zIiwgImFkb3B0U3R5bGVzIiwgImNvbm5lY3RlZENhbGxiYWNrIiwgImMiLCAiX3JlcXVlc3RlZFVwZGF0ZSIsICJkaXNjb25uZWN0ZWRDYWxsYmFjayIsICJob3N0RGlzY29ubmVjdGVkIiwgIl9vbGQiLCAiXyRhdHRyaWJ1dGVUb1Byb3BlcnR5IiwgImF0dHJWYWx1ZSIsICJ0b0F0dHJpYnV0ZSIsICJyZW1vdmVBdHRyaWJ1dGUiLCAic2V0QXR0cmlidXRlIiwgImN0b3IiLCAicHJvcE5hbWUiLCAiZ2V0UHJvcGVydHlPcHRpb25zIiwgImZyb21BdHRyaWJ1dGUiLCAiY29udmVydGVkVmFsdWUiLCAiX19kZWZhdWx0VmFsdWVzIiwgInVzZU5ld1ZhbHVlIiwgIm5ld1ZhbHVlIiwgImhhc0F0dHJpYnV0ZSIsICJfJGNoYW5nZVByb3BlcnR5IiwgIl9fZW5xdWV1ZVVwZGF0ZSIsICJpbml0aWFsaXplVmFsdWUiLCAiaGFzIiwgIl9fcmVmbGVjdGluZ1Byb3BlcnRpZXMiLCAicmVqZWN0IiwgInJlc3VsdCIsICJzY2hlZHVsZVVwZGF0ZSIsICJwZXJmb3JtVXBkYXRlIiwgInNob3VsZFVwZGF0ZSIsICJjaGFuZ2VkUHJvcGVydGllcyIsICJ3aWxsVXBkYXRlIiwgImhvc3RVcGRhdGUiLCAidXBkYXRlIiwgIl9fbWFya1VwZGF0ZWQiLCAiXyRkaWRVcGRhdGUiLCAiX2NoYW5nZWRQcm9wZXJ0aWVzIiwgImhvc3RVcGRhdGVkIiwgImZpcnN0VXBkYXRlZCIsICJ1cGRhdGVkIiwgInVwZGF0ZUNvbXBsZXRlIiwgImdldFVwZGF0ZUNvbXBsZXRlIiwgIl9fcHJvcGVydHlUb0F0dHJpYnV0ZSIsICJtb2RlIiwgInJlYWN0aXZlRWxlbWVudFZlcnNpb25zIiwgImdsb2JhbCIsICJnbG9iYWxUaGlzIiwgIndyYXAiLCAibm9kZSIsICJ0cnVzdGVkVHlwZXMiLCAicG9saWN5IiwgImNyZWF0ZVBvbGljeSIsICJjcmVhdGVIVE1MIiwgInMiLCAiYm91bmRBdHRyaWJ1dGVTdWZmaXgiLCAibWFya2VyIiwgIk1hdGgiLCAicmFuZG9tIiwgInRvRml4ZWQiLCAic2xpY2UiLCAibWFya2VyTWF0Y2giLCAibm9kZU1hcmtlciIsICJkIiwgImRvY3VtZW50IiwgImNyZWF0ZU1hcmtlciIsICJjcmVhdGVDb21tZW50IiwgImlzUHJpbWl0aXZlIiwgInZhbHVlIiwgImlzQXJyYXkiLCAiQXJyYXkiLCAiaXNJdGVyYWJsZSIsICJTeW1ib2wiLCAiaXRlcmF0b3IiLCAiU1BBQ0VfQ0hBUiIsICJ0ZXh0RW5kUmVnZXgiLCAiY29tbWVudEVuZFJlZ2V4IiwgImNvbW1lbnQyRW5kUmVnZXgiLCAidGFnRW5kUmVnZXgiLCAiUmVnRXhwIiwgInNpbmdsZVF1b3RlQXR0ckVuZFJlZ2V4IiwgImRvdWJsZVF1b3RlQXR0ckVuZFJlZ2V4IiwgInJhd1RleHRFbGVtZW50IiwgInRhZyIsICJ0eXBlIiwgInN0cmluZ3MiLCAidmFsdWVzIiwgIl8kbGl0VHlwZSQiLCAiaHRtbCIsICJzdmciLCAibWF0aG1sIiwgIm5vQ2hhbmdlIiwgImZvciIsICJub3RoaW5nIiwgInRlbXBsYXRlQ2FjaGUiLCAiV2Vha01hcCIsICJ3YWxrZXIiLCAiY3JlYXRlVHJlZVdhbGtlciIsICJ0cnVzdEZyb21UZW1wbGF0ZVN0cmluZyIsICJ0c2EiLCAic3RyaW5nRnJvbVRTQSIsICJoYXNPd25Qcm9wZXJ0eSIsICJFcnJvciIsICJnZXRUZW1wbGF0ZUh0bWwiLCAibCIsICJsZW5ndGgiLCAiYXR0ck5hbWVzIiwgInJhd1RleHRFbmRSZWdleCIsICJyZWdleCIsICJpIiwgImF0dHJOYW1lIiwgIm1hdGNoIiwgImF0dHJOYW1lRW5kSW5kZXgiLCAibGFzdEluZGV4IiwgImV4ZWMiLCAidGVzdCIsICJlbmQiLCAic3RhcnRzV2l0aCIsICJwdXNoIiwgIlRlbXBsYXRlIiwgImNvbnN0cnVjdG9yIiwgIm9wdGlvbnMiLCAidGhpcyIsICJwYXJ0cyIsICJub2RlSW5kZXgiLCAiYXR0ck5hbWVJbmRleCIsICJwYXJ0Q291bnQiLCAiZWwiLCAiY3JlYXRlRWxlbWVudCIsICJjdXJyZW50Tm9kZSIsICJjb250ZW50IiwgIndyYXBwZXIiLCAiZmlyc3RDaGlsZCIsICJyZXBsYWNlV2l0aCIsICJjaGlsZE5vZGVzIiwgIm5leHROb2RlIiwgIm5vZGVUeXBlIiwgImhhc0F0dHJpYnV0ZXMiLCAibmFtZSIsICJnZXRBdHRyaWJ1dGVOYW1lcyIsICJlbmRzV2l0aCIsICJyZWFsTmFtZSIsICJzdGF0aWNzIiwgImdldEF0dHJpYnV0ZSIsICJzcGxpdCIsICJtIiwgImluZGV4IiwgImN0b3IiLCAiUHJvcGVydHlQYXJ0IiwgIkJvb2xlYW5BdHRyaWJ1dGVQYXJ0IiwgIkV2ZW50UGFydCIsICJBdHRyaWJ1dGVQYXJ0IiwgInJlbW92ZUF0dHJpYnV0ZSIsICJ0YWdOYW1lIiwgInRleHRDb250ZW50IiwgImVtcHR5U2NyaXB0IiwgImFwcGVuZCIsICJkYXRhIiwgImluZGV4T2YiLCAiX29wdGlvbnMiLCAiaW5uZXJIVE1MIiwgInJlc29sdmVEaXJlY3RpdmUiLCAicGFydCIsICJwYXJlbnQiLCAiYXR0cmlidXRlSW5kZXgiLCAiY3VycmVudERpcmVjdGl2ZSIsICJfX2RpcmVjdGl2ZXMiLCAiX19kaXJlY3RpdmUiLCAibmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yIiwgIl8kaW5pdGlhbGl6ZSIsICJfJHJlc29sdmUiLCAiVGVtcGxhdGVJbnN0YW5jZSIsICJ0ZW1wbGF0ZSIsICJfJHBhcnRzIiwgIl8kZGlzY29ubmVjdGFibGVDaGlsZHJlbiIsICJfJHRlbXBsYXRlIiwgIl8kcGFyZW50IiwgInBhcmVudE5vZGUiLCAiXyRpc0Nvbm5lY3RlZCIsICJmcmFnbWVudCIsICJjcmVhdGlvblNjb3BlIiwgImltcG9ydE5vZGUiLCAicGFydEluZGV4IiwgInRlbXBsYXRlUGFydCIsICJDaGlsZFBhcnQiLCAibmV4dFNpYmxpbmciLCAiRWxlbWVudFBhcnQiLCAiXyRzZXRWYWx1ZSIsICJfX2lzQ29ubmVjdGVkIiwgInN0YXJ0Tm9kZSIsICJlbmROb2RlIiwgIl8kY29tbWl0dGVkVmFsdWUiLCAiXyRzdGFydE5vZGUiLCAiXyRlbmROb2RlIiwgImlzQ29ubmVjdGVkIiwgImRpcmVjdGl2ZVBhcmVudCIsICJfJGNsZWFyIiwgIl9jb21taXRUZXh0IiwgIl9jb21taXRUZW1wbGF0ZVJlc3VsdCIsICJfY29tbWl0Tm9kZSIsICJfY29tbWl0SXRlcmFibGUiLCAiaW5zZXJ0QmVmb3JlIiwgIl9pbnNlcnQiLCAiY3JlYXRlVGV4dE5vZGUiLCAicmVzdWx0IiwgIl8kZ2V0VGVtcGxhdGUiLCAiaCIsICJfdXBkYXRlIiwgImluc3RhbmNlIiwgIl9jbG9uZSIsICJnZXQiLCAic2V0IiwgIml0ZW1QYXJ0cyIsICJpdGVtUGFydCIsICJpdGVtIiwgInN0YXJ0IiwgImZyb20iLCAiXyRub3RpZnlDb25uZWN0aW9uQ2hhbmdlZCIsICJuIiwgInJlbW92ZSIsICJlbGVtZW50IiwgImZpbGwiLCAiU3RyaW5nIiwgInZhbHVlSW5kZXgiLCAibm9Db21taXQiLCAiY2hhbmdlIiwgInYiLCAiX2NvbW1pdFZhbHVlIiwgInNldEF0dHJpYnV0ZSIsICJ0b2dnbGVBdHRyaWJ1dGUiLCAic3VwZXIiLCAibmV3TGlzdGVuZXIiLCAib2xkTGlzdGVuZXIiLCAic2hvdWxkUmVtb3ZlTGlzdGVuZXIiLCAiY2FwdHVyZSIsICJvbmNlIiwgInBhc3NpdmUiLCAic2hvdWxkQWRkTGlzdGVuZXIiLCAicmVtb3ZlRXZlbnRMaXN0ZW5lciIsICJhZGRFdmVudExpc3RlbmVyIiwgImV2ZW50IiwgImNhbGwiLCAiaG9zdCIsICJoYW5kbGVFdmVudCIsICJfJExIIiwgIl9ib3VuZEF0dHJpYnV0ZVN1ZmZpeCIsICJfbWFya2VyIiwgIl9tYXJrZXJNYXRjaCIsICJfSFRNTF9SRVNVTFQiLCAiX2dldFRlbXBsYXRlSHRtbCIsICJfVGVtcGxhdGVJbnN0YW5jZSIsICJfaXNJdGVyYWJsZSIsICJfcmVzb2x2ZURpcmVjdGl2ZSIsICJfQ2hpbGRQYXJ0IiwgIl9BdHRyaWJ1dGVQYXJ0IiwgIl9Cb29sZWFuQXR0cmlidXRlUGFydCIsICJfRXZlbnRQYXJ0IiwgIl9Qcm9wZXJ0eVBhcnQiLCAiX0VsZW1lbnRQYXJ0IiwgInBvbHlmaWxsU3VwcG9ydCIsICJsaXRIdG1sUG9seWZpbGxTdXBwb3J0IiwgImxpdEh0bWxWZXJzaW9ucyIsICJyZW5kZXIiLCAiY29udGFpbmVyIiwgInBhcnRPd25lck5vZGUiLCAicmVuZGVyQmVmb3JlIiwgImdsb2JhbCIsICJnbG9iYWxUaGlzIiwgIkxpdEVsZW1lbnQiLCAiUmVhY3RpdmVFbGVtZW50IiwgImNvbnN0cnVjdG9yIiwgInRoaXMiLCAicmVuZGVyT3B0aW9ucyIsICJob3N0IiwgIl9fY2hpbGRQYXJ0IiwgImNyZWF0ZVJlbmRlclJvb3QiLCAicmVuZGVyUm9vdCIsICJzdXBlciIsICJyZW5kZXJCZWZvcmUiLCAiZmlyc3RDaGlsZCIsICJjaGFuZ2VkUHJvcGVydGllcyIsICJ2YWx1ZSIsICJyZW5kZXIiLCAiaGFzVXBkYXRlZCIsICJpc0Nvbm5lY3RlZCIsICJ1cGRhdGUiLCAiY29ubmVjdGVkQ2FsbGJhY2siLCAic2V0Q29ubmVjdGVkIiwgImRpc2Nvbm5lY3RlZENhbGxiYWNrIiwgIm5vQ2hhbmdlIiwgImxpdEVsZW1lbnRIeWRyYXRlU3VwcG9ydCIsICJwb2x5ZmlsbFN1cHBvcnQiLCAibGl0RWxlbWVudFBvbHlmaWxsU3VwcG9ydCIsICJnbG9iYWwiLCAibGl0RWxlbWVudFZlcnNpb25zIiwgInB1c2giLCAiaXNTZXJ2ZXIiLCAiY3VzdG9tRWxlbWVudCIsICJ0YWdOYW1lIiwgImNsYXNzT3JUYXJnZXQiLCAiY29udGV4dCIsICJhZGRJbml0aWFsaXplciIsICJjdXN0b21FbGVtZW50cyIsICJkZWZpbmUiLCAiZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb24iLCAiYXR0cmlidXRlIiwgInR5cGUiLCAiU3RyaW5nIiwgImNvbnZlcnRlciIsICJkZWZhdWx0Q29udmVydGVyIiwgInJlZmxlY3QiLCAiaGFzQ2hhbmdlZCIsICJub3RFcXVhbCIsICJzdGFuZGFyZFByb3BlcnR5IiwgIm9wdGlvbnMiLCAidGFyZ2V0IiwgImNvbnRleHQiLCAia2luZCIsICJtZXRhZGF0YSIsICJwcm9wZXJ0aWVzIiwgImdsb2JhbFRoaXMiLCAibGl0UHJvcGVydHlNZXRhZGF0YSIsICJnZXQiLCAic2V0IiwgIk1hcCIsICJPYmplY3QiLCAiY3JlYXRlIiwgIndyYXBwZWQiLCAibmFtZSIsICJ2IiwgIm9sZFZhbHVlIiwgImNhbGwiLCAidGhpcyIsICJyZXF1ZXN0VXBkYXRlIiwgIl8kY2hhbmdlUHJvcGVydHkiLCAidmFsdWUiLCAiRXJyb3IiLCAicHJvcGVydHkiLCAicHJvdG9PclRhcmdldCIsICJuYW1lT3JDb250ZXh0IiwgInByb3RvIiwgImhhc093blByb3BlcnR5IiwgImNvbnN0cnVjdG9yIiwgImNyZWF0ZVByb3BlcnR5IiwgImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsICJ1bmRlZmluZWQiLCAic3RhdGUiLCAib3B0aW9ucyIsICJwcm9wZXJ0eSIsICJhdHRyaWJ1dGUiLCAiZGVzYyIsICJvYmoiLCAibmFtZSIsICJkZXNjcmlwdG9yIiwgImNvbmZpZ3VyYWJsZSIsICJlbnVtZXJhYmxlIiwgIlJlZmxlY3QiLCAiZGVjb3JhdGUiLCAiT2JqZWN0IiwgImRlZmluZVByb3BlcnR5IiwgInF1ZXJ5IiwgInNlbGVjdG9yIiwgImNhY2hlIiwgInByb3RvT3JUYXJnZXQiLCAibmFtZU9yQ29udGV4dCIsICJkZXNjcmlwdG9yIiwgImRvUXVlcnkiLCAiZWwiLCAicmVuZGVyUm9vdCIsICJxdWVyeVNlbGVjdG9yIiwgImdldCIsICJzZXQiLCAia2V5IiwgIlN5bWJvbCIsICJ0aGlzIiwgInYiLCAiZGVzYyIsICJyZXN1bHQiLCAiY2FsbCIsICJoYXNVcGRhdGVkIiwgIl9fZGVmUHJvcCIsICJfX2dldE93blByb3BEZXNjIiwgIl9fZGVjb3JhdGVDbGFzcyIsICJpIiwgImkiLCAibyIsICJlIiwgIl9fZGVjb3JhdGVDbGFzcyIsICJuIiwgImUiLCAibyIsICJfX2RlY29yYXRlQ2xhc3MiLCAibiIsICJ1cGRhdGUiLCAidHJhbnNsYXRpb24iLCAidCIsICJMb2NhbGl6ZUNvbnRyb2xsZXIiLCAiUGFydFR5cGUiLCAiQVRUUklCVVRFIiwgIkNISUxEIiwgIlBST1BFUlRZIiwgIkJPT0xFQU5fQVRUUklCVVRFIiwgIkVWRU5UIiwgIkVMRU1FTlQiLCAiZGlyZWN0aXZlIiwgImMiLCAidmFsdWVzIiwgIl8kbGl0RGlyZWN0aXZlJCIsICJEaXJlY3RpdmUiLCAiX3BhcnRJbmZvIiwgIl8kaXNDb25uZWN0ZWQiLCAidGhpcyIsICJfJHBhcmVudCIsICJwYXJ0IiwgInBhcmVudCIsICJhdHRyaWJ1dGVJbmRleCIsICJfX3BhcnQiLCAiX19hdHRyaWJ1dGVJbmRleCIsICJwcm9wcyIsICJ1cGRhdGUiLCAiX3BhcnQiLCAicmVuZGVyIiwgImNsYXNzTWFwIiwgImRpcmVjdGl2ZSIsICJEaXJlY3RpdmUiLCAicGFydEluZm8iLCAic3VwZXIiLCAidHlwZSIsICJQYXJ0VHlwZSIsICJBVFRSSUJVVEUiLCAibmFtZSIsICJzdHJpbmdzIiwgImxlbmd0aCIsICJFcnJvciIsICJjbGFzc0luZm8iLCAiT2JqZWN0IiwgImtleXMiLCAiZmlsdGVyIiwgImtleSIsICJqb2luIiwgInBhcnQiLCAidGhpcyIsICJfcHJldmlvdXNDbGFzc2VzIiwgIlNldCIsICJfc3RhdGljQ2xhc3NlcyIsICJzcGxpdCIsICJzIiwgImhhcyIsICJhZGQiLCAicmVuZGVyIiwgImNsYXNzTGlzdCIsICJlbGVtZW50IiwgInJlbW92ZSIsICJkZWxldGUiLCAidmFsdWUiLCAibm9DaGFuZ2UiLCAiaWZEZWZpbmVkIiwgInZhbHVlIiwgIm5vdGhpbmciLCAiYnJhbmQiLCAiU3ltYm9sIiwgImZvciIsICJ1bndyYXBTdGF0aWNWYWx1ZSIsICJ2YWx1ZSIsICJyIiwgImxpdGVyYWwiLCAic3RyaW5ncyIsICJ2YWx1ZXMiLCAiXyRsaXRTdGF0aWMkIiwgInJlZHVjZSIsICJhY2MiLCAidiIsICJpZHgiLCAidmFsdWUiLCAiRXJyb3IiLCAiciIsICJicmFuZCIsICJzdHJpbmdzQ2FjaGUiLCAiTWFwIiwgIndpdGhTdGF0aWMiLCAiY29yZVRhZyIsICJsIiwgImxlbmd0aCIsICJzdGF0aWNWYWx1ZSIsICJkeW5hbWljVmFsdWUiLCAic3RhdGljU3RyaW5ncyIsICJkeW5hbWljVmFsdWVzIiwgInMiLCAiaSIsICJoYXNTdGF0aWNzIiwgInVud3JhcFN0YXRpY1ZhbHVlIiwgInB1c2giLCAia2V5IiwgImpvaW4iLCAiZ2V0IiwgInJhdyIsICJzZXQiLCAiaHRtbCIsICJjb3JlSHRtbCIsICJzdmciLCAiY29yZVN2ZyIsICJtYXRobWwiLCAiY29yZU1hdGhtbCIsICJMb2NhbGl6ZUNvbnRyb2xsZXIiLCAiaSIsICJ1IiwgImUiLCAibyIsICJfX2RlY29yYXRlQ2xhc3MiLCAiciIsICJuIiwgInQiLCAiTG9jYWxpemVDb250cm9sbGVyIiwgImIiLCAiX19kZWNvcmF0ZUNsYXNzIiwgInQiLCAia2l0Q29kZSIsICJwIiwgIl9DaGlsZFBhcnQiLCAiQ2hpbGRQYXJ0IiwgIl8kTEgiLCAiaXNUZW1wbGF0ZVJlc3VsdCIsICJ2YWx1ZSIsICJ0eXBlIiwgImlzU2luZ2xlRXhwcmVzc2lvbiIsICJwYXJ0IiwgInN0cmluZ3MiLCAiUkVTRVRfVkFMVUUiLCAic2V0Q29tbWl0dGVkVmFsdWUiLCAicGFydCIsICJ2YWx1ZSIsICJfJGNvbW1pdHRlZFZhbHVlIiwgImxpYnJhcnkiLCAiYiIsICJsIiwgIl9fZGVjb3JhdGVDbGFzcyIsICJyIiwgIm4iLCAidCIsICJpIiwgImIiLCAieCIsICJ5IiwgIm4iLCAidCIsICJsaXZlIiwgImRpcmVjdGl2ZSIsICJEaXJlY3RpdmUiLCAicGFydEluZm8iLCAic3VwZXIiLCAidHlwZSIsICJQYXJ0VHlwZSIsICJQUk9QRVJUWSIsICJBVFRSSUJVVEUiLCAiQk9PTEVBTl9BVFRSSUJVVEUiLCAiRXJyb3IiLCAiaXNTaW5nbGVFeHByZXNzaW9uIiwgInZhbHVlIiwgInBhcnQiLCAibm9DaGFuZ2UiLCAibm90aGluZyIsICJlbGVtZW50IiwgIm5hbWUiLCAiaGFzQXR0cmlidXRlIiwgImdldEF0dHJpYnV0ZSIsICJTdHJpbmciLCAic2V0Q29tbWl0dGVkVmFsdWUiLCAiYiIsICJlIiwgIm8iLCAibCIsICJfX2RlY29yYXRlQ2xhc3MiLCAibiIsICJyIiwgInQiLCAiaSIsICJlIiwgImIiLCAibiIsICJyIiwgInQiLCAiaSIsICJMb2NhbGl6ZUNvbnRyb2xsZXIiLCAiYiIsICJlIiwgIl9fZGVjb3JhdGVDbGFzcyIsICJuIiwgInQiLCAibyIsICJpIiwgImUiLCAiYiIsICJyIiwgInQiXQp9Cg==
