"use strict";
var v = Object.create;
var d = Object.defineProperty;
var j = Object.getOwnPropertyDescriptor;
var _ = Object.getOwnPropertyNames;
var C = Object.getPrototypeOf, E = Object.prototype.hasOwnProperty;
var a = (e, r) => d(e, "name", { value: r, configurable: !0 });
var P = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports), z = (e, r) => {
  for (var t in r)
    d(e, t, { get: r[t], enumerable: !0 });
}, x = (e, r, t, n) => {
  if (r && typeof r == "object" || typeof r == "function")
    for (let s of _(r))
      !E.call(e, s) && s !== t && d(e, s, { get: () => r[s], enumerable: !(n = j(r, s)) || n.enumerable });
  return e;
};
var I = (e, r, t) => (t = e != null ? v(C(e)) : {}, x(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  r || !e || !e.__esModule ? d(t, "default", { value: e, enumerable: !0 }) : t,
  e
)), M = (e) => x(d({}, "__esModule", { value: !0 }), e);

// ../node_modules/@ngard/tiny-isequal/index.js
var w = P((g) => {
  Object.defineProperty(g, "__esModule", { value: !0 }), g.isEqual = /* @__PURE__ */ function() {
    var e = Object.prototype.toString, r = Object.getPrototypeOf, t = Object.getOwnPropertySymbols ? function(n) {
      return Object.keys(n).concat(Object.getOwnPropertySymbols(n));
    } : Object.keys;
    return function(n, s) {
      return (/* @__PURE__ */ a(function l(o, i, p) {
        var c, f, u, A = e.call(o), $ = e.call(i);
        if (o === i) return !0;
        if (o == null || i == null) return !1;
        if (p.indexOf(o) > -1 && p.indexOf(i) > -1) return !0;
        if (p.push(o, i), A != $ || (c = t(o), f = t(i), c.length != f.length || c.some(function(m) {
          return !l(o[m], i[m], p);
        }))) return !1;
        switch (A.slice(8, -1)) {
          case "Symbol":
            return o.valueOf() == i.valueOf();
          case "Date":
          case "Number":
            return +o == +i || +o != +o && +i != +i;
          case "RegExp":
          case "Function":
          case "String":
          case "Boolean":
            return "" + o == "" + i;
          case "Set":
          case "Map":
            c = o.entries(), f = i.entries();
            do
              if (!l((u = c.next()).value, f.next().value, p)) return !1;
            while (!u.done);
            return !0;
          case "ArrayBuffer":
            o = new Uint8Array(o), i = new Uint8Array(i);
          case "DataView":
            o = new Uint8Array(o.buffer), i = new Uint8Array(i.buffer);
          case "Float32Array":
          case "Float64Array":
          case "Int8Array":
          case "Int16Array":
          case "Int32Array":
          case "Uint8Array":
          case "Uint16Array":
          case "Uint32Array":
          case "Uint8ClampedArray":
          case "Arguments":
          case "Array":
            if (o.length != i.length) return !1;
            for (u = 0; u < o.length; u++) if ((u in o || u in i) && (u in o != u in i || !l(o[u], i[u], p))) return !1;
            return !0;
          case "Object":
            return l(r(o), r(i), p);
          default:
            return !1;
        }
      }, "n"))(n, s, []);
    };
  }();
});

// src/csf/index.ts
var V = {};
z(V, {
  combineTags: () => J,
  includeConditionalArg: () => T,
  isExportStory: () => F,
  isMeta: () => D,
  isPreview: () => U,
  isStory: () => B,
  parseKind: () => G,
  sanitize: () => O,
  storyNameFromExport: () => q,
  toId: () => k
});
module.exports = M(V);

// src/csf/toStartCaseStr.ts
function S(e) {
  return e.replace(/_/g, " ").replace(/-/g, " ").replace(/\./g, " ").replace(/([^\n])([A-Z])([a-z])/g, (r, t, n, s) => `${t} ${n}${s}`).replace(
  /([a-z])([A-Z])/g, (r, t, n) => `${t} ${n}`).replace(/([a-z])([0-9])/gi, (r, t, n) => `${t} ${n}`).replace(/([0-9])([a-z])/gi, (r, t, n) => `${t}\
 ${n}`).replace(/(\s|^)(\w)/g, (r, t, n) => `${t}${n.toUpperCase()}`).replace(/ +/g, " ").trim();
}
a(S, "toStartCaseStr");

// src/csf/includeConditionalArg.ts
var y = I(w(), 1);
var R = /* @__PURE__ */ a((e) => e.map((r) => typeof r < "u").filter(Boolean).length, "count"), N = /* @__PURE__ */ a((e, r) => {
  let { exists: t, eq: n, neq: s, truthy: l } = e;
  if (R([t, n, s, l]) > 1)
    throw new Error(`Invalid conditional test ${JSON.stringify({ exists: t, eq: n, neq: s })}`);
  if (typeof n < "u")
    return (0, y.isEqual)(r, n);
  if (typeof s < "u")
    return !(0, y.isEqual)(r, s);
  if (typeof t < "u") {
    let i = typeof r < "u";
    return t ? i : !i;
  }
  return (typeof l > "u" ? !0 : l) ? !!r : !r;
}, "testValue"), T = /* @__PURE__ */ a((e, r, t) => {
  if (!e.if)
    return !0;
  let { arg: n, global: s } = e.if;
  if (R([n, s]) !== 1)
    throw new Error(`Invalid conditional value ${JSON.stringify({ arg: n, global: s })}`);
  let l = n ? r[n] : t[s];
  return N(e.if, l);
}, "includeConditionalArg");

// src/csf/csf-factories.ts
function U(e) {
  return e != null && typeof e == "object" && "_tag" in e && e?._tag === "Preview";
}
a(U, "isPreview");
function D(e) {
  return e != null && typeof e == "object" && "_tag" in e && e?._tag === "Meta";
}
a(D, "isMeta");
function B(e) {
  return e != null && typeof e == "object" && "_tag" in e && e?._tag === "Story";
}
a(B, "isStory");

// src/csf/index.ts
var O = /* @__PURE__ */ a((e) => e.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-").replace(/-+/g,
"-").replace(/^-+/, "").replace(/-+$/, ""), "sanitize"), b = /* @__PURE__ */ a((e, r) => {
  let t = O(e);
  if (t === "")
    throw new Error(`Invalid ${r} '${e}', must include alphanumeric characters`);
  return t;
}, "sanitizeSafe"), k = /* @__PURE__ */ a((e, r) => `${b(e, "kind")}${r ? `--${b(r, "name")}` : ""}`, "toId"), q = /* @__PURE__ */ a((e) => S(
e), "storyNameFromExport");
function h(e, r) {
  return Array.isArray(r) ? r.includes(e) : e.match(r);
}
a(h, "matches");
function F(e, { includeStories: r, excludeStories: t }) {
  return (
    // https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
    e !== "__esModule" && (!r || h(e, r)) && (!t || !h(e, t))
  );
}
a(F, "isExportStory");
var G = /* @__PURE__ */ a((e, { rootSeparator: r, groupSeparator: t }) => {
  let [n, s] = e.split(r, 2), l = (s || e).split(t).filter((o) => !!o);
  return {
    root: s ? n : null,
    groups: l
  };
}, "parseKind"), J = /* @__PURE__ */ a((...e) => {
  let r = e.reduce((t, n) => (n.startsWith("!") ? t.delete(n.slice(1)) : t.add(n), t), /* @__PURE__ */ new Set());
  return Array.from(r);
}, "combineTags");
