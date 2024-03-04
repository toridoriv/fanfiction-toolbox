import { defined } from "./typing.js";

/**
 * Application level configuration.
 * Properties within this object are frozen to prevent accidental modification.
 */
const Config = Object.freeze({
  /**
   * The Gemini API key. The value is retrieved from the environment variables.
   */
  GEMINI_API_KEY: defined(process.env.GEMINI_API_KEY),
});

export { Config };
