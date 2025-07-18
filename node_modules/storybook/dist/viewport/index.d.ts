import { NormalizedProjectAnnotations, ProjectAnnotations, ComposedStoryFn } from 'storybook/internal/types';

declare const ADDON_ID = "storybook/viewport";
declare const PARAM_KEY = "viewport";
declare const PANEL_ID = "storybook/viewport/panel";
declare const TOOL_ID = "storybook/viewport/tool";

interface Viewport {
    name: string;
    styles: ViewportStyles;
    type: 'desktop' | 'mobile' | 'tablet' | 'other';
}
interface ViewportStyles {
    height: string;
    width: string;
}
type ViewportMap = Record<string, Viewport>;
type GlobalState = {
    /**
     * When set, the viewport is applied and cannot be changed using the toolbar. Must match the key
     * of one of the available viewports.
     */
    value: string | undefined;
    /**
     * When true the viewport applied will be rotated 90°, e.g. it will rotate from portrait to
     * landscape orientation.
     */
    isRotated: boolean;
};
type GlobalStateUpdate = Partial<GlobalState>;
interface ViewportParameters {
    /**
     * Viewport configuration
     *
     * @see https://storybook.js.org/docs/essentials/viewport#parameters
     */
    viewport: {
        /**
         * Remove the addon panel and disable the addon's behavior . If you wish to turn off this addon
         * for the entire Storybook, you should do so when registering addon-essentials
         *
         * @see https://storybook.js.org/docs/essentials/index#disabling-addons
         */
        disable?: boolean;
        /**
         * Specify the available viewports. The width and height values must include the unit, e.g.
         * '320px'.
         */
        options: Record<string, Viewport>;
    };
}
interface ViewportGlobals {
    /**
     * Viewport configuration
     *
     * @see https://storybook.js.org/docs/essentials/viewport#globals
     */
    viewport: GlobalState | GlobalState['value'];
}

