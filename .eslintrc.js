module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'arrow-parens': 0,
    'space-before-function-paren': 0,
    'vue/max-attributes-per-line': 0,
    ' vue/singleline-html-element-content-newline': 0
  }
}
