import { describe, it } from "node:test";

import { faker } from "@faker-js/faker";
import { expect } from "chai";

import * as languages from "../../../lib/localization/languages.js";

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

describe("The function isUndetermined", () => {
  it("returns true if the received object matches UNDETERMINED language object", () => {
    const result = languages.isUndetermined({
      name: languages.UNDETERMINED.name,
      code: languages.UNDETERMINED.code,
      nativeName: languages.UNDETERMINED.nativeName,
      direction: languages.UNDETERMINED.direction,
    });

    expect(result).to.be.true;
  });

  it("returns false otherwise", () => {
    const sample = faker.helpers.arrayElements(languages.LANGUAGES, 10);

    for (const item of sample) {
      const result = languages.isUndetermined(item);

      expect(result).to.be.false;
    }
  });
});
