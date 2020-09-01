// This file is created based on @commitlint/config-conventional

module.exports = {
  rules: {
    'body-leading-blank': [2, 'always'],

    'footer-leading-blank': [2, 'always'],

    'header-max-length': [2, 'always', 72],

    'scope-case': [2, 'always', 'lower-case'],

    'subject-empty': [2, 'never'],

    'subject-full-stop': [2, 'never', '.'],

    'type-case': [2, 'always', 'lower-case'],

    'type-empty': [2, 'never'],

    'type-enum': [
      2,
      'always',
      [
        'config',
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ]
  }
};
