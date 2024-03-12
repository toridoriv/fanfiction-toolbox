import { createRequire } from "node:module";

import Kuroshiro from "@sglkc/kuroshiro";
import KuromojiAnalyzer from "@sglkc/kuroshiro-analyzer-kuromoji";
import { Template } from "@toridoriv/toolkit";
import { eld } from "eld";

import { logger } from "../common/config.js";
import { ValidationErrors } from "../common/errors.js";
import { createPickerByKey } from "../common/objects.js";
import { defined } from "../common/typing.js";
import * as languages from "./languages.js";
import * as schemas from "./schemas.js";

const require = createRequire(import.meta.url);
const { detect } = require("cld");

/**
 * @type {CyrillicConstructor}
 */
const createCyrillicTranslit = require("cyrillic-to-translit-js");

/**
 * Class designed to handle the transliteration of text from one script to another.
 * It supports multiple languages and utilizes specific transliteration methods for each
 * supported language.
 */
class Transliterator {
  /**
   * Holds the template definitions for the Transliterator class.
   * These templates are used to format the transliterated text with additional markup.
   */
  static templates = Object.freeze({
    /**
     * A template for generating Ruby annotations, which are used in HTML to display small
     * text above or below the main text, often used for annotations or pronunciation
     * guides. The template includes placeholders for the original text and its
     * transliteration, wrapped in appropriate Ruby annotation tags with accessibility
     * attributes.
     */
    RubyAnnotation: new Template(
      `<ruby>{original}<rp>(</rp><rt role="presentation" aria-hidden="true">{transliteration}</rt><rp>)</rp></ruby>`,
    ),
  });

  /**
   * @callback Transliterate
   * @param {string} text
   * @returns {Promise<string> | string}
   */

  /**
   * Constructs a Transliterator instance.
   *
   * @param {LanguageHelper} helper - An object that assists with language-specific
   *                                operations.
   */
  constructor(helper) {
    /**
     * An object that assists with language-specific operations.
     *
     * @type {LanguageHelper}
     */
    this.helper = helper;

    /**
     * A mapping of language codes to their respective transliteration methods.
     *
     * @type {Record<string, Transliterate>}
     */
    this.transliterateByCode = {
      /**
       * Japanese transliteration method.
       */
      ja: this.japanese,
      /**
       * Mongolian transliteration method.
       */
      mn: this.mongolian,
      /**
       * Russian transliteration method.
       */
      ru: this.russian,
      /**
       * Ukrainian transliteration method.
       */
      uk: this.ukrainian,
    };
  }

  /**
   * @param {string}         text
   * @param {string}         code
   * @param {CyrillicMethod} exec
   * @returns {string}
   */
  #cyrillic(text, code, exec) {
    const words = this.helper.wordSegmenter.getUniqueWords(text, code);
    let result = text;

    for (const word of words) {
      const annotation = Transliterator.templates.RubyAnnotation.render({
        original: word,
        transliteration: exec(word),
      });

      result = result.replaceAll(word, annotation);
    }

    return result;
  }

  /**
   * Transliterates the given Japanese text into hiragana, with furigana readings.
   *
   * @param {string} text - The Japanese text to transliterate.
   * @returns {Promise<string>} The transliterated text.
   */
  async japanese(text) {
    const result = await this.helper.kuroshiro.convert(text, {
      mode: "furigana",
      to: "hiragana",
    });

    return result.replaceAll("<rt>", `<rt role="presentation" aria-hidden="true">`);
  }

  /**
   * Transliterates Mongolian text to a different script using a predefined transformation
   * function.
   *
   * @param {string} text - The Mongolian text to be transliterated.
   * @returns {string} - The transliterated text with annotations for pronunciation.
   */
  mongolian(text) {
    return this.#cyrillic(text, "mn", this.helper.cyrillicTranslitMN.transform);
  }

  /**
   * Transliterates Russian text to a different script using a predefined transformation
   * function.
   *
   * @param {string} text - The Russian text to be transliterated.
   * @returns {string} - The transliterated text with annotations for pronunciation.
   */
  russian(text) {
    return this.#cyrillic(text, "ru", this.helper.cyrillicTranslitRU.transform);
  }

  /**
   * Transliterates Ukrainian text to a different script using a predefined transformation
   * function.
   *
   * @param {string} text - The Ukrainian text to be transliterated.
   * @returns {string} - The transliterated text with annotations for pronunciation.
   */
  ukrainian(text) {
    return this.#cyrillic(text, "uk", this.helper.cyrillicTranslitUK.transform);
  }

  /**
   * Transliterates the given text to the specified language's script.
   *
   * @param {string} text         - The text to be transliterated.
   * @param {string} languageCode - A code representing the target language for
   *                              transliteration.
   * @returns {string | Promise<string>} - The transliterated text, or a promise that
   *                                     resolves to it.
   */
  transliterate(text, languageCode) {
    const fn = this.transliterateByCode[languageCode];

    if (!fn) return "";

    return fn(text);
  }
}

