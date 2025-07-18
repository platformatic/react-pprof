var of = Object.create;
var Mr = Object.defineProperty;
var nf = Object.getOwnPropertyDescriptor;
var af = Object.getOwnPropertyNames;
var sf = Object.getPrototypeOf, lf = Object.prototype.hasOwnProperty;
var a = (e, t) => Mr(e, "name", { value: t, configurable: !0 }), rr = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy <
"u" ? new Proxy(e, {
  get: (t, r) => (typeof require < "u" ? require : t)[r]
}) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
});
var V = (e, t) => () => (e && (t = e(e = 0)), t);
var K = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), cf = (e, t) => {
  for (var r in t)
    Mr(e, r, { get: t[r], enumerable: !0 });
}, pf = (e, t, r, o) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let n of af(t))
      !lf.call(e, n) && n !== r && Mr(e, n, { get: () => t[n], enumerable: !(o = nf(t, n)) || o.enumerable });
  return e;
};
var Ce = (e, t, r) => (r = e != null ? of(sf(e)) : {}, pf(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  t || !e || !e.__esModule ? Mr(r, "default", { value: e, enumerable: !0 }) : r,
  e
));

// ../node_modules/es-toolkit/dist/compat/predicate/isSymbol.mjs
function Fr(e) {
  return typeof e == "symbol" || e instanceof Symbol;
}
var un = V(() => {
  a(Fr, "isSymbol");
});

// ../node_modules/es-toolkit/dist/compat/util/toNumber.mjs
function Ni(e) {
  return Fr(e) ? NaN : Number(e);
}
var _i = V(() => {
  un();
  a(Ni, "toNumber");
});

// ../node_modules/es-toolkit/dist/compat/util/toFinite.mjs
function Di(e) {
  return e ? (e = Ni(e), e === 1 / 0 || e === -1 / 0 ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0) : e === 0 ? e : 0;
}
var Bi = V(() => {
  _i();
  a(Di, "toFinite");
});

// ../node_modules/es-toolkit/dist/compat/util/toInteger.mjs
function Mi(e) {
  let t = Di(e), r = t % 1;
  return r ? t - r : t;
}
var Fi = V(() => {
  Bi();
  a(Mi, "toInteger");
});

// ../node_modules/es-toolkit/dist/array/uniq.mjs
function ji(e) {
  return Array.from(new Set(e));
}
var Ri = V(() => {
  a(ji, "uniq");
});

// ../node_modules/es-toolkit/dist/predicate/isPrimitive.mjs
function Hi(e) {
  return e == null || typeof e != "object" && typeof e != "function";
}
var Vi = V(() => {
  a(Hi, "isPrimitive");
});

// ../node_modules/es-toolkit/dist/predicate/isTypedArray.mjs
function jr(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
var dn = V(() => {
  a(jr, "isTypedArray");
});

// ../node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function Rr(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
var fn = V(() => {
  a(Rr, "getSymbols");
});

// ../node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function zi(e) {
  return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
var $i = V(() => {
  a(zi, "getTag");
});

// ../node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var Ui, Hr, Vr, zr, $r, qi, Wi, Gi, Ji, Ki, Yi, Xi, Zi, Qi, es, ts, rs, os, ns, as, is, ss, mn = V(() => {
  Ui = "[object RegExp]", Hr = "[object String]", Vr = "[object Number]", zr = "[object Boolean]", $r = "[object Arguments]", qi = "[object \
Symbol]", Wi = "[object Date]", Gi = "[object Map]", Ji = "[object Set]", Ki = "[object Array]", Yi = "[object ArrayBuffer]", Xi = "[object \
Object]", Zi = "[object DataView]", Qi = "[object Uint8Array]", es = "[object Uint8ClampedArray]", ts = "[object Uint16Array]", rs = "[objec\
t Uint32Array]", os = "[object Int8Array]", ns = "[object Int16Array]", as = "[object Int32Array]", is = "[object Float32Array]", ss = "[obj\
ect Float64Array]";
});

// ../node_modules/es-toolkit/dist/object/cloneDeepWith.mjs
function ls(e, t) {
  return Mt(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function Mt(e, t, r, o = /* @__PURE__ */ new Map(), n = void 0) {
  let i = n?.(e, t, r, o);
  if (i != null)
    return i;
  if (Hi(e))
    return e;
  if (o.has(e))
    return o.get(e);
  if (Array.isArray(e)) {
    let s = new Array(e.length);
    o.set(e, s);
    for (let l = 0; l < e.length; l++)
      s[l] = Mt(e[l], l, r, o, n);
    return Object.hasOwn(e, "index") && (s.index = e.index), Object.hasOwn(e, "input") && (s.input = e.input), s;
  }
  if (e instanceof Date)
    return new Date(e.getTime());
  if (e instanceof RegExp) {
    let s = new RegExp(e.source, e.flags);
    return s.lastIndex = e.lastIndex, s;
  }
  if (e instanceof Map) {
    let s = /* @__PURE__ */ new Map();
    o.set(e, s);
    for (let [l, c] of e)
      s.set(l, Mt(c, l, r, o, n));
    return s;
  }
  if (e instanceof Set) {
    let s = /* @__PURE__ */ new Set();
    o.set(e, s);
    for (let l of e)
      s.add(Mt(l, void 0, r, o, n));
    return s;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(e))
    return e.subarray();
  if (jr(e)) {
    let s = new (Object.getPrototypeOf(e)).constructor(e.length);
    o.set(e, s);
    for (let l = 0; l < e.length; l++)
      s[l] = Mt(e[l], l, r, o, n);
    return s;
  }
  if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer)
    return e.slice(0);
  if (e instanceof DataView) {
    let s = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
    return o.set(e, s), rt(s, e, r, o, n), s;
  }
  if (typeof File < "u" && e instanceof File) {
    let s = new File([e], e.name, {
      type: e.type
    });
    return o.set(e, s), rt(s, e, r, o, n), s;
  }
  if (e instanceof Blob) {
    let s = new Blob([e], { type: e.type });
    return o.set(e, s), rt(s, e, r, o, n), s;
  }
  if (e instanceof Error) {
    let s = new e.constructor();
    return o.set(e, s), s.message = e.message, s.name = e.name, s.stack = e.stack, s.cause = e.cause, rt(s, e, r, o, n), s;
  }
  if (typeof e == "object" && uf(e)) {
    let s = Object.create(Object.getPrototypeOf(e));
    return o.set(e, s), rt(s, e, r, o, n), s;
  }
  return e;
}
function rt(e, t, r = e, o, n) {
  let i = [...Object.keys(t), ...Rr(t)];
  for (let s = 0; s < i.length; s++) {
    let l = i[s], c = Object.getOwnPropertyDescriptor(e, l);
    (c == null || c.writable) && (e[l] = Mt(t[l], l, r, o, n));
  }
}
function uf(e) {
  switch (zi(e)) {
    case $r:
    case Ki:
    case Yi:
    case Zi:
    case zr:
    case Wi:
    case is:
    case ss:
    case os:
    case ns:
    case as:
    case Gi:
    case Vr:
    case Xi:
    case Ui:
    case Ji:
    case Hr:
    case qi:
    case Qi:
    case es:
    case ts:
    case rs:
      return !0;
    default:
      return !1;
  }
}
var cs = V(() => {
  fn();
  $i();
  mn();
  Vi();
  dn();
  a(ls, "cloneDeepWith");
  a(Mt, "cloneDeepWithImpl");
  a(rt, "copyProperties");
  a(uf, "isCloneableObject");
});

// ../node_modules/es-toolkit/dist/predicate/isLength.mjs
function ps(e) {
  return Number.isSafeInteger(e) && e >= 0;
}
var us = V(() => {
  a(ps, "isLength");
});

// ../node_modules/es-toolkit/dist/compat/predicate/isArrayLike.mjs
function Ft(e) {
  return e != null && typeof e != "function" && ps(e.length);
}
var Ur = V(() => {
  us();
  a(Ft, "isArrayLike");
});

// ../node_modules/es-toolkit/dist/compat/object/cloneDeepWith.mjs
function ds(e, t) {
  return ls(e, (r, o, n, i) => {
    let s = t?.(r, o, n, i);
    if (s != null)
      return s;
    if (typeof e == "object")
      switch (Object.prototype.toString.call(e)) {
        case Vr:
        case Hr:
        case zr: {
          let l = new e.constructor(e?.valueOf());
          return rt(l, e), l;
        }
        case $r: {
          let l = {};
          return rt(l, e), l.length = e.length, l[Symbol.iterator] = e[Symbol.iterator], l;
        }
        default:
          return;
      }
  });
}
var fs = V(() => {
  cs();
  mn();
  a(ds, "cloneDeepWith");
});

// ../node_modules/es-toolkit/dist/compat/object/cloneDeep.mjs
function gn(e) {
  return ds(e);
}
var ms = V(() => {
  fs();
  a(gn, "cloneDeep");
});

// ../node_modules/es-toolkit/dist/math/range.mjs
function gs(e, t, r = 1) {
  if (t == null && (t = e, e = 0), !Number.isInteger(r) || r === 0)
    throw new Error("The step value must be a non-zero integer.");
  let o = Math.max(Math.ceil((t - e) / r), 0), n = new Array(o);
  for (let i = 0; i < o; i++)
    n[i] = e + i * r;
  return n;
}
var hs = V(() => {
  a(gs, "range");
});

// ../node_modules/es-toolkit/dist/compat/array/uniq.mjs
function hn(e) {
  return Ft(e) ? ji(Array.from(e)) : [];
}
var bs = V(() => {
  Ri();
  Ur();
  a(hn, "uniq");
});

// ../node_modules/es-toolkit/dist/function/debounce.mjs
function ys(e, t, { signal: r, edges: o } = {}) {
  let n, i = null, s = o != null && o.includes("leading"), l = o == null || o.includes("trailing"), c = /* @__PURE__ */ a(() => {
    i !== null && (e.apply(n, i), n = void 0, i = null);
  }, "invoke"), u = /* @__PURE__ */ a(() => {
    l && c(), m();
  }, "onTimerEnd"), d = null, g = /* @__PURE__ */ a(() => {
    d != null && clearTimeout(d), d = setTimeout(() => {
      d = null, u();
    }, t);
  }, "schedule"), p = /* @__PURE__ */ a(() => {
    d !== null && (clearTimeout(d), d = null);
  }, "cancelTimer"), m = /* @__PURE__ */ a(() => {
    p(), n = void 0, i = null;
  }, "cancel"), f = /* @__PURE__ */ a(() => {
    p(), c();
  }, "flush"), h = /* @__PURE__ */ a(function(...b) {
    if (r?.aborted)
      return;
    n = this, i = b;
    let y = d == null;
    g(), s && y && c();
  }, "debounced");
  return h.schedule = g, h.cancel = m, h.flush = f, r?.addEventListener("abort", m, { once: !0 }), h;
}
var xs = V(() => {
  a(ys, "debounce");
});

// ../node_modules/es-toolkit/dist/compat/function/debounce.mjs
function bn(e, t = 0, r = {}) {
  typeof r != "object" && (r = {});
  let { signal: o, leading: n = !1, trailing: i = !0, maxWait: s } = r, l = Array(2);
  n && (l[0] = "leading"), i && (l[1] = "trailing");
  let c, u = null, d = ys(function(...m) {
    c = e.apply(this, m), u = null;
  }, t, { signal: o, edges: l }), g = /* @__PURE__ */ a(function(...m) {
    if (s != null) {
      if (u === null)
        u = Date.now();
      else if (Date.now() - u >= s)
        return c = e.apply(this, m), u = Date.now(), d.cancel(), d.schedule(), c;
    }
    return d.apply(this, m), c;
  }, "debounced"), p = /* @__PURE__ */ a(() => (d.flush(), c), "flush");
  return g.cancel = d.cancel, g.flush = p, g;
}
var vs = V(() => {
  xs();
  a(bn, "debounce");
});

// ../node_modules/es-toolkit/dist/predicate/isBuffer.mjs
function Es(e) {
  return typeof Buffer < "u" && Buffer.isBuffer(e);
}
var Ss = V(() => {
  a(Es, "isBuffer");
});

// ../node_modules/es-toolkit/dist/compat/_internal/isPrototype.mjs
function Cs(e) {
  let t = e?.constructor, r = typeof t == "function" ? t.prototype : Object.prototype;
  return e === r;
}
var ws = V(() => {
  a(Cs, "isPrototype");
});

// ../node_modules/es-toolkit/dist/compat/predicate/isTypedArray.mjs
function Ts(e) {
  return jr(e);
}
var As = V(() => {
  dn();
  a(Ts, "isTypedArray");
});

// ../node_modules/es-toolkit/dist/compat/util/times.mjs
function ks(e, t) {
  if (e = Mi(e), e < 1 || !Number.isSafeInteger(e))
    return [];
  let r = new Array(e);
  for (let o = 0; o < e; o++)
    r[o] = typeof t == "function" ? t(o) : o;
  return r;
}
var Os = V(() => {
  Fi();
  a(ks, "times");
});

// ../node_modules/es-toolkit/dist/compat/object/keysIn.mjs
function Is(e) {
  if (e == null)
    return [];
  switch (typeof e) {
    case "object":
    case "function":
      return Ft(e) ? ff(e) : Cs(e) ? df(e) : qr(e);
    default:
      return qr(Object(e));
  }
}
function qr(e) {
  let t = [];
  for (let r in e)
    t.push(r);
  return t;
}
function df(e) {
  return qr(e).filter((r) => r !== "constructor");
}
function ff(e) {
  let t = ks(e.length, (o) => `${o}`), r = new Set(t);
  return Es(e) && (r.add("offset"), r.add("parent")), Ts(e) && (r.add("buffer"), r.add("byteLength"), r.add("byteOffset")), [...t, ...qr(e).
  filter((o) => !r.has(o))];
}
var Ps = V(() => {
  Ss();
  ws();
  Ur();
  As();
  Os();
  a(Is, "keysIn");
  a(qr, "keysInImpl");
  a(df, "prototypeKeysIn");
  a(ff, "arrayLikeKeysIn");
});

// ../node_modules/es-toolkit/dist/compat/_internal/getSymbolsIn.mjs
function Ls(e) {
  let t = [];
  for (; e; )
    t.push(...Rr(e)), e = Object.getPrototypeOf(e);
  return t;
}
var Ns = V(() => {
  fn();
  a(Ls, "getSymbolsIn");
});

// ../node_modules/es-toolkit/dist/compat/object/pickBy.mjs
function yn(e, t) {
  if (e == null)
    return {};
  let r = {};
  if (t == null)
    return e;
  let o = Ft(e) ? gs(0, e.length) : [...Is(e), ...Ls(e)];
  for (let n = 0; n < o.length; n++) {
    let i = Fr(o[n]) ? o[n] : o[n].toString(), s = e[i];
    t(s, i, e) && (r[i] = s);
  }
  return r;
}
var _s = V(() => {
  Ps();
  hs();
  Ns();
  Ur();
  un();
  a(yn, "pickBy");
});

// ../node_modules/es-toolkit/dist/compat/index.mjs
var or = V(() => {
  bs();
  vs();
  ms();
  _s();
});

// ../addons/docs/src/blocks/controls/helpers.ts
var Z, ct, Ne = V(() => {
  "use strict";
  Z = /* @__PURE__ */ a((e) => `control-${e.replace(/\s+/g, "-")}`, "getControlId"), ct = /* @__PURE__ */ a((e) => `set-${e.replace(/\s+/g, "\
-")}`, "getControlSetterButtonId");
});

// ../node_modules/color-name/index.js
var sc = K((f5, ic) => {
  "use strict";
  ic.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };
});

// ../node_modules/color-convert/conversions.js
var aa = K((m5, cc) => {
  var fr = sc(), lc = {};
  for (let e of Object.keys(fr))
    lc[fr[e]] = e;
  var A = {
    rgb: { channels: 3, labels: "rgb" },
    hsl: { channels: 3, labels: "hsl" },
    hsv: { channels: 3, labels: "hsv" },
    hwb: { channels: 3, labels: "hwb" },
    cmyk: { channels: 4, labels: "cmyk" },
    xyz: { channels: 3, labels: "xyz" },
    lab: { channels: 3, labels: "lab" },
    lch: { channels: 3, labels: "lch" },
    hex: { channels: 1, labels: ["hex"] },
    keyword: { channels: 1, labels: ["keyword"] },
    ansi16: { channels: 1, labels: ["ansi16"] },
    ansi256: { channels: 1, labels: ["ansi256"] },
    hcg: { channels: 3, labels: ["h", "c", "g"] },
    apple: { channels: 3, labels: ["r16", "g16", "b16"] },
    gray: { channels: 1, labels: ["gray"] }
  };
  cc.exports = A;
  for (let e of Object.keys(A)) {
    if (!("channels" in A[e]))
      throw new Error("missing channels property: " + e);
    if (!("labels" in A[e]))
      throw new Error("missing channel labels property: " + e);
    if (A[e].labels.length !== A[e].channels)
      throw new Error("channel and label counts mismatch: " + e);
    let { channels: t, labels: r } = A[e];
    delete A[e].channels, delete A[e].labels, Object.defineProperty(A[e], "channels", { value: t }), Object.defineProperty(A[e], "labels", {
    value: r });
  }
  A.rgb.hsl = function(e) {
    let t = e[0] / 255, r = e[1] / 255, o = e[2] / 255, n = Math.min(t, r, o), i = Math.max(t, r, o), s = i - n, l, c;
    i === n ? l = 0 : t === i ? l = (r - o) / s : r === i ? l = 2 + (o - t) / s : o === i && (l = 4 + (t - r) / s), l = Math.min(l * 60, 360),
    l < 0 && (l += 360);
    let u = (n + i) / 2;
    return i === n ? c = 0 : u <= 0.5 ? c = s / (i + n) : c = s / (2 - i - n), [l, c * 100, u * 100];
  };
  A.rgb.hsv = function(e) {
    let t, r, o, n, i, s = e[0] / 255, l = e[1] / 255, c = e[2] / 255, u = Math.max(s, l, c), d = u - Math.min(s, l, c), g = /* @__PURE__ */ a(
    function(p) {
      return (u - p) / 6 / d + 1 / 2;
    }, "diffc");
    return d === 0 ? (n = 0, i = 0) : (i = d / u, t = g(s), r = g(l), o = g(c), s === u ? n = o - r : l === u ? n = 1 / 3 + t - o : c === u &&
    (n = 2 / 3 + r - t), n < 0 ? n += 1 : n > 1 && (n -= 1)), [
      n * 360,
      i * 100,
      u * 100
    ];
  };
  A.rgb.hwb = function(e) {
    let t = e[0], r = e[1], o = e[2], n = A.rgb.hsl(e)[0], i = 1 / 255 * Math.min(t, Math.min(r, o));
    return o = 1 - 1 / 255 * Math.max(t, Math.max(r, o)), [n, i * 100, o * 100];
  };
  A.rgb.cmyk = function(e) {
    let t = e[0] / 255, r = e[1] / 255, o = e[2] / 255, n = Math.min(1 - t, 1 - r, 1 - o), i = (1 - t - n) / (1 - n) || 0, s = (1 - r - n) /
    (1 - n) || 0, l = (1 - o - n) / (1 - n) || 0;
    return [i * 100, s * 100, l * 100, n * 100];
  };
  function lb(e, t) {
    return (e[0] - t[0]) ** 2 + (e[1] - t[1]) ** 2 + (e[2] - t[2]) ** 2;
  }
  a(lb, "comparativeDistance");
  A.rgb.keyword = function(e) {
    let t = lc[e];
    if (t)
      return t;
    let r = 1 / 0, o;
    for (let n of Object.keys(fr)) {
      let i = fr[n], s = lb(e, i);
      s < r && (r = s, o = n);
    }
    return o;
  };
  A.keyword.rgb = function(e) {
    return fr[e];
  };
  A.rgb.xyz = function(e) {
    let t = e[0] / 255, r = e[1] / 255, o = e[2] / 255;
    t = t > 0.04045 ? ((t + 0.055) / 1.055) ** 2.4 : t / 12.92, r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92, o = o > 0.04045 ?
    ((o + 0.055) / 1.055) ** 2.4 : o / 12.92;
    let n = t * 0.4124 + r * 0.3576 + o * 0.1805, i = t * 0.2126 + r * 0.7152 + o * 0.0722, s = t * 0.0193 + r * 0.1192 + o * 0.9505;
    return [n * 100, i * 100, s * 100];
  };
  A.rgb.lab = function(e) {
    let t = A.rgb.xyz(e), r = t[0], o = t[1], n = t[2];
    r /= 95.047, o /= 100, n /= 108.883, r = r > 8856e-6 ? r ** (1 / 3) : 7.787 * r + 16 / 116, o = o > 8856e-6 ? o ** (1 / 3) : 7.787 * o +
    16 / 116, n = n > 8856e-6 ? n ** (1 / 3) : 7.787 * n + 16 / 116;
    let i = 116 * o - 16, s = 500 * (r - o), l = 200 * (o - n);
    return [i, s, l];
  };
  A.hsl.rgb = function(e) {
    let t = e[0] / 360, r = e[1] / 100, o = e[2] / 100, n, i, s;
    if (r === 0)
      return s = o * 255, [s, s, s];
    o < 0.5 ? n = o * (1 + r) : n = o + r - o * r;
    let l = 2 * o - n, c = [0, 0, 0];
    for (let u = 0; u < 3; u++)
      i = t + 1 / 3 * -(u - 1), i < 0 && i++, i > 1 && i--, 6 * i < 1 ? s = l + (n - l) * 6 * i : 2 * i < 1 ? s = n : 3 * i < 2 ? s = l + (n -
      l) * (2 / 3 - i) * 6 : s = l, c[u] = s * 255;
    return c;
  };
  A.hsl.hsv = function(e) {
    let t = e[0], r = e[1] / 100, o = e[2] / 100, n = r, i = Math.max(o, 0.01);
    o *= 2, r *= o <= 1 ? o : 2 - o, n *= i <= 1 ? i : 2 - i;
    let s = (o + r) / 2, l = o === 0 ? 2 * n / (i + n) : 2 * r / (o + r);
    return [t, l * 100, s * 100];
  };
  A.hsv.rgb = function(e) {
    let t = e[0] / 60, r = e[1] / 100, o = e[2] / 100, n = Math.floor(t) % 6, i = t - Math.floor(t), s = 255 * o * (1 - r), l = 255 * o * (1 -
    r * i), c = 255 * o * (1 - r * (1 - i));
    switch (o *= 255, n) {
      case 0:
        return [o, c, s];
      case 1:
        return [l, o, s];
      case 2:
        return [s, o, c];
      case 3:
        return [s, l, o];
      case 4:
        return [c, s, o];
      case 5:
        return [o, s, l];
    }
  };
  A.hsv.hsl = function(e) {
    let t = e[0], r = e[1] / 100, o = e[2] / 100, n = Math.max(o, 0.01), i, s;
    s = (2 - r) * o;
    let l = (2 - r) * n;
    return i = r * n, i /= l <= 1 ? l : 2 - l, i = i || 0, s /= 2, [t, i * 100, s * 100];
  };
  A.hwb.rgb = function(e) {
    let t = e[0] / 360, r = e[1] / 100, o = e[2] / 100, n = r + o, i;
    n > 1 && (r /= n, o /= n);
    let s = Math.floor(6 * t), l = 1 - o;
    i = 6 * t - s, (s & 1) !== 0 && (i = 1 - i);
    let c = r + i * (l - r), u, d, g;
    switch (s) {
      default:
      case 6:
      case 0:
        u = l, d = c, g = r;
        break;
      case 1:
        u = c, d = l, g = r;
        break;
      case 2:
        u = r, d = l, g = c;
        break;
      case 3:
        u = r, d = c, g = l;
        break;
      case 4:
        u = c, d = r, g = l;
        break;
      case 5:
        u = l, d = r, g = c;
        break;
    }
    return [u * 255, d * 255, g * 255];
  };
  A.cmyk.rgb = function(e) {
    let t = e[0] / 100, r = e[1] / 100, o = e[2] / 100, n = e[3] / 100, i = 1 - Math.min(1, t * (1 - n) + n), s = 1 - Math.min(1, r * (1 - n) +
    n), l = 1 - Math.min(1, o * (1 - n) + n);
    return [i * 255, s * 255, l * 255];
  };
  A.xyz.rgb = function(e) {
    let t = e[0] / 100, r = e[1] / 100, o = e[2] / 100, n, i, s;
    return n = t * 3.2406 + r * -1.5372 + o * -0.4986, i = t * -0.9689 + r * 1.8758 + o * 0.0415, s = t * 0.0557 + r * -0.204 + o * 1.057, n =
    n > 31308e-7 ? 1.055 * n ** (1 / 2.4) - 0.055 : n * 12.92, i = i > 31308e-7 ? 1.055 * i ** (1 / 2.4) - 0.055 : i * 12.92, s = s > 31308e-7 ?
    1.055 * s ** (1 / 2.4) - 0.055 : s * 12.92, n = Math.min(Math.max(0, n), 1), i = Math.min(Math.max(0, i), 1), s = Math.min(Math.max(0, s),
    1), [n * 255, i * 255, s * 255];
  };
  A.xyz.lab = function(e) {
    let t = e[0], r = e[1], o = e[2];
    t /= 95.047, r /= 100, o /= 108.883, t = t > 8856e-6 ? t ** (1 / 3) : 7.787 * t + 16 / 116, r = r > 8856e-6 ? r ** (1 / 3) : 7.787 * r +
    16 / 116, o = o > 8856e-6 ? o ** (1 / 3) : 7.787 * o + 16 / 116;
    let n = 116 * r - 16, i = 500 * (t - r), s = 200 * (r - o);
    return [n, i, s];
  };
  A.lab.xyz = function(e) {
    let t = e[0], r = e[1], o = e[2], n, i, s;
    i = (t + 16) / 116, n = r / 500 + i, s = i - o / 200;
    let l = i ** 3, c = n ** 3, u = s ** 3;
    return i = l > 8856e-6 ? l : (i - 16 / 116) / 7.787, n = c > 8856e-6 ? c : (n - 16 / 116) / 7.787, s = u > 8856e-6 ? u : (s - 16 / 116) /
    7.787, n *= 95.047, i *= 100, s *= 108.883, [n, i, s];
  };
  A.lab.lch = function(e) {
    let t = e[0], r = e[1], o = e[2], n;
    n = Math.atan2(o, r) * 360 / 2 / Math.PI, n < 0 && (n += 360);
    let s = Math.sqrt(r * r + o * o);
    return [t, s, n];
  };
  A.lch.lab = function(e) {
    let t = e[0], r = e[1], n = e[2] / 360 * 2 * Math.PI, i = r * Math.cos(n), s = r * Math.sin(n);
    return [t, i, s];
  };
  A.rgb.ansi16 = function(e, t = null) {
    let [r, o, n] = e, i = t === null ? A.rgb.hsv(e)[2] : t;
    if (i = Math.round(i / 50), i === 0)
      return 30;
    let s = 30 + (Math.round(n / 255) << 2 | Math.round(o / 255) << 1 | Math.round(r / 255));
    return i === 2 && (s += 60), s;
  };
  A.hsv.ansi16 = function(e) {
    return A.rgb.ansi16(A.hsv.rgb(e), e[2]);
  };
  A.rgb.ansi256 = function(e) {
    let t = e[0], r = e[1], o = e[2];
    return t === r && r === o ? t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.
    round(r / 255 * 5) + Math.round(o / 255 * 5);
  };
  A.ansi16.rgb = function(e) {
    let t = e % 10;
    if (t === 0 || t === 7)
      return e > 50 && (t += 3.5), t = t / 10.5 * 255, [t, t, t];
    let r = (~~(e > 50) + 1) * 0.5, o = (t & 1) * r * 255, n = (t >> 1 & 1) * r * 255, i = (t >> 2 & 1) * r * 255;
    return [o, n, i];
  };
  A.ansi256.rgb = function(e) {
    if (e >= 232) {
      let i = (e - 232) * 10 + 8;
      return [i, i, i];
    }
    e -= 16;
    let t, r = Math.floor(e / 36) / 5 * 255, o = Math.floor((t = e % 36) / 6) / 5 * 255, n = t % 6 / 5 * 255;
    return [r, o, n];
  };
  A.rgb.hex = function(e) {
    let r = (((Math.round(e[0]) & 255) << 16) + ((Math.round(e[1]) & 255) << 8) + (Math.round(e[2]) & 255)).toString(16).toUpperCase();
    return "000000".substring(r.length) + r;
  };
  A.hex.rgb = function(e) {
    let t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!t)
      return [0, 0, 0];
    let r = t[0];
    t[0].length === 3 && (r = r.split("").map((l) => l + l).join(""));
    let o = parseInt(r, 16), n = o >> 16 & 255, i = o >> 8 & 255, s = o & 255;
    return [n, i, s];
  };
  A.rgb.hcg = function(e) {
    let t = e[0] / 255, r = e[1] / 255, o = e[2] / 255, n = Math.max(Math.max(t, r), o), i = Math.min(Math.min(t, r), o), s = n - i, l, c;
    return s < 1 ? l = i / (1 - s) : l = 0, s <= 0 ? c = 0 : n === t ? c = (r - o) / s % 6 : n === r ? c = 2 + (o - t) / s : c = 4 + (t - r) /
    s, c /= 6, c %= 1, [c * 360, s * 100, l * 100];
  };
  A.hsl.hcg = function(e) {
    let t = e[1] / 100, r = e[2] / 100, o = r < 0.5 ? 2 * t * r : 2 * t * (1 - r), n = 0;
    return o < 1 && (n = (r - 0.5 * o) / (1 - o)), [e[0], o * 100, n * 100];
  };
  A.hsv.hcg = function(e) {
    let t = e[1] / 100, r = e[2] / 100, o = t * r, n = 0;
    return o < 1 && (n = (r - o) / (1 - o)), [e[0], o * 100, n * 100];
  };
  A.hcg.rgb = function(e) {
    let t = e[0] / 360, r = e[1] / 100, o = e[2] / 100;
    if (r === 0)
      return [o * 255, o * 255, o * 255];
    let n = [0, 0, 0], i = t % 1 * 6, s = i % 1, l = 1 - s, c = 0;
    switch (Math.floor(i)) {
      case 0:
        n[0] = 1, n[1] = s, n[2] = 0;
        break;
      case 1:
        n[0] = l, n[1] = 1, n[2] = 0;
        break;
      case 2:
        n[0] = 0, n[1] = 1, n[2] = s;
        break;
      case 3:
        n[0] = 0, n[1] = l, n[2] = 1;
        break;
      case 4:
        n[0] = s, n[1] = 0, n[2] = 1;
        break;
      default:
        n[0] = 1, n[1] = 0, n[2] = l;
    }
    return c = (1 - r) * o, [
      (r * n[0] + c) * 255,
      (r * n[1] + c) * 255,
      (r * n[2] + c) * 255
    ];
  };
  A.hcg.hsv = function(e) {
    let t = e[1] / 100, r = e[2] / 100, o = t + r * (1 - t), n = 0;
    return o > 0 && (n = t / o), [e[0], n * 100, o * 100];
  };
  A.hcg.hsl = function(e) {
    let t = e[1] / 100, o = e[2] / 100 * (1 - t) + 0.5 * t, n = 0;
    return o > 0 && o < 0.5 ? n = t / (2 * o) : o >= 0.5 && o < 1 && (n = t / (2 * (1 - o))), [e[0], n * 100, o * 100];
  };
  A.hcg.hwb = function(e) {
    let t = e[1] / 100, r = e[2] / 100, o = t + r * (1 - t);
    return [e[0], (o - t) * 100, (1 - o) * 100];
  };
  A.hwb.hcg = function(e) {
    let t = e[1] / 100, o = 1 - e[2] / 100, n = o - t, i = 0;
    return n < 1 && (i = (o - n) / (1 - n)), [e[0], n * 100, i * 100];
  };
  A.apple.rgb = function(e) {
    return [e[0] / 65535 * 255, e[1] / 65535 * 255, e[2] / 65535 * 255];
  };
  A.rgb.apple = function(e) {
    return [e[0] / 255 * 65535, e[1] / 255 * 65535, e[2] / 255 * 65535];
  };
  A.gray.rgb = function(e) {
    return [e[0] / 100 * 255, e[0] / 100 * 255, e[0] / 100 * 255];
  };
  A.gray.hsl = function(e) {
    return [0, 0, e[0]];
  };
  A.gray.hsv = A.gray.hsl;
  A.gray.hwb = function(e) {
    return [0, 100, e[0]];
  };
  A.gray.cmyk = function(e) {
    return [0, 0, 0, e[0]];
  };
  A.gray.lab = function(e) {
    return [e[0], 0, 0];
  };
  A.gray.hex = function(e) {
    let t = Math.round(e[0] / 100 * 255) & 255, o = ((t << 16) + (t << 8) + t).toString(16).toUpperCase();
    return "000000".substring(o.length) + o;
  };
  A.rgb.gray = function(e) {
    return [(e[0] + e[1] + e[2]) / 3 / 255 * 100];
  };
});

// ../node_modules/color-convert/route.js
var uc = K((h5, pc) => {
  var bo = aa();
  function cb() {
    let e = {}, t = Object.keys(bo);
    for (let r = t.length, o = 0; o < r; o++)
      e[t[o]] = {
        // http://jsperf.com/1-vs-infinity
        // micro-opt, but this is simple.
        distance: -1,
        parent: null
      };
    return e;
  }
  a(cb, "buildGraph");
  function pb(e) {
    let t = cb(), r = [e];
    for (t[e].distance = 0; r.length; ) {
      let o = r.pop(), n = Object.keys(bo[o]);
      for (let i = n.length, s = 0; s < i; s++) {
        let l = n[s], c = t[l];
        c.distance === -1 && (c.distance = t[o].distance + 1, c.parent = o, r.unshift(l));
      }
    }
    return t;
  }
  a(pb, "deriveBFS");
  function ub(e, t) {
    return function(r) {
      return t(e(r));
    };
  }
  a(ub, "link");
  function db(e, t) {
    let r = [t[e].parent, e], o = bo[t[e].parent][e], n = t[e].parent;
    for (; t[n].parent; )
      r.unshift(t[n].parent), o = ub(bo[t[n].parent][n], o), n = t[n].parent;
    return o.conversion = r, o;
  }
  a(db, "wrapConversion");
  pc.exports = function(e) {
    let t = pb(e), r = {}, o = Object.keys(t);
    for (let n = o.length, i = 0; i < n; i++) {
      let s = o[i];
      t[s].parent !== null && (r[s] = db(s, t));
    }
    return r;
  };
});

// ../node_modules/color-convert/index.js
var fc = K((y5, dc) => {
  var ia = aa(), fb = uc(), qt = {}, mb = Object.keys(ia);
  function gb(e) {
    let t = /* @__PURE__ */ a(function(...r) {
      let o = r[0];
      return o == null ? o : (o.length > 1 && (r = o), e(r));
    }, "wrappedFn");
    return "conversion" in e && (t.conversion = e.conversion), t;
  }
  a(gb, "wrapRaw");
  function hb(e) {
    let t = /* @__PURE__ */ a(function(...r) {
      let o = r[0];
      if (o == null)
        return o;
      o.length > 1 && (r = o);
      let n = e(r);
      if (typeof n == "object")
        for (let i = n.length, s = 0; s < i; s++)
          n[s] = Math.round(n[s]);
      return n;
    }, "wrappedFn");
    return "conversion" in e && (t.conversion = e.conversion), t;
  }
  a(hb, "wrapRounded");
  mb.forEach((e) => {
    qt[e] = {}, Object.defineProperty(qt[e], "channels", { value: ia[e].channels }), Object.defineProperty(qt[e], "labels", { value: ia[e].labels });
    let t = fb(e);
    Object.keys(t).forEach((o) => {
      let n = t[o];
      qt[e][o] = hb(n), qt[e][o].raw = gb(n);
    });
  });
  dc.exports = qt;
});

// ../node_modules/react-colorful/dist/index.mjs
import Y, { useRef as pt, useMemo as bb, useEffect as vo, useState as yb, useCallback as xb, useLayoutEffect as vb } from "react";
function It() {
  return (It = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }).apply(this, arguments);
}
function ua(e, t) {
  if (e == null) return {};
  var r, o, n = {}, i = Object.keys(e);
  for (o = 0; o < i.length; o++) t.indexOf(r = i[o]) >= 0 || (n[r] = e[r]);
  return n;
}
function sa(e) {
  var t = pt(e), r = pt(function(o) {
    t.current && t.current(o);
  });
  return t.current = e, r.current;
}
function wc(e, t, r) {
  var o = sa(r), n = yb(function() {
    return e.toHsva(t);
  }), i = n[0], s = n[1], l = pt({ color: t, hsva: i });
  vo(function() {
    if (!e.equal(t, l.current.color)) {
      var u = e.toHsva(t);
      l.current = { hsva: u, color: t }, s(u);
    }
  }, [t, e]), vo(function() {
    var u;
    Sc(i, l.current.hsva) || e.equal(u = e.fromHsva(i), l.current.color) || (l.current = { hsva: i, color: u }, o(u));
  }, [i, e, o]);
  var c = xb(function(u) {
    s(function(d) {
      return Object.assign({}, d, u);
    });
  }, []);
  return [i, c];
}
var Wt, mr, la, mc, gc, da, gr, fa, se, Eb, Sb, ca, Cb, wb, Tb, Ab, bc, pa, xo, yc, kb, yo, Ob, xc, vc, Ec, Sc, Cc, Ib, Pb, Lb, Nb, hc, Tc, _b,
Db, Ac, Bb, kc, Mb, Oc, Fb, Ic, Pc = V(() => {
  a(It, "u");
  a(ua, "c");
  a(sa, "i");
  Wt = /* @__PURE__ */ a(function(e, t, r) {
    return t === void 0 && (t = 0), r === void 0 && (r = 1), e > r ? r : e < t ? t : e;
  }, "s"), mr = /* @__PURE__ */ a(function(e) {
    return "touches" in e;
  }, "f"), la = /* @__PURE__ */ a(function(e) {
    return e && e.ownerDocument.defaultView || self;
  }, "v"), mc = /* @__PURE__ */ a(function(e, t, r) {
    var o = e.getBoundingClientRect(), n = mr(t) ? function(i, s) {
      for (var l = 0; l < i.length; l++) if (i[l].identifier === s) return i[l];
      return i[0];
    }(t.touches, r) : t;
    return { left: Wt((n.pageX - (o.left + la(e).pageXOffset)) / o.width), top: Wt((n.pageY - (o.top + la(e).pageYOffset)) / o.height) };
  }, "d"), gc = /* @__PURE__ */ a(function(e) {
    !mr(e) && e.preventDefault();
  }, "h"), da = Y.memo(function(e) {
    var t = e.onMove, r = e.onKey, o = ua(e, ["onMove", "onKey"]), n = pt(null), i = sa(t), s = sa(r), l = pt(null), c = pt(!1), u = bb(function() {
      var m = /* @__PURE__ */ a(function(b) {
        gc(b), (mr(b) ? b.touches.length > 0 : b.buttons > 0) && n.current ? i(mc(n.current, b, l.current)) : h(!1);
      }, "e"), f = /* @__PURE__ */ a(function() {
        return h(!1);
      }, "r");
      function h(b) {
        var y = c.current, x = la(n.current), v = b ? x.addEventListener : x.removeEventListener;
        v(y ? "touchmove" : "mousemove", m), v(y ? "touchend" : "mouseup", f);
      }
      return a(h, "t"), [function(b) {
        var y = b.nativeEvent, x = n.current;
        if (x && (gc(y), !function(S, w) {
          return w && !mr(S);
        }(y, c.current) && x)) {
          if (mr(y)) {
            c.current = !0;
            var v = y.changedTouches || [];
            v.length && (l.current = v[0].identifier);
          }
          x.focus(), i(mc(x, y, l.current)), h(!0);
        }
      }, function(b) {
        var y = b.which || b.keyCode;
        y < 37 || y > 40 || (b.preventDefault(), s({ left: y === 39 ? 0.05 : y === 37 ? -0.05 : 0, top: y === 40 ? 0.05 : y === 38 ? -0.05 :
        0 }));
      }, h];
    }, [s, i]), d = u[0], g = u[1], p = u[2];
    return vo(function() {
      return p;
    }, [p]), Y.createElement("div", It({}, o, { onTouchStart: d, onMouseDown: d, className: "react-colorful__interactive", ref: n, onKeyDown: g,
    tabIndex: 0, role: "slider" }));
  }), gr = /* @__PURE__ */ a(function(e) {
    return e.filter(Boolean).join(" ");
  }, "g"), fa = /* @__PURE__ */ a(function(e) {
    var t = e.color, r = e.left, o = e.top, n = o === void 0 ? 0.5 : o, i = gr(["react-colorful__pointer", e.className]);
    return Y.createElement("div", { className: i, style: { top: 100 * n + "%", left: 100 * r + "%" } }, Y.createElement("div", { className: "\
react-colorful__pointer-fill", style: { backgroundColor: t } }));
  }, "p"), se = /* @__PURE__ */ a(function(e, t, r) {
    return t === void 0 && (t = 0), r === void 0 && (r = Math.pow(10, t)), Math.round(r * e) / r;
  }, "b"), Eb = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, Sb = /* @__PURE__ */ a(function(e) {
    return xc(ca(e));
  }, "x"), ca = /* @__PURE__ */ a(function(e) {
    return e[0] === "#" && (e = e.substring(1)), e.length < 6 ? { r: parseInt(e[0] + e[0], 16), g: parseInt(e[1] + e[1], 16), b: parseInt(e[2] +
    e[2], 16), a: e.length === 4 ? se(parseInt(e[3] + e[3], 16) / 255, 2) : 1 } : { r: parseInt(e.substring(0, 2), 16), g: parseInt(e.substring(
    2, 4), 16), b: parseInt(e.substring(4, 6), 16), a: e.length === 8 ? se(parseInt(e.substring(6, 8), 16) / 255, 2) : 1 };
  }, "C"), Cb = /* @__PURE__ */ a(function(e, t) {
    return t === void 0 && (t = "deg"), Number(e) * (Eb[t] || 1);
  }, "E"), wb = /* @__PURE__ */ a(function(e) {
    var t = /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(
    e);
    return t ? Tb({ h: Cb(t[1], t[2]), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) }) : { h: 0,
    s: 0, v: 0, a: 1 };
  }, "H"), Tb = /* @__PURE__ */ a(function(e) {
    var t = e.s, r = e.l;
    return { h: e.h, s: (t *= (r < 50 ? r : 100 - r) / 100) > 0 ? 2 * t / (r + t) * 100 : 0, v: r + t, a: e.a };
  }, "N"), Ab = /* @__PURE__ */ a(function(e) {
    return Ob(yc(e));
  }, "w"), bc = /* @__PURE__ */ a(function(e) {
    var t = e.s, r = e.v, o = e.a, n = (200 - t) * r / 100;
    return { h: se(e.h), s: se(n > 0 && n < 200 ? t * r / 100 / (n <= 100 ? n : 200 - n) * 100 : 0), l: se(n / 2), a: se(o, 2) };
  }, "y"), pa = /* @__PURE__ */ a(function(e) {
    var t = bc(e);
    return "hsl(" + t.h + ", " + t.s + "%, " + t.l + "%)";
  }, "q"), xo = /* @__PURE__ */ a(function(e) {
    var t = bc(e);
    return "hsla(" + t.h + ", " + t.s + "%, " + t.l + "%, " + t.a + ")";
  }, "k"), yc = /* @__PURE__ */ a(function(e) {
    var t = e.h, r = e.s, o = e.v, n = e.a;
    t = t / 360 * 6, r /= 100, o /= 100;
    var i = Math.floor(t), s = o * (1 - r), l = o * (1 - (t - i) * r), c = o * (1 - (1 - t + i) * r), u = i % 6;
    return { r: se(255 * [o, l, s, s, c, o][u]), g: se(255 * [c, o, o, l, s, s][u]), b: se(255 * [s, s, c, o, o, l][u]), a: se(n, 2) };
  }, "I"), kb = /* @__PURE__ */ a(function(e) {
    var t = /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);
    return t ? xc({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 :
    1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : { h: 0, s: 0, v: 0, a: 1 };
  }, "z"), yo = /* @__PURE__ */ a(function(e) {
    var t = e.toString(16);
    return t.length < 2 ? "0" + t : t;
  }, "D"), Ob = /* @__PURE__ */ a(function(e) {
    var t = e.r, r = e.g, o = e.b, n = e.a, i = n < 1 ? yo(se(255 * n)) : "";
    return "#" + yo(t) + yo(r) + yo(o) + i;
  }, "K"), xc = /* @__PURE__ */ a(function(e) {
    var t = e.r, r = e.g, o = e.b, n = e.a, i = Math.max(t, r, o), s = i - Math.min(t, r, o), l = s ? i === t ? (r - o) / s : i === r ? 2 + (o -
    t) / s : 4 + (t - r) / s : 0;
    return { h: se(60 * (l < 0 ? l + 6 : l)), s: se(i ? s / i * 100 : 0), v: se(i / 255 * 100), a: n };
  }, "L"), vc = Y.memo(function(e) {
    var t = e.hue, r = e.onChange, o = gr(["react-colorful__hue", e.className]);
    return Y.createElement("div", { className: o }, Y.createElement(da, { onMove: /* @__PURE__ */ a(function(n) {
      r({ h: 360 * n.left });
    }, "onMove"), onKey: /* @__PURE__ */ a(function(n) {
      r({ h: Wt(t + 360 * n.left, 0, 360) });
    }, "onKey"), "aria-label": "Hue", "aria-valuenow": se(t), "aria-valuemax": "360", "aria-valuemin": "0" }, Y.createElement(fa, { className: "\
react-colorful__hue-pointer", left: t / 360, color: pa({ h: t, s: 100, v: 100, a: 1 }) })));
  }), Ec = Y.memo(function(e) {
    var t = e.hsva, r = e.onChange, o = { backgroundColor: pa({ h: t.h, s: 100, v: 100, a: 1 }) };
    return Y.createElement("div", { className: "react-colorful__saturation", style: o }, Y.createElement(da, { onMove: /* @__PURE__ */ a(function(n) {
      r({ s: 100 * n.left, v: 100 - 100 * n.top });
    }, "onMove"), onKey: /* @__PURE__ */ a(function(n) {
      r({ s: Wt(t.s + 100 * n.left, 0, 100), v: Wt(t.v - 100 * n.top, 0, 100) });
    }, "onKey"), "aria-label": "Color", "aria-valuetext": "Saturation " + se(t.s) + "%, Brightness " + se(t.v) + "%" }, Y.createElement(fa, {
    className: "react-colorful__saturation-pointer", top: 1 - t.v / 100, left: t.s / 100, color: pa(t) })));
  }), Sc = /* @__PURE__ */ a(function(e, t) {
    if (e === t) return !0;
    for (var r in e) if (e[r] !== t[r]) return !1;
    return !0;
  }, "F"), Cc = /* @__PURE__ */ a(function(e, t) {
    return e.replace(/\s/g, "") === t.replace(/\s/g, "");
  }, "P"), Ib = /* @__PURE__ */ a(function(e, t) {
    return e.toLowerCase() === t.toLowerCase() || Sc(ca(e), ca(t));
  }, "X");
  a(wc, "Y");
  Lb = typeof window < "u" ? vb : vo, Nb = /* @__PURE__ */ a(function() {
    return Pb || (typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : void 0);
  }, "$"), hc = /* @__PURE__ */ new Map(), Tc = /* @__PURE__ */ a(function(e) {
    Lb(function() {
      var t = e.current ? e.current.ownerDocument : document;
      if (t !== void 0 && !hc.has(t)) {
        var r = t.createElement("style");
        r.innerHTML = `.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:non\
e;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;borde\
r-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-g\
radient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:\
0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 \
0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gra\
dient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful_\
_interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{p\
osition:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px soli\
d #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate\
(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;\
charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.\
react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`, hc.set(t, r);
        var o = Nb();
        o && r.setAttribute("nonce", o), t.head.appendChild(r);
      }
    }, []);
  }, "Q"), _b = /* @__PURE__ */ a(function(e) {
    var t = e.className, r = e.colorModel, o = e.color, n = o === void 0 ? r.defaultColor : o, i = e.onChange, s = ua(e, ["className", "colo\
rModel", "color", "onChange"]), l = pt(null);
    Tc(l);
    var c = wc(r, n, i), u = c[0], d = c[1], g = gr(["react-colorful", t]);
    return Y.createElement("div", It({}, s, { ref: l, className: g }), Y.createElement(Ec, { hsva: u, onChange: d }), Y.createElement(vc, { hue: u.
    h, onChange: d, className: "react-colorful__last-control" }));
  }, "U"), Db = { defaultColor: "000", toHsva: Sb, fromHsva: /* @__PURE__ */ a(function(e) {
    return Ab({ h: e.h, s: e.s, v: e.v, a: 1 });
  }, "fromHsva"), equal: Ib }, Ac = /* @__PURE__ */ a(function(e) {
    return Y.createElement(_b, It({}, e, { colorModel: Db }));
  }, "Z"), Bb = /* @__PURE__ */ a(function(e) {
    var t = e.className, r = e.hsva, o = e.onChange, n = { backgroundImage: "linear-gradient(90deg, " + xo(Object.assign({}, r, { a: 0 })) +
    ", " + xo(Object.assign({}, r, { a: 1 })) + ")" }, i = gr(["react-colorful__alpha", t]), s = se(100 * r.a);
    return Y.createElement("div", { className: i }, Y.createElement("div", { className: "react-colorful__alpha-gradient", style: n }), Y.createElement(
    da, { onMove: /* @__PURE__ */ a(function(l) {
      o({ a: l.left });
    }, "onMove"), onKey: /* @__PURE__ */ a(function(l) {
      o({ a: Wt(r.a + l.left) });
    }, "onKey"), "aria-label": "Alpha", "aria-valuetext": s + "%", "aria-valuenow": s, "aria-valuemin": "0", "aria-valuemax": "100" }, Y.createElement(
    fa, { className: "react-colorful__alpha-pointer", left: r.a, color: xo(r) })));
  }, "ee"), kc = /* @__PURE__ */ a(function(e) {
    var t = e.className, r = e.colorModel, o = e.color, n = o === void 0 ? r.defaultColor : o, i = e.onChange, s = ua(e, ["className", "colo\
rModel", "color", "onChange"]), l = pt(null);
    Tc(l);
    var c = wc(r, n, i), u = c[0], d = c[1], g = gr(["react-colorful", t]);
    return Y.createElement("div", It({}, s, { ref: l, className: g }), Y.createElement(Ec, { hsva: u, onChange: d }), Y.createElement(vc, { hue: u.
    h, onChange: d }), Y.createElement(Bb, { hsva: u, onChange: d, className: "react-colorful__last-control" }));
  }, "re"), Mb = { defaultColor: "hsla(0, 0%, 0%, 1)", toHsva: wb, fromHsva: xo, equal: Cc }, Oc = /* @__PURE__ */ a(function(e) {
    return Y.createElement(kc, It({}, e, { colorModel: Mb }));
  }, "ue"), Fb = { defaultColor: "rgba(0, 0, 0, 1)", toHsva: kb, fromHsva: /* @__PURE__ */ a(function(e) {
    var t = yc(e);
    return "rgba(" + t.r + ", " + t.g + ", " + t.b + ", " + t.a + ")";
  }, "fromHsva"), equal: Cc }, Ic = /* @__PURE__ */ a(function(e) {
    return Y.createElement(kc, It({}, e, { colorModel: Fb }));
  }, "He");
});

// ../addons/docs/src/blocks/controls/Color.tsx
var jc = {};
cf(jc, {
  ColorControl: () => Fc,
  default: () => sy
});
import De, { useCallback as Co, useEffect as Nc, useMemo as _c, useState as So } from "react";
import { Form as jb, TooltipNote as Rb, WithTooltip as Dc } from "storybook/internal/components";
import { MarkupIcon as Hb } from "@storybook/icons";
import { styled as ut } from "storybook/theming";
var Ie, Vb, zb, $b, Ub, qb, Wb, Gb, Lc, Jb, Kb, Bc, ma, Yb, Xb, Zb, ga, Qb, ey, Eo, Mc, ty, ry, oy, Gt, ny, ay, wo, iy, Fc, sy, Rc = V(() => {
  "use strict";
  Ie = Ce(fc());
  or();
  Pc();
  Ne();
  Vb = ut.div({
    position: "relative",
    maxWidth: 250,
    '&[aria-readonly="true"]': {
      opacity: 0.5
    }
  }), zb = ut(Dc)({
    position: "absolute",
    zIndex: 1,
    top: 4,
    left: 4,
    "[aria-readonly=true] &": {
      cursor: "not-allowed"
    }
  }), $b = ut.div({
    width: 200,
    margin: 5,
    ".react-colorful__saturation": {
      borderRadius: "4px 4px 0 0"
    },
    ".react-colorful__hue": {
      boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 5%)"
    },
    ".react-colorful__last-control": {
      borderRadius: "0 0 4px 4px"
    }
  }), Ub = ut(Rb)(({ theme: e }) => ({
    fontFamily: e.typography.fonts.base
  })), qb = ut.div({
    display: "grid",
    gridTemplateColumns: "repeat(9, 16px)",
    gap: 6,
    padding: 3,
    marginTop: 5,
    width: 200
  }), Wb = ut.div(({ theme: e, active: t }) => ({
    width: 16,
    height: 16,
    boxShadow: t ? `${e.appBorderColor} 0 0 0 1px inset, ${e.textMutedColor}50 0 0 0 4px` : `${e.appBorderColor} 0 0 0 1px inset`,
    borderRadius: e.appBorderRadius
  })), Gb = `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d\
="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`, Lc = /* @__PURE__ */ a(({ value: e, style: t, ...r }) => {
    let o = `linear-gradient(${e}, ${e}), ${Gb}, linear-gradient(#fff, #fff)`;
    return /* @__PURE__ */ De.createElement(Wb, { ...r, style: { ...t, backgroundImage: o } });
  }, "Swatch"), Jb = ut(jb.Input)(({ theme: e, readOnly: t }) => ({
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    boxSizing: "border-box",
    fontFamily: e.typography.fonts.base
  })), Kb = ut(Hb)(({ theme: e }) => ({
    position: "absolute",
    zIndex: 1,
    top: 6,
    right: 7,
    width: 20,
    height: 20,
    padding: 4,
    boxSizing: "border-box",
    cursor: "pointer",
    color: e.input.color
  })), Bc = /* @__PURE__ */ ((o) => (o.RGB = "rgb", o.HSL = "hsl", o.HEX = "hex", o))(Bc || {}), ma = Object.values(Bc), Yb = /\(([0-9]+),\s*([0-9]+)%?,\s*([0-9]+)%?,?\s*([0-9.]+)?\)/,
  Xb = /^\s*rgba?\(([0-9]+),\s*([0-9]+),\s*([0-9]+),?\s*([0-9.]+)?\)\s*$/i, Zb = /^\s*hsla?\(([0-9]+),\s*([0-9]+)%,\s*([0-9]+)%,?\s*([0-9.]+)?\)\s*$/i,
  ga = /^\s*#?([0-9a-f]{3}|[0-9a-f]{6})\s*$/i, Qb = /^\s*#?([0-9a-f]{3})\s*$/i, ey = {
    hex: Ac,
    rgb: Ic,
    hsl: Oc
  }, Eo = {
    hex: "transparent",
    rgb: "rgba(0, 0, 0, 0)",
    hsl: "hsla(0, 0%, 0%, 0)"
  }, Mc = /* @__PURE__ */ a((e) => {
    let t = e?.match(Yb);
    if (!t)
      return [0, 0, 0, 1];
    let [, r, o, n, i = 1] = t;
    return [r, o, n, i].map(Number);
  }, "stringToArgs"), ty = /* @__PURE__ */ a((e) => {
    let [t, r, o, n] = Mc(e), [i, s, l] = Ie.default.rgb.hsl([t, r, o]) || [0, 0, 0];
    return {
      valid: !0,
      value: e,
      keyword: Ie.default.rgb.keyword([t, r, o]),
      colorSpace: "rgb",
      rgb: e,
      hsl: `hsla(${i}, ${s}%, ${l}%, ${n})`,
      hex: `#${Ie.default.rgb.hex([t, r, o]).toLowerCase()}`
    };
  }, "parseRgb"), ry = /* @__PURE__ */ a((e) => {
    let [t, r, o, n] = Mc(e), [i, s, l] = Ie.default.hsl.rgb([t, r, o]) || [0, 0, 0];
    return {
      valid: !0,
      value: e,
      keyword: Ie.default.hsl.keyword([t, r, o]),
      colorSpace: "hsl",
      rgb: `rgba(${i}, ${s}, ${l}, ${n})`,
      hsl: e,
      hex: `#${Ie.default.hsl.hex([t, r, o]).toLowerCase()}`
    };
  }, "parseHsl"), oy = /* @__PURE__ */ a((e) => {
    let t = e.replace("#", ""), r = Ie.default.keyword.rgb(t) || Ie.default.hex.rgb(t), o = Ie.default.rgb.hsl(r), n = e;
    /[^#a-f0-9]/i.test(e) ? n = t : ga.test(e) && (n = `#${t}`);
    let i = !0;
    if (n.startsWith("#"))
      i = ga.test(n);
    else
      try {
        Ie.default.keyword.hex(n);
      } catch {
        i = !1;
      }
    return {
      valid: i,
      value: n,
      keyword: Ie.default.rgb.keyword(r),
      colorSpace: "hex",
      rgb: `rgba(${r[0]}, ${r[1]}, ${r[2]}, 1)`,
      hsl: `hsla(${o[0]}, ${o[1]}%, ${o[2]}%, 1)`,
      hex: n
    };
  }, "parseHexOrKeyword"), Gt = /* @__PURE__ */ a((e) => {
    if (e)
      return Xb.test(e) ? ty(e) : Zb.test(e) ? ry(e) : oy(e);
  }, "parseValue"), ny = /* @__PURE__ */ a((e, t, r) => {
    if (!e || !t?.valid)
      return Eo[r];
    if (r !== "hex")
      return t?.[r] || Eo[r];
    if (!t.hex.startsWith("#"))
      try {
        return `#${Ie.default.keyword.hex(t.hex)}`;
      } catch {
        return Eo.hex;
      }
    let o = t.hex.match(Qb);
    if (!o)
      return ga.test(t.hex) ? t.hex : Eo.hex;
    let [n, i, s] = o[1].split("");
    return `#${n}${n}${i}${i}${s}${s}`;
  }, "getRealValue"), ay = /* @__PURE__ */ a((e, t) => {
    let [r, o] = So(e || ""), [n, i] = So(() => Gt(r)), [s, l] = So(n?.colorSpace || "hex");
    Nc(() => {
      let g = e || "", p = Gt(g);
      o(g), i(p), l(p?.colorSpace || "hex");
    }, [e]);
    let c = _c(
      () => ny(r, n, s).toLowerCase(),
      [r, n, s]
    ), u = Co(
      (g) => {
        let p = Gt(g), m = p?.value || g || "";
        o(m), m === "" && (i(void 0), t(void 0)), p && (i(p), l(p.colorSpace), t(p.value));
      },
      [t]
    ), d = Co(() => {
      let p = (ma.indexOf(s) + 1) % ma.length, m = ma[p];
      l(m);
      let f = n?.[m] || "";
      o(f), t(f);
    }, [n, s, t]);
    return { value: r, realValue: c, updateValue: u, color: n, colorSpace: s, cycleColorSpace: d };
  }, "useColorInput"), wo = /* @__PURE__ */ a((e) => e.replace(/\s*/, "").toLowerCase(), "id"), iy = /* @__PURE__ */ a((e, t, r) => {
    let [o, n] = So(t?.valid ? [t] : []);
    Nc(() => {
      t === void 0 && n([]);
    }, [t]);
    let i = _c(() => (e || []).map((c) => typeof c == "string" ? Gt(c) : c.title ? { ...Gt(c.color), keyword: c.title } : Gt(c.color)).concat(
    o).filter(Boolean).slice(-27), [e, o]), s = Co(
      (l) => {
        l?.valid && (i.some(
          (c) => c && c[r] && wo(c[r] || "") === wo(l[r] || "")
        ) || n((c) => c.concat(l)));
      },
      [r, i]
    );
    return { presets: i, addPreset: s };
  }, "usePresets"), Fc = /* @__PURE__ */ a(({
    name: e,
    value: t,
    onChange: r,
    onFocus: o,
    onBlur: n,
    presetColors: i,
    startOpen: s = !1,
    argType: l
  }) => {
    let c = Co(bn(r, 200), [r]), { value: u, realValue: d, updateValue: g, color: p, colorSpace: m, cycleColorSpace: f } = ay(
      t,
      c
    ), { presets: h, addPreset: b } = iy(i ?? [], p, m), y = ey[m], x = !!l?.table?.readonly;
    return /* @__PURE__ */ De.createElement(Vb, { "aria-readonly": x }, /* @__PURE__ */ De.createElement(
      zb,
      {
        startOpen: s,
        trigger: x ? null : void 0,
        closeOnOutsideClick: !0,
        onVisibleChange: () => p && b(p),
        tooltip: /* @__PURE__ */ De.createElement($b, null, /* @__PURE__ */ De.createElement(
          y,
          {
            color: d === "transparent" ? "#000000" : d,
            onChange: g,
            onFocus: o,
            onBlur: n
          }
        ), h.length > 0 && /* @__PURE__ */ De.createElement(qb, null, h.map((v, S) => /* @__PURE__ */ De.createElement(
          Dc,
          {
            key: `${v?.value || S}-${S}`,
            hasChrome: !1,
            tooltip: /* @__PURE__ */ De.createElement(Ub, { note: v?.keyword || v?.value || "" })
          },
          /* @__PURE__ */ De.createElement(
            Lc,
            {
              value: v?.[m] || "",
              active: !!(p && v && v[m] && wo(v[m] || "") === wo(p[m])),
              onClick: () => v && g(v.value || "")
            }
          )
        ))))
      },
      /* @__PURE__ */ De.createElement(Lc, { value: d, style: { margin: 4 } })
    ), /* @__PURE__ */ De.createElement(
      Jb,
      {
        id: Z(e),
        value: u,
        onChange: (v) => g(v.target.value),
        onFocus: (v) => v.target.select(),
        readOnly: x,
        placeholder: "Choose color..."
      }
    ), u ? /* @__PURE__ */ De.createElement(Kb, { onClick: f }) : null);
  }, "ColorControl"), sy = Fc;
});

// ../node_modules/memoizerific/memoizerific.js
var Wc = K((qc, ya) => {
  (function(e) {
    if (typeof qc == "object" && typeof ya < "u")
      ya.exports = e();
    else if (typeof define == "function" && define.amd)
      define([], e);
    else {
      var t;
      typeof window < "u" ? t = window : typeof global < "u" ? t = global : typeof self < "u" ? t = self : t = this, t.memoizerific = e();
    }
  })(function() {
    var e, t, r;
    return (/* @__PURE__ */ a(function o(n, i, s) {
      function l(d, g) {
        if (!i[d]) {
          if (!n[d]) {
            var p = typeof rr == "function" && rr;
            if (!g && p) return p(d, !0);
            if (c) return c(d, !0);
            var m = new Error("Cannot find module '" + d + "'");
            throw m.code = "MODULE_NOT_FOUND", m;
          }
          var f = i[d] = { exports: {} };
          n[d][0].call(f.exports, function(h) {
            var b = n[d][1][h];
            return l(b || h);
          }, f, f.exports, o, n, i, s);
        }
        return i[d].exports;
      }
      a(l, "s");
      for (var c = typeof rr == "function" && rr, u = 0; u < s.length; u++) l(s[u]);
      return l;
    }, "e"))({ 1: [function(o, n, i) {
      n.exports = function(s) {
        if (typeof Map != "function" || s) {
          var l = o("./similar");
          return new l();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(o, n, i) {
      function s() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      a(s, "Similar"), s.prototype.get = function(l) {
        var c;
        if (this.lastItem && this.isEqual(this.lastItem.key, l))
          return this.lastItem.val;
        if (c = this.indexOf(l), c >= 0)
          return this.lastItem = this.list[c], this.list[c].val;
      }, s.prototype.set = function(l, c) {
        var u;
        return this.lastItem && this.isEqual(this.lastItem.key, l) ? (this.lastItem.val = c, this) : (u = this.indexOf(l), u >= 0 ? (this.lastItem =
        this.list[u], this.list[u].val = c, this) : (this.lastItem = { key: l, val: c }, this.list.push(this.lastItem), this.size++, this));
      }, s.prototype.delete = function(l) {
        var c;
        if (this.lastItem && this.isEqual(this.lastItem.key, l) && (this.lastItem = void 0), c = this.indexOf(l), c >= 0)
          return this.size--, this.list.splice(c, 1)[0];
      }, s.prototype.has = function(l) {
        var c;
        return this.lastItem && this.isEqual(this.lastItem.key, l) ? !0 : (c = this.indexOf(l), c >= 0 ? (this.lastItem = this.list[c], !0) :
        !1);
      }, s.prototype.forEach = function(l, c) {
        var u;
        for (u = 0; u < this.size; u++)
          l.call(c || this, this.list[u].val, this.list[u].key, this);
      }, s.prototype.indexOf = function(l) {
        var c;
        for (c = 0; c < this.size; c++)
          if (this.isEqual(this.list[c].key, l))
            return c;
        return -1;
      }, s.prototype.isEqual = function(l, c) {
        return l === c || l !== l && c !== c;
      }, n.exports = s;
    }, {}], 3: [function(o, n, i) {
      var s = o("map-or-similar");
      n.exports = function(d) {
        var g = new s(!1), p = [];
        return function(m) {
          var f = /* @__PURE__ */ a(function() {
            var h = g, b, y, x = arguments.length - 1, v = Array(x + 1), S = !0, w;
            if ((f.numArgs || f.numArgs === 0) && f.numArgs !== x + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (w = 0; w < x; w++) {
              if (v[w] = {
                cacheItem: h,
                arg: arguments[w]
              }, h.has(arguments[w])) {
                h = h.get(arguments[w]);
                continue;
              }
              S = !1, b = new s(!1), h.set(arguments[w], b), h = b;
            }
            return S && (h.has(arguments[x]) ? y = h.get(arguments[x]) : S = !1), S || (y = m.apply(null, arguments), h.set(arguments[x], y)),
            d > 0 && (v[x] = {
              cacheItem: h,
              arg: arguments[x]
            }, S ? l(p, v) : p.push(v), p.length > d && c(p.shift())), f.wasMemoized = S, f.numArgs = x + 1, y;
          }, "memoizerific");
          return f.limit = d, f.wasMemoized = !1, f.cache = g, f.lru = p, f;
        };
      };
      function l(d, g) {
        var p = d.length, m = g.length, f, h, b;
        for (h = 0; h < p; h++) {
          for (f = !0, b = 0; b < m; b++)
            if (!u(d[h][b].arg, g[b].arg)) {
              f = !1;
              break;
            }
          if (f)
            break;
        }
        d.push(d.splice(h, 1)[0]);
      }
      a(l, "moveToMostRecentLru");
      function c(d) {
        var g = d.length, p = d[g - 1], m, f;
        for (p.cacheItem.delete(p.arg), f = g - 2; f >= 0 && (p = d[f], m = p.cacheItem.get(p.arg), !m || !m.size); f--)
          p.cacheItem.delete(p.arg);
      }
      a(c, "removeCachedResult");
      function u(d, g) {
        return d === g || d !== d && g !== g;
      }
      a(u, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});

// ../node_modules/entities/lib/maps/entities.json
var Ua = K((UN, d1) => {
  d1.exports = { Aacute: "\xC1", aacute: "\xE1", Abreve: "\u0102", abreve: "\u0103", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", Acirc: "\
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
var Gp = K((qN, f1) => {
  f1.exports = { Aacute: "\xC1", aacute: "\xE1", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", AElig: "\xC6", aelig: "\xE6", Agrave: "\xC0", agrave: "\
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
var qa = K((WN, m1) => {
  m1.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
});

// ../node_modules/entities/lib/maps/decode.json
var Jp = K((GN, g1) => {
  g1.exports = { "0": 65533, "128": 8364, "130": 8218, "131": 402, "132": 8222, "133": 8230, "134": 8224, "135": 8225, "136": 710, "137": 8240,
  "138": 352, "139": 8249, "140": 338, "142": 381, "145": 8216, "146": 8217, "147": 8220, "148": 8221, "149": 8226, "150": 8211, "151": 8212,
  "152": 732, "153": 8482, "154": 353, "155": 8250, "156": 339, "158": 382, "159": 376 };
});

// ../node_modules/entities/lib/decode_codepoint.js
var Yp = K((Tr) => {
  "use strict";
  var h1 = Tr && Tr.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(Tr, "__esModule", { value: !0 });
  var Kp = h1(Jp()), b1 = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.fromCodePoint || function(e) {
      var t = "";
      return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e),
      t;
    }
  );
  function y1(e) {
    return e >= 55296 && e <= 57343 || e > 1114111 ? "\uFFFD" : (e in Kp.default && (e = Kp.default[e]), b1(e));
  }
  a(y1, "decodeCodePoint");
  Tr.default = y1;
});

// ../node_modules/entities/lib/decode.js
var Ga = K((We) => {
  "use strict";
  var Fo = We && We.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(We, "__esModule", { value: !0 });
  We.decodeHTML = We.decodeHTMLStrict = We.decodeXML = void 0;
  var Wa = Fo(Ua()), x1 = Fo(Gp()), v1 = Fo(qa()), Xp = Fo(Yp()), E1 = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
  We.decodeXML = Qp(v1.default);
  We.decodeHTMLStrict = Qp(Wa.default);
  function Qp(e) {
    var t = eu(e);
    return function(r) {
      return String(r).replace(E1, t);
    };
  }
  a(Qp, "getStrictDecoder");
  var Zp = /* @__PURE__ */ a(function(e, t) {
    return e < t ? 1 : -1;
  }, "sorter");
  We.decodeHTML = function() {
    for (var e = Object.keys(x1.default).sort(Zp), t = Object.keys(Wa.default).sort(Zp), r = 0, o = 0; r < t.length; r++)
      e[o] === t[r] ? (t[r] += ";?", o++) : t[r] += ";";
    var n = new RegExp("&(?:" + t.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), i = eu(Wa.default);
    function s(l) {
      return l.substr(-1) !== ";" && (l += ";"), i(l);
    }
    return a(s, "replacer"), function(l) {
      return String(l).replace(n, s);
    };
  }();
  function eu(e) {
    return /* @__PURE__ */ a(function(r) {
      if (r.charAt(1) === "#") {
        var o = r.charAt(2);
        return o === "X" || o === "x" ? Xp.default(parseInt(r.substr(3), 16)) : Xp.default(parseInt(r.substr(2), 10));
      }
      return e[r.slice(1, -1)] || r;
    }, "replace");
  }
  a(eu, "getReplacer");
});

// ../node_modules/entities/lib/encode.js
var Ka = K((Ae) => {
  "use strict";
  var tu = Ae && Ae.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(Ae, "__esModule", { value: !0 });
  Ae.escapeUTF8 = Ae.escape = Ae.encodeNonAsciiHTML = Ae.encodeHTML = Ae.encodeXML = void 0;
  var S1 = tu(qa()), ru = nu(S1.default), ou = au(ru);
  Ae.encodeXML = lu(ru);
  var C1 = tu(Ua()), Ja = nu(C1.default), w1 = au(Ja);
  Ae.encodeHTML = A1(Ja, w1);
  Ae.encodeNonAsciiHTML = lu(Ja);
  function nu(e) {
    return Object.keys(e).sort().reduce(function(t, r) {
      return t[e[r]] = "&" + r + ";", t;
    }, {});
  }
  a(nu, "getInverseObj");
  function au(e) {
    for (var t = [], r = [], o = 0, n = Object.keys(e); o < n.length; o++) {
      var i = n[o];
      i.length === 1 ? t.push("\\" + i) : r.push(i);
    }
    t.sort();
    for (var s = 0; s < t.length - 1; s++) {
      for (var l = s; l < t.length - 1 && t[l].charCodeAt(1) + 1 === t[l + 1].charCodeAt(1); )
        l += 1;
      var c = 1 + l - s;
      c < 3 || t.splice(s, c, t[s] + "-" + t[l]);
    }
    return r.unshift("[" + t.join("") + "]"), new RegExp(r.join("|"), "g");
  }
  a(au, "getInverseReplacer");
  var iu = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
  T1 = (
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
  function jo(e) {
    return "&#x" + (e.length > 1 ? T1(e) : e.charCodeAt(0)).toString(16).toUpperCase() + ";";
  }
  a(jo, "singleCharReplacer");
  function A1(e, t) {
    return function(r) {
      return r.replace(t, function(o) {
        return e[o];
      }).replace(iu, jo);
    };
  }
  a(A1, "getInverse");
  var su = new RegExp(ou.source + "|" + iu.source, "g");
  function k1(e) {
    return e.replace(su, jo);
  }
  a(k1, "escape");
  Ae.escape = k1;
  function O1(e) {
    return e.replace(ou, jo);
  }
  a(O1, "escapeUTF8");
  Ae.escapeUTF8 = O1;
  function lu(e) {
    return function(t) {
      return t.replace(su, function(r) {
        return e[r] || jo(r);
      });
    };
  }
  a(lu, "getASCIIEncoder");
});

// ../node_modules/entities/lib/index.js
var pu = K((j) => {
  "use strict";
  Object.defineProperty(j, "__esModule", { value: !0 });
  j.decodeXMLStrict = j.decodeHTML5Strict = j.decodeHTML4Strict = j.decodeHTML5 = j.decodeHTML4 = j.decodeHTMLStrict = j.decodeHTML = j.decodeXML =
  j.encodeHTML5 = j.encodeHTML4 = j.escapeUTF8 = j.escape = j.encodeNonAsciiHTML = j.encodeHTML = j.encodeXML = j.encode = j.decodeStrict = j.
  decode = void 0;
  var Ro = Ga(), cu = Ka();
  function I1(e, t) {
    return (!t || t <= 0 ? Ro.decodeXML : Ro.decodeHTML)(e);
  }
  a(I1, "decode");
  j.decode = I1;
  function P1(e, t) {
    return (!t || t <= 0 ? Ro.decodeXML : Ro.decodeHTMLStrict)(e);
  }
  a(P1, "decodeStrict");
  j.decodeStrict = P1;
  function L1(e, t) {
    return (!t || t <= 0 ? cu.encodeXML : cu.encodeHTML)(e);
  }
  a(L1, "encode");
  j.encode = L1;
  var _t = Ka();
  Object.defineProperty(j, "encodeXML", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return _t.encodeXML;
  }, "get") });
  Object.defineProperty(j, "encodeHTML", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return _t.encodeHTML;
  }, "get") });
  Object.defineProperty(j, "encodeNonAsciiHTML", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return _t.encodeNonAsciiHTML;
  }, "get") });
  Object.defineProperty(j, "escape", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return _t.escape;
  }, "get") });
  Object.defineProperty(j, "escapeUTF8", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return _t.escapeUTF8;
  }, "get") });
  Object.defineProperty(j, "encodeHTML4", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return _t.encodeHTML;
  }, "get") });
  Object.defineProperty(j, "encodeHTML5", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return _t.encodeHTML;
  }, "get") });
  var bt = Ga();
  Object.defineProperty(j, "decodeXML", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return bt.decodeXML;
  }, "get") });
  Object.defineProperty(j, "decodeHTML", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return bt.decodeHTML;
  }, "get") });
  Object.defineProperty(j, "decodeHTMLStrict", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return bt.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(j, "decodeHTML4", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return bt.decodeHTML;
  }, "get") });
  Object.defineProperty(j, "decodeHTML5", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return bt.decodeHTML;
  }, "get") });
  Object.defineProperty(j, "decodeHTML4Strict", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return bt.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(j, "decodeHTML5Strict", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return bt.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(j, "decodeXMLStrict", { enumerable: !0, get: /* @__PURE__ */ a(function() {
    return bt.decodeXML;
  }, "get") });
});

// ../node_modules/ansi-to-html/lib/ansi_to_html.js
var Eu = K((r_, vu) => {
  "use strict";
  function N1(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  a(N1, "_classCallCheck");
  function uu(e, t) {
    for (var r = 0; r < t.length; r++) {
      var o = t[r];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
    }
  }
  a(uu, "_defineProperties");
  function _1(e, t, r) {
    return t && uu(e.prototype, t), r && uu(e, r), e;
  }
  a(_1, "_createClass");
  function bu(e, t) {
    var r = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
    if (!r) {
      if (Array.isArray(e) || (r = D1(e)) || t && e && typeof e.length == "number") {
        r && (e = r);
        var o = 0, n = /* @__PURE__ */ a(function() {
        }, "F");
        return { s: n, n: /* @__PURE__ */ a(function() {
          return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] };
        }, "n"), e: /* @__PURE__ */ a(function(u) {
          throw u;
        }, "e"), f: n };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var i = !0, s = !1, l;
    return { s: /* @__PURE__ */ a(function() {
      r = r.call(e);
    }, "s"), n: /* @__PURE__ */ a(function() {
      var u = r.next();
      return i = u.done, u;
    }, "n"), e: /* @__PURE__ */ a(function(u) {
      s = !0, l = u;
    }, "e"), f: /* @__PURE__ */ a(function() {
      try {
        !i && r.return != null && r.return();
      } finally {
        if (s) throw l;
      }
    }, "f") };
  }
  a(bu, "_createForOfIteratorHelper");
  function D1(e, t) {
    if (e) {
      if (typeof e == "string") return du(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(e);
      if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return du(e, t);
    }
  }
  a(D1, "_unsupportedIterableToArray");
  function du(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var r = 0, o = new Array(t); r < t; r++)
      o[r] = e[r];
    return o;
  }
  a(du, "_arrayLikeToArray");
  var B1 = pu(), fu = {
    fg: "#FFF",
    bg: "#000",
    newline: !1,
    escapeXML: !1,
    stream: !1,
    colors: M1()
  };
  function M1() {
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
    return Ho(0, 5).forEach(function(t) {
      Ho(0, 5).forEach(function(r) {
        Ho(0, 5).forEach(function(o) {
          return F1(t, r, o, e);
        });
      });
    }), Ho(0, 23).forEach(function(t) {
      var r = t + 232, o = yu(t * 10 + 8);
      e[r] = "#" + o + o + o;
    }), e;
  }
  a(M1, "getDefaultColors");
  function F1(e, t, r, o) {
    var n = 16 + e * 36 + t * 6 + r, i = e > 0 ? e * 40 + 55 : 0, s = t > 0 ? t * 40 + 55 : 0, l = r > 0 ? r * 40 + 55 : 0;
    o[n] = j1([i, s, l]);
  }
  a(F1, "setStyleColor");
  function yu(e) {
    for (var t = e.toString(16); t.length < 2; )
      t = "0" + t;
    return t;
  }
  a(yu, "toHexString");
  function j1(e) {
    var t = [], r = bu(e), o;
    try {
      for (r.s(); !(o = r.n()).done; ) {
        var n = o.value;
        t.push(yu(n));
      }
    } catch (i) {
      r.e(i);
    } finally {
      r.f();
    }
    return "#" + t.join("");
  }
  a(j1, "toColorHexString");
  function mu(e, t, r, o) {
    var n;
    return t === "text" ? n = z1(r, o) : t === "display" ? n = H1(e, r, o) : t === "xterm256Foreground" ? n = zo(e, o.colors[r]) : t === "xt\
erm256Background" ? n = $o(e, o.colors[r]) : t === "rgb" && (n = R1(e, r)), n;
  }
  a(mu, "generateOutput");
  function R1(e, t) {
    t = t.substring(2).slice(0, -1);
    var r = +t.substr(0, 2), o = t.substring(5).split(";"), n = o.map(function(i) {
      return ("0" + Number(i).toString(16)).substr(-2);
    }).join("");
    return Vo(e, (r === 38 ? "color:#" : "background-color:#") + n);
  }
  a(R1, "handleRgb");
  function H1(e, t, r) {
    t = parseInt(t, 10);
    var o = {
      "-1": /* @__PURE__ */ a(function() {
        return "<br/>";
      }, "_"),
      0: /* @__PURE__ */ a(function() {
        return e.length && xu(e);
      }, "_"),
      1: /* @__PURE__ */ a(function() {
        return yt(e, "b");
      }, "_"),
      3: /* @__PURE__ */ a(function() {
        return yt(e, "i");
      }, "_"),
      4: /* @__PURE__ */ a(function() {
        return yt(e, "u");
      }, "_"),
      8: /* @__PURE__ */ a(function() {
        return Vo(e, "display:none");
      }, "_"),
      9: /* @__PURE__ */ a(function() {
        return yt(e, "strike");
      }, "_"),
      22: /* @__PURE__ */ a(function() {
        return Vo(e, "font-weight:normal;text-decoration:none;font-style:normal");
      }, "_"),
      23: /* @__PURE__ */ a(function() {
        return hu(e, "i");
      }, "_"),
      24: /* @__PURE__ */ a(function() {
        return hu(e, "u");
      }, "_"),
      39: /* @__PURE__ */ a(function() {
        return zo(e, r.fg);
      }, "_"),
      49: /* @__PURE__ */ a(function() {
        return $o(e, r.bg);
      }, "_"),
      53: /* @__PURE__ */ a(function() {
        return Vo(e, "text-decoration:overline");
      }, "_")
    }, n;
    return o[t] ? n = o[t]() : 4 < t && t < 7 ? n = yt(e, "blink") : 29 < t && t < 38 ? n = zo(e, r.colors[t - 30]) : 39 < t && t < 48 ? n =
    $o(e, r.colors[t - 40]) : 89 < t && t < 98 ? n = zo(e, r.colors[8 + (t - 90)]) : 99 < t && t < 108 && (n = $o(e, r.colors[8 + (t - 100)])),
    n;
  }
  a(H1, "handleDisplay");
  function xu(e) {
    var t = e.slice(0);
    return e.length = 0, t.reverse().map(function(r) {
      return "</" + r + ">";
    }).join("");
  }
  a(xu, "resetStyles");
  function Ho(e, t) {
    for (var r = [], o = e; o <= t; o++)
      r.push(o);
    return r;
  }
  a(Ho, "range");
  function V1(e) {
    return function(t) {
      return (e === null || t.category !== e) && e !== "all";
    };
  }
  a(V1, "notCategory");
  function gu(e) {
    e = parseInt(e, 10);
    var t = null;
    return e === 0 ? t = "all" : e === 1 ? t = "bold" : 2 < e && e < 5 ? t = "underline" : 4 < e && e < 7 ? t = "blink" : e === 8 ? t = "hid\
e" : e === 9 ? t = "strike" : 29 < e && e < 38 || e === 39 || 89 < e && e < 98 ? t = "foreground-color" : (39 < e && e < 48 || e === 49 || 99 <
    e && e < 108) && (t = "background-color"), t;
  }
  a(gu, "categoryForCode");
  function z1(e, t) {
    return t.escapeXML ? B1.encodeXML(e) : e;
  }
  a(z1, "pushText");
  function yt(e, t, r) {
    return r || (r = ""), e.push(t), "<".concat(t).concat(r ? ' style="'.concat(r, '"') : "", ">");
  }
  a(yt, "pushTag");
  function Vo(e, t) {
    return yt(e, "span", t);
  }
  a(Vo, "pushStyle");
  function zo(e, t) {
    return yt(e, "span", "color:" + t);
  }
  a(zo, "pushForegroundColor");
  function $o(e, t) {
    return yt(e, "span", "background-color:" + t);
  }
  a($o, "pushBackgroundColor");
  function hu(e, t) {
    var r;
    if (e.slice(-1)[0] === t && (r = e.pop()), r)
      return "</" + t + ">";
  }
  a(hu, "closeTag");
  function $1(e, t, r) {
    var o = !1, n = 3;
    function i() {
      return "";
    }
    a(i, "remove");
    function s(w, E) {
      return r("xterm256Foreground", E), "";
    }
    a(s, "removeXterm256Foreground");
    function l(w, E) {
      return r("xterm256Background", E), "";
    }
    a(l, "removeXterm256Background");
    function c(w) {
      return t.newline ? r("display", -1) : r("text", w), "";
    }
    a(c, "newline");
    function u(w, E) {
      o = !0, E.trim().length === 0 && (E = "0"), E = E.trimRight(";").split(";");
      var I = bu(E), D;
      try {
        for (I.s(); !(D = I.n()).done; ) {
          var _ = D.value;
          r("display", _);
        }
      } catch (z) {
        I.e(z);
      } finally {
        I.f();
      }
      return "";
    }
    a(u, "ansiMess");
    function d(w) {
      return r("text", w), "";
    }
    a(d, "realText");
    function g(w) {
      return r("rgb", w), "";
    }
    a(g, "rgb");
    var p = [{
      pattern: /^\x08+/,
      sub: i
    }, {
      pattern: /^\x1b\[[012]?K/,
      sub: i
    }, {
      pattern: /^\x1b\[\(B/,
      sub: i
    }, {
      pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/,
      sub: g
    }, {
      pattern: /^\x1b\[38;5;(\d+)m/,
      sub: s
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
      sub: u
    }, {
      // CSI n J
      // ED - Erase in Display Clears part of the screen.
      // If n is 0 (or missing), clear from cursor to end of screen.
      // If n is 1, clear from cursor to beginning of the screen.
      // If n is 2, clear entire screen (and moves cursor to upper left on DOS ANSI.SYS).
      // If n is 3, clear entire screen and delete all lines saved in the scrollback buffer
      //   (this feature was added for xterm and is supported by other terminal applications).
      pattern: /^\x1b\[\d?J/,
      sub: i
    }, {
      // CSI n ; m f
      // HVP - Horizontal Vertical Position Same as CUP
      pattern: /^\x1b\[\d{0,3};\d{0,3}f/,
      sub: i
    }, {
      // catch-all for CSI sequences?
      pattern: /^\x1b\[?[\d;]{0,3}/,
      sub: i
    }, {
      /**
       * extracts real text - not containing:
       * - `\x1b' - ESC - escape (Ascii 27)
       * - '\x08' - BS - backspace (Ascii 8)
       * - `\n` - Newline - linefeed (LF) (ascii 10)
       * - `\r` - Windows Carriage Return (CR)
       */
      pattern: /^(([^\x1b\x08\r\n])+)/,
      sub: d
    }];
    function m(w, E) {
      E > n && o || (o = !1, e = e.replace(w.pattern, w.sub));
    }
    a(m, "process");
    var f = [], h = e, b = h.length;
    e: for (; b > 0; ) {
      for (var y = 0, x = 0, v = p.length; x < v; y = ++x) {
        var S = p[y];
        if (m(S, y), e.length !== b) {
          b = e.length;
          continue e;
        }
      }
      if (e.length === b)
        break;
      f.push(0), b = e.length;
    }
    return f;
  }
  a($1, "tokenize");
  function U1(e, t, r) {
    return t !== "text" && (e = e.filter(V1(gu(r))), e.push({
      token: t,
      data: r,
      category: gu(r)
    })), e;
  }
  a(U1, "updateStickyStack");
  var q1 = /* @__PURE__ */ function() {
    function e(t) {
      N1(this, e), t = t || {}, t.colors && (t.colors = Object.assign({}, fu.colors, t.colors)), this.options = Object.assign({}, fu, t), this.
      stack = [], this.stickyStack = [];
    }
    return a(e, "Filter"), _1(e, [{
      key: "toHtml",
      value: /* @__PURE__ */ a(function(r) {
        var o = this;
        r = typeof r == "string" ? [r] : r;
        var n = this.stack, i = this.options, s = [];
        return this.stickyStack.forEach(function(l) {
          var c = mu(n, l.token, l.data, i);
          c && s.push(c);
        }), $1(r.join(""), i, function(l, c) {
          var u = mu(n, l, c, i);
          u && s.push(u), i.stream && (o.stickyStack = U1(o.stickyStack, l, c));
        }), n.length && s.push(xu(n)), s.join("");
      }, "toHtml")
    }]), e;
  }();
  vu.exports = q1;
});

// ../node_modules/@devtools-ds/object-inspector/node_modules/@babel/runtime/helpers/extends.js
var Uo = K((k_, ti) => {
  function ei() {
    return ti.exports = ei = Object.assign || function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var o in r)
          Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
      }
      return e;
    }, ei.apply(this, arguments);
  }
  a(ei, "_extends");
  ti.exports = ei;
});

// ../node_modules/@devtools-ds/object-inspector/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js
var Ou = K((I_, ku) => {
  function iv(e, t) {
    if (e == null) return {};
    var r = {}, o = Object.keys(e), n, i;
    for (i = 0; i < o.length; i++)
      n = o[i], !(t.indexOf(n) >= 0) && (r[n] = e[n]);
    return r;
  }
  a(iv, "_objectWithoutPropertiesLoose");
  ku.exports = iv;
});

// ../node_modules/@devtools-ds/object-inspector/node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var qo = K((L_, Iu) => {
  var sv = Ou();
  function lv(e, t) {
    if (e == null) return {};
    var r = sv(e, t), o, n;
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(e);
      for (n = 0; n < i.length; n++)
        o = i[n], !(t.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(e, o) && (r[o] = e[o]);
    }
    return r;
  }
  a(lv, "_objectWithoutProperties");
  Iu.exports = lv;
});

// ../node_modules/@devtools-ds/themes/node_modules/@babel/runtime/helpers/defineProperty.js
var Nu = K((F_, Lu) => {
  function pv(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = r, e;
  }
  a(pv, "_defineProperty");
  Lu.exports = pv;
});

// ../node_modules/@devtools-ds/themes/node_modules/@babel/runtime/helpers/objectSpread2.js
var Bu = K((R_, Du) => {
  var uv = Nu();
  function _u(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      t && (o = o.filter(function(n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })), r.push.apply(r, o);
    }
    return r;
  }
  a(_u, "ownKeys");
  function dv(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t] != null ? arguments[t] : {};
      t % 2 ? _u(r, !0).forEach(function(o) {
        uv(e, o, r[o]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _u(r).forEach(function(o) {
        Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
      });
    }
    return e;
  }
  a(dv, "_objectSpread2");
  Du.exports = dv;
});

// ../node_modules/@devtools-ds/themes/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js
var Fu = K((V_, Mu) => {
  function fv(e, t) {
    if (e == null) return {};
    var r = {}, o = Object.keys(e), n, i;
    for (i = 0; i < o.length; i++)
      n = o[i], !(t.indexOf(n) >= 0) && (r[n] = e[n]);
    return r;
  }
  a(fv, "_objectWithoutPropertiesLoose");
  Mu.exports = fv;
});

// ../node_modules/@devtools-ds/themes/node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var Ru = K(($_, ju) => {
  var mv = Fu();
  function gv(e, t) {
    if (e == null) return {};
    var r = mv(e, t), o, n;
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(e);
      for (n = 0; n < i.length; n++)
        o = i[n], !(t.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(e, o) && (r[o] = e[o]);
    }
    return r;
  }
  a(gv, "_objectWithoutProperties");
  ju.exports = gv;
});

// ../node_modules/@devtools-ds/object-inspector/node_modules/@babel/runtime/helpers/defineProperty.js
var $u = K((K_, zu) => {
  function bv(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = r, e;
  }
  a(bv, "_defineProperty");
  zu.exports = bv;
});

// ../node_modules/@devtools-ds/object-inspector/node_modules/@babel/runtime/helpers/objectSpread2.js
var Wu = K((X_, qu) => {
  var yv = $u();
  function Uu(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      t && (o = o.filter(function(n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })), r.push.apply(r, o);
    }
    return r;
  }
  a(Uu, "ownKeys");
  function xv(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t] != null ? arguments[t] : {};
      t % 2 ? Uu(r, !0).forEach(function(o) {
        yv(e, o, r[o]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Uu(r).forEach(function(o) {
        Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o));
      });
    }
    return e;
  }
  a(xv, "_objectSpread2");
  qu.exports = xv;
});

// ../node_modules/@devtools-ds/tree/node_modules/@babel/runtime/helpers/extends.js
var Gu = K((Q_, ci) => {
  function li() {
    return ci.exports = li = Object.assign || function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var o in r)
          Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
      }
      return e;
    }, li.apply(this, arguments);
  }
  a(li, "_extends");
  ci.exports = li;
});

// ../node_modules/@devtools-ds/tree/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js
var Ku = K((tD, Ju) => {
  function vv(e, t) {
    if (e == null) return {};
    var r = {}, o = Object.keys(e), n, i;
    for (i = 0; i < o.length; i++)
      n = o[i], !(t.indexOf(n) >= 0) && (r[n] = e[n]);
    return r;
  }
  a(vv, "_objectWithoutPropertiesLoose");
  Ju.exports = vv;
});

// ../node_modules/@devtools-ds/tree/node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var Xu = K((oD, Yu) => {
  var Ev = Ku();
  function Sv(e, t) {
    if (e == null) return {};
    var r = Ev(e, t), o, n;
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(e);
      for (n = 0; n < i.length; n++)
        o = i[n], !(t.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(e, o) && (r[o] = e[o]);
    }
    return r;
  }
  a(Sv, "_objectWithoutProperties");
  Yu.exports = Sv;
});

// src/core-server/presets/common-manager.ts
import { global as OC } from "@storybook/global";
import { addons as IC } from "storybook/manager-api";

// src/controls/manager.tsx
import Be from "react";
import { AddonPanel as H0 } from "storybook/internal/components";
import { SAVE_STORY_REQUEST as dp, SAVE_STORY_RESPONSE as Oa } from "storybook/internal/core-events";
import { FailedIcon as V0, PassedIcon as fp } from "@storybook/icons";

// ../node_modules/dequal/dist/index.mjs
var Pi = Object.prototype.hasOwnProperty;
function Li(e, t, r) {
  for (r of e.keys())
    if ($e(r, t)) return r;
}
a(Li, "find");
function $e(e, t) {
  var r, o, n;
  if (e === t) return !0;
  if (e && t && (r = e.constructor) === t.constructor) {
    if (r === Date) return e.getTime() === t.getTime();
    if (r === RegExp) return e.toString() === t.toString();
    if (r === Array) {
      if ((o = e.length) === t.length)
        for (; o-- && $e(e[o], t[o]); ) ;
      return o === -1;
    }
    if (r === Set) {
      if (e.size !== t.size)
        return !1;
      for (o of e)
        if (n = o, n && typeof n == "object" && (n = Li(t, n), !n) || !t.has(n)) return !1;
      return !0;
    }
    if (r === Map) {
      if (e.size !== t.size)
        return !1;
      for (o of e)
        if (n = o[0], n && typeof n == "object" && (n = Li(t, n), !n) || !$e(o[1], t.get(n)))
          return !1;
      return !0;
    }
    if (r === ArrayBuffer)
      e = new Uint8Array(e), t = new Uint8Array(t);
    else if (r === DataView) {
      if ((o = e.byteLength) === t.byteLength)
        for (; o-- && e.getInt8(o) === t.getInt8(o); ) ;
      return o === -1;
    }
    if (ArrayBuffer.isView(e)) {
      if ((o = e.byteLength) === t.byteLength)
        for (; o-- && e[o] === t[o]; ) ;
      return o === -1;
    }
    if (!r || typeof e == "object") {
      o = 0;
      for (r in e)
        if (Pi.call(e, r) && ++o && !Pi.call(t, r) || !(r in t) || !$e(e[r], t[r])) return !1;
      return Object.keys(t).length === o;
    }
  }
  return e !== e && t !== t;
}
a($e, "dequal");

// src/controls/manager.tsx
import { addons as Ia, experimental_requestResponse as mp, types as z0 } from "storybook/manager-api";
import { color as Pa } from "storybook/theming";

// src/controls/components/ControlsPanel.tsx
import Ta, { useEffect as A0, useMemo as k0, useState as O0 } from "react";
import { global as I0 } from "@storybook/global";
import {
  useArgTypes as P0,
  useArgs as L0,
  useGlobals as N0,
  useParameter as _0,
  useStorybookState as D0
} from "storybook/manager-api";
import { styled as B0 } from "storybook/theming";

// ../addons/docs/src/blocks/components/ArgsTable/ArgsTable.tsx
or();
import G from "react";
import { once as r0 } from "storybook/internal/client-logger";
import { IconButton as o0, Link as n0, ResetWrapper as a0 } from "storybook/internal/components";
import { includeConditionalArg as i0 } from "storybook/internal/csf";
import { DocumentIcon as s0, UndoIcon as l0 } from "@storybook/icons";

// ../node_modules/@babel/runtime/helpers/esm/extends.js
function he() {
  return he = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var o in r) ({}).hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, he.apply(null, arguments);
}
a(he, "_extends");

// ../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function Ds(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
a(Ds, "_assertThisInitialized");

// ../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function ot(e, t) {
  return ot = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, ot(e, t);
}
a(ot, "_setPrototypeOf");

// ../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function Bs(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, ot(e, t);
}
a(Bs, "_inheritsLoose");

// ../node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function Wr(e) {
  return Wr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Wr(e);
}
a(Wr, "_getPrototypeOf");

// ../node_modules/@babel/runtime/helpers/esm/isNativeFunction.js
function Ms(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
a(Ms, "_isNativeFunction");

// ../node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function xn() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (xn = /* @__PURE__ */ a(function() {
    return !!e;
  }, "_isNativeReflectConstruct"))();
}
a(xn, "_isNativeReflectConstruct");

// ../node_modules/@babel/runtime/helpers/esm/construct.js
function Fs(e, t, r) {
  if (xn()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, t);
  var n = new (e.bind.apply(e, o))();
  return r && ot(n, r.prototype), n;
}
a(Fs, "_construct");

// ../node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js
function Gr(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Gr = /* @__PURE__ */ a(function(o) {
    if (o === null || !Ms(o)) return o;
    if (typeof o != "function") throw new TypeError("Super expression must either be null or a function");
    if (t !== void 0) {
      if (t.has(o)) return t.get(o);
      t.set(o, n);
    }
    function n() {
      return Fs(o, arguments, Wr(this).constructor);
    }
    return a(n, "Wrapper"), n.prototype = Object.create(o.prototype, {
      constructor: {
        value: n,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), ot(n, o);
  }, "_wrapNativeSuper"), Gr(e);
}
a(Gr, "_wrapNativeSuper");

// ../node_modules/polished/dist/polished.esm.js
var mf = {
  1: `Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0\
.4, lightness: 0.75 }).

`,
  2: `Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, satura\
tion: 0.4, lightness: 0.75, alpha: 0.7 }).

`,
  3: `Passed an incorrect argument to a color function, please pass a string representation of a color.

`,
  4: `Couldn't generate valid rgb string from %s, it returned %s.

`,
  5: `Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`,
  6: `Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, bl\
ue: 100 }).

`,
  7: `Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: \
205, blue: 100, alpha: 0.75 }).

`,
  8: `Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`,
  9: `Please provide a number of steps to the modularScale helper.

`,
  10: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
  11: `Invalid value passed as base to modularScale, expected number or em string but got "%s"

`,
  12: `Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`,
  13: `Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`,
  14: `Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`,
  15: `Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`,
  16: `You must provide a template to this method.

`,
  17: `You passed an unsupported selector state to this method.

`,
  18: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
  19: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
  20: `expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
  21: "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  22: "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  23: `fontFace expects a name of a font-family.

`,
  24: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
  25: `fontFace expects localFonts to be an array.

`,
  26: `fontFace expects fileFormats to be an array.

`,
  27: `radialGradient requries at least 2 color-stops to properly render.

`,
  28: `Please supply a filename to retinaImage() as the first argument.

`,
  29: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
  30: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  31: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`,
  32: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`,
  33: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`,
  34: `borderRadius expects a radius value as a string or number as the second argument.

`,
  35: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
  36: `Property must be a string value.

`,
  37: `Syntax Error at %s.

`,
  38: `Formula contains a function that needs parentheses at %s.

`,
  39: `Formula is missing closing parenthesis at %s.

`,
  40: `Formula has too many closing parentheses at %s.

`,
  41: `All values in a formula must have the same unit or be unitless.

`,
  42: `Please provide a number of steps to the modularScale helper.

`,
  43: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
  44: `Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`,
  45: `Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`,
  46: `Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`,
  47: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
  48: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
  49: `Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
  50: `Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`,
  51: `Expects the first argument object to have the properties prop, fromSize, and toSize.

`,
  52: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
  53: `fontFace expects localFonts to be an array.

`,
  54: `fontFace expects fileFormats to be an array.

`,
  55: `fontFace expects a name of a font-family.

`,
  56: `linearGradient requries at least 2 color-stops to properly render.

`,
  57: `radialGradient requries at least 2 color-stops to properly render.

`,
  58: `Please supply a filename to retinaImage() as the first argument.

`,
  59: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
  60: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  61: `Property must be a string value.

`,
  62: `borderRadius expects a radius value as a string or number as the second argument.

`,
  63: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
  64: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`,
  65: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animatio\
n please supply them in simple values, e.g. animation('rotate', '2s').

`,
  66: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`,
  67: `You must provide a template to this method.

`,
  68: `You passed an unsupported selector state to this method.

`,
  69: `Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`,
  70: `Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`,
  71: `Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`,
  72: `Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`,
  73: `Please provide a valid CSS variable.

`,
  74: `CSS variable not found and no default was provided.

`,
  75: `important requires a valid style object, got a %s instead.

`,
  76: `fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`,
  77: `remToPx expects a value in "rem" but you provided it in "%s".

`,
  78: `base must be set in "px" or "%" but you set it in "%s".
`
};
function gf() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var o = t[0], n = [], i;
  for (i = 1; i < t.length; i += 1)
    n.push(t[i]);
  return n.forEach(function(s) {
    o = o.replace(/%[a-z]/, s);
  }), o;
}
a(gf, "format");
var we = /* @__PURE__ */ function(e) {
  Bs(t, e);
  function t(r) {
    for (var o, n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++)
      i[s - 1] = arguments[s];
    return o = e.call(this, gf.apply(void 0, [mf[r]].concat(i))) || this, Ds(o);
  }
  return a(t, "PolishedError"), t;
}(/* @__PURE__ */ Gr(Error));
function js(e, t) {
  return e.substr(-t.length) === t;
}
a(js, "endsWith");
var hf = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
function Rs(e) {
  if (typeof e != "string") return e;
  var t = e.match(hf);
  return t ? parseFloat(e) : e;
}
a(Rs, "stripUnit");
var bf = /* @__PURE__ */ a(function(t) {
  return function(r, o) {
    o === void 0 && (o = "16px");
    var n = r, i = o;
    if (typeof r == "string") {
      if (!js(r, "px"))
        throw new we(69, t, r);
      n = Rs(r);
    }
    if (typeof o == "string") {
      if (!js(o, "px"))
        throw new we(70, t, o);
      i = Rs(o);
    }
    if (typeof n == "string")
      throw new we(71, r, t);
    if (typeof i == "string")
      throw new we(72, o, t);
    return "" + n / i + t;
  };
}, "pxtoFactory"), Vs = bf, qT = Vs("em");
var WT = Vs("rem");
function vn(e) {
  return Math.round(e * 255);
}
a(vn, "colorToInt");
function yf(e, t, r) {
  return vn(e) + "," + vn(t) + "," + vn(r);
}
a(yf, "convertToInt");
function nr(e, t, r, o) {
  if (o === void 0 && (o = yf), t === 0)
    return o(r, r, r);
  var n = (e % 360 + 360) % 360 / 60, i = (1 - Math.abs(2 * r - 1)) * t, s = i * (1 - Math.abs(n % 2 - 1)), l = 0, c = 0, u = 0;
  n >= 0 && n < 1 ? (l = i, c = s) : n >= 1 && n < 2 ? (l = s, c = i) : n >= 2 && n < 3 ? (c = i, u = s) : n >= 3 && n < 4 ? (c = s, u = i) :
  n >= 4 && n < 5 ? (l = s, u = i) : n >= 5 && n < 6 && (l = i, u = s);
  var d = r - i / 2, g = l + d, p = c + d, m = u + d;
  return o(g, p, m);
}
a(nr, "hslToRgb");
var Hs = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "00ffff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "0000ff",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "00ffff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "ff00ff",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "639",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
function xf(e) {
  if (typeof e != "string") return e;
  var t = e.toLowerCase();
  return Hs[t] ? "#" + Hs[t] : e;
}
a(xf, "nameToHex");
var vf = /^#[a-fA-F0-9]{6}$/, Ef = /^#[a-fA-F0-9]{8}$/, Sf = /^#[a-fA-F0-9]{3}$/, Cf = /^#[a-fA-F0-9]{4}$/, En = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,
wf = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i, Tf = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,
Af = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
function jt(e) {
  if (typeof e != "string")
    throw new we(3);
  var t = xf(e);
  if (t.match(vf))
    return {
      red: parseInt("" + t[1] + t[2], 16),
      green: parseInt("" + t[3] + t[4], 16),
      blue: parseInt("" + t[5] + t[6], 16)
    };
  if (t.match(Ef)) {
    var r = parseFloat((parseInt("" + t[7] + t[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + t[1] + t[2], 16),
      green: parseInt("" + t[3] + t[4], 16),
      blue: parseInt("" + t[5] + t[6], 16),
      alpha: r
    };
  }
  if (t.match(Sf))
    return {
      red: parseInt("" + t[1] + t[1], 16),
      green: parseInt("" + t[2] + t[2], 16),
      blue: parseInt("" + t[3] + t[3], 16)
    };
  if (t.match(Cf)) {
    var o = parseFloat((parseInt("" + t[4] + t[4], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + t[1] + t[1], 16),
      green: parseInt("" + t[2] + t[2], 16),
      blue: parseInt("" + t[3] + t[3], 16),
      alpha: o
    };
  }
  var n = En.exec(t);
  if (n)
    return {
      red: parseInt("" + n[1], 10),
      green: parseInt("" + n[2], 10),
      blue: parseInt("" + n[3], 10)
    };
  var i = wf.exec(t.substring(0, 50));
  if (i)
    return {
      red: parseInt("" + i[1], 10),
      green: parseInt("" + i[2], 10),
      blue: parseInt("" + i[3], 10),
      alpha: parseFloat("" + i[4]) > 1 ? parseFloat("" + i[4]) / 100 : parseFloat("" + i[4])
    };
  var s = Tf.exec(t);
  if (s) {
    var l = parseInt("" + s[1], 10), c = parseInt("" + s[2], 10) / 100, u = parseInt("" + s[3], 10) / 100, d = "rgb(" + nr(l, c, u) + ")", g = En.
    exec(d);
    if (!g)
      throw new we(4, t, d);
    return {
      red: parseInt("" + g[1], 10),
      green: parseInt("" + g[2], 10),
      blue: parseInt("" + g[3], 10)
    };
  }
  var p = Af.exec(t.substring(0, 50));
  if (p) {
    var m = parseInt("" + p[1], 10), f = parseInt("" + p[2], 10) / 100, h = parseInt("" + p[3], 10) / 100, b = "rgb(" + nr(m, f, h) + ")", y = En.
    exec(b);
    if (!y)
      throw new we(4, t, b);
    return {
      red: parseInt("" + y[1], 10),
      green: parseInt("" + y[2], 10),
      blue: parseInt("" + y[3], 10),
      alpha: parseFloat("" + p[4]) > 1 ? parseFloat("" + p[4]) / 100 : parseFloat("" + p[4])
    };
  }
  throw new we(5);
}
a(jt, "parseToRgb");
function kf(e) {
  var t = e.red / 255, r = e.green / 255, o = e.blue / 255, n = Math.max(t, r, o), i = Math.min(t, r, o), s = (n + i) / 2;
  if (n === i)
    return e.alpha !== void 0 ? {
      hue: 0,
      saturation: 0,
      lightness: s,
      alpha: e.alpha
    } : {
      hue: 0,
      saturation: 0,
      lightness: s
    };
  var l, c = n - i, u = s > 0.5 ? c / (2 - n - i) : c / (n + i);
  switch (n) {
    case t:
      l = (r - o) / c + (r < o ? 6 : 0);
      break;
    case r:
      l = (o - t) / c + 2;
      break;
    default:
      l = (t - r) / c + 4;
      break;
  }
  return l *= 60, e.alpha !== void 0 ? {
    hue: l,
    saturation: u,
    lightness: s,
    alpha: e.alpha
  } : {
    hue: l,
    saturation: u,
    lightness: s
  };
}
a(kf, "rgbToHsl");
function nt(e) {
  return kf(jt(e));
}
a(nt, "parseToHsl");
var Of = /* @__PURE__ */ a(function(t) {
  return t.length === 7 && t[1] === t[2] && t[3] === t[4] && t[5] === t[6] ? "#" + t[1] + t[3] + t[5] : t;
}, "reduceHexValue"), Cn = Of;
function Ct(e) {
  var t = e.toString(16);
  return t.length === 1 ? "0" + t : t;
}
a(Ct, "numberToHex");
function Sn(e) {
  return Ct(Math.round(e * 255));
}
a(Sn, "colorToHex");
function If(e, t, r) {
  return Cn("#" + Sn(e) + Sn(t) + Sn(r));
}
a(If, "convertToHex");
function Jr(e, t, r) {
  return nr(e, t, r, If);
}
a(Jr, "hslToHex");
function Pf(e, t, r) {
  if (typeof e == "number" && typeof t == "number" && typeof r == "number")
    return Jr(e, t, r);
  if (typeof e == "object" && t === void 0 && r === void 0)
    return Jr(e.hue, e.saturation, e.lightness);
  throw new we(1);
}
a(Pf, "hsl");
function Lf(e, t, r, o) {
  if (typeof e == "number" && typeof t == "number" && typeof r == "number" && typeof o == "number")
    return o >= 1 ? Jr(e, t, r) : "rgba(" + nr(e, t, r) + "," + o + ")";
  if (typeof e == "object" && t === void 0 && r === void 0 && o === void 0)
    return e.alpha >= 1 ? Jr(e.hue, e.saturation, e.lightness) : "rgba(" + nr(e.hue, e.saturation, e.lightness) + "," + e.alpha + ")";
  throw new we(2);
}
a(Lf, "hsla");
function wn(e, t, r) {
  if (typeof e == "number" && typeof t == "number" && typeof r == "number")
    return Cn("#" + Ct(e) + Ct(t) + Ct(r));
  if (typeof e == "object" && t === void 0 && r === void 0)
    return Cn("#" + Ct(e.red) + Ct(e.green) + Ct(e.blue));
  throw new we(6);
}
a(wn, "rgb");
function Me(e, t, r, o) {
  if (typeof e == "string" && typeof t == "number") {
    var n = jt(e);
    return "rgba(" + n.red + "," + n.green + "," + n.blue + "," + t + ")";
  } else {
    if (typeof e == "number" && typeof t == "number" && typeof r == "number" && typeof o == "number")
      return o >= 1 ? wn(e, t, r) : "rgba(" + e + "," + t + "," + r + "," + o + ")";
    if (typeof e == "object" && t === void 0 && r === void 0 && o === void 0)
      return e.alpha >= 1 ? wn(e.red, e.green, e.blue) : "rgba(" + e.red + "," + e.green + "," + e.blue + "," + e.alpha + ")";
  }
  throw new we(7);
}
a(Me, "rgba");
var Nf = /* @__PURE__ */ a(function(t) {
  return typeof t.red == "number" && typeof t.green == "number" && typeof t.blue == "number" && (typeof t.alpha != "number" || typeof t.alpha >
  "u");
}, "isRgb"), _f = /* @__PURE__ */ a(function(t) {
  return typeof t.red == "number" && typeof t.green == "number" && typeof t.blue == "number" && typeof t.alpha == "number";
}, "isRgba"), Df = /* @__PURE__ */ a(function(t) {
  return typeof t.hue == "number" && typeof t.saturation == "number" && typeof t.lightness == "number" && (typeof t.alpha != "number" || typeof t.
  alpha > "u");
}, "isHsl"), Bf = /* @__PURE__ */ a(function(t) {
  return typeof t.hue == "number" && typeof t.saturation == "number" && typeof t.lightness == "number" && typeof t.alpha == "number";
}, "isHsla");
function at(e) {
  if (typeof e != "object") throw new we(8);
  if (_f(e)) return Me(e);
  if (Nf(e)) return wn(e);
  if (Bf(e)) return Lf(e);
  if (Df(e)) return Pf(e);
  throw new we(8);
}
a(at, "toColorString");
function zs(e, t, r) {
  return /* @__PURE__ */ a(function() {
    var n = r.concat(Array.prototype.slice.call(arguments));
    return n.length >= t ? e.apply(this, n) : zs(e, t, n);
  }, "fn");
}
a(zs, "curried");
function Oe(e) {
  return zs(e, e.length, []);
}
a(Oe, "curry");
function Mf(e, t) {
  if (t === "transparent") return t;
  var r = nt(t);
  return at(he({}, r, {
    hue: r.hue + parseFloat(e)
  }));
}
a(Mf, "adjustHue");
var GT = Oe(Mf);
function Rt(e, t, r) {
  return Math.max(e, Math.min(t, r));
}
a(Rt, "guard");
function Ff(e, t) {
  if (t === "transparent") return t;
  var r = nt(t);
  return at(he({}, r, {
    lightness: Rt(0, 1, r.lightness - parseFloat(e))
  }));
}
a(Ff, "darken");
var jf = Oe(Ff), Le = jf;
function Rf(e, t) {
  if (t === "transparent") return t;
  var r = nt(t);
  return at(he({}, r, {
    saturation: Rt(0, 1, r.saturation - parseFloat(e))
  }));
}
a(Rf, "desaturate");
var JT = Oe(Rf);
function Hf(e, t) {
  if (t === "transparent") return t;
  var r = nt(t);
  return at(he({}, r, {
    lightness: Rt(0, 1, r.lightness + parseFloat(e))
  }));
}
a(Hf, "lighten");
var Vf = Oe(Hf), Ke = Vf;
function zf(e, t, r) {
  if (t === "transparent") return r;
  if (r === "transparent") return t;
  if (e === 0) return r;
  var o = jt(t), n = he({}, o, {
    alpha: typeof o.alpha == "number" ? o.alpha : 1
  }), i = jt(r), s = he({}, i, {
    alpha: typeof i.alpha == "number" ? i.alpha : 1
  }), l = n.alpha - s.alpha, c = parseFloat(e) * 2 - 1, u = c * l === -1 ? c : c + l, d = 1 + c * l, g = (u / d + 1) / 2, p = 1 - g, m = {
    red: Math.floor(n.red * g + s.red * p),
    green: Math.floor(n.green * g + s.green * p),
    blue: Math.floor(n.blue * g + s.blue * p),
    alpha: n.alpha * parseFloat(e) + s.alpha * (1 - parseFloat(e))
  };
  return Me(m);
}
a(zf, "mix");
var $f = Oe(zf), $s = $f;
function Uf(e, t) {
  if (t === "transparent") return t;
  var r = jt(t), o = typeof r.alpha == "number" ? r.alpha : 1, n = he({}, r, {
    alpha: Rt(0, 1, (o * 100 + parseFloat(e) * 100) / 100)
  });
  return Me(n);
}
a(Uf, "opacify");
var qf = Oe(Uf), wt = qf;
function Wf(e, t) {
  if (t === "transparent") return t;
  var r = nt(t);
  return at(he({}, r, {
    saturation: Rt(0, 1, r.saturation + parseFloat(e))
  }));
}
a(Wf, "saturate");
var KT = Oe(Wf);
function Gf(e, t) {
  return t === "transparent" ? t : at(he({}, nt(t), {
    hue: parseFloat(e)
  }));
}
a(Gf, "setHue");
var YT = Oe(Gf);
function Jf(e, t) {
  return t === "transparent" ? t : at(he({}, nt(t), {
    lightness: parseFloat(e)
  }));
}
a(Jf, "setLightness");
var XT = Oe(Jf);
function Kf(e, t) {
  return t === "transparent" ? t : at(he({}, nt(t), {
    saturation: parseFloat(e)
  }));
}
a(Kf, "setSaturation");
var ZT = Oe(Kf);
function Yf(e, t) {
  return t === "transparent" ? t : $s(parseFloat(e), "rgb(0, 0, 0)", t);
}
a(Yf, "shade");
var QT = Oe(Yf);
function Xf(e, t) {
  return t === "transparent" ? t : $s(parseFloat(e), "rgb(255, 255, 255)", t);
}
a(Xf, "tint");
var eA = Oe(Xf);
function Zf(e, t) {
  if (t === "transparent") return t;
  var r = jt(t), o = typeof r.alpha == "number" ? r.alpha : 1, n = he({}, r, {
    alpha: Rt(0, 1, +(o * 100 - parseFloat(e) * 100).toFixed(2) / 100)
  });
  return Me(n);
}
a(Zf, "transparentize");
var Qf = Oe(Zf), F = Qf;

// ../addons/docs/src/blocks/components/ArgsTable/ArgsTable.tsx
import { styled as va } from "storybook/theming";

// ../addons/docs/src/blocks/components/Source.tsx
import Ye from "react";
import { SyntaxHighlighter as nm } from "storybook/internal/components";
import {
  ThemeProvider as am,
  convert as im,
  ignoreSsrWarning as sm,
  styled as Tn,
  themes as Us,
  useTheme as lm
} from "storybook/theming";

// ../addons/docs/src/blocks/components/EmptyBlock.tsx
import em from "react";
import { withReset as tm } from "storybook/internal/components";
import { styled as rm } from "storybook/theming";
var om = rm.div(tm, ({ theme: e }) => ({
  backgroundColor: e.base === "light" ? "rgba(0,0,0,.01)" : "rgba(255,255,255,.01)",
  borderRadius: e.appBorderRadius,
  border: `1px dashed ${e.appBorderColor}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  margin: "25px 0 40px",
  color: F(0.3, e.color.defaultText),
  fontSize: e.typography.size.s2
})), Kr = /* @__PURE__ */ a((e) => /* @__PURE__ */ em.createElement(om, { ...e, className: "docblock-emptyblock sb-unstyled" }), "EmptyBlock");

// ../addons/docs/src/blocks/components/Source.tsx
var cm = Tn(
  nm
)(({ theme: e }) => ({
  // DocBlocks-specific styling and overrides
  fontSize: `${e.typography.size.s2 - 1}px`,
  lineHeight: "19px",
  margin: "25px 0 40px",
  borderRadius: e.appBorderRadius,
  boxShadow: e.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
  "pre.prismjs": {
    padding: 20,
    background: "inherit"
  }
}));
var pm = Tn.div(({ theme: e }) => ({
  background: e.background.content,
  borderRadius: e.appBorderRadius,
  border: `1px solid ${e.appBorderColor}`,
  boxShadow: e.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
  margin: "25px 0 40px",
  padding: "20px 20px 20px 22px"
})), Yr = Tn.div(({ theme: e }) => ({
  animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
  background: e.appBorderColor,
  height: 17,
  marginTop: 1,
  width: "60%",
  [`&:first-child${sm}`]: {
    margin: 0
  }
})), um = /* @__PURE__ */ a(() => /* @__PURE__ */ Ye.createElement(pm, null, /* @__PURE__ */ Ye.createElement(Yr, null), /* @__PURE__ */ Ye.
createElement(Yr, { style: { width: "80%" } }), /* @__PURE__ */ Ye.createElement(Yr, { style: { width: "30%" } }), /* @__PURE__ */ Ye.createElement(
Yr, { style: { width: "80%" } })), "SourceSkeleton"), qs = /* @__PURE__ */ a(({
  isLoading: e,
  error: t,
  language: r,
  code: o,
  dark: n,
  format: i = !0,
  ...s
}) => {
  let { typography: l } = lm();
  if (e)
    return /* @__PURE__ */ Ye.createElement(um, null);
  if (t)
    return /* @__PURE__ */ Ye.createElement(Kr, null, t);
  let c = /* @__PURE__ */ Ye.createElement(
    cm,
    {
      bordered: !0,
      copyable: !0,
      format: i,
      language: r ?? "jsx",
      className: "docblock-source sb-unstyled",
      ...s
    },
    o
  );
  if (typeof n > "u")
    return c;
  let u = n ? Us.dark : Us.light;
  return /* @__PURE__ */ Ye.createElement(
    am,
    {
      theme: im({
        ...u,
        fontCode: l.fonts.mono,
        fontBase: l.fonts.base
      })
    },
    c
  );
}, "Source");

// ../addons/docs/src/blocks/components/DocsPage.tsx
import hA from "react";
import { withReset as Ws } from "storybook/internal/components";
import { styled as Xr } from "storybook/theming";
var te = /* @__PURE__ */ a((e) => `& :where(${e}:not(.sb-anchor, .sb-unstyled, .sb-unstyled ${e}))`, "toGlobalSelector"), An = 600, vA = Xr.
h1(Ws, ({ theme: e }) => ({
  color: e.color.defaultText,
  fontSize: e.typography.size.m3,
  fontWeight: e.typography.weight.bold,
  lineHeight: "32px",
  [`@media (min-width: ${An}px)`]: {
    fontSize: e.typography.size.l1,
    lineHeight: "36px",
    marginBottom: "16px"
  }
})), EA = Xr.h2(Ws, ({ theme: e }) => ({
  fontWeight: e.typography.weight.regular,
  fontSize: e.typography.size.s3,
  lineHeight: "20px",
  borderBottom: "none",
  marginBottom: 15,
  [`@media (min-width: ${An}px)`]: {
    fontSize: e.typography.size.m1,
    lineHeight: "28px",
    marginBottom: 24
  },
  color: F(0.25, e.color.defaultText)
})), SA = Xr.div(({ theme: e }) => {
  let t = {
    fontFamily: e.typography.fonts.base,
    fontSize: e.typography.size.s3,
    margin: 0,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    WebkitOverflowScrolling: "touch"
  }, r = {
    margin: "20px 0 8px",
    padding: 0,
    cursor: "text",
    position: "relative",
    color: e.color.defaultText,
    "&:first-of-type": {
      marginTop: 0,
      paddingTop: 0
    },
    "&:hover a.anchor": {
      textDecoration: "none"
    },
    "& code": {
      fontSize: "inherit"
    }
  }, o = {
    lineHeight: 1,
    margin: "0 2px",
    padding: "3px 5px",
    whiteSpace: "nowrap",
    borderRadius: 3,
    fontSize: e.typography.size.s2 - 1,
    border: e.base === "light" ? `1px solid ${e.color.mediumlight}` : `1px solid ${e.color.darker}`,
    color: e.base === "light" ? F(0.1, e.color.defaultText) : F(0.3, e.color.defaultText),
    backgroundColor: e.base === "light" ? e.color.lighter : e.color.border
  };
  return {
    maxWidth: 1e3,
    width: "100%",
    minWidth: 0,
    [te("a")]: {
      ...t,
      fontSize: "inherit",
      lineHeight: "24px",
      color: e.color.secondary,
      textDecoration: "none",
      "&.absent": {
        color: "#cc0000"
      },
      "&.anchor": {
        display: "block",
        paddingLeft: 30,
        marginLeft: -30,
        cursor: "pointer",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0
      }
    },
    [te("blockquote")]: {
      ...t,
      margin: "16px 0",
      borderLeft: `4px solid ${e.color.medium}`,
      padding: "0 15px",
      color: e.color.dark,
      "& > :first-of-type": {
        marginTop: 0
      },
      "& > :last-child": {
        marginBottom: 0
      }
    },
    [te("div")]: t,
    [te("dl")]: {
      ...t,
      margin: "16px 0",
      padding: 0,
      "& dt": {
        fontSize: "14px",
        fontWeight: "bold",
        fontStyle: "italic",
        padding: 0,
        margin: "16px 0 4px"
      },
      "& dt:first-of-type": {
        padding: 0
      },
      "& dt > :first-of-type": {
        marginTop: 0
      },
      "& dt > :last-child": {
        marginBottom: 0
      },
      "& dd": {
        margin: "0 0 16px",
        padding: "0 15px"
      },
      "& dd > :first-of-type": {
        marginTop: 0
      },
      "& dd > :last-child": {
        marginBottom: 0
      }
    },
    [te("h1")]: {
      ...t,
      ...r,
      fontSize: `${e.typography.size.l1}px`,
      fontWeight: e.typography.weight.bold
    },
    [te("h2")]: {
      ...t,
      ...r,
      fontSize: `${e.typography.size.m2}px`,
      paddingBottom: 4,
      borderBottom: `1px solid ${e.appBorderColor}`
    },
    [te("h3")]: {
      ...t,
      ...r,
      fontSize: `${e.typography.size.m1}px`,
      fontWeight: e.typography.weight.bold
    },
    [te("h4")]: {
      ...t,
      ...r,
      fontSize: `${e.typography.size.s3}px`
    },
    [te("h5")]: {
      ...t,
      ...r,
      fontSize: `${e.typography.size.s2}px`
    },
    [te("h6")]: {
      ...t,
      ...r,
      fontSize: `${e.typography.size.s2}px`,
      color: e.color.dark
    },
    [te("hr")]: {
      border: "0 none",
      borderTop: `1px solid ${e.appBorderColor}`,
      height: 4,
      padding: 0
    },
    [te("img")]: {
      maxWidth: "100%"
    },
    [te("li")]: {
      ...t,
      fontSize: e.typography.size.s2,
      color: e.color.defaultText,
      lineHeight: "24px",
      "& + li": {
        marginTop: ".25em"
      },
      "& ul, & ol": {
        marginTop: ".25em",
        marginBottom: 0
      },
      "& code": o
    },
    [te("ol")]: {
      ...t,
      margin: "16px 0",
      paddingLeft: 30,
      "& :first-of-type": {
        marginTop: 0
      },
      "& :last-child": {
        marginBottom: 0
      }
    },
    [te("p")]: {
      ...t,
      margin: "16px 0",
      fontSize: e.typography.size.s2,
      lineHeight: "24px",
      color: e.color.defaultText,
      "& code": o
    },
    [te("pre")]: {
      ...t,
      // reset
      fontFamily: e.typography.fonts.mono,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      lineHeight: "18px",
      padding: "11px 1rem",
      whiteSpace: "pre-wrap",
      color: "inherit",
      borderRadius: 3,
      margin: "1rem 0",
      "&:not(.prismjs)": {
        background: "transparent",
        border: "none",
        borderRadius: 0,
        padding: 0,
        margin: 0
      },
      "& pre, &.prismjs": {
        padding: 15,
        margin: 0,
        whiteSpace: "pre-wrap",
        color: "inherit",
        fontSize: "13px",
        lineHeight: "19px",
        code: {
          color: "inherit",
          fontSize: "inherit"
        }
      },
      "& code": {
        whiteSpace: "pre"
      },
      "& code, & tt": {
        border: "none"
      }
    },
    [te("span")]: {
      ...t,
      "&.frame": {
        display: "block",
        overflow: "hidden",
        "& > span": {
          border: `1px solid ${e.color.medium}`,
          display: "block",
          float: "left",
          overflow: "hidden",
          margin: "13px 0 0",
          padding: 7,
          width: "auto"
        },
        "& span img": {
          display: "block",
          float: "left"
        },
        "& span span": {
          clear: "both",
          color: e.color.darkest,
          display: "block",
          padding: "5px 0 0"
        }
      },
      "&.align-center": {
        display: "block",
        overflow: "hidden",
        clear: "both",
        "& > span": {
          display: "block",
          overflow: "hidden",
          margin: "13px auto 0",
          textAlign: "center"
        },
        "& span img": {
          margin: "0 auto",
          textAlign: "center"
        }
      },
      "&.align-right": {
        display: "block",
        overflow: "hidden",
        clear: "both",
        "& > span": {
          display: "block",
          overflow: "hidden",
          margin: "13px 0 0",
          textAlign: "right"
        },
        "& span img": {
          margin: 0,
          textAlign: "right"
        }
      },
      "&.float-left": {
        display: "block",
        marginRight: 13,
        overflow: "hidden",
        float: "left",
        "& span": {
          margin: "13px 0 0"
        }
      },
      "&.float-right": {
        display: "block",
        marginLeft: 13,
        overflow: "hidden",
        float: "right",
        "& > span": {
          display: "block",
          overflow: "hidden",
          margin: "13px auto 0",
          textAlign: "right"
        }
      }
    },
    [te("table")]: {
      ...t,
      margin: "16px 0",
      fontSize: e.typography.size.s2,
      lineHeight: "24px",
      padding: 0,
      borderCollapse: "collapse",
      "& tr": {
        borderTop: `1px solid ${e.appBorderColor}`,
        backgroundColor: e.appContentBg,
        margin: 0,
        padding: 0
      },
      "& tr:nth-of-type(2n)": {
        backgroundColor: e.base === "dark" ? e.color.darker : e.color.lighter
      },
      "& tr th": {
        fontWeight: "bold",
        color: e.color.defaultText,
        border: `1px solid ${e.appBorderColor}`,
        margin: 0,
        padding: "6px 13px"
      },
      "& tr td": {
        border: `1px solid ${e.appBorderColor}`,
        color: e.color.defaultText,
        margin: 0,
        padding: "6px 13px"
      },
      "& tr th :first-of-type, & tr td :first-of-type": {
        marginTop: 0
      },
      "& tr th :last-child, & tr td :last-child": {
        marginBottom: 0
      }
    },
    [te("ul")]: {
      ...t,
      margin: "16px 0",
      paddingLeft: 30,
      "& :first-of-type": {
        marginTop: 0
      },
      "& :last-child": {
        marginBottom: 0
      },
      listStyle: "disc"
    }
  };
}), CA = Xr.div(({ theme: e }) => ({
  background: e.background.content,
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "center",
  padding: "4rem 20px",
  minHeight: "100vh",
  boxSizing: "border-box",
  gap: "3rem",
  [`@media (min-width: ${An}px)`]: {}
}));

// ../addons/docs/src/blocks/components/Preview.tsx
import je, { Children as Em, useCallback as Sm, useState as Pn } from "react";
import { ActionBar as Cm, Zoom as wm } from "storybook/internal/components";
import { styled as Ht } from "storybook/theming";

// ../addons/docs/src/blocks/components/BlockBackgroundStyles.tsx
var it = /* @__PURE__ */ a((e) => ({
  borderRadius: e.appBorderRadius,
  background: e.background.content,
  boxShadow: e.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
  border: `1px solid ${e.appBorderColor}`
}), "getBlockBackgroundStyle");

// ../addons/docs/src/blocks/components/Story.tsx
import jA, { useEffect as RA, useRef as HA, useState as VA } from "react";
import { ErrorFormatter as $A, Loader as UA, getStoryHref as qA } from "storybook/internal/components";
import { styled as fm } from "storybook/theming";

// ../addons/docs/src/blocks/components/IFrame.tsx
import IA, { Component as PA } from "react";
var { window: LA } = globalThis;

// ../addons/docs/src/blocks/components/ZoomContext.tsx
import { createContext as dm } from "react";
var kn = dm({
  scale: 1
});

// ../addons/docs/src/blocks/components/Story.tsx
var { PREVIEW_URL: KA } = globalThis;
var YA = fm.strong(({ theme: e }) => ({
  color: e.color.orange
}));

// ../addons/docs/src/blocks/components/Toolbar.tsx
import Fe from "react";
import { FlexBar as mm, IconButton as On } from "storybook/internal/components";
import { ZoomIcon as gm, ZoomOutIcon as hm, ZoomResetIcon as bm } from "@storybook/icons";
import { styled as In } from "storybook/theming";
var ym = In(mm)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  transition: "transform .2s linear"
}), xm = In.div({
  display: "flex",
  alignItems: "center",
  gap: 4
}), vm = In.div(({ theme: e }) => ({
  width: 14,
  height: 14,
  borderRadius: 2,
  margin: "0 7px",
  backgroundColor: e.appBorderColor,
  animation: `${e.animation.glow} 1.5s ease-in-out infinite`
})), Gs = /* @__PURE__ */ a(({
  isLoading: e,
  storyId: t,
  baseUrl: r,
  zoom: o,
  resetZoom: n,
  ...i
}) => /* @__PURE__ */ Fe.createElement(ym, { ...i }, /* @__PURE__ */ Fe.createElement(xm, { key: "left" }, e ? [1, 2, 3].map((s) => /* @__PURE__ */ Fe.
createElement(vm, { key: s })) : /* @__PURE__ */ Fe.createElement(Fe.Fragment, null, /* @__PURE__ */ Fe.createElement(
  On,
  {
    key: "zoomin",
    onClick: (s) => {
      s.preventDefault(), o(0.8);
    },
    title: "Zoom in"
  },
  /* @__PURE__ */ Fe.createElement(gm, null)
), /* @__PURE__ */ Fe.createElement(
  On,
  {
    key: "zoomout",
    onClick: (s) => {
      s.preventDefault(), o(1.25);
    },
    title: "Zoom out"
  },
  /* @__PURE__ */ Fe.createElement(hm, null)
), /* @__PURE__ */ Fe.createElement(
  On,
  {
    key: "zoomreset",
    onClick: (s) => {
      s.preventDefault(), n();
    },
    title: "Reset zoom"
  },
  /* @__PURE__ */ Fe.createElement(bm, null)
)))), "Toolbar");

// ../addons/docs/src/blocks/components/Preview.tsx
var Tm = Ht.div(
  ({ isColumn: e, columns: t, layout: r }) => ({
    display: e || !t ? "block" : "flex",
    position: "relative",
    flexWrap: "wrap",
    overflow: "auto",
    flexDirection: e ? "column" : "row",
    "& .innerZoomElementWrapper > *": e ? {
      width: r !== "fullscreen" ? "calc(100% - 20px)" : "100%",
      display: "block"
    } : {
      maxWidth: r !== "fullscreen" ? "calc(100% - 20px)" : "100%",
      display: "inline-block"
    }
  }),
  ({ layout: e = "padded", inline: t }) => e === "centered" || e === "padded" ? {
    padding: t ? "32px 22px" : "0px",
    "& .innerZoomElementWrapper > *": {
      width: "auto",
      border: "8px solid transparent!important"
    }
  } : {},
  ({ layout: e = "padded", inline: t }) => e === "centered" && t ? {
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center"
  } : {},
  ({ columns: e }) => e && e > 1 ? { ".innerZoomElementWrapper > *": { minWidth: `calc(100% / ${e} - 20px)` } } : {}
), Js = Ht(qs)(({ theme: e }) => ({
  margin: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: e.appBorderRadius,
  borderBottomRightRadius: e.appBorderRadius,
  border: "none",
  background: e.base === "light" ? "rgba(0, 0, 0, 0.85)" : Le(0.05, e.background.content),
  color: e.color.lightest,
  button: {
    background: e.base === "light" ? "rgba(0, 0, 0, 0.85)" : Le(0.05, e.background.content)
  }
})), Am = Ht.div(
  ({ theme: e, withSource: t, isExpanded: r }) => ({
    position: "relative",
    overflow: "hidden",
    margin: "25px 0 40px",
    ...it(e),
    borderBottomLeftRadius: t && r && 0,
    borderBottomRightRadius: t && r && 0,
    borderBottomWidth: r && 0,
    "h3 + &": {
      marginTop: "16px"
    }
  }),
  ({ withToolbar: e }) => e && { paddingTop: 40 }
), km = /* @__PURE__ */ a((e, t, r) => {
  switch (!0) {
    case !!(e && e.error):
      return {
        source: null,
        actionItem: {
          title: "No code available",
          className: "docblock-code-toggle docblock-code-toggle--disabled",
          disabled: !0,
          onClick: /* @__PURE__ */ a(() => r(!1), "onClick")
        }
      };
    case t:
      return {
        source: /* @__PURE__ */ je.createElement(Js, { ...e, dark: !0 }),
        actionItem: {
          title: "Hide code",
          className: "docblock-code-toggle docblock-code-toggle--expanded",
          onClick: /* @__PURE__ */ a(() => r(!1), "onClick")
        }
      };
    default:
      return {
        source: /* @__PURE__ */ je.createElement(Js, { ...e, dark: !0 }),
        actionItem: {
          title: "Show code",
          className: "docblock-code-toggle",
          onClick: /* @__PURE__ */ a(() => r(!0), "onClick")
        }
      };
  }
}, "getSource");
function Om(e) {
  if (Em.count(e) === 1) {
    let t = e;
    if (t.props)
      return t.props.id;
  }
  return null;
}
a(Om, "getStoryId");
var Im = Ht(Gs)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 40
}), Pm = Ht.div({
  overflow: "hidden",
  position: "relative"
}), Lm = /* @__PURE__ */ a(({
  isLoading: e,
  isColumn: t,
  columns: r,
  children: o,
  withSource: n,
  withToolbar: i = !1,
  isExpanded: s = !1,
  additionalActions: l,
  className: c,
  layout: u = "padded",
  inline: d = !1,
  ...g
}) => {
  let [p, m] = Pn(s), { source: f, actionItem: h } = km(n, p, m), [b, y] = Pn(1), x = [c].concat(["sbdocs", "sbdocs-preview", "sb-unstyled"]),
  v = n ? [h] : [], [S, w] = Pn(
    l ? [...l] : []
  ), E = [...v, ...S], { window: I } = globalThis, D = Sm(async (z) => {
    let { createCopyToClipboardFunction: W } = await import("storybook/internal/components");
    W();
  }, []), _ = /* @__PURE__ */ a((z) => {
    let W = I.getSelection();
    W && W.type === "Range" || (z.preventDefault(), S.filter((ee) => ee.title === "Copied").length === 0 && D(f?.props.code ?? "").then(() => {
      w([
        ...S,
        {
          title: "Copied",
          onClick: /* @__PURE__ */ a(() => {
          }, "onClick")
        }
      ]), I.setTimeout(
        () => w(
          S.filter((ee) => ee.title !== "Copied")
        ),
        1500
      );
    }));
  }, "onCopyCapture");
  return /* @__PURE__ */ je.createElement(
    Am,
    {
      withSource: n,
      withToolbar: i,
      ...g,
      className: x.join(" ")
    },
    i && /* @__PURE__ */ je.createElement(
      Im,
      {
        isLoading: e,
        border: !0,
        zoom: (z) => y(b * z),
        resetZoom: () => y(1),
        storyId: Om(o),
        baseUrl: "./iframe.html"
      }
    ),
    /* @__PURE__ */ je.createElement(kn.Provider, { value: { scale: b } }, /* @__PURE__ */ je.createElement(Pm, { className: "docs-story", onCopyCapture: n &&
    _ }, /* @__PURE__ */ je.createElement(
      Tm,
      {
        isColumn: t || !Array.isArray(o),
        columns: r,
        layout: u,
        inline: d
      },
      /* @__PURE__ */ je.createElement(wm.Element, { centered: u === "centered", scale: d ? b : 1 }, Array.isArray(o) ? o.map((z, W) => /* @__PURE__ */ je.
      createElement("div", { key: W }, z)) : /* @__PURE__ */ je.createElement("div", null, o))
    ), /* @__PURE__ */ je.createElement(Cm, { actionItems: E }))),
    n && p && f
  );
}, "Preview"), gk = Ht(Lm)(() => ({
  ".docs-story": {
    paddingTop: 32,
    paddingBottom: 40
  }
}));

// ../addons/docs/src/blocks/components/ArgsTable/TabbedArgsTable.tsx
import xk from "react";
import { TabsState as Ek } from "storybook/internal/components";

// ../addons/docs/src/blocks/components/Typeset.tsx
import Pk from "react";
import { withReset as Nm } from "storybook/internal/components";
import { styled as Zr } from "storybook/theming";
var Bk = Zr.div(({ theme: e }) => ({
  marginRight: 30,
  fontSize: `${e.typography.size.s1}px`,
  color: e.base === "light" ? F(0.4, e.color.defaultText) : F(0.6, e.color.defaultText)
})), Mk = Zr.div({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
}), Fk = Zr.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "baseline",
  "&:not(:last-child)": { marginBottom: "1rem" }
}), jk = Zr.div(Nm, ({ theme: e }) => ({
  ...it(e),
  margin: "25px 0 40px",
  padding: "30px 20px"
}));

// ../addons/docs/src/blocks/components/ColorPalette.tsx
import zk from "react";
import { ResetWrapper as Uk } from "storybook/internal/components";
import { styled as Te } from "storybook/theming";
var Jk = Te.div(({ theme: e }) => ({
  fontWeight: e.typography.weight.bold,
  color: e.color.defaultText
})), Kk = Te.div(({ theme: e }) => ({
  color: e.base === "light" ? F(0.2, e.color.defaultText) : F(0.6, e.color.defaultText)
})), Yk = Te.div({
  flex: "0 0 30%",
  lineHeight: "20px",
  marginTop: 5
}), Xk = Te.div(({ theme: e }) => ({
  flex: 1,
  textAlign: "center",
  fontFamily: e.typography.fonts.mono,
  fontSize: e.typography.size.s1,
  lineHeight: 1,
  overflow: "hidden",
  color: e.base === "light" ? F(0.4, e.color.defaultText) : F(0.6, e.color.defaultText),
  "> div": {
    display: "inline-block",
    overflow: "hidden",
    maxWidth: "100%",
    textOverflow: "ellipsis"
  },
  span: {
    display: "block",
    marginTop: 2
  }
})), Zk = Te.div({
  display: "flex",
  flexDirection: "row"
}), Qk = Te.div(({ background: e }) => ({
  position: "relative",
  flex: 1,
  "&::before": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: e,
    content: '""'
  }
})), e2 = Te.div(({ theme: e }) => ({
  ...it(e),
  display: "flex",
  flexDirection: "row",
  height: 50,
  marginBottom: 5,
  overflow: "hidden",
  backgroundColor: "white",
  backgroundImage: "repeating-linear-gradient(-45deg, #ccc, #ccc 1px, #fff 1px, #fff 16px)",
  backgroundClip: "padding-box"
})), t2 = Te.div({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  position: "relative",
  marginBottom: 30
}), r2 = Te.div({
  flex: 1,
  display: "flex",
  flexDirection: "row"
}), o2 = Te.div({
  display: "flex",
  alignItems: "flex-start"
}), n2 = Te.div({
  flex: "0 0 30%"
}), a2 = Te.div({
  flex: 1
}), i2 = Te.div(({ theme: e }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingBottom: 20,
  fontWeight: e.typography.weight.bold,
  color: e.base === "light" ? F(0.4, e.color.defaultText) : F(0.6, e.color.defaultText)
})), s2 = Te.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  lineHeight: "20px",
  display: "flex",
  flexDirection: "column"
}));

// ../addons/docs/src/blocks/components/IconGallery.tsx
import u2 from "react";
import { ResetWrapper as f2 } from "storybook/internal/components";
import { styled as Qr } from "storybook/theming";
var h2 = Qr.div(({ theme: e }) => ({
  fontFamily: e.typography.fonts.base,
  fontSize: e.typography.size.s1,
  color: e.color.defaultText,
  marginLeft: 10,
  lineHeight: 1.2,
  display: "-webkit-box",
  overflow: "hidden",
  wordBreak: "break-word",
  textOverflow: "ellipsis",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical"
})), b2 = Qr.div(({ theme: e }) => ({
  ...it(e),
  overflow: "hidden",
  height: 40,
  width: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "none",
  "> img, > svg": {
    width: 20,
    height: 20
  }
})), y2 = Qr.div({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%"
}), x2 = Qr.div({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gridGap: "8px 16px",
  gridAutoFlow: "row dense",
  gridAutoRows: 50
});

// ../addons/docs/src/blocks/components/TableOfContents.tsx
import X2, { useEffect as Z2, useId as Q2 } from "react";
import { NAVIGATE_URL as tO } from "storybook/internal/core-events";
import { styled as Nn } from "storybook/theming";
var nO = Nn.aside(() => ({
  width: "10rem",
  "@media (max-width: 768px)": {
    display: "none"
  }
})), aO = Nn.nav(({ theme: e }) => ({
  position: "fixed",
  bottom: 0,
  top: 0,
  width: "10rem",
  paddingTop: "4rem",
  paddingBottom: "2rem",
  overflowY: "auto",
  fontFamily: e.typography.fonts.base,
  fontSize: e.typography.size.s2,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  WebkitOverflowScrolling: "touch",
  "& *": {
    boxSizing: "border-box"
  },
  "& > .toc-wrapper > .toc-list": {
    paddingLeft: 0,
    borderLeft: `solid 2px ${e.color.mediumlight}`,
    ".toc-list": {
      paddingLeft: 0,
      borderLeft: `solid 2px ${e.color.mediumlight}`,
      ".toc-list": {
        paddingLeft: 0,
        borderLeft: `solid 2px ${e.color.mediumlight}`
      }
    }
  },
  "& .toc-list-item": {
    position: "relative",
    listStyleType: "none",
    marginLeft: 20,
    paddingTop: 3,
    paddingBottom: 3
  },
  "& .toc-list-item::before": {
    content: '""',
    position: "absolute",
    height: "100%",
    top: 0,
    left: 0,
    transform: "translateX(calc(-2px - 20px))",
    borderLeft: `solid 2px ${e.color.mediumdark}`,
    opacity: 0,
    transition: "opacity 0.2s"
  },
  "& .toc-list-item.is-active-li::before": {
    opacity: 1
  },
  "& .toc-list-item > a": {
    color: e.color.defaultText,
    textDecoration: "none"
  },
  "& .toc-list-item.is-active-li > a": {
    fontWeight: 600,
    color: e.color.secondary,
    textDecoration: "none"
  }
})), iO = Nn.p(({ theme: e }) => ({
  fontWeight: 600,
  fontSize: "0.875em",
  color: e.textColor,
  textTransform: "uppercase",
  marginBottom: 10
}));

// ../addons/docs/src/blocks/components/ArgsTable/ArgRow.tsx
import le, { useState as Ly } from "react";
import { codeCommon as Ny } from "storybook/internal/components";

// ../node_modules/markdown-to-jsx/dist/index.modern.js
import * as to from "react";
function Tt() {
  return Tt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, Tt.apply(this, arguments);
}
a(Tt, "t");
var _m = ["children", "options"], L = { blockQuote: "0", breakLine: "1", breakThematic: "2", codeBlock: "3", codeFenced: "4", codeInline: "5",
footnote: "6", footnoteReference: "7", gfmTask: "8", heading: "9", headingSetext: "10", htmlBlock: "11", htmlComment: "12", htmlSelfClosing: "\
13", image: "14", link: "15", linkAngleBraceStyleDetector: "16", linkBareUrlDetector: "17", linkMailtoDetector: "18", newlineCoalescer: "19",
orderedList: "20", paragraph: "21", ref: "22", refImage: "23", refLink: "24", table: "25", tableSeparator: "26", text: "27", textBolded: "28",
textEmphasized: "29", textEscaped: "30", textMarked: "31", textStrikethroughed: "32", unorderedList: "33" }, Ks;
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(Ks || (Ks = {}));
var Ys = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "classId",
"colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTar\
get", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength",
"noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.
toLowerCase()] = t, e), { class: "className", for: "htmlFor" }), Xs = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: "\xA0", quot: "\u201C" },
Dm = ["style", "script"], Bm = ["src", "href", "data", "formAction", "srcDoc", "action"], Mm = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,
Fm = /mailto:/i, jm = /\n{2,}$/, ol = /^(\s*>[\s\S]*?)(?=\n\n|$)/, Rm = /^ *> ?/gm, Hm = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/, Vm = /^ {2,}\n/, zm = /^(?:( *[-*_])){3,} *(?:\n *)+\n/,
nl = /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/, al = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, $m = /^(`+)((?:\\`|(?!\1)`|[^`])+)\1/,
Um = /^(?:\n *)*\n/, qm = /\r\n?/g, Wm = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/, Gm = /^\[\^([^\]]+)]/, Jm = /\f/g, Km = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/,
Ym = /^\s*?\[(x|\s)\]/, il = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, sl = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, ll = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,
Fn = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i,
Xm = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, cl = /^<!--[\s\S]*?(?:-->)/, Zm = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, jn = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,
Qm = /^\{.*\}$/, eg = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, tg = /^<([^ >]+@[^ >]+)>/, rg = /^<([^ >]+:\/[^ >]+)>/, og = /-([a-z])?/gi, pl = /^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/,
ng = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, ag = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, ig = /^\[([^\]]*)\] ?\[([^\]]*)\]/, sg = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,
lg = /\t/g, cg = /(^ *\||\| *$)/g, pg = /^ *:-+: *$/, ug = /^ *:-+ *$/, dg = /^ *-+: *$/, ro = "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`\
.*?`|\\\\\\1|[\\s\\S])+?)", fg = new RegExp(`^([*_])\\1${ro}\\1\\1(?!\\1)`), mg = new RegExp(`^([*_])${ro}\\1(?!\\1)`), gg = new RegExp(`^(=\
=)${ro}\\1`), hg = new RegExp(`^(~~)${ro}\\1`), bg = /^\\([^0-9A-Za-z\s])/, Zs = /\\([^0-9A-Za-z\s])/g, yg = /^([\s\S](?:(?!  |[0-9]\.)[^=*_~\-\n<`\\\[!])*)/,
xg = /^\n+/, vg = /^([ \t]*)/, Eg = /\\([^\\])/g, Sg = /(?:^|\n)( *)$/, Rn = "(?:\\d+\\.)", Hn = "(?:[*+-])";
function ul(e) {
  return "( *)(" + (e === 1 ? Rn : Hn) + ") +";
}
a(ul, "de");
var dl = ul(1), fl = ul(2);
function ml(e) {
  return new RegExp("^" + (e === 1 ? dl : fl));
}
a(ml, "fe");
var Cg = ml(1), wg = ml(2);
function gl(e) {
  return new RegExp("^" + (e === 1 ? dl : fl) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? Rn : Hn) + " )[^\\n]*)*(\\n|$)", "gm");
}
a(gl, "ge");
var Tg = gl(1), Ag = gl(2);
function hl(e) {
  let t = e === 1 ? Rn : Hn;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
a(hl, "xe");
var bl = hl(1), yl = hl(2);
function Qs(e, t) {
  let r = t === 1, o = r ? bl : yl, n = r ? Tg : Ag, i = r ? Cg : wg;
  return { match: Vt(function(s, l) {
    let c = Sg.exec(l.prevCapture);
    return c && (l.list || !l.inline && !l.simple) ? o.exec(s = c[1] + s) : null;
  }), order: 1, parse(s, l, c) {
    let u = r ? +s[2] : void 0, d = s[0].replace(jm, `
`).match(n), g = !1;
    return { items: d.map(function(p, m) {
      let f = i.exec(p)[0].length, h = new RegExp("^ {1," + f + "}", "gm"), b = p.replace(h, "").replace(i, ""), y = m === d.length - 1, x = b.
      indexOf(`

`) !== -1 || y && g;
      g = x;
      let v = c.inline, S = c.list, w;
      c.list = !0, x ? (c.inline = !1, w = sr(b) + `

`) : (c.inline = !0, w = sr(b));
      let E = l(w, c);
      return c.inline = v, c.list = S, E;
    }), ordered: r, start: u };
  }, render: /* @__PURE__ */ a((s, l, c) => e(s.ordered ? "ol" : "ul", { key: c.key, start: s.type === L.orderedList ? s.start : void 0 }, s.
  items.map(function(u, d) {
    return e("li", { key: d }, l(u, c));
  })), "render") };
}
a(Qs, "Ce");
var kg = new RegExp(`^\\[((?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`),
Og = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, xl = [ol, nl, al, il, ll, sl, pl, bl, yl], Ig = [...xl, /^[^\n]+(?:  \n|\n{2,})/,
Fn, cl, jn];
function sr(e) {
  let t = e.length;
  for (; t > 0 && e[t - 1] <= " "; ) t--;
  return e.slice(0, t);
}
a(sr, "ze");
function ar(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").
  replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").
  replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
a(ar, "Le");
function Pg(e) {
  return dg.test(e) ? "right" : pg.test(e) ? "center" : ug.test(e) ? "left" : null;
}
a(Pg, "Ae");
function el(e, t, r, o) {
  let n = r.inTable;
  r.inTable = !0;
  let i = [[]], s = "";
  function l() {
    if (!s) return;
    let c = i[i.length - 1];
    c.push.apply(c, t(s, r)), s = "";
  }
  return a(l, "a"), e.trim().split(/(`[^`]*`|\\\||\|)/).filter(Boolean).forEach((c, u, d) => {
    c.trim() === "|" && (l(), o) ? u !== 0 && u !== d.length - 1 && i.push([]) : s += c;
  }), l(), r.inTable = n, i;
}
a(el, "Oe");
function Lg(e, t, r) {
  r.inline = !0;
  let o = e[2] ? e[2].replace(cg, "").split("|").map(Pg) : [], n = e[3] ? function(s, l, c) {
    return s.trim().split(`
`).map(function(u) {
      return el(u, l, c, !0);
    });
  }(e[3], t, r) : [], i = el(e[1], t, r, !!n.length);
  return r.inline = !1, n.length ? { align: o, cells: n, header: i, type: L.table } : { children: i, type: L.paragraph };
}
a(Lg, "Te");
function tl(e, t) {
  return e.align[t] == null ? {} : { textAlign: e.align[t] };
}
a(tl, "Be");
function Vt(e) {
  return e.inline = 1, e;
}
a(Vt, "Me");
function st(e) {
  return Vt(function(t, r) {
    return r.inline ? e.exec(t) : null;
  });
}
a(st, "Re");
function lt(e) {
  return Vt(function(t, r) {
    return r.inline || r.simple ? e.exec(t) : null;
  });
}
a(lt, "Ie");
function Xe(e) {
  return function(t, r) {
    return r.inline || r.simple ? null : e.exec(t);
  };
}
a(Xe, "De");
function ir(e) {
  return Vt(function(t) {
    return e.exec(t);
  });
}
a(ir, "Ue");
function Ng(e, t) {
  if (t.inline || t.simple) return null;
  let r = "";
  e.split(`
`).every((n) => (n += `
`, !xl.some((i) => i.test(n)) && (r += n, !!n.trim())));
  let o = sr(r);
  return o == "" ? null : [r, , o];
}
a(Ng, "Ne");
var _g = /(javascript|vbscript|data(?!:image)):/i;
function Dg(e) {
  try {
    let t = decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "");
    if (_g.test(t)) return null;
  } catch {
    return null;
  }
  return e;
}
a(Dg, "He");
function rl(e) {
  return e.replace(Eg, "$1");
}
a(rl, "Pe");
function eo(e, t, r) {
  let o = r.inline || !1, n = r.simple || !1;
  r.inline = !0, r.simple = !0;
  let i = e(t, r);
  return r.inline = o, r.simple = n, i;
}
a(eo, "_e");
function Bg(e, t, r) {
  let o = r.inline || !1, n = r.simple || !1;
  r.inline = !1, r.simple = !0;
  let i = e(t, r);
  return r.inline = o, r.simple = n, i;
}
a(Bg, "Fe");
function Mg(e, t, r) {
  let o = r.inline || !1;
  r.inline = !1;
  let n = e(t, r);
  return r.inline = o, n;
}
a(Mg, "We");
var _n = /* @__PURE__ */ a((e, t, r) => ({ children: eo(t, e[2], r) }), "Ge");
function Dn() {
  return {};
}
a(Dn, "Ze");
function Bn() {
  return null;
}
a(Bn, "qe");
function Fg(...e) {
  return e.filter(Boolean).join(" ");
}
a(Fg, "Qe");
function Mn(e, t, r) {
  let o = e, n = t.split(".");
  for (; n.length && (o = o[n[0]], o !== void 0); ) n.shift();
  return o || r;
}
a(Mn, "Ve");
function jg(e = "", t = {}) {
  function r(p, m, ...f) {
    let h = Mn(t.overrides, `${p}.props`, {});
    return t.createElement(function(b, y) {
      let x = Mn(y, b);
      return x ? typeof x == "function" || typeof x == "object" && "render" in x ? x : Mn(y, `${b}.component`, b) : b;
    }(p, t.overrides), Tt({}, m, h, { className: Fg(m?.className, h.className) || void 0 }), ...f);
  }
  a(r, "u");
  function o(p) {
    p = p.replace(Km, "");
    let m = !1;
    t.forceInline ? m = !0 : t.forceBlock || (m = sg.test(p) === !1);
    let f = u(c(m ? p : `${sr(p).replace(xg, "")}

`, { inline: m }));
    for (; typeof f[f.length - 1] == "string" && !f[f.length - 1].trim(); ) f.pop();
    if (t.wrapper === null) return f;
    let h = t.wrapper || (m ? "span" : "div"), b;
    if (f.length > 1 || t.forceWrapper) b = f;
    else {
      if (f.length === 1) return b = f[0], typeof b == "string" ? r("span", { key: "outer" }, b) : b;
      b = null;
    }
    return t.createElement(h, { key: "outer" }, b);
  }
  a(o, "Z");
  function n(p, m) {
    let f = m.match(Mm);
    return f ? f.reduce(function(h, b) {
      let y = b.indexOf("=");
      if (y !== -1) {
        let x = function(E) {
          return E.indexOf("-") !== -1 && E.match(Zm) === null && (E = E.replace(og, function(I, D) {
            return D.toUpperCase();
          })), E;
        }(b.slice(0, y)).trim(), v = function(E) {
          let I = E[0];
          return (I === '"' || I === "'") && E.length >= 2 && E[E.length - 1] === I ? E.slice(1, -1) : E;
        }(b.slice(y + 1).trim()), S = Ys[x] || x;
        if (S === "ref") return h;
        let w = h[S] = function(E, I, D, _) {
          return I === "style" ? function(z) {
            let W = [], ee = "", ce = !1, ne = !1, ae = "";
            if (!z) return W;
            for (let R = 0; R < z.length; R++) {
              let T = z[R];
              if (T !== '"' && T !== "'" || ce || (ne ? T === ae && (ne = !1, ae = "") : (ne = !0, ae = T)), T === "(" && ee.endsWith("url") ?
              ce = !0 : T === ")" && ce && (ce = !1), T !== ";" || ne || ce) ee += T;
              else {
                let P = ee.trim();
                if (P) {
                  let k = P.indexOf(":");
                  if (k > 0) {
                    let $ = P.slice(0, k).trim(), ze = P.slice(k + 1).trim();
                    W.push([$, ze]);
                  }
                }
                ee = "";
              }
            }
            let B = ee.trim();
            if (B) {
              let R = B.indexOf(":");
              if (R > 0) {
                let T = B.slice(0, R).trim(), P = B.slice(R + 1).trim();
                W.push([T, P]);
              }
            }
            return W;
          }(D).reduce(function(z, [W, ee]) {
            return z[W.replace(/(-[a-z])/g, (ce) => ce[1].toUpperCase())] = _(ee, E, W), z;
          }, {}) : Bm.indexOf(I) !== -1 ? _(D, E, I) : (D.match(Qm) && (D = D.slice(1, D.length - 1)), D === "true" || D !== "false" && D);
        }(p, x, v, t.sanitizer);
        typeof w == "string" && (Fn.test(w) || jn.test(w)) && (h[S] = o(w.trim()));
      } else b !== "style" && (h[Ys[b] || b] = !0);
      return h;
    }, {}) : null;
  }
  a(n, "q"), t.overrides = t.overrides || {}, t.sanitizer = t.sanitizer || Dg, t.slugify = t.slugify || ar, t.namedCodesToUnicode = t.namedCodesToUnicode ?
  Tt({}, Xs, t.namedCodesToUnicode) : Xs, t.createElement = t.createElement || to.createElement;
  let i = [], s = {}, l = { [L.blockQuote]: { match: Xe(ol), order: 1, parse(p, m, f) {
    let [, h, b] = p[0].replace(Rm, "").match(Hm);
    return { alert: h, children: m(b, f) };
  }, render(p, m, f) {
    let h = { key: f.key };
    return p.alert && (h.className = "markdown-alert-" + t.slugify(p.alert.toLowerCase(), ar), p.children.unshift({ attrs: {}, children: [{ type: L.
    text, text: p.alert }], noInnerParse: !0, type: L.htmlBlock, tag: "header" })), r("blockquote", h, m(p.children, f));
  } }, [L.breakLine]: { match: ir(Vm), order: 1, parse: Dn, render: /* @__PURE__ */ a((p, m, f) => r("br", { key: f.key }), "render") }, [L.
  breakThematic]: { match: Xe(zm), order: 1, parse: Dn, render: /* @__PURE__ */ a((p, m, f) => r("hr", { key: f.key }), "render") }, [L.codeBlock]: {
  match: Xe(al), order: 0, parse: /* @__PURE__ */ a((p) => ({ lang: void 0, text: sr(p[0].replace(/^ {4}/gm, "")).replace(Zs, "$1") }), "par\
se"), render: /* @__PURE__ */ a((p, m, f) => r("pre", { key: f.key }, r("code", Tt({}, p.attrs, { className: p.lang ? `lang-${p.lang}` : "" }),
  p.text)), "render") }, [L.codeFenced]: { match: Xe(nl), order: 0, parse: /* @__PURE__ */ a((p) => ({ attrs: n("code", p[3] || ""), lang: p[2] ||
  void 0, text: p[4], type: L.codeBlock }), "parse") }, [L.codeInline]: { match: lt($m), order: 3, parse: /* @__PURE__ */ a((p) => ({ text: p[2].
  replace(Zs, "$1") }), "parse"), render: /* @__PURE__ */ a((p, m, f) => r("code", { key: f.key }, p.text), "render") }, [L.footnote]: { match: Xe(
  Wm), order: 0, parse: /* @__PURE__ */ a((p) => (i.push({ footnote: p[2], identifier: p[1] }), {}), "parse"), render: Bn }, [L.footnoteReference]: {
  match: st(Gm), order: 1, parse: /* @__PURE__ */ a((p) => ({ target: `#${t.slugify(p[1], ar)}`, text: p[1] }), "parse"), render: /* @__PURE__ */ a(
  (p, m, f) => r("a", { key: f.key, href: t.sanitizer(p.target, "a", "href") }, r("sup", { key: f.key }, p.text)), "render") }, [L.gfmTask]: {
  match: st(Ym), order: 1, parse: /* @__PURE__ */ a((p) => ({ completed: p[1].toLowerCase() === "x" }), "parse"), render: /* @__PURE__ */ a(
  (p, m, f) => r("input", { checked: p.completed, key: f.key, readOnly: !0, type: "checkbox" }), "render") }, [L.heading]: { match: Xe(t.enforceAtxHeadings ?
  sl : il), order: 1, parse: /* @__PURE__ */ a((p, m, f) => ({ children: eo(m, p[2], f), id: t.slugify(p[2], ar), level: p[1].length }), "pa\
rse"), render: /* @__PURE__ */ a((p, m, f) => r(`h${p.level}`, { id: p.id, key: f.key }, m(p.children, f)), "render") }, [L.headingSetext]: {
  match: Xe(ll), order: 0, parse: /* @__PURE__ */ a((p, m, f) => ({ children: eo(m, p[1], f), level: p[2] === "=" ? 1 : 2, type: L.heading }),
  "parse") }, [L.htmlBlock]: { match: ir(Fn), order: 1, parse(p, m, f) {
    let [, h] = p[3].match(vg), b = new RegExp(`^${h}`, "gm"), y = p[3].replace(b, ""), x = (v = y, Ig.some((D) => D.test(v)) ? Mg : eo);
    var v;
    let S = p[1].toLowerCase(), w = Dm.indexOf(S) !== -1, E = (w ? S : p[1]).trim(), I = { attrs: n(E, p[2]), noInnerParse: w, tag: E };
    return f.inAnchor = f.inAnchor || S === "a", w ? I.text = p[3] : I.children = x(m, y, f), f.inAnchor = !1, I;
  }, render: /* @__PURE__ */ a((p, m, f) => r(p.tag, Tt({ key: f.key }, p.attrs), p.text || (p.children ? m(p.children, f) : "")), "render") },
  [L.htmlSelfClosing]: { match: ir(jn), order: 1, parse(p) {
    let m = p[1].trim();
    return { attrs: n(m, p[2] || ""), tag: m };
  }, render: /* @__PURE__ */ a((p, m, f) => r(p.tag, Tt({}, p.attrs, { key: f.key })), "render") }, [L.htmlComment]: { match: ir(cl), order: 1,
  parse: /* @__PURE__ */ a(() => ({}), "parse"), render: Bn }, [L.image]: { match: lt(Og), order: 1, parse: /* @__PURE__ */ a((p) => ({ alt: p[1],
  target: rl(p[2]), title: p[3] }), "parse"), render: /* @__PURE__ */ a((p, m, f) => r("img", { key: f.key, alt: p.alt || void 0, title: p.title ||
  void 0, src: t.sanitizer(p.target, "img", "src") }), "render") }, [L.link]: { match: st(kg), order: 3, parse: /* @__PURE__ */ a((p, m, f) => ({
  children: Bg(m, p[1], f), target: rl(p[2]), title: p[3] }), "parse"), render: /* @__PURE__ */ a((p, m, f) => r("a", { key: f.key, href: t.
  sanitizer(p.target, "a", "href"), title: p.title }, m(p.children, f)), "render") }, [L.linkAngleBraceStyleDetector]: { match: st(rg), order: 0,
  parse: /* @__PURE__ */ a((p) => ({ children: [{ text: p[1], type: L.text }], target: p[1], type: L.link }), "parse") }, [L.linkBareUrlDetector]: {
  match: Vt((p, m) => m.inAnchor || t.disableAutoLink ? null : st(eg)(p, m)), order: 0, parse: /* @__PURE__ */ a((p) => ({ children: [{ text: p[1],
  type: L.text }], target: p[1], title: void 0, type: L.link }), "parse") }, [L.linkMailtoDetector]: { match: st(tg), order: 0, parse(p) {
    let m = p[1], f = p[1];
    return Fm.test(f) || (f = "mailto:" + f), { children: [{ text: m.replace("mailto:", ""), type: L.text }], target: f, type: L.link };
  } }, [L.orderedList]: Qs(r, 1), [L.unorderedList]: Qs(r, 2), [L.newlineCoalescer]: { match: Xe(Um), order: 3, parse: Dn, render: /* @__PURE__ */ a(
  () => `
`, "render") }, [L.paragraph]: { match: Vt(Ng), order: 3, parse: _n, render: /* @__PURE__ */ a((p, m, f) => r("p", { key: f.key }, m(p.children,
  f)), "render") }, [L.ref]: { match: st(ng), order: 0, parse: /* @__PURE__ */ a((p) => (s[p[1]] = { target: p[2], title: p[4] }, {}), "pars\
e"), render: Bn }, [L.refImage]: { match: lt(ag), order: 0, parse: /* @__PURE__ */ a((p) => ({ alt: p[1] || void 0, ref: p[2] }), "parse"), render: /* @__PURE__ */ a(
  (p, m, f) => s[p.ref] ? r("img", { key: f.key, alt: p.alt, src: t.sanitizer(s[p.ref].target, "img", "src"), title: s[p.ref].title }) : null,
  "render") }, [L.refLink]: { match: st(ig), order: 0, parse: /* @__PURE__ */ a((p, m, f) => ({ children: m(p[1], f), fallbackChildren: p[0],
  ref: p[2] }), "parse"), render: /* @__PURE__ */ a((p, m, f) => s[p.ref] ? r("a", { key: f.key, href: t.sanitizer(s[p.ref].target, "a", "hr\
ef"), title: s[p.ref].title }, m(p.children, f)) : r("span", { key: f.key }, p.fallbackChildren), "render") }, [L.table]: { match: Xe(pl), order: 1,
  parse: Lg, render(p, m, f) {
    let h = p;
    return r("table", { key: f.key }, r("thead", null, r("tr", null, h.header.map(function(b, y) {
      return r("th", { key: y, style: tl(h, y) }, m(b, f));
    }))), r("tbody", null, h.cells.map(function(b, y) {
      return r("tr", { key: y }, b.map(function(x, v) {
        return r("td", { key: v, style: tl(h, v) }, m(x, f));
      }));
    })));
  } }, [L.text]: { match: ir(yg), order: 4, parse: /* @__PURE__ */ a((p) => ({ text: p[0].replace(Xm, (m, f) => t.namedCodesToUnicode[f] ? t.
  namedCodesToUnicode[f] : m) }), "parse"), render: /* @__PURE__ */ a((p) => p.text, "render") }, [L.textBolded]: { match: lt(fg), order: 2,
  parse: /* @__PURE__ */ a((p, m, f) => ({ children: m(p[2], f) }), "parse"), render: /* @__PURE__ */ a((p, m, f) => r("strong", { key: f.key },
  m(p.children, f)), "render") }, [L.textEmphasized]: { match: lt(mg), order: 3, parse: /* @__PURE__ */ a((p, m, f) => ({ children: m(p[2], f) }),
  "parse"), render: /* @__PURE__ */ a((p, m, f) => r("em", { key: f.key }, m(p.children, f)), "render") }, [L.textEscaped]: { match: lt(bg),
  order: 1, parse: /* @__PURE__ */ a((p) => ({ text: p[1], type: L.text }), "parse") }, [L.textMarked]: { match: lt(gg), order: 3, parse: _n,
  render: /* @__PURE__ */ a((p, m, f) => r("mark", { key: f.key }, m(p.children, f)), "render") }, [L.textStrikethroughed]: { match: lt(hg),
  order: 3, parse: _n, render: /* @__PURE__ */ a((p, m, f) => r("del", { key: f.key }, m(p.children, f)), "render") } };
  t.disableParsingRawHTML === !0 && (delete l[L.htmlBlock], delete l[L.htmlSelfClosing]);
  let c = function(p) {
    let m = Object.keys(p);
    function f(h, b) {
      let y, x, v = [], S = "", w = "";
      for (b.prevCapture = b.prevCapture || ""; h; ) {
        let E = 0;
        for (; E < m.length; ) {
          if (S = m[E], y = p[S], b.inline && !y.match.inline) {
            E++;
            continue;
          }
          let I = y.match(h, b);
          if (I) {
            w = I[0], b.prevCapture += w, h = h.substring(w.length), x = y.parse(I, f, b), x.type == null && (x.type = S), v.push(x);
            break;
          }
          E++;
        }
      }
      return b.prevCapture = "", v;
    }
    return a(f, "n"), m.sort(function(h, b) {
      let y = p[h].order, x = p[b].order;
      return y !== x ? y - x : h < b ? -1 : 1;
    }), function(h, b) {
      return f(function(y) {
        return y.replace(qm, `
`).replace(Jm, "").replace(lg, "    ");
      }(h), b);
    };
  }(l), u = (d = /* @__PURE__ */ function(p, m) {
    return function(f, h, b) {
      let y = p[f.type].render;
      return m ? m(() => y(f, h, b), f, h, b) : y(f, h, b);
    };
  }(l, t.renderRule), /* @__PURE__ */ a(function p(m, f = {}) {
    if (Array.isArray(m)) {
      let h = f.key, b = [], y = !1;
      for (let x = 0; x < m.length; x++) {
        f.key = x;
        let v = p(m[x], f), S = typeof v == "string";
        S && y ? b[b.length - 1] += v : v !== null && b.push(v), y = S;
      }
      return f.key = h, b;
    }
    return d(m, p, f);
  }, "e"));
  var d;
  let g = o(e);
  return i.length ? r("div", null, g, r("footer", { key: "footer" }, i.map(function(p) {
    return r("div", { id: t.slugify(p.identifier, ar), key: p.identifier }, p.identifier, u(c(p.footnote, { inline: !0 })));
  }))) : g;
}
a(jg, "Xe");
var vl = /* @__PURE__ */ a((e) => {
  let { children: t = "", options: r } = e, o = function(n, i) {
    if (n == null) return {};
    var s, l, c = {}, u = Object.keys(n);
    for (l = 0; l < u.length; l++) i.indexOf(s = u[l]) >= 0 || (c[s] = n[s]);
    return c;
  }(e, _m);
  return to.cloneElement(jg(t, r), o);
}, "default");

// ../addons/docs/src/blocks/components/ArgsTable/ArgRow.tsx
import { styled as Jt } from "storybook/theming";

// ../addons/docs/src/blocks/components/ArgsTable/ArgControl.tsx
import hr, { useCallback as ba, useEffect as uy, useState as Vc } from "react";
import { Link as dy } from "storybook/internal/components";

// ../addons/docs/src/blocks/controls/index.tsx
import ha, { Suspense as ly, lazy as cy } from "react";

// ../addons/docs/src/blocks/controls/Boolean.tsx
import lr, { useCallback as Rg } from "react";
import { Button as Hg } from "storybook/internal/components";
Ne();
import { styled as Vg } from "storybook/theming";
var zg = Vg.label(({ theme: e }) => ({
  lineHeight: "18px",
  alignItems: "center",
  marginBottom: 8,
  display: "inline-block",
  position: "relative",
  whiteSpace: "nowrap",
  background: e.boolean.background,
  borderRadius: "3em",
  padding: 1,
  '&[aria-disabled="true"]': {
    opacity: 0.5,
    input: {
      cursor: "not-allowed"
    }
  },
  input: {
    appearance: "none",
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    margin: 0,
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    borderRadius: "3em",
    "&:focus": {
      outline: "none",
      boxShadow: `${e.color.secondary} 0 0 0 1px inset !important`
    }
  },
  span: {
    textAlign: "center",
    fontSize: e.typography.size.s1,
    fontWeight: e.typography.weight.bold,
    lineHeight: "1",
    cursor: "pointer",
    display: "inline-block",
    padding: "7px 15px",
    transition: "all 100ms ease-out",
    userSelect: "none",
    borderRadius: "3em",
    color: F(0.5, e.color.defaultText),
    background: "transparent",
    "&:hover": {
      boxShadow: `${wt(0.3, e.appBorderColor)} 0 0 0 1px inset`
    },
    "&:active": {
      boxShadow: `${wt(0.05, e.appBorderColor)} 0 0 0 2px inset`,
      color: wt(1, e.appBorderColor)
    },
    "&:first-of-type": {
      paddingRight: 8
    },
    "&:last-of-type": {
      paddingLeft: 8
    }
  },
  "input:checked ~ span:last-of-type, input:not(:checked) ~ span:first-of-type": {
    background: e.boolean.selectedBackground,
    boxShadow: e.base === "light" ? `${wt(0.1, e.appBorderColor)} 0 0 2px` : `${e.appBorderColor} 0 0 0 1px`,
    color: e.color.defaultText,
    padding: "7px 15px"
  }
})), $g = /* @__PURE__ */ a((e) => e === "true", "parse"), El = /* @__PURE__ */ a(({
  name: e,
  value: t,
  onChange: r,
  onBlur: o,
  onFocus: n,
  argType: i
}) => {
  let s = Rg(() => r(!1), [r]), l = !!i?.table?.readonly;
  if (t === void 0)
    return /* @__PURE__ */ lr.createElement(
      Hg,
      {
        variant: "outline",
        size: "medium",
        id: ct(e),
        onClick: s,
        disabled: l
      },
      "Set boolean"
    );
  let c = Z(e), u = typeof t == "string" ? $g(t) : t;
  return /* @__PURE__ */ lr.createElement(zg, { "aria-disabled": l, htmlFor: c, "aria-label": e }, /* @__PURE__ */ lr.createElement(
    "input",
    {
      id: c,
      type: "checkbox",
      onChange: (d) => r(d.target.checked),
      checked: u,
      role: "switch",
      disabled: l,
      name: e,
      onBlur: o,
      onFocus: n
    }
  ), /* @__PURE__ */ lr.createElement("span", { "aria-hidden": "true" }, "False"), /* @__PURE__ */ lr.createElement("span", { "aria-hidden": "\
true" }, "True"));
}, "BooleanControl");

// ../addons/docs/src/blocks/controls/Date.tsx
Ne();
import oo, { useEffect as Ug, useRef as Sl, useState as qg } from "react";
import { Form as Wg } from "storybook/internal/components";
import { styled as wl } from "storybook/theming";
var Gg = /* @__PURE__ */ a((e) => {
  let [t, r, o] = e.split("-"), n = /* @__PURE__ */ new Date();
  return n.setFullYear(parseInt(t, 10), parseInt(r, 10) - 1, parseInt(o, 10)), n;
}, "parseDate"), Jg = /* @__PURE__ */ a((e) => {
  let [t, r] = e.split(":"), o = /* @__PURE__ */ new Date();
  return o.setHours(parseInt(t, 10)), o.setMinutes(parseInt(r, 10)), o;
}, "parseTime"), Kg = /* @__PURE__ */ a((e) => {
  let t = new Date(e), r = `000${t.getFullYear()}`.slice(-4), o = `0${t.getMonth() + 1}`.slice(-2), n = `0${t.getDate()}`.slice(-2);
  return `${r}-${o}-${n}`;
}, "formatDate"), Yg = /* @__PURE__ */ a((e) => {
  let t = new Date(e), r = `0${t.getHours()}`.slice(-2), o = `0${t.getMinutes()}`.slice(-2);
  return `${r}:${o}`;
}, "formatTime"), Cl = wl(Wg.Input)(({ readOnly: e }) => ({
  opacity: e ? 0.5 : 1
})), Xg = wl.div(({ theme: e }) => ({
  flex: 1,
  display: "flex",
  input: {
    marginLeft: 10,
    flex: 1,
    height: 32,
    // hardcode height bc Chromium bug https://bugs.chromium.org/p/chromium/issues/detail?id=417606
    "&::-webkit-calendar-picker-indicator": {
      opacity: 0.5,
      height: 12,
      filter: e.base === "light" ? void 0 : "invert(1)"
    }
  },
  "input:first-of-type": {
    marginLeft: 0,
    flexGrow: 4
  },
  "input:last-of-type": {
    flexGrow: 3
  }
})), Tl = /* @__PURE__ */ a(({ name: e, value: t, onChange: r, onFocus: o, onBlur: n, argType: i }) => {
  let [s, l] = qg(!0), c = Sl(), u = Sl(), d = !!i?.table?.readonly;
  Ug(() => {
    s !== !1 && (c && c.current && (c.current.value = t ? Kg(t) : ""), u && u.current && (u.current.value = t ? Yg(t) : ""));
  }, [t]);
  let g = /* @__PURE__ */ a((f) => {
    if (!f.target.value)
      return r();
    let h = Gg(f.target.value), b = new Date(t ?? "");
    b.setFullYear(h.getFullYear(), h.getMonth(), h.getDate());
    let y = b.getTime();
    y && r(y), l(!!y);
  }, "onDateChange"), p = /* @__PURE__ */ a((f) => {
    if (!f.target.value)
      return r();
    let h = Jg(f.target.value), b = new Date(t ?? "");
    b.setHours(h.getHours()), b.setMinutes(h.getMinutes());
    let y = b.getTime();
    y && r(y), l(!!y);
  }, "onTimeChange"), m = Z(e);
  return /* @__PURE__ */ oo.createElement(Xg, null, /* @__PURE__ */ oo.createElement(
    Cl,
    {
      type: "date",
      max: "9999-12-31",
      ref: c,
      id: `${m}-date`,
      name: `${m}-date`,
      readOnly: d,
      onChange: g,
      onFocus: o,
      onBlur: n
    }
  ), /* @__PURE__ */ oo.createElement(
    Cl,
    {
      type: "time",
      id: `${m}-time`,
      name: `${m}-time`,
      ref: u,
      onChange: p,
      readOnly: d,
      onFocus: o,
      onBlur: n
    }
  ), s ? null : /* @__PURE__ */ oo.createElement("div", null, "invalid"));
}, "DateControl");

// ../addons/docs/src/blocks/controls/Number.tsx
Ne();
import Vn, { useCallback as Al, useEffect as kl, useRef as Zg, useState as zn } from "react";
import { Button as Qg, Form as eh } from "storybook/internal/components";
import { styled as Ol } from "storybook/theming";
var th = Ol.label({
  display: "flex"
}), Il = /* @__PURE__ */ a((e) => {
  let t = parseFloat(e);
  return Number.isNaN(t) ? void 0 : t;
}, "parse");
var rh = Ol(eh.Input)(({ readOnly: e }) => ({
  opacity: e ? 0.5 : 1
})), Pl = /* @__PURE__ */ a(({
  name: e,
  value: t,
  onChange: r,
  min: o,
  max: n,
  step: i,
  onBlur: s,
  onFocus: l,
  argType: c
}) => {
  let [u, d] = zn(typeof t == "number" ? t : ""), [g, p] = zn(!1), [m, f] = zn(null), h = !!c?.table?.readonly, b = Al(
    (v) => {
      d(v.target.value);
      let S = parseFloat(v.target.value);
      Number.isNaN(S) ? f(new Error(`'${v.target.value}' is not a number`)) : (r(S), f(null));
    },
    [r, f]
  ), y = Al(() => {
    d("0"), r(0), p(!0);
  }, [p]), x = Zg(null);
  return kl(() => {
    g && x.current && x.current.select();
  }, [g]), kl(() => {
    let v = typeof t == "number" ? t : "";
    u !== v && d(v);
  }, [t]), t === void 0 ? /* @__PURE__ */ Vn.createElement(
    Qg,
    {
      variant: "outline",
      size: "medium",
      id: ct(e),
      onClick: y,
      disabled: h
    },
    "Set number"
  ) : /* @__PURE__ */ Vn.createElement(th, null, /* @__PURE__ */ Vn.createElement(
    rh,
    {
      ref: x,
      id: Z(e),
      type: "number",
      onChange: b,
      size: "flex",
      placeholder: "Edit number...",
      value: u,
      valid: m ? "error" : void 0,
      autoFocus: g,
      readOnly: h,
      name: e,
      min: o,
      max: n,
      step: i,
      onFocus: l,
      onBlur: s
    }
  ));
}, "NumberControl");

// ../addons/docs/src/blocks/controls/options/Options.tsx
import yh from "react";

// ../addons/docs/src/blocks/controls/options/Checkbox.tsx
Ne();
import zt, { useEffect as oh, useState as nh } from "react";
import { logger as ah } from "storybook/internal/client-logger";
import { styled as $n } from "storybook/theming";

// ../addons/docs/src/blocks/controls/options/helpers.ts
var no = /* @__PURE__ */ a((e, t) => {
  let r = t && Object.entries(t).find(([o, n]) => n === e);
  return r ? r[0] : void 0;
}, "selectedKey"), cr = /* @__PURE__ */ a((e, t) => e && t ? Object.entries(t).filter((r) => e.includes(r[1])).map((r) => r[0]) : [], "selec\
tedKeys"), ao = /* @__PURE__ */ a((e, t) => e && t && e.map((r) => t[r]), "selectedValues");

// ../addons/docs/src/blocks/controls/options/Checkbox.tsx
var ih = $n.div(
  ({ isInline: e }) => e ? {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    label: {
      display: "inline-flex",
      marginRight: 15
    }
  } : {
    label: {
      display: "flex"
    }
  },
  (e) => {
    if (e["aria-readonly"] === "true")
      return {
        input: {
          cursor: "not-allowed"
        }
      };
  }
), sh = $n.span({
  "[aria-readonly=true] &": {
    opacity: 0.5
  }
}), lh = $n.label({
  lineHeight: "20px",
  alignItems: "center",
  marginBottom: 8,
  "&:last-child": {
    marginBottom: 0
  },
  input: {
    margin: 0,
    marginRight: 6
  }
}), Un = /* @__PURE__ */ a(({
  name: e,
  options: t,
  value: r,
  onChange: o,
  isInline: n,
  argType: i
}) => {
  if (!t)
    return ah.warn(`Checkbox with no options: ${e}`), /* @__PURE__ */ zt.createElement(zt.Fragment, null, "-");
  let s = cr(r || [], t), [l, c] = nh(s), u = !!i?.table?.readonly, d = /* @__PURE__ */ a((p) => {
    let m = p.target.value, f = [...l];
    f.includes(m) ? f.splice(f.indexOf(m), 1) : f.push(m), o(ao(f, t)), c(f);
  }, "handleChange");
  oh(() => {
    c(cr(r || [], t));
  }, [r]);
  let g = Z(e);
  return /* @__PURE__ */ zt.createElement(ih, { "aria-readonly": u, isInline: n }, Object.keys(t).map((p, m) => {
    let f = `${g}-${m}`;
    return /* @__PURE__ */ zt.createElement(lh, { key: f, htmlFor: f }, /* @__PURE__ */ zt.createElement(
      "input",
      {
        type: "checkbox",
        disabled: u,
        id: f,
        name: f,
        value: p,
        onChange: d,
        checked: l?.includes(p)
      }
    ), /* @__PURE__ */ zt.createElement(sh, null, p));
  }));
}, "CheckboxControl");

// ../addons/docs/src/blocks/controls/options/Radio.tsx
Ne();
import $t from "react";
import { logger as ch } from "storybook/internal/client-logger";
import { styled as qn } from "storybook/theming";
var ph = qn.div(
  ({ isInline: e }) => e ? {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    label: {
      display: "inline-flex",
      marginRight: 15
    }
  } : {
    label: {
      display: "flex"
    }
  },
  (e) => {
    if (e["aria-readonly"] === "true")
      return {
        input: {
          cursor: "not-allowed"
        }
      };
  }
), uh = qn.span({
  "[aria-readonly=true] &": {
    opacity: 0.5
  }
}), dh = qn.label({
  lineHeight: "20px",
  alignItems: "center",
  marginBottom: 8,
  "&:last-child": {
    marginBottom: 0
  },
  input: {
    margin: 0,
    marginRight: 6
  }
}), Wn = /* @__PURE__ */ a(({
  name: e,
  options: t,
  value: r,
  onChange: o,
  isInline: n,
  argType: i
}) => {
  if (!t)
    return ch.warn(`Radio with no options: ${e}`), /* @__PURE__ */ $t.createElement($t.Fragment, null, "-");
  let s = no(r, t), l = Z(e), c = !!i?.table?.readonly;
  return /* @__PURE__ */ $t.createElement(ph, { "aria-readonly": c, isInline: n }, Object.keys(t).map((u, d) => {
    let g = `${l}-${d}`;
    return /* @__PURE__ */ $t.createElement(dh, { key: g, htmlFor: g }, /* @__PURE__ */ $t.createElement(
      "input",
      {
        type: "radio",
        id: g,
        name: l,
        disabled: c,
        value: u,
        onChange: (p) => o(t[p.currentTarget.value]),
        checked: u === s
      }
    ), /* @__PURE__ */ $t.createElement(uh, null, u));
  }));
}, "RadioControl");

// ../addons/docs/src/blocks/controls/options/Select.tsx
Ne();
import _e from "react";
import { logger as fh } from "storybook/internal/client-logger";
import { ChevronSmallDownIcon as mh } from "@storybook/icons";
import { styled as Nl } from "storybook/theming";
var gh = {
  // resets
  appearance: "none",
  border: "0 none",
  boxSizing: "inherit",
  display: " block",
  margin: " 0",
  background: "transparent",
  padding: 0,
  fontSize: "inherit",
  position: "relative"
}, _l = Nl.select(gh, ({ theme: e }) => ({
  boxSizing: "border-box",
  position: "relative",
  padding: "6px 10px",
  width: "100%",
  color: e.input.color || "inherit",
  background: e.input.background,
  borderRadius: e.input.borderRadius,
  boxShadow: `${e.input.border} 0 0 0 1px inset`,
  fontSize: e.typography.size.s2 - 1,
  lineHeight: "20px",
  "&:focus": {
    boxShadow: `${e.color.secondary} 0 0 0 1px inset`,
    outline: "none"
  },
  "&[disabled]": {
    cursor: "not-allowed",
    opacity: 0.5
  },
  "::placeholder": {
    color: e.textMutedColor
  },
  "&[multiple]": {
    overflow: "auto",
    padding: 0,
    option: {
      display: "block",
      padding: "6px 10px",
      marginLeft: 1,
      marginRight: 1
    }
  }
})), Dl = Nl.span(({ theme: e }) => ({
  display: "inline-block",
  lineHeight: "normal",
  overflow: "hidden",
  position: "relative",
  verticalAlign: "top",
  width: "100%",
  svg: {
    position: "absolute",
    zIndex: 1,
    pointerEvents: "none",
    height: "12px",
    marginTop: "-6px",
    right: "12px",
    top: "50%",
    fill: e.textMutedColor,
    path: {
      fill: e.textMutedColor
    }
  }
})), Ll = "Choose option...", hh = /* @__PURE__ */ a(({ name: e, value: t, options: r, onChange: o, argType: n }) => {
  let i = /* @__PURE__ */ a((u) => {
    o(r[u.currentTarget.value]);
  }, "handleChange"), s = no(t, r) || Ll, l = Z(e), c = !!n?.table?.readonly;
  return /* @__PURE__ */ _e.createElement(Dl, null, /* @__PURE__ */ _e.createElement(mh, null), /* @__PURE__ */ _e.createElement(_l, { disabled: c,
  id: l, value: s, onChange: i }, /* @__PURE__ */ _e.createElement("option", { key: "no-selection", disabled: !0 }, Ll), Object.keys(r).map(
  (u) => /* @__PURE__ */ _e.createElement("option", { key: u, value: u }, u))));
}, "SingleSelect"), bh = /* @__PURE__ */ a(({ name: e, value: t, options: r, onChange: o, argType: n }) => {
  let i = /* @__PURE__ */ a((u) => {
    let d = Array.from(u.currentTarget.options).filter((g) => g.selected).map((g) => g.value);
    o(ao(d, r));
  }, "handleChange"), s = cr(t, r), l = Z(e), c = !!n?.table?.readonly;
  return /* @__PURE__ */ _e.createElement(Dl, null, /* @__PURE__ */ _e.createElement(
    _l,
    {
      disabled: c,
      id: l,
      multiple: !0,
      value: s,
      onChange: i
    },
    Object.keys(r).map((u) => /* @__PURE__ */ _e.createElement("option", { key: u, value: u }, u))
  ));
}, "MultiSelect"), Gn = /* @__PURE__ */ a((e) => {
  let { name: t, options: r } = e;
  return r ? e.isMulti ? /* @__PURE__ */ _e.createElement(bh, { ...e }) : /* @__PURE__ */ _e.createElement(hh, { ...e }) : (fh.warn(`Select \
with no options: ${t}`), /* @__PURE__ */ _e.createElement(_e.Fragment, null, "-"));
}, "SelectControl");

// ../addons/docs/src/blocks/controls/options/Options.tsx
var xh = /* @__PURE__ */ a((e, t) => Array.isArray(e) ? e.reduce((r, o) => (r[t?.[o] || String(o)] = o, r), {}) : e, "normalizeOptions"), vh = {
  check: Un,
  "inline-check": Un,
  radio: Wn,
  "inline-radio": Wn,
  select: Gn,
  "multi-select": Gn
}, At = /* @__PURE__ */ a((e) => {
  let { type: t = "select", labels: r, argType: o } = e, n = {
    ...e,
    argType: o,
    options: o ? xh(o.options, r) : {},
    isInline: t.includes("inline"),
    isMulti: t.includes("multi")
  }, i = vh[t];
  if (i)
    return /* @__PURE__ */ yh.createElement(i, { ...n });
  throw new Error(`Unknown options type: ${t}`);
}, "OptionsControl");

// ../addons/docs/src/blocks/controls/Object.tsx
or();
Ne();
import be, { useCallback as Ql, useEffect as Ch, useMemo as wh, useRef as Th, useState as ra } from "react";
import { Button as Ah, Form as kh, IconButton as Oh } from "storybook/internal/components";
import { AddIcon as Ih, EyeCloseIcon as Ph, EyeIcon as Lh, SubtractIcon as Nh } from "@storybook/icons";
import { styled as Ot, useTheme as _h } from "storybook/theming";

// ../addons/docs/src/blocks/controls/react-editable-json-tree/index.tsx
import fo, { Component as Sh } from "react";

// ../addons/docs/src/blocks/controls/react-editable-json-tree/JsonNodes.tsx
import O, { Component as Ut, cloneElement as ie } from "react";

// ../addons/docs/src/blocks/controls/react-editable-json-tree/types/dataTypes.ts
var Bl = "Error", Ml = "Object", Fl = "Array", jl = "String", Rl = "Number", Hl = "Boolean", Vl = "Date", zl = "Null", $l = "Undefined", Ul = "\
Function", ql = "Symbol";

// ../addons/docs/src/blocks/controls/react-editable-json-tree/types/deltaTypes.ts
var io = "ADD_DELTA_TYPE", so = "REMOVE_DELTA_TYPE", lo = "UPDATE_DELTA_TYPE";

// ../addons/docs/src/blocks/controls/react-editable-json-tree/types/inputUsageTypes.ts
var co = "value", Gl = "key";

// ../addons/docs/src/blocks/controls/react-editable-json-tree/utils/objectTypes.ts
function Ze(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e) && typeof e[Symbol.iterator] == "function" ? "Iterable" : Object.prototype.
  toString.call(e).slice(8, -1);
}
a(Ze, "getObjectType");
function Jn(e, t) {
  let r = Ze(e), o = Ze(t);
  return (r === "Function" || o === "Function") && o !== r;
}
a(Jn, "isComponentWillChange");

// ../addons/docs/src/blocks/controls/react-editable-json-tree/JsonNodes.tsx
var Kn = class Kn extends Ut {
  constructor(t) {
    super(t), this.state = {
      inputRefKey: null,
      inputRefValue: null
    }, this.refInputValue = this.refInputValue.bind(this), this.refInputKey = this.refInputKey.bind(this), this.onKeydown = this.onKeydown.bind(
    this), this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    let { inputRefKey: t, inputRefValue: r } = this.state, { onlyValue: o } = this.props;
    t && typeof t.focus == "function" && t.focus(), o && r && typeof r.focus == "function" && r.focus(), document.addEventListener("keydown",
    this.onKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
  }
  onKeydown(t) {
    if (t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || t.repeat)
      return;
    let { inputRefKey: r, inputRefValue: o } = this.state, { addButtonElement: n, handleCancel: i } = this.props;
    [r, o, n].some(
      (l) => l === t.target
    ) && ((t.code === "Enter" || t.key === "Enter") && (t.preventDefault(), this.onSubmit()), (t.code === "Escape" || t.key === "Escape") &&
    (t.preventDefault(), i()));
  }
  onSubmit() {
    let { handleAdd: t, onlyValue: r, onSubmitValueParser: o, keyPath: n, deep: i } = this.props, { inputRefKey: s, inputRefValue: l } = this.
    state, c = {};
    if (!r) {
      if (!s.value)
        return;
      c.key = s.value;
    }
    c.newValue = o(!1, n, i, c.key, l.value), t(c);
  }
  refInputKey(t) {
    this.state.inputRefKey = t;
  }
  refInputValue(t) {
    this.state.inputRefValue = t;
  }
  render() {
    let {
      handleCancel: t,
      onlyValue: r,
      addButtonElement: o,
      cancelButtonElement: n,
      inputElementGenerator: i,
      keyPath: s,
      deep: l
    } = this.props, c = o && ie(o, {
      onClick: this.onSubmit
    }), u = n && ie(n, {
      onClick: t
    }), d = i(co, s, l), g = ie(d, {
      placeholder: "Value",
      ref: this.refInputValue
    }), p = null;
    if (!r) {
      let m = i(Gl, s, l);
      p = ie(m, {
        placeholder: "Key",
        ref: this.refInputKey
      });
    }
    return /* @__PURE__ */ O.createElement("span", { className: "rejt-add-value-node" }, p, g, u, c);
  }
};
a(Kn, "JsonAddValue");
var pr = Kn;
pr.defaultProps = {
  onlyValue: !1,
  addButtonElement: /* @__PURE__ */ O.createElement("button", null, "+"),
  cancelButtonElement: /* @__PURE__ */ O.createElement("button", null, "c")
};
var Yn = class Yn extends Ut {
  constructor(t) {
    super(t);
    let r = [...t.keyPath || [], t.name];
    this.state = {
      data: t.data,
      name: t.name,
      keyPath: r,
      deep: t.deep ?? 0,
      nextDeep: (t.deep ?? 0) + 1,
      collapsed: t.isCollapsed(r, t.deep ?? 0, t.data),
      addFormVisible: !1
    }, this.handleCollapseMode = this.handleCollapseMode.bind(this), this.handleRemoveItem = this.handleRemoveItem.bind(this), this.handleAddMode =
    this.handleAddMode.bind(this), this.handleAddValueAdd = this.handleAddValueAdd.bind(this), this.handleAddValueCancel = this.handleAddValueCancel.
    bind(this), this.handleEditValue = this.handleEditValue.bind(this), this.onChildUpdate = this.onChildUpdate.bind(this), this.renderCollapsed =
    this.renderCollapsed.bind(this), this.renderNotCollapsed = this.renderNotCollapsed.bind(this);
  }
  static getDerivedStateFromProps(t, r) {
    return t.data !== r.data ? { data: t.data } : null;
  }
  onChildUpdate(t, r) {
    let { data: o, keyPath: n = [] } = this.state;
    o[t] = r, this.setState({
      data: o
    });
    let { onUpdate: i } = this.props, s = n.length;
    i(n[s - 1], o);
  }
  handleAddMode() {
    this.setState({
      addFormVisible: !0
    });
  }
  handleCollapseMode() {
    this.setState((t) => ({
      collapsed: !t.collapsed
    }));
  }
  handleRemoveItem(t) {
    return () => {
      let { beforeRemoveAction: r, logger: o } = this.props, { data: n, keyPath: i, nextDeep: s } = this.state, l = n[t];
      (r || Promise.resolve.bind(Promise))(t, i, s, l).then(() => {
        let c = {
          keyPath: i,
          deep: s,
          key: t,
          oldValue: l,
          type: so
        };
        n.splice(t, 1), this.setState({ data: n });
        let { onUpdate: u, onDeltaUpdate: d } = this.props;
        u(i[i.length - 1], n), d(c);
      }).catch(o.error);
    };
  }
  handleAddValueAdd({ key: t, newValue: r }) {
    let { data: o, keyPath: n = [], nextDeep: i } = this.state, { beforeAddAction: s, logger: l } = this.props;
    (s || Promise.resolve.bind(Promise))(t, n, i, r).then(() => {
      o[t] = r, this.setState({
        data: o
      }), this.handleAddValueCancel();
      let { onUpdate: c, onDeltaUpdate: u } = this.props;
      c(n[n.length - 1], o), u({
        type: io,
        keyPath: n,
        deep: i,
        key: t,
        newValue: r
      });
    }).catch(l.error);
  }
  handleAddValueCancel() {
    this.setState({
      addFormVisible: !1
    });
  }
  handleEditValue({ key: t, value: r }) {
    return new Promise((o, n) => {
      let { beforeUpdateAction: i } = this.props, { data: s, keyPath: l, nextDeep: c } = this.state, u = s[t];
      (i || Promise.resolve.bind(Promise))(t, l, c, u, r).then(() => {
        s[t] = r, this.setState({
          data: s
        });
        let { onUpdate: d, onDeltaUpdate: g } = this.props;
        d(l[l.length - 1], s), g({
          type: lo,
          keyPath: l,
          deep: c,
          key: t,
          newValue: r,
          oldValue: u
        }), o(void 0);
      }).catch(n);
    });
  }
  renderCollapsed() {
    let { name: t, data: r, keyPath: o, deep: n } = this.state, { handleRemove: i, readOnly: s, getStyle: l, dataType: c, minusMenuElement: u } = this.
    props, { minus: d, collapsed: g } = l(t, r, o, n, c), p = s(t, r, o, n, c), m = u && ie(u, {
      onClick: i,
      className: "rejt-minus-menu",
      style: d
    });
    return /* @__PURE__ */ O.createElement("span", { className: "rejt-collapsed" }, /* @__PURE__ */ O.createElement("span", { className: "re\
jt-collapsed-text", style: g, onClick: this.handleCollapseMode }, "[...] ", r.length, " ", r.length === 1 ? "item" : "items"), !p && m);
  }
  renderNotCollapsed() {
    let { name: t, data: r, keyPath: o, deep: n, addFormVisible: i, nextDeep: s } = this.state, {
      isCollapsed: l,
      handleRemove: c,
      onDeltaUpdate: u,
      readOnly: d,
      getStyle: g,
      dataType: p,
      addButtonElement: m,
      cancelButtonElement: f,
      editButtonElement: h,
      inputElementGenerator: b,
      textareaElementGenerator: y,
      minusMenuElement: x,
      plusMenuElement: v,
      beforeRemoveAction: S,
      beforeAddAction: w,
      beforeUpdateAction: E,
      logger: I,
      onSubmitValueParser: D
    } = this.props, { minus: _, plus: z, delimiter: W, ul: ee, addForm: ce } = g(t, r, o, n, p), ne = d(t, r, o, n, p), ae = v && ie(v, {
      onClick: this.handleAddMode,
      className: "rejt-plus-menu",
      style: z
    }), B = x && ie(x, {
      onClick: c,
      className: "rejt-minus-menu",
      style: _
    });
    return /* @__PURE__ */ O.createElement("span", { className: "rejt-not-collapsed" }, /* @__PURE__ */ O.createElement("span", { className: "\
rejt-not-collapsed-delimiter", style: W }, "["), !i && ae, /* @__PURE__ */ O.createElement("ul", { className: "rejt-not-collapsed-list", style: ee },
    r.map((k, $) => /* @__PURE__ */ O.createElement(
      kt,
      {
        key: $,
        name: $.toString(),
        data: k,
        keyPath: o,
        deep: s,
        isCollapsed: l,
        handleRemove: this.handleRemoveItem($),
        handleUpdateValue: this.handleEditValue,
        onUpdate: this.onChildUpdate,
        onDeltaUpdate: u,
        readOnly: d,
        getStyle: g,
        addButtonElement: m,
        cancelButtonElement: f,
        editButtonElement: h,
        inputElementGenerator: b,
        textareaElementGenerator: y,
        minusMenuElement: x,
        plusMenuElement: v,
        beforeRemoveAction: S,
        beforeAddAction: w,
        beforeUpdateAction: E,
        logger: I,
        onSubmitValueParser: D
      }
    ))), !ne && i && /* @__PURE__ */ O.createElement("div", { className: "rejt-add-form", style: ce }, /* @__PURE__ */ O.createElement(
      pr,
      {
        handleAdd: this.handleAddValueAdd,
        handleCancel: this.handleAddValueCancel,
        onlyValue: !0,
        addButtonElement: m,
        cancelButtonElement: f,
        inputElementGenerator: b,
        keyPath: o,
        deep: n,
        onSubmitValueParser: D
      }
    )), /* @__PURE__ */ O.createElement("span", { className: "rejt-not-collapsed-delimiter", style: W }, "]"), !ne && B);
  }
  render() {
    let { name: t, collapsed: r, data: o, keyPath: n, deep: i } = this.state, { dataType: s, getStyle: l } = this.props, c = r ? this.renderCollapsed() :
    this.renderNotCollapsed(), u = l(t, o, n, i, s);
    return /* @__PURE__ */ O.createElement("div", { className: "rejt-array-node" }, /* @__PURE__ */ O.createElement("span", { onClick: this.
    handleCollapseMode }, /* @__PURE__ */ O.createElement("span", { className: "rejt-name", style: u.name }, t, " :", " ")), c);
  }
};
a(Yn, "JsonArray");
var po = Yn;
po.defaultProps = {
  keyPath: [],
  deep: 0,
  minusMenuElement: /* @__PURE__ */ O.createElement("span", null, " - "),
  plusMenuElement: /* @__PURE__ */ O.createElement("span", null, " + ")
};
var Xn = class Xn extends Ut {
  constructor(t) {
    super(t);
    let r = [...t.keyPath || [], t.name];
    this.state = {
      value: t.value,
      name: t.name,
      keyPath: r,
      deep: t.deep,
      editEnabled: !1,
      inputRef: null
    }, this.handleEditMode = this.handleEditMode.bind(this), this.refInput = this.refInput.bind(this), this.handleCancelEdit = this.handleCancelEdit.
    bind(this), this.handleEdit = this.handleEdit.bind(this), this.onKeydown = this.onKeydown.bind(this);
  }
  static getDerivedStateFromProps(t, r) {
    return t.value !== r.value ? { value: t.value } : null;
  }
  componentDidUpdate() {
    let { editEnabled: t, inputRef: r, name: o, value: n, keyPath: i, deep: s } = this.state, { readOnly: l, dataType: c } = this.props, u = l(
    o, n, i, s, c);
    t && !u && typeof r.focus == "function" && r.focus();
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
  }
  onKeydown(t) {
    let { inputRef: r } = this.state;
    t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || t.repeat || r !== t.target || ((t.code === "Enter" || t.key === "Enter") && (t.preventDefault(),
    this.handleEdit()), (t.code === "Escape" || t.key === "Escape") && (t.preventDefault(), this.handleCancelEdit()));
  }
  handleEdit() {
    let { handleUpdateValue: t, originalValue: r, logger: o, onSubmitValueParser: n, keyPath: i } = this.props, { inputRef: s, name: l, deep: c } = this.
    state;
    if (!s)
      return;
    let u = n(!0, i, c, l, s.value), d = {
      value: u,
      key: l
    };
    (t || Promise.resolve.bind(Promise))(d).then(() => {
      Jn(r, u) || this.handleCancelEdit();
    }).catch(o.error);
  }
  handleEditMode() {
    this.setState({
      editEnabled: !0
    });
  }
  refInput(t) {
    this.state.inputRef = t;
  }
  handleCancelEdit() {
    this.setState({
      editEnabled: !1
    });
  }
  render() {
    let { name: t, value: r, editEnabled: o, keyPath: n, deep: i } = this.state, {
      handleRemove: s,
      originalValue: l,
      readOnly: c,
      dataType: u,
      getStyle: d,
      editButtonElement: g,
      cancelButtonElement: p,
      textareaElementGenerator: m,
      minusMenuElement: f,
      keyPath: h
    } = this.props, b = d(t, l, n, i, u), y = null, x = null, v = c(t, l, n, i, u);
    if (o && !v) {
      let S = m(
        co,
        h,
        i,
        t,
        l,
        u
      ), w = g && ie(g, {
        onClick: this.handleEdit
      }), E = p && ie(p, {
        onClick: this.handleCancelEdit
      }), I = ie(S, {
        ref: this.refInput,
        defaultValue: l
      });
      y = /* @__PURE__ */ O.createElement("span", { className: "rejt-edit-form", style: b.editForm }, I, " ", E, w), x = null;
    } else {
      y = /* @__PURE__ */ O.createElement(
        "span",
        {
          className: "rejt-value",
          style: b.value,
          onClick: v ? void 0 : this.handleEditMode
        },
        r
      );
      let S = f && ie(f, {
        onClick: s,
        className: "rejt-minus-menu",
        style: b.minus
      });
      x = v ? null : S;
    }
    return /* @__PURE__ */ O.createElement("li", { className: "rejt-function-value-node", style: b.li }, /* @__PURE__ */ O.createElement("sp\
an", { className: "rejt-name", style: b.name }, t, " :", " "), y, x);
  }
};
a(Xn, "JsonFunctionValue");
var uo = Xn;
uo.defaultProps = {
  keyPath: [],
  deep: 0,
  handleUpdateValue: /* @__PURE__ */ a(() => {
  }, "handleUpdateValue"),
  editButtonElement: /* @__PURE__ */ O.createElement("button", null, "e"),
  cancelButtonElement: /* @__PURE__ */ O.createElement("button", null, "c"),
  minusMenuElement: /* @__PURE__ */ O.createElement("span", null, " - ")
};
var Zn = class Zn extends Ut {
  constructor(t) {
    super(t), this.state = {
      data: t.data,
      name: t.name,
      keyPath: t.keyPath,
      deep: t.deep
    };
  }
  static getDerivedStateFromProps(t, r) {
    return t.data !== r.data ? { data: t.data } : null;
  }
  render() {
    let { data: t, name: r, keyPath: o, deep: n } = this.state, {
      isCollapsed: i,
      handleRemove: s,
      handleUpdateValue: l,
      onUpdate: c,
      onDeltaUpdate: u,
      readOnly: d,
      getStyle: g,
      addButtonElement: p,
      cancelButtonElement: m,
      editButtonElement: f,
      inputElementGenerator: h,
      textareaElementGenerator: b,
      minusMenuElement: y,
      plusMenuElement: x,
      beforeRemoveAction: v,
      beforeAddAction: S,
      beforeUpdateAction: w,
      logger: E,
      onSubmitValueParser: I
    } = this.props, D = /* @__PURE__ */ a(() => !0, "readOnlyTrue"), _ = Ze(t);
    switch (_) {
      case Bl:
        return /* @__PURE__ */ O.createElement(
          ur,
          {
            data: t,
            name: r,
            isCollapsed: i,
            keyPath: o,
            deep: n,
            handleRemove: s,
            onUpdate: c,
            onDeltaUpdate: u,
            readOnly: D,
            dataType: _,
            getStyle: g,
            addButtonElement: p,
            cancelButtonElement: m,
            editButtonElement: f,
            inputElementGenerator: h,
            textareaElementGenerator: b,
            minusMenuElement: y,
            plusMenuElement: x,
            beforeRemoveAction: v,
            beforeAddAction: S,
            beforeUpdateAction: w,
            logger: E,
            onSubmitValueParser: I
          }
        );
      case Ml:
        return /* @__PURE__ */ O.createElement(
          ur,
          {
            data: t,
            name: r,
            isCollapsed: i,
            keyPath: o,
            deep: n,
            handleRemove: s,
            onUpdate: c,
            onDeltaUpdate: u,
            readOnly: d,
            dataType: _,
            getStyle: g,
            addButtonElement: p,
            cancelButtonElement: m,
            editButtonElement: f,
            inputElementGenerator: h,
            textareaElementGenerator: b,
            minusMenuElement: y,
            plusMenuElement: x,
            beforeRemoveAction: v,
            beforeAddAction: S,
            beforeUpdateAction: w,
            logger: E,
            onSubmitValueParser: I
          }
        );
      case Fl:
        return /* @__PURE__ */ O.createElement(
          po,
          {
            data: t,
            name: r,
            isCollapsed: i,
            keyPath: o,
            deep: n,
            handleRemove: s,
            onUpdate: c,
            onDeltaUpdate: u,
            readOnly: d,
            dataType: _,
            getStyle: g,
            addButtonElement: p,
            cancelButtonElement: m,
            editButtonElement: f,
            inputElementGenerator: h,
            textareaElementGenerator: b,
            minusMenuElement: y,
            plusMenuElement: x,
            beforeRemoveAction: v,
            beforeAddAction: S,
            beforeUpdateAction: w,
            logger: E,
            onSubmitValueParser: I
          }
        );
      case jl:
        return /* @__PURE__ */ O.createElement(
          Ue,
          {
            name: r,
            value: `"${t}"`,
            originalValue: t,
            keyPath: o,
            deep: n,
            handleRemove: s,
            handleUpdateValue: l,
            readOnly: d,
            dataType: _,
            getStyle: g,
            cancelButtonElement: m,
            editButtonElement: f,
            inputElementGenerator: h,
            minusMenuElement: y,
            logger: E,
            onSubmitValueParser: I
          }
        );
      case Rl:
        return /* @__PURE__ */ O.createElement(
          Ue,
          {
            name: r,
            value: t,
            originalValue: t,
            keyPath: o,
            deep: n,
            handleRemove: s,
            handleUpdateValue: l,
            readOnly: d,
            dataType: _,
            getStyle: g,
            cancelButtonElement: m,
            editButtonElement: f,
            inputElementGenerator: h,
            minusMenuElement: y,
            logger: E,
            onSubmitValueParser: I
          }
        );
      case Hl:
        return /* @__PURE__ */ O.createElement(
          Ue,
          {
            name: r,
            value: t ? "true" : "false",
            originalValue: t,
            keyPath: o,
            deep: n,
            handleRemove: s,
            handleUpdateValue: l,
            readOnly: d,
            dataType: _,
            getStyle: g,
            cancelButtonElement: m,
            editButtonElement: f,
            inputElementGenerator: h,
            minusMenuElement: y,
            logger: E,
            onSubmitValueParser: I
          }
        );
      case Vl:
        return /* @__PURE__ */ O.createElement(
          Ue,
          {
            name: r,
            value: t.toISOString(),
            originalValue: t,
            keyPath: o,
            deep: n,
            handleRemove: s,
            handleUpdateValue: l,
            readOnly: D,
            dataType: _,
            getStyle: g,
            cancelButtonElement: m,
            editButtonElement: f,
            inputElementGenerator: h,
            minusMenuElement: y,
            logger: E,
            onSubmitValueParser: I
          }
        );
      case zl:
        return /* @__PURE__ */ O.createElement(
          Ue,
          {
            name: r,
            value: "null",
            originalValue: "null",
            keyPath: o,
            deep: n,
            handleRemove: s,
            handleUpdateValue: l,
            readOnly: d,
            dataType: _,
            getStyle: g,
            cancelButtonElement: m,
            editButtonElement: f,
            inputElementGenerator: h,
            minusMenuElement: y,
            logger: E,
            onSubmitValueParser: I
          }
        );
      case $l:
        return /* @__PURE__ */ O.createElement(
          Ue,
          {
            name: r,
            value: "undefined",
            originalValue: "undefined",
            keyPath: o,
            deep: n,
            handleRemove: s,
            handleUpdateValue: l,
            readOnly: d,
            dataType: _,
            getStyle: g,
            cancelButtonElement: m,
            editButtonElement: f,
            inputElementGenerator: h,
            minusMenuElement: y,
            logger: E,
            onSubmitValueParser: I
          }
        );
      case Ul:
        return /* @__PURE__ */ O.createElement(
          uo,
          {
            name: r,
            value: t.toString(),
            originalValue: t,
            keyPath: o,
            deep: n,
            handleRemove: s,
            handleUpdateValue: l,
            readOnly: d,
            dataType: _,
            getStyle: g,
            cancelButtonElement: m,
            editButtonElement: f,
            textareaElementGenerator: b,
            minusMenuElement: y,
            logger: E,
            onSubmitValueParser: I
          }
        );
      case ql:
        return /* @__PURE__ */ O.createElement(
          Ue,
          {
            name: r,
            value: t.toString(),
            originalValue: t,
            keyPath: o,
            deep: n,
            handleRemove: s,
            handleUpdateValue: l,
            readOnly: D,
            dataType: _,
            getStyle: g,
            cancelButtonElement: m,
            editButtonElement: f,
            inputElementGenerator: h,
            minusMenuElement: y,
            logger: E,
            onSubmitValueParser: I
          }
        );
      default:
        return null;
    }
  }
};
a(Zn, "JsonNode");
var kt = Zn;
kt.defaultProps = {
  keyPath: [],
  deep: 0
};
var Qn = class Qn extends Ut {
  constructor(t) {
    super(t);
    let r = t.deep === -1 ? [] : [...t.keyPath || [], t.name];
    this.state = {
      name: t.name,
      data: t.data,
      keyPath: r,
      deep: t.deep ?? 0,
      nextDeep: (t.deep ?? 0) + 1,
      collapsed: t.isCollapsed(r, t.deep ?? 0, t.data),
      addFormVisible: !1
    }, this.handleCollapseMode = this.handleCollapseMode.bind(this), this.handleRemoveValue = this.handleRemoveValue.bind(this), this.handleAddMode =
    this.handleAddMode.bind(this), this.handleAddValueAdd = this.handleAddValueAdd.bind(this), this.handleAddValueCancel = this.handleAddValueCancel.
    bind(this), this.handleEditValue = this.handleEditValue.bind(this), this.onChildUpdate = this.onChildUpdate.bind(this), this.renderCollapsed =
    this.renderCollapsed.bind(this), this.renderNotCollapsed = this.renderNotCollapsed.bind(this);
  }
  static getDerivedStateFromProps(t, r) {
    return t.data !== r.data ? { data: t.data } : null;
  }
  onChildUpdate(t, r) {
    let { data: o, keyPath: n = [] } = this.state;
    o[t] = r, this.setState({
      data: o
    });
    let { onUpdate: i } = this.props, s = n.length;
    i(n[s - 1], o);
  }
  handleAddMode() {
    this.setState({
      addFormVisible: !0
    });
  }
  handleAddValueCancel() {
    this.setState({
      addFormVisible: !1
    });
  }
  handleAddValueAdd({ key: t, newValue: r }) {
    let { data: o, keyPath: n = [], nextDeep: i } = this.state, { beforeAddAction: s, logger: l } = this.props;
    (s || Promise.resolve.bind(Promise))(t, n, i, r).then(() => {
      o[t] = r, this.setState({
        data: o
      }), this.handleAddValueCancel();
      let { onUpdate: c, onDeltaUpdate: u } = this.props;
      c(n[n.length - 1], o), u({
        type: io,
        keyPath: n,
        deep: i,
        key: t,
        newValue: r
      });
    }).catch(l.error);
  }
  handleRemoveValue(t) {
    return () => {
      let { beforeRemoveAction: r, logger: o } = this.props, { data: n, keyPath: i = [], nextDeep: s } = this.state, l = n[t];
      (r || Promise.resolve.bind(Promise))(t, i, s, l).then(() => {
        let c = {
          keyPath: i,
          deep: s,
          key: t,
          oldValue: l,
          type: so
        };
        delete n[t], this.setState({ data: n });
        let { onUpdate: u, onDeltaUpdate: d } = this.props;
        u(i[i.length - 1], n), d(c);
      }).catch(o.error);
    };
  }
  handleCollapseMode() {
    this.setState((t) => ({
      collapsed: !t.collapsed
    }));
  }
  handleEditValue({ key: t, value: r }) {
    return new Promise((o, n) => {
      let { beforeUpdateAction: i } = this.props, { data: s, keyPath: l = [], nextDeep: c } = this.state, u = s[t];
      (i || Promise.resolve.bind(Promise))(t, l, c, u, r).then(() => {
        s[t] = r, this.setState({
          data: s
        });
        let { onUpdate: d, onDeltaUpdate: g } = this.props;
        d(l[l.length - 1], s), g({
          type: lo,
          keyPath: l,
          deep: c,
          key: t,
          newValue: r,
          oldValue: u
        }), o();
      }).catch(n);
    });
  }
  renderCollapsed() {
    let { name: t, keyPath: r, deep: o, data: n } = this.state, { handleRemove: i, readOnly: s, dataType: l, getStyle: c, minusMenuElement: u } = this.
    props, { minus: d, collapsed: g } = c(t, n, r, o, l), p = Object.getOwnPropertyNames(n), m = s(t, n, r, o, l), f = u && ie(u, {
      onClick: i,
      className: "rejt-minus-menu",
      style: d
    });
    return /* @__PURE__ */ O.createElement("span", { className: "rejt-collapsed" }, /* @__PURE__ */ O.createElement("span", { className: "re\
jt-collapsed-text", style: g, onClick: this.handleCollapseMode }, "{...}", " ", p.length, " ", p.length === 1 ? "key" : "keys"), !m && f);
  }
  renderNotCollapsed() {
    let { name: t, data: r, keyPath: o, deep: n, nextDeep: i, addFormVisible: s } = this.state, {
      isCollapsed: l,
      handleRemove: c,
      onDeltaUpdate: u,
      readOnly: d,
      getStyle: g,
      dataType: p,
      addButtonElement: m,
      cancelButtonElement: f,
      editButtonElement: h,
      inputElementGenerator: b,
      textareaElementGenerator: y,
      minusMenuElement: x,
      plusMenuElement: v,
      beforeRemoveAction: S,
      beforeAddAction: w,
      beforeUpdateAction: E,
      logger: I,
      onSubmitValueParser: D
    } = this.props, { minus: _, plus: z, addForm: W, ul: ee, delimiter: ce } = g(t, r, o, n, p), ne = Object.getOwnPropertyNames(r), ae = d(
    t, r, o, n, p), B = v && ie(v, {
      onClick: this.handleAddMode,
      className: "rejt-plus-menu",
      style: z
    }), R = x && ie(x, {
      onClick: c,
      className: "rejt-minus-menu",
      style: _
    }), T = ne.map(($) => /* @__PURE__ */ O.createElement(
      kt,
      {
        key: $,
        name: $,
        data: r[$],
        keyPath: o,
        deep: i,
        isCollapsed: l,
        handleRemove: this.handleRemoveValue($),
        handleUpdateValue: this.handleEditValue,
        onUpdate: this.onChildUpdate,
        onDeltaUpdate: u,
        readOnly: d,
        getStyle: g,
        addButtonElement: m,
        cancelButtonElement: f,
        editButtonElement: h,
        inputElementGenerator: b,
        textareaElementGenerator: y,
        minusMenuElement: x,
        plusMenuElement: v,
        beforeRemoveAction: S,
        beforeAddAction: w,
        beforeUpdateAction: E,
        logger: I,
        onSubmitValueParser: D
      }
    ));
    return /* @__PURE__ */ O.createElement("span", { className: "rejt-not-collapsed" }, /* @__PURE__ */ O.createElement("span", { className: "\
rejt-not-collapsed-delimiter", style: ce }, "{"), !ae && B, /* @__PURE__ */ O.createElement("ul", { className: "rejt-not-collapsed-list", style: ee },
    T), !ae && s && /* @__PURE__ */ O.createElement("div", { className: "rejt-add-form", style: W }, /* @__PURE__ */ O.createElement(
      pr,
      {
        handleAdd: this.handleAddValueAdd,
        handleCancel: this.handleAddValueCancel,
        addButtonElement: m,
        cancelButtonElement: f,
        inputElementGenerator: b,
        keyPath: o,
        deep: n,
        onSubmitValueParser: D
      }
    )), /* @__PURE__ */ O.createElement("span", { className: "rejt-not-collapsed-delimiter", style: ce }, "}"), !ae && R);
  }
  render() {
    let { name: t, collapsed: r, data: o, keyPath: n, deep: i } = this.state, { getStyle: s, dataType: l } = this.props, c = r ? this.renderCollapsed() :
    this.renderNotCollapsed(), u = s(t, o, n, i, l);
    return /* @__PURE__ */ O.createElement("div", { className: "rejt-object-node" }, /* @__PURE__ */ O.createElement("span", { onClick: this.
    handleCollapseMode }, /* @__PURE__ */ O.createElement("span", { className: "rejt-name", style: u.name }, t, " :", " ")), c);
  }
};
a(Qn, "JsonObject");
var ur = Qn;
ur.defaultProps = {
  keyPath: [],
  deep: 0,
  minusMenuElement: /* @__PURE__ */ O.createElement("span", null, " - "),
  plusMenuElement: /* @__PURE__ */ O.createElement("span", null, " + ")
};
var ea = class ea extends Ut {
  constructor(t) {
    super(t);
    let r = [...t.keyPath || [], t.name];
    this.state = {
      value: t.value,
      name: t.name,
      keyPath: r,
      deep: t.deep,
      editEnabled: !1,
      inputRef: null
    }, this.handleEditMode = this.handleEditMode.bind(this), this.refInput = this.refInput.bind(this), this.handleCancelEdit = this.handleCancelEdit.
    bind(this), this.handleEdit = this.handleEdit.bind(this), this.onKeydown = this.onKeydown.bind(this);
  }
  static getDerivedStateFromProps(t, r) {
    return t.value !== r.value ? { value: t.value } : null;
  }
  componentDidUpdate() {
    let { editEnabled: t, inputRef: r, name: o, value: n, keyPath: i, deep: s } = this.state, { readOnly: l, dataType: c } = this.props, u = l(
    o, n, i, s, c);
    t && !u && typeof r.focus == "function" && r.focus();
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
  }
  onKeydown(t) {
    let { inputRef: r } = this.state;
    t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || t.repeat || r !== t.target || ((t.code === "Enter" || t.key === "Enter") && (t.preventDefault(),
    this.handleEdit()), (t.code === "Escape" || t.key === "Escape") && (t.preventDefault(), this.handleCancelEdit()));
  }
  handleEdit() {
    let { handleUpdateValue: t, originalValue: r, logger: o, onSubmitValueParser: n, keyPath: i } = this.props, { inputRef: s, name: l, deep: c } = this.
    state;
    if (!s)
      return;
    let u = n(!0, i, c, l, s.value), d = {
      value: u,
      key: l
    };
    (t || Promise.resolve.bind(Promise))(d).then(() => {
      Jn(r, u) || this.handleCancelEdit();
    }).catch(o.error);
  }
  handleEditMode() {
    this.setState({
      editEnabled: !0
    });
  }
  refInput(t) {
    this.state.inputRef = t;
  }
  handleCancelEdit() {
    this.setState({
      editEnabled: !1
    });
  }
  render() {
    let { name: t, value: r, editEnabled: o, keyPath: n, deep: i } = this.state, {
      handleRemove: s,
      originalValue: l,
      readOnly: c,
      dataType: u,
      getStyle: d,
      editButtonElement: g,
      cancelButtonElement: p,
      inputElementGenerator: m,
      minusMenuElement: f,
      keyPath: h
    } = this.props, b = d(t, l, n, i, u), y = c(t, l, n, i, u), x = o && !y, v = m(
      co,
      h,
      i,
      t,
      l,
      u
    ), S = g && ie(g, {
      onClick: this.handleEdit
    }), w = p && ie(p, {
      onClick: this.handleCancelEdit
    }), E = ie(v, {
      ref: this.refInput,
      defaultValue: JSON.stringify(l)
    }), I = f && ie(f, {
      onClick: s,
      className: "rejt-minus-menu",
      style: b.minus
    });
    return /* @__PURE__ */ O.createElement("li", { className: "rejt-value-node", style: b.li }, /* @__PURE__ */ O.createElement("span", { className: "\
rejt-name", style: b.name }, t, " : "), x ? /* @__PURE__ */ O.createElement("span", { className: "rejt-edit-form", style: b.editForm }, E, "\
 ", w, S) : /* @__PURE__ */ O.createElement(
      "span",
      {
        className: "rejt-value",
        style: b.value,
        onClick: y ? void 0 : this.handleEditMode
      },
      String(r)
    ), !y && !x && I);
  }
};
a(ea, "JsonValue");
var Ue = ea;
Ue.defaultProps = {
  keyPath: [],
  deep: 0,
  handleUpdateValue: /* @__PURE__ */ a(() => Promise.resolve(), "handleUpdateValue"),
  editButtonElement: /* @__PURE__ */ O.createElement("button", null, "e"),
  cancelButtonElement: /* @__PURE__ */ O.createElement("button", null, "c"),
  minusMenuElement: /* @__PURE__ */ O.createElement("span", null, " - ")
};

// ../addons/docs/src/blocks/controls/react-editable-json-tree/utils/parse.ts
function Kl(e) {
  let t = e;
  if (t.indexOf("function") === 0)
    return (0, eval)(`(${t})`);
  try {
    t = JSON.parse(e);
  } catch {
  }
  return t;
}
a(Kl, "parse");

// ../addons/docs/src/blocks/controls/react-editable-json-tree/utils/styles.ts
var Yl = {
  minus: {
    color: "red"
  },
  plus: {
    color: "green"
  },
  collapsed: {
    color: "grey"
  },
  delimiter: {},
  ul: {
    padding: "0px",
    margin: "0 0 0 25px",
    listStyle: "none"
  },
  name: {
    color: "#2287CD"
  },
  addForm: {}
}, Xl = {
  minus: {
    color: "red"
  },
  plus: {
    color: "green"
  },
  collapsed: {
    color: "grey"
  },
  delimiter: {},
  ul: {
    padding: "0px",
    margin: "0 0 0 25px",
    listStyle: "none"
  },
  name: {
    color: "#2287CD"
  },
  addForm: {}
}, Zl = {
  minus: {
    color: "red"
  },
  editForm: {},
  value: {
    color: "#7bba3d"
  },
  li: {
    minHeight: "22px",
    lineHeight: "22px",
    outline: "0px"
  },
  name: {
    color: "#2287CD"
  }
};

// ../addons/docs/src/blocks/controls/react-editable-json-tree/index.tsx
var ta = class ta extends Sh {
  constructor(t) {
    super(t), this.state = {
      data: t.data,
      rootName: t.rootName
    }, this.onUpdate = this.onUpdate.bind(this), this.removeRoot = this.removeRoot.bind(this);
  }
  static getDerivedStateFromProps(t, r) {
    return t.data !== r.data || t.rootName !== r.rootName ? {
      data: t.data,
      rootName: t.rootName
    } : null;
  }
  onUpdate(t, r) {
    this.setState({ data: r }), this.props.onFullyUpdate?.(r);
  }
  removeRoot() {
    this.onUpdate(null, null);
  }
  render() {
    let { data: t, rootName: r } = this.state, {
      isCollapsed: o,
      onDeltaUpdate: n,
      readOnly: i,
      getStyle: s,
      addButtonElement: l,
      cancelButtonElement: c,
      editButtonElement: u,
      inputElement: d,
      textareaElement: g,
      minusMenuElement: p,
      plusMenuElement: m,
      beforeRemoveAction: f,
      beforeAddAction: h,
      beforeUpdateAction: b,
      logger: y,
      onSubmitValueParser: x,
      fallback: v = null
    } = this.props, S = Ze(t), w = i;
    Ze(i) === "Boolean" && (w = /* @__PURE__ */ a(() => i, "readOnlyFunction"));
    let E = d;
    d && Ze(d) !== "Function" && (E = /* @__PURE__ */ a(() => d, "inputElementFunction"));
    let I = g;
    return g && Ze(g) !== "Function" && (I = /* @__PURE__ */ a(() => g, "textareaElementFunction")), S === "Object" || S === "Array" ? /* @__PURE__ */ fo.
    createElement("div", { className: "rejt-tree" }, /* @__PURE__ */ fo.createElement(
      kt,
      {
        data: t,
        name: r || "root",
        deep: -1,
        isCollapsed: o ?? (() => !1),
        onUpdate: this.onUpdate,
        onDeltaUpdate: n ?? (() => {
        }),
        readOnly: w,
        getStyle: s ?? (() => ({})),
        addButtonElement: l,
        cancelButtonElement: c,
        editButtonElement: u,
        inputElementGenerator: E,
        textareaElementGenerator: I,
        minusMenuElement: p,
        plusMenuElement: m,
        handleRemove: this.removeRoot,
        beforeRemoveAction: f,
        beforeAddAction: h,
        beforeUpdateAction: b,
        logger: y ?? {},
        onSubmitValueParser: x ?? ((D) => D)
      }
    )) : v;
  }
};
a(ta, "JsonTree");
var dr = ta;
dr.defaultProps = {
  rootName: "root",
  isCollapsed: /* @__PURE__ */ a((e, t) => t !== -1, "isCollapsed"),
  getStyle: /* @__PURE__ */ a((e, t, r, o, n) => {
    switch (n) {
      case "Object":
      case "Error":
        return Yl;
      case "Array":
        return Xl;
      default:
        return Zl;
    }
  }, "getStyle"),
  readOnly: /* @__PURE__ */ a(() => !1, "readOnly"),
  onFullyUpdate: /* @__PURE__ */ a(() => {
  }, "onFullyUpdate"),
  onDeltaUpdate: /* @__PURE__ */ a(() => {
  }, "onDeltaUpdate"),
  beforeRemoveAction: /* @__PURE__ */ a(() => Promise.resolve(), "beforeRemoveAction"),
  beforeAddAction: /* @__PURE__ */ a(() => Promise.resolve(), "beforeAddAction"),
  beforeUpdateAction: /* @__PURE__ */ a(() => Promise.resolve(), "beforeUpdateAction"),
  logger: { error: /* @__PURE__ */ a(() => {
  }, "error") },
  onSubmitValueParser: /* @__PURE__ */ a((e, t, r, o, n) => Kl(n), "onSubmitValueParser"),
  inputElement: /* @__PURE__ */ a(() => /* @__PURE__ */ fo.createElement("input", null), "inputElement"),
  textareaElement: /* @__PURE__ */ a(() => /* @__PURE__ */ fo.createElement("textarea", null), "textareaElement"),
  fallback: null
};

// ../addons/docs/src/blocks/controls/Object.tsx
var { window: Dh } = globalThis, Bh = Ot.div(({ theme: e }) => ({
  position: "relative",
  display: "flex",
  '&[aria-readonly="true"]': {
    opacity: 0.5
  },
  ".rejt-tree": {
    marginLeft: "1rem",
    fontSize: "13px"
  },
  ".rejt-value-node, .rejt-object-node > .rejt-collapsed, .rejt-array-node > .rejt-collapsed, .rejt-object-node > .rejt-not-collapsed, .rejt\
-array-node > .rejt-not-collapsed": {
    "& > svg": {
      opacity: 0,
      transition: "opacity 0.2s"
    }
  },
  ".rejt-value-node:hover, .rejt-object-node:hover > .rejt-collapsed, .rejt-array-node:hover > .rejt-collapsed, .rejt-object-node:hover > .r\
ejt-not-collapsed, .rejt-array-node:hover > .rejt-not-collapsed": {
    "& > svg": {
      opacity: 1
    }
  },
  ".rejt-edit-form button": {
    display: "none"
  },
  ".rejt-add-form": {
    marginLeft: 10
  },
  ".rejt-add-value-node": {
    display: "inline-flex",
    alignItems: "center"
  },
  ".rejt-name": {
    lineHeight: "22px"
  },
  ".rejt-not-collapsed-delimiter": {
    lineHeight: "22px"
  },
  ".rejt-plus-menu": {
    marginLeft: 5
  },
  ".rejt-object-node > span > *, .rejt-array-node > span > *": {
    position: "relative",
    zIndex: 2
  },
  ".rejt-object-node, .rejt-array-node": {
    position: "relative"
  },
  ".rejt-object-node > span:first-of-type::after, .rejt-array-node > span:first-of-type::after, .rejt-collapsed::before, .rejt-not-collapsed\
::before": {
    content: '""',
    position: "absolute",
    top: 0,
    display: "block",
    width: "100%",
    marginLeft: "-1rem",
    padding: "0 4px 0 1rem",
    height: 22
  },
  ".rejt-collapsed::before, .rejt-not-collapsed::before": {
    zIndex: 1,
    background: "transparent",
    borderRadius: 4,
    transition: "background 0.2s",
    pointerEvents: "none",
    opacity: 0.1
  },
  ".rejt-object-node:hover, .rejt-array-node:hover": {
    "& > .rejt-collapsed::before, & > .rejt-not-collapsed::before": {
      background: e.color.secondary
    }
  },
  ".rejt-collapsed::after, .rejt-not-collapsed::after": {
    content: '""',
    position: "absolute",
    display: "inline-block",
    pointerEvents: "none",
    width: 0,
    height: 0
  },
  ".rejt-collapsed::after": {
    left: -8,
    top: 8,
    borderTop: "3px solid transparent",
    borderBottom: "3px solid transparent",
    borderLeft: "3px solid rgba(153,153,153,0.6)"
  },
  ".rejt-not-collapsed::after": {
    left: -10,
    top: 10,
    borderTop: "3px solid rgba(153,153,153,0.6)",
    borderLeft: "3px solid transparent",
    borderRight: "3px solid transparent"
  },
  ".rejt-value": {
    display: "inline-block",
    border: "1px solid transparent",
    borderRadius: 4,
    margin: "1px 0",
    padding: "0 4px",
    cursor: "text",
    color: e.color.defaultText
  },
  ".rejt-value-node:hover > .rejt-value": {
    background: e.color.lighter,
    borderColor: e.appBorderColor
  }
})), oa = Ot.button(({ theme: e, primary: t }) => ({
  border: 0,
  height: 20,
  margin: 1,
  borderRadius: 4,
  background: t ? e.color.secondary : "transparent",
  color: t ? e.color.lightest : e.color.dark,
  fontWeight: t ? "bold" : "normal",
  cursor: "pointer",
  order: t ? "initial" : 9
})), Mh = Ot(Ih)(({ theme: e, disabled: t }) => ({
  display: "inline-block",
  verticalAlign: "middle",
  width: 15,
  height: 15,
  padding: 3,
  marginLeft: 5,
  cursor: t ? "not-allowed" : "pointer",
  color: e.textMutedColor,
  "&:hover": t ? {} : { color: e.color.ancillary },
  "svg + &": {
    marginLeft: 0
  }
})), Fh = Ot(Nh)(({ theme: e, disabled: t }) => ({
  display: "inline-block",
  verticalAlign: "middle",
  width: 15,
  height: 15,
  padding: 3,
  marginLeft: 5,
  cursor: t ? "not-allowed" : "pointer",
  color: e.textMutedColor,
  "&:hover": t ? {} : { color: e.color.negative },
  "svg + &": {
    marginLeft: 0
  }
})), ec = Ot.input(({ theme: e, placeholder: t }) => ({
  outline: 0,
  margin: t ? 1 : "1px 0",
  padding: "3px 4px",
  color: e.color.defaultText,
  background: e.background.app,
  border: `1px solid ${e.appBorderColor}`,
  borderRadius: 4,
  lineHeight: "14px",
  width: t === "Key" ? 80 : 120,
  "&:focus": {
    border: `1px solid ${e.color.secondary}`
  }
})), jh = Ot(Oh)(({ theme: e }) => ({
  position: "absolute",
  zIndex: 2,
  top: 2,
  right: 2,
  height: 21,
  padding: "0 3px",
  background: e.background.bar,
  border: `1px solid ${e.appBorderColor}`,
  borderRadius: 3,
  color: e.textMutedColor,
  fontSize: "9px",
  fontWeight: "bold",
  textDecoration: "none",
  span: {
    marginLeft: 3,
    marginTop: 1
  }
})), Rh = Ot(kh.Textarea)(({ theme: e }) => ({
  flex: 1,
  padding: "7px 6px",
  fontFamily: e.typography.fonts.mono,
  fontSize: "12px",
  lineHeight: "18px",
  "&::placeholder": {
    fontFamily: e.typography.fonts.base,
    fontSize: "13px"
  },
  "&:placeholder-shown": {
    padding: "7px 10px"
  }
})), Hh = { bubbles: !0, cancelable: !0, key: "Enter", code: "Enter", keyCode: 13 }, Vh = /* @__PURE__ */ a((e) => {
  e.currentTarget.dispatchEvent(new Dh.KeyboardEvent("keydown", Hh));
}, "dispatchEnterKey"), zh = /* @__PURE__ */ a((e) => {
  e.currentTarget.select();
}, "selectValue"), $h = /* @__PURE__ */ a((e) => () => ({
  name: {
    color: e.color.secondary
  },
  collapsed: {
    color: e.color.dark
  },
  ul: {
    listStyle: "none",
    margin: "0 0 0 1rem",
    padding: 0
  },
  li: {
    outline: 0
  }
}), "getCustomStyleFunction"), na = /* @__PURE__ */ a(({ name: e, value: t, onChange: r, argType: o }) => {
  let n = _h(), i = wh(() => t && gn(t), [t]), s = i != null, [l, c] = ra(!s), [u, d] = ra(null), g = !!o?.table?.readonly, p = Ql(
    (v) => {
      try {
        v && r(JSON.parse(v)), d(null);
      } catch (S) {
        d(S);
      }
    },
    [r]
  ), [m, f] = ra(!1), h = Ql(() => {
    r({}), f(!0);
  }, [f]), b = Th(null);
  if (Ch(() => {
    m && b.current && b.current.select();
  }, [m]), !s)
    return /* @__PURE__ */ be.createElement(Ah, { disabled: g, id: ct(e), onClick: h }, "Set object");
  let y = /* @__PURE__ */ be.createElement(
    Rh,
    {
      ref: b,
      id: Z(e),
      name: e,
      defaultValue: t === null ? "" : JSON.stringify(t, null, 2),
      onBlur: (v) => p(v.target.value),
      placeholder: "Edit JSON string...",
      autoFocus: m,
      valid: u ? "error" : void 0,
      readOnly: g
    }
  ), x = Array.isArray(t) || typeof t == "object" && t?.constructor === Object;
  return /* @__PURE__ */ be.createElement(Bh, { "aria-readonly": g }, x && /* @__PURE__ */ be.createElement(
    jh,
    {
      onClick: (v) => {
        v.preventDefault(), c((S) => !S);
      }
    },
    l ? /* @__PURE__ */ be.createElement(Ph, null) : /* @__PURE__ */ be.createElement(Lh, null),
    /* @__PURE__ */ be.createElement("span", null, "RAW")
  ), l ? y : /* @__PURE__ */ be.createElement(
    dr,
    {
      readOnly: g || !x,
      isCollapsed: x ? (
        /* default value */
        void 0
      ) : () => !0,
      data: i,
      rootName: e,
      onFullyUpdate: r,
      getStyle: $h(n),
      cancelButtonElement: /* @__PURE__ */ be.createElement(oa, { type: "button" }, "Cancel"),
      editButtonElement: /* @__PURE__ */ be.createElement(oa, { type: "submit" }, "Save"),
      addButtonElement: /* @__PURE__ */ be.createElement(oa, { type: "submit", primary: !0 }, "Save"),
      plusMenuElement: /* @__PURE__ */ be.createElement(Mh, null),
      minusMenuElement: /* @__PURE__ */ be.createElement(Fh, null),
      inputElement: (v, S, w, E) => E ? /* @__PURE__ */ be.createElement(ec, { onFocus: zh, onBlur: Vh }) : /* @__PURE__ */ be.createElement(
      ec, null),
      fallback: y
    }
  ));
}, "ObjectControl");

// ../addons/docs/src/blocks/controls/Range.tsx
import mo, { useMemo as Uh } from "react";
import { styled as go } from "storybook/theming";
Ne();
var qh = go.input(
  ({ theme: e, min: t, max: r, value: o, disabled: n }) => ({
    // Resytled using http://danielstern.ca/range.css/#/
    "&": {
      width: "100%",
      backgroundColor: "transparent",
      appearance: "none"
    },
    "&::-webkit-slider-runnable-track": {
      background: e.base === "light" ? `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${(o - t) / (r - t) * 100}%, 
            ${Le(0.02, e.input.background)} ${(o - t) / (r - t) * 100}%, 
            ${Le(0.02, e.input.background)} 100%)` : `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${(o - t) / (r - t) * 100}%, 
            ${Ke(0.02, e.input.background)} ${(o - t) / (r - t) * 100}%, 
            ${Ke(0.02, e.input.background)} 100%)`,
      boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
      borderRadius: 6,
      width: "100%",
      height: 6,
      cursor: n ? "not-allowed" : "pointer"
    },
    "&::-webkit-slider-thumb": {
      marginTop: "-6px",
      width: 16,
      height: 16,
      border: `1px solid ${Me(e.appBorderColor, 0.2)}`,
      borderRadius: "50px",
      boxShadow: `0 1px 3px 0px ${Me(e.appBorderColor, 0.2)}`,
      cursor: n ? "not-allowed" : "grab",
      appearance: "none",
      background: `${e.input.background}`,
      transition: "all 150ms ease-out",
      "&:hover": {
        background: `${Le(0.05, e.input.background)}`,
        transform: "scale3d(1.1, 1.1, 1.1) translateY(-1px)",
        transition: "all 50ms ease-out"
      },
      "&:active": {
        background: `${e.input.background}`,
        transform: "scale3d(1, 1, 1) translateY(0px)",
        cursor: n ? "not-allowed" : "grab"
      }
    },
    "&:focus": {
      outline: "none",
      "&::-webkit-slider-runnable-track": {
        borderColor: Me(e.color.secondary, 0.4)
      },
      "&::-webkit-slider-thumb": {
        borderColor: e.color.secondary,
        boxShadow: `0 0px 5px 0px ${e.color.secondary}`
      }
    },
    "&::-moz-range-track": {
      background: e.base === "light" ? `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${(o - t) / (r - t) * 100}%, 
            ${Le(0.02, e.input.background)} ${(o - t) / (r - t) * 100}%, 
            ${Le(0.02, e.input.background)} 100%)` : `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${(o - t) / (r - t) * 100}%, 
            ${Ke(0.02, e.input.background)} ${(o - t) / (r - t) * 100}%, 
            ${Ke(0.02, e.input.background)} 100%)`,
      boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
      borderRadius: 6,
      width: "100%",
      height: 6,
      cursor: n ? "not-allowed" : "pointer",
      outline: "none"
    },
    "&::-moz-range-thumb": {
      width: 16,
      height: 16,
      border: `1px solid ${Me(e.appBorderColor, 0.2)}`,
      borderRadius: "50px",
      boxShadow: `0 1px 3px 0px ${Me(e.appBorderColor, 0.2)}`,
      cursor: n ? "not-allowed" : "grap",
      background: `${e.input.background}`,
      transition: "all 150ms ease-out",
      "&:hover": {
        background: `${Le(0.05, e.input.background)}`,
        transform: "scale3d(1.1, 1.1, 1.1) translateY(-1px)",
        transition: "all 50ms ease-out"
      },
      "&:active": {
        background: `${e.input.background}`,
        transform: "scale3d(1, 1, 1) translateY(0px)",
        cursor: "grabbing"
      }
    },
    "&::-ms-track": {
      background: e.base === "light" ? `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${(o - t) / (r - t) * 100}%, 
            ${Le(0.02, e.input.background)} ${(o - t) / (r - t) * 100}%, 
            ${Le(0.02, e.input.background)} 100%)` : `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${(o - t) / (r - t) * 100}%, 
            ${Ke(0.02, e.input.background)} ${(o - t) / (r - t) * 100}%, 
            ${Ke(0.02, e.input.background)} 100%)`,
      boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
      color: "transparent",
      width: "100%",
      height: "6px",
      cursor: "pointer"
    },
    "&::-ms-fill-lower": {
      borderRadius: 6
    },
    "&::-ms-fill-upper": {
      borderRadius: 6
    },
    "&::-ms-thumb": {
      width: 16,
      height: 16,
      background: `${e.input.background}`,
      border: `1px solid ${Me(e.appBorderColor, 0.2)}`,
      borderRadius: 50,
      cursor: "grab",
      marginTop: 0
    },
    "@supports (-ms-ime-align:auto)": { "input[type=range]": { margin: "0" } }
  })
), tc = go.span({
  paddingLeft: 5,
  paddingRight: 5,
  fontSize: 12,
  whiteSpace: "nowrap",
  fontFeatureSettings: "tnum",
  fontVariantNumeric: "tabular-nums",
  "[aria-readonly=true] &": {
    opacity: 0.5
  }
}), Wh = go(tc)(({ numberOFDecimalsPlaces: e, max: t }) => ({
  // Fixed width of "current / max" label to avoid slider width changes
  // 3 = size of separator " / "
  width: `${e + t.toString().length * 2 + 3}ch`,
  textAlign: "right",
  flexShrink: 0
})), Gh = go.div({
  display: "flex",
  alignItems: "center",
  width: "100%"
});
function Jh(e) {
  let t = e.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return t ? Math.max(
    0,
    // Number of digits right of decimal point.
    (t[1] ? t[1].length : 0) - // Adjust for scientific notation.
    (t[2] ? +t[2] : 0)
  ) : 0;
}
a(Jh, "getNumberOfDecimalPlaces");
var rc = /* @__PURE__ */ a(({
  name: e,
  value: t,
  onChange: r,
  min: o = 0,
  max: n = 100,
  step: i = 1,
  onBlur: s,
  onFocus: l,
  argType: c
}) => {
  let u = /* @__PURE__ */ a((m) => {
    r(Il(m.target.value));
  }, "handleChange"), d = t !== void 0, g = Uh(() => Jh(i), [i]), p = !!c?.table?.readonly;
  return /* @__PURE__ */ mo.createElement(Gh, { "aria-readonly": p }, /* @__PURE__ */ mo.createElement(tc, null, o), /* @__PURE__ */ mo.createElement(
    qh,
    {
      id: Z(e),
      type: "range",
      disabled: p,
      onChange: u,
      name: e,
      min: o,
      max: n,
      step: i,
      onFocus: l,
      onBlur: s,
      value: t ?? o
    }
  ), /* @__PURE__ */ mo.createElement(Wh, { numberOFDecimalsPlaces: g, max: n }, d ? t.toFixed(g) : "--", " / ", n));
}, "RangeControl");

// ../addons/docs/src/blocks/controls/Text.tsx
Ne();
import ho, { useCallback as Kh, useState as Yh } from "react";
import { Button as Xh, Form as Zh } from "storybook/internal/components";
import { styled as oc } from "storybook/theming";
var Qh = oc.label({
  display: "flex"
}), eb = oc.div(({ isMaxed: e }) => ({
  marginLeft: "0.75rem",
  paddingTop: "0.35rem",
  color: e ? "red" : void 0
})), nc = /* @__PURE__ */ a(({
  name: e,
  value: t,
  onChange: r,
  onFocus: o,
  onBlur: n,
  maxLength: i,
  argType: s
}) => {
  let l = /* @__PURE__ */ a((m) => {
    r(m.target.value);
  }, "handleChange"), c = !!s?.table?.readonly, [u, d] = Yh(!1), g = Kh(() => {
    r(""), d(!0);
  }, [d]);
  if (t === void 0)
    return /* @__PURE__ */ ho.createElement(
      Xh,
      {
        variant: "outline",
        size: "medium",
        disabled: c,
        id: ct(e),
        onClick: g
      },
      "Set string"
    );
  let p = typeof t == "string";
  return /* @__PURE__ */ ho.createElement(Qh, null, /* @__PURE__ */ ho.createElement(
    Zh.Textarea,
    {
      id: Z(e),
      maxLength: i,
      onChange: l,
      disabled: c,
      size: "flex",
      placeholder: "Edit string...",
      autoFocus: u,
      valid: p ? void 0 : "error",
      name: e,
      value: p ? t : "",
      onFocus: o,
      onBlur: n
    }
  ), i && /* @__PURE__ */ ho.createElement(eb, { isMaxed: t?.length === i }, t?.length ?? 0, " / ", i));
}, "TextControl");

// ../addons/docs/src/blocks/controls/Files.tsx
Ne();
import tb, { useEffect as rb, useRef as ob } from "react";
import { Form as nb } from "storybook/internal/components";
import { styled as ab } from "storybook/theming";
var ib = ab(nb.Input)({
  padding: 10
});
function sb(e) {
  e.forEach((t) => {
    t.startsWith("blob:") && URL.revokeObjectURL(t);
  });
}
a(sb, "revokeOldUrls");
var ac = /* @__PURE__ */ a(({
  onChange: e,
  name: t,
  accept: r = "image/*",
  value: o,
  argType: n
}) => {
  let i = ob(null), s = n?.control?.readOnly;
  function l(c) {
    if (!c.target.files)
      return;
    let u = Array.from(c.target.files).map((d) => URL.createObjectURL(d));
    e(u), sb(o || []);
  }
  return a(l, "handleFileChange"), rb(() => {
    o == null && i.current && (i.current.value = "");
  }, [o, t]), /* @__PURE__ */ tb.createElement(
    ib,
    {
      ref: i,
      id: Z(t),
      type: "file",
      name: t,
      multiple: !0,
      disabled: s,
      onChange: l,
      accept: r,
      size: "flex"
    }
  );
}, "FilesControl");

// ../addons/docs/src/blocks/controls/index.tsx
var py = cy(() => Promise.resolve().then(() => (Rc(), jc))), Hc = /* @__PURE__ */ a((e) => /* @__PURE__ */ ha.createElement(ly, { fallback: /* @__PURE__ */ ha.
createElement("div", null) }, /* @__PURE__ */ ha.createElement(py, { ...e })), "ColorControl");

// ../addons/docs/src/blocks/components/ArgsTable/ArgControl.tsx
var fy = {
  array: na,
  object: na,
  boolean: El,
  color: Hc,
  date: Tl,
  number: Pl,
  check: At,
  "inline-check": At,
  radio: At,
  "inline-radio": At,
  select: At,
  "multi-select": At,
  range: rc,
  text: nc,
  file: ac
}, zc = /* @__PURE__ */ a(() => /* @__PURE__ */ hr.createElement(hr.Fragment, null, "-"), "NoControl"), $c = /* @__PURE__ */ a(({ row: e, arg: t,
updateArgs: r, isHovered: o }) => {
  let { key: n, control: i } = e, [s, l] = Vc(!1), [c, u] = Vc({ value: t });
  uy(() => {
    s || u({ value: t });
  }, [s, t]);
  let d = ba(
    (h) => (u({ value: h }), r({ [n]: h }), h),
    [r, n]
  ), g = ba(() => l(!1), []), p = ba(() => l(!0), []);
  if (!i || i.disable) {
    let h = i?.disable !== !0 && e?.type?.name !== "function";
    return o && h ? /* @__PURE__ */ hr.createElement(dy, { href: "https://storybook.js.org/docs/essentials/controls", target: "_blank", withArrow: !0 },
    "Setup controls") : /* @__PURE__ */ hr.createElement(zc, null);
  }
  let m = { name: n, argType: e, value: c.value, onChange: d, onBlur: g, onFocus: p }, f = fy[i.type] || zc;
  return /* @__PURE__ */ hr.createElement(f, { ...m, ...i, controlType: i.type });
}, "ArgControl");

// ../addons/docs/src/blocks/components/ArgsTable/ArgJsDoc.tsx
import ye from "react";
import { codeCommon as my } from "storybook/internal/components";
import { styled as gy } from "storybook/theming";
var hy = gy.table(({ theme: e }) => ({
  "&&": {
    // Escape default table styles
    borderCollapse: "collapse",
    borderSpacing: 0,
    border: "none",
    tr: {
      border: "none !important",
      background: "none"
    },
    "td, th": {
      padding: 0,
      border: "none",
      width: "auto!important"
    },
    // End escape
    marginTop: 0,
    marginBottom: 0,
    "th:first-of-type, td:first-of-type": {
      paddingLeft: 0
    },
    "th:last-of-type, td:last-of-type": {
      paddingRight: 0
    },
    td: {
      paddingTop: 0,
      paddingBottom: 4,
      "&:not(:first-of-type)": {
        paddingLeft: 10,
        paddingRight: 0
      }
    },
    tbody: {
      boxShadow: "none",
      border: "none"
    },
    code: my({ theme: e }),
    div: {
      span: {
        fontWeight: "bold"
      }
    },
    "& code": {
      margin: 0,
      display: "inline-block",
      fontSize: e.typography.size.s1
    }
  }
})), Uc = /* @__PURE__ */ a(({ tags: e }) => {
  let t = (e.params || []).filter((i) => i.description), r = t.length !== 0, o = e.deprecated != null, n = e.returns != null && e.returns.description !=
  null;
  return !r && !n && !o ? null : /* @__PURE__ */ ye.createElement(ye.Fragment, null, /* @__PURE__ */ ye.createElement(hy, null, /* @__PURE__ */ ye.
  createElement("tbody", null, o && /* @__PURE__ */ ye.createElement("tr", { key: "deprecated" }, /* @__PURE__ */ ye.createElement("td", { colSpan: 2 },
  /* @__PURE__ */ ye.createElement("strong", null, "Deprecated"), ": ", e.deprecated?.toString())), r && t.map((i) => /* @__PURE__ */ ye.createElement(
  "tr", { key: i.name }, /* @__PURE__ */ ye.createElement("td", null, /* @__PURE__ */ ye.createElement("code", null, i.name)), /* @__PURE__ */ ye.
  createElement("td", null, i.description))), n && /* @__PURE__ */ ye.createElement("tr", { key: "returns" }, /* @__PURE__ */ ye.createElement(
  "td", null, /* @__PURE__ */ ye.createElement("code", null, "Returns")), /* @__PURE__ */ ye.createElement("td", null, e.returns?.description)))));
}, "ArgJsDoc");

// ../addons/docs/src/blocks/components/ArgsTable/ArgValue.tsx
or();
var Xc = Ce(Wc());
import de, { useState as Gc } from "react";
import { SyntaxHighlighter as by, WithTooltipPure as yy, codeCommon as Yc } from "storybook/internal/components";
import { ChevronSmallDownIcon as xy, ChevronSmallUpIcon as vy } from "@storybook/icons";
import { styled as Pt } from "storybook/theming";
var xa = 8, Jc = Pt.div(({ isExpanded: e }) => ({
  display: "flex",
  flexDirection: e ? "column" : "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
  marginBottom: "-4px",
  minWidth: 100
})), Ey = Pt.span(Yc, ({ theme: e, simple: t = !1 }) => ({
  flex: "0 0 auto",
  fontFamily: e.typography.fonts.mono,
  fontSize: e.typography.size.s1,
  wordBreak: "break-word",
  whiteSpace: "normal",
  maxWidth: "100%",
  margin: 0,
  marginRight: "4px",
  marginBottom: "4px",
  paddingTop: "2px",
  paddingBottom: "2px",
  lineHeight: "13px",
  ...t && {
    background: "transparent",
    border: "0 none",
    paddingLeft: 0
  }
})), Sy = Pt.button(({ theme: e }) => ({
  fontFamily: e.typography.fonts.mono,
  color: e.color.secondary,
  marginBottom: "4px",
  background: "none",
  border: "none"
})), Cy = Pt.div(Yc, ({ theme: e }) => ({
  fontFamily: e.typography.fonts.mono,
  color: e.color.secondary,
  fontSize: e.typography.size.s1,
  // overrides codeCommon
  margin: 0,
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center"
})), wy = Pt.div(({ theme: e, width: t }) => ({
  width: t,
  minWidth: 200,
  maxWidth: 800,
  padding: 15,
  // Don't remove the mono fontFamily here even if it seems useless, this is used by the browser to calculate the length of a "ch" unit.
  fontFamily: e.typography.fonts.mono,
  fontSize: e.typography.size.s1,
  // Most custom stylesheet will reset the box-sizing to "border-box" and will break the tooltip.
  boxSizing: "content-box",
  "& code": {
    padding: "0 !important"
  }
})), Ty = Pt(vy)({
  marginLeft: 4
}), Ay = Pt(xy)({
  marginLeft: 4
}), ky = /* @__PURE__ */ a(() => /* @__PURE__ */ de.createElement("span", null, "-"), "EmptyArg"), Zc = /* @__PURE__ */ a(({ text: e, simple: t }) => /* @__PURE__ */ de.
createElement(Ey, { simple: t }, e), "ArgText"), Oy = (0, Xc.default)(1e3)((e) => {
  let t = e.split(/\r?\n/);
  return `${Math.max(...t.map((r) => r.length))}ch`;
}), Iy = /* @__PURE__ */ a((e) => {
  if (!e)
    return [e];
  let r = e.split("|").map((o) => o.trim());
  return hn(r);
}, "getSummaryItems"), Kc = /* @__PURE__ */ a((e, t = !0) => {
  let r = e;
  return t || (r = e.slice(0, xa)), r.map((o) => /* @__PURE__ */ de.createElement(Zc, { key: o, text: o === "" ? '""' : o }));
}, "renderSummaryItems"), Py = /* @__PURE__ */ a(({ value: e, initialExpandedArgs: t }) => {
  let { summary: r, detail: o } = e, [n, i] = Gc(!1), [s, l] = Gc(t || !1);
  if (r == null)
    return null;
  let c = typeof r.toString == "function" ? r.toString() : r;
  if (o == null) {
    if (/[(){}[\]<>]/.test(c))
      return /* @__PURE__ */ de.createElement(Zc, { text: c });
    let d = Iy(c), g = d.length;
    return g > xa ? /* @__PURE__ */ de.createElement(Jc, { isExpanded: s }, Kc(d, s), /* @__PURE__ */ de.createElement(Sy, { onClick: () => l(
    !s) }, s ? "Show less..." : `Show ${g - xa} more...`)) : /* @__PURE__ */ de.createElement(Jc, null, Kc(d));
  }
  return /* @__PURE__ */ de.createElement(
    yy,
    {
      closeOnOutsideClick: !0,
      placement: "bottom",
      visible: n,
      onVisibleChange: (u) => {
        i(u);
      },
      tooltip: /* @__PURE__ */ de.createElement(wy, { width: Oy(o) }, /* @__PURE__ */ de.createElement(by, { language: "jsx", format: !1 }, o))
    },
    /* @__PURE__ */ de.createElement(Cy, { className: "sbdocs-expandable" }, /* @__PURE__ */ de.createElement("span", null, c), n ? /* @__PURE__ */ de.
    createElement(Ty, null) : /* @__PURE__ */ de.createElement(Ay, null))
  );
}, "ArgSummary"), To = /* @__PURE__ */ a(({ value: e, initialExpandedArgs: t }) => e == null ? /* @__PURE__ */ de.createElement(ky, null) : /* @__PURE__ */ de.
createElement(Py, { value: e, initialExpandedArgs: t }), "ArgValue");

// ../addons/docs/src/blocks/components/ArgsTable/ArgRow.tsx
var _y = Jt.span({ fontWeight: "bold" }), Dy = Jt.span(({ theme: e }) => ({
  color: e.color.negative,
  fontFamily: e.typography.fonts.mono,
  cursor: "help"
})), By = Jt.div(({ theme: e }) => ({
  "&&": {
    p: {
      margin: "0 0 10px 0"
    },
    a: {
      color: e.color.secondary
    }
  },
  code: {
    ...Ny({ theme: e }),
    fontSize: 12,
    fontFamily: e.typography.fonts.mono
  },
  "& code": {
    margin: 0,
    display: "inline-block"
  },
  "& pre > code": {
    whiteSpace: "pre-wrap"
  }
})), My = Jt.div(({ theme: e, hasDescription: t }) => ({
  color: e.base === "light" ? F(0.1, e.color.defaultText) : F(0.2, e.color.defaultText),
  marginTop: t ? 4 : 0
})), Fy = Jt.div(({ theme: e, hasDescription: t }) => ({
  color: e.base === "light" ? F(0.1, e.color.defaultText) : F(0.2, e.color.defaultText),
  marginTop: t ? 12 : 0,
  marginBottom: 12
})), jy = Jt.td(({ expandable: e }) => ({
  paddingLeft: e ? "40px !important" : "20px !important"
})), Ry = /* @__PURE__ */ a((e) => e && { summary: typeof e == "string" ? e : e.name }, "toSummary"), br = /* @__PURE__ */ a((e) => {
  let [t, r] = Ly(!1), { row: o, updateArgs: n, compact: i, expandable: s, initialExpandedArgs: l } = e, { name: c, description: u } = o, d = o.
  table || {}, g = d.type || Ry(o.type), p = d.defaultValue || o.defaultValue, m = o.type?.required, f = u != null && u !== "";
  return /* @__PURE__ */ le.createElement("tr", { onMouseEnter: () => r(!0), onMouseLeave: () => r(!1) }, /* @__PURE__ */ le.createElement(jy,
  { expandable: s ?? !1 }, /* @__PURE__ */ le.createElement(_y, null, c), m ? /* @__PURE__ */ le.createElement(Dy, { title: "Required" }, "*") :
  null), i ? null : /* @__PURE__ */ le.createElement("td", null, f && /* @__PURE__ */ le.createElement(By, null, /* @__PURE__ */ le.createElement(
  vl, null, u)), d.jsDocTags != null ? /* @__PURE__ */ le.createElement(le.Fragment, null, /* @__PURE__ */ le.createElement(Fy, { hasDescription: f },
  /* @__PURE__ */ le.createElement(To, { value: g, initialExpandedArgs: l })), /* @__PURE__ */ le.createElement(Uc, { tags: d.jsDocTags })) :
  /* @__PURE__ */ le.createElement(My, { hasDescription: f }, /* @__PURE__ */ le.createElement(To, { value: g, initialExpandedArgs: l }))), i ?
  null : /* @__PURE__ */ le.createElement("td", null, /* @__PURE__ */ le.createElement(To, { value: p, initialExpandedArgs: l })), n ? /* @__PURE__ */ le.
  createElement("td", null, /* @__PURE__ */ le.createElement($c, { ...e, isHovered: t })) : null);
}, "ArgRow");

// ../addons/docs/src/blocks/components/ArgsTable/Empty.tsx
import Re, { useEffect as Hy, useState as Vy } from "react";
import { EmptyTabContent as zy, Link as Qc } from "storybook/internal/components";
import { DocumentIcon as ep } from "@storybook/icons";
import { styled as tp } from "storybook/theming";
var $y = tp.div(({ inAddonPanel: e, theme: t }) => ({
  height: e ? "100%" : "auto",
  display: "flex",
  border: e ? "none" : `1px solid ${t.appBorderColor}`,
  borderRadius: e ? 0 : t.appBorderRadius,
  padding: e ? 0 : 40,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: 15,
  background: t.background.content
})), Uy = tp.div(({ theme: e }) => ({
  display: "flex",
  fontSize: e.typography.size.s2 - 1,
  gap: 25
})), rp = /* @__PURE__ */ a(({ inAddonPanel: e }) => {
  let [t, r] = Vy(!0);
  return Hy(() => {
    let o = setTimeout(() => {
      r(!1);
    }, 100);
    return () => clearTimeout(o);
  }, []), t ? null : /* @__PURE__ */ Re.createElement($y, { inAddonPanel: e }, /* @__PURE__ */ Re.createElement(
    zy,
    {
      title: e ? "Interactive story playground" : "Args table with interactive controls couldn't be auto-generated",
      description: /* @__PURE__ */ Re.createElement(Re.Fragment, null, "Controls give you an easy to use interface to test your components. \
Set your story args and you'll see controls appearing here automatically."),
      footer: /* @__PURE__ */ Re.createElement(Uy, null, e && /* @__PURE__ */ Re.createElement(Re.Fragment, null, /* @__PURE__ */ Re.createElement(
        Qc,
        {
          href: "https://storybook.js.org/docs/essentials/controls",
          target: "_blank",
          withArrow: !0
        },
        /* @__PURE__ */ Re.createElement(ep, null),
        " Read docs"
      )), !e && /* @__PURE__ */ Re.createElement(
        Qc,
        {
          href: "https://storybook.js.org/docs/essentials/controls",
          target: "_blank",
          withArrow: !0
        },
        /* @__PURE__ */ Re.createElement(ep, null),
        " Learn how to set that up"
      ))
    }
  ));
}, "Empty");

// ../addons/docs/src/blocks/components/ArgsTable/SectionRow.tsx
import qe, { useState as qy } from "react";
import { ChevronDownIcon as Wy, ChevronRightIcon as Gy } from "@storybook/icons";
import { styled as dt } from "storybook/theming";
var Jy = dt(Wy)(({ theme: e }) => ({
  marginRight: 8,
  marginLeft: -10,
  marginTop: -2,
  // optical alignment
  height: 12,
  width: 12,
  color: e.base === "light" ? F(0.25, e.color.defaultText) : F(0.3, e.color.defaultText),
  border: "none",
  display: "inline-block"
})), Ky = dt(Gy)(({ theme: e }) => ({
  marginRight: 8,
  marginLeft: -10,
  marginTop: -2,
  // optical alignment
  height: 12,
  width: 12,
  color: e.base === "light" ? F(0.25, e.color.defaultText) : F(0.3, e.color.defaultText),
  border: "none",
  display: "inline-block"
})), Yy = dt.span(({ theme: e }) => ({
  display: "flex",
  lineHeight: "20px",
  alignItems: "center"
})), Xy = dt.td(({ theme: e }) => ({
  position: "relative",
  letterSpacing: "0.35em",
  textTransform: "uppercase",
  fontWeight: e.typography.weight.bold,
  fontSize: e.typography.size.s1 - 1,
  color: e.base === "light" ? F(0.4, e.color.defaultText) : F(0.6, e.color.defaultText),
  background: `${e.background.app} !important`,
  "& ~ td": {
    background: `${e.background.app} !important`
  }
})), Zy = dt.td(({ theme: e }) => ({
  position: "relative",
  fontWeight: e.typography.weight.bold,
  fontSize: e.typography.size.s2 - 1,
  background: e.background.app
})), Qy = dt.td({
  position: "relative"
}), e0 = dt.tr(({ theme: e }) => ({
  "&:hover > td": {
    backgroundColor: `${Ke(5e-3, e.background.app)} !important`,
    boxShadow: `${e.color.mediumlight} 0 - 1px 0 0 inset`,
    cursor: "row-resize"
  }
})), op = dt.button({
  // reset button style
  background: "none",
  border: "none",
  padding: "0",
  font: "inherit",
  // add custom style
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: "100%",
  width: "100%",
  color: "transparent",
  cursor: "row-resize !important"
}), Ao = /* @__PURE__ */ a(({
  level: e = "section",
  label: t,
  children: r,
  initialExpanded: o = !0,
  colSpan: n = 3
}) => {
  let [i, s] = qy(o), l = e === "subsection" ? Zy : Xy, c = r?.length || 0, u = e === "subsection" ? `${c} item${c !== 1 ? "s" : ""}` : "", d = `${i ?
  "Hide" : "Show"} ${e === "subsection" ? c : t} item${c !== 1 ? "s" : ""}`;
  return /* @__PURE__ */ qe.createElement(qe.Fragment, null, /* @__PURE__ */ qe.createElement(e0, { title: d }, /* @__PURE__ */ qe.createElement(
  l, { colSpan: 1 }, /* @__PURE__ */ qe.createElement(op, { onClick: (g) => s(!i), tabIndex: 0 }, d), /* @__PURE__ */ qe.createElement(Yy, null,
  i ? /* @__PURE__ */ qe.createElement(Jy, null) : /* @__PURE__ */ qe.createElement(Ky, null), t)), /* @__PURE__ */ qe.createElement(Qy, { colSpan: n -
  1 }, /* @__PURE__ */ qe.createElement(
    op,
    {
      onClick: (g) => s(!i),
      tabIndex: -1,
      style: { outline: "none" }
    },
    d
  ), i ? null : u)), i ? r : null);
}, "SectionRow");

// ../addons/docs/src/blocks/components/ArgsTable/Skeleton.tsx
import M from "react";
import { styled as Oo } from "storybook/theming";
var t0 = Oo.div(({ theme: e }) => ({
  width: "100%",
  borderSpacing: 0,
  color: e.color.defaultText
})), ko = Oo.div(({ theme: e }) => ({
  display: "flex",
  borderBottom: `1px solid ${e.appBorderColor}`,
  "&:last-child": {
    borderBottom: 0
  }
})), fe = Oo.div(
  ({ position: e, theme: t }) => {
    let r = {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      padding: "10px 15px",
      alignItems: "flex-start"
    };
    switch (e) {
      case "first":
        return {
          ...r,
          width: "25%",
          paddingLeft: 20
        };
      case "second":
        return {
          ...r,
          width: "35%"
        };
      case "third":
        return {
          ...r,
          width: "15%"
        };
      case "last":
        return {
          ...r,
          width: "25%",
          paddingRight: 20
        };
    }
  }
), re = Oo.div(
  ({ theme: e, width: t, height: r }) => ({
    animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
    background: e.appBorderColor,
    width: t || "100%",
    height: r || 16,
    borderRadius: 3
  })
), np = /* @__PURE__ */ a(() => /* @__PURE__ */ M.createElement(t0, null, /* @__PURE__ */ M.createElement(ko, null, /* @__PURE__ */ M.createElement(
fe, { position: "first" }, /* @__PURE__ */ M.createElement(re, { width: "60%" })), /* @__PURE__ */ M.createElement(fe, { position: "second" },
/* @__PURE__ */ M.createElement(re, { width: "30%" })), /* @__PURE__ */ M.createElement(fe, { position: "third" }, /* @__PURE__ */ M.createElement(
re, { width: "60%" })), /* @__PURE__ */ M.createElement(fe, { position: "last" }, /* @__PURE__ */ M.createElement(re, { width: "60%" }))), /* @__PURE__ */ M.
createElement(ko, null, /* @__PURE__ */ M.createElement(fe, { position: "first" }, /* @__PURE__ */ M.createElement(re, { width: "60%" })), /* @__PURE__ */ M.
createElement(fe, { position: "second" }, /* @__PURE__ */ M.createElement(re, { width: "80%" }), /* @__PURE__ */ M.createElement(re, { width: "\
30%" })), /* @__PURE__ */ M.createElement(fe, { position: "third" }, /* @__PURE__ */ M.createElement(re, { width: "60%" })), /* @__PURE__ */ M.
createElement(fe, { position: "last" }, /* @__PURE__ */ M.createElement(re, { width: "60%" }))), /* @__PURE__ */ M.createElement(ko, null, /* @__PURE__ */ M.
createElement(fe, { position: "first" }, /* @__PURE__ */ M.createElement(re, { width: "60%" })), /* @__PURE__ */ M.createElement(fe, { position: "\
second" }, /* @__PURE__ */ M.createElement(re, { width: "80%" }), /* @__PURE__ */ M.createElement(re, { width: "30%" })), /* @__PURE__ */ M.
createElement(fe, { position: "third" }, /* @__PURE__ */ M.createElement(re, { width: "60%" })), /* @__PURE__ */ M.createElement(fe, { position: "\
last" }, /* @__PURE__ */ M.createElement(re, { width: "60%" }))), /* @__PURE__ */ M.createElement(ko, null, /* @__PURE__ */ M.createElement(
fe, { position: "first" }, /* @__PURE__ */ M.createElement(re, { width: "60%" })), /* @__PURE__ */ M.createElement(fe, { position: "second" },
/* @__PURE__ */ M.createElement(re, { width: "80%" }), /* @__PURE__ */ M.createElement(re, { width: "30%" })), /* @__PURE__ */ M.createElement(
fe, { position: "third" }, /* @__PURE__ */ M.createElement(re, { width: "60%" })), /* @__PURE__ */ M.createElement(fe, { position: "last" },
/* @__PURE__ */ M.createElement(re, { width: "60%" })))), "Skeleton");

// ../addons/docs/src/blocks/components/ArgsTable/ArgsTable.tsx
var c0 = va.table(({ theme: e, compact: t, inAddonPanel: r }) => ({
  "&&": {
    // Resets for cascading/system styles
    borderSpacing: 0,
    color: e.color.defaultText,
    "td, th": {
      padding: 0,
      border: "none",
      verticalAlign: "top",
      textOverflow: "ellipsis"
    },
    // End Resets
    fontSize: e.typography.size.s2 - 1,
    lineHeight: "20px",
    textAlign: "left",
    width: "100%",
    // Margin collapse
    marginTop: r ? 0 : 25,
    marginBottom: r ? 0 : 40,
    "thead th:first-of-type, td:first-of-type": {
      // intentionally specify thead here
      width: "25%"
    },
    "th:first-of-type, td:first-of-type": {
      paddingLeft: 20
    },
    "th:nth-of-type(2), td:nth-of-type(2)": {
      ...t ? null : {
        // Description column
        width: "35%"
      }
    },
    "td:nth-of-type(3)": {
      ...t ? null : {
        // Defaults column
        width: "15%"
      }
    },
    "th:last-of-type, td:last-of-type": {
      paddingRight: 20,
      ...t ? null : {
        // Controls column
        width: "25%"
      }
    },
    th: {
      color: e.base === "light" ? F(0.25, e.color.defaultText) : F(0.45, e.color.defaultText),
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15
    },
    td: {
      paddingTop: "10px",
      paddingBottom: "10px",
      "&:not(:first-of-type)": {
        paddingLeft: 15,
        paddingRight: 15
      },
      "&:last-of-type": {
        paddingRight: 20
      }
    },
    // Makes border alignment consistent w/other DocBlocks
    marginLeft: r ? 0 : 1,
    marginRight: r ? 0 : 1,
    tbody: {
      // Safari doesn't love shadows on tbody so we need to use a shadow filter. In order to do this,
      // the table cells all need to be solid so they have a background color applied.
      // I wasn't sure what kinds of content go in these tables so I was extra specific with selectors
      // to avoid unexpected surprises.
      ...r ? null : {
        filter: e.base === "light" ? "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))" : "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.20))"
      },
      "> tr > *": {
        // For filter to work properly, the table cells all need to be opaque.
        background: e.background.content,
        borderTop: `1px solid ${e.appBorderColor}`
      },
      ...r ? null : {
        // This works and I don't know why. :)
        "> tr:first-of-type > *": {
          borderBlockStart: `1px solid ${e.appBorderColor}`
        },
        "> tr:last-of-type > *": {
          borderBlockEnd: `1px solid ${e.appBorderColor}`
        },
        "> tr > *:first-of-type": {
          borderInlineStart: `1px solid ${e.appBorderColor}`
        },
        "> tr > *:last-of-type": {
          borderInlineEnd: `1px solid ${e.appBorderColor}`
        },
        // Thank you, Safari, for making me write code like this.
        "> tr:first-of-type > td:first-of-type": {
          borderTopLeftRadius: e.appBorderRadius
        },
        "> tr:first-of-type > td:last-of-type": {
          borderTopRightRadius: e.appBorderRadius
        },
        "> tr:last-of-type > td:first-of-type": {
          borderBottomLeftRadius: e.appBorderRadius
        },
        "> tr:last-of-type > td:last-of-type": {
          borderBottomRightRadius: e.appBorderRadius
        }
      }
    }
    // End awesome table styling
  }
})), p0 = va(o0)(({ theme: e }) => ({
  margin: "-4px -12px -4px 0"
})), u0 = va.span({
  display: "flex",
  justifyContent: "space-between"
});
var d0 = {
  alpha: /* @__PURE__ */ a((e, t) => (e.name ?? "").localeCompare(t.name ?? ""), "alpha"),
  requiredFirst: /* @__PURE__ */ a((e, t) => +!!t.type?.required - +!!e.type?.required || (e.name ?? "").localeCompare(t.name ?? ""), "requi\
redFirst"),
  none: null
}, f0 = /* @__PURE__ */ a((e, t) => {
  let r = { ungrouped: [], ungroupedSubsections: {}, sections: {} };
  if (!e)
    return r;
  Object.entries(e).forEach(([s, l]) => {
    let { category: c, subcategory: u } = l?.table || {};
    if (c) {
      let d = r.sections[c] || { ungrouped: [], subsections: {} };
      if (!u)
        d.ungrouped.push({ key: s, ...l });
      else {
        let g = d.subsections[u] || [];
        g.push({ key: s, ...l }), d.subsections[u] = g;
      }
      r.sections[c] = d;
    } else if (u) {
      let d = r.ungroupedSubsections[u] || [];
      d.push({ key: s, ...l }), r.ungroupedSubsections[u] = d;
    } else
      r.ungrouped.push({ key: s, ...l });
  });
  let o = d0[t], n = /* @__PURE__ */ a((s) => o ? Object.keys(s).reduce(
    (l, c) => ({
      ...l,
      [c]: s[c].sort(o)
    }),
    {}
  ) : s, "sortSubsection");
  return {
    ungrouped: o ? r.ungrouped.sort(o) : r.ungrouped,
    ungroupedSubsections: n(r.ungroupedSubsections),
    sections: Object.keys(r.sections).reduce(
      (s, l) => ({
        ...s,
        [l]: {
          ungrouped: o ? r.sections[l].ungrouped.sort(o) : r.sections[l].ungrouped,
          subsections: n(r.sections[l].subsections)
        }
      }),
      {}
    )
  };
}, "groupRows"), m0 = /* @__PURE__ */ a((e, t, r) => {
  try {
    return i0(e, t, r);
  } catch (o) {
    return r0.warn(o.message), !1;
  }
}, "safeIncludeConditionalArg"), Ln = /* @__PURE__ */ a((e) => {
  let {
    updateArgs: t,
    resetArgs: r,
    compact: o,
    inAddonPanel: n,
    initialExpandedArgs: i,
    sort: s = "none",
    isLoading: l
  } = e;
  if ("error" in e) {
    let { error: x } = e;
    return /* @__PURE__ */ G.createElement(Kr, null, x, "\xA0", /* @__PURE__ */ G.createElement(n0, { href: "http://storybook.js.org/docs/",
    target: "_blank", withArrow: !0 }, /* @__PURE__ */ G.createElement(s0, null), " Read the docs"));
  }
  if (l)
    return /* @__PURE__ */ G.createElement(np, null);
  let { rows: c, args: u, globals: d } = "rows" in e ? e : { rows: void 0, args: void 0, globals: void 0 }, g = f0(
    yn(
      c || {},
      (x) => !x?.table?.disable && m0(x, u || {}, d || {})
    ),
    s
  ), p = g.ungrouped.length === 0, m = Object.entries(g.sections).length === 0, f = Object.entries(g.ungroupedSubsections).length === 0;
  if (p && m && f)
    return /* @__PURE__ */ G.createElement(rp, { inAddonPanel: n });
  let h = 1;
  t && (h += 1), o || (h += 2);
  let b = Object.keys(g.sections).length > 0, y = { updateArgs: t, compact: o, inAddonPanel: n, initialExpandedArgs: i };
  return /* @__PURE__ */ G.createElement(a0, null, /* @__PURE__ */ G.createElement(c0, { compact: o, inAddonPanel: n, className: "docblock-a\
rgstable sb-unstyled" }, /* @__PURE__ */ G.createElement("thead", { className: "docblock-argstable-head" }, /* @__PURE__ */ G.createElement(
  "tr", null, /* @__PURE__ */ G.createElement("th", null, /* @__PURE__ */ G.createElement("span", null, "Name")), o ? null : /* @__PURE__ */ G.
  createElement("th", null, /* @__PURE__ */ G.createElement("span", null, "Description")), o ? null : /* @__PURE__ */ G.createElement("th", null,
  /* @__PURE__ */ G.createElement("span", null, "Default")), t ? /* @__PURE__ */ G.createElement("th", null, /* @__PURE__ */ G.createElement(
  u0, null, "Control", " ", !l && r && /* @__PURE__ */ G.createElement(p0, { onClick: () => r(), title: "Reset controls" }, /* @__PURE__ */ G.
  createElement(l0, { "aria-hidden": !0 })))) : null)), /* @__PURE__ */ G.createElement("tbody", { className: "docblock-argstable-body" }, g.
  ungrouped.map((x) => /* @__PURE__ */ G.createElement(br, { key: x.key, row: x, arg: u && u[x.key], ...y })), Object.entries(g.ungroupedSubsections).
  map(([x, v]) => /* @__PURE__ */ G.createElement(Ao, { key: x, label: x, level: "subsection", colSpan: h }, v.map((S) => /* @__PURE__ */ G.
  createElement(
    br,
    {
      key: S.key,
      row: S,
      arg: u && u[S.key],
      expandable: b,
      ...y
    }
  )))), Object.entries(g.sections).map(([x, v]) => /* @__PURE__ */ G.createElement(Ao, { key: x, label: x, level: "section", colSpan: h }, v.
  ungrouped.map((S) => /* @__PURE__ */ G.createElement(br, { key: S.key, row: S, arg: u && u[S.key], ...y })), Object.entries(v.subsections).
  map(([S, w]) => /* @__PURE__ */ G.createElement(
    Ao,
    {
      key: S,
      label: S,
      level: "subsection",
      colSpan: h
    },
    w.map((E) => /* @__PURE__ */ G.createElement(
      br,
      {
        key: E.key,
        row: E,
        arg: u && u[E.key],
        expandable: b,
        ...y
      }
    ))
  )))))));
}, "ArgsTable");

// src/controls/constants.ts
var yr = "addon-controls", Io = "controls";

// src/controls/components/SaveStory.tsx
import H from "react";
import {
  Bar as g0,
  Button as ap,
  Form as ip,
  IconButton as Ea,
  Modal as ft,
  TooltipNote as Sa,
  WithTooltip as Ca
} from "storybook/internal/components";
import { AddIcon as h0, CheckIcon as b0, UndoIcon as y0 } from "@storybook/icons";
import { keyframes as sp, styled as Kt } from "storybook/theming";
var x0 = sp({
  from: { transform: "translateY(40px)" },
  to: { transform: "translateY(0)" }
}), v0 = sp({
  from: { background: "var(--highlight-bg-color)" },
  to: {}
}), E0 = Kt.div({
  containerType: "size",
  position: "sticky",
  bottom: 0,
  height: 39,
  overflow: "hidden",
  zIndex: 1
}), S0 = Kt(g0)(({ theme: e }) => ({
  "--highlight-bg-color": e.base === "dark" ? "#153B5B" : "#E0F0FF",
  display: "flex",
  flexDirection: "row-reverse",
  // hide Info rather than Actions on overflow
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 6,
  padding: "6px 10px",
  animation: `${x0} 300ms, ${v0} 2s`,
  background: e.background.bar,
  borderTop: `1px solid ${e.appBorderColor}`,
  fontSize: e.typography.size.s2,
  "@container (max-width: 799px)": {
    flexDirection: "row",
    justifyContent: "flex-end"
  }
})), C0 = Kt.div({
  display: "flex",
  flex: "99 0 auto",
  alignItems: "center",
  marginLeft: 10,
  gap: 6
}), w0 = Kt.div(({ theme: e }) => ({
  display: "flex",
  flex: "1 0 0",
  alignItems: "center",
  gap: 2,
  color: e.color.mediumdark,
  fontSize: e.typography.size.s2
})), wa = Kt.div({
  "@container (max-width: 799px)": {
    lineHeight: 0,
    textIndent: "-9999px",
    "&::after": {
      content: "attr(data-short-label)",
      display: "block",
      lineHeight: "initial",
      textIndent: "0"
    }
  }
}), T0 = Kt(ip.Input)(({ theme: e }) => ({
  "::placeholder": {
    color: e.color.mediumdark
  },
  "&:invalid:not(:placeholder-shown)": {
    boxShadow: `${e.color.negative} 0 0 0 1px inset`
  }
})), lp = /* @__PURE__ */ a(({
  saveStory: e,
  createStory: t,
  resetArgs: r,
  portalSelector: o
}) => {
  let n = H.useRef(null), [i, s] = H.useState(!1), [l, c] = H.useState(!1), [u, d] = H.useState(""), [g, p] = H.useState(null), m = /* @__PURE__ */ a(
  async () => {
    i || (s(!0), await e().catch(() => {
    }), s(!1));
  }, "onSaveStory"), f = /* @__PURE__ */ a(() => {
    c(!0), d(""), setTimeout(() => n.current?.focus(), 0);
  }, "onShowForm"), h = /* @__PURE__ */ a((y) => {
    let x = y.target.value.replace(/^[^a-z]/i, "").replace(/[^a-z0-9-_ ]/gi, "").replaceAll(/([-_ ]+[a-z0-9])/gi, (v) => v.toUpperCase().replace(
    /[-_ ]/g, ""));
    d(x.charAt(0).toUpperCase() + x.slice(1));
  }, "onChange");
  return /* @__PURE__ */ H.createElement(E0, { id: "save-from-controls" }, /* @__PURE__ */ H.createElement(S0, null, /* @__PURE__ */ H.createElement(
  w0, null, /* @__PURE__ */ H.createElement(
    Ca,
    {
      as: "div",
      hasChrome: !1,
      trigger: "hover",
      tooltip: /* @__PURE__ */ H.createElement(Sa, { note: "Save changes to story" })
    },
    /* @__PURE__ */ H.createElement(Ea, { "aria-label": "Save changes to story", disabled: i, onClick: m }, /* @__PURE__ */ H.createElement(
    b0, null), /* @__PURE__ */ H.createElement(wa, { "data-short-label": "Save" }, "Update story"))
  ), /* @__PURE__ */ H.createElement(
    Ca,
    {
      as: "div",
      hasChrome: !1,
      trigger: "hover",
      tooltip: /* @__PURE__ */ H.createElement(Sa, { note: "Create new story with these settings" })
    },
    /* @__PURE__ */ H.createElement(Ea, { "aria-label": "Create new story with these settings", onClick: f }, /* @__PURE__ */ H.createElement(
    h0, null), /* @__PURE__ */ H.createElement(wa, { "data-short-label": "New" }, "Create new story"))
  ), /* @__PURE__ */ H.createElement(
    Ca,
    {
      as: "div",
      hasChrome: !1,
      trigger: "hover",
      tooltip: /* @__PURE__ */ H.createElement(Sa, { note: "Reset changes" })
    },
    /* @__PURE__ */ H.createElement(Ea, { "aria-label": "Reset changes", onClick: () => r() }, /* @__PURE__ */ H.createElement(y0, null), /* @__PURE__ */ H.
    createElement("span", null, "Reset"))
  )), /* @__PURE__ */ H.createElement(C0, null, /* @__PURE__ */ H.createElement(wa, { "data-short-label": "Unsaved changes" }, "You modified\
 this story. Do you want to save your changes?")), /* @__PURE__ */ H.createElement(
    ft,
    {
      width: 350,
      open: l,
      onOpenChange: c,
      portalSelector: o
    },
    /* @__PURE__ */ H.createElement(ip, { onSubmit: /* @__PURE__ */ a(async (y) => {
      if (y.preventDefault(), !i)
        try {
          p(null), s(!0), await t(u.replace(/^[^a-z]/i, "").replaceAll(/[^a-z0-9]/gi, "")), c(!1), s(!1);
        } catch (x) {
          p(x.message), s(!1);
        }
    }, "onSubmitForm"), id: "create-new-story-form" }, /* @__PURE__ */ H.createElement(ft.Content, null, /* @__PURE__ */ H.createElement(ft.
    Header, null, /* @__PURE__ */ H.createElement(ft.Title, null, "Create new story"), /* @__PURE__ */ H.createElement(ft.Description, null,
    "This will add a new story to your existing stories file.")), /* @__PURE__ */ H.createElement(
      T0,
      {
        onChange: h,
        placeholder: "Story export name",
        readOnly: i,
        ref: n,
        value: u
      }
    ), /* @__PURE__ */ H.createElement(ft.Actions, null, /* @__PURE__ */ H.createElement(ap, { disabled: i || !u, size: "medium", type: "sub\
mit", variant: "solid" }, "Create"), /* @__PURE__ */ H.createElement(ft.Dialog.Close, { asChild: !0 }, /* @__PURE__ */ H.createElement(ap, {
    disabled: i, size: "medium", type: "reset" }, "Cancel"))))),
    g && /* @__PURE__ */ H.createElement(ft.Error, null, g)
  )));
}, "SaveStory");

// src/controls/components/ControlsPanel.tsx
var cp = /* @__PURE__ */ a((e) => Object.entries(e).reduce(
  (t, [r, o]) => o !== void 0 ? Object.assign(t, { [r]: o }) : t,
  {}
), "clean"), M0 = B0.div({
  display: "grid",
  gridTemplateRows: "1fr 39px",
  height: "100%",
  maxHeight: "100vh",
  overflowY: "auto"
}), pp = /* @__PURE__ */ a(({ saveStory: e, createStory: t }) => {
  let [r, o] = O0(!0), [n, i, s, l] = L0(), [c] = N0(), u = P0(), {
    expanded: d,
    sort: g,
    presetColors: p,
    disableSaveFromUI: m = !1
  } = _0(Io, {}), { path: f, previewInitialized: h } = D0();
  A0(() => {
    h && o(!1);
  }, [h]);
  let b = Object.values(u).some((v) => v?.control), y = Object.entries(u).reduce((v, [S, w]) => {
    let E = w?.control;
    return typeof E != "object" || E?.type !== "color" || E?.presetColors ? v[S] = w : v[S] = { ...w, control: { ...E, presetColors: p } }, v;
  }, {}), x = k0(
    () => !!n && !!l && !$e(cp(n), cp(l)),
    [n, l]
  );
  return /* @__PURE__ */ Ta.createElement(M0, null, /* @__PURE__ */ Ta.createElement(
    Ln,
    {
      key: f,
      compact: !d && b,
      rows: y,
      args: n,
      globals: c,
      updateArgs: i,
      resetArgs: s,
      inAddonPanel: !0,
      sort: g,
      isLoading: r
    }
  ), b && x && I0.CONFIG_TYPE === "DEVELOPMENT" && m !== !0 && /* @__PURE__ */ Ta.createElement(lp, { resetArgs: s, saveStory: e, createStory: t }));
}, "ControlsPanel");

// src/controls/components/Title.tsx
import Aa from "react";
import { Badge as F0 } from "storybook/internal/components";
import { useArgTypes as j0, useStorybookApi as R0 } from "storybook/manager-api";
function up() {
  let t = R0().getSelectedPanel(), r = j0(), o = Object.values(r).filter(
    (i) => i?.control && !i?.table?.disable
  ).length;
  return /* @__PURE__ */ Aa.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ Aa.createElement(
  "span", null, "Controls"), o === 0 ? null : /* @__PURE__ */ Aa.createElement(F0, { compact: !0, status: t === yr ? "active" : "neutral" },
  o));
}
a(up, "Title");

// src/controls/stringifyArgs.tsx
var ka = /* @__PURE__ */ a((e) => JSON.stringify(e, (t, r) => typeof r == "function" ? "__sb_empty_function_arg__" : r), "stringifyArgs");

// src/controls/manager.tsx
var gp = Ia.register(yr, (e) => {
  if (globalThis?.FEATURES?.controls) {
    let t = Ia.getChannel(), r = /* @__PURE__ */ a(async () => {
      let n = e.getCurrentStoryData();
      if (n.type !== "story")
        throw new Error("Not a story");
      try {
        let i = await mp(t, dp, Oa, {
          // Only send updated args
          args: ka(
            Object.entries(n.args || {}).reduce((s, [l, c]) => ($e(c, n.initialArgs?.[l]) || (s[l] = c), s), {})
          ),
          csfId: n.id,
          importPath: n.importPath
        });
        e.addNotification({
          id: "save-story-success",
          icon: /* @__PURE__ */ Be.createElement(fp, { color: Pa.positive }),
          content: {
            headline: "Story saved",
            subHeadline: /* @__PURE__ */ Be.createElement(Be.Fragment, null, "Updated story ", /* @__PURE__ */ Be.createElement("b", null, i.
            sourceStoryName), ".")
          },
          duration: 8e3
        });
      } catch (i) {
        throw e.addNotification({
          id: "save-story-error",
          icon: /* @__PURE__ */ Be.createElement(V0, { color: Pa.negative }),
          content: {
            headline: "Failed to save story",
            subHeadline: i?.message || "Check the Storybook process on the command line for more details."
          },
          duration: 8e3
        }), i;
      }
    }, "saveStory"), o = /* @__PURE__ */ a(async (n) => {
      let i = e.getCurrentStoryData();
      if (i.type !== "story")
        throw new Error("Not a story");
      let s = await mp(t, dp, Oa, {
        args: i.args && ka(i.args),
        csfId: i.id,
        importPath: i.importPath,
        name: n
      });
      e.addNotification({
        id: "save-story-success",
        icon: /* @__PURE__ */ Be.createElement(fp, { color: Pa.positive }),
        content: {
          headline: "Story created",
          subHeadline: /* @__PURE__ */ Be.createElement(Be.Fragment, null, "Added story ", /* @__PURE__ */ Be.createElement("b", null, s.newStoryName),
          " based on ", /* @__PURE__ */ Be.createElement("b", null, s.sourceStoryName), ".")
        },
        duration: 8e3,
        onClick: /* @__PURE__ */ a(({ onDismiss: l }) => {
          l(), e.selectStory(s.newStoryId);
        }, "onClick")
      });
    }, "createStory");
    Ia.add(yr, {
      title: up,
      type: z0.PANEL,
      paramKey: Io,
      render: /* @__PURE__ */ a(({ active: n }) => !n || !e.getCurrentStoryData() ? null : /* @__PURE__ */ Be.createElement(H0, { active: n },
      /* @__PURE__ */ Be.createElement(pp, { saveStory: r, createStory: o })), "render")
    }), t.on(Oa, (n) => {
      if (!n.success)
        return;
      let i = e.getCurrentStoryData();
      i.type === "story" && (e.resetStoryArgs(i), n.payload.newStoryId && e.selectStory(n.payload.newStoryId));
    });
  }
});

// src/actions/manager.tsx
import a1 from "react";
import { addons as Hp, types as i1 } from "storybook/manager-api";

// src/actions/components/Title.tsx
import La from "react";
import { Badge as $0 } from "storybook/internal/components";
import { STORY_CHANGED as U0 } from "storybook/internal/core-events";
import { useAddonState as q0, useChannel as W0, useStorybookApi as G0 } from "storybook/manager-api";

// src/actions/constants.ts
var hp = "actions", Lt = "storybook/actions", Po = `${Lt}/panel`, xr = `${Lt}/action-event`, Lo = `${Lt}/action-clear`;

// src/actions/components/Title.tsx
function bp() {
  let t = G0().getSelectedPanel(), [{ count: r }, o] = q0(Lt, { count: 0 });
  return W0({
    [xr]: () => {
      o((i) => ({ ...i, count: i.count + 1 }));
    },
    [U0]: () => {
      o((i) => ({ ...i, count: 0 }));
    },
    [Lo]: () => {
      o((i) => ({ ...i, count: 0 }));
    }
  }), /* @__PURE__ */ La.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ La.createElement(
  "span", null, "Actions"), r === 0 ? null : /* @__PURE__ */ La.createElement($0, { compact: !0, status: t === Po ? "active" : "neutral" }, r));
}
a(bp, "Title");

// src/actions/containers/ActionLogger/index.tsx
import r1, { Component as o1 } from "react";
import { STORY_CHANGED as Rp } from "storybook/internal/core-events";

// src/actions/components/ActionLogger/index.tsx
import et, { Fragment as Wx, forwardRef as Gx, useEffect as Jx, useRef as Kx } from "react";
import { ActionBar as Yx, ScrollArea as Xx } from "storybook/internal/components";

// ../node_modules/react-inspector/dist/index.mjs
import Da from "react";
import Sr, { useContext as ix, useCallback as sx, useLayoutEffect as lx, useState as cx, memo as Ap } from "react";
import { createContext as px } from "react";
import mt, { Children as ux, memo as dx } from "react";
import yp, { createContext as fx, useContext as mx, useMemo as gx } from "react";
import vr from "react";
import vx from "react";
import xe from "react";
import pe from "react";
import Er from "react";
import No, { useCallback as Ep, useState as Ox } from "react";
import Qe from "react";
import Yt from "react";
import Xt, { useCallback as Sp, useState as Lx } from "react";
import Fx from "react";
import oe from "react";
import _a from "react";
var J0 = Object.create, ja = Object.defineProperty, K0 = Object.getOwnPropertyDescriptor, Tp = Object.getOwnPropertyNames, Y0 = Object.getPrototypeOf,
X0 = Object.prototype.hasOwnProperty, Ra = /* @__PURE__ */ a((e, t) => /* @__PURE__ */ a(function() {
  return t || (0, e[Tp(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, "__require"), "__commonJS"), Z0 = /* @__PURE__ */ a((e, t) => {
  for (var r in t)
    ja(e, r, { get: t[r], enumerable: !0 });
}, "__export"), Q0 = /* @__PURE__ */ a((e, t, r, o) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let n of Tp(t))
      !X0.call(e, n) && n !== r && ja(e, n, { get: /* @__PURE__ */ a(() => t[n], "get"), enumerable: !(o = K0(t, n)) || o.enumerable });
  return e;
}, "__copyProps"), ex = /* @__PURE__ */ a((e, t, r) => (r = e != null ? J0(Y0(e)) : {}, Q0(t || !e || !e.__esModule ? ja(r, "default", { value: e,
enumerable: !0 }) : r, e)), "__toESM"), tx = Ra({
  "node_modules/is-object/index.js"(e, t) {
    "use strict";
    t.exports = /* @__PURE__ */ a(function(o) {
      return typeof o == "object" && o !== null;
    }, "isObject");
  }
}), rx = Ra({
  "node_modules/is-window/index.js"(e, t) {
    "use strict";
    t.exports = function(r) {
      if (r == null)
        return !1;
      var o = Object(r);
      return o === o.window;
    };
  }
}), ox = Ra({
  "node_modules/is-dom/index.js"(e, t) {
    var r = tx(), o = rx();
    function n(i) {
      return !r(i) || !o(window) || typeof window.Node != "function" ? !1 : typeof i.nodeType == "number" && typeof i.nodeName == "string";
    }
    a(n, "isNode"), t.exports = n;
  }
}), Bo = {};
Z0(Bo, {
  chromeDark: /* @__PURE__ */ a(() => nx, "chromeDark"),
  chromeLight: /* @__PURE__ */ a(() => ax, "chromeLight")
});
var nx = {
  BASE_FONT_FAMILY: "Menlo, monospace",
  BASE_FONT_SIZE: "11px",
  BASE_LINE_HEIGHT: 1.2,
  BASE_BACKGROUND_COLOR: "rgb(36, 36, 36)",
  BASE_COLOR: "rgb(213, 213, 213)",
  OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
  OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
  OBJECT_NAME_COLOR: "rgb(227, 110, 236)",
  OBJECT_VALUE_NULL_COLOR: "rgb(127, 127, 127)",
  OBJECT_VALUE_UNDEFINED_COLOR: "rgb(127, 127, 127)",
  OBJECT_VALUE_REGEXP_COLOR: "rgb(233, 63, 59)",
  OBJECT_VALUE_STRING_COLOR: "rgb(233, 63, 59)",
  OBJECT_VALUE_SYMBOL_COLOR: "rgb(233, 63, 59)",
  OBJECT_VALUE_NUMBER_COLOR: "hsl(252, 100%, 75%)",
  OBJECT_VALUE_BOOLEAN_COLOR: "hsl(252, 100%, 75%)",
  OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(85, 106, 242)",
  HTML_TAG_COLOR: "rgb(93, 176, 215)",
  HTML_TAGNAME_COLOR: "rgb(93, 176, 215)",
  HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
  HTML_ATTRIBUTE_NAME_COLOR: "rgb(155, 187, 220)",
  HTML_ATTRIBUTE_VALUE_COLOR: "rgb(242, 151, 102)",
  HTML_COMMENT_COLOR: "rgb(137, 137, 137)",
  HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
  ARROW_COLOR: "rgb(145, 145, 145)",
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,
  ARROW_ANIMATION_DURATION: "0",
  TREENODE_FONT_FAMILY: "Menlo, monospace",
  TREENODE_FONT_SIZE: "11px",
  TREENODE_LINE_HEIGHT: 1.2,
  TREENODE_PADDING_LEFT: 12,
  TABLE_BORDER_COLOR: "rgb(85, 85, 85)",
  TABLE_TH_BACKGROUND_COLOR: "rgb(44, 44, 44)",
  TABLE_TH_HOVER_COLOR: "rgb(48, 48, 48)",
  TABLE_SORT_ICON_COLOR: "black",
  TABLE_DATA_BACKGROUND_IMAGE: "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(\
51, 139, 255, 0.0980392))",
  TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
}, ax = {
  BASE_FONT_FAMILY: "Menlo, monospace",
  BASE_FONT_SIZE: "11px",
  BASE_LINE_HEIGHT: 1.2,
  BASE_BACKGROUND_COLOR: "white",
  BASE_COLOR: "black",
  OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
  OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
  OBJECT_NAME_COLOR: "rgb(136, 19, 145)",
  OBJECT_VALUE_NULL_COLOR: "rgb(128, 128, 128)",
  OBJECT_VALUE_UNDEFINED_COLOR: "rgb(128, 128, 128)",
  OBJECT_VALUE_REGEXP_COLOR: "rgb(196, 26, 22)",
  OBJECT_VALUE_STRING_COLOR: "rgb(196, 26, 22)",
  OBJECT_VALUE_SYMBOL_COLOR: "rgb(196, 26, 22)",
  OBJECT_VALUE_NUMBER_COLOR: "rgb(28, 0, 207)",
  OBJECT_VALUE_BOOLEAN_COLOR: "rgb(28, 0, 207)",
  OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(13, 34, 170)",
  HTML_TAG_COLOR: "rgb(168, 148, 166)",
  HTML_TAGNAME_COLOR: "rgb(136, 18, 128)",
  HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
  HTML_ATTRIBUTE_NAME_COLOR: "rgb(153, 69, 0)",
  HTML_ATTRIBUTE_VALUE_COLOR: "rgb(26, 26, 166)",
  HTML_COMMENT_COLOR: "rgb(35, 110, 37)",
  HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
  ARROW_COLOR: "#6e6e6e",
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,
  ARROW_ANIMATION_DURATION: "0",
  TREENODE_FONT_FAMILY: "Menlo, monospace",
  TREENODE_FONT_SIZE: "11px",
  TREENODE_LINE_HEIGHT: 1.2,
  TREENODE_PADDING_LEFT: 12,
  TABLE_BORDER_COLOR: "#aaa",
  TABLE_TH_BACKGROUND_COLOR: "#eee",
  TABLE_TH_HOVER_COLOR: "hsla(0, 0%, 90%, 1)",
  TABLE_SORT_ICON_COLOR: "#6e6e6e",
  TABLE_DATA_BACKGROUND_IMAGE: "linear-gradient(to bottom, white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))",
  TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
}, kp = px([{}, () => {
}]), Na = {
  WebkitTouchCallout: "none",
  WebkitUserSelect: "none",
  KhtmlUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  OUserSelect: "none",
  userSelect: "none"
}, _o = /* @__PURE__ */ a((e) => ({
  DOMNodePreview: {
    htmlOpenTag: {
      base: {
        color: e.HTML_TAG_COLOR
      },
      tagName: {
        color: e.HTML_TAGNAME_COLOR,
        textTransform: e.HTML_TAGNAME_TEXT_TRANSFORM
      },
      htmlAttributeName: {
        color: e.HTML_ATTRIBUTE_NAME_COLOR
      },
      htmlAttributeValue: {
        color: e.HTML_ATTRIBUTE_VALUE_COLOR
      }
    },
    htmlCloseTag: {
      base: {
        color: e.HTML_TAG_COLOR
      },
      offsetLeft: {
        marginLeft: -e.TREENODE_PADDING_LEFT
      },
      tagName: {
        color: e.HTML_TAGNAME_COLOR,
        textTransform: e.HTML_TAGNAME_TEXT_TRANSFORM
      }
    },
    htmlComment: {
      color: e.HTML_COMMENT_COLOR
    },
    htmlDoctype: {
      color: e.HTML_DOCTYPE_COLOR
    }
  },
  ObjectPreview: {
    objectDescription: {
      fontStyle: "italic"
    },
    preview: {
      fontStyle: "italic"
    },
    arrayMaxProperties: e.OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES,
    objectMaxProperties: e.OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES
  },
  ObjectName: {
    base: {
      color: e.OBJECT_NAME_COLOR
    },
    dimmed: {
      opacity: 0.6
    }
  },
  ObjectValue: {
    objectValueNull: {
      color: e.OBJECT_VALUE_NULL_COLOR
    },
    objectValueUndefined: {
      color: e.OBJECT_VALUE_UNDEFINED_COLOR
    },
    objectValueRegExp: {
      color: e.OBJECT_VALUE_REGEXP_COLOR
    },
    objectValueString: {
      color: e.OBJECT_VALUE_STRING_COLOR
    },
    objectValueSymbol: {
      color: e.OBJECT_VALUE_SYMBOL_COLOR
    },
    objectValueNumber: {
      color: e.OBJECT_VALUE_NUMBER_COLOR
    },
    objectValueBoolean: {
      color: e.OBJECT_VALUE_BOOLEAN_COLOR
    },
    objectValueFunctionPrefix: {
      color: e.OBJECT_VALUE_FUNCTION_PREFIX_COLOR,
      fontStyle: "italic"
    },
    objectValueFunctionName: {
      fontStyle: "italic"
    }
  },
  TreeView: {
    treeViewOutline: {
      padding: 0,
      margin: 0,
      listStyleType: "none"
    }
  },
  TreeNode: {
    treeNodeBase: {
      color: e.BASE_COLOR,
      backgroundColor: e.BASE_BACKGROUND_COLOR,
      lineHeight: e.TREENODE_LINE_HEIGHT,
      cursor: "default",
      boxSizing: "border-box",
      listStyle: "none",
      fontFamily: e.TREENODE_FONT_FAMILY,
      fontSize: e.TREENODE_FONT_SIZE
    },
    treeNodePreviewContainer: {},
    treeNodePlaceholder: {
      whiteSpace: "pre",
      fontSize: e.ARROW_FONT_SIZE,
      marginRight: e.ARROW_MARGIN_RIGHT,
      ...Na
    },
    treeNodeArrow: {
      base: {
        color: e.ARROW_COLOR,
        display: "inline-block",
        fontSize: e.ARROW_FONT_SIZE,
        marginRight: e.ARROW_MARGIN_RIGHT,
        ...parseFloat(e.ARROW_ANIMATION_DURATION) > 0 ? {
          transition: `transform ${e.ARROW_ANIMATION_DURATION} ease 0s`
        } : {},
        ...Na
      },
      expanded: {
        WebkitTransform: "rotateZ(90deg)",
        MozTransform: "rotateZ(90deg)",
        transform: "rotateZ(90deg)"
      },
      collapsed: {
        WebkitTransform: "rotateZ(0deg)",
        MozTransform: "rotateZ(0deg)",
        transform: "rotateZ(0deg)"
      }
    },
    treeNodeChildNodesContainer: {
      margin: 0,
      paddingLeft: e.TREENODE_PADDING_LEFT
    }
  },
  TableInspector: {
    base: {
      color: e.BASE_COLOR,
      position: "relative",
      border: `1px solid ${e.TABLE_BORDER_COLOR}`,
      fontFamily: e.BASE_FONT_FAMILY,
      fontSize: e.BASE_FONT_SIZE,
      lineHeight: "120%",
      boxSizing: "border-box",
      cursor: "default"
    }
  },
  TableInspectorHeaderContainer: {
    base: {
      top: 0,
      height: "17px",
      left: 0,
      right: 0,
      overflowX: "hidden"
    },
    table: {
      tableLayout: "fixed",
      borderSpacing: 0,
      borderCollapse: "separate",
      height: "100%",
      width: "100%",
      margin: 0
    }
  },
  TableInspectorDataContainer: {
    tr: {
      display: "table-row"
    },
    td: {
      boxSizing: "border-box",
      border: "none",
      height: "16px",
      verticalAlign: "top",
      padding: "1px 4px",
      WebkitUserSelect: "text",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      lineHeight: "14px"
    },
    div: {
      position: "static",
      top: "17px",
      bottom: 0,
      overflowY: "overlay",
      transform: "translateZ(0)",
      left: 0,
      right: 0,
      overflowX: "hidden"
    },
    table: {
      positon: "static",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      borderTop: "0 none transparent",
      margin: 0,
      backgroundImage: e.TABLE_DATA_BACKGROUND_IMAGE,
      backgroundSize: e.TABLE_DATA_BACKGROUND_SIZE,
      tableLayout: "fixed",
      borderSpacing: 0,
      borderCollapse: "separate",
      width: "100%",
      fontSize: e.BASE_FONT_SIZE,
      lineHeight: "120%"
    }
  },
  TableInspectorTH: {
    base: {
      position: "relative",
      height: "auto",
      textAlign: "left",
      backgroundColor: e.TABLE_TH_BACKGROUND_COLOR,
      borderBottom: `1px solid ${e.TABLE_BORDER_COLOR}`,
      fontWeight: "normal",
      verticalAlign: "middle",
      padding: "0 4px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      lineHeight: "14px",
      ":hover": {
        backgroundColor: e.TABLE_TH_HOVER_COLOR
      }
    },
    div: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      fontSize: e.BASE_FONT_SIZE,
      lineHeight: "120%"
    }
  },
  TableInspectorLeftBorder: {
    none: {
      borderLeft: "none"
    },
    solid: {
      borderLeft: `1px solid ${e.TABLE_BORDER_COLOR}`
    }
  },
  TableInspectorSortIcon: {
    display: "block",
    marginRight: 3,
    width: 8,
    height: 7,
    marginTop: -7,
    color: e.TABLE_SORT_ICON_COLOR,
    fontSize: 12,
    ...Na
  }
}), "createTheme"), Ba = "chromeLight", Op = fx(_o(Bo[Ba])), Pe = /* @__PURE__ */ a((e) => mx(Op)[e], "useStyles"), Ha = /* @__PURE__ */ a((e) => /* @__PURE__ */ a(
({ theme: r = Ba, ...o }) => {
  let n = gx(() => {
    switch (Object.prototype.toString.call(r)) {
      case "[object String]":
        return _o(Bo[r]);
      case "[object Object]":
        return _o(r);
      default:
        return _o(Bo[Ba]);
    }
  }, [r]);
  return /* @__PURE__ */ yp.createElement(Op.Provider, {
    value: n
  }, /* @__PURE__ */ yp.createElement(e, {
    ...o
  }));
}, "ThemeAcceptor"), "themeAcceptor"), hx = /* @__PURE__ */ a(({ expanded: e, styles: t }) => /* @__PURE__ */ mt.createElement("span", {
  style: {
    ...t.base,
    ...e ? t.expanded : t.collapsed
  }
}, "\u25B6"), "Arrow"), bx = dx((e) => {
  e = {
    expanded: !0,
    nodeRenderer: /* @__PURE__ */ a(({ name: d }) => /* @__PURE__ */ mt.createElement("span", null, d), "nodeRenderer"),
    onClick: /* @__PURE__ */ a(() => {
    }, "onClick"),
    shouldShowArrow: !1,
    shouldShowPlaceholder: !0,
    ...e
  };
  let { expanded: t, onClick: r, children: o, nodeRenderer: n, title: i, shouldShowArrow: s, shouldShowPlaceholder: l } = e, c = Pe("TreeNod\
e"), u = n;
  return /* @__PURE__ */ mt.createElement("li", {
    "aria-expanded": t,
    role: "treeitem",
    style: c.treeNodeBase,
    title: i
  }, /* @__PURE__ */ mt.createElement("div", {
    style: c.treeNodePreviewContainer,
    onClick: r
  }, s || ux.count(o) > 0 ? /* @__PURE__ */ mt.createElement(hx, {
    expanded: t,
    styles: c.treeNodeArrow
  }) : l && /* @__PURE__ */ mt.createElement("span", {
    style: c.treeNodePlaceholder
  }, "\xA0"), /* @__PURE__ */ mt.createElement(u, {
    ...e
  })), /* @__PURE__ */ mt.createElement("ol", {
    role: "group",
    style: c.treeNodeChildNodesContainer
  }, t ? o : void 0));
}), Mo = "$", xp = "*";
function Do(e, t) {
  return !t(e).next().done;
}
a(Do, "hasChildNodes");
var yx = /* @__PURE__ */ a((e) => Array.from({ length: e }, (t, r) => [Mo].concat(Array.from({ length: r }, () => "*")).join(".")), "wildcar\
dPathsFromLevel"), xx = /* @__PURE__ */ a((e, t, r, o, n) => {
  let i = [].concat(yx(o)).concat(r).filter((l) => typeof l == "string"), s = [];
  return i.forEach((l) => {
    let c = l.split("."), u = /* @__PURE__ */ a((d, g, p) => {
      if (p === c.length) {
        s.push(g);
        return;
      }
      let m = c[p];
      if (p === 0)
        Do(d, t) && (m === Mo || m === xp) && u(d, Mo, p + 1);
      else if (m === xp)
        for (let { name: f, data: h } of t(d))
          Do(h, t) && u(h, `${g}.${f}`, p + 1);
      else {
        let f = d[m];
        Do(f, t) && u(f, `${g}.${m}`, p + 1);
      }
    }, "populatePaths");
    u(e, "", 0);
  }), s.reduce((l, c) => (l[c] = !0, l), { ...n });
}, "getExpandedPaths"), Ip = Ap((e) => {
  let { data: t, dataIterator: r, path: o, depth: n, nodeRenderer: i } = e, [s, l] = ix(kp), c = Do(t, r), u = !!s[o], d = sx(() => c && l((g) => ({
    ...g,
    [o]: !u
  })), [c, l, o, u]);
  return /* @__PURE__ */ Sr.createElement(bx, {
    expanded: u,
    onClick: d,
    shouldShowArrow: c,
    shouldShowPlaceholder: n > 0,
    nodeRenderer: i,
    ...e
  }, u ? [...r(t)].map(({ name: g, data: p, ...m }) => /* @__PURE__ */ Sr.createElement(Ip, {
    name: g,
    data: p,
    depth: n + 1,
    path: `${o}.${g}`,
    key: g,
    dataIterator: r,
    nodeRenderer: i,
    ...m
  })) : null);
}), Pp = Ap(({ name: e, data: t, dataIterator: r, nodeRenderer: o, expandPaths: n, expandLevel: i }) => {
  let s = Pe("TreeView"), l = cx({}), [, c] = l;
  return lx(() => c((u) => xx(t, r, n, i, u)), [t, r, n, i]), /* @__PURE__ */ Sr.createElement(kp.Provider, {
    value: l
  }, /* @__PURE__ */ Sr.createElement("ol", {
    role: "tree",
    style: s.treeViewOutline
  }, /* @__PURE__ */ Sr.createElement(Ip, {
    name: e,
    data: t,
    dataIterator: r,
    depth: 0,
    path: Mo,
    nodeRenderer: o
  })));
}), Va = /* @__PURE__ */ a(({ name: e, dimmed: t = !1, styles: r = {} }) => {
  let o = Pe("ObjectName"), n = {
    ...o.base,
    ...t ? o.dimmed : {},
    ...r
  };
  return /* @__PURE__ */ vx.createElement("span", {
    style: n
  }, e);
}, "ObjectName"), Cr = /* @__PURE__ */ a(({ object: e, styles: t }) => {
  let r = Pe("ObjectValue"), o = /* @__PURE__ */ a((n) => ({ ...r[n], ...t }), "mkStyle");
  switch (typeof e) {
    case "bigint":
      return /* @__PURE__ */ pe.createElement("span", {
        style: o("objectValueNumber")
      }, String(e), "n");
    case "number":
      return /* @__PURE__ */ pe.createElement("span", {
        style: o("objectValueNumber")
      }, String(e));
    case "string":
      return /* @__PURE__ */ pe.createElement("span", {
        style: o("objectValueString")
      }, '"', e, '"');
    case "boolean":
      return /* @__PURE__ */ pe.createElement("span", {
        style: o("objectValueBoolean")
      }, String(e));
    case "undefined":
      return /* @__PURE__ */ pe.createElement("span", {
        style: o("objectValueUndefined")
      }, "undefined");
    case "object":
      return e === null ? /* @__PURE__ */ pe.createElement("span", {
        style: o("objectValueNull")
      }, "null") : e instanceof Date ? /* @__PURE__ */ pe.createElement("span", null, e.toString()) : e instanceof RegExp ? /* @__PURE__ */ pe.
      createElement("span", {
        style: o("objectValueRegExp")
      }, e.toString()) : Array.isArray(e) ? /* @__PURE__ */ pe.createElement("span", null, `Array(${e.length})`) : e.constructor ? typeof e.
      constructor.isBuffer == "function" && e.constructor.isBuffer(e) ? /* @__PURE__ */ pe.createElement("span", null, `Buffer[${e.length}]`) :
      /* @__PURE__ */ pe.createElement("span", null, e.constructor.name) : /* @__PURE__ */ pe.createElement("span", null, "Object");
    case "function":
      return /* @__PURE__ */ pe.createElement("span", null, /* @__PURE__ */ pe.createElement("span", {
        style: o("objectValueFunctionPrefix")
      }, "\u0192\xA0"), /* @__PURE__ */ pe.createElement("span", {
        style: o("objectValueFunctionName")
      }, e.name, "()"));
    case "symbol":
      return /* @__PURE__ */ pe.createElement("span", {
        style: o("objectValueSymbol")
      }, e.toString());
    default:
      return /* @__PURE__ */ pe.createElement("span", null);
  }
}, "ObjectValue"), Lp = Object.prototype.hasOwnProperty, Ex = Object.prototype.propertyIsEnumerable;
function Ma(e, t) {
  let r = Object.getOwnPropertyDescriptor(e, t);
  if (r.get)
    try {
      return r.get();
    } catch {
      return r.get;
    }
  return e[t];
}
a(Ma, "getPropertyValue");
function vp(e, t) {
  return e.length === 0 ? [] : e.slice(1).reduce((r, o) => r.concat([t, o]), [e[0]]);
}
a(vp, "intersperse");
var Fa = /* @__PURE__ */ a(({ data: e }) => {
  let t = Pe("ObjectPreview"), r = e;
  if (typeof r != "object" || r === null || r instanceof Date || r instanceof RegExp)
    return /* @__PURE__ */ xe.createElement(Cr, {
      object: r
    });
  if (Array.isArray(r)) {
    let o = t.arrayMaxProperties, n = r.slice(0, o).map((s, l) => /* @__PURE__ */ xe.createElement(Cr, {
      key: l,
      object: s
    }));
    r.length > o && n.push(/* @__PURE__ */ xe.createElement("span", {
      key: "ellipsis"
    }, "\u2026"));
    let i = r.length;
    return /* @__PURE__ */ xe.createElement(xe.Fragment, null, /* @__PURE__ */ xe.createElement("span", {
      style: t.objectDescription
    }, i === 0 ? "" : `(${i})\xA0`), /* @__PURE__ */ xe.createElement("span", {
      style: t.preview
    }, "[", vp(n, ", "), "]"));
  } else {
    let o = t.objectMaxProperties, n = [];
    for (let s in r)
      if (Lp.call(r, s)) {
        let l;
        n.length === o - 1 && Object.keys(r).length > o && (l = /* @__PURE__ */ xe.createElement("span", {
          key: "ellipsis"
        }, "\u2026"));
        let c = Ma(r, s);
        if (n.push(/* @__PURE__ */ xe.createElement("span", {
          key: s
        }, /* @__PURE__ */ xe.createElement(Va, {
          name: s || '""'
        }), ":\xA0", /* @__PURE__ */ xe.createElement(Cr, {
          object: c
        }), l)), l)
          break;
      }
    let i = r.constructor ? r.constructor.name : "Object";
    return /* @__PURE__ */ xe.createElement(xe.Fragment, null, /* @__PURE__ */ xe.createElement("span", {
      style: t.objectDescription
    }, i === "Object" ? "" : `${i} `), /* @__PURE__ */ xe.createElement("span", {
      style: t.preview
    }, "{", vp(n, ", "), "}"));
  }
}, "ObjectPreview"), Sx = /* @__PURE__ */ a(({ name: e, data: t }) => typeof e == "string" ? /* @__PURE__ */ vr.createElement("span", null, /* @__PURE__ */ vr.
createElement(Va, {
  name: e
}), /* @__PURE__ */ vr.createElement("span", null, ": "), /* @__PURE__ */ vr.createElement(Fa, {
  data: t
})) : /* @__PURE__ */ vr.createElement(Fa, {
  data: t
}), "ObjectRootLabel"), Cx = /* @__PURE__ */ a(({ name: e, data: t, isNonenumerable: r = !1 }) => {
  let o = t;
  return /* @__PURE__ */ Er.createElement("span", null, typeof e == "string" ? /* @__PURE__ */ Er.createElement(Va, {
    name: e,
    dimmed: r
  }) : /* @__PURE__ */ Er.createElement(Fa, {
    data: e
  }), /* @__PURE__ */ Er.createElement("span", null, ": "), /* @__PURE__ */ Er.createElement(Cr, {
    object: o
  }));
}, "ObjectLabel"), wx = /* @__PURE__ */ a((e, t) => /* @__PURE__ */ a(function* (o) {
  if (!(typeof o == "object" && o !== null || typeof o == "function"))
    return;
  let i = Array.isArray(o);
  if (!i && o[Symbol.iterator]) {
    let s = 0;
    for (let l of o) {
      if (Array.isArray(l) && l.length === 2) {
        let [c, u] = l;
        yield {
          name: c,
          data: u
        };
      } else
        yield {
          name: s.toString(),
          data: l
        };
      s++;
    }
  } else {
    let s = Object.getOwnPropertyNames(o);
    t === !0 && !i ? s.sort() : typeof t == "function" && s.sort(t);
    for (let l of s)
      if (Ex.call(o, l)) {
        let c = Ma(o, l);
        yield {
          name: l || '""',
          data: c
        };
      } else if (e) {
        let c;
        try {
          c = Ma(o, l);
        } catch {
        }
        c !== void 0 && (yield {
          name: l,
          data: c,
          isNonenumerable: !0
        });
      }
    e && o !== Object.prototype && (yield {
      name: "__proto__",
      data: Object.getPrototypeOf(o),
      isNonenumerable: !0
    });
  }
}, "objectIterator"), "createIterator"), Tx = /* @__PURE__ */ a(({ depth: e, name: t, data: r, isNonenumerable: o }) => e === 0 ? /* @__PURE__ */ Da.
createElement(Sx, {
  name: t,
  data: r
}) : /* @__PURE__ */ Da.createElement(Cx, {
  name: t,
  data: r,
  isNonenumerable: o
}), "defaultNodeRenderer"), Ax = /* @__PURE__ */ a(({ showNonenumerable: e = !1, sortObjectKeys: t, nodeRenderer: r, ...o }) => {
  let n = wx(e, t), i = r || Tx;
  return /* @__PURE__ */ Da.createElement(Pp, {
    nodeRenderer: i,
    dataIterator: n,
    ...o
  });
}, "ObjectInspector"), kx = Ha(Ax);
function Ix(e) {
  if (typeof e == "object") {
    let t = [];
    if (Array.isArray(e)) {
      let o = e.length;
      t = [...Array(o).keys()];
    } else e !== null && (t = Object.keys(e));
    let r = t.reduce((o, n) => {
      let i = e[n];
      return typeof i == "object" && i !== null && Object.keys(i).reduce((l, c) => (l.includes(c) || l.push(c), l), o), o;
    }, []);
    return {
      rowHeaders: t,
      colHeaders: r
    };
  }
}
a(Ix, "getHeaders");
var Px = /* @__PURE__ */ a(({ rows: e, columns: t, rowsData: r }) => {
  let o = Pe("TableInspectorDataContainer"), n = Pe("TableInspectorLeftBorder");
  return /* @__PURE__ */ Qe.createElement("div", {
    style: o.div
  }, /* @__PURE__ */ Qe.createElement("table", {
    style: o.table
  }, /* @__PURE__ */ Qe.createElement("colgroup", null), /* @__PURE__ */ Qe.createElement("tbody", null, e.map((i, s) => /* @__PURE__ */ Qe.
  createElement("tr", {
    key: i,
    style: o.tr
  }, /* @__PURE__ */ Qe.createElement("td", {
    style: { ...o.td, ...n.none }
  }, i), t.map((l) => {
    let c = r[s];
    return typeof c == "object" && c !== null && Lp.call(c, l) ? /* @__PURE__ */ Qe.createElement("td", {
      key: l,
      style: { ...o.td, ...n.solid }
    }, /* @__PURE__ */ Qe.createElement(Cr, {
      object: c[l]
    })) : /* @__PURE__ */ Qe.createElement("td", {
      key: l,
      style: { ...o.td, ...n.solid }
    });
  }))))));
}, "DataContainer"), Nx = /* @__PURE__ */ a((e) => /* @__PURE__ */ Xt.createElement("div", {
  style: {
    position: "absolute",
    top: 1,
    right: 0,
    bottom: 1,
    display: "flex",
    alignItems: "center"
  }
}, e.children), "SortIconContainer"), _x = /* @__PURE__ */ a(({ sortAscending: e }) => {
  let t = Pe("TableInspectorSortIcon"), r = e ? "\u25B2" : "\u25BC";
  return /* @__PURE__ */ Xt.createElement("div", {
    style: t
  }, r);
}, "SortIcon"), Cp = /* @__PURE__ */ a(({
  sortAscending: e = !1,
  sorted: t = !1,
  onClick: r = void 0,
  borderStyle: o = {},
  children: n,
  ...i
}) => {
  let s = Pe("TableInspectorTH"), [l, c] = Lx(!1), u = Sp(() => c(!0), []), d = Sp(() => c(!1), []);
  return /* @__PURE__ */ Xt.createElement("th", {
    ...i,
    style: {
      ...s.base,
      ...o,
      ...l ? s.base[":hover"] : {}
    },
    onMouseEnter: u,
    onMouseLeave: d,
    onClick: r
  }, /* @__PURE__ */ Xt.createElement("div", {
    style: s.div
  }, n), t && /* @__PURE__ */ Xt.createElement(Nx, null, /* @__PURE__ */ Xt.createElement(_x, {
    sortAscending: e
  })));
}, "TH"), Dx = /* @__PURE__ */ a(({
  indexColumnText: e = "(index)",
  columns: t = [],
  sorted: r,
  sortIndexColumn: o,
  sortColumn: n,
  sortAscending: i,
  onTHClick: s,
  onIndexTHClick: l
}) => {
  let c = Pe("TableInspectorHeaderContainer"), u = Pe("TableInspectorLeftBorder");
  return /* @__PURE__ */ Yt.createElement("div", {
    style: c.base
  }, /* @__PURE__ */ Yt.createElement("table", {
    style: c.table
  }, /* @__PURE__ */ Yt.createElement("tbody", null, /* @__PURE__ */ Yt.createElement("tr", null, /* @__PURE__ */ Yt.createElement(Cp, {
    borderStyle: u.none,
    sorted: r && o,
    sortAscending: i,
    onClick: l
  }, e), t.map((d) => /* @__PURE__ */ Yt.createElement(Cp, {
    borderStyle: u.solid,
    key: d,
    sorted: r && n === d,
    sortAscending: i,
    onClick: s.bind(null, d)
  }, d))))));
}, "HeaderContainer"), Bx = /* @__PURE__ */ a(({
  data: e,
  columns: t
}) => {
  let r = Pe("TableInspector"), [{ sorted: o, sortIndexColumn: n, sortColumn: i, sortAscending: s }, l] = Ox({
    sorted: !1,
    sortIndexColumn: !1,
    sortColumn: void 0,
    sortAscending: !1
  }), c = Ep(() => {
    l(({ sortIndexColumn: f, sortAscending: h }) => ({
      sorted: !0,
      sortIndexColumn: !0,
      sortColumn: void 0,
      sortAscending: f ? !h : !0
    }));
  }, []), u = Ep((f) => {
    l(({ sortColumn: h, sortAscending: b }) => ({
      sorted: !0,
      sortIndexColumn: !1,
      sortColumn: f,
      sortAscending: f === h ? !b : !0
    }));
  }, []);
  if (typeof e != "object" || e === null)
    return /* @__PURE__ */ No.createElement("div", null);
  let { rowHeaders: d, colHeaders: g } = Ix(e);
  t !== void 0 && (g = t);
  let p = d.map((f) => e[f]), m;
  if (i !== void 0 ? m = p.map((f, h) => typeof f == "object" && f !== null ? [f[i], h] : [void 0, h]) : n && (m = d.map((f, h) => [d[h], h])),
  m !== void 0) {
    let f = /* @__PURE__ */ a((b, y) => (x, v) => {
      let S = b(x), w = b(v), E = typeof S, I = typeof w, D = /* @__PURE__ */ a((z, W) => z < W ? -1 : z > W ? 1 : 0, "lt"), _;
      if (E === I)
        _ = D(S, w);
      else {
        let z = {
          string: 0,
          number: 1,
          object: 2,
          symbol: 3,
          boolean: 4,
          undefined: 5,
          function: 6
        };
        _ = D(z[E], z[I]);
      }
      return y || (_ = -_), _;
    }, "comparator"), h = m.sort(f((b) => b[0], s)).map((b) => b[1]);
    d = h.map((b) => d[b]), p = h.map((b) => p[b]);
  }
  return /* @__PURE__ */ No.createElement("div", {
    style: r.base
  }, /* @__PURE__ */ No.createElement(Dx, {
    columns: g,
    sorted: o,
    sortIndexColumn: n,
    sortColumn: i,
    sortAscending: s,
    onTHClick: u,
    onIndexTHClick: c
  }), /* @__PURE__ */ No.createElement(Px, {
    rows: d,
    columns: g,
    rowsData: p
  }));
}, "TableInspector"), Mx = Ha(Bx), jx = 80, Np = /* @__PURE__ */ a((e) => e.childNodes.length === 0 || e.childNodes.length === 1 && e.childNodes[0].
nodeType === Node.TEXT_NODE && e.textContent.length < jx, "shouldInline"), Rx = /* @__PURE__ */ a(({ tagName: e, attributes: t, styles: r }) => /* @__PURE__ */ oe.
createElement("span", {
  style: r.base
}, "<", /* @__PURE__ */ oe.createElement("span", {
  style: r.tagName
}, e), (() => {
  if (t) {
    let o = [];
    for (let n = 0; n < t.length; n++) {
      let i = t[n];
      o.push(/* @__PURE__ */ oe.createElement("span", {
        key: n
      }, " ", /* @__PURE__ */ oe.createElement("span", {
        style: r.htmlAttributeName
      }, i.name), '="', /* @__PURE__ */ oe.createElement("span", {
        style: r.htmlAttributeValue
      }, i.value), '"'));
    }
    return o;
  }
})(), ">"), "OpenTag"), wp = /* @__PURE__ */ a(({ tagName: e, isChildNode: t = !1, styles: r }) => /* @__PURE__ */ oe.createElement("span", {
  style: Object.assign({}, r.base, t && r.offsetLeft)
}, "</", /* @__PURE__ */ oe.createElement("span", {
  style: r.tagName
}, e), ">"), "CloseTag"), Hx = {
  1: "ELEMENT_NODE",
  3: "TEXT_NODE",
  7: "PROCESSING_INSTRUCTION_NODE",
  8: "COMMENT_NODE",
  9: "DOCUMENT_NODE",
  10: "DOCUMENT_TYPE_NODE",
  11: "DOCUMENT_FRAGMENT_NODE"
}, Vx = /* @__PURE__ */ a(({ isCloseTag: e, data: t, expanded: r }) => {
  let o = Pe("DOMNodePreview");
  if (e)
    return /* @__PURE__ */ oe.createElement(wp, {
      styles: o.htmlCloseTag,
      isChildNode: !0,
      tagName: t.tagName
    });
  switch (t.nodeType) {
    case Node.ELEMENT_NODE:
      return /* @__PURE__ */ oe.createElement("span", null, /* @__PURE__ */ oe.createElement(Rx, {
        tagName: t.tagName,
        attributes: t.attributes,
        styles: o.htmlOpenTag
      }), Np(t) ? t.textContent : !r && "\u2026", !r && /* @__PURE__ */ oe.createElement(wp, {
        tagName: t.tagName,
        styles: o.htmlCloseTag
      }));
    case Node.TEXT_NODE:
      return /* @__PURE__ */ oe.createElement("span", null, t.textContent);
    case Node.CDATA_SECTION_NODE:
      return /* @__PURE__ */ oe.createElement("span", null, "<![CDATA[" + t.textContent + "]]>");
    case Node.COMMENT_NODE:
      return /* @__PURE__ */ oe.createElement("span", {
        style: o.htmlComment
      }, "<!--", t.textContent, "-->");
    case Node.PROCESSING_INSTRUCTION_NODE:
      return /* @__PURE__ */ oe.createElement("span", null, t.nodeName);
    case Node.DOCUMENT_TYPE_NODE:
      return /* @__PURE__ */ oe.createElement("span", {
        style: o.htmlDoctype
      }, "<!DOCTYPE ", t.name, t.publicId ? ` PUBLIC "${t.publicId}"` : "", !t.publicId && t.systemId ? " SYSTEM" : "", t.systemId ? ` "${t.
      systemId}"` : "", ">");
    case Node.DOCUMENT_NODE:
      return /* @__PURE__ */ oe.createElement("span", null, t.nodeName);
    case Node.DOCUMENT_FRAGMENT_NODE:
      return /* @__PURE__ */ oe.createElement("span", null, t.nodeName);
    default:
      return /* @__PURE__ */ oe.createElement("span", null, Hx[t.nodeType]);
  }
}, "DOMNodePreview"), zx = /* @__PURE__ */ a(function* (e) {
  if (e && e.childNodes) {
    if (Np(e))
      return;
    for (let r = 0; r < e.childNodes.length; r++) {
      let o = e.childNodes[r];
      o.nodeType === Node.TEXT_NODE && o.textContent.trim().length === 0 || (yield {
        name: `${o.tagName}[${r}]`,
        data: o
      });
    }
    e.tagName && (yield {
      name: "CLOSE_TAG",
      data: {
        tagName: e.tagName
      },
      isCloseTag: !0
    });
  }
}, "domIterator"), $x = /* @__PURE__ */ a((e) => /* @__PURE__ */ Fx.createElement(Pp, {
  nodeRenderer: Vx,
  dataIterator: zx,
  ...e
}), "DOMInspector"), Ux = Ha($x), qx = ex(ox()), _p = /* @__PURE__ */ a(({ table: e = !1, data: t, ...r }) => e ? /* @__PURE__ */ _a.createElement(
Mx, {
  data: t,
  ...r
}) : (0, qx.default)(t) ? /* @__PURE__ */ _a.createElement(Ux, {
  data: t,
  ...r
}) : /* @__PURE__ */ _a.createElement(kx, {
  data: t,
  ...r
}), "Inspector");

// src/actions/components/ActionLogger/index.tsx
import { styled as Zx, withTheme as Qx } from "storybook/theming";

// src/actions/components/ActionLogger/style.tsx
import { styled as za } from "storybook/theming";
var Dp = za.div({
  display: "flex",
  padding: 0,
  borderLeft: "5px solid transparent",
  borderBottom: "1px solid transparent",
  transition: "all 0.1s",
  alignItems: "flex-start",
  whiteSpace: "pre"
}), Bp = za.div(({ theme: e }) => ({
  backgroundColor: wt(0.5, e.appBorderColor),
  color: e.color.inverseText,
  fontSize: e.typography.size.s1,
  fontWeight: e.typography.weight.bold,
  lineHeight: 1,
  padding: "1px 5px",
  borderRadius: 20,
  margin: "2px 0px"
})), Mp = za.div({
  flex: 1,
  padding: "0 0 0 5px"
});

// src/actions/components/ActionLogger/index.tsx
var Fp = Gx(
  ({ children: e, className: t }, r) => /* @__PURE__ */ et.createElement(Xx, { ref: r, horizontal: !0, vertical: !0, className: t }, e)
);
Fp.displayName = "UnstyledWrapped";
var e1 = Zx(Fp)({
  margin: 0,
  padding: "10px 5px 20px"
}), t1 = Qx(({ theme: e, ...t }) => /* @__PURE__ */ et.createElement(_p, { theme: e.addonActionsTheme || "chromeLight", table: !1, ...t })),
jp = /* @__PURE__ */ a(({ actions: e, onClear: t }) => {
  let r = Kx(null), o = r.current, n = o && o.scrollHeight - o.scrollTop === o.clientHeight;
  return Jx(() => {
    n && (r.current.scrollTop = r.current.scrollHeight);
  }, [n, e.length]), /* @__PURE__ */ et.createElement(Wx, null, /* @__PURE__ */ et.createElement(e1, { ref: r }, e.map((i) => /* @__PURE__ */ et.
  createElement(Dp, { key: i.id }, i.count > 1 && /* @__PURE__ */ et.createElement(Bp, null, i.count), /* @__PURE__ */ et.createElement(Mp, null,
  /* @__PURE__ */ et.createElement(
    t1,
    {
      sortObjectKeys: !0,
      showNonenumerable: !1,
      name: i.data.name,
      data: i.data.args ?? i.data
    }
  ))))), /* @__PURE__ */ et.createElement(Yx, { actionItems: [{ title: "Clear", onClick: t }] }));
}, "ActionLogger");

// src/actions/containers/ActionLogger/index.tsx
var n1 = /* @__PURE__ */ a((e, t) => {
  try {
    return $e(e, t);
  } catch {
    return !1;
  }
}, "safeDeepEqual"), $a = class $a extends o1 {
  constructor(r) {
    super(r);
    this.handleStoryChange = /* @__PURE__ */ a(() => {
      let { actions: r } = this.state;
      r.length > 0 && r[0].options.clearOnStoryChange && this.clearActions();
    }, "handleStoryChange");
    this.addAction = /* @__PURE__ */ a((r) => {
      this.setState((o) => {
        let n = [...o.actions], i = n.length && n[n.length - 1];
        return i && n1(i.data, r.data) ? i.count++ : (r.count = 1, n.push(r)), { actions: n.slice(0, r.options.limit) };
      });
    }, "addAction");
    this.clearActions = /* @__PURE__ */ a(() => {
      let { api: r } = this.props;
      r.emit(Lo), this.setState({ actions: [] });
    }, "clearActions");
    this.mounted = !1, this.state = { actions: [] };
  }
  componentDidMount() {
    this.mounted = !0;
    let { api: r } = this.props;
    r.on(xr, this.addAction), r.on(Rp, this.handleStoryChange);
  }
  componentWillUnmount() {
    this.mounted = !1;
    let { api: r } = this.props;
    r.off(Rp, this.handleStoryChange), r.off(xr, this.addAction);
  }
  render() {
    let { actions: r = [] } = this.state, { active: o } = this.props, n = {
      actions: r,
      onClear: this.clearActions
    };
    return o ? /* @__PURE__ */ r1.createElement(jp, { ...n }) : null;
  }
};
a($a, "ActionLogger");
var wr = $a;

// src/actions/manager.tsx
var Vp = Hp.register(Lt, (e) => {
  globalThis?.FEATURES?.actions && Hp.add(Po, {
    title: bp,
    type: i1.PANEL,
    render: /* @__PURE__ */ a(({ active: t }) => /* @__PURE__ */ a1.createElement(wr, { api: e, active: !!t }), "render"),
    paramKey: hp
  });
});

// src/component-testing/manager.tsx
import nn from "react";
import { AddonPanel as AS } from "storybook/internal/components";
import { Consumer as kS, addons as Id, types as OS } from "storybook/manager-api";

// src/component-testing/components/Panel.tsx
import Td, { Fragment as uS, memo as dS, useEffect as Ei, useMemo as Ad, useRef as Si, useState as Ci } from "react";
import {
  FORCE_REMOUNT as fS,
  PLAY_FUNCTION_THREW_EXCEPTION as mS,
  STORY_RENDER_PHASE_CHANGED as gS,
  STORY_THREW_EXCEPTION as hS,
  UNHANDLED_ERRORS_WHILE_PLAYING as bS
} from "storybook/internal/core-events";
import { global as wi } from "@storybook/global";
import {
  experimental_useStatusStore as yS,
  useAddonState as xS,
  useChannel as vS,
  useParameter as ES
} from "storybook/manager-api";

// src/component-testing/constants.ts
var Nt = "storybook/interactions", Zt = `${Nt}/panel`, s1 = "writing-tests/integrations/vitest-addon", zp = `${s1}#what-happens-when-there-a\
re-different-test-results-in-multiple-environments`, $p = "writing-stories/play-function#writing-stories-with-the-play-function", ve = "inte\
rnal_render_call";

// ../addons/a11y/src/constants.ts
var gt = "storybook/a11y", l1 = `${gt}/panel`;
var PN = `${gt}/result`, LN = `${gt}/request`, NN = `${gt}/running`, _N = `${gt}/error`, DN = `${gt}/manual`, BN = `${gt}/select`, c1 = "wri\
ting-tests/accessibility-testing", MN = `${c1}#why-are-my-tests-failing-in-different-environments`;

// ../addons/vitest/src/constants.ts
var Up = "storybook/test", jN = `${Up}/test-provider`, qp = "STORYBOOK_ADDON_TEST_CHANNEL";
var p1 = "writing-tests/integrations/vitest-addon", RN = `${p1}#what-happens-if-vitest-itself-has-an-error`;
var u1 = {
  id: Up,
  initialState: {
    config: {
      coverage: !1,
      a11y: !1
    },
    watching: !1,
    cancelling: !1,
    fatalError: void 0,
    indexUrl: void 0,
    previewAnnotations: [],
    currentRun: {
      triggeredBy: void 0,
      config: {
        coverage: !1,
        a11y: !1
      },
      componentTestCount: {
        success: 0,
        error: 0
      },
      a11yCount: {
        success: 0,
        warning: 0,
        error: 0
      },
      storyIds: void 0,
      totalTestCount: void 0,
      startedAt: void 0,
      finishedAt: void 0,
      unhandledErrors: [],
      coverageSummary: void 0
    }
  }
};
var HN = `UNIVERSAL_STORE:${u1.id}`;
var Wp = "storybook/component-test";

// src/instrumenter/EVENTS.ts
var ht = {
  CALL: "storybook/instrumenter/call",
  SYNC: "storybook/instrumenter/sync",
  START: "storybook/instrumenter/start",
  BACK: "storybook/instrumenter/back",
  GOTO: "storybook/instrumenter/goto",
  NEXT: "storybook/instrumenter/next",
  END: "storybook/instrumenter/end"
};

// src/component-testing/components/InteractionsPanel.tsx
import * as Q from "react";
import { styled as er } from "storybook/theming";

// src/component-testing/utils.ts
var Su = Ce(Eu(), 1);
import { useTheme as G1 } from "storybook/theming";

// ../node_modules/ansi-regex/index.js
function Ya({ onlyFirst: e = !1 } = {}) {
  let r = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u00\
9C))",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
  ].join("|");
  return new RegExp(r, e ? void 0 : "g");
}
a(Ya, "ansiRegex");

// ../node_modules/strip-ansi/index.js
var W1 = Ya();
function Xa(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
  return e.replace(W1, "");
}
a(Xa, "stripAnsi");

// src/component-testing/utils.ts
function Cu(e) {
  return Za(e) || Qa(e);
}
a(Cu, "isTestAssertionError");
function Za(e) {
  return e && typeof e == "object" && "name" in e && typeof e.name == "string" && e.name === "AssertionError";
}
a(Za, "isChaiError");
function Qa(e) {
  return e && typeof e == "object" && "message" in e && typeof e.message == "string" && Xa(e.message).startsWith("expect(");
}
a(Qa, "isJestError");
function J1(e) {
  return new Su.default({
    escapeXML: !0,
    fg: e.color.defaultText,
    bg: e.background.content
  });
}
a(J1, "createAnsiToHtmlFilter");
function Qt() {
  let e = G1();
  return J1(e);
}
a(Qt, "useAnsiToHtmlFilter");

// src/component-testing/components/DetachedDebuggerMessage.tsx
import wu from "react";
import { Link as K1 } from "storybook/internal/components";
import { styled as Y1 } from "storybook/theming";
var X1 = Y1.div(({ theme: { color: e, typography: t, background: r } }) => ({
  textAlign: "start",
  padding: "11px 15px",
  fontSize: `${t.size.s2 - 1}px`,
  fontWeight: t.weight.regular,
  lineHeight: "1rem",
  background: r.app,
  borderBottom: `1px solid ${e.border}`,
  color: e.defaultText,
  backgroundClip: "padding-box",
  position: "relative"
})), Tu = /* @__PURE__ */ a(({ storyUrl: e }) => /* @__PURE__ */ wu.createElement(X1, null, "Debugger controls are not available on composed\
 Storybooks.", " ", /* @__PURE__ */ wu.createElement(
  K1,
  {
    href: `${e}&addonPanel=${Zt}`,
    target: "_blank",
    rel: "noopener noreferrer",
    withArrow: !0
  },
  "Open in external Storybook"
)), "DetachedDebuggerMessage");

// src/component-testing/components/EmptyState.tsx
import Dt, { useEffect as Z1, useState as Q1 } from "react";
import { EmptyTabContent as ev, Link as tv } from "storybook/internal/components";
import { DocumentIcon as rv } from "@storybook/icons";
import { useStorybookApi as ov } from "storybook/manager-api";
import { styled as nv } from "storybook/theming";
var av = nv.div(({ theme: e }) => ({
  display: "flex",
  fontSize: e.typography.size.s2 - 1,
  gap: 25
})), Au = /* @__PURE__ */ a(() => {
  let [e, t] = Q1(!0), o = ov().getDocsUrl({
    subpath: $p,
    versioned: !0,
    renderer: !0
  });
  return Z1(() => {
    let n = setTimeout(() => {
      t(!1);
    }, 100);
    return () => clearTimeout(n);
  }, []), e ? null : /* @__PURE__ */ Dt.createElement("div", null, /* @__PURE__ */ Dt.createElement(
    ev,
    {
      title: "Interactions",
      description: /* @__PURE__ */ Dt.createElement(Dt.Fragment, null, "Interactions allow you to verify the functional aspects of UIs. Writ\
e a play function for your story and you'll see it run here."),
      footer: /* @__PURE__ */ Dt.createElement(av, null, /* @__PURE__ */ Dt.createElement(tv, { href: o, target: "_blank", withArrow: !0 }, /* @__PURE__ */ Dt.
      createElement(rv, null), " Read docs"))
    }
  ));
}, "Empty");

// src/component-testing/components/Interaction.tsx
import * as J from "react";
import { IconButton as xE, TooltipNote as vE, WithTooltip as EE } from "storybook/internal/components";
import { ListUnorderedIcon as SE } from "@storybook/icons";
import { styled as He, typography as Qo } from "storybook/theming";

// src/component-testing/components/MatcherResult.tsx
import X from "react";
import { styled as fd, typography as cE } from "storybook/theming";

// src/component-testing/components/MethodCall.tsx
import C, { Fragment as Vv } from "react";
import { logger as zv } from "storybook/internal/client-logger";

// ../node_modules/@devtools-ds/object-inspector/dist/esm/ObjectInspector.js
var sd = Ce(Uo()), ld = Ce(qo());
import di, { useEffect as Rv, useState as Hv } from "react";

// ../node_modules/clsx/dist/clsx.m.js
function ri(e) {
  var t, r, o = "";
  if (e)
    if (typeof e == "object")
      if (Array.isArray(e))
        for (t = 0; t < e.length; t++)
          e[t] && (r = ri(e[t])) && (o && (o += " "), o += r);
      else
        for (t in e)
          e[t] && (r = ri(t)) && (o && (o += " "), o += r);
    else typeof e != "boolean" && !e.call && (o && (o += " "), o += e);
  return o;
}
a(ri, "toVal");
function me() {
  for (var e = 0, t, r = ""; e < arguments.length; )
    (t = ri(arguments[e++])) && (r && (r += " "), r += t);
  return r;
}
a(me, "default");

// ../node_modules/@devtools-ds/object-parser/dist/esm/index.js
var oi = /* @__PURE__ */ a((e) => Array.isArray(e) || // Detect https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
ArrayBuffer.isView(e) && !(e instanceof DataView), "isArray"), ni = /* @__PURE__ */ a((e) => e !== null && typeof e == "object" && !oi(e) &&
!(e instanceof Date) && !(e instanceof RegExp) && !(e instanceof Error) && !(e instanceof WeakMap) && !(e instanceof WeakSet), "isObject"), cv = /* @__PURE__ */ a(
(e) => ni(e) || oi(e) || typeof e == "function" || e instanceof Promise, "isKnownObject"), ai = /* @__PURE__ */ a((e) => {
  let t = /unique/;
  return Promise.race([e, t]).then((r) => r === t ? ["pending"] : ["fulfilled", r], (r) => ["rejected", r]);
}, "getPromiseState"), Ge = /* @__PURE__ */ a(async (e, t, r, o, n, i) => {
  let s = {
    key: e,
    depth: r,
    value: t,
    type: "value",
    parent: void 0
  };
  if (t && cv(t) && r < 100) {
    let l = [], c = "object";
    if (oi(t)) {
      for (let u = 0; u < t.length; u++)
        l.push(async () => {
          let d = await Ge(u.toString(), t[u], r + 1, o);
          return d.parent = s, d;
        });
      c = "array";
    } else {
      let u = Object.getOwnPropertyNames(t);
      o && u.sort();
      for (let d = 0; d < u.length; d++) {
        let g;
        try {
          g = t[u[d]];
        } catch {
        }
        l.push(async () => {
          let p = await Ge(u[d], g, r + 1, o);
          return p.parent = s, p;
        });
      }
      if (typeof t == "function" && (c = "function"), t instanceof Promise) {
        let [d, g] = await ai(t);
        l.push(async () => {
          let p = await Ge("<state>", d, r + 1, o);
          return p.parent = s, p;
        }), d !== "pending" && l.push(async () => {
          let p = await Ge("<value>", g, r + 1, o);
          return p.parent = s, p;
        }), c = "promise";
      }
      if (t instanceof Map) {
        let g = Array.from(t.entries()).map((p) => {
          let [m, f] = p;
          return {
            "<key>": m,
            "<value>": f
          };
        });
        l.push(async () => {
          let p = await Ge("<entries>", g, r + 1, o);
          return p.parent = s, p;
        }), l.push(async () => {
          let p = await Ge("size", t.size, r + 1, o);
          return p.parent = s, p;
        }), c = "map";
      }
      if (t instanceof Set) {
        let g = Array.from(t.entries()).map((p) => p[1]);
        l.push(async () => {
          let p = await Ge("<entries>", g, r + 1, o);
          return p.parent = s, p;
        }), l.push(async () => {
          let p = await Ge("size", t.size, r + 1, o);
          return p.parent = s, p;
        }), c = "set";
      }
    }
    t !== Object.prototype && i && l.push(async () => {
      let u = await Ge("<prototype>", Object.getPrototypeOf(t), r + 1, o, !0);
      return u.parent = s, u;
    }), s.type = c, s.children = l, s.isPrototype = n;
  }
  return s;
}, "buildAST"), Pu = /* @__PURE__ */ a((e, t, r) => Ge("root", e, 0, t === !1 ? t : !0, void 0, r === !1 ? r : !0), "parse");

// ../node_modules/@devtools-ds/themes/dist/esm/utils.js
var ii = Ce(Bu()), Hu = Ce(Ru());
import Wo from "react";
var hv = ["children"];
var si = /* @__PURE__ */ Wo.createContext({
  theme: "chrome",
  colorScheme: "light"
});
var Vu = /* @__PURE__ */ a((e) => {
  let {
    children: t
  } = e, r = (0, Hu.default)(e, hv), o = Wo.useContext(si);
  return /* @__PURE__ */ Wo.createElement(si.Provider, {
    value: (0, ii.default)((0, ii.default)({}, o), r)
  }, t);
}, "ThemeProvider"), xt = /* @__PURE__ */ a((e, t = {}) => {
  let r = Wo.useContext(si), o = e.theme || r.theme || "chrome", n = e.colorScheme || r.colorScheme || "light", i = me(t[o], t[n]);
  return {
    currentColorScheme: n,
    currentTheme: o,
    themeClass: i
  };
}, "useTheme");

// ../node_modules/@devtools-ds/object-inspector/dist/esm/ObjectInspectorItem.js
var pi = Ce(Wu());
import Or, { useEffect as Fv, useState as ad } from "react";

// ../node_modules/@devtools-ds/tree/dist/esm/index.js
var Jo = Ce(Gu()), Zu = Ce(Xu());
import ge, { useState as Av, useEffect as kv } from "react";

// ../node_modules/@devtools-ds/tree/dist/esm/TreeContext.js
import Cv from "react";
var wv = /* @__PURE__ */ Cv.createContext({
  isChild: !1,
  depth: 0,
  hasHover: !0
}), Go = wv;

// ../node_modules/@devtools-ds/tree/dist/esm/Tree.css.js
var Ee = { tree: "Tree-tree-fbbbe38", item: "Tree-item-353d6f3", group: "Tree-group-d3c3d8a", label: "Tree-label-d819155", focusWhite: "Tree\
-focusWhite-f1e00c2", arrow: "Tree-arrow-03ab2e7", hover: "Tree-hover-3cc4e5d", open: "Tree-open-3f1a336", dark: "Tree-dark-1b4aa00", chrome: "\
Tree-chrome-bcbcac6", light: "Tree-light-09174ee" };

// ../node_modules/@devtools-ds/tree/dist/esm/index.js
var Tv = ["theme", "hover", "colorScheme", "children", "label", "className", "onUpdate", "onSelect", "open"], Ar = /* @__PURE__ */ a((e) => {
  let {
    theme: t,
    hover: r,
    colorScheme: o,
    children: n,
    label: i,
    className: s,
    onUpdate: l,
    onSelect: c,
    open: u
  } = e, d = (0, Zu.default)(e, Tv), {
    themeClass: g,
    currentTheme: p
  } = xt({
    theme: t,
    colorScheme: o
  }, Ee), [m, f] = Av(u);
  kv(() => {
    f(u);
  }, [u]);
  let h = /* @__PURE__ */ a((T) => {
    f(T), l && l(T);
  }, "updateState"), b = ge.Children.count(n) > 0, y = /* @__PURE__ */ a((T, P) => {
    if (T.isSameNode(P || null)) return;
    let k = T.querySelector('[tabindex="-1"]');
    k?.focus(), T.setAttribute("aria-selected", "true"), P?.removeAttribute("aria-selected");
  }, "updateFocus"), x = /* @__PURE__ */ a((T, P) => {
    let k = T;
    for (; k && k.parentElement; ) {
      if (k.getAttribute("role") === P)
        return k;
      k = k.parentElement;
    }
    return null;
  }, "getParent"), v = /* @__PURE__ */ a((T) => {
    let P = x(T, "tree");
    return P ? Array.from(P.querySelectorAll("li")) : [];
  }, "getListElements"), S = /* @__PURE__ */ a((T) => {
    let P = x(T, "group"), k = P?.previousElementSibling;
    if (k && k.getAttribute("tabindex") === "-1") {
      let $ = k.parentElement, ze = T.parentElement;
      y($, ze);
    }
  }, "moveBack"), w = /* @__PURE__ */ a((T, P) => {
    let k = v(T);
    k.forEach(($) => {
      $.removeAttribute("aria-selected");
    }), P === "start" && k[0] && y(k[0]), P === "end" && k[k.length - 1] && y(k[k.length - 1]);
  }, "moveHome"), E = /* @__PURE__ */ a((T, P) => {
    let k = v(T) || [];
    for (let $ = 0; $ < k.length; $++) {
      let ze = k[$];
      if (ze.getAttribute("aria-selected") === "true") {
        P === "up" && k[$ - 1] ? y(k[$ - 1], ze) : P === "down" && k[$ + 1] && y(k[$ + 1], ze);
        return;
      }
    }
    y(k[0]);
  }, "moveFocusAdjacent"), I = /* @__PURE__ */ a((T, P) => {
    let k = T.target;
    (T.key === "Enter" || T.key === " ") && h(!m), T.key === "ArrowRight" && m && !P ? E(k, "down") : T.key === "ArrowRight" && h(!0), T.key ===
    "ArrowLeft" && (!m || P) ? S(k) : T.key === "ArrowLeft" && h(!1), T.key === "ArrowDown" && E(k, "down"), T.key === "ArrowUp" && E(k, "up"),
    T.key === "Home" && w(k, "start"), T.key === "End" && w(k, "end");
  }, "handleKeypress"), D = /* @__PURE__ */ a((T, P) => {
    let k = T.target, $ = x(k, "treeitem"), ze = v(k) || [], Oi = !1;
    for (let pn = 0; pn < ze.length; pn++) {
      let Ii = ze[pn];
      if (Ii.getAttribute("aria-selected") === "true") {
        $ && (Oi = !0, y($, Ii));
        break;
      }
    }
    !Oi && $ && y($), P || h(!m);
  }, "handleClick"), _ = /* @__PURE__ */ a((T) => {
    let P = T.currentTarget;
    !P.contains(document.activeElement) && P.getAttribute("role") === "tree" && P.setAttribute("tabindex", "0");
  }, "handleBlur"), z = /* @__PURE__ */ a((T) => {
    let P = T.target;
    if (P.getAttribute("role") === "tree") {
      let k = P.querySelector('[aria-selected="true"]');
      k ? y(k) : E(P, "down"), P.setAttribute("tabindex", "-1");
    }
  }, "handleFocus"), W = /* @__PURE__ */ a(() => {
    c?.();
  }, "handleButtonFocus"), ee = /* @__PURE__ */ a((T) => {
    let P = T * 0.9 + 0.3;
    return {
      paddingLeft: `${P}em`,
      width: `calc(100% - ${P}em)`
    };
  }, "getPaddingStyles"), {
    isChild: ce,
    depth: ne,
    hasHover: ae
  } = ge.useContext(Go), B = ae ? r : !1;
  if (!ce)
    return /* @__PURE__ */ ge.createElement("ul", (0, Jo.default)({
      role: "tree",
      tabIndex: 0,
      className: me(Ee.tree, Ee.group, g, s),
      onFocus: z,
      onBlur: _
    }, d), /* @__PURE__ */ ge.createElement(Go.Provider, {
      value: {
        isChild: !0,
        depth: 0,
        hasHover: B
      }
    }, /* @__PURE__ */ ge.createElement(Ar, e)));
  if (!b)
    return /* @__PURE__ */ ge.createElement("li", (0, Jo.default)({
      role: "treeitem",
      className: Ee.item
    }, d), /* @__PURE__ */ ge.createElement("div", {
      role: "button",
      className: me(Ee.label, {
        [Ee.hover]: B,
        [Ee.focusWhite]: p === "firefox"
      }),
      tabIndex: -1,
      style: ee(ne),
      onKeyDown: /* @__PURE__ */ a((T) => {
        I(T, ce);
      }, "onKeyDown"),
      onClick: /* @__PURE__ */ a((T) => D(T, !0), "onClick"),
      onFocus: W
    }, /* @__PURE__ */ ge.createElement("span", null, i)));
  let R = me(Ee.arrow, {
    [Ee.open]: m
  });
  return /* @__PURE__ */ ge.createElement("li", {
    role: "treeitem",
    "aria-expanded": m,
    className: Ee.item
  }, /* @__PURE__ */ ge.createElement("div", {
    role: "button",
    tabIndex: -1,
    className: me(Ee.label, {
      [Ee.hover]: B,
      [Ee.focusWhite]: p === "firefox"
    }),
    style: ee(ne),
    onClick: /* @__PURE__ */ a((T) => D(T), "onClick"),
    onKeyDown: /* @__PURE__ */ a((T) => I(T), "onKeyDown"),
    onFocus: W
  }, /* @__PURE__ */ ge.createElement("span", null, /* @__PURE__ */ ge.createElement("span", {
    "aria-hidden": !0,
    className: R
  }), /* @__PURE__ */ ge.createElement("span", null, i))), /* @__PURE__ */ ge.createElement("ul", (0, Jo.default)({
    role: "group",
    className: me(s, Ee.group)
  }, d), m && ge.Children.map(n, (T) => /* @__PURE__ */ ge.createElement(Go.Provider, {
    value: {
      isChild: !0,
      depth: ne + 1,
      hasHover: B
    }
  }, T))));
}, "Tree");
Ar.defaultProps = {
  open: !1,
  hover: !0
};

// ../node_modules/@devtools-ds/object-inspector/dist/esm/ObjectValue.js
var Qu = Ce(Uo()), ed = Ce(qo());
import tt, { useState as Iv, useEffect as Pv } from "react";

// ../node_modules/@devtools-ds/object-inspector/dist/esm/ObjectInspector.css.js
var U = { "object-inspector": "ObjectInspector-object-inspector-0c33e82", objectInspector: "ObjectInspector-object-inspector-0c33e82", "obje\
ct-label": "ObjectInspector-object-label-b81482b", objectLabel: "ObjectInspector-object-label-b81482b", text: "ObjectInspector-text-25f57f3",
key: "ObjectInspector-key-4f712bb", value: "ObjectInspector-value-f7ec2e5", string: "ObjectInspector-string-c496000", regex: "ObjectInspecto\
r-regex-59d45a3", error: "ObjectInspector-error-b818698", boolean: "ObjectInspector-boolean-2dd1642", number: "ObjectInspector-number-a6daab\
b", undefined: "ObjectInspector-undefined-3a68263", null: "ObjectInspector-null-74acb50", function: "ObjectInspector-function-07bbdcd", "fun\
ction-decorator": "ObjectInspector-function-decorator-3d22c24", functionDecorator: "ObjectInspector-function-decorator-3d22c24", prototype: "\
ObjectInspector-prototype-f2449ee", dark: "ObjectInspector-dark-0c96c97", chrome: "ObjectInspector-chrome-2f3ca98", light: "ObjectInspector-\
light-78bef54" };

// ../node_modules/@devtools-ds/object-inspector/dist/esm/ObjectValue.js
var Ov = ["ast", "theme", "showKey", "colorScheme", "className"], ke = /* @__PURE__ */ a((e, t, r, o, n) => {
  let i = e.includes("-") ? `"${e}"` : e, s = n <= 0;
  return /* @__PURE__ */ tt.createElement("span", {
    className: U.text
  }, !s && o && /* @__PURE__ */ tt.createElement(tt.Fragment, null, /* @__PURE__ */ tt.createElement("span", {
    className: U.key
  }, i), /* @__PURE__ */ tt.createElement("span", null, ":\xA0")), /* @__PURE__ */ tt.createElement("span", {
    className: r
  }, t));
}, "buildValue"), td = /* @__PURE__ */ a((e) => {
  let {
    ast: t,
    theme: r,
    showKey: o,
    colorScheme: n,
    className: i
  } = e, s = (0, ed.default)(e, Ov), {
    themeClass: l
  } = xt({
    theme: r,
    colorScheme: n
  }, U), [c, u] = Iv(/* @__PURE__ */ tt.createElement("span", null)), d = /* @__PURE__ */ tt.createElement("span", null);
  return Pv(() => {
    t.value instanceof Promise && (/* @__PURE__ */ a(async (p) => {
      u(ke(t.key, `Promise { "${await ai(p)}" }`, U.key, o, t.depth));
    }, "waitForPromiseResult"))(t.value);
  }, [t, o]), typeof t.value == "number" || typeof t.value == "bigint" ? d = ke(t.key, String(t.value), U.number, o, t.depth) : typeof t.value ==
  "boolean" ? d = ke(t.key, String(t.value), U.boolean, o, t.depth) : typeof t.value == "string" ? d = ke(t.key, `"${t.value}"`, U.string, o,
  t.depth) : typeof t.value > "u" ? d = ke(t.key, "undefined", U.undefined, o, t.depth) : typeof t.value == "symbol" ? d = ke(t.key, t.value.
  toString(), U.string, o, t.depth) : typeof t.value == "function" ? d = ke(t.key, `${t.value.name}()`, U.key, o, t.depth) : typeof t.value ==
  "object" && (t.value === null ? d = ke(t.key, "null", U.null, o, t.depth) : Array.isArray(t.value) ? d = ke(t.key, `Array(${t.value.length}\
)`, U.key, o, t.depth) : t.value instanceof Date ? d = ke(t.key, `Date ${t.value.toString()}`, U.value, o, t.depth) : t.value instanceof RegExp ?
  d = ke(t.key, t.value.toString(), U.regex, o, t.depth) : t.value instanceof Error ? d = ke(t.key, t.value.toString(), U.error, o, t.depth) :
  ni(t.value) ? d = ke(t.key, "{\u2026}", U.key, o, t.depth) : d = ke(t.key, t.value.constructor.name, U.key, o, t.depth)), /* @__PURE__ */ tt.
  createElement("span", (0, Qu.default)({
    className: me(l, i)
  }, s), c, d);
}, "ObjectValue");
td.defaultProps = {
  showKey: !0
};
var Ko = td;

// ../node_modules/@devtools-ds/object-inspector/dist/esm/ObjectLabel.js
var Bt = Ce(Uo()), rd = Ce(qo());
import N from "react";
var Lv = ["ast", "theme", "previewMax", "open", "colorScheme", "className"], kr = /* @__PURE__ */ a((e, t, r) => {
  let o = [];
  for (let n = 0; n < e.length; n++) {
    let i = e[n];
    if (i.isPrototype || (o.push(/* @__PURE__ */ N.createElement(Ko, {
      key: i.key,
      ast: i,
      showKey: r
    })), n < e.length - 1 ? o.push(", ") : o.push(" ")), i.isPrototype && n === e.length - 1 && (o.pop(), o.push(" ")), n === t - 1 && e.length >
    t) {
      o.push("\u2026 ");
      break;
    }
  }
  return o;
}, "buildPreview"), Nv = /* @__PURE__ */ a((e, t, r, o) => {
  let n = e.value.length;
  return t ? /* @__PURE__ */ N.createElement("span", null, "Array(", n, ")") : /* @__PURE__ */ N.createElement(N.Fragment, null, /* @__PURE__ */ N.
  createElement("span", null, `${o === "firefox" ? "Array" : ""}(${n}) [ `), kr(e.children, r, !1), /* @__PURE__ */ N.createElement("span", null,
  "]"));
}, "getArrayLabel"), _v = /* @__PURE__ */ a((e, t, r, o) => e.isPrototype ? /* @__PURE__ */ N.createElement("span", null, `Object ${o === "f\
irefox" ? "{ \u2026 }" : ""}`) : t ? /* @__PURE__ */ N.createElement("span", null, "{\u2026}") : /* @__PURE__ */ N.createElement(N.Fragment,
null, /* @__PURE__ */ N.createElement("span", null, `${o === "firefox" ? "Object " : ""}{ `), kr(e.children, r, !0), /* @__PURE__ */ N.createElement(
"span", null, "}")), "getObjectLabel"), Dv = /* @__PURE__ */ a((e, t, r) => t ? /* @__PURE__ */ N.createElement("span", null, `Promise { "${String(
e.children[0].value)}" }`) : /* @__PURE__ */ N.createElement(N.Fragment, null, /* @__PURE__ */ N.createElement("span", null, "Promise { "), kr(
e.children, r, !0), /* @__PURE__ */ N.createElement("span", null, "}")), "getPromiseLabel"), Bv = /* @__PURE__ */ a((e, t, r, o) => {
  let {
    size: n
  } = e.value;
  return t ? /* @__PURE__ */ N.createElement("span", null, `Map(${n})`) : /* @__PURE__ */ N.createElement(N.Fragment, null, /* @__PURE__ */ N.
  createElement("span", null, `Map${o === "chrome" ? `(${n})` : ""} { `), kr(e.children, r, !0), /* @__PURE__ */ N.createElement("span", null,
  "}"));
}, "getMapLabel"), Mv = /* @__PURE__ */ a((e, t, r) => {
  let {
    size: o
  } = e.value;
  return t ? /* @__PURE__ */ N.createElement("span", null, "Set(", o, ")") : /* @__PURE__ */ N.createElement(N.Fragment, null, /* @__PURE__ */ N.
  createElement("span", null, `Set(${e.value.size}) {`), kr(e.children, r, !0), /* @__PURE__ */ N.createElement("span", null, "}"));
}, "getSetLabel"), od = /* @__PURE__ */ a((e) => {
  let {
    ast: t,
    theme: r,
    previewMax: o,
    open: n,
    colorScheme: i,
    className: s
  } = e, l = (0, rd.default)(e, Lv), {
    themeClass: c,
    currentTheme: u
  } = xt({
    theme: r,
    colorScheme: i
  }, U), d = t.isPrototype || !1, g = me(U.objectLabel, c, s, {
    [U.prototype]: d
  }), p = t.depth <= 0, m = /* @__PURE__ */ a(() => /* @__PURE__ */ N.createElement("span", {
    className: d ? U.prototype : U.key
  }, p ? "" : `${t.key}: `), "Key");
  return t.type === "array" ? /* @__PURE__ */ N.createElement("span", (0, Bt.default)({
    className: g
  }, l), /* @__PURE__ */ N.createElement(m, null), Nv(t, n, o, u)) : t.type === "function" ? /* @__PURE__ */ N.createElement("span", (0, Bt.default)(
  {
    className: g
  }, l), /* @__PURE__ */ N.createElement(m, null), u === "chrome" && /* @__PURE__ */ N.createElement("span", {
    className: U.functionDecorator
  }, "\u0192 "), /* @__PURE__ */ N.createElement("span", {
    className: me({
      [U.function]: !d
    })
  }, `${t.value.name}()`)) : t.type === "promise" ? /* @__PURE__ */ N.createElement("span", (0, Bt.default)({
    className: g
  }, l), /* @__PURE__ */ N.createElement(m, null), Dv(t, n, o)) : t.type === "map" ? /* @__PURE__ */ N.createElement("span", (0, Bt.default)(
  {
    className: g
  }, l), /* @__PURE__ */ N.createElement(m, null), Bv(t, n, o, u)) : t.type === "set" ? /* @__PURE__ */ N.createElement("span", (0, Bt.default)(
  {
    className: g
  }, l), /* @__PURE__ */ N.createElement(m, null), Mv(t, n, o)) : /* @__PURE__ */ N.createElement("span", (0, Bt.default)({
    className: g
  }, l), /* @__PURE__ */ N.createElement(m, null), _v(t, n, o, u));
}, "ObjectLabel");
od.defaultProps = {
  previewMax: 8,
  open: !1
};
var nd = od;

// ../node_modules/@devtools-ds/object-inspector/dist/esm/ObjectInspectorItem.js
var ui = /* @__PURE__ */ a((e) => {
  let {
    ast: t,
    expandLevel: r,
    depth: o
  } = e, [n, i] = ad(), [s, l] = ad(o < r);
  return Fv(() => {
    (/* @__PURE__ */ a(async () => {
      if (t.type !== "value") {
        let u = t.children.map((p) => p()), d = await Promise.all(u), g = (0, pi.default)((0, pi.default)({}, t), {}, {
          children: d
        });
        i(g);
      }
    }, "resolve"))();
  }, [t]), n ? /* @__PURE__ */ Or.createElement(Ar, {
    hover: !1,
    open: s,
    label: /* @__PURE__ */ Or.createElement(nd, {
      open: s,
      ast: n
    }),
    onSelect: /* @__PURE__ */ a(() => {
      var c;
      (c = e.onSelect) === null || c === void 0 || c.call(e, t);
    }, "onSelect"),
    onUpdate: /* @__PURE__ */ a((c) => {
      l(c);
    }, "onUpdate")
  }, n.children.map((c) => /* @__PURE__ */ Or.createElement(ui, {
    key: c.key,
    ast: c,
    depth: o + 1,
    expandLevel: r,
    onSelect: e.onSelect
  }))) : /* @__PURE__ */ Or.createElement(Ar, {
    hover: !1,
    label: /* @__PURE__ */ Or.createElement(Ko, {
      ast: t
    }),
    onSelect: /* @__PURE__ */ a(() => {
      var c;
      (c = e.onSelect) === null || c === void 0 || c.call(e, t);
    }, "onSelect")
  });
}, "ObjectInspectorItem");
ui.defaultProps = {
  expandLevel: 0,
  depth: 0
};
var id = ui;

// ../node_modules/@devtools-ds/object-inspector/dist/esm/ObjectInspector.js
var jv = ["data", "expandLevel", "sortKeys", "includePrototypes", "className", "theme", "colorScheme", "onSelect"], Yo = /* @__PURE__ */ a((e) => {
  let {
    data: t,
    expandLevel: r,
    sortKeys: o,
    includePrototypes: n,
    className: i,
    theme: s,
    colorScheme: l,
    onSelect: c
  } = e, u = (0, ld.default)(e, jv), [d, g] = Hv(void 0), {
    themeClass: p,
    currentTheme: m,
    currentColorScheme: f
  } = xt({
    theme: s,
    colorScheme: l
  }, U);
  return Rv(() => {
    (/* @__PURE__ */ a(async () => {
      g(await Pu(t, o, n));
    }, "runParser"))();
  }, [t, o, n]), /* @__PURE__ */ di.createElement("div", (0, sd.default)({
    className: me(U.objectInspector, i, p)
  }, u), d && /* @__PURE__ */ di.createElement(Vu, {
    theme: m,
    colorScheme: f
  }, /* @__PURE__ */ di.createElement(id, {
    ast: d,
    expandLevel: r,
    onSelect: c
  })));
}, "ObjectInspector");
Yo.defaultProps = {
  expandLevel: 0,
  sortKeys: !0,
  includePrototypes: !0
};

// src/component-testing/components/MethodCall.tsx
import { useTheme as fi } from "storybook/theming";
var $v = {
  base: "#444",
  nullish: "#7D99AA",
  string: "#16B242",
  number: "#5D40D0",
  boolean: "#f41840",
  objectkey: "#698394",
  instance: "#A15C20",
  function: "#EA7509",
  muted: "#7D99AA",
  tag: {
    name: "#6F2CAC",
    suffix: "#1F99E5"
  },
  date: "#459D9C",
  error: {
    name: "#D43900",
    message: "#444"
  },
  regex: {
    source: "#A15C20",
    flags: "#EA7509"
  },
  meta: "#EA7509",
  method: "#0271B6"
}, Uv = {
  base: "#eee",
  nullish: "#aaa",
  string: "#5FE584",
  number: "#6ba5ff",
  boolean: "#ff4191",
  objectkey: "#accfe6",
  instance: "#E3B551",
  function: "#E3B551",
  muted: "#aaa",
  tag: {
    name: "#f57bff",
    suffix: "#8EB5FF"
  },
  date: "#70D4D3",
  error: {
    name: "#f40",
    message: "#eee"
  },
  regex: {
    source: "#FAD483",
    flags: "#E3B551"
  },
  meta: "#FAD483",
  method: "#5EC1FF"
}, ue = /* @__PURE__ */ a(() => {
  let { base: e } = fi();
  return e === "dark" ? Uv : $v;
}, "useThemeColors"), qv = /[^A-Z0-9]/i, cd = /[\s.,…]+$/gm, pd = /* @__PURE__ */ a((e, t) => {
  if (e.length <= t)
    return e;
  for (let r = t - 1; r >= 0; r -= 1)
    if (qv.test(e[r]) && r > 10)
      return `${e.slice(0, r).replace(cd, "")}\u2026`;
  return `${e.slice(0, t).replace(cd, "")}\u2026`;
}, "ellipsize"), Wv = /* @__PURE__ */ a((e) => {
  try {
    return JSON.stringify(e, null, 1);
  } catch {
    return String(e);
  }
}, "stringify"), ud = /* @__PURE__ */ a((e, t) => e.flatMap(
  (r, o) => o === e.length - 1 ? [r] : [r, C.cloneElement(t, { key: `sep${o}` })]
), "interleave"), vt = /* @__PURE__ */ a(({
  value: e,
  nested: t,
  showObjectInspector: r,
  callsById: o,
  ...n
}) => {
  switch (!0) {
    case e === null:
      return /* @__PURE__ */ C.createElement(Gv, { ...n });
    case e === void 0:
      return /* @__PURE__ */ C.createElement(Jv, { ...n });
    case Array.isArray(e):
      return /* @__PURE__ */ C.createElement(Zv, { ...n, value: e, callsById: o });
    case typeof e == "string":
      return /* @__PURE__ */ C.createElement(Kv, { ...n, value: e });
    case typeof e == "number":
      return /* @__PURE__ */ C.createElement(Yv, { ...n, value: e });
    case typeof e == "boolean":
      return /* @__PURE__ */ C.createElement(Xv, { ...n, value: e });
    case Object.prototype.hasOwnProperty.call(e, "__date__"):
      return /* @__PURE__ */ C.createElement(oE, { ...n, ...e.__date__ });
    case Object.prototype.hasOwnProperty.call(e, "__error__"):
      return /* @__PURE__ */ C.createElement(nE, { ...n, ...e.__error__ });
    case Object.prototype.hasOwnProperty.call(e, "__regexp__"):
      return /* @__PURE__ */ C.createElement(aE, { ...n, ...e.__regexp__ });
    case Object.prototype.hasOwnProperty.call(e, "__function__"):
      return /* @__PURE__ */ C.createElement(tE, { ...n, ...e.__function__ });
    case Object.prototype.hasOwnProperty.call(e, "__symbol__"):
      return /* @__PURE__ */ C.createElement(iE, { ...n, ...e.__symbol__ });
    case Object.prototype.hasOwnProperty.call(e, "__element__"):
      return /* @__PURE__ */ C.createElement(rE, { ...n, ...e.__element__ });
    case Object.prototype.hasOwnProperty.call(e, "__class__"):
      return /* @__PURE__ */ C.createElement(eE, { ...n, ...e.__class__ });
    case Object.prototype.hasOwnProperty.call(e, "__callId__"):
      return /* @__PURE__ */ C.createElement(Xo, { call: o?.get(e.__callId__), callsById: o });
    case Object.prototype.toString.call(e) === "[object Object]":
      return /* @__PURE__ */ C.createElement(
        Qv,
        {
          value: e,
          showInspector: r,
          callsById: o,
          ...n
        }
      );
    default:
      return /* @__PURE__ */ C.createElement(sE, { value: e, ...n });
  }
}, "Node"), Gv = /* @__PURE__ */ a((e) => {
  let t = ue();
  return /* @__PURE__ */ C.createElement("span", { style: { color: t.nullish }, ...e }, "null");
}, "NullNode"), Jv = /* @__PURE__ */ a((e) => {
  let t = ue();
  return /* @__PURE__ */ C.createElement("span", { style: { color: t.nullish }, ...e }, "undefined");
}, "UndefinedNode"), Kv = /* @__PURE__ */ a(({ value: e, ...t }) => {
  let r = ue();
  return /* @__PURE__ */ C.createElement("span", { style: { color: r.string }, ...t }, JSON.stringify(pd(e, 50)));
}, "StringNode"), Yv = /* @__PURE__ */ a(({ value: e, ...t }) => {
  let r = ue();
  return /* @__PURE__ */ C.createElement("span", { style: { color: r.number }, ...t }, e);
}, "NumberNode"), Xv = /* @__PURE__ */ a(({ value: e, ...t }) => {
  let r = ue();
  return /* @__PURE__ */ C.createElement("span", { style: { color: r.boolean }, ...t }, String(e));
}, "BooleanNode"), Zv = /* @__PURE__ */ a(({
  value: e,
  nested: t = !1,
  callsById: r
}) => {
  let o = ue();
  if (t)
    return /* @__PURE__ */ C.createElement("span", { style: { color: o.base } }, "[\u2026]");
  let n = e.slice(0, 3).map((s, l) => /* @__PURE__ */ C.createElement(vt, { key: `${l}--${JSON.stringify(s)}`, value: s, nested: !0, callsById: r })),
  i = ud(n, /* @__PURE__ */ C.createElement("span", null, ", "));
  return e.length <= 3 ? /* @__PURE__ */ C.createElement("span", { style: { color: o.base } }, "[", i, "]") : /* @__PURE__ */ C.createElement(
  "span", { style: { color: o.base } }, "(", e.length, ") [", i, ", \u2026]");
}, "ArrayNode"), Qv = /* @__PURE__ */ a(({
  showInspector: e,
  value: t,
  callsById: r,
  nested: o = !1
}) => {
  let n = fi().base === "dark", i = ue();
  if (e)
    return /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement(
      Yo,
      {
        id: "interactions-object-inspector",
        data: t,
        includePrototypes: !1,
        colorScheme: n ? "dark" : "light"
      }
    ));
  if (o)
    return /* @__PURE__ */ C.createElement("span", { style: { color: i.base } }, "{\u2026}");
  let s = ud(
    Object.entries(t).slice(0, 2).map(([l, c]) => /* @__PURE__ */ C.createElement(Vv, { key: l }, /* @__PURE__ */ C.createElement("span", { style: {
    color: i.objectkey } }, l, ": "), /* @__PURE__ */ C.createElement(vt, { value: c, callsById: r, nested: !0 }))),
    /* @__PURE__ */ C.createElement("span", null, ", ")
  );
  return Object.keys(t).length <= 2 ? /* @__PURE__ */ C.createElement("span", { style: { color: i.base } }, "{ ", s, " }") : /* @__PURE__ */ C.
  createElement("span", { style: { color: i.base } }, "(", Object.keys(t).length, ") ", "{ ", s, ", \u2026 }");
}, "ObjectNode"), eE = /* @__PURE__ */ a(({ name: e }) => {
  let t = ue();
  return /* @__PURE__ */ C.createElement("span", { style: { color: t.instance } }, e);
}, "ClassNode"), tE = /* @__PURE__ */ a(({ name: e }) => {
  let t = ue();
  return e ? /* @__PURE__ */ C.createElement("span", { style: { color: t.function } }, e) : /* @__PURE__ */ C.createElement("span", { style: {
  color: t.nullish, fontStyle: "italic" } }, "anonymous");
}, "FunctionNode"), rE = /* @__PURE__ */ a(({
  prefix: e,
  localName: t,
  id: r,
  classNames: o = [],
  innerText: n
}) => {
  let i = e ? `${e}:${t}` : t, s = ue();
  return /* @__PURE__ */ C.createElement("span", { style: { wordBreak: "keep-all" } }, /* @__PURE__ */ C.createElement("span", { key: `${i}_\
lt`, style: { color: s.muted } }, "<"), /* @__PURE__ */ C.createElement("span", { key: `${i}_tag`, style: { color: s.tag.name } }, i), /* @__PURE__ */ C.
  createElement("span", { key: `${i}_suffix`, style: { color: s.tag.suffix } }, r ? `#${r}` : o.reduce((l, c) => `${l}.${c}`, "")), /* @__PURE__ */ C.
  createElement("span", { key: `${i}_gt`, style: { color: s.muted } }, ">"), !r && o.length === 0 && n && /* @__PURE__ */ C.createElement(C.
  Fragment, null, /* @__PURE__ */ C.createElement("span", { key: `${i}_text` }, n), /* @__PURE__ */ C.createElement("span", { key: `${i}_clo\
se_lt`, style: { color: s.muted } }, "<"), /* @__PURE__ */ C.createElement("span", { key: `${i}_close_tag`, style: { color: s.tag.name } }, "\
/", i), /* @__PURE__ */ C.createElement("span", { key: `${i}_close_gt`, style: { color: s.muted } }, ">")));
}, "ElementNode"), oE = /* @__PURE__ */ a(({ value: e }) => {
  let t = new Date(e);
  isNaN(Number(t)) && (zv.warn("Invalid date value:", e), t = null);
  let r = ue();
  if (!t)
    return /* @__PURE__ */ C.createElement("span", { style: { whiteSpace: "nowrap", color: r.date } }, "Invalid date");
  let [o, n, i] = t.toISOString().split(/[T.Z]/);
  return /* @__PURE__ */ C.createElement("span", { style: { whiteSpace: "nowrap", color: r.date } }, o, /* @__PURE__ */ C.createElement("spa\
n", { style: { opacity: 0.7 } }, "T"), n === "00:00:00" ? /* @__PURE__ */ C.createElement("span", { style: { opacity: 0.7 } }, n) : n, i ===
  "000" ? /* @__PURE__ */ C.createElement("span", { style: { opacity: 0.7 } }, ".", i) : `.${i}`, /* @__PURE__ */ C.createElement("span", { style: {
  opacity: 0.7 } }, "Z"));
}, "DateNode"), nE = /* @__PURE__ */ a(({ name: e, message: t }) => {
  let r = ue();
  return /* @__PURE__ */ C.createElement("span", { style: { color: r.error.name } }, e, t && ": ", t && /* @__PURE__ */ C.createElement("spa\
n", { style: { color: r.error.message }, title: t.length > 50 ? t : "" }, pd(t, 50)));
}, "ErrorNode"), aE = /* @__PURE__ */ a(({ flags: e, source: t }) => {
  let r = ue();
  return /* @__PURE__ */ C.createElement("span", { style: { whiteSpace: "nowrap", color: r.regex.flags } }, "/", /* @__PURE__ */ C.createElement(
  "span", { style: { color: r.regex.source } }, t), "/", e);
}, "RegExpNode"), iE = /* @__PURE__ */ a(({ description: e }) => {
  let t = ue();
  return /* @__PURE__ */ C.createElement("span", { style: { whiteSpace: "nowrap", color: t.instance } }, "Symbol(", e && /* @__PURE__ */ C.createElement(
  "span", { style: { color: t.meta } }, '"', e, '"'), ")");
}, "SymbolNode"), sE = /* @__PURE__ */ a(({ value: e }) => {
  let t = ue();
  return /* @__PURE__ */ C.createElement("span", { style: { color: t.meta } }, Wv(e));
}, "OtherNode"), lE = /* @__PURE__ */ a(({ label: e }) => {
  let t = ue(), { typography: r } = fi();
  return /* @__PURE__ */ C.createElement(
    "span",
    {
      style: {
        color: t.base,
        fontFamily: r.fonts.base,
        fontSize: r.size.s2 - 1
      }
    },
    e
  );
}, "StepNode"), Xo = /* @__PURE__ */ a(({
  call: e,
  callsById: t
}) => {
  if (!e)
    return null;
  if (e.method === "step" && e.path?.length === 0)
    return /* @__PURE__ */ C.createElement(lE, { label: e.args[0] });
  let r = e.path?.flatMap((i, s) => {
    let l = i.__callId__;
    return [
      l ? /* @__PURE__ */ C.createElement(Xo, { key: `elem${s}`, call: t?.get(l), callsById: t }) : /* @__PURE__ */ C.createElement("span", {
      key: `elem${s}` }, i),
      /* @__PURE__ */ C.createElement("wbr", { key: `wbr${s}` }),
      /* @__PURE__ */ C.createElement("span", { key: `dot${s}` }, ".")
    ];
  }), o = e.args?.flatMap((i, s, l) => {
    let c = /* @__PURE__ */ C.createElement(vt, { key: `node${s}`, value: i, callsById: t });
    return s < l.length - 1 ? [c, /* @__PURE__ */ C.createElement("span", { key: `comma${s}` }, ",\xA0"), /* @__PURE__ */ C.createElement("w\
br", { key: `wbr${s}` })] : [c];
  }), n = ue();
  return /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement("span", { style: { color: n.base } }, r), /* @__PURE__ */ C.
  createElement("span", { style: { color: n.method } }, e.method), /* @__PURE__ */ C.createElement("span", { style: { color: n.base } }, "(",
  /* @__PURE__ */ C.createElement("wbr", null), o, /* @__PURE__ */ C.createElement("wbr", null), ")"));
}, "MethodCall");

// src/component-testing/components/MatcherResult.tsx
var dd = /* @__PURE__ */ a((e, t = 0) => {
  for (let r = t, o = 1; r < e.length; r += 1)
    if (e[r] === "(" ? o += 1 : e[r] === ")" && (o -= 1), o === 0)
      return e.slice(t, r);
  return "";
}, "getParams"), mi = /* @__PURE__ */ a((e) => {
  try {
    return e === "undefined" ? void 0 : JSON.parse(e);
  } catch {
    return e;
  }
}, "parseValue"), pE = fd.span(({ theme: e }) => ({
  color: e.base === "light" ? e.color.positiveText : e.color.positive
})), uE = fd.span(({ theme: e }) => ({
  color: e.base === "light" ? e.color.negativeText : e.color.negative
})), gi = /* @__PURE__ */ a(({ value: e, parsed: t }) => t ? /* @__PURE__ */ X.createElement(vt, { showObjectInspector: !0, value: e, style: {
color: "#D43900" } }) : /* @__PURE__ */ X.createElement(uE, null, e), "Received"), hi = /* @__PURE__ */ a(({ value: e, parsed: t }) => t ? typeof e ==
"string" && e.startsWith("called with") ? /* @__PURE__ */ X.createElement(X.Fragment, null, e) : /* @__PURE__ */ X.createElement(vt, { showObjectInspector: !0,
value: e, style: { color: "#16B242" } }) : /* @__PURE__ */ X.createElement(pE, null, e), "Expected"), bi = /* @__PURE__ */ a(({
  message: e,
  style: t = {}
}) => {
  let r = Qt(), o = e.split(`
`);
  return /* @__PURE__ */ X.createElement(
    "pre",
    {
      style: {
        margin: 0,
        padding: "8px 10px 8px 36px",
        fontSize: cE.size.s1,
        ...t
      }
    },
    o.flatMap((n, i) => {
      if (n.startsWith("expect(")) {
        let g = dd(n, 7), p = g ? 7 + g.length : 0, m = g && n.slice(p).match(/\.(to|last|nth)[A-Z]\w+\(/);
        if (m) {
          let f = p + (m.index ?? 0) + m[0].length, h = dd(n, f);
          if (h)
            return [
              "expect(",
              /* @__PURE__ */ X.createElement(gi, { key: `received_${g}`, value: g }),
              n.slice(p, f),
              /* @__PURE__ */ X.createElement(hi, { key: `expected_${h}`, value: h }),
              n.slice(f + h.length),
              /* @__PURE__ */ X.createElement("br", { key: `br${i}` })
            ];
        }
      }
      if (n.match(/^\s*- /))
        return [/* @__PURE__ */ X.createElement(hi, { key: n + i, value: n }), /* @__PURE__ */ X.createElement("br", { key: `br${i}` })];
      if (n.match(/^\s*\+ /) || n.match(/^Received: $/))
        return [/* @__PURE__ */ X.createElement(gi, { key: n + i, value: n }), /* @__PURE__ */ X.createElement("br", { key: `br${i}` })];
      let [, s, l] = n.match(/^(Expected|Received): (.*)$/) || [];
      if (s && l)
        return s === "Expected" ? [
          "Expected: ",
          /* @__PURE__ */ X.createElement(hi, { key: n + i, value: mi(l), parsed: !0 }),
          /* @__PURE__ */ X.createElement("br", { key: `br${i}` })
        ] : [
          "Received: ",
          /* @__PURE__ */ X.createElement(gi, { key: n + i, value: mi(l), parsed: !0 }),
          /* @__PURE__ */ X.createElement("br", { key: `br${i}` })
        ];
      let [, c, u] = n.match(/(Expected number|Received number|Number) of calls: (\d+)$/i) || [];
      if (c && u)
        return [
          `${c} of calls: `,
          /* @__PURE__ */ X.createElement(vt, { key: n + i, value: Number(u) }),
          /* @__PURE__ */ X.createElement("br", { key: `br${i}` })
        ];
      let [, d] = n.match(/^Received has value: (.+)$/) || [];
      return d ? [
        "Received has value: ",
        /* @__PURE__ */ X.createElement(vt, { key: n + i, value: mi(d) }),
        /* @__PURE__ */ X.createElement("br", { key: `br${i}` })
      ] : [
        /* @__PURE__ */ X.createElement(
          "span",
          {
            key: n + i,
            dangerouslySetInnerHTML: { __html: r.toHtml(n) }
          }
        ),
        /* @__PURE__ */ X.createElement("br", { key: `br${i}` })
      ];
    })
  );
}, "MatcherResult");

// src/component-testing/components/StatusIcon.tsx
import Ir from "react";
import { CheckIcon as dE, CircleIcon as fE, PlayIcon as mE, StopAltIcon as gE } from "@storybook/icons";
import { styled as hE, useTheme as bE } from "storybook/theming";
var yE = hE.div({
  width: 14,
  height: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}), Zo = /* @__PURE__ */ a(({ status: e }) => {
  let t = bE();
  switch (e) {
    case "done":
      return /* @__PURE__ */ Ir.createElement(dE, { color: t.color.positive, "data-testid": "icon-done" });
    case "error":
      return /* @__PURE__ */ Ir.createElement(gE, { color: t.color.negative, "data-testid": "icon-error" });
    case "active":
      return /* @__PURE__ */ Ir.createElement(mE, { color: t.color.secondary, "data-testid": "icon-active" });
    case "waiting":
      return /* @__PURE__ */ Ir.createElement(yE, { "data-testid": "icon-waiting" }, /* @__PURE__ */ Ir.createElement(fE, { color: F(0.5, "#\
CCCCCC"), size: 6 }));
    default:
      return null;
  }
}, "StatusIcon");

// src/component-testing/components/Interaction.tsx
var CE = He.div({
  fontFamily: Qo.fonts.mono,
  fontSize: Qo.size.s1,
  overflowWrap: "break-word",
  inlineSize: "calc( 100% - 40px )"
}), wE = He("div", {
  shouldForwardProp: /* @__PURE__ */ a((e) => !["call", "pausedAt"].includes(e.toString()), "shouldForwardProp")
})(
  ({ theme: e, call: t }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    borderBottom: `1px solid ${e.appBorderColor}`,
    fontFamily: Qo.fonts.base,
    fontSize: 13,
    ...t.status === "error" && {
      backgroundColor: e.base === "dark" ? F(0.93, e.color.negative) : e.background.warning
    },
    paddingLeft: (t.ancestors?.length ?? 0) * 20
  }),
  ({ theme: e, call: t, pausedAt: r }) => r === t.id && {
    "&::before": {
      content: '""',
      position: "absolute",
      top: -5,
      zIndex: 1,
      borderTop: "4.5px solid transparent",
      borderLeft: `7px solid ${e.color.warning}`,
      borderBottom: "4.5px solid transparent"
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: -1,
      zIndex: 1,
      width: "100%",
      borderTop: `1.5px solid ${e.color.warning}`
    }
  }
), TE = He.div(({ theme: e, isInteractive: t }) => ({
  display: "flex",
  "&:hover": t ? {} : { background: e.background.hoverable }
})), AE = He("button", {
  shouldForwardProp: /* @__PURE__ */ a((e) => !["call"].includes(e.toString()), "shouldForwardProp")
})(({ theme: e, disabled: t, call: r }) => ({
  flex: 1,
  display: "grid",
  background: "none",
  border: 0,
  gridTemplateColumns: "15px 1fr",
  alignItems: "center",
  minHeight: 40,
  margin: 0,
  padding: "8px 15px",
  textAlign: "start",
  cursor: t || r.status === "error" ? "default" : "pointer",
  "&:focus-visible": {
    outline: 0,
    boxShadow: `inset 3px 0 0 0 ${r.status === "error" ? e.color.warning : e.color.secondary}`,
    background: r.status === "error" ? "transparent" : e.background.hoverable
  },
  "& > div": {
    opacity: r.status === "waiting" ? 0.5 : 1
  }
})), kE = He.div({
  display: "flex",
  alignItems: "center",
  padding: 6
}), OE = He(xE)(({ theme: e }) => ({
  color: e.textMutedColor,
  margin: "0 3px"
})), IE = He(vE)(({ theme: e }) => ({
  fontFamily: e.typography.fonts.base
})), yi = He("div")(({ theme: e }) => ({
  padding: "8px 10px 8px 36px",
  fontSize: Qo.size.s1,
  color: e.color.defaultText,
  pre: {
    margin: 0,
    padding: 0
  }
})), PE = He.span(({ theme: e }) => ({
  color: e.base === "dark" ? "#5EC1FF" : "#0271B6"
})), LE = He.span(({ theme: e }) => ({
  color: e.base === "dark" ? "#eee" : "#444"
})), NE = He.p(({ theme: e }) => ({
  color: e.base === "dark" ? e.color.negative : e.color.negativeText,
  fontSize: e.typography.size.s2,
  maxWidth: 500,
  textWrap: "balance"
})), _E = /* @__PURE__ */ a(({ exception: e }) => {
  let t = Qt();
  if (!e)
    return null;
  if (e.callId === ve)
    return /* @__PURE__ */ J.createElement(yi, null, /* @__PURE__ */ J.createElement("pre", null, /* @__PURE__ */ J.createElement(PE, null, e.
    name, ":"), " ", /* @__PURE__ */ J.createElement(LE, null, e.message)), /* @__PURE__ */ J.createElement(NE, null, "The component failed \
to render properly. Automated component tests will not run until this is resolved. Check the full error message in Storybook\u2019s canvas to deb\
ug."));
  if (Qa(e))
    return /* @__PURE__ */ J.createElement(bi, { ...e });
  if (Za(e))
    return /* @__PURE__ */ J.createElement(yi, null, /* @__PURE__ */ J.createElement(
      bi,
      {
        message: `${e.message}${e.diff ? `

${e.diff}` : ""}`,
        style: { padding: 0 }
      }
    ), /* @__PURE__ */ J.createElement("p", null, "See the full stack trace in the browser console."));
  let r = e.message.split(`

`), o = r.length > 1;
  return /* @__PURE__ */ J.createElement(yi, null, /* @__PURE__ */ J.createElement("pre", { dangerouslySetInnerHTML: { __html: t.toHtml(r[0]) } }),
  o && /* @__PURE__ */ J.createElement("p", null, "See the full stack trace in the browser console."));
}, "Exception"), md = /* @__PURE__ */ a(({
  call: e,
  callsById: t,
  controls: r,
  controlStates: o,
  childCallIds: n,
  isHidden: i,
  isCollapsed: s,
  toggleCollapsed: l,
  pausedAt: c
}) => {
  let [u, d] = J.useState(!1), g = !o.goto || !e.interceptable || !!e.ancestors?.length;
  return i || e.id === ve ? null : /* @__PURE__ */ J.createElement(wE, { call: e, pausedAt: c }, /* @__PURE__ */ J.createElement(TE, { isInteractive: g },
  /* @__PURE__ */ J.createElement(
    AE,
    {
      "aria-label": "Interaction step",
      call: e,
      onClick: () => r.goto(e.id),
      disabled: g,
      onMouseEnter: () => o.goto && d(!0),
      onMouseLeave: () => o.goto && d(!1)
    },
    /* @__PURE__ */ J.createElement(Zo, { status: u ? "active" : e.status }),
    /* @__PURE__ */ J.createElement(CE, { style: { marginLeft: 6, marginBottom: 1 } }, /* @__PURE__ */ J.createElement(Xo, { call: e, callsById: t }))
  ), /* @__PURE__ */ J.createElement(kE, null, (n?.length ?? 0) > 0 && /* @__PURE__ */ J.createElement(
    EE,
    {
      hasChrome: !1,
      tooltip: /* @__PURE__ */ J.createElement(IE, { note: `${s ? "Show" : "Hide"} interactions` })
    },
    /* @__PURE__ */ J.createElement(OE, { onClick: l }, /* @__PURE__ */ J.createElement(SE, null))
  ))), e.status === "error" && e.exception?.callId === e.id && /* @__PURE__ */ J.createElement(_E, { exception: e.exception }));
}, "Interaction");

// src/component-testing/components/Subnav.tsx
import q from "react";
import {
  Bar as RE,
  Button as HE,
  IconButton as VE,
  P as zE,
  Separator as $E,
  TooltipNote as UE,
  WithTooltip as Pr
} from "storybook/internal/components";
import {
  FastForwardIcon as qE,
  PlayBackIcon as WE,
  PlayNextIcon as GE,
  RewindIcon as JE,
  SyncIcon as KE
} from "@storybook/icons";
import { styled as Ve, useTheme as YE } from "storybook/theming";

// src/component-testing/components/StatusBadge.tsx
import DE from "react";
import { styled as BE, typography as xi } from "storybook/theming";
var ME = {
  done: "positive",
  error: "negative",
  active: "warning",
  waiting: "warning"
}, FE = BE.div(({ theme: e, status: t }) => ({
  padding: "4px 6px 4px 8px",
  borderRadius: "4px",
  backgroundColor: e.color[ME[t]],
  color: "white",
  fontFamily: xi.fonts.base,
  textTransform: "uppercase",
  fontSize: xi.size.s1,
  letterSpacing: 3,
  fontWeight: xi.weight.bold,
  width: 65,
  textAlign: "center"
})), jE = {
  done: "Pass",
  error: "Fail",
  active: "Runs",
  waiting: "Runs"
}, gd = /* @__PURE__ */ a(({ status: e }) => {
  let t = jE[e];
  return /* @__PURE__ */ DE.createElement(FE, { "aria-label": "Status of the test run", status: e }, t);
}, "StatusBadge");

// src/component-testing/components/Subnav.tsx
var XE = Ve.div(({ theme: e }) => ({
  boxShadow: `${e.appBorderColor} 0 -1px 0 0 inset`,
  background: e.background.app,
  position: "sticky",
  top: 0,
  zIndex: 1
})), ZE = Ve.nav({
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: 15
}), QE = Ve(HE)(({ theme: e }) => ({
  borderRadius: 4,
  padding: 6,
  color: e.textMutedColor,
  "&:not(:disabled)": {
    "&:hover,&:focus-visible": {
      color: e.color.secondary
    }
  }
})), Lr = Ve(UE)(({ theme: e }) => ({
  fontFamily: e.typography.fonts.base
})), Nr = Ve(VE)(({ theme: e }) => ({
  color: e.textMutedColor,
  margin: "0 3px"
})), eS = Ve($E)({
  marginTop: 0
}), tS = Ve(zE)(({ theme: e }) => ({
  color: e.textMutedColor,
  justifyContent: "flex-end",
  textAlign: "right",
  whiteSpace: "nowrap",
  marginTop: "auto",
  marginBottom: 1,
  paddingRight: 15,
  fontSize: 13
})), hd = Ve.div({
  display: "flex",
  alignItems: "center"
}), rS = Ve(Nr)({
  marginLeft: 9
}), oS = Ve(QE)({
  marginLeft: 9,
  marginRight: 9,
  marginBottom: 1,
  lineHeight: "12px"
}), nS = Ve(Nr)(({ theme: e, animating: t, disabled: r }) => ({
  opacity: r ? 0.5 : 1,
  svg: {
    animation: t ? `${e.animation.rotate360} 200ms ease-out` : void 0
  }
})), bd = /* @__PURE__ */ a(({
  controls: e,
  controlStates: t,
  status: r,
  storyFileName: o,
  onScrollToEnd: n
}) => {
  let i = r === "error" ? "Scroll to error" : "Scroll to end", s = YE();
  return /* @__PURE__ */ q.createElement(XE, null, /* @__PURE__ */ q.createElement(RE, { backgroundColor: s.background.app }, /* @__PURE__ */ q.
  createElement(ZE, { "aria-label": "Component tests toolbar" }, /* @__PURE__ */ q.createElement(hd, null, /* @__PURE__ */ q.createElement(gd,
  { status: r }), /* @__PURE__ */ q.createElement(oS, { onClick: n, disabled: !n }, i), /* @__PURE__ */ q.createElement(eS, null), /* @__PURE__ */ q.
  createElement(Pr, { trigger: "hover", hasChrome: !1, tooltip: /* @__PURE__ */ q.createElement(Lr, { note: "Go to start" }) }, /* @__PURE__ */ q.
  createElement(
    rS,
    {
      "aria-label": "Go to start",
      onClick: e.start,
      disabled: !t.start
    },
    /* @__PURE__ */ q.createElement(JE, null)
  )), /* @__PURE__ */ q.createElement(Pr, { trigger: "hover", hasChrome: !1, tooltip: /* @__PURE__ */ q.createElement(Lr, { note: "Go back" }) },
  /* @__PURE__ */ q.createElement(
    Nr,
    {
      "aria-label": "Go back",
      onClick: e.back,
      disabled: !t.back
    },
    /* @__PURE__ */ q.createElement(WE, null)
  )), /* @__PURE__ */ q.createElement(Pr, { trigger: "hover", hasChrome: !1, tooltip: /* @__PURE__ */ q.createElement(Lr, { note: "Go forwar\
d" }) }, /* @__PURE__ */ q.createElement(
    Nr,
    {
      "aria-label": "Go forward",
      onClick: e.next,
      disabled: !t.next
    },
    /* @__PURE__ */ q.createElement(GE, null)
  )), /* @__PURE__ */ q.createElement(Pr, { trigger: "hover", hasChrome: !1, tooltip: /* @__PURE__ */ q.createElement(Lr, { note: "Go to end" }) },
  /* @__PURE__ */ q.createElement(
    Nr,
    {
      "aria-label": "Go to end",
      onClick: e.end,
      disabled: !t.end
    },
    /* @__PURE__ */ q.createElement(qE, null)
  )), /* @__PURE__ */ q.createElement(Pr, { trigger: "hover", hasChrome: !1, tooltip: /* @__PURE__ */ q.createElement(Lr, { note: "Rerun" }) },
  /* @__PURE__ */ q.createElement(nS, { "aria-label": "Rerun", onClick: e.rerun }, /* @__PURE__ */ q.createElement(KE, null)))), o && /* @__PURE__ */ q.
  createElement(hd, null, /* @__PURE__ */ q.createElement(tS, null, o)))));
}, "Subnav");

// src/component-testing/components/TestDiscrepancyMessage.tsx
import yd from "react";
import { Link as aS } from "storybook/internal/components";
import { useStorybookApi as iS } from "storybook/manager-api";
import { styled as sS } from "storybook/theming";
var lS = sS.div(({ theme: { color: e, typography: t, background: r } }) => ({
  textAlign: "start",
  padding: "11px 15px",
  fontSize: `${t.size.s2 - 1}px`,
  fontWeight: t.weight.regular,
  lineHeight: "1rem",
  background: r.app,
  borderBottom: `1px solid ${e.border}`,
  color: e.defaultText,
  backgroundClip: "padding-box",
  position: "relative",
  code: {
    fontSize: `${t.size.s1 - 1}px`,
    color: "inherit",
    margin: "0 0.2em",
    padding: "0 0.2em",
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "2px",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)"
  }
})), xd = /* @__PURE__ */ a(({ browserTestStatus: e }) => {
  let r = iS().getDocsUrl({
    subpath: zp,
    versioned: !0,
    renderer: !0
  }), [o, n] = e === "error" ? ["the CLI", "this browser"] : ["this browser", "the CLI"];
  return /* @__PURE__ */ yd.createElement(lS, null, "This interaction test passed in ", o, ", but the tests failed in ", n, ".", " ", /* @__PURE__ */ yd.
  createElement(aS, { href: r, target: "_blank", withArrow: !0 }, "Learn what could cause this"));
}, "TestDiscrepancyMessage");

// src/component-testing/components/InteractionsPanel.tsx
var cS = er.div(({ theme: e }) => ({
  height: "100%",
  background: e.background.content
})), vd = er.div(({ theme: e }) => ({
  borderBottom: `1px solid ${e.appBorderColor}`,
  backgroundColor: e.base === "dark" ? F(0.93, e.color.negative) : e.background.warning,
  padding: 15,
  fontSize: e.typography.size.s2 - 1,
  lineHeight: "19px"
})), vi = er.code(({ theme: e }) => ({
  margin: "0 1px",
  padding: 3,
  fontSize: e.typography.size.s1 - 1,
  lineHeight: 1,
  verticalAlign: "top",
  background: "rgba(0, 0, 0, 0.05)",
  border: `1px solid ${e.appBorderColor}`,
  borderRadius: 3
})), Ed = er.div({
  paddingBottom: 4,
  fontWeight: "bold"
}), pS = er.p({
  margin: 0,
  padding: "0 0 20px"
}), Sd = er.pre(({ theme: e }) => ({
  margin: 0,
  padding: 0,
  "&:not(:last-child)": {
    paddingBottom: 16
  },
  fontSize: e.typography.size.s1 - 1
})), wd = Q.memo(
  /* @__PURE__ */ a(function({
    storyUrl: t,
    calls: r,
    controls: o,
    controlStates: n,
    interactions: i,
    fileName: s,
    hasException: l,
    caughtException: c,
    unhandledErrors: u,
    isPlaying: d,
    pausedAt: g,
    onScrollToEnd: p,
    endRef: m,
    hasResultMismatch: f,
    browserTestStatus: h
  }) {
    let b = Qt(), y = i.some((x) => x.id !== ve);
    return /* @__PURE__ */ Q.createElement(cS, null, f && /* @__PURE__ */ Q.createElement(xd, { browserTestStatus: h }), n.detached && (y ||
    l) && /* @__PURE__ */ Q.createElement(Tu, { storyUrl: t }), (i.length > 0 || l) && /* @__PURE__ */ Q.createElement(
      bd,
      {
        controls: o,
        controlStates: n,
        status: h,
        storyFileName: s,
        onScrollToEnd: p
      }
    ), /* @__PURE__ */ Q.createElement("div", { "aria-label": "Interactions list" }, i.map((x) => /* @__PURE__ */ Q.createElement(
      md,
      {
        key: x.id,
        call: x,
        callsById: r,
        controls: o,
        controlStates: n,
        childCallIds: x.childCallIds,
        isHidden: x.isHidden,
        isCollapsed: x.isCollapsed,
        toggleCollapsed: x.toggleCollapsed,
        pausedAt: g
      }
    ))), c && !Cu(c) && /* @__PURE__ */ Q.createElement(vd, null, /* @__PURE__ */ Q.createElement(Ed, null, "Caught exception in ", /* @__PURE__ */ Q.createElement(
    vi, null, "play"), " function"), /* @__PURE__ */ Q.createElement(
      Sd,
      {
        "data-chromatic": "ignore",
        dangerouslySetInnerHTML: {
          __html: b.toHtml(Cd(c))
        }
      }
    )), u && /* @__PURE__ */ Q.createElement(vd, null, /* @__PURE__ */ Q.createElement(Ed, null, "Unhandled Errors"), /* @__PURE__ */ Q.createElement(
    pS, null, "Found ", u.length, " unhandled error", u.length > 1 ? "s" : "", " ", "while running the play function. This might cause false\
 positive assertions. Resolve unhandled errors or ignore unhandled errors with setting the", /* @__PURE__ */ Q.createElement(vi, null, "test\
.dangerouslyIgnoreUnhandledErrors"), " ", "parameter to ", /* @__PURE__ */ Q.createElement(vi, null, "true"), "."), u.map((x, v) => /* @__PURE__ */ Q.createElement(
    Sd, { key: v, "data-chromatic": "ignore" }, Cd(x)))), /* @__PURE__ */ Q.createElement("div", { ref: m }), !d && !c && !y && /* @__PURE__ */ Q.createElement(
    Au, null));
  }, "InteractionsPanel")
);
function Cd(e) {
  return e.stack || `${e.name}: ${e.message}`;
}
a(Cd, "printSerializedError");

// src/component-testing/components/Panel.tsx
var en = {
  detached: !1,
  start: !1,
  back: !1,
  goto: !1,
  next: !1,
  end: !1
}, SS = {
  done: "status-value:success",
  error: "status-value:error",
  active: "status-value:pending",
  waiting: "status-value:pending"
}, tn = /* @__PURE__ */ a(({
  log: e,
  calls: t,
  collapsed: r,
  setCollapsed: o
}) => {
  let n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  return e.map(({ callId: l, ancestors: c, status: u }) => {
    let d = !1;
    return c.forEach((g) => {
      r.has(g) && (d = !0), i.set(g, (i.get(g) || []).concat(l));
    }), { ...t.get(l), status: u, isHidden: d };
  }).map((l) => {
    let c = l.status === "error" && l.ancestors && n.get(l.ancestors.slice(-1)[0])?.status === "active" ? "active" : l.status;
    return n.set(l.id, { ...l, status: c }), {
      ...l,
      status: c,
      childCallIds: i.get(l.id),
      isCollapsed: r.has(l.id),
      toggleCollapsed: /* @__PURE__ */ a(() => o((u) => (u.has(l.id) ? u.delete(l.id) : u.add(l.id), new Set(u))), "toggleCollapsed")
    };
  });
}, "getInteractions"), Ti = /* @__PURE__ */ a((e, t) => ({
  id: ve,
  method: "render",
  args: [],
  cursor: 0,
  storyId: e,
  ancestors: [],
  path: [],
  interceptable: !0,
  retain: !1,
  exception: t
}), "getInternalRenderCall"), rn = /* @__PURE__ */ a((e) => ({
  callId: ve,
  status: e,
  ancestors: []
}), "getInternalRenderLogItem"), kd = dS(
  /* @__PURE__ */ a(function({ refId: t, storyId: r, storyUrl: o }) {
    let { statusValue: n, testRunId: i } = yS((B) => {
      let R = t ? void 0 : B[r]?.[Wp];
      return {
        statusValue: R?.value,
        testRunId: R?.data?.testRunId
      };
    }), [s, l] = xS(Nt, {
      controlStates: en,
      isErrored: !1,
      pausedAt: void 0,
      interactions: [],
      isPlaying: !1,
      hasException: !1,
      caughtException: void 0,
      interactionsCount: 0,
      unhandledErrors: void 0
    }), [c, u] = Ci(void 0), [d, g] = Ci(/* @__PURE__ */ new Set()), [p, m] = Ci(!1), {
      controlStates: f = en,
      isErrored: h = !1,
      pausedAt: b = void 0,
      interactions: y = [],
      isPlaying: x = !1,
      caughtException: v = void 0,
      unhandledErrors: S = void 0
    } = s, w = Si([rn("active")]), E = Si(
      /* @__PURE__ */ new Map([[ve, Ti(r)]])
    ), I = /* @__PURE__ */ a(({ status: B, ...R }) => E.current.set(R.id, R), "setCall"), D = Si();
    Ei(() => {
      let B;
      return wi.IntersectionObserver && (B = new wi.IntersectionObserver(
        ([R]) => u(R.isIntersecting ? void 0 : R.target),
        { root: wi.document.querySelector("#panel-tab-content") }
      ), D.current && B.observe(D.current)), () => B?.disconnect();
    }, []);
    let _ = vS(
      {
        [ht.CALL]: I,
        [ht.SYNC]: (B) => {
          w.current = [rn("done"), ...B.logItems], l((R) => {
            let T = tn({
              log: w.current,
              calls: E.current,
              collapsed: d,
              setCollapsed: g
            }), P = T.filter(
              ({ id: k, method: $ }) => k !== ve && $ !== "step"
            ).length;
            return {
              ...R,
              controlStates: B.controlStates,
              pausedAt: B.pausedAt,
              interactions: T,
              interactionsCount: P
            };
          });
        },
        [gS]: (B) => {
          if (B.newPhase === "preparing")
            w.current = [rn("active")], E.current.set(ve, Ti(r)), l({
              controlStates: en,
              isErrored: !1,
              pausedAt: void 0,
              interactions: [],
              isPlaying: !1,
              hasException: !1,
              caughtException: void 0,
              interactionsCount: 0,
              unhandledErrors: void 0
            });
          else {
            let R = tn({
              log: w.current,
              calls: E.current,
              collapsed: d,
              setCollapsed: g
            }), T = R.filter(
              ({ id: P, method: k }) => P !== ve && k !== "step"
            ).length;
            l(
              (P) => ({
                ...P,
                interactions: R,
                interactionsCount: T,
                isPlaying: B.newPhase === "playing",
                pausedAt: void 0
              })
            );
          }
        },
        [hS]: (B) => {
          w.current = [rn("error")], E.current.set(
            ve,
            Ti(r, { ...B, callId: ve })
          );
          let R = tn({
            log: w.current,
            calls: E.current,
            collapsed: d,
            setCollapsed: g
          });
          l(
            (T) => ({
              ...T,
              isErrored: !0,
              hasException: !0,
              caughtException: void 0,
              controlStates: en,
              pausedAt: void 0,
              interactions: R,
              interactionsCount: 0
            })
          );
        },
        [mS]: (B) => {
          l((R) => ({ ...R, caughtException: B, hasException: !0 }));
        },
        [bS]: (B) => {
          l((R) => ({ ...R, unhandledErrors: B, hasException: !0 }));
        }
      },
      [d]
    );
    Ei(() => {
      l((B) => {
        let R = tn({
          log: w.current,
          calls: E.current,
          collapsed: d,
          setCollapsed: g
        }), T = R.filter(
          ({ id: P, method: k }) => P !== ve && k !== "step"
        ).length;
        return { ...B, interactions: R, interactionsCount: T };
      });
    }, [l, d]);
    let z = Ad(
      () => ({
        start: /* @__PURE__ */ a(() => _(ht.START, { storyId: r }), "start"),
        back: /* @__PURE__ */ a(() => _(ht.BACK, { storyId: r }), "back"),
        goto: /* @__PURE__ */ a((B) => _(ht.GOTO, { storyId: r, callId: B }), "goto"),
        next: /* @__PURE__ */ a(() => _(ht.NEXT, { storyId: r }), "next"),
        end: /* @__PURE__ */ a(() => _(ht.END, { storyId: r }), "end"),
        rerun: /* @__PURE__ */ a(() => {
          _(fS, { storyId: r });
        }, "rerun")
      }),
      [_, r]
    ), W = ES("fileName", ""), [ee] = W.toString().split("/").slice(-1), ce = /* @__PURE__ */ a(() => c?.scrollIntoView({ behavior: "smooth",
    block: "end" }), "scrollToTarget"), ne = !!v || !!S || // @ts-expect-error TODO
    y.some((B) => B.status === "error"), ae = Ad(() => !x && (y.length > 0 || ne) ? ne ? "error" : "done" : x ? "active" : void 0, [x, y, ne]);
    return Ei(() => {
      if (ae && n && n !== "status-value:pending" && n !== SS[ae]) {
        let R = setTimeout(
          () => m((T) => (T || _(qp, {
            type: "test-discrepancy",
            payload: {
              browserStatus: ae === "done" ? "PASS" : "FAIL",
              cliStatus: ae === "done" ? "FAIL" : "PASS",
              storyId: r,
              testRunId: i
            }
          }), !0)),
          2e3
        );
        return () => clearTimeout(R);
      } else
        m(!1);
    }, [_, ae, n, r, i]), /* @__PURE__ */ Td.createElement(uS, { key: "component-tests" }, /* @__PURE__ */ Td.createElement(
      wd,
      {
        storyUrl: o,
        hasResultMismatch: p,
        browserTestStatus: ae,
        calls: E.current,
        controls: z,
        controlStates: { ...f, detached: !!t || f.detached },
        interactions: y,
        fileName: ee,
        hasException: ne,
        caughtException: v,
        unhandledErrors: S,
        isErrored: h,
        isPlaying: x,
        pausedAt: b,
        endRef: D,
        onScrollToEnd: c && ce
      }
    ));
  }, "PanelMemoized")
);

// src/component-testing/components/PanelTitle.tsx
import on from "react";
import { Badge as CS } from "storybook/internal/components";
import { useAddonState as wS, useStorybookApi as TS } from "storybook/manager-api";
function Od() {
  let t = TS().getSelectedPanel(), [r = {}] = wS(Nt), { isErrored: o, hasException: n, interactionsCount: i } = r;
  return /* @__PURE__ */ on.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ on.createElement(
  "span", null, "Interactions"), i && !o && !n ? /* @__PURE__ */ on.createElement(CS, { compact: !0, status: t === Zt ? "active" : "neutral" },
  i) : null, o || n ? /* @__PURE__ */ on.createElement(Zo, { status: "error" }) : null);
}
a(Od, "PanelTitle");

// src/component-testing/manager.tsx
var Pd = Id.register(Nt, () => {
  if (globalThis?.FEATURES?.interactions) {
    let e = /* @__PURE__ */ a(({ state: t }) => {
      let r = t.refId && t.refs[t.refId]?.url || document.location.origin, { pathname: o, search: n = "" } = t.location, i = o + (t.refId ? n.
      replace(`/${t.refId}_`, "/") : n);
      return {
        refId: t.refId,
        storyId: t.storyId,
        storyUrl: r + i
      };
    }, "filter");
    Id.add(Zt, {
      type: OS.PANEL,
      title: /* @__PURE__ */ a(() => /* @__PURE__ */ nn.createElement(Od, null), "title"),
      match: /* @__PURE__ */ a(({ viewMode: t }) => t === "story", "match"),
      render: /* @__PURE__ */ a(({ active: t }) => /* @__PURE__ */ nn.createElement(AS, { active: !!t }, /* @__PURE__ */ nn.createElement(kS,
      { filter: e }, (r) => /* @__PURE__ */ nn.createElement(kd, { ...r }))), "render")
    });
  }
});

// src/backgrounds/manager.tsx
import VS from "react";
import { addons as Bd, types as zS } from "storybook/manager-api";

// src/backgrounds/components/Tool.tsx
import Je, { Fragment as IS, memo as _d, useCallback as PS, useState as LS } from "react";
import { IconButton as Nd, TooltipLinkList as NS, WithTooltip as _S } from "storybook/internal/components";
import { CircleIcon as DS, GridIcon as BS, PhotoIcon as MS, RefreshIcon as FS } from "@storybook/icons";
import { useGlobals as jS, useParameter as RS } from "storybook/manager-api";

// src/backgrounds/constants.ts
var an = "storybook/background", _r = "backgrounds";
var kM = {
  UPDATE: `${an}/update`
};

// src/backgrounds/defaults.ts
var Ld = {
  light: { name: "light", value: "#F8F8F8" },
  dark: { name: "dark", value: "#333" }
};

// src/backgrounds/components/Tool.tsx
var Dd = _d(/* @__PURE__ */ a(function() {
  let t = RS(_r), [r, o, n] = jS(), [i, s] = LS(!1), { options: l = Ld, disable: c = !0 } = t || {};
  if (c)
    return null;
  let u = r[_r] || {}, d = u.value, g = u.grid || !1, p = l[d], m = !!n?.[_r], f = Object.keys(l).length;
  return /* @__PURE__ */ Je.createElement(
    HS,
    {
      length: f,
      backgroundMap: l,
      item: p,
      updateGlobals: o,
      backgroundName: d,
      setIsTooltipVisible: s,
      isLocked: m,
      isGridActive: g,
      isTooltipVisible: i
    }
  );
}, "BackgroundSelector")), HS = _d(/* @__PURE__ */ a(function(t) {
  let {
    item: r,
    length: o,
    updateGlobals: n,
    setIsTooltipVisible: i,
    backgroundMap: s,
    backgroundName: l,
    isLocked: c,
    isGridActive: u,
    isTooltipVisible: d
  } = t, g = PS(
    (p) => {
      n({
        [_r]: p
      });
    },
    [n]
  );
  return /* @__PURE__ */ Je.createElement(IS, null, /* @__PURE__ */ Je.createElement(
    Nd,
    {
      key: "grid",
      active: u,
      disabled: c,
      title: "Apply a grid to the preview",
      onClick: () => g({ value: l, grid: !u })
    },
    /* @__PURE__ */ Je.createElement(BS, null)
  ), o > 0 ? /* @__PURE__ */ Je.createElement(
    _S,
    {
      key: "background",
      placement: "top",
      closeOnOutsideClick: !0,
      tooltip: ({ onHide: p }) => /* @__PURE__ */ Je.createElement(
        NS,
        {
          links: [
            ...r ? [
              {
                id: "reset",
                title: "Reset background",
                icon: /* @__PURE__ */ Je.createElement(FS, null),
                onClick: /* @__PURE__ */ a(() => {
                  g(void 0), p();
                }, "onClick")
              }
            ] : [],
            ...Object.entries(s).map(([m, f]) => ({
              id: m,
              title: f.name,
              icon: /* @__PURE__ */ Je.createElement(DS, { color: f?.value || "grey" }),
              active: m === l,
              onClick: /* @__PURE__ */ a(() => {
                g({ value: m, grid: u }), p();
              }, "onClick")
            }))
          ].flat()
        }
      ),
      onVisibleChange: i
    },
    /* @__PURE__ */ Je.createElement(
      Nd,
      {
        disabled: c,
        key: "background",
        title: "Change the background of the preview",
        active: !!r || d
      },
      /* @__PURE__ */ Je.createElement(MS, null)
    )
  ) : null);
}, "PureTool"));

// src/backgrounds/manager.tsx
var Md = Bd.register(an, () => {
  globalThis?.FEATURES?.backgrounds && Bd.add(an, {
    title: "Backgrounds",
    type: zS.TOOL,
    match: /* @__PURE__ */ a(({ viewMode: e, tabId: t }) => !!(e && e.match(/^(story|docs)$/)) && !t, "match"),
    render: /* @__PURE__ */ a(() => /* @__PURE__ */ VS.createElement(Dd, null), "render")
  });
});

// src/measure/manager.tsx
import KS from "react";
import { addons as Rd, types as YS } from "storybook/manager-api";

// src/measure/Tool.tsx
import Fd, { useCallback as $S, useEffect as US } from "react";
import { IconButton as qS } from "storybook/internal/components";
import { RulerIcon as WS } from "@storybook/icons";
import { useGlobals as GS, useStorybookApi as JS } from "storybook/manager-api";

// src/measure/constants.ts
var Et = "storybook/measure-addon", sn = `${Et}/tool`;
var UM = {
  RESULT: `${Et}/result`,
  REQUEST: `${Et}/request`,
  CLEAR: `${Et}/clear`
};

// src/measure/Tool.tsx
var jd = /* @__PURE__ */ a(() => {
  let [e, t] = GS(), { measureEnabled: r } = e || {}, o = JS(), n = $S(
    () => t({
      measureEnabled: !r
    }),
    [t, r]
  );
  return US(() => {
    o.setAddonShortcut(Et, {
      label: "Toggle Measure [M]",
      defaultShortcut: ["M"],
      actionName: "measure",
      showInMenu: !1,
      action: n
    });
  }, [n, o]), /* @__PURE__ */ Fd.createElement(
    qS,
    {
      key: sn,
      active: r,
      title: "Enable measure",
      onClick: n
    },
    /* @__PURE__ */ Fd.createElement(WS, null)
  );
}, "Tool");

// src/measure/manager.tsx
var Hd = Rd.register(Et, () => {
  globalThis?.FEATURES?.measure && Rd.add(sn, {
    type: YS.TOOL,
    title: "Measure",
    match: /* @__PURE__ */ a(({ viewMode: e, tabId: t }) => e === "story" && !t, "match"),
    render: /* @__PURE__ */ a(() => /* @__PURE__ */ KS.createElement(jd, null), "render")
  });
});

// src/outline/manager.tsx
import nC from "react";
import { addons as $d, types as aC } from "storybook/manager-api";

// src/outline/OutlineSelector.tsx
import Vd, { memo as XS, useCallback as ZS, useEffect as QS } from "react";
import { IconButton as eC } from "storybook/internal/components";
import { OutlineIcon as tC } from "@storybook/icons";
import { useGlobals as rC, useStorybookApi as oC } from "storybook/manager-api";

// src/outline/constants.ts
var Dr = "storybook/outline", Ai = "outline";

// src/outline/OutlineSelector.tsx
var zd = XS(/* @__PURE__ */ a(function() {
  let [t, r] = rC(), o = oC(), n = [!0, "true"].includes(t[Ai]), i = ZS(
    () => r({
      [Ai]: !n
    }),
    [n]
  );
  return QS(() => {
    o.setAddonShortcut(Dr, {
      label: "Toggle Outline",
      defaultShortcut: ["alt", "O"],
      actionName: "outline",
      showInMenu: !1,
      action: i
    });
  }, [i, o]), /* @__PURE__ */ Vd.createElement(
    eC,
    {
      key: "outline",
      active: n,
      title: "Apply outlines to the preview",
      onClick: i
    },
    /* @__PURE__ */ Vd.createElement(tC, null)
  );
}, "OutlineSelector"));

// src/outline/manager.tsx
var Ud = $d.register(Dr, () => {
  globalThis?.FEATURES?.outline && $d.add(Dr, {
    title: "Outline",
    type: aC.TOOL,
    match: /* @__PURE__ */ a(({ viewMode: e, tabId: t }) => !!(e && e.match(/^(story|docs)$/)) && !t, "match"),
    render: /* @__PURE__ */ a(() => /* @__PURE__ */ nC.createElement(zd, null), "render")
  });
});

// src/viewport/manager.tsx
import * as tf from "react";
import { addons as ef, types as kC } from "storybook/manager-api";

// src/viewport/components/Tool.tsx
import Se, { Fragment as fC, useCallback as mC, useEffect as gC, useState as hC } from "react";
import { IconButton as bC, TooltipLinkList as yC, WithTooltip as xC } from "storybook/internal/components";
import { GrowIcon as vC, RefreshIcon as EC, TransferIcon as SC } from "@storybook/icons";
import { useGlobals as CC, useParameter as wC } from "storybook/manager-api";
import { Global as TC } from "storybook/theming";

// src/viewport/constants.ts
var St = "storybook/viewport", Br = "viewport", x3 = `${St}/panel`, qd = `${St}/tool`;

// src/viewport/defaults.ts
var Wd = {
  mobile1: {
    name: "Small mobile",
    styles: {
      height: "568px",
      width: "320px"
    },
    type: "mobile"
  },
  mobile2: {
    name: "Large mobile",
    styles: {
      height: "896px",
      width: "414px"
    },
    type: "mobile"
  },
  tablet: {
    name: "Tablet",
    styles: {
      height: "1112px",
      width: "834px"
    },
    type: "tablet"
  },
  desktop: {
    name: "Desktop",
    styles: {
      height: "1024px",
      width: "1280px"
    },
    type: "desktop"
  }
};

// src/viewport/responsiveViewport.tsx
var tr = {
  name: "Reset viewport",
  styles: {
    height: "100%",
    width: "100%"
  },
  type: "desktop"
};

// src/viewport/shortcuts.ts
var Gd = /* @__PURE__ */ a((e, t) => e.indexOf(t), "getCurrentViewportIndex"), iC = /* @__PURE__ */ a((e, t) => {
  let r = Gd(e, t);
  return r === e.length - 1 ? e[0] : e[r + 1];
}, "getNextViewport"), sC = /* @__PURE__ */ a((e, t) => {
  let r = Gd(e, t);
  return r < 1 ? e[e.length - 1] : e[r - 1];
}, "getPreviousViewport"), Jd = /* @__PURE__ */ a(async (e, t, r, o) => {
  await e.setAddonShortcut(St, {
    label: "Previous viewport",
    defaultShortcut: ["alt", "shift", "V"],
    actionName: "previous",
    action: /* @__PURE__ */ a(() => {
      r({
        viewport: sC(o, t)
      });
    }, "action")
  }), await e.setAddonShortcut(St, {
    label: "Next viewport",
    defaultShortcut: ["alt", "V"],
    actionName: "next",
    action: /* @__PURE__ */ a(() => {
      r({
        viewport: iC(o, t)
      });
    }, "action")
  }), await e.setAddonShortcut(St, {
    label: "Reset viewport",
    defaultShortcut: ["alt", "control", "V"],
    actionName: "reset",
    action: /* @__PURE__ */ a(() => {
      r({
        viewport: { value: void 0, isRotated: !1 }
      });
    }, "action")
  });
}, "registerShortcuts");

// src/viewport/utils.tsx
import ln, { Fragment as lC } from "react";
import { IconButton as cC } from "storybook/internal/components";
import { BrowserIcon as pC, MobileIcon as uC, TabletIcon as dC } from "@storybook/icons";
import { styled as cn } from "storybook/theming";
var Kd = cn.div({
  display: "inline-flex",
  alignItems: "center"
}), ki = cn.div(({ theme: e }) => ({
  display: "inline-block",
  textDecoration: "none",
  padding: 10,
  fontWeight: e.typography.weight.bold,
  fontSize: e.typography.size.s2 - 1,
  lineHeight: "1",
  height: 40,
  border: "none",
  borderTop: "3px solid transparent",
  borderBottom: "3px solid transparent",
  background: "transparent"
})), Yd = cn(cC)(() => ({
  display: "inline-flex",
  alignItems: "center"
})), Xd = cn.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2 - 1,
  marginLeft: 10
})), Zd = {
  desktop: /* @__PURE__ */ ln.createElement(pC, null),
  mobile: /* @__PURE__ */ ln.createElement(uC, null),
  tablet: /* @__PURE__ */ ln.createElement(dC, null),
  other: /* @__PURE__ */ ln.createElement(lC, null)
};

// src/viewport/components/Tool.tsx
var Qd = /* @__PURE__ */ a(({ api: e }) => {
  let t = wC(Br), [r, o, n] = CC(), [i, s] = hC(!1), { options: l = Wd, disable: c } = t || {}, u = r?.[Br] || {}, d = typeof u == "string" ?
  u : u.value, g = typeof u == "string" ? !1 : u.isRotated, p = l[d] || tr, m = i || p !== tr, f = Br in n, h = Object.keys(l).length;
  if (gC(() => {
    Jd(e, d, o, Object.keys(l));
  }, [l, d, o, e]), p.styles === null || !l || h < 1)
    return null;
  if (typeof p.styles == "function")
    return console.warn(
      "Addon Viewport no longer supports dynamic styles using a function, use css calc() instead"
    ), null;
  let b = g ? p.styles.height : p.styles.width, y = g ? p.styles.width : p.styles.height;
  return c ? null : /* @__PURE__ */ Se.createElement(
    AC,
    {
      item: p,
      updateGlobals: o,
      viewportMap: l,
      viewportName: d,
      isRotated: g,
      setIsTooltipVisible: s,
      isLocked: f,
      isActive: m,
      width: b,
      height: y
    }
  );
}, "ViewportTool"), AC = Se.memo(/* @__PURE__ */ a(function(t) {
  let {
    item: r,
    viewportMap: o,
    viewportName: n,
    isRotated: i,
    updateGlobals: s,
    setIsTooltipVisible: l,
    isLocked: c,
    isActive: u,
    width: d,
    height: g
  } = t, p = mC(
    (m) => s({ [Br]: m }),
    [s]
  );
  return /* @__PURE__ */ Se.createElement(fC, null, /* @__PURE__ */ Se.createElement(
    xC,
    {
      placement: "bottom",
      tooltip: ({ onHide: m }) => /* @__PURE__ */ Se.createElement(
        yC,
        {
          links: [
            ...length > 0 && r !== tr ? [
              {
                id: "reset",
                title: "Reset viewport",
                icon: /* @__PURE__ */ Se.createElement(EC, null),
                onClick: /* @__PURE__ */ a(() => {
                  p(void 0), m();
                }, "onClick")
              }
            ] : [],
            ...Object.entries(o).map(([f, h]) => ({
              id: f,
              title: h.name,
              icon: Zd[h.type],
              active: f === n,
              onClick: /* @__PURE__ */ a(() => {
                p({ value: f, isRotated: !1 }), m();
              }, "onClick")
            }))
          ].flat()
        }
      ),
      closeOnOutsideClick: !0,
      onVisibleChange: l
    },
    /* @__PURE__ */ Se.createElement(
      Yd,
      {
        disabled: c,
        key: "viewport",
        title: "Change the size of the preview",
        active: u,
        onDoubleClick: () => {
          p({ value: void 0, isRotated: !1 });
        }
      },
      /* @__PURE__ */ Se.createElement(vC, null),
      r !== tr ? /* @__PURE__ */ Se.createElement(Xd, null, r.name, " ", i ? "(L)" : "(P)") : null
    )
  ), /* @__PURE__ */ Se.createElement(
    TC,
    {
      styles: {
        'iframe[data-is-storybook="true"]': { width: d, height: g }
      }
    }
  ), r !== tr ? /* @__PURE__ */ Se.createElement(Kd, null, /* @__PURE__ */ Se.createElement(ki, { title: "Viewport width" }, d.replace("px",
  "")), c ? "/" : /* @__PURE__ */ Se.createElement(
    bC,
    {
      key: "viewport-rotate",
      title: "Rotate viewport",
      onClick: () => {
        p({ value: n, isRotated: !i });
      }
    },
    /* @__PURE__ */ Se.createElement(SC, null)
  ), /* @__PURE__ */ Se.createElement(ki, { title: "Viewport height" }, g.replace("px", ""))) : null);
}, "PureTool"));

// src/viewport/manager.tsx
var rf = ef.register(St, (e) => {
  globalThis?.FEATURES?.viewport && ef.add(qd, {
    title: "viewport / media-queries",
    type: kC.TOOL,
    match: /* @__PURE__ */ a(({ viewMode: t, tabId: r }) => t === "story" && !r, "match"),
    render: /* @__PURE__ */ a(() => /* @__PURE__ */ tf.createElement(Qd, { api: e }), "render")
  });
});

// src/core-server/presets/common-manager.ts
var PC = "tag-filters", LC = "static-filter", NC = IC.register(PC, (e) => {
  let t = Object.entries(OC.TAGS_OPTIONS ?? {}).reduce(
    (r, o) => {
      let [n, i] = o;
      return i.excludeFromSidebar && (r[n] = !0), r;
    },
    {}
  );
  e.experimental_setFilter(LC, (r) => {
    let o = r.tags ?? [];
    return (
      // we can filter out the primary story, but we still want to show autodocs
      (o.includes("dev") || r.type === "docs") && o.filter((n) => t[n]).length === 0
    );
  });
}), oF = [
  Hd,
  NC,
  Vp,
  Md,
  Pd,
  gp,
  rf,
  Ud
];
export {
  oF as default
};
