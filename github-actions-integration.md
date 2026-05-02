# GitHub Actions Integration

The Juro MCP Server provides comprehensive GitHub Actions integration for automated compliance checking in your CI/CD pipeline. This integration allows you to automatically scan code for compliance violations, comment on pull requests, and send notifications to your team.

## Features

### 🔄 Automated Workflow Creation
- **One-command setup**: Add compliance checking to any repository with a single command
- **Auto-detection**: Automatically detects project type and applies relevant regulations
- **Flexible triggers**: Support for push, pull request, schedule, and manual triggers
- **Matrix builds**: Test across multiple environments and Node.js versions

### 🔍 Pull Request Integration
- **Automatic scanning**: Scan every pull request for compliance violations
- **Smart commenting**: Automatically comment on PRs with violation details and fix suggestions
- **Configurable failure**: Choose whether to fail PRs on violations or just warn
- **Custom rules**: Define project-specific compliance rules

### 📊 Comprehensive Reporting
- **Multiple formats**: Generate reports in Markdown, JSON, or HTML
- **Trend analysis**: Track compliance improvements over time
- **Detailed metrics**: Breakdown by regulation, severity, and file
- **Team notifications**: Send alerts to Slack, email, and Microsoft Teams

## Quick Start

### 1. Add Compliance Workflow

```bash
# Using MCP client
juro mcp call add_github_workflow --repoPath ./my-project --config '{
  "regulations": ["GDPR", "DORA"],
  "trigger": "push",
  "failOnCritical": true,
  "minScore": 80
}'
```

### 2. Create PR-Specific Workflow

```bash
# Using MCP client
juro mcp call create_pr_workflow --config '{
  "regulations": ["GDPR", "DORA", "DPDP"],
  "failOnViolations": true,
  "minScore": 85
}'
```

### 3. Run Compliance Check

```bash
# Using MCP client
juro mcp call run_pr_compliance_check --prData '{
  "number": 123,
  "violations": [
    {
      "rule": "gdpr_personal_data",
      "severity": "HIGH",
      "file": "src/user.js",
      "line": 15
    }
  ]
}'
```

## Configuration Options

### Workflow Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | string | "Juro Compliance Check" | Workflow name |
| `trigger` | string | "push" | Trigger type (push, pull_request, schedule, workflow_dispatch) |
| `schedule` | string | "0 2 * * *" | Cron schedule for scheduled workflows |
| `regulations` | array | ["GDPR", "DORA"] | Compliance regulations to check |
| `failOnViolations` | boolean | false | Whether to fail workflow on violations |
| `failOnCritical` | boolean | true | Whether to fail workflow on critical violations |
| `minScore` | number | 80 | Minimum compliance score required |
| `customRules` | object | {} | Custom compliance rules |
| `matrix` | object | {} | Matrix configuration for multiple environments |
| `notifications` | object | {} | Notification configuration |

### Matrix Configuration

```json
{
  "matrix": {
    "environments": ["development", "staging", "production"],
    "nodeVersions": ["18", "20"]
  }
}
```

### Notification Configuration

```json
{
  "notifications": {
    "slack": {
      "webhook": "https://hooks.slack.com/services/..."
    },
    "email": {
      "recipients": ["team@company.com"]
    },
    "teams": {
      "webhook": "https://outlook.office.com/webhook/..."
    }
  }
}
```

## Generated Workflow Example

The integration generates a comprehensive GitHub Actions workflow:

```yaml
name: Juro Compliance Check
on: push
jobs:
  compliance:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [development, staging, production]
        node-version: [18, 20]
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      
      - name: Install Juro Compliance Action
        run: npm install -g @juro/compliance-action@v1.0.0
      
      - name: Run Compliance Check
        id: compliance
        uses: juro/compliance-action@v1.0.0
        with:
          regulations: ["GDPR", "DORA"]
          fail-on-violations: false
          fail-on-critical: true
          min-score: 80
      
      - name: Comment on PR
        if: github.event_name == 'pull_request' && steps.compliance.outputs.violations > 0
        uses: actions/github-script@v7
        with:
          script: |
            const violations = ${{ steps.compliance.outputs.violations }};
            const comment = `## Compliance Check Results
            ${violations} violations found. Please review and fix before merging.`;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
      
      - name: Send Slack Notification
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## PR Comment Example

When violations are found, the integration automatically comments on PRs:

```markdown
## 🔍 Compliance Check Results

❌ **3 violations found**