declare const INITIAL_VIEWPORTS_DATA: {
    readonly iphone5: {
        readonly name: "iPhone 5";
        readonly styles: {
            readonly height: "568px";
            readonly width: "320px";
        };
        readonly type: "mobile";
    };
    readonly iphone6: {
        readonly name: "iPhone 6";
        readonly styles: {
            readonly height: "667px";
            readonly width: "375px";
        };
        readonly type: "mobile";
    };
    readonly iphone6p: {
        readonly name: "iPhone 6 Plus";
        readonly styles: {
            readonly height: "736px";
            readonly width: "414px";
        };
        readonly type: "mobile";
    };
    readonly iphone8p: {
        readonly name: "iPhone 8 Plus";
        readonly styles: {
            readonly height: "736px";
            readonly width: "414px";
        };
        readonly type: "mobile";
    };
    readonly iphonex: {
        readonly name: "iPhone X";
        readonly styles: {
            readonly height: "812px";
            readonly width: "375px";
        };
        readonly type: "mobile";
    };
    readonly iphonexr: {
        readonly name: "iPhone XR";
        readonly styles: {
            readonly height: "896px";
            readonly width: "414px";
        };
        readonly type: "mobile";
    };
    readonly iphonexsmax: {
        readonly name: "iPhone XS Max";
        readonly styles: {
            readonly height: "896px";
            readonly width: "414px";
        };
        readonly type: "mobile";
    };
    readonly iphonese2: {
        readonly name: "iPhone SE (2nd generation)";
        readonly styles: {
            readonly height: "667px";
            readonly width: "375px";
        };
        readonly type: "mobile";
    };
    readonly iphone12mini: {
        readonly name: "iPhone 12 mini";
        readonly styles: {
            readonly height: "812px";
            readonly width: "375px";
        };
        readonly type: "mobile";
    };
    readonly iphone12: {
        readonly name: "iPhone 12";
        readonly styles: {
            readonly height: "844px";
            readonly width: "390px";
        };
        readonly type: "mobile";
    };
    readonly iphone12promax: {
        readonly name: "iPhone 12 Pro Max";
        readonly styles: {
            readonly height: "926px";
            readonly width: "428px";
        };
        readonly type: "mobile";
    };
    readonly iphoneSE3: {
        readonly name: "iPhone SE 3rd generation";
        readonly styles: {
            readonly height: "667px";
            readonly width: "375px";
        };
        readonly type: "mobile";
    };
    readonly iphone13: {
        readonly name: "iPhone 13";
        readonly styles: {
            readonly height: "844px";
            readonly width: "390px";
        };
        readonly type: "mobile";
    };
    readonly iphone13pro: {
        readonly name: "iPhone 13 Pro";
        readonly styles: {
            readonly height: "844px";
            readonly width: "390px";
        };
        readonly type: "mobile";
    };
    readonly iphone13promax: {
        readonly name: "iPhone 13 Pro Max";
        readonly styles: {
            readonly height: "926px";
            readonly width: "428px";
        };
        readonly type: "mobile";
    };
    readonly iphone14: {
        readonly name: "iPhone 14";
        readonly styles: {
            readonly height: "844px";
            readonly width: "390px";
        };
        readonly type: "mobile";
    };
    readonly iphone14pro: {
        readonly name: "iPhone 14 Pro";
        readonly styles: {
            readonly height: "852px";
            readonly width: "393px";
        };
        readonly type: "mobile";
    };
    readonly iphone14promax: {
        readonly name: "iPhone 14 Pro Max";
        readonly styles: {
            readonly height: "932px";
            readonly width: "430px";
        };
        readonly type: "mobile";
    };
    readonly ipad: {
        readonly name: "iPad";
        readonly styles: {
            readonly height: "1024px";
            readonly width: "768px";
        };
        readonly type: "tablet";
    };
    readonly ipad10p: {
        readonly name: "iPad Pro 10.5-in";
        readonly styles: {
            readonly height: "1112px";
            readonly width: "834px";
        };
        readonly type: "tablet";
    };
    readonly ipad11p: {
        readonly name: "iPad Pro 11-in";
        readonly styles: {
            readonly height: "1194px";
            readonly width: "834px";
        };
        readonly type: "tablet";
    };
    readonly ipad12p: {
        readonly name: "iPad Pro 12.9-in";
        readonly styles: {
            readonly height: "1366px";
            readonly width: "1024px";
        };
        readonly type: "tablet";
    };
    readonly galaxys5: {
        readonly name: "Galaxy S5";
        readonly styles: {
            readonly height: "640px";
            readonly width: "360px";
        };
        readonly type: "mobile";
    };
    readonly galaxys9: {
        readonly name: "Galaxy S9";
        readonly styles: {
            readonly height: "740px";
            readonly width: "360px";
        };
        readonly type: "mobile";
    };
    readonly nexus5x: {
        readonly name: "Nexus 5X";
        readonly styles: {
            readonly height: "660px";
            readonly width: "412px";
        };
        readonly type: "mobile";
    };
    readonly nexus6p: {
        readonly name: "Nexus 6P";
        readonly styles: {
            readonly height: "732px";
            readonly width: "412px";
        };
        readonly type: "mobile";
    };
    readonly pixel: {
        readonly name: "Pixel";
        readonly styles: {
            readonly height: "960px";
            readonly width: "540px";
        };
        readonly type: "mobile";
    };
    readonly pixelxl: {
        readonly name: "Pixel XL";
        readonly styles: {
            readonly height: "1280px";
            readonly width: "720px";
        };
        readonly type: "mobile";
    };
};
type InitialViewportKeys = keyof typeof INITIAL_VIEWPORTS_DATA;
declare const INITIAL_VIEWPORTS: ViewportMap;
declare const DEFAULT_VIEWPORT = "responsive";
declare const MINIMAL_VIEWPORTS: ViewportMap;

/**
 * Actions represent the type of change to a location value.
 */
