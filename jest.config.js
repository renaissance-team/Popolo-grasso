module.exports = {
  roots: ['<rootDir>/packages/client/src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/__tests__/.*\\.test.(ts|tsx)$',
  modulePaths: [],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/packages/clientsrc/$1',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/packages/client/src/jest-setup.ts'],
  collectCoverageFrom: ['packages/client/src/**/*.{ts,tsx}'],
};
