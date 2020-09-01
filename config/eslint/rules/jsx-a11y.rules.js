/*
  This file includes jsx-a11y(accessibility) rules for eslint
*/

module.exports = {
  rules: {
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/no-noninteractive-tabindex": "off",
    "jsx-a11y/no-access-key": "off",
    "jsx-a11y/media-has-caption": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/label-has-for": [
      2,
      {
        components: ["Label"],
        required: {
          every: ["nesting", "id"],
        },
        allowChildren: true,
      },
    ],
  },
};