declare enum Action {
    /**
     * A POP indicates a change to an arbitrary index in the history stack, such
     * as a back or forward navigation. It does not describe the direction of the
     * navigation, only that the current index changed.
     *
     * Note: This is the default action for newly created history objects.
     */
    Pop = "POP",
    /**
     * A PUSH indicates a new entry being added to the history stack, such as when
     * a link is clicked and a new page loads. When this happens, all subsequent
     * entries in the stack are lost.
     */
    Push = "PUSH",
    /**
     * A REPLACE indicates the entry at the current index in the history stack
     * being replaced by a new one.
     */
    Replace = "REPLACE"
}
/**
 * The pathname, search, and hash values of a URL.
 */
interface Path {
    /**
     * A URL pathname, beginning with a /.
     */
    pathname: string;
    /**
     * A URL search string, beginning with a ?.
     */
    search: string;
    /**
     * A URL fragment identifier, beginning with a #.
     */
    hash: string;
}
/**
 * An entry in a history stack. A location contains information about the
 * URL path, as well as possibly some arbitrary state and a key.
 */
interface Location extends Path {
    /**
     * A value of arbitrary data associated with this location.
     */
    state: any;
    /**
     * A unique string associated with this location. May be used to safely store
     * and retrieve data in some other storage API, like `localStorage`.
     *
     * Note: This value is always "default" on the initial location.
     */
    key: string;
}

/**
 * Map of routeId -> data returned from a loader/action/error
 */
interface RouteData {
    [routeId: string]: any;
}
declare enum ResultType {
    data = "data",
    deferred = "deferred",
    redirect = "redirect",
    error = "error"
}
/**
 * Successful result from a loader or action
 */
interface SuccessResult {
    type: ResultType.data;
    data: any;
    statusCode?: number;
    headers?: Headers;
}
/**
 * Successful defer() result from a loader or action
 */
interface DeferredResult {
    type: ResultType.deferred;
    deferredData: DeferredData;
    statusCode?: number;
    headers?: Headers;
}
/**
 * Redirect result from a loader or action
 */
interface RedirectResult {
    type: ResultType.redirect;
    status: number;
    location: string;
    revalidate: boolean;
    reloadDocument?: boolean;
}
/**
 * Unsuccessful result from a loader or action
 */
interface ErrorResult {
    type: ResultType.error;
    error: any;
    headers?: Headers;
}
/**
 * Result from a loader or action - potentially successful or unsuccessful
 */
type DataResult = SuccessResult | DeferredResult | RedirectResult | ErrorResult;
type LowerCaseFormMethod = "get" | "post" | "put" | "patch" | "delete";
type UpperCaseFormMethod = Uppercase<LowerCaseFormMethod>;
/**
 * Active navigation/fetcher form methods are exposed in lowercase on the
 * RouterState
 */
type FormMethod = LowerCaseFormMethod;
/**
 * In v7, active navigation/fetcher form methods are exposed in uppercase on the
 * RouterState.  This is to align with the normalization done via fetch().
 */
type V7_FormMethod = UpperCaseFormMethod;
type FormEncType = "application/x-www-form-urlencoded" | "multipart/form-data" | "application/json" | "text/plain";
type JsonObject = {
    [Key in string]: JsonValue;
} & {
    [Key in string]?: JsonValue | undefined;
};
type JsonArray = JsonValue[] | readonly JsonValue[];
type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | JsonArray;
/**
 * @private
 * Internal interface to pass around for action submissions, not intended for
 * external consumption
 */
type Submission = {
    formMethod: FormMethod | V7_FormMethod;
    formAction: string;
    formEncType: FormEncType;
    formData: FormData;
    json: undefined;
    text: undefined;
} | {
    formMethod: FormMethod | V7_FormMethod;
    formAction: string;
    formEncType: FormEncType;
    formData: undefined;
    json: JsonValue;
    text: undefined;
} | {
    formMethod: FormMethod | V7_FormMethod;
    formAction: string;
    formEncType: FormEncType;
    formData: undefined;
    json: undefined;
    text: string;
};
/**
 * @private
 * Arguments passed to route loader/action functions.  Same for now but we keep
 * this as a private implementation detail in case they diverge in the future.
 */
