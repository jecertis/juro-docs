# Juro Documentation

> Documentation site for the Juro compliance platform. Hosted at [docs.jurocompliant.com](https://docs.jurocompliant.com).

Non-custodial compliance scanning for GDPR, DORA, and India's DPDP Act. This repository is a Docusaurus 3 site containing guides, API reference, and integration docs for all Juro products.

- **Part of:** [`juro-workspace`](../) — see [VISION.md](../VISION.md), [AXIOMS.md](../AXIOMS.md), [PRINCIPLES.md](../PRINCIPLES.md).
- **Domain:** `docs.jurocompliant.com`.
- **Stack:** Docusaurus 3 + React, static build, Algolia search.
- **Naming standard:** [`juro-platform/contracts/nomenclature.md`](../juro-platform/contracts/nomenclature.md).

## Develop

```bash
npm ci
npm start              # local dev server (default: http://localhost:3000)
npm run build          # static build → ./build
npm run serve          # serve the built site locally
npm run quality:all    # spelling, links, prose checks
```

## Structure

What's documented here (or planned):

- **Getting started** — install the CLI, run your first scan
- **CLI reference** — `juro` command surface
- **MCP integration** — connect AI agents via [`juro-mcp-server`](../juro-mcp-server)
- **Regulations** — GDPR, DORA, DPDP rule packs
- **Self-hosting** — run the scanner and cloud API in your own infrastructure
- **CI/CD** — GitHub Actions, pre-commit hooks
- **Architecture** — how the scanner, triage, and transparency log fit together

## Contributing

- Docs changes follow the same alignment rules as product copy. See [AXIOMS.md](../AXIOMS.md) and [VISION.md](../VISION.md) before adding new claims.
- Quality checks (`npm run quality:all`) must pass before merging.
- Functionality contribution guide: `HOW_TO_CONTRIBUTE_FUNCTIONALITIES.md`.

## Related

- [`juro/`](../juro) — core engine, CLI, and cloud API
- [`juro-mcp-server/`](../juro-mcp-server) — MCP protocol server for AI agents
- [`juro-web/`](../juro-web) — public web frontend
- [`juro-platform/`](../juro-platform) — control plane, contracts, runbooks

## License

See [LICENSE](./LICENSE).
