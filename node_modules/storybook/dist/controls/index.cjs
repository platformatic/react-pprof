"use strict";
var n = Object.defineProperty;
var e = Object.getOwnPropertyDescriptor;
var p = Object.getOwnPropertyNames;
var x = Object.prototype.hasOwnProperty;
var a = (t, o) => {
  for (var s in o)
    n(t, s, { get: o[s], enumerable: !0 });
}, A = (t, o, s, c) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let r of p(o))
      !x.call(t, r) && r !== s && n(t, r, { get: () => o[r], enumerable: !(c = e(o, r)) || c.enumerable });
  return t;
};
var D = (t) => A(n({}, "__esModule", { value: !0 }), t);

// src/controls/index.ts
var l = {};
a(l, {
  ADDON_ID: () => d,
  PARAM_KEY: () => f
});
module.exports = D(l);

// src/controls/constants.ts
var d = "addon-controls", f = "controls";
