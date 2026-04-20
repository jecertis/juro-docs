---
id: github-actions
title: GitHub Actions Integration
sidebar_label: GitHub Actions
description: 'Complete GitHub Actions integration with workflow generation, PR compliance checking, and team notifications'
keywords: [GitHub Actions, CI/CD, compliance automation, PR checks, workflow generation]
---

# GitHub Actions Integration

Juro v2.0.0 provides comprehensive GitHub Actions integration with automated workflow generation, PR compliance checking, team notifications, and custom rule support. **18/18 BDD tests passing** with production-ready implementation.

## 🚀 What's New in v2.0.0

### ✅ **Complete GitHub Actions Integration**
- **Workflow Generation**: Automatic YAML workflow creation
- **PR Compliance Checking**: Automatic PR comments with violation details
- **Team Notifications**: Slack, email, and Teams notifications
- **Custom Rules**: Project-specific compliance rules
- **Matrix Builds**: Multi-environment and multi-version testing
- **SARIF Integration**: GitHub Security tab integration

## Quick Start

### **One-Command Setup**
```bash
# Add compliance workflow to your repository
juro add-workflow --repo ./my-project --config gdpr-workflow.json
```

### **Generated Workflow Example**
```yaml
name: Juro Compliance Check
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [development, staging, production]
        node-version: [18, 20]
    
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
          juro scan --path ./src --rules gdpr,dora --format json --output compliance-results.json
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
      
      - name: Upload SARIF results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: compliance-results.sarif
```

## Advanced Features

### **PR Compliance Checking**
```yaml
- name: Run PR Compliance Check
  uses: juro/pr-compliance-check@v1
  with:
    api-key: ${{ secrets.JURO_API_KEY }}
    regulations: 'GDPR,DORA'
    comment-on-violations: true
    fail-on-critical: true
    notify-channels: 'slack,email'
```

### **Team Notifications**
```yaml
- name: Send Compliance Notifications
  uses: juro/notify@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    email-recipients: 'team@company.com'
    format: 'markdown'
    include-trends: true
```

### **Custom Rules Support**
```yaml
- name: Run Custom Compliance Scan
  uses: juro/compliance-action@v1
  with:
    api-key: ${{ secrets.JURO_API_KEY }}
    custom-rules: '.juro/custom-rules.json'
    regulations: 'GDPR,CUSTOM'
```

## Workflow Configuration

### **Workflow Triggers**
- `push` - On every push to repository
- `pull_request` - On every pull request
- `schedule` - On cron schedule (e.g., daily at 2 AM)
- `workflow_dispatch` - Manual trigger

### **Compliance Regulations**
- **GDPR**: General Data Protection Regulation (EU)
- **DORA**: Digital Operational Resilience Act (EU)
- **DPDP**: Digital Personal Data Protection Act (India)

### **Matrix Configuration**
```yaml
strategy:
  matrix:
    environments: [development, staging, production]
    node-versions: [18, 20]
    os: [ubuntu-latest, windows-latest, macos-latest]
```

## PR Integration Features

### **Automatic PR Comments**
- **Violation Breakdown**: By file and severity
- **Fix Suggestions**: Actionable recommendations
- **Visual Indicators**: Emojis and formatting
- **Compliance Score**: Overall project compliance

### **PR Comment Example**
```markdown
## 🔍 Compliance Scan Results

- **Total Violations**: 3
- **Critical**: 1
- **High**: 2

### Violations Found:

- **HIGH**: Personal data should not be stored in localStorage without encryption
  - File: `src/user-service.ts:25`
  - Rule: GDPR-30-001
  - Suggestion: Use encrypted storage for personal data

- **CRITICAL**: Missing consent mechanism for data collection
  - File: `src/analytics.js:15`
  - Rule: GDPR-6-001
  - Suggestion: Implement explicit consent before data collection
```

## Notification Channels

### **Slack Integration**
```yaml
- name: Slack Notification
  uses: juro/notify@v1
  with:
    channel: 'compliance-alerts'
    webhook: ${{ secrets.SLACK_WEBHOOK }}
    format: 'slack'
```

### **Email Notifications**
```yaml
- name: Email Notification
  uses: juro/notify@v1
  with:
    recipients: 'team@company.com,cto@company.com'
    smtp-server: 'smtp.company.com'
    format: 'html'
```

### **Microsoft Teams**
```yaml
- name: Teams Notification
  uses: juro/notify@v1
  with:
    webhook: ${{ secrets.TEAMS_WEBHOOK }}
    format: 'teams'
```

