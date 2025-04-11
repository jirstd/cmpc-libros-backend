import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.ts',
    // ❌ Exclusiones específicas
    '!src/main.ts',
    '!src/app.module.ts',
    '!src/**/dto/**',
    '!src/database/**',
    '!src/common/**',
    '!src/config/**',
    '!src/**/*.module.ts',
    '!src/**/*.guard.ts',
    '!src/**/*.strategy.ts',
    '!src/**/*.decorator.ts',
    '!src/**/*.spec.ts',
  ],
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};

export default config;
