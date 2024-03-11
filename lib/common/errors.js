/**
 * Represents a generic application error that extends the native {@link Error} class.
 * This class can be used as a base class for more specific application errors.
 * It captures the stack trace to aid in debugging.
 *
 * @extends {Error}
 */
class ApplicationError extends Error {
  constructor() {
    super();

    this.name = this.constructor.name;
    Error.captureStackTrace(this);
  }
}

/**
 * Represents an error caused by a HTTP request. It contains information about the request
 * that triggered the problem and the response received.
 *
 * @extends {ApplicationError}
 */
class HttpError extends ApplicationError {
  /**
   * Construct a new HttpError from a Response object.
   *
   * @param {Response} response - The response object.
   */
  constructor(response) {
    super();

    /**
     * The status message corresponding to the HTTP status code.
     */
    this.message = response.statusText;

    /**
     * More details about this error.
     */
    this.cause = {
      /**
       * The URL from which the response was received.
       */
      url: response.url,
      /**
       * The headers of the response, represented as an object with key-value pairs.
       */
      headers: Object.fromEntries(response.headers),
      /**
       * Indicates whether the response was the result of a redirect.
       */
      redirected: response.redirected,
      /**
       * The type of the response (e.g., 'basic', 'cors').
       */
      type: response.type,
    };

    Object.defineProperty(this.constructor, "name", {
      value: `${this.constructor.name}${response.status}`,
    });
  }
}

/**
 * Represents an error when a specific key is missing in an object.
 *
 * @extends {ApplicationError}
 */
class MissingKeyError extends ApplicationError {
  /**
   * Creates an instance of MissingKeyError.
   *
   * @param {PropertyKey} key    - The key that is missing from the object.
   * @param {Object}      object - The object from which the key is missing.
   */
  constructor(key, object) {
    super();

    /**
     * Indicates the key that was expected to be found within the object.
     *
     * @type {string}
     */
    this.message = `The key ${String(key)} doesn't exist on the given object.`;

    /**
     * Information about the error cause.
     */
    this.cause = {
      /**
       * The object that was supposed to contain the key.
       */
      value: object,
    };
  }
}

/**
 * Represents an error with data validation, such as when input data does not meet the
 * expected format or constraints.
 *
 * @extends {ApplicationError}
 */
class ValidationError extends ApplicationError {
  /**
   * Factory method to create a new ValidationError instance from a validation issue.
   *
   * @param {ValidationIssue} issue - The validation issue that triggered the error.
   * @returns {ValidationError} A new instance encapsulating the validation issue.
   */
  static create(issue) {
    return new ValidationError(issue);
  }

  /**
   * Constructs a new ValidationError instance.
   *
   * @param {ValidationIssue} issue - The validation issue with more details.
   */
  constructor({ message, code, ...rest }) {
    super();

    /**
     * A human-readable description of the validation error.
     *
     * @type {string}
     */
    this.message = message;

    /**
     * A code that uniquely identifies the type of validation error.
     */
    this.code = code;

    /**
     * Additional information or context about the validation error.
     */
    this.cause = {
      ...rest,
    };
  }
}

/**
 * Represents multiple errors with data validation.
 *
 * @extends {ApplicationError}
 */
class ValidationErrors extends ApplicationError {
  /**
   * Constructs a new ValidationErrors instance.
   *
   * @param {string}            message - A general message describing the validation
   *                                    errors.
   * @param {ValidationIssue[]} issues  - An array of validation issues.
   */
  constructor(message, issues) {
    super();

    /**
     * A human-readable message summarizing the validation errors.
     *
     * @type {string}
     */
    this.message = message;

    /**
     * An array of ValidationError instances, each representing a specific validation
     * issue.
     *
     * @type {ValidationError[]}
     */
    this.errors = issues.map(ValidationError.create);
  }
}

export {
  ApplicationError,
  HttpError,
  MissingKeyError,
  ValidationError,
  ValidationErrors,
};

/**
 * Represents a validation issue object.
 *
 * @typedef {import("zod").ZodIssue} ValidationIssue
 */
