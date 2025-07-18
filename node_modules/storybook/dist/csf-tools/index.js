import ESM_COMPAT_Module from "node:module";
import { fileURLToPath as ESM_COMPAT_fileURLToPath } from 'node:url';
import { dirname as ESM_COMPAT_dirname } from 'node:path';
const __filename = ESM_COMPAT_fileURLToPath(import.meta.url);
const __dirname = ESM_COMPAT_dirname(__filename);
const require = ESM_COMPAT_Module.createRequire(import.meta.url);
var ke = Object.create;
var X = Object.defineProperty;
var Ve = Object.getOwnPropertyDescriptor;
var Ae = Object.getOwnPropertyNames;
var $e = Object.getPrototypeOf, Re = Object.prototype.hasOwnProperty;
var f = (s, e) => X(s, "name", { value: e, configurable: !0 });
var Le = (s, e) => () => (e || s((e = { exports: {} }).exports, e), e.exports);
var Me = (s, e, r, t) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let i of Ae(e))
      !Re.call(s, i) && i !== r && X(s, i, { get: () => e[i], enumerable: !(t = Ve(e, i)) || t.enumerable });
  return s;
};
var U = (s, e, r) => (r = s != null ? ke($e(s)) : {}, Me(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !s || !s.__esModule ? X(r, "default", { value: s, enumerable: !0 }) : r,
  s
));

