import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // Basic JS rules for all files
  js.configs.recommended,

  // TypeScript strict rules only for .ts and .tsx files (but not Astro extracted files)
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ['src/**/*.ts', 'src/**/*.tsx', '*.ts', '*.tsx'],
    ignores: ['**/*.astro/**'],
  })),
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', '*.ts', '*.tsx'],
    ignores: ['**/*.astro/**'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Astro plugin configs (basic rules, no type checking)
  // Note: Astro files are validated by 'astro check', so we skip ESLint for them
  // ...eslintPluginAstro.configs.recommended,

  // Prettier config (must be last)
  eslintConfigPrettier,

  // Global ignores
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.astro/',
      '*.min.js',
      'coverage/',
      'pnpm-lock.yaml',
      'package-lock.json',
      'src/env.d.ts',
      '**/*.astro', // Validated by astro check
    ],
  },
];
