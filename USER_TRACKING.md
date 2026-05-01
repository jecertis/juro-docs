# 📊 User Tracking & Analytics for Juro MCP Server

This document explains how user tracking and analytics work in your Juro MCP Server, including what data is collected, how to access it, and privacy considerations.

## 🎯 **What Gets Tracked**

### **1. MCP Protocol Users**
- **Connection Details**: Client info, IP address, connection time
- **Tool Usage**: Which MCP tools are used, response times, success/failure
- **Session Duration**: How long users stay connected
- **Request Patterns**: Frequency and types of requests

### **2. HTTP API Users**
- **Request Details**: IP, User-Agent, endpoints accessed, response times
- **Session Tracking**: Anonymous sessions for HTTP-only users
- **Performance Metrics**: Response times, error rates, status codes

### **3. Analytics Data**
- **User Counts**: Total users, active sessions, new vs returning
- **Popular Tools**: Most-used MCP tools and their performance
- **System Health**: Average response times, error rates, uptime
- **Geographic Data**: IP-based location insights (when available)

## 🔍 **How Tracking Works**

### **MCP Connection Tracking**
```typescript
// When an MCP client connects
const sessionId = userTracking.trackMCPConnection(
  "Claude Desktop v1.0",  // Client info
  "192.168.1.100"          // IP address
);

// When tools are used
userTracking.trackMCPToolUsage(
  sessionId,
  "scan_directory",         // Tool name
  150,                      // Response time (ms)
  true                      // Success status
);
```

### **HTTP Request Tracking**
```typescript
// Automatic tracking via middleware
app.use((req, res, next) => {
  const requestId = userTracking.trackHTTPRequest(
    req.ip,                 // IP address
    req.get('User-Agent'),  // Browser/client info
    req.path,               // Endpoint accessed
    req.method,             // HTTP method
    0,                      // Response time (updated later)
    0,                      // Status code (updated later)
    req.headers['x-session-id'] // Optional session ID
  );
  // ... continue processing
});
```

## 📊 **Available Analytics Endpoints**

### **1. Real-time Analytics**
```bash
GET /api/analytics
```
**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 25,
    "activeSessions": 8,
    "totalRequests": 1247,
    "popularTools": [
      {
        "toolName": "scan_directory",
        "usageCount": 456,
        "lastUsed": "2025-08-28T13:15:00.000Z",
        "averageResponseTime": 125.5,
        "errorCount": 12
      }
    ],
    "averageResponseTime": 142.3,
    "errorRate": 0.02,
    "topUsers": [...]
  },
  "timestamp": "2025-08-28T13:15:00.000Z"
}
```

### **2. User Sessions**
```bash
GET /api/sessions
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "mcp_1_1693234567890",
      "clientInfo": "Claude Desktop v1.0",
      "connectedAt": "2025-08-28T10:00:00.000Z",
      "lastActivity": "2025-08-28T13:15:00.000Z",
      "toolsUsed": ["scan_directory", "list_rules"],
      "ipAddress": "192.168.1.100",
      "totalRequests": 45,
      "sessionDuration": 11700000
    }
  ],
  "count": 1,
  "timestamp": "2025-08-28T13:15:00.000Z"
}
```

### **3. Data Export**
```bash
GET /api/export
```
**Response:** Complete dataset including all sessions, requests, and tool usage statistics.

## 🛠 **Integration Examples**

### **Frontend Dashboard**
```javascript
// Fetch real-time analytics
async function getAnalytics() {
  const response = await fetch('/api/analytics');
  const data = await response.json();
  
  if (data.success) {
    updateDashboard(data.data);
  }
}

// Update dashboard every 30 seconds
setInterval(getAnalytics, 30000);
```

### **External Analytics Tools**
```bash
# Export data for external analysis
curl -X GET https://your-server.railway.app/api/export \
  -H "Authorization: Bearer not-a-real-token-xyz789" \
  > analytics_export.json

# Send to external service
curl -X POST https://analytics-service.com/ingest \
  -H "Content-Type: application/json" \
  -d @analytics_export.json
```

### **Webhook Integration**
```typescript
// Set up webhooks for real-time updates
userTracking.on('userConnected', (session) => {
  // Send to Slack, Discord, etc.
  webhookService.send({
    event: 'user_connected',
    data: session
  });
});

