// eslint-disable-next-line no-unused-vars
import { z } from "zod";

/**
 * Represents any possible Zod schema.
 *
 * @typedef {z.ZodTypeAny}
 */
var AnySchema;

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

export { AnySchema, Input, Output };
