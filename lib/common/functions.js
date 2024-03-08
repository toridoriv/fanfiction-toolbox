// @ts-nocheck
import { AnyArray, coerce, defined } from "./typing.js";

/**
 * Represents any possible function.
 *
 * @typedef {(...args: AnyArray) => any}
 */
var AnyFunction;

/**
 * Represents any curried function with varying arity.
 *
 * @typedef {| Curried1<any, any>
 *   | Curried2<any, any, any>
 *   | Curried3<any, any, any, any>
 *   | Curried4<any, any, any, any, any>}
 */
var AnyCurriedFunction;

/**
 * A type representing a curried function that takes a single argument of type `A` and
 * returns a value of type `R`.
 *
 * @template A
 * @template R
 * @typedef {{ <T1 extends A>(a: T1): R }}
 */
var Curried1;

/**
 * A type representing a curried function that can take one or two arguments.
 * - If one argument of type `A` is provided, it returns a function that expects a single
 * argument of type `B`.
 * - If both arguments of types `A` and `B` are provided, it returns a value of type `R`.
 *
 * @template A
 * @template B
 * @template R
 * @typedef {{
 *   <T1 extends A>(a: T1): Curried1<B, R>;
 *   <T1 extends A, T2 extends B>(a: T1, b: T2): R;
 * }}
 */
var Curried2;

/**
 * A type representing a curried function with up to three arguments.
 * - If one argument of type `A` is provided, it returns a function that expects two
 * arguments of types `B` and `C`.
 * - If two arguments of types `A` and `B` are provided, it returns a function that
 * expects a single argument of type `C`.
 * - If all three arguments of types `A`, `B`, and `C` are provided, it returns a value of
 * type `R`.
 *
 * @template A
 * @template B
 * @template C
 * @template R
 * @typedef {{
 *   <T1 extends A>(a: T1): Curried2<B, C, R>;
 *   <T1 extends A, T2 extends B>(a: T1, b: T2): Curried1<C, R>;
 *   <T1 extends A, T2 extends B, T3 extends C>(a: T1, b: T2, c: T3): R;
 * }}
 */
var Curried3;

/**
 * A type representing a curried function with up to four arguments.
 * - If one argument of type `A` is provided, it returns a function that expects three
 * arguments of types `B`, `C`, and `D`.
 * - If two arguments of types `A` and `B` are provided, it returns a function that
 * expects two arguments of types `C` and `D`.
 * - If three arguments of types `A`, `B`, and `C` are provided, it returns a function
 * that expects a single argument of type `D`.
 * - If all four arguments of types `A`, `B`, `C`, and `D` are provided, it returns a
 * value of type `R`.
 *
 * @template A
 * @template B
 * @template C
 * @template D
 * @template R
 * @typedef {{
 *   <T1 extends A>(a: T1): Curried3<B, C, D, R>;
 *   <T1 extends A, T2 extends B>(a: T1, b: T2): Curried2<C, D, R>;
 *   <T1 extends A, T2 extends B, T3 extends C>(a: T1, b: T2, c: T3): Curried1<D, R>;
 *   <T1 extends A, T2 extends B, T3 extends C, T4 extends D>(
 *     a: T1,
 *     b: T2,
 *     c: T3,
 *     d: T4,
 *   ): R;
 * }}
 */
var Curried4;

/**
 * A utility type that represents a curried version of the original function type `F`.
 * It infers the argument types and the return type of the function `F`, and based on the
 * number of arguments, it provides the corresponding curried function type.
 *
 * @template F
 * @typedef {F extends (...args: infer Args) => infer R
 *   ? Args extends [infer A, infer B, infer C, infer D]
 *     ? Curried4<A, B, C, D, R>
 *     : Args extends [infer A, infer B, infer C]
 *       ? Curried3<A, B, C, R>
 *       : Args extends [infer A, infer B]
 *         ? Curried2<A, B, R>
 *         : Args extends [infer A]
 *           ? Curried1<A, R>
 *           : R
 *   : never}
 */
var Curried;

/**
 * Curries a function by returning a new function that can take arguments until the
 * original function's arity is satisfied.
 *
 * @template {AnyFunction | AnyCurriedFunction} F
 * @param {F} fn - The function to curry.
 * @returns {F extends AnyCurriedFunction ? F : Curried<F>}
 */
function curry(fn) {
  const arity = fn.length;
  const curriedName = `curried${fn.name[0].toUpperCase()}${fn.name.substring(1)}`;
  const implementation = {
    arity,
    [fn.name]: fn,
    [curriedName](...args) {
      return this.arity > args.length
        ? this[curriedName].bind(this, ...args)
        : this[fn.name](...args);
    },
  };

  return implementation[curriedName].bind(implementation);
}

export {
  AnyCurriedFunction,
  AnyFunction,
  Curried,
  Curried1,
  Curried2,
  Curried3,
  Curried4,
  curry,
};
