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
   * Scan the DOM for <mark class="threads-highlight" data-thread-id="..."> elements
   * and attach click handlers to scroll the corresponding inline thread into view.
   */
  scanRenderedHighlights() {
    const marks = document.querySelectorAll("mark.threads-highlight[data-thread-id]");
    for (const mark of marks) {
      const threadId = mark.dataset.threadId;
      if (!threadId) continue;
      mark.style.cursor = "pointer";
      mark.addEventListener("click", () => {
        const threadEl = document.querySelector(`.threads-thread[data-thread-id="${threadId}"]`);
        if (threadEl) {
          threadEl.scrollIntoView({ behavior: "smooth", block: "center" });
          threadEl.classList.add("threads-thread--flash");
          setTimeout(() => threadEl.classList.remove("threads-thread--flash"), 2e3);
        }
      });
    }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BsaXQrcmVhY3RpdmUtZWxlbWVudEAyLjEuMi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3NyYy9jc3MtdGFnLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AbGl0K3JlYWN0aXZlLWVsZW1lbnRAMi4xLjIvbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9zcmMvcmVhY3RpdmUtZWxlbWVudC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbGl0LWh0bWxAMy4zLjIvbm9kZV9tb2R1bGVzL2xpdC1odG1sL3NyYy9saXQtaHRtbC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbGl0LWVsZW1lbnRANC4yLjIvbm9kZV9tb2R1bGVzL2xpdC1lbGVtZW50L3NyYy9saXQtZWxlbWVudC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbGl0LWh0bWxAMy4zLjIvbm9kZV9tb2R1bGVzL2xpdC1odG1sL3NyYy9pcy1zZXJ2ZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BsaXQrcmVhY3RpdmUtZWxlbWVudEAyLjEuMi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3NyYy9kZWNvcmF0b3JzL2N1c3RvbS1lbGVtZW50LnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AbGl0K3JlYWN0aXZlLWVsZW1lbnRAMi4xLjIvbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9zcmMvZGVjb3JhdG9ycy9wcm9wZXJ0eS50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGxpdCtyZWFjdGl2ZS1lbGVtZW50QDIuMS4yL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvc3JjL2RlY29yYXRvcnMvc3RhdGUudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BsaXQrcmVhY3RpdmUtZWxlbWVudEAyLjEuMi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3NyYy9kZWNvcmF0b3JzL2Jhc2UudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BsaXQrcmVhY3RpdmUtZWxlbWVudEAyLjEuMi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3NyYy9kZWNvcmF0b3JzL3F1ZXJ5LnRzIiwgIi4uLy4uL3NyYy9jbGllbnQvbGliL2FwaS50cyIsICIuLi8uLi9zcmMvY2xpZW50L2xpYi9pZGVudGl0eS50cyIsICIuLi8uLi9zcmMvY2xpZW50L2xpYi9zZWxlY3Rpb24udHMiLCAiLi4vLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL3N0eWxlcy50cyIsICIuLi8uLi9zcmMvY2xpZW50L2xpYi90aGVtZS50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLlI3UVg0TTZSLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuVkMzQlBVWkouanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay43VkdDSUhERy5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLkVQSEhXWEsyLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuSVBXUFJJSFouanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5LSUhCM1ZNQi5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLjZKNlFZRkhWLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuNEZPSFVCQlMuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5QWkFONkZQTi5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQHNob2VsYWNlLXN0eWxlK2xvY2FsaXplQDMuMi4xL25vZGVfbW9kdWxlcy9Ac2hvZWxhY2Utc3R5bGUvbG9jYWxpemUvZGlzdC9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLjcyV0pORDVYLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuT0tYQk5SRTYuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5YTlRQN0RFUS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbGl0LWh0bWxAMy4zLjIvbm9kZV9tb2R1bGVzL2xpdC1odG1sL3NyYy9kaXJlY3RpdmUudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xpdC1odG1sQDMuMy4yL25vZGVfbW9kdWxlcy9saXQtaHRtbC9zcmMvZGlyZWN0aXZlcy9jbGFzcy1tYXAudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xpdC1odG1sQDMuMy4yL25vZGVfbW9kdWxlcy9saXQtaHRtbC9zcmMvZGlyZWN0aXZlcy9pZi1kZWZpbmVkLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9saXQtaHRtbEAzLjMuMi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvc3JjL3N0YXRpYy50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLkIzM0xPQUJMLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuQUdER1JHNEUuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5WVEFWMlNHNC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLllEUUNTMkhLLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuV0RJSUdVTlAuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5ENUkyRFdNTC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLks2UU1VSUhQLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuSlZUQUdSNUIuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5LUE4zWVo2VS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLkZTUlhZR1NXLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9saXQtaHRtbEAzLjMuMi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvc3JjL2RpcmVjdGl2ZS1oZWxwZXJzLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuSktCTlcyVEcuanMiLCAiLi4vLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL3RocmVhZHMtcG9wb3Zlci50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLkdXV0dQN1pMLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuNUxYWFhFTEUuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xpdC1odG1sQDMuMy4yL25vZGVfbW9kdWxlcy9saXQtaHRtbC9zcmMvZGlyZWN0aXZlcy9saXZlLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuNlROT0NBQTUuanMiLCAiLi4vLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL3RocmVhZHMtaW5saW5lLWVkaXRvci50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLlZRWjQ2TVlJLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuUk1aN0JWRE0uanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5ORVQ1VjZOTC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLjUyV0EyREpPLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuNFpBS1A3TlkuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5NUU9ESjc1Vi5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLjNOS0lISUNXLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuUFgzSE1LRjcuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5MNkNJS09GUS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLk9VWTRWREYyLmpzIiwgIi4uLy4uL3NyYy9jbGllbnQvY29tcG9uZW50cy90aHJlYWRzLWFwcC50cyIsICIuLi8uLi9zcmMvY2xpZW50L2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuY29uc3QgTk9ERV9NT0RFID0gZmFsc2U7XG5cbi8vIEFsbG93cyBtaW5pZmllcnMgdG8gcmVuYW1lIHJlZmVyZW5jZXMgdG8gZ2xvYmFsVGhpc1xuY29uc3QgZ2xvYmFsID0gZ2xvYmFsVGhpcztcblxuLyoqXG4gKiBXaGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgYGFkb3B0ZWRTdHlsZVNoZWV0c2AuXG4gKi9cbmV4cG9ydCBjb25zdCBzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHM6IGJvb2xlYW4gPVxuICBnbG9iYWwuU2hhZG93Um9vdCAmJlxuICAoZ2xvYmFsLlNoYWR5Q1NTID09PSB1bmRlZmluZWQgfHwgZ2xvYmFsLlNoYWR5Q1NTLm5hdGl2ZVNoYWRvdykgJiZcbiAgJ2Fkb3B0ZWRTdHlsZVNoZWV0cycgaW4gRG9jdW1lbnQucHJvdG90eXBlICYmXG4gICdyZXBsYWNlJyBpbiBDU1NTdHlsZVNoZWV0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBBIENTU1Jlc3VsdCBvciBuYXRpdmUgQ1NTU3R5bGVTaGVldC5cbiAqXG4gKiBJbiBicm93c2VycyB0aGF0IHN1cHBvcnQgY29uc3RydWN0aWJsZSBDU1Mgc3R5bGUgc2hlZXRzLCBDU1NTdHlsZVNoZWV0XG4gKiBvYmplY3QgY2FuIGJlIHVzZWQgZm9yIHN0eWxpbmcgYWxvbmcgc2lkZSBDU1NSZXN1bHQgZnJvbSB0aGUgYGNzc2BcbiAqIHRlbXBsYXRlIHRhZy5cbiAqL1xuZXhwb3J0IHR5cGUgQ1NTUmVzdWx0T3JOYXRpdmUgPSBDU1NSZXN1bHQgfCBDU1NTdHlsZVNoZWV0O1xuXG5leHBvcnQgdHlwZSBDU1NSZXN1bHRBcnJheSA9IEFycmF5PENTU1Jlc3VsdE9yTmF0aXZlIHwgQ1NTUmVzdWx0QXJyYXk+O1xuXG4vKipcbiAqIEEgc2luZ2xlIENTU1Jlc3VsdCwgQ1NTU3R5bGVTaGVldCwgb3IgYW4gYXJyYXkgb3IgbmVzdGVkIGFycmF5cyBvZiB0aG9zZS5cbiAqL1xuZXhwb3J0IHR5cGUgQ1NTUmVzdWx0R3JvdXAgPSBDU1NSZXN1bHRPck5hdGl2ZSB8IENTU1Jlc3VsdEFycmF5O1xuXG5jb25zdCBjb25zdHJ1Y3Rpb25Ub2tlbiA9IFN5bWJvbCgpO1xuXG5jb25zdCBjc3NUYWdDYWNoZSA9IG5ldyBXZWFrTWFwPFRlbXBsYXRlU3RyaW5nc0FycmF5LCBDU1NTdHlsZVNoZWV0PigpO1xuXG4vKipcbiAqIEEgY29udGFpbmVyIGZvciBhIHN0cmluZyBvZiBDU1MgdGV4dCwgdGhhdCBtYXkgYmUgdXNlZCB0byBjcmVhdGUgYSBDU1NTdHlsZVNoZWV0LlxuICpcbiAqIENTU1Jlc3VsdCBpcyB0aGUgcmV0dXJuIHZhbHVlIG9mIGBjc3NgLXRhZ2dlZCB0ZW1wbGF0ZSBsaXRlcmFscyBhbmRcbiAqIGB1bnNhZmVDU1MoKWAuIEluIG9yZGVyIHRvIGVuc3VyZSB0aGF0IENTU1Jlc3VsdHMgYXJlIG9ubHkgY3JlYXRlZCB2aWEgdGhlXG4gKiBgY3NzYCB0YWcgYW5kIGB1bnNhZmVDU1MoKWAsIENTU1Jlc3VsdCBjYW5ub3QgYmUgY29uc3RydWN0ZWQgZGlyZWN0bHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBDU1NSZXN1bHQge1xuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICBbJ18kY3NzUmVzdWx0JCddID0gdHJ1ZTtcbiAgcmVhZG9ubHkgY3NzVGV4dDogc3RyaW5nO1xuICBwcml2YXRlIF9zdHlsZVNoZWV0PzogQ1NTU3R5bGVTaGVldDtcbiAgcHJpdmF0ZSBfc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXkgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihcbiAgICBjc3NUZXh0OiBzdHJpbmcsXG4gICAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXkgfCB1bmRlZmluZWQsXG4gICAgc2FmZVRva2VuOiBzeW1ib2xcbiAgKSB7XG4gICAgaWYgKHNhZmVUb2tlbiAhPT0gY29uc3RydWN0aW9uVG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0NTU1Jlc3VsdCBpcyBub3QgY29uc3RydWN0YWJsZS4gVXNlIGB1bnNhZmVDU1NgIG9yIGBjc3NgIGluc3RlYWQuJ1xuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5jc3NUZXh0ID0gY3NzVGV4dDtcbiAgICB0aGlzLl9zdHJpbmdzID0gc3RyaW5ncztcbiAgfVxuXG4gIC8vIFRoaXMgaXMgYSBnZXR0ZXIgc28gdGhhdCBpdCdzIGxhenkuIEluIHByYWN0aWNlLCB0aGlzIG1lYW5zIHN0eWxlc2hlZXRzXG4gIC8vIGFyZSBub3QgY3JlYXRlZCB1bnRpbCB0aGUgZmlyc3QgZWxlbWVudCBpbnN0YW5jZSBpcyBtYWRlLlxuICBnZXQgc3R5bGVTaGVldCgpOiBDU1NTdHlsZVNoZWV0IHwgdW5kZWZpbmVkIHtcbiAgICAvLyBJZiBgc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzYCBpcyB0cnVlIHRoZW4gd2UgYXNzdW1lIENTU1N0eWxlU2hlZXQgaXNcbiAgICAvLyBjb25zdHJ1Y3RhYmxlLlxuICAgIGxldCBzdHlsZVNoZWV0ID0gdGhpcy5fc3R5bGVTaGVldDtcbiAgICBjb25zdCBzdHJpbmdzID0gdGhpcy5fc3RyaW5ncztcbiAgICBpZiAoc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzICYmIHN0eWxlU2hlZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgY2FjaGVhYmxlID0gc3RyaW5ncyAhPT0gdW5kZWZpbmVkICYmIHN0cmluZ3MubGVuZ3RoID09PSAxO1xuICAgICAgaWYgKGNhY2hlYWJsZSkge1xuICAgICAgICBzdHlsZVNoZWV0ID0gY3NzVGFnQ2FjaGUuZ2V0KHN0cmluZ3MpO1xuICAgICAgfVxuICAgICAgaWYgKHN0eWxlU2hlZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAodGhpcy5fc3R5bGVTaGVldCA9IHN0eWxlU2hlZXQgPSBuZXcgQ1NTU3R5bGVTaGVldCgpKS5yZXBsYWNlU3luYyhcbiAgICAgICAgICB0aGlzLmNzc1RleHRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGNhY2hlYWJsZSkge1xuICAgICAgICAgIGNzc1RhZ0NhY2hlLnNldChzdHJpbmdzLCBzdHlsZVNoZWV0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVTaGVldDtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3NzVGV4dDtcbiAgfVxufVxuXG50eXBlIENvbnN0cnVjdGFibGVDU1NSZXN1bHQgPSBDU1NSZXN1bHQgJiB7XG4gIG5ldyAoXG4gICAgY3NzVGV4dDogc3RyaW5nLFxuICAgIHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5IHwgdW5kZWZpbmVkLFxuICAgIHNhZmVUb2tlbjogc3ltYm9sXG4gICk6IENTU1Jlc3VsdDtcbn07XG5cbmNvbnN0IHRleHRGcm9tQ1NTUmVzdWx0ID0gKHZhbHVlOiBDU1NSZXN1bHRHcm91cCB8IG51bWJlcikgPT4ge1xuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICBpZiAoKHZhbHVlIGFzIENTU1Jlc3VsdClbJ18kY3NzUmVzdWx0JCddID09PSB0cnVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSBhcyBDU1NSZXN1bHQpLmNzc1RleHQ7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgVmFsdWUgcGFzc2VkIHRvICdjc3MnIGZ1bmN0aW9uIG11c3QgYmUgYSAnY3NzJyBmdW5jdGlvbiByZXN1bHQ6IGAgK1xuICAgICAgICBgJHt2YWx1ZX0uIFVzZSAndW5zYWZlQ1NTJyB0byBwYXNzIG5vbi1saXRlcmFsIHZhbHVlcywgYnV0IHRha2UgY2FyZSBgICtcbiAgICAgICAgYHRvIGVuc3VyZSBwYWdlIHNlY3VyaXR5LmBcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIFdyYXAgYSB2YWx1ZSBmb3IgaW50ZXJwb2xhdGlvbiBpbiBhIHtAbGlua2NvZGUgY3NzfSB0YWdnZWQgdGVtcGxhdGUgbGl0ZXJhbC5cbiAqXG4gKiBUaGlzIGlzIHVuc2FmZSBiZWNhdXNlIHVudHJ1c3RlZCBDU1MgdGV4dCBjYW4gYmUgdXNlZCB0byBwaG9uZSBob21lXG4gKiBvciBleGZpbHRyYXRlIGRhdGEgdG8gYW4gYXR0YWNrZXIgY29udHJvbGxlZCBzaXRlLiBUYWtlIGNhcmUgdG8gb25seSB1c2VcbiAqIHRoaXMgd2l0aCB0cnVzdGVkIGlucHV0LlxuICovXG5leHBvcnQgY29uc3QgdW5zYWZlQ1NTID0gKHZhbHVlOiB1bmtub3duKSA9PlxuICBuZXcgKENTU1Jlc3VsdCBhcyBDb25zdHJ1Y3RhYmxlQ1NTUmVzdWx0KShcbiAgICB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiBTdHJpbmcodmFsdWUpLFxuICAgIHVuZGVmaW5lZCxcbiAgICBjb25zdHJ1Y3Rpb25Ub2tlblxuICApO1xuXG4vKipcbiAqIEEgdGVtcGxhdGUgbGl0ZXJhbCB0YWcgd2hpY2ggY2FuIGJlIHVzZWQgd2l0aCBMaXRFbGVtZW50J3NcbiAqIHtAbGlua2NvZGUgTGl0RWxlbWVudC5zdHlsZXN9IHByb3BlcnR5IHRvIHNldCBlbGVtZW50IHN0eWxlcy5cbiAqXG4gKiBGb3Igc2VjdXJpdHkgcmVhc29ucywgb25seSBsaXRlcmFsIHN0cmluZyB2YWx1ZXMgYW5kIG51bWJlciBtYXkgYmUgdXNlZCBpblxuICogZW1iZWRkZWQgZXhwcmVzc2lvbnMuIFRvIGluY29ycG9yYXRlIG5vbi1saXRlcmFsIHZhbHVlcyB7QGxpbmtjb2RlIHVuc2FmZUNTU31cbiAqIG1heSBiZSB1c2VkIGluc2lkZSBhbiBleHByZXNzaW9uLlxuICovXG5leHBvcnQgY29uc3QgY3NzID0gKFxuICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgLi4udmFsdWVzOiAoQ1NTUmVzdWx0R3JvdXAgfCBudW1iZXIpW11cbik6IENTU1Jlc3VsdCA9PiB7XG4gIGNvbnN0IGNzc1RleHQgPVxuICAgIHN0cmluZ3MubGVuZ3RoID09PSAxXG4gICAgICA/IHN0cmluZ3NbMF1cbiAgICAgIDogdmFsdWVzLnJlZHVjZShcbiAgICAgICAgICAoYWNjLCB2LCBpZHgpID0+IGFjYyArIHRleHRGcm9tQ1NTUmVzdWx0KHYpICsgc3RyaW5nc1tpZHggKyAxXSxcbiAgICAgICAgICBzdHJpbmdzWzBdXG4gICAgICAgICk7XG4gIHJldHVybiBuZXcgKENTU1Jlc3VsdCBhcyBDb25zdHJ1Y3RhYmxlQ1NTUmVzdWx0KShcbiAgICBjc3NUZXh0LFxuICAgIHN0cmluZ3MsXG4gICAgY29uc3RydWN0aW9uVG9rZW5cbiAgKTtcbn07XG5cbi8qKlxuICogQXBwbGllcyB0aGUgZ2l2ZW4gc3R5bGVzIHRvIGEgYHNoYWRvd1Jvb3RgLiBXaGVuIFNoYWRvdyBET00gaXNcbiAqIGF2YWlsYWJsZSBidXQgYGFkb3B0ZWRTdHlsZVNoZWV0c2AgaXMgbm90LCBzdHlsZXMgYXJlIGFwcGVuZGVkIHRvIHRoZVxuICogYHNoYWRvd1Jvb3RgIHRvIFttaW1pYyB0aGUgbmF0aXZlIGZlYXR1cmVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9TaGFkb3dSb290L2Fkb3B0ZWRTdHlsZVNoZWV0cykuXG4gKiBOb3RlLCB3aGVuIHNoaW1taW5nIGlzIHVzZWQsIGFueSBzdHlsZXMgdGhhdCBhcmUgc3Vic2VxdWVudGx5IHBsYWNlZCBpbnRvXG4gKiB0aGUgc2hhZG93Um9vdCBzaG91bGQgYmUgcGxhY2VkICpiZWZvcmUqIGFueSBzaGltbWVkIGFkb3B0ZWQgc3R5bGVzLiBUaGlzXG4gKiB3aWxsIG1hdGNoIHNwZWMgYmVoYXZpb3IgdGhhdCBnaXZlcyBhZG9wdGVkIHNoZWV0cyBwcmVjZWRlbmNlIG92ZXIgc3R5bGVzIGluXG4gKiBzaGFkb3dSb290LlxuICovXG5leHBvcnQgY29uc3QgYWRvcHRTdHlsZXMgPSAoXG4gIHJlbmRlclJvb3Q6IFNoYWRvd1Jvb3QsXG4gIHN0eWxlczogQXJyYXk8Q1NTUmVzdWx0T3JOYXRpdmU+XG4pID0+IHtcbiAgaWYgKHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cykge1xuICAgIChyZW5kZXJSb290IGFzIFNoYWRvd1Jvb3QpLmFkb3B0ZWRTdHlsZVNoZWV0cyA9IHN0eWxlcy5tYXAoKHMpID0+XG4gICAgICBzIGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldCA/IHMgOiBzLnN0eWxlU2hlZXQhXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGNvbnN0IHMgb2Ygc3R5bGVzKSB7XG4gICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgY29uc3Qgbm9uY2UgPSAoZ2xvYmFsIGFzIGFueSlbJ2xpdE5vbmNlJ107XG4gICAgICBpZiAobm9uY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgbm9uY2UpO1xuICAgICAgfVxuICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSAocyBhcyBDU1NSZXN1bHQpLmNzc1RleHQ7XG4gICAgICByZW5kZXJSb290LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGNzc1Jlc3VsdEZyb21TdHlsZVNoZWV0ID0gKHNoZWV0OiBDU1NTdHlsZVNoZWV0KSA9PiB7XG4gIGxldCBjc3NUZXh0ID0gJyc7XG4gIGZvciAoY29uc3QgcnVsZSBvZiBzaGVldC5jc3NSdWxlcykge1xuICAgIGNzc1RleHQgKz0gcnVsZS5jc3NUZXh0O1xuICB9XG4gIHJldHVybiB1bnNhZmVDU1MoY3NzVGV4dCk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29tcGF0aWJsZVN0eWxlID1cbiAgc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzIHx8XG4gIChOT0RFX01PREUgJiYgZ2xvYmFsLkNTU1N0eWxlU2hlZXQgPT09IHVuZGVmaW5lZClcbiAgICA/IChzOiBDU1NSZXN1bHRPck5hdGl2ZSkgPT4gc1xuICAgIDogKHM6IENTU1Jlc3VsdE9yTmF0aXZlKSA9PlxuICAgICAgICBzIGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldCA/IGNzc1Jlc3VsdEZyb21TdHlsZVNoZWV0KHMpIDogcztcbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuLyoqXG4gKiBVc2UgdGhpcyBtb2R1bGUgaWYgeW91IHdhbnQgdG8gY3JlYXRlIHlvdXIgb3duIGJhc2UgY2xhc3MgZXh0ZW5kaW5nXG4gKiB7QGxpbmsgUmVhY3RpdmVFbGVtZW50fS5cbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICovXG5cbmltcG9ydCB7XG4gIGdldENvbXBhdGlibGVTdHlsZSxcbiAgYWRvcHRTdHlsZXMsXG4gIENTU1Jlc3VsdEdyb3VwLFxuICBDU1NSZXN1bHRPck5hdGl2ZSxcbn0gZnJvbSAnLi9jc3MtdGFnLmpzJztcbmltcG9ydCB0eXBlIHtcbiAgUmVhY3RpdmVDb250cm9sbGVyLFxuICBSZWFjdGl2ZUNvbnRyb2xsZXJIb3N0LFxufSBmcm9tICcuL3JlYWN0aXZlLWNvbnRyb2xsZXIuanMnO1xuXG4vLyBJbiB0aGUgTm9kZSBidWlsZCwgdGhpcyBpbXBvcnQgd2lsbCBiZSBpbmplY3RlZCBieSBSb2xsdXA6XG4vLyBpbXBvcnQge0hUTUxFbGVtZW50LCBjdXN0b21FbGVtZW50c30gZnJvbSAnQGxpdC1sYWJzL3Nzci1kb20tc2hpbSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vY3NzLXRhZy5qcyc7XG5leHBvcnQgdHlwZSB7XG4gIFJlYWN0aXZlQ29udHJvbGxlcixcbiAgUmVhY3RpdmVDb250cm9sbGVySG9zdCxcbn0gZnJvbSAnLi9yZWFjdGl2ZS1jb250cm9sbGVyLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBgcmVhZG9ubHlgIG1vZGlmaWVyIGZyb20gcHJvcGVydGllcyBpbiB0aGUgdW5pb24gSy5cbiAqXG4gKiBUaGlzIGlzIGEgc2FmZXIgd2F5IHRvIGNhc3QgYSB2YWx1ZSB0byBhIHR5cGUgd2l0aCBhIG11dGFibGUgdmVyc2lvbiBvZiBhXG4gKiByZWFkb25seSBmaWVsZCwgdGhhbiBjYXN0aW5nIHRvIGFuIGludGVyZmFjZSB3aXRoIHRoZSBmaWVsZCByZS1kZWNsYXJlZFxuICogYmVjYXVzZSBpdCBwcmVzZXJ2ZXMgdGhlIHR5cGUgb2YgYWxsIHRoZSBmaWVsZHMgYW5kIHdhcm5zIG9uIHR5cG9zLlxuICovXG50eXBlIE11dGFibGU8VCwgSyBleHRlbmRzIGtleW9mIFQ+ID0gT21pdDxULCBLPiAmIHtcbiAgLXJlYWRvbmx5IFtQIGluIGtleW9mIFBpY2s8VCwgSz5dOiBQIGV4dGVuZHMgSyA/IFRbUF0gOiBuZXZlcjtcbn07XG5cbi8vIFRPRE8gKGp1c3RpbmZhZ25hbmkpOiBBZGQgYGhhc093bmAgaGVyZSB3aGVuIHdlIHNoaXAgRVMyMDIyXG5jb25zdCB7XG4gIGlzLFxuICBkZWZpbmVQcm9wZXJ0eSxcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGdldFByb3RvdHlwZU9mLFxufSA9IE9iamVjdDtcblxuY29uc3QgTk9ERV9NT0RFID0gZmFsc2U7XG5cbi8vIExldHMgYSBtaW5pZmllciByZXBsYWNlIGdsb2JhbFRoaXMgcmVmZXJlbmNlcyB3aXRoIGEgbWluaWZpZWQgbmFtZVxuY29uc3QgZ2xvYmFsID0gZ2xvYmFsVGhpcztcblxuaWYgKE5PREVfTU9ERSkge1xuICBnbG9iYWwuY3VzdG9tRWxlbWVudHMgPz89IGN1c3RvbUVsZW1lbnRzO1xufVxuXG5jb25zdCBERVZfTU9ERSA9IHRydWU7XG5cbmxldCBpc3N1ZVdhcm5pbmc6IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4gdm9pZDtcblxuY29uc3QgdHJ1c3RlZFR5cGVzID0gKGdsb2JhbCBhcyB1bmtub3duIGFzIHt0cnVzdGVkVHlwZXM/OiB7ZW1wdHlTY3JpcHQ6ICcnfX0pXG4gIC50cnVzdGVkVHlwZXM7XG5cbi8vIFRlbXBvcmFyeSB3b3JrYXJvdW5kIGZvciBodHRwczovL2NyYnVnLmNvbS85OTMyNjhcbi8vIEN1cnJlbnRseSwgYW55IGF0dHJpYnV0ZSBzdGFydGluZyB3aXRoIFwib25cIiBpcyBjb25zaWRlcmVkIHRvIGJlIGFcbi8vIFRydXN0ZWRTY3JpcHQgc291cmNlLiBTdWNoIGJvb2xlYW4gYXR0cmlidXRlcyBtdXN0IGJlIHNldCB0byB0aGUgZXF1aXZhbGVudFxuLy8gdHJ1c3RlZCBlbXB0eVNjcmlwdCB2YWx1ZS5cbmNvbnN0IGVtcHR5U3RyaW5nRm9yQm9vbGVhbkF0dHJpYnV0ZSA9IHRydXN0ZWRUeXBlc1xuICA/ICh0cnVzdGVkVHlwZXMuZW1wdHlTY3JpcHQgYXMgdW5rbm93biBhcyAnJylcbiAgOiAnJztcblxuY29uc3QgcG9seWZpbGxTdXBwb3J0ID0gREVWX01PREVcbiAgPyBnbG9iYWwucmVhY3RpdmVFbGVtZW50UG9seWZpbGxTdXBwb3J0RGV2TW9kZVxuICA6IGdsb2JhbC5yZWFjdGl2ZUVsZW1lbnRQb2x5ZmlsbFN1cHBvcnQ7XG5cbmlmIChERVZfTU9ERSkge1xuICAvLyBFbnN1cmUgd2FybmluZ3MgYXJlIGlzc3VlZCBvbmx5IDF4LCBldmVuIGlmIG11bHRpcGxlIHZlcnNpb25zIG9mIExpdFxuICAvLyBhcmUgbG9hZGVkLlxuICBnbG9iYWwubGl0SXNzdWVkV2FybmluZ3MgPz89IG5ldyBTZXQoKTtcblxuICAvKipcbiAgICogSXNzdWUgYSB3YXJuaW5nIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgYmFzZWQgZWl0aGVyIG9uIGBjb2RlYCBvciBgd2FybmluZ2AuXG4gICAqIFdhcm5pbmdzIGFyZSBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5IG9ubHkgYnkgYHdhcm5pbmdgOyBkaXNhYmxpbmcgdmlhIGBjb2RlYFxuICAgKiBjYW4gYmUgZG9uZSBieSB1c2Vycy5cbiAgICovXG4gIGlzc3VlV2FybmluZyA9IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4ge1xuICAgIHdhcm5pbmcgKz0gYCBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy8ke2NvZGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLmA7XG4gICAgaWYgKFxuICAgICAgIWdsb2JhbC5saXRJc3N1ZWRXYXJuaW5ncyEuaGFzKHdhcm5pbmcpICYmXG4gICAgICAhZ2xvYmFsLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMoY29kZSlcbiAgICApIHtcbiAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbiAgICAgIGdsb2JhbC5saXRJc3N1ZWRXYXJuaW5ncyEuYWRkKHdhcm5pbmcpO1xuICAgIH1cbiAgfTtcblxuICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgaXNzdWVXYXJuaW5nKFxuICAgICAgJ2Rldi1tb2RlJyxcbiAgICAgIGBMaXQgaXMgaW4gZGV2IG1vZGUuIE5vdCByZWNvbW1lbmRlZCBmb3IgcHJvZHVjdGlvbiFgXG4gICAgKTtcblxuICAgIC8vIElzc3VlIHBvbHlmaWxsIHN1cHBvcnQgd2FybmluZy5cbiAgICBpZiAoZ2xvYmFsLlNoYWR5RE9NPy5pblVzZSAmJiBwb2x5ZmlsbFN1cHBvcnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXNzdWVXYXJuaW5nKFxuICAgICAgICAncG9seWZpbGwtc3VwcG9ydC1taXNzaW5nJyxcbiAgICAgICAgYFNoYWRvdyBET00gaXMgYmVpbmcgcG9seWZpbGxlZCB2aWEgXFxgU2hhZHlET01cXGAgYnV0IGAgK1xuICAgICAgICAgIGB0aGUgXFxgcG9seWZpbGwtc3VwcG9ydFxcYCBtb2R1bGUgaGFzIG5vdCBiZWVuIGxvYWRlZC5gXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQ29udGFpbnMgdHlwZXMgdGhhdCBhcmUgcGFydCBvZiB0aGUgdW5zdGFibGUgZGVidWcgQVBJLlxuICpcbiAqIEV2ZXJ5dGhpbmcgaW4gdGhpcyBBUEkgaXMgbm90IHN0YWJsZSBhbmQgbWF5IGNoYW5nZSBvciBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsXG4gKiBldmVuIG9uIHBhdGNoIHJlbGVhc2VzLlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuZXhwb3J0IG5hbWVzcGFjZSBSZWFjdGl2ZVVuc3RhYmxlIHtcbiAgLyoqXG4gICAqIFdoZW4gTGl0IGlzIHJ1bm5pbmcgaW4gZGV2IG1vZGUgYW5kIGB3aW5kb3cuZW1pdExpdERlYnVnTG9nRXZlbnRzYCBpcyB0cnVlLFxuICAgKiB3ZSB3aWxsIGVtaXQgJ2xpdC1kZWJ1ZycgZXZlbnRzIHRvIHdpbmRvdywgd2l0aCBsaXZlIGRldGFpbHMgYWJvdXQgdGhlIHVwZGF0ZSBhbmQgcmVuZGVyXG4gICAqIGxpZmVjeWNsZS4gVGhlc2UgY2FuIGJlIHVzZWZ1bCBmb3Igd3JpdGluZyBkZWJ1ZyB0b29saW5nIGFuZCB2aXN1YWxpemF0aW9ucy5cbiAgICpcbiAgICogUGxlYXNlIGJlIGF3YXJlIHRoYXQgcnVubmluZyB3aXRoIHdpbmRvdy5lbWl0TGl0RGVidWdMb2dFdmVudHMgaGFzIHBlcmZvcm1hbmNlIG92ZXJoZWFkLFxuICAgKiBtYWtpbmcgY2VydGFpbiBvcGVyYXRpb25zIHRoYXQgYXJlIG5vcm1hbGx5IHZlcnkgY2hlYXAgKGxpa2UgYSBuby1vcCByZW5kZXIpIG11Y2ggc2xvd2VyLFxuICAgKiBiZWNhdXNlIHdlIG11c3QgY29weSBkYXRhIGFuZCBkaXNwYXRjaCBldmVudHMuXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuICBleHBvcnQgbmFtZXNwYWNlIERlYnVnTG9nIHtcbiAgICBleHBvcnQgdHlwZSBFbnRyeSA9IFVwZGF0ZTtcbiAgICBleHBvcnQgaW50ZXJmYWNlIFVwZGF0ZSB7XG4gICAgICBraW5kOiAndXBkYXRlJztcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlYnVnTG9nZ2luZ1dpbmRvdyB7XG4gIC8vIEV2ZW4gaW4gZGV2IG1vZGUsIHdlIGdlbmVyYWxseSBkb24ndCB3YW50IHRvIGVtaXQgdGhlc2UgZXZlbnRzLCBhcyB0aGF0J3NcbiAgLy8gYW5vdGhlciBsZXZlbCBvZiBjb3N0LCBzbyBvbmx5IGVtaXQgdGhlbSB3aGVuIERFVl9NT0RFIGlzIHRydWUgX2FuZF8gd2hlblxuICAvLyB3aW5kb3cuZW1pdExpdERlYnVnRXZlbnRzIGlzIHRydWUuXG4gIGVtaXRMaXREZWJ1Z0xvZ0V2ZW50cz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogVXNlZnVsIGZvciB2aXN1YWxpemluZyBhbmQgbG9nZ2luZyBpbnNpZ2h0cyBpbnRvIHdoYXQgdGhlIExpdCB0ZW1wbGF0ZSBzeXN0ZW0gaXMgZG9pbmcuXG4gKlxuICogQ29tcGlsZWQgb3V0IG9mIHByb2QgbW9kZSBidWlsZHMuXG4gKi9cbmNvbnN0IGRlYnVnTG9nRXZlbnQgPSBERVZfTU9ERVxuICA/IChldmVudDogUmVhY3RpdmVVbnN0YWJsZS5EZWJ1Z0xvZy5FbnRyeSkgPT4ge1xuICAgICAgY29uc3Qgc2hvdWxkRW1pdCA9IChnbG9iYWwgYXMgdW5rbm93biBhcyBEZWJ1Z0xvZ2dpbmdXaW5kb3cpXG4gICAgICAgIC5lbWl0TGl0RGVidWdMb2dFdmVudHM7XG4gICAgICBpZiAoIXNob3VsZEVtaXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZ2xvYmFsLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudDxSZWFjdGl2ZVVuc3RhYmxlLkRlYnVnTG9nLkVudHJ5PignbGl0LWRlYnVnJywge1xuICAgICAgICAgIGRldGFpbDogZXZlbnQsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgOiB1bmRlZmluZWQ7XG5cbi8qXG4gKiBXaGVuIHVzaW5nIENsb3N1cmUgQ29tcGlsZXIsIEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkocHJvcGVydHksIG9iamVjdCkgaXNcbiAqIHJlcGxhY2VkIGF0IGNvbXBpbGUgdGltZSBieSB0aGUgbXVuZ2VkIG5hbWUgZm9yIG9iamVjdFtwcm9wZXJ0eV0uIFdlIGNhbm5vdFxuICogYWxpYXMgdGhpcyBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byB1c2UgYSBzbWFsbCBzaGltIHRoYXQgaGFzIHRoZSBzYW1lXG4gKiBiZWhhdmlvciB3aGVuIG5vdCBjb21waWxpbmcuXG4gKi9cbi8qQF9fSU5MSU5FX18qL1xuY29uc3QgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSA9IDxQIGV4dGVuZHMgUHJvcGVydHlLZXk+KFxuICBwcm9wOiBQLFxuICBfb2JqOiB1bmtub3duXG4pOiBQID0+IHByb3A7XG5cbi8qKlxuICogQ29udmVydHMgcHJvcGVydHkgdmFsdWVzIHRvIGFuZCBmcm9tIGF0dHJpYnV0ZSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGxleEF0dHJpYnV0ZUNvbnZlcnRlcjxUeXBlID0gdW5rbm93biwgVHlwZUhpbnQgPSB1bmtub3duPiB7XG4gIC8qKlxuICAgKiBDYWxsZWQgdG8gY29udmVydCBhbiBhdHRyaWJ1dGUgdmFsdWUgdG8gYSBwcm9wZXJ0eVxuICAgKiB2YWx1ZS5cbiAgICovXG4gIGZyb21BdHRyaWJ1dGU/KHZhbHVlOiBzdHJpbmcgfCBudWxsLCB0eXBlPzogVHlwZUhpbnQpOiBUeXBlO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgdG8gY29udmVydCBhIHByb3BlcnR5IHZhbHVlIHRvIGFuIGF0dHJpYnV0ZVxuICAgKiB2YWx1ZS5cbiAgICpcbiAgICogSXQgcmV0dXJucyB1bmtub3duIGluc3RlYWQgb2Ygc3RyaW5nLCB0byBiZSBjb21wYXRpYmxlIHdpdGhcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL1dJQ0cvdHJ1c3RlZC10eXBlcyAoYW5kIHNpbWlsYXIgZWZmb3J0cykuXG4gICAqL1xuICB0b0F0dHJpYnV0ZT8odmFsdWU6IFR5cGUsIHR5cGU/OiBUeXBlSGludCk6IHVua25vd247XG59XG5cbnR5cGUgQXR0cmlidXRlQ29udmVydGVyPFR5cGUgPSB1bmtub3duLCBUeXBlSGludCA9IHVua25vd24+ID1cbiAgfCBDb21wbGV4QXR0cmlidXRlQ29udmVydGVyPFR5cGU+XG4gIHwgKCh2YWx1ZTogc3RyaW5nIHwgbnVsbCwgdHlwZT86IFR5cGVIaW50KSA9PiBUeXBlKTtcblxuLyoqXG4gKiBEZWZpbmVzIG9wdGlvbnMgZm9yIGEgcHJvcGVydHkgYWNjZXNzb3IuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlEZWNsYXJhdGlvbjxUeXBlID0gdW5rbm93biwgVHlwZUhpbnQgPSB1bmtub3duPiB7XG4gIC8qKlxuICAgKiBXaGVuIHNldCB0byBgdHJ1ZWAsIGluZGljYXRlcyB0aGUgcHJvcGVydHkgaXMgaW50ZXJuYWwgcHJpdmF0ZSBzdGF0ZS4gVGhlXG4gICAqIHByb3BlcnR5IHNob3VsZCBub3QgYmUgc2V0IGJ5IHVzZXJzLiBXaGVuIHVzaW5nIFR5cGVTY3JpcHQsIHRoaXMgcHJvcGVydHlcbiAgICogc2hvdWxkIGJlIG1hcmtlZCBhcyBgcHJpdmF0ZWAgb3IgYHByb3RlY3RlZGAsIGFuZCBpdCBpcyBhbHNvIGEgY29tbW9uXG4gICAqIHByYWN0aWNlIHRvIHVzZSBhIGxlYWRpbmcgYF9gIGluIHRoZSBuYW1lLiBUaGUgcHJvcGVydHkgaXMgbm90IGFkZGVkIHRvXG4gICAqIGBvYnNlcnZlZEF0dHJpYnV0ZXNgLlxuICAgKi9cbiAgcmVhZG9ubHkgc3RhdGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IGFuZCB3aGV0aGVyIHRoZSBwcm9wZXJ0eSBiZWNvbWVzIGFuIG9ic2VydmVkIGF0dHJpYnV0ZS5cbiAgICogSWYgdGhlIHZhbHVlIGlzIGBmYWxzZWAsIHRoZSBwcm9wZXJ0eSBpcyBub3QgYWRkZWQgdG8gYG9ic2VydmVkQXR0cmlidXRlc2AuXG4gICAqIElmIHRydWUgb3IgYWJzZW50LCB0aGUgbG93ZXJjYXNlZCBwcm9wZXJ0eSBuYW1lIGlzIG9ic2VydmVkIChlLmcuIGBmb29CYXJgXG4gICAqIGJlY29tZXMgYGZvb2JhcmApLiBJZiBhIHN0cmluZywgdGhlIHN0cmluZyB2YWx1ZSBpcyBvYnNlcnZlZCAoZS5nXG4gICAqIGBhdHRyaWJ1dGU6ICdmb28tYmFyJ2ApLlxuICAgKi9cbiAgcmVhZG9ubHkgYXR0cmlidXRlPzogYm9vbGVhbiB8IHN0cmluZztcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoZSB0eXBlIG9mIHRoZSBwcm9wZXJ0eS4gVGhpcyBpcyB1c2VkIG9ubHkgYXMgYSBoaW50IGZvciB0aGVcbiAgICogYGNvbnZlcnRlcmAgdG8gZGV0ZXJtaW5lIGhvdyB0byBjb252ZXJ0IHRoZSBhdHRyaWJ1dGVcbiAgICogdG8vZnJvbSBhIHByb3BlcnR5LlxuICAgKi9cbiAgcmVhZG9ubHkgdHlwZT86IFR5cGVIaW50O1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IHRvIGNvbnZlcnQgdGhlIGF0dHJpYnV0ZSB0by9mcm9tIGEgcHJvcGVydHkuIElmIHRoaXMgdmFsdWVcbiAgICogaXMgYSBmdW5jdGlvbiwgaXQgaXMgdXNlZCB0byBjb252ZXJ0IHRoZSBhdHRyaWJ1dGUgdmFsdWUgYSB0aGUgcHJvcGVydHlcbiAgICogdmFsdWUuIElmIGl0J3MgYW4gb2JqZWN0LCBpdCBjYW4gaGF2ZSBrZXlzIGZvciBgZnJvbUF0dHJpYnV0ZWAgYW5kXG4gICAqIGB0b0F0dHJpYnV0ZWAuIElmIG5vIGB0b0F0dHJpYnV0ZWAgZnVuY3Rpb24gaXMgcHJvdmlkZWQgYW5kXG4gICAqIGByZWZsZWN0YCBpcyBzZXQgdG8gYHRydWVgLCB0aGUgcHJvcGVydHkgdmFsdWUgaXMgc2V0IGRpcmVjdGx5IHRvIHRoZVxuICAgKiBhdHRyaWJ1dGUuIEEgZGVmYXVsdCBgY29udmVydGVyYCBpcyB1c2VkIGlmIG5vbmUgaXMgcHJvdmlkZWQ7IGl0IHN1cHBvcnRzXG4gICAqIGBCb29sZWFuYCwgYFN0cmluZ2AsIGBOdW1iZXJgLCBgT2JqZWN0YCwgYW5kIGBBcnJheWAuIE5vdGUsXG4gICAqIHdoZW4gYSBwcm9wZXJ0eSBjaGFuZ2VzIGFuZCB0aGUgY29udmVydGVyIGlzIHVzZWQgdG8gdXBkYXRlIHRoZSBhdHRyaWJ1dGUsXG4gICAqIHRoZSBwcm9wZXJ0eSBpcyBuZXZlciB1cGRhdGVkIGFnYWluIGFzIGEgcmVzdWx0IG9mIHRoZSBhdHRyaWJ1dGUgY2hhbmdpbmcsXG4gICAqIGFuZCB2aWNlIHZlcnNhLlxuICAgKi9cbiAgcmVhZG9ubHkgY29udmVydGVyPzogQXR0cmlidXRlQ29udmVydGVyPFR5cGUsIFR5cGVIaW50PjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBwcm9wZXJ0eSBzaG91bGQgcmVmbGVjdCB0byBhbiBhdHRyaWJ1dGUuXG4gICAqIElmIGB0cnVlYCwgd2hlbiB0aGUgcHJvcGVydHkgaXMgc2V0LCB0aGUgYXR0cmlidXRlIGlzIHNldCB1c2luZyB0aGVcbiAgICogYXR0cmlidXRlIG5hbWUgZGV0ZXJtaW5lZCBhY2NvcmRpbmcgdG8gdGhlIHJ1bGVzIGZvciB0aGUgYGF0dHJpYnV0ZWBcbiAgICogcHJvcGVydHkgb3B0aW9uIGFuZCB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IGNvbnZlcnRlZCB1c2luZyB0aGUgcnVsZXNcbiAgICogZnJvbSB0aGUgYGNvbnZlcnRlcmAgcHJvcGVydHkgb3B0aW9uLlxuICAgKi9cbiAgcmVhZG9ubHkgcmVmbGVjdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBpbmRpY2F0ZXMgaWYgYSBwcm9wZXJ0eSBzaG91bGQgYmUgY29uc2lkZXJlZCBjaGFuZ2VkIHdoZW5cbiAgICogaXQgaXMgc2V0LiBUaGUgZnVuY3Rpb24gc2hvdWxkIHRha2UgdGhlIGBuZXdWYWx1ZWAgYW5kIGBvbGRWYWx1ZWAgYW5kXG4gICAqIHJldHVybiBgdHJ1ZWAgaWYgYW4gdXBkYXRlIHNob3VsZCBiZSByZXF1ZXN0ZWQuXG4gICAqL1xuICBoYXNDaGFuZ2VkPyh2YWx1ZTogVHlwZSwgb2xkVmFsdWU6IFR5cGUpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBhbiBhY2Nlc3NvciB3aWxsIGJlIGNyZWF0ZWQgZm9yIHRoaXMgcHJvcGVydHkuIEJ5XG4gICAqIGRlZmF1bHQsIGFuIGFjY2Vzc29yIHdpbGwgYmUgZ2VuZXJhdGVkIGZvciB0aGlzIHByb3BlcnR5IHRoYXQgcmVxdWVzdHMgYW5cbiAgICogdXBkYXRlIHdoZW4gc2V0LiBJZiB0aGlzIGZsYWcgaXMgYHRydWVgLCBubyBhY2Nlc3NvciB3aWxsIGJlIGNyZWF0ZWQsIGFuZFxuICAgKiBpdCB3aWxsIGJlIHRoZSB1c2VyJ3MgcmVzcG9uc2liaWxpdHkgdG8gY2FsbFxuICAgKiBgdGhpcy5yZXF1ZXN0VXBkYXRlKHByb3BlcnR5TmFtZSwgb2xkVmFsdWUpYCB0byByZXF1ZXN0IGFuIHVwZGF0ZSB3aGVuXG4gICAqIHRoZSBwcm9wZXJ0eSBjaGFuZ2VzLlxuICAgKi9cbiAgcmVhZG9ubHkgbm9BY2Nlc3Nvcj86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhpcyBwcm9wZXJ0eSBpcyB3cmFwcGluZyBhY2Nlc3NvcnMuIFRoaXMgaXMgc2V0IGJ5IGBAcHJvcGVydHlgXG4gICAqIHRvIGNvbnRyb2wgdGhlIGluaXRpYWwgdmFsdWUgY2hhbmdlIGFuZCByZWZsZWN0aW9uIGxvZ2ljLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHdyYXBwZWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGVuIGB0cnVlYCwgdXNlcyB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgYXMgdGhlIGRlZmF1bHQgdmFsdWUsXG4gICAqIHdoaWNoIGNoYW5nZXMgaG93IGF0dHJpYnV0ZXMgYXJlIGhhbmRsZWQ6XG4gICAqICAtIFRoZSBpbml0aWFsIHZhbHVlIGRvZXMgKm5vdCogcmVmbGVjdCwgZXZlbiBpZiB0aGUgYHJlZmxlY3RgIG9wdGlvbiBpcyBgdHJ1ZWAuXG4gICAqICAgIFN1YnNlcXVlbnQgY2hhbmdlcyB0byB0aGUgcHJvcGVydHkgd2lsbCByZWZsZWN0LCBldmVuIGlmIHRoZXkgYXJlIGVxdWFsIHRvIHRoZVxuICAgKiAgICAgZGVmYXVsdCB2YWx1ZS5cbiAgICogIC0gV2hlbiB0aGUgYXR0cmlidXRlIGlzIHJlbW92ZWQsIHRoZSBwcm9wZXJ0eSBpcyBzZXQgdG8gdGhlIGRlZmF1bHQgdmFsdWVcbiAgICogIC0gVGhlIGluaXRpYWwgdmFsdWUgd2lsbCBub3QgdHJpZ2dlciBhbiBvbGQgdmFsdWUgaW4gdGhlIGBjaGFuZ2VkUHJvcGVydGllc2AgbWFwXG4gICAqICAgIGFyZ3VtZW50IHRvIHVwZGF0ZSBsaWZlY3ljbGUgbWV0aG9kcy5cbiAgICpcbiAgICogV2hlbiBzZXQsIHByb3BlcnRpZXMgbXVzdCBiZSBpbml0aWFsaXplZCwgZWl0aGVyIHdpdGggYSBmaWVsZCBpbml0aWFsaXplciwgb3IgYW5cbiAgICogYXNzaWdubWVudCBpbiB0aGUgY29uc3RydWN0b3IuIE5vdCBpbml0aWFsaXppbmcgdGhlIHByb3BlcnR5IG1heSBsZWFkIHRvXG4gICAqIGltcHJvcGVyIGhhbmRsaW5nIG9mIHN1YnNlcXVlbnQgcHJvcGVydHkgYXNzaWdubWVudHMuXG4gICAqXG4gICAqIFdoaWxlIHRoaXMgYmVoYXZpb3IgaXMgb3B0LWluLCBtb3N0IHByb3BlcnRpZXMgdGhhdCByZWZsZWN0IHRvIGF0dHJpYnV0ZXMgc2hvdWxkXG4gICAqIHVzZSBgdXNlRGVmYXVsdDogdHJ1ZWAgc28gdGhhdCB0aGVpciBpbml0aWFsIHZhbHVlcyBkbyBub3QgcmVmbGVjdC5cbiAgICovXG4gIHVzZURlZmF1bHQ/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIE1hcCBvZiBwcm9wZXJ0aWVzIHRvIFByb3BlcnR5RGVjbGFyYXRpb24gb3B0aW9ucy4gRm9yIGVhY2ggcHJvcGVydHkgYW5cbiAqIGFjY2Vzc29yIGlzIG1hZGUsIGFuZCB0aGUgcHJvcGVydHkgaXMgcHJvY2Vzc2VkIGFjY29yZGluZyB0byB0aGVcbiAqIFByb3BlcnR5RGVjbGFyYXRpb24gb3B0aW9ucy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcm9wZXJ0eURlY2xhcmF0aW9ucyB7XG4gIHJlYWRvbmx5IFtrZXk6IHN0cmluZ106IFByb3BlcnR5RGVjbGFyYXRpb247XG59XG5cbnR5cGUgUHJvcGVydHlEZWNsYXJhdGlvbk1hcCA9IE1hcDxQcm9wZXJ0eUtleSwgUHJvcGVydHlEZWNsYXJhdGlvbj47XG5cbnR5cGUgQXR0cmlidXRlTWFwID0gTWFwPHN0cmluZywgUHJvcGVydHlLZXk+O1xuXG4vKipcbiAqIEEgTWFwIG9mIHByb3BlcnR5IGtleXMgdG8gdmFsdWVzLlxuICpcbiAqIFRha2VzIGFuIG9wdGlvbmFsIHR5cGUgcGFyYW1ldGVyIFQsIHdoaWNoIHdoZW4gc3BlY2lmaWVkIGFzIGEgbm9uLWFueSxcbiAqIG5vbi11bmtub3duIHR5cGUsIHdpbGwgbWFrZSB0aGUgTWFwIG1vcmUgc3Ryb25nbHktdHlwZWQsIGFzc29jaWF0aW5nIHRoZSBtYXBcbiAqIGtleXMgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nIHZhbHVlIHR5cGUgb24gVC5cbiAqXG4gKiBVc2UgYFByb3BlcnR5VmFsdWVzPHRoaXM+YCB3aGVuIG92ZXJyaWRpbmcgUmVhY3RpdmVFbGVtZW50LnVwZGF0ZSgpIGFuZFxuICogb3RoZXIgbGlmZWN5Y2xlIG1ldGhvZHMgaW4gb3JkZXIgdG8gZ2V0IHN0cm9uZ2VyIHR5cGUtY2hlY2tpbmcgb24ga2V5c1xuICogYW5kIHZhbHVlcy5cbiAqL1xuLy8gVGhpcyB0eXBlIGlzIGNvbmRpdGlvbmFsIHNvIHRoYXQgaWYgdGhlIHBhcmFtZXRlciBUIGlzIG5vdCBzcGVjaWZpZWQsIG9yXG4vLyBpcyBgYW55YCwgdGhlIHR5cGUgd2lsbCBpbmNsdWRlIGBNYXA8UHJvcGVydHlLZXksIHVua25vd24+YC4gU2luY2UgVCBpcyBub3Rcbi8vIGdpdmVuIGluIHRoZSB1c2VzIG9mIFByb3BlcnR5VmFsdWVzIGluIHRoaXMgZmlsZSwgYWxsIHVzZXMgaGVyZSBmYWxsYmFjayB0b1xuLy8gbWVhbmluZyBgTWFwPFByb3BlcnR5S2V5LCB1bmtub3duPmAsIGJ1dCBpZiBhIGRldmVsb3BlciB1c2VzXG4vLyBgUHJvcGVydHlWYWx1ZXM8dGhpcz5gIChvciBhbnkgb3RoZXIgdmFsdWUgZm9yIFQpIHRoZXkgd2lsbCBnZXQgYVxuLy8gc3Ryb25nbHktdHlwZWQgTWFwIHR5cGUuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IHR5cGUgUHJvcGVydHlWYWx1ZXM8VCA9IGFueT4gPSBUIGV4dGVuZHMgb2JqZWN0XG4gID8gUHJvcGVydHlWYWx1ZU1hcDxUPlxuICA6IE1hcDxQcm9wZXJ0eUtleSwgdW5rbm93bj47XG5cbi8qKlxuICogRG8gbm90IHVzZSwgaW5zdGVhZCBwcmVmZXIge0BsaW5rY29kZSBQcm9wZXJ0eVZhbHVlc30uXG4gKi9cbi8vIFRoaXMgdHlwZSBtdXN0IGJlIGV4cG9ydGVkIHN1Y2ggdGhhdCBKYXZhU2NyaXB0IGdlbmVyYXRlZCBieSB0aGUgR29vZ2xlXG4vLyBDbG9zdXJlIENvbXBpbGVyIGNhbiBpbXBvcnQgYSB0eXBlIHJlZmVyZW5jZS5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlWYWx1ZU1hcDxUPiBleHRlbmRzIE1hcDxQcm9wZXJ0eUtleSwgdW5rbm93bj4ge1xuICBnZXQ8SyBleHRlbmRzIGtleW9mIFQ+KGs6IEspOiBUW0tdIHwgdW5kZWZpbmVkO1xuICBzZXQ8SyBleHRlbmRzIGtleW9mIFQ+KGtleTogSywgdmFsdWU6IFRbS10pOiB0aGlzO1xuICBoYXM8SyBleHRlbmRzIGtleW9mIFQ+KGs6IEspOiBib29sZWFuO1xuICBkZWxldGU8SyBleHRlbmRzIGtleW9mIFQ+KGs6IEspOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdENvbnZlcnRlcjogQ29tcGxleEF0dHJpYnV0ZUNvbnZlcnRlciA9IHtcbiAgdG9BdHRyaWJ1dGUodmFsdWU6IHVua25vd24sIHR5cGU/OiB1bmtub3duKTogdW5rbm93biB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEJvb2xlYW46XG4gICAgICAgIHZhbHVlID0gdmFsdWUgPyBlbXB0eVN0cmluZ0ZvckJvb2xlYW5BdHRyaWJ1dGUgOiBudWxsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgT2JqZWN0OlxuICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIGBudWxsYCBvciBgdW5kZWZpbmVkYCBwYXNzIHRoaXMgdGhyb3VnaFxuICAgICAgICAvLyB0byBhbGxvdyByZW1vdmluZy9ubyBjaGFuZ2UgYmVoYXZpb3IuXG4gICAgICAgIHZhbHVlID0gdmFsdWUgPT0gbnVsbCA/IHZhbHVlIDogSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIGZyb21BdHRyaWJ1dGUodmFsdWU6IHN0cmluZyB8IG51bGwsIHR5cGU/OiB1bmtub3duKSB7XG4gICAgbGV0IGZyb21WYWx1ZTogdW5rbm93biA9IHZhbHVlO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBCb29sZWFuOlxuICAgICAgICBmcm9tVmFsdWUgPSB2YWx1ZSAhPT0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE51bWJlcjpcbiAgICAgICAgZnJvbVZhbHVlID0gdmFsdWUgPT09IG51bGwgPyBudWxsIDogTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE9iamVjdDpcbiAgICAgIGNhc2UgQXJyYXk6XG4gICAgICAgIC8vIERvICpub3QqIGdlbmVyYXRlIGV4Y2VwdGlvbiB3aGVuIGludmFsaWQgSlNPTiBpcyBzZXQgYXMgZWxlbWVudHNcbiAgICAgICAgLy8gZG9uJ3Qgbm9ybWFsbHkgY29tcGxhaW4gb24gYmVpbmcgbWlzLWNvbmZpZ3VyZWQuXG4gICAgICAgIC8vIFRPRE8oc29ydmVsbCk6IERvIGdlbmVyYXRlIGV4Y2VwdGlvbiBpbiAqZGV2IG1vZGUqLlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIEFzc2VydCB0byBhZGhlcmUgdG8gQmF6ZWwncyBcIm11c3QgdHlwZSBhc3NlcnQgSlNPTiBwYXJzZVwiIHJ1bGUuXG4gICAgICAgICAgZnJvbVZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSEpIGFzIHVua25vd247XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBmcm9tVmFsdWUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gZnJvbVZhbHVlO1xuICB9LFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBIYXNDaGFuZ2VkIHtcbiAgKHZhbHVlOiB1bmtub3duLCBvbGQ6IHVua25vd24pOiBib29sZWFuO1xufVxuXG4vKipcbiAqIENoYW5nZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIGRpZmZlcmVudCBmcm9tIGBvbGRWYWx1ZWAuXG4gKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGFzIHRoZSBkZWZhdWx0IGZvciBhIHByb3BlcnR5J3MgYGhhc0NoYW5nZWRgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3Qgbm90RXF1YWw6IEhhc0NoYW5nZWQgPSAodmFsdWU6IHVua25vd24sIG9sZDogdW5rbm93bik6IGJvb2xlYW4gPT5cbiAgIWlzKHZhbHVlLCBvbGQpO1xuXG5jb25zdCBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvbjogUHJvcGVydHlEZWNsYXJhdGlvbiA9IHtcbiAgYXR0cmlidXRlOiB0cnVlLFxuICB0eXBlOiBTdHJpbmcsXG4gIGNvbnZlcnRlcjogZGVmYXVsdENvbnZlcnRlcixcbiAgcmVmbGVjdDogZmFsc2UsXG4gIHVzZURlZmF1bHQ6IGZhbHNlLFxuICBoYXNDaGFuZ2VkOiBub3RFcXVhbCxcbn07XG5cbi8qKlxuICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIG9uZSBvZiB0aGUgc3VwcG9ydGVkIGRldiBtb2RlIHdhcm5pbmcgY2F0ZWdvcmllcy5cbiAqL1xuZXhwb3J0IHR5cGUgV2FybmluZ0tpbmQgPVxuICB8ICdjaGFuZ2UtaW4tdXBkYXRlJ1xuICB8ICdtaWdyYXRpb24nXG4gIHwgJ2FzeW5jLXBlcmZvcm0tdXBkYXRlJztcblxuZXhwb3J0IHR5cGUgSW5pdGlhbGl6ZXIgPSAoZWxlbWVudDogUmVhY3RpdmVFbGVtZW50KSA9PiB2b2lkO1xuXG4vLyBUZW1wb3JhcnksIHVudGlsIGdvb2dsZTMgaXMgb24gVHlwZVNjcmlwdCA1LjJcbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFN5bWJvbENvbnN0cnVjdG9yIHtcbiAgICByZWFkb25seSBtZXRhZGF0YTogdW5pcXVlIHN5bWJvbDtcbiAgfVxufVxuXG4vLyBFbnN1cmUgbWV0YWRhdGEgaXMgZW5hYmxlZC4gVHlwZVNjcmlwdCBkb2VzIG5vdCBwb2x5ZmlsbFxuLy8gU3ltYm9sLm1ldGFkYXRhLCBzbyB3ZSBtdXN0IGVuc3VyZSB0aGF0IGl0IGV4aXN0cy5cbihTeW1ib2wgYXMge21ldGFkYXRhOiBzeW1ib2x9KS5tZXRhZGF0YSA/Pz0gU3ltYm9sKCdtZXRhZGF0YScpO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8vIFRoaXMgaXMgcHVibGljIGdsb2JhbCBBUEksIGRvIG5vdCBjaGFuZ2UhXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby12YXJcbiAgdmFyIGxpdFByb3BlcnR5TWV0YWRhdGE6IFdlYWtNYXA8XG4gICAgb2JqZWN0LFxuICAgIE1hcDxQcm9wZXJ0eUtleSwgUHJvcGVydHlEZWNsYXJhdGlvbj5cbiAgPjtcbn1cblxuLy8gTWFwIGZyb20gYSBjbGFzcydzIG1ldGFkYXRhIG9iamVjdCB0byBwcm9wZXJ0eSBvcHRpb25zXG4vLyBOb3RlIHRoYXQgd2UgbXVzdCB1c2UgbnVsbGlzaC1jb2FsZXNjaW5nIGFzc2lnbm1lbnQgc28gdGhhdCB3ZSBvbmx5IHVzZSBvbmVcbi8vIG1hcCBldmVuIGlmIHdlIGxvYWQgbXVsdGlwbGUgdmVyc2lvbiBvZiB0aGlzIG1vZHVsZS5cbmdsb2JhbC5saXRQcm9wZXJ0eU1ldGFkYXRhID8/PSBuZXcgV2Vha01hcDxcbiAgb2JqZWN0LFxuICBNYXA8UHJvcGVydHlLZXksIFByb3BlcnR5RGVjbGFyYXRpb24+XG4+KCk7XG5cbi8qKlxuICogQmFzZSBlbGVtZW50IGNsYXNzIHdoaWNoIG1hbmFnZXMgZWxlbWVudCBwcm9wZXJ0aWVzIGFuZCBhdHRyaWJ1dGVzLiBXaGVuXG4gKiBwcm9wZXJ0aWVzIGNoYW5nZSwgdGhlIGB1cGRhdGVgIG1ldGhvZCBpcyBhc3luY2hyb25vdXNseSBjYWxsZWQuIFRoaXMgbWV0aG9kXG4gKiBzaG91bGQgYmUgc3VwcGxpZWQgYnkgc3ViY2xhc3NlcyB0byByZW5kZXIgdXBkYXRlcyBhcyBkZXNpcmVkLlxuICogQG5vSW5oZXJpdERvY1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVhY3RpdmVFbGVtZW50XG4gIC8vIEluIHRoZSBOb2RlIGJ1aWxkLCB0aGlzIGBleHRlbmRzYCBjbGF1c2Ugd2lsbCBiZSBzdWJzdGl0dXRlZCB3aXRoXG4gIC8vIGAoZ2xvYmFsVGhpcy5IVE1MRWxlbWVudCA/PyBIVE1MRWxlbWVudClgLlxuICAvL1xuICAvLyBUaGlzIHdheSwgd2Ugd2lsbCBmaXJzdCBwcmVmZXIgYW55IGdsb2JhbCBgSFRNTEVsZW1lbnRgIHBvbHlmaWxsIHRoYXQgdGhlXG4gIC8vIHVzZXIgaGFzIGFzc2lnbmVkLCBhbmQgdGhlbiBmYWxsIGJhY2sgdG8gdGhlIGBIVE1MRWxlbWVudGAgc2hpbSB3aGljaCBoYXNcbiAgLy8gYmVlbiBpbXBvcnRlZCAoc2VlIG5vdGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUgYWJvdXQgaG93IHRoaXMgaW1wb3J0IGlzXG4gIC8vIGdlbmVyYXRlZCBieSBSb2xsdXApLiBOb3RlIHRoYXQgdGhlIGBIVE1MRWxlbWVudGAgdmFyaWFibGUgaGFzIGJlZW5cbiAgLy8gc2hhZG93ZWQgYnkgdGhpcyBpbXBvcnQsIHNvIGl0IG5vIGxvbmdlciByZWZlcnMgdG8gdGhlIGdsb2JhbC5cbiAgZXh0ZW5kcyBIVE1MRWxlbWVudFxuICBpbXBsZW1lbnRzIFJlYWN0aXZlQ29udHJvbGxlckhvc3RcbntcbiAgLy8gTm90ZTogdGhlc2UgYXJlIHBhdGNoZWQgaW4gb25seSBpbiBERVZfTU9ERS5cbiAgLyoqXG4gICAqIFJlYWQgb3Igc2V0IGFsbCB0aGUgZW5hYmxlZCB3YXJuaW5nIGNhdGVnb3JpZXMgZm9yIHRoaXMgY2xhc3MuXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgb25seSB1c2VkIGluIGRldmVsb3BtZW50IGJ1aWxkcy5cbiAgICpcbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IGRldi1tb2RlXG4gICAqL1xuICBzdGF0aWMgZW5hYmxlZFdhcm5pbmdzPzogV2FybmluZ0tpbmRbXTtcblxuICAvKipcbiAgICogRW5hYmxlIHRoZSBnaXZlbiB3YXJuaW5nIGNhdGVnb3J5IGZvciB0aGlzIGNsYXNzLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBvbmx5IGV4aXN0cyBpbiBkZXZlbG9wbWVudCBidWlsZHMsIHNvIGl0IHNob3VsZCBiZSBhY2Nlc3NlZFxuICAgKiB3aXRoIGEgZ3VhcmQgbGlrZTpcbiAgICpcbiAgICogYGBgdHNcbiAgICogLy8gRW5hYmxlIGZvciBhbGwgUmVhY3RpdmVFbGVtZW50IHN1YmNsYXNzZXNcbiAgICogUmVhY3RpdmVFbGVtZW50LmVuYWJsZVdhcm5pbmc/LignbWlncmF0aW9uJyk7XG4gICAqXG4gICAqIC8vIEVuYWJsZSBmb3Igb25seSBNeUVsZW1lbnQgYW5kIHN1YmNsYXNzZXNcbiAgICogTXlFbGVtZW50LmVuYWJsZVdhcm5pbmc/LignbWlncmF0aW9uJyk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKiBAY2F0ZWdvcnkgZGV2LW1vZGVcbiAgICovXG4gIHN0YXRpYyBlbmFibGVXYXJuaW5nPzogKHdhcm5pbmdLaW5kOiBXYXJuaW5nS2luZCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogRGlzYWJsZSB0aGUgZ2l2ZW4gd2FybmluZyBjYXRlZ29yeSBmb3IgdGhpcyBjbGFzcy5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgb25seSBleGlzdHMgaW4gZGV2ZWxvcG1lbnQgYnVpbGRzLCBzbyBpdCBzaG91bGQgYmUgYWNjZXNzZWRcbiAgICogd2l0aCBhIGd1YXJkIGxpa2U6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIC8vIERpc2FibGUgZm9yIGFsbCBSZWFjdGl2ZUVsZW1lbnQgc3ViY2xhc3Nlc1xuICAgKiBSZWFjdGl2ZUVsZW1lbnQuZGlzYWJsZVdhcm5pbmc/LignbWlncmF0aW9uJyk7XG4gICAqXG4gICAqIC8vIERpc2FibGUgZm9yIG9ubHkgTXlFbGVtZW50IGFuZCBzdWJjbGFzc2VzXG4gICAqIE15RWxlbWVudC5kaXNhYmxlV2FybmluZz8uKCdtaWdyYXRpb24nKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEBub2NvbGxhcHNlXG4gICAqIEBjYXRlZ29yeSBkZXYtbW9kZVxuICAgKi9cbiAgc3RhdGljIGRpc2FibGVXYXJuaW5nPzogKHdhcm5pbmdLaW5kOiBXYXJuaW5nS2luZCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogQWRkcyBhbiBpbml0aWFsaXplciBmdW5jdGlvbiB0byB0aGUgY2xhc3MgdGhhdCBpcyBjYWxsZWQgZHVyaW5nIGluc3RhbmNlXG4gICAqIGNvbnN0cnVjdGlvbi5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VmdWwgZm9yIGNvZGUgdGhhdCBydW5zIGFnYWluc3QgYSBgUmVhY3RpdmVFbGVtZW50YFxuICAgKiBzdWJjbGFzcywgc3VjaCBhcyBhIGRlY29yYXRvciwgdGhhdCBuZWVkcyB0byBkbyB3b3JrIGZvciBlYWNoXG4gICAqIGluc3RhbmNlLCBzdWNoIGFzIHNldHRpbmcgdXAgYSBgUmVhY3RpdmVDb250cm9sbGVyYC5cbiAgICpcbiAgICogYGBgdHNcbiAgICogY29uc3QgbXlEZWNvcmF0b3IgPSAodGFyZ2V0OiB0eXBlb2YgUmVhY3RpdmVFbGVtZW50LCBrZXk6IHN0cmluZykgPT4ge1xuICAgKiAgIHRhcmdldC5hZGRJbml0aWFsaXplcigoaW5zdGFuY2U6IFJlYWN0aXZlRWxlbWVudCkgPT4ge1xuICAgKiAgICAgLy8gVGhpcyBpcyBydW4gZHVyaW5nIGNvbnN0cnVjdGlvbiBvZiB0aGUgZWxlbWVudFxuICAgKiAgICAgbmV3IE15Q29udHJvbGxlcihpbnN0YW5jZSk7XG4gICAqICAgfSk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIERlY29yYXRpbmcgYSBmaWVsZCB3aWxsIHRoZW4gY2F1c2UgZWFjaCBpbnN0YW5jZSB0byBydW4gYW4gaW5pdGlhbGl6ZXJcbiAgICogdGhhdCBhZGRzIGEgY29udHJvbGxlcjpcbiAgICpcbiAgICogYGBgdHNcbiAgICogY2xhc3MgTXlFbGVtZW50IGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gICAqICAgQG15RGVjb3JhdG9yIGZvbztcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogSW5pdGlhbGl6ZXJzIGFyZSBzdG9yZWQgcGVyLWNvbnN0cnVjdG9yLiBBZGRpbmcgYW4gaW5pdGlhbGl6ZXIgdG8gYVxuICAgKiBzdWJjbGFzcyBkb2VzIG5vdCBhZGQgaXQgdG8gYSBzdXBlcmNsYXNzLiBTaW5jZSBpbml0aWFsaXplcnMgYXJlIHJ1biBpblxuICAgKiBjb25zdHJ1Y3RvcnMsIGluaXRpYWxpemVycyB3aWxsIHJ1biBpbiBvcmRlciBvZiB0aGUgY2xhc3MgaGllcmFyY2h5LFxuICAgKiBzdGFydGluZyB3aXRoIHN1cGVyY2xhc3NlcyBhbmQgcHJvZ3Jlc3NpbmcgdG8gdGhlIGluc3RhbmNlJ3MgY2xhc3MuXG4gICAqXG4gICAqIEBub2NvbGxhcHNlXG4gICAqL1xuICBzdGF0aWMgYWRkSW5pdGlhbGl6ZXIoaW5pdGlhbGl6ZXI6IEluaXRpYWxpemVyKSB7XG4gICAgdGhpcy5fX3ByZXBhcmUoKTtcbiAgICAodGhpcy5faW5pdGlhbGl6ZXJzID8/PSBbXSkucHVzaChpbml0aWFsaXplcik7XG4gIH1cblxuICBzdGF0aWMgX2luaXRpYWxpemVycz86IEluaXRpYWxpemVyW107XG5cbiAgLypcbiAgICogRHVlIHRvIGNsb3N1cmUgY29tcGlsZXIgRVM2IGNvbXBpbGF0aW9uIGJ1Z3MsIEBub2NvbGxhcHNlIGlzIHJlcXVpcmVkIG9uXG4gICAqIGFsbCBzdGF0aWMgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB3aXRoIGluaXRpYWxpemVycy4gIFJlZmVyZW5jZTpcbiAgICogLSBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL2Nsb3N1cmUtY29tcGlsZXIvaXNzdWVzLzE3NzZcbiAgICovXG5cbiAgLyoqXG4gICAqIE1hcHMgYXR0cmlidXRlIG5hbWVzIHRvIHByb3BlcnRpZXM7IGZvciBleGFtcGxlIGBmb29iYXJgIGF0dHJpYnV0ZSB0b1xuICAgKiBgZm9vQmFyYCBwcm9wZXJ0eS4gQ3JlYXRlZCBsYXppbHkgb24gdXNlciBzdWJjbGFzc2VzIHdoZW4gZmluYWxpemluZyB0aGVcbiAgICogY2xhc3MuXG4gICAqIEBub2NvbGxhcHNlXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBfX2F0dHJpYnV0ZVRvUHJvcGVydHlNYXA6IEF0dHJpYnV0ZU1hcDtcblxuICAvKipcbiAgICogTWFya3MgY2xhc3MgYXMgaGF2aW5nIGJlZW4gZmluYWxpemVkLCB3aGljaCBpbmNsdWRlcyBjcmVhdGluZyBwcm9wZXJ0aWVzXG4gICAqIGZyb20gYHN0YXRpYyBwcm9wZXJ0aWVzYCwgYnV0IGRvZXMgKm5vdCogaW5jbHVkZSBhbGwgcHJvcGVydGllcyBjcmVhdGVkXG4gICAqIGZyb20gZGVjb3JhdG9ycy5cbiAgICogQG5vY29sbGFwc2VcbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgZmluYWxpemVkOiB0cnVlIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBNZW1vaXplZCBsaXN0IG9mIGFsbCBlbGVtZW50IHByb3BlcnRpZXMsIGluY2x1ZGluZyBhbnkgc3VwZXJjbGFzc1xuICAgKiBwcm9wZXJ0aWVzLiBDcmVhdGVkIGxhemlseSBvbiB1c2VyIHN1YmNsYXNzZXMgd2hlbiBmaW5hbGl6aW5nIHRoZSBjbGFzcy5cbiAgICpcbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHByb3BlcnRpZXNcbiAgICovXG4gIHN0YXRpYyBlbGVtZW50UHJvcGVydGllczogUHJvcGVydHlEZWNsYXJhdGlvbk1hcDtcblxuICAvKipcbiAgICogVXNlci1zdXBwbGllZCBvYmplY3QgdGhhdCBtYXBzIHByb3BlcnR5IG5hbWVzIHRvIGBQcm9wZXJ0eURlY2xhcmF0aW9uYFxuICAgKiBvYmplY3RzIGNvbnRhaW5pbmcgb3B0aW9ucyBmb3IgY29uZmlndXJpbmcgcmVhY3RpdmUgcHJvcGVydGllcy4gV2hlblxuICAgKiBhIHJlYWN0aXZlIHByb3BlcnR5IGlzIHNldCB0aGUgZWxlbWVudCB3aWxsIHVwZGF0ZSBhbmQgcmVuZGVyLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0IHByb3BlcnRpZXMgYXJlIHB1YmxpYyBmaWVsZHMsIGFuZCBhcyBzdWNoLCB0aGV5IHNob3VsZCBiZVxuICAgKiBjb25zaWRlcmVkIGFzIHByaW1hcmlseSBzZXR0YWJsZSBieSBlbGVtZW50IHVzZXJzLCBlaXRoZXIgdmlhIGF0dHJpYnV0ZSBvclxuICAgKiB0aGUgcHJvcGVydHkgaXRzZWxmLlxuICAgKlxuICAgKiBHZW5lcmFsbHksIHByb3BlcnRpZXMgdGhhdCBhcmUgY2hhbmdlZCBieSB0aGUgZWxlbWVudCBzaG91bGQgYmUgcHJpdmF0ZSBvclxuICAgKiBwcm90ZWN0ZWQgZmllbGRzIGFuZCBzaG91bGQgdXNlIHRoZSBgc3RhdGU6IHRydWVgIG9wdGlvbi4gUHJvcGVydGllc1xuICAgKiBtYXJrZWQgYXMgYHN0YXRlYCBkbyBub3QgcmVmbGVjdCBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIGF0dHJpYnV0ZVxuICAgKlxuICAgKiBIb3dldmVyLCBzb21ldGltZXMgZWxlbWVudCBjb2RlIGRvZXMgbmVlZCB0byBzZXQgYSBwdWJsaWMgcHJvcGVydHkuIFRoaXNcbiAgICogc2hvdWxkIHR5cGljYWxseSBvbmx5IGJlIGRvbmUgaW4gcmVzcG9uc2UgdG8gdXNlciBpbnRlcmFjdGlvbiwgYW5kIGFuIGV2ZW50XG4gICAqIHNob3VsZCBiZSBmaXJlZCBpbmZvcm1pbmcgdGhlIHVzZXI7IGZvciBleGFtcGxlLCBhIGNoZWNrYm94IHNldHMgaXRzXG4gICAqIGBjaGVja2VkYCBwcm9wZXJ0eSB3aGVuIGNsaWNrZWQgYW5kIGZpcmVzIGEgYGNoYW5nZWRgIGV2ZW50LiBNdXRhdGluZ1xuICAgKiBwdWJsaWMgcHJvcGVydGllcyBzaG91bGQgdHlwaWNhbGx5IG5vdCBiZSBkb25lIGZvciBub24tcHJpbWl0aXZlIChvYmplY3Qgb3JcbiAgICogYXJyYXkpIHByb3BlcnRpZXMuIEluIG90aGVyIGNhc2VzIHdoZW4gYW4gZWxlbWVudCBuZWVkcyB0byBtYW5hZ2Ugc3RhdGUsIGFcbiAgICogcHJpdmF0ZSBwcm9wZXJ0eSBzZXQgd2l0aCB0aGUgYHN0YXRlOiB0cnVlYCBvcHRpb24gc2hvdWxkIGJlIHVzZWQuIFdoZW5cbiAgICogbmVlZGVkLCBzdGF0ZSBwcm9wZXJ0aWVzIGNhbiBiZSBpbml0aWFsaXplZCB2aWEgcHVibGljIHByb3BlcnRpZXMgdG9cbiAgICogZmFjaWxpdGF0ZSBjb21wbGV4IGludGVyYWN0aW9ucy5cbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHByb3BlcnRpZXNcbiAgICovXG4gIHN0YXRpYyBwcm9wZXJ0aWVzOiBQcm9wZXJ0eURlY2xhcmF0aW9ucztcblxuICAvKipcbiAgICogTWVtb2l6ZWQgbGlzdCBvZiBhbGwgZWxlbWVudCBzdHlsZXMuXG4gICAqIENyZWF0ZWQgbGF6aWx5IG9uIHVzZXIgc3ViY2xhc3NlcyB3aGVuIGZpbmFsaXppbmcgdGhlIGNsYXNzLlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKiBAY2F0ZWdvcnkgc3R5bGVzXG4gICAqL1xuICBzdGF0aWMgZWxlbWVudFN0eWxlczogQXJyYXk8Q1NTUmVzdWx0T3JOYXRpdmU+ID0gW107XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIHN0eWxlcyB0byBhcHBseSB0byB0aGUgZWxlbWVudC4gVGhlIHN0eWxlcyBzaG91bGQgYmUgZGVmaW5lZFxuICAgKiB1c2luZyB0aGUge0BsaW5rY29kZSBjc3N9IHRhZyBmdW5jdGlvbiwgdmlhIGNvbnN0cnVjdGlibGUgc3R5bGVzaGVldHMsIG9yXG4gICAqIGltcG9ydGVkIGZyb20gbmF0aXZlIENTUyBtb2R1bGUgc2NyaXB0cy5cbiAgICpcbiAgICogTm90ZSBvbiBDb250ZW50IFNlY3VyaXR5IFBvbGljeTpcbiAgICpcbiAgICogRWxlbWVudCBzdHlsZXMgYXJlIGltcGxlbWVudGVkIHdpdGggYDxzdHlsZT5gIHRhZ3Mgd2hlbiB0aGUgYnJvd3NlciBkb2Vzbid0XG4gICAqIHN1cHBvcnQgYWRvcHRlZCBTdHlsZVNoZWV0cy4gVG8gdXNlIHN1Y2ggYDxzdHlsZT5gIHRhZ3Mgd2l0aCB0aGUgc3R5bGUtc3JjXG4gICAqIENTUCBkaXJlY3RpdmUsIHRoZSBzdHlsZS1zcmMgdmFsdWUgbXVzdCBlaXRoZXIgaW5jbHVkZSAndW5zYWZlLWlubGluZScgb3JcbiAgICogYG5vbmNlLTxiYXNlNjQtdmFsdWU+YCB3aXRoIGA8YmFzZTY0LXZhbHVlPmAgcmVwbGFjZWQgYmUgYSBzZXJ2ZXItZ2VuZXJhdGVkXG4gICAqIG5vbmNlLlxuICAgKlxuICAgKiBUbyBwcm92aWRlIGEgbm9uY2UgdG8gdXNlIG9uIGdlbmVyYXRlZCBgPHN0eWxlPmAgZWxlbWVudHMsIHNldFxuICAgKiBgd2luZG93LmxpdE5vbmNlYCB0byBhIHNlcnZlci1nZW5lcmF0ZWQgbm9uY2UgaW4geW91ciBwYWdlJ3MgSFRNTCwgYmVmb3JlXG4gICAqIGxvYWRpbmcgYXBwbGljYXRpb24gY29kZTpcbiAgICpcbiAgICogYGBgaHRtbFxuICAgKiA8c2NyaXB0PlxuICAgKiAgIC8vIEdlbmVyYXRlZCBhbmQgdW5pcXVlIHBlciByZXF1ZXN0OlxuICAgKiAgIHdpbmRvdy5saXROb25jZSA9ICdhMWIyYzNkNCc7XG4gICAqIDwvc2NyaXB0PlxuICAgKiBgYGBcbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHN0eWxlc1xuICAgKi9cbiAgc3RhdGljIHN0eWxlcz86IENTU1Jlc3VsdEdyb3VwO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhdHRyaWJ1dGVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHJlZ2lzdGVyZWQgcHJvcGVydGllcy5cbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IGF0dHJpYnV0ZXNcbiAgICovXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIC8vIEVuc3VyZSB3ZSd2ZSBjcmVhdGVkIGFsbCBwcm9wZXJ0aWVzXG4gICAgdGhpcy5maW5hbGl6ZSgpO1xuICAgIC8vIHRoaXMuX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwIGlzIG9ubHkgdW5kZWZpbmVkIGFmdGVyIGZpbmFsaXplKCkgaW5cbiAgICAvLyBSZWFjdGl2ZUVsZW1lbnQgaXRzZWxmLiBSZWFjdGl2ZUVsZW1lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzIGlzIG9ubHlcbiAgICAvLyBhY2Nlc3NlZCB3aXRoIFJlYWN0aXZlRWxlbWVudCBhcyB0aGUgcmVjZWl2ZXIgd2hlbiBhIHN1YmNsYXNzIG9yIG1peGluXG4gICAgLy8gY2FsbHMgc3VwZXIub2JzZXJ2ZWRBdHRyaWJ1dGVzXG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwICYmIFsuLi50aGlzLl9fYXR0cmlidXRlVG9Qcm9wZXJ0eU1hcC5rZXlzKCldXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX19pbnN0YW5jZVByb3BlcnRpZXM/OiBQcm9wZXJ0eVZhbHVlcyA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHByb3BlcnR5IGFjY2Vzc29yIG9uIHRoZSBlbGVtZW50IHByb3RvdHlwZSBpZiBvbmUgZG9lcyBub3QgZXhpc3RcbiAgICogYW5kIHN0b3JlcyBhIHtAbGlua2NvZGUgUHJvcGVydHlEZWNsYXJhdGlvbn0gZm9yIHRoZSBwcm9wZXJ0eSB3aXRoIHRoZVxuICAgKiBnaXZlbiBvcHRpb25zLiBUaGUgcHJvcGVydHkgc2V0dGVyIGNhbGxzIHRoZSBwcm9wZXJ0eSdzIGBoYXNDaGFuZ2VkYFxuICAgKiBwcm9wZXJ0eSBvcHRpb24gb3IgdXNlcyBhIHN0cmljdCBpZGVudGl0eSBjaGVjayB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3RcbiAgICogdG8gcmVxdWVzdCBhbiB1cGRhdGUuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIG1heSBiZSBvdmVycmlkZGVuIHRvIGN1c3RvbWl6ZSBwcm9wZXJ0aWVzOyBob3dldmVyLFxuICAgKiB3aGVuIGRvaW5nIHNvLCBpdCdzIGltcG9ydGFudCB0byBjYWxsIGBzdXBlci5jcmVhdGVQcm9wZXJ0eWAgdG8gZW5zdXJlXG4gICAqIHRoZSBwcm9wZXJ0eSBpcyBzZXR1cCBjb3JyZWN0bHkuIFRoaXMgbWV0aG9kIGNhbGxzXG4gICAqIGBnZXRQcm9wZXJ0eURlc2NyaXB0b3JgIGludGVybmFsbHkgdG8gZ2V0IGEgZGVzY3JpcHRvciB0byBpbnN0YWxsLlxuICAgKiBUbyBjdXN0b21pemUgd2hhdCBwcm9wZXJ0aWVzIGRvIHdoZW4gdGhleSBhcmUgZ2V0IG9yIHNldCwgb3ZlcnJpZGVcbiAgICogYGdldFByb3BlcnR5RGVzY3JpcHRvcmAuIFRvIGN1c3RvbWl6ZSB0aGUgb3B0aW9ucyBmb3IgYSBwcm9wZXJ0eSxcbiAgICogaW1wbGVtZW50IGBjcmVhdGVQcm9wZXJ0eWAgbGlrZSB0aGlzOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBzdGF0aWMgY3JlYXRlUHJvcGVydHkobmFtZSwgb3B0aW9ucykge1xuICAgKiAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtteU9wdGlvbjogdHJ1ZX0pO1xuICAgKiAgIHN1cGVyLmNyZWF0ZVByb3BlcnR5KG5hbWUsIG9wdGlvbnMpO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKiBAY2F0ZWdvcnkgcHJvcGVydGllc1xuICAgKi9cbiAgc3RhdGljIGNyZWF0ZVByb3BlcnR5KFxuICAgIG5hbWU6IFByb3BlcnR5S2V5LFxuICAgIG9wdGlvbnM6IFByb3BlcnR5RGVjbGFyYXRpb24gPSBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvblxuICApIHtcbiAgICAvLyBJZiB0aGlzIGlzIGEgc3RhdGUgcHJvcGVydHksIGZvcmNlIHRoZSBhdHRyaWJ1dGUgdG8gZmFsc2UuXG4gICAgaWYgKG9wdGlvbnMuc3RhdGUpIHtcbiAgICAgIChvcHRpb25zIGFzIE11dGFibGU8UHJvcGVydHlEZWNsYXJhdGlvbiwgJ2F0dHJpYnV0ZSc+KS5hdHRyaWJ1dGUgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fX3ByZXBhcmUoKTtcbiAgICAvLyBXaGV0aGVyIHRoaXMgcHJvcGVydHkgaXMgd3JhcHBpbmcgYWNjZXNzb3JzLlxuICAgIC8vIEhlbHBzIGNvbnRyb2wgdGhlIGluaXRpYWwgdmFsdWUgY2hhbmdlIGFuZCByZWZsZWN0aW9uIGxvZ2ljLlxuICAgIGlmICh0aGlzLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgb3B0aW9ucyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyk7XG4gICAgICBvcHRpb25zLndyYXBwZWQgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLnNldChuYW1lLCBvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnMubm9BY2Nlc3Nvcikge1xuICAgICAgY29uc3Qga2V5ID0gREVWX01PREVcbiAgICAgICAgPyAvLyBVc2UgU3ltYm9sLmZvciBpbiBkZXYgbW9kZSB0byBtYWtlIGl0IGVhc2llciB0byBtYWludGFpbiBzdGF0ZVxuICAgICAgICAgIC8vIHdoZW4gZG9pbmcgSE1SLlxuICAgICAgICAgIFN5bWJvbC5mb3IoYCR7U3RyaW5nKG5hbWUpfSAoQHByb3BlcnR5KCkgY2FjaGUpYClcbiAgICAgICAgOiBTeW1ib2woKTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSB0aGlzLmdldFByb3BlcnR5RGVzY3JpcHRvcihuYW1lLCBrZXksIG9wdGlvbnMpO1xuICAgICAgaWYgKGRlc2NyaXB0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHRvIGJlIGRlZmluZWQgb24gdGhlIGdpdmVuIG5hbWVkIHByb3BlcnR5LlxuICAgKiBJZiBubyBkZXNjcmlwdG9yIGlzIHJldHVybmVkLCB0aGUgcHJvcGVydHkgd2lsbCBub3QgYmVjb21lIGFuIGFjY2Vzc29yLlxuICAgKiBGb3IgZXhhbXBsZSxcbiAgICpcbiAgICogYGBgdHNcbiAgICogY2xhc3MgTXlFbGVtZW50IGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gICAqICAgc3RhdGljIGdldFByb3BlcnR5RGVzY3JpcHRvcihuYW1lLCBrZXksIG9wdGlvbnMpIHtcbiAgICogICAgIGNvbnN0IGRlZmF1bHREZXNjcmlwdG9yID1cbiAgICogICAgICAgICBzdXBlci5nZXRQcm9wZXJ0eURlc2NyaXB0b3IobmFtZSwga2V5LCBvcHRpb25zKTtcbiAgICogICAgIGNvbnN0IHNldHRlciA9IGRlZmF1bHREZXNjcmlwdG9yLnNldDtcbiAgICogICAgIHJldHVybiB7XG4gICAqICAgICAgIGdldDogZGVmYXVsdERlc2NyaXB0b3IuZ2V0LFxuICAgKiAgICAgICBzZXQodmFsdWUpIHtcbiAgICogICAgICAgICBzZXR0ZXIuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAqICAgICAgICAgLy8gY3VzdG9tIGFjdGlvbi5cbiAgICogICAgICAgfSxcbiAgICogICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKiBAY2F0ZWdvcnkgcHJvcGVydGllc1xuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBnZXRQcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgbmFtZTogUHJvcGVydHlLZXksXG4gICAga2V5OiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgb3B0aW9uczogUHJvcGVydHlEZWNsYXJhdGlvblxuICApOiBQcm9wZXJ0eURlc2NyaXB0b3IgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHtnZXQsIHNldH0gPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcy5wcm90b3R5cGUsIG5hbWUpID8/IHtcbiAgICAgIGdldCh0aGlzOiBSZWFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5IGFzIGtleW9mIHR5cGVvZiB0aGlzXTtcbiAgICAgIH0sXG4gICAgICBzZXQodGhpczogUmVhY3RpdmVFbGVtZW50LCB2OiB1bmtub3duKSB7XG4gICAgICAgICh0aGlzIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgdW5rbm93bj4pW2tleV0gPSB2O1xuICAgICAgfSxcbiAgICB9O1xuICAgIGlmIChERVZfTU9ERSAmJiBnZXQgPT0gbnVsbCkge1xuICAgICAgaWYgKCd2YWx1ZScgaW4gKGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLnByb3RvdHlwZSwgbmFtZSkgPz8ge30pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgRmllbGQgJHtKU09OLnN0cmluZ2lmeShTdHJpbmcobmFtZSkpfSBvbiBgICtcbiAgICAgICAgICAgIGAke3RoaXMubmFtZX0gd2FzIGRlY2xhcmVkIGFzIGEgcmVhY3RpdmUgcHJvcGVydHkgYCArXG4gICAgICAgICAgICBgYnV0IGl0J3MgYWN0dWFsbHkgZGVjbGFyZWQgYXMgYSB2YWx1ZSBvbiB0aGUgcHJvdG90eXBlLiBgICtcbiAgICAgICAgICAgIGBVc3VhbGx5IHRoaXMgaXMgZHVlIHRvIHVzaW5nIEBwcm9wZXJ0eSBvciBAc3RhdGUgb24gYSBtZXRob2QuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaXNzdWVXYXJuaW5nKFxuICAgICAgICAncmVhY3RpdmUtcHJvcGVydHktd2l0aG91dC1nZXR0ZXInLFxuICAgICAgICBgRmllbGQgJHtKU09OLnN0cmluZ2lmeShTdHJpbmcobmFtZSkpfSBvbiBgICtcbiAgICAgICAgICBgJHt0aGlzLm5hbWV9IHdhcyBkZWNsYXJlZCBhcyBhIHJlYWN0aXZlIHByb3BlcnR5IGAgK1xuICAgICAgICAgIGBidXQgaXQgZG9lcyBub3QgaGF2ZSBhIGdldHRlci4gVGhpcyB3aWxsIGJlIGFuIGVycm9yIGluIGEgYCArXG4gICAgICAgICAgYGZ1dHVyZSB2ZXJzaW9uIG9mIExpdC5gXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZ2V0LFxuICAgICAgc2V0KHRoaXM6IFJlYWN0aXZlRWxlbWVudCwgdmFsdWU6IHVua25vd24pIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBnZXQ/LmNhbGwodGhpcyk7XG4gICAgICAgIHNldD8uY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMucmVxdWVzdFVwZGF0ZShuYW1lLCBvbGRWYWx1ZSwgb3B0aW9ucyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHByb3BlcnR5IG9wdGlvbnMgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAgICogVGhlc2Ugb3B0aW9ucyBhcmUgZGVmaW5lZCB3aXRoIGEgYFByb3BlcnR5RGVjbGFyYXRpb25gIHZpYSB0aGUgYHByb3BlcnRpZXNgXG4gICAqIG9iamVjdCBvciB0aGUgYEBwcm9wZXJ0eWAgZGVjb3JhdG9yIGFuZCBhcmUgcmVnaXN0ZXJlZCBpblxuICAgKiBgY3JlYXRlUHJvcGVydHkoLi4uKWAuXG4gICAqXG4gICAqIE5vdGUsIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBjb25zaWRlcmVkIFwiZmluYWxcIiBhbmQgbm90IG92ZXJyaWRkZW4uIFRvXG4gICAqIGN1c3RvbWl6ZSB0aGUgb3B0aW9ucyBmb3IgYSBnaXZlbiBwcm9wZXJ0eSwgb3ZlcnJpZGVcbiAgICoge0BsaW5rY29kZSBjcmVhdGVQcm9wZXJ0eX0uXG4gICAqXG4gICAqIEBub2NvbGxhcHNlXG4gICAqIEBmaW5hbFxuICAgKiBAY2F0ZWdvcnkgcHJvcGVydGllc1xuICAgKi9cbiAgc3RhdGljIGdldFByb3BlcnR5T3B0aW9ucyhuYW1lOiBQcm9wZXJ0eUtleSkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLmdldChuYW1lKSA/PyBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvbjtcbiAgfVxuXG4gIC8vIFRlbXBvcmFyeSwgdW50aWwgZ29vZ2xlMyBpcyBvbiBUeXBlU2NyaXB0IDUuMlxuICBkZWNsYXJlIHN0YXRpYyBbU3ltYm9sLm1ldGFkYXRhXTogb2JqZWN0ICYgUmVjb3JkPFByb3BlcnR5S2V5LCB1bmtub3duPjtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgc3RhdGljIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBjbGFzcyB1c2VkIGluIGJvb2trZWVwaW5nXG4gICAqIGZvciBlbGVtZW50IHByb3BlcnRpZXMsIGluaXRpYWxpemVycywgZXRjLlxuICAgKlxuICAgKiBDYW4gYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGJ5IGNvZGUgdGhhdCBuZWVkcyB0byBlbnN1cmUgdGhlc2VcbiAgICogcHJvcGVydGllcyBleGlzdCBiZWZvcmUgdXNpbmcgdGhlbS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZW5zdXJlcyB0aGUgc3VwZXJjbGFzcyBpcyBmaW5hbGl6ZWQgc28gdGhhdCBpbmhlcml0ZWRcbiAgICogcHJvcGVydHkgbWV0YWRhdGEgY2FuIGJlIGNvcGllZCBkb3duLlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgX19wcmVwYXJlKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnZWxlbWVudFByb3BlcnRpZXMnLCB0aGlzKSlcbiAgICApIHtcbiAgICAgIC8vIEFscmVhZHkgcHJlcGFyZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRmluYWxpemUgYW55IHN1cGVyY2xhc3Nlc1xuICAgIGNvbnN0IHN1cGVyQ3RvciA9IGdldFByb3RvdHlwZU9mKHRoaXMpIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQ7XG4gICAgc3VwZXJDdG9yLmZpbmFsaXplKCk7XG5cbiAgICAvLyBDcmVhdGUgb3duIHNldCBvZiBpbml0aWFsaXplcnMgZm9yIHRoaXMgY2xhc3MgaWYgYW55IGV4aXN0IG9uIHRoZVxuICAgIC8vIHN1cGVyY2xhc3MgYW5kIGNvcHkgdGhlbSBkb3duLiBOb3RlLCBmb3IgYSBzbWFsbCBwZXJmIGJvb3N0LCBhdm9pZFxuICAgIC8vIGNyZWF0aW5nIGluaXRpYWxpemVycyB1bmxlc3MgbmVlZGVkLlxuICAgIGlmIChzdXBlckN0b3IuX2luaXRpYWxpemVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9pbml0aWFsaXplcnMgPSBbLi4uc3VwZXJDdG9yLl9pbml0aWFsaXplcnNdO1xuICAgIH1cbiAgICAvLyBJbml0aWFsaXplIGVsZW1lbnRQcm9wZXJ0aWVzIGZyb20gdGhlIHN1cGVyY2xhc3NcbiAgICB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzID0gbmV3IE1hcChzdXBlckN0b3IuZWxlbWVudFByb3BlcnRpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmlzaGVzIHNldHRpbmcgdXAgdGhlIGNsYXNzIHNvIHRoYXQgaXQncyByZWFkeSB0byBiZSByZWdpc3RlcmVkXG4gICAqIGFzIGEgY3VzdG9tIGVsZW1lbnQgYW5kIGluc3RhbnRpYXRlZC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBSZWFjdGl2ZUVsZW1lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzIGdldHRlci5cbiAgICogSWYgeW91IG92ZXJyaWRlIHRoZSBvYnNlcnZlZEF0dHJpYnV0ZXMgZ2V0dGVyLCB5b3UgbXVzdCBlaXRoZXIgY2FsbFxuICAgKiBzdXBlci5vYnNlcnZlZEF0dHJpYnV0ZXMgdG8gdHJpZ2dlciBmaW5hbGl6YXRpb24sIG9yIGNhbGwgZmluYWxpemUoKVxuICAgKiB5b3Vyc2VsZi5cbiAgICpcbiAgICogQG5vY29sbGFwc2VcbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgZmluYWxpemUoKSB7XG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnZmluYWxpemVkJywgdGhpcykpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZmluYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl9fcHJlcGFyZSgpO1xuXG4gICAgLy8gQ3JlYXRlIHByb3BlcnRpZXMgZnJvbSB0aGUgc3RhdGljIHByb3BlcnRpZXMgYmxvY2s6XG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgncHJvcGVydGllcycsIHRoaXMpKSkge1xuICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BlcnRpZXM7XG4gICAgICBjb25zdCBwcm9wS2V5cyA9IFtcbiAgICAgICAgLi4uZ2V0T3duUHJvcGVydHlOYW1lcyhwcm9wcyksXG4gICAgICAgIC4uLmdldE93blByb3BlcnR5U3ltYm9scyhwcm9wcyksXG4gICAgICBdIGFzIEFycmF5PGtleW9mIHR5cGVvZiBwcm9wcz47XG4gICAgICBmb3IgKGNvbnN0IHAgb2YgcHJvcEtleXMpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVQcm9wZXJ0eShwLCBwcm9wc1twXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHByb3BlcnRpZXMgZnJvbSBzdGFuZGFyZCBkZWNvcmF0b3IgbWV0YWRhdGE6XG4gICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzW1N5bWJvbC5tZXRhZGF0YV07XG4gICAgaWYgKG1ldGFkYXRhICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0gbGl0UHJvcGVydHlNZXRhZGF0YS5nZXQobWV0YWRhdGEpO1xuICAgICAgaWYgKHByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtwLCBvcHRpb25zXSBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50UHJvcGVydGllcy5zZXQocCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIGF0dHJpYnV0ZS10by1wcm9wZXJ0eSBtYXBcbiAgICB0aGlzLl9fYXR0cmlidXRlVG9Qcm9wZXJ0eU1hcCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IFtwLCBvcHRpb25zXSBvZiB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzKSB7XG4gICAgICBjb25zdCBhdHRyID0gdGhpcy5fX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShwLCBvcHRpb25zKTtcbiAgICAgIGlmIChhdHRyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fX2F0dHJpYnV0ZVRvUHJvcGVydHlNYXAuc2V0KGF0dHIsIHApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudFN0eWxlcyA9IHRoaXMuZmluYWxpemVTdHlsZXModGhpcy5zdHlsZXMpO1xuXG4gICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eSgnY3JlYXRlUHJvcGVydHknKSkge1xuICAgICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICAgJ25vLW92ZXJyaWRlLWNyZWF0ZS1wcm9wZXJ0eScsXG4gICAgICAgICAgJ092ZXJyaWRpbmcgUmVhY3RpdmVFbGVtZW50LmNyZWF0ZVByb3BlcnR5KCkgaXMgZGVwcmVjYXRlZC4gJyArXG4gICAgICAgICAgICAnVGhlIG92ZXJyaWRlIHdpbGwgbm90IGJlIGNhbGxlZCB3aXRoIHN0YW5kYXJkIGRlY29yYXRvcnMnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eSgnZ2V0UHJvcGVydHlEZXNjcmlwdG9yJykpIHtcbiAgICAgICAgaXNzdWVXYXJuaW5nKFxuICAgICAgICAgICduby1vdmVycmlkZS1nZXQtcHJvcGVydHktZGVzY3JpcHRvcicsXG4gICAgICAgICAgJ092ZXJyaWRpbmcgUmVhY3RpdmVFbGVtZW50LmdldFByb3BlcnR5RGVzY3JpcHRvcigpIGlzIGRlcHJlY2F0ZWQuICcgK1xuICAgICAgICAgICAgJ1RoZSBvdmVycmlkZSB3aWxsIG5vdCBiZSBjYWxsZWQgd2l0aCBzdGFuZGFyZCBkZWNvcmF0b3JzJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcHRpb25zIHVzZWQgd2hlbiBjYWxsaW5nIGBhdHRhY2hTaGFkb3dgLiBTZXQgdGhpcyBwcm9wZXJ0eSB0byBjdXN0b21pemVcbiAgICogdGhlIG9wdGlvbnMgZm9yIHRoZSBzaGFkb3dSb290OyBmb3IgZXhhbXBsZSwgdG8gY3JlYXRlIGEgY2xvc2VkXG4gICAqIHNoYWRvd1Jvb3Q6IGB7bW9kZTogJ2Nsb3NlZCd9YC5cbiAgICpcbiAgICogTm90ZSwgdGhlc2Ugb3B0aW9ucyBhcmUgdXNlZCBpbiBgY3JlYXRlUmVuZGVyUm9vdGAuIElmIHRoaXMgbWV0aG9kXG4gICAqIGlzIGN1c3RvbWl6ZWQsIG9wdGlvbnMgc2hvdWxkIGJlIHJlc3BlY3RlZCBpZiBwb3NzaWJsZS5cbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgc3RhdGljIHNoYWRvd1Jvb3RPcHRpb25zOiBTaGFkb3dSb290SW5pdCA9IHttb2RlOiAnb3Blbid9O1xuXG4gIC8qKlxuICAgKiBUYWtlcyB0aGUgc3R5bGVzIHRoZSB1c2VyIHN1cHBsaWVkIHZpYSB0aGUgYHN0YXRpYyBzdHlsZXNgIHByb3BlcnR5IGFuZFxuICAgKiByZXR1cm5zIHRoZSBhcnJheSBvZiBzdHlsZXMgdG8gYXBwbHkgdG8gdGhlIGVsZW1lbnQuXG4gICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGludGVncmF0ZSBpbnRvIGEgc3R5bGUgbWFuYWdlbWVudCBzeXN0ZW0uXG4gICAqXG4gICAqIFN0eWxlcyBhcmUgZGVkdXBsaWNhdGVkIHByZXNlcnZpbmcgdGhlIF9sYXN0XyBpbnN0YW5jZSBpbiB0aGUgbGlzdC4gVGhpc1xuICAgKiBpcyBhIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbiB0byBhdm9pZCBkdXBsaWNhdGVkIHN0eWxlcyB0aGF0IGNhbiBvY2N1clxuICAgKiBlc3BlY2lhbGx5IHdoZW4gY29tcG9zaW5nIHZpYSBzdWJjbGFzc2luZy4gVGhlIGxhc3QgaXRlbSBpcyBrZXB0IHRvIHRyeVxuICAgKiB0byBwcmVzZXJ2ZSB0aGUgY2FzY2FkZSBvcmRlciB3aXRoIHRoZSBhc3N1bXB0aW9uIHRoYXQgaXQncyBtb3N0IGltcG9ydGFudFxuICAgKiB0aGF0IGxhc3QgYWRkZWQgc3R5bGVzIG92ZXJyaWRlIHByZXZpb3VzIHN0eWxlcy5cbiAgICpcbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHN0eWxlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBmaW5hbGl6ZVN0eWxlcyhcbiAgICBzdHlsZXM/OiBDU1NSZXN1bHRHcm91cFxuICApOiBBcnJheTxDU1NSZXN1bHRPck5hdGl2ZT4ge1xuICAgIGNvbnN0IGVsZW1lbnRTdHlsZXMgPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZXMpKSB7XG4gICAgICAvLyBEZWR1cGUgdGhlIGZsYXR0ZW5lZCBhcnJheSBpbiByZXZlcnNlIG9yZGVyIHRvIHByZXNlcnZlIHRoZSBsYXN0IGl0ZW1zLlxuICAgICAgLy8gQ2FzdGluZyB0byBBcnJheTx1bmtub3duPiB3b3JrcyBhcm91bmQgVFMgZXJyb3IgdGhhdFxuICAgICAgLy8gYXBwZWFycyB0byBjb21lIGZyb20gdHJ5aW5nIHRvIGZsYXR0ZW4gYSB0eXBlIENTU1Jlc3VsdEFycmF5LlxuICAgICAgY29uc3Qgc2V0ID0gbmV3IFNldCgoc3R5bGVzIGFzIEFycmF5PHVua25vd24+KS5mbGF0KEluZmluaXR5KS5yZXZlcnNlKCkpO1xuICAgICAgLy8gVGhlbiBwcmVzZXJ2ZSBvcmlnaW5hbCBvcmRlciBieSBhZGRpbmcgdGhlIHNldCBpdGVtcyBpbiByZXZlcnNlIG9yZGVyLlxuICAgICAgZm9yIChjb25zdCBzIG9mIHNldCkge1xuICAgICAgICBlbGVtZW50U3R5bGVzLnVuc2hpZnQoZ2V0Q29tcGF0aWJsZVN0eWxlKHMgYXMgQ1NTUmVzdWx0T3JOYXRpdmUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0eWxlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbGVtZW50U3R5bGVzLnB1c2goZ2V0Q29tcGF0aWJsZVN0eWxlKHN0eWxlcykpO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudFN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBOb2RlIG9yIFNoYWRvd1Jvb3QgaW50byB3aGljaCBlbGVtZW50IERPTSBzaG91bGQgYmUgcmVuZGVyZWQuIERlZmF1bHRzXG4gICAqIHRvIGFuIG9wZW4gc2hhZG93Um9vdC5cbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcmVhZG9ubHkgcmVuZGVyUm9vdCE6IEhUTUxFbGVtZW50IHwgRG9jdW1lbnRGcmFnbWVudDtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGdpdmVuIGF0dHJpYnV0ZSBgbmFtZWAuXG4gICAqIEBub2NvbGxhcHNlXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBfX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShcbiAgICBuYW1lOiBQcm9wZXJ0eUtleSxcbiAgICBvcHRpb25zOiBQcm9wZXJ0eURlY2xhcmF0aW9uXG4gICkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG9wdGlvbnMuYXR0cmlidXRlO1xuICAgIHJldHVybiBhdHRyaWJ1dGUgPT09IGZhbHNlXG4gICAgICA/IHVuZGVmaW5lZFxuICAgICAgOiB0eXBlb2YgYXR0cmlidXRlID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGF0dHJpYnV0ZVxuICAgICAgICA6IHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJ1xuICAgICAgICAgID8gbmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBJbml0aWFsaXplIHRvIGFuIHVucmVzb2x2ZWQgUHJvbWlzZSBzbyB3ZSBjYW4gbWFrZSBzdXJlIHRoZSBlbGVtZW50IGhhc1xuICAvLyBjb25uZWN0ZWQgYmVmb3JlIGZpcnN0IHVwZGF0ZS5cbiAgcHJpdmF0ZSBfX3VwZGF0ZVByb21pc2UhOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZXJlIGlzIGEgcGVuZGluZyB1cGRhdGUgYXMgYSByZXN1bHQgb2YgY2FsbGluZyBgcmVxdWVzdFVwZGF0ZSgpYC5cbiAgICogU2hvdWxkIG9ubHkgYmUgcmVhZC5cbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIGlzVXBkYXRlUGVuZGluZyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJcyBzZXQgdG8gYHRydWVgIGFmdGVyIHRoZSBmaXJzdCB1cGRhdGUuIFRoZSBlbGVtZW50IGNvZGUgY2Fubm90IGFzc3VtZVxuICAgKiB0aGF0IGByZW5kZXJSb290YCBleGlzdHMgYmVmb3JlIHRoZSBlbGVtZW50IGBoYXNVcGRhdGVkYC5cbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIGhhc1VwZGF0ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogTWFwIHdpdGgga2V5cyBmb3IgYW55IHByb3BlcnRpZXMgdGhhdCBoYXZlIGNoYW5nZWQgc2luY2UgdGhlIGxhc3RcbiAgICogdXBkYXRlIGN5Y2xlIHdpdGggcHJldmlvdXMgdmFsdWVzLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF8kY2hhbmdlZFByb3BlcnRpZXMhOiBQcm9wZXJ0eVZhbHVlcztcblxuICAvKipcbiAgICogUmVjb3JkcyBwcm9wZXJ0eSBkZWZhdWx0IHZhbHVlcyB3aGVuIHRoZVxuICAgKiBgdXNlRGVmYXVsdGAgb3B0aW9uIGlzIHVzZWQuXG4gICAqL1xuICBwcml2YXRlIF9fZGVmYXVsdFZhbHVlcz86IE1hcDxQcm9wZXJ0eUtleSwgdW5rbm93bj47XG5cbiAgLyoqXG4gICAqIFByb3BlcnRpZXMgdGhhdCBzaG91bGQgYmUgcmVmbGVjdGVkIHdoZW4gdXBkYXRlZC5cbiAgICovXG4gIHByaXZhdGUgX19yZWZsZWN0aW5nUHJvcGVydGllcz86IFNldDxQcm9wZXJ0eUtleT47XG5cbiAgLyoqXG4gICAqIE5hbWUgb2YgY3VycmVudGx5IHJlZmxlY3RpbmcgcHJvcGVydHlcbiAgICovXG4gIHByaXZhdGUgX19yZWZsZWN0aW5nUHJvcGVydHk6IFByb3BlcnR5S2V5IHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFNldCBvZiBjb250cm9sbGVycy5cbiAgICovXG4gIHByaXZhdGUgX19jb250cm9sbGVycz86IFNldDxSZWFjdGl2ZUNvbnRyb2xsZXI+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fX2luaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCBvbmx5IG92ZXJyaWRlIHBvaW50IGZvciBjdXN0b21pemluZyB3b3JrIGRvbmUgd2hlbiBlbGVtZW50c1xuICAgKiBhcmUgY29uc3RydWN0ZWQuXG4gICAqL1xuICBwcml2YXRlIF9faW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLl9fdXBkYXRlUHJvbWlzZSA9IG5ldyBQcm9taXNlPGJvb2xlYW4+KFxuICAgICAgKHJlcykgPT4gKHRoaXMuZW5hYmxlVXBkYXRpbmcgPSByZXMpXG4gICAgKTtcbiAgICB0aGlzLl8kY2hhbmdlZFByb3BlcnRpZXMgPSBuZXcgTWFwKCk7XG4gICAgLy8gVGhpcyBlbnF1ZXVlcyBhIG1pY3JvdGFzayB0aGF0IG11c3QgcnVuIGJlZm9yZSB0aGUgZmlyc3QgdXBkYXRlLCBzbyBpdFxuICAgIC8vIG11c3QgYmUgY2FsbGVkIGJlZm9yZSByZXF1ZXN0VXBkYXRlKClcbiAgICB0aGlzLl9fc2F2ZUluc3RhbmNlUHJvcGVydGllcygpO1xuICAgIC8vIGVuc3VyZXMgZmlyc3QgdXBkYXRlIHdpbGwgYmUgY2F1Z2h0IGJ5IGFuIGVhcmx5IGFjY2VzcyBvZlxuICAgIC8vIGB1cGRhdGVDb21wbGV0ZWBcbiAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgICAodGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50KS5faW5pdGlhbGl6ZXJzPy5mb3JFYWNoKChpKSA9PlxuICAgICAgaSh0aGlzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgYFJlYWN0aXZlQ29udHJvbGxlcmAgdG8gcGFydGljaXBhdGUgaW4gdGhlIGVsZW1lbnQncyByZWFjdGl2ZVxuICAgKiB1cGRhdGUgY3ljbGUuIFRoZSBlbGVtZW50IGF1dG9tYXRpY2FsbHkgY2FsbHMgaW50byBhbnkgcmVnaXN0ZXJlZFxuICAgKiBjb250cm9sbGVycyBkdXJpbmcgaXRzIGxpZmVjeWNsZSBjYWxsYmFja3MuXG4gICAqXG4gICAqIElmIHRoZSBlbGVtZW50IGlzIGNvbm5lY3RlZCB3aGVuIGBhZGRDb250cm9sbGVyKClgIGlzIGNhbGxlZCwgdGhlXG4gICAqIGNvbnRyb2xsZXIncyBgaG9zdENvbm5lY3RlZCgpYCBjYWxsYmFjayB3aWxsIGJlIGltbWVkaWF0ZWx5IGNhbGxlZC5cbiAgICogQGNhdGVnb3J5IGNvbnRyb2xsZXJzXG4gICAqL1xuICBhZGRDb250cm9sbGVyKGNvbnRyb2xsZXI6IFJlYWN0aXZlQ29udHJvbGxlcikge1xuICAgICh0aGlzLl9fY29udHJvbGxlcnMgPz89IG5ldyBTZXQoKSkuYWRkKGNvbnRyb2xsZXIpO1xuICAgIC8vIElmIGEgY29udHJvbGxlciBpcyBhZGRlZCBhZnRlciB0aGUgZWxlbWVudCBoYXMgYmVlbiBjb25uZWN0ZWQsXG4gICAgLy8gY2FsbCBob3N0Q29ubmVjdGVkLiBOb3RlLCByZS11c2luZyBleGlzdGVuY2Ugb2YgYHJlbmRlclJvb3RgIGhlcmVcbiAgICAvLyAod2hpY2ggaXMgc2V0IGluIGNvbm5lY3RlZENhbGxiYWNrKSB0byBhdm9pZCB0aGUgbmVlZCB0byB0cmFjayBhXG4gICAgLy8gZmlyc3QgY29ubmVjdGVkIHN0YXRlLlxuICAgIGlmICh0aGlzLnJlbmRlclJvb3QgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmlzQ29ubmVjdGVkKSB7XG4gICAgICBjb250cm9sbGVyLmhvc3RDb25uZWN0ZWQ/LigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgYFJlYWN0aXZlQ29udHJvbGxlcmAgZnJvbSB0aGUgZWxlbWVudC5cbiAgICogQGNhdGVnb3J5IGNvbnRyb2xsZXJzXG4gICAqL1xuICByZW1vdmVDb250cm9sbGVyKGNvbnRyb2xsZXI6IFJlYWN0aXZlQ29udHJvbGxlcikge1xuICAgIHRoaXMuX19jb250cm9sbGVycz8uZGVsZXRlKGNvbnRyb2xsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpeGVzIGFueSBwcm9wZXJ0aWVzIHNldCBvbiB0aGUgaW5zdGFuY2UgYmVmb3JlIHVwZ3JhZGUgdGltZS5cbiAgICogT3RoZXJ3aXNlIHRoZXNlIHdvdWxkIHNoYWRvdyB0aGUgYWNjZXNzb3IgYW5kIGJyZWFrIHRoZXNlIHByb3BlcnRpZXMuXG4gICAqIFRoZSBwcm9wZXJ0aWVzIGFyZSBzdG9yZWQgaW4gYSBNYXAgd2hpY2ggaXMgcGxheWVkIGJhY2sgYWZ0ZXIgdGhlXG4gICAqIGNvbnN0cnVjdG9yIHJ1bnMuXG4gICAqL1xuICBwcml2YXRlIF9fc2F2ZUluc3RhbmNlUHJvcGVydGllcygpIHtcbiAgICBjb25zdCBpbnN0YW5jZVByb3BlcnRpZXMgPSBuZXcgTWFwPFByb3BlcnR5S2V5LCB1bmtub3duPigpO1xuICAgIGNvbnN0IGVsZW1lbnRQcm9wZXJ0aWVzID0gKHRoaXMuY29uc3RydWN0b3IgYXMgdHlwZW9mIFJlYWN0aXZlRWxlbWVudClcbiAgICAgIC5lbGVtZW50UHJvcGVydGllcztcbiAgICBmb3IgKGNvbnN0IHAgb2YgZWxlbWVudFByb3BlcnRpZXMua2V5cygpIGFzIEl0ZXJhYmxlSXRlcmF0b3I8a2V5b2YgdGhpcz4pIHtcbiAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgIGluc3RhbmNlUHJvcGVydGllcy5zZXQocCwgdGhpc1twXSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzW3BdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaW5zdGFuY2VQcm9wZXJ0aWVzLnNpemUgPiAwKSB7XG4gICAgICB0aGlzLl9faW5zdGFuY2VQcm9wZXJ0aWVzID0gaW5zdGFuY2VQcm9wZXJ0aWVzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBub2RlIGludG8gd2hpY2ggdGhlIGVsZW1lbnQgc2hvdWxkIHJlbmRlciBhbmQgYnkgZGVmYXVsdFxuICAgKiBjcmVhdGVzIGFuZCByZXR1cm5zIGFuIG9wZW4gc2hhZG93Um9vdC4gSW1wbGVtZW50IHRvIGN1c3RvbWl6ZSB3aGVyZSB0aGVcbiAgICogZWxlbWVudCdzIERPTSBpcyByZW5kZXJlZC4gRm9yIGV4YW1wbGUsIHRvIHJlbmRlciBpbnRvIHRoZSBlbGVtZW50J3NcbiAgICogY2hpbGROb2RlcywgcmV0dXJuIGB0aGlzYC5cbiAgICpcbiAgICogQHJldHVybiBSZXR1cm5zIGEgbm9kZSBpbnRvIHdoaWNoIHRvIHJlbmRlci5cbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZVJlbmRlclJvb3QoKTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50IHtcbiAgICBjb25zdCByZW5kZXJSb290ID1cbiAgICAgIHRoaXMuc2hhZG93Um9vdCA/P1xuICAgICAgdGhpcy5hdHRhY2hTaGFkb3coXG4gICAgICAgICh0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpLnNoYWRvd1Jvb3RPcHRpb25zXG4gICAgICApO1xuICAgIGFkb3B0U3R5bGVzKFxuICAgICAgcmVuZGVyUm9vdCxcbiAgICAgICh0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpLmVsZW1lbnRTdHlsZXNcbiAgICApO1xuICAgIHJldHVybiByZW5kZXJSb290O1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIGZpcnN0IGNvbm5lY3Rpb24sIGNyZWF0ZXMgdGhlIGVsZW1lbnQncyByZW5kZXJSb290LCBzZXRzIHVwXG4gICAqIGVsZW1lbnQgc3R5bGluZywgYW5kIGVuYWJsZXMgdXBkYXRpbmcuXG4gICAqIEBjYXRlZ29yeSBsaWZlY3ljbGVcbiAgICovXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIENyZWF0ZSByZW5kZXJSb290IGJlZm9yZSBjb250cm9sbGVycyBgaG9zdENvbm5lY3RlZGBcbiAgICAodGhpcyBhcyBNdXRhYmxlPHR5cGVvZiB0aGlzLCAncmVuZGVyUm9vdCc+KS5yZW5kZXJSb290ID8/PVxuICAgICAgdGhpcy5jcmVhdGVSZW5kZXJSb290KCk7XG4gICAgdGhpcy5lbmFibGVVcGRhdGluZyh0cnVlKTtcbiAgICB0aGlzLl9fY29udHJvbGxlcnM/LmZvckVhY2goKGMpID0+IGMuaG9zdENvbm5lY3RlZD8uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdGUsIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBjb25zaWRlcmVkIGZpbmFsIGFuZCBub3Qgb3ZlcnJpZGRlbi4gSXQgaXNcbiAgICogb3ZlcnJpZGRlbiBvbiB0aGUgZWxlbWVudCBpbnN0YW5jZSB3aXRoIGEgZnVuY3Rpb24gdGhhdCB0cmlnZ2VycyB0aGUgZmlyc3RcbiAgICogdXBkYXRlLlxuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIGVuYWJsZVVwZGF0aW5nKF9yZXF1ZXN0ZWRVcGRhdGU6IGJvb2xlYW4pIHt9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBmb3IgYHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKClgIGluIGV4dGVuc2lvbnMgd2hpbGVcbiAgICogcmVzZXJ2aW5nIHRoZSBwb3NzaWJpbGl0eSBvZiBtYWtpbmcgbm9uLWJyZWFraW5nIGZlYXR1cmUgYWRkaXRpb25zXG4gICAqIHdoZW4gZGlzY29ubmVjdGluZyBhdCBzb21lIHBvaW50IGluIHRoZSBmdXR1cmUuXG4gICAqIEBjYXRlZ29yeSBsaWZlY3ljbGVcbiAgICovXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuX19jb250cm9sbGVycz8uZm9yRWFjaCgoYykgPT4gYy5ob3N0RGlzY29ubmVjdGVkPy4oKSk7XG4gIH1cblxuICAvKipcbiAgICogU3luY2hyb25pemVzIHByb3BlcnR5IHZhbHVlcyB3aGVuIGF0dHJpYnV0ZXMgY2hhbmdlLlxuICAgKlxuICAgKiBTcGVjaWZpY2FsbHksIHdoZW4gYW4gYXR0cmlidXRlIGlzIHNldCwgdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgaXMgc2V0LlxuICAgKiBZb3Ugc2hvdWxkIHJhcmVseSBuZWVkIHRvIGltcGxlbWVudCB0aGlzIGNhbGxiYWNrLiBJZiB0aGlzIG1ldGhvZCBpc1xuICAgKiBvdmVycmlkZGVuLCBgc3VwZXIuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIF9vbGQsIHZhbHVlKWAgbXVzdCBiZVxuICAgKiBjYWxsZWQuXG4gICAqXG4gICAqIFNlZSBbcmVzcG9uZGluZyB0byBhdHRyaWJ1dGUgY2hhbmdlc10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9jb21wb25lbnRzL1VzaW5nX2N1c3RvbV9lbGVtZW50cyNyZXNwb25kaW5nX3RvX2F0dHJpYnV0ZV9jaGFuZ2VzKVxuICAgKiBvbiBNRE4gZm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tgLlxuICAgKiBAY2F0ZWdvcnkgYXR0cmlidXRlc1xuICAgKi9cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBfb2xkOiBzdHJpbmcgfCBudWxsLFxuICAgIHZhbHVlOiBzdHJpbmcgfCBudWxsXG4gICkge1xuICAgIHRoaXMuXyRhdHRyaWJ1dGVUb1Byb3BlcnR5KG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX19wcm9wZXJ0eVRvQXR0cmlidXRlKG5hbWU6IFByb3BlcnR5S2V5LCB2YWx1ZTogdW5rbm93bikge1xuICAgIGNvbnN0IGVsZW1Qcm9wZXJ0aWVzOiBQcm9wZXJ0eURlY2xhcmF0aW9uTWFwID0gKFxuICAgICAgdGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50XG4gICAgKS5lbGVtZW50UHJvcGVydGllcztcbiAgICBjb25zdCBvcHRpb25zID0gZWxlbVByb3BlcnRpZXMuZ2V0KG5hbWUpITtcbiAgICBjb25zdCBhdHRyID0gKFxuICAgICAgdGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50XG4gICAgKS5fX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShuYW1lLCBvcHRpb25zKTtcbiAgICBpZiAoYXR0ciAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVmbGVjdCA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgY29udmVydGVyID1cbiAgICAgICAgKG9wdGlvbnMuY29udmVydGVyIGFzIENvbXBsZXhBdHRyaWJ1dGVDb252ZXJ0ZXIpPy50b0F0dHJpYnV0ZSAhPT1cbiAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICAgPyAob3B0aW9ucy5jb252ZXJ0ZXIgYXMgQ29tcGxleEF0dHJpYnV0ZUNvbnZlcnRlcilcbiAgICAgICAgICA6IGRlZmF1bHRDb252ZXJ0ZXI7XG4gICAgICBjb25zdCBhdHRyVmFsdWUgPSBjb252ZXJ0ZXIudG9BdHRyaWJ1dGUhKHZhbHVlLCBvcHRpb25zLnR5cGUpO1xuICAgICAgaWYgKFxuICAgICAgICBERVZfTU9ERSAmJlxuICAgICAgICAodGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50KS5lbmFibGVkV2FybmluZ3MhLmluY2x1ZGVzKFxuICAgICAgICAgICdtaWdyYXRpb24nXG4gICAgICAgICkgJiZcbiAgICAgICAgYXR0clZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgICkge1xuICAgICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICAgJ3VuZGVmaW5lZC1hdHRyaWJ1dGUtdmFsdWUnLFxuICAgICAgICAgIGBUaGUgYXR0cmlidXRlIHZhbHVlIGZvciB0aGUgJHtuYW1lIGFzIHN0cmluZ30gcHJvcGVydHkgaXMgYCArXG4gICAgICAgICAgICBgdW5kZWZpbmVkIG9uIGVsZW1lbnQgJHt0aGlzLmxvY2FsTmFtZX0uIFRoZSBhdHRyaWJ1dGUgd2lsbCBiZSBgICtcbiAgICAgICAgICAgIGByZW1vdmVkLCBidXQgaW4gdGhlIHByZXZpb3VzIHZlcnNpb24gb2YgXFxgUmVhY3RpdmVFbGVtZW50XFxgLCBgICtcbiAgICAgICAgICAgIGB0aGUgYXR0cmlidXRlIHdvdWxkIG5vdCBoYXZlIGNoYW5nZWQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gVHJhY2sgaWYgdGhlIHByb3BlcnR5IGlzIGJlaW5nIHJlZmxlY3RlZCB0byBhdm9pZFxuICAgICAgLy8gc2V0dGluZyB0aGUgcHJvcGVydHkgYWdhaW4gdmlhIGBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tgLiBOb3RlOlxuICAgICAgLy8gMS4gdGhpcyB0YWtlcyBhZHZhbnRhZ2Ugb2YgdGhlIGZhY3QgdGhhdCB0aGUgY2FsbGJhY2sgaXMgc3luY2hyb25vdXMuXG4gICAgICAvLyAyLiB3aWxsIGJlaGF2ZSBpbmNvcnJlY3RseSBpZiBtdWx0aXBsZSBhdHRyaWJ1dGVzIGFyZSBpbiB0aGUgcmVhY3Rpb25cbiAgICAgIC8vIHN0YWNrIGF0IHRpbWUgb2YgY2FsbGluZy4gSG93ZXZlciwgc2luY2Ugd2UgcHJvY2VzcyBhdHRyaWJ1dGVzXG4gICAgICAvLyBpbiBgdXBkYXRlYCB0aGlzIHNob3VsZCBub3QgYmUgcG9zc2libGUgKG9yIGFuIGV4dHJlbWUgY29ybmVyIGNhc2VcbiAgICAgIC8vIHRoYXQgd2UnZCBsaWtlIHRvIGRpc2NvdmVyKS5cbiAgICAgIC8vIG1hcmsgc3RhdGUgcmVmbGVjdGluZ1xuICAgICAgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSA9IG5hbWU7XG4gICAgICBpZiAoYXR0clZhbHVlID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsdWUgYXMgc3RyaW5nKTtcbiAgICAgIH1cbiAgICAgIC8vIG1hcmsgc3RhdGUgbm90IHJlZmxlY3RpbmdcbiAgICAgIHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydHkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRhdHRyaWJ1dGVUb1Byb3BlcnR5KG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bGwpIHtcbiAgICBjb25zdCBjdG9yID0gdGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50O1xuICAgIC8vIE5vdGUsIGhpbnQgdGhpcyBhcyBhbiBgQXR0cmlidXRlTWFwYCBzbyBjbG9zdXJlIGNsZWFybHkgdW5kZXJzdGFuZHNcbiAgICAvLyB0aGUgdHlwZTsgaXQgaGFzIGlzc3VlcyB3aXRoIHRyYWNraW5nIHR5cGVzIHRocm91Z2ggc3RhdGljc1xuICAgIGNvbnN0IHByb3BOYW1lID0gKGN0b3IuX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwIGFzIEF0dHJpYnV0ZU1hcCkuZ2V0KG5hbWUpO1xuICAgIC8vIFVzZSB0cmFja2luZyBpbmZvIHRvIGF2b2lkIHJlZmxlY3RpbmcgYSBwcm9wZXJ0eSB2YWx1ZSB0byBhbiBhdHRyaWJ1dGVcbiAgICAvLyBpZiBpdCB3YXMganVzdCBzZXQgYmVjYXVzZSB0aGUgYXR0cmlidXRlIGNoYW5nZWQuXG4gICAgaWYgKHByb3BOYW1lICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSAhPT0gcHJvcE5hbWUpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBjdG9yLmdldFByb3BlcnR5T3B0aW9ucyhwcm9wTmFtZSk7XG4gICAgICBjb25zdCBjb252ZXJ0ZXIgPVxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5jb252ZXJ0ZXIgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHtmcm9tQXR0cmlidXRlOiBvcHRpb25zLmNvbnZlcnRlcn1cbiAgICAgICAgICA6IG9wdGlvbnMuY29udmVydGVyPy5mcm9tQXR0cmlidXRlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gb3B0aW9ucy5jb252ZXJ0ZXJcbiAgICAgICAgICAgIDogZGVmYXVsdENvbnZlcnRlcjtcbiAgICAgIC8vIG1hcmsgc3RhdGUgcmVmbGVjdGluZ1xuICAgICAgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSA9IHByb3BOYW1lO1xuICAgICAgY29uc3QgY29udmVydGVkVmFsdWUgPSBjb252ZXJ0ZXIuZnJvbUF0dHJpYnV0ZSEodmFsdWUsIG9wdGlvbnMudHlwZSk7XG4gICAgICB0aGlzW3Byb3BOYW1lIGFzIGtleW9mIHRoaXNdID1cbiAgICAgICAgY29udmVydGVkVmFsdWUgPz9cbiAgICAgICAgdGhpcy5fX2RlZmF1bHRWYWx1ZXM/LmdldChwcm9wTmFtZSkgPz9cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgKGNvbnZlcnRlZFZhbHVlIGFzIGFueSk7XG4gICAgICAvLyBtYXJrIHN0YXRlIG5vdCByZWZsZWN0aW5nXG4gICAgICB0aGlzLl9fcmVmbGVjdGluZ1Byb3BlcnR5ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVxdWVzdHMgYW4gdXBkYXRlIHdoaWNoIGlzIHByb2Nlc3NlZCBhc3luY2hyb25vdXNseS4gVGhpcyBzaG91bGQgYmUgY2FsbGVkXG4gICAqIHdoZW4gYW4gZWxlbWVudCBzaG91bGQgdXBkYXRlIGJhc2VkIG9uIHNvbWUgc3RhdGUgbm90IHRyaWdnZXJlZCBieSBzZXR0aW5nXG4gICAqIGEgcmVhY3RpdmUgcHJvcGVydHkuIEluIHRoaXMgY2FzZSwgcGFzcyBubyBhcmd1bWVudHMuIEl0IHNob3VsZCBhbHNvIGJlXG4gICAqIGNhbGxlZCB3aGVuIG1hbnVhbGx5IGltcGxlbWVudGluZyBhIHByb3BlcnR5IHNldHRlci4gSW4gdGhpcyBjYXNlLCBwYXNzIHRoZVxuICAgKiBwcm9wZXJ0eSBgbmFtZWAgYW5kIGBvbGRWYWx1ZWAgdG8gZW5zdXJlIHRoYXQgYW55IGNvbmZpZ3VyZWQgcHJvcGVydHlcbiAgICogb3B0aW9ucyBhcmUgaG9ub3JlZC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgbmFtZSBvZiByZXF1ZXN0aW5nIHByb3BlcnR5XG4gICAqIEBwYXJhbSBvbGRWYWx1ZSBvbGQgdmFsdWUgb2YgcmVxdWVzdGluZyBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gb3B0aW9ucyBwcm9wZXJ0eSBvcHRpb25zIHRvIHVzZSBpbnN0ZWFkIG9mIHRoZSBwcmV2aW91c2x5XG4gICAqICAgICBjb25maWd1cmVkIG9wdGlvbnNcbiAgICogQHBhcmFtIHVzZU5ld1ZhbHVlIGlmIHRydWUsIHRoZSBuZXdWYWx1ZSBhcmd1bWVudCBpcyB1c2VkIGluc3RlYWQgb2ZcbiAgICogICAgIHJlYWRpbmcgdGhlIHByb3BlcnR5IHZhbHVlLiBUaGlzIGlzIGltcG9ydGFudCB0byB1c2UgaWYgdGhlIHJlYWN0aXZlXG4gICAqICAgICBwcm9wZXJ0eSBpcyBhIHN0YW5kYXJkIHByaXZhdGUgYWNjZXNzb3IsIGFzIG9wcG9zZWQgdG8gYSBwbGFpblxuICAgKiAgICAgcHJvcGVydHksIHNpbmNlIHByaXZhdGUgbWVtYmVycyBjYW4ndCBiZSBkeW5hbWljYWxseSByZWFkIGJ5IG5hbWUuXG4gICAqIEBwYXJhbSBuZXdWYWx1ZSB0aGUgbmV3IHZhbHVlIG9mIHRoZSBwcm9wZXJ0eS4gVGhpcyBpcyBvbmx5IHVzZWQgaWZcbiAgICogICAgIGB1c2VOZXdWYWx1ZWAgaXMgdHJ1ZS5cbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIHJlcXVlc3RVcGRhdGUoXG4gICAgbmFtZT86IFByb3BlcnR5S2V5LFxuICAgIG9sZFZhbHVlPzogdW5rbm93bixcbiAgICBvcHRpb25zPzogUHJvcGVydHlEZWNsYXJhdGlvbixcbiAgICB1c2VOZXdWYWx1ZSA9IGZhbHNlLFxuICAgIG5ld1ZhbHVlPzogdW5rbm93blxuICApOiB2b2lkIHtcbiAgICAvLyBJZiB3ZSBoYXZlIGEgcHJvcGVydHkga2V5LCBwZXJmb3JtIHByb3BlcnR5IHVwZGF0ZSBzdGVwcy5cbiAgICBpZiAobmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoREVWX01PREUgJiYgKG5hbWUgYXMgdW5rbm93bikgaW5zdGFuY2VvZiBFdmVudCkge1xuICAgICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICAgYGAsXG4gICAgICAgICAgYFRoZSByZXF1ZXN0VXBkYXRlKCkgbWV0aG9kIHdhcyBjYWxsZWQgd2l0aCBhbiBFdmVudCBhcyB0aGUgcHJvcGVydHkgbmFtZS4gVGhpcyBpcyBwcm9iYWJseSBhIG1pc3Rha2UgY2F1c2VkIGJ5IGJpbmRpbmcgdGhpcy5yZXF1ZXN0VXBkYXRlIGFzIGFuIGV2ZW50IGxpc3RlbmVyLiBJbnN0ZWFkIGJpbmQgYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2FsbCBpdCB3aXRoIG5vIGFyZ3VtZW50czogKCkgPT4gdGhpcy5yZXF1ZXN0VXBkYXRlKClgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBjdG9yID0gdGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50O1xuICAgICAgaWYgKHVzZU5ld1ZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHRoaXNbbmFtZSBhcyBrZXlvZiB0aGlzXTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPz89IGN0b3IuZ2V0UHJvcGVydHlPcHRpb25zKG5hbWUpO1xuICAgICAgY29uc3QgY2hhbmdlZCA9XG4gICAgICAgIChvcHRpb25zLmhhc0NoYW5nZWQgPz8gbm90RXF1YWwpKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfHxcbiAgICAgICAgLy8gV2hlbiB0aGVyZSBpcyBubyBjaGFuZ2UsIGNoZWNrIGEgY29ybmVyIGNhc2UgdGhhdCBjYW4gb2NjdXIgd2hlblxuICAgICAgICAvLyAxLiB0aGVyZSdzIGEgaW5pdGlhbCB2YWx1ZSB3aGljaCB3YXMgbm90IHJlZmxlY3RlZFxuICAgICAgICAvLyAyLiB0aGUgcHJvcGVydHkgaXMgc3Vic2VxdWVudGx5IHNldCB0byB0aGlzIHZhbHVlLlxuICAgICAgICAvLyBGb3IgZXhhbXBsZSwgYHByb3A6IHt1c2VEZWZhdWx0OiB0cnVlLCByZWZsZWN0OiB0cnVlfWBcbiAgICAgICAgLy8gYW5kIGVsLnByb3AgPSAnZm9vJy4gVGhpcyBzaG91bGQgYmUgY29uc2lkZXJlZCBhIGNoYW5nZSBpZiB0aGVcbiAgICAgICAgLy8gYXR0cmlidXRlIGlzIG5vdCBzZXQgYmVjYXVzZSB3ZSB3aWxsIG5vdyByZWZsZWN0IHRoZSBwcm9wZXJ0eSB0byB0aGUgYXR0cmlidXRlLlxuICAgICAgICAob3B0aW9ucy51c2VEZWZhdWx0ICYmXG4gICAgICAgICAgb3B0aW9ucy5yZWZsZWN0ICYmXG4gICAgICAgICAgbmV3VmFsdWUgPT09IHRoaXMuX19kZWZhdWx0VmFsdWVzPy5nZXQobmFtZSkgJiZcbiAgICAgICAgICAhdGhpcy5oYXNBdHRyaWJ1dGUoY3Rvci5fX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShuYW1lLCBvcHRpb25zKSEpKTtcbiAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMuXyRjaGFuZ2VQcm9wZXJ0eShuYW1lLCBvbGRWYWx1ZSwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBYm9ydCB0aGUgcmVxdWVzdCBpZiB0aGUgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSBjb25zaWRlcmVkIGNoYW5nZWQuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaXNVcGRhdGVQZW5kaW5nID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5fX3VwZGF0ZVByb21pc2UgPSB0aGlzLl9fZW5xdWV1ZVVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF8kY2hhbmdlUHJvcGVydHkoXG4gICAgbmFtZTogUHJvcGVydHlLZXksXG4gICAgb2xkVmFsdWU6IHVua25vd24sXG4gICAge3VzZURlZmF1bHQsIHJlZmxlY3QsIHdyYXBwZWR9OiBQcm9wZXJ0eURlY2xhcmF0aW9uLFxuICAgIGluaXRpYWxpemVWYWx1ZT86IHVua25vd25cbiAgKSB7XG4gICAgLy8gUmVjb3JkIGRlZmF1bHQgdmFsdWUgd2hlbiB1c2VEZWZhdWx0IGlzIHVzZWQuIFRoaXMgYWxsb3dzIHVzIHRvXG4gICAgLy8gcmVzdG9yZSB0aGlzIHZhbHVlIHdoZW4gdGhlIGF0dHJpYnV0ZSBpcyByZW1vdmVkLlxuICAgIGlmICh1c2VEZWZhdWx0ICYmICEodGhpcy5fX2RlZmF1bHRWYWx1ZXMgPz89IG5ldyBNYXAoKSkuaGFzKG5hbWUpKSB7XG4gICAgICB0aGlzLl9fZGVmYXVsdFZhbHVlcy5zZXQoXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluaXRpYWxpemVWYWx1ZSA/PyBvbGRWYWx1ZSA/PyB0aGlzW25hbWUgYXMga2V5b2YgdGhpc11cbiAgICAgICk7XG4gICAgICAvLyBpZiB0aGlzIGlzIG5vdCB3cmFwcGluZyBhbiBhY2Nlc3NvciwgaXQgbXVzdCBiZSBhbiBpbml0aWFsIHNldHRpbmdcbiAgICAgIC8vIGFuZCBpbiB0aGlzIGNhc2Ugd2UgZG8gbm90IHdhbnQgdG8gcmVjb3JkIHRoZSBjaGFuZ2Ugb3IgcmVmbGVjdC5cbiAgICAgIGlmICh3cmFwcGVkICE9PSB0cnVlIHx8IGluaXRpYWxpemVWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVE9ETyAoanVzdGluZmFnbmFuaSk6IENyZWF0ZSBhIGJlbmNobWFyayBvZiBNYXAuaGFzKCkgKyBNYXAuc2V0KFxuICAgIC8vIHZzIGp1c3QgTWFwLnNldCgpXG4gICAgaWYgKCF0aGlzLl8kY2hhbmdlZFByb3BlcnRpZXMuaGFzKG5hbWUpKSB7XG4gICAgICAvLyBPbiB0aGUgaW5pdGlhbCBjaGFuZ2UsIHRoZSBvbGQgdmFsdWUgc2hvdWxkIGJlIGB1bmRlZmluZWRgLCBleGNlcHRcbiAgICAgIC8vIHdpdGggYHVzZURlZmF1bHRgXG4gICAgICBpZiAoIXRoaXMuaGFzVXBkYXRlZCAmJiAhdXNlRGVmYXVsdCkge1xuICAgICAgICBvbGRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHRoaXMuXyRjaGFuZ2VkUHJvcGVydGllcy5zZXQobmFtZSwgb2xkVmFsdWUpO1xuICAgIH1cbiAgICAvLyBBZGQgdG8gcmVmbGVjdGluZyBwcm9wZXJ0aWVzIHNldC5cbiAgICAvLyBOb3RlLCBpdCdzIGltcG9ydGFudCB0aGF0IGV2ZXJ5IGNoYW5nZSBoYXMgYSBjaGFuY2UgdG8gYWRkIHRoZVxuICAgIC8vIHByb3BlcnR5IHRvIGBfX3JlZmxlY3RpbmdQcm9wZXJ0aWVzYC4gVGhpcyBlbnN1cmVzIHNldHRpbmdcbiAgICAvLyBhdHRyaWJ1dGUgKyBwcm9wZXJ0eSByZWZsZWN0cyBjb3JyZWN0bHkuXG4gICAgaWYgKHJlZmxlY3QgPT09IHRydWUgJiYgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSAhPT0gbmFtZSkge1xuICAgICAgKHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydGllcyA/Pz0gbmV3IFNldDxQcm9wZXJ0eUtleT4oKSkuYWRkKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHVwIHRoZSBlbGVtZW50IHRvIGFzeW5jaHJvbm91c2x5IHVwZGF0ZS5cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX19lbnF1ZXVlVXBkYXRlKCkge1xuICAgIHRoaXMuaXNVcGRhdGVQZW5kaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgLy8gRW5zdXJlIGFueSBwcmV2aW91cyB1cGRhdGUgaGFzIHJlc29sdmVkIGJlZm9yZSB1cGRhdGluZy5cbiAgICAgIC8vIFRoaXMgYGF3YWl0YCBhbHNvIGVuc3VyZXMgdGhhdCBwcm9wZXJ0eSBjaGFuZ2VzIGFyZSBiYXRjaGVkLlxuICAgICAgYXdhaXQgdGhpcy5fX3VwZGF0ZVByb21pc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gUmVmaXJlIGFueSBwcmV2aW91cyBlcnJvcnMgYXN5bmMgc28gdGhleSBkbyBub3QgZGlzcnVwdCB0aGUgdXBkYXRlXG4gICAgICAvLyBjeWNsZS4gRXJyb3JzIGFyZSByZWZpcmVkIHNvIGRldmVsb3BlcnMgaGF2ZSBhIGNoYW5jZSB0byBvYnNlcnZlXG4gICAgICAvLyB0aGVtLCBhbmQgdGhpcyBjYW4gYmUgZG9uZSBieSBpbXBsZW1lbnRpbmdcbiAgICAgIC8vIGB3aW5kb3cub251bmhhbmRsZWRyZWplY3Rpb25gLlxuICAgICAgUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc2NoZWR1bGVVcGRhdGUoKTtcbiAgICAvLyBJZiBgc2NoZWR1bGVVcGRhdGVgIHJldHVybnMgYSBQcm9taXNlLCB3ZSBhd2FpdCBpdC4gVGhpcyBpcyBkb25lIHRvXG4gICAgLy8gZW5hYmxlIGNvb3JkaW5hdGluZyB1cGRhdGVzIHdpdGggYSBzY2hlZHVsZXIuIE5vdGUsIHRoZSByZXN1bHQgaXNcbiAgICAvLyBjaGVja2VkIHRvIGF2b2lkIGRlbGF5aW5nIGFuIGFkZGl0aW9uYWwgbWljcm90YXNrIHVubGVzcyB3ZSBuZWVkIHRvLlxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgYXdhaXQgcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gIXRoaXMuaXNVcGRhdGVQZW5kaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjaGVkdWxlcyBhbiBlbGVtZW50IHVwZGF0ZS4gWW91IGNhbiBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBjaGFuZ2UgdGhlXG4gICAqIHRpbWluZyBvZiB1cGRhdGVzIGJ5IHJldHVybmluZyBhIFByb21pc2UuIFRoZSB1cGRhdGUgd2lsbCBhd2FpdCB0aGVcbiAgICogcmV0dXJuZWQgUHJvbWlzZSwgYW5kIHlvdSBzaG91bGQgcmVzb2x2ZSB0aGUgUHJvbWlzZSB0byBhbGxvdyB0aGUgdXBkYXRlXG4gICAqIHRvIHByb2NlZWQuIElmIHRoaXMgbWV0aG9kIGlzIG92ZXJyaWRkZW4sIGBzdXBlci5zY2hlZHVsZVVwZGF0ZSgpYFxuICAgKiBtdXN0IGJlIGNhbGxlZC5cbiAgICpcbiAgICogRm9yIGluc3RhbmNlLCB0byBzY2hlZHVsZSB1cGRhdGVzIHRvIG9jY3VyIGp1c3QgYmVmb3JlIHRoZSBuZXh0IGZyYW1lOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBvdmVycmlkZSBwcm90ZWN0ZWQgYXN5bmMgc2NoZWR1bGVVcGRhdGUoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAqICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiByZXNvbHZlKCkpKTtcbiAgICogICBzdXBlci5zY2hlZHVsZVVwZGF0ZSgpO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHNjaGVkdWxlVXBkYXRlKCk6IHZvaWQgfCBQcm9taXNlPHVua25vd24+IHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnBlcmZvcm1VcGRhdGUoKTtcbiAgICBpZiAoXG4gICAgICBERVZfTU9ERSAmJlxuICAgICAgKHRoaXMuY29uc3RydWN0b3IgYXMgdHlwZW9mIFJlYWN0aXZlRWxlbWVudCkuZW5hYmxlZFdhcm5pbmdzIS5pbmNsdWRlcyhcbiAgICAgICAgJ2FzeW5jLXBlcmZvcm0tdXBkYXRlJ1xuICAgICAgKSAmJlxuICAgICAgdHlwZW9mIChyZXN1bHQgYXMgdW5rbm93biBhcyBQcm9taXNlPHVua25vd24+IHwgdW5kZWZpbmVkKT8udGhlbiA9PT1cbiAgICAgICAgJ2Z1bmN0aW9uJ1xuICAgICkge1xuICAgICAgaXNzdWVXYXJuaW5nKFxuICAgICAgICAnYXN5bmMtcGVyZm9ybS11cGRhdGUnLFxuICAgICAgICBgRWxlbWVudCAke3RoaXMubG9jYWxOYW1lfSByZXR1cm5lZCBhIFByb21pc2UgZnJvbSBwZXJmb3JtVXBkYXRlKCkuIGAgK1xuICAgICAgICAgIGBUaGlzIGJlaGF2aW9yIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSBgICtcbiAgICAgICAgICBgdmVyc2lvbiBvZiBSZWFjdGl2ZUVsZW1lbnQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhbiBlbGVtZW50IHVwZGF0ZS4gTm90ZSwgaWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBkdXJpbmcgdGhlXG4gICAqIHVwZGF0ZSwgYGZpcnN0VXBkYXRlZGAgYW5kIGB1cGRhdGVkYCB3aWxsIG5vdCBiZSBjYWxsZWQuXG4gICAqXG4gICAqIENhbGwgYHBlcmZvcm1VcGRhdGUoKWAgdG8gaW1tZWRpYXRlbHkgcHJvY2VzcyBhIHBlbmRpbmcgdXBkYXRlLiBUaGlzIHNob3VsZFxuICAgKiBnZW5lcmFsbHkgbm90IGJlIG5lZWRlZCwgYnV0IGl0IGNhbiBiZSBkb25lIGluIHJhcmUgY2FzZXMgd2hlbiB5b3UgbmVlZCB0b1xuICAgKiB1cGRhdGUgc3luY2hyb25vdXNseS5cbiAgICpcbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIHByb3RlY3RlZCBwZXJmb3JtVXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIEFib3J0IGFueSB1cGRhdGUgaWYgb25lIGlzIG5vdCBwZW5kaW5nIHdoZW4gdGhpcyBpcyBjYWxsZWQuXG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIGBwZXJmb3JtVXBkYXRlYCBpcyBjYWxsZWQgZWFybHkgdG8gXCJmbHVzaFwiXG4gICAgLy8gdGhlIHVwZGF0ZS5cbiAgICBpZiAoIXRoaXMuaXNVcGRhdGVQZW5kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlYnVnTG9nRXZlbnQ/Lih7a2luZDogJ3VwZGF0ZSd9KTtcbiAgICBpZiAoIXRoaXMuaGFzVXBkYXRlZCkge1xuICAgICAgLy8gQ3JlYXRlIHJlbmRlclJvb3QgYmVmb3JlIGZpcnN0IHVwZGF0ZS4gVGhpcyBvY2N1cnMgaW4gYGNvbm5lY3RlZENhbGxiYWNrYFxuICAgICAgLy8gYnV0IGlzIGRvbmUgaGVyZSB0byBzdXBwb3J0IG91dCBvZiB0cmVlIGNhbGxzIHRvIGBlbmFibGVVcGRhdGluZ2AvYHBlcmZvcm1VcGRhdGVgLlxuICAgICAgKHRoaXMgYXMgTXV0YWJsZTx0eXBlb2YgdGhpcywgJ3JlbmRlclJvb3QnPikucmVuZGVyUm9vdCA/Pz1cbiAgICAgICAgdGhpcy5jcmVhdGVSZW5kZXJSb290KCk7XG4gICAgICBpZiAoREVWX01PREUpIHtcbiAgICAgICAgLy8gUHJvZHVjZSB3YXJuaW5nIGlmIGFueSByZWFjdGl2ZSBwcm9wZXJ0aWVzIG9uIHRoZSBwcm90b3R5cGUgYXJlXG4gICAgICAgIC8vIHNoYWRvd2VkIGJ5IGNsYXNzIGZpZWxkcy4gSW5zdGFuY2UgZmllbGRzIHNldCBiZWZvcmUgdXBncmFkZSBhcmVcbiAgICAgICAgLy8gZGVsZXRlZCBieSB0aGlzIHBvaW50LCBzbyBhbnkgb3duIHByb3BlcnR5IGlzIGNhdXNlZCBieSBjbGFzcyBmaWVsZFxuICAgICAgICAvLyBpbml0aWFsaXphdGlvbiBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgIGNvbnN0IGN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNoYWRvd2VkUHJvcGVydGllcyA9IFsuLi5jdG9yLmVsZW1lbnRQcm9wZXJ0aWVzLmtleXMoKV0uZmlsdGVyKFxuICAgICAgICAgIChwKSA9PiB0aGlzLmhhc093blByb3BlcnR5KHApICYmIHAgaW4gZ2V0UHJvdG90eXBlT2YodGhpcylcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHNoYWRvd2VkUHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgVGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIG9uIGVsZW1lbnQgJHt0aGlzLmxvY2FsTmFtZX0gd2lsbCBub3QgYCArXG4gICAgICAgICAgICAgIGB0cmlnZ2VyIHVwZGF0ZXMgYXMgZXhwZWN0ZWQgYmVjYXVzZSB0aGV5IGFyZSBzZXQgdXNpbmcgY2xhc3MgYCArXG4gICAgICAgICAgICAgIGBmaWVsZHM6ICR7c2hhZG93ZWRQcm9wZXJ0aWVzLmpvaW4oJywgJyl9LiBgICtcbiAgICAgICAgICAgICAgYE5hdGl2ZSBjbGFzcyBmaWVsZHMgYW5kIHNvbWUgY29tcGlsZWQgb3V0cHV0IHdpbGwgb3ZlcndyaXRlIGAgK1xuICAgICAgICAgICAgICBgYWNjZXNzb3JzIHVzZWQgZm9yIGRldGVjdGluZyBjaGFuZ2VzLiBTZWUgYCArXG4gICAgICAgICAgICAgIGBodHRwczovL2xpdC5kZXYvbXNnL2NsYXNzLWZpZWxkLXNoYWRvd2luZyBgICtcbiAgICAgICAgICAgICAgYGZvciBtb3JlIGluZm9ybWF0aW9uLmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBNaXhpbiBpbnN0YW5jZSBwcm9wZXJ0aWVzIG9uY2UsIGlmIHRoZXkgZXhpc3QuXG4gICAgICBpZiAodGhpcy5fX2luc3RhbmNlUHJvcGVydGllcykge1xuICAgICAgICAvLyBUT0RPIChqdXN0aW5mYWduYW5pKTogc2hvdWxkIHdlIHVzZSB0aGUgc3RvcmVkIHZhbHVlPyBDb3VsZCBhIG5ldyB2YWx1ZVxuICAgICAgICAvLyBoYXZlIGJlZW4gc2V0IHNpbmNlIHdlIHN0b3JlZCB0aGUgb3duIHByb3BlcnR5IHZhbHVlP1xuICAgICAgICBmb3IgKGNvbnN0IFtwLCB2YWx1ZV0gb2YgdGhpcy5fX2luc3RhbmNlUHJvcGVydGllcykge1xuICAgICAgICAgIHRoaXNbcCBhcyBrZXlvZiB0aGlzXSA9IHZhbHVlIGFzIHRoaXNba2V5b2YgdGhpc107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX2luc3RhbmNlUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIC8vIFRyaWdnZXIgaW5pdGlhbCB2YWx1ZSByZWZsZWN0aW9uIGFuZCBwb3B1bGF0ZSB0aGUgaW5pdGlhbFxuICAgICAgLy8gYGNoYW5nZWRQcm9wZXJ0aWVzYCBtYXAsIGJ1dCBvbmx5IGZvciB0aGUgY2FzZSBvZiBwcm9wZXJ0aWVzIGNyZWF0ZWRcbiAgICAgIC8vIHZpYSBgY3JlYXRlUHJvcGVydHlgIG9uIGFjY2Vzc29ycywgd2hpY2ggd2lsbCBub3QgaGF2ZSBhbHJlYWR5XG4gICAgICAvLyBwb3B1bGF0ZWQgdGhlIGBjaGFuZ2VkUHJvcGVydGllc2AgbWFwIHNpbmNlIHRoZXkgYXJlIG5vdCBzZXQuXG4gICAgICAvLyBXZSBjYW4ndCBrbm93IGlmIHRoZXNlIGFjY2Vzc29ycyBoYWQgaW5pdGlhbGl6ZXJzLCBzbyB3ZSBqdXN0IHNldFxuICAgICAgLy8gdGhlbSBhbnl3YXkgLSBhIGRpZmZlcmVuY2UgZnJvbSBleHBlcmltZW50YWwgZGVjb3JhdG9ycyBvbiBmaWVsZHMgYW5kXG4gICAgICAvLyBzdGFuZGFyZCBkZWNvcmF0b3JzIG9uIGF1dG8tYWNjZXNzb3JzLlxuICAgICAgLy8gRm9yIGNvbnRleHQgc2VlOlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2xpdC9saXQvcHVsbC80MTgzI2lzc3VlY29tbWVudC0xNzExOTU5NjM1XG4gICAgICBjb25zdCBlbGVtZW50UHJvcGVydGllcyA9ICh0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpXG4gICAgICAgIC5lbGVtZW50UHJvcGVydGllcztcbiAgICAgIGlmIChlbGVtZW50UHJvcGVydGllcy5zaXplID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtwLCBvcHRpb25zXSBvZiBlbGVtZW50UHJvcGVydGllcykge1xuICAgICAgICAgIGNvbnN0IHt3cmFwcGVkfSA9IG9wdGlvbnM7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzW3AgYXMga2V5b2YgdGhpc107XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgd3JhcHBlZCA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgIXRoaXMuXyRjaGFuZ2VkUHJvcGVydGllcy5oYXMocCkgJiZcbiAgICAgICAgICAgIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuXyRjaGFuZ2VQcm9wZXJ0eShwLCB1bmRlZmluZWQsIG9wdGlvbnMsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuICAgIGNvbnN0IGNoYW5nZWRQcm9wZXJ0aWVzID0gdGhpcy5fJGNoYW5nZWRQcm9wZXJ0aWVzO1xuICAgIHRyeSB7XG4gICAgICBzaG91bGRVcGRhdGUgPSB0aGlzLnNob3VsZFVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICAgIHRoaXMud2lsbFVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgICAgIHRoaXMuX19jb250cm9sbGVycz8uZm9yRWFjaCgoYykgPT4gYy5ob3N0VXBkYXRlPy4oKSk7XG4gICAgICAgIHRoaXMudXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX19tYXJrVXBkYXRlZCgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFByZXZlbnQgYGZpcnN0VXBkYXRlZGAgYW5kIGB1cGRhdGVkYCBmcm9tIHJ1bm5pbmcgd2hlbiB0aGVyZSdzIGFuXG4gICAgICAvLyB1cGRhdGUgZXhjZXB0aW9uLlxuICAgICAgc2hvdWxkVXBkYXRlID0gZmFsc2U7XG4gICAgICAvLyBFbnN1cmUgZWxlbWVudCBjYW4gYWNjZXB0IGFkZGl0aW9uYWwgdXBkYXRlcyBhZnRlciBhbiBleGNlcHRpb24uXG4gICAgICB0aGlzLl9fbWFya1VwZGF0ZWQoKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICAgIC8vIFRoZSB1cGRhdGUgaXMgbm8gbG9uZ2VyIGNvbnNpZGVyZWQgcGVuZGluZyBhbmQgZnVydGhlciB1cGRhdGVzIGFyZSBub3cgYWxsb3dlZC5cbiAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICB0aGlzLl8kZGlkVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW52b2tlZCBiZWZvcmUgYHVwZGF0ZSgpYCB0byBjb21wdXRlIHZhbHVlcyBuZWVkZWQgZHVyaW5nIHRoZSB1cGRhdGUuXG4gICAqXG4gICAqIEltcGxlbWVudCBgd2lsbFVwZGF0ZWAgdG8gY29tcHV0ZSBwcm9wZXJ0eSB2YWx1ZXMgdGhhdCBkZXBlbmQgb24gb3RoZXJcbiAgICogcHJvcGVydGllcyBhbmQgYXJlIHVzZWQgaW4gdGhlIHJlc3Qgb2YgdGhlIHVwZGF0ZSBwcm9jZXNzLlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiB3aWxsVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAqICAgLy8gb25seSBuZWVkIHRvIGNoZWNrIGNoYW5nZWQgcHJvcGVydGllcyBmb3IgYW4gZXhwZW5zaXZlIGNvbXB1dGF0aW9uLlxuICAgKiAgIGlmIChjaGFuZ2VkUHJvcGVydGllcy5oYXMoJ2ZpcnN0TmFtZScpIHx8IGNoYW5nZWRQcm9wZXJ0aWVzLmhhcygnbGFzdE5hbWUnKSkge1xuICAgKiAgICAgdGhpcy5zaGEgPSBjb21wdXRlU0hBKGAke3RoaXMuZmlyc3ROYW1lfSAke3RoaXMubGFzdE5hbWV9YCk7XG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIHJlbmRlcigpIHtcbiAgICogICByZXR1cm4gaHRtbGBTSEE6ICR7dGhpcy5zaGF9YDtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIHByb3RlY3RlZCB3aWxsVXBkYXRlKF9jaGFuZ2VkUHJvcGVydGllczogUHJvcGVydHlWYWx1ZXMpOiB2b2lkIHt9XG5cbiAgLy8gTm90ZSwgdGhpcyBpcyBhbiBvdmVycmlkZSBwb2ludCBmb3IgcG9seWZpbGwtc3VwcG9ydC5cbiAgLy8gQGludGVybmFsXG4gIF8kZGlkVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzOiBQcm9wZXJ0eVZhbHVlcykge1xuICAgIHRoaXMuX19jb250cm9sbGVycz8uZm9yRWFjaCgoYykgPT4gYy5ob3N0VXBkYXRlZD8uKCkpO1xuICAgIGlmICghdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICB0aGlzLmhhc1VwZGF0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5maXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIGlmIChcbiAgICAgIERFVl9NT0RFICYmXG4gICAgICB0aGlzLmlzVXBkYXRlUGVuZGluZyAmJlxuICAgICAgKHRoaXMuY29uc3RydWN0b3IgYXMgdHlwZW9mIFJlYWN0aXZlRWxlbWVudCkuZW5hYmxlZFdhcm5pbmdzIS5pbmNsdWRlcyhcbiAgICAgICAgJ2NoYW5nZS1pbi11cGRhdGUnXG4gICAgICApXG4gICAgKSB7XG4gICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICdjaGFuZ2UtaW4tdXBkYXRlJyxcbiAgICAgICAgYEVsZW1lbnQgJHt0aGlzLmxvY2FsTmFtZX0gc2NoZWR1bGVkIGFuIHVwZGF0ZSBgICtcbiAgICAgICAgICBgKGdlbmVyYWxseSBiZWNhdXNlIGEgcHJvcGVydHkgd2FzIHNldCkgYCArXG4gICAgICAgICAgYGFmdGVyIGFuIHVwZGF0ZSBjb21wbGV0ZWQsIGNhdXNpbmcgYSBuZXcgdXBkYXRlIHRvIGJlIHNjaGVkdWxlZC4gYCArXG4gICAgICAgICAgYFRoaXMgaXMgaW5lZmZpY2llbnQgYW5kIHNob3VsZCBiZSBhdm9pZGVkIHVubGVzcyB0aGUgbmV4dCB1cGRhdGUgYCArXG4gICAgICAgICAgYGNhbiBvbmx5IGJlIHNjaGVkdWxlZCBhcyBhIHNpZGUgZWZmZWN0IG9mIHRoZSBwcmV2aW91cyB1cGRhdGUuYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9fbWFya1VwZGF0ZWQoKSB7XG4gICAgdGhpcy5fJGNoYW5nZWRQcm9wZXJ0aWVzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuaXNVcGRhdGVQZW5kaW5nID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBlbGVtZW50IGhhcyBjb21wbGV0ZWQgdXBkYXRpbmcuXG4gICAqIFRoZSBQcm9taXNlIHZhbHVlIGlzIGEgYm9vbGVhbiB0aGF0IGlzIGB0cnVlYCBpZiB0aGUgZWxlbWVudCBjb21wbGV0ZWQgdGhlXG4gICAqIHVwZGF0ZSB3aXRob3V0IHRyaWdnZXJpbmcgYW5vdGhlciB1cGRhdGUuIFRoZSBQcm9taXNlIHJlc3VsdCBpcyBgZmFsc2VgIGlmXG4gICAqIGEgcHJvcGVydHkgd2FzIHNldCBpbnNpZGUgYHVwZGF0ZWQoKWAuIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBhblxuICAgKiBleGNlcHRpb24gd2FzIHRocm93biBkdXJpbmcgdGhlIHVwZGF0ZS5cbiAgICpcbiAgICogVG8gYXdhaXQgYWRkaXRpb25hbCBhc3luY2hyb25vdXMgd29yaywgb3ZlcnJpZGUgdGhlIGBnZXRVcGRhdGVDb21wbGV0ZWBcbiAgICogbWV0aG9kLiBGb3IgZXhhbXBsZSwgaXQgaXMgc29tZXRpbWVzIHVzZWZ1bCB0byBhd2FpdCBhIHJlbmRlcmVkIGVsZW1lbnRcbiAgICogYmVmb3JlIGZ1bGZpbGxpbmcgdGhpcyBQcm9taXNlLiBUbyBkbyB0aGlzLCBmaXJzdCBhd2FpdFxuICAgKiBgc3VwZXIuZ2V0VXBkYXRlQ29tcGxldGUoKWAsIHRoZW4gYW55IHN1YnNlcXVlbnQgc3RhdGUuXG4gICAqXG4gICAqIEByZXR1cm4gQSBwcm9taXNlIG9mIGEgYm9vbGVhbiB0aGF0IHJlc29sdmVzIHRvIHRydWUgaWYgdGhlIHVwZGF0ZSBjb21wbGV0ZWRcbiAgICogICAgIHdpdGhvdXQgdHJpZ2dlcmluZyBhbm90aGVyIHVwZGF0ZS5cbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIGdldCB1cGRhdGVDb21wbGV0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRVcGRhdGVDb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHBvaW50IGZvciB0aGUgYHVwZGF0ZUNvbXBsZXRlYCBwcm9taXNlLlxuICAgKlxuICAgKiBJdCBpcyBub3Qgc2FmZSB0byBvdmVycmlkZSB0aGUgYHVwZGF0ZUNvbXBsZXRlYCBnZXR0ZXIgZGlyZWN0bHkgZHVlIHRvIGFcbiAgICogbGltaXRhdGlvbiBpbiBUeXBlU2NyaXB0IHdoaWNoIG1lYW5zIGl0IGlzIG5vdCBwb3NzaWJsZSB0byBjYWxsIGFcbiAgICogc3VwZXJjbGFzcyBnZXR0ZXIgKGUuZy4gYHN1cGVyLnVwZGF0ZUNvbXBsZXRlLnRoZW4oLi4uKWApIHdoZW4gdGhlIHRhcmdldFxuICAgKiBsYW5ndWFnZSBpcyBFUzUgKGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMzM4KS5cbiAgICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRkZW4gaW5zdGVhZC4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGNsYXNzIE15RWxlbWVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICAgKiAgIG92ZXJyaWRlIGFzeW5jIGdldFVwZGF0ZUNvbXBsZXRlKCkge1xuICAgKiAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3VwZXIuZ2V0VXBkYXRlQ29tcGxldGUoKTtcbiAgICogICAgIGF3YWl0IHRoaXMuX215Q2hpbGQudXBkYXRlQ29tcGxldGU7XG4gICAqICAgICByZXR1cm4gcmVzdWx0O1xuICAgKiAgIH1cbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQHJldHVybiBBIHByb21pc2Ugb2YgYSBib29sZWFuIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgdXBkYXRlIGNvbXBsZXRlZFxuICAgKiAgICAgd2l0aG91dCB0cmlnZ2VyaW5nIGFub3RoZXIgdXBkYXRlLlxuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIGdldFVwZGF0ZUNvbXBsZXRlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9fdXBkYXRlUHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCBgdXBkYXRlKClgIHNob3VsZCBiZSBjYWxsZWQgd2hlbiB0aGUgZWxlbWVudCByZXF1ZXN0c1xuICAgKiBhbiB1cGRhdGUuIEJ5IGRlZmF1bHQsIHRoaXMgbWV0aG9kIGFsd2F5cyByZXR1cm5zIGB0cnVlYCwgYnV0IHRoaXMgY2FuIGJlXG4gICAqIGN1c3RvbWl6ZWQgdG8gY29udHJvbCB3aGVuIHRvIHVwZGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHNob3VsZFVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZWxlbWVudC4gVGhpcyBtZXRob2QgcmVmbGVjdHMgcHJvcGVydHkgdmFsdWVzIHRvIGF0dHJpYnV0ZXMuXG4gICAqIEl0IGNhbiBiZSBvdmVycmlkZGVuIHRvIHJlbmRlciBhbmQga2VlcCB1cGRhdGVkIGVsZW1lbnQgRE9NLlxuICAgKiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlIHRoaXMgbWV0aG9kIHdpbGwgKm5vdCogdHJpZ2dlclxuICAgKiBhbm90aGVyIHVwZGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKSB7XG4gICAgLy8gVGhlIGZvckVhY2goKSBleHByZXNzaW9uIHdpbGwgb25seSBydW4gd2hlbiBfX3JlZmxlY3RpbmdQcm9wZXJ0aWVzIGlzXG4gICAgLy8gZGVmaW5lZCwgYW5kIGl0IHJldHVybnMgdW5kZWZpbmVkLCBzZXR0aW5nIF9fcmVmbGVjdGluZ1Byb3BlcnRpZXMgdG9cbiAgICAvLyB1bmRlZmluZWRcbiAgICB0aGlzLl9fcmVmbGVjdGluZ1Byb3BlcnRpZXMgJiY9IHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydGllcy5mb3JFYWNoKChwKSA9PlxuICAgICAgdGhpcy5fX3Byb3BlcnR5VG9BdHRyaWJ1dGUocCwgdGhpc1twIGFzIGtleW9mIHRoaXNdKVxuICAgICkgYXMgdW5kZWZpbmVkO1xuICAgIHRoaXMuX19tYXJrVXBkYXRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbmV2ZXIgdGhlIGVsZW1lbnQgaXMgdXBkYXRlZC4gSW1wbGVtZW50IHRvIHBlcmZvcm1cbiAgICogcG9zdC11cGRhdGluZyB0YXNrcyB2aWEgRE9NIEFQSXMsIGZvciBleGFtcGxlLCBmb2N1c2luZyBhbiBlbGVtZW50LlxuICAgKlxuICAgKiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlIHRoaXMgbWV0aG9kIHdpbGwgdHJpZ2dlciB0aGUgZWxlbWVudCB0byB1cGRhdGVcbiAgICogYWdhaW4gYWZ0ZXIgdGhpcyB1cGRhdGUgY3ljbGUgY29tcGxldGVzLlxuICAgKlxuICAgKiBAcGFyYW0gX2NoYW5nZWRQcm9wZXJ0aWVzIE1hcCBvZiBjaGFuZ2VkIHByb3BlcnRpZXMgd2l0aCBvbGQgdmFsdWVzXG4gICAqIEBjYXRlZ29yeSB1cGRhdGVzXG4gICAqL1xuICBwcm90ZWN0ZWQgdXBkYXRlZChfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKSB7fVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGVsZW1lbnQgaXMgZmlyc3QgdXBkYXRlZC4gSW1wbGVtZW50IHRvIHBlcmZvcm0gb25lIHRpbWVcbiAgICogd29yayBvbiB0aGUgZWxlbWVudCBhZnRlciB1cGRhdGUuXG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGZpcnN0VXBkYXRlZCgpIHtcbiAgICogICB0aGlzLnJlbmRlclJvb3QuZ2V0RWxlbWVudEJ5SWQoJ215LXRleHQtYXJlYScpLmZvY3VzKCk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCB0cmlnZ2VyIHRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICAgKiBhZ2FpbiBhZnRlciB0aGlzIHVwZGF0ZSBjeWNsZSBjb21wbGV0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSBfY2hhbmdlZFByb3BlcnRpZXMgTWFwIG9mIGNoYW5nZWQgcHJvcGVydGllcyB3aXRoIG9sZCB2YWx1ZXNcbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIHByb3RlY3RlZCBmaXJzdFVwZGF0ZWQoX2NoYW5nZWRQcm9wZXJ0aWVzOiBQcm9wZXJ0eVZhbHVlcykge31cbn1cbi8vIEFzc2lnbmVkIGhlcmUgdG8gd29yayBhcm91bmQgYSBqc2NvbXBpbGVyIGJ1ZyB3aXRoIHN0YXRpYyBmaWVsZHNcbi8vIHdoZW4gY29tcGlsaW5nIHRvIEVTNS5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1jb21waWxlci9pc3N1ZXMvMzE3N1xuKFJlYWN0aXZlRWxlbWVudCBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVtcbiAgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnZWxlbWVudFByb3BlcnRpZXMnLCBSZWFjdGl2ZUVsZW1lbnQpXG5dID0gbmV3IE1hcCgpO1xuKFJlYWN0aXZlRWxlbWVudCBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVtcbiAgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnZmluYWxpemVkJywgUmVhY3RpdmVFbGVtZW50KVxuXSA9IG5ldyBNYXAoKTtcblxuLy8gQXBwbHkgcG9seWZpbGxzIGlmIGF2YWlsYWJsZVxucG9seWZpbGxTdXBwb3J0Py4oe1JlYWN0aXZlRWxlbWVudH0pO1xuXG4vLyBEZXYgbW9kZSB3YXJuaW5ncy4uLlxuaWYgKERFVl9NT0RFKSB7XG4gIC8vIERlZmF1bHQgd2FybmluZyBzZXQuXG4gIFJlYWN0aXZlRWxlbWVudC5lbmFibGVkV2FybmluZ3MgPSBbXG4gICAgJ2NoYW5nZS1pbi11cGRhdGUnLFxuICAgICdhc3luYy1wZXJmb3JtLXVwZGF0ZScsXG4gIF07XG4gIGNvbnN0IGVuc3VyZU93bldhcm5pbmdzID0gZnVuY3Rpb24gKGN0b3I6IHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpIHtcbiAgICBpZiAoXG4gICAgICAhY3Rvci5oYXNPd25Qcm9wZXJ0eShKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdlbmFibGVkV2FybmluZ3MnLCBjdG9yKSlcbiAgICApIHtcbiAgICAgIGN0b3IuZW5hYmxlZFdhcm5pbmdzID0gY3Rvci5lbmFibGVkV2FybmluZ3MhLnNsaWNlKCk7XG4gICAgfVxuICB9O1xuICBSZWFjdGl2ZUVsZW1lbnQuZW5hYmxlV2FybmluZyA9IGZ1bmN0aW9uIChcbiAgICB0aGlzOiB0eXBlb2YgUmVhY3RpdmVFbGVtZW50LFxuICAgIHdhcm5pbmc6IFdhcm5pbmdLaW5kXG4gICkge1xuICAgIGVuc3VyZU93bldhcm5pbmdzKHRoaXMpO1xuICAgIGlmICghdGhpcy5lbmFibGVkV2FybmluZ3MhLmluY2x1ZGVzKHdhcm5pbmcpKSB7XG4gICAgICB0aGlzLmVuYWJsZWRXYXJuaW5ncyEucHVzaCh3YXJuaW5nKTtcbiAgICB9XG4gIH07XG4gIFJlYWN0aXZlRWxlbWVudC5kaXNhYmxlV2FybmluZyA9IGZ1bmN0aW9uIChcbiAgICB0aGlzOiB0eXBlb2YgUmVhY3RpdmVFbGVtZW50LFxuICAgIHdhcm5pbmc6IFdhcm5pbmdLaW5kXG4gICkge1xuICAgIGVuc3VyZU93bldhcm5pbmdzKHRoaXMpO1xuICAgIGNvbnN0IGkgPSB0aGlzLmVuYWJsZWRXYXJuaW5ncyEuaW5kZXhPZih3YXJuaW5nKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICB0aGlzLmVuYWJsZWRXYXJuaW5ncyEuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gSU1QT1JUQU5UOiBkbyBub3QgY2hhbmdlIHRoZSBwcm9wZXJ0eSBuYW1lIG9yIHRoZSBhc3NpZ25tZW50IGV4cHJlc3Npb24uXG4vLyBUaGlzIGxpbmUgd2lsbCBiZSB1c2VkIGluIHJlZ2V4ZXMgdG8gc2VhcmNoIGZvciBSZWFjdGl2ZUVsZW1lbnQgdXNhZ2UuXG4oZ2xvYmFsLnJlYWN0aXZlRWxlbWVudFZlcnNpb25zID8/PSBbXSkucHVzaCgnMi4xLjInKTtcbmlmIChERVZfTU9ERSAmJiBnbG9iYWwucmVhY3RpdmVFbGVtZW50VmVyc2lvbnMubGVuZ3RoID4gMSkge1xuICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgaXNzdWVXYXJuaW5nIShcbiAgICAgICdtdWx0aXBsZS12ZXJzaW9ucycsXG4gICAgICBgTXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0IGxvYWRlZC4gTG9hZGluZyBtdWx0aXBsZSB2ZXJzaW9ucyBgICtcbiAgICAgICAgYGlzIG5vdCByZWNvbW1lbmRlZC5gXG4gICAgKTtcbiAgfSk7XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8vIElNUE9SVEFOVDogdGhlc2UgaW1wb3J0cyBtdXN0IGJlIHR5cGUtb25seVxuaW1wb3J0IHR5cGUge0RpcmVjdGl2ZSwgRGlyZWN0aXZlUmVzdWx0LCBQYXJ0SW5mb30gZnJvbSAnLi9kaXJlY3RpdmUuanMnO1xuaW1wb3J0IHR5cGUge1RydXN0ZWRIVE1MLCBUcnVzdGVkVHlwZXNXaW5kb3d9IGZyb20gJ3RydXN0ZWQtdHlwZXMvbGliL2luZGV4LmpzJztcblxuY29uc3QgREVWX01PREUgPSB0cnVlO1xuY29uc3QgRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTID0gdHJ1ZTtcbmNvbnN0IEVOQUJMRV9TSEFEWURPTV9OT1BBVENIID0gdHJ1ZTtcbmNvbnN0IE5PREVfTU9ERSA9IGZhbHNlO1xuXG4vLyBBbGxvd3MgbWluaWZpZXJzIHRvIHJlbmFtZSByZWZlcmVuY2VzIHRvIGdsb2JhbFRoaXNcbmNvbnN0IGdsb2JhbCA9IGdsb2JhbFRoaXM7XG5cbi8qKlxuICogQ29udGFpbnMgdHlwZXMgdGhhdCBhcmUgcGFydCBvZiB0aGUgdW5zdGFibGUgZGVidWcgQVBJLlxuICpcbiAqIEV2ZXJ5dGhpbmcgaW4gdGhpcyBBUEkgaXMgbm90IHN0YWJsZSBhbmQgbWF5IGNoYW5nZSBvciBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsXG4gKiBldmVuIG9uIHBhdGNoIHJlbGVhc2VzLlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuZXhwb3J0IG5hbWVzcGFjZSBMaXRVbnN0YWJsZSB7XG4gIC8qKlxuICAgKiBXaGVuIExpdCBpcyBydW5uaW5nIGluIGRldiBtb2RlIGFuZCBgd2luZG93LmVtaXRMaXREZWJ1Z0xvZ0V2ZW50c2AgaXMgdHJ1ZSxcbiAgICogd2Ugd2lsbCBlbWl0ICdsaXQtZGVidWcnIGV2ZW50cyB0byB3aW5kb3csIHdpdGggbGl2ZSBkZXRhaWxzIGFib3V0IHRoZSB1cGRhdGUgYW5kIHJlbmRlclxuICAgKiBsaWZlY3ljbGUuIFRoZXNlIGNhbiBiZSB1c2VmdWwgZm9yIHdyaXRpbmcgZGVidWcgdG9vbGluZyBhbmQgdmlzdWFsaXphdGlvbnMuXG4gICAqXG4gICAqIFBsZWFzZSBiZSBhd2FyZSB0aGF0IHJ1bm5pbmcgd2l0aCB3aW5kb3cuZW1pdExpdERlYnVnTG9nRXZlbnRzIGhhcyBwZXJmb3JtYW5jZSBvdmVyaGVhZCxcbiAgICogbWFraW5nIGNlcnRhaW4gb3BlcmF0aW9ucyB0aGF0IGFyZSBub3JtYWxseSB2ZXJ5IGNoZWFwIChsaWtlIGEgbm8tb3AgcmVuZGVyKSBtdWNoIHNsb3dlcixcbiAgICogYmVjYXVzZSB3ZSBtdXN0IGNvcHkgZGF0YSBhbmQgZGlzcGF0Y2ggZXZlbnRzLlxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbiAgZXhwb3J0IG5hbWVzcGFjZSBEZWJ1Z0xvZyB7XG4gICAgZXhwb3J0IHR5cGUgRW50cnkgPVxuICAgICAgfCBUZW1wbGF0ZVByZXBcbiAgICAgIHwgVGVtcGxhdGVJbnN0YW50aWF0ZWRcbiAgICAgIHwgVGVtcGxhdGVJbnN0YW50aWF0ZWRBbmRVcGRhdGVkXG4gICAgICB8IFRlbXBsYXRlVXBkYXRpbmdcbiAgICAgIHwgQmVnaW5SZW5kZXJcbiAgICAgIHwgRW5kUmVuZGVyXG4gICAgICB8IENvbW1pdFBhcnRFbnRyeVxuICAgICAgfCBTZXRQYXJ0VmFsdWU7XG4gICAgZXhwb3J0IGludGVyZmFjZSBUZW1wbGF0ZVByZXAge1xuICAgICAga2luZDogJ3RlbXBsYXRlIHByZXAnO1xuICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlO1xuICAgICAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXk7XG4gICAgICBjbG9uYWJsZVRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgICAgcGFydHM6IFRlbXBsYXRlUGFydFtdO1xuICAgIH1cbiAgICBleHBvcnQgaW50ZXJmYWNlIEJlZ2luUmVuZGVyIHtcbiAgICAgIGtpbmQ6ICdiZWdpbiByZW5kZXInO1xuICAgICAgaWQ6IG51bWJlcjtcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgY29udGFpbmVyOiBSZW5kZXJSb290Tm9kZTtcbiAgICAgIG9wdGlvbnM6IFJlbmRlck9wdGlvbnMgfCB1bmRlZmluZWQ7XG4gICAgICBwYXJ0OiBDaGlsZFBhcnQgfCB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGV4cG9ydCBpbnRlcmZhY2UgRW5kUmVuZGVyIHtcbiAgICAgIGtpbmQ6ICdlbmQgcmVuZGVyJztcbiAgICAgIGlkOiBudW1iZXI7XG4gICAgICB2YWx1ZTogdW5rbm93bjtcbiAgICAgIGNvbnRhaW5lcjogUmVuZGVyUm9vdE5vZGU7XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgICAgcGFydDogQ2hpbGRQYXJ0O1xuICAgIH1cbiAgICBleHBvcnQgaW50ZXJmYWNlIFRlbXBsYXRlSW5zdGFudGlhdGVkIHtcbiAgICAgIGtpbmQ6ICd0ZW1wbGF0ZSBpbnN0YW50aWF0ZWQnO1xuICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlIHwgQ29tcGlsZWRUZW1wbGF0ZTtcbiAgICAgIGluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAgIGZyYWdtZW50OiBOb2RlO1xuICAgICAgcGFydHM6IEFycmF5PFBhcnQgfCB1bmRlZmluZWQ+O1xuICAgICAgdmFsdWVzOiB1bmtub3duW107XG4gICAgfVxuICAgIGV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVJbnN0YW50aWF0ZWRBbmRVcGRhdGVkIHtcbiAgICAgIGtpbmQ6ICd0ZW1wbGF0ZSBpbnN0YW50aWF0ZWQgYW5kIHVwZGF0ZWQnO1xuICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlIHwgQ29tcGlsZWRUZW1wbGF0ZTtcbiAgICAgIGluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAgIGZyYWdtZW50OiBOb2RlO1xuICAgICAgcGFydHM6IEFycmF5PFBhcnQgfCB1bmRlZmluZWQ+O1xuICAgICAgdmFsdWVzOiB1bmtub3duW107XG4gICAgfVxuICAgIGV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVVcGRhdGluZyB7XG4gICAgICBraW5kOiAndGVtcGxhdGUgdXBkYXRpbmcnO1xuICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlIHwgQ29tcGlsZWRUZW1wbGF0ZTtcbiAgICAgIGluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAgIHBhcnRzOiBBcnJheTxQYXJ0IHwgdW5kZWZpbmVkPjtcbiAgICAgIHZhbHVlczogdW5rbm93bltdO1xuICAgIH1cbiAgICBleHBvcnQgaW50ZXJmYWNlIFNldFBhcnRWYWx1ZSB7XG4gICAgICBraW5kOiAnc2V0IHBhcnQnO1xuICAgICAgcGFydDogUGFydDtcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgdmFsdWVJbmRleDogbnVtYmVyO1xuICAgICAgdmFsdWVzOiB1bmtub3duW107XG4gICAgICB0ZW1wbGF0ZUluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlO1xuICAgIH1cblxuICAgIGV4cG9ydCB0eXBlIENvbW1pdFBhcnRFbnRyeSA9XG4gICAgICB8IENvbW1pdE5vdGhpbmdUb0NoaWxkRW50cnlcbiAgICAgIHwgQ29tbWl0VGV4dFxuICAgICAgfCBDb21taXROb2RlXG4gICAgICB8IENvbW1pdEF0dHJpYnV0ZVxuICAgICAgfCBDb21taXRQcm9wZXJ0eVxuICAgICAgfCBDb21taXRCb29sZWFuQXR0cmlidXRlXG4gICAgICB8IENvbW1pdEV2ZW50TGlzdGVuZXJcbiAgICAgIHwgQ29tbWl0VG9FbGVtZW50QmluZGluZztcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0Tm90aGluZ1RvQ2hpbGRFbnRyeSB7XG4gICAgICBraW5kOiAnY29tbWl0IG5vdGhpbmcgdG8gY2hpbGQnO1xuICAgICAgc3RhcnQ6IENoaWxkTm9kZTtcbiAgICAgIGVuZDogQ2hpbGROb2RlIHwgbnVsbDtcbiAgICAgIHBhcmVudDogRGlzY29ubmVjdGFibGUgfCB1bmRlZmluZWQ7XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0VGV4dCB7XG4gICAgICBraW5kOiAnY29tbWl0IHRleHQnO1xuICAgICAgbm9kZTogVGV4dDtcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIENvbW1pdE5vZGUge1xuICAgICAga2luZDogJ2NvbW1pdCBub2RlJztcbiAgICAgIHN0YXJ0OiBOb2RlO1xuICAgICAgcGFyZW50OiBEaXNjb25uZWN0YWJsZSB8IHVuZGVmaW5lZDtcbiAgICAgIHZhbHVlOiBOb2RlO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIENvbW1pdEF0dHJpYnV0ZSB7XG4gICAgICBraW5kOiAnY29tbWl0IGF0dHJpYnV0ZSc7XG4gICAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgdmFsdWU6IHVua25vd247XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0UHJvcGVydHkge1xuICAgICAga2luZDogJ2NvbW1pdCBwcm9wZXJ0eSc7XG4gICAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgdmFsdWU6IHVua25vd247XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0Qm9vbGVhbkF0dHJpYnV0ZSB7XG4gICAgICBraW5kOiAnY29tbWl0IGJvb2xlYW4gYXR0cmlidXRlJztcbiAgICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICB2YWx1ZTogYm9vbGVhbjtcbiAgICAgIG9wdGlvbnM6IFJlbmRlck9wdGlvbnMgfCB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBDb21taXRFdmVudExpc3RlbmVyIHtcbiAgICAgIGtpbmQ6ICdjb21taXQgZXZlbnQgbGlzdGVuZXInO1xuICAgICAgZWxlbWVudDogRWxlbWVudDtcbiAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgb2xkTGlzdGVuZXI6IHVua25vd247XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgICAgLy8gVHJ1ZSBpZiB3ZSdyZSByZW1vdmluZyB0aGUgb2xkIGV2ZW50IGxpc3RlbmVyIChlLmcuIGJlY2F1c2Ugc2V0dGluZ3MgY2hhbmdlZCwgb3IgdmFsdWUgaXMgbm90aGluZylcbiAgICAgIHJlbW92ZUxpc3RlbmVyOiBib29sZWFuO1xuICAgICAgLy8gVHJ1ZSBpZiB3ZSdyZSBhZGRpbmcgYSBuZXcgZXZlbnQgbGlzdGVuZXIgKGUuZy4gYmVjYXVzZSBmaXJzdCByZW5kZXIsIG9yIHNldHRpbmdzIGNoYW5nZWQpXG4gICAgICBhZGRMaXN0ZW5lcjogYm9vbGVhbjtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIENvbW1pdFRvRWxlbWVudEJpbmRpbmcge1xuICAgICAga2luZDogJ2NvbW1pdCB0byBlbGVtZW50IGJpbmRpbmcnO1xuICAgICAgZWxlbWVudDogRWxlbWVudDtcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlYnVnTG9nZ2luZ1dpbmRvdyB7XG4gIC8vIEV2ZW4gaW4gZGV2IG1vZGUsIHdlIGdlbmVyYWxseSBkb24ndCB3YW50IHRvIGVtaXQgdGhlc2UgZXZlbnRzLCBhcyB0aGF0J3NcbiAgLy8gYW5vdGhlciBsZXZlbCBvZiBjb3N0LCBzbyBvbmx5IGVtaXQgdGhlbSB3aGVuIERFVl9NT0RFIGlzIHRydWUgX2FuZF8gd2hlblxuICAvLyB3aW5kb3cuZW1pdExpdERlYnVnRXZlbnRzIGlzIHRydWUuXG4gIGVtaXRMaXREZWJ1Z0xvZ0V2ZW50cz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogVXNlZnVsIGZvciB2aXN1YWxpemluZyBhbmQgbG9nZ2luZyBpbnNpZ2h0cyBpbnRvIHdoYXQgdGhlIExpdCB0ZW1wbGF0ZSBzeXN0ZW0gaXMgZG9pbmcuXG4gKlxuICogQ29tcGlsZWQgb3V0IG9mIHByb2QgbW9kZSBidWlsZHMuXG4gKi9cbmNvbnN0IGRlYnVnTG9nRXZlbnQgPSBERVZfTU9ERVxuICA/IChldmVudDogTGl0VW5zdGFibGUuRGVidWdMb2cuRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHNob3VsZEVtaXQgPSAoZ2xvYmFsIGFzIHVua25vd24gYXMgRGVidWdMb2dnaW5nV2luZG93KVxuICAgICAgICAuZW1pdExpdERlYnVnTG9nRXZlbnRzO1xuICAgICAgaWYgKCFzaG91bGRFbWl0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGdsb2JhbC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQ8TGl0VW5zdGFibGUuRGVidWdMb2cuRW50cnk+KCdsaXQtZGVidWcnLCB7XG4gICAgICAgICAgZGV0YWlsOiBldmVudCxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICA6IHVuZGVmaW5lZDtcbi8vIFVzZWQgZm9yIGNvbm5lY3RpbmcgYmVnaW5SZW5kZXIgYW5kIGVuZFJlbmRlciBldmVudHMgd2hlbiB0aGVyZSBhcmUgbmVzdGVkXG4vLyByZW5kZXJzIHdoZW4gZXJyb3JzIGFyZSB0aHJvd24gcHJldmVudGluZyBhbiBlbmRSZW5kZXIgZXZlbnQgZnJvbSBiZWluZ1xuLy8gY2FsbGVkLlxubGV0IGRlYnVnTG9nUmVuZGVySWQgPSAwO1xuXG5sZXQgaXNzdWVXYXJuaW5nOiAoY29kZTogc3RyaW5nLCB3YXJuaW5nOiBzdHJpbmcpID0+IHZvaWQ7XG5cbmlmIChERVZfTU9ERSkge1xuICBnbG9iYWwubGl0SXNzdWVkV2FybmluZ3MgPz89IG5ldyBTZXQoKTtcblxuICAvKipcbiAgICogSXNzdWUgYSB3YXJuaW5nIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgYmFzZWQgZWl0aGVyIG9uIGBjb2RlYCBvciBgd2FybmluZ2AuXG4gICAqIFdhcm5pbmdzIGFyZSBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5IG9ubHkgYnkgYHdhcm5pbmdgOyBkaXNhYmxpbmcgdmlhIGBjb2RlYFxuICAgKiBjYW4gYmUgZG9uZSBieSB1c2Vycy5cbiAgICovXG4gIGlzc3VlV2FybmluZyA9IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4ge1xuICAgIHdhcm5pbmcgKz0gY29kZVxuICAgICAgPyBgIFNlZSBodHRwczovL2xpdC5kZXYvbXNnLyR7Y29kZX0gZm9yIG1vcmUgaW5mb3JtYXRpb24uYFxuICAgICAgOiAnJztcbiAgICBpZiAoXG4gICAgICAhZ2xvYmFsLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMod2FybmluZykgJiZcbiAgICAgICFnbG9iYWwubGl0SXNzdWVkV2FybmluZ3MhLmhhcyhjb2RlKVxuICAgICkge1xuICAgICAgY29uc29sZS53YXJuKHdhcm5pbmcpO1xuICAgICAgZ2xvYmFsLmxpdElzc3VlZFdhcm5pbmdzIS5hZGQod2FybmluZyk7XG4gICAgfVxuICB9O1xuXG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAnZGV2LW1vZGUnLFxuICAgICAgYExpdCBpcyBpbiBkZXYgbW9kZS4gTm90IHJlY29tbWVuZGVkIGZvciBwcm9kdWN0aW9uIWBcbiAgICApO1xuICB9KTtcbn1cblxuY29uc3Qgd3JhcCA9XG4gIEVOQUJMRV9TSEFEWURPTV9OT1BBVENIICYmXG4gIGdsb2JhbC5TaGFkeURPTT8uaW5Vc2UgJiZcbiAgZ2xvYmFsLlNoYWR5RE9NPy5ub1BhdGNoID09PSB0cnVlXG4gICAgPyAoZ2xvYmFsLlNoYWR5RE9NIS53cmFwIGFzIDxUIGV4dGVuZHMgTm9kZT4obm9kZTogVCkgPT4gVClcbiAgICA6IDxUIGV4dGVuZHMgTm9kZT4obm9kZTogVCkgPT4gbm9kZTtcblxuY29uc3QgdHJ1c3RlZFR5cGVzID0gKGdsb2JhbCBhcyB1bmtub3duIGFzIFRydXN0ZWRUeXBlc1dpbmRvdykudHJ1c3RlZFR5cGVzO1xuXG4vKipcbiAqIE91ciBUcnVzdGVkVHlwZVBvbGljeSBmb3IgSFRNTCB3aGljaCBpcyBkZWNsYXJlZCB1c2luZyB0aGUgaHRtbCB0ZW1wbGF0ZVxuICogdGFnIGZ1bmN0aW9uLlxuICpcbiAqIFRoYXQgSFRNTCBpcyBhIGRldmVsb3Blci1hdXRob3JlZCBjb25zdGFudCwgYW5kIGlzIHBhcnNlZCB3aXRoIGlubmVySFRNTFxuICogYmVmb3JlIGFueSB1bnRydXN0ZWQgZXhwcmVzc2lvbnMgaGF2ZSBiZWVuIG1peGVkIGluLiBUaGVyZWZvciBpdCBpc1xuICogY29uc2lkZXJlZCBzYWZlIGJ5IGNvbnN0cnVjdGlvbi5cbiAqL1xuY29uc3QgcG9saWN5ID0gdHJ1c3RlZFR5cGVzXG4gID8gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSgnbGl0LWh0bWwnLCB7XG4gICAgICBjcmVhdGVIVE1MOiAocykgPT4gcyxcbiAgICB9KVxuICA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBVc2VkIHRvIHNhbml0aXplIGFueSB2YWx1ZSBiZWZvcmUgaXQgaXMgd3JpdHRlbiBpbnRvIHRoZSBET00uIFRoaXMgY2FuIGJlXG4gKiB1c2VkIHRvIGltcGxlbWVudCBhIHNlY3VyaXR5IHBvbGljeSBvZiBhbGxvd2VkIGFuZCBkaXNhbGxvd2VkIHZhbHVlcyBpblxuICogb3JkZXIgdG8gcHJldmVudCBYU1MgYXR0YWNrcy5cbiAqXG4gKiBPbmUgd2F5IG9mIHVzaW5nIHRoaXMgY2FsbGJhY2sgd291bGQgYmUgdG8gY2hlY2sgYXR0cmlidXRlcyBhbmQgcHJvcGVydGllc1xuICogYWdhaW5zdCBhIGxpc3Qgb2YgaGlnaCByaXNrIGZpZWxkcywgYW5kIHJlcXVpcmUgdGhhdCB2YWx1ZXMgd3JpdHRlbiB0byBzdWNoXG4gKiBmaWVsZHMgYmUgaW5zdGFuY2VzIG9mIGEgY2xhc3Mgd2hpY2ggaXMgc2FmZSBieSBjb25zdHJ1Y3Rpb24uIENsb3N1cmUncyBTYWZlXG4gKiBIVE1MIFR5cGVzIGlzIG9uZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIHRlY2huaXF1ZSAoXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL3NhZmUtaHRtbC10eXBlcy9ibG9iL21hc3Rlci9kb2Mvc2FmZWh0bWwtdHlwZXMubWQpLlxuICogVGhlIFRydXN0ZWRUeXBlcyBwb2x5ZmlsbCBpbiBBUEktb25seSBtb2RlIGNvdWxkIGFsc28gYmUgdXNlZCBhcyBhIGJhc2lzXG4gKiBmb3IgdGhpcyB0ZWNobmlxdWUgKGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL3RydXN0ZWQtdHlwZXMpLlxuICpcbiAqIEBwYXJhbSBub2RlIFRoZSBIVE1MIG5vZGUgKHVzdWFsbHkgZWl0aGVyIGEgI3RleHQgbm9kZSBvciBhbiBFbGVtZW50KSB0aGF0XG4gKiAgICAgaXMgYmVpbmcgd3JpdHRlbiB0by4gTm90ZSB0aGF0IHRoaXMgaXMganVzdCBhbiBleGVtcGxhciBub2RlLCB0aGUgd3JpdGVcbiAqICAgICBtYXkgdGFrZSBwbGFjZSBhZ2FpbnN0IGFub3RoZXIgaW5zdGFuY2Ugb2YgdGhlIHNhbWUgY2xhc3Mgb2Ygbm9kZS5cbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIGFuIGF0dHJpYnV0ZSBvciBwcm9wZXJ0eSAoZm9yIGV4YW1wbGUsICdocmVmJykuXG4gKiBAcGFyYW0gdHlwZSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgd3JpdGUgdGhhdCdzIGFib3V0IHRvIGJlIHBlcmZvcm1lZCB3aWxsXG4gKiAgICAgYmUgdG8gYSBwcm9wZXJ0eSBvciBhIG5vZGUuXG4gKiBAcmV0dXJuIEEgZnVuY3Rpb24gdGhhdCB3aWxsIHNhbml0aXplIHRoaXMgY2xhc3Mgb2Ygd3JpdGVzLlxuICovXG5leHBvcnQgdHlwZSBTYW5pdGl6ZXJGYWN0b3J5ID0gKFxuICBub2RlOiBOb2RlLFxuICBuYW1lOiBzdHJpbmcsXG4gIHR5cGU6ICdwcm9wZXJ0eScgfCAnYXR0cmlidXRlJ1xuKSA9PiBWYWx1ZVNhbml0aXplcjtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIGNhbiBzYW5pdGl6ZSB2YWx1ZXMgdGhhdCB3aWxsIGJlIHdyaXR0ZW4gdG8gYSBzcGVjaWZpYyBraW5kXG4gKiBvZiBET00gc2luay5cbiAqXG4gKiBTZWUgU2FuaXRpemVyRmFjdG9yeS5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHNhbml0aXplLiBXaWxsIGJlIHRoZSBhY3R1YWwgdmFsdWUgcGFzc2VkIGludG9cbiAqICAgICB0aGUgbGl0LWh0bWwgdGVtcGxhdGUgbGl0ZXJhbCwgc28gdGhpcyBjb3VsZCBiZSBvZiBhbnkgdHlwZS5cbiAqIEByZXR1cm4gVGhlIHZhbHVlIHRvIHdyaXRlIHRvIHRoZSBET00uIFVzdWFsbHkgdGhlIHNhbWUgYXMgdGhlIGlucHV0IHZhbHVlLFxuICogICAgIHVubGVzcyBzYW5pdGl6YXRpb24gaXMgbmVlZGVkLlxuICovXG5leHBvcnQgdHlwZSBWYWx1ZVNhbml0aXplciA9ICh2YWx1ZTogdW5rbm93bikgPT4gdW5rbm93bjtcblxuY29uc3QgaWRlbnRpdHlGdW5jdGlvbjogVmFsdWVTYW5pdGl6ZXIgPSAodmFsdWU6IHVua25vd24pID0+IHZhbHVlO1xuY29uc3Qgbm9vcFNhbml0aXplcjogU2FuaXRpemVyRmFjdG9yeSA9IChcbiAgX25vZGU6IE5vZGUsXG4gIF9uYW1lOiBzdHJpbmcsXG4gIF90eXBlOiAncHJvcGVydHknIHwgJ2F0dHJpYnV0ZSdcbikgPT4gaWRlbnRpdHlGdW5jdGlvbjtcblxuLyoqIFNldHMgdGhlIGdsb2JhbCBzYW5pdGl6ZXIgZmFjdG9yeS4gKi9cbmNvbnN0IHNldFNhbml0aXplciA9IChuZXdTYW5pdGl6ZXI6IFNhbml0aXplckZhY3RvcnkpID0+IHtcbiAgaWYgKCFFTkFCTEVfRVhUUkFfU0VDVVJJVFlfSE9PS1MpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHNhbml0aXplckZhY3RvcnlJbnRlcm5hbCAhPT0gbm9vcFNhbml0aXplcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBBdHRlbXB0ZWQgdG8gb3ZlcndyaXRlIGV4aXN0aW5nIGxpdC1odG1sIHNlY3VyaXR5IHBvbGljeS5gICtcbiAgICAgICAgYCBzZXRTYW5pdGl6ZURPTVZhbHVlRmFjdG9yeSBzaG91bGQgYmUgY2FsbGVkIGF0IG1vc3Qgb25jZS5gXG4gICAgKTtcbiAgfVxuICBzYW5pdGl6ZXJGYWN0b3J5SW50ZXJuYWwgPSBuZXdTYW5pdGl6ZXI7XG59O1xuXG4vKipcbiAqIE9ubHkgdXNlZCBpbiBpbnRlcm5hbCB0ZXN0cywgbm90IGEgcGFydCBvZiB0aGUgcHVibGljIEFQSS5cbiAqL1xuY29uc3QgX3Rlc3RPbmx5Q2xlYXJTYW5pdGl6ZXJGYWN0b3J5RG9Ob3RDYWxsT3JFbHNlID0gKCkgPT4ge1xuICBzYW5pdGl6ZXJGYWN0b3J5SW50ZXJuYWwgPSBub29wU2FuaXRpemVyO1xufTtcblxuY29uc3QgY3JlYXRlU2FuaXRpemVyOiBTYW5pdGl6ZXJGYWN0b3J5ID0gKG5vZGUsIG5hbWUsIHR5cGUpID0+IHtcbiAgcmV0dXJuIHNhbml0aXplckZhY3RvcnlJbnRlcm5hbChub2RlLCBuYW1lLCB0eXBlKTtcbn07XG5cbi8vIEFkZGVkIHRvIGFuIGF0dHJpYnV0ZSBuYW1lIHRvIG1hcmsgdGhlIGF0dHJpYnV0ZSBhcyBib3VuZCBzbyB3ZSBjYW4gZmluZFxuLy8gaXQgZWFzaWx5LlxuY29uc3QgYm91bmRBdHRyaWJ1dGVTdWZmaXggPSAnJGxpdCQnO1xuXG4vLyBUaGlzIG1hcmtlciBpcyB1c2VkIGluIG1hbnkgc3ludGFjdGljIHBvc2l0aW9ucyBpbiBIVE1MLCBzbyBpdCBtdXN0IGJlXG4vLyBhIHZhbGlkIGVsZW1lbnQgbmFtZSBhbmQgYXR0cmlidXRlIG5hbWUuIFdlIGRvbid0IHN1cHBvcnQgZHluYW1pYyBuYW1lcyAoeWV0KVxuLy8gYnV0IHRoaXMgYXQgbGVhc3QgZW5zdXJlcyB0aGF0IHRoZSBwYXJzZSB0cmVlIGlzIGNsb3NlciB0byB0aGUgdGVtcGxhdGVcbi8vIGludGVudGlvbi5cbmNvbnN0IG1hcmtlciA9IGBsaXQkJHtNYXRoLnJhbmRvbSgpLnRvRml4ZWQoOSkuc2xpY2UoMil9JGA7XG5cbi8vIFN0cmluZyB1c2VkIHRvIHRlbGwgaWYgYSBjb21tZW50IGlzIGEgbWFya2VyIGNvbW1lbnRcbmNvbnN0IG1hcmtlck1hdGNoID0gJz8nICsgbWFya2VyO1xuXG4vLyBUZXh0IHVzZWQgdG8gaW5zZXJ0IGEgY29tbWVudCBtYXJrZXIgbm9kZS4gV2UgdXNlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb25cbi8vIHN5bnRheCBiZWNhdXNlIGl0J3Mgc2xpZ2h0bHkgc21hbGxlciwgYnV0IHBhcnNlcyBhcyBhIGNvbW1lbnQgbm9kZS5cbmNvbnN0IG5vZGVNYXJrZXIgPSBgPCR7bWFya2VyTWF0Y2h9PmA7XG5cbmNvbnN0IGQgPVxuICBOT0RFX01PREUgJiYgZ2xvYmFsLmRvY3VtZW50ID09PSB1bmRlZmluZWRcbiAgICA/ICh7XG4gICAgICAgIGNyZWF0ZVRyZWVXYWxrZXIoKSB7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9LFxuICAgICAgfSBhcyB1bmtub3duIGFzIERvY3VtZW50KVxuICAgIDogZG9jdW1lbnQ7XG5cbi8vIENyZWF0ZXMgYSBkeW5hbWljIG1hcmtlci4gV2UgbmV2ZXIgaGF2ZSB0byBzZWFyY2ggZm9yIHRoZXNlIGluIHRoZSBET00uXG5jb25zdCBjcmVhdGVNYXJrZXIgPSAoKSA9PiBkLmNyZWF0ZUNvbW1lbnQoJycpO1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10eXBlb2Ytb3BlcmF0b3JcbnR5cGUgUHJpbWl0aXZlID0gbnVsbCB8IHVuZGVmaW5lZCB8IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfCBzeW1ib2wgfCBiaWdpbnQ7XG5jb25zdCBpc1ByaW1pdGl2ZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFByaW1pdGl2ZSA9PlxuICB2YWx1ZSA9PT0gbnVsbCB8fCAodHlwZW9mIHZhbHVlICE9ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSAhPSAnZnVuY3Rpb24nKTtcbmNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuY29uc3QgaXNJdGVyYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIEl0ZXJhYmxlPHVua25vd24+ID0+XG4gIGlzQXJyYXkodmFsdWUpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHR5cGVvZiAodmFsdWUgYXMgYW55KT8uW1N5bWJvbC5pdGVyYXRvcl0gPT09ICdmdW5jdGlvbic7XG5cbmNvbnN0IFNQQUNFX0NIQVIgPSBgWyBcXHRcXG5cXGZcXHJdYDtcbmNvbnN0IEFUVFJfVkFMVUVfQ0hBUiA9IGBbXiBcXHRcXG5cXGZcXHJcIidcXGA8Pj1dYDtcbmNvbnN0IE5BTUVfQ0hBUiA9IGBbXlxcXFxzXCInPj0vXWA7XG5cbi8vIFRoZXNlIHJlZ2V4ZXMgcmVwcmVzZW50IHRoZSBmaXZlIHBhcnNpbmcgc3RhdGVzIHRoYXQgd2UgY2FyZSBhYm91dCBpbiB0aGVcbi8vIFRlbXBsYXRlJ3MgSFRNTCBzY2FubmVyLiBUaGV5IG1hdGNoIHRoZSAqZW5kKiBvZiB0aGUgc3RhdGUgdGhleSdyZSBuYW1lZFxuLy8gYWZ0ZXIuXG4vLyBEZXBlbmRpbmcgb24gdGhlIG1hdGNoLCB3ZSB0cmFuc2l0aW9uIHRvIGEgbmV3IHN0YXRlLiBJZiB0aGVyZSdzIG5vIG1hdGNoLFxuLy8gd2Ugc3RheSBpbiB0aGUgc2FtZSBzdGF0ZS5cbi8vIE5vdGUgdGhhdCB0aGUgcmVnZXhlcyBhcmUgc3RhdGVmdWwuIFdlIHV0aWxpemUgbGFzdEluZGV4IGFuZCBzeW5jIGl0XG4vLyBhY3Jvc3MgdGhlIG11bHRpcGxlIHJlZ2V4ZXMgdXNlZC4gSW4gYWRkaXRpb24gdG8gdGhlIGZpdmUgcmVnZXhlcyBiZWxvd1xuLy8gd2UgYWxzbyBkeW5hbWljYWxseSBjcmVhdGUgYSByZWdleCB0byBmaW5kIHRoZSBtYXRjaGluZyBlbmQgdGFncyBmb3IgcmF3XG4vLyB0ZXh0IGVsZW1lbnRzLlxuXG4vKipcbiAqIEVuZCBvZiB0ZXh0IGlzOiBgPGAgZm9sbG93ZWQgYnk6XG4gKiAgIChjb21tZW50IHN0YXJ0KSBvciAodGFnKSBvciAoZHluYW1pYyB0YWcgYmluZGluZylcbiAqL1xuY29uc3QgdGV4dEVuZFJlZ2V4ID0gLzwoPzooIS0tfFxcL1teYS16QS1aXSl8KFxcLz9bYS16QS1aXVtePlxcc10qKXwoXFwvPyQpKS9nO1xuY29uc3QgQ09NTUVOVF9TVEFSVCA9IDE7XG5jb25zdCBUQUdfTkFNRSA9IDI7XG5jb25zdCBEWU5BTUlDX1RBR19OQU1FID0gMztcblxuY29uc3QgY29tbWVudEVuZFJlZ2V4ID0gLy0tPi9nO1xuLyoqXG4gKiBDb21tZW50cyBub3Qgc3RhcnRlZCB3aXRoIDwhLS0sIGxpa2UgPC97LCBjYW4gYmUgZW5kZWQgYnkgYSBzaW5nbGUgYD5gXG4gKi9cbmNvbnN0IGNvbW1lbnQyRW5kUmVnZXggPSAvPi9nO1xuXG4vKipcbiAqIFRoZSB0YWdFbmQgcmVnZXggbWF0Y2hlcyB0aGUgZW5kIG9mIHRoZSBcImluc2lkZSBhbiBvcGVuaW5nXCIgdGFnIHN5bnRheFxuICogcG9zaXRpb24uIEl0IGVpdGhlciBtYXRjaGVzIGEgYD5gLCBhbiBhdHRyaWJ1dGUtbGlrZSBzZXF1ZW5jZSwgb3IgdGhlIGVuZFxuICogb2YgdGhlIHN0cmluZyBhZnRlciBhIHNwYWNlIChhdHRyaWJ1dGUtbmFtZSBwb3NpdGlvbiBlbmRpbmcpLlxuICpcbiAqIFNlZSBhdHRyaWJ1dGVzIGluIHRoZSBIVE1MIHNwZWM6XG4gKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjZWxlbWVudHMtYXR0cmlidXRlc1xuICpcbiAqIFwiIFxcdFxcblxcZlxcclwiIGFyZSBIVE1MIHNwYWNlIGNoYXJhY3RlcnM6XG4gKiBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jYXNjaWktd2hpdGVzcGFjZVxuICpcbiAqIFNvIGFuIGF0dHJpYnV0ZSBpczpcbiAqICAqIFRoZSBuYW1lOiBhbnkgY2hhcmFjdGVyIGV4Y2VwdCBhIHdoaXRlc3BhY2UgY2hhcmFjdGVyLCAoXCIpLCAoJyksIFwiPlwiLFxuICogICAgXCI9XCIsIG9yIFwiL1wiLiBOb3RlOiB0aGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBIVE1MIHNwZWMgd2hpY2ggYWxzbyBleGNsdWRlcyBjb250cm9sIGNoYXJhY3RlcnMuXG4gKiAgKiBGb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgc3BhY2UgY2hhcmFjdGVyc1xuICogICogRm9sbG93ZWQgYnkgXCI9XCJcbiAqICAqIEZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBzcGFjZSBjaGFyYWN0ZXJzXG4gKiAgKiBGb2xsb3dlZCBieTpcbiAqICAgICogQW55IGNoYXJhY3RlciBleGNlcHQgc3BhY2UsICgnKSwgKFwiKSwgXCI8XCIsIFwiPlwiLCBcIj1cIiwgKGApLCBvclxuICogICAgKiAoXCIpIHRoZW4gYW55IG5vbi0oXCIpLCBvclxuICogICAgKiAoJykgdGhlbiBhbnkgbm9uLSgnKVxuICovXG5jb25zdCB0YWdFbmRSZWdleCA9IG5ldyBSZWdFeHAoXG4gIGA+fCR7U1BBQ0VfQ0hBUn0oPzooJHtOQU1FX0NIQVJ9KykoJHtTUEFDRV9DSEFSfSo9JHtTUEFDRV9DSEFSfSooPzoke0FUVFJfVkFMVUVfQ0hBUn18KFwifCcpfCkpfCQpYCxcbiAgJ2cnXG4pO1xuY29uc3QgRU5USVJFX01BVENIID0gMDtcbmNvbnN0IEFUVFJJQlVURV9OQU1FID0gMTtcbmNvbnN0IFNQQUNFU19BTkRfRVFVQUxTID0gMjtcbmNvbnN0IFFVT1RFX0NIQVIgPSAzO1xuXG5jb25zdCBzaW5nbGVRdW90ZUF0dHJFbmRSZWdleCA9IC8nL2c7XG5jb25zdCBkb3VibGVRdW90ZUF0dHJFbmRSZWdleCA9IC9cIi9nO1xuLyoqXG4gKiBNYXRjaGVzIHRoZSByYXcgdGV4dCBlbGVtZW50cy5cbiAqXG4gKiBDb21tZW50cyBhcmUgbm90IHBhcnNlZCB3aXRoaW4gcmF3IHRleHQgZWxlbWVudHMsIHNvIHdlIG5lZWQgdG8gc2VhcmNoIHRoZWlyXG4gKiB0ZXh0IGNvbnRlbnQgZm9yIG1hcmtlciBzdHJpbmdzLlxuICovXG5jb25zdCByYXdUZXh0RWxlbWVudCA9IC9eKD86c2NyaXB0fHN0eWxlfHRleHRhcmVhfHRpdGxlKSQvaTtcblxuLyoqIFRlbXBsYXRlUmVzdWx0IHR5cGVzICovXG5jb25zdCBIVE1MX1JFU1VMVCA9IDE7XG5jb25zdCBTVkdfUkVTVUxUID0gMjtcbmNvbnN0IE1BVEhNTF9SRVNVTFQgPSAzO1xuXG50eXBlIFJlc3VsdFR5cGUgPSB0eXBlb2YgSFRNTF9SRVNVTFQgfCB0eXBlb2YgU1ZHX1JFU1VMVCB8IHR5cGVvZiBNQVRITUxfUkVTVUxUO1xuXG4vLyBUZW1wbGF0ZVBhcnQgdHlwZXNcbi8vIElNUE9SVEFOVDogdGhlc2UgbXVzdCBtYXRjaCB0aGUgdmFsdWVzIGluIFBhcnRUeXBlXG5jb25zdCBBVFRSSUJVVEVfUEFSVCA9IDE7XG5jb25zdCBDSElMRF9QQVJUID0gMjtcbmNvbnN0IFBST1BFUlRZX1BBUlQgPSAzO1xuY29uc3QgQk9PTEVBTl9BVFRSSUJVVEVfUEFSVCA9IDQ7XG5jb25zdCBFVkVOVF9QQVJUID0gNTtcbmNvbnN0IEVMRU1FTlRfUEFSVCA9IDY7XG5jb25zdCBDT01NRU5UX1BBUlQgPSA3O1xuXG4vKipcbiAqIFRoZSByZXR1cm4gdHlwZSBvZiB0aGUgdGVtcGxhdGUgdGFnIGZ1bmN0aW9ucywge0BsaW5rY29kZSBodG1sfSBhbmRcbiAqIHtAbGlua2NvZGUgc3ZnfSB3aGVuIGl0IGhhc24ndCBiZWVuIGNvbXBpbGVkIGJ5IEBsaXQtbGFicy9jb21waWxlci5cbiAqXG4gKiBBIGBUZW1wbGF0ZVJlc3VsdGAgb2JqZWN0IGhvbGRzIGFsbCB0aGUgaW5mb3JtYXRpb24gYWJvdXQgYSB0ZW1wbGF0ZVxuICogZXhwcmVzc2lvbiByZXF1aXJlZCB0byByZW5kZXIgaXQ6IHRoZSB0ZW1wbGF0ZSBzdHJpbmdzLCBleHByZXNzaW9uIHZhbHVlcyxcbiAqIGFuZCB0eXBlIG9mIHRlbXBsYXRlIChodG1sIG9yIHN2ZykuXG4gKlxuICogYFRlbXBsYXRlUmVzdWx0YCBvYmplY3RzIGRvIG5vdCBjcmVhdGUgYW55IERPTSBvbiB0aGVpciBvd24uIFRvIGNyZWF0ZSBvclxuICogdXBkYXRlIERPTSB5b3UgbmVlZCB0byByZW5kZXIgdGhlIGBUZW1wbGF0ZVJlc3VsdGAuIFNlZVxuICogW1JlbmRlcmluZ10oaHR0cHM6Ly9saXQuZGV2L2RvY3MvY29tcG9uZW50cy9yZW5kZXJpbmcpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqL1xuZXhwb3J0IHR5cGUgVW5jb21waWxlZFRlbXBsYXRlUmVzdWx0PFQgZXh0ZW5kcyBSZXN1bHRUeXBlID0gUmVzdWx0VHlwZT4gPSB7XG4gIC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gIFsnXyRsaXRUeXBlJCddOiBUO1xuICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheTtcbiAgdmFsdWVzOiB1bmtub3duW107XG59O1xuXG4vKipcbiAqIFRoaXMgaXMgYSB0ZW1wbGF0ZSByZXN1bHQgdGhhdCBtYXkgYmUgZWl0aGVyIHVuY29tcGlsZWQgb3IgY29tcGlsZWQuXG4gKlxuICogSW4gdGhlIGZ1dHVyZSwgVGVtcGxhdGVSZXN1bHQgd2lsbCBiZSB0aGlzIHR5cGUuIElmIHlvdSB3YW50IHRvIGV4cGxpY2l0bHlcbiAqIG5vdGUgdGhhdCBhIHRlbXBsYXRlIHJlc3VsdCBpcyBwb3RlbnRpYWxseSBjb21waWxlZCwgeW91IGNhbiByZWZlcmVuY2UgdGhpc1xuICogdHlwZSBhbmQgaXQgd2lsbCBjb250aW51ZSB0byBiZWhhdmUgdGhlIHNhbWUgdGhyb3VnaCB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uXG4gKiBvZiBMaXQuIFRoaXMgY2FuIGJlIHVzZWZ1bCBmb3IgY29kZSB0aGF0IHdhbnRzIHRvIHByZXBhcmUgZm9yIHRoZSBuZXh0XG4gKiBtYWpvciB2ZXJzaW9uIG9mIExpdC5cbiAqL1xuZXhwb3J0IHR5cGUgTWF5YmVDb21waWxlZFRlbXBsYXRlUmVzdWx0PFQgZXh0ZW5kcyBSZXN1bHRUeXBlID0gUmVzdWx0VHlwZT4gPVxuICB8IFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdDxUPlxuICB8IENvbXBpbGVkVGVtcGxhdGVSZXN1bHQ7XG5cbi8qKlxuICogVGhlIHJldHVybiB0eXBlIG9mIHRoZSB0ZW1wbGF0ZSB0YWcgZnVuY3Rpb25zLCB7QGxpbmtjb2RlIGh0bWx9IGFuZFxuICoge0BsaW5rY29kZSBzdmd9LlxuICpcbiAqIEEgYFRlbXBsYXRlUmVzdWx0YCBvYmplY3QgaG9sZHMgYWxsIHRoZSBpbmZvcm1hdGlvbiBhYm91dCBhIHRlbXBsYXRlXG4gKiBleHByZXNzaW9uIHJlcXVpcmVkIHRvIHJlbmRlciBpdDogdGhlIHRlbXBsYXRlIHN0cmluZ3MsIGV4cHJlc3Npb24gdmFsdWVzLFxuICogYW5kIHR5cGUgb2YgdGVtcGxhdGUgKGh0bWwgb3Igc3ZnKS5cbiAqXG4gKiBgVGVtcGxhdGVSZXN1bHRgIG9iamVjdHMgZG8gbm90IGNyZWF0ZSBhbnkgRE9NIG9uIHRoZWlyIG93bi4gVG8gY3JlYXRlIG9yXG4gKiB1cGRhdGUgRE9NIHlvdSBuZWVkIHRvIHJlbmRlciB0aGUgYFRlbXBsYXRlUmVzdWx0YC4gU2VlXG4gKiBbUmVuZGVyaW5nXShodHRwczovL2xpdC5kZXYvZG9jcy9jb21wb25lbnRzL3JlbmRlcmluZykgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogSW4gTGl0IDQsIHRoaXMgdHlwZSB3aWxsIGJlIGFuIGFsaWFzIG9mXG4gKiBNYXliZUNvbXBpbGVkVGVtcGxhdGVSZXN1bHQsIHNvIHRoYXQgY29kZSB3aWxsIGdldCB0eXBlIGVycm9ycyBpZiBpdCBhc3N1bWVzXG4gKiB0aGF0IExpdCB0ZW1wbGF0ZXMgYXJlIG5vdCBjb21waWxlZC4gV2hlbiBkZWxpYmVyYXRlbHkgd29ya2luZyB3aXRoIG9ubHlcbiAqIG9uZSwgdXNlIGVpdGhlciB7QGxpbmtjb2RlIENvbXBpbGVkVGVtcGxhdGVSZXN1bHR9IG9yXG4gKiB7QGxpbmtjb2RlIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdH0gZXhwbGljaXRseS5cbiAqL1xuZXhwb3J0IHR5cGUgVGVtcGxhdGVSZXN1bHQ8VCBleHRlbmRzIFJlc3VsdFR5cGUgPSBSZXN1bHRUeXBlPiA9XG4gIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdDxUPjtcblxuZXhwb3J0IHR5cGUgSFRNTFRlbXBsYXRlUmVzdWx0ID0gVGVtcGxhdGVSZXN1bHQ8dHlwZW9mIEhUTUxfUkVTVUxUPjtcblxuZXhwb3J0IHR5cGUgU1ZHVGVtcGxhdGVSZXN1bHQgPSBUZW1wbGF0ZVJlc3VsdDx0eXBlb2YgU1ZHX1JFU1VMVD47XG5cbmV4cG9ydCB0eXBlIE1hdGhNTFRlbXBsYXRlUmVzdWx0ID0gVGVtcGxhdGVSZXN1bHQ8dHlwZW9mIE1BVEhNTF9SRVNVTFQ+O1xuXG4vKipcbiAqIEEgVGVtcGxhdGVSZXN1bHQgdGhhdCBoYXMgYmVlbiBjb21waWxlZCBieSBAbGl0LWxhYnMvY29tcGlsZXIsIHNraXBwaW5nIHRoZVxuICogcHJlcGFyZSBzdGVwLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBpbGVkVGVtcGxhdGVSZXN1bHQge1xuICAvLyBUaGlzIGlzIGEgZmFjdG9yeSBpbiBvcmRlciB0byBtYWtlIHRlbXBsYXRlIGluaXRpYWxpemF0aW9uIGxhenlcbiAgLy8gYW5kIGFsbG93IFNoYWR5UmVuZGVyT3B0aW9ucyBzY29wZSB0byBiZSBwYXNzZWQgaW4uXG4gIC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gIFsnXyRsaXRUeXBlJCddOiBDb21waWxlZFRlbXBsYXRlO1xuICB2YWx1ZXM6IHVua25vd25bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21waWxlZFRlbXBsYXRlIGV4dGVuZHMgT21pdDxUZW1wbGF0ZSwgJ2VsJz4ge1xuICAvLyBlbCBpcyBvdmVycmlkZGVuIHRvIGJlIG9wdGlvbmFsLiBXZSBpbml0aWFsaXplIGl0IG9uIGZpcnN0IHJlbmRlclxuICBlbD86IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgLy8gVGhlIHByZXBhcmVkIEhUTUwgc3RyaW5nIHRvIGNyZWF0ZSBhIHRlbXBsYXRlIGVsZW1lbnQgZnJvbS5cbiAgLy8gVGhlIHR5cGUgaXMgYSBUZW1wbGF0ZVN0cmluZ3NBcnJheSB0byBndWFyYW50ZWUgdGhhdCB0aGUgdmFsdWUgY2FtZSBmcm9tXG4gIC8vIHNvdXJjZSBjb2RlLCBwcmV2ZW50aW5nIGEgSlNPTiBpbmplY3Rpb24gYXR0YWNrLlxuICBoOiBUZW1wbGF0ZVN0cmluZ3NBcnJheTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSB0ZW1wbGF0ZSBsaXRlcmFsIHRhZyBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBUZW1wbGF0ZVJlc3VsdCB3aXRoXG4gKiB0aGUgZ2l2ZW4gcmVzdWx0IHR5cGUuXG4gKi9cbmNvbnN0IHRhZyA9XG4gIDxUIGV4dGVuZHMgUmVzdWx0VHlwZT4odHlwZTogVCkgPT5cbiAgKHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi52YWx1ZXM6IHVua25vd25bXSk6IFRlbXBsYXRlUmVzdWx0PFQ+ID0+IHtcbiAgICAvLyBXYXJuIGFnYWluc3QgdGVtcGxhdGVzIG9jdGFsIGVzY2FwZSBzZXF1ZW5jZXNcbiAgICAvLyBXZSBkbyB0aGlzIGhlcmUgcmF0aGVyIHRoYW4gaW4gcmVuZGVyIHNvIHRoYXQgdGhlIHdhcm5pbmcgaXMgY2xvc2VyIHRvIHRoZVxuICAgIC8vIHRlbXBsYXRlIGRlZmluaXRpb24uXG4gICAgaWYgKERFVl9NT0RFICYmIHN0cmluZ3Muc29tZSgocykgPT4gcyA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnU29tZSB0ZW1wbGF0ZSBzdHJpbmdzIGFyZSB1bmRlZmluZWQuXFxuJyArXG4gICAgICAgICAgJ1RoaXMgaXMgcHJvYmFibHkgY2F1c2VkIGJ5IGlsbGVnYWwgb2N0YWwgZXNjYXBlIHNlcXVlbmNlcy4nXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoREVWX01PREUpIHtcbiAgICAgIC8vIEltcG9ydCBzdGF0aWMtaHRtbC5qcyByZXN1bHRzIGluIGEgY2lyY3VsYXIgZGVwZW5kZW5jeSB3aGljaCBnMyBkb2Vzbid0XG4gICAgICAvLyBoYW5kbGUuIEluc3RlYWQgd2Uga25vdyB0aGF0IHN0YXRpYyB2YWx1ZXMgbXVzdCBoYXZlIHRoZSBmaWVsZFxuICAgICAgLy8gYF8kbGl0U3RhdGljJGAuXG4gICAgICBpZiAoXG4gICAgICAgIHZhbHVlcy5zb21lKCh2YWwpID0+ICh2YWwgYXMge18kbGl0U3RhdGljJDogdW5rbm93bn0pPy5bJ18kbGl0U3RhdGljJCddKVxuICAgICAgKSB7XG4gICAgICAgIGlzc3VlV2FybmluZyhcbiAgICAgICAgICAnJyxcbiAgICAgICAgICBgU3RhdGljIHZhbHVlcyAnbGl0ZXJhbCcgb3IgJ3Vuc2FmZVN0YXRpYycgY2Fubm90IGJlIHVzZWQgYXMgdmFsdWVzIHRvIG5vbi1zdGF0aWMgdGVtcGxhdGVzLlxcbmAgK1xuICAgICAgICAgICAgYFBsZWFzZSB1c2UgdGhlIHN0YXRpYyAnaHRtbCcgdGFnIGZ1bmN0aW9uLiBTZWUgaHR0cHM6Ly9saXQuZGV2L2RvY3MvdGVtcGxhdGVzL2V4cHJlc3Npb25zLyNzdGF0aWMtZXhwcmVzc2lvbnNgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgICAgWydfJGxpdFR5cGUkJ106IHR5cGUsXG4gICAgICBzdHJpbmdzLFxuICAgICAgdmFsdWVzLFxuICAgIH07XG4gIH07XG5cbi8qKlxuICogSW50ZXJwcmV0cyBhIHRlbXBsYXRlIGxpdGVyYWwgYXMgYW4gSFRNTCB0ZW1wbGF0ZSB0aGF0IGNhbiBlZmZpY2llbnRseVxuICogcmVuZGVyIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGhlYWRlciA9ICh0aXRsZTogc3RyaW5nKSA9PiBodG1sYDxoMT4ke3RpdGxlfTwvaDE+YDtcbiAqIGBgYFxuICpcbiAqIFRoZSBgaHRtbGAgdGFnIHJldHVybnMgYSBkZXNjcmlwdGlvbiBvZiB0aGUgRE9NIHRvIHJlbmRlciBhcyBhIHZhbHVlLiBJdCBpc1xuICogbGF6eSwgbWVhbmluZyBubyB3b3JrIGlzIGRvbmUgdW50aWwgdGhlIHRlbXBsYXRlIGlzIHJlbmRlcmVkLiBXaGVuIHJlbmRlcmluZyxcbiAqIGlmIGEgdGVtcGxhdGUgY29tZXMgZnJvbSB0aGUgc2FtZSBleHByZXNzaW9uIGFzIGEgcHJldmlvdXNseSByZW5kZXJlZCByZXN1bHQsXG4gKiBpdCdzIGVmZmljaWVudGx5IHVwZGF0ZWQgaW5zdGVhZCBvZiByZXBsYWNlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGh0bWwgPSB0YWcoSFRNTF9SRVNVTFQpO1xuXG4vKipcbiAqIEludGVycHJldHMgYSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIGFuIFNWRyBmcmFnbWVudCB0aGF0IGNhbiBlZmZpY2llbnRseSByZW5kZXJcbiAqIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IHJlY3QgPSBzdmdgPHJlY3Qgd2lkdGg9XCIxMFwiIGhlaWdodD1cIjEwXCI+PC9yZWN0PmA7XG4gKlxuICogY29uc3QgbXlJbWFnZSA9IGh0bWxgXG4gKiAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAqICAgICAke3JlY3R9XG4gKiAgIDwvc3ZnPmA7XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHN2Z2AgKnRhZyBmdW5jdGlvbiogc2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgU1ZHIGZyYWdtZW50cywgb3IgZWxlbWVudHNcbiAqIHRoYXQgd291bGQgYmUgY29udGFpbmVkICoqaW5zaWRlKiogYW4gYDxzdmc+YCBIVE1MIGVsZW1lbnQuIEEgY29tbW9uIGVycm9yIGlzXG4gKiBwbGFjaW5nIGFuIGA8c3ZnPmAgKmVsZW1lbnQqIGluIGEgdGVtcGxhdGUgdGFnZ2VkIHdpdGggdGhlIGBzdmdgIHRhZ1xuICogZnVuY3Rpb24uIFRoZSBgPHN2Zz5gIGVsZW1lbnQgaXMgYW4gSFRNTCBlbGVtZW50IGFuZCBzaG91bGQgYmUgdXNlZCB3aXRoaW4gYVxuICogdGVtcGxhdGUgdGFnZ2VkIHdpdGggdGhlIHtAbGlua2NvZGUgaHRtbH0gdGFnIGZ1bmN0aW9uLlxuICpcbiAqIEluIExpdEVsZW1lbnQgdXNhZ2UsIGl0J3MgaW52YWxpZCB0byByZXR1cm4gYW4gU1ZHIGZyYWdtZW50IGZyb20gdGhlXG4gKiBgcmVuZGVyKClgIG1ldGhvZCwgYXMgdGhlIFNWRyBmcmFnbWVudCB3aWxsIGJlIGNvbnRhaW5lZCB3aXRoaW4gdGhlIGVsZW1lbnQnc1xuICogc2hhZG93IHJvb3QgYW5kIHRodXMgbm90IGJlIHByb3Blcmx5IGNvbnRhaW5lZCB3aXRoaW4gYW4gYDxzdmc+YCBIVE1MXG4gKiBlbGVtZW50LlxuICovXG5leHBvcnQgY29uc3Qgc3ZnID0gdGFnKFNWR19SRVNVTFQpO1xuXG4vKipcbiAqIEludGVycHJldHMgYSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIE1hdGhNTCBmcmFnbWVudCB0aGF0IGNhbiBlZmZpY2llbnRseSByZW5kZXJcbiAqIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IG51bSA9IG1hdGhtbGA8bW4+MTwvbW4+YDtcbiAqXG4gKiBjb25zdCBlcSA9IGh0bWxgXG4gKiAgIDxtYXRoPlxuICogICAgICR7bnVtfVxuICogICA8L21hdGg+YDtcbiAqIGBgYFxuICpcbiAqIFRoZSBgbWF0aG1sYCAqdGFnIGZ1bmN0aW9uKiBzaG91bGQgb25seSBiZSB1c2VkIGZvciBNYXRoTUwgZnJhZ21lbnRzLCBvclxuICogZWxlbWVudHMgdGhhdCB3b3VsZCBiZSBjb250YWluZWQgKippbnNpZGUqKiBhIGA8bWF0aD5gIEhUTUwgZWxlbWVudC4gQSBjb21tb25cbiAqIGVycm9yIGlzIHBsYWNpbmcgYSBgPG1hdGg+YCAqZWxlbWVudCogaW4gYSB0ZW1wbGF0ZSB0YWdnZWQgd2l0aCB0aGUgYG1hdGhtbGBcbiAqIHRhZyBmdW5jdGlvbi4gVGhlIGA8bWF0aD5gIGVsZW1lbnQgaXMgYW4gSFRNTCBlbGVtZW50IGFuZCBzaG91bGQgYmUgdXNlZFxuICogd2l0aGluIGEgdGVtcGxhdGUgdGFnZ2VkIHdpdGggdGhlIHtAbGlua2NvZGUgaHRtbH0gdGFnIGZ1bmN0aW9uLlxuICpcbiAqIEluIExpdEVsZW1lbnQgdXNhZ2UsIGl0J3MgaW52YWxpZCB0byByZXR1cm4gYW4gTWF0aE1MIGZyYWdtZW50IGZyb20gdGhlXG4gKiBgcmVuZGVyKClgIG1ldGhvZCwgYXMgdGhlIE1hdGhNTCBmcmFnbWVudCB3aWxsIGJlIGNvbnRhaW5lZCB3aXRoaW4gdGhlXG4gKiBlbGVtZW50J3Mgc2hhZG93IHJvb3QgYW5kIHRodXMgbm90IGJlIHByb3Blcmx5IGNvbnRhaW5lZCB3aXRoaW4gYSBgPG1hdGg+YFxuICogSFRNTCBlbGVtZW50LlxuICovXG5leHBvcnQgY29uc3QgbWF0aG1sID0gdGFnKE1BVEhNTF9SRVNVTFQpO1xuXG4vKipcbiAqIEEgc2VudGluZWwgdmFsdWUgdGhhdCBzaWduYWxzIHRoYXQgYSB2YWx1ZSB3YXMgaGFuZGxlZCBieSBhIGRpcmVjdGl2ZSBhbmRcbiAqIHNob3VsZCBub3QgYmUgd3JpdHRlbiB0byB0aGUgRE9NLlxuICovXG5leHBvcnQgY29uc3Qgbm9DaGFuZ2UgPSBTeW1ib2wuZm9yKCdsaXQtbm9DaGFuZ2UnKTtcblxuLyoqXG4gKiBBIHNlbnRpbmVsIHZhbHVlIHRoYXQgc2lnbmFscyBhIENoaWxkUGFydCB0byBmdWxseSBjbGVhciBpdHMgY29udGVudC5cbiAqXG4gKiBgYGB0c1xuICogY29uc3QgYnV0dG9uID0gaHRtbGAke1xuICogIHVzZXIuaXNBZG1pblxuICogICAgPyBodG1sYDxidXR0b24+REVMRVRFPC9idXR0b24+YFxuICogICAgOiBub3RoaW5nXG4gKiB9YDtcbiAqIGBgYFxuICpcbiAqIFByZWZlciB1c2luZyBgbm90aGluZ2Agb3ZlciBvdGhlciBmYWxzeSB2YWx1ZXMgYXMgaXQgcHJvdmlkZXMgYSBjb25zaXN0ZW50XG4gKiBiZWhhdmlvciBiZXR3ZWVuIHZhcmlvdXMgZXhwcmVzc2lvbiBiaW5kaW5nIGNvbnRleHRzLlxuICpcbiAqIEluIGNoaWxkIGV4cHJlc3Npb25zLCBgdW5kZWZpbmVkYCwgYG51bGxgLCBgJydgLCBhbmQgYG5vdGhpbmdgIGFsbCBiZWhhdmUgdGhlXG4gKiBzYW1lIGFuZCByZW5kZXIgbm8gbm9kZXMuIEluIGF0dHJpYnV0ZSBleHByZXNzaW9ucywgYG5vdGhpbmdgIF9yZW1vdmVzXyB0aGVcbiAqIGF0dHJpYnV0ZSwgd2hpbGUgYHVuZGVmaW5lZGAgYW5kIGBudWxsYCB3aWxsIHJlbmRlciBhbiBlbXB0eSBzdHJpbmcuIEluXG4gKiBwcm9wZXJ0eSBleHByZXNzaW9ucyBgbm90aGluZ2AgYmVjb21lcyBgdW5kZWZpbmVkYC5cbiAqL1xuZXhwb3J0IGNvbnN0IG5vdGhpbmcgPSBTeW1ib2wuZm9yKCdsaXQtbm90aGluZycpO1xuXG4vKipcbiAqIFRoZSBjYWNoZSBvZiBwcmVwYXJlZCB0ZW1wbGF0ZXMsIGtleWVkIGJ5IHRoZSB0YWdnZWQgVGVtcGxhdGVTdHJpbmdzQXJyYXlcbiAqIGFuZCBfbm90XyBhY2NvdW50aW5nIGZvciB0aGUgc3BlY2lmaWMgdGVtcGxhdGUgdGFnIHVzZWQuIFRoaXMgbWVhbnMgdGhhdFxuICogdGVtcGxhdGUgdGFncyBjYW5ub3QgYmUgZHluYW1pYyAtIHRoZXkgbXVzdCBzdGF0aWNhbGx5IGJlIG9uZSBvZiBodG1sLCBzdmcsXG4gKiBvciBhdHRyLiBUaGlzIHJlc3RyaWN0aW9uIHNpbXBsaWZpZXMgdGhlIGNhY2hlIGxvb2t1cCwgd2hpY2ggaXMgb24gdGhlIGhvdFxuICogcGF0aCBmb3IgcmVuZGVyaW5nLlxuICovXG5jb25zdCB0ZW1wbGF0ZUNhY2hlID0gbmV3IFdlYWtNYXA8VGVtcGxhdGVTdHJpbmdzQXJyYXksIFRlbXBsYXRlPigpO1xuXG4vKipcbiAqIE9iamVjdCBzcGVjaWZ5aW5nIG9wdGlvbnMgZm9yIGNvbnRyb2xsaW5nIGxpdC1odG1sIHJlbmRlcmluZy4gTm90ZSB0aGF0XG4gKiB3aGlsZSBgcmVuZGVyYCBtYXkgYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzIG9uIHRoZSBzYW1lIGBjb250YWluZXJgIChhbmRcbiAqIGByZW5kZXJCZWZvcmVgIHJlZmVyZW5jZSBub2RlKSB0byBlZmZpY2llbnRseSB1cGRhdGUgdGhlIHJlbmRlcmVkIGNvbnRlbnQsXG4gKiBvbmx5IHRoZSBvcHRpb25zIHBhc3NlZCBpbiBkdXJpbmcgdGhlIGZpcnN0IHJlbmRlciBhcmUgcmVzcGVjdGVkIGR1cmluZ1xuICogdGhlIGxpZmV0aW1lIG9mIHJlbmRlcnMgdG8gdGhhdCB1bmlxdWUgYGNvbnRhaW5lcmAgKyBgcmVuZGVyQmVmb3JlYFxuICogY29tYmluYXRpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBBbiBvYmplY3QgdG8gdXNlIGFzIHRoZSBgdGhpc2AgdmFsdWUgZm9yIGV2ZW50IGxpc3RlbmVycy4gSXQncyBvZnRlblxuICAgKiB1c2VmdWwgdG8gc2V0IHRoaXMgdG8gdGhlIGhvc3QgY29tcG9uZW50IHJlbmRlcmluZyBhIHRlbXBsYXRlLlxuICAgKi9cbiAgaG9zdD86IG9iamVjdDtcbiAgLyoqXG4gICAqIEEgRE9NIG5vZGUgYmVmb3JlIHdoaWNoIHRvIHJlbmRlciBjb250ZW50IGluIHRoZSBjb250YWluZXIuXG4gICAqL1xuICByZW5kZXJCZWZvcmU/OiBDaGlsZE5vZGUgfCBudWxsO1xuICAvKipcbiAgICogTm9kZSB1c2VkIGZvciBjbG9uaW5nIHRoZSB0ZW1wbGF0ZSAoYGltcG9ydE5vZGVgIHdpbGwgYmUgY2FsbGVkIG9uIHRoaXNcbiAgICogbm9kZSkuIFRoaXMgY29udHJvbHMgdGhlIGBvd25lckRvY3VtZW50YCBvZiB0aGUgcmVuZGVyZWQgRE9NLCBhbG9uZyB3aXRoXG4gICAqIGFueSBpbmhlcml0ZWQgY29udGV4dC4gRGVmYXVsdHMgdG8gdGhlIGdsb2JhbCBgZG9jdW1lbnRgLlxuICAgKi9cbiAgY3JlYXRpb25TY29wZT86IHtpbXBvcnROb2RlKG5vZGU6IE5vZGUsIGRlZXA/OiBib29sZWFuKTogTm9kZX07XG4gIC8qKlxuICAgKiBUaGUgaW5pdGlhbCBjb25uZWN0ZWQgc3RhdGUgZm9yIHRoZSB0b3AtbGV2ZWwgcGFydCBiZWluZyByZW5kZXJlZC4gSWYgbm9cbiAgICogYGlzQ29ubmVjdGVkYCBvcHRpb24gaXMgc2V0LCBgQXN5bmNEaXJlY3RpdmVgcyB3aWxsIGJlIGNvbm5lY3RlZCBieVxuICAgKiBkZWZhdWx0LiBTZXQgdG8gYGZhbHNlYCBpZiB0aGUgaW5pdGlhbCByZW5kZXIgb2NjdXJzIGluIGEgZGlzY29ubmVjdGVkIHRyZWVcbiAgICogYW5kIGBBc3luY0RpcmVjdGl2ZWBzIHNob3VsZCBzZWUgYGlzQ29ubmVjdGVkID09PSBmYWxzZWAgZm9yIHRoZWlyIGluaXRpYWxcbiAgICogcmVuZGVyLiBUaGUgYHBhcnQuc2V0Q29ubmVjdGVkKClgIG1ldGhvZCBtdXN0IGJlIHVzZWQgc3Vic2VxdWVudCB0byBpbml0aWFsXG4gICAqIHJlbmRlciB0byBjaGFuZ2UgdGhlIGNvbm5lY3RlZCBzdGF0ZSBvZiB0aGUgcGFydC5cbiAgICovXG4gIGlzQ29ubmVjdGVkPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBUaGUgcm9vdCBET00gbm9kZSBmb3IgcmVuZGVyaW5nLlxuICovXG5leHBvcnQgdHlwZSBSZW5kZXJSb290Tm9kZSA9IEhUTUxFbGVtZW50IHwgU1ZHRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnQ7XG5cbmNvbnN0IHdhbGtlciA9IGQuY3JlYXRlVHJlZVdhbGtlcihcbiAgZCxcbiAgMTI5IC8qIE5vZGVGaWx0ZXIuU0hPV197RUxFTUVOVHxDT01NRU5UfSAqL1xuKTtcblxubGV0IHNhbml0aXplckZhY3RvcnlJbnRlcm5hbDogU2FuaXRpemVyRmFjdG9yeSA9IG5vb3BTYW5pdGl6ZXI7XG5cbi8vXG4vLyBDbGFzc2VzIG9ubHkgYmVsb3cgaGVyZSwgY29uc3QgdmFyaWFibGUgZGVjbGFyYXRpb25zIG9ubHkgYWJvdmUgaGVyZS4uLlxuLy9cbi8vIEtlZXBpbmcgdmFyaWFibGUgZGVjbGFyYXRpb25zIGFuZCBjbGFzc2VzIHRvZ2V0aGVyIGltcHJvdmVzIG1pbmlmaWNhdGlvbi5cbi8vIEludGVyZmFjZXMgYW5kIHR5cGUgYWxpYXNlcyBjYW4gYmUgaW50ZXJsZWF2ZWQgZnJlZWx5LlxuLy9cblxuLy8gVHlwZSBmb3IgY2xhc3NlcyB0aGF0IGhhdmUgYSBgX2RpcmVjdGl2ZWAgb3IgYF9kaXJlY3RpdmVzW11gIGZpZWxkLCB1c2VkIGJ5XG4vLyBgcmVzb2x2ZURpcmVjdGl2ZWBcbmV4cG9ydCBpbnRlcmZhY2UgRGlyZWN0aXZlUGFyZW50IHtcbiAgXyRwYXJlbnQ/OiBEaXJlY3RpdmVQYXJlbnQ7XG4gIF8kaXNDb25uZWN0ZWQ6IGJvb2xlYW47XG4gIF9fZGlyZWN0aXZlPzogRGlyZWN0aXZlO1xuICBfX2RpcmVjdGl2ZXM/OiBBcnJheTxEaXJlY3RpdmUgfCB1bmRlZmluZWQ+O1xufVxuXG5mdW5jdGlvbiB0cnVzdEZyb21UZW1wbGF0ZVN0cmluZyhcbiAgdHNhOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgc3RyaW5nRnJvbVRTQTogc3RyaW5nXG4pOiBUcnVzdGVkSFRNTCB7XG4gIC8vIEEgc2VjdXJpdHkgY2hlY2sgdG8gcHJldmVudCBzcG9vZmluZyBvZiBMaXQgdGVtcGxhdGUgcmVzdWx0cy5cbiAgLy8gSW4gdGhlIGZ1dHVyZSwgd2UgbWF5IGJlIGFibGUgdG8gcmVwbGFjZSB0aGlzIHdpdGggQXJyYXkuaXNUZW1wbGF0ZU9iamVjdCxcbiAgLy8gdGhvdWdoIHdlIG1pZ2h0IG5lZWQgdG8gbWFrZSB0aGF0IGNoZWNrIGluc2lkZSBvZiB0aGUgaHRtbCBhbmQgc3ZnXG4gIC8vIGZ1bmN0aW9ucywgYmVjYXVzZSBwcmVjb21waWxlZCB0ZW1wbGF0ZXMgZG9uJ3QgY29tZSBpbiBhc1xuICAvLyBUZW1wbGF0ZVN0cmluZ0FycmF5IG9iamVjdHMuXG4gIGlmICghaXNBcnJheSh0c2EpIHx8ICF0c2EuaGFzT3duUHJvcGVydHkoJ3JhdycpKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSAnaW52YWxpZCB0ZW1wbGF0ZSBzdHJpbmdzIGFycmF5JztcbiAgICBpZiAoREVWX01PREUpIHtcbiAgICAgIG1lc3NhZ2UgPSBgXG4gICAgICAgICAgSW50ZXJuYWwgRXJyb3I6IGV4cGVjdGVkIHRlbXBsYXRlIHN0cmluZ3MgdG8gYmUgYW4gYXJyYXlcbiAgICAgICAgICB3aXRoIGEgJ3JhdycgZmllbGQuIEZha2luZyBhIHRlbXBsYXRlIHN0cmluZ3MgYXJyYXkgYnlcbiAgICAgICAgICBjYWxsaW5nIGh0bWwgb3Igc3ZnIGxpa2UgYW4gb3JkaW5hcnkgZnVuY3Rpb24gaXMgZWZmZWN0aXZlbHlcbiAgICAgICAgICB0aGUgc2FtZSBhcyBjYWxsaW5nIHVuc2FmZUh0bWwgYW5kIGNhbiBsZWFkIHRvIG1ham9yIHNlY3VyaXR5XG4gICAgICAgICAgaXNzdWVzLCBlLmcuIG9wZW5pbmcgeW91ciBjb2RlIHVwIHRvIFhTUyBhdHRhY2tzLlxuICAgICAgICAgIElmIHlvdSdyZSB1c2luZyB0aGUgaHRtbCBvciBzdmcgdGFnZ2VkIHRlbXBsYXRlIGZ1bmN0aW9ucyBub3JtYWxseVxuICAgICAgICAgIGFuZCBzdGlsbCBzZWVpbmcgdGhpcyBlcnJvciwgcGxlYXNlIGZpbGUgYSBidWcgYXRcbiAgICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vbGl0L2xpdC9pc3N1ZXMvbmV3P3RlbXBsYXRlPWJ1Z19yZXBvcnQubWRcbiAgICAgICAgICBhbmQgaW5jbHVkZSBpbmZvcm1hdGlvbiBhYm91dCB5b3VyIGJ1aWxkIHRvb2xpbmcsIGlmIGFueS5cbiAgICAgICAgYFxuICAgICAgICAudHJpbSgpXG4gICAgICAgIC5yZXBsYWNlKC9cXG4gKi9nLCAnXFxuJyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxuICByZXR1cm4gcG9saWN5ICE9PSB1bmRlZmluZWRcbiAgICA/IHBvbGljeS5jcmVhdGVIVE1MKHN0cmluZ0Zyb21UU0EpXG4gICAgOiAoc3RyaW5nRnJvbVRTQSBhcyB1bmtub3duIGFzIFRydXN0ZWRIVE1MKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIEhUTUwgc3RyaW5nIGZvciB0aGUgZ2l2ZW4gVGVtcGxhdGVTdHJpbmdzQXJyYXkgYW5kIHJlc3VsdCB0eXBlXG4gKiAoSFRNTCBvciBTVkcpLCBhbG9uZyB3aXRoIHRoZSBjYXNlLXNlbnNpdGl2ZSBib3VuZCBhdHRyaWJ1dGUgbmFtZXMgaW5cbiAqIHRlbXBsYXRlIG9yZGVyLiBUaGUgSFRNTCBjb250YWlucyBjb21tZW50IG1hcmtlcnMgZGVub3RpbmcgdGhlIGBDaGlsZFBhcnRgc1xuICogYW5kIHN1ZmZpeGVzIG9uIGJvdW5kIGF0dHJpYnV0ZXMgZGVub3RpbmcgdGhlIGBBdHRyaWJ1dGVQYXJ0c2AuXG4gKlxuICogQHBhcmFtIHN0cmluZ3MgdGVtcGxhdGUgc3RyaW5ncyBhcnJheVxuICogQHBhcmFtIHR5cGUgSFRNTCBvciBTVkdcbiAqIEByZXR1cm4gQXJyYXkgY29udGFpbmluZyBgW2h0bWwsIGF0dHJOYW1lc11gIChhcnJheSByZXR1cm5lZCBmb3IgdGVyc2VuZXNzLFxuICogICAgIHRvIGF2b2lkIG9iamVjdCBmaWVsZHMgc2luY2UgdGhpcyBjb2RlIGlzIHNoYXJlZCB3aXRoIG5vbi1taW5pZmllZCBTU1JcbiAqICAgICBjb2RlKVxuICovXG5jb25zdCBnZXRUZW1wbGF0ZUh0bWwgPSAoXG4gIHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LFxuICB0eXBlOiBSZXN1bHRUeXBlXG4pOiBbVHJ1c3RlZEhUTUwsIEFycmF5PHN0cmluZz5dID0+IHtcbiAgLy8gSW5zZXJ0IG1ha2VycyBpbnRvIHRoZSB0ZW1wbGF0ZSBIVE1MIHRvIHJlcHJlc2VudCB0aGUgcG9zaXRpb24gb2ZcbiAgLy8gYmluZGluZ3MuIFRoZSBmb2xsb3dpbmcgY29kZSBzY2FucyB0aGUgdGVtcGxhdGUgc3RyaW5ncyB0byBkZXRlcm1pbmUgdGhlXG4gIC8vIHN5bnRhY3RpYyBwb3NpdGlvbiBvZiB0aGUgYmluZGluZ3MuIFRoZXkgY2FuIGJlIGluIHRleHQgcG9zaXRpb24sIHdoZXJlXG4gIC8vIHdlIGluc2VydCBhbiBIVE1MIGNvbW1lbnQsIGF0dHJpYnV0ZSB2YWx1ZSBwb3NpdGlvbiwgd2hlcmUgd2UgaW5zZXJ0IGFcbiAgLy8gc2VudGluZWwgc3RyaW5nIGFuZCByZS13cml0ZSB0aGUgYXR0cmlidXRlIG5hbWUsIG9yIGluc2lkZSBhIHRhZyB3aGVyZVxuICAvLyB3ZSBpbnNlcnQgdGhlIHNlbnRpbmVsIHN0cmluZy5cbiAgY29uc3QgbCA9IHN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgLy8gU3RvcmVzIHRoZSBjYXNlLXNlbnNpdGl2ZSBib3VuZCBhdHRyaWJ1dGUgbmFtZXMgaW4gdGhlIG9yZGVyIG9mIHRoZWlyXG4gIC8vIHBhcnRzLiBFbGVtZW50UGFydHMgYXJlIGFsc28gcmVmbGVjdGVkIGluIHRoaXMgYXJyYXkgYXMgdW5kZWZpbmVkXG4gIC8vIHJhdGhlciB0aGFuIGEgc3RyaW5nLCB0byBkaXNhbWJpZ3VhdGUgZnJvbSBhdHRyaWJ1dGUgYmluZGluZ3MuXG4gIGNvbnN0IGF0dHJOYW1lczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBsZXQgaHRtbCA9XG4gICAgdHlwZSA9PT0gU1ZHX1JFU1VMVCA/ICc8c3ZnPicgOiB0eXBlID09PSBNQVRITUxfUkVTVUxUID8gJzxtYXRoPicgOiAnJztcblxuICAvLyBXaGVuIHdlJ3JlIGluc2lkZSBhIHJhdyB0ZXh0IHRhZyAobm90IGl0J3MgdGV4dCBjb250ZW50KSwgdGhlIHJlZ2V4XG4gIC8vIHdpbGwgc3RpbGwgYmUgdGFnUmVnZXggc28gd2UgY2FuIGZpbmQgYXR0cmlidXRlcywgYnV0IHdpbGwgc3dpdGNoIHRvXG4gIC8vIHRoaXMgcmVnZXggd2hlbiB0aGUgdGFnIGVuZHMuXG4gIGxldCByYXdUZXh0RW5kUmVnZXg6IFJlZ0V4cCB8IHVuZGVmaW5lZDtcblxuICAvLyBUaGUgY3VycmVudCBwYXJzaW5nIHN0YXRlLCByZXByZXNlbnRlZCBhcyBhIHJlZmVyZW5jZSB0byBvbmUgb2YgdGhlXG4gIC8vIHJlZ2V4ZXNcbiAgbGV0IHJlZ2V4ID0gdGV4dEVuZFJlZ2V4O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgY29uc3QgcyA9IHN0cmluZ3NbaV07XG4gICAgLy8gVGhlIGluZGV4IG9mIHRoZSBlbmQgb2YgdGhlIGxhc3QgYXR0cmlidXRlIG5hbWUuIFdoZW4gdGhpcyBpc1xuICAgIC8vIHBvc2l0aXZlIGF0IGVuZCBvZiBhIHN0cmluZywgaXQgbWVhbnMgd2UncmUgaW4gYW4gYXR0cmlidXRlIHZhbHVlXG4gICAgLy8gcG9zaXRpb24gYW5kIG5lZWQgdG8gcmV3cml0ZSB0aGUgYXR0cmlidXRlIG5hbWUuXG4gICAgLy8gV2UgYWxzbyB1c2UgYSBzcGVjaWFsIHZhbHVlIG9mIC0yIHRvIGluZGljYXRlIHRoYXQgd2UgZW5jb3VudGVyZWRcbiAgICAvLyB0aGUgZW5kIG9mIGEgc3RyaW5nIGluIGF0dHJpYnV0ZSBuYW1lIHBvc2l0aW9uLlxuICAgIGxldCBhdHRyTmFtZUVuZEluZGV4ID0gLTE7XG4gICAgbGV0IGF0dHJOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgbGV0IGxhc3RJbmRleCA9IDA7XG4gICAgbGV0IG1hdGNoITogUmVnRXhwRXhlY0FycmF5IHwgbnVsbDtcblxuICAgIC8vIFRoZSBjb25kaXRpb25zIGluIHRoaXMgbG9vcCBoYW5kbGUgdGhlIGN1cnJlbnQgcGFyc2Ugc3RhdGUsIGFuZCB0aGVcbiAgICAvLyBhc3NpZ25tZW50cyB0byB0aGUgYHJlZ2V4YCB2YXJpYWJsZSBhcmUgdGhlIHN0YXRlIHRyYW5zaXRpb25zLlxuICAgIHdoaWxlIChsYXN0SW5kZXggPCBzLmxlbmd0aCkge1xuICAgICAgLy8gTWFrZSBzdXJlIHdlIHN0YXJ0IHNlYXJjaGluZyBmcm9tIHdoZXJlIHdlIHByZXZpb3VzbHkgbGVmdCBvZmZcbiAgICAgIHJlZ2V4Lmxhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgIG1hdGNoID0gcmVnZXguZXhlYyhzKTtcbiAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RJbmRleCA9IHJlZ2V4Lmxhc3RJbmRleDtcbiAgICAgIGlmIChyZWdleCA9PT0gdGV4dEVuZFJlZ2V4KSB7XG4gICAgICAgIGlmIChtYXRjaFtDT01NRU5UX1NUQVJUXSA9PT0gJyEtLScpIHtcbiAgICAgICAgICByZWdleCA9IGNvbW1lbnRFbmRSZWdleDtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtDT01NRU5UX1NUQVJUXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gV2Ugc3RhcnRlZCBhIHdlaXJkIGNvbW1lbnQsIGxpa2UgPC97XG4gICAgICAgICAgcmVnZXggPSBjb21tZW50MkVuZFJlZ2V4O1xuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1RBR19OQU1FXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHJhd1RleHRFbGVtZW50LnRlc3QobWF0Y2hbVEFHX05BTUVdKSkge1xuICAgICAgICAgICAgLy8gUmVjb3JkIGlmIHdlIGVuY291bnRlciBhIHJhdy10ZXh0IGVsZW1lbnQuIFdlJ2xsIHN3aXRjaCB0b1xuICAgICAgICAgICAgLy8gdGhpcyByZWdleCBhdCB0aGUgZW5kIG9mIHRoZSB0YWcuXG4gICAgICAgICAgICByYXdUZXh0RW5kUmVnZXggPSBuZXcgUmVnRXhwKGA8LyR7bWF0Y2hbVEFHX05BTUVdfWAsICdnJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlZ2V4ID0gdGFnRW5kUmVnZXg7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbRFlOQU1JQ19UQUdfTkFNRV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmIChERVZfTU9ERSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAnQmluZGluZ3MgaW4gdGFnIG5hbWVzIGFyZSBub3Qgc3VwcG9ydGVkLiBQbGVhc2UgdXNlIHN0YXRpYyB0ZW1wbGF0ZXMgaW5zdGVhZC4gJyArXG4gICAgICAgICAgICAgICAgJ1NlZSBodHRwczovL2xpdC5kZXYvZG9jcy90ZW1wbGF0ZXMvZXhwcmVzc2lvbnMvI3N0YXRpYy1leHByZXNzaW9ucydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlZ2V4ID0gdGFnRW5kUmVnZXg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVnZXggPT09IHRhZ0VuZFJlZ2V4KSB7XG4gICAgICAgIGlmIChtYXRjaFtFTlRJUkVfTUFUQ0hdID09PSAnPicpIHtcbiAgICAgICAgICAvLyBFbmQgb2YgYSB0YWcuIElmIHdlIGhhZCBzdGFydGVkIGEgcmF3LXRleHQgZWxlbWVudCwgdXNlIHRoYXRcbiAgICAgICAgICAvLyByZWdleFxuICAgICAgICAgIHJlZ2V4ID0gcmF3VGV4dEVuZFJlZ2V4ID8/IHRleHRFbmRSZWdleDtcbiAgICAgICAgICAvLyBXZSBtYXkgYmUgZW5kaW5nIGFuIHVucXVvdGVkIGF0dHJpYnV0ZSB2YWx1ZSwgc28gbWFrZSBzdXJlIHdlXG4gICAgICAgICAgLy8gY2xlYXIgYW55IHBlbmRpbmcgYXR0ck5hbWVFbmRJbmRleFxuICAgICAgICAgIGF0dHJOYW1lRW5kSW5kZXggPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtBVFRSSUJVVEVfTkFNRV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIEF0dHJpYnV0ZSBuYW1lIHBvc2l0aW9uXG4gICAgICAgICAgYXR0ck5hbWVFbmRJbmRleCA9IC0yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF0dHJOYW1lRW5kSW5kZXggPSByZWdleC5sYXN0SW5kZXggLSBtYXRjaFtTUEFDRVNfQU5EX0VRVUFMU10ubGVuZ3RoO1xuICAgICAgICAgIGF0dHJOYW1lID0gbWF0Y2hbQVRUUklCVVRFX05BTUVdO1xuICAgICAgICAgIHJlZ2V4ID1cbiAgICAgICAgICAgIG1hdGNoW1FVT1RFX0NIQVJdID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyB0YWdFbmRSZWdleFxuICAgICAgICAgICAgICA6IG1hdGNoW1FVT1RFX0NIQVJdID09PSAnXCInXG4gICAgICAgICAgICAgICAgPyBkb3VibGVRdW90ZUF0dHJFbmRSZWdleFxuICAgICAgICAgICAgICAgIDogc2luZ2xlUXVvdGVBdHRyRW5kUmVnZXg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHJlZ2V4ID09PSBkb3VibGVRdW90ZUF0dHJFbmRSZWdleCB8fFxuICAgICAgICByZWdleCA9PT0gc2luZ2xlUXVvdGVBdHRyRW5kUmVnZXhcbiAgICAgICkge1xuICAgICAgICByZWdleCA9IHRhZ0VuZFJlZ2V4O1xuICAgICAgfSBlbHNlIGlmIChyZWdleCA9PT0gY29tbWVudEVuZFJlZ2V4IHx8IHJlZ2V4ID09PSBjb21tZW50MkVuZFJlZ2V4KSB7XG4gICAgICAgIHJlZ2V4ID0gdGV4dEVuZFJlZ2V4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTm90IG9uZSBvZiB0aGUgZml2ZSBzdGF0ZSByZWdleGVzLCBzbyBpdCBtdXN0IGJlIHRoZSBkeW5hbWljYWxseVxuICAgICAgICAvLyBjcmVhdGVkIHJhdyB0ZXh0IHJlZ2V4IGFuZCB3ZSdyZSBhdCB0aGUgY2xvc2Ugb2YgdGhhdCBlbGVtZW50LlxuICAgICAgICByZWdleCA9IHRhZ0VuZFJlZ2V4O1xuICAgICAgICByYXdUZXh0RW5kUmVnZXggPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICAvLyBJZiB3ZSBoYXZlIGEgYXR0ck5hbWVFbmRJbmRleCwgd2hpY2ggaW5kaWNhdGVzIHRoYXQgd2Ugc2hvdWxkXG4gICAgICAvLyByZXdyaXRlIHRoZSBhdHRyaWJ1dGUgbmFtZSwgYXNzZXJ0IHRoYXQgd2UncmUgaW4gYSB2YWxpZCBhdHRyaWJ1dGVcbiAgICAgIC8vIHBvc2l0aW9uIC0gZWl0aGVyIGluIGEgdGFnLCBvciBhIHF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICBjb25zb2xlLmFzc2VydChcbiAgICAgICAgYXR0ck5hbWVFbmRJbmRleCA9PT0gLTEgfHxcbiAgICAgICAgICByZWdleCA9PT0gdGFnRW5kUmVnZXggfHxcbiAgICAgICAgICByZWdleCA9PT0gc2luZ2xlUXVvdGVBdHRyRW5kUmVnZXggfHxcbiAgICAgICAgICByZWdleCA9PT0gZG91YmxlUXVvdGVBdHRyRW5kUmVnZXgsXG4gICAgICAgICd1bmV4cGVjdGVkIHBhcnNlIHN0YXRlIEInXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFdlIGhhdmUgZm91ciBjYXNlczpcbiAgICAvLyAgMS4gV2UncmUgaW4gdGV4dCBwb3NpdGlvbiwgYW5kIG5vdCBpbiBhIHJhdyB0ZXh0IGVsZW1lbnRcbiAgICAvLyAgICAgKHJlZ2V4ID09PSB0ZXh0RW5kUmVnZXgpOiBpbnNlcnQgYSBjb21tZW50IG1hcmtlci5cbiAgICAvLyAgMi4gV2UgaGF2ZSBhIG5vbi1uZWdhdGl2ZSBhdHRyTmFtZUVuZEluZGV4IHdoaWNoIG1lYW5zIHdlIG5lZWQgdG9cbiAgICAvLyAgICAgcmV3cml0ZSB0aGUgYXR0cmlidXRlIG5hbWUgdG8gYWRkIGEgYm91bmQgYXR0cmlidXRlIHN1ZmZpeC5cbiAgICAvLyAgMy4gV2UncmUgYXQgdGhlIG5vbi1maXJzdCBiaW5kaW5nIGluIGEgbXVsdGktYmluZGluZyBhdHRyaWJ1dGUsIHVzZSBhXG4gICAgLy8gICAgIHBsYWluIG1hcmtlci5cbiAgICAvLyAgNC4gV2UncmUgc29tZXdoZXJlIGVsc2UgaW5zaWRlIHRoZSB0YWcuIElmIHdlJ3JlIGluIGF0dHJpYnV0ZSBuYW1lXG4gICAgLy8gICAgIHBvc2l0aW9uIChhdHRyTmFtZUVuZEluZGV4ID09PSAtMiksIGFkZCBhIHNlcXVlbnRpYWwgc3VmZml4IHRvXG4gICAgLy8gICAgIGdlbmVyYXRlIGEgdW5pcXVlIGF0dHJpYnV0ZSBuYW1lLlxuXG4gICAgLy8gRGV0ZWN0IGEgYmluZGluZyBuZXh0IHRvIHNlbGYtY2xvc2luZyB0YWcgZW5kIGFuZCBpbnNlcnQgYSBzcGFjZSB0b1xuICAgIC8vIHNlcGFyYXRlIHRoZSBtYXJrZXIgZnJvbSB0aGUgdGFnIGVuZDpcbiAgICBjb25zdCBlbmQgPVxuICAgICAgcmVnZXggPT09IHRhZ0VuZFJlZ2V4ICYmIHN0cmluZ3NbaSArIDFdLnN0YXJ0c1dpdGgoJy8+JykgPyAnICcgOiAnJztcbiAgICBodG1sICs9XG4gICAgICByZWdleCA9PT0gdGV4dEVuZFJlZ2V4XG4gICAgICAgID8gcyArIG5vZGVNYXJrZXJcbiAgICAgICAgOiBhdHRyTmFtZUVuZEluZGV4ID49IDBcbiAgICAgICAgICA/IChhdHRyTmFtZXMucHVzaChhdHRyTmFtZSEpLFxuICAgICAgICAgICAgcy5zbGljZSgwLCBhdHRyTmFtZUVuZEluZGV4KSArXG4gICAgICAgICAgICAgIGJvdW5kQXR0cmlidXRlU3VmZml4ICtcbiAgICAgICAgICAgICAgcy5zbGljZShhdHRyTmFtZUVuZEluZGV4KSkgK1xuICAgICAgICAgICAgbWFya2VyICtcbiAgICAgICAgICAgIGVuZFxuICAgICAgICAgIDogcyArIG1hcmtlciArIChhdHRyTmFtZUVuZEluZGV4ID09PSAtMiA/IGkgOiBlbmQpO1xuICB9XG5cbiAgY29uc3QgaHRtbFJlc3VsdDogc3RyaW5nIHwgVHJ1c3RlZEhUTUwgPVxuICAgIGh0bWwgK1xuICAgIChzdHJpbmdzW2xdIHx8ICc8Pz4nKSArXG4gICAgKHR5cGUgPT09IFNWR19SRVNVTFQgPyAnPC9zdmc+JyA6IHR5cGUgPT09IE1BVEhNTF9SRVNVTFQgPyAnPC9tYXRoPicgOiAnJyk7XG5cbiAgLy8gUmV0dXJuZWQgYXMgYW4gYXJyYXkgZm9yIHRlcnNlbmVzc1xuICByZXR1cm4gW3RydXN0RnJvbVRlbXBsYXRlU3RyaW5nKHN0cmluZ3MsIGh0bWxSZXN1bHQpLCBhdHRyTmFtZXNdO1xufTtcblxuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IHR5cGUge1RlbXBsYXRlfTtcbmNsYXNzIFRlbXBsYXRlIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBlbCE6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgcGFydHM6IEFycmF5PFRlbXBsYXRlUGFydD4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgIHtzdHJpbmdzLCBbJ18kbGl0VHlwZSQnXTogdHlwZX06IFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdCxcbiAgICBvcHRpb25zPzogUmVuZGVyT3B0aW9uc1xuICApIHtcbiAgICBsZXQgbm9kZTogTm9kZSB8IG51bGw7XG4gICAgbGV0IG5vZGVJbmRleCA9IDA7XG4gICAgbGV0IGF0dHJOYW1lSW5kZXggPSAwO1xuICAgIGNvbnN0IHBhcnRDb3VudCA9IHN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBwYXJ0cyA9IHRoaXMucGFydHM7XG5cbiAgICAvLyBDcmVhdGUgdGVtcGxhdGUgZWxlbWVudFxuICAgIGNvbnN0IFtodG1sLCBhdHRyTmFtZXNdID0gZ2V0VGVtcGxhdGVIdG1sKHN0cmluZ3MsIHR5cGUpO1xuICAgIHRoaXMuZWwgPSBUZW1wbGF0ZS5jcmVhdGVFbGVtZW50KGh0bWwsIG9wdGlvbnMpO1xuICAgIHdhbGtlci5jdXJyZW50Tm9kZSA9IHRoaXMuZWwuY29udGVudDtcblxuICAgIC8vIFJlLXBhcmVudCBTVkcgb3IgTWF0aE1MIG5vZGVzIGludG8gdGVtcGxhdGUgcm9vdFxuICAgIGlmICh0eXBlID09PSBTVkdfUkVTVUxUIHx8IHR5cGUgPT09IE1BVEhNTF9SRVNVTFQpIHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLmVsLmNvbnRlbnQuZmlyc3RDaGlsZCE7XG4gICAgICB3cmFwcGVyLnJlcGxhY2VXaXRoKC4uLndyYXBwZXIuY2hpbGROb2Rlcyk7XG4gICAgfVxuXG4gICAgLy8gV2FsayB0aGUgdGVtcGxhdGUgdG8gZmluZCBiaW5kaW5nIG1hcmtlcnMgYW5kIGNyZWF0ZSBUZW1wbGF0ZVBhcnRzXG4gICAgd2hpbGUgKChub2RlID0gd2Fsa2VyLm5leHROb2RlKCkpICE9PSBudWxsICYmIHBhcnRzLmxlbmd0aCA8IHBhcnRDb3VudCkge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICAgICAgY29uc3QgdGFnID0gKG5vZGUgYXMgRWxlbWVudCkubG9jYWxOYW1lO1xuICAgICAgICAgIC8vIFdhcm4gaWYgYHRleHRhcmVhYCBpbmNsdWRlcyBhbiBleHByZXNzaW9uIGFuZCB0aHJvdyBpZiBgdGVtcGxhdGVgXG4gICAgICAgICAgLy8gZG9lcyBzaW5jZSB0aGVzZSBhcmUgbm90IHN1cHBvcnRlZC4gV2UgZG8gdGhpcyBieSBjaGVja2luZ1xuICAgICAgICAgIC8vIGlubmVySFRNTCBmb3IgYW55dGhpbmcgdGhhdCBsb29rcyBsaWtlIGEgbWFya2VyLiBUaGlzIGNhdGNoZXNcbiAgICAgICAgICAvLyBjYXNlcyBsaWtlIGJpbmRpbmdzIGluIHRleHRhcmVhIHRoZXJlIG1hcmtlcnMgdHVybiBpbnRvIHRleHQgbm9kZXMuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgL14oPzp0ZXh0YXJlYXx0ZW1wbGF0ZSkkL2khLnRlc3QodGFnKSAmJlxuICAgICAgICAgICAgKG5vZGUgYXMgRWxlbWVudCkuaW5uZXJIVE1MLmluY2x1ZGVzKG1hcmtlcilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IG0gPVxuICAgICAgICAgICAgICBgRXhwcmVzc2lvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW5zaWRlIFxcYCR7dGFnfVxcYCBgICtcbiAgICAgICAgICAgICAgYGVsZW1lbnRzLiBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy9leHByZXNzaW9uLWluLSR7dGFnfSBmb3IgbW9yZSBgICtcbiAgICAgICAgICAgICAgYGluZm9ybWF0aW9uLmA7XG4gICAgICAgICAgICBpZiAodGFnID09PSAndGVtcGxhdGUnKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpc3N1ZVdhcm5pbmcoJycsIG0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPIChqdXN0aW5mYWduYW5pKTogZm9yIGF0dGVtcHRlZCBkeW5hbWljIHRhZyBuYW1lcywgd2UgZG9uJ3RcbiAgICAgICAgLy8gaW5jcmVtZW50IHRoZSBiaW5kaW5nSW5kZXgsIGFuZCBpdCdsbCBiZSBvZmYgYnkgMSBpbiB0aGUgZWxlbWVudFxuICAgICAgICAvLyBhbmQgb2ZmIGJ5IHR3byBhZnRlciBpdC5cbiAgICAgICAgaWYgKChub2RlIGFzIEVsZW1lbnQpLmhhc0F0dHJpYnV0ZXMoKSkge1xuICAgICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiAobm9kZSBhcyBFbGVtZW50KS5nZXRBdHRyaWJ1dGVOYW1lcygpKSB7XG4gICAgICAgICAgICBpZiAobmFtZS5lbmRzV2l0aChib3VuZEF0dHJpYnV0ZVN1ZmZpeCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVhbE5hbWUgPSBhdHRyTmFtZXNbYXR0ck5hbWVJbmRleCsrXTtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAobm9kZSBhcyBFbGVtZW50KS5nZXRBdHRyaWJ1dGUobmFtZSkhO1xuICAgICAgICAgICAgICBjb25zdCBzdGF0aWNzID0gdmFsdWUuc3BsaXQobWFya2VyKTtcbiAgICAgICAgICAgICAgY29uc3QgbSA9IC8oWy4/QF0pPyguKikvLmV4ZWMocmVhbE5hbWUpITtcbiAgICAgICAgICAgICAgcGFydHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogQVRUUklCVVRFX1BBUlQsXG4gICAgICAgICAgICAgICAgaW5kZXg6IG5vZGVJbmRleCxcbiAgICAgICAgICAgICAgICBuYW1lOiBtWzJdLFxuICAgICAgICAgICAgICAgIHN0cmluZ3M6IHN0YXRpY3MsXG4gICAgICAgICAgICAgICAgY3RvcjpcbiAgICAgICAgICAgICAgICAgIG1bMV0gPT09ICcuJ1xuICAgICAgICAgICAgICAgICAgICA/IFByb3BlcnR5UGFydFxuICAgICAgICAgICAgICAgICAgICA6IG1bMV0gPT09ICc/J1xuICAgICAgICAgICAgICAgICAgICAgID8gQm9vbGVhbkF0dHJpYnV0ZVBhcnRcbiAgICAgICAgICAgICAgICAgICAgICA6IG1bMV0gPT09ICdAJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBFdmVudFBhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogQXR0cmlidXRlUGFydCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIChub2RlIGFzIEVsZW1lbnQpLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKG1hcmtlcikpIHtcbiAgICAgICAgICAgICAgcGFydHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogRUxFTUVOVF9QQVJULFxuICAgICAgICAgICAgICAgIGluZGV4OiBub2RlSW5kZXgsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAobm9kZSBhcyBFbGVtZW50KS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE8gKGp1c3RpbmZhZ25hbmkpOiBiZW5jaG1hcmsgdGhlIHJlZ2V4IGFnYWluc3QgdGVzdGluZyBmb3IgZWFjaFxuICAgICAgICAvLyBvZiB0aGUgMyByYXcgdGV4dCBlbGVtZW50IG5hbWVzLlxuICAgICAgICBpZiAocmF3VGV4dEVsZW1lbnQudGVzdCgobm9kZSBhcyBFbGVtZW50KS50YWdOYW1lKSkge1xuICAgICAgICAgIC8vIEZvciByYXcgdGV4dCBlbGVtZW50cyB3ZSBuZWVkIHRvIHNwbGl0IHRoZSB0ZXh0IGNvbnRlbnQgb25cbiAgICAgICAgICAvLyBtYXJrZXJzLCBjcmVhdGUgYSBUZXh0IG5vZGUgZm9yIGVhY2ggc2VnbWVudCwgYW5kIGNyZWF0ZVxuICAgICAgICAgIC8vIGEgVGVtcGxhdGVQYXJ0IGZvciBlYWNoIG1hcmtlci5cbiAgICAgICAgICBjb25zdCBzdHJpbmdzID0gKG5vZGUgYXMgRWxlbWVudCkudGV4dENvbnRlbnQhLnNwbGl0KG1hcmtlcik7XG4gICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gc3RyaW5ncy5sZW5ndGggLSAxO1xuICAgICAgICAgIGlmIChsYXN0SW5kZXggPiAwKSB7XG4gICAgICAgICAgICAobm9kZSBhcyBFbGVtZW50KS50ZXh0Q29udGVudCA9IHRydXN0ZWRUeXBlc1xuICAgICAgICAgICAgICA/ICh0cnVzdGVkVHlwZXMuZW1wdHlTY3JpcHQgYXMgdW5rbm93biBhcyAnJylcbiAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgIC8vIEdlbmVyYXRlIGEgbmV3IHRleHQgbm9kZSBmb3IgZWFjaCBsaXRlcmFsIHNlY3Rpb25cbiAgICAgICAgICAgIC8vIFRoZXNlIG5vZGVzIGFyZSBhbHNvIHVzZWQgYXMgdGhlIG1hcmtlcnMgZm9yIGNoaWxkIHBhcnRzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhc3RJbmRleDsgaSsrKSB7XG4gICAgICAgICAgICAgIChub2RlIGFzIEVsZW1lbnQpLmFwcGVuZChzdHJpbmdzW2ldLCBjcmVhdGVNYXJrZXIoKSk7XG4gICAgICAgICAgICAgIC8vIFdhbGsgcGFzdCB0aGUgbWFya2VyIG5vZGUgd2UganVzdCBhZGRlZFxuICAgICAgICAgICAgICB3YWxrZXIubmV4dE5vZGUoKTtcbiAgICAgICAgICAgICAgcGFydHMucHVzaCh7dHlwZTogQ0hJTERfUEFSVCwgaW5kZXg6ICsrbm9kZUluZGV4fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb3RlIGJlY2F1c2UgdGhpcyBtYXJrZXIgaXMgYWRkZWQgYWZ0ZXIgdGhlIHdhbGtlcidzIGN1cnJlbnRcbiAgICAgICAgICAgIC8vIG5vZGUsIGl0IHdpbGwgYmUgd2Fsa2VkIHRvIGluIHRoZSBvdXRlciBsb29wIChhbmQgaWdub3JlZCksIHNvXG4gICAgICAgICAgICAvLyB3ZSBkb24ndCBuZWVkIHRvIGFkanVzdCBub2RlSW5kZXggaGVyZVxuICAgICAgICAgICAgKG5vZGUgYXMgRWxlbWVudCkuYXBwZW5kKHN0cmluZ3NbbGFzdEluZGV4XSwgY3JlYXRlTWFya2VyKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSA4KSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSAobm9kZSBhcyBDb21tZW50KS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSA9PT0gbWFya2VyTWF0Y2gpIHtcbiAgICAgICAgICBwYXJ0cy5wdXNoKHt0eXBlOiBDSElMRF9QQVJULCBpbmRleDogbm9kZUluZGV4fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGkgPSAtMTtcbiAgICAgICAgICB3aGlsZSAoKGkgPSAobm9kZSBhcyBDb21tZW50KS5kYXRhLmluZGV4T2YobWFya2VyLCBpICsgMSkpICE9PSAtMSkge1xuICAgICAgICAgICAgLy8gQ29tbWVudCBub2RlIGhhcyBhIGJpbmRpbmcgbWFya2VyIGluc2lkZSwgbWFrZSBhbiBpbmFjdGl2ZSBwYXJ0XG4gICAgICAgICAgICAvLyBUaGUgYmluZGluZyB3b24ndCB3b3JrLCBidXQgc3Vic2VxdWVudCBiaW5kaW5ncyB3aWxsXG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHt0eXBlOiBDT01NRU5UX1BBUlQsIGluZGV4OiBub2RlSW5kZXh9KTtcbiAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIGVuZCBvZiB0aGUgbWF0Y2hcbiAgICAgICAgICAgIGkgKz0gbWFya2VyLmxlbmd0aCAtIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBub2RlSW5kZXgrKztcbiAgICB9XG5cbiAgICBpZiAoREVWX01PREUpIHtcbiAgICAgIC8vIElmIHRoZXJlIHdhcyBhIGR1cGxpY2F0ZSBhdHRyaWJ1dGUgb24gYSB0YWcsIHRoZW4gd2hlbiB0aGUgdGFnIGlzXG4gICAgICAvLyBwYXJzZWQgaW50byBhbiBlbGVtZW50IHRoZSBhdHRyaWJ1dGUgZ2V0cyBkZS1kdXBsaWNhdGVkLiBXZSBjYW4gZGV0ZWN0XG4gICAgICAvLyB0aGlzIG1pc21hdGNoIGlmIHdlIGhhdmVuJ3QgcHJlY2lzZWx5IGNvbnN1bWVkIGV2ZXJ5IGF0dHJpYnV0ZSBuYW1lXG4gICAgICAvLyB3aGVuIHByZXBhcmluZyB0aGUgdGVtcGxhdGUuIFRoaXMgd29ya3MgYmVjYXVzZSBgYXR0ck5hbWVzYCBpcyBidWlsdFxuICAgICAgLy8gZnJvbSB0aGUgdGVtcGxhdGUgc3RyaW5nIGFuZCBgYXR0ck5hbWVJbmRleGAgY29tZXMgZnJvbSBwcm9jZXNzaW5nIHRoZVxuICAgICAgLy8gcmVzdWx0aW5nIERPTS5cbiAgICAgIGlmIChhdHRyTmFtZXMubGVuZ3RoICE9PSBhdHRyTmFtZUluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgRGV0ZWN0ZWQgZHVwbGljYXRlIGF0dHJpYnV0ZSBiaW5kaW5ncy4gVGhpcyBvY2N1cnMgaWYgeW91ciB0ZW1wbGF0ZSBgICtcbiAgICAgICAgICAgIGBoYXMgZHVwbGljYXRlIGF0dHJpYnV0ZXMgb24gYW4gZWxlbWVudCB0YWcuIEZvciBleGFtcGxlIGAgK1xuICAgICAgICAgICAgYFwiPGlucHV0ID9kaXNhYmxlZD1cXCR7dHJ1ZX0gP2Rpc2FibGVkPVxcJHtmYWxzZX0+XCIgY29udGFpbnMgYSBgICtcbiAgICAgICAgICAgIGBkdXBsaWNhdGUgXCJkaXNhYmxlZFwiIGF0dHJpYnV0ZS4gVGhlIGVycm9yIHdhcyBkZXRlY3RlZCBpbiBgICtcbiAgICAgICAgICAgIGB0aGUgZm9sbG93aW5nIHRlbXBsYXRlOiBcXG5gICtcbiAgICAgICAgICAgICdgJyArXG4gICAgICAgICAgICBzdHJpbmdzLmpvaW4oJyR7Li4ufScpICtcbiAgICAgICAgICAgICdgJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdlIGNvdWxkIHNldCB3YWxrZXIuY3VycmVudE5vZGUgdG8gYW5vdGhlciBub2RlIGhlcmUgdG8gcHJldmVudCBhIG1lbW9yeVxuICAgIC8vIGxlYWssIGJ1dCBldmVyeSB0aW1lIHdlIHByZXBhcmUgYSB0ZW1wbGF0ZSwgd2UgaW1tZWRpYXRlbHkgcmVuZGVyIGl0XG4gICAgLy8gYW5kIHJlLXVzZSB0aGUgd2Fsa2VyIGluIG5ldyBUZW1wbGF0ZUluc3RhbmNlLl9jbG9uZSgpLlxuICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICBraW5kOiAndGVtcGxhdGUgcHJlcCcsXG4gICAgICAgIHRlbXBsYXRlOiB0aGlzLFxuICAgICAgICBjbG9uYWJsZVRlbXBsYXRlOiB0aGlzLmVsLFxuICAgICAgICBwYXJ0czogdGhpcy5wYXJ0cyxcbiAgICAgICAgc3RyaW5ncyxcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gT3ZlcnJpZGRlbiB2aWEgYGxpdEh0bWxQb2x5ZmlsbFN1cHBvcnRgIHRvIHByb3ZpZGUgcGxhdGZvcm0gc3VwcG9ydC5cbiAgLyoqIEBub2NvbGxhcHNlICovXG4gIHN0YXRpYyBjcmVhdGVFbGVtZW50KGh0bWw6IFRydXN0ZWRIVE1MLCBfb3B0aW9ucz86IFJlbmRlck9wdGlvbnMpIHtcbiAgICBjb25zdCBlbCA9IGQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICBlbC5pbm5lckhUTUwgPSBodG1sIGFzIHVua25vd24gYXMgc3RyaW5nO1xuICAgIHJldHVybiBlbDtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERpc2Nvbm5lY3RhYmxlIHtcbiAgXyRwYXJlbnQ/OiBEaXNjb25uZWN0YWJsZTtcbiAgXyRkaXNjb25uZWN0YWJsZUNoaWxkcmVuPzogU2V0PERpc2Nvbm5lY3RhYmxlPjtcbiAgLy8gUmF0aGVyIHRoYW4gaG9sZCBjb25uZWN0aW9uIHN0YXRlIG9uIGluc3RhbmNlcywgRGlzY29ubmVjdGFibGVzIHJlY3Vyc2l2ZWx5XG4gIC8vIGZldGNoIHRoZSBjb25uZWN0aW9uIHN0YXRlIGZyb20gdGhlIFJvb3RQYXJ0IHRoZXkgYXJlIGNvbm5lY3RlZCBpbiB2aWFcbiAgLy8gZ2V0dGVycyB1cCB0aGUgRGlzY29ubmVjdGFibGUgdHJlZSB2aWEgXyRwYXJlbnQgcmVmZXJlbmNlcy4gVGhpcyBwdXNoZXMgdGhlXG4gIC8vIGNvc3Qgb2YgdHJhY2tpbmcgdGhlIGlzQ29ubmVjdGVkIHN0YXRlIHRvIGBBc3luY0RpcmVjdGl2ZXNgLCBhbmQgYXZvaWRzXG4gIC8vIG5lZWRpbmcgdG8gcGFzcyBhbGwgRGlzY29ubmVjdGFibGVzIChwYXJ0cywgdGVtcGxhdGUgaW5zdGFuY2VzLCBhbmRcbiAgLy8gZGlyZWN0aXZlcykgdGhlaXIgY29ubmVjdGlvbiBzdGF0ZSBlYWNoIHRpbWUgaXQgY2hhbmdlcywgd2hpY2ggd291bGQgYmVcbiAgLy8gY29zdGx5IGZvciB0cmVlcyB0aGF0IGhhdmUgbm8gQXN5bmNEaXJlY3RpdmVzLlxuICBfJGlzQ29ubmVjdGVkOiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRGlyZWN0aXZlKFxuICBwYXJ0OiBDaGlsZFBhcnQgfCBBdHRyaWJ1dGVQYXJ0IHwgRWxlbWVudFBhcnQsXG4gIHZhbHVlOiB1bmtub3duLFxuICBwYXJlbnQ6IERpcmVjdGl2ZVBhcmVudCA9IHBhcnQsXG4gIGF0dHJpYnV0ZUluZGV4PzogbnVtYmVyXG4pOiB1bmtub3duIHtcbiAgLy8gQmFpbCBlYXJseSBpZiB0aGUgdmFsdWUgaXMgZXhwbGljaXRseSBub0NoYW5nZS4gTm90ZSwgdGhpcyBtZWFucyBhbnlcbiAgLy8gbmVzdGVkIGRpcmVjdGl2ZSBpcyBzdGlsbCBhdHRhY2hlZCBhbmQgaXMgbm90IHJ1bi5cbiAgaWYgKHZhbHVlID09PSBub0NoYW5nZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBsZXQgY3VycmVudERpcmVjdGl2ZSA9XG4gICAgYXR0cmlidXRlSW5kZXggIT09IHVuZGVmaW5lZFxuICAgICAgPyAocGFyZW50IGFzIEF0dHJpYnV0ZVBhcnQpLl9fZGlyZWN0aXZlcz8uW2F0dHJpYnV0ZUluZGV4XVxuICAgICAgOiAocGFyZW50IGFzIENoaWxkUGFydCB8IEVsZW1lbnRQYXJ0IHwgRGlyZWN0aXZlKS5fX2RpcmVjdGl2ZTtcbiAgY29uc3QgbmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yID0gaXNQcmltaXRpdmUodmFsdWUpXG4gICAgPyB1bmRlZmluZWRcbiAgICA6IC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gICAgICAodmFsdWUgYXMgRGlyZWN0aXZlUmVzdWx0KVsnXyRsaXREaXJlY3RpdmUkJ107XG4gIGlmIChjdXJyZW50RGlyZWN0aXZlPy5jb25zdHJ1Y3RvciAhPT0gbmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yKSB7XG4gICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICBjdXJyZW50RGlyZWN0aXZlPy5bJ18kbm90aWZ5RGlyZWN0aXZlQ29ubmVjdGlvbkNoYW5nZWQnXT8uKGZhbHNlKTtcbiAgICBpZiAobmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnREaXJlY3RpdmUgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnREaXJlY3RpdmUgPSBuZXcgbmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yKHBhcnQgYXMgUGFydEluZm8pO1xuICAgICAgY3VycmVudERpcmVjdGl2ZS5fJGluaXRpYWxpemUocGFydCwgcGFyZW50LCBhdHRyaWJ1dGVJbmRleCk7XG4gICAgfVxuICAgIGlmIChhdHRyaWJ1dGVJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAoKHBhcmVudCBhcyBBdHRyaWJ1dGVQYXJ0KS5fX2RpcmVjdGl2ZXMgPz89IFtdKVthdHRyaWJ1dGVJbmRleF0gPVxuICAgICAgICBjdXJyZW50RGlyZWN0aXZlO1xuICAgIH0gZWxzZSB7XG4gICAgICAocGFyZW50IGFzIENoaWxkUGFydCB8IERpcmVjdGl2ZSkuX19kaXJlY3RpdmUgPSBjdXJyZW50RGlyZWN0aXZlO1xuICAgIH1cbiAgfVxuICBpZiAoY3VycmVudERpcmVjdGl2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFsdWUgPSByZXNvbHZlRGlyZWN0aXZlKFxuICAgICAgcGFydCxcbiAgICAgIGN1cnJlbnREaXJlY3RpdmUuXyRyZXNvbHZlKHBhcnQsICh2YWx1ZSBhcyBEaXJlY3RpdmVSZXN1bHQpLnZhbHVlcyksXG4gICAgICBjdXJyZW50RGlyZWN0aXZlLFxuICAgICAgYXR0cmlidXRlSW5kZXhcbiAgICApO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IHR5cGUge1RlbXBsYXRlSW5zdGFuY2V9O1xuLyoqXG4gKiBBbiB1cGRhdGVhYmxlIGluc3RhbmNlIG9mIGEgVGVtcGxhdGUuIEhvbGRzIHJlZmVyZW5jZXMgdG8gdGhlIFBhcnRzIHVzZWQgdG9cbiAqIHVwZGF0ZSB0aGUgdGVtcGxhdGUgaW5zdGFuY2UuXG4gKi9cbmNsYXNzIFRlbXBsYXRlSW5zdGFuY2UgaW1wbGVtZW50cyBEaXNjb25uZWN0YWJsZSB7XG4gIF8kdGVtcGxhdGU6IFRlbXBsYXRlO1xuICBfJHBhcnRzOiBBcnJheTxQYXJ0IHwgdW5kZWZpbmVkPiA9IFtdO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRwYXJlbnQ6IENoaWxkUGFydDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJGRpc2Nvbm5lY3RhYmxlQ2hpbGRyZW4/OiBTZXQ8RGlzY29ubmVjdGFibGU+ID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHRlbXBsYXRlOiBUZW1wbGF0ZSwgcGFyZW50OiBDaGlsZFBhcnQpIHtcbiAgICB0aGlzLl8kdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICB0aGlzLl8kcGFyZW50ID0gcGFyZW50O1xuICB9XG5cbiAgLy8gQ2FsbGVkIGJ5IENoaWxkUGFydCBwYXJlbnROb2RlIGdldHRlclxuICBnZXQgcGFyZW50Tm9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fJHBhcmVudC5wYXJlbnROb2RlO1xuICB9XG5cbiAgLy8gU2VlIGNvbW1lbnQgaW4gRGlzY29ubmVjdGFibGUgaW50ZXJmYWNlIGZvciB3aHkgdGhpcyBpcyBhIGdldHRlclxuICBnZXQgXyRpc0Nvbm5lY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fJHBhcmVudC5fJGlzQ29ubmVjdGVkO1xuICB9XG5cbiAgLy8gVGhpcyBtZXRob2QgaXMgc2VwYXJhdGUgZnJvbSB0aGUgY29uc3RydWN0b3IgYmVjYXVzZSB3ZSBuZWVkIHRvIHJldHVybiBhXG4gIC8vIERvY3VtZW50RnJhZ21lbnQgYW5kIHdlIGRvbid0IHdhbnQgdG8gaG9sZCBvbnRvIGl0IHdpdGggYW4gaW5zdGFuY2UgZmllbGQuXG4gIF9jbG9uZShvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkKSB7XG4gICAgY29uc3Qge1xuICAgICAgZWw6IHtjb250ZW50fSxcbiAgICAgIHBhcnRzOiBwYXJ0cyxcbiAgICB9ID0gdGhpcy5fJHRlbXBsYXRlO1xuICAgIGNvbnN0IGZyYWdtZW50ID0gKG9wdGlvbnM/LmNyZWF0aW9uU2NvcGUgPz8gZCkuaW1wb3J0Tm9kZShjb250ZW50LCB0cnVlKTtcbiAgICB3YWxrZXIuY3VycmVudE5vZGUgPSBmcmFnbWVudDtcblxuICAgIGxldCBub2RlID0gd2Fsa2VyLm5leHROb2RlKCkhO1xuICAgIGxldCBub2RlSW5kZXggPSAwO1xuICAgIGxldCBwYXJ0SW5kZXggPSAwO1xuICAgIGxldCB0ZW1wbGF0ZVBhcnQgPSBwYXJ0c1swXTtcblxuICAgIHdoaWxlICh0ZW1wbGF0ZVBhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG5vZGVJbmRleCA9PT0gdGVtcGxhdGVQYXJ0LmluZGV4KSB7XG4gICAgICAgIGxldCBwYXJ0OiBQYXJ0IHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGVtcGxhdGVQYXJ0LnR5cGUgPT09IENISUxEX1BBUlQpIHtcbiAgICAgICAgICBwYXJ0ID0gbmV3IENoaWxkUGFydChcbiAgICAgICAgICAgIG5vZGUgYXMgSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICBub2RlLm5leHRTaWJsaW5nLFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHRlbXBsYXRlUGFydC50eXBlID09PSBBVFRSSUJVVEVfUEFSVCkge1xuICAgICAgICAgIHBhcnQgPSBuZXcgdGVtcGxhdGVQYXJ0LmN0b3IoXG4gICAgICAgICAgICBub2RlIGFzIEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgdGVtcGxhdGVQYXJ0Lm5hbWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVBhcnQuc3RyaW5ncyxcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICh0ZW1wbGF0ZVBhcnQudHlwZSA9PT0gRUxFTUVOVF9QQVJUKSB7XG4gICAgICAgICAgcGFydCA9IG5ldyBFbGVtZW50UGFydChub2RlIGFzIEhUTUxFbGVtZW50LCB0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl8kcGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgdGVtcGxhdGVQYXJ0ID0gcGFydHNbKytwYXJ0SW5kZXhdO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVJbmRleCAhPT0gdGVtcGxhdGVQYXJ0Py5pbmRleCkge1xuICAgICAgICBub2RlID0gd2Fsa2VyLm5leHROb2RlKCkhO1xuICAgICAgICBub2RlSW5kZXgrKztcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gV2UgbmVlZCB0byBzZXQgdGhlIGN1cnJlbnROb2RlIGF3YXkgZnJvbSB0aGUgY2xvbmVkIHRyZWUgc28gdGhhdCB3ZVxuICAgIC8vIGRvbid0IGhvbGQgb250byB0aGUgdHJlZSBldmVuIGlmIHRoZSB0cmVlIGlzIGRldGFjaGVkIGFuZCBzaG91bGQgYmVcbiAgICAvLyBmcmVlZC5cbiAgICB3YWxrZXIuY3VycmVudE5vZGUgPSBkO1xuICAgIHJldHVybiBmcmFnbWVudDtcbiAgfVxuXG4gIF91cGRhdGUodmFsdWVzOiBBcnJheTx1bmtub3duPikge1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgdGhpcy5fJHBhcnRzKSB7XG4gICAgICBpZiAocGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICAgIGtpbmQ6ICdzZXQgcGFydCcsXG4gICAgICAgICAgICBwYXJ0LFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHZhbHVlSW5kZXg6IGksXG4gICAgICAgICAgICB2YWx1ZXMsXG4gICAgICAgICAgICB0ZW1wbGF0ZUluc3RhbmNlOiB0aGlzLFxuICAgICAgICAgIH0pO1xuICAgICAgICBpZiAoKHBhcnQgYXMgQXR0cmlidXRlUGFydCkuc3RyaW5ncyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgKHBhcnQgYXMgQXR0cmlidXRlUGFydCkuXyRzZXRWYWx1ZSh2YWx1ZXMsIHBhcnQgYXMgQXR0cmlidXRlUGFydCwgaSk7XG4gICAgICAgICAgLy8gVGhlIG51bWJlciBvZiB2YWx1ZXMgdGhlIHBhcnQgY29uc3VtZXMgaXMgcGFydC5zdHJpbmdzLmxlbmd0aCAtIDFcbiAgICAgICAgICAvLyBzaW5jZSB2YWx1ZXMgYXJlIGluIGJldHdlZW4gdGVtcGxhdGUgc3BhbnMuIFdlIGluY3JlbWVudCBpIGJ5IDFcbiAgICAgICAgICAvLyBsYXRlciBpbiB0aGUgbG9vcCwgc28gaW5jcmVtZW50IGl0IGJ5IHBhcnQuc3RyaW5ncy5sZW5ndGggLSAyIGhlcmVcbiAgICAgICAgICBpICs9IChwYXJ0IGFzIEF0dHJpYnV0ZVBhcnQpLnN0cmluZ3MhLmxlbmd0aCAtIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFydC5fJHNldFZhbHVlKHZhbHVlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9XG4gIH1cbn1cblxuLypcbiAqIFBhcnRzXG4gKi9cbnR5cGUgQXR0cmlidXRlVGVtcGxhdGVQYXJ0ID0ge1xuICByZWFkb25seSB0eXBlOiB0eXBlb2YgQVRUUklCVVRFX1BBUlQ7XG4gIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgY3RvcjogdHlwZW9mIEF0dHJpYnV0ZVBhcnQ7XG4gIHJlYWRvbmx5IHN0cmluZ3M6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbn07XG50eXBlIENoaWxkVGVtcGxhdGVQYXJ0ID0ge1xuICByZWFkb25seSB0eXBlOiB0eXBlb2YgQ0hJTERfUEFSVDtcbiAgcmVhZG9ubHkgaW5kZXg6IG51bWJlcjtcbn07XG50eXBlIEVsZW1lbnRUZW1wbGF0ZVBhcnQgPSB7XG4gIHJlYWRvbmx5IHR5cGU6IHR5cGVvZiBFTEVNRU5UX1BBUlQ7XG4gIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG59O1xudHlwZSBDb21tZW50VGVtcGxhdGVQYXJ0ID0ge1xuICByZWFkb25seSB0eXBlOiB0eXBlb2YgQ09NTUVOVF9QQVJUO1xuICByZWFkb25seSBpbmRleDogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBBIFRlbXBsYXRlUGFydCByZXByZXNlbnRzIGEgZHluYW1pYyBwYXJ0IGluIGEgdGVtcGxhdGUsIGJlZm9yZSB0aGUgdGVtcGxhdGVcbiAqIGlzIGluc3RhbnRpYXRlZC4gV2hlbiBhIHRlbXBsYXRlIGlzIGluc3RhbnRpYXRlZCBQYXJ0cyBhcmUgY3JlYXRlZCBmcm9tXG4gKiBUZW1wbGF0ZVBhcnRzLlxuICovXG50eXBlIFRlbXBsYXRlUGFydCA9XG4gIHwgQ2hpbGRUZW1wbGF0ZVBhcnRcbiAgfCBBdHRyaWJ1dGVUZW1wbGF0ZVBhcnRcbiAgfCBFbGVtZW50VGVtcGxhdGVQYXJ0XG4gIHwgQ29tbWVudFRlbXBsYXRlUGFydDtcblxuZXhwb3J0IHR5cGUgUGFydCA9XG4gIHwgQ2hpbGRQYXJ0XG4gIHwgQXR0cmlidXRlUGFydFxuICB8IFByb3BlcnR5UGFydFxuICB8IEJvb2xlYW5BdHRyaWJ1dGVQYXJ0XG4gIHwgRWxlbWVudFBhcnRcbiAgfCBFdmVudFBhcnQ7XG5cbmV4cG9ydCB0eXBlIHtDaGlsZFBhcnR9O1xuY2xhc3MgQ2hpbGRQYXJ0IGltcGxlbWVudHMgRGlzY29ubmVjdGFibGUge1xuICByZWFkb25seSB0eXBlID0gQ0hJTERfUEFSVDtcbiAgcmVhZG9ubHkgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgXyRjb21taXR0ZWRWYWx1ZTogdW5rbm93biA9IG5vdGhpbmc7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX19kaXJlY3RpdmU/OiBEaXJlY3RpdmU7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRzdGFydE5vZGU6IENoaWxkTm9kZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJGVuZE5vZGU6IENoaWxkTm9kZSB8IG51bGw7XG4gIHByaXZhdGUgX3RleHRTYW5pdGl6ZXI6IFZhbHVlU2FuaXRpemVyIHwgdW5kZWZpbmVkO1xuICAvKiogQGludGVybmFsICovXG4gIF8kcGFyZW50OiBEaXNjb25uZWN0YWJsZSB8IHVuZGVmaW5lZDtcbiAgLyoqXG4gICAqIENvbm5lY3Rpb24gc3RhdGUgZm9yIFJvb3RQYXJ0cyBvbmx5IChpLmUuIENoaWxkUGFydCB3aXRob3V0IF8kcGFyZW50XG4gICAqIHJldHVybmVkIGZyb20gdG9wLWxldmVsIGByZW5kZXJgKS4gVGhpcyBmaWVsZCBpcyB1bnVzZWQgb3RoZXJ3aXNlLiBUaGVcbiAgICogaW50ZW50aW9uIHdvdWxkIGJlIGNsZWFyZXIgaWYgd2UgbWFkZSBgUm9vdFBhcnRgIGEgc3ViY2xhc3Mgb2YgYENoaWxkUGFydGBcbiAgICogd2l0aCB0aGlzIGZpZWxkIChhbmQgYSBkaWZmZXJlbnQgXyRpc0Nvbm5lY3RlZCBnZXR0ZXIpLCBidXQgdGhlIHN1YmNsYXNzXG4gICAqIGNhdXNlZCBhIHBlcmYgcmVncmVzc2lvbiwgcG9zc2libHkgZHVlIHRvIG1ha2luZyBjYWxsIHNpdGVzIHBvbHltb3JwaGljLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9faXNDb25uZWN0ZWQ6IGJvb2xlYW47XG5cbiAgLy8gU2VlIGNvbW1lbnQgaW4gRGlzY29ubmVjdGFibGUgaW50ZXJmYWNlIGZvciB3aHkgdGhpcyBpcyBhIGdldHRlclxuICBnZXQgXyRpc0Nvbm5lY3RlZCgpIHtcbiAgICAvLyBDaGlsZFBhcnRzIHRoYXQgYXJlIG5vdCBhdCB0aGUgcm9vdCBzaG91bGQgYWx3YXlzIGJlIGNyZWF0ZWQgd2l0aCBhXG4gICAgLy8gcGFyZW50OyBvbmx5IFJvb3RDaGlsZE5vZGUncyB3b24ndCwgc28gdGhleSByZXR1cm4gdGhlIGxvY2FsIGlzQ29ubmVjdGVkXG4gICAgLy8gc3RhdGVcbiAgICByZXR1cm4gdGhpcy5fJHBhcmVudD8uXyRpc0Nvbm5lY3RlZCA/PyB0aGlzLl9faXNDb25uZWN0ZWQ7XG4gIH1cblxuICAvLyBUaGUgZm9sbG93aW5nIGZpZWxkcyB3aWxsIGJlIHBhdGNoZWQgb250byBDaGlsZFBhcnRzIHdoZW4gcmVxdWlyZWQgYnlcbiAgLy8gQXN5bmNEaXJlY3RpdmVcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJGRpc2Nvbm5lY3RhYmxlQ2hpbGRyZW4/OiBTZXQ8RGlzY29ubmVjdGFibGU+ID0gdW5kZWZpbmVkO1xuICAvKiogQGludGVybmFsICovXG4gIF8kbm90aWZ5Q29ubmVjdGlvbkNoYW5nZWQ/KFxuICAgIGlzQ29ubmVjdGVkOiBib29sZWFuLFxuICAgIHJlbW92ZUZyb21QYXJlbnQ/OiBib29sZWFuLFxuICAgIGZyb20/OiBudW1iZXJcbiAgKTogdm9pZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJHJlcGFyZW50RGlzY29ubmVjdGFibGVzPyhwYXJlbnQ6IERpc2Nvbm5lY3RhYmxlKTogdm9pZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzdGFydE5vZGU6IENoaWxkTm9kZSxcbiAgICBlbmROb2RlOiBDaGlsZE5vZGUgfCBudWxsLFxuICAgIHBhcmVudDogVGVtcGxhdGVJbnN0YW5jZSB8IENoaWxkUGFydCB8IHVuZGVmaW5lZCxcbiAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHRoaXMuXyRzdGFydE5vZGUgPSBzdGFydE5vZGU7XG4gICAgdGhpcy5fJGVuZE5vZGUgPSBlbmROb2RlO1xuICAgIHRoaXMuXyRwYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAvLyBOb3RlIF9faXNDb25uZWN0ZWQgaXMgb25seSBldmVyIGFjY2Vzc2VkIG9uIFJvb3RQYXJ0cyAoaS5lLiB3aGVuIHRoZXJlIGlzXG4gICAgLy8gbm8gXyRwYXJlbnQpOyB0aGUgdmFsdWUgb24gYSBub24tcm9vdC1wYXJ0IGlzIFwiZG9uJ3QgY2FyZVwiLCBidXQgY2hlY2tpbmdcbiAgICAvLyBmb3IgcGFyZW50IHdvdWxkIGJlIG1vcmUgY29kZVxuICAgIHRoaXMuX19pc0Nvbm5lY3RlZCA9IG9wdGlvbnM/LmlzQ29ubmVjdGVkID8/IHRydWU7XG4gICAgaWYgKEVOQUJMRV9FWFRSQV9TRUNVUklUWV9IT09LUykge1xuICAgICAgLy8gRXhwbGljaXRseSBpbml0aWFsaXplIGZvciBjb25zaXN0ZW50IGNsYXNzIHNoYXBlLlxuICAgICAgdGhpcy5fdGV4dFNhbml0aXplciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIHBhcmVudCBub2RlIGludG8gd2hpY2ggdGhlIHBhcnQgcmVuZGVycyBpdHMgY29udGVudC5cbiAgICpcbiAgICogQSBDaGlsZFBhcnQncyBjb250ZW50IGNvbnNpc3RzIG9mIGEgcmFuZ2Ugb2YgYWRqYWNlbnQgY2hpbGQgbm9kZXMgb2ZcbiAgICogYC5wYXJlbnROb2RlYCwgcG9zc2libHkgYm9yZGVyZWQgYnkgJ21hcmtlciBub2RlcycgKGAuc3RhcnROb2RlYCBhbmRcbiAgICogYC5lbmROb2RlYCkuXG4gICAqXG4gICAqIC0gSWYgYm90aCBgLnN0YXJ0Tm9kZWAgYW5kIGAuZW5kTm9kZWAgYXJlIG5vbi1udWxsLCB0aGVuIHRoZSBwYXJ0J3MgY29udGVudFxuICAgKiBjb25zaXN0cyBvZiBhbGwgc2libGluZ3MgYmV0d2VlbiBgLnN0YXJ0Tm9kZWAgYW5kIGAuZW5kTm9kZWAsIGV4Y2x1c2l2ZWx5LlxuICAgKlxuICAgKiAtIElmIGAuc3RhcnROb2RlYCBpcyBub24tbnVsbCBidXQgYC5lbmROb2RlYCBpcyBudWxsLCB0aGVuIHRoZSBwYXJ0J3NcbiAgICogY29udGVudCBjb25zaXN0cyBvZiBhbGwgc2libGluZ3MgZm9sbG93aW5nIGAuc3RhcnROb2RlYCwgdXAgdG8gYW5kXG4gICAqIGluY2x1ZGluZyB0aGUgbGFzdCBjaGlsZCBvZiBgLnBhcmVudE5vZGVgLiBJZiBgLmVuZE5vZGVgIGlzIG5vbi1udWxsLCB0aGVuXG4gICAqIGAuc3RhcnROb2RlYCB3aWxsIGFsd2F5cyBiZSBub24tbnVsbC5cbiAgICpcbiAgICogLSBJZiBib3RoIGAuZW5kTm9kZWAgYW5kIGAuc3RhcnROb2RlYCBhcmUgbnVsbCwgdGhlbiB0aGUgcGFydCdzIGNvbnRlbnRcbiAgICogY29uc2lzdHMgb2YgYWxsIGNoaWxkIG5vZGVzIG9mIGAucGFyZW50Tm9kZWAuXG4gICAqL1xuICBnZXQgcGFyZW50Tm9kZSgpOiBOb2RlIHtcbiAgICBsZXQgcGFyZW50Tm9kZTogTm9kZSA9IHdyYXAodGhpcy5fJHN0YXJ0Tm9kZSkucGFyZW50Tm9kZSE7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5fJHBhcmVudDtcbiAgICBpZiAoXG4gICAgICBwYXJlbnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgcGFyZW50Tm9kZT8ubm9kZVR5cGUgPT09IDExIC8qIE5vZGUuRE9DVU1FTlRfRlJBR01FTlQgKi9cbiAgICApIHtcbiAgICAgIC8vIElmIHRoZSBwYXJlbnROb2RlIGlzIGEgRG9jdW1lbnRGcmFnbWVudCwgaXQgbWF5IGJlIGJlY2F1c2UgdGhlIERPTSBpc1xuICAgICAgLy8gc3RpbGwgaW4gdGhlIGNsb25lZCBmcmFnbWVudCBkdXJpbmcgaW5pdGlhbCByZW5kZXI7IGlmIHNvLCBnZXQgdGhlIHJlYWxcbiAgICAgIC8vIHBhcmVudE5vZGUgdGhlIHBhcnQgd2lsbCBiZSBjb21taXR0ZWQgaW50byBieSBhc2tpbmcgdGhlIHBhcmVudC5cbiAgICAgIHBhcmVudE5vZGUgPSAocGFyZW50IGFzIENoaWxkUGFydCB8IFRlbXBsYXRlSW5zdGFuY2UpLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnROb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBwYXJ0J3MgbGVhZGluZyBtYXJrZXIgbm9kZSwgaWYgYW55LiBTZWUgYC5wYXJlbnROb2RlYCBmb3IgbW9yZVxuICAgKiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGdldCBzdGFydE5vZGUoKTogTm9kZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl8kc3RhcnROb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBwYXJ0J3MgdHJhaWxpbmcgbWFya2VyIG5vZGUsIGlmIGFueS4gU2VlIGAucGFyZW50Tm9kZWAgZm9yIG1vcmVcbiAgICogaW5mb3JtYXRpb24uXG4gICAqL1xuICBnZXQgZW5kTm9kZSgpOiBOb2RlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuXyRlbmROb2RlO1xuICB9XG5cbiAgXyRzZXRWYWx1ZSh2YWx1ZTogdW5rbm93biwgZGlyZWN0aXZlUGFyZW50OiBEaXJlY3RpdmVQYXJlbnQgPSB0aGlzKTogdm9pZCB7XG4gICAgaWYgKERFVl9NT0RFICYmIHRoaXMucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVGhpcyBcXGBDaGlsZFBhcnRcXGAgaGFzIG5vIFxcYHBhcmVudE5vZGVcXGAgYW5kIHRoZXJlZm9yZSBjYW5ub3QgYWNjZXB0IGEgdmFsdWUuIFRoaXMgbGlrZWx5IG1lYW5zIHRoZSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIHBhcnQgd2FzIG1hbmlwdWxhdGVkIGluIGFuIHVuc3VwcG9ydGVkIHdheSBvdXRzaWRlIG9mIExpdCdzIGNvbnRyb2wgc3VjaCB0aGF0IHRoZSBwYXJ0J3MgbWFya2VyIG5vZGVzIHdlcmUgZWplY3RlZCBmcm9tIERPTS4gRm9yIGV4YW1wbGUsIHNldHRpbmcgdGhlIGVsZW1lbnQncyBcXGBpbm5lckhUTUxcXGAgb3IgXFxgdGV4dENvbnRlbnRcXGAgY2FuIGRvIHRoaXMuYFxuICAgICAgKTtcbiAgICB9XG4gICAgdmFsdWUgPSByZXNvbHZlRGlyZWN0aXZlKHRoaXMsIHZhbHVlLCBkaXJlY3RpdmVQYXJlbnQpO1xuICAgIGlmIChpc1ByaW1pdGl2ZSh2YWx1ZSkpIHtcbiAgICAgIC8vIE5vbi1yZW5kZXJpbmcgY2hpbGQgdmFsdWVzLiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZXNlIGRvIG5vdCByZW5kZXJcbiAgICAgIC8vIGVtcHR5IHRleHQgbm9kZXMgdG8gYXZvaWQgaXNzdWVzIHdpdGggcHJldmVudGluZyBkZWZhdWx0IDxzbG90PlxuICAgICAgLy8gZmFsbGJhY2sgY29udGVudC5cbiAgICAgIGlmICh2YWx1ZSA9PT0gbm90aGluZyB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICBpZiAodGhpcy5fJGNvbW1pdHRlZFZhbHVlICE9PSBub3RoaW5nKSB7XG4gICAgICAgICAgZGVidWdMb2dFdmVudCAmJlxuICAgICAgICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICAgIGtpbmQ6ICdjb21taXQgbm90aGluZyB0byBjaGlsZCcsXG4gICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLl8kc3RhcnROb2RlLFxuICAgICAgICAgICAgICBlbmQ6IHRoaXMuXyRlbmROb2RlLFxuICAgICAgICAgICAgICBwYXJlbnQ6IHRoaXMuXyRwYXJlbnQsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuXyRjbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IG5vdGhpbmc7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSB0aGlzLl8kY29tbWl0dGVkVmFsdWUgJiYgdmFsdWUgIT09IG5vQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuX2NvbW1pdFRleHQodmFsdWUpO1xuICAgICAgfVxuICAgICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICB9IGVsc2UgaWYgKCh2YWx1ZSBhcyBUZW1wbGF0ZVJlc3VsdClbJ18kbGl0VHlwZSQnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9jb21taXRUZW1wbGF0ZVJlc3VsdCh2YWx1ZSBhcyBUZW1wbGF0ZVJlc3VsdCk7XG4gICAgfSBlbHNlIGlmICgodmFsdWUgYXMgTm9kZSkubm9kZVR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKERFVl9NT0RFICYmIHRoaXMub3B0aW9ucz8uaG9zdCA9PT0gdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY29tbWl0VGV4dChcbiAgICAgICAgICBgW3Byb2JhYmxlIG1pc3Rha2U6IHJlbmRlcmVkIGEgdGVtcGxhdGUncyBob3N0IGluIGl0c2VsZiBgICtcbiAgICAgICAgICAgIGAoY29tbW9ubHkgY2F1c2VkIGJ5IHdyaXRpbmcgXFwke3RoaXN9IGluIGEgdGVtcGxhdGVdYFxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYEF0dGVtcHRlZCB0byByZW5kZXIgdGhlIHRlbXBsYXRlIGhvc3RgLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGBpbnNpZGUgaXRzZWxmLiBUaGlzIGlzIGFsbW9zdCBhbHdheXMgYSBtaXN0YWtlLCBhbmQgaW4gZGV2IG1vZGUgYCxcbiAgICAgICAgICBgd2UgcmVuZGVyIHNvbWUgd2FybmluZyB0ZXh0LiBJbiBwcm9kdWN0aW9uIGhvd2V2ZXIsIHdlJ2xsIGAsXG4gICAgICAgICAgYHJlbmRlciBpdCwgd2hpY2ggd2lsbCB1c3VhbGx5IHJlc3VsdCBpbiBhbiBlcnJvciwgYW5kIHNvbWV0aW1lcyBgLFxuICAgICAgICAgIGBpbiB0aGUgZWxlbWVudCBkaXNhcHBlYXJpbmcgZnJvbSB0aGUgRE9NLmBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29tbWl0Tm9kZSh2YWx1ZSBhcyBOb2RlKTtcbiAgICB9IGVsc2UgaWYgKGlzSXRlcmFibGUodmFsdWUpKSB7XG4gICAgICB0aGlzLl9jb21taXRJdGVyYWJsZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZhbGxiYWNrLCB3aWxsIHJlbmRlciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gICAgICB0aGlzLl9jb21taXRUZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbnNlcnQ8VCBleHRlbmRzIE5vZGU+KG5vZGU6IFQpIHtcbiAgICByZXR1cm4gd3JhcCh3cmFwKHRoaXMuXyRzdGFydE5vZGUpLnBhcmVudE5vZGUhKS5pbnNlcnRCZWZvcmUoXG4gICAgICBub2RlLFxuICAgICAgdGhpcy5fJGVuZE5vZGVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tbWl0Tm9kZSh2YWx1ZTogTm9kZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl8kY29tbWl0dGVkVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl8kY2xlYXIoKTtcbiAgICAgIGlmIChcbiAgICAgICAgRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTICYmXG4gICAgICAgIHNhbml0aXplckZhY3RvcnlJbnRlcm5hbCAhPT0gbm9vcFNhbml0aXplclxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGVOYW1lID0gdGhpcy5fJHN0YXJ0Tm9kZS5wYXJlbnROb2RlPy5ub2RlTmFtZTtcbiAgICAgICAgaWYgKHBhcmVudE5vZGVOYW1lID09PSAnU1RZTEUnIHx8IHBhcmVudE5vZGVOYW1lID09PSAnU0NSSVBUJykge1xuICAgICAgICAgIGxldCBtZXNzYWdlID0gJ0ZvcmJpZGRlbic7XG4gICAgICAgICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZU5hbWUgPT09ICdTVFlMRScpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICAgICAgYExpdCBkb2VzIG5vdCBzdXBwb3J0IGJpbmRpbmcgaW5zaWRlIHN0eWxlIG5vZGVzLiBgICtcbiAgICAgICAgICAgICAgICBgVGhpcyBpcyBhIHNlY3VyaXR5IHJpc2ssIGFzIHN0eWxlIGluamVjdGlvbiBhdHRhY2tzIGNhbiBgICtcbiAgICAgICAgICAgICAgICBgZXhmaWx0cmF0ZSBkYXRhIGFuZCBzcG9vZiBVSXMuIGAgK1xuICAgICAgICAgICAgICAgIGBDb25zaWRlciBpbnN0ZWFkIHVzaW5nIGNzc1xcYC4uLlxcYCBsaXRlcmFscyBgICtcbiAgICAgICAgICAgICAgICBgdG8gY29tcG9zZSBzdHlsZXMsIGFuZCBkbyBkeW5hbWljIHN0eWxpbmcgd2l0aCBgICtcbiAgICAgICAgICAgICAgICBgY3NzIGN1c3RvbSBwcm9wZXJ0aWVzLCA6OnBhcnRzLCA8c2xvdD5zLCBgICtcbiAgICAgICAgICAgICAgICBgYW5kIGJ5IG11dGF0aW5nIHRoZSBET00gcmF0aGVyIHRoYW4gc3R5bGVzaGVldHMuYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPVxuICAgICAgICAgICAgICAgIGBMaXQgZG9lcyBub3Qgc3VwcG9ydCBiaW5kaW5nIGluc2lkZSBzY3JpcHQgbm9kZXMuIGAgK1xuICAgICAgICAgICAgICAgIGBUaGlzIGlzIGEgc2VjdXJpdHkgcmlzaywgYXMgaXQgY291bGQgYWxsb3cgYXJiaXRyYXJ5IGAgK1xuICAgICAgICAgICAgICAgIGBjb2RlIGV4ZWN1dGlvbi5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAga2luZDogJ2NvbW1pdCBub2RlJyxcbiAgICAgICAgICBzdGFydDogdGhpcy5fJHN0YXJ0Tm9kZSxcbiAgICAgICAgICBwYXJlbnQ6IHRoaXMuXyRwYXJlbnQsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSB0aGlzLl9pbnNlcnQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbW1pdFRleHQodmFsdWU6IHVua25vd24pOiB2b2lkIHtcbiAgICAvLyBJZiB0aGUgY29tbWl0dGVkIHZhbHVlIGlzIGEgcHJpbWl0aXZlIGl0IG1lYW5zIHdlIGNhbGxlZCBfY29tbWl0VGV4dCBvblxuICAgIC8vIHRoZSBwcmV2aW91cyByZW5kZXIsIGFuZCB3ZSBrbm93IHRoYXQgdGhpcy5fJHN0YXJ0Tm9kZS5uZXh0U2libGluZyBpcyBhXG4gICAgLy8gVGV4dCBub2RlLiBXZSBjYW4gbm93IGp1c3QgcmVwbGFjZSB0aGUgdGV4dCBjb250ZW50ICguZGF0YSkgb2YgdGhlIG5vZGUuXG4gICAgaWYgKFxuICAgICAgdGhpcy5fJGNvbW1pdHRlZFZhbHVlICE9PSBub3RoaW5nICYmXG4gICAgICBpc1ByaW1pdGl2ZSh0aGlzLl8kY29tbWl0dGVkVmFsdWUpXG4gICAgKSB7XG4gICAgICBjb25zdCBub2RlID0gd3JhcCh0aGlzLl8kc3RhcnROb2RlKS5uZXh0U2libGluZyBhcyBUZXh0O1xuICAgICAgaWYgKEVOQUJMRV9FWFRSQV9TRUNVUklUWV9IT09LUykge1xuICAgICAgICBpZiAodGhpcy5fdGV4dFNhbml0aXplciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5fdGV4dFNhbml0aXplciA9IGNyZWF0ZVNhbml0aXplcihub2RlLCAnZGF0YScsICdwcm9wZXJ0eScpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gdGhpcy5fdGV4dFNhbml0aXplcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICAgIGtpbmQ6ICdjb21taXQgdGV4dCcsXG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgKG5vZGUgYXMgVGV4dCkuZGF0YSA9IHZhbHVlIGFzIHN0cmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKEVOQUJMRV9FWFRSQV9TRUNVUklUWV9IT09LUykge1xuICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgICB0aGlzLl9jb21taXROb2RlKHRleHROb2RlKTtcbiAgICAgICAgLy8gV2hlbiBzZXR0aW5nIHRleHQgY29udGVudCwgZm9yIHNlY3VyaXR5IHB1cnBvc2VzIGl0IG1hdHRlcnMgYSBsb3RcbiAgICAgICAgLy8gd2hhdCB0aGUgcGFyZW50IGlzLiBGb3IgZXhhbXBsZSwgPHN0eWxlPiBhbmQgPHNjcmlwdD4gbmVlZCB0byBiZVxuICAgICAgICAvLyBoYW5kbGVkIHdpdGggY2FyZSwgd2hpbGUgPHNwYW4+IGRvZXMgbm90LiBTbyBmaXJzdCB3ZSBuZWVkIHRvIHB1dCBhXG4gICAgICAgIC8vIHRleHQgbm9kZSBpbnRvIHRoZSBkb2N1bWVudCwgdGhlbiB3ZSBjYW4gc2FuaXRpemUgaXRzIGNvbnRlbnQuXG4gICAgICAgIGlmICh0aGlzLl90ZXh0U2FuaXRpemVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLl90ZXh0U2FuaXRpemVyID0gY3JlYXRlU2FuaXRpemVyKHRleHROb2RlLCAnZGF0YScsICdwcm9wZXJ0eScpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gdGhpcy5fdGV4dFNhbml0aXplcih2YWx1ZSk7XG4gICAgICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICAgIGtpbmQ6ICdjb21taXQgdGV4dCcsXG4gICAgICAgICAgICBub2RlOiB0ZXh0Tm9kZSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgIH0pO1xuICAgICAgICB0ZXh0Tm9kZS5kYXRhID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY29tbWl0Tm9kZShkLmNyZWF0ZVRleHROb2RlKHZhbHVlIGFzIHN0cmluZykpO1xuICAgICAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICBraW5kOiAnY29tbWl0IHRleHQnLFxuICAgICAgICAgICAgbm9kZTogd3JhcCh0aGlzLl8kc3RhcnROb2RlKS5uZXh0U2libGluZyBhcyBUZXh0LFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tbWl0VGVtcGxhdGVSZXN1bHQoXG4gICAgcmVzdWx0OiBUZW1wbGF0ZVJlc3VsdCB8IENvbXBpbGVkVGVtcGxhdGVSZXN1bHRcbiAgKTogdm9pZCB7XG4gICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICBjb25zdCB7dmFsdWVzLCBbJ18kbGl0VHlwZSQnXTogdHlwZX0gPSByZXN1bHQ7XG4gICAgLy8gSWYgJGxpdFR5cGUkIGlzIGEgbnVtYmVyLCByZXN1bHQgaXMgYSBwbGFpbiBUZW1wbGF0ZVJlc3VsdCBhbmQgd2UgZ2V0XG4gICAgLy8gdGhlIHRlbXBsYXRlIGZyb20gdGhlIHRlbXBsYXRlIGNhY2hlLiBJZiBub3QsIHJlc3VsdCBpcyBhXG4gICAgLy8gQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdCBhbmQgXyRsaXRUeXBlJCBpcyBhIENvbXBpbGVkVGVtcGxhdGUgYW5kIHdlIG5lZWRcbiAgICAvLyB0byBjcmVhdGUgdGhlIDx0ZW1wbGF0ZT4gZWxlbWVudCB0aGUgZmlyc3QgdGltZSB3ZSBzZWUgaXQuXG4gICAgY29uc3QgdGVtcGxhdGU6IFRlbXBsYXRlIHwgQ29tcGlsZWRUZW1wbGF0ZSA9XG4gICAgICB0eXBlb2YgdHlwZSA9PT0gJ251bWJlcidcbiAgICAgICAgPyB0aGlzLl8kZ2V0VGVtcGxhdGUocmVzdWx0IGFzIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdClcbiAgICAgICAgOiAodHlwZS5lbCA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAodHlwZS5lbCA9IFRlbXBsYXRlLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIHRydXN0RnJvbVRlbXBsYXRlU3RyaW5nKHR5cGUuaCwgdHlwZS5oWzBdKSxcbiAgICAgICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgICApKSxcbiAgICAgICAgICB0eXBlKTtcblxuICAgIGlmICgodGhpcy5fJGNvbW1pdHRlZFZhbHVlIGFzIFRlbXBsYXRlSW5zdGFuY2UpPy5fJHRlbXBsYXRlID09PSB0ZW1wbGF0ZSkge1xuICAgICAgZGVidWdMb2dFdmVudCAmJlxuICAgICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICBraW5kOiAndGVtcGxhdGUgdXBkYXRpbmcnLFxuICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgIGluc3RhbmNlOiB0aGlzLl8kY29tbWl0dGVkVmFsdWUgYXMgVGVtcGxhdGVJbnN0YW5jZSxcbiAgICAgICAgICBwYXJ0czogKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBUZW1wbGF0ZUluc3RhbmNlKS5fJHBhcnRzLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICB2YWx1ZXMsXG4gICAgICAgIH0pO1xuICAgICAgKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBUZW1wbGF0ZUluc3RhbmNlKS5fdXBkYXRlKHZhbHVlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFRlbXBsYXRlSW5zdGFuY2UodGVtcGxhdGUgYXMgVGVtcGxhdGUsIHRoaXMpO1xuICAgICAgY29uc3QgZnJhZ21lbnQgPSBpbnN0YW5jZS5fY2xvbmUodGhpcy5vcHRpb25zKTtcbiAgICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAga2luZDogJ3RlbXBsYXRlIGluc3RhbnRpYXRlZCcsXG4gICAgICAgICAgdGVtcGxhdGUsXG4gICAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgICAgcGFydHM6IGluc3RhbmNlLl8kcGFydHMsXG4gICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgIGZyYWdtZW50LFxuICAgICAgICAgIHZhbHVlcyxcbiAgICAgICAgfSk7XG4gICAgICBpbnN0YW5jZS5fdXBkYXRlKHZhbHVlcyk7XG4gICAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICAgIGtpbmQ6ICd0ZW1wbGF0ZSBpbnN0YW50aWF0ZWQgYW5kIHVwZGF0ZWQnLFxuICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgIGluc3RhbmNlLFxuICAgICAgICAgIHBhcnRzOiBpbnN0YW5jZS5fJHBhcnRzLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICBmcmFnbWVudCxcbiAgICAgICAgICB2YWx1ZXMsXG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5fY29tbWl0Tm9kZShmcmFnbWVudCk7XG4gICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSBpbnN0YW5jZTtcbiAgICB9XG4gIH1cblxuICAvLyBPdmVycmlkZGVuIHZpYSBgbGl0SHRtbFBvbHlmaWxsU3VwcG9ydGAgdG8gcHJvdmlkZSBwbGF0Zm9ybSBzdXBwb3J0LlxuICAvKiogQGludGVybmFsICovXG4gIF8kZ2V0VGVtcGxhdGUocmVzdWx0OiBVbmNvbXBpbGVkVGVtcGxhdGVSZXN1bHQpIHtcbiAgICBsZXQgdGVtcGxhdGUgPSB0ZW1wbGF0ZUNhY2hlLmdldChyZXN1bHQuc3RyaW5ncyk7XG4gICAgaWYgKHRlbXBsYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRlbXBsYXRlQ2FjaGUuc2V0KHJlc3VsdC5zdHJpbmdzLCAodGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUocmVzdWx0KSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICBwcml2YXRlIF9jb21taXRJdGVyYWJsZSh2YWx1ZTogSXRlcmFibGU8dW5rbm93bj4pOiB2b2lkIHtcbiAgICAvLyBGb3IgYW4gSXRlcmFibGUsIHdlIGNyZWF0ZSBhIG5ldyBJbnN0YW5jZVBhcnQgcGVyIGl0ZW0sIHRoZW4gc2V0IGl0c1xuICAgIC8vIHZhbHVlIHRvIHRoZSBpdGVtLiBUaGlzIGlzIGEgbGl0dGxlIGJpdCBvZiBvdmVyaGVhZCBmb3IgZXZlcnkgaXRlbSBpblxuICAgIC8vIGFuIEl0ZXJhYmxlLCBidXQgaXQgbGV0cyB1cyByZWN1cnNlIGVhc2lseSBhbmQgZWZmaWNpZW50bHkgdXBkYXRlIEFycmF5c1xuICAgIC8vIG9mIFRlbXBsYXRlUmVzdWx0cyB0aGF0IHdpbGwgYmUgY29tbW9ubHkgcmV0dXJuZWQgZnJvbSBleHByZXNzaW9ucyBsaWtlOlxuICAgIC8vIGFycmF5Lm1hcCgoaSkgPT4gaHRtbGAke2l9YCksIGJ5IHJldXNpbmcgZXhpc3RpbmcgVGVtcGxhdGVJbnN0YW5jZXMuXG5cbiAgICAvLyBJZiB2YWx1ZSBpcyBhbiBhcnJheSwgdGhlbiB0aGUgcHJldmlvdXMgcmVuZGVyIHdhcyBvZiBhblxuICAgIC8vIGl0ZXJhYmxlIGFuZCB2YWx1ZSB3aWxsIGNvbnRhaW4gdGhlIENoaWxkUGFydHMgZnJvbSB0aGUgcHJldmlvdXNcbiAgICAvLyByZW5kZXIuIElmIHZhbHVlIGlzIG5vdCBhbiBhcnJheSwgY2xlYXIgdGhpcyBwYXJ0IGFuZCBtYWtlIGEgbmV3XG4gICAgLy8gYXJyYXkgZm9yIENoaWxkUGFydHMuXG4gICAgaWYgKCFpc0FycmF5KHRoaXMuXyRjb21taXR0ZWRWYWx1ZSkpIHtcbiAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IFtdO1xuICAgICAgdGhpcy5fJGNsZWFyKCk7XG4gICAgfVxuXG4gICAgLy8gTGV0cyB1cyBrZWVwIHRyYWNrIG9mIGhvdyBtYW55IGl0ZW1zIHdlIHN0YW1wZWQgc28gd2UgY2FuIGNsZWFyIGxlZnRvdmVyXG4gICAgLy8gaXRlbXMgZnJvbSBhIHByZXZpb3VzIHJlbmRlclxuICAgIGNvbnN0IGl0ZW1QYXJ0cyA9IHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBDaGlsZFBhcnRbXTtcbiAgICBsZXQgcGFydEluZGV4ID0gMDtcbiAgICBsZXQgaXRlbVBhcnQ6IENoaWxkUGFydCB8IHVuZGVmaW5lZDtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgaWYgKHBhcnRJbmRleCA9PT0gaXRlbVBhcnRzLmxlbmd0aCkge1xuICAgICAgICAvLyBJZiBubyBleGlzdGluZyBwYXJ0LCBjcmVhdGUgYSBuZXcgb25lXG4gICAgICAgIC8vIFRPRE8gKGp1c3RpbmZhZ25hbmkpOiB0ZXN0IHBlcmYgaW1wYWN0IG9mIGFsd2F5cyBjcmVhdGluZyB0d28gcGFydHNcbiAgICAgICAgLy8gaW5zdGVhZCBvZiBzaGFyaW5nIHBhcnRzIGJldHdlZW4gbm9kZXNcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2xpdC9saXQvaXNzdWVzLzEyNjZcbiAgICAgICAgaXRlbVBhcnRzLnB1c2goXG4gICAgICAgICAgKGl0ZW1QYXJ0ID0gbmV3IENoaWxkUGFydChcbiAgICAgICAgICAgIHRoaXMuX2luc2VydChjcmVhdGVNYXJrZXIoKSksXG4gICAgICAgICAgICB0aGlzLl9pbnNlcnQoY3JlYXRlTWFya2VyKCkpLFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICAgICkpXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXVzZSBhbiBleGlzdGluZyBwYXJ0XG4gICAgICAgIGl0ZW1QYXJ0ID0gaXRlbVBhcnRzW3BhcnRJbmRleF07XG4gICAgICB9XG4gICAgICBpdGVtUGFydC5fJHNldFZhbHVlKGl0ZW0pO1xuICAgICAgcGFydEluZGV4Kys7XG4gICAgfVxuXG4gICAgaWYgKHBhcnRJbmRleCA8IGl0ZW1QYXJ0cy5sZW5ndGgpIHtcbiAgICAgIC8vIGl0ZW1QYXJ0cyBhbHdheXMgaGF2ZSBlbmQgbm9kZXNcbiAgICAgIHRoaXMuXyRjbGVhcihcbiAgICAgICAgaXRlbVBhcnQgJiYgd3JhcChpdGVtUGFydC5fJGVuZE5vZGUhKS5uZXh0U2libGluZyxcbiAgICAgICAgcGFydEluZGV4XG4gICAgICApO1xuICAgICAgLy8gVHJ1bmNhdGUgdGhlIHBhcnRzIGFycmF5IHNvIF92YWx1ZSByZWZsZWN0cyB0aGUgY3VycmVudCBzdGF0ZVxuICAgICAgaXRlbVBhcnRzLmxlbmd0aCA9IHBhcnRJbmRleDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgbm9kZXMgY29udGFpbmVkIHdpdGhpbiB0aGlzIFBhcnQgZnJvbSB0aGUgRE9NLlxuICAgKlxuICAgKiBAcGFyYW0gc3RhcnQgU3RhcnQgbm9kZSB0byBjbGVhciBmcm9tLCBmb3IgY2xlYXJpbmcgYSBzdWJzZXQgb2YgdGhlIHBhcnQnc1xuICAgKiAgICAgRE9NICh1c2VkIHdoZW4gdHJ1bmNhdGluZyBpdGVyYWJsZXMpXG4gICAqIEBwYXJhbSBmcm9tICBXaGVuIGBzdGFydGAgaXMgc3BlY2lmaWVkLCB0aGUgaW5kZXggd2l0aGluIHRoZSBpdGVyYWJsZSBmcm9tXG4gICAqICAgICB3aGljaCBDaGlsZFBhcnRzIGFyZSBiZWluZyByZW1vdmVkLCB1c2VkIGZvciBkaXNjb25uZWN0aW5nIGRpcmVjdGl2ZXNcbiAgICogICAgIGluIHRob3NlIFBhcnRzLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF8kY2xlYXIoXG4gICAgc3RhcnQ6IENoaWxkTm9kZSB8IG51bGwgPSB3cmFwKHRoaXMuXyRzdGFydE5vZGUpLm5leHRTaWJsaW5nLFxuICAgIGZyb20/OiBudW1iZXJcbiAgKSB7XG4gICAgdGhpcy5fJG5vdGlmeUNvbm5lY3Rpb25DaGFuZ2VkPy4oZmFsc2UsIHRydWUsIGZyb20pO1xuICAgIHdoaWxlIChzdGFydCAhPT0gdGhpcy5fJGVuZE5vZGUpIHtcbiAgICAgIC8vIFRoZSBub24tbnVsbCBhc3NlcnRpb24gaXMgc2FmZSBiZWNhdXNlIGlmIF8kc3RhcnROb2RlLm5leHRTaWJsaW5nIGlzXG4gICAgICAvLyBudWxsLCB0aGVuIF8kZW5kTm9kZSBpcyBhbHNvIG51bGwsIGFuZCB3ZSB3b3VsZCBub3QgaGF2ZSBlbnRlcmVkIHRoaXNcbiAgICAgIC8vIGxvb3AuXG4gICAgICBjb25zdCBuID0gd3JhcChzdGFydCEpLm5leHRTaWJsaW5nO1xuICAgICAgd3JhcChzdGFydCEpLnJlbW92ZSgpO1xuICAgICAgc3RhcnQgPSBuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRhdGlvbiBvZiBSb290UGFydCdzIGBpc0Nvbm5lY3RlZGAuIE5vdGUgdGhhdCB0aGlzIG1ldGhvZFxuICAgKiBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYFJvb3RQYXJ0YHMgKHRoZSBgQ2hpbGRQYXJ0YCByZXR1cm5lZCBmcm9tIGFcbiAgICogdG9wLWxldmVsIGByZW5kZXIoKWAgY2FsbCkuIEl0IGhhcyBubyBlZmZlY3Qgb24gbm9uLXJvb3QgQ2hpbGRQYXJ0cy5cbiAgICogQHBhcmFtIGlzQ29ubmVjdGVkIFdoZXRoZXIgdG8gc2V0XG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgc2V0Q29ubmVjdGVkKGlzQ29ubmVjdGVkOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuXyRwYXJlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fX2lzQ29ubmVjdGVkID0gaXNDb25uZWN0ZWQ7XG4gICAgICB0aGlzLl8kbm90aWZ5Q29ubmVjdGlvbkNoYW5nZWQ/Lihpc0Nvbm5lY3RlZCk7XG4gICAgfSBlbHNlIGlmIChERVZfTU9ERSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAncGFydC5zZXRDb25uZWN0ZWQoKSBtYXkgb25seSBiZSBjYWxsZWQgb24gYSAnICtcbiAgICAgICAgICAnUm9vdFBhcnQgcmV0dXJuZWQgZnJvbSByZW5kZXIoKS4nXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEEgdG9wLWxldmVsIGBDaGlsZFBhcnRgIHJldHVybmVkIGZyb20gYHJlbmRlcmAgdGhhdCBtYW5hZ2VzIHRoZSBjb25uZWN0ZWRcbiAqIHN0YXRlIG9mIGBBc3luY0RpcmVjdGl2ZWBzIGNyZWF0ZWQgdGhyb3VnaG91dCB0aGUgdHJlZSBiZWxvdyBpdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSb290UGFydCBleHRlbmRzIENoaWxkUGFydCB7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjb25uZWN0aW9uIHN0YXRlIGZvciBgQXN5bmNEaXJlY3RpdmVgcyBjb250YWluZWQgd2l0aGluIHRoaXMgcm9vdFxuICAgKiBDaGlsZFBhcnQuXG4gICAqXG4gICAqIGxpdC1odG1sIGRvZXMgbm90IGF1dG9tYXRpY2FsbHkgbW9uaXRvciB0aGUgY29ubmVjdGVkbmVzcyBvZiBET00gcmVuZGVyZWQ7XG4gICAqIGFzIHN1Y2gsIGl0IGlzIHRoZSByZXNwb25zaWJpbGl0eSBvZiB0aGUgY2FsbGVyIHRvIGByZW5kZXJgIHRvIGVuc3VyZSB0aGF0XG4gICAqIGBwYXJ0LnNldENvbm5lY3RlZChmYWxzZSlgIGlzIGNhbGxlZCBiZWZvcmUgdGhlIHBhcnQgb2JqZWN0IGlzIHBvdGVudGlhbGx5XG4gICAqIGRpc2NhcmRlZCwgdG8gZW5zdXJlIHRoYXQgYEFzeW5jRGlyZWN0aXZlYHMgaGF2ZSBhIGNoYW5jZSB0byBkaXNwb3NlIG9mXG4gICAqIGFueSByZXNvdXJjZXMgYmVpbmcgaGVsZC4gSWYgYSBgUm9vdFBhcnRgIHRoYXQgd2FzIHByZXZpb3VzbHlcbiAgICogZGlzY29ubmVjdGVkIGlzIHN1YnNlcXVlbnRseSByZS1jb25uZWN0ZWQgKGFuZCBpdHMgYEFzeW5jRGlyZWN0aXZlYHMgc2hvdWxkXG4gICAqIHJlLWNvbm5lY3QpLCBgc2V0Q29ubmVjdGVkKHRydWUpYCBzaG91bGQgYmUgY2FsbGVkLlxuICAgKlxuICAgKiBAcGFyYW0gaXNDb25uZWN0ZWQgV2hldGhlciBkaXJlY3RpdmVzIHdpdGhpbiB0aGlzIHRyZWUgc2hvdWxkIGJlIGNvbm5lY3RlZFxuICAgKiBvciBub3RcbiAgICovXG4gIHNldENvbm5lY3RlZChpc0Nvbm5lY3RlZDogYm9vbGVhbik6IHZvaWQ7XG59XG5cbmV4cG9ydCB0eXBlIHtBdHRyaWJ1dGVQYXJ0fTtcbmNsYXNzIEF0dHJpYnV0ZVBhcnQgaW1wbGVtZW50cyBEaXNjb25uZWN0YWJsZSB7XG4gIHJlYWRvbmx5IHR5cGU6XG4gICAgfCB0eXBlb2YgQVRUUklCVVRFX1BBUlRcbiAgICB8IHR5cGVvZiBQUk9QRVJUWV9QQVJUXG4gICAgfCB0eXBlb2YgQk9PTEVBTl9BVFRSSUJVVEVfUEFSVFxuICAgIHwgdHlwZW9mIEVWRU5UX1BBUlQgPSBBVFRSSUJVVEVfUEFSVDtcbiAgcmVhZG9ubHkgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogSWYgdGhpcyBhdHRyaWJ1dGUgcGFydCByZXByZXNlbnRzIGFuIGludGVycG9sYXRpb24sIHRoaXMgY29udGFpbnMgdGhlXG4gICAqIHN0YXRpYyBzdHJpbmdzIG9mIHRoZSBpbnRlcnBvbGF0aW9uLiBGb3Igc2luZ2xlLXZhbHVlLCBjb21wbGV0ZSBiaW5kaW5ncyxcbiAgICogdGhpcyBpcyB1bmRlZmluZWQuXG4gICAqL1xuICByZWFkb25seSBzdHJpbmdzPzogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xuICAvKiogQGludGVybmFsICovXG4gIF8kY29tbWl0dGVkVmFsdWU6IHVua25vd24gfCBBcnJheTx1bmtub3duPiA9IG5vdGhpbmc7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX19kaXJlY3RpdmVzPzogQXJyYXk8RGlyZWN0aXZlIHwgdW5kZWZpbmVkPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJHBhcmVudDogRGlzY29ubmVjdGFibGU7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRkaXNjb25uZWN0YWJsZUNoaWxkcmVuPzogU2V0PERpc2Nvbm5lY3RhYmxlPiA9IHVuZGVmaW5lZDtcblxuICBwcm90ZWN0ZWQgX3Nhbml0aXplcjogVmFsdWVTYW5pdGl6ZXIgfCB1bmRlZmluZWQ7XG5cbiAgZ2V0IHRhZ05hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC50YWdOYW1lO1xuICB9XG5cbiAgLy8gU2VlIGNvbW1lbnQgaW4gRGlzY29ubmVjdGFibGUgaW50ZXJmYWNlIGZvciB3aHkgdGhpcyBpcyBhIGdldHRlclxuICBnZXQgXyRpc0Nvbm5lY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fJHBhcmVudC5fJGlzQ29ubmVjdGVkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHN0cmluZ3M6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPixcbiAgICBwYXJlbnQ6IERpc2Nvbm5lY3RhYmxlLFxuICAgIG9wdGlvbnM6IFJlbmRlck9wdGlvbnMgfCB1bmRlZmluZWRcbiAgKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuXyRwYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAoc3RyaW5ncy5sZW5ndGggPiAyIHx8IHN0cmluZ3NbMF0gIT09ICcnIHx8IHN0cmluZ3NbMV0gIT09ICcnKSB7XG4gICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSBuZXcgQXJyYXkoc3RyaW5ncy5sZW5ndGggLSAxKS5maWxsKG5ldyBTdHJpbmcoKSk7XG4gICAgICB0aGlzLnN0cmluZ3MgPSBzdHJpbmdzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSBub3RoaW5nO1xuICAgIH1cbiAgICBpZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICB0aGlzLl9zYW5pdGl6ZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoaXMgcGFydCBieSByZXNvbHZpbmcgdGhlIHZhbHVlIGZyb20gcG9zc2libHkgbXVsdGlwbGVcbiAgICogdmFsdWVzIGFuZCBzdGF0aWMgc3RyaW5ncyBhbmQgY29tbWl0dGluZyBpdCB0byB0aGUgRE9NLlxuICAgKiBJZiB0aGlzIHBhcnQgaXMgc2luZ2xlLXZhbHVlZCwgYHRoaXMuX3N0cmluZ3NgIHdpbGwgYmUgdW5kZWZpbmVkLCBhbmQgdGhlXG4gICAqIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCB3aXRoIGEgc2luZ2xlIHZhbHVlIGFyZ3VtZW50LiBJZiB0aGlzIHBhcnQgaXNcbiAgICogbXVsdGktdmFsdWUsIGB0aGlzLl9zdHJpbmdzYCB3aWxsIGJlIGRlZmluZWQsIGFuZCB0aGUgbWV0aG9kIGlzIGNhbGxlZFxuICAgKiB3aXRoIHRoZSB2YWx1ZSBhcnJheSBvZiB0aGUgcGFydCdzIG93bmluZyBUZW1wbGF0ZUluc3RhbmNlLCBhbmQgYW4gb2Zmc2V0XG4gICAqIGludG8gdGhlIHZhbHVlIGFycmF5IGZyb20gd2hpY2ggdGhlIHZhbHVlcyBzaG91bGQgYmUgcmVhZC5cbiAgICogVGhpcyBtZXRob2QgaXMgb3ZlcmxvYWRlZCB0aGlzIHdheSB0byBlbGltaW5hdGUgc2hvcnQtbGl2ZWQgYXJyYXkgc2xpY2VzXG4gICAqIG9mIHRoZSB0ZW1wbGF0ZSBpbnN0YW5jZSB2YWx1ZXMsIGFuZCBhbGxvdyBhIGZhc3QtcGF0aCBmb3Igc2luZ2xlLXZhbHVlZFxuICAgKiBwYXJ0cy5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIFRoZSBwYXJ0IHZhbHVlLCBvciBhbiBhcnJheSBvZiB2YWx1ZXMgZm9yIG11bHRpLXZhbHVlZCBwYXJ0c1xuICAgKiBAcGFyYW0gdmFsdWVJbmRleCB0aGUgaW5kZXggdG8gc3RhcnQgcmVhZGluZyB2YWx1ZXMgZnJvbS4gYHVuZGVmaW5lZGAgZm9yXG4gICAqICAgc2luZ2xlLXZhbHVlZCBwYXJ0c1xuICAgKiBAcGFyYW0gbm9Db21taXQgY2F1c2VzIHRoZSBwYXJ0IHRvIG5vdCBjb21taXQgaXRzIHZhbHVlIHRvIHRoZSBET00uIFVzZWRcbiAgICogICBpbiBoeWRyYXRpb24gdG8gcHJpbWUgYXR0cmlidXRlIHBhcnRzIHdpdGggdGhlaXIgZmlyc3QtcmVuZGVyZWQgdmFsdWUsXG4gICAqICAgYnV0IG5vdCBzZXQgdGhlIGF0dHJpYnV0ZSwgYW5kIGluIFNTUiB0byBuby1vcCB0aGUgRE9NIG9wZXJhdGlvbiBhbmRcbiAgICogICBjYXB0dXJlIHRoZSB2YWx1ZSBmb3Igc2VyaWFsaXphdGlvbi5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfJHNldFZhbHVlKFxuICAgIHZhbHVlOiB1bmtub3duIHwgQXJyYXk8dW5rbm93bj4sXG4gICAgZGlyZWN0aXZlUGFyZW50OiBEaXJlY3RpdmVQYXJlbnQgPSB0aGlzLFxuICAgIHZhbHVlSW5kZXg/OiBudW1iZXIsXG4gICAgbm9Db21taXQ/OiBib29sZWFuXG4gICkge1xuICAgIGNvbnN0IHN0cmluZ3MgPSB0aGlzLnN0cmluZ3M7XG5cbiAgICAvLyBXaGV0aGVyIGFueSBvZiB0aGUgdmFsdWVzIGhhcyBjaGFuZ2VkLCBmb3IgZGlydHktY2hlY2tpbmdcbiAgICBsZXQgY2hhbmdlID0gZmFsc2U7XG5cbiAgICBpZiAoc3RyaW5ncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBTaW5nbGUtdmFsdWUgYmluZGluZyBjYXNlXG4gICAgICB2YWx1ZSA9IHJlc29sdmVEaXJlY3RpdmUodGhpcywgdmFsdWUsIGRpcmVjdGl2ZVBhcmVudCwgMCk7XG4gICAgICBjaGFuZ2UgPVxuICAgICAgICAhaXNQcmltaXRpdmUodmFsdWUpIHx8XG4gICAgICAgICh2YWx1ZSAhPT0gdGhpcy5fJGNvbW1pdHRlZFZhbHVlICYmIHZhbHVlICE9PSBub0NoYW5nZSk7XG4gICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJbnRlcnBvbGF0aW9uIGNhc2VcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHZhbHVlIGFzIEFycmF5PHVua25vd24+O1xuICAgICAgdmFsdWUgPSBzdHJpbmdzWzBdO1xuXG4gICAgICBsZXQgaSwgdjtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmdzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICB2ID0gcmVzb2x2ZURpcmVjdGl2ZSh0aGlzLCB2YWx1ZXNbdmFsdWVJbmRleCEgKyBpXSwgZGlyZWN0aXZlUGFyZW50LCBpKTtcblxuICAgICAgICBpZiAodiA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgdXNlci1wcm92aWRlZCB2YWx1ZSBpcyBgbm9DaGFuZ2VgLCB1c2UgdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgICAgICAgdiA9ICh0aGlzLl8kY29tbWl0dGVkVmFsdWUgYXMgQXJyYXk8dW5rbm93bj4pW2ldO1xuICAgICAgICB9XG4gICAgICAgIGNoYW5nZSB8fD1cbiAgICAgICAgICAhaXNQcmltaXRpdmUodikgfHwgdiAhPT0gKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBBcnJheTx1bmtub3duPilbaV07XG4gICAgICAgIGlmICh2ID09PSBub3RoaW5nKSB7XG4gICAgICAgICAgdmFsdWUgPSBub3RoaW5nO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBub3RoaW5nKSB7XG4gICAgICAgICAgdmFsdWUgKz0gKHYgPz8gJycpICsgc3RyaW5nc1tpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgYWx3YXlzIHJlY29yZCBlYWNoIHZhbHVlLCBldmVuIGlmIG9uZSBpcyBgbm90aGluZ2AsIGZvciBmdXR1cmVcbiAgICAgICAgLy8gY2hhbmdlIGRldGVjdGlvbi5cbiAgICAgICAgKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBBcnJheTx1bmtub3duPilbaV0gPSB2O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlICYmICFub0NvbW1pdCkge1xuICAgICAgdGhpcy5fY29tbWl0VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbW1pdFZhbHVlKHZhbHVlOiB1bmtub3duKSB7XG4gICAgaWYgKHZhbHVlID09PSBub3RoaW5nKSB7XG4gICAgICAod3JhcCh0aGlzLmVsZW1lbnQpIGFzIEVsZW1lbnQpLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLm5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICAgIGlmICh0aGlzLl9zYW5pdGl6ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuX3Nhbml0aXplciA9IHNhbml0aXplckZhY3RvcnlJbnRlcm5hbChcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCxcbiAgICAgICAgICAgIHRoaXMubmFtZSxcbiAgICAgICAgICAgICdhdHRyaWJ1dGUnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHRoaXMuX3Nhbml0aXplcih2YWx1ZSA/PyAnJyk7XG4gICAgICB9XG4gICAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICAgIGtpbmQ6ICdjb21taXQgYXR0cmlidXRlJyxcbiAgICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICAod3JhcCh0aGlzLmVsZW1lbnQpIGFzIEVsZW1lbnQpLnNldEF0dHJpYnV0ZShcbiAgICAgICAgdGhpcy5uYW1lLFxuICAgICAgICAodmFsdWUgPz8gJycpIGFzIHN0cmluZ1xuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUge1Byb3BlcnR5UGFydH07XG5jbGFzcyBQcm9wZXJ0eVBhcnQgZXh0ZW5kcyBBdHRyaWJ1dGVQYXJ0IHtcbiAgb3ZlcnJpZGUgcmVhZG9ubHkgdHlwZSA9IFBST1BFUlRZX1BBUlQ7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBvdmVycmlkZSBfY29tbWl0VmFsdWUodmFsdWU6IHVua25vd24pIHtcbiAgICBpZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICBpZiAodGhpcy5fc2FuaXRpemVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2FuaXRpemVyID0gc2FuaXRpemVyRmFjdG9yeUludGVybmFsKFxuICAgICAgICAgIHRoaXMuZWxlbWVudCxcbiAgICAgICAgICB0aGlzLm5hbWUsXG4gICAgICAgICAgJ3Byb3BlcnR5J1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSB0aGlzLl9zYW5pdGl6ZXIodmFsdWUpO1xuICAgIH1cbiAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAga2luZDogJ2NvbW1pdCBwcm9wZXJ0eScsXG4gICAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgfSk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAodGhpcy5lbGVtZW50IGFzIGFueSlbdGhpcy5uYW1lXSA9IHZhbHVlID09PSBub3RoaW5nID8gdW5kZWZpbmVkIDogdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUge0Jvb2xlYW5BdHRyaWJ1dGVQYXJ0fTtcbmNsYXNzIEJvb2xlYW5BdHRyaWJ1dGVQYXJ0IGV4dGVuZHMgQXR0cmlidXRlUGFydCB7XG4gIG92ZXJyaWRlIHJlYWRvbmx5IHR5cGUgPSBCT09MRUFOX0FUVFJJQlVURV9QQVJUO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgb3ZlcnJpZGUgX2NvbW1pdFZhbHVlKHZhbHVlOiB1bmtub3duKSB7XG4gICAgZGVidWdMb2dFdmVudCAmJlxuICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgIGtpbmQ6ICdjb21taXQgYm9vbGVhbiBhdHRyaWJ1dGUnLFxuICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgdmFsdWU6ICEhKHZhbHVlICYmIHZhbHVlICE9PSBub3RoaW5nKSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgfSk7XG4gICAgKHdyYXAodGhpcy5lbGVtZW50KSBhcyBFbGVtZW50KS50b2dnbGVBdHRyaWJ1dGUoXG4gICAgICB0aGlzLm5hbWUsXG4gICAgICAhIXZhbHVlICYmIHZhbHVlICE9PSBub3RoaW5nXG4gICAgKTtcbiAgfVxufVxuXG50eXBlIEV2ZW50TGlzdGVuZXJXaXRoT3B0aW9ucyA9IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QgJlxuICBQYXJ0aWFsPEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zPjtcblxuLyoqXG4gKiBBbiBBdHRyaWJ1dGVQYXJ0IHRoYXQgbWFuYWdlcyBhbiBldmVudCBsaXN0ZW5lciB2aWEgYWRkL3JlbW92ZUV2ZW50TGlzdGVuZXIuXG4gKlxuICogVGhpcyBwYXJ0IHdvcmtzIGJ5IGFkZGluZyBpdHNlbGYgYXMgdGhlIGV2ZW50IGxpc3RlbmVyIG9uIGFuIGVsZW1lbnQsIHRoZW5cbiAqIGRlbGVnYXRpbmcgdG8gdGhlIHZhbHVlIHBhc3NlZCB0byBpdC4gVGhpcyByZWR1Y2VzIHRoZSBudW1iZXIgb2YgY2FsbHMgdG9cbiAqIGFkZC9yZW1vdmVFdmVudExpc3RlbmVyIGlmIHRoZSBsaXN0ZW5lciBjaGFuZ2VzIGZyZXF1ZW50bHksIHN1Y2ggYXMgd2hlbiBhblxuICogaW5saW5lIGZ1bmN0aW9uIGlzIHVzZWQgYXMgYSBsaXN0ZW5lci5cbiAqXG4gKiBCZWNhdXNlIGV2ZW50IG9wdGlvbnMgYXJlIHBhc3NlZCB3aGVuIGFkZGluZyBsaXN0ZW5lcnMsIHdlIG11c3QgdGFrZSBjYXNlXG4gKiB0byBhZGQgYW5kIHJlbW92ZSB0aGUgcGFydCBhcyBhIGxpc3RlbmVyIHdoZW4gdGhlIGV2ZW50IG9wdGlvbnMgY2hhbmdlLlxuICovXG5leHBvcnQgdHlwZSB7RXZlbnRQYXJ0fTtcbmNsYXNzIEV2ZW50UGFydCBleHRlbmRzIEF0dHJpYnV0ZVBhcnQge1xuICBvdmVycmlkZSByZWFkb25seSB0eXBlID0gRVZFTlRfUEFSVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgc3RyaW5nczogUmVhZG9ubHlBcnJheTxzdHJpbmc+LFxuICAgIHBhcmVudDogRGlzY29ubmVjdGFibGUsXG4gICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZFxuICApIHtcbiAgICBzdXBlcihlbGVtZW50LCBuYW1lLCBzdHJpbmdzLCBwYXJlbnQsIG9wdGlvbnMpO1xuXG4gICAgaWYgKERFVl9NT0RFICYmIHRoaXMuc3RyaW5ncyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBBIFxcYDwke2VsZW1lbnQubG9jYWxOYW1lfT5cXGAgaGFzIGEgXFxgQCR7bmFtZX09Li4uXFxgIGxpc3RlbmVyIHdpdGggYCArXG4gICAgICAgICAgJ2ludmFsaWQgY29udGVudC4gRXZlbnQgbGlzdGVuZXJzIGluIHRlbXBsYXRlcyBtdXN0IGhhdmUgZXhhY3RseSAnICtcbiAgICAgICAgICAnb25lIGV4cHJlc3Npb24gYW5kIG5vIHN1cnJvdW5kaW5nIHRleHQuJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyBFdmVudFBhcnQgZG9lcyBub3QgdXNlIHRoZSBiYXNlIF8kc2V0VmFsdWUvX3Jlc29sdmVWYWx1ZSBpbXBsZW1lbnRhdGlvblxuICAvLyBzaW5jZSB0aGUgZGlydHkgY2hlY2tpbmcgaXMgbW9yZSBjb21wbGV4XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgb3ZlcnJpZGUgXyRzZXRWYWx1ZShcbiAgICBuZXdMaXN0ZW5lcjogdW5rbm93bixcbiAgICBkaXJlY3RpdmVQYXJlbnQ6IERpcmVjdGl2ZVBhcmVudCA9IHRoaXNcbiAgKSB7XG4gICAgbmV3TGlzdGVuZXIgPVxuICAgICAgcmVzb2x2ZURpcmVjdGl2ZSh0aGlzLCBuZXdMaXN0ZW5lciwgZGlyZWN0aXZlUGFyZW50LCAwKSA/PyBub3RoaW5nO1xuICAgIGlmIChuZXdMaXN0ZW5lciA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb2xkTGlzdGVuZXIgPSB0aGlzLl8kY29tbWl0dGVkVmFsdWU7XG5cbiAgICAvLyBJZiB0aGUgbmV3IHZhbHVlIGlzIG5vdGhpbmcgb3IgYW55IG9wdGlvbnMgY2hhbmdlIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZVxuICAgIC8vIHBhcnQgYXMgYSBsaXN0ZW5lci5cbiAgICBjb25zdCBzaG91bGRSZW1vdmVMaXN0ZW5lciA9XG4gICAgICAobmV3TGlzdGVuZXIgPT09IG5vdGhpbmcgJiYgb2xkTGlzdGVuZXIgIT09IG5vdGhpbmcpIHx8XG4gICAgICAobmV3TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5jYXB0dXJlICE9PVxuICAgICAgICAob2xkTGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5jYXB0dXJlIHx8XG4gICAgICAobmV3TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5vbmNlICE9PVxuICAgICAgICAob2xkTGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5vbmNlIHx8XG4gICAgICAobmV3TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5wYXNzaXZlICE9PVxuICAgICAgICAob2xkTGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5wYXNzaXZlO1xuXG4gICAgLy8gSWYgdGhlIG5ldyB2YWx1ZSBpcyBub3Qgbm90aGluZyBhbmQgd2UgcmVtb3ZlZCB0aGUgbGlzdGVuZXIsIHdlIGhhdmVcbiAgICAvLyB0byBhZGQgdGhlIHBhcnQgYXMgYSBsaXN0ZW5lci5cbiAgICBjb25zdCBzaG91bGRBZGRMaXN0ZW5lciA9XG4gICAgICBuZXdMaXN0ZW5lciAhPT0gbm90aGluZyAmJlxuICAgICAgKG9sZExpc3RlbmVyID09PSBub3RoaW5nIHx8IHNob3VsZFJlbW92ZUxpc3RlbmVyKTtcblxuICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICBraW5kOiAnY29tbWl0IGV2ZW50IGxpc3RlbmVyJyxcbiAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgIHZhbHVlOiBuZXdMaXN0ZW5lcixcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICByZW1vdmVMaXN0ZW5lcjogc2hvdWxkUmVtb3ZlTGlzdGVuZXIsXG4gICAgICAgIGFkZExpc3RlbmVyOiBzaG91bGRBZGRMaXN0ZW5lcixcbiAgICAgICAgb2xkTGlzdGVuZXIsXG4gICAgICB9KTtcbiAgICBpZiAoc2hvdWxkUmVtb3ZlTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICB0aGlzLm5hbWUsXG4gICAgICAgIHRoaXMsXG4gICAgICAgIG9sZExpc3RlbmVyIGFzIEV2ZW50TGlzdGVuZXJXaXRoT3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHNob3VsZEFkZExpc3RlbmVyKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgdGhpcy5uYW1lLFxuICAgICAgICB0aGlzLFxuICAgICAgICBuZXdMaXN0ZW5lciBhcyBFdmVudExpc3RlbmVyV2l0aE9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IG5ld0xpc3RlbmVyO1xuICB9XG5cbiAgaGFuZGxlRXZlbnQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZS5jYWxsKHRoaXMub3B0aW9ucz8uaG9zdCA/PyB0aGlzLmVsZW1lbnQsIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBFdmVudExpc3RlbmVyT2JqZWN0KS5oYW5kbGVFdmVudChldmVudCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB0eXBlIHtFbGVtZW50UGFydH07XG5jbGFzcyBFbGVtZW50UGFydCBpbXBsZW1lbnRzIERpc2Nvbm5lY3RhYmxlIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEVMRU1FTlRfUEFSVDtcblxuICAvKiogQGludGVybmFsICovXG4gIF9fZGlyZWN0aXZlPzogRGlyZWN0aXZlO1xuXG4gIC8vIFRoaXMgaXMgdG8gZW5zdXJlIHRoYXQgZXZlcnkgUGFydCBoYXMgYSBfJGNvbW1pdHRlZFZhbHVlXG4gIF8kY29tbWl0dGVkVmFsdWU6IHVuZGVmaW5lZDtcblxuICAvKiogQGludGVybmFsICovXG4gIF8kcGFyZW50ITogRGlzY29ubmVjdGFibGU7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJGRpc2Nvbm5lY3RhYmxlQ2hpbGRyZW4/OiBTZXQ8RGlzY29ubmVjdGFibGU+ID0gdW5kZWZpbmVkO1xuXG4gIG9wdGlvbnM6IFJlbmRlck9wdGlvbnMgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnQsXG4gICAgcGFyZW50OiBEaXNjb25uZWN0YWJsZSxcbiAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHRoaXMuXyRwYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIC8vIFNlZSBjb21tZW50IGluIERpc2Nvbm5lY3RhYmxlIGludGVyZmFjZSBmb3Igd2h5IHRoaXMgaXMgYSBnZXR0ZXJcbiAgZ2V0IF8kaXNDb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuXyRwYXJlbnQuXyRpc0Nvbm5lY3RlZDtcbiAgfVxuXG4gIF8kc2V0VmFsdWUodmFsdWU6IHVua25vd24pOiB2b2lkIHtcbiAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAga2luZDogJ2NvbW1pdCB0byBlbGVtZW50IGJpbmRpbmcnLFxuICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICB9KTtcbiAgICByZXNvbHZlRGlyZWN0aXZlKHRoaXMsIHZhbHVlKTtcbiAgfVxufVxuXG4vKipcbiAqIEVORCBVU0VSUyBTSE9VTEQgTk9UIFJFTFkgT04gVEhJUyBPQkpFQ1QuXG4gKlxuICogUHJpdmF0ZSBleHBvcnRzIGZvciB1c2UgYnkgb3RoZXIgTGl0IHBhY2thZ2VzLCBub3QgaW50ZW5kZWQgZm9yIHVzZSBieVxuICogZXh0ZXJuYWwgdXNlcnMuXG4gKlxuICogV2UgY3VycmVudGx5IGRvIG5vdCBtYWtlIGEgbWFuZ2xlZCByb2xsdXAgYnVpbGQgb2YgdGhlIGxpdC1zc3IgY29kZS4gSW4gb3JkZXJcbiAqIHRvIGtlZXAgYSBudW1iZXIgb2YgKG90aGVyd2lzZSBwcml2YXRlKSB0b3AtbGV2ZWwgZXhwb3J0cyBtYW5nbGVkIGluIHRoZVxuICogY2xpZW50IHNpZGUgY29kZSwgd2UgZXhwb3J0IGEgXyRMSCBvYmplY3QgY29udGFpbmluZyB0aG9zZSBtZW1iZXJzIChvclxuICogaGVscGVyIG1ldGhvZHMgZm9yIGFjY2Vzc2luZyBwcml2YXRlIGZpZWxkcyBvZiB0aG9zZSBtZW1iZXJzKSwgYW5kIHRoZW5cbiAqIHJlLWV4cG9ydCB0aGVtIGZvciB1c2UgaW4gbGl0LXNzci4gVGhpcyBrZWVwcyBsaXQtc3NyIGFnbm9zdGljIHRvIHdoZXRoZXIgdGhlXG4gKiBjbGllbnQtc2lkZSBjb2RlIGlzIGJlaW5nIHVzZWQgaW4gYGRldmAgbW9kZSBvciBgcHJvZGAgbW9kZS5cbiAqXG4gKiBUaGlzIGhhcyBhIHVuaXF1ZSBuYW1lLCB0byBkaXNhbWJpZ3VhdGUgaXQgZnJvbSBwcml2YXRlIGV4cG9ydHMgaW5cbiAqIGxpdC1lbGVtZW50LCB3aGljaCByZS1leHBvcnRzIGFsbCBvZiBsaXQtaHRtbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgXyRMSCA9IHtcbiAgLy8gVXNlZCBpbiBsaXQtc3NyXG4gIF9ib3VuZEF0dHJpYnV0ZVN1ZmZpeDogYm91bmRBdHRyaWJ1dGVTdWZmaXgsXG4gIF9tYXJrZXI6IG1hcmtlcixcbiAgX21hcmtlck1hdGNoOiBtYXJrZXJNYXRjaCxcbiAgX0hUTUxfUkVTVUxUOiBIVE1MX1JFU1VMVCxcbiAgX2dldFRlbXBsYXRlSHRtbDogZ2V0VGVtcGxhdGVIdG1sLFxuICAvLyBVc2VkIGluIHRlc3RzIGFuZCBwcml2YXRlLXNzci1zdXBwb3J0XG4gIF9UZW1wbGF0ZUluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlLFxuICBfaXNJdGVyYWJsZTogaXNJdGVyYWJsZSxcbiAgX3Jlc29sdmVEaXJlY3RpdmU6IHJlc29sdmVEaXJlY3RpdmUsXG4gIF9DaGlsZFBhcnQ6IENoaWxkUGFydCxcbiAgX0F0dHJpYnV0ZVBhcnQ6IEF0dHJpYnV0ZVBhcnQsXG4gIF9Cb29sZWFuQXR0cmlidXRlUGFydDogQm9vbGVhbkF0dHJpYnV0ZVBhcnQsXG4gIF9FdmVudFBhcnQ6IEV2ZW50UGFydCxcbiAgX1Byb3BlcnR5UGFydDogUHJvcGVydHlQYXJ0LFxuICBfRWxlbWVudFBhcnQ6IEVsZW1lbnRQYXJ0LFxufTtcblxuLy8gQXBwbHkgcG9seWZpbGxzIGlmIGF2YWlsYWJsZVxuY29uc3QgcG9seWZpbGxTdXBwb3J0ID0gREVWX01PREVcbiAgPyBnbG9iYWwubGl0SHRtbFBvbHlmaWxsU3VwcG9ydERldk1vZGVcbiAgOiBnbG9iYWwubGl0SHRtbFBvbHlmaWxsU3VwcG9ydDtcbnBvbHlmaWxsU3VwcG9ydD8uKFRlbXBsYXRlLCBDaGlsZFBhcnQpO1xuXG4vLyBJTVBPUlRBTlQ6IGRvIG5vdCBjaGFuZ2UgdGhlIHByb3BlcnR5IG5hbWUgb3IgdGhlIGFzc2lnbm1lbnQgZXhwcmVzc2lvbi5cbi8vIFRoaXMgbGluZSB3aWxsIGJlIHVzZWQgaW4gcmVnZXhlcyB0byBzZWFyY2ggZm9yIGxpdC1odG1sIHVzYWdlLlxuKGdsb2JhbC5saXRIdG1sVmVyc2lvbnMgPz89IFtdKS5wdXNoKCczLjMuMicpO1xuaWYgKERFVl9NT0RFICYmIGdsb2JhbC5saXRIdG1sVmVyc2lvbnMubGVuZ3RoID4gMSkge1xuICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgaXNzdWVXYXJuaW5nIShcbiAgICAgICdtdWx0aXBsZS12ZXJzaW9ucycsXG4gICAgICBgTXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0IGxvYWRlZC4gYCArXG4gICAgICAgIGBMb2FkaW5nIG11bHRpcGxlIHZlcnNpb25zIGlzIG5vdCByZWNvbW1lbmRlZC5gXG4gICAgKTtcbiAgfSk7XG59XG5cbi8qKlxuICogUmVuZGVycyBhIHZhbHVlLCB1c3VhbGx5IGEgbGl0LWh0bWwgVGVtcGxhdGVSZXN1bHQsIHRvIHRoZSBjb250YWluZXIuXG4gKlxuICogVGhpcyBleGFtcGxlIHJlbmRlcnMgdGhlIHRleHQgXCJIZWxsbywgWm9lIVwiIGluc2lkZSBhIHBhcmFncmFwaCB0YWcsIGFwcGVuZGluZ1xuICogaXQgdG8gdGhlIGNvbnRhaW5lciBgZG9jdW1lbnQuYm9keWAuXG4gKlxuICogYGBganNcbiAqIGltcG9ydCB7aHRtbCwgcmVuZGVyfSBmcm9tICdsaXQnO1xuICpcbiAqIGNvbnN0IG5hbWUgPSBcIlpvZVwiO1xuICogcmVuZGVyKGh0bWxgPHA+SGVsbG8sICR7bmFtZX0hPC9wPmAsIGRvY3VtZW50LmJvZHkpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHZhbHVlIEFueSBbcmVuZGVyYWJsZVxuICogICB2YWx1ZV0oaHR0cHM6Ly9saXQuZGV2L2RvY3MvdGVtcGxhdGVzL2V4cHJlc3Npb25zLyNjaGlsZC1leHByZXNzaW9ucyksXG4gKiAgIHR5cGljYWxseSBhIHtAbGlua2NvZGUgVGVtcGxhdGVSZXN1bHR9IGNyZWF0ZWQgYnkgZXZhbHVhdGluZyBhIHRlbXBsYXRlIHRhZ1xuICogICBsaWtlIHtAbGlua2NvZGUgaHRtbH0gb3Ige0BsaW5rY29kZSBzdmd9LlxuICogQHBhcmFtIGNvbnRhaW5lciBBIERPTSBjb250YWluZXIgdG8gcmVuZGVyIHRvLiBUaGUgZmlyc3QgcmVuZGVyIHdpbGwgYXBwZW5kXG4gKiAgIHRoZSByZW5kZXJlZCB2YWx1ZSB0byB0aGUgY29udGFpbmVyLCBhbmQgc3Vic2VxdWVudCByZW5kZXJzIHdpbGxcbiAqICAgZWZmaWNpZW50bHkgdXBkYXRlIHRoZSByZW5kZXJlZCB2YWx1ZSBpZiB0aGUgc2FtZSByZXN1bHQgdHlwZSB3YXNcbiAqICAgcHJldmlvdXNseSByZW5kZXJlZCB0aGVyZS5cbiAqIEBwYXJhbSBvcHRpb25zIFNlZSB7QGxpbmtjb2RlIFJlbmRlck9wdGlvbnN9IGZvciBvcHRpb25zIGRvY3VtZW50YXRpb24uXG4gKiBAc2VlXG4gKiB7QGxpbmsgaHR0cHM6Ly9saXQuZGV2L2RvY3MvbGlicmFyaWVzL3N0YW5kYWxvbmUtdGVtcGxhdGVzLyNyZW5kZXJpbmctbGl0LWh0bWwtdGVtcGxhdGVzfCBSZW5kZXJpbmcgTGl0IEhUTUwgVGVtcGxhdGVzfVxuICovXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKFxuICB2YWx1ZTogdW5rbm93bixcbiAgY29udGFpbmVyOiBSZW5kZXJSb290Tm9kZSxcbiAgb3B0aW9ucz86IFJlbmRlck9wdGlvbnNcbik6IFJvb3RQYXJ0ID0+IHtcbiAgaWYgKERFVl9NT0RFICYmIGNvbnRhaW5lciA9PSBudWxsKSB7XG4gICAgLy8gR2l2ZSBhIGNsZWFyZXIgZXJyb3IgbWVzc2FnZSB0aGFuXG4gICAgLy8gICAgIFVuY2F1Z2h0IFR5cGVFcnJvcjogQ2Fubm90IHJlYWQgcHJvcGVydGllcyBvZiBudWxsIChyZWFkaW5nXG4gICAgLy8gICAgICdfJGxpdFBhcnQkJylcbiAgICAvLyB3aGljaCByZWFkcyBsaWtlIGFuIGludGVybmFsIExpdCBlcnJvci5cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgY29udGFpbmVyIHRvIHJlbmRlciBpbnRvIG1heSBub3QgYmUgJHtjb250YWluZXJ9YCk7XG4gIH1cbiAgY29uc3QgcmVuZGVySWQgPSBERVZfTU9ERSA/IGRlYnVnTG9nUmVuZGVySWQrKyA6IDA7XG4gIGNvbnN0IHBhcnRPd25lck5vZGUgPSBvcHRpb25zPy5yZW5kZXJCZWZvcmUgPz8gY29udGFpbmVyO1xuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBsZXQgcGFydDogQ2hpbGRQYXJ0ID0gKHBhcnRPd25lck5vZGUgYXMgYW55KVsnXyRsaXRQYXJ0JCddO1xuICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgZGVidWdMb2dFdmVudCh7XG4gICAgICBraW5kOiAnYmVnaW4gcmVuZGVyJyxcbiAgICAgIGlkOiByZW5kZXJJZCxcbiAgICAgIHZhbHVlLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHBhcnQsXG4gICAgfSk7XG4gIGlmIChwYXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBlbmROb2RlID0gb3B0aW9ucz8ucmVuZGVyQmVmb3JlID8/IG51bGw7XG4gICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIChwYXJ0T3duZXJOb2RlIGFzIGFueSlbJ18kbGl0UGFydCQnXSA9IHBhcnQgPSBuZXcgQ2hpbGRQYXJ0KFxuICAgICAgY29udGFpbmVyLmluc2VydEJlZm9yZShjcmVhdGVNYXJrZXIoKSwgZW5kTm9kZSksXG4gICAgICBlbmROb2RlLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgb3B0aW9ucyA/PyB7fVxuICAgICk7XG4gIH1cbiAgcGFydC5fJHNldFZhbHVlKHZhbHVlKTtcbiAgZGVidWdMb2dFdmVudCAmJlxuICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAga2luZDogJ2VuZCByZW5kZXInLFxuICAgICAgaWQ6IHJlbmRlcklkLFxuICAgICAgdmFsdWUsXG4gICAgICBjb250YWluZXIsXG4gICAgICBvcHRpb25zLFxuICAgICAgcGFydCxcbiAgICB9KTtcbiAgcmV0dXJuIHBhcnQgYXMgUm9vdFBhcnQ7XG59O1xuXG5pZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gIHJlbmRlci5zZXRTYW5pdGl6ZXIgPSBzZXRTYW5pdGl6ZXI7XG4gIHJlbmRlci5jcmVhdGVTYW5pdGl6ZXIgPSBjcmVhdGVTYW5pdGl6ZXI7XG4gIGlmIChERVZfTU9ERSkge1xuICAgIHJlbmRlci5fdGVzdE9ubHlDbGVhclNhbml0aXplckZhY3RvcnlEb05vdENhbGxPckVsc2UgPVxuICAgICAgX3Rlc3RPbmx5Q2xlYXJTYW5pdGl6ZXJGYWN0b3J5RG9Ob3RDYWxsT3JFbHNlO1xuICB9XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8qKlxuICogVGhlIG1haW4gTGl0RWxlbWVudCBtb2R1bGUsIHdoaWNoIGRlZmluZXMgdGhlIHtAbGlua2NvZGUgTGl0RWxlbWVudH0gYmFzZVxuICogY2xhc3MgYW5kIHJlbGF0ZWQgQVBJcy5cbiAqXG4gKiBMaXRFbGVtZW50IGNvbXBvbmVudHMgY2FuIGRlZmluZSBhIHRlbXBsYXRlIGFuZCBhIHNldCBvZiBvYnNlcnZlZFxuICogcHJvcGVydGllcy4gQ2hhbmdpbmcgYW4gb2JzZXJ2ZWQgcHJvcGVydHkgdHJpZ2dlcnMgYSByZS1yZW5kZXIgb2YgdGhlXG4gKiBlbGVtZW50LlxuICpcbiAqIEltcG9ydCB7QGxpbmtjb2RlIExpdEVsZW1lbnR9IGFuZCB7QGxpbmtjb2RlIGh0bWx9IGZyb20gdGhpcyBtb2R1bGUgdG9cbiAqIGNyZWF0ZSBhIGNvbXBvbmVudDpcbiAqXG4gKiAgYGBganNcbiAqIGltcG9ydCB7TGl0RWxlbWVudCwgaHRtbH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuICpcbiAqIGNsYXNzIE15RWxlbWVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICpcbiAqICAgLy8gRGVjbGFyZSBvYnNlcnZlZCBwcm9wZXJ0aWVzXG4gKiAgIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAqICAgICByZXR1cm4ge1xuICogICAgICAgYWRqZWN0aXZlOiB7fVxuICogICAgIH1cbiAqICAgfVxuICpcbiAqICAgY29uc3RydWN0b3IoKSB7XG4gKiAgICAgdGhpcy5hZGplY3RpdmUgPSAnYXdlc29tZSc7XG4gKiAgIH1cbiAqXG4gKiAgIC8vIERlZmluZSB0aGUgZWxlbWVudCdzIHRlbXBsYXRlXG4gKiAgIHJlbmRlcigpIHtcbiAqICAgICByZXR1cm4gaHRtbGA8cD55b3VyICR7YWRqZWN0aXZlfSB0ZW1wbGF0ZSBoZXJlPC9wPmA7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ215LWVsZW1lbnQnLCBNeUVsZW1lbnQpO1xuICogYGBgXG4gKlxuICogYExpdEVsZW1lbnRgIGV4dGVuZHMge0BsaW5rY29kZSBSZWFjdGl2ZUVsZW1lbnR9IGFuZCBhZGRzIGxpdC1odG1sXG4gKiB0ZW1wbGF0aW5nLiBUaGUgYFJlYWN0aXZlRWxlbWVudGAgY2xhc3MgaXMgcHJvdmlkZWQgZm9yIHVzZXJzIHRoYXQgd2FudCB0b1xuICogYnVpbGQgdGhlaXIgb3duIGN1c3RvbSBlbGVtZW50IGJhc2UgY2xhc3NlcyB0aGF0IGRvbid0IHVzZSBsaXQtaHRtbC5cbiAqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuaW1wb3J0IHtQcm9wZXJ0eVZhbHVlcywgUmVhY3RpdmVFbGVtZW50fSBmcm9tICdAbGl0L3JlYWN0aXZlLWVsZW1lbnQnO1xuaW1wb3J0IHtyZW5kZXIsIFJlbmRlck9wdGlvbnMsIG5vQ2hhbmdlLCBSb290UGFydH0gZnJvbSAnbGl0LWh0bWwnO1xuZXhwb3J0ICogZnJvbSAnQGxpdC9yZWFjdGl2ZS1lbGVtZW50JztcbmV4cG9ydCAqIGZyb20gJ2xpdC1odG1sJztcblxuaW1wb3J0IHtMaXRVbnN0YWJsZX0gZnJvbSAnbGl0LWh0bWwnO1xuaW1wb3J0IHtSZWFjdGl2ZVVuc3RhYmxlfSBmcm9tICdAbGl0L3JlYWN0aXZlLWVsZW1lbnQnO1xuXG4vKipcbiAqIENvbnRhaW5zIHR5cGVzIHRoYXQgYXJlIHBhcnQgb2YgdGhlIHVuc3RhYmxlIGRlYnVnIEFQSS5cbiAqXG4gKiBFdmVyeXRoaW5nIGluIHRoaXMgQVBJIGlzIG5vdCBzdGFibGUgYW5kIG1heSBjaGFuZ2Ugb3IgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLFxuICogZXZlbiBvbiBwYXRjaCByZWxlYXNlcy5cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbmV4cG9ydCBuYW1lc3BhY2UgVW5zdGFibGUge1xuICAvKipcbiAgICogV2hlbiBMaXQgaXMgcnVubmluZyBpbiBkZXYgbW9kZSBhbmQgYHdpbmRvdy5lbWl0TGl0RGVidWdMb2dFdmVudHNgIGlzIHRydWUsXG4gICAqIHdlIHdpbGwgZW1pdCAnbGl0LWRlYnVnJyBldmVudHMgdG8gd2luZG93LCB3aXRoIGxpdmUgZGV0YWlscyBhYm91dCB0aGUgdXBkYXRlIGFuZCByZW5kZXJcbiAgICogbGlmZWN5Y2xlLiBUaGVzZSBjYW4gYmUgdXNlZnVsIGZvciB3cml0aW5nIGRlYnVnIHRvb2xpbmcgYW5kIHZpc3VhbGl6YXRpb25zLlxuICAgKlxuICAgKiBQbGVhc2UgYmUgYXdhcmUgdGhhdCBydW5uaW5nIHdpdGggd2luZG93LmVtaXRMaXREZWJ1Z0xvZ0V2ZW50cyBoYXMgcGVyZm9ybWFuY2Ugb3ZlcmhlYWQsXG4gICAqIG1ha2luZyBjZXJ0YWluIG9wZXJhdGlvbnMgdGhhdCBhcmUgbm9ybWFsbHkgdmVyeSBjaGVhcCAobGlrZSBhIG5vLW9wIHJlbmRlcikgbXVjaCBzbG93ZXIsXG4gICAqIGJlY2F1c2Ugd2UgbXVzdCBjb3B5IGRhdGEgYW5kIGRpc3BhdGNoIGV2ZW50cy5cbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXG4gIGV4cG9ydCBuYW1lc3BhY2UgRGVidWdMb2cge1xuICAgIGV4cG9ydCB0eXBlIEVudHJ5ID1cbiAgICAgIHwgTGl0VW5zdGFibGUuRGVidWdMb2cuRW50cnlcbiAgICAgIHwgUmVhY3RpdmVVbnN0YWJsZS5EZWJ1Z0xvZy5FbnRyeTtcbiAgfVxufVxuLypcbiAqIFdoZW4gdXNpbmcgQ2xvc3VyZSBDb21waWxlciwgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eShwcm9wZXJ0eSwgb2JqZWN0KSBpc1xuICogcmVwbGFjZWQgYXQgY29tcGlsZSB0aW1lIGJ5IHRoZSBtdW5nZWQgbmFtZSBmb3Igb2JqZWN0W3Byb3BlcnR5XS4gV2UgY2Fubm90XG4gKiBhbGlhcyB0aGlzIGZ1bmN0aW9uLCBzbyB3ZSBoYXZlIHRvIHVzZSBhIHNtYWxsIHNoaW0gdGhhdCBoYXMgdGhlIHNhbWVcbiAqIGJlaGF2aW9yIHdoZW4gbm90IGNvbXBpbGluZy5cbiAqL1xuLypAX19JTkxJTkVfXyovXG5jb25zdCBKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5ID0gPFAgZXh0ZW5kcyBQcm9wZXJ0eUtleT4oXG4gIHByb3A6IFAsXG4gIF9vYmo6IHVua25vd25cbik6IFAgPT4gcHJvcDtcblxuY29uc3QgREVWX01PREUgPSB0cnVlO1xuLy8gQWxsb3dzIG1pbmlmaWVycyB0byByZW5hbWUgcmVmZXJlbmNlcyB0byBnbG9iYWxUaGlzXG5jb25zdCBnbG9iYWwgPSBnbG9iYWxUaGlzO1xuXG5sZXQgaXNzdWVXYXJuaW5nOiAoY29kZTogc3RyaW5nLCB3YXJuaW5nOiBzdHJpbmcpID0+IHZvaWQ7XG5cbmlmIChERVZfTU9ERSkge1xuICAvLyBFbnN1cmUgd2FybmluZ3MgYXJlIGlzc3VlZCBvbmx5IDF4LCBldmVuIGlmIG11bHRpcGxlIHZlcnNpb25zIG9mIExpdFxuICAvLyBhcmUgbG9hZGVkLlxuICBnbG9iYWwubGl0SXNzdWVkV2FybmluZ3MgPz89IG5ldyBTZXQoKTtcblxuICAvKipcbiAgICogSXNzdWUgYSB3YXJuaW5nIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgYmFzZWQgZWl0aGVyIG9uIGBjb2RlYCBvciBgd2FybmluZ2AuXG4gICAqIFdhcm5pbmdzIGFyZSBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5IG9ubHkgYnkgYHdhcm5pbmdgOyBkaXNhYmxpbmcgdmlhIGBjb2RlYFxuICAgKiBjYW4gYmUgZG9uZSBieSB1c2Vycy5cbiAgICovXG4gIGlzc3VlV2FybmluZyA9IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4ge1xuICAgIHdhcm5pbmcgKz0gYCBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy8ke2NvZGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLmA7XG4gICAgaWYgKFxuICAgICAgIWdsb2JhbC5saXRJc3N1ZWRXYXJuaW5ncyEuaGFzKHdhcm5pbmcpICYmXG4gICAgICAhZ2xvYmFsLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMoY29kZSlcbiAgICApIHtcbiAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbiAgICAgIGdsb2JhbC5saXRJc3N1ZWRXYXJuaW5ncyEuYWRkKHdhcm5pbmcpO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBCYXNlIGVsZW1lbnQgY2xhc3MgdGhhdCBtYW5hZ2VzIGVsZW1lbnQgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlcywgYW5kXG4gKiByZW5kZXJzIGEgbGl0LWh0bWwgdGVtcGxhdGUuXG4gKlxuICogVG8gZGVmaW5lIGEgY29tcG9uZW50LCBzdWJjbGFzcyBgTGl0RWxlbWVudGAgYW5kIGltcGxlbWVudCBhXG4gKiBgcmVuZGVyYCBtZXRob2QgdG8gcHJvdmlkZSB0aGUgY29tcG9uZW50J3MgdGVtcGxhdGUuIERlZmluZSBwcm9wZXJ0aWVzXG4gKiB1c2luZyB0aGUge0BsaW5rY29kZSBMaXRFbGVtZW50LnByb3BlcnRpZXMgcHJvcGVydGllc30gcHJvcGVydHkgb3IgdGhlXG4gKiB7QGxpbmtjb2RlIHByb3BlcnR5fSBkZWNvcmF0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaXRFbGVtZW50IGV4dGVuZHMgUmVhY3RpdmVFbGVtZW50IHtcbiAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgc3RhdGljIFsnXyRsaXRFbGVtZW50JCddID0gdHJ1ZTtcblxuICAvKipcbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcmVhZG9ubHkgcmVuZGVyT3B0aW9uczogUmVuZGVyT3B0aW9ucyA9IHtob3N0OiB0aGlzfTtcblxuICBwcml2YXRlIF9fY2hpbGRQYXJ0OiBSb290UGFydCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGNyZWF0ZVJlbmRlclJvb3QoKSB7XG4gICAgY29uc3QgcmVuZGVyUm9vdCA9IHN1cGVyLmNyZWF0ZVJlbmRlclJvb3QoKTtcbiAgICAvLyBXaGVuIGFkb3B0ZWRTdHlsZVNoZWV0cyBhcmUgc2hpbW1lZCwgdGhleSBhcmUgaW5zZXJ0ZWQgaW50byB0aGVcbiAgICAvLyBzaGFkb3dSb290IGJ5IGNyZWF0ZVJlbmRlclJvb3QuIEFkanVzdCB0aGUgcmVuZGVyQmVmb3JlIG5vZGUgc28gdGhhdFxuICAgIC8vIGFueSBzdHlsZXMgaW4gTGl0IGNvbnRlbnQgcmVuZGVyIGJlZm9yZSBhZG9wdGVkU3R5bGVTaGVldHMuIFRoaXMgaXNcbiAgICAvLyBpbXBvcnRhbnQgc28gdGhhdCBhZG9wdGVkU3R5bGVTaGVldHMgaGF2ZSBwcmVjZWRlbmNlIG92ZXIgc3R5bGVzIGluXG4gICAgLy8gdGhlIHNoYWRvd1Jvb3QuXG4gICAgdGhpcy5yZW5kZXJPcHRpb25zLnJlbmRlckJlZm9yZSA/Pz0gcmVuZGVyUm9vdCEuZmlyc3RDaGlsZCBhcyBDaGlsZE5vZGU7XG4gICAgcmV0dXJuIHJlbmRlclJvb3Q7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZWxlbWVudC4gVGhpcyBtZXRob2QgcmVmbGVjdHMgcHJvcGVydHkgdmFsdWVzIHRvIGF0dHJpYnV0ZXNcbiAgICogYW5kIGNhbGxzIGByZW5kZXJgIHRvIHJlbmRlciBET00gdmlhIGxpdC1odG1sLiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgKm5vdCogdHJpZ2dlciBhbm90aGVyIHVwZGF0ZS5cbiAgICogQHBhcmFtIGNoYW5nZWRQcm9wZXJ0aWVzIE1hcCBvZiBjaGFuZ2VkIHByb3BlcnRpZXMgd2l0aCBvbGQgdmFsdWVzXG4gICAqIEBjYXRlZ29yeSB1cGRhdGVzXG4gICAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzOiBQcm9wZXJ0eVZhbHVlcykge1xuICAgIC8vIFNldHRpbmcgcHJvcGVydGllcyBpbiBgcmVuZGVyYCBzaG91bGQgbm90IHRyaWdnZXIgYW4gdXBkYXRlLiBTaW5jZVxuICAgIC8vIHVwZGF0ZXMgYXJlIGFsbG93ZWQgYWZ0ZXIgc3VwZXIudXBkYXRlLCBpdCdzIGltcG9ydGFudCB0byBjYWxsIGByZW5kZXJgXG4gICAgLy8gYmVmb3JlIHRoYXQuXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnJlbmRlcigpO1xuICAgIGlmICghdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICB0aGlzLnJlbmRlck9wdGlvbnMuaXNDb25uZWN0ZWQgPSB0aGlzLmlzQ29ubmVjdGVkO1xuICAgIH1cbiAgICBzdXBlci51cGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIHRoaXMuX19jaGlsZFBhcnQgPSByZW5kZXIodmFsdWUsIHRoaXMucmVuZGVyUm9vdCwgdGhpcy5yZW5kZXJPcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhZGRlZCB0byB0aGUgZG9jdW1lbnQncyBET00uXG4gICAqXG4gICAqIEluIGBjb25uZWN0ZWRDYWxsYmFjaygpYCB5b3Ugc2hvdWxkIHNldHVwIHRhc2tzIHRoYXQgc2hvdWxkIG9ubHkgb2NjdXIgd2hlblxuICAgKiB0aGUgZWxlbWVudCBpcyBjb25uZWN0ZWQgdG8gdGhlIGRvY3VtZW50LiBUaGUgbW9zdCBjb21tb24gb2YgdGhlc2UgaXNcbiAgICogYWRkaW5nIGV2ZW50IGxpc3RlbmVycyB0byBub2RlcyBleHRlcm5hbCB0byB0aGUgZWxlbWVudCwgbGlrZSBhIGtleWRvd25cbiAgICogZXZlbnQgaGFuZGxlciBhZGRlZCB0byB0aGUgd2luZG93LlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICogICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgKiAgIGFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlkb3duKTtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogVHlwaWNhbGx5LCBhbnl0aGluZyBkb25lIGluIGBjb25uZWN0ZWRDYWxsYmFjaygpYCBzaG91bGQgYmUgdW5kb25lIHdoZW4gdGhlXG4gICAqIGVsZW1lbnQgaXMgZGlzY29ubmVjdGVkLCBpbiBgZGlzY29ubmVjdGVkQ2FsbGJhY2soKWAuXG4gICAqXG4gICAqIEBjYXRlZ29yeSBsaWZlY3ljbGVcbiAgICovXG4gIG92ZXJyaWRlIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5fX2NoaWxkUGFydD8uc2V0Q29ubmVjdGVkKHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIHJlbW92ZWQgZnJvbSB0aGUgZG9jdW1lbnQncyBET00uXG4gICAqXG4gICAqIFRoaXMgY2FsbGJhY2sgaXMgdGhlIG1haW4gc2lnbmFsIHRvIHRoZSBlbGVtZW50IHRoYXQgaXQgbWF5IG5vIGxvbmdlciBiZVxuICAgKiB1c2VkLiBgZGlzY29ubmVjdGVkQ2FsbGJhY2soKWAgc2hvdWxkIGVuc3VyZSB0aGF0IG5vdGhpbmcgaXMgaG9sZGluZyBhXG4gICAqIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCAoc3VjaCBhcyBldmVudCBsaXN0ZW5lcnMgYWRkZWQgdG8gbm9kZXMgZXh0ZXJuYWxcbiAgICogdG8gdGhlIGVsZW1lbnQpLCBzbyB0aGF0IGl0IGlzIGZyZWUgdG8gYmUgZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgKiAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAqICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlkb3duKTtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQW4gZWxlbWVudCBtYXkgYmUgcmUtY29ubmVjdGVkIGFmdGVyIGJlaW5nIGRpc2Nvbm5lY3RlZC5cbiAgICpcbiAgICogQGNhdGVnb3J5IGxpZmVjeWNsZVxuICAgKi9cbiAgb3ZlcnJpZGUgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9fY2hpbGRQYXJ0Py5zZXRDb25uZWN0ZWQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludm9rZWQgb24gZWFjaCB1cGRhdGUgdG8gcGVyZm9ybSByZW5kZXJpbmcgdGFza3MuIFRoaXMgbWV0aG9kIG1heSByZXR1cm5cbiAgICogYW55IHZhbHVlIHJlbmRlcmFibGUgYnkgbGl0LWh0bWwncyBgQ2hpbGRQYXJ0YCAtIHR5cGljYWxseSBhXG4gICAqIGBUZW1wbGF0ZVJlc3VsdGAuIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCAqbm90KiB0cmlnZ2VyXG4gICAqIHRoZSBlbGVtZW50IHRvIHVwZGF0ZS5cbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlbmRlcigpOiB1bmtub3duIHtcbiAgICByZXR1cm4gbm9DaGFuZ2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhpcyBjbGFzcyBpcyBtYXJrZWQgYXMgYGZpbmFsaXplZGAgYXMgYW4gb3B0aW1pemF0aW9uIGVuc3VyaW5nXG4gKiBpdCB3aWxsIG5vdCBuZWVkbGVzc2x5IHRyeSB0byBgZmluYWxpemVgLlxuICpcbiAqIE5vdGUgdGhpcyBwcm9wZXJ0eSBuYW1lIGlzIGEgc3RyaW5nIHRvIHByZXZlbnQgYnJlYWtpbmcgQ2xvc3VyZSBKUyBDb21waWxlclxuICogb3B0aW1pemF0aW9ucy4gU2VlIEBsaXQvcmVhY3RpdmUtZWxlbWVudCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqL1xuKExpdEVsZW1lbnQgYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilbXG4gIEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkoJ2ZpbmFsaXplZCcsIExpdEVsZW1lbnQpXG5dID0gdHJ1ZTtcblxuLy8gSW5zdGFsbCBoeWRyYXRpb24gaWYgYXZhaWxhYmxlXG5nbG9iYWwubGl0RWxlbWVudEh5ZHJhdGVTdXBwb3J0Py4oe0xpdEVsZW1lbnR9KTtcblxuLy8gQXBwbHkgcG9seWZpbGxzIGlmIGF2YWlsYWJsZVxuY29uc3QgcG9seWZpbGxTdXBwb3J0ID0gREVWX01PREVcbiAgPyBnbG9iYWwubGl0RWxlbWVudFBvbHlmaWxsU3VwcG9ydERldk1vZGVcbiAgOiBnbG9iYWwubGl0RWxlbWVudFBvbHlmaWxsU3VwcG9ydDtcbnBvbHlmaWxsU3VwcG9ydD8uKHtMaXRFbGVtZW50fSk7XG5cbi8qKlxuICogRU5EIFVTRVJTIFNIT1VMRCBOT1QgUkVMWSBPTiBUSElTIE9CSkVDVC5cbiAqXG4gKiBQcml2YXRlIGV4cG9ydHMgZm9yIHVzZSBieSBvdGhlciBMaXQgcGFja2FnZXMsIG5vdCBpbnRlbmRlZCBmb3IgdXNlIGJ5XG4gKiBleHRlcm5hbCB1c2Vycy5cbiAqXG4gKiBXZSBjdXJyZW50bHkgZG8gbm90IG1ha2UgYSBtYW5nbGVkIHJvbGx1cCBidWlsZCBvZiB0aGUgbGl0LXNzciBjb2RlLiBJbiBvcmRlclxuICogdG8ga2VlcCBhIG51bWJlciBvZiAob3RoZXJ3aXNlIHByaXZhdGUpIHRvcC1sZXZlbCBleHBvcnRzICBtYW5nbGVkIGluIHRoZVxuICogY2xpZW50IHNpZGUgY29kZSwgd2UgZXhwb3J0IGEgXyRMRSBvYmplY3QgY29udGFpbmluZyB0aG9zZSBtZW1iZXJzIChvclxuICogaGVscGVyIG1ldGhvZHMgZm9yIGFjY2Vzc2luZyBwcml2YXRlIGZpZWxkcyBvZiB0aG9zZSBtZW1iZXJzKSwgYW5kIHRoZW5cbiAqIHJlLWV4cG9ydCB0aGVtIGZvciB1c2UgaW4gbGl0LXNzci4gVGhpcyBrZWVwcyBsaXQtc3NyIGFnbm9zdGljIHRvIHdoZXRoZXIgdGhlXG4gKiBjbGllbnQtc2lkZSBjb2RlIGlzIGJlaW5nIHVzZWQgaW4gYGRldmAgbW9kZSBvciBgcHJvZGAgbW9kZS5cbiAqXG4gKiBUaGlzIGhhcyBhIHVuaXF1ZSBuYW1lLCB0byBkaXNhbWJpZ3VhdGUgaXQgZnJvbSBwcml2YXRlIGV4cG9ydHMgaW5cbiAqIGxpdC1odG1sLCBzaW5jZSB0aGlzIG1vZHVsZSByZS1leHBvcnRzIGFsbCBvZiBsaXQtaHRtbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgXyRMRSA9IHtcbiAgXyRhdHRyaWJ1dGVUb1Byb3BlcnR5OiAoXG4gICAgZWw6IExpdEVsZW1lbnQsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHZhbHVlOiBzdHJpbmcgfCBudWxsXG4gICkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIChlbCBhcyBhbnkpLl8kYXR0cmlidXRlVG9Qcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4gIH0sXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBfJGNoYW5nZWRQcm9wZXJ0aWVzOiAoZWw6IExpdEVsZW1lbnQpID0+IChlbCBhcyBhbnkpLl8kY2hhbmdlZFByb3BlcnRpZXMsXG59O1xuXG4vLyBJTVBPUlRBTlQ6IGRvIG5vdCBjaGFuZ2UgdGhlIHByb3BlcnR5IG5hbWUgb3IgdGhlIGFzc2lnbm1lbnQgZXhwcmVzc2lvbi5cbi8vIFRoaXMgbGluZSB3aWxsIGJlIHVzZWQgaW4gcmVnZXhlcyB0byBzZWFyY2ggZm9yIExpdEVsZW1lbnQgdXNhZ2UuXG4oZ2xvYmFsLmxpdEVsZW1lbnRWZXJzaW9ucyA/Pz0gW10pLnB1c2goJzQuMi4yJyk7XG5pZiAoREVWX01PREUgJiYgZ2xvYmFsLmxpdEVsZW1lbnRWZXJzaW9ucy5sZW5ndGggPiAxKSB7XG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBpc3N1ZVdhcm5pbmchKFxuICAgICAgJ211bHRpcGxlLXZlcnNpb25zJyxcbiAgICAgIGBNdWx0aXBsZSB2ZXJzaW9ucyBvZiBMaXQgbG9hZGVkLiBMb2FkaW5nIG11bHRpcGxlIHZlcnNpb25zIGAgK1xuICAgICAgICBgaXMgbm90IHJlY29tbWVuZGVkLmBcbiAgICApO1xuICB9KTtcbn1cbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMiBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKlxuICogVGhpcyBmaWxlIGV4cG9ydHMgYSBib29sZWFuIGNvbnN0IHdob3NlIHZhbHVlIHdpbGwgZGVwZW5kIG9uIHdoYXQgZW52aXJvbm1lbnRcbiAqIHRoZSBtb2R1bGUgaXMgYmVpbmcgaW1wb3J0ZWQgZnJvbS5cbiAqL1xuXG5jb25zdCBOT0RFX01PREUgPSBmYWxzZTtcblxuLyoqXG4gKiBBIGJvb2xlYW4gdGhhdCB3aWxsIGJlIGB0cnVlYCBpbiBzZXJ2ZXIgZW52aXJvbm1lbnRzIGxpa2UgTm9kZSwgYW5kIGBmYWxzZWBcbiAqIGluIGJyb3dzZXIgZW52aXJvbm1lbnRzLiBOb3RlIHRoYXQgeW91ciBzZXJ2ZXIgZW52aXJvbm1lbnQgb3IgdG9vbGNoYWluIG11c3RcbiAqIHN1cHBvcnQgdGhlIGBcIm5vZGVcImAgZXhwb3J0IGNvbmRpdGlvbiBmb3IgdGhpcyB0byBiZSBgdHJ1ZWAuXG4gKlxuICogVGhpcyBjYW4gYmUgdXNlZCB3aGVuIGF1dGhvcmluZyBjb21wb25lbnRzIHRvIGNoYW5nZSBiZWhhdmlvciBiYXNlZCBvblxuICogd2hldGhlciBvciBub3QgdGhlIGNvbXBvbmVudCBpcyBleGVjdXRpbmcgaW4gYW4gU1NSIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NlcnZlciA9IE5PREVfTU9ERTtcbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuLypcbiAqIElNUE9SVEFOVDogRm9yIGNvbXBhdGliaWxpdHkgd2l0aCB0c2lja2xlIGFuZCB0aGUgQ2xvc3VyZSBKUyBjb21waWxlciwgYWxsXG4gKiBwcm9wZXJ0eSBkZWNvcmF0b3JzIChidXQgbm90IGNsYXNzIGRlY29yYXRvcnMpIGluIHRoaXMgZmlsZSB0aGF0IGhhdmVcbiAqIGFuIEBFeHBvcnREZWNvcmF0ZWRJdGVtcyBhbm5vdGF0aW9uIG11c3QgYmUgZGVmaW5lZCBhcyBhIHJlZ3VsYXIgZnVuY3Rpb24sXG4gKiBub3QgYW4gYXJyb3cgZnVuY3Rpb24uXG4gKi9cblxuaW1wb3J0IHR5cGUge0NvbnN0cnVjdG9yfSBmcm9tICcuL2Jhc2UuanMnO1xuXG4vKipcbiAqIEFsbG93IGZvciBjdXN0b20gZWxlbWVudCBjbGFzc2VzIHdpdGggcHJpdmF0ZSBjb25zdHJ1Y3RvcnNcbiAqL1xudHlwZSBDdXN0b21FbGVtZW50Q2xhc3MgPSBPbWl0PHR5cGVvZiBIVE1MRWxlbWVudCwgJ25ldyc+O1xuXG5leHBvcnQgdHlwZSBDdXN0b21FbGVtZW50RGVjb3JhdG9yID0ge1xuICAvLyBsZWdhY3lcbiAgKGNsczogQ3VzdG9tRWxlbWVudENsYXNzKTogdm9pZDtcblxuICAvLyBzdGFuZGFyZFxuICAoXG4gICAgdGFyZ2V0OiBDdXN0b21FbGVtZW50Q2xhc3MsXG4gICAgY29udGV4dDogQ2xhc3NEZWNvcmF0b3JDb250ZXh0PENvbnN0cnVjdG9yPEhUTUxFbGVtZW50Pj5cbiAgKTogdm9pZDtcbn07XG5cbi8qKlxuICogQ2xhc3MgZGVjb3JhdG9yIGZhY3RvcnkgdGhhdCBkZWZpbmVzIHRoZSBkZWNvcmF0ZWQgY2xhc3MgYXMgYSBjdXN0b20gZWxlbWVudC5cbiAqXG4gKiBgYGBqc1xuICogQGN1c3RvbUVsZW1lbnQoJ215LWVsZW1lbnQnKVxuICogY2xhc3MgTXlFbGVtZW50IGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gKiAgIHJlbmRlcigpIHtcbiAqICAgICByZXR1cm4gaHRtbGBgO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqIEBwYXJhbSB0YWdOYW1lIFRoZSB0YWcgbmFtZSBvZiB0aGUgY3VzdG9tIGVsZW1lbnQgdG8gZGVmaW5lLlxuICovXG5leHBvcnQgY29uc3QgY3VzdG9tRWxlbWVudCA9XG4gICh0YWdOYW1lOiBzdHJpbmcpOiBDdXN0b21FbGVtZW50RGVjb3JhdG9yID0+XG4gIChcbiAgICBjbGFzc09yVGFyZ2V0OiBDdXN0b21FbGVtZW50Q2xhc3MgfCBDb25zdHJ1Y3RvcjxIVE1MRWxlbWVudD4sXG4gICAgY29udGV4dD86IENsYXNzRGVjb3JhdG9yQ29udGV4dDxDb25zdHJ1Y3RvcjxIVE1MRWxlbWVudD4+XG4gICkgPT4ge1xuICAgIGlmIChjb250ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIoKCkgPT4ge1xuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXG4gICAgICAgICAgdGFnTmFtZSxcbiAgICAgICAgICBjbGFzc09yVGFyZ2V0IGFzIEN1c3RvbUVsZW1lbnRDb25zdHJ1Y3RvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSh0YWdOYW1lLCBjbGFzc09yVGFyZ2V0IGFzIEN1c3RvbUVsZW1lbnRDb25zdHJ1Y3Rvcik7XG4gICAgfVxuICB9O1xuIiwgIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuXG4vKlxuICogSU1QT1JUQU5UOiBGb3IgY29tcGF0aWJpbGl0eSB3aXRoIHRzaWNrbGUgYW5kIHRoZSBDbG9zdXJlIEpTIGNvbXBpbGVyLCBhbGxcbiAqIHByb3BlcnR5IGRlY29yYXRvcnMgKGJ1dCBub3QgY2xhc3MgZGVjb3JhdG9ycykgaW4gdGhpcyBmaWxlIHRoYXQgaGF2ZVxuICogYW4gQEV4cG9ydERlY29yYXRlZEl0ZW1zIGFubm90YXRpb24gbXVzdCBiZSBkZWZpbmVkIGFzIGEgcmVndWxhciBmdW5jdGlvbixcbiAqIG5vdCBhbiBhcnJvdyBmdW5jdGlvbi5cbiAqL1xuXG5pbXBvcnQge1xuICB0eXBlIFByb3BlcnR5RGVjbGFyYXRpb24sXG4gIHR5cGUgUmVhY3RpdmVFbGVtZW50LFxuICBkZWZhdWx0Q29udmVydGVyLFxuICBub3RFcXVhbCxcbn0gZnJvbSAnLi4vcmVhY3RpdmUtZWxlbWVudC5qcyc7XG5pbXBvcnQgdHlwZSB7SW50ZXJmYWNlfSBmcm9tICcuL2Jhc2UuanMnO1xuXG5jb25zdCBERVZfTU9ERSA9IHRydWU7XG5cbmxldCBpc3N1ZVdhcm5pbmc6IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4gdm9pZDtcblxuaWYgKERFVl9NT0RFKSB7XG4gIC8vIEVuc3VyZSB3YXJuaW5ncyBhcmUgaXNzdWVkIG9ubHkgMXgsIGV2ZW4gaWYgbXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0XG4gIC8vIGFyZSBsb2FkZWQuXG4gIGdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MgPz89IG5ldyBTZXQoKTtcblxuICAvKipcbiAgICogSXNzdWUgYSB3YXJuaW5nIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgYmFzZWQgZWl0aGVyIG9uIGBjb2RlYCBvciBgd2FybmluZ2AuXG4gICAqIFdhcm5pbmdzIGFyZSBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5IG9ubHkgYnkgYHdhcm5pbmdgOyBkaXNhYmxpbmcgdmlhIGBjb2RlYFxuICAgKiBjYW4gYmUgZG9uZSBieSB1c2Vycy5cbiAgICovXG4gIGlzc3VlV2FybmluZyA9IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4ge1xuICAgIHdhcm5pbmcgKz0gYCBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy8ke2NvZGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLmA7XG4gICAgaWYgKFxuICAgICAgIWdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MhLmhhcyh3YXJuaW5nKSAmJlxuICAgICAgIWdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MhLmhhcyhjb2RlKVxuICAgICkge1xuICAgICAgY29uc29sZS53YXJuKHdhcm5pbmcpO1xuICAgICAgZ2xvYmFsVGhpcy5saXRJc3N1ZWRXYXJuaW5ncyEuYWRkKHdhcm5pbmcpO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gT3ZlcmxvYWRzIGZvciBwcm9wZXJ0eSBkZWNvcmF0b3Igc28gdGhhdCBUeXBlU2NyaXB0IGNhbiBpbmZlciB0aGUgY29ycmVjdFxuLy8gcmV0dXJuIHR5cGUgd2hlbiBhIGRlY29yYXRvciBpcyB1c2VkIGFzIGFuIGFjY2Vzc29yIGRlY29yYXRvciBvciBhIHNldHRlclxuLy8gZGVjb3JhdG9yLlxuZXhwb3J0IHR5cGUgUHJvcGVydHlEZWNvcmF0b3IgPSB7XG4gIC8vIGFjY2Vzc29yIGRlY29yYXRvciBzaWduYXR1cmVcbiAgPEMgZXh0ZW5kcyBJbnRlcmZhY2U8UmVhY3RpdmVFbGVtZW50PiwgVj4oXG4gICAgdGFyZ2V0OiBDbGFzc0FjY2Vzc29yRGVjb3JhdG9yVGFyZ2V0PEMsIFY+LFxuICAgIGNvbnRleHQ6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gICk6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JSZXN1bHQ8QywgVj47XG5cbiAgLy8gc2V0dGVyIGRlY29yYXRvciBzaWduYXR1cmVcbiAgPEMgZXh0ZW5kcyBJbnRlcmZhY2U8UmVhY3RpdmVFbGVtZW50PiwgVj4oXG4gICAgdGFyZ2V0OiAodmFsdWU6IFYpID0+IHZvaWQsXG4gICAgY29udGV4dDogQ2xhc3NTZXR0ZXJEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gICk6ICh0aGlzOiBDLCB2YWx1ZTogVikgPT4gdm9pZDtcblxuICAvLyBsZWdhY3kgZGVjb3JhdG9yIHNpZ25hdHVyZVxuICAoXG4gICAgcHJvdG9PckRlc2NyaXB0b3I6IE9iamVjdCxcbiAgICBuYW1lOiBQcm9wZXJ0eUtleSxcbiAgICBkZXNjcmlwdG9yPzogUHJvcGVydHlEZXNjcmlwdG9yXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgKTogYW55O1xufTtcblxuY29uc3QgbGVnYWN5UHJvcGVydHkgPSAoXG4gIG9wdGlvbnM6IFByb3BlcnR5RGVjbGFyYXRpb24gfCB1bmRlZmluZWQsXG4gIHByb3RvOiBPYmplY3QsXG4gIG5hbWU6IFByb3BlcnR5S2V5XG4pID0+IHtcbiAgY29uc3QgaGFzT3duUHJvcGVydHkgPSBwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgKHByb3RvLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpLmNyZWF0ZVByb3BlcnR5KG5hbWUsIG9wdGlvbnMpO1xuICAvLyBGb3IgYWNjZXNzb3JzICh3aGljaCBoYXZlIGEgZGVzY3JpcHRvciBvbiB0aGUgcHJvdG90eXBlKSB3ZSBuZWVkIHRvXG4gIC8vIHJldHVybiBhIGRlc2NyaXB0b3IsIG90aGVyd2lzZSBUeXBlU2NyaXB0IG92ZXJ3cml0ZXMgdGhlIGRlc2NyaXB0b3Igd2VcbiAgLy8gZGVmaW5lIGluIGNyZWF0ZVByb3BlcnR5KCkgd2l0aCB0aGUgb3JpZ2luYWwgZGVzY3JpcHRvci4gV2UgZG9uJ3QgZG8gdGhpc1xuICAvLyBmb3IgZmllbGRzLCB3aGljaCBkb24ndCBoYXZlIGEgZGVzY3JpcHRvciwgYmVjYXVzZSB0aGlzIGNvdWxkIG92ZXJ3cml0ZVxuICAvLyBkZXNjcmlwdG9yIGRlZmluZWQgYnkgb3RoZXIgZGVjb3JhdG9ycy5cbiAgcmV0dXJuIGhhc093blByb3BlcnR5XG4gICAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBuYW1lKVxuICAgIDogdW5kZWZpbmVkO1xufTtcblxuLy8gVGhpcyBpcyBkdXBsaWNhdGVkIGZyb20gYSBzaW1pbGFyIHZhcmlhYmxlIGluIHJlYWN0aXZlLWVsZW1lbnQudHMsIGJ1dFxuLy8gYWN0dWFsbHkgbWFrZXMgc2Vuc2UgdG8gaGF2ZSB0aGlzIGRlZmF1bHQgZGVmaW5lZCB3aXRoIHRoZSBkZWNvcmF0b3IsIHNvXG4vLyB0aGF0IGRpZmZlcmVudCBkZWNvcmF0b3JzIGNvdWxkIGhhdmUgZGlmZmVyZW50IGRlZmF1bHRzLlxuY29uc3QgZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb246IFByb3BlcnR5RGVjbGFyYXRpb24gPSB7XG4gIGF0dHJpYnV0ZTogdHJ1ZSxcbiAgdHlwZTogU3RyaW5nLFxuICBjb252ZXJ0ZXI6IGRlZmF1bHRDb252ZXJ0ZXIsXG4gIHJlZmxlY3Q6IGZhbHNlLFxuICBoYXNDaGFuZ2VkOiBub3RFcXVhbCxcbn07XG5cbi8vIFRlbXBvcmFyeSB0eXBlLCB1bnRpbCBnb29nbGUzIGlzIG9uIFR5cGVTY3JpcHQgNS4yXG50eXBlIFN0YW5kYXJkUHJvcGVydHlDb250ZXh0PEMsIFY+ID0gKFxuICB8IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gIHwgQ2xhc3NTZXR0ZXJEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4pICYge21ldGFkYXRhOiBvYmplY3R9O1xuXG4vKipcbiAqIFdyYXBzIGEgY2xhc3MgYWNjZXNzb3Igb3Igc2V0dGVyIHNvIHRoYXQgYHJlcXVlc3RVcGRhdGUoKWAgaXMgY2FsbGVkIHdpdGggdGhlXG4gKiBwcm9wZXJ0eSBuYW1lIGFuZCBvbGQgdmFsdWUgd2hlbiB0aGUgYWNjZXNzb3IgaXMgc2V0LlxuICovXG5leHBvcnQgY29uc3Qgc3RhbmRhcmRQcm9wZXJ0eSA9IDxDIGV4dGVuZHMgSW50ZXJmYWNlPFJlYWN0aXZlRWxlbWVudD4sIFY+KFxuICBvcHRpb25zOiBQcm9wZXJ0eURlY2xhcmF0aW9uID0gZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb24sXG4gIHRhcmdldDogQ2xhc3NBY2Nlc3NvckRlY29yYXRvclRhcmdldDxDLCBWPiB8ICgodmFsdWU6IFYpID0+IHZvaWQpLFxuICBjb250ZXh0OiBTdGFuZGFyZFByb3BlcnR5Q29udGV4dDxDLCBWPlxuKTogQ2xhc3NBY2Nlc3NvckRlY29yYXRvclJlc3VsdDxDLCBWPiB8ICgodGhpczogQywgdmFsdWU6IFYpID0+IHZvaWQpID0+IHtcbiAgY29uc3Qge2tpbmQsIG1ldGFkYXRhfSA9IGNvbnRleHQ7XG5cbiAgaWYgKERFVl9NT0RFICYmIG1ldGFkYXRhID09IG51bGwpIHtcbiAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAnbWlzc2luZy1jbGFzcy1tZXRhZGF0YScsXG4gICAgICBgVGhlIGNsYXNzICR7dGFyZ2V0fSBpcyBtaXNzaW5nIGRlY29yYXRvciBtZXRhZGF0YS4gVGhpcyBgICtcbiAgICAgICAgYGNvdWxkIG1lYW4gdGhhdCB5b3UncmUgdXNpbmcgYSBjb21waWxlciB0aGF0IHN1cHBvcnRzIGRlY29yYXRvcnMgYCArXG4gICAgICAgIGBidXQgZG9lc24ndCBzdXBwb3J0IGRlY29yYXRvciBtZXRhZGF0YSwgc3VjaCBhcyBUeXBlU2NyaXB0IDUuMS4gYCArXG4gICAgICAgIGBQbGVhc2UgdXBkYXRlIHlvdXIgY29tcGlsZXIuYFxuICAgICk7XG4gIH1cblxuICAvLyBTdG9yZSB0aGUgcHJvcGVydHkgb3B0aW9uc1xuICBsZXQgcHJvcGVydGllcyA9IGdsb2JhbFRoaXMubGl0UHJvcGVydHlNZXRhZGF0YS5nZXQobWV0YWRhdGEpO1xuICBpZiAocHJvcGVydGllcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZ2xvYmFsVGhpcy5saXRQcm9wZXJ0eU1ldGFkYXRhLnNldChtZXRhZGF0YSwgKHByb3BlcnRpZXMgPSBuZXcgTWFwKCkpKTtcbiAgfVxuICBpZiAoa2luZCA9PT0gJ3NldHRlcicpIHtcbiAgICBvcHRpb25zID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zKTtcbiAgICBvcHRpb25zLndyYXBwZWQgPSB0cnVlO1xuICB9XG4gIHByb3BlcnRpZXMuc2V0KGNvbnRleHQubmFtZSwgb3B0aW9ucyk7XG5cbiAgaWYgKGtpbmQgPT09ICdhY2Nlc3NvcicpIHtcbiAgICAvLyBTdGFuZGFyZCBkZWNvcmF0b3JzIGNhbm5vdCBkeW5hbWljYWxseSBtb2RpZnkgdGhlIGNsYXNzLCBzbyB3ZSBjYW4ndFxuICAgIC8vIHJlcGxhY2UgYSBmaWVsZCB3aXRoIGFjY2Vzc29ycy4gVGhlIHVzZXIgbXVzdCB1c2UgdGhlIG5ldyBgYWNjZXNzb3JgXG4gICAgLy8ga2V5d29yZCBpbnN0ZWFkLlxuICAgIGNvbnN0IHtuYW1lfSA9IGNvbnRleHQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldCh0aGlzOiBSZWFjdGl2ZUVsZW1lbnQsIHY6IFYpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSAoXG4gICAgICAgICAgdGFyZ2V0IGFzIENsYXNzQWNjZXNzb3JEZWNvcmF0b3JUYXJnZXQ8QywgVj5cbiAgICAgICAgKS5nZXQuY2FsbCh0aGlzIGFzIHVua25vd24gYXMgQyk7XG4gICAgICAgICh0YXJnZXQgYXMgQ2xhc3NBY2Nlc3NvckRlY29yYXRvclRhcmdldDxDLCBWPikuc2V0LmNhbGwoXG4gICAgICAgICAgdGhpcyBhcyB1bmtub3duIGFzIEMsXG4gICAgICAgICAgdlxuICAgICAgICApO1xuICAgICAgICB0aGlzLnJlcXVlc3RVcGRhdGUobmFtZSwgb2xkVmFsdWUsIG9wdGlvbnMsIHRydWUsIHYpO1xuICAgICAgfSxcbiAgICAgIGluaXQodGhpczogUmVhY3RpdmVFbGVtZW50LCB2OiBWKTogViB7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLl8kY2hhbmdlUHJvcGVydHkobmFtZSwgdW5kZWZpbmVkLCBvcHRpb25zLCB2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH0sXG4gICAgfSBhcyB1bmtub3duIGFzIENsYXNzQWNjZXNzb3JEZWNvcmF0b3JSZXN1bHQ8QywgVj47XG4gIH0gZWxzZSBpZiAoa2luZCA9PT0gJ3NldHRlcicpIHtcbiAgICBjb25zdCB7bmFtZX0gPSBjb250ZXh0O1xuICAgIHJldHVybiBmdW5jdGlvbiAodGhpczogUmVhY3RpdmVFbGVtZW50LCB2YWx1ZTogVikge1xuICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzW25hbWUgYXMga2V5b2YgUmVhY3RpdmVFbGVtZW50XTtcbiAgICAgICh0YXJnZXQgYXMgKHZhbHVlOiBWKSA9PiB2b2lkKS5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgIHRoaXMucmVxdWVzdFVwZGF0ZShuYW1lLCBvbGRWYWx1ZSwgb3B0aW9ucywgdHJ1ZSwgdmFsdWUpO1xuICAgIH0gYXMgdW5rbm93biBhcyAodGhpczogQywgdmFsdWU6IFYpID0+IHZvaWQ7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBkZWNvcmF0b3IgbG9jYXRpb246ICR7a2luZH1gKTtcbn07XG5cbi8qKlxuICogQSBjbGFzcyBmaWVsZCBvciBhY2Nlc3NvciBkZWNvcmF0b3Igd2hpY2ggY3JlYXRlcyBhIHJlYWN0aXZlIHByb3BlcnR5IHRoYXRcbiAqIHJlZmxlY3RzIGEgY29ycmVzcG9uZGluZyBhdHRyaWJ1dGUgdmFsdWUuIFdoZW4gYSBkZWNvcmF0ZWQgcHJvcGVydHkgaXMgc2V0XG4gKiB0aGUgZWxlbWVudCB3aWxsIHVwZGF0ZSBhbmQgcmVuZGVyLiBBIHtAbGlua2NvZGUgUHJvcGVydHlEZWNsYXJhdGlvbn0gbWF5XG4gKiBvcHRpb25hbGx5IGJlIHN1cHBsaWVkIHRvIGNvbmZpZ3VyZSBwcm9wZXJ0eSBmZWF0dXJlcy5cbiAqXG4gKiBUaGlzIGRlY29yYXRvciBzaG91bGQgb25seSBiZSB1c2VkIGZvciBwdWJsaWMgZmllbGRzLiBBcyBwdWJsaWMgZmllbGRzLFxuICogcHJvcGVydGllcyBzaG91bGQgYmUgY29uc2lkZXJlZCBhcyBwcmltYXJpbHkgc2V0dGFibGUgYnkgZWxlbWVudCB1c2VycyxcbiAqIGVpdGhlciB2aWEgYXR0cmlidXRlIG9yIHRoZSBwcm9wZXJ0eSBpdHNlbGYuXG4gKlxuICogR2VuZXJhbGx5LCBwcm9wZXJ0aWVzIHRoYXQgYXJlIGNoYW5nZWQgYnkgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIHByaXZhdGUgb3JcbiAqIHByb3RlY3RlZCBmaWVsZHMgYW5kIHNob3VsZCB1c2UgdGhlIHtAbGlua2NvZGUgc3RhdGV9IGRlY29yYXRvci5cbiAqXG4gKiBIb3dldmVyLCBzb21ldGltZXMgZWxlbWVudCBjb2RlIGRvZXMgbmVlZCB0byBzZXQgYSBwdWJsaWMgcHJvcGVydHkuIFRoaXNcbiAqIHNob3VsZCB0eXBpY2FsbHkgb25seSBiZSBkb25lIGluIHJlc3BvbnNlIHRvIHVzZXIgaW50ZXJhY3Rpb24sIGFuZCBhbiBldmVudFxuICogc2hvdWxkIGJlIGZpcmVkIGluZm9ybWluZyB0aGUgdXNlcjsgZm9yIGV4YW1wbGUsIGEgY2hlY2tib3ggc2V0cyBpdHNcbiAqIGBjaGVja2VkYCBwcm9wZXJ0eSB3aGVuIGNsaWNrZWQgYW5kIGZpcmVzIGEgYGNoYW5nZWRgIGV2ZW50LiBNdXRhdGluZyBwdWJsaWNcbiAqIHByb3BlcnRpZXMgc2hvdWxkIHR5cGljYWxseSBub3QgYmUgZG9uZSBmb3Igbm9uLXByaW1pdGl2ZSAob2JqZWN0IG9yIGFycmF5KVxuICogcHJvcGVydGllcy4gSW4gb3RoZXIgY2FzZXMgd2hlbiBhbiBlbGVtZW50IG5lZWRzIHRvIG1hbmFnZSBzdGF0ZSwgYSBwcml2YXRlXG4gKiBwcm9wZXJ0eSBkZWNvcmF0ZWQgdmlhIHRoZSB7QGxpbmtjb2RlIHN0YXRlfSBkZWNvcmF0b3Igc2hvdWxkIGJlIHVzZWQuIFdoZW5cbiAqIG5lZWRlZCwgc3RhdGUgcHJvcGVydGllcyBjYW4gYmUgaW5pdGlhbGl6ZWQgdmlhIHB1YmxpYyBwcm9wZXJ0aWVzIHRvXG4gKiBmYWNpbGl0YXRlIGNvbXBsZXggaW50ZXJhY3Rpb25zLlxuICpcbiAqIGBgYHRzXG4gKiBjbGFzcyBNeUVsZW1lbnQge1xuICogICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gKiAgIGNsaWNrZWQgPSBmYWxzZTtcbiAqIH1cbiAqIGBgYFxuICogQGNhdGVnb3J5IERlY29yYXRvclxuICogQEV4cG9ydERlY29yYXRlZEl0ZW1zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eShvcHRpb25zPzogUHJvcGVydHlEZWNsYXJhdGlvbik6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIDxDIGV4dGVuZHMgSW50ZXJmYWNlPFJlYWN0aXZlRWxlbWVudD4sIFY+KFxuICAgIHByb3RvT3JUYXJnZXQ6XG4gICAgICB8IG9iamVjdFxuICAgICAgfCBDbGFzc0FjY2Vzc29yRGVjb3JhdG9yVGFyZ2V0PEMsIFY+XG4gICAgICB8ICgodmFsdWU6IFYpID0+IHZvaWQpLFxuICAgIG5hbWVPckNvbnRleHQ6XG4gICAgICB8IFByb3BlcnR5S2V5XG4gICAgICB8IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gICAgICB8IENsYXNzU2V0dGVyRGVjb3JhdG9yQ29udGV4dDxDLCBWPlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICk6IGFueSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiBuYW1lT3JDb250ZXh0ID09PSAnb2JqZWN0J1xuICAgICAgICA/IHN0YW5kYXJkUHJvcGVydHk8QywgVj4oXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgcHJvdG9PclRhcmdldCBhc1xuICAgICAgICAgICAgICB8IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JUYXJnZXQ8QywgVj5cbiAgICAgICAgICAgICAgfCAoKHZhbHVlOiBWKSA9PiB2b2lkKSxcbiAgICAgICAgICAgIG5hbWVPckNvbnRleHQgYXMgU3RhbmRhcmRQcm9wZXJ0eUNvbnRleHQ8QywgVj5cbiAgICAgICAgICApXG4gICAgICAgIDogbGVnYWN5UHJvcGVydHkoXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgcHJvdG9PclRhcmdldCBhcyBPYmplY3QsXG4gICAgICAgICAgICBuYW1lT3JDb250ZXh0IGFzIFByb3BlcnR5S2V5XG4gICAgICAgICAgKVxuICAgICkgYXMgUHJvcGVydHlEZWNvcmF0b3I7XG4gIH07XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8qXG4gKiBJTVBPUlRBTlQ6IEZvciBjb21wYXRpYmlsaXR5IHdpdGggdHNpY2tsZSBhbmQgdGhlIENsb3N1cmUgSlMgY29tcGlsZXIsIGFsbFxuICogcHJvcGVydHkgZGVjb3JhdG9ycyAoYnV0IG5vdCBjbGFzcyBkZWNvcmF0b3JzKSBpbiB0aGlzIGZpbGUgdGhhdCBoYXZlXG4gKiBhbiBARXhwb3J0RGVjb3JhdGVkSXRlbXMgYW5ub3RhdGlvbiBtdXN0IGJlIGRlZmluZWQgYXMgYSByZWd1bGFyIGZ1bmN0aW9uLFxuICogbm90IGFuIGFycm93IGZ1bmN0aW9uLlxuICovXG5cbmltcG9ydCB7cHJvcGVydHl9IGZyb20gJy4vcHJvcGVydHkuanMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlRGVjbGFyYXRpb248VHlwZSA9IHVua25vd24+IHtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBpbmRpY2F0ZXMgaWYgYSBwcm9wZXJ0eSBzaG91bGQgYmUgY29uc2lkZXJlZCBjaGFuZ2VkIHdoZW5cbiAgICogaXQgaXMgc2V0LiBUaGUgZnVuY3Rpb24gc2hvdWxkIHRha2UgdGhlIGBuZXdWYWx1ZWAgYW5kIGBvbGRWYWx1ZWAgYW5kXG4gICAqIHJldHVybiBgdHJ1ZWAgaWYgYW4gdXBkYXRlIHNob3VsZCBiZSByZXF1ZXN0ZWQuXG4gICAqL1xuICBoYXNDaGFuZ2VkPyh2YWx1ZTogVHlwZSwgb2xkVmFsdWU6IFR5cGUpOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSBTdGF0ZURlY2xhcmF0aW9uXG4gKi9cbmV4cG9ydCB0eXBlIEludGVybmFsUHJvcGVydHlEZWNsYXJhdGlvbjxUeXBlID0gdW5rbm93bj4gPVxuICBTdGF0ZURlY2xhcmF0aW9uPFR5cGU+O1xuXG4vKipcbiAqIERlY2xhcmVzIGEgcHJpdmF0ZSBvciBwcm90ZWN0ZWQgcmVhY3RpdmUgcHJvcGVydHkgdGhhdCBzdGlsbCB0cmlnZ2Vyc1xuICogdXBkYXRlcyB0byB0aGUgZWxlbWVudCB3aGVuIGl0IGNoYW5nZXMuIEl0IGRvZXMgbm90IHJlZmxlY3QgZnJvbSB0aGVcbiAqIGNvcnJlc3BvbmRpbmcgYXR0cmlidXRlLlxuICpcbiAqIFByb3BlcnRpZXMgZGVjbGFyZWQgdGhpcyB3YXkgbXVzdCBub3QgYmUgdXNlZCBmcm9tIEhUTUwgb3IgSFRNTCB0ZW1wbGF0aW5nXG4gKiBzeXN0ZW1zLCB0aGV5J3JlIHNvbGVseSBmb3IgcHJvcGVydGllcyBpbnRlcm5hbCB0byB0aGUgZWxlbWVudC4gVGhlc2VcbiAqIHByb3BlcnRpZXMgbWF5IGJlIHJlbmFtZWQgYnkgb3B0aW1pemF0aW9uIHRvb2xzIGxpa2UgY2xvc3VyZSBjb21waWxlci5cbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlKG9wdGlvbnM/OiBTdGF0ZURlY2xhcmF0aW9uKSB7XG4gIHJldHVybiBwcm9wZXJ0eSh7XG4gICAgLi4ub3B0aW9ucyxcbiAgICAvLyBBZGQgYm90aCBgc3RhdGVgIGFuZCBgYXR0cmlidXRlYCBiZWNhdXNlIHdlIGZvdW5kIGEgdGhpcmQgcGFydHlcbiAgICAvLyBjb250cm9sbGVyIHRoYXQgaXMga2V5aW5nIG9mZiBvZiBQcm9wZXJ0eU9wdGlvbnMuc3RhdGUgdG8gZGV0ZXJtaW5lXG4gICAgLy8gd2hldGhlciBhIGZpZWxkIGlzIGEgcHJpdmF0ZSBpbnRlcm5hbCBwcm9wZXJ0eSBvciBub3QuXG4gICAgc3RhdGU6IHRydWUsXG4gICAgYXR0cmlidXRlOiBmYWxzZSxcbiAgfSk7XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcHVibGljIGludGVyZmFjZSB0eXBlIHRoYXQgcmVtb3ZlcyBwcml2YXRlIGFuZCBwcm90ZWN0ZWQgZmllbGRzLlxuICogVGhpcyBhbGxvd3MgYWNjZXB0aW5nIG90aGVyd2lzZSBpbmNvbXBhdGlibGUgdmVyc2lvbnMgb2YgdGhlIHR5cGUgKGUuZy4gZnJvbVxuICogbXVsdGlwbGUgY29waWVzIG9mIHRoZSBzYW1lIHBhY2thZ2UgaW4gYG5vZGVfbW9kdWxlc2ApLlxuICovXG5leHBvcnQgdHlwZSBJbnRlcmZhY2U8VD4gPSB7XG4gIFtLIGluIGtleW9mIFRdOiBUW0tdO1xufTtcblxuZXhwb3J0IHR5cGUgQ29uc3RydWN0b3I8VD4gPSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIG5ldyAoLi4uYXJnczogYW55W10pOiBUO1xufTtcblxuLyoqXG4gKiBXcmFwcyB1cCBhIGZldyBiZXN0IHByYWN0aWNlcyB3aGVuIHJldHVybmluZyBhIHByb3BlcnR5IGRlc2NyaXB0b3IgZnJvbSBhXG4gKiBkZWNvcmF0b3IuXG4gKlxuICogTWFya3MgdGhlIGRlZmluZWQgcHJvcGVydHkgYXMgY29uZmlndXJhYmxlLCBhbmQgZW51bWVyYWJsZSwgYW5kIGhhbmRsZXNcbiAqIHRoZSBjYXNlIHdoZXJlIHdlIGhhdmUgYSBidXN0ZWQgUmVmbGVjdC5kZWNvcmF0ZSB6b21iaWVmaWxsIChlLmcuIGluIEFuZ3VsYXJcbiAqIGFwcHMpLlxuICpcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgZGVzYyA9IChcbiAgb2JqOiBvYmplY3QsXG4gIG5hbWU6IFByb3BlcnR5S2V5IHwgQ2xhc3NBY2Nlc3NvckRlY29yYXRvckNvbnRleHQ8dW5rbm93biwgdW5rbm93bj4sXG4gIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxuKSA9PiB7XG4gIC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSwgd2Uga2VlcCB0aGVtIGNvbmZpZ3VyYWJsZSBhbmQgZW51bWVyYWJsZS5cbiAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSB0cnVlO1xuICBpZiAoXG4gICAgLy8gV2UgY2hlY2sgZm9yIFJlZmxlY3QuZGVjb3JhdGUgZWFjaCB0aW1lLCBpbiBjYXNlIHRoZSB6b21iaWVmaWxsXG4gICAgLy8gaXMgYXBwbGllZCB2aWEgbGF6eSBsb2FkaW5nIHNvbWUgQW5ndWxhciBjb2RlLlxuICAgIChSZWZsZWN0IGFzIHR5cGVvZiBSZWZsZWN0ICYge2RlY29yYXRlPzogdW5rbm93bn0pLmRlY29yYXRlICYmXG4gICAgdHlwZW9mIG5hbWUgIT09ICdvYmplY3QnXG4gICkge1xuICAgIC8vIElmIHdlJ3JlIGNhbGxlZCBhcyBhIGxlZ2FjeSBkZWNvcmF0b3IsIGFuZCBSZWZsZWN0LmRlY29yYXRlIGlzIHByZXNlbnRcbiAgICAvLyB0aGVuIHdlIGhhdmUgbm8gZ3VhcmFudGVlcyB0aGF0IHRoZSByZXR1cm5lZCBkZXNjcmlwdG9yIHdpbGwgYmVcbiAgICAvLyBkZWZpbmVkIG9uIHRoZSBjbGFzcywgc28gd2UgbXVzdCBhcHBseSBpdCBkaXJlY3RseSBvdXJzZWx2ZXMuXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgfVxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn07XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8qXG4gKiBJTVBPUlRBTlQ6IEZvciBjb21wYXRpYmlsaXR5IHdpdGggdHNpY2tsZSBhbmQgdGhlIENsb3N1cmUgSlMgY29tcGlsZXIsIGFsbFxuICogcHJvcGVydHkgZGVjb3JhdG9ycyAoYnV0IG5vdCBjbGFzcyBkZWNvcmF0b3JzKSBpbiB0aGlzIGZpbGUgdGhhdCBoYXZlXG4gKiBhbiBARXhwb3J0RGVjb3JhdGVkSXRlbXMgYW5ub3RhdGlvbiBtdXN0IGJlIGRlZmluZWQgYXMgYSByZWd1bGFyIGZ1bmN0aW9uLFxuICogbm90IGFuIGFycm93IGZ1bmN0aW9uLlxuICovXG5pbXBvcnQgdHlwZSB7UmVhY3RpdmVFbGVtZW50fSBmcm9tICcuLi9yZWFjdGl2ZS1lbGVtZW50LmpzJztcbmltcG9ydCB7ZGVzYywgdHlwZSBJbnRlcmZhY2V9IGZyb20gJy4vYmFzZS5qcyc7XG5cbmNvbnN0IERFVl9NT0RFID0gdHJ1ZTtcblxubGV0IGlzc3VlV2FybmluZzogKGNvZGU6IHN0cmluZywgd2FybmluZzogc3RyaW5nKSA9PiB2b2lkO1xuXG5pZiAoREVWX01PREUpIHtcbiAgLy8gRW5zdXJlIHdhcm5pbmdzIGFyZSBpc3N1ZWQgb25seSAxeCwgZXZlbiBpZiBtdWx0aXBsZSB2ZXJzaW9ucyBvZiBMaXRcbiAgLy8gYXJlIGxvYWRlZC5cbiAgZ2xvYmFsVGhpcy5saXRJc3N1ZWRXYXJuaW5ncyA/Pz0gbmV3IFNldCgpO1xuXG4gIC8qKlxuICAgKiBJc3N1ZSBhIHdhcm5pbmcgaWYgd2UgaGF2ZW4ndCBhbHJlYWR5LCBiYXNlZCBlaXRoZXIgb24gYGNvZGVgIG9yIGB3YXJuaW5nYC5cbiAgICogV2FybmluZ3MgYXJlIGRpc2FibGVkIGF1dG9tYXRpY2FsbHkgb25seSBieSBgd2FybmluZ2A7IGRpc2FibGluZyB2aWEgYGNvZGVgXG4gICAqIGNhbiBiZSBkb25lIGJ5IHVzZXJzLlxuICAgKi9cbiAgaXNzdWVXYXJuaW5nID0gKGNvZGU6IHN0cmluZywgd2FybmluZzogc3RyaW5nKSA9PiB7XG4gICAgd2FybmluZyArPSBjb2RlXG4gICAgICA/IGAgU2VlIGh0dHBzOi8vbGl0LmRldi9tc2cvJHtjb2RlfSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gXG4gICAgICA6ICcnO1xuICAgIGlmIChcbiAgICAgICFnbG9iYWxUaGlzLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMod2FybmluZykgJiZcbiAgICAgICFnbG9iYWxUaGlzLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMoY29kZSlcbiAgICApIHtcbiAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbiAgICAgIGdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MhLmFkZCh3YXJuaW5nKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5RGVjb3JhdG9yID0ge1xuICAvLyBsZWdhY3lcbiAgKFxuICAgIHByb3RvOiBJbnRlcmZhY2U8UmVhY3RpdmVFbGVtZW50PixcbiAgICBuYW1lOiBQcm9wZXJ0eUtleSxcbiAgICBkZXNjcmlwdG9yPzogUHJvcGVydHlEZXNjcmlwdG9yXG4gICAgLy8gTm90ZSBUeXBlU2NyaXB0IHJlcXVpcmVzIHRoZSByZXR1cm4gdHlwZSB0byBiZSBgdm9pZHxhbnlgXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgKTogdm9pZCB8IGFueTtcblxuICAvLyBzdGFuZGFyZFxuICA8QyBleHRlbmRzIEludGVyZmFjZTxSZWFjdGl2ZUVsZW1lbnQ+LCBWIGV4dGVuZHMgRWxlbWVudCB8IG51bGw+KFxuICAgIHZhbHVlOiBDbGFzc0FjY2Vzc29yRGVjb3JhdG9yVGFyZ2V0PEMsIFY+LFxuICAgIGNvbnRleHQ6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gICk6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JSZXN1bHQ8QywgVj47XG59O1xuXG4vKipcbiAqIEEgcHJvcGVydHkgZGVjb3JhdG9yIHRoYXQgY29udmVydHMgYSBjbGFzcyBwcm9wZXJ0eSBpbnRvIGEgZ2V0dGVyIHRoYXRcbiAqIGV4ZWN1dGVzIGEgcXVlcnlTZWxlY3RvciBvbiB0aGUgZWxlbWVudCdzIHJlbmRlclJvb3QuXG4gKlxuICogQHBhcmFtIHNlbGVjdG9yIEEgRE9NU3RyaW5nIGNvbnRhaW5pbmcgb25lIG9yIG1vcmUgc2VsZWN0b3JzIHRvIG1hdGNoLlxuICogQHBhcmFtIGNhY2hlIEFuIG9wdGlvbmFsIGJvb2xlYW4gd2hpY2ggd2hlbiB0cnVlIHBlcmZvcm1zIHRoZSBET00gcXVlcnkgb25seVxuICogICAgIG9uY2UgYW5kIGNhY2hlcyB0aGUgcmVzdWx0LlxuICpcbiAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L3F1ZXJ5U2VsZWN0b3JcbiAqXG4gKiBgYGB0c1xuICogY2xhc3MgTXlFbGVtZW50IHtcbiAqICAgQHF1ZXJ5KCcjZmlyc3QnKVxuICogICBmaXJzdDogSFRNTERpdkVsZW1lbnQ7XG4gKlxuICogICByZW5kZXIoKSB7XG4gKiAgICAgcmV0dXJuIGh0bWxgXG4gKiAgICAgICA8ZGl2IGlkPVwiZmlyc3RcIj48L2Rpdj5cbiAqICAgICAgIDxkaXYgaWQ9XCJzZWNvbmRcIj48L2Rpdj5cbiAqICAgICBgO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5KHNlbGVjdG9yOiBzdHJpbmcsIGNhY2hlPzogYm9vbGVhbik6IFF1ZXJ5RGVjb3JhdG9yIHtcbiAgcmV0dXJuICg8QyBleHRlbmRzIEludGVyZmFjZTxSZWFjdGl2ZUVsZW1lbnQ+LCBWIGV4dGVuZHMgRWxlbWVudCB8IG51bGw+KFxuICAgIHByb3RvT3JUYXJnZXQ6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JUYXJnZXQ8QywgVj4sXG4gICAgbmFtZU9yQ29udGV4dDogUHJvcGVydHlLZXkgfCBDbGFzc0FjY2Vzc29yRGVjb3JhdG9yQ29udGV4dDxDLCBWPixcbiAgICBkZXNjcmlwdG9yPzogUHJvcGVydHlEZXNjcmlwdG9yXG4gICkgPT4ge1xuICAgIGNvbnN0IGRvUXVlcnkgPSAoZWw6IEludGVyZmFjZTxSZWFjdGl2ZUVsZW1lbnQ+KTogViA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSAoZWwucmVuZGVyUm9vdD8ucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgPz8gbnVsbCkgYXMgVjtcbiAgICAgIGlmIChERVZfTU9ERSAmJiByZXN1bHQgPT09IG51bGwgJiYgY2FjaGUgJiYgIWVsLmhhc1VwZGF0ZWQpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9XG4gICAgICAgICAgdHlwZW9mIG5hbWVPckNvbnRleHQgPT09ICdvYmplY3QnXG4gICAgICAgICAgICA/IG5hbWVPckNvbnRleHQubmFtZVxuICAgICAgICAgICAgOiBuYW1lT3JDb250ZXh0O1xuICAgICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICAgJycsXG4gICAgICAgICAgYEBxdWVyeSdkIGZpZWxkICR7SlNPTi5zdHJpbmdpZnkoU3RyaW5nKG5hbWUpKX0gd2l0aCB0aGUgJ2NhY2hlJyBgICtcbiAgICAgICAgICAgIGBmbGFnIHNldCBmb3Igc2VsZWN0b3IgJyR7c2VsZWN0b3J9JyBoYXMgYmVlbiBhY2Nlc3NlZCBiZWZvcmUgYCArXG4gICAgICAgICAgICBgdGhlIGZpcnN0IHVwZGF0ZSBhbmQgcmV0dXJuZWQgbnVsbC4gVGhpcyBpcyBleHBlY3RlZCBpZiB0aGUgYCArXG4gICAgICAgICAgICBgcmVuZGVyUm9vdCB0cmVlIGhhcyBub3QgYmVlbiBwcm92aWRlZCBiZWZvcmVoYW5kIChlLmcuIHZpYSBgICtcbiAgICAgICAgICAgIGBEZWNsYXJhdGl2ZSBTaGFkb3cgRE9NKS4gVGhlcmVmb3JlIHRoZSB2YWx1ZSBoYXNuJ3QgYmVlbiBjYWNoZWQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogaWYgd2Ugd2FudCB0byBhbGxvdyB1c2VycyB0byBhc3NlcnQgdGhhdCB0aGUgcXVlcnkgd2lsbCBuZXZlclxuICAgICAgLy8gcmV0dXJuIG51bGwsIHdlIG5lZWQgYSBuZXcgb3B0aW9uIGFuZCB0byB0aHJvdyBoZXJlIGlmIHRoZSByZXN1bHRcbiAgICAgIC8vIGlzIG51bGwuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgaWYgKGNhY2hlKSB7XG4gICAgICAvLyBBY2Nlc3NvcnMgdG8gd3JhcCBmcm9tIGVpdGhlcjpcbiAgICAgIC8vICAgMS4gVGhlIGRlY29yYXRvciB0YXJnZXQsIGluIHRoZSBjYXNlIG9mIHN0YW5kYXJkIGRlY29yYXRvcnNcbiAgICAgIC8vICAgMi4gVGhlIHByb3BlcnR5IGRlc2NyaXB0b3IsIGluIHRoZSBjYXNlIG9mIGV4cGVyaW1lbnRhbCBkZWNvcmF0b3JzXG4gICAgICAvLyAgICAgIG9uIGF1dG8tYWNjZXNzb3JzLlxuICAgICAgLy8gICAzLiBGdW5jdGlvbnMgdGhhdCBhY2Nlc3Mgb3VyIG93biBjYWNoZS1rZXkgcHJvcGVydHkgb24gdGhlIGluc3RhbmNlLFxuICAgICAgLy8gICAgICBpbiB0aGUgY2FzZSBvZiBleHBlcmltZW50YWwgZGVjb3JhdG9ycyBvbiBmaWVsZHMuXG4gICAgICBjb25zdCB7Z2V0LCBzZXR9ID1cbiAgICAgICAgdHlwZW9mIG5hbWVPckNvbnRleHQgPT09ICdvYmplY3QnXG4gICAgICAgICAgPyBwcm90b09yVGFyZ2V0XG4gICAgICAgICAgOiAoZGVzY3JpcHRvciA/P1xuICAgICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qga2V5ID0gREVWX01PREVcbiAgICAgICAgICAgICAgICA/IFN5bWJvbChgJHtTdHJpbmcobmFtZU9yQ29udGV4dCl9IChAcXVlcnkoKSBjYWNoZSlgKVxuICAgICAgICAgICAgICAgIDogU3ltYm9sKCk7XG4gICAgICAgICAgICAgIHR5cGUgV2l0aENhY2hlID0gUmVhY3RpdmVFbGVtZW50ICYge1xuICAgICAgICAgICAgICAgIFtrZXk6IHN5bWJvbF06IEVsZW1lbnQgfCBudWxsO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcyBhcyBXaXRoQ2FjaGUpW2tleV07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQodikge1xuICAgICAgICAgICAgICAgICAgKHRoaXMgYXMgV2l0aENhY2hlKVtrZXldID0gdjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkoKSk7XG4gICAgICByZXR1cm4gZGVzYyhwcm90b09yVGFyZ2V0LCBuYW1lT3JDb250ZXh0LCB7XG4gICAgICAgIGdldCh0aGlzOiBSZWFjdGl2ZUVsZW1lbnQpOiBWIHtcbiAgICAgICAgICBsZXQgcmVzdWx0OiBWID0gZ2V0IS5jYWxsKHRoaXMpO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZG9RdWVyeSh0aGlzKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IG51bGwgfHwgdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICAgICAgICAgIHNldCEuY2FsbCh0aGlzLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgb2JqZWN0IHdvcmtzIGFzIHRoZSByZXR1cm4gdHlwZSBmb3IgYm90aCBzdGFuZGFyZCBhbmRcbiAgICAgIC8vIGV4cGVyaW1lbnRhbCBkZWNvcmF0b3JzLlxuICAgICAgcmV0dXJuIGRlc2MocHJvdG9PclRhcmdldCwgbmFtZU9yQ29udGV4dCwge1xuICAgICAgICBnZXQodGhpczogUmVhY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGRvUXVlcnkodGhpcyk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH0pIGFzIFF1ZXJ5RGVjb3JhdG9yO1xufVxuIiwgImltcG9ydCB0eXBlIHsgVGhyZWFkLCBDb21tZW50LCBSZWFjdGlvbiB9IGZyb20gJy4uLy4uL3R5cGVzLnRzJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICB2YXIgZG9jbWQ6IHtcbiAgICBjYWxsKGFjdGlvbjogc3RyaW5nLCBwYXlsb2FkOiBhbnkpOiBQcm9taXNlPGFueT47XG4gICAgc2VuZChuYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IHZvaWQ7XG4gICAgb24obmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCk6ICgpID0+IHZvaWQ7XG4gICAgYWZ0ZXJSZWxvYWQobmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGN0eDogYW55KSA9PiB2b2lkKTogdm9pZDtcbiAgICBzY2hlZHVsZVJlbG9hZChuYW1lOiBzdHJpbmcsIGNvbnRleHQ/OiBhbnkpOiB2b2lkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2VGaWxlKCk6IHN0cmluZyB7XG4gIGNvbnN0IGZpbGUgPSBkb2N1bWVudC5ib2R5LmRhdGFzZXRbJ3NvdXJjZUZpbGUnXTtcbiAgaWYgKCFmaWxlKSB0aHJvdyBuZXcgRXJyb3IoJ1t0aHJlYWRzXSBkYXRhLXNvdXJjZS1maWxlIG5vdCBmb3VuZCBvbiBib2R5IGVsZW1lbnQnKTtcbiAgcmV0dXJuIGZpbGU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFRocmVhZHMoKTogUHJvbWlzZTxUaHJlYWRbXT4ge1xuICByZXR1cm4gZG9jbWQuY2FsbCgndGhyZWFkczpnZXQtdGhyZWFkcycsIHsgZmlsZTogZ2V0U291cmNlRmlsZSgpIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVGhyZWFkKHBheWxvYWQ6IHtcbiAgYW5jaG9yOiBhbnkgfCBudWxsO1xuICBhdXRob3I6IHN0cmluZztcbiAgYm9keTogc3RyaW5nO1xufSk6IFByb21pc2U8VGhyZWFkPiB7XG4gIHJldHVybiBkb2NtZC5jYWxsKCd0aHJlYWRzOmFkZC10aHJlYWQnLCB7XG4gICAgZmlsZTogZ2V0U291cmNlRmlsZSgpLFxuICAgIC4uLnBheWxvYWQsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkQ29tbWVudChcbiAgdGhyZWFkSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogeyBhdXRob3I6IHN0cmluZzsgYm9keTogc3RyaW5nIH0sXG4pOiBQcm9taXNlPENvbW1lbnQ+IHtcbiAgcmV0dXJuIGRvY21kLmNhbGwoJ3RocmVhZHM6YWRkLWNvbW1lbnQnLCB7XG4gICAgZmlsZTogZ2V0U291cmNlRmlsZSgpLFxuICAgIHRocmVhZElkLFxuICAgIC4uLnBheWxvYWQsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZWRpdENvbW1lbnQoXG4gIHRocmVhZElkOiBzdHJpbmcsXG4gIGNvbW1lbnRJZDogc3RyaW5nLFxuICBwYXlsb2FkOiB7IGJvZHk6IHN0cmluZyB9LFxuKTogUHJvbWlzZTxDb21tZW50PiB7XG4gIHJldHVybiBkb2NtZC5jYWxsKCd0aHJlYWRzOmVkaXQtY29tbWVudCcsIHtcbiAgICBmaWxlOiBnZXRTb3VyY2VGaWxlKCksXG4gICAgdGhyZWFkSWQsXG4gICAgY29tbWVudElkLFxuICAgIC4uLnBheWxvYWQsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQ29tbWVudChcbiAgdGhyZWFkSWQ6IHN0cmluZyxcbiAgY29tbWVudElkOiBzdHJpbmcsXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgZG9jbWQuY2FsbCgndGhyZWFkczpkZWxldGUtY29tbWVudCcsIHtcbiAgICBmaWxlOiBnZXRTb3VyY2VGaWxlKCksXG4gICAgdGhyZWFkSWQsXG4gICAgY29tbWVudElkLFxuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVRocmVhZCh0aHJlYWRJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGRvY21kLmNhbGwoJ3RocmVhZHM6ZGVsZXRlLXRocmVhZCcsIHtcbiAgICBmaWxlOiBnZXRTb3VyY2VGaWxlKCksXG4gICAgdGhyZWFkSWQsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZVRocmVhZChcbiAgdGhyZWFkSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogeyByZXNvbHZlZF9ieTogc3RyaW5nIH0sXG4pOiBQcm9taXNlPFRocmVhZD4ge1xuICByZXR1cm4gZG9jbWQuY2FsbCgndGhyZWFkczpyZXNvbHZlLXRocmVhZCcsIHtcbiAgICBmaWxlOiBnZXRTb3VyY2VGaWxlKCksXG4gICAgdGhyZWFkSWQsXG4gICAgLi4ucGF5bG9hZCxcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0b2dnbGVSZWFjdGlvbihcbiAgdGhyZWFkSWQ6IHN0cmluZyxcbiAgY29tbWVudElkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IHsgZW1vamk6IHN0cmluZzsgYXV0aG9yOiBzdHJpbmcgfSxcbik6IFByb21pc2U8UmVhY3Rpb25bXT4ge1xuICByZXR1cm4gZG9jbWQuY2FsbCgndGhyZWFkczp0b2dnbGUtcmVhY3Rpb24nLCB7XG4gICAgZmlsZTogZ2V0U291cmNlRmlsZSgpLFxuICAgIHRocmVhZElkLFxuICAgIGNvbW1lbnRJZCxcbiAgICAuLi5wYXlsb2FkLFxuICB9KTtcbn1cbiIsICJjb25zdCBTVE9SQUdFX0tFWSA9ICd0aHJlYWRzX2F1dGhvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdXRob3IoKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdXRob3IobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRJZGVudGl0eSgpOiB2b2lkIHtcbiAgLy8gTm8gc2VydmVyIGlkZW50aXR5IGVuZHBvaW50IFx1MjAxNCBhdXRob3Igc2V0IHZpYSBlbnN1cmVBdXRob3IoKSBwcm9tcHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUF1dGhvcigpOiBzdHJpbmcge1xuICBsZXQgYXV0aG9yID0gZ2V0QXV0aG9yKCk7XG4gIGlmICghYXV0aG9yKSB7XG4gICAgYXV0aG9yID0gcHJvbXB0KCdFbnRlciB5b3VyIGRpc3BsYXkgbmFtZSBmb3IgZGlzY3Vzc2lvbnM6Jyk7XG4gICAgaWYgKCFhdXRob3IgfHwgIWF1dGhvci50cmltKCkpIHtcbiAgICAgIGF1dGhvciA9ICdBbm9ueW1vdXMnO1xuICAgIH1cbiAgICBzZXRBdXRob3IoYXV0aG9yLnRyaW0oKSk7XG4gIH1cbiAgcmV0dXJuIGF1dGhvcjtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEFuY2hvciB9IGZyb20gJy4uLy4uL3R5cGVzLnRzJztcblxuY29uc3QgQ09OVEVYVF9DSEFSUyA9IDQwO1xuY29uc3QgQkxPQ0tfRUxFTUVOVFMgPSBuZXcgU2V0KFtcbiAgXCJQXCIsIFwiRElWXCIsIFwiTElcIiwgXCJURFwiLCBcIlRIXCIsIFwiQkxPQ0tRVU9URVwiLCBcIlBSRVwiLCBcIkgxXCIsIFwiSDJcIiwgXCJIM1wiLFxuICBcIkg0XCIsIFwiSDVcIiwgXCJINlwiLCBcIlNFQ1RJT05cIiwgXCJBUlRJQ0xFXCIsIFwiQVNJREVcIiwgXCJEVFwiLCBcIkREXCIsIFwiRklHQ0FQVElPTlwiLFxuXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZW50QXJlYSgpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAvLyBkb2NtZCBjb250ZW50IGFyZWEgc2VsZWN0b3JzICh0cnkgbXVsdGlwbGUpXG4gIHJldHVybiAoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCJbZGF0YS1kb2NtZC1jb250ZW50XVwiKSB8fFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLmRvY21kLWNvbnRlbnRcIikgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcImFydGljbGVcIikgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIm1haW5cIilcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzV2l0aGluQ29udGVudChub2RlOiBOb2RlKTogYm9vbGVhbiB7XG4gIGNvbnN0IGNvbnRlbnQgPSBnZXRDb250ZW50QXJlYSgpO1xuICByZXR1cm4gY29udGVudCA/IGNvbnRlbnQuY29udGFpbnMobm9kZSkgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0QmxvY2tBbmNlc3Rvcihub2RlOiBOb2RlKTogSFRNTEVsZW1lbnQge1xuICBsZXQgY3VycmVudDogTm9kZSB8IG51bGwgPSBub2RlO1xuICB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgaWYgKFxuICAgICAgY3VycmVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXG4gICAgICBCTE9DS19FTEVNRU5UUy5oYXMoY3VycmVudC50YWdOYW1lKVxuICAgICkge1xuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU2VsZWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgY29udGVudCA9IGdldENvbnRlbnRBcmVhKCk7XG5cbiAgZm9yIChsZXQgY3VyID0gZWxlbWVudCBhcyBIVE1MRWxlbWVudCB8IG51bGw7IGN1ciAmJiBjdXIgIT09IGRvY3VtZW50LmJvZHkgJiYgY3VyICE9PSBjb250ZW50OyBjdXIgPSBjdXIucGFyZW50RWxlbWVudCkge1xuICAgIGNvbnN0IHRhZyA9IGN1ci50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgcGFyZW50ID0gY3VyLnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgY29uc3QgdGFnTmFtZSA9IGN1ci50YWdOYW1lO1xuICAgICAgY29uc3Qgc2libGluZ3MgPSBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuZmlsdGVyKFxuICAgICAgICAoc2libGluZykgPT4gc2libGluZy50YWdOYW1lID09PSB0YWdOYW1lLFxuICAgICAgKTtcbiAgICAgIGlmIChzaWJsaW5ncy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gc2libGluZ3MuaW5kZXhPZihjdXIpICsgMTtcbiAgICAgICAgcGFydHMudW5zaGlmdChgJHt0YWd9Om50aC1vZi10eXBlKCR7aW5kZXh9KWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydHMudW5zaGlmdCh0YWcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KHRhZyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oXCIgPiBcIik7XG59XG5cbmZ1bmN0aW9uIGdldFRleHRPZmZzZXQoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcmFuZ2U6IFJhbmdlKTogbnVtYmVyIHtcbiAgY29uc3QgdHJlZVdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG4gICAgY29udGFpbmVyLFxuICAgIE5vZGVGaWx0ZXIuU0hPV19URVhULFxuICApO1xuICBsZXQgb2Zmc2V0ID0gMDtcblxuICB3aGlsZSAodHJlZVdhbGtlci5uZXh0Tm9kZSgpKSB7XG4gICAgaWYgKHRyZWVXYWxrZXIuY3VycmVudE5vZGUgPT09IHJhbmdlLnN0YXJ0Q29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0ICsgcmFuZ2Uuc3RhcnRPZmZzZXQ7XG4gICAgfVxuICAgIG9mZnNldCArPSAodHJlZVdhbGtlci5jdXJyZW50Tm9kZSBhcyBUZXh0KS5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0O1xufVxuXG5mdW5jdGlvbiBleHRyYWN0Q29udGV4dChcbiAgdGV4dDogc3RyaW5nLFxuICBzdGFydDogbnVtYmVyLFxuICBlbmQ6IG51bWJlcixcbik6IHsgcHJlZml4OiBzdHJpbmc7IHN1ZmZpeDogc3RyaW5nIH0ge1xuICBjb25zdCBwcmVmaXggPSB0ZXh0LnNsaWNlKE1hdGgubWF4KDAsIHN0YXJ0IC0gQ09OVEVYVF9DSEFSUyksIHN0YXJ0KTtcbiAgY29uc3Qgc3VmZml4ID0gdGV4dC5zbGljZShlbmQsIGVuZCArIENPTlRFWFRfQ0hBUlMpO1xuICByZXR1cm4geyBwcmVmaXgsIHN1ZmZpeCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUFuY2hvcihzZWxlY3Rpb246IFNlbGVjdGlvbik6IEFuY2hvciB8IG51bGwge1xuICBpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgPT09IDApIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gIGNvbnN0IHF1b3RlID0gc2VsZWN0aW9uLnRvU3RyaW5nKCkudHJpbSgpO1xuXG4gIGlmICghcXVvdGUgfHwgcXVvdGUubGVuZ3RoIDwgMykgcmV0dXJuIG51bGw7XG4gIGlmICghaXNXaXRoaW5Db250ZW50KHJhbmdlLnN0YXJ0Q29udGFpbmVyKSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgYmxvY2tFbCA9IGdldEJsb2NrQW5jZXN0b3IocmFuZ2Uuc3RhcnRDb250YWluZXIpO1xuICBjb25zdCBzZWxlY3RvciA9IGdlbmVyYXRlU2VsZWN0b3IoYmxvY2tFbCk7XG4gIGNvbnN0IGZ1bGxUZXh0ID0gYmxvY2tFbC50ZXh0Q29udGVudCB8fCBcIlwiO1xuICBjb25zdCBvZmZzZXQgPSBnZXRUZXh0T2Zmc2V0KGJsb2NrRWwsIHJhbmdlKTtcbiAgY29uc3QgeyBwcmVmaXgsIHN1ZmZpeCB9ID0gZXh0cmFjdENvbnRleHQoZnVsbFRleHQsIG9mZnNldCwgb2Zmc2V0ICsgcXVvdGUubGVuZ3RoKTtcblxuICByZXR1cm4ge1xuICAgIHF1b3RlLFxuICAgIHByZWZpeDogcHJlZml4IHx8IG51bGwsXG4gICAgc3VmZml4OiBzdWZmaXggfHwgbnVsbCxcbiAgICBzZWxlY3RvcixcbiAgICBvZmZzZXQsXG4gICAgYmxvY2tUZXh0OiBmdWxsVGV4dC50cmltKCkgfHwgbnVsbCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbGVjdGlvblBvc2l0aW9uKHNlbGVjdGlvbjogU2VsZWN0aW9uKTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgbnVsbCB7XG4gIGlmIChzZWxlY3Rpb24ucmFuZ2VDb3VudCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gIGNvbnN0IHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyByZWN0LndpZHRoIC8gMixcbiAgICB5OiByZWN0LnRvcCxcbiAgfTtcbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gaW5qZWN0Q29tcG9uZW50U3R5bGVzKCk6IHZvaWQge1xuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RjLXN0eWxlcycpKSByZXR1cm47XG5cbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZS5pZCA9ICd0Yy1zdHlsZXMnO1xuICBzdHlsZS50ZXh0Q29udGVudCA9IGBcbiAgICAvKiA9PT09PT09PT0gRGVzaWduIHRva2VucyA9PT09PT09PT0gKi9cbiAgICA6cm9vdCB7XG4gICAgICAtLXRjLWJnOiB2YXIoLS1iZy1jb2xvciwgaHNsKDAgMCUgMTAwJSkpO1xuICAgICAgLS10Yy1mZzogdmFyKC0tdGV4dC1jb2xvciwgaHNsKDAgMCUgOSUpKTtcbiAgICAgIC0tdGMtbXV0ZWQ6IHZhcigtLXNpZGViYXItYmcsIGhzbCgwIDAlIDk2LjElKSk7XG4gICAgICAtLXRjLW11dGVkLWZnOiB2YXIoLS10ZXh0LW11dGVkLCBoc2woMCAwJSA0NS4xJSkpO1xuICAgICAgLS10Yy1ib3JkZXI6IHZhcigtLWJvcmRlci1jb2xvciwgaHNsKDAgMCUgODkuOCUpKTtcbiAgICAgIC0tdGMtaW5wdXQ6IHZhcigtLWJvcmRlci1jb2xvciwgaHNsKDAgMCUgODkuOCUpKTtcbiAgICAgIC0tdGMtcmluZzogdmFyKC0tdGV4dC1jb2xvciwgaHNsKDAgMCUgOSUpKTtcbiAgICAgIC0tdGMtYWNjZW50OiB2YXIoLS1zaWRlYmFyLWJnLCBoc2woMCAwJSA5Ni4xJSkpO1xuICAgICAgLS10Yy1hY2NlbnQtZmc6IHZhcigtLXRleHQtY29sb3IsIGhzbCgwIDAlIDklKSk7XG4gICAgICAtLXRjLWNhcmQ6IHZhcigtLWJnLWNvbG9yLCBoc2woMCAwJSAxMDAlKSk7XG4gICAgICAtLXRjLWNhcmQtZmc6IHZhcigtLXRleHQtY29sb3IsIGhzbCgwIDAlIDklKSk7XG4gICAgICAtLXRjLXJhZGl1czogNnB4O1xuICAgICAgLS10Yy1mb250OiB2YXIoLS1mb250LWZhbWlseS1zYW5zLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBzYW5zLXNlcmlmKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gTGF5b3V0OiBmaXhlZCByaWdodCBzaWRlYmFyIGNvbHVtbiA9PT09PT09PT0gKi9cbiAgICAudGMtc2lkZWJhci1jb2x1bW4ge1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgdG9wOiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICBib3R0b206IDA7XG4gICAgICB3aWR0aDogNDBweDtcbiAgICAgIHotaW5kZXg6IDEwMDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgdHJhbnNpdGlvbjogd2lkdGggMC4ycyBlYXNlO1xuICAgICAgZm9udC1mYW1pbHk6IHZhcigtLXRjLWZvbnQpO1xuICAgIH1cblxuICAgIGJvZHkudGMtcGFuZWwtb3BlbiAudGMtc2lkZWJhci1jb2x1bW4ge1xuICAgICAgd2lkdGg6IDM4MHB4O1xuICAgIH1cblxuICAgIGJvZHkudGMtaGFzLXNpZGViYXIgbWFpbiB7XG4gICAgICBtYXgtd2lkdGg6IDE0NDBweDtcbiAgICB9XG5cbiAgICBib2R5LnRjLWhhcy1zaWRlYmFyIC5tYWluLWNvbnRlbnQtd3JhcHBlciB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDQwcHg7XG4gICAgICB0cmFuc2l0aW9uOiBtYXJnaW4tcmlnaHQgMC4ycyBlYXNlO1xuICAgIH1cbiAgICBib2R5LnRjLXBhbmVsLW9wZW4gLm1haW4tY29udGVudC13cmFwcGVyIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMzgwcHg7XG4gICAgfVxuXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDE0MDBweCkge1xuICAgICAgYm9keS50Yy1wYW5lbC1vcGVuIC50b2Mtc2lkZWJhciB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IFRvZ2dsZSBzdHJpcCA9PT09PT09PT0gKi9cbiAgICAudGMtc2lkZWJhci10b2dnbGUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB3aWR0aDogNDBweDtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLWJnKTtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZyk7XG4gICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cywgYmFja2dyb3VuZCAwLjE1cztcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHBhZGRpbmc6IDE2cHggMCAwIDA7XG4gICAgfVxuICAgIC50Yy1zaWRlYmFyLXRvZ2dsZTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1hY2NlbnQpO1xuICAgICAgY29sb3I6IHZhcigtLXRjLWZnKTtcbiAgICB9XG5cbiAgICBib2R5LnRjLXBhbmVsLW9wZW4gLnRjLXNpZGViYXItdG9nZ2xlIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IFBhbmVsID09PT09PT09PSAqL1xuICAgIC50Yy1wYW5lbCB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgd2lkdGg6IDM4MHB4O1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYmcpO1xuICAgICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbmltYXRpb246IHRjLXNsaWRlLWluIDAuMnMgZWFzZTtcbiAgICB9XG4gICAgQGtleWZyYW1lcyB0Yy1zbGlkZS1pbiB7XG4gICAgICBmcm9tIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpOyBvcGFjaXR5OiAwOyB9XG4gICAgICB0byB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgb3BhY2l0eTogMTsgfVxuICAgIH1cbiAgICAudGMtcGFuZWxfX2hlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIHBhZGRpbmc6IDE2cHggMTZweCAxMnB4O1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgfVxuICAgIC50Yy1wYW5lbF9fdGl0bGUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IC0wLjAxZW07XG4gICAgfVxuICAgIC50Yy1wYW5lbF9faGVhZGVyLWFjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDJweDtcbiAgICB9XG4gICAgLnRjLXBhbmVsX19maWx0ZXJzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDRweDtcbiAgICAgIHBhZGRpbmc6IDEwcHggMTZweDtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgIH1cbiAgICAudGMtcGFuZWxfX2JvZHkge1xuICAgICAgZmxleDogMTtcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICBwYWRkaW5nOiA4cHggMDtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gRW1wdHkgc3RhdGUgPT09PT09PT09ICovXG4gICAgLnRjLWVtcHR5IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgY29sb3I6IHZhcigtLXRjLW11dGVkLWZnKTtcbiAgICAgIHBhZGRpbmc6IDQ4cHggMjRweDtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IFRocmVhZCAoc2hhZGNuIGNhcmQpID09PT09PT09PSAqL1xuICAgIC50Yy10aHJlYWQge1xuICAgICAgbWFyZ2luOiAwIDhweCA2cHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGMtcmFkaXVzKTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1jYXJkKTtcbiAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMC4xNXM7XG4gICAgfVxuICAgIC50Yy10aHJlYWQ6aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogMCAxcHggM3B4IDAgcmdiKDAgMCAwIC8gMC4xKSwgMCAxcHggMnB4IC0xcHggcmdiKDAgMCAwIC8gMC4xKTtcbiAgICB9XG4gICAgLnRjLXRocmVhZC0tZm9jdXNlZCB7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLXRjLXJpbmcpO1xuICAgICAgYm94LXNoYWRvdzogMCAwIDAgMXB4IHZhcigtLXRjLXJpbmcpO1xuICAgIH1cbiAgICAudGMtdGhyZWFkLS1yZXNvbHZlZCB7IG9wYWNpdHk6IDAuNjsgfVxuICAgIC50Yy10aHJlYWRfX3F1b3RlIHtcbiAgICAgIHBhZGRpbmc6IDEwcHggMTRweDtcbiAgICAgIGJvcmRlci1sZWZ0OiAycHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIG1hcmdpbjogMTBweCAxNHB4IDA7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtbXV0ZWQpO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cztcbiAgICB9XG4gICAgLnRjLXRocmVhZF9fcXVvdGU6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogY29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLXRjLW11dGVkKSA4MCUsIHZhcigtLXRjLWZnKSAyMCUpO1xuICAgIH1cbiAgICAudGMtdGhyZWFkX19xdW90ZS10ZXh0IHtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZyk7XG4gICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIH1cbiAgICAudGMtdGhyZWFkX19jb21tZW50cyB7XG4gICAgICBwYWRkaW5nOiAycHggMDtcbiAgICB9XG4gICAgLnRjLXRocmVhZF9fcmVwbHkge1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgfVxuICAgIC50Yy10aHJlYWRfX2Zvb3RlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiAycHg7XG4gICAgICBwYWRkaW5nOiA2cHggMTBweCA4cHg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gQ29tbWVudCA9PT09PT09PT0gKi9cbiAgICAudGMtY29tbWVudCB7XG4gICAgICBwYWRkaW5nOiAxMHB4IDE0cHg7XG4gICAgfVxuICAgIC50Yy1jb21tZW50ICsgLnRjLWNvbW1lbnQge1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgfVxuICAgIC50Yy1jb21tZW50X19oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICB9XG4gICAgLnRjLWNvbW1lbnRfX21ldGEge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBmbGV4OiAxO1xuICAgICAgbWluLXdpZHRoOiAwO1xuICAgIH1cbiAgICAudGMtY29tbWVudF9fYXV0aG9yIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgICB9XG4gICAgLnRjLWNvbW1lbnRfX3RpbWUge1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgY29sb3I6IHZhcigtLXRjLW11dGVkLWZnKTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgfVxuICAgIC50Yy1jb21tZW50X19tZW51IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDFweDtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzO1xuICAgIH1cbiAgICAudGMtY29tbWVudDpob3ZlciAudGMtY29tbWVudF9fbWVudSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICAudGMtY29tbWVudF9fYm9keSB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBsaW5lLWhlaWdodDogMS42O1xuICAgICAgY29sb3I6IHZhcigtLXRjLWZnKTtcbiAgICAgIG1hcmdpbi1sZWZ0OiAzNHB4O1xuICAgIH1cbiAgICAudGMtY29tbWVudF9fYm9keSBwIHsgbWFyZ2luOiAwIDAgNHB4IDA7IH1cbiAgICAudGMtY29tbWVudF9fYm9keSBwOmxhc3QtY2hpbGQgeyBtYXJnaW4tYm90dG9tOiAwOyB9XG4gICAgLnRjLWNvbW1lbnRfX2JvZHkgY29kZSB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1tdXRlZCk7XG4gICAgICBwYWRkaW5nOiAycHggNHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cbiAgICAudGMtY29tbWVudF9fYm9keSBwcmUge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtbXV0ZWQpO1xuICAgICAgcGFkZGluZzogOHB4IDEycHg7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS10Yy1yYWRpdXMpO1xuICAgICAgb3ZlcmZsb3cteDogYXV0bztcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB9XG4gICAgLnRjLWNvbW1lbnRfX2Zvb3RlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNnB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IDM0cHg7XG4gICAgICBtYXJnaW4tdG9wOiA0cHg7XG4gICAgfVxuICAgIC50Yy1jb21tZW50X19hY3Rpb25zIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDFweDtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gUmVhY3Rpb25zID09PT09PT09PSAqL1xuICAgIC50Yy1yZWFjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGdhcDogNHB4O1xuICAgIH1cbiAgICAudGMtcmVhY3Rpb24ge1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBwYWRkaW5nOiAycHggOHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYmcpO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjE1cztcbiAgICB9XG4gICAgLnRjLXJlYWN0aW9uOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLWFjY2VudCk7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLXRjLWlucHV0KTtcbiAgICB9XG4gICAgLnRjLXJlYWN0aW9uLS1hY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYWNjZW50KTtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgIH1cbiAgICAudGMtcmVhY3Rpb25fX2NvdW50IHtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBFbW9qaSBwaWNrZXIgaXRlbSAodXNlZCBpbnNpZGUgd2EtcG9wb3ZlcikgPT09PT09PT09ICovXG4gICAgLnRjLWVtb2ppLXBpY2tlcl9faXRlbSB7XG4gICAgICB3aWR0aDogMzBweDtcbiAgICAgIGhlaWdodDogMzBweDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMXM7XG4gICAgfVxuICAgIC50Yy1lbW9qaS1waWNrZXJfX2l0ZW06aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYWNjZW50KTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gQ29tcG9zZSA9PT09PT09PT0gKi9cbiAgICAudGMtY29tcG9zZSB7XG4gICAgICBwYWRkaW5nOiAxMHB4IDE0cHg7XG4gICAgfVxuICAgIC50Yy1jb21wb3NlX19xdW90ZSB7XG4gICAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICAgIGJvcmRlci1sZWZ0OiAycHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLW11dGVkKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICB9XG4gICAgLnRjLWNvbXBvc2VfX2FjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgbWFyZ2luLXRvcDogOHB4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gTmV3IHRocmVhZCBjb21wb3NlID09PT09PT09PSAqL1xuICAgIC50Yy1uZXctdGhyZWFkIHtcbiAgICAgIG1hcmdpbjogMCA4cHggNnB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtY2FyZCk7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IFNlcnZlci1yZW5kZXJlZCB0aHJlYWRzIHdyYXBwZXIgPT09PT09PT09ICovXG4gICAgLnRocmVhZHMtc2lkZWJhciB7XG4gICAgICBtYXJnaW46IDI0cHggMCA4cHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogMTJweDtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gU2VydmVyLXJlbmRlcmVkIHRocmVhZCBjYXJkID09PT09PT09PSAqL1xuICAgIC50aHJlYWRzLXRocmVhZCB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCB2YXIoLS10Yy1yaW5nKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1jYXJkKTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBmb250LWZhbWlseTogdmFyKC0tdGMtZm9udCk7XG4gICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDAuMTVzO1xuICAgIH1cbiAgICAudGhyZWFkcy10aHJlYWQ6aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogMCAxcHggM3B4IDAgcmdiKDAgMCAwIC8gMC4wOCksIDAgMXB4IDJweCAtMXB4IHJnYigwIDAgMCAvIDAuMDgpO1xuICAgIH1cbiAgICAudGhyZWFkcy10aHJlYWQtLXJlc29sdmVkIHtcbiAgICAgIG9wYWNpdHk6IDAuNTU7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IFNlcnZlci1yZW5kZXJlZCBjb21tZW50ID09PT09PT09PSAqL1xuICAgIC50aHJlYWRzLWNvbW1lbnQge1xuICAgICAgcGFkZGluZzogMTBweCAxNHB4O1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgIH1cbiAgICAudGhyZWFkcy1jb21tZW50ICsgLnRocmVhZHMtY29tbWVudCB7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICB9XG4gICAgLnRocmVhZHMtY29tbWVudF9fbWV0YSB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgIH1cbiAgICAudGhyZWFkcy1jb21tZW50X19tZXRhIHN0cm9uZyB7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG4gICAgLnRocmVhZHMtY29tbWVudF9fYm9keSB7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgICB9XG4gICAgLnRocmVhZHMtY29tbWVudF9fYm9keSA+IDpmaXJzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgIH1cbiAgICAudGhyZWFkcy1jb21tZW50X19ib2R5ID4gOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gU2VydmVyLXJlbmRlcmVkIHJlYWN0aW9ucyA9PT09PT09PT0gKi9cbiAgICAudGhyZWFkcy1yZWFjdGlvbnMge1xuICAgICAgbWFyZ2luLXRvcDogOHB4O1xuICAgIH1cbiAgICAudGhyZWFkcy1yZWFjdGlvbnMgdWwge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGdhcDogNnB4O1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgfVxuICAgIC50aHJlYWRzLXJlYWN0aW9ucyBsaSB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDRweDtcbiAgICAgIHBhZGRpbmc6IDRweCAxMHB4IDRweCA4cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1tdXRlZCk7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xNXMsIGJvcmRlci1jb2xvciAwLjE1cztcbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIH1cbiAgICAudGhyZWFkcy1yZWFjdGlvbnMgbGk6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYWNjZW50KTtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGMtaW5wdXQpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBIZWFkaW5nIGRpc2N1c3Npb24gYnV0dG9uIChoaWRkZW4pID09PT09PT09PSAqL1xuICAgIC50aHJlYWRzLWhlYWRpbmctZGlzY3VzcyB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuICAgIC50aHJlYWRzLWhlYWRpbmctZGlzY3Vzcy1PRkYge1xuICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBwYWRkaW5nOiAycHggOHB4O1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBjb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGMtcmFkaXVzKTtcbiAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzO1xuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB9XG4gICAgKjpob3ZlciA+IC50aHJlYWRzLWhlYWRpbmctZGlzY3VzcyB7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgIH1cbiAgICAudGhyZWFkcy1oZWFkaW5nLWRpc2N1c3M6aG92ZXIge1xuICAgICAgY29sb3I6IHZhcigtLXRjLWFjY2VudC1mZyk7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1hY2NlbnQpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBOZXcgVGhyZWFkIGJ1dHRvbiA9PT09PT09PT0gKi9cbiAgICAudGhyZWFkcy1uZXctdGhyZWFkLWJ0biB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDZweDtcbiAgICAgIHBhZGRpbmc6IDZweCAxNHB4O1xuICAgICAgbWFyZ2luOiA4cHggMCAxNnB4O1xuICAgICAgZm9udC1mYW1pbHk6IHZhcigtLXRjLWZvbnQpO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZyk7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1jYXJkKTtcbiAgICAgIGJvcmRlcjogMXB4IGRhc2hlZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGMtcmFkaXVzKTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzLCBib3JkZXItY29sb3IgMC4xNXMsIGJhY2tncm91bmQgMC4xNXM7XG4gICAgfVxuICAgIC50aHJlYWRzLW5ldy10aHJlYWQtYnRuOmhvdmVyIHtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1mZyk7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLXRjLWZnKTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLW11dGVkKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gVGhyZWFkIGZsYXNoIGFuaW1hdGlvbiAob24gaGlnaGxpZ2h0IGNsaWNrKSA9PT09PT09PT0gKi9cbiAgICAudGhyZWFkcy10aHJlYWQtLWZsYXNoIHtcbiAgICAgIGFuaW1hdGlvbjogdGMtZmxhc2ggMnMgZWFzZS1vdXQ7XG4gICAgfVxuICAgIEBrZXlmcmFtZXMgdGMtZmxhc2gge1xuICAgICAgMCUgICB7IG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Yy1yaW5nKTsgb3V0bGluZS1vZmZzZXQ6IDRweDsgfVxuICAgICAgMTAwJSB7IG91dGxpbmU6IDJweCBzb2xpZCB0cmFuc3BhcmVudDsgb3V0bGluZS1vZmZzZXQ6IDhweDsgfVxuICAgIH1cblxuICAgIC8qID09PT09PT09PSBIaWRlIHNpZGViYXIgKGRpc2FibGVkIGZvciBub3cpID09PT09PT09PSAqL1xuICAgIC50Yy1zaWRlYmFyLWNvbHVtbiB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuICAgIC50Yy1oYXMtc2lkZWJhciB7IHBhZGRpbmctcmlnaHQ6IDAgIWltcG9ydGFudDsgfVxuICBgO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbiIsICJpbXBvcnQgeyBpbmplY3RDb21wb25lbnRTdHlsZXMgfSBmcm9tICcuLi9jb21wb25lbnRzL3N0eWxlcy50cyc7XG5cbmNvbnN0IFRIRU1FX1NUWUxFX0lEID0gJ3RocmVhZHMtdGhlbWUtYnJpZGdlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUaGVtZUJyaWRnZSgpOiB2b2lkIHtcbiAgaW5qZWN0VGhlbWVDU1MoKTtcbiAgc3luY0RhcmtNb2RlKCk7XG4gIG9ic2VydmVUaGVtZUNoYW5nZXMoKTtcbiAgaW5qZWN0Q29tcG9uZW50U3R5bGVzKCk7XG59XG5cbmZ1bmN0aW9uIGluamVjdFRoZW1lQ1NTKCk6IHZvaWQge1xuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoVEhFTUVfU1RZTEVfSUQpKSByZXR1cm47XG5cbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZS5pZCA9IFRIRU1FX1NUWUxFX0lEO1xuICBzdHlsZS50ZXh0Q29udGVudCA9IGBcbiAgICA6cm9vdCB7XG4gICAgICAtLXdhLWNvbG9yLXN1cmZhY2UtZGVmYXVsdDogdmFyKC0tdGMtYmcsIGhzbCgwIDAlIDEwMCUpKTtcbiAgICAgIC0td2EtY29sb3Itc3VyZmFjZS1yYWlzZWQ6IHZhcigtLXRjLW11dGVkLCBoc2woMCAwJSA5Ni4xJSkpO1xuICAgICAgLS13YS1jb2xvci1zdXJmYWNlLWJvcmRlcjogdmFyKC0tdGMtYm9yZGVyLCBoc2woMCAwJSA4OS44JSkpO1xuICAgICAgLS13YS1jb2xvci10ZXh0LW5vcm1hbDogdmFyKC0tdGMtZmcsIGhzbCgwIDAlIDklKSk7XG4gICAgICAtLXdhLWNvbG9yLXRleHQtcXVpZXQ6IHZhcigtLXRjLW11dGVkLWZnLCBoc2woMCAwJSA0NS4xJSkpO1xuICAgICAgLS13YS1jb2xvci10ZXh0LWxpbms6IHZhcigtLXRjLWZnLCBoc2woMCAwJSA5JSkpO1xuICAgICAgLS13YS1jb2xvci1icmFuZC1maWxsLWxvdWQ6IHZhcigtLXRjLWZnLCBoc2woMCAwJSA5JSkpO1xuICAgICAgLS13YS1jb2xvci1icmFuZC1vbi1sb3VkOiBoc2woMCAwJSA5OCUpO1xuICAgICAgLS13YS1jb2xvci1mb2N1czogdmFyKC0tdGMtcmluZywgaHNsKDAgMCUgOSUpKTtcbiAgICAgIC0td2EtZm9udC1zYW5zOiB2YXIoLS10Yy1mb250LCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBzYW5zLXNlcmlmKTtcbiAgICAgIC0td2EtZm9udC1tb25vOiB2YXIoLS1mb250LWZhbWlseS1tb25vLCBTRk1vbm8tUmVndWxhciwgQ29uc29sYXMsIE1lbmxvLCBtb25vc3BhY2UpO1xuICAgIH1cblxuICAgIC50aHJlYWRzLWhpZ2hsaWdodCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woNDggOTYlIDg5JSAvIDAuNSk7XG4gICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgaHNsKDQ4IDk2JSA1MyUgLyAwLjYpO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjE1cztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgICB9XG4gICAgLnRocmVhZHMtaGlnaGxpZ2h0OmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCg0OCA5NiUgODklIC8gMC44KTtcbiAgICB9XG4gICAgLnRocmVhZHMtaGlnaGxpZ2h0LS1yZXNvbHZlZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMTQyIDc2JSAzNiUgLyAwLjEpO1xuICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogaHNsKDE0MiA3NiUgMzYlIC8gMC4zKTtcbiAgICB9XG4gICAgLnRocmVhZHMtaGlnaGxpZ2h0LS1yZXNvbHZlZDpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMTQyIDc2JSAzNiUgLyAwLjIpO1xuICAgIH1cbiAgICAudGhyZWFkcy1oaWdobGlnaHQtLWZsYXNoIHtcbiAgICAgIGFuaW1hdGlvbjogdGhyZWFkcy1mbGFzaCAwLjhzIGVhc2Utb3V0O1xuICAgIH1cbiAgICBAa2V5ZnJhbWVzIHRocmVhZHMtZmxhc2gge1xuICAgICAgMCUsIDQwJSB7IGJhY2tncm91bmQtY29sb3I6IGhzbCg0OCA5NiUgNTMlIC8gMC41KTsgfVxuICAgICAgMTAwJSB7IGJhY2tncm91bmQtY29sb3I6IGhzbCg0OCA5NiUgODklIC8gMC41KTsgfVxuICAgIH1cbiAgYDtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmZ1bmN0aW9uIHN5bmNEYXJrTW9kZSgpOiB2b2lkIHtcbiAgY29uc3QgaXNEYXJrID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScpID09PSAnZGFyayc7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCd3YS1kYXJrJywgaXNEYXJrKTtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3dhLWxpZ2h0JywgIWlzRGFyayk7XG59XG5cbmZ1bmN0aW9uIG9ic2VydmVUaGVtZUNoYW5nZXMoKTogdm9pZCB7XG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gc3luY0RhcmtNb2RlKCkpO1xuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge1xuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbJ2RhdGEtdGhlbWUnXSxcbiAgfSk7XG59XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvaW50ZXJuYWwvdmFsaWRhdG9ycy9taXJyb3ItdmFsaWRhdG9yLnRzXG52YXIgTWlycm9yVmFsaWRhdG9yID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNoZWNrVmFsaWRpdHkoZWxlbWVudCkge1xuICAgICAgY29uc3QgZm9ybUNvbnRyb2wgPSBlbGVtZW50LmlucHV0O1xuICAgICAgY29uc3QgdmFsaWRpdHkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgIGludmFsaWRLZXlzOiBbXVxuICAgICAgfTtcbiAgICAgIGlmICghZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkaXR5O1xuICAgICAgfVxuICAgICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuICAgICAgaWYgKFwiY2hlY2tWYWxpZGl0eVwiIGluIGZvcm1Db250cm9sKSB7XG4gICAgICAgIGlzVmFsaWQgPSBmb3JtQ29udHJvbC5jaGVja1ZhbGlkaXR5KCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICByZXR1cm4gdmFsaWRpdHk7XG4gICAgICB9XG4gICAgICB2YWxpZGl0eS5pc1ZhbGlkID0gZmFsc2U7XG4gICAgICBpZiAoXCJ2YWxpZGF0aW9uTWVzc2FnZVwiIGluIGZvcm1Db250cm9sKSB7XG4gICAgICAgIHZhbGlkaXR5Lm1lc3NhZ2UgPSBmb3JtQ29udHJvbC52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIGlmICghKFwidmFsaWRpdHlcIiBpbiBmb3JtQ29udHJvbCkpIHtcbiAgICAgICAgdmFsaWRpdHkuaW52YWxpZEtleXMucHVzaChcImN1c3RvbUVycm9yXCIpO1xuICAgICAgICByZXR1cm4gdmFsaWRpdHk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtQ29udHJvbC52YWxpZGl0eSkge1xuICAgICAgICBpZiAoa2V5ID09PSBcInZhbGlkXCIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaGVja2VkS2V5ID0ga2V5O1xuICAgICAgICBpZiAoZm9ybUNvbnRyb2wudmFsaWRpdHlbY2hlY2tlZEtleV0pIHtcbiAgICAgICAgICB2YWxpZGl0eS5pbnZhbGlkS2V5cy5wdXNoKGNoZWNrZWRLZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsaWRpdHk7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IHtcbiAgTWlycm9yVmFsaWRhdG9yXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2V2ZW50cy9pbnZhbGlkLnRzXG52YXIgV2FJbnZhbGlkRXZlbnQgPSBjbGFzcyBleHRlbmRzIEV2ZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJ3YS1pbnZhbGlkXCIsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2UsIGNvbXBvc2VkOiB0cnVlIH0pO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBXYUludmFsaWRFdmVudFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fdHlwZUVycm9yID0gKG1zZykgPT4ge1xuICB0aHJvdyBUeXBlRXJyb3IobXNnKTtcbn07XG52YXIgX19kZWNvcmF0ZUNsYXNzID0gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBraW5kKSA9PiB7XG4gIHZhciByZXN1bHQgPSBraW5kID4gMSA/IHZvaWQgMCA6IGtpbmQgPyBfX2dldE93blByb3BEZXNjKHRhcmdldCwga2V5KSA6IHRhcmdldDtcbiAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMSwgZGVjb3JhdG9yOyBpID49IDA7IGktLSlcbiAgICBpZiAoZGVjb3JhdG9yID0gZGVjb3JhdG9yc1tpXSlcbiAgICAgIHJlc3VsdCA9IChraW5kID8gZGVjb3JhdG9yKHRhcmdldCwga2V5LCByZXN1bHQpIDogZGVjb3JhdG9yKHJlc3VsdCkpIHx8IHJlc3VsdDtcbiAgaWYgKGtpbmQgJiYgcmVzdWx0KSBfX2RlZlByb3AodGFyZ2V0LCBrZXksIHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYWNjZXNzQ2hlY2sgPSAob2JqLCBtZW1iZXIsIG1zZykgPT4gbWVtYmVyLmhhcyhvYmopIHx8IF9fdHlwZUVycm9yKFwiQ2Fubm90IFwiICsgbXNnKTtcbnZhciBfX3ByaXZhdGVHZXQgPSAob2JqLCBtZW1iZXIsIGdldHRlcikgPT4gKF9fYWNjZXNzQ2hlY2sob2JqLCBtZW1iZXIsIFwicmVhZCBmcm9tIHByaXZhdGUgZmllbGRcIiksIGdldHRlciA/IGdldHRlci5jYWxsKG9iaikgOiBtZW1iZXIuZ2V0KG9iaikpO1xudmFyIF9fcHJpdmF0ZUFkZCA9IChvYmosIG1lbWJlciwgdmFsdWUpID0+IG1lbWJlci5oYXMob2JqKSA/IF9fdHlwZUVycm9yKFwiQ2Fubm90IGFkZCB0aGUgc2FtZSBwcml2YXRlIG1lbWJlciBtb3JlIHRoYW4gb25jZVwiKSA6IG1lbWJlciBpbnN0YW5jZW9mIFdlYWtTZXQgPyBtZW1iZXIuYWRkKG9iaikgOiBtZW1iZXIuc2V0KG9iaiwgdmFsdWUpO1xudmFyIF9fcHJpdmF0ZVNldCA9IChvYmosIG1lbWJlciwgdmFsdWUsIHNldHRlcikgPT4gKF9fYWNjZXNzQ2hlY2sob2JqLCBtZW1iZXIsIFwid3JpdGUgdG8gcHJpdmF0ZSBmaWVsZFwiKSwgc2V0dGVyID8gc2V0dGVyLmNhbGwob2JqLCB2YWx1ZSkgOiBtZW1iZXIuc2V0KG9iaiwgdmFsdWUpLCB2YWx1ZSk7XG5cbmV4cG9ydCB7XG4gIF9fZGVjb3JhdGVDbGFzcyxcbiAgX19wcml2YXRlR2V0LFxuICBfX3ByaXZhdGVBZGQsXG4gIF9fcHJpdmF0ZVNldFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5pbXBvcnQge1xuICBfX2RlY29yYXRlQ2xhc3MsXG4gIF9fcHJpdmF0ZUFkZCxcbiAgX19wcml2YXRlR2V0LFxuICBfX3ByaXZhdGVTZXRcbn0gZnJvbSBcIi4vY2h1bmsuN1ZHQ0lIREcuanNcIjtcblxuLy8gc3JjL2ludGVybmFsL3dlYmF3ZXNvbWUtZWxlbWVudC50c1xuaW1wb3J0IHsgTGl0RWxlbWVudCwgaXNTZXJ2ZXIgfSBmcm9tIFwibGl0XCI7XG5pbXBvcnQgeyBwcm9wZXJ0eSB9IGZyb20gXCJsaXQvZGVjb3JhdG9ycy5qc1wiO1xuXG4vLyBzcmMvc3R5bGVzL2NvbXBvbmVudC9ob3N0LnN0eWxlcy50c1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcImxpdFwiO1xudmFyIGhvc3Rfc3R5bGVzX2RlZmF1bHQgPSBjc3NgXG4gIDpob3N0IHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgOmhvc3QgKixcbiAgOmhvc3QgKjo6YmVmb3JlLFxuICA6aG9zdCAqOjphZnRlciB7XG4gICAgYm94LXNpemluZzogaW5oZXJpdDtcbiAgfVxuXG4gIFtoaWRkZW5dIHtcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gIH1cbmA7XG5cbi8vIHNyYy9pbnRlcm5hbC93ZWJhd2Vzb21lLWVsZW1lbnQudHNcbnZhciBfaGFzUmVjb3JkZWRJbml0aWFsUHJvcGVydGllcztcbnZhciBXZWJBd2Vzb21lRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgX19wcml2YXRlQWRkKHRoaXMsIF9oYXNSZWNvcmRlZEluaXRpYWxQcm9wZXJ0aWVzLCBmYWxzZSk7XG4gICAgdGhpcy5pbml0aWFsUmVmbGVjdGVkUHJvcGVydGllcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gICAgdGhpcy5kaWRTU1IgPSBpc1NlcnZlciB8fCBCb29sZWFuKHRoaXMuc2hhZG93Um9vdCk7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsIE1ldGhvZHMgZm9yIHNldHRpbmcgYW5kIGNoZWNraW5nIGN1c3RvbSBzdGF0ZXMuXG4gICAgICovXG4gICAgdGhpcy5jdXN0b21TdGF0ZXMgPSB7XG4gICAgICAvKiogQWRkcyBvciByZW1vdmVzIHRoZSBzcGVjaWZpZWQgY3VzdG9tIHN0YXRlLiAqL1xuICAgICAgc2V0OiAoY3VzdG9tU3RhdGUsIGFjdGl2ZSkgPT4ge1xuICAgICAgICBpZiAoIUJvb2xlYW4odGhpcy5pbnRlcm5hbHM/LnN0YXRlcykpIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmludGVybmFscy5zdGF0ZXMuYWRkKGN1c3RvbVN0YXRlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnRlcm5hbHMuc3RhdGVzLmRlbGV0ZShjdXN0b21TdGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKFN0cmluZyhlKS5pbmNsdWRlcyhcIm11c3Qgc3RhcnQgd2l0aCAnLS0nXCIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiWW91ciBicm93c2VyIGltcGxlbWVudHMgYW4gb3V0ZGF0ZWQgdmVyc2lvbiBvZiBDdXN0b21TdGF0ZVNldC4gQ29uc2lkZXIgdXNpbmcgYSBwb2x5ZmlsbFwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgZWxlbWVudCBjdXJyZW50bHkgaGFzIHRoZSBzcGVjaWZpZWQgc3RhdGUuICovXG4gICAgICBoYXM6IChjdXN0b21TdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoIUJvb2xlYW4odGhpcy5pbnRlcm5hbHM/LnN0YXRlcykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMuc3RhdGVzLmhhcyhjdXN0b21TdGF0ZSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW50ZXJuYWxzID0gdGhpcy5hdHRhY2hJbnRlcm5hbHMoKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFbGVtZW50IGludGVybmFscyBhcmUgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXIuIENvbnNpZGVyIHVzaW5nIGEgcG9seWZpbGxcIik7XG4gICAgfVxuICAgIHRoaXMuY3VzdG9tU3RhdGVzLnNldChcIndhLWRlZmluZWRcIiwgdHJ1ZSk7XG4gICAgbGV0IFNlbGYgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgIGZvciAobGV0IFtwcm9wZXJ0eTIsIHNwZWNdIG9mIFNlbGYuZWxlbWVudFByb3BlcnRpZXMpIHtcbiAgICAgIGlmIChzcGVjLmRlZmF1bHQgPT09IFwiaW5oZXJpdFwiICYmIHNwZWMuaW5pdGlhbCAhPT0gdm9pZCAwICYmIHR5cGVvZiBwcm9wZXJ0eTIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhpcy5jdXN0b21TdGF0ZXMuc2V0KGBpbml0aWFsLSR7cHJvcGVydHkyfS0ke3NwZWMuaW5pdGlhbH1gLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqIFByZXBlbmRzIGhvc3Qgc3R5bGVzIHRvIHRoZSBjb21wb25lbnQncyBzdHlsZXMuICovXG4gIHN0YXRpYyBnZXQgc3R5bGVzKCkge1xuICAgIGNvbnN0IHN0eWxlcyA9IEFycmF5LmlzQXJyYXkodGhpcy5jc3MpID8gdGhpcy5jc3MgOiB0aGlzLmNzcyA/IFt0aGlzLmNzc10gOiBbXTtcbiAgICByZXR1cm4gW2hvc3Rfc3R5bGVzX2RlZmF1bHQsIC4uLnN0eWxlc107XG4gIH1cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmICghX19wcml2YXRlR2V0KHRoaXMsIF9oYXNSZWNvcmRlZEluaXRpYWxQcm9wZXJ0aWVzKSkge1xuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5lbGVtZW50UHJvcGVydGllcy5mb3JFYWNoKFxuICAgICAgICAob2JqLCBwcm9wKSA9PiB7XG4gICAgICAgICAgaWYgKG9iai5yZWZsZWN0ICYmIHRoaXNbcHJvcF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsUmVmbGVjdGVkUHJvcGVydGllcy5zZXQocHJvcCwgdGhpc1twcm9wXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF9oYXNSZWNvcmRlZEluaXRpYWxQcm9wZXJ0aWVzLCB0cnVlKTtcbiAgICB9XG4gICAgc3VwZXIuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gIH1cbiAgd2lsbFVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcykge1xuICAgIHN1cGVyLndpbGxVcGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIHRoaXMuaW5pdGlhbFJlZmxlY3RlZFByb3BlcnRpZXMuZm9yRWFjaCgodmFsdWUsIHByb3ApID0+IHtcbiAgICAgIGlmIChjaGFuZ2VkUHJvcGVydGllcy5oYXMocHJvcCkgJiYgdGhpc1twcm9wXSA9PSBudWxsKSB7XG4gICAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmaXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICBzdXBlci5maXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIGlmICh0aGlzLmRpZFNTUikge1xuICAgICAgdGhpcy5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yQWxsKFwic2xvdFwiKS5mb3JFYWNoKChzbG90RWxlbWVudCkgPT4ge1xuICAgICAgICBzbG90RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInNsb3RjaGFuZ2VcIiwgeyBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlIH0pKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICB1cGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICB0cnkge1xuICAgICAgc3VwZXIudXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAodGhpcy5kaWRTU1IgJiYgIXRoaXMuaGFzVXBkYXRlZCkge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudChcImxpdC1oeWRyYXRpb24tZXJyb3JcIiwgeyBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2UgfSk7XG4gICAgICAgIGV2ZW50LmVycm9yID0gZTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBAaW50ZXJuYWwgR2l2ZW4gYSBuYXRpdmUgZXZlbnQsIHRoaXMgZnVuY3Rpb24gY2FuY2VscyBpdCBhbmQgZGlzcGF0Y2hlcyBpdCBhZ2FpbiBmcm9tIHRoZSBob3N0IGVsZW1lbnQgdXNpbmcgdGhlIGRlc2lyZWRcbiAgICogZXZlbnQgb3B0aW9ucy5cbiAgICovXG4gIHJlbGF5TmF0aXZlRXZlbnQoZXZlbnQsIGV2ZW50T3B0aW9ucykge1xuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBldmVudC5jb25zdHJ1Y3RvcihldmVudC50eXBlLCB7XG4gICAgICAgIC4uLmV2ZW50LFxuICAgICAgICAuLi5ldmVudE9wdGlvbnNcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufTtcbl9oYXNSZWNvcmRlZEluaXRpYWxQcm9wZXJ0aWVzID0gbmV3IFdlYWtNYXAoKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdlYkF3ZXNvbWVFbGVtZW50LnByb3RvdHlwZSwgXCJkaXJcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXZWJBd2Vzb21lRWxlbWVudC5wcm90b3R5cGUsIFwibGFuZ1wiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSwgYXR0cmlidXRlOiBcImRpZC1zc3JcIiB9KVxuXSwgV2ViQXdlc29tZUVsZW1lbnQucHJvdG90eXBlLCBcImRpZFNTUlwiLCAyKTtcblxuZXhwb3J0IHtcbiAgV2ViQXdlc29tZUVsZW1lbnRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuaW1wb3J0IHtcbiAgV2FJbnZhbGlkRXZlbnRcbn0gZnJvbSBcIi4vY2h1bmsuVkMzQlBVWkouanNcIjtcbmltcG9ydCB7XG4gIFdlYkF3ZXNvbWVFbGVtZW50XG59IGZyb20gXCIuL2NodW5rLkVQSEhXWEsyLmpzXCI7XG5pbXBvcnQge1xuICBfX2RlY29yYXRlQ2xhc3Ncbn0gZnJvbSBcIi4vY2h1bmsuN1ZHQ0lIREcuanNcIjtcblxuLy8gc3JjL2ludGVybmFsL3dlYmF3ZXNvbWUtZm9ybS1hc3NvY2lhdGVkLWVsZW1lbnQudHNcbmltcG9ydCB7IGlzU2VydmVyIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHsgcHJvcGVydHkgfSBmcm9tIFwibGl0L2RlY29yYXRvcnMuanNcIjtcblxuLy8gc3JjL2ludGVybmFsL3ZhbGlkYXRvcnMvY3VzdG9tLWVycm9yLXZhbGlkYXRvci50c1xudmFyIEN1c3RvbUVycm9yVmFsaWRhdG9yID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG9ic2VydmVkQXR0cmlidXRlczogW1wiY3VzdG9tLWVycm9yXCJdLFxuICAgIGNoZWNrVmFsaWRpdHkoZWxlbWVudCkge1xuICAgICAgY29uc3QgdmFsaWRpdHkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgIGludmFsaWRLZXlzOiBbXVxuICAgICAgfTtcbiAgICAgIGlmIChlbGVtZW50LmN1c3RvbUVycm9yKSB7XG4gICAgICAgIHZhbGlkaXR5Lm1lc3NhZ2UgPSBlbGVtZW50LmN1c3RvbUVycm9yO1xuICAgICAgICB2YWxpZGl0eS5pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIHZhbGlkaXR5LmludmFsaWRLZXlzID0gW1wiY3VzdG9tRXJyb3JcIl07XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsaWRpdHk7XG4gICAgfVxuICB9O1xufTtcblxuLy8gc3JjL2ludGVybmFsL3dlYmF3ZXNvbWUtZm9ybS1hc3NvY2lhdGVkLWVsZW1lbnQudHNcbnZhciBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50ID0gY2xhc3MgZXh0ZW5kcyBXZWJBd2Vzb21lRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZXF1aXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuYXNzdW1lSW50ZXJhY3Rpb25PbiA9IFtcImlucHV0XCJdO1xuICAgIHRoaXMudmFsaWRhdG9ycyA9IFtdO1xuICAgIHRoaXMudmFsdWVIYXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgdGhpcy5oYXNJbnRlcmFjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5jdXN0b21FcnJvciA9IG51bGw7XG4gICAgdGhpcy5lbWl0dGVkRXZlbnRzID0gW107XG4gICAgdGhpcy5lbWl0SW52YWxpZCA9IChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpIHJldHVybjtcbiAgICAgIHRoaXMuaGFzSW50ZXJhY3RlZCA9IHRydWU7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFdhSW52YWxpZEV2ZW50KCkpO1xuICAgIH07XG4gICAgdGhpcy5oYW5kbGVJbnRlcmFjdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgY29uc3QgZW1pdHRlZEV2ZW50cyA9IHRoaXMuZW1pdHRlZEV2ZW50cztcbiAgICAgIGlmICghZW1pdHRlZEV2ZW50cy5pbmNsdWRlcyhldmVudC50eXBlKSkge1xuICAgICAgICBlbWl0dGVkRXZlbnRzLnB1c2goZXZlbnQudHlwZSk7XG4gICAgICB9XG4gICAgICBpZiAoZW1pdHRlZEV2ZW50cy5sZW5ndGggPT09IHRoaXMuYXNzdW1lSW50ZXJhY3Rpb25Pbj8ubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaGFzSW50ZXJhY3RlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAoIWlzU2VydmVyKSB7XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsIHRoaXMuZW1pdEludmFsaWQpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVmFsaWRhdG9ycyBhcmUgc3RhdGljIGJlY2F1c2UgdGhleSBoYXZlIGBvYnNlcnZlZEF0dHJpYnV0ZXNgLCBlc3NlbnRpYWxseSBhdHRyaWJ1dGVzIHRvIFwid2F0Y2hcIlxuICAgKiBmb3IgY2hhbmdlcy4gV2hlbmV2ZXIgdGhlc2UgYXR0cmlidXRlcyBjaGFuZ2UsIHdlIHdhbnQgdG8gYmUgbm90aWZpZWQgYW5kIHVwZGF0ZSB0aGUgdmFsaWRhdG9yLlxuICAgKi9cbiAgc3RhdGljIGdldCB2YWxpZGF0b3JzKCkge1xuICAgIHJldHVybiBbQ3VzdG9tRXJyb3JWYWxpZGF0b3IoKV07XG4gIH1cbiAgLy8gQXBwZW5kIGFsbCBWYWxpZGF0b3IgXCJvYnNlcnZlZEF0dHJpYnV0ZXNcIiBpbnRvIHRoZSBcIm9ic2VydmVkQXR0cmlidXRlc1wiIHNvIHRoZXkgY2FuIHJ1bi5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgY29uc3QgcGFyZW50QXR0cnMgPSBuZXcgU2V0KHN1cGVyLm9ic2VydmVkQXR0cmlidXRlcyB8fCBbXSk7XG4gICAgZm9yIChjb25zdCB2YWxpZGF0b3Igb2YgdGhpcy52YWxpZGF0b3JzKSB7XG4gICAgICBpZiAoIXZhbGlkYXRvci5vYnNlcnZlZEF0dHJpYnV0ZXMpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgdmFsaWRhdG9yLm9ic2VydmVkQXR0cmlidXRlcykge1xuICAgICAgICBwYXJlbnRBdHRycy5hZGQoYXR0cik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbLi4ucGFyZW50QXR0cnNdO1xuICB9XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgdGhpcy51cGRhdGVWYWxpZGl0eSgpO1xuICAgIHRoaXMuYXNzdW1lSW50ZXJhY3Rpb25Pbi5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLmhhbmRsZUludGVyYWN0aW9uKTtcbiAgICB9KTtcbiAgfVxuICBmaXJzdFVwZGF0ZWQoLi4uYXJncykge1xuICAgIHN1cGVyLmZpcnN0VXBkYXRlZCguLi5hcmdzKTtcbiAgICB0aGlzLnVwZGF0ZVZhbGlkaXR5KCk7XG4gIH1cbiAgd2lsbFVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcykge1xuICAgIGlmICghaXNTZXJ2ZXIgJiYgY2hhbmdlZFByb3BlcnRpZXMuaGFzKFwiY3VzdG9tRXJyb3JcIikpIHtcbiAgICAgIGlmICghdGhpcy5jdXN0b21FcnJvcikge1xuICAgICAgICB0aGlzLmN1c3RvbUVycm9yID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0Q3VzdG9tVmFsaWRpdHkodGhpcy5jdXN0b21FcnJvciB8fCBcIlwiKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcInZhbHVlXCIpIHx8IGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcImRpc2FibGVkXCIpIHx8IGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcImRlZmF1bHRWYWx1ZVwiKSkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGlmICh0aGlzLm5hbWUpIHtcbiAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQodGhpcy5uYW1lLCB2YWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnNldFZhbHVlKGZvcm1EYXRhLCBmb3JtRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcImRpc2FibGVkXCIpKSB7XG4gICAgICB0aGlzLmN1c3RvbVN0YXRlcy5zZXQoXCJkaXNhYmxlZFwiLCB0aGlzLmRpc2FibGVkKTtcbiAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZShcImRpc2FibGVkXCIpIHx8ICFpc1NlcnZlciAmJiAhdGhpcy5tYXRjaGVzKFwiOmRpc2FibGVkXCIpKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlQXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdGhpcy5kaXNhYmxlZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHN1cGVyLndpbGxVcGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIHRoaXMudXBkYXRlVmFsaWRpdHkoKTtcbiAgfVxuICBnZXQgbGFiZWxzKCkge1xuICAgIHJldHVybiB0aGlzLmludGVybmFscy5sYWJlbHM7XG4gIH1cbiAgZ2V0Rm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMuZm9ybTtcbiAgfVxuICAvKipcbiAgICogQnkgZGVmYXVsdCwgZm9ybSBjb250cm9scyBhcmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBuZWFyZXN0IGNvbnRhaW5pbmcgYDxmb3JtPmAgZWxlbWVudC4gVGhpcyBhdHRyaWJ1dGUgYWxsb3dzIHlvdVxuICAgKiB0byBwbGFjZSB0aGUgZm9ybSBjb250cm9sIG91dHNpZGUgb2YgYSBmb3JtIGFuZCBhc3NvY2lhdGUgaXQgd2l0aCB0aGUgZm9ybSB0aGF0IGhhcyB0aGlzIGBpZGAuIFRoZSBmb3JtIG11c3QgYmUgaW5cbiAgICogdGhlIHNhbWUgZG9jdW1lbnQgb3Igc2hhZG93IHJvb3QgZm9yIHRoaXMgdG8gd29yay5cbiAgICovXG4gIHNldCBmb3JtKHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiZm9ybVwiLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShcImZvcm1cIik7XG4gICAgfVxuICB9XG4gIGdldCBmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLmludGVybmFscy5mb3JtO1xuICB9XG4gIGdldCB2YWxpZGl0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMudmFsaWRpdHk7XG4gIH1cbiAgLy8gTm90IHN1cmUgaWYgdGhpcyBzdXBwb3J0cyBgbm92YWxpZGF0ZWAuIFdpbGwgbmVlZCB0byB0ZXN0LlxuICBnZXQgd2lsbFZhbGlkYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmludGVybmFscy53aWxsVmFsaWRhdGU7XG4gIH1cbiAgZ2V0IHZhbGlkYXRpb25NZXNzYWdlKCkge1xuICAgIHJldHVybiB0aGlzLmludGVybmFscy52YWxpZGF0aW9uTWVzc2FnZTtcbiAgfVxuICBjaGVja1ZhbGlkaXR5KCkge1xuICAgIHRoaXMudXBkYXRlVmFsaWRpdHkoKTtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMuY2hlY2tWYWxpZGl0eSgpO1xuICB9XG4gIHJlcG9ydFZhbGlkaXR5KCkge1xuICAgIHRoaXMudXBkYXRlVmFsaWRpdHkoKTtcbiAgICB0aGlzLmhhc0ludGVyYWN0ZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLmludGVybmFscy5yZXBvcnRWYWxpZGl0eSgpO1xuICB9XG4gIC8qKlxuICAgKiBPdmVycmlkZSB0aGlzIHRvIGNoYW5nZSB3aGVyZSBjb25zdHJhaW50IHZhbGlkYXRpb24gcG9wdXBzIGFyZSBhbmNob3JlZC5cbiAgICovXG4gIGdldCB2YWxpZGF0aW9uVGFyZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0IHx8IHZvaWQgMDtcbiAgfVxuICBzZXRWYWxpZGl0eSguLi5hcmdzKSB7XG4gICAgY29uc3QgZmxhZ3MgPSBhcmdzWzBdO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBhcmdzWzFdO1xuICAgIGxldCBhbmNob3IgPSBhcmdzWzJdO1xuICAgIGlmICghYW5jaG9yKSB7XG4gICAgICBhbmNob3IgPSB0aGlzLnZhbGlkYXRpb25UYXJnZXQ7XG4gICAgfVxuICAgIHRoaXMuaW50ZXJuYWxzLnNldFZhbGlkaXR5KGZsYWdzLCBtZXNzYWdlLCBhbmNob3IgfHwgdm9pZCAwKTtcbiAgICB0aGlzLnJlcXVlc3RVcGRhdGUoXCJ2YWxpZGl0eVwiKTtcbiAgICB0aGlzLnNldEN1c3RvbVN0YXRlcygpO1xuICB9XG4gIHNldEN1c3RvbVN0YXRlcygpIHtcbiAgICBjb25zdCByZXF1aXJlZCA9IEJvb2xlYW4odGhpcy5yZXF1aXJlZCk7XG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuaW50ZXJuYWxzLnZhbGlkaXR5LnZhbGlkO1xuICAgIGNvbnN0IGhhc0ludGVyYWN0ZWQgPSB0aGlzLmhhc0ludGVyYWN0ZWQ7XG4gICAgdGhpcy5jdXN0b21TdGF0ZXMuc2V0KFwicmVxdWlyZWRcIiwgcmVxdWlyZWQpO1xuICAgIHRoaXMuY3VzdG9tU3RhdGVzLnNldChcIm9wdGlvbmFsXCIsICFyZXF1aXJlZCk7XG4gICAgdGhpcy5jdXN0b21TdGF0ZXMuc2V0KFwiaW52YWxpZFwiLCAhaXNWYWxpZCk7XG4gICAgdGhpcy5jdXN0b21TdGF0ZXMuc2V0KFwidmFsaWRcIiwgaXNWYWxpZCk7XG4gICAgdGhpcy5jdXN0b21TdGF0ZXMuc2V0KFwidXNlci1pbnZhbGlkXCIsICFpc1ZhbGlkICYmIGhhc0ludGVyYWN0ZWQpO1xuICAgIHRoaXMuY3VzdG9tU3RhdGVzLnNldChcInVzZXItdmFsaWRcIiwgaXNWYWxpZCAmJiBoYXNJbnRlcmFjdGVkKTtcbiAgfVxuICAvKipcbiAgICogRG8gbm90IHVzZSB0aGlzIHdoZW4gY3JlYXRpbmcgYSBcIlZhbGlkYXRvclwiLiBUaGlzIGlzIGludGVuZGVkIGZvciBlbmQgdXNlcnMgb2YgY29tcG9uZW50cy5cbiAgICogV2UgdHJhY2sgbWFudWFsbHkgZGVmaW5lZCBjdXN0b20gZXJyb3JzIHNvIHdlIGRvbid0IGNsZWFyIHRoZW0gb24gYWNjaWRlbnQgaW4gb3VyIHZhbGlkYXRvcnMuXG4gICAqXG4gICAqL1xuICBzZXRDdXN0b21WYWxpZGl0eShtZXNzYWdlKSB7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICB0aGlzLmN1c3RvbUVycm9yID0gbnVsbDtcbiAgICAgIHRoaXMuc2V0VmFsaWRpdHkoe30pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1c3RvbUVycm9yID0gbWVzc2FnZTtcbiAgICB0aGlzLnNldFZhbGlkaXR5KHsgY3VzdG9tRXJyb3I6IHRydWUgfSwgbWVzc2FnZSwgdGhpcy52YWxpZGF0aW9uVGFyZ2V0KTtcbiAgfVxuICBmb3JtUmVzZXRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJlc2V0VmFsaWRpdHkoKTtcbiAgICB0aGlzLmhhc0ludGVyYWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnZhbHVlSGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdHRlZEV2ZW50cyA9IFtdO1xuICAgIHRoaXMudXBkYXRlVmFsaWRpdHkoKTtcbiAgfVxuICBmb3JtRGlzYWJsZWRDYWxsYmFjayhpc0Rpc2FibGVkKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy51cGRhdGVWYWxpZGl0eSgpO1xuICB9XG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgYnJvd3NlciBpcyB0cnlpbmcgdG8gcmVzdG9yZSBlbGVtZW50XHUyMDE5cyBzdGF0ZSB0byBzdGF0ZSBpbiB3aGljaCBjYXNlIHJlYXNvbiBpcyBcInJlc3RvcmVcIiwgb3Igd2hlblxuICAgKiB0aGUgYnJvd3NlciBpcyB0cnlpbmcgdG8gZnVsZmlsbCBhdXRvZmlsbCBvbiBiZWhhbGYgb2YgdXNlciBpbiB3aGljaCBjYXNlIHJlYXNvbiBpcyBcImF1dG9jb21wbGV0ZVwiLiBJbiB0aGUgY2FzZSBvZlxuICAgKiBcInJlc3RvcmVcIiwgc3RhdGUgaXMgYSBzdHJpbmcsIEZpbGUsIG9yIEZvcm1EYXRhIG9iamVjdCBwcmV2aW91c2x5IHNldCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHNldEZvcm1WYWx1ZS5cbiAgICovXG4gIGZvcm1TdGF0ZVJlc3RvcmVDYWxsYmFjayhzdGF0ZSwgcmVhc29uKSB7XG4gICAgdGhpcy52YWx1ZSA9IHN0YXRlO1xuICAgIGlmIChyZWFzb24gPT09IFwicmVzdG9yZVwiKSB7XG4gICAgICB0aGlzLnJlc2V0VmFsaWRpdHkoKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVWYWxpZGl0eSgpO1xuICB9XG4gIHNldFZhbHVlKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbdmFsdWUsIHN0YXRlXSA9IGFyZ3M7XG4gICAgdGhpcy5pbnRlcm5hbHMuc2V0Rm9ybVZhbHVlKHZhbHVlLCBzdGF0ZSk7XG4gIH1cbiAgZ2V0IGFsbFZhbGlkYXRvcnMoKSB7XG4gICAgY29uc3Qgc3RhdGljVmFsaWRhdG9ycyA9IHRoaXMuY29uc3RydWN0b3IudmFsaWRhdG9ycyB8fCBbXTtcbiAgICBjb25zdCB2YWxpZGF0b3JzID0gdGhpcy52YWxpZGF0b3JzIHx8IFtdO1xuICAgIHJldHVybiBbLi4uc3RhdGljVmFsaWRhdG9ycywgLi4udmFsaWRhdG9yc107XG4gIH1cbiAgLyoqXG4gICAqIFJlc2V0IHZhbGlkaXR5IGlzIGEgd2F5IG9mIHJlbW92aW5nIG1hbnVhbCBjdXN0b20gZXJyb3JzIGFuZCBuYXRpdmUgdmFsaWRhdGlvbi5cbiAgICovXG4gIHJlc2V0VmFsaWRpdHkoKSB7XG4gICAgdGhpcy5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgICB0aGlzLnNldFZhbGlkaXR5KHt9KTtcbiAgfVxuICB1cGRhdGVWYWxpZGl0eSgpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmhhc0F0dHJpYnV0ZShcImRpc2FibGVkXCIpIHx8ICF0aGlzLndpbGxWYWxpZGF0ZSkge1xuICAgICAgdGhpcy5yZXNldFZhbGlkaXR5KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0aGlzLmFsbFZhbGlkYXRvcnM7XG4gICAgaWYgKCF2YWxpZGF0b3JzPy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmxhZ3MgPSB7XG4gICAgICAvLyBEb24ndCB0cnVzdCBjdXN0b20gZXJyb3JzIGZyb20gdGhlIEJyb3dzZXIuIFNhZmFyaSBicmVha3MgdGhlIHNwZWMuXG4gICAgICBjdXN0b21FcnJvcjogQm9vbGVhbih0aGlzLmN1c3RvbUVycm9yKVxuICAgIH07XG4gICAgY29uc3QgZm9ybUNvbnRyb2wgPSB0aGlzLnZhbGlkYXRpb25UYXJnZXQgfHwgdGhpcy5pbnB1dCB8fCB2b2lkIDA7XG4gICAgbGV0IGZpbmFsTWVzc2FnZSA9IFwiXCI7XG4gICAgZm9yIChjb25zdCB2YWxpZGF0b3Igb2YgdmFsaWRhdG9ycykge1xuICAgICAgY29uc3QgeyBpc1ZhbGlkLCBtZXNzYWdlLCBpbnZhbGlkS2V5cyB9ID0gdmFsaWRhdG9yLmNoZWNrVmFsaWRpdHkodGhpcyk7XG4gICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICghZmluYWxNZXNzYWdlKSB7XG4gICAgICAgIGZpbmFsTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICB9XG4gICAgICBpZiAoaW52YWxpZEtleXM/Lmxlbmd0aCA+PSAwKSB7XG4gICAgICAgIGludmFsaWRLZXlzLmZvckVhY2goKHN0cikgPT4gZmxhZ3Nbc3RyXSA9IHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZpbmFsTWVzc2FnZSkge1xuICAgICAgZmluYWxNZXNzYWdlID0gdGhpcy52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICB9XG4gICAgdGhpcy5zZXRWYWxpZGl0eShmbGFncywgZmluYWxNZXNzYWdlLCBmb3JtQ29udHJvbCk7XG4gIH1cbn07XG5XZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50LmZvcm1Bc3NvY2lhdGVkID0gdHJ1ZTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudC5wcm90b3R5cGUsIFwibmFtZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiB9KVxuXSwgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudC5wcm90b3R5cGUsIFwiZGlzYWJsZWRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHN0YXRlOiB0cnVlLCBhdHRyaWJ1dGU6IGZhbHNlIH0pXG5dLCBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50LnByb3RvdHlwZSwgXCJ2YWx1ZUhhc0NoYW5nZWRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHN0YXRlOiB0cnVlLCBhdHRyaWJ1dGU6IGZhbHNlIH0pXG5dLCBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50LnByb3RvdHlwZSwgXCJoYXNJbnRlcmFjdGVkXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwiY3VzdG9tLWVycm9yXCIsIHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdlYkF3ZXNvbWVGb3JtQXNzb2NpYXRlZEVsZW1lbnQucHJvdG90eXBlLCBcImN1c3RvbUVycm9yXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IGZhbHNlLCBzdGF0ZTogdHJ1ZSwgdHlwZTogT2JqZWN0IH0pXG5dLCBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50LnByb3RvdHlwZSwgXCJ2YWxpZGl0eVwiLCAxKTtcblxuZXhwb3J0IHtcbiAgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9pbnRlcm5hbC9zbG90LnRzXG52YXIgSGFzU2xvdENvbnRyb2xsZXIgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKGhvc3QsIC4uLnNsb3ROYW1lcykge1xuICAgIHRoaXMuc2xvdE5hbWVzID0gW107XG4gICAgdGhpcy5oYW5kbGVTbG90Q2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBzbG90ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgaWYgKHRoaXMuc2xvdE5hbWVzLmluY2x1ZGVzKFwiW2RlZmF1bHRdXCIpICYmICFzbG90Lm5hbWUgfHwgc2xvdC5uYW1lICYmIHRoaXMuc2xvdE5hbWVzLmluY2x1ZGVzKHNsb3QubmFtZSkpIHtcbiAgICAgICAgdGhpcy5ob3N0LnJlcXVlc3RVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgICh0aGlzLmhvc3QgPSBob3N0KS5hZGRDb250cm9sbGVyKHRoaXMpO1xuICAgIHRoaXMuc2xvdE5hbWVzID0gc2xvdE5hbWVzO1xuICB9XG4gIGhhc0RlZmF1bHRTbG90KCkge1xuICAgIGlmICghdGhpcy5ob3N0LmNoaWxkTm9kZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIFsuLi50aGlzLmhvc3QuY2hpbGROb2Rlc10uc29tZSgobm9kZSkgPT4ge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFICYmIG5vZGUudGV4dENvbnRlbnQudHJpbSgpICE9PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgIGNvbnN0IGVsID0gbm9kZTtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHRhZ05hbWUgPT09IFwid2EtdmlzdWFsbHktaGlkZGVuXCIpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoXCJzbG90XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuICBoYXNOYW1lZFNsb3QobmFtZSkge1xuICAgIHJldHVybiB0aGlzLmhvc3QucXVlcnlTZWxlY3Rvcj8uKGA6c2NvcGUgPiBbc2xvdD1cIiR7bmFtZX1cIl1gKSAhPT0gbnVsbDtcbiAgfVxuICB0ZXN0KHNsb3ROYW1lKSB7XG4gICAgcmV0dXJuIHNsb3ROYW1lID09PSBcIltkZWZhdWx0XVwiID8gdGhpcy5oYXNEZWZhdWx0U2xvdCgpIDogdGhpcy5oYXNOYW1lZFNsb3Qoc2xvdE5hbWUpO1xuICB9XG4gIGhvc3RDb25uZWN0ZWQoKSB7XG4gICAgdGhpcy5ob3N0LnNoYWRvd1Jvb3Q/LmFkZEV2ZW50TGlzdGVuZXI/LihcInNsb3RjaGFuZ2VcIiwgdGhpcy5oYW5kbGVTbG90Q2hhbmdlKTtcbiAgfVxuICBob3N0RGlzY29ubmVjdGVkKCkge1xuICAgIHRoaXMuaG9zdC5zaGFkb3dSb290Py5yZW1vdmVFdmVudExpc3RlbmVyPy4oXCJzbG90Y2hhbmdlXCIsIHRoaXMuaGFuZGxlU2xvdENoYW5nZSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIEhhc1Nsb3RDb250cm9sbGVyXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL3N0eWxlcy9jb21wb25lbnQvc2l6ZS5zdHlsZXMudHNcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJsaXRcIjtcbnZhciBzaXplX3N0eWxlc19kZWZhdWx0ID0gY3NzYFxuICA6aG9zdChbc2l6ZT0nc21hbGwnXSksXG4gIC53YS1zaXplLXMge1xuICAgIGZvbnQtc2l6ZTogdmFyKC0td2EtZm9udC1zaXplLXMpO1xuICB9XG5cbiAgOmhvc3QoW3NpemU9J21lZGl1bSddKSxcbiAgLndhLXNpemUtbSB7XG4gICAgZm9udC1zaXplOiB2YXIoLS13YS1mb250LXNpemUtbSk7XG4gIH1cblxuICA6aG9zdChbc2l6ZT0nbGFyZ2UnXSksXG4gIC53YS1zaXplLWwge1xuICAgIGZvbnQtc2l6ZTogdmFyKC0td2EtZm9udC1zaXplLWwpO1xuICB9XG5gO1xuXG5leHBvcnQge1xuICBzaXplX3N0eWxlc19kZWZhdWx0XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbi5zdHlsZXMudHNcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJsaXRcIjtcbnZhciBidXR0b25fc3R5bGVzX2RlZmF1bHQgPSBjc3NgXG4gIEBsYXllciB3YS1jb21wb25lbnQge1xuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblxuICAgICAgLyogV29ya2Fyb3VuZCBiZWNhdXNlIENocm9tZSBkb2Vzbid0IGxpa2UgOmhvc3QoOmhhcygpKSBiZWxvd1xuICAgICAgICogaHR0cHM6Ly9pc3N1ZXMuY2hyb21pdW0ub3JnL2lzc3Vlcy80MDA2MjM1NVxuICAgICAgICogRmlyZWZveCBkb2Vzbid0IGxpa2UgdGhpcyBuZXN0ZWQgcnVsZSwgc28gYm90aCBhcmUgbmVlZGVkICovXG4gICAgICAmOmhhcyh3YS1iYWRnZSkge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogQXBwbHkgcmVsYXRpdmUgcG9zaXRpb25pbmcgb25seSB3aGVuIG5lZWRlZCB0byBwb3NpdGlvbiB3YS1iYWRnZVxuICAgICAqIFRoaXMgYXZvaWRzIGNyZWF0aW5nIGEgbmV3IHN0YWNraW5nIGNvbnRleHQgZm9yIGV2ZXJ5IGJ1dHRvbiAqL1xuICAgIDpob3N0KDpoYXMod2EtYmFkZ2UpKSB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuICB9XG5cbiAgLmJ1dHRvbiB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogYmFja2dyb3VuZCwgYm9yZGVyLCBib3gtc2hhZG93LCBjb2xvciwgb3BhY2l0eTtcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiB2YXIoLS13YS10cmFuc2l0aW9uLWZhc3QpO1xuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS13YS10cmFuc2l0aW9uLWVhc2luZyk7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHBhZGRpbmc6IDAgdmFyKC0td2EtZm9ybS1jb250cm9sLXBhZGRpbmctaW5saW5lKTtcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgZm9udC13ZWlnaHQ6IHZhcigtLXdhLWZvbnQtd2VpZ2h0LWFjdGlvbik7XG4gICAgbGluZS1oZWlnaHQ6IGNhbGModmFyKC0td2EtZm9ybS1jb250cm9sLWhlaWdodCkgLSB2YXIoLS1ib3JkZXItd2lkdGgpICogMik7XG4gICAgaGVpZ2h0OiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtaGVpZ2h0KTtcbiAgICB3aWR0aDogMTAwJTtcblxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWNvbG9yLWZpbGwtbG91ZCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLWxvdWQpKTtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1sb3VkLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLWxvdWQpKTtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLXJhZGl1cyk7XG4gICAgYm9yZGVyLXN0eWxlOiB2YXIoLS13YS1ib3JkZXItc3R5bGUpO1xuICAgIGJvcmRlci13aWR0aDogdmFyKC0td2EtYm9yZGVyLXdpZHRoLXMpO1xuICB9XG5cbiAgLyogQXBwZWFyYW5jZSBtb2RpZmllcnMgKi9cbiAgOmhvc3QoW2FwcGVhcmFuY2U9J3BsYWluJ10pIHtcbiAgICAuYnV0dG9uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1xdWlldCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1xdWlldCkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICBAbWVkaWEgKGhvdmVyOiBob3Zlcikge1xuICAgICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmhvdmVyIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXdhLWNvbG9yLW9uLXF1aWV0LCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLXF1aWV0KSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWNvbG9yLWZpbGwtcXVpZXQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1xdWlldCkpO1xuICAgICAgfVxuICAgIH1cbiAgICAuYnV0dG9uOm5vdCguZGlzYWJsZWQpOm5vdCgubG9hZGluZyk6YWN0aXZlIHtcbiAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1xdWlldCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1xdWlldCkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICBpbiBva2xhYixcbiAgICAgICAgdmFyKC0td2EtY29sb3ItZmlsbC1xdWlldCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLXF1aWV0KSksXG4gICAgICAgIHZhcigtLXdhLWNvbG9yLW1peC1hY3RpdmUpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIDpob3N0KFthcHBlYXJhbmNlPSdvdXRsaW5lZCddKSB7XG4gICAgLmJ1dHRvbiB7XG4gICAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tcXVpZXQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tcXVpZXQpKTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS13YS1jb2xvci1ib3JkZXItbG91ZCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1ib3JkZXItbG91ZCkpO1xuICAgIH1cbiAgICBAbWVkaWEgKGhvdmVyOiBob3Zlcikge1xuICAgICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmhvdmVyIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXdhLWNvbG9yLW9uLXF1aWV0LCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLXF1aWV0KSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWNvbG9yLWZpbGwtcXVpZXQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1xdWlldCkpO1xuICAgICAgfVxuICAgIH1cbiAgICAuYnV0dG9uOm5vdCguZGlzYWJsZWQpOm5vdCgubG9hZGluZyk6YWN0aXZlIHtcbiAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1xdWlldCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1xdWlldCkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICBpbiBva2xhYixcbiAgICAgICAgdmFyKC0td2EtY29sb3ItZmlsbC1xdWlldCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLXF1aWV0KSksXG4gICAgICAgIHZhcigtLXdhLWNvbG9yLW1peC1hY3RpdmUpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIDpob3N0KFthcHBlYXJhbmNlPSdmaWxsZWQnXSkge1xuICAgIC5idXR0b24ge1xuICAgICAgY29sb3I6IHZhcigtLXdhLWNvbG9yLW9uLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1ub3JtYWwpKTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWNvbG9yLWZpbGwtbm9ybWFsLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtbm9ybWFsKSk7XG4gICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICBAbWVkaWEgKGhvdmVyOiBob3Zlcikge1xuICAgICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmhvdmVyIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXdhLWNvbG9yLW9uLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1ub3JtYWwpKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICAgIGluIG9rbGFiLFxuICAgICAgICAgIHZhcigtLXdhLWNvbG9yLWZpbGwtbm9ybWFsLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtbm9ybWFsKSksXG4gICAgICAgICAgdmFyKC0td2EtY29sb3ItbWl4LWhvdmVyKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICAuYnV0dG9uOm5vdCguZGlzYWJsZWQpOm5vdCgubG9hZGluZyk6YWN0aXZlIHtcbiAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbm9ybWFsKSk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoXG4gICAgICAgIGluIG9rbGFiLFxuICAgICAgICB2YXIoLS13YS1jb2xvci1maWxsLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLW5vcm1hbCkpLFxuICAgICAgICB2YXIoLS13YS1jb2xvci1taXgtYWN0aXZlKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICA6aG9zdChbYXBwZWFyYW5jZT0nZmlsbGVkLW91dGxpbmVkJ10pIHtcbiAgICAuYnV0dG9uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbm9ybWFsKSk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13YS1jb2xvci1maWxsLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLW5vcm1hbCkpO1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS13YS1jb2xvci1ib3JkZXItbm9ybWFsLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWJvcmRlci1ub3JtYWwpKTtcbiAgICB9XG4gICAgQG1lZGlhIChob3ZlcjogaG92ZXIpIHtcbiAgICAgIC5idXR0b246bm90KC5kaXNhYmxlZCk6bm90KC5sb2FkaW5nKTpob3ZlciB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbm9ybWFsKSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChcbiAgICAgICAgICBpbiBva2xhYixcbiAgICAgICAgICB2YXIoLS13YS1jb2xvci1maWxsLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLW5vcm1hbCkpLFxuICAgICAgICAgIHZhcigtLXdhLWNvbG9yLW1peC1ob3ZlcilcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmFjdGl2ZSB7XG4gICAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tbm9ybWFsLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLW5vcm1hbCkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICBpbiBva2xhYixcbiAgICAgICAgdmFyKC0td2EtY29sb3ItZmlsbC1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1ub3JtYWwpKSxcbiAgICAgICAgdmFyKC0td2EtY29sb3ItbWl4LWFjdGl2ZSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgOmhvc3QoW2FwcGVhcmFuY2U9J2FjY2VudCddKSB7XG4gICAgLmJ1dHRvbiB7XG4gICAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tbG91ZCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1sb3VkKSk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13YS1jb2xvci1maWxsLWxvdWQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1sb3VkKSk7XG4gICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICBAbWVkaWEgKGhvdmVyOiBob3Zlcikge1xuICAgICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICAgIGluIG9rbGFiLFxuICAgICAgICAgIHZhcigtLXdhLWNvbG9yLWZpbGwtbG91ZCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLWxvdWQpKSxcbiAgICAgICAgICB2YXIoLS13YS1jb2xvci1taXgtaG92ZXIpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIC5idXR0b246bm90KC5kaXNhYmxlZCk6bm90KC5sb2FkaW5nKTphY3RpdmUge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICBpbiBva2xhYixcbiAgICAgICAgdmFyKC0td2EtY29sb3ItZmlsbC1sb3VkLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtbG91ZCkpLFxuICAgICAgICB2YXIoLS13YS1jb2xvci1taXgtYWN0aXZlKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKiBGb2N1cyBzdGF0ZXMgKi9cbiAgLmJ1dHRvbjpmb2N1cyB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxuXG4gIC5idXR0b246Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogdmFyKC0td2EtZm9jdXMtcmluZyk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLXdhLWZvY3VzLXJpbmctb2Zmc2V0KTtcbiAgfVxuXG4gIC8qIERpc2FibGVkIHN0YXRlICovXG4gIDpob3N0KFtkaXNhYmxlZF0pIHtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcblxuICAgIC8qIFdoZW4gZGlzYWJsZWQsIHByZXZlbnQgbW91c2UgZXZlbnRzIGZyb20gYnViYmxpbmcgdXAgZnJvbSBjaGlsZHJlbiAqL1xuICAgIC5idXR0b24ge1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuICB9XG5cbiAgLyogS2VlcCBpdCBsYXN0IHNvIFNhZmFyaSBkb2Vzbid0IHN0b3AgcGFyc2luZyB0aGlzIGJsb2NrICovXG4gIC5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIge1xuICAgIGJvcmRlcjogMDtcbiAgfVxuXG4gIC8qIEljb24gYnV0dG9ucyAqL1xuICAuYnV0dG9uLmlzLWljb24tYnV0dG9uIHtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICAgIHdpZHRoOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtaGVpZ2h0KTtcbiAgICBhc3BlY3QtcmF0aW86IDE7XG4gIH1cblxuICAuYnV0dG9uLmlzLWljb24tYnV0dG9uOmhhcyh3YS1pY29uKSB7XG4gICAgd2lkdGg6IGF1dG87XG4gIH1cblxuICAvKiBQaWxsIG1vZGlmaWVyICovXG4gIDpob3N0KFtwaWxsXSkgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0td2EtYm9yZGVyLXJhZGl1cy1waWxsKTtcbiAgfVxuXG4gIC8qXG4gICAqIExhYmVsXG4gICAqL1xuXG4gIC5zdGFydCxcbiAgLmVuZCB7XG4gICAgZmxleDogMCAwIGF1dG87XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5cbiAgLmxhYmVsIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cblxuICAuaXMtaWNvbi1idXR0b24gLmxhYmVsIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICB9XG5cbiAgLmxhYmVsOjpzbG90dGVkKHdhLWljb24pIHtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gIH1cblxuICAvKlxuICAgKiBDYXJldCBtb2RpZmllclxuICAgKi9cblxuICB3YS1pY29uW3BhcnQ9J2NhcmV0J10ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAmOjpwYXJ0KHN2Zykge1xuICAgICAgd2lkdGg6IDAuODc1ZW07XG4gICAgICBoZWlnaHQ6IDAuODc1ZW07XG4gICAgfVxuXG4gICAgLmJ1dHRvbjpoYXMoJikgLmVuZCB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIExvYWRpbmcgbW9kaWZpZXJcbiAgICovXG5cbiAgLmxvYWRpbmcge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBjdXJzb3I6IHdhaXQ7XG5cbiAgICAuc3RhcnQsXG4gICAgLmxhYmVsLFxuICAgIC5lbmQsXG4gICAgLmNhcmV0IHtcbiAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICB9XG5cbiAgICB3YS1zcGlubmVyIHtcbiAgICAgIC0taW5kaWNhdG9yLWNvbG9yOiBjdXJyZW50Q29sb3I7XG4gICAgICAtLXRyYWNrLWNvbG9yOiBjb2xvci1taXgoaW4gb2tsYWIsIGN1cnJlbnRDb2xvciwgdHJhbnNwYXJlbnQgOTAlKTtcblxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgZm9udC1zaXplOiAxZW07XG4gICAgICBoZWlnaHQ6IDFlbTtcbiAgICAgIHdpZHRoOiAxZW07XG4gICAgICB0b3A6IGNhbGMoNTAlIC0gMC41ZW0pO1xuICAgICAgbGVmdDogY2FsYyg1MCUgLSAwLjVlbSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogQmFkZ2VzXG4gICAqL1xuXG4gIC5idXR0b24gOjpzbG90dGVkKHdhLWJhZGdlKSB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS13YS1jb2xvci1zdXJmYWNlLWRlZmF1bHQpO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldC1ibG9jay1zdGFydDogMDtcbiAgICBpbnNldC1pbmxpbmUtZW5kOiAwO1xuICAgIHRyYW5zbGF0ZTogNTAlIC01MCU7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIH1cblxuICA6aG9zdCg6ZGlyKHJ0bCkpIDo6c2xvdHRlZCh3YS1iYWRnZSkge1xuICAgIHRyYW5zbGF0ZTogLTUwJSAtNTAlO1xuICB9XG5cbiAgLypcbiAgKiBCdXR0b24gc3BhY2luZ1xuICAqL1xuXG4gIHNsb3RbbmFtZT0nc3RhcnQnXTo6c2xvdHRlZCgqKSB7XG4gICAgbWFyZ2luLWlubGluZS1lbmQ6IDAuNzVlbTtcbiAgfVxuXG4gIHNsb3RbbmFtZT0nZW5kJ106OnNsb3R0ZWQoKiksXG4gIC5idXR0b246bm90KC52aXN1YWxseS1oaWRkZW4tbGFiZWwpIFtwYXJ0PSdjYXJldCddIHtcbiAgICBtYXJnaW4taW5saW5lLXN0YXJ0OiAwLjc1ZW07XG4gIH1cblxuICAvKlxuICAgKiBCdXR0b24gZ3JvdXAgYm9yZGVyIHJhZGl1cyBtb2RpZmljYXRpb25zXG4gICAqL1xuXG4gIC8qIFJlbW92ZSBib3JkZXIgcmFkaXVzIGZyb20gYWxsIGdyb3VwZWQgYnV0dG9ucyBieSBkZWZhdWx0ICovXG4gIDpob3N0KC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbikgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgfVxuXG4gIC8qIEhvcml6b250YWwgb3JpZW50YXRpb24gKi9cbiAgOmhvc3QoLndhLWJ1dHRvbi1ncm91cF9faG9yaXpvbnRhbC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbi1maXJzdCkgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXN0YXJ0LXN0YXJ0LXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICAgIGJvcmRlci1lbmQtc3RhcnQtcmFkaXVzOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLXJhZGl1cyk7XG4gIH1cblxuICA6aG9zdCgud2EtYnV0dG9uLWdyb3VwX19ob3Jpem9udGFsLndhLWJ1dHRvbi1ncm91cF9fYnV0dG9uLWxhc3QpIC5idXR0b24ge1xuICAgIGJvcmRlci1zdGFydC1lbmQtcmFkaXVzOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLXJhZGl1cyk7XG4gICAgYm9yZGVyLWVuZC1lbmQtcmFkaXVzOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLXJhZGl1cyk7XG4gIH1cblxuICAvKiBWZXJ0aWNhbCBvcmllbnRhdGlvbiAqL1xuICA6aG9zdCgud2EtYnV0dG9uLWdyb3VwX192ZXJ0aWNhbCkge1xuICAgIGZsZXg6IDEgMSBhdXRvO1xuICB9XG5cbiAgOmhvc3QoLndhLWJ1dHRvbi1ncm91cF9fdmVydGljYWwpIC5idXR0b24ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogc3RhcnQ7XG4gIH1cblxuICA6aG9zdCgud2EtYnV0dG9uLWdyb3VwX192ZXJ0aWNhbC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbi1maXJzdCkgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXN0YXJ0LXN0YXJ0LXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICAgIGJvcmRlci1zdGFydC1lbmQtcmFkaXVzOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLXJhZGl1cyk7XG4gIH1cblxuICA6aG9zdCgud2EtYnV0dG9uLWdyb3VwX192ZXJ0aWNhbC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbi1sYXN0KSAuYnV0dG9uIHtcbiAgICBib3JkZXItZW5kLXN0YXJ0LXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICAgIGJvcmRlci1lbmQtZW5kLXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICB9XG5cbiAgLyogSGFuZGxlIHBpbGwgbW9kaWZpZXIgZm9yIGJ1dHRvbiBncm91cHMgKi9cbiAgOmhvc3QoW3BpbGxdLndhLWJ1dHRvbi1ncm91cF9faG9yaXpvbnRhbC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbi1maXJzdCkgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXN0YXJ0LXN0YXJ0LXJhZGl1czogdmFyKC0td2EtYm9yZGVyLXJhZGl1cy1waWxsKTtcbiAgICBib3JkZXItZW5kLXN0YXJ0LXJhZGl1czogdmFyKC0td2EtYm9yZGVyLXJhZGl1cy1waWxsKTtcbiAgfVxuXG4gIDpob3N0KFtwaWxsXS53YS1idXR0b24tZ3JvdXBfX2hvcml6b250YWwud2EtYnV0dG9uLWdyb3VwX19idXR0b24tbGFzdCkgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXN0YXJ0LWVuZC1yYWRpdXM6IHZhcigtLXdhLWJvcmRlci1yYWRpdXMtcGlsbCk7XG4gICAgYm9yZGVyLWVuZC1lbmQtcmFkaXVzOiB2YXIoLS13YS1ib3JkZXItcmFkaXVzLXBpbGwpO1xuICB9XG5cbiAgOmhvc3QoW3BpbGxdLndhLWJ1dHRvbi1ncm91cF9fdmVydGljYWwud2EtYnV0dG9uLWdyb3VwX19idXR0b24tZmlyc3QpIC5idXR0b24ge1xuICAgIGJvcmRlci1zdGFydC1zdGFydC1yYWRpdXM6IHZhcigtLXdhLWJvcmRlci1yYWRpdXMtcGlsbCk7XG4gICAgYm9yZGVyLXN0YXJ0LWVuZC1yYWRpdXM6IHZhcigtLXdhLWJvcmRlci1yYWRpdXMtcGlsbCk7XG4gIH1cblxuICA6aG9zdChbcGlsbF0ud2EtYnV0dG9uLWdyb3VwX192ZXJ0aWNhbC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbi1sYXN0KSAuYnV0dG9uIHtcbiAgICBib3JkZXItZW5kLXN0YXJ0LXJhZGl1czogdmFyKC0td2EtYm9yZGVyLXJhZGl1cy1waWxsKTtcbiAgICBib3JkZXItZW5kLWVuZC1yYWRpdXM6IHZhcigtLXdhLWJvcmRlci1yYWRpdXMtcGlsbCk7XG4gIH1cbmA7XG5cbmV4cG9ydCB7XG4gIGJ1dHRvbl9zdHlsZXNfZGVmYXVsdFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9pbnRlcm5hbC93YXRjaC50c1xuZnVuY3Rpb24gd2F0Y2gocHJvcGVydHlOYW1lLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlc29sdmVkT3B0aW9ucyA9IHtcbiAgICB3YWl0VW50aWxGaXJzdFVwZGF0ZTogZmFsc2UsXG4gICAgLi4ub3B0aW9uc1xuICB9O1xuICByZXR1cm4gKHByb3RvLCBkZWNvcmF0ZWRGbk5hbWUpID0+IHtcbiAgICBjb25zdCB7IHVwZGF0ZSB9ID0gcHJvdG87XG4gICAgY29uc3Qgd2F0Y2hlZFByb3BlcnRpZXMgPSBBcnJheS5pc0FycmF5KHByb3BlcnR5TmFtZSkgPyBwcm9wZXJ0eU5hbWUgOiBbcHJvcGVydHlOYW1lXTtcbiAgICBwcm90by51cGRhdGUgPSBmdW5jdGlvbihjaGFuZ2VkUHJvcHMpIHtcbiAgICAgIHdhdGNoZWRQcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IHByb3BlcnR5O1xuICAgICAgICBpZiAoY2hhbmdlZFByb3BzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBjaGFuZ2VkUHJvcHMuZ2V0KGtleSk7XG4gICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzW2tleV07XG4gICAgICAgICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFyZXNvbHZlZE9wdGlvbnMud2FpdFVudGlsRmlyc3RVcGRhdGUgfHwgdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICAgICAgICAgIHRoaXNbZGVjb3JhdGVkRm5OYW1lXShvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB1cGRhdGUuY2FsbCh0aGlzLCBjaGFuZ2VkUHJvcHMpO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCB7XG4gIHdhdGNoXG59O1xuIiwgImNvbnN0IGNvbm5lY3RlZEVsZW1lbnRzID0gbmV3IFNldCgpO1xuY29uc3QgdHJhbnNsYXRpb25zID0gbmV3IE1hcCgpO1xubGV0IGZhbGxiYWNrO1xubGV0IGRvY3VtZW50RGlyZWN0aW9uID0gJ2x0cic7XG5sZXQgZG9jdW1lbnRMYW5ndWFnZSA9ICdlbic7XG5jb25zdCBpc0NsaWVudCA9ICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAhPT0gXCJ1bmRlZmluZWRcIik7XG5pZiAoaXNDbGllbnQpIHtcbiAgICBjb25zdCBkb2N1bWVudEVsZW1lbnRPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHVwZGF0ZSk7XG4gICAgZG9jdW1lbnREaXJlY3Rpb24gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGlyIHx8ICdsdHInO1xuICAgIGRvY3VtZW50TGFuZ3VhZ2UgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyB8fCBuYXZpZ2F0b3IubGFuZ3VhZ2U7XG4gICAgZG9jdW1lbnRFbGVtZW50T2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ2RpcicsICdsYW5nJ11cbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclRyYW5zbGF0aW9uKC4uLnRyYW5zbGF0aW9uKSB7XG4gICAgdHJhbnNsYXRpb24ubWFwKHQgPT4ge1xuICAgICAgICBjb25zdCBjb2RlID0gdC4kY29kZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAodHJhbnNsYXRpb25zLmhhcyhjb2RlKSkge1xuICAgICAgICAgICAgdHJhbnNsYXRpb25zLnNldChjb2RlLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRyYW5zbGF0aW9ucy5nZXQoY29kZSkpLCB0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2xhdGlvbnMuc2V0KGNvZGUsIHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZmFsbGJhY2spIHtcbiAgICAgICAgICAgIGZhbGxiYWNrID0gdDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHVwZGF0ZSgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAoaXNDbGllbnQpIHtcbiAgICAgICAgZG9jdW1lbnREaXJlY3Rpb24gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGlyIHx8ICdsdHInO1xuICAgICAgICBkb2N1bWVudExhbmd1YWdlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgfHwgbmF2aWdhdG9yLmxhbmd1YWdlO1xuICAgIH1cbiAgICBbLi4uY29ubmVjdGVkRWxlbWVudHMua2V5cygpXS5tYXAoKGVsKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgZWwucmVxdWVzdFVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZWwucmVxdWVzdFVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgY2xhc3MgTG9jYWxpemVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihob3N0KSB7XG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XG4gICAgICAgIHRoaXMuaG9zdC5hZGRDb250cm9sbGVyKHRoaXMpO1xuICAgIH1cbiAgICBob3N0Q29ubmVjdGVkKCkge1xuICAgICAgICBjb25uZWN0ZWRFbGVtZW50cy5hZGQodGhpcy5ob3N0KTtcbiAgICB9XG4gICAgaG9zdERpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgY29ubmVjdGVkRWxlbWVudHMuZGVsZXRlKHRoaXMuaG9zdCk7XG4gICAgfVxuICAgIGRpcigpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuaG9zdC5kaXIgfHwgZG9jdW1lbnREaXJlY3Rpb259YC50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBsYW5nKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5ob3N0LmxhbmcgfHwgZG9jdW1lbnRMYW5ndWFnZX1gLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIGdldFRyYW5zbGF0aW9uRGF0YShsYW5nKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IGxvY2FsZSA9IG5ldyBJbnRsLkxvY2FsZShsYW5nLnJlcGxhY2UoL18vZywgJy0nKSk7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlID0gbG9jYWxlID09PSBudWxsIHx8IGxvY2FsZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbG9jYWxlLmxhbmd1YWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHJlZ2lvbiA9IChfYiA9IChfYSA9IGxvY2FsZSA9PT0gbnVsbCB8fCBsb2NhbGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxvY2FsZS5yZWdpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b0xvd2VyQ2FzZSgpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcbiAgICAgICAgY29uc3QgcHJpbWFyeSA9IHRyYW5zbGF0aW9ucy5nZXQoYCR7bGFuZ3VhZ2V9LSR7cmVnaW9ufWApO1xuICAgICAgICBjb25zdCBzZWNvbmRhcnkgPSB0cmFuc2xhdGlvbnMuZ2V0KGxhbmd1YWdlKTtcbiAgICAgICAgcmV0dXJuIHsgbG9jYWxlLCBsYW5ndWFnZSwgcmVnaW9uLCBwcmltYXJ5LCBzZWNvbmRhcnkgfTtcbiAgICB9XG4gICAgZXhpc3RzKGtleSwgb3B0aW9ucykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHsgcHJpbWFyeSwgc2Vjb25kYXJ5IH0gPSB0aGlzLmdldFRyYW5zbGF0aW9uRGF0YSgoX2EgPSBvcHRpb25zLmxhbmcpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMubGFuZygpKTtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyBpbmNsdWRlRmFsbGJhY2s6IGZhbHNlIH0sIG9wdGlvbnMpO1xuICAgICAgICBpZiAoKHByaW1hcnkgJiYgcHJpbWFyeVtrZXldKSB8fFxuICAgICAgICAgICAgKHNlY29uZGFyeSAmJiBzZWNvbmRhcnlba2V5XSkgfHxcbiAgICAgICAgICAgIChvcHRpb25zLmluY2x1ZGVGYWxsYmFjayAmJiBmYWxsYmFjayAmJiBmYWxsYmFja1trZXldKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0ZXJtKGtleSwgLi4uYXJncykge1xuICAgICAgICBjb25zdCB7IHByaW1hcnksIHNlY29uZGFyeSB9ID0gdGhpcy5nZXRUcmFuc2xhdGlvbkRhdGEodGhpcy5sYW5nKCkpO1xuICAgICAgICBsZXQgdGVybTtcbiAgICAgICAgaWYgKHByaW1hcnkgJiYgcHJpbWFyeVtrZXldKSB7XG4gICAgICAgICAgICB0ZXJtID0gcHJpbWFyeVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlY29uZGFyeSAmJiBzZWNvbmRhcnlba2V5XSkge1xuICAgICAgICAgICAgdGVybSA9IHNlY29uZGFyeVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZhbGxiYWNrICYmIGZhbGxiYWNrW2tleV0pIHtcbiAgICAgICAgICAgIHRlcm0gPSBmYWxsYmFja1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTm8gdHJhbnNsYXRpb24gZm91bmQgZm9yOiAke1N0cmluZyhrZXkpfWApO1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGVybSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRlcm0oLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRlcm07XG4gICAgfVxuICAgIGRhdGUoZGF0ZVRvRm9ybWF0LCBvcHRpb25zKSB7XG4gICAgICAgIGRhdGVUb0Zvcm1hdCA9IG5ldyBEYXRlKGRhdGVUb0Zvcm1hdCk7XG4gICAgICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxhbmcoKSwgb3B0aW9ucykuZm9ybWF0KGRhdGVUb0Zvcm1hdCk7XG4gICAgfVxuICAgIG51bWJlcihudW1iZXJUb0Zvcm1hdCwgb3B0aW9ucykge1xuICAgICAgICBudW1iZXJUb0Zvcm1hdCA9IE51bWJlcihudW1iZXJUb0Zvcm1hdCk7XG4gICAgICAgIHJldHVybiBpc05hTihudW1iZXJUb0Zvcm1hdCkgPyAnJyA6IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxhbmcoKSwgb3B0aW9ucykuZm9ybWF0KG51bWJlclRvRm9ybWF0KTtcbiAgICB9XG4gICAgcmVsYXRpdmVUaW1lKHZhbHVlLCB1bml0LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW50bC5SZWxhdGl2ZVRpbWVGb3JtYXQodGhpcy5sYW5nKCksIG9wdGlvbnMpLmZvcm1hdCh2YWx1ZSwgdW5pdCk7XG4gICAgfVxufVxuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL3RyYW5zbGF0aW9ucy9lbi50c1xuaW1wb3J0IHsgcmVnaXN0ZXJUcmFuc2xhdGlvbiB9IGZyb20gXCJAc2hvZWxhY2Utc3R5bGUvbG9jYWxpemVcIjtcbnZhciB0cmFuc2xhdGlvbiA9IHtcbiAgJGNvZGU6IFwiZW5cIixcbiAgJG5hbWU6IFwiRW5nbGlzaFwiLFxuICAkZGlyOiBcImx0clwiLFxuICBjYXJvdXNlbDogXCJDYXJvdXNlbFwiLFxuICBjbGVhckVudHJ5OiBcIkNsZWFyIGVudHJ5XCIsXG4gIGNsb3NlOiBcIkNsb3NlXCIsXG4gIGNvcGllZDogXCJDb3BpZWRcIixcbiAgY29weTogXCJDb3B5XCIsXG4gIGN1cnJlbnRWYWx1ZTogXCJDdXJyZW50IHZhbHVlXCIsXG4gIGRyb3BGaWxlSGVyZTogXCJEcm9wIGZpbGUgaGVyZSBvciBjbGljayB0byBicm93c2VcIixcbiAgZGVjcmVtZW50OiBcIkRlY3JlbWVudFwiLFxuICBkcm9wRmlsZXNIZXJlOiBcIkRyb3AgZmlsZXMgaGVyZSBvciBjbGljayB0byBicm93c2VcIixcbiAgZXJyb3I6IFwiRXJyb3JcIixcbiAgZ29Ub1NsaWRlOiAoc2xpZGUsIGNvdW50KSA9PiBgR28gdG8gc2xpZGUgJHtzbGlkZX0gb2YgJHtjb3VudH1gLFxuICBoaWRlUGFzc3dvcmQ6IFwiSGlkZSBwYXNzd29yZFwiLFxuICBpbmNyZW1lbnQ6IFwiSW5jcmVtZW50XCIsXG4gIGxvYWRpbmc6IFwiTG9hZGluZ1wiLFxuICBuZXh0U2xpZGU6IFwiTmV4dCBzbGlkZVwiLFxuICBudW1PcHRpb25zU2VsZWN0ZWQ6IChudW0pID0+IHtcbiAgICBpZiAobnVtID09PSAwKSByZXR1cm4gXCJObyBvcHRpb25zIHNlbGVjdGVkXCI7XG4gICAgaWYgKG51bSA9PT0gMSkgcmV0dXJuIFwiMSBvcHRpb24gc2VsZWN0ZWRcIjtcbiAgICByZXR1cm4gYCR7bnVtfSBvcHRpb25zIHNlbGVjdGVkYDtcbiAgfSxcbiAgcGF1c2VBbmltYXRpb246IFwiUGF1c2UgYW5pbWF0aW9uXCIsXG4gIHBsYXlBbmltYXRpb246IFwiUGxheSBhbmltYXRpb25cIixcbiAgcHJldmlvdXNTbGlkZTogXCJQcmV2aW91cyBzbGlkZVwiLFxuICBwcm9ncmVzczogXCJQcm9ncmVzc1wiLFxuICByZW1vdmU6IFwiUmVtb3ZlXCIsXG4gIHJlc2l6ZTogXCJSZXNpemVcIixcbiAgc2Nyb2xsYWJsZVJlZ2lvbjogXCJTY3JvbGxhYmxlIHJlZ2lvblwiLFxuICBzY3JvbGxUb0VuZDogXCJTY3JvbGwgdG8gZW5kXCIsXG4gIHNjcm9sbFRvU3RhcnQ6IFwiU2Nyb2xsIHRvIHN0YXJ0XCIsXG4gIHNlbGVjdEFDb2xvckZyb21UaGVTY3JlZW46IFwiU2VsZWN0IGEgY29sb3IgZnJvbSB0aGUgc2NyZWVuXCIsXG4gIHNob3dQYXNzd29yZDogXCJTaG93IHBhc3N3b3JkXCIsXG4gIHNsaWRlTnVtOiAoc2xpZGUpID0+IGBTbGlkZSAke3NsaWRlfWAsXG4gIHRvZ2dsZUNvbG9yRm9ybWF0OiBcIlRvZ2dsZSBjb2xvciBmb3JtYXRcIixcbiAgem9vbUluOiBcIlpvb20gaW5cIixcbiAgem9vbU91dDogXCJab29tIG91dFwiXG59O1xucmVnaXN0ZXJUcmFuc2xhdGlvbih0cmFuc2xhdGlvbik7XG52YXIgZW5fZGVmYXVsdCA9IHRyYW5zbGF0aW9uO1xuXG5leHBvcnQge1xuICBlbl9kZWZhdWx0XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cbmltcG9ydCB7XG4gIGVuX2RlZmF1bHRcbn0gZnJvbSBcIi4vY2h1bmsuNzJXSk5ENVguanNcIjtcblxuLy8gc3JjL3V0aWxpdGllcy9sb2NhbGl6ZS50c1xuaW1wb3J0IHsgTG9jYWxpemVDb250cm9sbGVyIGFzIERlZmF1bHRMb2NhbGl6YXRpb25Db250cm9sbGVyLCByZWdpc3RlclRyYW5zbGF0aW9uIH0gZnJvbSBcIkBzaG9lbGFjZS1zdHlsZS9sb2NhbGl6ZVwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJUcmFuc2xhdGlvbiBhcyByZWdpc3RlclRyYW5zbGF0aW9uMiB9IGZyb20gXCJAc2hvZWxhY2Utc3R5bGUvbG9jYWxpemVcIjtcbnZhciBMb2NhbGl6ZUNvbnRyb2xsZXIgPSBjbGFzcyBleHRlbmRzIERlZmF1bHRMb2NhbGl6YXRpb25Db250cm9sbGVyIHtcbn07XG5yZWdpc3RlclRyYW5zbGF0aW9uKGVuX2RlZmF1bHQpO1xuXG5leHBvcnQge1xuICBMb2NhbGl6ZUNvbnRyb2xsZXIsXG4gIHJlZ2lzdGVyVHJhbnNsYXRpb24yIGFzIHJlZ2lzdGVyVHJhbnNsYXRpb25cbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvc3R5bGVzL2NvbXBvbmVudC92YXJpYW50cy5zdHlsZXMudHNcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJsaXRcIjtcbnZhciB2YXJpYW50c19zdHlsZXNfZGVmYXVsdCA9IGNzc2BcbiAgOndoZXJlKDpyb290KSxcbiAgLndhLW5ldXRyYWwsXG4gIDpob3N0KFt2YXJpYW50PSduZXV0cmFsJ10pIHtcbiAgICAtLXdhLWNvbG9yLWZpbGwtbG91ZDogdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLWxvdWQpO1xuICAgIC0td2EtY29sb3ItZmlsbC1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1ub3JtYWwpO1xuICAgIC0td2EtY29sb3ItZmlsbC1xdWlldDogdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLXF1aWV0KTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1sb3VkOiB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWJvcmRlci1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtYm9yZGVyLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItcXVpZXQ6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtYm9yZGVyLXF1aWV0KTtcbiAgICAtLXdhLWNvbG9yLW9uLWxvdWQ6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbG91ZCk7XG4gICAgLS13YS1jb2xvci1vbi1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLW9uLXF1aWV0OiB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLXF1aWV0KTtcbiAgfVxuXG4gIC53YS1icmFuZCxcbiAgOmhvc3QoW3ZhcmlhbnQ9J2JyYW5kJ10pIHtcbiAgICAtLXdhLWNvbG9yLWZpbGwtbG91ZDogdmFyKC0td2EtY29sb3ItYnJhbmQtZmlsbC1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLWZpbGwtbm9ybWFsOiB2YXIoLS13YS1jb2xvci1icmFuZC1maWxsLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1maWxsLXF1aWV0OiB2YXIoLS13YS1jb2xvci1icmFuZC1maWxsLXF1aWV0KTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1sb3VkOiB2YXIoLS13YS1jb2xvci1icmFuZC1ib3JkZXItbG91ZCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItbm9ybWFsOiB2YXIoLS13YS1jb2xvci1icmFuZC1ib3JkZXItbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1xdWlldDogdmFyKC0td2EtY29sb3ItYnJhbmQtYm9yZGVyLXF1aWV0KTtcbiAgICAtLXdhLWNvbG9yLW9uLWxvdWQ6IHZhcigtLXdhLWNvbG9yLWJyYW5kLW9uLWxvdWQpO1xuICAgIC0td2EtY29sb3Itb24tbm9ybWFsOiB2YXIoLS13YS1jb2xvci1icmFuZC1vbi1ub3JtYWwpO1xuICAgIC0td2EtY29sb3Itb24tcXVpZXQ6IHZhcigtLXdhLWNvbG9yLWJyYW5kLW9uLXF1aWV0KTtcbiAgfVxuXG4gIC53YS1zdWNjZXNzLFxuICA6aG9zdChbdmFyaWFudD0nc3VjY2VzcyddKSB7XG4gICAgLS13YS1jb2xvci1maWxsLWxvdWQ6IHZhcigtLXdhLWNvbG9yLXN1Y2Nlc3MtZmlsbC1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLWZpbGwtbm9ybWFsOiB2YXIoLS13YS1jb2xvci1zdWNjZXNzLWZpbGwtbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLWZpbGwtcXVpZXQ6IHZhcigtLXdhLWNvbG9yLXN1Y2Nlc3MtZmlsbC1xdWlldCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItbG91ZDogdmFyKC0td2EtY29sb3Itc3VjY2Vzcy1ib3JkZXItbG91ZCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItbm9ybWFsOiB2YXIoLS13YS1jb2xvci1zdWNjZXNzLWJvcmRlci1ub3JtYWwpO1xuICAgIC0td2EtY29sb3ItYm9yZGVyLXF1aWV0OiB2YXIoLS13YS1jb2xvci1zdWNjZXNzLWJvcmRlci1xdWlldCk7XG4gICAgLS13YS1jb2xvci1vbi1sb3VkOiB2YXIoLS13YS1jb2xvci1zdWNjZXNzLW9uLWxvdWQpO1xuICAgIC0td2EtY29sb3Itb24tbm9ybWFsOiB2YXIoLS13YS1jb2xvci1zdWNjZXNzLW9uLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1vbi1xdWlldDogdmFyKC0td2EtY29sb3Itc3VjY2Vzcy1vbi1xdWlldCk7XG4gIH1cblxuICAud2Etd2FybmluZyxcbiAgOmhvc3QoW3ZhcmlhbnQ9J3dhcm5pbmcnXSkge1xuICAgIC0td2EtY29sb3ItZmlsbC1sb3VkOiB2YXIoLS13YS1jb2xvci13YXJuaW5nLWZpbGwtbG91ZCk7XG4gICAgLS13YS1jb2xvci1maWxsLW5vcm1hbDogdmFyKC0td2EtY29sb3Itd2FybmluZy1maWxsLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1maWxsLXF1aWV0OiB2YXIoLS13YS1jb2xvci13YXJuaW5nLWZpbGwtcXVpZXQpO1xuICAgIC0td2EtY29sb3ItYm9yZGVyLWxvdWQ6IHZhcigtLXdhLWNvbG9yLXdhcm5pbmctYm9yZGVyLWxvdWQpO1xuICAgIC0td2EtY29sb3ItYm9yZGVyLW5vcm1hbDogdmFyKC0td2EtY29sb3Itd2FybmluZy1ib3JkZXItbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1xdWlldDogdmFyKC0td2EtY29sb3Itd2FybmluZy1ib3JkZXItcXVpZXQpO1xuICAgIC0td2EtY29sb3Itb24tbG91ZDogdmFyKC0td2EtY29sb3Itd2FybmluZy1vbi1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLW9uLW5vcm1hbDogdmFyKC0td2EtY29sb3Itd2FybmluZy1vbi1ub3JtYWwpO1xuICAgIC0td2EtY29sb3Itb24tcXVpZXQ6IHZhcigtLXdhLWNvbG9yLXdhcm5pbmctb24tcXVpZXQpO1xuICB9XG5cbiAgLndhLWRhbmdlcixcbiAgOmhvc3QoW3ZhcmlhbnQ9J2RhbmdlciddKSB7XG4gICAgLS13YS1jb2xvci1maWxsLWxvdWQ6IHZhcigtLXdhLWNvbG9yLWRhbmdlci1maWxsLWxvdWQpO1xuICAgIC0td2EtY29sb3ItZmlsbC1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLWRhbmdlci1maWxsLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1maWxsLXF1aWV0OiB2YXIoLS13YS1jb2xvci1kYW5nZXItZmlsbC1xdWlldCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItbG91ZDogdmFyKC0td2EtY29sb3ItZGFuZ2VyLWJvcmRlci1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLWRhbmdlci1ib3JkZXItbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1xdWlldDogdmFyKC0td2EtY29sb3ItZGFuZ2VyLWJvcmRlci1xdWlldCk7XG4gICAgLS13YS1jb2xvci1vbi1sb3VkOiB2YXIoLS13YS1jb2xvci1kYW5nZXItb24tbG91ZCk7XG4gICAgLS13YS1jb2xvci1vbi1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLWRhbmdlci1vbi1ub3JtYWwpO1xuICAgIC0td2EtY29sb3Itb24tcXVpZXQ6IHZhcigtLXdhLWNvbG9yLWRhbmdlci1vbi1xdWlldCk7XG4gIH1cbmA7XG5cbmV4cG9ydCB7XG4gIHZhcmlhbnRzX3N0eWxlc19kZWZhdWx0XG59O1xuIiwgIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuXG5pbXBvcnQge0Rpc2Nvbm5lY3RhYmxlLCBQYXJ0fSBmcm9tICcuL2xpdC1odG1sLmpzJztcblxuZXhwb3J0IHtcbiAgQXR0cmlidXRlUGFydCxcbiAgQm9vbGVhbkF0dHJpYnV0ZVBhcnQsXG4gIENoaWxkUGFydCxcbiAgRWxlbWVudFBhcnQsXG4gIEV2ZW50UGFydCxcbiAgUGFydCxcbiAgUHJvcGVydHlQYXJ0LFxufSBmcm9tICcuL2xpdC1odG1sLmpzJztcblxuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RpdmVDbGFzcyB7XG4gIG5ldyAocGFydDogUGFydEluZm8pOiBEaXJlY3RpdmU7XG59XG5cbi8qKlxuICogVGhpcyB1dGlsaXR5IHR5cGUgZXh0cmFjdHMgdGhlIHNpZ25hdHVyZSBvZiBhIGRpcmVjdGl2ZSBjbGFzcydzIHJlbmRlcigpXG4gKiBtZXRob2Qgc28gd2UgY2FuIHVzZSBpdCBmb3IgdGhlIHR5cGUgb2YgdGhlIGdlbmVyYXRlZCBkaXJlY3RpdmUgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCB0eXBlIERpcmVjdGl2ZVBhcmFtZXRlcnM8QyBleHRlbmRzIERpcmVjdGl2ZT4gPSBQYXJhbWV0ZXJzPENbJ3JlbmRlciddPjtcblxuLyoqXG4gKiBBIGdlbmVyYXRlZCBkaXJlY3RpdmUgZnVuY3Rpb24gZG9lc24ndCBldmFsdWF0ZSB0aGUgZGlyZWN0aXZlLCBidXQganVzdFxuICogcmV0dXJucyBhIERpcmVjdGl2ZVJlc3VsdCBvYmplY3QgdGhhdCBjYXB0dXJlcyB0aGUgYXJndW1lbnRzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERpcmVjdGl2ZVJlc3VsdDxDIGV4dGVuZHMgRGlyZWN0aXZlQ2xhc3MgPSBEaXJlY3RpdmVDbGFzcz4ge1xuICAvKipcbiAgICogVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBbJ18kbGl0RGlyZWN0aXZlJCddOiBDO1xuICAvKiogQGludGVybmFsICovXG4gIHZhbHVlczogRGlyZWN0aXZlUGFyYW1ldGVyczxJbnN0YW5jZVR5cGU8Qz4+O1xufVxuXG5leHBvcnQgY29uc3QgUGFydFR5cGUgPSB7XG4gIEFUVFJJQlVURTogMSxcbiAgQ0hJTEQ6IDIsXG4gIFBST1BFUlRZOiAzLFxuICBCT09MRUFOX0FUVFJJQlVURTogNCxcbiAgRVZFTlQ6IDUsXG4gIEVMRU1FTlQ6IDYsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBQYXJ0VHlwZSA9ICh0eXBlb2YgUGFydFR5cGUpW2tleW9mIHR5cGVvZiBQYXJ0VHlwZV07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hpbGRQYXJ0SW5mbyB7XG4gIHJlYWRvbmx5IHR5cGU6IHR5cGVvZiBQYXJ0VHlwZS5DSElMRDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBdHRyaWJ1dGVQYXJ0SW5mbyB7XG4gIHJlYWRvbmx5IHR5cGU6XG4gICAgfCB0eXBlb2YgUGFydFR5cGUuQVRUUklCVVRFXG4gICAgfCB0eXBlb2YgUGFydFR5cGUuUFJPUEVSVFlcbiAgICB8IHR5cGVvZiBQYXJ0VHlwZS5CT09MRUFOX0FUVFJJQlVURVxuICAgIHwgdHlwZW9mIFBhcnRUeXBlLkVWRU5UO1xuICByZWFkb25seSBzdHJpbmdzPzogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xuICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHRhZ05hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbGVtZW50UGFydEluZm8ge1xuICByZWFkb25seSB0eXBlOiB0eXBlb2YgUGFydFR5cGUuRUxFTUVOVDtcbn1cblxuLyoqXG4gKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgcGFydCBhIGRpcmVjdGl2ZSBpcyBib3VuZCB0by5cbiAqXG4gKiBUaGlzIGlzIHVzZWZ1bCBmb3IgY2hlY2tpbmcgdGhhdCBhIGRpcmVjdGl2ZSBpcyBhdHRhY2hlZCB0byBhIHZhbGlkIHBhcnQsXG4gKiBzdWNoIGFzIHdpdGggZGlyZWN0aXZlIHRoYXQgY2FuIG9ubHkgYmUgdXNlZCBvbiBhdHRyaWJ1dGUgYmluZGluZ3MuXG4gKi9cbmV4cG9ydCB0eXBlIFBhcnRJbmZvID0gQ2hpbGRQYXJ0SW5mbyB8IEF0dHJpYnV0ZVBhcnRJbmZvIHwgRWxlbWVudFBhcnRJbmZvO1xuXG4vKipcbiAqIENyZWF0ZXMgYSB1c2VyLWZhY2luZyBkaXJlY3RpdmUgZnVuY3Rpb24gZnJvbSBhIERpcmVjdGl2ZSBjbGFzcy4gVGhpc1xuICogZnVuY3Rpb24gaGFzIHRoZSBzYW1lIHBhcmFtZXRlcnMgYXMgdGhlIGRpcmVjdGl2ZSdzIHJlbmRlcigpIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRpcmVjdGl2ZSA9XG4gIDxDIGV4dGVuZHMgRGlyZWN0aXZlQ2xhc3M+KGM6IEMpID0+XG4gICguLi52YWx1ZXM6IERpcmVjdGl2ZVBhcmFtZXRlcnM8SW5zdGFuY2VUeXBlPEM+Pik6IERpcmVjdGl2ZVJlc3VsdDxDPiA9PiAoe1xuICAgIC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gICAgWydfJGxpdERpcmVjdGl2ZSQnXTogYyxcbiAgICB2YWx1ZXMsXG4gIH0pO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGNyZWF0aW5nIGN1c3RvbSBkaXJlY3RpdmVzLiBVc2VycyBzaG91bGQgZXh0ZW5kIHRoaXMgY2xhc3MsXG4gKiBpbXBsZW1lbnQgYHJlbmRlcmAgYW5kL29yIGB1cGRhdGVgLCBhbmQgdGhlbiBwYXNzIHRoZWlyIHN1YmNsYXNzIHRvXG4gKiBgZGlyZWN0aXZlYC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERpcmVjdGl2ZSBpbXBsZW1lbnRzIERpc2Nvbm5lY3RhYmxlIHtcbiAgLy9AaW50ZXJuYWxcbiAgX19wYXJ0ITogUGFydDtcbiAgLy9AaW50ZXJuYWxcbiAgX19hdHRyaWJ1dGVJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAvL0BpbnRlcm5hbFxuICBfX2RpcmVjdGl2ZT86IERpcmVjdGl2ZTtcblxuICAvL0BpbnRlcm5hbFxuICBfJHBhcmVudCE6IERpc2Nvbm5lY3RhYmxlO1xuXG4gIC8vIFRoZXNlIHdpbGwgb25seSBleGlzdCBvbiB0aGUgQXN5bmNEaXJlY3RpdmUgc3ViY2xhc3NcbiAgLy9AaW50ZXJuYWxcbiAgXyRkaXNjb25uZWN0YWJsZUNoaWxkcmVuPzogU2V0PERpc2Nvbm5lY3RhYmxlPjtcbiAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgLy9AaW50ZXJuYWxcbiAgWydfJG5vdGlmeURpcmVjdGl2ZUNvbm5lY3Rpb25DaGFuZ2VkJ10/KGlzQ29ubmVjdGVkOiBib29sZWFuKTogdm9pZDtcblxuICBjb25zdHJ1Y3RvcihfcGFydEluZm86IFBhcnRJbmZvKSB7fVxuXG4gIC8vIFNlZSBjb21tZW50IGluIERpc2Nvbm5lY3RhYmxlIGludGVyZmFjZSBmb3Igd2h5IHRoaXMgaXMgYSBnZXR0ZXJcbiAgZ2V0IF8kaXNDb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuXyRwYXJlbnQuXyRpc0Nvbm5lY3RlZDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRpbml0aWFsaXplKFxuICAgIHBhcnQ6IFBhcnQsXG4gICAgcGFyZW50OiBEaXNjb25uZWN0YWJsZSxcbiAgICBhdHRyaWJ1dGVJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHRoaXMuX19wYXJ0ID0gcGFydDtcbiAgICB0aGlzLl8kcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX19hdHRyaWJ1dGVJbmRleCA9IGF0dHJpYnV0ZUluZGV4O1xuICB9XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRyZXNvbHZlKHBhcnQ6IFBhcnQsIHByb3BzOiBBcnJheTx1bmtub3duPik6IHVua25vd24ge1xuICAgIHJldHVybiB0aGlzLnVwZGF0ZShwYXJ0LCBwcm9wcyk7XG4gIH1cblxuICBhYnN0cmFjdCByZW5kZXIoLi4ucHJvcHM6IEFycmF5PHVua25vd24+KTogdW5rbm93bjtcblxuICB1cGRhdGUoX3BhcnQ6IFBhcnQsIHByb3BzOiBBcnJheTx1bmtub3duPik6IHVua25vd24ge1xuICAgIHJldHVybiB0aGlzLnJlbmRlciguLi5wcm9wcyk7XG4gIH1cbn1cbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuaW1wb3J0IHtBdHRyaWJ1dGVQYXJ0LCBub0NoYW5nZX0gZnJvbSAnLi4vbGl0LWh0bWwuanMnO1xuaW1wb3J0IHtcbiAgZGlyZWN0aXZlLFxuICBEaXJlY3RpdmUsXG4gIERpcmVjdGl2ZVBhcmFtZXRlcnMsXG4gIFBhcnRJbmZvLFxuICBQYXJ0VHlwZSxcbn0gZnJvbSAnLi4vZGlyZWN0aXZlLmpzJztcblxuLyoqXG4gKiBBIGtleS12YWx1ZSBzZXQgb2YgY2xhc3MgbmFtZXMgdG8gdHJ1dGh5IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDbGFzc0luZm8ge1xuICBbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlcjtcbn1cblxuY2xhc3MgQ2xhc3NNYXBEaXJlY3RpdmUgZXh0ZW5kcyBEaXJlY3RpdmUge1xuICAvKipcbiAgICogU3RvcmVzIHRoZSBDbGFzc0luZm8gb2JqZWN0IGFwcGxpZWQgdG8gYSBnaXZlbiBBdHRyaWJ1dGVQYXJ0LlxuICAgKiBVc2VkIHRvIHVuc2V0IGV4aXN0aW5nIHZhbHVlcyB3aGVuIGEgbmV3IENsYXNzSW5mbyBvYmplY3QgaXMgYXBwbGllZC5cbiAgICovXG4gIHByaXZhdGUgX3ByZXZpb3VzQ2xhc3Nlcz86IFNldDxzdHJpbmc+O1xuICBwcml2YXRlIF9zdGF0aWNDbGFzc2VzPzogU2V0PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IocGFydEluZm86IFBhcnRJbmZvKSB7XG4gICAgc3VwZXIocGFydEluZm8pO1xuICAgIGlmIChcbiAgICAgIHBhcnRJbmZvLnR5cGUgIT09IFBhcnRUeXBlLkFUVFJJQlVURSB8fFxuICAgICAgcGFydEluZm8ubmFtZSAhPT0gJ2NsYXNzJyB8fFxuICAgICAgKHBhcnRJbmZvLnN0cmluZ3M/Lmxlbmd0aCBhcyBudW1iZXIpID4gMlxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYGNsYXNzTWFwKClgIGNhbiBvbmx5IGJlIHVzZWQgaW4gdGhlIGBjbGFzc2AgYXR0cmlidXRlICcgK1xuICAgICAgICAgICdhbmQgbXVzdCBiZSB0aGUgb25seSBwYXJ0IGluIHRoZSBhdHRyaWJ1dGUuJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoY2xhc3NJbmZvOiBDbGFzc0luZm8pIHtcbiAgICAvLyBBZGQgc3BhY2VzIHRvIGVuc3VyZSBzZXBhcmF0aW9uIGZyb20gc3RhdGljIGNsYXNzZXNcbiAgICByZXR1cm4gKFxuICAgICAgJyAnICtcbiAgICAgIE9iamVjdC5rZXlzKGNsYXNzSW5mbylcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBjbGFzc0luZm9ba2V5XSlcbiAgICAgICAgLmpvaW4oJyAnKSArXG4gICAgICAnICdcbiAgICApO1xuICB9XG5cbiAgb3ZlcnJpZGUgdXBkYXRlKHBhcnQ6IEF0dHJpYnV0ZVBhcnQsIFtjbGFzc0luZm9dOiBEaXJlY3RpdmVQYXJhbWV0ZXJzPHRoaXM+KSB7XG4gICAgLy8gUmVtZW1iZXIgZHluYW1pYyBjbGFzc2VzIG9uIHRoZSBmaXJzdCByZW5kZXJcbiAgICBpZiAodGhpcy5fcHJldmlvdXNDbGFzc2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3ByZXZpb3VzQ2xhc3NlcyA9IG5ldyBTZXQoKTtcbiAgICAgIGlmIChwYXJ0LnN0cmluZ3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9zdGF0aWNDbGFzc2VzID0gbmV3IFNldChcbiAgICAgICAgICBwYXJ0LnN0cmluZ3NcbiAgICAgICAgICAgIC5qb2luKCcgJylcbiAgICAgICAgICAgIC5zcGxpdCgvXFxzLylcbiAgICAgICAgICAgIC5maWx0ZXIoKHMpID0+IHMgIT09ICcnKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBuYW1lIGluIGNsYXNzSW5mbykge1xuICAgICAgICBpZiAoY2xhc3NJbmZvW25hbWVdICYmICF0aGlzLl9zdGF0aWNDbGFzc2VzPy5oYXMobmFtZSkpIHtcbiAgICAgICAgICB0aGlzLl9wcmV2aW91c0NsYXNzZXMuYWRkKG5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXIoY2xhc3NJbmZvKTtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc0xpc3QgPSBwYXJ0LmVsZW1lbnQuY2xhc3NMaXN0O1xuXG4gICAgLy8gUmVtb3ZlIG9sZCBjbGFzc2VzIHRoYXQgbm8gbG9uZ2VyIGFwcGx5XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMuX3ByZXZpb3VzQ2xhc3Nlcykge1xuICAgICAgaWYgKCEobmFtZSBpbiBjbGFzc0luZm8pKSB7XG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzQ2xhc3NlcyEuZGVsZXRlKG5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBvciByZW1vdmUgY2xhc3NlcyBiYXNlZCBvbiB0aGVpciBjbGFzc01hcCB2YWx1ZVxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBjbGFzc0luZm8pIHtcbiAgICAgIC8vIFdlIGV4cGxpY2l0bHkgd2FudCBhIGxvb3NlIHRydXRoeSBjaGVjayBvZiBgdmFsdWVgIGJlY2F1c2UgaXQgc2VlbXNcbiAgICAgIC8vIG1vcmUgY29udmVuaWVudCB0aGF0ICcnIGFuZCAwIGFyZSBza2lwcGVkLlxuICAgICAgY29uc3QgdmFsdWUgPSAhIWNsYXNzSW5mb1tuYW1lXTtcbiAgICAgIGlmIChcbiAgICAgICAgdmFsdWUgIT09IHRoaXMuX3ByZXZpb3VzQ2xhc3Nlcy5oYXMobmFtZSkgJiZcbiAgICAgICAgIXRoaXMuX3N0YXRpY0NsYXNzZXM/LmhhcyhuYW1lKVxuICAgICAgKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgICAgICAgdGhpcy5fcHJldmlvdXNDbGFzc2VzLmFkZChuYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgICAgICAgIHRoaXMuX3ByZXZpb3VzQ2xhc3Nlcy5kZWxldGUobmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vQ2hhbmdlO1xuICB9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBhcHBsaWVzIGR5bmFtaWMgQ1NTIGNsYXNzZXMuXG4gKlxuICogVGhpcyBtdXN0IGJlIHVzZWQgaW4gdGhlIGBjbGFzc2AgYXR0cmlidXRlIGFuZCBtdXN0IGJlIHRoZSBvbmx5IHBhcnQgdXNlZCBpblxuICogdGhlIGF0dHJpYnV0ZS4gSXQgdGFrZXMgZWFjaCBwcm9wZXJ0eSBpbiB0aGUgYGNsYXNzSW5mb2AgYXJndW1lbnQgYW5kIGFkZHNcbiAqIHRoZSBwcm9wZXJ0eSBuYW1lIHRvIHRoZSBlbGVtZW50J3MgYGNsYXNzTGlzdGAgaWYgdGhlIHByb3BlcnR5IHZhbHVlIGlzXG4gKiB0cnV0aHk7IGlmIHRoZSBwcm9wZXJ0eSB2YWx1ZSBpcyBmYWxzeSwgdGhlIHByb3BlcnR5IG5hbWUgaXMgcmVtb3ZlZCBmcm9tXG4gKiB0aGUgZWxlbWVudCdzIGBjbGFzc2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYHtmb286IGJhcn1gIGFwcGxpZXMgdGhlIGNsYXNzIGBmb29gIGlmIHRoZSB2YWx1ZSBvZiBgYmFyYCBpc1xuICogdHJ1dGh5LlxuICpcbiAqIEBwYXJhbSBjbGFzc0luZm9cbiAqL1xuZXhwb3J0IGNvbnN0IGNsYXNzTWFwID0gZGlyZWN0aXZlKENsYXNzTWFwRGlyZWN0aXZlKTtcblxuLyoqXG4gKiBUaGUgdHlwZSBvZiB0aGUgY2xhc3MgdGhhdCBwb3dlcnMgdGhpcyBkaXJlY3RpdmUuIE5lY2Vzc2FyeSBmb3IgbmFtaW5nIHRoZVxuICogZGlyZWN0aXZlJ3MgcmV0dXJuIHR5cGUuXG4gKi9cbmV4cG9ydCB0eXBlIHtDbGFzc01hcERpcmVjdGl2ZX07XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbmltcG9ydCB7bm90aGluZ30gZnJvbSAnLi4vbGl0LWh0bWwuanMnO1xuXG4vKipcbiAqIEZvciBBdHRyaWJ1dGVQYXJ0cywgc2V0cyB0aGUgYXR0cmlidXRlIGlmIHRoZSB2YWx1ZSBpcyBkZWZpbmVkIGFuZCByZW1vdmVzXG4gKiB0aGUgYXR0cmlidXRlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gKlxuICogRm9yIG90aGVyIHBhcnQgdHlwZXMsIHRoaXMgZGlyZWN0aXZlIGlzIGEgbm8tb3AuXG4gKi9cbmV4cG9ydCBjb25zdCBpZkRlZmluZWQgPSA8VD4odmFsdWU6IFQpID0+IHZhbHVlID8/IG5vdGhpbmc7XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8vIEFueSBuZXcgZXhwb3J0cyBuZWVkIHRvIGJlIGFkZGVkIHRvIHRoZSBleHBvcnQgc3RhdGVtZW50IGluXG4vLyBgcGFja2FnZXMvbGl0L3NyYy9pbmRleC5hbGwudHNgLlxuXG5pbXBvcnQge1xuICBodG1sIGFzIGNvcmVIdG1sLFxuICBzdmcgYXMgY29yZVN2ZyxcbiAgbWF0aG1sIGFzIGNvcmVNYXRobWwsXG4gIFRlbXBsYXRlUmVzdWx0LFxufSBmcm9tICcuL2xpdC1odG1sLmpzJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0aWNWYWx1ZSB7XG4gIC8qKiBUaGUgdmFsdWUgdG8gaW50ZXJwb2xhdGUgYXMtaXMgaW50byB0aGUgdGVtcGxhdGUuICovXG4gIF8kbGl0U3RhdGljJDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHRoYXQgY2FuJ3QgYmUgZGVjb2RlZCBmcm9tIG9yZGluYXJ5IEpTT04sIG1ha2UgaXQgaGFyZGVyIGZvclxuICAgKiBhbiBhdHRhY2tlci1jb250cm9sbGVkIGRhdGEgdGhhdCBnb2VzIHRocm91Z2ggSlNPTi5wYXJzZSB0byBwcm9kdWNlIGEgdmFsaWRcbiAgICogU3RhdGljVmFsdWUuXG4gICAqL1xuICByOiB0eXBlb2YgYnJhbmQ7XG59XG5cbi8qKlxuICogUHJldmVudHMgSlNPTiBpbmplY3Rpb24gYXR0YWNrcy5cbiAqXG4gKiBUaGUgZ29hbHMgb2YgdGhpcyBicmFuZDpcbiAqICAgMSkgZmFzdCB0byBjaGVja1xuICogICAyKSBjb2RlIGlzIHNtYWxsIG9uIHRoZSB3aXJlXG4gKiAgIDMpIG11bHRpcGxlIHZlcnNpb25zIG9mIExpdCBpbiBhIHNpbmdsZSBwYWdlIHdpbGwgYWxsIHByb2R1Y2UgbXV0dWFsbHlcbiAqICAgICAgaW50ZXJvcGVyYWJsZSBTdGF0aWNWYWx1ZXNcbiAqICAgNCkgbm9ybWFsIEpTT04ucGFyc2UgKHdpdGhvdXQgYW4gdW51c3VhbCByZXZpdmVyKSBjYW4gbm90IHByb2R1Y2UgYVxuICogICAgICBTdGF0aWNWYWx1ZVxuICpcbiAqIFN5bWJvbHMgc2F0aXNmeSAoMSksICgyKSwgYW5kICg0KS4gV2UgdXNlIFN5bWJvbC5mb3IgdG8gc2F0aXNmeSAoMyksIGJ1dFxuICogd2UgZG9uJ3QgY2FyZSBhYm91dCB0aGUga2V5LCBzbyB3ZSBicmVhayB0aWVzIHZpYSAoMikgYW5kIHVzZSB0aGUgZW1wdHlcbiAqIHN0cmluZy5cbiAqL1xuY29uc3QgYnJhbmQgPSBTeW1ib2wuZm9yKCcnKTtcblxuLyoqIFNhZmVseSBleHRyYWN0cyB0aGUgc3RyaW5nIHBhcnQgb2YgYSBTdGF0aWNWYWx1ZS4gKi9cbmNvbnN0IHVud3JhcFN0YXRpY1ZhbHVlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKCh2YWx1ZSBhcyBQYXJ0aWFsPFN0YXRpY1ZhbHVlPik/LnIgIT09IGJyYW5kKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gKHZhbHVlIGFzIFBhcnRpYWw8U3RhdGljVmFsdWU+KT8uWydfJGxpdFN0YXRpYyQnXTtcbn07XG5cbi8qKlxuICogV3JhcHMgYSBzdHJpbmcgc28gdGhhdCBpdCBiZWhhdmVzIGxpa2UgcGFydCBvZiB0aGUgc3RhdGljIHRlbXBsYXRlXG4gKiBzdHJpbmdzIGluc3RlYWQgb2YgYSBkeW5hbWljIHZhbHVlLlxuICpcbiAqIFVzZXJzIG11c3QgdGFrZSBjYXJlIHRvIGVuc3VyZSB0aGF0IGFkZGluZyB0aGUgc3RhdGljIHN0cmluZyB0byB0aGUgdGVtcGxhdGVcbiAqIHJlc3VsdHMgaW4gd2VsbC1mb3JtZWQgSFRNTCwgb3IgZWxzZSB0ZW1wbGF0ZXMgbWF5IGJyZWFrIHVuZXhwZWN0ZWRseS5cbiAqXG4gKiBOb3RlIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyB1bnNhZmUgdG8gdXNlIG9uIHVudHJ1c3RlZCBjb250ZW50LCBhcyBpdCB3aWxsIGJlXG4gKiBkaXJlY3RseSBwYXJzZWQgaW50byBIVE1MLiBEbyBub3QgcGFzcyB1c2VyIGlucHV0IHRvIHRoaXMgZnVuY3Rpb25cbiAqIHdpdGhvdXQgc2FuaXRpemluZyBpdC5cbiAqXG4gKiBTdGF0aWMgdmFsdWVzIGNhbiBiZSBjaGFuZ2VkLCBidXQgdGhleSB3aWxsIGNhdXNlIGEgY29tcGxldGUgcmUtcmVuZGVyXG4gKiBzaW5jZSB0aGV5IGVmZmVjdGl2ZWx5IGNyZWF0ZSBhIG5ldyB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHVuc2FmZVN0YXRpYyA9ICh2YWx1ZTogc3RyaW5nKTogU3RhdGljVmFsdWUgPT4gKHtcbiAgWydfJGxpdFN0YXRpYyQnXTogdmFsdWUsXG4gIHI6IGJyYW5kLFxufSk7XG5cbmNvbnN0IHRleHRGcm9tU3RhdGljID0gKHZhbHVlOiBTdGF0aWNWYWx1ZSkgPT4ge1xuICBpZiAodmFsdWVbJ18kbGl0U3RhdGljJCddICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdmFsdWVbJ18kbGl0U3RhdGljJCddO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBWYWx1ZSBwYXNzZWQgdG8gJ2xpdGVyYWwnIGZ1bmN0aW9uIG11c3QgYmUgYSAnbGl0ZXJhbCcgcmVzdWx0OiAke3ZhbHVlfS4gVXNlICd1bnNhZmVTdGF0aWMnIHRvIHBhc3Mgbm9uLWxpdGVyYWwgdmFsdWVzLCBidXRcbiAgICAgICAgICAgIHRha2UgY2FyZSB0byBlbnN1cmUgcGFnZSBzZWN1cml0eS5gXG4gICAgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBUYWdzIGEgc3RyaW5nIGxpdGVyYWwgc28gdGhhdCBpdCBiZWhhdmVzIGxpa2UgcGFydCBvZiB0aGUgc3RhdGljIHRlbXBsYXRlXG4gKiBzdHJpbmdzIGluc3RlYWQgb2YgYSBkeW5hbWljIHZhbHVlLlxuICpcbiAqIFRoZSBvbmx5IHZhbHVlcyB0aGF0IG1heSBiZSB1c2VkIGluIHRlbXBsYXRlIGV4cHJlc3Npb25zIGFyZSBvdGhlciB0YWdnZWRcbiAqIGBsaXRlcmFsYCByZXN1bHRzIG9yIGB1bnNhZmVTdGF0aWNgIHZhbHVlcyAobm90ZSB0aGF0IHVudHJ1c3RlZCBjb250ZW50XG4gKiBzaG91bGQgbmV2ZXIgYmUgcGFzc2VkIHRvIGB1bnNhZmVTdGF0aWNgKS5cbiAqXG4gKiBVc2VycyBtdXN0IHRha2UgY2FyZSB0byBlbnN1cmUgdGhhdCBhZGRpbmcgdGhlIHN0YXRpYyBzdHJpbmcgdG8gdGhlIHRlbXBsYXRlXG4gKiByZXN1bHRzIGluIHdlbGwtZm9ybWVkIEhUTUwsIG9yIGVsc2UgdGVtcGxhdGVzIG1heSBicmVhayB1bmV4cGVjdGVkbHkuXG4gKlxuICogU3RhdGljIHZhbHVlcyBjYW4gYmUgY2hhbmdlZCwgYnV0IHRoZXkgd2lsbCBjYXVzZSBhIGNvbXBsZXRlIHJlLXJlbmRlciBzaW5jZVxuICogdGhleSBlZmZlY3RpdmVseSBjcmVhdGUgYSBuZXcgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBjb25zdCBsaXRlcmFsID0gKFxuICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgLi4udmFsdWVzOiB1bmtub3duW11cbik6IFN0YXRpY1ZhbHVlID0+ICh7XG4gIFsnXyRsaXRTdGF0aWMkJ106IHZhbHVlcy5yZWR1Y2UoXG4gICAgKGFjYywgdiwgaWR4KSA9PiBhY2MgKyB0ZXh0RnJvbVN0YXRpYyh2IGFzIFN0YXRpY1ZhbHVlKSArIHN0cmluZ3NbaWR4ICsgMV0sXG4gICAgc3RyaW5nc1swXVxuICApIGFzIHN0cmluZyxcbiAgcjogYnJhbmQsXG59KTtcblxuY29uc3Qgc3RyaW5nc0NhY2hlID0gbmV3IE1hcDxzdHJpbmcsIFRlbXBsYXRlU3RyaW5nc0FycmF5PigpO1xuXG4vKipcbiAqIFdyYXBzIGEgbGl0LWh0bWwgdGVtcGxhdGUgdGFnIChgaHRtbGAgb3IgYHN2Z2ApIHRvIGFkZCBzdGF0aWMgdmFsdWUgc3VwcG9ydC5cbiAqL1xuZXhwb3J0IGNvbnN0IHdpdGhTdGF0aWMgPVxuICAoY29yZVRhZzogdHlwZW9mIGNvcmVIdG1sIHwgdHlwZW9mIGNvcmVTdmcgfCB0eXBlb2YgY29yZU1hdGhtbCkgPT5cbiAgKHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi52YWx1ZXM6IHVua25vd25bXSk6IFRlbXBsYXRlUmVzdWx0ID0+IHtcbiAgICBjb25zdCBsID0gdmFsdWVzLmxlbmd0aDtcbiAgICBsZXQgc3RhdGljVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZHluYW1pY1ZhbHVlOiB1bmtub3duO1xuICAgIGNvbnN0IHN0YXRpY1N0cmluZ3M6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBjb25zdCBkeW5hbWljVmFsdWVzOiBBcnJheTx1bmtub3duPiA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgaGFzU3RhdGljcyA9IGZhbHNlO1xuICAgIGxldCBzOiBzdHJpbmc7XG5cbiAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgIHMgPSBzdHJpbmdzW2ldO1xuICAgICAgLy8gQ29sbGVjdCBhbnkgdW5zYWZlU3RhdGljIHZhbHVlcywgYW5kIHRoZWlyIGZvbGxvd2luZyB0ZW1wbGF0ZSBzdHJpbmdzXG4gICAgICAvLyBzbyB0aGF0IHdlIHRyZWF0IGEgcnVuIG9mIHRlbXBsYXRlIHN0cmluZ3MgYW5kIHVuc2FmZSBzdGF0aWMgdmFsdWVzIGFzXG4gICAgICAvLyBhIHNpbmdsZSB0ZW1wbGF0ZSBzdHJpbmcuXG4gICAgICB3aGlsZSAoXG4gICAgICAgIGkgPCBsICYmXG4gICAgICAgICgoZHluYW1pY1ZhbHVlID0gdmFsdWVzW2ldKSxcbiAgICAgICAgKHN0YXRpY1ZhbHVlID0gdW53cmFwU3RhdGljVmFsdWUoZHluYW1pY1ZhbHVlKSkpICE9PSB1bmRlZmluZWRcbiAgICAgICkge1xuICAgICAgICBzICs9IHN0YXRpY1ZhbHVlICsgc3RyaW5nc1srK2ldO1xuICAgICAgICBoYXNTdGF0aWNzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIElmIHRoZSBsYXN0IHZhbHVlIGlzIHN0YXRpYywgd2UgZG9uJ3QgbmVlZCB0byBwdXNoIGl0LlxuICAgICAgaWYgKGkgIT09IGwpIHtcbiAgICAgICAgZHluYW1pY1ZhbHVlcy5wdXNoKGR5bmFtaWNWYWx1ZSk7XG4gICAgICB9XG4gICAgICBzdGF0aWNTdHJpbmdzLnB1c2gocyk7XG4gICAgICBpKys7XG4gICAgfVxuICAgIC8vIElmIHRoZSBsYXN0IHZhbHVlIGlzbid0IHN0YXRpYyAod2hpY2ggd291bGQgaGF2ZSBjb25zdW1lZCB0aGUgbGFzdFxuICAgIC8vIHN0cmluZyksIHRoZW4gd2UgbmVlZCB0byBhZGQgdGhlIGxhc3Qgc3RyaW5nLlxuICAgIGlmIChpID09PSBsKSB7XG4gICAgICBzdGF0aWNTdHJpbmdzLnB1c2goc3RyaW5nc1tsXSk7XG4gICAgfVxuXG4gICAgaWYgKGhhc1N0YXRpY3MpIHtcbiAgICAgIGNvbnN0IGtleSA9IHN0YXRpY1N0cmluZ3Muam9pbignJCRsaXQkJCcpO1xuICAgICAgc3RyaW5ncyA9IHN0cmluZ3NDYWNoZS5nZXQoa2V5KSE7XG4gICAgICBpZiAoc3RyaW5ncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIEJld2FyZTogaW4gZ2VuZXJhbCB0aGlzIHBhdHRlcm4gaXMgdW5zYWZlLCBhbmQgZG9pbmcgc28gbWF5IGJ5cGFzc1xuICAgICAgICAvLyBsaXQncyBzZWN1cml0eSBjaGVja3MgYW5kIGFsbG93IGFuIGF0dGFja2VyIHRvIGV4ZWN1dGUgYXJiaXRyYXJ5XG4gICAgICAgIC8vIGNvZGUgYW5kIGluamVjdCBhcmJpdHJhcnkgY29udGVudC5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgKHN0YXRpY1N0cmluZ3MgYXMgYW55KS5yYXcgPSBzdGF0aWNTdHJpbmdzO1xuICAgICAgICBzdHJpbmdzQ2FjaGUuc2V0KFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICAoc3RyaW5ncyA9IHN0YXRpY1N0cmluZ3MgYXMgdW5rbm93biBhcyBUZW1wbGF0ZVN0cmluZ3NBcnJheSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHZhbHVlcyA9IGR5bmFtaWNWYWx1ZXM7XG4gICAgfVxuICAgIHJldHVybiBjb3JlVGFnKHN0cmluZ3MsIC4uLnZhbHVlcyk7XG4gIH07XG5cbi8qKlxuICogSW50ZXJwcmV0cyBhIHRlbXBsYXRlIGxpdGVyYWwgYXMgYW4gSFRNTCB0ZW1wbGF0ZSB0aGF0IGNhbiBlZmZpY2llbnRseVxuICogcmVuZGVyIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogSW5jbHVkZXMgc3RhdGljIHZhbHVlIHN1cHBvcnQgZnJvbSBgbGl0LWh0bWwvc3RhdGljLmpzYC5cbiAqL1xuZXhwb3J0IGNvbnN0IGh0bWwgPSB3aXRoU3RhdGljKGNvcmVIdG1sKTtcblxuLyoqXG4gKiBJbnRlcnByZXRzIGEgdGVtcGxhdGUgbGl0ZXJhbCBhcyBhbiBTVkcgdGVtcGxhdGUgdGhhdCBjYW4gZWZmaWNpZW50bHlcbiAqIHJlbmRlciB0byBhbmQgdXBkYXRlIGEgY29udGFpbmVyLlxuICpcbiAqIEluY2x1ZGVzIHN0YXRpYyB2YWx1ZSBzdXBwb3J0IGZyb20gYGxpdC1odG1sL3N0YXRpYy5qc2AuXG4gKi9cbmV4cG9ydCBjb25zdCBzdmcgPSB3aXRoU3RhdGljKGNvcmVTdmcpO1xuXG4vKipcbiAqIEludGVycHJldHMgYSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIE1hdGhNTCBmcmFnbWVudCB0aGF0IGNhbiBlZmZpY2llbnRseSByZW5kZXJcbiAqIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogSW5jbHVkZXMgc3RhdGljIHZhbHVlIHN1cHBvcnQgZnJvbSBgbGl0LWh0bWwvc3RhdGljLmpzYC5cbiAqL1xuZXhwb3J0IGNvbnN0IG1hdGhtbCA9IHdpdGhTdGF0aWMoY29yZU1hdGhtbCk7XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuaW1wb3J0IHtcbiAgTWlycm9yVmFsaWRhdG9yXG59IGZyb20gXCIuL2NodW5rLlI3UVg0TTZSLmpzXCI7XG5pbXBvcnQge1xuICBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50XG59IGZyb20gXCIuL2NodW5rLklQV1BSSUhaLmpzXCI7XG5pbXBvcnQge1xuICBXYUludmFsaWRFdmVudFxufSBmcm9tIFwiLi9jaHVuay5WQzNCUFVaSi5qc1wiO1xuaW1wb3J0IHtcbiAgSGFzU2xvdENvbnRyb2xsZXJcbn0gZnJvbSBcIi4vY2h1bmsuS0lIQjNWTUIuanNcIjtcbmltcG9ydCB7XG4gIHNpemVfc3R5bGVzX2RlZmF1bHRcbn0gZnJvbSBcIi4vY2h1bmsuNko2UVlGSFYuanNcIjtcbmltcG9ydCB7XG4gIGJ1dHRvbl9zdHlsZXNfZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay40Rk9IVUJCUy5qc1wiO1xuaW1wb3J0IHtcbiAgd2F0Y2hcbn0gZnJvbSBcIi4vY2h1bmsuUFpBTjZGUE4uanNcIjtcbmltcG9ydCB7XG4gIExvY2FsaXplQ29udHJvbGxlclxufSBmcm9tIFwiLi9jaHVuay5PS1hCTlJFNi5qc1wiO1xuaW1wb3J0IHtcbiAgdmFyaWFudHNfc3R5bGVzX2RlZmF1bHRcbn0gZnJvbSBcIi4vY2h1bmsuWE5UUDdERVEuanNcIjtcbmltcG9ydCB7XG4gIF9fZGVjb3JhdGVDbGFzc1xufSBmcm9tIFwiLi9jaHVuay43VkdDSUhERy5qc1wiO1xuXG4vLyBzcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uLnRzXG5pbXBvcnQgeyBjdXN0b21FbGVtZW50LCBwcm9wZXJ0eSwgcXVlcnksIHN0YXRlIH0gZnJvbSBcImxpdC9kZWNvcmF0b3JzLmpzXCI7XG5pbXBvcnQgeyBjbGFzc01hcCB9IGZyb20gXCJsaXQvZGlyZWN0aXZlcy9jbGFzcy1tYXAuanNcIjtcbmltcG9ydCB7IGlmRGVmaW5lZCB9IGZyb20gXCJsaXQvZGlyZWN0aXZlcy9pZi1kZWZpbmVkLmpzXCI7XG5pbXBvcnQgeyBodG1sLCBsaXRlcmFsIH0gZnJvbSBcImxpdC9zdGF0aWMtaHRtbC5qc1wiO1xudmFyIFdhQnV0dG9uID0gY2xhc3MgZXh0ZW5kcyBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLmFzc3VtZUludGVyYWN0aW9uT24gPSBbXCJjbGlja1wiXTtcbiAgICB0aGlzLmhhc1Nsb3RDb250cm9sbGVyID0gbmV3IEhhc1Nsb3RDb250cm9sbGVyKHRoaXMsIFwiW2RlZmF1bHRdXCIsIFwic3RhcnRcIiwgXCJlbmRcIik7XG4gICAgdGhpcy5sb2NhbGl6ZSA9IG5ldyBMb2NhbGl6ZUNvbnRyb2xsZXIodGhpcyk7XG4gICAgdGhpcy5pbnZhbGlkID0gZmFsc2U7XG4gICAgdGhpcy5pc0ljb25CdXR0b24gPSBmYWxzZTtcbiAgICB0aGlzLnRpdGxlID0gXCJcIjtcbiAgICB0aGlzLnZhcmlhbnQgPSBcIm5ldXRyYWxcIjtcbiAgICB0aGlzLmFwcGVhcmFuY2UgPSBcImFjY2VudFwiO1xuICAgIHRoaXMuc2l6ZSA9IFwibWVkaXVtXCI7XG4gICAgdGhpcy53aXRoQ2FyZXQgPSBmYWxzZTtcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5waWxsID0gZmFsc2U7XG4gICAgdGhpcy50eXBlID0gXCJidXR0b25cIjtcbiAgfVxuICBzdGF0aWMgZ2V0IHZhbGlkYXRvcnMoKSB7XG4gICAgcmV0dXJuIFsuLi5zdXBlci52YWxpZGF0b3JzLCBNaXJyb3JWYWxpZGF0b3IoKV07XG4gIH1cbiAgY29uc3RydWN0TGlnaHRET01CdXR0b24oKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZSBvZiB0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG4gICAgYnV0dG9uLnR5cGUgPSB0aGlzLnR5cGU7XG4gICAgYnV0dG9uLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZSAhaW1wb3J0YW50XCI7XG4gICAgYnV0dG9uLnN0eWxlLndpZHRoID0gXCIwICFpbXBvcnRhbnRcIjtcbiAgICBidXR0b24uc3R5bGUuaGVpZ2h0ID0gXCIwICFpbXBvcnRhbnRcIjtcbiAgICBidXR0b24uc3R5bGUuY2xpcFBhdGggPSBcImluc2V0KDUwJSkgIWltcG9ydGFudFwiO1xuICAgIGJ1dHRvbi5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuICFpbXBvcnRhbnRcIjtcbiAgICBidXR0b24uc3R5bGUud2hpdGVTcGFjZSA9IFwibm93cmFwICFpbXBvcnRhbnRcIjtcbiAgICBpZiAodGhpcy5uYW1lKSB7XG4gICAgICBidXR0b24ubmFtZSA9IHRoaXMubmFtZTtcbiAgICB9XG4gICAgYnV0dG9uLnZhbHVlID0gdGhpcy52YWx1ZSB8fCBcIlwiO1xuICAgIHJldHVybiBidXR0b247XG4gIH1cbiAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmxvYWRpbmcpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMudHlwZSAhPT0gXCJzdWJtaXRcIiAmJiB0aGlzLnR5cGUgIT09IFwicmVzZXRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmb3JtID0gdGhpcy5nZXRGb3JtKCk7XG4gICAgaWYgKCFmb3JtKSByZXR1cm47XG4gICAgY29uc3QgbGlnaHRET01CdXR0b24gPSB0aGlzLmNvbnN0cnVjdExpZ2h0RE9NQnV0dG9uKCk7XG4gICAgdGhpcy5wYXJlbnRFbGVtZW50Py5hcHBlbmQobGlnaHRET01CdXR0b24pO1xuICAgIGxpZ2h0RE9NQnV0dG9uLmNsaWNrKCk7XG4gICAgbGlnaHRET01CdXR0b24ucmVtb3ZlKCk7XG4gIH1cbiAgaGFuZGxlSW52YWxpZCgpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFdhSW52YWxpZEV2ZW50KCkpO1xuICB9XG4gIGhhbmRsZUxhYmVsU2xvdENoYW5nZSgpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMubGFiZWxTbG90LmFzc2lnbmVkTm9kZXMoeyBmbGF0dGVuOiB0cnVlIH0pO1xuICAgIGxldCBoYXNJY29uTGFiZWwgPSBmYWxzZTtcbiAgICBsZXQgaGFzSWNvbiA9IGZhbHNlO1xuICAgIGxldCBoYXNUZXh0ID0gZmFsc2U7XG4gICAgbGV0IGhhc090aGVyRWxlbWVudHMgPSBmYWxzZTtcbiAgICBbLi4ubm9kZXNdLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gbm9kZTtcbiAgICAgICAgaWYgKGVsZW1lbnQubG9jYWxOYW1lID09PSBcIndhLWljb25cIikge1xuICAgICAgICAgIGhhc0ljb24gPSB0cnVlO1xuICAgICAgICAgIGlmICghaGFzSWNvbkxhYmVsKSBoYXNJY29uTGFiZWwgPSBlbGVtZW50LmxhYmVsICE9PSB2b2lkIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFzT3RoZXJFbGVtZW50cyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IG5vZGUudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBcIlwiO1xuICAgICAgICBpZiAodGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaGFzVGV4dCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmlzSWNvbkJ1dHRvbiA9IGhhc0ljb24gJiYgIWhhc1RleHQgJiYgIWhhc090aGVyRWxlbWVudHM7XG4gICAgaWYgKHRoaXMuaXNJY29uQnV0dG9uICYmICFoYXNJY29uTGFiZWwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ0ljb24gYnV0dG9ucyBtdXN0IGhhdmUgYSBsYWJlbCBmb3Igc2NyZWVuIHJlYWRlcnMuIEFkZCA8d2EtaWNvbiBsYWJlbD1cIi4uLlwiPiB0byByZW1vdmUgdGhpcyB3YXJuaW5nLicsXG4gICAgICAgIHRoaXNcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGlzQnV0dG9uKCkge1xuICAgIHJldHVybiB0aGlzLmhyZWYgPyBmYWxzZSA6IHRydWU7XG4gIH1cbiAgaXNMaW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhyZWYgPyB0cnVlIDogZmFsc2U7XG4gIH1cbiAgaGFuZGxlRGlzYWJsZWRDaGFuZ2UoKSB7XG4gICAgdGhpcy51cGRhdGVWYWxpZGl0eSgpO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBzZXRWYWx1ZSguLi5fYXJncykge1xuICB9XG4gIC8qKiBTaW11bGF0ZXMgYSBjbGljayBvbiB0aGUgYnV0dG9uLiAqL1xuICBjbGljaygpIHtcbiAgICB0aGlzLmJ1dHRvbi5jbGljaygpO1xuICB9XG4gIC8qKiBTZXRzIGZvY3VzIG9uIHRoZSBidXR0b24uICovXG4gIGZvY3VzKG9wdGlvbnMpIHtcbiAgICB0aGlzLmJ1dHRvbi5mb2N1cyhvcHRpb25zKTtcbiAgfVxuICAvKiogUmVtb3ZlcyBmb2N1cyBmcm9tIHRoZSBidXR0b24uICovXG4gIGJsdXIoKSB7XG4gICAgdGhpcy5idXR0b24uYmx1cigpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBpc0xpbmsgPSB0aGlzLmlzTGluaygpO1xuICAgIGNvbnN0IHRhZyA9IGlzTGluayA/IGxpdGVyYWxgYWAgOiBsaXRlcmFsYGJ1dHRvbmA7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8JHt0YWd9XG4gICAgICAgIHBhcnQ9XCJiYXNlXCJcbiAgICAgICAgY2xhc3M9JHtjbGFzc01hcCh7XG4gICAgICBidXR0b246IHRydWUsXG4gICAgICBjYXJldDogdGhpcy53aXRoQ2FyZXQsXG4gICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCxcbiAgICAgIGxvYWRpbmc6IHRoaXMubG9hZGluZyxcbiAgICAgIHJ0bDogdGhpcy5sb2NhbGl6ZS5kaXIoKSA9PT0gXCJydGxcIixcbiAgICAgIFwiaGFzLWxhYmVsXCI6IHRoaXMuaGFzU2xvdENvbnRyb2xsZXIudGVzdChcIltkZWZhdWx0XVwiKSxcbiAgICAgIFwiaGFzLXN0YXJ0XCI6IHRoaXMuaGFzU2xvdENvbnRyb2xsZXIudGVzdChcInN0YXJ0XCIpLFxuICAgICAgXCJoYXMtZW5kXCI6IHRoaXMuaGFzU2xvdENvbnRyb2xsZXIudGVzdChcImVuZFwiKSxcbiAgICAgIFwiaXMtaWNvbi1idXR0b25cIjogdGhpcy5pc0ljb25CdXR0b25cbiAgICB9KX1cbiAgICAgICAgP2Rpc2FibGVkPSR7aWZEZWZpbmVkKGlzTGluayA/IHZvaWQgMCA6IHRoaXMuZGlzYWJsZWQpfVxuICAgICAgICB0eXBlPSR7aWZEZWZpbmVkKGlzTGluayA/IHZvaWQgMCA6IHRoaXMudHlwZSl9XG4gICAgICAgIHRpdGxlPSR7dGhpcy50aXRsZX1cbiAgICAgICAgbmFtZT0ke2lmRGVmaW5lZChpc0xpbmsgPyB2b2lkIDAgOiB0aGlzLm5hbWUpfVxuICAgICAgICB2YWx1ZT0ke2lmRGVmaW5lZChpc0xpbmsgPyB2b2lkIDAgOiB0aGlzLnZhbHVlKX1cbiAgICAgICAgaHJlZj0ke2lmRGVmaW5lZChpc0xpbmsgPyB0aGlzLmhyZWYgOiB2b2lkIDApfVxuICAgICAgICB0YXJnZXQ9JHtpZkRlZmluZWQoaXNMaW5rID8gdGhpcy50YXJnZXQgOiB2b2lkIDApfVxuICAgICAgICBkb3dubG9hZD0ke2lmRGVmaW5lZChpc0xpbmsgPyB0aGlzLmRvd25sb2FkIDogdm9pZCAwKX1cbiAgICAgICAgcmVsPSR7aWZEZWZpbmVkKGlzTGluayAmJiB0aGlzLnJlbCA/IHRoaXMucmVsIDogdm9pZCAwKX1cbiAgICAgICAgcm9sZT0ke2lmRGVmaW5lZChpc0xpbmsgPyB2b2lkIDAgOiBcImJ1dHRvblwiKX1cbiAgICAgICAgYXJpYS1kaXNhYmxlZD0ke2lmRGVmaW5lZChpc0xpbmsgJiYgdGhpcy5kaXNhYmxlZCA/IFwidHJ1ZVwiIDogdm9pZCAwKX1cbiAgICAgICAgdGFiaW5kZXg9JHt0aGlzLmRpc2FibGVkID8gXCItMVwiIDogXCIwXCJ9XG4gICAgICAgIEBpbnZhbGlkPSR7dGhpcy5pc0J1dHRvbigpID8gdGhpcy5oYW5kbGVJbnZhbGlkIDogbnVsbH1cbiAgICAgICAgQGNsaWNrPSR7dGhpcy5oYW5kbGVDbGlja31cbiAgICAgID5cbiAgICAgICAgPHNsb3QgbmFtZT1cInN0YXJ0XCIgcGFydD1cInN0YXJ0XCIgY2xhc3M9XCJzdGFydFwiPjwvc2xvdD5cbiAgICAgICAgPHNsb3QgcGFydD1cImxhYmVsXCIgY2xhc3M9XCJsYWJlbFwiIEBzbG90Y2hhbmdlPSR7dGhpcy5oYW5kbGVMYWJlbFNsb3RDaGFuZ2V9Pjwvc2xvdD5cbiAgICAgICAgPHNsb3QgbmFtZT1cImVuZFwiIHBhcnQ9XCJlbmRcIiBjbGFzcz1cImVuZFwiPjwvc2xvdD5cbiAgICAgICAgJHt0aGlzLndpdGhDYXJldCA/IGh0bWxgXG4gICAgICAgICAgICAgICAgPHdhLWljb24gcGFydD1cImNhcmV0XCIgY2xhc3M9XCJjYXJldFwiIGxpYnJhcnk9XCJzeXN0ZW1cIiBuYW1lPVwiY2hldnJvbi1kb3duXCIgdmFyaWFudD1cInNvbGlkXCI+PC93YS1pY29uPlxuICAgICAgICAgICAgICBgIDogXCJcIn1cbiAgICAgICAgJHt0aGlzLmxvYWRpbmcgPyBodG1sYDx3YS1zcGlubmVyIHBhcnQ9XCJzcGlubmVyXCI+PC93YS1zcGlubmVyPmAgOiBcIlwifVxuICAgICAgPC8ke3RhZ30+XG4gICAgYDtcbiAgfVxufTtcbldhQnV0dG9uLnNoYWRvd1Jvb3RPcHRpb25zID0geyAuLi5XZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50LnNoYWRvd1Jvb3RPcHRpb25zLCBkZWxlZ2F0ZXNGb2N1czogdHJ1ZSB9O1xuV2FCdXR0b24uY3NzID0gW2J1dHRvbl9zdHlsZXNfZGVmYXVsdCwgdmFyaWFudHNfc3R5bGVzX2RlZmF1bHQsIHNpemVfc3R5bGVzX2RlZmF1bHRdO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcXVlcnkoXCIuYnV0dG9uXCIpXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiYnV0dG9uXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcXVlcnkoXCJzbG90Om5vdChbbmFtZV0pXCIpXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwibGFiZWxTbG90XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgc3RhdGUoKVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImludmFsaWRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBzdGF0ZSgpXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiaXNJY29uQnV0dG9uXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcInRpdGxlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwidmFyaWFudFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImFwcGVhcmFuY2VcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJzaXplXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwid2l0aC1jYXJldFwiLCB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwid2l0aENhcmV0XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiZGlzYWJsZWRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4sIHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJsb2FkaW5nXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwicGlsbFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJ0eXBlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwibmFtZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcInZhbHVlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiaHJlZlwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJ0YXJnZXRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwicmVsXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImRvd25sb2FkXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwiZm9ybWFjdGlvblwiIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiZm9ybUFjdGlvblwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcImZvcm1lbmN0eXBlXCIgfSlcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJmb3JtRW5jdHlwZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcImZvcm1tZXRob2RcIiB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImZvcm1NZXRob2RcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJmb3Jtbm92YWxpZGF0ZVwiLCB0eXBlOiBCb29sZWFuIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiZm9ybU5vVmFsaWRhdGVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJmb3JtdGFyZ2V0XCIgfSlcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJmb3JtVGFyZ2V0XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgd2F0Y2goXCJkaXNhYmxlZFwiLCB7IHdhaXRVbnRpbEZpcnN0VXBkYXRlOiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiaGFuZGxlRGlzYWJsZWRDaGFuZ2VcIiwgMSk7XG5XYUJ1dHRvbiA9IF9fZGVjb3JhdGVDbGFzcyhbXG4gIGN1c3RvbUVsZW1lbnQoXCJ3YS1idXR0b25cIilcbl0sIFdhQnV0dG9uKTtcblxuZXhwb3J0IHtcbiAgV2FCdXR0b25cbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXIuc3R5bGVzLnRzXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwibGl0XCI7XG52YXIgc3Bpbm5lcl9zdHlsZXNfZGVmYXVsdCA9IGNzc2BcbiAgOmhvc3Qge1xuICAgIC0tdHJhY2std2lkdGg6IDJweDtcbiAgICAtLXRyYWNrLWNvbG9yOiB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtbm9ybWFsKTtcbiAgICAtLWluZGljYXRvci1jb2xvcjogdmFyKC0td2EtY29sb3ItYnJhbmQtZmlsbC1sb3VkKTtcbiAgICAtLXNwZWVkOiAycztcblxuICAgIC8qXG4gICAgICBSZXNpemluZyBhIHNwaW5uZXIgZWxlbWVudCB1c2luZyBhbnl0aGluZyBidXQgZm9udC1zaXplIHdpbGwgYnJlYWsgdGhlIGFuaW1hdGlvbiBiZWNhdXNlIHRoZSBhbmltYXRpb24gdXNlcyBlbVxuICAgICAgdW5pdHMuIFRoZXJlZm9yZSwgaWYgYSBzcGlubmVyIGlzIHVzZWQgaW4gYSBmbGV4IGNvbnRhaW5lciB3aXRob3V0IFxcYGZsZXg6IG5vbmVcXGAgYXBwbGllZCwgdGhlIHNwaW5uZXIgY2FuXG4gICAgICBncm93L3NocmluayBhbmQgYnJlYWsgdGhlIGFuaW1hdGlvbi4gVGhlIHVzZSBvZiBcXGBmbGV4OiBub25lXFxgIG9uIHRoZSBob3N0IGVsZW1lbnQgcHJldmVudHMgdGhpcyBieSBhbHdheXMgaGF2aW5nXG4gICAgICB0aGUgc3Bpbm5lciBzaXplZCBhY2NvcmRpbmcgdG8gaXRzIGFjdHVhbCBkaW1lbnNpb25zLlxuICAgICovXG4gICAgZmxleDogbm9uZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICB3aWR0aDogMWVtO1xuICAgIGhlaWdodDogMWVtO1xuICB9XG5cbiAgc3ZnIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYXNwZWN0LXJhdGlvOiAxO1xuICAgIGFuaW1hdGlvbjogc3BpbiB2YXIoLS1zcGVlZCkgbGluZWFyIGluZmluaXRlO1xuICB9XG5cbiAgLnRyYWNrIHtcbiAgICBzdHJva2U6IHZhcigtLXRyYWNrLWNvbG9yKTtcbiAgfVxuXG4gIC5pbmRpY2F0b3Ige1xuICAgIHN0cm9rZTogdmFyKC0taW5kaWNhdG9yLWNvbG9yKTtcbiAgICBzdHJva2UtZGFzaGFycmF5OiA3NSwgMTAwO1xuICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAtNTtcbiAgICBhbmltYXRpb246IGRhc2ggMS41cyBlYXNlLWluLW91dCBpbmZpbml0ZTtcbiAgICBzdHJva2UtbGluZWNhcDogcm91bmQ7XG4gIH1cblxuICBAa2V5ZnJhbWVzIHNwaW4ge1xuICAgIDAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBkYXNoIHtcbiAgICAwJSB7XG4gICAgICBzdHJva2UtZGFzaGFycmF5OiAxLCAxNTA7XG4gICAgICBzdHJva2UtZGFzaG9mZnNldDogMDtcbiAgICB9XG4gICAgNTAlIHtcbiAgICAgIHN0cm9rZS1kYXNoYXJyYXk6IDkwLCAxNTA7XG4gICAgICBzdHJva2UtZGFzaG9mZnNldDogLTM1O1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIHN0cm9rZS1kYXNoYXJyYXk6IDkwLCAxNTA7XG4gICAgICBzdHJva2UtZGFzaG9mZnNldDogLTEyNDtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCB7XG4gIHNwaW5uZXJfc3R5bGVzX2RlZmF1bHRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuaW1wb3J0IHtcbiAgc3Bpbm5lcl9zdHlsZXNfZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay5BR0RHUkc0RS5qc1wiO1xuaW1wb3J0IHtcbiAgTG9jYWxpemVDb250cm9sbGVyXG59IGZyb20gXCIuL2NodW5rLk9LWEJOUkU2LmpzXCI7XG5pbXBvcnQge1xuICBXZWJBd2Vzb21lRWxlbWVudFxufSBmcm9tIFwiLi9jaHVuay5FUEhIV1hLMi5qc1wiO1xuaW1wb3J0IHtcbiAgX19kZWNvcmF0ZUNsYXNzXG59IGZyb20gXCIuL2NodW5rLjdWR0NJSERHLmpzXCI7XG5cbi8vIHNyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci50c1xuaW1wb3J0IHsgaHRtbCB9IGZyb20gXCJsaXRcIjtcbmltcG9ydCB7IGN1c3RvbUVsZW1lbnQgfSBmcm9tIFwibGl0L2RlY29yYXRvcnMuanNcIjtcbnZhciBXYVNwaW5uZXIgPSBjbGFzcyBleHRlbmRzIFdlYkF3ZXNvbWVFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLmxvY2FsaXplID0gbmV3IExvY2FsaXplQ29udHJvbGxlcih0aGlzKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8c3ZnXG4gICAgICAgIHBhcnQ9XCJiYXNlXCJcbiAgICAgICAgcm9sZT1cInByb2dyZXNzYmFyXCJcbiAgICAgICAgYXJpYS1sYWJlbD0ke3RoaXMubG9jYWxpemUudGVybShcImxvYWRpbmdcIil9XG4gICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgdmlld0JveD1cIjAgMCA1MCA1MFwiXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgPlxuICAgICAgICA8Y2lyY2xlIGNsYXNzPVwidHJhY2tcIiBjeD1cIjI1XCIgY3k9XCIyNVwiIHI9XCIyMFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLXdpZHRoPVwiNVwiIC8+XG4gICAgICAgIDxjaXJjbGUgY2xhc3M9XCJpbmRpY2F0b3JcIiBjeD1cIjI1XCIgY3k9XCIyNVwiIHI9XCIyMFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLXdpZHRoPVwiNVwiIC8+XG4gICAgICA8L3N2Zz5cbiAgICBgO1xuICB9XG59O1xuV2FTcGlubmVyLmNzcyA9IHNwaW5uZXJfc3R5bGVzX2RlZmF1bHQ7XG5XYVNwaW5uZXIgPSBfX2RlY29yYXRlQ2xhc3MoW1xuICBjdXN0b21FbGVtZW50KFwid2Etc3Bpbm5lclwiKVxuXSwgV2FTcGlubmVyKTtcblxuZXhwb3J0IHtcbiAgV2FTcGlubmVyXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2V2ZW50cy9lcnJvci50c1xudmFyIFdhRXJyb3JFdmVudCA9IGNsYXNzIGV4dGVuZHMgRXZlbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIndhLWVycm9yXCIsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2UsIGNvbXBvc2VkOiB0cnVlIH0pO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBXYUVycm9yRXZlbnRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvZXZlbnRzL2xvYWQudHNcbnZhciBXYUxvYWRFdmVudCA9IGNsYXNzIGV4dGVuZHMgRXZlbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIndhLWxvYWRcIiwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZSwgY29tcG9zZWQ6IHRydWUgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIFdhTG9hZEV2ZW50XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uLnN0eWxlcy50c1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcImxpdFwiO1xudmFyIGljb25fc3R5bGVzX2RlZmF1bHQgPSBjc3NgXG4gIDpob3N0IHtcbiAgICAtLXByaW1hcnktY29sb3I6IGN1cnJlbnRDb2xvcjtcbiAgICAtLXByaW1hcnktb3BhY2l0eTogMTtcbiAgICAtLXNlY29uZGFyeS1jb2xvcjogY3VycmVudENvbG9yO1xuICAgIC0tc2Vjb25kYXJ5LW9wYWNpdHk6IDAuNDtcbiAgICAtLXJvdGF0ZS1hbmdsZTogMGRlZztcblxuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgdmVydGljYWwtYWxpZ246IC0wLjEyNWVtO1xuICB9XG5cbiAgLyogU3RhbmRhcmQgKi9cbiAgOmhvc3QoOm5vdChbYXV0by13aWR0aF0pKSB7XG4gICAgd2lkdGg6IDEuMjVlbTtcbiAgICBoZWlnaHQ6IDFlbTtcbiAgfVxuXG4gIC8qIEF1dG8td2lkdGggKi9cbiAgOmhvc3QoW2F1dG8td2lkdGhdKSB7XG4gICAgd2lkdGg6IGF1dG87XG4gICAgaGVpZ2h0OiAxZW07XG4gIH1cblxuICBzdmcge1xuICAgIGhlaWdodDogMWVtO1xuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICAgIHdpZHRoOiBhdXRvO1xuXG4gICAgLyogRHVvdG9uZSBjb2xvcnMgd2l0aCBwYXRoLXNwZWNpZmljIG9wYWNpdHkgZmFsbGJhY2sgKi9cbiAgICBwYXRoW2RhdGEtZHVvdG9uZS1wcmltYXJ5XSB7XG4gICAgICBjb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvcik7XG4gICAgICBvcGFjaXR5OiB2YXIoLS1wYXRoLW9wYWNpdHksIHZhcigtLXByaW1hcnktb3BhY2l0eSkpO1xuICAgIH1cblxuICAgIHBhdGhbZGF0YS1kdW90b25lLXNlY29uZGFyeV0ge1xuICAgICAgY29sb3I6IHZhcigtLXNlY29uZGFyeS1jb2xvcik7XG4gICAgICBvcGFjaXR5OiB2YXIoLS1wYXRoLW9wYWNpdHksIHZhcigtLXNlY29uZGFyeS1vcGFjaXR5KSk7XG4gICAgfVxuICB9XG5cbiAgLyogUm90YXRpb24gKi9cbiAgOmhvc3QoW3JvdGF0ZV0pIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSh2YXIoLS1yb3RhdGUtYW5nbGUsIDBkZWcpKTtcbiAgfVxuXG4gIC8qIEZsaXBwaW5nICovXG4gIDpob3N0KFtmbGlwPSd4J10pIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlWCgtMSk7XG4gIH1cbiAgOmhvc3QoW2ZsaXA9J3knXSkge1xuICAgIHRyYW5zZm9ybTogc2NhbGVZKC0xKTtcbiAgfVxuICA6aG9zdChbZmxpcD0nYm90aCddKSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgtMSwgLTEpO1xuICB9XG5cbiAgLyogUm90YXRpb24gYW5kIEZsaXBwaW5nIGNvbWJpbmVkICovXG4gIDpob3N0KFtyb3RhdGVdW2ZsaXA9J3gnXSkge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKHZhcigtLXJvdGF0ZS1hbmdsZSwgMGRlZykpIHNjYWxlWCgtMSk7XG4gIH1cbiAgOmhvc3QoW3JvdGF0ZV1bZmxpcD0neSddKSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUodmFyKC0tcm90YXRlLWFuZ2xlLCAwZGVnKSkgc2NhbGVZKC0xKTtcbiAgfVxuICA6aG9zdChbcm90YXRlXVtmbGlwPSdib3RoJ10pIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSh2YXIoLS1yb3RhdGUtYW5nbGUsIDBkZWcpKSBzY2FsZSgtMSwgLTEpO1xuICB9XG5cbiAgLyogQW5pbWF0aW9ucyAqL1xuICA6aG9zdChbYW5pbWF0aW9uPSdiZWF0J10pIHtcbiAgICBhbmltYXRpb24tbmFtZTogYmVhdDtcbiAgICBhbmltYXRpb24tZGVsYXk6IHZhcigtLWFuaW1hdGlvbi1kZWxheSwgMHMpO1xuICAgIGFuaW1hdGlvbi1kaXJlY3Rpb246IHZhcigtLWFuaW1hdGlvbi1kaXJlY3Rpb24sIG5vcm1hbCk7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1hbmltYXRpb24tZHVyYXRpb24sIDFzKTtcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiB2YXIoLS1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50LCBpbmZpbml0ZSk7XG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogdmFyKC0tYW5pbWF0aW9uLXRpbWluZywgZWFzZS1pbi1vdXQpO1xuICB9XG5cbiAgOmhvc3QoW2FuaW1hdGlvbj0nZmFkZSddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IGZhZGU7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiB2YXIoLS1hbmltYXRpb24tZGVsYXksIDBzKTtcbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiB2YXIoLS1hbmltYXRpb24tZGlyZWN0aW9uLCBub3JtYWwpO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogdmFyKC0tYW5pbWF0aW9uLWR1cmF0aW9uLCAxcyk7XG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogdmFyKC0tYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCwgaW5maW5pdGUpO1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IHZhcigtLWFuaW1hdGlvbi10aW1pbmcsIGN1YmljLWJlemllcigwLjQsIDAsIDAuNiwgMSkpO1xuICB9XG5cbiAgOmhvc3QoW2FuaW1hdGlvbj0nYmVhdC1mYWRlJ10pIHtcbiAgICBhbmltYXRpb24tbmFtZTogYmVhdC1mYWRlO1xuICAgIGFuaW1hdGlvbi1kZWxheTogdmFyKC0tYW5pbWF0aW9uLWRlbGF5LCAwcyk7XG4gICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogdmFyKC0tYW5pbWF0aW9uLWRpcmVjdGlvbiwgbm9ybWFsKTtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWFuaW1hdGlvbi1kdXJhdGlvbiwgMXMpO1xuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHZhcigtLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQsIGluZmluaXRlKTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS1hbmltYXRpb24tdGltaW5nLCBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjYsIDEpKTtcbiAgfVxuXG4gIDpob3N0KFthbmltYXRpb249J2JvdW5jZSddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZTtcbiAgICBhbmltYXRpb24tZGVsYXk6IHZhcigtLWFuaW1hdGlvbi1kZWxheSwgMHMpO1xuICAgIGFuaW1hdGlvbi1kaXJlY3Rpb246IHZhcigtLWFuaW1hdGlvbi1kaXJlY3Rpb24sIG5vcm1hbCk7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1hbmltYXRpb24tZHVyYXRpb24sIDFzKTtcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiB2YXIoLS1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50LCBpbmZpbml0ZSk7XG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogdmFyKC0tYW5pbWF0aW9uLXRpbWluZywgY3ViaWMtYmV6aWVyKDAuMjgsIDAuODQsIDAuNDIsIDEpKTtcbiAgfVxuXG4gIDpob3N0KFthbmltYXRpb249J2ZsaXAnXSkge1xuICAgIGFuaW1hdGlvbi1uYW1lOiBmbGlwO1xuICAgIGFuaW1hdGlvbi1kZWxheTogdmFyKC0tYW5pbWF0aW9uLWRlbGF5LCAwcyk7XG4gICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogdmFyKC0tYW5pbWF0aW9uLWRpcmVjdGlvbiwgbm9ybWFsKTtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWFuaW1hdGlvbi1kdXJhdGlvbiwgMXMpO1xuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHZhcigtLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQsIGluZmluaXRlKTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS1hbmltYXRpb24tdGltaW5nLCBlYXNlLWluLW91dCk7XG4gIH1cblxuICA6aG9zdChbYW5pbWF0aW9uPSdzaGFrZSddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IHNoYWtlO1xuICAgIGFuaW1hdGlvbi1kZWxheTogdmFyKC0tYW5pbWF0aW9uLWRlbGF5LCAwcyk7XG4gICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogdmFyKC0tYW5pbWF0aW9uLWRpcmVjdGlvbiwgbm9ybWFsKTtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWFuaW1hdGlvbi1kdXJhdGlvbiwgMXMpO1xuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHZhcigtLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQsIGluZmluaXRlKTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS1hbmltYXRpb24tdGltaW5nLCBsaW5lYXIpO1xuICB9XG5cbiAgOmhvc3QoW2FuaW1hdGlvbj0nc3BpbiddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IHNwaW47XG4gICAgYW5pbWF0aW9uLWRlbGF5OiB2YXIoLS1hbmltYXRpb24tZGVsYXksIDBzKTtcbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiB2YXIoLS1hbmltYXRpb24tZGlyZWN0aW9uLCBub3JtYWwpO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogdmFyKC0tYW5pbWF0aW9uLWR1cmF0aW9uLCAycyk7XG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogdmFyKC0tYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCwgaW5maW5pdGUpO1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IHZhcigtLWFuaW1hdGlvbi10aW1pbmcsIGxpbmVhcik7XG4gIH1cblxuICA6aG9zdChbYW5pbWF0aW9uPSdzcGluLXB1bHNlJ10pIHtcbiAgICBhbmltYXRpb24tbmFtZTogc3Bpbi1wdWxzZTtcbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiB2YXIoLS1hbmltYXRpb24tZGlyZWN0aW9uLCBub3JtYWwpO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogdmFyKC0tYW5pbWF0aW9uLWR1cmF0aW9uLCAxcyk7XG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogdmFyKC0tYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCwgaW5maW5pdGUpO1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IHZhcigtLWFuaW1hdGlvbi10aW1pbmcsIHN0ZXBzKDgpKTtcbiAgfVxuXG4gIDpob3N0KFthbmltYXRpb249J3NwaW4tcmV2ZXJzZSddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IHNwaW47XG4gICAgYW5pbWF0aW9uLWRlbGF5OiB2YXIoLS1hbmltYXRpb24tZGVsYXksIDBzKTtcbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiB2YXIoLS1hbmltYXRpb24tZGlyZWN0aW9uLCByZXZlcnNlKTtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWFuaW1hdGlvbi1kdXJhdGlvbiwgMnMpO1xuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHZhcigtLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQsIGluZmluaXRlKTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS1hbmltYXRpb24tdGltaW5nLCBsaW5lYXIpO1xuICB9XG5cbiAgLyogS2V5ZnJhbWVzICovXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgOmhvc3QoW2FuaW1hdGlvbj0nYmVhdCddKSxcbiAgICA6aG9zdChbYW5pbWF0aW9uPSdib3VuY2UnXSksXG4gICAgOmhvc3QoW2FuaW1hdGlvbj0nZmFkZSddKSxcbiAgICA6aG9zdChbYW5pbWF0aW9uPSdiZWF0LWZhZGUnXSksXG4gICAgOmhvc3QoW2FuaW1hdGlvbj0nZmxpcCddKSxcbiAgICA6aG9zdChbYW5pbWF0aW9uPSdzaGFrZSddKSxcbiAgICA6aG9zdChbYW5pbWF0aW9uPSdzcGluJ10pLFxuICAgIDpob3N0KFthbmltYXRpb249J3NwaW4tcHVsc2UnXSksXG4gICAgOmhvc3QoW2FuaW1hdGlvbj0nc3Bpbi1yZXZlcnNlJ10pIHtcbiAgICAgIGFuaW1hdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgdHJhbnNpdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuICBAa2V5ZnJhbWVzIGJlYXQge1xuICAgIDAlLFxuICAgIDkwJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgICA0NSUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSh2YXIoLS1iZWF0LXNjYWxlLCAxLjI1KSk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBmYWRlIHtcbiAgICA1MCUge1xuICAgICAgb3BhY2l0eTogdmFyKC0tZmFkZS1vcGFjaXR5LCAwLjQpO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgYmVhdC1mYWRlIHtcbiAgICAwJSxcbiAgICAxMDAlIHtcbiAgICAgIG9wYWNpdHk6IHZhcigtLWJlYXQtZmFkZS1vcGFjaXR5LCAwLjQpO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgNTAlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKHZhcigtLWJlYXQtZmFkZS1zY2FsZSwgMS4xMjUpKTtcbiAgICB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIGJvdW5jZSB7XG4gICAgMCUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLCAxKSB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgICAxMCUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSh2YXIoLS1ib3VuY2Utc3RhcnQtc2NhbGUteCwgMS4xKSwgdmFyKC0tYm91bmNlLXN0YXJ0LXNjYWxlLXksIDAuOSkpIHRyYW5zbGF0ZVkoMCk7XG4gICAgfVxuICAgIDMwJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKHZhcigtLWJvdW5jZS1qdW1wLXNjYWxlLXgsIDAuOSksIHZhcigtLWJvdW5jZS1qdW1wLXNjYWxlLXksIDEuMSkpXG4gICAgICAgIHRyYW5zbGF0ZVkodmFyKC0tYm91bmNlLWhlaWdodCwgLTAuNWVtKSk7XG4gICAgfVxuICAgIDUwJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKHZhcigtLWJvdW5jZS1sYW5kLXNjYWxlLXgsIDEuMDUpLCB2YXIoLS1ib3VuY2UtbGFuZC1zY2FsZS15LCAwLjk1KSkgdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgNTclIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSwgMSkgdHJhbnNsYXRlWSh2YXIoLS1ib3VuY2UtcmVib3VuZCwgLTAuMTI1ZW0pKTtcbiAgICB9XG4gICAgNjQlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSwgMSkgdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEsIDEpIHRyYW5zbGF0ZVkoMCk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBmbGlwIHtcbiAgICA1MCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUzZCh2YXIoLS1mbGlwLXgsIDApLCB2YXIoLS1mbGlwLXksIDEpLCB2YXIoLS1mbGlwLXosIDApLCB2YXIoLS1mbGlwLWFuZ2xlLCAtMTgwZGVnKSk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBzaGFrZSB7XG4gICAgMCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTE1ZGVnKTtcbiAgICB9XG4gICAgNCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTVkZWcpO1xuICAgIH1cbiAgICA4JSxcbiAgICAyNCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTE4ZGVnKTtcbiAgICB9XG4gICAgMTIlLFxuICAgIDI4JSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxOGRlZyk7XG4gICAgfVxuICAgIDE2JSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMjJkZWcpO1xuICAgIH1cbiAgICAyMCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjJkZWcpO1xuICAgIH1cbiAgICAzMiUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTEyZGVnKTtcbiAgICB9XG4gICAgMzYlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDEyZGVnKTtcbiAgICB9XG4gICAgNDAlLFxuICAgIDEwMCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBzcGluIHtcbiAgICAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgc3Bpbi1wdWxzZSB7XG4gICAgMCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCB7XG4gIGljb25fc3R5bGVzX2RlZmF1bHRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvdXRpbGl0aWVzL2Jhc2UtcGF0aC50c1xudmFyIGJhc2VQYXRoID0gXCJcIjtcbnZhciBraXRDb2RlID0gXCJcIjtcbmZ1bmN0aW9uIHNldEJhc2VQYXRoKHBhdGgpIHtcbiAgYmFzZVBhdGggPSBwYXRoO1xufVxuZnVuY3Rpb24gZ2V0QmFzZVBhdGgoc3VicGF0aCA9IFwiXCIpIHtcbiAgaWYgKCFiYXNlUGF0aCkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXdlYmF3ZXNvbWVdXCIpO1xuICAgIGlmIChlbD8uaGFzQXR0cmlidXRlKFwiZGF0YS13ZWJhd2Vzb21lXCIpKSB7XG4gICAgICBjb25zdCByb290UmVsYXRpdmVVcmwgPSBuZXcgVVJMKGVsLmdldEF0dHJpYnV0ZShcImRhdGEtd2ViYXdlc29tZVwiKSA/PyBcIlwiLCB3aW5kb3cubG9jYXRpb24uaHJlZikucGF0aG5hbWU7XG4gICAgICBzZXRCYXNlUGF0aChyb290UmVsYXRpdmVVcmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzY3JpcHRzID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpXTtcbiAgICAgIGNvbnN0IHdhU2NyaXB0ID0gc2NyaXB0cy5maW5kKFxuICAgICAgICAoc2NyaXB0KSA9PiBzY3JpcHQuc3JjLmVuZHNXaXRoKFwid2ViYXdlc29tZS5qc1wiKSB8fCBzY3JpcHQuc3JjLmVuZHNXaXRoKFwid2ViYXdlc29tZS5sb2FkZXIuanNcIikgfHwgc2NyaXB0LnNyYy5lbmRzV2l0aChcIndlYmF3ZXNvbWUuc3NyLWxvYWRlci5qc1wiKVxuICAgICAgKTtcbiAgICAgIGlmICh3YVNjcmlwdCkge1xuICAgICAgICBjb25zdCBwYXRoID0gU3RyaW5nKHdhU2NyaXB0LmdldEF0dHJpYnV0ZShcInNyY1wiKSk7XG4gICAgICAgIHNldEJhc2VQYXRoKHBhdGguc3BsaXQoXCIvXCIpLnNsaWNlKDAsIC0xKS5qb2luKFwiL1wiKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBiYXNlUGF0aC5yZXBsYWNlKC9cXC8kLywgXCJcIikgKyAoc3VicGF0aCA/IGAvJHtzdWJwYXRoLnJlcGxhY2UoL15cXC8vLCBcIlwiKX1gIDogYGApO1xufVxuZnVuY3Rpb24gc2V0S2l0Q29kZShjb2RlKSB7XG4gIGtpdENvZGUgPSBjb2RlO1xufVxuZnVuY3Rpb24gZ2V0S2l0Q29kZSgpIHtcbiAgaWYgKCFraXRDb2RlKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZmEta2l0LWNvZGVdXCIpO1xuICAgIGlmIChlbCkge1xuICAgICAgc2V0S2l0Q29kZShlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZhLWtpdC1jb2RlXCIpIHx8IFwiXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ga2l0Q29kZTtcbn1cblxuZXhwb3J0IHtcbiAgc2V0QmFzZVBhdGgsXG4gIGdldEJhc2VQYXRoLFxuICBzZXRLaXRDb2RlLFxuICBnZXRLaXRDb2RlXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cbmltcG9ydCB7XG4gIGdldEtpdENvZGVcbn0gZnJvbSBcIi4vY2h1bmsuSzZRTVVJSFAuanNcIjtcblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbi9saWJyYXJ5LmRlZmF1bHQudHNcbnZhciBGQV9WRVJTSU9OID0gXCI3LjIuMFwiO1xuZnVuY3Rpb24gZ2V0SWNvblVybChuYW1lLCBmYW1pbHksIHZhcmlhbnQpIHtcbiAgY29uc3Qga2l0Q29kZSA9IGdldEtpdENvZGUoKTtcbiAgY29uc3QgaXNQcm8gPSBraXRDb2RlLmxlbmd0aCA+IDA7XG4gIGxldCBmb2xkZXIgPSBcInNvbGlkXCI7XG4gIGlmIChmYW1pbHkgPT09IFwiY2hpc2VsXCIpIHtcbiAgICBmb2xkZXIgPSBcImNoaXNlbC1yZWd1bGFyXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJldGNoXCIpIHtcbiAgICBmb2xkZXIgPSBcImV0Y2gtc29saWRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcImdyYXBoaXRlXCIpIHtcbiAgICBmb2xkZXIgPSBcImdyYXBoaXRlLXRoaW5cIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcImplbGx5XCIpIHtcbiAgICBmb2xkZXIgPSBcImplbGx5LXJlZ3VsYXJcIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJkdW8tcmVndWxhclwiKSBmb2xkZXIgPSBcImplbGx5LWR1by1yZWd1bGFyXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwiZmlsbC1yZWd1bGFyXCIpIGZvbGRlciA9IFwiamVsbHktZmlsbC1yZWd1bGFyXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJqZWxseS1kdW9cIikge1xuICAgIGZvbGRlciA9IFwiamVsbHktZHVvLXJlZ3VsYXJcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcImplbGx5LWZpbGxcIikge1xuICAgIGZvbGRlciA9IFwiamVsbHktZmlsbC1yZWd1bGFyXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJub3Rkb2dcIikge1xuICAgIGlmICh2YXJpYW50ID09PSBcInNvbGlkXCIpIGZvbGRlciA9IFwibm90ZG9nLXNvbGlkXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwiZHVvLXNvbGlkXCIpIGZvbGRlciA9IFwibm90ZG9nLWR1by1zb2xpZFwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwibm90ZG9nLWR1b1wiKSB7XG4gICAgZm9sZGVyID0gXCJub3Rkb2ctZHVvLXNvbGlkXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJzbGFiXCIpIHtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJzb2xpZFwiIHx8IHZhcmlhbnQgPT09IFwicmVndWxhclwiKSBmb2xkZXIgPSBcInNsYWItcmVndWxhclwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcInByZXNzLXJlZ3VsYXJcIikgZm9sZGVyID0gXCJzbGFiLXByZXNzLXJlZ3VsYXJcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcInNsYWItcHJlc3NcIikge1xuICAgIGZvbGRlciA9IFwic2xhYi1wcmVzcy1yZWd1bGFyXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJ0aHVtYnByaW50XCIpIHtcbiAgICBmb2xkZXIgPSBcInRodW1icHJpbnQtbGlnaHRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcInV0aWxpdHlcIikge1xuICAgIGZvbGRlciA9IFwidXRpbGl0eS1zZW1pYm9sZFwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwidXRpbGl0eS1kdW9cIikge1xuICAgIGZvbGRlciA9IFwidXRpbGl0eS1kdW8tc2VtaWJvbGRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcInV0aWxpdHktZmlsbFwiKSB7XG4gICAgZm9sZGVyID0gXCJ1dGlsaXR5LWZpbGwtc2VtaWJvbGRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcIndoaXRlYm9hcmRcIikge1xuICAgIGZvbGRlciA9IFwid2hpdGVib2FyZC1zZW1pYm9sZFwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwiY2xhc3NpY1wiKSB7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwidGhpblwiKSBmb2xkZXIgPSBcInRoaW5cIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJsaWdodFwiKSBmb2xkZXIgPSBcImxpZ2h0XCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwicmVndWxhclwiKSBmb2xkZXIgPSBcInJlZ3VsYXJcIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJzb2xpZFwiKSBmb2xkZXIgPSBcInNvbGlkXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJkdW90b25lXCIpIHtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJ0aGluXCIpIGZvbGRlciA9IFwiZHVvdG9uZS10aGluXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwibGlnaHRcIikgZm9sZGVyID0gXCJkdW90b25lLWxpZ2h0XCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwicmVndWxhclwiKSBmb2xkZXIgPSBcImR1b3RvbmUtcmVndWxhclwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcInNvbGlkXCIpIGZvbGRlciA9IFwiZHVvdG9uZVwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwic2hhcnBcIikge1xuICAgIGlmICh2YXJpYW50ID09PSBcInRoaW5cIikgZm9sZGVyID0gXCJzaGFycC10aGluXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwibGlnaHRcIikgZm9sZGVyID0gXCJzaGFycC1saWdodFwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcInJlZ3VsYXJcIikgZm9sZGVyID0gXCJzaGFycC1yZWd1bGFyXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwic29saWRcIikgZm9sZGVyID0gXCJzaGFycC1zb2xpZFwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwic2hhcnAtZHVvdG9uZVwiKSB7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwidGhpblwiKSBmb2xkZXIgPSBcInNoYXJwLWR1b3RvbmUtdGhpblwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcImxpZ2h0XCIpIGZvbGRlciA9IFwic2hhcnAtZHVvdG9uZS1saWdodFwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcInJlZ3VsYXJcIikgZm9sZGVyID0gXCJzaGFycC1kdW90b25lLXJlZ3VsYXJcIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJzb2xpZFwiKSBmb2xkZXIgPSBcInNoYXJwLWR1b3RvbmUtc29saWRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcImJyYW5kc1wiKSB7XG4gICAgZm9sZGVyID0gXCJicmFuZHNcIjtcbiAgfVxuICByZXR1cm4gaXNQcm8gPyBgaHR0cHM6Ly9rYS1wLmZvbnRhd2Vzb21lLmNvbS9yZWxlYXNlcy92JHtGQV9WRVJTSU9OfS9zdmdzLyR7Zm9sZGVyfS8ke25hbWV9LnN2Zz90b2tlbj0ke2VuY29kZVVSSUNvbXBvbmVudChraXRDb2RlKX1gIDogYGh0dHBzOi8va2EtZi5mb250YXdlc29tZS5jb20vcmVsZWFzZXMvdiR7RkFfVkVSU0lPTn0vc3Zncy8ke2ZvbGRlcn0vJHtuYW1lfS5zdmdgO1xufVxudmFyIGxpYnJhcnkgPSB7XG4gIG5hbWU6IFwiZGVmYXVsdFwiLFxuICByZXNvbHZlcjogKG5hbWUsIGZhbWlseSA9IFwiY2xhc3NpY1wiLCB2YXJpYW50ID0gXCJzb2xpZFwiKSA9PiB7XG4gICAgcmV0dXJuIGdldEljb25VcmwobmFtZSwgZmFtaWx5LCB2YXJpYW50KTtcbiAgfSxcbiAgbXV0YXRvcjogKHN2ZywgaG9zdEVsKSA9PiB7XG4gICAgaWYgKGhvc3RFbD8uZmFtaWx5ICYmICFzdmcuaGFzQXR0cmlidXRlKFwiZGF0YS1kdW90b25lLWluaXRpYWxpemVkXCIpKSB7XG4gICAgICBjb25zdCB7IGZhbWlseSwgdmFyaWFudCB9ID0gaG9zdEVsO1xuICAgICAgaWYgKFxuICAgICAgICAvLyBEdW90b25lXG4gICAgICAgIGZhbWlseSA9PT0gXCJkdW90b25lXCIgfHwgLy8gU2hhcnAgZHVvdG9uZVxuICAgICAgICBmYW1pbHkgPT09IFwic2hhcnAtZHVvdG9uZVwiIHx8IC8vIE5vdGRvZyBkdW8gKGNvcnJlY3QgdXNhZ2U6IGZhbWlseT1cIm5vdGRvZy1kdW9cIilcbiAgICAgICAgZmFtaWx5ID09PSBcIm5vdGRvZy1kdW9cIiB8fCAvLyBOT1RFOiBmYW1pbHk9XCJub3Rkb2dcIiB2YXJpYW50PVwiZHVvLXNvbGlkXCIgaXMgZGVwcmVjYXRlZFxuICAgICAgICBmYW1pbHkgPT09IFwibm90ZG9nXCIgJiYgdmFyaWFudCA9PT0gXCJkdW8tc29saWRcIiB8fCAvLyBKZWxseSBkdW8gKGNvcnJlY3QgdXNhZ2U6IGZhbWlseT1cImplbGx5LWR1b1wiKVxuICAgICAgICBmYW1pbHkgPT09IFwiamVsbHktZHVvXCIgfHwgLy8gTk9URTogZmFtaWx5PVwiamVsbHlcIiB2YXJpYW50PVwiZHVvLXJlZ3VsYXJcIiBpcyBkZXByZWNhdGVkXG4gICAgICAgIGZhbWlseSA9PT0gXCJqZWxseVwiICYmIHZhcmlhbnQgPT09IFwiZHVvLXJlZ3VsYXJcIiB8fCAvLyBVdGlsaXR5IGR1byAoY29ycmVjdCB1c2FnZTogZmFtaWx5PVwidXRpbGl0eS1kdW9cIilcbiAgICAgICAgZmFtaWx5ID09PSBcInV0aWxpdHktZHVvXCIgfHwgLy8gVGh1bWJwcmludFxuICAgICAgICBmYW1pbHkgPT09IFwidGh1bWJwcmludFwiXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgcGF0aHMgPSBbLi4uc3ZnLnF1ZXJ5U2VsZWN0b3JBbGwoXCJwYXRoXCIpXTtcbiAgICAgICAgY29uc3QgcHJpbWFyeVBhdGggPSBwYXRocy5maW5kKChwKSA9PiAhcC5oYXNBdHRyaWJ1dGUoXCJvcGFjaXR5XCIpKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kYXJ5UGF0aCA9IHBhdGhzLmZpbmQoKHApID0+IHAuaGFzQXR0cmlidXRlKFwib3BhY2l0eVwiKSk7XG4gICAgICAgIGlmICghcHJpbWFyeVBhdGggfHwgIXNlY29uZGFyeVBhdGgpIHJldHVybjtcbiAgICAgICAgcHJpbWFyeVBhdGguc2V0QXR0cmlidXRlKFwiZGF0YS1kdW90b25lLXByaW1hcnlcIiwgXCJcIik7XG4gICAgICAgIHNlY29uZGFyeVBhdGguc2V0QXR0cmlidXRlKFwiZGF0YS1kdW90b25lLXNlY29uZGFyeVwiLCBcIlwiKTtcbiAgICAgICAgaWYgKGhvc3RFbC5zd2FwT3BhY2l0eSAmJiBwcmltYXJ5UGF0aCAmJiBzZWNvbmRhcnlQYXRoKSB7XG4gICAgICAgICAgY29uc3Qgb3JpZ2luYWxPcGFjaXR5ID0gc2Vjb25kYXJ5UGF0aC5nZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIpIHx8IFwiMC40XCI7XG4gICAgICAgICAgcHJpbWFyeVBhdGguc3R5bGUuc2V0UHJvcGVydHkoXCItLXBhdGgtb3BhY2l0eVwiLCBvcmlnaW5hbE9wYWNpdHkpO1xuICAgICAgICAgIHNlY29uZGFyeVBhdGguc3R5bGUuc2V0UHJvcGVydHkoXCItLXBhdGgtb3BhY2l0eVwiLCBcIjFcIik7XG4gICAgICAgIH1cbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZShcImRhdGEtZHVvdG9uZS1pbml0aWFsaXplZFwiLCBcIlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG52YXIgbGlicmFyeV9kZWZhdWx0X2RlZmF1bHQgPSBsaWJyYXJ5O1xuXG5leHBvcnQge1xuICBsaWJyYXJ5X2RlZmF1bHRfZGVmYXVsdFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb24vbGlicmFyeS5zeXN0ZW0udHNcbmZ1bmN0aW9uIGRhdGFVcmkoc3ZnKSB7XG4gIHJldHVybiBgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KHN2Zyl9YDtcbn1cbnZhciBpY29ucyA9IHtcbiAgLy9cbiAgLy8gU29saWQgdmFyaWFudFxuICAvL1xuICBzb2xpZDoge1xuICAgIGNoZWNrOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNDM0LjggNzAuMWMxNC4zIDEwLjQgMTcuNSAzMC40IDcuMSA0NC43bC0yNTYgMzUyYy01LjUgNy42LTE0IDEyLjMtMjMuNCAxMy4xcy0xOC41LTIuNy0yNS4xLTkuM2wtMTI4LTEyOGMtMTIuNS0xMi41LTEyLjUtMzIuOCAwLTQ1LjNzMzIuOC0xMi41IDQ1LjMgMGwxMDEuNSAxMDEuNSAyMzQtMzIxLjdjMTAuNC0xNC4zIDMwLjQtMTcuNSA0NC43LTcuMXpcIi8+PC9zdmc+YCxcbiAgICBcImNoZXZyb24tZG93blwiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjAxLjQgNDA2LjZjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBsMTkyLTE5MmMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM3MtMzIuOC0xMi41LTQ1LjMgMEwyMjQgMzM4LjcgNTQuNiAxNjkuNGMtMTIuNS0xMi41LTMyLjgtMTIuNS00NS4zIDBzLTEyLjUgMzIuOCAwIDQ1LjNsMTkyIDE5MnpcIi8+PC9zdmc+YCxcbiAgICBcImNoZXZyb24tbGVmdFwiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAzMjAgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNOS40IDIzMy40Yy0xMi41IDEyLjUtMTIuNSAzMi44IDAgNDUuM2wxOTIgMTkyYzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwczEyLjUtMzIuOCAwLTQ1LjNMNzcuMyAyNTYgMjQ2LjYgODYuNmMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM3MtMzIuOC0xMi41LTQ1LjMgMGwtMTkyIDE5MnpcIi8+PC9zdmc+YCxcbiAgICBcImNoZXZyb24tcmlnaHRcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMzIwIDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTMxMS4xIDIzMy40YzEyLjUgMTIuNSAxMi41IDMyLjggMCA0NS4zbC0xOTIgMTkyYy0xMi41IDEyLjUtMzIuOCAxMi41LTQ1LjMgMHMtMTIuNS0zMi44IDAtNDUuM0wyNDMuMiAyNTYgNzMuOSA4Ni42Yy0xMi41LTEyLjUtMTIuNS0zMi44IDAtNDUuM3MzMi44LTEyLjUgNDUuMyAwbDE5MiAxOTJ6XCIvPjwvc3ZnPmAsXG4gICAgY2lyY2xlOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMCAyNTZhMjU2IDI1NiAwIDEgMSA1MTIgMCAyNTYgMjU2IDAgMSAxIC01MTIgMHpcIi8+PC9zdmc+YCxcbiAgICBleWVkcm9wcGVyOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMzQxLjYgMjkuMmwtMTAxLjYgMTAxLjYtOS40LTkuNGMtMTIuNS0xMi41LTMyLjgtMTIuNS00NS4zIDBzLTEyLjUgMzIuOCAwIDQ1LjNsMTYwIDE2MGMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMHMxMi41LTMyLjggMC00NS4zbC05LjQtOS40IDEwMS42LTEwMS42YzM5LTM5IDM5LTEwMi4yIDAtMTQxLjFzLTEwMi4yLTM5LTE0MS4xIDB6TTU1LjQgMzIzLjNjLTE1IDE1LTIzLjQgMzUuNC0yMy40IDU2LjZsMCA0Mi40LTI2LjYgMzkuOWMtOC41IDEyLjctNi44IDI5LjYgNCA0MC40czI3LjcgMTIuNSA0MC40IDRsMzkuOS0yNi42IDQyLjQgMGMyMS4yIDAgNDEuNi04LjQgNTYuNi0yMy40bDEwOS40LTEwOS40LTQ1LjMtNDUuMy0xMDkuNCAxMDkuNGMtMyAzLTcuMSA0LjctMTEuMyA0LjdsLTM2LjEgMCAwLTM2LjFjMC00LjIgMS43LTguMyA0LjctMTEuM2wxMDkuNC0xMDkuNC00NS4zLTQ1LjMtMTA5LjQgMTA5LjR6XCIvPjwvc3ZnPmAsXG4gICAgZmlsZTogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xOTIgNjRDMTU2LjcgNjQgMTI4IDkyLjcgMTI4IDEyOEwxMjggNTEyQzEyOCA1NDcuMyAxNTYuNyA1NzYgMTkyIDU3Nkw0NDggNTc2QzQ4My4zIDU3NiA1MTIgNTQ3LjMgNTEyIDUxMkw1MTIgMjM0LjVDNTEyIDIxNy41IDUwNS4zIDIwMS4yIDQ5My4zIDE4OS4yTDM4Ni43IDgyLjdDMzc0LjcgNzAuNyAzNTguNSA2NCAzNDEuNSA2NEwxOTIgNjR6TTQ1My41IDI0MEwzNjAgMjQwQzM0Ni43IDI0MCAzMzYgMjI5LjMgMzM2IDIxNkwzMzYgMTIyLjVMNDUzLjUgMjQwelwiLz48L3N2Zz5gLFxuICAgIFwiZmlsZS1hdWRpb1wiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA2NDAgNjQwXCI+PCEtLSFGb250IEF3ZXNvbWUgRnJlZSA3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyOCAxMjhDMTI4IDkyLjcgMTU2LjcgNjQgMTkyIDY0TDM0MS41IDY0QzM1OC41IDY0IDM3NC44IDcwLjcgMzg2LjggODIuN0w0OTMuMyAxODkuM0M1MDUuMyAyMDEuMyA1MTIgMjE3LjYgNTEyIDIzNC42TDUxMiA1MTJDNTEyIDU0Ny4zIDQ4My4zIDU3NiA0NDggNTc2TDE5MiA1NzZDMTU2LjcgNTc2IDEyOCA1NDcuMyAxMjggNTEyTDEyOCAxMjh6TTMzNiAxMjIuNUwzMzYgMjE2QzMzNiAyMjkuMyAzNDYuNyAyNDAgMzYwIDI0MEw0NTMuNSAyNDBMMzM2IDEyMi41ek0zODkuOCAzMDcuN0MzODAuNyAzMDEuNCAzNjguMyAzMDMuNiAzNjIgMzEyLjdDMzU1LjcgMzIxLjggMzU3LjkgMzM0LjIgMzY3IDM0MC41QzM5MC45IDM1Ny4yIDQwNi40IDM4NC44IDQwNi40IDQxNkM0MDYuNCA0NDcuMiAzOTAuOCA0NzQuOSAzNjcgNDkxLjVDMzU3LjkgNDk3LjggMzU1LjcgNTEwLjMgMzYyIDUxOS4zQzM2OC4zIDUyOC4zIDM4MC44IDUzMC42IDM4OS44IDUyNC4zQzQyMy45IDUwMC41IDQ0Ni40IDQ2MC44IDQ0Ni40IDQxNkM0NDYuNCAzNzEuMiA0MjQgMzMxLjUgMzg5LjggMzA3Ljd6TTIwOCAzNzZDMTk5LjIgMzc2IDE5MiAzODMuMiAxOTIgMzkyTDE5MiA0NDBDMTkyIDQ0OC44IDE5OS4yIDQ1NiAyMDggNDU2TDIzMiA0NTZMMjU5LjIgNDkwQzI2Mi4yIDQ5My44IDI2Ni44IDQ5NiAyNzEuNyA0OTZMMjcyIDQ5NkMyODAuOCA0OTYgMjg4IDQ4OC44IDI4OCA0ODBMMjg4IDM1MkMyODggMzQzLjIgMjgwLjggMzM2IDI3MiAzMzZMMjcxLjcgMzM2QzI2Ni44IDMzNiAyNjIuMiAzMzguMiAyNTkuMiAzNDJMMjMyIDM3NkwyMDggMzc2ek0zMzYgNDQ4LjJDMzM2IDQ1OC45IDM0Ni41IDQ2Ni40IDM1NC45IDQ1OS44QzM2Ny44IDQ0OS41IDM3NiA0MzMuNyAzNzYgNDE2QzM3NiAzOTguMyAzNjcuOCAzODIuNSAzNTQuOSAzNzIuMkMzNDYuNSAzNjUuNSAzMzYgMzczLjEgMzM2IDM4My44TDMzNiA0NDguM3pcIi8+PC9zdmc+YCxcbiAgICBcImZpbGUtY29kZVwiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA2NDAgNjQwXCI+PCEtLSFGb250IEF3ZXNvbWUgRnJlZSA3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyOCAxMjhDMTI4IDkyLjcgMTU2LjcgNjQgMTkyIDY0TDM0MS41IDY0QzM1OC41IDY0IDM3NC44IDcwLjcgMzg2LjggODIuN0w0OTMuMyAxODkuM0M1MDUuMyAyMDEuMyA1MTIgMjE3LjYgNTEyIDIzNC42TDUxMiA1MTJDNTEyIDU0Ny4zIDQ4My4zIDU3NiA0NDggNTc2TDE5MiA1NzZDMTU2LjcgNTc2IDEyOCA1NDcuMyAxMjggNTEyTDEyOCAxMjh6TTMzNiAxMjIuNUwzMzYgMjE2QzMzNiAyMjkuMyAzNDYuNyAyNDAgMzYwIDI0MEw0NTMuNSAyNDBMMzM2IDEyMi41ek0yODIuMiAzNTkuNkMyOTAuOCAzNDkuNSAyODkuNyAzMzQuNCAyNzkuNiAzMjUuOEMyNjkuNSAzMTcuMiAyNTQuNCAzMTguMyAyNDUuOCAzMjguNEwxOTcuOCAzODQuNEMxOTAuMSAzOTMuNCAxOTAuMSA0MDYuNiAxOTcuOCA0MTUuNkwyNDUuOCA0NzEuNkMyNTQuNCA0ODEuNyAyNjkuNiA0ODIuOCAyNzkuNiA0NzQuMkMyODkuNiA0NjUuNiAyOTAuOCA0NTAuNCAyODIuMiA0NDAuNEwyNDcuNiA0MDBMMjgyLjIgMzU5LjZ6TTM5NC4yIDMyOC40QzM4NS42IDMxOC4zIDM3MC40IDMxNy4yIDM2MC40IDMyNS44QzM1MC40IDMzNC40IDM0OS4yIDM0OS42IDM1Ny44IDM1OS42TDM5Mi40IDQwMEwzNTcuOCA0NDAuNEMzNDkuMiA0NTAuNSAzNTAuMyA0NjUuNiAzNjAuNCA0NzQuMkMzNzAuNSA0ODIuOCAzODUuNiA0ODEuNyAzOTQuMiA0NzEuNkw0NDIuMiA0MTUuNkM0NDkuOSA0MDYuNiA0NDkuOSAzOTMuNCA0NDIuMiAzODQuNEwzOTQuMiAzMjguNHpcIi8+PC9zdmc+YCxcbiAgICBcImZpbGUtZXhjZWxcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMjggMTI4QzEyOCA5Mi43IDE1Ni43IDY0IDE5MiA2NEwzNDEuNSA2NEMzNTguNSA2NCAzNzQuOCA3MC43IDM4Ni44IDgyLjdMNDkzLjMgMTg5LjNDNTA1LjMgMjAxLjMgNTEyIDIxNy42IDUxMiAyMzQuNkw1MTIgNTEyQzUxMiA1NDcuMyA0ODMuMyA1NzYgNDQ4IDU3NkwxOTIgNTc2QzE1Ni43IDU3NiAxMjggNTQ3LjMgMTI4IDUxMkwxMjggMTI4ek0zMzYgMTIyLjVMMzM2IDIxNkMzMzYgMjI5LjMgMzQ2LjcgMjQwIDM2MCAyNDBMNDUzLjUgMjQwTDMzNiAxMjIuNXpNMjkyIDMzMC43QzI4NC42IDMxOS43IDI2OS43IDMxNi43IDI1OC43IDMyNEMyNDcuNyAzMzEuMyAyNDQuNyAzNDYuMyAyNTIgMzU3LjNMMjkxLjIgNDE2TDI1MiA0NzQuN0MyNDQuNiA0ODUuNyAyNDcuNiA1MDAuNiAyNTguNyA1MDhDMjY5LjggNTE1LjQgMjg0LjYgNTEyLjQgMjkyIDUwMS4zTDMyMCA0NTkuM0wzNDggNTAxLjNDMzU1LjQgNTEyLjMgMzcwLjMgNTE1LjMgMzgxLjMgNTA4QzM5Mi4zIDUwMC43IDM5NS4zIDQ4NS43IDM4OCA0NzQuN0wzNDguOCA0MTZMMzg4IDM1Ny4zQzM5NS40IDM0Ni4zIDM5Mi40IDMzMS40IDM4MS4zIDMyNEMzNzAuMiAzMTYuNiAzNTUuNCAzMTkuNiAzNDggMzMwLjdMMzIwIDM3Mi43TDI5MiAzMzAuN3pcIi8+PC9zdmc+YCxcbiAgICBcImZpbGUtaW1hZ2VcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMjggMTI4QzEyOCA5Mi43IDE1Ni43IDY0IDE5MiA2NEwzNDEuNSA2NEMzNTguNSA2NCAzNzQuOCA3MC43IDM4Ni44IDgyLjdMNDkzLjMgMTg5LjNDNTA1LjMgMjAxLjMgNTEyIDIxNy42IDUxMiAyMzQuNkw1MTIgNTEyQzUxMiA1NDcuMyA0ODMuMyA1NzYgNDQ4IDU3NkwxOTIgNTc2QzE1Ni43IDU3NiAxMjggNTQ3LjMgMTI4IDUxMkwxMjggMTI4ek0zMzYgMTIyLjVMMzM2IDIxNkMzMzYgMjI5LjMgMzQ2LjcgMjQwIDM2MCAyNDBMNDUzLjUgMjQwTDMzNiAxMjIuNXpNMjU2IDMyMEMyNTYgMzAyLjMgMjQxLjcgMjg4IDIyNCAyODhDMjA2LjMgMjg4IDE5MiAzMDIuMyAxOTIgMzIwQzE5MiAzMzcuNyAyMDYuMyAzNTIgMjI0IDM1MkMyNDEuNyAzNTIgMjU2IDMzNy43IDI1NiAzMjB6TTIyMC42IDUxMkw0MTkuNCA1MTJDNDM1LjIgNTEyIDQ0OCA0OTkuMiA0NDggNDgzLjRDNDQ4IDQ3Ni4xIDQ0NS4yIDQ2OSA0NDAuMSA0NjMuN0wzNDMuMyAzNjEuOUMzMzcuMyAzNTUuNiAzMjguOSAzNTIgMzIwLjEgMzUyTDMxOS44IDM1MkMzMTEgMzUyIDMwMi43IDM1NS42IDI5Ni42IDM2MS45TDE5OS45IDQ2My43QzE5NC44IDQ2OSAxOTIgNDc2LjEgMTkyIDQ4My40QzE5MiA0OTkuMiAyMDQuOCA1MTIgMjIwLjYgNTEyelwiLz48L3N2Zz5gLFxuICAgIFwiZmlsZS1wZGZcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMjggNjRDOTIuNyA2NCA2NCA5Mi43IDY0IDEyOEw2NCA1MTJDNjQgNTQ3LjMgOTIuNyA1NzYgMTI4IDU3NkwyMDggNTc2TDIwOCA0NjRDMjA4IDQyOC43IDIzNi43IDQwMCAyNzIgNDAwTDQ0OCA0MDBMNDQ4IDIzNC41QzQ0OCAyMTcuNSA0NDEuMyAyMDEuMiA0MjkuMyAxODkuMkwzMjIuNyA4Mi43QzMxMC43IDcwLjcgMjk0LjUgNjQgMjc3LjUgNjRMMTI4IDY0ek0zODkuNSAyNDBMMjk2IDI0MEMyODIuNyAyNDAgMjcyIDIyOS4zIDI3MiAyMTZMMjcyIDEyMi41TDM4OS41IDI0MHpNMjcyIDQ0NEMyNjEgNDQ0IDI1MiA0NTMgMjUyIDQ2NEwyNTIgNTkyQzI1MiA2MDMgMjYxIDYxMiAyNzIgNjEyQzI4MyA2MTIgMjkyIDYwMyAyOTIgNTkyTDI5MiA1NjRMMzA0IDU2NEMzMzcuMSA1NjQgMzY0IDUzNy4xIDM2NCA1MDRDMzY0IDQ3MC45IDMzNy4xIDQ0NCAzMDQgNDQ0TDI3MiA0NDR6TTMwNCA1MjRMMjkyIDUyNEwyOTIgNDg0TDMwNCA0ODRDMzE1IDQ4NCAzMjQgNDkzIDMyNCA1MDRDMzI0IDUxNSAzMTUgNTI0IDMwNCA1MjR6TTQwMCA0NDRDMzg5IDQ0NCAzODAgNDUzIDM4MCA0NjRMMzgwIDU5MkMzODAgNjAzIDM4OSA2MTIgNDAwIDYxMkw0MzIgNjEyQzQ2MC43IDYxMiA0ODQgNTg4LjcgNDg0IDU2MEw0ODQgNDk2QzQ4NCA0NjcuMyA0NjAuNyA0NDQgNDMyIDQ0NEw0MDAgNDQ0ek00MjAgNTcyTDQyMCA0ODRMNDMyIDQ4NEM0MzguNiA0ODQgNDQ0IDQ4OS40IDQ0NCA0OTZMNDQ0IDU2MEM0NDQgNTY2LjYgNDM4LjYgNTcyIDQzMiA1NzJMNDIwIDU3MnpNNTA4IDQ2NEw1MDggNTkyQzUwOCA2MDMgNTE3IDYxMiA1MjggNjEyQzUzOSA2MTIgNTQ4IDYwMyA1NDggNTkyTDU0OCA1NDhMNTc2IDU0OEM1ODcgNTQ4IDU5NiA1MzkgNTk2IDUyOEM1OTYgNTE3IDU4NyA1MDggNTc2IDUwOEw1NDggNTA4TDU0OCA0ODRMNTc2IDQ4NEM1ODcgNDg0IDU5NiA0NzUgNTk2IDQ2NEM1OTYgNDUzIDU4NyA0NDQgNTc2IDQ0NEw1MjggNDQ0QzUxNyA0NDQgNTA4IDQ1MyA1MDggNDY0elwiLz48L3N2Zz5gLFxuICAgIFwiZmlsZS1wb3dlcnBvaW50XCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTI4IDEyOEMxMjggOTIuNyAxNTYuNyA2NCAxOTIgNjRMMzQxLjUgNjRDMzU4LjUgNjQgMzc0LjggNzAuNyAzODYuOCA4Mi43TDQ5My4zIDE4OS4zQzUwNS4zIDIwMS4zIDUxMiAyMTcuNiA1MTIgMjM0LjZMNTEyIDUxMkM1MTIgNTQ3LjMgNDgzLjMgNTc2IDQ0OCA1NzZMMTkyIDU3NkMxNTYuNyA1NzYgMTI4IDU0Ny4zIDEyOCA1MTJMMTI4IDEyOHpNMzM2IDEyMi41TDMzNiAyMTZDMzM2IDIyOS4zIDM0Ni43IDI0MCAzNjAgMjQwTDQ1My41IDI0MEwzMzYgMTIyLjV6TTI4MCAzMjBDMjY2LjcgMzIwIDI1NiAzMzAuNyAyNTYgMzQ0TDI1NiA0ODhDMjU2IDUwMS4zIDI2Ni43IDUxMiAyODAgNTEyQzI5My4zIDUxMiAzMDQgNTAxLjMgMzA0IDQ4OEwzMDQgNDY0TDMyOCA0NjRDMzY3LjggNDY0IDQwMCA0MzEuOCA0MDAgMzkyQzQwMCAzNTIuMiAzNjcuOCAzMjAgMzI4IDMyMEwyODAgMzIwek0zMjggNDE2TDMwNCA0MTZMMzA0IDM2OEwzMjggMzY4QzM0MS4zIDM2OCAzNTIgMzc4LjcgMzUyIDM5MkMzNTIgNDA1LjMgMzQxLjMgNDE2IDMyOCA0MTZ6XCIvPjwvc3ZnPmAsXG4gICAgXCJmaWxlLXZpZGVvXCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTI4IDEyOEMxMjggOTIuNyAxNTYuNyA2NCAxOTIgNjRMMzQxLjUgNjRDMzU4LjUgNjQgMzc0LjggNzAuNyAzODYuOCA4Mi43TDQ5My4zIDE4OS4zQzUwNS4zIDIwMS4zIDUxMiAyMTcuNiA1MTIgMjM0LjZMNTEyIDUxMkM1MTIgNTQ3LjMgNDgzLjMgNTc2IDQ0OCA1NzZMMTkyIDU3NkMxNTYuNyA1NzYgMTI4IDU0Ny4zIDEyOCA1MTJMMTI4IDEyOHpNMzM2IDEyMi41TDMzNiAyMTZDMzM2IDIyOS4zIDM0Ni43IDI0MCAzNjAgMjQwTDQ1My41IDI0MEwzMzYgMTIyLjV6TTIwOCAzNjhMMjA4IDQ2NEMyMDggNDgxLjcgMjIyLjMgNDk2IDI0MCA0OTZMMzM2IDQ5NkMzNTMuNyA0OTYgMzY4IDQ4MS43IDM2OCA0NjRMMzY4IDQ0MEw0MDMgNDc1QzQwNi4yIDQ3OC4yIDQxMC41IDQ4MCA0MTUgNDgwQzQyNC40IDQ4MCA0MzIgNDcyLjQgNDMyIDQ2M0w0MzIgMzY4LjlDNDMyIDM1OS41IDQyNC40IDM1MS45IDQxNSAzNTEuOUM0MTAuNSAzNTEuOSA0MDYuMiAzNTMuNyA0MDMgMzU2LjlMMzY4IDM5MS45TDM2OCAzNjcuOUMzNjggMzUwLjIgMzUzLjcgMzM1LjkgMzM2IDMzNS45TDI0MCAzMzUuOUMyMjIuMyAzMzUuOSAyMDggMzUwLjIgMjA4IDM2Ny45elwiLz48L3N2Zz5gLFxuICAgIFwiZmlsZS13b3JkXCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTI4IDEyOEMxMjggOTIuNyAxNTYuNyA2NCAxOTIgNjRMMzQxLjUgNjRDMzU4LjUgNjQgMzc0LjggNzAuNyAzODYuOCA4Mi43TDQ5My4zIDE4OS4zQzUwNS4zIDIwMS4zIDUxMiAyMTcuNiA1MTIgMjM0LjZMNTEyIDUxMkM1MTIgNTQ3LjMgNDgzLjMgNTc2IDQ0OCA1NzZMMTkyIDU3NkMxNTYuNyA1NzYgMTI4IDU0Ny4zIDEyOCA1MTJMMTI4IDEyOHpNMzM2IDEyMi41TDMzNiAyMTZDMzM2IDIyOS4zIDM0Ni43IDI0MCAzNjAgMjQwTDQ1My41IDI0MEwzMzYgMTIyLjV6TTI2My40IDMzOC44QzI2MC41IDMyNS45IDI0Ny43IDMxNy43IDIzNC44IDMyMC42QzIyMS45IDMyMy41IDIxMy43IDMzNi4zIDIxNi42IDM0OS4yTDI0OC42IDQ5My4yQzI1MC45IDUwMy43IDI2MCA1MTEuNCAyNzAuOCA1MTJDMjgxLjYgNTEyLjYgMjkxLjQgNTA1LjkgMjk0LjggNDk1LjZMMzIwIDQxOS45TDM0NS4yIDQ5NS42QzM0OC42IDUwNS44IDM1OC40IDUxMi41IDM2OS4yIDUxMkMzODAgNTExLjUgMzg5LjEgNTAzLjggMzkxLjQgNDkzLjJMNDIzLjQgMzQ5LjJDNDI2LjMgMzM2LjMgNDE4LjEgMzIzLjQgNDA1LjIgMzIwLjZDMzkyLjMgMzE3LjggMzc5LjQgMzI1LjkgMzc2LjYgMzM4LjhMMzYzLjQgMzk4LjJMMzQyLjggMzM2LjRDMzM5LjUgMzI2LjYgMzMwLjQgMzIwIDMyMCAzMjBDMzA5LjYgMzIwIDMwMC41IDMyNi42IDI5Ny4yIDMzNi40TDI3Ni42IDM5OC4yTDI2My40IDMzOC44elwiLz48L3N2Zz5gLFxuICAgIFwiZmlsZS16aXBwZXJcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMjggMTI4QzEyOCA5Mi43IDE1Ni43IDY0IDE5MiA2NEwzNDEuNSA2NEMzNTguNSA2NCAzNzQuOCA3MC43IDM4Ni44IDgyLjdMNDkzLjMgMTg5LjNDNTA1LjMgMjAxLjMgNTEyIDIxNy42IDUxMiAyMzQuNkw1MTIgNTEyQzUxMiA1NDcuMyA0ODMuMyA1NzYgNDQ4IDU3NkwxOTIgNTc2QzE1Ni43IDU3NiAxMjggNTQ3LjMgMTI4IDUxMkwxMjggMTI4ek0zMzYgMTIyLjVMMzM2IDIxNkMzMzYgMjI5LjMgMzQ2LjcgMjQwIDM2MCAyNDBMNDUzLjUgMjQwTDMzNiAxMjIuNXpNMTkyIDEzNkMxOTIgMTQ5LjMgMjAyLjcgMTYwIDIxNiAxNjBMMjY0IDE2MEMyNzcuMyAxNjAgMjg4IDE0OS4zIDI4OCAxMzZDMjg4IDEyMi43IDI3Ny4zIDExMiAyNjQgMTEyTDIxNiAxMTJDMjAyLjcgMTEyIDE5MiAxMjIuNyAxOTIgMTM2ek0xOTIgMjMyQzE5MiAyNDUuMyAyMDIuNyAyNTYgMjE2IDI1NkwyNjQgMjU2QzI3Ny4zIDI1NiAyODggMjQ1LjMgMjg4IDIzMkMyODggMjE4LjcgMjc3LjMgMjA4IDI2NCAyMDhMMjE2IDIwOEMyMDIuNyAyMDggMTkyIDIxOC43IDE5MiAyMzJ6TTI1NiAzMDRMMjI0IDMwNEMyMDYuMyAzMDQgMTkyIDMxOC4zIDE5MiAzMzZMMTkyIDM4NEMxOTIgNDEwLjUgMjEzLjUgNDMyIDI0MCA0MzJDMjY2LjUgNDMyIDI4OCA0MTAuNSAyODggMzg0TDI4OCAzMzZDMjg4IDMxOC4zIDI3My43IDMwNCAyNTYgMzA0ek0yNDAgMzY4QzI0OC44IDM2OCAyNTYgMzc1LjIgMjU2IDM4NEMyNTYgMzkyLjggMjQ4LjggNDAwIDI0MCA0MDBDMjMxLjIgNDAwIDIyNCAzOTIuOCAyMjQgMzg0QzIyNCAzNzUuMiAyMzEuMiAzNjggMjQwIDM2OHpcIi8+PC9zdmc+YCxcbiAgICBcImdyaXAtdmVydGljYWxcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMzIwIDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyOCA0MGMwLTIyLjEtMTcuOS00MC00MC00MEw0MCAwQzE3LjkgMCAwIDE3LjkgMCA0MEwwIDg4YzAgMjIuMSAxNy45IDQwIDQwIDQwbDQ4IDBjMjIuMSAwIDQwLTE3LjkgNDAtNDBsMC00OHptMCAxOTJjMC0yMi4xLTE3LjktNDAtNDAtNDBsLTQ4IDBjLTIyLjEgMC00MCAxNy45LTQwIDQwbDAgNDhjMCAyMi4xIDE3LjkgNDAgNDAgNDBsNDggMGMyMi4xIDAgNDAtMTcuOSA0MC00MGwwLTQ4ek0wIDQyNGwwIDQ4YzAgMjIuMSAxNy45IDQwIDQwIDQwbDQ4IDBjMjIuMSAwIDQwLTE3LjkgNDAtNDBsMC00OGMwLTIyLjEtMTcuOS00MC00MC00MGwtNDggMGMtMjIuMSAwLTQwIDE3LjktNDAgNDB6TTMyMCA0MGMwLTIyLjEtMTcuOS00MC00MC00MEwyMzIgMGMtMjIuMSAwLTQwIDE3LjktNDAgNDBsMCA0OGMwIDIyLjEgMTcuOSA0MCA0MCA0MGw0OCAwYzIyLjEgMCA0MC0xNy45IDQwLTQwbDAtNDh6TTE5MiAyMzJsMCA0OGMwIDIyLjEgMTcuOSA0MCA0MCA0MGw0OCAwYzIyLjEgMCA0MC0xNy45IDQwLTQwbDAtNDhjMC0yMi4xLTE3LjktNDAtNDAtNDBsLTQ4IDBjLTIyLjEgMC00MCAxNy45LTQwIDQwek0zMjAgNDI0YzAtMjIuMS0xNy45LTQwLTQwLTQwbC00OCAwYy0yMi4xIDAtNDAgMTcuOS00MCA0MGwwIDQ4YzAgMjIuMSAxNy45IDQwIDQwIDQwbDQ4IDBjMjIuMSAwIDQwLTE3LjkgNDAtNDBsMC00OHpcIi8+PC9zdmc+YCxcbiAgICBpbmRldGVybWluYXRlOiBgPHN2ZyBwYXJ0PVwiaW5kZXRlcm1pbmF0ZS1pY29uXCIgY2xhc3M9XCJpY29uXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiPjxnIHN0cm9rZT1cIm5vbmVcIiBzdHJva2Utd2lkdGg9XCIxXCIgZmlsbD1cIm5vbmVcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiPjxnIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIj48ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMi4yODU3MTQgNi44NTcxNDMpXCI+PHBhdGggZD1cIk0xMC4yODU3MTQzLDEuMTQyODU3MTQgTDEuMTQyODU3MTQsMS4xNDI4NTcxNFwiLz48L2c+PC9nPjwvZz48L3N2Zz5gLFxuICAgIG1pbnVzOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMCAyNTZjMC0xNy43IDE0LjMtMzIgMzItMzJsMzg0IDBjMTcuNyAwIDMyIDE0LjMgMzIgMzJzLTE0LjMgMzItMzIgMzJMMzIgMjg4Yy0xNy43IDAtMzItMTQuMy0zMi0zMnpcIi8+PC9zdmc+YCxcbiAgICBwYXVzZTogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMzg0IDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTQ4IDMyQzIxLjUgMzIgMCA1My41IDAgODBMMCA0MzJjMCAyNi41IDIxLjUgNDggNDggNDhsNjQgMGMyNi41IDAgNDgtMjEuNSA0OC00OGwwLTM1MmMwLTI2LjUtMjEuNS00OC00OC00OEw0OCAzMnptMjI0IDBjLTI2LjUgMC00OCAyMS41LTQ4IDQ4bDAgMzUyYzAgMjYuNSAyMS41IDQ4IDQ4IDQ4bDY0IDBjMjYuNSAwIDQ4LTIxLjUgNDgtNDhsMC0zNTJjMC0yNi41LTIxLjUtNDgtNDgtNDhsLTY0IDB6XCIvPjwvc3ZnPmAsXG4gICAgcGxheTogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTkxLjIgMzYuOWMtMTIuNC02LjgtMjcuNC02LjUtMzkuNiAuN1MzMiA1Ny45IDMyIDcybDAgMzY4YzAgMTQuMSA3LjUgMjcuMiAxOS42IDM0LjRzMjcuMiA3LjUgMzkuNiAuN2wzMzYtMTg0YzEyLjgtNyAyMC44LTIwLjUgMjAuOC0zNS4xcy04LTI4LjEtMjAuOC0zNS4xbC0zMzYtMTg0elwiLz48L3N2Zz5gLFxuICAgIHBsdXM6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMzUyIDEyOEMzNTIgMTEwLjMgMzM3LjcgOTYgMzIwIDk2QzMwMi4zIDk2IDI4OCAxMTAuMyAyODggMTI4TDI4OCAyODhMMTI4IDI4OEMxMTAuMyAyODggOTYgMzAyLjMgOTYgMzIwQzk2IDMzNy43IDExMC4zIDM1MiAxMjggMzUyTDI4OCAzNTJMMjg4IDUxMkMyODggNTI5LjcgMzAyLjMgNTQ0IDMyMCA1NDRDMzM3LjcgNTQ0IDM1MiA1MjkuNyAzNTIgNTEyTDM1MiAzNTJMNTEyIDM1MkM1MjkuNyAzNTIgNTQ0IDMzNy43IDU0NCAzMjBDNTQ0IDMwMi4zIDUyOS43IDI4OCA1MTIgMjg4TDM1MiAyODhMMzUyIDEyOHpcIi8+PC9zdmc+YCxcbiAgICBzdGFyOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1NzYgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMzA5LjUtMTguOWMtNC4xLTgtMTIuNC0xMy4xLTIxLjQtMTMuMXMtMTcuMyA1LjEtMjEuNCAxMy4xTDE5My4xIDEyNS4zIDMzLjIgMTUwLjdjLTguOSAxLjQtMTYuMyA3LjctMTkuMSAxNi4zcy0uNSAxOCA1LjggMjQuNGwxMTQuNCAxMTQuNS0yNS4yIDE1OS45Yy0xLjQgOC45IDIuMyAxNy45IDkuNiAyMy4yczE2LjkgNi4xIDI1IDJMMjg4LjEgNDE3LjYgNDMyLjQgNDkxYzggNC4xIDE3LjcgMy4zIDI1LTJzMTEtMTQuMiA5LjYtMjMuMkw0NDEuNyAzMDUuOSA1NTYuMSAxOTEuNGM2LjQtNi40IDguNi0xNS44IDUuOC0yNC40cy0xMC4xLTE0LjktMTkuMS0xNi4zTDM4MyAxMjUuMyAzMDkuNS0xOC45elwiLz48L3N2Zz5gLFxuICAgIHVwbG9hZDogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0zNTIgMTczLjNMMzUyIDM4NEMzNTIgNDAxLjcgMzM3LjcgNDE2IDMyMCA0MTZDMzAyLjMgNDE2IDI4OCA0MDEuNyAyODggMzg0TDI4OCAxNzMuM0wyNDYuNiAyMTQuN0MyMzQuMSAyMjcuMiAyMTMuOCAyMjcuMiAyMDEuMyAyMTQuN0MxODguOCAyMDIuMiAxODguOCAxODEuOSAyMDEuMyAxNjkuNEwyOTcuMyA3My40QzMwOS44IDYwLjkgMzMwLjEgNjAuOSAzNDIuNiA3My40TDQzOC42IDE2OS40QzQ1MS4xIDE4MS45IDQ1MS4xIDIwMi4yIDQzOC42IDIxNC43QzQyNi4xIDIyNy4yIDQwNS44IDIyNy4yIDM5My4zIDIxNC43TDM1MiAxNzMuM3pNMzIwIDQ2NEMzNjQuMiA0NjQgNDAwIDQyOC4yIDQwMCAzODRMNDgwIDM4NEM1MTUuMyAzODQgNTQ0IDQxMi43IDU0NCA0NDhMNTQ0IDQ4MEM1NDQgNTE1LjMgNTE1LjMgNTQ0IDQ4MCA1NDRMMTYwIDU0NEMxMjQuNyA1NDQgOTYgNTE1LjMgOTYgNDgwTDk2IDQ0OEM5NiA0MTIuNyAxMjQuNyAzODQgMTYwIDM4NEwyNDAgMzg0QzI0MCA0MjguMiAyNzUuOCA0NjQgMzIwIDQ2NHpNNDY0IDQ4OEM0NzcuMyA0ODggNDg4IDQ3Ny4zIDQ4OCA0NjRDNDg4IDQ1MC43IDQ3Ny4zIDQ0MCA0NjQgNDQwQzQ1MC43IDQ0MCA0NDAgNDUwLjcgNDQwIDQ2NEM0NDAgNDc3LjMgNDUwLjcgNDg4IDQ2NCA0ODh6XCIvPjwvc3ZnPmAsXG4gICAgdXNlcjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTIyNCAyNDhhMTIwIDEyMCAwIDEgMCAwLTI0MCAxMjAgMTIwIDAgMSAwIDAgMjQwem0tMjkuNyA1NkM5NS44IDMwNCAxNiAzODMuOCAxNiA0ODIuMyAxNiA0OTguNyAyOS4zIDUxMiA0NS43IDUxMmwzNTYuNiAwYzE2LjQgMCAyOS43LTEzLjMgMjkuNy0yOS43IDAtOTguNS03OS44LTE3OC4zLTE3OC4zLTE3OC4zbC01OS40IDB6XCIvPjwvc3ZnPmAsXG4gICAgeG1hcms6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDM4NCA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk01NS4xIDczLjRjLTEyLjUtMTIuNS0zMi44LTEyLjUtNDUuMyAwcy0xMi41IDMyLjggMCA0NS4zTDE0Ny4yIDI1NiA5LjkgMzkzLjRjLTEyLjUgMTIuNS0xMi41IDMyLjggMCA0NS4zczMyLjggMTIuNSA0NS4zIDBMMTkyLjUgMzAxLjMgMzI5LjkgNDM4LjZjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBzMTIuNS0zMi44IDAtNDUuM0wyMzcuOCAyNTYgMzc1LjEgMTE4LjZjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNzLTMyLjgtMTIuNS00NS4zIDBMMTkyLjUgMjEwLjcgNTUuMSA3My40elwiLz48L3N2Zz5gXG4gIH0sXG4gIC8vXG4gIC8vIFJlZ3VsYXIgdmFyaWFudFxuICAvL1xuICByZWd1bGFyOiB7XG4gICAgXCJjaXJjbGUtcXVlc3Rpb25cIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTQ2NCAyNTZhMjA4IDIwOCAwIDEgMCAtNDE2IDAgMjA4IDIwOCAwIDEgMCA0MTYgMHpNMCAyNTZhMjU2IDI1NiAwIDEgMSA1MTIgMCAyNTYgMjU2IDAgMSAxIC01MTIgMHptMjU2LTgwYy0xNy43IDAtMzIgMTQuMy0zMiAzMiAwIDEzLjMtMTAuNyAyNC0yNCAyNHMtMjQtMTAuNy0yNC0yNGMwLTQ0LjIgMzUuOC04MCA4MC04MHM4MCAzNS44IDgwIDgwYzAgNDcuMi0zNiA2Ny4yLTU2IDc0LjVsMCAzLjhjMCAxMy4zLTEwLjcgMjQtMjQgMjRzLTI0LTEwLjctMjQtMjRsMC04LjFjMC0yMC41IDE0LjgtMzUuMiAzMC4xLTQwLjIgNi40LTIuMSAxMy4yLTUuNSAxOC4yLTEwLjMgNC4zLTQuMiA3LjctMTAgNy43LTE5LjYgMC0xNy43LTE0LjMtMzItMzItMzJ6TTIyNCAzNjhhMzIgMzIgMCAxIDEgNjQgMCAzMiAzMiAwIDEgMSAtNjQgMHpcIi8+PC9zdmc+YCxcbiAgICBcImNpcmNsZS14bWFya1wiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjU2IDQ4YTIwOCAyMDggMCAxIDEgMCA0MTYgMjA4IDIwOCAwIDEgMSAwLTQxNnptMCA0NjRhMjU2IDI1NiAwIDEgMCAwLTUxMiAyNTYgMjU2IDAgMSAwIDAgNTEyek0xNjcgMTY3Yy05LjQgOS40LTkuNCAyNC42IDAgMzMuOWw1NSA1NS01NSA1NWMtOS40IDkuNC05LjQgMjQuNiAwIDMzLjlzMjQuNiA5LjQgMzMuOSAwbDU1LTU1IDU1IDU1YzkuNCA5LjQgMjQuNiA5LjQgMzMuOSAwczkuNC0yNC42IDAtMzMuOWwtNTUtNTUgNTUtNTVjOS40LTkuNCA5LjQtMjQuNiAwLTMzLjlzLTI0LjYtOS40LTMzLjkgMGwtNTUgNTUtNTUtNTVjLTkuNC05LjQtMjQuNi05LjQtMzMuOSAwelwiLz48L3N2Zz5gLFxuICAgIGNvcHk6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0zODQgMzM2bC0xOTIgMGMtOC44IDAtMTYtNy4yLTE2LTE2bDAtMjU2YzAtOC44IDcuMi0xNiAxNi0xNmwxMzMuNSAwYzQuMiAwIDguMyAxLjcgMTEuMyA0LjdsNTguNSA1OC41YzMgMyA0LjcgNy4xIDQuNyAxMS4zTDQwMCAzMjBjMCA4LjgtNy4yIDE2LTE2IDE2ek0xOTIgMzg0bDE5MiAwYzM1LjMgMCA2NC0yOC43IDY0LTY0bDAtMTk3LjVjMC0xNy02LjctMzMuMy0xOC43LTQ1LjNMMzcwLjcgMTguN0MzNTguNyA2LjcgMzQyLjUgMCAzMjUuNSAwTDE5MiAwYy0zNS4zIDAtNjQgMjguNy02NCA2NGwwIDI1NmMwIDM1LjMgMjguNyA2NCA2NCA2NHpNNjQgMTI4Yy0zNS4zIDAtNjQgMjguNy02NCA2NEwwIDQ0OGMwIDM1LjMgMjguNyA2NCA2NCA2NGwxOTIgMGMzNS4zIDAgNjQtMjguNyA2NC02NGwwLTE2LTQ4IDAgMCAxNmMwIDguOC03LjIgMTYtMTYgMTZMNjQgNDY0Yy04LjggMC0xNi03LjItMTYtMTZsMC0yNTZjMC04LjggNy4yLTE2IDE2LTE2bDE2IDAgMC00OC0xNiAwelwiLz48L3N2Zz5gLFxuICAgIGV5ZTogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTc2IDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI4OCA4MEMyMjIuOCA4MCAxNjkuMiAxMDkuNiAxMjguMSAxNDcuNyA4OS42IDE4My41IDYzIDIyNiA0OS40IDI1NiA2MyAyODYgODkuNiAzMjguNSAxMjguMSAzNjQuMyAxNjkuMiA0MDIuNCAyMjIuOCA0MzIgMjg4IDQzMnMxMTguOC0yOS42IDE1OS45LTY3LjdDNDg2LjQgMzI4LjUgNTEzIDI4NiA1MjYuNiAyNTYgNTEzIDIyNiA0ODYuNCAxODMuNSA0NDcuOSAxNDcuNyA0MDYuOCAxMDkuNiAzNTMuMiA4MCAyODggODB6TTk1LjQgMTEyLjZDMTQyLjUgNjguOCAyMDcuMiAzMiAyODggMzJzMTQ1LjUgMzYuOCAxOTIuNiA4MC42YzQ2LjggNDMuNSA3OC4xIDk1LjQgOTMgMTMxLjEgMy4zIDcuOSAzLjMgMTYuNyAwIDI0LjYtMTQuOSAzNS43LTQ2LjIgODcuNy05MyAxMzEuMS00Ny4xIDQzLjctMTExLjggODAuNi0xOTIuNiA4MC42UzE0Mi41IDQ0My4yIDk1LjQgMzk5LjRjLTQ2LjgtNDMuNS03OC4xLTk1LjQtOTMtMTMxLjEtMy4zLTcuOS0zLjMtMTYuNyAwLTI0LjYgMTQuOS0zNS43IDQ2LjItODcuNyA5My0xMzEuMXpNMjg4IDMzNmM0NC4yIDAgODAtMzUuOCA4MC04MCAwLTI5LjYtMTYuMS01NS41LTQwLTY5LjMtMS40IDU5LjctNDkuNiAxMDcuOS0xMDkuMyAxMDkuMyAxMy44IDIzLjkgMzkuNyA0MCA2OS4zIDQwem0tNzkuNi04OC40YzIuNSAuMyA1IC40IDcuNiAuNCAzNS4zIDAgNjQtMjguNyA2NC02NCAwLTIuNi0uMi01LjEtLjQtNy42LTM3LjQgMy45LTY3LjIgMzMuNy03MS4xIDcxLjF6bTQ1LjYtMTE1YzEwLjgtMyAyMi4yLTQuNSAzMy45LTQuNSA4LjggMCAxNy41IC45IDI1LjggMi42IC4zIC4xIC41IC4xIC44IC4yIDU3LjkgMTIuMiAxMDEuNCA2My43IDEwMS40IDEyNS4yIDAgNzAuNy01Ny4zIDEyOC0xMjggMTI4LTYxLjYgMC0xMTMtNDMuNS0xMjUuMi0xMDEuNC0xLjgtOC42LTIuOC0xNy41LTIuOC0yNi42IDAtMTEgMS40LTIxLjggNC0zMiAuMi0uNyAuMy0xLjMgLjUtMS45IDExLjktNDMuNCA0Ni4xLTc3LjYgODkuNS04OS41elwiLz48L3N2Zz5gLFxuICAgIFwiZXllLXNsYXNoXCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDU3NiA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00MS0yNC45Yy05LjQtOS40LTI0LjYtOS40LTMzLjkgMFMtMi4zLS4zIDcgOS4xbDUyOCA1MjhjOS40IDkuNCAyNC42IDkuNCAzMy45IDBzOS40LTI0LjYgMC0zMy45bC05Ni40LTk2LjRjMi43LTIuNCA1LjQtNC44IDgtNy4yIDQ2LjgtNDMuNSA3OC4xLTk1LjQgOTMtMTMxLjEgMy4zLTcuOSAzLjMtMTYuNyAwLTI0LjYtMTQuOS0zNS43LTQ2LjItODcuNy05My0xMzEuMS00Ny4xLTQzLjctMTExLjgtODAuNi0xOTIuNi04MC42LTU2LjggMC0xMDUuNiAxOC4yLTE0NiA0NC4yTDQxLTI0Ljl6TTE3Ni45IDExMS4xYzMyLjEtMTguOSA2OS4yLTMxLjEgMTExLjEtMzEuMSA2NS4yIDAgMTE4LjggMjkuNiAxNTkuOSA2Ny43IDM4LjUgMzUuNyA2NS4xIDc4LjMgNzguNiAxMDguMy0xMy42IDMwLTQwLjIgNzIuNS03OC42IDEwOC4zLTMuMSAyLjgtNi4yIDUuNi05LjQgOC40TDM5My44IDMyOGMxNC0yMC41IDIyLjItNDUuMyAyMi4yLTcyIDAtNzAuNy01Ny4zLTEyOC0xMjgtMTI4LTI2LjcgMC01MS41IDguMi03MiAyMi4ybC0zOS4xLTM5LjF6bTE4MiAxODJsLTEwOC0xMDhjMTEuMS01LjggMjMuNy05LjEgMzcuMS05LjEgNDQuMiAwIDgwIDM1LjggODAgODAgMCAxMy40LTMuMyAyNi05LjEgMzcuMXpNMTAzLjQgMTczLjJsLTM0LTM0Yy0zMi42IDM2LjgtNTUgNzUuOC02Ni45IDEwNC41LTMuMyA3LjktMy4zIDE2LjcgMCAyNC42IDE0LjkgMzUuNyA0Ni4yIDg3LjcgOTMgMTMxLjEgNDcuMSA0My43IDExMS44IDgwLjYgMTkyLjYgODAuNiAzNy4zIDAgNzEuMi03LjkgMTAxLjUtMjAuNkwzNTIuMiA0MjJjLTIwIDYuNC00MS40IDEwLTY0LjIgMTAtNjUuMiAwLTExOC44LTI5LjYtMTU5LjktNjcuNy0zOC41LTM1LjctNjUuMS03OC4zLTc4LjYtMTA4LjMgMTAuNC0yMy4xIDI4LjYtNTMuNiA1NC04Mi44elwiLz48L3N2Zz5gLFxuICAgIHN0YXI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDU3NiA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yODguMS0zMmM5IDAgMTcuMyA1LjEgMjEuNCAxMy4xTDM4MyAxMjUuMyA1NDIuOSAxNTAuN2M4LjkgMS40IDE2LjMgNy43IDE5LjEgMTYuM3MuNSAxOC01LjggMjQuNEw0NDEuNyAzMDUuOSA0NjcgNDY1LjhjMS40IDguOS0yLjMgMTcuOS05LjYgMjMuMnMtMTcgNi4xLTI1IDJMMjg4LjEgNDE3LjYgMTQzLjggNDkxYy04IDQuMS0xNy43IDMuMy0yNS0ycy0xMS0xNC4yLTkuNi0yMy4yTDEzNC40IDMwNS45IDIwIDE5MS40Yy02LjQtNi40LTguNi0xNS44LTUuOC0yNC40czEwLjEtMTQuOSAxOS4xLTE2LjNsMTU5LjktMjUuNCA3My42LTE0NC4yYzQuMS04IDEyLjQtMTMuMSAyMS40LTEzLjF6bTAgNzYuOEwyMzAuMyAxNThjLTMuNSA2LjgtMTAgMTEuNi0xNy42IDEyLjhsLTEyNS41IDIwIDg5LjggODkuOWM1LjQgNS40IDcuOSAxMy4xIDYuNyAyMC43bC0xOS44IDEyNS41IDExMy4zLTU3LjZjNi44LTMuNSAxNC45LTMuNSAyMS44IDBsMTEzLjMgNTcuNi0xOS44LTEyNS41Yy0xLjItNy42IDEuMy0xNS4zIDYuNy0yMC43bDg5LjgtODkuOS0xMjUuNS0yMGMtNy42LTEuMi0xNC4xLTYtMTcuNi0xMi44TDI4OC4xIDQ0Ljh6XCIvPjwvc3ZnPmBcbiAgfVxufTtcbnZhciBzeXN0ZW1MaWJyYXJ5ID0ge1xuICBuYW1lOiBcInN5c3RlbVwiLFxuICByZXNvbHZlcjogKG5hbWUsIF9mYW1pbHkgPSBcImNsYXNzaWNcIiwgdmFyaWFudCA9IFwic29saWRcIikgPT4ge1xuICAgIGxldCBjb2xsZWN0aW9uID0gaWNvbnNbdmFyaWFudF07XG4gICAgbGV0IHN2ZyA9IGNvbGxlY3Rpb25bbmFtZV0gPz8gaWNvbnMucmVndWxhcltuYW1lXSA/PyBpY29ucy5yZWd1bGFyW1wiY2lyY2xlLXF1ZXN0aW9uXCJdO1xuICAgIGlmIChzdmcpIHtcbiAgICAgIHJldHVybiBkYXRhVXJpKHN2Zyk7XG4gICAgfVxuICAgIHJldHVybiBcIlwiO1xuICB9XG59O1xudmFyIGxpYnJhcnlfc3lzdGVtX2RlZmF1bHQgPSBzeXN0ZW1MaWJyYXJ5O1xuXG5leHBvcnQge1xuICBpY29ucyxcbiAgbGlicmFyeV9zeXN0ZW1fZGVmYXVsdFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5pbXBvcnQge1xuICBsaWJyYXJ5X2RlZmF1bHRfZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay5KVlRBR1I1Qi5qc1wiO1xuaW1wb3J0IHtcbiAgbGlicmFyeV9zeXN0ZW1fZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay5LUE4zWVo2VS5qc1wiO1xuXG4vLyBzcmMvY29tcG9uZW50cy9pY29uL2xpYnJhcnkudHNcbnZhciBkZWZhdWx0SWNvbkZhbWlseSA9IFwiY2xhc3NpY1wiO1xudmFyIHJlZ2lzdHJ5ID0gW2xpYnJhcnlfZGVmYXVsdF9kZWZhdWx0LCBsaWJyYXJ5X3N5c3RlbV9kZWZhdWx0XTtcbnZhciB3YXRjaGVkSWNvbnMgPSBbXTtcbmZ1bmN0aW9uIHdhdGNoSWNvbihpY29uKSB7XG4gIHdhdGNoZWRJY29ucy5wdXNoKGljb24pO1xufVxuZnVuY3Rpb24gdW53YXRjaEljb24oaWNvbikge1xuICB3YXRjaGVkSWNvbnMgPSB3YXRjaGVkSWNvbnMuZmlsdGVyKChlbCkgPT4gZWwgIT09IGljb24pO1xufVxuZnVuY3Rpb24gZ2V0SWNvbkxpYnJhcnkobmFtZSkge1xuICByZXR1cm4gcmVnaXN0cnkuZmluZCgobGliKSA9PiBsaWIubmFtZSA9PT0gbmFtZSk7XG59XG5mdW5jdGlvbiByZWdpc3Rlckljb25MaWJyYXJ5KG5hbWUsIG9wdGlvbnMpIHtcbiAgdW5yZWdpc3Rlckljb25MaWJyYXJ5KG5hbWUpO1xuICByZWdpc3RyeS5wdXNoKHtcbiAgICBuYW1lLFxuICAgIHJlc29sdmVyOiBvcHRpb25zLnJlc29sdmVyLFxuICAgIG11dGF0b3I6IG9wdGlvbnMubXV0YXRvcixcbiAgICBzcHJpdGVTaGVldDogb3B0aW9ucy5zcHJpdGVTaGVldFxuICB9KTtcbiAgd2F0Y2hlZEljb25zLmZvckVhY2goKGljb24pID0+IHtcbiAgICBpZiAoaWNvbi5saWJyYXJ5ID09PSBuYW1lKSB7XG4gICAgICBpY29uLnNldEljb24oKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gdW5yZWdpc3Rlckljb25MaWJyYXJ5KG5hbWUpIHtcbiAgcmVnaXN0cnkgPSByZWdpc3RyeS5maWx0ZXIoKGxpYikgPT4gbGliLm5hbWUgIT09IG5hbWUpO1xufVxuZnVuY3Rpb24gc2V0RGVmYXVsdEljb25GYW1pbHkoZmFtaWx5KSB7XG4gIGRlZmF1bHRJY29uRmFtaWx5ID0gZmFtaWx5O1xuICB3YXRjaGVkSWNvbnMuZm9yRWFjaCgoaWNvbikgPT4gaWNvbi5zZXRJY29uKCkpO1xufVxuZnVuY3Rpb24gZ2V0RGVmYXVsdEljb25GYW1pbHkoKSB7XG4gIHJldHVybiBkZWZhdWx0SWNvbkZhbWlseTtcbn1cblxuZXhwb3J0IHtcbiAgd2F0Y2hJY29uLFxuICB1bndhdGNoSWNvbixcbiAgZ2V0SWNvbkxpYnJhcnksXG4gIHJlZ2lzdGVySWNvbkxpYnJhcnksXG4gIHVucmVnaXN0ZXJJY29uTGlicmFyeSxcbiAgc2V0RGVmYXVsdEljb25GYW1pbHksXG4gIGdldERlZmF1bHRJY29uRmFtaWx5XG59O1xuIiwgIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuXG5pbXBvcnQge1xuICBfJExILFxuICBQYXJ0LFxuICBEaXJlY3RpdmVQYXJlbnQsXG4gIENvbXBpbGVkVGVtcGxhdGVSZXN1bHQsXG4gIE1heWJlQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdCxcbiAgVW5jb21waWxlZFRlbXBsYXRlUmVzdWx0LFxufSBmcm9tICcuL2xpdC1odG1sLmpzJztcbmltcG9ydCB7XG4gIERpcmVjdGl2ZVJlc3VsdCxcbiAgRGlyZWN0aXZlQ2xhc3MsXG4gIFBhcnRJbmZvLFxuICBBdHRyaWJ1dGVQYXJ0SW5mbyxcbn0gZnJvbSAnLi9kaXJlY3RpdmUuanMnO1xudHlwZSBQcmltaXRpdmUgPSBudWxsIHwgdW5kZWZpbmVkIHwgYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8IHN5bWJvbCB8IGJpZ2ludDtcblxuY29uc3Qge19DaGlsZFBhcnQ6IENoaWxkUGFydH0gPSBfJExIO1xuXG50eXBlIENoaWxkUGFydCA9IEluc3RhbmNlVHlwZTx0eXBlb2YgQ2hpbGRQYXJ0PjtcblxuY29uc3QgRU5BQkxFX1NIQURZRE9NX05PUEFUQ0ggPSB0cnVlO1xuXG5jb25zdCB3cmFwID1cbiAgRU5BQkxFX1NIQURZRE9NX05PUEFUQ0ggJiZcbiAgd2luZG93LlNoYWR5RE9NPy5pblVzZSAmJlxuICB3aW5kb3cuU2hhZHlET00/Lm5vUGF0Y2ggPT09IHRydWVcbiAgICA/IHdpbmRvdy5TaGFkeURPTSEud3JhcFxuICAgIDogKG5vZGU6IE5vZGUpID0+IG5vZGU7XG5cbi8qKlxuICogVGVzdHMgaWYgYSB2YWx1ZSBpcyBhIHByaW1pdGl2ZSB2YWx1ZS5cbiAqXG4gKiBTZWUgaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdHlwZW9mLW9wZXJhdG9yXG4gKi9cbmV4cG9ydCBjb25zdCBpc1ByaW1pdGl2ZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFByaW1pdGl2ZSA9PlxuICB2YWx1ZSA9PT0gbnVsbCB8fCAodHlwZW9mIHZhbHVlICE9ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSAhPSAnZnVuY3Rpb24nKTtcblxuZXhwb3J0IGNvbnN0IFRlbXBsYXRlUmVzdWx0VHlwZSA9IHtcbiAgSFRNTDogMSxcbiAgU1ZHOiAyLFxuICBNQVRITUw6IDMsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBUZW1wbGF0ZVJlc3VsdFR5cGUgPVxuICAodHlwZW9mIFRlbXBsYXRlUmVzdWx0VHlwZSlba2V5b2YgdHlwZW9mIFRlbXBsYXRlUmVzdWx0VHlwZV07XG5cbnR5cGUgSXNUZW1wbGF0ZVJlc3VsdCA9IHtcbiAgKHZhbDogdW5rbm93bik6IHZhbCBpcyBNYXliZUNvbXBpbGVkVGVtcGxhdGVSZXN1bHQ7XG4gIDxUIGV4dGVuZHMgVGVtcGxhdGVSZXN1bHRUeXBlPihcbiAgICB2YWw6IHVua25vd24sXG4gICAgdHlwZTogVFxuICApOiB2YWwgaXMgVW5jb21waWxlZFRlbXBsYXRlUmVzdWx0PFQ+O1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIHZhbHVlIGlzIGEgVGVtcGxhdGVSZXN1bHQgb3IgYSBDb21waWxlZFRlbXBsYXRlUmVzdWx0LlxuICovXG5leHBvcnQgY29uc3QgaXNUZW1wbGF0ZVJlc3VsdDogSXNUZW1wbGF0ZVJlc3VsdCA9IChcbiAgdmFsdWU6IHVua25vd24sXG4gIHR5cGU/OiBUZW1wbGF0ZVJlc3VsdFR5cGVcbik6IHZhbHVlIGlzIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdCA9PlxuICB0eXBlID09PSB1bmRlZmluZWRcbiAgICA/IC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gICAgICAodmFsdWUgYXMgVW5jb21waWxlZFRlbXBsYXRlUmVzdWx0KT8uWydfJGxpdFR5cGUkJ10gIT09IHVuZGVmaW5lZFxuICAgIDogKHZhbHVlIGFzIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdCk/LlsnXyRsaXRUeXBlJCddID09PSB0eXBlO1xuXG4vKipcbiAqIFRlc3RzIGlmIGEgdmFsdWUgaXMgYSBDb21waWxlZFRlbXBsYXRlUmVzdWx0LlxuICovXG5leHBvcnQgY29uc3QgaXNDb21waWxlZFRlbXBsYXRlUmVzdWx0ID0gKFxuICB2YWx1ZTogdW5rbm93blxuKTogdmFsdWUgaXMgQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdCA9PiB7XG4gIHJldHVybiAodmFsdWUgYXMgQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdCk/LlsnXyRsaXRUeXBlJCddPy5oICE9IG51bGw7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIGEgdmFsdWUgaXMgYSBEaXJlY3RpdmVSZXN1bHQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0RpcmVjdGl2ZVJlc3VsdCA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIERpcmVjdGl2ZVJlc3VsdCA9PlxuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAodmFsdWUgYXMgRGlyZWN0aXZlUmVzdWx0KT8uWydfJGxpdERpcmVjdGl2ZSQnXSAhPT0gdW5kZWZpbmVkO1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgRGlyZWN0aXZlIGNsYXNzIGZvciBhIERpcmVjdGl2ZVJlc3VsdFxuICovXG5leHBvcnQgY29uc3QgZ2V0RGlyZWN0aXZlQ2xhc3MgPSAodmFsdWU6IHVua25vd24pOiBEaXJlY3RpdmVDbGFzcyB8IHVuZGVmaW5lZCA9PlxuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAodmFsdWUgYXMgRGlyZWN0aXZlUmVzdWx0KT8uWydfJGxpdERpcmVjdGl2ZSQnXTtcblxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIGEgcGFydCBoYXMgb25seSBhIHNpbmdsZS1leHByZXNzaW9uIHdpdGggbm8gc3RyaW5ncyB0b1xuICogaW50ZXJwb2xhdGUgYmV0d2Vlbi5cbiAqXG4gKiBPbmx5IEF0dHJpYnV0ZVBhcnQgYW5kIFByb3BlcnR5UGFydCBjYW4gaGF2ZSBtdWx0aXBsZSBleHByZXNzaW9ucy5cbiAqIE11bHRpLWV4cHJlc3Npb24gcGFydHMgaGF2ZSBhIGBzdHJpbmdzYCBwcm9wZXJ0eSBhbmQgc2luZ2xlLWV4cHJlc3Npb25cbiAqIHBhcnRzIGRvIG5vdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2luZ2xlRXhwcmVzc2lvbiA9IChwYXJ0OiBQYXJ0SW5mbykgPT5cbiAgKHBhcnQgYXMgQXR0cmlidXRlUGFydEluZm8pLnN0cmluZ3MgPT09IHVuZGVmaW5lZDtcblxuY29uc3QgY3JlYXRlTWFya2VyID0gKCkgPT4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnJyk7XG5cbi8qKlxuICogSW5zZXJ0cyBhIENoaWxkUGFydCBpbnRvIHRoZSBnaXZlbiBjb250YWluZXIgQ2hpbGRQYXJ0J3MgRE9NLCBlaXRoZXIgYXQgdGhlXG4gKiBlbmQgb2YgdGhlIGNvbnRhaW5lciBDaGlsZFBhcnQsIG9yIGJlZm9yZSB0aGUgb3B0aW9uYWwgYHJlZlBhcnRgLlxuICpcbiAqIFRoaXMgZG9lcyBub3QgYWRkIHRoZSBwYXJ0IHRvIHRoZSBjb250YWluZXJQYXJ0J3MgY29tbWl0dGVkIHZhbHVlLiBUaGF0IG11c3RcbiAqIGJlIGRvbmUgYnkgY2FsbGVycy5cbiAqXG4gKiBAcGFyYW0gY29udGFpbmVyUGFydCBQYXJ0IHdpdGhpbiB3aGljaCB0byBhZGQgdGhlIG5ldyBDaGlsZFBhcnRcbiAqIEBwYXJhbSByZWZQYXJ0IFBhcnQgYmVmb3JlIHdoaWNoIHRvIGFkZCB0aGUgbmV3IENoaWxkUGFydDsgd2hlbiBvbWl0dGVkIHRoZVxuICogICAgIHBhcnQgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGUgYGNvbnRhaW5lclBhcnRgXG4gKiBAcGFyYW0gcGFydCBQYXJ0IHRvIGluc2VydCwgb3IgdW5kZWZpbmVkIHRvIGNyZWF0ZSBhIG5ldyBwYXJ0XG4gKi9cbmV4cG9ydCBjb25zdCBpbnNlcnRQYXJ0ID0gKFxuICBjb250YWluZXJQYXJ0OiBDaGlsZFBhcnQsXG4gIHJlZlBhcnQ/OiBDaGlsZFBhcnQsXG4gIHBhcnQ/OiBDaGlsZFBhcnRcbik6IENoaWxkUGFydCA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IHdyYXAoY29udGFpbmVyUGFydC5fJHN0YXJ0Tm9kZSkucGFyZW50Tm9kZSE7XG5cbiAgY29uc3QgcmVmTm9kZSA9XG4gICAgcmVmUGFydCA9PT0gdW5kZWZpbmVkID8gY29udGFpbmVyUGFydC5fJGVuZE5vZGUgOiByZWZQYXJ0Ll8kc3RhcnROb2RlO1xuXG4gIGlmIChwYXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBzdGFydE5vZGUgPSB3cmFwKGNvbnRhaW5lcikuaW5zZXJ0QmVmb3JlKGNyZWF0ZU1hcmtlcigpLCByZWZOb2RlKTtcbiAgICBjb25zdCBlbmROb2RlID0gd3JhcChjb250YWluZXIpLmluc2VydEJlZm9yZShjcmVhdGVNYXJrZXIoKSwgcmVmTm9kZSk7XG4gICAgcGFydCA9IG5ldyBDaGlsZFBhcnQoXG4gICAgICBzdGFydE5vZGUsXG4gICAgICBlbmROb2RlLFxuICAgICAgY29udGFpbmVyUGFydCxcbiAgICAgIGNvbnRhaW5lclBhcnQub3B0aW9uc1xuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZW5kTm9kZSA9IHdyYXAocGFydC5fJGVuZE5vZGUhKS5uZXh0U2libGluZztcbiAgICBjb25zdCBvbGRQYXJlbnQgPSBwYXJ0Ll8kcGFyZW50O1xuICAgIGNvbnN0IHBhcmVudENoYW5nZWQgPSBvbGRQYXJlbnQgIT09IGNvbnRhaW5lclBhcnQ7XG4gICAgaWYgKHBhcmVudENoYW5nZWQpIHtcbiAgICAgIHBhcnQuXyRyZXBhcmVudERpc2Nvbm5lY3RhYmxlcz8uKGNvbnRhaW5lclBhcnQpO1xuICAgICAgLy8gTm90ZSB0aGF0IGFsdGhvdWdoIGBfJHJlcGFyZW50RGlzY29ubmVjdGFibGVzYCB1cGRhdGVzIHRoZSBwYXJ0J3NcbiAgICAgIC8vIGBfJHBhcmVudGAgcmVmZXJlbmNlIGFmdGVyIHVubGlua2luZyBmcm9tIGl0cyBjdXJyZW50IHBhcmVudCwgdGhhdFxuICAgICAgLy8gbWV0aG9kIG9ubHkgZXhpc3RzIGlmIERpc2Nvbm5lY3RhYmxlcyBhcmUgcHJlc2VudCwgc28gd2UgbmVlZCB0b1xuICAgICAgLy8gdW5jb25kaXRpb25hbGx5IHNldCBpdCBoZXJlXG4gICAgICBwYXJ0Ll8kcGFyZW50ID0gY29udGFpbmVyUGFydDtcbiAgICAgIC8vIFNpbmNlIHRoZSBfJGlzQ29ubmVjdGVkIGdldHRlciBpcyBzb21ld2hhdCBjb3N0bHksIG9ubHlcbiAgICAgIC8vIHJlYWQgaXQgb25jZSB3ZSBrbm93IHRoZSBzdWJ0cmVlIGhhcyBkaXJlY3RpdmVzIHRoYXQgbmVlZFxuICAgICAgLy8gdG8gYmUgbm90aWZpZWRcbiAgICAgIGxldCBuZXdDb25uZWN0aW9uU3RhdGU7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcnQuXyRub3RpZnlDb25uZWN0aW9uQ2hhbmdlZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIChuZXdDb25uZWN0aW9uU3RhdGUgPSBjb250YWluZXJQYXJ0Ll8kaXNDb25uZWN0ZWQpICE9PVxuICAgICAgICAgIG9sZFBhcmVudCEuXyRpc0Nvbm5lY3RlZFxuICAgICAgKSB7XG4gICAgICAgIHBhcnQuXyRub3RpZnlDb25uZWN0aW9uQ2hhbmdlZChuZXdDb25uZWN0aW9uU3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5kTm9kZSAhPT0gcmVmTm9kZSB8fCBwYXJlbnRDaGFuZ2VkKSB7XG4gICAgICBsZXQgc3RhcnQ6IE5vZGUgfCBudWxsID0gcGFydC5fJHN0YXJ0Tm9kZTtcbiAgICAgIHdoaWxlIChzdGFydCAhPT0gZW5kTm9kZSkge1xuICAgICAgICBjb25zdCBuOiBOb2RlIHwgbnVsbCA9IHdyYXAoc3RhcnQhKS5uZXh0U2libGluZztcbiAgICAgICAgd3JhcChjb250YWluZXIpLmluc2VydEJlZm9yZShzdGFydCEsIHJlZk5vZGUpO1xuICAgICAgICBzdGFydCA9IG47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnQ7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHZhbHVlIG9mIGEgUGFydC5cbiAqXG4gKiBOb3RlIHRoYXQgdGhpcyBzaG91bGQgb25seSBiZSB1c2VkIHRvIHNldC91cGRhdGUgdGhlIHZhbHVlIG9mIHVzZXItY3JlYXRlZFxuICogcGFydHMgKGkuZS4gdGhvc2UgY3JlYXRlZCB1c2luZyBgaW5zZXJ0UGFydGApOyBpdCBzaG91bGQgbm90IGJlIHVzZWRcbiAqIGJ5IGRpcmVjdGl2ZXMgdG8gc2V0IHRoZSB2YWx1ZSBvZiB0aGUgZGlyZWN0aXZlJ3MgY29udGFpbmVyIHBhcnQuIERpcmVjdGl2ZXNcbiAqIHNob3VsZCByZXR1cm4gYSB2YWx1ZSBmcm9tIGB1cGRhdGVgL2ByZW5kZXJgIHRvIHVwZGF0ZSB0aGVpciBwYXJ0IHN0YXRlLlxuICpcbiAqIEZvciBkaXJlY3RpdmVzIHRoYXQgcmVxdWlyZSBzZXR0aW5nIHRoZWlyIHBhcnQgdmFsdWUgYXN5bmNocm9ub3VzbHksIHRoZXlcbiAqIHNob3VsZCBleHRlbmQgYEFzeW5jRGlyZWN0aXZlYCBhbmQgY2FsbCBgdGhpcy5zZXRWYWx1ZSgpYC5cbiAqXG4gKiBAcGFyYW0gcGFydCBQYXJ0IHRvIHNldFxuICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIHNldFxuICogQHBhcmFtIGluZGV4IEZvciBgQXR0cmlidXRlUGFydGBzLCB0aGUgaW5kZXggdG8gc2V0XG4gKiBAcGFyYW0gZGlyZWN0aXZlUGFyZW50IFVzZWQgaW50ZXJuYWxseTsgc2hvdWxkIG5vdCBiZSBzZXQgYnkgdXNlclxuICovXG5leHBvcnQgY29uc3Qgc2V0Q2hpbGRQYXJ0VmFsdWUgPSA8VCBleHRlbmRzIENoaWxkUGFydD4oXG4gIHBhcnQ6IFQsXG4gIHZhbHVlOiB1bmtub3duLFxuICBkaXJlY3RpdmVQYXJlbnQ6IERpcmVjdGl2ZVBhcmVudCA9IHBhcnRcbik6IFQgPT4ge1xuICBwYXJ0Ll8kc2V0VmFsdWUodmFsdWUsIGRpcmVjdGl2ZVBhcmVudCk7XG4gIHJldHVybiBwYXJ0O1xufTtcblxuLy8gQSBzZW50aW5lbCB2YWx1ZSB0aGF0IGNhbiBuZXZlciBhcHBlYXIgYXMgYSBwYXJ0IHZhbHVlIGV4Y2VwdCB3aGVuIHNldCBieVxuLy8gbGl2ZSgpLiBVc2VkIHRvIGZvcmNlIGEgZGlydHktY2hlY2sgdG8gZmFpbCBhbmQgY2F1c2UgYSByZS1yZW5kZXIuXG5jb25zdCBSRVNFVF9WQUxVRSA9IHt9O1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbW1pdHRlZCB2YWx1ZSBvZiBhIENoaWxkUGFydCBkaXJlY3RseSB3aXRob3V0IHRyaWdnZXJpbmcgdGhlXG4gKiBjb21taXQgc3RhZ2Ugb2YgdGhlIHBhcnQuXG4gKlxuICogVGhpcyBpcyB1c2VmdWwgaW4gY2FzZXMgd2hlcmUgYSBkaXJlY3RpdmUgbmVlZHMgdG8gdXBkYXRlIHRoZSBwYXJ0IHN1Y2hcbiAqIHRoYXQgdGhlIG5leHQgdXBkYXRlIGRldGVjdHMgYSB2YWx1ZSBjaGFuZ2Ugb3Igbm90LiBXaGVuIHZhbHVlIGlzIG9taXR0ZWQsXG4gKiB0aGUgbmV4dCB1cGRhdGUgd2lsbCBiZSBndWFyYW50ZWVkIHRvIGJlIGRldGVjdGVkIGFzIGEgY2hhbmdlLlxuICpcbiAqIEBwYXJhbSBwYXJ0XG4gKiBAcGFyYW0gdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IHNldENvbW1pdHRlZFZhbHVlID0gKHBhcnQ6IFBhcnQsIHZhbHVlOiB1bmtub3duID0gUkVTRVRfVkFMVUUpID0+XG4gIChwYXJ0Ll8kY29tbWl0dGVkVmFsdWUgPSB2YWx1ZSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY29tbWl0dGVkIHZhbHVlIG9mIGEgQ2hpbGRQYXJ0LlxuICpcbiAqIFRoZSBjb21taXR0ZWQgdmFsdWUgaXMgdXNlZCBmb3IgY2hhbmdlIGRldGVjdGlvbiBhbmQgZWZmaWNpZW50IHVwZGF0ZXMgb2ZcbiAqIHRoZSBwYXJ0LiBJdCBjYW4gZGlmZmVyIGZyb20gdGhlIHZhbHVlIHNldCBieSB0aGUgdGVtcGxhdGUgb3IgZGlyZWN0aXZlIGluXG4gKiBjYXNlcyB3aGVyZSB0aGUgdGVtcGxhdGUgdmFsdWUgaXMgdHJhbnNmb3JtZWQgYmVmb3JlIGJlaW5nIGNvbW1pdHRlZC5cbiAqXG4gKiAtIGBUZW1wbGF0ZVJlc3VsdGBzIGFyZSBjb21taXR0ZWQgYXMgYSBgVGVtcGxhdGVJbnN0YW5jZWBcbiAqIC0gSXRlcmFibGVzIGFyZSBjb21taXR0ZWQgYXMgYEFycmF5PENoaWxkUGFydD5gXG4gKiAtIEFsbCBvdGhlciB0eXBlcyBhcmUgY29tbWl0dGVkIGFzIHRoZSB0ZW1wbGF0ZSB2YWx1ZSBvciB2YWx1ZSByZXR1cm5lZCBvclxuICogICBzZXQgYnkgYSBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIHBhcnRcbiAqL1xuZXhwb3J0IGNvbnN0IGdldENvbW1pdHRlZFZhbHVlID0gKHBhcnQ6IENoaWxkUGFydCkgPT4gcGFydC5fJGNvbW1pdHRlZFZhbHVlO1xuXG4vKipcbiAqIFJlbW92ZXMgYSBDaGlsZFBhcnQgZnJvbSB0aGUgRE9NLCBpbmNsdWRpbmcgYW55IG9mIGl0cyBjb250ZW50IGFuZCBtYXJrZXJzLlxuICpcbiAqIE5vdGU6IFRoZSBvbmx5IGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIGFuZCBjbGVhclBhcnQoKSBpcyB0aGF0IHRoaXMgYWxzb1xuICogcmVtb3ZlcyB0aGUgcGFydCdzIHN0YXJ0IG5vZGUuIFRoaXMgbWVhbnMgdGhhdCB0aGUgQ2hpbGRQYXJ0IG11c3Qgb3duIGl0c1xuICogc3RhcnQgbm9kZSwgaWUgaXQgbXVzdCBiZSBhIG1hcmtlciBub2RlIHNwZWNpZmljYWxseSBmb3IgdGhpcyBwYXJ0IGFuZCBub3QgYW5cbiAqIGFuY2hvciBmcm9tIHN1cnJvdW5kaW5nIGNvbnRlbnQuXG4gKlxuICogQHBhcmFtIHBhcnQgVGhlIFBhcnQgdG8gcmVtb3ZlXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVQYXJ0ID0gKHBhcnQ6IENoaWxkUGFydCkgPT4ge1xuICBwYXJ0Ll8kY2xlYXIoKTtcbiAgcGFydC5fJHN0YXJ0Tm9kZS5yZW1vdmUoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbGVhclBhcnQgPSAocGFydDogQ2hpbGRQYXJ0KSA9PiB7XG4gIHBhcnQuXyRjbGVhcigpO1xufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5pbXBvcnQge1xuICBXYUVycm9yRXZlbnRcbn0gZnJvbSBcIi4vY2h1bmsuWURRQ1MySEsuanNcIjtcbmltcG9ydCB7XG4gIFdhTG9hZEV2ZW50XG59IGZyb20gXCIuL2NodW5rLldESUlHVU5QLmpzXCI7XG5pbXBvcnQge1xuICBpY29uX3N0eWxlc19kZWZhdWx0XG59IGZyb20gXCIuL2NodW5rLkQ1STJEV01MLmpzXCI7XG5pbXBvcnQge1xuICB3YXRjaFxufSBmcm9tIFwiLi9jaHVuay5QWkFONkZQTi5qc1wiO1xuaW1wb3J0IHtcbiAgZ2V0RGVmYXVsdEljb25GYW1pbHksXG4gIGdldEljb25MaWJyYXJ5LFxuICB1bndhdGNoSWNvbixcbiAgd2F0Y2hJY29uXG59IGZyb20gXCIuL2NodW5rLkZTUlhZR1NXLmpzXCI7XG5pbXBvcnQge1xuICBXZWJBd2Vzb21lRWxlbWVudFxufSBmcm9tIFwiLi9jaHVuay5FUEhIV1hLMi5qc1wiO1xuaW1wb3J0IHtcbiAgX19kZWNvcmF0ZUNsYXNzXG59IGZyb20gXCIuL2NodW5rLjdWR0NJSERHLmpzXCI7XG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb24vaWNvbi50c1xuaW1wb3J0IHsgaHRtbCB9IGZyb20gXCJsaXRcIjtcbmltcG9ydCB7IGN1c3RvbUVsZW1lbnQsIHByb3BlcnR5LCBzdGF0ZSB9IGZyb20gXCJsaXQvZGVjb3JhdG9ycy5qc1wiO1xuaW1wb3J0IHsgaXNUZW1wbGF0ZVJlc3VsdCB9IGZyb20gXCJsaXQvZGlyZWN0aXZlLWhlbHBlcnMuanNcIjtcbnZhciBDQUNIRUFCTEVfRVJST1IgPSBTeW1ib2woKTtcbnZhciBSRVRSWUFCTEVfRVJST1IgPSBTeW1ib2woKTtcbnZhciBwYXJzZXI7XG52YXIgaWNvbkNhY2hlID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbnZhciBXYUljb24gPSBjbGFzcyBleHRlbmRzIFdlYkF3ZXNvbWVFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLnN2ZyA9IG51bGw7XG4gICAgdGhpcy5hdXRvV2lkdGggPSBmYWxzZTtcbiAgICB0aGlzLnN3YXBPcGFjaXR5ID0gZmFsc2U7XG4gICAgdGhpcy5sYWJlbCA9IFwiXCI7XG4gICAgdGhpcy5saWJyYXJ5ID0gXCJkZWZhdWx0XCI7XG4gICAgdGhpcy5yb3RhdGUgPSAwO1xuICAgIC8qKiBHaXZlbiBhIFVSTCwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXN1bHRpbmcgU1ZHIGVsZW1lbnQgb3IgYW4gYXBwcm9wcmlhdGUgZXJyb3Igc3ltYm9sLiAqL1xuICAgIHRoaXMucmVzb2x2ZUljb24gPSBhc3luYyAodXJsLCBsaWJyYXJ5KSA9PiB7XG4gICAgICBsZXQgZmlsZURhdGE7XG4gICAgICBpZiAobGlicmFyeT8uc3ByaXRlU2hlZXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1VwZGF0ZWQpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ZnID0gaHRtbGA8c3ZnIHBhcnQ9XCJzdmdcIj5cbiAgICAgICAgPHVzZSBwYXJ0PVwidXNlXCIgaHJlZj1cIiR7dXJsfVwiPjwvdXNlPlxuICAgICAgPC9zdmc+YDtcbiAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVDb21wbGV0ZTtcbiAgICAgICAgY29uc3Qgc3ZnID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJbcGFydD0nc3ZnJ11cIik7XG4gICAgICAgIGlmICh0eXBlb2YgbGlicmFyeS5tdXRhdG9yID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBsaWJyYXJ5Lm11dGF0b3Ioc3ZnLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdmc7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBmaWxlRGF0YSA9IGF3YWl0IGZldGNoKHVybCwgeyBtb2RlOiBcImNvcnNcIiB9KTtcbiAgICAgICAgaWYgKCFmaWxlRGF0YS5vaykgcmV0dXJuIGZpbGVEYXRhLnN0YXR1cyA9PT0gNDEwID8gQ0FDSEVBQkxFX0VSUk9SIDogUkVUUllBQkxFX0VSUk9SO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiBSRVRSWUFCTEVfRVJST1I7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gYXdhaXQgZmlsZURhdGEudGV4dCgpO1xuICAgICAgICBjb25zdCBzdmcgPSBkaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGlmIChzdmc/LnRhZ05hbWU/LnRvTG93ZXJDYXNlKCkgIT09IFwic3ZnXCIpIHJldHVybiBDQUNIRUFCTEVfRVJST1I7XG4gICAgICAgIGlmICghcGFyc2VyKSBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoc3ZnLm91dGVySFRNTCwgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIGNvbnN0IHN2Z0VsID0gZG9jLmJvZHkucXVlcnlTZWxlY3RvcihcInN2Z1wiKTtcbiAgICAgICAgaWYgKCFzdmdFbCkgcmV0dXJuIENBQ0hFQUJMRV9FUlJPUjtcbiAgICAgICAgc3ZnRWwucGFydC5hZGQoXCJzdmdcIik7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5hZG9wdE5vZGUoc3ZnRWwpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiBDQUNIRUFCTEVfRVJST1I7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHdhdGNoSWNvbih0aGlzKTtcbiAgfVxuICBmaXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICBzdXBlci5maXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZShcInJvdGF0ZVwiKSkge1xuICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcm90YXRlLWFuZ2xlXCIsIGAke3RoaXMucm90YXRlfWRlZ2ApO1xuICAgIH1cbiAgICB0aGlzLnNldEljb24oKTtcbiAgfVxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHVud2F0Y2hJY29uKHRoaXMpO1xuICB9XG4gIGdldEljb25Tb3VyY2UoKSB7XG4gICAgY29uc3QgbGlicmFyeSA9IGdldEljb25MaWJyYXJ5KHRoaXMubGlicmFyeSk7XG4gICAgY29uc3QgZmFtaWx5ID0gdGhpcy5mYW1pbHkgfHwgZ2V0RGVmYXVsdEljb25GYW1pbHkoKTtcbiAgICBpZiAodGhpcy5uYW1lICYmIGxpYnJhcnkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVybDogbGlicmFyeS5yZXNvbHZlcih0aGlzLm5hbWUsIGZhbWlseSwgdGhpcy52YXJpYW50LCB0aGlzLmF1dG9XaWR0aCksXG4gICAgICAgIGZyb21MaWJyYXJ5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdXJsOiB0aGlzLnNyYyxcbiAgICAgIGZyb21MaWJyYXJ5OiBmYWxzZVxuICAgIH07XG4gIH1cbiAgaGFuZGxlTGFiZWxDaGFuZ2UoKSB7XG4gICAgY29uc3QgaGFzTGFiZWwgPSB0eXBlb2YgdGhpcy5sYWJlbCA9PT0gXCJzdHJpbmdcIiAmJiB0aGlzLmxhYmVsLmxlbmd0aCA+IDA7XG4gICAgaWYgKGhhc0xhYmVsKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJpbWdcIik7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgdGhpcy5sYWJlbCk7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShcInJvbGVcIik7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIik7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgc2V0SWNvbigpIHtcbiAgICBjb25zdCB7IHVybCwgZnJvbUxpYnJhcnkgfSA9IHRoaXMuZ2V0SWNvblNvdXJjZSgpO1xuICAgIGNvbnN0IGxpYnJhcnkgPSBmcm9tTGlicmFyeSA/IGdldEljb25MaWJyYXJ5KHRoaXMubGlicmFyeSkgOiB2b2lkIDA7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHRoaXMuc3ZnID0gbnVsbDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGljb25SZXNvbHZlciA9IGljb25DYWNoZS5nZXQodXJsKTtcbiAgICBpZiAoIWljb25SZXNvbHZlcikge1xuICAgICAgaWNvblJlc29sdmVyID0gdGhpcy5yZXNvbHZlSWNvbih1cmwsIGxpYnJhcnkpO1xuICAgICAgaWNvbkNhY2hlLnNldCh1cmwsIGljb25SZXNvbHZlcik7XG4gICAgfVxuICAgIGNvbnN0IHN2ZyA9IGF3YWl0IGljb25SZXNvbHZlcjtcbiAgICBpZiAoc3ZnID09PSBSRVRSWUFCTEVfRVJST1IpIHtcbiAgICAgIGljb25DYWNoZS5kZWxldGUodXJsKTtcbiAgICB9XG4gICAgaWYgKHVybCAhPT0gdGhpcy5nZXRJY29uU291cmNlKCkudXJsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc1RlbXBsYXRlUmVzdWx0KHN2ZykpIHtcbiAgICAgIHRoaXMuc3ZnID0gc3ZnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKHN2Zykge1xuICAgICAgY2FzZSBSRVRSWUFCTEVfRVJST1I6XG4gICAgICBjYXNlIENBQ0hFQUJMRV9FUlJPUjpcbiAgICAgICAgdGhpcy5zdmcgPSBudWxsO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFdhRXJyb3JFdmVudCgpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnN2ZyA9IHN2Zy5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIGxpYnJhcnk/Lm11dGF0b3I/Lih0aGlzLnN2ZywgdGhpcyk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgV2FMb2FkRXZlbnQoKSk7XG4gICAgfVxuICB9XG4gIHVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICBzdXBlci51cGRhdGVkKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICBjb25zdCBsaWJyYXJ5ID0gZ2V0SWNvbkxpYnJhcnkodGhpcy5saWJyYXJ5KTtcbiAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoXCJyb3RhdGVcIikpIHtcbiAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoXCItLXJvdGF0ZS1hbmdsZVwiLCBgJHt0aGlzLnJvdGF0ZX1kZWdgKTtcbiAgICB9XG4gICAgY29uc3Qgc3ZnID0gdGhpcy5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yKFwic3ZnXCIpO1xuICAgIGlmIChzdmcpIHtcbiAgICAgIGxpYnJhcnk/Lm11dGF0b3I/LihzdmcsIHRoaXMpO1xuICAgIH1cbiAgfVxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuaGFzVXBkYXRlZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3ZnO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbGA8c3ZnIHBhcnQ9XCJzdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIj48L3N2Zz5gO1xuICB9XG59O1xuV2FJY29uLmNzcyA9IGljb25fc3R5bGVzX2RlZmF1bHQ7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBzdGF0ZSgpXG5dLCBXYUljb24ucHJvdG90eXBlLCBcInN2Z1wiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJuYW1lXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUljb24ucHJvdG90eXBlLCBcImZhbWlseVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJ2YXJpYW50XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwiYXV0by13aWR0aFwiLCB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUljb24ucHJvdG90eXBlLCBcImF1dG9XaWR0aFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcInN3YXAtb3BhY2l0eVwiLCB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUljb24ucHJvdG90eXBlLCBcInN3YXBPcGFjaXR5XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJzcmNcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYUljb24ucHJvdG90eXBlLCBcImxhYmVsXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUljb24ucHJvdG90eXBlLCBcImxpYnJhcnlcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IE51bWJlciwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJyb3RhdGVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZywgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJmbGlwXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcsIHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhSWNvbi5wcm90b3R5cGUsIFwiYW5pbWF0aW9uXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgd2F0Y2goXCJsYWJlbFwiKVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJoYW5kbGVMYWJlbENoYW5nZVwiLCAxKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHdhdGNoKFtcImZhbWlseVwiLCBcIm5hbWVcIiwgXCJsaWJyYXJ5XCIsIFwidmFyaWFudFwiLCBcInNyY1wiLCBcImF1dG9XaWR0aFwiLCBcInN3YXBPcGFjaXR5XCJdLCB7IHdhaXRVbnRpbEZpcnN0VXBkYXRlOiB0cnVlIH0pXG5dLCBXYUljb24ucHJvdG90eXBlLCBcInNldEljb25cIiwgMSk7XG5XYUljb24gPSBfX2RlY29yYXRlQ2xhc3MoW1xuICBjdXN0b21FbGVtZW50KFwid2EtaWNvblwiKVxuXSwgV2FJY29uKTtcblxuZXhwb3J0IHtcbiAgV2FJY29uXG59O1xuIiwgImltcG9ydCB7IExpdEVsZW1lbnQsIGh0bWwsIGNzcyB9IGZyb20gJ2xpdCc7XG5pbXBvcnQgeyBjdXN0b21FbGVtZW50LCBwcm9wZXJ0eSB9IGZyb20gJ2xpdC9kZWNvcmF0b3JzLmpzJztcblxuaW1wb3J0ICdAYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY29tcG9uZW50cy9idXR0b24vYnV0dG9uLmpzJztcbmltcG9ydCAnQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NvbXBvbmVudHMvaWNvbi9pY29uLmpzJztcblxuQGN1c3RvbUVsZW1lbnQoJ3RocmVhZHMtcG9wb3ZlcicpXG5leHBvcnQgY2xhc3MgVGhyZWFkc1BvcG92ZXIgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgc3RhdGljIG92ZXJyaWRlIHN0eWxlcyA9IGNzc2BcbiAgICA6aG9zdCB7XG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICB6LWluZGV4OiAxMDAwMTtcbiAgICB9XG4gICAgLnBvcG92ZXItY29udGVudCB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1iZywgaHNsKDAgMCUgMTAwJSkpO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyLCBoc2woMCAwJSA4OS44JSkpO1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGMtcmFkaXVzLCA2cHgpO1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggNnB4IC0xcHggcmdiKDAgMCAwIC8gMC4xKSwgMCAycHggNHB4IC0ycHggcmdiKDAgMCAwIC8gMC4xKTtcbiAgICAgIHBhZGRpbmc6IDRweDtcbiAgICB9XG4gICAgd2EtYnV0dG9uOjpwYXJ0KGJhc2UpIHtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1mZywgaHNsKDAgMCUgOSUpKTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgfVxuICAgIHdhLWJ1dHRvbjo6cGFydChiYXNlKTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1hY2NlbnQsIGhzbCgwIDAlIDk2LjElKSk7XG4gICAgfVxuICBgO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4gfSkgYWN0aXZlID0gZmFsc2U7XG4gIEBwcm9wZXJ0eSh7IHR5cGU6IE51bWJlciB9KSB4ID0gMDtcbiAgQHByb3BlcnR5KHsgdHlwZTogTnVtYmVyIH0pIHkgPSAwO1xuXG4gIHByaXZhdGUgYWRkQ29tbWVudCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdhZGQtY29tbWVudCcsIHtcbiAgICAgIGJ1YmJsZXM6IHRydWUsIGNvbXBvc2VkOiB0cnVlLFxuICAgIH0pKTtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSByZXR1cm4gaHRtbGBgO1xuXG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwicG9wb3Zlci1jb250ZW50XCJcbiAgICAgICAgc3R5bGU9XCJwb3NpdGlvbjpmaXhlZDsgbGVmdDoke3RoaXMueH1weDsgdG9wOiR7dGhpcy55IC0gMTB9cHg7IHRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwgLTEwMCUpO1wiXG4gICAgICA+XG4gICAgICAgIDx3YS1idXR0b24gc2l6ZT1cInNtYWxsXCIgYXBwZWFyYW5jZT1cInBsYWluXCIgQGNsaWNrPSR7dGhpcy5hZGRDb21tZW50fT5cbiAgICAgICAgICA8d2EtaWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwiY29tbWVudFwiIHZhcmlhbnQ9XCJyZWd1bGFyXCIgbGFiZWw9XCJBZGQgY29tbWVudFwiPjwvd2EtaWNvbj5cbiAgICAgICAgICBBZGQgY29tbWVudFxuICAgICAgICA8L3dhLWJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxuICBzaG93KHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2NvbXBvbmVudHMvdGV4dGFyZWEvdGV4dGFyZWEuc3R5bGVzLnRzXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwibGl0XCI7XG52YXIgdGV4dGFyZWFfc3R5bGVzX2RlZmF1bHQgPSBjc3NgXG4gIDpob3N0IHtcbiAgICBib3JkZXItd2lkdGg6IDA7XG4gIH1cblxuICAudGV4dGFyZWEge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW46IDA7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgY3Vyc29yOiBpbmhlcml0O1xuICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2EtZm9ybS1jb250cm9sLWJhY2tncm91bmQtY29sb3IpO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1jb2xvcik7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICAgIGJvcmRlci1zdHlsZTogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1zdHlsZSk7XG4gICAgYm9yZGVyLXdpZHRoOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLXdpZHRoKTtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG5cbiAgICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgICBvdXRsaW5lOiB2YXIoLS13YS1mb2N1cy1yaW5nKTtcbiAgICAgIG91dGxpbmUtb2Zmc2V0OiB2YXIoLS13YS1mb2N1cy1yaW5nLW9mZnNldCk7XG4gICAgfVxuICB9XG5cbiAgLyogQXBwZWFyYW5jZSBtb2RpZmllcnMgKi9cbiAgOmhvc3QoW2FwcGVhcmFuY2U9J291dGxpbmVkJ10pIC50ZXh0YXJlYSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2EtZm9ybS1jb250cm9sLWJhY2tncm91bmQtY29sb3IpO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1jb2xvcik7XG4gIH1cblxuICA6aG9zdChbYXBwZWFyYW5jZT0nZmlsbGVkJ10pIC50ZXh0YXJlYSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLXF1aWV0KTtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1xdWlldCk7XG4gIH1cblxuICA6aG9zdChbYXBwZWFyYW5jZT0nZmlsbGVkLW91dGxpbmVkJ10pIC50ZXh0YXJlYSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLXF1aWV0KTtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1ib3JkZXItY29sb3IpO1xuICB9XG5cbiAgdGV4dGFyZWEge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBmb250OiBpbmhlcml0O1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIHBhZGRpbmc6IGNhbGModmFyKC0td2EtZm9ybS1jb250cm9sLXBhZGRpbmctYmxvY2spIC0gKCgxbGggLSAxZW0pIC8gMikpIHZhcigtLXdhLWZvcm0tY29udHJvbC1wYWRkaW5nLWlubGluZSk7IC8qIGFjY291bnRzIGZvciB0aGUgbGFyZ2VyIGxpbmUgaGVpZ2h0IG9mIHRleHRhcmVhIGNvbnRlbnQgKi9cbiAgICBtaW4taGVpZ2h0OiBjYWxjKHZhcigtLXdhLWZvcm0tY29udHJvbC1oZWlnaHQpIC0gdmFyKC0tYm9yZGVyLXdpZHRoKSAqIDIpO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgbWFyZ2luOiAwO1xuXG4gICAgJjo6cGxhY2Vob2xkZXIge1xuICAgICAgY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1wbGFjZWhvbGRlci1jb2xvcik7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuXG4gICAgJjphdXRvZmlsbCB7XG4gICAgICAmLFxuICAgICAgJjpob3ZlcixcbiAgICAgICY6Zm9jdXMsXG4gICAgICAmOmFjdGl2ZSB7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgIGNhcmV0LWNvbG9yOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtdmFsdWUtY29sb3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgICY6Zm9jdXMge1xuICAgICAgb3V0bGluZTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAvKiBTaGFyZWQgdGV4dGFyZWEgYW5kIHNpemUtYWRqdXN0ZXIgcG9zaXRpb25pbmcgKi9cbiAgLmNvbnRyb2wsXG4gIC5zaXplLWFkanVzdGVyIHtcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XG4gIH1cblxuICAuc2l6ZS1hZGp1c3RlciB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gIHRleHRhcmVhOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uLFxuICB0ZXh0YXJlYTo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbixcbiAgdGV4dGFyZWE6Oi13ZWJraXQtc2VhcmNoLXJlc3VsdHMtYnV0dG9uLFxuICB0ZXh0YXJlYTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1kZWNvcmF0aW9uIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIH1cblxuICAvKlxuICAgKiBSZXNpemUgdHlwZXNcbiAgICovXG5cbiAgOmhvc3QoW3Jlc2l6ZT0nbm9uZSddKSB0ZXh0YXJlYSB7XG4gICAgcmVzaXplOiBub25lO1xuICB9XG5cbiAgdGV4dGFyZWEsXG4gIDpob3N0KFtyZXNpemU9J3ZlcnRpY2FsJ10pIHRleHRhcmVhIHtcbiAgICByZXNpemU6IHZlcnRpY2FsO1xuICB9XG5cbiAgOmhvc3QoW3Jlc2l6ZT0naG9yaXpvbnRhbCddKSB0ZXh0YXJlYSB7XG4gICAgcmVzaXplOiBob3Jpem9udGFsO1xuICB9XG5cbiAgOmhvc3QoW3Jlc2l6ZT0nYm90aCddKSB0ZXh0YXJlYSB7XG4gICAgcmVzaXplOiBib3RoO1xuICB9XG5cbiAgOmhvc3QoW3Jlc2l6ZT0nYXV0byddKSB0ZXh0YXJlYSB7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIHJlc2l6ZTogbm9uZTtcbiAgICBvdmVyZmxvdy15OiBoaWRkZW47XG4gIH1cbmA7XG5cbmV4cG9ydCB7XG4gIHRleHRhcmVhX3N0eWxlc19kZWZhdWx0XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL3N0eWxlcy9jb21wb25lbnQvZm9ybS1jb250cm9sLnN0eWxlcy50c1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcImxpdFwiO1xudmFyIGZvcm1fY29udHJvbF9zdHlsZXNfZGVmYXVsdCA9IGNzc2BcbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuXG4gIC8qIFRyZWF0IHdyYXBwZWQgbGFiZWxzLCBpbnB1dHMsIGFuZCBoaW50cyBhcyBkaXJlY3QgY2hpbGRyZW4gb2YgdGhlIGhvc3QgZWxlbWVudCAqL1xuICBbcGFydH49J2Zvcm0tY29udHJvbCddIHtcbiAgICBkaXNwbGF5OiBjb250ZW50cztcbiAgfVxuXG4gIC8qIExhYmVsICovXG4gIDppcyhbcGFydH49J2Zvcm0tY29udHJvbC1sYWJlbCddLCBbcGFydH49J2xhYmVsJ10pOmhhcygqOm5vdCg6ZW1wdHkpKSxcbiAgOmlzKFtwYXJ0fj0nZm9ybS1jb250cm9sLWxhYmVsJ10sIFtwYXJ0fj0nbGFiZWwnXSkuaGFzLWxhYmVsIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBjb2xvcjogdmFyKC0td2EtZm9ybS1jb250cm9sLWxhYmVsLWNvbG9yKTtcbiAgICBmb250LXdlaWdodDogdmFyKC0td2EtZm9ybS1jb250cm9sLWxhYmVsLWZvbnQtd2VpZ2h0KTtcbiAgICBsaW5lLWhlaWdodDogdmFyKC0td2EtZm9ybS1jb250cm9sLWxhYmVsLWxpbmUtaGVpZ2h0KTtcbiAgICBtYXJnaW4tYmxvY2stZW5kOiAwLjVlbTtcbiAgfVxuXG4gIDpob3N0KFtyZXF1aXJlZF0pIDppcyhbcGFydH49J2Zvcm0tY29udHJvbC1sYWJlbCddLCBbcGFydH49J2xhYmVsJ10pOjphZnRlciB7XG4gICAgY29udGVudDogdmFyKC0td2EtZm9ybS1jb250cm9sLXJlcXVpcmVkLWNvbnRlbnQpO1xuICAgIG1hcmdpbi1pbmxpbmUtc3RhcnQ6IHZhcigtLXdhLWZvcm0tY29udHJvbC1yZXF1aXJlZC1jb250ZW50LW9mZnNldCk7XG4gICAgY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1yZXF1aXJlZC1jb250ZW50LWNvbG9yKTtcbiAgfVxuXG4gIC8qIEhlbHAgdGV4dCAqL1xuICBbcGFydH49J2hpbnQnXSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1oaW50LWNvbG9yKTtcbiAgICBmb250LXdlaWdodDogdmFyKC0td2EtZm9ybS1jb250cm9sLWhpbnQtZm9udC13ZWlnaHQpO1xuICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtaGludC1saW5lLWhlaWdodCk7XG4gICAgbWFyZ2luLWJsb2NrLXN0YXJ0OiAwLjVlbTtcbiAgICBmb250LXNpemU6IHZhcigtLXdhLWZvbnQtc2l6ZS1zbWFsbGVyKTtcblxuICAgICY6bm90KC5oYXMtc2xvdHRlZCwgLmhhcy1oaW50KSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IHtcbiAgZm9ybV9jb250cm9sX3N0eWxlc19kZWZhdWx0XG59O1xuIiwgIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuXG5pbXBvcnQge0F0dHJpYnV0ZVBhcnQsIG5vQ2hhbmdlLCBub3RoaW5nfSBmcm9tICcuLi9saXQtaHRtbC5qcyc7XG5pbXBvcnQge1xuICBkaXJlY3RpdmUsXG4gIERpcmVjdGl2ZSxcbiAgRGlyZWN0aXZlUGFyYW1ldGVycyxcbiAgRGlyZWN0aXZlUmVzdWx0LFxuICBQYXJ0SW5mbyxcbiAgUGFydFR5cGUsXG59IGZyb20gJy4uL2RpcmVjdGl2ZS5qcyc7XG5pbXBvcnQge2lzU2luZ2xlRXhwcmVzc2lvbiwgc2V0Q29tbWl0dGVkVmFsdWV9IGZyb20gJy4uL2RpcmVjdGl2ZS1oZWxwZXJzLmpzJztcblxuY2xhc3MgTGl2ZURpcmVjdGl2ZTxUPiBleHRlbmRzIERpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHBhcnRJbmZvOiBQYXJ0SW5mbykge1xuICAgIHN1cGVyKHBhcnRJbmZvKTtcbiAgICBpZiAoXG4gICAgICAhKFxuICAgICAgICBwYXJ0SW5mby50eXBlID09PSBQYXJ0VHlwZS5QUk9QRVJUWSB8fFxuICAgICAgICBwYXJ0SW5mby50eXBlID09PSBQYXJ0VHlwZS5BVFRSSUJVVEUgfHxcbiAgICAgICAgcGFydEluZm8udHlwZSA9PT0gUGFydFR5cGUuQk9PTEVBTl9BVFRSSUJVVEVcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSBgbGl2ZWAgZGlyZWN0aXZlIGlzIG5vdCBhbGxvd2VkIG9uIGNoaWxkIG9yIGV2ZW50IGJpbmRpbmdzJ1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCFpc1NpbmdsZUV4cHJlc3Npb24ocGFydEluZm8pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BsaXZlYCBiaW5kaW5ncyBjYW4gb25seSBjb250YWluIGEgc2luZ2xlIGV4cHJlc3Npb24nKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIodmFsdWU6IFQpOiBUIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBvdmVycmlkZSB1cGRhdGUocGFydDogQXR0cmlidXRlUGFydCwgW3ZhbHVlXTogRGlyZWN0aXZlUGFyYW1ldGVyczx0aGlzPikge1xuICAgIGlmICh2YWx1ZSA9PT0gbm9DaGFuZ2UgfHwgdmFsdWUgPT09IG5vdGhpbmcpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY29uc3QgZWxlbWVudCA9IHBhcnQuZWxlbWVudDtcbiAgICBjb25zdCBuYW1lID0gcGFydC5uYW1lO1xuXG4gICAgaWYgKHBhcnQudHlwZSA9PT0gUGFydFR5cGUuUFJPUEVSVFkpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICBpZiAodmFsdWUgPT09IChlbGVtZW50IGFzIGFueSlbbmFtZV0pIHtcbiAgICAgICAgcmV0dXJuIG5vQ2hhbmdlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFydC50eXBlID09PSBQYXJ0VHlwZS5CT09MRUFOX0FUVFJJQlVURSkge1xuICAgICAgaWYgKCEhdmFsdWUgPT09IGVsZW1lbnQuaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBub0NoYW5nZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBhcnQudHlwZSA9PT0gUGFydFR5cGUuQVRUUklCVVRFKSB7XG4gICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IFN0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG5vQ2hhbmdlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXNldHMgdGhlIHBhcnQncyB2YWx1ZSwgY2F1c2luZyBpdHMgZGlydHktY2hlY2sgdG8gZmFpbCBzbyB0aGF0IGl0XG4gICAgLy8gYWx3YXlzIHNldHMgdGhlIHZhbHVlLlxuICAgIHNldENvbW1pdHRlZFZhbHVlKHBhcnQpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgTGl2ZSB7XG4gIDxUPih2YWx1ZTogVCk6IERpcmVjdGl2ZVJlc3VsdDx0eXBlb2YgTGl2ZURpcmVjdGl2ZTxUPj47XG59XG5cbi8qKlxuICogQ2hlY2tzIGJpbmRpbmcgdmFsdWVzIGFnYWluc3QgbGl2ZSBET00gdmFsdWVzLCBpbnN0ZWFkIG9mIHByZXZpb3VzbHkgYm91bmRcbiAqIHZhbHVlcywgd2hlbiBkZXRlcm1pbmluZyB3aGV0aGVyIHRvIHVwZGF0ZSB0aGUgdmFsdWUuXG4gKlxuICogVGhpcyBpcyB1c2VmdWwgZm9yIGNhc2VzIHdoZXJlIHRoZSBET00gdmFsdWUgbWF5IGNoYW5nZSBmcm9tIG91dHNpZGUgb2ZcbiAqIGxpdC1odG1sLCBzdWNoIGFzIHdpdGggYSBiaW5kaW5nIHRvIGFuIGA8aW5wdXQ+YCBlbGVtZW50J3MgYHZhbHVlYCBwcm9wZXJ0eSxcbiAqIGEgY29udGVudCBlZGl0YWJsZSBlbGVtZW50cyB0ZXh0LCBvciB0byBhIGN1c3RvbSBlbGVtZW50IHRoYXQgY2hhbmdlcyBpdCdzXG4gKiBvd24gcHJvcGVydGllcyBvciBhdHRyaWJ1dGVzLlxuICpcbiAqIEluIHRoZXNlIGNhc2VzIGlmIHRoZSBET00gdmFsdWUgY2hhbmdlcywgYnV0IHRoZSB2YWx1ZSBzZXQgdGhyb3VnaCBsaXQtaHRtbFxuICogYmluZGluZ3MgaGFzbid0LCBsaXQtaHRtbCB3b24ndCBrbm93IHRvIHVwZGF0ZSB0aGUgRE9NIHZhbHVlIGFuZCB3aWxsIGxlYXZlXG4gKiBpdCBhbG9uZS4gSWYgdGhpcyBpcyBub3Qgd2hhdCB5b3Ugd2FudC0taWYgeW91IHdhbnQgdG8gb3ZlcndyaXRlIHRoZSBET01cbiAqIHZhbHVlIHdpdGggdGhlIGJvdW5kIHZhbHVlIG5vIG1hdHRlciB3aGF0LS11c2UgdGhlIGBsaXZlKClgIGRpcmVjdGl2ZTpcbiAqXG4gKiBgYGBqc1xuICogaHRtbGA8aW5wdXQgLnZhbHVlPSR7bGl2ZSh4KX0+YFxuICogYGBgXG4gKlxuICogYGxpdmUoKWAgcGVyZm9ybXMgYSBzdHJpY3QgZXF1YWxpdHkgY2hlY2sgYWdhaW5zdCB0aGUgbGl2ZSBET00gdmFsdWUsIGFuZCBpZlxuICogdGhlIG5ldyB2YWx1ZSBpcyBlcXVhbCB0byB0aGUgbGl2ZSB2YWx1ZSwgZG9lcyBub3RoaW5nLiBUaGlzIG1lYW5zIHRoYXRcbiAqIGBsaXZlKClgIHNob3VsZCBub3QgYmUgdXNlZCB3aGVuIHRoZSBiaW5kaW5nIHdpbGwgY2F1c2UgYSB0eXBlIGNvbnZlcnNpb24uIElmXG4gKiB5b3UgdXNlIGBsaXZlKClgIHdpdGggYW4gYXR0cmlidXRlIGJpbmRpbmcsIG1ha2Ugc3VyZSB0aGF0IG9ubHkgc3RyaW5ncyBhcmVcbiAqIHBhc3NlZCBpbiwgb3IgdGhlIGJpbmRpbmcgd2lsbCB1cGRhdGUgZXZlcnkgcmVuZGVyLlxuICovXG5leHBvcnQgY29uc3QgbGl2ZTogTGl2ZSA9IGRpcmVjdGl2ZShMaXZlRGlyZWN0aXZlKTtcblxuLyoqXG4gKiBUaGUgdHlwZSBvZiB0aGUgY2xhc3MgdGhhdCBwb3dlcnMgdGhpcyBkaXJlY3RpdmUuIE5lY2Vzc2FyeSBmb3IgbmFtaW5nIHRoZVxuICogZGlyZWN0aXZlJ3MgcmV0dXJuIHR5cGUuXG4gKi9cbmV4cG9ydCB0eXBlIHtMaXZlRGlyZWN0aXZlfTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5pbXBvcnQge1xuICB0ZXh0YXJlYV9zdHlsZXNfZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay5HV1dHUDdaTC5qc1wiO1xuaW1wb3J0IHtcbiAgZm9ybV9jb250cm9sX3N0eWxlc19kZWZhdWx0XG59IGZyb20gXCIuL2NodW5rLjVMWFhYRUxFLmpzXCI7XG5pbXBvcnQge1xuICBNaXJyb3JWYWxpZGF0b3Jcbn0gZnJvbSBcIi4vY2h1bmsuUjdRWDRNNlIuanNcIjtcbmltcG9ydCB7XG4gIFdlYkF3ZXNvbWVGb3JtQXNzb2NpYXRlZEVsZW1lbnRcbn0gZnJvbSBcIi4vY2h1bmsuSVBXUFJJSFouanNcIjtcbmltcG9ydCB7XG4gIEhhc1Nsb3RDb250cm9sbGVyXG59IGZyb20gXCIuL2NodW5rLktJSEIzVk1CLmpzXCI7XG5pbXBvcnQge1xuICBzaXplX3N0eWxlc19kZWZhdWx0XG59IGZyb20gXCIuL2NodW5rLjZKNlFZRkhWLmpzXCI7XG5pbXBvcnQge1xuICB3YXRjaFxufSBmcm9tIFwiLi9jaHVuay5QWkFONkZQTi5qc1wiO1xuaW1wb3J0IHtcbiAgX19kZWNvcmF0ZUNsYXNzXG59IGZyb20gXCIuL2NodW5rLjdWR0NJSERHLmpzXCI7XG5cbi8vIHNyYy9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLnRzXG5pbXBvcnQgeyBodG1sIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgcHJvcGVydHksIHF1ZXJ5LCBzdGF0ZSB9IGZyb20gXCJsaXQvZGVjb3JhdG9ycy5qc1wiO1xuaW1wb3J0IHsgY2xhc3NNYXAgfSBmcm9tIFwibGl0L2RpcmVjdGl2ZXMvY2xhc3MtbWFwLmpzXCI7XG5pbXBvcnQgeyBpZkRlZmluZWQgfSBmcm9tIFwibGl0L2RpcmVjdGl2ZXMvaWYtZGVmaW5lZC5qc1wiO1xuaW1wb3J0IHsgbGl2ZSB9IGZyb20gXCJsaXQvZGlyZWN0aXZlcy9saXZlLmpzXCI7XG52YXIgV2FUZXh0YXJlYSA9IGNsYXNzIGV4dGVuZHMgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy5hc3N1bWVJbnRlcmFjdGlvbk9uID0gW1wiYmx1clwiLCBcImlucHV0XCJdO1xuICAgIHRoaXMuaGFzU2xvdENvbnRyb2xsZXIgPSBuZXcgSGFzU2xvdENvbnRyb2xsZXIodGhpcywgXCJoaW50XCIsIFwibGFiZWxcIik7XG4gICAgdGhpcy50aXRsZSA9IFwiXCI7XG4gICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgdGhpcy5kZWZhdWx0VmFsdWUgPSB0aGlzLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpID8/IFwiXCI7XG4gICAgdGhpcy5zaXplID0gXCJtZWRpdW1cIjtcbiAgICB0aGlzLmFwcGVhcmFuY2UgPSBcIm91dGxpbmVkXCI7XG4gICAgdGhpcy5sYWJlbCA9IFwiXCI7XG4gICAgdGhpcy5oaW50ID0gXCJcIjtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gXCJcIjtcbiAgICB0aGlzLnJvd3MgPSA0O1xuICAgIHRoaXMucmVzaXplID0gXCJ2ZXJ0aWNhbFwiO1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlYWRvbmx5ID0gZmFsc2U7XG4gICAgdGhpcy5yZXF1aXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuc3BlbGxjaGVjayA9IHRydWU7XG4gICAgdGhpcy53aXRoTGFiZWwgPSBmYWxzZTtcbiAgICB0aGlzLndpdGhIaW50ID0gZmFsc2U7XG4gIH1cbiAgc3RhdGljIGdldCB2YWxpZGF0b3JzKCkge1xuICAgIHJldHVybiBbLi4uc3VwZXIudmFsaWRhdG9ycywgTWlycm9yVmFsaWRhdG9yKCldO1xuICB9XG4gIC8qKiBUaGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgaW5wdXQsIHN1Ym1pdHRlZCBhcyBhIG5hbWUvdmFsdWUgcGFpciB3aXRoIGZvcm0gZGF0YS4gKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIGlmICh0aGlzLnZhbHVlSGFzQ2hhbmdlZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdmFsdWUgPz8gdGhpcy5kZWZhdWx0VmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbCkge1xuICAgIGlmICh0aGlzLl92YWx1ZSA9PT0gdmFsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmFsdWVIYXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbDtcbiAgfVxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5zZXRUZXh0YXJlYURpbWVuc2lvbnMoKSk7XG4gICAgdGhpcy51cGRhdGVDb21wbGV0ZS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0VGV4dGFyZWFEaW1lbnNpb25zKCk7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5pbnB1dCk7XG4gICAgICBpZiAodGhpcy5kaWRTU1IgJiYgdGhpcy5pbnB1dCAmJiB0aGlzLnZhbHVlICE9PSB0aGlzLmlucHV0LnZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5pbnB1dC52YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgaWYgKHRoaXMuaW5wdXQpIHtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXI/LnVub2JzZXJ2ZSh0aGlzLmlucHV0KTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlQmx1cigpIHtcbiAgICB0aGlzLmNoZWNrVmFsaWRpdHkoKTtcbiAgfVxuICBoYW5kbGVDaGFuZ2UoZXZlbnQpIHtcbiAgICB0aGlzLnZhbHVlSGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuaW5wdXQudmFsdWU7XG4gICAgdGhpcy5zZXRUZXh0YXJlYURpbWVuc2lvbnMoKTtcbiAgICB0aGlzLmNoZWNrVmFsaWRpdHkoKTtcbiAgICB0aGlzLnJlbGF5TmF0aXZlRXZlbnQoZXZlbnQsIHsgYnViYmxlczogdHJ1ZSwgY29tcG9zZWQ6IHRydWUgfSk7XG4gIH1cbiAgaGFuZGxlSW5wdXQoZXZlbnQpIHtcbiAgICB0aGlzLnZhbHVlSGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuaW5wdXQudmFsdWU7XG4gICAgdGhpcy5yZWxheU5hdGl2ZUV2ZW50KGV2ZW50LCB7IGJ1YmJsZXM6IHRydWUsIGNvbXBvc2VkOiB0cnVlIH0pO1xuICB9XG4gIHNldFRleHRhcmVhRGltZW5zaW9ucygpIHtcbiAgICBpZiAodGhpcy5yZXNpemUgPT09IFwibm9uZVwiKSB7XG4gICAgICB0aGlzLmJhc2Uuc3R5bGUud2lkdGggPSBgYDtcbiAgICAgIHRoaXMuYmFzZS5zdHlsZS5oZWlnaHQgPSBgYDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVzaXplID09PSBcImF1dG9cIikge1xuICAgICAgdGhpcy5zaXplQWRqdXN0ZXIuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5pbnB1dC5jbGllbnRIZWlnaHR9cHhgO1xuICAgICAgdGhpcy5pbnB1dC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgICAgIHRoaXMuaW5wdXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5pbnB1dC5zY3JvbGxIZWlnaHR9cHhgO1xuICAgICAgdGhpcy5iYXNlLnN0eWxlLndpZHRoID0gYGA7XG4gICAgICB0aGlzLmJhc2Uuc3R5bGUuaGVpZ2h0ID0gYGA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlucHV0LnN0eWxlLndpZHRoKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IE51bWJlcih0aGlzLmlucHV0LnN0eWxlLndpZHRoLnNwbGl0KC9weC8pWzBdKSArIDI7XG4gICAgICB0aGlzLmJhc2Uuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgfVxuICAgIGlmICh0aGlzLmlucHV0LnN0eWxlLmhlaWdodCkge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gTnVtYmVyKHRoaXMuaW5wdXQuc3R5bGUuaGVpZ2h0LnNwbGl0KC9weC8pWzBdKSArIDI7XG4gICAgICB0aGlzLmJhc2Uuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICB9XG4gIH1cbiAgaGFuZGxlUm93c0NoYW5nZSgpIHtcbiAgICB0aGlzLnNldFRleHRhcmVhRGltZW5zaW9ucygpO1xuICB9XG4gIGFzeW5jIGhhbmRsZVZhbHVlQ2hhbmdlKCkge1xuICAgIGF3YWl0IHRoaXMudXBkYXRlQ29tcGxldGU7XG4gICAgdGhpcy5jaGVja1ZhbGlkaXR5KCk7XG4gICAgdGhpcy5zZXRUZXh0YXJlYURpbWVuc2lvbnMoKTtcbiAgfVxuICB1cGRhdGVkKGNoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcInJlc2l6ZVwiKSkge1xuICAgICAgdGhpcy5zZXRUZXh0YXJlYURpbWVuc2lvbnMoKTtcbiAgICB9XG4gICAgc3VwZXIudXBkYXRlZChjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgaWYgKGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcInZhbHVlXCIpKSB7XG4gICAgICB0aGlzLmN1c3RvbVN0YXRlcy5zZXQoXCJibGFua1wiLCAhdGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG4gIC8qKiBTZXRzIGZvY3VzIG9uIHRoZSB0ZXh0YXJlYS4gKi9cbiAgZm9jdXMob3B0aW9ucykge1xuICAgIHRoaXMuaW5wdXQuZm9jdXMob3B0aW9ucyk7XG4gIH1cbiAgLyoqIFJlbW92ZXMgZm9jdXMgZnJvbSB0aGUgdGV4dGFyZWEuICovXG4gIGJsdXIoKSB7XG4gICAgdGhpcy5pbnB1dC5ibHVyKCk7XG4gIH1cbiAgLyoqIFNlbGVjdHMgYWxsIHRoZSB0ZXh0IGluIHRoZSB0ZXh0YXJlYS4gKi9cbiAgc2VsZWN0KCkge1xuICAgIHRoaXMuaW5wdXQuc2VsZWN0KCk7XG4gIH1cbiAgLyoqIEdldHMgb3Igc2V0cyB0aGUgdGV4dGFyZWEncyBzY3JvbGwgcG9zaXRpb24uICovXG4gIHNjcm9sbFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICBpZiAodHlwZW9mIHBvc2l0aW9uLnRvcCA9PT0gXCJudW1iZXJcIikgdGhpcy5pbnB1dC5zY3JvbGxUb3AgPSBwb3NpdGlvbi50b3A7XG4gICAgICBpZiAodHlwZW9mIHBvc2l0aW9uLmxlZnQgPT09IFwibnVtYmVyXCIpIHRoaXMuaW5wdXQuc2Nyb2xsTGVmdCA9IHBvc2l0aW9uLmxlZnQ7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiB0aGlzLmlucHV0LnNjcm9sbFRvcCxcbiAgICAgIGxlZnQ6IHRoaXMuaW5wdXQuc2Nyb2xsVG9wXG4gICAgfTtcbiAgfVxuICAvKiogU2V0cyB0aGUgc3RhcnQgYW5kIGVuZCBwb3NpdGlvbnMgb2YgdGhlIHRleHQgc2VsZWN0aW9uICgwLWJhc2VkKS4gKi9cbiAgc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCwgc2VsZWN0aW9uRGlyZWN0aW9uID0gXCJub25lXCIpIHtcbiAgICB0aGlzLmlucHV0LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQsIHNlbGVjdGlvbkRpcmVjdGlvbik7XG4gIH1cbiAgLyoqIFJlcGxhY2VzIGEgcmFuZ2Ugb2YgdGV4dCB3aXRoIGEgbmV3IHN0cmluZy4gKi9cbiAgc2V0UmFuZ2VUZXh0KHJlcGxhY2VtZW50LCBzdGFydCwgZW5kLCBzZWxlY3RNb2RlID0gXCJwcmVzZXJ2ZVwiKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSBzdGFydCA/PyB0aGlzLmlucHV0LnNlbGVjdGlvblN0YXJ0O1xuICAgIGNvbnN0IHNlbGVjdGlvbkVuZCA9IGVuZCA/PyB0aGlzLmlucHV0LnNlbGVjdGlvbkVuZDtcbiAgICB0aGlzLmlucHV0LnNldFJhbmdlVGV4dChyZXBsYWNlbWVudCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCwgc2VsZWN0TW9kZSk7XG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHRoaXMuaW5wdXQudmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgICAgdGhpcy5zZXRUZXh0YXJlYURpbWVuc2lvbnMoKTtcbiAgICB9XG4gIH1cbiAgZm9ybVJlc2V0Q2FsbGJhY2soKSB7XG4gICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuICAgIGlmICh0aGlzLmlucHV0KSB7XG4gICAgICB0aGlzLmlucHV0LnZhbHVlID0gdGhpcy52YWx1ZSB8fCBcIlwiO1xuICAgIH1cbiAgICBzdXBlci5mb3JtUmVzZXRDYWxsYmFjaygpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBoYXNMYWJlbFNsb3QgPSB0aGlzLmhhc1VwZGF0ZWQgPyB0aGlzLmhhc1Nsb3RDb250cm9sbGVyLnRlc3QoXCJsYWJlbFwiKSA6IHRoaXMud2l0aExhYmVsO1xuICAgIGNvbnN0IGhhc0hpbnRTbG90ID0gdGhpcy5oYXNVcGRhdGVkID8gdGhpcy5oYXNTbG90Q29udHJvbGxlci50ZXN0KFwiaGludFwiKSA6IHRoaXMud2l0aEhpbnQ7XG4gICAgY29uc3QgaGFzTGFiZWwgPSB0aGlzLmxhYmVsID8gdHJ1ZSA6ICEhaGFzTGFiZWxTbG90O1xuICAgIGNvbnN0IGhhc0hpbnQgPSB0aGlzLmhpbnQgPyB0cnVlIDogISFoYXNIaW50U2xvdDtcbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxsYWJlbFxuICAgICAgICBwYXJ0PVwiZm9ybS1jb250cm9sLWxhYmVsIGxhYmVsXCJcbiAgICAgICAgY2xhc3M9JHtjbGFzc01hcCh7XG4gICAgICBsYWJlbDogdHJ1ZSxcbiAgICAgIFwiaGFzLWxhYmVsXCI6IGhhc0xhYmVsXG4gICAgfSl9XG4gICAgICAgIGZvcj1cImlucHV0XCJcbiAgICAgICAgYXJpYS1oaWRkZW49JHtoYXNMYWJlbCA/IFwiZmFsc2VcIiA6IFwidHJ1ZVwifVxuICAgICAgPlxuICAgICAgICA8c2xvdCBuYW1lPVwibGFiZWxcIj4ke3RoaXMubGFiZWx9PC9zbG90PlxuICAgICAgPC9sYWJlbD5cblxuICAgICAgPGRpdiBwYXJ0PVwiYmFzZVwiIGNsYXNzPVwidGV4dGFyZWFcIj5cbiAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgcGFydD1cInRleHRhcmVhXCJcbiAgICAgICAgICBpZD1cImlucHV0XCJcbiAgICAgICAgICBjbGFzcz1cImNvbnRyb2xcIlxuICAgICAgICAgIHRpdGxlPSR7dGhpcy50aXRsZX1cbiAgICAgICAgICBuYW1lPSR7aWZEZWZpbmVkKHRoaXMubmFtZSl9XG4gICAgICAgICAgLnZhbHVlPSR7bGl2ZSh0aGlzLnZhbHVlKX1cbiAgICAgICAgICA/ZGlzYWJsZWQ9JHt0aGlzLmRpc2FibGVkfVxuICAgICAgICAgID9yZWFkb25seT0ke3RoaXMucmVhZG9ubHl9XG4gICAgICAgICAgP3JlcXVpcmVkPSR7dGhpcy5yZXF1aXJlZH1cbiAgICAgICAgICBwbGFjZWhvbGRlcj0ke2lmRGVmaW5lZCh0aGlzLnBsYWNlaG9sZGVyKX1cbiAgICAgICAgICByb3dzPSR7aWZEZWZpbmVkKHRoaXMucm93cyl9XG4gICAgICAgICAgbWlubGVuZ3RoPSR7aWZEZWZpbmVkKHRoaXMubWlubGVuZ3RoKX1cbiAgICAgICAgICBtYXhsZW5ndGg9JHtpZkRlZmluZWQodGhpcy5tYXhsZW5ndGgpfVxuICAgICAgICAgIGF1dG9jYXBpdGFsaXplPSR7aWZEZWZpbmVkKHRoaXMuYXV0b2NhcGl0YWxpemUpfVxuICAgICAgICAgIGF1dG9jb3JyZWN0PSR7aWZEZWZpbmVkKHRoaXMuYXV0b2NvcnJlY3QpfVxuICAgICAgICAgID9hdXRvZm9jdXM9JHt0aGlzLmF1dG9mb2N1c31cbiAgICAgICAgICBzcGVsbGNoZWNrPSR7aWZEZWZpbmVkKHRoaXMuc3BlbGxjaGVjayl9XG4gICAgICAgICAgZW50ZXJrZXloaW50PSR7aWZEZWZpbmVkKHRoaXMuZW50ZXJrZXloaW50KX1cbiAgICAgICAgICBpbnB1dG1vZGU9JHtpZkRlZmluZWQodGhpcy5pbnB1dG1vZGUpfVxuICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJoaW50XCJcbiAgICAgICAgICBAY2hhbmdlPSR7dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgQGlucHV0PSR7dGhpcy5oYW5kbGVJbnB1dH1cbiAgICAgICAgICBAYmx1cj0ke3RoaXMuaGFuZGxlQmx1cn1cbiAgICAgICAgPjwvdGV4dGFyZWE+XG5cbiAgICAgICAgPCEtLSBUaGlzIFwiYWRqdXN0ZXJcIiBleGlzdHMgdG8gcHJldmVudCBsYXlvdXQgc2hpZnRpbmcuIGh0dHBzOi8vZ2l0aHViLmNvbS9zaG9lbGFjZS1zdHlsZS9zaG9lbGFjZS9pc3N1ZXMvMjE4MCAtLT5cbiAgICAgICAgPGRpdiBwYXJ0PVwidGV4dGFyZWEtYWRqdXN0ZXJcIiBjbGFzcz1cInNpemUtYWRqdXN0ZXJcIiA/aGlkZGVuPSR7dGhpcy5yZXNpemUgIT09IFwiYXV0b1wifT48L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8c2xvdFxuICAgICAgICBpZD1cImhpbnRcIlxuICAgICAgICBuYW1lPVwiaGludFwiXG4gICAgICAgIHBhcnQ9XCJoaW50XCJcbiAgICAgICAgYXJpYS1oaWRkZW49JHtoYXNIaW50ID8gXCJmYWxzZVwiIDogXCJ0cnVlXCJ9XG4gICAgICAgIGNsYXNzPSR7Y2xhc3NNYXAoe1xuICAgICAgXCJoYXMtc2xvdHRlZFwiOiBoYXNIaW50XG4gICAgfSl9XG4gICAgICAgID4ke3RoaXMuaGludH08L3Nsb3RcbiAgICAgID5cbiAgICBgO1xuICB9XG59O1xuV2FUZXh0YXJlYS5jc3MgPSBbdGV4dGFyZWFfc3R5bGVzX2RlZmF1bHQsIGZvcm1fY29udHJvbF9zdHlsZXNfZGVmYXVsdCwgc2l6ZV9zdHlsZXNfZGVmYXVsdF07XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBxdWVyeShcIi5jb250cm9sXCIpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJpbnB1dFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHF1ZXJ5KCdbcGFydH49XCJiYXNlXCJdJylcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImJhc2VcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBxdWVyeShcIi5zaXplLWFkanVzdGVyXCIpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJzaXplQWRqdXN0ZXJcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJ0aXRsZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwibmFtZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHN0YXRlKClcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcInZhbHVlXCIsIDEpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwidmFsdWVcIiwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiZGVmYXVsdFZhbHVlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJzaXplXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJhcHBlYXJhbmNlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwibGFiZWxcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJoaW50XCIgfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImhpbnRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJwbGFjZWhvbGRlclwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogTnVtYmVyIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJyb3dzXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJyZXNpemVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4gfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImRpc2FibGVkXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJyZWFkb25seVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwicmVxdWlyZWRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IE51bWJlciB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwibWlubGVuZ3RoXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBOdW1iZXIgfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcIm1heGxlbmd0aFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImF1dG9jYXBpdGFsaXplXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiYXV0b2NvcnJlY3RcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJhdXRvY29tcGxldGVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4gfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImF1dG9mb2N1c1wiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImVudGVya2V5aGludFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGNvbnZlcnRlcjoge1xuICAgICAgLy8gQWxsb3cgXCJ0cnVlfGZhbHNlXCIgYXR0cmlidXRlIHZhbHVlcyBidXQga2VlcCB0aGUgcHJvcGVydHkgYm9vbGVhblxuICAgICAgZnJvbUF0dHJpYnV0ZTogKHZhbHVlKSA9PiAhdmFsdWUgfHwgdmFsdWUgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgIHRvQXR0cmlidXRlOiAodmFsdWUpID0+IHZhbHVlID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJcbiAgICB9XG4gIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJzcGVsbGNoZWNrXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiaW5wdXRtb2RlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwid2l0aC1sYWJlbFwiLCB0eXBlOiBCb29sZWFuIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJ3aXRoTGFiZWxcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJ3aXRoLWhpbnRcIiwgdHlwZTogQm9vbGVhbiB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwid2l0aEhpbnRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICB3YXRjaChcInJvd3NcIiwgeyB3YWl0VW50aWxGaXJzdFVwZGF0ZTogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiaGFuZGxlUm93c0NoYW5nZVwiLCAxKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHdhdGNoKFwidmFsdWVcIiwgeyB3YWl0VW50aWxGaXJzdFVwZGF0ZTogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiaGFuZGxlVmFsdWVDaGFuZ2VcIiwgMSk7XG5XYVRleHRhcmVhID0gX19kZWNvcmF0ZUNsYXNzKFtcbiAgY3VzdG9tRWxlbWVudChcIndhLXRleHRhcmVhXCIpXG5dLCBXYVRleHRhcmVhKTtcblxuZXhwb3J0IHtcbiAgV2FUZXh0YXJlYVxufTtcbiIsICJpbXBvcnQgeyBMaXRFbGVtZW50LCBodG1sLCBjc3MgfSBmcm9tICdsaXQnO1xuaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgcHJvcGVydHksIHN0YXRlIH0gZnJvbSAnbGl0L2RlY29yYXRvcnMuanMnO1xuXG5pbXBvcnQgJ0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jb21wb25lbnRzL2J1dHRvbi9idXR0b24uanMnO1xuaW1wb3J0ICdAYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5qcyc7XG5cbkBjdXN0b21FbGVtZW50KCd0aHJlYWRzLWlubGluZS1lZGl0b3InKVxuZXhwb3J0IGNsYXNzIFRocmVhZHNJbmxpbmVFZGl0b3IgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgc3RhdGljIG92ZXJyaWRlIHN0eWxlcyA9IGNzc2BcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIG1hcmdpbjogMTZweCAwO1xuICAgIH1cbiAgICAuZWRpdG9yIHtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlciwgaHNsKDAgMCUgODkuOCUpKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cywgNnB4KTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1jYXJkLCBoc2woMCAwJSAxMDAlKSk7XG4gICAgICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2IoMCAwIDAgLyAwLjA1KTtcbiAgICB9XG4gICAgLmVkaXRvci1ib2R5IHtcbiAgICAgIHBhZGRpbmc6IDEycHg7XG4gICAgfVxuICAgIC5lZGl0b3ItZm9vdGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgcGFkZGluZzogOHB4IDEycHg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyLCBoc2woMCAwJSA4OS44JSkpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0td2EtY29sb3Itc3VyZmFjZS1yYWlzZWQsIGhzbCgwIDAlIDk2LjElKSk7XG4gICAgfVxuICAgIC5oaW50IHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZywgaHNsKDAgMCUgNDUuMSUpKTtcbiAgICB9XG4gICAgLmFjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogNnB4O1xuICAgIH1cbiAgYDtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSkgcXVvdGUgPSAnJztcbiAgQHN0YXRlKCkgcHJpdmF0ZSB2YWx1ZSA9ICcnO1xuICBAc3RhdGUoKSBwcml2YXRlIHN1Ym1pdHRpbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIF9pbm5lclRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX25hdGl2ZUlucHV0TGlzdGVuZXIgPSAoZTogRXZlbnQpID0+IHtcbiAgICB0aGlzLnZhbHVlID0gKGUudGFyZ2V0IGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQpLnZhbHVlO1xuICB9O1xuXG4gIHByaXZhdGUgX2F0dGFjaE5hdGl2ZUxpc3RlbmVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHdhVGV4dGFyZWEgPSB0aGlzLnNoYWRvd1Jvb3Q/LnF1ZXJ5U2VsZWN0b3IoJ3dhLXRleHRhcmVhJyk7XG4gICAgaWYgKCF3YVRleHRhcmVhKSByZXR1cm47XG4gICAgY29uc3QgaW5uZXIgPSAod2FUZXh0YXJlYSBhcyBFbGVtZW50KS5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBudWxsO1xuICAgIGlmIChpbm5lciAmJiBpbm5lciAhPT0gdGhpcy5faW5uZXJUZXh0YXJlYSkge1xuICAgICAgaWYgKHRoaXMuX2lubmVyVGV4dGFyZWEpIHtcbiAgICAgICAgdGhpcy5faW5uZXJUZXh0YXJlYS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuX25hdGl2ZUlucHV0TGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy5faW5uZXJUZXh0YXJlYSA9IGlubmVyO1xuICAgICAgaW5uZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLl9uYXRpdmVJbnB1dExpc3RlbmVyKTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgLy8gQXR0YWNoIG5hdGl2ZSBpbnB1dCBsaXN0ZW5lciBhbmQgZm9jdXMgYWZ0ZXIgd2EtdGV4dGFyZWEgdXBncmFkZXMgaXRzIGludGVybmFsIERPTS5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5fYXR0YWNoTmF0aXZlTGlzdGVuZXIoKTtcbiAgICAgIGNvbnN0IGlubmVyID0gdGhpcy5faW5uZXJUZXh0YXJlYTtcbiAgICAgIGlmIChpbm5lcikge1xuICAgICAgICBpbm5lci5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgd2FUZXh0YXJlYSA9IHRoaXMuc2hhZG93Um9vdD8ucXVlcnlTZWxlY3Rvcignd2EtdGV4dGFyZWEnKTtcbiAgICAgICAgKHdhVGV4dGFyZWEgYXMgdW5rbm93biBhcyBIVE1MRWxlbWVudCk/LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvdmVycmlkZSB1cGRhdGVkKCkge1xuICAgIHRoaXMuX2F0dGFjaE5hdGl2ZUxpc3RlbmVyKCk7XG4gIH1cblxuICBvdmVycmlkZSBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIGlmICh0aGlzLl9pbm5lclRleHRhcmVhKSB7XG4gICAgICB0aGlzLl9pbm5lclRleHRhcmVhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5fbmF0aXZlSW5wdXRMaXN0ZW5lcik7XG4gICAgICB0aGlzLl9pbm5lclRleHRhcmVhID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUlucHV0KGU6IEV2ZW50KSB7XG4gICAgdGhpcy52YWx1ZSA9IChlLnRhcmdldCBhcyBhbnkpLnZhbHVlID8/ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUZXh0YXJlYVZhbHVlKCk6IHN0cmluZyB7XG4gICAgLy8gUmVhZCBmcm9tIG5hdGl2ZSB0ZXh0YXJlYSBhcyBzb3VyY2Ugb2YgdHJ1dGggKGhhbmRsZXMgUGxheXdyaWdodCBmaWxsKCkpXG4gICAgaWYgKHRoaXMuX2lubmVyVGV4dGFyZWEpIHJldHVybiB0aGlzLl9pbm5lclRleHRhcmVhLnZhbHVlO1xuICAgIGNvbnN0IHdhVGV4dGFyZWEgPSB0aGlzLnNoYWRvd1Jvb3Q/LnF1ZXJ5U2VsZWN0b3IoJ3dhLXRleHRhcmVhJykgYXMgYW55O1xuICAgIGlmICh3YVRleHRhcmVhPy52YWx1ZSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gU3RyaW5nKHdhVGV4dGFyZWEudmFsdWUpO1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJtaXQoKSB7XG4gICAgY29uc3QgYm9keSA9IHRoaXMuZ2V0VGV4dGFyZWFWYWx1ZSgpLnRyaW0oKTtcbiAgICBpZiAoIWJvZHkgfHwgdGhpcy5zdWJtaXR0aW5nKSByZXR1cm47XG4gICAgdGhpcy52YWx1ZSA9IGJvZHk7IC8vIHN5bmMgc3RhdGVcbiAgICB0aGlzLnN1Ym1pdHRpbmcgPSB0cnVlO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2lubGluZS1zdWJtaXQnLCB7XG4gICAgICBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIGRldGFpbDogeyBib2R5IH0sXG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjYW5jZWwoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaW5saW5lLWNhbmNlbCcsIHtcbiAgICAgIGJ1YmJsZXM6IHRydWUsIGNvbXBvc2VkOiB0cnVlLFxuICAgIH0pKTtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlbmRlcigpIHtcbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3JcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci1ib2R5XCI+XG4gICAgICAgICAgPHdhLXRleHRhcmVhXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIldyaXRlIHlvdXIgY29tbWVudC4uLlwiXG4gICAgICAgICAgICAudmFsdWU9JHt0aGlzLnZhbHVlfVxuICAgICAgICAgICAgcm93cz1cIjNcIlxuICAgICAgICAgICAgcmVzaXplPVwidmVydGljYWxcIlxuICAgICAgICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgICAgIEB3YS1pbnB1dD0ke3RoaXMuaGFuZGxlSW5wdXR9XG4gICAgICAgICAgICBAaW5wdXQ9JHt0aGlzLmhhbmRsZUlucHV0fVxuICAgICAgICAgICAgQGtleWRvd249JHsoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicgJiYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkpKSB0aGlzLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB0aGlzLmNhbmNlbCgpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+PC93YS10ZXh0YXJlYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItZm9vdGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJoaW50XCI+Q21kK0VudGVyIHRvIHN1Ym1pdDwvc3Bhbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPlxuICAgICAgICAgICAgPHdhLWJ1dHRvbiBzaXplPVwic21hbGxcIiBhcHBlYXJhbmNlPVwib3V0bGluZWRcIiBAY2xpY2s9JHt0aGlzLmNhbmNlbH0+Q2FuY2VsPC93YS1idXR0b24+XG4gICAgICAgICAgICA8d2EtYnV0dG9uXG4gICAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJicmFuZFwiXG4gICAgICAgICAgICAgID9kaXNhYmxlZD0keyF0aGlzLnZhbHVlLnRyaW0oKSB8fCB0aGlzLnN1Ym1pdHRpbmd9XG4gICAgICAgICAgICAgIEBjbGljaz0ke3RoaXMuc3VibWl0fVxuICAgICAgICAgICAgPiR7dGhpcy5zdWJtaXR0aW5nID8gJ1NhdmluZy4uLicgOiAnU3VibWl0J308L3dhLWJ1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvaW50ZXJuYWwvb2Zmc2V0LnRzXG5mdW5jdGlvbiBnZXRPZmZzZXQoZWxlbWVudCwgcGFyZW50KSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiBNYXRoLnJvdW5kKGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCksXG4gICAgbGVmdDogTWF0aC5yb3VuZChlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdClcbiAgfTtcbn1cblxuLy8gc3JjL2ludGVybmFsL3Njcm9sbC50c1xudmFyIGxvY2tzID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbmZ1bmN0aW9uIGdldFNjcm9sbGJhcldpZHRoKCkge1xuICBjb25zdCBkb2N1bWVudFdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICByZXR1cm4gTWF0aC5hYnMod2luZG93LmlubmVyV2lkdGggLSBkb2N1bWVudFdpZHRoKTtcbn1cbmZ1bmN0aW9uIGdldEV4aXN0aW5nQm9keVBhZGRpbmcoKSB7XG4gIGNvbnN0IHBhZGRpbmcgPSBOdW1iZXIoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KS5wYWRkaW5nUmlnaHQucmVwbGFjZSgvcHgvLCBcIlwiKSk7XG4gIGlmIChpc05hTihwYWRkaW5nKSB8fCAhcGFkZGluZykge1xuICAgIHJldHVybiAwO1xuICB9XG4gIHJldHVybiBwYWRkaW5nO1xufVxuZnVuY3Rpb24gbG9ja0JvZHlTY3JvbGxpbmcobG9ja2luZ0VsKSB7XG4gIGxvY2tzLmFkZChsb2NraW5nRWwpO1xuICBpZiAoIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJ3YS1zY3JvbGwtbG9ja1wiKSkge1xuICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gZ2V0U2Nyb2xsYmFyV2lkdGgoKSArIGdldEV4aXN0aW5nQm9keVBhZGRpbmcoKTtcbiAgICBsZXQgc2Nyb2xsYmFyR3V0dGVyUHJvcGVydHkgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuc2Nyb2xsYmFyR3V0dGVyO1xuICAgIGlmICghc2Nyb2xsYmFyR3V0dGVyUHJvcGVydHkgfHwgc2Nyb2xsYmFyR3V0dGVyUHJvcGVydHkgPT09IFwiYXV0b1wiKSB7XG4gICAgICBzY3JvbGxiYXJHdXR0ZXJQcm9wZXJ0eSA9IFwic3RhYmxlXCI7XG4gICAgfVxuICAgIGlmIChzY3JvbGxiYXJXaWR0aCA8IDIpIHtcbiAgICAgIHNjcm9sbGJhckd1dHRlclByb3BlcnR5ID0gXCJcIjtcbiAgICB9XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwiLS13YS1zY3JvbGwtbG9jay1ndXR0ZXJcIiwgc2Nyb2xsYmFyR3V0dGVyUHJvcGVydHkpO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwid2Etc2Nyb2xsLWxvY2tcIik7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwiLS13YS1zY3JvbGwtbG9jay1zaXplXCIsIGAke3Njcm9sbGJhcldpZHRofXB4YCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHVubG9ja0JvZHlTY3JvbGxpbmcobG9ja2luZ0VsKSB7XG4gIGxvY2tzLmRlbGV0ZShsb2NraW5nRWwpO1xuICBpZiAobG9ja3Muc2l6ZSA9PT0gMCkge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwid2Etc2Nyb2xsLWxvY2tcIik7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiLS13YS1zY3JvbGwtbG9jay1zaXplXCIpO1xuICB9XG59XG5mdW5jdGlvbiBzY3JvbGxJbnRvVmlldyhlbGVtZW50LCBjb250YWluZXIsIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIiwgYmVoYXZpb3IgPSBcInNtb290aFwiKSB7XG4gIGNvbnN0IG9mZnNldCA9IGdldE9mZnNldChlbGVtZW50LCBjb250YWluZXIpO1xuICBjb25zdCBvZmZzZXRUb3AgPSBvZmZzZXQudG9wICsgY29udGFpbmVyLnNjcm9sbFRvcDtcbiAgY29uc3Qgb2Zmc2V0TGVmdCA9IG9mZnNldC5sZWZ0ICsgY29udGFpbmVyLnNjcm9sbExlZnQ7XG4gIGNvbnN0IG1pblggPSBjb250YWluZXIuc2Nyb2xsTGVmdDtcbiAgY29uc3QgbWF4WCA9IGNvbnRhaW5lci5zY3JvbGxMZWZ0ICsgY29udGFpbmVyLm9mZnNldFdpZHRoO1xuICBjb25zdCBtaW5ZID0gY29udGFpbmVyLnNjcm9sbFRvcDtcbiAgY29uc3QgbWF4WSA9IGNvbnRhaW5lci5zY3JvbGxUb3AgKyBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIiB8fCBkaXJlY3Rpb24gPT09IFwiYm90aFwiKSB7XG4gICAgaWYgKG9mZnNldExlZnQgPCBtaW5YKSB7XG4gICAgICBjb250YWluZXIuc2Nyb2xsVG8oeyBsZWZ0OiBvZmZzZXRMZWZ0LCBiZWhhdmlvciB9KTtcbiAgICB9IGVsc2UgaWYgKG9mZnNldExlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoID4gbWF4WCkge1xuICAgICAgY29udGFpbmVyLnNjcm9sbFRvKHsgbGVmdDogb2Zmc2V0TGVmdCAtIGNvbnRhaW5lci5vZmZzZXRXaWR0aCArIGVsZW1lbnQuY2xpZW50V2lkdGgsIGJlaGF2aW9yIH0pO1xuICAgIH1cbiAgfVxuICBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIgfHwgZGlyZWN0aW9uID09PSBcImJvdGhcIikge1xuICAgIGlmIChvZmZzZXRUb3AgPCBtaW5ZKSB7XG4gICAgICBjb250YWluZXIuc2Nyb2xsVG8oeyB0b3A6IG9mZnNldFRvcCwgYmVoYXZpb3IgfSk7XG4gICAgfSBlbHNlIGlmIChvZmZzZXRUb3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCA+IG1heFkpIHtcbiAgICAgIGNvbnRhaW5lci5zY3JvbGxUbyh7IHRvcDogb2Zmc2V0VG9wIC0gY29udGFpbmVyLm9mZnNldEhlaWdodCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0LCBiZWhhdmlvciB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgbG9ja0JvZHlTY3JvbGxpbmcsXG4gIHVubG9ja0JvZHlTY3JvbGxpbmcsXG4gIHNjcm9sbEludG9WaWV3XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2ludGVybmFsL3BhcnNlLnRzXG5mdW5jdGlvbiBwYXJzZVNwYWNlRGVsaW1pdGVkVG9rZW5zKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC5zcGxpdChcIiBcIikubWFwKCh0b2tlbikgPT4gdG9rZW4udHJpbSgpKS5maWx0ZXIoKHRva2VuKSA9PiB0b2tlbiAhPT0gXCJcIik7XG59XG5cbmV4cG9ydCB7XG4gIHBhcnNlU3BhY2VEZWxpbWl0ZWRUb2tlbnNcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLnN0eWxlcy50c1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcImxpdFwiO1xudmFyIGRpYWxvZ19zdHlsZXNfZGVmYXVsdCA9IGNzc2BcbiAgOmhvc3Qge1xuICAgIC0td2lkdGg6IDMxcmVtO1xuICAgIC0tc3BhY2luZzogdmFyKC0td2Etc3BhY2UtbCk7XG4gICAgLS1zaG93LWR1cmF0aW9uOiAyMDBtcztcbiAgICAtLWhpZGUtZHVyYXRpb246IDIwMG1zO1xuXG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gIDpob3N0KFtvcGVuXSkge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG5cbiAgLmRpYWxvZyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbiAgICBib3R0b206IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogdmFyKC0td2lkdGgpO1xuICAgIG1heC13aWR0aDogY2FsYygxMDAlIC0gdmFyKC0td2Etc3BhY2UtMnhsKSk7XG4gICAgbWF4LWhlaWdodDogY2FsYygxMDAlIC0gdmFyKC0td2Etc3BhY2UtMnhsKSk7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2EtY29sb3Itc3VyZmFjZS1yYWlzZWQpO1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXdhLXBhbmVsLWJvcmRlci1yYWRpdXMpO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3gtc2hhZG93OiB2YXIoLS13YS1zaGFkb3ctbCk7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXJnaW46IGF1dG87XG5cbiAgICAmLnNob3cge1xuICAgICAgYW5pbWF0aW9uOiBzaG93LWRpYWxvZyB2YXIoLS1zaG93LWR1cmF0aW9uKSBlYXNlO1xuXG4gICAgICAmOjpiYWNrZHJvcCB7XG4gICAgICAgIGFuaW1hdGlvbjogc2hvdy1iYWNrZHJvcCB2YXIoLS1zaG93LWR1cmF0aW9uLCAyMDBtcykgZWFzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLmhpZGUge1xuICAgICAgYW5pbWF0aW9uOiBzaG93LWRpYWxvZyB2YXIoLS1oaWRlLWR1cmF0aW9uKSBlYXNlIHJldmVyc2U7XG5cbiAgICAgICY6OmJhY2tkcm9wIHtcbiAgICAgICAgYW5pbWF0aW9uOiBzaG93LWJhY2tkcm9wIHZhcigtLWhpZGUtZHVyYXRpb24sIDIwMG1zKSBlYXNlIHJldmVyc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5wdWxzZSB7XG4gICAgICBhbmltYXRpb246IHB1bHNlIDI1MG1zIGVhc2U7XG4gICAgfVxuICB9XG5cbiAgLmRpYWxvZzpmb2N1cyB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxuXG4gIC8qIEVuc3VyZSB0aGVyZSdzIGVub3VnaCB2ZXJ0aWNhbCBwYWRkaW5nIGZvciBwaG9uZXMgdGhhdCBkb24ndCB1cGRhdGUgdmggd2hlbiBjaHJvbWUgYXBwZWFycyAoZS5nLiBpUGhvbmUpICovXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQyMHB4KSB7XG4gICAgLmRpYWxvZyB7XG4gICAgICBtYXgtaGVpZ2h0OiA4MHZoO1xuICAgIH1cbiAgfVxuXG4gIC5vcGVuIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cblxuICAuaGVhZGVyIHtcbiAgICBmbGV4OiAwIDAgYXV0bztcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogbm93cmFwO1xuXG4gICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IHZhcigtLXNwYWNpbmcpO1xuICAgIHBhZGRpbmctYmxvY2stZW5kOiAwO1xuXG4gICAgLyogU3VidHJhY3QgdGhlIGNsb3NlIGJ1dHRvbidzIHBhZGRpbmcgc28gdGhhdCB0aGUgWCBpcyB2aXN1YWxseSBhbGlnbmVkIHdpdGggdGhlIGVkZ2VzIG9mIHRoZSBkaWFsb2cgY29udGVudCAqL1xuICAgIHBhZGRpbmctaW5saW5lLWVuZDogY2FsYyh2YXIoLS1zcGFjaW5nKSAtIHZhcigtLXdhLWZvcm0tY29udHJvbC1wYWRkaW5nLWJsb2NrKSk7XG4gICAgcGFkZGluZy1ibG9jay1zdGFydDogY2FsYyh2YXIoLS1zcGFjaW5nKSAtIHZhcigtLXdhLWZvcm0tY29udHJvbC1wYWRkaW5nLWJsb2NrKSk7XG4gIH1cblxuICAudGl0bGUge1xuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICBmbGV4OiAxIDEgYXV0bztcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgICBmb250LXNpemU6IHZhcigtLXdhLWZvbnQtc2l6ZS1sKTtcbiAgICBmb250LXdlaWdodDogdmFyKC0td2EtZm9udC13ZWlnaHQtaGVhZGluZyk7XG4gICAgbGluZS1oZWlnaHQ6IHZhcigtLXdhLWxpbmUtaGVpZ2h0LWNvbmRlbnNlZCk7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgLmhlYWRlci1hY3Rpb25zIHtcbiAgICBhbGlnbi1zZWxmOiBzdGFydDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcbiAgICBnYXA6IHZhcigtLXdhLXNwYWNlLTJ4cyk7XG4gICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IHZhcigtLXNwYWNpbmcpO1xuICB9XG5cbiAgLmhlYWRlci1hY3Rpb25zIHdhLWJ1dHRvbixcbiAgLmhlYWRlci1hY3Rpb25zIDo6c2xvdHRlZCh3YS1idXR0b24pIHtcbiAgICBmbGV4OiAwIDAgYXV0bztcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICAuYm9keSB7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcGFkZGluZzogdmFyKC0tc3BhY2luZyk7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xuXG4gICAgJjpmb2N1cyB7XG4gICAgICBvdXRsaW5lOiBub25lO1xuICAgIH1cblxuICAgICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgICBvdXRsaW5lOiB2YXIoLS13YS1mb2N1cy1yaW5nKTtcbiAgICAgIG91dGxpbmUtb2Zmc2V0OiB2YXIoLS13YS1mb2N1cy1yaW5nLW9mZnNldCk7XG4gICAgfVxuICB9XG5cbiAgLmZvb3RlciB7XG4gICAgZmxleDogMCAwIGF1dG87XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgZ2FwOiB2YXIoLS13YS1zcGFjZS14cyk7XG4gICAganVzdGlmeS1jb250ZW50OiBlbmQ7XG4gICAgcGFkZGluZzogdmFyKC0tc3BhY2luZyk7XG4gICAgcGFkZGluZy1ibG9jay1zdGFydDogMDtcbiAgfVxuXG4gIC5mb290ZXIgOjpzbG90dGVkKHdhLWJ1dHRvbjpub3QoOmZpcnN0LW9mLXR5cGUpKSB7XG4gICAgbWFyZ2luLWlubGluZS1zdGFydDogdmFyKC0td2Etc3BhY2luZy14cyk7XG4gIH1cblxuICAuZGlhbG9nOjpiYWNrZHJvcCB7XG4gICAgLypcbiAgICAgIE5PVEU6IHRoZSA6OmJhY2tkcm9wIGVsZW1lbnQgZG9lc24ndCBpbmhlcml0IHByb3Blcmx5IGluIFNhZmFyaSB5ZXQsIGJ1dCBpdCB3aWxsIGluIDE3LjQhIEF0IHRoYXQgdGltZSwgd2UgY2FuXG4gICAgICByZW1vdmUgdGhlIGZhbGxiYWNrIHZhbHVlcyBoZXJlLlxuICAgICovXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2EtY29sb3Itb3ZlcmxheS1tb2RhbCwgcmdiKDAgMCAwIC8gMC4yNSkpO1xuICB9XG5cbiAgQGtleWZyYW1lcyBwdWxzZSB7XG4gICAgMCUge1xuICAgICAgc2NhbGU6IDE7XG4gICAgfVxuICAgIDUwJSB7XG4gICAgICBzY2FsZTogMS4wMjtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICBzY2FsZTogMTtcbiAgICB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIHNob3ctZGlhbG9nIHtcbiAgICBmcm9tIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICBzY2FsZTogMC44O1xuICAgIH1cbiAgICB0byB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgc2NhbGU6IDE7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBzaG93LWJhY2tkcm9wIHtcbiAgICBmcm9tIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgfVxuICAgIHRvIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuICB9XG5cbiAgQG1lZGlhIChmb3JjZWQtY29sb3JzOiBhY3RpdmUpIHtcbiAgICAuZGlhbG9nIHtcbiAgICAgIGJvcmRlcjogc29saWQgMXB4IHdoaXRlO1xuICAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IHtcbiAgZGlhbG9nX3N0eWxlc19kZWZhdWx0XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2ludGVybmFsL2Rpc21pc3NpYmxlLXN0YWNrLnRzXG52YXIgZGlzbWlzc2libGVTdGFjayA9IFtdO1xuZnVuY3Rpb24gcmVnaXN0ZXJEaXNtaXNzaWJsZShrZXkpIHtcbiAgZGlzbWlzc2libGVTdGFjay5wdXNoKGtleSk7XG59XG5mdW5jdGlvbiB1bnJlZ2lzdGVyRGlzbWlzc2libGUoa2V5KSB7XG4gIGZvciAobGV0IGkgPSBkaXNtaXNzaWJsZVN0YWNrLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGRpc21pc3NpYmxlU3RhY2tbaV0gPT09IGtleSkge1xuICAgICAgZGlzbWlzc2libGVTdGFjay5zcGxpY2UoaSwgMSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIGlzVG9wRGlzbWlzc2libGUoa2V5KSB7XG4gIHJldHVybiBkaXNtaXNzaWJsZVN0YWNrLmxlbmd0aCA+IDAgJiYgZGlzbWlzc2libGVTdGFja1tkaXNtaXNzaWJsZVN0YWNrLmxlbmd0aCAtIDFdID09PSBrZXk7XG59XG5cbmV4cG9ydCB7XG4gIHJlZ2lzdGVyRGlzbWlzc2libGUsXG4gIHVucmVnaXN0ZXJEaXNtaXNzaWJsZSxcbiAgaXNUb3BEaXNtaXNzaWJsZVxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9ldmVudHMvc2hvdy50c1xudmFyIFdhU2hvd0V2ZW50ID0gY2xhc3MgZXh0ZW5kcyBFdmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFwid2Etc2hvd1wiLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUsIGNvbXBvc2VkOiB0cnVlIH0pO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBXYVNob3dFdmVudFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9ldmVudHMvaGlkZS50c1xudmFyIFdhSGlkZUV2ZW50ID0gY2xhc3MgZXh0ZW5kcyBFdmVudCB7XG4gIGNvbnN0cnVjdG9yKGRldGFpbCkge1xuICAgIHN1cGVyKFwid2EtaGlkZVwiLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUsIGNvbXBvc2VkOiB0cnVlIH0pO1xuICAgIHRoaXMuZGV0YWlsID0gZGV0YWlsO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBXYUhpZGVFdmVudFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9ldmVudHMvYWZ0ZXItaGlkZS50c1xudmFyIFdhQWZ0ZXJIaWRlRXZlbnQgPSBjbGFzcyBleHRlbmRzIEV2ZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJ3YS1hZnRlci1oaWRlXCIsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2UsIGNvbXBvc2VkOiB0cnVlIH0pO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBXYUFmdGVySGlkZUV2ZW50XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2V2ZW50cy9hZnRlci1zaG93LnRzXG52YXIgV2FBZnRlclNob3dFdmVudCA9IGNsYXNzIGV4dGVuZHMgRXZlbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIndhLWFmdGVyLXNob3dcIiwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZSwgY29tcG9zZWQ6IHRydWUgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIFdhQWZ0ZXJTaG93RXZlbnRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvaW50ZXJuYWwvYW5pbWF0ZS50c1xuYXN5bmMgZnVuY3Rpb24gYW5pbWF0ZShlbCwga2V5ZnJhbWVzLCBvcHRpb25zKSB7XG4gIHJldHVybiBlbC5hbmltYXRlKGtleWZyYW1lcywgb3B0aW9ucykuZmluaXNoZWQuY2F0Y2goKCkgPT4ge1xuICB9KTtcbn1cbmZ1bmN0aW9uIGFuaW1hdGVXaXRoQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGNvbnN0IHsgc2lnbmFsIH0gPSBjb250cm9sbGVyO1xuICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgbGV0IHJlc29sdmVkID0gZmFsc2U7XG4gICAgbGV0IG9uRW5kID0gKCkgPT4ge1xuICAgICAgaWYgKHJlc29sdmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICB9O1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgb25FbmQsIHsgb25jZTogdHJ1ZSwgc2lnbmFsIH0pO1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25jYW5jZWxcIiwgb25FbmQsIHsgb25jZTogdHJ1ZSwgc2lnbmFsIH0pO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAoIXJlc29sdmVkICYmIGVsLmdldEFuaW1hdGlvbnMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgb25FbmQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBwYXJzZUR1cmF0aW9uKGR1cmF0aW9uKSB7XG4gIGR1cmF0aW9uID0gZHVyYXRpb24udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoZHVyYXRpb24uaW5kZXhPZihcIm1zXCIpID4gLTEpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChkdXJhdGlvbikgfHwgMDtcbiAgfVxuICBpZiAoZHVyYXRpb24uaW5kZXhPZihcInNcIikgPiAtMSkge1xuICAgIHJldHVybiAocGFyc2VGbG9hdChkdXJhdGlvbikgfHwgMCkgKiAxZTM7XG4gIH1cbiAgcmV0dXJuIHBhcnNlRmxvYXQoZHVyYXRpb24pIHx8IDA7XG59XG5mdW5jdGlvbiBwcmVmZXJzUmVkdWNlZE1vdGlvbigpIHtcbiAgY29uc3QgcXVlcnkgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpO1xuICByZXR1cm4gcXVlcnkubWF0Y2hlcztcbn1cblxuZXhwb3J0IHtcbiAgYW5pbWF0ZSxcbiAgYW5pbWF0ZVdpdGhDbGFzcyxcbiAgcGFyc2VEdXJhdGlvbixcbiAgcHJlZmVyc1JlZHVjZWRNb3Rpb25cbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuaW1wb3J0IHtcbiAgbG9ja0JvZHlTY3JvbGxpbmcsXG4gIHVubG9ja0JvZHlTY3JvbGxpbmdcbn0gZnJvbSBcIi4vY2h1bmsuVlFaNDZNWUkuanNcIjtcbmltcG9ydCB7XG4gIHBhcnNlU3BhY2VEZWxpbWl0ZWRUb2tlbnNcbn0gZnJvbSBcIi4vY2h1bmsuUk1aN0JWRE0uanNcIjtcbmltcG9ydCB7XG4gIGRpYWxvZ19zdHlsZXNfZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay5ORVQ1VjZOTC5qc1wiO1xuaW1wb3J0IHtcbiAgaXNUb3BEaXNtaXNzaWJsZSxcbiAgcmVnaXN0ZXJEaXNtaXNzaWJsZSxcbiAgdW5yZWdpc3RlckRpc21pc3NpYmxlXG59IGZyb20gXCIuL2NodW5rLjUyV0EyREpPLmpzXCI7XG5pbXBvcnQge1xuICBXYVNob3dFdmVudFxufSBmcm9tIFwiLi9jaHVuay40WkFLUDdOWS5qc1wiO1xuaW1wb3J0IHtcbiAgV2FIaWRlRXZlbnRcbn0gZnJvbSBcIi4vY2h1bmsuTVFPREo3NVYuanNcIjtcbmltcG9ydCB7XG4gIFdhQWZ0ZXJIaWRlRXZlbnRcbn0gZnJvbSBcIi4vY2h1bmsuM05LSUhJQ1cuanNcIjtcbmltcG9ydCB7XG4gIFdhQWZ0ZXJTaG93RXZlbnRcbn0gZnJvbSBcIi4vY2h1bmsuUFgzSE1LRjcuanNcIjtcbmltcG9ydCB7XG4gIGFuaW1hdGVXaXRoQ2xhc3Ncbn0gZnJvbSBcIi4vY2h1bmsuTDZDSUtPRlEuanNcIjtcbmltcG9ydCB7XG4gIEhhc1Nsb3RDb250cm9sbGVyXG59IGZyb20gXCIuL2NodW5rLktJSEIzVk1CLmpzXCI7XG5pbXBvcnQge1xuICB3YXRjaFxufSBmcm9tIFwiLi9jaHVuay5QWkFONkZQTi5qc1wiO1xuaW1wb3J0IHtcbiAgTG9jYWxpemVDb250cm9sbGVyXG59IGZyb20gXCIuL2NodW5rLk9LWEJOUkU2LmpzXCI7XG5pbXBvcnQge1xuICBXZWJBd2Vzb21lRWxlbWVudFxufSBmcm9tIFwiLi9jaHVuay5FUEhIV1hLMi5qc1wiO1xuaW1wb3J0IHtcbiAgX19kZWNvcmF0ZUNsYXNzXG59IGZyb20gXCIuL2NodW5rLjdWR0NJSERHLmpzXCI7XG5cbi8vIHNyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cudHNcbmltcG9ydCB7IGh0bWwsIGlzU2VydmVyIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgcHJvcGVydHksIHF1ZXJ5IH0gZnJvbSBcImxpdC9kZWNvcmF0b3JzLmpzXCI7XG5pbXBvcnQgeyBjbGFzc01hcCB9IGZyb20gXCJsaXQvZGlyZWN0aXZlcy9jbGFzcy1tYXAuanNcIjtcbnZhciBXYURpYWxvZyA9IGNsYXNzIGV4dGVuZHMgV2ViQXdlc29tZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMubG9jYWxpemUgPSBuZXcgTG9jYWxpemVDb250cm9sbGVyKHRoaXMpO1xuICAgIHRoaXMuaGFzU2xvdENvbnRyb2xsZXIgPSBuZXcgSGFzU2xvdENvbnRyb2xsZXIodGhpcywgXCJmb290ZXJcIiwgXCJoZWFkZXItYWN0aW9uc1wiLCBcImxhYmVsXCIpO1xuICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgIHRoaXMubGFiZWwgPSBcIlwiO1xuICAgIHRoaXMud2l0aG91dEhlYWRlciA9IGZhbHNlO1xuICAgIHRoaXMubGlnaHREaXNtaXNzID0gZmFsc2U7XG4gICAgdGhpcy5oYW5kbGVEb2N1bWVudEtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIgJiYgdGhpcy5vcGVuICYmIGlzVG9wRGlzbWlzc2libGUodGhpcykpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMucmVxdWVzdENsb3NlKHRoaXMuZGlhbG9nKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZpcnN0VXBkYXRlZCgpIHtcbiAgICBpZiAodGhpcy5vcGVuKSB7XG4gICAgICB0aGlzLmFkZE9wZW5MaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMuZGlhbG9nLnNob3dNb2RhbCgpO1xuICAgICAgbG9ja0JvZHlTY3JvbGxpbmcodGhpcyk7XG4gICAgfVxuICB9XG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgdW5sb2NrQm9keVNjcm9sbGluZyh0aGlzKTtcbiAgICB0aGlzLnJlbW92ZU9wZW5MaXN0ZW5lcnMoKTtcbiAgfVxuICBhc3luYyByZXF1ZXN0Q2xvc2Uoc291cmNlKSB7XG4gICAgY29uc3Qgd2FIaWRlRXZlbnQgPSBuZXcgV2FIaWRlRXZlbnQoeyBzb3VyY2UgfSk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KHdhSGlkZUV2ZW50KTtcbiAgICBpZiAod2FIaWRlRXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgdGhpcy5vcGVuID0gdHJ1ZTtcbiAgICAgIGFuaW1hdGVXaXRoQ2xhc3ModGhpcy5kaWFsb2csIFwicHVsc2VcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlT3Blbkxpc3RlbmVycygpO1xuICAgIGF3YWl0IGFuaW1hdGVXaXRoQ2xhc3ModGhpcy5kaWFsb2csIFwiaGlkZVwiKTtcbiAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmRpYWxvZy5jbG9zZSgpO1xuICAgIHVubG9ja0JvZHlTY3JvbGxpbmcodGhpcyk7XG4gICAgY29uc3QgdHJpZ2dlciA9IHRoaXMub3JpZ2luYWxUcmlnZ2VyO1xuICAgIGlmICh0eXBlb2YgdHJpZ2dlcj8uZm9jdXMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0cmlnZ2VyLmZvY3VzKCkpO1xuICAgIH1cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFdhQWZ0ZXJIaWRlRXZlbnQoKSk7XG4gIH1cbiAgYWRkT3Blbkxpc3RlbmVycygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmhhbmRsZURvY3VtZW50S2V5RG93bik7XG4gICAgcmVnaXN0ZXJEaXNtaXNzaWJsZSh0aGlzKTtcbiAgfVxuICByZW1vdmVPcGVuTGlzdGVuZXJzKCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuaGFuZGxlRG9jdW1lbnRLZXlEb3duKTtcbiAgICB1bnJlZ2lzdGVyRGlzbWlzc2libGUodGhpcyk7XG4gIH1cbiAgaGFuZGxlRGlhbG9nQ2FuY2VsKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXRoaXMuZGlhbG9nLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGVcIikgJiYgZXZlbnQudGFyZ2V0ID09PSB0aGlzLmRpYWxvZyAmJiBpc1RvcERpc21pc3NpYmxlKHRoaXMpKSB7XG4gICAgICB0aGlzLnJlcXVlc3RDbG9zZSh0aGlzLmRpYWxvZyk7XG4gICAgfVxuICB9XG4gIGhhbmRsZURpYWxvZ0NsaWNrKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IGJ1dHRvbiA9IHRhcmdldC5jbG9zZXN0KCdbZGF0YS1kaWFsb2c9XCJjbG9zZVwiXScpO1xuICAgIGlmIChidXR0b24pIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgdGhpcy5yZXF1ZXN0Q2xvc2UoYnV0dG9uKTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgaGFuZGxlRGlhbG9nUG9pbnRlckRvd24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzLmRpYWxvZykge1xuICAgICAgaWYgKHRoaXMubGlnaHREaXNtaXNzKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdENsb3NlKHRoaXMuZGlhbG9nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IGFuaW1hdGVXaXRoQ2xhc3ModGhpcy5kaWFsb2csIFwicHVsc2VcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGhhbmRsZU9wZW5DaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMub3BlbiAmJiAhdGhpcy5kaWFsb2cub3Blbikge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5vcGVuICYmIHRoaXMuZGlhbG9nLm9wZW4pIHtcbiAgICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgICB0aGlzLnJlcXVlc3RDbG9zZSh0aGlzLmRpYWxvZyk7XG4gICAgfVxuICB9XG4gIC8qKiBTaG93cyB0aGUgZGlhbG9nLiAqL1xuICBhc3luYyBzaG93KCkge1xuICAgIGNvbnN0IHdhU2hvd0V2ZW50ID0gbmV3IFdhU2hvd0V2ZW50KCk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KHdhU2hvd0V2ZW50KTtcbiAgICBpZiAod2FTaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYWRkT3Blbkxpc3RlbmVycygpO1xuICAgIHRoaXMub3JpZ2luYWxUcmlnZ2VyID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICAgIHRoaXMuZGlhbG9nLnNob3dNb2RhbCgpO1xuICAgIGxvY2tCb2R5U2Nyb2xsaW5nKHRoaXMpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50VG9Gb2N1cyA9IHRoaXMucXVlcnlTZWxlY3RvcihcIlthdXRvZm9jdXNdXCIpO1xuICAgICAgaWYgKGVsZW1lbnRUb0ZvY3VzICYmIHR5cGVvZiBlbGVtZW50VG9Gb2N1cy5mb2N1cyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRpYWxvZy5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGF3YWl0IGFuaW1hdGVXaXRoQ2xhc3ModGhpcy5kaWFsb2csIFwic2hvd1wiKTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFdhQWZ0ZXJTaG93RXZlbnQoKSk7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGhhc0hlYWRlciA9ICF0aGlzLndpdGhvdXRIZWFkZXI7XG4gICAgY29uc3QgaGFzRm9vdGVyID0gdGhpcy5oYXNTbG90Q29udHJvbGxlci50ZXN0KFwiZm9vdGVyXCIpO1xuICAgIHJldHVybiBodG1sYFxuICAgICAgPGRpYWxvZ1xuICAgICAgICBwYXJ0PVwiZGlhbG9nXCJcbiAgICAgICAgY2xhc3M9JHtjbGFzc01hcCh7XG4gICAgICBkaWFsb2c6IHRydWUsXG4gICAgICBvcGVuOiB0aGlzLm9wZW5cbiAgICB9KX1cbiAgICAgICAgQGNhbmNlbD0ke3RoaXMuaGFuZGxlRGlhbG9nQ2FuY2VsfVxuICAgICAgICBAY2xpY2s9JHt0aGlzLmhhbmRsZURpYWxvZ0NsaWNrfVxuICAgICAgICBAcG9pbnRlcmRvd249JHt0aGlzLmhhbmRsZURpYWxvZ1BvaW50ZXJEb3dufVxuICAgICAgPlxuICAgICAgICAke2hhc0hlYWRlciA/IGh0bWxgXG4gICAgICAgICAgICAgIDxoZWFkZXIgcGFydD1cImhlYWRlclwiIGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGgyIHBhcnQ9XCJ0aXRsZVwiIGNsYXNzPVwidGl0bGVcIiBpZD1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICA8IS0tIElmIHRoZXJlJ3Mgbm8gbGFiZWwsIHVzZSBhbiBpbnZpc2libGUgY2hhcmFjdGVyIHRvIHByZXZlbnQgdGhlIGhlYWRlciBmcm9tIGNvbGxhcHNpbmcgLS0+XG4gICAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwibGFiZWxcIj4gJHt0aGlzLmxhYmVsLmxlbmd0aCA+IDAgPyB0aGlzLmxhYmVsIDogU3RyaW5nLmZyb21DaGFyQ29kZSg4MjAzKX0gPC9zbG90PlxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPGRpdiBwYXJ0PVwiaGVhZGVyLWFjdGlvbnNcIiBjbGFzcz1cImhlYWRlci1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiaGVhZGVyLWFjdGlvbnNcIj48L3Nsb3Q+XG4gICAgICAgICAgICAgICAgICA8d2EtYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHBhcnQ9XCJjbG9zZS1idXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBleHBvcnRwYXJ0cz1cImJhc2U6Y2xvc2UtYnV0dG9uX19iYXNlXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgIGFwcGVhcmFuY2U9XCJwbGFpblwiXG4gICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIiR7KGV2ZW50KSA9PiB0aGlzLnJlcXVlc3RDbG9zZShldmVudC50YXJnZXQpfVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDx3YS1pY29uXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInhtYXJrXCJcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbD0ke3RoaXMubG9jYWxpemUudGVybShcImNsb3NlXCIpfVxuICAgICAgICAgICAgICAgICAgICAgIGxpYnJhcnk9XCJzeXN0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJzb2xpZFwiXG4gICAgICAgICAgICAgICAgICAgID48L3dhLWljb24+XG4gICAgICAgICAgICAgICAgICA8L3dhLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICBgIDogXCJcIn1cblxuICAgICAgICA8ZGl2IHBhcnQ9XCJib2R5XCIgY2xhc3M9XCJib2R5XCI+PHNsb3Q+PC9zbG90PjwvZGl2PlxuXG4gICAgICAgICR7aGFzRm9vdGVyID8gaHRtbGBcbiAgICAgICAgICAgICAgPGZvb3RlciBwYXJ0PVwiZm9vdGVyXCIgY2xhc3M9XCJmb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiZm9vdGVyXCI+PC9zbG90PlxuICAgICAgICAgICAgICA8L2Zvb3Rlcj5cbiAgICAgICAgICAgIGAgOiBcIlwifVxuICAgICAgPC9kaWFsb2c+XG4gICAgYDtcbiAgfVxufTtcbldhRGlhbG9nLmNzcyA9IGRpYWxvZ19zdHlsZXNfZGVmYXVsdDtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHF1ZXJ5KFwiLmRpYWxvZ1wiKVxuXSwgV2FEaWFsb2cucHJvdG90eXBlLCBcImRpYWxvZ1wiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FEaWFsb2cucHJvdG90eXBlLCBcIm9wZW5cIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhRGlhbG9nLnByb3RvdHlwZSwgXCJsYWJlbFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcIndpdGhvdXQtaGVhZGVyXCIsIHR5cGU6IEJvb2xlYW4sIHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhRGlhbG9nLnByb3RvdHlwZSwgXCJ3aXRob3V0SGVhZGVyXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwibGlnaHQtZGlzbWlzc1wiLCB0eXBlOiBCb29sZWFuIH0pXG5dLCBXYURpYWxvZy5wcm90b3R5cGUsIFwibGlnaHREaXNtaXNzXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgd2F0Y2goXCJvcGVuXCIsIHsgd2FpdFVudGlsRmlyc3RVcGRhdGU6IHRydWUgfSlcbl0sIFdhRGlhbG9nLnByb3RvdHlwZSwgXCJoYW5kbGVPcGVuQ2hhbmdlXCIsIDEpO1xuV2FEaWFsb2cgPSBfX2RlY29yYXRlQ2xhc3MoW1xuICBjdXN0b21FbGVtZW50KFwid2EtZGlhbG9nXCIpXG5dLCBXYURpYWxvZyk7XG5pZiAoIWlzU2VydmVyKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBkaWFsb2dBdHRyRWwgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIltkYXRhLWRpYWxvZ11cIik7XG4gICAgaWYgKGRpYWxvZ0F0dHJFbCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IFtjb21tYW5kLCBpZF0gPSBwYXJzZVNwYWNlRGVsaW1pdGVkVG9rZW5zKGRpYWxvZ0F0dHJFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRpYWxvZ1wiKSB8fCBcIlwiKTtcbiAgICAgIGlmIChjb21tYW5kID09PSBcIm9wZW5cIiAmJiBpZD8ubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGRvYyA9IGRpYWxvZ0F0dHJFbC5nZXRSb290Tm9kZSgpO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICBpZiAoZGlhbG9nPy5sb2NhbE5hbWUgPT09IFwid2EtZGlhbG9nXCIpIHtcbiAgICAgICAgICBkaWFsb2cub3BlbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBBIGRpYWxvZyB3aXRoIGFuIElEIG9mIFwiJHtpZH1cIiBjb3VsZCBub3QgYmUgZm91bmQgaW4gdGhpcyBkb2N1bWVudC5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCAoKSA9PiB7XG4gIH0pO1xufVxuXG5leHBvcnQge1xuICBXYURpYWxvZ1xufTtcbiIsICJpbXBvcnQgeyBMaXRFbGVtZW50LCBodG1sIH0gZnJvbSAnbGl0JztcbmltcG9ydCB7IGN1c3RvbUVsZW1lbnQsIHN0YXRlIH0gZnJvbSAnbGl0L2RlY29yYXRvcnMuanMnO1xuaW1wb3J0IHR5cGUgeyBUaHJlYWQsIEFuY2hvciB9IGZyb20gJy4uLy4uL3R5cGVzLnRzJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuLi9saWIvYXBpLnRzJztcbmltcG9ydCB7IGVuc3VyZUF1dGhvciwgaW5pdElkZW50aXR5IH0gZnJvbSAnLi4vbGliL2lkZW50aXR5LnRzJztcbmltcG9ydCB7IGNvbXB1dGVBbmNob3IsIGdldFNlbGVjdGlvblBvc2l0aW9uLCBpc1dpdGhpbkNvbnRlbnQgfSBmcm9tICcuLi9saWIvc2VsZWN0aW9uLnRzJztcbmltcG9ydCB7IGluaXRUaGVtZUJyaWRnZSB9IGZyb20gJy4uL2xpYi90aGVtZS50cyc7XG5cbmltcG9ydCAnLi90aHJlYWRzLXBvcG92ZXIudHMnO1xuaW1wb3J0ICcuL3RocmVhZHMtaW5saW5lLWVkaXRvci50cyc7XG5cbmltcG9ydCAnQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZy5qcyc7XG5pbXBvcnQgJ0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jb21wb25lbnRzL2J1dHRvbi9idXR0b24uanMnO1xuaW1wb3J0ICdAYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY29tcG9uZW50cy9pY29uL2ljb24uanMnO1xuXG5AY3VzdG9tRWxlbWVudCgndGhyZWFkcy1hcHAnKVxuZXhwb3J0IGNsYXNzIFRocmVhZHNBcHAgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgb3ZlcnJpZGUgY3JlYXRlUmVuZGVyUm9vdCgpIHsgcmV0dXJuIHRoaXM7IH1cblxuICBAc3RhdGUoKSBwcml2YXRlIHRocmVhZHM6IFRocmVhZFtdID0gW107XG4gIEBzdGF0ZSgpIHByaXZhdGUgcG9wb3ZlckFjdGl2ZSA9IGZhbHNlO1xuICBAc3RhdGUoKSBwcml2YXRlIHBvcG92ZXJYID0gMDtcbiAgQHN0YXRlKCkgcHJpdmF0ZSBwb3BvdmVyWSA9IDA7XG5cbiAgcHJpdmF0ZSBwZW5kaW5nQW5jaG9yOiBBbmNob3IgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBwZW5kaW5nQmxvY2tFbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBkZWxldGVUYXJnZXQ6IHsgdHlwZTogJ3RocmVhZCcgfCAnY29tbWVudCc7IGlkOiBzdHJpbmc7IHRocmVhZElkPzogc3RyaW5nIH0gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBpbmxpbmVFZGl0b3JFbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICBvdmVycmlkZSBkaXNjb25uZWN0ZWRDYWxsYmFjaygpOiB2b2lkIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlT3V0c2lkZVBvcG92ZXJDbGljayk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZG9jbWQ6cGFnZS1tb3VudGVkJywgdGhpcy5oYW5kbGVQYWdlTW91bnRlZCBhcyBFdmVudExpc3RlbmVyKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGNvbm5lY3RlZENhbGxiYWNrKCk6IHZvaWQge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgaW5pdFRoZW1lQnJpZGdlKCk7XG4gICAgaW5pdElkZW50aXR5KCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVPdXRzaWRlUG9wb3ZlckNsaWNrKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkb2NtZDpwYWdlLW1vdW50ZWQnLCB0aGlzLmhhbmRsZVBhZ2VNb3VudGVkIGFzIEV2ZW50TGlzdGVuZXIpO1xuXG4gICAgdGhpcy5sb2FkVGhyZWFkcygpO1xuICAgIHRoaXMuaW5qZWN0TmV3VGhyZWFkQnV0dG9uKCk7XG5cbiAgICAvLyBSZWdpc3RlciBhZnRlclJlbG9hZCBoYW5kbGVyIGZvciBwb3N0LW11dGF0aW9uIGNvbnRpbnVpdHlcbiAgICBpZiAodHlwZW9mIGRvY21kICE9PSAndW5kZWZpbmVkJyAmJiBkb2NtZC5hZnRlclJlbG9hZCkge1xuICAgICAgZG9jbWQuYWZ0ZXJSZWxvYWQoJ3RocmVhZHMnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZFRocmVhZHMoKTtcbiAgICAgICAgdGhpcy5pbmplY3ROZXdUaHJlYWRCdXR0b24oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBjb250ZW50IGFyZWEgb2YgdGhlIHBhZ2UuXG4gICAqL1xuICBwcml2YXRlIGdldENvbnRlbnRBcmVhKCk6IEVsZW1lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZG9jbWQtY29udGVudF0nKVxuICAgICAgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRvY21kLWNvbnRlbnQnKVxuICAgICAgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXJ0aWNsZScpXG4gICAgICB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgaW5zZXJ0aW9uIHBvaW50IGZvciBhIG5ldyB0b3AtbGV2ZWwgdGhyZWFkLlxuICAgKiBJZiB0aGUgZmlyc3Qgb3Igc2Vjb25kIGNoaWxkIG9mIHRoZSBjb250ZW50IGFyZWEgaXMgYSBoZWFkaW5nLCBpbnNlcnQgYWZ0ZXIgaXQuXG4gICAqIE90aGVyd2lzZSBpbnNlcnQgYXQgdGhlIHZlcnkgdG9wLlxuICAgKi9cbiAgcHJpdmF0ZSBmaW5kTmV3VGhyZWFkSW5zZXJ0aW9uUG9pbnQoKTogeyBtb2RlOiAnYWZ0ZXInOyBlbDogRWxlbWVudCB9IHwgeyBtb2RlOiAncHJlcGVuZCc7IGVsOiBFbGVtZW50IH0gfCBudWxsIHtcbiAgICBjb25zdCBjb250ZW50QXJlYSA9IHRoaXMuZ2V0Q29udGVudEFyZWEoKTtcbiAgICBpZiAoIWNvbnRlbnRBcmVhKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIEdldCB0aGUgZGlyZWN0IGNoaWxkcmVuIHRoYXQgYXJlIGVsZW1lbnRzIChza2lwIHRleHQgbm9kZXMsIHdoaXRlc3BhY2UpXG4gICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKGNvbnRlbnRBcmVhLmNoaWxkcmVuKTtcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSByZXR1cm4geyBtb2RlOiAncHJlcGVuZCcsIGVsOiBjb250ZW50QXJlYSB9O1xuXG4gICAgY29uc3QgSEVBRElOR19UQUdTID0gbmV3IFNldChbJ0gxJywgJ0gyJywgJ0gzJywgJ0g0JywgJ0g1JywgJ0g2J10pO1xuXG4gICAgLy8gQ2hlY2sgZmlyc3QgdHdvIGVsZW1lbnRzIGZvciBhIGhlYWRpbmdcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGgubWluKDIsIGNoaWxkcmVuLmxlbmd0aCk7IGkrKykge1xuICAgICAgaWYgKEhFQURJTkdfVEFHUy5oYXMoY2hpbGRyZW5baV0udGFnTmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgbW9kZTogJ2FmdGVyJywgZWw6IGNoaWxkcmVuW2ldIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgbW9kZTogJ3ByZXBlbmQnLCBlbDogY29udGVudEFyZWEgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmplY3QgYSBcIk5ldyBUaHJlYWRcIiBidXR0b24gYXQgdGhlIHRvcCBvZiB0aGUgY29udGVudCBhcmVhLlxuICAgKi9cbiAgcHJpdmF0ZSBpbmplY3ROZXdUaHJlYWRCdXR0b24oKTogdm9pZCB7XG4gICAgLy8gUmVtb3ZlIGV4aXN0aW5nIGJ1dHRvbiBpZiBwcmVzZW50IChlLmcuIGFmdGVyIHJlbG9hZClcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhyZWFkcy1uZXctdGhyZWFkLWJ0bicpPy5yZW1vdmUoKTtcblxuICAgIGNvbnN0IGluc2VydGlvblBvaW50ID0gdGhpcy5maW5kTmV3VGhyZWFkSW5zZXJ0aW9uUG9pbnQoKTtcbiAgICBpZiAoIWluc2VydGlvblBvaW50KSByZXR1cm47XG5cbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidG4uY2xhc3NOYW1lID0gJ3RocmVhZHMtbmV3LXRocmVhZC1idG4nO1xuICAgIGJ0bi5pbm5lckhUTUwgPSBgPHdhLWljb24gbmFtZT1cInBsdXNcIiBzdHlsZT1cImZvbnQtc2l6ZToxNHB4O1wiPjwvd2EtaWNvbj4gTmV3IFRocmVhZGA7XG4gICAgYnRuLnRpdGxlID0gJ1N0YXJ0IGEgbmV3IGRpc2N1c3Npb24gdGhyZWFkJztcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMuc3RhcnROZXdUaHJlYWQoKTtcbiAgICB9KTtcblxuICAgIGlmIChpbnNlcnRpb25Qb2ludC5tb2RlID09PSAnYWZ0ZXInKSB7XG4gICAgICBpbnNlcnRpb25Qb2ludC5lbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgYnRuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zZXJ0aW9uUG9pbnQuZWwuaW5zZXJ0QmVmb3JlKGJ0biwgaW5zZXJ0aW9uUG9pbnQuZWwuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGEgbmV3IHRvcC1sZXZlbCB0aHJlYWQgYnkgb3BlbmluZyBhbiBpbmxpbmUgZWRpdG9yIGF0IHRoZSBpbnNlcnRpb24gcG9pbnQuXG4gICAqL1xuICBwcml2YXRlIHN0YXJ0TmV3VGhyZWFkKCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlSW5saW5lRWRpdG9yKCk7XG5cbiAgICBjb25zdCBpbnNlcnRpb25Qb2ludCA9IHRoaXMuZmluZE5ld1RocmVhZEluc2VydGlvblBvaW50KCk7XG4gICAgaWYgKCFpbnNlcnRpb25Qb2ludCkgcmV0dXJuO1xuXG4gICAgY29uc3QgZWRpdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhyZWFkcy1pbmxpbmUtZWRpdG9yJykgYXMgYW55O1xuICAgIGVkaXRvci5xdW90ZSA9ICcnO1xuXG4gICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2lubGluZS1zdWJtaXQnLCBhc3luYyAoZTogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGF1dGhvciA9IGVuc3VyZUF1dGhvcigpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXBpLmNyZWF0ZVRocmVhZCh7XG4gICAgICAgICAgYW5jaG9yOiBudWxsLFxuICAgICAgICAgIGF1dGhvcixcbiAgICAgICAgICBib2R5OiBlLmRldGFpbC5ib2R5LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW1vdmVJbmxpbmVFZGl0b3IoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2NtZCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jbWQuc2NoZWR1bGVSZWxvYWQpIHtcbiAgICAgICAgICBkb2NtZC5zY2hlZHVsZVJlbG9hZCgndGhyZWFkcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMubG9hZFRocmVhZHMoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1t0aHJlYWRzXSBGYWlsZWQgdG8gY3JlYXRlIHRocmVhZDonLCBlcnIpO1xuICAgICAgICBlZGl0b3Iuc3VibWl0dGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2lubGluZS1jYW5jZWwnLCAoKSA9PiB0aGlzLnJlbW92ZUlubGluZUVkaXRvcigpKTtcblxuICAgIGlmIChpbnNlcnRpb25Qb2ludC5tb2RlID09PSAnYWZ0ZXInKSB7XG4gICAgICBpbnNlcnRpb25Qb2ludC5lbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgZWRpdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zZXJ0aW9uUG9pbnQuZWwuaW5zZXJ0QmVmb3JlKGVkaXRvciwgaW5zZXJ0aW9uUG9pbnQuZWwuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHRoaXMuaW5saW5lRWRpdG9yRWwgPSBlZGl0b3I7XG4gIH1cblxuICAvLyBcdTI1MDBcdTI1MDBcdTI1MDAgU2VsZWN0aW9uIHBvcG92ZXIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG5cbiAgcHJpdmF0ZSBoYW5kbGVNb3VzZVVwID0gKGU6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5xdWVyeVNlbGVjdG9yKCd0aHJlYWRzLXBvcG92ZXInKTtcbiAgICBpZiAocG9wb3Zlcj8uY29udGFpbnMoZS50YXJnZXQgYXMgTm9kZSkpIHJldHVybjtcblxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICBpZiAoIXNlbGVjdGlvbiB8fCBzZWxlY3Rpb24uaXNDb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMucG9wb3ZlckFjdGl2ZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghc2VsZWN0aW9uLmFuY2hvck5vZGUgfHwgIWlzV2l0aGluQ29udGVudChzZWxlY3Rpb24uYW5jaG9yTm9kZSkpIHJldHVybjtcblxuICAgIGNvbnN0IGFuY2hvciA9IGNvbXB1dGVBbmNob3Ioc2VsZWN0aW9uKTtcbiAgICBpZiAoIWFuY2hvcikgcmV0dXJuO1xuXG4gICAgY29uc3QgcG9zID0gZ2V0U2VsZWN0aW9uUG9zaXRpb24oc2VsZWN0aW9uKTtcbiAgICBpZiAoIXBvcykgcmV0dXJuO1xuXG4gICAgLy8gRmluZCB0aGUgZW5jbG9zaW5nIGJsb2NrIGVsZW1lbnQgZm9yIGlubGluZSBlZGl0b3IgaW5zZXJ0aW9uXG4gICAgY29uc3QgQkxPQ0tfVEFHUyA9IG5ldyBTZXQoW1wiUFwiLCBcIkRJVlwiLCBcIkxJXCIsIFwiQkxPQ0tRVU9URVwiLCBcIlBSRVwiLCBcIkgxXCIsIFwiSDJcIiwgXCJIM1wiLCBcIkg0XCIsIFwiSDVcIiwgXCJINlwiXSk7XG4gICAgbGV0IGJsb2NrRWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IG5vZGU6IE5vZGUgfCBudWxsID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCkuc3RhcnRDb250YWluZXI7XG4gICAgd2hpbGUgKG5vZGUgJiYgbm9kZSAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBCTE9DS19UQUdTLmhhcyhub2RlLnRhZ05hbWUpKSB7XG4gICAgICAgIGJsb2NrRWwgPSBub2RlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgdGhpcy5wZW5kaW5nQW5jaG9yID0gYW5jaG9yO1xuICAgIHRoaXMucGVuZGluZ0Jsb2NrRWwgPSBibG9ja0VsO1xuICAgIHRoaXMucG9wb3ZlclggPSBwb3MueDtcbiAgICB0aGlzLnBvcG92ZXJZID0gcG9zLnk7XG4gICAgdGhpcy5wb3BvdmVyQWN0aXZlID0gdHJ1ZTtcbiAgfTtcblxuICBwcml2YXRlIGhhbmRsZU91dHNpZGVQb3BvdmVyQ2xpY2sgPSAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHBvcG92ZXIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ3RocmVhZHMtcG9wb3ZlcicpO1xuICAgIGlmIChwb3BvdmVyICYmICFlLmNvbXBvc2VkUGF0aCgpLmluY2x1ZGVzKHBvcG92ZXIpKSB7XG4gICAgICB0aGlzLnBvcG92ZXJBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBwb3BvdmVyIFwiYWRkIGNvbW1lbnRcIiBcdTIwMTQgb3BlbiBpbmxpbmUgZWRpdG9yIGFmdGVyIHRoZSBibG9jay5cbiAgICovXG4gIHByaXZhdGUgaGFuZGxlQWRkQ29tbWVudCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGVuZGluZ0FuY2hvciB8fCAhdGhpcy5wZW5kaW5nQmxvY2tFbCkgcmV0dXJuO1xuXG4gICAgdGhpcy5yZW1vdmVJbmxpbmVFZGl0b3IoKTtcbiAgICB0aGlzLnBvcG92ZXJBY3RpdmUgPSBmYWxzZTtcblxuICAgIGNvbnN0IGFuY2hvciA9IHRoaXMucGVuZGluZ0FuY2hvcjtcbiAgICBjb25zdCBibG9ja0VsID0gdGhpcy5wZW5kaW5nQmxvY2tFbDtcbiAgICB0aGlzLnBlbmRpbmdBbmNob3IgPSBudWxsO1xuICAgIHRoaXMucGVuZGluZ0Jsb2NrRWwgPSBudWxsO1xuICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKT8ucmVtb3ZlQWxsUmFuZ2VzKCk7XG5cbiAgICBjb25zdCBlZGl0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aHJlYWRzLWlubGluZS1lZGl0b3InKSBhcyBhbnk7XG4gICAgZWRpdG9yLnF1b3RlID0gYW5jaG9yLnF1b3RlIHx8ICcnO1xuXG4gICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2lubGluZS1zdWJtaXQnLCBhc3luYyAoZTogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGF1dGhvciA9IGVuc3VyZUF1dGhvcigpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXBpLmNyZWF0ZVRocmVhZCh7XG4gICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgIGF1dGhvcixcbiAgICAgICAgICBib2R5OiBlLmRldGFpbC5ib2R5LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW1vdmVJbmxpbmVFZGl0b3IoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2NtZCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jbWQuc2NoZWR1bGVSZWxvYWQpIHtcbiAgICAgICAgICBkb2NtZC5zY2hlZHVsZVJlbG9hZCgndGhyZWFkcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMubG9hZFRocmVhZHMoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1t0aHJlYWRzXSBGYWlsZWQgdG8gY3JlYXRlIHRocmVhZDonLCBlcnIpO1xuICAgICAgICBlZGl0b3Iuc3VibWl0dGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2lubGluZS1jYW5jZWwnLCAoKSA9PiB0aGlzLnJlbW92ZUlubGluZUVkaXRvcigpKTtcblxuICAgIGJsb2NrRWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIGVkaXRvcik7XG4gICAgdGhpcy5pbmxpbmVFZGl0b3JFbCA9IGVkaXRvcjtcbiAgfVxuXG4gIC8vIFx1MjUwMFx1MjUwMFx1MjUwMCBQYWdlIGxpZmVjeWNsZSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuICBwcml2YXRlIGhhbmRsZVBhZ2VNb3VudGVkID0gKF9lOiBDdXN0b21FdmVudCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucG9wb3ZlckFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMubG9hZFRocmVhZHMoKTtcbiAgICB0aGlzLmluamVjdE5ld1RocmVhZEJ1dHRvbigpO1xuICB9O1xuXG4gIHByaXZhdGUgYXN5bmMgbG9hZFRocmVhZHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMudGhyZWFkcyA9IGF3YWl0IGFwaS5mZXRjaFRocmVhZHMoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1t0aHJlYWRzXSBGYWlsZWQgdG8gbG9hZCB0aHJlYWRzOicsIGVycik7XG4gICAgICB0aGlzLnRocmVhZHMgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5zY2FuUmVuZGVyZWRIaWdobGlnaHRzKCk7XG4gIH1cblxuICAvKipcbiAgICogU2NhbiB0aGUgRE9NIGZvciA8bWFyayBjbGFzcz1cInRocmVhZHMtaGlnaGxpZ2h0XCIgZGF0YS10aHJlYWQtaWQ9XCIuLi5cIj4gZWxlbWVudHNcbiAgICogYW5kIGF0dGFjaCBjbGljayBoYW5kbGVycyB0byBzY3JvbGwgdGhlIGNvcnJlc3BvbmRpbmcgaW5saW5lIHRocmVhZCBpbnRvIHZpZXcuXG4gICAqL1xuICBwcml2YXRlIHNjYW5SZW5kZXJlZEhpZ2hsaWdodHMoKTogdm9pZCB7XG4gICAgY29uc3QgbWFya3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignbWFyay50aHJlYWRzLWhpZ2hsaWdodFtkYXRhLXRocmVhZC1pZF0nKTtcbiAgICBmb3IgKGNvbnN0IG1hcmsgb2YgbWFya3MpIHtcbiAgICAgIGNvbnN0IHRocmVhZElkID0gbWFyay5kYXRhc2V0LnRocmVhZElkO1xuICAgICAgaWYgKCF0aHJlYWRJZCkgY29udGludWU7XG5cbiAgICAgIG1hcmsuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgbWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSBpbmxpbmUgdGhyZWFkIGVsZW1lbnQgcmVuZGVyZWQgYnkgdGhlIGNvbnRhaW5lcnNcbiAgICAgICAgY29uc3QgdGhyZWFkRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudGhyZWFkcy10aHJlYWRbZGF0YS10aHJlYWQtaWQ9XCIke3RocmVhZElkfVwiXWApO1xuICAgICAgICBpZiAodGhyZWFkRWwpIHtcbiAgICAgICAgICB0aHJlYWRFbC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInIH0pO1xuICAgICAgICAgIHRocmVhZEVsLmNsYXNzTGlzdC5hZGQoJ3RocmVhZHMtdGhyZWFkLS1mbGFzaCcpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhyZWFkRWwuY2xhc3NMaXN0LnJlbW92ZSgndGhyZWFkcy10aHJlYWQtLWZsYXNoJyksIDIwMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBcdTI1MDBcdTI1MDBcdTI1MDAgSW5saW5lIGVkaXRvciBoZWxwZXJzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4gIHByaXZhdGUgcmVtb3ZlSW5saW5lRWRpdG9yKCk6IHZvaWQge1xuICAgIHRoaXMuaW5saW5lRWRpdG9yRWw/LnJlbW92ZSgpO1xuICAgIHRoaXMuaW5saW5lRWRpdG9yRWwgPSBudWxsO1xuICB9XG5cbiAgLy8gXHUyNTAwXHUyNTAwXHUyNTAwIERlbGV0ZSBjb25maXJtYXRpb24gXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG5cbiAgcHJpdmF0ZSBoYW5kbGVEZWxldGVSZXF1ZXN0KGU6IEN1c3RvbUV2ZW50LCB0eXBlOiAndGhyZWFkJyB8ICdjb21tZW50Jyk6IHZvaWQge1xuICAgIGNvbnN0IGlkID0gdHlwZSA9PT0gJ3RocmVhZCcgPyBlLmRldGFpbC50aHJlYWRJZCA6IGUuZGV0YWlsLmNvbW1lbnRJZDtcbiAgICBjb25zdCB0aHJlYWRJZCA9IHR5cGUgPT09ICdjb21tZW50JyA/IGUuZGV0YWlsLnRocmVhZElkIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuZGVsZXRlVGFyZ2V0ID0geyB0eXBlLCBpZCwgdGhyZWFkSWQgfTtcbiAgICBjb25zdCBkaWFsb2cgPSB0aGlzLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQgJiB7IG9wZW46IGJvb2xlYW4gfT4oJyNkZWxldGUtZGlhbG9nJyk7XG4gICAgaWYgKGRpYWxvZykgZGlhbG9nLm9wZW4gPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjb25maXJtRGVsZXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudCAmIHsgb3BlbjogYm9vbGVhbiB9PignI2RlbGV0ZS1kaWFsb2cnKTtcbiAgICBpZiAoZGlhbG9nKSBkaWFsb2cub3BlbiA9IGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLmRlbGV0ZVRhcmdldCkgcmV0dXJuO1xuICAgIGlmICh0aGlzLmRlbGV0ZVRhcmdldC50eXBlID09PSAndGhyZWFkJykge1xuICAgICAgYXdhaXQgYXBpLmRlbGV0ZVRocmVhZCh0aGlzLmRlbGV0ZVRhcmdldC5pZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IGFwaS5kZWxldGVDb21tZW50KHRoaXMuZGVsZXRlVGFyZ2V0LnRocmVhZElkISwgdGhpcy5kZWxldGVUYXJnZXQuaWQpO1xuICAgIH1cbiAgICB0aGlzLmRlbGV0ZVRhcmdldCA9IG51bGw7XG4gICAgaWYgKHR5cGVvZiBkb2NtZCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jbWQuc2NoZWR1bGVSZWxvYWQpIHtcbiAgICAgIGRvY21kLnNjaGVkdWxlUmVsb2FkKCd0aHJlYWRzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMubG9hZFRocmVhZHMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNhbmNlbERlbGV0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBkaWFsb2cgPSB0aGlzLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQgJiB7IG9wZW46IGJvb2xlYW4gfT4oJyNkZWxldGUtZGlhbG9nJyk7XG4gICAgaWYgKGRpYWxvZykgZGlhbG9nLm9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmRlbGV0ZVRhcmdldCA9IG51bGw7XG4gIH1cblxuICBvdmVycmlkZSByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8dGhyZWFkcy1wb3BvdmVyXG4gICAgICAgID9hY3RpdmU9JHt0aGlzLnBvcG92ZXJBY3RpdmV9XG4gICAgICAgIC54PSR7dGhpcy5wb3BvdmVyWH1cbiAgICAgICAgLnk9JHt0aGlzLnBvcG92ZXJZfVxuICAgICAgICBAYWRkLWNvbW1lbnQ9JHt0aGlzLmhhbmRsZUFkZENvbW1lbnR9XG4gICAgICA+PC90aHJlYWRzLXBvcG92ZXI+XG5cbiAgICAgIDx3YS1kaWFsb2cgaWQ9XCJkZWxldGUtZGlhbG9nXCIgbGFiZWw9XCJDb25maXJtIERlbGV0ZVwiIGxpZ2h0LWRpc21pc3M+XG4gICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyAke3RoaXMuZGVsZXRlVGFyZ2V0Py50eXBlID8/ICdpdGVtJ30/XG4gICAgICAgIDx3YS1idXR0b24gc2xvdD1cImZvb3RlclwiIGFwcGVhcmFuY2U9XCJvdXRsaW5lZFwiIEBjbGljaz0ke3RoaXMuY2FuY2VsRGVsZXRlfT5DYW5jZWw8L3dhLWJ1dHRvbj5cbiAgICAgICAgPHdhLWJ1dHRvbiBzbG90PVwiZm9vdGVyXCIgdmFyaWFudD1cImRhbmdlclwiIEBjbGljaz0ke3RoaXMuY29uZmlybURlbGV0ZX0+RGVsZXRlPC93YS1idXR0b24+XG4gICAgICA8L3dhLWRpYWxvZz5cbiAgICBgO1xuICB9XG59XG4iLCAiaW1wb3J0ICdAYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3Qvc3R5bGVzL3RoZW1lcy9kZWZhdWx0LmNzcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy90aHJlYWRzLWFwcC50cyc7XG5cbmZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0aHJlYWRzLWFwcCcpKSByZXR1cm47XG4gIGNvbnN0IGFwcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RocmVhZHMtYXBwJyk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwKTtcbn1cblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50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QTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0ExQixJQUFJLFVBQVU7QUF1QmQs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QixvQkFBb0IsSUFBSTtBQUNwRCxPQUFPO0FBQ0wsT0FBSztBQUNQOyIsCiAgIm5hbWVzIjogWyJnbG9iYWwiLCAiZ2xvYmFsVGhpcyIsICJzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHMiLCAiU2hhZG93Um9vdCIsICJTaGFkeUNTUyIsICJuYXRpdmVTaGFkb3ciLCAiRG9jdW1lbnQiLCAicHJvdG90eXBlIiwgIkNTU1N0eWxlU2hlZXQiLCAiY29uc3RydWN0aW9uVG9rZW4iLCAiU3ltYm9sIiwgImNzc1RhZ0NhY2hlIiwgIldlYWtNYXAiLCAiQ1NTUmVzdWx0IiwgImNzc1RleHQiLCAic3RyaW5ncyIsICJzYWZlVG9rZW4iLCAidGhpcyIsICJFcnJvciIsICJfc3RyaW5ncyIsICJzdHlsZVNoZWV0IiwgIl9zdHlsZVNoZWV0IiwgImNhY2hlYWJsZSIsICJsZW5ndGgiLCAiZ2V0IiwgInJlcGxhY2VTeW5jIiwgInNldCIsICJ0b1N0cmluZyIsICJ1bnNhZmVDU1MiLCAidmFsdWUiLCAiU3RyaW5nIiwgImNzcyIsICJ2YWx1ZXMiLCAicmVkdWNlIiwgImFjYyIsICJ2IiwgImlkeCIsICJhZG9wdFN0eWxlcyIsICJyZW5kZXJSb290IiwgInN0eWxlcyIsICJhZG9wdGVkU3R5bGVTaGVldHMiLCAibWFwIiwgInMiLCAic3R5bGUiLCAiZG9jdW1lbnQiLCAiY3JlYXRlRWxlbWVudCIsICJub25jZSIsICJzZXRBdHRyaWJ1dGUiLCAidGV4dENvbnRlbnQiLCAiYXBwZW5kQ2hpbGQiLCAiZ2V0Q29tcGF0aWJsZVN0eWxlIiwgInNoZWV0IiwgInJ1bGUiLCAiY3NzUnVsZXMiLCAiaXMiLCAiZGVmaW5lUHJvcGVydHkiLCAiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwgImdldE93blByb3BlcnR5TmFtZXMiLCAiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwgImdldFByb3RvdHlwZU9mIiwgIk9iamVjdCIsICJnbG9iYWwiLCAiZ2xvYmFsVGhpcyIsICJ0cnVzdGVkVHlwZXMiLCAiZW1wdHlTdHJpbmdGb3JCb29sZWFuQXR0cmlidXRlIiwgImVtcHR5U2NyaXB0IiwgInBvbHlmaWxsU3VwcG9ydCIsICJyZWFjdGl2ZUVsZW1lbnRQb2x5ZmlsbFN1cHBvcnQiLCAiSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSIsICJwcm9wIiwgIl9vYmoiLCAiZGVmYXVsdENvbnZlcnRlciIsICJ2YWx1ZSIsICJ0eXBlIiwgIkJvb2xlYW4iLCAiQXJyYXkiLCAiSlNPTiIsICJzdHJpbmdpZnkiLCAiZnJvbVZhbHVlIiwgIk51bWJlciIsICJwYXJzZSIsICJlIiwgIm5vdEVxdWFsIiwgIm9sZCIsICJkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvbiIsICJhdHRyaWJ1dGUiLCAiU3RyaW5nIiwgImNvbnZlcnRlciIsICJyZWZsZWN0IiwgInVzZURlZmF1bHQiLCAiaGFzQ2hhbmdlZCIsICJTeW1ib2wiLCAibWV0YWRhdGEiLCAibGl0UHJvcGVydHlNZXRhZGF0YSIsICJXZWFrTWFwIiwgIlJlYWN0aXZlRWxlbWVudCIsICJIVE1MRWxlbWVudCIsICJpbml0aWFsaXplciIsICJ0aGlzIiwgIl9fcHJlcGFyZSIsICJfaW5pdGlhbGl6ZXJzIiwgInB1c2giLCAib2JzZXJ2ZWRBdHRyaWJ1dGVzIiwgImZpbmFsaXplIiwgIl9fYXR0cmlidXRlVG9Qcm9wZXJ0eU1hcCIsICJrZXlzIiwgIm5hbWUiLCAib3B0aW9ucyIsICJzdGF0ZSIsICJwcm90b3R5cGUiLCAiaGFzT3duUHJvcGVydHkiLCAiY3JlYXRlIiwgIndyYXBwZWQiLCAiZWxlbWVudFByb3BlcnRpZXMiLCAic2V0IiwgIm5vQWNjZXNzb3IiLCAia2V5IiwgImRlc2NyaXB0b3IiLCAiZ2V0UHJvcGVydHlEZXNjcmlwdG9yIiwgImdldCIsICJ2IiwgIm9sZFZhbHVlIiwgImNhbGwiLCAicmVxdWVzdFVwZGF0ZSIsICJjb25maWd1cmFibGUiLCAiZW51bWVyYWJsZSIsICJzdXBlckN0b3IiLCAiTWFwIiwgImZpbmFsaXplZCIsICJwcm9wcyIsICJwcm9wZXJ0aWVzIiwgInByb3BLZXlzIiwgInAiLCAiY3JlYXRlUHJvcGVydHkiLCAiYXR0ciIsICJfX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eSIsICJlbGVtZW50U3R5bGVzIiwgImZpbmFsaXplU3R5bGVzIiwgInN0eWxlcyIsICJpc0FycmF5IiwgIlNldCIsICJmbGF0IiwgIkluZmluaXR5IiwgInJldmVyc2UiLCAicyIsICJ1bnNoaWZ0IiwgImdldENvbXBhdGlibGVTdHlsZSIsICJ0b0xvd2VyQ2FzZSIsICJjb25zdHJ1Y3RvciIsICJzdXBlciIsICJfX2luc3RhbmNlUHJvcGVydGllcyIsICJpc1VwZGF0ZVBlbmRpbmciLCAiaGFzVXBkYXRlZCIsICJfX3JlZmxlY3RpbmdQcm9wZXJ0eSIsICJfX2luaXRpYWxpemUiLCAiX191cGRhdGVQcm9taXNlIiwgIlByb21pc2UiLCAicmVzIiwgImVuYWJsZVVwZGF0aW5nIiwgIl8kY2hhbmdlZFByb3BlcnRpZXMiLCAiX19zYXZlSW5zdGFuY2VQcm9wZXJ0aWVzIiwgImZvckVhY2giLCAiaSIsICJjb250cm9sbGVyIiwgIl9fY29udHJvbGxlcnMiLCAiYWRkIiwgInJlbmRlclJvb3QiLCAiaXNDb25uZWN0ZWQiLCAiaG9zdENvbm5lY3RlZCIsICJkZWxldGUiLCAiaW5zdGFuY2VQcm9wZXJ0aWVzIiwgInNpemUiLCAiY3JlYXRlUmVuZGVyUm9vdCIsICJzaGFkb3dSb290IiwgImF0dGFjaFNoYWRvdyIsICJzaGFkb3dSb290T3B0aW9ucyIsICJhZG9wdFN0eWxlcyIsICJjb25uZWN0ZWRDYWxsYmFjayIsICJjIiwgIl9yZXF1ZXN0ZWRVcGRhdGUiLCAiZGlzY29ubmVjdGVkQ2FsbGJhY2siLCAiaG9zdERpc2Nvbm5lY3RlZCIsICJfb2xkIiwgIl8kYXR0cmlidXRlVG9Qcm9wZXJ0eSIsICJhdHRyVmFsdWUiLCAidG9BdHRyaWJ1dGUiLCAicmVtb3ZlQXR0cmlidXRlIiwgInNldEF0dHJpYnV0ZSIsICJjdG9yIiwgInByb3BOYW1lIiwgImdldFByb3BlcnR5T3B0aW9ucyIsICJmcm9tQXR0cmlidXRlIiwgImNvbnZlcnRlZFZhbHVlIiwgIl9fZGVmYXVsdFZhbHVlcyIsICJ1c2VOZXdWYWx1ZSIsICJuZXdWYWx1ZSIsICJoYXNBdHRyaWJ1dGUiLCAiXyRjaGFuZ2VQcm9wZXJ0eSIsICJfX2VucXVldWVVcGRhdGUiLCAiaW5pdGlhbGl6ZVZhbHVlIiwgImhhcyIsICJfX3JlZmxlY3RpbmdQcm9wZXJ0aWVzIiwgInJlamVjdCIsICJyZXN1bHQiLCAic2NoZWR1bGVVcGRhdGUiLCAicGVyZm9ybVVwZGF0ZSIsICJzaG91bGRVcGRhdGUiLCAiY2hhbmdlZFByb3BlcnRpZXMiLCAid2lsbFVwZGF0ZSIsICJob3N0VXBkYXRlIiwgInVwZGF0ZSIsICJfX21hcmtVcGRhdGVkIiwgIl8kZGlkVXBkYXRlIiwgIl9jaGFuZ2VkUHJvcGVydGllcyIsICJob3N0VXBkYXRlZCIsICJmaXJzdFVwZGF0ZWQiLCAidXBkYXRlZCIsICJ1cGRhdGVDb21wbGV0ZSIsICJnZXRVcGRhdGVDb21wbGV0ZSIsICJfX3Byb3BlcnR5VG9BdHRyaWJ1dGUiLCAibW9kZSIsICJyZWFjdGl2ZUVsZW1lbnRWZXJzaW9ucyIsICJnbG9iYWwiLCAiZ2xvYmFsVGhpcyIsICJ3cmFwIiwgIm5vZGUiLCAidHJ1c3RlZFR5cGVzIiwgInBvbGljeSIsICJjcmVhdGVQb2xpY3kiLCAiY3JlYXRlSFRNTCIsICJzIiwgImJvdW5kQXR0cmlidXRlU3VmZml4IiwgIm1hcmtlciIsICJNYXRoIiwgInJhbmRvbSIsICJ0b0ZpeGVkIiwgInNsaWNlIiwgIm1hcmtlck1hdGNoIiwgIm5vZGVNYXJrZXIiLCAiZCIsICJkb2N1bWVudCIsICJjcmVhdGVNYXJrZXIiLCAiY3JlYXRlQ29tbWVudCIsICJpc1ByaW1pdGl2ZSIsICJ2YWx1ZSIsICJpc0FycmF5IiwgIkFycmF5IiwgImlzSXRlcmFibGUiLCAiU3ltYm9sIiwgIml0ZXJhdG9yIiwgIlNQQUNFX0NIQVIiLCAidGV4dEVuZFJlZ2V4IiwgImNvbW1lbnRFbmRSZWdleCIsICJjb21tZW50MkVuZFJlZ2V4IiwgInRhZ0VuZFJlZ2V4IiwgIlJlZ0V4cCIsICJzaW5nbGVRdW90ZUF0dHJFbmRSZWdleCIsICJkb3VibGVRdW90ZUF0dHJFbmRSZWdleCIsICJyYXdUZXh0RWxlbWVudCIsICJ0YWciLCAidHlwZSIsICJzdHJpbmdzIiwgInZhbHVlcyIsICJfJGxpdFR5cGUkIiwgImh0bWwiLCAic3ZnIiwgIm1hdGhtbCIsICJub0NoYW5nZSIsICJmb3IiLCAibm90aGluZyIsICJ0ZW1wbGF0ZUNhY2hlIiwgIldlYWtNYXAiLCAid2Fsa2VyIiwgImNyZWF0ZVRyZWVXYWxrZXIiLCAidHJ1c3RGcm9tVGVtcGxhdGVTdHJpbmciLCAidHNhIiwgInN0cmluZ0Zyb21UU0EiLCAiaGFzT3duUHJvcGVydHkiLCAiRXJyb3IiLCAiZ2V0VGVtcGxhdGVIdG1sIiwgImwiLCAibGVuZ3RoIiwgImF0dHJOYW1lcyIsICJyYXdUZXh0RW5kUmVnZXgiLCAicmVnZXgiLCAiaSIsICJhdHRyTmFtZSIsICJtYXRjaCIsICJhdHRyTmFtZUVuZEluZGV4IiwgImxhc3RJbmRleCIsICJleGVjIiwgInRlc3QiLCAiZW5kIiwgInN0YXJ0c1dpdGgiLCAicHVzaCIsICJUZW1wbGF0ZSIsICJjb25zdHJ1Y3RvciIsICJvcHRpb25zIiwgInRoaXMiLCAicGFydHMiLCAibm9kZUluZGV4IiwgImF0dHJOYW1lSW5kZXgiLCAicGFydENvdW50IiwgImVsIiwgImNyZWF0ZUVsZW1lbnQiLCAiY3VycmVudE5vZGUiLCAiY29udGVudCIsICJ3cmFwcGVyIiwgImZpcnN0Q2hpbGQiLCAicmVwbGFjZVdpdGgiLCAiY2hpbGROb2RlcyIsICJuZXh0Tm9kZSIsICJub2RlVHlwZSIsICJoYXNBdHRyaWJ1dGVzIiwgIm5hbWUiLCAiZ2V0QXR0cmlidXRlTmFtZXMiLCAiZW5kc1dpdGgiLCAicmVhbE5hbWUiLCAic3RhdGljcyIsICJnZXRBdHRyaWJ1dGUiLCAic3BsaXQiLCAibSIsICJpbmRleCIsICJjdG9yIiwgIlByb3BlcnR5UGFydCIsICJCb29sZWFuQXR0cmlidXRlUGFydCIsICJFdmVudFBhcnQiLCAiQXR0cmlidXRlUGFydCIsICJyZW1vdmVBdHRyaWJ1dGUiLCAidGFnTmFtZSIsICJ0ZXh0Q29udGVudCIsICJlbXB0eVNjcmlwdCIsICJhcHBlbmQiLCAiZGF0YSIsICJpbmRleE9mIiwgIl9vcHRpb25zIiwgImlubmVySFRNTCIsICJyZXNvbHZlRGlyZWN0aXZlIiwgInBhcnQiLCAicGFyZW50IiwgImF0dHJpYnV0ZUluZGV4IiwgImN1cnJlbnREaXJlY3RpdmUiLCAiX19kaXJlY3RpdmVzIiwgIl9fZGlyZWN0aXZlIiwgIm5leHREaXJlY3RpdmVDb25zdHJ1Y3RvciIsICJfJGluaXRpYWxpemUiLCAiXyRyZXNvbHZlIiwgIlRlbXBsYXRlSW5zdGFuY2UiLCAidGVtcGxhdGUiLCAiXyRwYXJ0cyIsICJfJGRpc2Nvbm5lY3RhYmxlQ2hpbGRyZW4iLCAiXyR0ZW1wbGF0ZSIsICJfJHBhcmVudCIsICJwYXJlbnROb2RlIiwgIl8kaXNDb25uZWN0ZWQiLCAiZnJhZ21lbnQiLCAiY3JlYXRpb25TY29wZSIsICJpbXBvcnROb2RlIiwgInBhcnRJbmRleCIsICJ0ZW1wbGF0ZVBhcnQiLCAiQ2hpbGRQYXJ0IiwgIm5leHRTaWJsaW5nIiwgIkVsZW1lbnRQYXJ0IiwgIl8kc2V0VmFsdWUiLCAiX19pc0Nvbm5lY3RlZCIsICJzdGFydE5vZGUiLCAiZW5kTm9kZSIsICJfJGNvbW1pdHRlZFZhbHVlIiwgIl8kc3RhcnROb2RlIiwgIl8kZW5kTm9kZSIsICJpc0Nvbm5lY3RlZCIsICJkaXJlY3RpdmVQYXJlbnQiLCAiXyRjbGVhciIsICJfY29tbWl0VGV4dCIsICJfY29tbWl0VGVtcGxhdGVSZXN1bHQiLCAiX2NvbW1pdE5vZGUiLCAiX2NvbW1pdEl0ZXJhYmxlIiwgImluc2VydEJlZm9yZSIsICJfaW5zZXJ0IiwgImNyZWF0ZVRleHROb2RlIiwgInJlc3VsdCIsICJfJGdldFRlbXBsYXRlIiwgImgiLCAiX3VwZGF0ZSIsICJpbnN0YW5jZSIsICJfY2xvbmUiLCAiZ2V0IiwgInNldCIsICJpdGVtUGFydHMiLCAiaXRlbVBhcnQiLCAiaXRlbSIsICJzdGFydCIsICJmcm9tIiwgIl8kbm90aWZ5Q29ubmVjdGlvbkNoYW5nZWQiLCAibiIsICJyZW1vdmUiLCAiZWxlbWVudCIsICJmaWxsIiwgIlN0cmluZyIsICJ2YWx1ZUluZGV4IiwgIm5vQ29tbWl0IiwgImNoYW5nZSIsICJ2IiwgIl9jb21taXRWYWx1ZSIsICJzZXRBdHRyaWJ1dGUiLCAidG9nZ2xlQXR0cmlidXRlIiwgInN1cGVyIiwgIm5ld0xpc3RlbmVyIiwgIm9sZExpc3RlbmVyIiwgInNob3VsZFJlbW92ZUxpc3RlbmVyIiwgImNhcHR1cmUiLCAib25jZSIsICJwYXNzaXZlIiwgInNob3VsZEFkZExpc3RlbmVyIiwgInJlbW92ZUV2ZW50TGlzdGVuZXIiLCAiYWRkRXZlbnRMaXN0ZW5lciIsICJldmVudCIsICJjYWxsIiwgImhvc3QiLCAiaGFuZGxlRXZlbnQiLCAiXyRMSCIsICJfYm91bmRBdHRyaWJ1dGVTdWZmaXgiLCAiX21hcmtlciIsICJfbWFya2VyTWF0Y2giLCAiX0hUTUxfUkVTVUxUIiwgIl9nZXRUZW1wbGF0ZUh0bWwiLCAiX1RlbXBsYXRlSW5zdGFuY2UiLCAiX2lzSXRlcmFibGUiLCAiX3Jlc29sdmVEaXJlY3RpdmUiLCAiX0NoaWxkUGFydCIsICJfQXR0cmlidXRlUGFydCIsICJfQm9vbGVhbkF0dHJpYnV0ZVBhcnQiLCAiX0V2ZW50UGFydCIsICJfUHJvcGVydHlQYXJ0IiwgIl9FbGVtZW50UGFydCIsICJwb2x5ZmlsbFN1cHBvcnQiLCAibGl0SHRtbFBvbHlmaWxsU3VwcG9ydCIsICJsaXRIdG1sVmVyc2lvbnMiLCAicmVuZGVyIiwgImNvbnRhaW5lciIsICJwYXJ0T3duZXJOb2RlIiwgInJlbmRlckJlZm9yZSIsICJnbG9iYWwiLCAiZ2xvYmFsVGhpcyIsICJMaXRFbGVtZW50IiwgIlJlYWN0aXZlRWxlbWVudCIsICJjb25zdHJ1Y3RvciIsICJ0aGlzIiwgInJlbmRlck9wdGlvbnMiLCAiaG9zdCIsICJfX2NoaWxkUGFydCIsICJjcmVhdGVSZW5kZXJSb290IiwgInJlbmRlclJvb3QiLCAic3VwZXIiLCAicmVuZGVyQmVmb3JlIiwgImZpcnN0Q2hpbGQiLCAiY2hhbmdlZFByb3BlcnRpZXMiLCAidmFsdWUiLCAicmVuZGVyIiwgImhhc1VwZGF0ZWQiLCAiaXNDb25uZWN0ZWQiLCAidXBkYXRlIiwgImNvbm5lY3RlZENhbGxiYWNrIiwgInNldENvbm5lY3RlZCIsICJkaXNjb25uZWN0ZWRDYWxsYmFjayIsICJub0NoYW5nZSIsICJsaXRFbGVtZW50SHlkcmF0ZVN1cHBvcnQiLCAicG9seWZpbGxTdXBwb3J0IiwgImxpdEVsZW1lbnRQb2x5ZmlsbFN1cHBvcnQiLCAiZ2xvYmFsIiwgImxpdEVsZW1lbnRWZXJzaW9ucyIsICJwdXNoIiwgImlzU2VydmVyIiwgImN1c3RvbUVsZW1lbnQiLCAidGFnTmFtZSIsICJjbGFzc09yVGFyZ2V0IiwgImNvbnRleHQiLCAiYWRkSW5pdGlhbGl6ZXIiLCAiY3VzdG9tRWxlbWVudHMiLCAiZGVmaW5lIiwgImRlZmF1bHRQcm9wZXJ0eURlY2xhcmF0aW9uIiwgImF0dHJpYnV0ZSIsICJ0eXBlIiwgIlN0cmluZyIsICJjb252ZXJ0ZXIiLCAiZGVmYXVsdENvbnZlcnRlciIsICJyZWZsZWN0IiwgImhhc0NoYW5nZWQiLCAibm90RXF1YWwiLCAic3RhbmRhcmRQcm9wZXJ0eSIsICJvcHRpb25zIiwgInRhcmdldCIsICJjb250ZXh0IiwgImtpbmQiLCAibWV0YWRhdGEiLCAicHJvcGVydGllcyIsICJnbG9iYWxUaGlzIiwgImxpdFByb3BlcnR5TWV0YWRhdGEiLCAiZ2V0IiwgInNldCIsICJNYXAiLCAiT2JqZWN0IiwgImNyZWF0ZSIsICJ3cmFwcGVkIiwgIm5hbWUiLCAidiIsICJvbGRWYWx1ZSIsICJjYWxsIiwgInRoaXMiLCAicmVxdWVzdFVwZGF0ZSIsICJfJGNoYW5nZVByb3BlcnR5IiwgInZhbHVlIiwgIkVycm9yIiwgInByb3BlcnR5IiwgInByb3RvT3JUYXJnZXQiLCAibmFtZU9yQ29udGV4dCIsICJwcm90byIsICJoYXNPd25Qcm9wZXJ0eSIsICJjb25zdHJ1Y3RvciIsICJjcmVhdGVQcm9wZXJ0eSIsICJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCAidW5kZWZpbmVkIiwgInN0YXRlIiwgIm9wdGlvbnMiLCAicHJvcGVydHkiLCAiYXR0cmlidXRlIiwgImRlc2MiLCAib2JqIiwgIm5hbWUiLCAiZGVzY3JpcHRvciIsICJjb25maWd1cmFibGUiLCAiZW51bWVyYWJsZSIsICJSZWZsZWN0IiwgImRlY29yYXRlIiwgIk9iamVjdCIsICJkZWZpbmVQcm9wZXJ0eSIsICJxdWVyeSIsICJzZWxlY3RvciIsICJjYWNoZSIsICJwcm90b09yVGFyZ2V0IiwgIm5hbWVPckNvbnRleHQiLCAiZGVzY3JpcHRvciIsICJkb1F1ZXJ5IiwgImVsIiwgInJlbmRlclJvb3QiLCAicXVlcnlTZWxlY3RvciIsICJnZXQiLCAic2V0IiwgImtleSIsICJTeW1ib2wiLCAidGhpcyIsICJ2IiwgImRlc2MiLCAicmVzdWx0IiwgImNhbGwiLCAiaGFzVXBkYXRlZCIsICJfX2RlZlByb3AiLCAiX19nZXRPd25Qcm9wRGVzYyIsICJfX2RlY29yYXRlQ2xhc3MiLCAiaSIsICJpIiwgIm8iLCAiZSIsICJfX2RlY29yYXRlQ2xhc3MiLCAibiIsICJlIiwgIm8iLCAiX19kZWNvcmF0ZUNsYXNzIiwgIm4iLCAidXBkYXRlIiwgInRyYW5zbGF0aW9uIiwgInQiLCAiTG9jYWxpemVDb250cm9sbGVyIiwgIlBhcnRUeXBlIiwgIkFUVFJJQlVURSIsICJDSElMRCIsICJQUk9QRVJUWSIsICJCT09MRUFOX0FUVFJJQlVURSIsICJFVkVOVCIsICJFTEVNRU5UIiwgImRpcmVjdGl2ZSIsICJjIiwgInZhbHVlcyIsICJfJGxpdERpcmVjdGl2ZSQiLCAiRGlyZWN0aXZlIiwgIl9wYXJ0SW5mbyIsICJfJGlzQ29ubmVjdGVkIiwgInRoaXMiLCAiXyRwYXJlbnQiLCAicGFydCIsICJwYXJlbnQiLCAiYXR0cmlidXRlSW5kZXgiLCAiX19wYXJ0IiwgIl9fYXR0cmlidXRlSW5kZXgiLCAicHJvcHMiLCAidXBkYXRlIiwgIl9wYXJ0IiwgInJlbmRlciIsICJjbGFzc01hcCIsICJkaXJlY3RpdmUiLCAiRGlyZWN0aXZlIiwgInBhcnRJbmZvIiwgInN1cGVyIiwgInR5cGUiLCAiUGFydFR5cGUiLCAiQVRUUklCVVRFIiwgIm5hbWUiLCAic3RyaW5ncyIsICJsZW5ndGgiLCAiRXJyb3IiLCAiY2xhc3NJbmZvIiwgIk9iamVjdCIsICJrZXlzIiwgImZpbHRlciIsICJrZXkiLCAiam9pbiIsICJwYXJ0IiwgInRoaXMiLCAiX3ByZXZpb3VzQ2xhc3NlcyIsICJTZXQiLCAiX3N0YXRpY0NsYXNzZXMiLCAic3BsaXQiLCAicyIsICJoYXMiLCAiYWRkIiwgInJlbmRlciIsICJjbGFzc0xpc3QiLCAiZWxlbWVudCIsICJyZW1vdmUiLCAiZGVsZXRlIiwgInZhbHVlIiwgIm5vQ2hhbmdlIiwgImlmRGVmaW5lZCIsICJ2YWx1ZSIsICJub3RoaW5nIiwgImJyYW5kIiwgIlN5bWJvbCIsICJmb3IiLCAidW53cmFwU3RhdGljVmFsdWUiLCAidmFsdWUiLCAiciIsICJsaXRlcmFsIiwgInN0cmluZ3MiLCAidmFsdWVzIiwgIl8kbGl0U3RhdGljJCIsICJyZWR1Y2UiLCAiYWNjIiwgInYiLCAiaWR4IiwgInZhbHVlIiwgIkVycm9yIiwgInIiLCAiYnJhbmQiLCAic3RyaW5nc0NhY2hlIiwgIk1hcCIsICJ3aXRoU3RhdGljIiwgImNvcmVUYWciLCAibCIsICJsZW5ndGgiLCAic3RhdGljVmFsdWUiLCAiZHluYW1pY1ZhbHVlIiwgInN0YXRpY1N0cmluZ3MiLCAiZHluYW1pY1ZhbHVlcyIsICJzIiwgImkiLCAiaGFzU3RhdGljcyIsICJ1bndyYXBTdGF0aWNWYWx1ZSIsICJwdXNoIiwgImtleSIsICJqb2luIiwgImdldCIsICJyYXciLCAic2V0IiwgImh0bWwiLCAiY29yZUh0bWwiLCAic3ZnIiwgImNvcmVTdmciLCAibWF0aG1sIiwgImNvcmVNYXRobWwiLCAiTG9jYWxpemVDb250cm9sbGVyIiwgImkiLCAidSIsICJlIiwgIm8iLCAiX19kZWNvcmF0ZUNsYXNzIiwgInIiLCAibiIsICJ0IiwgIkxvY2FsaXplQ29udHJvbGxlciIsICJiIiwgIl9fZGVjb3JhdGVDbGFzcyIsICJ0IiwgImtpdENvZGUiLCAicCIsICJfQ2hpbGRQYXJ0IiwgIkNoaWxkUGFydCIsICJfJExIIiwgImlzVGVtcGxhdGVSZXN1bHQiLCAidmFsdWUiLCAidHlwZSIsICJpc1NpbmdsZUV4cHJlc3Npb24iLCAicGFydCIsICJzdHJpbmdzIiwgIlJFU0VUX1ZBTFVFIiwgInNldENvbW1pdHRlZFZhbHVlIiwgInBhcnQiLCAidmFsdWUiLCAiXyRjb21taXR0ZWRWYWx1ZSIsICJsaWJyYXJ5IiwgImIiLCAibCIsICJfX2RlY29yYXRlQ2xhc3MiLCAiciIsICJuIiwgInQiLCAiaSIsICJiIiwgIngiLCAieSIsICJuIiwgInQiLCAibGl2ZSIsICJkaXJlY3RpdmUiLCAiRGlyZWN0aXZlIiwgInBhcnRJbmZvIiwgInN1cGVyIiwgInR5cGUiLCAiUGFydFR5cGUiLCAiUFJPUEVSVFkiLCAiQVRUUklCVVRFIiwgIkJPT0xFQU5fQVRUUklCVVRFIiwgIkVycm9yIiwgImlzU2luZ2xlRXhwcmVzc2lvbiIsICJ2YWx1ZSIsICJwYXJ0IiwgIm5vQ2hhbmdlIiwgIm5vdGhpbmciLCAiZWxlbWVudCIsICJuYW1lIiwgImhhc0F0dHJpYnV0ZSIsICJnZXRBdHRyaWJ1dGUiLCAiU3RyaW5nIiwgInNldENvbW1pdHRlZFZhbHVlIiwgImIiLCAiZSIsICJvIiwgImwiLCAiX19kZWNvcmF0ZUNsYXNzIiwgIm4iLCAiciIsICJ0IiwgImkiLCAiZSIsICJiIiwgIm4iLCAiciIsICJ0IiwgImkiLCAiTG9jYWxpemVDb250cm9sbGVyIiwgImIiLCAiZSIsICJfX2RlY29yYXRlQ2xhc3MiLCAibiIsICJ0IiwgIm8iLCAiaSIsICJlIiwgImIiLCAiciIsICJ0Il0KfQo=