🚨 **1 CRITICAL violations** - Must be fixed before merge
⚠️ **2 HIGH severity violations** - Should be addressed

### Violations by File:

**src/user.js** (2 violations):
- Line 15: gdpr_personal_data (HIGH)
  💡 *Suggestion: Encrypt personal data using AES-256*
- Line 23: custom_data_encryption (CRITICAL)
  💡 *Suggestion: Use environment variables for sensitive data*

**src/monitoring.js** (1 violations):
- Line 67: dora_incident_response (MEDIUM)
  💡 *Suggestion: Implement automated incident detection*

### Fix Suggestions:
1. Review each violation and implement the suggested fixes
2. Run `juro-compliance scan` locally to verify fixes
3. Re-run this workflow after making changes
```

## Compliance Report Example

Generate detailed compliance reports:

```markdown
# 📊 Compliance Report

**Generated:** 2024-01-15T10:30:00.000Z
**Total Violations:** 8
**Compliance Score:** 72/100

## 📈 Violations by Regulation

- **GDPR:** 4 violations
- **DORA:** 2 violations
- **DPDP:** 2 violations

## ⚠️ Violations by Severity

- **CRITICAL:** 1 violations
- **HIGH:** 4 violations
- **MEDIUM:** 2 violations
- **LOW:** 1 violations
```

## Advanced Features

### Custom Rules

Define project-specific compliance rules:

```json
{
  "customRules": {
    "custom_data_encryption": {
      "pattern": "password\\s*=\\s*[\"'][^\"']+[\"']",
      "severity": "HIGH",
      "description": "Plain text passwords detected"
    },
    "custom_api_security": {
      "pattern": "api_key\\s*=\\s*[\"'][^\"']+[\"']",
      "severity": "CRITICAL",
      "description": "Hardcoded API keys detected"
    }
  }
}
```

### Conditional Workflows

Create workflows that only run under specific conditions:

```yaml
on:
  pull_request:
    paths:
      - 'src/**/*.js'
      - 'src/**/*.ts'
    branches:
      - main
      - develop
```

### Environment-Specific Configuration

Configure different compliance requirements for different environments:

```json
{
  "matrix": {
    "environments": ["development", "staging", "production"]
  },
  "environmentConfig": {
    "development": {
      "minScore": 60,
      "failOnViolations": false
    },
    "staging": {
      "minScore": 80,
      "failOnViolations": true
    },
    "production": {
      "minScore": 95,
      "failOnViolations": true
    }
  }
}
```

## Best Practices

### 1. Start with Warnings
Begin with `failOnViolations: false` to understand your compliance baseline before enforcing strict rules.

### 2. Use Matrix Builds
Test across multiple environments and Node.js versions to ensure compatibility.

### 3. Set Up Notifications
Configure Slack, email, or Teams notifications to stay informed about compliance issues.

### 4. Customize Rules
Define project-specific compliance rules that match your organization's requirements.

### 5. Monitor Trends
Use the trend analysis feature to track compliance improvements over time.

### 6. Integrate with Existing Workflows
Add compliance checking to existing CI/CD pipelines rather than creating separate workflows.

## Troubleshooting

### Common Issues

1. **Workflow not triggering**
   - Check trigger configuration
   - Verify file paths in `paths` filter
   - Ensure branch names match

2. **Violations not detected**
   - Verify regulation configuration
   - Check file patterns in custom rules
   - Ensure files are in the correct directories

3. **Notifications not sending**
   - Verify webhook URLs
   - Check GitHub secrets configuration
   - Ensure proper permissions

4. **PR comments not appearing**
   - Check GitHub token permissions
   - Verify PR number is correct
   - Ensure workflow has comment permissions

### Debug Mode

Enable debug logging to troubleshoot issues:

```yaml
- name: Run Compliance Check
  uses: juro/compliance-action@v1.0.0
  with:
    regulations: ["GDPR", "DORA"]
    debug: true
    log-level: debug
```

## Support

For issues and questions:

1. Check the [troubleshooting guide](#troubleshooting)
2. Review the [GitHub Issues](https://github.com/juro-compliant/juro-mcp-server/issues)
3. Contact support at [support@jurocompliant.com](mailto:support@jurocompliant.com)

## Examples

See the [examples directory](../examples/) for complete working examples:

- [Basic workflow setup](../examples/github-actions-example.js)
- [PR compliance checking](../examples/pr-compliance-example.js)
- [Custom rules configuration](../examples/custom-rules-example.js)
- [Team notifications](../examples/notifications-example.js)
