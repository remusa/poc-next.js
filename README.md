[![CI (assets)](https://github.com/remusa/poc-next.js/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/remusa/poc-next.js/actions/workflows/ci.yml)
[![Lint Commit Messages](https://github.com/remusa/poc-next.js/actions/workflows/commitlint.yml/badge.svg?branch=master)](https://github.com/remusa/poc-next.js/actions/workflows/commitlint.yml)
[![Playwright Tests](https://github.com/remusa/poc-next.js/actions/workflows/playwright.yml/badge.svg?branch=master)](https://github.com/remusa/poc-next.js/actions/workflows/playwright.yml)
[![GitHub Actions Vercel Production Deployment](https://github.com/remusa/poc-next.js/actions/workflows/cd.yml/badge.svg?branch=master)](https://github.com/remusa/poc-next.js/actions/workflows/cd.yml)
[![GitHub Actions Vercel Preview Deployment](https://github.com/remusa/poc-next.js/actions/workflows/cd-preview.yml/badge.svg)](https://github.com/remusa/poc-next.js/actions/workflows/cd-preview.yml)

# Next.js PoC

## How to use

Download or clone the repo.

Install it and run:

```sh
npm install
npm run dev
```

## CI

- Checks that commits respect the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
- Run tests, linting, formatting and security audit.

## Git hooks

- Configured using [lefthook](https://github.com/evilmartians/lefthook).

- Test git hooks locally:

```bash
npx lefthook run pre-commit
npx lefthook run commit-msg
npx lefthook run pre-push
```

## Testing

- Unit tests: Vitest
- Integration tests: Playwright component testing (on Chromium, Firefox and Webkit/Safari).
- [E2E tests](./tests/e2e): Playwright (on Chromium, Firefox and Webkit/Safari).

## Deployment

- Deployment to Vercel via GitHub Actions.
  - Production environment on pushes to `master`.
  - Preview deployments on pushes elsewhere.
