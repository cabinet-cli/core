const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

export default {
    clearMocks: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
    testEnvironment: "node",
    testPathIgnorePatterns: ["\\\\node_modules\\\\", "\\\\dist\\\\"],
    verbose: true,
    setupFiles: ["./setupJest.ts"],
};
