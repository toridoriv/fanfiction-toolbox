// eslint-disable-next-line no-unused-vars
import { z } from "zod";

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
 * Gets the properties that result from parsing a value with the model `T`.
 *
 * @template {AnySchema} T
 * @typedef {z.output<T>}
 */
var Output;

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

export { AnySchema, buildObject, FromShape, Input, Output, Shape };
