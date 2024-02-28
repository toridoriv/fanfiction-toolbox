import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import { dirname } from "node:path";

import * as cheerio from "@toridoriv/cheerio";
import { z } from "zod";

import { HttpError } from "./errors.js";
import { defined } from "./typing.js";

/**
 * @type {z.ZodType<PathFormatter, z.ZodTypeDef, PathFormatter>}
 */
const pathFormatterSchema = z.custom(function validate(value) {
  return typeof value === "function" && value.length > 0;
});

const schema = z.object({
  /**
   * The origin URL for the data being scraped. Must be a valid URL.
   */
  origin: z.string().url(),
  /**
   * A function to format the path of the url to scrape from.
   *
   * @see {@link PathFormatter}
   */
  urlPathFormatter: pathFormatterSchema,
  /**
   * @see {@link PathFormatter}
   */
  /**
   * A function to format the cache path.
   *
   * @see {@link PathFormatter}
   */
  cachePathFormatter: pathFormatterSchema,
  /**
   * Headers to use for the HTTP request when scraping.
   * Default sets content type to HTML.
   * Transforms the headers object into a Headers instance.
   */
  headers: z
    .record(z.string())
    .default({
      "content-type": "text/html; charset=utf-8",
    })
    .transform((value) => new Headers(value)),
  /**
   * If set to true, disables reading from the cache.
   */
  disableCache: z.boolean().optional(),
  name: z.string().min(1),
});

class WebScraper {
  /**
   * @param {WebScraperConfig} config
   */
  constructor(config) {
    /**
     * This scraper configuration.
     */
    this.config = schema.parse(config);
    /**
     * The domain name for this scraper instance.
     */
    this.domain = defined(
      new URL(this.config.origin).hostname.replace("www.", "").split(".")[0],
    );

    Object.defineProperty(this.constructor, "name", {
      value: `${this.config.name}${this.constructor.name}`,
    });
  }

  /**
   * Gets content from the cache.
   *
   * @param {string} path - The path to the cached content.
   * @returns {Promise<string | null>} The cached content, or null if not cached.
   */
  async getFromCache(path) {
    if (!existsSync(path)) {
      return null;
    }

    return fs.readFile(path, "utf-8");
  }

  /**
   * Writes content to the cache at the given path.
   *
   * **NOTE**: Creates any missing directories in the path recursively.
   *
   * @param {string} path    - The path to the cached content.
   * @param {string} content - The content to store into the cache.
   * @returns {Promise<void>}
   */
  async writeToCache(path, content) {
    const dir = dirname(path);

    if (!existsSync(dir)) {
      await fs.mkdir(dir, {
        recursive: true,
      });
    }

    return fs.writeFile(path, content, "utf-8");
  }

  /**
   * Fetches content from a remote URL.
   *
   * @param {URL} url - The URL to fetch content from.
   * @returns {Promise<string>} A promise that resolves with the text content of the
   *                            successful response.
   */
  async getFromRemote(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: this.config.headers,
    });

    if (!response.ok) {
      throw new HttpError(response);
    }

    return response.text();
  }

  /**
   * Scrapes HTML content for the page with the given ID.
   * Checks the cache first, and returns cached content if available.
   * Otherwise fetches fresh content from the remote URL.
   *
   * The scraped HTML is parsed into a Cheerio DOM for further processing.
   *
   * @param {string} id - The page id.
   * @returns {Promise<cheerio.CheerioAPI>} A Cheerio object containing the parsed HTML.
   */
  async scrape(id) {
    const path = this.config.cachePathFormatter(id);
    const url = new URL(this.config.urlPathFormatter(id), this.config.origin);

    let html = await this.getFromCache(path);

    if (html === null) {
      html = await this.getFromRemote(url);

      if (!this.config.disableCache) {
        await this.writeToCache(path, html);
      }
    }

    return cheerio.load(html, {
      baseURI: url,
    });
  }
}

/**
 * A function that formats the given string into a valid path.
 *
 * @callback PathFormatter
 * @param {string} id - The path to format.
 * @returns {string} The formatted path.
 */
var PathFormatter;

/**
 * A WebScraper configuration object.
 *
 * @typedef {z.input<typeof schema>}
 */
var WebScraperConfig;

export { PathFormatter, WebScraper, WebScraperConfig };
