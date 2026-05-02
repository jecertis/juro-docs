---
id: mcp-tools
title: MCP Tools
sidebar_label: MCP Tools
---

# MCP Tools

Learn how to use Juro's Model Context Protocol (MCP) tools for compliance scanning and GitHub Actions integration from AI agents.

## Overview

Juro v2.0.0 provides a comprehensive set of MCP tools that allow AI assistants to interact with your codebase, perform compliance analysis, and manage GitHub Actions workflows. These tools enable natural language queries about your code's compliance status and automated CI/CD integration.

## Available Tools

### Compliance Scanning Tools

### `scan_codebase`

Scans your entire codebase for compliance violations.

```json
{
  "name": "scan_codebase",
  "description": "Scan codebase for compliance violations",
  "parameters": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "Path to the codebase to scan"
      },
      "rules": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Compliance rules to check (e.g., 'gdpr', 'soc2', 'owasp')"
      },
      "format": {
        "type": "string",
        "enum": ["json", "sarif", "text"],
        "description": "Output format for scan results"
      }
    },
    "required": ["path"]
  }
}
```

**Example Usage:**
```bash
# Scan for GDPR compliance
juro scan --path ./my-project --rules gdpr --format json

# Scan for multiple compliance standards
juro scan --path ./my-project --rules gdpr,soc2,owasp --format sarif
```

### `analyze_file`

Analyzes a specific file for compliance issues.

```json
{
  "name": "analyze_file",
  "description": "Analyze a specific file for compliance violations",
  "parameters": {
    "type": "object",
    "properties": {
      "file_path": {
        "type": "string",
        "description": "Path to the file to analyze"
      },
      "rules": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Compliance rules to check"
      }
    },
    "required": ["file_path"]
  }
}
```

**Example Usage:**
```bash
# Analyze a specific file
juro analyze --file ./src/auth.js --rules gdpr,owasp
```

### GitHub Actions Tools (v2.0.0)

### `add_github_workflow`

Adds a compliance workflow to your GitHub repository.

```json
{
  "name": "add_github_workflow",
  "description": "Add a compliance workflow to GitHub repository",
  "parameters": {
    "type": "object",
    "properties": {
      "repo_path": {
        "type": "string",
        "description": "Path to the local repository"
      },
      "workflow_config": {
        "type": "object",
        "properties": {
          "name": {"type": "string"},
          "trigger": {"type": "string", "enum": ["push", "pull_request", "schedule"]},
          "regulations": {"type": "array", "items": {"type": "string"}},
          "fail_on_violations": {"type": "boolean"},
          "fail_on_critical": {"type": "boolean"},
          "min_score": {"type": "number"}
        }
      }
    },
    "required": ["repo_path", "workflow_config"]
  }
}
```

**Example Usage:**
```bash
# Add GDPR compliance workflow
juro add-workflow --repo ./my-project --config gdpr-workflow.json
```

### `create_pr_workflow`

Creates a PR-specific compliance workflow with automatic commenting.

```json
{
  "name": "create_pr_workflow",
  "description": "Create a PR-specific compliance workflow",
  "parameters": {
    "type": "object",
    "properties": {
      "repo_path": {"type": "string"},
      "pr_config": {
        "type": "object",
        "properties": {
          "comment_on_violations": {"type": "boolean"},
          "fail_on_critical": {"type": "boolean"},
          "notify_channels": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    "required": ["repo_path", "pr_config"]
  }
}
```

### `run_pr_compliance_check`

Runs compliance check on a specific pull request.

```json
{
  "name": "run_pr_compliance_check",
  "description": "Run compliance check on a pull request",
  "parameters": {
    "type": "object",
    "properties": {
      "pr_data": {
        "type": "object",
        "properties": {
          "number": {"type": "number"},
          "base_branch": {"type": "string"},
          "head_branch": {"type": "string"},
          "changed_files": {"type": "array", "items": {"type": "string"}}
        }
      },
      "options": {
        "type": "object",
        "properties": {
          "regulations": {"type": "array", "items": {"type": "string"}},
          "severity_threshold": {"type": "string", "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"]}
        }
      }
    },
    "required": ["pr_data"]
  }
}
```

