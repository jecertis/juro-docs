---
id: basic-scanning
title: Basic Scanning Tutorial
sidebar_label: Basic Scanning
---

# Basic Scanning Tutorial

Learn how to perform basic compliance scanning with Juro. This tutorial covers the essential commands and workflows you'll use most often.

## Prerequisites

- Juro built from source (from **juro** repo: `npm run build`)
- Run from repo root: `node packages/cli/dist/cli.js` (or `juro` on PATH)
- A project or URL to scan

## Quick Start

### 1. Basic Project Scan

The simplest way to scan your project:

```bash
# Default: scan ./examples
node packages/cli/dist/cli.js scan

# Scan a directory
node packages/cli/dist/cli.js scan ./my-project
```

This will:
- Scan all files in the specified directory
- Use default regulations
- Display results in the terminal (table)
- Show a summary of violations found

### 2. Specify Regulations

Scan for specific regulations with `-r`:

```bash
# DPDP only
node packages/cli/dist/cli.js scan ./my-project -r DPDP

# Multiple regulations (comma-separated)
node packages/cli/dist/cli.js scan ./my-project -r DPDP,GDPR,DORA
```

### 3. Choose Output Format

Use `-o` for format and `-f` for output file:

```bash
# Table (default)
node packages/cli/dist/cli.js scan ./my-project -o table

# JSON (save to file)
node packages/cli/dist/cli.js scan ./my-project -o json -f report.json

# HTML report (open in browser)
node packages/cli/dist/cli.js scan ./my-project -r DPDP -o html -f report.html --open
```

### 4. Scan a Live Website

Fetch a URL and scan the downloaded content:

```bash
node packages/cli/dist/cli.js scan --url https://example.com -r DPDP -o table
node packages/cli/dist/cli.js scan --url https://example.com -r DPDP -o html -f report.html --open
```

### 5. DPDP with LLM Verification (Optional)

With Ollama and **mistral-regtech** running, you can verify findings or filter false positives:

```bash
# Verify findings (CONFIRMED_FAIL / INCONCLUSIVE)
node packages/cli/dist/cli.js scan ./my-project -r DPDP --verify --verify-max 10 -o table

# Reduce false positives
node packages/cli/dist/cli.js scan --url https://example.com -r DPDP --llm-filter-fp -o html -f report.html
```

## Understanding Scan Results

### Sample Output

```bash
$ node packages/cli/dist/cli.js scan ./my-project -r DPDP

🔍 Scanning /Users/john/my-project...

📊 Scan Results:
  Total files scanned: 45
  Violations found: 3
  Critical: 1
  High: 1
  Medium: 1
  Low: 0

🚨 Violations:

1. CRITICAL - Personal data stored without encryption
   File: src/auth.js:42
   Rule: gdpr-data-encryption
   Message: Personal data should be encrypted before storage
   Suggestion: Use encryption library to encrypt data before storage

2. HIGH - Missing consent mechanism
   File: src/analytics.js:15
   Rule: gdpr-consent
   Message: Data collection requires explicit user consent
   Suggestion: Implement consent mechanism before data collection

3. MEDIUM - Data retention not specified
   File: src/user.js:28
   Rule: gdpr-data-retention
   Message: Data retention period should be specified
   Suggestion: Add data retention policy to user data handling

✅ Scan completed in 2.3 seconds
```

### Understanding Violation Severity

- **CRITICAL**: Immediate action required, likely compliance violation
- **HIGH**: Important issue that should be addressed soon
- **MEDIUM**: Moderate issue that should be considered
- **LOW**: Minor issue or suggestion for improvement

## Advanced Scanning Options

### 1. Exclude Files and Directories

Skip files or directories with `--exclude`:

```bash
node packages/cli/dist/cli.js scan ./my-project --exclude "node_modules,dist,coverage"
```

### 2. Include Only Certain Patterns

Use `--include` to limit what is scanned:

