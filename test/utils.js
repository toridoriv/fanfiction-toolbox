export { fakerEN_US, fakerES_MX, fakerRU } from "@faker-js/faker";
import { Faker, fakerEN, fakerES, fakerRU, ja } from "@faker-js/faker";

import { findByCode } from "../lib/localization/languages.js";

const japaneseColors = {
  /**
   * Reading: `くろ`.
   */
  black: "黒",
  /**
   * Reading: `きんいろ`.
   */
  gold: "金色",
  /**
   * Reading: `あか`.
   */
  red: "赤",
  /**
   * Reading: `だいだいいろ`.
   */
  orange: "橙色",
  /**
   * Reading: `きいろ`.
   */
  yellow: "黄色",
  /**
   * Reading: `みどり`.
   */
  green: "緑",
  /**
   * Reading: `むらさき`.
   */
  purple: "紫",
};

const fakerJA = new Faker({
  locale: {
    ...ja,
    color: {
      human: Object.values(japaneseColors),
    },
  },
});

const LanguageRandomizers = [
  {
    language: findByCode("en"),
    faker: fakerEN,
  },
  {
    language: findByCode("es"),
    faker: fakerES,
  },
  {
    language: findByCode("ja"),
    faker: fakerJA,
  },
  {
    language: findByCode("ru"),
    faker: fakerRU,
  },
];

export { LanguageRandomizers };