/**
 * Responsible for segmenting text into words.
 *
 * Utilizes the {@link Intl.Segmenter} API to create language-specific segmenters for word
 * granularity segmentation.
 */
class WordSegmenter {
  /**
   * Extracts the 'segment' property from a segment object.
   */
  static pickSegment = createPickerByKey("segment");

  /**
   * Creates a new instances of `WordSegmenter`.
   */
  constructor() {
    /**
     * A record of {@link Intl.Segmenter} instances keyed by language code.
     *
     * @type {Record<string, Intl.Segmenter>}
     */
    this.segmenters = {};
  }

  /**
   * Retrieves an Intl.Segmenter for the given language code, creating one if it doesn't
   * exist.
   *
   * @param {string} code - A two-letter language code.
   * @returns {Intl.Segmenter} An Intl.Segmenter instance.
   * @throws {Error} If the language code is not exactly two characters long.
   */
  getSegmenterByLanguageCode(code) {
    if (code.length !== 2) {
      throw new Error("");
    }

    if (!this.segmenters[code]) {
      this.segmenters[code] = new Intl.Segmenter(code, { granularity: "word" });
    }

    return this.segmenters[code];
  }

  /**
   * Segments the provided text into words using the segmenter for the specified language
   * code.
   *
   * @param {string} text         - The text to be segmented.
   * @param {string} languageCode - A two-letter language code.
   * @returns {string[]} An array of word segments.
   */
  getWords(text, languageCode) {
    const segmenter = this.getSegmenterByLanguageCode(languageCode);

    return Array.from(segmenter.segment(text)).map(WordSegmenter.pickSegment);
  }

  /**
   * Segments the provided text into unique words using the segmenter for the specified
   * language code.
   *
   * @param {string} text         - The text to be segmented.
   * @param {string} languageCode - A two-letter language code.
   * @returns {string[]} An array of unique word segments.
   */
  getUniqueWords(text, languageCode) {
    return Array.from(new Set(this.getWords(text, languageCode)));
  }
}

/**
 * Class responsible for detecting the language of a given text.
 */
class LanguageDetector {
  /**
   * @param {LanguageHelper} helper - An object that assists with language-specific
   *                                operations.
   */
  constructor(helper) {
    this.helper = helper;
  }

  /**
   * @param {string} text
   * @returns {Promise<schemas.Language>}
   */
  async #useCld(text) {
    try {
      const result = await detect(text);

      return languages.findByCode(defined(result.languages[0]).code);
    } catch {
      return languages.UNDETERMINED;
    }
  }

  /**
   * @param {string} text
   * @returns {schemas.Language | null}
   */
  #useEld(text) {
    const result = eld.detect(text);

    if (!result) return null;

    return languages.findByCode(result.language);
  }

  /**
   * Determines if the provided text contains Japanese characters.
   *
   * This method utilizes Kuroshiro's utility function to check if the text includes any
   * Japanese characters such as Hiragana, Katakana, Kanji, etc.
   *
   * @param {string} text - The text to be checked for Japanese characters.
   * @returns {boolean} - `true` if the text contains Japanese characters, `false`
   *                    otherwise.
   */
  isJapanese(text) {
    if (!Kuroshiro.Util.hasHiragana(text) || !Kuroshiro.Util.hasKatakana(text))
      return false;

    return Kuroshiro.Util.isJapanese(text);
  }

  /**
   * Asynchronously detects the language of the provided text.
   *
   * - It first checks if the text is Japanese using a specific method.
   * - If not, it attempts to identify the language using ELD (Efficient Language
   * Detection).
   * - If ELD fails, it falls back to CLD (Compact Language Detector).
   * - If no language can be determined, a warning is logged with the text.
   *
   * Logs are generated to indicate which method successfully detected the language.
   *
   * @param {string} text - The text for which the language needs to be detected.
   * @returns {Promise<schemas.Language>} A promise that resolves to the detected
   *                                      language object.
   */
  async detect(text) {
    if (this.isJapanese(text)) {
      logger.debug("Language detected with Kuroshiro.");
      return languages.findByCode("ja");
    }

    let result = this.#useEld(text);

    if (result) {
      logger.debug("Language detected with ELD.");

      return result;
    }

    result = await this.#useCld(text);
    logger.debug("Language detected with CLD.");

    if (languages.isUndetermined(result)) {
      logger.warn("Unable to determine language.", text);
    }

    return result;
  }
}

/**
 * Helper class for language-specific operations.
 */
class LanguageHelper {
  /**
   * A private static instance variable meant to hold a singleton instance of
   * `LanguageHelper`.
   * It is initialized as null and is intended to be assigned an instance of
   * `LanguageHelper` when required. This ensures that there is only one instance of it
   * throughout the application, following the singleton design pattern.
   *
   * @type {LanguageHelper | null}
   */
  static #instance = null;

