---
id: cli-tools
title: CLI Tools Integration
sidebar_label: CLI Tools
---

# CLI Tools Integration

Learn how to use Juro's command-line interface for local development and automation.

## Installation

Build from the **juro** repository:

```bash
git clone https://github.com/your-org/juro.git
cd juro
npm install
npm run build
```

Then run the CLI from repo root:
`node packages/cli/dist/cli.js` (or link `juro` to your PATH).

## Basic Usage

### Scan a Directory

```bash
# Default: scan ./examples
node packages/cli/dist/cli.js scan

# Scan your project
node packages/cli/dist/cli.js scan ./my-project

# Regulations: -r DPDP, GDPR, DORA (comma-separated)
node packages/cli/dist/cli.js scan ./src -r DPDP
```

### Scan a Live Website

```bash
# Fetch URL and scan HTML/JS/CSS
node packages/cli/dist/cli.js scan --url https://example.com -r DPDP -o table
```

### Output Formats and Reports

```bash
# Output: -o table | json | markdown | html | dashboard
node packages/cli/dist/cli.js scan ./src -o table
node packages/cli/dist/cli.js scan ./src -o json -f report.json

# HTML report (save and open in browser)
node packages/cli/dist/cli.js scan ./src -r DPDP -o html -f report.html --open
```

## DPDP LLM Options (Optional)

Require **Ollama** with **mistral-regtech** at `http://localhost:11434` (or set `JURO_VERIFY_ENDPOINT`).

| Option | Description |
|--------|-------------|
| `--verify` | Run verification layer: CONFIRMED_FAIL / INCONCLUSIVE (LLM never gives PASS). |
| `--verify-max <n>` | Max findings to send to LLM (default 30). |
| `--verify-endpoint <url>` | LLM endpoint (default http://localhost:11434). |
| `--llm-filter-fp` | Remove likely false positives from the report. |
| `--llm-filter-fp-max <n>` | Max violations to check for false positive (default 25). |
| `--dpdp-assist` | When scanning a URL with DPDP, suggest privacy/terms links to fetch. |

```bash
# Verify up to 10 findings
node packages/cli/dist/cli.js scan ./examples -r DPDP --verify --verify-max 10 -o table

# Reduce false positives
node packages/cli/dist/cli.js scan --url https://example.com -r DPDP --llm-filter-fp -o html -f report.html
```

## Other Options

- `--severity <levels>` – Minimum severity (e.g. HIGH,CRITICAL)
- `--include <patterns>` – Glob patterns to include
- `--exclude <patterns>` – Glob patterns to exclude
- `--keep-temp` – Keep temp files after URL scan (debugging)

## List Rules

```bash
node packages/cli/dist/cli.js rules
node packages/cli/dist/cli.js rules -r DPDP
```

## Troubleshooting

### Common Issues

1. **Command not found**
   - Run from juro repo root: `node packages/cli/dist/cli.js scan`
   - Or ensure the CLI is on your PATH as `juro`

2. **URL scan fails**
   - Check network access and that the URL is reachable

3. **LLM options (--verify, --llm-filter-fp) fail**
   - Ensure Ollama is running and `mistral-regtech` is available: `ollama run mistral-regtech`
   - Or set `JURO_VERIFY_ENDPOINT` for a different endpoint
