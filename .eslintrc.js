module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'global-require': 0,
    indent: ['error', 2],
    'no-console': 'off',
  },
};