## Custom Rules

### **Creating Custom Rules**
```json
{
  "customRules": {
    "custom_data_encryption": {
      "pattern": "password\\s*=\\s*[\"'][^\"']+[\"']",
      "severity": "HIGH",
      "description": "Plain text passwords detected",
      "suggestion": "Use environment variables or encrypted storage"
    },
    "api_key_exposure": {
      "pattern": "api[_-]?key\\s*[:=]\\s*[\"'][^\"']+[\"']",
      "severity": "CRITICAL",
      "description": "API keys exposed in code",
      "suggestion": "Move API keys to environment variables"
    }
  }
}
```

### **Using Custom Rules**
```yaml
- name: Run Custom Rules Scan
  uses: juro/compliance-action@v1
  with:
    api-key: ${{ secrets.JURO_API_KEY }}
    custom-rules: '.juro/custom-rules.json'
    regulations: 'CUSTOM'
```

## Performance Optimization

### **Caching**
```yaml
- name: Cache Dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### **Parallel Scanning**
```yaml
strategy:
  matrix:
    project: [frontend, backend, mobile, api]
```

### **Conditional Execution**
```yaml
- name: Check for relevant changes
  id: changes
  uses: dorny/paths-filter@v2
  with:
    filters: |
      src:
        - 'src/**'
      config:
        - '**/*.config.js'

- name: Run Compliance Scan
  if: steps.changes.outputs.src == 'true'
  uses: juro/compliance-action@v1
```

## Best Practices

### **1. Fail Fast on Critical Issues**
```yaml
- name: Run Compliance Scan
  uses: juro/compliance-action@v1
  with:
    fail-on-critical: true
    min-score: 80
```

### **2. Use Matrix Strategies**
```yaml
strategy:
  matrix:
    node-version: [16, 18, 20]
    os: [ubuntu-latest, windows-latest, macos-latest]
```

### **3. Set Up Notifications**
```yaml
- name: Notify on Failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    text: "Compliance scan failed for ${{ github.repository }}"
```

### **4. Generate Reports**
```yaml
- name: Generate Compliance Report
  uses: juro/generate-report@v1
  with:
    format: 'html'
    include-trends: true
    output-path: 'compliance-report.html'
```

## Troubleshooting

### **Common Issues**

#### **1. API Key Not Found**
- Ensure `JURO_API_KEY` is set in repository secrets
- Check the secret name matches exactly
- Verify the secret is not empty

#### **2. Workflow Creation Failed**
- Check repository permissions
- Ensure the workflow file is valid YAML
- Verify GitHub Actions is enabled

#### **3. PR Comments Not Appearing**
- Check GitHub token permissions
- Ensure the workflow has write access
- Verify the PR is from the same repository

#### **4. Notifications Not Sending**
- Verify webhook URLs are correct
- Check notification channel permissions
- Ensure the notification service is accessible

### **Debug Mode**
```yaml
- name: Run Compliance Scan with Debug
  uses: juro/compliance-action@v1
  with:
    api-key: ${{ secrets.JURO_API_KEY }}
    debug: true
    verbose: true
```

## Examples

### **Complete Workflow Example**
```yaml
name: Complete Compliance Pipeline
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      
      - name: Run Compliance Scan
        run: |
          juro scan --path ./src --rules gdpr,dora --format json --output compliance-results.json
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
      
      - name: Generate Report
        run: |
          juro generate-report --input compliance-results.json --format html --output compliance-report.html
      
      - name: Upload Reports
        uses: actions/upload-artifact@v3
        with:
          name: compliance-reports
          path: |
            compliance-results.json
            compliance-report.html
      
      - name: Comment PR
        if: github.event_name == 'pull_request'
        uses: juro/pr-comment@v1
        with:
          results-file: compliance-results.json
          fail-on-critical: true
```

## Getting Help

### **Documentation**
- [MCP Tools](/docs/api/mcp-tools) - GitHub Actions MCP tools
- [Compliance Scanning](/docs/features/compliance-scanning) - Scanning capabilities
- [API Examples](/docs/api/examples) - Usage examples

### **Support**
- [FAQ](/docs/support/faq) - Frequently asked questions
- [GitHub Issues](https://github.com/juro/juro-mcp-server/issues) - Report bugs
- [Discord Community](https://discord.gg/juro) - Get help

---

**Ready to automate your compliance?** [Get started with GitHub Actions integration](/docs/getting-started/installation) and see how easy it is to integrate compliance into your CI/CD pipeline!
