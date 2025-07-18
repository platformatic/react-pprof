var qs = Object.create;
var lt = Object.defineProperty;
var Hs = Object.getOwnPropertyDescriptor;
var $s = Object.getOwnPropertyNames;
var Bs = Object.getPrototypeOf, Gs = Object.prototype.hasOwnProperty;
var n = (t, e) => lt(t, "name", { value: e, configurable: !0 }), $e = /* @__PURE__ */ ((t) => typeof require < "u" ? require : typeof Proxy <
"u" ? new Proxy(t, {
  get: (e, r) => (typeof require < "u" ? require : e)[r]
}) : t)(function(t) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + t + '" is not supported');
});
var q = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), Eo = (t, e) => {
  for (var r in e)
    lt(t, r, { get: e[r], enumerable: !0 });
}, zs = (t, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let i of $s(e))
      !Gs.call(t, i) && i !== r && lt(t, i, { get: () => e[i], enumerable: !(o = Hs(e, i)) || o.enumerable });
  return t;
};
var ve = (t, e, r) => (r = t != null ? qs(Bs(t)) : {}, zs(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !t || !t.__esModule ? lt(r, "default", { value: t, enumerable: !0 }) : r,
  t
));

// ../node_modules/memoizerific/memoizerific.js
var cr = q((nn, lr) => {
  (function(t) {
    if (typeof nn == "object" && typeof lr < "u")
      lr.exports = t();
    else if (typeof define == "function" && define.amd)
      define([], t);
    else {
      var e;
      typeof window < "u" ? e = window : typeof global < "u" ? e = global : typeof self < "u" ? e = self : e = this, e.memoizerific = t();
    }
  })(function() {
    var t, e, r;
    return (/* @__PURE__ */ n(function o(i, s, a) {
      function l(p, u) {
        if (!s[p]) {
          if (!i[p]) {
            var f = typeof $e == "function" && $e;
            if (!u && f) return f(p, !0);
            if (c) return c(p, !0);
            var h = new Error("Cannot find module '" + p + "'");
            throw h.code = "MODULE_NOT_FOUND", h;
          }
          var g = s[p] = { exports: {} };
          i[p][0].call(g.exports, function(T) {
            var x = i[p][1][T];
            return l(x || T);
          }, g, g.exports, o, i, s, a);
        }
        return s[p].exports;
      }
      n(l, "s");
      for (var c = typeof $e == "function" && $e, d = 0; d < a.length; d++) l(a[d]);
      return l;
    }, "e"))({ 1: [function(o, i, s) {
      i.exports = function(a) {
        if (typeof Map != "function" || a) {
          var l = o("./similar");
          return new l();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(o, i, s) {
      function a() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      n(a, "Similar"), a.prototype.get = function(l) {
        var c;
        if (this.lastItem && this.isEqual(this.lastItem.key, l))
          return this.lastItem.val;
        if (c = this.indexOf(l), c >= 0)
          return this.lastItem = this.list[c], this.list[c].val;
      }, a.prototype.set = function(l, c) {
        var d;
        return this.lastItem && this.isEqual(this.lastItem.key, l) ? (this.lastItem.val = c, this) : (d = this.indexOf(l), d >= 0 ? (this.lastItem =
        this.list[d], this.list[d].val = c, this) : (this.lastItem = { key: l, val: c }, this.list.push(this.lastItem), this.size++, this));
      }, a.prototype.delete = function(l) {
        var c;
        if (this.lastItem && this.isEqual(this.lastItem.key, l) && (this.lastItem = void 0), c = this.indexOf(l), c >= 0)
          return this.size--, this.list.splice(c, 1)[0];
      }, a.prototype.has = function(l) {
        var c;
        return this.lastItem && this.isEqual(this.lastItem.key, l) ? !0 : (c = this.indexOf(l), c >= 0 ? (this.lastItem = this.list[c], !0) :
        !1);
      }, a.prototype.forEach = function(l, c) {
        var d;
        for (d = 0; d < this.size; d++)
          l.call(c || this, this.list[d].val, this.list[d].key, this);
      }, a.prototype.indexOf = function(l) {
        var c;
        for (c = 0; c < this.size; c++)
          if (this.isEqual(this.list[c].key, l))
            return c;
        return -1;
      }, a.prototype.isEqual = function(l, c) {
        return l === c || l !== l && c !== c;
      }, i.exports = a;
    }, {}], 3: [function(o, i, s) {
      var a = o("map-or-similar");
      i.exports = function(p) {
        var u = new a(!1), f = [];
        return function(h) {
          var g = /* @__PURE__ */ n(function() {
            var T = u, x, v, E = arguments.length - 1, y = Array(E + 1), w = !0, A;
            if ((g.numArgs || g.numArgs === 0) && g.numArgs !== E + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (A = 0; A < E; A++) {
              if (y[A] = {
                cacheItem: T,
                arg: arguments[A]
              }, T.has(arguments[A])) {
                T = T.get(arguments[A]);
                continue;
              }
              w = !1, x = new a(!1), T.set(arguments[A], x), T = x;
            }
            return w && (T.has(arguments[E]) ? v = T.get(arguments[E]) : w = !1), w || (v = h.apply(null, arguments), T.set(arguments[E], v)),
            p > 0 && (y[E] = {
              cacheItem: T,
              arg: arguments[E]
            }, w ? l(f, y) : f.push(y), f.length > p && c(f.shift())), g.wasMemoized = w, g.numArgs = E + 1, v;
          }, "memoizerific");
          return g.limit = p, g.wasMemoized = !1, g.cache = u, g.lru = f, g;
        };
      };
      function l(p, u) {
        var f = p.length, h = u.length, g, T, x;
        for (T = 0; T < f; T++) {
          for (g = !0, x = 0; x < h; x++)
            if (!d(p[T][x].arg, u[x].arg)) {
              g = !1;
              break;
            }
          if (g)
            break;
        }
        p.push(p.splice(T, 1)[0]);
      }
      n(l, "moveToMostRecentLru");
      function c(p) {
        var u = p.length, f = p[u - 1], h, g;
        for (f.cacheItem.delete(f.arg), g = u - 2; g >= 0 && (f = p[g], h = f.cacheItem.get(f.arg), !h || !h.size); g--)
          f.cacheItem.delete(f.arg);
      }
      n(c, "removeCachedResult");
      function d(p, u) {
        return p === u || p !== p && u !== u;
      }
      n(d, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});

// ../node_modules/picoquery/lib/string-util.js
var no = q((oo) => {
  "use strict";
  Object.defineProperty(oo, "__esModule", { value: !0 });
  oo.encodeString = ad;
  var Q = Array.from({ length: 256 }, (t, e) => "%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase()), sd = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
  ]);
  function ad(t) {
    let e = t.length;
    if (e === 0)
      return "";
    let r = "", o = 0, i = 0;
    e: for (; i < e; i++) {
      let s = t.charCodeAt(i);
      for (; s < 128; ) {
        if (sd[s] !== 1 && (o < i && (r += t.slice(o, i)), o = i + 1, r += Q[s]), ++i === e)
          break e;
        s = t.charCodeAt(i);
      }
      if (o < i && (r += t.slice(o, i)), s < 2048) {
        o = i + 1, r += Q[192 | s >> 6] + Q[128 | s & 63];
        continue;
      }
      if (s < 55296 || s >= 57344) {
        o = i + 1, r += Q[224 | s >> 12] + Q[128 | s >> 6 & 63] + Q[128 | s & 63];
        continue;
      }
      if (++i, i >= e)
        throw new Error("URI malformed");
      let a = t.charCodeAt(i) & 1023;
      o = i + 1, s = 65536 + ((s & 1023) << 10 | a), r += Q[240 | s >> 18] + Q[128 | s >> 12 & 63] + Q[128 | s >> 6 & 63] + Q[128 | s & 63];
    }
    return o === 0 ? t : o < e ? r + t.slice(o) : r;
  }
  n(ad, "encodeString");
});

// ../node_modules/picoquery/lib/shared.js
var kt = q((ee) => {
  "use strict";
  Object.defineProperty(ee, "__esModule", { value: !0 });
  ee.defaultOptions = ee.defaultShouldSerializeObject = ee.defaultValueSerializer = void 0;
  var io = no(), ld = /* @__PURE__ */ n((t) => {
    switch (typeof t) {
      case "string":
        return (0, io.encodeString)(t);
      case "bigint":
      case "boolean":
        return "" + t;
      case "number":
        if (Number.isFinite(t))
          return t < 1e21 ? "" + t : (0, io.encodeString)("" + t);
        break;
    }
    return t instanceof Date ? (0, io.encodeString)(t.toISOString()) : "";
  }, "defaultValueSerializer");
  ee.defaultValueSerializer = ld;
  var cd = /* @__PURE__ */ n((t) => t instanceof Date, "defaultShouldSerializeObject");
  ee.defaultShouldSerializeObject = cd;
  var _i = /* @__PURE__ */ n((t) => t, "identityFunc");
  ee.defaultOptions = {
    nesting: !0,
    nestingSyntax: "dot",
    arrayRepeat: !1,
    arrayRepeatSyntax: "repeat",
    delimiter: 38,
    valueDeserializer: _i,
    valueSerializer: ee.defaultValueSerializer,
    keyDeserializer: _i,
    shouldSerializeObject: ee.defaultShouldSerializeObject
  };
});

// ../node_modules/picoquery/lib/object-util.js
var so = q((Dt) => {
  "use strict";
  Object.defineProperty(Dt, "__esModule", { value: !0 });
  Dt.getDeepObject = ud;
  Dt.stringifyObject = ji;
  var we = kt(), dd = no();
  function pd(t) {
    return t === "__proto__" || t === "constructor" || t === "prototype";
  }
  n(pd, "isPrototypeKey");
  function ud(t, e, r, o, i) {
    if (pd(e))
      return t;
    let s = t[e];
    return typeof s == "object" && s !== null ? s : !o && (i || typeof r == "number" || typeof r == "string" && r * 0 === 0 && r.indexOf(".") ===
    -1) ? t[e] = [] : t[e] = {};
  }
  n(ud, "getDeepObject");
  var fd = 20, md = "[]", yd = "[", hd = "]", gd = ".";
  function ji(t, e, r = 0, o, i) {
    let { nestingSyntax: s = we.defaultOptions.nestingSyntax, arrayRepeat: a = we.defaultOptions.arrayRepeat, arrayRepeatSyntax: l = we.defaultOptions.
    arrayRepeatSyntax, nesting: c = we.defaultOptions.nesting, delimiter: d = we.defaultOptions.delimiter, valueSerializer: p = we.defaultOptions.
    valueSerializer, shouldSerializeObject: u = we.defaultOptions.shouldSerializeObject } = e, f = typeof d == "number" ? String.fromCharCode(
    d) : d, h = i === !0 && a, g = s === "dot" || s === "js" && !i;
    if (r > fd)
      return "";
    let T = "", x = !0, v = !1;
    for (let E in t) {
      let y = t[E], w;
      o ? (w = o, h ? l === "bracket" && (w += md) : g ? (w += gd, w += E) : (w += yd, w += E, w += hd)) : w = E, x || (T += f), typeof y ==
      "object" && y !== null && !u(y) ? (v = y.pop !== void 0, (c || a && v) && (T += ji(y, e, r + 1, w, v))) : (T += (0, dd.encodeString)(w),
      T += "=", T += p(y, E)), x && (x = !1);
    }
    return T;
  }
  n(ji, "stringifyObject");
});

// ../node_modules/fast-decode-uri-component/index.js
var $i = q((Eb, Hi) => {
  "use strict";
  var Ni = 12, bd = 0, ao = [
    // The first part of the table maps bytes to character to a transition.
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    7,
    7,
    10,
    9,
    9,
    9,
    11,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    // The second part of the table maps a state to a new state when adding a
    // transition.
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    12,
    0,
    0,
    0,
    0,
    24,
    36,
    48,
    60,
    72,
    84,
    96,
    0,
    12,
    12,
    12,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    // The third part maps the current transition to a mask that needs to apply
    // to the byte.
    127,
    63,
    63,
    63,
    0,
    31,
    15,
    15,
    15,
    7,
    7,
    7
  ];
  function Sd(t) {
    var e = t.indexOf("%");
    if (e === -1) return t;
    for (var r = t.length, o = "", i = 0, s = 0, a = e, l = Ni; e > -1 && e < r; ) {
      var c = qi(t[e + 1], 4), d = qi(t[e + 2], 0), p = c | d, u = ao[p];
      if (l = ao[256 + l + u], s = s << 6 | p & ao[364 + u], l === Ni)
        o += t.slice(i, a), o += s <= 65535 ? String.fromCharCode(s) : String.fromCharCode(
          55232 + (s >> 10),
          56320 + (s & 1023)
        ), s = 0, i = e + 3, e = a = t.indexOf("%", i);
      else {
        if (l === bd)
          return null;
        if (e += 3, e < r && t.charCodeAt(e) === 37) continue;
        return null;
      }
    }
    return o + t.slice(i);
  }
  n(Sd, "decodeURIComponent");
  var xd = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15
  };
  function qi(t, e) {
    var r = xd[t];
    return r === void 0 ? 255 : r << e;
  }
  n(qi, "hexCodeToInt");
  Hi.exports = Sd;
});

// ../node_modules/picoquery/lib/parse.js
var Ui = q((ie) => {
  "use strict";
  var Td = ie && ie.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(ie, "__esModule", { value: !0 });
  ie.numberValueDeserializer = ie.numberKeyDeserializer = void 0;
  ie.parse = Ed;
  var Mt = so(), Re = kt(), Bi = Td($i()), wd = /* @__PURE__ */ n((t) => {
    let e = Number(t);
    return Number.isNaN(e) ? t : e;
  }, "numberKeyDeserializer");
  ie.numberKeyDeserializer = wd;
  var Rd = /* @__PURE__ */ n((t) => {
    let e = Number(t);
    return Number.isNaN(e) ? t : e;
  }, "numberValueDeserializer");
  ie.numberValueDeserializer = Rd;
  var Gi = /\+/g, zi = /* @__PURE__ */ n(function() {
  }, "Empty");
  zi.prototype = /* @__PURE__ */ Object.create(null);
  function Lt(t, e, r, o, i) {
    let s = t.substring(e, r);
    return o && (s = s.replace(Gi, " ")), i && (s = (0, Bi.default)(s) || s), s;
  }
  n(Lt, "computeKeySlice");
  function Ed(t, e) {
    let { valueDeserializer: r = Re.defaultOptions.valueDeserializer, keyDeserializer: o = Re.defaultOptions.keyDeserializer, arrayRepeatSyntax: i = Re.
    defaultOptions.arrayRepeatSyntax, nesting: s = Re.defaultOptions.nesting, arrayRepeat: a = Re.defaultOptions.arrayRepeat, nestingSyntax: l = Re.
    defaultOptions.nestingSyntax, delimiter: c = Re.defaultOptions.delimiter } = e ?? {}, d = typeof c == "string" ? c.charCodeAt(0) : c, p = l ===
    "js", u = new zi();
    if (typeof t != "string")
      return u;
    let f = t.length, h = "", g = -1, T = -1, x = -1, v = u, E, y = "", w = "", A = !1, P = !1, m = !1, b = !1, S = !1, C = !1, R = !1, I = 0,
    F = -1, k = -1, B = -1;
    for (let L = 0; L < f + 1; L++) {
      if (I = L !== f ? t.charCodeAt(L) : d, I === d) {
        if (R = T > g, R || (T = L), x !== T - 1 && (w = Lt(t, x + 1, F > -1 ? F : T, m, A), y = o(w), E !== void 0 && (v = (0, Mt.getDeepObject)(
        v, E, y, p && S, p && C))), R || y !== "") {
          R && (h = t.slice(T + 1, L), b && (h = h.replace(Gi, " ")), P && (h = (0, Bi.default)(h) || h));
          let X = r(h, y);
          if (a) {
            let ye = v[y];
            ye === void 0 ? F > -1 ? v[y] = [X] : v[y] = X : ye.pop ? ye.push(X) : v[y] = [ye, X];
          } else
            v[y] = X;
        }
        h = "", g = L, T = L, A = !1, P = !1, m = !1, b = !1, S = !1, C = !1, F = -1, x = L, v = u, E = void 0, y = "";
      } else I === 93 ? (a && i === "bracket" && B === 91 && (F = k), s && (l === "index" || p) && T <= g && (x !== k && (w = Lt(t, x + 1, L,
      m, A), y = o(w), E !== void 0 && (v = (0, Mt.getDeepObject)(v, E, y, void 0, p)), E = y, m = !1, A = !1), x = L, C = !0, S = !1)) : I ===
      46 ? s && (l === "dot" || p) && T <= g && (x !== k && (w = Lt(t, x + 1, L, m, A), y = o(w), E !== void 0 && (v = (0, Mt.getDeepObject)(
      v, E, y, p)), E = y, m = !1, A = !1), S = !0, C = !1, x = L) : I === 91 ? s && (l === "index" || p) && T <= g && (x !== k && (w = Lt(t,
      x + 1, L, m, A), y = o(w), p && E !== void 0 && (v = (0, Mt.getDeepObject)(v, E, y, p)), E = y, m = !1, A = !1, S = !1, C = !0), x = L) :
      I === 61 ? T <= g ? T = L : P = !0 : I === 43 ? T > g ? b = !0 : m = !0 : I === 37 && (T > g ? P = !0 : A = !0);
      k = L, B = I;
    }
    return u;
  }
  n(Ed, "parse");
});

// ../node_modules/picoquery/lib/stringify.js
var Vi = q((lo) => {
  "use strict";
  Object.defineProperty(lo, "__esModule", { value: !0 });
  lo.stringify = vd;
  var Ad = so();
  function vd(t, e) {
    if (t === null || typeof t != "object")
      return "";
    let r = e ?? {};
    return (0, Ad.stringifyObject)(t, r);
  }
  n(vd, "stringify");
});

// ../node_modules/picoquery/lib/main.js
var _t = q((K) => {
  "use strict";
  var Cd = K && K.__createBinding || (Object.create ? function(t, e, r, o) {
    o === void 0 && (o = r);
    var i = Object.getOwnPropertyDescriptor(e, r);
    (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: /* @__PURE__ */ n(function() {
      return e[r];
    }, "get") }), Object.defineProperty(t, o, i);
  } : function(t, e, r, o) {
    o === void 0 && (o = r), t[o] = e[r];
  }), Pd = K && K.__exportStar || function(t, e) {
    for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Cd(e, t, r);
  };
  Object.defineProperty(K, "__esModule", { value: !0 });
  K.stringify = K.parse = void 0;
  var Fd = Ui();
  Object.defineProperty(K, "parse", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return Fd.parse;
  }, "get") });
  var Id = Vi();
  Object.defineProperty(K, "stringify", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return Id.stringify;
  }, "get") });
  Pd(kt(), K);
});

// ../node_modules/entities/lib/maps/entities.json
var fo = q(($b, qd) => {
  qd.exports = { Aacute: "\xC1", aacute: "\xE1", Abreve: "\u0102", abreve: "\u0103", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", Acirc: "\
\xC2", acirc: "\xE2", acute: "\xB4", Acy: "\u0410", acy: "\u0430", AElig: "\xC6", aelig: "\xE6", af: "\u2061", Afr: "\u{1D504}", afr: "\u{1D51E}",
  Agrave: "\xC0", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", Alpha: "\u0391", alpha: "\u03B1", Amacr: "\u0100", amacr: "\u0101", amalg: "\
\u2A3F", amp: "&", AMP: "&", andand: "\u2A55", And: "\u2A53", and: "\u2227", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220",
  ange: "\u29A4", angle: "\u2220", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\
\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angmsd: "\u2221", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222",
  angst: "\xC5", angzarr: "\u237C", Aogon: "\u0104", aogon: "\u0105", Aopf: "\u{1D538}", aopf: "\u{1D552}", apacir: "\u2A6F", ap: "\u2248", apE: "\
\u2A70", ape: "\u224A", apid: "\u224B", apos: "'", ApplyFunction: "\u2061", approx: "\u2248", approxeq: "\u224A", Aring: "\xC5", aring: "\xE5",
  Ascr: "\u{1D49C}", ascr: "\u{1D4B6}", Assign: "\u2254", ast: "*", asymp: "\u2248", asympeq: "\u224D", Atilde: "\xC3", atilde: "\xE3", Auml: "\
\xC4", auml: "\xE4", awconint: "\u2233", awint: "\u2A11", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D",
  backsimeq: "\u22CD", Backslash: "\u2216", Barv: "\u2AE7", barvee: "\u22BD", barwed: "\u2305", Barwed: "\u2306", barwedge: "\u2305", bbrk: "\
\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", Bcy: "\u0411", bcy: "\u0431", bdquo: "\u201E", becaus: "\u2235", because: "\u2235", Because: "\
\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", Bernoullis: "\u212C", Beta: "\u0392", beta: "\u03B2", beth: "\u2136", between: "\
\u226C", Bfr: "\u{1D505}", bfr: "\u{1D51F}", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\
\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\
\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\
\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\
\u2261\u20E5", bNot: "\u2AED", bnot: "\u2310", Bopf: "\u{1D539}", bopf: "\u{1D553}", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxbox: "\
\u29C9", boxdl: "\u2510", boxdL: "\u2555", boxDl: "\u2556", boxDL: "\u2557", boxdr: "\u250C", boxdR: "\u2552", boxDr: "\u2553", boxDR: "\u2554",
  boxh: "\u2500", boxH: "\u2550", boxhd: "\u252C", boxHd: "\u2564", boxhD: "\u2565", boxHD: "\u2566", boxhu: "\u2534", boxHu: "\u2567", boxhU: "\
\u2568", boxHU: "\u2569", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxul: "\u2518", boxuL: "\u255B", boxUl: "\u255C", boxUL: "\
\u255D", boxur: "\u2514", boxuR: "\u2558", boxUr: "\u2559", boxUR: "\u255A", boxv: "\u2502", boxV: "\u2551", boxvh: "\u253C", boxvH: "\u256A",
  boxVh: "\u256B", boxVH: "\u256C", boxvl: "\u2524", boxvL: "\u2561", boxVl: "\u2562", boxVL: "\u2563", boxvr: "\u251C", boxvR: "\u255E", boxVr: "\
\u255F", boxVR: "\u2560", bprime: "\u2035", breve: "\u02D8", Breve: "\u02D8", brvbar: "\xA6", bscr: "\u{1D4B7}", Bscr: "\u212C", bsemi: "\u204F",
  bsim: "\u223D", bsime: "\u22CD", bsolb: "\u29C5", bsol: "\\", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpE: "\
\u2AAE", bumpe: "\u224F", Bumpeq: "\u224E", bumpeq: "\u224F", Cacute: "\u0106", cacute: "\u0107", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\
\u2A4B", cap: "\u2229", Cap: "\u22D2", capcup: "\u2A47", capdot: "\u2A40", CapitalDifferentialD: "\u2145", caps: "\u2229\uFE00", caret: "\u2041",
  caron: "\u02C7", Cayleys: "\u212D", ccaps: "\u2A4D", Ccaron: "\u010C", ccaron: "\u010D", Ccedil: "\xC7", ccedil: "\xE7", Ccirc: "\u0108", ccirc: "\
\u0109", Cconint: "\u2230", ccups: "\u2A4C", ccupssm: "\u2A50", Cdot: "\u010A", cdot: "\u010B", cedil: "\xB8", Cedilla: "\xB8", cemptyv: "\u29B2",
  cent: "\xA2", centerdot: "\xB7", CenterDot: "\xB7", cfr: "\u{1D520}", Cfr: "\u212D", CHcy: "\u0427", chcy: "\u0447", check: "\u2713", checkmark: "\
\u2713", Chi: "\u03A7", chi: "\u03C7", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledast: "\
\u229B", circledcirc: "\u229A", circleddash: "\u229D", CircleDot: "\u2299", circledR: "\xAE", circledS: "\u24C8", CircleMinus: "\u2296", CirclePlus: "\
\u2295", CircleTimes: "\u2297", cir: "\u25CB", cirE: "\u29C3", cire: "\u2257", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", ClockwiseContourIntegral: "\
\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", clubs: "\u2663", clubsuit: "\u2663", colon: ":", Colon: "\u2237", Colone: "\
\u2A74", colone: "\u2254", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102",
  cong: "\u2245", congdot: "\u2A6D", Congruent: "\u2261", conint: "\u222E", Conint: "\u222F", ContourIntegral: "\u222E", copf: "\u{1D554}", Copf: "\
\u2102", coprod: "\u2210", Coproduct: "\u2210", copy: "\xA9", COPY: "\xA9", copysr: "\u2117", CounterClockwiseContourIntegral: "\u2233", crarr: "\
\u21B5", cross: "\u2717", Cross: "\u2A2F", Cscr: "\u{1D49E}", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2",
  ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", cupbrcap: "\u2A48",
  cupcap: "\u2A46", CupCap: "\u224D", cup: "\u222A", Cup: "\u22D3", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00",
  curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xA4",
  curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D",
  dagger: "\u2020", Dagger: "\u2021", daleth: "\u2138", darr: "\u2193", Darr: "\u21A1", dArr: "\u21D3", dash: "\u2010", Dashv: "\u2AE4", dashv: "\
\u22A3", dbkarow: "\u290F", dblac: "\u02DD", Dcaron: "\u010E", dcaron: "\u010F", Dcy: "\u0414", dcy: "\u0434", ddagger: "\u2021", ddarr: "\u21CA",
  DD: "\u2145", dd: "\u2146", DDotrahd: "\u2911", ddotseq: "\u2A77", deg: "\xB0", Del: "\u2207", Delta: "\u0394", delta: "\u03B4", demptyv: "\
\u29B1", dfisht: "\u297F", Dfr: "\u{1D507}", dfr: "\u{1D521}", dHar: "\u2965", dharl: "\u21C3", dharr: "\u21C2", DiacriticalAcute: "\xB4", DiacriticalDot: "\
\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", diam: "\u22C4", diamond: "\u22C4", Diamond: "\u22C4",
  diamondsuit: "\u2666", diams: "\u2666", die: "\xA8", DifferentialD: "\u2146", digamma: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7",
  divideontimes: "\u22C7", divonx: "\u22C7", DJcy: "\u0402", djcy: "\u0452", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", Dopf: "\u{1D53B}",
  dopf: "\u{1D555}", Dot: "\xA8", dot: "\u02D9", DotDot: "\u20DC", doteq: "\u2250", doteqdot: "\u2251", DotEqual: "\u2250", dotminus: "\u2238",
  dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", DoubleContourIntegral: "\u222F", DoubleDot: "\xA8", DoubleDownArrow: "\u21D3",
  DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\
\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\
\u21D5", DoubleVerticalBar: "\u2225", DownArrowBar: "\u2913", downarrow: "\u2193", DownArrow: "\u2193", Downarrow: "\u21D3", DownArrowUpArrow: "\
\u21F5", DownBreve: "\u0311", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", DownLeftRightVector: "\u2950",
  DownLeftTeeVector: "\u295E", DownLeftVectorBar: "\u2956", DownLeftVector: "\u21BD", DownRightTeeVector: "\u295F", DownRightVectorBar: "\u2957",
  DownRightVector: "\u21C1", DownTeeArrow: "\u21A7", DownTee: "\u22A4", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", Dscr: "\u{1D49F}",
  dscr: "\u{1D4B9}", DScy: "\u0405", dscy: "\u0455", dsol: "\u29F6", Dstrok: "\u0110", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\
\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", DZcy: "\u040F", dzcy: "\u045F", dzigrarr: "\u27FF", Eacute: "\xC9", eacute: "\xE9",
  easter: "\u2A6E", Ecaron: "\u011A", ecaron: "\u011B", Ecirc: "\xCA", ecirc: "\xEA", ecir: "\u2256", ecolon: "\u2255", Ecy: "\u042D", ecy: "\
\u044D", eDDot: "\u2A77", Edot: "\u0116", edot: "\u0117", eDot: "\u2251", ee: "\u2147", efDot: "\u2252", Efr: "\u{1D508}", efr: "\u{1D522}",
  eg: "\u2A9A", Egrave: "\xC8", egrave: "\xE8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", Element: "\u2208", elinters: "\u23E7", ell: "\
\u2113", els: "\u2A95", elsdot: "\u2A97", Emacr: "\u0112", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", EmptySmallSquare: "\u25FB",
  emptyv: "\u2205", EmptyVerySmallSquare: "\u25AB", emsp13: "\u2004", emsp14: "\u2005", emsp: "\u2003", ENG: "\u014A", eng: "\u014B", ensp: "\
\u2002", Eogon: "\u0118", eogon: "\u0119", Eopf: "\u{1D53C}", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5",
  Epsilon: "\u0395", epsilon: "\u03B5", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\
\u2A95", Equal: "\u2A75", equals: "=", EqualTilde: "\u2242", equest: "\u225F", Equilibrium: "\u21CC", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\
\u29E5", erarr: "\u2971", erDot: "\u2253", escr: "\u212F", Escr: "\u2130", esdot: "\u2250", Esim: "\u2A73", esim: "\u2242", Eta: "\u0397", eta: "\
\u03B7", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", euro: "\u20AC", excl: "!", exist: "\u2203", Exists: "\u2203", expectation: "\u2130",
  exponentiale: "\u2147", ExponentialE: "\u2147", fallingdotseq: "\u2252", Fcy: "\u0424", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03",
  fflig: "\uFB00", ffllig: "\uFB04", Ffr: "\u{1D509}", ffr: "\u{1D523}", filig: "\uFB01", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\
\u25AA", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", Fopf: "\u{1D53D}", fopf: "\u{1D557}", forall: "\u2200",
  ForAll: "\u2200", fork: "\u22D4", forkv: "\u2AD9", Fouriertrf: "\u2131", fpartint: "\u2A0D", frac12: "\xBD", frac13: "\u2153", frac14: "\xBC",
  frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C",
  frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", fscr: "\u{1D4BB}", Fscr: "\u2131",
  gacute: "\u01F5", Gamma: "\u0393", gamma: "\u03B3", Gammad: "\u03DC", gammad: "\u03DD", gap: "\u2A86", Gbreve: "\u011E", gbreve: "\u011F",
  Gcedil: "\u0122", Gcirc: "\u011C", gcirc: "\u011D", Gcy: "\u0413", gcy: "\u0433", Gdot: "\u0120", gdot: "\u0121", ge: "\u2265", gE: "\u2267",
  gEl: "\u2A8C", gel: "\u22DB", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", gescc: "\u2AA9", ges: "\u2A7E", gesdot: "\u2A80", gesdoto: "\
\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", Gfr: "\u{1D50A}", gfr: "\u{1D524}", gg: "\u226B", Gg: "\u22D9", ggg: "\u22D9",
  gimel: "\u2137", GJcy: "\u0403", gjcy: "\u0453", gla: "\u2AA5", gl: "\u2277", glE: "\u2A92", glj: "\u2AA4", gnap: "\u2A8A", gnapprox: "\u2A8A",
  gne: "\u2A88", gnE: "\u2269", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", Gopf: "\u{1D53E}", gopf: "\u{1D558}", grave: "`", GreaterEqual: "\
\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E",
  GreaterTilde: "\u2273", Gscr: "\u{1D4A2}", gscr: "\u210A", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", gtcc: "\u2AA7", gtcir: "\u2A7A",
  gt: ">", GT: ">", Gt: "\u226B", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7",
  gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", Hacek: "\u02C7",
  hairsp: "\u200A", half: "\xBD", hamilt: "\u210B", HARDcy: "\u042A", hardcy: "\u044A", harrcir: "\u2948", harr: "\u2194", hArr: "\u21D4", harrw: "\
\u21AD", Hat: "^", hbar: "\u210F", Hcirc: "\u0124", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9",
  hfr: "\u{1D525}", Hfr: "\u210C", HilbertSpace: "\u210B", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\
\u21A9", hookrightarrow: "\u21AA", hopf: "\u{1D559}", Hopf: "\u210D", horbar: "\u2015", HorizontalLine: "\u2500", hscr: "\u{1D4BD}", Hscr: "\
\u210B", hslash: "\u210F", Hstrok: "\u0126", hstrok: "\u0127", HumpDownHump: "\u224E", HumpEqual: "\u224F", hybull: "\u2043", hyphen: "\u2010",
  Iacute: "\xCD", iacute: "\xED", ic: "\u2063", Icirc: "\xCE", icirc: "\xEE", Icy: "\u0418", icy: "\u0438", Idot: "\u0130", IEcy: "\u0415", iecy: "\
\u0435", iexcl: "\xA1", iff: "\u21D4", ifr: "\u{1D526}", Ifr: "\u2111", Igrave: "\xCC", igrave: "\xEC", ii: "\u2148", iiiint: "\u2A0C", iiint: "\
\u222D", iinfin: "\u29DC", iiota: "\u2129", IJlig: "\u0132", ijlig: "\u0133", Imacr: "\u012A", imacr: "\u012B", image: "\u2111", ImaginaryI: "\
\u2148", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", Im: "\u2111", imof: "\u22B7", imped: "\u01B5", Implies: "\u21D2", incare: "\
\u2105", in: "\u2208", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", intcal: "\u22BA", int: "\u222B", Int: "\u222C", integers: "\u2124",
  Integral: "\u222B", intercal: "\u22BA", Intersection: "\u22C2", intlarhk: "\u2A17", intprod: "\u2A3C", InvisibleComma: "\u2063", InvisibleTimes: "\
\u2062", IOcy: "\u0401", iocy: "\u0451", Iogon: "\u012E", iogon: "\u012F", Iopf: "\u{1D540}", iopf: "\u{1D55A}", Iota: "\u0399", iota: "\u03B9",
  iprod: "\u2A3C", iquest: "\xBF", iscr: "\u{1D4BE}", Iscr: "\u2110", isin: "\u2208", isindot: "\u22F5", isinE: "\u22F9", isins: "\u22F4", isinsv: "\
\u22F3", isinv: "\u2208", it: "\u2062", Itilde: "\u0128", itilde: "\u0129", Iukcy: "\u0406", iukcy: "\u0456", Iuml: "\xCF", iuml: "\xEF", Jcirc: "\
\u0134", jcirc: "\u0135", Jcy: "\u0419", jcy: "\u0439", Jfr: "\u{1D50D}", jfr: "\u{1D527}", jmath: "\u0237", Jopf: "\u{1D541}", jopf: "\u{1D55B}",
  Jscr: "\u{1D4A5}", jscr: "\u{1D4BF}", Jsercy: "\u0408", jsercy: "\u0458", Jukcy: "\u0404", jukcy: "\u0454", Kappa: "\u039A", kappa: "\u03BA",
  kappav: "\u03F0", Kcedil: "\u0136", kcedil: "\u0137", Kcy: "\u041A", kcy: "\u043A", Kfr: "\u{1D50E}", kfr: "\u{1D528}", kgreen: "\u0138", KHcy: "\
\u0425", khcy: "\u0445", KJcy: "\u040C", kjcy: "\u045C", Kopf: "\u{1D542}", kopf: "\u{1D55C}", Kscr: "\u{1D4A6}", kscr: "\u{1D4C0}", lAarr: "\
\u21DA", Lacute: "\u0139", lacute: "\u013A", laemptyv: "\u29B4", lagran: "\u2112", Lambda: "\u039B", lambda: "\u03BB", lang: "\u27E8", Lang: "\
\u27EA", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", Laplacetrf: "\u2112", laquo: "\xAB", larrb: "\u21E4", larrbfs: "\u291F", larr: "\u2190",
  Larr: "\u219E", lArr: "\u21D0", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2",
  latail: "\u2919", lAtail: "\u291B", lat: "\u2AAB", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lBarr: "\u290E", lbbrk: "\u2772",
  lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", Lcaron: "\u013D", lcaron: "\u013E", Lcedil: "\u013B", lcedil: "\
\u013C", lceil: "\u2308", lcub: "{", Lcy: "\u041B", lcy: "\u043B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\
\u294B", ldsh: "\u21B2", le: "\u2264", lE: "\u2266", LeftAngleBracket: "\u27E8", LeftArrowBar: "\u21E4", leftarrow: "\u2190", LeftArrow: "\u2190",
  Leftarrow: "\u21D0", LeftArrowRightArrow: "\u21C6", leftarrowtail: "\u21A2", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\
\u2961", LeftDownVectorBar: "\u2959", LeftDownVector: "\u21C3", LeftFloor: "\u230A", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\
\u21C7", leftrightarrow: "\u2194", LeftRightArrow: "\u2194", Leftrightarrow: "\u21D4", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB",
  leftrightsquigarrow: "\u21AD", LeftRightVector: "\u294E", LeftTeeArrow: "\u21A4", LeftTee: "\u22A3", LeftTeeVector: "\u295A", leftthreetimes: "\
\u22CB", LeftTriangleBar: "\u29CF", LeftTriangle: "\u22B2", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960",
  LeftUpVectorBar: "\u2958", LeftUpVector: "\u21BF", LeftVectorBar: "\u2952", LeftVector: "\u21BC", lEg: "\u2A8B", leg: "\u22DA", leq: "\u2264",
  leqq: "\u2266", leqslant: "\u2A7D", lescc: "\u2AA8", les: "\u2A7D", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00",
  lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", LessEqualGreater: "\u22DA", LessFullEqual: "\
\u2266", LessGreater: "\u2276", lessgtr: "\u2276", LessLess: "\u2AA1", lesssim: "\u2272", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", lfisht: "\
\u297C", lfloor: "\u230A", Lfr: "\u{1D50F}", lfr: "\u{1D529}", lg: "\u2276", lgE: "\u2A91", lHar: "\u2962", lhard: "\u21BD", lharu: "\u21BC",
  lharul: "\u296A", lhblk: "\u2584", LJcy: "\u0409", ljcy: "\u0459", llarr: "\u21C7", ll: "\u226A", Ll: "\u22D8", llcorner: "\u231E", Lleftarrow: "\
\u21DA", llhard: "\u296B", lltri: "\u25FA", Lmidot: "\u013F", lmidot: "\u0140", lmoustache: "\u23B0", lmoust: "\u23B0", lnap: "\u2A89", lnapprox: "\
\u2A89", lne: "\u2A87", lnE: "\u2268", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", longleftarrow: "\
\u27F5", LongLeftArrow: "\u27F5", Longleftarrow: "\u27F8", longleftrightarrow: "\u27F7", LongLeftRightArrow: "\u27F7", Longleftrightarrow: "\
\u27FA", longmapsto: "\u27FC", longrightarrow: "\u27F6", LongRightArrow: "\u27F6", Longrightarrow: "\u27F9", looparrowleft: "\u21AB", looparrowright: "\
\u21AC", lopar: "\u2985", Lopf: "\u{1D543}", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", LowerLeftArrow: "\
\u2199", LowerRightArrow: "\u2198", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\
\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\u{1D4C1}", Lscr: "\u2112", lsh: "\u21B0",
  Lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", Lstrok: "\u0141", lstrok: "\
\u0142", ltcc: "\u2AA6", ltcir: "\u2A79", lt: "<", LT: "<", Lt: "\u226A", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976",
  ltquest: "\u2A7B", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", ltrPar: "\u2996", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\
\u2268\uFE00", lvnE: "\u2268\uFE00", macr: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", Map: "\u2905", map: "\u21A6", mapsto: "\
\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", Mcy: "\u041C", mcy: "\u043C", mdash: "\
\u2014", mDDot: "\u223A", measuredangle: "\u2221", MediumSpace: "\u205F", Mellintrf: "\u2133", Mfr: "\u{1D510}", mfr: "\u{1D52A}", mho: "\u2127",
  micro: "\xB5", midast: "*", midcir: "\u2AF0", mid: "\u2223", middot: "\xB7", minusb: "\u229F", minus: "\u2212", minusd: "\u2238", minusdu: "\
\u2A2A", MinusPlus: "\u2213", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", Mopf: "\u{1D544}", mopf: "\u{1D55E}", mp: "\
\u2213", mscr: "\u{1D4C2}", Mscr: "\u2133", mstpos: "\u223E", Mu: "\u039C", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nabla: "\u2207",
  Nacute: "\u0143", nacute: "\u0144", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\
\u2249", natural: "\u266E", naturals: "\u2115", natur: "\u266E", nbsp: "\xA0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43",
  Ncaron: "\u0147", ncaron: "\u0148", Ncedil: "\u0145", ncedil: "\u0146", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", Ncy: "\u041D",
  ncy: "\u043D", ndash: "\u2013", nearhk: "\u2924", nearr: "\u2197", neArr: "\u21D7", nearrow: "\u2197", ne: "\u2260", nedot: "\u2250\u0338",
  NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", nequiv: "\u2262",
  nesear: "\u2928", nesim: "\u2242\u0338", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: `
`, nexist: "\u2204", nexists: "\u2204", Nfr: "\u{1D511}", nfr: "\u{1D52B}", ngE: "\u2267\u0338", nge: "\u2271", ngeq: "\u2271", ngeqq: "\u2267\u0338",
  ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", nGg: "\u22D9\u0338", ngsim: "\u2275", nGt: "\u226B\u20D2", ngt: "\u226F", ngtr: "\u226F",
  nGtv: "\u226B\u0338", nharr: "\u21AE", nhArr: "\u21CE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", NJcy: "\
\u040A", njcy: "\u045A", nlarr: "\u219A", nlArr: "\u21CD", nldr: "\u2025", nlE: "\u2266\u0338", nle: "\u2270", nleftarrow: "\u219A", nLeftarrow: "\
\u21CD", nleftrightarrow: "\u21AE", nLeftrightarrow: "\u21CE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338",
  nless: "\u226E", nLl: "\u22D8\u0338", nlsim: "\u2274", nLt: "\u226A\u20D2", nlt: "\u226E", nltri: "\u22EA", nltrie: "\u22EC", nLtv: "\u226A\u0338",
  nmid: "\u2224", NoBreak: "\u2060", NonBreakingSpace: "\xA0", nopf: "\u{1D55F}", Nopf: "\u2115", Not: "\u2AEC", not: "\xAC", NotCongruent: "\
\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\
\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\
\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", notin: "\
\u2209", notindot: "\u22F5\u0338", notinE: "\u22F9\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", NotLeftTriangleBar: "\u29CF\u0338",
  NotLeftTriangle: "\u22EA", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\
\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338",
  notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\
\u22E0", NotReverseElement: "\u220C", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangle: "\u22EB", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\
\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2",
  NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338",
  NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\
\u2249", NotVerticalBar: "\u2224", nparallel: "\u2226", npar: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\
\u2280", nprcue: "\u22E0", nprec: "\u2280", npreceq: "\u2AAF\u0338", npre: "\u2AAF\u0338", nrarrc: "\u2933\u0338", nrarr: "\u219B", nrArr: "\
\u21CF", nrarrw: "\u219D\u0338", nrightarrow: "\u219B", nRightarrow: "\u21CF", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1",
  nsce: "\u2AB0\u0338", Nscr: "\u{1D4A9}", nscr: "\u{1D4C3}", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244",
  nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsube: "\u2288",
  nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupE: "\
\u2AC6\u0338", nsupe: "\u2289", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", Ntilde: "\xD1", ntilde: "\
\xF1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", Nu: "\u039D",
  nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvDash: "\u22AD", nVdash: "\u22AE", nVDash: "\
\u22AF", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvHarr: "\u2904", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2",
  nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwarhk: "\u2923", nwarr: "\u2196", nwArr: "\u21D6",
  nwarrow: "\u2196", nwnear: "\u2927", Oacute: "\xD3", oacute: "\xF3", oast: "\u229B", Ocirc: "\xD4", ocirc: "\xF4", ocir: "\u229A", Ocy: "\u041E",
  ocy: "\u043E", odash: "\u229D", Odblac: "\u0150", odblac: "\u0151", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", OElig: "\u0152", oelig: "\
\u0153", ofcir: "\u29BF", Ofr: "\u{1D512}", ofr: "\u{1D52C}", ogon: "\u02DB", Ograve: "\xD2", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5",
  ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", Omacr: "\u014C", omacr: "\
\u014D", Omega: "\u03A9", omega: "\u03C9", Omicron: "\u039F", omicron: "\u03BF", omid: "\u29B6", ominus: "\u2296", Oopf: "\u{1D546}", oopf: "\
\u{1D560}", opar: "\u29B7", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", operp: "\u29B9", oplus: "\u2295", orarr: "\u21BB", Or: "\
\u2A54", or: "\u2228", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\
\u2A57", orv: "\u2A5B", oS: "\u24C8", Oscr: "\u{1D4AA}", oscr: "\u2134", Oslash: "\xD8", oslash: "\xF8", osol: "\u2298", Otilde: "\xD5", otilde: "\
\xF5", otimesas: "\u2A36", Otimes: "\u2A37", otimes: "\u2297", Ouml: "\xD6", ouml: "\xF6", ovbar: "\u233D", OverBar: "\u203E", OverBrace: "\u23DE",
  OverBracket: "\u23B4", OverParenthesis: "\u23DC", para: "\xB6", parallel: "\u2225", par: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\
\u2202", PartialD: "\u2202", Pcy: "\u041F", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", Pfr: "\
\u{1D513}", pfr: "\u{1D52D}", Phi: "\u03A6", phi: "\u03C6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", Pi: "\u03A0", pi: "\u03C0", pitchfork: "\
\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plus: "\
+", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", PlusMinus: "\xB1", plusmn: "\xB1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xB1",
  Poincareplane: "\u210C", pointint: "\u2A15", popf: "\u{1D561}", Popf: "\u2119", pound: "\xA3", prap: "\u2AB7", Pr: "\u2ABB", pr: "\u227A",
  prcue: "\u227C", precapprox: "\u2AB7", prec: "\u227A", preccurlyeq: "\u227C", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\
\u227C", PrecedesTilde: "\u227E", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", pre: "\u2AAF", prE: "\u2AB3",
  precsim: "\u227E", prime: "\u2032", Prime: "\u2033", primes: "\u2119", prnap: "\u2AB9", prnE: "\u2AB5", prnsim: "\u22E8", prod: "\u220F", Product: "\
\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", Proportional: "\u221D", Proportion: "\u2237", propto: "\
\u221D", prsim: "\u227E", prurel: "\u22B0", Pscr: "\u{1D4AB}", pscr: "\u{1D4C5}", Psi: "\u03A8", psi: "\u03C8", puncsp: "\u2008", Qfr: "\u{1D514}",
  qfr: "\u{1D52E}", qint: "\u2A0C", qopf: "\u{1D562}", Qopf: "\u211A", qprime: "\u2057", Qscr: "\u{1D4AC}", qscr: "\u{1D4C6}", quaternions: "\
\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", quot: '"', QUOT: '"', rAarr: "\u21DB", race: "\u223D\u0331", Racute: "\u0154", racute: "\
\u0155", radic: "\u221A", raemptyv: "\u29B3", rang: "\u27E9", Rang: "\u27EB", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xBB",
  rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarr: "\u2192", Rarr: "\u21A0", rArr: "\u21D2", rarrfs: "\u291E", rarrhk: "\
\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", Rarrtl: "\u2916", rarrtl: "\u21A3", rarrw: "\u219D", ratail: "\u291A", rAtail: "\
\u291C", ratio: "\u2236", rationals: "\u211A", rbarr: "\u290D", rBarr: "\u290F", RBarr: "\u2910", rbbrk: "\u2773", rbrace: "}", rbrack: "]",
  rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", Rcaron: "\u0158", rcaron: "\u0159", Rcedil: "\u0156", rcedil: "\u0157", rceil: "\u2309",
  rcub: "}", Rcy: "\u0420", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", real: "\u211C",
  realine: "\u211B", realpart: "\u211C", reals: "\u211D", Re: "\u211C", rect: "\u25AD", reg: "\xAE", REG: "\xAE", ReverseElement: "\u220B", ReverseEquilibrium: "\
\u21CB", ReverseUpEquilibrium: "\u296F", rfisht: "\u297D", rfloor: "\u230B", rfr: "\u{1D52F}", Rfr: "\u211C", rHar: "\u2964", rhard: "\u21C1",
  rharu: "\u21C0", rharul: "\u296C", Rho: "\u03A1", rho: "\u03C1", rhov: "\u03F1", RightAngleBracket: "\u27E9", RightArrowBar: "\u21E5", rightarrow: "\
\u2192", RightArrow: "\u2192", Rightarrow: "\u21D2", RightArrowLeftArrow: "\u21C4", rightarrowtail: "\u21A3", RightCeiling: "\u2309", RightDoubleBracket: "\
\u27E7", RightDownTeeVector: "\u295D", RightDownVectorBar: "\u2955", RightDownVector: "\u21C2", RightFloor: "\u230B", rightharpoondown: "\u21C1",
  rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", RightTeeArrow: "\
\u21A6", RightTee: "\u22A2", RightTeeVector: "\u295B", rightthreetimes: "\u22CC", RightTriangleBar: "\u29D0", RightTriangle: "\u22B3", RightTriangleEqual: "\
\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVectorBar: "\u2954", RightUpVector: "\u21BE", RightVectorBar: "\u2953",
  RightVector: "\u21C0", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoustache: "\u23B1", rmoust: "\
\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", ropf: "\u{1D563}", Ropf: "\u211D", roplus: "\u2A2E",
  rotimes: "\u2A35", RoundImplies: "\u2970", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", Rrightarrow: "\u21DB", rsaquo: "\
\u203A", rscr: "\u{1D4C7}", Rscr: "\u211B", rsh: "\u21B1", Rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\
\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", RuleDelayed: "\u29F4", ruluhar: "\u2968", rx: "\u211E", Sacute: "\
\u015A", sacute: "\u015B", sbquo: "\u201A", scap: "\u2AB8", Scaron: "\u0160", scaron: "\u0161", Sc: "\u2ABC", sc: "\u227B", sccue: "\u227D",
  sce: "\u2AB0", scE: "\u2AB4", Scedil: "\u015E", scedil: "\u015F", Scirc: "\u015C", scirc: "\u015D", scnap: "\u2ABA", scnE: "\u2AB6", scnsim: "\
\u22E9", scpolint: "\u2A13", scsim: "\u227F", Scy: "\u0421", scy: "\u0441", sdotb: "\u22A1", sdot: "\u22C5", sdote: "\u2A66", searhk: "\u2925",
  searr: "\u2198", seArr: "\u21D8", searrow: "\u2198", sect: "\xA7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\
\u2736", Sfr: "\u{1D516}", sfr: "\u{1D530}", sfrown: "\u2322", sharp: "\u266F", SHCHcy: "\u0429", shchcy: "\u0449", SHcy: "\u0428", shcy: "\u0448",
  ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", shortmid: "\u2223", shortparallel: "\u2225", ShortRightArrow: "\u2192", ShortUpArrow: "\
\u2191", shy: "\xAD", Sigma: "\u03A3", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243",
  simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\
\u2190", SmallCircle: "\u2218", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA",
  smte: "\u2AAC", smtes: "\u2AAC\uFE00", SOFTcy: "\u042C", softcy: "\u044C", solbar: "\u233F", solb: "\u29C4", sol: "/", Sopf: "\u{1D54A}", sopf: "\
\u{1D564}", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00",
  Sqrt: "\u221A", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\
\u2290", sqsupseteq: "\u2292", square: "\u25A1", Square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\
\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", squarf: "\u25AA", squ: "\u25A1", squf: "\u25AA", srarr: "\
\u2192", Sscr: "\u{1D4AE}", sscr: "\u{1D4C8}", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", Star: "\u22C6", star: "\u2606", starf: "\
\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xAF", sub: "\u2282", Sub: "\u22D0", subdot: "\u2ABD", subE: "\u2AC5", sube: "\
\u2286", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subne: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", subset: "\u2282", Subset: "\
\u22D0", subseteq: "\u2286", subseteqq: "\u2AC5", SubsetEqual: "\u2286", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\
\u2AD5", subsup: "\u2AD3", succapprox: "\u2AB8", succ: "\u227B", succcurlyeq: "\u227D", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\
\u227D", SucceedsTilde: "\u227F", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", SuchThat: "\
\u220B", sum: "\u2211", Sum: "\u2211", sung: "\u266A", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", sup: "\u2283", Sup: "\u22D1", supdot: "\u2ABE",
  supdsub: "\u2AD8", supE: "\u2AC6", supe: "\u2287", supedot: "\u2AC4", Superset: "\u2283", SupersetEqual: "\u2287", suphsol: "\u27C9", suphsub: "\
\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supne: "\u228B", supplus: "\u2AC0", supset: "\u2283", Supset: "\u22D1", supseteq: "\
\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swarhk: "\u2926",
  swarr: "\u2199", swArr: "\u21D9", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xDF", Tab: "	", target: "\u2316", Tau: "\u03A4", tau: "\u03C4",
  tbrk: "\u23B4", Tcaron: "\u0164", tcaron: "\u0165", Tcedil: "\u0162", tcedil: "\u0163", Tcy: "\u0422", tcy: "\u0442", tdot: "\u20DB", telrec: "\
\u2315", Tfr: "\u{1D517}", tfr: "\u{1D531}", there4: "\u2234", therefore: "\u2234", Therefore: "\u2234", Theta: "\u0398", theta: "\u03B8", thetasym: "\
\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", ThickSpace: "\u205F\u200A", ThinSpace: "\u2009", thinsp: "\u2009", thkap: "\
\u2248", thksim: "\u223C", THORN: "\xDE", thorn: "\xFE", tilde: "\u02DC", Tilde: "\u223C", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\
\u2248", timesbar: "\u2A31", timesb: "\u22A0", times: "\xD7", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", topbot: "\u2336", topcir: "\u2AF1",
  top: "\u22A4", Topf: "\u{1D54B}", topf: "\u{1D565}", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", trade: "\u2122", TRADE: "\u2122",
  triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9",
  trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", TripleDot: "\u20DB", triplus: "\u2A39", trisb: "\u29CD", tritime: "\
\u2A3B", trpezium: "\u23E2", Tscr: "\u{1D4AF}", tscr: "\u{1D4C9}", TScy: "\u0426", tscy: "\u0446", TSHcy: "\u040B", tshcy: "\u045B", Tstrok: "\
\u0166", tstrok: "\u0167", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", Uacute: "\xDA", uacute: "\xFA", uarr: "\
\u2191", Uarr: "\u219F", uArr: "\u21D1", Uarrocir: "\u2949", Ubrcy: "\u040E", ubrcy: "\u045E", Ubreve: "\u016C", ubreve: "\u016D", Ucirc: "\xDB",
  ucirc: "\xFB", Ucy: "\u0423", ucy: "\u0443", udarr: "\u21C5", Udblac: "\u0170", udblac: "\u0171", udhar: "\u296E", ufisht: "\u297E", Ufr: "\
\u{1D518}", ufr: "\u{1D532}", Ugrave: "\xD9", ugrave: "\xF9", uHar: "\u2963", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C",
  ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", Umacr: "\u016A", umacr: "\u016B", uml: "\xA8", UnderBar: "_", UnderBrace: "\u23DF",
  UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", Uogon: "\u0172", uogon: "\u0173", Uopf: "\u{1D54C}",
  uopf: "\u{1D566}", UpArrowBar: "\u2912", uparrow: "\u2191", UpArrow: "\u2191", Uparrow: "\u21D1", UpArrowDownArrow: "\u21C5", updownarrow: "\
\u2195", UpDownArrow: "\u2195", Updownarrow: "\u21D5", UpEquilibrium: "\u296E", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E",
  UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", upsi: "\u03C5", Upsi: "\u03D2", upsih: "\u03D2", Upsilon: "\u03A5", upsilon: "\u03C5",
  UpTeeArrow: "\u21A5", UpTee: "\u22A5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", Uring: "\u016E", uring: "\
\u016F", urtri: "\u25F9", Uscr: "\u{1D4B0}", uscr: "\u{1D4CA}", utdot: "\u22F0", Utilde: "\u0168", utilde: "\u0169", utri: "\u25B5", utrif: "\
\u25B4", uuarr: "\u21C8", Uuml: "\xDC", uuml: "\xFC", uwangle: "\u29A7", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\
\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", varr: "\u2195", vArr: "\u21D5", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\
\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\
\u22B2", vartriangleright: "\u22B3", vBar: "\u2AE8", Vbar: "\u2AEB", vBarv: "\u2AE9", Vcy: "\u0412", vcy: "\u0432", vdash: "\u22A2", vDash: "\
\u22A8", Vdash: "\u22A9", VDash: "\u22AB", Vdashl: "\u2AE6", veebar: "\u22BB", vee: "\u2228", Vee: "\u22C1", veeeq: "\u225A", vellip: "\u22EE",
  verbar: "|", Verbar: "\u2016", vert: "|", Vert: "\u2016", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\
\u2240", VeryThinSpace: "\u200A", Vfr: "\u{1D519}", vfr: "\u{1D533}", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", Vopf: "\
\u{1D54D}", vopf: "\u{1D567}", vprop: "\u221D", vrtri: "\u22B3", Vscr: "\u{1D4B1}", vscr: "\u{1D4CB}", vsubnE: "\u2ACB\uFE00", vsubne: "\u228A\uFE00",
  vsupnE: "\u2ACC\uFE00", vsupne: "\u228B\uFE00", Vvdash: "\u22AA", vzigzag: "\u299A", Wcirc: "\u0174", wcirc: "\u0175", wedbar: "\u2A5F", wedge: "\
\u2227", Wedge: "\u22C0", wedgeq: "\u2259", weierp: "\u2118", Wfr: "\u{1D51A}", wfr: "\u{1D534}", Wopf: "\u{1D54E}", wopf: "\u{1D568}", wp: "\
\u2118", wr: "\u2240", wreath: "\u2240", Wscr: "\u{1D4B2}", wscr: "\u{1D4CC}", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD",
  Xfr: "\u{1D51B}", xfr: "\u{1D535}", xharr: "\u27F7", xhArr: "\u27FA", Xi: "\u039E", xi: "\u03BE", xlarr: "\u27F5", xlArr: "\u27F8", xmap: "\
\u27FC", xnis: "\u22FB", xodot: "\u2A00", Xopf: "\u{1D54F}", xopf: "\u{1D569}", xoplus: "\u2A01", xotime: "\u2A02", xrarr: "\u27F6", xrArr: "\
\u27F9", Xscr: "\u{1D4B3}", xscr: "\u{1D4CD}", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", Yacute: "\
\xDD", yacute: "\xFD", YAcy: "\u042F", yacy: "\u044F", Ycirc: "\u0176", ycirc: "\u0177", Ycy: "\u042B", ycy: "\u044B", yen: "\xA5", Yfr: "\u{1D51C}",
  yfr: "\u{1D536}", YIcy: "\u0407", yicy: "\u0457", Yopf: "\u{1D550}", yopf: "\u{1D56A}", Yscr: "\u{1D4B4}", yscr: "\u{1D4CE}", YUcy: "\u042E",
  yucy: "\u044E", yuml: "\xFF", Yuml: "\u0178", Zacute: "\u0179", zacute: "\u017A", Zcaron: "\u017D", zcaron: "\u017E", Zcy: "\u0417", zcy: "\
\u0437", Zdot: "\u017B", zdot: "\u017C", zeetrf: "\u2128", ZeroWidthSpace: "\u200B", Zeta: "\u0396", zeta: "\u03B6", zfr: "\u{1D537}", Zfr: "\
\u2128", ZHcy: "\u0416", zhcy: "\u0436", zigrarr: "\u21DD", zopf: "\u{1D56B}", Zopf: "\u2124", Zscr: "\u{1D4B5}", zscr: "\u{1D4CF}", zwj: "\u200D",
  zwnj: "\u200C" };
});

// ../node_modules/entities/lib/maps/legacy.json
var Qi = q((Bb, Hd) => {
  Hd.exports = { Aacute: "\xC1", aacute: "\xE1", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", AElig: "\xC6", aelig: "\xE6", Agrave: "\xC0", agrave: "\
\xE0", amp: "&", AMP: "&", Aring: "\xC5", aring: "\xE5", Atilde: "\xC3", atilde: "\xE3", Auml: "\xC4", auml: "\xE4", brvbar: "\xA6", Ccedil: "\
\xC7", ccedil: "\xE7", cedil: "\xB8", cent: "\xA2", copy: "\xA9", COPY: "\xA9", curren: "\xA4", deg: "\xB0", divide: "\xF7", Eacute: "\xC9",
  eacute: "\xE9", Ecirc: "\xCA", ecirc: "\xEA", Egrave: "\xC8", egrave: "\xE8", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", frac12: "\
\xBD", frac14: "\xBC", frac34: "\xBE", gt: ">", GT: ">", Iacute: "\xCD", iacute: "\xED", Icirc: "\xCE", icirc: "\xEE", iexcl: "\xA1", Igrave: "\
\xCC", igrave: "\xEC", iquest: "\xBF", Iuml: "\xCF", iuml: "\xEF", laquo: "\xAB", lt: "<", LT: "<", macr: "\xAF", micro: "\xB5", middot: "\xB7",
  nbsp: "\xA0", not: "\xAC", Ntilde: "\xD1", ntilde: "\xF1", Oacute: "\xD3", oacute: "\xF3", Ocirc: "\xD4", ocirc: "\xF4", Ograve: "\xD2", ograve: "\
\xF2", ordf: "\xAA", ordm: "\xBA", Oslash: "\xD8", oslash: "\xF8", Otilde: "\xD5", otilde: "\xF5", Ouml: "\xD6", ouml: "\xF6", para: "\xB6",
  plusmn: "\xB1", pound: "\xA3", quot: '"', QUOT: '"', raquo: "\xBB", reg: "\xAE", REG: "\xAE", sect: "\xA7", shy: "\xAD", sup1: "\xB9", sup2: "\
\xB2", sup3: "\xB3", szlig: "\xDF", THORN: "\xDE", thorn: "\xFE", times: "\xD7", Uacute: "\xDA", uacute: "\xFA", Ucirc: "\xDB", ucirc: "\xFB",
  Ugrave: "\xD9", ugrave: "\xF9", uml: "\xA8", Uuml: "\xDC", uuml: "\xFC", Yacute: "\xDD", yacute: "\xFD", yen: "\xA5", yuml: "\xFF" };
});

// ../node_modules/entities/lib/maps/xml.json
var mo = q((Gb, $d) => {
  $d.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
});

// ../node_modules/entities/lib/maps/decode.json
var es = q((zb, Bd) => {
  Bd.exports = { "0": 65533, "128": 8364, "130": 8218, "131": 402, "132": 8222, "133": 8230, "134": 8224, "135": 8225, "136": 710, "137": 8240,
  "138": 352, "139": 8249, "140": 338, "142": 381, "145": 8216, "146": 8217, "147": 8220, "148": 8221, "149": 8226, "150": 8211, "151": 8212,
  "152": 732, "153": 8482, "154": 353, "155": 8250, "156": 339, "158": 382, "159": 376 };
});

// ../node_modules/entities/lib/decode_codepoint.js
var rs = q((at) => {
  "use strict";
  var Gd = at && at.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(at, "__esModule", { value: !0 });
  var ts = Gd(es()), zd = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.fromCodePoint || function(t) {
      var e = "";
      return t > 65535 && (t -= 65536, e += String.fromCharCode(t >>> 10 & 1023 | 55296), t = 56320 | t & 1023), e += String.fromCharCode(t),
      e;
    }
  );
  function Ud(t) {
    return t >= 55296 && t <= 57343 || t > 1114111 ? "\uFFFD" : (t in ts.default && (t = ts.default[t]), zd(t));
  }
  n(Ud, "decodeCodePoint");
  at.default = Ud;
});

// ../node_modules/entities/lib/decode.js
var ho = q((te) => {
  "use strict";
  var jt = te && te.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(te, "__esModule", { value: !0 });
  te.decodeHTML = te.decodeHTMLStrict = te.decodeXML = void 0;
  var yo = jt(fo()), Vd = jt(Qi()), Wd = jt(mo()), os = jt(rs()), Yd = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
  te.decodeXML = is(Wd.default);
  te.decodeHTMLStrict = is(yo.default);
  function is(t) {
    var e = ss(t);
    return function(r) {
      return String(r).replace(Yd, e);
    };
  }
  n(is, "getStrictDecoder");
  var ns = /* @__PURE__ */ n(function(t, e) {
    return t < e ? 1 : -1;
  }, "sorter");
  te.decodeHTML = function() {
    for (var t = Object.keys(Vd.default).sort(ns), e = Object.keys(yo.default).sort(ns), r = 0, o = 0; r < e.length; r++)
      t[o] === e[r] ? (e[r] += ";?", o++) : e[r] += ";";
    var i = new RegExp("&(?:" + e.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), s = ss(yo.default);
    function a(l) {
      return l.substr(-1) !== ";" && (l += ";"), s(l);
    }
    return n(a, "replacer"), function(l) {
      return String(l).replace(i, a);
    };
  }();
  function ss(t) {
    return /* @__PURE__ */ n(function(r) {
      if (r.charAt(1) === "#") {
        var o = r.charAt(2);
        return o === "X" || o === "x" ? os.default(parseInt(r.substr(3), 16)) : os.default(parseInt(r.substr(2), 10));
      }
      return t[r.slice(1, -1)] || r;
    }, "replace");
  }
  n(ss, "getReplacer");
});

// ../node_modules/entities/lib/encode.js
var bo = q((G) => {
  "use strict";
  var as = G && G.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(G, "__esModule", { value: !0 });
  G.escapeUTF8 = G.escape = G.encodeNonAsciiHTML = G.encodeHTML = G.encodeXML = void 0;
  var Kd = as(mo()), ls = ds(Kd.default), cs = ps(ls);
  G.encodeXML = ms(ls);
  var Xd = as(fo()), go = ds(Xd.default), Jd = ps(go);
  G.encodeHTML = Qd(go, Jd);
  G.encodeNonAsciiHTML = ms(go);
  function ds(t) {
    return Object.keys(t).sort().reduce(function(e, r) {
      return e[t[r]] = "&" + r + ";", e;
    }, {});
  }
  n(ds, "getInverseObj");
  function ps(t) {
    for (var e = [], r = [], o = 0, i = Object.keys(t); o < i.length; o++) {
      var s = i[o];
      s.length === 1 ? e.push("\\" + s) : r.push(s);
    }
    e.sort();
    for (var a = 0; a < e.length - 1; a++) {
      for (var l = a; l < e.length - 1 && e[l].charCodeAt(1) + 1 === e[l + 1].charCodeAt(1); )
        l += 1;
      var c = 1 + l - a;
      c < 3 || e.splice(a, c, e[a] + "-" + e[l]);
    }
    return r.unshift("[" + e.join("") + "]"), new RegExp(r.join("|"), "g");
  }
  n(ps, "getInverseReplacer");
  var us = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
  Zd = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.prototype.codePointAt != null ? (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      function(t) {
        return t.codePointAt(0);
      }
    ) : (
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      function(t) {
        return (t.charCodeAt(0) - 55296) * 1024 + t.charCodeAt(1) - 56320 + 65536;
      }
    )
  );
  function Nt(t) {
    return "&#x" + (t.length > 1 ? Zd(t) : t.charCodeAt(0)).toString(16).toUpperCase() + ";";
  }
  n(Nt, "singleCharReplacer");
  function Qd(t, e) {
    return function(r) {
      return r.replace(e, function(o) {
        return t[o];
      }).replace(us, Nt);
    };
  }
  n(Qd, "getInverse");
  var fs = new RegExp(cs.source + "|" + us.source, "g");
  function ep(t) {
    return t.replace(fs, Nt);
  }
  n(ep, "escape");
  G.escape = ep;
  function tp(t) {
    return t.replace(cs, Nt);
  }
  n(tp, "escapeUTF8");
  G.escapeUTF8 = tp;
  function ms(t) {
    return function(e) {
      return e.replace(fs, function(r) {
        return t[r] || Nt(r);
      });
    };
  }
  n(ms, "getASCIIEncoder");
});

// ../node_modules/entities/lib/index.js
var hs = q((O) => {
  "use strict";
  Object.defineProperty(O, "__esModule", { value: !0 });
  O.decodeXMLStrict = O.decodeHTML5Strict = O.decodeHTML4Strict = O.decodeHTML5 = O.decodeHTML4 = O.decodeHTMLStrict = O.decodeHTML = O.decodeXML =
  O.encodeHTML5 = O.encodeHTML4 = O.escapeUTF8 = O.escape = O.encodeNonAsciiHTML = O.encodeHTML = O.encodeXML = O.encode = O.decodeStrict = O.
  decode = void 0;
  var qt = ho(), ys = bo();
  function rp(t, e) {
    return (!e || e <= 0 ? qt.decodeXML : qt.decodeHTML)(t);
  }
  n(rp, "decode");
  O.decode = rp;
  function op(t, e) {
    return (!e || e <= 0 ? qt.decodeXML : qt.decodeHTMLStrict)(t);
  }
  n(op, "decodeStrict");
  O.decodeStrict = op;
  function np(t, e) {
    return (!e || e <= 0 ? ys.encodeXML : ys.encodeHTML)(t);
  }
  n(np, "encode");
  O.encode = np;
  var Ee = bo();
  Object.defineProperty(O, "encodeXML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return Ee.encodeXML;
  }, "get") });
  Object.defineProperty(O, "encodeHTML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return Ee.encodeHTML;
  }, "get") });
  Object.defineProperty(O, "encodeNonAsciiHTML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return Ee.encodeNonAsciiHTML;
  }, "get") });
  Object.defineProperty(O, "escape", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return Ee.escape;
  }, "get") });
  Object.defineProperty(O, "escapeUTF8", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return Ee.escapeUTF8;
  }, "get") });
  Object.defineProperty(O, "encodeHTML4", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return Ee.encodeHTML;
  }, "get") });
  Object.defineProperty(O, "encodeHTML5", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return Ee.encodeHTML;
  }, "get") });
  var fe = ho();
  Object.defineProperty(O, "decodeXML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return fe.decodeXML;
  }, "get") });
  Object.defineProperty(O, "decodeHTML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return fe.decodeHTML;
  }, "get") });
  Object.defineProperty(O, "decodeHTMLStrict", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return fe.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O, "decodeHTML4", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return fe.decodeHTML;
  }, "get") });
  Object.defineProperty(O, "decodeHTML5", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return fe.decodeHTML;
  }, "get") });
  Object.defineProperty(O, "decodeHTML4Strict", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return fe.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O, "decodeHTML5Strict", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return fe.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O, "decodeXMLStrict", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return fe.decodeXML;
  }, "get") });
});

// ../node_modules/ansi-to-html/lib/ansi_to_html.js
var Cs = q((Qb, vs) => {
  "use strict";
  function ip(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  n(ip, "_classCallCheck");
  function gs(t, e) {
    for (var r = 0; r < e.length; r++) {
      var o = e[r];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
    }
  }
  n(gs, "_defineProperties");
  function sp(t, e, r) {
    return e && gs(t.prototype, e), r && gs(t, r), t;
  }
  n(sp, "_createClass");
  function Rs(t, e) {
    var r = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
    if (!r) {
      if (Array.isArray(t) || (r = ap(t)) || e && t && typeof t.length == "number") {
        r && (t = r);
        var o = 0, i = /* @__PURE__ */ n(function() {
        }, "F");
        return { s: i, n: /* @__PURE__ */ n(function() {
          return o >= t.length ? { done: !0 } : { done: !1, value: t[o++] };
        }, "n"), e: /* @__PURE__ */ n(function(d) {
          throw d;
        }, "e"), f: i };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var s = !0, a = !1, l;
    return { s: /* @__PURE__ */ n(function() {
      r = r.call(t);
    }, "s"), n: /* @__PURE__ */ n(function() {
      var d = r.next();
      return s = d.done, d;
    }, "n"), e: /* @__PURE__ */ n(function(d) {
      a = !0, l = d;
    }, "e"), f: /* @__PURE__ */ n(function() {
      try {
        !s && r.return != null && r.return();
      } finally {
        if (a) throw l;
      }
    }, "f") };
  }
  n(Rs, "_createForOfIteratorHelper");
  function ap(t, e) {
    if (t) {
      if (typeof t == "string") return bs(t, e);
      var r = Object.prototype.toString.call(t).slice(8, -1);
      if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
      if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return bs(t, e);
    }
  }
  n(ap, "_unsupportedIterableToArray");
  function bs(t, e) {
    (e == null || e > t.length) && (e = t.length);
    for (var r = 0, o = new Array(e); r < e; r++)
      o[r] = t[r];
    return o;
  }
  n(bs, "_arrayLikeToArray");
  var lp = hs(), Ss = {
    fg: "#FFF",
    bg: "#000",
    newline: !1,
    escapeXML: !1,
    stream: !1,
    colors: cp()
  };
  function cp() {
    var t = {
      0: "#000",
      1: "#A00",
      2: "#0A0",
      3: "#A50",
      4: "#00A",
      5: "#A0A",
      6: "#0AA",
      7: "#AAA",
      8: "#555",
      9: "#F55",
      10: "#5F5",
      11: "#FF5",
      12: "#55F",
      13: "#F5F",
      14: "#5FF",
      15: "#FFF"
    };
    return Ht(0, 5).forEach(function(e) {
      Ht(0, 5).forEach(function(r) {
        Ht(0, 5).forEach(function(o) {
          return dp(e, r, o, t);
        });
      });
    }), Ht(0, 23).forEach(function(e) {
      var r = e + 232, o = Es(e * 10 + 8);
      t[r] = "#" + o + o + o;
    }), t;
  }
  n(cp, "getDefaultColors");
  function dp(t, e, r, o) {
    var i = 16 + t * 36 + e * 6 + r, s = t > 0 ? t * 40 + 55 : 0, a = e > 0 ? e * 40 + 55 : 0, l = r > 0 ? r * 40 + 55 : 0;
    o[i] = pp([s, a, l]);
  }
  n(dp, "setStyleColor");
  function Es(t) {
    for (var e = t.toString(16); e.length < 2; )
      e = "0" + e;
    return e;
  }
  n(Es, "toHexString");
  function pp(t) {
    var e = [], r = Rs(t), o;
    try {
      for (r.s(); !(o = r.n()).done; ) {
        var i = o.value;
        e.push(Es(i));
      }
    } catch (s) {
      r.e(s);
    } finally {
      r.f();
    }
    return "#" + e.join("");
  }
  n(pp, "toColorHexString");
  function xs(t, e, r, o) {
    var i;
    return e === "text" ? i = yp(r, o) : e === "display" ? i = fp(t, r, o) : e === "xterm256Foreground" ? i = Bt(t, o.colors[r]) : e === "xt\
erm256Background" ? i = Gt(t, o.colors[r]) : e === "rgb" && (i = up(t, r)), i;
  }
  n(xs, "generateOutput");
  function up(t, e) {
    e = e.substring(2).slice(0, -1);
    var r = +e.substr(0, 2), o = e.substring(5).split(";"), i = o.map(function(s) {
      return ("0" + Number(s).toString(16)).substr(-2);
    }).join("");
    return $t(t, (r === 38 ? "color:#" : "background-color:#") + i);
  }
  n(up, "handleRgb");
  function fp(t, e, r) {
    e = parseInt(e, 10);
    var o = {
      "-1": /* @__PURE__ */ n(function() {
        return "<br/>";
      }, "_"),
      0: /* @__PURE__ */ n(function() {
        return t.length && As(t);
      }, "_"),
      1: /* @__PURE__ */ n(function() {
        return me(t, "b");
      }, "_"),
      3: /* @__PURE__ */ n(function() {
        return me(t, "i");
      }, "_"),
      4: /* @__PURE__ */ n(function() {
        return me(t, "u");
      }, "_"),
      8: /* @__PURE__ */ n(function() {
        return $t(t, "display:none");
      }, "_"),
      9: /* @__PURE__ */ n(function() {
        return me(t, "strike");
      }, "_"),
      22: /* @__PURE__ */ n(function() {
        return $t(t, "font-weight:normal;text-decoration:none;font-style:normal");
      }, "_"),
      23: /* @__PURE__ */ n(function() {
        return ws(t, "i");
      }, "_"),
      24: /* @__PURE__ */ n(function() {
        return ws(t, "u");
      }, "_"),
      39: /* @__PURE__ */ n(function() {
        return Bt(t, r.fg);
      }, "_"),
      49: /* @__PURE__ */ n(function() {
        return Gt(t, r.bg);
      }, "_"),
      53: /* @__PURE__ */ n(function() {
        return $t(t, "text-decoration:overline");
      }, "_")
    }, i;
    return o[e] ? i = o[e]() : 4 < e && e < 7 ? i = me(t, "blink") : 29 < e && e < 38 ? i = Bt(t, r.colors[e - 30]) : 39 < e && e < 48 ? i =
    Gt(t, r.colors[e - 40]) : 89 < e && e < 98 ? i = Bt(t, r.colors[8 + (e - 90)]) : 99 < e && e < 108 && (i = Gt(t, r.colors[8 + (e - 100)])),
    i;
  }
  n(fp, "handleDisplay");
  function As(t) {
    var e = t.slice(0);
    return t.length = 0, e.reverse().map(function(r) {
      return "</" + r + ">";
    }).join("");
  }
  n(As, "resetStyles");
  function Ht(t, e) {
    for (var r = [], o = t; o <= e; o++)
      r.push(o);
    return r;
  }
  n(Ht, "range");
  function mp(t) {
    return function(e) {
      return (t === null || e.category !== t) && t !== "all";
    };
  }
  n(mp, "notCategory");
  function Ts(t) {
    t = parseInt(t, 10);
    var e = null;
    return t === 0 ? e = "all" : t === 1 ? e = "bold" : 2 < t && t < 5 ? e = "underline" : 4 < t && t < 7 ? e = "blink" : t === 8 ? e = "hid\
e" : t === 9 ? e = "strike" : 29 < t && t < 38 || t === 39 || 89 < t && t < 98 ? e = "foreground-color" : (39 < t && t < 48 || t === 49 || 99 <
    t && t < 108) && (e = "background-color"), e;
  }
  n(Ts, "categoryForCode");
  function yp(t, e) {
    return e.escapeXML ? lp.encodeXML(t) : t;
  }
  n(yp, "pushText");
  function me(t, e, r) {
    return r || (r = ""), t.push(e), "<".concat(e).concat(r ? ' style="'.concat(r, '"') : "", ">");
  }
  n(me, "pushTag");
  function $t(t, e) {
    return me(t, "span", e);
  }
  n($t, "pushStyle");
  function Bt(t, e) {
    return me(t, "span", "color:" + e);
  }
  n(Bt, "pushForegroundColor");
  function Gt(t, e) {
    return me(t, "span", "background-color:" + e);
  }
  n(Gt, "pushBackgroundColor");
  function ws(t, e) {
    var r;
    if (t.slice(-1)[0] === e && (r = t.pop()), r)
      return "</" + e + ">";
  }
  n(ws, "closeTag");
  function hp(t, e, r) {
    var o = !1, i = 3;
    function s() {
      return "";
    }
    n(s, "remove");
    function a(A, P) {
      return r("xterm256Foreground", P), "";
    }
    n(a, "removeXterm256Foreground");
    function l(A, P) {
      return r("xterm256Background", P), "";
    }
    n(l, "removeXterm256Background");
    function c(A) {
      return e.newline ? r("display", -1) : r("text", A), "";
    }
    n(c, "newline");
    function d(A, P) {
      o = !0, P.trim().length === 0 && (P = "0"), P = P.trimRight(";").split(";");
      var m = Rs(P), b;
      try {
        for (m.s(); !(b = m.n()).done; ) {
          var S = b.value;
          r("display", S);
        }
      } catch (C) {
        m.e(C);
      } finally {
        m.f();
      }
      return "";
    }
    n(d, "ansiMess");
    function p(A) {
      return r("text", A), "";
    }
    n(p, "realText");
    function u(A) {
      return r("rgb", A), "";
    }
    n(u, "rgb");
    var f = [{
      pattern: /^\x08+/,
      sub: s
    }, {
      pattern: /^\x1b\[[012]?K/,
      sub: s
    }, {
      pattern: /^\x1b\[\(B/,
      sub: s
    }, {
      pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/,
      sub: u
    }, {
      pattern: /^\x1b\[38;5;(\d+)m/,
      sub: a
    }, {
      pattern: /^\x1b\[48;5;(\d+)m/,
      sub: l
    }, {
      pattern: /^\n/,
      sub: c
    }, {
      pattern: /^\r+\n/,
      sub: c
    }, {
      pattern: /^\r/,
      sub: c
    }, {
      pattern: /^\x1b\[((?:\d{1,3};?)+|)m/,
      sub: d
    }, {
      // CSI n J
      // ED - Erase in Display Clears part of the screen.
      // If n is 0 (or missing), clear from cursor to end of screen.
      // If n is 1, clear from cursor to beginning of the screen.
      // If n is 2, clear entire screen (and moves cursor to upper left on DOS ANSI.SYS).
      // If n is 3, clear entire screen and delete all lines saved in the scrollback buffer
      //   (this feature was added for xterm and is supported by other terminal applications).
      pattern: /^\x1b\[\d?J/,
      sub: s
    }, {
      // CSI n ; m f
      // HVP - Horizontal Vertical Position Same as CUP
      pattern: /^\x1b\[\d{0,3};\d{0,3}f/,
      sub: s
    }, {
      // catch-all for CSI sequences?
      pattern: /^\x1b\[?[\d;]{0,3}/,
      sub: s
    }, {
      /**
       * extracts real text - not containing:
       * - `\x1b' - ESC - escape (Ascii 27)
       * - '\x08' - BS - backspace (Ascii 8)
       * - `\n` - Newline - linefeed (LF) (ascii 10)
       * - `\r` - Windows Carriage Return (CR)
       */
      pattern: /^(([^\x1b\x08\r\n])+)/,
      sub: p
    }];
    function h(A, P) {
      P > i && o || (o = !1, t = t.replace(A.pattern, A.sub));
    }
    n(h, "process");
    var g = [], T = t, x = T.length;
    e: for (; x > 0; ) {
      for (var v = 0, E = 0, y = f.length; E < y; v = ++E) {
        var w = f[v];
        if (h(w, v), t.length !== x) {
          x = t.length;
          continue e;
        }
      }
      if (t.length === x)
        break;
      g.push(0), x = t.length;
    }
    return g;
  }
  n(hp, "tokenize");
  function gp(t, e, r) {
    return e !== "text" && (t = t.filter(mp(Ts(r))), t.push({
      token: e,
      data: r,
      category: Ts(r)
    })), t;
  }
  n(gp, "updateStickyStack");
  var bp = /* @__PURE__ */ function() {
    function t(e) {
      ip(this, t), e = e || {}, e.colors && (e.colors = Object.assign({}, Ss.colors, e.colors)), this.options = Object.assign({}, Ss, e), this.
      stack = [], this.stickyStack = [];
    }
    return n(t, "Filter"), sp(t, [{
      key: "toHtml",
      value: /* @__PURE__ */ n(function(r) {
        var o = this;
        r = typeof r == "string" ? [r] : r;
        var i = this.stack, s = this.options, a = [];
        return this.stickyStack.forEach(function(l) {
          var c = xs(i, l.token, l.data, s);
          c && a.push(c);
        }), hp(r.join(""), s, function(l, c) {
          var d = xs(i, l, c, s);
          d && a.push(d), s.stream && (o.stickyStack = gp(o.stickyStack, l, c));
        }), i.length && a.push(As(i)), a.join("");
      }, "toHtml")
    }]), t;
  }();
  vs.exports = bp;
});

