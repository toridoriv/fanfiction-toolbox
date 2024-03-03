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

export {
  coerce,
  DefaultExpandExclusions,
  defined,
  Expand,
  ExpandOneLevel,
  ExpandRecursively,
  KeyOf,
  Primitive,
  ValueOf,
};
