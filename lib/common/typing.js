/**
 * Takes a type `T` and expands it into an object type with the same properties as `T`.
 * {@link https://stackoverflow.com/a/69288824/62937 Credits to StackOverflow.}
 *
 * @template T
 * @typedef {T extends Primitive
 *   ? Primitive
 *   : T extends infer O
 *     ? { [K in keyof O]: O[K] }
 *     : T}
 */
var Expand;

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

export { coerce, defined, Expand, KeyOf, Primitive, ValueOf };
