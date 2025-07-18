var R = Object.defineProperty;
var r = (A, s) => R(A, "name", { value: s, configurable: !0 });

// src/storybook-error.ts
function l({
  code: A,
  category: s
}) {
  let e = String(A).padStart(4, "0");
  return `SB_${s}_${e}`;
}
r(l, "parseErrorCode");
var c = class c extends Error {
  constructor(e) {
    super(c.getFullMessage(e));
    /**
     * Data associated with the error. Used to provide additional information in the error message or
     * to be passed to telemetry.
     */
    this.data = {};
    /** Flag used to easily determine if the error originates from Storybook. */
    this.fromStorybook = !0;
    this.category = e.category, this.documentation = e.documentation ?? !1, this.code = e.code;
  }
  get fullErrorCode() {
    return l({ code: this.code, category: this.category });
  }
  /** Overrides the default `Error.name` property in the format: SB_<CATEGORY>_<CODE>. */
  get name() {
    let e = this.constructor.name;
    return `${this.fullErrorCode} (${e})`;
  }
  /** Generates the error message along with additional documentation link (if applicable). */
  static getFullMessage({
    documentation: e,
    code: p,
    category: y,
    message: G
  }) {
    let n;
    return e === !0 ? n = `https://storybook.js.org/error/${l({ code: p, category: y })}` : typeof e == "string" ? n = e : Array.isArray(e) &&
    (n = `
${e.map((g) => `	- ${g}`).join(`
`)}`), `${G}${n != null ? `

More info: ${n}
` : ""}`;
  }
};
r(c, "StorybookError");
var o = c;

// src/manager-errors.ts
var M = /* @__PURE__ */ ((t) => (t.MANAGER_UNCAUGHT = "MANAGER_UNCAUGHT", t.MANAGER_UI = "MANAGER_UI", t.MANAGER_API = "MANAGER_API", t.MANAGER_CLIENT_LOGGER =
"MANAGER_CLIENT-LOGGER", t.MANAGER_CHANNELS = "MANAGER_CHANNELS", t.MANAGER_CORE_EVENTS = "MANAGER_CORE-EVENTS", t.MANAGER_ROUTER = "MANAGER\
_ROUTER", t.MANAGER_THEMING = "MANAGER_THEMING", t))(M || {}), a = class a extends o {
  constructor() {
    super({
      category: "MANAGER_UI",
      code: 1,
      message: "The Provider passed into Storybook's UI is not extended from the base Provider. Please check your Provider implementation."
    });
  }
};
r(a, "ProviderDoesNotExtendBaseProviderError");
var d = a, u = class u extends o {
  constructor(e) {
    super({
      category: "MANAGER_UNCAUGHT",
      code: 1,
      message: e.error.message
    });
    this.data = e;
    this.stack = e.error.stack;
  }
};
r(u, "UncaughtManagerError");
var E = u, i = class i extends o {
  constructor(e) {
    super({
      category: "MANAGER_API",
      code: 1,
      message: `Status has typeId "${e.status.typeId}" but was added to store with typeId "${e.typeId}". Full status: ${JSON.stringify(
        e.status,
        null,
        2
      )}`
    });
    this.data = e;
  }
};
r(i, "StatusTypeIdMismatchError");
var N = i;
export {
  M as Category,
  d as ProviderDoesNotExtendBaseProviderError,
  N as StatusTypeIdMismatchError,
  E as UncaughtManagerError
};
