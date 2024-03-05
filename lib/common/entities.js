import * as objects from "./objects.js";
import * as schemas from "./schemas.js";
// eslint-disable-next-line no-unused-vars
import { coerce, Constructor, CustomInspectFunction, defined, KeyOf } from "./typing.js";

const customInspectSymbol = Symbol.for("nodejs.util.inspect.custom");

/**
 * @template {schemas.Shape} T
 * @typedef {schemas.Input<schemas.FromShape<T>>} EntityInput
 */

/**
 * @template {schemas.Shape} T
 * @typedef {schemas.Output<schemas.FromShape<T>>} EntityRawProperties
 */

/**
 * @template {schemas.Shape}          T
 * @template {KeyOf<T>[]}             R
 * @template {EntityRawProperties<T>} [Out=EntityRawProperties<T>]
 * @typedef {objects.SetReadonly<Out, R[number]>} EntityProperties
 */

/**
 * Represents the constructor of an entity class.
 *
 * @template {schemas.Shape} T
 * @template {KeyOf<T>[]}    R
 * @typedef {Constructor<[input: EntityInput<T>], EntityProperties<T, R>>} Builder
 */

/**
 * Represents the static properties and methods for an entity class.
 *
 * @template {schemas.Shape} T
 * @typedef EntityStatics
 * @property {schemas.FromShape<T>} schema
 * The schema object for validating input.
 * @property {<U extends Constructor>(
 *   this: U,
 *   input: EntityInput<T>,
 * ) => InstanceType<U>} create
 * Factory method to create a new entity instance.
 */

/**
 * Represents an entity class constructor.
 *
 * @template {schemas.Shape} T - The shape object that defines the entity properties.
 * @template {KeyOf<T>[]}    R - Array of read-only property keys.
 * @typedef {Builder<T, R> & EntityStatics<T>} Entity
 */

/**
 * Base class for entity objects.
 */
class BaseEntity {
  /**
   * @type {schemas.FromShape<any>}
   */
  static get schema() {
    throw new Error("");
  }

  /**
   * @type {schemas.Shape}
   */
  static get shape() {
    throw new Error("");
  }

  /**
   * @type {PropertyKey[]}
   */
  static get readonly() {
    throw new Error("");
  }

  /**
   * @type {PropertyKey[]}
   */
  static get writable() {
    throw new Error("");
  }

  /**
   * @param {*} input
   */
  static create(input) {
    return new this(input);
  }

  /**
   * @param {*} input
   */
  constructor(input) {
    this.$properties = this.super.schema.parse(input);

    const mutable = getWritableDescriptors(
      this.super.shape,
      this.super.writable,
      this.$properties,
    );
    const inmutable = getReadonlyDescriptors(this.super.readonly, this.$properties);

    for (const k in mutable) {
      Object.defineProperty(this, k, defined(mutable[k]));
    }

    for (const k in inmutable) {
      Object.defineProperty(this, k, defined(inmutable[k]));
    }

    objects.hideProperties(this, ["$properties"]);
  }

  [customInspectSymbol] = inspectEntity;

  /**
   * @type {typeof BaseEntity}
   */
  get super() {
    return coerce(this.constructor);
  }
}

/**
 * Defines a new entity class.
 *
 * @template {schemas.Shape} T
 * @template {KeyOf<T>[]}    R
 * @param {T} shape    - The shape object that defines the properties.
 * @param {R} readonly - Array of read-only property keys.
 * @returns {Entity<T, R>} The new entity class constructor.
 */
function defineEntity(shape, readonly) {
  const schema = schemas.buildObject(shape);
  const writable = objects.diff(objects.getKeys(shape), readonly);

  class Entity extends BaseEntity {
    static schema = schema;
    static readonly = readonly;
    static writable = writable;
    static shape = shape;
  }

  return coerce(Entity);
}

/* -------------------------------- INTERNAL ------------------------------- */
// #region
/**
 * @this {any}
 * @type {CustomInspectFunction}
 */
function inspectEntity(depth, opts, inspect) {
  const protoKeys = Object.getOwnPropertyNames(this.constructor.prototype).filter(
    (k) => k !== "constructor",
  );
  /**
   * @type {any}
   */
  const proto = {};

  for (const key of protoKeys) {
    proto[key] = this.constructor.prototype[key];
  }

  const inner = inspect({ ...this.$properties, ...proto }, opts);

  return `${this.constructor.name} ${inner}`;
}

/**
 * @param {PropertyKey[]}            keys
 * @param {Record<PropertyKey, any>} props
 * @returns {PropertyDescriptorMap}
 */
function getReadonlyDescriptors(keys, props) {
  /**
   * @type {PropertyDescriptorMap}
   */
  const map = {};

  for (const key of keys) {
    map[key] = {
      enumerable: true,
      get() {
        return props[key];
      },
    };
  }

  return map;
}

/**
 * @param {schemas.Shape}            shape
 * @param {PropertyKey[]}            keys
 * @param {Record<PropertyKey, any>} props
 * @returns {PropertyDescriptorMap}
 */
function getWritableDescriptors(shape, keys, props) {
  /**
   * @type {PropertyDescriptorMap}
   */
  const map = {};

  for (const key of keys) {
    map[key] = {
      enumerable: true,
      get() {
        return props[key];
      },
      set(value) {
        // @ts-ignore: ¯\_(ツ)_/¯
        props[key] = shape[key]?.parse(value);
      },
    };
  }

  return map;
}
//#endregion
/* -------------------------------- INTERNAL ------------------------------- */

export { BaseEntity, defineEntity };
