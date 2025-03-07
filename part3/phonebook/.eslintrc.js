"use strict";

// This is the internal ESLint config for this project itself – it’s not part of
// the eslint-config-prettier npm package. The idea here is to extend some
// sharable config from npm and then include the configs exposed by this package
// as an “eat your own dogfood” test. That feels like a good test, but
// complicates things a little sometimes.

module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  rules: {
    "prettier/prettier": "off",
    // ...
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
  },
  overrides: [
    {
      files: ["{bin,test,scripts}/**/*.js"],
      rules: {
        "no-undef": "error",
        "no-restricted-syntax": [
          "error",
          {
            selector: "SequenceExpression",
            message:
              "The comma operator is confusing and a common mistake. Don’t use it!",
          },
        ],
        "quotes": [
          "error",
          "double",
          { avoidEscape: true, allowTemplateLiterals: false },
        ],
      },
    },
    {
      files: ["*.test.js"],
      env: { jest: true },
    },
  ],
};
