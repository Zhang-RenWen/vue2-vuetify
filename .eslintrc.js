module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
    vueFeatures: { interpolationAsNonHTML: true }
  },
  plugins: ['prettier'],
  overrides: [
    {
      files: ['*.html'],
      rules: { 'vue/comment-directive': 'off' }
    }
  ],
  rules: {
    'global-require': 0,
    'object-shorthand': ['error', 'always', { avoidExplicitReturnArrows: true }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-properties': [
      'warn',
      {
        groups: ['props', 'data', 'computed', 'methods', 'setup']
      }
    ],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-restricted-syntax': 'off',
    'vue/new-line-between-multi-line-property': 'error',
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-potential-component-option-typo': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/v-for-delimiter-style': ['error', 'of'],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
