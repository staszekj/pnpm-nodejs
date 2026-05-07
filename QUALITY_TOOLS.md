# Quality Tools Configuration

Project uses the following tools to ensure code quality:

## 🔍 TypeScript (Strict Mode)

**Configuration**: `tsconfig.json`

Project uses TypeScript in strict mode with additional rigorous options:

- `strict: true` - all strict checks enabled
- `noUncheckedIndexedAccess: true` - enforces index checking
- `noUnusedLocals: true` - error on unused local variables
- `noUnusedParameters: true` - error on unused parameters
- `noImplicitReturns: true` - enforces explicit return in all code paths
- `noFallthroughCasesInSwitch: true` - enforces break in switch cases

### ⚠️ IMPORTANT: Type-checking During Development

**Astro/Vite uses esbuild for transpilation - IT DOES NOT CHECK TYPES in real-time!**

Types are checked only when:
- ✅ You run `pnpm type-check` **manually**
- ✅ You run `pnpm build` (has `astro check &&` before build)
- ✅ IDE/Editor checks types in background (VS Code + TypeScript)

### Run Options

```bash
# Development server (fast, no type-checking in background)
pnpm dev
# or
pnpm start

# One-time type check (run manually when needed)
pnpm type-check

# Continuous type-checking in watch mode (optional - run in separate terminal)
pnpm type-check:watch
```

**Note:** Due to compatibility issues with `astro check --watch`, the dev command no longer includes automatic type-checking. Run `pnpm type-check` or `pnpm type-check:watch` manually when you need to verify types during development.

## 🎨 Prettier

**Configuration**: `.prettierrc`

Default, strict Prettier settings:

- Semicolons: **required**
- Quotes: **single quotes**
- Line width: **100 characters**
- Tab width: **2 spaces**
- Trailing commas: **ES5**
- Arrow functions: **always parentheses**

### Running

```bash
# Check formatting
pnpm format:check

# Fix formatting
pnpm format
```

## ⚡ ESLint (Flat Config)

**Configuration**: `eslint.config.js`

Project uses **ESLint 9.x** with new **flat config** convention.

Enabled rules:

- `eslint:recommended` - base ESLint rules
- `typescript-eslint/strict-type-checked` - strict TypeScript rules with type-checking
- `eslint-plugin-astro/recommended` - rules for Astro files
- `eslint-config-prettier` - disables conflicts with Prettier

### Key Rules

- `@typescript-eslint/no-explicit-any: error` - `any` is forbidden
- `@typescript-eslint/no-unused-vars: error` - error on unused variables (except `_`)
- `@typescript-eslint/no-non-null-assertion: error` - non-null assertions (`!`) forbidden
- `no-console: warn` - warning on console (except warn/error)

### Running

**IMPORTANT:** `pnpm lint` checks **ESLint**, **TypeScript** (`astro check`), and **Prettier** formatting.

```bash
# Check code (ESLint + TypeScript + Prettier formatting)
pnpm lint

# Auto-fix ESLint + format code with Prettier (TypeScript does not auto-fix)
pnpm lint:fix
```

## 🚀 Full Verification

Run all checks before commit:

```bash
# Single command to check everything (ESLint + TypeScript + Prettier)
pnpm lint

# Auto-fix everything possible
pnpm lint:fix

# Full flow: lint → build
pnpm lint && pnpm build

# From root monorepo
cd /workspaces/pnpm-nodejs
pnpm lint && pnpm build
```

**Note:** `pnpm lint` now includes:
- ✅ TypeScript checking (`astro check`) - validates all Astro files and their TypeScript
- ✅ ESLint rules - strict TypeScript linting for .ts files
- ✅ Prettier formatting - formats all source files

**Architecture:** Astro files (.astro) are validated by `astro check` which provides comprehensive TypeScript checking. ESLint applies strict rules to standalone TypeScript files (.ts), ensuring type safety across the codebase.

## 📝 Pre-commit Hook

Project uses **Husky** to automatically run linter before each commit, ensuring code quality.

**What happens on commit:**
```bash
pnpm lint  # Runs: Prettier check + astro check + ESLint
```

If linting fails, the commit will be blocked until you fix the issues. Run `pnpm lint:fix` to automatically fix most problems.

**Hook location:** `.husky/pre-commit`

**To bypass in emergency** (not recommended):
```bash
git commit --no-verify -m "emergency fix"
```

## 📚 Dokumentacja

- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [Prettier](https://prettier.io/docs/en/options.html)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files)
- [typescript-eslint](https://typescript-eslint.io/)
- [eslint-plugin-astro](https://ota-meshi.github.io/eslint-plugin-astro/)
