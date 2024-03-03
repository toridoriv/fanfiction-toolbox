import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

import { Config } from "./config.js";

const genAi = new GoogleGenerativeAI(Config.GEMINI_API_KEY);

/**
 * Generative model for deterministic results.
 */
const Gemini = genAi.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: {
    /**
     * Number of generated responses to return.
     */
    candidateCount: 1,
    /**
     * Controls the degree of randomness in token selection. Lower temperatures are good
     * for prompts that require a more deterministic and less open-ended or creative
     * response, while higher temperatures can lead to more diverse or creative results. A
     * temperature of 0 is deterministic: the highest probability response is always
     * selected.
     */
    temperature: 0,
  },
});

/**
 * Generative model for creative and diverse results.
 */
const CreativeGemini = genAi.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: {
    /**
     * Number of generated responses to return.
     */
    candidateCount: 1,
    /**
     * Controls the degree of randomness in token selection. Lower temperatures are good
     * for prompts that require a more deterministic and less open-ended or creative
     * response, while higher temperatures can lead to more diverse or creative results. A
     * temperature of 0 is deterministic: the highest probability response is always
     * selected.
     */
    temperature: 1,
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
});

export { CreativeGemini, Gemini };
