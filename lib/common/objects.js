import { curry } from "./functions.js";
// eslint-disable-next-line no-unused-vars
import { coerce, ExpandOneLevel, KeyOf } from "./typing.js";

/**
 * Picks a specific property from an object and returns its value.
 *
 * @template {Object}   O
 * @template {KeyOf<O>} K
 * @param {O} obj - The input object from which to pick a property.
 * @param {K} key - The key of the property to be picked.
 * @returns {O[K]} The value of the specified property.
 */
function pick(obj, key) {
  // @ts-ignore: ¯\_(ツ)_/¯
  return createPicker(obj)(key);
}

/**
 * Creates a partial function for picking properties from an object.
 *
 * @template {Object}   O
 * @template {KeyOf<O>} K
 * @param {O} obj - The input object for which to create a partial picking function.
 * @returns {(key: K) => O[K]} A function that can be used to pick specific properties
 *                             from the input object.
 */
function createPicker(obj) {
  /**
   * @param {K} key
   * @returns {O[K]}
   */
  function pick(key) {
    return obj[key];
  }

  return pick;
}

/**
 * Checks if an object has a property set to a specific value.
 *
 * @template {PropertyKey}       K
 * @template {{ [P in K]: any }} O
 * @param {K} key   - The name of the property to check.
 * @param {*} value - The value to check for.
 * @param {O} obj   - The object to check.
 * @returns {boolean} `true` if the property matches the value, `false` otherwise.
 */
function hasPropertySetTo(key, value, obj) {
  return obj[key] === value;
}

/**
 * Creates a function that checks if an object has a specific property set to a given
 * value.
 *
 * The returned function takes a key and value and returns a new function that takes an
 * object and checks if that object has a property matching the key set to the provided
 * value.
 *
 * Useful for creating reusable property checkers.
 *
 * @template {PropertyKey} K
 * @param {K} key - The name of the property to check.
 * @returns {(value: any) => <O extends { [P in K]: any }>(obj: O) => boolean}
 */
function createPropertyChecker(key) {
  return curry(hasPropertySetTo)(key);
}

/**
 * Takes an object type `T`, makes the keys on `U` readonly and leaves the rest mutable.
 *
 * @template T
 * @template {KeyOf<T>} U
 * @typedef {ExpandOneLevel<Omit<T, U> & Readonly<Pick<T, U>>>}
 */
var SetReadonly;

/**
 * Makes specified keys on an object readonly.
 *
 * @template T
 * @template {KeyOf<T>} U
 * @param {T}   value - The input object.
 * @param {U[]} keys  - The keys to make readonly.
 * @returns {SetReadonly<T, U>} The input object with the specified keys made readonly.
 */
function setReadonly(value, keys) {
  keys.forEach((key) => {
    Object.defineProperty(value, key, {
      value: value[key],
      writable: false,
      configurable: false,
    });
  });

  return coerce(value);
}

/**
 * Hides the specified properties on an object by making them non-enumerable.
 *
 * @template T - The type of the object.
 * @template {KeyOf<T>} U - The keys on the object to make non-enumerable.
 * @param {T}   value - The object to modify.
 * @param {U[]} keys  - The keys to make non-enumerable.
 * @returns {T} The modified object.
 */
function hideProperties(value, keys) {
  keys.forEach((key) => {
    Object.defineProperty(value, key, {
      ...Object.getOwnPropertyDescriptor(value, key),
      enumerable: false,
    });
  });

  return value;
}

/**
 * Compares two arrays and returns the difference.
 *
 * @template {any[]} T - The array type.
 * @param {T} a - The first array to compare.
 * @param {T} b - The second array to compare.
 * @returns {T} A new array containing the items from `a` that are not in `b`.
 */
function diff(a, b) {
  /**
   * @type {T}
   */
  const result = coerce([]);

  for (const item in a) {
    if (!b.includes(item)) {
      result.push(item);
    }
  }

  return result;
}

/**
 * Gets the keys of an object as an array.
 *
 * @template T - The type of the object.
 * @param {T} value - The object to get keys from.
 * @returns {KeyOf<T>[]} An array containing the keys of the object.
 */
function getKeys(value) {
  return coerce(Object.keys(coerce(value)));
}

export {
  createPicker,
  createPropertyChecker,
  diff,
  getKeys,
  hasPropertySetTo,
  hideProperties,
  pick,
  SetReadonly,
  setReadonly,
};
