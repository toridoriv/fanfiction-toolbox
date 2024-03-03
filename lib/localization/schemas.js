import { z } from "zod";

// eslint-disable-next-line no-unused-vars
import { Input, Output } from "../common/index.js";
import * as languages from "./languages.js";

/**
 * Schema that defines the rules for an ISO 639-1 language code.
 */
const LanguageCodeSchema = z.string().min(2).max(2);

/**
 * Schema that defines the rules for a language name in English.
 */
const LanguageNameSchema = z.string().min(3);

/**
 * Schema that defines the rules for an object with details of a given language.
 */
const LanguageObjectSchema = z.object({
  /**
   * ISO 639-1 language code.
   */
  code: LanguageCodeSchema,
  /**
   * Full English name of the language.
   */
  name: LanguageNameSchema,
  /**
   * Name of the language in its native tongue.
   */
  nativeName: z.string(),
  /**
   * Text direction, 'LTR' or 'RTL'
   */
  direction: z.string().min(3).max(3),
});

/**
 * An object that contains details about a given human language.
 *
 * @typedef {Output<typeof LanguageObjectSchema>}
 */
var Language;

/**
 * Define the rules for creating an object with details for a human language.
 *
 * If the input it's a language code or a name it will be transform to create a valid
 * {@link Language} object.
 */
const LanguageSchema = z.union([
  LanguageCodeSchema.transform(languages.findByCode),
  LanguageNameSchema.transform(languages.findByName),
  LanguageObjectSchema,
]);

/**
 * An object that contains details about a given human language.
 *
 * @typedef {Input<typeof LanguageSchema>}
 */
var LanguageInput;

/**
 * Schema that defines the rules for a localized text object.
 */
const LocalizedTextSchema = z.object({
  /**
   * The essential, plain text content of the localized text object. It must have at least
   * one character.
   */
  plain_text: z.string().min(1).trim(),
  /**
   * An optional field for formatted, "rich" text (e.g., containing HTML markup for bold,
   * italics, etc.).
   *
   * @default ''
   */
  rich_text: z.string().default(""),
  /**
   * Represents the language of the text content.
   *
   * @default languages.UNDETERMINED
   */
  language: LanguageSchema.default(languages.UNDETERMINED),
});

/**
 * Represents a localized text object.
 *
 * @typedef {Output<typeof LocalizedTextSchema>}
 */
var LocalizedText;

/**
 * Represents the data types accepted when parsing a value with {@link LocalizedTextSchema}.
 *
 * @typedef {Input<typeof LocalizedTextSchema>}
 */
var LocalizedTextInput;

/**
 * Schema that defines the rules for a translatable text object with multiple localized
 * versions.
 */
const TranslatableTextSchema = LocalizedTextSchema.extend({
  /**
   * An array of {@link LocalizedTextSchema} objects representing translations for this text in different languages.
   */
  translations: z.array(LocalizedTextSchema).default([]),
});

/**
 * Represents a localized text object that can be translated to multiple locales.
 *
 * @typedef {Output<typeof TranslatableTextSchema>}
 */
var TranslatableText;

/**
 * Represents the data types accepted when parsing a value with {@link TranslatableTextSchema}.
 *
 * @typedef {Input<typeof TranslatableTextSchema>}
 */
var TranslatableTextInput;

export {
  Language,
  LanguageInput,
  LanguageSchema,
  LocalizedText,
  LocalizedTextInput,
  LocalizedTextSchema,
  TranslatableText,
  TranslatableTextInput,
  TranslatableTextSchema,
};
