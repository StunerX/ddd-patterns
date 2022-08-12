const { resolve } = require('path');
const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  //setupFilesAfterEnv: ['<rootDir>/src/infrastructure/prisma/singleton.ts'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1'
  }
};