// src/preview-api/modules/addons/main.ts
import { global as Yt } from "@storybook/global";

// src/preview-api/modules/addons/storybook-channel-mock.ts
import { Channel as Us } from "storybook/internal/channels";
function Wt() {
  let t = {
    setHandler: /* @__PURE__ */ n(() => {
    }, "setHandler"),
    send: /* @__PURE__ */ n(() => {
    }, "send")
  };
  return new Us({ transport: t });
}
n(Wt, "mockChannel");

// src/preview-api/modules/addons/main.ts
var Jt = class Jt {
  constructor() {
    this.getChannel = /* @__PURE__ */ n(() => {
      if (!this.channel) {
        let e = Wt();
        return this.setChannel(e), e;
      }
      return this.channel;
    }, "getChannel");
    this.ready = /* @__PURE__ */ n(() => this.promise, "ready");
    this.hasChannel = /* @__PURE__ */ n(() => !!this.channel, "hasChannel");
    this.setChannel = /* @__PURE__ */ n((e) => {
      this.channel = e, this.resolve();
    }, "setChannel");
    this.promise = new Promise((e) => {
      this.resolve = () => e(this.getChannel());
    });
  }
};
n(Jt, "AddonStore");
var Xt = Jt, Kt = "__STORYBOOK_ADDONS_PREVIEW";
function Vs() {
  return Yt[Kt] || (Yt[Kt] = new Xt()), Yt[Kt];
}
n(Vs, "getAddonsStore");
var z = Vs();

