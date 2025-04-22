import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/__tests__/**",
    "!**/_app.{js,jsx,ts,tsx}",
    "!**/_document.{js,jsx,ts,tsx}",
    "!**/index.{js,jsx,ts,tsx}",
    "!**/types/**",
    "!**/styles/**",
    "!**/coverage/**",
    "!jest.config.ts",
    "!jest.setup.ts",
    "!next-env.d.ts",
    "!next.config.ts",
    "!app/layout.tsx",
  ],
  coverageReporters: ["text", "lcov", "clover", "json"],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default createJestConfig(config);
