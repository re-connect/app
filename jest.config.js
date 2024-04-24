module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!src/services/.tsx',
    '!src/components/**',
    '!src/constants.ts',
    '!src/context/**',
    '!src/pages/**',
    '!src/routing/Router.tsx',
    '!App.tsx',
  ],
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native)'],
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 15,
      functions: 15,
      lines: 15,
    },
  },
  setupFiles: ['./jestSetupFile.js'],
};
