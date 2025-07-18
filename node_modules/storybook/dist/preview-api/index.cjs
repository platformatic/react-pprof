"use strict";
var Ba = Object.create;
var et = Object.defineProperty;
var Ga = Object.getOwnPropertyDescriptor;
var za = Object.getOwnPropertyNames;
var Ua = Object.getPrototypeOf, Va = Object.prototype.hasOwnProperty;
var i = (e, t) => et(e, "name", { value: t, configurable: !0 });
var N = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), gr = (e, t) => {
  for (var r in t)
    et(e, r, { get: t[r], enumerable: !0 });
}, Lo = (e, t, r, o) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let n of za(t))
      !Va.call(e, n) && n !== r && et(e, n, { get: () => t[n], enumerable: !(o = Ga(t, n)) || o.enumerable });
  return e;
};
var $ = (e, t, r) => (r = e != null ? Ba(Ua(e)) : {}, Lo(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  t || !e || !e.__esModule ? et(r, "default", { value: e, enumerable: !0 }) : r,
  e
)), Wa = (e) => Lo(et({}, "__esModule", { value: !0 }), e);

// ../node_modules/map-or-similar/src/similar.js
var vn = N((Tp, An) => {
  function he() {
    return this.list = [], this.lastItem = void 0, this.size = 0, this;
  }
  i(he, "Similar");
  he.prototype.get = function(e) {
    var t;
    if (this.lastItem && this.isEqual(this.lastItem.key, e))
      return this.lastItem.val;
    if (t = this.indexOf(e), t >= 0)
      return this.lastItem = this.list[t], this.list[t].val;
  };
  he.prototype.set = function(e, t) {
    var r;
    return this.lastItem && this.isEqual(this.lastItem.key, e) ? (this.lastItem.val = t, this) : (r = this.indexOf(e), r >= 0 ? (this.lastItem =
    this.list[r], this.list[r].val = t, this) : (this.lastItem = { key: e, val: t }, this.list.push(this.lastItem), this.size++, this));
  };
  he.prototype.delete = function(e) {
    var t;
    if (this.lastItem && this.isEqual(this.lastItem.key, e) && (this.lastItem = void 0), t = this.indexOf(e), t >= 0)
      return this.size--, this.list.splice(t, 1)[0];
  };
  he.prototype.has = function(e) {
    var t;
    return this.lastItem && this.isEqual(this.lastItem.key, e) ? !0 : (t = this.indexOf(e), t >= 0 ? (this.lastItem = this.list[t], !0) : !1);
  };
  he.prototype.forEach = function(e, t) {
    var r;
    for (r = 0; r < this.size; r++)
      e.call(t || this, this.list[r].val, this.list[r].key, this);
  };
  he.prototype.indexOf = function(e) {
    var t;
    for (t = 0; t < this.size; t++)
      if (this.isEqual(this.list[t].key, e))
        return t;
    return -1;
  };
  he.prototype.isEqual = function(e, t) {
    return e === t || e !== e && t !== t;
  };
  An.exports = he;
});

// ../node_modules/map-or-similar/src/map-or-similar.js
var Pn = N((Rp, Cn) => {
  Cn.exports = function(e) {
    if (typeof Map != "function" || e) {
      var t = vn();
      return new t();
    } else
      return /* @__PURE__ */ new Map();
  };
});

// ../node_modules/memoizerific/src/memoizerific.js
var Fr = N((Ep, In) => {
  var Fn = Pn();
  In.exports = function(e) {
    var t = new Fn(process.env.FORCE_SIMILAR_INSTEAD_OF_MAP === "true"), r = [];
    return function(o) {
      var n = /* @__PURE__ */ i(function() {
        var s = t, a, l, c = arguments.length - 1, d = Array(c + 1), p = !0, u;
        if ((n.numArgs || n.numArgs === 0) && n.numArgs !== c + 1)
          throw new Error("Memoizerific functions should always be called with the same number of arguments");
        for (u = 0; u < c; u++) {
          if (d[u] = {
            cacheItem: s,
            arg: arguments[u]
          }, s.has(arguments[u])) {
            s = s.get(arguments[u]);
            continue;
          }
          p = !1, a = new Fn(process.env.FORCE_SIMILAR_INSTEAD_OF_MAP === "true"), s.set(arguments[u], a), s = a;
        }
        return p && (s.has(arguments[c]) ? l = s.get(arguments[c]) : p = !1), p || (l = o.apply(null, arguments), s.set(arguments[c], l)), e >
        0 && (d[c] = {
          cacheItem: s,
          arg: arguments[c]
        }, p ? Qa(r, d) : r.push(d), r.length > e && el(r.shift())), n.wasMemoized = p, n.numArgs = c + 1, l;
      }, "memoizerific");
      return n.limit = e, n.wasMemoized = !1, n.cache = t, n.lru = r, n;
    };
  };
  function Qa(e, t) {
    var r = e.length, o = t.length, n, s, a;
    for (s = 0; s < r; s++) {
      for (n = !0, a = 0; a < o; a++)
        if (!tl(e[s][a].arg, t[a].arg)) {
          n = !1;
          break;
        }
      if (n)
        break;
    }
    e.push(e.splice(s, 1)[0]);
  }
  i(Qa, "moveToMostRecentLru");
  function el(e) {
    var t = e.length, r = e[t - 1], o, n;
    for (r.cacheItem.delete(r.arg), n = t - 2; n >= 0 && (r = e[n], o = r.cacheItem.get(r.arg), !o || !o.size); n--)
      r.cacheItem.delete(r.arg);
  }
  i(el, "removeCachedResult");
  function tl(e, t) {
    return e === t || e !== e && t !== t;
  }
  i(tl, "isEqual");
});

// ../node_modules/ts-dedent/dist/index.js
var te = N((ut) => {
  "use strict";
  Object.defineProperty(ut, "__esModule", { value: !0 });
  ut.dedent = void 0;
  function Ii(e) {
    for (var t = [], r = 1; r < arguments.length; r++)
      t[r - 1] = arguments[r];
    var o = Array.from(typeof e == "string" ? [e] : e);
    o[o.length - 1] = o[o.length - 1].replace(/\r?\n([\t ]*)$/, "");
    var n = o.reduce(function(l, c) {
      var d = c.match(/\n([\t ]+|(?!\s).)/g);
      return d ? l.concat(d.map(function(p) {
        var u, y;
        return (y = (u = p.match(/[\t ]/g)) === null || u === void 0 ? void 0 : u.length) !== null && y !== void 0 ? y : 0;
      })) : l;
    }, []);
    if (n.length) {
      var s = new RegExp(`
[	 ]{` + Math.min.apply(Math, n) + "}", "g");
      o = o.map(function(l) {
        return l.replace(s, `
`);
      });
    }
    o[0] = o[0].replace(/^\r?\n/, "");
    var a = o[0];
    return t.forEach(function(l, c) {
      var d = a.match(/(?:^|\n)( *)$/), p = d ? d[1] : "", u = l;
      typeof l == "string" && l.includes(`
`) && (u = String(l).split(`
`).map(function(y, b) {
        return b === 0 ? y : "" + p + y;
      }).join(`
`)), a += u + o[c + 1];
    }), a;
  }
  i(Ii, "dedent");
  ut.dedent = Ii;
  ut.default = Ii;
});

// ../node_modules/picoquery/lib/string-util.js
var go = N((ho) => {
  "use strict";
  Object.defineProperty(ho, "__esModule", { value: !0 });
  ho.encodeString = gc;
  var ae = Array.from({ length: 256 }, (e, t) => "%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase()), hc = new Int8Array([
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
  function gc(e) {
    let t = e.length;
    if (t === 0)
      return "";
    let r = "", o = 0, n = 0;
    e: for (; n < t; n++) {
      let s = e.charCodeAt(n);
      for (; s < 128; ) {
        if (hc[s] !== 1 && (o < n && (r += e.slice(o, n)), o = n + 1, r += ae[s]), ++n === t)
          break e;
        s = e.charCodeAt(n);
      }
      if (o < n && (r += e.slice(o, n)), s < 2048) {
        o = n + 1, r += ae[192 | s >> 6] + ae[128 | s & 63];
        continue;
      }
      if (s < 55296 || s >= 57344) {
        o = n + 1, r += ae[224 | s >> 12] + ae[128 | s >> 6 & 63] + ae[128 | s & 63];
        continue;
      }
      if (++n, n >= t)
        throw new Error("URI malformed");
      let a = e.charCodeAt(n) & 1023;
      o = n + 1, s = 65536 + ((s & 1023) << 10 | a), r += ae[240 | s >> 18] + ae[128 | s >> 12 & 63] + ae[128 | s >> 6 & 63] + ae[128 | s & 63];
    }
    return o === 0 ? e : o < t ? r + e.slice(o) : r;
  }
  i(gc, "encodeString");
});

// ../node_modules/picoquery/lib/shared.js
var nr = N((le) => {
  "use strict";
  Object.defineProperty(le, "__esModule", { value: !0 });
  le.defaultOptions = le.defaultShouldSerializeObject = le.defaultValueSerializer = void 0;
  var bo = go(), bc = /* @__PURE__ */ i((e) => {
    switch (typeof e) {
      case "string":
        return (0, bo.encodeString)(e);
      case "bigint":
      case "boolean":
        return "" + e;
      case "number":
        if (Number.isFinite(e))
          return e < 1e21 ? "" + e : (0, bo.encodeString)("" + e);
        break;
    }
    return e instanceof Date ? (0, bo.encodeString)(e.toISOString()) : "";
  }, "defaultValueSerializer");
  le.defaultValueSerializer = bc;
  var Sc = /* @__PURE__ */ i((e) => e instanceof Date, "defaultShouldSerializeObject");
  le.defaultShouldSerializeObject = Sc;
  var Ms = /* @__PURE__ */ i((e) => e, "identityFunc");
  le.defaultOptions = {
    nesting: !0,
    nestingSyntax: "dot",
    arrayRepeat: !1,
    arrayRepeatSyntax: "repeat",
    delimiter: 38,
    valueDeserializer: Ms,
    valueSerializer: le.defaultValueSerializer,
    keyDeserializer: Ms,
    shouldSerializeObject: le.defaultShouldSerializeObject
  };
});

// ../node_modules/picoquery/lib/object-util.js
var So = N((ir) => {
  "use strict";
  Object.defineProperty(ir, "__esModule", { value: !0 });
  ir.getDeepObject = wc;
  ir.stringifyObject = Ds;
  var je = nr(), xc = go();
  function Tc(e) {
    return e === "__proto__" || e === "constructor" || e === "prototype";
  }
  i(Tc, "isPrototypeKey");
  function wc(e, t, r, o, n) {
    if (Tc(t))
      return e;
    let s = e[t];
    return typeof s == "object" && s !== null ? s : !o && (n || typeof r == "number" || typeof r == "string" && r * 0 === 0 && r.indexOf(".") ===
    -1) ? e[t] = [] : e[t] = {};
  }
  i(wc, "getDeepObject");
  var Rc = 20, Ec = "[]", Ac = "[", vc = "]", Cc = ".";
  function Ds(e, t, r = 0, o, n) {
    let { nestingSyntax: s = je.defaultOptions.nestingSyntax, arrayRepeat: a = je.defaultOptions.arrayRepeat, arrayRepeatSyntax: l = je.defaultOptions.
    arrayRepeatSyntax, nesting: c = je.defaultOptions.nesting, delimiter: d = je.defaultOptions.delimiter, valueSerializer: p = je.defaultOptions.
    valueSerializer, shouldSerializeObject: u = je.defaultOptions.shouldSerializeObject } = t, y = typeof d == "number" ? String.fromCharCode(
    d) : d, b = n === !0 && a, w = s === "dot" || s === "js" && !n;
    if (r > Rc)
      return "";
    let R = "", x = !0, A = !1;
    for (let P in e) {
      let m = e[P], S;
      o ? (S = o, b ? l === "bracket" && (S += Ec) : w ? (S += Cc, S += P) : (S += Ac, S += P, S += vc)) : S = P, x || (R += y), typeof m ==
      "object" && m !== null && !u(m) ? (A = m.pop !== void 0, (c || a && A) && (R += Ds(m, t, r + 1, S, A))) : (R += (0, xc.encodeString)(S),
      R += "=", R += p(m, P)), x && (x = !1);
    }
    return R;
  }
  i(Ds, "stringifyObject");
});

// ../node_modules/fast-decode-uri-component/index.js
var Ns = N((Sh, js) => {
  "use strict";
  var Ls = 12, Pc = 0, xo = [
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
  function Fc(e) {
    var t = e.indexOf("%");
    if (t === -1) return e;
    for (var r = e.length, o = "", n = 0, s = 0, a = t, l = Ls; t > -1 && t < r; ) {
      var c = _s(e[t + 1], 4), d = _s(e[t + 2], 0), p = c | d, u = xo[p];
      if (l = xo[256 + l + u], s = s << 6 | p & xo[364 + u], l === Ls)
        o += e.slice(n, a), o += s <= 65535 ? String.fromCharCode(s) : String.fromCharCode(
          55232 + (s >> 10),
          56320 + (s & 1023)
        ), s = 0, n = t + 3, t = a = e.indexOf("%", n);
      else {
        if (l === Pc)
          return null;
        if (t += 3, t < r && e.charCodeAt(t) === 37) continue;
        return null;
      }
    }
    return o + e.slice(n);
  }
  i(Fc, "decodeURIComponent");
  var Ic = {
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
  function _s(e, t) {
    var r = Ic[e];
    return r === void 0 ? 255 : r << t;
  }
  i(_s, "hexCodeToInt");
  js.exports = Fc;
});

// ../node_modules/picoquery/lib/parse.js
var Bs = N((me) => {
  "use strict";
  var Oc = me && me.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(me, "__esModule", { value: !0 });
  me.numberValueDeserializer = me.numberKeyDeserializer = void 0;
  me.parse = Dc;
  var sr = So(), Ne = nr(), qs = Oc(Ns()), kc = /* @__PURE__ */ i((e) => {
    let t = Number(e);
    return Number.isNaN(t) ? e : t;
  }, "numberKeyDeserializer");
  me.numberKeyDeserializer = kc;
  var Mc = /* @__PURE__ */ i((e) => {
    let t = Number(e);
    return Number.isNaN(t) ? e : t;
  }, "numberValueDeserializer");
  me.numberValueDeserializer = Mc;
  var Hs = /\+/g, $s = /* @__PURE__ */ i(function() {
  }, "Empty");
  $s.prototype = /* @__PURE__ */ Object.create(null);
  function ar(e, t, r, o, n) {
    let s = e.substring(t, r);
    return o && (s = s.replace(Hs, " ")), n && (s = (0, qs.default)(s) || s), s;
  }
  i(ar, "computeKeySlice");
  function Dc(e, t) {
    let { valueDeserializer: r = Ne.defaultOptions.valueDeserializer, keyDeserializer: o = Ne.defaultOptions.keyDeserializer, arrayRepeatSyntax: n = Ne.
    defaultOptions.arrayRepeatSyntax, nesting: s = Ne.defaultOptions.nesting, arrayRepeat: a = Ne.defaultOptions.arrayRepeat, nestingSyntax: l = Ne.
    defaultOptions.nestingSyntax, delimiter: c = Ne.defaultOptions.delimiter } = t ?? {}, d = typeof c == "string" ? c.charCodeAt(0) : c, p = l ===
    "js", u = new $s();
    if (typeof e != "string")
      return u;
    let y = e.length, b = "", w = -1, R = -1, x = -1, A = u, P, m = "", S = "", C = !1, v = !1, f = !1, h = !1, g = !1, E = !1, T = !1, I = 0,
    F = -1, M = -1, U = -1;
    for (let j = 0; j < y + 1; j++) {
      if (I = j !== y ? e.charCodeAt(j) : d, I === d) {
        if (T = R > w, T || (R = j), x !== R - 1 && (S = ar(e, x + 1, F > -1 ? F : R, f, C), m = o(S), P !== void 0 && (A = (0, sr.getDeepObject)(
        A, P, m, p && g, p && E))), T || m !== "") {
          T && (b = e.slice(R + 1, j), h && (b = b.replace(Hs, " ")), v && (b = (0, qs.default)(b) || b));
          let oe = r(b, m);
          if (a) {
            let Ae = A[m];
            Ae === void 0 ? F > -1 ? A[m] = [oe] : A[m] = oe : Ae.pop ? Ae.push(oe) : A[m] = [Ae, oe];
          } else
            A[m] = oe;
        }
        b = "", w = j, R = j, C = !1, v = !1, f = !1, h = !1, g = !1, E = !1, F = -1, x = j, A = u, P = void 0, m = "";
      } else I === 93 ? (a && n === "bracket" && U === 91 && (F = M), s && (l === "index" || p) && R <= w && (x !== M && (S = ar(e, x + 1, j,
      f, C), m = o(S), P !== void 0 && (A = (0, sr.getDeepObject)(A, P, m, void 0, p)), P = m, f = !1, C = !1), x = j, E = !0, g = !1)) : I ===
      46 ? s && (l === "dot" || p) && R <= w && (x !== M && (S = ar(e, x + 1, j, f, C), m = o(S), P !== void 0 && (A = (0, sr.getDeepObject)(
      A, P, m, p)), P = m, f = !1, C = !1), g = !0, E = !1, x = j) : I === 91 ? s && (l === "index" || p) && R <= w && (x !== M && (S = ar(e,
      x + 1, j, f, C), m = o(S), p && P !== void 0 && (A = (0, sr.getDeepObject)(A, P, m, p)), P = m, f = !1, C = !1, g = !1, E = !0), x = j) :
      I === 61 ? R <= w ? R = j : v = !0 : I === 43 ? R > w ? h = !0 : f = !0 : I === 37 && (R > w ? v = !0 : C = !0);
      M = j, U = I;
    }
    return u;
  }
  i(Dc, "parse");
});

// ../node_modules/picoquery/lib/stringify.js
var Gs = N((To) => {
  "use strict";
  Object.defineProperty(To, "__esModule", { value: !0 });
  To.stringify = _c;
  var Lc = So();
  function _c(e, t) {
    if (e === null || typeof e != "object")
      return "";
    let r = t ?? {};
    return (0, Lc.stringifyObject)(e, r);
  }
  i(_c, "stringify");
});

// ../node_modules/picoquery/lib/main.js
var lr = N((re) => {
  "use strict";
  var jc = re && re.__createBinding || (Object.create ? function(e, t, r, o) {
    o === void 0 && (o = r);
    var n = Object.getOwnPropertyDescriptor(t, r);
    (!n || ("get" in n ? !t.__esModule : n.writable || n.configurable)) && (n = { enumerable: !0, get: /* @__PURE__ */ i(function() {
      return t[r];
    }, "get") }), Object.defineProperty(e, o, n);
  } : function(e, t, r, o) {
    o === void 0 && (o = r), e[o] = t[r];
  }), Nc = re && re.__exportStar || function(e, t) {
    for (var r in e) r !== "default" && !Object.prototype.hasOwnProperty.call(t, r) && jc(t, e, r);
  };
  Object.defineProperty(re, "__esModule", { value: !0 });
  re.stringify = re.parse = void 0;
  var qc = Bs();
  Object.defineProperty(re, "parse", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return qc.parse;
  }, "get") });
  var Hc = Gs();
  Object.defineProperty(re, "stringify", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return Hc.stringify;
  }, "get") });
  Nc(nr(), re);
});

// ../node_modules/entities/lib/maps/entities.json
var Eo = N((Mh, Wc) => {
  Wc.exports = { Aacute: "\xC1", aacute: "\xE1", Abreve: "\u0102", abreve: "\u0103", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", Acirc: "\
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
var Qs = N((Dh, Yc) => {
  Yc.exports = { Aacute: "\xC1", aacute: "\xE1", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", AElig: "\xC6", aelig: "\xE6", Agrave: "\xC0", agrave: "\
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
var Ao = N((Lh, Kc) => {
  Kc.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
});

// ../node_modules/entities/lib/maps/decode.json
var ea = N((_h, Xc) => {
  Xc.exports = { "0": 65533, "128": 8364, "130": 8218, "131": 402, "132": 8222, "133": 8230, "134": 8224, "135": 8225, "136": 710, "137": 8240,
  "138": 352, "139": 8249, "140": 338, "142": 381, "145": 8216, "146": 8217, "147": 8220, "148": 8221, "149": 8226, "150": 8211, "151": 8212,
  "152": 732, "153": 8482, "154": 353, "155": 8250, "156": 339, "158": 382, "159": 376 };
});

// ../node_modules/entities/lib/decode_codepoint.js
var ra = N((Et) => {
  "use strict";
  var Jc = Et && Et.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(Et, "__esModule", { value: !0 });
  var ta = Jc(ea()), Zc = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.fromCodePoint || function(e) {
      var t = "";
      return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e),
      t;
    }
  );
  function Qc(e) {
    return e >= 55296 && e <= 57343 || e > 1114111 ? "\uFFFD" : (e in ta.default && (e = ta.default[e]), Zc(e));
  }
  i(Qc, "decodeCodePoint");
  Et.default = Qc;
});

// ../node_modules/entities/lib/decode.js
var Co = N((ce) => {
  "use strict";
  var cr = ce && ce.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(ce, "__esModule", { value: !0 });
  ce.decodeHTML = ce.decodeHTMLStrict = ce.decodeXML = void 0;
  var vo = cr(Eo()), ed = cr(Qs()), td = cr(Ao()), oa = cr(ra()), rd = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
  ce.decodeXML = ia(td.default);
  ce.decodeHTMLStrict = ia(vo.default);
  function ia(e) {
    var t = sa(e);
    return function(r) {
      return String(r).replace(rd, t);
    };
  }
  i(ia, "getStrictDecoder");
  var na = /* @__PURE__ */ i(function(e, t) {
    return e < t ? 1 : -1;
  }, "sorter");
  ce.decodeHTML = function() {
    for (var e = Object.keys(ed.default).sort(na), t = Object.keys(vo.default).sort(na), r = 0, o = 0; r < t.length; r++)
      e[o] === t[r] ? (t[r] += ";?", o++) : t[r] += ";";
    var n = new RegExp("&(?:" + t.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), s = sa(vo.default);
    function a(l) {
      return l.substr(-1) !== ";" && (l += ";"), s(l);
    }
    return i(a, "replacer"), function(l) {
      return String(l).replace(n, a);
    };
  }();
  function sa(e) {
    return /* @__PURE__ */ i(function(r) {
      if (r.charAt(1) === "#") {
        var o = r.charAt(2);
        return o === "X" || o === "x" ? oa.default(parseInt(r.substr(3), 16)) : oa.default(parseInt(r.substr(2), 10));
      }
      return e[r.slice(1, -1)] || r;
    }, "replace");
  }
  i(sa, "getReplacer");
});

// ../node_modules/entities/lib/encode.js
var Fo = N((W) => {
  "use strict";
  var aa = W && W.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(W, "__esModule", { value: !0 });
  W.escapeUTF8 = W.escape = W.encodeNonAsciiHTML = W.encodeHTML = W.encodeXML = void 0;
  var od = aa(Ao()), la = da(od.default), ca = pa(la);
  W.encodeXML = ma(la);
  var nd = aa(Eo()), Po = da(nd.default), id = pa(Po);
  W.encodeHTML = ad(Po, id);
  W.encodeNonAsciiHTML = ma(Po);
  function da(e) {
    return Object.keys(e).sort().reduce(function(t, r) {
      return t[e[r]] = "&" + r + ";", t;
    }, {});
  }
  i(da, "getInverseObj");
  function pa(e) {
    for (var t = [], r = [], o = 0, n = Object.keys(e); o < n.length; o++) {
      var s = n[o];
      s.length === 1 ? t.push("\\" + s) : r.push(s);
    }
    t.sort();
    for (var a = 0; a < t.length - 1; a++) {
      for (var l = a; l < t.length - 1 && t[l].charCodeAt(1) + 1 === t[l + 1].charCodeAt(1); )
        l += 1;
      var c = 1 + l - a;
      c < 3 || t.splice(a, c, t[a] + "-" + t[l]);
    }
    return r.unshift("[" + t.join("") + "]"), new RegExp(r.join("|"), "g");
  }
  i(pa, "getInverseReplacer");
  var ua = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
  sd = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.prototype.codePointAt != null ? (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      function(e) {
        return e.codePointAt(0);
      }
    ) : (
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      function(e) {
        return (e.charCodeAt(0) - 55296) * 1024 + e.charCodeAt(1) - 56320 + 65536;
      }
    )
  );
  function dr(e) {
    return "&#x" + (e.length > 1 ? sd(e) : e.charCodeAt(0)).toString(16).toUpperCase() + ";";
  }
  i(dr, "singleCharReplacer");
  function ad(e, t) {
    return function(r) {
      return r.replace(t, function(o) {
        return e[o];
      }).replace(ua, dr);
    };
  }
  i(ad, "getInverse");
  var fa = new RegExp(ca.source + "|" + ua.source, "g");
  function ld(e) {
    return e.replace(fa, dr);
  }
  i(ld, "escape");
  W.escape = ld;
  function cd(e) {
    return e.replace(ca, dr);
  }
  i(cd, "escapeUTF8");
  W.escapeUTF8 = cd;
  function ma(e) {
    return function(t) {
      return t.replace(fa, function(r) {
        return e[r] || dr(r);
      });
    };
  }
  i(ma, "getASCIIEncoder");
});

// ../node_modules/entities/lib/index.js
var ha = N((O) => {
  "use strict";
  Object.defineProperty(O, "__esModule", { value: !0 });
  O.decodeXMLStrict = O.decodeHTML5Strict = O.decodeHTML4Strict = O.decodeHTML5 = O.decodeHTML4 = O.decodeHTMLStrict = O.decodeHTML = O.decodeXML =
  O.encodeHTML5 = O.encodeHTML4 = O.escapeUTF8 = O.escape = O.encodeNonAsciiHTML = O.encodeHTML = O.encodeXML = O.encode = O.decodeStrict = O.
  decode = void 0;
  var pr = Co(), ya = Fo();
  function dd(e, t) {
    return (!t || t <= 0 ? pr.decodeXML : pr.decodeHTML)(e);
  }
  i(dd, "decode");
  O.decode = dd;
  function pd(e, t) {
    return (!t || t <= 0 ? pr.decodeXML : pr.decodeHTMLStrict)(e);
  }
  i(pd, "decodeStrict");
  O.decodeStrict = pd;
  function ud(e, t) {
    return (!t || t <= 0 ? ya.encodeXML : ya.encodeHTML)(e);
  }
  i(ud, "encode");
  O.encode = ud;
  var He = Fo();
  Object.defineProperty(O, "encodeXML", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return He.encodeXML;
  }, "get") });
  Object.defineProperty(O, "encodeHTML", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return He.encodeHTML;
  }, "get") });
  Object.defineProperty(O, "encodeNonAsciiHTML", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return He.encodeNonAsciiHTML;
  }, "get") });
  Object.defineProperty(O, "escape", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return He.escape;
  }, "get") });
  Object.defineProperty(O, "escapeUTF8", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return He.escapeUTF8;
  }, "get") });
  Object.defineProperty(O, "encodeHTML4", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return He.encodeHTML;
  }, "get") });
  Object.defineProperty(O, "encodeHTML5", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return He.encodeHTML;
  }, "get") });
  var Re = Co();
  Object.defineProperty(O, "decodeXML", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return Re.decodeXML;
  }, "get") });
  Object.defineProperty(O, "decodeHTML", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return Re.decodeHTML;
  }, "get") });
  Object.defineProperty(O, "decodeHTMLStrict", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return Re.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O, "decodeHTML4", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return Re.decodeHTML;
  }, "get") });
  Object.defineProperty(O, "decodeHTML5", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return Re.decodeHTML;
  }, "get") });
  Object.defineProperty(O, "decodeHTML4Strict", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return Re.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O, "decodeHTML5Strict", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return Re.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O, "decodeXMLStrict", { enumerable: !0, get: /* @__PURE__ */ i(function() {
    return Re.decodeXML;
  }, "get") });
});

