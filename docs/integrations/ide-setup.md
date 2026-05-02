---
id: ide-setup
title: VS Code Extension
sidebar_label: VS Code Extension
description: 'Real-time compliance scanning with inline violation highlighting and compliance scoring'
keywords: [VS Code, extension, real-time scanning, IDE integration, compliance scoring]
---

# VS Code Extension

Juro's VS Code extension provides real-time compliance scanning with inline violation highlighting, compliance scoring, and zero-configuration setup.

## Features

### **Real-Time Compliance Scanning**
- **Instant Feedback**: Get compliance violations as you type
- **Auto-Scan on Save**: Automatic scanning when files are saved
- **Auto-Scan on Open**: Compliance validation when files are opened
- **Workspace Monitoring**: Continuous compliance monitoring for workspace changes

### **Visual Feedback**
- **Inline Violations**: Red/yellow/green underlines for violation severity
- **Hover Tooltips**: Rich information with fix suggestions
- **Status Bar**: Color-coded compliance status (green/yellow/red)
- **Sidebar Views**: Organized violation and score information

### **Interactive Elements**
- **Command Palette**: Quick access to compliance commands
- **Context Menus**: Right-click scanning options
- **Clickable Violations**: Navigate directly to violation locations
- **Fix Suggestions**: Actionable recommendations for compliance issues

## Installation

### **From VS Code Marketplace**
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Juro Compliance"
4. Click Install

### **From VSIX Package**
1. Download the `.vsix` file from releases
2. Open VS Code
3. Go to Extensions → "..." → "Install from VSIX"
4. Select the downloaded file

## Configuration

### **Extension Settings**
```json
{
  "juro.mcpPort": 3000,
  "juro.autoScan": true,
  "juro.inlineViolations": true,
  "juro.severityThreshold": "MEDIUM"
}
```

### **Available Settings**
- `juro.mcpPort`: MCP server port (default: 3000)
- `juro.autoScan`: Enable automatic scanning (default: true)
- `juro.inlineViolations`: Show inline violation highlighting (default: true)
- `juro.severityThreshold`: Minimum severity to display (LOW, MEDIUM, HIGH, CRITICAL)

## Commands

### **Available Commands**
- `juro.scanWorkspace` - Scan entire workspace
- `juro.scanFile` - Scan current file
- `juro.showComplianceScore` - Display the per-regulation Posture Score (see the [Posture Score contract](https://github.com/jecertis/juro-platform/blob/main/contracts/posture-score.md))
- `juro.showViolations` - Show violations panel
- `juro.fixViolation` - Apply suggested fix

### **Command Palette Usage**
1. Press `Ctrl+Shift+P` (Cmd+Shift+P on Mac)
2. Type "Juro" to see available commands
3. Select the desired command

## Status Bar Integration

### **Compliance Status**
- **Green**: No violations or only low-severity issues
- **Yellow**: Medium-severity violations present
- **Red**: High or critical violations present

### **Status Bar Items**
- **Workspace Compliance**: Overall workspace compliance status
- **File Compliance**: Current file compliance status
- **Posture Score (DPDP)**: Numeric Posture Score for the wedge regulation, scoped per the [Posture Score contract](https://github.com/jecertis/juro-platform/blob/main/contracts/posture-score.md). Tooltip names the rule pack and surface; cross-regulation aggregates are out of scope.

## Sidebar Views

### **Violations Tree**
- Hierarchical view of all violations
- Grouped by file and severity
- Click to navigate to violation location
- Right-click for context menu options

### **Posture Scores**
- Real-time per-regulation Posture Score (DPDP / GDPR / DORA)
- Each score scoped to its rule pack — version + sha visible alongside the number
- Trend analysis over time per regulation (no cross-regulation aggregate; see the [Posture Score contract](https://github.com/jecertis/juro-platform/blob/main/contracts/posture-score.md))
- Performance metrics

## Real-Time Scanning

### **How It Works**
1. **File Change Detection**: Extension monitors file changes
2. **MCP Communication**: Sends scan requests to Juro MCP server
3. **Violation Analysis**: Server analyzes code for compliance issues
4. **Visual Updates**: Extension updates UI with results

### **Performance Optimization**
- **File Size Limits**: Skip files larger than 1MB for performance
- **Incremental Updates**: Only update changed components
- **Caching**: Intelligent caching of Posture Score values
- **Async Operations**: Non-blocking compliance scanning

## Troubleshooting

### **Common Issues**

#### **Extension Not Working**
- Ensure Juro MCP server is running
- Check MCP port configuration
- Verify API key is set correctly

#### **No Violations Showing**
- Check severity threshold setting
- Ensure files are in supported languages
- Verify MCP server connection

#### **Performance Issues**
- Reduce auto-scan frequency
- Exclude large directories
- Check file size limits

### **Debug Mode**
Enable debug logging in VS Code settings:
```json
{
  "juro.debug": true,
  "juro.logLevel": "debug"
}
```

## Supported File Types

### **Programming Languages**
- TypeScript, JavaScript, Python, Java, C#, Go, Rust
- PHP, Ruby, Swift, Kotlin, Scala
- HTML, CSS, SCSS, Less, Vue, Svelte

### **Configuration Files**
- JSON, YAML, XML, TOML, INI
- Docker, Kubernetes, Terraform
- GitHub Actions, GitLab CI

### **Documentation**
- Markdown, AsciiDoc, reStructuredText

## Compliance Rules

### **Currently Implemented**
- **GDPR**: 4 comprehensive rules
- **DORA**: 4 comprehensive rules
- **DPDP (India)**: 25 rules

## Best Practices

### **1. Configure Severity Threshold**
Set appropriate severity threshold for your team:
```json
{
  "juro.severityThreshold": "MEDIUM"
}
```

### **2. Use Workspace Scanning**
For comprehensive analysis, use workspace scanning:
- Right-click in Explorer → "Scan Workspace"
- Command Palette → "Juro: Scan Workspace"

### **3. Monitor Posture Scores**
Track per-regulation Posture Scores over time:
- Check the sidebar for per-regulation Posture Scores (DPDP / GDPR / DORA — scored independently)
- Monitor status bar indicators
- Review violation trends

### **4. Apply Fixes Promptly**
Address violations as they appear:
- Use hover tooltips for fix suggestions
- Right-click violations for context menu
- Apply automated fixes when available

## Integration with Other Tools

### **GitHub Actions**
- VS Code extension works alongside GitHub Actions
- Local scanning complements CI/CD checks
- Consistent compliance checking across environments

### **CLI Tools**
- Extension uses same MCP server as CLI
- Consistent results across all interfaces
- Shared configuration and rules

### **AI Assistants**
- MCP protocol enables AI integration
- Natural language compliance queries
- Intelligent code analysis and suggestions

## Getting Help

### **Documentation**
- [Compliance Scanning](/docs/features/compliance-scanning) - Learn about scanning capabilities
- [API Reference](/docs/api/mcp-tools) - MCP tools and API endpoints
- [Tutorials](/docs/tutorials/basic-scanning) - Step-by-step guides

### **Support**
- [FAQ](/docs/support/faq) - Frequently asked questions
- [GitHub Issues](https://github.com/juro/juro-mcp-server/issues) - Report bugs and request features
- [Discord Community](https://discord.gg/juro) - Get help from the community

---

**Ready to get started?** [Install the VS Code extension](vscode:extension/juro.compliance) and experience real-time compliance scanning in your IDE!