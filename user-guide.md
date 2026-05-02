# Juro User Guide

> **Complete guide to using Juro for compliance scanning and analysis**

## 📋 **Table of Contents**

1. [Getting Started](#getting-started)
2. [Basic Usage](#basic-usage)
3. [AI-Powered Features](#ai-powered-features)
4. [Integration Options](#integration-options)
5. [Advanced Features](#advanced-features)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 16+ installed
- Git repository (optional but recommended)
- Basic understanding of compliance requirements

### **Installation**

#### **Option 1: Global Installation**
```bash
npm install -g juro-mcp-server
```

#### **Option 2: Local Installation**
```bash
npm install juro-mcp-server
npx juro-mcp-server
```

#### **Option 3: Docker**
```bash
docker run -p 3000:3000 juro-mcp-server
```

### **First Run**
```bash
# Start the server
juro-mcp-server

# In another terminal, test the connection
juro scan --help
```

## 🔍 **Basic Usage**

### **1. Directory Scanning**
```bash
# Scan entire project
juro scan

# Scan specific directory
juro scan src/

# Scan with specific regulations
juro scan --regulations GDPR,SOC2

# Scan with custom severity threshold
juro scan --severity-threshold HIGH
```

### **2. File Scanning**
```bash
# Scan single file
juro scan src/auth.js

# Scan multiple files
juro scan src/auth.js src/database.js

# Scan with specific file types
juro scan --file-types .js,.ts,.py
```

### **3. Rule Management**
```bash
# List available rules
juro rules list

# Get rule details
juro rules details GDPR-001

# Validate specific rule
juro rules validate GDPR-001
```

## **Triage and Context**

Juro's findings include LLM-assisted triage notes (advisory metadata only — never enters the signed evidence set, per [AXIOM 4](https://github.com/jecertis/juro-workspace/blob/main/AXIOMS.md)).

### **Code Analysis with Context**
```bash
# Analyze code with context
juro analyze src/auth.js --context "authentication system"

# Get detailed analysis
juro analyze src/database.js --detailed

# Analyze with specific focus
juro analyze src/api.js --focus "data-privacy"
```

### **Auto-Discovery**
```bash
# Let Juro discover issues automatically
juro discover

# Discover with specific project type
juro discover --project-type "web-app"

# Discover with risk assessment
juro discover --assess-risks
```

## 🔗 **Integration Options**

### **1. GitHub Actions Integration**

#### **Setup**
```bash
# Add GitHub Actions workflow
juro github setup

# Or manually add to .github/workflows/compliance.yml
```

#### **Workflow Example**
```yaml
name: Compliance Check
on: [push, pull_request]
jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Compliance Check
        uses: juro/compliance-check@v1
        with:
          regulations: 'GDPR,SOC2'
          severity-threshold: 'MEDIUM'
          fail-on-violations: true
```

### **2. CLI Integration**

#### **Git Hooks**
```bash
# Setup pre-commit hook
juro git setup --hook pre-commit

# Setup pre-push hook
juro git setup --hook pre-push

# Setup both hooks
juro git setup --hook all
```

#### **Package Manager Integration**
```bash
# Add to package.json scripts
juro package setup

# Or manually add:
{
  "scripts": {
    "compliance:check": "juro scan",
    "compliance:fix": "juro scan --fix-suggestions"
  }
}
```

### **3. IDE Integration**

#### **VS Code Extension**
1. Install the Juro extension from VS Code Marketplace
2. Open your project
3. Use `Ctrl+Shift+P` → "Juro: Scan Current File"
4. View violations in the Problems panel

#### **Real-time Analysis**
- Violations are highlighted as you type
- Hover for detailed explanations
- Click for fix suggestions
- Use Command Palette for quick actions

## 🚀 **Advanced Features**

### **1. Risk Prediction**
```bash
# Predict compliance risks
juro predict-risks

# Get risk trends
juro trends --timeframe 30d

# Generate risk report
juro report --type risk --output risk-report.pdf
```

### **2. Learning System**
```bash
# Provide feedback on suggestions
juro feedback --issue-id "GDPR-001" --rating helpful

# Correct false positives
juro feedback --issue-id "SOC2-002" --correction "This is actually compliant"

# View learning progress
juro learning status
```

### **3. Conversational Interface**
```bash
# Start interactive session
juro chat

# Example conversation:
> Check my authentication system for GDPR compliance
< I found 3 GDPR violations in your auth system. Would you like me to explain them?
> Yes, explain the first one
< The first violation is about data storage. Your auth system stores user data in localStorage without encryption, which violates GDPR Article 32...
```

### **4. Custom Rules**
```bash
# Create custom rule
juro rules create --name "Custom-001" --pattern "password.*plaintext"

# Test custom rule
juro rules test Custom-001 --file test.js

# Deploy custom rule
juro rules deploy Custom-001
```

## 🔧 **Configuration**

### **Configuration File**
Create `juro.config.json` in your project root:

```json
{
  "regulations": ["GDPR", "SOC2"],
  "severityThreshold": "MEDIUM",
  "includePatterns": ["**/*.js", "**/*.ts", "**/*.py"],
  "excludePatterns": ["**/node_modules/**", "**/dist/**"],
  "maxFileSize": "50MB",
  "aiFeatures": {
    "enabled": true,
    "autoDiscovery": true,
    "learning": true
  },
  "integrations": {
    "github": {
      "enabled": true,
      "failOnViolations": true
    },
    "cli": {
      "enabled": true,
      "gitHooks": true
    }
  }
}
```

### **Environment Variables**
```bash
# Set log level
export JURO_LOG_LEVEL=debug

# Set server port
export JURO_PORT=3000

# Set API key (if using cloud features)
export JURO_API_KEY=your-api-key
```

## 🐛 **Troubleshooting**

### **Common Issues**

#### **1. Server Won't Start**
```bash
# Check if port is available
lsof -i :3000

# Try different port
juro-mcp-server --port 3001

# Check logs
juro-mcp-server --log-level debug
```

#### **2. No Violations Found**
```bash
# Check if files are being scanned
juro scan --verbose

# Verify file patterns
juro scan --list-files

# Check regulation configuration
juro rules list --regulations GDPR
```

#### **3. AI Features Not Working**
```bash
# Check AI service status
juro status --ai

# Restart AI services
juro restart --ai

# Check configuration
juro config --ai
```

### **Debug Mode**
```bash
# Enable debug logging
juro scan --debug

# Verbose output
juro scan --verbose

# Dry run (no actual scanning)
juro scan --dry-run
```

## 💡 **Best Practices**

### **1. Project Setup**
- Add `juro.config.json` to your project root
- Include `.juroignore` file for exclusions
- Set up git hooks for automated checking
- Configure IDE integration for real-time feedback

### **2. Compliance Workflow**
- Run scans before committing code
- Use GitHub Actions for automated checks
- Review violations regularly
- Provide feedback to improve AI accuracy

### **3. Team Collaboration**
- Share configuration files
- Use consistent severity thresholds
- Document custom rules
- Train team members on compliance requirements

### **4. Performance Optimization**
- Use appropriate file patterns
- Exclude unnecessary directories
- Set reasonable file size limits
- Use caching for large projects

## 📚 **Additional Resources**

- **[API Reference](api-reference.md)** - Complete API documentation
- **[Integration Guides](integrations/)** - Detailed integration instructions
- **[Examples](examples/)** - Practical examples and tutorials
- **[FAQ](faq.md)** - Frequently asked questions
- **[Community](https://github.com/yourusername/juro-mcp-server/discussions)** - Community discussions

---

**Need help?** Check out our [FAQ](faq.md) or join our [community discussions](https://github.com/yourusername/juro-mcp-server/discussions)!