// ../node_modules/ansi-to-html/lib/ansi_to_html.js
var Ca = N((Uh, va) => {
  "use strict";
  function fd(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  i(fd, "_classCallCheck");
  function ga(e, t) {
    for (var r = 0; r < t.length; r++) {
      var o = t[r];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
    }
  }
  i(ga, "_defineProperties");
  function md(e, t, r) {
    return t && ga(e.prototype, t), r && ga(e, r), e;
  }
  i(md, "_createClass");
  function Ra(e, t) {
    var r = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
    if (!r) {
      if (Array.isArray(e) || (r = yd(e)) || t && e && typeof e.length == "number") {
        r && (e = r);
        var o = 0, n = /* @__PURE__ */ i(function() {
        }, "F");
        return { s: n, n: /* @__PURE__ */ i(function() {
          return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] };
        }, "n"), e: /* @__PURE__ */ i(function(d) {
          throw d;
        }, "e"), f: n };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var s = !0, a = !1, l;
    return { s: /* @__PURE__ */ i(function() {
      r = r.call(e);
    }, "s"), n: /* @__PURE__ */ i(function() {
      var d = r.next();
      return s = d.done, d;
    }, "n"), e: /* @__PURE__ */ i(function(d) {
      a = !0, l = d;
    }, "e"), f: /* @__PURE__ */ i(function() {
      try {
        !s && r.return != null && r.return();
      } finally {
        if (a) throw l;
      }
    }, "f") };
  }
  i(Ra, "_createForOfIteratorHelper");
  function yd(e, t) {
    if (e) {
      if (typeof e == "string") return ba(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
      if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ba(e, t);
    }
  }
  i(yd, "_unsupportedIterableToArray");
  function ba(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var r = 0, o = new Array(t); r < t; r++)
      o[r] = e[r];
    return o;
  }
  i(ba, "_arrayLikeToArray");
  var hd = ha(), Sa = {
    fg: "#FFF",
    bg: "#000",
    newline: !1,
    escapeXML: !1,
    stream: !1,
    colors: gd()
  };
  function gd() {
    var e = {
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
    return ur(0, 5).forEach(function(t) {
      ur(0, 5).forEach(function(r) {
        ur(0, 5).forEach(function(o) {
          return bd(t, r, o, e);
        });
      });
    }), ur(0, 23).forEach(function(t) {
      var r = t + 232, o = Ea(t * 10 + 8);
      e[r] = "#" + o + o + o;
    }), e;
  }
  i(gd, "getDefaultColors");
  function bd(e, t, r, o) {
    var n = 16 + e * 36 + t * 6 + r, s = e > 0 ? e * 40 + 55 : 0, a = t > 0 ? t * 40 + 55 : 0, l = r > 0 ? r * 40 + 55 : 0;
    o[n] = Sd([s, a, l]);
  }
  i(bd, "setStyleColor");
  function Ea(e) {
    for (var t = e.toString(16); t.length < 2; )
      t = "0" + t;
    return t;
  }
  i(Ea, "toHexString");
  function Sd(e) {
    var t = [], r = Ra(e), o;
    try {
      for (r.s(); !(o = r.n()).done; ) {
        var n = o.value;
        t.push(Ea(n));
      }
    } catch (s) {
      r.e(s);
    } finally {
      r.f();
    }
    return "#" + t.join("");
  }
  i(Sd, "toColorHexString");
  function xa(e, t, r, o) {
    var n;
    return t === "text" ? n = Rd(r, o) : t === "display" ? n = Td(e, r, o) : t === "xterm256Foreground" ? n = mr(e, o.colors[r]) : t === "xt\
erm256Background" ? n = yr(e, o.colors[r]) : t === "rgb" && (n = xd(e, r)), n;
  }
  i(xa, "generateOutput");
  function xd(e, t) {
    t = t.substring(2).slice(0, -1);
    var r = +t.substr(0, 2), o = t.substring(5).split(";"), n = o.map(function(s) {
      return ("0" + Number(s).toString(16)).substr(-2);
    }).join("");
    return fr(e, (r === 38 ? "color:#" : "background-color:#") + n);
  }
  i(xd, "handleRgb");
  function Td(e, t, r) {
    t = parseInt(t, 10);
    var o = {
      "-1": /* @__PURE__ */ i(function() {
        return "<br/>";
      }, "_"),
      0: /* @__PURE__ */ i(function() {
        return e.length && Aa(e);
      }, "_"),
      1: /* @__PURE__ */ i(function() {
        return Ee(e, "b");
      }, "_"),
      3: /* @__PURE__ */ i(function() {
        return Ee(e, "i");
      }, "_"),
      4: /* @__PURE__ */ i(function() {
        return Ee(e, "u");
      }, "_"),
      8: /* @__PURE__ */ i(function() {
        return fr(e, "display:none");
      }, "_"),
      9: /* @__PURE__ */ i(function() {
        return Ee(e, "strike");
      }, "_"),
      22: /* @__PURE__ */ i(function() {
        return fr(e, "font-weight:normal;text-decoration:none;font-style:normal");
      }, "_"),
      23: /* @__PURE__ */ i(function() {
        return wa(e, "i");
      }, "_"),
      24: /* @__PURE__ */ i(function() {
        return wa(e, "u");
      }, "_"),
      39: /* @__PURE__ */ i(function() {
        return mr(e, r.fg);
      }, "_"),
      49: /* @__PURE__ */ i(function() {
        return yr(e, r.bg);
      }, "_"),
      53: /* @__PURE__ */ i(function() {
        return fr(e, "text-decoration:overline");
      }, "_")
    }, n;
    return o[t] ? n = o[t]() : 4 < t && t < 7 ? n = Ee(e, "blink") : 29 < t && t < 38 ? n = mr(e, r.colors[t - 30]) : 39 < t && t < 48 ? n =
    yr(e, r.colors[t - 40]) : 89 < t && t < 98 ? n = mr(e, r.colors[8 + (t - 90)]) : 99 < t && t < 108 && (n = yr(e, r.colors[8 + (t - 100)])),
    n;
  }
  i(Td, "handleDisplay");
  function Aa(e) {
    var t = e.slice(0);
    return e.length = 0, t.reverse().map(function(r) {
      return "</" + r + ">";
    }).join("");
  }
  i(Aa, "resetStyles");
  function ur(e, t) {
    for (var r = [], o = e; o <= t; o++)
      r.push(o);
    return r;
  }
  i(ur, "range");
  function wd(e) {
    return function(t) {
      return (e === null || t.category !== e) && e !== "all";
    };
  }
  i(wd, "notCategory");
  function Ta(e) {
    e = parseInt(e, 10);
    var t = null;
    return e === 0 ? t = "all" : e === 1 ? t = "bold" : 2 < e && e < 5 ? t = "underline" : 4 < e && e < 7 ? t = "blink" : e === 8 ? t = "hid\
e" : e === 9 ? t = "strike" : 29 < e && e < 38 || e === 39 || 89 < e && e < 98 ? t = "foreground-color" : (39 < e && e < 48 || e === 49 || 99 <
    e && e < 108) && (t = "background-color"), t;
  }
  i(Ta, "categoryForCode");
  function Rd(e, t) {
    return t.escapeXML ? hd.encodeXML(e) : e;
  }
  i(Rd, "pushText");
  function Ee(e, t, r) {
    return r || (r = ""), e.push(t), "<".concat(t).concat(r ? ' style="'.concat(r, '"') : "", ">");
  }
  i(Ee, "pushTag");
  function fr(e, t) {
    return Ee(e, "span", t);
  }
  i(fr, "pushStyle");
  function mr(e, t) {
    return Ee(e, "span", "color:" + t);
  }
  i(mr, "pushForegroundColor");
  function yr(e, t) {
    return Ee(e, "span", "background-color:" + t);
  }
  i(yr, "pushBackgroundColor");
  function wa(e, t) {
    var r;
    if (e.slice(-1)[0] === t && (r = e.pop()), r)
      return "</" + t + ">";
  }
  i(wa, "closeTag");
  function Ed(e, t, r) {
    var o = !1, n = 3;
    function s() {
      return "";
    }
    i(s, "remove");
    function a(C, v) {
      return r("xterm256Foreground", v), "";
    }
    i(a, "removeXterm256Foreground");
    function l(C, v) {
      return r("xterm256Background", v), "";
    }
    i(l, "removeXterm256Background");
    function c(C) {
      return t.newline ? r("display", -1) : r("text", C), "";
    }
    i(c, "newline");
    function d(C, v) {
      o = !0, v.trim().length === 0 && (v = "0"), v = v.trimRight(";").split(";");
      var f = Ra(v), h;
      try {
        for (f.s(); !(h = f.n()).done; ) {
          var g = h.value;
          r("display", g);
        }
      } catch (E) {
        f.e(E);
      } finally {
        f.f();
      }
      return "";
    }
    i(d, "ansiMess");
    function p(C) {
      return r("text", C), "";
    }
    i(p, "realText");
    function u(C) {
      return r("rgb", C), "";
    }
    i(u, "rgb");
    var y = [{
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
    function b(C, v) {
      v > n && o || (o = !1, e = e.replace(C.pattern, C.sub));
    }
    i(b, "process");
    var w = [], R = e, x = R.length;
    e: for (; x > 0; ) {
      for (var A = 0, P = 0, m = y.length; P < m; A = ++P) {
        var S = y[A];
        if (b(S, A), e.length !== x) {
          x = e.length;
          continue e;
        }
      }
      if (e.length === x)
        break;
      w.push(0), x = e.length;
    }
    return w;
  }
  i(Ed, "tokenize");
  function Ad(e, t, r) {
    return t !== "text" && (e = e.filter(wd(Ta(r))), e.push({
      token: t,
      data: r,
      category: Ta(r)
    })), e;
  }
  i(Ad, "updateStickyStack");
  var vd = /* @__PURE__ */ function() {
    function e(t) {
      fd(this, e), t = t || {}, t.colors && (t.colors = Object.assign({}, Sa.colors, t.colors)), this.options = Object.assign({}, Sa, t), this.
      stack = [], this.stickyStack = [];
    }
    return i(e, "Filter"), md(e, [{
      key: "toHtml",
      value: /* @__PURE__ */ i(function(r) {
        var o = this;
        r = typeof r == "string" ? [r] : r;
        var n = this.stack, s = this.options, a = [];
        return this.stickyStack.forEach(function(l) {
          var c = xa(n, l.token, l.data, s);
          c && a.push(c);
        }), Ed(r.join(""), s, function(l, c) {
          var d = xa(n, l, c, s);
          d && a.push(d), s.stream && (o.stickyStack = Ad(o.stickyStack, l, c));
        }), n.length && a.push(Aa(n)), a.join("");
      }, "toHtml")
    }]), e;
  }();
  va.exports = vd;
});

// src/preview-api/index.ts
var Id = {};
gr(Id, {
  DocsContext: () => fe,
  HooksContext: () => ye,
  Preview: () => Le,
  PreviewWeb: () => At,
  PreviewWithSelection: () => _e,
  ReporterAPI: () => Se,
  StoryStore: () => Me,
  UrlStore: () => qe,
  WebView: () => $e,
  addons: () => Y,
  applyHooks: () => Ft,
  combineArgs: () => Xe,
  combineParameters: () => K,
  composeConfigs: () => ue,
  composeStepRunners: () => Jt,
  composeStories: () => ms,
  composeStory: () => uo,
  createPlaywrightTest: () => ys,
  decorateStory: () => ao,
  defaultDecorateStory: () => Wt,
  definePreview: () => jo,
  emitTransformCode: () => Mo,
  filterArgTypes: () => yt,
  getCoreAnnotations: () => Ye,
  getCsfFactoryAnnotations: () => er,
  inferControls: () => Qe,
  makeDecorator: () => Xo,
  mockChannel: () => Ct,
  normalizeProjectAnnotations: () => Ie,
  normalizeStory: () => Fe,
  pauseAnimations: () => Oe,
  prepareMeta: () => Kt,
  prepareStory: () => Ze,
  sanitizeStoryContextUpdate: () => lo,
  setDefaultProjectAnnotations: () => us,
  setProjectAnnotations: () => fs,
  simulateDOMContentLoaded: () => vt,
  simulatePageLoad: () => ko,
  sortStoriesV7: () => Es,
  useArgs: () => Yo,
  useCallback: () => ze,
  useChannel: () => Vo,
  useEffect: () => Rr,
  useGlobals: () => Ko,
  useMemo: () => Ho,
  useParameter: () => Wo,
  useReducer: () => Uo,
  useRef: () => Bo,
  useState: () => zo,
  useStoryContext: () => rt,
  userOrAutoTitle: () => xs,
  userOrAutoTitleFromSpecifier: () => mo,
  waitForAnimations: () => ke
});
module.exports = Wa(Id);

// src/preview-api/modules/addons/main.ts
var Pt = require("@storybook/global");

// src/preview-api/modules/addons/storybook-channel-mock.ts
var _o = require("storybook/internal/channels");
function Ct() {
  let e = {
    setHandler: /* @__PURE__ */ i(() => {
    }, "setHandler"),
    send: /* @__PURE__ */ i(() => {
    }, "send")
  };
  return new _o.Channel({ transport: e });
}
i(Ct, "mockChannel");

// src/preview-api/modules/addons/main.ts
var Sr = class {
  constructor() {
    this.getChannel = /* @__PURE__ */ i(() => {
      if (!this.channel) {
        let t = Ct();
        return this.setChannel(t), t;
      }
      return this.channel;
    }, "getChannel");
    this.ready = /* @__PURE__ */ i(() => this.promise, "ready");
    this.hasChannel = /* @__PURE__ */ i(() => !!this.channel, "hasChannel");
    this.setChannel = /* @__PURE__ */ i((t) => {
      this.channel = t, this.resolve();
    }, "setChannel");
    this.promise = new Promise((t) => {
      this.resolve = () => t(this.getChannel());
    });
  }
  static {
    i(this, "AddonStore");
  }
}, br = "__STORYBOOK_ADDONS_PREVIEW";
function Ya() {
  return Pt.global[br] || (Pt.global[br] = new Sr()), Pt.global[br];
}
i(Ya, "getAddonsStore");
var Y = Ya();

// src/preview-api/modules/addons/definePreview.ts
function jo(e) {
  return e;
}
i(jo, "definePreview");

// src/preview-api/modules/addons/hooks.ts
var Ge = require("storybook/internal/client-logger"), Q = require("storybook/internal/core-events"), tt = require("@storybook/global");
var ye = class {
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
    this.renderListener = /* @__PURE__ */ i((t) => {
      t === this.currentContext?.id && (this.triggerEffects(), this.currentContext = null, this.removeRenderListeners());
    }, "renderListener");
    this.init();
  }
  static {
    i(this, "HooksContext");
  }
  init() {
    this.hookListsMap = /* @__PURE__ */ new WeakMap(), this.mountedDecorators = /* @__PURE__ */ new Set(), this.prevMountedDecorators = /* @__PURE__ */ new Set(),
    this.currentHooks = [], this.nextHookIndex = 0, this.currentPhase = "NONE", this.currentEffects = [], this.prevEffects = [], this.currentDecoratorName =
    null, this.hasUpdates = !1, this.currentContext = null;
  }
  clean() {
    this.prevEffects.forEach((t) => {
      t.destroy && t.destroy();
    }), this.init(), this.removeRenderListeners();
  }
  getNextHook() {
    let t = this.currentHooks[this.nextHookIndex];
    return this.nextHookIndex += 1, t;
  }
  triggerEffects() {
    this.prevEffects.forEach((t) => {
      !this.currentEffects.includes(t) && t.destroy && t.destroy();
    }), this.currentEffects.forEach((t) => {
      this.prevEffects.includes(t) || (t.destroy = t.create());
    }), this.prevEffects = this.currentEffects, this.currentEffects = [];
  }
  addRenderListeners() {
    this.removeRenderListeners(), Y.getChannel().on(Q.STORY_RENDERED, this.renderListener);
  }
  removeRenderListeners() {
    Y.getChannel().removeListener(Q.STORY_RENDERED, this.renderListener);
  }
};
function No(e) {
  let t = /* @__PURE__ */ i((...r) => {
    let { hooks: o } = typeof r[0] == "function" ? r[1] : r[0], n = o.currentPhase, s = o.currentHooks, a = o.nextHookIndex, l = o.currentDecoratorName;
    o.currentDecoratorName = e.name, o.prevMountedDecorators.has(e) ? (o.currentPhase = "UPDATE", o.currentHooks = o.hookListsMap.get(e) || []) :
    (o.currentPhase = "MOUNT", o.currentHooks = [], o.hookListsMap.set(e, o.currentHooks), o.prevMountedDecorators.add(e)), o.nextHookIndex =
    0;
    let c = tt.global.STORYBOOK_HOOKS_CONTEXT;
    tt.global.STORYBOOK_HOOKS_CONTEXT = o;
    let d = e(...r);
    if (tt.global.STORYBOOK_HOOKS_CONTEXT = c, o.currentPhase === "UPDATE" && o.getNextHook() != null)
      throw new Error(
        "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
      );
    return o.currentPhase = n, o.currentHooks = s, o.nextHookIndex = a, o.currentDecoratorName = l, d;
  }, "hookified");
  return t.originalFn = e, t;
}
i(No, "hookify");
var xr = 0, Ka = 25, Ft = /* @__PURE__ */ i((e) => (t, r) => {
  let o = e(
    No(t),
    r.map((n) => No(n))
  );
  return (n) => {
    let { hooks: s } = n;
    s.prevMountedDecorators ??= /* @__PURE__ */ new Set(), s.mountedDecorators = /* @__PURE__ */ new Set([t, ...r]), s.currentContext = n, s.
    hasUpdates = !1;
    let a = o(n);
    for (xr = 1; s.hasUpdates; )
      if (s.hasUpdates = !1, s.currentEffects = [], a = o(n), xr += 1, xr > Ka)
        throw new Error(
          "Too many re-renders. Storybook limits the number of renders to prevent an infinite loop."
        );
    return s.addRenderListeners(), a;
  };
}, "applyHooks"), Xa = /* @__PURE__ */ i((e, t) => e.length === t.length && e.every((r, o) => r === t[o]), "areDepsEqual"), Tr = /* @__PURE__ */ i(
() => new Error("Storybook preview hooks can only be called inside decorators and story functions."), "invalidHooksError");
function qo() {
  return tt.global.STORYBOOK_HOOKS_CONTEXT || null;
}
i(qo, "getHooksContextOrNull");
function wr() {
  let e = qo();
  if (e == null)
    throw Tr();
  return e;
}
i(wr, "getHooksContextOrThrow");
function Ja(e, t, r) {
  let o = wr();
  if (o.currentPhase === "MOUNT") {
    r != null && !Array.isArray(r) && Ge.logger.warn(
      `${e} received a final argument that is not an array (instead, received ${r}). When specified, the final argument must be an array.`
    );
    let n = { name: e, deps: r };
    return o.currentHooks.push(n), t(n), n;
  }
  if (o.currentPhase === "UPDATE") {
    let n = o.getNextHook();
    if (n == null)
      throw new Error("Rendered more hooks than during the previous render.");
    return n.name !== e && Ge.logger.warn(
      `Storybook has detected a change in the order of Hooks${o.currentDecoratorName ? ` called by ${o.currentDecoratorName}` : ""}. This wi\
ll lead to bugs and errors if not fixed.`
    ), r != null && n.deps == null && Ge.logger.warn(
      `${e} received a final argument during this render, but not during the previous render. Even though the final argument is optional, it\
s type cannot change between renders.`
    ), r != null && n.deps != null && r.length !== n.deps.length && Ge.logger.warn(`The final argument passed to ${e} changed size between r\
enders. The order and size of this array must remain constant.
Previous: ${n.deps}
Incoming: ${r}`), (r == null || n.deps == null || !Xa(r, n.deps)) && (t(n), n.deps = r), n;
  }
  throw Tr();
}
i(Ja, "useHook");
function It(e, t, r) {
  let { memoizedState: o } = Ja(
    e,
    (n) => {
      n.memoizedState = t();
    },
    r
  );
  return o;
}
i(It, "useMemoLike");
function Ho(e, t) {
  return It("useMemo", e, t);
}
i(Ho, "useMemo");
function ze(e, t) {
  return It("useCallback", () => e, t);
}
i(ze, "useCallback");
function $o(e, t) {
  return It(e, () => ({ current: t }), []);
}
i($o, "useRefLike");
function Bo(e) {
  return $o("useRef", e);
}
i(Bo, "useRef");
function Za() {
  let e = qo();
  if (e != null && e.currentPhase !== "NONE")
    e.hasUpdates = !0;
  else
    try {
      Y.getChannel().emit(Q.FORCE_RE_RENDER);
    } catch {
      Ge.logger.warn("State updates of Storybook preview hooks work only in browser");
    }
}
i(Za, "triggerUpdate");
function Go(e, t) {
  let r = $o(
    e,
    // @ts-expect-error S type should never be function, but there's no way to tell that to TypeScript
    typeof t == "function" ? t() : t
  ), o = /* @__PURE__ */ i((n) => {
    r.current = typeof n == "function" ? n(r.current) : n, Za();
  }, "setState");
  return [r.current, o];
}
i(Go, "useStateLike");
function zo(e) {
  return Go("useState", e);
}
i(zo, "useState");
function Uo(e, t, r) {
  let o = r != null ? () => r(t) : t, [n, s] = Go("useReducer", o);
  return [n, /* @__PURE__ */ i((l) => s((c) => e(c, l)), "dispatch")];
}
i(Uo, "useReducer");
function Rr(e, t) {
  let r = wr(), o = It("useEffect", () => ({ create: e }), t);
  r.currentEffects.includes(o) || r.currentEffects.push(o);
}
i(Rr, "useEffect");
function Vo(e, t = []) {
  let r = Y.getChannel();
  return Rr(() => (Object.entries(e).forEach(([o, n]) => r.on(o, n)), () => {
    Object.entries(e).forEach(
      ([o, n]) => r.removeListener(o, n)
    );
  }), [...Object.keys(e), ...t]), ze(r.emit.bind(r), [r]);
}
i(Vo, "useChannel");
function rt() {
  let { currentContext: e } = wr();
  if (e == null)
    throw Tr();
  return e;
}
i(rt, "useStoryContext");
function Wo(e, t) {
  let { parameters: r } = rt();
  if (e)
    return r[e] ?? t;
}
i(Wo, "useParameter");
function Yo() {
  let e = Y.getChannel(), { id: t, args: r } = rt(), o = ze(
    (s) => e.emit(Q.UPDATE_STORY_ARGS, { storyId: t, updatedArgs: s }),
    [e, t]
  ), n = ze(
    (s) => e.emit(Q.RESET_STORY_ARGS, { storyId: t, argNames: s }),
    [e, t]
  );
  return [r, o, n];
}
i(Yo, "useArgs");
function Ko() {
  let e = Y.getChannel(), { globals: t } = rt(), r = ze(
    (o) => e.emit(Q.UPDATE_GLOBALS, { globals: o }),
    [e]
  );
  return [t, r];
}
i(Ko, "useGlobals");

// src/preview-api/modules/addons/make-decorator.ts
var Xo = /* @__PURE__ */ i(({
  name: e,
  parameterName: t,
  wrapper: r,
  skipIfNoParametersOrOptions: o = !1
}) => {
  let n = /* @__PURE__ */ i((s) => (a, l) => {
    let c = l.parameters && l.parameters[t];
    return c && c.disable || o && !s && !c ? a(l) : r(a, l, {
      options: s,
      parameters: c
    });
  }, "decorator");
  return (...s) => typeof s[0] == "function" ? n()(...s) : (...a) => {
    if (a.length > 1)
      return s.length > 1 ? n(s)(...a) : n(...s)(...a);
    throw new Error(
      `Passing stories directly into ${e}() is not allowed,
        instead use addDecorator(${e}) and pass options with the '${t}' parameter`
    );
  };
}, "makeDecorator");

// src/preview-api/modules/store/StoryStore.ts
var rr = require("storybook/internal/preview-errors");

// ../node_modules/es-toolkit/dist/function/noop.mjs
function Jo() {
}
i(Jo, "noop");

// ../node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function Er(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
i(Er, "getSymbols");

// ../node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function Ar(e) {
  return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
i(Ar, "getTag");

// ../node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var Zo = "[object RegExp]", Qo = "[object String]", en = "[object Number]", tn = "[object Boolean]", vr = "[object Arguments]", rn = "[objec\
t Symbol]", on = "[object Date]", nn = "[object Map]", sn = "[object Set]", an = "[object Array]", ln = "[object Function]", cn = "[object A\
rrayBuffer]", Ot = "[object Object]", dn = "[object Error]", pn = "[object DataView]", un = "[object Uint8Array]", fn = "[object Uint8Clampe\
dArray]", mn = "[object Uint16Array]", yn = "[object Uint32Array]", hn = "[object BigUint64Array]", gn = "[object Int8Array]", bn = "[object\
 Int16Array]", Sn = "[object Int32Array]", xn = "[object BigInt64Array]", Tn = "[object Float32Array]", wn = "[object Float64Array]";

// ../node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
function z(e) {
  if (!e || typeof e != "object")
    return !1;
  let t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype || Object.getPrototypeOf(t) === null ? Object.prototype.toString.call(e) === "[object Object]" :
  !1;
}
i(z, "isPlainObject");

// ../node_modules/es-toolkit/dist/object/mapValues.mjs
function de(e, t) {
  let r = {}, o = Object.keys(e);
  for (let n = 0; n < o.length; n++) {
    let s = o[n], a = e[s];
    r[s] = t(a, s, e);
  }
  return r;
}
i(de, "mapValues");

// ../node_modules/es-toolkit/dist/object/pickBy.mjs
function Cr(e, t) {
  let r = {}, o = Object.keys(e);
  for (let n = 0; n < o.length; n++) {
    let s = o[n], a = e[s];
    t(a, s) && (r[s] = a);
  }
  return r;
}
i(Cr, "pickBy");

// ../node_modules/es-toolkit/dist/compat/util/eq.mjs
function Rn(e, t) {
  return e === t || Number.isNaN(e) && Number.isNaN(t);
}
i(Rn, "eq");

// ../node_modules/es-toolkit/dist/predicate/isEqualWith.mjs
function En(e, t, r) {
  return ot(e, t, void 0, void 0, void 0, void 0, r);
}
i(En, "isEqualWith");
function ot(e, t, r, o, n, s, a) {
  let l = a(e, t, r, o, n, s);
  if (l !== void 0)
    return l;
  if (typeof e == typeof t)
    switch (typeof e) {
      case "bigint":
      case "string":
      case "boolean":
      case "symbol":
      case "undefined":
        return e === t;
      case "number":
        return e === t || Object.is(e, t);
      case "function":
        return e === t;
      case "object":
        return nt(e, t, s, a);
    }
  return nt(e, t, s, a);
}
i(ot, "isEqualWithImpl");
function nt(e, t, r, o) {
  if (Object.is(e, t))
    return !0;
  let n = Ar(e), s = Ar(t);
  if (n === vr && (n = Ot), s === vr && (s = Ot), n !== s)
    return !1;
  switch (n) {
    case Qo:
      return e.toString() === t.toString();
    case en: {
      let c = e.valueOf(), d = t.valueOf();
      return Rn(c, d);
    }
    case tn:
    case on:
    case rn:
      return Object.is(e.valueOf(), t.valueOf());
    case Zo:
      return e.source === t.source && e.flags === t.flags;
    case ln:
      return e === t;
  }
  r = r ?? /* @__PURE__ */ new Map();
  let a = r.get(e), l = r.get(t);
  if (a != null && l != null)
    return a === t;
  r.set(e, t), r.set(t, e);
  try {
    switch (n) {
      case nn: {
        if (e.size !== t.size)
          return !1;
        for (let [c, d] of e.entries())
          if (!t.has(c) || !ot(d, t.get(c), c, e, t, r, o))
            return !1;
        return !0;
      }
      case sn: {
        if (e.size !== t.size)
          return !1;
        let c = Array.from(e.values()), d = Array.from(t.values());
        for (let p = 0; p < c.length; p++) {
          let u = c[p], y = d.findIndex((b) => ot(u, b, void 0, e, t, r, o));
          if (y === -1)
            return !1;
          d.splice(y, 1);
        }
        return !0;
      }
      case an:
      case un:
      case fn:
      case mn:
      case yn:
      case hn:
      case gn:
      case bn:
      case Sn:
      case xn:
      case Tn:
      case wn: {
        if (typeof Buffer < "u" && Buffer.isBuffer(e) !== Buffer.isBuffer(t) || e.length !== t.length)
          return !1;
        for (let c = 0; c < e.length; c++)
          if (!ot(e[c], t[c], c, e, t, r, o))
            return !1;
        return !0;
      }
      case cn:
        return e.byteLength !== t.byteLength ? !1 : nt(new Uint8Array(e), new Uint8Array(t), r, o);
      case pn:
        return e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset ? !1 : nt(new Uint8Array(e), new Uint8Array(t), r, o);
      case dn:
        return e.name === t.name && e.message === t.message;
      case Ot: {
        if (!(nt(e.constructor, t.constructor, r, o) || z(e) && z(t)))
          return !1;
        let d = [...Object.keys(e), ...Er(e)], p = [...Object.keys(t), ...Er(t)];
        if (d.length !== p.length)
          return !1;
        for (let u = 0; u < d.length; u++) {
          let y = d[u], b = e[y];
          if (!Object.hasOwn(t, y))
            return !1;
          let w = t[y];
          if (!ot(b, w, y, e, t, r, o))
            return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    r.delete(e), r.delete(t);
  }
}
i(nt, "areObjectsEqual");

// ../node_modules/es-toolkit/dist/predicate/isEqual.mjs
function Pr(e, t) {
  return En(e, t, Jo);
}
i(Pr, "isEqual");

// src/preview-api/modules/store/StoryStore.ts
var tr = $(Fr(), 1);

// src/actions/preview.ts
var $n = require("storybook/preview-api");

// src/actions/addArgs.ts
var kr = {};
gr(kr, {
  argsEnhancers: () => nl
});

// src/actions/runtime/action.ts
var Mn = require("storybook/internal/preview-errors"), Or = require("@storybook/global"), Dn = require("storybook/preview-api");

// src/actions/constants.ts
var Ir = "storybook/actions", vp = `${Ir}/panel`, On = `${Ir}/action-event`, Cp = `${Ir}/action-clear`;

// src/actions/runtime/configureActions.ts
var kn = {
  depth: 10,
  clearOnStoryChange: !0,
  limit: 50
};

// src/actions/runtime/action.ts
var Ln = /* @__PURE__ */ i((e, t) => {
  let r = Object.getPrototypeOf(e);
  return !r || t(r) ? r : Ln(r, t);
}, "findProto"), rl = /* @__PURE__ */ i((e) => !!(typeof e == "object" && e && Ln(e, (t) => /^Synthetic(?:Base)?Event$/.test(t.constructor.name)) &&
typeof e.persist == "function"), "isReactSyntheticEvent"), ol = /* @__PURE__ */ i((e) => {
  if (rl(e)) {
    let t = Object.create(
      e.constructor.prototype,
      Object.getOwnPropertyDescriptors(e)
    );
    t.persist();
    let r = Object.getOwnPropertyDescriptor(t, "view"), o = r?.value;
    return typeof o == "object" && o?.constructor.name === "Window" && Object.defineProperty(t, "view", {
      ...r,
      value: Object.create(o.constructor.prototype)
    }), t;
  }
  return e;
}, "serializeArg");
function it(e, t = {}) {
  let r = {
    ...kn,
    ...t
  }, o = /* @__PURE__ */ i(function(...s) {
    if (t.implicit) {
      let b = ("__STORYBOOK_PREVIEW__" in Or.global ? Or.global.__STORYBOOK_PREVIEW__ : void 0)?.storyRenders.find(
        (w) => w.phase === "playing" || w.phase === "rendering"
      );
      if (b) {
        let w = !globalThis?.FEATURES?.disallowImplicitActionsInRenderV8, R = new Mn.ImplicitActionsDuringRendering({
          phase: b.phase,
          name: e,
          deprecated: w
        });
        if (w)
          console.warn(R);
        else
          throw R;
      }
    }
    let a = Dn.addons.getChannel(), l = Date.now().toString(36) + Math.random().toString(36).substring(2), c = 5, d = s.map(ol), p = s.length >
    1 ? d : d[0], u = {
      id: l,
      count: 0,
      data: { name: e, args: p },
      options: {
        ...r,
        maxDepth: c + (r.depth || 3)
      }
    };
    a.emit(On, u);
  }, "actionHandler");
  return o.isAction = !0, o.implicit = t.implicit, o;
}
i(it, "action");

// src/actions/addArgsHelpers.ts
var _n = /* @__PURE__ */ i((e, t) => typeof t[e] > "u" && !(e in t), "isInInitialArgs"), jn = /* @__PURE__ */ i((e) => {
  let {
    initialArgs: t,
    argTypes: r,
    id: o,
    parameters: { actions: n }
  } = e;
  if (!n || n.disable || !n.argTypesRegex || !r)
    return {};
  let s = new RegExp(n.argTypesRegex);
  return Object.entries(r).filter(
    ([l]) => !!s.test(l)
  ).reduce((l, [c, d]) => (_n(c, t) && (l[c] = it(c, { implicit: !0, id: o })), l), {});
}, "inferActionsFromArgTypesRegex"), Nn = /* @__PURE__ */ i((e) => {
  let {
    initialArgs: t,
    argTypes: r,
    parameters: { actions: o }
  } = e;
  return o?.disable || !r ? {} : Object.entries(r).filter(([s, a]) => !!a.action).reduce((s, [a, l]) => (_n(a, t) && (s[a] = it(typeof l.action ==
  "string" ? l.action : a)), s), {});
}, "addActionsFromArgTypes");

// src/actions/addArgs.ts
var nl = [
  Nn,
  jn
];

// src/actions/loaders.ts
var Mr = {};
gr(Mr, {
  loaders: () => sl
});
var Hn = require("storybook/test");
var qn = !1, il = /* @__PURE__ */ i((e) => {
  let { parameters: t } = e;
  t?.actions?.disable || qn || ((0, Hn.onMockCall)((r, o) => {
    let n = r.getMockName();
    n !== "spy" && (!/^next\/.*::/.test(n) || [
      "next/router::useRouter()",
      "next/navigation::useRouter()",
      "next/navigation::redirect",
      "next/cache::",
      "next/headers::cookies().set",
      "next/headers::cookies().delete",
      "next/headers::headers().set",
      "next/headers::headers().delete"
    ].some((s) => n.startsWith(s))) && it(n)(o);
  }), qn = !0);
}, "logActionsWhenMockCalled"), sl = [il];

// src/actions/preview.ts
var Dr = /* @__PURE__ */ i(() => (0, $n.definePreview)({
  ...kr,
  ...Mr
}), "default");

// src/backgrounds/preview.ts
var Kn = require("storybook/preview-api");

// src/backgrounds/constants.ts
var al = "storybook/background", Ue = "backgrounds";
var Gp = {
  UPDATE: `${al}/update`
};

// src/backgrounds/decorator.ts
var _r = require("storybook/preview-api");

// src/backgrounds/defaults.ts
var Bn = {
  light: { name: "light", value: "#F8F8F8" },
  dark: { name: "dark", value: "#333" }
};

// src/backgrounds/utils.ts
var { document: ee } = globalThis, Gn = /* @__PURE__ */ i(() => globalThis?.matchMedia ? !!globalThis.matchMedia("(prefers-reduced-motion: r\
educe)")?.matches : !1, "isReduceMotionEnabled"), Lr = /* @__PURE__ */ i((e) => {
  (Array.isArray(e) ? e : [e]).forEach(ll);
}, "clearStyles"), ll = /* @__PURE__ */ i((e) => {
  if (!ee)
    return;
  let t = ee.getElementById(e);
  t && t.parentElement && t.parentElement.removeChild(t);
}, "clearStyle"), zn = /* @__PURE__ */ i((e, t) => {
  if (!ee)
    return;
  let r = ee.getElementById(e);
  if (r)
    r.innerHTML !== t && (r.innerHTML = t);
  else {
    let o = ee.createElement("style");
    o.setAttribute("id", e), o.innerHTML = t, ee.head.appendChild(o);
  }
}, "addGridStyle"), Un = /* @__PURE__ */ i((e, t, r) => {
  if (!ee)
    return;
  let o = ee.getElementById(e);
  if (o)
    o.innerHTML !== t && (o.innerHTML = t);
  else {
    let n = ee.createElement("style");
    n.setAttribute("id", e), n.innerHTML = t;
    let s = `addon-backgrounds-grid${r ? `-docs-${r}` : ""}`, a = ee.getElementById(s);
    a ? a.parentElement?.insertBefore(n, a) : ee.head.appendChild(n);
  }
}, "addBackgroundStyle");

// src/backgrounds/decorator.ts
var cl = {
  cellSize: 100,
  cellAmount: 10,
  opacity: 0.8
}, Vn = "addon-backgrounds", Wn = "addon-backgrounds-grid", dl = Gn() ? "" : "transition: background-color 0.3s;", Yn = /* @__PURE__ */ i((e, t) => {
  let { globals: r = {}, parameters: o = {}, viewMode: n, id: s } = t, {
    options: a = Bn,
    disable: l,
    grid: c = cl
  } = o[Ue] || {}, d = r[Ue] || {}, p = typeof d == "string" ? d : d?.value, u = p ? a[p] : void 0, y = typeof u == "string" ? u : u?.value ||
  "transparent", b = typeof d == "string" ? !1 : d.grid || !1, w = !!u && !l, R = n === "docs" ? `#anchor--${s} .docs-story` : ".sb-show-mai\
n", x = n === "docs" ? `#anchor--${s} .docs-story` : ".sb-show-main", A = o.layout === void 0 || o.layout === "padded", P = n === "docs" ? 20 :
  A ? 16 : 0, { cellAmount: m, cellSize: S, opacity: C, offsetX: v = P, offsetY: f = P } = c, h = n === "docs" ? `${Vn}-docs-${s}` : `${Vn}-\
color`, g = n === "docs" ? s : null;
  (0, _r.useEffect)(() => {
    let T = `
    ${R} {
      background: ${y} !important;
      ${dl}
      }`;
    if (!w) {
      Lr(h);
      return;
    }
    Un(h, T, g);
  }, [R, h, g, w, y]);
  let E = n === "docs" ? `${Wn}-docs-${s}` : `${Wn}`;
  return (0, _r.useEffect)(() => {
    if (!b) {
      Lr(E);
      return;
    }
    let T = [
      `${S * m}px ${S * m}px`,
      `${S * m}px ${S * m}px`,
      `${S}px ${S}px`,
      `${S}px ${S}px`
    ].join(", "), I = `
        ${x} {
          background-size: ${T} !important;
          background-position: ${v}px ${f}px, ${v}px ${f}px, ${v}px ${f}px, ${v}px ${f}px !important;
          background-blend-mode: difference !important;
          background-image: linear-gradient(rgba(130, 130, 130, ${C}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${C}) 1px, transparent 1px),
           linear-gradient(rgba(130, 130, 130, ${C / 2}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${C / 2}) 1px, transparent 1px) !important;
        }
      `;
    zn(E, I);
  }, [m, S, x, E, b, v, f, C]), e();
}, "withBackgroundAndGrid");

// src/backgrounds/preview.ts
var pl = globalThis.FEATURES?.backgrounds ? [Yn] : [], ul = {
  [Ue]: {
    grid: {
      cellSize: 20,
      opacity: 0.5,
      cellAmount: 5
    },
    disable: !1
  }
}, fl = {
  [Ue]: { value: void 0, grid: !1 }
}, jr = /* @__PURE__ */ i(() => (0, Kn.definePreview)({
  decorators: pl,
  parameters: ul,
  initialGlobals: fl
}), "default");

// src/component-testing/preview.ts
var Xn = require("storybook/internal/instrumenter"), Jn = require("storybook/preview-api");
var { step: ml } = (0, Xn.instrument)(
  {
    // It seems like the label is unused, but the instrumenter has access to it
    // The context will be bounded later in StoryRender, so that the user can write just:
    // await step("label", (context) => {
    //   // labeled step
    // });
    step: /* @__PURE__ */ i(async (e, t, r) => t(r), "step")
  },
  { intercept: !0 }
), Nr = /* @__PURE__ */ i(() => (0, Jn.definePreview)({
  parameters: {
    throwPlayFunctionExceptions: !1
  },
  runStep: ml
}), "default");

// src/highlight/preview.ts
var lt = require("storybook/preview-api");

// src/highlight/useHighlights.ts
var li = require("storybook/internal/core-events");

// src/highlight/constants.ts
var kt = "storybook/highlight", Zn = `${kt}/add`, Qn = `${kt}/remove`, ei = `${kt}/reset`, ti = `${kt}/scroll-into-view`, qr = 2147483647, ne = 28;

// src/highlight/icons.ts
var Hr = {
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
var yl = "svg,path,rect,circle,line,polyline,polygon,ellipse,text".split(","), q = /* @__PURE__ */ i((e, t = {}, r) => {
  let o = yl.includes(e) ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);
  return Object.entries(t).forEach(([n, s]) => {
    /[A-Z]/.test(n) ? (n === "onClick" && (o.addEventListener("click", s), o.addEventListener("keydown", (a) => {
      (a.key === "Enter" || a.key === " ") && (a.preventDefault(), s());
    })), n === "onMouseEnter" && o.addEventListener("mouseenter", s), n === "onMouseLeave" && o.addEventListener("mouseleave", s)) : o.setAttribute(
    n, s);
  }), r?.forEach((n) => {
    if (!(n == null || n === !1))
      try {
        o.appendChild(n);
      } catch {
        o.appendChild(document.createTextNode(String(n)));
      }
  }), o;
}, "createElement"), at = /* @__PURE__ */ i((e) => Hr[e] && q(
  "svg",
  { width: "14", height: "14", viewBox: "0 0 14 14", xmlns: "http://www.w3.org/2000/svg" },
  Hr[e].map(
    (t) => q("path", {
      fill: "currentColor",
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: t
    })
  )
), "createIcon"), ri = /* @__PURE__ */ i((e) => {
  if ("elements" in e) {
    let { elements: o, color: n, style: s } = e;
    return {
      id: void 0,
      priority: 0,
      selectors: o,
      styles: {
        outline: `2px ${s} ${n}`,
        outlineOffset: "2px",
        boxShadow: "0 0 0 6px rgba(255,255,255,0.6)"
      },
      menu: void 0
    };
  }
  let { menu: t, ...r } = e;
  return {
    id: void 0,
    priority: 0,
    styles: {
      outline: "2px dashed #029cfd"
    },
    ...r,
    menu: Array.isArray(t) ? t.every(Array.isArray) ? t : [t] : void 0
  };
}, "normalizeOptions"), hl = /* @__PURE__ */ i((e) => e instanceof Function, "isFunction"), st = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Map(),
Mt = /* @__PURE__ */ new Map(), ie = /* @__PURE__ */ i((e) => {
  let t = Symbol();
  return ve.set(t, []), st.set(t, e), { get: /* @__PURE__ */ i(() => st.get(t), "get"), set: /* @__PURE__ */ i((a) => {
    let l = st.get(t), c = hl(a) ? a(l) : a;
    c !== l && (st.set(t, c), ve.get(t)?.forEach((d) => {
      Mt.get(d)?.(), Mt.set(d, d(c));
    }));
  }, "set"), subscribe: /* @__PURE__ */ i((a) => (ve.get(t)?.push(a), () => {
    let l = ve.get(t);
    l && ve.set(
      t,
      l.filter((c) => c !== a)
    );
  }), "subscribe"), teardown: /* @__PURE__ */ i(() => {
    ve.get(t)?.forEach((a) => {
      Mt.get(a)?.(), Mt.delete(a);
    }), ve.delete(t), st.delete(t);
  }, "teardown") };
}, "useStore"), $r = /* @__PURE__ */ i((e) => {
  let t = document.getElementById("storybook-root"), r = /* @__PURE__ */ new Map();
  for (let o of e) {
    let { priority: n = 0 } = o;
    for (let s of o.selectors) {
      let a = [
        ...document.querySelectorAll(
          // Elements matching the selector, excluding storybook elements and their descendants.
          // Necessary to find portaled elements (e.g. children of `body`).
          `:is(${s}):not([id^="storybook-"], [id^="storybook-"] *, [class^="sb-"], [class^="sb-"] *)`
        ),
        // Elements matching the selector inside the storybook root, as these were excluded above.
        ...t?.querySelectorAll(s) || []
      ];
      for (let l of a) {
        let c = r.get(l);
        (!c || c.priority <= n) && r.set(l, {
          ...o,
          priority: n,
          selectors: Array.from(new Set((c?.selectors || []).concat(s)))
        });
      }
    }
  }
  return r;
}, "mapElements"), oi = /* @__PURE__ */ i((e) => Array.from(e.entries()).map(([t, { selectors: r, styles: o, hoverStyles: n, focusStyles: s,
menu: a }]) => {
  let { top: l, left: c, width: d, height: p } = t.getBoundingClientRect(), { position: u } = getComputedStyle(t);
  return {
    element: t,
    selectors: r,
    styles: o,
    hoverStyles: n,
    focusStyles: s,
    menu: a,
    top: u === "fixed" ? l : l + window.scrollY,
    left: u === "fixed" ? c : c + window.scrollX,
    width: d,
    height: p
  };
}).sort((t, r) => r.width * r.height - t.width * t.height), "mapBoxes"), Br = /* @__PURE__ */ i((e, t) => {
  let r = e.getBoundingClientRect(), { x: o, y: n } = t;
  return r?.top && r?.left && o >= r.left && o <= r.left + r.width && n >= r.top && n <= r.top + r.height;
}, "isOverMenu"), Gr = /* @__PURE__ */ i((e, t, r) => {
  if (!t || !r)
    return !1;
  let { left: o, top: n, width: s, height: a } = e;
  a < ne && (n = n - Math.round((ne - a) / 2), a = ne), s < ne && (o = o - Math.round((ne - s) / 2), s = ne), t.style.position === "fixed" &&
  (o += window.scrollX, n += window.scrollY);
  let { x: l, y: c } = r;
  return l >= o && l <= o + s && c >= n && c <= n + a;
}, "isTargeted"), ni = /* @__PURE__ */ i((e, t, r = {}) => {
  let { x: o, y: n } = t, { margin: s = 5, topOffset: a = 0, centered: l = !1 } = r, { scrollX: c, scrollY: d, innerHeight: p, innerWidth: u } = window,
  y = Math.min(
    e.style.position === "fixed" ? n - d : n,
    p - e.clientHeight - s - a + d
  ), b = l ? e.clientWidth / 2 : 0, w = e.style.position === "fixed" ? Math.max(Math.min(o - c, u - b - s), b + s) : Math.max(
    Math.min(o, u - b - s + c),
    b + s + c
  );
  Object.assign(e.style, {
    ...w !== o && { left: `${w}px` },
    ...y !== n && { top: `${y}px` }
  });
}, "keepInViewport"), zr = /* @__PURE__ */ i((e) => {
  window.HTMLElement.prototype.hasOwnProperty("showPopover") && e.showPopover();
}, "showPopover"), ii = /* @__PURE__ */ i((e) => {
  window.HTMLElement.prototype.hasOwnProperty("showPopover") && e.hidePopover();
}, "hidePopover"), si = /* @__PURE__ */ i((e) => ({
  top: e.top,
  left: e.left,
  width: e.width,
  height: e.height,
  selectors: e.selectors,
  element: {
    attributes: Object.fromEntries(
      Array.from(e.element.attributes).map((t) => [t.name, t.value])
    ),
    localName: e.element.localName,
    tagName: e.element.tagName,
    outerHTML: e.element.outerHTML
  }
}), "getEventDetails");

// src/highlight/useHighlights.ts
var _ = "storybook-highlights-menu", ai = "storybook-highlights-root", gl = "storybook-root", ci = /* @__PURE__ */ i((e) => {
  if (globalThis.__STORYBOOK_HIGHLIGHT_INITIALIZED)
    return;
  globalThis.__STORYBOOK_HIGHLIGHT_INITIALIZED = !0;
  let { document: t } = globalThis, r = ie([]), o = ie(/* @__PURE__ */ new Map()), n = ie([]), s = ie(), a = ie(), l = ie([]), c = ie([]), d = ie(),
  p = ie(), u = t.getElementById(ai);
  r.subscribe(() => {
    u || (u = q("div", { id: ai }), t.body.appendChild(u));
  }), r.subscribe((f) => {
    let h = t.getElementById(gl);
    if (!h)
      return;
    o.set($r(f));
    let g = new MutationObserver(() => o.set($r(f)));
    return g.observe(h, { subtree: !0, childList: !0 }), () => {
      g.disconnect();
    };
  }), o.subscribe((f) => {
    let h = /* @__PURE__ */ i(() => requestAnimationFrame(() => n.set(oi(f))), "updateBoxes"), g = new ResizeObserver(h);
    g.observe(t.body), Array.from(f.keys()).forEach((T) => g.observe(T));
    let E = Array.from(t.body.querySelectorAll("*")).filter((T) => {
      let { overflow: I, overflowX: F, overflowY: M } = window.getComputedStyle(T);
      return ["auto", "scroll"].some((U) => [I, F, M].includes(U));
    });
    return E.forEach((T) => T.addEventListener("scroll", h)), () => {
      g.disconnect(), E.forEach((T) => T.removeEventListener("scroll", h));
    };
  }), o.subscribe((f) => {
    let h = Array.from(f.keys()).filter(({ style: E }) => E.position === "sticky"), g = /* @__PURE__ */ i(() => requestAnimationFrame(() => {
      n.set(
        (E) => E.map((T) => {
          if (h.includes(T.element)) {
            let { top: I, left: F } = T.element.getBoundingClientRect();
            return { ...T, top: I + window.scrollY, left: F + window.scrollX };
          }
          return T;
        })
      );
    }), "updateBoxes");
    return t.addEventListener("scroll", g), () => t.removeEventListener("scroll", g);
  }), o.subscribe((f) => {
    l.set((h) => h.filter(({ element: g }) => f.has(g)));
  }), l.subscribe((f) => {
    f.length ? (p.set((h) => f.some((g) => g.element === h?.element) ? h : void 0), d.set((h) => f.some((g) => g.element === h?.element) ? h :
    void 0)) : (p.set(void 0), d.set(void 0), s.set(void 0));
  });
  let y = new Map(/* @__PURE__ */ new Map());
  r.subscribe((f) => {
    f.forEach(({ keyframes: h }) => {
      if (h) {
        let g = y.get(h);
        g || (g = t.createElement("style"), g.setAttribute("data-highlight", "keyframes"), y.set(h, g), t.head.appendChild(g)), g.innerHTML =
        h;
      }
    }), y.forEach((h, g) => {
      f.some((E) => E.keyframes === g) || (h.remove(), y.delete(g));
    });
  });
  let b = new Map(/* @__PURE__ */ new Map());
  n.subscribe((f) => {
    f.forEach((h) => {
      let g = b.get(h.element);
      if (u && !g) {
        let E = {
          popover: "manual",
          "data-highlight-dimensions": `w${h.width.toFixed(0)}h${h.height.toFixed(0)}`,
          "data-highlight-coordinates": `x${h.left.toFixed(0)}y${h.top.toFixed(0)}`
        };
        g = u.appendChild(
          q("div", E, [q("div")])
        ), b.set(h.element, g);
      }
    }), b.forEach((h, g) => {
      f.some(({ element: E }) => E === g) || (h.remove(), b.delete(g));
    });
  }), n.subscribe((f) => {
    let h = f.filter((E) => E.menu);
    if (!h.length)
      return;
    let g = /* @__PURE__ */ i((E) => {
      requestAnimationFrame(() => {
        let T = t.getElementById(_), I = { x: E.pageX, y: E.pageY };
        if (T && !Br(T, I)) {
          let F = h.filter((M) => {
            let U = b.get(M.element);
            return Gr(M, U, I);
          });
          s.set(F.length ? I : void 0), l.set(F);
        }
      });
    }, "onClick");
    return t.addEventListener("click", g), () => t.removeEventListener("click", g);
  });
  let w = /* @__PURE__ */ i(() => {
    let f = t.getElementById(_), h = a.get();
    !h || f && Br(f, h) || c.set((g) => {
      let E = n.get().filter((M) => {
        let U = b.get(M.element);
        return Gr(M, U, h);
      }), T = g.filter((M) => E.includes(M)), I = E.filter((M) => !g.includes(M)), F = g.length - T.length;
      return I.length || F ? [...T, ...I] : g;
    });
  }, "updateHovered");
  a.subscribe(w), n.subscribe(w);
  let R = /* @__PURE__ */ i(() => {
    let f = p.get(), h = f ? [f] : l.get(), g = h.length === 1 ? h[0] : d.get(), E = s.get() !== void 0;
    n.get().forEach((T) => {
      let I = b.get(T.element);
      if (I) {
        let F = g === T, M = E ? g ? F : h.includes(T) : c.get()?.includes(T);
        Object.assign(I.style, {
          animation: "none",
          background: "transparent",
          border: "none",
          boxSizing: "border-box",
          outline: "none",
          outlineOffset: "0px",
          ...T.styles,
          ...M ? T.hoverStyles : {},
          ...F ? T.focusStyles : {},
          position: getComputedStyle(T.element).position === "fixed" ? "fixed" : "absolute",
          zIndex: qr - 10,
          top: `${T.top}px`,
          left: `${T.left}px`,
          width: `${T.width}px`,
          height: `${T.height}px`,
          margin: 0,
          padding: 0,
          cursor: T.menu && M ? "pointer" : "default",
          pointerEvents: T.menu ? "auto" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible"
        }), Object.assign(I.children[0].style, {
          width: "100%",
          height: "100%",
          minHeight: `${ne}px`,
          minWidth: `${ne}px`,
          boxSizing: "content-box",
          padding: I.style.outlineWidth || "0px"
        }), zr(I);
      }
    });
  }, "updateBoxStyles");
  n.subscribe(R), l.subscribe(R), c.subscribe(R), d.subscribe(R), p.subscribe(R);
  let x = /* @__PURE__ */ i(() => {
    if (!u)
      return;
    let f = t.getElementById(_);
    if (f)
      f.innerHTML = "";
    else {
      let T = { id: _, popover: "manual" };
      f = u.appendChild(q("div", T)), u.appendChild(
        q("style", {}, [
          `
            #${_} {
              position: absolute;
              z-index: ${qr};
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
            #${_} ul {
              list-style: none;
              margin: 0;
              padding: 0;
            }
            #${_} > ul {
              max-height: 300px;
              overflow-y: auto;
              padding: 4px 0;
            }
            #${_} li {
              padding: 0 4px;
              margin: 0;
            }
            #${_} li > :not(ul) {
              display: flex;
              padding: 8px;
              margin: 0;
              align-items: center;
              gap: 8px;
              border-radius: 4px;
            }
            #${_} button {
              width: 100%;
              border: 0;
              background: transparent;
              color: inherit;
              text-align: left;
              font-family: inherit;
              font-size: inherit;
            }
            #${_} button:focus-visible {
              outline-color: #029CFD;
            }
            #${_} button:hover {
              background: rgba(2, 156, 253, 0.07);
              color: #029CFD;
              cursor: pointer;
            }
            #${_} li code {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 16px;
              font-size: 11px;
            }
            #${_} li svg {
              flex-shrink: 0;
              margin: 1px;
              color: #73828C;
            }
            #${_} li > button:hover svg, #${_} li > button:focus-visible svg {
              color: #029CFD;
            }
            #${_} .element-list li svg {
              display: none;
            }
            #${_} li.selectable svg, #${_} li.selected svg {
              display: block;
            }
            #${_} .menu-list {
              border-top: 1px solid rgba(38, 85, 115, 0.15);
            }
            #${_} .menu-list > li:not(:last-child) {
              padding-bottom: 4px;
              margin-bottom: 4px;
              border-bottom: 1px solid rgba(38, 85, 115, 0.15);
            }
            #${_} .menu-items, #${_} .menu-items li {
              padding: 0;
            }
            #${_} .menu-item {
              display: flex;
            }
            #${_} .menu-item-content {
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            }
          `
        ])
      );
    }
    let h = p.get(), g = h ? [h] : l.get();
    if (g.length && (f.style.position = getComputedStyle(g[0].element).position === "fixed" ? "fixed" : "absolute", f.appendChild(
      q(
        "ul",
        { class: "element-list" },
        g.map((T) => {
          let I = g.length > 1 && !!T.menu?.some(
            (U) => U.some(
              (j) => !j.selectors || j.selectors.some((oe) => T.selectors.includes(oe))
            )
          ), F = I ? {
            class: "selectable",
            onClick: /* @__PURE__ */ i(() => p.set(T), "onClick"),
            onMouseEnter: /* @__PURE__ */ i(() => d.set(T), "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ i(() => d.set(void 0), "onMouseLeave")
          } : h ? { class: "selected", onClick: /* @__PURE__ */ i(() => p.set(void 0), "onClick") } : {}, M = I || h;
          return q("li", F, [
            q(M ? "button" : "div", M ? { type: "button" } : {}, [
              h ? at("chevronLeft") : null,
              q("code", {}, [T.element.outerHTML]),
              I ? at("chevronRight") : null
            ])
          ]);
        })
      )
    )), p.get() || l.get().length === 1) {
      let T = p.get() || l.get()[0], I = T.menu?.filter(
        (F) => F.some(
          (M) => !M.selectors || M.selectors.some((U) => T.selectors.includes(U))
        )
      );
      I?.length && f.appendChild(
        q(
          "ul",
          { class: "menu-list" },
          I.map(
            (F) => q("li", {}, [
              q(
                "ul",
                { class: "menu-items" },
                F.map(
                  ({ id: M, title: U, description: j, iconLeft: oe, iconRight: Ae, clickEvent: Do }) => {
                    let hr = Do && (() => e.emit(Do, M, si(T)));
                    return q("li", {}, [
                      q(
                        hr ? "button" : "div",
                        hr ? { class: "menu-item", type: "button", onClick: hr } : { class: "menu-item" },
                        [
                          oe ? at(oe) : null,
                          q("div", { class: "menu-item-content" }, [
                            q(j ? "strong" : "span", {}, [U]),
                            j && q("span", {}, [j])
                          ]),
                          Ae ? at(Ae) : null
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
    let E = s.get();
    E ? (Object.assign(f.style, {
      display: "block",
      left: `${f.style.position === "fixed" ? E.x - window.scrollX : E.x}px`,
      top: `${f.style.position === "fixed" ? E.y - window.scrollY : E.y}px`
    }), zr(f), requestAnimationFrame(() => ni(f, E, { topOffset: 15, centered: !0 }))) : (ii(f), Object.assign(f.style, { display: "none" }));
  }, "renderMenu");
  l.subscribe(x), p.subscribe(x);
  let A = /* @__PURE__ */ i((f) => {
    let h = ri(f);
    r.set((g) => {
      let E = h.id ? g.filter((T) => T.id !== h.id) : g;
      return h.selectors?.length ? [...E, h] : E;
    });
  }, "addHighlight"), P = /* @__PURE__ */ i((f) => {
    f && r.set((h) => h.filter((g) => g.id !== f));
  }, "removeHighlight"), m = /* @__PURE__ */ i(() => {
    r.set([]), o.set(/* @__PURE__ */ new Map()), n.set([]), s.set(void 0), a.set(void 0), l.set([]), c.set([]), d.set(void 0), p.set(void 0);
  }, "resetState"), S, C = /* @__PURE__ */ i((f, h) => {
    let g = "scrollIntoView-highlight";
    clearTimeout(S), P(g);
    let E = t.querySelector(f);
    if (!E) {
      console.warn(`Cannot scroll into view: ${f} not found`);
      return;
    }
    E.scrollIntoView({ behavior: "smooth", block: "center", ...h });
    let T = `kf-${Math.random().toString(36).substring(2, 15)}`;
    r.set((I) => [
      ...I,
      {
        id: g,
        priority: 1e3,
        selectors: [f],
        styles: {
          outline: "2px solid #1EA7FD",
          outlineOffset: "-1px",
          animation: `${T} 3s linear forwards`
        },
        keyframes: `@keyframes ${T} {
          0% { outline: 2px solid #1EA7FD; }
          20% { outline: 2px solid #1EA7FD00; }
          40% { outline: 2px solid #1EA7FD; }
          60% { outline: 2px solid #1EA7FD00; }
          80% { outline: 2px solid #1EA7FD; }
          100% { outline: 2px solid #1EA7FD00; }
        }`
      }
    ]), S = setTimeout(() => P(g), 3500);
  }, "scrollIntoView"), v = /* @__PURE__ */ i((f) => {
    requestAnimationFrame(() => a.set({ x: f.pageX, y: f.pageY }));
  }, "onMouseMove");
  t.body.addEventListener("mousemove", v), e.on(Zn, A), e.on(Qn, P), e.on(ei, m), e.on(ti, C), e.on(li.STORY_RENDER_PHASE_CHANGED, ({ newPhase: f }) => {
    f === "loading" && m();
  });
}, "useHighlights");

// src/highlight/preview.ts
globalThis?.FEATURES?.highlight && lt.addons?.ready && lt.addons.ready().then(ci);
var Ur = /* @__PURE__ */ i(() => (0, lt.definePreview)({}), "default");

// src/measure/preview.ts
var Pi = require("storybook/preview-api");

// src/measure/constants.ts
var Dt = "storybook/measure-addon", bu = `${Dt}/tool`, di = "measureEnabled", Su = {
  RESULT: `${Dt}/result`,
  REQUEST: `${Dt}/request`,
  CLEAR: `${Dt}/clear`
};

// src/measure/withMeasure.ts
var Kr = require("storybook/preview-api");

// src/measure/box-model/canvas.ts
var ct = require("@storybook/global");

// ../node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var bl = process.env.NODE_ENV === "production", Vr = "Invariant failed";
function ge(e, t) {
  if (!e) {
    if (bl)
      throw new Error(Vr);
    var r = typeof t == "function" ? t() : t, o = r ? "".concat(Vr, ": ").concat(r) : Vr;
    throw new Error(o);
  }
}
i(ge, "invariant");

// src/measure/box-model/canvas.ts
function pi() {
  let e = ct.global.document.documentElement, t = Math.max(e.scrollHeight, e.offsetHeight);
  return { width: Math.max(e.scrollWidth, e.offsetWidth), height: t };
}
i(pi, "getDocumentWidthAndHeight");
function Sl() {
  let e = ct.global.document.createElement("canvas");
  e.id = "storybook-addon-measure";
  let t = e.getContext("2d");
  ge(t != null);
  let { width: r, height: o } = pi();
  return Wr(e, t, { width: r, height: o }), e.style.position = "absolute", e.style.left = "0", e.style.top = "0", e.style.zIndex = "21474836\
47", e.style.pointerEvents = "none", ct.global.document.body.appendChild(e), { canvas: e, context: t, width: r, height: o };
}
i(Sl, "createCanvas");
function Wr(e, t, { width: r, height: o }) {
  e.style.width = `${r}px`, e.style.height = `${o}px`;
  let n = ct.global.window.devicePixelRatio;
  e.width = Math.floor(r * n), e.height = Math.floor(o * n), t.scale(n, n);
}
i(Wr, "setCanvasWidthAndHeight");
var H = {};
function ui() {
  H.canvas || (H = Sl());
}
i(ui, "init");
function fi() {
  H.context && H.context.clearRect(0, 0, H.width ?? 0, H.height ?? 0);
}
i(fi, "clear");
function mi(e) {
  fi(), e(H.context);
}
i(mi, "draw");
function yi() {
  ge(H.canvas, "Canvas should exist in the state."), ge(H.context, "Context should exist in the state."), Wr(H.canvas, H.context, { width: 0,
  height: 0 });
  let { width: e, height: t } = pi();
  Wr(H.canvas, H.context, { width: e, height: t }), H.width = e, H.height = t;
}
i(yi, "rescale");
function hi() {
  H.canvas && (fi(), H.canvas.parentNode?.removeChild(H.canvas), H = {});
}
i(hi, "destroy");

// src/measure/box-model/visualizer.ts
var J = require("@storybook/global");

// src/measure/box-model/labels.ts
var Ve = {
  margin: "#f6b26b",
  border: "#ffe599",
  padding: "#93c47d",
  content: "#6fa8dc",
  text: "#232020"
}, pe = 6;
function gi(e, { x: t, y: r, w: o, h: n, r: s }) {
  t = t - o / 2, r = r - n / 2, o < 2 * s && (s = o / 2), n < 2 * s && (s = n / 2), e.beginPath(), e.moveTo(t + s, r), e.arcTo(t + o, r, t +
  o, r + n, s), e.arcTo(t + o, r + n, t, r + n, s), e.arcTo(t, r + n, t, r, s), e.arcTo(t, r, t + o, r, s), e.closePath();
}
i(gi, "roundedRect");
function xl(e, { padding: t, border: r, width: o, height: n, top: s, left: a }) {
  let l = o - r.left - r.right - t.left - t.right, c = n - t.top - t.bottom - r.top - r.bottom, d = a + r.left + t.left, p = s + r.top + t.top;
  return e === "top" ? d += l / 2 : e === "right" ? (d += l, p += c / 2) : e === "bottom" ? (d += l / 2, p += c) : e === "left" ? p += c / 2 :
  e === "center" && (d += l / 2, p += c / 2), { x: d, y: p };
}
i(xl, "positionCoordinate");
function Tl(e, t, { margin: r, border: o, padding: n }, s, a) {
  let l = /* @__PURE__ */ i((y) => 0, "shift"), c = 0, d = 0, p = a ? 1 : 0.5, u = a ? s * 2 : 0;
  return e === "padding" ? l = /* @__PURE__ */ i((y) => n[y] * p + u, "shift") : e === "border" ? l = /* @__PURE__ */ i((y) => n[y] + o[y] *
  p + u, "shift") : e === "margin" && (l = /* @__PURE__ */ i((y) => n[y] + o[y] + r[y] * p + u, "shift")), t === "top" ? d = -l("top") : t ===
  "right" ? c = l("right") : t === "bottom" ? d = l("bottom") : t === "left" && (c = -l("left")), { offsetX: c, offsetY: d };
}
i(Tl, "offset");
function wl(e, t) {
  return Math.abs(e.x - t.x) < Math.abs(e.w + t.w) / 2 && Math.abs(e.y - t.y) < Math.abs(e.h + t.h) / 2;
}
i(wl, "collide");
function Rl(e, t, r) {
  return e === "top" ? t.y = r.y - r.h - pe : e === "right" ? t.x = r.x + r.w / 2 + pe + t.w / 2 : e === "bottom" ? t.y = r.y + r.h + pe : e ===
  "left" && (t.x = r.x - r.w / 2 - pe - t.w / 2), { x: t.x, y: t.y };
}
i(Rl, "overlapAdjustment");
function bi(e, t, { x: r, y: o, w: n, h: s }, a) {
  return gi(e, { x: r, y: o, w: n, h: s, r: 3 }), e.fillStyle = `${Ve[t]}dd`, e.fill(), e.strokeStyle = Ve[t], e.stroke(), e.fillStyle = Ve.
  text, e.fillText(a, r, o), gi(e, { x: r, y: o, w: n, h: s, r: 3 }), e.fillStyle = `${Ve[t]}dd`, e.fill(), e.strokeStyle = Ve[t], e.stroke(),
  e.fillStyle = Ve.text, e.fillText(a, r, o), { x: r, y: o, w: n, h: s };
}
i(bi, "textWithRect");
function Si(e, t) {
  e.font = "600 12px monospace", e.textBaseline = "middle", e.textAlign = "center";
  let r = e.measureText(t), o = r.actualBoundingBoxAscent + r.actualBoundingBoxDescent, n = r.width + pe * 2, s = o + pe * 2;
  return { w: n, h: s };
}
i(Si, "configureText");
function El(e, t, { type: r, position: o = "center", text: n }, s, a = !1) {
  let { x: l, y: c } = xl(o, t), { offsetX: d, offsetY: p } = Tl(r, o, t, pe + 1, a);
  l += d, c += p;
  let { w: u, h: y } = Si(e, n);
  if (s && wl({ x: l, y: c, w: u, h: y }, s)) {
    let b = Rl(o, { x: l, y: c, w: u, h: y }, s);
    l = b.x, c = b.y;
  }
  return bi(e, r, { x: l, y: c, w: u, h: y }, n);
}
i(El, "drawLabel");
function Al(e, { w: t, h: r }) {
  let o = t * 0.5 + pe, n = r * 0.5 + pe;
  return {
    offsetX: (e.x === "left" ? -1 : 1) * o,
    offsetY: (e.y === "top" ? -1 : 1) * n
  };
}
i(Al, "floatingOffset");
function vl(e, t, { type: r, text: o }) {
  let { floatingAlignment: n, extremities: s } = t, a = s[n.x], l = s[n.y], { w: c, h: d } = Si(e, o), { offsetX: p, offsetY: u } = Al(n, {
    w: c,
    h: d
  });
  return a += p, l += u, bi(e, r, { x: a, y: l, w: c, h: d }, o);
}
i(vl, "drawFloatingLabel");
function dt(e, t, r, o) {
  let n = [];
  r.forEach((s, a) => {
    let l = o && s.position === "center" ? vl(e, t, s) : El(e, t, s, n[a - 1], o);
    n[a] = l;
  });
}
i(dt, "drawStack");
function xi(e, t, r, o) {
  let n = r.reduce((s, a) => (Object.prototype.hasOwnProperty.call(s, a.position) || (s[a.position] = []), s[a.position]?.push(a), s), {});
  n.top && dt(e, t, n.top, o), n.right && dt(e, t, n.right, o), n.bottom && dt(e, t, n.bottom, o), n.left && dt(e, t, n.left, o), n.center &&
  dt(e, t, n.center, o);
}
i(xi, "labelStacks");

// src/measure/box-model/visualizer.ts
var Lt = {
  margin: "#f6b26ba8",
  border: "#ffe599a8",
  padding: "#93c47d8c",
  content: "#6fa8dca8"
}, Ti = 30;
function X(e) {
  return parseInt(e.replace("px", ""), 10);
}
i(X, "pxToNumber");
function We(e) {
  return Number.isInteger(e) ? e : e.toFixed(2);
}
i(We, "round");
function Yr(e) {
  return e.filter((t) => t.text !== 0 && t.text !== "0");
}
i(Yr, "filterZeroValues");
function Cl(e) {
  let t = {
    top: J.global.window.scrollY,
    bottom: J.global.window.scrollY + J.global.window.innerHeight,
    left: J.global.window.scrollX,
    right: J.global.window.scrollX + J.global.window.innerWidth
  }, r = {
    top: Math.abs(t.top - e.top),
    bottom: Math.abs(t.bottom - e.bottom),
    left: Math.abs(t.left - e.left),
    right: Math.abs(t.right - e.right)
  };
  return {
    x: r.left > r.right ? "left" : "right",
    y: r.top > r.bottom ? "top" : "bottom"
  };
}
i(Cl, "floatingAlignment");
function Pl(e) {
  let t = J.global.getComputedStyle(e), { top: r, left: o, right: n, bottom: s, width: a, height: l } = e.getBoundingClientRect(), {
    marginTop: c,
    marginBottom: d,
    marginLeft: p,
    marginRight: u,
    paddingTop: y,
    paddingBottom: b,
    paddingLeft: w,
    paddingRight: R,
    borderBottomWidth: x,
    borderTopWidth: A,
    borderLeftWidth: P,
    borderRightWidth: m
  } = t;
  r = r + J.global.window.scrollY, o = o + J.global.window.scrollX, s = s + J.global.window.scrollY, n = n + J.global.window.scrollX;
  let S = {
    top: X(c),
    bottom: X(d),
    left: X(p),
    right: X(u)
  }, C = {
    top: X(y),
    bottom: X(b),
    left: X(w),
    right: X(R)
  }, v = {
    top: X(A),
    bottom: X(x),
    left: X(P),
    right: X(m)
  }, f = {
    top: r - S.top,
    bottom: s + S.bottom,
    left: o - S.left,
    right: n + S.right
  };
  return {
    margin: S,
    padding: C,
    border: v,
    top: r,
    left: o,
    bottom: s,
    right: n,
    width: a,
    height: l,
    extremities: f,
    floatingAlignment: Cl(f)
  };
}
i(Pl, "measureElement");
function Fl(e, { margin: t, width: r, height: o, top: n, left: s, bottom: a, right: l }) {
  let c = o + t.bottom + t.top;
  e.fillStyle = Lt.margin, e.fillRect(s, n - t.top, r, t.top), e.fillRect(l, n - t.top, t.right, c), e.fillRect(s, a, r, t.bottom), e.fillRect(
  s - t.left, n - t.top, t.left, c);
  let d = [
    {
      type: "margin",
      text: We(t.top),
      position: "top"
    },
    {
      type: "margin",
      text: We(t.right),
      position: "right"
    },
    {
      type: "margin",
      text: We(t.bottom),
      position: "bottom"
    },
    {
      type: "margin",
      text: We(t.left),
      position: "left"
    }
  ];
  return Yr(d);
}
i(Fl, "drawMargin");
function Il(e, { padding: t, border: r, width: o, height: n, top: s, left: a, bottom: l, right: c }) {
  let d = o - r.left - r.right, p = n - t.top - t.bottom - r.top - r.bottom;
  e.fillStyle = Lt.padding, e.fillRect(a + r.left, s + r.top, d, t.top), e.fillRect(
    c - t.right - r.right,
    s + t.top + r.top,
    t.right,
    p
  ), e.fillRect(
    a + r.left,
    l - t.bottom - r.bottom,
    d,
    t.bottom
  ), e.fillRect(a + r.left, s + t.top + r.top, t.left, p);
  let u = [
    {
      type: "padding",
      text: t.top,
      position: "top"
    },
    {
      type: "padding",
      text: t.right,
      position: "right"
    },
    {
      type: "padding",
      text: t.bottom,
      position: "bottom"
    },
    {
      type: "padding",
      text: t.left,
      position: "left"
    }
  ];
  return Yr(u);
}
i(Il, "drawPadding");
function Ol(e, { border: t, width: r, height: o, top: n, left: s, bottom: a, right: l }) {
  let c = o - t.top - t.bottom;
  e.fillStyle = Lt.border, e.fillRect(s, n, r, t.top), e.fillRect(s, a - t.bottom, r, t.bottom), e.fillRect(s, n + t.top, t.left, c), e.fillRect(
  l - t.right, n + t.top, t.right, c);
  let d = [
    {
      type: "border",
      text: t.top,
      position: "top"
    },
    {
      type: "border",
      text: t.right,
      position: "right"
    },
    {
      type: "border",
      text: t.bottom,
      position: "bottom"
    },
    {
      type: "border",
      text: t.left,
      position: "left"
    }
  ];
  return Yr(d);
}
i(Ol, "drawBorder");
function kl(e, { padding: t, border: r, width: o, height: n, top: s, left: a }) {
  let l = o - r.left - r.right - t.left - t.right, c = n - t.top - t.bottom - r.top - r.bottom;
  return e.fillStyle = Lt.content, e.fillRect(
    a + r.left + t.left,
    s + r.top + t.top,
    l,
    c
  ), [
    {
      type: "content",
      position: "center",
      text: `${We(l)} x ${We(c)}`
    }
  ];
}
i(kl, "drawContent");
function Ml(e) {
  return (t) => {
    if (e && t) {
      let r = Pl(e), o = Fl(t, r), n = Il(t, r), s = Ol(t, r), a = kl(t, r), l = r.width <= Ti * 3 || r.height <= Ti;
      xi(
        t,
        r,
        [...a, ...n, ...s, ...o],
        l
      );
    }
  };
}
i(Ml, "drawBoxModel");
function wi(e) {
  mi(Ml(e));
}
i(wi, "drawSelectedElement");

// src/measure/util.ts
var Ri = require("@storybook/global");
var Ei = /* @__PURE__ */ i((e, t) => {
  let r = Ri.global.document.elementFromPoint(e, t), o = /* @__PURE__ */ i((s) => {
    if (s && s.shadowRoot) {
      let a = s.shadowRoot.elementFromPoint(e, t);
      return s.isEqualNode(a) ? s : a.shadowRoot ? o(a) : a;
    }
    return s;
  }, "crawlShadows");
  return o(r) || r;
}, "deepElementFromPoint");

// src/measure/withMeasure.ts
var Ai, _t = { x: 0, y: 0 };
function vi(e, t) {
  Ai = Ei(e, t), wi(Ai);
}
i(vi, "findAndDrawElement");
var Ci = /* @__PURE__ */ i((e, t) => {
  let { measureEnabled: r } = t.globals || {};
  return (0, Kr.useEffect)(() => {
    if (typeof globalThis.document > "u")
      return;
    let o = /* @__PURE__ */ i((n) => {
      window.requestAnimationFrame(() => {
        n.stopPropagation(), _t.x = n.clientX, _t.y = n.clientY;
      });
    }, "onPointerMove");
    return globalThis.document.addEventListener("pointermove", o), () => {
      globalThis.document.removeEventListener("pointermove", o);
    };
  }, []), (0, Kr.useEffect)(() => {
    let o = /* @__PURE__ */ i((s) => {
      window.requestAnimationFrame(() => {
        s.stopPropagation(), vi(s.clientX, s.clientY);
      });
    }, "onPointerOver"), n = /* @__PURE__ */ i(() => {
      window.requestAnimationFrame(() => {
        yi();
      });
    }, "onResize");
    return t.viewMode === "story" && r && (globalThis.document.addEventListener("pointerover", o), ui(), globalThis.window.addEventListener(
    "resize", n), vi(_t.x, _t.y)), () => {
      globalThis.window.removeEventListener("resize", n), hi();
    };
  }, [r, t.viewMode]), e();
}, "withMeasure");

// src/measure/preview.ts
var Dl = globalThis.FEATURES?.measure ? [Ci] : [], Ll = {
  [di]: !1
}, Xr = /* @__PURE__ */ i(() => (0, Pi.definePreview)({
  decorators: Dl,
  initialGlobals: Ll
}), "default");

// src/outline/preview.ts
var Mi = require("storybook/preview-api");

// src/outline/constants.ts
var jt = "outline";

// src/outline/withOutline.ts
var Nt = require("storybook/preview-api");

// src/outline/helpers.ts
var pt = require("@storybook/global");
var Jr = /* @__PURE__ */ i((e) => {
  (Array.isArray(e) ? e : [e]).forEach(_l);
}, "clearStyles"), _l = /* @__PURE__ */ i((e) => {
  let t = typeof e == "string" ? e : e.join(""), r = pt.global.document.getElementById(t);
  r && r.parentElement && r.parentElement.removeChild(r);
}, "clearStyle"), Fi = /* @__PURE__ */ i((e, t) => {
  let r = pt.global.document.getElementById(e);
  if (r)
    r.innerHTML !== t && (r.innerHTML = t);
  else {
    let o = pt.global.document.createElement("style");
    o.setAttribute("id", e), o.innerHTML = t, pt.global.document.head.appendChild(o);
  }
}, "addOutlineStyles");

// src/outline/outlineCSS.ts
var Oi = $(te(), 1);
function Zr(e) {
  return Oi.dedent`
    ${e} body {
      outline: 1px solid #2980b9 !important;
    }

    ${e} article {
      outline: 1px solid #3498db !important;
    }

    ${e} nav {
      outline: 1px solid #0088c3 !important;
    }

    ${e} aside {
      outline: 1px solid #33a0ce !important;
    }

    ${e} section {
      outline: 1px solid #66b8da !important;
    }

    ${e} header {
      outline: 1px solid #99cfe7 !important;
    }

    ${e} footer {
      outline: 1px solid #cce7f3 !important;
    }

    ${e} h1 {
      outline: 1px solid #162544 !important;
    }

    ${e} h2 {
      outline: 1px solid #314e6e !important;
    }

    ${e} h3 {
      outline: 1px solid #3e5e85 !important;
    }

    ${e} h4 {
      outline: 1px solid #449baf !important;
    }

    ${e} h5 {
      outline: 1px solid #c7d1cb !important;
    }

    ${e} h6 {
      outline: 1px solid #4371d0 !important;
    }

    ${e} main {
      outline: 1px solid #2f4f90 !important;
    }

    ${e} address {
      outline: 1px solid #1a2c51 !important;
    }

    ${e} div {
      outline: 1px solid #036cdb !important;
    }

    ${e} p {
      outline: 1px solid #ac050b !important;
    }

    ${e} hr {
      outline: 1px solid #ff063f !important;
    }

    ${e} pre {
      outline: 1px solid #850440 !important;
    }

    ${e} blockquote {
      outline: 1px solid #f1b8e7 !important;
    }

    ${e} ol {
      outline: 1px solid #ff050c !important;
    }

    ${e} ul {
      outline: 1px solid #d90416 !important;
    }

    ${e} li {
      outline: 1px solid #d90416 !important;
    }

    ${e} dl {
      outline: 1px solid #fd3427 !important;
    }

    ${e} dt {
      outline: 1px solid #ff0043 !important;
    }

    ${e} dd {
      outline: 1px solid #e80174 !important;
    }

    ${e} figure {
      outline: 1px solid #ff00bb !important;
    }

    ${e} figcaption {
      outline: 1px solid #bf0032 !important;
    }

    ${e} table {
      outline: 1px solid #00cc99 !important;
    }

    ${e} caption {
      outline: 1px solid #37ffc4 !important;
    }

    ${e} thead {
      outline: 1px solid #98daca !important;
    }

    ${e} tbody {
      outline: 1px solid #64a7a0 !important;
    }

    ${e} tfoot {
      outline: 1px solid #22746b !important;
    }

    ${e} tr {
      outline: 1px solid #86c0b2 !important;
    }

    ${e} th {
      outline: 1px solid #a1e7d6 !important;
    }

    ${e} td {
      outline: 1px solid #3f5a54 !important;
    }

    ${e} col {
      outline: 1px solid #6c9a8f !important;
    }

    ${e} colgroup {
      outline: 1px solid #6c9a9d !important;
    }

    ${e} button {
      outline: 1px solid #da8301 !important;
    }

    ${e} datalist {
      outline: 1px solid #c06000 !important;
    }

    ${e} fieldset {
      outline: 1px solid #d95100 !important;
    }

    ${e} form {
      outline: 1px solid #d23600 !important;
    }

    ${e} input {
      outline: 1px solid #fca600 !important;
    }

    ${e} keygen {
      outline: 1px solid #b31e00 !important;
    }

    ${e} label {
      outline: 1px solid #ee8900 !important;
    }

    ${e} legend {
      outline: 1px solid #de6d00 !important;
    }

    ${e} meter {
      outline: 1px solid #e8630c !important;
    }

    ${e} optgroup {
      outline: 1px solid #b33600 !important;
    }

    ${e} option {
      outline: 1px solid #ff8a00 !important;
    }

    ${e} output {
      outline: 1px solid #ff9619 !important;
    }

    ${e} progress {
      outline: 1px solid #e57c00 !important;
    }

    ${e} select {
      outline: 1px solid #e26e0f !important;
    }

    ${e} textarea {
      outline: 1px solid #cc5400 !important;
    }

    ${e} details {
      outline: 1px solid #33848f !important;
    }

    ${e} summary {
      outline: 1px solid #60a1a6 !important;
    }

    ${e} command {
      outline: 1px solid #438da1 !important;
    }

    ${e} menu {
      outline: 1px solid #449da6 !important;
    }

    ${e} del {
      outline: 1px solid #bf0000 !important;
    }

    ${e} ins {
      outline: 1px solid #400000 !important;
    }

    ${e} img {
      outline: 1px solid #22746b !important;
    }

    ${e} iframe {
      outline: 1px solid #64a7a0 !important;
    }

    ${e} embed {
      outline: 1px solid #98daca !important;
    }

    ${e} object {
      outline: 1px solid #00cc99 !important;
    }

    ${e} param {
      outline: 1px solid #37ffc4 !important;
    }

    ${e} video {
      outline: 1px solid #6ee866 !important;
    }

    ${e} audio {
      outline: 1px solid #027353 !important;
    }

    ${e} source {
      outline: 1px solid #012426 !important;
    }

    ${e} canvas {
      outline: 1px solid #a2f570 !important;
    }

    ${e} track {
      outline: 1px solid #59a600 !important;
    }

    ${e} map {
      outline: 1px solid #7be500 !important;
    }

    ${e} area {
      outline: 1px solid #305900 !important;
    }

    ${e} a {
      outline: 1px solid #ff62ab !important;
    }

    ${e} em {
      outline: 1px solid #800b41 !important;
    }

    ${e} strong {
      outline: 1px solid #ff1583 !important;
    }

    ${e} i {
      outline: 1px solid #803156 !important;
    }

    ${e} b {
      outline: 1px solid #cc1169 !important;
    }

    ${e} u {
      outline: 1px solid #ff0430 !important;
    }

    ${e} s {
      outline: 1px solid #f805e3 !important;
    }

    ${e} small {
      outline: 1px solid #d107b2 !important;
    }

    ${e} abbr {
      outline: 1px solid #4a0263 !important;
    }

    ${e} q {
      outline: 1px solid #240018 !important;
    }

    ${e} cite {
      outline: 1px solid #64003c !important;
    }

    ${e} dfn {
      outline: 1px solid #b4005a !important;
    }

    ${e} sub {
      outline: 1px solid #dba0c8 !important;
    }

    ${e} sup {
      outline: 1px solid #cc0256 !important;
    }

    ${e} time {
      outline: 1px solid #d6606d !important;
    }

    ${e} code {
      outline: 1px solid #e04251 !important;
    }

    ${e} kbd {
      outline: 1px solid #5e001f !important;
    }

    ${e} samp {
      outline: 1px solid #9c0033 !important;
    }

    ${e} var {
      outline: 1px solid #d90047 !important;
    }

    ${e} mark {
      outline: 1px solid #ff0053 !important;
    }

    ${e} bdi {
      outline: 1px solid #bf3668 !important;
    }

    ${e} bdo {
      outline: 1px solid #6f1400 !important;
    }

    ${e} ruby {
      outline: 1px solid #ff7b93 !important;
    }

    ${e} rt {
      outline: 1px solid #ff2f54 !important;
    }

    ${e} rp {
      outline: 1px solid #803e49 !important;
    }

    ${e} span {
      outline: 1px solid #cc2643 !important;
    }

    ${e} br {
      outline: 1px solid #db687d !important;
    }

    ${e} wbr {
      outline: 1px solid #db175b !important;
    }`;
}
i(Zr, "outlineCSS");

// src/outline/withOutline.ts
var ki = /* @__PURE__ */ i((e, t) => {
  let r = t.globals || {}, o = [!0, "true"].includes(r[jt]), n = t.viewMode === "docs", s = (0, Nt.useMemo)(() => Zr(n ? '[data-story-block=\
"true"]' : ".sb-show-main"), [t]);
  return (0, Nt.useEffect)(() => {
    let a = n ? `addon-outline-docs-${t.id}` : "addon-outline";
    return o ? Fi(a, s) : Jr(a), () => {
      Jr(a);
    };
  }, [o, s, t]), e();
}, "withOutline");

// src/outline/preview.ts
var jl = globalThis.FEATURES?.outline ? [ki] : [], Nl = {
  [jt]: !1
}, Qr = /* @__PURE__ */ i(() => (0, Mi.definePreview)({ decorators: jl, initialGlobals: Nl }), "default");

// src/test/preview.ts
var Li = require("storybook/internal/instrumenter"), _i = require("storybook/preview-api"), V = require("storybook/test");
var ql = /* @__PURE__ */ i(({ parameters: e }) => {
  e?.test?.mockReset === !0 ? (0, V.resetAllMocks)() : e?.test?.clearMocks === !0 ? (0, V.clearAllMocks)() : e?.test?.restoreMocks !== !1 &&
  (0, V.restoreAllMocks)();
}, "resetAllMocksLoader"), eo = /* @__PURE__ */ i((e, t = 0, r) => {
  if (t > 5 || e == null)
    return e;
  if ((0, V.isMockFunction)(e))
    return r && e.mockName(r), e;
  if (typeof e == "function" && "isAction" in e && e.isAction && !("implicit" in e && e.implicit)) {
    let o = (0, V.fn)(e);
    return r && o.mockName(r), o;
  }
  if (Array.isArray(e)) {
    t++;
    for (let o = 0; o < e.length; o++)
      Object.getOwnPropertyDescriptor(e, o)?.writable && (e[o] = eo(e[o], t));
    return e;
  }
  if (typeof e == "object" && e.constructor === Object) {
    t++;
    for (let [o, n] of Object.entries(e))
      Object.getOwnPropertyDescriptor(e, o)?.writable && (e[o] = eo(n, t, o));
    return e;
  }
  return e;
}, "traverseArgs"), Hl = /* @__PURE__ */ i(({ initialArgs: e }) => {
  eo(e);
}, "nameSpiesAndWrapActionsInSpies"), Di = !1, $l = /* @__PURE__ */ i(async (e) => {
  globalThis.HTMLElement && e.canvasElement instanceof globalThis.HTMLElement && (e.canvas = (0, V.within)(e.canvasElement));
  let t = globalThis.window?.navigator?.clipboard;
  if (t) {
    e.userEvent = (0, Li.instrument)(
      { userEvent: V.uninstrumentedUserEvent.setup() },
      { intercept: !0 }
    ).userEvent, Object.defineProperty(globalThis.window.navigator, "clipboard", {
      get: /* @__PURE__ */ i(() => t, "get"),
      configurable: !0
    });
    let r = HTMLElement.prototype.focus;
    Di || Object.defineProperties(HTMLElement.prototype, {
      focus: {
        configurable: !0,
        set: /* @__PURE__ */ i((o) => {
          r = o, Di = !0;
        }, "set"),
        get: /* @__PURE__ */ i(() => r, "get")
      }
    });
  }
}, "enhanceContext"), to = /* @__PURE__ */ i(() => (0, _i.definePreview)({
  loaders: [ql, Hl, $l]
}), "default");

// src/viewport/preview.ts
var qi = require("storybook/preview-api");

// src/viewport/constants.ts
var ji = "storybook/viewport", Ni = "viewport", lf = `${ji}/panel`, cf = `${ji}/tool`;

// src/viewport/preview.ts
var Bl = {
  [Ni]: { value: void 0, isRotated: !1 }
}, ro = /* @__PURE__ */ i(() => (0, qi.definePreview)({
  initialGlobals: Bl
}), "default");

// src/shared/preview/core-annotations.ts
function Ye() {
  return [
    // @ts-expect-error CJS fallback
    (Xr.default ?? Xr)(),
    // @ts-expect-error CJS fallback
    (jr.default ?? jr)(),
    // @ts-expect-error CJS fallback
    (Ur.default ?? Ur)(),
    // @ts-expect-error CJS fallback
    (Qr.default ?? Qr)(),
    // @ts-expect-error CJS fallback
    (ro.default ?? ro)(),
    // @ts-expect-error CJS fallback
    (Dr.default ?? Dr)(),
    // @ts-expect-error CJS fallback
    (Nr.default ?? Nr)(),
    // @ts-expect-error CJS fallback
    (to.default ?? to)()
  ];
}
i(Ye, "getCoreAnnotations");

// src/preview-api/modules/store/args.ts
var qt = require("storybook/internal/client-logger");
var oo = $(te(), 1);
var Ke = Symbol("incompatible"), no = /* @__PURE__ */ i((e, t) => {
  let r = t.type;
  if (e == null || !r || t.mapping)
    return e;
  switch (r.name) {
    case "string":
      return String(e);
    case "enum":
      return e;
    case "number":
      return Number(e);
    case "boolean":
      return String(e) === "true";
    case "array":
      return !r.value || !Array.isArray(e) ? Ke : e.reduce((o, n, s) => {
        let a = no(n, { type: r.value });
        return a !== Ke && (o[s] = a), o;
      }, new Array(e.length));
    case "object":
      return typeof e == "string" || typeof e == "number" ? e : !r.value || typeof e != "object" ? Ke : Object.entries(e).reduce((o, [n, s]) => {
        let a = no(s, { type: r.value[n] });
        return a === Ke ? o : Object.assign(o, { [n]: a });
      }, {});
    default:
      return Ke;
  }
}, "map"), Hi = /* @__PURE__ */ i((e, t) => Object.entries(e).reduce((r, [o, n]) => {
  if (!t[o])
    return r;
  let s = no(n, t[o]);
  return s === Ke ? r : Object.assign(r, { [o]: s });
}, {}), "mapArgsToTypes"), Xe = /* @__PURE__ */ i((e, t) => Array.isArray(e) && Array.isArray(t) ? t.reduce(
  (r, o, n) => (r[n] = Xe(e[n], t[n]), r),
  [...e]
).filter((r) => r !== void 0) : !z(e) || !z(t) ? t : Object.keys({ ...e, ...t }).reduce((r, o) => {
  if (o in t) {
    let n = Xe(e[o], t[o]);
    n !== void 0 && (r[o] = n);
  } else
    r[o] = e[o];
  return r;
}, {}), "combineArgs"), $i = /* @__PURE__ */ i((e, t) => Object.entries(t).reduce((r, [o, { options: n }]) => {
  function s() {
    return o in e && (r[o] = e[o]), r;
  }
  if (i(s, "allowArg"), !n)
    return s();
  if (!Array.isArray(n))
    return qt.once.error(oo.dedent`
        Invalid argType: '${o}.options' should be an array.

        More info: https://storybook.js.org/docs/api/arg-types
      `), s();
  if (n.some((u) => u && ["object", "function"].includes(typeof u)))
    return qt.once.error(oo.dedent`
        Invalid argType: '${o}.options' should only contain primitives. Use a 'mapping' for complex values.

        More info: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
      `), s();
  let a = Array.isArray(e[o]), l = a && e[o].findIndex((u) => !n.includes(u)), c = a && l === -1;
  if (e[o] === void 0 || n.includes(e[o]) || c)
    return s();
  let d = a ? `${o}[${l}]` : o, p = n.map((u) => typeof u == "string" ? `'${u}'` : String(u)).join(", ");
  return qt.once.warn(`Received illegal value for '${d}'. Supported options: ${p}`), r;
}, {}), "validateOptions"), Ce = Symbol("Deeply equal"), Je = /* @__PURE__ */ i((e, t) => {
  if (typeof e != typeof t)
    return t;
  if (Pr(e, t))
    return Ce;
  if (Array.isArray(e) && Array.isArray(t)) {
    let r = t.reduce((o, n, s) => {
      let a = Je(e[s], n);
      return a !== Ce && (o[s] = a), o;
    }, new Array(t.length));
    return t.length >= e.length ? r : r.concat(new Array(e.length - t.length).fill(void 0));
  }
  return z(e) && z(t) ? Object.keys({ ...e, ...t }).reduce((r, o) => {
    let n = Je(e?.[o], t?.[o]);
    return n === Ce ? r : Object.assign(r, { [o]: n });
  }, {}) : t;
}, "deepDiff"), io = "UNTARGETED";
function Bi({
  args: e,
  argTypes: t
}) {
  let r = {};
  return Object.entries(e).forEach(([o, n]) => {
    let { target: s = io } = t[o] || {};
    r[s] = r[s] || {}, r[s][o] = n;
  }), r;
}
i(Bi, "groupArgsByTarget");

// src/preview-api/modules/store/ArgsStore.ts
function Gl(e) {
  return Object.keys(e).forEach((t) => e[t] === void 0 && delete e[t]), e;
}
i(Gl, "deleteUndefined");
var Ht = class {
  constructor() {
    this.initialArgsByStoryId = {};
    this.argsByStoryId = {};
  }
  static {
    i(this, "ArgsStore");
  }
  get(t) {
    if (!(t in this.argsByStoryId))
      throw new Error(`No args known for ${t} -- has it been rendered yet?`);
    return this.argsByStoryId[t];
  }
  setInitial(t) {
    if (!this.initialArgsByStoryId[t.id])
      this.initialArgsByStoryId[t.id] = t.initialArgs, this.argsByStoryId[t.id] = t.initialArgs;
    else if (this.initialArgsByStoryId[t.id] !== t.initialArgs) {
      let r = Je(this.initialArgsByStoryId[t.id], this.argsByStoryId[t.id]);
      this.initialArgsByStoryId[t.id] = t.initialArgs, this.argsByStoryId[t.id] = t.initialArgs, r !== Ce && this.updateFromDelta(t, r);
    }
  }
  updateFromDelta(t, r) {
    let o = $i(r, t.argTypes);
    this.argsByStoryId[t.id] = Xe(this.argsByStoryId[t.id], o);
  }
  updateFromPersisted(t, r) {
    let o = Hi(r, t.argTypes);
    return this.updateFromDelta(t, o);
  }
  update(t, r) {
    if (!(t in this.argsByStoryId))
      throw new Error(`No args known for ${t} -- has it been rendered yet?`);
    this.argsByStoryId[t] = Gl({
      ...this.argsByStoryId[t],
      ...r
    });
  }
};

// src/preview-api/modules/store/GlobalsStore.ts
var Gi = require("storybook/internal/client-logger");

// src/preview-api/modules/store/csf/getValuesFromArgTypes.ts
var $t = /* @__PURE__ */ i((e = {}) => Object.entries(e).reduce((t, [r, { defaultValue: o }]) => (typeof o < "u" && (t[r] = o), t), {}), "ge\
tValuesFromArgTypes");

// src/preview-api/modules/store/GlobalsStore.ts
var Bt = class {
  static {
    i(this, "GlobalsStore");
  }
  constructor({
    globals: t = {},
    globalTypes: r = {}
  }) {
    this.set({ globals: t, globalTypes: r });
  }
  set({ globals: t = {}, globalTypes: r = {} }) {
    let o = this.initialGlobals && Je(this.initialGlobals, this.globals);
    this.allowedGlobalNames = /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(r)]);
    let n = $t(r);
    this.initialGlobals = { ...n, ...t }, this.globals = this.initialGlobals, o && o !== Ce && this.updateFromPersisted(o);
  }
  filterAllowedGlobals(t) {
    return Object.entries(t).reduce((r, [o, n]) => (this.allowedGlobalNames.has(o) ? r[o] = n : Gi.logger.warn(
      `Attempted to set a global (${o}) that is not defined in initial globals or globalTypes`
    ), r), {});
  }
  updateFromPersisted(t) {
    let r = this.filterAllowedGlobals(t);
    this.globals = { ...this.globals, ...r };
  }
  get() {
    return this.globals;
  }
  update(t) {
    this.globals = { ...this.globals, ...this.filterAllowedGlobals(t) };
    for (let r in t)
      t[r] === void 0 && (this.globals[r] = this.initialGlobals[r]);
  }
};

// src/preview-api/modules/store/StoryIndexStore.ts
var zi = require("storybook/internal/preview-errors"), Ui = $(Fr(), 1);
var zl = (0, Ui.default)(1)(
  (e) => Object.values(e).reduce(
    (t, r) => (t[r.importPath] = t[r.importPath] || r, t),
    {}
  )
), Gt = class {
  static {
    i(this, "StoryIndexStore");
  }
  constructor({ entries: t } = { v: 5, entries: {} }) {
    this.entries = t;
  }
  entryFromSpecifier(t) {
    let r = Object.values(this.entries);
    if (t === "*")
      return r[0];
    if (typeof t == "string")
      return this.entries[t] ? this.entries[t] : r.find((s) => s.id.startsWith(t));
    let { name: o, title: n } = t;
    return r.find((s) => s.name === o && s.title === n);
  }
  storyIdToEntry(t) {
    let r = this.entries[t];
    if (!r)
      throw new zi.MissingStoryAfterHmrError({ storyId: t });
    return r;
  }
  importPathToEntry(t) {
    return zl(this.entries)[t];
  }
};

// src/preview-api/modules/store/csf/normalizeInputTypes.ts
var Ul = /* @__PURE__ */ i((e) => typeof e == "string" ? { name: e } : e, "normalizeType"), Vl = /* @__PURE__ */ i((e) => typeof e == "strin\
g" ? { type: e } : e, "normalizeControl"), Wl = /* @__PURE__ */ i((e, t) => {
  let { type: r, control: o, ...n } = e, s = {
    name: t,
    ...n
  };
  return r && (s.type = Ul(r)), o ? s.control = Vl(o) : o === !1 && (s.control = { disable: !0 }), s;
}, "normalizeInputType"), Pe = /* @__PURE__ */ i((e) => de(e, Wl), "normalizeInputTypes");

// src/preview-api/modules/store/csf/normalizeStory.ts
var zt = require("storybook/internal/client-logger"), Ut = require("storybook/internal/csf"), Vi = $(te(), 1);

// src/preview-api/modules/store/csf/normalizeArrays.ts
var D = /* @__PURE__ */ i((e) => Array.isArray(e) ? e : e ? [e] : [], "normalizeArrays");

// src/preview-api/modules/store/csf/normalizeStory.ts
var Yl = Vi.dedent`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;
function Fe(e, t, r) {
  let o = t, n = typeof t == "function" ? t : null, { story: s } = o;
  s && (zt.logger.debug("deprecated story", s), (0, zt.deprecate)(Yl));
  let a = (0, Ut.storyNameFromExport)(e), l = typeof o != "function" && o.name || o.storyName || s?.name || a, c = [
    ...D(o.decorators),
    ...D(s?.decorators)
  ], d = { ...s?.parameters, ...o.parameters }, p = { ...s?.args, ...o.args }, u = { ...s?.argTypes, ...o.argTypes }, y = [...D(o.loaders), ...D(
  s?.loaders)], b = [
    ...D(o.beforeEach),
    ...D(s?.beforeEach)
  ], w = [
    ...D(o.afterEach),
    ...D(s?.afterEach)
  ], { render: R, play: x, tags: A = [], globals: P = {} } = o, m = d.__id || (0, Ut.toId)(r.id, a);
  return {
    moduleExport: t,
    id: m,
    name: l,
    tags: A,
    decorators: c,
    parameters: d,
    args: p,
    argTypes: Pe(u),
    loaders: y,
    beforeEach: b,
    afterEach: w,
    globals: P,
    ...R && { render: R },
    ...n && { userStoryFn: n },
    ...x && { play: x }
  };
}
i(Fe, "normalizeStory");

// src/preview-api/modules/store/csf/processCSFFile.ts
var so = require("storybook/internal/client-logger"), mt = require("storybook/internal/csf");

// src/preview-api/modules/store/csf/normalizeComponentAnnotations.ts
var Wi = require("storybook/internal/csf");
function ft(e, t = e.title, r) {
  let { id: o, argTypes: n } = e;
  return {
    id: (0, Wi.sanitize)(o || t),
    ...e,
    title: t,
    ...n && { argTypes: Pe(n) },
    parameters: {
      fileName: r,
      ...e.parameters
    }
  };
}
i(ft, "normalizeComponentAnnotations");

// src/preview-api/modules/store/csf/processCSFFile.ts
var Kl = /* @__PURE__ */ i((e) => {
  let { globals: t, globalTypes: r } = e;
  (t || r) && so.logger.error(
    "Global args/argTypes can only be set globally",
    JSON.stringify({
      globals: t,
      globalTypes: r
    })
  );
}, "checkGlobals"), Xl = /* @__PURE__ */ i((e) => {
  let { options: t } = e;
  t?.storySort && so.logger.error("The storySort option parameter can only be set globally");
}, "checkStorySort"), Vt = /* @__PURE__ */ i((e) => {
  e && (Kl(e), Xl(e));
}, "checkDisallowedParameters");
function Yi(e, t, r) {
  let { default: o, __namedExportsOrder: n, ...s } = e, a = Object.values(s)[0];
  if ((0, mt.isStory)(a)) {
    let d = ft(a.meta.input, r, t);
    Vt(d.parameters);
    let p = { meta: d, stories: {}, moduleExports: e };
    return Object.keys(s).forEach((u) => {
      if ((0, mt.isExportStory)(u, d)) {
        let y = Fe(u, s[u].input, d);
        Vt(y.parameters), p.stories[y.id] = y;
      }
    }), p.projectAnnotations = a.meta.preview.composed, p;
  }
  let l = ft(
    o,
    r,
    t
  );
  Vt(l.parameters);
  let c = { meta: l, stories: {}, moduleExports: e };
  return Object.keys(s).forEach((d) => {
    if ((0, mt.isExportStory)(d, l)) {
      let p = Fe(d, s[d], l);
      Vt(p.parameters), c.stories[p.id] = p;
    }
  }), c;
}
i(Yi, "processCSFFile");

// src/preview-api/modules/store/csf/prepareStory.ts
var Yt = require("storybook/internal/csf"), Ji = require("storybook/internal/preview-errors"), Zi = require("@storybook/global"), Qi = require("@storybook/global");

// src/preview-api/modules/preview-web/render/mount-utils.ts
function Xi(e) {
  return e != null && Jl(e).includes("mount");
}
i(Xi, "mountDestructured");
function Jl(e) {
  let t = e.toString().match(/[^(]*\(([^)]*)/);
  if (!t)
    return [];
  let r = Ki(t[1]);
  if (!r.length)
    return [];
  let o = r[0];
  return o.startsWith("{") && o.endsWith("}") ? Ki(o.slice(1, -1).replace(/\s/g, "")).map((s) => s.replace(/:.*|=.*/g, "")) : [];
}
i(Jl, "getUsedProps");
function Ki(e) {
  let t = [], r = [], o = 0;
  for (let s = 0; s < e.length; s++)
    if (e[s] === "{" || e[s] === "[")
      r.push(e[s] === "{" ? "}" : "]");
    else if (e[s] === r[r.length - 1])
      r.pop();
    else if (!r.length && e[s] === ",") {
      let a = e.substring(o, s).trim();
      a && t.push(a), o = s + 1;
    }
  let n = e.substring(o).trim();
  return n && t.push(n), t;
}
i(Ki, "splitByComma");

// src/preview-api/modules/store/decorators.ts
function ao(e, t, r) {
  let o = r(e);
  return (n) => t(o, n);
}
i(ao, "decorateStory");
function lo({
  componentId: e,
  title: t,
  kind: r,
  id: o,
  name: n,
  story: s,
  parameters: a,
  initialArgs: l,
  argTypes: c,
  ...d
} = {}) {
  return d;
}
i(lo, "sanitizeStoryContextUpdate");
function Wt(e, t) {
  let r = {}, o = /* @__PURE__ */ i((s) => (a) => {
    if (!r.value)
      throw new Error("Decorated function called without init");
    return r.value = {
      ...r.value,
      ...lo(a)
    }, s(r.value);
  }, "bindWithContext"), n = t.reduce(
    (s, a) => ao(s, a, o),
    e
  );
  return (s) => (r.value = s, n(s));
}
i(Wt, "defaultDecorateStory");

// src/preview-api/modules/store/parameters.ts
var K = /* @__PURE__ */ i((...e) => {
  let t = {}, r = e.filter(Boolean), o = r.reduce((n, s) => (Object.entries(s).forEach(([a, l]) => {
    let c = n[a];
    Array.isArray(l) || typeof c > "u" ? n[a] = l : z(l) && z(c) ? t[a] = !0 : typeof l < "u" && (n[a] = l);
  }), n), {});
  return Object.keys(t).forEach((n) => {
    let s = r.filter(Boolean).map((a) => a[n]).filter((a) => typeof a < "u");
    s.every((a) => z(a)) ? o[n] = K(...s) : o[n] = s[s.length - 1];
  }), o;
}, "combineParameters");

// src/preview-api/modules/store/csf/prepareStory.ts
function Ze(e, t, r) {
  let { moduleExport: o, id: n, name: s } = e || {}, a = es(
    e,
    t,
    r
  ), l = /* @__PURE__ */ i(async (v) => {
    let f = {};
    for (let h of [
      D(r.loaders),
      D(t.loaders),
      D(e.loaders)
    ]) {
      if (v.abortSignal.aborted)
        return f;
      let g = await Promise.all(h.map((E) => E(v)));
      Object.assign(f, ...g);
    }
    return f;
  }, "applyLoaders"), c = /* @__PURE__ */ i(async (v) => {
    let f = new Array();
    for (let h of [
      ...D(r.beforeEach),
      ...D(t.beforeEach),
      ...D(e.beforeEach)
    ]) {
      if (v.abortSignal.aborted)
        return f;
      let g = await h(v);
      g && f.push(g);
    }
    return f;
  }, "applyBeforeEach"), d = /* @__PURE__ */ i(async (v) => {
    let f = [
      ...D(r.afterEach),
      ...D(t.afterEach),
      ...D(e.afterEach)
    ].reverse();
    for (let h of f) {
      if (v.abortSignal.aborted)
        return;
      await h(v);
    }
  }, "applyAfterEach"), p = /* @__PURE__ */ i((v) => v.originalStoryFn(v.args, v), "undecoratedStoryFn"), { applyDecorators: u = Wt, runStep: y } = r,
  b = [
    ...D(e?.decorators),
    ...D(t?.decorators),
    ...D(r?.decorators)
  ], w = e?.userStoryFn || e?.render || t.render || r.render, R = Ft(u)(p, b), x = /* @__PURE__ */ i((v) => R(v), "unboundStoryFn"), A = e?.
  play ?? t?.play, P = Xi(A);
  if (!w && !P)
    throw new Ji.NoRenderFunctionError({ id: n });
  let m = /* @__PURE__ */ i((v) => async () => (await v.renderToCanvas(), v.canvas), "defaultMount"), S = e.mount ?? t.mount ?? r.mount ?? m,
  C = r.testingLibraryRender;
  return {
    storyGlobals: {},
    ...a,
    moduleExport: o,
    id: n,
    name: s,
    story: s,
    originalStoryFn: w,
    undecoratedStoryFn: p,
    unboundStoryFn: x,
    applyLoaders: l,
    applyBeforeEach: c,
    applyAfterEach: d,
    playFunction: A,
    runStep: y,
    mount: S,
    testingLibraryRender: C,
    renderToCanvas: r.renderToCanvas,
    usesMount: P
  };
}
i(Ze, "prepareStory");
function Kt(e, t, r) {
  return {
    ...es(void 0, e, t),
    moduleExport: r
  };
}
i(Kt, "prepareMeta");
function es(e, t, r) {
  let o = ["dev", "test"], n = Qi.global.DOCS_OPTIONS?.autodocs === !0 ? ["autodocs"] : [], s = (0, Yt.combineTags)(
    ...o,
    ...n,
    ...r.tags ?? [],
    ...t.tags ?? [],
    ...e?.tags ?? []
  ), a = K(
    r.parameters,
    t.parameters,
    e?.parameters
  ), { argTypesEnhancers: l = [], argsEnhancers: c = [] } = r, d = K(
    r.argTypes,
    t.argTypes,
    e?.argTypes
  );
  if (e) {
    let A = e?.userStoryFn || e?.render || t.render || r.render;
    a.__isArgsStory = A && A.length > 0;
  }
  let p = {
    ...r.args,
    ...t.args,
    ...e?.args
  }, u = {
    ...t.globals,
    ...e?.globals
  }, y = {
    componentId: t.id,
    title: t.title,
    kind: t.title,
    // Back compat
    id: e?.id || t.id,
    // if there's no story name, we create a fake one since enhancers expect a name
    name: e?.name || "__meta",
    story: e?.name || "__meta",
    // Back compat
    component: t.component,
    subcomponents: t.subcomponents,
    tags: s,
    parameters: a,
    initialArgs: p,
    argTypes: d,
    storyGlobals: u
  };
  y.argTypes = l.reduce(
    (A, P) => P({ ...y, argTypes: A }),
    y.argTypes
  );
  let b = { ...p };
  y.initialArgs = [...c].reduce(
    (A, P) => ({
      ...A,
      ...P({
        ...y,
        initialArgs: A
      })
    }),
    b
  );
  let { name: w, story: R, ...x } = y;
  return x;
}
i(es, "preparePartialAnnotations");
function Xt(e) {
  let { args: t } = e, r = {
    ...e,
    allArgs: void 0,
    argsByTarget: void 0
  };
  if (Zi.global.FEATURES?.argTypeTargetsV7) {
    let s = Bi(e);
    r = {
      ...e,
      allArgs: e.args,
      argsByTarget: s,
      args: s[io] || {}
    };
  }
  let o = Object.entries(r.args).reduce((s, [a, l]) => {
    if (!r.argTypes[a]?.mapping)
      return s[a] = l, s;
    let c = /* @__PURE__ */ i((d) => {
      let p = r.argTypes[a].mapping;
      return p && d in p ? p[d] : d;
    }, "mappingFn");
    return s[a] = Array.isArray(l) ? l.map(c) : c(l), s;
  }, {}), n = Object.entries(o).reduce((s, [a, l]) => {
    let c = r.argTypes[a] || {};
    return (0, Yt.includeConditionalArg)(c, o, r.globals) && (s[a] = l), s;
  }, {});
  return { ...r, unmappedArgs: t, args: n };
}
i(Xt, "prepareContext");

// src/preview-api/modules/store/inferArgTypes.ts
var ts = require("storybook/internal/client-logger");
var rs = $(te(), 1);
var co = /* @__PURE__ */ i((e, t, r) => {
  let o = typeof e;
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
  return e ? r.has(e) ? (ts.logger.warn(rs.dedent`
        We've detected a cycle in arg '${t}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/essentials/controls#fully-custom-args
      `), { name: "other", value: "cyclic object" }) : (r.add(e), Array.isArray(e) ? { name: "array", value: e.length > 0 ? co(e[0], t, new Set(
  r)) : { name: "other", value: "unknown" } } : { name: "object", value: de(e, (s) => co(s, t, new Set(r))) }) : { name: "object", value: {} };
}, "inferType"), po = /* @__PURE__ */ i((e) => {
  let { id: t, argTypes: r = {}, initialArgs: o = {} } = e, n = de(o, (a, l) => ({
    name: l,
    type: co(a, `${t}.${l}`, /* @__PURE__ */ new Set())
  })), s = de(r, (a, l) => ({
    name: l
  }));
  return K(n, s, r);
}, "inferArgTypes");
po.secondPass = !0;

// src/preview-api/modules/store/inferControls.ts
var ns = require("storybook/internal/client-logger");

// src/preview-api/modules/store/filterArgTypes.ts
var os = /* @__PURE__ */ i((e, t) => Array.isArray(t) ? t.includes(e) : e.match(t), "matches"), yt = /* @__PURE__ */ i((e, t, r) => !t && !r ?
e : e && Cr(e, (o, n) => {
  let s = o.name || n.toString();
  return !!(!t || os(s, t)) && (!r || !os(s, r));
}), "filterArgTypes");

// src/preview-api/modules/store/inferControls.ts
var Zl = /* @__PURE__ */ i((e, t, r) => {
  let { type: o, options: n } = e;
  if (o) {
    if (r.color && r.color.test(t)) {
      let s = o.name;
      if (s === "string")
        return { control: { type: "color" } };
      s !== "enum" && ns.logger.warn(
        `Addon controls: Control of type color only supports string, received "${s}" instead`
      );
    }
    if (r.date && r.date.test(t))
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
        return { control: { type: n ? "select" : "object" } };
    }
  }
}, "inferControl"), Qe = /* @__PURE__ */ i((e) => {
  let {
    argTypes: t,
    parameters: { __isArgsStory: r, controls: { include: o = null, exclude: n = null, matchers: s = {} } = {} }
  } = e;
  if (!r)
    return t;
  let a = yt(t, o, n), l = de(a, (c, d) => c?.type && Zl(c, d.toString(), s));
  return K(l, a);
}, "inferControls");
Qe.secondPass = !0;

// src/preview-api/modules/store/csf/normalizeProjectAnnotations.ts
function Ie({
  argTypes: e,
  globalTypes: t,
  argTypesEnhancers: r,
  decorators: o,
  loaders: n,
  beforeEach: s,
  afterEach: a,
  initialGlobals: l,
  ...c
}) {
  return {
    ...e && { argTypes: Pe(e) },
    ...t && { globalTypes: Pe(t) },
    decorators: D(o),
    loaders: D(n),
    beforeEach: D(s),
    afterEach: D(a),
    argTypesEnhancers: [
      ...r || [],
      po,
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
      Qe
    ],
    initialGlobals: l,
    ...c
  };
}
i(Ie, "normalizeProjectAnnotations");

// src/preview-api/modules/store/csf/composeConfigs.ts
var ss = require("@storybook/global");

// src/preview-api/modules/store/csf/beforeAll.ts
var is = /* @__PURE__ */ i((e) => async () => {
  let t = [];
  for (let r of e) {
    let o = await r();
    o && t.unshift(o);
  }
  return async () => {
    for (let r of t)
      await r();
  };
}, "composeBeforeAllHooks");

// src/preview-api/modules/store/csf/stepRunners.ts
function Jt(e) {
  return async (t, r, o) => {
    await e.reduceRight(
      (s, a) => async () => a(t, s, o),
      async () => r(o)
    )();
  };
}
i(Jt, "composeStepRunners");

// src/preview-api/modules/store/csf/composeConfigs.ts
function gt(e, t) {
  return e.map((r) => r.default?.[t] ?? r[t]).filter(Boolean);
}
i(gt, "getField");
function be(e, t, r = {}) {
  return gt(e, t).reduce((o, n) => {
    let s = D(n);
    return r.reverseFileOrder ? [...s, ...o] : [...o, ...s];
  }, []);
}
i(be, "getArrayField");
function Zt(e, t) {
  return Object.assign({}, ...gt(e, t));
}
i(Zt, "getObjectField");
function ht(e, t) {
  return gt(e, t).pop();
}
i(ht, "getSingletonField");
function ue(e) {
  let t = be(e, "argTypesEnhancers"), r = gt(e, "runStep"), o = be(e, "beforeAll");
  return {
    parameters: K(...gt(e, "parameters")),
    decorators: be(e, "decorators", {
      reverseFileOrder: !(ss.global.FEATURES?.legacyDecoratorFileOrder ?? !1)
    }),
    args: Zt(e, "args"),
    argsEnhancers: be(e, "argsEnhancers"),
    argTypes: Zt(e, "argTypes"),
    argTypesEnhancers: [
      ...t.filter((n) => !n.secondPass),
      ...t.filter((n) => n.secondPass)
    ],
    initialGlobals: Zt(e, "initialGlobals"),
    globalTypes: Zt(e, "globalTypes"),
    loaders: be(e, "loaders"),
    beforeAll: is(o),
    beforeEach: be(e, "beforeEach"),
    afterEach: be(e, "afterEach"),
    render: ht(e, "render"),
    renderToCanvas: ht(e, "renderToCanvas"),
    applyDecorators: ht(e, "applyDecorators"),
    runStep: Jt(r),
    tags: be(e, "tags"),
    mount: ht(e, "mount"),
    testingLibraryRender: ht(e, "testingLibraryRender")
  };
}
i(ue, "composeConfigs");

// src/preview-api/modules/store/csf/portable-stories.ts
var cs = require("storybook/internal/csf"), ds = require("storybook/internal/preview-errors"), ps = $(te(), 1);

// src/preview-api/modules/preview-web/render/animation-utils.ts
function Qt() {
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
i(Qt, "isTestEnvironment");
function Oe(e = !0) {
  if (!("document" in globalThis && "createElement" in globalThis.document))
    return () => {
    };
  let t = document.createElement("style");
  t.textContent = `*, *:before, *:after {
    animation: none !important;
  }`, document.head.appendChild(t);
  let r = document.createElement("style");
  return r.textContent = `*, *:before, *:after {
    animation-delay: 0s !important;
    animation-direction: ${e ? "reverse" : "normal"} !important;
    animation-play-state: paused !important;
    transition: none !important;
  }`, document.head.appendChild(r), document.body.clientHeight, document.head.removeChild(t), () => {
    r.parentNode?.removeChild(r);
  };
}
i(Oe, "pauseAnimations");
async function ke(e) {
  if (!("document" in globalThis && "getAnimations" in globalThis.document && "querySelectorAll" in globalThis.document))
    return;
  let t = !1;
  await Promise.race([
    // After 50ms, retrieve any running animations and wait for them to finish
    // If new animations are created while waiting, we'll wait for them too
    new Promise((r) => {
      setTimeout(() => {
        let o = [globalThis.document, ...as(globalThis.document)], n = /* @__PURE__ */ i(async () => {
          if (t || e?.aborted)
            return;
          let s = o.flatMap((a) => a?.getAnimations?.() || []).filter((a) => a.playState === "running" && !Ql(a));
          s.length > 0 && (await Promise.all(s.map((a) => a.finished)), await n());
        }, "checkAnimationsFinished");
        n().then(r);
      }, 100);
    }),
    // If animations don't finish within the timeout, continue without waiting
    new Promise(
      (r) => setTimeout(() => {
        t = !0, r(void 0);
      }, 5e3)
    )
  ]);
}
i(ke, "waitForAnimations");
function as(e) {
  return [e, ...e.querySelectorAll("*")].reduce((t, r) => ("shadowRoot" in r && r.shadowRoot && t.push(r.shadowRoot, ...as(r.shadowRoot)), t),
  []);
}
i(as, "getShadowRoots");
function Ql(e) {
  if (e instanceof CSSAnimation && e.effect instanceof KeyframeEffect && e.effect.target) {
    let t = getComputedStyle(e.effect.target, e.effect.pseudoElement), r = t.animationName?.split(", ").indexOf(e.animationName);
    return t.animationIterationCount.split(", ")[r] === "infinite";
  }
  return !1;
}
i(Ql, "isInfiniteAnimation");

// src/preview-api/modules/store/reporter-api.ts
var Se = class {
  constructor() {
    this.reports = [];
  }
  static {
    i(this, "ReporterAPI");
  }
  async addReport(t) {
    this.reports.push(t);
  }
};

// src/preview-api/modules/store/csf/csf-factory-utils.ts
var ls = require("storybook/internal/csf");
function er(e, t, r) {
  return (0, ls.isStory)(e) ? {
    story: e.input,
    meta: e.meta.input,
    preview: e.meta.preview.composed
  } : { story: e, meta: t, preview: r };
}
i(er, "getCsfFactoryAnnotations");

// src/preview-api/modules/store/csf/portable-stories.ts
function us(e) {
  globalThis.defaultProjectAnnotations = e;
}
i(us, "setDefaultProjectAnnotations");
var ec = "ComposedStory", tc = "Unnamed Story";
function rc(e) {
  return e ? ue([e]) : {};
}
i(rc, "extractAnnotation");
function fs(e) {
  let t = Array.isArray(e) ? e : [e];
  return globalThis.globalProjectAnnotations = ue([
    ...Ye(),
    globalThis.defaultProjectAnnotations ?? {},
    ue(t.map(rc))
  ]), globalThis.globalProjectAnnotations ?? {};
}
i(fs, "setProjectAnnotations");
var xe = [];
function uo(e, t, r, o, n) {
  if (e === void 0)
    throw new Error("Expected a story but received undefined.");
  t.title = t.title ?? ec;
  let s = ft(t), a = n || e.storyName || e.story?.name || e.name || tc, l = Fe(
    a,
    e,
    s
  ), c = Ie(
    ue([
      o ?? globalThis.globalProjectAnnotations ?? {},
      r ?? {}
    ])
  ), d = Ze(
    l,
    s,
    c
  ), u = {
    ...$t(c.globalTypes),
    ...c.initialGlobals,
    ...d.storyGlobals
  }, y = new Se(), b = /* @__PURE__ */ i(() => {
    let m = Xt({
      hooks: new ye(),
      globals: u,
      args: { ...d.initialArgs },
      viewMode: "story",
      reporting: y,
      loaded: {},
      abortSignal: new AbortController().signal,
      step: /* @__PURE__ */ i((S, C) => d.runStep(S, C, m), "step"),
      canvasElement: null,
      canvas: {},
      userEvent: {},
      globalTypes: c.globalTypes,
      ...d,
      context: null,
      mount: null
    });
    return m.parameters.__isPortableStory = !0, m.context = m, d.renderToCanvas && (m.renderToCanvas = async () => {
      let S = await d.renderToCanvas?.(
        {
          componentId: d.componentId,
          title: d.title,
          id: d.id,
          name: d.name,
          tags: d.tags,
          showMain: /* @__PURE__ */ i(() => {
          }, "showMain"),
          showError: /* @__PURE__ */ i((C) => {
            throw new Error(`${C.title}
${C.description}`);
          }, "showError"),
          showException: /* @__PURE__ */ i((C) => {
            throw C;
          }, "showException"),
          forceRemount: !0,
          storyContext: m,
          storyFn: /* @__PURE__ */ i(() => d.unboundStoryFn(m), "storyFn"),
          unboundStoryFn: d.unboundStoryFn
        },
        m.canvasElement
      );
      S && xe.push(S);
    }), m.mount = d.mount(m), m;
  }, "initializeContext"), w, R = /* @__PURE__ */ i(async (m) => {
    let S = b();
    return S.canvasElement ??= globalThis?.document?.body, w && (S.loaded = w.loaded), Object.assign(S, m), d.playFunction(S);
  }, "play"), x = /* @__PURE__ */ i((m) => {
    let S = b();
    return Object.assign(S, m), nc(d, S);
  }, "run"), A = d.playFunction ? R : void 0;
  return Object.assign(
    /* @__PURE__ */ i(function(S) {
      let C = b();
      return w && (C.loaded = w.loaded), C.args = {
        ...C.initialArgs,
        ...S
      }, d.unboundStoryFn(C);
    }, "storyFn"),
    {
      id: d.id,
      storyName: a,
      load: /* @__PURE__ */ i(async () => {
        for (let S of [...xe].reverse())
          await S();
        xe.length = 0;
        let m = b();
        m.loaded = await d.applyLoaders(m), xe.push(...(await d.applyBeforeEach(m)).filter(Boolean)), w = m;
      }, "load"),
      globals: u,
      args: d.initialArgs,
      parameters: d.parameters,
      argTypes: d.argTypes,
      play: A,
      run: x,
      reporting: y,
      tags: d.tags
    }
  );
}
i(uo, "composeStory");
var oc = /* @__PURE__ */ i((e, t, r, o) => uo(e, t, r, {}, o), "defaultComposeStory");
function ms(e, t, r = oc) {
  let { default: o, __esModule: n, __namedExportsOrder: s, ...a } = e, l = o;
  return Object.entries(a).reduce(
    (d, [p, u]) => {
      let { story: y, meta: b } = er(u);
      return !l && b && (l = b), (0, cs.isExportStory)(p, l) ? Object.assign(d, {
        [p]: r(y, l, t, p)
      }) : d;
    },
    {}
  );
}
i(ms, "composeStories");
function ys(e) {
  return e.extend({
    mount: /* @__PURE__ */ i(async ({ mount: t, page: r }, o) => {
      await o(async (n, ...s) => {
        if (!("__pw_type" in n) || "__pw_type" in n && n.__pw_type !== "jsx")
          throw new Error(ps.dedent`
              Portable stories in Playwright CT only work when referencing JSX elements.
              Please use JSX format for your components such as:

              instead of:
              await mount(MyComponent, { props: { foo: 'bar' } })

              do:
              await mount(<MyComponent foo="bar"/>)

              More info: https://storybook.js.org/docs/api/portable-stories-playwright
            `);
        let { props: a, ...l } = n;
        await r.evaluate(async (d) => {
          let p = await globalThis.__pwUnwrapObject?.(d);
          return ("__pw_type" in p ? p.type : p)?.load?.();
        }, l);
        let c = await t(n, ...s);
        return await r.evaluate(async (d) => {
          let p = await globalThis.__pwUnwrapObject?.(d), u = "__pw_type" in p ? p.type : p, y = document.querySelector("#root");
          return u?.play?.({ canvasElement: y });
        }, l), c;
      });
    }, "mount")
  });
}
i(ys, "createPlaywrightTest");
async function nc(e, t) {
  for (let s of [...xe].reverse())
    await s();
  if (xe.length = 0, !t.canvasElement) {
    let s = document.createElement("div");
    globalThis?.document?.body?.appendChild(s), t.canvasElement = s, xe.push(() => {
      globalThis?.document?.body?.contains(s) && globalThis?.document?.body?.removeChild(s);
    });
  }
  if (t.loaded = await e.applyLoaders(t), t.abortSignal.aborted)
    return;
  xe.push(...(await e.applyBeforeEach(t)).filter(Boolean));
  let r = e.playFunction, o = e.usesMount;
  if (o || await t.mount(), t.abortSignal.aborted)
    return;
  r && (o || (t.mount = async () => {
    throw new ds.MountMustBeDestructuredError({ playFunction: r.toString() });
  }), await r(t));
  let n;
  Qt() ? n = Oe() : await ke(t.abortSignal), await e.applyAfterEach(t), await n?.();
}
i(nc, "runStory");

// src/preview-api/modules/store/StoryStore.ts
var hs = 1e3, ic = 1e4, Me = class {
  constructor(t, r, o) {
    this.importFn = r;
    this.storyIndex = new Gt(t), this.projectAnnotations = Ie(
      ue([...Ye(), o])
    );
    let { initialGlobals: n, globalTypes: s } = this.projectAnnotations;
    this.args = new Ht(), this.userGlobals = new Bt({ globals: n, globalTypes: s }), this.hooks = {}, this.cleanupCallbacks = {}, this.processCSFFileWithCache =
    (0, tr.default)(hs)(Yi), this.prepareMetaWithCache = (0, tr.default)(hs)(Kt), this.prepareStoryWithCache = (0, tr.default)(ic)(Ze);
  }
  static {
    i(this, "StoryStore");
  }
  setProjectAnnotations(t) {
    this.projectAnnotations = Ie(t);
    let { initialGlobals: r, globalTypes: o } = t;
    this.userGlobals.set({ globals: r, globalTypes: o });
  }
  // This means that one of the CSF files has changed.
  // If the `importFn` has changed, we will invalidate both caches.
  // If the `storyIndex` data has changed, we may or may not invalidate the caches, depending
  // on whether we've loaded the relevant files yet.
  async onStoriesChanged({
    importFn: t,
    storyIndex: r
  }) {
    t && (this.importFn = t), r && (this.storyIndex.entries = r.entries), this.cachedCSFFiles && await this.cacheAllCSFFiles();
  }
  // Get an entry from the index, waiting on initialization if necessary
  async storyIdToEntry(t) {
    return this.storyIndex.storyIdToEntry(t);
  }
  // To load a single CSF file to service a story we need to look up the importPath in the index
  async loadCSFFileByStoryId(t) {
    let { importPath: r, title: o } = this.storyIndex.storyIdToEntry(t), n = await this.importFn(r);
    return this.processCSFFileWithCache(n, r, o);
  }
  async loadAllCSFFiles() {
    let t = {};
    return Object.entries(this.storyIndex.entries).forEach(([o, { importPath: n }]) => {
      t[n] = o;
    }), (await Promise.all(
      Object.entries(t).map(async ([o, n]) => ({
        importPath: o,
        csfFile: await this.loadCSFFileByStoryId(n)
      }))
    )).reduce(
      (o, { importPath: n, csfFile: s }) => (o[n] = s, o),
      {}
    );
  }
  async cacheAllCSFFiles() {
    this.cachedCSFFiles = await this.loadAllCSFFiles();
  }
  preparedMetaFromCSFFile({ csfFile: t }) {
    let r = t.meta;
    return this.prepareMetaWithCache(
      r,
      this.projectAnnotations,
      t.moduleExports.default
    );
  }
  // Load the CSF file for a story and prepare the story from it and the project annotations.
  async loadStory({ storyId: t }) {
    let r = await this.loadCSFFileByStoryId(t);
    return this.storyFromCSFFile({ storyId: t, csfFile: r });
  }
  // This function is synchronous for convenience -- often times if you have a CSF file already
  // it is easier not to have to await `loadStory`.
  storyFromCSFFile({
    storyId: t,
    csfFile: r
  }) {
    let o = r.stories[t];
    if (!o)
      throw new rr.MissingStoryFromCsfFileError({ storyId: t });
    let n = r.meta, s = this.prepareStoryWithCache(
      o,
      n,
      r.projectAnnotations ?? this.projectAnnotations
    );
    return this.args.setInitial(s), this.hooks[s.id] = this.hooks[s.id] || new ye(), s;
  }
  // If we have a CSF file we can get all the stories from it synchronously
  componentStoriesFromCSFFile({
    csfFile: t
  }) {
    return Object.keys(this.storyIndex.entries).filter((r) => !!t.stories[r]).map((r) => this.storyFromCSFFile({ storyId: r, csfFile: t }));
  }
  async loadEntry(t) {
    let r = await this.storyIdToEntry(t), o = r.type === "docs" ? r.storiesImports : [], [n, ...s] = await Promise.all([
      this.importFn(r.importPath),
      ...o.map((a) => {
        let l = this.storyIndex.importPathToEntry(a);
        return this.loadCSFFileByStoryId(l.id);
      })
    ]);
    return { entryExports: n, csfFiles: s };
  }
  // A prepared story does not include args, globals or hooks. These are stored in the story store
  // and updated separtely to the (immutable) story.
  getStoryContext(t, { forceInitialArgs: r = !1 } = {}) {
    let o = this.userGlobals.get(), { initialGlobals: n } = this.userGlobals, s = new Se();
    return Xt({
      ...t,
      args: r ? t.initialArgs : this.args.get(t.id),
      initialGlobals: n,
      globalTypes: this.projectAnnotations.globalTypes,
      userGlobals: o,
      reporting: s,
      globals: {
        ...o,
        ...t.storyGlobals
      },
      hooks: this.hooks[t.id]
    });
  }
  addCleanupCallbacks(t, ...r) {
    this.cleanupCallbacks[t.id] = (this.cleanupCallbacks[t.id] || []).concat(r);
  }
  async cleanupStory(t) {
    this.hooks[t.id].clean();
    let r = this.cleanupCallbacks[t.id];
    if (r)
      for (let o of [...r].reverse())
        await o();
    delete this.cleanupCallbacks[t.id];
  }
  extract(t = { includeDocsOnly: !1 }) {
    let { cachedCSFFiles: r } = this;
    if (!r)
      throw new rr.CalledExtractOnStoreError();
    return Object.entries(this.storyIndex.entries).reduce(
      (o, [n, { type: s, importPath: a }]) => {
        if (s === "docs")
          return o;
        let l = r[a], c = this.storyFromCSFFile({ storyId: n, csfFile: l });
        return !t.includeDocsOnly && c.parameters.docsOnly || (o[n] = Object.entries(c).reduce(
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

// src/preview-api/modules/store/autoTitle.ts
var bs = require("storybook/internal/client-logger");

// ../node_modules/slash/index.js
function fo(e) {
  return e.startsWith("\\\\?\\") ? e : e.replace(/\\/g, "/");
}
i(fo, "slash");

// src/preview-api/modules/store/autoTitle.ts
var Ss = $(te(), 1);
var sc = /* @__PURE__ */ i((e) => {
  if (e.length === 0)
    return e;
  let t = e[e.length - 1], r = t?.replace(/(?:[.](?:story|stories))?([.][^.]+)$/i, "");
  if (e.length === 1)
    return [r];
  let o = e[e.length - 2];
  return r && o && r.toLowerCase() === o.toLowerCase() ? [...e.slice(0, -2), r] : r && (/^(story|stories)([.][^.]+)$/i.test(t) || /^index$/i.
  test(r)) ? e.slice(0, -1) : [...e.slice(0, -1), r];
}, "sanitize");
function gs(e) {
  return e.flatMap((t) => t.split("/")).filter(Boolean).join("/");
}
i(gs, "pathJoin");
var mo = /* @__PURE__ */ i((e, t, r) => {
  let { directory: o, importPathMatcher: n, titlePrefix: s = "" } = t || {};
  typeof e == "number" && bs.once.warn(Ss.dedent`
      CSF Auto-title received a numeric fileName. This typically happens when
      webpack is mis-configured in production mode. To force webpack to produce
      filenames, set optimization.moduleIds = "named" in your webpack config.
    `);
  let a = fo(String(e));
  if (n.exec(a)) {
    if (!r) {
      let l = a.replace(o, ""), c = gs([s, l]).split("/");
      return c = sc(c), c.join("/");
    }
    return s ? gs([s, r]) : r;
  }
}, "userOrAutoTitleFromSpecifier"), xs = /* @__PURE__ */ i((e, t, r) => {
  for (let o = 0; o < t.length; o += 1) {
    let n = mo(e, t[o], r);
    if (n)
      return n;
  }
  return r || void 0;
}, "userOrAutoTitle");

// src/preview-api/modules/store/sortStories.ts
var Rs = $(te(), 1);

// src/preview-api/modules/store/storySort.ts
var Ts = /\s*\/\s*/, ws = /* @__PURE__ */ i((e = {}) => (t, r) => {
  if (t.title === r.title && !e.includeNames)
    return 0;
  let o = e.method || "configure", n = e.order || [], s = t.title.trim().split(Ts), a = r.title.trim().split(Ts);
  e.includeNames && (s.push(t.name), a.push(r.name));
  let l = 0;
  for (; s[l] || a[l]; ) {
    if (!s[l])
      return -1;
    if (!a[l])
      return 1;
    let c = s[l], d = a[l];
    if (c !== d) {
      let u = n.indexOf(c), y = n.indexOf(d), b = n.indexOf("*");
      return u !== -1 || y !== -1 ? (u === -1 && (b !== -1 ? u = b : u = n.length), y === -1 && (b !== -1 ? y = b : y = n.length), u - y) : o ===
      "configure" ? 0 : c.localeCompare(d, e.locales ? e.locales : void 0, {
        numeric: !0,
        sensitivity: "accent"
      });
    }
    let p = n.indexOf(c);
    p === -1 && (p = n.indexOf("*")), n = p !== -1 && Array.isArray(n[p + 1]) ? n[p + 1] : [], l += 1;
  }
  return 0;
}, "storySort");

// src/preview-api/modules/store/sortStories.ts
var ac = /* @__PURE__ */ i((e, t, r) => {
  if (t) {
    let o;
    typeof t == "function" ? o = t : o = ws(t), e.sort(o);
  } else
    e.sort(
      (o, n) => r.indexOf(o.importPath) - r.indexOf(n.importPath)
    );
  return e;
}, "sortStoriesCommon"), Es = /* @__PURE__ */ i((e, t, r) => {
  try {
    return ac(e, t, r);
  } catch (o) {
    throw new Error(Rs.dedent`
    Error sorting stories with sort parameter ${t}:

    > ${o.message}
    
    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `);
  }
}, "sortStoriesV7");

// src/preview-api/modules/preview-web/Preview.tsx
var bt = require("storybook/internal/client-logger"), L = require("storybook/internal/core-events"), B = require("storybook/internal/preview-errors"),
Cs = require("@storybook/global");

// src/preview-api/modules/preview-web/render/StoryRender.ts
var Z = require("storybook/internal/core-events"), or = require("storybook/internal/preview-errors");

// src/preview-api/modules/preview-web/render/Render.ts
var Te = new Error("prepareAborted");

// src/preview-api/modules/preview-web/render/StoryRender.ts
var { AbortController: As } = globalThis;
function vs(e) {
  try {
    let { name: t = "Error", message: r = String(e), stack: o } = e;
    return { name: t, message: r, stack: o };
  } catch {
    return { name: "Error", message: String(e) };
  }
}
i(vs, "serializeError");
var De = class {
  constructor(t, r, o, n, s, a, l = { autoplay: !0, forceInitialArgs: !1 }, c) {
    this.channel = t;
    this.store = r;
    this.renderToScreen = o;
    this.callbacks = n;
    this.id = s;
    this.viewMode = a;
    this.renderOptions = l;
    this.type = "story";
    this.notYetRendered = !0;
    this.rerenderEnqueued = !1;
    this.disableKeyListeners = !1;
    this.teardownRender = /* @__PURE__ */ i(() => {
    }, "teardownRender");
    this.torndown = !1;
    this.abortController = new As(), c && (this.story = c, this.phase = "preparing");
  }
  static {
    i(this, "StoryRender");
  }
  async runPhase(t, r, o) {
    this.phase = r, this.channel.emit(Z.STORY_RENDER_PHASE_CHANGED, { newPhase: this.phase, storyId: this.id }), o && (await o(), this.checkIfAborted(
    t));
  }
  checkIfAborted(t) {
    return t.aborted ? (this.phase = "aborted", this.channel.emit(Z.STORY_RENDER_PHASE_CHANGED, { newPhase: this.phase, storyId: this.id }),
    !0) : !1;
  }
  async prepare() {
    if (await this.runPhase(this.abortController.signal, "preparing", async () => {
      this.story = await this.store.loadStory({ storyId: this.id });
    }), this.abortController.signal.aborted)
      throw await this.store.cleanupStory(this.story), Te;
  }
  // The two story "renders" are equal and have both loaded the same story
  isEqual(t) {
    return !!(this.id === t.id && this.story && this.story === t.story);
  }
  isPreparing() {
    return ["preparing"].includes(this.phase);
  }
  isPending() {
    return ["loading", "beforeEach", "rendering", "playing", "afterEach"].includes(
      this.phase
    );
  }
  async renderToElement(t) {
    return this.canvasElement = t, this.render({ initial: !0, forceRemount: !0 });
  }
  storyContext() {
    if (!this.story)
      throw new Error("Cannot call storyContext before preparing");
    let { forceInitialArgs: t } = this.renderOptions;
    return this.store.getStoryContext(this.story, { forceInitialArgs: t });
  }
  async render({
    initial: t = !1,
    forceRemount: r = !1
  } = {}) {
    let { canvasElement: o } = this;
    if (!this.story)
      throw new Error("cannot render when not prepared");
    let n = this.story;
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
      applyAfterEach: y,
      unboundStoryFn: b,
      playFunction: w,
      runStep: R
    } = n;
    r && !t && (this.cancelRender(), this.abortController = new As());
    let x = this.abortController.signal, A = !1, P = n.usesMount;
    try {
      let m = {
        ...this.storyContext(),
        viewMode: this.viewMode,
        abortSignal: x,
        canvasElement: o,
        loaded: {},
        step: /* @__PURE__ */ i((F, M) => R(F, M, m), "step"),
        context: null,
        canvas: {},
        userEvent: {},
        renderToCanvas: /* @__PURE__ */ i(async () => {
          let F = await this.renderToScreen(S, o);
          this.teardownRender = F || (() => {
          }), A = !0;
        }, "renderToCanvas"),
        // The story provides (set in a renderer) a mount function that is a higher order function
        // (context) => (...args) => Canvas
        //
        // Before assigning it to the context, we resolve the context dependency,
        // so that a user can just call it as await mount(...args) in their play function.
        mount: /* @__PURE__ */ i(async (...F) => {
          this.callbacks.showStoryDuringRender?.();
          let M = null;
          return await this.runPhase(x, "rendering", async () => {
            M = await n.mount(m)(...F);
          }), P && await this.runPhase(x, "playing"), M;
        }, "mount")
      };
      m.context = m;
      let S = {
        componentId: a,
        title: l,
        kind: l,
        id: s,
        name: c,
        story: c,
        tags: d,
        ...this.callbacks,
        showError: /* @__PURE__ */ i((F) => (this.phase = "errored", this.callbacks.showError(F)), "showError"),
        showException: /* @__PURE__ */ i((F) => (this.phase = "errored", this.callbacks.showException(F)), "showException"),
        forceRemount: r || this.notYetRendered,
        storyContext: m,
        storyFn: /* @__PURE__ */ i(() => b(m), "storyFn"),
        unboundStoryFn: b
      };
      if (await this.runPhase(x, "loading", async () => {
        m.loaded = await p(m);
      }), x.aborted)
        return;
      let C = await u(m);
      if (this.store.addCleanupCallbacks(n, ...C), this.checkIfAborted(x) || (!A && !P && await m.mount(), this.notYetRendered = !1, x.aborted))
        return;
      let v = this.story.parameters?.test?.dangerouslyIgnoreUnhandledErrors === !0, f = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ i((F) => {
        F.error && f.add(F.error);
      }, "onError"), g = /* @__PURE__ */ i((F) => {
        F.reason && f.add(F.reason);
      }, "onUnhandledRejection");
      if (this.renderOptions.autoplay && r && w && this.phase !== "errored") {
        window?.addEventListener?.("error", h), window?.addEventListener?.("unhandledrejection", g), this.disableKeyListeners = !0;
        try {
          if (P ? await w(m) : (m.mount = async () => {
            throw new or.MountMustBeDestructuredError({ playFunction: w.toString() });
          }, await this.runPhase(x, "playing", async () => w(m))), !A)
            throw new or.NoStoryMountedError();
          this.checkIfAborted(x), !v && f.size > 0 ? await this.runPhase(x, "errored") : await this.runPhase(x, "played");
        } catch (F) {
          if (this.callbacks.showStoryDuringRender?.(), await this.runPhase(x, "errored", async () => {
            this.channel.emit(Z.PLAY_FUNCTION_THREW_EXCEPTION, vs(F));
          }), this.story.parameters.throwPlayFunctionExceptions !== !1)
            throw F;
          console.error(F);
        }
        if (!v && f.size > 0 && this.channel.emit(
          Z.UNHANDLED_ERRORS_WHILE_PLAYING,
          Array.from(f).map(vs)
        ), this.disableKeyListeners = !1, window?.removeEventListener?.("unhandledrejection", g), window?.removeEventListener?.("error", h),
        x.aborted)
          return;
      }
      await this.runPhase(x, "completing", async () => {
        Qt() ? this.store.addCleanupCallbacks(n, Oe()) : await ke(x);
      }), await this.runPhase(x, "completed", async () => {
        this.channel.emit(Z.STORY_RENDERED, s);
      }), this.phase !== "errored" && await this.runPhase(x, "afterEach", async () => {
        await y(m);
      });
      let E = !v && f.size > 0, T = m.reporting.reports.some(
        (F) => F.status === "failed"
      ), I = E || T;
      await this.runPhase(
        x,
        "finished",
        async () => this.channel.emit(Z.STORY_FINISHED, {
          storyId: s,
          status: I ? "error" : "success",
          reporters: m.reporting.reports
        })
      );
    } catch (m) {
      this.phase = "errored", this.callbacks.showException(m), await this.runPhase(
        x,
        "finished",
        async () => this.channel.emit(Z.STORY_FINISHED, {
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
    for (let t = 0; t < 3; t += 1) {
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

// src/preview-api/modules/preview-web/Preview.tsx
var { fetch: lc } = Cs.global, cc = "./index.json", Le = class {
  constructor(t, r, o = Y.getChannel(), n = !0) {
    this.importFn = t;
    this.getProjectAnnotations = r;
    this.channel = o;
    this.storyRenders = [];
    this.storeInitializationPromise = new Promise((s, a) => {
      this.resolveStoreInitializationPromise = s, this.rejectStoreInitializationPromise = a;
    }), n && this.initialize();
  }
  static {
    i(this, "Preview");
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
        get: /* @__PURE__ */ i((t, r) => {
          if (this.storyStoreValue)
            return (0, bt.deprecate)("Accessing the Story Store is deprecated and will be removed in 9.0"), this.storyStoreValue[r];
          throw new B.StoryStoreAccessedBeforeInitializationError();
        }, "get")
      }
    );
  }
  // INITIALIZATION
  async initialize() {
    this.setupListeners();
    try {
      let t = await this.getProjectAnnotationsOrRenderError();
      await this.runBeforeAllHook(t), await this.initializeWithProjectAnnotations(t);
    } catch (t) {
      this.rejectStoreInitializationPromise(t);
    }
  }
  ready() {
    return this.storeInitializationPromise;
  }
  setupListeners() {
    this.channel.on(L.STORY_INDEX_INVALIDATED, this.onStoryIndexChanged.bind(this)), this.channel.on(L.UPDATE_GLOBALS, this.onUpdateGlobals.
    bind(this)), this.channel.on(L.UPDATE_STORY_ARGS, this.onUpdateArgs.bind(this)), this.channel.on(L.ARGTYPES_INFO_REQUEST, this.onRequestArgTypesInfo.
    bind(this)), this.channel.on(L.RESET_STORY_ARGS, this.onResetArgs.bind(this)), this.channel.on(L.FORCE_RE_RENDER, this.onForceReRender.bind(
    this)), this.channel.on(L.FORCE_REMOUNT, this.onForceRemount.bind(this));
  }
  async getProjectAnnotationsOrRenderError() {
    try {
      let t = await this.getProjectAnnotations();
      if (this.renderToCanvas = t.renderToCanvas, !this.renderToCanvas)
        throw new B.MissingRenderToCanvasError();
      return t;
    } catch (t) {
      throw this.renderPreviewEntryError("Error reading preview.js:", t), t;
    }
  }
  // If initialization gets as far as project annotations, this function runs.
  async initializeWithProjectAnnotations(t) {
    this.projectAnnotationsBeforeInitialization = t;
    try {
      let r = await this.getStoryIndexFromServer();
      return this.initializeWithStoryIndex(r);
    } catch (r) {
      throw this.renderPreviewEntryError("Error loading story index:", r), r;
    }
  }
  async runBeforeAllHook(t) {
    try {
      await this.beforeAllCleanup?.(), this.beforeAllCleanup = await t.beforeAll?.();
    } catch (r) {
      throw this.renderPreviewEntryError("Error in beforeAll hook:", r), r;
    }
  }
  async getStoryIndexFromServer() {
    let t = await lc(cc);
    if (t.status === 200)
      return t.json();
    throw new B.StoryIndexFetchError({ text: await t.text() });
  }
  // If initialization gets as far as the story index, this function runs.
  initializeWithStoryIndex(t) {
    if (!this.projectAnnotationsBeforeInitialization)
      throw new Error("Cannot call initializeWithStoryIndex until project annotations resolve");
    this.storyStoreValue = new Me(
      t,
      this.importFn,
      this.projectAnnotationsBeforeInitialization
    ), delete this.projectAnnotationsBeforeInitialization, this.setInitialGlobals(), this.resolveStoreInitializationPromise();
  }
  async setInitialGlobals() {
    this.emitGlobals();
  }
  emitGlobals() {
    if (!this.storyStoreValue)
      throw new B.CalledPreviewMethodBeforeInitializationError({ methodName: "emitGlobals" });
    let t = {
      globals: this.storyStoreValue.userGlobals.get() || {},
      globalTypes: this.storyStoreValue.projectAnnotations.globalTypes || {}
    };
    this.channel.emit(L.SET_GLOBALS, t);
  }
  // EVENT HANDLERS
  // This happens when a config file gets reloaded
  async onGetProjectAnnotationsChanged({
    getProjectAnnotations: t
  }) {
    delete this.previewEntryError, this.getProjectAnnotations = t;
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
        let t = await this.getStoryIndexFromServer();
        if (this.projectAnnotationsBeforeInitialization) {
          this.initializeWithStoryIndex(t);
          return;
        }
        await this.onStoriesChanged({ storyIndex: t });
      } catch (t) {
        throw this.renderPreviewEntryError("Error loading story index:", t), t;
      }
  }
  // This happens when a glob gets HMR-ed
  async onStoriesChanged({
    importFn: t,
    storyIndex: r
  }) {
    if (!this.storyStoreValue)
      throw new B.CalledPreviewMethodBeforeInitializationError({ methodName: "onStoriesChanged" });
    await this.storyStoreValue.onStoriesChanged({ importFn: t, storyIndex: r });
  }
  async onUpdateGlobals({
    globals: t,
    currentStory: r
  }) {
    if (this.storyStoreValue || await this.storeInitializationPromise, !this.storyStoreValue)
      throw new B.CalledPreviewMethodBeforeInitializationError({ methodName: "onUpdateGlobals" });
    if (this.storyStoreValue.userGlobals.update(t), r) {
      let { initialGlobals: o, storyGlobals: n, userGlobals: s, globals: a } = this.storyStoreValue.getStoryContext(r);
      this.channel.emit(L.GLOBALS_UPDATED, {
        initialGlobals: o,
        userGlobals: s,
        storyGlobals: n,
        globals: a
      });
    } else {
      let { initialGlobals: o, globals: n } = this.storyStoreValue.userGlobals;
      this.channel.emit(L.GLOBALS_UPDATED, {
        initialGlobals: o,
        userGlobals: n,
        storyGlobals: {},
        globals: n
      });
    }
    await Promise.all(this.storyRenders.map((o) => o.rerender()));
  }
  async onUpdateArgs({ storyId: t, updatedArgs: r }) {
    if (!this.storyStoreValue)
      throw new B.CalledPreviewMethodBeforeInitializationError({ methodName: "onUpdateArgs" });
    this.storyStoreValue.args.update(t, r), await Promise.all(
      this.storyRenders.filter((o) => o.id === t && !o.renderOptions.forceInitialArgs).map(
        (o) => (
          // We only run the play function, with in a force remount.
          // But when mount is destructured, the rendering happens inside of the play function.
          o.story && o.story.usesMount ? o.remount() : o.rerender()
        )
      )
    ), this.channel.emit(L.STORY_ARGS_UPDATED, {
      storyId: t,
      args: this.storyStoreValue.args.get(t)
    });
  }
  async onRequestArgTypesInfo({ id: t, payload: r }) {
    try {
      await this.storeInitializationPromise;
      let o = await this.storyStoreValue?.loadStory(r);
      this.channel.emit(L.ARGTYPES_INFO_RESPONSE, {
        id: t,
        success: !0,
        payload: { argTypes: o?.argTypes || {} },
        error: null
      });
    } catch (o) {
      this.channel.emit(L.ARGTYPES_INFO_RESPONSE, {
        id: t,
        success: !1,
        error: o?.message
      });
    }
  }
  async onResetArgs({ storyId: t, argNames: r }) {
    if (!this.storyStoreValue)
      throw new B.CalledPreviewMethodBeforeInitializationError({ methodName: "onResetArgs" });
    let n = this.storyRenders.find((l) => l.id === t)?.story || await this.storyStoreValue.loadStory({ storyId: t }), a = (r || [
      .../* @__PURE__ */ new Set([
        ...Object.keys(n.initialArgs),
        ...Object.keys(this.storyStoreValue.args.get(t))
      ])
    ]).reduce((l, c) => (l[c] = n.initialArgs[c], l), {});
    await this.onUpdateArgs({ storyId: t, updatedArgs: a });
  }
  // ForceReRender does not include a story id, so we simply must
  // re-render all stories in case they are relevant
  async onForceReRender() {
    await Promise.all(this.storyRenders.map((t) => t.rerender()));
  }
  async onForceRemount({ storyId: t }) {
    await Promise.all(this.storyRenders.filter((r) => r.id === t).map((r) => r.remount()));
  }
  // Used by docs to render a story to a given element
  // Note this short-circuits the `prepare()` phase of the StoryRender,
  // main to be consistent with the previous behaviour. In the future,
  // we will change it to go ahead and load the story, which will end up being
  // "instant", although async.
  renderStoryToElement(t, r, o, n) {
    if (!this.renderToCanvas || !this.storyStoreValue)
      throw new B.CalledPreviewMethodBeforeInitializationError({
        methodName: "renderStoryToElement"
      });
    let s = new De(
      this.channel,
      this.storyStoreValue,
      this.renderToCanvas,
      o,
      t.id,
      "docs",
      n,
      t
    );
    return s.renderToElement(r), this.storyRenders.push(s), async () => {
      await this.teardownRender(s);
    };
  }
  async teardownRender(t, { viewModeChanged: r } = {}) {
    this.storyRenders = this.storyRenders.filter((o) => o !== t), await t?.teardown?.({ viewModeChanged: r });
  }
  // API
  async loadStory({ storyId: t }) {
    if (!this.storyStoreValue)
      throw new B.CalledPreviewMethodBeforeInitializationError({ methodName: "loadStory" });
    return this.storyStoreValue.loadStory({ storyId: t });
  }
  getStoryContext(t, { forceInitialArgs: r = !1 } = {}) {
    if (!this.storyStoreValue)
      throw new B.CalledPreviewMethodBeforeInitializationError({ methodName: "getStoryContext" });
    return this.storyStoreValue.getStoryContext(t, { forceInitialArgs: r });
  }
  async extract(t) {
    if (!this.storyStoreValue)
      throw new B.CalledPreviewMethodBeforeInitializationError({ methodName: "extract" });
    if (this.previewEntryError)
      throw this.previewEntryError;
    return await this.storyStoreValue.cacheAllCSFFiles(), this.storyStoreValue.extract(t);
  }
  // UTILITIES
  renderPreviewEntryError(t, r) {
    this.previewEntryError = r, bt.logger.error(t), bt.logger.error(r), this.channel.emit(L.CONFIG_ERROR, r);
  }
};

// src/preview-api/modules/preview-web/PreviewWeb.tsx
var _a = require("@storybook/global");

// src/preview-api/modules/preview-web/PreviewWithSelection.tsx
var Tt = require("storybook/internal/client-logger"), k = require("storybook/internal/core-events"), se = require("storybook/internal/preview-errors");

// src/preview-api/modules/preview-web/render/CsfDocsRender.ts
var Is = require("storybook/internal/core-events");

// src/preview-api/modules/preview-web/docs-context/DocsContext.ts
var Ps = require("storybook/internal/csf"), Fs = $(te(), 1);
var fe = class {
  constructor(t, r, o, n) {
    this.channel = t;
    this.store = r;
    this.renderStoryToElement = o;
    this.storyIdByName = /* @__PURE__ */ i((t) => {
      let r = this.nameToStoryId.get(t);
      if (r)
        return r;
      throw new Error(`No story found with that name: ${t}`);
    }, "storyIdByName");
    this.componentStories = /* @__PURE__ */ i(() => this.componentStoriesValue, "componentStories");
    this.componentStoriesFromCSFFile = /* @__PURE__ */ i((t) => this.store.componentStoriesFromCSFFile({ csfFile: t }), "componentStoriesFro\
mCSFFile");
    this.storyById = /* @__PURE__ */ i((t) => {
      if (!t) {
        if (!this.primaryStory)
          throw new Error(
            "No primary story defined for docs entry. Did you forget to use `<Meta>`?"
          );
        return this.primaryStory;
      }
      let r = this.storyIdToCSFFile.get(t);
      if (!r)
        throw new Error(`Called \`storyById\` for story that was never loaded: ${t}`);
      return this.store.storyFromCSFFile({ storyId: t, csfFile: r });
    }, "storyById");
    this.getStoryContext = /* @__PURE__ */ i((t) => ({
      ...this.store.getStoryContext(t),
      loaded: {},
      viewMode: "docs"
    }), "getStoryContext");
    this.loadStory = /* @__PURE__ */ i((t) => this.store.loadStory({ storyId: t }), "loadStory");
    this.componentStoriesValue = [], this.storyIdToCSFFile = /* @__PURE__ */ new Map(), this.exportToStory = /* @__PURE__ */ new Map(), this.
    exportsToCSFFile = /* @__PURE__ */ new Map(), this.nameToStoryId = /* @__PURE__ */ new Map(), this.attachedCSFFiles = /* @__PURE__ */ new Set(),
    n.forEach((s, a) => {
      this.referenceCSFFile(s);
    });
  }
  static {
    i(this, "DocsContext");
  }
  // This docs entry references this CSF file and can synchronously load the stories, as well
  // as reference them by module export. If the CSF is part of the "component" stories, they
  // can also be referenced by name and are in the componentStories list.
  referenceCSFFile(t) {
    this.exportsToCSFFile.set(t.moduleExports, t), this.exportsToCSFFile.set(t.moduleExports.default, t), this.store.componentStoriesFromCSFFile(
    { csfFile: t }).forEach((o) => {
      let n = t.stories[o.id];
      this.storyIdToCSFFile.set(n.id, t), this.exportToStory.set(n.moduleExport, o);
    });
  }
  attachCSFFile(t) {
    if (!this.exportsToCSFFile.has(t.moduleExports))
      throw new Error("Cannot attach a CSF file that has not been referenced");
    if (this.attachedCSFFiles.has(t))
      return;
    this.attachedCSFFiles.add(t), this.store.componentStoriesFromCSFFile({ csfFile: t }).forEach((o) => {
      this.nameToStoryId.set(o.name, o.id), this.componentStoriesValue.push(o), this.primaryStory || (this.primaryStory = o);
    });
  }
  referenceMeta(t, r) {
    let o = this.resolveModuleExport(t);
    if (o.type !== "meta")
      throw new Error(
        "<Meta of={} /> must reference a CSF file module export or meta export. Did you mistakenly reference your component instead of your \
CSF file?"
      );
    r && this.attachCSFFile(o.csfFile);
  }
  get projectAnnotations() {
    let { projectAnnotations: t } = this.store;
    if (!t)
      throw new Error("Can't get projectAnnotations from DocsContext before they are initialized");
    return t;
  }
  resolveAttachedModuleExportType(t) {
    if (t === "story") {
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
    if (t === "meta")
      return { type: "meta", csfFile: r };
    let { component: o } = r.meta;
    if (!o)
      throw new Error(
        "Attached CSF file does not defined a component, did you forget to export one?"
      );
    return { type: "component", component: o };
  }
  resolveModuleExport(t) {
    let r = this.exportsToCSFFile.get(t);
    if (r)
      return { type: "meta", csfFile: r };
    let o = this.exportToStory.get(
      (0, Ps.isStory)(t) ? t.input : t
    );
    return o ? { type: "story", story: o } : { type: "component", component: t };
  }
  resolveOf(t, r = []) {
    let o;
    if (["component", "meta", "story"].includes(t)) {
      let n = t;
      o = this.resolveAttachedModuleExportType(n);
    } else
      o = this.resolveModuleExport(t);
    if (r.length && !r.includes(o.type)) {
      let n = o.type === "component" ? "component or unknown" : o.type;
      throw new Error(Fs.dedent`Invalid value passed to the 'of' prop. The value was resolved to a '${n}' type but the only types for this block are: ${r.
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

// src/preview-api/modules/preview-web/render/CsfDocsRender.ts
var St = class {
  constructor(t, r, o, n) {
    this.channel = t;
    this.store = r;
    this.entry = o;
    this.callbacks = n;
    this.type = "docs";
    this.subtype = "csf";
    this.torndown = !1;
    this.disableKeyListeners = !1;
    this.preparing = !1;
    this.id = o.id;
  }
  static {
    i(this, "CsfDocsRender");
  }
  isPreparing() {
    return this.preparing;
  }
  async prepare() {
    this.preparing = !0;
    let { entryExports: t, csfFiles: r = [] } = await this.store.loadEntry(this.id);
    if (this.torndown)
      throw Te;
    let { importPath: o, title: n } = this.entry, s = this.store.processCSFFileWithCache(
      t,
      o,
      n
    ), a = Object.keys(s.stories)[0];
    this.story = this.store.storyFromCSFFile({ storyId: a, csfFile: s }), this.csfFiles = [s, ...r], this.preparing = !1;
  }
  isEqual(t) {
    return !!(this.id === t.id && this.story && this.story === t.story);
  }
  docsContext(t) {
    if (!this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    let r = new fe(
      this.channel,
      this.store,
      t,
      this.csfFiles
    );
    return this.csfFiles.forEach((o) => r.attachCSFFile(o)), r;
  }
  async renderToElement(t, r) {
    if (!this.story || !this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    let o = this.docsContext(r), { docs: n } = this.story.parameters || {};
    if (!n)
      throw new Error(
        "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed"
      );
    let s = await n.renderer(), { render: a } = s, l = /* @__PURE__ */ i(async () => {
      try {
        await a(o, n, t), this.channel.emit(Is.DOCS_RENDERED, this.id);
      } catch (c) {
        this.callbacks.showException(c);
      }
    }, "renderDocs");
    return this.rerender = async () => l(), this.teardownRender = async ({ viewModeChanged: c }) => {
      !c || !t || s.unmount(t);
    }, l();
  }
  async teardown({ viewModeChanged: t } = {}) {
    this.teardownRender?.({ viewModeChanged: t }), this.torndown = !0;
  }
};

// src/preview-api/modules/preview-web/render/MdxDocsRender.ts
var Os = require("storybook/internal/core-events");
var xt = class {
  constructor(t, r, o, n) {
    this.channel = t;
    this.store = r;
    this.entry = o;
    this.callbacks = n;
    this.type = "docs";
    this.subtype = "mdx";
    this.torndown = !1;
    this.disableKeyListeners = !1;
    this.preparing = !1;
    this.id = o.id;
  }
  static {
    i(this, "MdxDocsRender");
  }
  isPreparing() {
    return this.preparing;
  }
  async prepare() {
    this.preparing = !0;
    let { entryExports: t, csfFiles: r = [] } = await this.store.loadEntry(this.id);
    if (this.torndown)
      throw Te;
    this.csfFiles = r, this.exports = t, this.preparing = !1;
  }
  isEqual(t) {
    return !!(this.id === t.id && this.exports && this.exports === t.exports);
  }
  docsContext(t) {
    if (!this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    return new fe(
      this.channel,
      this.store,
      t,
      this.csfFiles
    );
  }
  async renderToElement(t, r) {
    if (!this.exports || !this.csfFiles || !this.store.projectAnnotations)
      throw new Error("Cannot render docs before preparing");
    let o = this.docsContext(r), { docs: n } = this.store.projectAnnotations.parameters || {};
    if (!n)
      throw new Error(
        "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed"
      );
    let s = { ...n, page: this.exports.default }, a = await n.renderer(), { render: l } = a, c = /* @__PURE__ */ i(async () => {
      try {
        await l(o, s, t), this.channel.emit(Os.DOCS_RENDERED, this.id);
      } catch (d) {
        this.callbacks.showException(d);
      }
    }, "renderDocs");
    return this.rerender = async () => c(), this.teardownRender = async ({ viewModeChanged: d } = {}) => {
      !d || !t || (a.unmount(t), this.torndown = !0);
    }, c();
  }
  async teardown({ viewModeChanged: t } = {}) {
    this.teardownRender?.({ viewModeChanged: t }), this.torndown = !0;
  }
};

// src/preview-api/modules/preview-web/PreviewWithSelection.tsx
var dc = globalThis;
function pc(e) {
  let t = e.composedPath && e.composedPath()[0] || e.target;
  return /input|textarea/i.test(t.tagName) || t.getAttribute("contenteditable") !== null;
}
i(pc, "focusInInput");
var ks = "attached-mdx", uc = "unattached-mdx";
function fc({ tags: e }) {
  return e?.includes(uc) || e?.includes(ks);
}
i(fc, "isMdxEntry");
function yo(e) {
  return e.type === "story";
}
i(yo, "isStoryRender");
function mc(e) {
  return e.type === "docs";
}
i(mc, "isDocsRender");
function yc(e) {
  return mc(e) && e.subtype === "csf";
}
i(yc, "isCsfDocsRender");
var _e = class extends Le {
  constructor(r, o, n, s) {
    super(r, o, void 0, !1);
    this.importFn = r;
    this.getProjectAnnotations = o;
    this.selectionStore = n;
    this.view = s;
    this.initialize();
  }
  static {
    i(this, "PreviewWithSelection");
  }
  setupListeners() {
    super.setupListeners(), dc.onkeydown = this.onKeydown.bind(this), this.channel.on(k.SET_CURRENT_STORY, this.onSetCurrentStory.bind(this)),
    this.channel.on(k.UPDATE_QUERY_PARAMS, this.onUpdateQueryParams.bind(this)), this.channel.on(k.PRELOAD_ENTRIES, this.onPreloadStories.bind(
    this));
  }
  async setInitialGlobals() {
    if (!this.storyStoreValue)
      throw new se.CalledPreviewMethodBeforeInitializationError({ methodName: "setInitialGlobals" });
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
      throw new se.CalledPreviewMethodBeforeInitializationError({
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
    let { storySpecifier: r, args: o } = this.selectionStore.selectionSpecifier, n = this.storyStoreValue.storyIndex.entryFromSpecifier(r);
    if (!n) {
      r === "*" ? this.renderStoryLoadingException(r, new se.EmptyIndexError()) : this.renderStoryLoadingException(
        r,
        new se.NoStoryMatchError({ storySpecifier: r.toString() })
      );
      return;
    }
    let { id: s, type: a } = n;
    this.selectionStore.setSelection({ storyId: s, viewMode: a }), this.channel.emit(k.STORY_SPECIFIED, this.selectionStore.selection), this.
    channel.emit(k.CURRENT_STORY_WAS_SET, this.selectionStore.selection), await this.renderSelection({ persistedArgs: o });
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
    if (!this.storyRenders.find((o) => o.disableKeyListeners) && !pc(r)) {
      let { altKey: o, ctrlKey: n, metaKey: s, shiftKey: a, key: l, code: c, keyCode: d } = r;
      this.channel.emit(k.PREVIEW_KEYDOWN, {
        event: { altKey: o, ctrlKey: n, metaKey: s, shiftKey: a, key: l, code: c, keyCode: d }
      });
    }
  }
  async onSetCurrentStory(r) {
    this.selectionStore.setSelection({ viewMode: "story", ...r }), await this.storeInitializationPromise, this.channel.emit(k.CURRENT_STORY_WAS_SET,
    this.selectionStore.selection), this.renderSelection();
  }
  onUpdateQueryParams(r) {
    this.selectionStore.setQueryParams(r);
  }
  async onUpdateGlobals({ globals: r }) {
    let o = this.currentRender instanceof De && this.currentRender.story || void 0;
    super.onUpdateGlobals({ globals: r, currentStory: o }), (this.currentRender instanceof xt || this.currentRender instanceof St) && await this.
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
      throw new se.CalledPreviewMethodBeforeInitializationError({ methodName: "renderSelection" });
    let { selection: n } = this.selectionStore;
    if (!n)
      throw new Error("Cannot call renderSelection as no selection was made");
    let { storyId: s } = n, a;
    try {
      a = await this.storyStoreValue.storyIdToEntry(s);
    } catch (b) {
      this.currentRender && await this.teardownRender(this.currentRender), this.renderStoryLoadingException(s, b);
      return;
    }
    let l = this.currentSelection?.storyId !== s, c = this.currentRender?.type !== a.type;
    a.type === "story" ? this.view.showPreparingStory({ immediate: c }) : this.view.showPreparingDocs({ immediate: c }), this.currentRender?.
    isPreparing() && await this.teardownRender(this.currentRender);
    let d;
    a.type === "story" ? d = new De(
      this.channel,
      this.storyStoreValue,
      o,
      this.mainStoryCallbacks(s),
      s,
      "story"
    ) : fc(a) ? d = new xt(
      this.channel,
      this.storyStoreValue,
      a,
      this.mainStoryCallbacks(s)
    ) : d = new St(
      this.channel,
      this.storyStoreValue,
      a,
      this.mainStoryCallbacks(s)
    );
    let p = this.currentSelection;
    this.currentSelection = n;
    let u = this.currentRender;
    this.currentRender = d;
    try {
      await d.prepare();
    } catch (b) {
      u && await this.teardownRender(u), b !== Te && this.renderStoryLoadingException(s, b);
      return;
    }
    let y = !l && u && !d.isEqual(u);
    if (r && yo(d) && (ge(!!d.story), this.storyStoreValue.args.updateFromPersisted(d.story, r)), u && !u.torndown && !l && !y && !c) {
      this.currentRender = u, this.channel.emit(k.STORY_UNCHANGED, s), this.view.showMain();
      return;
    }
    if (u && await this.teardownRender(u, { viewModeChanged: c }), p && (l || c) && this.channel.emit(k.STORY_CHANGED, s), yo(d)) {
      ge(!!d.story);
      let {
        parameters: b,
        initialArgs: w,
        argTypes: R,
        unmappedArgs: x,
        initialGlobals: A,
        userGlobals: P,
        storyGlobals: m,
        globals: S
      } = this.storyStoreValue.getStoryContext(d.story);
      this.channel.emit(k.STORY_PREPARED, {
        id: s,
        parameters: b,
        initialArgs: w,
        argTypes: R,
        args: x
      }), this.channel.emit(k.GLOBALS_UPDATED, { userGlobals: P, storyGlobals: m, globals: S, initialGlobals: A });
    } else {
      let { parameters: b } = this.storyStoreValue.projectAnnotations, { initialGlobals: w, globals: R } = this.storyStoreValue.userGlobals;
      if (this.channel.emit(k.GLOBALS_UPDATED, {
        globals: R,
        initialGlobals: w,
        storyGlobals: {},
        userGlobals: R
      }), yc(d) || d.entry.tags?.includes(ks)) {
        if (!d.csfFiles)
          throw new se.MdxFileWithNoCsfReferencesError({ storyId: s });
        ({ parameters: b } = this.storyStoreValue.preparedMetaFromCSFFile({
          csfFile: d.csfFiles[0]
        }));
      }
      this.channel.emit(k.DOCS_PREPARED, {
        id: s,
        parameters: b
      });
    }
    yo(d) ? (ge(!!d.story), this.storyRenders.push(d), this.currentRender.renderToElement(
      this.view.prepareForStory(d.story)
    )) : this.currentRender.renderToElement(
      this.view.prepareForDocs(),
      // This argument is used for docs, which is currently only compatible with HTMLElements
      this.renderStoryToElement.bind(this)
    );
  }
  async teardownRender(r, { viewModeChanged: o = !1 } = {}) {
    this.storyRenders = this.storyRenders.filter((n) => n !== r), await r?.teardown?.({ viewModeChanged: o });
  }
  // UTILITIES
  mainStoryCallbacks(r) {
    return {
      showStoryDuringRender: /* @__PURE__ */ i(() => this.view.showStoryDuringRender(), "showStoryDuringRender"),
      showMain: /* @__PURE__ */ i(() => this.view.showMain(), "showMain"),
      showError: /* @__PURE__ */ i((o) => this.renderError(r, o), "showError"),
      showException: /* @__PURE__ */ i((o) => this.renderException(r, o), "showException")
    };
  }
  renderPreviewEntryError(r, o) {
    super.renderPreviewEntryError(r, o), this.view.showErrorDisplay(o);
  }
  renderMissingStory() {
    this.view.showNoPreview(), this.channel.emit(k.STORY_MISSING);
  }
  renderStoryLoadingException(r, o) {
    Tt.logger.error(o), this.view.showErrorDisplay(o), this.channel.emit(k.STORY_MISSING, r);
  }
  // renderException is used if we fail to render the story and it is uncaught by the app layer
  renderException(r, o) {
    let { name: n = "Error", message: s = String(o), stack: a } = o;
    this.channel.emit(k.STORY_THREW_EXCEPTION, { name: n, message: s, stack: a }), this.channel.emit(k.STORY_RENDER_PHASE_CHANGED, { newPhase: "\
errored", storyId: r }), this.view.showErrorDisplay(o), Tt.logger.error(`Error rendering story '${r}':`), Tt.logger.error(o);
  }
  // renderError is used by the various app layers to inform the user they have done something
  // wrong -- for instance returned the wrong thing from a story
  renderError(r, { title: o, description: n }) {
    Tt.logger.error(`Error rendering story ${o}: ${n}`), this.channel.emit(k.STORY_ERRORED, { title: o, description: n }), this.channel.emit(
    k.STORY_RENDER_PHASE_CHANGED, { newPhase: "errored", storyId: r }), this.view.showErrorDisplay({
      message: o,
      stack: n
    });
  }
};

// src/preview-api/modules/preview-web/UrlStore.ts
var Xs = require("@storybook/global"), Rt = $(lr(), 1);

// src/preview-api/modules/preview-web/parseArgsParam.ts
var Us = require("storybook/internal/client-logger");
var Vs = $(lr(), 1), Ws = $(te(), 1);
var zs = /^[a-zA-Z0-9 _-]*$/, Ys = /^-?[0-9]+(\.[0-9]+)?$/, $c = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i, Ks = /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i,
wo = /* @__PURE__ */ i((e = "", t) => e === null || e === "" || !zs.test(e) ? !1 : t == null || t instanceof Date || typeof t == "number" ||
typeof t == "boolean" ? !0 : typeof t == "string" ? zs.test(t) || Ys.test(t) || $c.test(t) || Ks.test(t) : Array.isArray(t) ? t.every((r) => wo(
e, r)) : z(t) ? Object.entries(t).every(([r, o]) => wo(r, o)) : !1, "validateArgs"), Bc = {
  delimiter: ";",
  // we're parsing a single query param
  nesting: !0,
  arrayRepeat: !0,
  arrayRepeatSyntax: "bracket",
  nestingSyntax: "js",
  // objects are encoded using dot notation
  valueDeserializer(e) {
    if (e.startsWith("!")) {
      if (e === "!undefined")
        return;
      if (e === "!null")
        return null;
      if (e === "!true")
        return !0;
      if (e === "!false")
        return !1;
      if (e.startsWith("!date(") && e.endsWith(")"))
        return new Date(e.replaceAll(" ", "+").slice(6, -1));
      if (e.startsWith("!hex(") && e.endsWith(")"))
        return `#${e.slice(5, -1)}`;
      let t = e.slice(1).match(Ks);
      if (t)
        return e.startsWith("!rgba") || e.startsWith("!RGBA") ? `${t[1]}(${t[2]}, ${t[3]}, ${t[4]}, ${t[5]})` : e.startsWith("!hsla") || e.startsWith(
        "!HSLA") ? `${t[1]}(${t[2]}, ${t[3]}%, ${t[4]}%, ${t[5]})` : e.startsWith("!rgb") || e.startsWith("!RGB") ? `${t[1]}(${t[2]}, ${t[3]}\
, ${t[4]})` : `${t[1]}(${t[2]}, ${t[3]}%, ${t[4]}%)`;
    }
    return Ys.test(e) ? Number(e) : e;
  }
}, Ro = /* @__PURE__ */ i((e) => {
  let t = e.split(";").map((r) => r.replace("=", "~").replace(":", "="));
  return Object.entries((0, Vs.parse)(t.join(";"), Bc)).reduce((r, [o, n]) => wo(o, n) ? Object.assign(r, { [o]: n }) : (Us.once.warn(Ws.dedent`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/writing-stories/args#setting-args-through-the-url
    `), r), {});
}, "parseArgsParam");

// src/preview-api/modules/preview-web/UrlStore.ts
var { history: Js, document: we } = Xs.global;
function Gc(e) {
  let t = (e || "").match(/^\/story\/(.+)/);
  if (!t)
    throw new Error(`Invalid path '${e}',  must start with '/story/'`);
  return t[1];
}
i(Gc, "pathToId");
var Zs = /* @__PURE__ */ i(({
  selection: e,
  extraParams: t
}) => {
  let r = we?.location.search.slice(1), { path: o, selectedKind: n, selectedStory: s, ...a } = (0, Rt.parse)(r);
  return `?${(0, Rt.stringify)({
    ...a,
    ...t,
    ...e && { id: e.storyId, viewMode: e.viewMode }
  })}`;
}, "getQueryString"), zc = /* @__PURE__ */ i((e) => {
  if (!e)
    return;
  let t = Zs({ selection: e }), { hash: r = "" } = we.location;
  we.title = e.storyId, Js.replaceState({}, "", `${we.location.pathname}${t}${r}`);
}, "setPath"), Uc = /* @__PURE__ */ i((e) => e != null && typeof e == "object" && Array.isArray(e) === !1, "isObject"), wt = /* @__PURE__ */ i(
(e) => {
  if (e !== void 0) {
    if (typeof e == "string")
      return e;
    if (Array.isArray(e))
      return wt(e[0]);
    if (Uc(e))
      return wt(
        Object.values(e).filter(Boolean)
      );
  }
}, "getFirstString"), Vc = /* @__PURE__ */ i(() => {
  if (typeof we < "u") {
    let e = we.location.search.slice(1), t = (0, Rt.parse)(e), r = typeof t.args == "string" ? Ro(t.args) : void 0, o = typeof t.globals == "\
string" ? Ro(t.globals) : void 0, n = wt(t.viewMode);
    (typeof n != "string" || !n.match(/docs|story/)) && (n = "story");
    let s = wt(t.path), a = s ? Gc(s) : wt(t.id);
    if (a)
      return { storySpecifier: a, args: r, globals: o, viewMode: n };
  }
  return null;
}, "getSelectionSpecifierFromPath"), qe = class {
  static {
    i(this, "UrlStore");
  }
  constructor() {
    this.selectionSpecifier = Vc();
  }
  setSelection(t) {
    this.selection = t, zc(this.selection);
  }
  setQueryParams(t) {
    let r = Zs({ extraParams: t }), { hash: o = "" } = we.location;
    Js.replaceState({}, "", `${we.location.pathname}${r}${o}`);
  }
};

// src/preview-api/modules/preview-web/WebView.ts
var Ia = require("storybook/internal/client-logger"), Oa = require("@storybook/global"), ka = $(Ca(), 1), Ma = $(lr(), 1), Da = $(te(), 1);
var { document: G } = Oa.global, Pa = 100, La = /* @__PURE__ */ ((s) => (s.MAIN = "MAIN", s.NOPREVIEW = "NOPREVIEW", s.PREPARING_STORY = "PR\
EPARING_STORY", s.PREPARING_DOCS = "PREPARING_DOCS", s.ERROR = "ERROR", s))(La || {}), Io = {
  PREPARING_STORY: "sb-show-preparing-story",
  PREPARING_DOCS: "sb-show-preparing-docs",
  MAIN: "sb-show-main",
  NOPREVIEW: "sb-show-nopreview",
  ERROR: "sb-show-errordisplay"
}, Oo = {
  centered: "sb-main-centered",
  fullscreen: "sb-main-fullscreen",
  padded: "sb-main-padded"
}, Fa = new ka.default({
  escapeXML: !0
}), $e = class {
  constructor() {
    this.testing = !1;
    if (typeof G < "u") {
      let { __SPECIAL_TEST_PARAMETER__: t } = (0, Ma.parse)(G.location.search.slice(1));
      switch (t) {
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
  static {
    i(this, "WebView");
  }
  // Get ready to render a story, returning the element to render to
  prepareForStory(t) {
    return this.showStory(), this.applyLayout(t.parameters.layout), G.documentElement.scrollTop = 0, G.documentElement.scrollLeft = 0, this.
    storyRoot();
  }
  storyRoot() {
    return G.getElementById("storybook-root");
  }
  prepareForDocs() {
    return this.showMain(), this.showDocs(), this.applyLayout("fullscreen"), G.documentElement.scrollTop = 0, G.documentElement.scrollLeft =
    0, this.docsRoot();
  }
  docsRoot() {
    return G.getElementById("storybook-docs");
  }
  applyLayout(t = "padded") {
    if (t === "none") {
      G.body.classList.remove(this.currentLayoutClass), this.currentLayoutClass = null;
      return;
    }
    this.checkIfLayoutExists(t);
    let r = Oo[t];
    G.body.classList.remove(this.currentLayoutClass), G.body.classList.add(r), this.currentLayoutClass = r;
  }
  checkIfLayoutExists(t) {
    Oo[t] || Ia.logger.warn(
      Da.dedent`
          The desired layout: ${t} is not a valid option.
          The possible options are: ${Object.keys(Oo).join(", ")}, none.
        `
    );
  }
  showMode(t) {
    clearTimeout(this.preparingTimeout), Object.keys(La).forEach((r) => {
      r === t ? G.body.classList.add(Io[r]) : G.body.classList.remove(Io[r]);
    });
  }
  showErrorDisplay({ message: t = "", stack: r = "" }) {
    let o = t, n = r, s = t.split(`
`);
    s.length > 1 && ([o] = s, n = s.slice(1).join(`
`).replace(/^\n/, "")), G.getElementById("error-message").innerHTML = Fa.toHtml(o), G.getElementById("error-stack").innerHTML = Fa.toHtml(n),
    this.showMode("ERROR");
  }
  showNoPreview() {
    this.testing || (this.showMode("NOPREVIEW"), this.storyRoot()?.setAttribute("hidden", "true"), this.docsRoot()?.setAttribute("hidden", "\
true"));
  }
  showPreparingStory({ immediate: t = !1 } = {}) {
    clearTimeout(this.preparingTimeout), t ? this.showMode("PREPARING_STORY") : this.preparingTimeout = setTimeout(
      () => this.showMode("PREPARING_STORY"),
      Pa
    );
  }
  showPreparingDocs({ immediate: t = !1 } = {}) {
    clearTimeout(this.preparingTimeout), t ? this.showMode("PREPARING_DOCS") : this.preparingTimeout = setTimeout(() => this.showMode("PREPA\
RING_DOCS"), Pa);
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
    G.body.classList.add(Io.MAIN);
  }
};

// src/preview-api/modules/preview-web/PreviewWeb.tsx
var At = class extends _e {
  constructor(r, o) {
    super(r, o, new qe(), new $e());
    this.importFn = r;
    this.getProjectAnnotations = o;
    _a.global.__STORYBOOK_PREVIEW__ = this;
  }
  static {
    i(this, "PreviewWeb");
  }
};

// src/preview-api/modules/preview-web/simulate-pageload.ts
var Na = require("@storybook/global");
var { document: Be } = Na.global, Cd = [
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
], Pd = "script", ja = "scripts-root";
function vt() {
  let e = Be.createEvent("Event");
  e.initEvent("DOMContentLoaded", !0, !0), Be.dispatchEvent(e);
}
i(vt, "simulateDOMContentLoaded");
function Fd(e, t, r) {
  let o = Be.createElement("script");
  o.type = e.type === "module" ? "module" : "text/javascript", e.src ? (o.onload = t, o.onerror = t, o.src = e.src) : o.textContent = e.innerText,
  r ? r.appendChild(o) : Be.head.appendChild(o), e.parentNode.removeChild(e), e.src || t();
}
i(Fd, "insertScript");
function qa(e, t, r = 0) {
  e[r](() => {
    r++, r === e.length ? t() : qa(e, t, r);
  });
}
i(qa, "insertScriptsSequentially");
function ko(e) {
  let t = Be.getElementById(ja);
  t ? t.innerHTML = "" : (t = Be.createElement("div"), t.id = ja, Be.body.appendChild(t));
  let r = Array.from(e.querySelectorAll(Pd));
  if (r.length) {
    let o = [];
    r.forEach((n) => {
      let s = n.getAttribute("type");
      (!s || Cd.includes(s)) && o.push((a) => Fd(n, a, t));
    }), o.length && qa(o, vt, void 0);
  } else
    vt();
}
i(ko, "simulatePageLoad");

// src/docs-tools/shared.ts
var Ha = "storybook/docs", rg = `${Ha}/panel`;
var $a = `${Ha}/snippet-rendered`;

// src/preview-api/modules/preview-web/emitTransformCode.ts
async function Mo(e, t) {
  let r = t.parameters?.docs?.source?.transform, { id: o, unmappedArgs: n } = t, s = r && e ? r?.(e, t) : e, a = s ? await s : void 0;
  Y.getChannel().emit($a, {
    id: o,
    source: a,
    args: n
  });
}
i(Mo, "emitTransformCode");
