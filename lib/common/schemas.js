import { z } from "zod";

import { Curried1, curry } from "./functions.js";
import { Expand } from "./typing.js";

/**
 * Represents any possible Zod schema.
 *
 * @typedef {z.ZodTypeAny}
 */
var AnySchema;

/**
 * Represents the raw object shape before transforming it into a Zod schema object.
 *
 * @typedef {z.ZodRawShape}
 */
var Shape;

/**
 * @template {Shape} T
 * @typedef {z.ZodObject<T, "strip">}
 */
var FromShape;

/**
 * Gets the properties required to successfully parse a value with the model `T`.
 *
 * @template {AnySchema} T
 * @typedef {z.input<T>}
 */
var Input;

/**
 * Gets the properties that result from parsing a value with the model `T`. Same as {@link SimpleOutput}
 * but expanded.
 *
 * @template {AnySchema} T
 * @typedef {Expand<z.output<T>, false>}
 */
var Output;

/**
 * Gets the properties that result from parsing a value with the model `T`.
 *
 * @template {AnySchema} T
 * @typedef {z.output<T>}
 */
var SimpleOutput;

/**
 * Builds a Zod object schema from a shape.
 *
 * @template {Shape} T - The type of the shape.
 * @param {T} shape - The object shape to build the schema from.
 * @returns {FromShape<T>} The Zod object schema created from the shape.
 */
function buildObject(shape) {
  return z.object(shape);
}

/**
 * Parses the given input using the provided schema.
 *
 * @template {AnySchema} T
 * @template {Input<T>}  U
 * @param {T} schema - The schema to use for parsing.
 * @param {U} input  - The input data to be parsed.
 * @returns {Output<T>} The parsed data.
 */
function parse(schema, input) {
  return schema.parse(input);
}

/**
 * Generates a parser function based on the provided schema.
 *
 * @template {AnySchema} T
 * @param {T} schema - The schema to use for parsing.
 * @returns {Curried1<Input<T>, Output<T>>} A function that takes an input and returns
 *                                          the parsed result.
 */
function createParser(schema) {
  return curry(parse)(schema);
}

export {
  AnySchema,
  buildObject,
  createParser,
  FromShape,
  Input,
  Output,
  parse,
  Shape,
  SimpleOutput,
};
