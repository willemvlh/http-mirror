module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      diagnostics: false
    }
  },
  coverageReporters: ["text", "lcov"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/*", "!src/index.ts"]
};
