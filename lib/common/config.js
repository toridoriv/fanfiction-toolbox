import { Logger } from "tslog";

import { coerce, defined, KeyOf, oneOf } from "./typing.js";

const LOG_LEVELS = {
  silly: 0,
  SILLY: 0,
  trace: 1,
  TRACE: 1,
  debug: 2,
  DEBUG: 2,
  info: 3,
  INFO: 3,
  warn: 4,
  WARN: 4,
  error: 5,
  ERROR: 5,
  fatal: 6,
  FATAL: 6,
};

/**
 * @type {KeyOf<typeof LOG_LEVELS>[]}
 */
const LOG_LEVEL_NAMES = coerce(Object.keys(LOG_LEVELS));

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

/**
 * Logger instance configured for application logging.
 *
 * @see {@link https://tslog.js.org | Documentation}
 */
const logger = new Logger({
  type: oneOf(process.env.LOG_TYPE, ["json", "pretty", "hidden"], "pretty"),
  minLevel: LOG_LEVELS[oneOf(process.env.LOG_LEVEL, LOG_LEVEL_NAMES, "INFO")],
  overwrite: {
    mask(value) {
      return value;
    },
  },
});

/**
 * Retrieves a boolean value from an environment variable.
 * If the environment variable is not set or cannot be parsed as a boolean,
 * the provided fallback value is returned.
 *
 * @param {string}  name     - The name of the environment variable to retrieve.
 * @param {boolean} fallback - The default value to return if the environment variable is
 *                           not set or cannot be parsed.
 * @returns {boolean} The boolean value of the environment variable or the fallback.
 */
function getBooleanFromEnvironment(name, fallback) {
  const retrieved = process.env[name];
  const parsed = retrieved ? JSON.parse(retrieved) : null;

  if (typeof parsed === "boolean") return parsed;

  return fallback;
}

/**
 * Retrieves a number value from an environment variable.
 * If the environment variable is not set or cannot be parsed as a number,
 * the provided fallback value is returned.
 *
 * @param {string} name     - The name of the environment variable to retrieve.
 * @param {number} fallback - The default value to return if the environment variable is
 *                          not set or cannot be parsed.
 * @returns {number} The number value of the environment variable or the fallback.
 */
function getNumberFromEnvironment(name, fallback) {
  const retrieved = process.env[name];
  const parsed = retrieved ? JSON.parse(retrieved) : null;

  if (typeof parsed === "number") return parsed;

  return fallback;
}

/**
 * Retrieves a string value from an environment variable.
 * If the environment variable is not set, the provided fallback value is returned.
 *
 * @param {string} name     - The name of the environment variable to retrieve.
 * @param {string} fallback - The default value to return if the environment variable is
 *                          not set.
 * @returns {string} The string value of the environment variable or the fallback.
 */
function getStringFromEnvironment(name, fallback) {
  return process.env[name] || fallback;
}

export {
  Config,
  getBooleanFromEnvironment,
  getNumberFromEnvironment,
  getStringFromEnvironment,
  logger,
};
