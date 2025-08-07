module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
      globals: {
        chrome: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        window: 'readonly',
        document: 'readonly'
      }
    },
    rules: {
      'semi': 'error',
      'quotes': ['error', 'single'],
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'indent': ['error', 2],
      'comma-dangle': ['error', 'never']
    }
  }
];