// src/preview-api/modules/addons/definePreview.ts
function Ws(t) {
  return t;
}
n(Ws, "definePreview");

// src/preview-api/modules/addons/hooks.ts
import { logger as Be } from "storybook/internal/client-logger";
import {
  FORCE_RE_RENDER as Ys,
  RESET_STORY_ARGS as Ks,
  STORY_RENDERED as Ao,
  UPDATE_GLOBALS as Xs,
  UPDATE_STORY_ARGS as Js
} from "storybook/internal/core-events";
import { global as ct } from "@storybook/global";
var rr = class rr {
  constructor() {
    this.hookListsMap = void 0;
    this.mountedDecorators = void 0;
    this.prevMountedDecorators = void 0;
    this.currentHooks = void 0;
    this.nextHookIndex = void 0;
    this.currentPhase = void 0;
    this.currentEffects = void 0;
    this.prevEffects = void 0;
    this.currentDecoratorName = void 0;
    this.hasUpdates = void 0;
    this.currentContext = void 0;
    this.renderListener = /* @__PURE__ */ n((e) => {
      e === this.currentContext?.id && (this.triggerEffects(), this.currentContext = null, this.removeRenderListeners());
    }, "renderListener");
    this.init();
  }
  init() {
    this.hookListsMap = /* @__PURE__ */ new WeakMap(), this.mountedDecorators = /* @__PURE__ */ new Set(), this.prevMountedDecorators = /* @__PURE__ */ new Set(),
    this.currentHooks = [], this.nextHookIndex = 0, this.currentPhase = "NONE", this.currentEffects = [], this.prevEffects = [], this.currentDecoratorName =
    null, this.hasUpdates = !1, this.currentContext = null;
  }
  clean() {
    this.prevEffects.forEach((e) => {
      e.destroy && e.destroy();
    }), this.init(), this.removeRenderListeners();
  }
  getNextHook() {
    let e = this.currentHooks[this.nextHookIndex];
    return this.nextHookIndex += 1, e;
  }
  triggerEffects() {
    this.prevEffects.forEach((e) => {
      !this.currentEffects.includes(e) && e.destroy && e.destroy();
    }), this.currentEffects.forEach((e) => {
      this.prevEffects.includes(e) || (e.destroy = e.create());
    }), this.prevEffects = this.currentEffects, this.currentEffects = [];
  }
  addRenderListeners() {
    this.removeRenderListeners(), z.getChannel().on(Ao, this.renderListener);
  }
  removeRenderListeners() {
    z.getChannel().removeListener(Ao, this.renderListener);
  }
};
n(rr, "HooksContext");
var he = rr;
function vo(t) {
  let e = /* @__PURE__ */ n((...r) => {
    let { hooks: o } = typeof r[0] == "function" ? r[1] : r[0], i = o.currentPhase, s = o.currentHooks, a = o.nextHookIndex, l = o.currentDecoratorName;
    o.currentDecoratorName = t.name, o.prevMountedDecorators.has(t) ? (o.currentPhase = "UPDATE", o.currentHooks = o.hookListsMap.get(t) || []) :
    (o.currentPhase = "MOUNT", o.currentHooks = [], o.hookListsMap.set(t, o.currentHooks), o.prevMountedDecorators.add(t)), o.nextHookIndex =
    0;
    let c = ct.STORYBOOK_HOOKS_CONTEXT;
    ct.STORYBOOK_HOOKS_CONTEXT = o;
    let d = t(...r);
    if (ct.STORYBOOK_HOOKS_CONTEXT = c, o.currentPhase === "UPDATE" && o.getNextHook() != null)
      throw new Error(
        "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
      );
    return o.currentPhase = i, o.currentHooks = s, o.nextHookIndex = a, o.currentDecoratorName = l, d;
  }, "hookified");
  return e.originalFn = t, e;
}
n(vo, "hookify");
var Zt = 0, Zs = 25, Qt = /* @__PURE__ */ n((t) => (e, r) => {
  let o = t(
    vo(e),
    r.map((i) => vo(i))
  );
  return (i) => {
    let { hooks: s } = i;
    s.prevMountedDecorators ??= /* @__PURE__ */ new Set(), s.mountedDecorators = /* @__PURE__ */ new Set([e, ...r]), s.currentContext = i, s.
    hasUpdates = !1;
    let a = o(i);
    for (Zt = 1; s.hasUpdates; )
      if (s.hasUpdates = !1, s.currentEffects = [], a = o(i), Zt += 1, Zt > Zs)
        throw new Error(
          "Too many re-renders. Storybook limits the number of renders to prevent an infinite loop."
        );
    return s.addRenderListeners(), a;
  };
}, "applyHooks"), Qs = /* @__PURE__ */ n((t, e) => t.length === e.length && t.every((r, o) => r === e[o]), "areDepsEqual"), er = /* @__PURE__ */ n(
() => new Error("Storybook preview hooks can only be called inside decorators and story functions."), "invalidHooksError");
function Co() {
  return ct.STORYBOOK_HOOKS_CONTEXT || null;
}
n(Co, "getHooksContextOrNull");
function tr() {
  let t = Co();
  if (t == null)
    throw er();
  return t;
}
n(tr, "getHooksContextOrThrow");
function ea(t, e, r) {
  let o = tr();
  if (o.currentPhase === "MOUNT") {
    r != null && !Array.isArray(r) && Be.warn(
      `${t} received a final argument that is not an array (instead, received ${r}). When specified, the final argument must be an array.`
    );
    let i = { name: t, deps: r };
    return o.currentHooks.push(i), e(i), i;
  }
  if (o.currentPhase === "UPDATE") {
    let i = o.getNextHook();
    if (i == null)
      throw new Error("Rendered more hooks than during the previous render.");
    return i.name !== t && Be.warn(
      `Storybook has detected a change in the order of Hooks${o.currentDecoratorName ? ` called by ${o.currentDecoratorName}` : ""}. This wi\
ll lead to bugs and errors if not fixed.`
    ), r != null && i.deps == null && Be.warn(
      `${t} received a final argument during this render, but not during the previous render. Even though the final argument is optional, it\
s type cannot change between renders.`
    ), r != null && i.deps != null && r.length !== i.deps.length && Be.warn(`The final argument passed to ${t} changed size between renders.\
 The order and size of this array must remain constant.
Previous: ${i.deps}
Incoming: ${r}`), (r == null || i.deps == null || !Qs(r, i.deps)) && (e(i), i.deps = r), i;
  }
  throw er();
}
n(ea, "useHook");
function dt(t, e, r) {
  let { memoizedState: o } = ea(
    t,
    (i) => {
      i.memoizedState = e();
    },
    r
  );
  return o;
}
n(dt, "useMemoLike");
function ta(t, e) {
  return dt("useMemo", t, e);
}
n(ta, "useMemo");
function Ge(t, e) {
  return dt("useCallback", () => t, e);
}
n(Ge, "useCallback");
function Po(t, e) {
  return dt(t, () => ({ current: e }), []);
}
n(Po, "useRefLike");
function ra(t) {
  return Po("useRef", t);
}
n(ra, "useRef");
function oa() {
  let t = Co();
  if (t != null && t.currentPhase !== "NONE")
    t.hasUpdates = !0;
  else
    try {
      z.getChannel().emit(Ys);
    } catch {
      Be.warn("State updates of Storybook preview hooks work only in browser");
    }
}
n(oa, "triggerUpdate");
function Fo(t, e) {
  let r = Po(
    t,
    // @ts-expect-error S type should never be function, but there's no way to tell that to TypeScript
    typeof e == "function" ? e() : e
  ), o = /* @__PURE__ */ n((i) => {
    r.current = typeof i == "function" ? i(r.current) : i, oa();
  }, "setState");
  return [r.current, o];
}
n(Fo, "useStateLike");
function na(t) {
  return Fo("useState", t);
}
n(na, "useState");
function ia(t, e, r) {
  let o = r != null ? () => r(e) : e, [i, s] = Fo("useReducer", o);
  return [i, /* @__PURE__ */ n((l) => s((c) => t(c, l)), "dispatch")];
}
n(ia, "useReducer");
function Io(t, e) {
  let r = tr(), o = dt("useEffect", () => ({ create: t }), e);
  r.currentEffects.includes(o) || r.currentEffects.push(o);
}
n(Io, "useEffect");
function sa(t, e = []) {
  let r = z.getChannel();
  return Io(() => (Object.entries(t).forEach(([o, i]) => r.on(o, i)), () => {
    Object.entries(t).forEach(
      ([o, i]) => r.removeListener(o, i)
    );
  }), [...Object.keys(t), ...e]), Ge(r.emit.bind(r), [r]);
}
n(sa, "useChannel");
function pt() {
  let { currentContext: t } = tr();
  if (t == null)
    throw er();
  return t;
}
n(pt, "useStoryContext");
function aa(t, e) {
  let { parameters: r } = pt();
  if (t)
    return r[t] ?? e;
}
n(aa, "useParameter");
function la() {
  let t = z.getChannel(), { id: e, args: r } = pt(), o = Ge(
    (s) => t.emit(Js, { storyId: e, updatedArgs: s }),
    [t, e]
  ), i = Ge(
    (s) => t.emit(Ks, { storyId: e, argNames: s }),
    [t, e]
  );
  return [r, o, i];
}
n(la, "useArgs");
function ca() {
  let t = z.getChannel(), { globals: e } = pt(), r = Ge(
    (o) => t.emit(Xs, { globals: o }),
    [t]
  );
  return [e, r];
}
n(ca, "useGlobals");

// src/preview-api/modules/addons/make-decorator.ts
var da = /* @__PURE__ */ n(({
  name: t,
  parameterName: e,
  wrapper: r,
  skipIfNoParametersOrOptions: o = !1
}) => {
  let i = /* @__PURE__ */ n((s) => (a, l) => {
    let c = l.parameters && l.parameters[e];
    return c && c.disable || o && !s && !c ? a(l) : r(a, l, {
      options: s,
      parameters: c
    });
  }, "decorator");
  return (...s) => typeof s[0] == "function" ? i()(...s) : (...a) => {
    if (a.length > 1)
      return s.length > 1 ? i(s)(...a) : i(...s)(...a);
    throw new Error(
      `Passing stories directly into ${t}() is not allowed,
        instead use addDecorator(${t}) and pass options with the '${e}' parameter`
    );
  };
}, "makeDecorator");

// src/preview-api/modules/store/StoryStore.ts
import {
  CalledExtractOnStoreError as ac,
  MissingStoryFromCsfFileError as lc
} from "storybook/internal/preview-errors";

// ../node_modules/es-toolkit/dist/function/noop.mjs
function Oo() {
}
n(Oo, "noop");

// ../node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function or(t) {
  return Object.getOwnPropertySymbols(t).filter((e) => Object.prototype.propertyIsEnumerable.call(t, e));
}
n(or, "getSymbols");

// ../node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function nr(t) {
  return t == null ? t === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t);
}
n(nr, "getTag");

// ../node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var ko = "[object RegExp]", Do = "[object String]", Mo = "[object Number]", Lo = "[object Boolean]", ir = "[object Arguments]", _o = "[objec\
t Symbol]", jo = "[object Date]", No = "[object Map]", qo = "[object Set]", Ho = "[object Array]", $o = "[object Function]", Bo = "[object A\
rrayBuffer]", ut = "[object Object]", Go = "[object Error]", zo = "[object DataView]", Uo = "[object Uint8Array]", Vo = "[object Uint8Clampe\
dArray]", Wo = "[object Uint16Array]", Yo = "[object Uint32Array]", Ko = "[object BigUint64Array]", Xo = "[object Int8Array]", Jo = "[object\
 Int16Array]", Zo = "[object Int32Array]", Qo = "[object BigInt64Array]", en = "[object Float32Array]", tn = "[object Float64Array]";

// ../node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
function $(t) {
  if (!t || typeof t != "object")
    return !1;
  let e = Object.getPrototypeOf(t);
  return e === null || e === Object.prototype || Object.getPrototypeOf(e) === null ? Object.prototype.toString.call(t) === "[object Object]" :
  !1;
}
n($, "isPlainObject");

// ../node_modules/es-toolkit/dist/object/mapValues.mjs
function re(t, e) {
  let r = {}, o = Object.keys(t);
  for (let i = 0; i < o.length; i++) {
    let s = o[i], a = t[s];
    r[s] = e(a, s, t);
  }
  return r;
}
n(re, "mapValues");

// ../node_modules/es-toolkit/dist/object/pickBy.mjs
function sr(t, e) {
  let r = {}, o = Object.keys(t);
  for (let i = 0; i < o.length; i++) {
    let s = o[i], a = t[s];
    e(a, s) && (r[s] = a);
  }
  return r;
}
n(sr, "pickBy");

// ../node_modules/es-toolkit/dist/compat/util/eq.mjs
function rn(t, e) {
  return t === e || Number.isNaN(t) && Number.isNaN(e);
}
n(rn, "eq");

