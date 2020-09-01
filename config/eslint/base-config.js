module.exports = {
  plugins: ['react', 'react-hooks'],

  extends: [
    './rules/best-practice.rules',
    './rules/import.rules',
    './rules/jsx-a11y.rules',
    './rules/react.rules',
  ].map(path => require.resolve(path)),

  globals: {
    expectObservable: true,
    hot: true,
    cold: true,
    __DEV__: false,
    DEVELOPMENT_MODE: true,
  },

  env: {
    browser: true,
    node: true,
    es6: true,
    jasmine: true,
    jest: true,
  },
};
