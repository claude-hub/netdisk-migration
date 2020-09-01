/*
  This file includes typescript rules for eslint
*/

module.exports = {
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
  },
};
