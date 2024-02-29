import { coerce, defined } from "./typing.js";

/**
 * Curries a function by returning a new function that can take arguments until the
 * original function's arity is satisfied.
 *
 * @template {Function} Curried
 * @param {CallableFunction} fn - The function to curry.
 * @returns {Curried}
 */
function curry(fn) {
  const arity = fn.length;
  const curriedName = `curried${fn.name[0]?.toUpperCase()}${fn.name.substring(1)}`;
  const impl = {
    arity,
    /**
     * @param {any[]} args
     * @returns {any}
     */
    [curriedName](...args) {
      if (this.arity > args.length) {
        // @ts-ignore: ¯\_(ツ)_/¯
        return this[curriedName].bind(this, ...args);
      }

      return fn(...args);
    },
  };

  // @ts-ignore: ¯\_(ツ)_/¯
  return coerce(defined(impl[curriedName]).bind(impl));
}

export { curry };
