# Copilot Instructions

This repository follows strict coding standards and development practices.

## Project Structure

- **Monorepo**: pnpm workspace with multiple packages
- **Main Project**: `packages/astro-sandbox` - Astro 4.5 SSR application with Node.js adapter
- **Framework**: Astro with TypeScript (strict mode)

## Language Requirements

**IMPORTANT**: All code, comments, documentation, and commit messages MUST be in **English only**.
- ❌ No Polish language in code
- ❌ No other languages except English
- ✅ Use clear, descriptive English names for variables, functions, and types

## Code Quality Standards

### TypeScript
- **Strict mode enabled** with additional rigorous checks:
  - `noUncheckedIndexedAccess: true`
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noImplicitReturns: true`
  - `noFallthroughCasesInSwitch: true`
- Always provide explicit types for function parameters and return values
- Avoid using `any` - use proper types or `unknown`
- No non-null assertions (`!`) - use proper null checks

### ESLint
- **Flat config** (ESLint 9.x) with `typescript-eslint` strict rules
- Applied only to `.ts` files (Astro files validated by `astro check`)
- Console statements: only `console.warn` and `console.error` allowed

### Prettier
- **Single quotes** for strings
- **Semicolons required**
- **2 spaces** indentation
- All files must be formatted before commit

## Development Workflow

### Quality Checks
Always run before committing:
```bash
pnpm lint          # Check: Prettier + TypeScript + ESLint
pnpm lint:fix      # Auto-fix issues
```

**Order of checks**:
1. Prettier (formatting)
2. TypeScript (`astro check`)
3. ESLint

### Pre-commit Hook
- **Husky** automatically runs `pnpm lint` before each commit
- If checks fail, commit is blocked
- To bypass (emergency only): `git commit --no-verify`

### Commands
```bash
pnpm dev                 # Start dev server
pnpm build              # Build for production
pnpm type-check         # Run TypeScript check manually
pnpm type-check:watch   # Watch mode for type checking
```

## Astro-Specific Guidelines

### Routing Examples
Project includes comprehensive routing demonstrations:
- Dynamic routes with rest parameters
- API endpoints (CRUD operations)
- Middleware with authentication
- View transitions with animations
- Pagination
- Rewrites

### Middleware
- Type `Astro.locals` in `src/env.d.ts`
- Use `console.warn` for logging (not `console.log`)
- Provide proper TypeScript types for all middleware data

### API Routes
- Return proper HTTP status codes
- Use `Response` with JSON and proper headers
- Handle errors gracefully with appropriate status codes
- No non-null assertions - check for undefined values

## File Organization

```
packages/astro-sandbox/
├── src/
│   ├── pages/          # Routes (file-based routing)
│   ├── layouts/        # Layout components
│   ├── middleware.ts   # Global middleware
│   └── env.d.ts        # Type definitions
├── astro.config.mjs    # Astro configuration
├── tsconfig.json       # TypeScript configuration
├── eslint.config.js    # ESLint flat config
└── package.json        # Scripts and dependencies
```

## Testing Changes

Before submitting code:
1. Run `pnpm lint` - must pass with 0 errors
2. Test in browser - verify functionality works
3. Check TypeScript types - no `any` or type errors
4. Ensure proper error handling

## Dependencies

- Use exact versions for critical packages
- Add new dependencies at package level, not workspace root (unless shared)
- Update dependencies carefully with testing

## Documentation

- Keep `QUALITY_TOOLS.md` updated with development practices
- Update `README.md` for structural changes
- Document complex logic with clear comments
- Keep this file updated with new coding standards

## Common Patterns

### API Endpoints
```typescript
export const GET: APIRoute = async ({ params, locals }) => {
  const id = params.id;
  
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // ... logic
};
```

### Middleware
```typescript
export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.requestId = crypto.randomUUID();
  
  const response = await next();
  
  response.headers.set('X-Request-ID', context.locals.requestId);
  
  return response;
});
```

## Remember

✅ **DO**:
- Write in English
- Use strict TypeScript
- Format with Prettier
- Check with ESLint
- Test thoroughly
- Handle errors properly

❌ **DON'T**:
- Use Polish or other languages
- Use `any` type
- Skip type checking
- Commit without running `pnpm lint`
- Use `console.log` (use `console.warn` or `console.error`)
- Use non-null assertions