// ../node_modules/es-toolkit/dist/predicate/isEqualWith.mjs
function on(t, e, r) {
  return ze(t, e, void 0, void 0, void 0, void 0, r);
}
n(on, "isEqualWith");
function ze(t, e, r, o, i, s, a) {
  let l = a(t, e, r, o, i, s);
  if (l !== void 0)
    return l;
  if (typeof t == typeof e)
    switch (typeof t) {
      case "bigint":
      case "string":
      case "boolean":
      case "symbol":
      case "undefined":
        return t === e;
      case "number":
        return t === e || Object.is(t, e);
      case "function":
        return t === e;
      case "object":
        return Ue(t, e, s, a);
    }
  return Ue(t, e, s, a);
}
n(ze, "isEqualWithImpl");
function Ue(t, e, r, o) {
  if (Object.is(t, e))
    return !0;
  let i = nr(t), s = nr(e);
  if (i === ir && (i = ut), s === ir && (s = ut), i !== s)
    return !1;
  switch (i) {
    case Do:
      return t.toString() === e.toString();
    case Mo: {
      let c = t.valueOf(), d = e.valueOf();
      return rn(c, d);
    }
    case Lo:
    case jo:
    case _o:
      return Object.is(t.valueOf(), e.valueOf());
    case ko:
      return t.source === e.source && t.flags === e.flags;
    case $o:
      return t === e;
  }
  r = r ?? /* @__PURE__ */ new Map();
  let a = r.get(t), l = r.get(e);
  if (a != null && l != null)
    return a === e;
  r.set(t, e), r.set(e, t);
  try {
    switch (i) {
      case No: {
        if (t.size !== e.size)
          return !1;
        for (let [c, d] of t.entries())
          if (!e.has(c) || !ze(d, e.get(c), c, t, e, r, o))
            return !1;
        return !0;
      }
      case qo: {
        if (t.size !== e.size)
          return !1;
        let c = Array.from(t.values()), d = Array.from(e.values());
        for (let p = 0; p < c.length; p++) {
          let u = c[p], f = d.findIndex((h) => ze(u, h, void 0, t, e, r, o));
          if (f === -1)
            return !1;
          d.splice(f, 1);
        }
        return !0;
      }
      case Ho:
      case Uo:
      case Vo:
      case Wo:
      case Yo:
      case Ko:
      case Xo:
      case Jo:
      case Zo:
      case Qo:
      case en:
      case tn: {
        if (typeof Buffer < "u" && Buffer.isBuffer(t) !== Buffer.isBuffer(e) || t.length !== e.length)
          return !1;
        for (let c = 0; c < t.length; c++)
          if (!ze(t[c], e[c], c, t, e, r, o))
            return !1;
        return !0;
      }
      case Bo:
        return t.byteLength !== e.byteLength ? !1 : Ue(new Uint8Array(t), new Uint8Array(e), r, o);
      case zo:
        return t.byteLength !== e.byteLength || t.byteOffset !== e.byteOffset ? !1 : Ue(new Uint8Array(t), new Uint8Array(e), r, o);
      case Go:
        return t.name === e.name && t.message === e.message;
      case ut: {
        if (!(Ue(t.constructor, e.constructor, r, o) || $(t) && $(e)))
          return !1;
        let d = [...Object.keys(t), ...or(t)], p = [...Object.keys(e), ...or(e)];
        if (d.length !== p.length)
          return !1;
        for (let u = 0; u < d.length; u++) {
          let f = d[u], h = t[f];
          if (!Object.hasOwn(e, f))
            return !1;
          let g = e[f];
          if (!ze(h, g, f, t, e, r, o))
            return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    r.delete(t), r.delete(e);
  }
}
n(Ue, "areObjectsEqual");

// ../node_modules/es-toolkit/dist/predicate/isEqual.mjs
function ar(t, e) {
  return on(t, e, Oo);
}
n(ar, "isEqual");

// src/preview-api/modules/store/StoryStore.ts
var It = ve(cr(), 1);

// src/actions/preview.ts
import { definePreview as Sa } from "storybook/preview-api";

// src/actions/addArgs.ts
var pr = {};
Eo(pr, {
  argsEnhancers: () => ya
});

// src/actions/runtime/action.ts
import { ImplicitActionsDuringRendering as pa } from "storybook/internal/preview-errors";
import { global as ln } from "@storybook/global";
import { addons as ua } from "storybook/preview-api";

// src/actions/constants.ts
var dr = "storybook/actions", wu = `${dr}/panel`, sn = `${dr}/action-event`, Ru = `${dr}/action-clear`;

// src/actions/runtime/configureActions.ts
var an = {
  depth: 10,
  clearOnStoryChange: !0,
  limit: 50
};

// src/actions/runtime/action.ts
var cn = /* @__PURE__ */ n((t, e) => {
  let r = Object.getPrototypeOf(t);
  return !r || e(r) ? r : cn(r, e);
}, "findProto"), fa = /* @__PURE__ */ n((t) => !!(typeof t == "object" && t && cn(t, (e) => /^Synthetic(?:Base)?Event$/.test(e.constructor.name)) &&
typeof t.persist == "function"), "isReactSyntheticEvent"), ma = /* @__PURE__ */ n((t) => {
  if (fa(t)) {
    let e = Object.create(
      t.constructor.prototype,
      Object.getOwnPropertyDescriptors(t)
    );
    e.persist();
    let r = Object.getOwnPropertyDescriptor(e, "view"), o = r?.value;
    return typeof o == "object" && o?.constructor.name === "Window" && Object.defineProperty(e, "view", {
      ...r,
      value: Object.create(o.constructor.prototype)
    }), e;
  }
  return t;
}, "serializeArg");
function Ve(t, e = {}) {
  let r = {
    ...an,
    ...e
  }, o = /* @__PURE__ */ n(function(...s) {
    if (e.implicit) {
      let h = ("__STORYBOOK_PREVIEW__" in ln ? ln.__STORYBOOK_PREVIEW__ : void 0)?.storyRenders.find(
        (g) => g.phase === "playing" || g.phase === "rendering"
      );
      if (h) {
        let g = !globalThis?.FEATURES?.disallowImplicitActionsInRenderV8, T = new pa({
          phase: h.phase,
          name: t,
          deprecated: g
        });
        if (g)
          console.warn(T);
        else
          throw T;
      }
    }
    let a = ua.getChannel(), l = Date.now().toString(36) + Math.random().toString(36).substring(2), c = 5, d = s.map(ma), p = s.length > 1 ?
    d : d[0], u = {
      id: l,
      count: 0,
      data: { name: t, args: p },
      options: {
        ...r,
        maxDepth: c + (r.depth || 3)
      }
    };
    a.emit(sn, u);
  }, "actionHandler");
  return o.isAction = !0, o.implicit = e.implicit, o;
}
n(Ve, "action");

// src/actions/addArgsHelpers.ts
var dn = /* @__PURE__ */ n((t, e) => typeof e[t] > "u" && !(t in e), "isInInitialArgs"), pn = /* @__PURE__ */ n((t) => {
  let {
    initialArgs: e,
    argTypes: r,
    id: o,
    parameters: { actions: i }
  } = t;
  if (!i || i.disable || !i.argTypesRegex || !r)
    return {};
  let s = new RegExp(i.argTypesRegex);
  return Object.entries(r).filter(
    ([l]) => !!s.test(l)
  ).reduce((l, [c, d]) => (dn(c, e) && (l[c] = Ve(c, { implicit: !0, id: o })), l), {});
}, "inferActionsFromArgTypesRegex"), un = /* @__PURE__ */ n((t) => {
  let {
    initialArgs: e,
    argTypes: r,
    parameters: { actions: o }
  } = t;
  return o?.disable || !r ? {} : Object.entries(r).filter(([s, a]) => !!a.action).reduce((s, [a, l]) => (dn(a, e) && (s[a] = Ve(typeof l.action ==
  "string" ? l.action : a)), s), {});
}, "addActionsFromArgTypes");

// src/actions/addArgs.ts
var ya = [
  un,
  pn
];

// src/actions/loaders.ts
var ur = {};
Eo(ur, {
  loaders: () => ba
});
import { onMockCall as ha } from "storybook/test";
var fn = !1, ga = /* @__PURE__ */ n((t) => {
  let { parameters: e } = t;
  e?.actions?.disable || fn || (ha((r, o) => {
    let i = r.getMockName();
    i !== "spy" && (!/^next\/.*::/.test(i) || [
      "next/router::useRouter()",
      "next/navigation::useRouter()",
      "next/navigation::redirect",
      "next/cache::",
      "next/headers::cookies().set",
      "next/headers::cookies().delete",
      "next/headers::headers().set",
      "next/headers::headers().delete"
    ].some((s) => i.startsWith(s))) && Ve(i)(o);
  }), fn = !0);
}, "logActionsWhenMockCalled"), ba = [ga];

// src/actions/preview.ts
var fr = /* @__PURE__ */ n(() => Sa({
  ...pr,
  ...ur
}), "default");

// src/backgrounds/preview.ts
import { definePreview as Ea } from "storybook/preview-api";

// src/backgrounds/constants.ts
var xa = "storybook/background", Ce = "backgrounds";
var zu = {
  UPDATE: `${xa}/update`
};

// src/backgrounds/decorator.ts
import { useEffect as bn } from "storybook/preview-api";

// src/backgrounds/defaults.ts
var mn = {
  light: { name: "light", value: "#F8F8F8" },
  dark: { name: "dark", value: "#333" }
};

// src/backgrounds/utils.ts
var { document: W } = globalThis, yn = /* @__PURE__ */ n(() => globalThis?.matchMedia ? !!globalThis.matchMedia("(prefers-reduced-motion: re\
duce)")?.matches : !1, "isReduceMotionEnabled"), mr = /* @__PURE__ */ n((t) => {
  (Array.isArray(t) ? t : [t]).forEach(Ta);
}, "clearStyles"), Ta = /* @__PURE__ */ n((t) => {
  if (!W)
    return;
  let e = W.getElementById(t);
  e && e.parentElement && e.parentElement.removeChild(e);
}, "clearStyle"), hn = /* @__PURE__ */ n((t, e) => {
  if (!W)
    return;
  let r = W.getElementById(t);
  if (r)
    r.innerHTML !== e && (r.innerHTML = e);
  else {
    let o = W.createElement("style");
    o.setAttribute("id", t), o.innerHTML = e, W.head.appendChild(o);
  }
}, "addGridStyle"), gn = /* @__PURE__ */ n((t, e, r) => {
  if (!W)
    return;
  let o = W.getElementById(t);
  if (o)
    o.innerHTML !== e && (o.innerHTML = e);
  else {
    let i = W.createElement("style");
    i.setAttribute("id", t), i.innerHTML = e;
    let s = `addon-backgrounds-grid${r ? `-docs-${r}` : ""}`, a = W.getElementById(s);
    a ? a.parentElement?.insertBefore(i, a) : W.head.appendChild(i);
  }
}, "addBackgroundStyle");

// src/backgrounds/decorator.ts
var wa = {
  cellSize: 100,
  cellAmount: 10,
  opacity: 0.8
}, Sn = "addon-backgrounds", xn = "addon-backgrounds-grid", Ra = yn() ? "" : "transition: background-color 0.3s;", Tn = /* @__PURE__ */ n((t, e) => {
  let { globals: r = {}, parameters: o = {}, viewMode: i, id: s } = e, {
    options: a = mn,
    disable: l,
    grid: c = wa
  } = o[Ce] || {}, d = r[Ce] || {}, p = typeof d == "string" ? d : d?.value, u = p ? a[p] : void 0, f = typeof u == "string" ? u : u?.value ||
  "transparent", h = typeof d == "string" ? !1 : d.grid || !1, g = !!u && !l, T = i === "docs" ? `#anchor--${s} .docs-story` : ".sb-show-mai\
n", x = i === "docs" ? `#anchor--${s} .docs-story` : ".sb-show-main", v = o.layout === void 0 || o.layout === "padded", E = i === "docs" ? 20 :
  v ? 16 : 0, { cellAmount: y, cellSize: w, opacity: A, offsetX: P = E, offsetY: m = E } = c, b = i === "docs" ? `${Sn}-docs-${s}` : `${Sn}-\
color`, S = i === "docs" ? s : null;
  bn(() => {
    let R = `
    ${T} {
      background: ${f} !important;
      ${Ra}
      }`;
    if (!g) {
      mr(b);
      return;
    }
    gn(b, R, S);
  }, [T, b, S, g, f]);
  let C = i === "docs" ? `${xn}-docs-${s}` : `${xn}`;
  return bn(() => {
    if (!h) {
      mr(C);
      return;
    }
    let R = [
      `${w * y}px ${w * y}px`,
      `${w * y}px ${w * y}px`,
      `${w}px ${w}px`,
      `${w}px ${w}px`
    ].join(", "), I = `
        ${x} {
          background-size: ${R} !important;
          background-position: ${P}px ${m}px, ${P}px ${m}px, ${P}px ${m}px, ${P}px ${m}px !important;
          background-blend-mode: difference !important;
          background-image: linear-gradient(rgba(130, 130, 130, ${A}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${A}) 1px, transparent 1px),
           linear-gradient(rgba(130, 130, 130, ${A / 2}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${A / 2}) 1px, transparent 1px) !important;
        }
      `;
    hn(C, I);
  }, [y, w, x, C, h, P, m, A]), t();
}, "withBackgroundAndGrid");

// src/backgrounds/preview.ts
var Aa = globalThis.FEATURES?.backgrounds ? [Tn] : [], va = {
  [Ce]: {
    grid: {
      cellSize: 20,
      opacity: 0.5,
      cellAmount: 5
    },
    disable: !1
  }
}, Ca = {
  [Ce]: { value: void 0, grid: !1 }
}, yr = /* @__PURE__ */ n(() => Ea({
  decorators: Aa,
  parameters: va,
  initialGlobals: Ca
}), "default");

// src/component-testing/preview.ts
import { instrument as Pa } from "storybook/internal/instrumenter";
import { definePreview as Fa } from "storybook/preview-api";
var { step: Ia } = Pa(
  {
    // It seems like the label is unused, but the instrumenter has access to it
    // The context will be bounded later in StoryRender, so that the user can write just:
    // await step("label", (context) => {
    //   // labeled step
    // });
    step: /* @__PURE__ */ n(async (t, e, r) => e(r), "step")
  },
  { intercept: !0 }
), hr = /* @__PURE__ */ n(() => Fa({
  parameters: {
    throwPlayFunctionExceptions: !1
  },
  runStep: Ia
}), "default");

// src/highlight/preview.ts
import { addons as Dn, definePreview as La } from "storybook/preview-api";

// src/highlight/useHighlights.ts
import { STORY_RENDER_PHASE_CHANGED as Da } from "storybook/internal/core-events";

// src/highlight/constants.ts
var ft = "storybook/highlight", wn = `${ft}/add`, Rn = `${ft}/remove`, En = `${ft}/reset`, An = `${ft}/scroll-into-view`, gr = 2147483647, J = 28;

// src/highlight/icons.ts
var br = {
  chevronLeft: [
    "M9.10355 10.1464C9.29882 10.3417 9.29882 10.6583 9.10355 10.8536C8.90829 11.0488 8.59171 11.0488 8.39645 10.8536L4.89645 7.35355C4.7011\
8 7.15829 4.70118 6.84171 4.89645 6.64645L8.39645 3.14645C8.59171 2.95118 8.90829 2.95118 9.10355 3.14645C9.29882 3.34171 9.29882 3.65829 9.\
10355 3.85355L5.95711 7L9.10355 10.1464Z"
  ],
  chevronRight: [
    "M4.89645 10.1464C4.70118 10.3417 4.70118 10.6583 4.89645 10.8536C5.09171 11.0488 5.40829 11.0488 5.60355 10.8536L9.10355 7.35355C9.2988\
2 7.15829 9.29882 6.84171 9.10355 6.64645L5.60355 3.14645C5.40829 2.95118 5.09171 2.95118 4.89645 3.14645C4.70118 3.34171 4.70118 3.65829 4.\
89645 3.85355L8.04289 7L4.89645 10.1464Z"
  ],
  info: [
    "M7 5.5a.5.5 0 01.5.5v4a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zM7 4.5A.75.75 0 107 3a.75.75 0 000 1.5z",
    "M7 14A7 7 0 107 0a7 7 0 000 14zm0-1A6 6 0 107 1a6 6 0 000 12z"
  ],
  shareAlt: [
    "M2 1.004a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-4.5a.5.5 0 00-1 0v4.5H2v-10h4.5a.5.5 0 000-1H2z",
    "M7.354 7.357L12 2.711v1.793a.5.5 0 001 0v-3a.5.5 0 00-.5-.5h-3a.5.5 0 100 1h1.793L6.646 6.65a.5.5 0 10.708.707z"
  ]
};

// src/highlight/utils.ts
var Oa = "svg,path,rect,circle,line,polyline,polygon,ellipse,text".split(","), j = /* @__PURE__ */ n((t, e = {}, r) => {
  let o = Oa.includes(t) ? document.createElementNS("http://www.w3.org/2000/svg", t) : document.createElement(t);
  return Object.entries(e).forEach(([i, s]) => {
    /[A-Z]/.test(i) ? (i === "onClick" && (o.addEventListener("click", s), o.addEventListener("keydown", (a) => {
      (a.key === "Enter" || a.key === " ") && (a.preventDefault(), s());
    })), i === "onMouseEnter" && o.addEventListener("mouseenter", s), i === "onMouseLeave" && o.addEventListener("mouseleave", s)) : o.setAttribute(
    i, s);
  }), r?.forEach((i) => {
    if (!(i == null || i === !1))
      try {
        o.appendChild(i);
      } catch {
        o.appendChild(document.createTextNode(String(i)));
      }
  }), o;
}, "createElement"), Ye = /* @__PURE__ */ n((t) => br[t] && j(
  "svg",
  { width: "14", height: "14", viewBox: "0 0 14 14", xmlns: "http://www.w3.org/2000/svg" },
  br[t].map(
    (e) => j("path", {
      fill: "currentColor",
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: e
    })
  )
), "createIcon"), vn = /* @__PURE__ */ n((t) => {
  if ("elements" in t) {
    let { elements: o, color: i, style: s } = t;
    return {
      id: void 0,
      priority: 0,
      selectors: o,
      styles: {
        outline: `2px ${s} ${i}`,
        outlineOffset: "2px",
        boxShadow: "0 0 0 6px rgba(255,255,255,0.6)"
      },
      menu: void 0
    };
  }
  let { menu: e, ...r } = t;
  return {
    id: void 0,
    priority: 0,
    styles: {
      outline: "2px dashed #029cfd"
    },
    ...r,
    menu: Array.isArray(e) ? e.every(Array.isArray) ? e : [e] : void 0
  };
}, "normalizeOptions"), ka = /* @__PURE__ */ n((t) => t instanceof Function, "isFunction"), We = /* @__PURE__ */ new Map(), ge = /* @__PURE__ */ new Map(),
mt = /* @__PURE__ */ new Map(), Z = /* @__PURE__ */ n((t) => {
  let e = Symbol();
  return ge.set(e, []), We.set(e, t), { get: /* @__PURE__ */ n(() => We.get(e), "get"), set: /* @__PURE__ */ n((a) => {
    let l = We.get(e), c = ka(a) ? a(l) : a;
    c !== l && (We.set(e, c), ge.get(e)?.forEach((d) => {
      mt.get(d)?.(), mt.set(d, d(c));
    }));
  }, "set"), subscribe: /* @__PURE__ */ n((a) => (ge.get(e)?.push(a), () => {
    let l = ge.get(e);
    l && ge.set(
      e,
      l.filter((c) => c !== a)
    );
  }), "subscribe"), teardown: /* @__PURE__ */ n(() => {
    ge.get(e)?.forEach((a) => {
      mt.get(a)?.(), mt.delete(a);
    }), ge.delete(e), We.delete(e);
  }, "teardown") };
}, "useStore"), Sr = /* @__PURE__ */ n((t) => {
  let e = document.getElementById("storybook-root"), r = /* @__PURE__ */ new Map();
  for (let o of t) {
    let { priority: i = 0 } = o;
    for (let s of o.selectors) {
      let a = [
        ...document.querySelectorAll(
          // Elements matching the selector, excluding storybook elements and their descendants.
          // Necessary to find portaled elements (e.g. children of `body`).
          `:is(${s}):not([id^="storybook-"], [id^="storybook-"] *, [class^="sb-"], [class^="sb-"] *)`
        ),
        // Elements matching the selector inside the storybook root, as these were excluded above.
        ...e?.querySelectorAll(s) || []
      ];
      for (let l of a) {
        let c = r.get(l);
        (!c || c.priority <= i) && r.set(l, {
          ...o,
          priority: i,
          selectors: Array.from(new Set((c?.selectors || []).concat(s)))
        });
      }
    }
  }
  return r;
}, "mapElements"), Cn = /* @__PURE__ */ n((t) => Array.from(t.entries()).map(([e, { selectors: r, styles: o, hoverStyles: i, focusStyles: s,
menu: a }]) => {
  let { top: l, left: c, width: d, height: p } = e.getBoundingClientRect(), { position: u } = getComputedStyle(e);
  return {
    element: e,
    selectors: r,
    styles: o,
    hoverStyles: i,
    focusStyles: s,
    menu: a,
    top: u === "fixed" ? l : l + window.scrollY,
    left: u === "fixed" ? c : c + window.scrollX,
    width: d,
    height: p
  };
}).sort((e, r) => r.width * r.height - e.width * e.height), "mapBoxes"), xr = /* @__PURE__ */ n((t, e) => {
  let r = t.getBoundingClientRect(), { x: o, y: i } = e;
  return r?.top && r?.left && o >= r.left && o <= r.left + r.width && i >= r.top && i <= r.top + r.height;
}, "isOverMenu"), Tr = /* @__PURE__ */ n((t, e, r) => {
  if (!e || !r)
    return !1;
  let { left: o, top: i, width: s, height: a } = t;
  a < J && (i = i - Math.round((J - a) / 2), a = J), s < J && (o = o - Math.round((J - s) / 2), s = J), e.style.position === "fixed" && (o +=
  window.scrollX, i += window.scrollY);
  let { x: l, y: c } = r;
  return l >= o && l <= o + s && c >= i && c <= i + a;
}, "isTargeted"), Pn = /* @__PURE__ */ n((t, e, r = {}) => {
  let { x: o, y: i } = e, { margin: s = 5, topOffset: a = 0, centered: l = !1 } = r, { scrollX: c, scrollY: d, innerHeight: p, innerWidth: u } = window,
  f = Math.min(
    t.style.position === "fixed" ? i - d : i,
    p - t.clientHeight - s - a + d
  ), h = l ? t.clientWidth / 2 : 0, g = t.style.position === "fixed" ? Math.max(Math.min(o - c, u - h - s), h + s) : Math.max(
    Math.min(o, u - h - s + c),
    h + s + c
  );
  Object.assign(t.style, {
    ...g !== o && { left: `${g}px` },
    ...f !== i && { top: `${f}px` }
  });
}, "keepInViewport"), wr = /* @__PURE__ */ n((t) => {
  window.HTMLElement.prototype.hasOwnProperty("showPopover") && t.showPopover();
}, "showPopover"), Fn = /* @__PURE__ */ n((t) => {
  window.HTMLElement.prototype.hasOwnProperty("showPopover") && t.hidePopover();
}, "hidePopover"), In = /* @__PURE__ */ n((t) => ({
  top: t.top,
  left: t.left,
  width: t.width,
  height: t.height,
  selectors: t.selectors,
  element: {
    attributes: Object.fromEntries(
      Array.from(t.element.attributes).map((e) => [e.name, e.value])
    ),
    localName: t.element.localName,
    tagName: t.element.tagName,
    outerHTML: t.element.outerHTML
  }
}), "getEventDetails");

// src/highlight/useHighlights.ts
var M = "storybook-highlights-menu", On = "storybook-highlights-root", Ma = "storybook-root", kn = /* @__PURE__ */ n((t) => {
  if (globalThis.__STORYBOOK_HIGHLIGHT_INITIALIZED)
    return;
  globalThis.__STORYBOOK_HIGHLIGHT_INITIALIZED = !0;
  let { document: e } = globalThis, r = Z([]), o = Z(/* @__PURE__ */ new Map()), i = Z([]), s = Z(), a = Z(), l = Z([]), c = Z([]), d = Z(),
  p = Z(), u = e.getElementById(On);
  r.subscribe(() => {
    u || (u = j("div", { id: On }), e.body.appendChild(u));
  }), r.subscribe((m) => {
    let b = e.getElementById(Ma);
    if (!b)
      return;
    o.set(Sr(m));
    let S = new MutationObserver(() => o.set(Sr(m)));
    return S.observe(b, { subtree: !0, childList: !0 }), () => {
      S.disconnect();
    };
  }), o.subscribe((m) => {
    let b = /* @__PURE__ */ n(() => requestAnimationFrame(() => i.set(Cn(m))), "updateBoxes"), S = new ResizeObserver(b);
    S.observe(e.body), Array.from(m.keys()).forEach((R) => S.observe(R));
    let C = Array.from(e.body.querySelectorAll("*")).filter((R) => {
      let { overflow: I, overflowX: F, overflowY: k } = window.getComputedStyle(R);
      return ["auto", "scroll"].some((B) => [I, F, k].includes(B));
    });
    return C.forEach((R) => R.addEventListener("scroll", b)), () => {
      S.disconnect(), C.forEach((R) => R.removeEventListener("scroll", b));
    };
  }), o.subscribe((m) => {
    let b = Array.from(m.keys()).filter(({ style: C }) => C.position === "sticky"), S = /* @__PURE__ */ n(() => requestAnimationFrame(() => {
      i.set(
        (C) => C.map((R) => {
          if (b.includes(R.element)) {
            let { top: I, left: F } = R.element.getBoundingClientRect();
            return { ...R, top: I + window.scrollY, left: F + window.scrollX };
          }
          return R;
        })
      );
    }), "updateBoxes");
    return e.addEventListener("scroll", S), () => e.removeEventListener("scroll", S);
  }), o.subscribe((m) => {
    l.set((b) => b.filter(({ element: S }) => m.has(S)));
  }), l.subscribe((m) => {
    m.length ? (p.set((b) => m.some((S) => S.element === b?.element) ? b : void 0), d.set((b) => m.some((S) => S.element === b?.element) ? b :
    void 0)) : (p.set(void 0), d.set(void 0), s.set(void 0));
  });
  let f = new Map(/* @__PURE__ */ new Map());
  r.subscribe((m) => {
    m.forEach(({ keyframes: b }) => {
      if (b) {
        let S = f.get(b);
        S || (S = e.createElement("style"), S.setAttribute("data-highlight", "keyframes"), f.set(b, S), e.head.appendChild(S)), S.innerHTML =
        b;
      }
    }), f.forEach((b, S) => {
      m.some((C) => C.keyframes === S) || (b.remove(), f.delete(S));
    });
  });
  let h = new Map(/* @__PURE__ */ new Map());
  i.subscribe((m) => {
    m.forEach((b) => {
      let S = h.get(b.element);
      if (u && !S) {
        let C = {
          popover: "manual",
          "data-highlight-dimensions": `w${b.width.toFixed(0)}h${b.height.toFixed(0)}`,
          "data-highlight-coordinates": `x${b.left.toFixed(0)}y${b.top.toFixed(0)}`
        };
        S = u.appendChild(
          j("div", C, [j("div")])
        ), h.set(b.element, S);
      }
    }), h.forEach((b, S) => {
      m.some(({ element: C }) => C === S) || (b.remove(), h.delete(S));
    });
  }), i.subscribe((m) => {
    let b = m.filter((C) => C.menu);
    if (!b.length)
      return;
    let S = /* @__PURE__ */ n((C) => {
      requestAnimationFrame(() => {
        let R = e.getElementById(M), I = { x: C.pageX, y: C.pageY };
        if (R && !xr(R, I)) {
          let F = b.filter((k) => {
            let B = h.get(k.element);
            return Tr(k, B, I);
          });
          s.set(F.length ? I : void 0), l.set(F);
        }
      });
    }, "onClick");
    return e.addEventListener("click", S), () => e.removeEventListener("click", S);
  });
  let g = /* @__PURE__ */ n(() => {
    let m = e.getElementById(M), b = a.get();
    !b || m && xr(m, b) || c.set((S) => {
      let C = i.get().filter((k) => {
        let B = h.get(k.element);
        return Tr(k, B, b);
      }), R = S.filter((k) => C.includes(k)), I = C.filter((k) => !S.includes(k)), F = S.length - R.length;
      return I.length || F ? [...R, ...I] : S;
    });
  }, "updateHovered");
  a.subscribe(g), i.subscribe(g);
  let T = /* @__PURE__ */ n(() => {
    let m = p.get(), b = m ? [m] : l.get(), S = b.length === 1 ? b[0] : d.get(), C = s.get() !== void 0;
    i.get().forEach((R) => {
      let I = h.get(R.element);
      if (I) {
        let F = S === R, k = C ? S ? F : b.includes(R) : c.get()?.includes(R);
        Object.assign(I.style, {
          animation: "none",
          background: "transparent",
          border: "none",
          boxSizing: "border-box",
          outline: "none",
          outlineOffset: "0px",
          ...R.styles,
          ...k ? R.hoverStyles : {},
          ...F ? R.focusStyles : {},
          position: getComputedStyle(R.element).position === "fixed" ? "fixed" : "absolute",
          zIndex: gr - 10,
          top: `${R.top}px`,
          left: `${R.left}px`,
          width: `${R.width}px`,
          height: `${R.height}px`,
          margin: 0,
          padding: 0,
          cursor: R.menu && k ? "pointer" : "default",
          pointerEvents: R.menu ? "auto" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible"
        }), Object.assign(I.children[0].style, {
          width: "100%",
          height: "100%",
          minHeight: `${J}px`,
          minWidth: `${J}px`,
          boxSizing: "content-box",
          padding: I.style.outlineWidth || "0px"
        }), wr(I);
      }
    });
  }, "updateBoxStyles");
  i.subscribe(T), l.subscribe(T), c.subscribe(T), d.subscribe(T), p.subscribe(T);
  let x = /* @__PURE__ */ n(() => {
    if (!u)
      return;
    let m = e.getElementById(M);
    if (m)
      m.innerHTML = "";
    else {
      let R = { id: M, popover: "manual" };
      m = u.appendChild(j("div", R)), u.appendChild(
        j("style", {}, [
          `
            #${M} {
              position: absolute;
              z-index: ${gr};
              width: 300px;
              padding: 0px;
              margin: 15px 0 0 0;
              transform: translateX(-50%);
              font-family: "Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Ne\
ue", Helvetica, Arial, sans-serif;
              font-size: 12px;
              background: white;
              border: none;
              border-radius: 6px;
              box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05), 0 5px 15px 0 rgba(0, 0, 0, 0.1);
              color: #2E3438;
            }
            #${M} ul {
              list-style: none;
              margin: 0;
              padding: 0;
            }
            #${M} > ul {
              max-height: 300px;
              overflow-y: auto;
              padding: 4px 0;
            }
            #${M} li {
              padding: 0 4px;
              margin: 0;
            }
            #${M} li > :not(ul) {
              display: flex;
              padding: 8px;
              margin: 0;
              align-items: center;
              gap: 8px;
              border-radius: 4px;
            }
            #${M} button {
              width: 100%;
              border: 0;
              background: transparent;
              color: inherit;
              text-align: left;
              font-family: inherit;
              font-size: inherit;
            }
            #${M} button:focus-visible {
              outline-color: #029CFD;
            }
            #${M} button:hover {
              background: rgba(2, 156, 253, 0.07);
              color: #029CFD;
              cursor: pointer;
            }
            #${M} li code {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 16px;
              font-size: 11px;
            }
            #${M} li svg {
              flex-shrink: 0;
              margin: 1px;
              color: #73828C;
            }
            #${M} li > button:hover svg, #${M} li > button:focus-visible svg {
              color: #029CFD;
            }
            #${M} .element-list li svg {
              display: none;
            }
            #${M} li.selectable svg, #${M} li.selected svg {
              display: block;
            }
            #${M} .menu-list {
              border-top: 1px solid rgba(38, 85, 115, 0.15);
            }
            #${M} .menu-list > li:not(:last-child) {
              padding-bottom: 4px;
              margin-bottom: 4px;
              border-bottom: 1px solid rgba(38, 85, 115, 0.15);
            }
            #${M} .menu-items, #${M} .menu-items li {
              padding: 0;
            }
            #${M} .menu-item {
              display: flex;
            }
            #${M} .menu-item-content {
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            }
          `
        ])
      );
    }
    let b = p.get(), S = b ? [b] : l.get();
    if (S.length && (m.style.position = getComputedStyle(S[0].element).position === "fixed" ? "fixed" : "absolute", m.appendChild(
      j(
        "ul",
        { class: "element-list" },
        S.map((R) => {
          let I = S.length > 1 && !!R.menu?.some(
            (B) => B.some(
              (L) => !L.selectors || L.selectors.some((X) => R.selectors.includes(X))
            )
          ), F = I ? {
            class: "selectable",
            onClick: /* @__PURE__ */ n(() => p.set(R), "onClick"),
            onMouseEnter: /* @__PURE__ */ n(() => d.set(R), "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ n(() => d.set(void 0), "onMouseLeave")
          } : b ? { class: "selected", onClick: /* @__PURE__ */ n(() => p.set(void 0), "onClick") } : {}, k = I || b;
          return j("li", F, [
            j(k ? "button" : "div", k ? { type: "button" } : {}, [
              b ? Ye("chevronLeft") : null,
              j("code", {}, [R.element.outerHTML]),
              I ? Ye("chevronRight") : null
            ])
          ]);
        })
      )
    )), p.get() || l.get().length === 1) {
      let R = p.get() || l.get()[0], I = R.menu?.filter(
        (F) => F.some(
          (k) => !k.selectors || k.selectors.some((B) => R.selectors.includes(B))
        )
      );
      I?.length && m.appendChild(
        j(
          "ul",
          { class: "menu-list" },
          I.map(
            (F) => j("li", {}, [
              j(
                "ul",
                { class: "menu-items" },
                F.map(
                  ({ id: k, title: B, description: L, iconLeft: X, iconRight: ye, clickEvent: Ro }) => {
                    let Vt = Ro && (() => t.emit(Ro, k, In(R)));
                    return j("li", {}, [
                      j(
                        Vt ? "button" : "div",
                        Vt ? { class: "menu-item", type: "button", onClick: Vt } : { class: "menu-item" },
                        [
                          X ? Ye(X) : null,
                          j("div", { class: "menu-item-content" }, [
                            j(L ? "strong" : "span", {}, [B]),
                            L && j("span", {}, [L])
                          ]),
                          ye ? Ye(ye) : null
                        ]
                      )
                    ]);
                  }
                )
              )
            ])
          )
        )
      );
    }
    let C = s.get();
    C ? (Object.assign(m.style, {
      display: "block",
      left: `${m.style.position === "fixed" ? C.x - window.scrollX : C.x}px`,
      top: `${m.style.position === "fixed" ? C.y - window.scrollY : C.y}px`
    }), wr(m), requestAnimationFrame(() => Pn(m, C, { topOffset: 15, centered: !0 }))) : (Fn(m), Object.assign(m.style, { display: "none" }));
  }, "renderMenu");
  l.subscribe(x), p.subscribe(x);
  let v = /* @__PURE__ */ n((m) => {
    let b = vn(m);
    r.set((S) => {
      let C = b.id ? S.filter((R) => R.id !== b.id) : S;
      return b.selectors?.length ? [...C, b] : C;
    });
  }, "addHighlight"), E = /* @__PURE__ */ n((m) => {
    m && r.set((b) => b.filter((S) => S.id !== m));
  }, "removeHighlight"), y = /* @__PURE__ */ n(() => {
    r.set([]), o.set(/* @__PURE__ */ new Map()), i.set([]), s.set(void 0), a.set(void 0), l.set([]), c.set([]), d.set(void 0), p.set(void 0);
  }, "resetState"), w, A = /* @__PURE__ */ n((m, b) => {
    let S = "scrollIntoView-highlight";
    clearTimeout(w), E(S);
    let C = e.querySelector(m);
    if (!C) {
      console.warn(`Cannot scroll into view: ${m} not found`);
      return;
    }
    C.scrollIntoView({ behavior: "smooth", block: "center", ...b });
    let R = `kf-${Math.random().toString(36).substring(2, 15)}`;
    r.set((I) => [
      ...I,
      {
        id: S,
        priority: 1e3,
        selectors: [m],
        styles: {
          outline: "2px solid #1EA7FD",
          outlineOffset: "-1px",
          animation: `${R} 3s linear forwards`
        },
        keyframes: `@keyframes ${R} {
          0% { outline: 2px solid #1EA7FD; }
          20% { outline: 2px solid #1EA7FD00; }
          40% { outline: 2px solid #1EA7FD; }
          60% { outline: 2px solid #1EA7FD00; }
          80% { outline: 2px solid #1EA7FD; }
          100% { outline: 2px solid #1EA7FD00; }
        }`
      }
    ]), w = setTimeout(() => E(S), 3500);
  }, "scrollIntoView"), P = /* @__PURE__ */ n((m) => {
    requestAnimationFrame(() => a.set({ x: m.pageX, y: m.pageY }));
  }, "onMouseMove");
  e.body.addEventListener("mousemove", P), t.on(wn, v), t.on(Rn, E), t.on(En, y), t.on(An, A), t.on(Da, ({ newPhase: m }) => {
    m === "loading" && y();
  });
}, "useHighlights");

// src/highlight/preview.ts
globalThis?.FEATURES?.highlight && Dn?.ready && Dn.ready().then(kn);
var Rr = /* @__PURE__ */ n(() => La({}), "default");

// src/measure/preview.ts
import { definePreview as Qa } from "storybook/preview-api";

// src/measure/constants.ts
var yt = "storybook/measure-addon", vf = `${yt}/tool`, Mn = "measureEnabled", Cf = {
  RESULT: `${yt}/result`,
  REQUEST: `${yt}/request`,
  CLEAR: `${yt}/clear`
};

// src/measure/withMeasure.ts
import { useEffect as Yn } from "storybook/preview-api";

// src/measure/box-model/canvas.ts
import { global as ht } from "@storybook/global";

// ../node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var _a = !1, Er = "Invariant failed";
function se(t, e) {
  if (!t) {
    if (_a)
      throw new Error(Er);
    var r = typeof e == "function" ? e() : e, o = r ? "".concat(Er, ": ").concat(r) : Er;
    throw new Error(o);
  }
}
n(se, "invariant");

// src/measure/box-model/canvas.ts
function Ln() {
  let t = ht.document.documentElement, e = Math.max(t.scrollHeight, t.offsetHeight);
  return { width: Math.max(t.scrollWidth, t.offsetWidth), height: e };
}
n(Ln, "getDocumentWidthAndHeight");
function ja() {
  let t = ht.document.createElement("canvas");
  t.id = "storybook-addon-measure";
  let e = t.getContext("2d");
  se(e != null);
  let { width: r, height: o } = Ln();
  return Ar(t, e, { width: r, height: o }), t.style.position = "absolute", t.style.left = "0", t.style.top = "0", t.style.zIndex = "21474836\
47", t.style.pointerEvents = "none", ht.document.body.appendChild(t), { canvas: t, context: e, width: r, height: o };
}
n(ja, "createCanvas");
function Ar(t, e, { width: r, height: o }) {
  t.style.width = `${r}px`, t.style.height = `${o}px`;
  let i = ht.window.devicePixelRatio;
  t.width = Math.floor(r * i), t.height = Math.floor(o * i), e.scale(i, i);
}
n(Ar, "setCanvasWidthAndHeight");
var N = {};
function _n() {
  N.canvas || (N = ja());
}
n(_n, "init");
function jn() {
  N.context && N.context.clearRect(0, 0, N.width ?? 0, N.height ?? 0);
}
n(jn, "clear");
function Nn(t) {
  jn(), t(N.context);
}
n(Nn, "draw");
function qn() {
  se(N.canvas, "Canvas should exist in the state."), se(N.context, "Context should exist in the state."), Ar(N.canvas, N.context, { width: 0,
  height: 0 });
  let { width: t, height: e } = Ln();
  Ar(N.canvas, N.context, { width: t, height: e }), N.width = t, N.height = e;
}
n(qn, "rescale");
function Hn() {
  N.canvas && (jn(), N.canvas.parentNode?.removeChild(N.canvas), N = {});
}
n(Hn, "destroy");

// src/measure/box-model/visualizer.ts
import { global as Y } from "@storybook/global";

// src/measure/box-model/labels.ts
var Pe = {
  margin: "#f6b26b",
  border: "#ffe599",
  padding: "#93c47d",
  content: "#6fa8dc",
  text: "#232020"
}, oe = 6;
function $n(t, { x: e, y: r, w: o, h: i, r: s }) {
  e = e - o / 2, r = r - i / 2, o < 2 * s && (s = o / 2), i < 2 * s && (s = i / 2), t.beginPath(), t.moveTo(e + s, r), t.arcTo(e + o, r, e +
  o, r + i, s), t.arcTo(e + o, r + i, e, r + i, s), t.arcTo(e, r + i, e, r, s), t.arcTo(e, r, e + o, r, s), t.closePath();
}
n($n, "roundedRect");
function Na(t, { padding: e, border: r, width: o, height: i, top: s, left: a }) {
  let l = o - r.left - r.right - e.left - e.right, c = i - e.top - e.bottom - r.top - r.bottom, d = a + r.left + e.left, p = s + r.top + e.top;
  return t === "top" ? d += l / 2 : t === "right" ? (d += l, p += c / 2) : t === "bottom" ? (d += l / 2, p += c) : t === "left" ? p += c / 2 :
  t === "center" && (d += l / 2, p += c / 2), { x: d, y: p };
}
n(Na, "positionCoordinate");
function qa(t, e, { margin: r, border: o, padding: i }, s, a) {
  let l = /* @__PURE__ */ n((f) => 0, "shift"), c = 0, d = 0, p = a ? 1 : 0.5, u = a ? s * 2 : 0;
  return t === "padding" ? l = /* @__PURE__ */ n((f) => i[f] * p + u, "shift") : t === "border" ? l = /* @__PURE__ */ n((f) => i[f] + o[f] *
  p + u, "shift") : t === "margin" && (l = /* @__PURE__ */ n((f) => i[f] + o[f] + r[f] * p + u, "shift")), e === "top" ? d = -l("top") : e ===
  "right" ? c = l("right") : e === "bottom" ? d = l("bottom") : e === "left" && (c = -l("left")), { offsetX: c, offsetY: d };
}
n(qa, "offset");
function Ha(t, e) {
  return Math.abs(t.x - e.x) < Math.abs(t.w + e.w) / 2 && Math.abs(t.y - e.y) < Math.abs(t.h + e.h) / 2;
}
n(Ha, "collide");
function $a(t, e, r) {
  return t === "top" ? e.y = r.y - r.h - oe : t === "right" ? e.x = r.x + r.w / 2 + oe + e.w / 2 : t === "bottom" ? e.y = r.y + r.h + oe : t ===
  "left" && (e.x = r.x - r.w / 2 - oe - e.w / 2), { x: e.x, y: e.y };
}
n($a, "overlapAdjustment");
function Bn(t, e, { x: r, y: o, w: i, h: s }, a) {
  return $n(t, { x: r, y: o, w: i, h: s, r: 3 }), t.fillStyle = `${Pe[e]}dd`, t.fill(), t.strokeStyle = Pe[e], t.stroke(), t.fillStyle = Pe.
  text, t.fillText(a, r, o), $n(t, { x: r, y: o, w: i, h: s, r: 3 }), t.fillStyle = `${Pe[e]}dd`, t.fill(), t.strokeStyle = Pe[e], t.stroke(),
  t.fillStyle = Pe.text, t.fillText(a, r, o), { x: r, y: o, w: i, h: s };
}
n(Bn, "textWithRect");
function Gn(t, e) {
  t.font = "600 12px monospace", t.textBaseline = "middle", t.textAlign = "center";
  let r = t.measureText(e), o = r.actualBoundingBoxAscent + r.actualBoundingBoxDescent, i = r.width + oe * 2, s = o + oe * 2;
  return { w: i, h: s };
}
n(Gn, "configureText");
function Ba(t, e, { type: r, position: o = "center", text: i }, s, a = !1) {
  let { x: l, y: c } = Na(o, e), { offsetX: d, offsetY: p } = qa(r, o, e, oe + 1, a);
  l += d, c += p;
  let { w: u, h: f } = Gn(t, i);
  if (s && Ha({ x: l, y: c, w: u, h: f }, s)) {
    let h = $a(o, { x: l, y: c, w: u, h: f }, s);
    l = h.x, c = h.y;
  }
  return Bn(t, r, { x: l, y: c, w: u, h: f }, i);
}
n(Ba, "drawLabel");
function Ga(t, { w: e, h: r }) {
  let o = e * 0.5 + oe, i = r * 0.5 + oe;
  return {
    offsetX: (t.x === "left" ? -1 : 1) * o,
    offsetY: (t.y === "top" ? -1 : 1) * i
  };
}
n(Ga, "floatingOffset");
function za(t, e, { type: r, text: o }) {
  let { floatingAlignment: i, extremities: s } = e, a = s[i.x], l = s[i.y], { w: c, h: d } = Gn(t, o), { offsetX: p, offsetY: u } = Ga(i, {
    w: c,
    h: d
  });
  return a += p, l += u, Bn(t, r, { x: a, y: l, w: c, h: d }, o);
}
n(za, "drawFloatingLabel");
function Ke(t, e, r, o) {
  let i = [];
  r.forEach((s, a) => {
    let l = o && s.position === "center" ? za(t, e, s) : Ba(t, e, s, i[a - 1], o);
    i[a] = l;
  });
}
n(Ke, "drawStack");
function zn(t, e, r, o) {
  let i = r.reduce((s, a) => (Object.prototype.hasOwnProperty.call(s, a.position) || (s[a.position] = []), s[a.position]?.push(a), s), {});
  i.top && Ke(t, e, i.top, o), i.right && Ke(t, e, i.right, o), i.bottom && Ke(t, e, i.bottom, o), i.left && Ke(t, e, i.left, o), i.center &&
  Ke(t, e, i.center, o);
}
n(zn, "labelStacks");

// src/measure/box-model/visualizer.ts
var gt = {
  margin: "#f6b26ba8",
  border: "#ffe599a8",
  padding: "#93c47d8c",
  content: "#6fa8dca8"
}, Un = 30;
function U(t) {
  return parseInt(t.replace("px", ""), 10);
}
n(U, "pxToNumber");
function Fe(t) {
  return Number.isInteger(t) ? t : t.toFixed(2);
}
n(Fe, "round");
function vr(t) {
  return t.filter((e) => e.text !== 0 && e.text !== "0");
}
n(vr, "filterZeroValues");
function Ua(t) {
  let e = {
    top: Y.window.scrollY,
    bottom: Y.window.scrollY + Y.window.innerHeight,
    left: Y.window.scrollX,
    right: Y.window.scrollX + Y.window.innerWidth
  }, r = {
    top: Math.abs(e.top - t.top),
    bottom: Math.abs(e.bottom - t.bottom),
    left: Math.abs(e.left - t.left),
    right: Math.abs(e.right - t.right)
  };
  return {
    x: r.left > r.right ? "left" : "right",
    y: r.top > r.bottom ? "top" : "bottom"
  };
}
n(Ua, "floatingAlignment");
function Va(t) {
  let e = Y.getComputedStyle(t), { top: r, left: o, right: i, bottom: s, width: a, height: l } = t.getBoundingClientRect(), {
    marginTop: c,
    marginBottom: d,
    marginLeft: p,
    marginRight: u,
    paddingTop: f,
    paddingBottom: h,
    paddingLeft: g,
    paddingRight: T,
    borderBottomWidth: x,
    borderTopWidth: v,
    borderLeftWidth: E,
    borderRightWidth: y
  } = e;
  r = r + Y.window.scrollY, o = o + Y.window.scrollX, s = s + Y.window.scrollY, i = i + Y.window.scrollX;
  let w = {
    top: U(c),
    bottom: U(d),
    left: U(p),
    right: U(u)
  }, A = {
    top: U(f),
    bottom: U(h),
    left: U(g),
    right: U(T)
  }, P = {
    top: U(v),
    bottom: U(x),
    left: U(E),
    right: U(y)
  }, m = {
    top: r - w.top,
    bottom: s + w.bottom,
    left: o - w.left,
    right: i + w.right
  };
  return {
    margin: w,
    padding: A,
    border: P,
    top: r,
    left: o,
    bottom: s,
    right: i,
    width: a,
    height: l,
    extremities: m,
    floatingAlignment: Ua(m)
  };
}
n(Va, "measureElement");
function Wa(t, { margin: e, width: r, height: o, top: i, left: s, bottom: a, right: l }) {
  let c = o + e.bottom + e.top;
  t.fillStyle = gt.margin, t.fillRect(s, i - e.top, r, e.top), t.fillRect(l, i - e.top, e.right, c), t.fillRect(s, a, r, e.bottom), t.fillRect(
  s - e.left, i - e.top, e.left, c);
  let d = [
    {
      type: "margin",
      text: Fe(e.top),
      position: "top"
    },
    {
      type: "margin",
      text: Fe(e.right),
      position: "right"
    },
    {
      type: "margin",
      text: Fe(e.bottom),
      position: "bottom"
    },
    {
      type: "margin",
      text: Fe(e.left),
      position: "left"
    }
  ];
  return vr(d);
}
n(Wa, "drawMargin");
function Ya(t, { padding: e, border: r, width: o, height: i, top: s, left: a, bottom: l, right: c }) {
  let d = o - r.left - r.right, p = i - e.top - e.bottom - r.top - r.bottom;
  t.fillStyle = gt.padding, t.fillRect(a + r.left, s + r.top, d, e.top), t.fillRect(
    c - e.right - r.right,
    s + e.top + r.top,
    e.right,
    p
  ), t.fillRect(
    a + r.left,
    l - e.bottom - r.bottom,
    d,
    e.bottom
  ), t.fillRect(a + r.left, s + e.top + r.top, e.left, p);
  let u = [
    {
      type: "padding",
      text: e.top,
      position: "top"
    },
    {
      type: "padding",
      text: e.right,
      position: "right"
    },
    {
      type: "padding",
      text: e.bottom,
      position: "bottom"
    },
    {
      type: "padding",
      text: e.left,
      position: "left"
    }
  ];
  return vr(u);
}
n(Ya, "drawPadding");
function Ka(t, { border: e, width: r, height: o, top: i, left: s, bottom: a, right: l }) {
  let c = o - e.top - e.bottom;
  t.fillStyle = gt.border, t.fillRect(s, i, r, e.top), t.fillRect(s, a - e.bottom, r, e.bottom), t.fillRect(s, i + e.top, e.left, c), t.fillRect(
  l - e.right, i + e.top, e.right, c);
  let d = [
    {
      type: "border",
      text: e.top,
      position: "top"
    },
    {
      type: "border",
      text: e.right,
      position: "right"
    },
    {
      type: "border",
      text: e.bottom,
      position: "bottom"
    },
    {
      type: "border",
      text: e.left,
      position: "left"
    }
  ];
  return vr(d);
}
n(Ka, "drawBorder");
function Xa(t, { padding: e, border: r, width: o, height: i, top: s, left: a }) {
  let l = o - r.left - r.right - e.left - e.right, c = i - e.top - e.bottom - r.top - r.bottom;
  return t.fillStyle = gt.content, t.fillRect(
    a + r.left + e.left,
    s + r.top + e.top,
    l,
    c
  ), [
    {
      type: "content",
      position: "center",
      text: `${Fe(l)} x ${Fe(c)}`
    }
  ];
}
n(Xa, "drawContent");
function Ja(t) {
  return (e) => {
    if (t && e) {
      let r = Va(t), o = Wa(e, r), i = Ya(e, r), s = Ka(e, r), a = Xa(e, r), l = r.width <= Un * 3 || r.height <= Un;
      zn(
        e,
        r,
        [...a, ...i, ...s, ...o],
        l
      );
    }
  };
}
n(Ja, "drawBoxModel");
function Vn(t) {
  Nn(Ja(t));
}
n(Vn, "drawSelectedElement");

// src/measure/util.ts
import { global as Za } from "@storybook/global";
var Wn = /* @__PURE__ */ n((t, e) => {
  let r = Za.document.elementFromPoint(t, e), o = /* @__PURE__ */ n((s) => {
    if (s && s.shadowRoot) {
      let a = s.shadowRoot.elementFromPoint(t, e);
      return s.isEqualNode(a) ? s : a.shadowRoot ? o(a) : a;
    }
    return s;
  }, "crawlShadows");
  return o(r) || r;
}, "deepElementFromPoint");

// src/measure/withMeasure.ts
var Kn, bt = { x: 0, y: 0 };
function Xn(t, e) {
  Kn = Wn(t, e), Vn(Kn);
}
n(Xn, "findAndDrawElement");
var Jn = /* @__PURE__ */ n((t, e) => {
  let { measureEnabled: r } = e.globals || {};
  return Yn(() => {
    if (typeof globalThis.document > "u")
      return;
    let o = /* @__PURE__ */ n((i) => {
      window.requestAnimationFrame(() => {
        i.stopPropagation(), bt.x = i.clientX, bt.y = i.clientY;
      });
    }, "onPointerMove");
    return globalThis.document.addEventListener("pointermove", o), () => {
      globalThis.document.removeEventListener("pointermove", o);
    };
  }, []), Yn(() => {
    let o = /* @__PURE__ */ n((s) => {
      window.requestAnimationFrame(() => {
        s.stopPropagation(), Xn(s.clientX, s.clientY);
      });
    }, "onPointerOver"), i = /* @__PURE__ */ n(() => {
      window.requestAnimationFrame(() => {
        qn();
      });
    }, "onResize");
    return e.viewMode === "story" && r && (globalThis.document.addEventListener("pointerover", o), _n(), globalThis.window.addEventListener(
    "resize", i), Xn(bt.x, bt.y)), () => {
      globalThis.window.removeEventListener("resize", i), Hn();
    };
  }, [r, e.viewMode]), t();
}, "withMeasure");

// src/measure/preview.ts
var el = globalThis.FEATURES?.measure ? [Jn] : [], tl = {
  [Mn]: !1
}, Cr = /* @__PURE__ */ n(() => Qa({
  decorators: el,
  initialGlobals: tl
}), "default");

// src/outline/preview.ts
import { definePreview as il } from "storybook/preview-api";

// src/outline/constants.ts
var St = "outline";

// src/outline/withOutline.ts
import { useEffect as ol, useMemo as nl } from "storybook/preview-api";

// src/outline/helpers.ts
import { global as xt } from "@storybook/global";
var Pr = /* @__PURE__ */ n((t) => {
  (Array.isArray(t) ? t : [t]).forEach(rl);
}, "clearStyles"), rl = /* @__PURE__ */ n((t) => {
  let e = typeof t == "string" ? t : t.join(""), r = xt.document.getElementById(e);
  r && r.parentElement && r.parentElement.removeChild(r);
}, "clearStyle"), Zn = /* @__PURE__ */ n((t, e) => {
  let r = xt.document.getElementById(t);
  if (r)
    r.innerHTML !== e && (r.innerHTML = e);
  else {
    let o = xt.document.createElement("style");
    o.setAttribute("id", t), o.innerHTML = e, xt.document.head.appendChild(o);
  }
}, "addOutlineStyles");

// ../node_modules/ts-dedent/esm/index.js
function _(t) {
  for (var e = [], r = 1; r < arguments.length; r++)
    e[r - 1] = arguments[r];
  var o = Array.from(typeof t == "string" ? [t] : t);
  o[o.length - 1] = o[o.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var i = o.reduce(function(l, c) {
    var d = c.match(/\n([\t ]+|(?!\s).)/g);
    return d ? l.concat(d.map(function(p) {
      var u, f;
      return (f = (u = p.match(/[\t ]/g)) === null || u === void 0 ? void 0 : u.length) !== null && f !== void 0 ? f : 0;
    })) : l;
  }, []);
  if (i.length) {
    var s = new RegExp(`
[	 ]{` + Math.min.apply(Math, i) + "}", "g");
    o = o.map(function(l) {
      return l.replace(s, `
`);
    });
  }
  o[0] = o[0].replace(/^\r?\n/, "");
  var a = o[0];
  return e.forEach(function(l, c) {
    var d = a.match(/(?:^|\n)( *)$/), p = d ? d[1] : "", u = l;
    typeof l == "string" && l.includes(`
`) && (u = String(l).split(`
`).map(function(f, h) {
      return h === 0 ? f : "" + p + f;
    }).join(`
`)), a += u + o[c + 1];
  }), a;
}
n(_, "dedent");

// src/outline/outlineCSS.ts
function Fr(t) {
  return _`
    ${t} body {
      outline: 1px solid #2980b9 !important;
    }

    ${t} article {
      outline: 1px solid #3498db !important;
    }

    ${t} nav {
      outline: 1px solid #0088c3 !important;
    }

    ${t} aside {
      outline: 1px solid #33a0ce !important;
    }

    ${t} section {
      outline: 1px solid #66b8da !important;
    }

    ${t} header {
      outline: 1px solid #99cfe7 !important;
    }

    ${t} footer {
      outline: 1px solid #cce7f3 !important;
    }

    ${t} h1 {
      outline: 1px solid #162544 !important;
    }

    ${t} h2 {
      outline: 1px solid #314e6e !important;
    }

    ${t} h3 {
      outline: 1px solid #3e5e85 !important;
    }

    ${t} h4 {
      outline: 1px solid #449baf !important;
    }

    ${t} h5 {
      outline: 1px solid #c7d1cb !important;
    }

    ${t} h6 {
      outline: 1px solid #4371d0 !important;
    }

    ${t} main {
      outline: 1px solid #2f4f90 !important;
    }

    ${t} address {
      outline: 1px solid #1a2c51 !important;
    }

    ${t} div {
      outline: 1px solid #036cdb !important;
    }

    ${t} p {
      outline: 1px solid #ac050b !important;
    }

    ${t} hr {
      outline: 1px solid #ff063f !important;
    }

    ${t} pre {
      outline: 1px solid #850440 !important;
    }

    ${t} blockquote {
      outline: 1px solid #f1b8e7 !important;
    }

    ${t} ol {
      outline: 1px solid #ff050c !important;
    }

    ${t} ul {
      outline: 1px solid #d90416 !important;
    }

    ${t} li {
      outline: 1px solid #d90416 !important;
    }

    ${t} dl {
      outline: 1px solid #fd3427 !important;
    }

    ${t} dt {
      outline: 1px solid #ff0043 !important;
    }

    ${t} dd {
      outline: 1px solid #e80174 !important;
    }

    ${t} figure {
      outline: 1px solid #ff00bb !important;
    }

    ${t} figcaption {
      outline: 1px solid #bf0032 !important;
    }

    ${t} table {
      outline: 1px solid #00cc99 !important;
    }

    ${t} caption {
      outline: 1px solid #37ffc4 !important;
    }

    ${t} thead {
      outline: 1px solid #98daca !important;
    }

    ${t} tbody {
      outline: 1px solid #64a7a0 !important;
    }

    ${t} tfoot {
      outline: 1px solid #22746b !important;
    }

    ${t} tr {
      outline: 1px solid #86c0b2 !important;
    }

    ${t} th {
      outline: 1px solid #a1e7d6 !important;
    }

    ${t} td {
      outline: 1px solid #3f5a54 !important;
    }

    ${t} col {
      outline: 1px solid #6c9a8f !important;
    }

    ${t} colgroup {
      outline: 1px solid #6c9a9d !important;
    }

    ${t} button {
      outline: 1px solid #da8301 !important;
    }

    ${t} datalist {
      outline: 1px solid #c06000 !important;
    }

    ${t} fieldset {
      outline: 1px solid #d95100 !important;
    }

    ${t} form {
      outline: 1px solid #d23600 !important;
    }

    ${t} input {
      outline: 1px solid #fca600 !important;
    }

    ${t} keygen {
      outline: 1px solid #b31e00 !important;
    }

    ${t} label {
      outline: 1px solid #ee8900 !important;
    }

    ${t} legend {
      outline: 1px solid #de6d00 !important;
    }

    ${t} meter {
      outline: 1px solid #e8630c !important;
    }

    ${t} optgroup {
      outline: 1px solid #b33600 !important;
    }

    ${t} option {
      outline: 1px solid #ff8a00 !important;
    }

    ${t} output {
      outline: 1px solid #ff9619 !important;
    }

    ${t} progress {
      outline: 1px solid #e57c00 !important;
    }

    ${t} select {
      outline: 1px solid #e26e0f !important;
    }

    ${t} textarea {
      outline: 1px solid #cc5400 !important;
    }

    ${t} details {
      outline: 1px solid #33848f !important;
    }

    ${t} summary {
      outline: 1px solid #60a1a6 !important;
    }

    ${t} command {
      outline: 1px solid #438da1 !important;
    }

    ${t} menu {
      outline: 1px solid #449da6 !important;
    }

    ${t} del {
      outline: 1px solid #bf0000 !important;
    }

    ${t} ins {
      outline: 1px solid #400000 !important;
    }

    ${t} img {
      outline: 1px solid #22746b !important;
    }

    ${t} iframe {
      outline: 1px solid #64a7a0 !important;
    }

    ${t} embed {
      outline: 1px solid #98daca !important;
    }

    ${t} object {
      outline: 1px solid #00cc99 !important;
    }

    ${t} param {
      outline: 1px solid #37ffc4 !important;
    }

    ${t} video {
      outline: 1px solid #6ee866 !important;
    }

    ${t} audio {
      outline: 1px solid #027353 !important;
    }

    ${t} source {
      outline: 1px solid #012426 !important;
    }

    ${t} canvas {
      outline: 1px solid #a2f570 !important;
    }

    ${t} track {
      outline: 1px solid #59a600 !important;
    }

    ${t} map {
      outline: 1px solid #7be500 !important;
    }

    ${t} area {
      outline: 1px solid #305900 !important;
    }

    ${t} a {
      outline: 1px solid #ff62ab !important;
    }

    ${t} em {
      outline: 1px solid #800b41 !important;
    }

    ${t} strong {
      outline: 1px solid #ff1583 !important;
    }

    ${t} i {
      outline: 1px solid #803156 !important;
    }

    ${t} b {
      outline: 1px solid #cc1169 !important;
    }

    ${t} u {
      outline: 1px solid #ff0430 !important;
    }

    ${t} s {
      outline: 1px solid #f805e3 !important;
    }

    ${t} small {
      outline: 1px solid #d107b2 !important;
    }

    ${t} abbr {
      outline: 1px solid #4a0263 !important;
    }

    ${t} q {
      outline: 1px solid #240018 !important;
    }

    ${t} cite {
      outline: 1px solid #64003c !important;
    }

    ${t} dfn {
      outline: 1px solid #b4005a !important;
    }

    ${t} sub {
      outline: 1px solid #dba0c8 !important;
    }

    ${t} sup {
      outline: 1px solid #cc0256 !important;
    }

    ${t} time {
      outline: 1px solid #d6606d !important;
    }

    ${t} code {
      outline: 1px solid #e04251 !important;
    }

    ${t} kbd {
      outline: 1px solid #5e001f !important;
    }

    ${t} samp {
      outline: 1px solid #9c0033 !important;
    }

    ${t} var {
      outline: 1px solid #d90047 !important;
    }

    ${t} mark {
      outline: 1px solid #ff0053 !important;
    }

    ${t} bdi {
      outline: 1px solid #bf3668 !important;
    }

    ${t} bdo {
      outline: 1px solid #6f1400 !important;
    }

    ${t} ruby {
      outline: 1px solid #ff7b93 !important;
    }

    ${t} rt {
      outline: 1px solid #ff2f54 !important;
    }

    ${t} rp {
      outline: 1px solid #803e49 !important;
    }

    ${t} span {
      outline: 1px solid #cc2643 !important;
    }

    ${t} br {
      outline: 1px solid #db687d !important;
    }

    ${t} wbr {
      outline: 1px solid #db175b !important;
    }`;
}
n(Fr, "outlineCSS");

// src/outline/withOutline.ts
var Qn = /* @__PURE__ */ n((t, e) => {
  let r = e.globals || {}, o = [!0, "true"].includes(r[St]), i = e.viewMode === "docs", s = nl(() => Fr(i ? '[data-story-block="true"]' : ".\
sb-show-main"), [e]);
  return ol(() => {
    let a = i ? `addon-outline-docs-${e.id}` : "addon-outline";
    return o ? Zn(a, s) : Pr(a), () => {
      Pr(a);
    };
  }, [o, s, e]), t();
}, "withOutline");

// src/outline/preview.ts
var sl = globalThis.FEATURES?.outline ? [Qn] : [], al = {
  [St]: !1
}, Ir = /* @__PURE__ */ n(() => il({ decorators: sl, initialGlobals: al }), "default");

// src/test/preview.ts
import { instrument as ll } from "storybook/internal/instrumenter";
import { definePreview as cl } from "storybook/preview-api";
import {
  clearAllMocks as dl,
  fn as pl,
  isMockFunction as ul,
  resetAllMocks as fl,
  restoreAllMocks as ml,
  uninstrumentedUserEvent as yl,
  within as hl
} from "storybook/test";
var gl = /* @__PURE__ */ n(({ parameters: t }) => {
  t?.test?.mockReset === !0 ? fl() : t?.test?.clearMocks === !0 ? dl() : t?.test?.restoreMocks !== !1 && ml();
}, "resetAllMocksLoader"), Or = /* @__PURE__ */ n((t, e = 0, r) => {
  if (e > 5 || t == null)
    return t;
  if (ul(t))
    return r && t.mockName(r), t;
  if (typeof t == "function" && "isAction" in t && t.isAction && !("implicit" in t && t.implicit)) {
    let o = pl(t);
    return r && o.mockName(r), o;
  }
  if (Array.isArray(t)) {
    e++;
    for (let o = 0; o < t.length; o++)
      Object.getOwnPropertyDescriptor(t, o)?.writable && (t[o] = Or(t[o], e));
    return t;
  }
  if (typeof t == "object" && t.constructor === Object) {
    e++;
    for (let [o, i] of Object.entries(t))
      Object.getOwnPropertyDescriptor(t, o)?.writable && (t[o] = Or(i, e, o));
    return t;
  }
  return t;
}, "traverseArgs"), bl = /* @__PURE__ */ n(({ initialArgs: t }) => {
  Or(t);
}, "nameSpiesAndWrapActionsInSpies"), ei = !1, Sl = /* @__PURE__ */ n(async (t) => {
  globalThis.HTMLElement && t.canvasElement instanceof globalThis.HTMLElement && (t.canvas = hl(t.canvasElement));
  let e = globalThis.window?.navigator?.clipboard;
  if (e) {
    t.userEvent = ll(
      { userEvent: yl.setup() },
      { intercept: !0 }
    ).userEvent, Object.defineProperty(globalThis.window.navigator, "clipboard", {
      get: /* @__PURE__ */ n(() => e, "get"),
      configurable: !0
    });
    let r = HTMLElement.prototype.focus;
    ei || Object.defineProperties(HTMLElement.prototype, {
      focus: {
        configurable: !0,
        set: /* @__PURE__ */ n((o) => {
          r = o, ei = !0;
        }, "set"),
        get: /* @__PURE__ */ n(() => r, "get")
      }
    });
  }
}, "enhanceContext"), kr = /* @__PURE__ */ n(() => cl({
  loaders: [gl, bl, Sl]
}), "default");

// src/viewport/preview.ts
import { definePreview as xl } from "storybook/preview-api";

// src/viewport/constants.ts
var ti = "storybook/viewport", ri = "viewport", Cm = `${ti}/panel`, Pm = `${ti}/tool`;

// src/viewport/preview.ts
var Tl = {
  [ri]: { value: void 0, isRotated: !1 }
}, Dr = /* @__PURE__ */ n(() => xl({
  initialGlobals: Tl
}), "default");

// src/shared/preview/core-annotations.ts
function Xe() {
  return [
    // @ts-expect-error CJS fallback
    (Cr.default ?? Cr)(),
    // @ts-expect-error CJS fallback
    (yr.default ?? yr)(),
    // @ts-expect-error CJS fallback
    (Rr.default ?? Rr)(),
    // @ts-expect-error CJS fallback
    (Ir.default ?? Ir)(),
    // @ts-expect-error CJS fallback
    (Dr.default ?? Dr)(),
    // @ts-expect-error CJS fallback
    (fr.default ?? fr)(),
    // @ts-expect-error CJS fallback
    (hr.default ?? hr)(),
    // @ts-expect-error CJS fallback
    (kr.default ?? kr)()
  ];
}
n(Xe, "getCoreAnnotations");

// src/preview-api/modules/store/args.ts
import { once as Mr } from "storybook/internal/client-logger";
var Ie = Symbol("incompatible"), Lr = /* @__PURE__ */ n((t, e) => {
  let r = e.type;
  if (t == null || !r || e.mapping)
    return t;
  switch (r.name) {
    case "string":
      return String(t);
    case "enum":
      return t;
    case "number":
      return Number(t);
    case "boolean":
      return String(t) === "true";
    case "array":
      return !r.value || !Array.isArray(t) ? Ie : t.reduce((o, i, s) => {
        let a = Lr(i, { type: r.value });
        return a !== Ie && (o[s] = a), o;
      }, new Array(t.length));
    case "object":
      return typeof t == "string" || typeof t == "number" ? t : !r.value || typeof t != "object" ? Ie : Object.entries(t).reduce((o, [i, s]) => {
        let a = Lr(s, { type: r.value[i] });
        return a === Ie ? o : Object.assign(o, { [i]: a });
      }, {});
    default:
      return Ie;
  }
}, "map"), oi = /* @__PURE__ */ n((t, e) => Object.entries(t).reduce((r, [o, i]) => {
  if (!e[o])
    return r;
  let s = Lr(i, e[o]);
  return s === Ie ? r : Object.assign(r, { [o]: s });
}, {}), "mapArgsToTypes"), Je = /* @__PURE__ */ n((t, e) => Array.isArray(t) && Array.isArray(e) ? e.reduce(
  (r, o, i) => (r[i] = Je(t[i], e[i]), r),
  [...t]
).filter((r) => r !== void 0) : !$(t) || !$(e) ? e : Object.keys({ ...t, ...e }).reduce((r, o) => {
  if (o in e) {
    let i = Je(t[o], e[o]);
    i !== void 0 && (r[o] = i);
  } else
    r[o] = t[o];
  return r;
}, {}), "combineArgs"), ni = /* @__PURE__ */ n((t, e) => Object.entries(e).reduce((r, [o, { options: i }]) => {
  function s() {
    return o in t && (r[o] = t[o]), r;
  }
  if (n(s, "allowArg"), !i)
    return s();
  if (!Array.isArray(i))
    return Mr.error(_`
        Invalid argType: '${o}.options' should be an array.

        More info: https://storybook.js.org/docs/api/arg-types
      `), s();
  if (i.some((u) => u && ["object", "function"].includes(typeof u)))
    return Mr.error(_`
        Invalid argType: '${o}.options' should only contain primitives. Use a 'mapping' for complex values.

        More info: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
      `), s();
  let a = Array.isArray(t[o]), l = a && t[o].findIndex((u) => !i.includes(u)), c = a && l === -1;
  if (t[o] === void 0 || i.includes(t[o]) || c)
    return s();
  let d = a ? `${o}[${l}]` : o, p = i.map((u) => typeof u == "string" ? `'${u}'` : String(u)).join(", ");
  return Mr.warn(`Received illegal value for '${d}'. Supported options: ${p}`), r;
}, {}), "validateOptions"), be = Symbol("Deeply equal"), Oe = /* @__PURE__ */ n((t, e) => {
  if (typeof t != typeof e)
    return e;
  if (ar(t, e))
    return be;
  if (Array.isArray(t) && Array.isArray(e)) {
    let r = e.reduce((o, i, s) => {
      let a = Oe(t[s], i);
      return a !== be && (o[s] = a), o;
    }, new Array(e.length));
    return e.length >= t.length ? r : r.concat(new Array(t.length - e.length).fill(void 0));
  }
  return $(t) && $(e) ? Object.keys({ ...t, ...e }).reduce((r, o) => {
    let i = Oe(t?.[o], e?.[o]);
    return i === be ? r : Object.assign(r, { [o]: i });
  }, {}) : e;
}, "deepDiff"), _r = "UNTARGETED";
function ii({
  args: t,
  argTypes: e
}) {
  let r = {};
  return Object.entries(t).forEach(([o, i]) => {
    let { target: s = _r } = e[o] || {};
    r[s] = r[s] || {}, r[s][o] = i;
  }), r;
}
n(ii, "groupArgsByTarget");

// src/preview-api/modules/store/ArgsStore.ts
function wl(t) {
  return Object.keys(t).forEach((e) => t[e] === void 0 && delete t[e]), t;
}
n(wl, "deleteUndefined");
var jr = class jr {
  constructor() {
    this.initialArgsByStoryId = {};
    this.argsByStoryId = {};
  }
  get(e) {
    if (!(e in this.argsByStoryId))
      throw new Error(`No args known for ${e} -- has it been rendered yet?`);
    return this.argsByStoryId[e];
  }
  setInitial(e) {
    if (!this.initialArgsByStoryId[e.id])
      this.initialArgsByStoryId[e.id] = e.initialArgs, this.argsByStoryId[e.id] = e.initialArgs;
    else if (this.initialArgsByStoryId[e.id] !== e.initialArgs) {
      let r = Oe(this.initialArgsByStoryId[e.id], this.argsByStoryId[e.id]);
      this.initialArgsByStoryId[e.id] = e.initialArgs, this.argsByStoryId[e.id] = e.initialArgs, r !== be && this.updateFromDelta(e, r);
    }
  }
  updateFromDelta(e, r) {
    let o = ni(r, e.argTypes);
    this.argsByStoryId[e.id] = Je(this.argsByStoryId[e.id], o);
  }
  updateFromPersisted(e, r) {
    let o = oi(r, e.argTypes);
    return this.updateFromDelta(e, o);
  }
  update(e, r) {
    if (!(e in this.argsByStoryId))
      throw new Error(`No args known for ${e} -- has it been rendered yet?`);
    this.argsByStoryId[e] = wl({
      ...this.argsByStoryId[e],
      ...r
    });
  }
};
n(jr, "ArgsStore");
var Tt = jr;

// src/preview-api/modules/store/GlobalsStore.ts
import { logger as Rl } from "storybook/internal/client-logger";

// src/preview-api/modules/store/csf/getValuesFromArgTypes.ts
var wt = /* @__PURE__ */ n((t = {}) => Object.entries(t).reduce((e, [r, { defaultValue: o }]) => (typeof o < "u" && (e[r] = o), e), {}), "ge\
tValuesFromArgTypes");

// src/preview-api/modules/store/GlobalsStore.ts
var Nr = class Nr {
  constructor({
    globals: e = {},
    globalTypes: r = {}
  }) {
    this.set({ globals: e, globalTypes: r });
  }
  set({ globals: e = {}, globalTypes: r = {} }) {
    let o = this.initialGlobals && Oe(this.initialGlobals, this.globals);
    this.allowedGlobalNames = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(r)]);
    let i = wt(r);
    this.initialGlobals = { ...i, ...e }, this.globals = this.initialGlobals, o && o !== be && this.updateFromPersisted(o);
  }
  filterAllowedGlobals(e) {
    return Object.entries(e).reduce((r, [o, i]) => (this.allowedGlobalNames.has(o) ? r[o] = i : Rl.warn(
      `Attempted to set a global (${o}) that is not defined in initial globals or globalTypes`
    ), r), {});
  }
  updateFromPersisted(e) {
    let r = this.filterAllowedGlobals(e);
    this.globals = { ...this.globals, ...r };
  }
  get() {
    return this.globals;
  }
  update(e) {
    this.globals = { ...this.globals, ...this.filterAllowedGlobals(e) };
    for (let r in e)
      e[r] === void 0 && (this.globals[r] = this.initialGlobals[r]);
  }
};
n(Nr, "GlobalsStore");
var Rt = Nr;

// src/preview-api/modules/store/StoryIndexStore.ts
var si = ve(cr(), 1);
import { MissingStoryAfterHmrError as El } from "storybook/internal/preview-errors";
var Al = (0, si.default)(1)(
  (t) => Object.values(t).reduce(
    (e, r) => (e[r.importPath] = e[r.importPath] || r, e),
    {}
  )
), qr = class qr {
  constructor({ entries: e } = { v: 5, entries: {} }) {
    this.entries = e;
  }
  entryFromSpecifier(e) {
    let r = Object.values(this.entries);
    if (e === "*")
      return r[0];
    if (typeof e == "string")
      return this.entries[e] ? this.entries[e] : r.find((s) => s.id.startsWith(e));
    let { name: o, title: i } = e;
    return r.find((s) => s.name === o && s.title === i);
  }
  storyIdToEntry(e) {
    let r = this.entries[e];
    if (!r)
      throw new El({ storyId: e });
    return r;
  }
  importPathToEntry(e) {
    return Al(this.entries)[e];
  }
};
n(qr, "StoryIndexStore");
var Et = qr;

// src/preview-api/modules/store/csf/normalizeInputTypes.ts
var vl = /* @__PURE__ */ n((t) => typeof t == "string" ? { name: t } : t, "normalizeType"), Cl = /* @__PURE__ */ n((t) => typeof t == "strin\
g" ? { type: t } : t, "normalizeControl"), Pl = /* @__PURE__ */ n((t, e) => {
  let { type: r, control: o, ...i } = t, s = {
    name: e,
    ...i
  };
  return r && (s.type = vl(r)), o ? s.control = Cl(o) : o === !1 && (s.control = { disable: !0 }), s;
}, "normalizeInputType"), Se = /* @__PURE__ */ n((t) => re(t, Pl), "normalizeInputTypes");

// src/preview-api/modules/store/csf/normalizeStory.ts
import { deprecate as Fl, logger as Il } from "storybook/internal/client-logger";
import { storyNameFromExport as Ol, toId as kl } from "storybook/internal/csf";

// src/preview-api/modules/store/csf/normalizeArrays.ts
var D = /* @__PURE__ */ n((t) => Array.isArray(t) ? t : t ? [t] : [], "normalizeArrays");

// src/preview-api/modules/store/csf/normalizeStory.ts
var Dl = _`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;
function ke(t, e, r) {
  let o = e, i = typeof e == "function" ? e : null, { story: s } = o;
  s && (Il.debug("deprecated story", s), Fl(Dl));
  let a = Ol(t), l = typeof o != "function" && o.name || o.storyName || s?.name || a, c = [
    ...D(o.decorators),
    ...D(s?.decorators)
  ], d = { ...s?.parameters, ...o.parameters }, p = { ...s?.args, ...o.args }, u = { ...s?.argTypes, ...o.argTypes }, f = [...D(o.loaders), ...D(
  s?.loaders)], h = [
    ...D(o.beforeEach),
    ...D(s?.beforeEach)
  ], g = [
    ...D(o.afterEach),
    ...D(s?.afterEach)
  ], { render: T, play: x, tags: v = [], globals: E = {} } = o, y = d.__id || kl(r.id, a);
  return {
    moduleExport: e,
    id: y,
    name: l,
    tags: v,
    decorators: c,
    parameters: d,
    args: p,
    argTypes: Se(u),
    loaders: f,
    beforeEach: h,
    afterEach: g,
    globals: E,
    ...T && { render: T },
    ...i && { userStoryFn: i },
    ...x && { play: x }
  };
}
n(ke, "normalizeStory");

// src/preview-api/modules/store/csf/processCSFFile.ts
import { logger as li } from "storybook/internal/client-logger";
import { isExportStory as ai, isStory as Ll } from "storybook/internal/csf";

// src/preview-api/modules/store/csf/normalizeComponentAnnotations.ts
import { sanitize as Ml } from "storybook/internal/csf";
function Ze(t, e = t.title, r) {
  let { id: o, argTypes: i } = t;
  return {
    id: Ml(o || e),
    ...t,
    title: e,
    ...i && { argTypes: Se(i) },
    parameters: {
      fileName: r,
      ...t.parameters
    }
  };
}
n(Ze, "normalizeComponentAnnotations");

// src/preview-api/modules/store/csf/processCSFFile.ts
var _l = /* @__PURE__ */ n((t) => {
  let { globals: e, globalTypes: r } = t;
  (e || r) && li.error(
    "Global args/argTypes can only be set globally",
    JSON.stringify({
      globals: e,
      globalTypes: r
    })
  );
}, "checkGlobals"), jl = /* @__PURE__ */ n((t) => {
  let { options: e } = t;
  e?.storySort && li.error("The storySort option parameter can only be set globally");
}, "checkStorySort"), At = /* @__PURE__ */ n((t) => {
  t && (_l(t), jl(t));
}, "checkDisallowedParameters");
function ci(t, e, r) {
  let { default: o, __namedExportsOrder: i, ...s } = t, a = Object.values(s)[0];
  if (Ll(a)) {
    let d = Ze(a.meta.input, r, e);
    At(d.parameters);
    let p = { meta: d, stories: {}, moduleExports: t };
    return Object.keys(s).forEach((u) => {
      if (ai(u, d)) {
        let f = ke(u, s[u].input, d);
        At(f.parameters), p.stories[f.id] = f;
      }
    }), p.projectAnnotations = a.meta.preview.composed, p;
  }
  let l = Ze(
    o,
    r,
    e
  );
  At(l.parameters);
  let c = { meta: l, stories: {}, moduleExports: t };
  return Object.keys(s).forEach((d) => {
    if (ai(d, l)) {
      let p = ke(d, s[d], l);
      At(p.parameters), c.stories[p.id] = p;
    }
  }), c;
}
n(ci, "processCSFFile");

// src/preview-api/modules/store/csf/prepareStory.ts
import { combineTags as ql, includeConditionalArg as Hl } from "storybook/internal/csf";
import { NoRenderFunctionError as $l } from "storybook/internal/preview-errors";
import { global as Bl } from "@storybook/global";
import { global as Gl } from "@storybook/global";

// src/preview-api/modules/preview-web/render/mount-utils.ts
function pi(t) {
  return t != null && Nl(t).includes("mount");
}
n(pi, "mountDestructured");
function Nl(t) {
  let e = t.toString().match(/[^(]*\(([^)]*)/);
  if (!e)
    return [];
  let r = di(e[1]);
  if (!r.length)
    return [];
  let o = r[0];
  return o.startsWith("{") && o.endsWith("}") ? di(o.slice(1, -1).replace(/\s/g, "")).map((s) => s.replace(/:.*|=.*/g, "")) : [];
}
n(Nl, "getUsedProps");
function di(t) {
  let e = [], r = [], o = 0;
  for (let s = 0; s < t.length; s++)
    if (t[s] === "{" || t[s] === "[")
      r.push(t[s] === "{" ? "}" : "]");
    else if (t[s] === r[r.length - 1])
      r.pop();
    else if (!r.length && t[s] === ",") {
      let a = t.substring(o, s).trim();
      a && e.push(a), o = s + 1;
    }
  let i = t.substring(o).trim();
  return i && e.push(i), e;
}
n(di, "splitByComma");

// src/preview-api/modules/store/decorators.ts
function ui(t, e, r) {
  let o = r(t);
  return (i) => e(o, i);
}
n(ui, "decorateStory");
function fi({
  componentId: t,
  title: e,
  kind: r,
  id: o,
  name: i,
  story: s,
  parameters: a,
  initialArgs: l,
  argTypes: c,
  ...d
} = {}) {
  return d;
}
n(fi, "sanitizeStoryContextUpdate");
function Hr(t, e) {
  let r = {}, o = /* @__PURE__ */ n((s) => (a) => {
    if (!r.value)
      throw new Error("Decorated function called without init");
    return r.value = {
      ...r.value,
      ...fi(a)
    }, s(r.value);
  }, "bindWithContext"), i = e.reduce(
    (s, a) => ui(s, a, o),
    t
  );
  return (s) => (r.value = s, i(s));
}
n(Hr, "defaultDecorateStory");

// src/preview-api/modules/store/parameters.ts
var V = /* @__PURE__ */ n((...t) => {
  let e = {}, r = t.filter(Boolean), o = r.reduce((i, s) => (Object.entries(s).forEach(([a, l]) => {
    let c = i[a];
    Array.isArray(l) || typeof c > "u" ? i[a] = l : $(l) && $(c) ? e[a] = !0 : typeof l < "u" && (i[a] = l);
  }), i), {});
  return Object.keys(e).forEach((i) => {
    let s = r.filter(Boolean).map((a) => a[i]).filter((a) => typeof a < "u");
    s.every((a) => $(a)) ? o[i] = V(...s) : o[i] = s[s.length - 1];
  }), o;
}, "combineParameters");

// src/preview-api/modules/store/csf/prepareStory.ts
function Qe(t, e, r) {
  let { moduleExport: o, id: i, name: s } = t || {}, a = mi(
    t,
    e,
    r
  ), l = /* @__PURE__ */ n(async (P) => {
    let m = {};
    for (let b of [
      D(r.loaders),
      D(e.loaders),
      D(t.loaders)
    ]) {
      if (P.abortSignal.aborted)
        return m;
      let S = await Promise.all(b.map((C) => C(P)));
      Object.assign(m, ...S);
    }
    return m;
  }, "applyLoaders"), c = /* @__PURE__ */ n(async (P) => {
    let m = new Array();
    for (let b of [
      ...D(r.beforeEach),
      ...D(e.beforeEach),
      ...D(t.beforeEach)
    ]) {
      if (P.abortSignal.aborted)
        return m;
      let S = await b(P);
      S && m.push(S);
    }
    return m;
  }, "applyBeforeEach"), d = /* @__PURE__ */ n(async (P) => {
    let m = [
      ...D(r.afterEach),
      ...D(e.afterEach),
      ...D(t.afterEach)
    ].reverse();
    for (let b of m) {
      if (P.abortSignal.aborted)
        return;
      await b(P);
    }
  }, "applyAfterEach"), p = /* @__PURE__ */ n((P) => P.originalStoryFn(P.args, P), "undecoratedStoryFn"), { applyDecorators: u = Hr, runStep: f } = r,
  h = [
    ...D(t?.decorators),
    ...D(e?.decorators),
    ...D(r?.decorators)
  ], g = t?.userStoryFn || t?.render || e.render || r.render, T = Qt(u)(p, h), x = /* @__PURE__ */ n((P) => T(P), "unboundStoryFn"), v = t?.
  play ?? e?.play, E = pi(v);
  if (!g && !E)
    throw new $l({ id: i });
  let y = /* @__PURE__ */ n((P) => async () => (await P.renderToCanvas(), P.canvas), "defaultMount"), w = t.mount ?? e.mount ?? r.mount ?? y,
  A = r.testingLibraryRender;
  return {
    storyGlobals: {},
    ...a,
    moduleExport: o,
    id: i,
    name: s,
    story: s,
    originalStoryFn: g,
    undecoratedStoryFn: p,
    unboundStoryFn: x,
    applyLoaders: l,
    applyBeforeEach: c,
    applyAfterEach: d,
    playFunction: v,
    runStep: f,
    mount: w,
    testingLibraryRender: A,
    renderToCanvas: r.renderToCanvas,
    usesMount: E
  };
}
n(Qe, "prepareStory");
function $r(t, e, r) {
  return {
    ...mi(void 0, t, e),
    moduleExport: r
  };
}
n($r, "prepareMeta");
function mi(t, e, r) {
  let o = ["dev", "test"], i = Gl.DOCS_OPTIONS?.autodocs === !0 ? ["autodocs"] : [], s = ql(
    ...o,
    ...i,
    ...r.tags ?? [],
    ...e.tags ?? [],
    ...t?.tags ?? []
  ), a = V(
    r.parameters,
    e.parameters,
    t?.parameters
  ), { argTypesEnhancers: l = [], argsEnhancers: c = [] } = r, d = V(
    r.argTypes,
    e.argTypes,
    t?.argTypes
  );
  if (t) {
    let v = t?.userStoryFn || t?.render || e.render || r.render;
    a.__isArgsStory = v && v.length > 0;
  }
  let p = {
    ...r.args,
    ...e.args,
    ...t?.args
  }, u = {
    ...e.globals,
    ...t?.globals
  }, f = {
    componentId: e.id,
    title: e.title,
    kind: e.title,
    // Back compat
    id: t?.id || e.id,
    // if there's no story name, we create a fake one since enhancers expect a name
    name: t?.name || "__meta",
    story: t?.name || "__meta",
    // Back compat
    component: e.component,
    subcomponents: e.subcomponents,
    tags: s,
    parameters: a,
    initialArgs: p,
    argTypes: d,
    storyGlobals: u
  };
  f.argTypes = l.reduce(
    (v, E) => E({ ...f, argTypes: v }),
    f.argTypes
  );
  let h = { ...p };
  f.initialArgs = [...c].reduce(
    (v, E) => ({
      ...v,
      ...E({
        ...f,
        initialArgs: v
      })
    }),
    h
  );
  let { name: g, story: T, ...x } = f;
  return x;
}
n(mi, "preparePartialAnnotations");
function vt(t) {
  let { args: e } = t, r = {
    ...t,
    allArgs: void 0,
    argsByTarget: void 0
  };
  if (Bl.FEATURES?.argTypeTargetsV7) {
    let s = ii(t);
    r = {
      ...t,
      allArgs: t.args,
      argsByTarget: s,
      args: s[_r] || {}
    };
  }
  let o = Object.entries(r.args).reduce((s, [a, l]) => {
    if (!r.argTypes[a]?.mapping)
      return s[a] = l, s;
    let c = /* @__PURE__ */ n((d) => {
      let p = r.argTypes[a].mapping;
      return p && d in p ? p[d] : d;
    }, "mappingFn");
    return s[a] = Array.isArray(l) ? l.map(c) : c(l), s;
  }, {}), i = Object.entries(o).reduce((s, [a, l]) => {
    let c = r.argTypes[a] || {};
    return Hl(c, o, r.globals) && (s[a] = l), s;
  }, {});
  return { ...r, unmappedArgs: e, args: i };
}
n(vt, "prepareContext");

// src/preview-api/modules/store/inferArgTypes.ts
import { logger as zl } from "storybook/internal/client-logger";
var Br = /* @__PURE__ */ n((t, e, r) => {
  let o = typeof t;
  switch (o) {
    case "boolean":
    case "string":
    case "number":
    case "function":
    case "symbol":
      return { name: o };
    default:
      break;
  }
  return t ? r.has(t) ? (zl.warn(_`
        We've detected a cycle in arg '${e}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/essentials/controls#fully-custom-args
      `), { name: "other", value: "cyclic object" }) : (r.add(t), Array.isArray(t) ? { name: "array", value: t.length > 0 ? Br(t[0], e, new Set(
  r)) : { name: "other", value: "unknown" } } : { name: "object", value: re(t, (s) => Br(s, e, new Set(r))) }) : { name: "object", value: {} };
}, "inferType"), Gr = /* @__PURE__ */ n((t) => {
  let { id: e, argTypes: r = {}, initialArgs: o = {} } = t, i = re(o, (a, l) => ({
    name: l,
    type: Br(a, `${e}.${l}`, /* @__PURE__ */ new Set())
  })), s = re(r, (a, l) => ({
    name: l
  }));
  return V(i, s, r);
}, "inferArgTypes");
Gr.secondPass = !0;

// src/preview-api/modules/store/inferControls.ts
import { logger as Ul } from "storybook/internal/client-logger";

// src/preview-api/modules/store/filterArgTypes.ts
var yi = /* @__PURE__ */ n((t, e) => Array.isArray(e) ? e.includes(t) : t.match(e), "matches"), Ct = /* @__PURE__ */ n((t, e, r) => !e && !r ?
t : t && sr(t, (o, i) => {
  let s = o.name || i.toString();
  return !!(!e || yi(s, e)) && (!r || !yi(s, r));
}), "filterArgTypes");

// src/preview-api/modules/store/inferControls.ts
var Vl = /* @__PURE__ */ n((t, e, r) => {
  let { type: o, options: i } = t;
  if (o) {
    if (r.color && r.color.test(e)) {
      let s = o.name;
      if (s === "string")
        return { control: { type: "color" } };
      s !== "enum" && Ul.warn(
        `Addon controls: Control of type color only supports string, received "${s}" instead`
      );
    }
    if (r.date && r.date.test(e))
      return { control: { type: "date" } };
    switch (o.name) {
      case "array":
        return { control: { type: "object" } };
      case "boolean":
        return { control: { type: "boolean" } };
      case "string":
        return { control: { type: "text" } };
      case "number":
        return { control: { type: "number" } };
      case "enum": {
        let { value: s } = o;
        return { control: { type: s?.length <= 5 ? "radio" : "select" }, options: s };
      }
      case "function":
      case "symbol":
        return null;
      default:
        return { control: { type: i ? "select" : "object" } };
    }
  }
}, "inferControl"), et = /* @__PURE__ */ n((t) => {
  let {
    argTypes: e,
    parameters: { __isArgsStory: r, controls: { include: o = null, exclude: i = null, matchers: s = {} } = {} }
  } = t;
  if (!r)
    return e;
  let a = Ct(e, o, i), l = re(a, (c, d) => c?.type && Vl(c, d.toString(), s));
  return V(l, a);
}, "inferControls");
et.secondPass = !0;

// src/preview-api/modules/store/csf/normalizeProjectAnnotations.ts
function De({
  argTypes: t,
  globalTypes: e,
  argTypesEnhancers: r,
  decorators: o,
  loaders: i,
  beforeEach: s,
  afterEach: a,
  initialGlobals: l,
  ...c
}) {
  return {
    ...t && { argTypes: Se(t) },
    ...e && { globalTypes: Se(e) },
    decorators: D(o),
    loaders: D(i),
    beforeEach: D(s),
    afterEach: D(a),
    argTypesEnhancers: [
      ...r || [],
      Gr,
      // There's an architectural decision to be made regarding embedded addons in core:
      //
      // Option 1: Keep embedded addons but ensure consistency by moving addon-specific code
      // (like inferControls) to live alongside the addon code itself. This maintains the
      // concept of core addons while improving code organization.
      //
      // Option 2: Fully integrate these addons into core, potentially moving UI components
      // into the manager and treating them as core features rather than addons. This is a
      // bigger architectural change requiring careful consideration.
      //
      // For now, we're keeping inferControls here as we need time to properly evaluate
      // these options and their implications. Some features (like Angular's cleanArgsDecorator)
      // currently rely on this behavior.
      //
      // TODO: Make an architectural decision on the handling of core addons
      et
    ],
    initialGlobals: l,
    ...c
  };
}
n(De, "normalizeProjectAnnotations");

// src/preview-api/modules/store/csf/composeConfigs.ts
import { global as Wl } from "@storybook/global";

// src/preview-api/modules/store/csf/beforeAll.ts
var hi = /* @__PURE__ */ n((t) => async () => {
  let e = [];
  for (let r of t) {
    let o = await r();
    o && e.unshift(o);
  }
  return async () => {
    for (let r of e)
      await r();
  };
}, "composeBeforeAllHooks");

// src/preview-api/modules/store/csf/stepRunners.ts
function zr(t) {
  return async (e, r, o) => {
    await t.reduceRight(
      (s, a) => async () => a(e, s, o),
      async () => r(o)
    )();
  };
}
n(zr, "composeStepRunners");

// src/preview-api/modules/store/csf/composeConfigs.ts
function rt(t, e) {
  return t.map((r) => r.default?.[e] ?? r[e]).filter(Boolean);
}
n(rt, "getField");
function ae(t, e, r = {}) {
  return rt(t, e).reduce((o, i) => {
    let s = D(i);
    return r.reverseFileOrder ? [...s, ...o] : [...o, ...s];
  }, []);
}
n(ae, "getArrayField");
function Pt(t, e) {
  return Object.assign({}, ...rt(t, e));
}
n(Pt, "getObjectField");
function tt(t, e) {
  return rt(t, e).pop();
}
n(tt, "getSingletonField");
function le(t) {
  let e = ae(t, "argTypesEnhancers"), r = rt(t, "runStep"), o = ae(t, "beforeAll");
  return {
    parameters: V(...rt(t, "parameters")),
    decorators: ae(t, "decorators", {
      reverseFileOrder: !(Wl.FEATURES?.legacyDecoratorFileOrder ?? !1)
    }),
    args: Pt(t, "args"),
    argsEnhancers: ae(t, "argsEnhancers"),
    argTypes: Pt(t, "argTypes"),
    argTypesEnhancers: [
      ...e.filter((i) => !i.secondPass),
      ...e.filter((i) => i.secondPass)
    ],
    initialGlobals: Pt(t, "initialGlobals"),
    globalTypes: Pt(t, "globalTypes"),
    loaders: ae(t, "loaders"),
    beforeAll: hi(o),
    beforeEach: ae(t, "beforeEach"),
    afterEach: ae(t, "afterEach"),
    render: tt(t, "render"),
    renderToCanvas: tt(t, "renderToCanvas"),
    applyDecorators: tt(t, "applyDecorators"),
    runStep: zr(r),
    tags: ae(t, "tags"),
    mount: tt(t, "mount"),
    testingLibraryRender: tt(t, "testingLibraryRender")
  };
}
n(le, "composeConfigs");

// src/preview-api/modules/store/csf/portable-stories.ts
import { isExportStory as Xl } from "storybook/internal/csf";
import { MountMustBeDestructuredError as Jl } from "storybook/internal/preview-errors";

// src/preview-api/modules/preview-web/render/animation-utils.ts
function Ft() {
  try {
    return (
      // @ts-expect-error this property exists in certain environments
      !!globalThis.__vitest_browser__ || // @ts-expect-error this property exists in certain environments
      !!globalThis.__playwright__binding__
    );
  } catch {
    return !1;
  }
}
n(Ft, "isTestEnvironment");
function Me(t = !0) {
  if (!("document" in globalThis && "createElement" in globalThis.document))
    return () => {
    };
  let e = document.createElement("style");
  e.textContent = `*, *:before, *:after {
    animation: none !important;
  }`, document.head.appendChild(e);
  let r = document.createElement("style");
  return r.textContent = `*, *:before, *:after {
    animation-delay: 0s !important;
    animation-direction: ${t ? "reverse" : "normal"} !important;
    animation-play-state: paused !important;
    transition: none !important;
  }`, document.head.appendChild(r), document.body.clientHeight, document.head.removeChild(e), () => {
    r.parentNode?.removeChild(r);
  };
}
n(Me, "pauseAnimations");
async function Le(t) {
  if (!("document" in globalThis && "getAnimations" in globalThis.document && "querySelectorAll" in globalThis.document))
    return;
  let e = !1;
  await Promise.race([
    // After 50ms, retrieve any running animations and wait for them to finish
    // If new animations are created while waiting, we'll wait for them too
    new Promise((r) => {
      setTimeout(() => {
        let o = [globalThis.document, ...gi(globalThis.document)], i = /* @__PURE__ */ n(async () => {
          if (e || t?.aborted)
            return;
          let s = o.flatMap((a) => a?.getAnimations?.() || []).filter((a) => a.playState === "running" && !Yl(a));
          s.length > 0 && (await Promise.all(s.map((a) => a.finished)), await i());
        }, "checkAnimationsFinished");
        i().then(r);
      }, 100);
    }),
    // If animations don't finish within the timeout, continue without waiting
    new Promise(
      (r) => setTimeout(() => {
        e = !0, r(void 0);
      }, 5e3)
    )
  ]);
}
n(Le, "waitForAnimations");
function gi(t) {
  return [t, ...t.querySelectorAll("*")].reduce((e, r) => ("shadowRoot" in r && r.shadowRoot && e.push(r.shadowRoot, ...gi(r.shadowRoot)), e),
  []);
}
n(gi, "getShadowRoots");
function Yl(t) {
  if (t instanceof CSSAnimation && t.effect instanceof KeyframeEffect && t.effect.target) {
    let e = getComputedStyle(t.effect.target, t.effect.pseudoElement), r = e.animationName?.split(", ").indexOf(t.animationName);
    return e.animationIterationCount.split(", ")[r] === "infinite";
  }
  return !1;
}
n(Yl, "isInfiniteAnimation");

// src/preview-api/modules/store/reporter-api.ts
var Ur = class Ur {
  constructor() {
    this.reports = [];
  }
  async addReport(e) {
    this.reports.push(e);
  }
};
n(Ur, "ReporterAPI");
var xe = Ur;

// src/preview-api/modules/store/csf/csf-factory-utils.ts
import { isStory as Kl } from "storybook/internal/csf";
function Vr(t, e, r) {
  return Kl(t) ? {
    story: t.input,
    meta: t.meta.input,
    preview: t.meta.preview.composed
  } : { story: t, meta: e, preview: r };
}
n(Vr, "getCsfFactoryAnnotations");

// src/preview-api/modules/store/csf/portable-stories.ts
function Zl(t) {
  globalThis.defaultProjectAnnotations = t;
}
n(Zl, "setDefaultProjectAnnotations");
var Ql = "ComposedStory", ec = "Unnamed Story";
function tc(t) {
  return t ? le([t]) : {};
}
n(tc, "extractAnnotation");
function rc(t) {
  let e = Array.isArray(t) ? t : [t];
  return globalThis.globalProjectAnnotations = le([
    ...Xe(),
    globalThis.defaultProjectAnnotations ?? {},
    le(e.map(tc))
  ]), globalThis.globalProjectAnnotations ?? {};
}
n(rc, "setProjectAnnotations");
var ce = [];
function bi(t, e, r, o, i) {
  if (t === void 0)
    throw new Error("Expected a story but received undefined.");
  e.title = e.title ?? Ql;
  let s = Ze(e), a = i || t.storyName || t.story?.name || t.name || ec, l = ke(
    a,
    t,
    s
  ), c = De(
    le([
      o ?? globalThis.globalProjectAnnotations ?? {},
      r ?? {}
    ])
  ), d = Qe(
    l,
    s,
    c
  ), u = {
    ...wt(c.globalTypes),
    ...c.initialGlobals,
    ...d.storyGlobals
  }, f = new xe(), h = /* @__PURE__ */ n(() => {
    let y = vt({
      hooks: new he(),
      globals: u,
      args: { ...d.initialArgs },
      viewMode: "story",
      reporting: f,
      loaded: {},
      abortSignal: new AbortController().signal,
      step: /* @__PURE__ */ n((w, A) => d.runStep(w, A, y), "step"),
      canvasElement: null,
      canvas: {},
      userEvent: {},
      globalTypes: c.globalTypes,
      ...d,
      context: null,
      mount: null
    });
    return y.parameters.__isPortableStory = !0, y.context = y, d.renderToCanvas && (y.renderToCanvas = async () => {
      let w = await d.renderToCanvas?.(
        {
          componentId: d.componentId,
          title: d.title,
          id: d.id,
          name: d.name,
          tags: d.tags,
          showMain: /* @__PURE__ */ n(() => {
          }, "showMain"),
          showError: /* @__PURE__ */ n((A) => {
            throw new Error(`${A.title}
${A.description}`);
          }, "showError"),
          showException: /* @__PURE__ */ n((A) => {
            throw A;
          }, "showException"),
          forceRemount: !0,
          storyContext: y,
          storyFn: /* @__PURE__ */ n(() => d.unboundStoryFn(y), "storyFn"),
          unboundStoryFn: d.unboundStoryFn
        },
        y.canvasElement
      );
      w && ce.push(w);
    }), y.mount = d.mount(y), y;
  }, "initializeContext"), g, T = /* @__PURE__ */ n(async (y) => {
    let w = h();
    return w.canvasElement ??= globalThis?.document?.body, g && (w.loaded = g.loaded), Object.assign(w, y), d.playFunction(w);
  }, "play"), x = /* @__PURE__ */ n((y) => {
    let w = h();
    return Object.assign(w, y), sc(d, w);
  }, "run"), v = d.playFunction ? T : void 0;
  return Object.assign(
    /* @__PURE__ */ n(function(w) {
      let A = h();
      return g && (A.loaded = g.loaded), A.args = {
        ...A.initialArgs,
        ...w
      }, d.unboundStoryFn(A);
    }, "storyFn"),
    {
      id: d.id,
      storyName: a,
      load: /* @__PURE__ */ n(async () => {
        for (let w of [...ce].reverse())
          await w();
        ce.length = 0;
        let y = h();
        y.loaded = await d.applyLoaders(y), ce.push(...(await d.applyBeforeEach(y)).filter(Boolean)), g = y;
      }, "load"),
      globals: u,
      args: d.initialArgs,
      parameters: d.parameters,
      argTypes: d.argTypes,
      play: v,
      run: x,
      reporting: f,
      tags: d.tags
    }
  );
}
n(bi, "composeStory");
var oc = /* @__PURE__ */ n((t, e, r, o) => bi(t, e, r, {}, o), "defaultComposeStory");
function nc(t, e, r = oc) {
  let { default: o, __esModule: i, __namedExportsOrder: s, ...a } = t, l = o;
  return Object.entries(a).reduce(
    (d, [p, u]) => {
      let { story: f, meta: h } = Vr(u);
      return !l && h && (l = h), Xl(p, l) ? Object.assign(d, {
        [p]: r(f, l, e, p)
      }) : d;
    },
    {}
  );
}
n(nc, "composeStories");
function ic(t) {
  return t.extend({
    mount: /* @__PURE__ */ n(async ({ mount: e, page: r }, o) => {
      await o(async (i, ...s) => {
        if (!("__pw_type" in i) || "__pw_type" in i && i.__pw_type !== "jsx")
          throw new Error(_`
              Portable stories in Playwright CT only work when referencing JSX elements.
              Please use JSX format for your components such as:

              instead of:
              await mount(MyComponent, { props: { foo: 'bar' } })

              do:
              await mount(<MyComponent foo="bar"/>)

              More info: https://storybook.js.org/docs/api/portable-stories-playwright
            `);
        let { props: a, ...l } = i;
        await r.evaluate(async (d) => {
          let p = await globalThis.__pwUnwrapObject?.(d);
          return ("__pw_type" in p ? p.type : p)?.load?.();
        }, l);
        let c = await e(i, ...s);
        return await r.evaluate(async (d) => {
          let p = await globalThis.__pwUnwrapObject?.(d), u = "__pw_type" in p ? p.type : p, f = document.querySelector("#root");
          return u?.play?.({ canvasElement: f });
        }, l), c;
      });
    }, "mount")
  });
}
n(ic, "createPlaywrightTest");
async function sc(t, e) {
  for (let s of [...ce].reverse())
    await s();
  if (ce.length = 0, !e.canvasElement) {
    let s = document.createElement("div");
    globalThis?.document?.body?.appendChild(s), e.canvasElement = s, ce.push(() => {
      globalThis?.document?.body?.contains(s) && globalThis?.document?.body?.removeChild(s);
    });
  }
  if (e.loaded = await t.applyLoaders(e), e.abortSignal.aborted)
    return;
  ce.push(...(await t.applyBeforeEach(e)).filter(Boolean));
  let r = t.playFunction, o = t.usesMount;
  if (o || await e.mount(), e.abortSignal.aborted)
    return;
  r && (o || (e.mount = async () => {
    throw new Jl({ playFunction: r.toString() });
  }), await r(e));
  let i;
  Ft() ? i = Me() : await Le(e.abortSignal), await t.applyAfterEach(e), await i?.();
}
n(sc, "runStory");

// src/preview-api/modules/store/StoryStore.ts
var Si = 1e3, cc = 1e4, Wr = class Wr {
  constructor(e, r, o) {
    this.importFn = r;
    this.storyIndex = new Et(e), this.projectAnnotations = De(
      le([...Xe(), o])
    );
    let { initialGlobals: i, globalTypes: s } = this.projectAnnotations;
    this.args = new Tt(), this.userGlobals = new Rt({ globals: i, globalTypes: s }), this.hooks = {}, this.cleanupCallbacks = {}, this.processCSFFileWithCache =
    (0, It.default)(Si)(ci), this.prepareMetaWithCache = (0, It.default)(Si)($r), this.prepareStoryWithCache = (0, It.default)(cc)(Qe);
  }
  setProjectAnnotations(e) {
    this.projectAnnotations = De(e);
    let { initialGlobals: r, globalTypes: o } = e;
    this.userGlobals.set({ globals: r, globalTypes: o });
  }
  // This means that one of the CSF files has changed.
  // If the `importFn` has changed, we will invalidate both caches.
  // If the `storyIndex` data has changed, we may or may not invalidate the caches, depending
  // on whether we've loaded the relevant files yet.
  async onStoriesChanged({
    importFn: e,
    storyIndex: r
  }) {
    e && (this.importFn = e), r && (this.storyIndex.entries = r.entries), this.cachedCSFFiles && await this.cacheAllCSFFiles();
  }
  // Get an entry from the index, waiting on initialization if necessary
  async storyIdToEntry(e) {
    return this.storyIndex.storyIdToEntry(e);
  }
  // To load a single CSF file to service a story we need to look up the importPath in the index
  async loadCSFFileByStoryId(e) {
    let { importPath: r, title: o } = this.storyIndex.storyIdToEntry(e), i = await this.importFn(r);
    return this.processCSFFileWithCache(i, r, o);
  }
  async loadAllCSFFiles() {
    let e = {};
    return Object.entries(this.storyIndex.entries).forEach(([o, { importPath: i }]) => {
      e[i] = o;
    }), (await Promise.all(
      Object.entries(e).map(async ([o, i]) => ({
        importPath: o,
        csfFile: await this.loadCSFFileByStoryId(i)
      }))
    )).reduce(
      (o, { importPath: i, csfFile: s }) => (o[i] = s, o),
      {}
    );
  }
  async cacheAllCSFFiles() {
    this.cachedCSFFiles = await this.loadAllCSFFiles();
  }
  preparedMetaFromCSFFile({ csfFile: e }) {
    let r = e.meta;
    return this.prepareMetaWithCache(
      r,
      this.projectAnnotations,
      e.moduleExports.default
    );
  }
  // Load the CSF file for a story and prepare the story from it and the project annotations.
  async loadStory({ storyId: e }) {
    let r = await this.loadCSFFileByStoryId(e);
    return this.storyFromCSFFile({ storyId: e, csfFile: r });
  }
  // This function is synchronous for convenience -- often times if you have a CSF file already
  // it is easier not to have to await `loadStory`.
  storyFromCSFFile({
    storyId: e,
    csfFile: r
  }) {
    let o = r.stories[e];
    if (!o)
      throw new lc({ storyId: e });
    let i = r.meta, s = this.prepareStoryWithCache(
      o,
      i,
      r.projectAnnotations ?? this.projectAnnotations
    );
    return this.args.setInitial(s), this.hooks[s.id] = this.hooks[s.id] || new he(), s;
  }
  // If we have a CSF file we can get all the stories from it synchronously
  componentStoriesFromCSFFile({
    csfFile: e
  }) {
    return Object.keys(this.storyIndex.entries).filter((r) => !!e.stories[r]).map((r) => this.storyFromCSFFile({ storyId: r, csfFile: e }));
  }
  async loadEntry(e) {
    let r = await this.storyIdToEntry(e), o = r.type === "docs" ? r.storiesImports : [], [i, ...s] = await Promise.all([
      this.importFn(r.importPath),
      ...o.map((a) => {
        let l = this.storyIndex.importPathToEntry(a);
        return this.loadCSFFileByStoryId(l.id);
      })
    ]);
    return { entryExports: i, csfFiles: s };
  }
  // A prepared story does not include args, globals or hooks. These are stored in the story store
  // and updated separtely to the (immutable) story.
  getStoryContext(e, { forceInitialArgs: r = !1 } = {}) {
    let o = this.userGlobals.get(), { initialGlobals: i } = this.userGlobals, s = new xe();
    return vt({
      ...e,
      args: r ? e.initialArgs : this.args.get(e.id),
      initialGlobals: i,
      globalTypes: this.projectAnnotations.globalTypes,
      userGlobals: o,
      reporting: s,
      globals: {
        ...o,
        ...e.storyGlobals
      },
      hooks: this.hooks[e.id]
    });
  }
  addCleanupCallbacks(e, ...r) {
    this.cleanupCallbacks[e.id] = (this.cleanupCallbacks[e.id] || []).concat(r);
  }
  async cleanupStory(e) {
    this.hooks[e.id].clean();
    let r = this.cleanupCallbacks[e.id];
    if (r)
      for (let o of [...r].reverse())
        await o();
    delete this.cleanupCallbacks[e.id];
  }
  extract(e = { includeDocsOnly: !1 }) {
    let { cachedCSFFiles: r } = this;
    if (!r)
      throw new ac();
    return Object.entries(this.storyIndex.entries).reduce(
      (o, [i, { type: s, importPath: a }]) => {
        if (s === "docs")
          return o;
        let l = r[a], c = this.storyFromCSFFile({ storyId: i, csfFile: l });
        return !e.includeDocsOnly && c.parameters.docsOnly || (o[i] = Object.entries(c).reduce(
          (d, [p, u]) => p === "moduleExport" || typeof u == "function" ? d : Array.isArray(u) ? Object.assign(d, { [p]: u.slice().sort() }) :
          Object.assign(d, { [p]: u }),
          {
            //
            args: c.initialArgs,
            globals: {
              ...this.userGlobals.initialGlobals,
              ...this.userGlobals.globals,
              ...c.storyGlobals
            }
          }
        )), o;
      },
      {}
    );
  }
};
n(Wr, "StoryStore");
var _e = Wr;

// src/preview-api/modules/store/autoTitle.ts
import { once as dc } from "storybook/internal/client-logger";

// ../node_modules/slash/index.js
function Yr(t) {
  return t.startsWith("\\\\?\\") ? t : t.replace(/\\/g, "/");
}
n(Yr, "slash");

// src/preview-api/modules/store/autoTitle.ts
var pc = /* @__PURE__ */ n((t) => {
  if (t.length === 0)
    return t;
  let e = t[t.length - 1], r = e?.replace(/(?:[.](?:story|stories))?([.][^.]+)$/i, "");
  if (t.length === 1)
    return [r];
  let o = t[t.length - 2];
  return r && o && r.toLowerCase() === o.toLowerCase() ? [...t.slice(0, -2), r] : r && (/^(story|stories)([.][^.]+)$/i.test(e) || /^index$/i.
  test(r)) ? t.slice(0, -1) : [...t.slice(0, -1), r];
}, "sanitize");
function xi(t) {
  return t.flatMap((e) => e.split("/")).filter(Boolean).join("/");
}
n(xi, "pathJoin");
var Ti = /* @__PURE__ */ n((t, e, r) => {
  let { directory: o, importPathMatcher: i, titlePrefix: s = "" } = e || {};
  typeof t == "number" && dc.warn(_`
      CSF Auto-title received a numeric fileName. This typically happens when
      webpack is mis-configured in production mode. To force webpack to produce
      filenames, set optimization.moduleIds = "named" in your webpack config.
    `);
  let a = Yr(String(t));
  if (i.exec(a)) {
    if (!r) {
      let l = a.replace(o, ""), c = xi([s, l]).split("/");
      return c = pc(c), c.join("/");
    }
    return s ? xi([s, r]) : r;
  }
}, "userOrAutoTitleFromSpecifier"), uc = /* @__PURE__ */ n((t, e, r) => {
  for (let o = 0; o < e.length; o += 1) {
    let i = Ti(t, e[o], r);
    if (i)
      return i;
  }
  return r || void 0;
}, "userOrAutoTitle");

// src/preview-api/modules/store/storySort.ts
var wi = /\s*\/\s*/, Ri = /* @__PURE__ */ n((t = {}) => (e, r) => {
  if (e.title === r.title && !t.includeNames)
    return 0;
  let o = t.method || "configure", i = t.order || [], s = e.title.trim().split(wi), a = r.title.trim().split(wi);
  t.includeNames && (s.push(e.name), a.push(r.name));
  let l = 0;
  for (; s[l] || a[l]; ) {
    if (!s[l])
      return -1;
    if (!a[l])
      return 1;
    let c = s[l], d = a[l];
    if (c !== d) {
      let u = i.indexOf(c), f = i.indexOf(d), h = i.indexOf("*");
      return u !== -1 || f !== -1 ? (u === -1 && (h !== -1 ? u = h : u = i.length), f === -1 && (h !== -1 ? f = h : f = i.length), u - f) : o ===
      "configure" ? 0 : c.localeCompare(d, t.locales ? t.locales : void 0, {
        numeric: !0,
        sensitivity: "accent"
      });
    }
    let p = i.indexOf(c);
    p === -1 && (p = i.indexOf("*")), i = p !== -1 && Array.isArray(i[p + 1]) ? i[p + 1] : [], l += 1;
  }
  return 0;
}, "storySort");

// src/preview-api/modules/store/sortStories.ts
var fc = /* @__PURE__ */ n((t, e, r) => {
  if (e) {
    let o;
    typeof e == "function" ? o = e : o = Ri(e), t.sort(o);
  } else
    t.sort(
      (o, i) => r.indexOf(o.importPath) - r.indexOf(i.importPath)
    );
  return t;
}, "sortStoriesCommon"), mc = /* @__PURE__ */ n((t, e, r) => {
  try {
    return fc(t, e, r);
  } catch (o) {
    throw new Error(_`
    Error sorting stories with sort parameter ${e}:

    > ${o.message}
    
    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `);
  }
}, "sortStoriesV7");

// src/preview-api/modules/preview-web/Preview.tsx
import { deprecate as xc, logger as Pi } from "storybook/internal/client-logger";
import {
  ARGTYPES_INFO_REQUEST as Tc,
  ARGTYPES_INFO_RESPONSE as Fi,
  CONFIG_ERROR as wc,
  FORCE_REMOUNT as Rc,
  FORCE_RE_RENDER as Ec,
  GLOBALS_UPDATED as Ii,
  RESET_STORY_ARGS as Ac,
  SET_GLOBALS as vc,
  STORY_ARGS_UPDATED as Cc,
  STORY_INDEX_INVALIDATED as Pc,
  UPDATE_GLOBALS as Fc,
  UPDATE_STORY_ARGS as Ic
} from "storybook/internal/core-events";
import {
  CalledPreviewMethodBeforeInitializationError as ne,
  MissingRenderToCanvasError as Oc,
  StoryIndexFetchError as kc,
  StoryStoreAccessedBeforeInitializationError as Dc
} from "storybook/internal/preview-errors";
import { global as Mc } from "@storybook/global";

// src/preview-api/modules/preview-web/render/StoryRender.ts
import {
  PLAY_FUNCTION_THREW_EXCEPTION as yc,
  STORY_FINISHED as Ei,
  STORY_RENDERED as hc,
  STORY_RENDER_PHASE_CHANGED as Ai,
  UNHANDLED_ERRORS_WHILE_PLAYING as gc
} from "storybook/internal/core-events";
import {
  MountMustBeDestructuredError as bc,
  NoStoryMountedError as Sc
} from "storybook/internal/preview-errors";

// src/preview-api/modules/preview-web/render/Render.ts
var de = new Error("prepareAborted");

// src/preview-api/modules/preview-web/render/StoryRender.ts
var { AbortController: vi } = globalThis;
function Ci(t) {
  try {
    let { name: e = "Error", message: r = String(t), stack: o } = t;
    return { name: e, message: r, stack: o };
  } catch {
    return { name: "Error", message: String(t) };
  }
}
n(Ci, "serializeError");
var Kr = class Kr {
  constructor(e, r, o, i, s, a, l = { autoplay: !0, forceInitialArgs: !1 }, c) {
    this.channel = e;
    this.store = r;
    this.renderToScreen = o;
    this.callbacks = i;
    this.id = s;
    this.viewMode = a;
    this.renderOptions = l;
    this.type = "story";
    this.notYetRendered = !0;
    this.rerenderEnqueued = !1;
    this.disableKeyListeners = !1;
    this.teardownRender = /* @__PURE__ */ n(() => {
    }, "teardownRender");
    this.torndown = !1;
    this.abortController = new vi(), c && (this.story = c, this.phase = "preparing");
  }
  async runPhase(e, r, o) {
    this.phase = r, this.channel.emit(Ai, { newPhase: this.phase, storyId: this.id }), o && (await o(), this.checkIfAborted(e));
  }
  checkIfAborted(e) {
    return e.aborted ? (this.phase = "aborted", this.channel.emit(Ai, { newPhase: this.phase, storyId: this.id }), !0) : !1;
  }
  async prepare() {
    if (await this.runPhase(this.abortController.signal, "preparing", async () => {
      this.story = await this.store.loadStory({ storyId: this.id });
    }), this.abortController.signal.aborted)
      throw await this.store.cleanupStory(this.story), de;
  }
  // The two story "renders" are equal and have both loaded the same story
  isEqual(e) {
    return !!(this.id === e.id && this.story && this.story === e.story);
  }
  isPreparing() {
    return ["preparing"].includes(this.phase);
  }
  isPending() {
    return ["loading", "beforeEach", "rendering", "playing", "afterEach"].includes(
      this.phase
    );
  }
  async renderToElement(e) {
    return this.canvasElement = e, this.render({ initial: !0, forceRemount: !0 });
  }
  storyContext() {
    if (!this.story)
      throw new Error("Cannot call storyContext before preparing");
    let { forceInitialArgs: e } = this.renderOptions;
    return this.store.getStoryContext(this.story, { forceInitialArgs: e });
  }
  async render({
    initial: e = !1,
    forceRemount: r = !1
  } = {}) {
    let { canvasElement: o } = this;
    if (!this.story)
      throw new Error("cannot render when not prepared");
    let i = this.story;
    if (!o)
      throw new Error("cannot render when canvasElement is unset");
    let {
      id: s,
      componentId: a,
      title: l,
      name: c,
      tags: d,
      applyLoaders: p,
      applyBeforeEach: u,
      applyAfterEach: f,
      unboundStoryFn: h,
      playFunction: g,
      runStep: T
    } = i;
    r && !e && (this.cancelRender(), this.abortController = new vi());
    let x = this.abortController.signal, v = !1, E = i.usesMount;
    try {
      let y = {
        ...this.storyContext(),
        viewMode: this.viewMode,
        abortSignal: x,
        canvasElement: o,
        loaded: {},
        step: /* @__PURE__ */ n((F, k) => T(F, k, y), "step"),
        context: null,
        canvas: {},
        userEvent: {},
        renderToCanvas: /* @__PURE__ */ n(async () => {
          let F = await this.renderToScreen(w, o);
          this.teardownRender = F || (() => {
          }), v = !0;
        }, "renderToCanvas"),
        // The story provides (set in a renderer) a mount function that is a higher order function
        // (context) => (...args) => Canvas
        //
        // Before assigning it to the context, we resolve the context dependency,
        // so that a user can just call it as await mount(...args) in their play function.
        mount: /* @__PURE__ */ n(async (...F) => {
          this.callbacks.showStoryDuringRender?.();
          let k = null;
          return await this.runPhase(x, "rendering", async () => {
            k = await i.mount(y)(...F);
          }), E && await this.runPhase(x, "playing"), k;
        }, "mount")
      };
      y.context = y;
      let w = {
        componentId: a,
        title: l,
        kind: l,
        id: s,
        name: c,
        story: c,
        tags: d,
        ...this.callbacks,
        showError: /* @__PURE__ */ n((F) => (this.phase = "errored", this.callbacks.showError(F)), "showError"),
        showException: /* @__PURE__ */ n((F) => (this.phase = "errored", this.callbacks.showException(F)), "showException"),
        forceRemount: r || this.notYetRendered,
        storyContext: y,
        storyFn: /* @__PURE__ */ n(() => h(y), "storyFn"),
        unboundStoryFn: h
      };
      if (await this.runPhase(x, "loading", async () => {
        y.loaded = await p(y);
      }), x.aborted)
        return;
      let A = await u(y);
      if (this.store.addCleanupCallbacks(i, ...A), this.checkIfAborted(x) || (!v && !E && await y.mount(), this.notYetRendered = !1, x.aborted))
        return;
      let P = this.story.parameters?.test?.dangerouslyIgnoreUnhandledErrors === !0, m = /* @__PURE__ */ new Set(), b = /* @__PURE__ */ n((F) => {
        F.error && m.add(F.error);
      }, "onError"), S = /* @__PURE__ */ n((F) => {
        F.reason && m.add(F.reason);
      }, "onUnhandledRejection");
      if (this.renderOptions.autoplay && r && g && this.phase !== "errored") {
        window?.addEventListener?.("error", b), window?.addEventListener?.("unhandledrejection", S), this.disableKeyListeners = !0;
        try {
          if (E ? await g(y) : (y.mount = async () => {
            throw new bc({ playFunction: g.toString() });
          }, await this.runPhase(x, "playing", async () => g(y))), !v)
            throw new Sc();
          this.checkIfAborted(x), !P && m.size > 0 ? await this.runPhase(x, "errored") : await this.runPhase(x, "played");
        } catch (F) {
          if (this.callbacks.showStoryDuringRender?.(), await this.runPhase(x, "errored", async () => {
            this.channel.emit(yc, Ci(F));
          }), this.story.parameters.throwPlayFunctionExceptions !== !1)
            throw F;
          console.error(F);
        }
        if (!P && m.size > 0 && this.channel.emit(
          gc,
          Array.from(m).map(Ci)
        ), this.disableKeyListeners = !1, window?.removeEventListener?.("unhandledrejection", S), window?.removeEventListener?.("error", b),
        x.aborted)
          return;
      }
      await this.runPhase(x, "completing", async () => {
        Ft() ? this.store.addCleanupCallbacks(i, Me()) : await Le(x);
      }), await this.runPhase(x, "completed", async () => {
        this.channel.emit(hc, s);
      }), this.phase !== "errored" && await this.runPhase(x, "afterEach", async () => {
        await f(y);
      });
      let C = !P && m.size > 0, R = y.reporting.reports.some(
        (F) => F.status === "failed"
      ), I = C || R;
      await this.runPhase(
        x,
        "finished",
        async () => this.channel.emit(Ei, {
          storyId: s,
          status: I ? "error" : "success",
          reporters: y.reporting.reports
        })
      );
    } catch (y) {
      this.phase = "errored", this.callbacks.showException(y), await this.runPhase(
        x,
        "finished",
        async () => this.channel.emit(Ei, {
          storyId: s,
          status: "error",
          reporters: []
        })
      );
    }
    this.rerenderEnqueued && (this.rerenderEnqueued = !1, this.render());
  }
  /**
   * Rerender the story. If the story is currently pending (loading/rendering), the rerender will be
   * enqueued, and will be executed after the current render is completed. Rerendering while playing
   * will not be enqueued, and will be executed immediately, to support rendering args changes while
   * playing.
   */
  async rerender() {
    if (this.isPending() && this.phase !== "playing")
      this.rerenderEnqueued = !0;
    else
      return this.render();
  }
  async remount() {
    return await this.teardown(), this.render({ forceRemount: !0 });
  }
  // If the story is torn down (either a new story is rendered or the docs page removes it)
  // we need to consider the fact that the initial render may not be finished
  // (possibly the loaders or the play function are still running). We use the controller
  // as a method to abort them, ASAP, but this is not foolproof as we cannot control what
  // happens inside the user's code.
  cancelRender() {
    this.abortController?.abort();
  }
  async teardown() {
    this.torndown = !0, this.cancelRender(), this.story && await this.store.cleanupStory(this.story);
    for (let e = 0; e < 3; e += 1) {
      if (!this.isPending()) {
        await this.teardownRender();
        return;
      }
      await new Promise((r) => setTimeout(r, 0));
    }
    window?.location?.reload?.(), await new Promise(() => {
    });
  }
};
n(Kr, "StoryRender");
var Te = Kr;

// src/preview-api/modules/preview-web/Preview.tsx
var { fetch: Lc } = Mc, _c = "./index.json", Xr = class Xr {
  constructor(e, r, o = z.getChannel(), i = !0) {
    this.importFn = e;
    this.getProjectAnnotations = r;
    this.channel = o;
    this.storyRenders = [];
    this.storeInitializationPromise = new Promise((s, a) => {
      this.resolveStoreInitializationPromise = s, this.rejectStoreInitializationPromise = a;
    }), i && this.initialize();
  }
  // Create a proxy object for `__STORYBOOK_STORY_STORE__` and `__STORYBOOK_PREVIEW__.storyStore`
  // That proxies through to the store once ready, and errors beforehand. This means we can set
  // `__STORYBOOK_STORY_STORE__ = __STORYBOOK_PREVIEW__.storyStore` without having to wait, and
  // similarly integrators can access the `storyStore` on the preview at any time, although
  // it is considered deprecated and we will no longer allow access in 9.0
  get storyStore() {
    return new Proxy(
      {},
      {
        get: /* @__PURE__ */ n((e, r) => {
          if (this.storyStoreValue)
            return xc("Accessing the Story Store is deprecated and will be removed in 9.0"), this.storyStoreValue[r];
          throw new Dc();
        }, "get")
      }
    );
  }
  // INITIALIZATION
  async initialize() {
    this.setupListeners();
    try {
      let e = await this.getProjectAnnotationsOrRenderError();
      await this.runBeforeAllHook(e), await this.initializeWithProjectAnnotations(e);
    } catch (e) {
      this.rejectStoreInitializationPromise(e);
    }
  }
  ready() {
    return this.storeInitializationPromise;
  }
  setupListeners() {
    this.channel.on(Pc, this.onStoryIndexChanged.bind(this)), this.channel.on(Fc, this.onUpdateGlobals.bind(this)), this.channel.on(Ic, this.
    onUpdateArgs.bind(this)), this.channel.on(Tc, this.onRequestArgTypesInfo.bind(this)), this.channel.on(Ac, this.onResetArgs.bind(this)), this.
    channel.on(Ec, this.onForceReRender.bind(this)), this.channel.on(Rc, this.onForceRemount.bind(this));
  }
  async getProjectAnnotationsOrRenderError() {
    try {
      let e = await this.getProjectAnnotations();
      if (this.renderToCanvas = e.renderToCanvas, !this.renderToCanvas)
        throw new Oc();
      return e;
    } catch (e) {
      throw this.renderPreviewEntryError("Error reading preview.js:", e), e;
    }
  }
  // If initialization gets as far as project annotations, this function runs.
  async initializeWithProjectAnnotations(e) {
    this.projectAnnotationsBeforeInitialization = e;
    try {
      let r = await this.getStoryIndexFromServer();
      return this.initializeWithStoryIndex(r);
    } catch (r) {
      throw this.renderPreviewEntryError("Error loading story index:", r), r;
    }
  }
  async runBeforeAllHook(e) {
    try {
      await this.beforeAllCleanup?.(), this.beforeAllCleanup = await e.beforeAll?.();
    } catch (r) {
      throw this.renderPreviewEntryError("Error in beforeAll hook:", r), r;
    }
  }
  async getStoryIndexFromServer() {
    let e = await Lc(_c);
    if (e.status === 200)
      return e.json();
    throw new kc({ text: await e.text() });
  }
  // If initialization gets as far as the story index, this function runs.
  initializeWithStoryIndex(e) {
    if (!this.projectAnnotationsBeforeInitialization)
      throw new Error("Cannot call initializeWithStoryIndex until project annotations resolve");
    this.storyStoreValue = new _e(
      e,
      this.importFn,
      this.projectAnnotationsBeforeInitialization
    ), delete this.projectAnnotationsBeforeInitialization, this.setInitialGlobals(), this.resolveStoreInitializationPromise();
  }
  async setInitialGlobals() {
    this.emitGlobals();
  }
  emitGlobals() {
    if (!this.storyStoreValue)
      throw new ne({ methodName: "emitGlobals" });
    let e = {
      globals: this.storyStoreValue.userGlobals.get() || {},
      globalTypes: this.storyStoreValue.projectAnnotations.globalTypes || {}
    };
    this.channel.emit(vc, e);
  }
  // EVENT HANDLERS
  // This happens when a config file gets reloaded
  async onGetProjectAnnotationsChanged({
    getProjectAnnotations: e
  }) {
    delete this.previewEntryError, this.getProjectAnnotations = e;
    let r = await this.getProjectAnnotationsOrRenderError();
    if (await this.runBeforeAllHook(r), !this.storyStoreValue) {
      await this.initializeWithProjectAnnotations(r);
      return;
    }
    this.storyStoreValue.setProjectAnnotations(r), this.emitGlobals();
  }
  async onStoryIndexChanged() {
    if (delete this.previewEntryError, !(!this.storyStoreValue && !this.projectAnnotationsBeforeInitialization))
      try {
        let e = await this.getStoryIndexFromServer();
        if (this.projectAnnotationsBeforeInitialization) {
          this.initializeWithStoryIndex(e);
          return;
        }
        await this.onStoriesChanged({ storyIndex: e });
      } catch (e) {
        throw this.renderPreviewEntryError("Error loading story index:", e), e;
      }
  }
  // This happens when a glob gets HMR-ed
  async onStoriesChanged({
    importFn: e,
    storyIndex: r
  }) {
    if (!this.storyStoreValue)
      throw new ne({ methodName: "onStoriesChanged" });
    await this.storyStoreValue.onStoriesChanged({ importFn: e, storyIndex: r });
  }
  async onUpdateGlobals({
    globals: e,
    currentStory: r
  }) {
    if (this.storyStoreValue || await this.storeInitializationPromise, !this.storyStoreValue)
      throw new ne({ methodName: "onUpdateGlobals" });
    if (this.storyStoreValue.userGlobals.update(e), r) {
      let { initialGlobals: o, storyGlobals: i, userGlobals: s, globals: a } = this.storyStoreValue.getStoryContext(r);
      this.channel.emit(Ii, {
        initialGlobals: o,
        userGlobals: s,
        storyGlobals: i,
        globals: a
      });
    } else {
      let { initialGlobals: o, globals: i } = this.storyStoreValue.userGlobals;
      this.channel.emit(Ii, {
        initialGlobals: o,
        userGlobals: i,
        storyGlobals: {},
        globals: i
      });
    }
    await Promise.all(this.storyRenders.map((o) => o.rerender()));
  }
  async onUpdateArgs({ storyId: e, updatedArgs: r }) {
    if (!this.storyStoreValue)
      throw new ne({ methodName: "onUpdateArgs" });
    this.storyStoreValue.args.update(e, r), await Promise.all(
      this.storyRenders.filter((o) => o.id === e && !o.renderOptions.forceInitialArgs).map(
        (o) => (
          // We only run the play function, with in a force remount.
          // But when mount is destructured, the rendering happens inside of the play function.
          o.story && o.story.usesMount ? o.remount() : o.rerender()
        )
      )
    ), this.channel.emit(Cc, {
      storyId: e,
      args: this.storyStoreValue.args.get(e)
    });
  }
  async onRequestArgTypesInfo({ id: e, payload: r }) {
    try {
      await this.storeInitializationPromise;
      let o = await this.storyStoreValue?.loadStory(r);
      this.channel.emit(Fi, {
        id: e,
        success: !0,
        payload: { argTypes: o?.argTypes || {} },
        error: null
      });
    } catch (o) {
      this.channel.emit(Fi, {
        id: e,
        success: !1,
        error: o?.message
      });
    }
  }
  async onResetArgs({ storyId: e, argNames: r }) {
    if (!this.storyStoreValue)
      throw new ne({ methodName: "onResetArgs" });
    let i = this.storyRenders.find((l) => l.id === e)?.story || await this.storyStoreValue.loadStory({ storyId: e }), a = (r || [
      .../* @__PURE__ */ new Set([
        ...Object.keys(i.initialArgs),
        ...Object.keys(this.storyStoreValue.args.get(e))
      ])
    ]).reduce((l, c) => (l[c] = i.initialArgs[c], l), {});
    await this.onUpdateArgs({ storyId: e, updatedArgs: a });
  }
  // ForceReRender does not include a story id, so we simply must
  // re-render all stories in case they are relevant
  async onForceReRender() {
    await Promise.all(this.storyRenders.map((e) => e.rerender()));
  }
  async onForceRemount({ storyId: e }) {
    await Promise.all(this.storyRenders.filter((r) => r.id === e).map((r) => r.remount()));
  }
  // Used by docs to render a story to a given element
  // Note this short-circuits the `prepare()` phase of the StoryRender,
  // main to be consistent with the previous behaviour. In the future,
  // we will change it to go ahead and load the story, which will end up being
  // "instant", although async.
  renderStoryToElement(e, r, o, i) {
    if (!this.renderToCanvas || !this.storyStoreValue)
      throw new ne({
        methodName: "renderStoryToElement"
      });
    let s = new Te(
      this.channel,
      this.storyStoreValue,
      this.renderToCanvas,
      o,
      e.id,
      "docs",
      i,
      e
    );
    return s.renderToElement(r), this.storyRenders.push(s), async () => {
      await this.teardownRender(s);
    };
  }
  async teardownRender(e, { viewModeChanged: r } = {}) {
    this.storyRenders = this.storyRenders.filter((o) => o !== e), await e?.teardown?.({ viewModeChanged: r });
  }
  // API
  async loadStory({ storyId: e }) {
    if (!this.storyStoreValue)
      throw new ne({ methodName: "loadStory" });
    return this.storyStoreValue.loadStory({ storyId: e });
  }
  getStoryContext(e, { forceInitialArgs: r = !1 } = {}) {
    if (!this.storyStoreValue)
      throw new ne({ methodName: "getStoryContext" });
    return this.storyStoreValue.getStoryContext(e, { forceInitialArgs: r });
  }
  async extract(e) {
    if (!this.storyStoreValue)
      throw new ne({ methodName: "extract" });
    if (this.previewEntryError)
      throw this.previewEntryError;
    return await this.storyStoreValue.cacheAllCSFFiles(), this.storyStoreValue.extract(e);
  }
  // UTILITIES
  renderPreviewEntryError(e, r) {
    this.previewEntryError = r, Pi.error(e), Pi.error(r), this.channel.emit(wc, r);
  }
};
n(Xr, "Preview");
var je = Xr;

// src/preview-api/modules/preview-web/PreviewWeb.tsx
import { global as Tp } from "@storybook/global";

// src/preview-api/modules/preview-web/PreviewWithSelection.tsx
import { logger as Ot } from "storybook/internal/client-logger";
import {
  CURRENT_STORY_WAS_SET as Oi,
  DOCS_PREPARED as Hc,
  GLOBALS_UPDATED as ki,
  PRELOAD_ENTRIES as $c,
  PREVIEW_KEYDOWN as Bc,
  SET_CURRENT_STORY as Gc,
  STORY_CHANGED as zc,
  STORY_ERRORED as Uc,
  STORY_MISSING as Di,
  STORY_PREPARED as Vc,
  STORY_RENDER_PHASE_CHANGED as Mi,
  STORY_SPECIFIED as Wc,
  STORY_THREW_EXCEPTION as Yc,
  STORY_UNCHANGED as Kc,
  UPDATE_QUERY_PARAMS as Xc
} from "storybook/internal/core-events";
import {
  CalledPreviewMethodBeforeInitializationError as eo,
  EmptyIndexError as Jc,
  MdxFileWithNoCsfReferencesError as Zc,
  NoStoryMatchError as Qc
} from "storybook/internal/preview-errors";

// src/preview-api/modules/preview-web/render/CsfDocsRender.ts
import { DOCS_RENDERED as Nc } from "storybook/internal/core-events";

// src/preview-api/modules/preview-web/docs-context/DocsContext.ts
import { isStory as jc } from "storybook/internal/csf";
var Jr = class Jr {
  constructor(e, r, o, i) {
    this.channel = e;
    this.store = r;
    this.renderStoryToElement = o;
    this.storyIdByName = /* @__PURE__ */ n((e) => {
      let r = this.nameToStoryId.get(e);
      if (r)
        return r;
      throw new Error(`No story found with that name: ${e}`);
    }, "storyIdByName");
    this.componentStories = /* @__PURE__ */ n(() => this.componentStoriesValue, "componentStories");
    this.componentStoriesFromCSFFile = /* @__PURE__ */ n((e) => this.store.componentStoriesFromCSFFile({ csfFile: e }), "componentStoriesFro\
mCSFFile");
    this.storyById = /* @__PURE__ */ n((e) => {
      if (!e) {
        if (!this.primaryStory)
          throw new Error(
            "No primary story defined for docs entry. Did you forget to use `<Meta>`?"
          );
        return this.primaryStory;
      }
      let r = this.storyIdToCSFFile.get(e);
      if (!r)
        throw new Error(`Called \`storyById\` for story that was never loaded: ${e}`);
      return this.store.storyFromCSFFile({ storyId: e, csfFile: r });
    }, "storyById");
    this.getStoryContext = /* @__PURE__ */ n((e) => ({
      ...this.store.getStoryContext(e),
      loaded: {},
      viewMode: "docs"
    }), "getStoryContext");
    this.loadStory = /* @__PURE__ */ n((e) => this.store.loadStory({ storyId: e }), "loadStory");
    this.componentStoriesValue = [], this.storyIdToCSFFile = /* @__PURE__ */ new Map(), this.exportToStory = /* @__PURE__ */ new Map(), this.
    exportsToCSFFile = /* @__PURE__ */ new Map(), this.nameToStoryId = /* @__PURE__ */ new Map(), this.attachedCSFFiles = /* @__PURE__ */ new Set(),
    i.forEach((s, a) => {
      this.referenceCSFFile(s);
    });
  }
  // This docs entry references this CSF file and can synchronously load the stories, as well
  // as reference them by module export. If the CSF is part of the "component" stories, they
  // can also be referenced by name and are in the componentStories list.
  referenceCSFFile(e) {
    this.exportsToCSFFile.set(e.moduleExports, e), this.exportsToCSFFile.set(e.moduleExports.default, e), this.store.componentStoriesFromCSFFile(
    { csfFile: e }).forEach((o) => {
      let i = e.stories[o.id];
      this.storyIdToCSFFile.set(i.id, e), this.exportToStory.set(i.moduleExport, o);
    });
  }
  attachCSFFile(e) {
    if (!this.exportsToCSFFile.has(e.moduleExports))
      throw new Error("Cannot attach a CSF file that has not been referenced");
    if (this.attachedCSFFiles.has(e))
      return;
    this.attachedCSFFiles.add(e), this.store.componentStoriesFromCSFFile({ csfFile: e }).forEach((o) => {
      this.nameToStoryId.set(o.name, o.id), this.componentStoriesValue.push(o), this.primaryStory || (this.primaryStory = o);
    });
  }
  referenceMeta(e, r) {
    let o = this.resolveModuleExport(e);
    if (o.type !== "meta")
      throw new Error(
        "<Meta of={} /> must reference a CSF file module export or meta export. Did you mistakenly reference your component instead of your \
CSF file?"
      );
    r && this.attachCSFFile(o.csfFile);
  }
  get projectAnnotations() {
    let { projectAnnotations: e } = this.store;
    if (!e)
      throw new Error("Can't get projectAnnotations from DocsContext before they are initialized");
    return e;
  }
  resolveAttachedModuleExportType(e) {
    if (e === "story") {
      if (!this.primaryStory)
        throw new Error(
          "No primary story attached to this docs file, did you forget to use <Meta of={} />?"
        );
      return { type: "story", story: this.primaryStory };
    }
    if (this.attachedCSFFiles.size === 0)
      throw new Error(
        "No CSF file attached to this docs file, did you forget to use <Meta of={} />?"
      );
    let r = Array.from(this.attachedCSFFiles)[0];
    if (e === "meta")
      return { type: "meta", csfFile: r };
    let { component: o } = r.meta;
    if (!o)
      throw new Error(
        "Attached CSF file does not defined a component, did you forget to export one?"
      );
    return { type: "component", component: o };
  }
  resolveModuleExport(e) {
    let r = this.exportsToCSFFile.get(e);
    if (r)
      return { type: "meta", csfFile: r };
    let o = this.exportToStory.get(
      jc(e) ? e.input : e
    );
    return o ? { type: "story", story: o } : { type: "component", component: e };
  }
  resolveOf(e, r = []) {
    let o;
    if (["component", "meta", "story"].includes(e)) {
      let i = e;
      o = this.resolveAttachedModuleExportType(i);
    } else
      o = this.resolveModuleExport(e);
    if (r.length && !r.includes(o.type)) {
      let i = o.type === "component" ? "component or unknown" : o.type;
      throw new Error(_`Invalid value passed to the 'of' prop. The value was resolved to a '${i}' type but the only types for this block are: ${r.
      join(
        ", "
      )}.
        - Did you pass a component to the 'of' prop when the block only supports a story or a meta?
        - ... or vice versa?
        - Did you pass a story, CSF file or meta to the 'of' prop that is not indexed, ie. is not targeted by the 'stories' globs in the main configuration?`);
    }
    switch (o.type) {
      case "component":
        return {
          ...o,
          projectAnnotations: this.projectAnnotations
        };
      case "meta":
        return {
          ...o,
          preparedMeta: this.store.preparedMetaFromCSFFile({ csfFile: o.csfFile })
        };
      case "story":
      default:
        return o;
    }
  }
};
n(Jr, "DocsContext");
var pe = Jr;

