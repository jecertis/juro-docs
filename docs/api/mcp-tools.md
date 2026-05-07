---
id: mcp-tools
title: MCP Tools
sidebar_label: MCP Tools
---

# MCP Tools

Learn how to use Juro's Model Context Protocol (MCP) tools for compliance scanning.

## Overview

Juro provides MCP tools that allow AI assistants to interact with codebases and perform compliance analysis for GDPR, DORA, and DPDP regulations.

## Available Tools

### `scan_directory`

Scans a directory for compliance violations.

```json
{
  "name": "scan_directory",
  "description": "Scan directory for compliance violations",
  "parameters": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "Path to the directory to scan"
      },
      "regulations": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Regulations to check (gdpr, dora, dpdp)"
      },
      "severityThreshold": {
        "type": "string",
        "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
        "description": "Minimum severity to report"
      }
    },
    "required": ["path"]
  }
}
```

**Example Usage:**
```bash
# Scan for GDPR compliance
juro scan ./my-project --regulations gdpr --format json

# Scan for multiple regulations
juro scan ./my-project --regulations gdpr,dora,dpdp --format json
```

### `scan_file`

Analyzes a specific file for compliance issues.

```json
{
  "name": "scan_file",
  "description": "Analyze a specific file for compliance violations",
  "parameters": {
    "type": "object",
    "properties": {
      "file_path": {
        "type": "string",
        "description": "Path to the file to analyze"
      },
      "regulations": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Regulations to check"
      }
    },
    "required": ["file_path"]
  }
}
```

**Example Usage:**
```bash
# Analyze a specific file
juro scan src/auth.js --regulations gdpr,dora
```

### `list_rules`

Lists available compliance rules.

```json
{
  "name": "list_rules",
  "description": "List available compliance rules",
  "parameters": {
    "type": "object",
    "properties": {
      "regulations": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Filter by regulations"
      },
      "severity": {
        "type": "string",
        "description": "Filter by severity level"
      }
    }
  }
}
```

### `get_rule_details`

Gets detailed information about a specific rule.

```json
{
  "name": "get_rule_details",
  "description": "Get details for a specific compliance rule",
  "parameters": {
    "type": "object",
    "properties": {
      "rule_id": {
        "type": "string",
        "description": "Rule identifier (e.g., gdpr/article32-001)"
      }
    },
    "required": ["rule_id"]
  }
}
```

### `validate_rule`

Validates a rule against a code snippet.

```json
{
  "name": "validate_rule",
  "description": "Validate a rule against code",
  "parameters": {
    "type": "object",
    "properties": {
      "rule_id": {
        "type": "string",
        "description": "Rule identifier"
      },
      "code": {
        "type": "string",
        "description": "Code snippet to validate against"
      }
    },
    "required": ["rule_id", "code"]
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
      "args": ["@juro/mcp-server"]
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
        "args": ["@juro/mcp-server"]
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

- `INVALID_PATH` - The specified path does not exist
- `INVALID_RULES` - One or more specified rules are not supported
- `RULE_NOT_FOUND` - Rule ID not found
- `SCAN_FAILED` - The scan operation failed

## Best Practices

### 1. Use Specific Regulations
Specify only the regulations you need:

```bash
# Good: Specific regulations
juro scan --regulations gdpr,dora

# Avoid: Unnecessary regulations
juro scan --regulations gdpr,dora,dpdp
```

### 2. Use Appropriate Output Formats
Choose the right format for your use case:

- `json` - For programmatic processing
- `text` - For human-readable output

## Troubleshooting

### Common Issues

1. **Tool Not Found**
   - Ensure Juro MCP server is properly installed
   - Check your AI assistant's MCP configuration

2. **Permission Denied**
   - Verify file system permissions

3. **Scan Timeout**
   - Reduce the scope of your scan
   - Use more specific regulations

### Getting Help

- Review error codes in the response
- Check the documentation for configuration options
