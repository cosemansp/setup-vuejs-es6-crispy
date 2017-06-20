// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'html',
    'flowtype-errors',
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      },
    }
  },
  // add your custom rules here
  'rules': {
    // add flowtype checks
    // 'flowtype-errors/show-errors': 2,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}

