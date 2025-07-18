"use strict";
var r = Object.defineProperty;
var G = Object.getOwnPropertyDescriptor;
var n = Object.getOwnPropertyNames;
var T = Object.prototype.hasOwnProperty;
var L = (o, t) => {
  for (var H in t)
    r(o, H, { get: t[H], enumerable: !0 });
}, c = (o, t, H, s) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let e of n(t))
      !T.call(o, e) && e !== H && r(o, e, { get: () => t[e], enumerable: !(s = G(t, e)) || s.enumerable });
  return o;
};
var h = (o) => c(r({}, "__esModule", { value: !0 }), o);

// src/highlight/index.ts
var x = {};
L(x, {
  HIGHLIGHT: () => E,
  REMOVE_HIGHLIGHT: () => _,
  RESET_HIGHLIGHT: () => i,
  SCROLL_INTO_VIEW: () => p
});
module.exports = h(x);

// src/highlight/constants.ts
var I = "storybook/highlight", E = `${I}/add`, _ = `${I}/remove`, i = `${I}/reset`, p = `${I}/scroll-into-view`;
