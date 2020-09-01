// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  verbose: true,

  roots: ['<rootDir>/../../src'],

  coverageDirectory: 'coverage',

  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },

  moduleNameMapper: {
    '.+\\.(css|styl|sass|scss)$': 'identity-obj-proxy',
    '^actions(.*)$': '<rootDir>/../../src/actions$1',
    '^components(.*)$': '<rootDir>/../../src/components$1',
    '^constants(.*)$': '<rootDir>/../../src/constants$1',
    '^hoc(.*)$': '<rootDir>/../../src/hoc$1',
    '^hooks(.*)$': '<rootDir>/../../src/hooks$1',
    '^libs(.*)$': '<rootDir>/../../src/libs$1',
    '^middlewares(.*)$': '<rootDir>/../../src/middlewares$1',
    '^reducers(.*)$': '<rootDir>/../../src/reducers$1',
    '^selectors(.*)$': '<rootDir>/../../src/selectors$1',
    '^utils(.*)$': '<rootDir>/../../src/utils$1',
    '^typings(.*)$': '<rootDir>/../../src/typings$1',
    '^features(.*)$': '<rootDir>/../../src/features$1',
    '^store(.*)$': '<rootDir>/../../src/store$1',
  },

  setupFiles: ['./setupTests.js'],

  moduleFileExtensions: ['ts', 'tsx', 'js'],

  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
