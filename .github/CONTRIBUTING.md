# Contributing to pnpm-nodejs

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Code of Conduct

- Be respectful and professional
- Write clear, maintainable code
- Follow project coding standards
- Test your changes thoroughly

## Language Requirements

⚠️ **IMPORTANT**: All contributions must be in **English only**:
- Code (variables, functions, classes, types)
- Comments and documentation
- Commit messages
- Pull request descriptions
- Issue descriptions

## Getting Started

### Prerequisites

- Node.js >= 18.14.1
- pnpm >= 8.0.0

### Setup

```bash
# Clone the repository
git clone git@github.com:staszekj/pnpm-nodejs.git
cd pnpm-nodejs

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes

- Follow TypeScript strict mode guidelines
- Use ESLint and Prettier (configured automatically)
- Write clear, descriptive commit messages
- Test your changes

### 3. Quality Checks

Before committing, ensure your code passes all checks:

```bash
# Run all quality checks
pnpm lint

# Auto-fix issues (when possible)
pnpm lint:fix

# Check types separately
pnpm type-check
```

**Pre-commit hook** runs automatically and will block commits if checks fail.

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: Add new feature description"
```

#### Commit Message Format

Follow conventional commits:

```
type(scope): description

[optional body]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat: Add pagination to blog posts
fix: Resolve TypeScript error in middleware
docs: Update README with new commands
refactor: Simplify API error handling
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## Coding Standards

### TypeScript

- **Strict mode** with additional checks enabled
- Always provide explicit types for:
  - Function parameters
  - Function return values
  - Complex object structures
- Avoid `any` - use proper types or `unknown`
- No non-null assertions (`!`) - use proper null checks

**Example**:
```typescript
// ✅ Good
function processUser(user: User): ProcessedUser {
  const name = user.name;
  if (!name) {
    throw new Error('Name is required');
  }
  return { processedName: name.toUpperCase() };
}

// ❌ Bad
function processUser(user: any) {
  return { processedName: user.name!.toUpperCase() };
}
```

### ESLint

- Follow configured rules strictly
- Use `console.warn` or `console.error` (not `console.log`)
- No unused variables or imports
- Proper error handling

### Prettier

- Configured automatically
- Single quotes for strings
- Semicolons required
- 2-space indentation
- Run `pnpm lint:fix` to format

### File Naming

- Use kebab-case: `my-component.astro`, `user-service.ts`
- API routes: `[id].ts`, `[...slug].astro`
- Types/interfaces: PascalCase in code

### Code Organization

```typescript
// 1. Imports (grouped: external, then internal)
import { defineMiddleware } from 'astro:middleware';
import type { APIRoute } from 'astro';

import { validateUser } from '../utils/validation';

// 2. Type definitions
interface UserData {
  id: string;
  name: string;
}

// 3. Constants
const MAX_RETRIES = 3;

// 4. Main logic
export const GET: APIRoute = async ({ params }) => {
  // Implementation
};
```

## Testing Your Changes

### Manual Testing

1. Start dev server: `pnpm dev`
2. Test affected routes in browser
3. Check console for errors
4. Verify TypeScript types: `pnpm type-check`

### Quality Checks

```bash
# Full check (run this before PR)
pnpm lint

# Individual checks
pnpm type-check        # TypeScript
pnpm --filter=astro-sandbox eslint .  # ESLint
pnpm format:check      # Prettier
```

## Pull Request Guidelines

### Before Submitting

- [ ] Code passes `pnpm lint`
- [ ] Changes tested in browser
- [ ] No TypeScript errors
- [ ] Commit messages follow format
- [ ] Documentation updated (if needed)
- [ ] All code and comments in English

### PR Description

Include:
1. **What**: Brief description of changes
2. **Why**: Reason for the change
3. **How**: Technical approach (if complex)
4. **Testing**: How you tested it

**Example**:
```markdown
## What
Add user authentication middleware

## Why
Need to protect admin routes from unauthorized access

## How
- Created middleware in src/middleware.ts
- Added user type to Astro.locals
- Implemented role-based access control

## Testing
- Tested admin route with guest user (blocked)
- Tested admin route with admin user (allowed)
- Verified TypeScript types
```

## Project Structure

```
pnpm-nodejs/
├── .github/
│   ├── copilot-instructions.md  # Copilot guidelines
│   └── CONTRIBUTING.md          # This file
├── .husky/
│   └── pre-commit               # Pre-commit hook
├── packages/
│   └── astro-sandbox/           # Main Astro project
│       ├── src/
│       │   ├── pages/           # Route files
│       │   ├── layouts/         # Layout components
│       │   └── middleware.ts    # Middleware
│       ├── astro.config.mjs
│       ├── tsconfig.json
│       ├── eslint.config.js
│       └── package.json
├── package.json                 # Workspace root
├── pnpm-workspace.yaml
└── QUALITY_TOOLS.md            # Development documentation
```

## Common Issues

### Pre-commit Hook Fails

```bash
# Run checks manually
pnpm lint

# Auto-fix what's possible
pnpm lint:fix

# If you need to bypass (emergency only)
git commit --no-verify
```

### TypeScript Errors

```bash
# Check types
pnpm type-check

# Watch mode for continuous checking
pnpm type-check:watch
```

### Prettier Formatting

```bash
# Check formatting
pnpm format:check

# Auto-format all files
pnpm format
```

## Questions?

- Check `QUALITY_TOOLS.md` for detailed development practices
- Check `.github/copilot-instructions.md` for coding guidelines
- Open an issue for questions or clarifications

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🎉
