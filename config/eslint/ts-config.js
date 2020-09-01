module.exports = {
  extends: [
    'airbnb-typescript',
    'plugin:import/typescript',
    './base-config',
    './rules/typescript.rules',
    'prettier',
    'prettier/@typescript-eslint',
  ],

  plugins: ['@typescript-eslint'],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './tsconfig.json',
  },
};