interface DataFunctionArgs {
    request: Request;
    params: Params;
    context?: any;
}
/**
 * Arguments passed to loader functions
 */
interface LoaderFunctionArgs extends DataFunctionArgs {
}
/**
 * Arguments passed to action functions
 */
interface ActionFunctionArgs extends DataFunctionArgs {
}
/**
 * Loaders and actions can return anything except `undefined` (`null` is a
 * valid return value if there is no data to return).  Responses are preferred
 * and will ease any future migration to Remix
 */
type DataFunctionValue = Response | NonNullable<unknown> | null;
/**
 * Route loader function signature
 */
interface LoaderFunction {
    (args: LoaderFunctionArgs): Promise<DataFunctionValue> | DataFunctionValue;
}
/**
 * Route action function signature
 */
interface ActionFunction {
    (args: ActionFunctionArgs): Promise<DataFunctionValue> | DataFunctionValue;
}
/**
 * Route shouldRevalidate function signature.  This runs after any submission
 * (navigation or fetcher), so we flatten the navigation/fetcher submission
 * onto the arguments.  It shouldn't matter whether it came from a navigation
 * or a fetcher, what really matters is the URLs and the formData since loaders
 * have to re-run based on the data models that were potentially mutated.
 */
interface ShouldRevalidateFunction {
    (args: {
        currentUrl: URL;
        currentParams: AgnosticDataRouteMatch["params"];
        nextUrl: URL;
        nextParams: AgnosticDataRouteMatch["params"];
        formMethod?: Submission["formMethod"];
        formAction?: Submission["formAction"];
        formEncType?: Submission["formEncType"];
        text?: Submission["text"];
        formData?: Submission["formData"];
        json?: Submission["json"];
        actionResult?: DataResult;
        defaultShouldRevalidate: boolean;
    }): boolean;
}
/**
 * Keys we cannot change from within a lazy() function. We spread all other keys
 * onto the route. Either they're meaningful to the router, or they'll get
 * ignored.
 */
type ImmutableRouteKey = "lazy" | "caseSensitive" | "path" | "id" | "index" | "children";
type RequireOne<T, Key = keyof T> = Exclude<{
    [K in keyof T]: K extends Key ? Omit<T, K> & Required<Pick<T, K>> : never;
}[keyof T], undefined>;
/**
 * lazy() function to load a route definition, which can add non-matching
 * related properties to a route
 */
interface LazyRouteFunction<R extends AgnosticRouteObject> {
    (): Promise<RequireOne<Omit<R, ImmutableRouteKey>>>;
}
/**
 * Base RouteObject with common props shared by all types of routes
 */
type AgnosticBaseRouteObject = {
    caseSensitive?: boolean;
    path?: string;
    id?: string;
    loader?: LoaderFunction;
    action?: ActionFunction;
    hasErrorBoundary?: boolean;
    shouldRevalidate?: ShouldRevalidateFunction;
    handle?: any;
    lazy?: LazyRouteFunction<AgnosticBaseRouteObject>;
};
/**
 * Index routes must not have children
 */
type AgnosticIndexRouteObject = AgnosticBaseRouteObject & {
    children?: undefined;
    index: true;
};
/**
 * Non-index routes may have children, but cannot have index
 */
type AgnosticNonIndexRouteObject = AgnosticBaseRouteObject & {
    children?: AgnosticRouteObject[];
    index?: false;
};
/**
 * A route object represents a logical route, with (optionally) its child
 * routes organized in a tree-like structure.
 */
