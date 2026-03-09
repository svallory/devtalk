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
async function fetchAuthors() {
  try {
    return await docmd.call("threads:get-authors", {});
  } catch {
    return window.__threads_authors || {};
  }
}
async function upsertAuthor(authorKey, name, avatarUrl) {
  await docmd.call("threads:upsert-author", { authorKey, name, avatarUrl });
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
var STORAGE_KEY_NAME = "threads_author";
var STORAGE_KEY_EMAIL = "threads_email";
var STORAGE_KEY_GITHUB = "threads_github";
var STORAGE_KEY_AVATAR = "threads_avatar_url";
var STORAGE_KEY_AUTHOR_KEY = "threads_author_key";
function getAuthor() {
  return localStorage.getItem(STORAGE_KEY_NAME);
}
function setAuthor(name) {
  localStorage.setItem(STORAGE_KEY_NAME, name);
}
function getEmail() {
  return localStorage.getItem(STORAGE_KEY_EMAIL);
}
function setEmail(email) {
  localStorage.setItem(STORAGE_KEY_EMAIL, email);
}
function getGithub() {
  return localStorage.getItem(STORAGE_KEY_GITHUB);
}
function setGithub(username) {
  localStorage.setItem(STORAGE_KEY_GITHUB, username);
}
function getAvatarUrl() {
  return localStorage.getItem(STORAGE_KEY_AVATAR);
}
function setAvatarUrl(url) {
  localStorage.setItem(STORAGE_KEY_AVATAR, url);
}
function getAuthorKey() {
  return localStorage.getItem(STORAGE_KEY_AUTHOR_KEY);
}
function setAuthorKey(key) {
  localStorage.setItem(STORAGE_KEY_AUTHOR_KEY, key);
}
function computeAuthorKey(name, github) {
  if (github) return github.toLowerCase();
  if (name) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return slug || "anonymous";
  }
  return "anonymous";
}
async function computeAvatarUrl(email, github) {
  if (email) {
    const gravatarUrl = await getGravatarUrl(email);
    if (gravatarUrl) return gravatarUrl;
  }
  if (github) {
    return `https://github.com/${encodeURIComponent(github)}.png?size=80`;
  }
  const seed = email || github || Math.random().toString(36).slice(2);
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(seed)}&size=80`;
}
async function getGravatarUrl(email) {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(email.toLowerCase().trim());
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b3) => b3.toString(16).padStart(2, "0")).join("");
    const url = `https://gravatar.com/avatar/${hashHex}?s=80&d=404`;
    const resp = await fetch(url, { method: "HEAD", mode: "no-cors" });
    return `https://gravatar.com/avatar/${hashHex}?s=80&d=mp`;
  } catch {
    return null;
  }
}
function initIdentity() {
  const devInfo = window.__docmd_dev;
  if (!devInfo) return;
  if (!getAuthor() && devInfo.name) {
    setAuthor(devInfo.name);
  }
  if (!getEmail() && devInfo.email) {
    setEmail(devInfo.email);
  }
  if (!getAvatarUrl() && devInfo.gravatarUrl) {
    setAvatarUrl(devInfo.gravatarUrl);
  }
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
  if (!getAuthorKey()) {
    const github = getGithub() || "";
    setAuthorKey(computeAuthorKey(author, github));
  }
  return author;
}
function getIdentityPayload() {
  const author = ensureAuthor();
  const authorKey = getAuthorKey() || computeAuthorKey(author, getGithub() || "");
  const avatarUrl = getAvatarUrl() || "";
  return { author, authorKey, avatarUrl };
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

    .threads-hl-yellow  { background: hsl(48 96% 89% / 0.6);  border-bottom: 2px solid hsl(48 96% 53%); }
    .threads-hl-blue    { background: hsl(210 100% 88% / 0.55); border-bottom: 2px solid hsl(210 100% 55%); }
    .threads-hl-green   { background: hsl(142 60% 82% / 0.55); border-bottom: 2px solid hsl(142 60% 45%); }
    .threads-hl-pink    { background: hsl(340 80% 88% / 0.55); border-bottom: 2px solid hsl(340 80% 55%); }
    .threads-hl-purple  { background: hsl(270 70% 88% / 0.55); border-bottom: 2px solid hsl(270 70% 55%); }
    .threads-hl-orange  { background: hsl(28 100% 86% / 0.55); border-bottom: 2px solid hsl(28 100% 55%); }

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

    /* Avatar (injected dynamically) */
    .threads-comment__avatar {
      display: none;
    }

    .threads-comment__meta {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: var(--tc-muted-fg);
      margin-bottom: 4px;
    }
    .threads-comment__meta strong {
      color: var(--tc-fg);
      font-weight: 500;
    }

    .threads-comment__actions {
      display: flex;
      align-items: center;
      gap: 2px;
      margin-left: auto;
      flex-shrink: 0;
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

    /* ========= Collapsed thread ========= */
    .threads-thread__summary {
      display: none;
      font-size: 13px;
      color: var(--tc-muted-fg);
      font-style: italic;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }
    .threads-thread--collapsed .threads-thread__summary {
      display: block;
    }
    .threads-thread--collapsed .threads-comment,
    .threads-thread--collapsed .threads-replies {
      display: none;
    }
    .threads-thread--collapsed .threads-new-comment-btn {
      display: none;
    }
    .threads-thread--collapsed .threads-thread__footer {
      border-top: none;
    }

    /* ========= Thread footer & buttons ========= */
    .threads-thread__footer {
      display: flex;
      align-items: center;
      padding: 6px 14px 8px;
      border-top: 1px solid var(--tc-border);
    }
    .threads-new-comment-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border: 1px dashed var(--tc-border);
      background: transparent;
      color: var(--tc-muted-fg);
      font-family: var(--tc-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      border-radius: var(--tc-radius);
      transition: color 0.15s, background 0.15s, border-color 0.15s;
    }
    .threads-new-comment-btn:hover {
      color: var(--tc-fg);
      border-color: var(--tc-fg);
      background: var(--tc-muted);
    }

    /* ========= Nested replies ========= */
    .threads-replies {
      margin-left: 8px;
      border-left: 2px solid var(--tc-border);
    }
    .threads-comment--reply {
      padding-left: 12px !important;
      padding-right: 0 !important;
    }

    /* ========= Per-comment reply button ========= */
    .threads-comment-reply-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      background: transparent;
      border: none;
      color: var(--tc-muted-fg);
      font-family: var(--tc-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.15s, color 0.15s, background 0.15s;
      border-radius: var(--tc-radius);
    }
    .threads-comment:hover .threads-comment-reply-btn {
      opacity: 0.6;
    }
    .threads-comment-reply-btn:hover {
      opacity: 1 !important;
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

    /* ========= Heading wrapper for New Thread button ========= */
    .threads-heading-wrap {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }
    .threads-heading-wrap .threads-new-thread-btn {
      margin-left: auto;
      flex-shrink: 0;
    }

    /* ========= New Thread button ========= */
    .threads-new-thread-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px;
      font-family: var(--tc-font);
      font-size: 12px;
      font-weight: 500;
      color: var(--tc-muted-fg);
      background: transparent;
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

    /* ========= Delete button (on comment meta) ========= */
    .threads-delete-btn {
      display: inline-flex;
      align-items: center;
      padding: 3px 6px;
      background: transparent;
      border: none;
      color: var(--tc-muted-fg);
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.15s, color 0.15s, background 0.15s;
      border-radius: var(--tc-radius);
    }
    .threads-comment:hover .threads-delete-btn {
      opacity: 0.6;
    }
    .threads-delete-btn:hover {
      opacity: 1 !important;
      color: hsl(0 72% 51%);
      background: hsl(0 72% 51% / 0.08);
    }

    /* ========= Collapse/expand toggle button ========= */
    .threads-collapse-btn {
      display: inline-flex;
      align-items: center;
      margin-left: auto;
      padding: 3px 6px;
      background: transparent;
      border: none;
      color: var(--tc-muted-fg);
      cursor: pointer;
      border-radius: var(--tc-radius);
      transition: color 0.15s, background 0.15s;
    }
    .threads-collapse-btn:hover {
      color: var(--tc-fg);
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

    /* ========= Identity button & dropdown ========= */
    threads-identity {
      position: relative;
      display: flex;
      align-items: center;
      font-family: var(--tc-font);
    }
    .threads-identity-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid var(--tc-border);
      background: var(--tc-card);
      cursor: pointer;
      padding: 0;
      overflow: hidden;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .threads-identity-btn:hover {
      border-color: var(--tc-ring);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--tc-ring) 20%, transparent);
    }
    .threads-identity-avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
    .threads-identity-initial {
      font-size: 14px;
      font-weight: 600;
      color: var(--tc-fg);
      line-height: 1;
    }

    /* ========= Dropdown panel ========= */
    .threads-identity-panel {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 260px;
      background: var(--tc-card);
      border: 1px solid var(--tc-border);
      border-radius: var(--tc-radius);
      box-shadow: 0 4px 16px rgb(0 0 0 / 0.12), 0 1px 3px rgb(0 0 0 / 0.08);
      padding: 14px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      animation: tc-panel-drop 0.15s ease;
    }
    @keyframes tc-panel-drop {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .threads-identity-preview {
      display: flex;
      justify-content: center;
      margin-bottom: 4px;
    }
    .threads-identity-preview-img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--tc-border);
    }
    .threads-identity-preview-placeholder {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 2px solid var(--tc-border);
      background: var(--tc-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 600;
      color: var(--tc-muted-fg);
    }
    .threads-identity-label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
      font-weight: 500;
      color: var(--tc-fg);
    }
    .threads-identity-input {
      padding: 6px 10px;
      border: 1px solid var(--tc-border);
      border-radius: var(--tc-radius);
      background: var(--tc-bg);
      color: var(--tc-fg);
      font-family: var(--tc-font);
      font-size: 14px;
      outline: none;
      transition: border-color 0.15s;
    }
    .threads-identity-input:focus {
      border-color: var(--tc-ring);
    }
    .threads-identity-hint {
      font-size: 11px;
      color: var(--tc-muted-fg);
      margin: 0;
      line-height: 1.4;
    }
    .threads-identity-hint a {
      color: var(--tc-muted-fg);
      text-decoration: underline;
    }
    .threads-identity-actions {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
      margin-top: 2px;
    }
    .threads-identity-cancel,
    .threads-identity-save {
      padding: 4px 12px;
      border-radius: var(--tc-radius);
      font-family: var(--tc-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .threads-identity-cancel {
      background: transparent;
      border: 1px solid var(--tc-border);
      color: var(--tc-muted-fg);
    }
    .threads-identity-cancel:hover {
      border-color: var(--tc-fg);
      color: var(--tc-fg);
    }
    .threads-identity-save {
      background: var(--tc-fg);
      border: 1px solid var(--tc-fg);
      color: var(--tc-bg);
    }
    .threads-identity-save:hover {
      opacity: 0.85;
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

// src/client/components/threads-identity.ts
var ThreadsIdentity = class extends i4 {
  constructor() {
    super(...arguments);
    this.name = "";
    this.email = "";
    this.github = "";
    this.avatarUrl = "";
    this.panelOpen = false;
    this.outsideClickHandler = (e8) => {
      if (!this.contains(e8.target)) {
        this.panelOpen = false;
      }
    };
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback();
    this.name = getAuthor() || "";
    this.email = getEmail() || "";
    this.github = getGithub() || "";
    this.avatarUrl = getAvatarUrl() || "";
    if (!this.avatarUrl && (this.email || this.github)) {
      this.refreshAvatar();
    }
    document.addEventListener("mousedown", this.outsideClickHandler);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("mousedown", this.outsideClickHandler);
  }
  togglePanel() {
    this.panelOpen = !this.panelOpen;
  }
  async handleSave() {
    const nameInput = this.querySelector("#identity-name");
    const emailInput = this.querySelector("#identity-email");
    const githubInput = this.querySelector("#identity-github");
    if (nameInput) {
      const val = nameInput.value.trim();
      this.name = val;
      if (val) setAuthor(val);
    }
    if (emailInput) {
      const val = emailInput.value.trim();
      this.email = val;
      setEmail(val);
    }
    if (githubInput) {
      const val = githubInput.value.trim().replace(/^@/, "");
      this.github = val;
      setGithub(val);
    }
    await this.refreshAvatar();
    const authorKey = computeAuthorKey(this.name, this.github);
    setAuthorKey(authorKey);
    try {
      await upsertAuthor(authorKey, this.name, this.avatarUrl);
    } catch {
    }
    this.panelOpen = false;
  }
  async refreshAvatar() {
    const url = await computeAvatarUrl(this.email, this.github);
    this.avatarUrl = url;
    setAvatarUrl(url);
  }
  handleCancel() {
    this.panelOpen = false;
  }
  render() {
    const initial = this.name ? this.name.charAt(0).toUpperCase() : "?";
    return b2`
      <button
        class="threads-identity-btn"
        title="Discussion identity"
        @click=${this.togglePanel}
      >
        ${this.avatarUrl ? b2`<img class="threads-identity-avatar" src=${this.avatarUrl} alt=${this.name} />` : b2`<span class="threads-identity-initial">${initial}</span>`}
      </button>

      ${this.panelOpen ? b2`
        <div class="threads-identity-panel">
          <div class="threads-identity-preview">
            ${this.avatarUrl ? b2`<img class="threads-identity-preview-img" src=${this.avatarUrl} alt=${this.name} />` : b2`<div class="threads-identity-preview-placeholder">${initial}</div>`}
          </div>
          <label class="threads-identity-label">
            Display Name
            <input
              id="identity-name"
              class="threads-identity-input"
              type="text"
              .value=${this.name}
              placeholder="Your name"
            />
          </label>
          <label class="threads-identity-label">
            GitHub Username
            <input
              id="identity-github"
              class="threads-identity-input"
              type="text"
              .value=${this.github}
              placeholder="octocat"
            />
          </label>
          <label class="threads-identity-label">
            Gravatar Email
            <input
              id="identity-email"
              class="threads-identity-input"
              type="email"
              .value=${this.email}
              placeholder="you@example.com"
            />
          </label>
          <p class="threads-identity-hint">
            Avatar: <a href="https://gravatar.com" target="_blank" rel="noopener">Gravatar</a> &gt; GitHub &gt; random.
            Stored in your browser only.
          </p>
          <div class="threads-identity-actions">
            <button class="threads-identity-cancel" @click=${this.handleCancel}>Cancel</button>
            <button class="threads-identity-save" @click=${this.handleSave}>Save</button>
          </div>
        </div>
      ` : ""}
    `;
  }
};
__decorateClass([
  r5()
], ThreadsIdentity.prototype, "name", 2);
__decorateClass([
  r5()
], ThreadsIdentity.prototype, "email", 2);
__decorateClass([
  r5()
], ThreadsIdentity.prototype, "github", 2);
__decorateClass([
  r5()
], ThreadsIdentity.prototype, "avatarUrl", 2);
__decorateClass([
  r5()
], ThreadsIdentity.prototype, "panelOpen", 2);
ThreadsIdentity = __decorateClass([
  t3("threads-identity")
], ThreadsIdentity);

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
    this.authorsMap = {};
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
    this.injectIdentityButton();
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
    return document.querySelector("[data-docmd-content]") || document.querySelector(".docmd-content") || document.querySelector(".main-content") || document.querySelector("article") || document.querySelector("main");
  }
  /**
   * Create the identity button and place it in the page header.
   * Done imperatively so Lit re-renders don't pull it back into threads-app.
   */
  injectIdentityButton() {
    if (document.querySelector("threads-identity")) return;
    const target = document.querySelector(".docmd-options-menu") || document.querySelector(".header-right");
    if (!target) return;
    const identity = document.createElement("threads-identity");
    target.appendChild(identity);
  }
  /**
   * Inject a "New Thread" button into every heading in the content area.
   * Each button is right-aligned on the same line as the heading text.
   */
  injectNewThreadButton() {
    document.querySelectorAll(".threads-new-thread-btn").forEach((el) => el.remove());
    document.querySelectorAll(".threads-heading-wrap").forEach((el) => {
      el.classList.remove("threads-heading-wrap");
    });
    const contentArea = this.getContentArea();
    if (!contentArea) return;
    const HEADING_TAGS = /* @__PURE__ */ new Set(["H1", "H2", "H3", "H4", "H5", "H6"]);
    const headings = Array.from(contentArea.children).filter((el) => HEADING_TAGS.has(el.tagName));
    for (const heading of headings) {
      if (!HEADING_TAGS.has(heading.tagName)) continue;
      heading.classList.add("threads-heading-wrap");
      const btn = document.createElement("button");
      btn.className = "threads-new-thread-btn";
      btn.innerHTML = `<wa-icon name="plus" style="font-size:14px;"></wa-icon> New Thread`;
      btn.title = "Start a new discussion thread";
      btn.addEventListener("click", (e8) => {
        e8.preventDefault();
        e8.stopPropagation();
        this.startNewThread(heading);
      });
      heading.appendChild(btn);
    }
  }
  /**
   * Start a new top-level thread by opening an inline editor after the given heading.
   */
  startNewThread(heading) {
    this.removeInlineEditor();
    const editor = document.createElement("threads-inline-editor");
    editor.quote = "";
    editor.addEventListener("inline-submit", async (e8) => {
      const identity = getIdentityPayload();
      try {
        await createThread({
          anchor: null,
          ...identity,
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
    heading.insertAdjacentElement("afterend", editor);
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
      const identity = getIdentityPayload();
      try {
        await createThread({
          anchor,
          ...identity,
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
      const [threads, authors] = await Promise.all([
        fetchThreads(),
        fetchAuthors()
      ]);
      this.threads = threads;
      this.authorsMap = authors;
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
      const remainingThreads = sidebar.querySelectorAll(".threads-thread");
      if (remainingThreads.length === 0) {
        sidebar.style.display = "none";
      }
    }
  }
  /**
   * Enhance thread cards: nest replies under parents, add per-comment reply & delete buttons,
   * and a "+ New Comment" footer button for top-level comments.
   */
  injectReplyButtons() {
    const threads = document.querySelectorAll(".threads-thread[data-thread-id]");
    for (const threadEl of threads) {
      if (threadEl.querySelector(".threads-new-comment-btn")) continue;
      const threadId = threadEl.dataset.threadId;
      if (!threadId) continue;
      this.nestReplies(threadEl);
      const allComments = threadEl.querySelectorAll(".threads-comment");
      const totalComments = allComments.length;
      for (const commentEl of allComments) {
        const commentId = commentEl.dataset.commentId;
        if (!commentId) continue;
        const meta = commentEl.querySelector(".threads-comment__meta");
        if (!meta) continue;
        if (!meta.querySelector(".threads-comment__avatar")) {
          const authorVal = commentEl.dataset.author || "";
          const authorInfo = this.resolveAuthor(authorVal);
          if (authorInfo?.avatarUrl) {
            const avatar = document.createElement("img");
            avatar.className = "threads-comment__avatar";
            avatar.src = authorInfo.avatarUrl;
            avatar.alt = authorInfo.name || authorVal;
            meta.insertBefore(avatar, meta.firstChild);
          }
        }
        if (commentEl.querySelector(".threads-comment__actions")) continue;
        const actions = document.createElement("div");
        actions.className = "threads-comment__actions";
        const replyBtn = document.createElement("button");
        replyBtn.className = "threads-comment-reply-btn";
        replyBtn.innerHTML = `<wa-icon name="reply" style="font-size:13px;"></wa-icon> Reply`;
        replyBtn.title = "Reply to this comment";
        replyBtn.addEventListener("click", (e8) => {
          e8.stopPropagation();
          this.openReplyEditor(threadEl, threadId, commentId);
        });
        actions.appendChild(replyBtn);
        const delBtn = document.createElement("button");
        delBtn.className = "threads-delete-btn";
        delBtn.innerHTML = `<wa-icon name="trash" style="font-size:13px;"></wa-icon>`;
        delBtn.title = "Delete comment";
        delBtn.addEventListener("click", (e8) => {
          e8.stopPropagation();
          if (totalComments === 1) {
            this.deleteTarget = { type: "thread", id: threadId };
          } else {
            this.deleteTarget = { type: "comment", id: commentId, threadId };
          }
          const dialog = this.querySelector("#delete-dialog");
          if (dialog) dialog.open = true;
        });
        actions.appendChild(delBtn);
        meta.appendChild(actions);
      }
      const allCommentsForSummary = threadEl.querySelectorAll(".threads-comment");
      const summary = this.buildCollapseSummary(allCommentsForSummary);
      const footer = document.createElement("div");
      footer.className = "threads-thread__footer";
      const summaryEl = document.createElement("div");
      summaryEl.className = "threads-thread__summary";
      summaryEl.textContent = summary;
      footer.appendChild(summaryEl);
      const btn = document.createElement("button");
      btn.className = "threads-new-comment-btn";
      btn.innerHTML = `<wa-icon name="plus" style="font-size:13px;"></wa-icon> New Comment`;
      btn.addEventListener("click", (e8) => {
        e8.stopPropagation();
        this.openReplyEditor(threadEl, threadId, null);
      });
      footer.appendChild(btn);
      const toggleBtn = document.createElement("button");
      toggleBtn.className = "threads-collapse-btn";
      toggleBtn.innerHTML = `<wa-icon name="chevron-up" style="font-size:14px;"></wa-icon>`;
      toggleBtn.title = "Collapse thread";
      toggleBtn.addEventListener("click", (e8) => {
        e8.stopPropagation();
        const isCollapsed = threadEl.classList.toggle("threads-thread--collapsed");
        toggleBtn.innerHTML = isCollapsed ? `<wa-icon name="chevron-down" style="font-size:14px;"></wa-icon>` : `<wa-icon name="chevron-up" style="font-size:14px;"></wa-icon>`;
        toggleBtn.title = isCollapsed ? "Expand thread" : "Collapse thread";
      });
      footer.appendChild(toggleBtn);
      threadEl.appendChild(footer);
    }
  }
  /**
   * Build a summary string like "3 comments by Alice, Bob, and 1 more".
   * Uses only the first name of each author.
   */
  buildCollapseSummary(comments) {
    const count = comments.length;
    const authors = /* @__PURE__ */ new Set();
    for (const c5 of comments) {
      const author = c5.dataset.author;
      if (author) {
        const firstName = author.split(/\s+/)[0];
        authors.add(firstName);
      }
    }
    const uniqueNames = Array.from(authors);
    const MAX_SHOWN = 3;
    let byPart;
    if (uniqueNames.length === 0) {
      byPart = "";
    } else if (uniqueNames.length <= MAX_SHOWN) {
      if (uniqueNames.length === 1) {
        byPart = ` by ${uniqueNames[0]}`;
      } else if (uniqueNames.length === 2) {
        byPart = ` by ${uniqueNames[0]} and ${uniqueNames[1]}`;
      } else {
        byPart = ` by ${uniqueNames.slice(0, -1).join(", ")}, and ${uniqueNames[uniqueNames.length - 1]}`;
      }
    } else {
      const shown = uniqueNames.slice(0, MAX_SHOWN);
      const remaining = uniqueNames.length - MAX_SHOWN;
      byPart = ` by ${shown.join(", ")}, and ${remaining} more`;
    }
    return `${count} comment${count === 1 ? "" : "s"}${byPart}`;
  }
  /**
   * Reorganize flat comment elements into a nested structure.
   * Comments with data-parent-id get moved into a .threads-replies container
   * after their parent comment.
   */
  nestReplies(threadEl) {
    const comments = Array.from(threadEl.querySelectorAll(".threads-comment"));
    const commentMap = /* @__PURE__ */ new Map();
    for (const c5 of comments) {
      const id = c5.dataset.commentId;
      if (id) commentMap.set(id, c5);
    }
    for (const commentEl of comments) {
      const parentId = commentEl.dataset.parentId;
      if (!parentId) continue;
      const parentEl = commentMap.get(parentId);
      if (!parentEl) continue;
      let repliesContainer = parentEl.querySelector(".threads-replies");
      if (!repliesContainer) {
        repliesContainer = document.createElement("div");
        repliesContainer.className = "threads-replies";
        parentEl.appendChild(repliesContainer);
      }
      commentEl.classList.add("threads-comment--reply");
      repliesContainer.appendChild(commentEl);
    }
  }
  /**
   * Open an inline editor for replying to a comment or adding a new top-level comment.
   * @param parentCommentId - null for top-level comment, or comment ID to reply to
   */
  openReplyEditor(threadEl, threadId, parentCommentId) {
    this.removeInlineEditor();
    const editor = document.createElement("threads-inline-editor");
    editor.quote = "";
    editor.addEventListener("inline-submit", async (e8) => {
      const identity = getIdentityPayload();
      try {
        await addComment(threadId, {
          ...identity,
          body: e8.detail.body,
          parentId: parentCommentId
        });
        this.removeInlineEditor();
        if (typeof docmd !== "undefined" && docmd.scheduleReload) {
          docmd.scheduleReload("threads");
        } else {
          await this.loadThreads();
        }
      } catch (err) {
        console.error("[threads] Failed to add comment:", err);
        editor.submitting = false;
      }
    });
    editor.addEventListener("inline-cancel", () => this.removeInlineEditor());
    if (parentCommentId) {
      const parentComment = threadEl.querySelector(`.threads-comment[data-comment-id="${parentCommentId}"]`);
      if (parentComment) {
        const repliesContainer = parentComment.querySelector(".threads-replies");
        if (repliesContainer) {
          repliesContainer.appendChild(editor);
        } else {
          parentComment.appendChild(editor);
        }
      } else {
        threadEl.appendChild(editor);
      }
    } else {
      const footer = threadEl.querySelector(".threads-thread__footer");
      if (footer) {
        threadEl.insertBefore(editor, footer);
      } else {
        threadEl.appendChild(editor);
      }
    }
    this.inlineEditorEl = editor;
  }
  // ─── Author resolution ──────────────────────────────────────────
  /**
   * Look up author info by key or display name.
   * Tries direct key match first, then scans by display name for legacy comments.
   */
  resolveAuthor(authorVal) {
    if (this.authorsMap[authorVal]) return this.authorsMap[authorVal];
    for (const info of Object.values(this.authorsMap)) {
      if (info.name === authorVal) return info;
    }
    for (const info of Object.values(this.authorsMap)) {
      if (info.name.split(/\s+/)[0] === authorVal) return info;
    }
    return null;
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
], ThreadsApp.prototype, "authorsMap", 2);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BsaXQrcmVhY3RpdmUtZWxlbWVudEAyLjEuMi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3NyYy9jc3MtdGFnLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AbGl0K3JlYWN0aXZlLWVsZW1lbnRAMi4xLjIvbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9zcmMvcmVhY3RpdmUtZWxlbWVudC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbGl0LWh0bWxAMy4zLjIvbm9kZV9tb2R1bGVzL2xpdC1odG1sL3NyYy9saXQtaHRtbC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbGl0LWVsZW1lbnRANC4yLjIvbm9kZV9tb2R1bGVzL2xpdC1lbGVtZW50L3NyYy9saXQtZWxlbWVudC50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbGl0LWh0bWxAMy4zLjIvbm9kZV9tb2R1bGVzL2xpdC1odG1sL3NyYy9pcy1zZXJ2ZXIudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BsaXQrcmVhY3RpdmUtZWxlbWVudEAyLjEuMi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3NyYy9kZWNvcmF0b3JzL2N1c3RvbS1lbGVtZW50LnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AbGl0K3JlYWN0aXZlLWVsZW1lbnRAMi4xLjIvbm9kZV9tb2R1bGVzL0BsaXQvcmVhY3RpdmUtZWxlbWVudC9zcmMvZGVjb3JhdG9ycy9wcm9wZXJ0eS50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGxpdCtyZWFjdGl2ZS1lbGVtZW50QDIuMS4yL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvc3JjL2RlY29yYXRvcnMvc3RhdGUudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BsaXQrcmVhY3RpdmUtZWxlbWVudEAyLjEuMi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3NyYy9kZWNvcmF0b3JzL2Jhc2UudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BsaXQrcmVhY3RpdmUtZWxlbWVudEAyLjEuMi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L3NyYy9kZWNvcmF0b3JzL3F1ZXJ5LnRzIiwgIi4uLy4uL3NyYy9jbGllbnQvbGliL2FwaS50cyIsICIuLi8uLi9zcmMvY2xpZW50L2xpYi9pZGVudGl0eS50cyIsICIuLi8uLi9zcmMvY2xpZW50L2xpYi9zZWxlY3Rpb24udHMiLCAiLi4vLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL3N0eWxlcy50cyIsICIuLi8uLi9zcmMvY2xpZW50L2xpYi90aGVtZS50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLlI3UVg0TTZSLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuVkMzQlBVWkouanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay43VkdDSUhERy5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLkVQSEhXWEsyLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuSVBXUFJJSFouanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5LSUhCM1ZNQi5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLjZKNlFZRkhWLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuNEZPSFVCQlMuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5QWkFONkZQTi5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQHNob2VsYWNlLXN0eWxlK2xvY2FsaXplQDMuMi4xL25vZGVfbW9kdWxlcy9Ac2hvZWxhY2Utc3R5bGUvbG9jYWxpemUvZGlzdC9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLjcyV0pORDVYLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuT0tYQk5SRTYuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5YTlRQN0RFUS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbGl0LWh0bWxAMy4zLjIvbm9kZV9tb2R1bGVzL2xpdC1odG1sL3NyYy9kaXJlY3RpdmUudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xpdC1odG1sQDMuMy4yL25vZGVfbW9kdWxlcy9saXQtaHRtbC9zcmMvZGlyZWN0aXZlcy9jbGFzcy1tYXAudHMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xpdC1odG1sQDMuMy4yL25vZGVfbW9kdWxlcy9saXQtaHRtbC9zcmMvZGlyZWN0aXZlcy9pZi1kZWZpbmVkLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9saXQtaHRtbEAzLjMuMi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvc3JjL3N0YXRpYy50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLkIzM0xPQUJMLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuQUdER1JHNEUuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5WVEFWMlNHNC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLllEUUNTMkhLLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuV0RJSUdVTlAuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5ENUkyRFdNTC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLks2UU1VSUhQLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuSlZUQUdSNUIuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5LUE4zWVo2VS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLkZTUlhZR1NXLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9saXQtaHRtbEAzLjMuMi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvc3JjL2RpcmVjdGl2ZS1oZWxwZXJzLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuSktCTlcyVEcuanMiLCAiLi4vLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL3RocmVhZHMtcG9wb3Zlci50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLkdXV0dQN1pMLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuNUxYWFhFTEUuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2xpdC1odG1sQDMuMy4yL25vZGVfbW9kdWxlcy9saXQtaHRtbC9zcmMvZGlyZWN0aXZlcy9saXZlLnRzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuNlROT0NBQTUuanMiLCAiLi4vLi4vc3JjL2NsaWVudC9jb21wb25lbnRzL3RocmVhZHMtaW5saW5lLWVkaXRvci50cyIsICIuLi8uLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvdGhyZWFkcy1pZGVudGl0eS50cyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLlZRWjQ2TVlJLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuUk1aN0JWRE0uanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5ORVQ1VjZOTC5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLjUyV0EyREpPLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuNFpBS1A3TlkuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5NUU9ESjc1Vi5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLjNOS0lISUNXLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXdlc29tZS5tZSt3ZWJhd2Vzb21lQDMuMy4xX0BmbG9hdGluZy11aSt1dGlsc0AwLjIuMTFfQHR5cGVzK3JlYWN0QDE5LjIuMTQvbm9kZV9tb2R1bGVzL0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jaHVua3MvY2h1bmsuUFgzSE1LRjcuanMiLCAiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd2Vzb21lLm1lK3dlYmF3ZXNvbWVAMy4zLjFfQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi4xMV9AdHlwZXMrcmVhY3RAMTkuMi4xNC9ub2RlX21vZHVsZXMvQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NodW5rcy9jaHVuay5MNkNJS09GUS5qcyIsICIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3ZXNvbWUubWUrd2ViYXdlc29tZUAzLjMuMV9AZmxvYXRpbmctdWkrdXRpbHNAMC4yLjExX0B0eXBlcytyZWFjdEAxOS4yLjE0L25vZGVfbW9kdWxlcy9AYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY2h1bmtzL2NodW5rLk9VWTRWREYyLmpzIiwgIi4uLy4uL3NyYy9jbGllbnQvY29tcG9uZW50cy90aHJlYWRzLWFwcC50cyIsICIuLi8uLi9zcmMvY2xpZW50L2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuY29uc3QgTk9ERV9NT0RFID0gZmFsc2U7XG5cbi8vIEFsbG93cyBtaW5pZmllcnMgdG8gcmVuYW1lIHJlZmVyZW5jZXMgdG8gZ2xvYmFsVGhpc1xuY29uc3QgZ2xvYmFsID0gZ2xvYmFsVGhpcztcblxuLyoqXG4gKiBXaGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgYGFkb3B0ZWRTdHlsZVNoZWV0c2AuXG4gKi9cbmV4cG9ydCBjb25zdCBzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHM6IGJvb2xlYW4gPVxuICBnbG9iYWwuU2hhZG93Um9vdCAmJlxuICAoZ2xvYmFsLlNoYWR5Q1NTID09PSB1bmRlZmluZWQgfHwgZ2xvYmFsLlNoYWR5Q1NTLm5hdGl2ZVNoYWRvdykgJiZcbiAgJ2Fkb3B0ZWRTdHlsZVNoZWV0cycgaW4gRG9jdW1lbnQucHJvdG90eXBlICYmXG4gICdyZXBsYWNlJyBpbiBDU1NTdHlsZVNoZWV0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBBIENTU1Jlc3VsdCBvciBuYXRpdmUgQ1NTU3R5bGVTaGVldC5cbiAqXG4gKiBJbiBicm93c2VycyB0aGF0IHN1cHBvcnQgY29uc3RydWN0aWJsZSBDU1Mgc3R5bGUgc2hlZXRzLCBDU1NTdHlsZVNoZWV0XG4gKiBvYmplY3QgY2FuIGJlIHVzZWQgZm9yIHN0eWxpbmcgYWxvbmcgc2lkZSBDU1NSZXN1bHQgZnJvbSB0aGUgYGNzc2BcbiAqIHRlbXBsYXRlIHRhZy5cbiAqL1xuZXhwb3J0IHR5cGUgQ1NTUmVzdWx0T3JOYXRpdmUgPSBDU1NSZXN1bHQgfCBDU1NTdHlsZVNoZWV0O1xuXG5leHBvcnQgdHlwZSBDU1NSZXN1bHRBcnJheSA9IEFycmF5PENTU1Jlc3VsdE9yTmF0aXZlIHwgQ1NTUmVzdWx0QXJyYXk+O1xuXG4vKipcbiAqIEEgc2luZ2xlIENTU1Jlc3VsdCwgQ1NTU3R5bGVTaGVldCwgb3IgYW4gYXJyYXkgb3IgbmVzdGVkIGFycmF5cyBvZiB0aG9zZS5cbiAqL1xuZXhwb3J0IHR5cGUgQ1NTUmVzdWx0R3JvdXAgPSBDU1NSZXN1bHRPck5hdGl2ZSB8IENTU1Jlc3VsdEFycmF5O1xuXG5jb25zdCBjb25zdHJ1Y3Rpb25Ub2tlbiA9IFN5bWJvbCgpO1xuXG5jb25zdCBjc3NUYWdDYWNoZSA9IG5ldyBXZWFrTWFwPFRlbXBsYXRlU3RyaW5nc0FycmF5LCBDU1NTdHlsZVNoZWV0PigpO1xuXG4vKipcbiAqIEEgY29udGFpbmVyIGZvciBhIHN0cmluZyBvZiBDU1MgdGV4dCwgdGhhdCBtYXkgYmUgdXNlZCB0byBjcmVhdGUgYSBDU1NTdHlsZVNoZWV0LlxuICpcbiAqIENTU1Jlc3VsdCBpcyB0aGUgcmV0dXJuIHZhbHVlIG9mIGBjc3NgLXRhZ2dlZCB0ZW1wbGF0ZSBsaXRlcmFscyBhbmRcbiAqIGB1bnNhZmVDU1MoKWAuIEluIG9yZGVyIHRvIGVuc3VyZSB0aGF0IENTU1Jlc3VsdHMgYXJlIG9ubHkgY3JlYXRlZCB2aWEgdGhlXG4gKiBgY3NzYCB0YWcgYW5kIGB1bnNhZmVDU1MoKWAsIENTU1Jlc3VsdCBjYW5ub3QgYmUgY29uc3RydWN0ZWQgZGlyZWN0bHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBDU1NSZXN1bHQge1xuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICBbJ18kY3NzUmVzdWx0JCddID0gdHJ1ZTtcbiAgcmVhZG9ubHkgY3NzVGV4dDogc3RyaW5nO1xuICBwcml2YXRlIF9zdHlsZVNoZWV0PzogQ1NTU3R5bGVTaGVldDtcbiAgcHJpdmF0ZSBfc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXkgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihcbiAgICBjc3NUZXh0OiBzdHJpbmcsXG4gICAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXkgfCB1bmRlZmluZWQsXG4gICAgc2FmZVRva2VuOiBzeW1ib2xcbiAgKSB7XG4gICAgaWYgKHNhZmVUb2tlbiAhPT0gY29uc3RydWN0aW9uVG9rZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0NTU1Jlc3VsdCBpcyBub3QgY29uc3RydWN0YWJsZS4gVXNlIGB1bnNhZmVDU1NgIG9yIGBjc3NgIGluc3RlYWQuJ1xuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5jc3NUZXh0ID0gY3NzVGV4dDtcbiAgICB0aGlzLl9zdHJpbmdzID0gc3RyaW5ncztcbiAgfVxuXG4gIC8vIFRoaXMgaXMgYSBnZXR0ZXIgc28gdGhhdCBpdCdzIGxhenkuIEluIHByYWN0aWNlLCB0aGlzIG1lYW5zIHN0eWxlc2hlZXRzXG4gIC8vIGFyZSBub3QgY3JlYXRlZCB1bnRpbCB0aGUgZmlyc3QgZWxlbWVudCBpbnN0YW5jZSBpcyBtYWRlLlxuICBnZXQgc3R5bGVTaGVldCgpOiBDU1NTdHlsZVNoZWV0IHwgdW5kZWZpbmVkIHtcbiAgICAvLyBJZiBgc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzYCBpcyB0cnVlIHRoZW4gd2UgYXNzdW1lIENTU1N0eWxlU2hlZXQgaXNcbiAgICAvLyBjb25zdHJ1Y3RhYmxlLlxuICAgIGxldCBzdHlsZVNoZWV0ID0gdGhpcy5fc3R5bGVTaGVldDtcbiAgICBjb25zdCBzdHJpbmdzID0gdGhpcy5fc3RyaW5ncztcbiAgICBpZiAoc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzICYmIHN0eWxlU2hlZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgY2FjaGVhYmxlID0gc3RyaW5ncyAhPT0gdW5kZWZpbmVkICYmIHN0cmluZ3MubGVuZ3RoID09PSAxO1xuICAgICAgaWYgKGNhY2hlYWJsZSkge1xuICAgICAgICBzdHlsZVNoZWV0ID0gY3NzVGFnQ2FjaGUuZ2V0KHN0cmluZ3MpO1xuICAgICAgfVxuICAgICAgaWYgKHN0eWxlU2hlZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAodGhpcy5fc3R5bGVTaGVldCA9IHN0eWxlU2hlZXQgPSBuZXcgQ1NTU3R5bGVTaGVldCgpKS5yZXBsYWNlU3luYyhcbiAgICAgICAgICB0aGlzLmNzc1RleHRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGNhY2hlYWJsZSkge1xuICAgICAgICAgIGNzc1RhZ0NhY2hlLnNldChzdHJpbmdzLCBzdHlsZVNoZWV0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVTaGVldDtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3NzVGV4dDtcbiAgfVxufVxuXG50eXBlIENvbnN0cnVjdGFibGVDU1NSZXN1bHQgPSBDU1NSZXN1bHQgJiB7XG4gIG5ldyAoXG4gICAgY3NzVGV4dDogc3RyaW5nLFxuICAgIHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5IHwgdW5kZWZpbmVkLFxuICAgIHNhZmVUb2tlbjogc3ltYm9sXG4gICk6IENTU1Jlc3VsdDtcbn07XG5cbmNvbnN0IHRleHRGcm9tQ1NTUmVzdWx0ID0gKHZhbHVlOiBDU1NSZXN1bHRHcm91cCB8IG51bWJlcikgPT4ge1xuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICBpZiAoKHZhbHVlIGFzIENTU1Jlc3VsdClbJ18kY3NzUmVzdWx0JCddID09PSB0cnVlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSBhcyBDU1NSZXN1bHQpLmNzc1RleHQ7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgVmFsdWUgcGFzc2VkIHRvICdjc3MnIGZ1bmN0aW9uIG11c3QgYmUgYSAnY3NzJyBmdW5jdGlvbiByZXN1bHQ6IGAgK1xuICAgICAgICBgJHt2YWx1ZX0uIFVzZSAndW5zYWZlQ1NTJyB0byBwYXNzIG5vbi1saXRlcmFsIHZhbHVlcywgYnV0IHRha2UgY2FyZSBgICtcbiAgICAgICAgYHRvIGVuc3VyZSBwYWdlIHNlY3VyaXR5LmBcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIFdyYXAgYSB2YWx1ZSBmb3IgaW50ZXJwb2xhdGlvbiBpbiBhIHtAbGlua2NvZGUgY3NzfSB0YWdnZWQgdGVtcGxhdGUgbGl0ZXJhbC5cbiAqXG4gKiBUaGlzIGlzIHVuc2FmZSBiZWNhdXNlIHVudHJ1c3RlZCBDU1MgdGV4dCBjYW4gYmUgdXNlZCB0byBwaG9uZSBob21lXG4gKiBvciBleGZpbHRyYXRlIGRhdGEgdG8gYW4gYXR0YWNrZXIgY29udHJvbGxlZCBzaXRlLiBUYWtlIGNhcmUgdG8gb25seSB1c2VcbiAqIHRoaXMgd2l0aCB0cnVzdGVkIGlucHV0LlxuICovXG5leHBvcnQgY29uc3QgdW5zYWZlQ1NTID0gKHZhbHVlOiB1bmtub3duKSA9PlxuICBuZXcgKENTU1Jlc3VsdCBhcyBDb25zdHJ1Y3RhYmxlQ1NTUmVzdWx0KShcbiAgICB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiBTdHJpbmcodmFsdWUpLFxuICAgIHVuZGVmaW5lZCxcbiAgICBjb25zdHJ1Y3Rpb25Ub2tlblxuICApO1xuXG4vKipcbiAqIEEgdGVtcGxhdGUgbGl0ZXJhbCB0YWcgd2hpY2ggY2FuIGJlIHVzZWQgd2l0aCBMaXRFbGVtZW50J3NcbiAqIHtAbGlua2NvZGUgTGl0RWxlbWVudC5zdHlsZXN9IHByb3BlcnR5IHRvIHNldCBlbGVtZW50IHN0eWxlcy5cbiAqXG4gKiBGb3Igc2VjdXJpdHkgcmVhc29ucywgb25seSBsaXRlcmFsIHN0cmluZyB2YWx1ZXMgYW5kIG51bWJlciBtYXkgYmUgdXNlZCBpblxuICogZW1iZWRkZWQgZXhwcmVzc2lvbnMuIFRvIGluY29ycG9yYXRlIG5vbi1saXRlcmFsIHZhbHVlcyB7QGxpbmtjb2RlIHVuc2FmZUNTU31cbiAqIG1heSBiZSB1c2VkIGluc2lkZSBhbiBleHByZXNzaW9uLlxuICovXG5leHBvcnQgY29uc3QgY3NzID0gKFxuICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgLi4udmFsdWVzOiAoQ1NTUmVzdWx0R3JvdXAgfCBudW1iZXIpW11cbik6IENTU1Jlc3VsdCA9PiB7XG4gIGNvbnN0IGNzc1RleHQgPVxuICAgIHN0cmluZ3MubGVuZ3RoID09PSAxXG4gICAgICA/IHN0cmluZ3NbMF1cbiAgICAgIDogdmFsdWVzLnJlZHVjZShcbiAgICAgICAgICAoYWNjLCB2LCBpZHgpID0+IGFjYyArIHRleHRGcm9tQ1NTUmVzdWx0KHYpICsgc3RyaW5nc1tpZHggKyAxXSxcbiAgICAgICAgICBzdHJpbmdzWzBdXG4gICAgICAgICk7XG4gIHJldHVybiBuZXcgKENTU1Jlc3VsdCBhcyBDb25zdHJ1Y3RhYmxlQ1NTUmVzdWx0KShcbiAgICBjc3NUZXh0LFxuICAgIHN0cmluZ3MsXG4gICAgY29uc3RydWN0aW9uVG9rZW5cbiAgKTtcbn07XG5cbi8qKlxuICogQXBwbGllcyB0aGUgZ2l2ZW4gc3R5bGVzIHRvIGEgYHNoYWRvd1Jvb3RgLiBXaGVuIFNoYWRvdyBET00gaXNcbiAqIGF2YWlsYWJsZSBidXQgYGFkb3B0ZWRTdHlsZVNoZWV0c2AgaXMgbm90LCBzdHlsZXMgYXJlIGFwcGVuZGVkIHRvIHRoZVxuICogYHNoYWRvd1Jvb3RgIHRvIFttaW1pYyB0aGUgbmF0aXZlIGZlYXR1cmVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9TaGFkb3dSb290L2Fkb3B0ZWRTdHlsZVNoZWV0cykuXG4gKiBOb3RlLCB3aGVuIHNoaW1taW5nIGlzIHVzZWQsIGFueSBzdHlsZXMgdGhhdCBhcmUgc3Vic2VxdWVudGx5IHBsYWNlZCBpbnRvXG4gKiB0aGUgc2hhZG93Um9vdCBzaG91bGQgYmUgcGxhY2VkICpiZWZvcmUqIGFueSBzaGltbWVkIGFkb3B0ZWQgc3R5bGVzLiBUaGlzXG4gKiB3aWxsIG1hdGNoIHNwZWMgYmVoYXZpb3IgdGhhdCBnaXZlcyBhZG9wdGVkIHNoZWV0cyBwcmVjZWRlbmNlIG92ZXIgc3R5bGVzIGluXG4gKiBzaGFkb3dSb290LlxuICovXG5leHBvcnQgY29uc3QgYWRvcHRTdHlsZXMgPSAoXG4gIHJlbmRlclJvb3Q6IFNoYWRvd1Jvb3QsXG4gIHN0eWxlczogQXJyYXk8Q1NTUmVzdWx0T3JOYXRpdmU+XG4pID0+IHtcbiAgaWYgKHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cykge1xuICAgIChyZW5kZXJSb290IGFzIFNoYWRvd1Jvb3QpLmFkb3B0ZWRTdHlsZVNoZWV0cyA9IHN0eWxlcy5tYXAoKHMpID0+XG4gICAgICBzIGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldCA/IHMgOiBzLnN0eWxlU2hlZXQhXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGNvbnN0IHMgb2Ygc3R5bGVzKSB7XG4gICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgY29uc3Qgbm9uY2UgPSAoZ2xvYmFsIGFzIGFueSlbJ2xpdE5vbmNlJ107XG4gICAgICBpZiAobm9uY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgbm9uY2UpO1xuICAgICAgfVxuICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSAocyBhcyBDU1NSZXN1bHQpLmNzc1RleHQ7XG4gICAgICByZW5kZXJSb290LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGNzc1Jlc3VsdEZyb21TdHlsZVNoZWV0ID0gKHNoZWV0OiBDU1NTdHlsZVNoZWV0KSA9PiB7XG4gIGxldCBjc3NUZXh0ID0gJyc7XG4gIGZvciAoY29uc3QgcnVsZSBvZiBzaGVldC5jc3NSdWxlcykge1xuICAgIGNzc1RleHQgKz0gcnVsZS5jc3NUZXh0O1xuICB9XG4gIHJldHVybiB1bnNhZmVDU1MoY3NzVGV4dCk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29tcGF0aWJsZVN0eWxlID1cbiAgc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzIHx8XG4gIChOT0RFX01PREUgJiYgZ2xvYmFsLkNTU1N0eWxlU2hlZXQgPT09IHVuZGVmaW5lZClcbiAgICA/IChzOiBDU1NSZXN1bHRPck5hdGl2ZSkgPT4gc1xuICAgIDogKHM6IENTU1Jlc3VsdE9yTmF0aXZlKSA9PlxuICAgICAgICBzIGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldCA/IGNzc1Jlc3VsdEZyb21TdHlsZVNoZWV0KHMpIDogcztcbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuLyoqXG4gKiBVc2UgdGhpcyBtb2R1bGUgaWYgeW91IHdhbnQgdG8gY3JlYXRlIHlvdXIgb3duIGJhc2UgY2xhc3MgZXh0ZW5kaW5nXG4gKiB7QGxpbmsgUmVhY3RpdmVFbGVtZW50fS5cbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICovXG5cbmltcG9ydCB7XG4gIGdldENvbXBhdGlibGVTdHlsZSxcbiAgYWRvcHRTdHlsZXMsXG4gIENTU1Jlc3VsdEdyb3VwLFxuICBDU1NSZXN1bHRPck5hdGl2ZSxcbn0gZnJvbSAnLi9jc3MtdGFnLmpzJztcbmltcG9ydCB0eXBlIHtcbiAgUmVhY3RpdmVDb250cm9sbGVyLFxuICBSZWFjdGl2ZUNvbnRyb2xsZXJIb3N0LFxufSBmcm9tICcuL3JlYWN0aXZlLWNvbnRyb2xsZXIuanMnO1xuXG4vLyBJbiB0aGUgTm9kZSBidWlsZCwgdGhpcyBpbXBvcnQgd2lsbCBiZSBpbmplY3RlZCBieSBSb2xsdXA6XG4vLyBpbXBvcnQge0hUTUxFbGVtZW50LCBjdXN0b21FbGVtZW50c30gZnJvbSAnQGxpdC1sYWJzL3Nzci1kb20tc2hpbSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vY3NzLXRhZy5qcyc7XG5leHBvcnQgdHlwZSB7XG4gIFJlYWN0aXZlQ29udHJvbGxlcixcbiAgUmVhY3RpdmVDb250cm9sbGVySG9zdCxcbn0gZnJvbSAnLi9yZWFjdGl2ZS1jb250cm9sbGVyLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBgcmVhZG9ubHlgIG1vZGlmaWVyIGZyb20gcHJvcGVydGllcyBpbiB0aGUgdW5pb24gSy5cbiAqXG4gKiBUaGlzIGlzIGEgc2FmZXIgd2F5IHRvIGNhc3QgYSB2YWx1ZSB0byBhIHR5cGUgd2l0aCBhIG11dGFibGUgdmVyc2lvbiBvZiBhXG4gKiByZWFkb25seSBmaWVsZCwgdGhhbiBjYXN0aW5nIHRvIGFuIGludGVyZmFjZSB3aXRoIHRoZSBmaWVsZCByZS1kZWNsYXJlZFxuICogYmVjYXVzZSBpdCBwcmVzZXJ2ZXMgdGhlIHR5cGUgb2YgYWxsIHRoZSBmaWVsZHMgYW5kIHdhcm5zIG9uIHR5cG9zLlxuICovXG50eXBlIE11dGFibGU8VCwgSyBleHRlbmRzIGtleW9mIFQ+ID0gT21pdDxULCBLPiAmIHtcbiAgLXJlYWRvbmx5IFtQIGluIGtleW9mIFBpY2s8VCwgSz5dOiBQIGV4dGVuZHMgSyA/IFRbUF0gOiBuZXZlcjtcbn07XG5cbi8vIFRPRE8gKGp1c3RpbmZhZ25hbmkpOiBBZGQgYGhhc093bmAgaGVyZSB3aGVuIHdlIHNoaXAgRVMyMDIyXG5jb25zdCB7XG4gIGlzLFxuICBkZWZpbmVQcm9wZXJ0eSxcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGdldFByb3RvdHlwZU9mLFxufSA9IE9iamVjdDtcblxuY29uc3QgTk9ERV9NT0RFID0gZmFsc2U7XG5cbi8vIExldHMgYSBtaW5pZmllciByZXBsYWNlIGdsb2JhbFRoaXMgcmVmZXJlbmNlcyB3aXRoIGEgbWluaWZpZWQgbmFtZVxuY29uc3QgZ2xvYmFsID0gZ2xvYmFsVGhpcztcblxuaWYgKE5PREVfTU9ERSkge1xuICBnbG9iYWwuY3VzdG9tRWxlbWVudHMgPz89IGN1c3RvbUVsZW1lbnRzO1xufVxuXG5jb25zdCBERVZfTU9ERSA9IHRydWU7XG5cbmxldCBpc3N1ZVdhcm5pbmc6IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4gdm9pZDtcblxuY29uc3QgdHJ1c3RlZFR5cGVzID0gKGdsb2JhbCBhcyB1bmtub3duIGFzIHt0cnVzdGVkVHlwZXM/OiB7ZW1wdHlTY3JpcHQ6ICcnfX0pXG4gIC50cnVzdGVkVHlwZXM7XG5cbi8vIFRlbXBvcmFyeSB3b3JrYXJvdW5kIGZvciBodHRwczovL2NyYnVnLmNvbS85OTMyNjhcbi8vIEN1cnJlbnRseSwgYW55IGF0dHJpYnV0ZSBzdGFydGluZyB3aXRoIFwib25cIiBpcyBjb25zaWRlcmVkIHRvIGJlIGFcbi8vIFRydXN0ZWRTY3JpcHQgc291cmNlLiBTdWNoIGJvb2xlYW4gYXR0cmlidXRlcyBtdXN0IGJlIHNldCB0byB0aGUgZXF1aXZhbGVudFxuLy8gdHJ1c3RlZCBlbXB0eVNjcmlwdCB2YWx1ZS5cbmNvbnN0IGVtcHR5U3RyaW5nRm9yQm9vbGVhbkF0dHJpYnV0ZSA9IHRydXN0ZWRUeXBlc1xuICA/ICh0cnVzdGVkVHlwZXMuZW1wdHlTY3JpcHQgYXMgdW5rbm93biBhcyAnJylcbiAgOiAnJztcblxuY29uc3QgcG9seWZpbGxTdXBwb3J0ID0gREVWX01PREVcbiAgPyBnbG9iYWwucmVhY3RpdmVFbGVtZW50UG9seWZpbGxTdXBwb3J0RGV2TW9kZVxuICA6IGdsb2JhbC5yZWFjdGl2ZUVsZW1lbnRQb2x5ZmlsbFN1cHBvcnQ7XG5cbmlmIChERVZfTU9ERSkge1xuICAvLyBFbnN1cmUgd2FybmluZ3MgYXJlIGlzc3VlZCBvbmx5IDF4LCBldmVuIGlmIG11bHRpcGxlIHZlcnNpb25zIG9mIExpdFxuICAvLyBhcmUgbG9hZGVkLlxuICBnbG9iYWwubGl0SXNzdWVkV2FybmluZ3MgPz89IG5ldyBTZXQoKTtcblxuICAvKipcbiAgICogSXNzdWUgYSB3YXJuaW5nIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgYmFzZWQgZWl0aGVyIG9uIGBjb2RlYCBvciBgd2FybmluZ2AuXG4gICAqIFdhcm5pbmdzIGFyZSBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5IG9ubHkgYnkgYHdhcm5pbmdgOyBkaXNhYmxpbmcgdmlhIGBjb2RlYFxuICAgKiBjYW4gYmUgZG9uZSBieSB1c2Vycy5cbiAgICovXG4gIGlzc3VlV2FybmluZyA9IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4ge1xuICAgIHdhcm5pbmcgKz0gYCBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy8ke2NvZGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLmA7XG4gICAgaWYgKFxuICAgICAgIWdsb2JhbC5saXRJc3N1ZWRXYXJuaW5ncyEuaGFzKHdhcm5pbmcpICYmXG4gICAgICAhZ2xvYmFsLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMoY29kZSlcbiAgICApIHtcbiAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbiAgICAgIGdsb2JhbC5saXRJc3N1ZWRXYXJuaW5ncyEuYWRkKHdhcm5pbmcpO1xuICAgIH1cbiAgfTtcblxuICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgaXNzdWVXYXJuaW5nKFxuICAgICAgJ2Rldi1tb2RlJyxcbiAgICAgIGBMaXQgaXMgaW4gZGV2IG1vZGUuIE5vdCByZWNvbW1lbmRlZCBmb3IgcHJvZHVjdGlvbiFgXG4gICAgKTtcblxuICAgIC8vIElzc3VlIHBvbHlmaWxsIHN1cHBvcnQgd2FybmluZy5cbiAgICBpZiAoZ2xvYmFsLlNoYWR5RE9NPy5pblVzZSAmJiBwb2x5ZmlsbFN1cHBvcnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaXNzdWVXYXJuaW5nKFxuICAgICAgICAncG9seWZpbGwtc3VwcG9ydC1taXNzaW5nJyxcbiAgICAgICAgYFNoYWRvdyBET00gaXMgYmVpbmcgcG9seWZpbGxlZCB2aWEgXFxgU2hhZHlET01cXGAgYnV0IGAgK1xuICAgICAgICAgIGB0aGUgXFxgcG9seWZpbGwtc3VwcG9ydFxcYCBtb2R1bGUgaGFzIG5vdCBiZWVuIGxvYWRlZC5gXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQ29udGFpbnMgdHlwZXMgdGhhdCBhcmUgcGFydCBvZiB0aGUgdW5zdGFibGUgZGVidWcgQVBJLlxuICpcbiAqIEV2ZXJ5dGhpbmcgaW4gdGhpcyBBUEkgaXMgbm90IHN0YWJsZSBhbmQgbWF5IGNoYW5nZSBvciBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsXG4gKiBldmVuIG9uIHBhdGNoIHJlbGVhc2VzLlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuZXhwb3J0IG5hbWVzcGFjZSBSZWFjdGl2ZVVuc3RhYmxlIHtcbiAgLyoqXG4gICAqIFdoZW4gTGl0IGlzIHJ1bm5pbmcgaW4gZGV2IG1vZGUgYW5kIGB3aW5kb3cuZW1pdExpdERlYnVnTG9nRXZlbnRzYCBpcyB0cnVlLFxuICAgKiB3ZSB3aWxsIGVtaXQgJ2xpdC1kZWJ1ZycgZXZlbnRzIHRvIHdpbmRvdywgd2l0aCBsaXZlIGRldGFpbHMgYWJvdXQgdGhlIHVwZGF0ZSBhbmQgcmVuZGVyXG4gICAqIGxpZmVjeWNsZS4gVGhlc2UgY2FuIGJlIHVzZWZ1bCBmb3Igd3JpdGluZyBkZWJ1ZyB0b29saW5nIGFuZCB2aXN1YWxpemF0aW9ucy5cbiAgICpcbiAgICogUGxlYXNlIGJlIGF3YXJlIHRoYXQgcnVubmluZyB3aXRoIHdpbmRvdy5lbWl0TGl0RGVidWdMb2dFdmVudHMgaGFzIHBlcmZvcm1hbmNlIG92ZXJoZWFkLFxuICAgKiBtYWtpbmcgY2VydGFpbiBvcGVyYXRpb25zIHRoYXQgYXJlIG5vcm1hbGx5IHZlcnkgY2hlYXAgKGxpa2UgYSBuby1vcCByZW5kZXIpIG11Y2ggc2xvd2VyLFxuICAgKiBiZWNhdXNlIHdlIG11c3QgY29weSBkYXRhIGFuZCBkaXNwYXRjaCBldmVudHMuXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuICBleHBvcnQgbmFtZXNwYWNlIERlYnVnTG9nIHtcbiAgICBleHBvcnQgdHlwZSBFbnRyeSA9IFVwZGF0ZTtcbiAgICBleHBvcnQgaW50ZXJmYWNlIFVwZGF0ZSB7XG4gICAgICBraW5kOiAndXBkYXRlJztcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlYnVnTG9nZ2luZ1dpbmRvdyB7XG4gIC8vIEV2ZW4gaW4gZGV2IG1vZGUsIHdlIGdlbmVyYWxseSBkb24ndCB3YW50IHRvIGVtaXQgdGhlc2UgZXZlbnRzLCBhcyB0aGF0J3NcbiAgLy8gYW5vdGhlciBsZXZlbCBvZiBjb3N0LCBzbyBvbmx5IGVtaXQgdGhlbSB3aGVuIERFVl9NT0RFIGlzIHRydWUgX2FuZF8gd2hlblxuICAvLyB3aW5kb3cuZW1pdExpdERlYnVnRXZlbnRzIGlzIHRydWUuXG4gIGVtaXRMaXREZWJ1Z0xvZ0V2ZW50cz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogVXNlZnVsIGZvciB2aXN1YWxpemluZyBhbmQgbG9nZ2luZyBpbnNpZ2h0cyBpbnRvIHdoYXQgdGhlIExpdCB0ZW1wbGF0ZSBzeXN0ZW0gaXMgZG9pbmcuXG4gKlxuICogQ29tcGlsZWQgb3V0IG9mIHByb2QgbW9kZSBidWlsZHMuXG4gKi9cbmNvbnN0IGRlYnVnTG9nRXZlbnQgPSBERVZfTU9ERVxuICA/IChldmVudDogUmVhY3RpdmVVbnN0YWJsZS5EZWJ1Z0xvZy5FbnRyeSkgPT4ge1xuICAgICAgY29uc3Qgc2hvdWxkRW1pdCA9IChnbG9iYWwgYXMgdW5rbm93biBhcyBEZWJ1Z0xvZ2dpbmdXaW5kb3cpXG4gICAgICAgIC5lbWl0TGl0RGVidWdMb2dFdmVudHM7XG4gICAgICBpZiAoIXNob3VsZEVtaXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZ2xvYmFsLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudDxSZWFjdGl2ZVVuc3RhYmxlLkRlYnVnTG9nLkVudHJ5PignbGl0LWRlYnVnJywge1xuICAgICAgICAgIGRldGFpbDogZXZlbnQsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgOiB1bmRlZmluZWQ7XG5cbi8qXG4gKiBXaGVuIHVzaW5nIENsb3N1cmUgQ29tcGlsZXIsIEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkocHJvcGVydHksIG9iamVjdCkgaXNcbiAqIHJlcGxhY2VkIGF0IGNvbXBpbGUgdGltZSBieSB0aGUgbXVuZ2VkIG5hbWUgZm9yIG9iamVjdFtwcm9wZXJ0eV0uIFdlIGNhbm5vdFxuICogYWxpYXMgdGhpcyBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byB1c2UgYSBzbWFsbCBzaGltIHRoYXQgaGFzIHRoZSBzYW1lXG4gKiBiZWhhdmlvciB3aGVuIG5vdCBjb21waWxpbmcuXG4gKi9cbi8qQF9fSU5MSU5FX18qL1xuY29uc3QgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSA9IDxQIGV4dGVuZHMgUHJvcGVydHlLZXk+KFxuICBwcm9wOiBQLFxuICBfb2JqOiB1bmtub3duXG4pOiBQID0+IHByb3A7XG5cbi8qKlxuICogQ29udmVydHMgcHJvcGVydHkgdmFsdWVzIHRvIGFuZCBmcm9tIGF0dHJpYnV0ZSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGxleEF0dHJpYnV0ZUNvbnZlcnRlcjxUeXBlID0gdW5rbm93biwgVHlwZUhpbnQgPSB1bmtub3duPiB7XG4gIC8qKlxuICAgKiBDYWxsZWQgdG8gY29udmVydCBhbiBhdHRyaWJ1dGUgdmFsdWUgdG8gYSBwcm9wZXJ0eVxuICAgKiB2YWx1ZS5cbiAgICovXG4gIGZyb21BdHRyaWJ1dGU/KHZhbHVlOiBzdHJpbmcgfCBudWxsLCB0eXBlPzogVHlwZUhpbnQpOiBUeXBlO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgdG8gY29udmVydCBhIHByb3BlcnR5IHZhbHVlIHRvIGFuIGF0dHJpYnV0ZVxuICAgKiB2YWx1ZS5cbiAgICpcbiAgICogSXQgcmV0dXJucyB1bmtub3duIGluc3RlYWQgb2Ygc3RyaW5nLCB0byBiZSBjb21wYXRpYmxlIHdpdGhcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL1dJQ0cvdHJ1c3RlZC10eXBlcyAoYW5kIHNpbWlsYXIgZWZmb3J0cykuXG4gICAqL1xuICB0b0F0dHJpYnV0ZT8odmFsdWU6IFR5cGUsIHR5cGU/OiBUeXBlSGludCk6IHVua25vd247XG59XG5cbnR5cGUgQXR0cmlidXRlQ29udmVydGVyPFR5cGUgPSB1bmtub3duLCBUeXBlSGludCA9IHVua25vd24+ID1cbiAgfCBDb21wbGV4QXR0cmlidXRlQ29udmVydGVyPFR5cGU+XG4gIHwgKCh2YWx1ZTogc3RyaW5nIHwgbnVsbCwgdHlwZT86IFR5cGVIaW50KSA9PiBUeXBlKTtcblxuLyoqXG4gKiBEZWZpbmVzIG9wdGlvbnMgZm9yIGEgcHJvcGVydHkgYWNjZXNzb3IuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlEZWNsYXJhdGlvbjxUeXBlID0gdW5rbm93biwgVHlwZUhpbnQgPSB1bmtub3duPiB7XG4gIC8qKlxuICAgKiBXaGVuIHNldCB0byBgdHJ1ZWAsIGluZGljYXRlcyB0aGUgcHJvcGVydHkgaXMgaW50ZXJuYWwgcHJpdmF0ZSBzdGF0ZS4gVGhlXG4gICAqIHByb3BlcnR5IHNob3VsZCBub3QgYmUgc2V0IGJ5IHVzZXJzLiBXaGVuIHVzaW5nIFR5cGVTY3JpcHQsIHRoaXMgcHJvcGVydHlcbiAgICogc2hvdWxkIGJlIG1hcmtlZCBhcyBgcHJpdmF0ZWAgb3IgYHByb3RlY3RlZGAsIGFuZCBpdCBpcyBhbHNvIGEgY29tbW9uXG4gICAqIHByYWN0aWNlIHRvIHVzZSBhIGxlYWRpbmcgYF9gIGluIHRoZSBuYW1lLiBUaGUgcHJvcGVydHkgaXMgbm90IGFkZGVkIHRvXG4gICAqIGBvYnNlcnZlZEF0dHJpYnV0ZXNgLlxuICAgKi9cbiAgcmVhZG9ubHkgc3RhdGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IGFuZCB3aGV0aGVyIHRoZSBwcm9wZXJ0eSBiZWNvbWVzIGFuIG9ic2VydmVkIGF0dHJpYnV0ZS5cbiAgICogSWYgdGhlIHZhbHVlIGlzIGBmYWxzZWAsIHRoZSBwcm9wZXJ0eSBpcyBub3QgYWRkZWQgdG8gYG9ic2VydmVkQXR0cmlidXRlc2AuXG4gICAqIElmIHRydWUgb3IgYWJzZW50LCB0aGUgbG93ZXJjYXNlZCBwcm9wZXJ0eSBuYW1lIGlzIG9ic2VydmVkIChlLmcuIGBmb29CYXJgXG4gICAqIGJlY29tZXMgYGZvb2JhcmApLiBJZiBhIHN0cmluZywgdGhlIHN0cmluZyB2YWx1ZSBpcyBvYnNlcnZlZCAoZS5nXG4gICAqIGBhdHRyaWJ1dGU6ICdmb28tYmFyJ2ApLlxuICAgKi9cbiAgcmVhZG9ubHkgYXR0cmlidXRlPzogYm9vbGVhbiB8IHN0cmluZztcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoZSB0eXBlIG9mIHRoZSBwcm9wZXJ0eS4gVGhpcyBpcyB1c2VkIG9ubHkgYXMgYSBoaW50IGZvciB0aGVcbiAgICogYGNvbnZlcnRlcmAgdG8gZGV0ZXJtaW5lIGhvdyB0byBjb252ZXJ0IHRoZSBhdHRyaWJ1dGVcbiAgICogdG8vZnJvbSBhIHByb3BlcnR5LlxuICAgKi9cbiAgcmVhZG9ubHkgdHlwZT86IFR5cGVIaW50O1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaG93IHRvIGNvbnZlcnQgdGhlIGF0dHJpYnV0ZSB0by9mcm9tIGEgcHJvcGVydHkuIElmIHRoaXMgdmFsdWVcbiAgICogaXMgYSBmdW5jdGlvbiwgaXQgaXMgdXNlZCB0byBjb252ZXJ0IHRoZSBhdHRyaWJ1dGUgdmFsdWUgYSB0aGUgcHJvcGVydHlcbiAgICogdmFsdWUuIElmIGl0J3MgYW4gb2JqZWN0LCBpdCBjYW4gaGF2ZSBrZXlzIGZvciBgZnJvbUF0dHJpYnV0ZWAgYW5kXG4gICAqIGB0b0F0dHJpYnV0ZWAuIElmIG5vIGB0b0F0dHJpYnV0ZWAgZnVuY3Rpb24gaXMgcHJvdmlkZWQgYW5kXG4gICAqIGByZWZsZWN0YCBpcyBzZXQgdG8gYHRydWVgLCB0aGUgcHJvcGVydHkgdmFsdWUgaXMgc2V0IGRpcmVjdGx5IHRvIHRoZVxuICAgKiBhdHRyaWJ1dGUuIEEgZGVmYXVsdCBgY29udmVydGVyYCBpcyB1c2VkIGlmIG5vbmUgaXMgcHJvdmlkZWQ7IGl0IHN1cHBvcnRzXG4gICAqIGBCb29sZWFuYCwgYFN0cmluZ2AsIGBOdW1iZXJgLCBgT2JqZWN0YCwgYW5kIGBBcnJheWAuIE5vdGUsXG4gICAqIHdoZW4gYSBwcm9wZXJ0eSBjaGFuZ2VzIGFuZCB0aGUgY29udmVydGVyIGlzIHVzZWQgdG8gdXBkYXRlIHRoZSBhdHRyaWJ1dGUsXG4gICAqIHRoZSBwcm9wZXJ0eSBpcyBuZXZlciB1cGRhdGVkIGFnYWluIGFzIGEgcmVzdWx0IG9mIHRoZSBhdHRyaWJ1dGUgY2hhbmdpbmcsXG4gICAqIGFuZCB2aWNlIHZlcnNhLlxuICAgKi9cbiAgcmVhZG9ubHkgY29udmVydGVyPzogQXR0cmlidXRlQ29udmVydGVyPFR5cGUsIFR5cGVIaW50PjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBwcm9wZXJ0eSBzaG91bGQgcmVmbGVjdCB0byBhbiBhdHRyaWJ1dGUuXG4gICAqIElmIGB0cnVlYCwgd2hlbiB0aGUgcHJvcGVydHkgaXMgc2V0LCB0aGUgYXR0cmlidXRlIGlzIHNldCB1c2luZyB0aGVcbiAgICogYXR0cmlidXRlIG5hbWUgZGV0ZXJtaW5lZCBhY2NvcmRpbmcgdG8gdGhlIHJ1bGVzIGZvciB0aGUgYGF0dHJpYnV0ZWBcbiAgICogcHJvcGVydHkgb3B0aW9uIGFuZCB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IGNvbnZlcnRlZCB1c2luZyB0aGUgcnVsZXNcbiAgICogZnJvbSB0aGUgYGNvbnZlcnRlcmAgcHJvcGVydHkgb3B0aW9uLlxuICAgKi9cbiAgcmVhZG9ubHkgcmVmbGVjdD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBpbmRpY2F0ZXMgaWYgYSBwcm9wZXJ0eSBzaG91bGQgYmUgY29uc2lkZXJlZCBjaGFuZ2VkIHdoZW5cbiAgICogaXQgaXMgc2V0LiBUaGUgZnVuY3Rpb24gc2hvdWxkIHRha2UgdGhlIGBuZXdWYWx1ZWAgYW5kIGBvbGRWYWx1ZWAgYW5kXG4gICAqIHJldHVybiBgdHJ1ZWAgaWYgYW4gdXBkYXRlIHNob3VsZCBiZSByZXF1ZXN0ZWQuXG4gICAqL1xuICBoYXNDaGFuZ2VkPyh2YWx1ZTogVHlwZSwgb2xkVmFsdWU6IFR5cGUpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBhbiBhY2Nlc3NvciB3aWxsIGJlIGNyZWF0ZWQgZm9yIHRoaXMgcHJvcGVydHkuIEJ5XG4gICAqIGRlZmF1bHQsIGFuIGFjY2Vzc29yIHdpbGwgYmUgZ2VuZXJhdGVkIGZvciB0aGlzIHByb3BlcnR5IHRoYXQgcmVxdWVzdHMgYW5cbiAgICogdXBkYXRlIHdoZW4gc2V0LiBJZiB0aGlzIGZsYWcgaXMgYHRydWVgLCBubyBhY2Nlc3NvciB3aWxsIGJlIGNyZWF0ZWQsIGFuZFxuICAgKiBpdCB3aWxsIGJlIHRoZSB1c2VyJ3MgcmVzcG9uc2liaWxpdHkgdG8gY2FsbFxuICAgKiBgdGhpcy5yZXF1ZXN0VXBkYXRlKHByb3BlcnR5TmFtZSwgb2xkVmFsdWUpYCB0byByZXF1ZXN0IGFuIHVwZGF0ZSB3aGVuXG4gICAqIHRoZSBwcm9wZXJ0eSBjaGFuZ2VzLlxuICAgKi9cbiAgcmVhZG9ubHkgbm9BY2Nlc3Nvcj86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhpcyBwcm9wZXJ0eSBpcyB3cmFwcGluZyBhY2Nlc3NvcnMuIFRoaXMgaXMgc2V0IGJ5IGBAcHJvcGVydHlgXG4gICAqIHRvIGNvbnRyb2wgdGhlIGluaXRpYWwgdmFsdWUgY2hhbmdlIGFuZCByZWZsZWN0aW9uIGxvZ2ljLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHdyYXBwZWQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGVuIGB0cnVlYCwgdXNlcyB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgYXMgdGhlIGRlZmF1bHQgdmFsdWUsXG4gICAqIHdoaWNoIGNoYW5nZXMgaG93IGF0dHJpYnV0ZXMgYXJlIGhhbmRsZWQ6XG4gICAqICAtIFRoZSBpbml0aWFsIHZhbHVlIGRvZXMgKm5vdCogcmVmbGVjdCwgZXZlbiBpZiB0aGUgYHJlZmxlY3RgIG9wdGlvbiBpcyBgdHJ1ZWAuXG4gICAqICAgIFN1YnNlcXVlbnQgY2hhbmdlcyB0byB0aGUgcHJvcGVydHkgd2lsbCByZWZsZWN0LCBldmVuIGlmIHRoZXkgYXJlIGVxdWFsIHRvIHRoZVxuICAgKiAgICAgZGVmYXVsdCB2YWx1ZS5cbiAgICogIC0gV2hlbiB0aGUgYXR0cmlidXRlIGlzIHJlbW92ZWQsIHRoZSBwcm9wZXJ0eSBpcyBzZXQgdG8gdGhlIGRlZmF1bHQgdmFsdWVcbiAgICogIC0gVGhlIGluaXRpYWwgdmFsdWUgd2lsbCBub3QgdHJpZ2dlciBhbiBvbGQgdmFsdWUgaW4gdGhlIGBjaGFuZ2VkUHJvcGVydGllc2AgbWFwXG4gICAqICAgIGFyZ3VtZW50IHRvIHVwZGF0ZSBsaWZlY3ljbGUgbWV0aG9kcy5cbiAgICpcbiAgICogV2hlbiBzZXQsIHByb3BlcnRpZXMgbXVzdCBiZSBpbml0aWFsaXplZCwgZWl0aGVyIHdpdGggYSBmaWVsZCBpbml0aWFsaXplciwgb3IgYW5cbiAgICogYXNzaWdubWVudCBpbiB0aGUgY29uc3RydWN0b3IuIE5vdCBpbml0aWFsaXppbmcgdGhlIHByb3BlcnR5IG1heSBsZWFkIHRvXG4gICAqIGltcHJvcGVyIGhhbmRsaW5nIG9mIHN1YnNlcXVlbnQgcHJvcGVydHkgYXNzaWdubWVudHMuXG4gICAqXG4gICAqIFdoaWxlIHRoaXMgYmVoYXZpb3IgaXMgb3B0LWluLCBtb3N0IHByb3BlcnRpZXMgdGhhdCByZWZsZWN0IHRvIGF0dHJpYnV0ZXMgc2hvdWxkXG4gICAqIHVzZSBgdXNlRGVmYXVsdDogdHJ1ZWAgc28gdGhhdCB0aGVpciBpbml0aWFsIHZhbHVlcyBkbyBub3QgcmVmbGVjdC5cbiAgICovXG4gIHVzZURlZmF1bHQ/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIE1hcCBvZiBwcm9wZXJ0aWVzIHRvIFByb3BlcnR5RGVjbGFyYXRpb24gb3B0aW9ucy4gRm9yIGVhY2ggcHJvcGVydHkgYW5cbiAqIGFjY2Vzc29yIGlzIG1hZGUsIGFuZCB0aGUgcHJvcGVydHkgaXMgcHJvY2Vzc2VkIGFjY29yZGluZyB0byB0aGVcbiAqIFByb3BlcnR5RGVjbGFyYXRpb24gb3B0aW9ucy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcm9wZXJ0eURlY2xhcmF0aW9ucyB7XG4gIHJlYWRvbmx5IFtrZXk6IHN0cmluZ106IFByb3BlcnR5RGVjbGFyYXRpb247XG59XG5cbnR5cGUgUHJvcGVydHlEZWNsYXJhdGlvbk1hcCA9IE1hcDxQcm9wZXJ0eUtleSwgUHJvcGVydHlEZWNsYXJhdGlvbj47XG5cbnR5cGUgQXR0cmlidXRlTWFwID0gTWFwPHN0cmluZywgUHJvcGVydHlLZXk+O1xuXG4vKipcbiAqIEEgTWFwIG9mIHByb3BlcnR5IGtleXMgdG8gdmFsdWVzLlxuICpcbiAqIFRha2VzIGFuIG9wdGlvbmFsIHR5cGUgcGFyYW1ldGVyIFQsIHdoaWNoIHdoZW4gc3BlY2lmaWVkIGFzIGEgbm9uLWFueSxcbiAqIG5vbi11bmtub3duIHR5cGUsIHdpbGwgbWFrZSB0aGUgTWFwIG1vcmUgc3Ryb25nbHktdHlwZWQsIGFzc29jaWF0aW5nIHRoZSBtYXBcbiAqIGtleXMgd2l0aCB0aGVpciBjb3JyZXNwb25kaW5nIHZhbHVlIHR5cGUgb24gVC5cbiAqXG4gKiBVc2UgYFByb3BlcnR5VmFsdWVzPHRoaXM+YCB3aGVuIG92ZXJyaWRpbmcgUmVhY3RpdmVFbGVtZW50LnVwZGF0ZSgpIGFuZFxuICogb3RoZXIgbGlmZWN5Y2xlIG1ldGhvZHMgaW4gb3JkZXIgdG8gZ2V0IHN0cm9uZ2VyIHR5cGUtY2hlY2tpbmcgb24ga2V5c1xuICogYW5kIHZhbHVlcy5cbiAqL1xuLy8gVGhpcyB0eXBlIGlzIGNvbmRpdGlvbmFsIHNvIHRoYXQgaWYgdGhlIHBhcmFtZXRlciBUIGlzIG5vdCBzcGVjaWZpZWQsIG9yXG4vLyBpcyBgYW55YCwgdGhlIHR5cGUgd2lsbCBpbmNsdWRlIGBNYXA8UHJvcGVydHlLZXksIHVua25vd24+YC4gU2luY2UgVCBpcyBub3Rcbi8vIGdpdmVuIGluIHRoZSB1c2VzIG9mIFByb3BlcnR5VmFsdWVzIGluIHRoaXMgZmlsZSwgYWxsIHVzZXMgaGVyZSBmYWxsYmFjayB0b1xuLy8gbWVhbmluZyBgTWFwPFByb3BlcnR5S2V5LCB1bmtub3duPmAsIGJ1dCBpZiBhIGRldmVsb3BlciB1c2VzXG4vLyBgUHJvcGVydHlWYWx1ZXM8dGhpcz5gIChvciBhbnkgb3RoZXIgdmFsdWUgZm9yIFQpIHRoZXkgd2lsbCBnZXQgYVxuLy8gc3Ryb25nbHktdHlwZWQgTWFwIHR5cGUuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IHR5cGUgUHJvcGVydHlWYWx1ZXM8VCA9IGFueT4gPSBUIGV4dGVuZHMgb2JqZWN0XG4gID8gUHJvcGVydHlWYWx1ZU1hcDxUPlxuICA6IE1hcDxQcm9wZXJ0eUtleSwgdW5rbm93bj47XG5cbi8qKlxuICogRG8gbm90IHVzZSwgaW5zdGVhZCBwcmVmZXIge0BsaW5rY29kZSBQcm9wZXJ0eVZhbHVlc30uXG4gKi9cbi8vIFRoaXMgdHlwZSBtdXN0IGJlIGV4cG9ydGVkIHN1Y2ggdGhhdCBKYXZhU2NyaXB0IGdlbmVyYXRlZCBieSB0aGUgR29vZ2xlXG4vLyBDbG9zdXJlIENvbXBpbGVyIGNhbiBpbXBvcnQgYSB0eXBlIHJlZmVyZW5jZS5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlWYWx1ZU1hcDxUPiBleHRlbmRzIE1hcDxQcm9wZXJ0eUtleSwgdW5rbm93bj4ge1xuICBnZXQ8SyBleHRlbmRzIGtleW9mIFQ+KGs6IEspOiBUW0tdIHwgdW5kZWZpbmVkO1xuICBzZXQ8SyBleHRlbmRzIGtleW9mIFQ+KGtleTogSywgdmFsdWU6IFRbS10pOiB0aGlzO1xuICBoYXM8SyBleHRlbmRzIGtleW9mIFQ+KGs6IEspOiBib29sZWFuO1xuICBkZWxldGU8SyBleHRlbmRzIGtleW9mIFQ+KGs6IEspOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdENvbnZlcnRlcjogQ29tcGxleEF0dHJpYnV0ZUNvbnZlcnRlciA9IHtcbiAgdG9BdHRyaWJ1dGUodmFsdWU6IHVua25vd24sIHR5cGU/OiB1bmtub3duKTogdW5rbm93biB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEJvb2xlYW46XG4gICAgICAgIHZhbHVlID0gdmFsdWUgPyBlbXB0eVN0cmluZ0ZvckJvb2xlYW5BdHRyaWJ1dGUgOiBudWxsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgT2JqZWN0OlxuICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIGBudWxsYCBvciBgdW5kZWZpbmVkYCBwYXNzIHRoaXMgdGhyb3VnaFxuICAgICAgICAvLyB0byBhbGxvdyByZW1vdmluZy9ubyBjaGFuZ2UgYmVoYXZpb3IuXG4gICAgICAgIHZhbHVlID0gdmFsdWUgPT0gbnVsbCA/IHZhbHVlIDogSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIGZyb21BdHRyaWJ1dGUodmFsdWU6IHN0cmluZyB8IG51bGwsIHR5cGU/OiB1bmtub3duKSB7XG4gICAgbGV0IGZyb21WYWx1ZTogdW5rbm93biA9IHZhbHVlO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBCb29sZWFuOlxuICAgICAgICBmcm9tVmFsdWUgPSB2YWx1ZSAhPT0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE51bWJlcjpcbiAgICAgICAgZnJvbVZhbHVlID0gdmFsdWUgPT09IG51bGwgPyBudWxsIDogTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE9iamVjdDpcbiAgICAgIGNhc2UgQXJyYXk6XG4gICAgICAgIC8vIERvICpub3QqIGdlbmVyYXRlIGV4Y2VwdGlvbiB3aGVuIGludmFsaWQgSlNPTiBpcyBzZXQgYXMgZWxlbWVudHNcbiAgICAgICAgLy8gZG9uJ3Qgbm9ybWFsbHkgY29tcGxhaW4gb24gYmVpbmcgbWlzLWNvbmZpZ3VyZWQuXG4gICAgICAgIC8vIFRPRE8oc29ydmVsbCk6IERvIGdlbmVyYXRlIGV4Y2VwdGlvbiBpbiAqZGV2IG1vZGUqLlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIEFzc2VydCB0byBhZGhlcmUgdG8gQmF6ZWwncyBcIm11c3QgdHlwZSBhc3NlcnQgSlNPTiBwYXJzZVwiIHJ1bGUuXG4gICAgICAgICAgZnJvbVZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSEpIGFzIHVua25vd247XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBmcm9tVmFsdWUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gZnJvbVZhbHVlO1xuICB9LFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBIYXNDaGFuZ2VkIHtcbiAgKHZhbHVlOiB1bmtub3duLCBvbGQ6IHVua25vd24pOiBib29sZWFuO1xufVxuXG4vKipcbiAqIENoYW5nZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIGRpZmZlcmVudCBmcm9tIGBvbGRWYWx1ZWAuXG4gKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGFzIHRoZSBkZWZhdWx0IGZvciBhIHByb3BlcnR5J3MgYGhhc0NoYW5nZWRgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3Qgbm90RXF1YWw6IEhhc0NoYW5nZWQgPSAodmFsdWU6IHVua25vd24sIG9sZDogdW5rbm93bik6IGJvb2xlYW4gPT5cbiAgIWlzKHZhbHVlLCBvbGQpO1xuXG5jb25zdCBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvbjogUHJvcGVydHlEZWNsYXJhdGlvbiA9IHtcbiAgYXR0cmlidXRlOiB0cnVlLFxuICB0eXBlOiBTdHJpbmcsXG4gIGNvbnZlcnRlcjogZGVmYXVsdENvbnZlcnRlcixcbiAgcmVmbGVjdDogZmFsc2UsXG4gIHVzZURlZmF1bHQ6IGZhbHNlLFxuICBoYXNDaGFuZ2VkOiBub3RFcXVhbCxcbn07XG5cbi8qKlxuICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIG9uZSBvZiB0aGUgc3VwcG9ydGVkIGRldiBtb2RlIHdhcm5pbmcgY2F0ZWdvcmllcy5cbiAqL1xuZXhwb3J0IHR5cGUgV2FybmluZ0tpbmQgPVxuICB8ICdjaGFuZ2UtaW4tdXBkYXRlJ1xuICB8ICdtaWdyYXRpb24nXG4gIHwgJ2FzeW5jLXBlcmZvcm0tdXBkYXRlJztcblxuZXhwb3J0IHR5cGUgSW5pdGlhbGl6ZXIgPSAoZWxlbWVudDogUmVhY3RpdmVFbGVtZW50KSA9PiB2b2lkO1xuXG4vLyBUZW1wb3JhcnksIHVudGlsIGdvb2dsZTMgaXMgb24gVHlwZVNjcmlwdCA1LjJcbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFN5bWJvbENvbnN0cnVjdG9yIHtcbiAgICByZWFkb25seSBtZXRhZGF0YTogdW5pcXVlIHN5bWJvbDtcbiAgfVxufVxuXG4vLyBFbnN1cmUgbWV0YWRhdGEgaXMgZW5hYmxlZC4gVHlwZVNjcmlwdCBkb2VzIG5vdCBwb2x5ZmlsbFxuLy8gU3ltYm9sLm1ldGFkYXRhLCBzbyB3ZSBtdXN0IGVuc3VyZSB0aGF0IGl0IGV4aXN0cy5cbihTeW1ib2wgYXMge21ldGFkYXRhOiBzeW1ib2x9KS5tZXRhZGF0YSA/Pz0gU3ltYm9sKCdtZXRhZGF0YScpO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8vIFRoaXMgaXMgcHVibGljIGdsb2JhbCBBUEksIGRvIG5vdCBjaGFuZ2UhXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby12YXJcbiAgdmFyIGxpdFByb3BlcnR5TWV0YWRhdGE6IFdlYWtNYXA8XG4gICAgb2JqZWN0LFxuICAgIE1hcDxQcm9wZXJ0eUtleSwgUHJvcGVydHlEZWNsYXJhdGlvbj5cbiAgPjtcbn1cblxuLy8gTWFwIGZyb20gYSBjbGFzcydzIG1ldGFkYXRhIG9iamVjdCB0byBwcm9wZXJ0eSBvcHRpb25zXG4vLyBOb3RlIHRoYXQgd2UgbXVzdCB1c2UgbnVsbGlzaC1jb2FsZXNjaW5nIGFzc2lnbm1lbnQgc28gdGhhdCB3ZSBvbmx5IHVzZSBvbmVcbi8vIG1hcCBldmVuIGlmIHdlIGxvYWQgbXVsdGlwbGUgdmVyc2lvbiBvZiB0aGlzIG1vZHVsZS5cbmdsb2JhbC5saXRQcm9wZXJ0eU1ldGFkYXRhID8/PSBuZXcgV2Vha01hcDxcbiAgb2JqZWN0LFxuICBNYXA8UHJvcGVydHlLZXksIFByb3BlcnR5RGVjbGFyYXRpb24+XG4+KCk7XG5cbi8qKlxuICogQmFzZSBlbGVtZW50IGNsYXNzIHdoaWNoIG1hbmFnZXMgZWxlbWVudCBwcm9wZXJ0aWVzIGFuZCBhdHRyaWJ1dGVzLiBXaGVuXG4gKiBwcm9wZXJ0aWVzIGNoYW5nZSwgdGhlIGB1cGRhdGVgIG1ldGhvZCBpcyBhc3luY2hyb25vdXNseSBjYWxsZWQuIFRoaXMgbWV0aG9kXG4gKiBzaG91bGQgYmUgc3VwcGxpZWQgYnkgc3ViY2xhc3NlcyB0byByZW5kZXIgdXBkYXRlcyBhcyBkZXNpcmVkLlxuICogQG5vSW5oZXJpdERvY1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVhY3RpdmVFbGVtZW50XG4gIC8vIEluIHRoZSBOb2RlIGJ1aWxkLCB0aGlzIGBleHRlbmRzYCBjbGF1c2Ugd2lsbCBiZSBzdWJzdGl0dXRlZCB3aXRoXG4gIC8vIGAoZ2xvYmFsVGhpcy5IVE1MRWxlbWVudCA/PyBIVE1MRWxlbWVudClgLlxuICAvL1xuICAvLyBUaGlzIHdheSwgd2Ugd2lsbCBmaXJzdCBwcmVmZXIgYW55IGdsb2JhbCBgSFRNTEVsZW1lbnRgIHBvbHlmaWxsIHRoYXQgdGhlXG4gIC8vIHVzZXIgaGFzIGFzc2lnbmVkLCBhbmQgdGhlbiBmYWxsIGJhY2sgdG8gdGhlIGBIVE1MRWxlbWVudGAgc2hpbSB3aGljaCBoYXNcbiAgLy8gYmVlbiBpbXBvcnRlZCAoc2VlIG5vdGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUgYWJvdXQgaG93IHRoaXMgaW1wb3J0IGlzXG4gIC8vIGdlbmVyYXRlZCBieSBSb2xsdXApLiBOb3RlIHRoYXQgdGhlIGBIVE1MRWxlbWVudGAgdmFyaWFibGUgaGFzIGJlZW5cbiAgLy8gc2hhZG93ZWQgYnkgdGhpcyBpbXBvcnQsIHNvIGl0IG5vIGxvbmdlciByZWZlcnMgdG8gdGhlIGdsb2JhbC5cbiAgZXh0ZW5kcyBIVE1MRWxlbWVudFxuICBpbXBsZW1lbnRzIFJlYWN0aXZlQ29udHJvbGxlckhvc3RcbntcbiAgLy8gTm90ZTogdGhlc2UgYXJlIHBhdGNoZWQgaW4gb25seSBpbiBERVZfTU9ERS5cbiAgLyoqXG4gICAqIFJlYWQgb3Igc2V0IGFsbCB0aGUgZW5hYmxlZCB3YXJuaW5nIGNhdGVnb3JpZXMgZm9yIHRoaXMgY2xhc3MuXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgb25seSB1c2VkIGluIGRldmVsb3BtZW50IGJ1aWxkcy5cbiAgICpcbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IGRldi1tb2RlXG4gICAqL1xuICBzdGF0aWMgZW5hYmxlZFdhcm5pbmdzPzogV2FybmluZ0tpbmRbXTtcblxuICAvKipcbiAgICogRW5hYmxlIHRoZSBnaXZlbiB3YXJuaW5nIGNhdGVnb3J5IGZvciB0aGlzIGNsYXNzLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBvbmx5IGV4aXN0cyBpbiBkZXZlbG9wbWVudCBidWlsZHMsIHNvIGl0IHNob3VsZCBiZSBhY2Nlc3NlZFxuICAgKiB3aXRoIGEgZ3VhcmQgbGlrZTpcbiAgICpcbiAgICogYGBgdHNcbiAgICogLy8gRW5hYmxlIGZvciBhbGwgUmVhY3RpdmVFbGVtZW50IHN1YmNsYXNzZXNcbiAgICogUmVhY3RpdmVFbGVtZW50LmVuYWJsZVdhcm5pbmc/LignbWlncmF0aW9uJyk7XG4gICAqXG4gICAqIC8vIEVuYWJsZSBmb3Igb25seSBNeUVsZW1lbnQgYW5kIHN1YmNsYXNzZXNcbiAgICogTXlFbGVtZW50LmVuYWJsZVdhcm5pbmc/LignbWlncmF0aW9uJyk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKiBAY2F0ZWdvcnkgZGV2LW1vZGVcbiAgICovXG4gIHN0YXRpYyBlbmFibGVXYXJuaW5nPzogKHdhcm5pbmdLaW5kOiBXYXJuaW5nS2luZCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogRGlzYWJsZSB0aGUgZ2l2ZW4gd2FybmluZyBjYXRlZ29yeSBmb3IgdGhpcyBjbGFzcy5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgb25seSBleGlzdHMgaW4gZGV2ZWxvcG1lbnQgYnVpbGRzLCBzbyBpdCBzaG91bGQgYmUgYWNjZXNzZWRcbiAgICogd2l0aCBhIGd1YXJkIGxpa2U6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIC8vIERpc2FibGUgZm9yIGFsbCBSZWFjdGl2ZUVsZW1lbnQgc3ViY2xhc3Nlc1xuICAgKiBSZWFjdGl2ZUVsZW1lbnQuZGlzYWJsZVdhcm5pbmc/LignbWlncmF0aW9uJyk7XG4gICAqXG4gICAqIC8vIERpc2FibGUgZm9yIG9ubHkgTXlFbGVtZW50IGFuZCBzdWJjbGFzc2VzXG4gICAqIE15RWxlbWVudC5kaXNhYmxlV2FybmluZz8uKCdtaWdyYXRpb24nKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEBub2NvbGxhcHNlXG4gICAqIEBjYXRlZ29yeSBkZXYtbW9kZVxuICAgKi9cbiAgc3RhdGljIGRpc2FibGVXYXJuaW5nPzogKHdhcm5pbmdLaW5kOiBXYXJuaW5nS2luZCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogQWRkcyBhbiBpbml0aWFsaXplciBmdW5jdGlvbiB0byB0aGUgY2xhc3MgdGhhdCBpcyBjYWxsZWQgZHVyaW5nIGluc3RhbmNlXG4gICAqIGNvbnN0cnVjdGlvbi5cbiAgICpcbiAgICogVGhpcyBpcyB1c2VmdWwgZm9yIGNvZGUgdGhhdCBydW5zIGFnYWluc3QgYSBgUmVhY3RpdmVFbGVtZW50YFxuICAgKiBzdWJjbGFzcywgc3VjaCBhcyBhIGRlY29yYXRvciwgdGhhdCBuZWVkcyB0byBkbyB3b3JrIGZvciBlYWNoXG4gICAqIGluc3RhbmNlLCBzdWNoIGFzIHNldHRpbmcgdXAgYSBgUmVhY3RpdmVDb250cm9sbGVyYC5cbiAgICpcbiAgICogYGBgdHNcbiAgICogY29uc3QgbXlEZWNvcmF0b3IgPSAodGFyZ2V0OiB0eXBlb2YgUmVhY3RpdmVFbGVtZW50LCBrZXk6IHN0cmluZykgPT4ge1xuICAgKiAgIHRhcmdldC5hZGRJbml0aWFsaXplcigoaW5zdGFuY2U6IFJlYWN0aXZlRWxlbWVudCkgPT4ge1xuICAgKiAgICAgLy8gVGhpcyBpcyBydW4gZHVyaW5nIGNvbnN0cnVjdGlvbiBvZiB0aGUgZWxlbWVudFxuICAgKiAgICAgbmV3IE15Q29udHJvbGxlcihpbnN0YW5jZSk7XG4gICAqICAgfSk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIERlY29yYXRpbmcgYSBmaWVsZCB3aWxsIHRoZW4gY2F1c2UgZWFjaCBpbnN0YW5jZSB0byBydW4gYW4gaW5pdGlhbGl6ZXJcbiAgICogdGhhdCBhZGRzIGEgY29udHJvbGxlcjpcbiAgICpcbiAgICogYGBgdHNcbiAgICogY2xhc3MgTXlFbGVtZW50IGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gICAqICAgQG15RGVjb3JhdG9yIGZvbztcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogSW5pdGlhbGl6ZXJzIGFyZSBzdG9yZWQgcGVyLWNvbnN0cnVjdG9yLiBBZGRpbmcgYW4gaW5pdGlhbGl6ZXIgdG8gYVxuICAgKiBzdWJjbGFzcyBkb2VzIG5vdCBhZGQgaXQgdG8gYSBzdXBlcmNsYXNzLiBTaW5jZSBpbml0aWFsaXplcnMgYXJlIHJ1biBpblxuICAgKiBjb25zdHJ1Y3RvcnMsIGluaXRpYWxpemVycyB3aWxsIHJ1biBpbiBvcmRlciBvZiB0aGUgY2xhc3MgaGllcmFyY2h5LFxuICAgKiBzdGFydGluZyB3aXRoIHN1cGVyY2xhc3NlcyBhbmQgcHJvZ3Jlc3NpbmcgdG8gdGhlIGluc3RhbmNlJ3MgY2xhc3MuXG4gICAqXG4gICAqIEBub2NvbGxhcHNlXG4gICAqL1xuICBzdGF0aWMgYWRkSW5pdGlhbGl6ZXIoaW5pdGlhbGl6ZXI6IEluaXRpYWxpemVyKSB7XG4gICAgdGhpcy5fX3ByZXBhcmUoKTtcbiAgICAodGhpcy5faW5pdGlhbGl6ZXJzID8/PSBbXSkucHVzaChpbml0aWFsaXplcik7XG4gIH1cblxuICBzdGF0aWMgX2luaXRpYWxpemVycz86IEluaXRpYWxpemVyW107XG5cbiAgLypcbiAgICogRHVlIHRvIGNsb3N1cmUgY29tcGlsZXIgRVM2IGNvbXBpbGF0aW9uIGJ1Z3MsIEBub2NvbGxhcHNlIGlzIHJlcXVpcmVkIG9uXG4gICAqIGFsbCBzdGF0aWMgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB3aXRoIGluaXRpYWxpemVycy4gIFJlZmVyZW5jZTpcbiAgICogLSBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL2Nsb3N1cmUtY29tcGlsZXIvaXNzdWVzLzE3NzZcbiAgICovXG5cbiAgLyoqXG4gICAqIE1hcHMgYXR0cmlidXRlIG5hbWVzIHRvIHByb3BlcnRpZXM7IGZvciBleGFtcGxlIGBmb29iYXJgIGF0dHJpYnV0ZSB0b1xuICAgKiBgZm9vQmFyYCBwcm9wZXJ0eS4gQ3JlYXRlZCBsYXppbHkgb24gdXNlciBzdWJjbGFzc2VzIHdoZW4gZmluYWxpemluZyB0aGVcbiAgICogY2xhc3MuXG4gICAqIEBub2NvbGxhcHNlXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBfX2F0dHJpYnV0ZVRvUHJvcGVydHlNYXA6IEF0dHJpYnV0ZU1hcDtcblxuICAvKipcbiAgICogTWFya3MgY2xhc3MgYXMgaGF2aW5nIGJlZW4gZmluYWxpemVkLCB3aGljaCBpbmNsdWRlcyBjcmVhdGluZyBwcm9wZXJ0aWVzXG4gICAqIGZyb20gYHN0YXRpYyBwcm9wZXJ0aWVzYCwgYnV0IGRvZXMgKm5vdCogaW5jbHVkZSBhbGwgcHJvcGVydGllcyBjcmVhdGVkXG4gICAqIGZyb20gZGVjb3JhdG9ycy5cbiAgICogQG5vY29sbGFwc2VcbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgZmluYWxpemVkOiB0cnVlIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBNZW1vaXplZCBsaXN0IG9mIGFsbCBlbGVtZW50IHByb3BlcnRpZXMsIGluY2x1ZGluZyBhbnkgc3VwZXJjbGFzc1xuICAgKiBwcm9wZXJ0aWVzLiBDcmVhdGVkIGxhemlseSBvbiB1c2VyIHN1YmNsYXNzZXMgd2hlbiBmaW5hbGl6aW5nIHRoZSBjbGFzcy5cbiAgICpcbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHByb3BlcnRpZXNcbiAgICovXG4gIHN0YXRpYyBlbGVtZW50UHJvcGVydGllczogUHJvcGVydHlEZWNsYXJhdGlvbk1hcDtcblxuICAvKipcbiAgICogVXNlci1zdXBwbGllZCBvYmplY3QgdGhhdCBtYXBzIHByb3BlcnR5IG5hbWVzIHRvIGBQcm9wZXJ0eURlY2xhcmF0aW9uYFxuICAgKiBvYmplY3RzIGNvbnRhaW5pbmcgb3B0aW9ucyBmb3IgY29uZmlndXJpbmcgcmVhY3RpdmUgcHJvcGVydGllcy4gV2hlblxuICAgKiBhIHJlYWN0aXZlIHByb3BlcnR5IGlzIHNldCB0aGUgZWxlbWVudCB3aWxsIHVwZGF0ZSBhbmQgcmVuZGVyLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0IHByb3BlcnRpZXMgYXJlIHB1YmxpYyBmaWVsZHMsIGFuZCBhcyBzdWNoLCB0aGV5IHNob3VsZCBiZVxuICAgKiBjb25zaWRlcmVkIGFzIHByaW1hcmlseSBzZXR0YWJsZSBieSBlbGVtZW50IHVzZXJzLCBlaXRoZXIgdmlhIGF0dHJpYnV0ZSBvclxuICAgKiB0aGUgcHJvcGVydHkgaXRzZWxmLlxuICAgKlxuICAgKiBHZW5lcmFsbHksIHByb3BlcnRpZXMgdGhhdCBhcmUgY2hhbmdlZCBieSB0aGUgZWxlbWVudCBzaG91bGQgYmUgcHJpdmF0ZSBvclxuICAgKiBwcm90ZWN0ZWQgZmllbGRzIGFuZCBzaG91bGQgdXNlIHRoZSBgc3RhdGU6IHRydWVgIG9wdGlvbi4gUHJvcGVydGllc1xuICAgKiBtYXJrZWQgYXMgYHN0YXRlYCBkbyBub3QgcmVmbGVjdCBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIGF0dHJpYnV0ZVxuICAgKlxuICAgKiBIb3dldmVyLCBzb21ldGltZXMgZWxlbWVudCBjb2RlIGRvZXMgbmVlZCB0byBzZXQgYSBwdWJsaWMgcHJvcGVydHkuIFRoaXNcbiAgICogc2hvdWxkIHR5cGljYWxseSBvbmx5IGJlIGRvbmUgaW4gcmVzcG9uc2UgdG8gdXNlciBpbnRlcmFjdGlvbiwgYW5kIGFuIGV2ZW50XG4gICAqIHNob3VsZCBiZSBmaXJlZCBpbmZvcm1pbmcgdGhlIHVzZXI7IGZvciBleGFtcGxlLCBhIGNoZWNrYm94IHNldHMgaXRzXG4gICAqIGBjaGVja2VkYCBwcm9wZXJ0eSB3aGVuIGNsaWNrZWQgYW5kIGZpcmVzIGEgYGNoYW5nZWRgIGV2ZW50LiBNdXRhdGluZ1xuICAgKiBwdWJsaWMgcHJvcGVydGllcyBzaG91bGQgdHlwaWNhbGx5IG5vdCBiZSBkb25lIGZvciBub24tcHJpbWl0aXZlIChvYmplY3Qgb3JcbiAgICogYXJyYXkpIHByb3BlcnRpZXMuIEluIG90aGVyIGNhc2VzIHdoZW4gYW4gZWxlbWVudCBuZWVkcyB0byBtYW5hZ2Ugc3RhdGUsIGFcbiAgICogcHJpdmF0ZSBwcm9wZXJ0eSBzZXQgd2l0aCB0aGUgYHN0YXRlOiB0cnVlYCBvcHRpb24gc2hvdWxkIGJlIHVzZWQuIFdoZW5cbiAgICogbmVlZGVkLCBzdGF0ZSBwcm9wZXJ0aWVzIGNhbiBiZSBpbml0aWFsaXplZCB2aWEgcHVibGljIHByb3BlcnRpZXMgdG9cbiAgICogZmFjaWxpdGF0ZSBjb21wbGV4IGludGVyYWN0aW9ucy5cbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHByb3BlcnRpZXNcbiAgICovXG4gIHN0YXRpYyBwcm9wZXJ0aWVzOiBQcm9wZXJ0eURlY2xhcmF0aW9ucztcblxuICAvKipcbiAgICogTWVtb2l6ZWQgbGlzdCBvZiBhbGwgZWxlbWVudCBzdHlsZXMuXG4gICAqIENyZWF0ZWQgbGF6aWx5IG9uIHVzZXIgc3ViY2xhc3NlcyB3aGVuIGZpbmFsaXppbmcgdGhlIGNsYXNzLlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKiBAY2F0ZWdvcnkgc3R5bGVzXG4gICAqL1xuICBzdGF0aWMgZWxlbWVudFN0eWxlczogQXJyYXk8Q1NTUmVzdWx0T3JOYXRpdmU+ID0gW107XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIHN0eWxlcyB0byBhcHBseSB0byB0aGUgZWxlbWVudC4gVGhlIHN0eWxlcyBzaG91bGQgYmUgZGVmaW5lZFxuICAgKiB1c2luZyB0aGUge0BsaW5rY29kZSBjc3N9IHRhZyBmdW5jdGlvbiwgdmlhIGNvbnN0cnVjdGlibGUgc3R5bGVzaGVldHMsIG9yXG4gICAqIGltcG9ydGVkIGZyb20gbmF0aXZlIENTUyBtb2R1bGUgc2NyaXB0cy5cbiAgICpcbiAgICogTm90ZSBvbiBDb250ZW50IFNlY3VyaXR5IFBvbGljeTpcbiAgICpcbiAgICogRWxlbWVudCBzdHlsZXMgYXJlIGltcGxlbWVudGVkIHdpdGggYDxzdHlsZT5gIHRhZ3Mgd2hlbiB0aGUgYnJvd3NlciBkb2Vzbid0XG4gICAqIHN1cHBvcnQgYWRvcHRlZCBTdHlsZVNoZWV0cy4gVG8gdXNlIHN1Y2ggYDxzdHlsZT5gIHRhZ3Mgd2l0aCB0aGUgc3R5bGUtc3JjXG4gICAqIENTUCBkaXJlY3RpdmUsIHRoZSBzdHlsZS1zcmMgdmFsdWUgbXVzdCBlaXRoZXIgaW5jbHVkZSAndW5zYWZlLWlubGluZScgb3JcbiAgICogYG5vbmNlLTxiYXNlNjQtdmFsdWU+YCB3aXRoIGA8YmFzZTY0LXZhbHVlPmAgcmVwbGFjZWQgYmUgYSBzZXJ2ZXItZ2VuZXJhdGVkXG4gICAqIG5vbmNlLlxuICAgKlxuICAgKiBUbyBwcm92aWRlIGEgbm9uY2UgdG8gdXNlIG9uIGdlbmVyYXRlZCBgPHN0eWxlPmAgZWxlbWVudHMsIHNldFxuICAgKiBgd2luZG93LmxpdE5vbmNlYCB0byBhIHNlcnZlci1nZW5lcmF0ZWQgbm9uY2UgaW4geW91ciBwYWdlJ3MgSFRNTCwgYmVmb3JlXG4gICAqIGxvYWRpbmcgYXBwbGljYXRpb24gY29kZTpcbiAgICpcbiAgICogYGBgaHRtbFxuICAgKiA8c2NyaXB0PlxuICAgKiAgIC8vIEdlbmVyYXRlZCBhbmQgdW5pcXVlIHBlciByZXF1ZXN0OlxuICAgKiAgIHdpbmRvdy5saXROb25jZSA9ICdhMWIyYzNkNCc7XG4gICAqIDwvc2NyaXB0PlxuICAgKiBgYGBcbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHN0eWxlc1xuICAgKi9cbiAgc3RhdGljIHN0eWxlcz86IENTU1Jlc3VsdEdyb3VwO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhdHRyaWJ1dGVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHJlZ2lzdGVyZWQgcHJvcGVydGllcy5cbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IGF0dHJpYnV0ZXNcbiAgICovXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIC8vIEVuc3VyZSB3ZSd2ZSBjcmVhdGVkIGFsbCBwcm9wZXJ0aWVzXG4gICAgdGhpcy5maW5hbGl6ZSgpO1xuICAgIC8vIHRoaXMuX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwIGlzIG9ubHkgdW5kZWZpbmVkIGFmdGVyIGZpbmFsaXplKCkgaW5cbiAgICAvLyBSZWFjdGl2ZUVsZW1lbnQgaXRzZWxmLiBSZWFjdGl2ZUVsZW1lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzIGlzIG9ubHlcbiAgICAvLyBhY2Nlc3NlZCB3aXRoIFJlYWN0aXZlRWxlbWVudCBhcyB0aGUgcmVjZWl2ZXIgd2hlbiBhIHN1YmNsYXNzIG9yIG1peGluXG4gICAgLy8gY2FsbHMgc3VwZXIub2JzZXJ2ZWRBdHRyaWJ1dGVzXG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwICYmIFsuLi50aGlzLl9fYXR0cmlidXRlVG9Qcm9wZXJ0eU1hcC5rZXlzKCldXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX19pbnN0YW5jZVByb3BlcnRpZXM/OiBQcm9wZXJ0eVZhbHVlcyA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHByb3BlcnR5IGFjY2Vzc29yIG9uIHRoZSBlbGVtZW50IHByb3RvdHlwZSBpZiBvbmUgZG9lcyBub3QgZXhpc3RcbiAgICogYW5kIHN0b3JlcyBhIHtAbGlua2NvZGUgUHJvcGVydHlEZWNsYXJhdGlvbn0gZm9yIHRoZSBwcm9wZXJ0eSB3aXRoIHRoZVxuICAgKiBnaXZlbiBvcHRpb25zLiBUaGUgcHJvcGVydHkgc2V0dGVyIGNhbGxzIHRoZSBwcm9wZXJ0eSdzIGBoYXNDaGFuZ2VkYFxuICAgKiBwcm9wZXJ0eSBvcHRpb24gb3IgdXNlcyBhIHN0cmljdCBpZGVudGl0eSBjaGVjayB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3RcbiAgICogdG8gcmVxdWVzdCBhbiB1cGRhdGUuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIG1heSBiZSBvdmVycmlkZGVuIHRvIGN1c3RvbWl6ZSBwcm9wZXJ0aWVzOyBob3dldmVyLFxuICAgKiB3aGVuIGRvaW5nIHNvLCBpdCdzIGltcG9ydGFudCB0byBjYWxsIGBzdXBlci5jcmVhdGVQcm9wZXJ0eWAgdG8gZW5zdXJlXG4gICAqIHRoZSBwcm9wZXJ0eSBpcyBzZXR1cCBjb3JyZWN0bHkuIFRoaXMgbWV0aG9kIGNhbGxzXG4gICAqIGBnZXRQcm9wZXJ0eURlc2NyaXB0b3JgIGludGVybmFsbHkgdG8gZ2V0IGEgZGVzY3JpcHRvciB0byBpbnN0YWxsLlxuICAgKiBUbyBjdXN0b21pemUgd2hhdCBwcm9wZXJ0aWVzIGRvIHdoZW4gdGhleSBhcmUgZ2V0IG9yIHNldCwgb3ZlcnJpZGVcbiAgICogYGdldFByb3BlcnR5RGVzY3JpcHRvcmAuIFRvIGN1c3RvbWl6ZSB0aGUgb3B0aW9ucyBmb3IgYSBwcm9wZXJ0eSxcbiAgICogaW1wbGVtZW50IGBjcmVhdGVQcm9wZXJ0eWAgbGlrZSB0aGlzOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBzdGF0aWMgY3JlYXRlUHJvcGVydHkobmFtZSwgb3B0aW9ucykge1xuICAgKiAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtteU9wdGlvbjogdHJ1ZX0pO1xuICAgKiAgIHN1cGVyLmNyZWF0ZVByb3BlcnR5KG5hbWUsIG9wdGlvbnMpO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKiBAY2F0ZWdvcnkgcHJvcGVydGllc1xuICAgKi9cbiAgc3RhdGljIGNyZWF0ZVByb3BlcnR5KFxuICAgIG5hbWU6IFByb3BlcnR5S2V5LFxuICAgIG9wdGlvbnM6IFByb3BlcnR5RGVjbGFyYXRpb24gPSBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvblxuICApIHtcbiAgICAvLyBJZiB0aGlzIGlzIGEgc3RhdGUgcHJvcGVydHksIGZvcmNlIHRoZSBhdHRyaWJ1dGUgdG8gZmFsc2UuXG4gICAgaWYgKG9wdGlvbnMuc3RhdGUpIHtcbiAgICAgIChvcHRpb25zIGFzIE11dGFibGU8UHJvcGVydHlEZWNsYXJhdGlvbiwgJ2F0dHJpYnV0ZSc+KS5hdHRyaWJ1dGUgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fX3ByZXBhcmUoKTtcbiAgICAvLyBXaGV0aGVyIHRoaXMgcHJvcGVydHkgaXMgd3JhcHBpbmcgYWNjZXNzb3JzLlxuICAgIC8vIEhlbHBzIGNvbnRyb2wgdGhlIGluaXRpYWwgdmFsdWUgY2hhbmdlIGFuZCByZWZsZWN0aW9uIGxvZ2ljLlxuICAgIGlmICh0aGlzLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgb3B0aW9ucyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyk7XG4gICAgICBvcHRpb25zLndyYXBwZWQgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLnNldChuYW1lLCBvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnMubm9BY2Nlc3Nvcikge1xuICAgICAgY29uc3Qga2V5ID0gREVWX01PREVcbiAgICAgICAgPyAvLyBVc2UgU3ltYm9sLmZvciBpbiBkZXYgbW9kZSB0byBtYWtlIGl0IGVhc2llciB0byBtYWludGFpbiBzdGF0ZVxuICAgICAgICAgIC8vIHdoZW4gZG9pbmcgSE1SLlxuICAgICAgICAgIFN5bWJvbC5mb3IoYCR7U3RyaW5nKG5hbWUpfSAoQHByb3BlcnR5KCkgY2FjaGUpYClcbiAgICAgICAgOiBTeW1ib2woKTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSB0aGlzLmdldFByb3BlcnR5RGVzY3JpcHRvcihuYW1lLCBrZXksIG9wdGlvbnMpO1xuICAgICAgaWYgKGRlc2NyaXB0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHRvIGJlIGRlZmluZWQgb24gdGhlIGdpdmVuIG5hbWVkIHByb3BlcnR5LlxuICAgKiBJZiBubyBkZXNjcmlwdG9yIGlzIHJldHVybmVkLCB0aGUgcHJvcGVydHkgd2lsbCBub3QgYmVjb21lIGFuIGFjY2Vzc29yLlxuICAgKiBGb3IgZXhhbXBsZSxcbiAgICpcbiAgICogYGBgdHNcbiAgICogY2xhc3MgTXlFbGVtZW50IGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gICAqICAgc3RhdGljIGdldFByb3BlcnR5RGVzY3JpcHRvcihuYW1lLCBrZXksIG9wdGlvbnMpIHtcbiAgICogICAgIGNvbnN0IGRlZmF1bHREZXNjcmlwdG9yID1cbiAgICogICAgICAgICBzdXBlci5nZXRQcm9wZXJ0eURlc2NyaXB0b3IobmFtZSwga2V5LCBvcHRpb25zKTtcbiAgICogICAgIGNvbnN0IHNldHRlciA9IGRlZmF1bHREZXNjcmlwdG9yLnNldDtcbiAgICogICAgIHJldHVybiB7XG4gICAqICAgICAgIGdldDogZGVmYXVsdERlc2NyaXB0b3IuZ2V0LFxuICAgKiAgICAgICBzZXQodmFsdWUpIHtcbiAgICogICAgICAgICBzZXR0ZXIuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAqICAgICAgICAgLy8gY3VzdG9tIGFjdGlvbi5cbiAgICogICAgICAgfSxcbiAgICogICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgKiAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKiBAY2F0ZWdvcnkgcHJvcGVydGllc1xuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBnZXRQcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgbmFtZTogUHJvcGVydHlLZXksXG4gICAga2V5OiBzdHJpbmcgfCBzeW1ib2wsXG4gICAgb3B0aW9uczogUHJvcGVydHlEZWNsYXJhdGlvblxuICApOiBQcm9wZXJ0eURlc2NyaXB0b3IgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHtnZXQsIHNldH0gPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcy5wcm90b3R5cGUsIG5hbWUpID8/IHtcbiAgICAgIGdldCh0aGlzOiBSZWFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5IGFzIGtleW9mIHR5cGVvZiB0aGlzXTtcbiAgICAgIH0sXG4gICAgICBzZXQodGhpczogUmVhY3RpdmVFbGVtZW50LCB2OiB1bmtub3duKSB7XG4gICAgICAgICh0aGlzIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZyB8IHN5bWJvbCwgdW5rbm93bj4pW2tleV0gPSB2O1xuICAgICAgfSxcbiAgICB9O1xuICAgIGlmIChERVZfTU9ERSAmJiBnZXQgPT0gbnVsbCkge1xuICAgICAgaWYgKCd2YWx1ZScgaW4gKGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLnByb3RvdHlwZSwgbmFtZSkgPz8ge30pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgRmllbGQgJHtKU09OLnN0cmluZ2lmeShTdHJpbmcobmFtZSkpfSBvbiBgICtcbiAgICAgICAgICAgIGAke3RoaXMubmFtZX0gd2FzIGRlY2xhcmVkIGFzIGEgcmVhY3RpdmUgcHJvcGVydHkgYCArXG4gICAgICAgICAgICBgYnV0IGl0J3MgYWN0dWFsbHkgZGVjbGFyZWQgYXMgYSB2YWx1ZSBvbiB0aGUgcHJvdG90eXBlLiBgICtcbiAgICAgICAgICAgIGBVc3VhbGx5IHRoaXMgaXMgZHVlIHRvIHVzaW5nIEBwcm9wZXJ0eSBvciBAc3RhdGUgb24gYSBtZXRob2QuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaXNzdWVXYXJuaW5nKFxuICAgICAgICAncmVhY3RpdmUtcHJvcGVydHktd2l0aG91dC1nZXR0ZXInLFxuICAgICAgICBgRmllbGQgJHtKU09OLnN0cmluZ2lmeShTdHJpbmcobmFtZSkpfSBvbiBgICtcbiAgICAgICAgICBgJHt0aGlzLm5hbWV9IHdhcyBkZWNsYXJlZCBhcyBhIHJlYWN0aXZlIHByb3BlcnR5IGAgK1xuICAgICAgICAgIGBidXQgaXQgZG9lcyBub3QgaGF2ZSBhIGdldHRlci4gVGhpcyB3aWxsIGJlIGFuIGVycm9yIGluIGEgYCArXG4gICAgICAgICAgYGZ1dHVyZSB2ZXJzaW9uIG9mIExpdC5gXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZ2V0LFxuICAgICAgc2V0KHRoaXM6IFJlYWN0aXZlRWxlbWVudCwgdmFsdWU6IHVua25vd24pIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBnZXQ/LmNhbGwodGhpcyk7XG4gICAgICAgIHNldD8uY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMucmVxdWVzdFVwZGF0ZShuYW1lLCBvbGRWYWx1ZSwgb3B0aW9ucyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHByb3BlcnR5IG9wdGlvbnMgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAgICogVGhlc2Ugb3B0aW9ucyBhcmUgZGVmaW5lZCB3aXRoIGEgYFByb3BlcnR5RGVjbGFyYXRpb25gIHZpYSB0aGUgYHByb3BlcnRpZXNgXG4gICAqIG9iamVjdCBvciB0aGUgYEBwcm9wZXJ0eWAgZGVjb3JhdG9yIGFuZCBhcmUgcmVnaXN0ZXJlZCBpblxuICAgKiBgY3JlYXRlUHJvcGVydHkoLi4uKWAuXG4gICAqXG4gICAqIE5vdGUsIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBjb25zaWRlcmVkIFwiZmluYWxcIiBhbmQgbm90IG92ZXJyaWRkZW4uIFRvXG4gICAqIGN1c3RvbWl6ZSB0aGUgb3B0aW9ucyBmb3IgYSBnaXZlbiBwcm9wZXJ0eSwgb3ZlcnJpZGVcbiAgICoge0BsaW5rY29kZSBjcmVhdGVQcm9wZXJ0eX0uXG4gICAqXG4gICAqIEBub2NvbGxhcHNlXG4gICAqIEBmaW5hbFxuICAgKiBAY2F0ZWdvcnkgcHJvcGVydGllc1xuICAgKi9cbiAgc3RhdGljIGdldFByb3BlcnR5T3B0aW9ucyhuYW1lOiBQcm9wZXJ0eUtleSkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLmdldChuYW1lKSA/PyBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvbjtcbiAgfVxuXG4gIC8vIFRlbXBvcmFyeSwgdW50aWwgZ29vZ2xlMyBpcyBvbiBUeXBlU2NyaXB0IDUuMlxuICBkZWNsYXJlIHN0YXRpYyBbU3ltYm9sLm1ldGFkYXRhXTogb2JqZWN0ICYgUmVjb3JkPFByb3BlcnR5S2V5LCB1bmtub3duPjtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgc3RhdGljIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBjbGFzcyB1c2VkIGluIGJvb2trZWVwaW5nXG4gICAqIGZvciBlbGVtZW50IHByb3BlcnRpZXMsIGluaXRpYWxpemVycywgZXRjLlxuICAgKlxuICAgKiBDYW4gYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGJ5IGNvZGUgdGhhdCBuZWVkcyB0byBlbnN1cmUgdGhlc2VcbiAgICogcHJvcGVydGllcyBleGlzdCBiZWZvcmUgdXNpbmcgdGhlbS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZW5zdXJlcyB0aGUgc3VwZXJjbGFzcyBpcyBmaW5hbGl6ZWQgc28gdGhhdCBpbmhlcml0ZWRcbiAgICogcHJvcGVydHkgbWV0YWRhdGEgY2FuIGJlIGNvcGllZCBkb3duLlxuICAgKiBAbm9jb2xsYXBzZVxuICAgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgX19wcmVwYXJlKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnZWxlbWVudFByb3BlcnRpZXMnLCB0aGlzKSlcbiAgICApIHtcbiAgICAgIC8vIEFscmVhZHkgcHJlcGFyZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRmluYWxpemUgYW55IHN1cGVyY2xhc3Nlc1xuICAgIGNvbnN0IHN1cGVyQ3RvciA9IGdldFByb3RvdHlwZU9mKHRoaXMpIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQ7XG4gICAgc3VwZXJDdG9yLmZpbmFsaXplKCk7XG5cbiAgICAvLyBDcmVhdGUgb3duIHNldCBvZiBpbml0aWFsaXplcnMgZm9yIHRoaXMgY2xhc3MgaWYgYW55IGV4aXN0IG9uIHRoZVxuICAgIC8vIHN1cGVyY2xhc3MgYW5kIGNvcHkgdGhlbSBkb3duLiBOb3RlLCBmb3IgYSBzbWFsbCBwZXJmIGJvb3N0LCBhdm9pZFxuICAgIC8vIGNyZWF0aW5nIGluaXRpYWxpemVycyB1bmxlc3MgbmVlZGVkLlxuICAgIGlmIChzdXBlckN0b3IuX2luaXRpYWxpemVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9pbml0aWFsaXplcnMgPSBbLi4uc3VwZXJDdG9yLl9pbml0aWFsaXplcnNdO1xuICAgIH1cbiAgICAvLyBJbml0aWFsaXplIGVsZW1lbnRQcm9wZXJ0aWVzIGZyb20gdGhlIHN1cGVyY2xhc3NcbiAgICB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzID0gbmV3IE1hcChzdXBlckN0b3IuZWxlbWVudFByb3BlcnRpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmlzaGVzIHNldHRpbmcgdXAgdGhlIGNsYXNzIHNvIHRoYXQgaXQncyByZWFkeSB0byBiZSByZWdpc3RlcmVkXG4gICAqIGFzIGEgY3VzdG9tIGVsZW1lbnQgYW5kIGluc3RhbnRpYXRlZC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBSZWFjdGl2ZUVsZW1lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzIGdldHRlci5cbiAgICogSWYgeW91IG92ZXJyaWRlIHRoZSBvYnNlcnZlZEF0dHJpYnV0ZXMgZ2V0dGVyLCB5b3UgbXVzdCBlaXRoZXIgY2FsbFxuICAgKiBzdXBlci5vYnNlcnZlZEF0dHJpYnV0ZXMgdG8gdHJpZ2dlciBmaW5hbGl6YXRpb24sIG9yIGNhbGwgZmluYWxpemUoKVxuICAgKiB5b3Vyc2VsZi5cbiAgICpcbiAgICogQG5vY29sbGFwc2VcbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgZmluYWxpemUoKSB7XG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnZmluYWxpemVkJywgdGhpcykpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZmluYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLl9fcHJlcGFyZSgpO1xuXG4gICAgLy8gQ3JlYXRlIHByb3BlcnRpZXMgZnJvbSB0aGUgc3RhdGljIHByb3BlcnRpZXMgYmxvY2s6XG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgncHJvcGVydGllcycsIHRoaXMpKSkge1xuICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BlcnRpZXM7XG4gICAgICBjb25zdCBwcm9wS2V5cyA9IFtcbiAgICAgICAgLi4uZ2V0T3duUHJvcGVydHlOYW1lcyhwcm9wcyksXG4gICAgICAgIC4uLmdldE93blByb3BlcnR5U3ltYm9scyhwcm9wcyksXG4gICAgICBdIGFzIEFycmF5PGtleW9mIHR5cGVvZiBwcm9wcz47XG4gICAgICBmb3IgKGNvbnN0IHAgb2YgcHJvcEtleXMpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVQcm9wZXJ0eShwLCBwcm9wc1twXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHByb3BlcnRpZXMgZnJvbSBzdGFuZGFyZCBkZWNvcmF0b3IgbWV0YWRhdGE6XG4gICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzW1N5bWJvbC5tZXRhZGF0YV07XG4gICAgaWYgKG1ldGFkYXRhICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0gbGl0UHJvcGVydHlNZXRhZGF0YS5nZXQobWV0YWRhdGEpO1xuICAgICAgaWYgKHByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtwLCBvcHRpb25zXSBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50UHJvcGVydGllcy5zZXQocCwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIGF0dHJpYnV0ZS10by1wcm9wZXJ0eSBtYXBcbiAgICB0aGlzLl9fYXR0cmlidXRlVG9Qcm9wZXJ0eU1hcCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IFtwLCBvcHRpb25zXSBvZiB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzKSB7XG4gICAgICBjb25zdCBhdHRyID0gdGhpcy5fX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShwLCBvcHRpb25zKTtcbiAgICAgIGlmIChhdHRyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fX2F0dHJpYnV0ZVRvUHJvcGVydHlNYXAuc2V0KGF0dHIsIHApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudFN0eWxlcyA9IHRoaXMuZmluYWxpemVTdHlsZXModGhpcy5zdHlsZXMpO1xuXG4gICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eSgnY3JlYXRlUHJvcGVydHknKSkge1xuICAgICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICAgJ25vLW92ZXJyaWRlLWNyZWF0ZS1wcm9wZXJ0eScsXG4gICAgICAgICAgJ092ZXJyaWRpbmcgUmVhY3RpdmVFbGVtZW50LmNyZWF0ZVByb3BlcnR5KCkgaXMgZGVwcmVjYXRlZC4gJyArXG4gICAgICAgICAgICAnVGhlIG92ZXJyaWRlIHdpbGwgbm90IGJlIGNhbGxlZCB3aXRoIHN0YW5kYXJkIGRlY29yYXRvcnMnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eSgnZ2V0UHJvcGVydHlEZXNjcmlwdG9yJykpIHtcbiAgICAgICAgaXNzdWVXYXJuaW5nKFxuICAgICAgICAgICduby1vdmVycmlkZS1nZXQtcHJvcGVydHktZGVzY3JpcHRvcicsXG4gICAgICAgICAgJ092ZXJyaWRpbmcgUmVhY3RpdmVFbGVtZW50LmdldFByb3BlcnR5RGVzY3JpcHRvcigpIGlzIGRlcHJlY2F0ZWQuICcgK1xuICAgICAgICAgICAgJ1RoZSBvdmVycmlkZSB3aWxsIG5vdCBiZSBjYWxsZWQgd2l0aCBzdGFuZGFyZCBkZWNvcmF0b3JzJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcHRpb25zIHVzZWQgd2hlbiBjYWxsaW5nIGBhdHRhY2hTaGFkb3dgLiBTZXQgdGhpcyBwcm9wZXJ0eSB0byBjdXN0b21pemVcbiAgICogdGhlIG9wdGlvbnMgZm9yIHRoZSBzaGFkb3dSb290OyBmb3IgZXhhbXBsZSwgdG8gY3JlYXRlIGEgY2xvc2VkXG4gICAqIHNoYWRvd1Jvb3Q6IGB7bW9kZTogJ2Nsb3NlZCd9YC5cbiAgICpcbiAgICogTm90ZSwgdGhlc2Ugb3B0aW9ucyBhcmUgdXNlZCBpbiBgY3JlYXRlUmVuZGVyUm9vdGAuIElmIHRoaXMgbWV0aG9kXG4gICAqIGlzIGN1c3RvbWl6ZWQsIG9wdGlvbnMgc2hvdWxkIGJlIHJlc3BlY3RlZCBpZiBwb3NzaWJsZS5cbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgc3RhdGljIHNoYWRvd1Jvb3RPcHRpb25zOiBTaGFkb3dSb290SW5pdCA9IHttb2RlOiAnb3Blbid9O1xuXG4gIC8qKlxuICAgKiBUYWtlcyB0aGUgc3R5bGVzIHRoZSB1c2VyIHN1cHBsaWVkIHZpYSB0aGUgYHN0YXRpYyBzdHlsZXNgIHByb3BlcnR5IGFuZFxuICAgKiByZXR1cm5zIHRoZSBhcnJheSBvZiBzdHlsZXMgdG8gYXBwbHkgdG8gdGhlIGVsZW1lbnQuXG4gICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGludGVncmF0ZSBpbnRvIGEgc3R5bGUgbWFuYWdlbWVudCBzeXN0ZW0uXG4gICAqXG4gICAqIFN0eWxlcyBhcmUgZGVkdXBsaWNhdGVkIHByZXNlcnZpbmcgdGhlIF9sYXN0XyBpbnN0YW5jZSBpbiB0aGUgbGlzdC4gVGhpc1xuICAgKiBpcyBhIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbiB0byBhdm9pZCBkdXBsaWNhdGVkIHN0eWxlcyB0aGF0IGNhbiBvY2N1clxuICAgKiBlc3BlY2lhbGx5IHdoZW4gY29tcG9zaW5nIHZpYSBzdWJjbGFzc2luZy4gVGhlIGxhc3QgaXRlbSBpcyBrZXB0IHRvIHRyeVxuICAgKiB0byBwcmVzZXJ2ZSB0aGUgY2FzY2FkZSBvcmRlciB3aXRoIHRoZSBhc3N1bXB0aW9uIHRoYXQgaXQncyBtb3N0IGltcG9ydGFudFxuICAgKiB0aGF0IGxhc3QgYWRkZWQgc3R5bGVzIG92ZXJyaWRlIHByZXZpb3VzIHN0eWxlcy5cbiAgICpcbiAgICogQG5vY29sbGFwc2VcbiAgICogQGNhdGVnb3J5IHN0eWxlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBmaW5hbGl6ZVN0eWxlcyhcbiAgICBzdHlsZXM/OiBDU1NSZXN1bHRHcm91cFxuICApOiBBcnJheTxDU1NSZXN1bHRPck5hdGl2ZT4ge1xuICAgIGNvbnN0IGVsZW1lbnRTdHlsZXMgPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZXMpKSB7XG4gICAgICAvLyBEZWR1cGUgdGhlIGZsYXR0ZW5lZCBhcnJheSBpbiByZXZlcnNlIG9yZGVyIHRvIHByZXNlcnZlIHRoZSBsYXN0IGl0ZW1zLlxuICAgICAgLy8gQ2FzdGluZyB0byBBcnJheTx1bmtub3duPiB3b3JrcyBhcm91bmQgVFMgZXJyb3IgdGhhdFxuICAgICAgLy8gYXBwZWFycyB0byBjb21lIGZyb20gdHJ5aW5nIHRvIGZsYXR0ZW4gYSB0eXBlIENTU1Jlc3VsdEFycmF5LlxuICAgICAgY29uc3Qgc2V0ID0gbmV3IFNldCgoc3R5bGVzIGFzIEFycmF5PHVua25vd24+KS5mbGF0KEluZmluaXR5KS5yZXZlcnNlKCkpO1xuICAgICAgLy8gVGhlbiBwcmVzZXJ2ZSBvcmlnaW5hbCBvcmRlciBieSBhZGRpbmcgdGhlIHNldCBpdGVtcyBpbiByZXZlcnNlIG9yZGVyLlxuICAgICAgZm9yIChjb25zdCBzIG9mIHNldCkge1xuICAgICAgICBlbGVtZW50U3R5bGVzLnVuc2hpZnQoZ2V0Q29tcGF0aWJsZVN0eWxlKHMgYXMgQ1NTUmVzdWx0T3JOYXRpdmUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0eWxlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbGVtZW50U3R5bGVzLnB1c2goZ2V0Q29tcGF0aWJsZVN0eWxlKHN0eWxlcykpO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudFN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBOb2RlIG9yIFNoYWRvd1Jvb3QgaW50byB3aGljaCBlbGVtZW50IERPTSBzaG91bGQgYmUgcmVuZGVyZWQuIERlZmF1bHRzXG4gICAqIHRvIGFuIG9wZW4gc2hhZG93Um9vdC5cbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcmVhZG9ubHkgcmVuZGVyUm9vdCE6IEhUTUxFbGVtZW50IHwgRG9jdW1lbnRGcmFnbWVudDtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGdpdmVuIGF0dHJpYnV0ZSBgbmFtZWAuXG4gICAqIEBub2NvbGxhcHNlXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBfX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShcbiAgICBuYW1lOiBQcm9wZXJ0eUtleSxcbiAgICBvcHRpb25zOiBQcm9wZXJ0eURlY2xhcmF0aW9uXG4gICkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG9wdGlvbnMuYXR0cmlidXRlO1xuICAgIHJldHVybiBhdHRyaWJ1dGUgPT09IGZhbHNlXG4gICAgICA/IHVuZGVmaW5lZFxuICAgICAgOiB0eXBlb2YgYXR0cmlidXRlID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGF0dHJpYnV0ZVxuICAgICAgICA6IHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJ1xuICAgICAgICAgID8gbmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBJbml0aWFsaXplIHRvIGFuIHVucmVzb2x2ZWQgUHJvbWlzZSBzbyB3ZSBjYW4gbWFrZSBzdXJlIHRoZSBlbGVtZW50IGhhc1xuICAvLyBjb25uZWN0ZWQgYmVmb3JlIGZpcnN0IHVwZGF0ZS5cbiAgcHJpdmF0ZSBfX3VwZGF0ZVByb21pc2UhOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZXJlIGlzIGEgcGVuZGluZyB1cGRhdGUgYXMgYSByZXN1bHQgb2YgY2FsbGluZyBgcmVxdWVzdFVwZGF0ZSgpYC5cbiAgICogU2hvdWxkIG9ubHkgYmUgcmVhZC5cbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIGlzVXBkYXRlUGVuZGluZyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJcyBzZXQgdG8gYHRydWVgIGFmdGVyIHRoZSBmaXJzdCB1cGRhdGUuIFRoZSBlbGVtZW50IGNvZGUgY2Fubm90IGFzc3VtZVxuICAgKiB0aGF0IGByZW5kZXJSb290YCBleGlzdHMgYmVmb3JlIHRoZSBlbGVtZW50IGBoYXNVcGRhdGVkYC5cbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIGhhc1VwZGF0ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogTWFwIHdpdGgga2V5cyBmb3IgYW55IHByb3BlcnRpZXMgdGhhdCBoYXZlIGNoYW5nZWQgc2luY2UgdGhlIGxhc3RcbiAgICogdXBkYXRlIGN5Y2xlIHdpdGggcHJldmlvdXMgdmFsdWVzLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF8kY2hhbmdlZFByb3BlcnRpZXMhOiBQcm9wZXJ0eVZhbHVlcztcblxuICAvKipcbiAgICogUmVjb3JkcyBwcm9wZXJ0eSBkZWZhdWx0IHZhbHVlcyB3aGVuIHRoZVxuICAgKiBgdXNlRGVmYXVsdGAgb3B0aW9uIGlzIHVzZWQuXG4gICAqL1xuICBwcml2YXRlIF9fZGVmYXVsdFZhbHVlcz86IE1hcDxQcm9wZXJ0eUtleSwgdW5rbm93bj47XG5cbiAgLyoqXG4gICAqIFByb3BlcnRpZXMgdGhhdCBzaG91bGQgYmUgcmVmbGVjdGVkIHdoZW4gdXBkYXRlZC5cbiAgICovXG4gIHByaXZhdGUgX19yZWZsZWN0aW5nUHJvcGVydGllcz86IFNldDxQcm9wZXJ0eUtleT47XG5cbiAgLyoqXG4gICAqIE5hbWUgb2YgY3VycmVudGx5IHJlZmxlY3RpbmcgcHJvcGVydHlcbiAgICovXG4gIHByaXZhdGUgX19yZWZsZWN0aW5nUHJvcGVydHk6IFByb3BlcnR5S2V5IHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFNldCBvZiBjb250cm9sbGVycy5cbiAgICovXG4gIHByaXZhdGUgX19jb250cm9sbGVycz86IFNldDxSZWFjdGl2ZUNvbnRyb2xsZXI+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fX2luaXRpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCBvbmx5IG92ZXJyaWRlIHBvaW50IGZvciBjdXN0b21pemluZyB3b3JrIGRvbmUgd2hlbiBlbGVtZW50c1xuICAgKiBhcmUgY29uc3RydWN0ZWQuXG4gICAqL1xuICBwcml2YXRlIF9faW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLl9fdXBkYXRlUHJvbWlzZSA9IG5ldyBQcm9taXNlPGJvb2xlYW4+KFxuICAgICAgKHJlcykgPT4gKHRoaXMuZW5hYmxlVXBkYXRpbmcgPSByZXMpXG4gICAgKTtcbiAgICB0aGlzLl8kY2hhbmdlZFByb3BlcnRpZXMgPSBuZXcgTWFwKCk7XG4gICAgLy8gVGhpcyBlbnF1ZXVlcyBhIG1pY3JvdGFzayB0aGF0IG11c3QgcnVuIGJlZm9yZSB0aGUgZmlyc3QgdXBkYXRlLCBzbyBpdFxuICAgIC8vIG11c3QgYmUgY2FsbGVkIGJlZm9yZSByZXF1ZXN0VXBkYXRlKClcbiAgICB0aGlzLl9fc2F2ZUluc3RhbmNlUHJvcGVydGllcygpO1xuICAgIC8vIGVuc3VyZXMgZmlyc3QgdXBkYXRlIHdpbGwgYmUgY2F1Z2h0IGJ5IGFuIGVhcmx5IGFjY2VzcyBvZlxuICAgIC8vIGB1cGRhdGVDb21wbGV0ZWBcbiAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgICAodGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50KS5faW5pdGlhbGl6ZXJzPy5mb3JFYWNoKChpKSA9PlxuICAgICAgaSh0aGlzKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgYFJlYWN0aXZlQ29udHJvbGxlcmAgdG8gcGFydGljaXBhdGUgaW4gdGhlIGVsZW1lbnQncyByZWFjdGl2ZVxuICAgKiB1cGRhdGUgY3ljbGUuIFRoZSBlbGVtZW50IGF1dG9tYXRpY2FsbHkgY2FsbHMgaW50byBhbnkgcmVnaXN0ZXJlZFxuICAgKiBjb250cm9sbGVycyBkdXJpbmcgaXRzIGxpZmVjeWNsZSBjYWxsYmFja3MuXG4gICAqXG4gICAqIElmIHRoZSBlbGVtZW50IGlzIGNvbm5lY3RlZCB3aGVuIGBhZGRDb250cm9sbGVyKClgIGlzIGNhbGxlZCwgdGhlXG4gICAqIGNvbnRyb2xsZXIncyBgaG9zdENvbm5lY3RlZCgpYCBjYWxsYmFjayB3aWxsIGJlIGltbWVkaWF0ZWx5IGNhbGxlZC5cbiAgICogQGNhdGVnb3J5IGNvbnRyb2xsZXJzXG4gICAqL1xuICBhZGRDb250cm9sbGVyKGNvbnRyb2xsZXI6IFJlYWN0aXZlQ29udHJvbGxlcikge1xuICAgICh0aGlzLl9fY29udHJvbGxlcnMgPz89IG5ldyBTZXQoKSkuYWRkKGNvbnRyb2xsZXIpO1xuICAgIC8vIElmIGEgY29udHJvbGxlciBpcyBhZGRlZCBhZnRlciB0aGUgZWxlbWVudCBoYXMgYmVlbiBjb25uZWN0ZWQsXG4gICAgLy8gY2FsbCBob3N0Q29ubmVjdGVkLiBOb3RlLCByZS11c2luZyBleGlzdGVuY2Ugb2YgYHJlbmRlclJvb3RgIGhlcmVcbiAgICAvLyAod2hpY2ggaXMgc2V0IGluIGNvbm5lY3RlZENhbGxiYWNrKSB0byBhdm9pZCB0aGUgbmVlZCB0byB0cmFjayBhXG4gICAgLy8gZmlyc3QgY29ubmVjdGVkIHN0YXRlLlxuICAgIGlmICh0aGlzLnJlbmRlclJvb3QgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmlzQ29ubmVjdGVkKSB7XG4gICAgICBjb250cm9sbGVyLmhvc3RDb25uZWN0ZWQ/LigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgYFJlYWN0aXZlQ29udHJvbGxlcmAgZnJvbSB0aGUgZWxlbWVudC5cbiAgICogQGNhdGVnb3J5IGNvbnRyb2xsZXJzXG4gICAqL1xuICByZW1vdmVDb250cm9sbGVyKGNvbnRyb2xsZXI6IFJlYWN0aXZlQ29udHJvbGxlcikge1xuICAgIHRoaXMuX19jb250cm9sbGVycz8uZGVsZXRlKGNvbnRyb2xsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpeGVzIGFueSBwcm9wZXJ0aWVzIHNldCBvbiB0aGUgaW5zdGFuY2UgYmVmb3JlIHVwZ3JhZGUgdGltZS5cbiAgICogT3RoZXJ3aXNlIHRoZXNlIHdvdWxkIHNoYWRvdyB0aGUgYWNjZXNzb3IgYW5kIGJyZWFrIHRoZXNlIHByb3BlcnRpZXMuXG4gICAqIFRoZSBwcm9wZXJ0aWVzIGFyZSBzdG9yZWQgaW4gYSBNYXAgd2hpY2ggaXMgcGxheWVkIGJhY2sgYWZ0ZXIgdGhlXG4gICAqIGNvbnN0cnVjdG9yIHJ1bnMuXG4gICAqL1xuICBwcml2YXRlIF9fc2F2ZUluc3RhbmNlUHJvcGVydGllcygpIHtcbiAgICBjb25zdCBpbnN0YW5jZVByb3BlcnRpZXMgPSBuZXcgTWFwPFByb3BlcnR5S2V5LCB1bmtub3duPigpO1xuICAgIGNvbnN0IGVsZW1lbnRQcm9wZXJ0aWVzID0gKHRoaXMuY29uc3RydWN0b3IgYXMgdHlwZW9mIFJlYWN0aXZlRWxlbWVudClcbiAgICAgIC5lbGVtZW50UHJvcGVydGllcztcbiAgICBmb3IgKGNvbnN0IHAgb2YgZWxlbWVudFByb3BlcnRpZXMua2V5cygpIGFzIEl0ZXJhYmxlSXRlcmF0b3I8a2V5b2YgdGhpcz4pIHtcbiAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgIGluc3RhbmNlUHJvcGVydGllcy5zZXQocCwgdGhpc1twXSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzW3BdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaW5zdGFuY2VQcm9wZXJ0aWVzLnNpemUgPiAwKSB7XG4gICAgICB0aGlzLl9faW5zdGFuY2VQcm9wZXJ0aWVzID0gaW5zdGFuY2VQcm9wZXJ0aWVzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBub2RlIGludG8gd2hpY2ggdGhlIGVsZW1lbnQgc2hvdWxkIHJlbmRlciBhbmQgYnkgZGVmYXVsdFxuICAgKiBjcmVhdGVzIGFuZCByZXR1cm5zIGFuIG9wZW4gc2hhZG93Um9vdC4gSW1wbGVtZW50IHRvIGN1c3RvbWl6ZSB3aGVyZSB0aGVcbiAgICogZWxlbWVudCdzIERPTSBpcyByZW5kZXJlZC4gRm9yIGV4YW1wbGUsIHRvIHJlbmRlciBpbnRvIHRoZSBlbGVtZW50J3NcbiAgICogY2hpbGROb2RlcywgcmV0dXJuIGB0aGlzYC5cbiAgICpcbiAgICogQHJldHVybiBSZXR1cm5zIGEgbm9kZSBpbnRvIHdoaWNoIHRvIHJlbmRlci5cbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZVJlbmRlclJvb3QoKTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50IHtcbiAgICBjb25zdCByZW5kZXJSb290ID1cbiAgICAgIHRoaXMuc2hhZG93Um9vdCA/P1xuICAgICAgdGhpcy5hdHRhY2hTaGFkb3coXG4gICAgICAgICh0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpLnNoYWRvd1Jvb3RPcHRpb25zXG4gICAgICApO1xuICAgIGFkb3B0U3R5bGVzKFxuICAgICAgcmVuZGVyUm9vdCxcbiAgICAgICh0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpLmVsZW1lbnRTdHlsZXNcbiAgICApO1xuICAgIHJldHVybiByZW5kZXJSb290O1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIGZpcnN0IGNvbm5lY3Rpb24sIGNyZWF0ZXMgdGhlIGVsZW1lbnQncyByZW5kZXJSb290LCBzZXRzIHVwXG4gICAqIGVsZW1lbnQgc3R5bGluZywgYW5kIGVuYWJsZXMgdXBkYXRpbmcuXG4gICAqIEBjYXRlZ29yeSBsaWZlY3ljbGVcbiAgICovXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIC8vIENyZWF0ZSByZW5kZXJSb290IGJlZm9yZSBjb250cm9sbGVycyBgaG9zdENvbm5lY3RlZGBcbiAgICAodGhpcyBhcyBNdXRhYmxlPHR5cGVvZiB0aGlzLCAncmVuZGVyUm9vdCc+KS5yZW5kZXJSb290ID8/PVxuICAgICAgdGhpcy5jcmVhdGVSZW5kZXJSb290KCk7XG4gICAgdGhpcy5lbmFibGVVcGRhdGluZyh0cnVlKTtcbiAgICB0aGlzLl9fY29udHJvbGxlcnM/LmZvckVhY2goKGMpID0+IGMuaG9zdENvbm5lY3RlZD8uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdGUsIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBjb25zaWRlcmVkIGZpbmFsIGFuZCBub3Qgb3ZlcnJpZGRlbi4gSXQgaXNcbiAgICogb3ZlcnJpZGRlbiBvbiB0aGUgZWxlbWVudCBpbnN0YW5jZSB3aXRoIGEgZnVuY3Rpb24gdGhhdCB0cmlnZ2VycyB0aGUgZmlyc3RcbiAgICogdXBkYXRlLlxuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIGVuYWJsZVVwZGF0aW5nKF9yZXF1ZXN0ZWRVcGRhdGU6IGJvb2xlYW4pIHt9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBmb3IgYHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKClgIGluIGV4dGVuc2lvbnMgd2hpbGVcbiAgICogcmVzZXJ2aW5nIHRoZSBwb3NzaWJpbGl0eSBvZiBtYWtpbmcgbm9uLWJyZWFraW5nIGZlYXR1cmUgYWRkaXRpb25zXG4gICAqIHdoZW4gZGlzY29ubmVjdGluZyBhdCBzb21lIHBvaW50IGluIHRoZSBmdXR1cmUuXG4gICAqIEBjYXRlZ29yeSBsaWZlY3ljbGVcbiAgICovXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuX19jb250cm9sbGVycz8uZm9yRWFjaCgoYykgPT4gYy5ob3N0RGlzY29ubmVjdGVkPy4oKSk7XG4gIH1cblxuICAvKipcbiAgICogU3luY2hyb25pemVzIHByb3BlcnR5IHZhbHVlcyB3aGVuIGF0dHJpYnV0ZXMgY2hhbmdlLlxuICAgKlxuICAgKiBTcGVjaWZpY2FsbHksIHdoZW4gYW4gYXR0cmlidXRlIGlzIHNldCwgdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgaXMgc2V0LlxuICAgKiBZb3Ugc2hvdWxkIHJhcmVseSBuZWVkIHRvIGltcGxlbWVudCB0aGlzIGNhbGxiYWNrLiBJZiB0aGlzIG1ldGhvZCBpc1xuICAgKiBvdmVycmlkZGVuLCBgc3VwZXIuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIF9vbGQsIHZhbHVlKWAgbXVzdCBiZVxuICAgKiBjYWxsZWQuXG4gICAqXG4gICAqIFNlZSBbcmVzcG9uZGluZyB0byBhdHRyaWJ1dGUgY2hhbmdlc10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9jb21wb25lbnRzL1VzaW5nX2N1c3RvbV9lbGVtZW50cyNyZXNwb25kaW5nX3RvX2F0dHJpYnV0ZV9jaGFuZ2VzKVxuICAgKiBvbiBNRE4gZm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tgLlxuICAgKiBAY2F0ZWdvcnkgYXR0cmlidXRlc1xuICAgKi9cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBfb2xkOiBzdHJpbmcgfCBudWxsLFxuICAgIHZhbHVlOiBzdHJpbmcgfCBudWxsXG4gICkge1xuICAgIHRoaXMuXyRhdHRyaWJ1dGVUb1Byb3BlcnR5KG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX19wcm9wZXJ0eVRvQXR0cmlidXRlKG5hbWU6IFByb3BlcnR5S2V5LCB2YWx1ZTogdW5rbm93bikge1xuICAgIGNvbnN0IGVsZW1Qcm9wZXJ0aWVzOiBQcm9wZXJ0eURlY2xhcmF0aW9uTWFwID0gKFxuICAgICAgdGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50XG4gICAgKS5lbGVtZW50UHJvcGVydGllcztcbiAgICBjb25zdCBvcHRpb25zID0gZWxlbVByb3BlcnRpZXMuZ2V0KG5hbWUpITtcbiAgICBjb25zdCBhdHRyID0gKFxuICAgICAgdGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50XG4gICAgKS5fX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShuYW1lLCBvcHRpb25zKTtcbiAgICBpZiAoYXR0ciAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVmbGVjdCA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgY29udmVydGVyID1cbiAgICAgICAgKG9wdGlvbnMuY29udmVydGVyIGFzIENvbXBsZXhBdHRyaWJ1dGVDb252ZXJ0ZXIpPy50b0F0dHJpYnV0ZSAhPT1cbiAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICAgPyAob3B0aW9ucy5jb252ZXJ0ZXIgYXMgQ29tcGxleEF0dHJpYnV0ZUNvbnZlcnRlcilcbiAgICAgICAgICA6IGRlZmF1bHRDb252ZXJ0ZXI7XG4gICAgICBjb25zdCBhdHRyVmFsdWUgPSBjb252ZXJ0ZXIudG9BdHRyaWJ1dGUhKHZhbHVlLCBvcHRpb25zLnR5cGUpO1xuICAgICAgaWYgKFxuICAgICAgICBERVZfTU9ERSAmJlxuICAgICAgICAodGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50KS5lbmFibGVkV2FybmluZ3MhLmluY2x1ZGVzKFxuICAgICAgICAgICdtaWdyYXRpb24nXG4gICAgICAgICkgJiZcbiAgICAgICAgYXR0clZhbHVlID09PSB1bmRlZmluZWRcbiAgICAgICkge1xuICAgICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICAgJ3VuZGVmaW5lZC1hdHRyaWJ1dGUtdmFsdWUnLFxuICAgICAgICAgIGBUaGUgYXR0cmlidXRlIHZhbHVlIGZvciB0aGUgJHtuYW1lIGFzIHN0cmluZ30gcHJvcGVydHkgaXMgYCArXG4gICAgICAgICAgICBgdW5kZWZpbmVkIG9uIGVsZW1lbnQgJHt0aGlzLmxvY2FsTmFtZX0uIFRoZSBhdHRyaWJ1dGUgd2lsbCBiZSBgICtcbiAgICAgICAgICAgIGByZW1vdmVkLCBidXQgaW4gdGhlIHByZXZpb3VzIHZlcnNpb24gb2YgXFxgUmVhY3RpdmVFbGVtZW50XFxgLCBgICtcbiAgICAgICAgICAgIGB0aGUgYXR0cmlidXRlIHdvdWxkIG5vdCBoYXZlIGNoYW5nZWQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gVHJhY2sgaWYgdGhlIHByb3BlcnR5IGlzIGJlaW5nIHJlZmxlY3RlZCB0byBhdm9pZFxuICAgICAgLy8gc2V0dGluZyB0aGUgcHJvcGVydHkgYWdhaW4gdmlhIGBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tgLiBOb3RlOlxuICAgICAgLy8gMS4gdGhpcyB0YWtlcyBhZHZhbnRhZ2Ugb2YgdGhlIGZhY3QgdGhhdCB0aGUgY2FsbGJhY2sgaXMgc3luY2hyb25vdXMuXG4gICAgICAvLyAyLiB3aWxsIGJlaGF2ZSBpbmNvcnJlY3RseSBpZiBtdWx0aXBsZSBhdHRyaWJ1dGVzIGFyZSBpbiB0aGUgcmVhY3Rpb25cbiAgICAgIC8vIHN0YWNrIGF0IHRpbWUgb2YgY2FsbGluZy4gSG93ZXZlciwgc2luY2Ugd2UgcHJvY2VzcyBhdHRyaWJ1dGVzXG4gICAgICAvLyBpbiBgdXBkYXRlYCB0aGlzIHNob3VsZCBub3QgYmUgcG9zc2libGUgKG9yIGFuIGV4dHJlbWUgY29ybmVyIGNhc2VcbiAgICAgIC8vIHRoYXQgd2UnZCBsaWtlIHRvIGRpc2NvdmVyKS5cbiAgICAgIC8vIG1hcmsgc3RhdGUgcmVmbGVjdGluZ1xuICAgICAgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSA9IG5hbWU7XG4gICAgICBpZiAoYXR0clZhbHVlID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsdWUgYXMgc3RyaW5nKTtcbiAgICAgIH1cbiAgICAgIC8vIG1hcmsgc3RhdGUgbm90IHJlZmxlY3RpbmdcbiAgICAgIHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydHkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRhdHRyaWJ1dGVUb1Byb3BlcnR5KG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bGwpIHtcbiAgICBjb25zdCBjdG9yID0gdGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50O1xuICAgIC8vIE5vdGUsIGhpbnQgdGhpcyBhcyBhbiBgQXR0cmlidXRlTWFwYCBzbyBjbG9zdXJlIGNsZWFybHkgdW5kZXJzdGFuZHNcbiAgICAvLyB0aGUgdHlwZTsgaXQgaGFzIGlzc3VlcyB3aXRoIHRyYWNraW5nIHR5cGVzIHRocm91Z2ggc3RhdGljc1xuICAgIGNvbnN0IHByb3BOYW1lID0gKGN0b3IuX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwIGFzIEF0dHJpYnV0ZU1hcCkuZ2V0KG5hbWUpO1xuICAgIC8vIFVzZSB0cmFja2luZyBpbmZvIHRvIGF2b2lkIHJlZmxlY3RpbmcgYSBwcm9wZXJ0eSB2YWx1ZSB0byBhbiBhdHRyaWJ1dGVcbiAgICAvLyBpZiBpdCB3YXMganVzdCBzZXQgYmVjYXVzZSB0aGUgYXR0cmlidXRlIGNoYW5nZWQuXG4gICAgaWYgKHByb3BOYW1lICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSAhPT0gcHJvcE5hbWUpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBjdG9yLmdldFByb3BlcnR5T3B0aW9ucyhwcm9wTmFtZSk7XG4gICAgICBjb25zdCBjb252ZXJ0ZXIgPVxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5jb252ZXJ0ZXIgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHtmcm9tQXR0cmlidXRlOiBvcHRpb25zLmNvbnZlcnRlcn1cbiAgICAgICAgICA6IG9wdGlvbnMuY29udmVydGVyPy5mcm9tQXR0cmlidXRlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gb3B0aW9ucy5jb252ZXJ0ZXJcbiAgICAgICAgICAgIDogZGVmYXVsdENvbnZlcnRlcjtcbiAgICAgIC8vIG1hcmsgc3RhdGUgcmVmbGVjdGluZ1xuICAgICAgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSA9IHByb3BOYW1lO1xuICAgICAgY29uc3QgY29udmVydGVkVmFsdWUgPSBjb252ZXJ0ZXIuZnJvbUF0dHJpYnV0ZSEodmFsdWUsIG9wdGlvbnMudHlwZSk7XG4gICAgICB0aGlzW3Byb3BOYW1lIGFzIGtleW9mIHRoaXNdID1cbiAgICAgICAgY29udmVydGVkVmFsdWUgPz9cbiAgICAgICAgdGhpcy5fX2RlZmF1bHRWYWx1ZXM/LmdldChwcm9wTmFtZSkgPz9cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgKGNvbnZlcnRlZFZhbHVlIGFzIGFueSk7XG4gICAgICAvLyBtYXJrIHN0YXRlIG5vdCByZWZsZWN0aW5nXG4gICAgICB0aGlzLl9fcmVmbGVjdGluZ1Byb3BlcnR5ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVxdWVzdHMgYW4gdXBkYXRlIHdoaWNoIGlzIHByb2Nlc3NlZCBhc3luY2hyb25vdXNseS4gVGhpcyBzaG91bGQgYmUgY2FsbGVkXG4gICAqIHdoZW4gYW4gZWxlbWVudCBzaG91bGQgdXBkYXRlIGJhc2VkIG9uIHNvbWUgc3RhdGUgbm90IHRyaWdnZXJlZCBieSBzZXR0aW5nXG4gICAqIGEgcmVhY3RpdmUgcHJvcGVydHkuIEluIHRoaXMgY2FzZSwgcGFzcyBubyBhcmd1bWVudHMuIEl0IHNob3VsZCBhbHNvIGJlXG4gICAqIGNhbGxlZCB3aGVuIG1hbnVhbGx5IGltcGxlbWVudGluZyBhIHByb3BlcnR5IHNldHRlci4gSW4gdGhpcyBjYXNlLCBwYXNzIHRoZVxuICAgKiBwcm9wZXJ0eSBgbmFtZWAgYW5kIGBvbGRWYWx1ZWAgdG8gZW5zdXJlIHRoYXQgYW55IGNvbmZpZ3VyZWQgcHJvcGVydHlcbiAgICogb3B0aW9ucyBhcmUgaG9ub3JlZC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgbmFtZSBvZiByZXF1ZXN0aW5nIHByb3BlcnR5XG4gICAqIEBwYXJhbSBvbGRWYWx1ZSBvbGQgdmFsdWUgb2YgcmVxdWVzdGluZyBwcm9wZXJ0eVxuICAgKiBAcGFyYW0gb3B0aW9ucyBwcm9wZXJ0eSBvcHRpb25zIHRvIHVzZSBpbnN0ZWFkIG9mIHRoZSBwcmV2aW91c2x5XG4gICAqICAgICBjb25maWd1cmVkIG9wdGlvbnNcbiAgICogQHBhcmFtIHVzZU5ld1ZhbHVlIGlmIHRydWUsIHRoZSBuZXdWYWx1ZSBhcmd1bWVudCBpcyB1c2VkIGluc3RlYWQgb2ZcbiAgICogICAgIHJlYWRpbmcgdGhlIHByb3BlcnR5IHZhbHVlLiBUaGlzIGlzIGltcG9ydGFudCB0byB1c2UgaWYgdGhlIHJlYWN0aXZlXG4gICAqICAgICBwcm9wZXJ0eSBpcyBhIHN0YW5kYXJkIHByaXZhdGUgYWNjZXNzb3IsIGFzIG9wcG9zZWQgdG8gYSBwbGFpblxuICAgKiAgICAgcHJvcGVydHksIHNpbmNlIHByaXZhdGUgbWVtYmVycyBjYW4ndCBiZSBkeW5hbWljYWxseSByZWFkIGJ5IG5hbWUuXG4gICAqIEBwYXJhbSBuZXdWYWx1ZSB0aGUgbmV3IHZhbHVlIG9mIHRoZSBwcm9wZXJ0eS4gVGhpcyBpcyBvbmx5IHVzZWQgaWZcbiAgICogICAgIGB1c2VOZXdWYWx1ZWAgaXMgdHJ1ZS5cbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIHJlcXVlc3RVcGRhdGUoXG4gICAgbmFtZT86IFByb3BlcnR5S2V5LFxuICAgIG9sZFZhbHVlPzogdW5rbm93bixcbiAgICBvcHRpb25zPzogUHJvcGVydHlEZWNsYXJhdGlvbixcbiAgICB1c2VOZXdWYWx1ZSA9IGZhbHNlLFxuICAgIG5ld1ZhbHVlPzogdW5rbm93blxuICApOiB2b2lkIHtcbiAgICAvLyBJZiB3ZSBoYXZlIGEgcHJvcGVydHkga2V5LCBwZXJmb3JtIHByb3BlcnR5IHVwZGF0ZSBzdGVwcy5cbiAgICBpZiAobmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoREVWX01PREUgJiYgKG5hbWUgYXMgdW5rbm93bikgaW5zdGFuY2VvZiBFdmVudCkge1xuICAgICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICAgYGAsXG4gICAgICAgICAgYFRoZSByZXF1ZXN0VXBkYXRlKCkgbWV0aG9kIHdhcyBjYWxsZWQgd2l0aCBhbiBFdmVudCBhcyB0aGUgcHJvcGVydHkgbmFtZS4gVGhpcyBpcyBwcm9iYWJseSBhIG1pc3Rha2UgY2F1c2VkIGJ5IGJpbmRpbmcgdGhpcy5yZXF1ZXN0VXBkYXRlIGFzIGFuIGV2ZW50IGxpc3RlbmVyLiBJbnN0ZWFkIGJpbmQgYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2FsbCBpdCB3aXRoIG5vIGFyZ3VtZW50czogKCkgPT4gdGhpcy5yZXF1ZXN0VXBkYXRlKClgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBjdG9yID0gdGhpcy5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgUmVhY3RpdmVFbGVtZW50O1xuICAgICAgaWYgKHVzZU5ld1ZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHRoaXNbbmFtZSBhcyBrZXlvZiB0aGlzXTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPz89IGN0b3IuZ2V0UHJvcGVydHlPcHRpb25zKG5hbWUpO1xuICAgICAgY29uc3QgY2hhbmdlZCA9XG4gICAgICAgIChvcHRpb25zLmhhc0NoYW5nZWQgPz8gbm90RXF1YWwpKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgfHxcbiAgICAgICAgLy8gV2hlbiB0aGVyZSBpcyBubyBjaGFuZ2UsIGNoZWNrIGEgY29ybmVyIGNhc2UgdGhhdCBjYW4gb2NjdXIgd2hlblxuICAgICAgICAvLyAxLiB0aGVyZSdzIGEgaW5pdGlhbCB2YWx1ZSB3aGljaCB3YXMgbm90IHJlZmxlY3RlZFxuICAgICAgICAvLyAyLiB0aGUgcHJvcGVydHkgaXMgc3Vic2VxdWVudGx5IHNldCB0byB0aGlzIHZhbHVlLlxuICAgICAgICAvLyBGb3IgZXhhbXBsZSwgYHByb3A6IHt1c2VEZWZhdWx0OiB0cnVlLCByZWZsZWN0OiB0cnVlfWBcbiAgICAgICAgLy8gYW5kIGVsLnByb3AgPSAnZm9vJy4gVGhpcyBzaG91bGQgYmUgY29uc2lkZXJlZCBhIGNoYW5nZSBpZiB0aGVcbiAgICAgICAgLy8gYXR0cmlidXRlIGlzIG5vdCBzZXQgYmVjYXVzZSB3ZSB3aWxsIG5vdyByZWZsZWN0IHRoZSBwcm9wZXJ0eSB0byB0aGUgYXR0cmlidXRlLlxuICAgICAgICAob3B0aW9ucy51c2VEZWZhdWx0ICYmXG4gICAgICAgICAgb3B0aW9ucy5yZWZsZWN0ICYmXG4gICAgICAgICAgbmV3VmFsdWUgPT09IHRoaXMuX19kZWZhdWx0VmFsdWVzPy5nZXQobmFtZSkgJiZcbiAgICAgICAgICAhdGhpcy5oYXNBdHRyaWJ1dGUoY3Rvci5fX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShuYW1lLCBvcHRpb25zKSEpKTtcbiAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMuXyRjaGFuZ2VQcm9wZXJ0eShuYW1lLCBvbGRWYWx1ZSwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBYm9ydCB0aGUgcmVxdWVzdCBpZiB0aGUgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSBjb25zaWRlcmVkIGNoYW5nZWQuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaXNVcGRhdGVQZW5kaW5nID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5fX3VwZGF0ZVByb21pc2UgPSB0aGlzLl9fZW5xdWV1ZVVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF8kY2hhbmdlUHJvcGVydHkoXG4gICAgbmFtZTogUHJvcGVydHlLZXksXG4gICAgb2xkVmFsdWU6IHVua25vd24sXG4gICAge3VzZURlZmF1bHQsIHJlZmxlY3QsIHdyYXBwZWR9OiBQcm9wZXJ0eURlY2xhcmF0aW9uLFxuICAgIGluaXRpYWxpemVWYWx1ZT86IHVua25vd25cbiAgKSB7XG4gICAgLy8gUmVjb3JkIGRlZmF1bHQgdmFsdWUgd2hlbiB1c2VEZWZhdWx0IGlzIHVzZWQuIFRoaXMgYWxsb3dzIHVzIHRvXG4gICAgLy8gcmVzdG9yZSB0aGlzIHZhbHVlIHdoZW4gdGhlIGF0dHJpYnV0ZSBpcyByZW1vdmVkLlxuICAgIGlmICh1c2VEZWZhdWx0ICYmICEodGhpcy5fX2RlZmF1bHRWYWx1ZXMgPz89IG5ldyBNYXAoKSkuaGFzKG5hbWUpKSB7XG4gICAgICB0aGlzLl9fZGVmYXVsdFZhbHVlcy5zZXQoXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluaXRpYWxpemVWYWx1ZSA/PyBvbGRWYWx1ZSA/PyB0aGlzW25hbWUgYXMga2V5b2YgdGhpc11cbiAgICAgICk7XG4gICAgICAvLyBpZiB0aGlzIGlzIG5vdCB3cmFwcGluZyBhbiBhY2Nlc3NvciwgaXQgbXVzdCBiZSBhbiBpbml0aWFsIHNldHRpbmdcbiAgICAgIC8vIGFuZCBpbiB0aGlzIGNhc2Ugd2UgZG8gbm90IHdhbnQgdG8gcmVjb3JkIHRoZSBjaGFuZ2Ugb3IgcmVmbGVjdC5cbiAgICAgIGlmICh3cmFwcGVkICE9PSB0cnVlIHx8IGluaXRpYWxpemVWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVE9ETyAoanVzdGluZmFnbmFuaSk6IENyZWF0ZSBhIGJlbmNobWFyayBvZiBNYXAuaGFzKCkgKyBNYXAuc2V0KFxuICAgIC8vIHZzIGp1c3QgTWFwLnNldCgpXG4gICAgaWYgKCF0aGlzLl8kY2hhbmdlZFByb3BlcnRpZXMuaGFzKG5hbWUpKSB7XG4gICAgICAvLyBPbiB0aGUgaW5pdGlhbCBjaGFuZ2UsIHRoZSBvbGQgdmFsdWUgc2hvdWxkIGJlIGB1bmRlZmluZWRgLCBleGNlcHRcbiAgICAgIC8vIHdpdGggYHVzZURlZmF1bHRgXG4gICAgICBpZiAoIXRoaXMuaGFzVXBkYXRlZCAmJiAhdXNlRGVmYXVsdCkge1xuICAgICAgICBvbGRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHRoaXMuXyRjaGFuZ2VkUHJvcGVydGllcy5zZXQobmFtZSwgb2xkVmFsdWUpO1xuICAgIH1cbiAgICAvLyBBZGQgdG8gcmVmbGVjdGluZyBwcm9wZXJ0aWVzIHNldC5cbiAgICAvLyBOb3RlLCBpdCdzIGltcG9ydGFudCB0aGF0IGV2ZXJ5IGNoYW5nZSBoYXMgYSBjaGFuY2UgdG8gYWRkIHRoZVxuICAgIC8vIHByb3BlcnR5IHRvIGBfX3JlZmxlY3RpbmdQcm9wZXJ0aWVzYC4gVGhpcyBlbnN1cmVzIHNldHRpbmdcbiAgICAvLyBhdHRyaWJ1dGUgKyBwcm9wZXJ0eSByZWZsZWN0cyBjb3JyZWN0bHkuXG4gICAgaWYgKHJlZmxlY3QgPT09IHRydWUgJiYgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSAhPT0gbmFtZSkge1xuICAgICAgKHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydGllcyA/Pz0gbmV3IFNldDxQcm9wZXJ0eUtleT4oKSkuYWRkKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHVwIHRoZSBlbGVtZW50IHRvIGFzeW5jaHJvbm91c2x5IHVwZGF0ZS5cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgX19lbnF1ZXVlVXBkYXRlKCkge1xuICAgIHRoaXMuaXNVcGRhdGVQZW5kaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgLy8gRW5zdXJlIGFueSBwcmV2aW91cyB1cGRhdGUgaGFzIHJlc29sdmVkIGJlZm9yZSB1cGRhdGluZy5cbiAgICAgIC8vIFRoaXMgYGF3YWl0YCBhbHNvIGVuc3VyZXMgdGhhdCBwcm9wZXJ0eSBjaGFuZ2VzIGFyZSBiYXRjaGVkLlxuICAgICAgYXdhaXQgdGhpcy5fX3VwZGF0ZVByb21pc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gUmVmaXJlIGFueSBwcmV2aW91cyBlcnJvcnMgYXN5bmMgc28gdGhleSBkbyBub3QgZGlzcnVwdCB0aGUgdXBkYXRlXG4gICAgICAvLyBjeWNsZS4gRXJyb3JzIGFyZSByZWZpcmVkIHNvIGRldmVsb3BlcnMgaGF2ZSBhIGNoYW5jZSB0byBvYnNlcnZlXG4gICAgICAvLyB0aGVtLCBhbmQgdGhpcyBjYW4gYmUgZG9uZSBieSBpbXBsZW1lbnRpbmdcbiAgICAgIC8vIGB3aW5kb3cub251bmhhbmRsZWRyZWplY3Rpb25gLlxuICAgICAgUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc2NoZWR1bGVVcGRhdGUoKTtcbiAgICAvLyBJZiBgc2NoZWR1bGVVcGRhdGVgIHJldHVybnMgYSBQcm9taXNlLCB3ZSBhd2FpdCBpdC4gVGhpcyBpcyBkb25lIHRvXG4gICAgLy8gZW5hYmxlIGNvb3JkaW5hdGluZyB1cGRhdGVzIHdpdGggYSBzY2hlZHVsZXIuIE5vdGUsIHRoZSByZXN1bHQgaXNcbiAgICAvLyBjaGVja2VkIHRvIGF2b2lkIGRlbGF5aW5nIGFuIGFkZGl0aW9uYWwgbWljcm90YXNrIHVubGVzcyB3ZSBuZWVkIHRvLlxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgYXdhaXQgcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gIXRoaXMuaXNVcGRhdGVQZW5kaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjaGVkdWxlcyBhbiBlbGVtZW50IHVwZGF0ZS4gWW91IGNhbiBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBjaGFuZ2UgdGhlXG4gICAqIHRpbWluZyBvZiB1cGRhdGVzIGJ5IHJldHVybmluZyBhIFByb21pc2UuIFRoZSB1cGRhdGUgd2lsbCBhd2FpdCB0aGVcbiAgICogcmV0dXJuZWQgUHJvbWlzZSwgYW5kIHlvdSBzaG91bGQgcmVzb2x2ZSB0aGUgUHJvbWlzZSB0byBhbGxvdyB0aGUgdXBkYXRlXG4gICAqIHRvIHByb2NlZWQuIElmIHRoaXMgbWV0aG9kIGlzIG92ZXJyaWRkZW4sIGBzdXBlci5zY2hlZHVsZVVwZGF0ZSgpYFxuICAgKiBtdXN0IGJlIGNhbGxlZC5cbiAgICpcbiAgICogRm9yIGluc3RhbmNlLCB0byBzY2hlZHVsZSB1cGRhdGVzIHRvIG9jY3VyIGp1c3QgYmVmb3JlIHRoZSBuZXh0IGZyYW1lOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBvdmVycmlkZSBwcm90ZWN0ZWQgYXN5bmMgc2NoZWR1bGVVcGRhdGUoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAqICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiByZXNvbHZlKCkpKTtcbiAgICogICBzdXBlci5zY2hlZHVsZVVwZGF0ZSgpO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHNjaGVkdWxlVXBkYXRlKCk6IHZvaWQgfCBQcm9taXNlPHVua25vd24+IHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnBlcmZvcm1VcGRhdGUoKTtcbiAgICBpZiAoXG4gICAgICBERVZfTU9ERSAmJlxuICAgICAgKHRoaXMuY29uc3RydWN0b3IgYXMgdHlwZW9mIFJlYWN0aXZlRWxlbWVudCkuZW5hYmxlZFdhcm5pbmdzIS5pbmNsdWRlcyhcbiAgICAgICAgJ2FzeW5jLXBlcmZvcm0tdXBkYXRlJ1xuICAgICAgKSAmJlxuICAgICAgdHlwZW9mIChyZXN1bHQgYXMgdW5rbm93biBhcyBQcm9taXNlPHVua25vd24+IHwgdW5kZWZpbmVkKT8udGhlbiA9PT1cbiAgICAgICAgJ2Z1bmN0aW9uJ1xuICAgICkge1xuICAgICAgaXNzdWVXYXJuaW5nKFxuICAgICAgICAnYXN5bmMtcGVyZm9ybS11cGRhdGUnLFxuICAgICAgICBgRWxlbWVudCAke3RoaXMubG9jYWxOYW1lfSByZXR1cm5lZCBhIFByb21pc2UgZnJvbSBwZXJmb3JtVXBkYXRlKCkuIGAgK1xuICAgICAgICAgIGBUaGlzIGJlaGF2aW9yIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSBgICtcbiAgICAgICAgICBgdmVyc2lvbiBvZiBSZWFjdGl2ZUVsZW1lbnQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhbiBlbGVtZW50IHVwZGF0ZS4gTm90ZSwgaWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBkdXJpbmcgdGhlXG4gICAqIHVwZGF0ZSwgYGZpcnN0VXBkYXRlZGAgYW5kIGB1cGRhdGVkYCB3aWxsIG5vdCBiZSBjYWxsZWQuXG4gICAqXG4gICAqIENhbGwgYHBlcmZvcm1VcGRhdGUoKWAgdG8gaW1tZWRpYXRlbHkgcHJvY2VzcyBhIHBlbmRpbmcgdXBkYXRlLiBUaGlzIHNob3VsZFxuICAgKiBnZW5lcmFsbHkgbm90IGJlIG5lZWRlZCwgYnV0IGl0IGNhbiBiZSBkb25lIGluIHJhcmUgY2FzZXMgd2hlbiB5b3UgbmVlZCB0b1xuICAgKiB1cGRhdGUgc3luY2hyb25vdXNseS5cbiAgICpcbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIHByb3RlY3RlZCBwZXJmb3JtVXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIEFib3J0IGFueSB1cGRhdGUgaWYgb25lIGlzIG5vdCBwZW5kaW5nIHdoZW4gdGhpcyBpcyBjYWxsZWQuXG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIGBwZXJmb3JtVXBkYXRlYCBpcyBjYWxsZWQgZWFybHkgdG8gXCJmbHVzaFwiXG4gICAgLy8gdGhlIHVwZGF0ZS5cbiAgICBpZiAoIXRoaXMuaXNVcGRhdGVQZW5kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlYnVnTG9nRXZlbnQ/Lih7a2luZDogJ3VwZGF0ZSd9KTtcbiAgICBpZiAoIXRoaXMuaGFzVXBkYXRlZCkge1xuICAgICAgLy8gQ3JlYXRlIHJlbmRlclJvb3QgYmVmb3JlIGZpcnN0IHVwZGF0ZS4gVGhpcyBvY2N1cnMgaW4gYGNvbm5lY3RlZENhbGxiYWNrYFxuICAgICAgLy8gYnV0IGlzIGRvbmUgaGVyZSB0byBzdXBwb3J0IG91dCBvZiB0cmVlIGNhbGxzIHRvIGBlbmFibGVVcGRhdGluZ2AvYHBlcmZvcm1VcGRhdGVgLlxuICAgICAgKHRoaXMgYXMgTXV0YWJsZTx0eXBlb2YgdGhpcywgJ3JlbmRlclJvb3QnPikucmVuZGVyUm9vdCA/Pz1cbiAgICAgICAgdGhpcy5jcmVhdGVSZW5kZXJSb290KCk7XG4gICAgICBpZiAoREVWX01PREUpIHtcbiAgICAgICAgLy8gUHJvZHVjZSB3YXJuaW5nIGlmIGFueSByZWFjdGl2ZSBwcm9wZXJ0aWVzIG9uIHRoZSBwcm90b3R5cGUgYXJlXG4gICAgICAgIC8vIHNoYWRvd2VkIGJ5IGNsYXNzIGZpZWxkcy4gSW5zdGFuY2UgZmllbGRzIHNldCBiZWZvcmUgdXBncmFkZSBhcmVcbiAgICAgICAgLy8gZGVsZXRlZCBieSB0aGlzIHBvaW50LCBzbyBhbnkgb3duIHByb3BlcnR5IGlzIGNhdXNlZCBieSBjbGFzcyBmaWVsZFxuICAgICAgICAvLyBpbml0aWFsaXphdGlvbiBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgIGNvbnN0IGN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNoYWRvd2VkUHJvcGVydGllcyA9IFsuLi5jdG9yLmVsZW1lbnRQcm9wZXJ0aWVzLmtleXMoKV0uZmlsdGVyKFxuICAgICAgICAgIChwKSA9PiB0aGlzLmhhc093blByb3BlcnR5KHApICYmIHAgaW4gZ2V0UHJvdG90eXBlT2YodGhpcylcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHNoYWRvd2VkUHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgVGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIG9uIGVsZW1lbnQgJHt0aGlzLmxvY2FsTmFtZX0gd2lsbCBub3QgYCArXG4gICAgICAgICAgICAgIGB0cmlnZ2VyIHVwZGF0ZXMgYXMgZXhwZWN0ZWQgYmVjYXVzZSB0aGV5IGFyZSBzZXQgdXNpbmcgY2xhc3MgYCArXG4gICAgICAgICAgICAgIGBmaWVsZHM6ICR7c2hhZG93ZWRQcm9wZXJ0aWVzLmpvaW4oJywgJyl9LiBgICtcbiAgICAgICAgICAgICAgYE5hdGl2ZSBjbGFzcyBmaWVsZHMgYW5kIHNvbWUgY29tcGlsZWQgb3V0cHV0IHdpbGwgb3ZlcndyaXRlIGAgK1xuICAgICAgICAgICAgICBgYWNjZXNzb3JzIHVzZWQgZm9yIGRldGVjdGluZyBjaGFuZ2VzLiBTZWUgYCArXG4gICAgICAgICAgICAgIGBodHRwczovL2xpdC5kZXYvbXNnL2NsYXNzLWZpZWxkLXNoYWRvd2luZyBgICtcbiAgICAgICAgICAgICAgYGZvciBtb3JlIGluZm9ybWF0aW9uLmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBNaXhpbiBpbnN0YW5jZSBwcm9wZXJ0aWVzIG9uY2UsIGlmIHRoZXkgZXhpc3QuXG4gICAgICBpZiAodGhpcy5fX2luc3RhbmNlUHJvcGVydGllcykge1xuICAgICAgICAvLyBUT0RPIChqdXN0aW5mYWduYW5pKTogc2hvdWxkIHdlIHVzZSB0aGUgc3RvcmVkIHZhbHVlPyBDb3VsZCBhIG5ldyB2YWx1ZVxuICAgICAgICAvLyBoYXZlIGJlZW4gc2V0IHNpbmNlIHdlIHN0b3JlZCB0aGUgb3duIHByb3BlcnR5IHZhbHVlP1xuICAgICAgICBmb3IgKGNvbnN0IFtwLCB2YWx1ZV0gb2YgdGhpcy5fX2luc3RhbmNlUHJvcGVydGllcykge1xuICAgICAgICAgIHRoaXNbcCBhcyBrZXlvZiB0aGlzXSA9IHZhbHVlIGFzIHRoaXNba2V5b2YgdGhpc107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX2luc3RhbmNlUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIC8vIFRyaWdnZXIgaW5pdGlhbCB2YWx1ZSByZWZsZWN0aW9uIGFuZCBwb3B1bGF0ZSB0aGUgaW5pdGlhbFxuICAgICAgLy8gYGNoYW5nZWRQcm9wZXJ0aWVzYCBtYXAsIGJ1dCBvbmx5IGZvciB0aGUgY2FzZSBvZiBwcm9wZXJ0aWVzIGNyZWF0ZWRcbiAgICAgIC8vIHZpYSBgY3JlYXRlUHJvcGVydHlgIG9uIGFjY2Vzc29ycywgd2hpY2ggd2lsbCBub3QgaGF2ZSBhbHJlYWR5XG4gICAgICAvLyBwb3B1bGF0ZWQgdGhlIGBjaGFuZ2VkUHJvcGVydGllc2AgbWFwIHNpbmNlIHRoZXkgYXJlIG5vdCBzZXQuXG4gICAgICAvLyBXZSBjYW4ndCBrbm93IGlmIHRoZXNlIGFjY2Vzc29ycyBoYWQgaW5pdGlhbGl6ZXJzLCBzbyB3ZSBqdXN0IHNldFxuICAgICAgLy8gdGhlbSBhbnl3YXkgLSBhIGRpZmZlcmVuY2UgZnJvbSBleHBlcmltZW50YWwgZGVjb3JhdG9ycyBvbiBmaWVsZHMgYW5kXG4gICAgICAvLyBzdGFuZGFyZCBkZWNvcmF0b3JzIG9uIGF1dG8tYWNjZXNzb3JzLlxuICAgICAgLy8gRm9yIGNvbnRleHQgc2VlOlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2xpdC9saXQvcHVsbC80MTgzI2lzc3VlY29tbWVudC0xNzExOTU5NjM1XG4gICAgICBjb25zdCBlbGVtZW50UHJvcGVydGllcyA9ICh0aGlzLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpXG4gICAgICAgIC5lbGVtZW50UHJvcGVydGllcztcbiAgICAgIGlmIChlbGVtZW50UHJvcGVydGllcy5zaXplID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IFtwLCBvcHRpb25zXSBvZiBlbGVtZW50UHJvcGVydGllcykge1xuICAgICAgICAgIGNvbnN0IHt3cmFwcGVkfSA9IG9wdGlvbnM7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzW3AgYXMga2V5b2YgdGhpc107XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgd3JhcHBlZCA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgIXRoaXMuXyRjaGFuZ2VkUHJvcGVydGllcy5oYXMocCkgJiZcbiAgICAgICAgICAgIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuXyRjaGFuZ2VQcm9wZXJ0eShwLCB1bmRlZmluZWQsIG9wdGlvbnMsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuICAgIGNvbnN0IGNoYW5nZWRQcm9wZXJ0aWVzID0gdGhpcy5fJGNoYW5nZWRQcm9wZXJ0aWVzO1xuICAgIHRyeSB7XG4gICAgICBzaG91bGRVcGRhdGUgPSB0aGlzLnNob3VsZFVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICAgIHRoaXMud2lsbFVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgICAgIHRoaXMuX19jb250cm9sbGVycz8uZm9yRWFjaCgoYykgPT4gYy5ob3N0VXBkYXRlPy4oKSk7XG4gICAgICAgIHRoaXMudXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX19tYXJrVXBkYXRlZCgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFByZXZlbnQgYGZpcnN0VXBkYXRlZGAgYW5kIGB1cGRhdGVkYCBmcm9tIHJ1bm5pbmcgd2hlbiB0aGVyZSdzIGFuXG4gICAgICAvLyB1cGRhdGUgZXhjZXB0aW9uLlxuICAgICAgc2hvdWxkVXBkYXRlID0gZmFsc2U7XG4gICAgICAvLyBFbnN1cmUgZWxlbWVudCBjYW4gYWNjZXB0IGFkZGl0aW9uYWwgdXBkYXRlcyBhZnRlciBhbiBleGNlcHRpb24uXG4gICAgICB0aGlzLl9fbWFya1VwZGF0ZWQoKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICAgIC8vIFRoZSB1cGRhdGUgaXMgbm8gbG9uZ2VyIGNvbnNpZGVyZWQgcGVuZGluZyBhbmQgZnVydGhlciB1cGRhdGVzIGFyZSBub3cgYWxsb3dlZC5cbiAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICB0aGlzLl8kZGlkVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW52b2tlZCBiZWZvcmUgYHVwZGF0ZSgpYCB0byBjb21wdXRlIHZhbHVlcyBuZWVkZWQgZHVyaW5nIHRoZSB1cGRhdGUuXG4gICAqXG4gICAqIEltcGxlbWVudCBgd2lsbFVwZGF0ZWAgdG8gY29tcHV0ZSBwcm9wZXJ0eSB2YWx1ZXMgdGhhdCBkZXBlbmQgb24gb3RoZXJcbiAgICogcHJvcGVydGllcyBhbmQgYXJlIHVzZWQgaW4gdGhlIHJlc3Qgb2YgdGhlIHVwZGF0ZSBwcm9jZXNzLlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiB3aWxsVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAqICAgLy8gb25seSBuZWVkIHRvIGNoZWNrIGNoYW5nZWQgcHJvcGVydGllcyBmb3IgYW4gZXhwZW5zaXZlIGNvbXB1dGF0aW9uLlxuICAgKiAgIGlmIChjaGFuZ2VkUHJvcGVydGllcy5oYXMoJ2ZpcnN0TmFtZScpIHx8IGNoYW5nZWRQcm9wZXJ0aWVzLmhhcygnbGFzdE5hbWUnKSkge1xuICAgKiAgICAgdGhpcy5zaGEgPSBjb21wdXRlU0hBKGAke3RoaXMuZmlyc3ROYW1lfSAke3RoaXMubGFzdE5hbWV9YCk7XG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIHJlbmRlcigpIHtcbiAgICogICByZXR1cm4gaHRtbGBTSEE6ICR7dGhpcy5zaGF9YDtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIHByb3RlY3RlZCB3aWxsVXBkYXRlKF9jaGFuZ2VkUHJvcGVydGllczogUHJvcGVydHlWYWx1ZXMpOiB2b2lkIHt9XG5cbiAgLy8gTm90ZSwgdGhpcyBpcyBhbiBvdmVycmlkZSBwb2ludCBmb3IgcG9seWZpbGwtc3VwcG9ydC5cbiAgLy8gQGludGVybmFsXG4gIF8kZGlkVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzOiBQcm9wZXJ0eVZhbHVlcykge1xuICAgIHRoaXMuX19jb250cm9sbGVycz8uZm9yRWFjaCgoYykgPT4gYy5ob3N0VXBkYXRlZD8uKCkpO1xuICAgIGlmICghdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICB0aGlzLmhhc1VwZGF0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5maXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIGlmIChcbiAgICAgIERFVl9NT0RFICYmXG4gICAgICB0aGlzLmlzVXBkYXRlUGVuZGluZyAmJlxuICAgICAgKHRoaXMuY29uc3RydWN0b3IgYXMgdHlwZW9mIFJlYWN0aXZlRWxlbWVudCkuZW5hYmxlZFdhcm5pbmdzIS5pbmNsdWRlcyhcbiAgICAgICAgJ2NoYW5nZS1pbi11cGRhdGUnXG4gICAgICApXG4gICAgKSB7XG4gICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICdjaGFuZ2UtaW4tdXBkYXRlJyxcbiAgICAgICAgYEVsZW1lbnQgJHt0aGlzLmxvY2FsTmFtZX0gc2NoZWR1bGVkIGFuIHVwZGF0ZSBgICtcbiAgICAgICAgICBgKGdlbmVyYWxseSBiZWNhdXNlIGEgcHJvcGVydHkgd2FzIHNldCkgYCArXG4gICAgICAgICAgYGFmdGVyIGFuIHVwZGF0ZSBjb21wbGV0ZWQsIGNhdXNpbmcgYSBuZXcgdXBkYXRlIHRvIGJlIHNjaGVkdWxlZC4gYCArXG4gICAgICAgICAgYFRoaXMgaXMgaW5lZmZpY2llbnQgYW5kIHNob3VsZCBiZSBhdm9pZGVkIHVubGVzcyB0aGUgbmV4dCB1cGRhdGUgYCArXG4gICAgICAgICAgYGNhbiBvbmx5IGJlIHNjaGVkdWxlZCBhcyBhIHNpZGUgZWZmZWN0IG9mIHRoZSBwcmV2aW91cyB1cGRhdGUuYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9fbWFya1VwZGF0ZWQoKSB7XG4gICAgdGhpcy5fJGNoYW5nZWRQcm9wZXJ0aWVzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuaXNVcGRhdGVQZW5kaW5nID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBlbGVtZW50IGhhcyBjb21wbGV0ZWQgdXBkYXRpbmcuXG4gICAqIFRoZSBQcm9taXNlIHZhbHVlIGlzIGEgYm9vbGVhbiB0aGF0IGlzIGB0cnVlYCBpZiB0aGUgZWxlbWVudCBjb21wbGV0ZWQgdGhlXG4gICAqIHVwZGF0ZSB3aXRob3V0IHRyaWdnZXJpbmcgYW5vdGhlciB1cGRhdGUuIFRoZSBQcm9taXNlIHJlc3VsdCBpcyBgZmFsc2VgIGlmXG4gICAqIGEgcHJvcGVydHkgd2FzIHNldCBpbnNpZGUgYHVwZGF0ZWQoKWAuIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBhblxuICAgKiBleGNlcHRpb24gd2FzIHRocm93biBkdXJpbmcgdGhlIHVwZGF0ZS5cbiAgICpcbiAgICogVG8gYXdhaXQgYWRkaXRpb25hbCBhc3luY2hyb25vdXMgd29yaywgb3ZlcnJpZGUgdGhlIGBnZXRVcGRhdGVDb21wbGV0ZWBcbiAgICogbWV0aG9kLiBGb3IgZXhhbXBsZSwgaXQgaXMgc29tZXRpbWVzIHVzZWZ1bCB0byBhd2FpdCBhIHJlbmRlcmVkIGVsZW1lbnRcbiAgICogYmVmb3JlIGZ1bGZpbGxpbmcgdGhpcyBQcm9taXNlLiBUbyBkbyB0aGlzLCBmaXJzdCBhd2FpdFxuICAgKiBgc3VwZXIuZ2V0VXBkYXRlQ29tcGxldGUoKWAsIHRoZW4gYW55IHN1YnNlcXVlbnQgc3RhdGUuXG4gICAqXG4gICAqIEByZXR1cm4gQSBwcm9taXNlIG9mIGEgYm9vbGVhbiB0aGF0IHJlc29sdmVzIHRvIHRydWUgaWYgdGhlIHVwZGF0ZSBjb21wbGV0ZWRcbiAgICogICAgIHdpdGhvdXQgdHJpZ2dlcmluZyBhbm90aGVyIHVwZGF0ZS5cbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIGdldCB1cGRhdGVDb21wbGV0ZSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRVcGRhdGVDb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHBvaW50IGZvciB0aGUgYHVwZGF0ZUNvbXBsZXRlYCBwcm9taXNlLlxuICAgKlxuICAgKiBJdCBpcyBub3Qgc2FmZSB0byBvdmVycmlkZSB0aGUgYHVwZGF0ZUNvbXBsZXRlYCBnZXR0ZXIgZGlyZWN0bHkgZHVlIHRvIGFcbiAgICogbGltaXRhdGlvbiBpbiBUeXBlU2NyaXB0IHdoaWNoIG1lYW5zIGl0IGlzIG5vdCBwb3NzaWJsZSB0byBjYWxsIGFcbiAgICogc3VwZXJjbGFzcyBnZXR0ZXIgKGUuZy4gYHN1cGVyLnVwZGF0ZUNvbXBsZXRlLnRoZW4oLi4uKWApIHdoZW4gdGhlIHRhcmdldFxuICAgKiBsYW5ndWFnZSBpcyBFUzUgKGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMzM4KS5cbiAgICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRkZW4gaW5zdGVhZC4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGNsYXNzIE15RWxlbWVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICAgKiAgIG92ZXJyaWRlIGFzeW5jIGdldFVwZGF0ZUNvbXBsZXRlKCkge1xuICAgKiAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3VwZXIuZ2V0VXBkYXRlQ29tcGxldGUoKTtcbiAgICogICAgIGF3YWl0IHRoaXMuX215Q2hpbGQudXBkYXRlQ29tcGxldGU7XG4gICAqICAgICByZXR1cm4gcmVzdWx0O1xuICAgKiAgIH1cbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQHJldHVybiBBIHByb21pc2Ugb2YgYSBib29sZWFuIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgdXBkYXRlIGNvbXBsZXRlZFxuICAgKiAgICAgd2l0aG91dCB0cmlnZ2VyaW5nIGFub3RoZXIgdXBkYXRlLlxuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIGdldFVwZGF0ZUNvbXBsZXRlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9fdXBkYXRlUHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCBgdXBkYXRlKClgIHNob3VsZCBiZSBjYWxsZWQgd2hlbiB0aGUgZWxlbWVudCByZXF1ZXN0c1xuICAgKiBhbiB1cGRhdGUuIEJ5IGRlZmF1bHQsIHRoaXMgbWV0aG9kIGFsd2F5cyByZXR1cm5zIGB0cnVlYCwgYnV0IHRoaXMgY2FuIGJlXG4gICAqIGN1c3RvbWl6ZWQgdG8gY29udHJvbCB3aGVuIHRvIHVwZGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHNob3VsZFVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZWxlbWVudC4gVGhpcyBtZXRob2QgcmVmbGVjdHMgcHJvcGVydHkgdmFsdWVzIHRvIGF0dHJpYnV0ZXMuXG4gICAqIEl0IGNhbiBiZSBvdmVycmlkZGVuIHRvIHJlbmRlciBhbmQga2VlcCB1cGRhdGVkIGVsZW1lbnQgRE9NLlxuICAgKiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlIHRoaXMgbWV0aG9kIHdpbGwgKm5vdCogdHJpZ2dlclxuICAgKiBhbm90aGVyIHVwZGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKSB7XG4gICAgLy8gVGhlIGZvckVhY2goKSBleHByZXNzaW9uIHdpbGwgb25seSBydW4gd2hlbiBfX3JlZmxlY3RpbmdQcm9wZXJ0aWVzIGlzXG4gICAgLy8gZGVmaW5lZCwgYW5kIGl0IHJldHVybnMgdW5kZWZpbmVkLCBzZXR0aW5nIF9fcmVmbGVjdGluZ1Byb3BlcnRpZXMgdG9cbiAgICAvLyB1bmRlZmluZWRcbiAgICB0aGlzLl9fcmVmbGVjdGluZ1Byb3BlcnRpZXMgJiY9IHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydGllcy5mb3JFYWNoKChwKSA9PlxuICAgICAgdGhpcy5fX3Byb3BlcnR5VG9BdHRyaWJ1dGUocCwgdGhpc1twIGFzIGtleW9mIHRoaXNdKVxuICAgICkgYXMgdW5kZWZpbmVkO1xuICAgIHRoaXMuX19tYXJrVXBkYXRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbmV2ZXIgdGhlIGVsZW1lbnQgaXMgdXBkYXRlZC4gSW1wbGVtZW50IHRvIHBlcmZvcm1cbiAgICogcG9zdC11cGRhdGluZyB0YXNrcyB2aWEgRE9NIEFQSXMsIGZvciBleGFtcGxlLCBmb2N1c2luZyBhbiBlbGVtZW50LlxuICAgKlxuICAgKiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlIHRoaXMgbWV0aG9kIHdpbGwgdHJpZ2dlciB0aGUgZWxlbWVudCB0byB1cGRhdGVcbiAgICogYWdhaW4gYWZ0ZXIgdGhpcyB1cGRhdGUgY3ljbGUgY29tcGxldGVzLlxuICAgKlxuICAgKiBAcGFyYW0gX2NoYW5nZWRQcm9wZXJ0aWVzIE1hcCBvZiBjaGFuZ2VkIHByb3BlcnRpZXMgd2l0aCBvbGQgdmFsdWVzXG4gICAqIEBjYXRlZ29yeSB1cGRhdGVzXG4gICAqL1xuICBwcm90ZWN0ZWQgdXBkYXRlZChfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKSB7fVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGVsZW1lbnQgaXMgZmlyc3QgdXBkYXRlZC4gSW1wbGVtZW50IHRvIHBlcmZvcm0gb25lIHRpbWVcbiAgICogd29yayBvbiB0aGUgZWxlbWVudCBhZnRlciB1cGRhdGUuXG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGZpcnN0VXBkYXRlZCgpIHtcbiAgICogICB0aGlzLnJlbmRlclJvb3QuZ2V0RWxlbWVudEJ5SWQoJ215LXRleHQtYXJlYScpLmZvY3VzKCk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCB0cmlnZ2VyIHRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICAgKiBhZ2FpbiBhZnRlciB0aGlzIHVwZGF0ZSBjeWNsZSBjb21wbGV0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSBfY2hhbmdlZFByb3BlcnRpZXMgTWFwIG9mIGNoYW5nZWQgcHJvcGVydGllcyB3aXRoIG9sZCB2YWx1ZXNcbiAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICovXG4gIHByb3RlY3RlZCBmaXJzdFVwZGF0ZWQoX2NoYW5nZWRQcm9wZXJ0aWVzOiBQcm9wZXJ0eVZhbHVlcykge31cbn1cbi8vIEFzc2lnbmVkIGhlcmUgdG8gd29yayBhcm91bmQgYSBqc2NvbXBpbGVyIGJ1ZyB3aXRoIHN0YXRpYyBmaWVsZHNcbi8vIHdoZW4gY29tcGlsaW5nIHRvIEVTNS5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1jb21waWxlci9pc3N1ZXMvMzE3N1xuKFJlYWN0aXZlRWxlbWVudCBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVtcbiAgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnZWxlbWVudFByb3BlcnRpZXMnLCBSZWFjdGl2ZUVsZW1lbnQpXG5dID0gbmV3IE1hcCgpO1xuKFJlYWN0aXZlRWxlbWVudCBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVtcbiAgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnZmluYWxpemVkJywgUmVhY3RpdmVFbGVtZW50KVxuXSA9IG5ldyBNYXAoKTtcblxuLy8gQXBwbHkgcG9seWZpbGxzIGlmIGF2YWlsYWJsZVxucG9seWZpbGxTdXBwb3J0Py4oe1JlYWN0aXZlRWxlbWVudH0pO1xuXG4vLyBEZXYgbW9kZSB3YXJuaW5ncy4uLlxuaWYgKERFVl9NT0RFKSB7XG4gIC8vIERlZmF1bHQgd2FybmluZyBzZXQuXG4gIFJlYWN0aXZlRWxlbWVudC5lbmFibGVkV2FybmluZ3MgPSBbXG4gICAgJ2NoYW5nZS1pbi11cGRhdGUnLFxuICAgICdhc3luYy1wZXJmb3JtLXVwZGF0ZScsXG4gIF07XG4gIGNvbnN0IGVuc3VyZU93bldhcm5pbmdzID0gZnVuY3Rpb24gKGN0b3I6IHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpIHtcbiAgICBpZiAoXG4gICAgICAhY3Rvci5oYXNPd25Qcm9wZXJ0eShKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdlbmFibGVkV2FybmluZ3MnLCBjdG9yKSlcbiAgICApIHtcbiAgICAgIGN0b3IuZW5hYmxlZFdhcm5pbmdzID0gY3Rvci5lbmFibGVkV2FybmluZ3MhLnNsaWNlKCk7XG4gICAgfVxuICB9O1xuICBSZWFjdGl2ZUVsZW1lbnQuZW5hYmxlV2FybmluZyA9IGZ1bmN0aW9uIChcbiAgICB0aGlzOiB0eXBlb2YgUmVhY3RpdmVFbGVtZW50LFxuICAgIHdhcm5pbmc6IFdhcm5pbmdLaW5kXG4gICkge1xuICAgIGVuc3VyZU93bldhcm5pbmdzKHRoaXMpO1xuICAgIGlmICghdGhpcy5lbmFibGVkV2FybmluZ3MhLmluY2x1ZGVzKHdhcm5pbmcpKSB7XG4gICAgICB0aGlzLmVuYWJsZWRXYXJuaW5ncyEucHVzaCh3YXJuaW5nKTtcbiAgICB9XG4gIH07XG4gIFJlYWN0aXZlRWxlbWVudC5kaXNhYmxlV2FybmluZyA9IGZ1bmN0aW9uIChcbiAgICB0aGlzOiB0eXBlb2YgUmVhY3RpdmVFbGVtZW50LFxuICAgIHdhcm5pbmc6IFdhcm5pbmdLaW5kXG4gICkge1xuICAgIGVuc3VyZU93bldhcm5pbmdzKHRoaXMpO1xuICAgIGNvbnN0IGkgPSB0aGlzLmVuYWJsZWRXYXJuaW5ncyEuaW5kZXhPZih3YXJuaW5nKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICB0aGlzLmVuYWJsZWRXYXJuaW5ncyEuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gSU1QT1JUQU5UOiBkbyBub3QgY2hhbmdlIHRoZSBwcm9wZXJ0eSBuYW1lIG9yIHRoZSBhc3NpZ25tZW50IGV4cHJlc3Npb24uXG4vLyBUaGlzIGxpbmUgd2lsbCBiZSB1c2VkIGluIHJlZ2V4ZXMgdG8gc2VhcmNoIGZvciBSZWFjdGl2ZUVsZW1lbnQgdXNhZ2UuXG4oZ2xvYmFsLnJlYWN0aXZlRWxlbWVudFZlcnNpb25zID8/PSBbXSkucHVzaCgnMi4xLjInKTtcbmlmIChERVZfTU9ERSAmJiBnbG9iYWwucmVhY3RpdmVFbGVtZW50VmVyc2lvbnMubGVuZ3RoID4gMSkge1xuICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgaXNzdWVXYXJuaW5nIShcbiAgICAgICdtdWx0aXBsZS12ZXJzaW9ucycsXG4gICAgICBgTXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0IGxvYWRlZC4gTG9hZGluZyBtdWx0aXBsZSB2ZXJzaW9ucyBgICtcbiAgICAgICAgYGlzIG5vdCByZWNvbW1lbmRlZC5gXG4gICAgKTtcbiAgfSk7XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8vIElNUE9SVEFOVDogdGhlc2UgaW1wb3J0cyBtdXN0IGJlIHR5cGUtb25seVxuaW1wb3J0IHR5cGUge0RpcmVjdGl2ZSwgRGlyZWN0aXZlUmVzdWx0LCBQYXJ0SW5mb30gZnJvbSAnLi9kaXJlY3RpdmUuanMnO1xuaW1wb3J0IHR5cGUge1RydXN0ZWRIVE1MLCBUcnVzdGVkVHlwZXNXaW5kb3d9IGZyb20gJ3RydXN0ZWQtdHlwZXMvbGliL2luZGV4LmpzJztcblxuY29uc3QgREVWX01PREUgPSB0cnVlO1xuY29uc3QgRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTID0gdHJ1ZTtcbmNvbnN0IEVOQUJMRV9TSEFEWURPTV9OT1BBVENIID0gdHJ1ZTtcbmNvbnN0IE5PREVfTU9ERSA9IGZhbHNlO1xuXG4vLyBBbGxvd3MgbWluaWZpZXJzIHRvIHJlbmFtZSByZWZlcmVuY2VzIHRvIGdsb2JhbFRoaXNcbmNvbnN0IGdsb2JhbCA9IGdsb2JhbFRoaXM7XG5cbi8qKlxuICogQ29udGFpbnMgdHlwZXMgdGhhdCBhcmUgcGFydCBvZiB0aGUgdW5zdGFibGUgZGVidWcgQVBJLlxuICpcbiAqIEV2ZXJ5dGhpbmcgaW4gdGhpcyBBUEkgaXMgbm90IHN0YWJsZSBhbmQgbWF5IGNoYW5nZSBvciBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsXG4gKiBldmVuIG9uIHBhdGNoIHJlbGVhc2VzLlxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxuZXhwb3J0IG5hbWVzcGFjZSBMaXRVbnN0YWJsZSB7XG4gIC8qKlxuICAgKiBXaGVuIExpdCBpcyBydW5uaW5nIGluIGRldiBtb2RlIGFuZCBgd2luZG93LmVtaXRMaXREZWJ1Z0xvZ0V2ZW50c2AgaXMgdHJ1ZSxcbiAgICogd2Ugd2lsbCBlbWl0ICdsaXQtZGVidWcnIGV2ZW50cyB0byB3aW5kb3csIHdpdGggbGl2ZSBkZXRhaWxzIGFib3V0IHRoZSB1cGRhdGUgYW5kIHJlbmRlclxuICAgKiBsaWZlY3ljbGUuIFRoZXNlIGNhbiBiZSB1c2VmdWwgZm9yIHdyaXRpbmcgZGVidWcgdG9vbGluZyBhbmQgdmlzdWFsaXphdGlvbnMuXG4gICAqXG4gICAqIFBsZWFzZSBiZSBhd2FyZSB0aGF0IHJ1bm5pbmcgd2l0aCB3aW5kb3cuZW1pdExpdERlYnVnTG9nRXZlbnRzIGhhcyBwZXJmb3JtYW5jZSBvdmVyaGVhZCxcbiAgICogbWFraW5nIGNlcnRhaW4gb3BlcmF0aW9ucyB0aGF0IGFyZSBub3JtYWxseSB2ZXJ5IGNoZWFwIChsaWtlIGEgbm8tb3AgcmVuZGVyKSBtdWNoIHNsb3dlcixcbiAgICogYmVjYXVzZSB3ZSBtdXN0IGNvcHkgZGF0YSBhbmQgZGlzcGF0Y2ggZXZlbnRzLlxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbiAgZXhwb3J0IG5hbWVzcGFjZSBEZWJ1Z0xvZyB7XG4gICAgZXhwb3J0IHR5cGUgRW50cnkgPVxuICAgICAgfCBUZW1wbGF0ZVByZXBcbiAgICAgIHwgVGVtcGxhdGVJbnN0YW50aWF0ZWRcbiAgICAgIHwgVGVtcGxhdGVJbnN0YW50aWF0ZWRBbmRVcGRhdGVkXG4gICAgICB8IFRlbXBsYXRlVXBkYXRpbmdcbiAgICAgIHwgQmVnaW5SZW5kZXJcbiAgICAgIHwgRW5kUmVuZGVyXG4gICAgICB8IENvbW1pdFBhcnRFbnRyeVxuICAgICAgfCBTZXRQYXJ0VmFsdWU7XG4gICAgZXhwb3J0IGludGVyZmFjZSBUZW1wbGF0ZVByZXAge1xuICAgICAga2luZDogJ3RlbXBsYXRlIHByZXAnO1xuICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlO1xuICAgICAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXk7XG4gICAgICBjbG9uYWJsZVRlbXBsYXRlOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgICAgcGFydHM6IFRlbXBsYXRlUGFydFtdO1xuICAgIH1cbiAgICBleHBvcnQgaW50ZXJmYWNlIEJlZ2luUmVuZGVyIHtcbiAgICAgIGtpbmQ6ICdiZWdpbiByZW5kZXInO1xuICAgICAgaWQ6IG51bWJlcjtcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgY29udGFpbmVyOiBSZW5kZXJSb290Tm9kZTtcbiAgICAgIG9wdGlvbnM6IFJlbmRlck9wdGlvbnMgfCB1bmRlZmluZWQ7XG4gICAgICBwYXJ0OiBDaGlsZFBhcnQgfCB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGV4cG9ydCBpbnRlcmZhY2UgRW5kUmVuZGVyIHtcbiAgICAgIGtpbmQ6ICdlbmQgcmVuZGVyJztcbiAgICAgIGlkOiBudW1iZXI7XG4gICAgICB2YWx1ZTogdW5rbm93bjtcbiAgICAgIGNvbnRhaW5lcjogUmVuZGVyUm9vdE5vZGU7XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgICAgcGFydDogQ2hpbGRQYXJ0O1xuICAgIH1cbiAgICBleHBvcnQgaW50ZXJmYWNlIFRlbXBsYXRlSW5zdGFudGlhdGVkIHtcbiAgICAgIGtpbmQ6ICd0ZW1wbGF0ZSBpbnN0YW50aWF0ZWQnO1xuICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlIHwgQ29tcGlsZWRUZW1wbGF0ZTtcbiAgICAgIGluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAgIGZyYWdtZW50OiBOb2RlO1xuICAgICAgcGFydHM6IEFycmF5PFBhcnQgfCB1bmRlZmluZWQ+O1xuICAgICAgdmFsdWVzOiB1bmtub3duW107XG4gICAgfVxuICAgIGV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVJbnN0YW50aWF0ZWRBbmRVcGRhdGVkIHtcbiAgICAgIGtpbmQ6ICd0ZW1wbGF0ZSBpbnN0YW50aWF0ZWQgYW5kIHVwZGF0ZWQnO1xuICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlIHwgQ29tcGlsZWRUZW1wbGF0ZTtcbiAgICAgIGluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAgIGZyYWdtZW50OiBOb2RlO1xuICAgICAgcGFydHM6IEFycmF5PFBhcnQgfCB1bmRlZmluZWQ+O1xuICAgICAgdmFsdWVzOiB1bmtub3duW107XG4gICAgfVxuICAgIGV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVVcGRhdGluZyB7XG4gICAgICBraW5kOiAndGVtcGxhdGUgdXBkYXRpbmcnO1xuICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlIHwgQ29tcGlsZWRUZW1wbGF0ZTtcbiAgICAgIGluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAgIHBhcnRzOiBBcnJheTxQYXJ0IHwgdW5kZWZpbmVkPjtcbiAgICAgIHZhbHVlczogdW5rbm93bltdO1xuICAgIH1cbiAgICBleHBvcnQgaW50ZXJmYWNlIFNldFBhcnRWYWx1ZSB7XG4gICAgICBraW5kOiAnc2V0IHBhcnQnO1xuICAgICAgcGFydDogUGFydDtcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgdmFsdWVJbmRleDogbnVtYmVyO1xuICAgICAgdmFsdWVzOiB1bmtub3duW107XG4gICAgICB0ZW1wbGF0ZUluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlO1xuICAgIH1cblxuICAgIGV4cG9ydCB0eXBlIENvbW1pdFBhcnRFbnRyeSA9XG4gICAgICB8IENvbW1pdE5vdGhpbmdUb0NoaWxkRW50cnlcbiAgICAgIHwgQ29tbWl0VGV4dFxuICAgICAgfCBDb21taXROb2RlXG4gICAgICB8IENvbW1pdEF0dHJpYnV0ZVxuICAgICAgfCBDb21taXRQcm9wZXJ0eVxuICAgICAgfCBDb21taXRCb29sZWFuQXR0cmlidXRlXG4gICAgICB8IENvbW1pdEV2ZW50TGlzdGVuZXJcbiAgICAgIHwgQ29tbWl0VG9FbGVtZW50QmluZGluZztcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0Tm90aGluZ1RvQ2hpbGRFbnRyeSB7XG4gICAgICBraW5kOiAnY29tbWl0IG5vdGhpbmcgdG8gY2hpbGQnO1xuICAgICAgc3RhcnQ6IENoaWxkTm9kZTtcbiAgICAgIGVuZDogQ2hpbGROb2RlIHwgbnVsbDtcbiAgICAgIHBhcmVudDogRGlzY29ubmVjdGFibGUgfCB1bmRlZmluZWQ7XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0VGV4dCB7XG4gICAgICBraW5kOiAnY29tbWl0IHRleHQnO1xuICAgICAgbm9kZTogVGV4dDtcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIENvbW1pdE5vZGUge1xuICAgICAga2luZDogJ2NvbW1pdCBub2RlJztcbiAgICAgIHN0YXJ0OiBOb2RlO1xuICAgICAgcGFyZW50OiBEaXNjb25uZWN0YWJsZSB8IHVuZGVmaW5lZDtcbiAgICAgIHZhbHVlOiBOb2RlO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIENvbW1pdEF0dHJpYnV0ZSB7XG4gICAgICBraW5kOiAnY29tbWl0IGF0dHJpYnV0ZSc7XG4gICAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgdmFsdWU6IHVua25vd247XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0UHJvcGVydHkge1xuICAgICAga2luZDogJ2NvbW1pdCBwcm9wZXJ0eSc7XG4gICAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgdmFsdWU6IHVua25vd247XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ29tbWl0Qm9vbGVhbkF0dHJpYnV0ZSB7XG4gICAgICBraW5kOiAnY29tbWl0IGJvb2xlYW4gYXR0cmlidXRlJztcbiAgICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICB2YWx1ZTogYm9vbGVhbjtcbiAgICAgIG9wdGlvbnM6IFJlbmRlck9wdGlvbnMgfCB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBDb21taXRFdmVudExpc3RlbmVyIHtcbiAgICAgIGtpbmQ6ICdjb21taXQgZXZlbnQgbGlzdGVuZXInO1xuICAgICAgZWxlbWVudDogRWxlbWVudDtcbiAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgb2xkTGlzdGVuZXI6IHVua25vd247XG4gICAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgICAgLy8gVHJ1ZSBpZiB3ZSdyZSByZW1vdmluZyB0aGUgb2xkIGV2ZW50IGxpc3RlbmVyIChlLmcuIGJlY2F1c2Ugc2V0dGluZ3MgY2hhbmdlZCwgb3IgdmFsdWUgaXMgbm90aGluZylcbiAgICAgIHJlbW92ZUxpc3RlbmVyOiBib29sZWFuO1xuICAgICAgLy8gVHJ1ZSBpZiB3ZSdyZSBhZGRpbmcgYSBuZXcgZXZlbnQgbGlzdGVuZXIgKGUuZy4gYmVjYXVzZSBmaXJzdCByZW5kZXIsIG9yIHNldHRpbmdzIGNoYW5nZWQpXG4gICAgICBhZGRMaXN0ZW5lcjogYm9vbGVhbjtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIENvbW1pdFRvRWxlbWVudEJpbmRpbmcge1xuICAgICAga2luZDogJ2NvbW1pdCB0byBlbGVtZW50IGJpbmRpbmcnO1xuICAgICAgZWxlbWVudDogRWxlbWVudDtcbiAgICAgIHZhbHVlOiB1bmtub3duO1xuICAgICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlYnVnTG9nZ2luZ1dpbmRvdyB7XG4gIC8vIEV2ZW4gaW4gZGV2IG1vZGUsIHdlIGdlbmVyYWxseSBkb24ndCB3YW50IHRvIGVtaXQgdGhlc2UgZXZlbnRzLCBhcyB0aGF0J3NcbiAgLy8gYW5vdGhlciBsZXZlbCBvZiBjb3N0LCBzbyBvbmx5IGVtaXQgdGhlbSB3aGVuIERFVl9NT0RFIGlzIHRydWUgX2FuZF8gd2hlblxuICAvLyB3aW5kb3cuZW1pdExpdERlYnVnRXZlbnRzIGlzIHRydWUuXG4gIGVtaXRMaXREZWJ1Z0xvZ0V2ZW50cz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogVXNlZnVsIGZvciB2aXN1YWxpemluZyBhbmQgbG9nZ2luZyBpbnNpZ2h0cyBpbnRvIHdoYXQgdGhlIExpdCB0ZW1wbGF0ZSBzeXN0ZW0gaXMgZG9pbmcuXG4gKlxuICogQ29tcGlsZWQgb3V0IG9mIHByb2QgbW9kZSBidWlsZHMuXG4gKi9cbmNvbnN0IGRlYnVnTG9nRXZlbnQgPSBERVZfTU9ERVxuICA/IChldmVudDogTGl0VW5zdGFibGUuRGVidWdMb2cuRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHNob3VsZEVtaXQgPSAoZ2xvYmFsIGFzIHVua25vd24gYXMgRGVidWdMb2dnaW5nV2luZG93KVxuICAgICAgICAuZW1pdExpdERlYnVnTG9nRXZlbnRzO1xuICAgICAgaWYgKCFzaG91bGRFbWl0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGdsb2JhbC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQ8TGl0VW5zdGFibGUuRGVidWdMb2cuRW50cnk+KCdsaXQtZGVidWcnLCB7XG4gICAgICAgICAgZGV0YWlsOiBldmVudCxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICA6IHVuZGVmaW5lZDtcbi8vIFVzZWQgZm9yIGNvbm5lY3RpbmcgYmVnaW5SZW5kZXIgYW5kIGVuZFJlbmRlciBldmVudHMgd2hlbiB0aGVyZSBhcmUgbmVzdGVkXG4vLyByZW5kZXJzIHdoZW4gZXJyb3JzIGFyZSB0aHJvd24gcHJldmVudGluZyBhbiBlbmRSZW5kZXIgZXZlbnQgZnJvbSBiZWluZ1xuLy8gY2FsbGVkLlxubGV0IGRlYnVnTG9nUmVuZGVySWQgPSAwO1xuXG5sZXQgaXNzdWVXYXJuaW5nOiAoY29kZTogc3RyaW5nLCB3YXJuaW5nOiBzdHJpbmcpID0+IHZvaWQ7XG5cbmlmIChERVZfTU9ERSkge1xuICBnbG9iYWwubGl0SXNzdWVkV2FybmluZ3MgPz89IG5ldyBTZXQoKTtcblxuICAvKipcbiAgICogSXNzdWUgYSB3YXJuaW5nIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgYmFzZWQgZWl0aGVyIG9uIGBjb2RlYCBvciBgd2FybmluZ2AuXG4gICAqIFdhcm5pbmdzIGFyZSBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5IG9ubHkgYnkgYHdhcm5pbmdgOyBkaXNhYmxpbmcgdmlhIGBjb2RlYFxuICAgKiBjYW4gYmUgZG9uZSBieSB1c2Vycy5cbiAgICovXG4gIGlzc3VlV2FybmluZyA9IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4ge1xuICAgIHdhcm5pbmcgKz0gY29kZVxuICAgICAgPyBgIFNlZSBodHRwczovL2xpdC5kZXYvbXNnLyR7Y29kZX0gZm9yIG1vcmUgaW5mb3JtYXRpb24uYFxuICAgICAgOiAnJztcbiAgICBpZiAoXG4gICAgICAhZ2xvYmFsLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMod2FybmluZykgJiZcbiAgICAgICFnbG9iYWwubGl0SXNzdWVkV2FybmluZ3MhLmhhcyhjb2RlKVxuICAgICkge1xuICAgICAgY29uc29sZS53YXJuKHdhcm5pbmcpO1xuICAgICAgZ2xvYmFsLmxpdElzc3VlZFdhcm5pbmdzIS5hZGQod2FybmluZyk7XG4gICAgfVxuICB9O1xuXG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAnZGV2LW1vZGUnLFxuICAgICAgYExpdCBpcyBpbiBkZXYgbW9kZS4gTm90IHJlY29tbWVuZGVkIGZvciBwcm9kdWN0aW9uIWBcbiAgICApO1xuICB9KTtcbn1cblxuY29uc3Qgd3JhcCA9XG4gIEVOQUJMRV9TSEFEWURPTV9OT1BBVENIICYmXG4gIGdsb2JhbC5TaGFkeURPTT8uaW5Vc2UgJiZcbiAgZ2xvYmFsLlNoYWR5RE9NPy5ub1BhdGNoID09PSB0cnVlXG4gICAgPyAoZ2xvYmFsLlNoYWR5RE9NIS53cmFwIGFzIDxUIGV4dGVuZHMgTm9kZT4obm9kZTogVCkgPT4gVClcbiAgICA6IDxUIGV4dGVuZHMgTm9kZT4obm9kZTogVCkgPT4gbm9kZTtcblxuY29uc3QgdHJ1c3RlZFR5cGVzID0gKGdsb2JhbCBhcyB1bmtub3duIGFzIFRydXN0ZWRUeXBlc1dpbmRvdykudHJ1c3RlZFR5cGVzO1xuXG4vKipcbiAqIE91ciBUcnVzdGVkVHlwZVBvbGljeSBmb3IgSFRNTCB3aGljaCBpcyBkZWNsYXJlZCB1c2luZyB0aGUgaHRtbCB0ZW1wbGF0ZVxuICogdGFnIGZ1bmN0aW9uLlxuICpcbiAqIFRoYXQgSFRNTCBpcyBhIGRldmVsb3Blci1hdXRob3JlZCBjb25zdGFudCwgYW5kIGlzIHBhcnNlZCB3aXRoIGlubmVySFRNTFxuICogYmVmb3JlIGFueSB1bnRydXN0ZWQgZXhwcmVzc2lvbnMgaGF2ZSBiZWVuIG1peGVkIGluLiBUaGVyZWZvciBpdCBpc1xuICogY29uc2lkZXJlZCBzYWZlIGJ5IGNvbnN0cnVjdGlvbi5cbiAqL1xuY29uc3QgcG9saWN5ID0gdHJ1c3RlZFR5cGVzXG4gID8gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSgnbGl0LWh0bWwnLCB7XG4gICAgICBjcmVhdGVIVE1MOiAocykgPT4gcyxcbiAgICB9KVxuICA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBVc2VkIHRvIHNhbml0aXplIGFueSB2YWx1ZSBiZWZvcmUgaXQgaXMgd3JpdHRlbiBpbnRvIHRoZSBET00uIFRoaXMgY2FuIGJlXG4gKiB1c2VkIHRvIGltcGxlbWVudCBhIHNlY3VyaXR5IHBvbGljeSBvZiBhbGxvd2VkIGFuZCBkaXNhbGxvd2VkIHZhbHVlcyBpblxuICogb3JkZXIgdG8gcHJldmVudCBYU1MgYXR0YWNrcy5cbiAqXG4gKiBPbmUgd2F5IG9mIHVzaW5nIHRoaXMgY2FsbGJhY2sgd291bGQgYmUgdG8gY2hlY2sgYXR0cmlidXRlcyBhbmQgcHJvcGVydGllc1xuICogYWdhaW5zdCBhIGxpc3Qgb2YgaGlnaCByaXNrIGZpZWxkcywgYW5kIHJlcXVpcmUgdGhhdCB2YWx1ZXMgd3JpdHRlbiB0byBzdWNoXG4gKiBmaWVsZHMgYmUgaW5zdGFuY2VzIG9mIGEgY2xhc3Mgd2hpY2ggaXMgc2FmZSBieSBjb25zdHJ1Y3Rpb24uIENsb3N1cmUncyBTYWZlXG4gKiBIVE1MIFR5cGVzIGlzIG9uZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIHRlY2huaXF1ZSAoXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL3NhZmUtaHRtbC10eXBlcy9ibG9iL21hc3Rlci9kb2Mvc2FmZWh0bWwtdHlwZXMubWQpLlxuICogVGhlIFRydXN0ZWRUeXBlcyBwb2x5ZmlsbCBpbiBBUEktb25seSBtb2RlIGNvdWxkIGFsc28gYmUgdXNlZCBhcyBhIGJhc2lzXG4gKiBmb3IgdGhpcyB0ZWNobmlxdWUgKGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL3RydXN0ZWQtdHlwZXMpLlxuICpcbiAqIEBwYXJhbSBub2RlIFRoZSBIVE1MIG5vZGUgKHVzdWFsbHkgZWl0aGVyIGEgI3RleHQgbm9kZSBvciBhbiBFbGVtZW50KSB0aGF0XG4gKiAgICAgaXMgYmVpbmcgd3JpdHRlbiB0by4gTm90ZSB0aGF0IHRoaXMgaXMganVzdCBhbiBleGVtcGxhciBub2RlLCB0aGUgd3JpdGVcbiAqICAgICBtYXkgdGFrZSBwbGFjZSBhZ2FpbnN0IGFub3RoZXIgaW5zdGFuY2Ugb2YgdGhlIHNhbWUgY2xhc3Mgb2Ygbm9kZS5cbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIGFuIGF0dHJpYnV0ZSBvciBwcm9wZXJ0eSAoZm9yIGV4YW1wbGUsICdocmVmJykuXG4gKiBAcGFyYW0gdHlwZSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgd3JpdGUgdGhhdCdzIGFib3V0IHRvIGJlIHBlcmZvcm1lZCB3aWxsXG4gKiAgICAgYmUgdG8gYSBwcm9wZXJ0eSBvciBhIG5vZGUuXG4gKiBAcmV0dXJuIEEgZnVuY3Rpb24gdGhhdCB3aWxsIHNhbml0aXplIHRoaXMgY2xhc3Mgb2Ygd3JpdGVzLlxuICovXG5leHBvcnQgdHlwZSBTYW5pdGl6ZXJGYWN0b3J5ID0gKFxuICBub2RlOiBOb2RlLFxuICBuYW1lOiBzdHJpbmcsXG4gIHR5cGU6ICdwcm9wZXJ0eScgfCAnYXR0cmlidXRlJ1xuKSA9PiBWYWx1ZVNhbml0aXplcjtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIGNhbiBzYW5pdGl6ZSB2YWx1ZXMgdGhhdCB3aWxsIGJlIHdyaXR0ZW4gdG8gYSBzcGVjaWZpYyBraW5kXG4gKiBvZiBET00gc2luay5cbiAqXG4gKiBTZWUgU2FuaXRpemVyRmFjdG9yeS5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHNhbml0aXplLiBXaWxsIGJlIHRoZSBhY3R1YWwgdmFsdWUgcGFzc2VkIGludG9cbiAqICAgICB0aGUgbGl0LWh0bWwgdGVtcGxhdGUgbGl0ZXJhbCwgc28gdGhpcyBjb3VsZCBiZSBvZiBhbnkgdHlwZS5cbiAqIEByZXR1cm4gVGhlIHZhbHVlIHRvIHdyaXRlIHRvIHRoZSBET00uIFVzdWFsbHkgdGhlIHNhbWUgYXMgdGhlIGlucHV0IHZhbHVlLFxuICogICAgIHVubGVzcyBzYW5pdGl6YXRpb24gaXMgbmVlZGVkLlxuICovXG5leHBvcnQgdHlwZSBWYWx1ZVNhbml0aXplciA9ICh2YWx1ZTogdW5rbm93bikgPT4gdW5rbm93bjtcblxuY29uc3QgaWRlbnRpdHlGdW5jdGlvbjogVmFsdWVTYW5pdGl6ZXIgPSAodmFsdWU6IHVua25vd24pID0+IHZhbHVlO1xuY29uc3Qgbm9vcFNhbml0aXplcjogU2FuaXRpemVyRmFjdG9yeSA9IChcbiAgX25vZGU6IE5vZGUsXG4gIF9uYW1lOiBzdHJpbmcsXG4gIF90eXBlOiAncHJvcGVydHknIHwgJ2F0dHJpYnV0ZSdcbikgPT4gaWRlbnRpdHlGdW5jdGlvbjtcblxuLyoqIFNldHMgdGhlIGdsb2JhbCBzYW5pdGl6ZXIgZmFjdG9yeS4gKi9cbmNvbnN0IHNldFNhbml0aXplciA9IChuZXdTYW5pdGl6ZXI6IFNhbml0aXplckZhY3RvcnkpID0+IHtcbiAgaWYgKCFFTkFCTEVfRVhUUkFfU0VDVVJJVFlfSE9PS1MpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHNhbml0aXplckZhY3RvcnlJbnRlcm5hbCAhPT0gbm9vcFNhbml0aXplcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBBdHRlbXB0ZWQgdG8gb3ZlcndyaXRlIGV4aXN0aW5nIGxpdC1odG1sIHNlY3VyaXR5IHBvbGljeS5gICtcbiAgICAgICAgYCBzZXRTYW5pdGl6ZURPTVZhbHVlRmFjdG9yeSBzaG91bGQgYmUgY2FsbGVkIGF0IG1vc3Qgb25jZS5gXG4gICAgKTtcbiAgfVxuICBzYW5pdGl6ZXJGYWN0b3J5SW50ZXJuYWwgPSBuZXdTYW5pdGl6ZXI7XG59O1xuXG4vKipcbiAqIE9ubHkgdXNlZCBpbiBpbnRlcm5hbCB0ZXN0cywgbm90IGEgcGFydCBvZiB0aGUgcHVibGljIEFQSS5cbiAqL1xuY29uc3QgX3Rlc3RPbmx5Q2xlYXJTYW5pdGl6ZXJGYWN0b3J5RG9Ob3RDYWxsT3JFbHNlID0gKCkgPT4ge1xuICBzYW5pdGl6ZXJGYWN0b3J5SW50ZXJuYWwgPSBub29wU2FuaXRpemVyO1xufTtcblxuY29uc3QgY3JlYXRlU2FuaXRpemVyOiBTYW5pdGl6ZXJGYWN0b3J5ID0gKG5vZGUsIG5hbWUsIHR5cGUpID0+IHtcbiAgcmV0dXJuIHNhbml0aXplckZhY3RvcnlJbnRlcm5hbChub2RlLCBuYW1lLCB0eXBlKTtcbn07XG5cbi8vIEFkZGVkIHRvIGFuIGF0dHJpYnV0ZSBuYW1lIHRvIG1hcmsgdGhlIGF0dHJpYnV0ZSBhcyBib3VuZCBzbyB3ZSBjYW4gZmluZFxuLy8gaXQgZWFzaWx5LlxuY29uc3QgYm91bmRBdHRyaWJ1dGVTdWZmaXggPSAnJGxpdCQnO1xuXG4vLyBUaGlzIG1hcmtlciBpcyB1c2VkIGluIG1hbnkgc3ludGFjdGljIHBvc2l0aW9ucyBpbiBIVE1MLCBzbyBpdCBtdXN0IGJlXG4vLyBhIHZhbGlkIGVsZW1lbnQgbmFtZSBhbmQgYXR0cmlidXRlIG5hbWUuIFdlIGRvbid0IHN1cHBvcnQgZHluYW1pYyBuYW1lcyAoeWV0KVxuLy8gYnV0IHRoaXMgYXQgbGVhc3QgZW5zdXJlcyB0aGF0IHRoZSBwYXJzZSB0cmVlIGlzIGNsb3NlciB0byB0aGUgdGVtcGxhdGVcbi8vIGludGVudGlvbi5cbmNvbnN0IG1hcmtlciA9IGBsaXQkJHtNYXRoLnJhbmRvbSgpLnRvRml4ZWQoOSkuc2xpY2UoMil9JGA7XG5cbi8vIFN0cmluZyB1c2VkIHRvIHRlbGwgaWYgYSBjb21tZW50IGlzIGEgbWFya2VyIGNvbW1lbnRcbmNvbnN0IG1hcmtlck1hdGNoID0gJz8nICsgbWFya2VyO1xuXG4vLyBUZXh0IHVzZWQgdG8gaW5zZXJ0IGEgY29tbWVudCBtYXJrZXIgbm9kZS4gV2UgdXNlIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb25cbi8vIHN5bnRheCBiZWNhdXNlIGl0J3Mgc2xpZ2h0bHkgc21hbGxlciwgYnV0IHBhcnNlcyBhcyBhIGNvbW1lbnQgbm9kZS5cbmNvbnN0IG5vZGVNYXJrZXIgPSBgPCR7bWFya2VyTWF0Y2h9PmA7XG5cbmNvbnN0IGQgPVxuICBOT0RFX01PREUgJiYgZ2xvYmFsLmRvY3VtZW50ID09PSB1bmRlZmluZWRcbiAgICA/ICh7XG4gICAgICAgIGNyZWF0ZVRyZWVXYWxrZXIoKSB7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9LFxuICAgICAgfSBhcyB1bmtub3duIGFzIERvY3VtZW50KVxuICAgIDogZG9jdW1lbnQ7XG5cbi8vIENyZWF0ZXMgYSBkeW5hbWljIG1hcmtlci4gV2UgbmV2ZXIgaGF2ZSB0byBzZWFyY2ggZm9yIHRoZXNlIGluIHRoZSBET00uXG5jb25zdCBjcmVhdGVNYXJrZXIgPSAoKSA9PiBkLmNyZWF0ZUNvbW1lbnQoJycpO1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10eXBlb2Ytb3BlcmF0b3JcbnR5cGUgUHJpbWl0aXZlID0gbnVsbCB8IHVuZGVmaW5lZCB8IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfCBzeW1ib2wgfCBiaWdpbnQ7XG5jb25zdCBpc1ByaW1pdGl2ZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFByaW1pdGl2ZSA9PlxuICB2YWx1ZSA9PT0gbnVsbCB8fCAodHlwZW9mIHZhbHVlICE9ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSAhPSAnZnVuY3Rpb24nKTtcbmNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuY29uc3QgaXNJdGVyYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIEl0ZXJhYmxlPHVua25vd24+ID0+XG4gIGlzQXJyYXkodmFsdWUpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHR5cGVvZiAodmFsdWUgYXMgYW55KT8uW1N5bWJvbC5pdGVyYXRvcl0gPT09ICdmdW5jdGlvbic7XG5cbmNvbnN0IFNQQUNFX0NIQVIgPSBgWyBcXHRcXG5cXGZcXHJdYDtcbmNvbnN0IEFUVFJfVkFMVUVfQ0hBUiA9IGBbXiBcXHRcXG5cXGZcXHJcIidcXGA8Pj1dYDtcbmNvbnN0IE5BTUVfQ0hBUiA9IGBbXlxcXFxzXCInPj0vXWA7XG5cbi8vIFRoZXNlIHJlZ2V4ZXMgcmVwcmVzZW50IHRoZSBmaXZlIHBhcnNpbmcgc3RhdGVzIHRoYXQgd2UgY2FyZSBhYm91dCBpbiB0aGVcbi8vIFRlbXBsYXRlJ3MgSFRNTCBzY2FubmVyLiBUaGV5IG1hdGNoIHRoZSAqZW5kKiBvZiB0aGUgc3RhdGUgdGhleSdyZSBuYW1lZFxuLy8gYWZ0ZXIuXG4vLyBEZXBlbmRpbmcgb24gdGhlIG1hdGNoLCB3ZSB0cmFuc2l0aW9uIHRvIGEgbmV3IHN0YXRlLiBJZiB0aGVyZSdzIG5vIG1hdGNoLFxuLy8gd2Ugc3RheSBpbiB0aGUgc2FtZSBzdGF0ZS5cbi8vIE5vdGUgdGhhdCB0aGUgcmVnZXhlcyBhcmUgc3RhdGVmdWwuIFdlIHV0aWxpemUgbGFzdEluZGV4IGFuZCBzeW5jIGl0XG4vLyBhY3Jvc3MgdGhlIG11bHRpcGxlIHJlZ2V4ZXMgdXNlZC4gSW4gYWRkaXRpb24gdG8gdGhlIGZpdmUgcmVnZXhlcyBiZWxvd1xuLy8gd2UgYWxzbyBkeW5hbWljYWxseSBjcmVhdGUgYSByZWdleCB0byBmaW5kIHRoZSBtYXRjaGluZyBlbmQgdGFncyBmb3IgcmF3XG4vLyB0ZXh0IGVsZW1lbnRzLlxuXG4vKipcbiAqIEVuZCBvZiB0ZXh0IGlzOiBgPGAgZm9sbG93ZWQgYnk6XG4gKiAgIChjb21tZW50IHN0YXJ0KSBvciAodGFnKSBvciAoZHluYW1pYyB0YWcgYmluZGluZylcbiAqL1xuY29uc3QgdGV4dEVuZFJlZ2V4ID0gLzwoPzooIS0tfFxcL1teYS16QS1aXSl8KFxcLz9bYS16QS1aXVtePlxcc10qKXwoXFwvPyQpKS9nO1xuY29uc3QgQ09NTUVOVF9TVEFSVCA9IDE7XG5jb25zdCBUQUdfTkFNRSA9IDI7XG5jb25zdCBEWU5BTUlDX1RBR19OQU1FID0gMztcblxuY29uc3QgY29tbWVudEVuZFJlZ2V4ID0gLy0tPi9nO1xuLyoqXG4gKiBDb21tZW50cyBub3Qgc3RhcnRlZCB3aXRoIDwhLS0sIGxpa2UgPC97LCBjYW4gYmUgZW5kZWQgYnkgYSBzaW5nbGUgYD5gXG4gKi9cbmNvbnN0IGNvbW1lbnQyRW5kUmVnZXggPSAvPi9nO1xuXG4vKipcbiAqIFRoZSB0YWdFbmQgcmVnZXggbWF0Y2hlcyB0aGUgZW5kIG9mIHRoZSBcImluc2lkZSBhbiBvcGVuaW5nXCIgdGFnIHN5bnRheFxuICogcG9zaXRpb24uIEl0IGVpdGhlciBtYXRjaGVzIGEgYD5gLCBhbiBhdHRyaWJ1dGUtbGlrZSBzZXF1ZW5jZSwgb3IgdGhlIGVuZFxuICogb2YgdGhlIHN0cmluZyBhZnRlciBhIHNwYWNlIChhdHRyaWJ1dGUtbmFtZSBwb3NpdGlvbiBlbmRpbmcpLlxuICpcbiAqIFNlZSBhdHRyaWJ1dGVzIGluIHRoZSBIVE1MIHNwZWM6XG4gKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjZWxlbWVudHMtYXR0cmlidXRlc1xuICpcbiAqIFwiIFxcdFxcblxcZlxcclwiIGFyZSBIVE1MIHNwYWNlIGNoYXJhY3RlcnM6XG4gKiBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jYXNjaWktd2hpdGVzcGFjZVxuICpcbiAqIFNvIGFuIGF0dHJpYnV0ZSBpczpcbiAqICAqIFRoZSBuYW1lOiBhbnkgY2hhcmFjdGVyIGV4Y2VwdCBhIHdoaXRlc3BhY2UgY2hhcmFjdGVyLCAoXCIpLCAoJyksIFwiPlwiLFxuICogICAgXCI9XCIsIG9yIFwiL1wiLiBOb3RlOiB0aGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBIVE1MIHNwZWMgd2hpY2ggYWxzbyBleGNsdWRlcyBjb250cm9sIGNoYXJhY3RlcnMuXG4gKiAgKiBGb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgc3BhY2UgY2hhcmFjdGVyc1xuICogICogRm9sbG93ZWQgYnkgXCI9XCJcbiAqICAqIEZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBzcGFjZSBjaGFyYWN0ZXJzXG4gKiAgKiBGb2xsb3dlZCBieTpcbiAqICAgICogQW55IGNoYXJhY3RlciBleGNlcHQgc3BhY2UsICgnKSwgKFwiKSwgXCI8XCIsIFwiPlwiLCBcIj1cIiwgKGApLCBvclxuICogICAgKiAoXCIpIHRoZW4gYW55IG5vbi0oXCIpLCBvclxuICogICAgKiAoJykgdGhlbiBhbnkgbm9uLSgnKVxuICovXG5jb25zdCB0YWdFbmRSZWdleCA9IG5ldyBSZWdFeHAoXG4gIGA+fCR7U1BBQ0VfQ0hBUn0oPzooJHtOQU1FX0NIQVJ9KykoJHtTUEFDRV9DSEFSfSo9JHtTUEFDRV9DSEFSfSooPzoke0FUVFJfVkFMVUVfQ0hBUn18KFwifCcpfCkpfCQpYCxcbiAgJ2cnXG4pO1xuY29uc3QgRU5USVJFX01BVENIID0gMDtcbmNvbnN0IEFUVFJJQlVURV9OQU1FID0gMTtcbmNvbnN0IFNQQUNFU19BTkRfRVFVQUxTID0gMjtcbmNvbnN0IFFVT1RFX0NIQVIgPSAzO1xuXG5jb25zdCBzaW5nbGVRdW90ZUF0dHJFbmRSZWdleCA9IC8nL2c7XG5jb25zdCBkb3VibGVRdW90ZUF0dHJFbmRSZWdleCA9IC9cIi9nO1xuLyoqXG4gKiBNYXRjaGVzIHRoZSByYXcgdGV4dCBlbGVtZW50cy5cbiAqXG4gKiBDb21tZW50cyBhcmUgbm90IHBhcnNlZCB3aXRoaW4gcmF3IHRleHQgZWxlbWVudHMsIHNvIHdlIG5lZWQgdG8gc2VhcmNoIHRoZWlyXG4gKiB0ZXh0IGNvbnRlbnQgZm9yIG1hcmtlciBzdHJpbmdzLlxuICovXG5jb25zdCByYXdUZXh0RWxlbWVudCA9IC9eKD86c2NyaXB0fHN0eWxlfHRleHRhcmVhfHRpdGxlKSQvaTtcblxuLyoqIFRlbXBsYXRlUmVzdWx0IHR5cGVzICovXG5jb25zdCBIVE1MX1JFU1VMVCA9IDE7XG5jb25zdCBTVkdfUkVTVUxUID0gMjtcbmNvbnN0IE1BVEhNTF9SRVNVTFQgPSAzO1xuXG50eXBlIFJlc3VsdFR5cGUgPSB0eXBlb2YgSFRNTF9SRVNVTFQgfCB0eXBlb2YgU1ZHX1JFU1VMVCB8IHR5cGVvZiBNQVRITUxfUkVTVUxUO1xuXG4vLyBUZW1wbGF0ZVBhcnQgdHlwZXNcbi8vIElNUE9SVEFOVDogdGhlc2UgbXVzdCBtYXRjaCB0aGUgdmFsdWVzIGluIFBhcnRUeXBlXG5jb25zdCBBVFRSSUJVVEVfUEFSVCA9IDE7XG5jb25zdCBDSElMRF9QQVJUID0gMjtcbmNvbnN0IFBST1BFUlRZX1BBUlQgPSAzO1xuY29uc3QgQk9PTEVBTl9BVFRSSUJVVEVfUEFSVCA9IDQ7XG5jb25zdCBFVkVOVF9QQVJUID0gNTtcbmNvbnN0IEVMRU1FTlRfUEFSVCA9IDY7XG5jb25zdCBDT01NRU5UX1BBUlQgPSA3O1xuXG4vKipcbiAqIFRoZSByZXR1cm4gdHlwZSBvZiB0aGUgdGVtcGxhdGUgdGFnIGZ1bmN0aW9ucywge0BsaW5rY29kZSBodG1sfSBhbmRcbiAqIHtAbGlua2NvZGUgc3ZnfSB3aGVuIGl0IGhhc24ndCBiZWVuIGNvbXBpbGVkIGJ5IEBsaXQtbGFicy9jb21waWxlci5cbiAqXG4gKiBBIGBUZW1wbGF0ZVJlc3VsdGAgb2JqZWN0IGhvbGRzIGFsbCB0aGUgaW5mb3JtYXRpb24gYWJvdXQgYSB0ZW1wbGF0ZVxuICogZXhwcmVzc2lvbiByZXF1aXJlZCB0byByZW5kZXIgaXQ6IHRoZSB0ZW1wbGF0ZSBzdHJpbmdzLCBleHByZXNzaW9uIHZhbHVlcyxcbiAqIGFuZCB0eXBlIG9mIHRlbXBsYXRlIChodG1sIG9yIHN2ZykuXG4gKlxuICogYFRlbXBsYXRlUmVzdWx0YCBvYmplY3RzIGRvIG5vdCBjcmVhdGUgYW55IERPTSBvbiB0aGVpciBvd24uIFRvIGNyZWF0ZSBvclxuICogdXBkYXRlIERPTSB5b3UgbmVlZCB0byByZW5kZXIgdGhlIGBUZW1wbGF0ZVJlc3VsdGAuIFNlZVxuICogW1JlbmRlcmluZ10oaHR0cHM6Ly9saXQuZGV2L2RvY3MvY29tcG9uZW50cy9yZW5kZXJpbmcpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqL1xuZXhwb3J0IHR5cGUgVW5jb21waWxlZFRlbXBsYXRlUmVzdWx0PFQgZXh0ZW5kcyBSZXN1bHRUeXBlID0gUmVzdWx0VHlwZT4gPSB7XG4gIC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gIFsnXyRsaXRUeXBlJCddOiBUO1xuICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheTtcbiAgdmFsdWVzOiB1bmtub3duW107XG59O1xuXG4vKipcbiAqIFRoaXMgaXMgYSB0ZW1wbGF0ZSByZXN1bHQgdGhhdCBtYXkgYmUgZWl0aGVyIHVuY29tcGlsZWQgb3IgY29tcGlsZWQuXG4gKlxuICogSW4gdGhlIGZ1dHVyZSwgVGVtcGxhdGVSZXN1bHQgd2lsbCBiZSB0aGlzIHR5cGUuIElmIHlvdSB3YW50IHRvIGV4cGxpY2l0bHlcbiAqIG5vdGUgdGhhdCBhIHRlbXBsYXRlIHJlc3VsdCBpcyBwb3RlbnRpYWxseSBjb21waWxlZCwgeW91IGNhbiByZWZlcmVuY2UgdGhpc1xuICogdHlwZSBhbmQgaXQgd2lsbCBjb250aW51ZSB0byBiZWhhdmUgdGhlIHNhbWUgdGhyb3VnaCB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uXG4gKiBvZiBMaXQuIFRoaXMgY2FuIGJlIHVzZWZ1bCBmb3IgY29kZSB0aGF0IHdhbnRzIHRvIHByZXBhcmUgZm9yIHRoZSBuZXh0XG4gKiBtYWpvciB2ZXJzaW9uIG9mIExpdC5cbiAqL1xuZXhwb3J0IHR5cGUgTWF5YmVDb21waWxlZFRlbXBsYXRlUmVzdWx0PFQgZXh0ZW5kcyBSZXN1bHRUeXBlID0gUmVzdWx0VHlwZT4gPVxuICB8IFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdDxUPlxuICB8IENvbXBpbGVkVGVtcGxhdGVSZXN1bHQ7XG5cbi8qKlxuICogVGhlIHJldHVybiB0eXBlIG9mIHRoZSB0ZW1wbGF0ZSB0YWcgZnVuY3Rpb25zLCB7QGxpbmtjb2RlIGh0bWx9IGFuZFxuICoge0BsaW5rY29kZSBzdmd9LlxuICpcbiAqIEEgYFRlbXBsYXRlUmVzdWx0YCBvYmplY3QgaG9sZHMgYWxsIHRoZSBpbmZvcm1hdGlvbiBhYm91dCBhIHRlbXBsYXRlXG4gKiBleHByZXNzaW9uIHJlcXVpcmVkIHRvIHJlbmRlciBpdDogdGhlIHRlbXBsYXRlIHN0cmluZ3MsIGV4cHJlc3Npb24gdmFsdWVzLFxuICogYW5kIHR5cGUgb2YgdGVtcGxhdGUgKGh0bWwgb3Igc3ZnKS5cbiAqXG4gKiBgVGVtcGxhdGVSZXN1bHRgIG9iamVjdHMgZG8gbm90IGNyZWF0ZSBhbnkgRE9NIG9uIHRoZWlyIG93bi4gVG8gY3JlYXRlIG9yXG4gKiB1cGRhdGUgRE9NIHlvdSBuZWVkIHRvIHJlbmRlciB0aGUgYFRlbXBsYXRlUmVzdWx0YC4gU2VlXG4gKiBbUmVuZGVyaW5nXShodHRwczovL2xpdC5kZXYvZG9jcy9jb21wb25lbnRzL3JlbmRlcmluZykgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogSW4gTGl0IDQsIHRoaXMgdHlwZSB3aWxsIGJlIGFuIGFsaWFzIG9mXG4gKiBNYXliZUNvbXBpbGVkVGVtcGxhdGVSZXN1bHQsIHNvIHRoYXQgY29kZSB3aWxsIGdldCB0eXBlIGVycm9ycyBpZiBpdCBhc3N1bWVzXG4gKiB0aGF0IExpdCB0ZW1wbGF0ZXMgYXJlIG5vdCBjb21waWxlZC4gV2hlbiBkZWxpYmVyYXRlbHkgd29ya2luZyB3aXRoIG9ubHlcbiAqIG9uZSwgdXNlIGVpdGhlciB7QGxpbmtjb2RlIENvbXBpbGVkVGVtcGxhdGVSZXN1bHR9IG9yXG4gKiB7QGxpbmtjb2RlIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdH0gZXhwbGljaXRseS5cbiAqL1xuZXhwb3J0IHR5cGUgVGVtcGxhdGVSZXN1bHQ8VCBleHRlbmRzIFJlc3VsdFR5cGUgPSBSZXN1bHRUeXBlPiA9XG4gIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdDxUPjtcblxuZXhwb3J0IHR5cGUgSFRNTFRlbXBsYXRlUmVzdWx0ID0gVGVtcGxhdGVSZXN1bHQ8dHlwZW9mIEhUTUxfUkVTVUxUPjtcblxuZXhwb3J0IHR5cGUgU1ZHVGVtcGxhdGVSZXN1bHQgPSBUZW1wbGF0ZVJlc3VsdDx0eXBlb2YgU1ZHX1JFU1VMVD47XG5cbmV4cG9ydCB0eXBlIE1hdGhNTFRlbXBsYXRlUmVzdWx0ID0gVGVtcGxhdGVSZXN1bHQ8dHlwZW9mIE1BVEhNTF9SRVNVTFQ+O1xuXG4vKipcbiAqIEEgVGVtcGxhdGVSZXN1bHQgdGhhdCBoYXMgYmVlbiBjb21waWxlZCBieSBAbGl0LWxhYnMvY29tcGlsZXIsIHNraXBwaW5nIHRoZVxuICogcHJlcGFyZSBzdGVwLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBpbGVkVGVtcGxhdGVSZXN1bHQge1xuICAvLyBUaGlzIGlzIGEgZmFjdG9yeSBpbiBvcmRlciB0byBtYWtlIHRlbXBsYXRlIGluaXRpYWxpemF0aW9uIGxhenlcbiAgLy8gYW5kIGFsbG93IFNoYWR5UmVuZGVyT3B0aW9ucyBzY29wZSB0byBiZSBwYXNzZWQgaW4uXG4gIC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gIFsnXyRsaXRUeXBlJCddOiBDb21waWxlZFRlbXBsYXRlO1xuICB2YWx1ZXM6IHVua25vd25bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21waWxlZFRlbXBsYXRlIGV4dGVuZHMgT21pdDxUZW1wbGF0ZSwgJ2VsJz4ge1xuICAvLyBlbCBpcyBvdmVycmlkZGVuIHRvIGJlIG9wdGlvbmFsLiBXZSBpbml0aWFsaXplIGl0IG9uIGZpcnN0IHJlbmRlclxuICBlbD86IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgLy8gVGhlIHByZXBhcmVkIEhUTUwgc3RyaW5nIHRvIGNyZWF0ZSBhIHRlbXBsYXRlIGVsZW1lbnQgZnJvbS5cbiAgLy8gVGhlIHR5cGUgaXMgYSBUZW1wbGF0ZVN0cmluZ3NBcnJheSB0byBndWFyYW50ZWUgdGhhdCB0aGUgdmFsdWUgY2FtZSBmcm9tXG4gIC8vIHNvdXJjZSBjb2RlLCBwcmV2ZW50aW5nIGEgSlNPTiBpbmplY3Rpb24gYXR0YWNrLlxuICBoOiBUZW1wbGF0ZVN0cmluZ3NBcnJheTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSB0ZW1wbGF0ZSBsaXRlcmFsIHRhZyBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBUZW1wbGF0ZVJlc3VsdCB3aXRoXG4gKiB0aGUgZ2l2ZW4gcmVzdWx0IHR5cGUuXG4gKi9cbmNvbnN0IHRhZyA9XG4gIDxUIGV4dGVuZHMgUmVzdWx0VHlwZT4odHlwZTogVCkgPT5cbiAgKHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi52YWx1ZXM6IHVua25vd25bXSk6IFRlbXBsYXRlUmVzdWx0PFQ+ID0+IHtcbiAgICAvLyBXYXJuIGFnYWluc3QgdGVtcGxhdGVzIG9jdGFsIGVzY2FwZSBzZXF1ZW5jZXNcbiAgICAvLyBXZSBkbyB0aGlzIGhlcmUgcmF0aGVyIHRoYW4gaW4gcmVuZGVyIHNvIHRoYXQgdGhlIHdhcm5pbmcgaXMgY2xvc2VyIHRvIHRoZVxuICAgIC8vIHRlbXBsYXRlIGRlZmluaXRpb24uXG4gICAgaWYgKERFVl9NT0RFICYmIHN0cmluZ3Muc29tZSgocykgPT4gcyA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnU29tZSB0ZW1wbGF0ZSBzdHJpbmdzIGFyZSB1bmRlZmluZWQuXFxuJyArXG4gICAgICAgICAgJ1RoaXMgaXMgcHJvYmFibHkgY2F1c2VkIGJ5IGlsbGVnYWwgb2N0YWwgZXNjYXBlIHNlcXVlbmNlcy4nXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoREVWX01PREUpIHtcbiAgICAgIC8vIEltcG9ydCBzdGF0aWMtaHRtbC5qcyByZXN1bHRzIGluIGEgY2lyY3VsYXIgZGVwZW5kZW5jeSB3aGljaCBnMyBkb2Vzbid0XG4gICAgICAvLyBoYW5kbGUuIEluc3RlYWQgd2Uga25vdyB0aGF0IHN0YXRpYyB2YWx1ZXMgbXVzdCBoYXZlIHRoZSBmaWVsZFxuICAgICAgLy8gYF8kbGl0U3RhdGljJGAuXG4gICAgICBpZiAoXG4gICAgICAgIHZhbHVlcy5zb21lKCh2YWwpID0+ICh2YWwgYXMge18kbGl0U3RhdGljJDogdW5rbm93bn0pPy5bJ18kbGl0U3RhdGljJCddKVxuICAgICAgKSB7XG4gICAgICAgIGlzc3VlV2FybmluZyhcbiAgICAgICAgICAnJyxcbiAgICAgICAgICBgU3RhdGljIHZhbHVlcyAnbGl0ZXJhbCcgb3IgJ3Vuc2FmZVN0YXRpYycgY2Fubm90IGJlIHVzZWQgYXMgdmFsdWVzIHRvIG5vbi1zdGF0aWMgdGVtcGxhdGVzLlxcbmAgK1xuICAgICAgICAgICAgYFBsZWFzZSB1c2UgdGhlIHN0YXRpYyAnaHRtbCcgdGFnIGZ1bmN0aW9uLiBTZWUgaHR0cHM6Ly9saXQuZGV2L2RvY3MvdGVtcGxhdGVzL2V4cHJlc3Npb25zLyNzdGF0aWMtZXhwcmVzc2lvbnNgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgICAgWydfJGxpdFR5cGUkJ106IHR5cGUsXG4gICAgICBzdHJpbmdzLFxuICAgICAgdmFsdWVzLFxuICAgIH07XG4gIH07XG5cbi8qKlxuICogSW50ZXJwcmV0cyBhIHRlbXBsYXRlIGxpdGVyYWwgYXMgYW4gSFRNTCB0ZW1wbGF0ZSB0aGF0IGNhbiBlZmZpY2llbnRseVxuICogcmVuZGVyIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGhlYWRlciA9ICh0aXRsZTogc3RyaW5nKSA9PiBodG1sYDxoMT4ke3RpdGxlfTwvaDE+YDtcbiAqIGBgYFxuICpcbiAqIFRoZSBgaHRtbGAgdGFnIHJldHVybnMgYSBkZXNjcmlwdGlvbiBvZiB0aGUgRE9NIHRvIHJlbmRlciBhcyBhIHZhbHVlLiBJdCBpc1xuICogbGF6eSwgbWVhbmluZyBubyB3b3JrIGlzIGRvbmUgdW50aWwgdGhlIHRlbXBsYXRlIGlzIHJlbmRlcmVkLiBXaGVuIHJlbmRlcmluZyxcbiAqIGlmIGEgdGVtcGxhdGUgY29tZXMgZnJvbSB0aGUgc2FtZSBleHByZXNzaW9uIGFzIGEgcHJldmlvdXNseSByZW5kZXJlZCByZXN1bHQsXG4gKiBpdCdzIGVmZmljaWVudGx5IHVwZGF0ZWQgaW5zdGVhZCBvZiByZXBsYWNlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGh0bWwgPSB0YWcoSFRNTF9SRVNVTFQpO1xuXG4vKipcbiAqIEludGVycHJldHMgYSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIGFuIFNWRyBmcmFnbWVudCB0aGF0IGNhbiBlZmZpY2llbnRseSByZW5kZXJcbiAqIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IHJlY3QgPSBzdmdgPHJlY3Qgd2lkdGg9XCIxMFwiIGhlaWdodD1cIjEwXCI+PC9yZWN0PmA7XG4gKlxuICogY29uc3QgbXlJbWFnZSA9IGh0bWxgXG4gKiAgIDxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAqICAgICAke3JlY3R9XG4gKiAgIDwvc3ZnPmA7XG4gKiBgYGBcbiAqXG4gKiBUaGUgYHN2Z2AgKnRhZyBmdW5jdGlvbiogc2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgU1ZHIGZyYWdtZW50cywgb3IgZWxlbWVudHNcbiAqIHRoYXQgd291bGQgYmUgY29udGFpbmVkICoqaW5zaWRlKiogYW4gYDxzdmc+YCBIVE1MIGVsZW1lbnQuIEEgY29tbW9uIGVycm9yIGlzXG4gKiBwbGFjaW5nIGFuIGA8c3ZnPmAgKmVsZW1lbnQqIGluIGEgdGVtcGxhdGUgdGFnZ2VkIHdpdGggdGhlIGBzdmdgIHRhZ1xuICogZnVuY3Rpb24uIFRoZSBgPHN2Zz5gIGVsZW1lbnQgaXMgYW4gSFRNTCBlbGVtZW50IGFuZCBzaG91bGQgYmUgdXNlZCB3aXRoaW4gYVxuICogdGVtcGxhdGUgdGFnZ2VkIHdpdGggdGhlIHtAbGlua2NvZGUgaHRtbH0gdGFnIGZ1bmN0aW9uLlxuICpcbiAqIEluIExpdEVsZW1lbnQgdXNhZ2UsIGl0J3MgaW52YWxpZCB0byByZXR1cm4gYW4gU1ZHIGZyYWdtZW50IGZyb20gdGhlXG4gKiBgcmVuZGVyKClgIG1ldGhvZCwgYXMgdGhlIFNWRyBmcmFnbWVudCB3aWxsIGJlIGNvbnRhaW5lZCB3aXRoaW4gdGhlIGVsZW1lbnQnc1xuICogc2hhZG93IHJvb3QgYW5kIHRodXMgbm90IGJlIHByb3Blcmx5IGNvbnRhaW5lZCB3aXRoaW4gYW4gYDxzdmc+YCBIVE1MXG4gKiBlbGVtZW50LlxuICovXG5leHBvcnQgY29uc3Qgc3ZnID0gdGFnKFNWR19SRVNVTFQpO1xuXG4vKipcbiAqIEludGVycHJldHMgYSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIE1hdGhNTCBmcmFnbWVudCB0aGF0IGNhbiBlZmZpY2llbnRseSByZW5kZXJcbiAqIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IG51bSA9IG1hdGhtbGA8bW4+MTwvbW4+YDtcbiAqXG4gKiBjb25zdCBlcSA9IGh0bWxgXG4gKiAgIDxtYXRoPlxuICogICAgICR7bnVtfVxuICogICA8L21hdGg+YDtcbiAqIGBgYFxuICpcbiAqIFRoZSBgbWF0aG1sYCAqdGFnIGZ1bmN0aW9uKiBzaG91bGQgb25seSBiZSB1c2VkIGZvciBNYXRoTUwgZnJhZ21lbnRzLCBvclxuICogZWxlbWVudHMgdGhhdCB3b3VsZCBiZSBjb250YWluZWQgKippbnNpZGUqKiBhIGA8bWF0aD5gIEhUTUwgZWxlbWVudC4gQSBjb21tb25cbiAqIGVycm9yIGlzIHBsYWNpbmcgYSBgPG1hdGg+YCAqZWxlbWVudCogaW4gYSB0ZW1wbGF0ZSB0YWdnZWQgd2l0aCB0aGUgYG1hdGhtbGBcbiAqIHRhZyBmdW5jdGlvbi4gVGhlIGA8bWF0aD5gIGVsZW1lbnQgaXMgYW4gSFRNTCBlbGVtZW50IGFuZCBzaG91bGQgYmUgdXNlZFxuICogd2l0aGluIGEgdGVtcGxhdGUgdGFnZ2VkIHdpdGggdGhlIHtAbGlua2NvZGUgaHRtbH0gdGFnIGZ1bmN0aW9uLlxuICpcbiAqIEluIExpdEVsZW1lbnQgdXNhZ2UsIGl0J3MgaW52YWxpZCB0byByZXR1cm4gYW4gTWF0aE1MIGZyYWdtZW50IGZyb20gdGhlXG4gKiBgcmVuZGVyKClgIG1ldGhvZCwgYXMgdGhlIE1hdGhNTCBmcmFnbWVudCB3aWxsIGJlIGNvbnRhaW5lZCB3aXRoaW4gdGhlXG4gKiBlbGVtZW50J3Mgc2hhZG93IHJvb3QgYW5kIHRodXMgbm90IGJlIHByb3Blcmx5IGNvbnRhaW5lZCB3aXRoaW4gYSBgPG1hdGg+YFxuICogSFRNTCBlbGVtZW50LlxuICovXG5leHBvcnQgY29uc3QgbWF0aG1sID0gdGFnKE1BVEhNTF9SRVNVTFQpO1xuXG4vKipcbiAqIEEgc2VudGluZWwgdmFsdWUgdGhhdCBzaWduYWxzIHRoYXQgYSB2YWx1ZSB3YXMgaGFuZGxlZCBieSBhIGRpcmVjdGl2ZSBhbmRcbiAqIHNob3VsZCBub3QgYmUgd3JpdHRlbiB0byB0aGUgRE9NLlxuICovXG5leHBvcnQgY29uc3Qgbm9DaGFuZ2UgPSBTeW1ib2wuZm9yKCdsaXQtbm9DaGFuZ2UnKTtcblxuLyoqXG4gKiBBIHNlbnRpbmVsIHZhbHVlIHRoYXQgc2lnbmFscyBhIENoaWxkUGFydCB0byBmdWxseSBjbGVhciBpdHMgY29udGVudC5cbiAqXG4gKiBgYGB0c1xuICogY29uc3QgYnV0dG9uID0gaHRtbGAke1xuICogIHVzZXIuaXNBZG1pblxuICogICAgPyBodG1sYDxidXR0b24+REVMRVRFPC9idXR0b24+YFxuICogICAgOiBub3RoaW5nXG4gKiB9YDtcbiAqIGBgYFxuICpcbiAqIFByZWZlciB1c2luZyBgbm90aGluZ2Agb3ZlciBvdGhlciBmYWxzeSB2YWx1ZXMgYXMgaXQgcHJvdmlkZXMgYSBjb25zaXN0ZW50XG4gKiBiZWhhdmlvciBiZXR3ZWVuIHZhcmlvdXMgZXhwcmVzc2lvbiBiaW5kaW5nIGNvbnRleHRzLlxuICpcbiAqIEluIGNoaWxkIGV4cHJlc3Npb25zLCBgdW5kZWZpbmVkYCwgYG51bGxgLCBgJydgLCBhbmQgYG5vdGhpbmdgIGFsbCBiZWhhdmUgdGhlXG4gKiBzYW1lIGFuZCByZW5kZXIgbm8gbm9kZXMuIEluIGF0dHJpYnV0ZSBleHByZXNzaW9ucywgYG5vdGhpbmdgIF9yZW1vdmVzXyB0aGVcbiAqIGF0dHJpYnV0ZSwgd2hpbGUgYHVuZGVmaW5lZGAgYW5kIGBudWxsYCB3aWxsIHJlbmRlciBhbiBlbXB0eSBzdHJpbmcuIEluXG4gKiBwcm9wZXJ0eSBleHByZXNzaW9ucyBgbm90aGluZ2AgYmVjb21lcyBgdW5kZWZpbmVkYC5cbiAqL1xuZXhwb3J0IGNvbnN0IG5vdGhpbmcgPSBTeW1ib2wuZm9yKCdsaXQtbm90aGluZycpO1xuXG4vKipcbiAqIFRoZSBjYWNoZSBvZiBwcmVwYXJlZCB0ZW1wbGF0ZXMsIGtleWVkIGJ5IHRoZSB0YWdnZWQgVGVtcGxhdGVTdHJpbmdzQXJyYXlcbiAqIGFuZCBfbm90XyBhY2NvdW50aW5nIGZvciB0aGUgc3BlY2lmaWMgdGVtcGxhdGUgdGFnIHVzZWQuIFRoaXMgbWVhbnMgdGhhdFxuICogdGVtcGxhdGUgdGFncyBjYW5ub3QgYmUgZHluYW1pYyAtIHRoZXkgbXVzdCBzdGF0aWNhbGx5IGJlIG9uZSBvZiBodG1sLCBzdmcsXG4gKiBvciBhdHRyLiBUaGlzIHJlc3RyaWN0aW9uIHNpbXBsaWZpZXMgdGhlIGNhY2hlIGxvb2t1cCwgd2hpY2ggaXMgb24gdGhlIGhvdFxuICogcGF0aCBmb3IgcmVuZGVyaW5nLlxuICovXG5jb25zdCB0ZW1wbGF0ZUNhY2hlID0gbmV3IFdlYWtNYXA8VGVtcGxhdGVTdHJpbmdzQXJyYXksIFRlbXBsYXRlPigpO1xuXG4vKipcbiAqIE9iamVjdCBzcGVjaWZ5aW5nIG9wdGlvbnMgZm9yIGNvbnRyb2xsaW5nIGxpdC1odG1sIHJlbmRlcmluZy4gTm90ZSB0aGF0XG4gKiB3aGlsZSBgcmVuZGVyYCBtYXkgYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzIG9uIHRoZSBzYW1lIGBjb250YWluZXJgIChhbmRcbiAqIGByZW5kZXJCZWZvcmVgIHJlZmVyZW5jZSBub2RlKSB0byBlZmZpY2llbnRseSB1cGRhdGUgdGhlIHJlbmRlcmVkIGNvbnRlbnQsXG4gKiBvbmx5IHRoZSBvcHRpb25zIHBhc3NlZCBpbiBkdXJpbmcgdGhlIGZpcnN0IHJlbmRlciBhcmUgcmVzcGVjdGVkIGR1cmluZ1xuICogdGhlIGxpZmV0aW1lIG9mIHJlbmRlcnMgdG8gdGhhdCB1bmlxdWUgYGNvbnRhaW5lcmAgKyBgcmVuZGVyQmVmb3JlYFxuICogY29tYmluYXRpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBBbiBvYmplY3QgdG8gdXNlIGFzIHRoZSBgdGhpc2AgdmFsdWUgZm9yIGV2ZW50IGxpc3RlbmVycy4gSXQncyBvZnRlblxuICAgKiB1c2VmdWwgdG8gc2V0IHRoaXMgdG8gdGhlIGhvc3QgY29tcG9uZW50IHJlbmRlcmluZyBhIHRlbXBsYXRlLlxuICAgKi9cbiAgaG9zdD86IG9iamVjdDtcbiAgLyoqXG4gICAqIEEgRE9NIG5vZGUgYmVmb3JlIHdoaWNoIHRvIHJlbmRlciBjb250ZW50IGluIHRoZSBjb250YWluZXIuXG4gICAqL1xuICByZW5kZXJCZWZvcmU/OiBDaGlsZE5vZGUgfCBudWxsO1xuICAvKipcbiAgICogTm9kZSB1c2VkIGZvciBjbG9uaW5nIHRoZSB0ZW1wbGF0ZSAoYGltcG9ydE5vZGVgIHdpbGwgYmUgY2FsbGVkIG9uIHRoaXNcbiAgICogbm9kZSkuIFRoaXMgY29udHJvbHMgdGhlIGBvd25lckRvY3VtZW50YCBvZiB0aGUgcmVuZGVyZWQgRE9NLCBhbG9uZyB3aXRoXG4gICAqIGFueSBpbmhlcml0ZWQgY29udGV4dC4gRGVmYXVsdHMgdG8gdGhlIGdsb2JhbCBgZG9jdW1lbnRgLlxuICAgKi9cbiAgY3JlYXRpb25TY29wZT86IHtpbXBvcnROb2RlKG5vZGU6IE5vZGUsIGRlZXA/OiBib29sZWFuKTogTm9kZX07XG4gIC8qKlxuICAgKiBUaGUgaW5pdGlhbCBjb25uZWN0ZWQgc3RhdGUgZm9yIHRoZSB0b3AtbGV2ZWwgcGFydCBiZWluZyByZW5kZXJlZC4gSWYgbm9cbiAgICogYGlzQ29ubmVjdGVkYCBvcHRpb24gaXMgc2V0LCBgQXN5bmNEaXJlY3RpdmVgcyB3aWxsIGJlIGNvbm5lY3RlZCBieVxuICAgKiBkZWZhdWx0LiBTZXQgdG8gYGZhbHNlYCBpZiB0aGUgaW5pdGlhbCByZW5kZXIgb2NjdXJzIGluIGEgZGlzY29ubmVjdGVkIHRyZWVcbiAgICogYW5kIGBBc3luY0RpcmVjdGl2ZWBzIHNob3VsZCBzZWUgYGlzQ29ubmVjdGVkID09PSBmYWxzZWAgZm9yIHRoZWlyIGluaXRpYWxcbiAgICogcmVuZGVyLiBUaGUgYHBhcnQuc2V0Q29ubmVjdGVkKClgIG1ldGhvZCBtdXN0IGJlIHVzZWQgc3Vic2VxdWVudCB0byBpbml0aWFsXG4gICAqIHJlbmRlciB0byBjaGFuZ2UgdGhlIGNvbm5lY3RlZCBzdGF0ZSBvZiB0aGUgcGFydC5cbiAgICovXG4gIGlzQ29ubmVjdGVkPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBUaGUgcm9vdCBET00gbm9kZSBmb3IgcmVuZGVyaW5nLlxuICovXG5leHBvcnQgdHlwZSBSZW5kZXJSb290Tm9kZSA9IEhUTUxFbGVtZW50IHwgU1ZHRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnQ7XG5cbmNvbnN0IHdhbGtlciA9IGQuY3JlYXRlVHJlZVdhbGtlcihcbiAgZCxcbiAgMTI5IC8qIE5vZGVGaWx0ZXIuU0hPV197RUxFTUVOVHxDT01NRU5UfSAqL1xuKTtcblxubGV0IHNhbml0aXplckZhY3RvcnlJbnRlcm5hbDogU2FuaXRpemVyRmFjdG9yeSA9IG5vb3BTYW5pdGl6ZXI7XG5cbi8vXG4vLyBDbGFzc2VzIG9ubHkgYmVsb3cgaGVyZSwgY29uc3QgdmFyaWFibGUgZGVjbGFyYXRpb25zIG9ubHkgYWJvdmUgaGVyZS4uLlxuLy9cbi8vIEtlZXBpbmcgdmFyaWFibGUgZGVjbGFyYXRpb25zIGFuZCBjbGFzc2VzIHRvZ2V0aGVyIGltcHJvdmVzIG1pbmlmaWNhdGlvbi5cbi8vIEludGVyZmFjZXMgYW5kIHR5cGUgYWxpYXNlcyBjYW4gYmUgaW50ZXJsZWF2ZWQgZnJlZWx5LlxuLy9cblxuLy8gVHlwZSBmb3IgY2xhc3NlcyB0aGF0IGhhdmUgYSBgX2RpcmVjdGl2ZWAgb3IgYF9kaXJlY3RpdmVzW11gIGZpZWxkLCB1c2VkIGJ5XG4vLyBgcmVzb2x2ZURpcmVjdGl2ZWBcbmV4cG9ydCBpbnRlcmZhY2UgRGlyZWN0aXZlUGFyZW50IHtcbiAgXyRwYXJlbnQ/OiBEaXJlY3RpdmVQYXJlbnQ7XG4gIF8kaXNDb25uZWN0ZWQ6IGJvb2xlYW47XG4gIF9fZGlyZWN0aXZlPzogRGlyZWN0aXZlO1xuICBfX2RpcmVjdGl2ZXM/OiBBcnJheTxEaXJlY3RpdmUgfCB1bmRlZmluZWQ+O1xufVxuXG5mdW5jdGlvbiB0cnVzdEZyb21UZW1wbGF0ZVN0cmluZyhcbiAgdHNhOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgc3RyaW5nRnJvbVRTQTogc3RyaW5nXG4pOiBUcnVzdGVkSFRNTCB7XG4gIC8vIEEgc2VjdXJpdHkgY2hlY2sgdG8gcHJldmVudCBzcG9vZmluZyBvZiBMaXQgdGVtcGxhdGUgcmVzdWx0cy5cbiAgLy8gSW4gdGhlIGZ1dHVyZSwgd2UgbWF5IGJlIGFibGUgdG8gcmVwbGFjZSB0aGlzIHdpdGggQXJyYXkuaXNUZW1wbGF0ZU9iamVjdCxcbiAgLy8gdGhvdWdoIHdlIG1pZ2h0IG5lZWQgdG8gbWFrZSB0aGF0IGNoZWNrIGluc2lkZSBvZiB0aGUgaHRtbCBhbmQgc3ZnXG4gIC8vIGZ1bmN0aW9ucywgYmVjYXVzZSBwcmVjb21waWxlZCB0ZW1wbGF0ZXMgZG9uJ3QgY29tZSBpbiBhc1xuICAvLyBUZW1wbGF0ZVN0cmluZ0FycmF5IG9iamVjdHMuXG4gIGlmICghaXNBcnJheSh0c2EpIHx8ICF0c2EuaGFzT3duUHJvcGVydHkoJ3JhdycpKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSAnaW52YWxpZCB0ZW1wbGF0ZSBzdHJpbmdzIGFycmF5JztcbiAgICBpZiAoREVWX01PREUpIHtcbiAgICAgIG1lc3NhZ2UgPSBgXG4gICAgICAgICAgSW50ZXJuYWwgRXJyb3I6IGV4cGVjdGVkIHRlbXBsYXRlIHN0cmluZ3MgdG8gYmUgYW4gYXJyYXlcbiAgICAgICAgICB3aXRoIGEgJ3JhdycgZmllbGQuIEZha2luZyBhIHRlbXBsYXRlIHN0cmluZ3MgYXJyYXkgYnlcbiAgICAgICAgICBjYWxsaW5nIGh0bWwgb3Igc3ZnIGxpa2UgYW4gb3JkaW5hcnkgZnVuY3Rpb24gaXMgZWZmZWN0aXZlbHlcbiAgICAgICAgICB0aGUgc2FtZSBhcyBjYWxsaW5nIHVuc2FmZUh0bWwgYW5kIGNhbiBsZWFkIHRvIG1ham9yIHNlY3VyaXR5XG4gICAgICAgICAgaXNzdWVzLCBlLmcuIG9wZW5pbmcgeW91ciBjb2RlIHVwIHRvIFhTUyBhdHRhY2tzLlxuICAgICAgICAgIElmIHlvdSdyZSB1c2luZyB0aGUgaHRtbCBvciBzdmcgdGFnZ2VkIHRlbXBsYXRlIGZ1bmN0aW9ucyBub3JtYWxseVxuICAgICAgICAgIGFuZCBzdGlsbCBzZWVpbmcgdGhpcyBlcnJvciwgcGxlYXNlIGZpbGUgYSBidWcgYXRcbiAgICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vbGl0L2xpdC9pc3N1ZXMvbmV3P3RlbXBsYXRlPWJ1Z19yZXBvcnQubWRcbiAgICAgICAgICBhbmQgaW5jbHVkZSBpbmZvcm1hdGlvbiBhYm91dCB5b3VyIGJ1aWxkIHRvb2xpbmcsIGlmIGFueS5cbiAgICAgICAgYFxuICAgICAgICAudHJpbSgpXG4gICAgICAgIC5yZXBsYWNlKC9cXG4gKi9nLCAnXFxuJyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxuICByZXR1cm4gcG9saWN5ICE9PSB1bmRlZmluZWRcbiAgICA/IHBvbGljeS5jcmVhdGVIVE1MKHN0cmluZ0Zyb21UU0EpXG4gICAgOiAoc3RyaW5nRnJvbVRTQSBhcyB1bmtub3duIGFzIFRydXN0ZWRIVE1MKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIEhUTUwgc3RyaW5nIGZvciB0aGUgZ2l2ZW4gVGVtcGxhdGVTdHJpbmdzQXJyYXkgYW5kIHJlc3VsdCB0eXBlXG4gKiAoSFRNTCBvciBTVkcpLCBhbG9uZyB3aXRoIHRoZSBjYXNlLXNlbnNpdGl2ZSBib3VuZCBhdHRyaWJ1dGUgbmFtZXMgaW5cbiAqIHRlbXBsYXRlIG9yZGVyLiBUaGUgSFRNTCBjb250YWlucyBjb21tZW50IG1hcmtlcnMgZGVub3RpbmcgdGhlIGBDaGlsZFBhcnRgc1xuICogYW5kIHN1ZmZpeGVzIG9uIGJvdW5kIGF0dHJpYnV0ZXMgZGVub3RpbmcgdGhlIGBBdHRyaWJ1dGVQYXJ0c2AuXG4gKlxuICogQHBhcmFtIHN0cmluZ3MgdGVtcGxhdGUgc3RyaW5ncyBhcnJheVxuICogQHBhcmFtIHR5cGUgSFRNTCBvciBTVkdcbiAqIEByZXR1cm4gQXJyYXkgY29udGFpbmluZyBgW2h0bWwsIGF0dHJOYW1lc11gIChhcnJheSByZXR1cm5lZCBmb3IgdGVyc2VuZXNzLFxuICogICAgIHRvIGF2b2lkIG9iamVjdCBmaWVsZHMgc2luY2UgdGhpcyBjb2RlIGlzIHNoYXJlZCB3aXRoIG5vbi1taW5pZmllZCBTU1JcbiAqICAgICBjb2RlKVxuICovXG5jb25zdCBnZXRUZW1wbGF0ZUh0bWwgPSAoXG4gIHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LFxuICB0eXBlOiBSZXN1bHRUeXBlXG4pOiBbVHJ1c3RlZEhUTUwsIEFycmF5PHN0cmluZz5dID0+IHtcbiAgLy8gSW5zZXJ0IG1ha2VycyBpbnRvIHRoZSB0ZW1wbGF0ZSBIVE1MIHRvIHJlcHJlc2VudCB0aGUgcG9zaXRpb24gb2ZcbiAgLy8gYmluZGluZ3MuIFRoZSBmb2xsb3dpbmcgY29kZSBzY2FucyB0aGUgdGVtcGxhdGUgc3RyaW5ncyB0byBkZXRlcm1pbmUgdGhlXG4gIC8vIHN5bnRhY3RpYyBwb3NpdGlvbiBvZiB0aGUgYmluZGluZ3MuIFRoZXkgY2FuIGJlIGluIHRleHQgcG9zaXRpb24sIHdoZXJlXG4gIC8vIHdlIGluc2VydCBhbiBIVE1MIGNvbW1lbnQsIGF0dHJpYnV0ZSB2YWx1ZSBwb3NpdGlvbiwgd2hlcmUgd2UgaW5zZXJ0IGFcbiAgLy8gc2VudGluZWwgc3RyaW5nIGFuZCByZS13cml0ZSB0aGUgYXR0cmlidXRlIG5hbWUsIG9yIGluc2lkZSBhIHRhZyB3aGVyZVxuICAvLyB3ZSBpbnNlcnQgdGhlIHNlbnRpbmVsIHN0cmluZy5cbiAgY29uc3QgbCA9IHN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgLy8gU3RvcmVzIHRoZSBjYXNlLXNlbnNpdGl2ZSBib3VuZCBhdHRyaWJ1dGUgbmFtZXMgaW4gdGhlIG9yZGVyIG9mIHRoZWlyXG4gIC8vIHBhcnRzLiBFbGVtZW50UGFydHMgYXJlIGFsc28gcmVmbGVjdGVkIGluIHRoaXMgYXJyYXkgYXMgdW5kZWZpbmVkXG4gIC8vIHJhdGhlciB0aGFuIGEgc3RyaW5nLCB0byBkaXNhbWJpZ3VhdGUgZnJvbSBhdHRyaWJ1dGUgYmluZGluZ3MuXG4gIGNvbnN0IGF0dHJOYW1lczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBsZXQgaHRtbCA9XG4gICAgdHlwZSA9PT0gU1ZHX1JFU1VMVCA/ICc8c3ZnPicgOiB0eXBlID09PSBNQVRITUxfUkVTVUxUID8gJzxtYXRoPicgOiAnJztcblxuICAvLyBXaGVuIHdlJ3JlIGluc2lkZSBhIHJhdyB0ZXh0IHRhZyAobm90IGl0J3MgdGV4dCBjb250ZW50KSwgdGhlIHJlZ2V4XG4gIC8vIHdpbGwgc3RpbGwgYmUgdGFnUmVnZXggc28gd2UgY2FuIGZpbmQgYXR0cmlidXRlcywgYnV0IHdpbGwgc3dpdGNoIHRvXG4gIC8vIHRoaXMgcmVnZXggd2hlbiB0aGUgdGFnIGVuZHMuXG4gIGxldCByYXdUZXh0RW5kUmVnZXg6IFJlZ0V4cCB8IHVuZGVmaW5lZDtcblxuICAvLyBUaGUgY3VycmVudCBwYXJzaW5nIHN0YXRlLCByZXByZXNlbnRlZCBhcyBhIHJlZmVyZW5jZSB0byBvbmUgb2YgdGhlXG4gIC8vIHJlZ2V4ZXNcbiAgbGV0IHJlZ2V4ID0gdGV4dEVuZFJlZ2V4O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgY29uc3QgcyA9IHN0cmluZ3NbaV07XG4gICAgLy8gVGhlIGluZGV4IG9mIHRoZSBlbmQgb2YgdGhlIGxhc3QgYXR0cmlidXRlIG5hbWUuIFdoZW4gdGhpcyBpc1xuICAgIC8vIHBvc2l0aXZlIGF0IGVuZCBvZiBhIHN0cmluZywgaXQgbWVhbnMgd2UncmUgaW4gYW4gYXR0cmlidXRlIHZhbHVlXG4gICAgLy8gcG9zaXRpb24gYW5kIG5lZWQgdG8gcmV3cml0ZSB0aGUgYXR0cmlidXRlIG5hbWUuXG4gICAgLy8gV2UgYWxzbyB1c2UgYSBzcGVjaWFsIHZhbHVlIG9mIC0yIHRvIGluZGljYXRlIHRoYXQgd2UgZW5jb3VudGVyZWRcbiAgICAvLyB0aGUgZW5kIG9mIGEgc3RyaW5nIGluIGF0dHJpYnV0ZSBuYW1lIHBvc2l0aW9uLlxuICAgIGxldCBhdHRyTmFtZUVuZEluZGV4ID0gLTE7XG4gICAgbGV0IGF0dHJOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgbGV0IGxhc3RJbmRleCA9IDA7XG4gICAgbGV0IG1hdGNoITogUmVnRXhwRXhlY0FycmF5IHwgbnVsbDtcblxuICAgIC8vIFRoZSBjb25kaXRpb25zIGluIHRoaXMgbG9vcCBoYW5kbGUgdGhlIGN1cnJlbnQgcGFyc2Ugc3RhdGUsIGFuZCB0aGVcbiAgICAvLyBhc3NpZ25tZW50cyB0byB0aGUgYHJlZ2V4YCB2YXJpYWJsZSBhcmUgdGhlIHN0YXRlIHRyYW5zaXRpb25zLlxuICAgIHdoaWxlIChsYXN0SW5kZXggPCBzLmxlbmd0aCkge1xuICAgICAgLy8gTWFrZSBzdXJlIHdlIHN0YXJ0IHNlYXJjaGluZyBmcm9tIHdoZXJlIHdlIHByZXZpb3VzbHkgbGVmdCBvZmZcbiAgICAgIHJlZ2V4Lmxhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgIG1hdGNoID0gcmVnZXguZXhlYyhzKTtcbiAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RJbmRleCA9IHJlZ2V4Lmxhc3RJbmRleDtcbiAgICAgIGlmIChyZWdleCA9PT0gdGV4dEVuZFJlZ2V4KSB7XG4gICAgICAgIGlmIChtYXRjaFtDT01NRU5UX1NUQVJUXSA9PT0gJyEtLScpIHtcbiAgICAgICAgICByZWdleCA9IGNvbW1lbnRFbmRSZWdleDtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtDT01NRU5UX1NUQVJUXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gV2Ugc3RhcnRlZCBhIHdlaXJkIGNvbW1lbnQsIGxpa2UgPC97XG4gICAgICAgICAgcmVnZXggPSBjb21tZW50MkVuZFJlZ2V4O1xuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoW1RBR19OQU1FXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHJhd1RleHRFbGVtZW50LnRlc3QobWF0Y2hbVEFHX05BTUVdKSkge1xuICAgICAgICAgICAgLy8gUmVjb3JkIGlmIHdlIGVuY291bnRlciBhIHJhdy10ZXh0IGVsZW1lbnQuIFdlJ2xsIHN3aXRjaCB0b1xuICAgICAgICAgICAgLy8gdGhpcyByZWdleCBhdCB0aGUgZW5kIG9mIHRoZSB0YWcuXG4gICAgICAgICAgICByYXdUZXh0RW5kUmVnZXggPSBuZXcgUmVnRXhwKGA8LyR7bWF0Y2hbVEFHX05BTUVdfWAsICdnJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlZ2V4ID0gdGFnRW5kUmVnZXg7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbRFlOQU1JQ19UQUdfTkFNRV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmIChERVZfTU9ERSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAnQmluZGluZ3MgaW4gdGFnIG5hbWVzIGFyZSBub3Qgc3VwcG9ydGVkLiBQbGVhc2UgdXNlIHN0YXRpYyB0ZW1wbGF0ZXMgaW5zdGVhZC4gJyArXG4gICAgICAgICAgICAgICAgJ1NlZSBodHRwczovL2xpdC5kZXYvZG9jcy90ZW1wbGF0ZXMvZXhwcmVzc2lvbnMvI3N0YXRpYy1leHByZXNzaW9ucydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlZ2V4ID0gdGFnRW5kUmVnZXg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVnZXggPT09IHRhZ0VuZFJlZ2V4KSB7XG4gICAgICAgIGlmIChtYXRjaFtFTlRJUkVfTUFUQ0hdID09PSAnPicpIHtcbiAgICAgICAgICAvLyBFbmQgb2YgYSB0YWcuIElmIHdlIGhhZCBzdGFydGVkIGEgcmF3LXRleHQgZWxlbWVudCwgdXNlIHRoYXRcbiAgICAgICAgICAvLyByZWdleFxuICAgICAgICAgIHJlZ2V4ID0gcmF3VGV4dEVuZFJlZ2V4ID8/IHRleHRFbmRSZWdleDtcbiAgICAgICAgICAvLyBXZSBtYXkgYmUgZW5kaW5nIGFuIHVucXVvdGVkIGF0dHJpYnV0ZSB2YWx1ZSwgc28gbWFrZSBzdXJlIHdlXG4gICAgICAgICAgLy8gY2xlYXIgYW55IHBlbmRpbmcgYXR0ck5hbWVFbmRJbmRleFxuICAgICAgICAgIGF0dHJOYW1lRW5kSW5kZXggPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFtBVFRSSUJVVEVfTkFNRV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIEF0dHJpYnV0ZSBuYW1lIHBvc2l0aW9uXG4gICAgICAgICAgYXR0ck5hbWVFbmRJbmRleCA9IC0yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF0dHJOYW1lRW5kSW5kZXggPSByZWdleC5sYXN0SW5kZXggLSBtYXRjaFtTUEFDRVNfQU5EX0VRVUFMU10ubGVuZ3RoO1xuICAgICAgICAgIGF0dHJOYW1lID0gbWF0Y2hbQVRUUklCVVRFX05BTUVdO1xuICAgICAgICAgIHJlZ2V4ID1cbiAgICAgICAgICAgIG1hdGNoW1FVT1RFX0NIQVJdID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyB0YWdFbmRSZWdleFxuICAgICAgICAgICAgICA6IG1hdGNoW1FVT1RFX0NIQVJdID09PSAnXCInXG4gICAgICAgICAgICAgICAgPyBkb3VibGVRdW90ZUF0dHJFbmRSZWdleFxuICAgICAgICAgICAgICAgIDogc2luZ2xlUXVvdGVBdHRyRW5kUmVnZXg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHJlZ2V4ID09PSBkb3VibGVRdW90ZUF0dHJFbmRSZWdleCB8fFxuICAgICAgICByZWdleCA9PT0gc2luZ2xlUXVvdGVBdHRyRW5kUmVnZXhcbiAgICAgICkge1xuICAgICAgICByZWdleCA9IHRhZ0VuZFJlZ2V4O1xuICAgICAgfSBlbHNlIGlmIChyZWdleCA9PT0gY29tbWVudEVuZFJlZ2V4IHx8IHJlZ2V4ID09PSBjb21tZW50MkVuZFJlZ2V4KSB7XG4gICAgICAgIHJlZ2V4ID0gdGV4dEVuZFJlZ2V4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTm90IG9uZSBvZiB0aGUgZml2ZSBzdGF0ZSByZWdleGVzLCBzbyBpdCBtdXN0IGJlIHRoZSBkeW5hbWljYWxseVxuICAgICAgICAvLyBjcmVhdGVkIHJhdyB0ZXh0IHJlZ2V4IGFuZCB3ZSdyZSBhdCB0aGUgY2xvc2Ugb2YgdGhhdCBlbGVtZW50LlxuICAgICAgICByZWdleCA9IHRhZ0VuZFJlZ2V4O1xuICAgICAgICByYXdUZXh0RW5kUmVnZXggPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICAvLyBJZiB3ZSBoYXZlIGEgYXR0ck5hbWVFbmRJbmRleCwgd2hpY2ggaW5kaWNhdGVzIHRoYXQgd2Ugc2hvdWxkXG4gICAgICAvLyByZXdyaXRlIHRoZSBhdHRyaWJ1dGUgbmFtZSwgYXNzZXJ0IHRoYXQgd2UncmUgaW4gYSB2YWxpZCBhdHRyaWJ1dGVcbiAgICAgIC8vIHBvc2l0aW9uIC0gZWl0aGVyIGluIGEgdGFnLCBvciBhIHF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICBjb25zb2xlLmFzc2VydChcbiAgICAgICAgYXR0ck5hbWVFbmRJbmRleCA9PT0gLTEgfHxcbiAgICAgICAgICByZWdleCA9PT0gdGFnRW5kUmVnZXggfHxcbiAgICAgICAgICByZWdleCA9PT0gc2luZ2xlUXVvdGVBdHRyRW5kUmVnZXggfHxcbiAgICAgICAgICByZWdleCA9PT0gZG91YmxlUXVvdGVBdHRyRW5kUmVnZXgsXG4gICAgICAgICd1bmV4cGVjdGVkIHBhcnNlIHN0YXRlIEInXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFdlIGhhdmUgZm91ciBjYXNlczpcbiAgICAvLyAgMS4gV2UncmUgaW4gdGV4dCBwb3NpdGlvbiwgYW5kIG5vdCBpbiBhIHJhdyB0ZXh0IGVsZW1lbnRcbiAgICAvLyAgICAgKHJlZ2V4ID09PSB0ZXh0RW5kUmVnZXgpOiBpbnNlcnQgYSBjb21tZW50IG1hcmtlci5cbiAgICAvLyAgMi4gV2UgaGF2ZSBhIG5vbi1uZWdhdGl2ZSBhdHRyTmFtZUVuZEluZGV4IHdoaWNoIG1lYW5zIHdlIG5lZWQgdG9cbiAgICAvLyAgICAgcmV3cml0ZSB0aGUgYXR0cmlidXRlIG5hbWUgdG8gYWRkIGEgYm91bmQgYXR0cmlidXRlIHN1ZmZpeC5cbiAgICAvLyAgMy4gV2UncmUgYXQgdGhlIG5vbi1maXJzdCBiaW5kaW5nIGluIGEgbXVsdGktYmluZGluZyBhdHRyaWJ1dGUsIHVzZSBhXG4gICAgLy8gICAgIHBsYWluIG1hcmtlci5cbiAgICAvLyAgNC4gV2UncmUgc29tZXdoZXJlIGVsc2UgaW5zaWRlIHRoZSB0YWcuIElmIHdlJ3JlIGluIGF0dHJpYnV0ZSBuYW1lXG4gICAgLy8gICAgIHBvc2l0aW9uIChhdHRyTmFtZUVuZEluZGV4ID09PSAtMiksIGFkZCBhIHNlcXVlbnRpYWwgc3VmZml4IHRvXG4gICAgLy8gICAgIGdlbmVyYXRlIGEgdW5pcXVlIGF0dHJpYnV0ZSBuYW1lLlxuXG4gICAgLy8gRGV0ZWN0IGEgYmluZGluZyBuZXh0IHRvIHNlbGYtY2xvc2luZyB0YWcgZW5kIGFuZCBpbnNlcnQgYSBzcGFjZSB0b1xuICAgIC8vIHNlcGFyYXRlIHRoZSBtYXJrZXIgZnJvbSB0aGUgdGFnIGVuZDpcbiAgICBjb25zdCBlbmQgPVxuICAgICAgcmVnZXggPT09IHRhZ0VuZFJlZ2V4ICYmIHN0cmluZ3NbaSArIDFdLnN0YXJ0c1dpdGgoJy8+JykgPyAnICcgOiAnJztcbiAgICBodG1sICs9XG4gICAgICByZWdleCA9PT0gdGV4dEVuZFJlZ2V4XG4gICAgICAgID8gcyArIG5vZGVNYXJrZXJcbiAgICAgICAgOiBhdHRyTmFtZUVuZEluZGV4ID49IDBcbiAgICAgICAgICA/IChhdHRyTmFtZXMucHVzaChhdHRyTmFtZSEpLFxuICAgICAgICAgICAgcy5zbGljZSgwLCBhdHRyTmFtZUVuZEluZGV4KSArXG4gICAgICAgICAgICAgIGJvdW5kQXR0cmlidXRlU3VmZml4ICtcbiAgICAgICAgICAgICAgcy5zbGljZShhdHRyTmFtZUVuZEluZGV4KSkgK1xuICAgICAgICAgICAgbWFya2VyICtcbiAgICAgICAgICAgIGVuZFxuICAgICAgICAgIDogcyArIG1hcmtlciArIChhdHRyTmFtZUVuZEluZGV4ID09PSAtMiA/IGkgOiBlbmQpO1xuICB9XG5cbiAgY29uc3QgaHRtbFJlc3VsdDogc3RyaW5nIHwgVHJ1c3RlZEhUTUwgPVxuICAgIGh0bWwgK1xuICAgIChzdHJpbmdzW2xdIHx8ICc8Pz4nKSArXG4gICAgKHR5cGUgPT09IFNWR19SRVNVTFQgPyAnPC9zdmc+JyA6IHR5cGUgPT09IE1BVEhNTF9SRVNVTFQgPyAnPC9tYXRoPicgOiAnJyk7XG5cbiAgLy8gUmV0dXJuZWQgYXMgYW4gYXJyYXkgZm9yIHRlcnNlbmVzc1xuICByZXR1cm4gW3RydXN0RnJvbVRlbXBsYXRlU3RyaW5nKHN0cmluZ3MsIGh0bWxSZXN1bHQpLCBhdHRyTmFtZXNdO1xufTtcblxuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IHR5cGUge1RlbXBsYXRlfTtcbmNsYXNzIFRlbXBsYXRlIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBlbCE6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG5cbiAgcGFydHM6IEFycmF5PFRlbXBsYXRlUGFydD4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgIHtzdHJpbmdzLCBbJ18kbGl0VHlwZSQnXTogdHlwZX06IFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdCxcbiAgICBvcHRpb25zPzogUmVuZGVyT3B0aW9uc1xuICApIHtcbiAgICBsZXQgbm9kZTogTm9kZSB8IG51bGw7XG4gICAgbGV0IG5vZGVJbmRleCA9IDA7XG4gICAgbGV0IGF0dHJOYW1lSW5kZXggPSAwO1xuICAgIGNvbnN0IHBhcnRDb3VudCA9IHN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBwYXJ0cyA9IHRoaXMucGFydHM7XG5cbiAgICAvLyBDcmVhdGUgdGVtcGxhdGUgZWxlbWVudFxuICAgIGNvbnN0IFtodG1sLCBhdHRyTmFtZXNdID0gZ2V0VGVtcGxhdGVIdG1sKHN0cmluZ3MsIHR5cGUpO1xuICAgIHRoaXMuZWwgPSBUZW1wbGF0ZS5jcmVhdGVFbGVtZW50KGh0bWwsIG9wdGlvbnMpO1xuICAgIHdhbGtlci5jdXJyZW50Tm9kZSA9IHRoaXMuZWwuY29udGVudDtcblxuICAgIC8vIFJlLXBhcmVudCBTVkcgb3IgTWF0aE1MIG5vZGVzIGludG8gdGVtcGxhdGUgcm9vdFxuICAgIGlmICh0eXBlID09PSBTVkdfUkVTVUxUIHx8IHR5cGUgPT09IE1BVEhNTF9SRVNVTFQpIHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLmVsLmNvbnRlbnQuZmlyc3RDaGlsZCE7XG4gICAgICB3cmFwcGVyLnJlcGxhY2VXaXRoKC4uLndyYXBwZXIuY2hpbGROb2Rlcyk7XG4gICAgfVxuXG4gICAgLy8gV2FsayB0aGUgdGVtcGxhdGUgdG8gZmluZCBiaW5kaW5nIG1hcmtlcnMgYW5kIGNyZWF0ZSBUZW1wbGF0ZVBhcnRzXG4gICAgd2hpbGUgKChub2RlID0gd2Fsa2VyLm5leHROb2RlKCkpICE9PSBudWxsICYmIHBhcnRzLmxlbmd0aCA8IHBhcnRDb3VudCkge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICAgICAgY29uc3QgdGFnID0gKG5vZGUgYXMgRWxlbWVudCkubG9jYWxOYW1lO1xuICAgICAgICAgIC8vIFdhcm4gaWYgYHRleHRhcmVhYCBpbmNsdWRlcyBhbiBleHByZXNzaW9uIGFuZCB0aHJvdyBpZiBgdGVtcGxhdGVgXG4gICAgICAgICAgLy8gZG9lcyBzaW5jZSB0aGVzZSBhcmUgbm90IHN1cHBvcnRlZC4gV2UgZG8gdGhpcyBieSBjaGVja2luZ1xuICAgICAgICAgIC8vIGlubmVySFRNTCBmb3IgYW55dGhpbmcgdGhhdCBsb29rcyBsaWtlIGEgbWFya2VyLiBUaGlzIGNhdGNoZXNcbiAgICAgICAgICAvLyBjYXNlcyBsaWtlIGJpbmRpbmdzIGluIHRleHRhcmVhIHRoZXJlIG1hcmtlcnMgdHVybiBpbnRvIHRleHQgbm9kZXMuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgL14oPzp0ZXh0YXJlYXx0ZW1wbGF0ZSkkL2khLnRlc3QodGFnKSAmJlxuICAgICAgICAgICAgKG5vZGUgYXMgRWxlbWVudCkuaW5uZXJIVE1MLmluY2x1ZGVzKG1hcmtlcilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IG0gPVxuICAgICAgICAgICAgICBgRXhwcmVzc2lvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW5zaWRlIFxcYCR7dGFnfVxcYCBgICtcbiAgICAgICAgICAgICAgYGVsZW1lbnRzLiBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy9leHByZXNzaW9uLWluLSR7dGFnfSBmb3IgbW9yZSBgICtcbiAgICAgICAgICAgICAgYGluZm9ybWF0aW9uLmA7XG4gICAgICAgICAgICBpZiAodGFnID09PSAndGVtcGxhdGUnKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpc3N1ZVdhcm5pbmcoJycsIG0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPIChqdXN0aW5mYWduYW5pKTogZm9yIGF0dGVtcHRlZCBkeW5hbWljIHRhZyBuYW1lcywgd2UgZG9uJ3RcbiAgICAgICAgLy8gaW5jcmVtZW50IHRoZSBiaW5kaW5nSW5kZXgsIGFuZCBpdCdsbCBiZSBvZmYgYnkgMSBpbiB0aGUgZWxlbWVudFxuICAgICAgICAvLyBhbmQgb2ZmIGJ5IHR3byBhZnRlciBpdC5cbiAgICAgICAgaWYgKChub2RlIGFzIEVsZW1lbnQpLmhhc0F0dHJpYnV0ZXMoKSkge1xuICAgICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiAobm9kZSBhcyBFbGVtZW50KS5nZXRBdHRyaWJ1dGVOYW1lcygpKSB7XG4gICAgICAgICAgICBpZiAobmFtZS5lbmRzV2l0aChib3VuZEF0dHJpYnV0ZVN1ZmZpeCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVhbE5hbWUgPSBhdHRyTmFtZXNbYXR0ck5hbWVJbmRleCsrXTtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAobm9kZSBhcyBFbGVtZW50KS5nZXRBdHRyaWJ1dGUobmFtZSkhO1xuICAgICAgICAgICAgICBjb25zdCBzdGF0aWNzID0gdmFsdWUuc3BsaXQobWFya2VyKTtcbiAgICAgICAgICAgICAgY29uc3QgbSA9IC8oWy4/QF0pPyguKikvLmV4ZWMocmVhbE5hbWUpITtcbiAgICAgICAgICAgICAgcGFydHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogQVRUUklCVVRFX1BBUlQsXG4gICAgICAgICAgICAgICAgaW5kZXg6IG5vZGVJbmRleCxcbiAgICAgICAgICAgICAgICBuYW1lOiBtWzJdLFxuICAgICAgICAgICAgICAgIHN0cmluZ3M6IHN0YXRpY3MsXG4gICAgICAgICAgICAgICAgY3RvcjpcbiAgICAgICAgICAgICAgICAgIG1bMV0gPT09ICcuJ1xuICAgICAgICAgICAgICAgICAgICA/IFByb3BlcnR5UGFydFxuICAgICAgICAgICAgICAgICAgICA6IG1bMV0gPT09ICc/J1xuICAgICAgICAgICAgICAgICAgICAgID8gQm9vbGVhbkF0dHJpYnV0ZVBhcnRcbiAgICAgICAgICAgICAgICAgICAgICA6IG1bMV0gPT09ICdAJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBFdmVudFBhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogQXR0cmlidXRlUGFydCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIChub2RlIGFzIEVsZW1lbnQpLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKG1hcmtlcikpIHtcbiAgICAgICAgICAgICAgcGFydHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogRUxFTUVOVF9QQVJULFxuICAgICAgICAgICAgICAgIGluZGV4OiBub2RlSW5kZXgsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAobm9kZSBhcyBFbGVtZW50KS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE8gKGp1c3RpbmZhZ25hbmkpOiBiZW5jaG1hcmsgdGhlIHJlZ2V4IGFnYWluc3QgdGVzdGluZyBmb3IgZWFjaFxuICAgICAgICAvLyBvZiB0aGUgMyByYXcgdGV4dCBlbGVtZW50IG5hbWVzLlxuICAgICAgICBpZiAocmF3VGV4dEVsZW1lbnQudGVzdCgobm9kZSBhcyBFbGVtZW50KS50YWdOYW1lKSkge1xuICAgICAgICAgIC8vIEZvciByYXcgdGV4dCBlbGVtZW50cyB3ZSBuZWVkIHRvIHNwbGl0IHRoZSB0ZXh0IGNvbnRlbnQgb25cbiAgICAgICAgICAvLyBtYXJrZXJzLCBjcmVhdGUgYSBUZXh0IG5vZGUgZm9yIGVhY2ggc2VnbWVudCwgYW5kIGNyZWF0ZVxuICAgICAgICAgIC8vIGEgVGVtcGxhdGVQYXJ0IGZvciBlYWNoIG1hcmtlci5cbiAgICAgICAgICBjb25zdCBzdHJpbmdzID0gKG5vZGUgYXMgRWxlbWVudCkudGV4dENvbnRlbnQhLnNwbGl0KG1hcmtlcik7XG4gICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gc3RyaW5ncy5sZW5ndGggLSAxO1xuICAgICAgICAgIGlmIChsYXN0SW5kZXggPiAwKSB7XG4gICAgICAgICAgICAobm9kZSBhcyBFbGVtZW50KS50ZXh0Q29udGVudCA9IHRydXN0ZWRUeXBlc1xuICAgICAgICAgICAgICA/ICh0cnVzdGVkVHlwZXMuZW1wdHlTY3JpcHQgYXMgdW5rbm93biBhcyAnJylcbiAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgIC8vIEdlbmVyYXRlIGEgbmV3IHRleHQgbm9kZSBmb3IgZWFjaCBsaXRlcmFsIHNlY3Rpb25cbiAgICAgICAgICAgIC8vIFRoZXNlIG5vZGVzIGFyZSBhbHNvIHVzZWQgYXMgdGhlIG1hcmtlcnMgZm9yIGNoaWxkIHBhcnRzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhc3RJbmRleDsgaSsrKSB7XG4gICAgICAgICAgICAgIChub2RlIGFzIEVsZW1lbnQpLmFwcGVuZChzdHJpbmdzW2ldLCBjcmVhdGVNYXJrZXIoKSk7XG4gICAgICAgICAgICAgIC8vIFdhbGsgcGFzdCB0aGUgbWFya2VyIG5vZGUgd2UganVzdCBhZGRlZFxuICAgICAgICAgICAgICB3YWxrZXIubmV4dE5vZGUoKTtcbiAgICAgICAgICAgICAgcGFydHMucHVzaCh7dHlwZTogQ0hJTERfUEFSVCwgaW5kZXg6ICsrbm9kZUluZGV4fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb3RlIGJlY2F1c2UgdGhpcyBtYXJrZXIgaXMgYWRkZWQgYWZ0ZXIgdGhlIHdhbGtlcidzIGN1cnJlbnRcbiAgICAgICAgICAgIC8vIG5vZGUsIGl0IHdpbGwgYmUgd2Fsa2VkIHRvIGluIHRoZSBvdXRlciBsb29wIChhbmQgaWdub3JlZCksIHNvXG4gICAgICAgICAgICAvLyB3ZSBkb24ndCBuZWVkIHRvIGFkanVzdCBub2RlSW5kZXggaGVyZVxuICAgICAgICAgICAgKG5vZGUgYXMgRWxlbWVudCkuYXBwZW5kKHN0cmluZ3NbbGFzdEluZGV4XSwgY3JlYXRlTWFya2VyKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSA4KSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSAobm9kZSBhcyBDb21tZW50KS5kYXRhO1xuICAgICAgICBpZiAoZGF0YSA9PT0gbWFya2VyTWF0Y2gpIHtcbiAgICAgICAgICBwYXJ0cy5wdXNoKHt0eXBlOiBDSElMRF9QQVJULCBpbmRleDogbm9kZUluZGV4fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGkgPSAtMTtcbiAgICAgICAgICB3aGlsZSAoKGkgPSAobm9kZSBhcyBDb21tZW50KS5kYXRhLmluZGV4T2YobWFya2VyLCBpICsgMSkpICE9PSAtMSkge1xuICAgICAgICAgICAgLy8gQ29tbWVudCBub2RlIGhhcyBhIGJpbmRpbmcgbWFya2VyIGluc2lkZSwgbWFrZSBhbiBpbmFjdGl2ZSBwYXJ0XG4gICAgICAgICAgICAvLyBUaGUgYmluZGluZyB3b24ndCB3b3JrLCBidXQgc3Vic2VxdWVudCBiaW5kaW5ncyB3aWxsXG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHt0eXBlOiBDT01NRU5UX1BBUlQsIGluZGV4OiBub2RlSW5kZXh9KTtcbiAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIGVuZCBvZiB0aGUgbWF0Y2hcbiAgICAgICAgICAgIGkgKz0gbWFya2VyLmxlbmd0aCAtIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBub2RlSW5kZXgrKztcbiAgICB9XG5cbiAgICBpZiAoREVWX01PREUpIHtcbiAgICAgIC8vIElmIHRoZXJlIHdhcyBhIGR1cGxpY2F0ZSBhdHRyaWJ1dGUgb24gYSB0YWcsIHRoZW4gd2hlbiB0aGUgdGFnIGlzXG4gICAgICAvLyBwYXJzZWQgaW50byBhbiBlbGVtZW50IHRoZSBhdHRyaWJ1dGUgZ2V0cyBkZS1kdXBsaWNhdGVkLiBXZSBjYW4gZGV0ZWN0XG4gICAgICAvLyB0aGlzIG1pc21hdGNoIGlmIHdlIGhhdmVuJ3QgcHJlY2lzZWx5IGNvbnN1bWVkIGV2ZXJ5IGF0dHJpYnV0ZSBuYW1lXG4gICAgICAvLyB3aGVuIHByZXBhcmluZyB0aGUgdGVtcGxhdGUuIFRoaXMgd29ya3MgYmVjYXVzZSBgYXR0ck5hbWVzYCBpcyBidWlsdFxuICAgICAgLy8gZnJvbSB0aGUgdGVtcGxhdGUgc3RyaW5nIGFuZCBgYXR0ck5hbWVJbmRleGAgY29tZXMgZnJvbSBwcm9jZXNzaW5nIHRoZVxuICAgICAgLy8gcmVzdWx0aW5nIERPTS5cbiAgICAgIGlmIChhdHRyTmFtZXMubGVuZ3RoICE9PSBhdHRyTmFtZUluZGV4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgRGV0ZWN0ZWQgZHVwbGljYXRlIGF0dHJpYnV0ZSBiaW5kaW5ncy4gVGhpcyBvY2N1cnMgaWYgeW91ciB0ZW1wbGF0ZSBgICtcbiAgICAgICAgICAgIGBoYXMgZHVwbGljYXRlIGF0dHJpYnV0ZXMgb24gYW4gZWxlbWVudCB0YWcuIEZvciBleGFtcGxlIGAgK1xuICAgICAgICAgICAgYFwiPGlucHV0ID9kaXNhYmxlZD1cXCR7dHJ1ZX0gP2Rpc2FibGVkPVxcJHtmYWxzZX0+XCIgY29udGFpbnMgYSBgICtcbiAgICAgICAgICAgIGBkdXBsaWNhdGUgXCJkaXNhYmxlZFwiIGF0dHJpYnV0ZS4gVGhlIGVycm9yIHdhcyBkZXRlY3RlZCBpbiBgICtcbiAgICAgICAgICAgIGB0aGUgZm9sbG93aW5nIHRlbXBsYXRlOiBcXG5gICtcbiAgICAgICAgICAgICdgJyArXG4gICAgICAgICAgICBzdHJpbmdzLmpvaW4oJyR7Li4ufScpICtcbiAgICAgICAgICAgICdgJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdlIGNvdWxkIHNldCB3YWxrZXIuY3VycmVudE5vZGUgdG8gYW5vdGhlciBub2RlIGhlcmUgdG8gcHJldmVudCBhIG1lbW9yeVxuICAgIC8vIGxlYWssIGJ1dCBldmVyeSB0aW1lIHdlIHByZXBhcmUgYSB0ZW1wbGF0ZSwgd2UgaW1tZWRpYXRlbHkgcmVuZGVyIGl0XG4gICAgLy8gYW5kIHJlLXVzZSB0aGUgd2Fsa2VyIGluIG5ldyBUZW1wbGF0ZUluc3RhbmNlLl9jbG9uZSgpLlxuICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICBraW5kOiAndGVtcGxhdGUgcHJlcCcsXG4gICAgICAgIHRlbXBsYXRlOiB0aGlzLFxuICAgICAgICBjbG9uYWJsZVRlbXBsYXRlOiB0aGlzLmVsLFxuICAgICAgICBwYXJ0czogdGhpcy5wYXJ0cyxcbiAgICAgICAgc3RyaW5ncyxcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gT3ZlcnJpZGRlbiB2aWEgYGxpdEh0bWxQb2x5ZmlsbFN1cHBvcnRgIHRvIHByb3ZpZGUgcGxhdGZvcm0gc3VwcG9ydC5cbiAgLyoqIEBub2NvbGxhcHNlICovXG4gIHN0YXRpYyBjcmVhdGVFbGVtZW50KGh0bWw6IFRydXN0ZWRIVE1MLCBfb3B0aW9ucz86IFJlbmRlck9wdGlvbnMpIHtcbiAgICBjb25zdCBlbCA9IGQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICBlbC5pbm5lckhUTUwgPSBodG1sIGFzIHVua25vd24gYXMgc3RyaW5nO1xuICAgIHJldHVybiBlbDtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERpc2Nvbm5lY3RhYmxlIHtcbiAgXyRwYXJlbnQ/OiBEaXNjb25uZWN0YWJsZTtcbiAgXyRkaXNjb25uZWN0YWJsZUNoaWxkcmVuPzogU2V0PERpc2Nvbm5lY3RhYmxlPjtcbiAgLy8gUmF0aGVyIHRoYW4gaG9sZCBjb25uZWN0aW9uIHN0YXRlIG9uIGluc3RhbmNlcywgRGlzY29ubmVjdGFibGVzIHJlY3Vyc2l2ZWx5XG4gIC8vIGZldGNoIHRoZSBjb25uZWN0aW9uIHN0YXRlIGZyb20gdGhlIFJvb3RQYXJ0IHRoZXkgYXJlIGNvbm5lY3RlZCBpbiB2aWFcbiAgLy8gZ2V0dGVycyB1cCB0aGUgRGlzY29ubmVjdGFibGUgdHJlZSB2aWEgXyRwYXJlbnQgcmVmZXJlbmNlcy4gVGhpcyBwdXNoZXMgdGhlXG4gIC8vIGNvc3Qgb2YgdHJhY2tpbmcgdGhlIGlzQ29ubmVjdGVkIHN0YXRlIHRvIGBBc3luY0RpcmVjdGl2ZXNgLCBhbmQgYXZvaWRzXG4gIC8vIG5lZWRpbmcgdG8gcGFzcyBhbGwgRGlzY29ubmVjdGFibGVzIChwYXJ0cywgdGVtcGxhdGUgaW5zdGFuY2VzLCBhbmRcbiAgLy8gZGlyZWN0aXZlcykgdGhlaXIgY29ubmVjdGlvbiBzdGF0ZSBlYWNoIHRpbWUgaXQgY2hhbmdlcywgd2hpY2ggd291bGQgYmVcbiAgLy8gY29zdGx5IGZvciB0cmVlcyB0aGF0IGhhdmUgbm8gQXN5bmNEaXJlY3RpdmVzLlxuICBfJGlzQ29ubmVjdGVkOiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRGlyZWN0aXZlKFxuICBwYXJ0OiBDaGlsZFBhcnQgfCBBdHRyaWJ1dGVQYXJ0IHwgRWxlbWVudFBhcnQsXG4gIHZhbHVlOiB1bmtub3duLFxuICBwYXJlbnQ6IERpcmVjdGl2ZVBhcmVudCA9IHBhcnQsXG4gIGF0dHJpYnV0ZUluZGV4PzogbnVtYmVyXG4pOiB1bmtub3duIHtcbiAgLy8gQmFpbCBlYXJseSBpZiB0aGUgdmFsdWUgaXMgZXhwbGljaXRseSBub0NoYW5nZS4gTm90ZSwgdGhpcyBtZWFucyBhbnlcbiAgLy8gbmVzdGVkIGRpcmVjdGl2ZSBpcyBzdGlsbCBhdHRhY2hlZCBhbmQgaXMgbm90IHJ1bi5cbiAgaWYgKHZhbHVlID09PSBub0NoYW5nZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBsZXQgY3VycmVudERpcmVjdGl2ZSA9XG4gICAgYXR0cmlidXRlSW5kZXggIT09IHVuZGVmaW5lZFxuICAgICAgPyAocGFyZW50IGFzIEF0dHJpYnV0ZVBhcnQpLl9fZGlyZWN0aXZlcz8uW2F0dHJpYnV0ZUluZGV4XVxuICAgICAgOiAocGFyZW50IGFzIENoaWxkUGFydCB8IEVsZW1lbnRQYXJ0IHwgRGlyZWN0aXZlKS5fX2RpcmVjdGl2ZTtcbiAgY29uc3QgbmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yID0gaXNQcmltaXRpdmUodmFsdWUpXG4gICAgPyB1bmRlZmluZWRcbiAgICA6IC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gICAgICAodmFsdWUgYXMgRGlyZWN0aXZlUmVzdWx0KVsnXyRsaXREaXJlY3RpdmUkJ107XG4gIGlmIChjdXJyZW50RGlyZWN0aXZlPy5jb25zdHJ1Y3RvciAhPT0gbmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yKSB7XG4gICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICBjdXJyZW50RGlyZWN0aXZlPy5bJ18kbm90aWZ5RGlyZWN0aXZlQ29ubmVjdGlvbkNoYW5nZWQnXT8uKGZhbHNlKTtcbiAgICBpZiAobmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnREaXJlY3RpdmUgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnREaXJlY3RpdmUgPSBuZXcgbmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yKHBhcnQgYXMgUGFydEluZm8pO1xuICAgICAgY3VycmVudERpcmVjdGl2ZS5fJGluaXRpYWxpemUocGFydCwgcGFyZW50LCBhdHRyaWJ1dGVJbmRleCk7XG4gICAgfVxuICAgIGlmIChhdHRyaWJ1dGVJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAoKHBhcmVudCBhcyBBdHRyaWJ1dGVQYXJ0KS5fX2RpcmVjdGl2ZXMgPz89IFtdKVthdHRyaWJ1dGVJbmRleF0gPVxuICAgICAgICBjdXJyZW50RGlyZWN0aXZlO1xuICAgIH0gZWxzZSB7XG4gICAgICAocGFyZW50IGFzIENoaWxkUGFydCB8IERpcmVjdGl2ZSkuX19kaXJlY3RpdmUgPSBjdXJyZW50RGlyZWN0aXZlO1xuICAgIH1cbiAgfVxuICBpZiAoY3VycmVudERpcmVjdGl2ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFsdWUgPSByZXNvbHZlRGlyZWN0aXZlKFxuICAgICAgcGFydCxcbiAgICAgIGN1cnJlbnREaXJlY3RpdmUuXyRyZXNvbHZlKHBhcnQsICh2YWx1ZSBhcyBEaXJlY3RpdmVSZXN1bHQpLnZhbHVlcyksXG4gICAgICBjdXJyZW50RGlyZWN0aXZlLFxuICAgICAgYXR0cmlidXRlSW5kZXhcbiAgICApO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IHR5cGUge1RlbXBsYXRlSW5zdGFuY2V9O1xuLyoqXG4gKiBBbiB1cGRhdGVhYmxlIGluc3RhbmNlIG9mIGEgVGVtcGxhdGUuIEhvbGRzIHJlZmVyZW5jZXMgdG8gdGhlIFBhcnRzIHVzZWQgdG9cbiAqIHVwZGF0ZSB0aGUgdGVtcGxhdGUgaW5zdGFuY2UuXG4gKi9cbmNsYXNzIFRlbXBsYXRlSW5zdGFuY2UgaW1wbGVtZW50cyBEaXNjb25uZWN0YWJsZSB7XG4gIF8kdGVtcGxhdGU6IFRlbXBsYXRlO1xuICBfJHBhcnRzOiBBcnJheTxQYXJ0IHwgdW5kZWZpbmVkPiA9IFtdO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRwYXJlbnQ6IENoaWxkUGFydDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJGRpc2Nvbm5lY3RhYmxlQ2hpbGRyZW4/OiBTZXQ8RGlzY29ubmVjdGFibGU+ID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHRlbXBsYXRlOiBUZW1wbGF0ZSwgcGFyZW50OiBDaGlsZFBhcnQpIHtcbiAgICB0aGlzLl8kdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICB0aGlzLl8kcGFyZW50ID0gcGFyZW50O1xuICB9XG5cbiAgLy8gQ2FsbGVkIGJ5IENoaWxkUGFydCBwYXJlbnROb2RlIGdldHRlclxuICBnZXQgcGFyZW50Tm9kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fJHBhcmVudC5wYXJlbnROb2RlO1xuICB9XG5cbiAgLy8gU2VlIGNvbW1lbnQgaW4gRGlzY29ubmVjdGFibGUgaW50ZXJmYWNlIGZvciB3aHkgdGhpcyBpcyBhIGdldHRlclxuICBnZXQgXyRpc0Nvbm5lY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fJHBhcmVudC5fJGlzQ29ubmVjdGVkO1xuICB9XG5cbiAgLy8gVGhpcyBtZXRob2QgaXMgc2VwYXJhdGUgZnJvbSB0aGUgY29uc3RydWN0b3IgYmVjYXVzZSB3ZSBuZWVkIHRvIHJldHVybiBhXG4gIC8vIERvY3VtZW50RnJhZ21lbnQgYW5kIHdlIGRvbid0IHdhbnQgdG8gaG9sZCBvbnRvIGl0IHdpdGggYW4gaW5zdGFuY2UgZmllbGQuXG4gIF9jbG9uZShvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkKSB7XG4gICAgY29uc3Qge1xuICAgICAgZWw6IHtjb250ZW50fSxcbiAgICAgIHBhcnRzOiBwYXJ0cyxcbiAgICB9ID0gdGhpcy5fJHRlbXBsYXRlO1xuICAgIGNvbnN0IGZyYWdtZW50ID0gKG9wdGlvbnM/LmNyZWF0aW9uU2NvcGUgPz8gZCkuaW1wb3J0Tm9kZShjb250ZW50LCB0cnVlKTtcbiAgICB3YWxrZXIuY3VycmVudE5vZGUgPSBmcmFnbWVudDtcblxuICAgIGxldCBub2RlID0gd2Fsa2VyLm5leHROb2RlKCkhO1xuICAgIGxldCBub2RlSW5kZXggPSAwO1xuICAgIGxldCBwYXJ0SW5kZXggPSAwO1xuICAgIGxldCB0ZW1wbGF0ZVBhcnQgPSBwYXJ0c1swXTtcblxuICAgIHdoaWxlICh0ZW1wbGF0ZVBhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG5vZGVJbmRleCA9PT0gdGVtcGxhdGVQYXJ0LmluZGV4KSB7XG4gICAgICAgIGxldCBwYXJ0OiBQYXJ0IHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGVtcGxhdGVQYXJ0LnR5cGUgPT09IENISUxEX1BBUlQpIHtcbiAgICAgICAgICBwYXJ0ID0gbmV3IENoaWxkUGFydChcbiAgICAgICAgICAgIG5vZGUgYXMgSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICBub2RlLm5leHRTaWJsaW5nLFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHRlbXBsYXRlUGFydC50eXBlID09PSBBVFRSSUJVVEVfUEFSVCkge1xuICAgICAgICAgIHBhcnQgPSBuZXcgdGVtcGxhdGVQYXJ0LmN0b3IoXG4gICAgICAgICAgICBub2RlIGFzIEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgdGVtcGxhdGVQYXJ0Lm5hbWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVBhcnQuc3RyaW5ncyxcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmICh0ZW1wbGF0ZVBhcnQudHlwZSA9PT0gRUxFTUVOVF9QQVJUKSB7XG4gICAgICAgICAgcGFydCA9IG5ldyBFbGVtZW50UGFydChub2RlIGFzIEhUTUxFbGVtZW50LCB0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl8kcGFydHMucHVzaChwYXJ0KTtcbiAgICAgICAgdGVtcGxhdGVQYXJ0ID0gcGFydHNbKytwYXJ0SW5kZXhdO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVJbmRleCAhPT0gdGVtcGxhdGVQYXJ0Py5pbmRleCkge1xuICAgICAgICBub2RlID0gd2Fsa2VyLm5leHROb2RlKCkhO1xuICAgICAgICBub2RlSW5kZXgrKztcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gV2UgbmVlZCB0byBzZXQgdGhlIGN1cnJlbnROb2RlIGF3YXkgZnJvbSB0aGUgY2xvbmVkIHRyZWUgc28gdGhhdCB3ZVxuICAgIC8vIGRvbid0IGhvbGQgb250byB0aGUgdHJlZSBldmVuIGlmIHRoZSB0cmVlIGlzIGRldGFjaGVkIGFuZCBzaG91bGQgYmVcbiAgICAvLyBmcmVlZC5cbiAgICB3YWxrZXIuY3VycmVudE5vZGUgPSBkO1xuICAgIHJldHVybiBmcmFnbWVudDtcbiAgfVxuXG4gIF91cGRhdGUodmFsdWVzOiBBcnJheTx1bmtub3duPikge1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgdGhpcy5fJHBhcnRzKSB7XG4gICAgICBpZiAocGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICAgIGtpbmQ6ICdzZXQgcGFydCcsXG4gICAgICAgICAgICBwYXJ0LFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHZhbHVlSW5kZXg6IGksXG4gICAgICAgICAgICB2YWx1ZXMsXG4gICAgICAgICAgICB0ZW1wbGF0ZUluc3RhbmNlOiB0aGlzLFxuICAgICAgICAgIH0pO1xuICAgICAgICBpZiAoKHBhcnQgYXMgQXR0cmlidXRlUGFydCkuc3RyaW5ncyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgKHBhcnQgYXMgQXR0cmlidXRlUGFydCkuXyRzZXRWYWx1ZSh2YWx1ZXMsIHBhcnQgYXMgQXR0cmlidXRlUGFydCwgaSk7XG4gICAgICAgICAgLy8gVGhlIG51bWJlciBvZiB2YWx1ZXMgdGhlIHBhcnQgY29uc3VtZXMgaXMgcGFydC5zdHJpbmdzLmxlbmd0aCAtIDFcbiAgICAgICAgICAvLyBzaW5jZSB2YWx1ZXMgYXJlIGluIGJldHdlZW4gdGVtcGxhdGUgc3BhbnMuIFdlIGluY3JlbWVudCBpIGJ5IDFcbiAgICAgICAgICAvLyBsYXRlciBpbiB0aGUgbG9vcCwgc28gaW5jcmVtZW50IGl0IGJ5IHBhcnQuc3RyaW5ncy5sZW5ndGggLSAyIGhlcmVcbiAgICAgICAgICBpICs9IChwYXJ0IGFzIEF0dHJpYnV0ZVBhcnQpLnN0cmluZ3MhLmxlbmd0aCAtIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFydC5fJHNldFZhbHVlKHZhbHVlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9XG4gIH1cbn1cblxuLypcbiAqIFBhcnRzXG4gKi9cbnR5cGUgQXR0cmlidXRlVGVtcGxhdGVQYXJ0ID0ge1xuICByZWFkb25seSB0eXBlOiB0eXBlb2YgQVRUUklCVVRFX1BBUlQ7XG4gIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgY3RvcjogdHlwZW9mIEF0dHJpYnV0ZVBhcnQ7XG4gIHJlYWRvbmx5IHN0cmluZ3M6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbn07XG50eXBlIENoaWxkVGVtcGxhdGVQYXJ0ID0ge1xuICByZWFkb25seSB0eXBlOiB0eXBlb2YgQ0hJTERfUEFSVDtcbiAgcmVhZG9ubHkgaW5kZXg6IG51bWJlcjtcbn07XG50eXBlIEVsZW1lbnRUZW1wbGF0ZVBhcnQgPSB7XG4gIHJlYWRvbmx5IHR5cGU6IHR5cGVvZiBFTEVNRU5UX1BBUlQ7XG4gIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG59O1xudHlwZSBDb21tZW50VGVtcGxhdGVQYXJ0ID0ge1xuICByZWFkb25seSB0eXBlOiB0eXBlb2YgQ09NTUVOVF9QQVJUO1xuICByZWFkb25seSBpbmRleDogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBBIFRlbXBsYXRlUGFydCByZXByZXNlbnRzIGEgZHluYW1pYyBwYXJ0IGluIGEgdGVtcGxhdGUsIGJlZm9yZSB0aGUgdGVtcGxhdGVcbiAqIGlzIGluc3RhbnRpYXRlZC4gV2hlbiBhIHRlbXBsYXRlIGlzIGluc3RhbnRpYXRlZCBQYXJ0cyBhcmUgY3JlYXRlZCBmcm9tXG4gKiBUZW1wbGF0ZVBhcnRzLlxuICovXG50eXBlIFRlbXBsYXRlUGFydCA9XG4gIHwgQ2hpbGRUZW1wbGF0ZVBhcnRcbiAgfCBBdHRyaWJ1dGVUZW1wbGF0ZVBhcnRcbiAgfCBFbGVtZW50VGVtcGxhdGVQYXJ0XG4gIHwgQ29tbWVudFRlbXBsYXRlUGFydDtcblxuZXhwb3J0IHR5cGUgUGFydCA9XG4gIHwgQ2hpbGRQYXJ0XG4gIHwgQXR0cmlidXRlUGFydFxuICB8IFByb3BlcnR5UGFydFxuICB8IEJvb2xlYW5BdHRyaWJ1dGVQYXJ0XG4gIHwgRWxlbWVudFBhcnRcbiAgfCBFdmVudFBhcnQ7XG5cbmV4cG9ydCB0eXBlIHtDaGlsZFBhcnR9O1xuY2xhc3MgQ2hpbGRQYXJ0IGltcGxlbWVudHMgRGlzY29ubmVjdGFibGUge1xuICByZWFkb25seSB0eXBlID0gQ0hJTERfUEFSVDtcbiAgcmVhZG9ubHkgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgXyRjb21taXR0ZWRWYWx1ZTogdW5rbm93biA9IG5vdGhpbmc7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX19kaXJlY3RpdmU/OiBEaXJlY3RpdmU7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRzdGFydE5vZGU6IENoaWxkTm9kZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJGVuZE5vZGU6IENoaWxkTm9kZSB8IG51bGw7XG4gIHByaXZhdGUgX3RleHRTYW5pdGl6ZXI6IFZhbHVlU2FuaXRpemVyIHwgdW5kZWZpbmVkO1xuICAvKiogQGludGVybmFsICovXG4gIF8kcGFyZW50OiBEaXNjb25uZWN0YWJsZSB8IHVuZGVmaW5lZDtcbiAgLyoqXG4gICAqIENvbm5lY3Rpb24gc3RhdGUgZm9yIFJvb3RQYXJ0cyBvbmx5IChpLmUuIENoaWxkUGFydCB3aXRob3V0IF8kcGFyZW50XG4gICAqIHJldHVybmVkIGZyb20gdG9wLWxldmVsIGByZW5kZXJgKS4gVGhpcyBmaWVsZCBpcyB1bnVzZWQgb3RoZXJ3aXNlLiBUaGVcbiAgICogaW50ZW50aW9uIHdvdWxkIGJlIGNsZWFyZXIgaWYgd2UgbWFkZSBgUm9vdFBhcnRgIGEgc3ViY2xhc3Mgb2YgYENoaWxkUGFydGBcbiAgICogd2l0aCB0aGlzIGZpZWxkIChhbmQgYSBkaWZmZXJlbnQgXyRpc0Nvbm5lY3RlZCBnZXR0ZXIpLCBidXQgdGhlIHN1YmNsYXNzXG4gICAqIGNhdXNlZCBhIHBlcmYgcmVncmVzc2lvbiwgcG9zc2libHkgZHVlIHRvIG1ha2luZyBjYWxsIHNpdGVzIHBvbHltb3JwaGljLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9faXNDb25uZWN0ZWQ6IGJvb2xlYW47XG5cbiAgLy8gU2VlIGNvbW1lbnQgaW4gRGlzY29ubmVjdGFibGUgaW50ZXJmYWNlIGZvciB3aHkgdGhpcyBpcyBhIGdldHRlclxuICBnZXQgXyRpc0Nvbm5lY3RlZCgpIHtcbiAgICAvLyBDaGlsZFBhcnRzIHRoYXQgYXJlIG5vdCBhdCB0aGUgcm9vdCBzaG91bGQgYWx3YXlzIGJlIGNyZWF0ZWQgd2l0aCBhXG4gICAgLy8gcGFyZW50OyBvbmx5IFJvb3RDaGlsZE5vZGUncyB3b24ndCwgc28gdGhleSByZXR1cm4gdGhlIGxvY2FsIGlzQ29ubmVjdGVkXG4gICAgLy8gc3RhdGVcbiAgICByZXR1cm4gdGhpcy5fJHBhcmVudD8uXyRpc0Nvbm5lY3RlZCA/PyB0aGlzLl9faXNDb25uZWN0ZWQ7XG4gIH1cblxuICAvLyBUaGUgZm9sbG93aW5nIGZpZWxkcyB3aWxsIGJlIHBhdGNoZWQgb250byBDaGlsZFBhcnRzIHdoZW4gcmVxdWlyZWQgYnlcbiAgLy8gQXN5bmNEaXJlY3RpdmVcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJGRpc2Nvbm5lY3RhYmxlQ2hpbGRyZW4/OiBTZXQ8RGlzY29ubmVjdGFibGU+ID0gdW5kZWZpbmVkO1xuICAvKiogQGludGVybmFsICovXG4gIF8kbm90aWZ5Q29ubmVjdGlvbkNoYW5nZWQ/KFxuICAgIGlzQ29ubmVjdGVkOiBib29sZWFuLFxuICAgIHJlbW92ZUZyb21QYXJlbnQ/OiBib29sZWFuLFxuICAgIGZyb20/OiBudW1iZXJcbiAgKTogdm9pZDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJHJlcGFyZW50RGlzY29ubmVjdGFibGVzPyhwYXJlbnQ6IERpc2Nvbm5lY3RhYmxlKTogdm9pZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzdGFydE5vZGU6IENoaWxkTm9kZSxcbiAgICBlbmROb2RlOiBDaGlsZE5vZGUgfCBudWxsLFxuICAgIHBhcmVudDogVGVtcGxhdGVJbnN0YW5jZSB8IENoaWxkUGFydCB8IHVuZGVmaW5lZCxcbiAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHRoaXMuXyRzdGFydE5vZGUgPSBzdGFydE5vZGU7XG4gICAgdGhpcy5fJGVuZE5vZGUgPSBlbmROb2RlO1xuICAgIHRoaXMuXyRwYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAvLyBOb3RlIF9faXNDb25uZWN0ZWQgaXMgb25seSBldmVyIGFjY2Vzc2VkIG9uIFJvb3RQYXJ0cyAoaS5lLiB3aGVuIHRoZXJlIGlzXG4gICAgLy8gbm8gXyRwYXJlbnQpOyB0aGUgdmFsdWUgb24gYSBub24tcm9vdC1wYXJ0IGlzIFwiZG9uJ3QgY2FyZVwiLCBidXQgY2hlY2tpbmdcbiAgICAvLyBmb3IgcGFyZW50IHdvdWxkIGJlIG1vcmUgY29kZVxuICAgIHRoaXMuX19pc0Nvbm5lY3RlZCA9IG9wdGlvbnM/LmlzQ29ubmVjdGVkID8/IHRydWU7XG4gICAgaWYgKEVOQUJMRV9FWFRSQV9TRUNVUklUWV9IT09LUykge1xuICAgICAgLy8gRXhwbGljaXRseSBpbml0aWFsaXplIGZvciBjb25zaXN0ZW50IGNsYXNzIHNoYXBlLlxuICAgICAgdGhpcy5fdGV4dFNhbml0aXplciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIHBhcmVudCBub2RlIGludG8gd2hpY2ggdGhlIHBhcnQgcmVuZGVycyBpdHMgY29udGVudC5cbiAgICpcbiAgICogQSBDaGlsZFBhcnQncyBjb250ZW50IGNvbnNpc3RzIG9mIGEgcmFuZ2Ugb2YgYWRqYWNlbnQgY2hpbGQgbm9kZXMgb2ZcbiAgICogYC5wYXJlbnROb2RlYCwgcG9zc2libHkgYm9yZGVyZWQgYnkgJ21hcmtlciBub2RlcycgKGAuc3RhcnROb2RlYCBhbmRcbiAgICogYC5lbmROb2RlYCkuXG4gICAqXG4gICAqIC0gSWYgYm90aCBgLnN0YXJ0Tm9kZWAgYW5kIGAuZW5kTm9kZWAgYXJlIG5vbi1udWxsLCB0aGVuIHRoZSBwYXJ0J3MgY29udGVudFxuICAgKiBjb25zaXN0cyBvZiBhbGwgc2libGluZ3MgYmV0d2VlbiBgLnN0YXJ0Tm9kZWAgYW5kIGAuZW5kTm9kZWAsIGV4Y2x1c2l2ZWx5LlxuICAgKlxuICAgKiAtIElmIGAuc3RhcnROb2RlYCBpcyBub24tbnVsbCBidXQgYC5lbmROb2RlYCBpcyBudWxsLCB0aGVuIHRoZSBwYXJ0J3NcbiAgICogY29udGVudCBjb25zaXN0cyBvZiBhbGwgc2libGluZ3MgZm9sbG93aW5nIGAuc3RhcnROb2RlYCwgdXAgdG8gYW5kXG4gICAqIGluY2x1ZGluZyB0aGUgbGFzdCBjaGlsZCBvZiBgLnBhcmVudE5vZGVgLiBJZiBgLmVuZE5vZGVgIGlzIG5vbi1udWxsLCB0aGVuXG4gICAqIGAuc3RhcnROb2RlYCB3aWxsIGFsd2F5cyBiZSBub24tbnVsbC5cbiAgICpcbiAgICogLSBJZiBib3RoIGAuZW5kTm9kZWAgYW5kIGAuc3RhcnROb2RlYCBhcmUgbnVsbCwgdGhlbiB0aGUgcGFydCdzIGNvbnRlbnRcbiAgICogY29uc2lzdHMgb2YgYWxsIGNoaWxkIG5vZGVzIG9mIGAucGFyZW50Tm9kZWAuXG4gICAqL1xuICBnZXQgcGFyZW50Tm9kZSgpOiBOb2RlIHtcbiAgICBsZXQgcGFyZW50Tm9kZTogTm9kZSA9IHdyYXAodGhpcy5fJHN0YXJ0Tm9kZSkucGFyZW50Tm9kZSE7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5fJHBhcmVudDtcbiAgICBpZiAoXG4gICAgICBwYXJlbnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgcGFyZW50Tm9kZT8ubm9kZVR5cGUgPT09IDExIC8qIE5vZGUuRE9DVU1FTlRfRlJBR01FTlQgKi9cbiAgICApIHtcbiAgICAgIC8vIElmIHRoZSBwYXJlbnROb2RlIGlzIGEgRG9jdW1lbnRGcmFnbWVudCwgaXQgbWF5IGJlIGJlY2F1c2UgdGhlIERPTSBpc1xuICAgICAgLy8gc3RpbGwgaW4gdGhlIGNsb25lZCBmcmFnbWVudCBkdXJpbmcgaW5pdGlhbCByZW5kZXI7IGlmIHNvLCBnZXQgdGhlIHJlYWxcbiAgICAgIC8vIHBhcmVudE5vZGUgdGhlIHBhcnQgd2lsbCBiZSBjb21taXR0ZWQgaW50byBieSBhc2tpbmcgdGhlIHBhcmVudC5cbiAgICAgIHBhcmVudE5vZGUgPSAocGFyZW50IGFzIENoaWxkUGFydCB8IFRlbXBsYXRlSW5zdGFuY2UpLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnROb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBwYXJ0J3MgbGVhZGluZyBtYXJrZXIgbm9kZSwgaWYgYW55LiBTZWUgYC5wYXJlbnROb2RlYCBmb3IgbW9yZVxuICAgKiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGdldCBzdGFydE5vZGUoKTogTm9kZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl8kc3RhcnROb2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBwYXJ0J3MgdHJhaWxpbmcgbWFya2VyIG5vZGUsIGlmIGFueS4gU2VlIGAucGFyZW50Tm9kZWAgZm9yIG1vcmVcbiAgICogaW5mb3JtYXRpb24uXG4gICAqL1xuICBnZXQgZW5kTm9kZSgpOiBOb2RlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuXyRlbmROb2RlO1xuICB9XG5cbiAgXyRzZXRWYWx1ZSh2YWx1ZTogdW5rbm93biwgZGlyZWN0aXZlUGFyZW50OiBEaXJlY3RpdmVQYXJlbnQgPSB0aGlzKTogdm9pZCB7XG4gICAgaWYgKERFVl9NT0RFICYmIHRoaXMucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVGhpcyBcXGBDaGlsZFBhcnRcXGAgaGFzIG5vIFxcYHBhcmVudE5vZGVcXGAgYW5kIHRoZXJlZm9yZSBjYW5ub3QgYWNjZXB0IGEgdmFsdWUuIFRoaXMgbGlrZWx5IG1lYW5zIHRoZSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIHBhcnQgd2FzIG1hbmlwdWxhdGVkIGluIGFuIHVuc3VwcG9ydGVkIHdheSBvdXRzaWRlIG9mIExpdCdzIGNvbnRyb2wgc3VjaCB0aGF0IHRoZSBwYXJ0J3MgbWFya2VyIG5vZGVzIHdlcmUgZWplY3RlZCBmcm9tIERPTS4gRm9yIGV4YW1wbGUsIHNldHRpbmcgdGhlIGVsZW1lbnQncyBcXGBpbm5lckhUTUxcXGAgb3IgXFxgdGV4dENvbnRlbnRcXGAgY2FuIGRvIHRoaXMuYFxuICAgICAgKTtcbiAgICB9XG4gICAgdmFsdWUgPSByZXNvbHZlRGlyZWN0aXZlKHRoaXMsIHZhbHVlLCBkaXJlY3RpdmVQYXJlbnQpO1xuICAgIGlmIChpc1ByaW1pdGl2ZSh2YWx1ZSkpIHtcbiAgICAgIC8vIE5vbi1yZW5kZXJpbmcgY2hpbGQgdmFsdWVzLiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZXNlIGRvIG5vdCByZW5kZXJcbiAgICAgIC8vIGVtcHR5IHRleHQgbm9kZXMgdG8gYXZvaWQgaXNzdWVzIHdpdGggcHJldmVudGluZyBkZWZhdWx0IDxzbG90PlxuICAgICAgLy8gZmFsbGJhY2sgY29udGVudC5cbiAgICAgIGlmICh2YWx1ZSA9PT0gbm90aGluZyB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICBpZiAodGhpcy5fJGNvbW1pdHRlZFZhbHVlICE9PSBub3RoaW5nKSB7XG4gICAgICAgICAgZGVidWdMb2dFdmVudCAmJlxuICAgICAgICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICAgIGtpbmQ6ICdjb21taXQgbm90aGluZyB0byBjaGlsZCcsXG4gICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLl8kc3RhcnROb2RlLFxuICAgICAgICAgICAgICBlbmQ6IHRoaXMuXyRlbmROb2RlLFxuICAgICAgICAgICAgICBwYXJlbnQ6IHRoaXMuXyRwYXJlbnQsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuXyRjbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IG5vdGhpbmc7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSB0aGlzLl8kY29tbWl0dGVkVmFsdWUgJiYgdmFsdWUgIT09IG5vQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuX2NvbW1pdFRleHQodmFsdWUpO1xuICAgICAgfVxuICAgICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICB9IGVsc2UgaWYgKCh2YWx1ZSBhcyBUZW1wbGF0ZVJlc3VsdClbJ18kbGl0VHlwZSQnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9jb21taXRUZW1wbGF0ZVJlc3VsdCh2YWx1ZSBhcyBUZW1wbGF0ZVJlc3VsdCk7XG4gICAgfSBlbHNlIGlmICgodmFsdWUgYXMgTm9kZSkubm9kZVR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKERFVl9NT0RFICYmIHRoaXMub3B0aW9ucz8uaG9zdCA9PT0gdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY29tbWl0VGV4dChcbiAgICAgICAgICBgW3Byb2JhYmxlIG1pc3Rha2U6IHJlbmRlcmVkIGEgdGVtcGxhdGUncyBob3N0IGluIGl0c2VsZiBgICtcbiAgICAgICAgICAgIGAoY29tbW9ubHkgY2F1c2VkIGJ5IHdyaXRpbmcgXFwke3RoaXN9IGluIGEgdGVtcGxhdGVdYFxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYEF0dGVtcHRlZCB0byByZW5kZXIgdGhlIHRlbXBsYXRlIGhvc3RgLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGBpbnNpZGUgaXRzZWxmLiBUaGlzIGlzIGFsbW9zdCBhbHdheXMgYSBtaXN0YWtlLCBhbmQgaW4gZGV2IG1vZGUgYCxcbiAgICAgICAgICBgd2UgcmVuZGVyIHNvbWUgd2FybmluZyB0ZXh0LiBJbiBwcm9kdWN0aW9uIGhvd2V2ZXIsIHdlJ2xsIGAsXG4gICAgICAgICAgYHJlbmRlciBpdCwgd2hpY2ggd2lsbCB1c3VhbGx5IHJlc3VsdCBpbiBhbiBlcnJvciwgYW5kIHNvbWV0aW1lcyBgLFxuICAgICAgICAgIGBpbiB0aGUgZWxlbWVudCBkaXNhcHBlYXJpbmcgZnJvbSB0aGUgRE9NLmBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29tbWl0Tm9kZSh2YWx1ZSBhcyBOb2RlKTtcbiAgICB9IGVsc2UgaWYgKGlzSXRlcmFibGUodmFsdWUpKSB7XG4gICAgICB0aGlzLl9jb21taXRJdGVyYWJsZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZhbGxiYWNrLCB3aWxsIHJlbmRlciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gICAgICB0aGlzLl9jb21taXRUZXh0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbnNlcnQ8VCBleHRlbmRzIE5vZGU+KG5vZGU6IFQpIHtcbiAgICByZXR1cm4gd3JhcCh3cmFwKHRoaXMuXyRzdGFydE5vZGUpLnBhcmVudE5vZGUhKS5pbnNlcnRCZWZvcmUoXG4gICAgICBub2RlLFxuICAgICAgdGhpcy5fJGVuZE5vZGVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tbWl0Tm9kZSh2YWx1ZTogTm9kZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl8kY29tbWl0dGVkVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl8kY2xlYXIoKTtcbiAgICAgIGlmIChcbiAgICAgICAgRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTICYmXG4gICAgICAgIHNhbml0aXplckZhY3RvcnlJbnRlcm5hbCAhPT0gbm9vcFNhbml0aXplclxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGVOYW1lID0gdGhpcy5fJHN0YXJ0Tm9kZS5wYXJlbnROb2RlPy5ub2RlTmFtZTtcbiAgICAgICAgaWYgKHBhcmVudE5vZGVOYW1lID09PSAnU1RZTEUnIHx8IHBhcmVudE5vZGVOYW1lID09PSAnU0NSSVBUJykge1xuICAgICAgICAgIGxldCBtZXNzYWdlID0gJ0ZvcmJpZGRlbic7XG4gICAgICAgICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZU5hbWUgPT09ICdTVFlMRScpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICAgICAgYExpdCBkb2VzIG5vdCBzdXBwb3J0IGJpbmRpbmcgaW5zaWRlIHN0eWxlIG5vZGVzLiBgICtcbiAgICAgICAgICAgICAgICBgVGhpcyBpcyBhIHNlY3VyaXR5IHJpc2ssIGFzIHN0eWxlIGluamVjdGlvbiBhdHRhY2tzIGNhbiBgICtcbiAgICAgICAgICAgICAgICBgZXhmaWx0cmF0ZSBkYXRhIGFuZCBzcG9vZiBVSXMuIGAgK1xuICAgICAgICAgICAgICAgIGBDb25zaWRlciBpbnN0ZWFkIHVzaW5nIGNzc1xcYC4uLlxcYCBsaXRlcmFscyBgICtcbiAgICAgICAgICAgICAgICBgdG8gY29tcG9zZSBzdHlsZXMsIGFuZCBkbyBkeW5hbWljIHN0eWxpbmcgd2l0aCBgICtcbiAgICAgICAgICAgICAgICBgY3NzIGN1c3RvbSBwcm9wZXJ0aWVzLCA6OnBhcnRzLCA8c2xvdD5zLCBgICtcbiAgICAgICAgICAgICAgICBgYW5kIGJ5IG11dGF0aW5nIHRoZSBET00gcmF0aGVyIHRoYW4gc3R5bGVzaGVldHMuYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPVxuICAgICAgICAgICAgICAgIGBMaXQgZG9lcyBub3Qgc3VwcG9ydCBiaW5kaW5nIGluc2lkZSBzY3JpcHQgbm9kZXMuIGAgK1xuICAgICAgICAgICAgICAgIGBUaGlzIGlzIGEgc2VjdXJpdHkgcmlzaywgYXMgaXQgY291bGQgYWxsb3cgYXJiaXRyYXJ5IGAgK1xuICAgICAgICAgICAgICAgIGBjb2RlIGV4ZWN1dGlvbi5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAga2luZDogJ2NvbW1pdCBub2RlJyxcbiAgICAgICAgICBzdGFydDogdGhpcy5fJHN0YXJ0Tm9kZSxcbiAgICAgICAgICBwYXJlbnQ6IHRoaXMuXyRwYXJlbnQsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSB0aGlzLl9pbnNlcnQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbW1pdFRleHQodmFsdWU6IHVua25vd24pOiB2b2lkIHtcbiAgICAvLyBJZiB0aGUgY29tbWl0dGVkIHZhbHVlIGlzIGEgcHJpbWl0aXZlIGl0IG1lYW5zIHdlIGNhbGxlZCBfY29tbWl0VGV4dCBvblxuICAgIC8vIHRoZSBwcmV2aW91cyByZW5kZXIsIGFuZCB3ZSBrbm93IHRoYXQgdGhpcy5fJHN0YXJ0Tm9kZS5uZXh0U2libGluZyBpcyBhXG4gICAgLy8gVGV4dCBub2RlLiBXZSBjYW4gbm93IGp1c3QgcmVwbGFjZSB0aGUgdGV4dCBjb250ZW50ICguZGF0YSkgb2YgdGhlIG5vZGUuXG4gICAgaWYgKFxuICAgICAgdGhpcy5fJGNvbW1pdHRlZFZhbHVlICE9PSBub3RoaW5nICYmXG4gICAgICBpc1ByaW1pdGl2ZSh0aGlzLl8kY29tbWl0dGVkVmFsdWUpXG4gICAgKSB7XG4gICAgICBjb25zdCBub2RlID0gd3JhcCh0aGlzLl8kc3RhcnROb2RlKS5uZXh0U2libGluZyBhcyBUZXh0O1xuICAgICAgaWYgKEVOQUJMRV9FWFRSQV9TRUNVUklUWV9IT09LUykge1xuICAgICAgICBpZiAodGhpcy5fdGV4dFNhbml0aXplciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5fdGV4dFNhbml0aXplciA9IGNyZWF0ZVNhbml0aXplcihub2RlLCAnZGF0YScsICdwcm9wZXJ0eScpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gdGhpcy5fdGV4dFNhbml0aXplcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICAgIGtpbmQ6ICdjb21taXQgdGV4dCcsXG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgKG5vZGUgYXMgVGV4dCkuZGF0YSA9IHZhbHVlIGFzIHN0cmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKEVOQUJMRV9FWFRSQV9TRUNVUklUWV9IT09LUykge1xuICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgICAgICB0aGlzLl9jb21taXROb2RlKHRleHROb2RlKTtcbiAgICAgICAgLy8gV2hlbiBzZXR0aW5nIHRleHQgY29udGVudCwgZm9yIHNlY3VyaXR5IHB1cnBvc2VzIGl0IG1hdHRlcnMgYSBsb3RcbiAgICAgICAgLy8gd2hhdCB0aGUgcGFyZW50IGlzLiBGb3IgZXhhbXBsZSwgPHN0eWxlPiBhbmQgPHNjcmlwdD4gbmVlZCB0byBiZVxuICAgICAgICAvLyBoYW5kbGVkIHdpdGggY2FyZSwgd2hpbGUgPHNwYW4+IGRvZXMgbm90LiBTbyBmaXJzdCB3ZSBuZWVkIHRvIHB1dCBhXG4gICAgICAgIC8vIHRleHQgbm9kZSBpbnRvIHRoZSBkb2N1bWVudCwgdGhlbiB3ZSBjYW4gc2FuaXRpemUgaXRzIGNvbnRlbnQuXG4gICAgICAgIGlmICh0aGlzLl90ZXh0U2FuaXRpemVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLl90ZXh0U2FuaXRpemVyID0gY3JlYXRlU2FuaXRpemVyKHRleHROb2RlLCAnZGF0YScsICdwcm9wZXJ0eScpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gdGhpcy5fdGV4dFNhbml0aXplcih2YWx1ZSk7XG4gICAgICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICAgIGtpbmQ6ICdjb21taXQgdGV4dCcsXG4gICAgICAgICAgICBub2RlOiB0ZXh0Tm9kZSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgIH0pO1xuICAgICAgICB0ZXh0Tm9kZS5kYXRhID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY29tbWl0Tm9kZShkLmNyZWF0ZVRleHROb2RlKHZhbHVlIGFzIHN0cmluZykpO1xuICAgICAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICBraW5kOiAnY29tbWl0IHRleHQnLFxuICAgICAgICAgICAgbm9kZTogd3JhcCh0aGlzLl8kc3RhcnROb2RlKS5uZXh0U2libGluZyBhcyBUZXh0LFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tbWl0VGVtcGxhdGVSZXN1bHQoXG4gICAgcmVzdWx0OiBUZW1wbGF0ZVJlc3VsdCB8IENvbXBpbGVkVGVtcGxhdGVSZXN1bHRcbiAgKTogdm9pZCB7XG4gICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICBjb25zdCB7dmFsdWVzLCBbJ18kbGl0VHlwZSQnXTogdHlwZX0gPSByZXN1bHQ7XG4gICAgLy8gSWYgJGxpdFR5cGUkIGlzIGEgbnVtYmVyLCByZXN1bHQgaXMgYSBwbGFpbiBUZW1wbGF0ZVJlc3VsdCBhbmQgd2UgZ2V0XG4gICAgLy8gdGhlIHRlbXBsYXRlIGZyb20gdGhlIHRlbXBsYXRlIGNhY2hlLiBJZiBub3QsIHJlc3VsdCBpcyBhXG4gICAgLy8gQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdCBhbmQgXyRsaXRUeXBlJCBpcyBhIENvbXBpbGVkVGVtcGxhdGUgYW5kIHdlIG5lZWRcbiAgICAvLyB0byBjcmVhdGUgdGhlIDx0ZW1wbGF0ZT4gZWxlbWVudCB0aGUgZmlyc3QgdGltZSB3ZSBzZWUgaXQuXG4gICAgY29uc3QgdGVtcGxhdGU6IFRlbXBsYXRlIHwgQ29tcGlsZWRUZW1wbGF0ZSA9XG4gICAgICB0eXBlb2YgdHlwZSA9PT0gJ251bWJlcidcbiAgICAgICAgPyB0aGlzLl8kZ2V0VGVtcGxhdGUocmVzdWx0IGFzIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdClcbiAgICAgICAgOiAodHlwZS5lbCA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAodHlwZS5lbCA9IFRlbXBsYXRlLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIHRydXN0RnJvbVRlbXBsYXRlU3RyaW5nKHR5cGUuaCwgdHlwZS5oWzBdKSxcbiAgICAgICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICAgICApKSxcbiAgICAgICAgICB0eXBlKTtcblxuICAgIGlmICgodGhpcy5fJGNvbW1pdHRlZFZhbHVlIGFzIFRlbXBsYXRlSW5zdGFuY2UpPy5fJHRlbXBsYXRlID09PSB0ZW1wbGF0ZSkge1xuICAgICAgZGVidWdMb2dFdmVudCAmJlxuICAgICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICBraW5kOiAndGVtcGxhdGUgdXBkYXRpbmcnLFxuICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgIGluc3RhbmNlOiB0aGlzLl8kY29tbWl0dGVkVmFsdWUgYXMgVGVtcGxhdGVJbnN0YW5jZSxcbiAgICAgICAgICBwYXJ0czogKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBUZW1wbGF0ZUluc3RhbmNlKS5fJHBhcnRzLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICB2YWx1ZXMsXG4gICAgICAgIH0pO1xuICAgICAgKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBUZW1wbGF0ZUluc3RhbmNlKS5fdXBkYXRlKHZhbHVlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFRlbXBsYXRlSW5zdGFuY2UodGVtcGxhdGUgYXMgVGVtcGxhdGUsIHRoaXMpO1xuICAgICAgY29uc3QgZnJhZ21lbnQgPSBpbnN0YW5jZS5fY2xvbmUodGhpcy5vcHRpb25zKTtcbiAgICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAga2luZDogJ3RlbXBsYXRlIGluc3RhbnRpYXRlZCcsXG4gICAgICAgICAgdGVtcGxhdGUsXG4gICAgICAgICAgaW5zdGFuY2UsXG4gICAgICAgICAgcGFydHM6IGluc3RhbmNlLl8kcGFydHMsXG4gICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgIGZyYWdtZW50LFxuICAgICAgICAgIHZhbHVlcyxcbiAgICAgICAgfSk7XG4gICAgICBpbnN0YW5jZS5fdXBkYXRlKHZhbHVlcyk7XG4gICAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICAgIGtpbmQ6ICd0ZW1wbGF0ZSBpbnN0YW50aWF0ZWQgYW5kIHVwZGF0ZWQnLFxuICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgIGluc3RhbmNlLFxuICAgICAgICAgIHBhcnRzOiBpbnN0YW5jZS5fJHBhcnRzLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICBmcmFnbWVudCxcbiAgICAgICAgICB2YWx1ZXMsXG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5fY29tbWl0Tm9kZShmcmFnbWVudCk7XG4gICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSBpbnN0YW5jZTtcbiAgICB9XG4gIH1cblxuICAvLyBPdmVycmlkZGVuIHZpYSBgbGl0SHRtbFBvbHlmaWxsU3VwcG9ydGAgdG8gcHJvdmlkZSBwbGF0Zm9ybSBzdXBwb3J0LlxuICAvKiogQGludGVybmFsICovXG4gIF8kZ2V0VGVtcGxhdGUocmVzdWx0OiBVbmNvbXBpbGVkVGVtcGxhdGVSZXN1bHQpIHtcbiAgICBsZXQgdGVtcGxhdGUgPSB0ZW1wbGF0ZUNhY2hlLmdldChyZXN1bHQuc3RyaW5ncyk7XG4gICAgaWYgKHRlbXBsYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRlbXBsYXRlQ2FjaGUuc2V0KHJlc3VsdC5zdHJpbmdzLCAodGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUocmVzdWx0KSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICBwcml2YXRlIF9jb21taXRJdGVyYWJsZSh2YWx1ZTogSXRlcmFibGU8dW5rbm93bj4pOiB2b2lkIHtcbiAgICAvLyBGb3IgYW4gSXRlcmFibGUsIHdlIGNyZWF0ZSBhIG5ldyBJbnN0YW5jZVBhcnQgcGVyIGl0ZW0sIHRoZW4gc2V0IGl0c1xuICAgIC8vIHZhbHVlIHRvIHRoZSBpdGVtLiBUaGlzIGlzIGEgbGl0dGxlIGJpdCBvZiBvdmVyaGVhZCBmb3IgZXZlcnkgaXRlbSBpblxuICAgIC8vIGFuIEl0ZXJhYmxlLCBidXQgaXQgbGV0cyB1cyByZWN1cnNlIGVhc2lseSBhbmQgZWZmaWNpZW50bHkgdXBkYXRlIEFycmF5c1xuICAgIC8vIG9mIFRlbXBsYXRlUmVzdWx0cyB0aGF0IHdpbGwgYmUgY29tbW9ubHkgcmV0dXJuZWQgZnJvbSBleHByZXNzaW9ucyBsaWtlOlxuICAgIC8vIGFycmF5Lm1hcCgoaSkgPT4gaHRtbGAke2l9YCksIGJ5IHJldXNpbmcgZXhpc3RpbmcgVGVtcGxhdGVJbnN0YW5jZXMuXG5cbiAgICAvLyBJZiB2YWx1ZSBpcyBhbiBhcnJheSwgdGhlbiB0aGUgcHJldmlvdXMgcmVuZGVyIHdhcyBvZiBhblxuICAgIC8vIGl0ZXJhYmxlIGFuZCB2YWx1ZSB3aWxsIGNvbnRhaW4gdGhlIENoaWxkUGFydHMgZnJvbSB0aGUgcHJldmlvdXNcbiAgICAvLyByZW5kZXIuIElmIHZhbHVlIGlzIG5vdCBhbiBhcnJheSwgY2xlYXIgdGhpcyBwYXJ0IGFuZCBtYWtlIGEgbmV3XG4gICAgLy8gYXJyYXkgZm9yIENoaWxkUGFydHMuXG4gICAgaWYgKCFpc0FycmF5KHRoaXMuXyRjb21taXR0ZWRWYWx1ZSkpIHtcbiAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IFtdO1xuICAgICAgdGhpcy5fJGNsZWFyKCk7XG4gICAgfVxuXG4gICAgLy8gTGV0cyB1cyBrZWVwIHRyYWNrIG9mIGhvdyBtYW55IGl0ZW1zIHdlIHN0YW1wZWQgc28gd2UgY2FuIGNsZWFyIGxlZnRvdmVyXG4gICAgLy8gaXRlbXMgZnJvbSBhIHByZXZpb3VzIHJlbmRlclxuICAgIGNvbnN0IGl0ZW1QYXJ0cyA9IHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBDaGlsZFBhcnRbXTtcbiAgICBsZXQgcGFydEluZGV4ID0gMDtcbiAgICBsZXQgaXRlbVBhcnQ6IENoaWxkUGFydCB8IHVuZGVmaW5lZDtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgaWYgKHBhcnRJbmRleCA9PT0gaXRlbVBhcnRzLmxlbmd0aCkge1xuICAgICAgICAvLyBJZiBubyBleGlzdGluZyBwYXJ0LCBjcmVhdGUgYSBuZXcgb25lXG4gICAgICAgIC8vIFRPRE8gKGp1c3RpbmZhZ25hbmkpOiB0ZXN0IHBlcmYgaW1wYWN0IG9mIGFsd2F5cyBjcmVhdGluZyB0d28gcGFydHNcbiAgICAgICAgLy8gaW5zdGVhZCBvZiBzaGFyaW5nIHBhcnRzIGJldHdlZW4gbm9kZXNcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2xpdC9saXQvaXNzdWVzLzEyNjZcbiAgICAgICAgaXRlbVBhcnRzLnB1c2goXG4gICAgICAgICAgKGl0ZW1QYXJ0ID0gbmV3IENoaWxkUGFydChcbiAgICAgICAgICAgIHRoaXMuX2luc2VydChjcmVhdGVNYXJrZXIoKSksXG4gICAgICAgICAgICB0aGlzLl9pbnNlcnQoY3JlYXRlTWFya2VyKCkpLFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICAgICkpXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSZXVzZSBhbiBleGlzdGluZyBwYXJ0XG4gICAgICAgIGl0ZW1QYXJ0ID0gaXRlbVBhcnRzW3BhcnRJbmRleF07XG4gICAgICB9XG4gICAgICBpdGVtUGFydC5fJHNldFZhbHVlKGl0ZW0pO1xuICAgICAgcGFydEluZGV4Kys7XG4gICAgfVxuXG4gICAgaWYgKHBhcnRJbmRleCA8IGl0ZW1QYXJ0cy5sZW5ndGgpIHtcbiAgICAgIC8vIGl0ZW1QYXJ0cyBhbHdheXMgaGF2ZSBlbmQgbm9kZXNcbiAgICAgIHRoaXMuXyRjbGVhcihcbiAgICAgICAgaXRlbVBhcnQgJiYgd3JhcChpdGVtUGFydC5fJGVuZE5vZGUhKS5uZXh0U2libGluZyxcbiAgICAgICAgcGFydEluZGV4XG4gICAgICApO1xuICAgICAgLy8gVHJ1bmNhdGUgdGhlIHBhcnRzIGFycmF5IHNvIF92YWx1ZSByZWZsZWN0cyB0aGUgY3VycmVudCBzdGF0ZVxuICAgICAgaXRlbVBhcnRzLmxlbmd0aCA9IHBhcnRJbmRleDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgbm9kZXMgY29udGFpbmVkIHdpdGhpbiB0aGlzIFBhcnQgZnJvbSB0aGUgRE9NLlxuICAgKlxuICAgKiBAcGFyYW0gc3RhcnQgU3RhcnQgbm9kZSB0byBjbGVhciBmcm9tLCBmb3IgY2xlYXJpbmcgYSBzdWJzZXQgb2YgdGhlIHBhcnQnc1xuICAgKiAgICAgRE9NICh1c2VkIHdoZW4gdHJ1bmNhdGluZyBpdGVyYWJsZXMpXG4gICAqIEBwYXJhbSBmcm9tICBXaGVuIGBzdGFydGAgaXMgc3BlY2lmaWVkLCB0aGUgaW5kZXggd2l0aGluIHRoZSBpdGVyYWJsZSBmcm9tXG4gICAqICAgICB3aGljaCBDaGlsZFBhcnRzIGFyZSBiZWluZyByZW1vdmVkLCB1c2VkIGZvciBkaXNjb25uZWN0aW5nIGRpcmVjdGl2ZXNcbiAgICogICAgIGluIHRob3NlIFBhcnRzLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF8kY2xlYXIoXG4gICAgc3RhcnQ6IENoaWxkTm9kZSB8IG51bGwgPSB3cmFwKHRoaXMuXyRzdGFydE5vZGUpLm5leHRTaWJsaW5nLFxuICAgIGZyb20/OiBudW1iZXJcbiAgKSB7XG4gICAgdGhpcy5fJG5vdGlmeUNvbm5lY3Rpb25DaGFuZ2VkPy4oZmFsc2UsIHRydWUsIGZyb20pO1xuICAgIHdoaWxlIChzdGFydCAhPT0gdGhpcy5fJGVuZE5vZGUpIHtcbiAgICAgIC8vIFRoZSBub24tbnVsbCBhc3NlcnRpb24gaXMgc2FmZSBiZWNhdXNlIGlmIF8kc3RhcnROb2RlLm5leHRTaWJsaW5nIGlzXG4gICAgICAvLyBudWxsLCB0aGVuIF8kZW5kTm9kZSBpcyBhbHNvIG51bGwsIGFuZCB3ZSB3b3VsZCBub3QgaGF2ZSBlbnRlcmVkIHRoaXNcbiAgICAgIC8vIGxvb3AuXG4gICAgICBjb25zdCBuID0gd3JhcChzdGFydCEpLm5leHRTaWJsaW5nO1xuICAgICAgd3JhcChzdGFydCEpLnJlbW92ZSgpO1xuICAgICAgc3RhcnQgPSBuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRhdGlvbiBvZiBSb290UGFydCdzIGBpc0Nvbm5lY3RlZGAuIE5vdGUgdGhhdCB0aGlzIG1ldGhvZFxuICAgKiBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYFJvb3RQYXJ0YHMgKHRoZSBgQ2hpbGRQYXJ0YCByZXR1cm5lZCBmcm9tIGFcbiAgICogdG9wLWxldmVsIGByZW5kZXIoKWAgY2FsbCkuIEl0IGhhcyBubyBlZmZlY3Qgb24gbm9uLXJvb3QgQ2hpbGRQYXJ0cy5cbiAgICogQHBhcmFtIGlzQ29ubmVjdGVkIFdoZXRoZXIgdG8gc2V0XG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgc2V0Q29ubmVjdGVkKGlzQ29ubmVjdGVkOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuXyRwYXJlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fX2lzQ29ubmVjdGVkID0gaXNDb25uZWN0ZWQ7XG4gICAgICB0aGlzLl8kbm90aWZ5Q29ubmVjdGlvbkNoYW5nZWQ/Lihpc0Nvbm5lY3RlZCk7XG4gICAgfSBlbHNlIGlmIChERVZfTU9ERSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAncGFydC5zZXRDb25uZWN0ZWQoKSBtYXkgb25seSBiZSBjYWxsZWQgb24gYSAnICtcbiAgICAgICAgICAnUm9vdFBhcnQgcmV0dXJuZWQgZnJvbSByZW5kZXIoKS4nXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEEgdG9wLWxldmVsIGBDaGlsZFBhcnRgIHJldHVybmVkIGZyb20gYHJlbmRlcmAgdGhhdCBtYW5hZ2VzIHRoZSBjb25uZWN0ZWRcbiAqIHN0YXRlIG9mIGBBc3luY0RpcmVjdGl2ZWBzIGNyZWF0ZWQgdGhyb3VnaG91dCB0aGUgdHJlZSBiZWxvdyBpdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSb290UGFydCBleHRlbmRzIENoaWxkUGFydCB7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjb25uZWN0aW9uIHN0YXRlIGZvciBgQXN5bmNEaXJlY3RpdmVgcyBjb250YWluZWQgd2l0aGluIHRoaXMgcm9vdFxuICAgKiBDaGlsZFBhcnQuXG4gICAqXG4gICAqIGxpdC1odG1sIGRvZXMgbm90IGF1dG9tYXRpY2FsbHkgbW9uaXRvciB0aGUgY29ubmVjdGVkbmVzcyBvZiBET00gcmVuZGVyZWQ7XG4gICAqIGFzIHN1Y2gsIGl0IGlzIHRoZSByZXNwb25zaWJpbGl0eSBvZiB0aGUgY2FsbGVyIHRvIGByZW5kZXJgIHRvIGVuc3VyZSB0aGF0XG4gICAqIGBwYXJ0LnNldENvbm5lY3RlZChmYWxzZSlgIGlzIGNhbGxlZCBiZWZvcmUgdGhlIHBhcnQgb2JqZWN0IGlzIHBvdGVudGlhbGx5XG4gICAqIGRpc2NhcmRlZCwgdG8gZW5zdXJlIHRoYXQgYEFzeW5jRGlyZWN0aXZlYHMgaGF2ZSBhIGNoYW5jZSB0byBkaXNwb3NlIG9mXG4gICAqIGFueSByZXNvdXJjZXMgYmVpbmcgaGVsZC4gSWYgYSBgUm9vdFBhcnRgIHRoYXQgd2FzIHByZXZpb3VzbHlcbiAgICogZGlzY29ubmVjdGVkIGlzIHN1YnNlcXVlbnRseSByZS1jb25uZWN0ZWQgKGFuZCBpdHMgYEFzeW5jRGlyZWN0aXZlYHMgc2hvdWxkXG4gICAqIHJlLWNvbm5lY3QpLCBgc2V0Q29ubmVjdGVkKHRydWUpYCBzaG91bGQgYmUgY2FsbGVkLlxuICAgKlxuICAgKiBAcGFyYW0gaXNDb25uZWN0ZWQgV2hldGhlciBkaXJlY3RpdmVzIHdpdGhpbiB0aGlzIHRyZWUgc2hvdWxkIGJlIGNvbm5lY3RlZFxuICAgKiBvciBub3RcbiAgICovXG4gIHNldENvbm5lY3RlZChpc0Nvbm5lY3RlZDogYm9vbGVhbik6IHZvaWQ7XG59XG5cbmV4cG9ydCB0eXBlIHtBdHRyaWJ1dGVQYXJ0fTtcbmNsYXNzIEF0dHJpYnV0ZVBhcnQgaW1wbGVtZW50cyBEaXNjb25uZWN0YWJsZSB7XG4gIHJlYWRvbmx5IHR5cGU6XG4gICAgfCB0eXBlb2YgQVRUUklCVVRFX1BBUlRcbiAgICB8IHR5cGVvZiBQUk9QRVJUWV9QQVJUXG4gICAgfCB0eXBlb2YgQk9PTEVBTl9BVFRSSUJVVEVfUEFSVFxuICAgIHwgdHlwZW9mIEVWRU5UX1BBUlQgPSBBVFRSSUJVVEVfUEFSVDtcbiAgcmVhZG9ubHkgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogSWYgdGhpcyBhdHRyaWJ1dGUgcGFydCByZXByZXNlbnRzIGFuIGludGVycG9sYXRpb24sIHRoaXMgY29udGFpbnMgdGhlXG4gICAqIHN0YXRpYyBzdHJpbmdzIG9mIHRoZSBpbnRlcnBvbGF0aW9uLiBGb3Igc2luZ2xlLXZhbHVlLCBjb21wbGV0ZSBiaW5kaW5ncyxcbiAgICogdGhpcyBpcyB1bmRlZmluZWQuXG4gICAqL1xuICByZWFkb25seSBzdHJpbmdzPzogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xuICAvKiogQGludGVybmFsICovXG4gIF8kY29tbWl0dGVkVmFsdWU6IHVua25vd24gfCBBcnJheTx1bmtub3duPiA9IG5vdGhpbmc7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX19kaXJlY3RpdmVzPzogQXJyYXk8RGlyZWN0aXZlIHwgdW5kZWZpbmVkPjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJHBhcmVudDogRGlzY29ubmVjdGFibGU7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRkaXNjb25uZWN0YWJsZUNoaWxkcmVuPzogU2V0PERpc2Nvbm5lY3RhYmxlPiA9IHVuZGVmaW5lZDtcblxuICBwcm90ZWN0ZWQgX3Nhbml0aXplcjogVmFsdWVTYW5pdGl6ZXIgfCB1bmRlZmluZWQ7XG5cbiAgZ2V0IHRhZ05hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC50YWdOYW1lO1xuICB9XG5cbiAgLy8gU2VlIGNvbW1lbnQgaW4gRGlzY29ubmVjdGFibGUgaW50ZXJmYWNlIGZvciB3aHkgdGhpcyBpcyBhIGdldHRlclxuICBnZXQgXyRpc0Nvbm5lY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fJHBhcmVudC5fJGlzQ29ubmVjdGVkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHN0cmluZ3M6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPixcbiAgICBwYXJlbnQ6IERpc2Nvbm5lY3RhYmxlLFxuICAgIG9wdGlvbnM6IFJlbmRlck9wdGlvbnMgfCB1bmRlZmluZWRcbiAgKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuXyRwYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAoc3RyaW5ncy5sZW5ndGggPiAyIHx8IHN0cmluZ3NbMF0gIT09ICcnIHx8IHN0cmluZ3NbMV0gIT09ICcnKSB7XG4gICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSBuZXcgQXJyYXkoc3RyaW5ncy5sZW5ndGggLSAxKS5maWxsKG5ldyBTdHJpbmcoKSk7XG4gICAgICB0aGlzLnN0cmluZ3MgPSBzdHJpbmdzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSBub3RoaW5nO1xuICAgIH1cbiAgICBpZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICB0aGlzLl9zYW5pdGl6ZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIG9mIHRoaXMgcGFydCBieSByZXNvbHZpbmcgdGhlIHZhbHVlIGZyb20gcG9zc2libHkgbXVsdGlwbGVcbiAgICogdmFsdWVzIGFuZCBzdGF0aWMgc3RyaW5ncyBhbmQgY29tbWl0dGluZyBpdCB0byB0aGUgRE9NLlxuICAgKiBJZiB0aGlzIHBhcnQgaXMgc2luZ2xlLXZhbHVlZCwgYHRoaXMuX3N0cmluZ3NgIHdpbGwgYmUgdW5kZWZpbmVkLCBhbmQgdGhlXG4gICAqIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCB3aXRoIGEgc2luZ2xlIHZhbHVlIGFyZ3VtZW50LiBJZiB0aGlzIHBhcnQgaXNcbiAgICogbXVsdGktdmFsdWUsIGB0aGlzLl9zdHJpbmdzYCB3aWxsIGJlIGRlZmluZWQsIGFuZCB0aGUgbWV0aG9kIGlzIGNhbGxlZFxuICAgKiB3aXRoIHRoZSB2YWx1ZSBhcnJheSBvZiB0aGUgcGFydCdzIG93bmluZyBUZW1wbGF0ZUluc3RhbmNlLCBhbmQgYW4gb2Zmc2V0XG4gICAqIGludG8gdGhlIHZhbHVlIGFycmF5IGZyb20gd2hpY2ggdGhlIHZhbHVlcyBzaG91bGQgYmUgcmVhZC5cbiAgICogVGhpcyBtZXRob2QgaXMgb3ZlcmxvYWRlZCB0aGlzIHdheSB0byBlbGltaW5hdGUgc2hvcnQtbGl2ZWQgYXJyYXkgc2xpY2VzXG4gICAqIG9mIHRoZSB0ZW1wbGF0ZSBpbnN0YW5jZSB2YWx1ZXMsIGFuZCBhbGxvdyBhIGZhc3QtcGF0aCBmb3Igc2luZ2xlLXZhbHVlZFxuICAgKiBwYXJ0cy5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIFRoZSBwYXJ0IHZhbHVlLCBvciBhbiBhcnJheSBvZiB2YWx1ZXMgZm9yIG11bHRpLXZhbHVlZCBwYXJ0c1xuICAgKiBAcGFyYW0gdmFsdWVJbmRleCB0aGUgaW5kZXggdG8gc3RhcnQgcmVhZGluZyB2YWx1ZXMgZnJvbS4gYHVuZGVmaW5lZGAgZm9yXG4gICAqICAgc2luZ2xlLXZhbHVlZCBwYXJ0c1xuICAgKiBAcGFyYW0gbm9Db21taXQgY2F1c2VzIHRoZSBwYXJ0IHRvIG5vdCBjb21taXQgaXRzIHZhbHVlIHRvIHRoZSBET00uIFVzZWRcbiAgICogICBpbiBoeWRyYXRpb24gdG8gcHJpbWUgYXR0cmlidXRlIHBhcnRzIHdpdGggdGhlaXIgZmlyc3QtcmVuZGVyZWQgdmFsdWUsXG4gICAqICAgYnV0IG5vdCBzZXQgdGhlIGF0dHJpYnV0ZSwgYW5kIGluIFNTUiB0byBuby1vcCB0aGUgRE9NIG9wZXJhdGlvbiBhbmRcbiAgICogICBjYXB0dXJlIHRoZSB2YWx1ZSBmb3Igc2VyaWFsaXphdGlvbi5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfJHNldFZhbHVlKFxuICAgIHZhbHVlOiB1bmtub3duIHwgQXJyYXk8dW5rbm93bj4sXG4gICAgZGlyZWN0aXZlUGFyZW50OiBEaXJlY3RpdmVQYXJlbnQgPSB0aGlzLFxuICAgIHZhbHVlSW5kZXg/OiBudW1iZXIsXG4gICAgbm9Db21taXQ/OiBib29sZWFuXG4gICkge1xuICAgIGNvbnN0IHN0cmluZ3MgPSB0aGlzLnN0cmluZ3M7XG5cbiAgICAvLyBXaGV0aGVyIGFueSBvZiB0aGUgdmFsdWVzIGhhcyBjaGFuZ2VkLCBmb3IgZGlydHktY2hlY2tpbmdcbiAgICBsZXQgY2hhbmdlID0gZmFsc2U7XG5cbiAgICBpZiAoc3RyaW5ncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBTaW5nbGUtdmFsdWUgYmluZGluZyBjYXNlXG4gICAgICB2YWx1ZSA9IHJlc29sdmVEaXJlY3RpdmUodGhpcywgdmFsdWUsIGRpcmVjdGl2ZVBhcmVudCwgMCk7XG4gICAgICBjaGFuZ2UgPVxuICAgICAgICAhaXNQcmltaXRpdmUodmFsdWUpIHx8XG4gICAgICAgICh2YWx1ZSAhPT0gdGhpcy5fJGNvbW1pdHRlZFZhbHVlICYmIHZhbHVlICE9PSBub0NoYW5nZSk7XG4gICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJbnRlcnBvbGF0aW9uIGNhc2VcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHZhbHVlIGFzIEFycmF5PHVua25vd24+O1xuICAgICAgdmFsdWUgPSBzdHJpbmdzWzBdO1xuXG4gICAgICBsZXQgaSwgdjtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmdzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICB2ID0gcmVzb2x2ZURpcmVjdGl2ZSh0aGlzLCB2YWx1ZXNbdmFsdWVJbmRleCEgKyBpXSwgZGlyZWN0aXZlUGFyZW50LCBpKTtcblxuICAgICAgICBpZiAodiA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgdXNlci1wcm92aWRlZCB2YWx1ZSBpcyBgbm9DaGFuZ2VgLCB1c2UgdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgICAgICAgdiA9ICh0aGlzLl8kY29tbWl0dGVkVmFsdWUgYXMgQXJyYXk8dW5rbm93bj4pW2ldO1xuICAgICAgICB9XG4gICAgICAgIGNoYW5nZSB8fD1cbiAgICAgICAgICAhaXNQcmltaXRpdmUodikgfHwgdiAhPT0gKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBBcnJheTx1bmtub3duPilbaV07XG4gICAgICAgIGlmICh2ID09PSBub3RoaW5nKSB7XG4gICAgICAgICAgdmFsdWUgPSBub3RoaW5nO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBub3RoaW5nKSB7XG4gICAgICAgICAgdmFsdWUgKz0gKHYgPz8gJycpICsgc3RyaW5nc1tpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgYWx3YXlzIHJlY29yZCBlYWNoIHZhbHVlLCBldmVuIGlmIG9uZSBpcyBgbm90aGluZ2AsIGZvciBmdXR1cmVcbiAgICAgICAgLy8gY2hhbmdlIGRldGVjdGlvbi5cbiAgICAgICAgKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBBcnJheTx1bmtub3duPilbaV0gPSB2O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlICYmICFub0NvbW1pdCkge1xuICAgICAgdGhpcy5fY29tbWl0VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbW1pdFZhbHVlKHZhbHVlOiB1bmtub3duKSB7XG4gICAgaWYgKHZhbHVlID09PSBub3RoaW5nKSB7XG4gICAgICAod3JhcCh0aGlzLmVsZW1lbnQpIGFzIEVsZW1lbnQpLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLm5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICAgIGlmICh0aGlzLl9zYW5pdGl6ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuX3Nhbml0aXplciA9IHNhbml0aXplckZhY3RvcnlJbnRlcm5hbChcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCxcbiAgICAgICAgICAgIHRoaXMubmFtZSxcbiAgICAgICAgICAgICdhdHRyaWJ1dGUnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHRoaXMuX3Nhbml0aXplcih2YWx1ZSA/PyAnJyk7XG4gICAgICB9XG4gICAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICAgIGtpbmQ6ICdjb21taXQgYXR0cmlidXRlJyxcbiAgICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICAod3JhcCh0aGlzLmVsZW1lbnQpIGFzIEVsZW1lbnQpLnNldEF0dHJpYnV0ZShcbiAgICAgICAgdGhpcy5uYW1lLFxuICAgICAgICAodmFsdWUgPz8gJycpIGFzIHN0cmluZ1xuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUge1Byb3BlcnR5UGFydH07XG5jbGFzcyBQcm9wZXJ0eVBhcnQgZXh0ZW5kcyBBdHRyaWJ1dGVQYXJ0IHtcbiAgb3ZlcnJpZGUgcmVhZG9ubHkgdHlwZSA9IFBST1BFUlRZX1BBUlQ7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBvdmVycmlkZSBfY29tbWl0VmFsdWUodmFsdWU6IHVua25vd24pIHtcbiAgICBpZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICBpZiAodGhpcy5fc2FuaXRpemVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2FuaXRpemVyID0gc2FuaXRpemVyRmFjdG9yeUludGVybmFsKFxuICAgICAgICAgIHRoaXMuZWxlbWVudCxcbiAgICAgICAgICB0aGlzLm5hbWUsXG4gICAgICAgICAgJ3Byb3BlcnR5J1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSB0aGlzLl9zYW5pdGl6ZXIodmFsdWUpO1xuICAgIH1cbiAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAga2luZDogJ2NvbW1pdCBwcm9wZXJ0eScsXG4gICAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgfSk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAodGhpcy5lbGVtZW50IGFzIGFueSlbdGhpcy5uYW1lXSA9IHZhbHVlID09PSBub3RoaW5nID8gdW5kZWZpbmVkIDogdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUge0Jvb2xlYW5BdHRyaWJ1dGVQYXJ0fTtcbmNsYXNzIEJvb2xlYW5BdHRyaWJ1dGVQYXJ0IGV4dGVuZHMgQXR0cmlidXRlUGFydCB7XG4gIG92ZXJyaWRlIHJlYWRvbmx5IHR5cGUgPSBCT09MRUFOX0FUVFJJQlVURV9QQVJUO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgb3ZlcnJpZGUgX2NvbW1pdFZhbHVlKHZhbHVlOiB1bmtub3duKSB7XG4gICAgZGVidWdMb2dFdmVudCAmJlxuICAgICAgZGVidWdMb2dFdmVudCh7XG4gICAgICAgIGtpbmQ6ICdjb21taXQgYm9vbGVhbiBhdHRyaWJ1dGUnLFxuICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgdmFsdWU6ICEhKHZhbHVlICYmIHZhbHVlICE9PSBub3RoaW5nKSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgfSk7XG4gICAgKHdyYXAodGhpcy5lbGVtZW50KSBhcyBFbGVtZW50KS50b2dnbGVBdHRyaWJ1dGUoXG4gICAgICB0aGlzLm5hbWUsXG4gICAgICAhIXZhbHVlICYmIHZhbHVlICE9PSBub3RoaW5nXG4gICAgKTtcbiAgfVxufVxuXG50eXBlIEV2ZW50TGlzdGVuZXJXaXRoT3B0aW9ucyA9IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QgJlxuICBQYXJ0aWFsPEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zPjtcblxuLyoqXG4gKiBBbiBBdHRyaWJ1dGVQYXJ0IHRoYXQgbWFuYWdlcyBhbiBldmVudCBsaXN0ZW5lciB2aWEgYWRkL3JlbW92ZUV2ZW50TGlzdGVuZXIuXG4gKlxuICogVGhpcyBwYXJ0IHdvcmtzIGJ5IGFkZGluZyBpdHNlbGYgYXMgdGhlIGV2ZW50IGxpc3RlbmVyIG9uIGFuIGVsZW1lbnQsIHRoZW5cbiAqIGRlbGVnYXRpbmcgdG8gdGhlIHZhbHVlIHBhc3NlZCB0byBpdC4gVGhpcyByZWR1Y2VzIHRoZSBudW1iZXIgb2YgY2FsbHMgdG9cbiAqIGFkZC9yZW1vdmVFdmVudExpc3RlbmVyIGlmIHRoZSBsaXN0ZW5lciBjaGFuZ2VzIGZyZXF1ZW50bHksIHN1Y2ggYXMgd2hlbiBhblxuICogaW5saW5lIGZ1bmN0aW9uIGlzIHVzZWQgYXMgYSBsaXN0ZW5lci5cbiAqXG4gKiBCZWNhdXNlIGV2ZW50IG9wdGlvbnMgYXJlIHBhc3NlZCB3aGVuIGFkZGluZyBsaXN0ZW5lcnMsIHdlIG11c3QgdGFrZSBjYXNlXG4gKiB0byBhZGQgYW5kIHJlbW92ZSB0aGUgcGFydCBhcyBhIGxpc3RlbmVyIHdoZW4gdGhlIGV2ZW50IG9wdGlvbnMgY2hhbmdlLlxuICovXG5leHBvcnQgdHlwZSB7RXZlbnRQYXJ0fTtcbmNsYXNzIEV2ZW50UGFydCBleHRlbmRzIEF0dHJpYnV0ZVBhcnQge1xuICBvdmVycmlkZSByZWFkb25seSB0eXBlID0gRVZFTlRfUEFSVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgc3RyaW5nczogUmVhZG9ubHlBcnJheTxzdHJpbmc+LFxuICAgIHBhcmVudDogRGlzY29ubmVjdGFibGUsXG4gICAgb3B0aW9uczogUmVuZGVyT3B0aW9ucyB8IHVuZGVmaW5lZFxuICApIHtcbiAgICBzdXBlcihlbGVtZW50LCBuYW1lLCBzdHJpbmdzLCBwYXJlbnQsIG9wdGlvbnMpO1xuXG4gICAgaWYgKERFVl9NT0RFICYmIHRoaXMuc3RyaW5ncyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBBIFxcYDwke2VsZW1lbnQubG9jYWxOYW1lfT5cXGAgaGFzIGEgXFxgQCR7bmFtZX09Li4uXFxgIGxpc3RlbmVyIHdpdGggYCArXG4gICAgICAgICAgJ2ludmFsaWQgY29udGVudC4gRXZlbnQgbGlzdGVuZXJzIGluIHRlbXBsYXRlcyBtdXN0IGhhdmUgZXhhY3RseSAnICtcbiAgICAgICAgICAnb25lIGV4cHJlc3Npb24gYW5kIG5vIHN1cnJvdW5kaW5nIHRleHQuJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyBFdmVudFBhcnQgZG9lcyBub3QgdXNlIHRoZSBiYXNlIF8kc2V0VmFsdWUvX3Jlc29sdmVWYWx1ZSBpbXBsZW1lbnRhdGlvblxuICAvLyBzaW5jZSB0aGUgZGlydHkgY2hlY2tpbmcgaXMgbW9yZSBjb21wbGV4XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgb3ZlcnJpZGUgXyRzZXRWYWx1ZShcbiAgICBuZXdMaXN0ZW5lcjogdW5rbm93bixcbiAgICBkaXJlY3RpdmVQYXJlbnQ6IERpcmVjdGl2ZVBhcmVudCA9IHRoaXNcbiAgKSB7XG4gICAgbmV3TGlzdGVuZXIgPVxuICAgICAgcmVzb2x2ZURpcmVjdGl2ZSh0aGlzLCBuZXdMaXN0ZW5lciwgZGlyZWN0aXZlUGFyZW50LCAwKSA/PyBub3RoaW5nO1xuICAgIGlmIChuZXdMaXN0ZW5lciA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb2xkTGlzdGVuZXIgPSB0aGlzLl8kY29tbWl0dGVkVmFsdWU7XG5cbiAgICAvLyBJZiB0aGUgbmV3IHZhbHVlIGlzIG5vdGhpbmcgb3IgYW55IG9wdGlvbnMgY2hhbmdlIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZVxuICAgIC8vIHBhcnQgYXMgYSBsaXN0ZW5lci5cbiAgICBjb25zdCBzaG91bGRSZW1vdmVMaXN0ZW5lciA9XG4gICAgICAobmV3TGlzdGVuZXIgPT09IG5vdGhpbmcgJiYgb2xkTGlzdGVuZXIgIT09IG5vdGhpbmcpIHx8XG4gICAgICAobmV3TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5jYXB0dXJlICE9PVxuICAgICAgICAob2xkTGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5jYXB0dXJlIHx8XG4gICAgICAobmV3TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5vbmNlICE9PVxuICAgICAgICAob2xkTGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5vbmNlIHx8XG4gICAgICAobmV3TGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5wYXNzaXZlICE9PVxuICAgICAgICAob2xkTGlzdGVuZXIgYXMgRXZlbnRMaXN0ZW5lcldpdGhPcHRpb25zKS5wYXNzaXZlO1xuXG4gICAgLy8gSWYgdGhlIG5ldyB2YWx1ZSBpcyBub3Qgbm90aGluZyBhbmQgd2UgcmVtb3ZlZCB0aGUgbGlzdGVuZXIsIHdlIGhhdmVcbiAgICAvLyB0byBhZGQgdGhlIHBhcnQgYXMgYSBsaXN0ZW5lci5cbiAgICBjb25zdCBzaG91bGRBZGRMaXN0ZW5lciA9XG4gICAgICBuZXdMaXN0ZW5lciAhPT0gbm90aGluZyAmJlxuICAgICAgKG9sZExpc3RlbmVyID09PSBub3RoaW5nIHx8IHNob3VsZFJlbW92ZUxpc3RlbmVyKTtcblxuICAgIGRlYnVnTG9nRXZlbnQgJiZcbiAgICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICBraW5kOiAnY29tbWl0IGV2ZW50IGxpc3RlbmVyJyxcbiAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgIHZhbHVlOiBuZXdMaXN0ZW5lcixcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICByZW1vdmVMaXN0ZW5lcjogc2hvdWxkUmVtb3ZlTGlzdGVuZXIsXG4gICAgICAgIGFkZExpc3RlbmVyOiBzaG91bGRBZGRMaXN0ZW5lcixcbiAgICAgICAgb2xkTGlzdGVuZXIsXG4gICAgICB9KTtcbiAgICBpZiAoc2hvdWxkUmVtb3ZlTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICB0aGlzLm5hbWUsXG4gICAgICAgIHRoaXMsXG4gICAgICAgIG9sZExpc3RlbmVyIGFzIEV2ZW50TGlzdGVuZXJXaXRoT3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHNob3VsZEFkZExpc3RlbmVyKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgdGhpcy5uYW1lLFxuICAgICAgICB0aGlzLFxuICAgICAgICBuZXdMaXN0ZW5lciBhcyBFdmVudExpc3RlbmVyV2l0aE9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZSA9IG5ld0xpc3RlbmVyO1xuICB9XG5cbiAgaGFuZGxlRXZlbnQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZS5jYWxsKHRoaXMub3B0aW9ucz8uaG9zdCA/PyB0aGlzLmVsZW1lbnQsIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgKHRoaXMuXyRjb21taXR0ZWRWYWx1ZSBhcyBFdmVudExpc3RlbmVyT2JqZWN0KS5oYW5kbGVFdmVudChldmVudCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB0eXBlIHtFbGVtZW50UGFydH07XG5jbGFzcyBFbGVtZW50UGFydCBpbXBsZW1lbnRzIERpc2Nvbm5lY3RhYmxlIHtcbiAgcmVhZG9ubHkgdHlwZSA9IEVMRU1FTlRfUEFSVDtcblxuICAvKiogQGludGVybmFsICovXG4gIF9fZGlyZWN0aXZlPzogRGlyZWN0aXZlO1xuXG4gIC8vIFRoaXMgaXMgdG8gZW5zdXJlIHRoYXQgZXZlcnkgUGFydCBoYXMgYSBfJGNvbW1pdHRlZFZhbHVlXG4gIF8kY29tbWl0dGVkVmFsdWU6IHVuZGVmaW5lZDtcblxuICAvKiogQGludGVybmFsICovXG4gIF8kcGFyZW50ITogRGlzY29ubmVjdGFibGU7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfJGRpc2Nvbm5lY3RhYmxlQ2hpbGRyZW4/OiBTZXQ8RGlzY29ubmVjdGFibGU+ID0gdW5kZWZpbmVkO1xuXG4gIG9wdGlvbnM6IFJlbmRlck9wdGlvbnMgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnQsXG4gICAgcGFyZW50OiBEaXNjb25uZWN0YWJsZSxcbiAgICBvcHRpb25zOiBSZW5kZXJPcHRpb25zIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHRoaXMuXyRwYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIC8vIFNlZSBjb21tZW50IGluIERpc2Nvbm5lY3RhYmxlIGludGVyZmFjZSBmb3Igd2h5IHRoaXMgaXMgYSBnZXR0ZXJcbiAgZ2V0IF8kaXNDb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuXyRwYXJlbnQuXyRpc0Nvbm5lY3RlZDtcbiAgfVxuXG4gIF8kc2V0VmFsdWUodmFsdWU6IHVua25vd24pOiB2b2lkIHtcbiAgICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgICBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAga2luZDogJ2NvbW1pdCB0byBlbGVtZW50IGJpbmRpbmcnLFxuICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICB9KTtcbiAgICByZXNvbHZlRGlyZWN0aXZlKHRoaXMsIHZhbHVlKTtcbiAgfVxufVxuXG4vKipcbiAqIEVORCBVU0VSUyBTSE9VTEQgTk9UIFJFTFkgT04gVEhJUyBPQkpFQ1QuXG4gKlxuICogUHJpdmF0ZSBleHBvcnRzIGZvciB1c2UgYnkgb3RoZXIgTGl0IHBhY2thZ2VzLCBub3QgaW50ZW5kZWQgZm9yIHVzZSBieVxuICogZXh0ZXJuYWwgdXNlcnMuXG4gKlxuICogV2UgY3VycmVudGx5IGRvIG5vdCBtYWtlIGEgbWFuZ2xlZCByb2xsdXAgYnVpbGQgb2YgdGhlIGxpdC1zc3IgY29kZS4gSW4gb3JkZXJcbiAqIHRvIGtlZXAgYSBudW1iZXIgb2YgKG90aGVyd2lzZSBwcml2YXRlKSB0b3AtbGV2ZWwgZXhwb3J0cyBtYW5nbGVkIGluIHRoZVxuICogY2xpZW50IHNpZGUgY29kZSwgd2UgZXhwb3J0IGEgXyRMSCBvYmplY3QgY29udGFpbmluZyB0aG9zZSBtZW1iZXJzIChvclxuICogaGVscGVyIG1ldGhvZHMgZm9yIGFjY2Vzc2luZyBwcml2YXRlIGZpZWxkcyBvZiB0aG9zZSBtZW1iZXJzKSwgYW5kIHRoZW5cbiAqIHJlLWV4cG9ydCB0aGVtIGZvciB1c2UgaW4gbGl0LXNzci4gVGhpcyBrZWVwcyBsaXQtc3NyIGFnbm9zdGljIHRvIHdoZXRoZXIgdGhlXG4gKiBjbGllbnQtc2lkZSBjb2RlIGlzIGJlaW5nIHVzZWQgaW4gYGRldmAgbW9kZSBvciBgcHJvZGAgbW9kZS5cbiAqXG4gKiBUaGlzIGhhcyBhIHVuaXF1ZSBuYW1lLCB0byBkaXNhbWJpZ3VhdGUgaXQgZnJvbSBwcml2YXRlIGV4cG9ydHMgaW5cbiAqIGxpdC1lbGVtZW50LCB3aGljaCByZS1leHBvcnRzIGFsbCBvZiBsaXQtaHRtbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgXyRMSCA9IHtcbiAgLy8gVXNlZCBpbiBsaXQtc3NyXG4gIF9ib3VuZEF0dHJpYnV0ZVN1ZmZpeDogYm91bmRBdHRyaWJ1dGVTdWZmaXgsXG4gIF9tYXJrZXI6IG1hcmtlcixcbiAgX21hcmtlck1hdGNoOiBtYXJrZXJNYXRjaCxcbiAgX0hUTUxfUkVTVUxUOiBIVE1MX1JFU1VMVCxcbiAgX2dldFRlbXBsYXRlSHRtbDogZ2V0VGVtcGxhdGVIdG1sLFxuICAvLyBVc2VkIGluIHRlc3RzIGFuZCBwcml2YXRlLXNzci1zdXBwb3J0XG4gIF9UZW1wbGF0ZUluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlLFxuICBfaXNJdGVyYWJsZTogaXNJdGVyYWJsZSxcbiAgX3Jlc29sdmVEaXJlY3RpdmU6IHJlc29sdmVEaXJlY3RpdmUsXG4gIF9DaGlsZFBhcnQ6IENoaWxkUGFydCxcbiAgX0F0dHJpYnV0ZVBhcnQ6IEF0dHJpYnV0ZVBhcnQsXG4gIF9Cb29sZWFuQXR0cmlidXRlUGFydDogQm9vbGVhbkF0dHJpYnV0ZVBhcnQsXG4gIF9FdmVudFBhcnQ6IEV2ZW50UGFydCxcbiAgX1Byb3BlcnR5UGFydDogUHJvcGVydHlQYXJ0LFxuICBfRWxlbWVudFBhcnQ6IEVsZW1lbnRQYXJ0LFxufTtcblxuLy8gQXBwbHkgcG9seWZpbGxzIGlmIGF2YWlsYWJsZVxuY29uc3QgcG9seWZpbGxTdXBwb3J0ID0gREVWX01PREVcbiAgPyBnbG9iYWwubGl0SHRtbFBvbHlmaWxsU3VwcG9ydERldk1vZGVcbiAgOiBnbG9iYWwubGl0SHRtbFBvbHlmaWxsU3VwcG9ydDtcbnBvbHlmaWxsU3VwcG9ydD8uKFRlbXBsYXRlLCBDaGlsZFBhcnQpO1xuXG4vLyBJTVBPUlRBTlQ6IGRvIG5vdCBjaGFuZ2UgdGhlIHByb3BlcnR5IG5hbWUgb3IgdGhlIGFzc2lnbm1lbnQgZXhwcmVzc2lvbi5cbi8vIFRoaXMgbGluZSB3aWxsIGJlIHVzZWQgaW4gcmVnZXhlcyB0byBzZWFyY2ggZm9yIGxpdC1odG1sIHVzYWdlLlxuKGdsb2JhbC5saXRIdG1sVmVyc2lvbnMgPz89IFtdKS5wdXNoKCczLjMuMicpO1xuaWYgKERFVl9NT0RFICYmIGdsb2JhbC5saXRIdG1sVmVyc2lvbnMubGVuZ3RoID4gMSkge1xuICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgaXNzdWVXYXJuaW5nIShcbiAgICAgICdtdWx0aXBsZS12ZXJzaW9ucycsXG4gICAgICBgTXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0IGxvYWRlZC4gYCArXG4gICAgICAgIGBMb2FkaW5nIG11bHRpcGxlIHZlcnNpb25zIGlzIG5vdCByZWNvbW1lbmRlZC5gXG4gICAgKTtcbiAgfSk7XG59XG5cbi8qKlxuICogUmVuZGVycyBhIHZhbHVlLCB1c3VhbGx5IGEgbGl0LWh0bWwgVGVtcGxhdGVSZXN1bHQsIHRvIHRoZSBjb250YWluZXIuXG4gKlxuICogVGhpcyBleGFtcGxlIHJlbmRlcnMgdGhlIHRleHQgXCJIZWxsbywgWm9lIVwiIGluc2lkZSBhIHBhcmFncmFwaCB0YWcsIGFwcGVuZGluZ1xuICogaXQgdG8gdGhlIGNvbnRhaW5lciBgZG9jdW1lbnQuYm9keWAuXG4gKlxuICogYGBganNcbiAqIGltcG9ydCB7aHRtbCwgcmVuZGVyfSBmcm9tICdsaXQnO1xuICpcbiAqIGNvbnN0IG5hbWUgPSBcIlpvZVwiO1xuICogcmVuZGVyKGh0bWxgPHA+SGVsbG8sICR7bmFtZX0hPC9wPmAsIGRvY3VtZW50LmJvZHkpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHZhbHVlIEFueSBbcmVuZGVyYWJsZVxuICogICB2YWx1ZV0oaHR0cHM6Ly9saXQuZGV2L2RvY3MvdGVtcGxhdGVzL2V4cHJlc3Npb25zLyNjaGlsZC1leHByZXNzaW9ucyksXG4gKiAgIHR5cGljYWxseSBhIHtAbGlua2NvZGUgVGVtcGxhdGVSZXN1bHR9IGNyZWF0ZWQgYnkgZXZhbHVhdGluZyBhIHRlbXBsYXRlIHRhZ1xuICogICBsaWtlIHtAbGlua2NvZGUgaHRtbH0gb3Ige0BsaW5rY29kZSBzdmd9LlxuICogQHBhcmFtIGNvbnRhaW5lciBBIERPTSBjb250YWluZXIgdG8gcmVuZGVyIHRvLiBUaGUgZmlyc3QgcmVuZGVyIHdpbGwgYXBwZW5kXG4gKiAgIHRoZSByZW5kZXJlZCB2YWx1ZSB0byB0aGUgY29udGFpbmVyLCBhbmQgc3Vic2VxdWVudCByZW5kZXJzIHdpbGxcbiAqICAgZWZmaWNpZW50bHkgdXBkYXRlIHRoZSByZW5kZXJlZCB2YWx1ZSBpZiB0aGUgc2FtZSByZXN1bHQgdHlwZSB3YXNcbiAqICAgcHJldmlvdXNseSByZW5kZXJlZCB0aGVyZS5cbiAqIEBwYXJhbSBvcHRpb25zIFNlZSB7QGxpbmtjb2RlIFJlbmRlck9wdGlvbnN9IGZvciBvcHRpb25zIGRvY3VtZW50YXRpb24uXG4gKiBAc2VlXG4gKiB7QGxpbmsgaHR0cHM6Ly9saXQuZGV2L2RvY3MvbGlicmFyaWVzL3N0YW5kYWxvbmUtdGVtcGxhdGVzLyNyZW5kZXJpbmctbGl0LWh0bWwtdGVtcGxhdGVzfCBSZW5kZXJpbmcgTGl0IEhUTUwgVGVtcGxhdGVzfVxuICovXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKFxuICB2YWx1ZTogdW5rbm93bixcbiAgY29udGFpbmVyOiBSZW5kZXJSb290Tm9kZSxcbiAgb3B0aW9ucz86IFJlbmRlck9wdGlvbnNcbik6IFJvb3RQYXJ0ID0+IHtcbiAgaWYgKERFVl9NT0RFICYmIGNvbnRhaW5lciA9PSBudWxsKSB7XG4gICAgLy8gR2l2ZSBhIGNsZWFyZXIgZXJyb3IgbWVzc2FnZSB0aGFuXG4gICAgLy8gICAgIFVuY2F1Z2h0IFR5cGVFcnJvcjogQ2Fubm90IHJlYWQgcHJvcGVydGllcyBvZiBudWxsIChyZWFkaW5nXG4gICAgLy8gICAgICdfJGxpdFBhcnQkJylcbiAgICAvLyB3aGljaCByZWFkcyBsaWtlIGFuIGludGVybmFsIExpdCBlcnJvci5cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgY29udGFpbmVyIHRvIHJlbmRlciBpbnRvIG1heSBub3QgYmUgJHtjb250YWluZXJ9YCk7XG4gIH1cbiAgY29uc3QgcmVuZGVySWQgPSBERVZfTU9ERSA/IGRlYnVnTG9nUmVuZGVySWQrKyA6IDA7XG4gIGNvbnN0IHBhcnRPd25lck5vZGUgPSBvcHRpb25zPy5yZW5kZXJCZWZvcmUgPz8gY29udGFpbmVyO1xuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBsZXQgcGFydDogQ2hpbGRQYXJ0ID0gKHBhcnRPd25lck5vZGUgYXMgYW55KVsnXyRsaXRQYXJ0JCddO1xuICBkZWJ1Z0xvZ0V2ZW50ICYmXG4gICAgZGVidWdMb2dFdmVudCh7XG4gICAgICBraW5kOiAnYmVnaW4gcmVuZGVyJyxcbiAgICAgIGlkOiByZW5kZXJJZCxcbiAgICAgIHZhbHVlLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHBhcnQsXG4gICAgfSk7XG4gIGlmIChwYXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBlbmROb2RlID0gb3B0aW9ucz8ucmVuZGVyQmVmb3JlID8/IG51bGw7XG4gICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIChwYXJ0T3duZXJOb2RlIGFzIGFueSlbJ18kbGl0UGFydCQnXSA9IHBhcnQgPSBuZXcgQ2hpbGRQYXJ0KFxuICAgICAgY29udGFpbmVyLmluc2VydEJlZm9yZShjcmVhdGVNYXJrZXIoKSwgZW5kTm9kZSksXG4gICAgICBlbmROb2RlLFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgb3B0aW9ucyA/PyB7fVxuICAgICk7XG4gIH1cbiAgcGFydC5fJHNldFZhbHVlKHZhbHVlKTtcbiAgZGVidWdMb2dFdmVudCAmJlxuICAgIGRlYnVnTG9nRXZlbnQoe1xuICAgICAga2luZDogJ2VuZCByZW5kZXInLFxuICAgICAgaWQ6IHJlbmRlcklkLFxuICAgICAgdmFsdWUsXG4gICAgICBjb250YWluZXIsXG4gICAgICBvcHRpb25zLFxuICAgICAgcGFydCxcbiAgICB9KTtcbiAgcmV0dXJuIHBhcnQgYXMgUm9vdFBhcnQ7XG59O1xuXG5pZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gIHJlbmRlci5zZXRTYW5pdGl6ZXIgPSBzZXRTYW5pdGl6ZXI7XG4gIHJlbmRlci5jcmVhdGVTYW5pdGl6ZXIgPSBjcmVhdGVTYW5pdGl6ZXI7XG4gIGlmIChERVZfTU9ERSkge1xuICAgIHJlbmRlci5fdGVzdE9ubHlDbGVhclNhbml0aXplckZhY3RvcnlEb05vdENhbGxPckVsc2UgPVxuICAgICAgX3Rlc3RPbmx5Q2xlYXJTYW5pdGl6ZXJGYWN0b3J5RG9Ob3RDYWxsT3JFbHNlO1xuICB9XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8qKlxuICogVGhlIG1haW4gTGl0RWxlbWVudCBtb2R1bGUsIHdoaWNoIGRlZmluZXMgdGhlIHtAbGlua2NvZGUgTGl0RWxlbWVudH0gYmFzZVxuICogY2xhc3MgYW5kIHJlbGF0ZWQgQVBJcy5cbiAqXG4gKiBMaXRFbGVtZW50IGNvbXBvbmVudHMgY2FuIGRlZmluZSBhIHRlbXBsYXRlIGFuZCBhIHNldCBvZiBvYnNlcnZlZFxuICogcHJvcGVydGllcy4gQ2hhbmdpbmcgYW4gb2JzZXJ2ZWQgcHJvcGVydHkgdHJpZ2dlcnMgYSByZS1yZW5kZXIgb2YgdGhlXG4gKiBlbGVtZW50LlxuICpcbiAqIEltcG9ydCB7QGxpbmtjb2RlIExpdEVsZW1lbnR9IGFuZCB7QGxpbmtjb2RlIGh0bWx9IGZyb20gdGhpcyBtb2R1bGUgdG9cbiAqIGNyZWF0ZSBhIGNvbXBvbmVudDpcbiAqXG4gKiAgYGBganNcbiAqIGltcG9ydCB7TGl0RWxlbWVudCwgaHRtbH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuICpcbiAqIGNsYXNzIE15RWxlbWVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICpcbiAqICAgLy8gRGVjbGFyZSBvYnNlcnZlZCBwcm9wZXJ0aWVzXG4gKiAgIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAqICAgICByZXR1cm4ge1xuICogICAgICAgYWRqZWN0aXZlOiB7fVxuICogICAgIH1cbiAqICAgfVxuICpcbiAqICAgY29uc3RydWN0b3IoKSB7XG4gKiAgICAgdGhpcy5hZGplY3RpdmUgPSAnYXdlc29tZSc7XG4gKiAgIH1cbiAqXG4gKiAgIC8vIERlZmluZSB0aGUgZWxlbWVudCdzIHRlbXBsYXRlXG4gKiAgIHJlbmRlcigpIHtcbiAqICAgICByZXR1cm4gaHRtbGA8cD55b3VyICR7YWRqZWN0aXZlfSB0ZW1wbGF0ZSBoZXJlPC9wPmA7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ215LWVsZW1lbnQnLCBNeUVsZW1lbnQpO1xuICogYGBgXG4gKlxuICogYExpdEVsZW1lbnRgIGV4dGVuZHMge0BsaW5rY29kZSBSZWFjdGl2ZUVsZW1lbnR9IGFuZCBhZGRzIGxpdC1odG1sXG4gKiB0ZW1wbGF0aW5nLiBUaGUgYFJlYWN0aXZlRWxlbWVudGAgY2xhc3MgaXMgcHJvdmlkZWQgZm9yIHVzZXJzIHRoYXQgd2FudCB0b1xuICogYnVpbGQgdGhlaXIgb3duIGN1c3RvbSBlbGVtZW50IGJhc2UgY2xhc3NlcyB0aGF0IGRvbid0IHVzZSBsaXQtaHRtbC5cbiAqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuaW1wb3J0IHtQcm9wZXJ0eVZhbHVlcywgUmVhY3RpdmVFbGVtZW50fSBmcm9tICdAbGl0L3JlYWN0aXZlLWVsZW1lbnQnO1xuaW1wb3J0IHtyZW5kZXIsIFJlbmRlck9wdGlvbnMsIG5vQ2hhbmdlLCBSb290UGFydH0gZnJvbSAnbGl0LWh0bWwnO1xuZXhwb3J0ICogZnJvbSAnQGxpdC9yZWFjdGl2ZS1lbGVtZW50JztcbmV4cG9ydCAqIGZyb20gJ2xpdC1odG1sJztcblxuaW1wb3J0IHtMaXRVbnN0YWJsZX0gZnJvbSAnbGl0LWh0bWwnO1xuaW1wb3J0IHtSZWFjdGl2ZVVuc3RhYmxlfSBmcm9tICdAbGl0L3JlYWN0aXZlLWVsZW1lbnQnO1xuXG4vKipcbiAqIENvbnRhaW5zIHR5cGVzIHRoYXQgYXJlIHBhcnQgb2YgdGhlIHVuc3RhYmxlIGRlYnVnIEFQSS5cbiAqXG4gKiBFdmVyeXRoaW5nIGluIHRoaXMgQVBJIGlzIG5vdCBzdGFibGUgYW5kIG1heSBjaGFuZ2Ugb3IgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLFxuICogZXZlbiBvbiBwYXRjaCByZWxlYXNlcy5cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcbmV4cG9ydCBuYW1lc3BhY2UgVW5zdGFibGUge1xuICAvKipcbiAgICogV2hlbiBMaXQgaXMgcnVubmluZyBpbiBkZXYgbW9kZSBhbmQgYHdpbmRvdy5lbWl0TGl0RGVidWdMb2dFdmVudHNgIGlzIHRydWUsXG4gICAqIHdlIHdpbGwgZW1pdCAnbGl0LWRlYnVnJyBldmVudHMgdG8gd2luZG93LCB3aXRoIGxpdmUgZGV0YWlscyBhYm91dCB0aGUgdXBkYXRlIGFuZCByZW5kZXJcbiAgICogbGlmZWN5Y2xlLiBUaGVzZSBjYW4gYmUgdXNlZnVsIGZvciB3cml0aW5nIGRlYnVnIHRvb2xpbmcgYW5kIHZpc3VhbGl6YXRpb25zLlxuICAgKlxuICAgKiBQbGVhc2UgYmUgYXdhcmUgdGhhdCBydW5uaW5nIHdpdGggd2luZG93LmVtaXRMaXREZWJ1Z0xvZ0V2ZW50cyBoYXMgcGVyZm9ybWFuY2Ugb3ZlcmhlYWQsXG4gICAqIG1ha2luZyBjZXJ0YWluIG9wZXJhdGlvbnMgdGhhdCBhcmUgbm9ybWFsbHkgdmVyeSBjaGVhcCAobGlrZSBhIG5vLW9wIHJlbmRlcikgbXVjaCBzbG93ZXIsXG4gICAqIGJlY2F1c2Ugd2UgbXVzdCBjb3B5IGRhdGEgYW5kIGRpc3BhdGNoIGV2ZW50cy5cbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXG4gIGV4cG9ydCBuYW1lc3BhY2UgRGVidWdMb2cge1xuICAgIGV4cG9ydCB0eXBlIEVudHJ5ID1cbiAgICAgIHwgTGl0VW5zdGFibGUuRGVidWdMb2cuRW50cnlcbiAgICAgIHwgUmVhY3RpdmVVbnN0YWJsZS5EZWJ1Z0xvZy5FbnRyeTtcbiAgfVxufVxuLypcbiAqIFdoZW4gdXNpbmcgQ2xvc3VyZSBDb21waWxlciwgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eShwcm9wZXJ0eSwgb2JqZWN0KSBpc1xuICogcmVwbGFjZWQgYXQgY29tcGlsZSB0aW1lIGJ5IHRoZSBtdW5nZWQgbmFtZSBmb3Igb2JqZWN0W3Byb3BlcnR5XS4gV2UgY2Fubm90XG4gKiBhbGlhcyB0aGlzIGZ1bmN0aW9uLCBzbyB3ZSBoYXZlIHRvIHVzZSBhIHNtYWxsIHNoaW0gdGhhdCBoYXMgdGhlIHNhbWVcbiAqIGJlaGF2aW9yIHdoZW4gbm90IGNvbXBpbGluZy5cbiAqL1xuLypAX19JTkxJTkVfXyovXG5jb25zdCBKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5ID0gPFAgZXh0ZW5kcyBQcm9wZXJ0eUtleT4oXG4gIHByb3A6IFAsXG4gIF9vYmo6IHVua25vd25cbik6IFAgPT4gcHJvcDtcblxuY29uc3QgREVWX01PREUgPSB0cnVlO1xuLy8gQWxsb3dzIG1pbmlmaWVycyB0byByZW5hbWUgcmVmZXJlbmNlcyB0byBnbG9iYWxUaGlzXG5jb25zdCBnbG9iYWwgPSBnbG9iYWxUaGlzO1xuXG5sZXQgaXNzdWVXYXJuaW5nOiAoY29kZTogc3RyaW5nLCB3YXJuaW5nOiBzdHJpbmcpID0+IHZvaWQ7XG5cbmlmIChERVZfTU9ERSkge1xuICAvLyBFbnN1cmUgd2FybmluZ3MgYXJlIGlzc3VlZCBvbmx5IDF4LCBldmVuIGlmIG11bHRpcGxlIHZlcnNpb25zIG9mIExpdFxuICAvLyBhcmUgbG9hZGVkLlxuICBnbG9iYWwubGl0SXNzdWVkV2FybmluZ3MgPz89IG5ldyBTZXQoKTtcblxuICAvKipcbiAgICogSXNzdWUgYSB3YXJuaW5nIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgYmFzZWQgZWl0aGVyIG9uIGBjb2RlYCBvciBgd2FybmluZ2AuXG4gICAqIFdhcm5pbmdzIGFyZSBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5IG9ubHkgYnkgYHdhcm5pbmdgOyBkaXNhYmxpbmcgdmlhIGBjb2RlYFxuICAgKiBjYW4gYmUgZG9uZSBieSB1c2Vycy5cbiAgICovXG4gIGlzc3VlV2FybmluZyA9IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4ge1xuICAgIHdhcm5pbmcgKz0gYCBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy8ke2NvZGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLmA7XG4gICAgaWYgKFxuICAgICAgIWdsb2JhbC5saXRJc3N1ZWRXYXJuaW5ncyEuaGFzKHdhcm5pbmcpICYmXG4gICAgICAhZ2xvYmFsLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMoY29kZSlcbiAgICApIHtcbiAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbiAgICAgIGdsb2JhbC5saXRJc3N1ZWRXYXJuaW5ncyEuYWRkKHdhcm5pbmcpO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBCYXNlIGVsZW1lbnQgY2xhc3MgdGhhdCBtYW5hZ2VzIGVsZW1lbnQgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlcywgYW5kXG4gKiByZW5kZXJzIGEgbGl0LWh0bWwgdGVtcGxhdGUuXG4gKlxuICogVG8gZGVmaW5lIGEgY29tcG9uZW50LCBzdWJjbGFzcyBgTGl0RWxlbWVudGAgYW5kIGltcGxlbWVudCBhXG4gKiBgcmVuZGVyYCBtZXRob2QgdG8gcHJvdmlkZSB0aGUgY29tcG9uZW50J3MgdGVtcGxhdGUuIERlZmluZSBwcm9wZXJ0aWVzXG4gKiB1c2luZyB0aGUge0BsaW5rY29kZSBMaXRFbGVtZW50LnByb3BlcnRpZXMgcHJvcGVydGllc30gcHJvcGVydHkgb3IgdGhlXG4gKiB7QGxpbmtjb2RlIHByb3BlcnR5fSBkZWNvcmF0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaXRFbGVtZW50IGV4dGVuZHMgUmVhY3RpdmVFbGVtZW50IHtcbiAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgc3RhdGljIFsnXyRsaXRFbGVtZW50JCddID0gdHJ1ZTtcblxuICAvKipcbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcmVhZG9ubHkgcmVuZGVyT3B0aW9uczogUmVuZGVyT3B0aW9ucyA9IHtob3N0OiB0aGlzfTtcblxuICBwcml2YXRlIF9fY2hpbGRQYXJ0OiBSb290UGFydCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGNyZWF0ZVJlbmRlclJvb3QoKSB7XG4gICAgY29uc3QgcmVuZGVyUm9vdCA9IHN1cGVyLmNyZWF0ZVJlbmRlclJvb3QoKTtcbiAgICAvLyBXaGVuIGFkb3B0ZWRTdHlsZVNoZWV0cyBhcmUgc2hpbW1lZCwgdGhleSBhcmUgaW5zZXJ0ZWQgaW50byB0aGVcbiAgICAvLyBzaGFkb3dSb290IGJ5IGNyZWF0ZVJlbmRlclJvb3QuIEFkanVzdCB0aGUgcmVuZGVyQmVmb3JlIG5vZGUgc28gdGhhdFxuICAgIC8vIGFueSBzdHlsZXMgaW4gTGl0IGNvbnRlbnQgcmVuZGVyIGJlZm9yZSBhZG9wdGVkU3R5bGVTaGVldHMuIFRoaXMgaXNcbiAgICAvLyBpbXBvcnRhbnQgc28gdGhhdCBhZG9wdGVkU3R5bGVTaGVldHMgaGF2ZSBwcmVjZWRlbmNlIG92ZXIgc3R5bGVzIGluXG4gICAgLy8gdGhlIHNoYWRvd1Jvb3QuXG4gICAgdGhpcy5yZW5kZXJPcHRpb25zLnJlbmRlckJlZm9yZSA/Pz0gcmVuZGVyUm9vdCEuZmlyc3RDaGlsZCBhcyBDaGlsZE5vZGU7XG4gICAgcmV0dXJuIHJlbmRlclJvb3Q7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgZWxlbWVudC4gVGhpcyBtZXRob2QgcmVmbGVjdHMgcHJvcGVydHkgdmFsdWVzIHRvIGF0dHJpYnV0ZXNcbiAgICogYW5kIGNhbGxzIGByZW5kZXJgIHRvIHJlbmRlciBET00gdmlhIGxpdC1odG1sLiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgKm5vdCogdHJpZ2dlciBhbm90aGVyIHVwZGF0ZS5cbiAgICogQHBhcmFtIGNoYW5nZWRQcm9wZXJ0aWVzIE1hcCBvZiBjaGFuZ2VkIHByb3BlcnRpZXMgd2l0aCBvbGQgdmFsdWVzXG4gICAqIEBjYXRlZ29yeSB1cGRhdGVzXG4gICAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzOiBQcm9wZXJ0eVZhbHVlcykge1xuICAgIC8vIFNldHRpbmcgcHJvcGVydGllcyBpbiBgcmVuZGVyYCBzaG91bGQgbm90IHRyaWdnZXIgYW4gdXBkYXRlLiBTaW5jZVxuICAgIC8vIHVwZGF0ZXMgYXJlIGFsbG93ZWQgYWZ0ZXIgc3VwZXIudXBkYXRlLCBpdCdzIGltcG9ydGFudCB0byBjYWxsIGByZW5kZXJgXG4gICAgLy8gYmVmb3JlIHRoYXQuXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnJlbmRlcigpO1xuICAgIGlmICghdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICB0aGlzLnJlbmRlck9wdGlvbnMuaXNDb25uZWN0ZWQgPSB0aGlzLmlzQ29ubmVjdGVkO1xuICAgIH1cbiAgICBzdXBlci51cGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIHRoaXMuX19jaGlsZFBhcnQgPSByZW5kZXIodmFsdWUsIHRoaXMucmVuZGVyUm9vdCwgdGhpcy5yZW5kZXJPcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhZGRlZCB0byB0aGUgZG9jdW1lbnQncyBET00uXG4gICAqXG4gICAqIEluIGBjb25uZWN0ZWRDYWxsYmFjaygpYCB5b3Ugc2hvdWxkIHNldHVwIHRhc2tzIHRoYXQgc2hvdWxkIG9ubHkgb2NjdXIgd2hlblxuICAgKiB0aGUgZWxlbWVudCBpcyBjb25uZWN0ZWQgdG8gdGhlIGRvY3VtZW50LiBUaGUgbW9zdCBjb21tb24gb2YgdGhlc2UgaXNcbiAgICogYWRkaW5nIGV2ZW50IGxpc3RlbmVycyB0byBub2RlcyBleHRlcm5hbCB0byB0aGUgZWxlbWVudCwgbGlrZSBhIGtleWRvd25cbiAgICogZXZlbnQgaGFuZGxlciBhZGRlZCB0byB0aGUgd2luZG93LlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICogICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgKiAgIGFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlkb3duKTtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogVHlwaWNhbGx5LCBhbnl0aGluZyBkb25lIGluIGBjb25uZWN0ZWRDYWxsYmFjaygpYCBzaG91bGQgYmUgdW5kb25lIHdoZW4gdGhlXG4gICAqIGVsZW1lbnQgaXMgZGlzY29ubmVjdGVkLCBpbiBgZGlzY29ubmVjdGVkQ2FsbGJhY2soKWAuXG4gICAqXG4gICAqIEBjYXRlZ29yeSBsaWZlY3ljbGVcbiAgICovXG4gIG92ZXJyaWRlIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5fX2NoaWxkUGFydD8uc2V0Q29ubmVjdGVkKHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIHJlbW92ZWQgZnJvbSB0aGUgZG9jdW1lbnQncyBET00uXG4gICAqXG4gICAqIFRoaXMgY2FsbGJhY2sgaXMgdGhlIG1haW4gc2lnbmFsIHRvIHRoZSBlbGVtZW50IHRoYXQgaXQgbWF5IG5vIGxvbmdlciBiZVxuICAgKiB1c2VkLiBgZGlzY29ubmVjdGVkQ2FsbGJhY2soKWAgc2hvdWxkIGVuc3VyZSB0aGF0IG5vdGhpbmcgaXMgaG9sZGluZyBhXG4gICAqIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCAoc3VjaCBhcyBldmVudCBsaXN0ZW5lcnMgYWRkZWQgdG8gbm9kZXMgZXh0ZXJuYWxcbiAgICogdG8gdGhlIGVsZW1lbnQpLCBzbyB0aGF0IGl0IGlzIGZyZWUgdG8gYmUgZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgKiAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAqICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlkb3duKTtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQW4gZWxlbWVudCBtYXkgYmUgcmUtY29ubmVjdGVkIGFmdGVyIGJlaW5nIGRpc2Nvbm5lY3RlZC5cbiAgICpcbiAgICogQGNhdGVnb3J5IGxpZmVjeWNsZVxuICAgKi9cbiAgb3ZlcnJpZGUgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9fY2hpbGRQYXJ0Py5zZXRDb25uZWN0ZWQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludm9rZWQgb24gZWFjaCB1cGRhdGUgdG8gcGVyZm9ybSByZW5kZXJpbmcgdGFza3MuIFRoaXMgbWV0aG9kIG1heSByZXR1cm5cbiAgICogYW55IHZhbHVlIHJlbmRlcmFibGUgYnkgbGl0LWh0bWwncyBgQ2hpbGRQYXJ0YCAtIHR5cGljYWxseSBhXG4gICAqIGBUZW1wbGF0ZVJlc3VsdGAuIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCAqbm90KiB0cmlnZ2VyXG4gICAqIHRoZSBlbGVtZW50IHRvIHVwZGF0ZS5cbiAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlbmRlcigpOiB1bmtub3duIHtcbiAgICByZXR1cm4gbm9DaGFuZ2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhpcyBjbGFzcyBpcyBtYXJrZWQgYXMgYGZpbmFsaXplZGAgYXMgYW4gb3B0aW1pemF0aW9uIGVuc3VyaW5nXG4gKiBpdCB3aWxsIG5vdCBuZWVkbGVzc2x5IHRyeSB0byBgZmluYWxpemVgLlxuICpcbiAqIE5vdGUgdGhpcyBwcm9wZXJ0eSBuYW1lIGlzIGEgc3RyaW5nIHRvIHByZXZlbnQgYnJlYWtpbmcgQ2xvc3VyZSBKUyBDb21waWxlclxuICogb3B0aW1pemF0aW9ucy4gU2VlIEBsaXQvcmVhY3RpdmUtZWxlbWVudCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqL1xuKExpdEVsZW1lbnQgYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilbXG4gIEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkoJ2ZpbmFsaXplZCcsIExpdEVsZW1lbnQpXG5dID0gdHJ1ZTtcblxuLy8gSW5zdGFsbCBoeWRyYXRpb24gaWYgYXZhaWxhYmxlXG5nbG9iYWwubGl0RWxlbWVudEh5ZHJhdGVTdXBwb3J0Py4oe0xpdEVsZW1lbnR9KTtcblxuLy8gQXBwbHkgcG9seWZpbGxzIGlmIGF2YWlsYWJsZVxuY29uc3QgcG9seWZpbGxTdXBwb3J0ID0gREVWX01PREVcbiAgPyBnbG9iYWwubGl0RWxlbWVudFBvbHlmaWxsU3VwcG9ydERldk1vZGVcbiAgOiBnbG9iYWwubGl0RWxlbWVudFBvbHlmaWxsU3VwcG9ydDtcbnBvbHlmaWxsU3VwcG9ydD8uKHtMaXRFbGVtZW50fSk7XG5cbi8qKlxuICogRU5EIFVTRVJTIFNIT1VMRCBOT1QgUkVMWSBPTiBUSElTIE9CSkVDVC5cbiAqXG4gKiBQcml2YXRlIGV4cG9ydHMgZm9yIHVzZSBieSBvdGhlciBMaXQgcGFja2FnZXMsIG5vdCBpbnRlbmRlZCBmb3IgdXNlIGJ5XG4gKiBleHRlcm5hbCB1c2Vycy5cbiAqXG4gKiBXZSBjdXJyZW50bHkgZG8gbm90IG1ha2UgYSBtYW5nbGVkIHJvbGx1cCBidWlsZCBvZiB0aGUgbGl0LXNzciBjb2RlLiBJbiBvcmRlclxuICogdG8ga2VlcCBhIG51bWJlciBvZiAob3RoZXJ3aXNlIHByaXZhdGUpIHRvcC1sZXZlbCBleHBvcnRzICBtYW5nbGVkIGluIHRoZVxuICogY2xpZW50IHNpZGUgY29kZSwgd2UgZXhwb3J0IGEgXyRMRSBvYmplY3QgY29udGFpbmluZyB0aG9zZSBtZW1iZXJzIChvclxuICogaGVscGVyIG1ldGhvZHMgZm9yIGFjY2Vzc2luZyBwcml2YXRlIGZpZWxkcyBvZiB0aG9zZSBtZW1iZXJzKSwgYW5kIHRoZW5cbiAqIHJlLWV4cG9ydCB0aGVtIGZvciB1c2UgaW4gbGl0LXNzci4gVGhpcyBrZWVwcyBsaXQtc3NyIGFnbm9zdGljIHRvIHdoZXRoZXIgdGhlXG4gKiBjbGllbnQtc2lkZSBjb2RlIGlzIGJlaW5nIHVzZWQgaW4gYGRldmAgbW9kZSBvciBgcHJvZGAgbW9kZS5cbiAqXG4gKiBUaGlzIGhhcyBhIHVuaXF1ZSBuYW1lLCB0byBkaXNhbWJpZ3VhdGUgaXQgZnJvbSBwcml2YXRlIGV4cG9ydHMgaW5cbiAqIGxpdC1odG1sLCBzaW5jZSB0aGlzIG1vZHVsZSByZS1leHBvcnRzIGFsbCBvZiBsaXQtaHRtbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgXyRMRSA9IHtcbiAgXyRhdHRyaWJ1dGVUb1Byb3BlcnR5OiAoXG4gICAgZWw6IExpdEVsZW1lbnQsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHZhbHVlOiBzdHJpbmcgfCBudWxsXG4gICkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIChlbCBhcyBhbnkpLl8kYXR0cmlidXRlVG9Qcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4gIH0sXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBfJGNoYW5nZWRQcm9wZXJ0aWVzOiAoZWw6IExpdEVsZW1lbnQpID0+IChlbCBhcyBhbnkpLl8kY2hhbmdlZFByb3BlcnRpZXMsXG59O1xuXG4vLyBJTVBPUlRBTlQ6IGRvIG5vdCBjaGFuZ2UgdGhlIHByb3BlcnR5IG5hbWUgb3IgdGhlIGFzc2lnbm1lbnQgZXhwcmVzc2lvbi5cbi8vIFRoaXMgbGluZSB3aWxsIGJlIHVzZWQgaW4gcmVnZXhlcyB0byBzZWFyY2ggZm9yIExpdEVsZW1lbnQgdXNhZ2UuXG4oZ2xvYmFsLmxpdEVsZW1lbnRWZXJzaW9ucyA/Pz0gW10pLnB1c2goJzQuMi4yJyk7XG5pZiAoREVWX01PREUgJiYgZ2xvYmFsLmxpdEVsZW1lbnRWZXJzaW9ucy5sZW5ndGggPiAxKSB7XG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBpc3N1ZVdhcm5pbmchKFxuICAgICAgJ211bHRpcGxlLXZlcnNpb25zJyxcbiAgICAgIGBNdWx0aXBsZSB2ZXJzaW9ucyBvZiBMaXQgbG9hZGVkLiBMb2FkaW5nIG11bHRpcGxlIHZlcnNpb25zIGAgK1xuICAgICAgICBgaXMgbm90IHJlY29tbWVuZGVkLmBcbiAgICApO1xuICB9KTtcbn1cbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMiBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKlxuICogVGhpcyBmaWxlIGV4cG9ydHMgYSBib29sZWFuIGNvbnN0IHdob3NlIHZhbHVlIHdpbGwgZGVwZW5kIG9uIHdoYXQgZW52aXJvbm1lbnRcbiAqIHRoZSBtb2R1bGUgaXMgYmVpbmcgaW1wb3J0ZWQgZnJvbS5cbiAqL1xuXG5jb25zdCBOT0RFX01PREUgPSBmYWxzZTtcblxuLyoqXG4gKiBBIGJvb2xlYW4gdGhhdCB3aWxsIGJlIGB0cnVlYCBpbiBzZXJ2ZXIgZW52aXJvbm1lbnRzIGxpa2UgTm9kZSwgYW5kIGBmYWxzZWBcbiAqIGluIGJyb3dzZXIgZW52aXJvbm1lbnRzLiBOb3RlIHRoYXQgeW91ciBzZXJ2ZXIgZW52aXJvbm1lbnQgb3IgdG9vbGNoYWluIG11c3RcbiAqIHN1cHBvcnQgdGhlIGBcIm5vZGVcImAgZXhwb3J0IGNvbmRpdGlvbiBmb3IgdGhpcyB0byBiZSBgdHJ1ZWAuXG4gKlxuICogVGhpcyBjYW4gYmUgdXNlZCB3aGVuIGF1dGhvcmluZyBjb21wb25lbnRzIHRvIGNoYW5nZSBiZWhhdmlvciBiYXNlZCBvblxuICogd2hldGhlciBvciBub3QgdGhlIGNvbXBvbmVudCBpcyBleGVjdXRpbmcgaW4gYW4gU1NSIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NlcnZlciA9IE5PREVfTU9ERTtcbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuLypcbiAqIElNUE9SVEFOVDogRm9yIGNvbXBhdGliaWxpdHkgd2l0aCB0c2lja2xlIGFuZCB0aGUgQ2xvc3VyZSBKUyBjb21waWxlciwgYWxsXG4gKiBwcm9wZXJ0eSBkZWNvcmF0b3JzIChidXQgbm90IGNsYXNzIGRlY29yYXRvcnMpIGluIHRoaXMgZmlsZSB0aGF0IGhhdmVcbiAqIGFuIEBFeHBvcnREZWNvcmF0ZWRJdGVtcyBhbm5vdGF0aW9uIG11c3QgYmUgZGVmaW5lZCBhcyBhIHJlZ3VsYXIgZnVuY3Rpb24sXG4gKiBub3QgYW4gYXJyb3cgZnVuY3Rpb24uXG4gKi9cblxuaW1wb3J0IHR5cGUge0NvbnN0cnVjdG9yfSBmcm9tICcuL2Jhc2UuanMnO1xuXG4vKipcbiAqIEFsbG93IGZvciBjdXN0b20gZWxlbWVudCBjbGFzc2VzIHdpdGggcHJpdmF0ZSBjb25zdHJ1Y3RvcnNcbiAqL1xudHlwZSBDdXN0b21FbGVtZW50Q2xhc3MgPSBPbWl0PHR5cGVvZiBIVE1MRWxlbWVudCwgJ25ldyc+O1xuXG5leHBvcnQgdHlwZSBDdXN0b21FbGVtZW50RGVjb3JhdG9yID0ge1xuICAvLyBsZWdhY3lcbiAgKGNsczogQ3VzdG9tRWxlbWVudENsYXNzKTogdm9pZDtcblxuICAvLyBzdGFuZGFyZFxuICAoXG4gICAgdGFyZ2V0OiBDdXN0b21FbGVtZW50Q2xhc3MsXG4gICAgY29udGV4dDogQ2xhc3NEZWNvcmF0b3JDb250ZXh0PENvbnN0cnVjdG9yPEhUTUxFbGVtZW50Pj5cbiAgKTogdm9pZDtcbn07XG5cbi8qKlxuICogQ2xhc3MgZGVjb3JhdG9yIGZhY3RvcnkgdGhhdCBkZWZpbmVzIHRoZSBkZWNvcmF0ZWQgY2xhc3MgYXMgYSBjdXN0b20gZWxlbWVudC5cbiAqXG4gKiBgYGBqc1xuICogQGN1c3RvbUVsZW1lbnQoJ215LWVsZW1lbnQnKVxuICogY2xhc3MgTXlFbGVtZW50IGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gKiAgIHJlbmRlcigpIHtcbiAqICAgICByZXR1cm4gaHRtbGBgO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqIEBwYXJhbSB0YWdOYW1lIFRoZSB0YWcgbmFtZSBvZiB0aGUgY3VzdG9tIGVsZW1lbnQgdG8gZGVmaW5lLlxuICovXG5leHBvcnQgY29uc3QgY3VzdG9tRWxlbWVudCA9XG4gICh0YWdOYW1lOiBzdHJpbmcpOiBDdXN0b21FbGVtZW50RGVjb3JhdG9yID0+XG4gIChcbiAgICBjbGFzc09yVGFyZ2V0OiBDdXN0b21FbGVtZW50Q2xhc3MgfCBDb25zdHJ1Y3RvcjxIVE1MRWxlbWVudD4sXG4gICAgY29udGV4dD86IENsYXNzRGVjb3JhdG9yQ29udGV4dDxDb25zdHJ1Y3RvcjxIVE1MRWxlbWVudD4+XG4gICkgPT4ge1xuICAgIGlmIChjb250ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIoKCkgPT4ge1xuICAgICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXG4gICAgICAgICAgdGFnTmFtZSxcbiAgICAgICAgICBjbGFzc09yVGFyZ2V0IGFzIEN1c3RvbUVsZW1lbnRDb25zdHJ1Y3RvclxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSh0YWdOYW1lLCBjbGFzc09yVGFyZ2V0IGFzIEN1c3RvbUVsZW1lbnRDb25zdHJ1Y3Rvcik7XG4gICAgfVxuICB9O1xuIiwgIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuXG4vKlxuICogSU1QT1JUQU5UOiBGb3IgY29tcGF0aWJpbGl0eSB3aXRoIHRzaWNrbGUgYW5kIHRoZSBDbG9zdXJlIEpTIGNvbXBpbGVyLCBhbGxcbiAqIHByb3BlcnR5IGRlY29yYXRvcnMgKGJ1dCBub3QgY2xhc3MgZGVjb3JhdG9ycykgaW4gdGhpcyBmaWxlIHRoYXQgaGF2ZVxuICogYW4gQEV4cG9ydERlY29yYXRlZEl0ZW1zIGFubm90YXRpb24gbXVzdCBiZSBkZWZpbmVkIGFzIGEgcmVndWxhciBmdW5jdGlvbixcbiAqIG5vdCBhbiBhcnJvdyBmdW5jdGlvbi5cbiAqL1xuXG5pbXBvcnQge1xuICB0eXBlIFByb3BlcnR5RGVjbGFyYXRpb24sXG4gIHR5cGUgUmVhY3RpdmVFbGVtZW50LFxuICBkZWZhdWx0Q29udmVydGVyLFxuICBub3RFcXVhbCxcbn0gZnJvbSAnLi4vcmVhY3RpdmUtZWxlbWVudC5qcyc7XG5pbXBvcnQgdHlwZSB7SW50ZXJmYWNlfSBmcm9tICcuL2Jhc2UuanMnO1xuXG5jb25zdCBERVZfTU9ERSA9IHRydWU7XG5cbmxldCBpc3N1ZVdhcm5pbmc6IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4gdm9pZDtcblxuaWYgKERFVl9NT0RFKSB7XG4gIC8vIEVuc3VyZSB3YXJuaW5ncyBhcmUgaXNzdWVkIG9ubHkgMXgsIGV2ZW4gaWYgbXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0XG4gIC8vIGFyZSBsb2FkZWQuXG4gIGdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MgPz89IG5ldyBTZXQoKTtcblxuICAvKipcbiAgICogSXNzdWUgYSB3YXJuaW5nIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSwgYmFzZWQgZWl0aGVyIG9uIGBjb2RlYCBvciBgd2FybmluZ2AuXG4gICAqIFdhcm5pbmdzIGFyZSBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5IG9ubHkgYnkgYHdhcm5pbmdgOyBkaXNhYmxpbmcgdmlhIGBjb2RlYFxuICAgKiBjYW4gYmUgZG9uZSBieSB1c2Vycy5cbiAgICovXG4gIGlzc3VlV2FybmluZyA9IChjb2RlOiBzdHJpbmcsIHdhcm5pbmc6IHN0cmluZykgPT4ge1xuICAgIHdhcm5pbmcgKz0gYCBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy8ke2NvZGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLmA7XG4gICAgaWYgKFxuICAgICAgIWdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MhLmhhcyh3YXJuaW5nKSAmJlxuICAgICAgIWdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MhLmhhcyhjb2RlKVxuICAgICkge1xuICAgICAgY29uc29sZS53YXJuKHdhcm5pbmcpO1xuICAgICAgZ2xvYmFsVGhpcy5saXRJc3N1ZWRXYXJuaW5ncyEuYWRkKHdhcm5pbmcpO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gT3ZlcmxvYWRzIGZvciBwcm9wZXJ0eSBkZWNvcmF0b3Igc28gdGhhdCBUeXBlU2NyaXB0IGNhbiBpbmZlciB0aGUgY29ycmVjdFxuLy8gcmV0dXJuIHR5cGUgd2hlbiBhIGRlY29yYXRvciBpcyB1c2VkIGFzIGFuIGFjY2Vzc29yIGRlY29yYXRvciBvciBhIHNldHRlclxuLy8gZGVjb3JhdG9yLlxuZXhwb3J0IHR5cGUgUHJvcGVydHlEZWNvcmF0b3IgPSB7XG4gIC8vIGFjY2Vzc29yIGRlY29yYXRvciBzaWduYXR1cmVcbiAgPEMgZXh0ZW5kcyBJbnRlcmZhY2U8UmVhY3RpdmVFbGVtZW50PiwgVj4oXG4gICAgdGFyZ2V0OiBDbGFzc0FjY2Vzc29yRGVjb3JhdG9yVGFyZ2V0PEMsIFY+LFxuICAgIGNvbnRleHQ6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gICk6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JSZXN1bHQ8QywgVj47XG5cbiAgLy8gc2V0dGVyIGRlY29yYXRvciBzaWduYXR1cmVcbiAgPEMgZXh0ZW5kcyBJbnRlcmZhY2U8UmVhY3RpdmVFbGVtZW50PiwgVj4oXG4gICAgdGFyZ2V0OiAodmFsdWU6IFYpID0+IHZvaWQsXG4gICAgY29udGV4dDogQ2xhc3NTZXR0ZXJEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gICk6ICh0aGlzOiBDLCB2YWx1ZTogVikgPT4gdm9pZDtcblxuICAvLyBsZWdhY3kgZGVjb3JhdG9yIHNpZ25hdHVyZVxuICAoXG4gICAgcHJvdG9PckRlc2NyaXB0b3I6IE9iamVjdCxcbiAgICBuYW1lOiBQcm9wZXJ0eUtleSxcbiAgICBkZXNjcmlwdG9yPzogUHJvcGVydHlEZXNjcmlwdG9yXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgKTogYW55O1xufTtcblxuY29uc3QgbGVnYWN5UHJvcGVydHkgPSAoXG4gIG9wdGlvbnM6IFByb3BlcnR5RGVjbGFyYXRpb24gfCB1bmRlZmluZWQsXG4gIHByb3RvOiBPYmplY3QsXG4gIG5hbWU6IFByb3BlcnR5S2V5XG4pID0+IHtcbiAgY29uc3QgaGFzT3duUHJvcGVydHkgPSBwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgKHByb3RvLmNvbnN0cnVjdG9yIGFzIHR5cGVvZiBSZWFjdGl2ZUVsZW1lbnQpLmNyZWF0ZVByb3BlcnR5KG5hbWUsIG9wdGlvbnMpO1xuICAvLyBGb3IgYWNjZXNzb3JzICh3aGljaCBoYXZlIGEgZGVzY3JpcHRvciBvbiB0aGUgcHJvdG90eXBlKSB3ZSBuZWVkIHRvXG4gIC8vIHJldHVybiBhIGRlc2NyaXB0b3IsIG90aGVyd2lzZSBUeXBlU2NyaXB0IG92ZXJ3cml0ZXMgdGhlIGRlc2NyaXB0b3Igd2VcbiAgLy8gZGVmaW5lIGluIGNyZWF0ZVByb3BlcnR5KCkgd2l0aCB0aGUgb3JpZ2luYWwgZGVzY3JpcHRvci4gV2UgZG9uJ3QgZG8gdGhpc1xuICAvLyBmb3IgZmllbGRzLCB3aGljaCBkb24ndCBoYXZlIGEgZGVzY3JpcHRvciwgYmVjYXVzZSB0aGlzIGNvdWxkIG92ZXJ3cml0ZVxuICAvLyBkZXNjcmlwdG9yIGRlZmluZWQgYnkgb3RoZXIgZGVjb3JhdG9ycy5cbiAgcmV0dXJuIGhhc093blByb3BlcnR5XG4gICAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBuYW1lKVxuICAgIDogdW5kZWZpbmVkO1xufTtcblxuLy8gVGhpcyBpcyBkdXBsaWNhdGVkIGZyb20gYSBzaW1pbGFyIHZhcmlhYmxlIGluIHJlYWN0aXZlLWVsZW1lbnQudHMsIGJ1dFxuLy8gYWN0dWFsbHkgbWFrZXMgc2Vuc2UgdG8gaGF2ZSB0aGlzIGRlZmF1bHQgZGVmaW5lZCB3aXRoIHRoZSBkZWNvcmF0b3IsIHNvXG4vLyB0aGF0IGRpZmZlcmVudCBkZWNvcmF0b3JzIGNvdWxkIGhhdmUgZGlmZmVyZW50IGRlZmF1bHRzLlxuY29uc3QgZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb246IFByb3BlcnR5RGVjbGFyYXRpb24gPSB7XG4gIGF0dHJpYnV0ZTogdHJ1ZSxcbiAgdHlwZTogU3RyaW5nLFxuICBjb252ZXJ0ZXI6IGRlZmF1bHRDb252ZXJ0ZXIsXG4gIHJlZmxlY3Q6IGZhbHNlLFxuICBoYXNDaGFuZ2VkOiBub3RFcXVhbCxcbn07XG5cbi8vIFRlbXBvcmFyeSB0eXBlLCB1bnRpbCBnb29nbGUzIGlzIG9uIFR5cGVTY3JpcHQgNS4yXG50eXBlIFN0YW5kYXJkUHJvcGVydHlDb250ZXh0PEMsIFY+ID0gKFxuICB8IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gIHwgQ2xhc3NTZXR0ZXJEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4pICYge21ldGFkYXRhOiBvYmplY3R9O1xuXG4vKipcbiAqIFdyYXBzIGEgY2xhc3MgYWNjZXNzb3Igb3Igc2V0dGVyIHNvIHRoYXQgYHJlcXVlc3RVcGRhdGUoKWAgaXMgY2FsbGVkIHdpdGggdGhlXG4gKiBwcm9wZXJ0eSBuYW1lIGFuZCBvbGQgdmFsdWUgd2hlbiB0aGUgYWNjZXNzb3IgaXMgc2V0LlxuICovXG5leHBvcnQgY29uc3Qgc3RhbmRhcmRQcm9wZXJ0eSA9IDxDIGV4dGVuZHMgSW50ZXJmYWNlPFJlYWN0aXZlRWxlbWVudD4sIFY+KFxuICBvcHRpb25zOiBQcm9wZXJ0eURlY2xhcmF0aW9uID0gZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb24sXG4gIHRhcmdldDogQ2xhc3NBY2Nlc3NvckRlY29yYXRvclRhcmdldDxDLCBWPiB8ICgodmFsdWU6IFYpID0+IHZvaWQpLFxuICBjb250ZXh0OiBTdGFuZGFyZFByb3BlcnR5Q29udGV4dDxDLCBWPlxuKTogQ2xhc3NBY2Nlc3NvckRlY29yYXRvclJlc3VsdDxDLCBWPiB8ICgodGhpczogQywgdmFsdWU6IFYpID0+IHZvaWQpID0+IHtcbiAgY29uc3Qge2tpbmQsIG1ldGFkYXRhfSA9IGNvbnRleHQ7XG5cbiAgaWYgKERFVl9NT0RFICYmIG1ldGFkYXRhID09IG51bGwpIHtcbiAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAnbWlzc2luZy1jbGFzcy1tZXRhZGF0YScsXG4gICAgICBgVGhlIGNsYXNzICR7dGFyZ2V0fSBpcyBtaXNzaW5nIGRlY29yYXRvciBtZXRhZGF0YS4gVGhpcyBgICtcbiAgICAgICAgYGNvdWxkIG1lYW4gdGhhdCB5b3UncmUgdXNpbmcgYSBjb21waWxlciB0aGF0IHN1cHBvcnRzIGRlY29yYXRvcnMgYCArXG4gICAgICAgIGBidXQgZG9lc24ndCBzdXBwb3J0IGRlY29yYXRvciBtZXRhZGF0YSwgc3VjaCBhcyBUeXBlU2NyaXB0IDUuMS4gYCArXG4gICAgICAgIGBQbGVhc2UgdXBkYXRlIHlvdXIgY29tcGlsZXIuYFxuICAgICk7XG4gIH1cblxuICAvLyBTdG9yZSB0aGUgcHJvcGVydHkgb3B0aW9uc1xuICBsZXQgcHJvcGVydGllcyA9IGdsb2JhbFRoaXMubGl0UHJvcGVydHlNZXRhZGF0YS5nZXQobWV0YWRhdGEpO1xuICBpZiAocHJvcGVydGllcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZ2xvYmFsVGhpcy5saXRQcm9wZXJ0eU1ldGFkYXRhLnNldChtZXRhZGF0YSwgKHByb3BlcnRpZXMgPSBuZXcgTWFwKCkpKTtcbiAgfVxuICBpZiAoa2luZCA9PT0gJ3NldHRlcicpIHtcbiAgICBvcHRpb25zID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zKTtcbiAgICBvcHRpb25zLndyYXBwZWQgPSB0cnVlO1xuICB9XG4gIHByb3BlcnRpZXMuc2V0KGNvbnRleHQubmFtZSwgb3B0aW9ucyk7XG5cbiAgaWYgKGtpbmQgPT09ICdhY2Nlc3NvcicpIHtcbiAgICAvLyBTdGFuZGFyZCBkZWNvcmF0b3JzIGNhbm5vdCBkeW5hbWljYWxseSBtb2RpZnkgdGhlIGNsYXNzLCBzbyB3ZSBjYW4ndFxuICAgIC8vIHJlcGxhY2UgYSBmaWVsZCB3aXRoIGFjY2Vzc29ycy4gVGhlIHVzZXIgbXVzdCB1c2UgdGhlIG5ldyBgYWNjZXNzb3JgXG4gICAgLy8ga2V5d29yZCBpbnN0ZWFkLlxuICAgIGNvbnN0IHtuYW1lfSA9IGNvbnRleHQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldCh0aGlzOiBSZWFjdGl2ZUVsZW1lbnQsIHY6IFYpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSAoXG4gICAgICAgICAgdGFyZ2V0IGFzIENsYXNzQWNjZXNzb3JEZWNvcmF0b3JUYXJnZXQ8QywgVj5cbiAgICAgICAgKS5nZXQuY2FsbCh0aGlzIGFzIHVua25vd24gYXMgQyk7XG4gICAgICAgICh0YXJnZXQgYXMgQ2xhc3NBY2Nlc3NvckRlY29yYXRvclRhcmdldDxDLCBWPikuc2V0LmNhbGwoXG4gICAgICAgICAgdGhpcyBhcyB1bmtub3duIGFzIEMsXG4gICAgICAgICAgdlxuICAgICAgICApO1xuICAgICAgICB0aGlzLnJlcXVlc3RVcGRhdGUobmFtZSwgb2xkVmFsdWUsIG9wdGlvbnMsIHRydWUsIHYpO1xuICAgICAgfSxcbiAgICAgIGluaXQodGhpczogUmVhY3RpdmVFbGVtZW50LCB2OiBWKTogViB7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLl8kY2hhbmdlUHJvcGVydHkobmFtZSwgdW5kZWZpbmVkLCBvcHRpb25zLCB2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH0sXG4gICAgfSBhcyB1bmtub3duIGFzIENsYXNzQWNjZXNzb3JEZWNvcmF0b3JSZXN1bHQ8QywgVj47XG4gIH0gZWxzZSBpZiAoa2luZCA9PT0gJ3NldHRlcicpIHtcbiAgICBjb25zdCB7bmFtZX0gPSBjb250ZXh0O1xuICAgIHJldHVybiBmdW5jdGlvbiAodGhpczogUmVhY3RpdmVFbGVtZW50LCB2YWx1ZTogVikge1xuICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzW25hbWUgYXMga2V5b2YgUmVhY3RpdmVFbGVtZW50XTtcbiAgICAgICh0YXJnZXQgYXMgKHZhbHVlOiBWKSA9PiB2b2lkKS5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgIHRoaXMucmVxdWVzdFVwZGF0ZShuYW1lLCBvbGRWYWx1ZSwgb3B0aW9ucywgdHJ1ZSwgdmFsdWUpO1xuICAgIH0gYXMgdW5rbm93biBhcyAodGhpczogQywgdmFsdWU6IFYpID0+IHZvaWQ7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBkZWNvcmF0b3IgbG9jYXRpb246ICR7a2luZH1gKTtcbn07XG5cbi8qKlxuICogQSBjbGFzcyBmaWVsZCBvciBhY2Nlc3NvciBkZWNvcmF0b3Igd2hpY2ggY3JlYXRlcyBhIHJlYWN0aXZlIHByb3BlcnR5IHRoYXRcbiAqIHJlZmxlY3RzIGEgY29ycmVzcG9uZGluZyBhdHRyaWJ1dGUgdmFsdWUuIFdoZW4gYSBkZWNvcmF0ZWQgcHJvcGVydHkgaXMgc2V0XG4gKiB0aGUgZWxlbWVudCB3aWxsIHVwZGF0ZSBhbmQgcmVuZGVyLiBBIHtAbGlua2NvZGUgUHJvcGVydHlEZWNsYXJhdGlvbn0gbWF5XG4gKiBvcHRpb25hbGx5IGJlIHN1cHBsaWVkIHRvIGNvbmZpZ3VyZSBwcm9wZXJ0eSBmZWF0dXJlcy5cbiAqXG4gKiBUaGlzIGRlY29yYXRvciBzaG91bGQgb25seSBiZSB1c2VkIGZvciBwdWJsaWMgZmllbGRzLiBBcyBwdWJsaWMgZmllbGRzLFxuICogcHJvcGVydGllcyBzaG91bGQgYmUgY29uc2lkZXJlZCBhcyBwcmltYXJpbHkgc2V0dGFibGUgYnkgZWxlbWVudCB1c2VycyxcbiAqIGVpdGhlciB2aWEgYXR0cmlidXRlIG9yIHRoZSBwcm9wZXJ0eSBpdHNlbGYuXG4gKlxuICogR2VuZXJhbGx5LCBwcm9wZXJ0aWVzIHRoYXQgYXJlIGNoYW5nZWQgYnkgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIHByaXZhdGUgb3JcbiAqIHByb3RlY3RlZCBmaWVsZHMgYW5kIHNob3VsZCB1c2UgdGhlIHtAbGlua2NvZGUgc3RhdGV9IGRlY29yYXRvci5cbiAqXG4gKiBIb3dldmVyLCBzb21ldGltZXMgZWxlbWVudCBjb2RlIGRvZXMgbmVlZCB0byBzZXQgYSBwdWJsaWMgcHJvcGVydHkuIFRoaXNcbiAqIHNob3VsZCB0eXBpY2FsbHkgb25seSBiZSBkb25lIGluIHJlc3BvbnNlIHRvIHVzZXIgaW50ZXJhY3Rpb24sIGFuZCBhbiBldmVudFxuICogc2hvdWxkIGJlIGZpcmVkIGluZm9ybWluZyB0aGUgdXNlcjsgZm9yIGV4YW1wbGUsIGEgY2hlY2tib3ggc2V0cyBpdHNcbiAqIGBjaGVja2VkYCBwcm9wZXJ0eSB3aGVuIGNsaWNrZWQgYW5kIGZpcmVzIGEgYGNoYW5nZWRgIGV2ZW50LiBNdXRhdGluZyBwdWJsaWNcbiAqIHByb3BlcnRpZXMgc2hvdWxkIHR5cGljYWxseSBub3QgYmUgZG9uZSBmb3Igbm9uLXByaW1pdGl2ZSAob2JqZWN0IG9yIGFycmF5KVxuICogcHJvcGVydGllcy4gSW4gb3RoZXIgY2FzZXMgd2hlbiBhbiBlbGVtZW50IG5lZWRzIHRvIG1hbmFnZSBzdGF0ZSwgYSBwcml2YXRlXG4gKiBwcm9wZXJ0eSBkZWNvcmF0ZWQgdmlhIHRoZSB7QGxpbmtjb2RlIHN0YXRlfSBkZWNvcmF0b3Igc2hvdWxkIGJlIHVzZWQuIFdoZW5cbiAqIG5lZWRlZCwgc3RhdGUgcHJvcGVydGllcyBjYW4gYmUgaW5pdGlhbGl6ZWQgdmlhIHB1YmxpYyBwcm9wZXJ0aWVzIHRvXG4gKiBmYWNpbGl0YXRlIGNvbXBsZXggaW50ZXJhY3Rpb25zLlxuICpcbiAqIGBgYHRzXG4gKiBjbGFzcyBNeUVsZW1lbnQge1xuICogICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gKiAgIGNsaWNrZWQgPSBmYWxzZTtcbiAqIH1cbiAqIGBgYFxuICogQGNhdGVnb3J5IERlY29yYXRvclxuICogQEV4cG9ydERlY29yYXRlZEl0ZW1zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eShvcHRpb25zPzogUHJvcGVydHlEZWNsYXJhdGlvbik6IFByb3BlcnR5RGVjb3JhdG9yIHtcbiAgcmV0dXJuIDxDIGV4dGVuZHMgSW50ZXJmYWNlPFJlYWN0aXZlRWxlbWVudD4sIFY+KFxuICAgIHByb3RvT3JUYXJnZXQ6XG4gICAgICB8IG9iamVjdFxuICAgICAgfCBDbGFzc0FjY2Vzc29yRGVjb3JhdG9yVGFyZ2V0PEMsIFY+XG4gICAgICB8ICgodmFsdWU6IFYpID0+IHZvaWQpLFxuICAgIG5hbWVPckNvbnRleHQ6XG4gICAgICB8IFByb3BlcnR5S2V5XG4gICAgICB8IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gICAgICB8IENsYXNzU2V0dGVyRGVjb3JhdG9yQ29udGV4dDxDLCBWPlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICk6IGFueSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiBuYW1lT3JDb250ZXh0ID09PSAnb2JqZWN0J1xuICAgICAgICA/IHN0YW5kYXJkUHJvcGVydHk8QywgVj4oXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgcHJvdG9PclRhcmdldCBhc1xuICAgICAgICAgICAgICB8IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JUYXJnZXQ8QywgVj5cbiAgICAgICAgICAgICAgfCAoKHZhbHVlOiBWKSA9PiB2b2lkKSxcbiAgICAgICAgICAgIG5hbWVPckNvbnRleHQgYXMgU3RhbmRhcmRQcm9wZXJ0eUNvbnRleHQ8QywgVj5cbiAgICAgICAgICApXG4gICAgICAgIDogbGVnYWN5UHJvcGVydHkoXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgcHJvdG9PclRhcmdldCBhcyBPYmplY3QsXG4gICAgICAgICAgICBuYW1lT3JDb250ZXh0IGFzIFByb3BlcnR5S2V5XG4gICAgICAgICAgKVxuICAgICkgYXMgUHJvcGVydHlEZWNvcmF0b3I7XG4gIH07XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8qXG4gKiBJTVBPUlRBTlQ6IEZvciBjb21wYXRpYmlsaXR5IHdpdGggdHNpY2tsZSBhbmQgdGhlIENsb3N1cmUgSlMgY29tcGlsZXIsIGFsbFxuICogcHJvcGVydHkgZGVjb3JhdG9ycyAoYnV0IG5vdCBjbGFzcyBkZWNvcmF0b3JzKSBpbiB0aGlzIGZpbGUgdGhhdCBoYXZlXG4gKiBhbiBARXhwb3J0RGVjb3JhdGVkSXRlbXMgYW5ub3RhdGlvbiBtdXN0IGJlIGRlZmluZWQgYXMgYSByZWd1bGFyIGZ1bmN0aW9uLFxuICogbm90IGFuIGFycm93IGZ1bmN0aW9uLlxuICovXG5cbmltcG9ydCB7cHJvcGVydHl9IGZyb20gJy4vcHJvcGVydHkuanMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlRGVjbGFyYXRpb248VHlwZSA9IHVua25vd24+IHtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBpbmRpY2F0ZXMgaWYgYSBwcm9wZXJ0eSBzaG91bGQgYmUgY29uc2lkZXJlZCBjaGFuZ2VkIHdoZW5cbiAgICogaXQgaXMgc2V0LiBUaGUgZnVuY3Rpb24gc2hvdWxkIHRha2UgdGhlIGBuZXdWYWx1ZWAgYW5kIGBvbGRWYWx1ZWAgYW5kXG4gICAqIHJldHVybiBgdHJ1ZWAgaWYgYW4gdXBkYXRlIHNob3VsZCBiZSByZXF1ZXN0ZWQuXG4gICAqL1xuICBoYXNDaGFuZ2VkPyh2YWx1ZTogVHlwZSwgb2xkVmFsdWU6IFR5cGUpOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSBTdGF0ZURlY2xhcmF0aW9uXG4gKi9cbmV4cG9ydCB0eXBlIEludGVybmFsUHJvcGVydHlEZWNsYXJhdGlvbjxUeXBlID0gdW5rbm93bj4gPVxuICBTdGF0ZURlY2xhcmF0aW9uPFR5cGU+O1xuXG4vKipcbiAqIERlY2xhcmVzIGEgcHJpdmF0ZSBvciBwcm90ZWN0ZWQgcmVhY3RpdmUgcHJvcGVydHkgdGhhdCBzdGlsbCB0cmlnZ2Vyc1xuICogdXBkYXRlcyB0byB0aGUgZWxlbWVudCB3aGVuIGl0IGNoYW5nZXMuIEl0IGRvZXMgbm90IHJlZmxlY3QgZnJvbSB0aGVcbiAqIGNvcnJlc3BvbmRpbmcgYXR0cmlidXRlLlxuICpcbiAqIFByb3BlcnRpZXMgZGVjbGFyZWQgdGhpcyB3YXkgbXVzdCBub3QgYmUgdXNlZCBmcm9tIEhUTUwgb3IgSFRNTCB0ZW1wbGF0aW5nXG4gKiBzeXN0ZW1zLCB0aGV5J3JlIHNvbGVseSBmb3IgcHJvcGVydGllcyBpbnRlcm5hbCB0byB0aGUgZWxlbWVudC4gVGhlc2VcbiAqIHByb3BlcnRpZXMgbWF5IGJlIHJlbmFtZWQgYnkgb3B0aW1pemF0aW9uIHRvb2xzIGxpa2UgY2xvc3VyZSBjb21waWxlci5cbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlKG9wdGlvbnM/OiBTdGF0ZURlY2xhcmF0aW9uKSB7XG4gIHJldHVybiBwcm9wZXJ0eSh7XG4gICAgLi4ub3B0aW9ucyxcbiAgICAvLyBBZGQgYm90aCBgc3RhdGVgIGFuZCBgYXR0cmlidXRlYCBiZWNhdXNlIHdlIGZvdW5kIGEgdGhpcmQgcGFydHlcbiAgICAvLyBjb250cm9sbGVyIHRoYXQgaXMga2V5aW5nIG9mZiBvZiBQcm9wZXJ0eU9wdGlvbnMuc3RhdGUgdG8gZGV0ZXJtaW5lXG4gICAgLy8gd2hldGhlciBhIGZpZWxkIGlzIGEgcHJpdmF0ZSBpbnRlcm5hbCBwcm9wZXJ0eSBvciBub3QuXG4gICAgc3RhdGU6IHRydWUsXG4gICAgYXR0cmlidXRlOiBmYWxzZSxcbiAgfSk7XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcHVibGljIGludGVyZmFjZSB0eXBlIHRoYXQgcmVtb3ZlcyBwcml2YXRlIGFuZCBwcm90ZWN0ZWQgZmllbGRzLlxuICogVGhpcyBhbGxvd3MgYWNjZXB0aW5nIG90aGVyd2lzZSBpbmNvbXBhdGlibGUgdmVyc2lvbnMgb2YgdGhlIHR5cGUgKGUuZy4gZnJvbVxuICogbXVsdGlwbGUgY29waWVzIG9mIHRoZSBzYW1lIHBhY2thZ2UgaW4gYG5vZGVfbW9kdWxlc2ApLlxuICovXG5leHBvcnQgdHlwZSBJbnRlcmZhY2U8VD4gPSB7XG4gIFtLIGluIGtleW9mIFRdOiBUW0tdO1xufTtcblxuZXhwb3J0IHR5cGUgQ29uc3RydWN0b3I8VD4gPSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIG5ldyAoLi4uYXJnczogYW55W10pOiBUO1xufTtcblxuLyoqXG4gKiBXcmFwcyB1cCBhIGZldyBiZXN0IHByYWN0aWNlcyB3aGVuIHJldHVybmluZyBhIHByb3BlcnR5IGRlc2NyaXB0b3IgZnJvbSBhXG4gKiBkZWNvcmF0b3IuXG4gKlxuICogTWFya3MgdGhlIGRlZmluZWQgcHJvcGVydHkgYXMgY29uZmlndXJhYmxlLCBhbmQgZW51bWVyYWJsZSwgYW5kIGhhbmRsZXNcbiAqIHRoZSBjYXNlIHdoZXJlIHdlIGhhdmUgYSBidXN0ZWQgUmVmbGVjdC5kZWNvcmF0ZSB6b21iaWVmaWxsIChlLmcuIGluIEFuZ3VsYXJcbiAqIGFwcHMpLlxuICpcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgZGVzYyA9IChcbiAgb2JqOiBvYmplY3QsXG4gIG5hbWU6IFByb3BlcnR5S2V5IHwgQ2xhc3NBY2Nlc3NvckRlY29yYXRvckNvbnRleHQ8dW5rbm93biwgdW5rbm93bj4sXG4gIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxuKSA9PiB7XG4gIC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSwgd2Uga2VlcCB0aGVtIGNvbmZpZ3VyYWJsZSBhbmQgZW51bWVyYWJsZS5cbiAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSB0cnVlO1xuICBpZiAoXG4gICAgLy8gV2UgY2hlY2sgZm9yIFJlZmxlY3QuZGVjb3JhdGUgZWFjaCB0aW1lLCBpbiBjYXNlIHRoZSB6b21iaWVmaWxsXG4gICAgLy8gaXMgYXBwbGllZCB2aWEgbGF6eSBsb2FkaW5nIHNvbWUgQW5ndWxhciBjb2RlLlxuICAgIChSZWZsZWN0IGFzIHR5cGVvZiBSZWZsZWN0ICYge2RlY29yYXRlPzogdW5rbm93bn0pLmRlY29yYXRlICYmXG4gICAgdHlwZW9mIG5hbWUgIT09ICdvYmplY3QnXG4gICkge1xuICAgIC8vIElmIHdlJ3JlIGNhbGxlZCBhcyBhIGxlZ2FjeSBkZWNvcmF0b3IsIGFuZCBSZWZsZWN0LmRlY29yYXRlIGlzIHByZXNlbnRcbiAgICAvLyB0aGVuIHdlIGhhdmUgbm8gZ3VhcmFudGVlcyB0aGF0IHRoZSByZXR1cm5lZCBkZXNjcmlwdG9yIHdpbGwgYmVcbiAgICAvLyBkZWZpbmVkIG9uIHRoZSBjbGFzcywgc28gd2UgbXVzdCBhcHBseSBpdCBkaXJlY3RseSBvdXJzZWx2ZXMuXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgfVxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn07XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8qXG4gKiBJTVBPUlRBTlQ6IEZvciBjb21wYXRpYmlsaXR5IHdpdGggdHNpY2tsZSBhbmQgdGhlIENsb3N1cmUgSlMgY29tcGlsZXIsIGFsbFxuICogcHJvcGVydHkgZGVjb3JhdG9ycyAoYnV0IG5vdCBjbGFzcyBkZWNvcmF0b3JzKSBpbiB0aGlzIGZpbGUgdGhhdCBoYXZlXG4gKiBhbiBARXhwb3J0RGVjb3JhdGVkSXRlbXMgYW5ub3RhdGlvbiBtdXN0IGJlIGRlZmluZWQgYXMgYSByZWd1bGFyIGZ1bmN0aW9uLFxuICogbm90IGFuIGFycm93IGZ1bmN0aW9uLlxuICovXG5pbXBvcnQgdHlwZSB7UmVhY3RpdmVFbGVtZW50fSBmcm9tICcuLi9yZWFjdGl2ZS1lbGVtZW50LmpzJztcbmltcG9ydCB7ZGVzYywgdHlwZSBJbnRlcmZhY2V9IGZyb20gJy4vYmFzZS5qcyc7XG5cbmNvbnN0IERFVl9NT0RFID0gdHJ1ZTtcblxubGV0IGlzc3VlV2FybmluZzogKGNvZGU6IHN0cmluZywgd2FybmluZzogc3RyaW5nKSA9PiB2b2lkO1xuXG5pZiAoREVWX01PREUpIHtcbiAgLy8gRW5zdXJlIHdhcm5pbmdzIGFyZSBpc3N1ZWQgb25seSAxeCwgZXZlbiBpZiBtdWx0aXBsZSB2ZXJzaW9ucyBvZiBMaXRcbiAgLy8gYXJlIGxvYWRlZC5cbiAgZ2xvYmFsVGhpcy5saXRJc3N1ZWRXYXJuaW5ncyA/Pz0gbmV3IFNldCgpO1xuXG4gIC8qKlxuICAgKiBJc3N1ZSBhIHdhcm5pbmcgaWYgd2UgaGF2ZW4ndCBhbHJlYWR5LCBiYXNlZCBlaXRoZXIgb24gYGNvZGVgIG9yIGB3YXJuaW5nYC5cbiAgICogV2FybmluZ3MgYXJlIGRpc2FibGVkIGF1dG9tYXRpY2FsbHkgb25seSBieSBgd2FybmluZ2A7IGRpc2FibGluZyB2aWEgYGNvZGVgXG4gICAqIGNhbiBiZSBkb25lIGJ5IHVzZXJzLlxuICAgKi9cbiAgaXNzdWVXYXJuaW5nID0gKGNvZGU6IHN0cmluZywgd2FybmluZzogc3RyaW5nKSA9PiB7XG4gICAgd2FybmluZyArPSBjb2RlXG4gICAgICA/IGAgU2VlIGh0dHBzOi8vbGl0LmRldi9tc2cvJHtjb2RlfSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gXG4gICAgICA6ICcnO1xuICAgIGlmIChcbiAgICAgICFnbG9iYWxUaGlzLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMod2FybmluZykgJiZcbiAgICAgICFnbG9iYWxUaGlzLmxpdElzc3VlZFdhcm5pbmdzIS5oYXMoY29kZSlcbiAgICApIHtcbiAgICAgIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbiAgICAgIGdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MhLmFkZCh3YXJuaW5nKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5RGVjb3JhdG9yID0ge1xuICAvLyBsZWdhY3lcbiAgKFxuICAgIHByb3RvOiBJbnRlcmZhY2U8UmVhY3RpdmVFbGVtZW50PixcbiAgICBuYW1lOiBQcm9wZXJ0eUtleSxcbiAgICBkZXNjcmlwdG9yPzogUHJvcGVydHlEZXNjcmlwdG9yXG4gICAgLy8gTm90ZSBUeXBlU2NyaXB0IHJlcXVpcmVzIHRoZSByZXR1cm4gdHlwZSB0byBiZSBgdm9pZHxhbnlgXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgKTogdm9pZCB8IGFueTtcblxuICAvLyBzdGFuZGFyZFxuICA8QyBleHRlbmRzIEludGVyZmFjZTxSZWFjdGl2ZUVsZW1lbnQ+LCBWIGV4dGVuZHMgRWxlbWVudCB8IG51bGw+KFxuICAgIHZhbHVlOiBDbGFzc0FjY2Vzc29yRGVjb3JhdG9yVGFyZ2V0PEMsIFY+LFxuICAgIGNvbnRleHQ6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JDb250ZXh0PEMsIFY+XG4gICk6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JSZXN1bHQ8QywgVj47XG59O1xuXG4vKipcbiAqIEEgcHJvcGVydHkgZGVjb3JhdG9yIHRoYXQgY29udmVydHMgYSBjbGFzcyBwcm9wZXJ0eSBpbnRvIGEgZ2V0dGVyIHRoYXRcbiAqIGV4ZWN1dGVzIGEgcXVlcnlTZWxlY3RvciBvbiB0aGUgZWxlbWVudCdzIHJlbmRlclJvb3QuXG4gKlxuICogQHBhcmFtIHNlbGVjdG9yIEEgRE9NU3RyaW5nIGNvbnRhaW5pbmcgb25lIG9yIG1vcmUgc2VsZWN0b3JzIHRvIG1hdGNoLlxuICogQHBhcmFtIGNhY2hlIEFuIG9wdGlvbmFsIGJvb2xlYW4gd2hpY2ggd2hlbiB0cnVlIHBlcmZvcm1zIHRoZSBET00gcXVlcnkgb25seVxuICogICAgIG9uY2UgYW5kIGNhY2hlcyB0aGUgcmVzdWx0LlxuICpcbiAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L3F1ZXJ5U2VsZWN0b3JcbiAqXG4gKiBgYGB0c1xuICogY2xhc3MgTXlFbGVtZW50IHtcbiAqICAgQHF1ZXJ5KCcjZmlyc3QnKVxuICogICBmaXJzdDogSFRNTERpdkVsZW1lbnQ7XG4gKlxuICogICByZW5kZXIoKSB7XG4gKiAgICAgcmV0dXJuIGh0bWxgXG4gKiAgICAgICA8ZGl2IGlkPVwiZmlyc3RcIj48L2Rpdj5cbiAqICAgICAgIDxkaXYgaWQ9XCJzZWNvbmRcIj48L2Rpdj5cbiAqICAgICBgO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5KHNlbGVjdG9yOiBzdHJpbmcsIGNhY2hlPzogYm9vbGVhbik6IFF1ZXJ5RGVjb3JhdG9yIHtcbiAgcmV0dXJuICg8QyBleHRlbmRzIEludGVyZmFjZTxSZWFjdGl2ZUVsZW1lbnQ+LCBWIGV4dGVuZHMgRWxlbWVudCB8IG51bGw+KFxuICAgIHByb3RvT3JUYXJnZXQ6IENsYXNzQWNjZXNzb3JEZWNvcmF0b3JUYXJnZXQ8QywgVj4sXG4gICAgbmFtZU9yQ29udGV4dDogUHJvcGVydHlLZXkgfCBDbGFzc0FjY2Vzc29yRGVjb3JhdG9yQ29udGV4dDxDLCBWPixcbiAgICBkZXNjcmlwdG9yPzogUHJvcGVydHlEZXNjcmlwdG9yXG4gICkgPT4ge1xuICAgIGNvbnN0IGRvUXVlcnkgPSAoZWw6IEludGVyZmFjZTxSZWFjdGl2ZUVsZW1lbnQ+KTogViA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSAoZWwucmVuZGVyUm9vdD8ucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgPz8gbnVsbCkgYXMgVjtcbiAgICAgIGlmIChERVZfTU9ERSAmJiByZXN1bHQgPT09IG51bGwgJiYgY2FjaGUgJiYgIWVsLmhhc1VwZGF0ZWQpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9XG4gICAgICAgICAgdHlwZW9mIG5hbWVPckNvbnRleHQgPT09ICdvYmplY3QnXG4gICAgICAgICAgICA/IG5hbWVPckNvbnRleHQubmFtZVxuICAgICAgICAgICAgOiBuYW1lT3JDb250ZXh0O1xuICAgICAgICBpc3N1ZVdhcm5pbmcoXG4gICAgICAgICAgJycsXG4gICAgICAgICAgYEBxdWVyeSdkIGZpZWxkICR7SlNPTi5zdHJpbmdpZnkoU3RyaW5nKG5hbWUpKX0gd2l0aCB0aGUgJ2NhY2hlJyBgICtcbiAgICAgICAgICAgIGBmbGFnIHNldCBmb3Igc2VsZWN0b3IgJyR7c2VsZWN0b3J9JyBoYXMgYmVlbiBhY2Nlc3NlZCBiZWZvcmUgYCArXG4gICAgICAgICAgICBgdGhlIGZpcnN0IHVwZGF0ZSBhbmQgcmV0dXJuZWQgbnVsbC4gVGhpcyBpcyBleHBlY3RlZCBpZiB0aGUgYCArXG4gICAgICAgICAgICBgcmVuZGVyUm9vdCB0cmVlIGhhcyBub3QgYmVlbiBwcm92aWRlZCBiZWZvcmVoYW5kIChlLmcuIHZpYSBgICtcbiAgICAgICAgICAgIGBEZWNsYXJhdGl2ZSBTaGFkb3cgRE9NKS4gVGhlcmVmb3JlIHRoZSB2YWx1ZSBoYXNuJ3QgYmVlbiBjYWNoZWQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogaWYgd2Ugd2FudCB0byBhbGxvdyB1c2VycyB0byBhc3NlcnQgdGhhdCB0aGUgcXVlcnkgd2lsbCBuZXZlclxuICAgICAgLy8gcmV0dXJuIG51bGwsIHdlIG5lZWQgYSBuZXcgb3B0aW9uIGFuZCB0byB0aHJvdyBoZXJlIGlmIHRoZSByZXN1bHRcbiAgICAgIC8vIGlzIG51bGwuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgaWYgKGNhY2hlKSB7XG4gICAgICAvLyBBY2Nlc3NvcnMgdG8gd3JhcCBmcm9tIGVpdGhlcjpcbiAgICAgIC8vICAgMS4gVGhlIGRlY29yYXRvciB0YXJnZXQsIGluIHRoZSBjYXNlIG9mIHN0YW5kYXJkIGRlY29yYXRvcnNcbiAgICAgIC8vICAgMi4gVGhlIHByb3BlcnR5IGRlc2NyaXB0b3IsIGluIHRoZSBjYXNlIG9mIGV4cGVyaW1lbnRhbCBkZWNvcmF0b3JzXG4gICAgICAvLyAgICAgIG9uIGF1dG8tYWNjZXNzb3JzLlxuICAgICAgLy8gICAzLiBGdW5jdGlvbnMgdGhhdCBhY2Nlc3Mgb3VyIG93biBjYWNoZS1rZXkgcHJvcGVydHkgb24gdGhlIGluc3RhbmNlLFxuICAgICAgLy8gICAgICBpbiB0aGUgY2FzZSBvZiBleHBlcmltZW50YWwgZGVjb3JhdG9ycyBvbiBmaWVsZHMuXG4gICAgICBjb25zdCB7Z2V0LCBzZXR9ID1cbiAgICAgICAgdHlwZW9mIG5hbWVPckNvbnRleHQgPT09ICdvYmplY3QnXG4gICAgICAgICAgPyBwcm90b09yVGFyZ2V0XG4gICAgICAgICAgOiAoZGVzY3JpcHRvciA/P1xuICAgICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qga2V5ID0gREVWX01PREVcbiAgICAgICAgICAgICAgICA/IFN5bWJvbChgJHtTdHJpbmcobmFtZU9yQ29udGV4dCl9IChAcXVlcnkoKSBjYWNoZSlgKVxuICAgICAgICAgICAgICAgIDogU3ltYm9sKCk7XG4gICAgICAgICAgICAgIHR5cGUgV2l0aENhY2hlID0gUmVhY3RpdmVFbGVtZW50ICYge1xuICAgICAgICAgICAgICAgIFtrZXk6IHN5bWJvbF06IEVsZW1lbnQgfCBudWxsO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcyBhcyBXaXRoQ2FjaGUpW2tleV07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQodikge1xuICAgICAgICAgICAgICAgICAgKHRoaXMgYXMgV2l0aENhY2hlKVtrZXldID0gdjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkoKSk7XG4gICAgICByZXR1cm4gZGVzYyhwcm90b09yVGFyZ2V0LCBuYW1lT3JDb250ZXh0LCB7XG4gICAgICAgIGdldCh0aGlzOiBSZWFjdGl2ZUVsZW1lbnQpOiBWIHtcbiAgICAgICAgICBsZXQgcmVzdWx0OiBWID0gZ2V0IS5jYWxsKHRoaXMpO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZG9RdWVyeSh0aGlzKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IG51bGwgfHwgdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICAgICAgICAgIHNldCEuY2FsbCh0aGlzLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgb2JqZWN0IHdvcmtzIGFzIHRoZSByZXR1cm4gdHlwZSBmb3IgYm90aCBzdGFuZGFyZCBhbmRcbiAgICAgIC8vIGV4cGVyaW1lbnRhbCBkZWNvcmF0b3JzLlxuICAgICAgcmV0dXJuIGRlc2MocHJvdG9PclRhcmdldCwgbmFtZU9yQ29udGV4dCwge1xuICAgICAgICBnZXQodGhpczogUmVhY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGRvUXVlcnkodGhpcyk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH0pIGFzIFF1ZXJ5RGVjb3JhdG9yO1xufVxuIiwgImltcG9ydCB0eXBlIHsgVGhyZWFkLCBDb21tZW50LCBSZWFjdGlvbiwgQXV0aG9yc01hcCB9IGZyb20gJy4uLy4uL3R5cGVzLnRzJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICB2YXIgZG9jbWQ6IHtcbiAgICBjYWxsKGFjdGlvbjogc3RyaW5nLCBwYXlsb2FkOiBhbnkpOiBQcm9taXNlPGFueT47XG4gICAgc2VuZChuYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IHZvaWQ7XG4gICAgb24obmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCk6ICgpID0+IHZvaWQ7XG4gICAgYWZ0ZXJSZWxvYWQobmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGN0eDogYW55KSA9PiB2b2lkKTogdm9pZDtcbiAgICBzY2hlZHVsZVJlbG9hZChuYW1lOiBzdHJpbmcsIGNvbnRleHQ/OiBhbnkpOiB2b2lkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2VGaWxlKCk6IHN0cmluZyB7XG4gIGNvbnN0IGZpbGUgPSBkb2N1bWVudC5ib2R5LmRhdGFzZXRbJ3NvdXJjZUZpbGUnXTtcbiAgaWYgKCFmaWxlKSB0aHJvdyBuZXcgRXJyb3IoJ1t0aHJlYWRzXSBkYXRhLXNvdXJjZS1maWxlIG5vdCBmb3VuZCBvbiBib2R5IGVsZW1lbnQnKTtcbiAgcmV0dXJuIGZpbGU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEF1dGhvcnMoKTogUHJvbWlzZTxBdXRob3JzTWFwPiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGF3YWl0IGRvY21kLmNhbGwoJ3RocmVhZHM6Z2V0LWF1dGhvcnMnLCB7fSk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIEZhbGxiYWNrIHRvIGluamVjdGVkIGdsb2JhbCAoc3RhdGljIGJ1aWxkcylcbiAgICByZXR1cm4gKHdpbmRvdyBhcyBhbnkpLl9fdGhyZWFkc19hdXRob3JzIHx8IHt9O1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cHNlcnRBdXRob3IoYXV0aG9yS2V5OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgYXZhdGFyVXJsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgZG9jbWQuY2FsbCgndGhyZWFkczp1cHNlcnQtYXV0aG9yJywgeyBhdXRob3JLZXksIG5hbWUsIGF2YXRhclVybCB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoVGhyZWFkcygpOiBQcm9taXNlPFRocmVhZFtdPiB7XG4gIHJldHVybiBkb2NtZC5jYWxsKCd0aHJlYWRzOmdldC10aHJlYWRzJywgeyBmaWxlOiBnZXRTb3VyY2VGaWxlKCkgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVUaHJlYWQocGF5bG9hZDoge1xuICBhbmNob3I6IGFueSB8IG51bGw7XG4gIGF1dGhvcjogc3RyaW5nO1xuICBib2R5OiBzdHJpbmc7XG4gIGF1dGhvcktleT86IHN0cmluZztcbiAgYXZhdGFyVXJsPzogc3RyaW5nO1xufSk6IFByb21pc2U8VGhyZWFkPiB7XG4gIHJldHVybiBkb2NtZC5jYWxsKCd0aHJlYWRzOmFkZC10aHJlYWQnLCB7XG4gICAgZmlsZTogZ2V0U291cmNlRmlsZSgpLFxuICAgIC4uLnBheWxvYWQsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkQ29tbWVudChcbiAgdGhyZWFkSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogeyBhdXRob3I6IHN0cmluZzsgYm9keTogc3RyaW5nOyBwYXJlbnRJZD86IHN0cmluZyB8IG51bGw7IGF1dGhvcktleT86IHN0cmluZzsgYXZhdGFyVXJsPzogc3RyaW5nIH0sXG4pOiBQcm9taXNlPENvbW1lbnQ+IHtcbiAgcmV0dXJuIGRvY21kLmNhbGwoJ3RocmVhZHM6YWRkLWNvbW1lbnQnLCB7XG4gICAgZmlsZTogZ2V0U291cmNlRmlsZSgpLFxuICAgIHRocmVhZElkLFxuICAgIC4uLnBheWxvYWQsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZWRpdENvbW1lbnQoXG4gIHRocmVhZElkOiBzdHJpbmcsXG4gIGNvbW1lbnRJZDogc3RyaW5nLFxuICBwYXlsb2FkOiB7IGJvZHk6IHN0cmluZyB9LFxuKTogUHJvbWlzZTxDb21tZW50PiB7XG4gIHJldHVybiBkb2NtZC5jYWxsKCd0aHJlYWRzOmVkaXQtY29tbWVudCcsIHtcbiAgICBmaWxlOiBnZXRTb3VyY2VGaWxlKCksXG4gICAgdGhyZWFkSWQsXG4gICAgY29tbWVudElkLFxuICAgIC4uLnBheWxvYWQsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQ29tbWVudChcbiAgdGhyZWFkSWQ6IHN0cmluZyxcbiAgY29tbWVudElkOiBzdHJpbmcsXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgZG9jbWQuY2FsbCgndGhyZWFkczpkZWxldGUtY29tbWVudCcsIHtcbiAgICBmaWxlOiBnZXRTb3VyY2VGaWxlKCksXG4gICAgdGhyZWFkSWQsXG4gICAgY29tbWVudElkLFxuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVRocmVhZCh0aHJlYWRJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGRvY21kLmNhbGwoJ3RocmVhZHM6ZGVsZXRlLXRocmVhZCcsIHtcbiAgICBmaWxlOiBnZXRTb3VyY2VGaWxlKCksXG4gICAgdGhyZWFkSWQsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZVRocmVhZChcbiAgdGhyZWFkSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogeyByZXNvbHZlZF9ieTogc3RyaW5nIH0sXG4pOiBQcm9taXNlPFRocmVhZD4ge1xuICByZXR1cm4gZG9jbWQuY2FsbCgndGhyZWFkczpyZXNvbHZlLXRocmVhZCcsIHtcbiAgICBmaWxlOiBnZXRTb3VyY2VGaWxlKCksXG4gICAgdGhyZWFkSWQsXG4gICAgLi4ucGF5bG9hZCxcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0b2dnbGVSZWFjdGlvbihcbiAgdGhyZWFkSWQ6IHN0cmluZyxcbiAgY29tbWVudElkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IHsgZW1vamk6IHN0cmluZzsgYXV0aG9yOiBzdHJpbmcgfSxcbik6IFByb21pc2U8UmVhY3Rpb25bXT4ge1xuICByZXR1cm4gZG9jbWQuY2FsbCgndGhyZWFkczp0b2dnbGUtcmVhY3Rpb24nLCB7XG4gICAgZmlsZTogZ2V0U291cmNlRmlsZSgpLFxuICAgIHRocmVhZElkLFxuICAgIGNvbW1lbnRJZCxcbiAgICAuLi5wYXlsb2FkLFxuICB9KTtcbn1cbiIsICJjb25zdCBTVE9SQUdFX0tFWV9OQU1FID0gJ3RocmVhZHNfYXV0aG9yJztcbmNvbnN0IFNUT1JBR0VfS0VZX0VNQUlMID0gJ3RocmVhZHNfZW1haWwnO1xuY29uc3QgU1RPUkFHRV9LRVlfR0lUSFVCID0gJ3RocmVhZHNfZ2l0aHViJztcbmNvbnN0IFNUT1JBR0VfS0VZX0FWQVRBUiA9ICd0aHJlYWRzX2F2YXRhcl91cmwnO1xuY29uc3QgU1RPUkFHRV9LRVlfQVVUSE9SX0tFWSA9ICd0aHJlYWRzX2F1dGhvcl9rZXknO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIF9fZG9jbWRfZGV2Pzoge1xuICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgZW1haWw6IHN0cmluZztcbiAgICAgIGdyYXZhdGFyVXJsOiBzdHJpbmc7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXV0aG9yKCk6IHN0cmluZyB8IG51bGwge1xuICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlfTkFNRSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdXRob3IobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZX05BTUUsIG5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW1haWwoKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWV9FTUFJTCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRFbWFpbChlbWFpbDogc3RyaW5nKTogdm9pZCB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZX0VNQUlMLCBlbWFpbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHaXRodWIoKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWV9HSVRIVUIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R2l0aHViKHVzZXJuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlfR0lUSFVCLCB1c2VybmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdmF0YXJVcmwoKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWV9BVkFUQVIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXZhdGFyVXJsKHVybDogc3RyaW5nKTogdm9pZCB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZX0FWQVRBUiwgdXJsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEF1dGhvcktleSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZX0FVVEhPUl9LRVkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXV0aG9yS2V5KGtleTogc3RyaW5nKTogdm9pZCB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZX0FVVEhPUl9LRVksIGtleSk7XG59XG5cbi8qKlxuICogQ29tcHV0ZSB0aGUgYXV0aG9yIGtleSBmcm9tIGF2YWlsYWJsZSBpZGVudGl0eSBpbmZvLlxuICogUHJpb3JpdHk6IEdpdEh1YiB1c2VybmFtZSA+IHNsdWdpZmllZCBuYW1lICsgc2hvcnQgaGFzaC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVBdXRob3JLZXkobmFtZTogc3RyaW5nLCBnaXRodWI6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChnaXRodWIpIHJldHVybiBnaXRodWIudG9Mb3dlckNhc2UoKTtcbiAgaWYgKG5hbWUpIHtcbiAgICBjb25zdCBzbHVnID0gbmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16MC05XSsvZywgJy0nKS5yZXBsYWNlKC9eLXwtJC9nLCAnJyk7XG4gICAgcmV0dXJuIHNsdWcgfHwgJ2Fub255bW91cyc7XG4gIH1cbiAgcmV0dXJuICdhbm9ueW1vdXMnO1xufVxuXG4vKipcbiAqIENvbXB1dGUgdGhlIGJlc3QgYXZhdGFyIFVSTCBnaXZlbiBhdmFpbGFibGUgaW5mby5cbiAqIFByaW9yaXR5OiBHcmF2YXRhciAoaWYgZW1haWwpID4gR2l0SHViID4gRGljZUJlYXIgc2VlZGVkIHJhbmRvbS5cbiAqXG4gKiBGb3IgR3JhdmF0YXIgd2UgdXNlIGQ9NDA0IHNvIHdlIGNhbiBkZXRlY3QgbWlzc2luZyBhdmF0YXJzIGFuZCBmYWxsIGJhY2suXG4gKiBUaGlzIGZ1bmN0aW9uIHRyaWVzIEdyYXZhdGFyIGZpcnN0OyBpZiBpdCA0MDRzLCBmYWxscyBiYWNrIHRvIEdpdEh1YiwgdGhlbiBEaWNlQmVhci5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbXB1dGVBdmF0YXJVcmwoZW1haWw6IHN0cmluZywgZ2l0aHViOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAvLyAxLiBUcnkgR3JhdmF0YXIgaWYgZW1haWwgaXMgcHJvdmlkZWRcbiAgaWYgKGVtYWlsKSB7XG4gICAgY29uc3QgZ3JhdmF0YXJVcmwgPSBhd2FpdCBnZXRHcmF2YXRhclVybChlbWFpbCk7XG4gICAgaWYgKGdyYXZhdGFyVXJsKSByZXR1cm4gZ3JhdmF0YXJVcmw7XG4gIH1cblxuICAvLyAyLiBUcnkgR2l0SHViIGF2YXRhclxuICBpZiAoZ2l0aHViKSB7XG4gICAgcmV0dXJuIGBodHRwczovL2dpdGh1Yi5jb20vJHtlbmNvZGVVUklDb21wb25lbnQoZ2l0aHViKX0ucG5nP3NpemU9ODBgO1xuICB9XG5cbiAgLy8gMy4gRGljZUJlYXIgc2VlZGVkIGF2YXRhclxuICBjb25zdCBzZWVkID0gZW1haWwgfHwgZ2l0aHViIHx8IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIpO1xuICByZXR1cm4gYGh0dHBzOi8vYXBpLmRpY2ViZWFyLmNvbS85LngvdGh1bWJzL3N2Zz9zZWVkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNlZWQpfSZzaXplPTgwYDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0R3JhdmF0YXJVcmwoZW1haWw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICB0cnkge1xuICAgIGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICBjb25zdCBkYXRhID0gZW5jb2Rlci5lbmNvZGUoZW1haWwudG9Mb3dlckNhc2UoKS50cmltKCkpO1xuICAgIGNvbnN0IGhhc2hCdWZmZXIgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdCgnU0hBLTI1NicsIGRhdGEpO1xuICAgIGNvbnN0IGhhc2hBcnJheSA9IEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoaGFzaEJ1ZmZlcikpO1xuICAgIGNvbnN0IGhhc2hIZXggPSBoYXNoQXJyYXkubWFwKGIgPT4gYi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSkuam9pbignJyk7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vZ3JhdmF0YXIuY29tL2F2YXRhci8ke2hhc2hIZXh9P3M9ODAmZD00MDRgO1xuXG4gICAgLy8gQ2hlY2sgaWYgR3JhdmF0YXIgYWN0dWFsbHkgaGFzIGFuIGltYWdlXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHVybCwgeyBtZXRob2Q6ICdIRUFEJywgbW9kZTogJ25vLWNvcnMnIH0pO1xuICAgIC8vIG5vLWNvcnMgbWVhbnMgd2UgY2FuJ3QgcmVhZCBzdGF0dXMsIHNvIGp1c3QgcmV0dXJuIHRoZSBkaXNwbGF5YWJsZSBVUkxcbiAgICAvLyBVc2UgZD1ibGFuayB0byBkZXRlY3QsIGJ1dCBmb3IgZGlzcGxheSB1c2UgZD00MDQgd29uJ3Qgd29yayB2aXN1YWxseS5cbiAgICAvLyBJbnN0ZWFkLCBqdXN0IHJldHVybiB3aXRoIGQ9bXAgZmFsbGJhY2sgYW5kIGxldCBpdCBzaG93IHRoZSBkZWZhdWx0LlxuICAgIHJldHVybiBgaHR0cHM6Ly9ncmF2YXRhci5jb20vYXZhdGFyLyR7aGFzaEhleH0/cz04MCZkPW1wYDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBPbiBmaXJzdCBsb2FkLCBzZWVkIGlkZW50aXR5IGZyb20gZ2l0IGNvbmZpZyBpZiBhdmFpbGFibGVcbiAqIGFuZCBub3RoaW5nIGlzIHN0b3JlZCB5ZXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0SWRlbnRpdHkoKTogdm9pZCB7XG4gIGNvbnN0IGRldkluZm8gPSB3aW5kb3cuX19kb2NtZF9kZXY7XG4gIGlmICghZGV2SW5mbykgcmV0dXJuO1xuXG4gIGlmICghZ2V0QXV0aG9yKCkgJiYgZGV2SW5mby5uYW1lKSB7XG4gICAgc2V0QXV0aG9yKGRldkluZm8ubmFtZSk7XG4gIH1cbiAgaWYgKCFnZXRFbWFpbCgpICYmIGRldkluZm8uZW1haWwpIHtcbiAgICBzZXRFbWFpbChkZXZJbmZvLmVtYWlsKTtcbiAgfVxuICBpZiAoIWdldEF2YXRhclVybCgpICYmIGRldkluZm8uZ3JhdmF0YXJVcmwpIHtcbiAgICBzZXRBdmF0YXJVcmwoZGV2SW5mby5ncmF2YXRhclVybCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUF1dGhvcigpOiBzdHJpbmcge1xuICBsZXQgYXV0aG9yID0gZ2V0QXV0aG9yKCk7XG4gIGlmICghYXV0aG9yKSB7XG4gICAgYXV0aG9yID0gcHJvbXB0KCdFbnRlciB5b3VyIGRpc3BsYXkgbmFtZSBmb3IgZGlzY3Vzc2lvbnM6Jyk7XG4gICAgaWYgKCFhdXRob3IgfHwgIWF1dGhvci50cmltKCkpIHtcbiAgICAgIGF1dGhvciA9ICdBbm9ueW1vdXMnO1xuICAgIH1cbiAgICBzZXRBdXRob3IoYXV0aG9yLnRyaW0oKSk7XG4gIH1cblxuICAvLyBFbnN1cmUgYXV0aG9yIGtleSBleGlzdHNcbiAgaWYgKCFnZXRBdXRob3JLZXkoKSkge1xuICAgIGNvbnN0IGdpdGh1YiA9IGdldEdpdGh1YigpIHx8ICcnO1xuICAgIHNldEF1dGhvcktleShjb21wdXRlQXV0aG9yS2V5KGF1dGhvciwgZ2l0aHViKSk7XG4gIH1cblxuICByZXR1cm4gYXV0aG9yO1xufVxuXG4vKipcbiAqIEdldCB0aGUgZnVsbCBpZGVudGl0eSBpbmZvIG5lZWRlZCBmb3IgY3JlYXRpbmcgY29tbWVudHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJZGVudGl0eVBheWxvYWQoKTogeyBhdXRob3I6IHN0cmluZzsgYXV0aG9yS2V5OiBzdHJpbmc7IGF2YXRhclVybDogc3RyaW5nIH0ge1xuICBjb25zdCBhdXRob3IgPSBlbnN1cmVBdXRob3IoKTtcbiAgY29uc3QgYXV0aG9yS2V5ID0gZ2V0QXV0aG9yS2V5KCkgfHwgY29tcHV0ZUF1dGhvcktleShhdXRob3IsIGdldEdpdGh1YigpIHx8ICcnKTtcbiAgY29uc3QgYXZhdGFyVXJsID0gZ2V0QXZhdGFyVXJsKCkgfHwgJyc7XG4gIHJldHVybiB7IGF1dGhvciwgYXV0aG9yS2V5LCBhdmF0YXJVcmwgfTtcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEFuY2hvciB9IGZyb20gJy4uLy4uL3R5cGVzLnRzJztcblxuY29uc3QgQ09OVEVYVF9DSEFSUyA9IDQwO1xuY29uc3QgQkxPQ0tfRUxFTUVOVFMgPSBuZXcgU2V0KFtcbiAgXCJQXCIsIFwiRElWXCIsIFwiTElcIiwgXCJURFwiLCBcIlRIXCIsIFwiQkxPQ0tRVU9URVwiLCBcIlBSRVwiLCBcIkgxXCIsIFwiSDJcIiwgXCJIM1wiLFxuICBcIkg0XCIsIFwiSDVcIiwgXCJINlwiLCBcIlNFQ1RJT05cIiwgXCJBUlRJQ0xFXCIsIFwiQVNJREVcIiwgXCJEVFwiLCBcIkREXCIsIFwiRklHQ0FQVElPTlwiLFxuXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZW50QXJlYSgpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAvLyBkb2NtZCBjb250ZW50IGFyZWEgc2VsZWN0b3JzICh0cnkgbXVsdGlwbGUpXG4gIHJldHVybiAoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCJbZGF0YS1kb2NtZC1jb250ZW50XVwiKSB8fFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLmRvY21kLWNvbnRlbnRcIikgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcImFydGljbGVcIikgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIm1haW5cIilcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzV2l0aGluQ29udGVudChub2RlOiBOb2RlKTogYm9vbGVhbiB7XG4gIGNvbnN0IGNvbnRlbnQgPSBnZXRDb250ZW50QXJlYSgpO1xuICByZXR1cm4gY29udGVudCA/IGNvbnRlbnQuY29udGFpbnMobm9kZSkgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0QmxvY2tBbmNlc3Rvcihub2RlOiBOb2RlKTogSFRNTEVsZW1lbnQge1xuICBsZXQgY3VycmVudDogTm9kZSB8IG51bGwgPSBub2RlO1xuICB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgaWYgKFxuICAgICAgY3VycmVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXG4gICAgICBCTE9DS19FTEVNRU5UUy5oYXMoY3VycmVudC50YWdOYW1lKVxuICAgICkge1xuICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU2VsZWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgY29udGVudCA9IGdldENvbnRlbnRBcmVhKCk7XG5cbiAgZm9yIChsZXQgY3VyID0gZWxlbWVudCBhcyBIVE1MRWxlbWVudCB8IG51bGw7IGN1ciAmJiBjdXIgIT09IGRvY3VtZW50LmJvZHkgJiYgY3VyICE9PSBjb250ZW50OyBjdXIgPSBjdXIucGFyZW50RWxlbWVudCkge1xuICAgIGNvbnN0IHRhZyA9IGN1ci50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgcGFyZW50ID0gY3VyLnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgY29uc3QgdGFnTmFtZSA9IGN1ci50YWdOYW1lO1xuICAgICAgY29uc3Qgc2libGluZ3MgPSBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuZmlsdGVyKFxuICAgICAgICAoc2libGluZykgPT4gc2libGluZy50YWdOYW1lID09PSB0YWdOYW1lLFxuICAgICAgKTtcbiAgICAgIGlmIChzaWJsaW5ncy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gc2libGluZ3MuaW5kZXhPZihjdXIpICsgMTtcbiAgICAgICAgcGFydHMudW5zaGlmdChgJHt0YWd9Om50aC1vZi10eXBlKCR7aW5kZXh9KWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydHMudW5zaGlmdCh0YWcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KHRhZyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oXCIgPiBcIik7XG59XG5cbmZ1bmN0aW9uIGdldFRleHRPZmZzZXQoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcmFuZ2U6IFJhbmdlKTogbnVtYmVyIHtcbiAgY29uc3QgdHJlZVdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG4gICAgY29udGFpbmVyLFxuICAgIE5vZGVGaWx0ZXIuU0hPV19URVhULFxuICApO1xuICBsZXQgb2Zmc2V0ID0gMDtcblxuICB3aGlsZSAodHJlZVdhbGtlci5uZXh0Tm9kZSgpKSB7XG4gICAgaWYgKHRyZWVXYWxrZXIuY3VycmVudE5vZGUgPT09IHJhbmdlLnN0YXJ0Q29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gb2Zmc2V0ICsgcmFuZ2Uuc3RhcnRPZmZzZXQ7XG4gICAgfVxuICAgIG9mZnNldCArPSAodHJlZVdhbGtlci5jdXJyZW50Tm9kZSBhcyBUZXh0KS5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0O1xufVxuXG5mdW5jdGlvbiBleHRyYWN0Q29udGV4dChcbiAgdGV4dDogc3RyaW5nLFxuICBzdGFydDogbnVtYmVyLFxuICBlbmQ6IG51bWJlcixcbik6IHsgcHJlZml4OiBzdHJpbmc7IHN1ZmZpeDogc3RyaW5nIH0ge1xuICBjb25zdCBwcmVmaXggPSB0ZXh0LnNsaWNlKE1hdGgubWF4KDAsIHN0YXJ0IC0gQ09OVEVYVF9DSEFSUyksIHN0YXJ0KTtcbiAgY29uc3Qgc3VmZml4ID0gdGV4dC5zbGljZShlbmQsIGVuZCArIENPTlRFWFRfQ0hBUlMpO1xuICByZXR1cm4geyBwcmVmaXgsIHN1ZmZpeCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUFuY2hvcihzZWxlY3Rpb246IFNlbGVjdGlvbik6IEFuY2hvciB8IG51bGwge1xuICBpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgPT09IDApIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gIGNvbnN0IHF1b3RlID0gc2VsZWN0aW9uLnRvU3RyaW5nKCkudHJpbSgpO1xuXG4gIGlmICghcXVvdGUgfHwgcXVvdGUubGVuZ3RoIDwgMykgcmV0dXJuIG51bGw7XG4gIGlmICghaXNXaXRoaW5Db250ZW50KHJhbmdlLnN0YXJ0Q29udGFpbmVyKSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgYmxvY2tFbCA9IGdldEJsb2NrQW5jZXN0b3IocmFuZ2Uuc3RhcnRDb250YWluZXIpO1xuICBjb25zdCBzZWxlY3RvciA9IGdlbmVyYXRlU2VsZWN0b3IoYmxvY2tFbCk7XG4gIGNvbnN0IGZ1bGxUZXh0ID0gYmxvY2tFbC50ZXh0Q29udGVudCB8fCBcIlwiO1xuICBjb25zdCBvZmZzZXQgPSBnZXRUZXh0T2Zmc2V0KGJsb2NrRWwsIHJhbmdlKTtcbiAgY29uc3QgeyBwcmVmaXgsIHN1ZmZpeCB9ID0gZXh0cmFjdENvbnRleHQoZnVsbFRleHQsIG9mZnNldCwgb2Zmc2V0ICsgcXVvdGUubGVuZ3RoKTtcblxuICByZXR1cm4ge1xuICAgIHF1b3RlLFxuICAgIHByZWZpeDogcHJlZml4IHx8IG51bGwsXG4gICAgc3VmZml4OiBzdWZmaXggfHwgbnVsbCxcbiAgICBzZWxlY3RvcixcbiAgICBvZmZzZXQsXG4gICAgYmxvY2tUZXh0OiBmdWxsVGV4dC50cmltKCkgfHwgbnVsbCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbGVjdGlvblBvc2l0aW9uKHNlbGVjdGlvbjogU2VsZWN0aW9uKTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgbnVsbCB7XG4gIGlmIChzZWxlY3Rpb24ucmFuZ2VDb3VudCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gIGNvbnN0IHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyByZWN0LndpZHRoIC8gMixcbiAgICB5OiByZWN0LnRvcCxcbiAgfTtcbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gaW5qZWN0Q29tcG9uZW50U3R5bGVzKCk6IHZvaWQge1xuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0Yy1zdHlsZXNcIikpIHJldHVybjtcblxuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgc3R5bGUuaWQgPSBcInRjLXN0eWxlc1wiO1xuICBzdHlsZS50ZXh0Q29udGVudCA9IGBcbiAgICAvKiA9PT09PT09PT0gRGVzaWduIHRva2VucyA9PT09PT09PT0gKi9cbiAgICA6cm9vdCB7XG4gICAgICAtLXRjLWJnOiB2YXIoLS1iZy1jb2xvciwgaHNsKDAgMCUgMTAwJSkpO1xuICAgICAgLS10Yy1mZzogdmFyKC0tdGV4dC1jb2xvciwgaHNsKDAgMCUgOSUpKTtcbiAgICAgIC0tdGMtbXV0ZWQ6IHZhcigtLXNpZGViYXItYmcsIGhzbCgwIDAlIDk2LjElKSk7XG4gICAgICAtLXRjLW11dGVkLWZnOiB2YXIoLS10ZXh0LW11dGVkLCBoc2woMCAwJSA0NS4xJSkpO1xuICAgICAgLS10Yy1ib3JkZXI6IHZhcigtLWJvcmRlci1jb2xvciwgaHNsKDAgMCUgODkuOCUpKTtcbiAgICAgIC0tdGMtaW5wdXQ6IHZhcigtLWJvcmRlci1jb2xvciwgaHNsKDAgMCUgODkuOCUpKTtcbiAgICAgIC0tdGMtcmluZzogdmFyKC0tdGV4dC1jb2xvciwgaHNsKDAgMCUgOSUpKTtcbiAgICAgIC0tdGMtYWNjZW50OiB2YXIoLS1zaWRlYmFyLWJnLCBoc2woMCAwJSA5Ni4xJSkpO1xuICAgICAgLS10Yy1hY2NlbnQtZmc6IHZhcigtLXRleHQtY29sb3IsIGhzbCgwIDAlIDklKSk7XG4gICAgICAtLXRjLWNhcmQ6IHZhcigtLWJnLWNvbG9yLCBoc2woMCAwJSAxMDAlKSk7XG4gICAgICAtLXRjLWNhcmQtZmc6IHZhcigtLXRleHQtY29sb3IsIGhzbCgwIDAlIDklKSk7XG4gICAgICAtLXRjLXJhZGl1czogNnB4O1xuICAgICAgLS10Yy1mb250OiB2YXIoLS1mb250LWZhbWlseS1zYW5zLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBzYW5zLXNlcmlmKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gSGlnaGxpZ2h0IGNvbG9ycyAoY3ljbGluZyBwYWxldHRlKSA9PT09PT09PT0gKi9cbiAgICAudGhyZWFkcy1oaWdobGlnaHQge1xuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgcGFkZGluZzogMXB4IDA7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzO1xuICAgIH1cbiAgICAudGhyZWFkcy1oaWdobGlnaHQ6aG92ZXIgeyBvcGFjaXR5OiAwLjc1OyB9XG5cbiAgICAudGhyZWFkcy1obC15ZWxsb3cgIHsgYmFja2dyb3VuZDogaHNsKDQ4IDk2JSA4OSUgLyAwLjYpOyAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGhzbCg0OCA5NiUgNTMlKTsgfVxuICAgIC50aHJlYWRzLWhsLWJsdWUgICAgeyBiYWNrZ3JvdW5kOiBoc2woMjEwIDEwMCUgODglIC8gMC41NSk7IGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBoc2woMjEwIDEwMCUgNTUlKTsgfVxuICAgIC50aHJlYWRzLWhsLWdyZWVuICAgeyBiYWNrZ3JvdW5kOiBoc2woMTQyIDYwJSA4MiUgLyAwLjU1KTsgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGhzbCgxNDIgNjAlIDQ1JSk7IH1cbiAgICAudGhyZWFkcy1obC1waW5rICAgIHsgYmFja2dyb3VuZDogaHNsKDM0MCA4MCUgODglIC8gMC41NSk7IGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBoc2woMzQwIDgwJSA1NSUpOyB9XG4gICAgLnRocmVhZHMtaGwtcHVycGxlICB7IGJhY2tncm91bmQ6IGhzbCgyNzAgNzAlIDg4JSAvIDAuNTUpOyBib3JkZXItYm90dG9tOiAycHggc29saWQgaHNsKDI3MCA3MCUgNTUlKTsgfVxuICAgIC50aHJlYWRzLWhsLW9yYW5nZSAgeyBiYWNrZ3JvdW5kOiBoc2woMjggMTAwJSA4NiUgLyAwLjU1KTsgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGhzbCgyOCAxMDAlIDU1JSk7IH1cblxuICAgIC8qIE1hdGNoaW5nIGxlZnQtYm9yZGVyIGNvbG9ycyBmb3IgdGhyZWFkIGNhcmRzICovXG4gICAgLnRocmVhZHMtYm9yZGVyLXllbGxvdyB7IGJvcmRlci1sZWZ0LWNvbG9yOiBoc2woNDggOTYlIDUzJSkgIWltcG9ydGFudDsgfVxuICAgIC50aHJlYWRzLWJvcmRlci1ibHVlICAgeyBib3JkZXItbGVmdC1jb2xvcjogaHNsKDIxMCAxMDAlIDU1JSkgIWltcG9ydGFudDsgfVxuICAgIC50aHJlYWRzLWJvcmRlci1ncmVlbiAgeyBib3JkZXItbGVmdC1jb2xvcjogaHNsKDE0MiA2MCUgNDUlKSAhaW1wb3J0YW50OyB9XG4gICAgLnRocmVhZHMtYm9yZGVyLXBpbmsgICB7IGJvcmRlci1sZWZ0LWNvbG9yOiBoc2woMzQwIDgwJSA1NSUpICFpbXBvcnRhbnQ7IH1cbiAgICAudGhyZWFkcy1ib3JkZXItcHVycGxlIHsgYm9yZGVyLWxlZnQtY29sb3I6IGhzbCgyNzAgNzAlIDU1JSkgIWltcG9ydGFudDsgfVxuICAgIC50aHJlYWRzLWJvcmRlci1vcmFuZ2UgeyBib3JkZXItbGVmdC1jb2xvcjogaHNsKDI4IDEwMCUgNTUlKSAhaW1wb3J0YW50OyB9XG5cbiAgICAvKiA9PT09PT09PT0gTGF5b3V0OiBmaXhlZCByaWdodCBzaWRlYmFyIGNvbHVtbiA9PT09PT09PT0gKi9cbiAgICAudGMtc2lkZWJhci1jb2x1bW4ge1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgdG9wOiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICBib3R0b206IDA7XG4gICAgICB3aWR0aDogNDBweDtcbiAgICAgIHotaW5kZXg6IDEwMDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgdHJhbnNpdGlvbjogd2lkdGggMC4ycyBlYXNlO1xuICAgICAgZm9udC1mYW1pbHk6IHZhcigtLXRjLWZvbnQpO1xuICAgIH1cblxuICAgIGJvZHkudGMtcGFuZWwtb3BlbiAudGMtc2lkZWJhci1jb2x1bW4ge1xuICAgICAgd2lkdGg6IDM4MHB4O1xuICAgIH1cblxuICAgIGJvZHkudGMtaGFzLXNpZGViYXIgbWFpbiB7XG4gICAgICBtYXgtd2lkdGg6IDE0NDBweDtcbiAgICB9XG5cbiAgICBib2R5LnRjLWhhcy1zaWRlYmFyIC5tYWluLWNvbnRlbnQtd3JhcHBlciB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDQwcHg7XG4gICAgICB0cmFuc2l0aW9uOiBtYXJnaW4tcmlnaHQgMC4ycyBlYXNlO1xuICAgIH1cbiAgICBib2R5LnRjLXBhbmVsLW9wZW4gLm1haW4tY29udGVudC13cmFwcGVyIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMzgwcHg7XG4gICAgfVxuXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDE0MDBweCkge1xuICAgICAgYm9keS50Yy1wYW5lbC1vcGVuIC50b2Mtc2lkZWJhciB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IFRvZ2dsZSBzdHJpcCA9PT09PT09PT0gKi9cbiAgICAudGMtc2lkZWJhci10b2dnbGUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICB3aWR0aDogNDBweDtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLWJnKTtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZyk7XG4gICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cywgYmFja2dyb3VuZCAwLjE1cztcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHBhZGRpbmc6IDE2cHggMCAwIDA7XG4gICAgfVxuICAgIC50Yy1zaWRlYmFyLXRvZ2dsZTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1hY2NlbnQpO1xuICAgICAgY29sb3I6IHZhcigtLXRjLWZnKTtcbiAgICB9XG5cbiAgICBib2R5LnRjLXBhbmVsLW9wZW4gLnRjLXNpZGViYXItdG9nZ2xlIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IFBhbmVsID09PT09PT09PSAqL1xuICAgIC50Yy1wYW5lbCB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgd2lkdGg6IDM4MHB4O1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYmcpO1xuICAgICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBhbmltYXRpb246IHRjLXNsaWRlLWluIDAuMnMgZWFzZTtcbiAgICB9XG4gICAgQGtleWZyYW1lcyB0Yy1zbGlkZS1pbiB7XG4gICAgICBmcm9tIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpOyBvcGFjaXR5OiAwOyB9XG4gICAgICB0byB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgb3BhY2l0eTogMTsgfVxuICAgIH1cbiAgICAudGMtcGFuZWxfX2hlYWRlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIHBhZGRpbmc6IDE2cHggMTZweCAxMnB4O1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgfVxuICAgIC50Yy1wYW5lbF9fdGl0bGUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IC0wLjAxZW07XG4gICAgfVxuICAgIC50Yy1wYW5lbF9faGVhZGVyLWFjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDJweDtcbiAgICB9XG4gICAgLnRjLXBhbmVsX19maWx0ZXJzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDRweDtcbiAgICAgIHBhZGRpbmc6IDEwcHggMTZweDtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgIH1cbiAgICAudGMtcGFuZWxfX2JvZHkge1xuICAgICAgZmxleDogMTtcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICBwYWRkaW5nOiA4cHggMDtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gRW1wdHkgc3RhdGUgPT09PT09PT09ICovXG4gICAgLnRjLWVtcHR5IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgY29sb3I6IHZhcigtLXRjLW11dGVkLWZnKTtcbiAgICAgIHBhZGRpbmc6IDQ4cHggMjRweDtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IFRocmVhZCAoc2hhZGNuIGNhcmQpID09PT09PT09PSAqL1xuICAgIC50Yy10aHJlYWQge1xuICAgICAgbWFyZ2luOiAwIDhweCA2cHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGMtcmFkaXVzKTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1jYXJkKTtcbiAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMC4xNXM7XG4gICAgfVxuICAgIC50Yy10aHJlYWQ6aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogMCAxcHggM3B4IDAgcmdiKDAgMCAwIC8gMC4xKSwgMCAxcHggMnB4IC0xcHggcmdiKDAgMCAwIC8gMC4xKTtcbiAgICB9XG4gICAgLnRjLXRocmVhZC0tZm9jdXNlZCB7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLXRjLXJpbmcpO1xuICAgICAgYm94LXNoYWRvdzogMCAwIDAgMXB4IHZhcigtLXRjLXJpbmcpO1xuICAgIH1cbiAgICAudGMtdGhyZWFkLS1yZXNvbHZlZCB7IG9wYWNpdHk6IDAuNjsgfVxuICAgIC50Yy10aHJlYWRfX3F1b3RlIHtcbiAgICAgIHBhZGRpbmc6IDEwcHggMTRweDtcbiAgICAgIGJvcmRlci1sZWZ0OiAycHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIG1hcmdpbjogMTBweCAxNHB4IDA7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtbXV0ZWQpO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cztcbiAgICB9XG4gICAgLnRjLXRocmVhZF9fcXVvdGU6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogY29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLXRjLW11dGVkKSA4MCUsIHZhcigtLXRjLWZnKSAyMCUpO1xuICAgIH1cbiAgICAudGMtdGhyZWFkX19xdW90ZS10ZXh0IHtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZyk7XG4gICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIH1cbiAgICAudGMtdGhyZWFkX19jb21tZW50cyB7XG4gICAgICBwYWRkaW5nOiAycHggMDtcbiAgICB9XG4gICAgLnRjLXRocmVhZF9fcmVwbHkge1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgfVxuICAgIC50Yy10aHJlYWRfX2Zvb3RlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZ2FwOiAycHg7XG4gICAgICBwYWRkaW5nOiA2cHggMTBweCA4cHg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gQ29tbWVudCA9PT09PT09PT0gKi9cbiAgICAudGMtY29tbWVudCB7XG4gICAgICBwYWRkaW5nOiAxMHB4IDE0cHg7XG4gICAgfVxuICAgIC50Yy1jb21tZW50ICsgLnRjLWNvbW1lbnQge1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgfVxuICAgIC50Yy1jb21tZW50X19oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICB9XG4gICAgLnRjLWNvbW1lbnRfX21ldGEge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBmbGV4OiAxO1xuICAgICAgbWluLXdpZHRoOiAwO1xuICAgIH1cbiAgICAudGMtY29tbWVudF9fYXV0aG9yIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgICB9XG4gICAgLnRjLWNvbW1lbnRfX3RpbWUge1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgY29sb3I6IHZhcigtLXRjLW11dGVkLWZnKTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgfVxuICAgIC50Yy1jb21tZW50X19tZW51IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDFweDtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzO1xuICAgIH1cbiAgICAudGMtY29tbWVudDpob3ZlciAudGMtY29tbWVudF9fbWVudSB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbiAgICAudGMtY29tbWVudF9fYm9keSB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBsaW5lLWhlaWdodDogMS42O1xuICAgICAgY29sb3I6IHZhcigtLXRjLWZnKTtcbiAgICAgIG1hcmdpbi1sZWZ0OiAzNHB4O1xuICAgIH1cbiAgICAudGMtY29tbWVudF9fYm9keSBwIHsgbWFyZ2luOiAwIDAgNHB4IDA7IH1cbiAgICAudGMtY29tbWVudF9fYm9keSBwOmxhc3QtY2hpbGQgeyBtYXJnaW4tYm90dG9tOiAwOyB9XG4gICAgLnRjLWNvbW1lbnRfX2JvZHkgY29kZSB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1tdXRlZCk7XG4gICAgICBwYWRkaW5nOiAycHggNHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cbiAgICAudGMtY29tbWVudF9fYm9keSBwcmUge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtbXV0ZWQpO1xuICAgICAgcGFkZGluZzogOHB4IDEycHg7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS10Yy1yYWRpdXMpO1xuICAgICAgb3ZlcmZsb3cteDogYXV0bztcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB9XG4gICAgLnRjLWNvbW1lbnRfX2Zvb3RlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNnB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IDM0cHg7XG4gICAgICBtYXJnaW4tdG9wOiA0cHg7XG4gICAgfVxuICAgIC50Yy1jb21tZW50X19hY3Rpb25zIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDFweDtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gUmVhY3Rpb25zID09PT09PT09PSAqL1xuICAgIC50Yy1yZWFjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGdhcDogNHB4O1xuICAgIH1cbiAgICAudGMtcmVhY3Rpb24ge1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBwYWRkaW5nOiAycHggOHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYmcpO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjE1cztcbiAgICB9XG4gICAgLnRjLXJlYWN0aW9uOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLWFjY2VudCk7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLXRjLWlucHV0KTtcbiAgICB9XG4gICAgLnRjLXJlYWN0aW9uLS1hY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYWNjZW50KTtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgIH1cbiAgICAudGMtcmVhY3Rpb25fX2NvdW50IHtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBFbW9qaSBwaWNrZXIgaXRlbSAodXNlZCBpbnNpZGUgd2EtcG9wb3ZlcikgPT09PT09PT09ICovXG4gICAgLnRjLWVtb2ppLXBpY2tlcl9faXRlbSB7XG4gICAgICB3aWR0aDogMzBweDtcbiAgICAgIGhlaWdodDogMzBweDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMXM7XG4gICAgfVxuICAgIC50Yy1lbW9qaS1waWNrZXJfX2l0ZW06aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYWNjZW50KTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gQ29tcG9zZSA9PT09PT09PT0gKi9cbiAgICAudGMtY29tcG9zZSB7XG4gICAgICBwYWRkaW5nOiAxMHB4IDE0cHg7XG4gICAgfVxuICAgIC50Yy1jb21wb3NlX19xdW90ZSB7XG4gICAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICAgIGJvcmRlci1sZWZ0OiAycHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLW11dGVkKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICB9XG4gICAgLnRjLWNvbXBvc2VfX2FjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgbWFyZ2luLXRvcDogOHB4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gTmV3IHRocmVhZCBjb21wb3NlID09PT09PT09PSAqL1xuICAgIC50Yy1uZXctdGhyZWFkIHtcbiAgICAgIG1hcmdpbjogMCA4cHggNnB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtY2FyZCk7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IFNlcnZlci1yZW5kZXJlZCB0aHJlYWRzIHdyYXBwZXIgPT09PT09PT09ICovXG4gICAgLnRocmVhZHMtc2lkZWJhciB7XG4gICAgICBtYXJnaW46IDI0cHggMCA4cHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogMTJweDtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gU2VydmVyLXJlbmRlcmVkIHRocmVhZCBjYXJkID09PT09PT09PSAqL1xuICAgIC50aHJlYWRzLXRocmVhZCB7XG4gICAgICBtYXJnaW46IDEycHggMDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHZhcigtLXRjLXJpbmcpO1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGMtcmFkaXVzKTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLWNhcmQpO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIGZvbnQtZmFtaWx5OiB2YXIoLS10Yy1mb250KTtcbiAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMC4xNXM7XG4gICAgfVxuICAgIC50aHJlYWRzLXRocmVhZDpob3ZlciB7XG4gICAgICBib3gtc2hhZG93OiAwIDFweCAzcHggMCByZ2IoMCAwIDAgLyAwLjA4KSwgMCAxcHggMnB4IC0xcHggcmdiKDAgMCAwIC8gMC4wOCk7XG4gICAgfVxuICAgIC50aHJlYWRzLXRocmVhZC0tcmVzb2x2ZWQge1xuICAgICAgb3BhY2l0eTogMC41NTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gU2VydmVyLXJlbmRlcmVkIGNvbW1lbnQgPT09PT09PT09ICovXG4gICAgLnRocmVhZHMtY29tbWVudCB7XG4gICAgICBwYWRkaW5nOiAxMHB4IDE0cHg7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuICAgIC50aHJlYWRzLWNvbW1lbnQgKyAudGhyZWFkcy1jb21tZW50IHtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgIH1cblxuICAgIC8qIEF2YXRhciAoaW5qZWN0ZWQgZHluYW1pY2FsbHkpICovXG4gICAgLnRocmVhZHMtY29tbWVudF9fYXZhdGFyIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLnRocmVhZHMtY29tbWVudF9fbWV0YSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZyk7XG4gICAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gICAgfVxuICAgIC50aHJlYWRzLWNvbW1lbnRfX21ldGEgc3Ryb25nIHtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1mZyk7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cblxuICAgIC50aHJlYWRzLWNvbW1lbnRfX2FjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDJweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfVxuXG4gICAgLnRocmVhZHMtY29tbWVudF9fYm9keSB7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNjtcbiAgICB9XG4gICAgLnRocmVhZHMtY29tbWVudF9fYm9keSA+IDpmaXJzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgIH1cbiAgICAudGhyZWFkcy1jb21tZW50X19ib2R5ID4gOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gQ29sbGFwc2VkIHRocmVhZCA9PT09PT09PT0gKi9cbiAgICAudGhyZWFkcy10aHJlYWRfX3N1bW1hcnkge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZyk7XG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgbWluLXdpZHRoOiAwO1xuICAgIH1cbiAgICAudGhyZWFkcy10aHJlYWQtLWNvbGxhcHNlZCAudGhyZWFkcy10aHJlYWRfX3N1bW1hcnkge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICAgIC50aHJlYWRzLXRocmVhZC0tY29sbGFwc2VkIC50aHJlYWRzLWNvbW1lbnQsXG4gICAgLnRocmVhZHMtdGhyZWFkLS1jb2xsYXBzZWQgLnRocmVhZHMtcmVwbGllcyB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgICAudGhyZWFkcy10aHJlYWQtLWNvbGxhcHNlZCAudGhyZWFkcy1uZXctY29tbWVudC1idG4ge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgLnRocmVhZHMtdGhyZWFkLS1jb2xsYXBzZWQgLnRocmVhZHMtdGhyZWFkX19mb290ZXIge1xuICAgICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gVGhyZWFkIGZvb3RlciAmIGJ1dHRvbnMgPT09PT09PT09ICovXG4gICAgLnRocmVhZHMtdGhyZWFkX19mb290ZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiA2cHggMTRweCA4cHg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICB9XG4gICAgLnRocmVhZHMtbmV3LWNvbW1lbnQtYnRuIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNXB4O1xuICAgICAgcGFkZGluZzogNHB4IDEwcHg7XG4gICAgICBib3JkZXI6IDFweCBkYXNoZWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgY29sb3I6IHZhcigtLXRjLW11dGVkLWZnKTtcbiAgICAgIGZvbnQtZmFtaWx5OiB2YXIoLS10Yy1mb250KTtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS10Yy1yYWRpdXMpO1xuICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMsIGJhY2tncm91bmQgMC4xNXMsIGJvcmRlci1jb2xvciAwLjE1cztcbiAgICB9XG4gICAgLnRocmVhZHMtbmV3LWNvbW1lbnQtYnRuOmhvdmVyIHtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1mZyk7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLXRjLWZnKTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLW11dGVkKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gTmVzdGVkIHJlcGxpZXMgPT09PT09PT09ICovXG4gICAgLnRocmVhZHMtcmVwbGllcyB7XG4gICAgICBtYXJnaW4tbGVmdDogOHB4O1xuICAgICAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgIH1cbiAgICAudGhyZWFkcy1jb21tZW50LS1yZXBseSB7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDEycHggIWltcG9ydGFudDtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDAgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gUGVyLWNvbW1lbnQgcmVwbHkgYnV0dG9uID09PT09PT09PSAqL1xuICAgIC50aHJlYWRzLWNvbW1lbnQtcmVwbHktYnRuIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNHB4O1xuICAgICAgcGFkZGluZzogM3B4IDhweDtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgY29sb3I6IHZhcigtLXRjLW11dGVkLWZnKTtcbiAgICAgIGZvbnQtZmFtaWx5OiB2YXIoLS10Yy1mb250KTtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cywgY29sb3IgMC4xNXMsIGJhY2tncm91bmQgMC4xNXM7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS10Yy1yYWRpdXMpO1xuICAgIH1cbiAgICAudGhyZWFkcy1jb21tZW50OmhvdmVyIC50aHJlYWRzLWNvbW1lbnQtcmVwbHktYnRuIHtcbiAgICAgIG9wYWNpdHk6IDAuNjtcbiAgICB9XG4gICAgLnRocmVhZHMtY29tbWVudC1yZXBseS1idG46aG92ZXIge1xuICAgICAgb3BhY2l0eTogMSAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6IHZhcigtLXRjLWZnKTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLW11dGVkKTtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gU2VydmVyLXJlbmRlcmVkIHJlYWN0aW9ucyA9PT09PT09PT0gKi9cbiAgICAudGhyZWFkcy1yZWFjdGlvbnMge1xuICAgICAgbWFyZ2luLXRvcDogOHB4O1xuICAgIH1cbiAgICAudGhyZWFkcy1yZWFjdGlvbnMgdWwge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGdhcDogNnB4O1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgfVxuICAgIC50aHJlYWRzLXJlYWN0aW9ucyBsaSB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDRweDtcbiAgICAgIHBhZGRpbmc6IDRweCAxMHB4IDRweCA4cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1tdXRlZCk7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xNXMsIGJvcmRlci1jb2xvciAwLjE1cztcbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIH1cbiAgICAudGhyZWFkcy1yZWFjdGlvbnMgbGk6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtYWNjZW50KTtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGMtaW5wdXQpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBIZWFkaW5nIGRpc2N1c3Npb24gYnV0dG9uIChoaWRkZW4pID09PT09PT09PSAqL1xuICAgIC50aHJlYWRzLWhlYWRpbmctZGlzY3VzcyB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuICAgIC50aHJlYWRzLWhlYWRpbmctZGlzY3Vzcy1PRkYge1xuICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBwYWRkaW5nOiAycHggOHB4O1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBjb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGMtcmFkaXVzKTtcbiAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzO1xuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB9XG4gICAgKjpob3ZlciA+IC50aHJlYWRzLWhlYWRpbmctZGlzY3VzcyB7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgIH1cbiAgICAudGhyZWFkcy1oZWFkaW5nLWRpc2N1c3M6aG92ZXIge1xuICAgICAgY29sb3I6IHZhcigtLXRjLWFjY2VudC1mZyk7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1hY2NlbnQpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBIZWFkaW5nIHdyYXBwZXIgZm9yIE5ldyBUaHJlYWQgYnV0dG9uID09PT09PT09PSAqL1xuICAgIC50aHJlYWRzLWhlYWRpbmctd3JhcCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGZsZXgtd3JhcDogbm93cmFwO1xuICAgIH1cbiAgICAudGhyZWFkcy1oZWFkaW5nLXdyYXAgLnRocmVhZHMtbmV3LXRocmVhZC1idG4ge1xuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgICBmbGV4LXNocmluazogMDtcbiAgICB9XG5cbiAgICAvKiA9PT09PT09PT0gTmV3IFRocmVhZCBidXR0b24gPT09PT09PT09ICovXG4gICAgLnRocmVhZHMtbmV3LXRocmVhZC1idG4ge1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBwYWRkaW5nOiAzcHggMTBweDtcbiAgICAgIGZvbnQtZmFtaWx5OiB2YXIoLS10Yy1mb250KTtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXI6IDFweCBkYXNoZWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cywgYm9yZGVyLWNvbG9yIDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzO1xuICAgIH1cbiAgICAudGhyZWFkcy1uZXctdGhyZWFkLWJ0bjpob3ZlciB7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Yy1mZyk7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1tdXRlZCk7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IERlbGV0ZSBidXR0b24gKG9uIGNvbW1lbnQgbWV0YSkgPT09PT09PT09ICovXG4gICAgLnRocmVhZHMtZGVsZXRlLWJ0biB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwYWRkaW5nOiAzcHggNnB4O1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4xNXMsIGNvbG9yIDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzO1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGMtcmFkaXVzKTtcbiAgICB9XG4gICAgLnRocmVhZHMtY29tbWVudDpob3ZlciAudGhyZWFkcy1kZWxldGUtYnRuIHtcbiAgICAgIG9wYWNpdHk6IDAuNjtcbiAgICB9XG4gICAgLnRocmVhZHMtZGVsZXRlLWJ0bjpob3ZlciB7XG4gICAgICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XG4gICAgICBjb2xvcjogaHNsKDAgNzIlIDUxJSk7XG4gICAgICBiYWNrZ3JvdW5kOiBoc2woMCA3MiUgNTElIC8gMC4wOCk7XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IENvbGxhcHNlL2V4cGFuZCB0b2dnbGUgYnV0dG9uID09PT09PT09PSAqL1xuICAgIC50aHJlYWRzLWNvbGxhcHNlLWJ0biB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgIHBhZGRpbmc6IDNweCA2cHg7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZyk7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS10Yy1yYWRpdXMpO1xuICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMsIGJhY2tncm91bmQgMC4xNXM7XG4gICAgfVxuICAgIC50aHJlYWRzLWNvbGxhcHNlLWJ0bjpob3ZlciB7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtbXV0ZWQpO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBUaHJlYWQgZmxhc2ggYW5pbWF0aW9uIChvbiBoaWdobGlnaHQgY2xpY2spID09PT09PT09PSAqL1xuICAgIC50aHJlYWRzLXRocmVhZC0tZmxhc2gge1xuICAgICAgYW5pbWF0aW9uOiB0Yy1mbGFzaCAycyBlYXNlLW91dDtcbiAgICB9XG4gICAgQGtleWZyYW1lcyB0Yy1mbGFzaCB7XG4gICAgICAwJSAgIHsgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRjLXJpbmcpOyBvdXRsaW5lLW9mZnNldDogNHB4OyB9XG4gICAgICAxMDAlIHsgb3V0bGluZTogMnB4IHNvbGlkIHRyYW5zcGFyZW50OyBvdXRsaW5lLW9mZnNldDogOHB4OyB9XG4gICAgfVxuXG4gICAgLyogPT09PT09PT09IElkZW50aXR5IGJ1dHRvbiAmIGRyb3Bkb3duID09PT09PT09PSAqL1xuICAgIHRocmVhZHMtaWRlbnRpdHkge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBmb250LWZhbWlseTogdmFyKC0tdGMtZm9udCk7XG4gICAgfVxuICAgIC50aHJlYWRzLWlkZW50aXR5LWJ0biB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgd2lkdGg6IDMycHg7XG4gICAgICBoZWlnaHQ6IDMycHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtY2FyZCk7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cywgYm94LXNoYWRvdyAwLjE1cztcbiAgICB9XG4gICAgLnRocmVhZHMtaWRlbnRpdHktYnRuOmhvdmVyIHtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGMtcmluZyk7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAycHggY29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLXRjLXJpbmcpIDIwJSwgdHJhbnNwYXJlbnQpO1xuICAgIH1cbiAgICAudGhyZWFkcy1pZGVudGl0eS1hdmF0YXIge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICB9XG4gICAgLnRocmVhZHMtaWRlbnRpdHktaW5pdGlhbCB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLXRjLWZnKTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxO1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBEcm9wZG93biBwYW5lbCA9PT09PT09PT0gKi9cbiAgICAudGhyZWFkcy1pZGVudGl0eS1wYW5lbCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IGNhbGMoMTAwJSArIDhweCk7XG4gICAgICByaWdodDogMDtcbiAgICAgIHdpZHRoOiAyNjBweDtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRjLWNhcmQpO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxNnB4IHJnYigwIDAgMCAvIDAuMTIpLCAwIDFweCAzcHggcmdiKDAgMCAwIC8gMC4wOCk7XG4gICAgICBwYWRkaW5nOiAxNHB4O1xuICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgZ2FwOiAxMHB4O1xuICAgICAgYW5pbWF0aW9uOiB0Yy1wYW5lbC1kcm9wIDAuMTVzIGVhc2U7XG4gICAgfVxuICAgIEBrZXlmcmFtZXMgdGMtcGFuZWwtZHJvcCB7XG4gICAgICBmcm9tIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02cHgpOyB9XG4gICAgICB0byB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfVxuICAgIH1cbiAgICAudGhyZWFkcy1pZGVudGl0eS1wcmV2aWV3IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICB9XG4gICAgLnRocmVhZHMtaWRlbnRpdHktcHJldmlldy1pbWcge1xuICAgICAgd2lkdGg6IDY0cHg7XG4gICAgICBoZWlnaHQ6IDY0cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLXRjLWJvcmRlcik7XG4gICAgfVxuICAgIC50aHJlYWRzLWlkZW50aXR5LXByZXZpZXctcGxhY2Vob2xkZXIge1xuICAgICAgd2lkdGg6IDY0cHg7XG4gICAgICBoZWlnaHQ6IDY0cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS10Yy1ib3JkZXIpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtbXV0ZWQpO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgIH1cbiAgICAudGhyZWFkcy1pZGVudGl0eS1sYWJlbCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogNHB4O1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1mZyk7XG4gICAgfVxuICAgIC50aHJlYWRzLWlkZW50aXR5LWlucHV0IHtcbiAgICAgIHBhZGRpbmc6IDZweCAxMHB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1iZyk7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtZmcpO1xuICAgICAgZm9udC1mYW1pbHk6IHZhcigtLXRjLWZvbnQpO1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cztcbiAgICB9XG4gICAgLnRocmVhZHMtaWRlbnRpdHktaW5wdXQ6Zm9jdXMge1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Yy1yaW5nKTtcbiAgICB9XG4gICAgLnRocmVhZHMtaWRlbnRpdHktaGludCB7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGMtbXV0ZWQtZmcpO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICB9XG4gICAgLnRocmVhZHMtaWRlbnRpdHktaGludCBhIHtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZyk7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICB9XG4gICAgLnRocmVhZHMtaWRlbnRpdHktYWN0aW9ucyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgIGdhcDogNnB4O1xuICAgICAgbWFyZ2luLXRvcDogMnB4O1xuICAgIH1cbiAgICAudGhyZWFkcy1pZGVudGl0eS1jYW5jZWwsXG4gICAgLnRocmVhZHMtaWRlbnRpdHktc2F2ZSB7XG4gICAgICBwYWRkaW5nOiA0cHggMTJweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cyk7XG4gICAgICBmb250LWZhbWlseTogdmFyKC0tdGMtZm9udCk7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cywgY29sb3IgMC4xNXMsIGJvcmRlci1jb2xvciAwLjE1cztcbiAgICB9XG4gICAgLnRocmVhZHMtaWRlbnRpdHktY2FuY2VsIHtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyKTtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZyk7XG4gICAgfVxuICAgIC50aHJlYWRzLWlkZW50aXR5LWNhbmNlbDpob3ZlciB7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLXRjLWZnKTtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1mZyk7XG4gICAgfVxuICAgIC50aHJlYWRzLWlkZW50aXR5LXNhdmUge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGMtZmcpO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGMtZmcpO1xuICAgICAgY29sb3I6IHZhcigtLXRjLWJnKTtcbiAgICB9XG4gICAgLnRocmVhZHMtaWRlbnRpdHktc2F2ZTpob3ZlciB7XG4gICAgICBvcGFjaXR5OiAwLjg1O1xuICAgIH1cblxuICAgIC8qID09PT09PT09PSBIaWRlIHNpZGViYXIgKGRpc2FibGVkIGZvciBub3cpID09PT09PT09PSAqL1xuICAgIC50Yy1zaWRlYmFyLWNvbHVtbiB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuICAgIC50Yy1oYXMtc2lkZWJhciB7IHBhZGRpbmctcmlnaHQ6IDAgIWltcG9ydGFudDsgfVxuICBgO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbiIsICJpbXBvcnQgeyBpbmplY3RDb21wb25lbnRTdHlsZXMgfSBmcm9tICcuLi9jb21wb25lbnRzL3N0eWxlcy50cyc7XG5cbmNvbnN0IFRIRU1FX1NUWUxFX0lEID0gJ3RocmVhZHMtdGhlbWUtYnJpZGdlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUaGVtZUJyaWRnZSgpOiB2b2lkIHtcbiAgaW5qZWN0VGhlbWVDU1MoKTtcbiAgc3luY0RhcmtNb2RlKCk7XG4gIG9ic2VydmVUaGVtZUNoYW5nZXMoKTtcbiAgaW5qZWN0Q29tcG9uZW50U3R5bGVzKCk7XG59XG5cbmZ1bmN0aW9uIGluamVjdFRoZW1lQ1NTKCk6IHZvaWQge1xuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoVEhFTUVfU1RZTEVfSUQpKSByZXR1cm47XG5cbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZS5pZCA9IFRIRU1FX1NUWUxFX0lEO1xuICBzdHlsZS50ZXh0Q29udGVudCA9IGBcbiAgICA6cm9vdCB7XG4gICAgICAtLXdhLWNvbG9yLXN1cmZhY2UtZGVmYXVsdDogdmFyKC0tdGMtYmcsIGhzbCgwIDAlIDEwMCUpKTtcbiAgICAgIC0td2EtY29sb3Itc3VyZmFjZS1yYWlzZWQ6IHZhcigtLXRjLW11dGVkLCBoc2woMCAwJSA5Ni4xJSkpO1xuICAgICAgLS13YS1jb2xvci1zdXJmYWNlLWJvcmRlcjogdmFyKC0tdGMtYm9yZGVyLCBoc2woMCAwJSA4OS44JSkpO1xuICAgICAgLS13YS1jb2xvci10ZXh0LW5vcm1hbDogdmFyKC0tdGMtZmcsIGhzbCgwIDAlIDklKSk7XG4gICAgICAtLXdhLWNvbG9yLXRleHQtcXVpZXQ6IHZhcigtLXRjLW11dGVkLWZnLCBoc2woMCAwJSA0NS4xJSkpO1xuICAgICAgLS13YS1jb2xvci10ZXh0LWxpbms6IHZhcigtLXRjLWZnLCBoc2woMCAwJSA5JSkpO1xuICAgICAgLS13YS1jb2xvci1icmFuZC1maWxsLWxvdWQ6IHZhcigtLXRjLWZnLCBoc2woMCAwJSA5JSkpO1xuICAgICAgLS13YS1jb2xvci1icmFuZC1vbi1sb3VkOiBoc2woMCAwJSA5OCUpO1xuICAgICAgLS13YS1jb2xvci1mb2N1czogdmFyKC0tdGMtcmluZywgaHNsKDAgMCUgOSUpKTtcbiAgICAgIC0td2EtZm9udC1zYW5zOiB2YXIoLS10Yy1mb250LCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBzYW5zLXNlcmlmKTtcbiAgICAgIC0td2EtZm9udC1tb25vOiB2YXIoLS1mb250LWZhbWlseS1tb25vLCBTRk1vbm8tUmVndWxhciwgQ29uc29sYXMsIE1lbmxvLCBtb25vc3BhY2UpO1xuICAgIH1cblxuICAgIC50aHJlYWRzLWhpZ2hsaWdodCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woNDggOTYlIDg5JSAvIDAuNSk7XG4gICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgaHNsKDQ4IDk2JSA1MyUgLyAwLjYpO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjE1cztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgICB9XG4gICAgLnRocmVhZHMtaGlnaGxpZ2h0OmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGhzbCg0OCA5NiUgODklIC8gMC44KTtcbiAgICB9XG4gICAgLnRocmVhZHMtaGlnaGxpZ2h0LS1yZXNvbHZlZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMTQyIDc2JSAzNiUgLyAwLjEpO1xuICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogaHNsKDE0MiA3NiUgMzYlIC8gMC4zKTtcbiAgICB9XG4gICAgLnRocmVhZHMtaGlnaGxpZ2h0LS1yZXNvbHZlZDpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2woMTQyIDc2JSAzNiUgLyAwLjIpO1xuICAgIH1cbiAgICAudGhyZWFkcy1oaWdobGlnaHQtLWZsYXNoIHtcbiAgICAgIGFuaW1hdGlvbjogdGhyZWFkcy1mbGFzaCAwLjhzIGVhc2Utb3V0O1xuICAgIH1cbiAgICBAa2V5ZnJhbWVzIHRocmVhZHMtZmxhc2gge1xuICAgICAgMCUsIDQwJSB7IGJhY2tncm91bmQtY29sb3I6IGhzbCg0OCA5NiUgNTMlIC8gMC41KTsgfVxuICAgICAgMTAwJSB7IGJhY2tncm91bmQtY29sb3I6IGhzbCg0OCA5NiUgODklIC8gMC41KTsgfVxuICAgIH1cbiAgYDtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmZ1bmN0aW9uIHN5bmNEYXJrTW9kZSgpOiB2b2lkIHtcbiAgY29uc3QgaXNEYXJrID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScpID09PSAnZGFyayc7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCd3YS1kYXJrJywgaXNEYXJrKTtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3dhLWxpZ2h0JywgIWlzRGFyayk7XG59XG5cbmZ1bmN0aW9uIG9ic2VydmVUaGVtZUNoYW5nZXMoKTogdm9pZCB7XG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gc3luY0RhcmtNb2RlKCkpO1xuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge1xuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbJ2RhdGEtdGhlbWUnXSxcbiAgfSk7XG59XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvaW50ZXJuYWwvdmFsaWRhdG9ycy9taXJyb3ItdmFsaWRhdG9yLnRzXG52YXIgTWlycm9yVmFsaWRhdG9yID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNoZWNrVmFsaWRpdHkoZWxlbWVudCkge1xuICAgICAgY29uc3QgZm9ybUNvbnRyb2wgPSBlbGVtZW50LmlucHV0O1xuICAgICAgY29uc3QgdmFsaWRpdHkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgIGludmFsaWRLZXlzOiBbXVxuICAgICAgfTtcbiAgICAgIGlmICghZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkaXR5O1xuICAgICAgfVxuICAgICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuICAgICAgaWYgKFwiY2hlY2tWYWxpZGl0eVwiIGluIGZvcm1Db250cm9sKSB7XG4gICAgICAgIGlzVmFsaWQgPSBmb3JtQ29udHJvbC5jaGVja1ZhbGlkaXR5KCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICByZXR1cm4gdmFsaWRpdHk7XG4gICAgICB9XG4gICAgICB2YWxpZGl0eS5pc1ZhbGlkID0gZmFsc2U7XG4gICAgICBpZiAoXCJ2YWxpZGF0aW9uTWVzc2FnZVwiIGluIGZvcm1Db250cm9sKSB7XG4gICAgICAgIHZhbGlkaXR5Lm1lc3NhZ2UgPSBmb3JtQ29udHJvbC52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIGlmICghKFwidmFsaWRpdHlcIiBpbiBmb3JtQ29udHJvbCkpIHtcbiAgICAgICAgdmFsaWRpdHkuaW52YWxpZEtleXMucHVzaChcImN1c3RvbUVycm9yXCIpO1xuICAgICAgICByZXR1cm4gdmFsaWRpdHk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtQ29udHJvbC52YWxpZGl0eSkge1xuICAgICAgICBpZiAoa2V5ID09PSBcInZhbGlkXCIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaGVja2VkS2V5ID0ga2V5O1xuICAgICAgICBpZiAoZm9ybUNvbnRyb2wudmFsaWRpdHlbY2hlY2tlZEtleV0pIHtcbiAgICAgICAgICB2YWxpZGl0eS5pbnZhbGlkS2V5cy5wdXNoKGNoZWNrZWRLZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsaWRpdHk7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IHtcbiAgTWlycm9yVmFsaWRhdG9yXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2V2ZW50cy9pbnZhbGlkLnRzXG52YXIgV2FJbnZhbGlkRXZlbnQgPSBjbGFzcyBleHRlbmRzIEV2ZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJ3YS1pbnZhbGlkXCIsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2UsIGNvbXBvc2VkOiB0cnVlIH0pO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBXYUludmFsaWRFdmVudFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fdHlwZUVycm9yID0gKG1zZykgPT4ge1xuICB0aHJvdyBUeXBlRXJyb3IobXNnKTtcbn07XG52YXIgX19kZWNvcmF0ZUNsYXNzID0gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBraW5kKSA9PiB7XG4gIHZhciByZXN1bHQgPSBraW5kID4gMSA/IHZvaWQgMCA6IGtpbmQgPyBfX2dldE93blByb3BEZXNjKHRhcmdldCwga2V5KSA6IHRhcmdldDtcbiAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMSwgZGVjb3JhdG9yOyBpID49IDA7IGktLSlcbiAgICBpZiAoZGVjb3JhdG9yID0gZGVjb3JhdG9yc1tpXSlcbiAgICAgIHJlc3VsdCA9IChraW5kID8gZGVjb3JhdG9yKHRhcmdldCwga2V5LCByZXN1bHQpIDogZGVjb3JhdG9yKHJlc3VsdCkpIHx8IHJlc3VsdDtcbiAgaWYgKGtpbmQgJiYgcmVzdWx0KSBfX2RlZlByb3AodGFyZ2V0LCBrZXksIHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYWNjZXNzQ2hlY2sgPSAob2JqLCBtZW1iZXIsIG1zZykgPT4gbWVtYmVyLmhhcyhvYmopIHx8IF9fdHlwZUVycm9yKFwiQ2Fubm90IFwiICsgbXNnKTtcbnZhciBfX3ByaXZhdGVHZXQgPSAob2JqLCBtZW1iZXIsIGdldHRlcikgPT4gKF9fYWNjZXNzQ2hlY2sob2JqLCBtZW1iZXIsIFwicmVhZCBmcm9tIHByaXZhdGUgZmllbGRcIiksIGdldHRlciA/IGdldHRlci5jYWxsKG9iaikgOiBtZW1iZXIuZ2V0KG9iaikpO1xudmFyIF9fcHJpdmF0ZUFkZCA9IChvYmosIG1lbWJlciwgdmFsdWUpID0+IG1lbWJlci5oYXMob2JqKSA/IF9fdHlwZUVycm9yKFwiQ2Fubm90IGFkZCB0aGUgc2FtZSBwcml2YXRlIG1lbWJlciBtb3JlIHRoYW4gb25jZVwiKSA6IG1lbWJlciBpbnN0YW5jZW9mIFdlYWtTZXQgPyBtZW1iZXIuYWRkKG9iaikgOiBtZW1iZXIuc2V0KG9iaiwgdmFsdWUpO1xudmFyIF9fcHJpdmF0ZVNldCA9IChvYmosIG1lbWJlciwgdmFsdWUsIHNldHRlcikgPT4gKF9fYWNjZXNzQ2hlY2sob2JqLCBtZW1iZXIsIFwid3JpdGUgdG8gcHJpdmF0ZSBmaWVsZFwiKSwgc2V0dGVyID8gc2V0dGVyLmNhbGwob2JqLCB2YWx1ZSkgOiBtZW1iZXIuc2V0KG9iaiwgdmFsdWUpLCB2YWx1ZSk7XG5cbmV4cG9ydCB7XG4gIF9fZGVjb3JhdGVDbGFzcyxcbiAgX19wcml2YXRlR2V0LFxuICBfX3ByaXZhdGVBZGQsXG4gIF9fcHJpdmF0ZVNldFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5pbXBvcnQge1xuICBfX2RlY29yYXRlQ2xhc3MsXG4gIF9fcHJpdmF0ZUFkZCxcbiAgX19wcml2YXRlR2V0LFxuICBfX3ByaXZhdGVTZXRcbn0gZnJvbSBcIi4vY2h1bmsuN1ZHQ0lIREcuanNcIjtcblxuLy8gc3JjL2ludGVybmFsL3dlYmF3ZXNvbWUtZWxlbWVudC50c1xuaW1wb3J0IHsgTGl0RWxlbWVudCwgaXNTZXJ2ZXIgfSBmcm9tIFwibGl0XCI7XG5pbXBvcnQgeyBwcm9wZXJ0eSB9IGZyb20gXCJsaXQvZGVjb3JhdG9ycy5qc1wiO1xuXG4vLyBzcmMvc3R5bGVzL2NvbXBvbmVudC9ob3N0LnN0eWxlcy50c1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcImxpdFwiO1xudmFyIGhvc3Rfc3R5bGVzX2RlZmF1bHQgPSBjc3NgXG4gIDpob3N0IHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgOmhvc3QgKixcbiAgOmhvc3QgKjo6YmVmb3JlLFxuICA6aG9zdCAqOjphZnRlciB7XG4gICAgYm94LXNpemluZzogaW5oZXJpdDtcbiAgfVxuXG4gIFtoaWRkZW5dIHtcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gIH1cbmA7XG5cbi8vIHNyYy9pbnRlcm5hbC93ZWJhd2Vzb21lLWVsZW1lbnQudHNcbnZhciBfaGFzUmVjb3JkZWRJbml0aWFsUHJvcGVydGllcztcbnZhciBXZWJBd2Vzb21lRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgX19wcml2YXRlQWRkKHRoaXMsIF9oYXNSZWNvcmRlZEluaXRpYWxQcm9wZXJ0aWVzLCBmYWxzZSk7XG4gICAgdGhpcy5pbml0aWFsUmVmbGVjdGVkUHJvcGVydGllcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gICAgdGhpcy5kaWRTU1IgPSBpc1NlcnZlciB8fCBCb29sZWFuKHRoaXMuc2hhZG93Um9vdCk7XG4gICAgLyoqXG4gICAgICogQGludGVybmFsIE1ldGhvZHMgZm9yIHNldHRpbmcgYW5kIGNoZWNraW5nIGN1c3RvbSBzdGF0ZXMuXG4gICAgICovXG4gICAgdGhpcy5jdXN0b21TdGF0ZXMgPSB7XG4gICAgICAvKiogQWRkcyBvciByZW1vdmVzIHRoZSBzcGVjaWZpZWQgY3VzdG9tIHN0YXRlLiAqL1xuICAgICAgc2V0OiAoY3VzdG9tU3RhdGUsIGFjdGl2ZSkgPT4ge1xuICAgICAgICBpZiAoIUJvb2xlYW4odGhpcy5pbnRlcm5hbHM/LnN0YXRlcykpIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmludGVybmFscy5zdGF0ZXMuYWRkKGN1c3RvbVN0YXRlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnRlcm5hbHMuc3RhdGVzLmRlbGV0ZShjdXN0b21TdGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKFN0cmluZyhlKS5pbmNsdWRlcyhcIm11c3Qgc3RhcnQgd2l0aCAnLS0nXCIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiWW91ciBicm93c2VyIGltcGxlbWVudHMgYW4gb3V0ZGF0ZWQgdmVyc2lvbiBvZiBDdXN0b21TdGF0ZVNldC4gQ29uc2lkZXIgdXNpbmcgYSBwb2x5ZmlsbFwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvKiogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgZWxlbWVudCBjdXJyZW50bHkgaGFzIHRoZSBzcGVjaWZpZWQgc3RhdGUuICovXG4gICAgICBoYXM6IChjdXN0b21TdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoIUJvb2xlYW4odGhpcy5pbnRlcm5hbHM/LnN0YXRlcykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMuc3RhdGVzLmhhcyhjdXN0b21TdGF0ZSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaW50ZXJuYWxzID0gdGhpcy5hdHRhY2hJbnRlcm5hbHMoKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFbGVtZW50IGludGVybmFscyBhcmUgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXIuIENvbnNpZGVyIHVzaW5nIGEgcG9seWZpbGxcIik7XG4gICAgfVxuICAgIHRoaXMuY3VzdG9tU3RhdGVzLnNldChcIndhLWRlZmluZWRcIiwgdHJ1ZSk7XG4gICAgbGV0IFNlbGYgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgIGZvciAobGV0IFtwcm9wZXJ0eTIsIHNwZWNdIG9mIFNlbGYuZWxlbWVudFByb3BlcnRpZXMpIHtcbiAgICAgIGlmIChzcGVjLmRlZmF1bHQgPT09IFwiaW5oZXJpdFwiICYmIHNwZWMuaW5pdGlhbCAhPT0gdm9pZCAwICYmIHR5cGVvZiBwcm9wZXJ0eTIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhpcy5jdXN0b21TdGF0ZXMuc2V0KGBpbml0aWFsLSR7cHJvcGVydHkyfS0ke3NwZWMuaW5pdGlhbH1gLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqIFByZXBlbmRzIGhvc3Qgc3R5bGVzIHRvIHRoZSBjb21wb25lbnQncyBzdHlsZXMuICovXG4gIHN0YXRpYyBnZXQgc3R5bGVzKCkge1xuICAgIGNvbnN0IHN0eWxlcyA9IEFycmF5LmlzQXJyYXkodGhpcy5jc3MpID8gdGhpcy5jc3MgOiB0aGlzLmNzcyA/IFt0aGlzLmNzc10gOiBbXTtcbiAgICByZXR1cm4gW2hvc3Rfc3R5bGVzX2RlZmF1bHQsIC4uLnN0eWxlc107XG4gIH1cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmICghX19wcml2YXRlR2V0KHRoaXMsIF9oYXNSZWNvcmRlZEluaXRpYWxQcm9wZXJ0aWVzKSkge1xuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5lbGVtZW50UHJvcGVydGllcy5mb3JFYWNoKFxuICAgICAgICAob2JqLCBwcm9wKSA9PiB7XG4gICAgICAgICAgaWYgKG9iai5yZWZsZWN0ICYmIHRoaXNbcHJvcF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsUmVmbGVjdGVkUHJvcGVydGllcy5zZXQocHJvcCwgdGhpc1twcm9wXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgX19wcml2YXRlU2V0KHRoaXMsIF9oYXNSZWNvcmRlZEluaXRpYWxQcm9wZXJ0aWVzLCB0cnVlKTtcbiAgICB9XG4gICAgc3VwZXIuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gIH1cbiAgd2lsbFVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcykge1xuICAgIHN1cGVyLndpbGxVcGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIHRoaXMuaW5pdGlhbFJlZmxlY3RlZFByb3BlcnRpZXMuZm9yRWFjaCgodmFsdWUsIHByb3ApID0+IHtcbiAgICAgIGlmIChjaGFuZ2VkUHJvcGVydGllcy5oYXMocHJvcCkgJiYgdGhpc1twcm9wXSA9PSBudWxsKSB7XG4gICAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmaXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICBzdXBlci5maXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIGlmICh0aGlzLmRpZFNTUikge1xuICAgICAgdGhpcy5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yQWxsKFwic2xvdFwiKS5mb3JFYWNoKChzbG90RWxlbWVudCkgPT4ge1xuICAgICAgICBzbG90RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInNsb3RjaGFuZ2VcIiwgeyBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlIH0pKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICB1cGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICB0cnkge1xuICAgICAgc3VwZXIudXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAodGhpcy5kaWRTU1IgJiYgIXRoaXMuaGFzVXBkYXRlZCkge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudChcImxpdC1oeWRyYXRpb24tZXJyb3JcIiwgeyBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2UgfSk7XG4gICAgICAgIGV2ZW50LmVycm9yID0gZTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBAaW50ZXJuYWwgR2l2ZW4gYSBuYXRpdmUgZXZlbnQsIHRoaXMgZnVuY3Rpb24gY2FuY2VscyBpdCBhbmQgZGlzcGF0Y2hlcyBpdCBhZ2FpbiBmcm9tIHRoZSBob3N0IGVsZW1lbnQgdXNpbmcgdGhlIGRlc2lyZWRcbiAgICogZXZlbnQgb3B0aW9ucy5cbiAgICovXG4gIHJlbGF5TmF0aXZlRXZlbnQoZXZlbnQsIGV2ZW50T3B0aW9ucykge1xuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBldmVudC5jb25zdHJ1Y3RvcihldmVudC50eXBlLCB7XG4gICAgICAgIC4uLmV2ZW50LFxuICAgICAgICAuLi5ldmVudE9wdGlvbnNcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufTtcbl9oYXNSZWNvcmRlZEluaXRpYWxQcm9wZXJ0aWVzID0gbmV3IFdlYWtNYXAoKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdlYkF3ZXNvbWVFbGVtZW50LnByb3RvdHlwZSwgXCJkaXJcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXZWJBd2Vzb21lRWxlbWVudC5wcm90b3R5cGUsIFwibGFuZ1wiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSwgYXR0cmlidXRlOiBcImRpZC1zc3JcIiB9KVxuXSwgV2ViQXdlc29tZUVsZW1lbnQucHJvdG90eXBlLCBcImRpZFNTUlwiLCAyKTtcblxuZXhwb3J0IHtcbiAgV2ViQXdlc29tZUVsZW1lbnRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuaW1wb3J0IHtcbiAgV2FJbnZhbGlkRXZlbnRcbn0gZnJvbSBcIi4vY2h1bmsuVkMzQlBVWkouanNcIjtcbmltcG9ydCB7XG4gIFdlYkF3ZXNvbWVFbGVtZW50XG59IGZyb20gXCIuL2NodW5rLkVQSEhXWEsyLmpzXCI7XG5pbXBvcnQge1xuICBfX2RlY29yYXRlQ2xhc3Ncbn0gZnJvbSBcIi4vY2h1bmsuN1ZHQ0lIREcuanNcIjtcblxuLy8gc3JjL2ludGVybmFsL3dlYmF3ZXNvbWUtZm9ybS1hc3NvY2lhdGVkLWVsZW1lbnQudHNcbmltcG9ydCB7IGlzU2VydmVyIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHsgcHJvcGVydHkgfSBmcm9tIFwibGl0L2RlY29yYXRvcnMuanNcIjtcblxuLy8gc3JjL2ludGVybmFsL3ZhbGlkYXRvcnMvY3VzdG9tLWVycm9yLXZhbGlkYXRvci50c1xudmFyIEN1c3RvbUVycm9yVmFsaWRhdG9yID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG9ic2VydmVkQXR0cmlidXRlczogW1wiY3VzdG9tLWVycm9yXCJdLFxuICAgIGNoZWNrVmFsaWRpdHkoZWxlbWVudCkge1xuICAgICAgY29uc3QgdmFsaWRpdHkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IFwiXCIsXG4gICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgIGludmFsaWRLZXlzOiBbXVxuICAgICAgfTtcbiAgICAgIGlmIChlbGVtZW50LmN1c3RvbUVycm9yKSB7XG4gICAgICAgIHZhbGlkaXR5Lm1lc3NhZ2UgPSBlbGVtZW50LmN1c3RvbUVycm9yO1xuICAgICAgICB2YWxpZGl0eS5pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIHZhbGlkaXR5LmludmFsaWRLZXlzID0gW1wiY3VzdG9tRXJyb3JcIl07XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsaWRpdHk7XG4gICAgfVxuICB9O1xufTtcblxuLy8gc3JjL2ludGVybmFsL3dlYmF3ZXNvbWUtZm9ybS1hc3NvY2lhdGVkLWVsZW1lbnQudHNcbnZhciBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50ID0gY2xhc3MgZXh0ZW5kcyBXZWJBd2Vzb21lRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZXF1aXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuYXNzdW1lSW50ZXJhY3Rpb25PbiA9IFtcImlucHV0XCJdO1xuICAgIHRoaXMudmFsaWRhdG9ycyA9IFtdO1xuICAgIHRoaXMudmFsdWVIYXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgdGhpcy5oYXNJbnRlcmFjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5jdXN0b21FcnJvciA9IG51bGw7XG4gICAgdGhpcy5lbWl0dGVkRXZlbnRzID0gW107XG4gICAgdGhpcy5lbWl0SW52YWxpZCA9IChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpIHJldHVybjtcbiAgICAgIHRoaXMuaGFzSW50ZXJhY3RlZCA9IHRydWU7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFdhSW52YWxpZEV2ZW50KCkpO1xuICAgIH07XG4gICAgdGhpcy5oYW5kbGVJbnRlcmFjdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgY29uc3QgZW1pdHRlZEV2ZW50cyA9IHRoaXMuZW1pdHRlZEV2ZW50cztcbiAgICAgIGlmICghZW1pdHRlZEV2ZW50cy5pbmNsdWRlcyhldmVudC50eXBlKSkge1xuICAgICAgICBlbWl0dGVkRXZlbnRzLnB1c2goZXZlbnQudHlwZSk7XG4gICAgICB9XG4gICAgICBpZiAoZW1pdHRlZEV2ZW50cy5sZW5ndGggPT09IHRoaXMuYXNzdW1lSW50ZXJhY3Rpb25Pbj8ubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaGFzSW50ZXJhY3RlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAoIWlzU2VydmVyKSB7XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsIHRoaXMuZW1pdEludmFsaWQpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVmFsaWRhdG9ycyBhcmUgc3RhdGljIGJlY2F1c2UgdGhleSBoYXZlIGBvYnNlcnZlZEF0dHJpYnV0ZXNgLCBlc3NlbnRpYWxseSBhdHRyaWJ1dGVzIHRvIFwid2F0Y2hcIlxuICAgKiBmb3IgY2hhbmdlcy4gV2hlbmV2ZXIgdGhlc2UgYXR0cmlidXRlcyBjaGFuZ2UsIHdlIHdhbnQgdG8gYmUgbm90aWZpZWQgYW5kIHVwZGF0ZSB0aGUgdmFsaWRhdG9yLlxuICAgKi9cbiAgc3RhdGljIGdldCB2YWxpZGF0b3JzKCkge1xuICAgIHJldHVybiBbQ3VzdG9tRXJyb3JWYWxpZGF0b3IoKV07XG4gIH1cbiAgLy8gQXBwZW5kIGFsbCBWYWxpZGF0b3IgXCJvYnNlcnZlZEF0dHJpYnV0ZXNcIiBpbnRvIHRoZSBcIm9ic2VydmVkQXR0cmlidXRlc1wiIHNvIHRoZXkgY2FuIHJ1bi5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgY29uc3QgcGFyZW50QXR0cnMgPSBuZXcgU2V0KHN1cGVyLm9ic2VydmVkQXR0cmlidXRlcyB8fCBbXSk7XG4gICAgZm9yIChjb25zdCB2YWxpZGF0b3Igb2YgdGhpcy52YWxpZGF0b3JzKSB7XG4gICAgICBpZiAoIXZhbGlkYXRvci5vYnNlcnZlZEF0dHJpYnV0ZXMpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgdmFsaWRhdG9yLm9ic2VydmVkQXR0cmlidXRlcykge1xuICAgICAgICBwYXJlbnRBdHRycy5hZGQoYXR0cik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbLi4ucGFyZW50QXR0cnNdO1xuICB9XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgdGhpcy51cGRhdGVWYWxpZGl0eSgpO1xuICAgIHRoaXMuYXNzdW1lSW50ZXJhY3Rpb25Pbi5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLmhhbmRsZUludGVyYWN0aW9uKTtcbiAgICB9KTtcbiAgfVxuICBmaXJzdFVwZGF0ZWQoLi4uYXJncykge1xuICAgIHN1cGVyLmZpcnN0VXBkYXRlZCguLi5hcmdzKTtcbiAgICB0aGlzLnVwZGF0ZVZhbGlkaXR5KCk7XG4gIH1cbiAgd2lsbFVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcykge1xuICAgIGlmICghaXNTZXJ2ZXIgJiYgY2hhbmdlZFByb3BlcnRpZXMuaGFzKFwiY3VzdG9tRXJyb3JcIikpIHtcbiAgICAgIGlmICghdGhpcy5jdXN0b21FcnJvcikge1xuICAgICAgICB0aGlzLmN1c3RvbUVycm9yID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0Q3VzdG9tVmFsaWRpdHkodGhpcy5jdXN0b21FcnJvciB8fCBcIlwiKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcInZhbHVlXCIpIHx8IGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcImRpc2FibGVkXCIpIHx8IGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcImRlZmF1bHRWYWx1ZVwiKSkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGlmICh0aGlzLm5hbWUpIHtcbiAgICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQodGhpcy5uYW1lLCB2YWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnNldFZhbHVlKGZvcm1EYXRhLCBmb3JtRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcImRpc2FibGVkXCIpKSB7XG4gICAgICB0aGlzLmN1c3RvbVN0YXRlcy5zZXQoXCJkaXNhYmxlZFwiLCB0aGlzLmRpc2FibGVkKTtcbiAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZShcImRpc2FibGVkXCIpIHx8ICFpc1NlcnZlciAmJiAhdGhpcy5tYXRjaGVzKFwiOmRpc2FibGVkXCIpKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlQXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdGhpcy5kaXNhYmxlZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHN1cGVyLndpbGxVcGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIHRoaXMudXBkYXRlVmFsaWRpdHkoKTtcbiAgfVxuICBnZXQgbGFiZWxzKCkge1xuICAgIHJldHVybiB0aGlzLmludGVybmFscy5sYWJlbHM7XG4gIH1cbiAgZ2V0Rm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMuZm9ybTtcbiAgfVxuICAvKipcbiAgICogQnkgZGVmYXVsdCwgZm9ybSBjb250cm9scyBhcmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBuZWFyZXN0IGNvbnRhaW5pbmcgYDxmb3JtPmAgZWxlbWVudC4gVGhpcyBhdHRyaWJ1dGUgYWxsb3dzIHlvdVxuICAgKiB0byBwbGFjZSB0aGUgZm9ybSBjb250cm9sIG91dHNpZGUgb2YgYSBmb3JtIGFuZCBhc3NvY2lhdGUgaXQgd2l0aCB0aGUgZm9ybSB0aGF0IGhhcyB0aGlzIGBpZGAuIFRoZSBmb3JtIG11c3QgYmUgaW5cbiAgICogdGhlIHNhbWUgZG9jdW1lbnQgb3Igc2hhZG93IHJvb3QgZm9yIHRoaXMgdG8gd29yay5cbiAgICovXG4gIHNldCBmb3JtKHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiZm9ybVwiLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShcImZvcm1cIik7XG4gICAgfVxuICB9XG4gIGdldCBmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLmludGVybmFscy5mb3JtO1xuICB9XG4gIGdldCB2YWxpZGl0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMudmFsaWRpdHk7XG4gIH1cbiAgLy8gTm90IHN1cmUgaWYgdGhpcyBzdXBwb3J0cyBgbm92YWxpZGF0ZWAuIFdpbGwgbmVlZCB0byB0ZXN0LlxuICBnZXQgd2lsbFZhbGlkYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmludGVybmFscy53aWxsVmFsaWRhdGU7XG4gIH1cbiAgZ2V0IHZhbGlkYXRpb25NZXNzYWdlKCkge1xuICAgIHJldHVybiB0aGlzLmludGVybmFscy52YWxpZGF0aW9uTWVzc2FnZTtcbiAgfVxuICBjaGVja1ZhbGlkaXR5KCkge1xuICAgIHRoaXMudXBkYXRlVmFsaWRpdHkoKTtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbHMuY2hlY2tWYWxpZGl0eSgpO1xuICB9XG4gIHJlcG9ydFZhbGlkaXR5KCkge1xuICAgIHRoaXMudXBkYXRlVmFsaWRpdHkoKTtcbiAgICB0aGlzLmhhc0ludGVyYWN0ZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLmludGVybmFscy5yZXBvcnRWYWxpZGl0eSgpO1xuICB9XG4gIC8qKlxuICAgKiBPdmVycmlkZSB0aGlzIHRvIGNoYW5nZSB3aGVyZSBjb25zdHJhaW50IHZhbGlkYXRpb24gcG9wdXBzIGFyZSBhbmNob3JlZC5cbiAgICovXG4gIGdldCB2YWxpZGF0aW9uVGFyZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0IHx8IHZvaWQgMDtcbiAgfVxuICBzZXRWYWxpZGl0eSguLi5hcmdzKSB7XG4gICAgY29uc3QgZmxhZ3MgPSBhcmdzWzBdO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBhcmdzWzFdO1xuICAgIGxldCBhbmNob3IgPSBhcmdzWzJdO1xuICAgIGlmICghYW5jaG9yKSB7XG4gICAgICBhbmNob3IgPSB0aGlzLnZhbGlkYXRpb25UYXJnZXQ7XG4gICAgfVxuICAgIHRoaXMuaW50ZXJuYWxzLnNldFZhbGlkaXR5KGZsYWdzLCBtZXNzYWdlLCBhbmNob3IgfHwgdm9pZCAwKTtcbiAgICB0aGlzLnJlcXVlc3RVcGRhdGUoXCJ2YWxpZGl0eVwiKTtcbiAgICB0aGlzLnNldEN1c3RvbVN0YXRlcygpO1xuICB9XG4gIHNldEN1c3RvbVN0YXRlcygpIHtcbiAgICBjb25zdCByZXF1aXJlZCA9IEJvb2xlYW4odGhpcy5yZXF1aXJlZCk7XG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuaW50ZXJuYWxzLnZhbGlkaXR5LnZhbGlkO1xuICAgIGNvbnN0IGhhc0ludGVyYWN0ZWQgPSB0aGlzLmhhc0ludGVyYWN0ZWQ7XG4gICAgdGhpcy5jdXN0b21TdGF0ZXMuc2V0KFwicmVxdWlyZWRcIiwgcmVxdWlyZWQpO1xuICAgIHRoaXMuY3VzdG9tU3RhdGVzLnNldChcIm9wdGlvbmFsXCIsICFyZXF1aXJlZCk7XG4gICAgdGhpcy5jdXN0b21TdGF0ZXMuc2V0KFwiaW52YWxpZFwiLCAhaXNWYWxpZCk7XG4gICAgdGhpcy5jdXN0b21TdGF0ZXMuc2V0KFwidmFsaWRcIiwgaXNWYWxpZCk7XG4gICAgdGhpcy5jdXN0b21TdGF0ZXMuc2V0KFwidXNlci1pbnZhbGlkXCIsICFpc1ZhbGlkICYmIGhhc0ludGVyYWN0ZWQpO1xuICAgIHRoaXMuY3VzdG9tU3RhdGVzLnNldChcInVzZXItdmFsaWRcIiwgaXNWYWxpZCAmJiBoYXNJbnRlcmFjdGVkKTtcbiAgfVxuICAvKipcbiAgICogRG8gbm90IHVzZSB0aGlzIHdoZW4gY3JlYXRpbmcgYSBcIlZhbGlkYXRvclwiLiBUaGlzIGlzIGludGVuZGVkIGZvciBlbmQgdXNlcnMgb2YgY29tcG9uZW50cy5cbiAgICogV2UgdHJhY2sgbWFudWFsbHkgZGVmaW5lZCBjdXN0b20gZXJyb3JzIHNvIHdlIGRvbid0IGNsZWFyIHRoZW0gb24gYWNjaWRlbnQgaW4gb3VyIHZhbGlkYXRvcnMuXG4gICAqXG4gICAqL1xuICBzZXRDdXN0b21WYWxpZGl0eShtZXNzYWdlKSB7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICB0aGlzLmN1c3RvbUVycm9yID0gbnVsbDtcbiAgICAgIHRoaXMuc2V0VmFsaWRpdHkoe30pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1c3RvbUVycm9yID0gbWVzc2FnZTtcbiAgICB0aGlzLnNldFZhbGlkaXR5KHsgY3VzdG9tRXJyb3I6IHRydWUgfSwgbWVzc2FnZSwgdGhpcy52YWxpZGF0aW9uVGFyZ2V0KTtcbiAgfVxuICBmb3JtUmVzZXRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnJlc2V0VmFsaWRpdHkoKTtcbiAgICB0aGlzLmhhc0ludGVyYWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnZhbHVlSGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdHRlZEV2ZW50cyA9IFtdO1xuICAgIHRoaXMudXBkYXRlVmFsaWRpdHkoKTtcbiAgfVxuICBmb3JtRGlzYWJsZWRDYWxsYmFjayhpc0Rpc2FibGVkKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy51cGRhdGVWYWxpZGl0eSgpO1xuICB9XG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgYnJvd3NlciBpcyB0cnlpbmcgdG8gcmVzdG9yZSBlbGVtZW50XHUyMDE5cyBzdGF0ZSB0byBzdGF0ZSBpbiB3aGljaCBjYXNlIHJlYXNvbiBpcyBcInJlc3RvcmVcIiwgb3Igd2hlblxuICAgKiB0aGUgYnJvd3NlciBpcyB0cnlpbmcgdG8gZnVsZmlsbCBhdXRvZmlsbCBvbiBiZWhhbGYgb2YgdXNlciBpbiB3aGljaCBjYXNlIHJlYXNvbiBpcyBcImF1dG9jb21wbGV0ZVwiLiBJbiB0aGUgY2FzZSBvZlxuICAgKiBcInJlc3RvcmVcIiwgc3RhdGUgaXMgYSBzdHJpbmcsIEZpbGUsIG9yIEZvcm1EYXRhIG9iamVjdCBwcmV2aW91c2x5IHNldCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHNldEZvcm1WYWx1ZS5cbiAgICovXG4gIGZvcm1TdGF0ZVJlc3RvcmVDYWxsYmFjayhzdGF0ZSwgcmVhc29uKSB7XG4gICAgdGhpcy52YWx1ZSA9IHN0YXRlO1xuICAgIGlmIChyZWFzb24gPT09IFwicmVzdG9yZVwiKSB7XG4gICAgICB0aGlzLnJlc2V0VmFsaWRpdHkoKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVWYWxpZGl0eSgpO1xuICB9XG4gIHNldFZhbHVlKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbdmFsdWUsIHN0YXRlXSA9IGFyZ3M7XG4gICAgdGhpcy5pbnRlcm5hbHMuc2V0Rm9ybVZhbHVlKHZhbHVlLCBzdGF0ZSk7XG4gIH1cbiAgZ2V0IGFsbFZhbGlkYXRvcnMoKSB7XG4gICAgY29uc3Qgc3RhdGljVmFsaWRhdG9ycyA9IHRoaXMuY29uc3RydWN0b3IudmFsaWRhdG9ycyB8fCBbXTtcbiAgICBjb25zdCB2YWxpZGF0b3JzID0gdGhpcy52YWxpZGF0b3JzIHx8IFtdO1xuICAgIHJldHVybiBbLi4uc3RhdGljVmFsaWRhdG9ycywgLi4udmFsaWRhdG9yc107XG4gIH1cbiAgLyoqXG4gICAqIFJlc2V0IHZhbGlkaXR5IGlzIGEgd2F5IG9mIHJlbW92aW5nIG1hbnVhbCBjdXN0b20gZXJyb3JzIGFuZCBuYXRpdmUgdmFsaWRhdGlvbi5cbiAgICovXG4gIHJlc2V0VmFsaWRpdHkoKSB7XG4gICAgdGhpcy5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgICB0aGlzLnNldFZhbGlkaXR5KHt9KTtcbiAgfVxuICB1cGRhdGVWYWxpZGl0eSgpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmhhc0F0dHJpYnV0ZShcImRpc2FibGVkXCIpIHx8ICF0aGlzLndpbGxWYWxpZGF0ZSkge1xuICAgICAgdGhpcy5yZXNldFZhbGlkaXR5KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0aGlzLmFsbFZhbGlkYXRvcnM7XG4gICAgaWYgKCF2YWxpZGF0b3JzPy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmxhZ3MgPSB7XG4gICAgICAvLyBEb24ndCB0cnVzdCBjdXN0b20gZXJyb3JzIGZyb20gdGhlIEJyb3dzZXIuIFNhZmFyaSBicmVha3MgdGhlIHNwZWMuXG4gICAgICBjdXN0b21FcnJvcjogQm9vbGVhbih0aGlzLmN1c3RvbUVycm9yKVxuICAgIH07XG4gICAgY29uc3QgZm9ybUNvbnRyb2wgPSB0aGlzLnZhbGlkYXRpb25UYXJnZXQgfHwgdGhpcy5pbnB1dCB8fCB2b2lkIDA7XG4gICAgbGV0IGZpbmFsTWVzc2FnZSA9IFwiXCI7XG4gICAgZm9yIChjb25zdCB2YWxpZGF0b3Igb2YgdmFsaWRhdG9ycykge1xuICAgICAgY29uc3QgeyBpc1ZhbGlkLCBtZXNzYWdlLCBpbnZhbGlkS2V5cyB9ID0gdmFsaWRhdG9yLmNoZWNrVmFsaWRpdHkodGhpcyk7XG4gICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICghZmluYWxNZXNzYWdlKSB7XG4gICAgICAgIGZpbmFsTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICB9XG4gICAgICBpZiAoaW52YWxpZEtleXM/Lmxlbmd0aCA+PSAwKSB7XG4gICAgICAgIGludmFsaWRLZXlzLmZvckVhY2goKHN0cikgPT4gZmxhZ3Nbc3RyXSA9IHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZpbmFsTWVzc2FnZSkge1xuICAgICAgZmluYWxNZXNzYWdlID0gdGhpcy52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICB9XG4gICAgdGhpcy5zZXRWYWxpZGl0eShmbGFncywgZmluYWxNZXNzYWdlLCBmb3JtQ29udHJvbCk7XG4gIH1cbn07XG5XZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50LmZvcm1Bc3NvY2lhdGVkID0gdHJ1ZTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudC5wcm90b3R5cGUsIFwibmFtZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiB9KVxuXSwgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudC5wcm90b3R5cGUsIFwiZGlzYWJsZWRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHN0YXRlOiB0cnVlLCBhdHRyaWJ1dGU6IGZhbHNlIH0pXG5dLCBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50LnByb3RvdHlwZSwgXCJ2YWx1ZUhhc0NoYW5nZWRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHN0YXRlOiB0cnVlLCBhdHRyaWJ1dGU6IGZhbHNlIH0pXG5dLCBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50LnByb3RvdHlwZSwgXCJoYXNJbnRlcmFjdGVkXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwiY3VzdG9tLWVycm9yXCIsIHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdlYkF3ZXNvbWVGb3JtQXNzb2NpYXRlZEVsZW1lbnQucHJvdG90eXBlLCBcImN1c3RvbUVycm9yXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IGZhbHNlLCBzdGF0ZTogdHJ1ZSwgdHlwZTogT2JqZWN0IH0pXG5dLCBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50LnByb3RvdHlwZSwgXCJ2YWxpZGl0eVwiLCAxKTtcblxuZXhwb3J0IHtcbiAgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9pbnRlcm5hbC9zbG90LnRzXG52YXIgSGFzU2xvdENvbnRyb2xsZXIgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKGhvc3QsIC4uLnNsb3ROYW1lcykge1xuICAgIHRoaXMuc2xvdE5hbWVzID0gW107XG4gICAgdGhpcy5oYW5kbGVTbG90Q2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBzbG90ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgaWYgKHRoaXMuc2xvdE5hbWVzLmluY2x1ZGVzKFwiW2RlZmF1bHRdXCIpICYmICFzbG90Lm5hbWUgfHwgc2xvdC5uYW1lICYmIHRoaXMuc2xvdE5hbWVzLmluY2x1ZGVzKHNsb3QubmFtZSkpIHtcbiAgICAgICAgdGhpcy5ob3N0LnJlcXVlc3RVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgICh0aGlzLmhvc3QgPSBob3N0KS5hZGRDb250cm9sbGVyKHRoaXMpO1xuICAgIHRoaXMuc2xvdE5hbWVzID0gc2xvdE5hbWVzO1xuICB9XG4gIGhhc0RlZmF1bHRTbG90KCkge1xuICAgIGlmICghdGhpcy5ob3N0LmNoaWxkTm9kZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIFsuLi50aGlzLmhvc3QuY2hpbGROb2Rlc10uc29tZSgobm9kZSkgPT4ge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFICYmIG5vZGUudGV4dENvbnRlbnQudHJpbSgpICE9PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgIGNvbnN0IGVsID0gbm9kZTtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHRhZ05hbWUgPT09IFwid2EtdmlzdWFsbHktaGlkZGVuXCIpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoXCJzbG90XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuICBoYXNOYW1lZFNsb3QobmFtZSkge1xuICAgIHJldHVybiB0aGlzLmhvc3QucXVlcnlTZWxlY3Rvcj8uKGA6c2NvcGUgPiBbc2xvdD1cIiR7bmFtZX1cIl1gKSAhPT0gbnVsbDtcbiAgfVxuICB0ZXN0KHNsb3ROYW1lKSB7XG4gICAgcmV0dXJuIHNsb3ROYW1lID09PSBcIltkZWZhdWx0XVwiID8gdGhpcy5oYXNEZWZhdWx0U2xvdCgpIDogdGhpcy5oYXNOYW1lZFNsb3Qoc2xvdE5hbWUpO1xuICB9XG4gIGhvc3RDb25uZWN0ZWQoKSB7XG4gICAgdGhpcy5ob3N0LnNoYWRvd1Jvb3Q/LmFkZEV2ZW50TGlzdGVuZXI/LihcInNsb3RjaGFuZ2VcIiwgdGhpcy5oYW5kbGVTbG90Q2hhbmdlKTtcbiAgfVxuICBob3N0RGlzY29ubmVjdGVkKCkge1xuICAgIHRoaXMuaG9zdC5zaGFkb3dSb290Py5yZW1vdmVFdmVudExpc3RlbmVyPy4oXCJzbG90Y2hhbmdlXCIsIHRoaXMuaGFuZGxlU2xvdENoYW5nZSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIEhhc1Nsb3RDb250cm9sbGVyXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL3N0eWxlcy9jb21wb25lbnQvc2l6ZS5zdHlsZXMudHNcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJsaXRcIjtcbnZhciBzaXplX3N0eWxlc19kZWZhdWx0ID0gY3NzYFxuICA6aG9zdChbc2l6ZT0nc21hbGwnXSksXG4gIC53YS1zaXplLXMge1xuICAgIGZvbnQtc2l6ZTogdmFyKC0td2EtZm9udC1zaXplLXMpO1xuICB9XG5cbiAgOmhvc3QoW3NpemU9J21lZGl1bSddKSxcbiAgLndhLXNpemUtbSB7XG4gICAgZm9udC1zaXplOiB2YXIoLS13YS1mb250LXNpemUtbSk7XG4gIH1cblxuICA6aG9zdChbc2l6ZT0nbGFyZ2UnXSksXG4gIC53YS1zaXplLWwge1xuICAgIGZvbnQtc2l6ZTogdmFyKC0td2EtZm9udC1zaXplLWwpO1xuICB9XG5gO1xuXG5leHBvcnQge1xuICBzaXplX3N0eWxlc19kZWZhdWx0XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbi5zdHlsZXMudHNcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJsaXRcIjtcbnZhciBidXR0b25fc3R5bGVzX2RlZmF1bHQgPSBjc3NgXG4gIEBsYXllciB3YS1jb21wb25lbnQge1xuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblxuICAgICAgLyogV29ya2Fyb3VuZCBiZWNhdXNlIENocm9tZSBkb2Vzbid0IGxpa2UgOmhvc3QoOmhhcygpKSBiZWxvd1xuICAgICAgICogaHR0cHM6Ly9pc3N1ZXMuY2hyb21pdW0ub3JnL2lzc3Vlcy80MDA2MjM1NVxuICAgICAgICogRmlyZWZveCBkb2Vzbid0IGxpa2UgdGhpcyBuZXN0ZWQgcnVsZSwgc28gYm90aCBhcmUgbmVlZGVkICovXG4gICAgICAmOmhhcyh3YS1iYWRnZSkge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogQXBwbHkgcmVsYXRpdmUgcG9zaXRpb25pbmcgb25seSB3aGVuIG5lZWRlZCB0byBwb3NpdGlvbiB3YS1iYWRnZVxuICAgICAqIFRoaXMgYXZvaWRzIGNyZWF0aW5nIGEgbmV3IHN0YWNraW5nIGNvbnRleHQgZm9yIGV2ZXJ5IGJ1dHRvbiAqL1xuICAgIDpob3N0KDpoYXMod2EtYmFkZ2UpKSB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuICB9XG5cbiAgLmJ1dHRvbiB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogYmFja2dyb3VuZCwgYm9yZGVyLCBib3gtc2hhZG93LCBjb2xvciwgb3BhY2l0eTtcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiB2YXIoLS13YS10cmFuc2l0aW9uLWZhc3QpO1xuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS13YS10cmFuc2l0aW9uLWVhc2luZyk7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHBhZGRpbmc6IDAgdmFyKC0td2EtZm9ybS1jb250cm9sLXBhZGRpbmctaW5saW5lKTtcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgZm9udC13ZWlnaHQ6IHZhcigtLXdhLWZvbnQtd2VpZ2h0LWFjdGlvbik7XG4gICAgbGluZS1oZWlnaHQ6IGNhbGModmFyKC0td2EtZm9ybS1jb250cm9sLWhlaWdodCkgLSB2YXIoLS1ib3JkZXItd2lkdGgpICogMik7XG4gICAgaGVpZ2h0OiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtaGVpZ2h0KTtcbiAgICB3aWR0aDogMTAwJTtcblxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWNvbG9yLWZpbGwtbG91ZCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLWxvdWQpKTtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1sb3VkLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLWxvdWQpKTtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLXJhZGl1cyk7XG4gICAgYm9yZGVyLXN0eWxlOiB2YXIoLS13YS1ib3JkZXItc3R5bGUpO1xuICAgIGJvcmRlci13aWR0aDogdmFyKC0td2EtYm9yZGVyLXdpZHRoLXMpO1xuICB9XG5cbiAgLyogQXBwZWFyYW5jZSBtb2RpZmllcnMgKi9cbiAgOmhvc3QoW2FwcGVhcmFuY2U9J3BsYWluJ10pIHtcbiAgICAuYnV0dG9uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1xdWlldCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1xdWlldCkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICBAbWVkaWEgKGhvdmVyOiBob3Zlcikge1xuICAgICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmhvdmVyIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXdhLWNvbG9yLW9uLXF1aWV0LCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLXF1aWV0KSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWNvbG9yLWZpbGwtcXVpZXQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1xdWlldCkpO1xuICAgICAgfVxuICAgIH1cbiAgICAuYnV0dG9uOm5vdCguZGlzYWJsZWQpOm5vdCgubG9hZGluZyk6YWN0aXZlIHtcbiAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1xdWlldCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1xdWlldCkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICBpbiBva2xhYixcbiAgICAgICAgdmFyKC0td2EtY29sb3ItZmlsbC1xdWlldCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLXF1aWV0KSksXG4gICAgICAgIHZhcigtLXdhLWNvbG9yLW1peC1hY3RpdmUpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIDpob3N0KFthcHBlYXJhbmNlPSdvdXRsaW5lZCddKSB7XG4gICAgLmJ1dHRvbiB7XG4gICAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tcXVpZXQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tcXVpZXQpKTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS13YS1jb2xvci1ib3JkZXItbG91ZCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1ib3JkZXItbG91ZCkpO1xuICAgIH1cbiAgICBAbWVkaWEgKGhvdmVyOiBob3Zlcikge1xuICAgICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmhvdmVyIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXdhLWNvbG9yLW9uLXF1aWV0LCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLXF1aWV0KSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWNvbG9yLWZpbGwtcXVpZXQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1xdWlldCkpO1xuICAgICAgfVxuICAgIH1cbiAgICAuYnV0dG9uOm5vdCguZGlzYWJsZWQpOm5vdCgubG9hZGluZyk6YWN0aXZlIHtcbiAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1xdWlldCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1xdWlldCkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICBpbiBva2xhYixcbiAgICAgICAgdmFyKC0td2EtY29sb3ItZmlsbC1xdWlldCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLXF1aWV0KSksXG4gICAgICAgIHZhcigtLXdhLWNvbG9yLW1peC1hY3RpdmUpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIDpob3N0KFthcHBlYXJhbmNlPSdmaWxsZWQnXSkge1xuICAgIC5idXR0b24ge1xuICAgICAgY29sb3I6IHZhcigtLXdhLWNvbG9yLW9uLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1ub3JtYWwpKTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdhLWNvbG9yLWZpbGwtbm9ybWFsLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtbm9ybWFsKSk7XG4gICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICBAbWVkaWEgKGhvdmVyOiBob3Zlcikge1xuICAgICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmhvdmVyIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXdhLWNvbG9yLW9uLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1ub3JtYWwpKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICAgIGluIG9rbGFiLFxuICAgICAgICAgIHZhcigtLXdhLWNvbG9yLWZpbGwtbm9ybWFsLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtbm9ybWFsKSksXG4gICAgICAgICAgdmFyKC0td2EtY29sb3ItbWl4LWhvdmVyKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICAuYnV0dG9uOm5vdCguZGlzYWJsZWQpOm5vdCgubG9hZGluZyk6YWN0aXZlIHtcbiAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbm9ybWFsKSk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb2xvci1taXgoXG4gICAgICAgIGluIG9rbGFiLFxuICAgICAgICB2YXIoLS13YS1jb2xvci1maWxsLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLW5vcm1hbCkpLFxuICAgICAgICB2YXIoLS13YS1jb2xvci1taXgtYWN0aXZlKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICA6aG9zdChbYXBwZWFyYW5jZT0nZmlsbGVkLW91dGxpbmVkJ10pIHtcbiAgICAuYnV0dG9uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbm9ybWFsKSk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13YS1jb2xvci1maWxsLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLW5vcm1hbCkpO1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS13YS1jb2xvci1ib3JkZXItbm9ybWFsLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWJvcmRlci1ub3JtYWwpKTtcbiAgICB9XG4gICAgQG1lZGlhIChob3ZlcjogaG92ZXIpIHtcbiAgICAgIC5idXR0b246bm90KC5kaXNhYmxlZCk6bm90KC5sb2FkaW5nKTpob3ZlciB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13YS1jb2xvci1vbi1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbm9ybWFsKSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChcbiAgICAgICAgICBpbiBva2xhYixcbiAgICAgICAgICB2YXIoLS13YS1jb2xvci1maWxsLW5vcm1hbCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLW5vcm1hbCkpLFxuICAgICAgICAgIHZhcigtLXdhLWNvbG9yLW1peC1ob3ZlcilcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmFjdGl2ZSB7XG4gICAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tbm9ybWFsLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLW5vcm1hbCkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICBpbiBva2xhYixcbiAgICAgICAgdmFyKC0td2EtY29sb3ItZmlsbC1ub3JtYWwsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1ub3JtYWwpKSxcbiAgICAgICAgdmFyKC0td2EtY29sb3ItbWl4LWFjdGl2ZSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgOmhvc3QoW2FwcGVhcmFuY2U9J2FjY2VudCddKSB7XG4gICAgLmJ1dHRvbiB7XG4gICAgICBjb2xvcjogdmFyKC0td2EtY29sb3Itb24tbG91ZCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1vbi1sb3VkKSk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13YS1jb2xvci1maWxsLWxvdWQsIHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1sb3VkKSk7XG4gICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgICBAbWVkaWEgKGhvdmVyOiBob3Zlcikge1xuICAgICAgLmJ1dHRvbjpub3QoLmRpc2FibGVkKTpub3QoLmxvYWRpbmcpOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICAgIGluIG9rbGFiLFxuICAgICAgICAgIHZhcigtLXdhLWNvbG9yLWZpbGwtbG91ZCwgdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLWxvdWQpKSxcbiAgICAgICAgICB2YXIoLS13YS1jb2xvci1taXgtaG92ZXIpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIC5idXR0b246bm90KC5kaXNhYmxlZCk6bm90KC5sb2FkaW5nKTphY3RpdmUge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KFxuICAgICAgICBpbiBva2xhYixcbiAgICAgICAgdmFyKC0td2EtY29sb3ItZmlsbC1sb3VkLCB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtbG91ZCkpLFxuICAgICAgICB2YXIoLS13YS1jb2xvci1taXgtYWN0aXZlKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKiBGb2N1cyBzdGF0ZXMgKi9cbiAgLmJ1dHRvbjpmb2N1cyB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxuXG4gIC5idXR0b246Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogdmFyKC0td2EtZm9jdXMtcmluZyk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLXdhLWZvY3VzLXJpbmctb2Zmc2V0KTtcbiAgfVxuXG4gIC8qIERpc2FibGVkIHN0YXRlICovXG4gIDpob3N0KFtkaXNhYmxlZF0pIHtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcblxuICAgIC8qIFdoZW4gZGlzYWJsZWQsIHByZXZlbnQgbW91c2UgZXZlbnRzIGZyb20gYnViYmxpbmcgdXAgZnJvbSBjaGlsZHJlbiAqL1xuICAgIC5idXR0b24ge1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuICB9XG5cbiAgLyogS2VlcCBpdCBsYXN0IHNvIFNhZmFyaSBkb2Vzbid0IHN0b3AgcGFyc2luZyB0aGlzIGJsb2NrICovXG4gIC5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIge1xuICAgIGJvcmRlcjogMDtcbiAgfVxuXG4gIC8qIEljb24gYnV0dG9ucyAqL1xuICAuYnV0dG9uLmlzLWljb24tYnV0dG9uIHtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICAgIHdpZHRoOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtaGVpZ2h0KTtcbiAgICBhc3BlY3QtcmF0aW86IDE7XG4gIH1cblxuICAuYnV0dG9uLmlzLWljb24tYnV0dG9uOmhhcyh3YS1pY29uKSB7XG4gICAgd2lkdGg6IGF1dG87XG4gIH1cblxuICAvKiBQaWxsIG1vZGlmaWVyICovXG4gIDpob3N0KFtwaWxsXSkgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0td2EtYm9yZGVyLXJhZGl1cy1waWxsKTtcbiAgfVxuXG4gIC8qXG4gICAqIExhYmVsXG4gICAqL1xuXG4gIC5zdGFydCxcbiAgLmVuZCB7XG4gICAgZmxleDogMCAwIGF1dG87XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5cbiAgLmxhYmVsIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cblxuICAuaXMtaWNvbi1idXR0b24gLmxhYmVsIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICB9XG5cbiAgLmxhYmVsOjpzbG90dGVkKHdhLWljb24pIHtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gIH1cblxuICAvKlxuICAgKiBDYXJldCBtb2RpZmllclxuICAgKi9cblxuICB3YS1pY29uW3BhcnQ9J2NhcmV0J10ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAmOjpwYXJ0KHN2Zykge1xuICAgICAgd2lkdGg6IDAuODc1ZW07XG4gICAgICBoZWlnaHQ6IDAuODc1ZW07XG4gICAgfVxuXG4gICAgLmJ1dHRvbjpoYXMoJikgLmVuZCB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIExvYWRpbmcgbW9kaWZpZXJcbiAgICovXG5cbiAgLmxvYWRpbmcge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBjdXJzb3I6IHdhaXQ7XG5cbiAgICAuc3RhcnQsXG4gICAgLmxhYmVsLFxuICAgIC5lbmQsXG4gICAgLmNhcmV0IHtcbiAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICB9XG5cbiAgICB3YS1zcGlubmVyIHtcbiAgICAgIC0taW5kaWNhdG9yLWNvbG9yOiBjdXJyZW50Q29sb3I7XG4gICAgICAtLXRyYWNrLWNvbG9yOiBjb2xvci1taXgoaW4gb2tsYWIsIGN1cnJlbnRDb2xvciwgdHJhbnNwYXJlbnQgOTAlKTtcblxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgZm9udC1zaXplOiAxZW07XG4gICAgICBoZWlnaHQ6IDFlbTtcbiAgICAgIHdpZHRoOiAxZW07XG4gICAgICB0b3A6IGNhbGMoNTAlIC0gMC41ZW0pO1xuICAgICAgbGVmdDogY2FsYyg1MCUgLSAwLjVlbSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogQmFkZ2VzXG4gICAqL1xuXG4gIC5idXR0b24gOjpzbG90dGVkKHdhLWJhZGdlKSB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS13YS1jb2xvci1zdXJmYWNlLWRlZmF1bHQpO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldC1ibG9jay1zdGFydDogMDtcbiAgICBpbnNldC1pbmxpbmUtZW5kOiAwO1xuICAgIHRyYW5zbGF0ZTogNTAlIC01MCU7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIH1cblxuICA6aG9zdCg6ZGlyKHJ0bCkpIDo6c2xvdHRlZCh3YS1iYWRnZSkge1xuICAgIHRyYW5zbGF0ZTogLTUwJSAtNTAlO1xuICB9XG5cbiAgLypcbiAgKiBCdXR0b24gc3BhY2luZ1xuICAqL1xuXG4gIHNsb3RbbmFtZT0nc3RhcnQnXTo6c2xvdHRlZCgqKSB7XG4gICAgbWFyZ2luLWlubGluZS1lbmQ6IDAuNzVlbTtcbiAgfVxuXG4gIHNsb3RbbmFtZT0nZW5kJ106OnNsb3R0ZWQoKiksXG4gIC5idXR0b246bm90KC52aXN1YWxseS1oaWRkZW4tbGFiZWwpIFtwYXJ0PSdjYXJldCddIHtcbiAgICBtYXJnaW4taW5saW5lLXN0YXJ0OiAwLjc1ZW07XG4gIH1cblxuICAvKlxuICAgKiBCdXR0b24gZ3JvdXAgYm9yZGVyIHJhZGl1cyBtb2RpZmljYXRpb25zXG4gICAqL1xuXG4gIC8qIFJlbW92ZSBib3JkZXIgcmFkaXVzIGZyb20gYWxsIGdyb3VwZWQgYnV0dG9ucyBieSBkZWZhdWx0ICovXG4gIDpob3N0KC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbikgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgfVxuXG4gIC8qIEhvcml6b250YWwgb3JpZW50YXRpb24gKi9cbiAgOmhvc3QoLndhLWJ1dHRvbi1ncm91cF9faG9yaXpvbnRhbC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbi1maXJzdCkgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXN0YXJ0LXN0YXJ0LXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICAgIGJvcmRlci1lbmQtc3RhcnQtcmFkaXVzOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLXJhZGl1cyk7XG4gIH1cblxuICA6aG9zdCgud2EtYnV0dG9uLWdyb3VwX19ob3Jpem9udGFsLndhLWJ1dHRvbi1ncm91cF9fYnV0dG9uLWxhc3QpIC5idXR0b24ge1xuICAgIGJvcmRlci1zdGFydC1lbmQtcmFkaXVzOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLXJhZGl1cyk7XG4gICAgYm9yZGVyLWVuZC1lbmQtcmFkaXVzOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLXJhZGl1cyk7XG4gIH1cblxuICAvKiBWZXJ0aWNhbCBvcmllbnRhdGlvbiAqL1xuICA6aG9zdCgud2EtYnV0dG9uLWdyb3VwX192ZXJ0aWNhbCkge1xuICAgIGZsZXg6IDEgMSBhdXRvO1xuICB9XG5cbiAgOmhvc3QoLndhLWJ1dHRvbi1ncm91cF9fdmVydGljYWwpIC5idXR0b24ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogc3RhcnQ7XG4gIH1cblxuICA6aG9zdCgud2EtYnV0dG9uLWdyb3VwX192ZXJ0aWNhbC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbi1maXJzdCkgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXN0YXJ0LXN0YXJ0LXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICAgIGJvcmRlci1zdGFydC1lbmQtcmFkaXVzOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLXJhZGl1cyk7XG4gIH1cblxuICA6aG9zdCgud2EtYnV0dG9uLWdyb3VwX192ZXJ0aWNhbC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbi1sYXN0KSAuYnV0dG9uIHtcbiAgICBib3JkZXItZW5kLXN0YXJ0LXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICAgIGJvcmRlci1lbmQtZW5kLXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICB9XG5cbiAgLyogSGFuZGxlIHBpbGwgbW9kaWZpZXIgZm9yIGJ1dHRvbiBncm91cHMgKi9cbiAgOmhvc3QoW3BpbGxdLndhLWJ1dHRvbi1ncm91cF9faG9yaXpvbnRhbC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbi1maXJzdCkgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXN0YXJ0LXN0YXJ0LXJhZGl1czogdmFyKC0td2EtYm9yZGVyLXJhZGl1cy1waWxsKTtcbiAgICBib3JkZXItZW5kLXN0YXJ0LXJhZGl1czogdmFyKC0td2EtYm9yZGVyLXJhZGl1cy1waWxsKTtcbiAgfVxuXG4gIDpob3N0KFtwaWxsXS53YS1idXR0b24tZ3JvdXBfX2hvcml6b250YWwud2EtYnV0dG9uLWdyb3VwX19idXR0b24tbGFzdCkgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXN0YXJ0LWVuZC1yYWRpdXM6IHZhcigtLXdhLWJvcmRlci1yYWRpdXMtcGlsbCk7XG4gICAgYm9yZGVyLWVuZC1lbmQtcmFkaXVzOiB2YXIoLS13YS1ib3JkZXItcmFkaXVzLXBpbGwpO1xuICB9XG5cbiAgOmhvc3QoW3BpbGxdLndhLWJ1dHRvbi1ncm91cF9fdmVydGljYWwud2EtYnV0dG9uLWdyb3VwX19idXR0b24tZmlyc3QpIC5idXR0b24ge1xuICAgIGJvcmRlci1zdGFydC1zdGFydC1yYWRpdXM6IHZhcigtLXdhLWJvcmRlci1yYWRpdXMtcGlsbCk7XG4gICAgYm9yZGVyLXN0YXJ0LWVuZC1yYWRpdXM6IHZhcigtLXdhLWJvcmRlci1yYWRpdXMtcGlsbCk7XG4gIH1cblxuICA6aG9zdChbcGlsbF0ud2EtYnV0dG9uLWdyb3VwX192ZXJ0aWNhbC53YS1idXR0b24tZ3JvdXBfX2J1dHRvbi1sYXN0KSAuYnV0dG9uIHtcbiAgICBib3JkZXItZW5kLXN0YXJ0LXJhZGl1czogdmFyKC0td2EtYm9yZGVyLXJhZGl1cy1waWxsKTtcbiAgICBib3JkZXItZW5kLWVuZC1yYWRpdXM6IHZhcigtLXdhLWJvcmRlci1yYWRpdXMtcGlsbCk7XG4gIH1cbmA7XG5cbmV4cG9ydCB7XG4gIGJ1dHRvbl9zdHlsZXNfZGVmYXVsdFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9pbnRlcm5hbC93YXRjaC50c1xuZnVuY3Rpb24gd2F0Y2gocHJvcGVydHlOYW1lLCBvcHRpb25zKSB7XG4gIGNvbnN0IHJlc29sdmVkT3B0aW9ucyA9IHtcbiAgICB3YWl0VW50aWxGaXJzdFVwZGF0ZTogZmFsc2UsXG4gICAgLi4ub3B0aW9uc1xuICB9O1xuICByZXR1cm4gKHByb3RvLCBkZWNvcmF0ZWRGbk5hbWUpID0+IHtcbiAgICBjb25zdCB7IHVwZGF0ZSB9ID0gcHJvdG87XG4gICAgY29uc3Qgd2F0Y2hlZFByb3BlcnRpZXMgPSBBcnJheS5pc0FycmF5KHByb3BlcnR5TmFtZSkgPyBwcm9wZXJ0eU5hbWUgOiBbcHJvcGVydHlOYW1lXTtcbiAgICBwcm90by51cGRhdGUgPSBmdW5jdGlvbihjaGFuZ2VkUHJvcHMpIHtcbiAgICAgIHdhdGNoZWRQcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IHByb3BlcnR5O1xuICAgICAgICBpZiAoY2hhbmdlZFByb3BzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBjaGFuZ2VkUHJvcHMuZ2V0KGtleSk7XG4gICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzW2tleV07XG4gICAgICAgICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFyZXNvbHZlZE9wdGlvbnMud2FpdFVudGlsRmlyc3RVcGRhdGUgfHwgdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICAgICAgICAgIHRoaXNbZGVjb3JhdGVkRm5OYW1lXShvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB1cGRhdGUuY2FsbCh0aGlzLCBjaGFuZ2VkUHJvcHMpO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCB7XG4gIHdhdGNoXG59O1xuIiwgImNvbnN0IGNvbm5lY3RlZEVsZW1lbnRzID0gbmV3IFNldCgpO1xuY29uc3QgdHJhbnNsYXRpb25zID0gbmV3IE1hcCgpO1xubGV0IGZhbGxiYWNrO1xubGV0IGRvY3VtZW50RGlyZWN0aW9uID0gJ2x0cic7XG5sZXQgZG9jdW1lbnRMYW5ndWFnZSA9ICdlbic7XG5jb25zdCBpc0NsaWVudCA9ICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAhPT0gXCJ1bmRlZmluZWRcIik7XG5pZiAoaXNDbGllbnQpIHtcbiAgICBjb25zdCBkb2N1bWVudEVsZW1lbnRPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHVwZGF0ZSk7XG4gICAgZG9jdW1lbnREaXJlY3Rpb24gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGlyIHx8ICdsdHInO1xuICAgIGRvY3VtZW50TGFuZ3VhZ2UgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyB8fCBuYXZpZ2F0b3IubGFuZ3VhZ2U7XG4gICAgZG9jdW1lbnRFbGVtZW50T2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ2RpcicsICdsYW5nJ11cbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclRyYW5zbGF0aW9uKC4uLnRyYW5zbGF0aW9uKSB7XG4gICAgdHJhbnNsYXRpb24ubWFwKHQgPT4ge1xuICAgICAgICBjb25zdCBjb2RlID0gdC4kY29kZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAodHJhbnNsYXRpb25zLmhhcyhjb2RlKSkge1xuICAgICAgICAgICAgdHJhbnNsYXRpb25zLnNldChjb2RlLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRyYW5zbGF0aW9ucy5nZXQoY29kZSkpLCB0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2xhdGlvbnMuc2V0KGNvZGUsIHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZmFsbGJhY2spIHtcbiAgICAgICAgICAgIGZhbGxiYWNrID0gdDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHVwZGF0ZSgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAoaXNDbGllbnQpIHtcbiAgICAgICAgZG9jdW1lbnREaXJlY3Rpb24gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGlyIHx8ICdsdHInO1xuICAgICAgICBkb2N1bWVudExhbmd1YWdlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgfHwgbmF2aWdhdG9yLmxhbmd1YWdlO1xuICAgIH1cbiAgICBbLi4uY29ubmVjdGVkRWxlbWVudHMua2V5cygpXS5tYXAoKGVsKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgZWwucmVxdWVzdFVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZWwucmVxdWVzdFVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgY2xhc3MgTG9jYWxpemVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihob3N0KSB7XG4gICAgICAgIHRoaXMuaG9zdCA9IGhvc3Q7XG4gICAgICAgIHRoaXMuaG9zdC5hZGRDb250cm9sbGVyKHRoaXMpO1xuICAgIH1cbiAgICBob3N0Q29ubmVjdGVkKCkge1xuICAgICAgICBjb25uZWN0ZWRFbGVtZW50cy5hZGQodGhpcy5ob3N0KTtcbiAgICB9XG4gICAgaG9zdERpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgY29ubmVjdGVkRWxlbWVudHMuZGVsZXRlKHRoaXMuaG9zdCk7XG4gICAgfVxuICAgIGRpcigpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuaG9zdC5kaXIgfHwgZG9jdW1lbnREaXJlY3Rpb259YC50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBsYW5nKCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5ob3N0LmxhbmcgfHwgZG9jdW1lbnRMYW5ndWFnZX1gLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIGdldFRyYW5zbGF0aW9uRGF0YShsYW5nKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IGxvY2FsZSA9IG5ldyBJbnRsLkxvY2FsZShsYW5nLnJlcGxhY2UoL18vZywgJy0nKSk7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlID0gbG9jYWxlID09PSBudWxsIHx8IGxvY2FsZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbG9jYWxlLmxhbmd1YWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHJlZ2lvbiA9IChfYiA9IChfYSA9IGxvY2FsZSA9PT0gbnVsbCB8fCBsb2NhbGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxvY2FsZS5yZWdpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b0xvd2VyQ2FzZSgpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcbiAgICAgICAgY29uc3QgcHJpbWFyeSA9IHRyYW5zbGF0aW9ucy5nZXQoYCR7bGFuZ3VhZ2V9LSR7cmVnaW9ufWApO1xuICAgICAgICBjb25zdCBzZWNvbmRhcnkgPSB0cmFuc2xhdGlvbnMuZ2V0KGxhbmd1YWdlKTtcbiAgICAgICAgcmV0dXJuIHsgbG9jYWxlLCBsYW5ndWFnZSwgcmVnaW9uLCBwcmltYXJ5LCBzZWNvbmRhcnkgfTtcbiAgICB9XG4gICAgZXhpc3RzKGtleSwgb3B0aW9ucykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHsgcHJpbWFyeSwgc2Vjb25kYXJ5IH0gPSB0aGlzLmdldFRyYW5zbGF0aW9uRGF0YSgoX2EgPSBvcHRpb25zLmxhbmcpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMubGFuZygpKTtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyBpbmNsdWRlRmFsbGJhY2s6IGZhbHNlIH0sIG9wdGlvbnMpO1xuICAgICAgICBpZiAoKHByaW1hcnkgJiYgcHJpbWFyeVtrZXldKSB8fFxuICAgICAgICAgICAgKHNlY29uZGFyeSAmJiBzZWNvbmRhcnlba2V5XSkgfHxcbiAgICAgICAgICAgIChvcHRpb25zLmluY2x1ZGVGYWxsYmFjayAmJiBmYWxsYmFjayAmJiBmYWxsYmFja1trZXldKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0ZXJtKGtleSwgLi4uYXJncykge1xuICAgICAgICBjb25zdCB7IHByaW1hcnksIHNlY29uZGFyeSB9ID0gdGhpcy5nZXRUcmFuc2xhdGlvbkRhdGEodGhpcy5sYW5nKCkpO1xuICAgICAgICBsZXQgdGVybTtcbiAgICAgICAgaWYgKHByaW1hcnkgJiYgcHJpbWFyeVtrZXldKSB7XG4gICAgICAgICAgICB0ZXJtID0gcHJpbWFyeVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlY29uZGFyeSAmJiBzZWNvbmRhcnlba2V5XSkge1xuICAgICAgICAgICAgdGVybSA9IHNlY29uZGFyeVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZhbGxiYWNrICYmIGZhbGxiYWNrW2tleV0pIHtcbiAgICAgICAgICAgIHRlcm0gPSBmYWxsYmFja1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTm8gdHJhbnNsYXRpb24gZm91bmQgZm9yOiAke1N0cmluZyhrZXkpfWApO1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGVybSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRlcm0oLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRlcm07XG4gICAgfVxuICAgIGRhdGUoZGF0ZVRvRm9ybWF0LCBvcHRpb25zKSB7XG4gICAgICAgIGRhdGVUb0Zvcm1hdCA9IG5ldyBEYXRlKGRhdGVUb0Zvcm1hdCk7XG4gICAgICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxhbmcoKSwgb3B0aW9ucykuZm9ybWF0KGRhdGVUb0Zvcm1hdCk7XG4gICAgfVxuICAgIG51bWJlcihudW1iZXJUb0Zvcm1hdCwgb3B0aW9ucykge1xuICAgICAgICBudW1iZXJUb0Zvcm1hdCA9IE51bWJlcihudW1iZXJUb0Zvcm1hdCk7XG4gICAgICAgIHJldHVybiBpc05hTihudW1iZXJUb0Zvcm1hdCkgPyAnJyA6IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0aGlzLmxhbmcoKSwgb3B0aW9ucykuZm9ybWF0KG51bWJlclRvRm9ybWF0KTtcbiAgICB9XG4gICAgcmVsYXRpdmVUaW1lKHZhbHVlLCB1bml0LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW50bC5SZWxhdGl2ZVRpbWVGb3JtYXQodGhpcy5sYW5nKCksIG9wdGlvbnMpLmZvcm1hdCh2YWx1ZSwgdW5pdCk7XG4gICAgfVxufVxuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL3RyYW5zbGF0aW9ucy9lbi50c1xuaW1wb3J0IHsgcmVnaXN0ZXJUcmFuc2xhdGlvbiB9IGZyb20gXCJAc2hvZWxhY2Utc3R5bGUvbG9jYWxpemVcIjtcbnZhciB0cmFuc2xhdGlvbiA9IHtcbiAgJGNvZGU6IFwiZW5cIixcbiAgJG5hbWU6IFwiRW5nbGlzaFwiLFxuICAkZGlyOiBcImx0clwiLFxuICBjYXJvdXNlbDogXCJDYXJvdXNlbFwiLFxuICBjbGVhckVudHJ5OiBcIkNsZWFyIGVudHJ5XCIsXG4gIGNsb3NlOiBcIkNsb3NlXCIsXG4gIGNvcGllZDogXCJDb3BpZWRcIixcbiAgY29weTogXCJDb3B5XCIsXG4gIGN1cnJlbnRWYWx1ZTogXCJDdXJyZW50IHZhbHVlXCIsXG4gIGRyb3BGaWxlSGVyZTogXCJEcm9wIGZpbGUgaGVyZSBvciBjbGljayB0byBicm93c2VcIixcbiAgZGVjcmVtZW50OiBcIkRlY3JlbWVudFwiLFxuICBkcm9wRmlsZXNIZXJlOiBcIkRyb3AgZmlsZXMgaGVyZSBvciBjbGljayB0byBicm93c2VcIixcbiAgZXJyb3I6IFwiRXJyb3JcIixcbiAgZ29Ub1NsaWRlOiAoc2xpZGUsIGNvdW50KSA9PiBgR28gdG8gc2xpZGUgJHtzbGlkZX0gb2YgJHtjb3VudH1gLFxuICBoaWRlUGFzc3dvcmQ6IFwiSGlkZSBwYXNzd29yZFwiLFxuICBpbmNyZW1lbnQ6IFwiSW5jcmVtZW50XCIsXG4gIGxvYWRpbmc6IFwiTG9hZGluZ1wiLFxuICBuZXh0U2xpZGU6IFwiTmV4dCBzbGlkZVwiLFxuICBudW1PcHRpb25zU2VsZWN0ZWQ6IChudW0pID0+IHtcbiAgICBpZiAobnVtID09PSAwKSByZXR1cm4gXCJObyBvcHRpb25zIHNlbGVjdGVkXCI7XG4gICAgaWYgKG51bSA9PT0gMSkgcmV0dXJuIFwiMSBvcHRpb24gc2VsZWN0ZWRcIjtcbiAgICByZXR1cm4gYCR7bnVtfSBvcHRpb25zIHNlbGVjdGVkYDtcbiAgfSxcbiAgcGF1c2VBbmltYXRpb246IFwiUGF1c2UgYW5pbWF0aW9uXCIsXG4gIHBsYXlBbmltYXRpb246IFwiUGxheSBhbmltYXRpb25cIixcbiAgcHJldmlvdXNTbGlkZTogXCJQcmV2aW91cyBzbGlkZVwiLFxuICBwcm9ncmVzczogXCJQcm9ncmVzc1wiLFxuICByZW1vdmU6IFwiUmVtb3ZlXCIsXG4gIHJlc2l6ZTogXCJSZXNpemVcIixcbiAgc2Nyb2xsYWJsZVJlZ2lvbjogXCJTY3JvbGxhYmxlIHJlZ2lvblwiLFxuICBzY3JvbGxUb0VuZDogXCJTY3JvbGwgdG8gZW5kXCIsXG4gIHNjcm9sbFRvU3RhcnQ6IFwiU2Nyb2xsIHRvIHN0YXJ0XCIsXG4gIHNlbGVjdEFDb2xvckZyb21UaGVTY3JlZW46IFwiU2VsZWN0IGEgY29sb3IgZnJvbSB0aGUgc2NyZWVuXCIsXG4gIHNob3dQYXNzd29yZDogXCJTaG93IHBhc3N3b3JkXCIsXG4gIHNsaWRlTnVtOiAoc2xpZGUpID0+IGBTbGlkZSAke3NsaWRlfWAsXG4gIHRvZ2dsZUNvbG9yRm9ybWF0OiBcIlRvZ2dsZSBjb2xvciBmb3JtYXRcIixcbiAgem9vbUluOiBcIlpvb20gaW5cIixcbiAgem9vbU91dDogXCJab29tIG91dFwiXG59O1xucmVnaXN0ZXJUcmFuc2xhdGlvbih0cmFuc2xhdGlvbik7XG52YXIgZW5fZGVmYXVsdCA9IHRyYW5zbGF0aW9uO1xuXG5leHBvcnQge1xuICBlbl9kZWZhdWx0XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cbmltcG9ydCB7XG4gIGVuX2RlZmF1bHRcbn0gZnJvbSBcIi4vY2h1bmsuNzJXSk5ENVguanNcIjtcblxuLy8gc3JjL3V0aWxpdGllcy9sb2NhbGl6ZS50c1xuaW1wb3J0IHsgTG9jYWxpemVDb250cm9sbGVyIGFzIERlZmF1bHRMb2NhbGl6YXRpb25Db250cm9sbGVyLCByZWdpc3RlclRyYW5zbGF0aW9uIH0gZnJvbSBcIkBzaG9lbGFjZS1zdHlsZS9sb2NhbGl6ZVwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJUcmFuc2xhdGlvbiBhcyByZWdpc3RlclRyYW5zbGF0aW9uMiB9IGZyb20gXCJAc2hvZWxhY2Utc3R5bGUvbG9jYWxpemVcIjtcbnZhciBMb2NhbGl6ZUNvbnRyb2xsZXIgPSBjbGFzcyBleHRlbmRzIERlZmF1bHRMb2NhbGl6YXRpb25Db250cm9sbGVyIHtcbn07XG5yZWdpc3RlclRyYW5zbGF0aW9uKGVuX2RlZmF1bHQpO1xuXG5leHBvcnQge1xuICBMb2NhbGl6ZUNvbnRyb2xsZXIsXG4gIHJlZ2lzdGVyVHJhbnNsYXRpb24yIGFzIHJlZ2lzdGVyVHJhbnNsYXRpb25cbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvc3R5bGVzL2NvbXBvbmVudC92YXJpYW50cy5zdHlsZXMudHNcbmltcG9ydCB7IGNzcyB9IGZyb20gXCJsaXRcIjtcbnZhciB2YXJpYW50c19zdHlsZXNfZGVmYXVsdCA9IGNzc2BcbiAgOndoZXJlKDpyb290KSxcbiAgLndhLW5ldXRyYWwsXG4gIDpob3N0KFt2YXJpYW50PSduZXV0cmFsJ10pIHtcbiAgICAtLXdhLWNvbG9yLWZpbGwtbG91ZDogdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLWxvdWQpO1xuICAgIC0td2EtY29sb3ItZmlsbC1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1ub3JtYWwpO1xuICAgIC0td2EtY29sb3ItZmlsbC1xdWlldDogdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLXF1aWV0KTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1sb3VkOiB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWJvcmRlci1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtYm9yZGVyLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItcXVpZXQ6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtYm9yZGVyLXF1aWV0KTtcbiAgICAtLXdhLWNvbG9yLW9uLWxvdWQ6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbG91ZCk7XG4gICAgLS13YS1jb2xvci1vbi1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtb24tbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLW9uLXF1aWV0OiB2YXIoLS13YS1jb2xvci1uZXV0cmFsLW9uLXF1aWV0KTtcbiAgfVxuXG4gIC53YS1icmFuZCxcbiAgOmhvc3QoW3ZhcmlhbnQ9J2JyYW5kJ10pIHtcbiAgICAtLXdhLWNvbG9yLWZpbGwtbG91ZDogdmFyKC0td2EtY29sb3ItYnJhbmQtZmlsbC1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLWZpbGwtbm9ybWFsOiB2YXIoLS13YS1jb2xvci1icmFuZC1maWxsLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1maWxsLXF1aWV0OiB2YXIoLS13YS1jb2xvci1icmFuZC1maWxsLXF1aWV0KTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1sb3VkOiB2YXIoLS13YS1jb2xvci1icmFuZC1ib3JkZXItbG91ZCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItbm9ybWFsOiB2YXIoLS13YS1jb2xvci1icmFuZC1ib3JkZXItbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1xdWlldDogdmFyKC0td2EtY29sb3ItYnJhbmQtYm9yZGVyLXF1aWV0KTtcbiAgICAtLXdhLWNvbG9yLW9uLWxvdWQ6IHZhcigtLXdhLWNvbG9yLWJyYW5kLW9uLWxvdWQpO1xuICAgIC0td2EtY29sb3Itb24tbm9ybWFsOiB2YXIoLS13YS1jb2xvci1icmFuZC1vbi1ub3JtYWwpO1xuICAgIC0td2EtY29sb3Itb24tcXVpZXQ6IHZhcigtLXdhLWNvbG9yLWJyYW5kLW9uLXF1aWV0KTtcbiAgfVxuXG4gIC53YS1zdWNjZXNzLFxuICA6aG9zdChbdmFyaWFudD0nc3VjY2VzcyddKSB7XG4gICAgLS13YS1jb2xvci1maWxsLWxvdWQ6IHZhcigtLXdhLWNvbG9yLXN1Y2Nlc3MtZmlsbC1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLWZpbGwtbm9ybWFsOiB2YXIoLS13YS1jb2xvci1zdWNjZXNzLWZpbGwtbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLWZpbGwtcXVpZXQ6IHZhcigtLXdhLWNvbG9yLXN1Y2Nlc3MtZmlsbC1xdWlldCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItbG91ZDogdmFyKC0td2EtY29sb3Itc3VjY2Vzcy1ib3JkZXItbG91ZCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItbm9ybWFsOiB2YXIoLS13YS1jb2xvci1zdWNjZXNzLWJvcmRlci1ub3JtYWwpO1xuICAgIC0td2EtY29sb3ItYm9yZGVyLXF1aWV0OiB2YXIoLS13YS1jb2xvci1zdWNjZXNzLWJvcmRlci1xdWlldCk7XG4gICAgLS13YS1jb2xvci1vbi1sb3VkOiB2YXIoLS13YS1jb2xvci1zdWNjZXNzLW9uLWxvdWQpO1xuICAgIC0td2EtY29sb3Itb24tbm9ybWFsOiB2YXIoLS13YS1jb2xvci1zdWNjZXNzLW9uLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1vbi1xdWlldDogdmFyKC0td2EtY29sb3Itc3VjY2Vzcy1vbi1xdWlldCk7XG4gIH1cblxuICAud2Etd2FybmluZyxcbiAgOmhvc3QoW3ZhcmlhbnQ9J3dhcm5pbmcnXSkge1xuICAgIC0td2EtY29sb3ItZmlsbC1sb3VkOiB2YXIoLS13YS1jb2xvci13YXJuaW5nLWZpbGwtbG91ZCk7XG4gICAgLS13YS1jb2xvci1maWxsLW5vcm1hbDogdmFyKC0td2EtY29sb3Itd2FybmluZy1maWxsLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1maWxsLXF1aWV0OiB2YXIoLS13YS1jb2xvci13YXJuaW5nLWZpbGwtcXVpZXQpO1xuICAgIC0td2EtY29sb3ItYm9yZGVyLWxvdWQ6IHZhcigtLXdhLWNvbG9yLXdhcm5pbmctYm9yZGVyLWxvdWQpO1xuICAgIC0td2EtY29sb3ItYm9yZGVyLW5vcm1hbDogdmFyKC0td2EtY29sb3Itd2FybmluZy1ib3JkZXItbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1xdWlldDogdmFyKC0td2EtY29sb3Itd2FybmluZy1ib3JkZXItcXVpZXQpO1xuICAgIC0td2EtY29sb3Itb24tbG91ZDogdmFyKC0td2EtY29sb3Itd2FybmluZy1vbi1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLW9uLW5vcm1hbDogdmFyKC0td2EtY29sb3Itd2FybmluZy1vbi1ub3JtYWwpO1xuICAgIC0td2EtY29sb3Itb24tcXVpZXQ6IHZhcigtLXdhLWNvbG9yLXdhcm5pbmctb24tcXVpZXQpO1xuICB9XG5cbiAgLndhLWRhbmdlcixcbiAgOmhvc3QoW3ZhcmlhbnQ9J2RhbmdlciddKSB7XG4gICAgLS13YS1jb2xvci1maWxsLWxvdWQ6IHZhcigtLXdhLWNvbG9yLWRhbmdlci1maWxsLWxvdWQpO1xuICAgIC0td2EtY29sb3ItZmlsbC1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLWRhbmdlci1maWxsLW5vcm1hbCk7XG4gICAgLS13YS1jb2xvci1maWxsLXF1aWV0OiB2YXIoLS13YS1jb2xvci1kYW5nZXItZmlsbC1xdWlldCk7XG4gICAgLS13YS1jb2xvci1ib3JkZXItbG91ZDogdmFyKC0td2EtY29sb3ItZGFuZ2VyLWJvcmRlci1sb3VkKTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLWRhbmdlci1ib3JkZXItbm9ybWFsKTtcbiAgICAtLXdhLWNvbG9yLWJvcmRlci1xdWlldDogdmFyKC0td2EtY29sb3ItZGFuZ2VyLWJvcmRlci1xdWlldCk7XG4gICAgLS13YS1jb2xvci1vbi1sb3VkOiB2YXIoLS13YS1jb2xvci1kYW5nZXItb24tbG91ZCk7XG4gICAgLS13YS1jb2xvci1vbi1ub3JtYWw6IHZhcigtLXdhLWNvbG9yLWRhbmdlci1vbi1ub3JtYWwpO1xuICAgIC0td2EtY29sb3Itb24tcXVpZXQ6IHZhcigtLXdhLWNvbG9yLWRhbmdlci1vbi1xdWlldCk7XG4gIH1cbmA7XG5cbmV4cG9ydCB7XG4gIHZhcmlhbnRzX3N0eWxlc19kZWZhdWx0XG59O1xuIiwgIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuXG5pbXBvcnQge0Rpc2Nvbm5lY3RhYmxlLCBQYXJ0fSBmcm9tICcuL2xpdC1odG1sLmpzJztcblxuZXhwb3J0IHtcbiAgQXR0cmlidXRlUGFydCxcbiAgQm9vbGVhbkF0dHJpYnV0ZVBhcnQsXG4gIENoaWxkUGFydCxcbiAgRWxlbWVudFBhcnQsXG4gIEV2ZW50UGFydCxcbiAgUGFydCxcbiAgUHJvcGVydHlQYXJ0LFxufSBmcm9tICcuL2xpdC1odG1sLmpzJztcblxuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RpdmVDbGFzcyB7XG4gIG5ldyAocGFydDogUGFydEluZm8pOiBEaXJlY3RpdmU7XG59XG5cbi8qKlxuICogVGhpcyB1dGlsaXR5IHR5cGUgZXh0cmFjdHMgdGhlIHNpZ25hdHVyZSBvZiBhIGRpcmVjdGl2ZSBjbGFzcydzIHJlbmRlcigpXG4gKiBtZXRob2Qgc28gd2UgY2FuIHVzZSBpdCBmb3IgdGhlIHR5cGUgb2YgdGhlIGdlbmVyYXRlZCBkaXJlY3RpdmUgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCB0eXBlIERpcmVjdGl2ZVBhcmFtZXRlcnM8QyBleHRlbmRzIERpcmVjdGl2ZT4gPSBQYXJhbWV0ZXJzPENbJ3JlbmRlciddPjtcblxuLyoqXG4gKiBBIGdlbmVyYXRlZCBkaXJlY3RpdmUgZnVuY3Rpb24gZG9lc24ndCBldmFsdWF0ZSB0aGUgZGlyZWN0aXZlLCBidXQganVzdFxuICogcmV0dXJucyBhIERpcmVjdGl2ZVJlc3VsdCBvYmplY3QgdGhhdCBjYXB0dXJlcyB0aGUgYXJndW1lbnRzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERpcmVjdGl2ZVJlc3VsdDxDIGV4dGVuZHMgRGlyZWN0aXZlQ2xhc3MgPSBEaXJlY3RpdmVDbGFzcz4ge1xuICAvKipcbiAgICogVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBbJ18kbGl0RGlyZWN0aXZlJCddOiBDO1xuICAvKiogQGludGVybmFsICovXG4gIHZhbHVlczogRGlyZWN0aXZlUGFyYW1ldGVyczxJbnN0YW5jZVR5cGU8Qz4+O1xufVxuXG5leHBvcnQgY29uc3QgUGFydFR5cGUgPSB7XG4gIEFUVFJJQlVURTogMSxcbiAgQ0hJTEQ6IDIsXG4gIFBST1BFUlRZOiAzLFxuICBCT09MRUFOX0FUVFJJQlVURTogNCxcbiAgRVZFTlQ6IDUsXG4gIEVMRU1FTlQ6IDYsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBQYXJ0VHlwZSA9ICh0eXBlb2YgUGFydFR5cGUpW2tleW9mIHR5cGVvZiBQYXJ0VHlwZV07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hpbGRQYXJ0SW5mbyB7XG4gIHJlYWRvbmx5IHR5cGU6IHR5cGVvZiBQYXJ0VHlwZS5DSElMRDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBdHRyaWJ1dGVQYXJ0SW5mbyB7XG4gIHJlYWRvbmx5IHR5cGU6XG4gICAgfCB0eXBlb2YgUGFydFR5cGUuQVRUUklCVVRFXG4gICAgfCB0eXBlb2YgUGFydFR5cGUuUFJPUEVSVFlcbiAgICB8IHR5cGVvZiBQYXJ0VHlwZS5CT09MRUFOX0FUVFJJQlVURVxuICAgIHwgdHlwZW9mIFBhcnRUeXBlLkVWRU5UO1xuICByZWFkb25seSBzdHJpbmdzPzogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xuICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHRhZ05hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbGVtZW50UGFydEluZm8ge1xuICByZWFkb25seSB0eXBlOiB0eXBlb2YgUGFydFR5cGUuRUxFTUVOVDtcbn1cblxuLyoqXG4gKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgcGFydCBhIGRpcmVjdGl2ZSBpcyBib3VuZCB0by5cbiAqXG4gKiBUaGlzIGlzIHVzZWZ1bCBmb3IgY2hlY2tpbmcgdGhhdCBhIGRpcmVjdGl2ZSBpcyBhdHRhY2hlZCB0byBhIHZhbGlkIHBhcnQsXG4gKiBzdWNoIGFzIHdpdGggZGlyZWN0aXZlIHRoYXQgY2FuIG9ubHkgYmUgdXNlZCBvbiBhdHRyaWJ1dGUgYmluZGluZ3MuXG4gKi9cbmV4cG9ydCB0eXBlIFBhcnRJbmZvID0gQ2hpbGRQYXJ0SW5mbyB8IEF0dHJpYnV0ZVBhcnRJbmZvIHwgRWxlbWVudFBhcnRJbmZvO1xuXG4vKipcbiAqIENyZWF0ZXMgYSB1c2VyLWZhY2luZyBkaXJlY3RpdmUgZnVuY3Rpb24gZnJvbSBhIERpcmVjdGl2ZSBjbGFzcy4gVGhpc1xuICogZnVuY3Rpb24gaGFzIHRoZSBzYW1lIHBhcmFtZXRlcnMgYXMgdGhlIGRpcmVjdGl2ZSdzIHJlbmRlcigpIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRpcmVjdGl2ZSA9XG4gIDxDIGV4dGVuZHMgRGlyZWN0aXZlQ2xhc3M+KGM6IEMpID0+XG4gICguLi52YWx1ZXM6IERpcmVjdGl2ZVBhcmFtZXRlcnM8SW5zdGFuY2VUeXBlPEM+Pik6IERpcmVjdGl2ZVJlc3VsdDxDPiA9PiAoe1xuICAgIC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gICAgWydfJGxpdERpcmVjdGl2ZSQnXTogYyxcbiAgICB2YWx1ZXMsXG4gIH0pO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGNyZWF0aW5nIGN1c3RvbSBkaXJlY3RpdmVzLiBVc2VycyBzaG91bGQgZXh0ZW5kIHRoaXMgY2xhc3MsXG4gKiBpbXBsZW1lbnQgYHJlbmRlcmAgYW5kL29yIGB1cGRhdGVgLCBhbmQgdGhlbiBwYXNzIHRoZWlyIHN1YmNsYXNzIHRvXG4gKiBgZGlyZWN0aXZlYC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERpcmVjdGl2ZSBpbXBsZW1lbnRzIERpc2Nvbm5lY3RhYmxlIHtcbiAgLy9AaW50ZXJuYWxcbiAgX19wYXJ0ITogUGFydDtcbiAgLy9AaW50ZXJuYWxcbiAgX19hdHRyaWJ1dGVJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAvL0BpbnRlcm5hbFxuICBfX2RpcmVjdGl2ZT86IERpcmVjdGl2ZTtcblxuICAvL0BpbnRlcm5hbFxuICBfJHBhcmVudCE6IERpc2Nvbm5lY3RhYmxlO1xuXG4gIC8vIFRoZXNlIHdpbGwgb25seSBleGlzdCBvbiB0aGUgQXN5bmNEaXJlY3RpdmUgc3ViY2xhc3NcbiAgLy9AaW50ZXJuYWxcbiAgXyRkaXNjb25uZWN0YWJsZUNoaWxkcmVuPzogU2V0PERpc2Nvbm5lY3RhYmxlPjtcbiAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgLy9AaW50ZXJuYWxcbiAgWydfJG5vdGlmeURpcmVjdGl2ZUNvbm5lY3Rpb25DaGFuZ2VkJ10/KGlzQ29ubmVjdGVkOiBib29sZWFuKTogdm9pZDtcblxuICBjb25zdHJ1Y3RvcihfcGFydEluZm86IFBhcnRJbmZvKSB7fVxuXG4gIC8vIFNlZSBjb21tZW50IGluIERpc2Nvbm5lY3RhYmxlIGludGVyZmFjZSBmb3Igd2h5IHRoaXMgaXMgYSBnZXR0ZXJcbiAgZ2V0IF8kaXNDb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuXyRwYXJlbnQuXyRpc0Nvbm5lY3RlZDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRpbml0aWFsaXplKFxuICAgIHBhcnQ6IFBhcnQsXG4gICAgcGFyZW50OiBEaXNjb25uZWN0YWJsZSxcbiAgICBhdHRyaWJ1dGVJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHRoaXMuX19wYXJ0ID0gcGFydDtcbiAgICB0aGlzLl8kcGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX19hdHRyaWJ1dGVJbmRleCA9IGF0dHJpYnV0ZUluZGV4O1xuICB9XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgXyRyZXNvbHZlKHBhcnQ6IFBhcnQsIHByb3BzOiBBcnJheTx1bmtub3duPik6IHVua25vd24ge1xuICAgIHJldHVybiB0aGlzLnVwZGF0ZShwYXJ0LCBwcm9wcyk7XG4gIH1cblxuICBhYnN0cmFjdCByZW5kZXIoLi4ucHJvcHM6IEFycmF5PHVua25vd24+KTogdW5rbm93bjtcblxuICB1cGRhdGUoX3BhcnQ6IFBhcnQsIHByb3BzOiBBcnJheTx1bmtub3duPik6IHVua25vd24ge1xuICAgIHJldHVybiB0aGlzLnJlbmRlciguLi5wcm9wcyk7XG4gIH1cbn1cbiIsICIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cblxuaW1wb3J0IHtBdHRyaWJ1dGVQYXJ0LCBub0NoYW5nZX0gZnJvbSAnLi4vbGl0LWh0bWwuanMnO1xuaW1wb3J0IHtcbiAgZGlyZWN0aXZlLFxuICBEaXJlY3RpdmUsXG4gIERpcmVjdGl2ZVBhcmFtZXRlcnMsXG4gIFBhcnRJbmZvLFxuICBQYXJ0VHlwZSxcbn0gZnJvbSAnLi4vZGlyZWN0aXZlLmpzJztcblxuLyoqXG4gKiBBIGtleS12YWx1ZSBzZXQgb2YgY2xhc3MgbmFtZXMgdG8gdHJ1dGh5IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDbGFzc0luZm8ge1xuICBbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlcjtcbn1cblxuY2xhc3MgQ2xhc3NNYXBEaXJlY3RpdmUgZXh0ZW5kcyBEaXJlY3RpdmUge1xuICAvKipcbiAgICogU3RvcmVzIHRoZSBDbGFzc0luZm8gb2JqZWN0IGFwcGxpZWQgdG8gYSBnaXZlbiBBdHRyaWJ1dGVQYXJ0LlxuICAgKiBVc2VkIHRvIHVuc2V0IGV4aXN0aW5nIHZhbHVlcyB3aGVuIGEgbmV3IENsYXNzSW5mbyBvYmplY3QgaXMgYXBwbGllZC5cbiAgICovXG4gIHByaXZhdGUgX3ByZXZpb3VzQ2xhc3Nlcz86IFNldDxzdHJpbmc+O1xuICBwcml2YXRlIF9zdGF0aWNDbGFzc2VzPzogU2V0PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IocGFydEluZm86IFBhcnRJbmZvKSB7XG4gICAgc3VwZXIocGFydEluZm8pO1xuICAgIGlmIChcbiAgICAgIHBhcnRJbmZvLnR5cGUgIT09IFBhcnRUeXBlLkFUVFJJQlVURSB8fFxuICAgICAgcGFydEluZm8ubmFtZSAhPT0gJ2NsYXNzJyB8fFxuICAgICAgKHBhcnRJbmZvLnN0cmluZ3M/Lmxlbmd0aCBhcyBudW1iZXIpID4gMlxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYGNsYXNzTWFwKClgIGNhbiBvbmx5IGJlIHVzZWQgaW4gdGhlIGBjbGFzc2AgYXR0cmlidXRlICcgK1xuICAgICAgICAgICdhbmQgbXVzdCBiZSB0aGUgb25seSBwYXJ0IGluIHRoZSBhdHRyaWJ1dGUuJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoY2xhc3NJbmZvOiBDbGFzc0luZm8pIHtcbiAgICAvLyBBZGQgc3BhY2VzIHRvIGVuc3VyZSBzZXBhcmF0aW9uIGZyb20gc3RhdGljIGNsYXNzZXNcbiAgICByZXR1cm4gKFxuICAgICAgJyAnICtcbiAgICAgIE9iamVjdC5rZXlzKGNsYXNzSW5mbylcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBjbGFzc0luZm9ba2V5XSlcbiAgICAgICAgLmpvaW4oJyAnKSArXG4gICAgICAnICdcbiAgICApO1xuICB9XG5cbiAgb3ZlcnJpZGUgdXBkYXRlKHBhcnQ6IEF0dHJpYnV0ZVBhcnQsIFtjbGFzc0luZm9dOiBEaXJlY3RpdmVQYXJhbWV0ZXJzPHRoaXM+KSB7XG4gICAgLy8gUmVtZW1iZXIgZHluYW1pYyBjbGFzc2VzIG9uIHRoZSBmaXJzdCByZW5kZXJcbiAgICBpZiAodGhpcy5fcHJldmlvdXNDbGFzc2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3ByZXZpb3VzQ2xhc3NlcyA9IG5ldyBTZXQoKTtcbiAgICAgIGlmIChwYXJ0LnN0cmluZ3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9zdGF0aWNDbGFzc2VzID0gbmV3IFNldChcbiAgICAgICAgICBwYXJ0LnN0cmluZ3NcbiAgICAgICAgICAgIC5qb2luKCcgJylcbiAgICAgICAgICAgIC5zcGxpdCgvXFxzLylcbiAgICAgICAgICAgIC5maWx0ZXIoKHMpID0+IHMgIT09ICcnKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBuYW1lIGluIGNsYXNzSW5mbykge1xuICAgICAgICBpZiAoY2xhc3NJbmZvW25hbWVdICYmICF0aGlzLl9zdGF0aWNDbGFzc2VzPy5oYXMobmFtZSkpIHtcbiAgICAgICAgICB0aGlzLl9wcmV2aW91c0NsYXNzZXMuYWRkKG5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXIoY2xhc3NJbmZvKTtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc0xpc3QgPSBwYXJ0LmVsZW1lbnQuY2xhc3NMaXN0O1xuXG4gICAgLy8gUmVtb3ZlIG9sZCBjbGFzc2VzIHRoYXQgbm8gbG9uZ2VyIGFwcGx5XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMuX3ByZXZpb3VzQ2xhc3Nlcykge1xuICAgICAgaWYgKCEobmFtZSBpbiBjbGFzc0luZm8pKSB7XG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzQ2xhc3NlcyEuZGVsZXRlKG5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBvciByZW1vdmUgY2xhc3NlcyBiYXNlZCBvbiB0aGVpciBjbGFzc01hcCB2YWx1ZVxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBjbGFzc0luZm8pIHtcbiAgICAgIC8vIFdlIGV4cGxpY2l0bHkgd2FudCBhIGxvb3NlIHRydXRoeSBjaGVjayBvZiBgdmFsdWVgIGJlY2F1c2UgaXQgc2VlbXNcbiAgICAgIC8vIG1vcmUgY29udmVuaWVudCB0aGF0ICcnIGFuZCAwIGFyZSBza2lwcGVkLlxuICAgICAgY29uc3QgdmFsdWUgPSAhIWNsYXNzSW5mb1tuYW1lXTtcbiAgICAgIGlmIChcbiAgICAgICAgdmFsdWUgIT09IHRoaXMuX3ByZXZpb3VzQ2xhc3Nlcy5oYXMobmFtZSkgJiZcbiAgICAgICAgIXRoaXMuX3N0YXRpY0NsYXNzZXM/LmhhcyhuYW1lKVxuICAgICAgKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIGNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgICAgICAgdGhpcy5fcHJldmlvdXNDbGFzc2VzLmFkZChuYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgICAgICAgIHRoaXMuX3ByZXZpb3VzQ2xhc3Nlcy5kZWxldGUobmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vQ2hhbmdlO1xuICB9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBhcHBsaWVzIGR5bmFtaWMgQ1NTIGNsYXNzZXMuXG4gKlxuICogVGhpcyBtdXN0IGJlIHVzZWQgaW4gdGhlIGBjbGFzc2AgYXR0cmlidXRlIGFuZCBtdXN0IGJlIHRoZSBvbmx5IHBhcnQgdXNlZCBpblxuICogdGhlIGF0dHJpYnV0ZS4gSXQgdGFrZXMgZWFjaCBwcm9wZXJ0eSBpbiB0aGUgYGNsYXNzSW5mb2AgYXJndW1lbnQgYW5kIGFkZHNcbiAqIHRoZSBwcm9wZXJ0eSBuYW1lIHRvIHRoZSBlbGVtZW50J3MgYGNsYXNzTGlzdGAgaWYgdGhlIHByb3BlcnR5IHZhbHVlIGlzXG4gKiB0cnV0aHk7IGlmIHRoZSBwcm9wZXJ0eSB2YWx1ZSBpcyBmYWxzeSwgdGhlIHByb3BlcnR5IG5hbWUgaXMgcmVtb3ZlZCBmcm9tXG4gKiB0aGUgZWxlbWVudCdzIGBjbGFzc2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYHtmb286IGJhcn1gIGFwcGxpZXMgdGhlIGNsYXNzIGBmb29gIGlmIHRoZSB2YWx1ZSBvZiBgYmFyYCBpc1xuICogdHJ1dGh5LlxuICpcbiAqIEBwYXJhbSBjbGFzc0luZm9cbiAqL1xuZXhwb3J0IGNvbnN0IGNsYXNzTWFwID0gZGlyZWN0aXZlKENsYXNzTWFwRGlyZWN0aXZlKTtcblxuLyoqXG4gKiBUaGUgdHlwZSBvZiB0aGUgY2xhc3MgdGhhdCBwb3dlcnMgdGhpcyBkaXJlY3RpdmUuIE5lY2Vzc2FyeSBmb3IgbmFtaW5nIHRoZVxuICogZGlyZWN0aXZlJ3MgcmV0dXJuIHR5cGUuXG4gKi9cbmV4cG9ydCB0eXBlIHtDbGFzc01hcERpcmVjdGl2ZX07XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbmltcG9ydCB7bm90aGluZ30gZnJvbSAnLi4vbGl0LWh0bWwuanMnO1xuXG4vKipcbiAqIEZvciBBdHRyaWJ1dGVQYXJ0cywgc2V0cyB0aGUgYXR0cmlidXRlIGlmIHRoZSB2YWx1ZSBpcyBkZWZpbmVkIGFuZCByZW1vdmVzXG4gKiB0aGUgYXR0cmlidXRlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gKlxuICogRm9yIG90aGVyIHBhcnQgdHlwZXMsIHRoaXMgZGlyZWN0aXZlIGlzIGEgbm8tb3AuXG4gKi9cbmV4cG9ydCBjb25zdCBpZkRlZmluZWQgPSA8VD4odmFsdWU6IFQpID0+IHZhbHVlID8/IG5vdGhpbmc7XG4iLCAiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG5cbi8vIEFueSBuZXcgZXhwb3J0cyBuZWVkIHRvIGJlIGFkZGVkIHRvIHRoZSBleHBvcnQgc3RhdGVtZW50IGluXG4vLyBgcGFja2FnZXMvbGl0L3NyYy9pbmRleC5hbGwudHNgLlxuXG5pbXBvcnQge1xuICBodG1sIGFzIGNvcmVIdG1sLFxuICBzdmcgYXMgY29yZVN2ZyxcbiAgbWF0aG1sIGFzIGNvcmVNYXRobWwsXG4gIFRlbXBsYXRlUmVzdWx0LFxufSBmcm9tICcuL2xpdC1odG1sLmpzJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0aWNWYWx1ZSB7XG4gIC8qKiBUaGUgdmFsdWUgdG8gaW50ZXJwb2xhdGUgYXMtaXMgaW50byB0aGUgdGVtcGxhdGUuICovXG4gIF8kbGl0U3RhdGljJDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHZhbHVlIHRoYXQgY2FuJ3QgYmUgZGVjb2RlZCBmcm9tIG9yZGluYXJ5IEpTT04sIG1ha2UgaXQgaGFyZGVyIGZvclxuICAgKiBhbiBhdHRhY2tlci1jb250cm9sbGVkIGRhdGEgdGhhdCBnb2VzIHRocm91Z2ggSlNPTi5wYXJzZSB0byBwcm9kdWNlIGEgdmFsaWRcbiAgICogU3RhdGljVmFsdWUuXG4gICAqL1xuICByOiB0eXBlb2YgYnJhbmQ7XG59XG5cbi8qKlxuICogUHJldmVudHMgSlNPTiBpbmplY3Rpb24gYXR0YWNrcy5cbiAqXG4gKiBUaGUgZ29hbHMgb2YgdGhpcyBicmFuZDpcbiAqICAgMSkgZmFzdCB0byBjaGVja1xuICogICAyKSBjb2RlIGlzIHNtYWxsIG9uIHRoZSB3aXJlXG4gKiAgIDMpIG11bHRpcGxlIHZlcnNpb25zIG9mIExpdCBpbiBhIHNpbmdsZSBwYWdlIHdpbGwgYWxsIHByb2R1Y2UgbXV0dWFsbHlcbiAqICAgICAgaW50ZXJvcGVyYWJsZSBTdGF0aWNWYWx1ZXNcbiAqICAgNCkgbm9ybWFsIEpTT04ucGFyc2UgKHdpdGhvdXQgYW4gdW51c3VhbCByZXZpdmVyKSBjYW4gbm90IHByb2R1Y2UgYVxuICogICAgICBTdGF0aWNWYWx1ZVxuICpcbiAqIFN5bWJvbHMgc2F0aXNmeSAoMSksICgyKSwgYW5kICg0KS4gV2UgdXNlIFN5bWJvbC5mb3IgdG8gc2F0aXNmeSAoMyksIGJ1dFxuICogd2UgZG9uJ3QgY2FyZSBhYm91dCB0aGUga2V5LCBzbyB3ZSBicmVhayB0aWVzIHZpYSAoMikgYW5kIHVzZSB0aGUgZW1wdHlcbiAqIHN0cmluZy5cbiAqL1xuY29uc3QgYnJhbmQgPSBTeW1ib2wuZm9yKCcnKTtcblxuLyoqIFNhZmVseSBleHRyYWN0cyB0aGUgc3RyaW5nIHBhcnQgb2YgYSBTdGF0aWNWYWx1ZS4gKi9cbmNvbnN0IHVud3JhcFN0YXRpY1ZhbHVlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKCh2YWx1ZSBhcyBQYXJ0aWFsPFN0YXRpY1ZhbHVlPik/LnIgIT09IGJyYW5kKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gKHZhbHVlIGFzIFBhcnRpYWw8U3RhdGljVmFsdWU+KT8uWydfJGxpdFN0YXRpYyQnXTtcbn07XG5cbi8qKlxuICogV3JhcHMgYSBzdHJpbmcgc28gdGhhdCBpdCBiZWhhdmVzIGxpa2UgcGFydCBvZiB0aGUgc3RhdGljIHRlbXBsYXRlXG4gKiBzdHJpbmdzIGluc3RlYWQgb2YgYSBkeW5hbWljIHZhbHVlLlxuICpcbiAqIFVzZXJzIG11c3QgdGFrZSBjYXJlIHRvIGVuc3VyZSB0aGF0IGFkZGluZyB0aGUgc3RhdGljIHN0cmluZyB0byB0aGUgdGVtcGxhdGVcbiAqIHJlc3VsdHMgaW4gd2VsbC1mb3JtZWQgSFRNTCwgb3IgZWxzZSB0ZW1wbGF0ZXMgbWF5IGJyZWFrIHVuZXhwZWN0ZWRseS5cbiAqXG4gKiBOb3RlIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyB1bnNhZmUgdG8gdXNlIG9uIHVudHJ1c3RlZCBjb250ZW50LCBhcyBpdCB3aWxsIGJlXG4gKiBkaXJlY3RseSBwYXJzZWQgaW50byBIVE1MLiBEbyBub3QgcGFzcyB1c2VyIGlucHV0IHRvIHRoaXMgZnVuY3Rpb25cbiAqIHdpdGhvdXQgc2FuaXRpemluZyBpdC5cbiAqXG4gKiBTdGF0aWMgdmFsdWVzIGNhbiBiZSBjaGFuZ2VkLCBidXQgdGhleSB3aWxsIGNhdXNlIGEgY29tcGxldGUgcmUtcmVuZGVyXG4gKiBzaW5jZSB0aGV5IGVmZmVjdGl2ZWx5IGNyZWF0ZSBhIG5ldyB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHVuc2FmZVN0YXRpYyA9ICh2YWx1ZTogc3RyaW5nKTogU3RhdGljVmFsdWUgPT4gKHtcbiAgWydfJGxpdFN0YXRpYyQnXTogdmFsdWUsXG4gIHI6IGJyYW5kLFxufSk7XG5cbmNvbnN0IHRleHRGcm9tU3RhdGljID0gKHZhbHVlOiBTdGF0aWNWYWx1ZSkgPT4ge1xuICBpZiAodmFsdWVbJ18kbGl0U3RhdGljJCddICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdmFsdWVbJ18kbGl0U3RhdGljJCddO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBWYWx1ZSBwYXNzZWQgdG8gJ2xpdGVyYWwnIGZ1bmN0aW9uIG11c3QgYmUgYSAnbGl0ZXJhbCcgcmVzdWx0OiAke3ZhbHVlfS4gVXNlICd1bnNhZmVTdGF0aWMnIHRvIHBhc3Mgbm9uLWxpdGVyYWwgdmFsdWVzLCBidXRcbiAgICAgICAgICAgIHRha2UgY2FyZSB0byBlbnN1cmUgcGFnZSBzZWN1cml0eS5gXG4gICAgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBUYWdzIGEgc3RyaW5nIGxpdGVyYWwgc28gdGhhdCBpdCBiZWhhdmVzIGxpa2UgcGFydCBvZiB0aGUgc3RhdGljIHRlbXBsYXRlXG4gKiBzdHJpbmdzIGluc3RlYWQgb2YgYSBkeW5hbWljIHZhbHVlLlxuICpcbiAqIFRoZSBvbmx5IHZhbHVlcyB0aGF0IG1heSBiZSB1c2VkIGluIHRlbXBsYXRlIGV4cHJlc3Npb25zIGFyZSBvdGhlciB0YWdnZWRcbiAqIGBsaXRlcmFsYCByZXN1bHRzIG9yIGB1bnNhZmVTdGF0aWNgIHZhbHVlcyAobm90ZSB0aGF0IHVudHJ1c3RlZCBjb250ZW50XG4gKiBzaG91bGQgbmV2ZXIgYmUgcGFzc2VkIHRvIGB1bnNhZmVTdGF0aWNgKS5cbiAqXG4gKiBVc2VycyBtdXN0IHRha2UgY2FyZSB0byBlbnN1cmUgdGhhdCBhZGRpbmcgdGhlIHN0YXRpYyBzdHJpbmcgdG8gdGhlIHRlbXBsYXRlXG4gKiByZXN1bHRzIGluIHdlbGwtZm9ybWVkIEhUTUwsIG9yIGVsc2UgdGVtcGxhdGVzIG1heSBicmVhayB1bmV4cGVjdGVkbHkuXG4gKlxuICogU3RhdGljIHZhbHVlcyBjYW4gYmUgY2hhbmdlZCwgYnV0IHRoZXkgd2lsbCBjYXVzZSBhIGNvbXBsZXRlIHJlLXJlbmRlciBzaW5jZVxuICogdGhleSBlZmZlY3RpdmVseSBjcmVhdGUgYSBuZXcgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBjb25zdCBsaXRlcmFsID0gKFxuICBzdHJpbmdzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSxcbiAgLi4udmFsdWVzOiB1bmtub3duW11cbik6IFN0YXRpY1ZhbHVlID0+ICh7XG4gIFsnXyRsaXRTdGF0aWMkJ106IHZhbHVlcy5yZWR1Y2UoXG4gICAgKGFjYywgdiwgaWR4KSA9PiBhY2MgKyB0ZXh0RnJvbVN0YXRpYyh2IGFzIFN0YXRpY1ZhbHVlKSArIHN0cmluZ3NbaWR4ICsgMV0sXG4gICAgc3RyaW5nc1swXVxuICApIGFzIHN0cmluZyxcbiAgcjogYnJhbmQsXG59KTtcblxuY29uc3Qgc3RyaW5nc0NhY2hlID0gbmV3IE1hcDxzdHJpbmcsIFRlbXBsYXRlU3RyaW5nc0FycmF5PigpO1xuXG4vKipcbiAqIFdyYXBzIGEgbGl0LWh0bWwgdGVtcGxhdGUgdGFnIChgaHRtbGAgb3IgYHN2Z2ApIHRvIGFkZCBzdGF0aWMgdmFsdWUgc3VwcG9ydC5cbiAqL1xuZXhwb3J0IGNvbnN0IHdpdGhTdGF0aWMgPVxuICAoY29yZVRhZzogdHlwZW9mIGNvcmVIdG1sIHwgdHlwZW9mIGNvcmVTdmcgfCB0eXBlb2YgY29yZU1hdGhtbCkgPT5cbiAgKHN0cmluZ3M6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi52YWx1ZXM6IHVua25vd25bXSk6IFRlbXBsYXRlUmVzdWx0ID0+IHtcbiAgICBjb25zdCBsID0gdmFsdWVzLmxlbmd0aDtcbiAgICBsZXQgc3RhdGljVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZHluYW1pY1ZhbHVlOiB1bmtub3duO1xuICAgIGNvbnN0IHN0YXRpY1N0cmluZ3M6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBjb25zdCBkeW5hbWljVmFsdWVzOiBBcnJheTx1bmtub3duPiA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgaGFzU3RhdGljcyA9IGZhbHNlO1xuICAgIGxldCBzOiBzdHJpbmc7XG5cbiAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgIHMgPSBzdHJpbmdzW2ldO1xuICAgICAgLy8gQ29sbGVjdCBhbnkgdW5zYWZlU3RhdGljIHZhbHVlcywgYW5kIHRoZWlyIGZvbGxvd2luZyB0ZW1wbGF0ZSBzdHJpbmdzXG4gICAgICAvLyBzbyB0aGF0IHdlIHRyZWF0IGEgcnVuIG9mIHRlbXBsYXRlIHN0cmluZ3MgYW5kIHVuc2FmZSBzdGF0aWMgdmFsdWVzIGFzXG4gICAgICAvLyBhIHNpbmdsZSB0ZW1wbGF0ZSBzdHJpbmcuXG4gICAgICB3aGlsZSAoXG4gICAgICAgIGkgPCBsICYmXG4gICAgICAgICgoZHluYW1pY1ZhbHVlID0gdmFsdWVzW2ldKSxcbiAgICAgICAgKHN0YXRpY1ZhbHVlID0gdW53cmFwU3RhdGljVmFsdWUoZHluYW1pY1ZhbHVlKSkpICE9PSB1bmRlZmluZWRcbiAgICAgICkge1xuICAgICAgICBzICs9IHN0YXRpY1ZhbHVlICsgc3RyaW5nc1srK2ldO1xuICAgICAgICBoYXNTdGF0aWNzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIElmIHRoZSBsYXN0IHZhbHVlIGlzIHN0YXRpYywgd2UgZG9uJ3QgbmVlZCB0byBwdXNoIGl0LlxuICAgICAgaWYgKGkgIT09IGwpIHtcbiAgICAgICAgZHluYW1pY1ZhbHVlcy5wdXNoKGR5bmFtaWNWYWx1ZSk7XG4gICAgICB9XG4gICAgICBzdGF0aWNTdHJpbmdzLnB1c2gocyk7XG4gICAgICBpKys7XG4gICAgfVxuICAgIC8vIElmIHRoZSBsYXN0IHZhbHVlIGlzbid0IHN0YXRpYyAod2hpY2ggd291bGQgaGF2ZSBjb25zdW1lZCB0aGUgbGFzdFxuICAgIC8vIHN0cmluZyksIHRoZW4gd2UgbmVlZCB0byBhZGQgdGhlIGxhc3Qgc3RyaW5nLlxuICAgIGlmIChpID09PSBsKSB7XG4gICAgICBzdGF0aWNTdHJpbmdzLnB1c2goc3RyaW5nc1tsXSk7XG4gICAgfVxuXG4gICAgaWYgKGhhc1N0YXRpY3MpIHtcbiAgICAgIGNvbnN0IGtleSA9IHN0YXRpY1N0cmluZ3Muam9pbignJCRsaXQkJCcpO1xuICAgICAgc3RyaW5ncyA9IHN0cmluZ3NDYWNoZS5nZXQoa2V5KSE7XG4gICAgICBpZiAoc3RyaW5ncyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIEJld2FyZTogaW4gZ2VuZXJhbCB0aGlzIHBhdHRlcm4gaXMgdW5zYWZlLCBhbmQgZG9pbmcgc28gbWF5IGJ5cGFzc1xuICAgICAgICAvLyBsaXQncyBzZWN1cml0eSBjaGVja3MgYW5kIGFsbG93IGFuIGF0dGFja2VyIHRvIGV4ZWN1dGUgYXJiaXRyYXJ5XG4gICAgICAgIC8vIGNvZGUgYW5kIGluamVjdCBhcmJpdHJhcnkgY29udGVudC5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgKHN0YXRpY1N0cmluZ3MgYXMgYW55KS5yYXcgPSBzdGF0aWNTdHJpbmdzO1xuICAgICAgICBzdHJpbmdzQ2FjaGUuc2V0KFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICAoc3RyaW5ncyA9IHN0YXRpY1N0cmluZ3MgYXMgdW5rbm93biBhcyBUZW1wbGF0ZVN0cmluZ3NBcnJheSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHZhbHVlcyA9IGR5bmFtaWNWYWx1ZXM7XG4gICAgfVxuICAgIHJldHVybiBjb3JlVGFnKHN0cmluZ3MsIC4uLnZhbHVlcyk7XG4gIH07XG5cbi8qKlxuICogSW50ZXJwcmV0cyBhIHRlbXBsYXRlIGxpdGVyYWwgYXMgYW4gSFRNTCB0ZW1wbGF0ZSB0aGF0IGNhbiBlZmZpY2llbnRseVxuICogcmVuZGVyIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogSW5jbHVkZXMgc3RhdGljIHZhbHVlIHN1cHBvcnQgZnJvbSBgbGl0LWh0bWwvc3RhdGljLmpzYC5cbiAqL1xuZXhwb3J0IGNvbnN0IGh0bWwgPSB3aXRoU3RhdGljKGNvcmVIdG1sKTtcblxuLyoqXG4gKiBJbnRlcnByZXRzIGEgdGVtcGxhdGUgbGl0ZXJhbCBhcyBhbiBTVkcgdGVtcGxhdGUgdGhhdCBjYW4gZWZmaWNpZW50bHlcbiAqIHJlbmRlciB0byBhbmQgdXBkYXRlIGEgY29udGFpbmVyLlxuICpcbiAqIEluY2x1ZGVzIHN0YXRpYyB2YWx1ZSBzdXBwb3J0IGZyb20gYGxpdC1odG1sL3N0YXRpYy5qc2AuXG4gKi9cbmV4cG9ydCBjb25zdCBzdmcgPSB3aXRoU3RhdGljKGNvcmVTdmcpO1xuXG4vKipcbiAqIEludGVycHJldHMgYSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIE1hdGhNTCBmcmFnbWVudCB0aGF0IGNhbiBlZmZpY2llbnRseSByZW5kZXJcbiAqIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKlxuICogSW5jbHVkZXMgc3RhdGljIHZhbHVlIHN1cHBvcnQgZnJvbSBgbGl0LWh0bWwvc3RhdGljLmpzYC5cbiAqL1xuZXhwb3J0IGNvbnN0IG1hdGhtbCA9IHdpdGhTdGF0aWMoY29yZU1hdGhtbCk7XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuaW1wb3J0IHtcbiAgTWlycm9yVmFsaWRhdG9yXG59IGZyb20gXCIuL2NodW5rLlI3UVg0TTZSLmpzXCI7XG5pbXBvcnQge1xuICBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50XG59IGZyb20gXCIuL2NodW5rLklQV1BSSUhaLmpzXCI7XG5pbXBvcnQge1xuICBXYUludmFsaWRFdmVudFxufSBmcm9tIFwiLi9jaHVuay5WQzNCUFVaSi5qc1wiO1xuaW1wb3J0IHtcbiAgSGFzU2xvdENvbnRyb2xsZXJcbn0gZnJvbSBcIi4vY2h1bmsuS0lIQjNWTUIuanNcIjtcbmltcG9ydCB7XG4gIHNpemVfc3R5bGVzX2RlZmF1bHRcbn0gZnJvbSBcIi4vY2h1bmsuNko2UVlGSFYuanNcIjtcbmltcG9ydCB7XG4gIGJ1dHRvbl9zdHlsZXNfZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay40Rk9IVUJCUy5qc1wiO1xuaW1wb3J0IHtcbiAgd2F0Y2hcbn0gZnJvbSBcIi4vY2h1bmsuUFpBTjZGUE4uanNcIjtcbmltcG9ydCB7XG4gIExvY2FsaXplQ29udHJvbGxlclxufSBmcm9tIFwiLi9jaHVuay5PS1hCTlJFNi5qc1wiO1xuaW1wb3J0IHtcbiAgdmFyaWFudHNfc3R5bGVzX2RlZmF1bHRcbn0gZnJvbSBcIi4vY2h1bmsuWE5UUDdERVEuanNcIjtcbmltcG9ydCB7XG4gIF9fZGVjb3JhdGVDbGFzc1xufSBmcm9tIFwiLi9jaHVuay43VkdDSUhERy5qc1wiO1xuXG4vLyBzcmMvY29tcG9uZW50cy9idXR0b24vYnV0dG9uLnRzXG5pbXBvcnQgeyBjdXN0b21FbGVtZW50LCBwcm9wZXJ0eSwgcXVlcnksIHN0YXRlIH0gZnJvbSBcImxpdC9kZWNvcmF0b3JzLmpzXCI7XG5pbXBvcnQgeyBjbGFzc01hcCB9IGZyb20gXCJsaXQvZGlyZWN0aXZlcy9jbGFzcy1tYXAuanNcIjtcbmltcG9ydCB7IGlmRGVmaW5lZCB9IGZyb20gXCJsaXQvZGlyZWN0aXZlcy9pZi1kZWZpbmVkLmpzXCI7XG5pbXBvcnQgeyBodG1sLCBsaXRlcmFsIH0gZnJvbSBcImxpdC9zdGF0aWMtaHRtbC5qc1wiO1xudmFyIFdhQnV0dG9uID0gY2xhc3MgZXh0ZW5kcyBXZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLmFzc3VtZUludGVyYWN0aW9uT24gPSBbXCJjbGlja1wiXTtcbiAgICB0aGlzLmhhc1Nsb3RDb250cm9sbGVyID0gbmV3IEhhc1Nsb3RDb250cm9sbGVyKHRoaXMsIFwiW2RlZmF1bHRdXCIsIFwic3RhcnRcIiwgXCJlbmRcIik7XG4gICAgdGhpcy5sb2NhbGl6ZSA9IG5ldyBMb2NhbGl6ZUNvbnRyb2xsZXIodGhpcyk7XG4gICAgdGhpcy5pbnZhbGlkID0gZmFsc2U7XG4gICAgdGhpcy5pc0ljb25CdXR0b24gPSBmYWxzZTtcbiAgICB0aGlzLnRpdGxlID0gXCJcIjtcbiAgICB0aGlzLnZhcmlhbnQgPSBcIm5ldXRyYWxcIjtcbiAgICB0aGlzLmFwcGVhcmFuY2UgPSBcImFjY2VudFwiO1xuICAgIHRoaXMuc2l6ZSA9IFwibWVkaXVtXCI7XG4gICAgdGhpcy53aXRoQ2FyZXQgPSBmYWxzZTtcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5waWxsID0gZmFsc2U7XG4gICAgdGhpcy50eXBlID0gXCJidXR0b25cIjtcbiAgfVxuICBzdGF0aWMgZ2V0IHZhbGlkYXRvcnMoKSB7XG4gICAgcmV0dXJuIFsuLi5zdXBlci52YWxpZGF0b3JzLCBNaXJyb3JWYWxpZGF0b3IoKV07XG4gIH1cbiAgY29uc3RydWN0TGlnaHRET01CdXR0b24oKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZSBvZiB0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG4gICAgYnV0dG9uLnR5cGUgPSB0aGlzLnR5cGU7XG4gICAgYnV0dG9uLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZSAhaW1wb3J0YW50XCI7XG4gICAgYnV0dG9uLnN0eWxlLndpZHRoID0gXCIwICFpbXBvcnRhbnRcIjtcbiAgICBidXR0b24uc3R5bGUuaGVpZ2h0ID0gXCIwICFpbXBvcnRhbnRcIjtcbiAgICBidXR0b24uc3R5bGUuY2xpcFBhdGggPSBcImluc2V0KDUwJSkgIWltcG9ydGFudFwiO1xuICAgIGJ1dHRvbi5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuICFpbXBvcnRhbnRcIjtcbiAgICBidXR0b24uc3R5bGUud2hpdGVTcGFjZSA9IFwibm93cmFwICFpbXBvcnRhbnRcIjtcbiAgICBpZiAodGhpcy5uYW1lKSB7XG4gICAgICBidXR0b24ubmFtZSA9IHRoaXMubmFtZTtcbiAgICB9XG4gICAgYnV0dG9uLnZhbHVlID0gdGhpcy52YWx1ZSB8fCBcIlwiO1xuICAgIHJldHVybiBidXR0b247XG4gIH1cbiAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmxvYWRpbmcpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMudHlwZSAhPT0gXCJzdWJtaXRcIiAmJiB0aGlzLnR5cGUgIT09IFwicmVzZXRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmb3JtID0gdGhpcy5nZXRGb3JtKCk7XG4gICAgaWYgKCFmb3JtKSByZXR1cm47XG4gICAgY29uc3QgbGlnaHRET01CdXR0b24gPSB0aGlzLmNvbnN0cnVjdExpZ2h0RE9NQnV0dG9uKCk7XG4gICAgdGhpcy5wYXJlbnRFbGVtZW50Py5hcHBlbmQobGlnaHRET01CdXR0b24pO1xuICAgIGxpZ2h0RE9NQnV0dG9uLmNsaWNrKCk7XG4gICAgbGlnaHRET01CdXR0b24ucmVtb3ZlKCk7XG4gIH1cbiAgaGFuZGxlSW52YWxpZCgpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFdhSW52YWxpZEV2ZW50KCkpO1xuICB9XG4gIGhhbmRsZUxhYmVsU2xvdENoYW5nZSgpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMubGFiZWxTbG90LmFzc2lnbmVkTm9kZXMoeyBmbGF0dGVuOiB0cnVlIH0pO1xuICAgIGxldCBoYXNJY29uTGFiZWwgPSBmYWxzZTtcbiAgICBsZXQgaGFzSWNvbiA9IGZhbHNlO1xuICAgIGxldCBoYXNUZXh0ID0gZmFsc2U7XG4gICAgbGV0IGhhc090aGVyRWxlbWVudHMgPSBmYWxzZTtcbiAgICBbLi4ubm9kZXNdLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gbm9kZTtcbiAgICAgICAgaWYgKGVsZW1lbnQubG9jYWxOYW1lID09PSBcIndhLWljb25cIikge1xuICAgICAgICAgIGhhc0ljb24gPSB0cnVlO1xuICAgICAgICAgIGlmICghaGFzSWNvbkxhYmVsKSBoYXNJY29uTGFiZWwgPSBlbGVtZW50LmxhYmVsICE9PSB2b2lkIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFzT3RoZXJFbGVtZW50cyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IG5vZGUudGV4dENvbnRlbnQ/LnRyaW0oKSB8fCBcIlwiO1xuICAgICAgICBpZiAodGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaGFzVGV4dCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmlzSWNvbkJ1dHRvbiA9IGhhc0ljb24gJiYgIWhhc1RleHQgJiYgIWhhc090aGVyRWxlbWVudHM7XG4gICAgaWYgKHRoaXMuaXNJY29uQnV0dG9uICYmICFoYXNJY29uTGFiZWwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ0ljb24gYnV0dG9ucyBtdXN0IGhhdmUgYSBsYWJlbCBmb3Igc2NyZWVuIHJlYWRlcnMuIEFkZCA8d2EtaWNvbiBsYWJlbD1cIi4uLlwiPiB0byByZW1vdmUgdGhpcyB3YXJuaW5nLicsXG4gICAgICAgIHRoaXNcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGlzQnV0dG9uKCkge1xuICAgIHJldHVybiB0aGlzLmhyZWYgPyBmYWxzZSA6IHRydWU7XG4gIH1cbiAgaXNMaW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhyZWYgPyB0cnVlIDogZmFsc2U7XG4gIH1cbiAgaGFuZGxlRGlzYWJsZWRDaGFuZ2UoKSB7XG4gICAgdGhpcy51cGRhdGVWYWxpZGl0eSgpO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBzZXRWYWx1ZSguLi5fYXJncykge1xuICB9XG4gIC8qKiBTaW11bGF0ZXMgYSBjbGljayBvbiB0aGUgYnV0dG9uLiAqL1xuICBjbGljaygpIHtcbiAgICB0aGlzLmJ1dHRvbi5jbGljaygpO1xuICB9XG4gIC8qKiBTZXRzIGZvY3VzIG9uIHRoZSBidXR0b24uICovXG4gIGZvY3VzKG9wdGlvbnMpIHtcbiAgICB0aGlzLmJ1dHRvbi5mb2N1cyhvcHRpb25zKTtcbiAgfVxuICAvKiogUmVtb3ZlcyBmb2N1cyBmcm9tIHRoZSBidXR0b24uICovXG4gIGJsdXIoKSB7XG4gICAgdGhpcy5idXR0b24uYmx1cigpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBpc0xpbmsgPSB0aGlzLmlzTGluaygpO1xuICAgIGNvbnN0IHRhZyA9IGlzTGluayA/IGxpdGVyYWxgYWAgOiBsaXRlcmFsYGJ1dHRvbmA7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8JHt0YWd9XG4gICAgICAgIHBhcnQ9XCJiYXNlXCJcbiAgICAgICAgY2xhc3M9JHtjbGFzc01hcCh7XG4gICAgICBidXR0b246IHRydWUsXG4gICAgICBjYXJldDogdGhpcy53aXRoQ2FyZXQsXG4gICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCxcbiAgICAgIGxvYWRpbmc6IHRoaXMubG9hZGluZyxcbiAgICAgIHJ0bDogdGhpcy5sb2NhbGl6ZS5kaXIoKSA9PT0gXCJydGxcIixcbiAgICAgIFwiaGFzLWxhYmVsXCI6IHRoaXMuaGFzU2xvdENvbnRyb2xsZXIudGVzdChcIltkZWZhdWx0XVwiKSxcbiAgICAgIFwiaGFzLXN0YXJ0XCI6IHRoaXMuaGFzU2xvdENvbnRyb2xsZXIudGVzdChcInN0YXJ0XCIpLFxuICAgICAgXCJoYXMtZW5kXCI6IHRoaXMuaGFzU2xvdENvbnRyb2xsZXIudGVzdChcImVuZFwiKSxcbiAgICAgIFwiaXMtaWNvbi1idXR0b25cIjogdGhpcy5pc0ljb25CdXR0b25cbiAgICB9KX1cbiAgICAgICAgP2Rpc2FibGVkPSR7aWZEZWZpbmVkKGlzTGluayA/IHZvaWQgMCA6IHRoaXMuZGlzYWJsZWQpfVxuICAgICAgICB0eXBlPSR7aWZEZWZpbmVkKGlzTGluayA/IHZvaWQgMCA6IHRoaXMudHlwZSl9XG4gICAgICAgIHRpdGxlPSR7dGhpcy50aXRsZX1cbiAgICAgICAgbmFtZT0ke2lmRGVmaW5lZChpc0xpbmsgPyB2b2lkIDAgOiB0aGlzLm5hbWUpfVxuICAgICAgICB2YWx1ZT0ke2lmRGVmaW5lZChpc0xpbmsgPyB2b2lkIDAgOiB0aGlzLnZhbHVlKX1cbiAgICAgICAgaHJlZj0ke2lmRGVmaW5lZChpc0xpbmsgPyB0aGlzLmhyZWYgOiB2b2lkIDApfVxuICAgICAgICB0YXJnZXQ9JHtpZkRlZmluZWQoaXNMaW5rID8gdGhpcy50YXJnZXQgOiB2b2lkIDApfVxuICAgICAgICBkb3dubG9hZD0ke2lmRGVmaW5lZChpc0xpbmsgPyB0aGlzLmRvd25sb2FkIDogdm9pZCAwKX1cbiAgICAgICAgcmVsPSR7aWZEZWZpbmVkKGlzTGluayAmJiB0aGlzLnJlbCA/IHRoaXMucmVsIDogdm9pZCAwKX1cbiAgICAgICAgcm9sZT0ke2lmRGVmaW5lZChpc0xpbmsgPyB2b2lkIDAgOiBcImJ1dHRvblwiKX1cbiAgICAgICAgYXJpYS1kaXNhYmxlZD0ke2lmRGVmaW5lZChpc0xpbmsgJiYgdGhpcy5kaXNhYmxlZCA/IFwidHJ1ZVwiIDogdm9pZCAwKX1cbiAgICAgICAgdGFiaW5kZXg9JHt0aGlzLmRpc2FibGVkID8gXCItMVwiIDogXCIwXCJ9XG4gICAgICAgIEBpbnZhbGlkPSR7dGhpcy5pc0J1dHRvbigpID8gdGhpcy5oYW5kbGVJbnZhbGlkIDogbnVsbH1cbiAgICAgICAgQGNsaWNrPSR7dGhpcy5oYW5kbGVDbGlja31cbiAgICAgID5cbiAgICAgICAgPHNsb3QgbmFtZT1cInN0YXJ0XCIgcGFydD1cInN0YXJ0XCIgY2xhc3M9XCJzdGFydFwiPjwvc2xvdD5cbiAgICAgICAgPHNsb3QgcGFydD1cImxhYmVsXCIgY2xhc3M9XCJsYWJlbFwiIEBzbG90Y2hhbmdlPSR7dGhpcy5oYW5kbGVMYWJlbFNsb3RDaGFuZ2V9Pjwvc2xvdD5cbiAgICAgICAgPHNsb3QgbmFtZT1cImVuZFwiIHBhcnQ9XCJlbmRcIiBjbGFzcz1cImVuZFwiPjwvc2xvdD5cbiAgICAgICAgJHt0aGlzLndpdGhDYXJldCA/IGh0bWxgXG4gICAgICAgICAgICAgICAgPHdhLWljb24gcGFydD1cImNhcmV0XCIgY2xhc3M9XCJjYXJldFwiIGxpYnJhcnk9XCJzeXN0ZW1cIiBuYW1lPVwiY2hldnJvbi1kb3duXCIgdmFyaWFudD1cInNvbGlkXCI+PC93YS1pY29uPlxuICAgICAgICAgICAgICBgIDogXCJcIn1cbiAgICAgICAgJHt0aGlzLmxvYWRpbmcgPyBodG1sYDx3YS1zcGlubmVyIHBhcnQ9XCJzcGlubmVyXCI+PC93YS1zcGlubmVyPmAgOiBcIlwifVxuICAgICAgPC8ke3RhZ30+XG4gICAgYDtcbiAgfVxufTtcbldhQnV0dG9uLnNoYWRvd1Jvb3RPcHRpb25zID0geyAuLi5XZWJBd2Vzb21lRm9ybUFzc29jaWF0ZWRFbGVtZW50LnNoYWRvd1Jvb3RPcHRpb25zLCBkZWxlZ2F0ZXNGb2N1czogdHJ1ZSB9O1xuV2FCdXR0b24uY3NzID0gW2J1dHRvbl9zdHlsZXNfZGVmYXVsdCwgdmFyaWFudHNfc3R5bGVzX2RlZmF1bHQsIHNpemVfc3R5bGVzX2RlZmF1bHRdO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcXVlcnkoXCIuYnV0dG9uXCIpXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiYnV0dG9uXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcXVlcnkoXCJzbG90Om5vdChbbmFtZV0pXCIpXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwibGFiZWxTbG90XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgc3RhdGUoKVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImludmFsaWRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBzdGF0ZSgpXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiaXNJY29uQnV0dG9uXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcInRpdGxlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwidmFyaWFudFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImFwcGVhcmFuY2VcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJzaXplXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwid2l0aC1jYXJldFwiLCB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwid2l0aENhcmV0XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiZGlzYWJsZWRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4sIHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJsb2FkaW5nXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwicGlsbFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJ0eXBlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwibmFtZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcInZhbHVlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiaHJlZlwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJ0YXJnZXRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwicmVsXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImRvd25sb2FkXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwiZm9ybWFjdGlvblwiIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiZm9ybUFjdGlvblwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcImZvcm1lbmN0eXBlXCIgfSlcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJmb3JtRW5jdHlwZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcImZvcm1tZXRob2RcIiB9KVxuXSwgV2FCdXR0b24ucHJvdG90eXBlLCBcImZvcm1NZXRob2RcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJmb3Jtbm92YWxpZGF0ZVwiLCB0eXBlOiBCb29sZWFuIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiZm9ybU5vVmFsaWRhdGVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJmb3JtdGFyZ2V0XCIgfSlcbl0sIFdhQnV0dG9uLnByb3RvdHlwZSwgXCJmb3JtVGFyZ2V0XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgd2F0Y2goXCJkaXNhYmxlZFwiLCB7IHdhaXRVbnRpbEZpcnN0VXBkYXRlOiB0cnVlIH0pXG5dLCBXYUJ1dHRvbi5wcm90b3R5cGUsIFwiaGFuZGxlRGlzYWJsZWRDaGFuZ2VcIiwgMSk7XG5XYUJ1dHRvbiA9IF9fZGVjb3JhdGVDbGFzcyhbXG4gIGN1c3RvbUVsZW1lbnQoXCJ3YS1idXR0b25cIilcbl0sIFdhQnV0dG9uKTtcblxuZXhwb3J0IHtcbiAgV2FCdXR0b25cbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvY29tcG9uZW50cy9zcGlubmVyL3NwaW5uZXIuc3R5bGVzLnRzXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwibGl0XCI7XG52YXIgc3Bpbm5lcl9zdHlsZXNfZGVmYXVsdCA9IGNzc2BcbiAgOmhvc3Qge1xuICAgIC0tdHJhY2std2lkdGg6IDJweDtcbiAgICAtLXRyYWNrLWNvbG9yOiB2YXIoLS13YS1jb2xvci1uZXV0cmFsLWZpbGwtbm9ybWFsKTtcbiAgICAtLWluZGljYXRvci1jb2xvcjogdmFyKC0td2EtY29sb3ItYnJhbmQtZmlsbC1sb3VkKTtcbiAgICAtLXNwZWVkOiAycztcblxuICAgIC8qXG4gICAgICBSZXNpemluZyBhIHNwaW5uZXIgZWxlbWVudCB1c2luZyBhbnl0aGluZyBidXQgZm9udC1zaXplIHdpbGwgYnJlYWsgdGhlIGFuaW1hdGlvbiBiZWNhdXNlIHRoZSBhbmltYXRpb24gdXNlcyBlbVxuICAgICAgdW5pdHMuIFRoZXJlZm9yZSwgaWYgYSBzcGlubmVyIGlzIHVzZWQgaW4gYSBmbGV4IGNvbnRhaW5lciB3aXRob3V0IFxcYGZsZXg6IG5vbmVcXGAgYXBwbGllZCwgdGhlIHNwaW5uZXIgY2FuXG4gICAgICBncm93L3NocmluayBhbmQgYnJlYWsgdGhlIGFuaW1hdGlvbi4gVGhlIHVzZSBvZiBcXGBmbGV4OiBub25lXFxgIG9uIHRoZSBob3N0IGVsZW1lbnQgcHJldmVudHMgdGhpcyBieSBhbHdheXMgaGF2aW5nXG4gICAgICB0aGUgc3Bpbm5lciBzaXplZCBhY2NvcmRpbmcgdG8gaXRzIGFjdHVhbCBkaW1lbnNpb25zLlxuICAgICovXG4gICAgZmxleDogbm9uZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICB3aWR0aDogMWVtO1xuICAgIGhlaWdodDogMWVtO1xuICB9XG5cbiAgc3ZnIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYXNwZWN0LXJhdGlvOiAxO1xuICAgIGFuaW1hdGlvbjogc3BpbiB2YXIoLS1zcGVlZCkgbGluZWFyIGluZmluaXRlO1xuICB9XG5cbiAgLnRyYWNrIHtcbiAgICBzdHJva2U6IHZhcigtLXRyYWNrLWNvbG9yKTtcbiAgfVxuXG4gIC5pbmRpY2F0b3Ige1xuICAgIHN0cm9rZTogdmFyKC0taW5kaWNhdG9yLWNvbG9yKTtcbiAgICBzdHJva2UtZGFzaGFycmF5OiA3NSwgMTAwO1xuICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAtNTtcbiAgICBhbmltYXRpb246IGRhc2ggMS41cyBlYXNlLWluLW91dCBpbmZpbml0ZTtcbiAgICBzdHJva2UtbGluZWNhcDogcm91bmQ7XG4gIH1cblxuICBAa2V5ZnJhbWVzIHNwaW4ge1xuICAgIDAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBkYXNoIHtcbiAgICAwJSB7XG4gICAgICBzdHJva2UtZGFzaGFycmF5OiAxLCAxNTA7XG4gICAgICBzdHJva2UtZGFzaG9mZnNldDogMDtcbiAgICB9XG4gICAgNTAlIHtcbiAgICAgIHN0cm9rZS1kYXNoYXJyYXk6IDkwLCAxNTA7XG4gICAgICBzdHJva2UtZGFzaG9mZnNldDogLTM1O1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIHN0cm9rZS1kYXNoYXJyYXk6IDkwLCAxNTA7XG4gICAgICBzdHJva2UtZGFzaG9mZnNldDogLTEyNDtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCB7XG4gIHNwaW5uZXJfc3R5bGVzX2RlZmF1bHRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuaW1wb3J0IHtcbiAgc3Bpbm5lcl9zdHlsZXNfZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay5BR0RHUkc0RS5qc1wiO1xuaW1wb3J0IHtcbiAgTG9jYWxpemVDb250cm9sbGVyXG59IGZyb20gXCIuL2NodW5rLk9LWEJOUkU2LmpzXCI7XG5pbXBvcnQge1xuICBXZWJBd2Vzb21lRWxlbWVudFxufSBmcm9tIFwiLi9jaHVuay5FUEhIV1hLMi5qc1wiO1xuaW1wb3J0IHtcbiAgX19kZWNvcmF0ZUNsYXNzXG59IGZyb20gXCIuL2NodW5rLjdWR0NJSERHLmpzXCI7XG5cbi8vIHNyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci50c1xuaW1wb3J0IHsgaHRtbCB9IGZyb20gXCJsaXRcIjtcbmltcG9ydCB7IGN1c3RvbUVsZW1lbnQgfSBmcm9tIFwibGl0L2RlY29yYXRvcnMuanNcIjtcbnZhciBXYVNwaW5uZXIgPSBjbGFzcyBleHRlbmRzIFdlYkF3ZXNvbWVFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLmxvY2FsaXplID0gbmV3IExvY2FsaXplQ29udHJvbGxlcih0aGlzKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8c3ZnXG4gICAgICAgIHBhcnQ9XCJiYXNlXCJcbiAgICAgICAgcm9sZT1cInByb2dyZXNzYmFyXCJcbiAgICAgICAgYXJpYS1sYWJlbD0ke3RoaXMubG9jYWxpemUudGVybShcImxvYWRpbmdcIil9XG4gICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgdmlld0JveD1cIjAgMCA1MCA1MFwiXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgPlxuICAgICAgICA8Y2lyY2xlIGNsYXNzPVwidHJhY2tcIiBjeD1cIjI1XCIgY3k9XCIyNVwiIHI9XCIyMFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLXdpZHRoPVwiNVwiIC8+XG4gICAgICAgIDxjaXJjbGUgY2xhc3M9XCJpbmRpY2F0b3JcIiBjeD1cIjI1XCIgY3k9XCIyNVwiIHI9XCIyMFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlLXdpZHRoPVwiNVwiIC8+XG4gICAgICA8L3N2Zz5cbiAgICBgO1xuICB9XG59O1xuV2FTcGlubmVyLmNzcyA9IHNwaW5uZXJfc3R5bGVzX2RlZmF1bHQ7XG5XYVNwaW5uZXIgPSBfX2RlY29yYXRlQ2xhc3MoW1xuICBjdXN0b21FbGVtZW50KFwid2Etc3Bpbm5lclwiKVxuXSwgV2FTcGlubmVyKTtcblxuZXhwb3J0IHtcbiAgV2FTcGlubmVyXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2V2ZW50cy9lcnJvci50c1xudmFyIFdhRXJyb3JFdmVudCA9IGNsYXNzIGV4dGVuZHMgRXZlbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIndhLWVycm9yXCIsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2UsIGNvbXBvc2VkOiB0cnVlIH0pO1xuICB9XG59O1xuXG5leHBvcnQge1xuICBXYUVycm9yRXZlbnRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvZXZlbnRzL2xvYWQudHNcbnZhciBXYUxvYWRFdmVudCA9IGNsYXNzIGV4dGVuZHMgRXZlbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIndhLWxvYWRcIiwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZSwgY29tcG9zZWQ6IHRydWUgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIFdhTG9hZEV2ZW50XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbi9pY29uLnN0eWxlcy50c1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcImxpdFwiO1xudmFyIGljb25fc3R5bGVzX2RlZmF1bHQgPSBjc3NgXG4gIDpob3N0IHtcbiAgICAtLXByaW1hcnktY29sb3I6IGN1cnJlbnRDb2xvcjtcbiAgICAtLXByaW1hcnktb3BhY2l0eTogMTtcbiAgICAtLXNlY29uZGFyeS1jb2xvcjogY3VycmVudENvbG9yO1xuICAgIC0tc2Vjb25kYXJ5LW9wYWNpdHk6IDAuNDtcbiAgICAtLXJvdGF0ZS1hbmdsZTogMGRlZztcblxuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgdmVydGljYWwtYWxpZ246IC0wLjEyNWVtO1xuICB9XG5cbiAgLyogU3RhbmRhcmQgKi9cbiAgOmhvc3QoOm5vdChbYXV0by13aWR0aF0pKSB7XG4gICAgd2lkdGg6IDEuMjVlbTtcbiAgICBoZWlnaHQ6IDFlbTtcbiAgfVxuXG4gIC8qIEF1dG8td2lkdGggKi9cbiAgOmhvc3QoW2F1dG8td2lkdGhdKSB7XG4gICAgd2lkdGg6IGF1dG87XG4gICAgaGVpZ2h0OiAxZW07XG4gIH1cblxuICBzdmcge1xuICAgIGhlaWdodDogMWVtO1xuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICAgIHdpZHRoOiBhdXRvO1xuXG4gICAgLyogRHVvdG9uZSBjb2xvcnMgd2l0aCBwYXRoLXNwZWNpZmljIG9wYWNpdHkgZmFsbGJhY2sgKi9cbiAgICBwYXRoW2RhdGEtZHVvdG9uZS1wcmltYXJ5XSB7XG4gICAgICBjb2xvcjogdmFyKC0tcHJpbWFyeS1jb2xvcik7XG4gICAgICBvcGFjaXR5OiB2YXIoLS1wYXRoLW9wYWNpdHksIHZhcigtLXByaW1hcnktb3BhY2l0eSkpO1xuICAgIH1cblxuICAgIHBhdGhbZGF0YS1kdW90b25lLXNlY29uZGFyeV0ge1xuICAgICAgY29sb3I6IHZhcigtLXNlY29uZGFyeS1jb2xvcik7XG4gICAgICBvcGFjaXR5OiB2YXIoLS1wYXRoLW9wYWNpdHksIHZhcigtLXNlY29uZGFyeS1vcGFjaXR5KSk7XG4gICAgfVxuICB9XG5cbiAgLyogUm90YXRpb24gKi9cbiAgOmhvc3QoW3JvdGF0ZV0pIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSh2YXIoLS1yb3RhdGUtYW5nbGUsIDBkZWcpKTtcbiAgfVxuXG4gIC8qIEZsaXBwaW5nICovXG4gIDpob3N0KFtmbGlwPSd4J10pIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlWCgtMSk7XG4gIH1cbiAgOmhvc3QoW2ZsaXA9J3knXSkge1xuICAgIHRyYW5zZm9ybTogc2NhbGVZKC0xKTtcbiAgfVxuICA6aG9zdChbZmxpcD0nYm90aCddKSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgtMSwgLTEpO1xuICB9XG5cbiAgLyogUm90YXRpb24gYW5kIEZsaXBwaW5nIGNvbWJpbmVkICovXG4gIDpob3N0KFtyb3RhdGVdW2ZsaXA9J3gnXSkge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKHZhcigtLXJvdGF0ZS1hbmdsZSwgMGRlZykpIHNjYWxlWCgtMSk7XG4gIH1cbiAgOmhvc3QoW3JvdGF0ZV1bZmxpcD0neSddKSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUodmFyKC0tcm90YXRlLWFuZ2xlLCAwZGVnKSkgc2NhbGVZKC0xKTtcbiAgfVxuICA6aG9zdChbcm90YXRlXVtmbGlwPSdib3RoJ10pIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSh2YXIoLS1yb3RhdGUtYW5nbGUsIDBkZWcpKSBzY2FsZSgtMSwgLTEpO1xuICB9XG5cbiAgLyogQW5pbWF0aW9ucyAqL1xuICA6aG9zdChbYW5pbWF0aW9uPSdiZWF0J10pIHtcbiAgICBhbmltYXRpb24tbmFtZTogYmVhdDtcbiAgICBhbmltYXRpb24tZGVsYXk6IHZhcigtLWFuaW1hdGlvbi1kZWxheSwgMHMpO1xuICAgIGFuaW1hdGlvbi1kaXJlY3Rpb246IHZhcigtLWFuaW1hdGlvbi1kaXJlY3Rpb24sIG5vcm1hbCk7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1hbmltYXRpb24tZHVyYXRpb24sIDFzKTtcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiB2YXIoLS1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50LCBpbmZpbml0ZSk7XG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogdmFyKC0tYW5pbWF0aW9uLXRpbWluZywgZWFzZS1pbi1vdXQpO1xuICB9XG5cbiAgOmhvc3QoW2FuaW1hdGlvbj0nZmFkZSddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IGZhZGU7XG4gICAgYW5pbWF0aW9uLWRlbGF5OiB2YXIoLS1hbmltYXRpb24tZGVsYXksIDBzKTtcbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiB2YXIoLS1hbmltYXRpb24tZGlyZWN0aW9uLCBub3JtYWwpO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogdmFyKC0tYW5pbWF0aW9uLWR1cmF0aW9uLCAxcyk7XG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogdmFyKC0tYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCwgaW5maW5pdGUpO1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IHZhcigtLWFuaW1hdGlvbi10aW1pbmcsIGN1YmljLWJlemllcigwLjQsIDAsIDAuNiwgMSkpO1xuICB9XG5cbiAgOmhvc3QoW2FuaW1hdGlvbj0nYmVhdC1mYWRlJ10pIHtcbiAgICBhbmltYXRpb24tbmFtZTogYmVhdC1mYWRlO1xuICAgIGFuaW1hdGlvbi1kZWxheTogdmFyKC0tYW5pbWF0aW9uLWRlbGF5LCAwcyk7XG4gICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogdmFyKC0tYW5pbWF0aW9uLWRpcmVjdGlvbiwgbm9ybWFsKTtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWFuaW1hdGlvbi1kdXJhdGlvbiwgMXMpO1xuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHZhcigtLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQsIGluZmluaXRlKTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS1hbmltYXRpb24tdGltaW5nLCBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjYsIDEpKTtcbiAgfVxuXG4gIDpob3N0KFthbmltYXRpb249J2JvdW5jZSddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IGJvdW5jZTtcbiAgICBhbmltYXRpb24tZGVsYXk6IHZhcigtLWFuaW1hdGlvbi1kZWxheSwgMHMpO1xuICAgIGFuaW1hdGlvbi1kaXJlY3Rpb246IHZhcigtLWFuaW1hdGlvbi1kaXJlY3Rpb24sIG5vcm1hbCk7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1hbmltYXRpb24tZHVyYXRpb24sIDFzKTtcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiB2YXIoLS1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50LCBpbmZpbml0ZSk7XG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogdmFyKC0tYW5pbWF0aW9uLXRpbWluZywgY3ViaWMtYmV6aWVyKDAuMjgsIDAuODQsIDAuNDIsIDEpKTtcbiAgfVxuXG4gIDpob3N0KFthbmltYXRpb249J2ZsaXAnXSkge1xuICAgIGFuaW1hdGlvbi1uYW1lOiBmbGlwO1xuICAgIGFuaW1hdGlvbi1kZWxheTogdmFyKC0tYW5pbWF0aW9uLWRlbGF5LCAwcyk7XG4gICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogdmFyKC0tYW5pbWF0aW9uLWRpcmVjdGlvbiwgbm9ybWFsKTtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWFuaW1hdGlvbi1kdXJhdGlvbiwgMXMpO1xuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHZhcigtLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQsIGluZmluaXRlKTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS1hbmltYXRpb24tdGltaW5nLCBlYXNlLWluLW91dCk7XG4gIH1cblxuICA6aG9zdChbYW5pbWF0aW9uPSdzaGFrZSddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IHNoYWtlO1xuICAgIGFuaW1hdGlvbi1kZWxheTogdmFyKC0tYW5pbWF0aW9uLWRlbGF5LCAwcyk7XG4gICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogdmFyKC0tYW5pbWF0aW9uLWRpcmVjdGlvbiwgbm9ybWFsKTtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWFuaW1hdGlvbi1kdXJhdGlvbiwgMXMpO1xuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHZhcigtLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQsIGluZmluaXRlKTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS1hbmltYXRpb24tdGltaW5nLCBsaW5lYXIpO1xuICB9XG5cbiAgOmhvc3QoW2FuaW1hdGlvbj0nc3BpbiddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IHNwaW47XG4gICAgYW5pbWF0aW9uLWRlbGF5OiB2YXIoLS1hbmltYXRpb24tZGVsYXksIDBzKTtcbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiB2YXIoLS1hbmltYXRpb24tZGlyZWN0aW9uLCBub3JtYWwpO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogdmFyKC0tYW5pbWF0aW9uLWR1cmF0aW9uLCAycyk7XG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogdmFyKC0tYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCwgaW5maW5pdGUpO1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IHZhcigtLWFuaW1hdGlvbi10aW1pbmcsIGxpbmVhcik7XG4gIH1cblxuICA6aG9zdChbYW5pbWF0aW9uPSdzcGluLXB1bHNlJ10pIHtcbiAgICBhbmltYXRpb24tbmFtZTogc3Bpbi1wdWxzZTtcbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiB2YXIoLS1hbmltYXRpb24tZGlyZWN0aW9uLCBub3JtYWwpO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogdmFyKC0tYW5pbWF0aW9uLWR1cmF0aW9uLCAxcyk7XG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogdmFyKC0tYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCwgaW5maW5pdGUpO1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IHZhcigtLWFuaW1hdGlvbi10aW1pbmcsIHN0ZXBzKDgpKTtcbiAgfVxuXG4gIDpob3N0KFthbmltYXRpb249J3NwaW4tcmV2ZXJzZSddKSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IHNwaW47XG4gICAgYW5pbWF0aW9uLWRlbGF5OiB2YXIoLS1hbmltYXRpb24tZGVsYXksIDBzKTtcbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiB2YXIoLS1hbmltYXRpb24tZGlyZWN0aW9uLCByZXZlcnNlKTtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWFuaW1hdGlvbi1kdXJhdGlvbiwgMnMpO1xuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IHZhcigtLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQsIGluZmluaXRlKTtcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS1hbmltYXRpb24tdGltaW5nLCBsaW5lYXIpO1xuICB9XG5cbiAgLyogS2V5ZnJhbWVzICovXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgOmhvc3QoW2FuaW1hdGlvbj0nYmVhdCddKSxcbiAgICA6aG9zdChbYW5pbWF0aW9uPSdib3VuY2UnXSksXG4gICAgOmhvc3QoW2FuaW1hdGlvbj0nZmFkZSddKSxcbiAgICA6aG9zdChbYW5pbWF0aW9uPSdiZWF0LWZhZGUnXSksXG4gICAgOmhvc3QoW2FuaW1hdGlvbj0nZmxpcCddKSxcbiAgICA6aG9zdChbYW5pbWF0aW9uPSdzaGFrZSddKSxcbiAgICA6aG9zdChbYW5pbWF0aW9uPSdzcGluJ10pLFxuICAgIDpob3N0KFthbmltYXRpb249J3NwaW4tcHVsc2UnXSksXG4gICAgOmhvc3QoW2FuaW1hdGlvbj0nc3Bpbi1yZXZlcnNlJ10pIHtcbiAgICAgIGFuaW1hdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgdHJhbnNpdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuICBAa2V5ZnJhbWVzIGJlYXQge1xuICAgIDAlLFxuICAgIDkwJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIH1cbiAgICA0NSUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSh2YXIoLS1iZWF0LXNjYWxlLCAxLjI1KSk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBmYWRlIHtcbiAgICA1MCUge1xuICAgICAgb3BhY2l0eTogdmFyKC0tZmFkZS1vcGFjaXR5LCAwLjQpO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgYmVhdC1mYWRlIHtcbiAgICAwJSxcbiAgICAxMDAlIHtcbiAgICAgIG9wYWNpdHk6IHZhcigtLWJlYXQtZmFkZS1vcGFjaXR5LCAwLjQpO1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICB9XG4gICAgNTAlIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKHZhcigtLWJlYXQtZmFkZS1zY2FsZSwgMS4xMjUpKTtcbiAgICB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIGJvdW5jZSB7XG4gICAgMCUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLCAxKSB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgICAxMCUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSh2YXIoLS1ib3VuY2Utc3RhcnQtc2NhbGUteCwgMS4xKSwgdmFyKC0tYm91bmNlLXN0YXJ0LXNjYWxlLXksIDAuOSkpIHRyYW5zbGF0ZVkoMCk7XG4gICAgfVxuICAgIDMwJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKHZhcigtLWJvdW5jZS1qdW1wLXNjYWxlLXgsIDAuOSksIHZhcigtLWJvdW5jZS1qdW1wLXNjYWxlLXksIDEuMSkpXG4gICAgICAgIHRyYW5zbGF0ZVkodmFyKC0tYm91bmNlLWhlaWdodCwgLTAuNWVtKSk7XG4gICAgfVxuICAgIDUwJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKHZhcigtLWJvdW5jZS1sYW5kLXNjYWxlLXgsIDEuMDUpLCB2YXIoLS1ib3VuY2UtbGFuZC1zY2FsZS15LCAwLjk1KSkgdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgNTclIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSwgMSkgdHJhbnNsYXRlWSh2YXIoLS1ib3VuY2UtcmVib3VuZCwgLTAuMTI1ZW0pKTtcbiAgICB9XG4gICAgNjQlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSwgMSkgdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEsIDEpIHRyYW5zbGF0ZVkoMCk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBmbGlwIHtcbiAgICA1MCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUzZCh2YXIoLS1mbGlwLXgsIDApLCB2YXIoLS1mbGlwLXksIDEpLCB2YXIoLS1mbGlwLXosIDApLCB2YXIoLS1mbGlwLWFuZ2xlLCAtMTgwZGVnKSk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBzaGFrZSB7XG4gICAgMCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTE1ZGVnKTtcbiAgICB9XG4gICAgNCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTVkZWcpO1xuICAgIH1cbiAgICA4JSxcbiAgICAyNCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTE4ZGVnKTtcbiAgICB9XG4gICAgMTIlLFxuICAgIDI4JSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxOGRlZyk7XG4gICAgfVxuICAgIDE2JSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMjJkZWcpO1xuICAgIH1cbiAgICAyMCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjJkZWcpO1xuICAgIH1cbiAgICAzMiUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTEyZGVnKTtcbiAgICB9XG4gICAgMzYlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDEyZGVnKTtcbiAgICB9XG4gICAgNDAlLFxuICAgIDEwMCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyBzcGluIHtcbiAgICAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgc3Bpbi1wdWxzZSB7XG4gICAgMCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCB7XG4gIGljb25fc3R5bGVzX2RlZmF1bHRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvdXRpbGl0aWVzL2Jhc2UtcGF0aC50c1xudmFyIGJhc2VQYXRoID0gXCJcIjtcbnZhciBraXRDb2RlID0gXCJcIjtcbmZ1bmN0aW9uIHNldEJhc2VQYXRoKHBhdGgpIHtcbiAgYmFzZVBhdGggPSBwYXRoO1xufVxuZnVuY3Rpb24gZ2V0QmFzZVBhdGgoc3VicGF0aCA9IFwiXCIpIHtcbiAgaWYgKCFiYXNlUGF0aCkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXdlYmF3ZXNvbWVdXCIpO1xuICAgIGlmIChlbD8uaGFzQXR0cmlidXRlKFwiZGF0YS13ZWJhd2Vzb21lXCIpKSB7XG4gICAgICBjb25zdCByb290UmVsYXRpdmVVcmwgPSBuZXcgVVJMKGVsLmdldEF0dHJpYnV0ZShcImRhdGEtd2ViYXdlc29tZVwiKSA/PyBcIlwiLCB3aW5kb3cubG9jYXRpb24uaHJlZikucGF0aG5hbWU7XG4gICAgICBzZXRCYXNlUGF0aChyb290UmVsYXRpdmVVcmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzY3JpcHRzID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpXTtcbiAgICAgIGNvbnN0IHdhU2NyaXB0ID0gc2NyaXB0cy5maW5kKFxuICAgICAgICAoc2NyaXB0KSA9PiBzY3JpcHQuc3JjLmVuZHNXaXRoKFwid2ViYXdlc29tZS5qc1wiKSB8fCBzY3JpcHQuc3JjLmVuZHNXaXRoKFwid2ViYXdlc29tZS5sb2FkZXIuanNcIikgfHwgc2NyaXB0LnNyYy5lbmRzV2l0aChcIndlYmF3ZXNvbWUuc3NyLWxvYWRlci5qc1wiKVxuICAgICAgKTtcbiAgICAgIGlmICh3YVNjcmlwdCkge1xuICAgICAgICBjb25zdCBwYXRoID0gU3RyaW5nKHdhU2NyaXB0LmdldEF0dHJpYnV0ZShcInNyY1wiKSk7XG4gICAgICAgIHNldEJhc2VQYXRoKHBhdGguc3BsaXQoXCIvXCIpLnNsaWNlKDAsIC0xKS5qb2luKFwiL1wiKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBiYXNlUGF0aC5yZXBsYWNlKC9cXC8kLywgXCJcIikgKyAoc3VicGF0aCA/IGAvJHtzdWJwYXRoLnJlcGxhY2UoL15cXC8vLCBcIlwiKX1gIDogYGApO1xufVxuZnVuY3Rpb24gc2V0S2l0Q29kZShjb2RlKSB7XG4gIGtpdENvZGUgPSBjb2RlO1xufVxuZnVuY3Rpb24gZ2V0S2l0Q29kZSgpIHtcbiAgaWYgKCFraXRDb2RlKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZmEta2l0LWNvZGVdXCIpO1xuICAgIGlmIChlbCkge1xuICAgICAgc2V0S2l0Q29kZShlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZhLWtpdC1jb2RlXCIpIHx8IFwiXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ga2l0Q29kZTtcbn1cblxuZXhwb3J0IHtcbiAgc2V0QmFzZVBhdGgsXG4gIGdldEJhc2VQYXRoLFxuICBzZXRLaXRDb2RlLFxuICBnZXRLaXRDb2RlXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cbmltcG9ydCB7XG4gIGdldEtpdENvZGVcbn0gZnJvbSBcIi4vY2h1bmsuSzZRTVVJSFAuanNcIjtcblxuLy8gc3JjL2NvbXBvbmVudHMvaWNvbi9saWJyYXJ5LmRlZmF1bHQudHNcbnZhciBGQV9WRVJTSU9OID0gXCI3LjIuMFwiO1xuZnVuY3Rpb24gZ2V0SWNvblVybChuYW1lLCBmYW1pbHksIHZhcmlhbnQpIHtcbiAgY29uc3Qga2l0Q29kZSA9IGdldEtpdENvZGUoKTtcbiAgY29uc3QgaXNQcm8gPSBraXRDb2RlLmxlbmd0aCA+IDA7XG4gIGxldCBmb2xkZXIgPSBcInNvbGlkXCI7XG4gIGlmIChmYW1pbHkgPT09IFwiY2hpc2VsXCIpIHtcbiAgICBmb2xkZXIgPSBcImNoaXNlbC1yZWd1bGFyXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJldGNoXCIpIHtcbiAgICBmb2xkZXIgPSBcImV0Y2gtc29saWRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcImdyYXBoaXRlXCIpIHtcbiAgICBmb2xkZXIgPSBcImdyYXBoaXRlLXRoaW5cIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcImplbGx5XCIpIHtcbiAgICBmb2xkZXIgPSBcImplbGx5LXJlZ3VsYXJcIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJkdW8tcmVndWxhclwiKSBmb2xkZXIgPSBcImplbGx5LWR1by1yZWd1bGFyXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwiZmlsbC1yZWd1bGFyXCIpIGZvbGRlciA9IFwiamVsbHktZmlsbC1yZWd1bGFyXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJqZWxseS1kdW9cIikge1xuICAgIGZvbGRlciA9IFwiamVsbHktZHVvLXJlZ3VsYXJcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcImplbGx5LWZpbGxcIikge1xuICAgIGZvbGRlciA9IFwiamVsbHktZmlsbC1yZWd1bGFyXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJub3Rkb2dcIikge1xuICAgIGlmICh2YXJpYW50ID09PSBcInNvbGlkXCIpIGZvbGRlciA9IFwibm90ZG9nLXNvbGlkXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwiZHVvLXNvbGlkXCIpIGZvbGRlciA9IFwibm90ZG9nLWR1by1zb2xpZFwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwibm90ZG9nLWR1b1wiKSB7XG4gICAgZm9sZGVyID0gXCJub3Rkb2ctZHVvLXNvbGlkXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJzbGFiXCIpIHtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJzb2xpZFwiIHx8IHZhcmlhbnQgPT09IFwicmVndWxhclwiKSBmb2xkZXIgPSBcInNsYWItcmVndWxhclwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcInByZXNzLXJlZ3VsYXJcIikgZm9sZGVyID0gXCJzbGFiLXByZXNzLXJlZ3VsYXJcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcInNsYWItcHJlc3NcIikge1xuICAgIGZvbGRlciA9IFwic2xhYi1wcmVzcy1yZWd1bGFyXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJ0aHVtYnByaW50XCIpIHtcbiAgICBmb2xkZXIgPSBcInRodW1icHJpbnQtbGlnaHRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcInV0aWxpdHlcIikge1xuICAgIGZvbGRlciA9IFwidXRpbGl0eS1zZW1pYm9sZFwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwidXRpbGl0eS1kdW9cIikge1xuICAgIGZvbGRlciA9IFwidXRpbGl0eS1kdW8tc2VtaWJvbGRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcInV0aWxpdHktZmlsbFwiKSB7XG4gICAgZm9sZGVyID0gXCJ1dGlsaXR5LWZpbGwtc2VtaWJvbGRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcIndoaXRlYm9hcmRcIikge1xuICAgIGZvbGRlciA9IFwid2hpdGVib2FyZC1zZW1pYm9sZFwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwiY2xhc3NpY1wiKSB7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwidGhpblwiKSBmb2xkZXIgPSBcInRoaW5cIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJsaWdodFwiKSBmb2xkZXIgPSBcImxpZ2h0XCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwicmVndWxhclwiKSBmb2xkZXIgPSBcInJlZ3VsYXJcIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJzb2xpZFwiKSBmb2xkZXIgPSBcInNvbGlkXCI7XG4gIH1cbiAgaWYgKGZhbWlseSA9PT0gXCJkdW90b25lXCIpIHtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJ0aGluXCIpIGZvbGRlciA9IFwiZHVvdG9uZS10aGluXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwibGlnaHRcIikgZm9sZGVyID0gXCJkdW90b25lLWxpZ2h0XCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwicmVndWxhclwiKSBmb2xkZXIgPSBcImR1b3RvbmUtcmVndWxhclwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcInNvbGlkXCIpIGZvbGRlciA9IFwiZHVvdG9uZVwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwic2hhcnBcIikge1xuICAgIGlmICh2YXJpYW50ID09PSBcInRoaW5cIikgZm9sZGVyID0gXCJzaGFycC10aGluXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwibGlnaHRcIikgZm9sZGVyID0gXCJzaGFycC1saWdodFwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcInJlZ3VsYXJcIikgZm9sZGVyID0gXCJzaGFycC1yZWd1bGFyXCI7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwic29saWRcIikgZm9sZGVyID0gXCJzaGFycC1zb2xpZFwiO1xuICB9XG4gIGlmIChmYW1pbHkgPT09IFwic2hhcnAtZHVvdG9uZVwiKSB7XG4gICAgaWYgKHZhcmlhbnQgPT09IFwidGhpblwiKSBmb2xkZXIgPSBcInNoYXJwLWR1b3RvbmUtdGhpblwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcImxpZ2h0XCIpIGZvbGRlciA9IFwic2hhcnAtZHVvdG9uZS1saWdodFwiO1xuICAgIGlmICh2YXJpYW50ID09PSBcInJlZ3VsYXJcIikgZm9sZGVyID0gXCJzaGFycC1kdW90b25lLXJlZ3VsYXJcIjtcbiAgICBpZiAodmFyaWFudCA9PT0gXCJzb2xpZFwiKSBmb2xkZXIgPSBcInNoYXJwLWR1b3RvbmUtc29saWRcIjtcbiAgfVxuICBpZiAoZmFtaWx5ID09PSBcImJyYW5kc1wiKSB7XG4gICAgZm9sZGVyID0gXCJicmFuZHNcIjtcbiAgfVxuICByZXR1cm4gaXNQcm8gPyBgaHR0cHM6Ly9rYS1wLmZvbnRhd2Vzb21lLmNvbS9yZWxlYXNlcy92JHtGQV9WRVJTSU9OfS9zdmdzLyR7Zm9sZGVyfS8ke25hbWV9LnN2Zz90b2tlbj0ke2VuY29kZVVSSUNvbXBvbmVudChraXRDb2RlKX1gIDogYGh0dHBzOi8va2EtZi5mb250YXdlc29tZS5jb20vcmVsZWFzZXMvdiR7RkFfVkVSU0lPTn0vc3Zncy8ke2ZvbGRlcn0vJHtuYW1lfS5zdmdgO1xufVxudmFyIGxpYnJhcnkgPSB7XG4gIG5hbWU6IFwiZGVmYXVsdFwiLFxuICByZXNvbHZlcjogKG5hbWUsIGZhbWlseSA9IFwiY2xhc3NpY1wiLCB2YXJpYW50ID0gXCJzb2xpZFwiKSA9PiB7XG4gICAgcmV0dXJuIGdldEljb25VcmwobmFtZSwgZmFtaWx5LCB2YXJpYW50KTtcbiAgfSxcbiAgbXV0YXRvcjogKHN2ZywgaG9zdEVsKSA9PiB7XG4gICAgaWYgKGhvc3RFbD8uZmFtaWx5ICYmICFzdmcuaGFzQXR0cmlidXRlKFwiZGF0YS1kdW90b25lLWluaXRpYWxpemVkXCIpKSB7XG4gICAgICBjb25zdCB7IGZhbWlseSwgdmFyaWFudCB9ID0gaG9zdEVsO1xuICAgICAgaWYgKFxuICAgICAgICAvLyBEdW90b25lXG4gICAgICAgIGZhbWlseSA9PT0gXCJkdW90b25lXCIgfHwgLy8gU2hhcnAgZHVvdG9uZVxuICAgICAgICBmYW1pbHkgPT09IFwic2hhcnAtZHVvdG9uZVwiIHx8IC8vIE5vdGRvZyBkdW8gKGNvcnJlY3QgdXNhZ2U6IGZhbWlseT1cIm5vdGRvZy1kdW9cIilcbiAgICAgICAgZmFtaWx5ID09PSBcIm5vdGRvZy1kdW9cIiB8fCAvLyBOT1RFOiBmYW1pbHk9XCJub3Rkb2dcIiB2YXJpYW50PVwiZHVvLXNvbGlkXCIgaXMgZGVwcmVjYXRlZFxuICAgICAgICBmYW1pbHkgPT09IFwibm90ZG9nXCIgJiYgdmFyaWFudCA9PT0gXCJkdW8tc29saWRcIiB8fCAvLyBKZWxseSBkdW8gKGNvcnJlY3QgdXNhZ2U6IGZhbWlseT1cImplbGx5LWR1b1wiKVxuICAgICAgICBmYW1pbHkgPT09IFwiamVsbHktZHVvXCIgfHwgLy8gTk9URTogZmFtaWx5PVwiamVsbHlcIiB2YXJpYW50PVwiZHVvLXJlZ3VsYXJcIiBpcyBkZXByZWNhdGVkXG4gICAgICAgIGZhbWlseSA9PT0gXCJqZWxseVwiICYmIHZhcmlhbnQgPT09IFwiZHVvLXJlZ3VsYXJcIiB8fCAvLyBVdGlsaXR5IGR1byAoY29ycmVjdCB1c2FnZTogZmFtaWx5PVwidXRpbGl0eS1kdW9cIilcbiAgICAgICAgZmFtaWx5ID09PSBcInV0aWxpdHktZHVvXCIgfHwgLy8gVGh1bWJwcmludFxuICAgICAgICBmYW1pbHkgPT09IFwidGh1bWJwcmludFwiXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgcGF0aHMgPSBbLi4uc3ZnLnF1ZXJ5U2VsZWN0b3JBbGwoXCJwYXRoXCIpXTtcbiAgICAgICAgY29uc3QgcHJpbWFyeVBhdGggPSBwYXRocy5maW5kKChwKSA9PiAhcC5oYXNBdHRyaWJ1dGUoXCJvcGFjaXR5XCIpKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kYXJ5UGF0aCA9IHBhdGhzLmZpbmQoKHApID0+IHAuaGFzQXR0cmlidXRlKFwib3BhY2l0eVwiKSk7XG4gICAgICAgIGlmICghcHJpbWFyeVBhdGggfHwgIXNlY29uZGFyeVBhdGgpIHJldHVybjtcbiAgICAgICAgcHJpbWFyeVBhdGguc2V0QXR0cmlidXRlKFwiZGF0YS1kdW90b25lLXByaW1hcnlcIiwgXCJcIik7XG4gICAgICAgIHNlY29uZGFyeVBhdGguc2V0QXR0cmlidXRlKFwiZGF0YS1kdW90b25lLXNlY29uZGFyeVwiLCBcIlwiKTtcbiAgICAgICAgaWYgKGhvc3RFbC5zd2FwT3BhY2l0eSAmJiBwcmltYXJ5UGF0aCAmJiBzZWNvbmRhcnlQYXRoKSB7XG4gICAgICAgICAgY29uc3Qgb3JpZ2luYWxPcGFjaXR5ID0gc2Vjb25kYXJ5UGF0aC5nZXRBdHRyaWJ1dGUoXCJvcGFjaXR5XCIpIHx8IFwiMC40XCI7XG4gICAgICAgICAgcHJpbWFyeVBhdGguc3R5bGUuc2V0UHJvcGVydHkoXCItLXBhdGgtb3BhY2l0eVwiLCBvcmlnaW5hbE9wYWNpdHkpO1xuICAgICAgICAgIHNlY29uZGFyeVBhdGguc3R5bGUuc2V0UHJvcGVydHkoXCItLXBhdGgtb3BhY2l0eVwiLCBcIjFcIik7XG4gICAgICAgIH1cbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZShcImRhdGEtZHVvdG9uZS1pbml0aWFsaXplZFwiLCBcIlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG52YXIgbGlicmFyeV9kZWZhdWx0X2RlZmF1bHQgPSBsaWJyYXJ5O1xuXG5leHBvcnQge1xuICBsaWJyYXJ5X2RlZmF1bHRfZGVmYXVsdFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb24vbGlicmFyeS5zeXN0ZW0udHNcbmZ1bmN0aW9uIGRhdGFVcmkoc3ZnKSB7XG4gIHJldHVybiBgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KHN2Zyl9YDtcbn1cbnZhciBpY29ucyA9IHtcbiAgLy9cbiAgLy8gU29saWQgdmFyaWFudFxuICAvL1xuICBzb2xpZDoge1xuICAgIGNoZWNrOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNDM0LjggNzAuMWMxNC4zIDEwLjQgMTcuNSAzMC40IDcuMSA0NC43bC0yNTYgMzUyYy01LjUgNy42LTE0IDEyLjMtMjMuNCAxMy4xcy0xOC41LTIuNy0yNS4xLTkuM2wtMTI4LTEyOGMtMTIuNS0xMi41LTEyLjUtMzIuOCAwLTQ1LjNzMzIuOC0xMi41IDQ1LjMgMGwxMDEuNSAxMDEuNSAyMzQtMzIxLjdjMTAuNC0xNC4zIDMwLjQtMTcuNSA0NC43LTcuMXpcIi8+PC9zdmc+YCxcbiAgICBcImNoZXZyb24tZG93blwiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjAxLjQgNDA2LjZjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBsMTkyLTE5MmMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM3MtMzIuOC0xMi41LTQ1LjMgMEwyMjQgMzM4LjcgNTQuNiAxNjkuNGMtMTIuNS0xMi41LTMyLjgtMTIuNS00NS4zIDBzLTEyLjUgMzIuOCAwIDQ1LjNsMTkyIDE5MnpcIi8+PC9zdmc+YCxcbiAgICBcImNoZXZyb24tbGVmdFwiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAzMjAgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNOS40IDIzMy40Yy0xMi41IDEyLjUtMTIuNSAzMi44IDAgNDUuM2wxOTIgMTkyYzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwczEyLjUtMzIuOCAwLTQ1LjNMNzcuMyAyNTYgMjQ2LjYgODYuNmMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM3MtMzIuOC0xMi41LTQ1LjMgMGwtMTkyIDE5MnpcIi8+PC9zdmc+YCxcbiAgICBcImNoZXZyb24tcmlnaHRcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMzIwIDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTMxMS4xIDIzMy40YzEyLjUgMTIuNSAxMi41IDMyLjggMCA0NS4zbC0xOTIgMTkyYy0xMi41IDEyLjUtMzIuOCAxMi41LTQ1LjMgMHMtMTIuNS0zMi44IDAtNDUuM0wyNDMuMiAyNTYgNzMuOSA4Ni42Yy0xMi41LTEyLjUtMTIuNS0zMi44IDAtNDUuM3MzMi44LTEyLjUgNDUuMyAwbDE5MiAxOTJ6XCIvPjwvc3ZnPmAsXG4gICAgY2lyY2xlOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMCAyNTZhMjU2IDI1NiAwIDEgMSA1MTIgMCAyNTYgMjU2IDAgMSAxIC01MTIgMHpcIi8+PC9zdmc+YCxcbiAgICBleWVkcm9wcGVyOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMzQxLjYgMjkuMmwtMTAxLjYgMTAxLjYtOS40LTkuNGMtMTIuNS0xMi41LTMyLjgtMTIuNS00NS4zIDBzLTEyLjUgMzIuOCAwIDQ1LjNsMTYwIDE2MGMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMHMxMi41LTMyLjggMC00NS4zbC05LjQtOS40IDEwMS42LTEwMS42YzM5LTM5IDM5LTEwMi4yIDAtMTQxLjFzLTEwMi4yLTM5LTE0MS4xIDB6TTU1LjQgMzIzLjNjLTE1IDE1LTIzLjQgMzUuNC0yMy40IDU2LjZsMCA0Mi40LTI2LjYgMzkuOWMtOC41IDEyLjctNi44IDI5LjYgNCA0MC40czI3LjcgMTIuNSA0MC40IDRsMzkuOS0yNi42IDQyLjQgMGMyMS4yIDAgNDEuNi04LjQgNTYuNi0yMy40bDEwOS40LTEwOS40LTQ1LjMtNDUuMy0xMDkuNCAxMDkuNGMtMyAzLTcuMSA0LjctMTEuMyA0LjdsLTM2LjEgMCAwLTM2LjFjMC00LjIgMS43LTguMyA0LjctMTEuM2wxMDkuNC0xMDkuNC00NS4zLTQ1LjMtMTA5LjQgMTA5LjR6XCIvPjwvc3ZnPmAsXG4gICAgZmlsZTogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xOTIgNjRDMTU2LjcgNjQgMTI4IDkyLjcgMTI4IDEyOEwxMjggNTEyQzEyOCA1NDcuMyAxNTYuNyA1NzYgMTkyIDU3Nkw0NDggNTc2QzQ4My4zIDU3NiA1MTIgNTQ3LjMgNTEyIDUxMkw1MTIgMjM0LjVDNTEyIDIxNy41IDUwNS4zIDIwMS4yIDQ5My4zIDE4OS4yTDM4Ni43IDgyLjdDMzc0LjcgNzAuNyAzNTguNSA2NCAzNDEuNSA2NEwxOTIgNjR6TTQ1My41IDI0MEwzNjAgMjQwQzM0Ni43IDI0MCAzMzYgMjI5LjMgMzM2IDIxNkwzMzYgMTIyLjVMNDUzLjUgMjQwelwiLz48L3N2Zz5gLFxuICAgIFwiZmlsZS1hdWRpb1wiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA2NDAgNjQwXCI+PCEtLSFGb250IEF3ZXNvbWUgRnJlZSA3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyOCAxMjhDMTI4IDkyLjcgMTU2LjcgNjQgMTkyIDY0TDM0MS41IDY0QzM1OC41IDY0IDM3NC44IDcwLjcgMzg2LjggODIuN0w0OTMuMyAxODkuM0M1MDUuMyAyMDEuMyA1MTIgMjE3LjYgNTEyIDIzNC42TDUxMiA1MTJDNTEyIDU0Ny4zIDQ4My4zIDU3NiA0NDggNTc2TDE5MiA1NzZDMTU2LjcgNTc2IDEyOCA1NDcuMyAxMjggNTEyTDEyOCAxMjh6TTMzNiAxMjIuNUwzMzYgMjE2QzMzNiAyMjkuMyAzNDYuNyAyNDAgMzYwIDI0MEw0NTMuNSAyNDBMMzM2IDEyMi41ek0zODkuOCAzMDcuN0MzODAuNyAzMDEuNCAzNjguMyAzMDMuNiAzNjIgMzEyLjdDMzU1LjcgMzIxLjggMzU3LjkgMzM0LjIgMzY3IDM0MC41QzM5MC45IDM1Ny4yIDQwNi40IDM4NC44IDQwNi40IDQxNkM0MDYuNCA0NDcuMiAzOTAuOCA0NzQuOSAzNjcgNDkxLjVDMzU3LjkgNDk3LjggMzU1LjcgNTEwLjMgMzYyIDUxOS4zQzM2OC4zIDUyOC4zIDM4MC44IDUzMC42IDM4OS44IDUyNC4zQzQyMy45IDUwMC41IDQ0Ni40IDQ2MC44IDQ0Ni40IDQxNkM0NDYuNCAzNzEuMiA0MjQgMzMxLjUgMzg5LjggMzA3Ljd6TTIwOCAzNzZDMTk5LjIgMzc2IDE5MiAzODMuMiAxOTIgMzkyTDE5MiA0NDBDMTkyIDQ0OC44IDE5OS4yIDQ1NiAyMDggNDU2TDIzMiA0NTZMMjU5LjIgNDkwQzI2Mi4yIDQ5My44IDI2Ni44IDQ5NiAyNzEuNyA0OTZMMjcyIDQ5NkMyODAuOCA0OTYgMjg4IDQ4OC44IDI4OCA0ODBMMjg4IDM1MkMyODggMzQzLjIgMjgwLjggMzM2IDI3MiAzMzZMMjcxLjcgMzM2QzI2Ni44IDMzNiAyNjIuMiAzMzguMiAyNTkuMiAzNDJMMjMyIDM3NkwyMDggMzc2ek0zMzYgNDQ4LjJDMzM2IDQ1OC45IDM0Ni41IDQ2Ni40IDM1NC45IDQ1OS44QzM2Ny44IDQ0OS41IDM3NiA0MzMuNyAzNzYgNDE2QzM3NiAzOTguMyAzNjcuOCAzODIuNSAzNTQuOSAzNzIuMkMzNDYuNSAzNjUuNSAzMzYgMzczLjEgMzM2IDM4My44TDMzNiA0NDguM3pcIi8+PC9zdmc+YCxcbiAgICBcImZpbGUtY29kZVwiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA2NDAgNjQwXCI+PCEtLSFGb250IEF3ZXNvbWUgRnJlZSA3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyOCAxMjhDMTI4IDkyLjcgMTU2LjcgNjQgMTkyIDY0TDM0MS41IDY0QzM1OC41IDY0IDM3NC44IDcwLjcgMzg2LjggODIuN0w0OTMuMyAxODkuM0M1MDUuMyAyMDEuMyA1MTIgMjE3LjYgNTEyIDIzNC42TDUxMiA1MTJDNTEyIDU0Ny4zIDQ4My4zIDU3NiA0NDggNTc2TDE5MiA1NzZDMTU2LjcgNTc2IDEyOCA1NDcuMyAxMjggNTEyTDEyOCAxMjh6TTMzNiAxMjIuNUwzMzYgMjE2QzMzNiAyMjkuMyAzNDYuNyAyNDAgMzYwIDI0MEw0NTMuNSAyNDBMMzM2IDEyMi41ek0yODIuMiAzNTkuNkMyOTAuOCAzNDkuNSAyODkuNyAzMzQuNCAyNzkuNiAzMjUuOEMyNjkuNSAzMTcuMiAyNTQuNCAzMTguMyAyNDUuOCAzMjguNEwxOTcuOCAzODQuNEMxOTAuMSAzOTMuNCAxOTAuMSA0MDYuNiAxOTcuOCA0MTUuNkwyNDUuOCA0NzEuNkMyNTQuNCA0ODEuNyAyNjkuNiA0ODIuOCAyNzkuNiA0NzQuMkMyODkuNiA0NjUuNiAyOTAuOCA0NTAuNCAyODIuMiA0NDAuNEwyNDcuNiA0MDBMMjgyLjIgMzU5LjZ6TTM5NC4yIDMyOC40QzM4NS42IDMxOC4zIDM3MC40IDMxNy4yIDM2MC40IDMyNS44QzM1MC40IDMzNC40IDM0OS4yIDM0OS42IDM1Ny44IDM1OS42TDM5Mi40IDQwMEwzNTcuOCA0NDAuNEMzNDkuMiA0NTAuNSAzNTAuMyA0NjUuNiAzNjAuNCA0NzQuMkMzNzAuNSA0ODIuOCAzODUuNiA0ODEuNyAzOTQuMiA0NzEuNkw0NDIuMiA0MTUuNkM0NDkuOSA0MDYuNiA0NDkuOSAzOTMuNCA0NDIuMiAzODQuNEwzOTQuMiAzMjguNHpcIi8+PC9zdmc+YCxcbiAgICBcImZpbGUtZXhjZWxcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMjggMTI4QzEyOCA5Mi43IDE1Ni43IDY0IDE5MiA2NEwzNDEuNSA2NEMzNTguNSA2NCAzNzQuOCA3MC43IDM4Ni44IDgyLjdMNDkzLjMgMTg5LjNDNTA1LjMgMjAxLjMgNTEyIDIxNy42IDUxMiAyMzQuNkw1MTIgNTEyQzUxMiA1NDcuMyA0ODMuMyA1NzYgNDQ4IDU3NkwxOTIgNTc2QzE1Ni43IDU3NiAxMjggNTQ3LjMgMTI4IDUxMkwxMjggMTI4ek0zMzYgMTIyLjVMMzM2IDIxNkMzMzYgMjI5LjMgMzQ2LjcgMjQwIDM2MCAyNDBMNDUzLjUgMjQwTDMzNiAxMjIuNXpNMjkyIDMzMC43QzI4NC42IDMxOS43IDI2OS43IDMxNi43IDI1OC43IDMyNEMyNDcuNyAzMzEuMyAyNDQuNyAzNDYuMyAyNTIgMzU3LjNMMjkxLjIgNDE2TDI1MiA0NzQuN0MyNDQuNiA0ODUuNyAyNDcuNiA1MDAuNiAyNTguNyA1MDhDMjY5LjggNTE1LjQgMjg0LjYgNTEyLjQgMjkyIDUwMS4zTDMyMCA0NTkuM0wzNDggNTAxLjNDMzU1LjQgNTEyLjMgMzcwLjMgNTE1LjMgMzgxLjMgNTA4QzM5Mi4zIDUwMC43IDM5NS4zIDQ4NS43IDM4OCA0NzQuN0wzNDguOCA0MTZMMzg4IDM1Ny4zQzM5NS40IDM0Ni4zIDM5Mi40IDMzMS40IDM4MS4zIDMyNEMzNzAuMiAzMTYuNiAzNTUuNCAzMTkuNiAzNDggMzMwLjdMMzIwIDM3Mi43TDI5MiAzMzAuN3pcIi8+PC9zdmc+YCxcbiAgICBcImZpbGUtaW1hZ2VcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMjggMTI4QzEyOCA5Mi43IDE1Ni43IDY0IDE5MiA2NEwzNDEuNSA2NEMzNTguNSA2NCAzNzQuOCA3MC43IDM4Ni44IDgyLjdMNDkzLjMgMTg5LjNDNTA1LjMgMjAxLjMgNTEyIDIxNy42IDUxMiAyMzQuNkw1MTIgNTEyQzUxMiA1NDcuMyA0ODMuMyA1NzYgNDQ4IDU3NkwxOTIgNTc2QzE1Ni43IDU3NiAxMjggNTQ3LjMgMTI4IDUxMkwxMjggMTI4ek0zMzYgMTIyLjVMMzM2IDIxNkMzMzYgMjI5LjMgMzQ2LjcgMjQwIDM2MCAyNDBMNDUzLjUgMjQwTDMzNiAxMjIuNXpNMjU2IDMyMEMyNTYgMzAyLjMgMjQxLjcgMjg4IDIyNCAyODhDMjA2LjMgMjg4IDE5MiAzMDIuMyAxOTIgMzIwQzE5MiAzMzcuNyAyMDYuMyAzNTIgMjI0IDM1MkMyNDEuNyAzNTIgMjU2IDMzNy43IDI1NiAzMjB6TTIyMC42IDUxMkw0MTkuNCA1MTJDNDM1LjIgNTEyIDQ0OCA0OTkuMiA0NDggNDgzLjRDNDQ4IDQ3Ni4xIDQ0NS4yIDQ2OSA0NDAuMSA0NjMuN0wzNDMuMyAzNjEuOUMzMzcuMyAzNTUuNiAzMjguOSAzNTIgMzIwLjEgMzUyTDMxOS44IDM1MkMzMTEgMzUyIDMwMi43IDM1NS42IDI5Ni42IDM2MS45TDE5OS45IDQ2My43QzE5NC44IDQ2OSAxOTIgNDc2LjEgMTkyIDQ4My40QzE5MiA0OTkuMiAyMDQuOCA1MTIgMjIwLjYgNTEyelwiLz48L3N2Zz5gLFxuICAgIFwiZmlsZS1wZGZcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMjggNjRDOTIuNyA2NCA2NCA5Mi43IDY0IDEyOEw2NCA1MTJDNjQgNTQ3LjMgOTIuNyA1NzYgMTI4IDU3NkwyMDggNTc2TDIwOCA0NjRDMjA4IDQyOC43IDIzNi43IDQwMCAyNzIgNDAwTDQ0OCA0MDBMNDQ4IDIzNC41QzQ0OCAyMTcuNSA0NDEuMyAyMDEuMiA0MjkuMyAxODkuMkwzMjIuNyA4Mi43QzMxMC43IDcwLjcgMjk0LjUgNjQgMjc3LjUgNjRMMTI4IDY0ek0zODkuNSAyNDBMMjk2IDI0MEMyODIuNyAyNDAgMjcyIDIyOS4zIDI3MiAyMTZMMjcyIDEyMi41TDM4OS41IDI0MHpNMjcyIDQ0NEMyNjEgNDQ0IDI1MiA0NTMgMjUyIDQ2NEwyNTIgNTkyQzI1MiA2MDMgMjYxIDYxMiAyNzIgNjEyQzI4MyA2MTIgMjkyIDYwMyAyOTIgNTkyTDI5MiA1NjRMMzA0IDU2NEMzMzcuMSA1NjQgMzY0IDUzNy4xIDM2NCA1MDRDMzY0IDQ3MC45IDMzNy4xIDQ0NCAzMDQgNDQ0TDI3MiA0NDR6TTMwNCA1MjRMMjkyIDUyNEwyOTIgNDg0TDMwNCA0ODRDMzE1IDQ4NCAzMjQgNDkzIDMyNCA1MDRDMzI0IDUxNSAzMTUgNTI0IDMwNCA1MjR6TTQwMCA0NDRDMzg5IDQ0NCAzODAgNDUzIDM4MCA0NjRMMzgwIDU5MkMzODAgNjAzIDM4OSA2MTIgNDAwIDYxMkw0MzIgNjEyQzQ2MC43IDYxMiA0ODQgNTg4LjcgNDg0IDU2MEw0ODQgNDk2QzQ4NCA0NjcuMyA0NjAuNyA0NDQgNDMyIDQ0NEw0MDAgNDQ0ek00MjAgNTcyTDQyMCA0ODRMNDMyIDQ4NEM0MzguNiA0ODQgNDQ0IDQ4OS40IDQ0NCA0OTZMNDQ0IDU2MEM0NDQgNTY2LjYgNDM4LjYgNTcyIDQzMiA1NzJMNDIwIDU3MnpNNTA4IDQ2NEw1MDggNTkyQzUwOCA2MDMgNTE3IDYxMiA1MjggNjEyQzUzOSA2MTIgNTQ4IDYwMyA1NDggNTkyTDU0OCA1NDhMNTc2IDU0OEM1ODcgNTQ4IDU5NiA1MzkgNTk2IDUyOEM1OTYgNTE3IDU4NyA1MDggNTc2IDUwOEw1NDggNTA4TDU0OCA0ODRMNTc2IDQ4NEM1ODcgNDg0IDU5NiA0NzUgNTk2IDQ2NEM1OTYgNDUzIDU4NyA0NDQgNTc2IDQ0NEw1MjggNDQ0QzUxNyA0NDQgNTA4IDQ1MyA1MDggNDY0elwiLz48L3N2Zz5gLFxuICAgIFwiZmlsZS1wb3dlcnBvaW50XCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTI4IDEyOEMxMjggOTIuNyAxNTYuNyA2NCAxOTIgNjRMMzQxLjUgNjRDMzU4LjUgNjQgMzc0LjggNzAuNyAzODYuOCA4Mi43TDQ5My4zIDE4OS4zQzUwNS4zIDIwMS4zIDUxMiAyMTcuNiA1MTIgMjM0LjZMNTEyIDUxMkM1MTIgNTQ3LjMgNDgzLjMgNTc2IDQ0OCA1NzZMMTkyIDU3NkMxNTYuNyA1NzYgMTI4IDU0Ny4zIDEyOCA1MTJMMTI4IDEyOHpNMzM2IDEyMi41TDMzNiAyMTZDMzM2IDIyOS4zIDM0Ni43IDI0MCAzNjAgMjQwTDQ1My41IDI0MEwzMzYgMTIyLjV6TTI4MCAzMjBDMjY2LjcgMzIwIDI1NiAzMzAuNyAyNTYgMzQ0TDI1NiA0ODhDMjU2IDUwMS4zIDI2Ni43IDUxMiAyODAgNTEyQzI5My4zIDUxMiAzMDQgNTAxLjMgMzA0IDQ4OEwzMDQgNDY0TDMyOCA0NjRDMzY3LjggNDY0IDQwMCA0MzEuOCA0MDAgMzkyQzQwMCAzNTIuMiAzNjcuOCAzMjAgMzI4IDMyMEwyODAgMzIwek0zMjggNDE2TDMwNCA0MTZMMzA0IDM2OEwzMjggMzY4QzM0MS4zIDM2OCAzNTIgMzc4LjcgMzUyIDM5MkMzNTIgNDA1LjMgMzQxLjMgNDE2IDMyOCA0MTZ6XCIvPjwvc3ZnPmAsXG4gICAgXCJmaWxlLXZpZGVvXCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTI4IDEyOEMxMjggOTIuNyAxNTYuNyA2NCAxOTIgNjRMMzQxLjUgNjRDMzU4LjUgNjQgMzc0LjggNzAuNyAzODYuOCA4Mi43TDQ5My4zIDE4OS4zQzUwNS4zIDIwMS4zIDUxMiAyMTcuNiA1MTIgMjM0LjZMNTEyIDUxMkM1MTIgNTQ3LjMgNDgzLjMgNTc2IDQ0OCA1NzZMMTkyIDU3NkMxNTYuNyA1NzYgMTI4IDU0Ny4zIDEyOCA1MTJMMTI4IDEyOHpNMzM2IDEyMi41TDMzNiAyMTZDMzM2IDIyOS4zIDM0Ni43IDI0MCAzNjAgMjQwTDQ1My41IDI0MEwzMzYgMTIyLjV6TTIwOCAzNjhMMjA4IDQ2NEMyMDggNDgxLjcgMjIyLjMgNDk2IDI0MCA0OTZMMzM2IDQ5NkMzNTMuNyA0OTYgMzY4IDQ4MS43IDM2OCA0NjRMMzY4IDQ0MEw0MDMgNDc1QzQwNi4yIDQ3OC4yIDQxMC41IDQ4MCA0MTUgNDgwQzQyNC40IDQ4MCA0MzIgNDcyLjQgNDMyIDQ2M0w0MzIgMzY4LjlDNDMyIDM1OS41IDQyNC40IDM1MS45IDQxNSAzNTEuOUM0MTAuNSAzNTEuOSA0MDYuMiAzNTMuNyA0MDMgMzU2LjlMMzY4IDM5MS45TDM2OCAzNjcuOUMzNjggMzUwLjIgMzUzLjcgMzM1LjkgMzM2IDMzNS45TDI0MCAzMzUuOUMyMjIuMyAzMzUuOSAyMDggMzUwLjIgMjA4IDM2Ny45elwiLz48L3N2Zz5gLFxuICAgIFwiZmlsZS13b3JkXCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMTI4IDEyOEMxMjggOTIuNyAxNTYuNyA2NCAxOTIgNjRMMzQxLjUgNjRDMzU4LjUgNjQgMzc0LjggNzAuNyAzODYuOCA4Mi43TDQ5My4zIDE4OS4zQzUwNS4zIDIwMS4zIDUxMiAyMTcuNiA1MTIgMjM0LjZMNTEyIDUxMkM1MTIgNTQ3LjMgNDgzLjMgNTc2IDQ0OCA1NzZMMTkyIDU3NkMxNTYuNyA1NzYgMTI4IDU0Ny4zIDEyOCA1MTJMMTI4IDEyOHpNMzM2IDEyMi41TDMzNiAyMTZDMzM2IDIyOS4zIDM0Ni43IDI0MCAzNjAgMjQwTDQ1My41IDI0MEwzMzYgMTIyLjV6TTI2My40IDMzOC44QzI2MC41IDMyNS45IDI0Ny43IDMxNy43IDIzNC44IDMyMC42QzIyMS45IDMyMy41IDIxMy43IDMzNi4zIDIxNi42IDM0OS4yTDI0OC42IDQ5My4yQzI1MC45IDUwMy43IDI2MCA1MTEuNCAyNzAuOCA1MTJDMjgxLjYgNTEyLjYgMjkxLjQgNTA1LjkgMjk0LjggNDk1LjZMMzIwIDQxOS45TDM0NS4yIDQ5NS42QzM0OC42IDUwNS44IDM1OC40IDUxMi41IDM2OS4yIDUxMkMzODAgNTExLjUgMzg5LjEgNTAzLjggMzkxLjQgNDkzLjJMNDIzLjQgMzQ5LjJDNDI2LjMgMzM2LjMgNDE4LjEgMzIzLjQgNDA1LjIgMzIwLjZDMzkyLjMgMzE3LjggMzc5LjQgMzI1LjkgMzc2LjYgMzM4LjhMMzYzLjQgMzk4LjJMMzQyLjggMzM2LjRDMzM5LjUgMzI2LjYgMzMwLjQgMzIwIDMyMCAzMjBDMzA5LjYgMzIwIDMwMC41IDMyNi42IDI5Ny4yIDMzNi40TDI3Ni42IDM5OC4yTDI2My40IDMzOC44elwiLz48L3N2Zz5gLFxuICAgIFwiZmlsZS16aXBwZXJcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xMjggMTI4QzEyOCA5Mi43IDE1Ni43IDY0IDE5MiA2NEwzNDEuNSA2NEMzNTguNSA2NCAzNzQuOCA3MC43IDM4Ni44IDgyLjdMNDkzLjMgMTg5LjNDNTA1LjMgMjAxLjMgNTEyIDIxNy42IDUxMiAyMzQuNkw1MTIgNTEyQzUxMiA1NDcuMyA0ODMuMyA1NzYgNDQ4IDU3NkwxOTIgNTc2QzE1Ni43IDU3NiAxMjggNTQ3LjMgMTI4IDUxMkwxMjggMTI4ek0zMzYgMTIyLjVMMzM2IDIxNkMzMzYgMjI5LjMgMzQ2LjcgMjQwIDM2MCAyNDBMNDUzLjUgMjQwTDMzNiAxMjIuNXpNMTkyIDEzNkMxOTIgMTQ5LjMgMjAyLjcgMTYwIDIxNiAxNjBMMjY0IDE2MEMyNzcuMyAxNjAgMjg4IDE0OS4zIDI4OCAxMzZDMjg4IDEyMi43IDI3Ny4zIDExMiAyNjQgMTEyTDIxNiAxMTJDMjAyLjcgMTEyIDE5MiAxMjIuNyAxOTIgMTM2ek0xOTIgMjMyQzE5MiAyNDUuMyAyMDIuNyAyNTYgMjE2IDI1NkwyNjQgMjU2QzI3Ny4zIDI1NiAyODggMjQ1LjMgMjg4IDIzMkMyODggMjE4LjcgMjc3LjMgMjA4IDI2NCAyMDhMMjE2IDIwOEMyMDIuNyAyMDggMTkyIDIxOC43IDE5MiAyMzJ6TTI1NiAzMDRMMjI0IDMwNEMyMDYuMyAzMDQgMTkyIDMxOC4zIDE5MiAzMzZMMTkyIDM4NEMxOTIgNDEwLjUgMjEzLjUgNDMyIDI0MCA0MzJDMjY2LjUgNDMyIDI4OCA0MTAuNSAyODggMzg0TDI4OCAzMzZDMjg4IDMxOC4zIDI3My43IDMwNCAyNTYgMzA0ek0yNDAgMzY4QzI0OC44IDM2OCAyNTYgMzc1LjIgMjU2IDM4NEMyNTYgMzkyLjggMjQ4LjggNDAwIDI0MCA0MDBDMjMxLjIgNDAwIDIyNCAzOTIuOCAyMjQgMzg0QzIyNCAzNzUuMiAyMzEuMiAzNjggMjQwIDM2OHpcIi8+PC9zdmc+YCxcbiAgICBcImdyaXAtdmVydGljYWxcIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMzIwIDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTEyOCA0MGMwLTIyLjEtMTcuOS00MC00MC00MEw0MCAwQzE3LjkgMCAwIDE3LjkgMCA0MEwwIDg4YzAgMjIuMSAxNy45IDQwIDQwIDQwbDQ4IDBjMjIuMSAwIDQwLTE3LjkgNDAtNDBsMC00OHptMCAxOTJjMC0yMi4xLTE3LjktNDAtNDAtNDBsLTQ4IDBjLTIyLjEgMC00MCAxNy45LTQwIDQwbDAgNDhjMCAyMi4xIDE3LjkgNDAgNDAgNDBsNDggMGMyMi4xIDAgNDAtMTcuOSA0MC00MGwwLTQ4ek0wIDQyNGwwIDQ4YzAgMjIuMSAxNy45IDQwIDQwIDQwbDQ4IDBjMjIuMSAwIDQwLTE3LjkgNDAtNDBsMC00OGMwLTIyLjEtMTcuOS00MC00MC00MGwtNDggMGMtMjIuMSAwLTQwIDE3LjktNDAgNDB6TTMyMCA0MGMwLTIyLjEtMTcuOS00MC00MC00MEwyMzIgMGMtMjIuMSAwLTQwIDE3LjktNDAgNDBsMCA0OGMwIDIyLjEgMTcuOSA0MCA0MCA0MGw0OCAwYzIyLjEgMCA0MC0xNy45IDQwLTQwbDAtNDh6TTE5MiAyMzJsMCA0OGMwIDIyLjEgMTcuOSA0MCA0MCA0MGw0OCAwYzIyLjEgMCA0MC0xNy45IDQwLTQwbDAtNDhjMC0yMi4xLTE3LjktNDAtNDAtNDBsLTQ4IDBjLTIyLjEgMC00MCAxNy45LTQwIDQwek0zMjAgNDI0YzAtMjIuMS0xNy45LTQwLTQwLTQwbC00OCAwYy0yMi4xIDAtNDAgMTcuOS00MCA0MGwwIDQ4YzAgMjIuMSAxNy45IDQwIDQwIDQwbDQ4IDBjMjIuMSAwIDQwLTE3LjkgNDAtNDBsMC00OHpcIi8+PC9zdmc+YCxcbiAgICBpbmRldGVybWluYXRlOiBgPHN2ZyBwYXJ0PVwiaW5kZXRlcm1pbmF0ZS1pY29uXCIgY2xhc3M9XCJpY29uXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiPjxnIHN0cm9rZT1cIm5vbmVcIiBzdHJva2Utd2lkdGg9XCIxXCIgZmlsbD1cIm5vbmVcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiPjxnIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIj48ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMi4yODU3MTQgNi44NTcxNDMpXCI+PHBhdGggZD1cIk0xMC4yODU3MTQzLDEuMTQyODU3MTQgTDEuMTQyODU3MTQsMS4xNDI4NTcxNFwiLz48L2c+PC9nPjwvZz48L3N2Zz5gLFxuICAgIG1pbnVzOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMCAyNTZjMC0xNy43IDE0LjMtMzIgMzItMzJsMzg0IDBjMTcuNyAwIDMyIDE0LjMgMzIgMzJzLTE0LjMgMzItMzIgMzJMMzIgMjg4Yy0xNy43IDAtMzItMTQuMy0zMi0zMnpcIi8+PC9zdmc+YCxcbiAgICBwYXVzZTogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMzg0IDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTQ4IDMyQzIxLjUgMzIgMCA1My41IDAgODBMMCA0MzJjMCAyNi41IDIxLjUgNDggNDggNDhsNjQgMGMyNi41IDAgNDgtMjEuNSA0OC00OGwwLTM1MmMwLTI2LjUtMjEuNS00OC00OC00OEw0OCAzMnptMjI0IDBjLTI2LjUgMC00OCAyMS41LTQ4IDQ4bDAgMzUyYzAgMjYuNSAyMS41IDQ4IDQ4IDQ4bDY0IDBjMjYuNSAwIDQ4LTIxLjUgNDgtNDhsMC0zNTJjMC0yNi41LTIxLjUtNDgtNDgtNDhsLTY0IDB6XCIvPjwvc3ZnPmAsXG4gICAgcGxheTogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTkxLjIgMzYuOWMtMTIuNC02LjgtMjcuNC02LjUtMzkuNiAuN1MzMiA1Ny45IDMyIDcybDAgMzY4YzAgMTQuMSA3LjUgMjcuMiAxOS42IDM0LjRzMjcuMiA3LjUgMzkuNiAuN2wzMzYtMTg0YzEyLjgtNyAyMC44LTIwLjUgMjAuOC0zNS4xcy04LTI4LjEtMjAuOC0zNS4xbC0zMzYtMTg0elwiLz48L3N2Zz5gLFxuICAgIHBsdXM6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDY0MCA2NDBcIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDcuMS4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMzUyIDEyOEMzNTIgMTEwLjMgMzM3LjcgOTYgMzIwIDk2QzMwMi4zIDk2IDI4OCAxMTAuMyAyODggMTI4TDI4OCAyODhMMTI4IDI4OEMxMTAuMyAyODggOTYgMzAyLjMgOTYgMzIwQzk2IDMzNy43IDExMC4zIDM1MiAxMjggMzUyTDI4OCAzNTJMMjg4IDUxMkMyODggNTI5LjcgMzAyLjMgNTQ0IDMyMCA1NDRDMzM3LjcgNTQ0IDM1MiA1MjkuNyAzNTIgNTEyTDM1MiAzNTJMNTEyIDM1MkM1MjkuNyAzNTIgNTQ0IDMzNy43IDU0NCAzMjBDNTQ0IDMwMi4zIDUyOS43IDI4OCA1MTIgMjg4TDM1MiAyODhMMzUyIDEyOHpcIi8+PC9zdmc+YCxcbiAgICBzdGFyOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1NzYgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMzA5LjUtMTguOWMtNC4xLTgtMTIuNC0xMy4xLTIxLjQtMTMuMXMtMTcuMyA1LjEtMjEuNCAxMy4xTDE5My4xIDEyNS4zIDMzLjIgMTUwLjdjLTguOSAxLjQtMTYuMyA3LjctMTkuMSAxNi4zcy0uNSAxOCA1LjggMjQuNGwxMTQuNCAxMTQuNS0yNS4yIDE1OS45Yy0xLjQgOC45IDIuMyAxNy45IDkuNiAyMy4yczE2LjkgNi4xIDI1IDJMMjg4LjEgNDE3LjYgNDMyLjQgNDkxYzggNC4xIDE3LjcgMy4zIDI1LTJzMTEtMTQuMiA5LjYtMjMuMkw0NDEuNyAzMDUuOSA1NTYuMSAxOTEuNGM2LjQtNi40IDguNi0xNS44IDUuOC0yNC40cy0xMC4xLTE0LjktMTkuMS0xNi4zTDM4MyAxMjUuMyAzMDkuNS0xOC45elwiLz48L3N2Zz5gLFxuICAgIHVwbG9hZDogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNjQwIDY0MFwiPjwhLS0hRm9udCBBd2Vzb21lIEZyZWUgNy4xLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4tLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0zNTIgMTczLjNMMzUyIDM4NEMzNTIgNDAxLjcgMzM3LjcgNDE2IDMyMCA0MTZDMzAyLjMgNDE2IDI4OCA0MDEuNyAyODggMzg0TDI4OCAxNzMuM0wyNDYuNiAyMTQuN0MyMzQuMSAyMjcuMiAyMTMuOCAyMjcuMiAyMDEuMyAyMTQuN0MxODguOCAyMDIuMiAxODguOCAxODEuOSAyMDEuMyAxNjkuNEwyOTcuMyA3My40QzMwOS44IDYwLjkgMzMwLjEgNjAuOSAzNDIuNiA3My40TDQzOC42IDE2OS40QzQ1MS4xIDE4MS45IDQ1MS4xIDIwMi4yIDQzOC42IDIxNC43QzQyNi4xIDIyNy4yIDQwNS44IDIyNy4yIDM5My4zIDIxNC43TDM1MiAxNzMuM3pNMzIwIDQ2NEMzNjQuMiA0NjQgNDAwIDQyOC4yIDQwMCAzODRMNDgwIDM4NEM1MTUuMyAzODQgNTQ0IDQxMi43IDU0NCA0NDhMNTQ0IDQ4MEM1NDQgNTE1LjMgNTE1LjMgNTQ0IDQ4MCA1NDRMMTYwIDU0NEMxMjQuNyA1NDQgOTYgNTE1LjMgOTYgNDgwTDk2IDQ0OEM5NiA0MTIuNyAxMjQuNyAzODQgMTYwIDM4NEwyNDAgMzg0QzI0MCA0MjguMiAyNzUuOCA0NjQgMzIwIDQ2NHpNNDY0IDQ4OEM0NzcuMyA0ODggNDg4IDQ3Ny4zIDQ4OCA0NjRDNDg4IDQ1MC43IDQ3Ny4zIDQ0MCA0NjQgNDQwQzQ1MC43IDQ0MCA0NDAgNDUwLjcgNDQwIDQ2NEM0NDAgNDc3LjMgNDUwLjcgNDg4IDQ2NCA0ODh6XCIvPjwvc3ZnPmAsXG4gICAgdXNlcjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTIyNCAyNDhhMTIwIDEyMCAwIDEgMCAwLTI0MCAxMjAgMTIwIDAgMSAwIDAgMjQwem0tMjkuNyA1NkM5NS44IDMwNCAxNiAzODMuOCAxNiA0ODIuMyAxNiA0OTguNyAyOS4zIDUxMiA0NS43IDUxMmwzNTYuNiAwYzE2LjQgMCAyOS43LTEzLjMgMjkuNy0yOS43IDAtOTguNS03OS44LTE3OC4zLTE3OC4zLTE3OC4zbC01OS40IDB6XCIvPjwvc3ZnPmAsXG4gICAgeG1hcms6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDM4NCA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk01NS4xIDczLjRjLTEyLjUtMTIuNS0zMi44LTEyLjUtNDUuMyAwcy0xMi41IDMyLjggMCA0NS4zTDE0Ny4yIDI1NiA5LjkgMzkzLjRjLTEyLjUgMTIuNS0xMi41IDMyLjggMCA0NS4zczMyLjggMTIuNSA0NS4zIDBMMTkyLjUgMzAxLjMgMzI5LjkgNDM4LjZjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBzMTIuNS0zMi44IDAtNDUuM0wyMzcuOCAyNTYgMzc1LjEgMTE4LjZjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNzLTMyLjgtMTIuNS00NS4zIDBMMTkyLjUgMjEwLjcgNTUuMSA3My40elwiLz48L3N2Zz5gXG4gIH0sXG4gIC8vXG4gIC8vIFJlZ3VsYXIgdmFyaWFudFxuICAvL1xuICByZWd1bGFyOiB7XG4gICAgXCJjaXJjbGUtcXVlc3Rpb25cIjogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTQ2NCAyNTZhMjA4IDIwOCAwIDEgMCAtNDE2IDAgMjA4IDIwOCAwIDEgMCA0MTYgMHpNMCAyNTZhMjU2IDI1NiAwIDEgMSA1MTIgMCAyNTYgMjU2IDAgMSAxIC01MTIgMHptMjU2LTgwYy0xNy43IDAtMzIgMTQuMy0zMiAzMiAwIDEzLjMtMTAuNyAyNC0yNCAyNHMtMjQtMTAuNy0yNC0yNGMwLTQ0LjIgMzUuOC04MCA4MC04MHM4MCAzNS44IDgwIDgwYzAgNDcuMi0zNiA2Ny4yLTU2IDc0LjVsMCAzLjhjMCAxMy4zLTEwLjcgMjQtMjQgMjRzLTI0LTEwLjctMjQtMjRsMC04LjFjMC0yMC41IDE0LjgtMzUuMiAzMC4xLTQwLjIgNi40LTIuMSAxMy4yLTUuNSAxOC4yLTEwLjMgNC4zLTQuMiA3LjctMTAgNy43LTE5LjYgMC0xNy43LTE0LjMtMzItMzItMzJ6TTIyNCAzNjhhMzIgMzIgMCAxIDEgNjQgMCAzMiAzMiAwIDEgMSAtNjQgMHpcIi8+PC9zdmc+YCxcbiAgICBcImNpcmNsZS14bWFya1wiOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNy4wLjAgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UvZnJlZSBDb3B5cmlnaHQgMjAyNSBGb250aWNvbnMsIEluYy4gLS0+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjU2IDQ4YTIwOCAyMDggMCAxIDEgMCA0MTYgMjA4IDIwOCAwIDEgMSAwLTQxNnptMCA0NjRhMjU2IDI1NiAwIDEgMCAwLTUxMiAyNTYgMjU2IDAgMSAwIDAgNTEyek0xNjcgMTY3Yy05LjQgOS40LTkuNCAyNC42IDAgMzMuOWw1NSA1NS01NSA1NWMtOS40IDkuNC05LjQgMjQuNiAwIDMzLjlzMjQuNiA5LjQgMzMuOSAwbDU1LTU1IDU1IDU1YzkuNCA5LjQgMjQuNiA5LjQgMzMuOSAwczkuNC0yNC42IDAtMzMuOWwtNTUtNTUgNTUtNTVjOS40LTkuNCA5LjQtMjQuNiAwLTMzLjlzLTI0LjYtOS40LTMzLjkgMGwtNTUgNTUtNTUtNTVjLTkuNC05LjQtMjQuNi05LjQtMzMuOSAwelwiLz48L3N2Zz5gLFxuICAgIGNvcHk6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0zODQgMzM2bC0xOTIgMGMtOC44IDAtMTYtNy4yLTE2LTE2bDAtMjU2YzAtOC44IDcuMi0xNiAxNi0xNmwxMzMuNSAwYzQuMiAwIDguMyAxLjcgMTEuMyA0LjdsNTguNSA1OC41YzMgMyA0LjcgNy4xIDQuNyAxMS4zTDQwMCAzMjBjMCA4LjgtNy4yIDE2LTE2IDE2ek0xOTIgMzg0bDE5MiAwYzM1LjMgMCA2NC0yOC43IDY0LTY0bDAtMTk3LjVjMC0xNy02LjctMzMuMy0xOC43LTQ1LjNMMzcwLjcgMTguN0MzNTguNyA2LjcgMzQyLjUgMCAzMjUuNSAwTDE5MiAwYy0zNS4zIDAtNjQgMjguNy02NCA2NGwwIDI1NmMwIDM1LjMgMjguNyA2NCA2NCA2NHpNNjQgMTI4Yy0zNS4zIDAtNjQgMjguNy02NCA2NEwwIDQ0OGMwIDM1LjMgMjguNyA2NCA2NCA2NGwxOTIgMGMzNS4zIDAgNjQtMjguNyA2NC02NGwwLTE2LTQ4IDAgMCAxNmMwIDguOC03LjIgMTYtMTYgMTZMNjQgNDY0Yy04LjggMC0xNi03LjItMTYtMTZsMC0yNTZjMC04LjggNy4yLTE2IDE2LTE2bDE2IDAgMC00OC0xNiAwelwiLz48L3N2Zz5gLFxuICAgIGV5ZTogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTc2IDUxMlwiPjwhLS0hIEZvbnQgQXdlc29tZSBGcmVlIDcuMC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI4OCA4MEMyMjIuOCA4MCAxNjkuMiAxMDkuNiAxMjguMSAxNDcuNyA4OS42IDE4My41IDYzIDIyNiA0OS40IDI1NiA2MyAyODYgODkuNiAzMjguNSAxMjguMSAzNjQuMyAxNjkuMiA0MDIuNCAyMjIuOCA0MzIgMjg4IDQzMnMxMTguOC0yOS42IDE1OS45LTY3LjdDNDg2LjQgMzI4LjUgNTEzIDI4NiA1MjYuNiAyNTYgNTEzIDIyNiA0ODYuNCAxODMuNSA0NDcuOSAxNDcuNyA0MDYuOCAxMDkuNiAzNTMuMiA4MCAyODggODB6TTk1LjQgMTEyLjZDMTQyLjUgNjguOCAyMDcuMiAzMiAyODggMzJzMTQ1LjUgMzYuOCAxOTIuNiA4MC42YzQ2LjggNDMuNSA3OC4xIDk1LjQgOTMgMTMxLjEgMy4zIDcuOSAzLjMgMTYuNyAwIDI0LjYtMTQuOSAzNS43LTQ2LjIgODcuNy05MyAxMzEuMS00Ny4xIDQzLjctMTExLjggODAuNi0xOTIuNiA4MC42UzE0Mi41IDQ0My4yIDk1LjQgMzk5LjRjLTQ2LjgtNDMuNS03OC4xLTk1LjQtOTMtMTMxLjEtMy4zLTcuOS0zLjMtMTYuNyAwLTI0LjYgMTQuOS0zNS43IDQ2LjItODcuNyA5My0xMzEuMXpNMjg4IDMzNmM0NC4yIDAgODAtMzUuOCA4MC04MCAwLTI5LjYtMTYuMS01NS41LTQwLTY5LjMtMS40IDU5LjctNDkuNiAxMDcuOS0xMDkuMyAxMDkuMyAxMy44IDIzLjkgMzkuNyA0MCA2OS4zIDQwem0tNzkuNi04OC40YzIuNSAuMyA1IC40IDcuNiAuNCAzNS4zIDAgNjQtMjguNyA2NC02NCAwLTIuNi0uMi01LjEtLjQtNy42LTM3LjQgMy45LTY3LjIgMzMuNy03MS4xIDcxLjF6bTQ1LjYtMTE1YzEwLjgtMyAyMi4yLTQuNSAzMy45LTQuNSA4LjggMCAxNy41IC45IDI1LjggMi42IC4zIC4xIC41IC4xIC44IC4yIDU3LjkgMTIuMiAxMDEuNCA2My43IDEwMS40IDEyNS4yIDAgNzAuNy01Ny4zIDEyOC0xMjggMTI4LTYxLjYgMC0xMTMtNDMuNS0xMjUuMi0xMDEuNC0xLjgtOC42LTIuOC0xNy41LTIuOC0yNi42IDAtMTEgMS40LTIxLjggNC0zMiAuMi0uNyAuMy0xLjMgLjUtMS45IDExLjktNDMuNCA0Ni4xLTc3LjYgODkuNS04OS41elwiLz48L3N2Zz5gLFxuICAgIFwiZXllLXNsYXNoXCI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDU3NiA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk00MS0yNC45Yy05LjQtOS40LTI0LjYtOS40LTMzLjkgMFMtMi4zLS4zIDcgOS4xbDUyOCA1MjhjOS40IDkuNCAyNC42IDkuNCAzMy45IDBzOS40LTI0LjYgMC0zMy45bC05Ni40LTk2LjRjMi43LTIuNCA1LjQtNC44IDgtNy4yIDQ2LjgtNDMuNSA3OC4xLTk1LjQgOTMtMTMxLjEgMy4zLTcuOSAzLjMtMTYuNyAwLTI0LjYtMTQuOS0zNS43LTQ2LjItODcuNy05My0xMzEuMS00Ny4xLTQzLjctMTExLjgtODAuNi0xOTIuNi04MC42LTU2LjggMC0xMDUuNiAxOC4yLTE0NiA0NC4yTDQxLTI0Ljl6TTE3Ni45IDExMS4xYzMyLjEtMTguOSA2OS4yLTMxLjEgMTExLjEtMzEuMSA2NS4yIDAgMTE4LjggMjkuNiAxNTkuOSA2Ny43IDM4LjUgMzUuNyA2NS4xIDc4LjMgNzguNiAxMDguMy0xMy42IDMwLTQwLjIgNzIuNS03OC42IDEwOC4zLTMuMSAyLjgtNi4yIDUuNi05LjQgOC40TDM5My44IDMyOGMxNC0yMC41IDIyLjItNDUuMyAyMi4yLTcyIDAtNzAuNy01Ny4zLTEyOC0xMjgtMTI4LTI2LjcgMC01MS41IDguMi03MiAyMi4ybC0zOS4xLTM5LjF6bTE4MiAxODJsLTEwOC0xMDhjMTEuMS01LjggMjMuNy05LjEgMzcuMS05LjEgNDQuMiAwIDgwIDM1LjggODAgODAgMCAxMy40LTMuMyAyNi05LjEgMzcuMXpNMTAzLjQgMTczLjJsLTM0LTM0Yy0zMi42IDM2LjgtNTUgNzUuOC02Ni45IDEwNC41LTMuMyA3LjktMy4zIDE2LjcgMCAyNC42IDE0LjkgMzUuNyA0Ni4yIDg3LjcgOTMgMTMxLjEgNDcuMSA0My43IDExMS44IDgwLjYgMTkyLjYgODAuNiAzNy4zIDAgNzEuMi03LjkgMTAxLjUtMjAuNkwzNTIuMiA0MjJjLTIwIDYuNC00MS40IDEwLTY0LjIgMTAtNjUuMiAwLTExOC44LTI5LjYtMTU5LjktNjcuNy0zOC41LTM1LjctNjUuMS03OC4zLTc4LjYtMTA4LjMgMTAuNC0yMy4xIDI4LjYtNTMuNiA1NC04Mi44elwiLz48L3N2Zz5gLFxuICAgIHN0YXI6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDU3NiA1MTJcIj48IS0tISBGb250IEF3ZXNvbWUgRnJlZSA3LjAuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI1IEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0yODguMS0zMmM5IDAgMTcuMyA1LjEgMjEuNCAxMy4xTDM4MyAxMjUuMyA1NDIuOSAxNTAuN2M4LjkgMS40IDE2LjMgNy43IDE5LjEgMTYuM3MuNSAxOC01LjggMjQuNEw0NDEuNyAzMDUuOSA0NjcgNDY1LjhjMS40IDguOS0yLjMgMTcuOS05LjYgMjMuMnMtMTcgNi4xLTI1IDJMMjg4LjEgNDE3LjYgMTQzLjggNDkxYy04IDQuMS0xNy43IDMuMy0yNS0ycy0xMS0xNC4yLTkuNi0yMy4yTDEzNC40IDMwNS45IDIwIDE5MS40Yy02LjQtNi40LTguNi0xNS44LTUuOC0yNC40czEwLjEtMTQuOSAxOS4xLTE2LjNsMTU5LjktMjUuNCA3My42LTE0NC4yYzQuMS04IDEyLjQtMTMuMSAyMS40LTEzLjF6bTAgNzYuOEwyMzAuMyAxNThjLTMuNSA2LjgtMTAgMTEuNi0xNy42IDEyLjhsLTEyNS41IDIwIDg5LjggODkuOWM1LjQgNS40IDcuOSAxMy4xIDYuNyAyMC43bC0xOS44IDEyNS41IDExMy4zLTU3LjZjNi44LTMuNSAxNC45LTMuNSAyMS44IDBsMTEzLjMgNTcuNi0xOS44LTEyNS41Yy0xLjItNy42IDEuMy0xNS4zIDYuNy0yMC43bDg5LjgtODkuOS0xMjUuNS0yMGMtNy42LTEuMi0xNC4xLTYtMTcuNi0xMi44TDI4OC4xIDQ0Ljh6XCIvPjwvc3ZnPmBcbiAgfVxufTtcbnZhciBzeXN0ZW1MaWJyYXJ5ID0ge1xuICBuYW1lOiBcInN5c3RlbVwiLFxuICByZXNvbHZlcjogKG5hbWUsIF9mYW1pbHkgPSBcImNsYXNzaWNcIiwgdmFyaWFudCA9IFwic29saWRcIikgPT4ge1xuICAgIGxldCBjb2xsZWN0aW9uID0gaWNvbnNbdmFyaWFudF07XG4gICAgbGV0IHN2ZyA9IGNvbGxlY3Rpb25bbmFtZV0gPz8gaWNvbnMucmVndWxhcltuYW1lXSA/PyBpY29ucy5yZWd1bGFyW1wiY2lyY2xlLXF1ZXN0aW9uXCJdO1xuICAgIGlmIChzdmcpIHtcbiAgICAgIHJldHVybiBkYXRhVXJpKHN2Zyk7XG4gICAgfVxuICAgIHJldHVybiBcIlwiO1xuICB9XG59O1xudmFyIGxpYnJhcnlfc3lzdGVtX2RlZmF1bHQgPSBzeXN0ZW1MaWJyYXJ5O1xuXG5leHBvcnQge1xuICBpY29ucyxcbiAgbGlicmFyeV9zeXN0ZW1fZGVmYXVsdFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5pbXBvcnQge1xuICBsaWJyYXJ5X2RlZmF1bHRfZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay5KVlRBR1I1Qi5qc1wiO1xuaW1wb3J0IHtcbiAgbGlicmFyeV9zeXN0ZW1fZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay5LUE4zWVo2VS5qc1wiO1xuXG4vLyBzcmMvY29tcG9uZW50cy9pY29uL2xpYnJhcnkudHNcbnZhciBkZWZhdWx0SWNvbkZhbWlseSA9IFwiY2xhc3NpY1wiO1xudmFyIHJlZ2lzdHJ5ID0gW2xpYnJhcnlfZGVmYXVsdF9kZWZhdWx0LCBsaWJyYXJ5X3N5c3RlbV9kZWZhdWx0XTtcbnZhciB3YXRjaGVkSWNvbnMgPSBbXTtcbmZ1bmN0aW9uIHdhdGNoSWNvbihpY29uKSB7XG4gIHdhdGNoZWRJY29ucy5wdXNoKGljb24pO1xufVxuZnVuY3Rpb24gdW53YXRjaEljb24oaWNvbikge1xuICB3YXRjaGVkSWNvbnMgPSB3YXRjaGVkSWNvbnMuZmlsdGVyKChlbCkgPT4gZWwgIT09IGljb24pO1xufVxuZnVuY3Rpb24gZ2V0SWNvbkxpYnJhcnkobmFtZSkge1xuICByZXR1cm4gcmVnaXN0cnkuZmluZCgobGliKSA9PiBsaWIubmFtZSA9PT0gbmFtZSk7XG59XG5mdW5jdGlvbiByZWdpc3Rlckljb25MaWJyYXJ5KG5hbWUsIG9wdGlvbnMpIHtcbiAgdW5yZWdpc3Rlckljb25MaWJyYXJ5KG5hbWUpO1xuICByZWdpc3RyeS5wdXNoKHtcbiAgICBuYW1lLFxuICAgIHJlc29sdmVyOiBvcHRpb25zLnJlc29sdmVyLFxuICAgIG11dGF0b3I6IG9wdGlvbnMubXV0YXRvcixcbiAgICBzcHJpdGVTaGVldDogb3B0aW9ucy5zcHJpdGVTaGVldFxuICB9KTtcbiAgd2F0Y2hlZEljb25zLmZvckVhY2goKGljb24pID0+IHtcbiAgICBpZiAoaWNvbi5saWJyYXJ5ID09PSBuYW1lKSB7XG4gICAgICBpY29uLnNldEljb24oKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gdW5yZWdpc3Rlckljb25MaWJyYXJ5KG5hbWUpIHtcbiAgcmVnaXN0cnkgPSByZWdpc3RyeS5maWx0ZXIoKGxpYikgPT4gbGliLm5hbWUgIT09IG5hbWUpO1xufVxuZnVuY3Rpb24gc2V0RGVmYXVsdEljb25GYW1pbHkoZmFtaWx5KSB7XG4gIGRlZmF1bHRJY29uRmFtaWx5ID0gZmFtaWx5O1xuICB3YXRjaGVkSWNvbnMuZm9yRWFjaCgoaWNvbikgPT4gaWNvbi5zZXRJY29uKCkpO1xufVxuZnVuY3Rpb24gZ2V0RGVmYXVsdEljb25GYW1pbHkoKSB7XG4gIHJldHVybiBkZWZhdWx0SWNvbkZhbWlseTtcbn1cblxuZXhwb3J0IHtcbiAgd2F0Y2hJY29uLFxuICB1bndhdGNoSWNvbixcbiAgZ2V0SWNvbkxpYnJhcnksXG4gIHJlZ2lzdGVySWNvbkxpYnJhcnksXG4gIHVucmVnaXN0ZXJJY29uTGlicmFyeSxcbiAgc2V0RGVmYXVsdEljb25GYW1pbHksXG4gIGdldERlZmF1bHRJY29uRmFtaWx5XG59O1xuIiwgIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuXG5pbXBvcnQge1xuICBfJExILFxuICBQYXJ0LFxuICBEaXJlY3RpdmVQYXJlbnQsXG4gIENvbXBpbGVkVGVtcGxhdGVSZXN1bHQsXG4gIE1heWJlQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdCxcbiAgVW5jb21waWxlZFRlbXBsYXRlUmVzdWx0LFxufSBmcm9tICcuL2xpdC1odG1sLmpzJztcbmltcG9ydCB7XG4gIERpcmVjdGl2ZVJlc3VsdCxcbiAgRGlyZWN0aXZlQ2xhc3MsXG4gIFBhcnRJbmZvLFxuICBBdHRyaWJ1dGVQYXJ0SW5mbyxcbn0gZnJvbSAnLi9kaXJlY3RpdmUuanMnO1xudHlwZSBQcmltaXRpdmUgPSBudWxsIHwgdW5kZWZpbmVkIHwgYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8IHN5bWJvbCB8IGJpZ2ludDtcblxuY29uc3Qge19DaGlsZFBhcnQ6IENoaWxkUGFydH0gPSBfJExIO1xuXG50eXBlIENoaWxkUGFydCA9IEluc3RhbmNlVHlwZTx0eXBlb2YgQ2hpbGRQYXJ0PjtcblxuY29uc3QgRU5BQkxFX1NIQURZRE9NX05PUEFUQ0ggPSB0cnVlO1xuXG5jb25zdCB3cmFwID1cbiAgRU5BQkxFX1NIQURZRE9NX05PUEFUQ0ggJiZcbiAgd2luZG93LlNoYWR5RE9NPy5pblVzZSAmJlxuICB3aW5kb3cuU2hhZHlET00/Lm5vUGF0Y2ggPT09IHRydWVcbiAgICA/IHdpbmRvdy5TaGFkeURPTSEud3JhcFxuICAgIDogKG5vZGU6IE5vZGUpID0+IG5vZGU7XG5cbi8qKlxuICogVGVzdHMgaWYgYSB2YWx1ZSBpcyBhIHByaW1pdGl2ZSB2YWx1ZS5cbiAqXG4gKiBTZWUgaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdHlwZW9mLW9wZXJhdG9yXG4gKi9cbmV4cG9ydCBjb25zdCBpc1ByaW1pdGl2ZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFByaW1pdGl2ZSA9PlxuICB2YWx1ZSA9PT0gbnVsbCB8fCAodHlwZW9mIHZhbHVlICE9ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSAhPSAnZnVuY3Rpb24nKTtcblxuZXhwb3J0IGNvbnN0IFRlbXBsYXRlUmVzdWx0VHlwZSA9IHtcbiAgSFRNTDogMSxcbiAgU1ZHOiAyLFxuICBNQVRITUw6IDMsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBUZW1wbGF0ZVJlc3VsdFR5cGUgPVxuICAodHlwZW9mIFRlbXBsYXRlUmVzdWx0VHlwZSlba2V5b2YgdHlwZW9mIFRlbXBsYXRlUmVzdWx0VHlwZV07XG5cbnR5cGUgSXNUZW1wbGF0ZVJlc3VsdCA9IHtcbiAgKHZhbDogdW5rbm93bik6IHZhbCBpcyBNYXliZUNvbXBpbGVkVGVtcGxhdGVSZXN1bHQ7XG4gIDxUIGV4dGVuZHMgVGVtcGxhdGVSZXN1bHRUeXBlPihcbiAgICB2YWw6IHVua25vd24sXG4gICAgdHlwZTogVFxuICApOiB2YWwgaXMgVW5jb21waWxlZFRlbXBsYXRlUmVzdWx0PFQ+O1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIHZhbHVlIGlzIGEgVGVtcGxhdGVSZXN1bHQgb3IgYSBDb21waWxlZFRlbXBsYXRlUmVzdWx0LlxuICovXG5leHBvcnQgY29uc3QgaXNUZW1wbGF0ZVJlc3VsdDogSXNUZW1wbGF0ZVJlc3VsdCA9IChcbiAgdmFsdWU6IHVua25vd24sXG4gIHR5cGU/OiBUZW1wbGF0ZVJlc3VsdFR5cGVcbik6IHZhbHVlIGlzIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdCA9PlxuICB0eXBlID09PSB1bmRlZmluZWRcbiAgICA/IC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gICAgICAodmFsdWUgYXMgVW5jb21waWxlZFRlbXBsYXRlUmVzdWx0KT8uWydfJGxpdFR5cGUkJ10gIT09IHVuZGVmaW5lZFxuICAgIDogKHZhbHVlIGFzIFVuY29tcGlsZWRUZW1wbGF0ZVJlc3VsdCk/LlsnXyRsaXRUeXBlJCddID09PSB0eXBlO1xuXG4vKipcbiAqIFRlc3RzIGlmIGEgdmFsdWUgaXMgYSBDb21waWxlZFRlbXBsYXRlUmVzdWx0LlxuICovXG5leHBvcnQgY29uc3QgaXNDb21waWxlZFRlbXBsYXRlUmVzdWx0ID0gKFxuICB2YWx1ZTogdW5rbm93blxuKTogdmFsdWUgaXMgQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdCA9PiB7XG4gIHJldHVybiAodmFsdWUgYXMgQ29tcGlsZWRUZW1wbGF0ZVJlc3VsdCk/LlsnXyRsaXRUeXBlJCddPy5oICE9IG51bGw7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIGEgdmFsdWUgaXMgYSBEaXJlY3RpdmVSZXN1bHQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0RpcmVjdGl2ZVJlc3VsdCA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIERpcmVjdGl2ZVJlc3VsdCA9PlxuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAodmFsdWUgYXMgRGlyZWN0aXZlUmVzdWx0KT8uWydfJGxpdERpcmVjdGl2ZSQnXSAhPT0gdW5kZWZpbmVkO1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgRGlyZWN0aXZlIGNsYXNzIGZvciBhIERpcmVjdGl2ZVJlc3VsdFxuICovXG5leHBvcnQgY29uc3QgZ2V0RGlyZWN0aXZlQ2xhc3MgPSAodmFsdWU6IHVua25vd24pOiBEaXJlY3RpdmVDbGFzcyB8IHVuZGVmaW5lZCA9PlxuICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAodmFsdWUgYXMgRGlyZWN0aXZlUmVzdWx0KT8uWydfJGxpdERpcmVjdGl2ZSQnXTtcblxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIGEgcGFydCBoYXMgb25seSBhIHNpbmdsZS1leHByZXNzaW9uIHdpdGggbm8gc3RyaW5ncyB0b1xuICogaW50ZXJwb2xhdGUgYmV0d2Vlbi5cbiAqXG4gKiBPbmx5IEF0dHJpYnV0ZVBhcnQgYW5kIFByb3BlcnR5UGFydCBjYW4gaGF2ZSBtdWx0aXBsZSBleHByZXNzaW9ucy5cbiAqIE11bHRpLWV4cHJlc3Npb24gcGFydHMgaGF2ZSBhIGBzdHJpbmdzYCBwcm9wZXJ0eSBhbmQgc2luZ2xlLWV4cHJlc3Npb25cbiAqIHBhcnRzIGRvIG5vdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2luZ2xlRXhwcmVzc2lvbiA9IChwYXJ0OiBQYXJ0SW5mbykgPT5cbiAgKHBhcnQgYXMgQXR0cmlidXRlUGFydEluZm8pLnN0cmluZ3MgPT09IHVuZGVmaW5lZDtcblxuY29uc3QgY3JlYXRlTWFya2VyID0gKCkgPT4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnJyk7XG5cbi8qKlxuICogSW5zZXJ0cyBhIENoaWxkUGFydCBpbnRvIHRoZSBnaXZlbiBjb250YWluZXIgQ2hpbGRQYXJ0J3MgRE9NLCBlaXRoZXIgYXQgdGhlXG4gKiBlbmQgb2YgdGhlIGNvbnRhaW5lciBDaGlsZFBhcnQsIG9yIGJlZm9yZSB0aGUgb3B0aW9uYWwgYHJlZlBhcnRgLlxuICpcbiAqIFRoaXMgZG9lcyBub3QgYWRkIHRoZSBwYXJ0IHRvIHRoZSBjb250YWluZXJQYXJ0J3MgY29tbWl0dGVkIHZhbHVlLiBUaGF0IG11c3RcbiAqIGJlIGRvbmUgYnkgY2FsbGVycy5cbiAqXG4gKiBAcGFyYW0gY29udGFpbmVyUGFydCBQYXJ0IHdpdGhpbiB3aGljaCB0byBhZGQgdGhlIG5ldyBDaGlsZFBhcnRcbiAqIEBwYXJhbSByZWZQYXJ0IFBhcnQgYmVmb3JlIHdoaWNoIHRvIGFkZCB0aGUgbmV3IENoaWxkUGFydDsgd2hlbiBvbWl0dGVkIHRoZVxuICogICAgIHBhcnQgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGUgYGNvbnRhaW5lclBhcnRgXG4gKiBAcGFyYW0gcGFydCBQYXJ0IHRvIGluc2VydCwgb3IgdW5kZWZpbmVkIHRvIGNyZWF0ZSBhIG5ldyBwYXJ0XG4gKi9cbmV4cG9ydCBjb25zdCBpbnNlcnRQYXJ0ID0gKFxuICBjb250YWluZXJQYXJ0OiBDaGlsZFBhcnQsXG4gIHJlZlBhcnQ/OiBDaGlsZFBhcnQsXG4gIHBhcnQ/OiBDaGlsZFBhcnRcbik6IENoaWxkUGFydCA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IHdyYXAoY29udGFpbmVyUGFydC5fJHN0YXJ0Tm9kZSkucGFyZW50Tm9kZSE7XG5cbiAgY29uc3QgcmVmTm9kZSA9XG4gICAgcmVmUGFydCA9PT0gdW5kZWZpbmVkID8gY29udGFpbmVyUGFydC5fJGVuZE5vZGUgOiByZWZQYXJ0Ll8kc3RhcnROb2RlO1xuXG4gIGlmIChwYXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBzdGFydE5vZGUgPSB3cmFwKGNvbnRhaW5lcikuaW5zZXJ0QmVmb3JlKGNyZWF0ZU1hcmtlcigpLCByZWZOb2RlKTtcbiAgICBjb25zdCBlbmROb2RlID0gd3JhcChjb250YWluZXIpLmluc2VydEJlZm9yZShjcmVhdGVNYXJrZXIoKSwgcmVmTm9kZSk7XG4gICAgcGFydCA9IG5ldyBDaGlsZFBhcnQoXG4gICAgICBzdGFydE5vZGUsXG4gICAgICBlbmROb2RlLFxuICAgICAgY29udGFpbmVyUGFydCxcbiAgICAgIGNvbnRhaW5lclBhcnQub3B0aW9uc1xuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZW5kTm9kZSA9IHdyYXAocGFydC5fJGVuZE5vZGUhKS5uZXh0U2libGluZztcbiAgICBjb25zdCBvbGRQYXJlbnQgPSBwYXJ0Ll8kcGFyZW50O1xuICAgIGNvbnN0IHBhcmVudENoYW5nZWQgPSBvbGRQYXJlbnQgIT09IGNvbnRhaW5lclBhcnQ7XG4gICAgaWYgKHBhcmVudENoYW5nZWQpIHtcbiAgICAgIHBhcnQuXyRyZXBhcmVudERpc2Nvbm5lY3RhYmxlcz8uKGNvbnRhaW5lclBhcnQpO1xuICAgICAgLy8gTm90ZSB0aGF0IGFsdGhvdWdoIGBfJHJlcGFyZW50RGlzY29ubmVjdGFibGVzYCB1cGRhdGVzIHRoZSBwYXJ0J3NcbiAgICAgIC8vIGBfJHBhcmVudGAgcmVmZXJlbmNlIGFmdGVyIHVubGlua2luZyBmcm9tIGl0cyBjdXJyZW50IHBhcmVudCwgdGhhdFxuICAgICAgLy8gbWV0aG9kIG9ubHkgZXhpc3RzIGlmIERpc2Nvbm5lY3RhYmxlcyBhcmUgcHJlc2VudCwgc28gd2UgbmVlZCB0b1xuICAgICAgLy8gdW5jb25kaXRpb25hbGx5IHNldCBpdCBoZXJlXG4gICAgICBwYXJ0Ll8kcGFyZW50ID0gY29udGFpbmVyUGFydDtcbiAgICAgIC8vIFNpbmNlIHRoZSBfJGlzQ29ubmVjdGVkIGdldHRlciBpcyBzb21ld2hhdCBjb3N0bHksIG9ubHlcbiAgICAgIC8vIHJlYWQgaXQgb25jZSB3ZSBrbm93IHRoZSBzdWJ0cmVlIGhhcyBkaXJlY3RpdmVzIHRoYXQgbmVlZFxuICAgICAgLy8gdG8gYmUgbm90aWZpZWRcbiAgICAgIGxldCBuZXdDb25uZWN0aW9uU3RhdGU7XG4gICAgICBpZiAoXG4gICAgICAgIHBhcnQuXyRub3RpZnlDb25uZWN0aW9uQ2hhbmdlZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIChuZXdDb25uZWN0aW9uU3RhdGUgPSBjb250YWluZXJQYXJ0Ll8kaXNDb25uZWN0ZWQpICE9PVxuICAgICAgICAgIG9sZFBhcmVudCEuXyRpc0Nvbm5lY3RlZFxuICAgICAgKSB7XG4gICAgICAgIHBhcnQuXyRub3RpZnlDb25uZWN0aW9uQ2hhbmdlZChuZXdDb25uZWN0aW9uU3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5kTm9kZSAhPT0gcmVmTm9kZSB8fCBwYXJlbnRDaGFuZ2VkKSB7XG4gICAgICBsZXQgc3RhcnQ6IE5vZGUgfCBudWxsID0gcGFydC5fJHN0YXJ0Tm9kZTtcbiAgICAgIHdoaWxlIChzdGFydCAhPT0gZW5kTm9kZSkge1xuICAgICAgICBjb25zdCBuOiBOb2RlIHwgbnVsbCA9IHdyYXAoc3RhcnQhKS5uZXh0U2libGluZztcbiAgICAgICAgd3JhcChjb250YWluZXIpLmluc2VydEJlZm9yZShzdGFydCEsIHJlZk5vZGUpO1xuICAgICAgICBzdGFydCA9IG47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnQ7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHZhbHVlIG9mIGEgUGFydC5cbiAqXG4gKiBOb3RlIHRoYXQgdGhpcyBzaG91bGQgb25seSBiZSB1c2VkIHRvIHNldC91cGRhdGUgdGhlIHZhbHVlIG9mIHVzZXItY3JlYXRlZFxuICogcGFydHMgKGkuZS4gdGhvc2UgY3JlYXRlZCB1c2luZyBgaW5zZXJ0UGFydGApOyBpdCBzaG91bGQgbm90IGJlIHVzZWRcbiAqIGJ5IGRpcmVjdGl2ZXMgdG8gc2V0IHRoZSB2YWx1ZSBvZiB0aGUgZGlyZWN0aXZlJ3MgY29udGFpbmVyIHBhcnQuIERpcmVjdGl2ZXNcbiAqIHNob3VsZCByZXR1cm4gYSB2YWx1ZSBmcm9tIGB1cGRhdGVgL2ByZW5kZXJgIHRvIHVwZGF0ZSB0aGVpciBwYXJ0IHN0YXRlLlxuICpcbiAqIEZvciBkaXJlY3RpdmVzIHRoYXQgcmVxdWlyZSBzZXR0aW5nIHRoZWlyIHBhcnQgdmFsdWUgYXN5bmNocm9ub3VzbHksIHRoZXlcbiAqIHNob3VsZCBleHRlbmQgYEFzeW5jRGlyZWN0aXZlYCBhbmQgY2FsbCBgdGhpcy5zZXRWYWx1ZSgpYC5cbiAqXG4gKiBAcGFyYW0gcGFydCBQYXJ0IHRvIHNldFxuICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIHNldFxuICogQHBhcmFtIGluZGV4IEZvciBgQXR0cmlidXRlUGFydGBzLCB0aGUgaW5kZXggdG8gc2V0XG4gKiBAcGFyYW0gZGlyZWN0aXZlUGFyZW50IFVzZWQgaW50ZXJuYWxseTsgc2hvdWxkIG5vdCBiZSBzZXQgYnkgdXNlclxuICovXG5leHBvcnQgY29uc3Qgc2V0Q2hpbGRQYXJ0VmFsdWUgPSA8VCBleHRlbmRzIENoaWxkUGFydD4oXG4gIHBhcnQ6IFQsXG4gIHZhbHVlOiB1bmtub3duLFxuICBkaXJlY3RpdmVQYXJlbnQ6IERpcmVjdGl2ZVBhcmVudCA9IHBhcnRcbik6IFQgPT4ge1xuICBwYXJ0Ll8kc2V0VmFsdWUodmFsdWUsIGRpcmVjdGl2ZVBhcmVudCk7XG4gIHJldHVybiBwYXJ0O1xufTtcblxuLy8gQSBzZW50aW5lbCB2YWx1ZSB0aGF0IGNhbiBuZXZlciBhcHBlYXIgYXMgYSBwYXJ0IHZhbHVlIGV4Y2VwdCB3aGVuIHNldCBieVxuLy8gbGl2ZSgpLiBVc2VkIHRvIGZvcmNlIGEgZGlydHktY2hlY2sgdG8gZmFpbCBhbmQgY2F1c2UgYSByZS1yZW5kZXIuXG5jb25zdCBSRVNFVF9WQUxVRSA9IHt9O1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbW1pdHRlZCB2YWx1ZSBvZiBhIENoaWxkUGFydCBkaXJlY3RseSB3aXRob3V0IHRyaWdnZXJpbmcgdGhlXG4gKiBjb21taXQgc3RhZ2Ugb2YgdGhlIHBhcnQuXG4gKlxuICogVGhpcyBpcyB1c2VmdWwgaW4gY2FzZXMgd2hlcmUgYSBkaXJlY3RpdmUgbmVlZHMgdG8gdXBkYXRlIHRoZSBwYXJ0IHN1Y2hcbiAqIHRoYXQgdGhlIG5leHQgdXBkYXRlIGRldGVjdHMgYSB2YWx1ZSBjaGFuZ2Ugb3Igbm90LiBXaGVuIHZhbHVlIGlzIG9taXR0ZWQsXG4gKiB0aGUgbmV4dCB1cGRhdGUgd2lsbCBiZSBndWFyYW50ZWVkIHRvIGJlIGRldGVjdGVkIGFzIGEgY2hhbmdlLlxuICpcbiAqIEBwYXJhbSBwYXJ0XG4gKiBAcGFyYW0gdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IHNldENvbW1pdHRlZFZhbHVlID0gKHBhcnQ6IFBhcnQsIHZhbHVlOiB1bmtub3duID0gUkVTRVRfVkFMVUUpID0+XG4gIChwYXJ0Ll8kY29tbWl0dGVkVmFsdWUgPSB2YWx1ZSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY29tbWl0dGVkIHZhbHVlIG9mIGEgQ2hpbGRQYXJ0LlxuICpcbiAqIFRoZSBjb21taXR0ZWQgdmFsdWUgaXMgdXNlZCBmb3IgY2hhbmdlIGRldGVjdGlvbiBhbmQgZWZmaWNpZW50IHVwZGF0ZXMgb2ZcbiAqIHRoZSBwYXJ0LiBJdCBjYW4gZGlmZmVyIGZyb20gdGhlIHZhbHVlIHNldCBieSB0aGUgdGVtcGxhdGUgb3IgZGlyZWN0aXZlIGluXG4gKiBjYXNlcyB3aGVyZSB0aGUgdGVtcGxhdGUgdmFsdWUgaXMgdHJhbnNmb3JtZWQgYmVmb3JlIGJlaW5nIGNvbW1pdHRlZC5cbiAqXG4gKiAtIGBUZW1wbGF0ZVJlc3VsdGBzIGFyZSBjb21taXR0ZWQgYXMgYSBgVGVtcGxhdGVJbnN0YW5jZWBcbiAqIC0gSXRlcmFibGVzIGFyZSBjb21taXR0ZWQgYXMgYEFycmF5PENoaWxkUGFydD5gXG4gKiAtIEFsbCBvdGhlciB0eXBlcyBhcmUgY29tbWl0dGVkIGFzIHRoZSB0ZW1wbGF0ZSB2YWx1ZSBvciB2YWx1ZSByZXR1cm5lZCBvclxuICogICBzZXQgYnkgYSBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIHBhcnRcbiAqL1xuZXhwb3J0IGNvbnN0IGdldENvbW1pdHRlZFZhbHVlID0gKHBhcnQ6IENoaWxkUGFydCkgPT4gcGFydC5fJGNvbW1pdHRlZFZhbHVlO1xuXG4vKipcbiAqIFJlbW92ZXMgYSBDaGlsZFBhcnQgZnJvbSB0aGUgRE9NLCBpbmNsdWRpbmcgYW55IG9mIGl0cyBjb250ZW50IGFuZCBtYXJrZXJzLlxuICpcbiAqIE5vdGU6IFRoZSBvbmx5IGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIGFuZCBjbGVhclBhcnQoKSBpcyB0aGF0IHRoaXMgYWxzb1xuICogcmVtb3ZlcyB0aGUgcGFydCdzIHN0YXJ0IG5vZGUuIFRoaXMgbWVhbnMgdGhhdCB0aGUgQ2hpbGRQYXJ0IG11c3Qgb3duIGl0c1xuICogc3RhcnQgbm9kZSwgaWUgaXQgbXVzdCBiZSBhIG1hcmtlciBub2RlIHNwZWNpZmljYWxseSBmb3IgdGhpcyBwYXJ0IGFuZCBub3QgYW5cbiAqIGFuY2hvciBmcm9tIHN1cnJvdW5kaW5nIGNvbnRlbnQuXG4gKlxuICogQHBhcmFtIHBhcnQgVGhlIFBhcnQgdG8gcmVtb3ZlXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVQYXJ0ID0gKHBhcnQ6IENoaWxkUGFydCkgPT4ge1xuICBwYXJ0Ll8kY2xlYXIoKTtcbiAgcGFydC5fJHN0YXJ0Tm9kZS5yZW1vdmUoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjbGVhclBhcnQgPSAocGFydDogQ2hpbGRQYXJ0KSA9PiB7XG4gIHBhcnQuXyRjbGVhcigpO1xufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5pbXBvcnQge1xuICBXYUVycm9yRXZlbnRcbn0gZnJvbSBcIi4vY2h1bmsuWURRQ1MySEsuanNcIjtcbmltcG9ydCB7XG4gIFdhTG9hZEV2ZW50XG59IGZyb20gXCIuL2NodW5rLldESUlHVU5QLmpzXCI7XG5pbXBvcnQge1xuICBpY29uX3N0eWxlc19kZWZhdWx0XG59IGZyb20gXCIuL2NodW5rLkQ1STJEV01MLmpzXCI7XG5pbXBvcnQge1xuICB3YXRjaFxufSBmcm9tIFwiLi9jaHVuay5QWkFONkZQTi5qc1wiO1xuaW1wb3J0IHtcbiAgZ2V0RGVmYXVsdEljb25GYW1pbHksXG4gIGdldEljb25MaWJyYXJ5LFxuICB1bndhdGNoSWNvbixcbiAgd2F0Y2hJY29uXG59IGZyb20gXCIuL2NodW5rLkZTUlhZR1NXLmpzXCI7XG5pbXBvcnQge1xuICBXZWJBd2Vzb21lRWxlbWVudFxufSBmcm9tIFwiLi9jaHVuay5FUEhIV1hLMi5qc1wiO1xuaW1wb3J0IHtcbiAgX19kZWNvcmF0ZUNsYXNzXG59IGZyb20gXCIuL2NodW5rLjdWR0NJSERHLmpzXCI7XG5cbi8vIHNyYy9jb21wb25lbnRzL2ljb24vaWNvbi50c1xuaW1wb3J0IHsgaHRtbCB9IGZyb20gXCJsaXRcIjtcbmltcG9ydCB7IGN1c3RvbUVsZW1lbnQsIHByb3BlcnR5LCBzdGF0ZSB9IGZyb20gXCJsaXQvZGVjb3JhdG9ycy5qc1wiO1xuaW1wb3J0IHsgaXNUZW1wbGF0ZVJlc3VsdCB9IGZyb20gXCJsaXQvZGlyZWN0aXZlLWhlbHBlcnMuanNcIjtcbnZhciBDQUNIRUFCTEVfRVJST1IgPSBTeW1ib2woKTtcbnZhciBSRVRSWUFCTEVfRVJST1IgPSBTeW1ib2woKTtcbnZhciBwYXJzZXI7XG52YXIgaWNvbkNhY2hlID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbnZhciBXYUljb24gPSBjbGFzcyBleHRlbmRzIFdlYkF3ZXNvbWVFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICB0aGlzLnN2ZyA9IG51bGw7XG4gICAgdGhpcy5hdXRvV2lkdGggPSBmYWxzZTtcbiAgICB0aGlzLnN3YXBPcGFjaXR5ID0gZmFsc2U7XG4gICAgdGhpcy5sYWJlbCA9IFwiXCI7XG4gICAgdGhpcy5saWJyYXJ5ID0gXCJkZWZhdWx0XCI7XG4gICAgdGhpcy5yb3RhdGUgPSAwO1xuICAgIC8qKiBHaXZlbiBhIFVSTCwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXN1bHRpbmcgU1ZHIGVsZW1lbnQgb3IgYW4gYXBwcm9wcmlhdGUgZXJyb3Igc3ltYm9sLiAqL1xuICAgIHRoaXMucmVzb2x2ZUljb24gPSBhc3luYyAodXJsLCBsaWJyYXJ5KSA9PiB7XG4gICAgICBsZXQgZmlsZURhdGE7XG4gICAgICBpZiAobGlicmFyeT8uc3ByaXRlU2hlZXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1VwZGF0ZWQpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUNvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ZnID0gaHRtbGA8c3ZnIHBhcnQ9XCJzdmdcIj5cbiAgICAgICAgPHVzZSBwYXJ0PVwidXNlXCIgaHJlZj1cIiR7dXJsfVwiPjwvdXNlPlxuICAgICAgPC9zdmc+YDtcbiAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVDb21wbGV0ZTtcbiAgICAgICAgY29uc3Qgc3ZnID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJbcGFydD0nc3ZnJ11cIik7XG4gICAgICAgIGlmICh0eXBlb2YgbGlicmFyeS5tdXRhdG9yID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBsaWJyYXJ5Lm11dGF0b3Ioc3ZnLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdmc7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBmaWxlRGF0YSA9IGF3YWl0IGZldGNoKHVybCwgeyBtb2RlOiBcImNvcnNcIiB9KTtcbiAgICAgICAgaWYgKCFmaWxlRGF0YS5vaykgcmV0dXJuIGZpbGVEYXRhLnN0YXR1cyA9PT0gNDEwID8gQ0FDSEVBQkxFX0VSUk9SIDogUkVUUllBQkxFX0VSUk9SO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiBSRVRSWUFCTEVfRVJST1I7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gYXdhaXQgZmlsZURhdGEudGV4dCgpO1xuICAgICAgICBjb25zdCBzdmcgPSBkaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGlmIChzdmc/LnRhZ05hbWU/LnRvTG93ZXJDYXNlKCkgIT09IFwic3ZnXCIpIHJldHVybiBDQUNIRUFCTEVfRVJST1I7XG4gICAgICAgIGlmICghcGFyc2VyKSBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoc3ZnLm91dGVySFRNTCwgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIGNvbnN0IHN2Z0VsID0gZG9jLmJvZHkucXVlcnlTZWxlY3RvcihcInN2Z1wiKTtcbiAgICAgICAgaWYgKCFzdmdFbCkgcmV0dXJuIENBQ0hFQUJMRV9FUlJPUjtcbiAgICAgICAgc3ZnRWwucGFydC5hZGQoXCJzdmdcIik7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5hZG9wdE5vZGUoc3ZnRWwpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIHJldHVybiBDQUNIRUFCTEVfRVJST1I7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHdhdGNoSWNvbih0aGlzKTtcbiAgfVxuICBmaXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICBzdXBlci5maXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZShcInJvdGF0ZVwiKSkge1xuICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcm90YXRlLWFuZ2xlXCIsIGAke3RoaXMucm90YXRlfWRlZ2ApO1xuICAgIH1cbiAgICB0aGlzLnNldEljb24oKTtcbiAgfVxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHVud2F0Y2hJY29uKHRoaXMpO1xuICB9XG4gIGdldEljb25Tb3VyY2UoKSB7XG4gICAgY29uc3QgbGlicmFyeSA9IGdldEljb25MaWJyYXJ5KHRoaXMubGlicmFyeSk7XG4gICAgY29uc3QgZmFtaWx5ID0gdGhpcy5mYW1pbHkgfHwgZ2V0RGVmYXVsdEljb25GYW1pbHkoKTtcbiAgICBpZiAodGhpcy5uYW1lICYmIGxpYnJhcnkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVybDogbGlicmFyeS5yZXNvbHZlcih0aGlzLm5hbWUsIGZhbWlseSwgdGhpcy52YXJpYW50LCB0aGlzLmF1dG9XaWR0aCksXG4gICAgICAgIGZyb21MaWJyYXJ5OiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdXJsOiB0aGlzLnNyYyxcbiAgICAgIGZyb21MaWJyYXJ5OiBmYWxzZVxuICAgIH07XG4gIH1cbiAgaGFuZGxlTGFiZWxDaGFuZ2UoKSB7XG4gICAgY29uc3QgaGFzTGFiZWwgPSB0eXBlb2YgdGhpcy5sYWJlbCA9PT0gXCJzdHJpbmdcIiAmJiB0aGlzLmxhYmVsLmxlbmd0aCA+IDA7XG4gICAgaWYgKGhhc0xhYmVsKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJpbWdcIik7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgdGhpcy5sYWJlbCk7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShcInJvbGVcIik7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIik7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgc2V0SWNvbigpIHtcbiAgICBjb25zdCB7IHVybCwgZnJvbUxpYnJhcnkgfSA9IHRoaXMuZ2V0SWNvblNvdXJjZSgpO1xuICAgIGNvbnN0IGxpYnJhcnkgPSBmcm9tTGlicmFyeSA/IGdldEljb25MaWJyYXJ5KHRoaXMubGlicmFyeSkgOiB2b2lkIDA7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHRoaXMuc3ZnID0gbnVsbDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGljb25SZXNvbHZlciA9IGljb25DYWNoZS5nZXQodXJsKTtcbiAgICBpZiAoIWljb25SZXNvbHZlcikge1xuICAgICAgaWNvblJlc29sdmVyID0gdGhpcy5yZXNvbHZlSWNvbih1cmwsIGxpYnJhcnkpO1xuICAgICAgaWNvbkNhY2hlLnNldCh1cmwsIGljb25SZXNvbHZlcik7XG4gICAgfVxuICAgIGNvbnN0IHN2ZyA9IGF3YWl0IGljb25SZXNvbHZlcjtcbiAgICBpZiAoc3ZnID09PSBSRVRSWUFCTEVfRVJST1IpIHtcbiAgICAgIGljb25DYWNoZS5kZWxldGUodXJsKTtcbiAgICB9XG4gICAgaWYgKHVybCAhPT0gdGhpcy5nZXRJY29uU291cmNlKCkudXJsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc1RlbXBsYXRlUmVzdWx0KHN2ZykpIHtcbiAgICAgIHRoaXMuc3ZnID0gc3ZnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKHN2Zykge1xuICAgICAgY2FzZSBSRVRSWUFCTEVfRVJST1I6XG4gICAgICBjYXNlIENBQ0hFQUJMRV9FUlJPUjpcbiAgICAgICAgdGhpcy5zdmcgPSBudWxsO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFdhRXJyb3JFdmVudCgpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnN2ZyA9IHN2Zy5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIGxpYnJhcnk/Lm11dGF0b3I/Lih0aGlzLnN2ZywgdGhpcyk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgV2FMb2FkRXZlbnQoKSk7XG4gICAgfVxuICB9XG4gIHVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICBzdXBlci51cGRhdGVkKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICBjb25zdCBsaWJyYXJ5ID0gZ2V0SWNvbkxpYnJhcnkodGhpcy5saWJyYXJ5KTtcbiAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoXCJyb3RhdGVcIikpIHtcbiAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkoXCItLXJvdGF0ZS1hbmdsZVwiLCBgJHt0aGlzLnJvdGF0ZX1kZWdgKTtcbiAgICB9XG4gICAgY29uc3Qgc3ZnID0gdGhpcy5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yKFwic3ZnXCIpO1xuICAgIGlmIChzdmcpIHtcbiAgICAgIGxpYnJhcnk/Lm11dGF0b3I/LihzdmcsIHRoaXMpO1xuICAgIH1cbiAgfVxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuaGFzVXBkYXRlZCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3ZnO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbGA8c3ZnIHBhcnQ9XCJzdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIj48L3N2Zz5gO1xuICB9XG59O1xuV2FJY29uLmNzcyA9IGljb25fc3R5bGVzX2RlZmF1bHQ7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBzdGF0ZSgpXG5dLCBXYUljb24ucHJvdG90eXBlLCBcInN2Z1wiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJuYW1lXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUljb24ucHJvdG90eXBlLCBcImZhbWlseVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJ2YXJpYW50XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwiYXV0by13aWR0aFwiLCB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUljb24ucHJvdG90eXBlLCBcImF1dG9XaWR0aFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgYXR0cmlidXRlOiBcInN3YXAtb3BhY2l0eVwiLCB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUljb24ucHJvdG90eXBlLCBcInN3YXBPcGFjaXR5XCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJzcmNcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYUljb24ucHJvdG90eXBlLCBcImxhYmVsXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYUljb24ucHJvdG90eXBlLCBcImxpYnJhcnlcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IE51bWJlciwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJyb3RhdGVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZywgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJmbGlwXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcsIHJlZmxlY3Q6IHRydWUgfSlcbl0sIFdhSWNvbi5wcm90b3R5cGUsIFwiYW5pbWF0aW9uXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgd2F0Y2goXCJsYWJlbFwiKVxuXSwgV2FJY29uLnByb3RvdHlwZSwgXCJoYW5kbGVMYWJlbENoYW5nZVwiLCAxKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHdhdGNoKFtcImZhbWlseVwiLCBcIm5hbWVcIiwgXCJsaWJyYXJ5XCIsIFwidmFyaWFudFwiLCBcInNyY1wiLCBcImF1dG9XaWR0aFwiLCBcInN3YXBPcGFjaXR5XCJdLCB7IHdhaXRVbnRpbEZpcnN0VXBkYXRlOiB0cnVlIH0pXG5dLCBXYUljb24ucHJvdG90eXBlLCBcInNldEljb25cIiwgMSk7XG5XYUljb24gPSBfX2RlY29yYXRlQ2xhc3MoW1xuICBjdXN0b21FbGVtZW50KFwid2EtaWNvblwiKVxuXSwgV2FJY29uKTtcblxuZXhwb3J0IHtcbiAgV2FJY29uXG59O1xuIiwgImltcG9ydCB7IExpdEVsZW1lbnQsIGh0bWwsIGNzcyB9IGZyb20gJ2xpdCc7XG5pbXBvcnQgeyBjdXN0b21FbGVtZW50LCBwcm9wZXJ0eSB9IGZyb20gJ2xpdC9kZWNvcmF0b3JzLmpzJztcblxuaW1wb3J0ICdAYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY29tcG9uZW50cy9idXR0b24vYnV0dG9uLmpzJztcbmltcG9ydCAnQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NvbXBvbmVudHMvaWNvbi9pY29uLmpzJztcblxuQGN1c3RvbUVsZW1lbnQoJ3RocmVhZHMtcG9wb3ZlcicpXG5leHBvcnQgY2xhc3MgVGhyZWFkc1BvcG92ZXIgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgc3RhdGljIG92ZXJyaWRlIHN0eWxlcyA9IGNzc2BcbiAgICA6aG9zdCB7XG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICB6LWluZGV4OiAxMDAwMTtcbiAgICB9XG4gICAgLnBvcG92ZXItY29udGVudCB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1iZywgaHNsKDAgMCUgMTAwJSkpO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyLCBoc2woMCAwJSA4OS44JSkpO1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGMtcmFkaXVzLCA2cHgpO1xuICAgICAgYm94LXNoYWRvdzogMCA0cHggNnB4IC0xcHggcmdiKDAgMCAwIC8gMC4xKSwgMCAycHggNHB4IC0ycHggcmdiKDAgMCAwIC8gMC4xKTtcbiAgICAgIHBhZGRpbmc6IDRweDtcbiAgICB9XG4gICAgd2EtYnV0dG9uOjpwYXJ0KGJhc2UpIHtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1mZywgaHNsKDAgMCUgOSUpKTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgfVxuICAgIHdhLWJ1dHRvbjo6cGFydChiYXNlKTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1hY2NlbnQsIGhzbCgwIDAlIDk2LjElKSk7XG4gICAgfVxuICBgO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4gfSkgYWN0aXZlID0gZmFsc2U7XG4gIEBwcm9wZXJ0eSh7IHR5cGU6IE51bWJlciB9KSB4ID0gMDtcbiAgQHByb3BlcnR5KHsgdHlwZTogTnVtYmVyIH0pIHkgPSAwO1xuXG4gIHByaXZhdGUgYWRkQ29tbWVudCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdhZGQtY29tbWVudCcsIHtcbiAgICAgIGJ1YmJsZXM6IHRydWUsIGNvbXBvc2VkOiB0cnVlLFxuICAgIH0pKTtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSByZXR1cm4gaHRtbGBgO1xuXG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwicG9wb3Zlci1jb250ZW50XCJcbiAgICAgICAgc3R5bGU9XCJwb3NpdGlvbjpmaXhlZDsgbGVmdDoke3RoaXMueH1weDsgdG9wOiR7dGhpcy55IC0gMTB9cHg7IHRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwgLTEwMCUpO1wiXG4gICAgICA+XG4gICAgICAgIDx3YS1idXR0b24gc2l6ZT1cInNtYWxsXCIgYXBwZWFyYW5jZT1cInBsYWluXCIgQGNsaWNrPSR7dGhpcy5hZGRDb21tZW50fT5cbiAgICAgICAgICA8d2EtaWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwiY29tbWVudFwiIHZhcmlhbnQ9XCJyZWd1bGFyXCIgbGFiZWw9XCJBZGQgY29tbWVudFwiPjwvd2EtaWNvbj5cbiAgICAgICAgICBBZGQgY29tbWVudFxuICAgICAgICA8L3dhLWJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxuICBzaG93KHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2NvbXBvbmVudHMvdGV4dGFyZWEvdGV4dGFyZWEuc3R5bGVzLnRzXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwibGl0XCI7XG52YXIgdGV4dGFyZWFfc3R5bGVzX2RlZmF1bHQgPSBjc3NgXG4gIDpob3N0IHtcbiAgICBib3JkZXItd2lkdGg6IDA7XG4gIH1cblxuICAudGV4dGFyZWEge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW46IDA7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgY3Vyc29yOiBpbmhlcml0O1xuICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2EtZm9ybS1jb250cm9sLWJhY2tncm91bmQtY29sb3IpO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1jb2xvcik7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1yYWRpdXMpO1xuICAgIGJvcmRlci1zdHlsZTogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1zdHlsZSk7XG4gICAgYm9yZGVyLXdpZHRoOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtYm9yZGVyLXdpZHRoKTtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG5cbiAgICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgICBvdXRsaW5lOiB2YXIoLS13YS1mb2N1cy1yaW5nKTtcbiAgICAgIG91dGxpbmUtb2Zmc2V0OiB2YXIoLS13YS1mb2N1cy1yaW5nLW9mZnNldCk7XG4gICAgfVxuICB9XG5cbiAgLyogQXBwZWFyYW5jZSBtb2RpZmllcnMgKi9cbiAgOmhvc3QoW2FwcGVhcmFuY2U9J291dGxpbmVkJ10pIC50ZXh0YXJlYSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2EtZm9ybS1jb250cm9sLWJhY2tncm91bmQtY29sb3IpO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0td2EtZm9ybS1jb250cm9sLWJvcmRlci1jb2xvcik7XG4gIH1cblxuICA6aG9zdChbYXBwZWFyYW5jZT0nZmlsbGVkJ10pIC50ZXh0YXJlYSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLXF1aWV0KTtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXdhLWNvbG9yLW5ldXRyYWwtZmlsbC1xdWlldCk7XG4gIH1cblxuICA6aG9zdChbYXBwZWFyYW5jZT0nZmlsbGVkLW91dGxpbmVkJ10pIC50ZXh0YXJlYSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2EtY29sb3ItbmV1dHJhbC1maWxsLXF1aWV0KTtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1ib3JkZXItY29sb3IpO1xuICB9XG5cbiAgdGV4dGFyZWEge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBmb250OiBpbmhlcml0O1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIHBhZGRpbmc6IGNhbGModmFyKC0td2EtZm9ybS1jb250cm9sLXBhZGRpbmctYmxvY2spIC0gKCgxbGggLSAxZW0pIC8gMikpIHZhcigtLXdhLWZvcm0tY29udHJvbC1wYWRkaW5nLWlubGluZSk7IC8qIGFjY291bnRzIGZvciB0aGUgbGFyZ2VyIGxpbmUgaGVpZ2h0IG9mIHRleHRhcmVhIGNvbnRlbnQgKi9cbiAgICBtaW4taGVpZ2h0OiBjYWxjKHZhcigtLXdhLWZvcm0tY29udHJvbC1oZWlnaHQpIC0gdmFyKC0tYm9yZGVyLXdpZHRoKSAqIDIpO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgbWFyZ2luOiAwO1xuXG4gICAgJjo6cGxhY2Vob2xkZXIge1xuICAgICAgY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1wbGFjZWhvbGRlci1jb2xvcik7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuXG4gICAgJjphdXRvZmlsbCB7XG4gICAgICAmLFxuICAgICAgJjpob3ZlcixcbiAgICAgICY6Zm9jdXMsXG4gICAgICAmOmFjdGl2ZSB7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgIGNhcmV0LWNvbG9yOiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtdmFsdWUtY29sb3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgICY6Zm9jdXMge1xuICAgICAgb3V0bGluZTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAvKiBTaGFyZWQgdGV4dGFyZWEgYW5kIHNpemUtYWRqdXN0ZXIgcG9zaXRpb25pbmcgKi9cbiAgLmNvbnRyb2wsXG4gIC5zaXplLWFkanVzdGVyIHtcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XG4gIH1cblxuICAuc2l6ZS1hZGp1c3RlciB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gIHRleHRhcmVhOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uLFxuICB0ZXh0YXJlYTo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbixcbiAgdGV4dGFyZWE6Oi13ZWJraXQtc2VhcmNoLXJlc3VsdHMtYnV0dG9uLFxuICB0ZXh0YXJlYTo6LXdlYmtpdC1zZWFyY2gtcmVzdWx0cy1kZWNvcmF0aW9uIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIH1cblxuICAvKlxuICAgKiBSZXNpemUgdHlwZXNcbiAgICovXG5cbiAgOmhvc3QoW3Jlc2l6ZT0nbm9uZSddKSB0ZXh0YXJlYSB7XG4gICAgcmVzaXplOiBub25lO1xuICB9XG5cbiAgdGV4dGFyZWEsXG4gIDpob3N0KFtyZXNpemU9J3ZlcnRpY2FsJ10pIHRleHRhcmVhIHtcbiAgICByZXNpemU6IHZlcnRpY2FsO1xuICB9XG5cbiAgOmhvc3QoW3Jlc2l6ZT0naG9yaXpvbnRhbCddKSB0ZXh0YXJlYSB7XG4gICAgcmVzaXplOiBob3Jpem9udGFsO1xuICB9XG5cbiAgOmhvc3QoW3Jlc2l6ZT0nYm90aCddKSB0ZXh0YXJlYSB7XG4gICAgcmVzaXplOiBib3RoO1xuICB9XG5cbiAgOmhvc3QoW3Jlc2l6ZT0nYXV0byddKSB0ZXh0YXJlYSB7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIHJlc2l6ZTogbm9uZTtcbiAgICBvdmVyZmxvdy15OiBoaWRkZW47XG4gIH1cbmA7XG5cbmV4cG9ydCB7XG4gIHRleHRhcmVhX3N0eWxlc19kZWZhdWx0XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL3N0eWxlcy9jb21wb25lbnQvZm9ybS1jb250cm9sLnN0eWxlcy50c1xuaW1wb3J0IHsgY3NzIH0gZnJvbSBcImxpdFwiO1xudmFyIGZvcm1fY29udHJvbF9zdHlsZXNfZGVmYXVsdCA9IGNzc2BcbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuXG4gIC8qIFRyZWF0IHdyYXBwZWQgbGFiZWxzLCBpbnB1dHMsIGFuZCBoaW50cyBhcyBkaXJlY3QgY2hpbGRyZW4gb2YgdGhlIGhvc3QgZWxlbWVudCAqL1xuICBbcGFydH49J2Zvcm0tY29udHJvbCddIHtcbiAgICBkaXNwbGF5OiBjb250ZW50cztcbiAgfVxuXG4gIC8qIExhYmVsICovXG4gIDppcyhbcGFydH49J2Zvcm0tY29udHJvbC1sYWJlbCddLCBbcGFydH49J2xhYmVsJ10pOmhhcygqOm5vdCg6ZW1wdHkpKSxcbiAgOmlzKFtwYXJ0fj0nZm9ybS1jb250cm9sLWxhYmVsJ10sIFtwYXJ0fj0nbGFiZWwnXSkuaGFzLWxhYmVsIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBjb2xvcjogdmFyKC0td2EtZm9ybS1jb250cm9sLWxhYmVsLWNvbG9yKTtcbiAgICBmb250LXdlaWdodDogdmFyKC0td2EtZm9ybS1jb250cm9sLWxhYmVsLWZvbnQtd2VpZ2h0KTtcbiAgICBsaW5lLWhlaWdodDogdmFyKC0td2EtZm9ybS1jb250cm9sLWxhYmVsLWxpbmUtaGVpZ2h0KTtcbiAgICBtYXJnaW4tYmxvY2stZW5kOiAwLjVlbTtcbiAgfVxuXG4gIDpob3N0KFtyZXF1aXJlZF0pIDppcyhbcGFydH49J2Zvcm0tY29udHJvbC1sYWJlbCddLCBbcGFydH49J2xhYmVsJ10pOjphZnRlciB7XG4gICAgY29udGVudDogdmFyKC0td2EtZm9ybS1jb250cm9sLXJlcXVpcmVkLWNvbnRlbnQpO1xuICAgIG1hcmdpbi1pbmxpbmUtc3RhcnQ6IHZhcigtLXdhLWZvcm0tY29udHJvbC1yZXF1aXJlZC1jb250ZW50LW9mZnNldCk7XG4gICAgY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1yZXF1aXJlZC1jb250ZW50LWNvbG9yKTtcbiAgfVxuXG4gIC8qIEhlbHAgdGV4dCAqL1xuICBbcGFydH49J2hpbnQnXSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgY29sb3I6IHZhcigtLXdhLWZvcm0tY29udHJvbC1oaW50LWNvbG9yKTtcbiAgICBmb250LXdlaWdodDogdmFyKC0td2EtZm9ybS1jb250cm9sLWhpbnQtZm9udC13ZWlnaHQpO1xuICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS13YS1mb3JtLWNvbnRyb2wtaGludC1saW5lLWhlaWdodCk7XG4gICAgbWFyZ2luLWJsb2NrLXN0YXJ0OiAwLjVlbTtcbiAgICBmb250LXNpemU6IHZhcigtLXdhLWZvbnQtc2l6ZS1zbWFsbGVyKTtcblxuICAgICY6bm90KC5oYXMtc2xvdHRlZCwgLmhhcy1oaW50KSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IHtcbiAgZm9ybV9jb250cm9sX3N0eWxlc19kZWZhdWx0XG59O1xuIiwgIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuXG5pbXBvcnQge0F0dHJpYnV0ZVBhcnQsIG5vQ2hhbmdlLCBub3RoaW5nfSBmcm9tICcuLi9saXQtaHRtbC5qcyc7XG5pbXBvcnQge1xuICBkaXJlY3RpdmUsXG4gIERpcmVjdGl2ZSxcbiAgRGlyZWN0aXZlUGFyYW1ldGVycyxcbiAgRGlyZWN0aXZlUmVzdWx0LFxuICBQYXJ0SW5mbyxcbiAgUGFydFR5cGUsXG59IGZyb20gJy4uL2RpcmVjdGl2ZS5qcyc7XG5pbXBvcnQge2lzU2luZ2xlRXhwcmVzc2lvbiwgc2V0Q29tbWl0dGVkVmFsdWV9IGZyb20gJy4uL2RpcmVjdGl2ZS1oZWxwZXJzLmpzJztcblxuY2xhc3MgTGl2ZURpcmVjdGl2ZTxUPiBleHRlbmRzIERpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHBhcnRJbmZvOiBQYXJ0SW5mbykge1xuICAgIHN1cGVyKHBhcnRJbmZvKTtcbiAgICBpZiAoXG4gICAgICAhKFxuICAgICAgICBwYXJ0SW5mby50eXBlID09PSBQYXJ0VHlwZS5QUk9QRVJUWSB8fFxuICAgICAgICBwYXJ0SW5mby50eXBlID09PSBQYXJ0VHlwZS5BVFRSSUJVVEUgfHxcbiAgICAgICAgcGFydEluZm8udHlwZSA9PT0gUGFydFR5cGUuQk9PTEVBTl9BVFRSSUJVVEVcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSBgbGl2ZWAgZGlyZWN0aXZlIGlzIG5vdCBhbGxvd2VkIG9uIGNoaWxkIG9yIGV2ZW50IGJpbmRpbmdzJ1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCFpc1NpbmdsZUV4cHJlc3Npb24ocGFydEluZm8pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BsaXZlYCBiaW5kaW5ncyBjYW4gb25seSBjb250YWluIGEgc2luZ2xlIGV4cHJlc3Npb24nKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIodmFsdWU6IFQpOiBUIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBvdmVycmlkZSB1cGRhdGUocGFydDogQXR0cmlidXRlUGFydCwgW3ZhbHVlXTogRGlyZWN0aXZlUGFyYW1ldGVyczx0aGlzPikge1xuICAgIGlmICh2YWx1ZSA9PT0gbm9DaGFuZ2UgfHwgdmFsdWUgPT09IG5vdGhpbmcpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY29uc3QgZWxlbWVudCA9IHBhcnQuZWxlbWVudDtcbiAgICBjb25zdCBuYW1lID0gcGFydC5uYW1lO1xuXG4gICAgaWYgKHBhcnQudHlwZSA9PT0gUGFydFR5cGUuUFJPUEVSVFkpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICBpZiAodmFsdWUgPT09IChlbGVtZW50IGFzIGFueSlbbmFtZV0pIHtcbiAgICAgICAgcmV0dXJuIG5vQ2hhbmdlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFydC50eXBlID09PSBQYXJ0VHlwZS5CT09MRUFOX0FUVFJJQlVURSkge1xuICAgICAgaWYgKCEhdmFsdWUgPT09IGVsZW1lbnQuaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBub0NoYW5nZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBhcnQudHlwZSA9PT0gUGFydFR5cGUuQVRUUklCVVRFKSB7XG4gICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSkgPT09IFN0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG5vQ2hhbmdlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXNldHMgdGhlIHBhcnQncyB2YWx1ZSwgY2F1c2luZyBpdHMgZGlydHktY2hlY2sgdG8gZmFpbCBzbyB0aGF0IGl0XG4gICAgLy8gYWx3YXlzIHNldHMgdGhlIHZhbHVlLlxuICAgIHNldENvbW1pdHRlZFZhbHVlKHBhcnQpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgTGl2ZSB7XG4gIDxUPih2YWx1ZTogVCk6IERpcmVjdGl2ZVJlc3VsdDx0eXBlb2YgTGl2ZURpcmVjdGl2ZTxUPj47XG59XG5cbi8qKlxuICogQ2hlY2tzIGJpbmRpbmcgdmFsdWVzIGFnYWluc3QgbGl2ZSBET00gdmFsdWVzLCBpbnN0ZWFkIG9mIHByZXZpb3VzbHkgYm91bmRcbiAqIHZhbHVlcywgd2hlbiBkZXRlcm1pbmluZyB3aGV0aGVyIHRvIHVwZGF0ZSB0aGUgdmFsdWUuXG4gKlxuICogVGhpcyBpcyB1c2VmdWwgZm9yIGNhc2VzIHdoZXJlIHRoZSBET00gdmFsdWUgbWF5IGNoYW5nZSBmcm9tIG91dHNpZGUgb2ZcbiAqIGxpdC1odG1sLCBzdWNoIGFzIHdpdGggYSBiaW5kaW5nIHRvIGFuIGA8aW5wdXQ+YCBlbGVtZW50J3MgYHZhbHVlYCBwcm9wZXJ0eSxcbiAqIGEgY29udGVudCBlZGl0YWJsZSBlbGVtZW50cyB0ZXh0LCBvciB0byBhIGN1c3RvbSBlbGVtZW50IHRoYXQgY2hhbmdlcyBpdCdzXG4gKiBvd24gcHJvcGVydGllcyBvciBhdHRyaWJ1dGVzLlxuICpcbiAqIEluIHRoZXNlIGNhc2VzIGlmIHRoZSBET00gdmFsdWUgY2hhbmdlcywgYnV0IHRoZSB2YWx1ZSBzZXQgdGhyb3VnaCBsaXQtaHRtbFxuICogYmluZGluZ3MgaGFzbid0LCBsaXQtaHRtbCB3b24ndCBrbm93IHRvIHVwZGF0ZSB0aGUgRE9NIHZhbHVlIGFuZCB3aWxsIGxlYXZlXG4gKiBpdCBhbG9uZS4gSWYgdGhpcyBpcyBub3Qgd2hhdCB5b3Ugd2FudC0taWYgeW91IHdhbnQgdG8gb3ZlcndyaXRlIHRoZSBET01cbiAqIHZhbHVlIHdpdGggdGhlIGJvdW5kIHZhbHVlIG5vIG1hdHRlciB3aGF0LS11c2UgdGhlIGBsaXZlKClgIGRpcmVjdGl2ZTpcbiAqXG4gKiBgYGBqc1xuICogaHRtbGA8aW5wdXQgLnZhbHVlPSR7bGl2ZSh4KX0+YFxuICogYGBgXG4gKlxuICogYGxpdmUoKWAgcGVyZm9ybXMgYSBzdHJpY3QgZXF1YWxpdHkgY2hlY2sgYWdhaW5zdCB0aGUgbGl2ZSBET00gdmFsdWUsIGFuZCBpZlxuICogdGhlIG5ldyB2YWx1ZSBpcyBlcXVhbCB0byB0aGUgbGl2ZSB2YWx1ZSwgZG9lcyBub3RoaW5nLiBUaGlzIG1lYW5zIHRoYXRcbiAqIGBsaXZlKClgIHNob3VsZCBub3QgYmUgdXNlZCB3aGVuIHRoZSBiaW5kaW5nIHdpbGwgY2F1c2UgYSB0eXBlIGNvbnZlcnNpb24uIElmXG4gKiB5b3UgdXNlIGBsaXZlKClgIHdpdGggYW4gYXR0cmlidXRlIGJpbmRpbmcsIG1ha2Ugc3VyZSB0aGF0IG9ubHkgc3RyaW5ncyBhcmVcbiAqIHBhc3NlZCBpbiwgb3IgdGhlIGJpbmRpbmcgd2lsbCB1cGRhdGUgZXZlcnkgcmVuZGVyLlxuICovXG5leHBvcnQgY29uc3QgbGl2ZTogTGl2ZSA9IGRpcmVjdGl2ZShMaXZlRGlyZWN0aXZlKTtcblxuLyoqXG4gKiBUaGUgdHlwZSBvZiB0aGUgY2xhc3MgdGhhdCBwb3dlcnMgdGhpcyBkaXJlY3RpdmUuIE5lY2Vzc2FyeSBmb3IgbmFtaW5nIHRoZVxuICogZGlyZWN0aXZlJ3MgcmV0dXJuIHR5cGUuXG4gKi9cbmV4cG9ydCB0eXBlIHtMaXZlRGlyZWN0aXZlfTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5pbXBvcnQge1xuICB0ZXh0YXJlYV9zdHlsZXNfZGVmYXVsdFxufSBmcm9tIFwiLi9jaHVuay5HV1dHUDdaTC5qc1wiO1xuaW1wb3J0IHtcbiAgZm9ybV9jb250cm9sX3N0eWxlc19kZWZhdWx0XG59IGZyb20gXCIuL2NodW5rLjVMWFhYRUxFLmpzXCI7XG5pbXBvcnQge1xuICBNaXJyb3JWYWxpZGF0b3Jcbn0gZnJvbSBcIi4vY2h1bmsuUjdRWDRNNlIuanNcIjtcbmltcG9ydCB7XG4gIFdlYkF3ZXNvbWVGb3JtQXNzb2NpYXRlZEVsZW1lbnRcbn0gZnJvbSBcIi4vY2h1bmsuSVBXUFJJSFouanNcIjtcbmltcG9ydCB7XG4gIEhhc1Nsb3RDb250cm9sbGVyXG59IGZyb20gXCIuL2NodW5rLktJSEIzVk1CLmpzXCI7XG5pbXBvcnQge1xuICBzaXplX3N0eWxlc19kZWZhdWx0XG59IGZyb20gXCIuL2NodW5rLjZKNlFZRkhWLmpzXCI7XG5pbXBvcnQge1xuICB3YXRjaFxufSBmcm9tIFwiLi9jaHVuay5QWkFONkZQTi5qc1wiO1xuaW1wb3J0IHtcbiAgX19kZWNvcmF0ZUNsYXNzXG59IGZyb20gXCIuL2NodW5rLjdWR0NJSERHLmpzXCI7XG5cbi8vIHNyYy9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLnRzXG5pbXBvcnQgeyBodG1sIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgcHJvcGVydHksIHF1ZXJ5LCBzdGF0ZSB9IGZyb20gXCJsaXQvZGVjb3JhdG9ycy5qc1wiO1xuaW1wb3J0IHsgY2xhc3NNYXAgfSBmcm9tIFwibGl0L2RpcmVjdGl2ZXMvY2xhc3MtbWFwLmpzXCI7XG5pbXBvcnQgeyBpZkRlZmluZWQgfSBmcm9tIFwibGl0L2RpcmVjdGl2ZXMvaWYtZGVmaW5lZC5qc1wiO1xuaW1wb3J0IHsgbGl2ZSB9IGZyb20gXCJsaXQvZGlyZWN0aXZlcy9saXZlLmpzXCI7XG52YXIgV2FUZXh0YXJlYSA9IGNsYXNzIGV4dGVuZHMgV2ViQXdlc29tZUZvcm1Bc3NvY2lhdGVkRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy5hc3N1bWVJbnRlcmFjdGlvbk9uID0gW1wiYmx1clwiLCBcImlucHV0XCJdO1xuICAgIHRoaXMuaGFzU2xvdENvbnRyb2xsZXIgPSBuZXcgSGFzU2xvdENvbnRyb2xsZXIodGhpcywgXCJoaW50XCIsIFwibGFiZWxcIik7XG4gICAgdGhpcy50aXRsZSA9IFwiXCI7XG4gICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgdGhpcy5kZWZhdWx0VmFsdWUgPSB0aGlzLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpID8/IFwiXCI7XG4gICAgdGhpcy5zaXplID0gXCJtZWRpdW1cIjtcbiAgICB0aGlzLmFwcGVhcmFuY2UgPSBcIm91dGxpbmVkXCI7XG4gICAgdGhpcy5sYWJlbCA9IFwiXCI7XG4gICAgdGhpcy5oaW50ID0gXCJcIjtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gXCJcIjtcbiAgICB0aGlzLnJvd3MgPSA0O1xuICAgIHRoaXMucmVzaXplID0gXCJ2ZXJ0aWNhbFwiO1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlYWRvbmx5ID0gZmFsc2U7XG4gICAgdGhpcy5yZXF1aXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuc3BlbGxjaGVjayA9IHRydWU7XG4gICAgdGhpcy53aXRoTGFiZWwgPSBmYWxzZTtcbiAgICB0aGlzLndpdGhIaW50ID0gZmFsc2U7XG4gIH1cbiAgc3RhdGljIGdldCB2YWxpZGF0b3JzKCkge1xuICAgIHJldHVybiBbLi4uc3VwZXIudmFsaWRhdG9ycywgTWlycm9yVmFsaWRhdG9yKCldO1xuICB9XG4gIC8qKiBUaGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgaW5wdXQsIHN1Ym1pdHRlZCBhcyBhIG5hbWUvdmFsdWUgcGFpciB3aXRoIGZvcm0gZGF0YS4gKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIGlmICh0aGlzLnZhbHVlSGFzQ2hhbmdlZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdmFsdWUgPz8gdGhpcy5kZWZhdWx0VmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbCkge1xuICAgIGlmICh0aGlzLl92YWx1ZSA9PT0gdmFsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmFsdWVIYXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbDtcbiAgfVxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5zZXRUZXh0YXJlYURpbWVuc2lvbnMoKSk7XG4gICAgdGhpcy51cGRhdGVDb21wbGV0ZS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0VGV4dGFyZWFEaW1lbnNpb25zKCk7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5pbnB1dCk7XG4gICAgICBpZiAodGhpcy5kaWRTU1IgJiYgdGhpcy5pbnB1dCAmJiB0aGlzLnZhbHVlICE9PSB0aGlzLmlucHV0LnZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5pbnB1dC52YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgaWYgKHRoaXMuaW5wdXQpIHtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXI/LnVub2JzZXJ2ZSh0aGlzLmlucHV0KTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlQmx1cigpIHtcbiAgICB0aGlzLmNoZWNrVmFsaWRpdHkoKTtcbiAgfVxuICBoYW5kbGVDaGFuZ2UoZXZlbnQpIHtcbiAgICB0aGlzLnZhbHVlSGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuaW5wdXQudmFsdWU7XG4gICAgdGhpcy5zZXRUZXh0YXJlYURpbWVuc2lvbnMoKTtcbiAgICB0aGlzLmNoZWNrVmFsaWRpdHkoKTtcbiAgICB0aGlzLnJlbGF5TmF0aXZlRXZlbnQoZXZlbnQsIHsgYnViYmxlczogdHJ1ZSwgY29tcG9zZWQ6IHRydWUgfSk7XG4gIH1cbiAgaGFuZGxlSW5wdXQoZXZlbnQpIHtcbiAgICB0aGlzLnZhbHVlSGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuaW5wdXQudmFsdWU7XG4gICAgdGhpcy5yZWxheU5hdGl2ZUV2ZW50KGV2ZW50LCB7IGJ1YmJsZXM6IHRydWUsIGNvbXBvc2VkOiB0cnVlIH0pO1xuICB9XG4gIHNldFRleHRhcmVhRGltZW5zaW9ucygpIHtcbiAgICBpZiAodGhpcy5yZXNpemUgPT09IFwibm9uZVwiKSB7XG4gICAgICB0aGlzLmJhc2Uuc3R5bGUud2lkdGggPSBgYDtcbiAgICAgIHRoaXMuYmFzZS5zdHlsZS5oZWlnaHQgPSBgYDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVzaXplID09PSBcImF1dG9cIikge1xuICAgICAgdGhpcy5zaXplQWRqdXN0ZXIuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5pbnB1dC5jbGllbnRIZWlnaHR9cHhgO1xuICAgICAgdGhpcy5pbnB1dC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgICAgIHRoaXMuaW5wdXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5pbnB1dC5zY3JvbGxIZWlnaHR9cHhgO1xuICAgICAgdGhpcy5iYXNlLnN0eWxlLndpZHRoID0gYGA7XG4gICAgICB0aGlzLmJhc2Uuc3R5bGUuaGVpZ2h0ID0gYGA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlucHV0LnN0eWxlLndpZHRoKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IE51bWJlcih0aGlzLmlucHV0LnN0eWxlLndpZHRoLnNwbGl0KC9weC8pWzBdKSArIDI7XG4gICAgICB0aGlzLmJhc2Uuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgfVxuICAgIGlmICh0aGlzLmlucHV0LnN0eWxlLmhlaWdodCkge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gTnVtYmVyKHRoaXMuaW5wdXQuc3R5bGUuaGVpZ2h0LnNwbGl0KC9weC8pWzBdKSArIDI7XG4gICAgICB0aGlzLmJhc2Uuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICB9XG4gIH1cbiAgaGFuZGxlUm93c0NoYW5nZSgpIHtcbiAgICB0aGlzLnNldFRleHRhcmVhRGltZW5zaW9ucygpO1xuICB9XG4gIGFzeW5jIGhhbmRsZVZhbHVlQ2hhbmdlKCkge1xuICAgIGF3YWl0IHRoaXMudXBkYXRlQ29tcGxldGU7XG4gICAgdGhpcy5jaGVja1ZhbGlkaXR5KCk7XG4gICAgdGhpcy5zZXRUZXh0YXJlYURpbWVuc2lvbnMoKTtcbiAgfVxuICB1cGRhdGVkKGNoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcInJlc2l6ZVwiKSkge1xuICAgICAgdGhpcy5zZXRUZXh0YXJlYURpbWVuc2lvbnMoKTtcbiAgICB9XG4gICAgc3VwZXIudXBkYXRlZChjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgaWYgKGNoYW5nZWRQcm9wZXJ0aWVzLmhhcyhcInZhbHVlXCIpKSB7XG4gICAgICB0aGlzLmN1c3RvbVN0YXRlcy5zZXQoXCJibGFua1wiLCAhdGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG4gIC8qKiBTZXRzIGZvY3VzIG9uIHRoZSB0ZXh0YXJlYS4gKi9cbiAgZm9jdXMob3B0aW9ucykge1xuICAgIHRoaXMuaW5wdXQuZm9jdXMob3B0aW9ucyk7XG4gIH1cbiAgLyoqIFJlbW92ZXMgZm9jdXMgZnJvbSB0aGUgdGV4dGFyZWEuICovXG4gIGJsdXIoKSB7XG4gICAgdGhpcy5pbnB1dC5ibHVyKCk7XG4gIH1cbiAgLyoqIFNlbGVjdHMgYWxsIHRoZSB0ZXh0IGluIHRoZSB0ZXh0YXJlYS4gKi9cbiAgc2VsZWN0KCkge1xuICAgIHRoaXMuaW5wdXQuc2VsZWN0KCk7XG4gIH1cbiAgLyoqIEdldHMgb3Igc2V0cyB0aGUgdGV4dGFyZWEncyBzY3JvbGwgcG9zaXRpb24uICovXG4gIHNjcm9sbFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICBpZiAodHlwZW9mIHBvc2l0aW9uLnRvcCA9PT0gXCJudW1iZXJcIikgdGhpcy5pbnB1dC5zY3JvbGxUb3AgPSBwb3NpdGlvbi50b3A7XG4gICAgICBpZiAodHlwZW9mIHBvc2l0aW9uLmxlZnQgPT09IFwibnVtYmVyXCIpIHRoaXMuaW5wdXQuc2Nyb2xsTGVmdCA9IHBvc2l0aW9uLmxlZnQ7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiB0aGlzLmlucHV0LnNjcm9sbFRvcCxcbiAgICAgIGxlZnQ6IHRoaXMuaW5wdXQuc2Nyb2xsVG9wXG4gICAgfTtcbiAgfVxuICAvKiogU2V0cyB0aGUgc3RhcnQgYW5kIGVuZCBwb3NpdGlvbnMgb2YgdGhlIHRleHQgc2VsZWN0aW9uICgwLWJhc2VkKS4gKi9cbiAgc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCwgc2VsZWN0aW9uRGlyZWN0aW9uID0gXCJub25lXCIpIHtcbiAgICB0aGlzLmlucHV0LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQsIHNlbGVjdGlvbkRpcmVjdGlvbik7XG4gIH1cbiAgLyoqIFJlcGxhY2VzIGEgcmFuZ2Ugb2YgdGV4dCB3aXRoIGEgbmV3IHN0cmluZy4gKi9cbiAgc2V0UmFuZ2VUZXh0KHJlcGxhY2VtZW50LCBzdGFydCwgZW5kLCBzZWxlY3RNb2RlID0gXCJwcmVzZXJ2ZVwiKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uU3RhcnQgPSBzdGFydCA/PyB0aGlzLmlucHV0LnNlbGVjdGlvblN0YXJ0O1xuICAgIGNvbnN0IHNlbGVjdGlvbkVuZCA9IGVuZCA/PyB0aGlzLmlucHV0LnNlbGVjdGlvbkVuZDtcbiAgICB0aGlzLmlucHV0LnNldFJhbmdlVGV4dChyZXBsYWNlbWVudCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCwgc2VsZWN0TW9kZSk7XG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHRoaXMuaW5wdXQudmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgICAgdGhpcy5zZXRUZXh0YXJlYURpbWVuc2lvbnMoKTtcbiAgICB9XG4gIH1cbiAgZm9ybVJlc2V0Q2FsbGJhY2soKSB7XG4gICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuICAgIGlmICh0aGlzLmlucHV0KSB7XG4gICAgICB0aGlzLmlucHV0LnZhbHVlID0gdGhpcy52YWx1ZSB8fCBcIlwiO1xuICAgIH1cbiAgICBzdXBlci5mb3JtUmVzZXRDYWxsYmFjaygpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBoYXNMYWJlbFNsb3QgPSB0aGlzLmhhc1VwZGF0ZWQgPyB0aGlzLmhhc1Nsb3RDb250cm9sbGVyLnRlc3QoXCJsYWJlbFwiKSA6IHRoaXMud2l0aExhYmVsO1xuICAgIGNvbnN0IGhhc0hpbnRTbG90ID0gdGhpcy5oYXNVcGRhdGVkID8gdGhpcy5oYXNTbG90Q29udHJvbGxlci50ZXN0KFwiaGludFwiKSA6IHRoaXMud2l0aEhpbnQ7XG4gICAgY29uc3QgaGFzTGFiZWwgPSB0aGlzLmxhYmVsID8gdHJ1ZSA6ICEhaGFzTGFiZWxTbG90O1xuICAgIGNvbnN0IGhhc0hpbnQgPSB0aGlzLmhpbnQgPyB0cnVlIDogISFoYXNIaW50U2xvdDtcbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxsYWJlbFxuICAgICAgICBwYXJ0PVwiZm9ybS1jb250cm9sLWxhYmVsIGxhYmVsXCJcbiAgICAgICAgY2xhc3M9JHtjbGFzc01hcCh7XG4gICAgICBsYWJlbDogdHJ1ZSxcbiAgICAgIFwiaGFzLWxhYmVsXCI6IGhhc0xhYmVsXG4gICAgfSl9XG4gICAgICAgIGZvcj1cImlucHV0XCJcbiAgICAgICAgYXJpYS1oaWRkZW49JHtoYXNMYWJlbCA/IFwiZmFsc2VcIiA6IFwidHJ1ZVwifVxuICAgICAgPlxuICAgICAgICA8c2xvdCBuYW1lPVwibGFiZWxcIj4ke3RoaXMubGFiZWx9PC9zbG90PlxuICAgICAgPC9sYWJlbD5cblxuICAgICAgPGRpdiBwYXJ0PVwiYmFzZVwiIGNsYXNzPVwidGV4dGFyZWFcIj5cbiAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgcGFydD1cInRleHRhcmVhXCJcbiAgICAgICAgICBpZD1cImlucHV0XCJcbiAgICAgICAgICBjbGFzcz1cImNvbnRyb2xcIlxuICAgICAgICAgIHRpdGxlPSR7dGhpcy50aXRsZX1cbiAgICAgICAgICBuYW1lPSR7aWZEZWZpbmVkKHRoaXMubmFtZSl9XG4gICAgICAgICAgLnZhbHVlPSR7bGl2ZSh0aGlzLnZhbHVlKX1cbiAgICAgICAgICA/ZGlzYWJsZWQ9JHt0aGlzLmRpc2FibGVkfVxuICAgICAgICAgID9yZWFkb25seT0ke3RoaXMucmVhZG9ubHl9XG4gICAgICAgICAgP3JlcXVpcmVkPSR7dGhpcy5yZXF1aXJlZH1cbiAgICAgICAgICBwbGFjZWhvbGRlcj0ke2lmRGVmaW5lZCh0aGlzLnBsYWNlaG9sZGVyKX1cbiAgICAgICAgICByb3dzPSR7aWZEZWZpbmVkKHRoaXMucm93cyl9XG4gICAgICAgICAgbWlubGVuZ3RoPSR7aWZEZWZpbmVkKHRoaXMubWlubGVuZ3RoKX1cbiAgICAgICAgICBtYXhsZW5ndGg9JHtpZkRlZmluZWQodGhpcy5tYXhsZW5ndGgpfVxuICAgICAgICAgIGF1dG9jYXBpdGFsaXplPSR7aWZEZWZpbmVkKHRoaXMuYXV0b2NhcGl0YWxpemUpfVxuICAgICAgICAgIGF1dG9jb3JyZWN0PSR7aWZEZWZpbmVkKHRoaXMuYXV0b2NvcnJlY3QpfVxuICAgICAgICAgID9hdXRvZm9jdXM9JHt0aGlzLmF1dG9mb2N1c31cbiAgICAgICAgICBzcGVsbGNoZWNrPSR7aWZEZWZpbmVkKHRoaXMuc3BlbGxjaGVjayl9XG4gICAgICAgICAgZW50ZXJrZXloaW50PSR7aWZEZWZpbmVkKHRoaXMuZW50ZXJrZXloaW50KX1cbiAgICAgICAgICBpbnB1dG1vZGU9JHtpZkRlZmluZWQodGhpcy5pbnB1dG1vZGUpfVxuICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJoaW50XCJcbiAgICAgICAgICBAY2hhbmdlPSR7dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgQGlucHV0PSR7dGhpcy5oYW5kbGVJbnB1dH1cbiAgICAgICAgICBAYmx1cj0ke3RoaXMuaGFuZGxlQmx1cn1cbiAgICAgICAgPjwvdGV4dGFyZWE+XG5cbiAgICAgICAgPCEtLSBUaGlzIFwiYWRqdXN0ZXJcIiBleGlzdHMgdG8gcHJldmVudCBsYXlvdXQgc2hpZnRpbmcuIGh0dHBzOi8vZ2l0aHViLmNvbS9zaG9lbGFjZS1zdHlsZS9zaG9lbGFjZS9pc3N1ZXMvMjE4MCAtLT5cbiAgICAgICAgPGRpdiBwYXJ0PVwidGV4dGFyZWEtYWRqdXN0ZXJcIiBjbGFzcz1cInNpemUtYWRqdXN0ZXJcIiA/aGlkZGVuPSR7dGhpcy5yZXNpemUgIT09IFwiYXV0b1wifT48L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8c2xvdFxuICAgICAgICBpZD1cImhpbnRcIlxuICAgICAgICBuYW1lPVwiaGludFwiXG4gICAgICAgIHBhcnQ9XCJoaW50XCJcbiAgICAgICAgYXJpYS1oaWRkZW49JHtoYXNIaW50ID8gXCJmYWxzZVwiIDogXCJ0cnVlXCJ9XG4gICAgICAgIGNsYXNzPSR7Y2xhc3NNYXAoe1xuICAgICAgXCJoYXMtc2xvdHRlZFwiOiBoYXNIaW50XG4gICAgfSl9XG4gICAgICAgID4ke3RoaXMuaGludH08L3Nsb3RcbiAgICAgID5cbiAgICBgO1xuICB9XG59O1xuV2FUZXh0YXJlYS5jc3MgPSBbdGV4dGFyZWFfc3R5bGVzX2RlZmF1bHQsIGZvcm1fY29udHJvbF9zdHlsZXNfZGVmYXVsdCwgc2l6ZV9zdHlsZXNfZGVmYXVsdF07XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBxdWVyeShcIi5jb250cm9sXCIpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJpbnB1dFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHF1ZXJ5KCdbcGFydH49XCJiYXNlXCJdJylcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImJhc2VcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBxdWVyeShcIi5zaXplLWFkanVzdGVyXCIpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJzaXplQWRqdXN0ZXJcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJ0aXRsZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwibmFtZVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHN0YXRlKClcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcInZhbHVlXCIsIDEpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwidmFsdWVcIiwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiZGVmYXVsdFZhbHVlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJzaXplXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJhcHBlYXJhbmNlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwibGFiZWxcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJoaW50XCIgfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImhpbnRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJwbGFjZWhvbGRlclwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogTnVtYmVyIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJyb3dzXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJyZXNpemVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4gfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImRpc2FibGVkXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJyZWFkb25seVwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwicmVxdWlyZWRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IE51bWJlciB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwibWlubGVuZ3RoXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBOdW1iZXIgfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcIm1heGxlbmd0aFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImF1dG9jYXBpdGFsaXplXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiYXV0b2NvcnJlY3RcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSgpXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJhdXRvY29tcGxldGVcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4gfSlcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImF1dG9mb2N1c1wiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KClcbl0sIFdhVGV4dGFyZWEucHJvdG90eXBlLCBcImVudGVya2V5aGludFwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGNvbnZlcnRlcjoge1xuICAgICAgLy8gQWxsb3cgXCJ0cnVlfGZhbHNlXCIgYXR0cmlidXRlIHZhbHVlcyBidXQga2VlcCB0aGUgcHJvcGVydHkgYm9vbGVhblxuICAgICAgZnJvbUF0dHJpYnV0ZTogKHZhbHVlKSA9PiAhdmFsdWUgfHwgdmFsdWUgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgIHRvQXR0cmlidXRlOiAodmFsdWUpID0+IHZhbHVlID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJcbiAgICB9XG4gIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJzcGVsbGNoZWNrXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoKVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiaW5wdXRtb2RlXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwid2l0aC1sYWJlbFwiLCB0eXBlOiBCb29sZWFuIH0pXG5dLCBXYVRleHRhcmVhLnByb3RvdHlwZSwgXCJ3aXRoTGFiZWxcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJ3aXRoLWhpbnRcIiwgdHlwZTogQm9vbGVhbiB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwid2l0aEhpbnRcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICB3YXRjaChcInJvd3NcIiwgeyB3YWl0VW50aWxGaXJzdFVwZGF0ZTogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiaGFuZGxlUm93c0NoYW5nZVwiLCAxKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHdhdGNoKFwidmFsdWVcIiwgeyB3YWl0VW50aWxGaXJzdFVwZGF0ZTogdHJ1ZSB9KVxuXSwgV2FUZXh0YXJlYS5wcm90b3R5cGUsIFwiaGFuZGxlVmFsdWVDaGFuZ2VcIiwgMSk7XG5XYVRleHRhcmVhID0gX19kZWNvcmF0ZUNsYXNzKFtcbiAgY3VzdG9tRWxlbWVudChcIndhLXRleHRhcmVhXCIpXG5dLCBXYVRleHRhcmVhKTtcblxuZXhwb3J0IHtcbiAgV2FUZXh0YXJlYVxufTtcbiIsICJpbXBvcnQgeyBMaXRFbGVtZW50LCBodG1sLCBjc3MgfSBmcm9tICdsaXQnO1xuaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgcHJvcGVydHksIHN0YXRlIH0gZnJvbSAnbGl0L2RlY29yYXRvcnMuanMnO1xuXG5pbXBvcnQgJ0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jb21wb25lbnRzL2J1dHRvbi9idXR0b24uanMnO1xuaW1wb3J0ICdAYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5qcyc7XG5cbkBjdXN0b21FbGVtZW50KCd0aHJlYWRzLWlubGluZS1lZGl0b3InKVxuZXhwb3J0IGNsYXNzIFRocmVhZHNJbmxpbmVFZGl0b3IgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgc3RhdGljIG92ZXJyaWRlIHN0eWxlcyA9IGNzc2BcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIG1hcmdpbjogMTZweCAwO1xuICAgIH1cbiAgICAuZWRpdG9yIHtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRjLWJvcmRlciwgaHNsKDAgMCUgODkuOCUpKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRjLXJhZGl1cywgNnB4KTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Yy1jYXJkLCBoc2woMCAwJSAxMDAlKSk7XG4gICAgICBib3gtc2hhZG93OiAwIDFweCAycHggMCByZ2IoMCAwIDAgLyAwLjA1KTtcbiAgICB9XG4gICAgLmVkaXRvci1ib2R5IHtcbiAgICAgIHBhZGRpbmc6IDEycHg7XG4gICAgfVxuICAgIC5lZGl0b3ItZm9vdGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgcGFkZGluZzogOHB4IDEycHg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGMtYm9yZGVyLCBoc2woMCAwJSA4OS44JSkpO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0td2EtY29sb3Itc3VyZmFjZS1yYWlzZWQsIGhzbCgwIDAlIDk2LjElKSk7XG4gICAgfVxuICAgIC5oaW50IHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGNvbG9yOiB2YXIoLS10Yy1tdXRlZC1mZywgaHNsKDAgMCUgNDUuMSUpKTtcbiAgICB9XG4gICAgLmFjdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogNnB4O1xuICAgIH1cbiAgYDtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSkgcXVvdGUgPSAnJztcbiAgQHN0YXRlKCkgcHJpdmF0ZSB2YWx1ZSA9ICcnO1xuICBAc3RhdGUoKSBwcml2YXRlIHN1Ym1pdHRpbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIF9pbm5lclRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX25hdGl2ZUlucHV0TGlzdGVuZXIgPSAoZTogRXZlbnQpID0+IHtcbiAgICB0aGlzLnZhbHVlID0gKGUudGFyZ2V0IGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQpLnZhbHVlO1xuICB9O1xuXG4gIHByaXZhdGUgX2F0dGFjaE5hdGl2ZUxpc3RlbmVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHdhVGV4dGFyZWEgPSB0aGlzLnNoYWRvd1Jvb3Q/LnF1ZXJ5U2VsZWN0b3IoJ3dhLXRleHRhcmVhJyk7XG4gICAgaWYgKCF3YVRleHRhcmVhKSByZXR1cm47XG4gICAgY29uc3QgaW5uZXIgPSAod2FUZXh0YXJlYSBhcyBFbGVtZW50KS5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBudWxsO1xuICAgIGlmIChpbm5lciAmJiBpbm5lciAhPT0gdGhpcy5faW5uZXJUZXh0YXJlYSkge1xuICAgICAgaWYgKHRoaXMuX2lubmVyVGV4dGFyZWEpIHtcbiAgICAgICAgdGhpcy5faW5uZXJUZXh0YXJlYS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuX25hdGl2ZUlucHV0TGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy5faW5uZXJUZXh0YXJlYSA9IGlubmVyO1xuICAgICAgaW5uZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLl9uYXRpdmVJbnB1dExpc3RlbmVyKTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgLy8gQXR0YWNoIG5hdGl2ZSBpbnB1dCBsaXN0ZW5lciBhbmQgZm9jdXMgYWZ0ZXIgd2EtdGV4dGFyZWEgdXBncmFkZXMgaXRzIGludGVybmFsIERPTS5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5fYXR0YWNoTmF0aXZlTGlzdGVuZXIoKTtcbiAgICAgIGNvbnN0IGlubmVyID0gdGhpcy5faW5uZXJUZXh0YXJlYTtcbiAgICAgIGlmIChpbm5lcikge1xuICAgICAgICBpbm5lci5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgd2FUZXh0YXJlYSA9IHRoaXMuc2hhZG93Um9vdD8ucXVlcnlTZWxlY3Rvcignd2EtdGV4dGFyZWEnKTtcbiAgICAgICAgKHdhVGV4dGFyZWEgYXMgdW5rbm93biBhcyBIVE1MRWxlbWVudCk/LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvdmVycmlkZSB1cGRhdGVkKCkge1xuICAgIHRoaXMuX2F0dGFjaE5hdGl2ZUxpc3RlbmVyKCk7XG4gIH1cblxuICBvdmVycmlkZSBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIGlmICh0aGlzLl9pbm5lclRleHRhcmVhKSB7XG4gICAgICB0aGlzLl9pbm5lclRleHRhcmVhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5fbmF0aXZlSW5wdXRMaXN0ZW5lcik7XG4gICAgICB0aGlzLl9pbm5lclRleHRhcmVhID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUlucHV0KGU6IEV2ZW50KSB7XG4gICAgdGhpcy52YWx1ZSA9IChlLnRhcmdldCBhcyBhbnkpLnZhbHVlID8/ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUZXh0YXJlYVZhbHVlKCk6IHN0cmluZyB7XG4gICAgLy8gUmVhZCBmcm9tIG5hdGl2ZSB0ZXh0YXJlYSBhcyBzb3VyY2Ugb2YgdHJ1dGggKGhhbmRsZXMgUGxheXdyaWdodCBmaWxsKCkpXG4gICAgaWYgKHRoaXMuX2lubmVyVGV4dGFyZWEpIHJldHVybiB0aGlzLl9pbm5lclRleHRhcmVhLnZhbHVlO1xuICAgIGNvbnN0IHdhVGV4dGFyZWEgPSB0aGlzLnNoYWRvd1Jvb3Q/LnF1ZXJ5U2VsZWN0b3IoJ3dhLXRleHRhcmVhJykgYXMgYW55O1xuICAgIGlmICh3YVRleHRhcmVhPy52YWx1ZSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gU3RyaW5nKHdhVGV4dGFyZWEudmFsdWUpO1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJtaXQoKSB7XG4gICAgY29uc3QgYm9keSA9IHRoaXMuZ2V0VGV4dGFyZWFWYWx1ZSgpLnRyaW0oKTtcbiAgICBpZiAoIWJvZHkgfHwgdGhpcy5zdWJtaXR0aW5nKSByZXR1cm47XG4gICAgdGhpcy52YWx1ZSA9IGJvZHk7IC8vIHN5bmMgc3RhdGVcbiAgICB0aGlzLnN1Ym1pdHRpbmcgPSB0cnVlO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2lubGluZS1zdWJtaXQnLCB7XG4gICAgICBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIGRldGFpbDogeyBib2R5IH0sXG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjYW5jZWwoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnaW5saW5lLWNhbmNlbCcsIHtcbiAgICAgIGJ1YmJsZXM6IHRydWUsIGNvbXBvc2VkOiB0cnVlLFxuICAgIH0pKTtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlbmRlcigpIHtcbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3JcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci1ib2R5XCI+XG4gICAgICAgICAgPHdhLXRleHRhcmVhXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIldyaXRlIHlvdXIgY29tbWVudC4uLlwiXG4gICAgICAgICAgICAudmFsdWU9JHt0aGlzLnZhbHVlfVxuICAgICAgICAgICAgcm93cz1cIjNcIlxuICAgICAgICAgICAgcmVzaXplPVwidmVydGljYWxcIlxuICAgICAgICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgICAgIEB3YS1pbnB1dD0ke3RoaXMuaGFuZGxlSW5wdXR9XG4gICAgICAgICAgICBAaW5wdXQ9JHt0aGlzLmhhbmRsZUlucHV0fVxuICAgICAgICAgICAgQGtleWRvd249JHsoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicgJiYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkpKSB0aGlzLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB0aGlzLmNhbmNlbCgpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+PC93YS10ZXh0YXJlYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItZm9vdGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJoaW50XCI+Q21kK0VudGVyIHRvIHN1Ym1pdDwvc3Bhbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPlxuICAgICAgICAgICAgPHdhLWJ1dHRvbiBzaXplPVwic21hbGxcIiBhcHBlYXJhbmNlPVwib3V0bGluZWRcIiBAY2xpY2s9JHt0aGlzLmNhbmNlbH0+Q2FuY2VsPC93YS1idXR0b24+XG4gICAgICAgICAgICA8d2EtYnV0dG9uXG4gICAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJicmFuZFwiXG4gICAgICAgICAgICAgID9kaXNhYmxlZD0keyF0aGlzLnZhbHVlLnRyaW0oKSB8fCB0aGlzLnN1Ym1pdHRpbmd9XG4gICAgICAgICAgICAgIEBjbGljaz0ke3RoaXMuc3VibWl0fVxuICAgICAgICAgICAgPiR7dGhpcy5zdWJtaXR0aW5nID8gJ1NhdmluZy4uLicgOiAnU3VibWl0J308L3dhLWJ1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgTGl0RWxlbWVudCwgaHRtbCB9IGZyb20gJ2xpdCc7XG5pbXBvcnQgeyBjdXN0b21FbGVtZW50LCBzdGF0ZSB9IGZyb20gJ2xpdC9kZWNvcmF0b3JzLmpzJztcbmltcG9ydCB7XG4gIGdldEF1dGhvciwgc2V0QXV0aG9yLFxuICBnZXRFbWFpbCwgc2V0RW1haWwsXG4gIGdldEdpdGh1Yiwgc2V0R2l0aHViLFxuICBnZXRBdmF0YXJVcmwsIHNldEF2YXRhclVybCxcbiAgY29tcHV0ZUF2YXRhclVybCxcbiAgY29tcHV0ZUF1dGhvcktleSwgc2V0QXV0aG9yS2V5LFxufSBmcm9tICcuLi9saWIvaWRlbnRpdHkudHMnO1xuaW1wb3J0IHsgdXBzZXJ0QXV0aG9yIH0gZnJvbSAnLi4vbGliL2FwaS50cyc7XG5cbkBjdXN0b21FbGVtZW50KCd0aHJlYWRzLWlkZW50aXR5JylcbmV4cG9ydCBjbGFzcyBUaHJlYWRzSWRlbnRpdHkgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgb3ZlcnJpZGUgY3JlYXRlUmVuZGVyUm9vdCgpIHsgcmV0dXJuIHRoaXM7IH1cblxuICBAc3RhdGUoKSBwcml2YXRlIG5hbWUgPSAnJztcbiAgQHN0YXRlKCkgcHJpdmF0ZSBlbWFpbCA9ICcnO1xuICBAc3RhdGUoKSBwcml2YXRlIGdpdGh1YiA9ICcnO1xuICBAc3RhdGUoKSBwcml2YXRlIGF2YXRhclVybCA9ICcnO1xuICBAc3RhdGUoKSBwcml2YXRlIHBhbmVsT3BlbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgb3V0c2lkZUNsaWNrSGFuZGxlciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5zKGUudGFyZ2V0IGFzIE5vZGUpKSB7XG4gICAgICB0aGlzLnBhbmVsT3BlbiA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBvdmVycmlkZSBjb25uZWN0ZWRDYWxsYmFjaygpOiB2b2lkIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHRoaXMubmFtZSA9IGdldEF1dGhvcigpIHx8ICcnO1xuICAgIHRoaXMuZW1haWwgPSBnZXRFbWFpbCgpIHx8ICcnO1xuICAgIHRoaXMuZ2l0aHViID0gZ2V0R2l0aHViKCkgfHwgJyc7XG4gICAgdGhpcy5hdmF0YXJVcmwgPSBnZXRBdmF0YXJVcmwoKSB8fCAnJztcblxuICAgIC8vIElmIHdlIGhhdmUgaWRlbnRpdHkgaW5mbyBidXQgbm8gYXZhdGFyIHlldCwgY29tcHV0ZSBvbmVcbiAgICBpZiAoIXRoaXMuYXZhdGFyVXJsICYmICh0aGlzLmVtYWlsIHx8IHRoaXMuZ2l0aHViKSkge1xuICAgICAgdGhpcy5yZWZyZXNoQXZhdGFyKCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vdXRzaWRlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCk6IHZvaWQge1xuICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vdXRzaWRlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlUGFuZWwoKTogdm9pZCB7XG4gICAgdGhpcy5wYW5lbE9wZW4gPSAhdGhpcy5wYW5lbE9wZW47XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbmFtZUlucHV0ID0gdGhpcy5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KCcjaWRlbnRpdHktbmFtZScpO1xuICAgIGNvbnN0IGVtYWlsSW5wdXQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oJyNpZGVudGl0eS1lbWFpbCcpO1xuICAgIGNvbnN0IGdpdGh1YklucHV0ID0gdGhpcy5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KCcjaWRlbnRpdHktZ2l0aHViJyk7XG5cbiAgICBpZiAobmFtZUlucHV0KSB7XG4gICAgICBjb25zdCB2YWwgPSBuYW1lSW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgdGhpcy5uYW1lID0gdmFsO1xuICAgICAgaWYgKHZhbCkgc2V0QXV0aG9yKHZhbCk7XG4gICAgfVxuXG4gICAgaWYgKGVtYWlsSW5wdXQpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGVtYWlsSW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgdGhpcy5lbWFpbCA9IHZhbDtcbiAgICAgIHNldEVtYWlsKHZhbCk7XG4gICAgfVxuXG4gICAgaWYgKGdpdGh1YklucHV0KSB7XG4gICAgICBjb25zdCB2YWwgPSBnaXRodWJJbnB1dC52YWx1ZS50cmltKCkucmVwbGFjZSgvXkAvLCAnJyk7XG4gICAgICB0aGlzLmdpdGh1YiA9IHZhbDtcbiAgICAgIHNldEdpdGh1Yih2YWwpO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMucmVmcmVzaEF2YXRhcigpO1xuXG4gICAgLy8gQ29tcHV0ZSBhbmQgc2F2ZSBhdXRob3Iga2V5XG4gICAgY29uc3QgYXV0aG9yS2V5ID0gY29tcHV0ZUF1dGhvcktleSh0aGlzLm5hbWUsIHRoaXMuZ2l0aHViKTtcbiAgICBzZXRBdXRob3JLZXkoYXV0aG9yS2V5KTtcblxuICAgIC8vIFN5bmMgdG8gc2VydmVyIGF1dGhvcnMuanNvblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB1cHNlcnRBdXRob3IoYXV0aG9yS2V5LCB0aGlzLm5hbWUsIHRoaXMuYXZhdGFyVXJsKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFNlcnZlciBtYXkgbm90IGJlIGF2YWlsYWJsZSAoZS5nLiBzdGF0aWMgc2l0ZSk7IGlnbm9yZVxuICAgIH1cblxuICAgIHRoaXMucGFuZWxPcGVuID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlZnJlc2hBdmF0YXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdXJsID0gYXdhaXQgY29tcHV0ZUF2YXRhclVybCh0aGlzLmVtYWlsLCB0aGlzLmdpdGh1Yik7XG4gICAgdGhpcy5hdmF0YXJVcmwgPSB1cmw7XG4gICAgc2V0QXZhdGFyVXJsKHVybCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLnBhbmVsT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgb3ZlcnJpZGUgcmVuZGVyKCkge1xuICAgIGNvbnN0IGluaXRpYWwgPSB0aGlzLm5hbWUgPyB0aGlzLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgOiAnPyc7XG5cbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3M9XCJ0aHJlYWRzLWlkZW50aXR5LWJ0blwiXG4gICAgICAgIHRpdGxlPVwiRGlzY3Vzc2lvbiBpZGVudGl0eVwiXG4gICAgICAgIEBjbGljaz0ke3RoaXMudG9nZ2xlUGFuZWx9XG4gICAgICA+XG4gICAgICAgICR7dGhpcy5hdmF0YXJVcmxcbiAgICAgICAgICA/IGh0bWxgPGltZyBjbGFzcz1cInRocmVhZHMtaWRlbnRpdHktYXZhdGFyXCIgc3JjPSR7dGhpcy5hdmF0YXJVcmx9IGFsdD0ke3RoaXMubmFtZX0gLz5gXG4gICAgICAgICAgOiBodG1sYDxzcGFuIGNsYXNzPVwidGhyZWFkcy1pZGVudGl0eS1pbml0aWFsXCI+JHtpbml0aWFsfTwvc3Bhbj5gXG4gICAgICAgIH1cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAke3RoaXMucGFuZWxPcGVuID8gaHRtbGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRocmVhZHMtaWRlbnRpdHktcGFuZWxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGhyZWFkcy1pZGVudGl0eS1wcmV2aWV3XCI+XG4gICAgICAgICAgICAke3RoaXMuYXZhdGFyVXJsXG4gICAgICAgICAgICAgID8gaHRtbGA8aW1nIGNsYXNzPVwidGhyZWFkcy1pZGVudGl0eS1wcmV2aWV3LWltZ1wiIHNyYz0ke3RoaXMuYXZhdGFyVXJsfSBhbHQ9JHt0aGlzLm5hbWV9IC8+YFxuICAgICAgICAgICAgICA6IGh0bWxgPGRpdiBjbGFzcz1cInRocmVhZHMtaWRlbnRpdHktcHJldmlldy1wbGFjZWhvbGRlclwiPiR7aW5pdGlhbH08L2Rpdj5gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwidGhyZWFkcy1pZGVudGl0eS1sYWJlbFwiPlxuICAgICAgICAgICAgRGlzcGxheSBOYW1lXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgaWQ9XCJpZGVudGl0eS1uYW1lXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0aHJlYWRzLWlkZW50aXR5LWlucHV0XCJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAudmFsdWU9JHt0aGlzLm5hbWV9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiWW91ciBuYW1lXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ0aHJlYWRzLWlkZW50aXR5LWxhYmVsXCI+XG4gICAgICAgICAgICBHaXRIdWIgVXNlcm5hbWVcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBpZD1cImlkZW50aXR5LWdpdGh1YlwiXG4gICAgICAgICAgICAgIGNsYXNzPVwidGhyZWFkcy1pZGVudGl0eS1pbnB1dFwiXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgLnZhbHVlPSR7dGhpcy5naXRodWJ9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwib2N0b2NhdFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwidGhyZWFkcy1pZGVudGl0eS1sYWJlbFwiPlxuICAgICAgICAgICAgR3JhdmF0YXIgRW1haWxcbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBpZD1cImlkZW50aXR5LWVtYWlsXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0aHJlYWRzLWlkZW50aXR5LWlucHV0XCJcbiAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgLnZhbHVlPSR7dGhpcy5lbWFpbH1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ5b3VAZXhhbXBsZS5jb21cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDxwIGNsYXNzPVwidGhyZWFkcy1pZGVudGl0eS1oaW50XCI+XG4gICAgICAgICAgICBBdmF0YXI6IDxhIGhyZWY9XCJodHRwczovL2dyYXZhdGFyLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCI+R3JhdmF0YXI8L2E+ICZndDsgR2l0SHViICZndDsgcmFuZG9tLlxuICAgICAgICAgICAgU3RvcmVkIGluIHlvdXIgYnJvd3NlciBvbmx5LlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGhyZWFkcy1pZGVudGl0eS1hY3Rpb25zXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidGhyZWFkcy1pZGVudGl0eS1jYW5jZWxcIiBAY2xpY2s9JHt0aGlzLmhhbmRsZUNhbmNlbH0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidGhyZWFkcy1pZGVudGl0eS1zYXZlXCIgQGNsaWNrPSR7dGhpcy5oYW5kbGVTYXZlfT5TYXZlPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYCA6ICcnfVxuICAgIGA7XG4gIH1cbn1cbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9pbnRlcm5hbC9vZmZzZXQudHNcbmZ1bmN0aW9uIGdldE9mZnNldChlbGVtZW50LCBwYXJlbnQpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IE1hdGgucm91bmQoZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSxcbiAgICBsZWZ0OiBNYXRoLnJvdW5kKGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KVxuICB9O1xufVxuXG4vLyBzcmMvaW50ZXJuYWwvc2Nyb2xsLnRzXG52YXIgbG9ja3MgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xuZnVuY3Rpb24gZ2V0U2Nyb2xsYmFyV2lkdGgoKSB7XG4gIGNvbnN0IGRvY3VtZW50V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIHJldHVybiBNYXRoLmFicyh3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50V2lkdGgpO1xufVxuZnVuY3Rpb24gZ2V0RXhpc3RpbmdCb2R5UGFkZGluZygpIHtcbiAgY29uc3QgcGFkZGluZyA9IE51bWJlcihnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLnBhZGRpbmdSaWdodC5yZXBsYWNlKC9weC8sIFwiXCIpKTtcbiAgaWYgKGlzTmFOKHBhZGRpbmcpIHx8ICFwYWRkaW5nKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcmV0dXJuIHBhZGRpbmc7XG59XG5mdW5jdGlvbiBsb2NrQm9keVNjcm9sbGluZyhsb2NraW5nRWwpIHtcbiAgbG9ja3MuYWRkKGxvY2tpbmdFbCk7XG4gIGlmICghZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIndhLXNjcm9sbC1sb2NrXCIpKSB7XG4gICAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSBnZXRTY3JvbGxiYXJXaWR0aCgpICsgZ2V0RXhpc3RpbmdCb2R5UGFkZGluZygpO1xuICAgIGxldCBzY3JvbGxiYXJHdXR0ZXJQcm9wZXJ0eSA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5zY3JvbGxiYXJHdXR0ZXI7XG4gICAgaWYgKCFzY3JvbGxiYXJHdXR0ZXJQcm9wZXJ0eSB8fCBzY3JvbGxiYXJHdXR0ZXJQcm9wZXJ0eSA9PT0gXCJhdXRvXCIpIHtcbiAgICAgIHNjcm9sbGJhckd1dHRlclByb3BlcnR5ID0gXCJzdGFibGVcIjtcbiAgICB9XG4gICAgaWYgKHNjcm9sbGJhcldpZHRoIDwgMikge1xuICAgICAgc2Nyb2xsYmFyR3V0dGVyUHJvcGVydHkgPSBcIlwiO1xuICAgIH1cbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCItLXdhLXNjcm9sbC1sb2NrLWd1dHRlclwiLCBzY3JvbGxiYXJHdXR0ZXJQcm9wZXJ0eSk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ3YS1zY3JvbGwtbG9ja1wiKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCItLXdhLXNjcm9sbC1sb2NrLXNpemVcIiwgYCR7c2Nyb2xsYmFyV2lkdGh9cHhgKTtcbiAgfVxufVxuZnVuY3Rpb24gdW5sb2NrQm9keVNjcm9sbGluZyhsb2NraW5nRWwpIHtcbiAgbG9ja3MuZGVsZXRlKGxvY2tpbmdFbCk7XG4gIGlmIChsb2Nrcy5zaXplID09PSAwKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ3YS1zY3JvbGwtbG9ja1wiKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCItLXdhLXNjcm9sbC1sb2NrLXNpemVcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIHNjcm9sbEludG9WaWV3KGVsZW1lbnQsIGNvbnRhaW5lciwgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiLCBiZWhhdmlvciA9IFwic21vb3RoXCIpIHtcbiAgY29uc3Qgb2Zmc2V0ID0gZ2V0T2Zmc2V0KGVsZW1lbnQsIGNvbnRhaW5lcik7XG4gIGNvbnN0IG9mZnNldFRvcCA9IG9mZnNldC50b3AgKyBjb250YWluZXIuc2Nyb2xsVG9wO1xuICBjb25zdCBvZmZzZXRMZWZ0ID0gb2Zmc2V0LmxlZnQgKyBjb250YWluZXIuc2Nyb2xsTGVmdDtcbiAgY29uc3QgbWluWCA9IGNvbnRhaW5lci5zY3JvbGxMZWZ0O1xuICBjb25zdCBtYXhYID0gY29udGFpbmVyLnNjcm9sbExlZnQgKyBjb250YWluZXIub2Zmc2V0V2lkdGg7XG4gIGNvbnN0IG1pblkgPSBjb250YWluZXIuc2Nyb2xsVG9wO1xuICBjb25zdCBtYXhZID0gY29udGFpbmVyLnNjcm9sbFRvcCArIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiIHx8IGRpcmVjdGlvbiA9PT0gXCJib3RoXCIpIHtcbiAgICBpZiAob2Zmc2V0TGVmdCA8IG1pblgpIHtcbiAgICAgIGNvbnRhaW5lci5zY3JvbGxUbyh7IGxlZnQ6IG9mZnNldExlZnQsIGJlaGF2aW9yIH0pO1xuICAgIH0gZWxzZSBpZiAob2Zmc2V0TGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGggPiBtYXhYKSB7XG4gICAgICBjb250YWluZXIuc2Nyb2xsVG8oeyBsZWZ0OiBvZmZzZXRMZWZ0IC0gY29udGFpbmVyLm9mZnNldFdpZHRoICsgZWxlbWVudC5jbGllbnRXaWR0aCwgYmVoYXZpb3IgfSk7XG4gICAgfVxuICB9XG4gIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIiB8fCBkaXJlY3Rpb24gPT09IFwiYm90aFwiKSB7XG4gICAgaWYgKG9mZnNldFRvcCA8IG1pblkpIHtcbiAgICAgIGNvbnRhaW5lci5zY3JvbGxUbyh7IHRvcDogb2Zmc2V0VG9wLCBiZWhhdmlvciB9KTtcbiAgICB9IGVsc2UgaWYgKG9mZnNldFRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0ID4gbWF4WSkge1xuICAgICAgY29udGFpbmVyLnNjcm9sbFRvKHsgdG9wOiBvZmZzZXRUb3AgLSBjb250YWluZXIub2Zmc2V0SGVpZ2h0ICsgZWxlbWVudC5jbGllbnRIZWlnaHQsIGJlaGF2aW9yIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge1xuICBsb2NrQm9keVNjcm9sbGluZyxcbiAgdW5sb2NrQm9keVNjcm9sbGluZyxcbiAgc2Nyb2xsSW50b1ZpZXdcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvaW50ZXJuYWwvcGFyc2UudHNcbmZ1bmN0aW9uIHBhcnNlU3BhY2VEZWxpbWl0ZWRUb2tlbnMoaW5wdXQpIHtcbiAgcmV0dXJuIGlucHV0LnNwbGl0KFwiIFwiKS5tYXAoKHRva2VuKSA9PiB0b2tlbi50cmltKCkpLmZpbHRlcigodG9rZW4pID0+IHRva2VuICE9PSBcIlwiKTtcbn1cblxuZXhwb3J0IHtcbiAgcGFyc2VTcGFjZURlbGltaXRlZFRva2Vuc1xufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cuc3R5bGVzLnRzXG5pbXBvcnQgeyBjc3MgfSBmcm9tIFwibGl0XCI7XG52YXIgZGlhbG9nX3N0eWxlc19kZWZhdWx0ID0gY3NzYFxuICA6aG9zdCB7XG4gICAgLS13aWR0aDogMzFyZW07XG4gICAgLS1zcGFjaW5nOiB2YXIoLS13YS1zcGFjZS1sKTtcbiAgICAtLXNob3ctZHVyYXRpb246IDIwMG1zO1xuICAgIC0taGlkZS1kdXJhdGlvbjogMjAwbXM7XG5cbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgOmhvc3QoW29wZW5dKSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cblxuICAuZGlhbG9nIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiB2YXIoLS13aWR0aCk7XG4gICAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSB2YXIoLS13YS1zcGFjZS0yeGwpKTtcbiAgICBtYXgtaGVpZ2h0OiBjYWxjKDEwMCUgLSB2YXIoLS13YS1zcGFjZS0yeGwpKTtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13YS1jb2xvci1zdXJmYWNlLXJhaXNlZCk7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0td2EtcGFuZWwtYm9yZGVyLXJhZGl1cyk7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJveC1zaGFkb3c6IHZhcigtLXdhLXNoYWRvdy1sKTtcbiAgICBwYWRkaW5nOiAwO1xuICAgIG1hcmdpbjogYXV0bztcblxuICAgICYuc2hvdyB7XG4gICAgICBhbmltYXRpb246IHNob3ctZGlhbG9nIHZhcigtLXNob3ctZHVyYXRpb24pIGVhc2U7XG5cbiAgICAgICY6OmJhY2tkcm9wIHtcbiAgICAgICAgYW5pbWF0aW9uOiBzaG93LWJhY2tkcm9wIHZhcigtLXNob3ctZHVyYXRpb24sIDIwMG1zKSBlYXNlO1xuICAgICAgfVxuICAgIH1cblxuICAgICYuaGlkZSB7XG4gICAgICBhbmltYXRpb246IHNob3ctZGlhbG9nIHZhcigtLWhpZGUtZHVyYXRpb24pIGVhc2UgcmV2ZXJzZTtcblxuICAgICAgJjo6YmFja2Ryb3Age1xuICAgICAgICBhbmltYXRpb246IHNob3ctYmFja2Ryb3AgdmFyKC0taGlkZS1kdXJhdGlvbiwgMjAwbXMpIGVhc2UgcmV2ZXJzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLnB1bHNlIHtcbiAgICAgIGFuaW1hdGlvbjogcHVsc2UgMjUwbXMgZWFzZTtcbiAgICB9XG4gIH1cblxuICAuZGlhbG9nOmZvY3VzIHtcbiAgICBvdXRsaW5lOiBub25lO1xuICB9XG5cbiAgLyogRW5zdXJlIHRoZXJlJ3MgZW5vdWdoIHZlcnRpY2FsIHBhZGRpbmcgZm9yIHBob25lcyB0aGF0IGRvbid0IHVwZGF0ZSB2aCB3aGVuIGNocm9tZSBhcHBlYXJzIChlLmcuIGlQaG9uZSkgKi9cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDIwcHgpIHtcbiAgICAuZGlhbG9nIHtcbiAgICAgIG1heC1oZWlnaHQ6IDgwdmg7XG4gICAgfVxuICB9XG5cbiAgLm9wZW4ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuXG4gIC5oZWFkZXIge1xuICAgIGZsZXg6IDAgMCBhdXRvO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiBub3dyYXA7XG5cbiAgICBwYWRkaW5nLWlubGluZS1zdGFydDogdmFyKC0tc3BhY2luZyk7XG4gICAgcGFkZGluZy1ibG9jay1lbmQ6IDA7XG5cbiAgICAvKiBTdWJ0cmFjdCB0aGUgY2xvc2UgYnV0dG9uJ3MgcGFkZGluZyBzbyB0aGF0IHRoZSBYIGlzIHZpc3VhbGx5IGFsaWduZWQgd2l0aCB0aGUgZWRnZXMgb2YgdGhlIGRpYWxvZyBjb250ZW50ICovXG4gICAgcGFkZGluZy1pbmxpbmUtZW5kOiBjYWxjKHZhcigtLXNwYWNpbmcpIC0gdmFyKC0td2EtZm9ybS1jb250cm9sLXBhZGRpbmctYmxvY2spKTtcbiAgICBwYWRkaW5nLWJsb2NrLXN0YXJ0OiBjYWxjKHZhcigtLXNwYWNpbmcpIC0gdmFyKC0td2EtZm9ybS1jb250cm9sLXBhZGRpbmctYmxvY2spKTtcbiAgfVxuXG4gIC50aXRsZSB7XG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgIGZsZXg6IDEgMSBhdXRvO1xuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICAgIGZvbnQtc2l6ZTogdmFyKC0td2EtZm9udC1zaXplLWwpO1xuICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS13YS1mb250LXdlaWdodC1oZWFkaW5nKTtcbiAgICBsaW5lLWhlaWdodDogdmFyKC0td2EtbGluZS1oZWlnaHQtY29uZGVuc2VkKTtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICAuaGVhZGVyLWFjdGlvbnMge1xuICAgIGFsaWduLXNlbGY6IHN0YXJ0O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGp1c3RpZnktY29udGVudDogZW5kO1xuICAgIGdhcDogdmFyKC0td2Etc3BhY2UtMnhzKTtcbiAgICBwYWRkaW5nLWlubGluZS1zdGFydDogdmFyKC0tc3BhY2luZyk7XG4gIH1cblxuICAuaGVhZGVyLWFjdGlvbnMgd2EtYnV0dG9uLFxuICAuaGVhZGVyLWFjdGlvbnMgOjpzbG90dGVkKHdhLWJ1dHRvbikge1xuICAgIGZsZXg6IDAgMCBhdXRvO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuXG4gIC5ib2R5IHtcbiAgICBmbGV4OiAxIDEgYXV0bztcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwYWRkaW5nOiB2YXIoLS1zcGFjaW5nKTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG5cbiAgICAmOmZvY3VzIHtcbiAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgfVxuXG4gICAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICAgIG91dGxpbmU6IHZhcigtLXdhLWZvY3VzLXJpbmcpO1xuICAgICAgb3V0bGluZS1vZmZzZXQ6IHZhcigtLXdhLWZvY3VzLXJpbmctb2Zmc2V0KTtcbiAgICB9XG4gIH1cblxuICAuZm9vdGVyIHtcbiAgICBmbGV4OiAwIDAgYXV0bztcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBnYXA6IHZhcigtLXdhLXNwYWNlLXhzKTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcbiAgICBwYWRkaW5nOiB2YXIoLS1zcGFjaW5nKTtcbiAgICBwYWRkaW5nLWJsb2NrLXN0YXJ0OiAwO1xuICB9XG5cbiAgLmZvb3RlciA6OnNsb3R0ZWQod2EtYnV0dG9uOm5vdCg6Zmlyc3Qtb2YtdHlwZSkpIHtcbiAgICBtYXJnaW4taW5saW5lLXN0YXJ0OiB2YXIoLS13YS1zcGFjaW5nLXhzKTtcbiAgfVxuXG4gIC5kaWFsb2c6OmJhY2tkcm9wIHtcbiAgICAvKlxuICAgICAgTk9URTogdGhlIDo6YmFja2Ryb3AgZWxlbWVudCBkb2Vzbid0IGluaGVyaXQgcHJvcGVybHkgaW4gU2FmYXJpIHlldCwgYnV0IGl0IHdpbGwgaW4gMTcuNCEgQXQgdGhhdCB0aW1lLCB3ZSBjYW5cbiAgICAgIHJlbW92ZSB0aGUgZmFsbGJhY2sgdmFsdWVzIGhlcmUuXG4gICAgKi9cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13YS1jb2xvci1vdmVybGF5LW1vZGFsLCByZ2IoMCAwIDAgLyAwLjI1KSk7XG4gIH1cblxuICBAa2V5ZnJhbWVzIHB1bHNlIHtcbiAgICAwJSB7XG4gICAgICBzY2FsZTogMTtcbiAgICB9XG4gICAgNTAlIHtcbiAgICAgIHNjYWxlOiAxLjAyO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIHNjYWxlOiAxO1xuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgc2hvdy1kaWFsb2cge1xuICAgIGZyb20ge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHNjYWxlOiAwLjg7XG4gICAgfVxuICAgIHRvIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICBzY2FsZTogMTtcbiAgICB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIHNob3ctYmFja2Ryb3Age1xuICAgIGZyb20ge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICB9XG4gICAgdG8ge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gIH1cblxuICBAbWVkaWEgKGZvcmNlZC1jb2xvcnM6IGFjdGl2ZSkge1xuICAgIC5kaWFsb2cge1xuICAgICAgYm9yZGVyOiBzb2xpZCAxcHggd2hpdGU7XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQge1xuICBkaWFsb2dfc3R5bGVzX2RlZmF1bHRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvaW50ZXJuYWwvZGlzbWlzc2libGUtc3RhY2sudHNcbnZhciBkaXNtaXNzaWJsZVN0YWNrID0gW107XG5mdW5jdGlvbiByZWdpc3RlckRpc21pc3NpYmxlKGtleSkge1xuICBkaXNtaXNzaWJsZVN0YWNrLnB1c2goa2V5KTtcbn1cbmZ1bmN0aW9uIHVucmVnaXN0ZXJEaXNtaXNzaWJsZShrZXkpIHtcbiAgZm9yIChsZXQgaSA9IGRpc21pc3NpYmxlU3RhY2subGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoZGlzbWlzc2libGVTdGFja1tpXSA9PT0ga2V5KSB7XG4gICAgICBkaXNtaXNzaWJsZVN0YWNrLnNwbGljZShpLCAxKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gaXNUb3BEaXNtaXNzaWJsZShrZXkpIHtcbiAgcmV0dXJuIGRpc21pc3NpYmxlU3RhY2subGVuZ3RoID4gMCAmJiBkaXNtaXNzaWJsZVN0YWNrW2Rpc21pc3NpYmxlU3RhY2subGVuZ3RoIC0gMV0gPT09IGtleTtcbn1cblxuZXhwb3J0IHtcbiAgcmVnaXN0ZXJEaXNtaXNzaWJsZSxcbiAgdW5yZWdpc3RlckRpc21pc3NpYmxlLFxuICBpc1RvcERpc21pc3NpYmxlXG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2V2ZW50cy9zaG93LnRzXG52YXIgV2FTaG93RXZlbnQgPSBjbGFzcyBleHRlbmRzIEV2ZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJ3YS1zaG93XCIsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSwgY29tcG9zZWQ6IHRydWUgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIFdhU2hvd0V2ZW50XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2V2ZW50cy9oaWRlLnRzXG52YXIgV2FIaWRlRXZlbnQgPSBjbGFzcyBleHRlbmRzIEV2ZW50IHtcbiAgY29uc3RydWN0b3IoZGV0YWlsKSB7XG4gICAgc3VwZXIoXCJ3YS1oaWRlXCIsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSwgY29tcG9zZWQ6IHRydWUgfSk7XG4gICAgdGhpcy5kZXRhaWwgPSBkZXRhaWw7XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIFdhSGlkZUV2ZW50XG59O1xuIiwgIi8qISBDb3B5cmlnaHQgMjAyNiBGb250aWNvbnMsIEluYy4gLSBodHRwczovL3dlYmF3ZXNvbWUuY29tL2xpY2Vuc2UgKi9cblxuLy8gc3JjL2V2ZW50cy9hZnRlci1oaWRlLnRzXG52YXIgV2FBZnRlckhpZGVFdmVudCA9IGNsYXNzIGV4dGVuZHMgRXZlbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIndhLWFmdGVyLWhpZGVcIiwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZSwgY29tcG9zZWQ6IHRydWUgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIFdhQWZ0ZXJIaWRlRXZlbnRcbn07XG4iLCAiLyohIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLiAtIGh0dHBzOi8vd2ViYXdlc29tZS5jb20vbGljZW5zZSAqL1xuXG4vLyBzcmMvZXZlbnRzL2FmdGVyLXNob3cudHNcbnZhciBXYUFmdGVyU2hvd0V2ZW50ID0gY2xhc3MgZXh0ZW5kcyBFdmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFwid2EtYWZ0ZXItc2hvd1wiLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IGZhbHNlLCBjb21wb3NlZDogdHJ1ZSB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgV2FBZnRlclNob3dFdmVudFxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5cbi8vIHNyYy9pbnRlcm5hbC9hbmltYXRlLnRzXG5hc3luYyBmdW5jdGlvbiBhbmltYXRlKGVsLCBrZXlmcmFtZXMsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGVsLmFuaW1hdGUoa2V5ZnJhbWVzLCBvcHRpb25zKS5maW5pc2hlZC5jYXRjaCgoKSA9PiB7XG4gIH0pO1xufVxuZnVuY3Rpb24gYW5pbWF0ZVdpdGhDbGFzcyhlbCwgY2xhc3NOYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgY29uc3QgeyBzaWduYWwgfSA9IGNvbnRyb2xsZXI7XG4gICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICBsZXQgcmVzb2x2ZWQgPSBmYWxzZTtcbiAgICBsZXQgb25FbmQgPSAoKSA9PiB7XG4gICAgICBpZiAocmVzb2x2ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuICAgIH07XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBvbkVuZCwgeyBvbmNlOiB0cnVlLCBzaWduYWwgfSk7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmNhbmNlbFwiLCBvbkVuZCwgeyBvbmNlOiB0cnVlLCBzaWduYWwgfSk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmICghcmVzb2x2ZWQgJiYgZWwuZ2V0QW5pbWF0aW9ucygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBvbkVuZCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHBhcnNlRHVyYXRpb24oZHVyYXRpb24pIHtcbiAgZHVyYXRpb24gPSBkdXJhdGlvbi50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChkdXJhdGlvbi5pbmRleE9mKFwibXNcIikgPiAtMSkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KGR1cmF0aW9uKSB8fCAwO1xuICB9XG4gIGlmIChkdXJhdGlvbi5pbmRleE9mKFwic1wiKSA+IC0xKSB7XG4gICAgcmV0dXJuIChwYXJzZUZsb2F0KGR1cmF0aW9uKSB8fCAwKSAqIDFlMztcbiAgfVxuICByZXR1cm4gcGFyc2VGbG9hdChkdXJhdGlvbikgfHwgMDtcbn1cbmZ1bmN0aW9uIHByZWZlcnNSZWR1Y2VkTW90aW9uKCkge1xuICBjb25zdCBxdWVyeSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlcIik7XG4gIHJldHVybiBxdWVyeS5tYXRjaGVzO1xufVxuXG5leHBvcnQge1xuICBhbmltYXRlLFxuICBhbmltYXRlV2l0aENsYXNzLFxuICBwYXJzZUR1cmF0aW9uLFxuICBwcmVmZXJzUmVkdWNlZE1vdGlvblxufTtcbiIsICIvKiEgQ29weXJpZ2h0IDIwMjYgRm9udGljb25zLCBJbmMuIC0gaHR0cHM6Ly93ZWJhd2Vzb21lLmNvbS9saWNlbnNlICovXG5pbXBvcnQge1xuICBsb2NrQm9keVNjcm9sbGluZyxcbiAgdW5sb2NrQm9keVNjcm9sbGluZ1xufSBmcm9tIFwiLi9jaHVuay5WUVo0Nk1ZSS5qc1wiO1xuaW1wb3J0IHtcbiAgcGFyc2VTcGFjZURlbGltaXRlZFRva2Vuc1xufSBmcm9tIFwiLi9jaHVuay5STVo3QlZETS5qc1wiO1xuaW1wb3J0IHtcbiAgZGlhbG9nX3N0eWxlc19kZWZhdWx0XG59IGZyb20gXCIuL2NodW5rLk5FVDVWNk5MLmpzXCI7XG5pbXBvcnQge1xuICBpc1RvcERpc21pc3NpYmxlLFxuICByZWdpc3RlckRpc21pc3NpYmxlLFxuICB1bnJlZ2lzdGVyRGlzbWlzc2libGVcbn0gZnJvbSBcIi4vY2h1bmsuNTJXQTJESk8uanNcIjtcbmltcG9ydCB7XG4gIFdhU2hvd0V2ZW50XG59IGZyb20gXCIuL2NodW5rLjRaQUtQN05ZLmpzXCI7XG5pbXBvcnQge1xuICBXYUhpZGVFdmVudFxufSBmcm9tIFwiLi9jaHVuay5NUU9ESjc1Vi5qc1wiO1xuaW1wb3J0IHtcbiAgV2FBZnRlckhpZGVFdmVudFxufSBmcm9tIFwiLi9jaHVuay4zTktJSElDVy5qc1wiO1xuaW1wb3J0IHtcbiAgV2FBZnRlclNob3dFdmVudFxufSBmcm9tIFwiLi9jaHVuay5QWDNITUtGNy5qc1wiO1xuaW1wb3J0IHtcbiAgYW5pbWF0ZVdpdGhDbGFzc1xufSBmcm9tIFwiLi9jaHVuay5MNkNJS09GUS5qc1wiO1xuaW1wb3J0IHtcbiAgSGFzU2xvdENvbnRyb2xsZXJcbn0gZnJvbSBcIi4vY2h1bmsuS0lIQjNWTUIuanNcIjtcbmltcG9ydCB7XG4gIHdhdGNoXG59IGZyb20gXCIuL2NodW5rLlBaQU42RlBOLmpzXCI7XG5pbXBvcnQge1xuICBMb2NhbGl6ZUNvbnRyb2xsZXJcbn0gZnJvbSBcIi4vY2h1bmsuT0tYQk5SRTYuanNcIjtcbmltcG9ydCB7XG4gIFdlYkF3ZXNvbWVFbGVtZW50XG59IGZyb20gXCIuL2NodW5rLkVQSEhXWEsyLmpzXCI7XG5pbXBvcnQge1xuICBfX2RlY29yYXRlQ2xhc3Ncbn0gZnJvbSBcIi4vY2h1bmsuN1ZHQ0lIREcuanNcIjtcblxuLy8gc3JjL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZy50c1xuaW1wb3J0IHsgaHRtbCwgaXNTZXJ2ZXIgfSBmcm9tIFwibGl0XCI7XG5pbXBvcnQgeyBjdXN0b21FbGVtZW50LCBwcm9wZXJ0eSwgcXVlcnkgfSBmcm9tIFwibGl0L2RlY29yYXRvcnMuanNcIjtcbmltcG9ydCB7IGNsYXNzTWFwIH0gZnJvbSBcImxpdC9kaXJlY3RpdmVzL2NsYXNzLW1hcC5qc1wiO1xudmFyIFdhRGlhbG9nID0gY2xhc3MgZXh0ZW5kcyBXZWJBd2Vzb21lRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgdGhpcy5sb2NhbGl6ZSA9IG5ldyBMb2NhbGl6ZUNvbnRyb2xsZXIodGhpcyk7XG4gICAgdGhpcy5oYXNTbG90Q29udHJvbGxlciA9IG5ldyBIYXNTbG90Q29udHJvbGxlcih0aGlzLCBcImZvb3RlclwiLCBcImhlYWRlci1hY3Rpb25zXCIsIFwibGFiZWxcIik7XG4gICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgdGhpcy5sYWJlbCA9IFwiXCI7XG4gICAgdGhpcy53aXRob3V0SGVhZGVyID0gZmFsc2U7XG4gICAgdGhpcy5saWdodERpc21pc3MgPSBmYWxzZTtcbiAgICB0aGlzLmhhbmRsZURvY3VtZW50S2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIiAmJiB0aGlzLm9wZW4gJiYgaXNUb3BEaXNtaXNzaWJsZSh0aGlzKSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0Q2xvc2UodGhpcy5kaWFsb2cpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgZmlyc3RVcGRhdGVkKCkge1xuICAgIGlmICh0aGlzLm9wZW4pIHtcbiAgICAgIHRoaXMuYWRkT3Blbkxpc3RlbmVycygpO1xuICAgICAgdGhpcy5kaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgICBsb2NrQm9keVNjcm9sbGluZyh0aGlzKTtcbiAgICB9XG4gIH1cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB1bmxvY2tCb2R5U2Nyb2xsaW5nKHRoaXMpO1xuICAgIHRoaXMucmVtb3ZlT3Blbkxpc3RlbmVycygpO1xuICB9XG4gIGFzeW5jIHJlcXVlc3RDbG9zZShzb3VyY2UpIHtcbiAgICBjb25zdCB3YUhpZGVFdmVudCA9IG5ldyBXYUhpZGVFdmVudCh7IHNvdXJjZSB9KTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQod2FIaWRlRXZlbnQpO1xuICAgIGlmICh3YUhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICAgICAgYW5pbWF0ZVdpdGhDbGFzcyh0aGlzLmRpYWxvZywgXCJwdWxzZVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVPcGVuTGlzdGVuZXJzKCk7XG4gICAgYXdhaXQgYW5pbWF0ZVdpdGhDbGFzcyh0aGlzLmRpYWxvZywgXCJoaWRlXCIpO1xuICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuZGlhbG9nLmNsb3NlKCk7XG4gICAgdW5sb2NrQm9keVNjcm9sbGluZyh0aGlzKTtcbiAgICBjb25zdCB0cmlnZ2VyID0gdGhpcy5vcmlnaW5hbFRyaWdnZXI7XG4gICAgaWYgKHR5cGVvZiB0cmlnZ2VyPy5mb2N1cyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWdnZXIuZm9jdXMoKSk7XG4gICAgfVxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgV2FBZnRlckhpZGVFdmVudCgpKTtcbiAgfVxuICBhZGRPcGVuTGlzdGVuZXJzKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuaGFuZGxlRG9jdW1lbnRLZXlEb3duKTtcbiAgICByZWdpc3RlckRpc21pc3NpYmxlKHRoaXMpO1xuICB9XG4gIHJlbW92ZU9wZW5MaXN0ZW5lcnMoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5oYW5kbGVEb2N1bWVudEtleURvd24pO1xuICAgIHVucmVnaXN0ZXJEaXNtaXNzaWJsZSh0aGlzKTtcbiAgfVxuICBoYW5kbGVEaWFsb2dDYW5jZWwoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghdGhpcy5kaWFsb2cuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZVwiKSAmJiBldmVudC50YXJnZXQgPT09IHRoaXMuZGlhbG9nICYmIGlzVG9wRGlzbWlzc2libGUodGhpcykpIHtcbiAgICAgIHRoaXMucmVxdWVzdENsb3NlKHRoaXMuZGlhbG9nKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlRGlhbG9nQ2xpY2soZXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgYnV0dG9uID0gdGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWRpYWxvZz1cImNsb3NlXCJdJyk7XG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLnJlcXVlc3RDbG9zZShidXR0b24pO1xuICAgIH1cbiAgfVxuICBhc3luYyBoYW5kbGVEaWFsb2dQb2ludGVyRG93bihldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMuZGlhbG9nKSB7XG4gICAgICBpZiAodGhpcy5saWdodERpc21pc3MpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0Q2xvc2UodGhpcy5kaWFsb2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgYW5pbWF0ZVdpdGhDbGFzcyh0aGlzLmRpYWxvZywgXCJwdWxzZVwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaGFuZGxlT3BlbkNoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5vcGVuICYmICF0aGlzLmRpYWxvZy5vcGVuKSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLm9wZW4gJiYgdGhpcy5kaWFsb2cub3Blbikge1xuICAgICAgdGhpcy5vcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVxdWVzdENsb3NlKHRoaXMuZGlhbG9nKTtcbiAgICB9XG4gIH1cbiAgLyoqIFNob3dzIHRoZSBkaWFsb2cuICovXG4gIGFzeW5jIHNob3coKSB7XG4gICAgY29uc3Qgd2FTaG93RXZlbnQgPSBuZXcgV2FTaG93RXZlbnQoKTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQod2FTaG93RXZlbnQpO1xuICAgIGlmICh3YVNob3dFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5hZGRPcGVuTGlzdGVuZXJzKCk7XG4gICAgdGhpcy5vcmlnaW5hbFRyaWdnZXIgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgdGhpcy5kaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgbG9ja0JvZHlTY3JvbGxpbmcodGhpcyk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRUb0ZvY3VzID0gdGhpcy5xdWVyeVNlbGVjdG9yKFwiW2F1dG9mb2N1c11cIik7XG4gICAgICBpZiAoZWxlbWVudFRvRm9jdXMgJiYgdHlwZW9mIGVsZW1lbnRUb0ZvY3VzLmZvY3VzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZWxlbWVudFRvRm9jdXMuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlhbG9nLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYXdhaXQgYW5pbWF0ZVdpdGhDbGFzcyh0aGlzLmRpYWxvZywgXCJzaG93XCIpO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgV2FBZnRlclNob3dFdmVudCgpKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgaGFzSGVhZGVyID0gIXRoaXMud2l0aG91dEhlYWRlcjtcbiAgICBjb25zdCBoYXNGb290ZXIgPSB0aGlzLmhhc1Nsb3RDb250cm9sbGVyLnRlc3QoXCJmb290ZXJcIik7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8ZGlhbG9nXG4gICAgICAgIHBhcnQ9XCJkaWFsb2dcIlxuICAgICAgICBjbGFzcz0ke2NsYXNzTWFwKHtcbiAgICAgIGRpYWxvZzogdHJ1ZSxcbiAgICAgIG9wZW46IHRoaXMub3BlblxuICAgIH0pfVxuICAgICAgICBAY2FuY2VsPSR7dGhpcy5oYW5kbGVEaWFsb2dDYW5jZWx9XG4gICAgICAgIEBjbGljaz0ke3RoaXMuaGFuZGxlRGlhbG9nQ2xpY2t9XG4gICAgICAgIEBwb2ludGVyZG93bj0ke3RoaXMuaGFuZGxlRGlhbG9nUG9pbnRlckRvd259XG4gICAgICA+XG4gICAgICAgICR7aGFzSGVhZGVyID8gaHRtbGBcbiAgICAgICAgICAgICAgPGhlYWRlciBwYXJ0PVwiaGVhZGVyXCIgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8aDIgcGFydD1cInRpdGxlXCIgY2xhc3M9XCJ0aXRsZVwiIGlkPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgIDwhLS0gSWYgdGhlcmUncyBubyBsYWJlbCwgdXNlIGFuIGludmlzaWJsZSBjaGFyYWN0ZXIgdG8gcHJldmVudCB0aGUgaGVhZGVyIGZyb20gY29sbGFwc2luZyAtLT5cbiAgICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJsYWJlbFwiPiAke3RoaXMubGFiZWwubGVuZ3RoID4gMCA/IHRoaXMubGFiZWwgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKDgyMDMpfSA8L3Nsb3Q+XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8ZGl2IHBhcnQ9XCJoZWFkZXItYWN0aW9uc1wiIGNsYXNzPVwiaGVhZGVyLWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJoZWFkZXItYWN0aW9uc1wiPjwvc2xvdD5cbiAgICAgICAgICAgICAgICAgIDx3YS1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgcGFydD1cImNsb3NlLWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydHBhcnRzPVwiYmFzZTpjbG9zZS1idXR0b25fX2Jhc2VcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgYXBwZWFyYW5jZT1cInBsYWluXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiJHsoZXZlbnQpID0+IHRoaXMucmVxdWVzdENsb3NlKGV2ZW50LnRhcmdldCl9XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHdhLWljb25cbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwieG1hcmtcIlxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPSR7dGhpcy5sb2NhbGl6ZS50ZXJtKFwiY2xvc2VcIil9XG4gICAgICAgICAgICAgICAgICAgICAgbGlicmFyeT1cInN5c3RlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInNvbGlkXCJcbiAgICAgICAgICAgICAgICAgICAgPjwvd2EtaWNvbj5cbiAgICAgICAgICAgICAgICAgIDwvd2EtYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgIGAgOiBcIlwifVxuXG4gICAgICAgIDxkaXYgcGFydD1cImJvZHlcIiBjbGFzcz1cImJvZHlcIj48c2xvdD48L3Nsb3Q+PC9kaXY+XG5cbiAgICAgICAgJHtoYXNGb290ZXIgPyBodG1sYFxuICAgICAgICAgICAgICA8Zm9vdGVyIHBhcnQ9XCJmb290ZXJcIiBjbGFzcz1cImZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJmb290ZXJcIj48L3Nsb3Q+XG4gICAgICAgICAgICAgIDwvZm9vdGVyPlxuICAgICAgICAgICAgYCA6IFwiXCJ9XG4gICAgICA8L2RpYWxvZz5cbiAgICBgO1xuICB9XG59O1xuV2FEaWFsb2cuY3NzID0gZGlhbG9nX3N0eWxlc19kZWZhdWx0O1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcXVlcnkoXCIuZGlhbG9nXCIpXG5dLCBXYURpYWxvZy5wcm90b3R5cGUsIFwiZGlhbG9nXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG5dLCBXYURpYWxvZy5wcm90b3R5cGUsIFwib3BlblwiLCAyKTtcbl9fZGVjb3JhdGVDbGFzcyhbXG4gIHByb3BlcnR5KHsgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FEaWFsb2cucHJvdG90eXBlLCBcImxhYmVsXCIsIDIpO1xuX19kZWNvcmF0ZUNsYXNzKFtcbiAgcHJvcGVydHkoeyBhdHRyaWJ1dGU6IFwid2l0aG91dC1oZWFkZXJcIiwgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuXSwgV2FEaWFsb2cucHJvdG90eXBlLCBcIndpdGhvdXRIZWFkZXJcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogXCJsaWdodC1kaXNtaXNzXCIsIHR5cGU6IEJvb2xlYW4gfSlcbl0sIFdhRGlhbG9nLnByb3RvdHlwZSwgXCJsaWdodERpc21pc3NcIiwgMik7XG5fX2RlY29yYXRlQ2xhc3MoW1xuICB3YXRjaChcIm9wZW5cIiwgeyB3YWl0VW50aWxGaXJzdFVwZGF0ZTogdHJ1ZSB9KVxuXSwgV2FEaWFsb2cucHJvdG90eXBlLCBcImhhbmRsZU9wZW5DaGFuZ2VcIiwgMSk7XG5XYURpYWxvZyA9IF9fZGVjb3JhdGVDbGFzcyhbXG4gIGN1c3RvbUVsZW1lbnQoXCJ3YS1kaWFsb2dcIilcbl0sIFdhRGlhbG9nKTtcbmlmICghaXNTZXJ2ZXIpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IGRpYWxvZ0F0dHJFbCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtZGlhbG9nXVwiKTtcbiAgICBpZiAoZGlhbG9nQXR0ckVsIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgY29uc3QgW2NvbW1hbmQsIGlkXSA9IHBhcnNlU3BhY2VEZWxpbWl0ZWRUb2tlbnMoZGlhbG9nQXR0ckVsLmdldEF0dHJpYnV0ZShcImRhdGEtZGlhbG9nXCIpIHx8IFwiXCIpO1xuICAgICAgaWYgKGNvbW1hbmQgPT09IFwib3BlblwiICYmIGlkPy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZG9jID0gZGlhbG9nQXR0ckVsLmdldFJvb3ROb2RlKCk7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IGRvYy5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgIGlmIChkaWFsb2c/LmxvY2FsTmFtZSA9PT0gXCJ3YS1kaWFsb2dcIikge1xuICAgICAgICAgIGRpYWxvZy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYEEgZGlhbG9nIHdpdGggYW4gSUQgb2YgXCIke2lkfVwiIGNvdWxkIG5vdCBiZSBmb3VuZCBpbiB0aGlzIGRvY3VtZW50LmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsICgpID0+IHtcbiAgfSk7XG59XG5cbmV4cG9ydCB7XG4gIFdhRGlhbG9nXG59O1xuIiwgImltcG9ydCB7IExpdEVsZW1lbnQsIGh0bWwgfSBmcm9tICdsaXQnO1xuaW1wb3J0IHsgY3VzdG9tRWxlbWVudCwgc3RhdGUgfSBmcm9tICdsaXQvZGVjb3JhdG9ycy5qcyc7XG5pbXBvcnQgdHlwZSB7IFRocmVhZCwgQW5jaG9yLCBBdXRob3JzTWFwIH0gZnJvbSAnLi4vLi4vdHlwZXMudHMnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4uL2xpYi9hcGkudHMnO1xuaW1wb3J0IHsgaW5pdElkZW50aXR5LCBnZXRJZGVudGl0eVBheWxvYWQgfSBmcm9tICcuLi9saWIvaWRlbnRpdHkudHMnO1xuaW1wb3J0IHsgY29tcHV0ZUFuY2hvciwgZ2V0U2VsZWN0aW9uUG9zaXRpb24sIGlzV2l0aGluQ29udGVudCB9IGZyb20gJy4uL2xpYi9zZWxlY3Rpb24udHMnO1xuaW1wb3J0IHsgaW5pdFRoZW1lQnJpZGdlIH0gZnJvbSAnLi4vbGliL3RoZW1lLnRzJztcblxuaW1wb3J0ICcuL3RocmVhZHMtcG9wb3Zlci50cyc7XG5pbXBvcnQgJy4vdGhyZWFkcy1pbmxpbmUtZWRpdG9yLnRzJztcbmltcG9ydCAnLi90aHJlYWRzLWlkZW50aXR5LnRzJztcblxuaW1wb3J0ICdAYXdlc29tZS5tZS93ZWJhd2Vzb21lL2Rpc3QvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLmpzJztcbmltcG9ydCAnQGF3ZXNvbWUubWUvd2ViYXdlc29tZS9kaXN0L2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbi5qcyc7XG5pbXBvcnQgJ0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9jb21wb25lbnRzL2ljb24vaWNvbi5qcyc7XG5cbkBjdXN0b21FbGVtZW50KCd0aHJlYWRzLWFwcCcpXG5leHBvcnQgY2xhc3MgVGhyZWFkc0FwcCBleHRlbmRzIExpdEVsZW1lbnQge1xuICBvdmVycmlkZSBjcmVhdGVSZW5kZXJSb290KCkgeyByZXR1cm4gdGhpczsgfVxuXG4gIEBzdGF0ZSgpIHByaXZhdGUgdGhyZWFkczogVGhyZWFkW10gPSBbXTtcbiAgQHN0YXRlKCkgcHJpdmF0ZSBhdXRob3JzTWFwOiBBdXRob3JzTWFwID0ge307XG4gIEBzdGF0ZSgpIHByaXZhdGUgcG9wb3ZlckFjdGl2ZSA9IGZhbHNlO1xuICBAc3RhdGUoKSBwcml2YXRlIHBvcG92ZXJYID0gMDtcbiAgQHN0YXRlKCkgcHJpdmF0ZSBwb3BvdmVyWSA9IDA7XG5cbiAgcHJpdmF0ZSBwZW5kaW5nQW5jaG9yOiBBbmNob3IgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBwZW5kaW5nQmxvY2tFbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBkZWxldGVUYXJnZXQ6IHsgdHlwZTogJ3RocmVhZCcgfCAnY29tbWVudCc7IGlkOiBzdHJpbmc7IHRocmVhZElkPzogc3RyaW5nIH0gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBpbmxpbmVFZGl0b3JFbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICBvdmVycmlkZSBkaXNjb25uZWN0ZWRDYWxsYmFjaygpOiB2b2lkIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlT3V0c2lkZVBvcG92ZXJDbGljayk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZG9jbWQ6cGFnZS1tb3VudGVkJywgdGhpcy5oYW5kbGVQYWdlTW91bnRlZCBhcyBFdmVudExpc3RlbmVyKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGNvbm5lY3RlZENhbGxiYWNrKCk6IHZvaWQge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgaW5pdFRoZW1lQnJpZGdlKCk7XG4gICAgaW5pdElkZW50aXR5KCk7XG4gICAgdGhpcy5pbmplY3RJZGVudGl0eUJ1dHRvbigpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlT3V0c2lkZVBvcG92ZXJDbGljayk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZG9jbWQ6cGFnZS1tb3VudGVkJywgdGhpcy5oYW5kbGVQYWdlTW91bnRlZCBhcyBFdmVudExpc3RlbmVyKTtcblxuICAgIHRoaXMubG9hZFRocmVhZHMoKTtcbiAgICB0aGlzLmluamVjdE5ld1RocmVhZEJ1dHRvbigpO1xuXG4gICAgLy8gUmVnaXN0ZXIgYWZ0ZXJSZWxvYWQgaGFuZGxlciBmb3IgcG9zdC1tdXRhdGlvbiBjb250aW51aXR5XG4gICAgaWYgKHR5cGVvZiBkb2NtZCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jbWQuYWZ0ZXJSZWxvYWQpIHtcbiAgICAgIGRvY21kLmFmdGVyUmVsb2FkKCd0aHJlYWRzJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRUaHJlYWRzKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0TmV3VGhyZWFkQnV0dG9uKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgY29udGVudCBhcmVhIG9mIHRoZSBwYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRDb250ZW50QXJlYSgpOiBFbGVtZW50IHwgbnVsbCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRvY21kLWNvbnRlbnRdJylcbiAgICAgIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kb2NtZC1jb250ZW50JylcbiAgICAgIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWNvbnRlbnQnKVxuICAgICAgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXJ0aWNsZScpXG4gICAgICB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBpZGVudGl0eSBidXR0b24gYW5kIHBsYWNlIGl0IGluIHRoZSBwYWdlIGhlYWRlci5cbiAgICogRG9uZSBpbXBlcmF0aXZlbHkgc28gTGl0IHJlLXJlbmRlcnMgZG9uJ3QgcHVsbCBpdCBiYWNrIGludG8gdGhyZWFkcy1hcHAuXG4gICAqL1xuICBwcml2YXRlIGluamVjdElkZW50aXR5QnV0dG9uKCk6IHZvaWQge1xuICAgIC8vIEF2b2lkIGR1cGxpY2F0ZXNcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGhyZWFkcy1pZGVudGl0eScpKSByZXR1cm47XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZG9jbWQtb3B0aW9ucy1tZW51JylcbiAgICAgIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItcmlnaHQnKTtcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaWRlbnRpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aHJlYWRzLWlkZW50aXR5Jyk7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKGlkZW50aXR5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmplY3QgYSBcIk5ldyBUaHJlYWRcIiBidXR0b24gaW50byBldmVyeSBoZWFkaW5nIGluIHRoZSBjb250ZW50IGFyZWEuXG4gICAqIEVhY2ggYnV0dG9uIGlzIHJpZ2h0LWFsaWduZWQgb24gdGhlIHNhbWUgbGluZSBhcyB0aGUgaGVhZGluZyB0ZXh0LlxuICAgKi9cbiAgcHJpdmF0ZSBpbmplY3ROZXdUaHJlYWRCdXR0b24oKTogdm9pZCB7XG4gICAgLy8gUmVtb3ZlIGV4aXN0aW5nIGJ1dHRvbnMgKGUuZy4gYWZ0ZXIgcmVsb2FkKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aHJlYWRzLW5ldy10aHJlYWQtYnRuJykuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XG4gICAgLy8gUmVtb3ZlIHdyYXBwZXIgY2xhc3NlcyBmcm9tIGhlYWRpbmdzXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRocmVhZHMtaGVhZGluZy13cmFwJykuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd0aHJlYWRzLWhlYWRpbmctd3JhcCcpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY29udGVudEFyZWEgPSB0aGlzLmdldENvbnRlbnRBcmVhKCk7XG4gICAgaWYgKCFjb250ZW50QXJlYSkgcmV0dXJuO1xuXG4gICAgY29uc3QgSEVBRElOR19UQUdTID0gbmV3IFNldChbJ0gxJywgJ0gyJywgJ0gzJywgJ0g0JywgJ0g1JywgJ0g2J10pO1xuICAgIC8vIE9ubHkgdGFyZ2V0IGRpcmVjdCBjaGlsZHJlbiBvZiB0aGUgY29udGVudCBhcmVhIFx1MjAxNCBhdm9pZHMgVE9DLCBzaWRlYmFyIGhlYWRpbmdzLCBldGMuXG4gICAgY29uc3QgaGVhZGluZ3MgPSBBcnJheS5mcm9tKGNvbnRlbnRBcmVhLmNoaWxkcmVuKS5maWx0ZXIoZWwgPT4gSEVBRElOR19UQUdTLmhhcyhlbC50YWdOYW1lKSk7XG5cbiAgICBmb3IgKGNvbnN0IGhlYWRpbmcgb2YgaGVhZGluZ3MpIHtcbiAgICAgIC8vIE9ubHkgdGFyZ2V0IGRpcmVjdC1pc2ggaGVhZGluZ3MgaW5zaWRlIHRoZSBjb250ZW50IGFyZWFcbiAgICAgIGlmICghSEVBRElOR19UQUdTLmhhcyhoZWFkaW5nLnRhZ05hbWUpKSBjb250aW51ZTtcblxuICAgICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCd0aHJlYWRzLWhlYWRpbmctd3JhcCcpO1xuXG4gICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIGJ0bi5jbGFzc05hbWUgPSAndGhyZWFkcy1uZXctdGhyZWFkLWJ0bic7XG4gICAgICBidG4uaW5uZXJIVE1MID0gYDx3YS1pY29uIG5hbWU9XCJwbHVzXCIgc3R5bGU9XCJmb250LXNpemU6MTRweDtcIj48L3dhLWljb24+IE5ldyBUaHJlYWRgO1xuICAgICAgYnRuLnRpdGxlID0gJ1N0YXJ0IGEgbmV3IGRpc2N1c3Npb24gdGhyZWFkJztcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5zdGFydE5ld1RocmVhZChoZWFkaW5nKTtcbiAgICAgIH0pO1xuICAgICAgaGVhZGluZy5hcHBlbmRDaGlsZChidG4pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCBhIG5ldyB0b3AtbGV2ZWwgdGhyZWFkIGJ5IG9wZW5pbmcgYW4gaW5saW5lIGVkaXRvciBhZnRlciB0aGUgZ2l2ZW4gaGVhZGluZy5cbiAgICovXG4gIHByaXZhdGUgc3RhcnROZXdUaHJlYWQoaGVhZGluZzogRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlSW5saW5lRWRpdG9yKCk7XG5cbiAgICBjb25zdCBlZGl0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aHJlYWRzLWlubGluZS1lZGl0b3InKSBhcyBhbnk7XG4gICAgZWRpdG9yLnF1b3RlID0gJyc7XG5cbiAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcignaW5saW5lLXN1Ym1pdCcsIGFzeW5jIChlOiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgY29uc3QgaWRlbnRpdHkgPSBnZXRJZGVudGl0eVBheWxvYWQoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGFwaS5jcmVhdGVUaHJlYWQoe1xuICAgICAgICAgIGFuY2hvcjogbnVsbCxcbiAgICAgICAgICAuLi5pZGVudGl0eSxcbiAgICAgICAgICBib2R5OiBlLmRldGFpbC5ib2R5LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW1vdmVJbmxpbmVFZGl0b3IoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2NtZCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jbWQuc2NoZWR1bGVSZWxvYWQpIHtcbiAgICAgICAgICBkb2NtZC5zY2hlZHVsZVJlbG9hZCgndGhyZWFkcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMubG9hZFRocmVhZHMoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1t0aHJlYWRzXSBGYWlsZWQgdG8gY3JlYXRlIHRocmVhZDonLCBlcnIpO1xuICAgICAgICBlZGl0b3Iuc3VibWl0dGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2lubGluZS1jYW5jZWwnLCAoKSA9PiB0aGlzLnJlbW92ZUlubGluZUVkaXRvcigpKTtcblxuICAgIGhlYWRpbmcuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIGVkaXRvcik7XG4gICAgdGhpcy5pbmxpbmVFZGl0b3JFbCA9IGVkaXRvcjtcbiAgfVxuXG4gIC8vIFx1MjUwMFx1MjUwMFx1MjUwMCBTZWxlY3Rpb24gcG9wb3ZlciBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuICBwcml2YXRlIGhhbmRsZU1vdXNlVXAgPSAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHBvcG92ZXIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ3RocmVhZHMtcG9wb3ZlcicpO1xuICAgIGlmIChwb3BvdmVyPy5jb250YWlucyhlLnRhcmdldCBhcyBOb2RlKSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIGlmICghc2VsZWN0aW9uIHx8IHNlbGVjdGlvbi5pc0NvbGxhcHNlZCkge1xuICAgICAgdGhpcy5wb3BvdmVyQWN0aXZlID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFzZWxlY3Rpb24uYW5jaG9yTm9kZSB8fCAhaXNXaXRoaW5Db250ZW50KHNlbGVjdGlvbi5hbmNob3JOb2RlKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgYW5jaG9yID0gY29tcHV0ZUFuY2hvcihzZWxlY3Rpb24pO1xuICAgIGlmICghYW5jaG9yKSByZXR1cm47XG5cbiAgICBjb25zdCBwb3MgPSBnZXRTZWxlY3Rpb25Qb3NpdGlvbihzZWxlY3Rpb24pO1xuICAgIGlmICghcG9zKSByZXR1cm47XG5cbiAgICAvLyBGaW5kIHRoZSBlbmNsb3NpbmcgYmxvY2sgZWxlbWVudCBmb3IgaW5saW5lIGVkaXRvciBpbnNlcnRpb25cbiAgICBjb25zdCBCTE9DS19UQUdTID0gbmV3IFNldChbXCJQXCIsIFwiRElWXCIsIFwiTElcIiwgXCJCTE9DS1FVT1RFXCIsIFwiUFJFXCIsIFwiSDFcIiwgXCJIMlwiLCBcIkgzXCIsIFwiSDRcIiwgXCJINVwiLCBcIkg2XCJdKTtcbiAgICBsZXQgYmxvY2tFbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgbm9kZTogTm9kZSB8IG51bGwgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKS5zdGFydENvbnRhaW5lcjtcbiAgICB3aGlsZSAobm9kZSAmJiBub2RlICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIEJMT0NLX1RBR1MuaGFzKG5vZGUudGFnTmFtZSkpIHtcbiAgICAgICAgYmxvY2tFbCA9IG5vZGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICB0aGlzLnBlbmRpbmdBbmNob3IgPSBhbmNob3I7XG4gICAgdGhpcy5wZW5kaW5nQmxvY2tFbCA9IGJsb2NrRWw7XG4gICAgdGhpcy5wb3BvdmVyWCA9IHBvcy54O1xuICAgIHRoaXMucG9wb3ZlclkgPSBwb3MueTtcbiAgICB0aGlzLnBvcG92ZXJBY3RpdmUgPSB0cnVlO1xuICB9O1xuXG4gIHByaXZhdGUgaGFuZGxlT3V0c2lkZVBvcG92ZXJDbGljayA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgY29uc3QgcG9wb3ZlciA9IHRoaXMucXVlcnlTZWxlY3RvcigndGhyZWFkcy1wb3BvdmVyJyk7XG4gICAgaWYgKHBvcG92ZXIgJiYgIWUuY29tcG9zZWRQYXRoKCkuaW5jbHVkZXMocG9wb3ZlcikpIHtcbiAgICAgIHRoaXMucG9wb3ZlckFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlIHBvcG92ZXIgXCJhZGQgY29tbWVudFwiIFx1MjAxNCBvcGVuIGlubGluZSBlZGl0b3IgYWZ0ZXIgdGhlIGJsb2NrLlxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVBZGRDb21tZW50KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wZW5kaW5nQW5jaG9yIHx8ICF0aGlzLnBlbmRpbmdCbG9ja0VsKSByZXR1cm47XG5cbiAgICB0aGlzLnJlbW92ZUlubGluZUVkaXRvcigpO1xuICAgIHRoaXMucG9wb3ZlckFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgY29uc3QgYW5jaG9yID0gdGhpcy5wZW5kaW5nQW5jaG9yO1xuICAgIGNvbnN0IGJsb2NrRWwgPSB0aGlzLnBlbmRpbmdCbG9ja0VsO1xuICAgIHRoaXMucGVuZGluZ0FuY2hvciA9IG51bGw7XG4gICAgdGhpcy5wZW5kaW5nQmxvY2tFbCA9IG51bGw7XG4gICAgd2luZG93LmdldFNlbGVjdGlvbigpPy5yZW1vdmVBbGxSYW5nZXMoKTtcblxuICAgIGNvbnN0IGVkaXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RocmVhZHMtaW5saW5lLWVkaXRvcicpIGFzIGFueTtcbiAgICBlZGl0b3IucXVvdGUgPSBhbmNob3IucXVvdGUgfHwgJyc7XG5cbiAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcignaW5saW5lLXN1Ym1pdCcsIGFzeW5jIChlOiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgY29uc3QgaWRlbnRpdHkgPSBnZXRJZGVudGl0eVBheWxvYWQoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGFwaS5jcmVhdGVUaHJlYWQoe1xuICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICAuLi5pZGVudGl0eSxcbiAgICAgICAgICBib2R5OiBlLmRldGFpbC5ib2R5LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW1vdmVJbmxpbmVFZGl0b3IoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2NtZCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jbWQuc2NoZWR1bGVSZWxvYWQpIHtcbiAgICAgICAgICBkb2NtZC5zY2hlZHVsZVJlbG9hZCgndGhyZWFkcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IHRoaXMubG9hZFRocmVhZHMoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1t0aHJlYWRzXSBGYWlsZWQgdG8gY3JlYXRlIHRocmVhZDonLCBlcnIpO1xuICAgICAgICBlZGl0b3Iuc3VibWl0dGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2lubGluZS1jYW5jZWwnLCAoKSA9PiB0aGlzLnJlbW92ZUlubGluZUVkaXRvcigpKTtcblxuICAgIGJsb2NrRWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIGVkaXRvcik7XG4gICAgdGhpcy5pbmxpbmVFZGl0b3JFbCA9IGVkaXRvcjtcbiAgfVxuXG4gIC8vIFx1MjUwMFx1MjUwMFx1MjUwMCBQYWdlIGxpZmVjeWNsZSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuICBwcml2YXRlIGhhbmRsZVBhZ2VNb3VudGVkID0gKF9lOiBDdXN0b21FdmVudCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucG9wb3ZlckFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMubG9hZFRocmVhZHMoKTtcbiAgICB0aGlzLmluamVjdE5ld1RocmVhZEJ1dHRvbigpO1xuICB9O1xuXG4gIHByaXZhdGUgYXN5bmMgbG9hZFRocmVhZHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IFt0aHJlYWRzLCBhdXRob3JzXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgYXBpLmZldGNoVGhyZWFkcygpLFxuICAgICAgICBhcGkuZmV0Y2hBdXRob3JzKCksXG4gICAgICBdKTtcbiAgICAgIHRoaXMudGhyZWFkcyA9IHRocmVhZHM7XG4gICAgICB0aGlzLmF1dGhvcnNNYXAgPSBhdXRob3JzO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignW3RocmVhZHNdIEZhaWxlZCB0byBsb2FkIHRocmVhZHM6JywgZXJyKTtcbiAgICAgIHRoaXMudGhyZWFkcyA9IFtdO1xuICAgIH1cbiAgICB0aGlzLnNjYW5SZW5kZXJlZEhpZ2hsaWdodHMoKTtcbiAgfVxuXG4gIC8vIENvbG9yIHBhbGV0dGUgZm9yIGhpZ2hsaWdodHMgXHUyMDE0IGN5Y2xlcyB0aHJvdWdoIHRoZXNlXG4gIHByaXZhdGUgc3RhdGljIEhJR0hMSUdIVF9DT0xPUlMgPSBbXG4gICAgJ3RocmVhZHMtaGwteWVsbG93JyxcbiAgICAndGhyZWFkcy1obC1ibHVlJyxcbiAgICAndGhyZWFkcy1obC1ncmVlbicsXG4gICAgJ3RocmVhZHMtaGwtcGluaycsXG4gICAgJ3RocmVhZHMtaGwtcHVycGxlJyxcbiAgICAndGhyZWFkcy1obC1vcmFuZ2UnLFxuICBdO1xuXG4gIC8qKlxuICAgKiBTY2FuIHRoZSBET00gZm9yIDxtYXJrIGNsYXNzPVwidGhyZWFkcy1oaWdobGlnaHRcIiBkYXRhLXRocmVhZC1pZD1cIi4uLlwiPiBlbGVtZW50cy5cbiAgICogQXNzaWducyBjeWNsaW5nIGhpZ2hsaWdodCBjb2xvcnMsIG1vdmVzIHRocmVhZCBjYXJkcyBpbmxpbmUgYWZ0ZXIgdGhlIGJsb2NrXG4gICAqIGNvbnRhaW5pbmcgdGhlIGhpZ2hsaWdodCwgYW5kIGF0dGFjaGVzIGNsaWNrIGhhbmRsZXJzLlxuICAgKi9cbiAgcHJpdmF0ZSBzY2FuUmVuZGVyZWRIaWdobGlnaHRzKCk6IHZvaWQge1xuICAgIGNvbnN0IG1hcmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oJ21hcmsudGhyZWFkcy1oaWdobGlnaHRbZGF0YS10aHJlYWQtaWRdJyk7XG4gICAgY29uc3QgQkxPQ0tfVEFHUyA9IG5ldyBTZXQoWydQJywgJ0RJVicsICdMSScsICdCTE9DS1FVT1RFJywgJ1BSRScsICdIMScsICdIMicsICdIMycsICdINCcsICdINScsICdINicsICdVTCcsICdPTCcsICdUQUJMRSddKTtcbiAgICBsZXQgY29sb3JJbmRleCA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IG1hcmsgb2YgbWFya3MpIHtcbiAgICAgIGNvbnN0IHRocmVhZElkID0gbWFyay5kYXRhc2V0LnRocmVhZElkO1xuICAgICAgaWYgKCF0aHJlYWRJZCkgY29udGludWU7XG5cbiAgICAgIC8vIDEuIEFzc2lnbiBjeWNsaW5nIGhpZ2hsaWdodCBjb2xvclxuICAgICAgY29uc3QgY29sb3JDbGFzcyA9IFRocmVhZHNBcHAuSElHSExJR0hUX0NPTE9SU1tjb2xvckluZGV4ICUgVGhyZWFkc0FwcC5ISUdITElHSFRfQ09MT1JTLmxlbmd0aF07XG4gICAgICBtYXJrLmNsYXNzTGlzdC5hZGQoY29sb3JDbGFzcyk7XG4gICAgICBjb2xvckluZGV4Kys7XG5cbiAgICAgIC8vIDIuIE1vdmUgdGhyZWFkIGNhcmQgZnJvbSB0aGUgYm90dG9tIHRocmVhZHMtc2lkZWJhciB0byBhZnRlciB0aGUgZW5jbG9zaW5nIGJsb2NrXG4gICAgICBjb25zdCB0aHJlYWRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGAudGhyZWFkcy10aHJlYWRbZGF0YS10aHJlYWQtaWQ9XCIke3RocmVhZElkfVwiXWApO1xuICAgICAgaWYgKHRocmVhZEVsKSB7XG4gICAgICAgIC8vIEFwcGx5IG1hdGNoaW5nIGJvcmRlciBjb2xvclxuICAgICAgICB0aHJlYWRFbC5jbGFzc0xpc3QuYWRkKGNvbG9yQ2xhc3MucmVwbGFjZSgndGhyZWFkcy1obC0nLCAndGhyZWFkcy1ib3JkZXItJykpO1xuXG4gICAgICAgIC8vIEZpbmQgdGhlIGVuY2xvc2luZyBibG9jayBlbGVtZW50IG9mIHRoZSBoaWdobGlnaHRcbiAgICAgICAgbGV0IGJsb2NrRWw6IEVsZW1lbnQgfCBudWxsID0gbWFyaztcbiAgICAgICAgd2hpbGUgKGJsb2NrRWwgJiYgYmxvY2tFbCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgIGlmIChibG9ja0VsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgQkxPQ0tfVEFHUy5oYXMoYmxvY2tFbC50YWdOYW1lKSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJsb2NrRWwgPSBibG9ja0VsLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmxvY2tFbCAmJiBibG9ja0VsICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgYmxvY2tFbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgdGhyZWFkRWwpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIDMuIENsaWNrIGhhbmRsZXI6IHNjcm9sbCB0byB0aHJlYWQgYW5kIGZsYXNoXG4gICAgICBtYXJrLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgIG1hcmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRocmVhZHMtdGhyZWFkW2RhdGEtdGhyZWFkLWlkPVwiJHt0aHJlYWRJZH1cIl1gKTtcbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgZWwuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJyB9KTtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd0aHJlYWRzLXRocmVhZC0tZmxhc2gnKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3RocmVhZHMtdGhyZWFkLS1mbGFzaCcpLCAyMDAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gNC4gSW5qZWN0IHJlcGx5IGJ1dHRvbnMgaW50byBhbGwgdGhyZWFkIGNhcmRzXG4gICAgdGhpcy5pbmplY3RSZXBseUJ1dHRvbnMoKTtcblxuICAgIC8vIEhpZGUgdGhlIHRocmVhZHMtc2lkZWJhciBvbmx5IGlmIGFsbCB0aHJlYWRzIHdlcmUgbW92ZWQgb3V0ICh0byBpbmxpbmUgcG9zaXRpb25zKVxuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhyZWFkcy1zaWRlYmFyJyk7XG4gICAgaWYgKHNpZGViYXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgY29uc3QgcmVtYWluaW5nVGhyZWFkcyA9IHNpZGViYXIucXVlcnlTZWxlY3RvckFsbCgnLnRocmVhZHMtdGhyZWFkJyk7XG4gICAgICBpZiAocmVtYWluaW5nVGhyZWFkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2lkZWJhci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbmhhbmNlIHRocmVhZCBjYXJkczogbmVzdCByZXBsaWVzIHVuZGVyIHBhcmVudHMsIGFkZCBwZXItY29tbWVudCByZXBseSAmIGRlbGV0ZSBidXR0b25zLFxuICAgKiBhbmQgYSBcIisgTmV3IENvbW1lbnRcIiBmb290ZXIgYnV0dG9uIGZvciB0b3AtbGV2ZWwgY29tbWVudHMuXG4gICAqL1xuICBwcml2YXRlIGluamVjdFJlcGx5QnV0dG9ucygpOiB2b2lkIHtcbiAgICBjb25zdCB0aHJlYWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oJy50aHJlYWRzLXRocmVhZFtkYXRhLXRocmVhZC1pZF0nKTtcbiAgICBmb3IgKGNvbnN0IHRocmVhZEVsIG9mIHRocmVhZHMpIHtcbiAgICAgIC8vIFNraXAgaWYgYWxyZWFkeSBlbmhhbmNlZFxuICAgICAgaWYgKHRocmVhZEVsLnF1ZXJ5U2VsZWN0b3IoJy50aHJlYWRzLW5ldy1jb21tZW50LWJ0bicpKSBjb250aW51ZTtcblxuICAgICAgY29uc3QgdGhyZWFkSWQgPSB0aHJlYWRFbC5kYXRhc2V0LnRocmVhZElkO1xuICAgICAgaWYgKCF0aHJlYWRJZCkgY29udGludWU7XG5cbiAgICAgIC8vIE5lc3QgcmVwbGllcyB1bmRlciB0aGVpciBwYXJlbnQgY29tbWVudHNcbiAgICAgIHRoaXMubmVzdFJlcGxpZXModGhyZWFkRWwpO1xuXG4gICAgICAvLyBBZGQgcGVyLWNvbW1lbnQgcmVwbHkgKyBkZWxldGUgYnV0dG9uc1xuICAgICAgY29uc3QgYWxsQ29tbWVudHMgPSB0aHJlYWRFbC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignLnRocmVhZHMtY29tbWVudCcpO1xuICAgICAgY29uc3QgdG90YWxDb21tZW50cyA9IGFsbENvbW1lbnRzLmxlbmd0aDtcbiAgICAgIGZvciAoY29uc3QgY29tbWVudEVsIG9mIGFsbENvbW1lbnRzKSB7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRJZCA9IGNvbW1lbnRFbC5kYXRhc2V0LmNvbW1lbnRJZDtcbiAgICAgICAgaWYgKCFjb21tZW50SWQpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IG1ldGEgPSBjb21tZW50RWwucXVlcnlTZWxlY3RvcignLnRocmVhZHMtY29tbWVudF9fbWV0YScpO1xuICAgICAgICBpZiAoIW1ldGEpIGNvbnRpbnVlO1xuXG4gICAgICAgIC8vIEluamVjdCBhdmF0YXIgaWYgbm90IGFscmVhZHkgcHJlc2VudFxuICAgICAgICBpZiAoIW1ldGEucXVlcnlTZWxlY3RvcignLnRocmVhZHMtY29tbWVudF9fYXZhdGFyJykpIHtcbiAgICAgICAgICBjb25zdCBhdXRob3JWYWwgPSBjb21tZW50RWwuZGF0YXNldC5hdXRob3IgfHwgJyc7XG4gICAgICAgICAgY29uc3QgYXV0aG9ySW5mbyA9IHRoaXMucmVzb2x2ZUF1dGhvcihhdXRob3JWYWwpO1xuICAgICAgICAgIGlmIChhdXRob3JJbmZvPy5hdmF0YXJVcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGF2YXRhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgYXZhdGFyLmNsYXNzTmFtZSA9ICd0aHJlYWRzLWNvbW1lbnRfX2F2YXRhcic7XG4gICAgICAgICAgICBhdmF0YXIuc3JjID0gYXV0aG9ySW5mby5hdmF0YXJVcmw7XG4gICAgICAgICAgICBhdmF0YXIuYWx0ID0gYXV0aG9ySW5mby5uYW1lIHx8IGF1dGhvclZhbDtcbiAgICAgICAgICAgIG1ldGEuaW5zZXJ0QmVmb3JlKGF2YXRhciwgbWV0YS5maXJzdENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTa2lwIGlmIGFjdGlvbnMgYWxyZWFkeSBhZGRlZCAocmUtcmVuZGVyKVxuICAgICAgICBpZiAoY29tbWVudEVsLnF1ZXJ5U2VsZWN0b3IoJy50aHJlYWRzLWNvbW1lbnRfX2FjdGlvbnMnKSkgY29udGludWU7XG5cbiAgICAgICAgLy8gQWN0aW9ucyBjb250YWluZXIgXHUyMDE0IHB1c2hlZCB0byB0aGUgcmlnaHQgdmlhIG1hcmdpbi1sZWZ0OiBhdXRvXG4gICAgICAgIGNvbnN0IGFjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWN0aW9ucy5jbGFzc05hbWUgPSAndGhyZWFkcy1jb21tZW50X19hY3Rpb25zJztcblxuICAgICAgICAvLyBSZXBseSBidXR0b25cbiAgICAgICAgY29uc3QgcmVwbHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgcmVwbHlCdG4uY2xhc3NOYW1lID0gJ3RocmVhZHMtY29tbWVudC1yZXBseS1idG4nO1xuICAgICAgICByZXBseUJ0bi5pbm5lckhUTUwgPSBgPHdhLWljb24gbmFtZT1cInJlcGx5XCIgc3R5bGU9XCJmb250LXNpemU6MTNweDtcIj48L3dhLWljb24+IFJlcGx5YDtcbiAgICAgICAgcmVwbHlCdG4udGl0bGUgPSAnUmVwbHkgdG8gdGhpcyBjb21tZW50JztcbiAgICAgICAgcmVwbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgdGhpcy5vcGVuUmVwbHlFZGl0b3IodGhyZWFkRWwsIHRocmVhZElkLCBjb21tZW50SWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgYWN0aW9ucy5hcHBlbmRDaGlsZChyZXBseUJ0bik7XG5cbiAgICAgICAgLy8gRGVsZXRlIGJ1dHRvblxuICAgICAgICBjb25zdCBkZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgZGVsQnRuLmNsYXNzTmFtZSA9ICd0aHJlYWRzLWRlbGV0ZS1idG4nO1xuICAgICAgICBkZWxCdG4uaW5uZXJIVE1MID0gYDx3YS1pY29uIG5hbWU9XCJ0cmFzaFwiIHN0eWxlPVwiZm9udC1zaXplOjEzcHg7XCI+PC93YS1pY29uPmA7XG4gICAgICAgIGRlbEJ0bi50aXRsZSA9ICdEZWxldGUgY29tbWVudCc7XG4gICAgICAgIGRlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBpZiAodG90YWxDb21tZW50cyA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5kZWxldGVUYXJnZXQgPSB7IHR5cGU6ICd0aHJlYWQnLCBpZDogdGhyZWFkSWQgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZWxldGVUYXJnZXQgPSB7IHR5cGU6ICdjb21tZW50JywgaWQ6IGNvbW1lbnRJZCwgdGhyZWFkSWQgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZGlhbG9nID0gdGhpcy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50ICYgeyBvcGVuOiBib29sZWFuIH0+KCcjZGVsZXRlLWRpYWxvZycpO1xuICAgICAgICAgIGlmIChkaWFsb2cpIGRpYWxvZy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFjdGlvbnMuYXBwZW5kQ2hpbGQoZGVsQnRuKTtcblxuICAgICAgICBtZXRhLmFwcGVuZENoaWxkKGFjdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICAvLyBCdWlsZCBjb2xsYXBzZSBzdW1tYXJ5XG4gICAgICBjb25zdCBhbGxDb21tZW50c0ZvclN1bW1hcnkgPSB0aHJlYWRFbC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignLnRocmVhZHMtY29tbWVudCcpO1xuICAgICAgY29uc3Qgc3VtbWFyeSA9IHRoaXMuYnVpbGRDb2xsYXBzZVN1bW1hcnkoYWxsQ29tbWVudHNGb3JTdW1tYXJ5KTtcblxuICAgICAgLy8gRm9vdGVyIHdpdGggc3VtbWFyeSAoaGlkZGVuIHdoZW4gZXhwYW5kZWQpLCBcIisgTmV3IENvbW1lbnRcIiwgYW5kIGNvbGxhcHNlIHRvZ2dsZVxuICAgICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBmb290ZXIuY2xhc3NOYW1lID0gJ3RocmVhZHMtdGhyZWFkX19mb290ZXInO1xuXG4gICAgICAvLyBTdW1tYXJ5IGVsZW1lbnQgKHZpc2libGUgb25seSB3aGVuIGNvbGxhcHNlZCwgdmlhIENTUylcbiAgICAgIGNvbnN0IHN1bW1hcnlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc3VtbWFyeUVsLmNsYXNzTmFtZSA9ICd0aHJlYWRzLXRocmVhZF9fc3VtbWFyeSc7XG4gICAgICBzdW1tYXJ5RWwudGV4dENvbnRlbnQgPSBzdW1tYXJ5O1xuICAgICAgZm9vdGVyLmFwcGVuZENoaWxkKHN1bW1hcnlFbCk7XG5cbiAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgYnRuLmNsYXNzTmFtZSA9ICd0aHJlYWRzLW5ldy1jb21tZW50LWJ0bic7XG4gICAgICBidG4uaW5uZXJIVE1MID0gYDx3YS1pY29uIG5hbWU9XCJwbHVzXCIgc3R5bGU9XCJmb250LXNpemU6MTNweDtcIj48L3dhLWljb24+IE5ldyBDb21tZW50YDtcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMub3BlblJlcGx5RWRpdG9yKHRocmVhZEVsLCB0aHJlYWRJZCwgbnVsbCk7XG4gICAgICB9KTtcbiAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChidG4pO1xuXG4gICAgICAvLyBDb2xsYXBzZS9leHBhbmQgdG9nZ2xlIGJ1dHRvblxuICAgICAgY29uc3QgdG9nZ2xlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICB0b2dnbGVCdG4uY2xhc3NOYW1lID0gJ3RocmVhZHMtY29sbGFwc2UtYnRuJztcbiAgICAgIHRvZ2dsZUJ0bi5pbm5lckhUTUwgPSBgPHdhLWljb24gbmFtZT1cImNoZXZyb24tdXBcIiBzdHlsZT1cImZvbnQtc2l6ZToxNHB4O1wiPjwvd2EtaWNvbj5gO1xuICAgICAgdG9nZ2xlQnRuLnRpdGxlID0gJ0NvbGxhcHNlIHRocmVhZCc7XG4gICAgICB0b2dnbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCBpc0NvbGxhcHNlZCA9IHRocmVhZEVsLmNsYXNzTGlzdC50b2dnbGUoJ3RocmVhZHMtdGhyZWFkLS1jb2xsYXBzZWQnKTtcbiAgICAgICAgdG9nZ2xlQnRuLmlubmVySFRNTCA9IGlzQ29sbGFwc2VkXG4gICAgICAgICAgPyBgPHdhLWljb24gbmFtZT1cImNoZXZyb24tZG93blwiIHN0eWxlPVwiZm9udC1zaXplOjE0cHg7XCI+PC93YS1pY29uPmBcbiAgICAgICAgICA6IGA8d2EtaWNvbiBuYW1lPVwiY2hldnJvbi11cFwiIHN0eWxlPVwiZm9udC1zaXplOjE0cHg7XCI+PC93YS1pY29uPmA7XG4gICAgICAgIHRvZ2dsZUJ0bi50aXRsZSA9IGlzQ29sbGFwc2VkID8gJ0V4cGFuZCB0aHJlYWQnIDogJ0NvbGxhcHNlIHRocmVhZCc7XG4gICAgICB9KTtcbiAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZCh0b2dnbGVCdG4pO1xuXG4gICAgICB0aHJlYWRFbC5hcHBlbmRDaGlsZChmb290ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBhIHN1bW1hcnkgc3RyaW5nIGxpa2UgXCIzIGNvbW1lbnRzIGJ5IEFsaWNlLCBCb2IsIGFuZCAxIG1vcmVcIi5cbiAgICogVXNlcyBvbmx5IHRoZSBmaXJzdCBuYW1lIG9mIGVhY2ggYXV0aG9yLlxuICAgKi9cbiAgcHJpdmF0ZSBidWlsZENvbGxhcHNlU3VtbWFyeShjb21tZW50czogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvdW50ID0gY29tbWVudHMubGVuZ3RoO1xuICAgIGNvbnN0IGF1dGhvcnMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY29tbWVudHMpIHtcbiAgICAgIGNvbnN0IGF1dGhvciA9IGMuZGF0YXNldC5hdXRob3I7XG4gICAgICBpZiAoYXV0aG9yKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGF1dGhvci5zcGxpdCgvXFxzKy8pWzBdO1xuICAgICAgICBhdXRob3JzLmFkZChmaXJzdE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVuaXF1ZU5hbWVzID0gQXJyYXkuZnJvbShhdXRob3JzKTtcbiAgICBjb25zdCBNQVhfU0hPV04gPSAzO1xuICAgIGxldCBieVBhcnQ6IHN0cmluZztcblxuICAgIGlmICh1bmlxdWVOYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGJ5UGFydCA9ICcnO1xuICAgIH0gZWxzZSBpZiAodW5pcXVlTmFtZXMubGVuZ3RoIDw9IE1BWF9TSE9XTikge1xuICAgICAgaWYgKHVuaXF1ZU5hbWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBieVBhcnQgPSBgIGJ5ICR7dW5pcXVlTmFtZXNbMF19YDtcbiAgICAgIH0gZWxzZSBpZiAodW5pcXVlTmFtZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGJ5UGFydCA9IGAgYnkgJHt1bmlxdWVOYW1lc1swXX0gYW5kICR7dW5pcXVlTmFtZXNbMV19YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ5UGFydCA9IGAgYnkgJHt1bmlxdWVOYW1lcy5zbGljZSgwLCAtMSkuam9pbignLCAnKX0sIGFuZCAke3VuaXF1ZU5hbWVzW3VuaXF1ZU5hbWVzLmxlbmd0aCAtIDFdfWA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNob3duID0gdW5pcXVlTmFtZXMuc2xpY2UoMCwgTUFYX1NIT1dOKTtcbiAgICAgIGNvbnN0IHJlbWFpbmluZyA9IHVuaXF1ZU5hbWVzLmxlbmd0aCAtIE1BWF9TSE9XTjtcbiAgICAgIGJ5UGFydCA9IGAgYnkgJHtzaG93bi5qb2luKCcsICcpfSwgYW5kICR7cmVtYWluaW5nfSBtb3JlYDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7Y291bnR9IGNvbW1lbnQke2NvdW50ID09PSAxID8gJycgOiAncyd9JHtieVBhcnR9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW9yZ2FuaXplIGZsYXQgY29tbWVudCBlbGVtZW50cyBpbnRvIGEgbmVzdGVkIHN0cnVjdHVyZS5cbiAgICogQ29tbWVudHMgd2l0aCBkYXRhLXBhcmVudC1pZCBnZXQgbW92ZWQgaW50byBhIC50aHJlYWRzLXJlcGxpZXMgY29udGFpbmVyXG4gICAqIGFmdGVyIHRoZWlyIHBhcmVudCBjb21tZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBuZXN0UmVwbGllcyh0aHJlYWRFbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjb21tZW50cyA9IEFycmF5LmZyb20odGhyZWFkRWwucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oJy50aHJlYWRzLWNvbW1lbnQnKSk7XG4gICAgLy8gQnVpbGQgYSBtYXAgb2YgY29tbWVudCBJRCBcdTIxOTIgZWxlbWVudFxuICAgIGNvbnN0IGNvbW1lbnRNYXAgPSBuZXcgTWFwPHN0cmluZywgSFRNTEVsZW1lbnQ+KCk7XG4gICAgZm9yIChjb25zdCBjIG9mIGNvbW1lbnRzKSB7XG4gICAgICBjb25zdCBpZCA9IGMuZGF0YXNldC5jb21tZW50SWQ7XG4gICAgICBpZiAoaWQpIGNvbW1lbnRNYXAuc2V0KGlkLCBjKTtcbiAgICB9XG5cbiAgICAvLyBNb3ZlIHJlcGxpZXMgdW5kZXIgdGhlaXIgcGFyZW50c1xuICAgIGZvciAoY29uc3QgY29tbWVudEVsIG9mIGNvbW1lbnRzKSB7XG4gICAgICBjb25zdCBwYXJlbnRJZCA9IGNvbW1lbnRFbC5kYXRhc2V0LnBhcmVudElkO1xuICAgICAgaWYgKCFwYXJlbnRJZCkgY29udGludWU7XG5cbiAgICAgIGNvbnN0IHBhcmVudEVsID0gY29tbWVudE1hcC5nZXQocGFyZW50SWQpO1xuICAgICAgaWYgKCFwYXJlbnRFbCkgY29udGludWU7XG5cbiAgICAgIC8vIEVuc3VyZSB0aGUgcGFyZW50IGhhcyBhIHJlcGxpZXMgY29udGFpbmVyXG4gICAgICBsZXQgcmVwbGllc0NvbnRhaW5lciA9IHBhcmVudEVsLnF1ZXJ5U2VsZWN0b3IoJy50aHJlYWRzLXJlcGxpZXMnKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGlmICghcmVwbGllc0NvbnRhaW5lcikge1xuICAgICAgICByZXBsaWVzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJlcGxpZXNDb250YWluZXIuY2xhc3NOYW1lID0gJ3RocmVhZHMtcmVwbGllcyc7XG4gICAgICAgIHBhcmVudEVsLmFwcGVuZENoaWxkKHJlcGxpZXNDb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICBjb21tZW50RWwuY2xhc3NMaXN0LmFkZCgndGhyZWFkcy1jb21tZW50LS1yZXBseScpO1xuICAgICAgcmVwbGllc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjb21tZW50RWwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIGFuIGlubGluZSBlZGl0b3IgZm9yIHJlcGx5aW5nIHRvIGEgY29tbWVudCBvciBhZGRpbmcgYSBuZXcgdG9wLWxldmVsIGNvbW1lbnQuXG4gICAqIEBwYXJhbSBwYXJlbnRDb21tZW50SWQgLSBudWxsIGZvciB0b3AtbGV2ZWwgY29tbWVudCwgb3IgY29tbWVudCBJRCB0byByZXBseSB0b1xuICAgKi9cbiAgcHJpdmF0ZSBvcGVuUmVwbHlFZGl0b3IodGhyZWFkRWw6IEhUTUxFbGVtZW50LCB0aHJlYWRJZDogc3RyaW5nLCBwYXJlbnRDb21tZW50SWQ6IHN0cmluZyB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZUlubGluZUVkaXRvcigpO1xuXG4gICAgY29uc3QgZWRpdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhyZWFkcy1pbmxpbmUtZWRpdG9yJykgYXMgYW55O1xuICAgIGVkaXRvci5xdW90ZSA9ICcnO1xuXG4gICAgZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2lubGluZS1zdWJtaXQnLCBhc3luYyAoZTogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGlkZW50aXR5ID0gZ2V0SWRlbnRpdHlQYXlsb2FkKCk7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBhcGkuYWRkQ29tbWVudCh0aHJlYWRJZCwge1xuICAgICAgICAgIC4uLmlkZW50aXR5LFxuICAgICAgICAgIGJvZHk6IGUuZGV0YWlsLmJvZHksXG4gICAgICAgICAgcGFyZW50SWQ6IHBhcmVudENvbW1lbnRJZCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVtb3ZlSW5saW5lRWRpdG9yKCk7XG4gICAgICAgIGlmICh0eXBlb2YgZG9jbWQgIT09ICd1bmRlZmluZWQnICYmIGRvY21kLnNjaGVkdWxlUmVsb2FkKSB7XG4gICAgICAgICAgZG9jbWQuc2NoZWR1bGVSZWxvYWQoJ3RocmVhZHMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRUaHJlYWRzKCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbdGhyZWFkc10gRmFpbGVkIHRvIGFkZCBjb21tZW50OicsIGVycik7XG4gICAgICAgIGVkaXRvci5zdWJtaXR0aW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBlZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcignaW5saW5lLWNhbmNlbCcsICgpID0+IHRoaXMucmVtb3ZlSW5saW5lRWRpdG9yKCkpO1xuXG4gICAgaWYgKHBhcmVudENvbW1lbnRJZCkge1xuICAgICAgLy8gSW5zZXJ0IGVkaXRvciBhZnRlciB0aGUgc3BlY2lmaWMgY29tbWVudCAob3IgaXRzIHJlcGxpZXMgY29udGFpbmVyKVxuICAgICAgY29uc3QgcGFyZW50Q29tbWVudCA9IHRocmVhZEVsLnF1ZXJ5U2VsZWN0b3IoYC50aHJlYWRzLWNvbW1lbnRbZGF0YS1jb21tZW50LWlkPVwiJHtwYXJlbnRDb21tZW50SWR9XCJdYCk7XG4gICAgICBpZiAocGFyZW50Q29tbWVudCkge1xuICAgICAgICBjb25zdCByZXBsaWVzQ29udGFpbmVyID0gcGFyZW50Q29tbWVudC5xdWVyeVNlbGVjdG9yKCcudGhyZWFkcy1yZXBsaWVzJyk7XG4gICAgICAgIGlmIChyZXBsaWVzQ29udGFpbmVyKSB7XG4gICAgICAgICAgcmVwbGllc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmVudENvbW1lbnQuYXBwZW5kQ2hpbGQoZWRpdG9yKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyZWFkRWwuYXBwZW5kQ2hpbGQoZWRpdG9yKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVG9wLWxldmVsOiBpbnNlcnQgYmVmb3JlIHRoZSBmb290ZXJcbiAgICAgIGNvbnN0IGZvb3RlciA9IHRocmVhZEVsLnF1ZXJ5U2VsZWN0b3IoJy50aHJlYWRzLXRocmVhZF9fZm9vdGVyJyk7XG4gICAgICBpZiAoZm9vdGVyKSB7XG4gICAgICAgIHRocmVhZEVsLmluc2VydEJlZm9yZShlZGl0b3IsIGZvb3Rlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJlYWRFbC5hcHBlbmRDaGlsZChlZGl0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmlubGluZUVkaXRvckVsID0gZWRpdG9yO1xuICB9XG5cbiAgLy8gXHUyNTAwXHUyNTAwXHUyNTAwIEF1dGhvciByZXNvbHV0aW9uIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4gIC8qKlxuICAgKiBMb29rIHVwIGF1dGhvciBpbmZvIGJ5IGtleSBvciBkaXNwbGF5IG5hbWUuXG4gICAqIFRyaWVzIGRpcmVjdCBrZXkgbWF0Y2ggZmlyc3QsIHRoZW4gc2NhbnMgYnkgZGlzcGxheSBuYW1lIGZvciBsZWdhY3kgY29tbWVudHMuXG4gICAqL1xuICBwcml2YXRlIHJlc29sdmVBdXRob3IoYXV0aG9yVmFsOiBzdHJpbmcpOiB7IG5hbWU6IHN0cmluZzsgYXZhdGFyVXJsOiBzdHJpbmcgfSB8IG51bGwge1xuICAgIC8vIERpcmVjdCBrZXkgbWF0Y2hcbiAgICBpZiAodGhpcy5hdXRob3JzTWFwW2F1dGhvclZhbF0pIHJldHVybiB0aGlzLmF1dGhvcnNNYXBbYXV0aG9yVmFsXTtcblxuICAgIC8vIEZhbGxiYWNrOiBtYXRjaCBieSBkaXNwbGF5IG5hbWUgKGxlZ2FjeSBjb21tZW50cyBzdG9yZSBmdWxsIG5hbWUpXG4gICAgZm9yIChjb25zdCBpbmZvIG9mIE9iamVjdC52YWx1ZXModGhpcy5hdXRob3JzTWFwKSkge1xuICAgICAgaWYgKGluZm8ubmFtZSA9PT0gYXV0aG9yVmFsKSByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjazogbWF0Y2ggYnkgZmlyc3QgbmFtZSAoY29tbWVudHMgbWF5IG9ubHkgc2hvdyBmaXJzdCBuYW1lKVxuICAgIGZvciAoY29uc3QgaW5mbyBvZiBPYmplY3QudmFsdWVzKHRoaXMuYXV0aG9yc01hcCkpIHtcbiAgICAgIGlmIChpbmZvLm5hbWUuc3BsaXQoL1xccysvKVswXSA9PT0gYXV0aG9yVmFsKSByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFx1MjUwMFx1MjUwMFx1MjUwMCBJbmxpbmUgZWRpdG9yIGhlbHBlcnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG5cbiAgcHJpdmF0ZSByZW1vdmVJbmxpbmVFZGl0b3IoKTogdm9pZCB7XG4gICAgdGhpcy5pbmxpbmVFZGl0b3JFbD8ucmVtb3ZlKCk7XG4gICAgdGhpcy5pbmxpbmVFZGl0b3JFbCA9IG51bGw7XG4gIH1cblxuICAvLyBcdTI1MDBcdTI1MDBcdTI1MDAgRGVsZXRlIGNvbmZpcm1hdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuICBwcml2YXRlIGhhbmRsZURlbGV0ZVJlcXVlc3QoZTogQ3VzdG9tRXZlbnQsIHR5cGU6ICd0aHJlYWQnIHwgJ2NvbW1lbnQnKTogdm9pZCB7XG4gICAgY29uc3QgaWQgPSB0eXBlID09PSAndGhyZWFkJyA/IGUuZGV0YWlsLnRocmVhZElkIDogZS5kZXRhaWwuY29tbWVudElkO1xuICAgIGNvbnN0IHRocmVhZElkID0gdHlwZSA9PT0gJ2NvbW1lbnQnID8gZS5kZXRhaWwudGhyZWFkSWQgOiB1bmRlZmluZWQ7XG4gICAgdGhpcy5kZWxldGVUYXJnZXQgPSB7IHR5cGUsIGlkLCB0aHJlYWRJZCB9O1xuICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudCAmIHsgb3BlbjogYm9vbGVhbiB9PignI2RlbGV0ZS1kaWFsb2cnKTtcbiAgICBpZiAoZGlhbG9nKSBkaWFsb2cub3BlbiA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNvbmZpcm1EZWxldGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZGlhbG9nID0gdGhpcy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50ICYgeyBvcGVuOiBib29sZWFuIH0+KCcjZGVsZXRlLWRpYWxvZycpO1xuICAgIGlmIChkaWFsb2cpIGRpYWxvZy5vcGVuID0gZmFsc2U7XG5cbiAgICBpZiAoIXRoaXMuZGVsZXRlVGFyZ2V0KSByZXR1cm47XG4gICAgaWYgKHRoaXMuZGVsZXRlVGFyZ2V0LnR5cGUgPT09ICd0aHJlYWQnKSB7XG4gICAgICBhd2FpdCBhcGkuZGVsZXRlVGhyZWFkKHRoaXMuZGVsZXRlVGFyZ2V0LmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgYXBpLmRlbGV0ZUNvbW1lbnQodGhpcy5kZWxldGVUYXJnZXQudGhyZWFkSWQhLCB0aGlzLmRlbGV0ZVRhcmdldC5pZCk7XG4gICAgfVxuICAgIHRoaXMuZGVsZXRlVGFyZ2V0ID0gbnVsbDtcbiAgICBpZiAodHlwZW9mIGRvY21kICE9PSAndW5kZWZpbmVkJyAmJiBkb2NtZC5zY2hlZHVsZVJlbG9hZCkge1xuICAgICAgZG9jbWQuc2NoZWR1bGVSZWxvYWQoJ3RocmVhZHMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5sb2FkVGhyZWFkcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FuY2VsRGVsZXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudCAmIHsgb3BlbjogYm9vbGVhbiB9PignI2RlbGV0ZS1kaWFsb2cnKTtcbiAgICBpZiAoZGlhbG9nKSBkaWFsb2cub3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuZGVsZXRlVGFyZ2V0ID0gbnVsbDtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlbmRlcigpIHtcbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDx0aHJlYWRzLXBvcG92ZXJcbiAgICAgICAgP2FjdGl2ZT0ke3RoaXMucG9wb3ZlckFjdGl2ZX1cbiAgICAgICAgLng9JHt0aGlzLnBvcG92ZXJYfVxuICAgICAgICAueT0ke3RoaXMucG9wb3Zlcll9XG4gICAgICAgIEBhZGQtY29tbWVudD0ke3RoaXMuaGFuZGxlQWRkQ29tbWVudH1cbiAgICAgID48L3RocmVhZHMtcG9wb3Zlcj5cblxuICAgICAgPHdhLWRpYWxvZyBpZD1cImRlbGV0ZS1kaWFsb2dcIiBsYWJlbD1cIkNvbmZpcm0gRGVsZXRlXCIgbGlnaHQtZGlzbWlzcz5cbiAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzICR7dGhpcy5kZWxldGVUYXJnZXQ/LnR5cGUgPz8gJ2l0ZW0nfT9cbiAgICAgICAgPHdhLWJ1dHRvbiBzbG90PVwiZm9vdGVyXCIgYXBwZWFyYW5jZT1cIm91dGxpbmVkXCIgQGNsaWNrPSR7dGhpcy5jYW5jZWxEZWxldGV9PkNhbmNlbDwvd2EtYnV0dG9uPlxuICAgICAgICA8d2EtYnV0dG9uIHNsb3Q9XCJmb290ZXJcIiB2YXJpYW50PVwiZGFuZ2VyXCIgQGNsaWNrPSR7dGhpcy5jb25maXJtRGVsZXRlfT5EZWxldGU8L3dhLWJ1dHRvbj5cbiAgICAgIDwvd2EtZGlhbG9nPlxuICAgIGA7XG4gIH1cbn1cbiIsICJpbXBvcnQgJ0Bhd2Vzb21lLm1lL3dlYmF3ZXNvbWUvZGlzdC9zdHlsZXMvdGhlbWVzL2RlZmF1bHQuY3NzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL3RocmVhZHMtYXBwLnRzJztcblxuZnVuY3Rpb24gaW5pdCgpOiB2b2lkIHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RocmVhZHMtYXBwJykpIHJldHVybjtcbiAgY29uc3QgYXBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhyZWFkcy1hcHAnKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhcHApO1xufVxuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0KTtcbn0gZWxzZSB7XG4gIGluaXQoKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7OztBQU1BLElBR01BLElBQVNDO0FBSGYsSUFRYUMsSUFDWEYsRUFBT0csZUFBQUEsV0FDTkgsRUFBT0ksWUFBMEJKLEVBQU9JLFNBQVNDLGlCQUNsRCx3QkFBd0JDLFNBQVNDLGFBQ2pDLGFBQWFDLGNBQWNEO0FBWjdC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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBMUIsSUFBSSxVQUFVO0FBdUJkLFNBQVMsV0FBVyxNQUFNO0FBQ3hCLFlBQVU7QUFDWjtBQUNBLFNBQVMsYUFBYTtBQUNwQixNQUFJLENBQUMsU0FBUztBQUNaLFVBQU0sS0FBSyxTQUFTLGNBQWMsb0JBQW9CO0FBQ3RELFFBQUksSUFBSTtBQUNOLGlCQUFXLEdBQUcsYUFBYSxrQkFBa0IsS0FBSyxFQUFFO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0EsU0FBTztBQUNUOzs7QUNoQ0EsSUFBSSxhQUFhO0FBQ2pCLFNBQVMsV0FBVyxNQUFNLFFBQVEsU0FBUztBQUN6QyxRQUFNQyxXQUFVLFdBQVc7QUFDM0IsUUFBTSxRQUFRQSxTQUFRLFNBQVM7QUFDL0IsTUFBSSxTQUFTO0FBQ2IsTUFBSSxXQUFXLFVBQVU7QUFDdkIsYUFBUztBQUFBLEVBQ1g7QUFDQSxNQUFJLFdBQVcsUUFBUTtBQUNyQixhQUFTO0FBQUEsRUFDWDtBQUNBLE1BQUksV0FBVyxZQUFZO0FBQ3pCLGFBQVM7QUFBQSxFQUNYO0FBQ0EsTUFBSSxXQUFXLFNBQVM7QUFDdEIsYUFBUztBQUNULFFBQUksWUFBWSxjQUFlLFVBQVM7QUFDeEMsUUFBSSxZQUFZLGVBQWdCLFVBQVM7QUFBQSxFQUMzQztBQUNBLE1BQUksV0FBVyxhQUFhO0FBQzFCLGFBQVM7QUFBQSxFQUNYO0FBQ0EsTUFBSSxXQUFXLGNBQWM7QUFDM0IsYUFBUztBQUFBLEVBQ1g7QUFDQSxNQUFJLFdBQVcsVUFBVTtBQUN2QixRQUFJLFlBQVksUUFBUyxVQUFTO0FBQ2xDLFFBQUksWUFBWSxZQUFhLFVBQVM7QUFBQSxFQUN4QztBQUNBLE1BQUksV0FBVyxjQUFjO0FBQzNCLGFBQVM7QUFBQSxFQUNYO0FBQ0EsTUFBSSxXQUFXLFFBQVE7QUFDckIsUUFBSSxZQUFZLFdBQVcsWUFBWSxVQUFXLFVBQVM7QUFDM0QsUUFBSSxZQUFZLGdCQUFpQixVQUFTO0FBQUEsRUFDNUM7QUFDQSxNQUFJLFdBQVcsY0FBYztBQUMzQixhQUFTO0FBQUEsRUFDWDtBQUNBLE1BQUksV0FBVyxjQUFjO0FBQzNCLGFBQVM7QUFBQSxFQUNYO0FBQ0EsTUFBSSxXQUFXLFdBQVc7QUFDeEIsYUFBUztBQUFBLEVBQ1g7QUFDQSxNQUFJLFdBQVcsZUFBZTtBQUM1QixhQUFTO0FBQUEsRUFDWDtBQUNBLE1BQUksV0FBVyxnQkFBZ0I7QUFDN0IsYUFBUztBQUFBLEVBQ1g7QUFDQSxNQUFJLFdBQVcsY0FBYztBQUMzQixhQUFTO0FBQUEsRUFDWDtBQUNBLE1BQUksV0FBVyxXQUFXO0FBQ3hCLFFBQUksWUFBWSxPQUFRLFVBQVM7QUFDakMsUUFBSSxZQUFZLFFBQVMsVUFBUztBQUNsQyxRQUFJLFlBQVksVUFBVyxVQUFTO0FBQ3BDLFFBQUksWUFBWSxRQUFTLFVBQVM7QUFBQSxFQUNwQztBQUNBLE1BQUksV0FBVyxXQUFXO0FBQ3hCLFFBQUksWUFBWSxPQUFRLFVBQVM7QUFDakMsUUFBSSxZQUFZLFFBQVMsVUFBUztBQUNsQyxRQUFJLFlBQVksVUFBVyxVQUFTO0FBQ3BDLFFBQUksWUFBWSxRQUFTLFVBQVM7QUFBQSxFQUNwQztBQUNBLE1BQUksV0FBVyxTQUFTO0FBQ3RCLFFBQUksWUFBWSxPQUFRLFVBQVM7QUFDakMsUUFBSSxZQUFZLFFBQVMsVUFBUztBQUNsQyxRQUFJLFlBQVksVUFBVyxVQUFTO0FBQ3BDLFFBQUksWUFBWSxRQUFTLFVBQVM7QUFBQSxFQUNwQztBQUNBLE1BQUksV0FBVyxpQkFBaUI7QUFDOUIsUUFBSSxZQUFZLE9BQVEsVUFBUztBQUNqQyxRQUFJLFlBQVksUUFBUyxVQUFTO0FBQ2xDLFFBQUksWUFBWSxVQUFXLFVBQVM7QUFDcEMsUUFBSSxZQUFZLFFBQVMsVUFBUztBQUFBLEVBQ3BDO0FBQ0EsTUFBSSxXQUFXLFVBQVU7QUFDdkIsYUFBUztBQUFBLEVBQ1g7QUFDQSxTQUFPLFFBQVEsMENBQTBDLFVBQVUsU0FBUyxNQUFNLElBQUksSUFBSSxjQUFjLG1CQUFtQkEsUUFBTyxDQUFDLEtBQUssMENBQTBDLFVBQVUsU0FBUyxNQUFNLElBQUksSUFBSTtBQUNyTjtBQUNBLElBQUksVUFBVTtBQUFBLEVBQ1osTUFBTTtBQUFBLEVBQ04sVUFBVSxDQUFDLE1BQU0sU0FBUyxXQUFXLFVBQVUsWUFBWTtBQUN6RCxXQUFPLFdBQVcsTUFBTSxRQUFRLE9BQU87QUFBQSxFQUN6QztBQUFBLEVBQ0EsU0FBUyxDQUFDLEtBQUssV0FBVztBQUN4QixRQUFJLFFBQVEsVUFBVSxDQUFDLElBQUksYUFBYSwwQkFBMEIsR0FBRztBQUNuRSxZQUFNLEVBQUUsUUFBUSxRQUFRLElBQUk7QUFDNUI7QUFBQTtBQUFBLFFBRUUsV0FBVztBQUFBLFFBQ1gsV0FBVztBQUFBLFFBQ1gsV0FBVztBQUFBLFFBQ1gsV0FBVyxZQUFZLFlBQVk7QUFBQSxRQUNuQyxXQUFXO0FBQUEsUUFDWCxXQUFXLFdBQVcsWUFBWTtBQUFBLFFBQ2xDLFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxRQUNYO0FBQ0EsY0FBTSxRQUFRLENBQUMsR0FBRyxJQUFJLGlCQUFpQixNQUFNLENBQUM7QUFDOUMsY0FBTSxjQUFjLE1BQU0sS0FBSyxDQUFDQyxPQUFNLENBQUNBLEdBQUUsYUFBYSxTQUFTLENBQUM7QUFDaEUsY0FBTSxnQkFBZ0IsTUFBTSxLQUFLLENBQUNBLE9BQU1BLEdBQUUsYUFBYSxTQUFTLENBQUM7QUFDakUsWUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFlO0FBQ3BDLG9CQUFZLGFBQWEsd0JBQXdCLEVBQUU7QUFDbkQsc0JBQWMsYUFBYSwwQkFBMEIsRUFBRTtBQUN2RCxZQUFJLE9BQU8sZUFBZSxlQUFlLGVBQWU7QUFDdEQsZ0JBQU0sa0JBQWtCLGNBQWMsYUFBYSxTQUFTLEtBQUs7QUFDakUsc0JBQVksTUFBTSxZQUFZLGtCQUFrQixlQUFlO0FBQy9ELHdCQUFjLE1BQU0sWUFBWSxrQkFBa0IsR0FBRztBQUFBLFFBQ3ZEO0FBQ0EsWUFBSSxhQUFhLDRCQUE0QixFQUFFO0FBQUEsTUFDakQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBQ0EsSUFBSSwwQkFBMEI7OztBQ3pIOUIsU0FBUyxRQUFRLEtBQUs7QUFDcEIsU0FBTyxzQkFBc0IsbUJBQW1CLEdBQUcsQ0FBQztBQUN0RDtBQUNBLElBQUksUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSVYsT0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsZ0JBQWdCO0FBQUEsSUFDaEIsZ0JBQWdCO0FBQUEsSUFDaEIsaUJBQWlCO0FBQUEsSUFDakIsUUFBUTtBQUFBLElBQ1IsWUFBWTtBQUFBLElBQ1osTUFBTTtBQUFBLElBQ04sY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsY0FBYztBQUFBLElBQ2QsY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLElBQ1osbUJBQW1CO0FBQUEsSUFDbkIsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLElBQ2YsaUJBQWlCO0FBQUEsSUFDakIsZUFBZTtBQUFBLElBQ2YsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlBLFNBQVM7QUFBQSxJQUNQLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxJQUNMLGFBQWE7QUFBQSxJQUNiLE1BQU07QUFBQSxFQUNSO0FBQ0Y7QUFDQSxJQUFJLGdCQUFnQjtBQUFBLEVBQ2xCLE1BQU07QUFBQSxFQUNOLFVBQVUsQ0FBQyxNQUFNLFVBQVUsV0FBVyxVQUFVLFlBQVk7QUFDMUQsUUFBSSxhQUFhLE1BQU0sT0FBTztBQUM5QixRQUFJLE1BQU0sV0FBVyxJQUFJLEtBQUssTUFBTSxRQUFRLElBQUksS0FBSyxNQUFNLFFBQVEsaUJBQWlCO0FBQ3BGLFFBQUksS0FBSztBQUNQLGFBQU8sUUFBUSxHQUFHO0FBQUEsSUFDcEI7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBQ0EsSUFBSSx5QkFBeUI7OztBQ3BEN0IsSUFBSSxvQkFBb0I7QUFDeEIsSUFBSSxXQUFXLENBQUMseUJBQXlCLHNCQUFzQjtBQUMvRCxJQUFJLGVBQWUsQ0FBQztBQUNwQixTQUFTLFVBQVUsTUFBTTtBQUN2QixlQUFhLEtBQUssSUFBSTtBQUN4QjtBQUNBLFNBQVMsWUFBWSxNQUFNO0FBQ3pCLGlCQUFlLGFBQWEsT0FBTyxDQUFDLE9BQU8sT0FBTyxJQUFJO0FBQ3hEO0FBQ0EsU0FBUyxlQUFlLE1BQU07QUFDNUIsU0FBTyxTQUFTLEtBQUssQ0FBQyxRQUFRLElBQUksU0FBUyxJQUFJO0FBQ2pEO0FBc0JBLFNBQVMsdUJBQXVCO0FBQzlCLFNBQU87QUFDVDs7O0FDdEJBLElBQUEsRUFBT0MsR0FBWUMsR0FBQUEsSUFBYUM7QUFBaEMsSUF5Q2FDLEtBQXFDLENBQ2hEQyxJQUNBQyxPQUFBQSxXQUVBQSxLQUFBQSxXQUVLRCxJQUFpRCxhQUNqREEsSUFBaUQsZUFBTUM7QUFoRDlELElBaUZhQyxLQUFzQkMsQ0FBQUEsT0FBQUEsV0FDaENBLEdBQTJCQztBQWxGOUIsSUFvTE1DLEtBQWMsQ0FBQTtBQXBMcEIsSUFpTWFDLEtBQW9CLENBQUNDLElBQVlDLEtBQWlCSCxPQUM1REUsR0FBS0UsT0FBbUJEOzs7QUMxTDNCLElBQUksa0JBQWtCLHVCQUFPO0FBQzdCLElBQUksa0JBQWtCLHVCQUFPO0FBQzdCLElBQUk7QUFDSixJQUFJLFlBQTRCLG9CQUFJLElBQUk7QUFDeEMsSUFBSSxTQUFTLGNBQWMsa0JBQWtCO0FBQUEsRUFDM0MsY0FBYztBQUNaLFVBQU0sR0FBRyxTQUFTO0FBQ2xCLFNBQUssTUFBTTtBQUNYLFNBQUssWUFBWTtBQUNqQixTQUFLLGNBQWM7QUFDbkIsU0FBSyxRQUFRO0FBQ2IsU0FBSyxVQUFVO0FBQ2YsU0FBSyxTQUFTO0FBRWQsU0FBSyxjQUFjLE9BQU8sS0FBS0UsYUFBWTtBQUN6QyxVQUFJO0FBQ0osVUFBSUEsVUFBUyxhQUFhO0FBQ3hCLFlBQUksQ0FBQyxLQUFLLFlBQVk7QUFDcEIsZ0JBQU0sS0FBSztBQUFBLFFBQ2I7QUFDQSxhQUFLLE1BQU1DO0FBQUEsZ0NBQ2EsR0FBRztBQUFBO0FBRTNCLGNBQU0sS0FBSztBQUNYLGNBQU0sTUFBTSxLQUFLLFdBQVcsY0FBYyxjQUFjO0FBQ3hELFlBQUksT0FBT0QsU0FBUSxZQUFZLFlBQVk7QUFDekMsVUFBQUEsU0FBUSxRQUFRLEtBQUssSUFBSTtBQUFBLFFBQzNCO0FBQ0EsZUFBTyxLQUFLO0FBQUEsTUFDZDtBQUNBLFVBQUk7QUFDRixtQkFBVyxNQUFNLE1BQU0sS0FBSyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzVDLFlBQUksQ0FBQyxTQUFTLEdBQUksUUFBTyxTQUFTLFdBQVcsTUFBTSxrQkFBa0I7QUFBQSxNQUN2RSxRQUFRO0FBQ04sZUFBTztBQUFBLE1BQ1Q7QUFDQSxVQUFJO0FBQ0YsY0FBTSxNQUFNLFNBQVMsY0FBYyxLQUFLO0FBQ3hDLFlBQUksWUFBWSxNQUFNLFNBQVMsS0FBSztBQUNwQyxjQUFNLE1BQU0sSUFBSTtBQUNoQixZQUFJLEtBQUssU0FBUyxZQUFZLE1BQU0sTUFBTyxRQUFPO0FBQ2xELFlBQUksQ0FBQyxPQUFRLFVBQVMsSUFBSSxVQUFVO0FBQ3BDLGNBQU0sTUFBTSxPQUFPLGdCQUFnQixJQUFJLFdBQVcsV0FBVztBQUM3RCxjQUFNLFFBQVEsSUFBSSxLQUFLLGNBQWMsS0FBSztBQUMxQyxZQUFJLENBQUMsTUFBTyxRQUFPO0FBQ25CLGNBQU0sS0FBSyxJQUFJLEtBQUs7QUFDcEIsZUFBTyxTQUFTLFVBQVUsS0FBSztBQUFBLE1BQ2pDLFFBQVE7QUFDTixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxvQkFBb0I7QUFDbEIsVUFBTSxrQkFBa0I7QUFDeEIsY0FBVSxJQUFJO0FBQUEsRUFDaEI7QUFBQSxFQUNBLGFBQWEsbUJBQW1CO0FBQzlCLFVBQU0sYUFBYSxpQkFBaUI7QUFDcEMsUUFBSSxLQUFLLGFBQWEsUUFBUSxHQUFHO0FBQy9CLFdBQUssTUFBTSxZQUFZLGtCQUFrQixHQUFHLEtBQUssTUFBTSxLQUFLO0FBQUEsSUFDOUQ7QUFDQSxTQUFLLFFBQVE7QUFBQSxFQUNmO0FBQUEsRUFDQSx1QkFBdUI7QUFDckIsVUFBTSxxQkFBcUI7QUFDM0IsZ0JBQVksSUFBSTtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxnQkFBZ0I7QUFDZCxVQUFNQSxXQUFVLGVBQWUsS0FBSyxPQUFPO0FBQzNDLFVBQU0sU0FBUyxLQUFLLFVBQVUscUJBQXFCO0FBQ25ELFFBQUksS0FBSyxRQUFRQSxVQUFTO0FBQ3hCLGFBQU87QUFBQSxRQUNMLEtBQUtBLFNBQVEsU0FBUyxLQUFLLE1BQU0sUUFBUSxLQUFLLFNBQVMsS0FBSyxTQUFTO0FBQUEsUUFDckUsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxJQUNGO0FBQ0EsV0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLO0FBQUEsTUFDVixhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLG9CQUFvQjtBQUNsQixVQUFNLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxLQUFLLE1BQU0sU0FBUztBQUN2RSxRQUFJLFVBQVU7QUFDWixXQUFLLGFBQWEsUUFBUSxLQUFLO0FBQy9CLFdBQUssYUFBYSxjQUFjLEtBQUssS0FBSztBQUMxQyxXQUFLLGdCQUFnQixhQUFhO0FBQUEsSUFDcEMsT0FBTztBQUNMLFdBQUssZ0JBQWdCLE1BQU07QUFDM0IsV0FBSyxnQkFBZ0IsWUFBWTtBQUNqQyxXQUFLLGFBQWEsZUFBZSxNQUFNO0FBQUEsSUFDekM7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNLFVBQVU7QUFDZCxVQUFNLEVBQUUsS0FBSyxZQUFZLElBQUksS0FBSyxjQUFjO0FBQ2hELFVBQU1BLFdBQVUsY0FBYyxlQUFlLEtBQUssT0FBTyxJQUFJO0FBQzdELFFBQUksQ0FBQyxLQUFLO0FBQ1IsV0FBSyxNQUFNO0FBQ1g7QUFBQSxJQUNGO0FBQ0EsUUFBSSxlQUFlLFVBQVUsSUFBSSxHQUFHO0FBQ3BDLFFBQUksQ0FBQyxjQUFjO0FBQ2pCLHFCQUFlLEtBQUssWUFBWSxLQUFLQSxRQUFPO0FBQzVDLGdCQUFVLElBQUksS0FBSyxZQUFZO0FBQUEsSUFDakM7QUFDQSxVQUFNLE1BQU0sTUFBTTtBQUNsQixRQUFJLFFBQVEsaUJBQWlCO0FBQzNCLGdCQUFVLE9BQU8sR0FBRztBQUFBLElBQ3RCO0FBQ0EsUUFBSSxRQUFRLEtBQUssY0FBYyxFQUFFLEtBQUs7QUFDcEM7QUFBQSxJQUNGO0FBQ0EsUUFBSUUsR0FBaUIsR0FBRyxHQUFHO0FBQ3pCLFdBQUssTUFBTTtBQUNYO0FBQUEsSUFDRjtBQUNBLFlBQVEsS0FBSztBQUFBLE1BQ1gsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUNILGFBQUssTUFBTTtBQUNYLGFBQUssY0FBYyxJQUFJLGFBQWEsQ0FBQztBQUNyQztBQUFBLE1BQ0Y7QUFDRSxhQUFLLE1BQU0sSUFBSSxVQUFVLElBQUk7QUFDN0IsUUFBQUYsVUFBUyxVQUFVLEtBQUssS0FBSyxJQUFJO0FBQ2pDLGFBQUssY0FBYyxJQUFJLFlBQVksQ0FBQztBQUFBLElBQ3hDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUSxtQkFBbUI7QUFDekIsVUFBTSxRQUFRLGlCQUFpQjtBQUMvQixVQUFNQSxXQUFVLGVBQWUsS0FBSyxPQUFPO0FBQzNDLFFBQUksS0FBSyxhQUFhLFFBQVEsR0FBRztBQUMvQixXQUFLLE1BQU0sWUFBWSxrQkFBa0IsR0FBRyxLQUFLLE1BQU0sS0FBSztBQUFBLElBQzlEO0FBQ0EsVUFBTSxNQUFNLEtBQUssWUFBWSxjQUFjLEtBQUs7QUFDaEQsUUFBSSxLQUFLO0FBQ1AsTUFBQUEsVUFBUyxVQUFVLEtBQUssSUFBSTtBQUFBLElBQzlCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUNQLFFBQUksS0FBSyxZQUFZO0FBQ25CLGFBQU8sS0FBSztBQUFBLElBQ2Q7QUFDQSxXQUFPQztBQUFBLEVBQ1Q7QUFDRjtBQUNBLE9BQU8sTUFBTTtBQUNiRSxpQkFBZ0I7QUFBQSxFQUNkQyxHQUFNO0FBQ1IsR0FBRyxPQUFPLFdBQVcsT0FBTyxDQUFDO0FBQzdCRCxpQkFBZ0I7QUFBQSxFQUNkRSxHQUFTLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFDNUIsR0FBRyxPQUFPLFdBQVcsUUFBUSxDQUFDO0FBQzlCRixpQkFBZ0I7QUFBQSxFQUNkRSxHQUFTLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFDNUIsR0FBRyxPQUFPLFdBQVcsVUFBVSxDQUFDO0FBQ2hDRixpQkFBZ0I7QUFBQSxFQUNkRSxHQUFTLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFDNUIsR0FBRyxPQUFPLFdBQVcsV0FBVyxDQUFDO0FBQ2pDRixpQkFBZ0I7QUFBQSxFQUNkRSxHQUFTLEVBQUUsV0FBVyxjQUFjLE1BQU0sU0FBUyxTQUFTLEtBQUssQ0FBQztBQUNwRSxHQUFHLE9BQU8sV0FBVyxhQUFhLENBQUM7QUFDbkNGLGlCQUFnQjtBQUFBLEVBQ2RFLEdBQVMsRUFBRSxXQUFXLGdCQUFnQixNQUFNLFNBQVMsU0FBUyxLQUFLLENBQUM7QUFDdEUsR0FBRyxPQUFPLFdBQVcsZUFBZSxDQUFDO0FBQ3JDRixpQkFBZ0I7QUFBQSxFQUNkRSxHQUFTO0FBQ1gsR0FBRyxPQUFPLFdBQVcsT0FBTyxDQUFDO0FBQzdCRixpQkFBZ0I7QUFBQSxFQUNkRSxHQUFTO0FBQ1gsR0FBRyxPQUFPLFdBQVcsU0FBUyxDQUFDO0FBQy9CRixpQkFBZ0I7QUFBQSxFQUNkRSxHQUFTLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFDNUIsR0FBRyxPQUFPLFdBQVcsV0FBVyxDQUFDO0FBQ2pDRixpQkFBZ0I7QUFBQSxFQUNkRSxHQUFTLEVBQUUsTUFBTSxRQUFRLFNBQVMsS0FBSyxDQUFDO0FBQzFDLEdBQUcsT0FBTyxXQUFXLFVBQVUsQ0FBQztBQUNoQ0YsaUJBQWdCO0FBQUEsRUFDZEUsR0FBUyxFQUFFLE1BQU0sUUFBUSxTQUFTLEtBQUssQ0FBQztBQUMxQyxHQUFHLE9BQU8sV0FBVyxRQUFRLENBQUM7QUFDOUJGLGlCQUFnQjtBQUFBLEVBQ2RFLEdBQVMsRUFBRSxNQUFNLFFBQVEsU0FBUyxLQUFLLENBQUM7QUFDMUMsR0FBRyxPQUFPLFdBQVcsYUFBYSxDQUFDO0FBQ25DRixpQkFBZ0I7QUFBQSxFQUNkLE1BQU0sT0FBTztBQUNmLEdBQUcsT0FBTyxXQUFXLHFCQUFxQixDQUFDO0FBQzNDQSxpQkFBZ0I7QUFBQSxFQUNkLE1BQU0sQ0FBQyxVQUFVLFFBQVEsV0FBVyxXQUFXLE9BQU8sYUFBYSxhQUFhLEdBQUcsRUFBRSxzQkFBc0IsS0FBSyxDQUFDO0FBQ25ILEdBQUcsT0FBTyxXQUFXLFdBQVcsQ0FBQztBQUNqQyxTQUFTQSxpQkFBZ0I7QUFBQSxFQUN2QkcsR0FBYyxTQUFTO0FBQ3pCLEdBQUcsTUFBTTs7O0FDdE5GLElBQU0saUJBQU4sY0FBNkJDLEdBQVc7QUFBQSxFQUF4QztBQUFBO0FBdUJ3QixrQkFBUztBQUNWLGFBQUk7QUFDSixhQUFJO0FBQUE7QUFBQSxFQUV4QixhQUFtQjtBQUN6QixTQUFLLGNBQWMsSUFBSSxZQUFZLGVBQWU7QUFBQSxNQUNoRCxTQUFTO0FBQUEsTUFBTSxVQUFVO0FBQUEsSUFDM0IsQ0FBQyxDQUFDO0FBQUEsRUFDSjtBQUFBLEVBRVMsU0FBUztBQUNoQixRQUFJLENBQUMsS0FBSyxPQUFRLFFBQU9DO0FBRXpCLFdBQU9BO0FBQUE7QUFBQTtBQUFBLHNDQUcyQixLQUFLLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtBQUFBO0FBQUEsNERBRU4sS0FBSyxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTXpFO0FBQUEsRUFFQSxLQUFLQyxJQUFXQyxJQUFpQjtBQUMvQixTQUFLLElBQUlEO0FBQ1QsU0FBSyxJQUFJQztBQUNULFNBQUssU0FBUztBQUFBLEVBQ2hCO0FBQUEsRUFFQSxPQUFhO0FBQ1gsU0FBSyxTQUFTO0FBQUEsRUFDaEI7QUFDRjtBQTFEYSxlQUNLLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBc0JJO0FBQUEsRUFBNUJDLEdBQVMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUFBLEdBdkJoQixlQXVCa0I7QUFDRDtBQUFBLEVBQTNCQSxHQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFBQSxHQXhCZixlQXdCaUI7QUFDQTtBQUFBLEVBQTNCQSxHQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFBQSxHQXpCZixlQXlCaUI7QUF6QmpCLGlCQUFOO0FBQUEsRUFETkMsR0FBYyxpQkFBaUI7QUFBQSxHQUNuQjs7O0FDSGIsSUFBSSwwQkFBMEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQTlCLElBQUksOEJBQThCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztJQzRGckJDLEtBQWFDLEdBL0UxQixjQUErQkMsR0FBQUE7RUFDN0IsWUFBWUMsSUFBQUE7QUFFVixRQURBQyxNQUFNRCxFQUFBQSxHQUdGQSxHQUFTRSxTQUFTQyxHQUFTQyxZQUMzQkosR0FBU0UsU0FBU0MsR0FBU0UsYUFDM0JMLEdBQVNFLFNBQVNDLEdBQVNHLGtCQUc3QixPQUFVQyxNQUNSLGdFQUFBO0FBR0osUUFBQSxDQUFLQyxHQUFtQlIsRUFBQUEsRUFDdEIsT0FBVU8sTUFBTSxzREFBQTtFQUVwQjtFQUVBLE9BQU9FLElBQUFBO0FBQ0wsV0FBT0E7RUFDVDtFQUVTLE9BQU9DLElBQUFBLENBQXNCRCxFQUFBQSxHQUFBQTtBQUNwQyxRQUFJQSxPQUFVRSxLQUFZRixPQUFVRyxFQUNsQyxRQUFPSDtBQUVULFVBQU1JLEtBQVVILEdBQUtHLFNBQ2ZDLEtBQU9KLEdBQUtJO0FBRWxCLFFBQUlKLEdBQUtSLFNBQVNDLEdBQVNDLFVBQUFBO0FBRXpCLFVBQUlLLE9BQVdJLEdBQWdCQyxFQUFBQSxFQUM3QixRQUFPSDtJQUFBQSxXQUVBRCxHQUFLUixTQUFTQyxHQUFTRyxtQkFBQUE7QUFDaEMsVUFBQSxDQUFBLENBQU1HLE9BQVVJLEdBQVFFLGFBQWFELEVBQUFBLEVBQ25DLFFBQU9IO0lBQUFBLFdBRUFELEdBQUtSLFNBQVNDLEdBQVNFLGFBQzVCUSxHQUFRRyxhQUFhRixFQUFBQSxNQUFpQkwsS0FBUFEsR0FDakMsUUFBT047QUFNWCxXQURBTyxHQUFrQlIsRUFBQUEsR0FDWEQ7RUFDVDtBQUFBLENBQUE7OztBQ2pDRixJQUFJLGFBQWEsY0FBYyxnQ0FBZ0M7QUFBQSxFQUM3RCxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxzQkFBc0IsQ0FBQyxRQUFRLE9BQU87QUFDM0MsU0FBSyxvQkFBb0IsSUFBSSxrQkFBa0IsTUFBTSxRQUFRLE9BQU87QUFDcEUsU0FBSyxRQUFRO0FBQ2IsU0FBSyxPQUFPO0FBQ1osU0FBSyxTQUFTO0FBQ2QsU0FBSyxlQUFlLEtBQUssYUFBYSxPQUFPLEtBQUs7QUFDbEQsU0FBSyxPQUFPO0FBQ1osU0FBSyxhQUFhO0FBQ2xCLFNBQUssUUFBUTtBQUNiLFNBQUssT0FBTztBQUNaLFNBQUssY0FBYztBQUNuQixTQUFLLE9BQU87QUFDWixTQUFLLFNBQVM7QUFDZCxTQUFLLFdBQVc7QUFDaEIsU0FBSyxXQUFXO0FBQ2hCLFNBQUssV0FBVztBQUNoQixTQUFLLGFBQWE7QUFDbEIsU0FBSyxZQUFZO0FBQ2pCLFNBQUssV0FBVztBQUFBLEVBQ2xCO0FBQUEsRUFDQSxXQUFXLGFBQWE7QUFDdEIsV0FBTyxDQUFDLEdBQUcsTUFBTSxZQUFZLGdCQUFnQixDQUFDO0FBQUEsRUFDaEQ7QUFBQTtBQUFBLEVBRUEsSUFBSSxRQUFRO0FBQ1YsUUFBSSxLQUFLLGlCQUFpQjtBQUN4QixhQUFPLEtBQUs7QUFBQSxJQUNkO0FBQ0EsV0FBTyxLQUFLLFVBQVUsS0FBSztBQUFBLEVBQzdCO0FBQUEsRUFDQSxJQUFJLE1BQU0sS0FBSztBQUNiLFFBQUksS0FBSyxXQUFXLEtBQUs7QUFDdkI7QUFBQSxJQUNGO0FBQ0EsU0FBSyxrQkFBa0I7QUFDdkIsU0FBSyxTQUFTO0FBQUEsRUFDaEI7QUFBQSxFQUNBLG9CQUFvQjtBQUNsQixVQUFNLGtCQUFrQjtBQUN4QixTQUFLLGlCQUFpQixJQUFJLGVBQWUsTUFBTSxLQUFLLHNCQUFzQixDQUFDO0FBQzNFLFNBQUssZUFBZSxLQUFLLE1BQU07QUFDN0IsV0FBSyxzQkFBc0I7QUFDM0IsV0FBSyxlQUFlLFFBQVEsS0FBSyxLQUFLO0FBQ3RDLFVBQUksS0FBSyxVQUFVLEtBQUssU0FBUyxLQUFLLFVBQVUsS0FBSyxNQUFNLE9BQU87QUFDaEUsY0FBTSxRQUFRLEtBQUssTUFBTTtBQUN6QixhQUFLLFFBQVE7QUFBQSxNQUNmO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsdUJBQXVCO0FBQ3JCLFVBQU0scUJBQXFCO0FBQzNCLFFBQUksS0FBSyxPQUFPO0FBQ2QsV0FBSyxnQkFBZ0IsVUFBVSxLQUFLLEtBQUs7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLGFBQWE7QUFDWCxTQUFLLGNBQWM7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsYUFBYSxPQUFPO0FBQ2xCLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUssUUFBUSxLQUFLLE1BQU07QUFDeEIsU0FBSyxzQkFBc0I7QUFDM0IsU0FBSyxjQUFjO0FBQ25CLFNBQUssaUJBQWlCLE9BQU8sRUFBRSxTQUFTLE1BQU0sVUFBVSxLQUFLLENBQUM7QUFBQSxFQUNoRTtBQUFBLEVBQ0EsWUFBWSxPQUFPO0FBQ2pCLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUssUUFBUSxLQUFLLE1BQU07QUFDeEIsU0FBSyxpQkFBaUIsT0FBTyxFQUFFLFNBQVMsTUFBTSxVQUFVLEtBQUssQ0FBQztBQUFBLEVBQ2hFO0FBQUEsRUFDQSx3QkFBd0I7QUFDdEIsUUFBSSxLQUFLLFdBQVcsUUFBUTtBQUMxQixXQUFLLEtBQUssTUFBTSxRQUFRO0FBQ3hCLFdBQUssS0FBSyxNQUFNLFNBQVM7QUFDekI7QUFBQSxJQUNGO0FBQ0EsUUFBSSxLQUFLLFdBQVcsUUFBUTtBQUMxQixXQUFLLGFBQWEsTUFBTSxTQUFTLEdBQUcsS0FBSyxNQUFNLFlBQVk7QUFDM0QsV0FBSyxNQUFNLE1BQU0sU0FBUztBQUMxQixXQUFLLE1BQU0sTUFBTSxTQUFTLEdBQUcsS0FBSyxNQUFNLFlBQVk7QUFDcEQsV0FBSyxLQUFLLE1BQU0sUUFBUTtBQUN4QixXQUFLLEtBQUssTUFBTSxTQUFTO0FBQ3pCO0FBQUEsSUFDRjtBQUNBLFFBQUksS0FBSyxNQUFNLE1BQU0sT0FBTztBQUMxQixZQUFNLFFBQVEsT0FBTyxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO0FBQzlELFdBQUssS0FBSyxNQUFNLFFBQVEsR0FBRyxLQUFLO0FBQUEsSUFDbEM7QUFDQSxRQUFJLEtBQUssTUFBTSxNQUFNLFFBQVE7QUFDM0IsWUFBTSxTQUFTLE9BQU8sS0FBSyxNQUFNLE1BQU0sT0FBTyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtBQUNoRSxXQUFLLEtBQUssTUFBTSxTQUFTLEdBQUcsTUFBTTtBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsbUJBQW1CO0FBQ2pCLFNBQUssc0JBQXNCO0FBQUEsRUFDN0I7QUFBQSxFQUNBLE1BQU0sb0JBQW9CO0FBQ3hCLFVBQU0sS0FBSztBQUNYLFNBQUssY0FBYztBQUNuQixTQUFLLHNCQUFzQjtBQUFBLEVBQzdCO0FBQUEsRUFDQSxRQUFRLG1CQUFtQjtBQUN6QixRQUFJLGtCQUFrQixJQUFJLFFBQVEsR0FBRztBQUNuQyxXQUFLLHNCQUFzQjtBQUFBLElBQzdCO0FBQ0EsVUFBTSxRQUFRLGlCQUFpQjtBQUMvQixRQUFJLGtCQUFrQixJQUFJLE9BQU8sR0FBRztBQUNsQyxXQUFLLGFBQWEsSUFBSSxTQUFTLENBQUMsS0FBSyxLQUFLO0FBQUEsSUFDNUM7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLE1BQU0sU0FBUztBQUNiLFNBQUssTUFBTSxNQUFNLE9BQU87QUFBQSxFQUMxQjtBQUFBO0FBQUEsRUFFQSxPQUFPO0FBQ0wsU0FBSyxNQUFNLEtBQUs7QUFBQSxFQUNsQjtBQUFBO0FBQUEsRUFFQSxTQUFTO0FBQ1AsU0FBSyxNQUFNLE9BQU87QUFBQSxFQUNwQjtBQUFBO0FBQUEsRUFFQSxlQUFlLFVBQVU7QUFDdkIsUUFBSSxVQUFVO0FBQ1osVUFBSSxPQUFPLFNBQVMsUUFBUSxTQUFVLE1BQUssTUFBTSxZQUFZLFNBQVM7QUFDdEUsVUFBSSxPQUFPLFNBQVMsU0FBUyxTQUFVLE1BQUssTUFBTSxhQUFhLFNBQVM7QUFDeEUsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssTUFBTTtBQUFBLE1BQ2hCLE1BQU0sS0FBSyxNQUFNO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLGtCQUFrQixnQkFBZ0IsY0FBYyxxQkFBcUIsUUFBUTtBQUMzRSxTQUFLLE1BQU0sa0JBQWtCLGdCQUFnQixjQUFjLGtCQUFrQjtBQUFBLEVBQy9FO0FBQUE7QUFBQSxFQUVBLGFBQWEsYUFBYSxPQUFPLEtBQUssYUFBYSxZQUFZO0FBQzdELFVBQU0saUJBQWlCLFNBQVMsS0FBSyxNQUFNO0FBQzNDLFVBQU0sZUFBZSxPQUFPLEtBQUssTUFBTTtBQUN2QyxTQUFLLE1BQU0sYUFBYSxhQUFhLGdCQUFnQixjQUFjLFVBQVU7QUFDN0UsUUFBSSxLQUFLLFVBQVUsS0FBSyxNQUFNLE9BQU87QUFDbkMsV0FBSyxRQUFRLEtBQUssTUFBTTtBQUN4QixXQUFLLHNCQUFzQjtBQUFBLElBQzdCO0FBQUEsRUFDRjtBQUFBLEVBQ0Esb0JBQW9CO0FBQ2xCLFNBQUssU0FBUztBQUNkLFFBQUksS0FBSyxPQUFPO0FBQ2QsV0FBSyxNQUFNLFFBQVEsS0FBSyxTQUFTO0FBQUEsSUFDbkM7QUFDQSxVQUFNLGtCQUFrQjtBQUFBLEVBQzFCO0FBQUEsRUFDQSxTQUFTO0FBQ1AsVUFBTSxlQUFlLEtBQUssYUFBYSxLQUFLLGtCQUFrQixLQUFLLE9BQU8sSUFBSSxLQUFLO0FBQ25GLFVBQU0sY0FBYyxLQUFLLGFBQWEsS0FBSyxrQkFBa0IsS0FBSyxNQUFNLElBQUksS0FBSztBQUNqRixVQUFNLFdBQVcsS0FBSyxRQUFRLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZDLFVBQU0sVUFBVSxLQUFLLE9BQU8sT0FBTyxDQUFDLENBQUM7QUFDckMsV0FBT1U7QUFBQTtBQUFBO0FBQUEsZ0JBR0tDLEdBQVM7QUFBQSxNQUNuQixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsSUFDZixDQUFDLENBQUM7QUFBQTtBQUFBLHNCQUVnQixXQUFXLFVBQVUsTUFBTTtBQUFBO0FBQUEsNkJBRXBCLEtBQUssS0FBSztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBUXJCLEtBQUssS0FBSztBQUFBLGlCQUNYQyxHQUFVLEtBQUssSUFBSSxDQUFDO0FBQUEsbUJBQ2xCQyxHQUFLLEtBQUssS0FBSyxDQUFDO0FBQUEsc0JBQ2IsS0FBSyxRQUFRO0FBQUEsc0JBQ2IsS0FBSyxRQUFRO0FBQUEsc0JBQ2IsS0FBSyxRQUFRO0FBQUEsd0JBQ1hELEdBQVUsS0FBSyxXQUFXLENBQUM7QUFBQSxpQkFDbENBLEdBQVUsS0FBSyxJQUFJLENBQUM7QUFBQSxzQkFDZkEsR0FBVSxLQUFLLFNBQVMsQ0FBQztBQUFBLHNCQUN6QkEsR0FBVSxLQUFLLFNBQVMsQ0FBQztBQUFBLDJCQUNwQkEsR0FBVSxLQUFLLGNBQWMsQ0FBQztBQUFBLHdCQUNqQ0EsR0FBVSxLQUFLLFdBQVcsQ0FBQztBQUFBLHVCQUM1QixLQUFLLFNBQVM7QUFBQSx1QkFDZEEsR0FBVSxLQUFLLFVBQVUsQ0FBQztBQUFBLHlCQUN4QkEsR0FBVSxLQUFLLFlBQVksQ0FBQztBQUFBLHNCQUMvQkEsR0FBVSxLQUFLLFNBQVMsQ0FBQztBQUFBO0FBQUEsb0JBRTNCLEtBQUssWUFBWTtBQUFBLG1CQUNsQixLQUFLLFdBQVc7QUFBQSxrQkFDakIsS0FBSyxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0VBSXFDLEtBQUssV0FBVyxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBT3RFLFVBQVUsVUFBVSxNQUFNO0FBQUEsZ0JBQ2hDRCxHQUFTO0FBQUEsTUFDbkIsZUFBZTtBQUFBLElBQ2pCLENBQUMsQ0FBQztBQUFBLFdBQ0ssS0FBSyxJQUFJO0FBQUE7QUFBQTtBQUFBLEVBR2xCO0FBQ0Y7QUFDQSxXQUFXLE1BQU0sQ0FBQyx5QkFBeUIsNkJBQTZCLG1CQUFtQjtBQUMzRkcsaUJBQWdCO0FBQUEsRUFDZEgsR0FBTSxVQUFVO0FBQ2xCLEdBQUcsV0FBVyxXQUFXLFNBQVMsQ0FBQztBQUNuQ0csaUJBQWdCO0FBQUEsRUFDZEgsR0FBTSxnQkFBZ0I7QUFDeEIsR0FBRyxXQUFXLFdBQVcsUUFBUSxDQUFDO0FBQ2xDRyxpQkFBZ0I7QUFBQSxFQUNkSCxHQUFNLGdCQUFnQjtBQUN4QixHQUFHLFdBQVcsV0FBVyxnQkFBZ0IsQ0FBQztBQUMxQ0csaUJBQWdCO0FBQUEsRUFDZEMsR0FBUztBQUNYLEdBQUcsV0FBVyxXQUFXLFNBQVMsQ0FBQztBQUNuQ0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBQzVCLEdBQUcsV0FBVyxXQUFXLFFBQVEsQ0FBQztBQUNsQ0QsaUJBQWdCO0FBQUEsRUFDZEUsR0FBTTtBQUNSLEdBQUcsV0FBVyxXQUFXLFNBQVMsQ0FBQztBQUNuQ0YsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLFdBQVcsU0FBUyxTQUFTLEtBQUssQ0FBQztBQUNoRCxHQUFHLFdBQVcsV0FBVyxnQkFBZ0IsQ0FBQztBQUMxQ0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBQzVCLEdBQUcsV0FBVyxXQUFXLFFBQVEsQ0FBQztBQUNsQ0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBQzVCLEdBQUcsV0FBVyxXQUFXLGNBQWMsQ0FBQztBQUN4Q0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUztBQUNYLEdBQUcsV0FBVyxXQUFXLFNBQVMsQ0FBQztBQUNuQ0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLFdBQVcsT0FBTyxDQUFDO0FBQ2hDLEdBQUcsV0FBVyxXQUFXLFFBQVEsQ0FBQztBQUNsQ0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUztBQUNYLEdBQUcsV0FBVyxXQUFXLGVBQWUsQ0FBQztBQUN6Q0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzNCLEdBQUcsV0FBVyxXQUFXLFFBQVEsQ0FBQztBQUNsQ0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBQzVCLEdBQUcsV0FBVyxXQUFXLFVBQVUsQ0FBQztBQUNwQ0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzVCLEdBQUcsV0FBVyxXQUFXLFlBQVksQ0FBQztBQUN0Q0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLE1BQU0sU0FBUyxTQUFTLEtBQUssQ0FBQztBQUMzQyxHQUFHLFdBQVcsV0FBVyxZQUFZLENBQUM7QUFDdENELGlCQUFnQjtBQUFBLEVBQ2RDLEdBQVMsRUFBRSxNQUFNLFNBQVMsU0FBUyxLQUFLLENBQUM7QUFDM0MsR0FBRyxXQUFXLFdBQVcsWUFBWSxDQUFDO0FBQ3RDRCxpQkFBZ0I7QUFBQSxFQUNkQyxHQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDM0IsR0FBRyxXQUFXLFdBQVcsYUFBYSxDQUFDO0FBQ3ZDRCxpQkFBZ0I7QUFBQSxFQUNkQyxHQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDM0IsR0FBRyxXQUFXLFdBQVcsYUFBYSxDQUFDO0FBQ3ZDRCxpQkFBZ0I7QUFBQSxFQUNkQyxHQUFTO0FBQ1gsR0FBRyxXQUFXLFdBQVcsa0JBQWtCLENBQUM7QUFDNUNELGlCQUFnQjtBQUFBLEVBQ2RDLEdBQVM7QUFDWCxHQUFHLFdBQVcsV0FBVyxlQUFlLENBQUM7QUFDekNELGlCQUFnQjtBQUFBLEVBQ2RDLEdBQVM7QUFDWCxHQUFHLFdBQVcsV0FBVyxnQkFBZ0IsQ0FBQztBQUMxQ0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzVCLEdBQUcsV0FBVyxXQUFXLGFBQWEsQ0FBQztBQUN2Q0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUztBQUNYLEdBQUcsV0FBVyxXQUFXLGdCQUFnQixDQUFDO0FBQzFDRCxpQkFBZ0I7QUFBQSxFQUNkQyxHQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixXQUFXO0FBQUE7QUFBQSxNQUVULGVBQWUsQ0FBQyxVQUFVLENBQUMsU0FBUyxVQUFVLFVBQVUsUUFBUTtBQUFBLE1BQ2hFLGFBQWEsQ0FBQyxVQUFVLFFBQVEsU0FBUztBQUFBLElBQzNDO0FBQUEsRUFDRixDQUFDO0FBQ0gsR0FBRyxXQUFXLFdBQVcsY0FBYyxDQUFDO0FBQ3hDRCxpQkFBZ0I7QUFBQSxFQUNkQyxHQUFTO0FBQ1gsR0FBRyxXQUFXLFdBQVcsYUFBYSxDQUFDO0FBQ3ZDRCxpQkFBZ0I7QUFBQSxFQUNkQyxHQUFTLEVBQUUsV0FBVyxjQUFjLE1BQU0sUUFBUSxDQUFDO0FBQ3JELEdBQUcsV0FBVyxXQUFXLGFBQWEsQ0FBQztBQUN2Q0QsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLFdBQVcsYUFBYSxNQUFNLFFBQVEsQ0FBQztBQUNwRCxHQUFHLFdBQVcsV0FBVyxZQUFZLENBQUM7QUFDdENELGlCQUFnQjtBQUFBLEVBQ2QsTUFBTSxRQUFRLEVBQUUsc0JBQXNCLEtBQUssQ0FBQztBQUM5QyxHQUFHLFdBQVcsV0FBVyxvQkFBb0IsQ0FBQztBQUM5Q0EsaUJBQWdCO0FBQUEsRUFDZCxNQUFNLFNBQVMsRUFBRSxzQkFBc0IsS0FBSyxDQUFDO0FBQy9DLEdBQUcsV0FBVyxXQUFXLHFCQUFxQixDQUFDO0FBQy9DLGFBQWFBLGlCQUFnQjtBQUFBLEVBQzNCRyxHQUFjLGFBQWE7QUFDN0IsR0FBRyxVQUFVOzs7QUN6Vk4sSUFBTSxzQkFBTixjQUFrQ0MsR0FBVztBQUFBLEVBQTdDO0FBQUE7QUFtQ3VCLGlCQUFRO0FBQzNCLFNBQVEsUUFBUTtBQUNoQixTQUFRLGFBQWE7QUFFOUIsU0FBUSxpQkFBNkM7QUFDckQsU0FBUSx1QkFBdUIsQ0FBQ0MsT0FBYTtBQUMzQyxXQUFLLFFBQVNBLEdBQUUsT0FBK0I7QUFBQSxJQUNqRDtBQUFBO0FBQUEsRUFFUSx3QkFBOEI7QUFDcEMsVUFBTSxhQUFhLEtBQUssWUFBWSxjQUFjLGFBQWE7QUFDL0QsUUFBSSxDQUFDLFdBQVk7QUFDakIsVUFBTSxRQUFTLFdBQXVCLFlBQVksY0FBYyxVQUFVO0FBQzFFLFFBQUksU0FBUyxVQUFVLEtBQUssZ0JBQWdCO0FBQzFDLFVBQUksS0FBSyxnQkFBZ0I7QUFDdkIsYUFBSyxlQUFlLG9CQUFvQixTQUFTLEtBQUssb0JBQW9CO0FBQUEsTUFDNUU7QUFDQSxXQUFLLGlCQUFpQjtBQUN0QixZQUFNLGlCQUFpQixTQUFTLEtBQUssb0JBQW9CO0FBQUEsSUFDM0Q7QUFBQSxFQUNGO0FBQUEsRUFFUyxlQUFlO0FBRXRCLDBCQUFzQixNQUFNO0FBQzFCLFdBQUssc0JBQXNCO0FBQzNCLFlBQU0sUUFBUSxLQUFLO0FBQ25CLFVBQUksT0FBTztBQUNULGNBQU0sTUFBTTtBQUFBLE1BQ2QsT0FBTztBQUNMLGNBQU0sYUFBYSxLQUFLLFlBQVksY0FBYyxhQUFhO0FBQy9ELFFBQUMsWUFBdUMsTUFBTTtBQUFBLE1BQ2hEO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRVMsVUFBVTtBQUNqQixTQUFLLHNCQUFzQjtBQUFBLEVBQzdCO0FBQUEsRUFFUyx1QkFBdUI7QUFDOUIsVUFBTSxxQkFBcUI7QUFDM0IsUUFBSSxLQUFLLGdCQUFnQjtBQUN2QixXQUFLLGVBQWUsb0JBQW9CLFNBQVMsS0FBSyxvQkFBb0I7QUFDMUUsV0FBSyxpQkFBaUI7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFBQSxFQUVRLFlBQVlBLElBQVU7QUFDNUIsU0FBSyxRQUFTQSxHQUFFLE9BQWUsU0FBUztBQUFBLEVBQzFDO0FBQUEsRUFFUSxtQkFBMkI7QUFFakMsUUFBSSxLQUFLLGVBQWdCLFFBQU8sS0FBSyxlQUFlO0FBQ3BELFVBQU0sYUFBYSxLQUFLLFlBQVksY0FBYyxhQUFhO0FBQy9ELFFBQUksWUFBWSxVQUFVLE9BQVcsUUFBTyxPQUFPLFdBQVcsS0FBSztBQUNuRSxXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQUEsRUFFUSxTQUFTO0FBQ2YsVUFBTSxPQUFPLEtBQUssaUJBQWlCLEVBQUUsS0FBSztBQUMxQyxRQUFJLENBQUMsUUFBUSxLQUFLLFdBQVk7QUFDOUIsU0FBSyxRQUFRO0FBQ2IsU0FBSyxhQUFhO0FBQ2xCLFNBQUssY0FBYyxJQUFJLFlBQVksaUJBQWlCO0FBQUEsTUFDbEQsU0FBUztBQUFBLE1BQU0sVUFBVTtBQUFBLE1BQ3pCLFFBQVEsRUFBRSxLQUFLO0FBQUEsSUFDakIsQ0FBQyxDQUFDO0FBQUEsRUFDSjtBQUFBLEVBRVEsU0FBUztBQUNmLFNBQUssY0FBYyxJQUFJLFlBQVksaUJBQWlCO0FBQUEsTUFDbEQsU0FBUztBQUFBLE1BQU0sVUFBVTtBQUFBLElBQzNCLENBQUMsQ0FBQztBQUFBLEVBQ0o7QUFBQSxFQUVTLFNBQVM7QUFDaEIsV0FBT0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUtVLEtBQUssS0FBSztBQUFBO0FBQUE7QUFBQTtBQUFBLHdCQUlQLEtBQUssV0FBVztBQUFBLHFCQUNuQixLQUFLLFdBQVc7QUFBQSx1QkFDZCxDQUFDRCxPQUFxQjtBQUMvQixVQUFJQSxHQUFFLFFBQVEsWUFBWUEsR0FBRSxXQUFXQSxHQUFFLFNBQVUsTUFBSyxPQUFPO0FBQy9ELFVBQUlBLEdBQUUsUUFBUSxTQUFVLE1BQUssT0FBTztBQUFBLElBQ3RDLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUVBTXNELEtBQUssTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUlwRCxDQUFDLEtBQUssTUFBTSxLQUFLLEtBQUssS0FBSyxVQUFVO0FBQUEsdUJBQ3hDLEtBQUssTUFBTTtBQUFBLGVBQ25CLEtBQUssYUFBYSxjQUFjLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS3JEO0FBQ0Y7QUFqSmEsb0JBQ0ssU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFrQ0c7QUFBQSxFQUEzQkUsR0FBUyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQUEsR0FuQ2Ysb0JBbUNpQjtBQUNYO0FBQUEsRUFBaEJDLEdBQU07QUFBQSxHQXBDSSxvQkFvQ007QUFDQTtBQUFBLEVBQWhCQSxHQUFNO0FBQUEsR0FyQ0ksb0JBcUNNO0FBckNOLHNCQUFOO0FBQUEsRUFETkMsR0FBYyx1QkFBdUI7QUFBQSxHQUN6Qjs7O0FDTU4sSUFBTSxrQkFBTixjQUE4QkMsR0FBVztBQUFBLEVBQXpDO0FBQUE7QUFHSSxTQUFRLE9BQU87QUFDZixTQUFRLFFBQVE7QUFDaEIsU0FBUSxTQUFTO0FBQ2pCLFNBQVEsWUFBWTtBQUNwQixTQUFRLFlBQVk7QUFFN0IsU0FBUSxzQkFBc0IsQ0FBQ0MsT0FBa0I7QUFDL0MsVUFBSSxDQUFDLEtBQUssU0FBU0EsR0FBRSxNQUFjLEdBQUc7QUFDcEMsYUFBSyxZQUFZO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUE7QUFBQSxFQVpTLG1CQUFtQjtBQUFFLFdBQU87QUFBQSxFQUFNO0FBQUEsRUFjbEMsb0JBQTBCO0FBQ2pDLFVBQU0sa0JBQWtCO0FBQ3hCLFNBQUssT0FBTyxVQUFVLEtBQUs7QUFDM0IsU0FBSyxRQUFRLFNBQVMsS0FBSztBQUMzQixTQUFLLFNBQVMsVUFBVSxLQUFLO0FBQzdCLFNBQUssWUFBWSxhQUFhLEtBQUs7QUFHbkMsUUFBSSxDQUFDLEtBQUssY0FBYyxLQUFLLFNBQVMsS0FBSyxTQUFTO0FBQ2xELFdBQUssY0FBYztBQUFBLElBQ3JCO0FBRUEsYUFBUyxpQkFBaUIsYUFBYSxLQUFLLG1CQUFtQjtBQUFBLEVBQ2pFO0FBQUEsRUFFUyx1QkFBNkI7QUFDcEMsVUFBTSxxQkFBcUI7QUFDM0IsYUFBUyxvQkFBb0IsYUFBYSxLQUFLLG1CQUFtQjtBQUFBLEVBQ3BFO0FBQUEsRUFFUSxjQUFvQjtBQUMxQixTQUFLLFlBQVksQ0FBQyxLQUFLO0FBQUEsRUFDekI7QUFBQSxFQUVBLE1BQWMsYUFBNEI7QUFDeEMsVUFBTSxZQUFZLEtBQUssY0FBZ0MsZ0JBQWdCO0FBQ3ZFLFVBQU0sYUFBYSxLQUFLLGNBQWdDLGlCQUFpQjtBQUN6RSxVQUFNLGNBQWMsS0FBSyxjQUFnQyxrQkFBa0I7QUFFM0UsUUFBSSxXQUFXO0FBQ2IsWUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLO0FBQ2pDLFdBQUssT0FBTztBQUNaLFVBQUksSUFBSyxXQUFVLEdBQUc7QUFBQSxJQUN4QjtBQUVBLFFBQUksWUFBWTtBQUNkLFlBQU0sTUFBTSxXQUFXLE1BQU0sS0FBSztBQUNsQyxXQUFLLFFBQVE7QUFDYixlQUFTLEdBQUc7QUFBQSxJQUNkO0FBRUEsUUFBSSxhQUFhO0FBQ2YsWUFBTSxNQUFNLFlBQVksTUFBTSxLQUFLLEVBQUUsUUFBUSxNQUFNLEVBQUU7QUFDckQsV0FBSyxTQUFTO0FBQ2QsZ0JBQVUsR0FBRztBQUFBLElBQ2Y7QUFFQSxVQUFNLEtBQUssY0FBYztBQUd6QixVQUFNLFlBQVksaUJBQWlCLEtBQUssTUFBTSxLQUFLLE1BQU07QUFDekQsaUJBQWEsU0FBUztBQUd0QixRQUFJO0FBQ0YsWUFBTSxhQUFhLFdBQVcsS0FBSyxNQUFNLEtBQUssU0FBUztBQUFBLElBQ3pELFFBQVE7QUFBQSxJQUVSO0FBRUEsU0FBSyxZQUFZO0FBQUEsRUFDbkI7QUFBQSxFQUVBLE1BQWMsZ0JBQStCO0FBQzNDLFVBQU0sTUFBTSxNQUFNLGlCQUFpQixLQUFLLE9BQU8sS0FBSyxNQUFNO0FBQzFELFNBQUssWUFBWTtBQUNqQixpQkFBYSxHQUFHO0FBQUEsRUFDbEI7QUFBQSxFQUVRLGVBQXFCO0FBQzNCLFNBQUssWUFBWTtBQUFBLEVBQ25CO0FBQUEsRUFFUyxTQUFTO0FBQ2hCLFVBQU0sVUFBVSxLQUFLLE9BQU8sS0FBSyxLQUFLLE9BQU8sQ0FBQyxFQUFFLFlBQVksSUFBSTtBQUVoRSxXQUFPQztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUlNLEtBQUssV0FBVztBQUFBO0FBQUEsVUFFdkIsS0FBSyxZQUNIQSw4Q0FBZ0QsS0FBSyxTQUFTLFFBQVEsS0FBSyxJQUFJLFFBQy9FQSw0Q0FBOEMsT0FBTyxTQUN6RDtBQUFBO0FBQUE7QUFBQSxRQUdBLEtBQUssWUFBWUE7QUFBQTtBQUFBO0FBQUEsY0FHWCxLQUFLLFlBQ0hBLG1EQUFxRCxLQUFLLFNBQVMsUUFBUSxLQUFLLElBQUksUUFDcEZBLHVEQUF5RCxPQUFPLFFBQ3BFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFRVyxLQUFLLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFVVCxLQUFLLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFVWCxLQUFLLEtBQUs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkRBUzRCLEtBQUssWUFBWTtBQUFBLDJEQUNuQixLQUFLLFVBQVU7QUFBQTtBQUFBO0FBQUEsVUFHaEUsRUFBRTtBQUFBO0FBQUEsRUFFVjtBQUNGO0FBdEptQjtBQUFBLEVBQWhCQyxHQUFNO0FBQUEsR0FISSxnQkFHTTtBQUNBO0FBQUEsRUFBaEJBLEdBQU07QUFBQSxHQUpJLGdCQUlNO0FBQ0E7QUFBQSxFQUFoQkEsR0FBTTtBQUFBLEdBTEksZ0JBS007QUFDQTtBQUFBLEVBQWhCQSxHQUFNO0FBQUEsR0FOSSxnQkFNTTtBQUNBO0FBQUEsRUFBaEJBLEdBQU07QUFBQSxHQVBJLGdCQU9NO0FBUE4sa0JBQU47QUFBQSxFQUROQyxHQUFjLGtCQUFrQjtBQUFBLEdBQ3BCOzs7QUNGYixJQUFJLFFBQXdCLG9CQUFJLElBQUk7QUFDcEMsU0FBUyxvQkFBb0I7QUFDM0IsUUFBTSxnQkFBZ0IsU0FBUyxnQkFBZ0I7QUFDL0MsU0FBTyxLQUFLLElBQUksT0FBTyxhQUFhLGFBQWE7QUFDbkQ7QUFDQSxTQUFTLHlCQUF5QjtBQUNoQyxRQUFNLFVBQVUsT0FBTyxpQkFBaUIsU0FBUyxJQUFJLEVBQUUsYUFBYSxRQUFRLE1BQU0sRUFBRSxDQUFDO0FBQ3JGLE1BQUksTUFBTSxPQUFPLEtBQUssQ0FBQyxTQUFTO0FBQzlCLFdBQU87QUFBQSxFQUNUO0FBQ0EsU0FBTztBQUNUO0FBQ0EsU0FBUyxrQkFBa0IsV0FBVztBQUNwQyxRQUFNLElBQUksU0FBUztBQUNuQixNQUFJLENBQUMsU0FBUyxnQkFBZ0IsVUFBVSxTQUFTLGdCQUFnQixHQUFHO0FBQ2xFLFVBQU0saUJBQWlCLGtCQUFrQixJQUFJLHVCQUF1QjtBQUNwRSxRQUFJLDBCQUEwQixpQkFBaUIsU0FBUyxlQUFlLEVBQUU7QUFDekUsUUFBSSxDQUFDLDJCQUEyQiw0QkFBNEIsUUFBUTtBQUNsRSxnQ0FBMEI7QUFBQSxJQUM1QjtBQUNBLFFBQUksaUJBQWlCLEdBQUc7QUFDdEIsZ0NBQTBCO0FBQUEsSUFDNUI7QUFDQSxhQUFTLGdCQUFnQixNQUFNLFlBQVksMkJBQTJCLHVCQUF1QjtBQUM3RixhQUFTLGdCQUFnQixVQUFVLElBQUksZ0JBQWdCO0FBQ3ZELGFBQVMsZ0JBQWdCLE1BQU0sWUFBWSx5QkFBeUIsR0FBRyxjQUFjLElBQUk7QUFBQSxFQUMzRjtBQUNGO0FBQ0EsU0FBUyxvQkFBb0IsV0FBVztBQUN0QyxRQUFNLE9BQU8sU0FBUztBQUN0QixNQUFJLE1BQU0sU0FBUyxHQUFHO0FBQ3BCLGFBQVMsZ0JBQWdCLFVBQVUsT0FBTyxnQkFBZ0I7QUFDMUQsYUFBUyxnQkFBZ0IsTUFBTSxlQUFlLHVCQUF1QjtBQUFBLEVBQ3ZFO0FBQ0Y7OztBQzFDQSxTQUFTLDBCQUEwQixPQUFPO0FBQ3hDLFNBQU8sTUFBTSxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxNQUFNLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxVQUFVLFVBQVUsRUFBRTtBQUNyRjs7O0FDREEsSUFBSSx3QkFBd0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNENUIsSUFBSSxtQkFBbUIsQ0FBQztBQUN4QixTQUFTLG9CQUFvQixLQUFLO0FBQ2hDLG1CQUFpQixLQUFLLEdBQUc7QUFDM0I7QUFDQSxTQUFTLHNCQUFzQixLQUFLO0FBQ2xDLFdBQVNDLEtBQUksaUJBQWlCLFNBQVMsR0FBR0EsTUFBSyxHQUFHQSxNQUFLO0FBQ3JELFFBQUksaUJBQWlCQSxFQUFDLE1BQU0sS0FBSztBQUMvQix1QkFBaUIsT0FBT0EsSUFBRyxDQUFDO0FBQzVCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUNBLFNBQVMsaUJBQWlCLEtBQUs7QUFDN0IsU0FBTyxpQkFBaUIsU0FBUyxLQUFLLGlCQUFpQixpQkFBaUIsU0FBUyxDQUFDLE1BQU07QUFDMUY7OztBQ2RBLElBQUksY0FBYyxjQUFjLE1BQU07QUFBQSxFQUNwQyxjQUFjO0FBQ1osVUFBTSxXQUFXLEVBQUUsU0FBUyxNQUFNLFlBQVksTUFBTSxVQUFVLEtBQUssQ0FBQztBQUFBLEVBQ3RFO0FBQ0Y7OztBQ0pBLElBQUksY0FBYyxjQUFjLE1BQU07QUFBQSxFQUNwQyxZQUFZLFFBQVE7QUFDbEIsVUFBTSxXQUFXLEVBQUUsU0FBUyxNQUFNLFlBQVksTUFBTSxVQUFVLEtBQUssQ0FBQztBQUNwRSxTQUFLLFNBQVM7QUFBQSxFQUNoQjtBQUNGOzs7QUNMQSxJQUFJLG1CQUFtQixjQUFjLE1BQU07QUFBQSxFQUN6QyxjQUFjO0FBQ1osVUFBTSxpQkFBaUIsRUFBRSxTQUFTLE1BQU0sWUFBWSxPQUFPLFVBQVUsS0FBSyxDQUFDO0FBQUEsRUFDN0U7QUFDRjs7O0FDSkEsSUFBSSxtQkFBbUIsY0FBYyxNQUFNO0FBQUEsRUFDekMsY0FBYztBQUNaLFVBQU0saUJBQWlCLEVBQUUsU0FBUyxNQUFNLFlBQVksT0FBTyxVQUFVLEtBQUssQ0FBQztBQUFBLEVBQzdFO0FBQ0Y7OztBQ0FBLFNBQVMsaUJBQWlCLElBQUksV0FBVztBQUN2QyxTQUFPLElBQUksUUFBUSxDQUFDLFlBQVk7QUFDOUIsVUFBTSxhQUFhLElBQUksZ0JBQWdCO0FBQ3ZDLFVBQU0sRUFBRSxPQUFPLElBQUk7QUFDbkIsUUFBSSxHQUFHLFVBQVUsU0FBUyxTQUFTLEdBQUc7QUFDcEM7QUFBQSxJQUNGO0FBQ0EsT0FBRyxVQUFVLElBQUksU0FBUztBQUMxQixRQUFJLFdBQVc7QUFDZixRQUFJLFFBQVEsTUFBTTtBQUNoQixVQUFJLFVBQVU7QUFDWjtBQUFBLE1BQ0Y7QUFDQSxpQkFBVztBQUNYLFNBQUcsVUFBVSxPQUFPLFNBQVM7QUFDN0IsY0FBUTtBQUNSLGlCQUFXLE1BQU07QUFBQSxJQUNuQjtBQUNBLE9BQUcsaUJBQWlCLGdCQUFnQixPQUFPLEVBQUUsTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUNqRSxPQUFHLGlCQUFpQixtQkFBbUIsT0FBTyxFQUFFLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFDcEUsMEJBQXNCLE1BQU07QUFDMUIsVUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLEVBQUUsV0FBVyxHQUFHO0FBQ2hELGNBQU07QUFBQSxNQUNSO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0g7OztBQ2tCQSxJQUFJLFdBQVcsY0FBYyxrQkFBa0I7QUFBQSxFQUM3QyxjQUFjO0FBQ1osVUFBTSxHQUFHLFNBQVM7QUFDbEIsU0FBSyxXQUFXLElBQUlDLG9CQUFtQixJQUFJO0FBQzNDLFNBQUssb0JBQW9CLElBQUksa0JBQWtCLE1BQU0sVUFBVSxrQkFBa0IsT0FBTztBQUN4RixTQUFLLE9BQU87QUFDWixTQUFLLFFBQVE7QUFDYixTQUFLLGdCQUFnQjtBQUNyQixTQUFLLGVBQWU7QUFDcEIsU0FBSyx3QkFBd0IsQ0FBQyxVQUFVO0FBQ3RDLFVBQUksTUFBTSxRQUFRLFlBQVksS0FBSyxRQUFRLGlCQUFpQixJQUFJLEdBQUc7QUFDakUsY0FBTSxlQUFlO0FBQ3JCLGNBQU0sZ0JBQWdCO0FBQ3RCLGFBQUssYUFBYSxLQUFLLE1BQU07QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxlQUFlO0FBQ2IsUUFBSSxLQUFLLE1BQU07QUFDYixXQUFLLGlCQUFpQjtBQUN0QixXQUFLLE9BQU8sVUFBVTtBQUN0Qix3QkFBa0IsSUFBSTtBQUFBLElBQ3hCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsdUJBQXVCO0FBQ3JCLFVBQU0scUJBQXFCO0FBQzNCLHdCQUFvQixJQUFJO0FBQ3hCLFNBQUssb0JBQW9CO0FBQUEsRUFDM0I7QUFBQSxFQUNBLE1BQU0sYUFBYSxRQUFRO0FBQ3pCLFVBQU0sY0FBYyxJQUFJLFlBQVksRUFBRSxPQUFPLENBQUM7QUFDOUMsU0FBSyxjQUFjLFdBQVc7QUFDOUIsUUFBSSxZQUFZLGtCQUFrQjtBQUNoQyxXQUFLLE9BQU87QUFDWix1QkFBaUIsS0FBSyxRQUFRLE9BQU87QUFDckM7QUFBQSxJQUNGO0FBQ0EsU0FBSyxvQkFBb0I7QUFDekIsVUFBTSxpQkFBaUIsS0FBSyxRQUFRLE1BQU07QUFDMUMsU0FBSyxPQUFPO0FBQ1osU0FBSyxPQUFPLE1BQU07QUFDbEIsd0JBQW9CLElBQUk7QUFDeEIsVUFBTSxVQUFVLEtBQUs7QUFDckIsUUFBSSxPQUFPLFNBQVMsVUFBVSxZQUFZO0FBQ3hDLGlCQUFXLE1BQU0sUUFBUSxNQUFNLENBQUM7QUFBQSxJQUNsQztBQUNBLFNBQUssY0FBYyxJQUFJLGlCQUFpQixDQUFDO0FBQUEsRUFDM0M7QUFBQSxFQUNBLG1CQUFtQjtBQUNqQixhQUFTLGlCQUFpQixXQUFXLEtBQUsscUJBQXFCO0FBQy9ELHdCQUFvQixJQUFJO0FBQUEsRUFDMUI7QUFBQSxFQUNBLHNCQUFzQjtBQUNwQixhQUFTLG9CQUFvQixXQUFXLEtBQUsscUJBQXFCO0FBQ2xFLDBCQUFzQixJQUFJO0FBQUEsRUFDNUI7QUFBQSxFQUNBLG1CQUFtQixPQUFPO0FBQ3hCLFVBQU0sZUFBZTtBQUNyQixRQUFJLENBQUMsS0FBSyxPQUFPLFVBQVUsU0FBUyxNQUFNLEtBQUssTUFBTSxXQUFXLEtBQUssVUFBVSxpQkFBaUIsSUFBSSxHQUFHO0FBQ3JHLFdBQUssYUFBYSxLQUFLLE1BQU07QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGtCQUFrQixPQUFPO0FBQ3ZCLFVBQU0sU0FBUyxNQUFNO0FBQ3JCLFVBQU0sU0FBUyxPQUFPLFFBQVEsdUJBQXVCO0FBQ3JELFFBQUksUUFBUTtBQUNWLFlBQU0sZ0JBQWdCO0FBQ3RCLFdBQUssYUFBYSxNQUFNO0FBQUEsSUFDMUI7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNLHdCQUF3QixPQUFPO0FBQ25DLFFBQUksTUFBTSxXQUFXLEtBQUssUUFBUTtBQUNoQyxVQUFJLEtBQUssY0FBYztBQUNyQixhQUFLLGFBQWEsS0FBSyxNQUFNO0FBQUEsTUFDL0IsT0FBTztBQUNMLGNBQU0saUJBQWlCLEtBQUssUUFBUSxPQUFPO0FBQUEsTUFDN0M7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsbUJBQW1CO0FBQ2pCLFFBQUksS0FBSyxRQUFRLENBQUMsS0FBSyxPQUFPLE1BQU07QUFDbEMsV0FBSyxLQUFLO0FBQUEsSUFDWixXQUFXLENBQUMsS0FBSyxRQUFRLEtBQUssT0FBTyxNQUFNO0FBQ3pDLFdBQUssT0FBTztBQUNaLFdBQUssYUFBYSxLQUFLLE1BQU07QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsTUFBTSxPQUFPO0FBQ1gsVUFBTSxjQUFjLElBQUksWUFBWTtBQUNwQyxTQUFLLGNBQWMsV0FBVztBQUM5QixRQUFJLFlBQVksa0JBQWtCO0FBQ2hDLFdBQUssT0FBTztBQUNaO0FBQUEsSUFDRjtBQUNBLFNBQUssaUJBQWlCO0FBQ3RCLFNBQUssa0JBQWtCLFNBQVM7QUFDaEMsU0FBSyxPQUFPO0FBQ1osU0FBSyxPQUFPLFVBQVU7QUFDdEIsc0JBQWtCLElBQUk7QUFDdEIsMEJBQXNCLE1BQU07QUFDMUIsWUFBTSxpQkFBaUIsS0FBSyxjQUFjLGFBQWE7QUFDdkQsVUFBSSxrQkFBa0IsT0FBTyxlQUFlLFVBQVUsWUFBWTtBQUNoRSx1QkFBZSxNQUFNO0FBQUEsTUFDdkIsT0FBTztBQUNMLGFBQUssT0FBTyxNQUFNO0FBQUEsTUFDcEI7QUFBQSxJQUNGLENBQUM7QUFDRCxVQUFNLGlCQUFpQixLQUFLLFFBQVEsTUFBTTtBQUMxQyxTQUFLLGNBQWMsSUFBSSxpQkFBaUIsQ0FBQztBQUFBLEVBQzNDO0FBQUEsRUFDQSxTQUFTO0FBQ1AsVUFBTSxZQUFZLENBQUMsS0FBSztBQUN4QixVQUFNLFlBQVksS0FBSyxrQkFBa0IsS0FBSyxRQUFRO0FBQ3RELFdBQU9DO0FBQUE7QUFBQTtBQUFBLGdCQUdLQyxHQUFTO0FBQUEsTUFDbkIsUUFBUTtBQUFBLE1BQ1IsTUFBTSxLQUFLO0FBQUEsSUFDYixDQUFDLENBQUM7QUFBQSxrQkFDWSxLQUFLLGtCQUFrQjtBQUFBLGlCQUN4QixLQUFLLGlCQUFpQjtBQUFBLHVCQUNoQixLQUFLLHVCQUF1QjtBQUFBO0FBQUEsVUFFekMsWUFBWUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FJa0IsS0FBSyxNQUFNLFNBQVMsSUFBSSxLQUFLLFFBQVEsT0FBTyxhQUFhLElBQUksQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4QkFTeEUsQ0FBQyxVQUFVLEtBQUssYUFBYSxNQUFNLE1BQU0sQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBLDhCQUkxQyxLQUFLLFNBQVMsS0FBSyxPQUFPLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFPekMsRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBSVIsWUFBWUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFJTixFQUFFO0FBQUE7QUFBQTtBQUFBLEVBR2hCO0FBQ0Y7QUFDQSxTQUFTLE1BQU07QUFDZkUsaUJBQWdCO0FBQUEsRUFDZEQsR0FBTSxTQUFTO0FBQ2pCLEdBQUcsU0FBUyxXQUFXLFVBQVUsQ0FBQztBQUNsQ0MsaUJBQWdCO0FBQUEsRUFDZEMsR0FBUyxFQUFFLE1BQU0sU0FBUyxTQUFTLEtBQUssQ0FBQztBQUMzQyxHQUFHLFNBQVMsV0FBVyxRQUFRLENBQUM7QUFDaENELGlCQUFnQjtBQUFBLEVBQ2RDLEdBQVMsRUFBRSxTQUFTLEtBQUssQ0FBQztBQUM1QixHQUFHLFNBQVMsV0FBVyxTQUFTLENBQUM7QUFDakNELGlCQUFnQjtBQUFBLEVBQ2RDLEdBQVMsRUFBRSxXQUFXLGtCQUFrQixNQUFNLFNBQVMsU0FBUyxLQUFLLENBQUM7QUFDeEUsR0FBRyxTQUFTLFdBQVcsaUJBQWlCLENBQUM7QUFDekNELGlCQUFnQjtBQUFBLEVBQ2RDLEdBQVMsRUFBRSxXQUFXLGlCQUFpQixNQUFNLFFBQVEsQ0FBQztBQUN4RCxHQUFHLFNBQVMsV0FBVyxnQkFBZ0IsQ0FBQztBQUN4Q0QsaUJBQWdCO0FBQUEsRUFDZCxNQUFNLFFBQVEsRUFBRSxzQkFBc0IsS0FBSyxDQUFDO0FBQzlDLEdBQUcsU0FBUyxXQUFXLG9CQUFvQixDQUFDO0FBQzVDLFdBQVdBLGlCQUFnQjtBQUFBLEVBQ3pCRSxHQUFjLFdBQVc7QUFDM0IsR0FBRyxRQUFRO0FBQ1gsSUFBSSxDQUFDQyxJQUFVO0FBQ2IsV0FBUyxpQkFBaUIsU0FBUyxDQUFDLFVBQVU7QUFDNUMsVUFBTSxlQUFlLE1BQU0sT0FBTyxRQUFRLGVBQWU7QUFDekQsUUFBSSx3QkFBd0IsU0FBUztBQUNuQyxZQUFNLENBQUMsU0FBUyxFQUFFLElBQUksMEJBQTBCLGFBQWEsYUFBYSxhQUFhLEtBQUssRUFBRTtBQUM5RixVQUFJLFlBQVksVUFBVSxJQUFJLFFBQVE7QUFDcEMsY0FBTSxNQUFNLGFBQWEsWUFBWTtBQUNyQyxjQUFNLFNBQVMsSUFBSSxlQUFlLEVBQUU7QUFDcEMsWUFBSSxRQUFRLGNBQWMsYUFBYTtBQUNyQyxpQkFBTyxPQUFPO0FBQUEsUUFDaEIsT0FBTztBQUNMLGtCQUFRLEtBQUssMkJBQTJCLEVBQUUsd0NBQXdDO0FBQUEsUUFDcEY7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNELFdBQVMsaUJBQWlCLGVBQWUsTUFBTTtBQUFBLEVBQy9DLENBQUM7QUFDSDs7O0FDNU9PLElBQU0sYUFBTixjQUF5QkMsR0FBVztBQUFBLEVBQXBDO0FBQUE7QUFHSSxTQUFRLFVBQW9CLENBQUM7QUFDN0IsU0FBUSxhQUF5QixDQUFDO0FBQ2xDLFNBQVEsZ0JBQWdCO0FBQ3hCLFNBQVEsV0FBVztBQUNuQixTQUFRLFdBQVc7QUFFNUIsU0FBUSxnQkFBK0I7QUFDdkMsU0FBUSxpQkFBcUM7QUFDN0MsU0FBUSxlQUFxRjtBQUM3RixTQUFRLGlCQUFxQztBQW9JN0M7QUFBQSxTQUFRLGdCQUFnQixDQUFDQyxPQUF3QjtBQUMvQyxZQUFNLFVBQVUsS0FBSyxjQUFjLGlCQUFpQjtBQUNwRCxVQUFJLFNBQVMsU0FBU0EsR0FBRSxNQUFjLEVBQUc7QUFFekMsWUFBTSxZQUFZLE9BQU8sYUFBYTtBQUN0QyxVQUFJLENBQUMsYUFBYSxVQUFVLGFBQWE7QUFDdkMsYUFBSyxnQkFBZ0I7QUFDckI7QUFBQSxNQUNGO0FBRUEsVUFBSSxDQUFDLFVBQVUsY0FBYyxDQUFDLGdCQUFnQixVQUFVLFVBQVUsRUFBRztBQUVyRSxZQUFNLFNBQVMsY0FBYyxTQUFTO0FBQ3RDLFVBQUksQ0FBQyxPQUFRO0FBRWIsWUFBTSxNQUFNLHFCQUFxQixTQUFTO0FBQzFDLFVBQUksQ0FBQyxJQUFLO0FBR1YsWUFBTSxhQUFhLG9CQUFJLElBQUksQ0FBQyxLQUFLLE9BQU8sTUFBTSxjQUFjLE9BQU8sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLElBQUksQ0FBQztBQUN0RyxVQUFJLFVBQThCO0FBQ2xDLFVBQUksT0FBb0IsVUFBVSxXQUFXLENBQUMsRUFBRTtBQUNoRCxhQUFPLFFBQVEsU0FBUyxTQUFTLE1BQU07QUFDckMsWUFBSSxnQkFBZ0IsZUFBZSxXQUFXLElBQUksS0FBSyxPQUFPLEdBQUc7QUFDL0Qsb0JBQVU7QUFDVjtBQUFBLFFBQ0Y7QUFDQSxlQUFPLEtBQUs7QUFBQSxNQUNkO0FBRUEsV0FBSyxnQkFBZ0I7QUFDckIsV0FBSyxpQkFBaUI7QUFDdEIsV0FBSyxXQUFXLElBQUk7QUFDcEIsV0FBSyxXQUFXLElBQUk7QUFDcEIsV0FBSyxnQkFBZ0I7QUFBQSxJQUN2QjtBQUVBLFNBQVEsNEJBQTRCLENBQUNBLE9BQXdCO0FBQzNELFlBQU0sVUFBVSxLQUFLLGNBQWMsaUJBQWlCO0FBQ3BELFVBQUksV0FBVyxDQUFDQSxHQUFFLGFBQWEsRUFBRSxTQUFTLE9BQU8sR0FBRztBQUNsRCxhQUFLLGdCQUFnQjtBQUFBLE1BQ3ZCO0FBQUEsSUFDRjtBQWdEQTtBQUFBLFNBQVEsb0JBQW9CLENBQUMsT0FBMEI7QUFDckQsV0FBSyxnQkFBZ0I7QUFDckIsV0FBSyxZQUFZO0FBQ2pCLFdBQUssc0JBQXNCO0FBQUEsSUFDN0I7QUFBQTtBQUFBLEVBN09TLG1CQUFtQjtBQUFFLFdBQU87QUFBQSxFQUFNO0FBQUEsRUFhbEMsdUJBQTZCO0FBQ3BDLFVBQU0scUJBQXFCO0FBQzNCLGFBQVMsb0JBQW9CLFdBQVcsS0FBSyxhQUFhO0FBQzFELGFBQVMsb0JBQW9CLGFBQWEsS0FBSyx5QkFBeUI7QUFDeEUsYUFBUyxvQkFBb0Isc0JBQXNCLEtBQUssaUJBQWtDO0FBQUEsRUFDNUY7QUFBQSxFQUVTLG9CQUEwQjtBQUNqQyxVQUFNLGtCQUFrQjtBQUN4QixvQkFBZ0I7QUFDaEIsaUJBQWE7QUFDYixTQUFLLHFCQUFxQjtBQUMxQixhQUFTLGlCQUFpQixXQUFXLEtBQUssYUFBYTtBQUN2RCxhQUFTLGlCQUFpQixhQUFhLEtBQUsseUJBQXlCO0FBQ3JFLGFBQVMsaUJBQWlCLHNCQUFzQixLQUFLLGlCQUFrQztBQUV2RixTQUFLLFlBQVk7QUFDakIsU0FBSyxzQkFBc0I7QUFHM0IsUUFBSSxPQUFPLFVBQVUsZUFBZSxNQUFNLGFBQWE7QUFDckQsWUFBTSxZQUFZLFdBQVcsTUFBTTtBQUNqQyxhQUFLLFlBQVk7QUFDakIsYUFBSyxzQkFBc0I7QUFBQSxNQUM3QixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtRLGlCQUFpQztBQUN2QyxXQUFPLFNBQVMsY0FBYyxzQkFBc0IsS0FDL0MsU0FBUyxjQUFjLGdCQUFnQixLQUN2QyxTQUFTLGNBQWMsZUFBZSxLQUN0QyxTQUFTLGNBQWMsU0FBUyxLQUNoQyxTQUFTLGNBQWMsTUFBTTtBQUFBLEVBQ3BDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU1RLHVCQUE2QjtBQUVuQyxRQUFJLFNBQVMsY0FBYyxrQkFBa0IsRUFBRztBQUVoRCxVQUFNLFNBQVMsU0FBUyxjQUFjLHFCQUFxQixLQUN0RCxTQUFTLGNBQWMsZUFBZTtBQUMzQyxRQUFJLENBQUMsT0FBUTtBQUViLFVBQU0sV0FBVyxTQUFTLGNBQWMsa0JBQWtCO0FBQzFELFdBQU8sWUFBWSxRQUFRO0FBQUEsRUFDN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTVEsd0JBQThCO0FBRXBDLGFBQVMsaUJBQWlCLHlCQUF5QixFQUFFLFFBQVEsUUFBTSxHQUFHLE9BQU8sQ0FBQztBQUU5RSxhQUFTLGlCQUFpQix1QkFBdUIsRUFBRSxRQUFRLFFBQU07QUFDL0QsU0FBRyxVQUFVLE9BQU8sc0JBQXNCO0FBQUEsSUFDNUMsQ0FBQztBQUVELFVBQU0sY0FBYyxLQUFLLGVBQWU7QUFDeEMsUUFBSSxDQUFDLFlBQWE7QUFFbEIsVUFBTSxlQUFlLG9CQUFJLElBQUksQ0FBQyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sSUFBSSxDQUFDO0FBRWpFLFVBQU0sV0FBVyxNQUFNLEtBQUssWUFBWSxRQUFRLEVBQUUsT0FBTyxRQUFNLGFBQWEsSUFBSSxHQUFHLE9BQU8sQ0FBQztBQUUzRixlQUFXLFdBQVcsVUFBVTtBQUU5QixVQUFJLENBQUMsYUFBYSxJQUFJLFFBQVEsT0FBTyxFQUFHO0FBRXhDLGNBQVEsVUFBVSxJQUFJLHNCQUFzQjtBQUU1QyxZQUFNLE1BQU0sU0FBUyxjQUFjLFFBQVE7QUFDM0MsVUFBSSxZQUFZO0FBQ2hCLFVBQUksWUFBWTtBQUNoQixVQUFJLFFBQVE7QUFDWixVQUFJLGlCQUFpQixTQUFTLENBQUNBLE9BQU07QUFDbkMsUUFBQUEsR0FBRSxlQUFlO0FBQ2pCLFFBQUFBLEdBQUUsZ0JBQWdCO0FBQ2xCLGFBQUssZUFBZSxPQUFPO0FBQUEsTUFDN0IsQ0FBQztBQUNELGNBQVEsWUFBWSxHQUFHO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLUSxlQUFlLFNBQXdCO0FBQzdDLFNBQUssbUJBQW1CO0FBRXhCLFVBQU0sU0FBUyxTQUFTLGNBQWMsdUJBQXVCO0FBQzdELFdBQU8sUUFBUTtBQUVmLFdBQU8saUJBQWlCLGlCQUFpQixPQUFPQSxPQUFtQjtBQUNqRSxZQUFNLFdBQVcsbUJBQW1CO0FBQ3BDLFVBQUk7QUFDRixjQUFVLGFBQWE7QUFBQSxVQUNyQixRQUFRO0FBQUEsVUFDUixHQUFHO0FBQUEsVUFDSCxNQUFNQSxHQUFFLE9BQU87QUFBQSxRQUNqQixDQUFDO0FBQ0QsYUFBSyxtQkFBbUI7QUFDeEIsWUFBSSxPQUFPLFVBQVUsZUFBZSxNQUFNLGdCQUFnQjtBQUN4RCxnQkFBTSxlQUFlLFNBQVM7QUFBQSxRQUNoQyxPQUFPO0FBQ0wsZ0JBQU0sS0FBSyxZQUFZO0FBQUEsUUFDekI7QUFBQSxNQUNGLFNBQVMsS0FBSztBQUNaLGdCQUFRLE1BQU0sc0NBQXNDLEdBQUc7QUFDdkQsZUFBTyxhQUFhO0FBQUEsTUFDdEI7QUFBQSxJQUNGLENBQUM7QUFFRCxXQUFPLGlCQUFpQixpQkFBaUIsTUFBTSxLQUFLLG1CQUFtQixDQUFDO0FBRXhFLFlBQVEsc0JBQXNCLFlBQVksTUFBTTtBQUNoRCxTQUFLLGlCQUFpQjtBQUFBLEVBQ3hCO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFtRFEsbUJBQXlCO0FBQy9CLFFBQUksQ0FBQyxLQUFLLGlCQUFpQixDQUFDLEtBQUssZUFBZ0I7QUFFakQsU0FBSyxtQkFBbUI7QUFDeEIsU0FBSyxnQkFBZ0I7QUFFckIsVUFBTSxTQUFTLEtBQUs7QUFDcEIsVUFBTSxVQUFVLEtBQUs7QUFDckIsU0FBSyxnQkFBZ0I7QUFDckIsU0FBSyxpQkFBaUI7QUFDdEIsV0FBTyxhQUFhLEdBQUcsZ0JBQWdCO0FBRXZDLFVBQU0sU0FBUyxTQUFTLGNBQWMsdUJBQXVCO0FBQzdELFdBQU8sUUFBUSxPQUFPLFNBQVM7QUFFL0IsV0FBTyxpQkFBaUIsaUJBQWlCLE9BQU9BLE9BQW1CO0FBQ2pFLFlBQU0sV0FBVyxtQkFBbUI7QUFDcEMsVUFBSTtBQUNGLGNBQVUsYUFBYTtBQUFBLFVBQ3JCO0FBQUEsVUFDQSxHQUFHO0FBQUEsVUFDSCxNQUFNQSxHQUFFLE9BQU87QUFBQSxRQUNqQixDQUFDO0FBQ0QsYUFBSyxtQkFBbUI7QUFDeEIsWUFBSSxPQUFPLFVBQVUsZUFBZSxNQUFNLGdCQUFnQjtBQUN4RCxnQkFBTSxlQUFlLFNBQVM7QUFBQSxRQUNoQyxPQUFPO0FBQ0wsZ0JBQU0sS0FBSyxZQUFZO0FBQUEsUUFDekI7QUFBQSxNQUNGLFNBQVMsS0FBSztBQUNaLGdCQUFRLE1BQU0sc0NBQXNDLEdBQUc7QUFDdkQsZUFBTyxhQUFhO0FBQUEsTUFDdEI7QUFBQSxJQUNGLENBQUM7QUFFRCxXQUFPLGlCQUFpQixpQkFBaUIsTUFBTSxLQUFLLG1CQUFtQixDQUFDO0FBRXhFLFlBQVEsc0JBQXNCLFlBQVksTUFBTTtBQUNoRCxTQUFLLGlCQUFpQjtBQUFBLEVBQ3hCO0FBQUEsRUFVQSxNQUFjLGNBQTZCO0FBQ3pDLFFBQUk7QUFDRixZQUFNLENBQUMsU0FBUyxPQUFPLElBQUksTUFBTSxRQUFRLElBQUk7QUFBQSxRQUN2QyxhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsTUFDbkIsQ0FBQztBQUNELFdBQUssVUFBVTtBQUNmLFdBQUssYUFBYTtBQUFBLElBQ3BCLFNBQVMsS0FBSztBQUNaLGNBQVEsTUFBTSxxQ0FBcUMsR0FBRztBQUN0RCxXQUFLLFVBQVUsQ0FBQztBQUFBLElBQ2xCO0FBQ0EsU0FBSyx1QkFBdUI7QUFBQSxFQUM5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWlCUSx5QkFBK0I7QUFDckMsVUFBTSxRQUFRLFNBQVMsaUJBQThCLHdDQUF3QztBQUM3RixVQUFNLGFBQWEsb0JBQUksSUFBSSxDQUFDLEtBQUssT0FBTyxNQUFNLGNBQWMsT0FBTyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQzNILFFBQUksYUFBYTtBQUVqQixlQUFXLFFBQVEsT0FBTztBQUN4QixZQUFNLFdBQVcsS0FBSyxRQUFRO0FBQzlCLFVBQUksQ0FBQyxTQUFVO0FBR2YsWUFBTSxhQUFhLFdBQVcsaUJBQWlCLGFBQWEsV0FBVyxpQkFBaUIsTUFBTTtBQUM5RixXQUFLLFVBQVUsSUFBSSxVQUFVO0FBQzdCO0FBR0EsWUFBTSxXQUFXLFNBQVMsY0FBMkIsbUNBQW1DLFFBQVEsSUFBSTtBQUNwRyxVQUFJLFVBQVU7QUFFWixpQkFBUyxVQUFVLElBQUksV0FBVyxRQUFRLGVBQWUsaUJBQWlCLENBQUM7QUFHM0UsWUFBSSxVQUEwQjtBQUM5QixlQUFPLFdBQVcsWUFBWSxTQUFTLE1BQU07QUFDM0MsY0FBSSxtQkFBbUIsZUFBZSxXQUFXLElBQUksUUFBUSxPQUFPLEdBQUc7QUFDckU7QUFBQSxVQUNGO0FBQ0Esb0JBQVUsUUFBUTtBQUFBLFFBQ3BCO0FBRUEsWUFBSSxXQUFXLFlBQVksU0FBUyxNQUFNO0FBQ3hDLGtCQUFRLHNCQUFzQixZQUFZLFFBQVE7QUFBQSxRQUNwRDtBQUFBLE1BQ0Y7QUFHQSxXQUFLLE1BQU0sU0FBUztBQUNwQixXQUFLLGlCQUFpQixTQUFTLE1BQU07QUFDbkMsY0FBTSxLQUFLLFNBQVMsY0FBYyxtQ0FBbUMsUUFBUSxJQUFJO0FBQ2pGLFlBQUksSUFBSTtBQUNOLGFBQUcsZUFBZSxFQUFFLFVBQVUsVUFBVSxPQUFPLFNBQVMsQ0FBQztBQUN6RCxhQUFHLFVBQVUsSUFBSSx1QkFBdUI7QUFDeEMscUJBQVcsTUFBTSxHQUFHLFVBQVUsT0FBTyx1QkFBdUIsR0FBRyxHQUFJO0FBQUEsUUFDckU7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBR0EsU0FBSyxtQkFBbUI7QUFHeEIsVUFBTSxVQUFVLFNBQVMsY0FBYyxrQkFBa0I7QUFDekQsUUFBSSxtQkFBbUIsYUFBYTtBQUNsQyxZQUFNLG1CQUFtQixRQUFRLGlCQUFpQixpQkFBaUI7QUFDbkUsVUFBSSxpQkFBaUIsV0FBVyxHQUFHO0FBQ2pDLGdCQUFRLE1BQU0sVUFBVTtBQUFBLE1BQzFCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTVEscUJBQTJCO0FBQ2pDLFVBQU0sVUFBVSxTQUFTLGlCQUE4QixpQ0FBaUM7QUFDeEYsZUFBVyxZQUFZLFNBQVM7QUFFOUIsVUFBSSxTQUFTLGNBQWMsMEJBQTBCLEVBQUc7QUFFeEQsWUFBTSxXQUFXLFNBQVMsUUFBUTtBQUNsQyxVQUFJLENBQUMsU0FBVTtBQUdmLFdBQUssWUFBWSxRQUFRO0FBR3pCLFlBQU0sY0FBYyxTQUFTLGlCQUE4QixrQkFBa0I7QUFDN0UsWUFBTSxnQkFBZ0IsWUFBWTtBQUNsQyxpQkFBVyxhQUFhLGFBQWE7QUFDbkMsY0FBTSxZQUFZLFVBQVUsUUFBUTtBQUNwQyxZQUFJLENBQUMsVUFBVztBQUVoQixjQUFNLE9BQU8sVUFBVSxjQUFjLHdCQUF3QjtBQUM3RCxZQUFJLENBQUMsS0FBTTtBQUdYLFlBQUksQ0FBQyxLQUFLLGNBQWMsMEJBQTBCLEdBQUc7QUFDbkQsZ0JBQU0sWUFBWSxVQUFVLFFBQVEsVUFBVTtBQUM5QyxnQkFBTSxhQUFhLEtBQUssY0FBYyxTQUFTO0FBQy9DLGNBQUksWUFBWSxXQUFXO0FBQ3pCLGtCQUFNLFNBQVMsU0FBUyxjQUFjLEtBQUs7QUFDM0MsbUJBQU8sWUFBWTtBQUNuQixtQkFBTyxNQUFNLFdBQVc7QUFDeEIsbUJBQU8sTUFBTSxXQUFXLFFBQVE7QUFDaEMsaUJBQUssYUFBYSxRQUFRLEtBQUssVUFBVTtBQUFBLFVBQzNDO0FBQUEsUUFDRjtBQUdBLFlBQUksVUFBVSxjQUFjLDJCQUEyQixFQUFHO0FBRzFELGNBQU0sVUFBVSxTQUFTLGNBQWMsS0FBSztBQUM1QyxnQkFBUSxZQUFZO0FBR3BCLGNBQU0sV0FBVyxTQUFTLGNBQWMsUUFBUTtBQUNoRCxpQkFBUyxZQUFZO0FBQ3JCLGlCQUFTLFlBQVk7QUFDckIsaUJBQVMsUUFBUTtBQUNqQixpQkFBUyxpQkFBaUIsU0FBUyxDQUFDQSxPQUFNO0FBQ3hDLFVBQUFBLEdBQUUsZ0JBQWdCO0FBQ2xCLGVBQUssZ0JBQWdCLFVBQVUsVUFBVSxTQUFTO0FBQUEsUUFDcEQsQ0FBQztBQUNELGdCQUFRLFlBQVksUUFBUTtBQUc1QixjQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFDOUMsZUFBTyxZQUFZO0FBQ25CLGVBQU8sWUFBWTtBQUNuQixlQUFPLFFBQVE7QUFDZixlQUFPLGlCQUFpQixTQUFTLENBQUNBLE9BQU07QUFDdEMsVUFBQUEsR0FBRSxnQkFBZ0I7QUFDbEIsY0FBSSxrQkFBa0IsR0FBRztBQUN2QixpQkFBSyxlQUFlLEVBQUUsTUFBTSxVQUFVLElBQUksU0FBUztBQUFBLFVBQ3JELE9BQU87QUFDTCxpQkFBSyxlQUFlLEVBQUUsTUFBTSxXQUFXLElBQUksV0FBVyxTQUFTO0FBQUEsVUFDakU7QUFDQSxnQkFBTSxTQUFTLEtBQUssY0FBK0MsZ0JBQWdCO0FBQ25GLGNBQUksT0FBUSxRQUFPLE9BQU87QUFBQSxRQUM1QixDQUFDO0FBQ0QsZ0JBQVEsWUFBWSxNQUFNO0FBRTFCLGFBQUssWUFBWSxPQUFPO0FBQUEsTUFDMUI7QUFHQSxZQUFNLHdCQUF3QixTQUFTLGlCQUE4QixrQkFBa0I7QUFDdkYsWUFBTSxVQUFVLEtBQUsscUJBQXFCLHFCQUFxQjtBQUcvRCxZQUFNLFNBQVMsU0FBUyxjQUFjLEtBQUs7QUFDM0MsYUFBTyxZQUFZO0FBR25CLFlBQU0sWUFBWSxTQUFTLGNBQWMsS0FBSztBQUM5QyxnQkFBVSxZQUFZO0FBQ3RCLGdCQUFVLGNBQWM7QUFDeEIsYUFBTyxZQUFZLFNBQVM7QUFFNUIsWUFBTSxNQUFNLFNBQVMsY0FBYyxRQUFRO0FBQzNDLFVBQUksWUFBWTtBQUNoQixVQUFJLFlBQVk7QUFDaEIsVUFBSSxpQkFBaUIsU0FBUyxDQUFDQSxPQUFNO0FBQ25DLFFBQUFBLEdBQUUsZ0JBQWdCO0FBQ2xCLGFBQUssZ0JBQWdCLFVBQVUsVUFBVSxJQUFJO0FBQUEsTUFDL0MsQ0FBQztBQUNELGFBQU8sWUFBWSxHQUFHO0FBR3RCLFlBQU0sWUFBWSxTQUFTLGNBQWMsUUFBUTtBQUNqRCxnQkFBVSxZQUFZO0FBQ3RCLGdCQUFVLFlBQVk7QUFDdEIsZ0JBQVUsUUFBUTtBQUNsQixnQkFBVSxpQkFBaUIsU0FBUyxDQUFDQSxPQUFNO0FBQ3pDLFFBQUFBLEdBQUUsZ0JBQWdCO0FBQ2xCLGNBQU0sY0FBYyxTQUFTLFVBQVUsT0FBTywyQkFBMkI7QUFDekUsa0JBQVUsWUFBWSxjQUNsQixvRUFDQTtBQUNKLGtCQUFVLFFBQVEsY0FBYyxrQkFBa0I7QUFBQSxNQUNwRCxDQUFDO0FBQ0QsYUFBTyxZQUFZLFNBQVM7QUFFNUIsZUFBUyxZQUFZLE1BQU07QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTVEscUJBQXFCLFVBQTJDO0FBQ3RFLFVBQU0sUUFBUSxTQUFTO0FBQ3ZCLFVBQU0sVUFBVSxvQkFBSSxJQUFZO0FBQ2hDLGVBQVdDLE1BQUssVUFBVTtBQUN4QixZQUFNLFNBQVNBLEdBQUUsUUFBUTtBQUN6QixVQUFJLFFBQVE7QUFDVixjQUFNLFlBQVksT0FBTyxNQUFNLEtBQUssRUFBRSxDQUFDO0FBQ3ZDLGdCQUFRLElBQUksU0FBUztBQUFBLE1BQ3ZCO0FBQUEsSUFDRjtBQUVBLFVBQU0sY0FBYyxNQUFNLEtBQUssT0FBTztBQUN0QyxVQUFNLFlBQVk7QUFDbEIsUUFBSTtBQUVKLFFBQUksWUFBWSxXQUFXLEdBQUc7QUFDNUIsZUFBUztBQUFBLElBQ1gsV0FBVyxZQUFZLFVBQVUsV0FBVztBQUMxQyxVQUFJLFlBQVksV0FBVyxHQUFHO0FBQzVCLGlCQUFTLE9BQU8sWUFBWSxDQUFDLENBQUM7QUFBQSxNQUNoQyxXQUFXLFlBQVksV0FBVyxHQUFHO0FBQ25DLGlCQUFTLE9BQU8sWUFBWSxDQUFDLENBQUMsUUFBUSxZQUFZLENBQUMsQ0FBQztBQUFBLE1BQ3RELE9BQU87QUFDTCxpQkFBUyxPQUFPLFlBQVksTUFBTSxHQUFHLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxTQUFTLFlBQVksWUFBWSxTQUFTLENBQUMsQ0FBQztBQUFBLE1BQ2pHO0FBQUEsSUFDRixPQUFPO0FBQ0wsWUFBTSxRQUFRLFlBQVksTUFBTSxHQUFHLFNBQVM7QUFDNUMsWUFBTSxZQUFZLFlBQVksU0FBUztBQUN2QyxlQUFTLE9BQU8sTUFBTSxLQUFLLElBQUksQ0FBQyxTQUFTLFNBQVM7QUFBQSxJQUNwRDtBQUVBLFdBQU8sR0FBRyxLQUFLLFdBQVcsVUFBVSxJQUFJLEtBQUssR0FBRyxHQUFHLE1BQU07QUFBQSxFQUMzRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU9RLFlBQVksVUFBNkI7QUFDL0MsVUFBTSxXQUFXLE1BQU0sS0FBSyxTQUFTLGlCQUE4QixrQkFBa0IsQ0FBQztBQUV0RixVQUFNLGFBQWEsb0JBQUksSUFBeUI7QUFDaEQsZUFBV0EsTUFBSyxVQUFVO0FBQ3hCLFlBQU0sS0FBS0EsR0FBRSxRQUFRO0FBQ3JCLFVBQUksR0FBSSxZQUFXLElBQUksSUFBSUEsRUFBQztBQUFBLElBQzlCO0FBR0EsZUFBVyxhQUFhLFVBQVU7QUFDaEMsWUFBTSxXQUFXLFVBQVUsUUFBUTtBQUNuQyxVQUFJLENBQUMsU0FBVTtBQUVmLFlBQU0sV0FBVyxXQUFXLElBQUksUUFBUTtBQUN4QyxVQUFJLENBQUMsU0FBVTtBQUdmLFVBQUksbUJBQW1CLFNBQVMsY0FBYyxrQkFBa0I7QUFDaEUsVUFBSSxDQUFDLGtCQUFrQjtBQUNyQiwyQkFBbUIsU0FBUyxjQUFjLEtBQUs7QUFDL0MseUJBQWlCLFlBQVk7QUFDN0IsaUJBQVMsWUFBWSxnQkFBZ0I7QUFBQSxNQUN2QztBQUVBLGdCQUFVLFVBQVUsSUFBSSx3QkFBd0I7QUFDaEQsdUJBQWlCLFlBQVksU0FBUztBQUFBLElBQ3hDO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNUSxnQkFBZ0IsVUFBdUIsVUFBa0IsaUJBQXNDO0FBQ3JHLFNBQUssbUJBQW1CO0FBRXhCLFVBQU0sU0FBUyxTQUFTLGNBQWMsdUJBQXVCO0FBQzdELFdBQU8sUUFBUTtBQUVmLFdBQU8saUJBQWlCLGlCQUFpQixPQUFPRCxPQUFtQjtBQUNqRSxZQUFNLFdBQVcsbUJBQW1CO0FBQ3BDLFVBQUk7QUFDRixjQUFVLFdBQVcsVUFBVTtBQUFBLFVBQzdCLEdBQUc7QUFBQSxVQUNILE1BQU1BLEdBQUUsT0FBTztBQUFBLFVBQ2YsVUFBVTtBQUFBLFFBQ1osQ0FBQztBQUNELGFBQUssbUJBQW1CO0FBQ3hCLFlBQUksT0FBTyxVQUFVLGVBQWUsTUFBTSxnQkFBZ0I7QUFDeEQsZ0JBQU0sZUFBZSxTQUFTO0FBQUEsUUFDaEMsT0FBTztBQUNMLGdCQUFNLEtBQUssWUFBWTtBQUFBLFFBQ3pCO0FBQUEsTUFDRixTQUFTLEtBQUs7QUFDWixnQkFBUSxNQUFNLG9DQUFvQyxHQUFHO0FBQ3JELGVBQU8sYUFBYTtBQUFBLE1BQ3RCO0FBQUEsSUFDRixDQUFDO0FBRUQsV0FBTyxpQkFBaUIsaUJBQWlCLE1BQU0sS0FBSyxtQkFBbUIsQ0FBQztBQUV4RSxRQUFJLGlCQUFpQjtBQUVuQixZQUFNLGdCQUFnQixTQUFTLGNBQWMscUNBQXFDLGVBQWUsSUFBSTtBQUNyRyxVQUFJLGVBQWU7QUFDakIsY0FBTSxtQkFBbUIsY0FBYyxjQUFjLGtCQUFrQjtBQUN2RSxZQUFJLGtCQUFrQjtBQUNwQiwyQkFBaUIsWUFBWSxNQUFNO0FBQUEsUUFDckMsT0FBTztBQUNMLHdCQUFjLFlBQVksTUFBTTtBQUFBLFFBQ2xDO0FBQUEsTUFDRixPQUFPO0FBQ0wsaUJBQVMsWUFBWSxNQUFNO0FBQUEsTUFDN0I7QUFBQSxJQUNGLE9BQU87QUFFTCxZQUFNLFNBQVMsU0FBUyxjQUFjLHlCQUF5QjtBQUMvRCxVQUFJLFFBQVE7QUFDVixpQkFBUyxhQUFhLFFBQVEsTUFBTTtBQUFBLE1BQ3RDLE9BQU87QUFDTCxpQkFBUyxZQUFZLE1BQU07QUFBQSxNQUM3QjtBQUFBLElBQ0Y7QUFDQSxTQUFLLGlCQUFpQjtBQUFBLEVBQ3hCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBUVEsY0FBYyxXQUErRDtBQUVuRixRQUFJLEtBQUssV0FBVyxTQUFTLEVBQUcsUUFBTyxLQUFLLFdBQVcsU0FBUztBQUdoRSxlQUFXLFFBQVEsT0FBTyxPQUFPLEtBQUssVUFBVSxHQUFHO0FBQ2pELFVBQUksS0FBSyxTQUFTLFVBQVcsUUFBTztBQUFBLElBQ3RDO0FBR0EsZUFBVyxRQUFRLE9BQU8sT0FBTyxLQUFLLFVBQVUsR0FBRztBQUNqRCxVQUFJLEtBQUssS0FBSyxNQUFNLEtBQUssRUFBRSxDQUFDLE1BQU0sVUFBVyxRQUFPO0FBQUEsSUFDdEQ7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUEsRUFJUSxxQkFBMkI7QUFDakMsU0FBSyxnQkFBZ0IsT0FBTztBQUM1QixTQUFLLGlCQUFpQjtBQUFBLEVBQ3hCO0FBQUE7QUFBQSxFQUlRLG9CQUFvQkEsSUFBZ0IsTUFBa0M7QUFDNUUsVUFBTSxLQUFLLFNBQVMsV0FBV0EsR0FBRSxPQUFPLFdBQVdBLEdBQUUsT0FBTztBQUM1RCxVQUFNLFdBQVcsU0FBUyxZQUFZQSxHQUFFLE9BQU8sV0FBVztBQUMxRCxTQUFLLGVBQWUsRUFBRSxNQUFNLElBQUksU0FBUztBQUN6QyxVQUFNLFNBQVMsS0FBSyxjQUErQyxnQkFBZ0I7QUFDbkYsUUFBSSxPQUFRLFFBQU8sT0FBTztBQUFBLEVBQzVCO0FBQUEsRUFFQSxNQUFjLGdCQUErQjtBQUMzQyxVQUFNLFNBQVMsS0FBSyxjQUErQyxnQkFBZ0I7QUFDbkYsUUFBSSxPQUFRLFFBQU8sT0FBTztBQUUxQixRQUFJLENBQUMsS0FBSyxhQUFjO0FBQ3hCLFFBQUksS0FBSyxhQUFhLFNBQVMsVUFBVTtBQUN2QyxZQUFVLGFBQWEsS0FBSyxhQUFhLEVBQUU7QUFBQSxJQUM3QyxPQUFPO0FBQ0wsWUFBVSxjQUFjLEtBQUssYUFBYSxVQUFXLEtBQUssYUFBYSxFQUFFO0FBQUEsSUFDM0U7QUFDQSxTQUFLLGVBQWU7QUFDcEIsUUFBSSxPQUFPLFVBQVUsZUFBZSxNQUFNLGdCQUFnQjtBQUN4RCxZQUFNLGVBQWUsU0FBUztBQUFBLElBQ2hDLE9BQU87QUFDTCxZQUFNLEtBQUssWUFBWTtBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUFBLEVBRVEsZUFBcUI7QUFDM0IsVUFBTSxTQUFTLEtBQUssY0FBK0MsZ0JBQWdCO0FBQ25GLFFBQUksT0FBUSxRQUFPLE9BQU87QUFDMUIsU0FBSyxlQUFlO0FBQUEsRUFDdEI7QUFBQSxFQUVTLFNBQVM7QUFDaEIsV0FBT0U7QUFBQTtBQUFBLGtCQUVPLEtBQUssYUFBYTtBQUFBLGFBQ3ZCLEtBQUssUUFBUTtBQUFBLGFBQ2IsS0FBSyxRQUFRO0FBQUEsdUJBQ0gsS0FBSyxnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQ0FJRyxLQUFLLGNBQWMsUUFBUSxNQUFNO0FBQUEsZ0VBQ2hCLEtBQUssWUFBWTtBQUFBLDJEQUN0QixLQUFLLGFBQWE7QUFBQTtBQUFBO0FBQUEsRUFHM0U7QUFDRjtBQUFBO0FBbHBCYSxXQWdRSSxtQkFBbUI7QUFBQSxFQUNoQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFwUWlCO0FBQUEsRUFBaEJDLEdBQU07QUFBQSxHQUhJLFdBR007QUFDQTtBQUFBLEVBQWhCQSxHQUFNO0FBQUEsR0FKSSxXQUlNO0FBQ0E7QUFBQSxFQUFoQkEsR0FBTTtBQUFBLEdBTEksV0FLTTtBQUNBO0FBQUEsRUFBaEJBLEdBQU07QUFBQSxHQU5JLFdBTU07QUFDQTtBQUFBLEVBQWhCQSxHQUFNO0FBQUEsR0FQSSxXQU9NO0FBUE4sYUFBTjtBQUFBLEVBRE5DLEdBQWMsYUFBYTtBQUFBLEdBQ2Y7OztBQ2RiLFNBQVMsT0FBYTtBQUNwQixNQUFJLFNBQVMsY0FBYyxhQUFhLEVBQUc7QUFDM0MsUUFBTSxNQUFNLFNBQVMsY0FBYyxhQUFhO0FBQ2hELFdBQVMsS0FBSyxZQUFZLEdBQUc7QUFDL0I7QUFFQSxJQUFJLFNBQVMsZUFBZSxXQUFXO0FBQ3JDLFdBQVMsaUJBQWlCLG9CQUFvQixJQUFJO0FBQ3BELE9BQU87QUFDTCxPQUFLO0FBQ1A7IiwKICAibmFtZXMiOiBbImdsb2JhbCIsICJnbG9iYWxUaGlzIiwgInN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cyIsICJTaGFkb3dSb290IiwgIlNoYWR5Q1NTIiwgIm5hdGl2ZVNoYWRvdyIsICJEb2N1bWVudCIsICJwcm90b3R5cGUiLCAiQ1NTU3R5bGVTaGVldCIsICJjb25zdHJ1Y3Rpb25Ub2tlbiIsICJTeW1ib2wiLCAiY3NzVGFnQ2FjaGUiLCAiV2Vha01hcCIsICJDU1NSZXN1bHQiLCAiY3NzVGV4dCIsICJzdHJpbmdzIiwgInNhZmVUb2tlbiIsICJ0aGlzIiwgIkVycm9yIiwgIl9zdHJpbmdzIiwgInN0eWxlU2hlZXQiLCAiX3N0eWxlU2hlZXQiLCAiY2FjaGVhYmxlIiwgImxlbmd0aCIsICJnZXQiLCAicmVwbGFjZVN5bmMiLCAic2V0IiwgInRvU3RyaW5nIiwgInVuc2FmZUNTUyIsICJ2YWx1ZSIsICJTdHJpbmciLCAiY3NzIiwgInZhbHVlcyIsICJyZWR1Y2UiLCAiYWNjIiwgInYiLCAiaWR4IiwgImFkb3B0U3R5bGVzIiwgInJlbmRlclJvb3QiLCAic3R5bGVzIiwgImFkb3B0ZWRTdHlsZVNoZWV0cyIsICJtYXAiLCAicyIsICJzdHlsZSIsICJkb2N1bWVudCIsICJjcmVhdGVFbGVtZW50IiwgIm5vbmNlIiwgInNldEF0dHJpYnV0ZSIsICJ0ZXh0Q29udGVudCIsICJhcHBlbmRDaGlsZCIsICJnZXRDb21wYXRpYmxlU3R5bGUiLCAic2hlZXQiLCAicnVsZSIsICJjc3NSdWxlcyIsICJpcyIsICJkZWZpbmVQcm9wZXJ0eSIsICJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCAiZ2V0T3duUHJvcGVydHlOYW1lcyIsICJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCAiZ2V0UHJvdG90eXBlT2YiLCAiT2JqZWN0IiwgImdsb2JhbCIsICJnbG9iYWxUaGlzIiwgInRydXN0ZWRUeXBlcyIsICJlbXB0eVN0cmluZ0ZvckJvb2xlYW5BdHRyaWJ1dGUiLCAiZW1wdHlTY3JpcHQiLCAicG9seWZpbGxTdXBwb3J0IiwgInJlYWN0aXZlRWxlbWVudFBvbHlmaWxsU3VwcG9ydCIsICJKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5IiwgInByb3AiLCAiX29iaiIsICJkZWZhdWx0Q29udmVydGVyIiwgInZhbHVlIiwgInR5cGUiLCAiQm9vbGVhbiIsICJBcnJheSIsICJKU09OIiwgInN0cmluZ2lmeSIsICJmcm9tVmFsdWUiLCAiTnVtYmVyIiwgInBhcnNlIiwgImUiLCAibm90RXF1YWwiLCAib2xkIiwgImRlZmF1bHRQcm9wZXJ0eURlY2xhcmF0aW9uIiwgImF0dHJpYnV0ZSIsICJTdHJpbmciLCAiY29udmVydGVyIiwgInJlZmxlY3QiLCAidXNlRGVmYXVsdCIsICJoYXNDaGFuZ2VkIiwgIlN5bWJvbCIsICJtZXRhZGF0YSIsICJsaXRQcm9wZXJ0eU1ldGFkYXRhIiwgIldlYWtNYXAiLCAiUmVhY3RpdmVFbGVtZW50IiwgIkhUTUxFbGVtZW50IiwgImluaXRpYWxpemVyIiwgInRoaXMiLCAiX19wcmVwYXJlIiwgIl9pbml0aWFsaXplcnMiLCAicHVzaCIsICJvYnNlcnZlZEF0dHJpYnV0ZXMiLCAiZmluYWxpemUiLCAiX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwIiwgImtleXMiLCAibmFtZSIsICJvcHRpb25zIiwgInN0YXRlIiwgInByb3RvdHlwZSIsICJoYXNPd25Qcm9wZXJ0eSIsICJjcmVhdGUiLCAid3JhcHBlZCIsICJlbGVtZW50UHJvcGVydGllcyIsICJzZXQiLCAibm9BY2Nlc3NvciIsICJrZXkiLCAiZGVzY3JpcHRvciIsICJnZXRQcm9wZXJ0eURlc2NyaXB0b3IiLCAiZ2V0IiwgInYiLCAib2xkVmFsdWUiLCAiY2FsbCIsICJyZXF1ZXN0VXBkYXRlIiwgImNvbmZpZ3VyYWJsZSIsICJlbnVtZXJhYmxlIiwgInN1cGVyQ3RvciIsICJNYXAiLCAiZmluYWxpemVkIiwgInByb3BzIiwgInByb3BlcnRpZXMiLCAicHJvcEtleXMiLCAicCIsICJjcmVhdGVQcm9wZXJ0eSIsICJhdHRyIiwgIl9fYXR0cmlidXRlTmFtZUZvclByb3BlcnR5IiwgImVsZW1lbnRTdHlsZXMiLCAiZmluYWxpemVTdHlsZXMiLCAic3R5bGVzIiwgImlzQXJyYXkiLCAiU2V0IiwgImZsYXQiLCAiSW5maW5pdHkiLCAicmV2ZXJzZSIsICJzIiwgInVuc2hpZnQiLCAiZ2V0Q29tcGF0aWJsZVN0eWxlIiwgInRvTG93ZXJDYXNlIiwgImNvbnN0cnVjdG9yIiwgInN1cGVyIiwgIl9faW5zdGFuY2VQcm9wZXJ0aWVzIiwgImlzVXBkYXRlUGVuZGluZyIsICJoYXNVcGRhdGVkIiwgIl9fcmVmbGVjdGluZ1Byb3BlcnR5IiwgIl9faW5pdGlhbGl6ZSIsICJfX3VwZGF0ZVByb21pc2UiLCAiUHJvbWlzZSIsICJyZXMiLCAiZW5hYmxlVXBkYXRpbmciLCAiXyRjaGFuZ2VkUHJvcGVydGllcyIsICJfX3NhdmVJbnN0YW5jZVByb3BlcnRpZXMiLCAiZm9yRWFjaCIsICJpIiwgImNvbnRyb2xsZXIiLCAiX19jb250cm9sbGVycyIsICJhZGQiLCAicmVuZGVyUm9vdCIsICJpc0Nvbm5lY3RlZCIsICJob3N0Q29ubmVjdGVkIiwgImRlbGV0ZSIsICJpbnN0YW5jZVByb3BlcnRpZXMiLCAic2l6ZSIsICJjcmVhdGVSZW5kZXJSb290IiwgInNoYWRvd1Jvb3QiLCAiYXR0YWNoU2hhZG93IiwgInNoYWRvd1Jvb3RPcHRpb25zIiwgImFkb3B0U3R5bGVzIiwgImNvbm5lY3RlZENhbGxiYWNrIiwgImMiLCAiX3JlcXVlc3RlZFVwZGF0ZSIsICJkaXNjb25uZWN0ZWRDYWxsYmFjayIsICJob3N0RGlzY29ubmVjdGVkIiwgIl9vbGQiLCAiXyRhdHRyaWJ1dGVUb1Byb3BlcnR5IiwgImF0dHJWYWx1ZSIsICJ0b0F0dHJpYnV0ZSIsICJyZW1vdmVBdHRyaWJ1dGUiLCAic2V0QXR0cmlidXRlIiwgImN0b3IiLCAicHJvcE5hbWUiLCAiZ2V0UHJvcGVydHlPcHRpb25zIiwgImZyb21BdHRyaWJ1dGUiLCAiY29udmVydGVkVmFsdWUiLCAiX19kZWZhdWx0VmFsdWVzIiwgInVzZU5ld1ZhbHVlIiwgIm5ld1ZhbHVlIiwgImhhc0F0dHJpYnV0ZSIsICJfJGNoYW5nZVByb3BlcnR5IiwgIl9fZW5xdWV1ZVVwZGF0ZSIsICJpbml0aWFsaXplVmFsdWUiLCAiaGFzIiwgIl9fcmVmbGVjdGluZ1Byb3BlcnRpZXMiLCAicmVqZWN0IiwgInJlc3VsdCIsICJzY2hlZHVsZVVwZGF0ZSIsICJwZXJmb3JtVXBkYXRlIiwgInNob3VsZFVwZGF0ZSIsICJjaGFuZ2VkUHJvcGVydGllcyIsICJ3aWxsVXBkYXRlIiwgImhvc3RVcGRhdGUiLCAidXBkYXRlIiwgIl9fbWFya1VwZGF0ZWQiLCAiXyRkaWRVcGRhdGUiLCAiX2NoYW5nZWRQcm9wZXJ0aWVzIiwgImhvc3RVcGRhdGVkIiwgImZpcnN0VXBkYXRlZCIsICJ1cGRhdGVkIiwgInVwZGF0ZUNvbXBsZXRlIiwgImdldFVwZGF0ZUNvbXBsZXRlIiwgIl9fcHJvcGVydHlUb0F0dHJpYnV0ZSIsICJtb2RlIiwgInJlYWN0aXZlRWxlbWVudFZlcnNpb25zIiwgImdsb2JhbCIsICJnbG9iYWxUaGlzIiwgIndyYXAiLCAibm9kZSIsICJ0cnVzdGVkVHlwZXMiLCAicG9saWN5IiwgImNyZWF0ZVBvbGljeSIsICJjcmVhdGVIVE1MIiwgInMiLCAiYm91bmRBdHRyaWJ1dGVTdWZmaXgiLCAibWFya2VyIiwgIk1hdGgiLCAicmFuZG9tIiwgInRvRml4ZWQiLCAic2xpY2UiLCAibWFya2VyTWF0Y2giLCAibm9kZU1hcmtlciIsICJkIiwgImRvY3VtZW50IiwgImNyZWF0ZU1hcmtlciIsICJjcmVhdGVDb21tZW50IiwgImlzUHJpbWl0aXZlIiwgInZhbHVlIiwgImlzQXJyYXkiLCAiQXJyYXkiLCAiaXNJdGVyYWJsZSIsICJTeW1ib2wiLCAiaXRlcmF0b3IiLCAiU1BBQ0VfQ0hBUiIsICJ0ZXh0RW5kUmVnZXgiLCAiY29tbWVudEVuZFJlZ2V4IiwgImNvbW1lbnQyRW5kUmVnZXgiLCAidGFnRW5kUmVnZXgiLCAiUmVnRXhwIiwgInNpbmdsZVF1b3RlQXR0ckVuZFJlZ2V4IiwgImRvdWJsZVF1b3RlQXR0ckVuZFJlZ2V4IiwgInJhd1RleHRFbGVtZW50IiwgInRhZyIsICJ0eXBlIiwgInN0cmluZ3MiLCAidmFsdWVzIiwgIl8kbGl0VHlwZSQiLCAiaHRtbCIsICJzdmciLCAibWF0aG1sIiwgIm5vQ2hhbmdlIiwgImZvciIsICJub3RoaW5nIiwgInRlbXBsYXRlQ2FjaGUiLCAiV2Vha01hcCIsICJ3YWxrZXIiLCAiY3JlYXRlVHJlZVdhbGtlciIsICJ0cnVzdEZyb21UZW1wbGF0ZVN0cmluZyIsICJ0c2EiLCAic3RyaW5nRnJvbVRTQSIsICJoYXNPd25Qcm9wZXJ0eSIsICJFcnJvciIsICJnZXRUZW1wbGF0ZUh0bWwiLCAibCIsICJsZW5ndGgiLCAiYXR0ck5hbWVzIiwgInJhd1RleHRFbmRSZWdleCIsICJyZWdleCIsICJpIiwgImF0dHJOYW1lIiwgIm1hdGNoIiwgImF0dHJOYW1lRW5kSW5kZXgiLCAibGFzdEluZGV4IiwgImV4ZWMiLCAidGVzdCIsICJlbmQiLCAic3RhcnRzV2l0aCIsICJwdXNoIiwgIlRlbXBsYXRlIiwgImNvbnN0cnVjdG9yIiwgIm9wdGlvbnMiLCAidGhpcyIsICJwYXJ0cyIsICJub2RlSW5kZXgiLCAiYXR0ck5hbWVJbmRleCIsICJwYXJ0Q291bnQiLCAiZWwiLCAiY3JlYXRlRWxlbWVudCIsICJjdXJyZW50Tm9kZSIsICJjb250ZW50IiwgIndyYXBwZXIiLCAiZmlyc3RDaGlsZCIsICJyZXBsYWNlV2l0aCIsICJjaGlsZE5vZGVzIiwgIm5leHROb2RlIiwgIm5vZGVUeXBlIiwgImhhc0F0dHJpYnV0ZXMiLCAibmFtZSIsICJnZXRBdHRyaWJ1dGVOYW1lcyIsICJlbmRzV2l0aCIsICJyZWFsTmFtZSIsICJzdGF0aWNzIiwgImdldEF0dHJpYnV0ZSIsICJzcGxpdCIsICJtIiwgImluZGV4IiwgImN0b3IiLCAiUHJvcGVydHlQYXJ0IiwgIkJvb2xlYW5BdHRyaWJ1dGVQYXJ0IiwgIkV2ZW50UGFydCIsICJBdHRyaWJ1dGVQYXJ0IiwgInJlbW92ZUF0dHJpYnV0ZSIsICJ0YWdOYW1lIiwgInRleHRDb250ZW50IiwgImVtcHR5U2NyaXB0IiwgImFwcGVuZCIsICJkYXRhIiwgImluZGV4T2YiLCAiX29wdGlvbnMiLCAiaW5uZXJIVE1MIiwgInJlc29sdmVEaXJlY3RpdmUiLCAicGFydCIsICJwYXJlbnQiLCAiYXR0cmlidXRlSW5kZXgiLCAiY3VycmVudERpcmVjdGl2ZSIsICJfX2RpcmVjdGl2ZXMiLCAiX19kaXJlY3RpdmUiLCAibmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yIiwgIl8kaW5pdGlhbGl6ZSIsICJfJHJlc29sdmUiLCAiVGVtcGxhdGVJbnN0YW5jZSIsICJ0ZW1wbGF0ZSIsICJfJHBhcnRzIiwgIl8kZGlzY29ubmVjdGFibGVDaGlsZHJlbiIsICJfJHRlbXBsYXRlIiwgIl8kcGFyZW50IiwgInBhcmVudE5vZGUiLCAiXyRpc0Nvbm5lY3RlZCIsICJmcmFnbWVudCIsICJjcmVhdGlvblNjb3BlIiwgImltcG9ydE5vZGUiLCAicGFydEluZGV4IiwgInRlbXBsYXRlUGFydCIsICJDaGlsZFBhcnQiLCAibmV4dFNpYmxpbmciLCAiRWxlbWVudFBhcnQiLCAiXyRzZXRWYWx1ZSIsICJfX2lzQ29ubmVjdGVkIiwgInN0YXJ0Tm9kZSIsICJlbmROb2RlIiwgIl8kY29tbWl0dGVkVmFsdWUiLCAiXyRzdGFydE5vZGUiLCAiXyRlbmROb2RlIiwgImlzQ29ubmVjdGVkIiwgImRpcmVjdGl2ZVBhcmVudCIsICJfJGNsZWFyIiwgIl9jb21taXRUZXh0IiwgIl9jb21taXRUZW1wbGF0ZVJlc3VsdCIsICJfY29tbWl0Tm9kZSIsICJfY29tbWl0SXRlcmFibGUiLCAiaW5zZXJ0QmVmb3JlIiwgIl9pbnNlcnQiLCAiY3JlYXRlVGV4dE5vZGUiLCAicmVzdWx0IiwgIl8kZ2V0VGVtcGxhdGUiLCAiaCIsICJfdXBkYXRlIiwgImluc3RhbmNlIiwgIl9jbG9uZSIsICJnZXQiLCAic2V0IiwgIml0ZW1QYXJ0cyIsICJpdGVtUGFydCIsICJpdGVtIiwgInN0YXJ0IiwgImZyb20iLCAiXyRub3RpZnlDb25uZWN0aW9uQ2hhbmdlZCIsICJuIiwgInJlbW92ZSIsICJlbGVtZW50IiwgImZpbGwiLCAiU3RyaW5nIiwgInZhbHVlSW5kZXgiLCAibm9Db21taXQiLCAiY2hhbmdlIiwgInYiLCAiX2NvbW1pdFZhbHVlIiwgInNldEF0dHJpYnV0ZSIsICJ0b2dnbGVBdHRyaWJ1dGUiLCAic3VwZXIiLCAibmV3TGlzdGVuZXIiLCAib2xkTGlzdGVuZXIiLCAic2hvdWxkUmVtb3ZlTGlzdGVuZXIiLCAiY2FwdHVyZSIsICJvbmNlIiwgInBhc3NpdmUiLCAic2hvdWxkQWRkTGlzdGVuZXIiLCAicmVtb3ZlRXZlbnRMaXN0ZW5lciIsICJhZGRFdmVudExpc3RlbmVyIiwgImV2ZW50IiwgImNhbGwiLCAiaG9zdCIsICJoYW5kbGVFdmVudCIsICJfJExIIiwgIl9ib3VuZEF0dHJpYnV0ZVN1ZmZpeCIsICJfbWFya2VyIiwgIl9tYXJrZXJNYXRjaCIsICJfSFRNTF9SRVNVTFQiLCAiX2dldFRlbXBsYXRlSHRtbCIsICJfVGVtcGxhdGVJbnN0YW5jZSIsICJfaXNJdGVyYWJsZSIsICJfcmVzb2x2ZURpcmVjdGl2ZSIsICJfQ2hpbGRQYXJ0IiwgIl9BdHRyaWJ1dGVQYXJ0IiwgIl9Cb29sZWFuQXR0cmlidXRlUGFydCIsICJfRXZlbnRQYXJ0IiwgIl9Qcm9wZXJ0eVBhcnQiLCAiX0VsZW1lbnRQYXJ0IiwgInBvbHlmaWxsU3VwcG9ydCIsICJsaXRIdG1sUG9seWZpbGxTdXBwb3J0IiwgImxpdEh0bWxWZXJzaW9ucyIsICJyZW5kZXIiLCAiY29udGFpbmVyIiwgInBhcnRPd25lck5vZGUiLCAicmVuZGVyQmVmb3JlIiwgImdsb2JhbCIsICJnbG9iYWxUaGlzIiwgIkxpdEVsZW1lbnQiLCAiUmVhY3RpdmVFbGVtZW50IiwgImNvbnN0cnVjdG9yIiwgInRoaXMiLCAicmVuZGVyT3B0aW9ucyIsICJob3N0IiwgIl9fY2hpbGRQYXJ0IiwgImNyZWF0ZVJlbmRlclJvb3QiLCAicmVuZGVyUm9vdCIsICJzdXBlciIsICJyZW5kZXJCZWZvcmUiLCAiZmlyc3RDaGlsZCIsICJjaGFuZ2VkUHJvcGVydGllcyIsICJ2YWx1ZSIsICJyZW5kZXIiLCAiaGFzVXBkYXRlZCIsICJpc0Nvbm5lY3RlZCIsICJ1cGRhdGUiLCAiY29ubmVjdGVkQ2FsbGJhY2siLCAic2V0Q29ubmVjdGVkIiwgImRpc2Nvbm5lY3RlZENhbGxiYWNrIiwgIm5vQ2hhbmdlIiwgImxpdEVsZW1lbnRIeWRyYXRlU3VwcG9ydCIsICJwb2x5ZmlsbFN1cHBvcnQiLCAibGl0RWxlbWVudFBvbHlmaWxsU3VwcG9ydCIsICJnbG9iYWwiLCAibGl0RWxlbWVudFZlcnNpb25zIiwgInB1c2giLCAiaXNTZXJ2ZXIiLCAiY3VzdG9tRWxlbWVudCIsICJ0YWdOYW1lIiwgImNsYXNzT3JUYXJnZXQiLCAiY29udGV4dCIsICJhZGRJbml0aWFsaXplciIsICJjdXN0b21FbGVtZW50cyIsICJkZWZpbmUiLCAiZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb24iLCAiYXR0cmlidXRlIiwgInR5cGUiLCAiU3RyaW5nIiwgImNvbnZlcnRlciIsICJkZWZhdWx0Q29udmVydGVyIiwgInJlZmxlY3QiLCAiaGFzQ2hhbmdlZCIsICJub3RFcXVhbCIsICJzdGFuZGFyZFByb3BlcnR5IiwgIm9wdGlvbnMiLCAidGFyZ2V0IiwgImNvbnRleHQiLCAia2luZCIsICJtZXRhZGF0YSIsICJwcm9wZXJ0aWVzIiwgImdsb2JhbFRoaXMiLCAibGl0UHJvcGVydHlNZXRhZGF0YSIsICJnZXQiLCAic2V0IiwgIk1hcCIsICJPYmplY3QiLCAiY3JlYXRlIiwgIndyYXBwZWQiLCAibmFtZSIsICJ2IiwgIm9sZFZhbHVlIiwgImNhbGwiLCAidGhpcyIsICJyZXF1ZXN0VXBkYXRlIiwgIl8kY2hhbmdlUHJvcGVydHkiLCAidmFsdWUiLCAiRXJyb3IiLCAicHJvcGVydHkiLCAicHJvdG9PclRhcmdldCIsICJuYW1lT3JDb250ZXh0IiwgInByb3RvIiwgImhhc093blByb3BlcnR5IiwgImNvbnN0cnVjdG9yIiwgImNyZWF0ZVByb3BlcnR5IiwgImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsICJ1bmRlZmluZWQiLCAic3RhdGUiLCAib3B0aW9ucyIsICJwcm9wZXJ0eSIsICJhdHRyaWJ1dGUiLCAiZGVzYyIsICJvYmoiLCAibmFtZSIsICJkZXNjcmlwdG9yIiwgImNvbmZpZ3VyYWJsZSIsICJlbnVtZXJhYmxlIiwgIlJlZmxlY3QiLCAiZGVjb3JhdGUiLCAiT2JqZWN0IiwgImRlZmluZVByb3BlcnR5IiwgInF1ZXJ5IiwgInNlbGVjdG9yIiwgImNhY2hlIiwgInByb3RvT3JUYXJnZXQiLCAibmFtZU9yQ29udGV4dCIsICJkZXNjcmlwdG9yIiwgImRvUXVlcnkiLCAiZWwiLCAicmVuZGVyUm9vdCIsICJxdWVyeVNlbGVjdG9yIiwgImdldCIsICJzZXQiLCAia2V5IiwgIlN5bWJvbCIsICJ0aGlzIiwgInYiLCAiZGVzYyIsICJyZXN1bHQiLCAiY2FsbCIsICJoYXNVcGRhdGVkIiwgImIiLCAiX19kZWZQcm9wIiwgIl9fZ2V0T3duUHJvcERlc2MiLCAiX19kZWNvcmF0ZUNsYXNzIiwgImkiLCAiaSIsICJvIiwgImUiLCAiX19kZWNvcmF0ZUNsYXNzIiwgIm4iLCAiZSIsICJvIiwgIl9fZGVjb3JhdGVDbGFzcyIsICJuIiwgInVwZGF0ZSIsICJ0cmFuc2xhdGlvbiIsICJ0IiwgIkxvY2FsaXplQ29udHJvbGxlciIsICJQYXJ0VHlwZSIsICJBVFRSSUJVVEUiLCAiQ0hJTEQiLCAiUFJPUEVSVFkiLCAiQk9PTEVBTl9BVFRSSUJVVEUiLCAiRVZFTlQiLCAiRUxFTUVOVCIsICJkaXJlY3RpdmUiLCAiYyIsICJ2YWx1ZXMiLCAiXyRsaXREaXJlY3RpdmUkIiwgIkRpcmVjdGl2ZSIsICJfcGFydEluZm8iLCAiXyRpc0Nvbm5lY3RlZCIsICJ0aGlzIiwgIl8kcGFyZW50IiwgInBhcnQiLCAicGFyZW50IiwgImF0dHJpYnV0ZUluZGV4IiwgIl9fcGFydCIsICJfX2F0dHJpYnV0ZUluZGV4IiwgInByb3BzIiwgInVwZGF0ZSIsICJfcGFydCIsICJyZW5kZXIiLCAiY2xhc3NNYXAiLCAiZGlyZWN0aXZlIiwgIkRpcmVjdGl2ZSIsICJwYXJ0SW5mbyIsICJzdXBlciIsICJ0eXBlIiwgIlBhcnRUeXBlIiwgIkFUVFJJQlVURSIsICJuYW1lIiwgInN0cmluZ3MiLCAibGVuZ3RoIiwgIkVycm9yIiwgImNsYXNzSW5mbyIsICJPYmplY3QiLCAia2V5cyIsICJmaWx0ZXIiLCAia2V5IiwgImpvaW4iLCAicGFydCIsICJ0aGlzIiwgIl9wcmV2aW91c0NsYXNzZXMiLCAiU2V0IiwgIl9zdGF0aWNDbGFzc2VzIiwgInNwbGl0IiwgInMiLCAiaGFzIiwgImFkZCIsICJyZW5kZXIiLCAiY2xhc3NMaXN0IiwgImVsZW1lbnQiLCAicmVtb3ZlIiwgImRlbGV0ZSIsICJ2YWx1ZSIsICJub0NoYW5nZSIsICJpZkRlZmluZWQiLCAidmFsdWUiLCAibm90aGluZyIsICJicmFuZCIsICJTeW1ib2wiLCAiZm9yIiwgInVud3JhcFN0YXRpY1ZhbHVlIiwgInZhbHVlIiwgInIiLCAibGl0ZXJhbCIsICJzdHJpbmdzIiwgInZhbHVlcyIsICJfJGxpdFN0YXRpYyQiLCAicmVkdWNlIiwgImFjYyIsICJ2IiwgImlkeCIsICJ2YWx1ZSIsICJFcnJvciIsICJyIiwgImJyYW5kIiwgInN0cmluZ3NDYWNoZSIsICJNYXAiLCAid2l0aFN0YXRpYyIsICJjb3JlVGFnIiwgImwiLCAibGVuZ3RoIiwgInN0YXRpY1ZhbHVlIiwgImR5bmFtaWNWYWx1ZSIsICJzdGF0aWNTdHJpbmdzIiwgImR5bmFtaWNWYWx1ZXMiLCAicyIsICJpIiwgImhhc1N0YXRpY3MiLCAidW53cmFwU3RhdGljVmFsdWUiLCAicHVzaCIsICJrZXkiLCAiam9pbiIsICJnZXQiLCAicmF3IiwgInNldCIsICJodG1sIiwgImNvcmVIdG1sIiwgInN2ZyIsICJjb3JlU3ZnIiwgIm1hdGhtbCIsICJjb3JlTWF0aG1sIiwgIkxvY2FsaXplQ29udHJvbGxlciIsICJpIiwgInUiLCAiZSIsICJvIiwgIl9fZGVjb3JhdGVDbGFzcyIsICJyIiwgIm4iLCAidCIsICJMb2NhbGl6ZUNvbnRyb2xsZXIiLCAiYiIsICJfX2RlY29yYXRlQ2xhc3MiLCAidCIsICJraXRDb2RlIiwgInAiLCAiX0NoaWxkUGFydCIsICJDaGlsZFBhcnQiLCAiXyRMSCIsICJpc1RlbXBsYXRlUmVzdWx0IiwgInZhbHVlIiwgInR5cGUiLCAiaXNTaW5nbGVFeHByZXNzaW9uIiwgInBhcnQiLCAic3RyaW5ncyIsICJSRVNFVF9WQUxVRSIsICJzZXRDb21taXR0ZWRWYWx1ZSIsICJwYXJ0IiwgInZhbHVlIiwgIl8kY29tbWl0dGVkVmFsdWUiLCAibGlicmFyeSIsICJiIiwgImwiLCAiX19kZWNvcmF0ZUNsYXNzIiwgInIiLCAibiIsICJ0IiwgImkiLCAiYiIsICJ4IiwgInkiLCAibiIsICJ0IiwgImxpdmUiLCAiZGlyZWN0aXZlIiwgIkRpcmVjdGl2ZSIsICJwYXJ0SW5mbyIsICJzdXBlciIsICJ0eXBlIiwgIlBhcnRUeXBlIiwgIlBST1BFUlRZIiwgIkFUVFJJQlVURSIsICJCT09MRUFOX0FUVFJJQlVURSIsICJFcnJvciIsICJpc1NpbmdsZUV4cHJlc3Npb24iLCAidmFsdWUiLCAicGFydCIsICJub0NoYW5nZSIsICJub3RoaW5nIiwgImVsZW1lbnQiLCAibmFtZSIsICJoYXNBdHRyaWJ1dGUiLCAiZ2V0QXR0cmlidXRlIiwgIlN0cmluZyIsICJzZXRDb21taXR0ZWRWYWx1ZSIsICJiIiwgImUiLCAibyIsICJsIiwgIl9fZGVjb3JhdGVDbGFzcyIsICJuIiwgInIiLCAidCIsICJpIiwgImUiLCAiYiIsICJuIiwgInIiLCAidCIsICJpIiwgImUiLCAiYiIsICJyIiwgInQiLCAiaSIsICJMb2NhbGl6ZUNvbnRyb2xsZXIiLCAiYiIsICJlIiwgIl9fZGVjb3JhdGVDbGFzcyIsICJuIiwgInQiLCAibyIsICJpIiwgImUiLCAiYyIsICJiIiwgInIiLCAidCJdCn0K
