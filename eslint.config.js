import { eslintConfig } from "@toridoriv/eslint-config";

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  ...eslintConfig.ignorePatterns,
  ...eslintConfig.javascript.node,
  ...eslintConfig.typescript,
  ...eslintConfig.jsdoc,
  ...eslintConfig.json,
  ...eslintConfig.markdown,
  ...eslintConfig.prettier,
  {
    rules: {
      "jsdoc/informative-docs": ["warn", { excludedTags: ["default"] }],
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern:
            "^KeyOf$|^Language$|^Input$|^Output$|^Expand$|^First$|^AnyArray$|^Length$",
        },
      ],
    },
  },
];
