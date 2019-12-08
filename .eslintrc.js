module.exports = {
  extends: ['airbnb-base', 'plugin:react/recommended'],
  plugins: [
    'react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'func-names': 0,
    'no-unused-expressions': 0,
    'no-constant-condition': 0,
    'wrap-iife': 0,
    'vars-on-top': 0,
    'new-cap': 0,
    'global-require': 0,
    // allow to use meta-component Base
    'react/jsx-no-undef': [2, { allowGlobals: true }],
  },
  globals: {
    Base: true,
  },
  env: {
    mocha: true,
  },
};