// ../node_modules/ts-dedent/dist/index.js
var k = Le((T) => {
  "use strict";
  Object.defineProperty(T, "__esModule", { value: !0 });
  T.dedent = void 0;
  function se(s) {
    for (var e = [], r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
    var t = Array.from(typeof s == "string" ? [s] : s);
    t[t.length - 1] = t[t.length - 1].replace(/\r?\n([\t ]*)$/, "");
    var i = t.reduce(function(l, p) {
      var d = p.match(/\n([\t ]+|(?!\s).)/g);
      return d ? l.concat(d.map(function(u) {
        var x, b;
        return (b = (x = u.match(/[\t ]/g)) === null || x === void 0 ? void 0 : x.length) !== null && b !== void 0 ? b : 0;
      })) : l;
    }, []);
    if (i.length) {
      var a = new RegExp(`
[	 ]{` + Math.min.apply(Math, i) + "}", "g");
      t = t.map(function(l) {
        return l.replace(a, `
`);
      });
    }
    t[0] = t[0].replace(/^\r?\n/, "");
    var o = t[0];
    return e.forEach(function(l, p) {
      var d = o.match(/(?:^|\n)( *)$/), u = d ? d[1] : "", x = l;
      typeof l == "string" && l.includes(`
`) && (x = String(l).split(`
`).map(function(b, y) {
        return y === 0 ? b : "" + u + b;
      }).join(`
`)), o += x + t[p + 1];
    }), o;
  }
  f(se, "dedent");
  T.dedent = se;
  T.default = se;
});

// src/csf-tools/CsfFile.ts
var O = U(k(), 1);
import { readFile as Ue, writeFile as qe } from "node:fs/promises";
import {
  BabelFileClass as Be,
  babelParse as fe,
  generate as We,
  recast as de,
  types as c,
  traverse as Ge
} from "storybook/internal/babel";
import { isExportStory as ne, storyNameFromExport as oe, toId as ze } from "storybook/internal/csf";
import { logger as ae } from "storybook/internal/node-logger";

// src/csf-tools/findVarInitialization.ts
import { types as V } from "storybook/internal/babel";
var P = /* @__PURE__ */ f((s, e) => {
  let r = null, t = null;
  return e.body.find((i) => (V.isVariableDeclaration(i) ? t = i.declarations : V.isExportNamedDeclaration(i) && V.isVariableDeclaration(i.declaration) &&
  (t = i.declaration.declarations), t && t.find((a) => V.isVariableDeclarator(a) && V.isIdentifier(a.id) && a.id.name === s ? (r = a.init, !0) :
  !1))), r;
}, "findVarInitialization");

// src/csf-tools/CsfFile.ts
var Xe = /\/preview(.(js|jsx|mjs|ts|tsx))?$/, Ke = /* @__PURE__ */ f((s) => Xe.test(s), "isValidPreviewPath");
function Je(s) {
  if (c.isArrayExpression(s))
    return s.elements.map((e) => {
      if (c.isStringLiteral(e))
        return e.value;
      throw new Error(`Expected string literal: ${e}`);
    });
  if (c.isStringLiteral(s))
    return new RegExp(s.value);
  if (c.isRegExpLiteral(s))
    return new RegExp(s.pattern, s.flags);
  throw new Error(`Unknown include/exclude: ${s}`);
}
f(Je, "parseIncludeExclude");
function le(s) {
  if (!c.isArrayExpression(s))
    throw new Error("CSF: Expected tags array");
  return s.elements.map((e) => {
    if (c.isStringLiteral(e))
      return e.value;
    throw new Error("CSF: Expected tag to be string literal");
  });
}
f(le, "parseTags");
var v = /* @__PURE__ */ f((s, e) => {
  let r = "";
  if (s.loc) {
    let { line: t, column: i } = s.loc?.start || {};
    r = `(line ${t}, col ${i})`;
  }
  return `${e || ""} ${r}`.trim();
}, "formatLocation"), Qe = /* @__PURE__ */ f((s) => Ze.test(s), "isModuleMock"), ce = /* @__PURE__ */ f((s, e, r) => {
  let t = s;
  if (c.isCallExpression(s)) {
    let { callee: i, arguments: a } = s;
    if (c.isProgram(e) && c.isMemberExpression(i) && c.isIdentifier(i.object) && c.isIdentifier(i.property) && i.property.name === "bind" &&
    (a.length === 0 || a.length === 1 && c.isObjectExpression(a[0]) && a[0].properties.length === 0)) {
      let o = i.object.name, l = P(o, e);
      l && (r._templates[o] = l, t = l);
    }
  }
  return c.isArrowFunctionExpression(t) || c.isFunctionDeclaration(t) ? t.params.length > 0 : !1;
}, "isArgsStory"), He = /* @__PURE__ */ f((s) => {
  if (c.isArrayExpression(s))
    return s.elements.map((e) => {
      if (c.isStringLiteral(e))
        return e.value;
      throw new Error(`Expected string literal named export: ${e}`);
    });
  throw new Error(`Expected array of string literals: ${s}`);
}, "parseExportsOrder"), pe = /* @__PURE__ */ f((s, e) => e.reduce(
  (r, t) => {
    let i = s[t];
    return i && (r[t] = i), r;
  },
  {}
), "sortExports"), Ye = /* @__PURE__ */ f((s) => {
  if (c.isArrowFunctionExpression(s) || c.isFunctionDeclaration(s)) {
    let e = s.params;
    if (e.length >= 1) {
      let [r] = e;
      if (c.isObjectPattern(r))
        return !!r.properties.find((t) => {
          if (c.isObjectProperty(t) && c.isIdentifier(t.key))
            return t.key.name === "mount";
        });
    }
  }
  return !1;
}, "hasMount"), Ze = /^[.\/#].*\.mock($|\.[^.]*$)/i, q = class extends Error {
  static {
    f(this, "NoMetaError");
  }
  constructor(e, r, t) {
    let i = e.trim();
    super(O.dedent`
      CSF: ${i} ${v(r, t)}
      
      More info: https://storybook.js.org/docs/writing-stories#default-export
    `), this.name = this.constructor.name;
  }
}, K = class extends Error {
  static {
    f(this, "MultipleMetaError");
  }
  constructor(e, r, t) {
    let i = `${e} ${v(r, t)}`.trim();
    super(O.dedent`
      CSF: ${e} ${v(r, t)}
      
      More info: https://storybook.js.org/docs/writing-stories#default-export
    `), this.name = this.constructor.name;
  }
}, B = class extends Error {
  static {
    f(this, "MixedFactoryError");
  }
  constructor(e, r, t) {
    let i = `${e} ${v(r, t)}`.trim();
    super(O.dedent`
      CSF: ${e} ${v(r, t)}
      
      More info: https://storybook.js.org/docs/writing-stories#default-export
    `), this.name = this.constructor.name;
  }
}, W = class extends Error {
  static {
    f(this, "BadMetaError");
  }
  constructor(e, r, t) {
    let i = "".trim();
    super(O.dedent`
      CSF: ${e} ${v(r, t)}
      
      More info: https://storybook.js.org/docs/writing-stories#default-export
    `), this.name = this.constructor.name;
  }
}, J = class {
  constructor(e, r, t) {
    this._stories = {};
    this._metaAnnotations = {};
    this._storyExports = {};
    this._storyPaths = {};
    this._storyStatements = {};
    this._storyAnnotations = {};
    this._templates = {};
    this._ast = e, this._file = t, this._options = r, this.imports = [];
  }
  static {
    f(this, "CsfFile");
  }
  _parseTitle(e) {
    let r = c.isIdentifier(e) ? P(e.name, this._ast.program) : e;
    if (c.isStringLiteral(r))
      return r.value;
    if (c.isTSSatisfiesExpression(r) && c.isStringLiteral(r.expression))
      return r.expression.value;
    throw new Error(O.dedent`
      CSF: unexpected dynamic title ${v(r, this._options.fileName)}

      More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#string-literal-titles
    `);
  }
  _parseMeta(e, r) {
    if (this._metaNode)
      throw new K("multiple meta objects", e, this._options.fileName);
    this._metaNode = e;
    let t = {};
    e.properties.forEach((i) => {
      if (c.isIdentifier(i.key)) {
        if (this._metaAnnotations[i.key.name] = i.value, i.key.name === "title")
          t.title = this._parseTitle(i.value);
        else if (["includeStories", "excludeStories"].includes(i.key.name))
          t[i.key.name] = Je(i.value);
        else if (i.key.name === "component") {
          let a = i.value;
          if (c.isIdentifier(a)) {
            let l = a.name, p = r.body.find(
              (d) => c.isImportDeclaration(d) && d.specifiers.find((u) => u.local.name === l)
            );
            if (p) {
              let { source: d } = p;
              c.isStringLiteral(d) && (this._rawComponentPath = d.value);
            }
          }
          let { code: o } = de.print(i.value, {});
          t.component = o;
        } else if (i.key.name === "tags") {
          let a = i.value;
          c.isIdentifier(a) && (a = P(a.name, this._ast.program)), t.tags = le(a);
        } else if (i.key.name === "id")
          if (c.isStringLiteral(i.value))
            t.id = i.value.value;
          else
            throw new Error(`Unexpected component id: ${i.value}`);
      }
    }), this._meta = t;
  }
  getStoryExport(e) {
    let r = this._storyExports[e];
    if (r = c.isVariableDeclarator(r) ? r.init : r, c.isCallExpression(r)) {
      let { callee: t, arguments: i } = r;
      if (c.isMemberExpression(t) && c.isIdentifier(t.object) && c.isIdentifier(t.property) && t.property.name === "bind" && (i.length === 0 ||
      i.length === 1 && c.isObjectExpression(i[0]) && i[0].properties.length === 0)) {
        let { name: a } = t.object;
        r = this._templates[a];
      }
    }
    return r;
  }
  parse() {
    let e = this;
    if (Ge(this._ast, {
      ExportDefaultDeclaration: {
        enter(t) {
          let { node: i, parent: a } = t, o = c.isIdentifier(i.declaration) && c.isProgram(a);
          if (e._options.transformInlineMeta && !o && c.isExpression(i.declaration)) {
            let d = t.scope.generateUidIdentifier("meta");
            e._metaVariableName = d.name;
            let u = [
              c.variableDeclaration("const", [c.variableDeclarator(d, i.declaration)]),
              c.exportDefaultDeclaration(d)
            ];
            u.forEach((x) => x.loc = t.node.loc), t.replaceWithMultiple(u);
            return;
          }
          let l, p;
          if (o) {
            let d = i.declaration.name;
            e._metaVariableName = d;
            let u = /* @__PURE__ */ f((x) => c.isIdentifier(x.id) && x.id.name === d, "isVariableDeclarator");
            e._metaStatement = e._ast.program.body.find(
              (x) => c.isVariableDeclaration(x) && x.declarations.find(u)
            ), p = (e?._metaStatement?.declarations || []).find(
              u
            )?.init;
          } else
            e._metaStatement = i, p = i.declaration;
          if (c.isObjectExpression(p) ? l = p : (
            // export default { ... } as Meta<...>
            (c.isTSAsExpression(p) || c.isTSSatisfiesExpression(p)) && c.isObjectExpression(p.expression) && (l = p.expression)
          ), l && c.isProgram(a) && e._parseMeta(l, a), e._metaStatement && !e._metaNode)
            throw new q(
              "default export must be an object",
              e._metaStatement,
              e._options.fileName
            );
          e._metaPath = t;
        }
      },
      ExportNamedDeclaration: {
        enter(t) {
          let { node: i, parent: a } = t, o;
          c.isVariableDeclaration(i.declaration) ? o = i.declaration.declarations.filter((l) => c.isVariableDeclarator(l)) : c.isFunctionDeclaration(
          i.declaration) && (o = [i.declaration]), o ? o.forEach((l) => {
            if (c.isIdentifier(l.id)) {
              let p = !1, { name: d } = l.id;
              if (d === "__namedExportsOrder" && c.isVariableDeclarator(l)) {
                e._namedExportsOrder = He(l.init);
                return;
              }
              e._storyExports[d] = l, e._storyPaths[d] = t, e._storyStatements[d] = i;
              let u = oe(d);
              e._storyAnnotations[d] ? ae.warn(
                `Unexpected annotations for "${d}" before story declaration`
              ) : e._storyAnnotations[d] = {};
              let x;
              if (c.isVariableDeclarator(l) ? x = c.isTSAsExpression(l.init) || c.isTSSatisfiesExpression(l.init) ? l.init.expression : l.init :
              x = l, c.isCallExpression(x) && c.isMemberExpression(x.callee) && c.isIdentifier(x.callee.property) && x.callee.property.name ===
              "story" && (p = !0, x = x.arguments[0]), e._metaIsFactory && !p)
                throw new B(
                  "expected factory story",
                  x,
                  e._options.fileName
                );
              if (!e._metaIsFactory && p)
                throw e._metaNode ? new B(
                  "expected non-factory story",
                  x,
                  e._options.fileName
                ) : new W(
                  "meta() factory must be imported from .storybook/preview configuration",
                  x,
                  e._options.fileName
                );
              let b = {};
              c.isObjectExpression(x) ? (b.__isArgsStory = !0, x.properties.forEach((y) => {
                if (c.isIdentifier(y.key)) {
                  if (y.key.name === "render")
                    b.__isArgsStory = ce(
                      y.value,
                      a,
                      e
                    );
                  else if (y.key.name === "name" && c.isStringLiteral(y.value))
                    u = y.value.value;
                  else if (y.key.name === "storyName" && c.isStringLiteral(y.value))
                    ae.warn(
                      `Unexpected usage of "storyName" in "${d}". Please use "name" instead.`
                    );
                  else if (y.key.name === "parameters" && c.isObjectExpression(y.value)) {
                    let _ = y.value.properties.find(
                      (L) => c.isObjectProperty(L) && c.isIdentifier(L.key) && L.key.name === "__id"
                    );
                    _ && (b.__id = _.value.value);
                  }
                  e._storyAnnotations[d][y.key.name] = y.value;
                }
              })) : b.__isArgsStory = ce(x, a, e), e._stories[d] = {
                id: "FIXME",
                name: u,
                parameters: b,
                __stats: {
                  factory: p
                }
              };
            }
          }) : i.specifiers.length > 0 && i.specifiers.forEach((l) => {
            if (c.isExportSpecifier(l) && c.isIdentifier(l.exported)) {
              let { name: p } = l.exported, { name: d } = l.local, u = c.isProgram(a) ? P(d, a) : l.local;
              if (p === "default") {
                let x;
                c.isObjectExpression(u) ? x = u : (
                  // export default { ... } as Meta<...>
                  c.isTSAsExpression(u) && c.isObjectExpression(u.expression) && (x = u.expression)
                ), x && c.isProgram(a) && e._parseMeta(x, a);
              } else {
                let x = {}, b = u;
                c.isObjectExpression(b) && b.properties.forEach((y) => {
                  c.isIdentifier(y.key) && (x[y.key.name] = y.value);
                }), e._storyAnnotations[p] = x, e._storyStatements[p] = u, e._storyPaths[p] = t, e._stories[p] = {
                  id: "FIXME",
                  name: p,
                  localName: d,
                  parameters: {},
                  __stats: {}
                };
              }
            }
          });
        }
      },
      ExpressionStatement: {
        enter({ node: t, parent: i }) {
          let { expression: a } = t;
          if (c.isProgram(i) && c.isAssignmentExpression(a) && c.isMemberExpression(a.left) && c.isIdentifier(a.left.object) && c.isIdentifier(
          a.left.property)) {
            let o = a.left.object.name, l = a.left.property.name, p = a.right;
            if (e._storyAnnotations[o] && (l === "story" && c.isObjectExpression(p) ? p.properties.forEach((d) => {
              c.isIdentifier(d.key) && (e._storyAnnotations[o][d.key.name] = d.value);
            }) : e._storyAnnotations[o][l] = p), l === "storyName" && c.isStringLiteral(p)) {
              let d = p.value, u = e._stories[o];
              if (!u)
                return;
              u.name = d;
            }
          }
        }
      },
      CallExpression: {
        enter(t) {
          let { node: i } = t, { callee: a } = i;
          if (c.isIdentifier(a) && a.name === "storiesOf")
            throw new Error(O.dedent`
              Unexpected \`storiesOf\` usage: ${v(i, e._options.fileName)}.

              SB8 does not support \`storiesOf\`. 
            `);
          if (c.isMemberExpression(a) && c.isIdentifier(a.property) && a.property.name === "meta" && c.isIdentifier(a.object) && i.arguments.
          length > 0) {
            let l = t.scope.getBinding(a.object.name)?.path?.parentPath?.node;
            if (c.isImportDeclaration(l))
              if (Ke(l.source.value)) {
                let p = i.arguments[0];
                e._metaVariableName = a.property.name, e._metaIsFactory = !0, e._parseMeta(p, e._ast.program);
              } else
                throw new W(
                  "meta() factory must be imported from .storybook/preview configuration",
                  l,
                  e._options.fileName
                );
          }
        }
      },
      ImportDeclaration: {
        enter({ node: t }) {
          let { source: i } = t;
          if (c.isStringLiteral(i))
            e.imports.push(i.value);
          else
            throw new Error("CSF: unexpected import source");
        }
      }
    }), !e._meta)
      throw new q("missing default export", e._ast, e._options.fileName);
    let r = Object.entries(e._stories);
    if (e._meta.title = this._options.makeTitle(e._meta?.title), e._metaAnnotations.play && (e._meta.tags = [...e._meta.tags || [], "play-fn"]),
    e._stories = r.reduce(
      (t, [i, a]) => {
        if (!ne(i, e._meta))
          return t;
        let o = a.parameters?.__id ?? ze(e._meta?.id || e._meta?.title, oe(i)), l = { ...a.parameters, __id: o }, { includeStories: p } = e.
        _meta || {};
        i === "__page" && (r.length === 1 || Array.isArray(p) && p.length === 1) && (l.docsOnly = !0), t[i] = { ...a, id: o, parameters: l };
        let d = e._storyAnnotations[i], { tags: u, play: x } = d;
        if (u) {
          let _ = c.isIdentifier(u) ? P(u.name, this._ast.program) : u;
          t[i].tags = le(_);
        }
        x && (t[i].tags = [...t[i].tags || [], "play-fn"]);
        let b = t[i].__stats;
        ["play", "render", "loaders", "beforeEach", "globals", "tags"].forEach((_) => {
          b[_] = !!d[_] || !!e._metaAnnotations[_];
        });
        let y = e.getStoryExport(i);
        return b.storyFn = !!(c.isArrowFunctionExpression(y) || c.isFunctionDeclaration(y)), b.mount = Ye(d.play ?? e._metaAnnotations.play),
        b.moduleMock = !!e.imports.find((_) => Qe(_)), t;
      },
      {}
    ), Object.keys(e._storyExports).forEach((t) => {
      ne(t, e._meta) || (delete e._storyExports[t], delete e._storyAnnotations[t], delete e._storyStatements[t]);
    }), e._namedExportsOrder) {
      let t = Object.keys(e._storyExports);
      e._storyExports = pe(e._storyExports, e._namedExportsOrder), e._stories = pe(e._stories, e._namedExportsOrder);
      let i = Object.keys(e._storyExports);
      if (t.length !== i.length)
        throw new Error(
          `Missing exports after sort: ${t.filter(
            (a) => !i.includes(a)
          )}`
        );
    }
    return e;
  }
  get meta() {
    return this._meta;
  }
  get stories() {
    return Object.values(this._stories);
  }
  get indexInputs() {
    let { fileName: e } = this._options;
    if (!e)
      throw new Error(
        O.dedent`Cannot automatically create index inputs with CsfFile.indexInputs because the CsfFile instance was created without a the fileName option.
        Either add the fileName option when creating the CsfFile instance, or create the index inputs manually.`
      );
    return Object.entries(this._stories).map(([r, t]) => {
      let i = [...this._meta?.tags ?? [], ...t.tags ?? []];
      return {
        type: "story",
        importPath: e,
        rawComponentPath: this._rawComponentPath,
        exportName: r,
        name: t.name,
        title: this.meta?.title,
        metaId: this.meta?.id,
        tags: i,
        __id: t.id,
        __stats: t.__stats
      };
    });
  }
}, et = /* @__PURE__ */ f(({
  code: s,
  filename: e = "",
  ast: r
}) => new Be({ filename: e }, { code: s, ast: r ?? fe(s) }), "babelParseFile"), Q = /* @__PURE__ */ f((s, e) => {
  let r = fe(s), t = et({ code: s, filename: e.fileName, ast: r });
  return new J(r, e, t);
}, "loadCsf"), me = /* @__PURE__ */ f((s, e = { sourceMaps: !1 }, r) => {
  let t = We(s._ast, e, r);
  return e.sourceMaps ? t : t.code;
}, "formatCsf"), tt = /* @__PURE__ */ f((s, e = {}) => de.print(s._ast, e), "printCsf"), Ft = /* @__PURE__ */ f(async (s, e) => {
  let r = (await Ue(s, "utf-8")).toString();
  return Q(r, { ...e, fileName: s });
}, "readCsf"), Ct = /* @__PURE__ */ f(async (s, e) => {
  if (!(e || s._options.fileName))
    throw new Error("Please specify a fileName for writeCsf");
  await qe(e, tt(s).code);
}, "writeCsf");

// src/csf-tools/ConfigFile.ts
var ye = U(k(), 1);
import { readFile as rt, writeFile as it } from "node:fs/promises";
import {
  babelParse as xe,
  generate as ue,
  recast as st,
  types as n,
  traverse as ge
} from "storybook/internal/babel";
import { logger as H } from "storybook/internal/node-logger";
var Y = /* @__PURE__ */ f(({
  expectedType: s,
  foundType: e,
  node: r
}) => ye.dedent`
      CSF Parsing error: Expected '${s}' but found '${e}' instead in '${r?.type}'.
    `, "getCsfParsingErrorMessage"), N = /* @__PURE__ */ f((s) => n.isIdentifier(s.key) ? s.key.name : n.isStringLiteral(s.key) ? s.key.value :
null, "propKey"), G = /* @__PURE__ */ f((s) => n.isTSAsExpression(s) || n.isTSSatisfiesExpression(s) ? G(s.expression) : s, "unwrap"), be = /* @__PURE__ */ f(
(s, e) => {
  if (s.length === 0)
    return e;
  if (n.isObjectExpression(e)) {
    let [r, ...t] = s, i = e.properties.find((a) => N(a) === r);
    if (i)
      return be(t, i.value);
  }
}, "_getPath"), he = /* @__PURE__ */ f((s, e) => {
  if (s.length === 0) {
    if (n.isObjectExpression(e))
      return e.properties;
    throw new Error("Expected object expression");
  }
  if (n.isObjectExpression(e)) {
    let [r, ...t] = s, i = e.properties.find((a) => N(a) === r);
    if (i)
      return t.length === 0 ? e.properties : he(t, i.value);
  }
}, "_getPathProperties"), z = /* @__PURE__ */ f((s, e) => {
  let r = null, t = null;
  return e.body.find((i) => (n.isVariableDeclaration(i) ? t = i.declarations : n.isExportNamedDeclaration(i) && n.isVariableDeclaration(i.declaration) &&
  (t = i.declaration.declarations), t && t.find((a) => n.isVariableDeclarator(a) && n.isIdentifier(a.id) && a.id.name === s ? (r = a, !0) : !1))),
  r;
}, "_findVarDeclarator"), I = /* @__PURE__ */ f((s, e) => z(s, e)?.init, "_findVarInitialization"), $ = /* @__PURE__ */ f((s, e) => {
  if (s.length === 0)
    return e;
  let [r, ...t] = s, i = $(t, e);
  return n.objectExpression([n.objectProperty(n.identifier(r), i)]);
}, "_makeObjectExpression"), A = /* @__PURE__ */ f((s, e, r) => {
  let [t, ...i] = s, a = r.properties.find(
    (o) => N(o) === t
  );
  a ? n.isObjectExpression(a.value) && i.length > 0 ? A(i, e, a.value) : a.value = $(i, e) : r.properties.push(
    n.objectProperty(n.identifier(t), $(i, e))
  );
}, "_updateExportNode"), Z = class {
  constructor(e, r, t) {
    this._exports = {};
    // FIXME: this is a hack. this is only used in the case where the user is
    // modifying a named export that's a scalar. The _exports map is not suitable
    // for that. But rather than refactor the whole thing, we just use this as a stopgap.
    this._exportDecls = {};
    this.hasDefaultExport = !1;
    this._ast = e, this._code = r, this.fileName = t;
  }
  static {
    f(this, "ConfigFile");
  }
  _parseExportsObject(e) {
    this._exportsObject = e, e.properties.forEach((r) => {
      let t = N(r);
      if (t) {
        let i = r.value;
        n.isIdentifier(i) && (i = I(i.name, this._ast.program)), this._exports[t] = i;
      }
    });
  }
  parse() {
    let e = this;
    return ge(this._ast, {
      ExportDefaultDeclaration: {
        enter({ node: r, parent: t }) {
          e.hasDefaultExport = !0;
          let i = n.isIdentifier(r.declaration) && n.isProgram(t) ? I(r.declaration.name, t) : r.declaration;
          i = G(i), n.isCallExpression(i) && n.isObjectExpression(i.arguments[0]) && (i = i.arguments[0]), n.isObjectExpression(i) ? e._parseExportsObject(
          i) : H.warn(
            Y({
              expectedType: "ObjectExpression",
              foundType: i?.type,
              node: i || r.declaration
            })
          );
        }
      },
      ExportNamedDeclaration: {
        enter({ node: r, parent: t }) {
          if (n.isVariableDeclaration(r.declaration))
            r.declaration.declarations.forEach((i) => {
              if (n.isVariableDeclarator(i) && n.isIdentifier(i.id)) {
                let { name: a } = i.id, o = i.init;
                n.isIdentifier(o) && (o = I(o.name, t)), e._exports[a] = o, e._exportDecls[a] = i;
              }
            });
          else if (n.isFunctionDeclaration(r.declaration)) {
            let i = r.declaration;
            if (n.isIdentifier(i.id)) {
              let { name: a } = i.id;
              e._exportDecls[a] = i;
            }
          } else r.specifiers ? r.specifiers.forEach((i) => {
            if (n.isExportSpecifier(i) && n.isIdentifier(i.local) && n.isIdentifier(i.exported)) {
              let { name: a } = i.local, { name: o } = i.exported, l = z(a, t);
              l && (e._exports[o] = l.init, e._exportDecls[o] = l);
            }
          }) : H.warn(
            Y({
              expectedType: "VariableDeclaration",
              foundType: r.declaration?.type,
              node: r.declaration
            })
          );
        }
      },
      ExpressionStatement: {
        enter({ node: r, parent: t }) {
          if (n.isAssignmentExpression(r.expression) && r.expression.operator === "=") {
            let { left: i, right: a } = r.expression;
            if (n.isMemberExpression(i) && n.isIdentifier(i.object) && i.object.name === "module" && n.isIdentifier(i.property) && i.property.
            name === "exports") {
              let o = a;
              n.isIdentifier(a) && (o = I(a.name, t)), o = G(o), n.isObjectExpression(o) ? (e._exportsObject = o, o.properties.forEach((l) => {
                let p = N(l);
                if (p) {
                  let d = l.value;
                  n.isIdentifier(d) && (d = I(
                    d.name,
                    t
                  )), e._exports[p] = d;
                }
              })) : H.warn(
                Y({
                  expectedType: "ObjectExpression",
                  foundType: o?.type,
                  node: o
                })
              );
            }
          }
        }
      },
      CallExpression: {
        enter: /* @__PURE__ */ f(({ node: r }) => {
          n.isIdentifier(r.callee) && r.callee.name === "definePreview" && r.arguments.length === 1 && n.isObjectExpression(r.arguments[0]) &&
          e._parseExportsObject(r.arguments[0]);
        }, "enter")
      }
    }), e;
  }
  getFieldNode(e) {
    let [r, ...t] = e, i = this._exports[r];
    if (i)
      return be(t, i);
  }
  getFieldProperties(e) {
    let [r, ...t] = e, i = this._exports[r];
    if (i)
      return he(t, i);
  }
  getFieldValue(e) {
    let r = this.getFieldNode(e);
    if (r) {
      let { code: t } = ue(r, {});
      return (0, eval)(`(() => (${t}))()`);
    }
  }
  getSafeFieldValue(e) {
    try {
      return this.getFieldValue(e);
    } catch {
    }
  }
  setFieldNode(e, r) {
    let [t, ...i] = e, a = this._exports[t];
    if (this._exportsObject) {
      let p = this._exportsObject.properties.find((d) => N(d) === t);
      if (p && n.isIdentifier(p.value)) {
        let d = z(p.value.name, this._ast.program);
        if (d && n.isObjectExpression(d.init)) {
          A(i, r, d.init);
          return;
        }
      }
      A(e, r, this._exportsObject), this._exports[e[0]] = r;
      return;
    }
    if (a && n.isObjectExpression(a) && i.length > 0) {
      A(i, r, a);
      return;
    }
    let o = z(t, this._ast.program);
    if (o && n.isObjectExpression(o.init)) {
      A(i, r, o.init);
      return;
    }
    if (a && i.length === 0 && this._exportDecls[e[0]]) {
      let l = this._exportDecls[e[0]];
      n.isVariableDeclarator(l) && (l.init = $([], r));
    } else {
      if (this.hasDefaultExport)
        throw new Error(
          `Could not set the "${e.join(
            "."
          )}" field as the default export is not an object in this file.`
        );
      {
        let l = $(i, r), p = n.exportNamedDeclaration(
          n.variableDeclaration("const", [n.variableDeclarator(n.identifier(t), l)])
        );
        this._exports[t] = l, this._ast.program.body.push(p);
      }
    }
  }
  /**
   * @example
   *
   * ```ts
   * // 1. { framework: 'framework-name' }
   * // 2. { framework: { name: 'framework-name', options: {} }
   * getNameFromPath(['framework']); // => 'framework-name'
   * ```
   *
   * @returns The name of a node in a given path, supporting the following formats:
   */
  getNameFromPath(e) {
    let r = this.getFieldNode(e);
    if (r)
      return this._getPresetValue(r, "name");
  }
  /**
   * Returns an array of names of a node in a given path, supporting the following formats:
   *
   * @example
   *
   * ```ts
   * const config = {
   *   addons: ['first-addon', { name: 'second-addon', options: {} }],
   * };
   * // => ['first-addon', 'second-addon']
   * getNamesFromPath(['addons']);
   * ```
   */
  getNamesFromPath(e) {
    let r = this.getFieldNode(e);
    if (!r)
      return;
    let t = [];
    return n.isArrayExpression(r) && r.elements.forEach((i) => {
      t.push(this._getPresetValue(i, "name"));
    }), t;
  }
  _getPnpWrappedValue(e) {
    if (n.isCallExpression(e)) {
      let r = e.arguments[0];
      if (n.isStringLiteral(r))
        return r.value;
    }
  }
  /**
   * Given a node and a fallback property, returns a **non-evaluated** string value of the node.
   *
   * 1. `{ node: 'value' }`
   * 2. `{ node: { fallbackProperty: 'value' } }`
   */
  _getPresetValue(e, r) {
    let t;
    if (n.isStringLiteral(e) ? t = e.value : n.isObjectExpression(e) ? e.properties.forEach((i) => {
      n.isObjectProperty(i) && n.isIdentifier(i.key) && i.key.name === r && (n.isStringLiteral(i.value) ? t = i.value.value : t = this._getPnpWrappedValue(
      i.value)), n.isObjectProperty(i) && n.isStringLiteral(i.key) && i.key.value === "name" && n.isStringLiteral(i.value) && (t = i.value.value);
    }) : n.isCallExpression(e) && (t = this._getPnpWrappedValue(e)), !t)
      throw new Error(
        `The given node must be a string literal or an object expression with a "${r}" property that is a string literal.`
      );
    return t;
  }
  removeField(e) {
    let r = /* @__PURE__ */ f((i, a) => {
      let o = i.findIndex(
        (l) => n.isIdentifier(l.key) && l.key.name === a || n.isStringLiteral(l.key) && l.key.value === a
      );
      o >= 0 && i.splice(o, 1);
    }, "removeProperty");
    if (e.length === 1) {
      let i = !1;
      if (this._ast.program.body.forEach((a) => {
        if (n.isExportNamedDeclaration(a) && n.isVariableDeclaration(a.declaration)) {
          let o = a.declaration.declarations[0];
          n.isIdentifier(o.id) && o.id.name === e[0] && (this._ast.program.body.splice(this._ast.program.body.indexOf(a), 1), i = !0);
        }
        if (n.isExportDefaultDeclaration(a)) {
          let o = a.declaration;
          if (n.isIdentifier(o) && (o = I(o.name, this._ast.program)), o = G(o), n.isObjectExpression(o)) {
            let l = o.properties;
            r(l, e[0]), i = !0;
          }
        }
        if (n.isExpressionStatement(a) && n.isAssignmentExpression(a.expression) && n.isMemberExpression(a.expression.left) && n.isIdentifier(
        a.expression.left.object) && a.expression.left.object.name === "module" && n.isIdentifier(a.expression.left.property) && a.expression.
        left.property.name === "exports" && n.isObjectExpression(a.expression.right)) {
          let o = a.expression.right.properties;
          r(o, e[0]), i = !0;
        }
      }), i)
        return;
    }
    let t = this.getFieldProperties(e);
    if (t) {
      let i = e.at(-1);
      r(t, i);
    }
  }
  appendValueToArray(e, r) {
    let t = this.valueToNode(r);
    t && this.appendNodeToArray(e, t);
  }
  appendNodeToArray(e, r) {
    let t = this.getFieldNode(e);
    if (!t)
      this.setFieldNode(e, n.arrayExpression([r]));
    else if (n.isArrayExpression(t))
      t.elements.push(r);
    else
      throw new Error(`Expected array at '${e.join(".")}', got '${t.type}'`);
  }
  /**
   * Specialized helper to remove addons or other array entries that can either be strings or
   * objects with a name property.
   */
  removeEntryFromArray(e, r) {
    let t = this.getFieldNode(e);
    if (t)
      if (n.isArrayExpression(t)) {
        let i = t.elements.findIndex((a) => n.isStringLiteral(a) ? a.value === r : n.isObjectExpression(a) ? this._getPresetValue(a, "name") ===
        r : this._getPnpWrappedValue(a) === r);
        if (i >= 0)
          t.elements.splice(i, 1);
        else
          throw new Error(`Could not find '${r}' in array at '${e.join(".")}'`);
      } else
        throw new Error(`Expected array at '${e.join(".")}', got '${t.type}'`);
  }
  _inferQuotes() {
    if (!this._quotes) {
      let e = (this._ast.tokens || []).slice(0, 500).reduce(
        (r, t) => (t.type.label === "string" && (r[this._code[t.start]] += 1), r),
        { "'": 0, '"': 0 }
      );
      this._quotes = e["'"] > e['"'] ? "single" : "double";
    }
    return this._quotes;
  }
  valueToNode(e) {
    let r = this._inferQuotes(), t;
    if (r === "single") {
      let { code: i } = ue(n.valueToNode(e), { jsescOption: { quotes: r } }), a = xe(`const __x = ${i}`);
      ge(a, {
        VariableDeclaration: {
          enter({ node: o }) {
            o.declarations.length === 1 && n.isVariableDeclarator(o.declarations[0]) && n.isIdentifier(o.declarations[0].id) && o.declarations[0].
            id.name === "__x" && (t = o.declarations[0].init);
          }
        }
      });
    } else
      t = n.valueToNode(e);
    return t;
  }
  setFieldValue(e, r) {
    let t = this.valueToNode(r);
    if (!t)
      throw new Error(`Unexpected value ${JSON.stringify(r)}`);
    this.setFieldNode(e, t);
  }
  getBodyDeclarations() {
    return this._ast.program.body;
  }
  setBodyDeclaration(e) {
    this._ast.program.body.push(e);
  }
  /**
   * Import specifiers for a specific require import
   *
   * @example
   *
   * ```ts
   * // const { foo } = require('bar');
   * setRequireImport(['foo'], 'bar');
   *
   * // const foo = require('bar');
   * setRequireImport('foo', 'bar');
   * ```
   *
   * @param importSpecifiers - The import specifiers to set. If a string is passed in, a default
   *   import will be set. Otherwise, an array of named imports will be set
   * @param fromImport - The module to import from
   */
  setRequireImport(e, r) {
    let t = this._ast.program.body.find((o) => {
      let l = n.isVariableDeclaration(o) && o.declarations.length === 1 && n.isVariableDeclarator(o.declarations[0]) && n.isCallExpression(o.
      declarations[0].init) && n.isIdentifier(o.declarations[0].init.callee) && o.declarations[0].init.callee.name === "require" && n.isStringLiteral(
      o.declarations[0].init.arguments[0]) && (o.declarations[0].init.arguments[0].value === r || o.declarations[0].init.arguments[0].value ===
      r.split("node:")[1]);
      return l && (r = o.declarations[0].init.arguments[0].value), l;
    }), i = /* @__PURE__ */ f((o) => n.isObjectPattern(t?.declarations[0].id) && t?.declarations[0].id.properties.find(
      (l) => n.isObjectProperty(l) && n.isIdentifier(l.key) && l.key.name === o
    ), "hasRequireSpecifier"), a = /* @__PURE__ */ f((o, l) => o.declarations.length === 1 && n.isVariableDeclarator(o.declarations[0]) && n.
    isIdentifier(o.declarations[0].id) && o.declarations[0].id.name === l, "hasDefaultRequireSpecifier");
    if (typeof e == "string") {
      let o = /* @__PURE__ */ f(() => {
        this._ast.program.body.unshift(
          n.variableDeclaration("const", [
            n.variableDeclarator(
              n.identifier(e),
              n.callExpression(n.identifier("require"), [n.stringLiteral(r)])
            )
          ])
        );
      }, "addDefaultRequireSpecifier");
      t && a(t, e) || o();
    } else t ? e.forEach((o) => {
      i(o) || t.declarations[0].id.properties.push(
        n.objectProperty(n.identifier(o), n.identifier(o), void 0, !0)
      );
    }) : this._ast.program.body.unshift(
      n.variableDeclaration("const", [
        n.variableDeclarator(
          n.objectPattern(
            e.map(
              (o) => n.objectProperty(n.identifier(o), n.identifier(o), void 0, !0)
            )
          ),
          n.callExpression(n.identifier("require"), [n.stringLiteral(r)])
        )
      ])
    );
  }
  /**
   * Set import specifiers for a given import statement.
   *
   * Does not support setting type imports (yet)
   *
   * @example
   *
   * ```ts
   * // import { foo } from 'bar';
   * setImport(['foo'], 'bar');
   *
   * // import foo from 'bar';
   * setImport('foo', 'bar');
   *
   * // import * as foo from 'bar';
   * setImport({ namespace: 'foo' }, 'bar');
   *
   * // import 'bar';
   * setImport(null, 'bar');
   * ```
   *
   * @param importSpecifiers - The import specifiers to set. If a string is passed in, a default
   *   import will be set. Otherwise, an array of named imports will be set
   * @param fromImport - The module to import from
   */
  setImport(e, r) {
    let t = this._ast.program.body.find((p) => {
      let d = n.isImportDeclaration(p) && (p.source.value === r || p.source.value === r.split("node:")[1]);
      return d && (r = p.source.value), d;
    }), i = /* @__PURE__ */ f((p) => n.importSpecifier(n.identifier(p), n.identifier(p)), "getNewImportSpecifier"), a = /* @__PURE__ */ f((p, d) => p.
    specifiers.find(
      (u) => n.isImportSpecifier(u) && n.isIdentifier(u.imported) && u.imported.name === d
    ), "hasImportSpecifier"), o = /* @__PURE__ */ f((p, d) => p.specifiers.find(
      (u) => n.isImportNamespaceSpecifier(u) && n.isIdentifier(u.local) && u.local.name === d
    ), "hasNamespaceImportSpecifier");
    e === null ? t || this._ast.program.body.unshift(n.importDeclaration([], n.stringLiteral(r))) : typeof e == "string" ? t ? (/* @__PURE__ */ f(
    (p, d) => p.specifiers.find(
      (u) => n.isImportDefaultSpecifier(u) && n.isIdentifier(u.local) && u.local.name === d
    ), "hasDefaultImportSpecifier"))(t, e) || t.specifiers.push(
      n.importDefaultSpecifier(n.identifier(e))
    ) : this._ast.program.body.unshift(
      n.importDeclaration(
        [n.importDefaultSpecifier(n.identifier(e))],
        n.stringLiteral(r)
      )
    ) : Array.isArray(e) ? t ? e.forEach((p) => {
      a(t, p) || t.specifiers.push(i(p));
    }) : this._ast.program.body.unshift(
      n.importDeclaration(
        e.map(i),
        n.stringLiteral(r)
      )
    ) : e.namespace && (t ? o(t, e.namespace) || t.specifiers.push(
      n.importNamespaceSpecifier(n.identifier(e.namespace))
    ) : this._ast.program.body.unshift(
      n.importDeclaration(
        [n.importNamespaceSpecifier(n.identifier(e.namespace))],
        n.stringLiteral(r)
      )
    ));
  }
}, nt = /* @__PURE__ */ f((s, e) => {
  let r = xe(s);
  return new Z(r, s, e);
}, "loadConfig"), ot = /* @__PURE__ */ f((s) => at(s).code, "formatConfig"), at = /* @__PURE__ */ f((s, e = {}) => st.print(s._ast, e), "pri\
ntConfig"), Rt = /* @__PURE__ */ f(async (s) => {
  let e = (await rt(s, "utf-8")).toString();
  return nt(e, s).parse();
}, "readConfig"), Lt = /* @__PURE__ */ f(async (s, e) => {
  let r = e || s.fileName;
  if (!r)
    throw new Error("Please specify a fileName for writeConfig");
  await it(r, ot(s));
}, "writeConfig"), Mt = /* @__PURE__ */ f((s) => !!s._ast.program.body.find((r) => n.isImportDeclaration(r) && r.source.value.includes("@sto\
rybook") && r.specifiers.some((t) => n.isImportSpecifier(t) && n.isIdentifier(t.imported) && t.imported.name === "definePreview")), "isCsfFa\
ctoryPreview");

// src/csf-tools/getStorySortParameter.ts
var je = U(k(), 1);
import { babelParse as lt, generate as Ee, types as h, traverse as ct } from "storybook/internal/babel";
import { logger as pt } from "storybook/internal/node-logger";
var ee = /* @__PURE__ */ f((s, e) => {
  let r;
  return s.properties.forEach((t) => {
    h.isIdentifier(t.key) && t.key.name === e && (r = t.value);
  }), r;
}, "getValue"), te = /* @__PURE__ */ f((s) => {
  let e = R(s);
  if (h.isArrayExpression(e))
    return e.elements.map((r) => te(r));
  if (h.isObjectExpression(e))
    return e.properties.reduce((r, t) => (h.isIdentifier(t.key) && (r[t.key.name] = te(t.value)), r), {});
  if (h.isLiteral(e))
    return e.value;
  if (h.isIdentifier(e))
    return w(e.name, !0);
  throw new Error(`Unknown node type ${e.type}`);
}, "parseValue"), w = /* @__PURE__ */ f((s, e) => {
  let r = je.dedent`
    Unexpected '${s}'. Parameter 'options.storySort' should be defined inline e.g.:

    export default {
      parameters: {
        options: {
          storySort: <array | object | function>
        },
      },
    };
  `;
  if (e)
    throw new Error(r);
  pt.log(r);
}, "unsupported"), R = /* @__PURE__ */ f((s) => h.isTSAsExpression(s) || h.isTSSatisfiesExpression(s) ? s.expression : s, "stripTSModifiers"),
Se = /* @__PURE__ */ f((s) => {
  let e = R(s);
  if (h.isObjectExpression(e)) {
    let r = ee(e, "options");
    if (r) {
      if (h.isObjectExpression(r))
        return ee(r, "storySort");
      w("options", !0);
    }
  }
}, "parseParameters"), _e = /* @__PURE__ */ f((s, e) => {
  let r = R(s);
  if (h.isObjectExpression(r)) {
    let t = ee(r, "parameters");
    if (h.isIdentifier(t) && (t = P(t.name, e)), t)
      return Se(t);
  } else
    w("default", !0);
}, "parseDefault"), zt = /* @__PURE__ */ f((s) => {
  if (!s.includes("storySort"))
    return;
  let e, r = lt(s);
  if (ct(r, {
    ExportNamedDeclaration: {
      enter({ node: t }) {
        h.isVariableDeclaration(t.declaration) ? t.declaration.declarations.forEach((i) => {
          if (h.isVariableDeclarator(i) && h.isIdentifier(i.id)) {
            let { name: a } = i.id;
            if (a === "parameters" && i.init) {
              let o = R(i.init);
              e = Se(o);
            }
          }
        }) : t.specifiers.forEach((i) => {
          h.isIdentifier(i.exported) && i.exported.name === "parameters" && w("parameters", !1);
        });
      }
    },
    ExportDefaultDeclaration: {
      enter({ node: t }) {
        let i = t.declaration;
        h.isIdentifier(i) && (i = P(i.name, r.program)), i = R(i), h.isCallExpression(i) && h.isObjectExpression(i.arguments?.[0]) ? e = _e(
        i.arguments[0], r.program) : h.isObjectExpression(i) ? e = _e(i, r.program) : w("default", !1);
      }
    }
  }), !!e) {
    if (h.isArrowFunctionExpression(e)) {
      let { code: t } = Ee(e, {});
      return (0, eval)(t);
    }
    if (h.isFunctionExpression(e)) {
      let { code: t } = Ee(e, {}), i = e.id?.name, a = `(a, b) => {
      ${t};
      return ${i}(a, b)
    }`;
      return (0, eval)(a);
    }
    return h.isLiteral(e) || h.isArrayExpression(e) || h.isObjectExpression(e) ? te(e) : w("storySort", !0);
  }
}, "getStorySortParameter");

// src/csf-tools/enrichCsf.ts
import { generate as ft, types as g } from "storybook/internal/babel";
var dt = /* @__PURE__ */ f((s, e, r, t) => {
  let i = e.getStoryExport(r), a = g.isCallExpression(i) && g.isMemberExpression(i.callee) && g.isIdentifier(i.callee.object) && i.callee.object.
  name === "meta", o = !t?.disableSource && ut(i), l = !t?.disableDescription && Oe(e._storyStatements[r]), p = [], d = a ? g.memberExpression(
  g.identifier(r), g.identifier("input")) : g.identifier(r), u = g.memberExpression(d, g.identifier("parameters"));
  p.push(g.spreadElement(u));
  let x = g.optionalMemberExpression(
    u,
    g.identifier("docs"),
    !1,
    !0
  ), b = [];
  if (o) {
    let y = g.optionalMemberExpression(
      x,
      g.identifier("source"),
      !1,
      !0
    );
    b.push(
      g.objectProperty(
        g.identifier("source"),
        g.objectExpression([
          g.objectProperty(g.identifier("originalSource"), g.stringLiteral(o)),
          g.spreadElement(y)
        ])
      )
    );
  }
  if (l) {
    let y = g.optionalMemberExpression(
      x,
      g.identifier("description"),
      !1,
      !0
    );
    b.push(
      g.objectProperty(
        g.identifier("description"),
        g.objectExpression([
          g.objectProperty(g.identifier("story"), g.stringLiteral(l)),
          g.spreadElement(y)
        ])
      )
    );
  }
  if (b.length > 0) {
    p.push(
      g.objectProperty(
        g.identifier("docs"),
        g.objectExpression([g.spreadElement(x), ...b])
      )
    );
    let y = g.expressionStatement(
      g.assignmentExpression("=", u, g.objectExpression(p))
    );
    s._ast.program.body.push(y);
  }
}, "enrichCsfStory"), Pe = /* @__PURE__ */ f((s, e, r) => {
  if (!e.length) {
    s.properties.find(
      (p) => g.isObjectProperty(p) && g.isIdentifier(p.key) && p.key.name === "component"
    ) || s.properties.unshift(r);
    return;
  }
  let [t, ...i] = e, a = s.properties.find(
    (l) => g.isObjectProperty(l) && g.isIdentifier(l.key) && l.key.name === t && g.isObjectExpression(l.value)
  ), o;
  a ? o = a.value : (o = g.objectExpression([]), s.properties.push(g.objectProperty(g.identifier(t), o))), Pe(o, i, r);
}, "addComponentDescription"), mt = /* @__PURE__ */ f((s, e, r) => {
  let t = !r?.disableDescription && Oe(e._metaStatement);
  if (t) {
    let i = s._metaNode;
    i && g.isObjectExpression(i) && Pe(
      i,
      ["parameters", "docs", "description"],
      g.objectProperty(g.identifier("component"), g.stringLiteral(t))
    );
  }
}, "enrichCsfMeta"), Qt = /* @__PURE__ */ f((s, e, r) => {
  mt(s, e, r), Object.keys(s._storyExports).forEach((t) => {
    dt(s, e, t, r);
  });
}, "enrichCsf"), ut = /* @__PURE__ */ f((s) => {
  let e = g.isVariableDeclarator(s) ? s.init : s, { code: r } = ft(e, {});
  return r;
}, "extractSource"), Oe = /* @__PURE__ */ f((s) => s?.leadingComments ? s.leadingComments.map((r) => r.type === "CommentLine" || !r.value.startsWith(
"*") ? null : r.value.split(`
`).map((t) => t.replace(/^(\s+)?(\*+)?(\s)?/, "")).join(`
`).trim()).filter(Boolean).join(`
`) : "", "extractDescription");

// src/csf-tools/index.ts
import { babelParse as dr } from "storybook/internal/babel";

// src/csf-tools/vitest-plugin/transformer.ts
var re = U(k(), 1);
import { types as m } from "storybook/internal/babel";
import { getStoryTitle as gt } from "storybook/internal/common";
import { combineTags as xt } from "storybook/internal/csf";
import { logger as ve } from "storybook/internal/node-logger";
var yt = /* @__PURE__ */ f((s, e) => !(e.include.length && !e.include.some((r) => s?.includes(r)) || e.exclude.some((r) => s?.includes(r))),
"isValidTest");
async function bt({
  code: s,
  fileName: e,
  configDir: r,
  stories: t,
  tagsFilter: i,
  previewLevelTags: a = []
}) {
  let o = Q(s, {
    fileName: e,
    transformInlineMeta: !0,
    makeTitle: /* @__PURE__ */ f((E) => {
      let S = gt({
        storyFilePath: e,
        configDir: r,
        stories: t,
        userTitle: E
      }) || "unknown";
      return S === "unknown" && ve.warn(
        re.dedent`
            [Storybook]: Could not calculate story title for "${e}".
            Please make sure that this file matches the globs included in the "stories" field in your Storybook configuration at "${r}".
          `
      ), S;
    }, "makeTitle")
  }).parse(), l = o._ast, p = o._metaVariableName, d = o._metaNode, u = d.properties.find(
    (E) => m.isObjectProperty(E) && m.isIdentifier(E.key) && E.key.name === "title"
  ), x = m.stringLiteral(o._meta?.title || "unknown");
  if (u ? m.isObjectProperty(u) && (u.value = x) : d.properties.push(m.objectProperty(m.identifier("title"), x)), !d || !o._meta)
    throw new Error(
      `The Storybook vitest plugin could not detect the meta (default export) object in the story file. 

Please make sure you have a default export with the meta object. If you are using a different export format that is not supported, please fi\
le an issue with details about your use case.`
    );
  let b = {};
  Object.keys(o._stories).map((E) => {
    let S = xt(
      "test",
      "dev",
      ...a,
      ...o.meta?.tags || [],
      ...o._stories[E].tags || []
    );
    yt(S, i) && (b[E] = o._storyStatements[E]);
  });
  let y = o._file.path.scope.generateUidIdentifier("test"), _ = o._file.path.scope.generateUidIdentifier("describe");
  if (Object.keys(b).length === 0) {
    let E = m.expressionStatement(
      m.callExpression(m.memberExpression(_, m.identifier("skip")), [
        m.stringLiteral("No valid tests found")
      ])
    );
    l.program.body.push(E);
    let S = [
      m.importDeclaration(
        [
          m.importSpecifier(y, m.identifier("test")),
          m.importSpecifier(_, m.identifier("describe"))
        ],
        m.stringLiteral("vitest")
      )
    ];
    l.program.body.unshift(...S);
  } else {
    let ie = function() {
      let j = o._file.path.scope.generateUidIdentifier("isRunningFromThisFile"), D = m.memberExpression(
        m.callExpression(m.memberExpression(E, m.identifier("getState")), []),
        m.identifier("testPath")
      ), F = m.memberExpression(
        m.memberExpression(m.identifier("globalThis"), m.identifier("__vitest_worker__")),
        m.identifier("filepath")
      ), C = m.logicalExpression(
        "??",
        // TODO: switch order of testPathProperty and filePathProperty when the bug is fixed
        // https://github.com/vitest-dev/vitest/issues/6367 (or probably just use testPathProperty)
        F,
        D
      ), M = m.callExpression(
        m.memberExpression(
          m.callExpression(m.identifier("convertToFilePath"), [
            m.memberExpression(
              m.memberExpression(m.identifier("import"), m.identifier("meta")),
              m.identifier("url")
            )
          ]),
          m.identifier("includes")
        ),
        [C]
      );
      return { isRunningFromThisFileDeclaration: m.variableDeclaration("const", [
        m.variableDeclarator(j, M)
      ]), isRunningFromThisFileId: j };
    };
    var L = ie;
    f(ie, "getTestGuardDeclaration");
    let E = o._file.path.scope.generateUidIdentifier("expect"), S = o._file.path.scope.generateUidIdentifier("testStory"), De = m.identifier(
    JSON.stringify(i.skip)), { isRunningFromThisFileDeclaration: Ie, isRunningFromThisFileId: Ne } = ie();
    l.program.body.push(Ie);
    let we = /* @__PURE__ */ f(({
      localName: j,
      exportName: D,
      testTitle: F,
      node: C
    }) => {
      let M = m.expressionStatement(
        m.callExpression(y, [
          m.stringLiteral(F),
          m.callExpression(S, [
            m.stringLiteral(D),
            m.identifier(j),
            m.identifier(p),
            De
          ])
        ])
      );
      return M.loc = C.loc, M;
    }, "getTestStatementForStory"), Fe = Object.entries(b).map(([j, D]) => {
      if (D === null) {
        ve.warn(
          re.dedent`
            [Storybook]: Could not transform "${j}" story into test at "${e}".
            Please make sure to define stories in the same file and not re-export stories coming from other files".
          `
        );
        return;
      }
      let F = o._stories[j].localName ?? j, C = o._stories[j].name ?? j;
      return we({ testTitle: C, localName: F, exportName: j, node: D });
    }).filter((j) => !!j), Ce = m.ifStatement(Ne, m.blockStatement(Fe));
    l.program.body.push(Ce);
    let Te = [
      m.importDeclaration(
        [
          m.importSpecifier(y, m.identifier("test")),
          m.importSpecifier(E, m.identifier("expect"))
        ],
        m.stringLiteral("vitest")
      ),
      m.importDeclaration(
        [
          m.importSpecifier(S, m.identifier("testStory")),
          m.importSpecifier(m.identifier("convertToFilePath"), m.identifier("convertToFilePath"))
        ],
        m.stringLiteral("@storybook/addon-vitest/internal/test-utils")
      )
    ];
    l.program.body.unshift(...Te);
  }
  return me(o, { sourceMaps: !0, sourceFileName: e }, s);
}
f(bt, "vitestTransform");
export {
  W as BadMetaError,
  Z as ConfigFile,
  J as CsfFile,
  B as MixedFactoryError,
  K as MultipleMetaError,
  q as NoMetaError,
  dr as babelParse,
  et as babelParseFile,
  Qt as enrichCsf,
  mt as enrichCsfMeta,
  dt as enrichCsfStory,
  Oe as extractDescription,
  ut as extractSource,
  ot as formatConfig,
  me as formatCsf,
  zt as getStorySortParameter,
  Mt as isCsfFactoryPreview,
  Qe as isModuleMock,
  Ke as isValidPreviewPath,
  nt as loadConfig,
  Q as loadCsf,
  at as printConfig,
  tt as printCsf,
  Rt as readConfig,
  Ft as readCsf,
  bt as vitestTransform,
  Lt as writeConfig,
  Ct as writeCsf
};
