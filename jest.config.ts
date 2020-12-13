export default {
    clearMocks: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "node",
    testPathIgnorePatterns: ["\\\\node_modules\\\\", "\\\\dist\\\\"],
    verbose: true,
    setupFiles: ["./setupJest.ts"],
};
