"use strict";
var o = Object.defineProperty;
var n = Object.getOwnPropertyDescriptor;
var l = Object.getOwnPropertyNames;
var m = Object.prototype.hasOwnProperty;
var a = (t, e) => {
  for (var i in e)
    o(t, i, { get: e[i], enumerable: !0 });
}, y = (t, e, i, x) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let p of l(e))
      !m.call(t, p) && p !== i && o(t, p, { get: () => e[p], enumerable: !(x = n(e, p)) || x.enumerable });
  return t;
};
var r = (t) => y(o({}, "__esModule", { value: !0 }), t);

// src/viewport/index.ts
var T = {};
a(T, {
  ADDON_ID: () => h,
  DEFAULT_VIEWPORT: () => g,
  INITIAL_VIEWPORTS: () => b,
  MINIMAL_VIEWPORTS: () => I,
  PANEL_ID: () => d,
  PARAM_KEY: () => s,
  TOOL_ID: () => w,
  initialGlobals: () => A,
  responsiveViewport: () => S
});
module.exports = r(T);

// src/viewport/constants.ts
var h = "storybook/viewport", s = "viewport", d = `${h}/panel`, w = `${h}/tool`;

// src/viewport/defaults.ts
var P = {
  iphone5: {
    name: "iPhone 5",
    styles: {
      height: "568px",
      width: "320px"
    },
    type: "mobile"
  },
  iphone6: {
    name: "iPhone 6",
    styles: {
      height: "667px",
      width: "375px"
    },
    type: "mobile"
  },
  iphone6p: {
    name: "iPhone 6 Plus",
    styles: {
      height: "736px",
      width: "414px"
    },
    type: "mobile"
  },
  iphone8p: {
    name: "iPhone 8 Plus",
    styles: {
      height: "736px",
      width: "414px"
    },
    type: "mobile"
  },
  iphonex: {
    name: "iPhone X",
    styles: {
      height: "812px",
      width: "375px"
    },
    type: "mobile"
  },
  iphonexr: {
    name: "iPhone XR",
    styles: {
      height: "896px",
      width: "414px"
    },
    type: "mobile"
  },
  iphonexsmax: {
    name: "iPhone XS Max",
    styles: {
      height: "896px",
      width: "414px"
    },
    type: "mobile"
  },
  iphonese2: {
    name: "iPhone SE (2nd generation)",
    styles: {
      height: "667px",
      width: "375px"
    },
    type: "mobile"
  },
  iphone12mini: {
    name: "iPhone 12 mini",
    styles: {
      height: "812px",
      width: "375px"
    },
    type: "mobile"
  },
  iphone12: {
    name: "iPhone 12",
    styles: {
      height: "844px",
      width: "390px"
    },
    type: "mobile"
  },
  iphone12promax: {
    name: "iPhone 12 Pro Max",
    styles: {
      height: "926px",
      width: "428px"
    },
    type: "mobile"
  },
  iphoneSE3: {
    name: "iPhone SE 3rd generation",
    styles: {
      height: "667px",
      width: "375px"
    },
    type: "mobile"
  },
  iphone13: {
    name: "iPhone 13",
    styles: {
      height: "844px",
      width: "390px"
    },
    type: "mobile"
  },
  iphone13pro: {
    name: "iPhone 13 Pro",
    styles: {
      height: "844px",
      width: "390px"
    },
    type: "mobile"
  },
  iphone13promax: {
    name: "iPhone 13 Pro Max",
    styles: {
      height: "926px",
      width: "428px"
    },
    type: "mobile"
  },
  iphone14: {
    name: "iPhone 14",
    styles: {
      height: "844px",
      width: "390px"
    },
    type: "mobile"
  },
  iphone14pro: {
    name: "iPhone 14 Pro",
    styles: {
      height: "852px",
      width: "393px"
    },
    type: "mobile"
  },
  iphone14promax: {
    name: "iPhone 14 Pro Max",
    styles: {
      height: "932px",
      width: "430px"
    },
    type: "mobile"
  },
  ipad: {
    name: "iPad",
    styles: {
      height: "1024px",
      width: "768px"
    },
    type: "tablet"
  },
  ipad10p: {
    name: "iPad Pro 10.5-in",
    styles: {
      height: "1112px",
      width: "834px"
    },
    type: "tablet"
  },
  ipad11p: {
    name: "iPad Pro 11-in",
    styles: {
      height: "1194px",
      width: "834px"
    },
    type: "tablet"
  },
  ipad12p: {
    name: "iPad Pro 12.9-in",
    styles: {
      height: "1366px",
      width: "1024px"
    },
    type: "tablet"
  },
  galaxys5: {
    name: "Galaxy S5",
    styles: {
      height: "640px",
      width: "360px"
    },
    type: "mobile"
  },
  galaxys9: {
    name: "Galaxy S9",
    styles: {
      height: "740px",
      width: "360px"
    },
    type: "mobile"
  },
  nexus5x: {
    name: "Nexus 5X",
    styles: {
      height: "660px",
      width: "412px"
    },
    type: "mobile"
  },
  nexus6p: {
    name: "Nexus 6P",
    styles: {
      height: "732px",
      width: "412px"
    },
    type: "mobile"
  },
  pixel: {
    name: "Pixel",
    styles: {
      height: "960px",
      width: "540px"
    },
    type: "mobile"
  },
  pixelxl: {
    name: "Pixel XL",
    styles: {
      height: "1280px",
      width: "720px"
    },
    type: "mobile"
  }
}, b = P, g = "responsive", I = {
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

// src/viewport/preview.ts
var f = require("storybook/preview-api");
var A = {
  [s]: { value: void 0, isRotated: !1 }
};

// src/viewport/responsiveViewport.tsx
var S = {
  name: "Reset viewport",
  styles: {
    height: "100%",
    width: "100%"
  },
  type: "desktop"
};
