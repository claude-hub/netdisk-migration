/*
  This file includes react rules for eslint
*/

module.exports = {
  rules: {
    'react/jsx-boolean-value': ['off'],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-foreign-prop-types': 'off',
    'react/sort-comp': 'off',
    'react/prefer-es6-class': ['error', 'always'],
    'react/button-has-type': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
  },
};