### `generate_compliance_report`

Generates detailed compliance reports in multiple formats.

```json
{
  "name": "generate_compliance_report",
  "description": "Generate compliance report from scan results",
  "parameters": {
    "type": "object",
    "properties": {
      "scan_results": {"type": "object"},
      "report_options": {
        "type": "object",
        "properties": {
          "format": {"type": "string", "enum": ["markdown", "html", "json", "sarif"]},
          "include_details": {"type": "boolean"},
          "include_trends": {"type": "boolean"},
          "group_by": {"type": "array", "items": {"type": "string"}}
        }
      }
    },
    "required": ["scan_results"]
  }
}
```

### `send_compliance_notifications`

Sends compliance notifications to team channels.

```json
{
  "name": "send_compliance_notifications",
  "description": "Send compliance notifications to team channels",
  "parameters": {
    "type": "object",
    "properties": {
      "compliance_data": {"type": "object"},
      "notification_config": {
        "type": "object",
        "properties": {
          "slack": {"type": "object", "properties": {"webhook": {"type": "string"}}},
          "email": {"type": "object", "properties": {"recipients": {"type": "array", "items": {"type": "string"}}}},
          "teams": {"type": "object", "properties": {"webhook": {"type": "string"}}}
        }
      }
    },
    "required": ["compliance_data", "notification_config"]
  }
}
```

## Integration Examples

### With Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "juro": {
      "command": "npx",
      "args": ["@juro/mcp-server"],
      "env": {
        "JURO_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### With Cursor

Add to your Cursor settings:

```json
{
  "mcp": {
    "servers": {
      "juro": {
        "command": "npx",
        "args": ["@juro/mcp-server"],
        "env": {
          "JURO_API_KEY": "your-api-key-here"
        }
      }
    }
  }
}
```

## Error Handling

All MCP tools return structured error responses:

```json
{
  "error": {
    "code": "INVALID_PATH",
    "message": "The specified path does not exist",
    "details": {
      "path": "/nonexistent/path"
    }
  }
}
```

### Common Error Codes

#### Compliance Scanning Errors
- `INVALID_PATH` - The specified path does not exist
- `INVALID_RULES` - One or more specified rules are not supported
- `API_KEY_MISSING` - API key is not configured
- `RATE_LIMIT_EXCEEDED` - Too many requests in a short time
- `SCAN_FAILED` - The scan operation failed

#### GitHub Actions Errors (v2.0.0)
- `GITHUB_TOKEN_MISSING` - GitHub token is not configured
- `REPO_NOT_FOUND` - Repository not found or inaccessible
- `WORKFLOW_CREATION_FAILED` - Failed to create GitHub workflow
- `PR_CHECK_FAILED` - Pull request compliance check failed
- `NOTIFICATION_FAILED` - Failed to send team notifications
- `REPORT_GENERATION_FAILED` - Failed to generate compliance report

## Best Practices

### 1. Use Specific Rules
Instead of scanning for all rules, specify only the ones you need:

```bash
# Good: Specific rules
juro scan --rules gdpr,owasp

# Avoid: All rules (slower)
juro scan --rules all
```

### 2. Batch Operations
For multiple files, use the codebase scan instead of individual file analysis:

```bash
# Good: Scan entire directory
juro scan --path ./src

# Avoid: Multiple individual scans
juro analyze --file ./src/auth.js
juro analyze --file ./src/user.js
juro analyze --file ./src/payment.js
```

### 3. Use Appropriate Output Formats
Choose the right format for your use case:

- `json` - For programmatic processing
- `sarif` - For security tools integration
- `text` - For human-readable output

## Troubleshooting

### Common Issues

1. **Tool Not Found**
   - Ensure Juro MCP server is properly installed
   - Check your AI assistant's MCP configuration

2. **Permission Denied**
   - Verify API key is correct
   - Check file system permissions

3. **Scan Timeout**
   - Reduce the scope of your scan
   - Use more specific rules

### Getting Help

- Check the [FAQ](/docs/support/faq) for common questions
- Review [Error Codes](/docs/api/error-codes) for detailed error information
- Contact support for additional assistance
