module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier',
    'stylelint-config-recommended-vue',
    'stylelint-config-html'
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'scss/double-slash-comment-empty-line-before': 'never',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'color-function-notation': 'legacy',
    'alpha-value-notation': null,
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': [
      'position',
      'top',
      'bottom',
      'right',
      'left',
      'display',
      'align-items',
      'justify-content',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'z-index',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ],
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested']
      }
    ]
  },
  overrides: [
    {
      files: ['*.html', '**/*.html'],
      customSyntax: 'postcss-html'
    }
  ],
  ignoreFiles: [
    './node_modules/**/*.{css,scss,sass}',
    './dist/**/*.{css,scss,sass}',
    '**/*.js',
    '**/*.md'
  ]
}
