/**
 * Catalog of V8 deoptimization reasons, keyed by the message V8 writes in
 * `code-deopt` log records (the last field of the record).
 *
 * Generated from "V8 deoptimization reasons: meanings and responses" by
 * the Uzlopak/deoptigate project (MIT licensed), at commit
 * 59e854d5cabfe2f9698246c985ad21f3a820b0b8:
 * https://github.com/Uzlopak/deoptigate/blob/59e854d5cabfe2f9698246c985ad21f3a820b0b8/assets/deoptimization.md
 *
 * That document covers the 84 reasons declared in V8's
 * src/deoptimizer/deoptimize-reason.h at V8 commit 73f16b50. V8 adds, removes
 * and renames reasons over time, so lookups must tolerate unknown messages.
 */

export type DeoptKind = 'eager' | 'lazy'

export interface DeoptReasonInfo {
  /** V8's enum name for the reason, e.g. `WrongMap` */
  reason: string
  /** Eager (a guard failed in running code) or lazy (a dependency was invalidated) */
  kind: DeoptKind
  /** What the reason means and how to respond to it */
  meaning: string
}

export const DEOPT_REASONS: Record<string, DeoptReasonInfo> = {
  "out of bounds": {
    reason: "OutOfBounds",
    kind: "eager",
    meaning: "An optimized indexed, string, or typed-array bounds guard failed; ordinary out-of-range JavaScript indexing does not always deopt. If a hot path should stay in range, partition valid indexes from exceptional ones and keep a correct fallback, but add checks only when profiling justifies them."
  },
  "array buffer was detached or immutable": {
    reason: "ArrayBufferWasDetached",
    kind: "eager",
    meaning: "V8's typed-array-view guard found the buffer detached or immutable, or the view out of bounds (including after a resize). Keep transfer/resize operations away from repeated hot accesses when possible; otherwise distinguish detached buffers from valid zero-length views and resized out-of-bounds views using state checks supported by the runtime, while preserving the operation's required result or exception."
  },
  "the array length changed": {
    reason: "ArrayLengthChanged",
    kind: "eager",
    meaning: "Optimized array builtins recheck length after a callback that may mutate the array; the callback changed it. If the algorithm permits, avoid changing the input array length inside the callback; otherwise preserve that behavior and accept the builtin fallback unless repeated deopts measurably affect performance."
  },
  "BigInt too big": {
    reason: "BigIntTooBig",
    kind: "eager",
    meaning: "A BigInt builtin's fast path rejected a result or another handled exceptional case; it is not a general warning about BigInt input size. Identify the operation and handle its specified failure; input limits are an application resource policy, not a correctness fix."
  },
  "failed to grow elements store": {
    reason: "CouldNotGrowElements",
    kind: "eager",
    meaning: "A fast-elements growth path failed; sparse arrays may instead normalize to dictionary elements, so this need not indicate allocation failure. Investigate resources if the operation fails; change representation only if repeated hot-path failures cost performance."
  },
  "copy-on-write array's elements changed": {
    reason: "CowArrayElementsChanged",
    kind: "eager",
    meaning: "Optimized code expected a literal array to retain its copy-on-write backing store, but its elements pointer changed. If mutation is required, make an owned copy before the hot consumer or use a separate mutable array; otherwise the deopt is a safe fallback and usually needs no change."
  },
  "%_DeoptimizeNow": {
    reason: "DeoptimizeNow",
    kind: "eager",
    meaning: "An explicit internal/testing deoptimization request. This is not a usual application-level reason. Check for test hooks, special runtime flags, or embedding/native code. There is no general JavaScript fix."
  },
  "division by zero": {
    reason: "DivisionByZero",
    kind: "eager",
    meaning: "Specialized integer division/modulo and some BigInt builtin paths use this for a zero divisor; Number division by zero is valid JavaScript. If zero is common in a hot path, handle it before the operation and preserve its specified result or exception; otherwise accept the fallback."
  },
  "length is greater than the maximum for fast elements array": {
    reason: "GreaterThanMaxFastElementArray",
    kind: "eager",
    meaning: "An array allocation length reaches or exceeds V8's engine-specific threshold for initial fast-elements allocation. If this limit is a practical problem, consider chunked storage or a `Map` for sparse indexes; ordinary arrays can themselves be sparse, so changing representation is not automatically beneficial."
  },
  "hole": {
    reason: "Hole",
    kind: "eager",
    meaning: "Optimized code read a missing array element where its path expected a value. `new Array(n)`, deleting an index, or writing beyond `length` creates holes; explicit `undefined` is different. Keep hot arrays dense or handle holes without changing sparse-array semantics: `i in a` includes inherited indexed properties, while `a[i] === undefined` conflates holes with explicit `undefined`."
  },
  "hole or undefined": {
    reason: "HoleOrUndefined",
    kind: "eager",
    meaning: "An optimized internal check found a hole or `undefined` where that path required an ordinary value; current V8 uses this guard in inline `Array.prototype.sort`. Avoid such values only when semantics allow; otherwise keep them and accept the generic builtin fallback."
  },
  "instance migration failed": {
    reason: "InstanceMigrationFailed",
    kind: "eager",
    meaning: "An internal map-migration builtin could not migrate an instance, so optimized code deoptimized; different shapes alone do not imply this failure. Usually there is no direct source fix. If it recurs in hot code, inspect object transitions and V8 version before changing initialization or mutation."
  },
  "Insufficient type feedback for array literal": {
    reason: "InsufficientTypeFeedbackForArrayLiteral",
    kind: "eager",
    meaning: "At compilation, this array-literal site had insufficient feedback for a specialized path. If a measured hot path is affected, isolate cold code or ensure representative production inputs reach the site before optimization; avoid artificial warmup. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "Insufficient type feedback for binary operation": {
    reason: "InsufficientTypeFeedbackForBinaryOperation",
    kind: "eager",
    meaning: "The compiler lacked a usable feedback hint for this operation; operand types are not necessarily unstable. For costly hot operations, specialize genuinely distinct cases while preserving JavaScript coercion and numeric semantics. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "Insufficient type feedback for call": {
    reason: "InsufficientTypeFeedbackForCall",
    kind: "eager",
    meaning: "The call site had insufficient feedback; this alone does not mean its target is polymorphic. For a costly hot call, isolate cold paths or specialize genuinely distinct targets while preserving dispatch. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "Insufficient type feedback for compare operation": {
    reason: "InsufficientTypeFeedbackForCompareOperation",
    kind: "eager",
    meaning: "The compiler lacked comparison feedback; this does not imply changing values are a bug. For a costly hot comparison, isolate cold inputs or specialize common cases without changing comparison semantics. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "Insufficient type feedback for construct": {
    reason: "InsufficientTypeFeedbackForConstruct",
    kind: "eager",
    meaning: "The constructor site had insufficient feedback; this does not prove targets vary. If a hot construct is costly, specialize stable constructors or isolate cold construction only when that preserves intended dynamic behavior. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "Insufficient type feedback for for-in": {
    reason: "InsufficientTypeFeedbackForForIn",
    kind: "eager",
    meaning: "For-in lowering lacked usable feedback; this does not itself mean object shapes are unstable. If a measured hot loop is affected, isolate cold enumeration or use representative object shapes only when that fits the data model. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "Insufficient type feedback for generic global access": {
    reason: "InsufficientTypeFeedbackForGenericGlobalAccess",
    kind: "eager",
    meaning: "Maglev lacked usable feedback for a global access; this does not imply the global is mutable or polymorphic. If this affects measured hot code, inspect whether the access is cold and isolate it only when profiling shows a benefit; avoid artificial warmup. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "Insufficient type feedback for generic keyed access": {
    reason: "InsufficientTypeFeedbackForGenericKeyedAccess",
    kind: "eager",
    meaning: "Maglev lacked usable feedback for this keyed access, often because the site had not run; this alone does not imply polymorphic keys or receiver maps. If profiling shows a hot-path cost, consider isolating cold code or specializing common cases with a generic fallback. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "Insufficient type feedback for generic named access": {
    reason: "InsufficientTypeFeedbackForGenericNamedAccess",
    kind: "eager",
    meaning: "Named access lowering lacked usable feedback; this can also reflect an unusable PropertyCell. It does not by itself imply changing shapes; inspect the site and isolate cold code only if profiling shows a benefit. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "Insufficient type feedback for instanceof": {
    reason: "InsufficientTypeFeedbackForInstanceOf",
    kind: "eager",
    meaning: "Maglev's fast `instanceof` builder found insufficient feedback; this does not establish that constructor targets vary. If a measured hot check is affected, specialize predictable cases or isolate cold inputs only if the full `instanceof` and `Symbol.hasInstance` behavior is preserved. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "Insufficient type feedback for object literal": {
    reason: "InsufficientTypeFeedbackForObjectLiteral",
    kind: "eager",
    meaning: "Maglev lacked feedback for this literal site; this does not mean the object has a bad shape. If a measured hot path is affected, isolate cold construction or keep hot construction representative; do not reshape objects without evidence. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "Insufficient type feedback for typeof": {
    reason: "InsufficientTypeFeedbackForTypeOf",
    kind: "eager",
    meaning: "Maglev lacked useful `typeof` feedback; TurboFan may report insufficient unary feedback instead. For costly hot checks, specialize common cases only if the full `typeof` behavior is preserved. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "Insufficient type feedback for unary operation": {
    reason: "InsufficientTypeFeedbackForUnaryOperation",
    kind: "eager",
    meaning: "Unary/typeof lowering lacked usable feedback; this does not necessarily mean runtime types vary. If a hot operation is costly, specialize common cases while preserving coercion and truthiness semantics. Confirm the site receives representative production inputs; any warm-up, specialization, or path split is an experiment, not a guaranteed fix."
  },
  "unexpected name in keyed access": {
    reason: "KeyedAccessChanged",
    kind: "eager",
    meaning: "Maglev specialized a keyed access for a cached internalized name, but encountered another key. This is narrower than generic key variation. Dynamic keys are valid; if repeated deopts cost performance, dispatch common keys to specialized helpers and retain a generic path for other keys."
  },
  "loop speculation failed": {
    reason: "LoopSpeculationFailed",
    kind: "eager",
    meaning: "In this V8 checkout this reason is emitted by a Turboshaft test-only reducer path to exercise loop speculation, not a normal application loop optimization. No application fix based on this reason in this revision. Recheck the source for the V8 version being diagnosed."
  },
  "lost precision": {
    reason: "LostPrecision",
    kind: "eager",
    meaning: "A checked numeric narrowing could not preserve the value in the target integer representation, for example because of range or signedness. If exact range/precision is part of the operation, keep the checked/general path or handle outliers explicitly; do not clamp or narrow values unless the program semantics permit it."
  },
  "lost precision or NaN": {
    reason: "LostPrecisionOrNaN",
    kind: "eager",
    meaning: "A checked Float64-to-integer conversion could not preserve the value exactly, including fractional, NaN, infinite, or out-of-range inputs on applicable paths. Keep those cases on a semantics-preserving general path; only reject or normalize them if the application contract requires that."
  },
  "minus zero": {
    reason: "MinusZero",
    kind: "eager",
    meaning: "A Float64-to-integer conversion in minus-zero-checking mode received negative zero and must preserve its sign distinction. If the application treats `-0` and `0` identically, canonicalize before the hot operation; otherwise preserve `-0` and accept the necessary general path."
  },
  "no initial element": {
    reason: "NoInitialElement",
    kind: "eager",
    meaning: "Optimized `reduce`/`reduceRight` without an explicit initial value found no present element after skipping holes. Handle empty/holey input or supply an initial value when semantically correct. Reading `a[0]` is not this reason."
  },
  "not a BigInt": {
    reason: "NotABigInt",
    kind: "eager",
    meaning: "An internal representation check required a BigInt-compatible value; this does not mean arbitrary mixed Number/BigInt JavaScript deopts (such operations generally throw). Use the source position to find the operation; if hot, keep expected values on its specialized path and preserve other cases with correct semantics."
  },
  "not a BigInt64": {
    reason: "NotABigInt64",
    kind: "eager",
    meaning: "Turboshaft's checked BigInt-to-BigInt64 conversion rejected a value outside its signed 64-bit requirements. For larger valid BigInts, keep a general BigInt path; restrict values only if the API requires that range. This is not a BigInt64Array receiver check."
  },
  "not a heap number": {
    reason: "NotAHeapNumber",
    kind: "eager",
    meaning: "A field load expected a HeapNumber because V8 represented the field as a double, but the value failed that check. If a hot property legitimately stores different kinds of values, consider separate fields or specialized paths with a correct general fallback; do not constrain valid values merely to avoid a deopt."
  },
  "not a JavaScript object": {
    reason: "NotAJavaScriptObject",
    kind: "eager",
    meaning: "Turboshaft's `CheckReceiver` guard failed: the value was not a JavaScript receiver/heap object as required by the specialized operation. Validate inputs or split paths only if that reflects the API and the deopt is frequent/measurable."
  },
  "not a JavaScript object, Null or Undefined": {
    reason: "NotAJavaScriptObjectOrNullOrUndefined",
    kind: "eager",
    meaning: "A guard allowed objects, `null`, and `undefined`, but received another primitive. If the API excludes that value, validate it; otherwise preserve the valid behavior and consider a type-specific fast path with a general fallback only if profiling shows the guard is costly."
  },
  "not a Number": {
    reason: "NotANumber",
    kind: "eager",
    meaning: "A checked conversion or operation required a Number and rejected the value; some paths allow Number or Number/BigInt. If the function validly accepts several kinds and this path is hot, dispatch to specialized helpers while preserving coercion and exception behavior."
  },
  "not a Number or Boolean": {
    reason: "NotANumberOrBoolean",
    kind: "eager",
    meaning: "An internal tagged-to-float conversion allowed Number or Boolean but received another kind of value. If other inputs are valid and the path is hot, specialize common cases with a correct general fallback; ordinary truthiness does not establish this guard."
  },
  "not a Number or Undefined": {
    reason: "NotANumberOrUndefined",
    kind: "eager",
    meaning: "An internal tagged-to-float conversion allowed Number or `undefined` but received another kind of value; this path depends on V8's `V8_ENABLE_UNDEFINED_DOUBLE` build feature. Preserve other valid inputs with a general path; specialize only if profiling shows a benefit."
  },
  "not a Number or Oddball": {
    reason: "NotANumberOrOddball",
    kind: "eager",
    meaning: "An internal tagged-to-float conversion allowed Number or an oddball but received another kind of value. If the function accepts multiple kinds, specialize common hot cases only with a semantics-preserving general fallback."
  },
  "not a Smi": {
    reason: "NotASmi",
    kind: "eager",
    meaning: "A check expected V8’s internal small-integer representation, not a portable JavaScript integer range. For hot numeric code receiving other valid Numbers, consider a small-integer fast path with a general numeric fallback; do not impose arbitrary limits."
  },
  "not a String": {
    reason: "NotAString",
    kind: "eager",
    meaning: "A compiler guard required a primitive String and rejected the value. If mixed inputs are valid, preserve them; validate or normalize only when required by the API contract, and specialize hot common cases only if profiling justifies it."
  },
  "not a String or a string wrapper": {
    reason: "NotAStringOrStringWrapper",
    kind: "eager",
    meaning: "Maglev's string-add path expected a primitive or wrapped String. Preserve `+` coercion for valid mixed inputs; specialize common cases only when profiling shows repeated cost and a generic path keeps the same semantics."
  },
  "not a String or oddball": {
    reason: "NotAStringOrOddball",
    kind: "eager",
    meaning: "A string/oddball-specialized equality check received a number. If this violates the input contract, validate or branch; otherwise keep the valid comparison behavior and specialize only if profiling shows repeated hot-path cost."
  },
  "not a Symbol": {
    reason: "NotASymbol",
    kind: "eager",
    meaning: "A symbol-specific guard or strict-equality feedback path expected a Symbol and received another value. Use the source position to identify the operation; if mixed values are valid, preserve them and use a generic or type-specific path only when profiling shows repeated hot-path cost."
  },
  "not AdditiveSafeInteger": {
    reason: "NotAdditiveSafeInteger",
    kind: "eager",
    meaning: "A checked conversion in the Turbolev additive-safe-integer path received a value outside its supported range. Such a Number can still be valid; keep a slower fallback rather than restricting inputs. Use BigInt only when exact large-integer semantics require it."
  },
  "not an array index": {
    reason: "NotAnArrayIndex",
    kind: "eager",
    meaning: "An internal key-to-index conversion rejected a value that was not a valid array index for that operation. Named and other non-index keys can be valid JavaScript; validate only if the API requires indexes, or retain a generic keyed path when mixed keys are valid."
  },
  "not a detectable receiver": {
    reason: "NotDetectableReceiver",
    kind: "eager",
    meaning: "An optimized `typeof` path for a detectable callable received another value. If mixed values are valid, preserve full `typeof` behavior; specialize common cases only for measured hot-path cost. `document.all` is a browser-only exotic, unavailable in Node."
  },
  "not int32": {
    reason: "NotInt32",
    kind: "eager",
    meaning: "A checked Number/IntPtr-to-Int32 conversion failed exactness or signed-range checks. If fractional or out-of-range values are valid, retain a general numeric path or branch around the checked conversion; do not use bitwise coercion unless wrapping is the required semantics."
  },
  "not unsigned int32": {
    reason: "NotUint32",
    kind: "eager",
    meaning: "A checked conversion failed nonnegative/exact Uint32 requirements. If negative or out-of-range indexes are valid inputs, retain a correct fallback or handle them before the specialized access; `>>> 0` wraps and changes semantics."
  },
  "exit from OSR'd inner loop": {
    reason: "OSREarlyExit",
    kind: "eager",
    meaning: "During OSR compilation, a loop backedge targeted before the OSR entry point, so V8 emitted a deopt for that control-flow case. It does not mean a JS `break` occurred. Normally a tiering/control-flow event. Do not rewrite `break`/`return` based on this reason; check whether it affects measured performance."
  },
  "overflow": {
    reason: "Overflow",
    kind: "eager",
    meaning: "Specialized integer arithmetic exceeded the machine representation/range selected by the compiler. If such values are valid, preserve them through a general numeric fallback; constrain inputs only when the application contract requires it, and investigate repeated hot-path deopts before restructuring."
  },
  "prepare for on stack replacement (OSR)": {
    reason: "PrepareForOnStackReplacement",
    kind: "eager",
    meaning: "V8 is transferring a running function/loop between execution tiers and prepares its frame for OSR. Usually normal tiering. Usually no fix. Investigate only if repeated transitions show up as a measured performance issue."
  },
  "Smi": {
    reason: "Smi",
    kind: "eager",
    meaning: "A guard expected V8’s internal small-integer representation, not a portable JavaScript range. For hot code receiving other valid Numbers, consider a small-integer fast path with a general fallback; do not add arbitrary limits."
  },
  "Storing to a constant field": {
    reason: "StoreToConstant",
    kind: "eager",
    meaning: "Optimized code treated a field as constant, but execution attempted a write that violated that assumption. Keep the value unchanged if it is intended to be constant; if it is mutable by design, use mutable state and change the representation only when repeated deopts measurably affect the hot path."
  },
  "Result string larger than String::kMaxLength": {
    reason: "StringTooLarge",
    kind: "eager",
    meaning: "Maglev found a concatenated string would exceed V8's `String::kMaxLength`. Rejecting, streaming, or chunking is an output/resource policy, not a general correctness fix; use it only if it preserves what downstream consumers require."
  },
  "unexpected context extension": {
    reason: "UnexpectedContextExtension",
    kind: "eager",
    meaning: "A Maglev context-chain lookup expected no extension object but found one; sloppy direct eval can add such bindings to a context. Avoid dynamic-scope context changes in hot code. Prefer explicit lexical variables and properties."
  },
  "(unknown)": {
    reason: "Unknown",
    kind: "eager",
    meaning: "V8 could not identify or preserve a more specific reason, or the information is unavailable in that build/log. Treat as diagnostic uncertainty. Check neighboring records and the Node/V8 version; do not change code based on this label alone."
  },
  "value mismatch": {
    reason: "ValueMismatch",
    kind: "eager",
    meaning: "A runtime value differed from an assumption in optimized code; the label is broad. Use the source position to find the assumption, and specialize valid input cases only if semantics are preserved and profiling shows repeated hot-path cost."
  },
  "wrong call target": {
    reason: "WrongCallTarget",
    kind: "eager",
    meaning: "A call site saw a callee outside its optimized target set. For costly hot calls, dispatch common targets to specialized helpers with a generic fallback; do not restrict valid callbacks unless the API contract requires it."
  },
  "wrong call target constructor": {
    reason: "WrongConstructor",
    kind: "eager",
    meaning: "In the inspected Maglev path, this guards Array-constructor feedback. If a hot site intentionally supports several constructors, dispatch them separately while retaining the required behavior; a generic changing `new C()` site is not guaranteed to produce this reason."
  },
  "wrong enum indices": {
    reason: "WrongEnumIndices",
    kind: "eager",
    meaning: "A for-in enum-cache path found its indices array cleared while enumerable fields remained, sometimes after an accessor changes a sibling map. V8 deoptimizes and resumes generically to preserve iteration; finish such shape changes before a hot loop only if repeated invalidations cost performance."
  },
  "wrong feedback cell": {
    reason: "WrongFeedbackCell",
    kind: "eager",
    meaning: "A call site optimized for a shared FeedbackCell received a closure from another literal site with a different cell. If this occurs in a hot call, use a stable function target and pass changing data as arguments, or specialize call sites while retaining valid dispatch; restructure only if profiling shows a cost."
  },
  "wrong instance type": {
    reason: "WrongInstanceType",
    kind: "eager",
    meaning: "A Maglev instance-type guard failed; DataView methods, for example, require an actual DataView receiver. Preserve the builtin's required receiver and exception behavior; dispatch valid receiver types separately only if profiling shows a hot-path cost."
  },
  "wrong map": {
    reason: "WrongMap",
    kind: "eager",
    meaning: "An object's map differed from the shape assumed by optimized code, often because properties were added in a different order or later. Initialize hot objects consistently or specialize distinct shapes only when valid behavior is preserved and profiling shows a cost."
  },
  "map changed during operation": {
    reason: "WrongMapDynamic",
    kind: "eager",
    meaning: "Maglev’s for-in cache expected one map but saw another; iterating valid objects with different maps is not an application error. V8 deoptimizes and resumes through a generic path; stabilize shapes only if repeated hot-path deopts are measured and the data model permits it."
  },
  "wrong name": {
    reason: "WrongName",
    kind: "eager",
    meaning: "A specialized check received a different property name than expected. Dynamic keys are valid and can use a generic fallback; inspect the source site and specialize common keys only if repeated deopts cost performance."
  },
  "wrong value": {
    reason: "WrongValue",
    kind: "eager",
    meaning: "A runtime value differed from an assumption embedded in optimized code; the label is broad. Use the source position to find it, then specialize valid cases only if semantics are preserved and profiling shows repeated hot-path cost."
  },
  "dependent map was deprecated": {
    reason: "MapDeprecated",
    kind: "lazy",
    meaning: "A map-transition tree was deprecated, so optimized code depending on it was invalidated to preserve correctness; different object shapes alone do not imply map deprecation. This invalidation usually needs no source fix. Investigate map transitions only if repeated deopts affect measured hot code."
  },
  "dependent prototype chain changed": {
    reason: "PrototypeChange",
    kind: "lazy",
    meaning: "A prototype used by optimized code was replaced or its chain changed. Prototype mutation can be valid; establish prototypes before hot use or avoid later changes only when that fits the design and repeated invalidations affect measured performance."
  },
  "dependent property cell changed": {
    reason: "PropertyCellChange",
    kind: "lazy",
    meaning: "A global PropertyCell's value or state changed and invalidated optimized code that depended on it. If the global is intentionally mutable, preserve that behavior; for a measured hot path, pass changing state explicitly or keep it stable only when semantics allow."
  },
  "dependent field type constness changed": {
    reason: "FieldTypeConstChange",
    kind: "lazy",
    meaning: "A field-constness dependency was invalidated by a change V8 could no longer treat as constant. If the field is intended to remain constant, preserve that invariant; if it is intentionally mutable, the deopt may be expected. Restructure only when repeated events measurably affect hot code."
  },
  "dependent field type changed": {
    reason: "FieldTypeChange",
    kind: "lazy",
    meaning: "A property's observed type changed, invalidating a field-type dependency. Mixed types may be required and correct; for measured hot paths, normalize or separate fields/objects only if the data model permits and profiling shows repeated cost."
  },
  "dependent field representation changed": {
    reason: "FieldRepresentationChange",
    kind: "lazy",
    meaning: "A field changed internal representation, for example from integer-like to double or tagged. Mixed values can be correct; use separate fields or representations only when that fits the data model and reduces measured hot-path deopts."
  },
  "dependent initial map changed": {
    reason: "InitialMapChange",
    kind: "lazy",
    meaning: "A constructor's initial map changed, invalidating optimized allocations that depended on it; adding a field to one instance does not do this. Finish constructor/prototype setup before hot allocations when possible; change later setup only if repeated invalidations measurably cost performance."
  },
  "dependent allocation site transition changed": {
    reason: "AllocationSiteTransitionChange",
    kind: "lazy",
    meaning: "Tracked allocation-site feedback changed an array's elements kind, invalidating optimized dependencies. If hot arrays naturally contain different kinds, keep that behavior; separate or normalize element kinds only when semantics allow and profiling shows the transitions are costly."
  },
  "dependent context cell state changed": {
    reason: "ContextCellChange",
    kind: "lazy",
    meaning: "A captured variable/context slot used as an optimization dependency changed state or value. This is normal for mutable captured state; preserve closure semantics. Passing state explicitly is an optional performance experiment only if repeated invalidations are measured and the behavior remains equivalent."
  },
  "dependent empty context extension changed": {
    reason: "EmptyContextExtensionChange",
    kind: "lazy",
    meaning: "Sloppy direct eval created a context-extension object where optimized code depended on there being none. Avoid direct eval in hot code; `with` is not the specific source invalidation identified here."
  },
  "embedded weak objects cleared": {
    reason: "WeakObjects",
    kind: "lazy",
    meaning: "Garbage collection cleared a weakly held object embedded in optimized code. This is normally expected and has no source-level fix; investigate object lifetimes only if the associated deopts are frequent and profiling shows a cost. Do not retain objects just to suppress a deopt."
  },
  "JS debugger attached": {
    reason: "Debugger",
    kind: "lazy",
    meaning: "Attaching a debugger invalidated optimized code or assumptions incompatible with debugger execution. Expected during debugging. Compare performance without the debugger before treating it as an application issue."
  },
  "for testing": {
    reason: "Testing",
    kind: "lazy",
    meaning: "A V8 test hook or test-only mechanism deliberately caused lazy deoptimization. No application fix; ordinary Node application execution should not need this."
  },
  "exception with omitted catch handler": {
    reason: "ExceptionCaught",
    kind: "lazy",
    meaning: "Optimized code omitted or specialized exception-handler work, then an exception reached a handler that required deoptimization. Exceptions are valid control flow; consider explicit result handling only for expected frequent exceptions, when it preserves the API behavior and profiling shows a cost."
  },
  "marked due to eager deopt": {
    reason: "EagerDeopt",
    kind: "lazy",
    meaning: "Runtime compiler OSR cleanup marks related optimized OSR code with this reason during deoptimization handling. V8 suppresses a separate trace because the initiating eager deopt is already logged. No direct source fix. Inspect the initiating OSR/deopt event if performance is affected."
  },
  "value in stack frame was materialized": {
    reason: "FrameValueMaterialized",
    kind: "lazy",
    meaning: "While reconstructing a deoptimized frame, V8 had to create a real object for a value it had kept virtual in optimized code. This is an engine bookkeeping event, usually with no source-level fix; inspect nearby deopts only if profiling shows a cost."
  }
}
