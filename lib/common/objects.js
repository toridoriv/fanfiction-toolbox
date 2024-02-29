import { curry } from "./functions.js";
// eslint-disable-next-line no-unused-vars
import { KeyOf } from "./typing.js";

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

export { createPicker, createPropertyChecker, hasPropertySetTo, pick };
