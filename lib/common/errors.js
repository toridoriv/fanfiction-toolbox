/**
 * Error thrown when an HTTP request fails.
 */
export class HttpError extends Error {
  /**
   * Construct a new HttpError from a Response object.
   *
   * @param {Response} response - The response object.
   */
  constructor(response) {
    super(response.statusText, {
      cause: {
        url: response.url,
        headers: Object.fromEntries(response.headers),
        redirected: response.redirected,
        type: response.type,
      },
    });

    Object.defineProperty(this.constructor, "name", {
      value: `${this.constructor.name}${response.status}`,
    });
  }
}