  /**
   * Retrieves the singleton instance of the `LanguageHelper` class.
   * If the instance does not exist, it initializes a new one and returns it.
   * This method ensures that there is only one instance of LanguageHelper throughout the
   * application.
   *
   * @returns {Promise<LanguageHelper>} A promise that resolves to the singleton instance
   *                                    of the LanguageHelper class.
   */

  static async getInstance() {
    if (!this.#instance) {
      this.#instance = await new LanguageHelper().#init();
    }

    return this.#instance;
  }

  constructor() {
    /**
     * Japanese language library for converting Japanese sentence to Hiragana, Katakana or
     * Romaji with furigana and okurigana modes supported.
     *
     * @see {@link https://github.com/sglkc/kuroshiro-ts | Repository}
     * @see {@link https://kuroshiro.org/ | Documentation}
     */
    this.kuroshiro = new Kuroshiro();

    /**
     * Transliteration preset for Mongolian language.
     *
     * @see {@link CyrillicTranslit}
     */
    this.cyrillicTranslitMN = createCyrillicTranslit({ preset: "mn" });

    /**
     * Transliteration preset for Russian language.
     *
     * @see {@link CyrillicTranslit}
     */
    this.cyrillicTranslitRU = createCyrillicTranslit({ preset: "ru" });

    /**
     * Transliteration preset for Ukranian language.
     *
     * @see {@link CyrillicTranslit}
     */
    this.cyrillicTranslitUK = createCyrillicTranslit({ preset: "uk" });

    /**
     * Instance of `LanguageDetector` used to determine the language of the given text.
     *
     * @type {LanguageDetector}
     */
    this.detector = new LanguageDetector(this);

    /**
     * Instance of `Transliterator` used to the transliteration of text.
     *
     * @type {Transliterator}
     */
    this.transliterator = new Transliterator(this);

    /**
     * Instance of `WordSegmenter` used for segmenting words in text.
     *
     * @type {WordSegmenter}
     */
    this.wordSegmenter = new WordSegmenter();
  }

  /**
   * @param {schemas.LocalizedText} value
   */
  #validateLocalizedText(value) {
    const validation = schemas.LocalizedTextObjectSchema.safeParse(value);

    if (!validation.success) {
      throw new ValidationErrors(
        "The value received is not a valid text object.",
        validation.error.issues,
      );
    }
  }

  async #init() {
    await this.kuroshiro.init(new KuromojiAnalyzer());

    return this;
  }

  /**
   * Sets the language property of a given text object by detecting the language of its
   * plain text content.
   *
   * @template {TextObject} T
   * @param {T} value - The text object containing the plain text to analyze.
   * @returns {Promise<T>} A promise that resolves to the text object with the language
   *                       property set.
   */
  async setLanguage(value) {
    this.#validateLocalizedText(value);
    value.language = await this.detector.detect(value.plain_text);

    return value;
  }

  /**
   * Sets the rich text property of a given text object by transliterating its plain text.
   * The language code within the text object determines the transliteration rules.
   *
   * @template {TextObject} T
   * @param {T} value - The text object containing the plain text to transliterate and the
   *                  language code.
   * @returns {Promise<T>} - A promise that resolves to the text object with the updated
   *                       rich text property.
   */
  async setRichText(value) {
    this.#validateLocalizedText(value);
    value.rich_text = await this.transliterator.transliterate(
      value.plain_text,
      value.language.code,
    );

    return value;
  }
}

export { LanguageDetector, LanguageHelper, Transliterator, WordSegmenter };

/**
 * @typedef {schemas.LocalizedText | schemas.TranslatableText} TextObject
 */

/* eslint-disable */
/**
 * Configuration options for initializing the Cyrillic transliterator.
 *
 * @typedef CyrillicConfig
 * @property {"ru" | "uk" | "mn"} preset 
 * - `ru`: Russian.
 * - `uk`: Ukrainian.
 * - `mn`: Mongolian.
 */
/* eslint-enable */

/**
 * Callback function for transforming a string input using the Cyrillic transliterator.
 *
 * @typedef {(input: string, spaceReplacement?: string) => string} CyrillicMethod
 */

/**
 * Creates a {@link CyrillicTranslit} object.
 *
 * @callback CyrillicConstructor
 * @param {CyrillicConfig} [config]
 * @returns {CyrillicTranslit}
 */

/**
 * A Cyrillic transliterator object.
 *
 * @typedef CyrillicTranslit
 * @property {CyrillicMethod} transform - Converts Cyrillic symbols to its latin
 *                                      representation.
 * @property {CyrillicMethod} reverse   - Converts latin symbols into Cyrillic.
 */
