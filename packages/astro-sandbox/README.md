# Astro Sandbox

Astro project running on Node.js server in a pnpm monorepo architecture.

## 🚀 Project Structure

```
/
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       └── api/
│           └── hello.ts
├── package.json
└── astro.config.mjs
```

## 🧞 Commands

All commands are run from the root of the monorepo:

| Command        | Action                                  |
| :------------- | :-------------------------------------- |
| `pnpm install` | Installs dependencies                   |
| `pnpm dev`     | Starts local dev server                 |
| `pnpm build`   | Build your production site to `./dist/` |
| `pnpm preview` | Preview your build locally              |

Or from the `packages/astro-sandbox` directory:

| Command        | Action                  |
| :------------- | :---------------------- |
| `pnpm dev`     | Starts local dev server |
| `pnpm build`   | Build production site   |
| `pnpm preview` | Preview build           |

## 📡 API Endpoints

- `GET /api/hello` - Sample endpoint returning server information
- `POST /api/hello` - Endpoint accepting JSON data

## ⚙️ Configuration

Project uses:

- **Adapter**: `@astrojs/node` in standalone mode
- **Output**: Server-side rendering (SSR)
- **Port**: 4321
- **Host**: 0.0.0.0 (accessible from outside)

## 📚 More Information

- [Astro Documentation](https://docs.astro.build)
- [Node.js Adapter](https://docs.astro.build/en/guides/integrations-guide/node/)