type AgnosticRouteObject = AgnosticIndexRouteObject | AgnosticNonIndexRouteObject;
type AgnosticDataIndexRouteObject = AgnosticIndexRouteObject & {
    id: string;
};
type AgnosticDataNonIndexRouteObject = AgnosticNonIndexRouteObject & {
    children?: AgnosticDataRouteObject[];
    id: string;
};
/**
 * A data route object, which is just a RouteObject with a required unique ID
 */
type AgnosticDataRouteObject = AgnosticDataIndexRouteObject | AgnosticDataNonIndexRouteObject;
/**
 * The parameters that were parsed from the URL path.
 */
type Params<Key extends string = string> = {
    readonly [key in Key]: string | undefined;
};
/**
 * A RouteMatch contains info about how a route matched a URL.
 */
interface AgnosticRouteMatch<ParamKey extends string = string, RouteObjectType extends AgnosticRouteObject = AgnosticRouteObject> {
    /**
     * The names and values of dynamic parameters in the URL.
     */
    params: Params<ParamKey>;
    /**
     * The portion of the URL pathname that was matched.
     */
    pathname: string;
    /**
     * The portion of the URL pathname that was matched before child routes.
     */
    pathnameBase: string;
    /**
     * The route object that was used to match.
     */
    route: RouteObjectType;
}
interface AgnosticDataRouteMatch extends AgnosticRouteMatch<string, AgnosticDataRouteObject> {
}
declare class DeferredData {
    private pendingKeysSet;
    private controller;
    private abortPromise;
    private unlistenAbortSignal;
    private subscribers;
    data: Record<string, unknown>;
    init?: ResponseInit;
    deferredKeys: string[];
    constructor(data: Record<string, unknown>, responseInit?: ResponseInit);
    private trackPromise;
    private onSettle;
    private emit;
    subscribe(fn: (aborted: boolean, settledKey?: string) => void): () => boolean;
    cancel(): void;
    resolveData(signal: AbortSignal): Promise<boolean>;
    get done(): boolean;
    get unwrappedData(): {};
    get pendingKeys(): string[];
}

/**
 * State maintained internally by the router.  During a navigation, all states
 * reflect the the "old" location unless otherwise noted.
 */
interface RouterState {
    /**
     * The action of the most recent navigation
     */
    historyAction: Action;
    /**
     * The current location reflected by the router
     */
    location: Location;
    /**
     * The current set of route matches
     */
    matches: AgnosticDataRouteMatch[];
    /**
     * Tracks whether we've completed our initial data load
     */
    initialized: boolean;
    /**
     * Current scroll position we should start at for a new view
     *  - number -> scroll position to restore to
     *  - false -> do not restore scroll at all (used during submissions)
     *  - null -> don't have a saved position, scroll to hash or top of page
     */
    restoreScrollPosition: number | false | null;
    /**
     * Indicate whether this navigation should skip resetting the scroll position
     * if we are unable to restore the scroll position
     */
    preventScrollReset: boolean;
    /**
     * Tracks the state of the current navigation
     */
    navigation: Navigation;
    /**
     * Tracks any in-progress revalidations
     */
    revalidation: RevalidationState;
    /**
     * Data from the loaders for the current matches
     */
    loaderData: RouteData;
    /**
     * Data from the action for the current matches
     */
    actionData: RouteData | null;
    /**
     * Errors caught from loaders for the current matches
     */
    errors: RouteData | null;
    /**
     * Map of current fetchers
     */
    fetchers: Map<string, Fetcher>;
    /**
     * Map of current blockers
     */
    blockers: Map<string, Blocker>;
}
/**
 * Data that can be passed into hydrate a Router from SSR
 */
type HydrationState = Partial<Pick<RouterState, "loaderData" | "actionData" | "errors">>;
/**
 * Potential states for state.navigation
 */
