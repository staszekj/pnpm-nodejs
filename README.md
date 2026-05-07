# PNPM Monorepo - Node.js

Monorepo managed by pnpm workspace with Node.js projects.

## 📁 Structure

```
/
├── packages/
│   └── astro-sandbox/     # Astro project with Node.js server
├── pnpm-workspace.yaml    # Workspace configuration
├── package.json           # Root package.json
└── .npmrc                 # pnpm configuration
```

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development server:
   ```bash
   pnpm dev
   ```

3. Build all projects:
   ```bash
   pnpm build
   ```

## 📦 Projects in Monorepo

### astro-sandbox
Astro project with Node.js adapter, SSR and sample API endpoints.

## 🔧 Useful pnpm Commands

```bash
# Add dependency to specific project
pnpm --filter astro-sandbox add <package>

# Run script in specific project
pnpm --filter astro-sandbox dev

# Run script in all projects
pnpm -r dev

# Update dependencies
pnpm up -r
```

## 📚 Documentation

- [pnpm workspace](https://pnpm.io/workspaces)
- [Astro](https://docs.astro.build)
