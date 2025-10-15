// ESLint flat config for TypeScript + Prettier
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // Ignored paths
  { ignores: ['dist/**', 'node_modules/**'] },

  // TypeScript files
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked, prettier],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Enable project-aware rules without specifying a path to tsconfig
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },

  // JavaScript files (if any appear later)
  {
    files: ['**/*.{js,cjs,mjs}'],
    extends: [js.configs.recommended, prettier],
  }
);