// src/preview-api/modules/preview-web/render/CsfDocsRender.ts
var Zr = class Zr {
  constructor(e, r, o, i) {
    this.channel = e;
    this.store = r;
    this.entry = o;
    this.callbacks = i;
    this.type = "docs";
    this.subtype = "csf";
    this.torndown = !1;
    this.disableKeyListeners = !1;
    this.preparing = !1;
    this.id = o.id;
  }
  isPreparing() {
    return this.preparing;
  }
  async prepare() {
    this.preparing = !0;
    let { entryExports: e, csfFiles: r = [] } = await this.store.loadEntry(this.id);
    if (this.torndown)
      throw de;
    let { importPath: o, title: i } = this.entry, s = this.store.processCSFFileWithCache(
      e,
      o,
      i
    ), a = Object.keys(s.stories)[0];
    this.story = this.store.storyFromCSFFile({ storyId: a, csfFile: s }), this.csfFiles = [s, ...r], this.preparing = !1;
  }
  isEqual(e) {
    return !!(this.id === e.id && this.story && this.story === e.story);
  }
  docsContext(e) {
    if (!this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    let r = new pe(
      this.channel,
      this.store,
      e,
      this.csfFiles
    );
    return this.csfFiles.forEach((o) => r.attachCSFFile(o)), r;
  }
  async renderToElement(e, r) {
    if (!this.story || !this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    let o = this.docsContext(r), { docs: i } = this.story.parameters || {};
    if (!i)
      throw new Error(
        "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed"
      );
    let s = await i.renderer(), { render: a } = s, l = /* @__PURE__ */ n(async () => {
      try {
        await a(o, i, e), this.channel.emit(Nc, this.id);
      } catch (c) {
        this.callbacks.showException(c);
      }
    }, "renderDocs");
    return this.rerender = async () => l(), this.teardownRender = async ({ viewModeChanged: c }) => {
      !c || !e || s.unmount(e);
    }, l();
  }
  async teardown({ viewModeChanged: e } = {}) {
    this.teardownRender?.({ viewModeChanged: e }), this.torndown = !0;
  }
};
n(Zr, "CsfDocsRender");
var ot = Zr;

// src/preview-api/modules/preview-web/render/MdxDocsRender.ts
import { DOCS_RENDERED as qc } from "storybook/internal/core-events";
var Qr = class Qr {
  constructor(e, r, o, i) {
    this.channel = e;
    this.store = r;
    this.entry = o;
    this.callbacks = i;
    this.type = "docs";
    this.subtype = "mdx";
    this.torndown = !1;
    this.disableKeyListeners = !1;
    this.preparing = !1;
    this.id = o.id;
  }
  isPreparing() {
    return this.preparing;
  }
  async prepare() {
    this.preparing = !0;
    let { entryExports: e, csfFiles: r = [] } = await this.store.loadEntry(this.id);
    if (this.torndown)
      throw de;
    this.csfFiles = r, this.exports = e, this.preparing = !1;
  }
  isEqual(e) {
    return !!(this.id === e.id && this.exports && this.exports === e.exports);
  }
  docsContext(e) {
    if (!this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    return new pe(
      this.channel,
      this.store,
      e,
      this.csfFiles
    );
  }
  async renderToElement(e, r) {
    if (!this.exports || !this.csfFiles || !this.store.projectAnnotations)
      throw new Error("Cannot render docs before preparing");
    let o = this.docsContext(r), { docs: i } = this.store.projectAnnotations.parameters || {};
    if (!i)
      throw new Error(
        "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed"
      );
    let s = { ...i, page: this.exports.default }, a = await i.renderer(), { render: l } = a, c = /* @__PURE__ */ n(async () => {
      try {
        await l(o, s, e), this.channel.emit(qc, this.id);
      } catch (d) {
        this.callbacks.showException(d);
      }
    }, "renderDocs");
    return this.rerender = async () => c(), this.teardownRender = async ({ viewModeChanged: d } = {}) => {
      !d || !e || (a.unmount(e), this.torndown = !0);
    }, c();
  }
  async teardown({ viewModeChanged: e } = {}) {
    this.teardownRender?.({ viewModeChanged: e }), this.torndown = !0;
  }
};
n(Qr, "MdxDocsRender");
var nt = Qr;

// src/preview-api/modules/preview-web/PreviewWithSelection.tsx
var ed = globalThis;
function td(t) {
  let e = t.composedPath && t.composedPath()[0] || t.target;
  return /input|textarea/i.test(e.tagName) || e.getAttribute("contenteditable") !== null;
}
n(td, "focusInInput");
var Li = "attached-mdx", rd = "unattached-mdx";
function od({ tags: t }) {
  return t?.includes(rd) || t?.includes(Li);
}
n(od, "isMdxEntry");
function to(t) {
  return t.type === "story";
}
n(to, "isStoryRender");
function nd(t) {
  return t.type === "docs";
}
n(nd, "isDocsRender");
function id(t) {
  return nd(t) && t.subtype === "csf";
}
n(id, "isCsfDocsRender");
var ro = class ro extends je {
  constructor(r, o, i, s) {
    super(r, o, void 0, !1);
    this.importFn = r;
    this.getProjectAnnotations = o;
    this.selectionStore = i;
    this.view = s;
    this.initialize();
  }
  setupListeners() {
    super.setupListeners(), ed.onkeydown = this.onKeydown.bind(this), this.channel.on(Gc, this.onSetCurrentStory.bind(this)), this.channel.on(
    Xc, this.onUpdateQueryParams.bind(this)), this.channel.on($c, this.onPreloadStories.bind(this));
  }
  async setInitialGlobals() {
    if (!this.storyStoreValue)
      throw new eo({ methodName: "setInitialGlobals" });
    let { globals: r } = this.selectionStore.selectionSpecifier || {};
    r && this.storyStoreValue.userGlobals.updateFromPersisted(r), this.emitGlobals();
  }
  // If initialization gets as far as the story index, this function runs.
  async initializeWithStoryIndex(r) {
    return await super.initializeWithStoryIndex(r), this.selectSpecifiedStory();
  }
  // Use the selection specifier to choose a story, then render it
  async selectSpecifiedStory() {
    if (!this.storyStoreValue)
      throw new eo({
        methodName: "selectSpecifiedStory"
      });
    if (this.selectionStore.selection) {
      await this.renderSelection();
      return;
    }
    if (!this.selectionStore.selectionSpecifier) {
      this.renderMissingStory();
      return;
    }
    let { storySpecifier: r, args: o } = this.selectionStore.selectionSpecifier, i = this.storyStoreValue.storyIndex.entryFromSpecifier(r);
    if (!i) {
      r === "*" ? this.renderStoryLoadingException(r, new Jc()) : this.renderStoryLoadingException(
        r,
        new Qc({ storySpecifier: r.toString() })
      );
      return;
    }
    let { id: s, type: a } = i;
    this.selectionStore.setSelection({ storyId: s, viewMode: a }), this.channel.emit(Wc, this.selectionStore.selection), this.channel.emit(Oi,
    this.selectionStore.selection), await this.renderSelection({ persistedArgs: o });
  }
  // EVENT HANDLERS
  // This happens when a config file gets reloaded
  async onGetProjectAnnotationsChanged({
    getProjectAnnotations: r
  }) {
    await super.onGetProjectAnnotationsChanged({ getProjectAnnotations: r }), this.selectionStore.selection && this.renderSelection();
  }
  // This happens when a glob gets HMR-ed
  async onStoriesChanged({
    importFn: r,
    storyIndex: o
  }) {
    await super.onStoriesChanged({ importFn: r, storyIndex: o }), this.selectionStore.selection ? await this.renderSelection() : await this.
    selectSpecifiedStory();
  }
  onKeydown(r) {
    if (!this.storyRenders.find((o) => o.disableKeyListeners) && !td(r)) {
      let { altKey: o, ctrlKey: i, metaKey: s, shiftKey: a, key: l, code: c, keyCode: d } = r;
      this.channel.emit(Bc, {
        event: { altKey: o, ctrlKey: i, metaKey: s, shiftKey: a, key: l, code: c, keyCode: d }
      });
    }
  }
  async onSetCurrentStory(r) {
    this.selectionStore.setSelection({ viewMode: "story", ...r }), await this.storeInitializationPromise, this.channel.emit(Oi, this.selectionStore.
    selection), this.renderSelection();
  }
  onUpdateQueryParams(r) {
    this.selectionStore.setQueryParams(r);
  }
  async onUpdateGlobals({ globals: r }) {
    let o = this.currentRender instanceof Te && this.currentRender.story || void 0;
    super.onUpdateGlobals({ globals: r, currentStory: o }), (this.currentRender instanceof nt || this.currentRender instanceof ot) && await this.
    currentRender.rerender?.();
  }
  async onUpdateArgs({ storyId: r, updatedArgs: o }) {
    super.onUpdateArgs({ storyId: r, updatedArgs: o });
  }
  async onPreloadStories({ ids: r }) {
    await this.storeInitializationPromise, this.storyStoreValue && await Promise.allSettled(r.map((o) => this.storyStoreValue?.loadEntry(o)));
  }
  // RENDERING
  // We can either have:
  // - a story selected in "story" viewMode,
  //     in which case we render it to the root element, OR
  // - a story selected in "docs" viewMode,
  //     in which case we render the docsPage for that story
  async renderSelection({ persistedArgs: r } = {}) {
    let { renderToCanvas: o } = this;
    if (!this.storyStoreValue || !o)
      throw new eo({ methodName: "renderSelection" });
    let { selection: i } = this.selectionStore;
    if (!i)
      throw new Error("Cannot call renderSelection as no selection was made");
    let { storyId: s } = i, a;
    try {
      a = await this.storyStoreValue.storyIdToEntry(s);
    } catch (h) {
      this.currentRender && await this.teardownRender(this.currentRender), this.renderStoryLoadingException(s, h);
      return;
    }
    let l = this.currentSelection?.storyId !== s, c = this.currentRender?.type !== a.type;
    a.type === "story" ? this.view.showPreparingStory({ immediate: c }) : this.view.showPreparingDocs({ immediate: c }), this.currentRender?.
    isPreparing() && await this.teardownRender(this.currentRender);
    let d;
    a.type === "story" ? d = new Te(
      this.channel,
      this.storyStoreValue,
      o,
      this.mainStoryCallbacks(s),
      s,
      "story"
    ) : od(a) ? d = new nt(
      this.channel,
      this.storyStoreValue,
      a,
      this.mainStoryCallbacks(s)
    ) : d = new ot(
      this.channel,
      this.storyStoreValue,
      a,
      this.mainStoryCallbacks(s)
    );
    let p = this.currentSelection;
    this.currentSelection = i;
    let u = this.currentRender;
    this.currentRender = d;
    try {
      await d.prepare();
    } catch (h) {
      u && await this.teardownRender(u), h !== de && this.renderStoryLoadingException(s, h);
      return;
    }
    let f = !l && u && !d.isEqual(u);
    if (r && to(d) && (se(!!d.story), this.storyStoreValue.args.updateFromPersisted(d.story, r)), u && !u.torndown && !l && !f && !c) {
      this.currentRender = u, this.channel.emit(Kc, s), this.view.showMain();
      return;
    }
    if (u && await this.teardownRender(u, { viewModeChanged: c }), p && (l || c) && this.channel.emit(zc, s), to(d)) {
      se(!!d.story);
      let {
        parameters: h,
        initialArgs: g,
        argTypes: T,
        unmappedArgs: x,
        initialGlobals: v,
        userGlobals: E,
        storyGlobals: y,
        globals: w
      } = this.storyStoreValue.getStoryContext(d.story);
      this.channel.emit(Vc, {
        id: s,
        parameters: h,
        initialArgs: g,
        argTypes: T,
        args: x
      }), this.channel.emit(ki, { userGlobals: E, storyGlobals: y, globals: w, initialGlobals: v });
    } else {
      let { parameters: h } = this.storyStoreValue.projectAnnotations, { initialGlobals: g, globals: T } = this.storyStoreValue.userGlobals;
      if (this.channel.emit(ki, {
        globals: T,
        initialGlobals: g,
        storyGlobals: {},
        userGlobals: T
      }), id(d) || d.entry.tags?.includes(Li)) {
        if (!d.csfFiles)
          throw new Zc({ storyId: s });
        ({ parameters: h } = this.storyStoreValue.preparedMetaFromCSFFile({
          csfFile: d.csfFiles[0]
        }));
      }
      this.channel.emit(Hc, {
        id: s,
        parameters: h
      });
    }
    to(d) ? (se(!!d.story), this.storyRenders.push(d), this.currentRender.renderToElement(
      this.view.prepareForStory(d.story)
    )) : this.currentRender.renderToElement(
      this.view.prepareForDocs(),
      // This argument is used for docs, which is currently only compatible with HTMLElements
      this.renderStoryToElement.bind(this)
    );
  }
  async teardownRender(r, { viewModeChanged: o = !1 } = {}) {
    this.storyRenders = this.storyRenders.filter((i) => i !== r), await r?.teardown?.({ viewModeChanged: o });
  }
  // UTILITIES
  mainStoryCallbacks(r) {
    return {
      showStoryDuringRender: /* @__PURE__ */ n(() => this.view.showStoryDuringRender(), "showStoryDuringRender"),
      showMain: /* @__PURE__ */ n(() => this.view.showMain(), "showMain"),
      showError: /* @__PURE__ */ n((o) => this.renderError(r, o), "showError"),
      showException: /* @__PURE__ */ n((o) => this.renderException(r, o), "showException")
    };
  }
  renderPreviewEntryError(r, o) {
    super.renderPreviewEntryError(r, o), this.view.showErrorDisplay(o);
  }
  renderMissingStory() {
    this.view.showNoPreview(), this.channel.emit(Di);
  }
  renderStoryLoadingException(r, o) {
    Ot.error(o), this.view.showErrorDisplay(o), this.channel.emit(Di, r);
  }
  // renderException is used if we fail to render the story and it is uncaught by the app layer
  renderException(r, o) {
    let { name: i = "Error", message: s = String(o), stack: a } = o;
    this.channel.emit(Yc, { name: i, message: s, stack: a }), this.channel.emit(Mi, { newPhase: "errored", storyId: r }), this.view.showErrorDisplay(
    o), Ot.error(`Error rendering story '${r}':`), Ot.error(o);
  }
  // renderError is used by the various app layers to inform the user they have done something
  // wrong -- for instance returned the wrong thing from a story
  renderError(r, { title: o, description: i }) {
    Ot.error(`Error rendering story ${o}: ${i}`), this.channel.emit(Uc, { title: o, description: i }), this.channel.emit(Mi, { newPhase: "er\
rored", storyId: r }), this.view.showErrorDisplay({
      message: o,
      stack: i
    });
  }
};
n(ro, "PreviewWithSelection");
var Ne = ro;

// src/preview-api/modules/preview-web/UrlStore.ts
var st = ve(_t(), 1);
import { global as Md } from "@storybook/global";

// src/preview-api/modules/preview-web/parseArgsParam.ts
import { once as Od } from "storybook/internal/client-logger";
var Yi = ve(_t(), 1);
var Wi = /^[a-zA-Z0-9 _-]*$/, Ki = /^-?[0-9]+(\.[0-9]+)?$/, kd = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i, Xi = /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i,
co = /* @__PURE__ */ n((t = "", e) => t === null || t === "" || !Wi.test(t) ? !1 : e == null || e instanceof Date || typeof e == "number" ||
typeof e == "boolean" ? !0 : typeof e == "string" ? Wi.test(e) || Ki.test(e) || kd.test(e) || Xi.test(e) : Array.isArray(e) ? e.every((r) => co(
t, r)) : $(e) ? Object.entries(e).every(([r, o]) => co(r, o)) : !1, "validateArgs"), Dd = {
  delimiter: ";",
  // we're parsing a single query param
  nesting: !0,
  arrayRepeat: !0,
  arrayRepeatSyntax: "bracket",
  nestingSyntax: "js",
  // objects are encoded using dot notation
  valueDeserializer(t) {
    if (t.startsWith("!")) {
      if (t === "!undefined")
        return;
      if (t === "!null")
        return null;
      if (t === "!true")
        return !0;
      if (t === "!false")
        return !1;
      if (t.startsWith("!date(") && t.endsWith(")"))
        return new Date(t.replaceAll(" ", "+").slice(6, -1));
      if (t.startsWith("!hex(") && t.endsWith(")"))
        return `#${t.slice(5, -1)}`;
      let e = t.slice(1).match(Xi);
      if (e)
        return t.startsWith("!rgba") || t.startsWith("!RGBA") ? `${e[1]}(${e[2]}, ${e[3]}, ${e[4]}, ${e[5]})` : t.startsWith("!hsla") || t.startsWith(
        "!HSLA") ? `${e[1]}(${e[2]}, ${e[3]}%, ${e[4]}%, ${e[5]})` : t.startsWith("!rgb") || t.startsWith("!RGB") ? `${e[1]}(${e[2]}, ${e[3]}\
, ${e[4]})` : `${e[1]}(${e[2]}, ${e[3]}%, ${e[4]}%)`;
    }
    return Ki.test(t) ? Number(t) : t;
  }
}, po = /* @__PURE__ */ n((t) => {
  let e = t.split(";").map((r) => r.replace("=", "~").replace(":", "="));
  return Object.entries((0, Yi.parse)(e.join(";"), Dd)).reduce((r, [o, i]) => co(o, i) ? Object.assign(r, { [o]: i }) : (Od.warn(_`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/writing-stories/args#setting-args-through-the-url
    `), r), {});
}, "parseArgsParam");

// src/preview-api/modules/preview-web/UrlStore.ts
var { history: Ji, document: ue } = Md;
function Ld(t) {
  let e = (t || "").match(/^\/story\/(.+)/);
  if (!e)
    throw new Error(`Invalid path '${t}',  must start with '/story/'`);
  return e[1];
}
n(Ld, "pathToId");
var Zi = /* @__PURE__ */ n(({
  selection: t,
  extraParams: e
}) => {
  let r = ue?.location.search.slice(1), { path: o, selectedKind: i, selectedStory: s, ...a } = (0, st.parse)(r);
  return `?${(0, st.stringify)({
    ...a,
    ...e,
    ...t && { id: t.storyId, viewMode: t.viewMode }
  })}`;
}, "getQueryString"), _d = /* @__PURE__ */ n((t) => {
  if (!t)
    return;
  let e = Zi({ selection: t }), { hash: r = "" } = ue.location;
  ue.title = t.storyId, Ji.replaceState({}, "", `${ue.location.pathname}${e}${r}`);
}, "setPath"), jd = /* @__PURE__ */ n((t) => t != null && typeof t == "object" && Array.isArray(t) === !1, "isObject"), it = /* @__PURE__ */ n(
(t) => {
  if (t !== void 0) {
    if (typeof t == "string")
      return t;
    if (Array.isArray(t))
      return it(t[0]);
    if (jd(t))
      return it(
        Object.values(t).filter(Boolean)
      );
  }
}, "getFirstString"), Nd = /* @__PURE__ */ n(() => {
  if (typeof ue < "u") {
    let t = ue.location.search.slice(1), e = (0, st.parse)(t), r = typeof e.args == "string" ? po(e.args) : void 0, o = typeof e.globals == "\
string" ? po(e.globals) : void 0, i = it(e.viewMode);
    (typeof i != "string" || !i.match(/docs|story/)) && (i = "story");
    let s = it(e.path), a = s ? Ld(s) : it(e.id);
    if (a)
      return { storySpecifier: a, args: r, globals: o, viewMode: i };
  }
  return null;
}, "getSelectionSpecifierFromPath"), uo = class uo {
  constructor() {
    this.selectionSpecifier = Nd();
  }
  setSelection(e) {
    this.selection = e, _d(this.selection);
  }
  setQueryParams(e) {
    let r = Zi({ extraParams: e }), { hash: o = "" } = ue.location;
    Ji.replaceState({}, "", `${ue.location.pathname}${r}${o}`);
  }
};
n(uo, "UrlStore");
var qe = uo;

// src/preview-api/modules/preview-web/WebView.ts
var Is = ve(Cs(), 1), Os = ve(_t(), 1);
import { logger as Sp } from "storybook/internal/client-logger";
import { global as xp } from "@storybook/global";
var { document: H } = xp, Ps = 100, ks = /* @__PURE__ */ ((s) => (s.MAIN = "MAIN", s.NOPREVIEW = "NOPREVIEW", s.PREPARING_STORY = "PREPARING\
_STORY", s.PREPARING_DOCS = "PREPARING_DOCS", s.ERROR = "ERROR", s))(ks || {}), So = {
  PREPARING_STORY: "sb-show-preparing-story",
  PREPARING_DOCS: "sb-show-preparing-docs",
  MAIN: "sb-show-main",
  NOPREVIEW: "sb-show-nopreview",
  ERROR: "sb-show-errordisplay"
}, xo = {
  centered: "sb-main-centered",
  fullscreen: "sb-main-fullscreen",
  padded: "sb-main-padded"
}, Fs = new Is.default({
  escapeXML: !0
}), To = class To {
  constructor() {
    this.testing = !1;
    if (typeof H < "u") {
      let { __SPECIAL_TEST_PARAMETER__: e } = (0, Os.parse)(H.location.search.slice(1));
      switch (e) {
        case "preparing-story": {
          this.showPreparingStory(), this.testing = !0;
          break;
        }
        case "preparing-docs": {
          this.showPreparingDocs(), this.testing = !0;
          break;
        }
        default:
      }
    }
  }
  // Get ready to render a story, returning the element to render to
  prepareForStory(e) {
    return this.showStory(), this.applyLayout(e.parameters.layout), H.documentElement.scrollTop = 0, H.documentElement.scrollLeft = 0, this.
    storyRoot();
  }
  storyRoot() {
    return H.getElementById("storybook-root");
  }
  prepareForDocs() {
    return this.showMain(), this.showDocs(), this.applyLayout("fullscreen"), H.documentElement.scrollTop = 0, H.documentElement.scrollLeft =
    0, this.docsRoot();
  }
  docsRoot() {
    return H.getElementById("storybook-docs");
  }
  applyLayout(e = "padded") {
    if (e === "none") {
      H.body.classList.remove(this.currentLayoutClass), this.currentLayoutClass = null;
      return;
    }
    this.checkIfLayoutExists(e);
    let r = xo[e];
    H.body.classList.remove(this.currentLayoutClass), H.body.classList.add(r), this.currentLayoutClass = r;
  }
  checkIfLayoutExists(e) {
    xo[e] || Sp.warn(
      _`
          The desired layout: ${e} is not a valid option.
          The possible options are: ${Object.keys(xo).join(", ")}, none.
        `
    );
  }
  showMode(e) {
    clearTimeout(this.preparingTimeout), Object.keys(ks).forEach((r) => {
      r === e ? H.body.classList.add(So[r]) : H.body.classList.remove(So[r]);
    });
  }
  showErrorDisplay({ message: e = "", stack: r = "" }) {
    let o = e, i = r, s = e.split(`
`);
    s.length > 1 && ([o] = s, i = s.slice(1).join(`
`).replace(/^\n/, "")), H.getElementById("error-message").innerHTML = Fs.toHtml(o), H.getElementById("error-stack").innerHTML = Fs.toHtml(i),
    this.showMode("ERROR");
  }
  showNoPreview() {
    this.testing || (this.showMode("NOPREVIEW"), this.storyRoot()?.setAttribute("hidden", "true"), this.docsRoot()?.setAttribute("hidden", "\
true"));
  }
  showPreparingStory({ immediate: e = !1 } = {}) {
    clearTimeout(this.preparingTimeout), e ? this.showMode("PREPARING_STORY") : this.preparingTimeout = setTimeout(
      () => this.showMode("PREPARING_STORY"),
      Ps
    );
  }
  showPreparingDocs({ immediate: e = !1 } = {}) {
    clearTimeout(this.preparingTimeout), e ? this.showMode("PREPARING_DOCS") : this.preparingTimeout = setTimeout(() => this.showMode("PREPA\
RING_DOCS"), Ps);
  }
  showMain() {
    this.showMode("MAIN");
  }
  showDocs() {
    this.storyRoot().setAttribute("hidden", "true"), this.docsRoot().removeAttribute("hidden");
  }
  showStory() {
    this.docsRoot().setAttribute("hidden", "true"), this.storyRoot().removeAttribute("hidden");
  }
  showStoryDuringRender() {
    H.body.classList.add(So.MAIN);
  }
};
n(To, "WebView");
var He = To;

// src/preview-api/modules/preview-web/PreviewWeb.tsx
var wo = class wo extends Ne {
  constructor(r, o) {
    super(r, o, new qe(), new He());
    this.importFn = r;
    this.getProjectAnnotations = o;
    Tp.__STORYBOOK_PREVIEW__ = this;
  }
};
n(wo, "PreviewWeb");
var zt = wo;

// src/preview-api/modules/preview-web/simulate-pageload.ts
import { global as wp } from "@storybook/global";
var { document: Ae } = wp, Rp = [
  "application/javascript",
  "application/ecmascript",
  "application/x-ecmascript",
  "application/x-javascript",
  "text/ecmascript",
  "text/javascript",
  "text/javascript1.0",
  "text/javascript1.1",
  "text/javascript1.2",
  "text/javascript1.3",
  "text/javascript1.4",
  "text/javascript1.5",
  "text/jscript",
  "text/livescript",
  "text/x-ecmascript",
  "text/x-javascript",
  // Support modern javascript
  "module"
], Ep = "script", Ds = "scripts-root";
function Ut() {
  let t = Ae.createEvent("Event");
  t.initEvent("DOMContentLoaded", !0, !0), Ae.dispatchEvent(t);
}
n(Ut, "simulateDOMContentLoaded");
function Ap(t, e, r) {
  let o = Ae.createElement("script");
  o.type = t.type === "module" ? "module" : "text/javascript", t.src ? (o.onload = e, o.onerror = e, o.src = t.src) : o.textContent = t.innerText,
  r ? r.appendChild(o) : Ae.head.appendChild(o), t.parentNode.removeChild(t), t.src || e();
}
n(Ap, "insertScript");
function Ms(t, e, r = 0) {
  t[r](() => {
    r++, r === t.length ? e() : Ms(t, e, r);
  });
}
n(Ms, "insertScriptsSequentially");
function Ls(t) {
  let e = Ae.getElementById(Ds);
  e ? e.innerHTML = "" : (e = Ae.createElement("div"), e.id = Ds, Ae.body.appendChild(e));
  let r = Array.from(t.querySelectorAll(Ep));
  if (r.length) {
    let o = [];
    r.forEach((i) => {
      let s = i.getAttribute("type");
      (!s || Rp.includes(s)) && o.push((a) => Ap(i, a, e));
    }), o.length && Ms(o, Ut, void 0);
  } else
    Ut();
}
n(Ls, "simulatePageLoad");

// src/docs-tools/shared.ts
var _s = "storybook/docs", yS = `${_s}/panel`;
var js = `${_s}/snippet-rendered`;

// src/preview-api/modules/preview-web/emitTransformCode.ts
async function Ns(t, e) {
  let r = e.parameters?.docs?.source?.transform, { id: o, unmappedArgs: i } = e, s = r && t ? r?.(t, e) : t, a = s ? await s : void 0;
  z.getChannel().emit(js, {
    id: o,
    source: a,
    args: i
  });
}
n(Ns, "emitTransformCode");
export {
  pe as DocsContext,
  he as HooksContext,
  je as Preview,
  zt as PreviewWeb,
  Ne as PreviewWithSelection,
  xe as ReporterAPI,
  _e as StoryStore,
  qe as UrlStore,
  He as WebView,
  z as addons,
  Qt as applyHooks,
  Je as combineArgs,
  V as combineParameters,
  le as composeConfigs,
  zr as composeStepRunners,
  nc as composeStories,
  bi as composeStory,
  ic as createPlaywrightTest,
  ui as decorateStory,
  Hr as defaultDecorateStory,
  Ws as definePreview,
  Ns as emitTransformCode,
  Ct as filterArgTypes,
  Xe as getCoreAnnotations,
  Vr as getCsfFactoryAnnotations,
  et as inferControls,
  da as makeDecorator,
  Wt as mockChannel,
  De as normalizeProjectAnnotations,
  ke as normalizeStory,
  Me as pauseAnimations,
  $r as prepareMeta,
  Qe as prepareStory,
  fi as sanitizeStoryContextUpdate,
  Zl as setDefaultProjectAnnotations,
  rc as setProjectAnnotations,
  Ut as simulateDOMContentLoaded,
  Ls as simulatePageLoad,
  mc as sortStoriesV7,
  la as useArgs,
  Ge as useCallback,
  sa as useChannel,
  Io as useEffect,
  ca as useGlobals,
  ta as useMemo,
  aa as useParameter,
  ia as useReducer,
  ra as useRef,
  na as useState,
  pt as useStoryContext,
  uc as userOrAutoTitle,
  Ti as userOrAutoTitleFromSpecifier,
  Le as waitForAnimations
};
