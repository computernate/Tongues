export declare function objectKeyValuesAreStrings(object: object): boolean;
/**
 * Simple is null check.
 */
export declare function isNull(value: unknown): value is null;
/**
 * Simple is object check.
 */
export declare function isObject(value: unknown): value is object;
/**
 * Simple is date check
 * https://stackoverflow.com/a/44198641
 */
export declare function isDate(value: unknown): value is Date;
/**
 * Simple is function check
 */
export declare function isFunction(value: unknown): value is Function;
/**
 * Simple is string check
 */
export declare function isString(value: unknown): value is string;
/**
 * Simple is number check
 */
export declare function isNumber(value: unknown): value is number;
/**
 * Simple finite check
 */
export declare function isFinite(value: number): value is number;
/**
 * Simple integer check
 */
export declare function isInteger(value: unknown): value is number;
/**
 * Simple is boolean check
 */
export declare function isBoolean(value: unknown): value is boolean;
/**
 * Simple is array check
 */
export declare function isArray(value: unknown): value is unknown[];
/**
 * Simple is undefined check
 */
export declare function isUndefined(value: unknown): value is undefined;
/**
 * Simple is not null nor undefined check
 */
export declare function isDefined<T>(value: T): value is Exclude<T, null | undefined>;
/**
 * /^[a-zA-Z0-9_]+$/
 */
export declare function isAlphaNumericUnderscore(value: string): boolean;
export declare function isValidUrl(url: string): boolean;
/**
 * Array includes
 */
export declare function isOneOf(value: unknown, oneOf?: unknown[]): boolean;
export declare function noop(): void;
