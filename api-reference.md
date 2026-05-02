# Juro API Reference

> **Complete reference for Juro MCP tools and API endpoints**

## 📋 **Table of Contents**

1. [MCP Tools Overview](#mcp-tools-overview)
2. [Core Compliance Tools](#core-compliance-tools)
3. [GitHub Actions Tools](#github-actions-tools)
4. [CLI Tools](#cli-tools)
5. [AI Agent Tools](#ai-agent-tools)
6. [Error Handling](#error-handling)
7. [Response Formats](#response-formats)

## 🔧 **MCP Tools Overview**

Juro provides 20+ MCP tools organized into four categories:

- **Core Compliance Tools** (5 tools) - Basic scanning and rule management
- **GitHub Actions Tools** (5 tools) - CI/CD integration
- **CLI Tools** (5 tools) - Command-line interface
- **Agent Tools** (8 tools) - LLM-assisted *triage* tools (advisory metadata only; deterministic findings remain the signed source of truth per [AXIOM 4](https://github.com/jecertis/juro-workspace/blob/main/AXIOMS.md))

## 🔍 **Core Compliance Tools**

### **1. scan_directory**

Scans a directory for compliance violations.

**Parameters:**
```json
{
  "path": "string (required)",
  "regulations": ["string"],
  "severityThreshold": "string",
  "includePatterns": ["string"],
  "excludePatterns": ["string"],
  "maxFileSize": "string"
}
```

**Example:**
```json
{
  "path": "/path/to/project",
  "regulations": ["GDPR", "SOC2"],
  "severityThreshold": "MEDIUM"
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "violations": [
      {
        "id": "GDPR-001",
        "rule": "Data Storage Encryption",
        "severity": "HIGH",
        "file": "src/auth.js",
        "line": 15,
        "description": "User data stored without encryption",
        "suggestion": "Use encrypted storage solution"
      }
    ],
    "summary": {
      "totalViolations": 1,
      "highSeverity": 1,
      "mediumSeverity": 0,
      "lowSeverity": 0
    },
    "scanTime": 1250
  }
}
```

### **2. scan_file**

Scans a single file for compliance violations.

**Parameters:**
```json
{
  "file_path": "string (required)",
  "regulations": ["string"],
  "severityThreshold": "string"
}
```

### **3. list_rules**

Lists available compliance rules.

**Parameters:**
```json
{
  "regulations": ["string"],
  "categories": ["string"],
  "severity": "string"
}
```

### **4. get_rule_details**

Gets detailed information about a specific rule.

**Parameters:**
```json
{
  "rule_id": "string (required)"
}
```

### **5. validate_rule**

Validates a rule against a code snippet.

**Parameters:**
```json
{
  "rule_id": "string (required)",
  "code": "string (required)"
}
```

## 🚀 **GitHub Actions Tools**

### **1. add_github_action**

Adds a compliance check workflow to GitHub Actions.

**Parameters:**
```json
{
  "workflow_name": "string",
  "regulations": ["string"],
  "trigger_events": ["string"],
  "custom_rules": ["string"],
  "thresholds": {
    "max_violations": "number",
    "severity_threshold": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "workflowPath": ".github/workflows/compliance.yml",
    "workflowContent": "name: Compliance Check\non: [push, pull_request]...",
    "status": "created"
  }
}
```

### **2. run_pr_compliance_check**

Runs compliance check on a pull request.

**Parameters:**
```json
{
  "pr_number": "number (required)",
  "regulations": ["string"],
  "comment_on_pr": "boolean"
}
```

### **3. generate_compliance_report**

Generates a compliance report for the repository.

**Parameters:**
```json
{
  "report_type": "string",
  "time_range": "string",
  "format": "string",
  "include_trends": "boolean"
}
```

### **4. setup_github_integration**

Sets up GitHub integration for the repository.

**Parameters:**
```json
{
  "repository": "string (required)",
  "access_token": "string (required)",
  "webhook_url": "string"
}
```

### **5. get_compliance_trends**

Gets compliance trends over time.

**Parameters:**
```json
{
  "time_range": "string",
  "granularity": "string"
}
```

## 💻 **CLI Tools**

### **1. setup_compliance**

Sets up compliance checking for a project.

**Parameters:**
```json
{
  "project_path": "string (required)",
  "regulations": ["string"],
  "package_manager": "string",
  "git_integration": "boolean"
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "configFile": "juro.config.json",
    "gitHooks": ["pre-commit", "pre-push"],
    "packageScripts": {
      "compliance:check": "juro scan",
      "compliance:fix": "juro scan --fix-suggestions"
    },
    "status": "configured"
  }
}
```

### **2. scan_project**

Scans the entire project for compliance issues.

**Parameters:**
```json
{
  "project_path": "string",
  "regulations": ["string"],
  "output_format": "string",
  "fix_suggestions": "boolean"
}
```

### **3. generate_report**

Generates a compliance report.

**Parameters:**
```json
{
  "report_type": "string",
  "output_path": "string",
  "format": "string",
  "include_details": "boolean"
}
```

### **4. setup_git_hooks**

Sets up git hooks for automated compliance checking.

**Parameters:**
```json
{
  "hook_types": ["string"],
  "regulations": ["string"],
  "fail_on_violations": "boolean"
}
```

### **5. check_compliance_status**

Checks the current compliance status of the project.

**Parameters:**
```json
{
  "project_path": "string",
  "detailed": "boolean"
}
```

## 🤖 **AI Agent Tools**

### **1. process_natural_language_query**

Processes natural language queries for compliance analysis.

**Parameters:**
```json
{
  "query": "string (required)",
  "context": {
    "projectType": "string",
    "currentFile": "string",
    "regulations": ["string"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "understood": true,
    "action": "scan_compliance",
    "parameters": {
      "regulations": ["GDPR"]
    },
    "response": "I'll scan your code for GDPR compliance issues.",
    "clarification": null
  }
}
```

### **2. analyze_code_intelligently**

Analyzes code with intelligent context understanding.

**Parameters:**
```json
{
  "code": "string (required)",
  "context": {
    "file": "string",
    "function": "string",
    "projectType": "string",
    "surroundingCode": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "complianceIssues": [
      {
        "type": "data_storage",
        "severity": "HIGH",
        "description": "Storing user data in localStorage without encryption",
        "regulation": "GDPR",
        "lineNumber": 1,
        "suggestions": ["Use encrypted storage", "Implement data retention policy"]
      }
    ],
    "contextAnalysis": {
      "functionPurpose": "user_authentication",
      "dataFlow": "client_storage",
      "riskLevel": "high"
    },
    "confidence": 0.92
  }
}
```

### **3. auto_discover_compliance_issues**

Automatically discovers compliance issues in codebase.

**Parameters:**
```json
{
  "codebase": {
    "path": "string (required)",
    "files": ["string"],
    "projectType": "string",
    "technologies": ["string"]
  }
}
```

### **4. generate_intelligent_suggestions**

Generates intelligent fix suggestions for violations.

**Parameters:**
```json
{
  "violation": {
    "type": "string (required)",
    "severity": "string (required)",
    "code": "string (required)",
    "regulation": "string (required)",
    "context": "object"
  }
}
```

### **5. explain_violation_intelligently**

Explains violations in natural language.

**Parameters:**
```json
{
  "violation": {
    "type": "string (required)",
    "severity": "string (required)",
    "code": "string (required)",
    "regulation": "string (required)",
    "context": "object"
  }
}
```

### **6. predict_compliance_risks**

Predicts compliance risks based on project data.

**Parameters:**
```json
{
  "projectData": {
    "metrics": {
      "codeComplexity": "string",
      "securityIssues": "number",
      "dataHandling": "string",
      "userDataVolume": "string"
    },
    "patterns": ["string"],
    "technologies": ["string"]
  }
}
```

### **7. generate_conversational_response**

Generates conversational response maintaining context.

**Parameters:**
```json
{
  "conversation": {
    "messages": [
      {
        "role": "string (required)",
        "content": "string (required)"
      }
    ],
    "context": "object"
  }
}
```

### **8. learn_from_user_feedback**

Learns and improves from user feedback.

**Parameters:**
```json
{
  "feedback": {
    "issueId": "string (required)",
    "userRating": "string (required)",
    "userComment": "string",
    "correction": "string"
  }
}
```

## ❌ **Error Handling**

### **Error Response Format**
```json
{
  "success": false,
  "error": "string",
  "code": "string",
  "details": "object"
}
```

### **Common Error Codes**

| Code | Description | Solution |
|------|-------------|----------|
| `INVALID_PATH` | Invalid file or directory path | Check path exists and is accessible |
| `UNSUPPORTED_FILE` | File type not supported | Use supported file extensions |
| `RULE_NOT_FOUND` | Rule ID not found | Check available rules with `list_rules` |
| `INVALID_REGULATION` | Invalid regulation specified | Use supported regulations |
| `SCAN_FAILED` | Scan operation failed | Check file permissions and content |
| `AI_SERVICE_UNAVAILABLE` | AI service not available | Restart AI services or check configuration |

### **Error Examples**

#### **Invalid Path Error**
```json
{
  "success": false,
  "error": "Path '/invalid/path' does not exist",
  "code": "INVALID_PATH",
  "details": {
    "path": "/invalid/path",
    "suggestion": "Check if the path exists and is accessible"
  }
}
```

#### **Rule Not Found Error**
```json
{
  "success": false,
  "error": "Rule 'INVALID-RULE' not found",
  "code": "RULE_NOT_FOUND",
  "details": {
    "ruleId": "INVALID-RULE",
    "availableRules": ["GDPR-001", "SOC2-001", "OWASP-001"]
  }
}
```

## 📊 **Response Formats**

### **Success Response**
```json
{
  "success": true,
  "result": "object"
}
```

### **Violation Object**
```json
{
  "id": "string",
  "rule": "string",
  "severity": "HIGH|MEDIUM|LOW",
  "file": "string",
  "line": "number",
  "column": "number",
  "description": "string",
  "suggestion": "string",
  "regulation": "string",
  "category": "string",
  "confidence": "number"
}
```

### **Scan Summary**
```json
{
  "totalViolations": "number",
  "highSeverity": "number",
  "mediumSeverity": "number",
  "lowSeverity": "number",
  "scanTime": "number",
  "filesScanned": "number",
  "regulations": ["string"]
}
```

## 🔧 **Configuration**

### **Global Configuration**
```json
{
  "regulations": ["GDPR", "SOC2", "OWASP"],
  "severityThreshold": "MEDIUM",
  "includePatterns": ["**/*.js", "**/*.ts", "**/*.py"],
  "excludePatterns": ["**/node_modules/**", "**/dist/**"],
  "maxFileSize": "50MB",
  "aiFeatures": {
    "enabled": true,
    "autoDiscovery": true,
    "learning": true
  }
}
```

### **Tool-Specific Configuration**
Each tool can accept additional configuration parameters as needed. Refer to individual tool documentation for specific configuration options.

---

**Need more details?** Check out our [User Guide](user-guide.md) or [Examples](examples/) for practical usage examples.
