# MCP Integration Guide

> **Connect AI tools to Juro via Model Context Protocol**

The Juro MCP Server implements the Model Context Protocol (MCP) to enable AI assistants like Claude, ChatGPT, and others to perform compliance scanning and rule management directly within their interfaces.

## 🚀 What is MCP?

The **Model Context Protocol (MCP)** is an open standard that allows AI tools to connect to external services and access real-time information. With Juro MCP Server, AI assistants can:

- **Scan codebases** for compliance violations
- **Analyze individual files** for regulatory issues
- **Browse compliance rules** and regulations
- **Validate custom rules** before implementation
- **Generate compliance reports** automatically

## 🔌 Connection Details

### **Production Server**
- **Host**: `juro-production.up.railway.app`
- **Port**: `3000`
- **Protocol**: TCP
- **Status**: ✅ **Live and Ready**

### **Test Server (Development)**
- **Host**: `localhost`
- **Port**: `3000`
- **Protocol**: TCP
- **Status**: 🔧 **For local development**

## 🤖 Supported AI Tools

### **Claude Desktop**
- **Status**: ✅ **Fully Supported**
- **Setup**: Add MCP server in Claude settings
- **Features**: All 5 compliance tools available

### **ChatGPT (with MCP support)**
- **Status**: ✅ **Fully Supported**
- **Setup**: Configure MCP server in ChatGPT
- **Features**: All 5 compliance tools available

### **Other MCP Clients**
- **Status**: ✅ **Fully Supported**
- **Setup**: Standard MCP configuration
- **Features**: All 5 compliance tools available

## 🛠️ Available MCP Tools

### **1. `scan_directory`**
**Purpose**: Scan entire codebases for compliance violations

**Parameters**:
```json
{
  "path": "string",           // Directory path to scan
  "regulations": ["string"],  // Array of regulations (GDPR, DORA, etc.)
  "severity_threshold": "number" // Minimum severity to report (optional)
}
```

**Returns**: Comprehensive compliance report with violations and recommendations

### **2. `scan_file`**
**Purpose**: Analyze individual files for compliance issues

**Parameters**:
```json
{
  "path": "string",           // File path to scan
  "regulations": ["string"],  // Array of regulations to check
  "severity_threshold": "number" // Minimum severity to report (optional)
}
```

**Returns**: File-specific compliance analysis and recommendations

### **3. `list_rules`**
**Purpose**: Browse available compliance rules and regulations

**Parameters**:
```json
{
  "regulation": "string",     // Specific regulation (optional)
  "severity": "string",      // Severity level (optional)
  "limit": "number",         // Maximum results (optional)
  "offset": "number"         // Pagination offset (optional)
}
```

**Returns**: List of available compliance rules with metadata

### **4. `get_rule_details`**
**Purpose**: Get detailed information about specific compliance rules

**Parameters**:
```json
{
  "rule_id": "string"        // Unique rule identifier
}
```

**Returns**: Complete rule specification, examples, and implementation guidance

### **5. `validate_rule`**
**Purpose**: Validate custom compliance rules before implementation

**Parameters**:
```json
{
  "rule_definition": "object" // Rule definition object
}
```

**Returns**: Validation results and suggestions for improvement

## 🚀 Quick Start

### **Step 1: Configure Your AI Tool**

#### **Claude Desktop**
1. Open Claude Desktop
2. Go to Settings → MCP Servers
3. Add new server:
   - **Name**: Juro Compliance
   - **Host**: `juro-production.up.railway.app`
   - **Port**: `3000`
4. Save and restart Claude

#### **ChatGPT (MCP-enabled)**
1. Access ChatGPT with MCP support
2. Configure MCP server settings
3. Add Juro server details
4. Restart ChatGPT

### **Step 2: Test the Connection**

Once connected, try these commands in your AI tool:

```
"Scan my current directory for GDPR compliance violations"
"Show me all available DORA compliance rules"
"Analyze this file for compliance issues"
"Validate this custom compliance rule"
```

### **Step 3: Start Scanning**

Your AI tool can now:
- **Automatically scan** code for compliance
- **Provide real-time** compliance feedback
- **Suggest fixes** for violations
- **Generate reports** for audits

## 📊 Example Interactions

### **Directory Scanning**
```
User: "Scan my project for GDPR compliance issues"

Claude: "I'll scan your project directory for GDPR compliance violations. Let me connect to the Juro MCP Server and analyze your codebase..."

[Claude connects via MCP and scans your directory]

Claude: "I found 23 GDPR compliance violations in your project. Here's a detailed breakdown..."
```

### **Rule Information**
```
User: "What DORA compliance rules should I implement?"

Claude: "Let me check the available DORA compliance rules from the Juro database..."

[Claude queries the MCP server for DORA rules]

Claude: "Here are the key DORA compliance rules you should implement..."
```

## 🔧 Advanced Configuration

### **Supported Regulations**
- **GDPR** - General Data Protection Regulation (EU)
- **DORA** - Digital Operational Resilience Act (EU)
- **DPDP** - Digital Personal Data Protection Act (India)

### **Severity Levels**
- **Critical** - Immediate action required
- **High** - Address within 24 hours
- **Medium** - Address within 1 week
- **Low** - Address within 1 month
- **Info** - Informational only

## 📈 Performance & Limits

- **Scan Speed**: 1000+ files per second
- **File Size**: Up to 10MB per file
- **Directory Depth**: Unlimited
- **Concurrent Scans**: Up to 10 simultaneous scans
- **Rate Limits**: 100 requests/hour (free tier)

## 🆘 Troubleshooting

### **Connection Issues**
- Verify host and port are correct
- Check firewall settings
- Ensure MCP client supports TCP connections

### **Scan Failures**
- Verify file paths are accessible
- Check file size limits
- Ensure supported file types

### **Performance Issues**
- Check rate limits
- Verify network connectivity
- Consider upgrading to Pro tier

## 📚 Next Steps

- [View API Reference](../api/README.md)
- [Explore Code Examples](../examples/README.md)
- [Learn About Regulations](../regulations/README.md)
- [Get Support](../support/README.md)

---

**Ready to connect your AI tool?** [Get started with our hosted service →](../deployment/hosted.md)
