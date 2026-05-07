# API Reference

> **Complete API documentation for Juro MCP Server**

The Juro MCP Server provides both HTTP API endpoints and MCP protocol support for compliance scanning and rule management against the supported regulations (GDPR, DORA, DPDP).

## 🚀 Base URL

**Production**: `https://juro-production.up.railway.app`

## 🔐 Authentication

Currently, the API is open for public use. Rate limiting may apply for high-volume usage.

## 📊 Available Endpoints

### **Health & Status**
- [`GET /health`](./health.md) - Service health check
- [`GET /`](./root.md) - Service information and available endpoints

### **Analytics & Monitoring**
- [`GET /api/analytics`](./analytics.md) - Real-time usage analytics
- [`GET /api/sessions`](./sessions.md) - User session information
- [`GET /api/export`](./export.md) - Complete data export

### **Compliance Tools (Coming Soon)**
- [`POST /api/scan-directory`](./scan-directory.md) - Scan directory for compliance violations
- [`POST /api/scan-file`](./scan-file.md) - Scan individual file for compliance
- [`POST /api/list-rules`](./list-rules.md) - List available compliance rules
- [`POST /api/get-rule-details`](./get-rule-details.md) - Get detailed rule information
- [`POST /api/validate-rule`](./validate-rule.md) - Validate custom compliance rules

## 🌐 MCP Protocol

For AI tool integration, connect via the **Model Context Protocol**:

- **Host**: `juro-production.up.railway.app`
- **Port**: `3000`
- **Protocol**: TCP

### **Available MCP Tools**
1. **`scan_directory`** - Scan entire codebases
2. **`scan_file`** - Analyze individual files
3. **`list_rules`** - Browse compliance rules
4. **`get_rule_details`** - Get rule specifications
5. **`validate_rule`** - Validate custom rules

## 📝 Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "timestamp": "2025-08-28T23:27:31.882Z"
}
```

### **Error Responses**

```json
{
  "success": false,
  "error": "Error description",
  "message": "Detailed error message",
  "timestamp": "2025-08-28T23:27:31.882Z"
}
```

## 📊 Rate Limits

- **Free Tier**: 100 requests/hour
- **Pro Tier**: 1000 requests/hour (coming soon)
- **Enterprise**: Custom limits (contact us)

## 🔧 HTTP Status Codes

- **200** - Success
- **400** - Bad Request
- **401** - Unauthorized
- **404** - Not Found
- **429** - Rate Limited
- **500** - Internal Server Error

## 📚 SDKs & Libraries

### **JavaScript/Node.js**
```bash
npm install @juro/mcp-client
```

### **Python**
```bash
pip install juro-mcp-client
```

### **Go**
```bash
go get github.com/juro/mcp-client
```

## 🚀 Quick Examples

### **Check Service Health**
```bash
curl https://juro-production.up.railway.app/health
```

### **Get Analytics**
```bash
curl https://juro-production.up.railway.app/api/analytics
```

### **Connect via MCP**
```bash
# Use our MCP client libraries
# Or connect directly via TCP to port 3000
```

## 📖 Next Steps

- [View detailed endpoint documentation](./endpoints/)
- [Learn about MCP integration](./mcp/)
- [Explore code examples](./examples/)
- [Get started with compliance scanning](./quick-start.md)

---

**Need help with a specific endpoint?** [View detailed documentation →](./endpoints/)
