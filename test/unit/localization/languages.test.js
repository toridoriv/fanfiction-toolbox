import { describe, it } from "node:test";

import { expect } from "chai";

import * as languages from "../../../lib/localization/languages.js";
import { LanguageRandomizers } from "../../utils.js";

describe("The function findByCode", () => {
  it("returns a language object by its code if it exists", () => {
    const english = languages.findByCode("en");

    expect(english)
      .to.be.an("object")
      .with.keys("code", "name", "nativeName", "direction");
    expect(english.code).to.equal("en");
  });

  it("returns the UNDETERMINED language object if it doesn't", () => {
    const undetermined = languages.findByCode("sh");

    expect(undetermined)
      .to.be.an("object")
      .with.keys("code", "name", "nativeName", "direction");
    expect(undetermined.code).to.equal("xx");
  });
});

describe("The function findByName", () => {
  it("returns a language object by its name if it exists", () => {
    const english = languages.findByName("English");

    expect(english)
      .to.be.an("object")
      .with.keys("code", "name", "nativeName", "direction");
    expect(english.code).to.equal("en");
  });

  it("returns the UNDETERMINED language object if it doesn't", () => {
    const undetermined = languages.findByName("Nothing");

    expect(undetermined)
      .to.be.an("object")
      .with.keys("code", "name", "nativeName", "direction");
    expect(undetermined.code).to.equal("xx");
  });
});

describe("The function detect", () => {
  for (const { language, faker } of LanguageRandomizers) {
    it(`identifies a word in ${language.name}`, async () => {
      const color = faker.color.human();
      const detected = await languages.detect(color);

      expect(detected.code).to.equal(language.code, `failed for color ${color}`);
    });
  }
  // LanguageRandomizers.forEach(({ language, faker }) => {
  //   it(`identifies a word in ${language.name}`, () => {
  //     const color = faker.color.human();
  //     const detected = languages.detect(color);

  //     expect(detected.code).to.equal(language.code, `failed for color ${color}`);
  //   });
});
// it("identifies words in English", () => {
//   const color = fakerEN_US.color.human();
//   const language = languages.detect(color);
//   expect(language.code).to.equal("en");
// });
// it("identifies words in Spanish", () => {
//   const color = fakerES_MX.color.human();
//   const language = languages.detect(color);
//   expect(language.code).to.equal("es");
// });
// it("identifies words in Japanese", () => {
//   const color = fakerJA.color.human();
//   const language = languages.detect(color);
//   expect(language.code).to.equal("ja");
// });
// it("identifies words in Russian", () => {
//   const color = fakerRU.color.human();
//   const language = languages.detect(color);
//   expect(language.code).to.equal("ru", "Expected ");
// });
