# CLI Tool Integration Guide

## Overview

The Juro CLI Tool provides a command-line interface for compliance scanning with smart setup and git integration. It offers one-command initialization, automatic project detection, and seamless integration with popular package managers.

## Features

### 🚀 **One-Command Setup**
- Automatic project type detection (Node.js, Python, Java, Go, Rust)
- Smart regulation mapping based on project type
- Configuration file generation
- Package manager integration

### 🔧 **Git Integration**
- Pre-commit hooks for staged file scanning
- Pre-push hooks for full project scanning
- Automatic compliance checking on commit/push
- Configurable failure thresholds

### 📊 **Multiple Output Formats**
- JSON for programmatic processing
- HTML for human-readable reports
- Markdown for documentation

### 📦 **Package Manager Support**
- npm, yarn, pnpm integration
- Automatic script generation
- Dependency management

## Quick Start

### 1. Initialize CLI Tool

```bash
# Basic initialization with auto-detection
juro-cli init /path/to/project

# With specific regulations
juro-cli init /path/to/project --regulations GDPR,DORA,DPDP

# With custom output format
juro-cli init /path/to/project --format html --git-hooks
```

### 2. Run Compliance Scan

```bash
# Scan entire project
juro-cli scan

# Scan specific files
juro-cli scan src/ --regulations GDPR

# Scan with custom thresholds
juro-cli scan --min-score 90 --fail-on-critical
```

### 3. Generate Reports

```bash
# Generate JSON report
juro-cli report --format json

# Generate HTML report
juro-cli report --format html --output ./reports/

# Generate Markdown report
juro-cli report --format markdown
```

## Configuration

### Configuration File (`juro-cli.config.json`)

```json
{
  "version": "1.0.0",
  "project": {
    "type": "Node.js",
    "path": "/path/to/project"
  },
  "compliance": {
    "regulations": ["GDPR", "DORA"],
    "thresholds": {
      "minScore": 80,
      "failOnCritical": true,
      "failOnHigh": false
    },
    "customRules": {}
  },
  "output": {
    "format": "json",
    "directory": "./compliance-reports"
  },
  "git": {
    "hooks": {
      "enabled": true,
      "types": ["pre-commit", "pre-push"]
    }
  },
  "packageManager": {
    "type": "npm",
    "scripts": {
      "compliance:scan": "juro-cli scan",
      "compliance:check": "juro-cli check --fail-on-critical",
      "compliance:report": "juro-cli report --format html"
    }
  }
}
```

## MCP Integration

### Available MCP Tools

#### `cli/initialize`
Initialize CLI tool with smart setup and git integration.

**Parameters:**
- `projectPath` (string, required): Path to the project directory
- `autoDetect` (boolean, optional): Enable auto-detection of project type and regulations
- `regulations` (array, optional): List of compliance regulations to check
- `outputFormat` (string, optional): Output format for reports (json, html, markdown)
- `gitHooks` (boolean, optional): Install git hooks for compliance checking
- `packageManager` (string, optional): Package manager to use (npm, yarn, pnpm)
- `customRules` (object, optional): Custom compliance rules configuration
- `thresholds` (object, optional): Compliance thresholds

**Example:**
```json
{
  "method": "cli/initialize",
  "params": {
    "projectPath": "/path/to/project",
    "autoDetect": true,
    "regulations": ["GDPR", "DORA"],
    "outputFormat": "html",
    "gitHooks": true,
    "packageManager": "npm"
  }
}
```

#### `cli/scan`
Run compliance scan via CLI.

**Parameters:**
- `projectPath` (string, required): Path to the project directory
- `regulations` (array, optional): List of compliance regulations to check
- `format` (string, optional): Output format for the scan
- `failOnCritical` (boolean, optional): Fail the scan if critical violations are found
- `minScore` (number, optional): Minimum compliance score required

**Example:**
```json
{
  "method": "cli/scan",
  "params": {
    "projectPath": "/path/to/project",
    "regulations": ["GDPR"],
    "format": "json",
    "failOnCritical": true,
    "minScore": 80
  }
}
```

#### `cli/report`
Generate compliance report in specified format.

**Parameters:**
- `projectPath` (string, required): Path to the project directory
- `format` (string, optional): Output format for the report
- `violations` (array, required): List of violations to include in the report
- `score` (number, required): Compliance score

**Example:**
```json
{
  "method": "cli/report",
  "params": {
    "projectPath": "/path/to/project",
    "format": "html",
    "violations": [
      {
        "id": "gdpr-001",
        "rule": "Personal Data Detection",
        "severity": "HIGH",
        "file": "src/user-service.js",
        "line": 42,
        "description": "Potential personal data exposure detected"
      }
    ],
    "score": 85
  }
}
```

#### `cli/setup-git-hooks`
Setup git hooks for automatic compliance checking.

**Parameters:**
- `projectPath` (string, required): Path to the project directory
- `regulations` (array, optional): List of compliance regulations to check
- `hookTypes` (array, optional): Types of git hooks to install

**Example:**
```json
{
  "method": "cli/setup-git-hooks",
  "params": {
    "projectPath": "/path/to/project",
    "regulations": ["GDPR", "DORA"],
    "hookTypes": ["pre-commit", "pre-push"]
  }
}
```

#### `cli/setup-package-manager`
Setup package manager integration with compliance scripts.

**Parameters:**
- `projectPath` (string, required): Path to the project directory
- `packageManager` (string, optional): Package manager to use
- `regulations` (array, optional): List of compliance regulations to check

**Example:**
```json
{
  "method": "cli/setup-package-manager",
  "params": {
    "projectPath": "/path/to/project",
    "packageManager": "npm",
    "regulations": ["GDPR"]
  }
}
```

