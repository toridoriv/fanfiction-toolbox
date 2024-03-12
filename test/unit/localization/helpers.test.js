import assert from "node:assert";
import { describe, it } from "node:test";

import { expect } from "chai";

import { LanguageHelper } from "../../../lib/localization/helpers.js";
import { LocalizedTextSchema } from "../../../lib/localization/schemas.js";
import { LanguageRandomizers } from "../../utils.js";

const languageHelper = await LanguageHelper.getInstance();

describe("The method LanguageHelper.prototype.setLanguage", () => {
  for (const { faker, language, sentences } of LanguageRandomizers) {
    it(`[${language.name}] sets the language property based on detected language`, async () => {
      const text = LocalizedTextSchema.parse(faker.helpers.arrayElement(sentences));

      await languageHelper.setLanguage(text);

      expect(text.language).to.deep.equal(language);
    });
  }

  it("throws error if input is invalid", async () => {
    await assert.rejects(
      // @ts-expect-error
      languageHelper.setLanguage.bind(languageHelper, ""),
      Error,
      "The value received is not a valid text object.",
    );
  });
});
