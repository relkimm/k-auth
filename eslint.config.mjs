import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Tests deliberately exercise true/false conditional class-name inputs.
  { files: ['src/**/*.test.{ts,tsx}'], rules: { 'no-constant-binary-expression': 'off' } },
);