```bash
node packages/cli/dist/cli.js scan ./my-project --include "src/**/*.js" -r DPDP
```

### 3. Save Results to File

Use `-o` and `-f` to save output:

```bash
# JSON
node packages/cli/dist/cli.js scan ./my-project -o json -f results.json

# HTML report
node packages/cli/dist/cli.js scan ./my-project -r DPDP -o html -f report.html --open
```

### 4. Minimum Severity

Filter by severity with `--severity`:

```bash
node packages/cli/dist/cli.js scan ./my-project -r DPDP --severity HIGH,CRITICAL
```

## Common Use Cases

### 1. Pre-commit Scanning

Scan your code before committing changes:

```bash
# Scan a directory (e.g. staged or modified)
node packages/cli/dist/cli.js scan ./src -r DPDP -o table
```

### 2. CI/CD Integration

Run from the juro repo or with the CLI on PATH:

```bash
node packages/cli/dist/cli.js scan ./src -r DPDP,GDPR,DORA -o json -f compliance-results.json
```

### 3. Regular Compliance Audits

Save reports by date:

```bash
node packages/cli/dist/cli.js scan ./my-project -r DPDP -o json -f audit-$(date +%Y%m%d).json
node packages/cli/dist/cli.js scan --url https://example.com -r DPDP -o html -f report.html
```

## List Rules

Inspect available regulations and rules:

```bash
node packages/cli/dist/cli.js rules
node packages/cli/dist/cli.js rules -r DPDP
```

## Troubleshooting

### Common Issues

1. **No violations found but you expect some**
   - Check if the rules are enabled
   - Verify the file paths are correct
   - Try with `--verbose` to see what's being scanned

2. **Too many violations**
   - Use more specific rules
   - Exclude test files and dependencies
   - Adjust severity threshold

3. **Scan is slow**
   - Exclude large directories
   - Use more specific file patterns
   - Check network connectivity

### Debug Mode

Run from the juro repo and check the scan output; use `--keep-temp` when scanning a URL to keep downloaded files for inspection.

## Best Practices

### 1. **Start Simple**
Begin with basic scans and gradually add complexity:

```bash
# Start with basic scan
node packages/cli/dist/cli.js scan ./my-project

# Add regulations
node packages/cli/dist/cli.js scan ./my-project -r DPDP

# Add output file
node packages/cli/dist/cli.js scan ./my-project -r DPDP -o json -f results.json
```

### 2. **Integrate with Your Workflow**
Make scanning part of your development process:

```bash
# Add to package.json scripts (run from juro repo or with juro on PATH)
{
  "scripts": {
    "compliance": "node packages/cli/dist/cli.js scan ./src -r DPDP,GDPR,DORA",
    "compliance:json": "node packages/cli/dist/cli.js scan ./src -r DPDP -o json -f compliance-results.json"
  }
}
```

### 3. **Regular Monitoring**
Set up regular compliance monitoring:

```bash
node packages/cli/dist/cli.js scan ./my-project -r DPDP -o json -f daily-$(date +%Y%m%d).json
node packages/cli/dist/cli.js scan --url https://example.com -r DPDP -o html -f report.html
```

## Next Steps

Now that you understand basic scanning, you can:

1. **Learn about AI queries** - [AI Queries Tutorial](/docs/tutorials/ai-queries)
2. **Create custom rules** - [Custom Rules Tutorial](/docs/tutorials/custom-rules)
3. **Set up GitHub Actions** - [GitHub Setup Tutorial](/docs/tutorials/github-setup)
4. **Explore advanced features** - [API Examples](/docs/api/examples)

## Getting Help

If you need assistance:

- Check the [FAQ](/docs/support/faq) for common questions
- Review [Error Codes](/docs/api/error-codes) for troubleshooting
- Contact [Support](/docs/support/contact) for additional help

---

*Ready to start scanning? See [First Scan](/docs/getting-started/first-scan) and [CLI Tools](/docs/integrations/cli-tools) for the full CLI reference.*
