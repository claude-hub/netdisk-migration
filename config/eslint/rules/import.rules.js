/*
  This file includes import rules for eslint
*/

module.exports = {
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/order': 'off',
    'import/no-named-as-default': 'off',
  },
};
