module.exports = {
  root: false,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'indent': ["off", 2],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
     // allow paren-less arrow functions
     'arrow-parens': 0,
     // allow async-await
     'generator-star-spacing': 0,
  }
}
