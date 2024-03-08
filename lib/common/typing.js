// eslint-disable-next-line no-unused-vars
import util from "node:util";

/**
 * Represents any array, including empty arrays or arrays with items.
 *
 * @typedef {any[]}
 */
var AnyArray;

/**
 * Extracts the first element type from a tuple or array type.
 *
 * @template T
 * @typedef {T extends [infer F, ...any] ? F : never}
 */
var FirstItem;

/**
 * Constructor type.
 *
 * @template {any[]} [T=any[]] - The parameter types for the constructor function.
 * @template [U=any]   - The return type of the constructor function.
 * @typedef {new (...args: T) => U}
 */
var Constructor;

/**
 * Callback function for custom inspection.
 *
 * @callback _CustomInspectFunction
 * @param {number}                      depth   The current configured depth.
 * @param {util.InspectOptionsStylized} options The current configuration for inspect.
 * @param {typeof util.inspect}         inspect The util.inspect function.
 * @returns {string} The string representation from custom inspection.
 */

/**
 * Function for custom inspection.
 *
 * @typedef {_CustomInspectFunction}
 */
var CustomInspectFunction;

/**
 * The default types that should be excluded from recursive expansion.
 * This includes primitive values and other types that should not be deeply expanded.
 *
 * @typedef {| ArrayBuffer
 *   | Blob
 *   | Date
 *   | FormData
 *   | Headers
 *   | Map<any, any>
 *   | Primitive
 *   | ReadableStream<any>}
 */
var DefaultExpandExclusions;

/**
 * Takes a type `T` and expands it recursively or one level deep based on `UseRecursive`.
 * If `UseRecursive` is `true`, uses {@link ExpandRecursively}, else it uses {@link ExpandOneLevel}.
 * The type `E` is used to specify types that should not be expanded, but returned as they are. The default
 * exclusions can be checked in {@link DefaultExpandExclusions}.
 *
 * @template T
 * @template {boolean} [UseRecursive=false]
 * @template [E=DefaultExpandExclusions]
 * @typedef {UseRecursive extends true
 *   ? ExpandRecursively<T, E>
 *   : ExpandOneLevel<T, E>}
 */
var Expand;

/**
 * Takes a type `T` and expands it into an object type with the same properties as `T`.
 * Replaces any properties and array elements in `T` with their expanded types, up to one
 * level deep.
 * `E` specifies types that should not be expanded but returned as-is.
 *
 * @template T
 * @template [E=DefaultExpandExclusions]
 * @typedef {T extends E
 *   ? T
 *   : T extends (...args: infer A) => infer R
 *     ? (...args: ExpandOneLevel<A, E>) => ExpandOneLevel<R, E>
 *     : T extends Promise<infer U>
 *       ? Promise<ExpandOneLevel<U, E>>
 *       : T extends object
 *         ? { [K in keyof T]: T[K] }
 *         : T}
 */
var ExpandOneLevel;

/**
 * Takes a type `T` and expands it into an object type with the same properties as `T`.
 * Replaces any properties and array elements in `T` with their expanded types,
 * recursively.
 * `E` specifies types that should not be expanded but returned as-is.
 *
 * @template T
 * @template [E=DefaultExpandExclusions]
 * @typedef {T extends E
 *   ? T
 *   : T extends (...args: infer A) => infer R
 *     ? (...args: ExpandRecursively<A, E>) => ExpandRecursively<R, E>
 *     : T extends Promise<infer U>
 *       ? Promise<ExpandRecursively<U, E>>
 *       : T extends object
 *         ? { [K in keyof T]: ExpandRecursively<T[K], E> }
 *         : T}
 */
var ExpandRecursively;

/**
 * Represents the union of the keys of type `T`.
 *
 * @template T
 * @typedef {keyof T}
 */
var KeyOf;

/**
 * Represents the primitive data types in JavaScript.
 *
 * @typedef {string | number | bigint | boolean | symbol | null | undefined}
 */
var Primitive;

/**
 * Represents the possible values in type `T`.
 *
 * @template T
 * @typedef {T[KeyOf<T>]}
 */
var ValueOf;

/**
 * Coerces a value to a specified type.
 *
 * @template T - The type to coerce the value to.
 * @param {unknown} value - The value to coerce.
 * @returns {T} The coerced value.
 */
function coerce(value) {
  // eslint-disable-next-line prettier/prettier
  return /** @type {T} */ (value);
}

/**
 * Ensures the given value is defined (not `undefined`).
 *
 * @template T - The type of the value.
 * @param {T}      value     - The value to check.
 * @param {string} [message] - A custom error message.
 * @returns {Exclude<T, undefined>} The original value if defined.
 * @throws {TypeError} If the value is undefined.
 */
function defined(value, message = "Expected a defined value, but received `undefined`.") {
  if (value === undefined) {
    throw new TypeError(message);
  }

  return coerce(value);
}

/**
 * Ensures that a given value is one of the accepted values, or returns a fallback value.
 *
 * @template T - The type of the values being compared.
 * @param {any} value    - The value to validate against the accepted values.
 * @param {T[]} accepted - An array of accepted values.
 * @param {T}   fallback - The fallback value to return if `value` is not accepted.
 * @returns {T} - The original `value` if it's included in `accepted`, otherwise the
 *              `fallback`.
 */
function oneOf(value, accepted, fallback) {
  if (value && accepted.includes(value)) return value;

  return fallback;
}

export {
  AnyArray,
  coerce,
  Constructor,
  CustomInspectFunction,
  DefaultExpandExclusions,
  defined,
  Expand,
  ExpandOneLevel,
  ExpandRecursively,
  FirstItem,
  KeyOf,
  oneOf,
  Primitive,
  ValueOf,
};
