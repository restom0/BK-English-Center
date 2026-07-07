import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        $: 'readonly',
        jQuery: 'readonly',
        Swal: 'readonly',
        API_URL: 'readonly',
        apiRequest: 'readonly',
        authHeader: 'readonly',
        getToken: 'readonly',
        Toast: 'writable',
        i18n: 'readonly',
        BkCurrency: 'readonly',
        BkDate: 'readonly',
        ThemeManager: 'readonly',
        Skeleton: 'readonly',
        initGoogleLogin: 'readonly',
        google: 'readonly',
        bootstrap: 'readonly',
        flowbite: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'no-var': 'warn',
      'prefer-const': 'warn',
      'prefer-template': 'warn',
    },
    ignores: ['node_modules/**', 'styles/main.css', '*.min.js'],
  },
];
