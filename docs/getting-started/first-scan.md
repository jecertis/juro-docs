---
id: first-scan
title: First Scan
sidebar_label: First Scan
description: 'Run your first compliance scan with Juro'
keywords: [first scan, compliance scan, getting started, tutorial]
---

# Your First Scan

Learn how to run your first compliance scan with Juro.

## Prerequisites

- Node.js 18+
- Juro built from source: `npm run build` (from repo root)

From the **juro** repo root, use:
`node packages/cli/dist/cli.js` (or `juro` if the CLI is on your PATH).

## Basic Scan

```bash
# Scan default path (./examples)
node packages/cli/dist/cli.js scan

# Scan specific directory
node packages/cli/dist/cli.js scan ./src

# Scan with specific regulations (DPDP, GDPR, DORA)
node packages/cli/dist/cli.js scan ./src -r DPDP
node packages/cli/dist/cli.js scan ./src -r GDPR,DORA,DPDP
```

## Output Formats

```bash
# Table (default)
node packages/cli/dist/cli.js scan ./examples -r DPDP -o table

# JSON (save to file)
node packages/cli/dist/cli.js scan ./examples -r DPDP -o json -f report.json

# HTML report (open in browser)
node packages/cli/dist/cli.js scan ./examples -r DPDP -o html -f report.html --open

# Dashboard (interactive HTML)
node packages/cli/dist/cli.js scan ./examples -r DPDP -o dashboard -f report.html
```

## Scan a Live Website

Juro can fetch a URL and scan the downloaded HTML/JS/CSS:

```bash
# Scan a website for DPDP
node packages/cli/dist/cli.js scan --url https://example.com -r DPDP -o table

# Generate HTML report for verification
node packages/cli/dist/cli.js scan --url https://example.com -r DPDP -o html -f report.html --open
```

## DPDP with LLM Verification (Optional)

When scanning for DPDP, you can optionally run the **verification layer** (classify findings as CONFIRMED_FAIL or INCONCLUSIVE) or **false-positive filter**. These require **Ollama** with the **mistral-regtech** model running (e.g. `ollama run mistral-regtech`).

```bash
# Verify findings (downgrade uncertain FAILs to INCONCLUSIVE)
node packages/cli/dist/cli.js scan ./examples -r DPDP --verify --verify-max 10 -o table

# Remove likely false positives from the report
node packages/cli/dist/cli.js scan ./examples -r DPDP --llm-filter-fp -o table
```

See [DPDP LLM Integration](/docs/regulations/dpdp-compliance#llm-assisted-options) for details.

## Understanding Results

After running a scan, you'll see:

- **Violations Found**: Number of compliance issues
- **Severity Levels**: CRITICAL, HIGH, MEDIUM, LOW
- **By Regulation**: Counts per regulation (e.g. DPDP)
- **File Locations**: Where violations were found
- **Fix Suggestions**: How to address each issue

With `--verify`, each finding also shows **Verification**: CONFIRMED_FAIL or INCONCLUSIVE.

## Next Steps

- [Configuration](/docs/getting-started/configuration) - Customize your scanning
- [Compliance Scanning](/docs/features/compliance-scanning) - All features
- [DPDP Compliance](/docs/regulations/dpdp-compliance) - DPDP rules and LLM options
- [CLI Tools](/docs/integrations/cli-tools) - Full CLI reference
