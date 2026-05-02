---
id: github-setup
title: GitHub Setup Tutorial
sidebar_label: GitHub Setup
---

# GitHub Setup Tutorial

Learn how to integrate Juro's compliance scanning into your GitHub workflow. This tutorial covers GitHub Actions setup, pull request integration, and security scanning automation.

## Prerequisites

- GitHub repository with your code
- Juro API key
- Basic understanding of GitHub Actions
- Repository admin access

## Basic Setup

### 1. Create GitHub Actions Workflow

Create `.github/workflows/compliance.yml`:

```yaml
name: Compliance Check
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      
      - name: Run Compliance Scan
        run: |
          juro scan --path ./src --rules gdpr,soc2,owasp --format sarif --output compliance-results.sarif
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
      
      - name: Upload SARIF results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: compliance-results.sarif
```

### 2. Configure GitHub Secrets

1. Go to your repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Add your Juro API key:
   - Name: `JURO_API_KEY`
   - Value: Your Juro API key

### 3. Enable GitHub Actions

1. Go to your repository settings
2. Navigate to "Actions" → "General"
3. Enable "Allow all actions and reusable workflows"
4. Click "Save"

## Advanced Configuration

### 1. Pull Request Integration

Create a workflow that comments on pull requests:

```yaml
name: Compliance PR Check
on: [pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      
      - name: Run Compliance Scan
        run: |
          juro scan --path ./src --rules gdpr,soc2,owasp --format json --output compliance-results.json
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
      
      - name: Comment PR
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('compliance-results.json', 'utf8'));
            
            const violations = results.violations || [];
            const criticalCount = violations.filter(v => v.severity === 'critical').length;
            const highCount = violations.filter(v => v.severity === 'high').length;
            
            let comment = `## 🔍 Compliance Scan Results\n\n`;
            comment += `- **Total Violations**: ${violations.length}\n`;
            comment += `- **Critical**: ${criticalCount}\n`;
            comment += `- **High**: ${highCount}\n\n`;
            
            if (violations.length > 0) {
              comment += `### Violations Found:\n\n`;
              violations.slice(0, 10).forEach(violation => {
                comment += `- **${violation.severity.toUpperCase()}**: ${violation.message}\n`;
                comment += `  - File: \`${violation.file}:${violation.line}\`\n`;
                comment += `  - Rule: ${violation.rule}\n\n`;
              });
              
              if (violations.length > 10) {
                comment += `... and ${violations.length - 10} more violations\n\n`;
              }
            } else {
              comment += `✅ No compliance violations found!\n`;
            }
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

### 2. Status Checks

Add required status checks:

```yaml
name: Compliance Status Check
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      
      - name: Run Compliance Scan
        id: scan
        run: |
          juro scan --path ./src --rules gdpr,soc2,owasp --format json --output compliance-results.json --fail-on-critical
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
      
      - name: Check Scan Results
        if: always()
        run: |
          if [ "${{ steps.scan.outcome }}" == "failure" ]; then
            echo "Critical compliance violations found!"
            exit 1
          fi
```

### 3. Custom Rule Integration

Include custom rules in your workflow:

```yaml
name: Custom Rules Compliance Check
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      
      - name: Create custom rules
        run: |
          cat > custom-rules.json << EOF
          {
            "rules": {
              "gdpr": {
                "customPatterns": [
                  {
                    "pattern": "localStorage\\.setItem.*personal",
                    "message": "Personal data should not be stored in localStorage",
                    "severity": "high"
                  }
                ]
              }
            }
          }
          EOF
      
      - name: Run Compliance Scan
        run: |
          juro scan --path ./src --rules gdpr,soc2,owasp --rules-file custom-rules.json --format sarif --output compliance-results.sarif
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
```

## Advanced Features

### 1. Matrix Testing

Test across multiple environments:

```yaml
name: Matrix Compliance Check
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16, 18, 20]
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      
      - name: Run Compliance Scan
        run: |
          juro scan --path ./src --rules gdpr,soc2,owasp --format json --output compliance-results-${{ matrix.os }}-${{ matrix.node-version }}.json
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
```

### 2. Scheduled Scans

Run regular compliance checks:

```yaml
name: Scheduled Compliance Check
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      
      - name: Run Compliance Scan
        run: |
          juro scan --path ./src --rules all --format json --output compliance-report-$(date +%Y%m%d).json
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
      
      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: compliance-report
          path: compliance-report-*.json
```

### 3. Branch Protection

Set up branch protection rules:

1. Go to repository settings
2. Navigate to "Branches"
3. Click "Add rule"
4. Configure:
   - Branch name pattern: `main`
   - Require status checks to pass before merging
   - Select "Compliance Check" status check
   - Require branches to be up to date
   - Include administrators

## Best Practices

### 1. Workflow Organization

```yaml
name: Compliance Workflow
on: [push, pull_request]

jobs:
  prepare:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: npm-${{ hashFiles('package-lock.json') }}
  
  scan:
    needs: prepare
    runs-on: ubuntu-latest
    steps:
      - name: Run scan
        run: juro scan
  
  report:
    needs: scan
    runs-on: ubuntu-latest
    steps:
      - name: Generate report
        run: juro report
```

### 2. Performance Optimization

```yaml
jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      # Cache Juro CLI installation
      - name: Cache Juro CLI
        uses: actions/cache@v3
        with:
          path: ~/.npm/juro-cli
          key: juro-cli-${{ hashFiles('package.json') }}
      
      # Cache scan results
      - name: Cache scan results
        uses: actions/cache@v3
        with:
          path: .juro-cache
          key: juro-scan-${{ github.sha }}
```

### 3. Error Handling

```yaml
jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - name: Run Compliance Scan
        id: scan
        continue-on-error: true
        run: juro scan
      
      - name: Handle Scan Failure
        if: steps.scan.outcome == 'failure'
        run: |
          echo "::error::Compliance scan failed"
          exit 1
```

## Troubleshooting

### Common Issues

1. **Action Fails to Run**
   - Check API key configuration
   - Verify GitHub Actions is enabled
   - Check workflow syntax

2. **Scan Takes Too Long**
   - Limit scan scope
   - Use caching
   - Optimize workflow

3. **Status Check Not Appearing**
   - Check branch protection rules
   - Verify workflow triggers
   - Check required status checks

### Debug Mode

Enable debug logging:

```yaml
env:
  ACTIONS_STEP_DEBUG: true
  ACTIONS_RUNNER_DEBUG: true
```

## Next Steps

Now that you've set up GitHub integration, you can:

1. **Create custom rules** - [Custom Rules Tutorial](/docs/tutorials/custom-rules)
2. **Explore advanced features** - [API Examples](/docs/api/examples)
3. **Learn about webhooks** - [Webhooks Documentation](/docs/api/webhooks)

## Getting Help

If you need assistance:

- Check the [FAQ](/docs/support/faq) for common questions
- Review [Error Codes](/docs/api/error-codes) for troubleshooting
- Contact [Support](/docs/support/contact) for additional help

---

*Ready to automate your compliance checks? [Install Juro CLI](https://juro.dev/docs/getting-started/installation) and set up your GitHub workflow today!*