## Project Type Detection

### Supported Project Types

| Project Type | Detection Files | Default Regulations |
|--------------|----------------|-------------------|
| Node.js | `package.json` | GDPR, DORA, DPDP |
| Python | `requirements.txt` | GDPR, DORA, DPDP |
| Java | `pom.xml` | GDPR, DORA, DPDP |
| Go | `go.mod` | GDPR, DORA, DPDP |
| Rust | `Cargo.toml` | GDPR, DORA, DPDP |

### Package Manager Detection

| Package Manager | Detection Files |
|----------------|----------------|
| npm | `package-lock.json` |
| yarn | `yarn.lock` |
| pnpm | `pnpm-lock.yaml` |

## Git Hooks

### Pre-commit Hook
Runs compliance check on staged files before commit.

```bash
#!/bin/bash
# Juro Compliance Pre-commit Hook

echo "🔍 Running compliance check..."

# Run compliance scan on staged files
juro-cli scan --staged --regulations GDPR,DORA,DPDP --fail-on-critical

if [ $? -ne 0 ]; then
    echo "❌ Compliance check failed. Please fix violations before committing."
    exit 1
fi

echo "✅ Compliance check passed!"
exit 0
```

### Pre-push Hook
Runs full compliance check before push.

```bash
#!/bin/bash
# Juro Compliance Pre-push Hook

echo "🔍 Running full compliance check before push..."

# Run full compliance scan
juro-cli scan --regulations GDPR,DORA,DPDP --fail-on-critical --min-score 80

if [ $? -ne 0 ]; then
    echo "❌ Compliance check failed. Please fix violations before pushing."
    exit 1
fi

echo "✅ Compliance check passed! Safe to push."
exit 0
```

## Output Formats

### JSON Format
```json
{
  "timestamp": "2024-12-11T10:30:00.000Z",
  "score": 85,
  "violations": [
    {
      "id": "gdpr-001",
      "rule": "Personal Data Detection",
      "severity": "HIGH",
      "file": "src/user-service.js",
      "line": 42,
      "description": "Potential personal data exposure detected"
    }
  ],
  "summary": {
    "total": 1,
    "bySeverity": {
      "HIGH": 1,
      "MEDIUM": 0,
      "LOW": 0
    }
  }
}
```

### HTML Format
Generates a styled HTML report with:
- Compliance score visualization
- Violation details with severity indicators
- File and line number references
- Summary statistics

### Markdown Format
```markdown
# Compliance Report

**Generated:** 12/11/2024, 10:30:00 AM
**Score:** 85/100

## Violations (1)

### Personal Data Detection (HIGH)
- **File:** src/user-service.js:42
- **Description:** Potential personal data exposure detected

## Summary
- **Total Violations:** 1
- **High Severity:** 1
- **Medium Severity:** 0
- **Low Severity:** 0
```

## Error Handling

### Common Errors

| Error | Description | Solution |
|-------|-------------|----------|
| `Project directory does not exist` | Invalid project path | Verify the project path exists |
| `Failed to scan directory: Permission denied` | Insufficient permissions | Check file permissions |
| `No package.json found` | Not a valid Node.js project | Run in a valid project directory |
| `Git hooks installation failed` | Git repository not found | Initialize git repository first |

### Error Response Format

```json
{
  "success": false,
  "projectType": "unknown",
  "detectedRegulations": [],
  "configFile": "",
  "gitHooksInstalled": false,
  "packageManagerConfig": {},
  "cliCommand": "",
  "nextSteps": [],
  "errors": ["Project directory does not exist"]
}
```

## Best Practices

### 1. Project Setup
- Always run `juro-cli init` in the project root directory
- Use auto-detection for standard project types
- Configure custom rules for project-specific requirements

### 2. Git Integration
- Enable git hooks for automatic compliance checking
- Use pre-commit hooks for quick feedback
- Use pre-push hooks for comprehensive validation

### 3. Output Management
- Use JSON format for CI/CD integration
- Use HTML format for human review
- Use Markdown format for documentation

### 4. Threshold Configuration
- Set appropriate minimum scores based on project requirements
- Use critical violation blocking for production code
- Adjust thresholds based on team experience

## Examples

### Node.js Project Setup
```bash
# Initialize CLI tool
juro-cli init ./my-node-project --regulations GDPR,DORA,DPDP --format html

# Install dependencies
npm install

# Run compliance scan
npm run compliance:scan

# Generate report
npm run compliance:report
```

### Python Project Setup
```bash
# Initialize CLI tool
juro-cli init ./my-python-project --auto-detect --git-hooks

# Run compliance scan
juro-cli scan --regulations GDPR,DORA,DPDP

# Generate Markdown report
juro-cli report --format markdown
```

### CI/CD Integration
```yaml
# GitHub Actions example
- name: Run Compliance Check
  run: |
    juro-cli scan --regulations GDPR,DORA,DPDP --format json --fail-on-critical
    juro-cli report --format html --output ./compliance-reports/
```

## Troubleshooting

### CLI Not Found
```bash
# Install globally
npm install -g @juro/cli

# Or use npx
npx @juro/cli init ./project
```

### Permission Issues
```bash
# Make scripts executable
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/pre-push
```

### Configuration Issues
```bash
# Reset configuration
rm juro-cli.config.json
juro-cli init ./project
```

## Support

For more information and support:
- Documentation: [docs.jurocompliant.com](https://docs.jurocompliant.com)
- GitHub: [github.com/juro-compliant/cli](https://github.com/juro-compliant/cli)
- Issues: [github.com/juro-compliant/cli/issues](https://github.com/juro-compliant/cli/issues)