userTracking.on('toolUsed', (data) => {
  // Track tool usage in external system
  analyticsService.trackToolUsage(data);
});
```

## 🔐 **Privacy & Security**

### **Data Collected**
- **IP Addresses**: For security and geographic insights
- **User Agents**: For client identification and debugging
- **Usage Patterns**: For service improvement and optimization
- **Session Data**: For connection management and analytics

### **Data Retention**
- **HTTP Requests**: Automatically cleaned up after 24 hours
- **User Sessions**: Automatically cleaned up after 1 hour of inactivity
- **Tool Usage**: Aggregated statistics kept indefinitely
- **Personal Data**: No names, emails, or personal identifiers stored

### **Data Protection**
- **No PII**: No personally identifiable information collected
- **IP Anonymization**: Option to hash or anonymize IP addresses
- **Secure Storage**: Data stored in memory only (not persisted to disk)
- **Access Control**: Analytics endpoints can be protected with authentication

## 📈 **Business Intelligence**

### **User Insights**
- **Popular Use Cases**: Which compliance tools are most valuable
- **User Engagement**: How long users stay connected
- **Geographic Distribution**: Where your users are located
- **Peak Usage Times**: When to expect high load

### **Performance Metrics**
- **Response Times**: Tool performance and optimization opportunities
- **Error Rates**: Service quality and reliability metrics
- **Scalability**: Usage patterns for capacity planning
- **Uptime**: Service availability and health monitoring

### **Growth Tracking**
- **User Acquisition**: New user signups and growth trends
- **Retention**: Returning user patterns and loyalty
- **Feature Adoption**: Which tools drive user engagement
- **Churn Analysis**: Why users might be leaving

## 🚀 **Advanced Features**

### **Custom Tracking**
```typescript
// Track custom events
userTracking.emit('customEvent', {
  eventType: 'compliance_scan_completed',
  userId: sessionId,
  metadata: {
    filesScanned: 150,
    violationsFound: 3,
    scanDuration: 2500
  }
});
```

### **Real-time Notifications**
```typescript
// Set up real-time monitoring
userTracking.on('errorRateThreshold', (data) => {
  if (data.errorRate > 0.05) { // 5% error rate
    alertService.sendAlert('High error rate detected');
  }
});
```

### **Integration with External Tools**
- **Google Analytics**: Track web traffic and user behavior
- **Mixpanel**: Advanced user analytics and funnel analysis
- **Segment**: Customer data platform integration
- **Custom Dashboards**: Real-time monitoring and alerts

## 📋 **Configuration Options**

### **Environment Variables**
```bash
# Enable/disable tracking
ENABLE_USER_TRACKING=true

# Data retention settings
TRACKING_RETENTION_HOURS=24
SESSION_TIMEOUT_MINUTES=60

# Privacy settings
ANONYMIZE_IPS=false
TRACK_USER_AGENTS=true
```

### **Customization**
```typescript
// Customize tracking behavior
const userTracking = new UserTrackingService({
  retentionHours: 48,
  sessionTimeoutMinutes: 120,
  anonymizeIPs: true,
  trackUserAgents: false
});
```

## 🔍 **Troubleshooting**

### **Common Issues**
1. **No Data**: Check if tracking is enabled
2. **High Memory Usage**: Reduce retention periods
3. **Missing Events**: Verify event listeners are set up
4. **Performance Impact**: Monitor response time overhead

### **Debug Mode**
```typescript
// Enable debug logging
userTracking.on('debug', (data) => {
  console.log('Tracking Debug:', data);
});
```

## 📚 **Next Steps**

1. **Set Up Monitoring**: Configure alerts for high error rates
2. **Create Dashboards**: Build visual analytics interfaces
3. **Integrate External Tools**: Connect to your existing analytics stack
4. **Custom Events**: Add tracking for business-specific metrics
5. **Privacy Compliance**: Ensure GDPR/CCPA compliance if needed

---

## 🎯 **Summary**

Your Juro MCP Server now includes comprehensive user tracking that provides:

✅ **Real-time Analytics**: Live user activity and system performance  
✅ **MCP Protocol Tracking**: Full visibility into AI tool usage  
✅ **HTTP API Monitoring**: Web request analytics and performance  
✅ **Privacy-First Design**: No personal data, secure by default  
✅ **Easy Integration**: Simple APIs for external tools and dashboards  
✅ **Business Intelligence**: Insights for growth and optimization  

**Start tracking today and gain valuable insights into how your compliance tools are being used!** 🚀
