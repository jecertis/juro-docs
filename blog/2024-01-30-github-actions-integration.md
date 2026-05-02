---
slug: github-actions-integration
title: "Automate Compliance Scanning with GitHub Actions"
authors: [juro-team]
tags: [github-actions, ci-cd, automation, compliance]
---

# Automate Compliance Scanning with GitHub Actions

Learn how to integrate Juro's compliance scanning into your GitHub Actions workflow for automated, continuous compliance monitoring.

<!--truncate-->

## Why Automate Compliance Scanning?

Manual compliance checks are:
- **Time-consuming**: Require manual intervention for every code change
- **Error-prone**: Easy to miss violations in large codebases
- **Inconsistent**: Different team members may check different things
- **Reactive**: Issues are found after code is already merged

Automated compliance scanning with GitHub Actions provides:
- **Continuous Monitoring**: Every pull request and push is automatically scanned
- **Consistent Results**: Same checks applied to every code change
- **Early Detection**: Issues caught before they reach production
- **Team Collaboration**: Compliance status visible to all team members

## Basic GitHub Actions Integration

### 1. Create Workflow File

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
          juro scan --path ./src --rules gdpr,dora,dpdp --format json --output compliance-results.json
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
      
      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: compliance-results
          path: compliance-results.json
```

### 2. Configure Secrets

Add your Juro API key to GitHub Secrets:

1. Go to your repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `JURO_API_KEY`
5. Value: Your Juro API key

### 3. Test the Workflow

```bash
# Push changes to trigger the workflow
git add .
git commit -m "Add compliance scanning workflow"
git push origin main
```

## Advanced GitHub Actions Features

### SARIF Integration

Upload compliance results as SARIF for GitHub Security tab:

```yaml
name: Compliance Check with SARIF
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
          juro scan --path ./src --rules gdpr,dora,dpdp --format sarif --output compliance-results.sarif
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
      
      - name: Upload SARIF results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: compliance-results.sarif
```

### Pull Request Comments

Add compliance results as PR comments:

```yaml
name: Compliance Check with PR Comments
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
          juro scan --path ./src --rules gdpr,dora,dpdp --format json --output compliance-results.json
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

### Conditional Scanning

Only scan when relevant files change:

```yaml
name: Smart Compliance Check
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Check for relevant changes
        id: changes
        uses: dorny/paths-filter@v2
        with:
          filters: |
            src:
              - 'src/**'
            config:
              - '**/*.config.js'
              - '**/*.config.json'
      
      - name: Setup Node.js
        if: steps.changes.outputs.src == 'true' || steps.changes.outputs.config == 'true'
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Juro CLI
        if: steps.changes.outputs.src == 'true' || steps.changes.outputs.config == 'true'
        run: npm install -g @juro/cli
      
      - name: Run Compliance Scan
        if: steps.changes.outputs.src == 'true' || steps.changes.outputs.config == 'true'
        run: |
          juro scan --path ./src --rules gdpr,dora,dpdp --format json --output compliance-results.json
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
```

## Multi-Project Workflows

### Monorepo Support

Scan multiple projects in a monorepo:

```yaml
name: Monorepo Compliance Check
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        project: [frontend, backend, mobile, api]
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      
      - name: Run Compliance Scan for ${{ matrix.project }}
        run: |
          juro scan --path ./${{ matrix.project }}/src --rules gdpr,dora,dpdp --format json --output ${{ matrix.project }}-results.json
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
      
      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: compliance-results-${{ matrix.project }}
          path: ${{ matrix.project }}-results.json
```

### Parallel Scanning

Scan different compliance standards in parallel:

```yaml
name: Parallel Compliance Check
on: [push, pull_request]

jobs:
  gdpr-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      - name: Run GDPR Scan
        run: |
          juro scan --path ./src --rules gdpr --format json --output gdpr-results.json
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
  
  dora-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      - name: Run DORA Scan
        run: |
          juro scan --path ./src --rules dora --format json --output dora-results.json
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
  
  dpdp-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      - name: Run DPDP Scan
        run: |
          juro scan --path ./src --rules dpdp --format json --output dpdp-results.json
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
```

## Advanced Configuration

### Custom Rules

Use custom compliance rules:

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
                    "message": "Personal data should not be stored in localStorage without encryption",
                    "severity": "high"
                  }
                ]
              }
            }
          }
          EOF
      
      - name: Run Compliance Scan with Custom Rules
        run: |
          juro scan --path ./src --rules gdpr --config custom-rules.json --format json --output compliance-results.json
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
```

### Environment-Specific Scanning

Different rules for different environments:

```yaml
name: Environment-Specific Compliance Check
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [development, staging, production]
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      
      - name: Run Environment-Specific Scan
        run: |
          if [ "${{ matrix.environment }}" = "production" ]; then
            juro scan --path ./src --rules gdpr,dora,dpdp --format json --output compliance-results.json
          elif [ "${{ matrix.environment }}" = "staging" ]; then
            juro scan --path ./src --rules gdpr,dora,dpdp --format json --output compliance-results.json
          else
            juro scan --path ./src --rules gdpr,dora --format json --output compliance-results.json
          fi
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
```

## Best Practices

### 1. **Fail Fast on Critical Issues**

```yaml
- name: Run Compliance Scan
  run: |
    juro scan --path ./src --rules gdpr,dora,dpdp --format json --output compliance-results.json --fail-on-critical
  env:
    JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
```

### 2. **Cache Dependencies**

```yaml
- name: Cache Node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### 3. **Use Matrix Strategies**

```yaml
strategy:
  matrix:
    node-version: [16, 18, 20]
    os: [ubuntu-latest, windows-latest, macos-latest]
```

### 4. **Set Up Notifications**

```yaml
- name: Notify on Failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    text: "Compliance scan failed for ${{ github.repository }}"
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## Troubleshooting

### Common Issues

1. **API Key Not Found**
   - Ensure `JURO_API_KEY` is set in repository secrets
   - Check the secret name matches exactly

2. **Scan Timeout**
   - Reduce the scope of your scan
   - Use more specific rules
   - Exclude large directories

3. **Permission Denied**
   - Check file permissions in your repository
   - Ensure the workflow has necessary permissions

### Debug Mode

Enable debug logging:

```yaml
- name: Run Compliance Scan with Debug
  run: |
    juro scan --path ./src --rules gdpr --verbose --debug
  env:
    JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
    DEBUG: juro:*
```

## Getting Started

1. **Add the workflow file** to your repository
2. **Configure your API key** in GitHub Secrets
3. **Push changes** to trigger the workflow
4. **Monitor results** in the Actions tab

Ready to automate your compliance scanning? [Get started with Juro today](https://juro.dev/signup) and see how easy it is to integrate compliance into your development workflow.

---

*Want to learn more about GitHub Actions integration? Check out our [detailed integration guide](/docs/integrations/github-actions) and [API examples](/docs/api/examples).*