type NavigationStates = {
    Idle: {
        state: "idle";
        location: undefined;
        formMethod: undefined;
        formAction: undefined;
        formEncType: undefined;
        formData: undefined;
        json: undefined;
        text: undefined;
    };
    Loading: {
        state: "loading";
        location: Location;
        formMethod: Submission["formMethod"] | undefined;
        formAction: Submission["formAction"] | undefined;
        formEncType: Submission["formEncType"] | undefined;
        formData: Submission["formData"] | undefined;
        json: Submission["json"] | undefined;
        text: Submission["text"] | undefined;
    };
    Submitting: {
        state: "submitting";
        location: Location;
        formMethod: Submission["formMethod"];
        formAction: Submission["formAction"];
        formEncType: Submission["formEncType"];
        formData: Submission["formData"];
        json: Submission["json"];
        text: Submission["text"];
    };
};
type Navigation = NavigationStates[keyof NavigationStates];
type RevalidationState = "idle" | "loading";
/**
 * Potential states for fetchers
 */
type FetcherStates<TData = any> = {
    Idle: {
        state: "idle";
        formMethod: undefined;
        formAction: undefined;
        formEncType: undefined;
        text: undefined;
        formData: undefined;
        json: undefined;
        data: TData | undefined;
        " _hasFetcherDoneAnything "?: boolean;
    };
    Loading: {
        state: "loading";
        formMethod: Submission["formMethod"] | undefined;
        formAction: Submission["formAction"] | undefined;
        formEncType: Submission["formEncType"] | undefined;
        text: Submission["text"] | undefined;
        formData: Submission["formData"] | undefined;
        json: Submission["json"] | undefined;
        data: TData | undefined;
        " _hasFetcherDoneAnything "?: boolean;
    };
    Submitting: {
        state: "submitting";
        formMethod: Submission["formMethod"];
        formAction: Submission["formAction"];
        formEncType: Submission["formEncType"];
        text: Submission["text"];
        formData: Submission["formData"];
        json: Submission["json"];
        data: TData | undefined;
        " _hasFetcherDoneAnything "?: boolean;
    };
};
type Fetcher<TData = any> = FetcherStates<TData>[keyof FetcherStates<TData>];
interface BlockerBlocked {
    state: "blocked";
    reset(): void;
    proceed(): void;
    location: Location;
}
interface BlockerUnblocked {
    state: "unblocked";
    reset: undefined;
    proceed: undefined;
    location: undefined;
}
interface BlockerProceeding {
    state: "proceeding";
    reset: undefined;
    proceed: undefined;
    location: Location;
}
type Blocker = BlockerUnblocked | BlockerBlocked | BlockerProceeding;

/**
 * NOTE: If you refactor this to split up the modules into separate files,
 * you'll need to update the rollup config for react-router-dom-v5-compat.
 */

declare global {
    var __staticRouterHydrationData: HydrationState | undefined;
}

declare global {
	interface SymbolConstructor {
		readonly observable: symbol;
	}
}

declare global {
    var globalProjectAnnotations: NormalizedProjectAnnotations<any>;
    var defaultProjectAnnotations: ProjectAnnotations<any>;
}
type WrappedStoryRef = {
    __pw_type: 'jsx';
    props: Record<string, any>;
} | {
    __pw_type: 'importRef';
};
type UnwrappedJSXStoryRef = {
    __pw_type: 'jsx';
    type: UnwrappedImportStoryRef;
};
type UnwrappedImportStoryRef = ComposedStoryFn;
declare global {
    function __pwUnwrapObject(storyRef: WrappedStoryRef): Promise<UnwrappedJSXStoryRef | UnwrappedImportStoryRef>;
}

declare const initialGlobals: Record<string, GlobalState>;

declare const responsiveViewport: Viewport;

export { ADDON_ID, DEFAULT_VIEWPORT, type GlobalState, type GlobalStateUpdate, INITIAL_VIEWPORTS, type InitialViewportKeys, MINIMAL_VIEWPORTS, PANEL_ID, PARAM_KEY, TOOL_ID, type Viewport, type ViewportGlobals, type ViewportMap, type ViewportParameters, type ViewportStyles, initialGlobals, responsiveViewport };
