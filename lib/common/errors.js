/**
 * Represents an error caused by a HTTP request. It contains information about the request
 * that triggered the problem and the response received.
 *
 * @extends {Error}
 */
export class HttpError extends Error {
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
 * @extends {ReferenceError}
 */
export class MissingKeyError extends ReferenceError {
  /**
   * Creates an instance of MissingKeyError.
   *
   * @param {PropertyKey} key    - The key that is missing from the object.
   * @param {Object}      object - The object from which the key is missing.
   */
  constructor(key, object) {
    super(`The key ${String(key)} doesn't exist on the given object.`);

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
