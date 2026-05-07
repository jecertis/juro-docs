---
id: webhooks
title: Webhooks
sidebar_label: Webhooks
---

# Webhooks

Learn how to use Juro webhooks to receive real-time notifications about compliance scan results and events.

## Overview

Juro webhooks allow you to receive real-time notifications when compliance scans complete, violations are detected, or other events occur in your account. This enables you to integrate compliance monitoring into your existing workflows and systems.

## Webhook Events

### `scan.completed`

Triggered when a compliance scan completes successfully.

```json
{
  "event": "scan.completed",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "scanId": "scan_123456789",
    "projectId": "proj_123456789",
    "status": "completed",
    "violations": {
      "total": 5,
      "critical": 1,
      "high": 2,
      "medium": 2,
      "low": 0
    },
    "rules": ["gdpr", "dora", "dpdp"],
    "duration": 45.2,
    "filesScanned": 150
  }
}
```

### `scan.failed`

Triggered when a compliance scan fails.

```json
{
  "event": "scan.failed",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "scanId": "scan_123456789",
    "projectId": "proj_123456789",
    "status": "failed",
    "error": {
      "code": "SCAN_FAILED",
      "message": "Insufficient disk space"
    },
    "duration": 12.5
  }
}
```

### `violation.detected`

Triggered when a new violation is detected in your codebase.

```json
{
  "event": "violation.detected",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "violationId": "viol_123456789",
    "scanId": "scan_123456789",
    "projectId": "proj_123456789",
    "rule": "gdpr",
    "severity": "high",
    "file": "src/auth.js",
    "line": 42,
    "message": "Personal data stored without encryption",
    "suggestion": "Use encryption for storing personal data"
  }
}
```

### `violation.resolved`

Triggered when a violation is resolved.

```json
{
  "event": "violation.resolved",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "violationId": "viol_123456789",
    "scanId": "scan_123456789",
    "projectId": "proj_123456789",
    "rule": "gdpr",
    "resolvedBy": "user_123456789",
    "resolvedAt": "2024-01-15T10:30:00Z"
  }
}
```

## Setting Up Webhooks

### 1. Create Webhook Endpoint

```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Webhook endpoint
app.post('/webhooks/juro', (req, res) => {
  const signature = req.headers['x-juro-signature'];
  const payload = JSON.stringify(req.body);
  
  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.JURO_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  if (signature !== expectedSignature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Process webhook event
  const { event, data } = req.body;
  
  switch (event) {
    case 'scan.completed':
      handleScanCompleted(data);
      break;
    case 'scan.failed':
      handleScanFailed(data);
      break;
    case 'violation.detected':
      handleViolationDetected(data);
      break;
    case 'violation.resolved':
      handleViolationResolved(data);
      break;
    default:
      console.log('Unknown event:', event);
  }
  
  res.json({ status: 'success' });
});

function handleScanCompleted(data) {
  console.log(`Scan ${data.scanId} completed with ${data.violations.total} violations`);
  
  // Send notification to Slack
  if (data.violations.critical > 0) {
    sendSlackNotification(`Critical violations detected in scan ${data.scanId}`);
  }
}

function handleViolationDetected(data) {
  console.log(`New ${data.severity} violation: ${data.message} in ${data.file}:${data.line}`);
  
  // Create GitHub issue
  createGitHubIssue({
    title: `Compliance Violation: ${data.message}`,
    body: `**File:** ${data.file}\n**Line:** ${data.line}\n**Rule:** ${data.rule}\n**Severity:** ${data.severity}\n\n${data.suggestion}`,
    labels: ['compliance', data.severity]
  });
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

### 2. Configure Webhook in Juro

```bash
# Create webhook
juro webhooks create \
  --url "https://your-domain.com/webhooks/juro" \
  --events "scan.completed,violation.detected" \
  --secret "your-webhook-secret"

# List webhooks
juro webhooks list

# Update webhook
juro webhooks update webhook_123456789 \
  --events "scan.completed,scan.failed,violation.detected,violation.resolved"

# Delete webhook
juro webhooks delete webhook_123456789
```

### 3. Webhook Security

Always verify webhook signatures to ensure requests are from Juro:

```javascript
function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}
```

## Integration Examples

### Slack Integration

```javascript
const { WebClient } = require('@slack/web-api');

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

function sendSlackNotification(message) {
  slack.chat.postMessage({
    channel: '#compliance',
    text: message,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Compliance Alert*\n${message}`
        }
      }
    ]
  });
}

function handleViolationDetected(data) {
  const message = `🚨 *${data.severity.toUpperCase()}* violation detected\n` +
    `*File:* ${data.file}:${data.line}\n` +
    `*Rule:* ${data.rule}\n` +
    `*Message:* ${data.message}`;
  
  sendSlackNotification(message);
}
```

### GitHub Integration

```javascript
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function createGitHubIssue(violation) {
  const { data } = await octokit.rest.issues.create({
    owner: 'your-org',
    repo: 'your-repo',
    title: `Compliance Violation: ${violation.message}`,
    body: `**File:** ${violation.file}\n**Line:** ${violation.line}\n**Rule:** ${violation.rule}\n**Severity:** ${violation.severity}\n\n${violation.suggestion}`,
    labels: ['compliance', violation.severity]
  });
  
  console.log(`Created issue #${data.number}`);
}
```

### Discord Integration

```javascript
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once('ready', () => {
  console.log('Discord bot ready');
});

function sendDiscordNotification(message) {
  const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
  channel.send({
    embeds: [{
      title: 'Compliance Alert',
      description: message,
      color: 0xff0000,
      timestamp: new Date()
    }]
  });
}
```

### Microsoft Teams Integration

```javascript
const axios = require('axios');

async function sendTeamsNotification(message) {
  const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
  
  const payload = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "FF0000",
    "summary": "Compliance Alert",
    "sections": [{
      "activityTitle": "Compliance Alert",
      "activitySubtitle": "Juro Compliance Scanner",
      "text": message,
      "markdown": true
    }]
  };
  
  await axios.post(webhookUrl, payload);
}
```

## Webhook Management

### List Webhooks

```bash
# List all webhooks
juro webhooks list

# Get specific webhook
juro webhooks get webhook_123456789
```

### Update Webhook

```bash
# Update webhook events
juro webhooks update webhook_123456789 \
  --events "scan.completed,violation.detected"

# Update webhook URL
juro webhooks update webhook_123456789 \
  --url "https://new-domain.com/webhooks/juro"
```

### Delete Webhook

```bash
# Delete webhook
juro webhooks delete webhook_123456789
```

## Error Handling

### Retry Logic

```javascript
async function handleWebhookWithRetry(payload, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await processWebhook(payload);
      return;
    } catch (error) {
      if (i === maxRetries - 1) {
        console.error('Webhook processing failed after retries:', error);
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
}
```

### Dead Letter Queue

```javascript
const { Queue } = require('bullmq');

const webhookQueue = new Queue('webhook-processing', {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

// Process webhook with retry
webhookQueue.add('process-webhook', payload, {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 2000
  }
});

// Handle failed webhooks
webhookQueue.on('failed', (job, err) => {
  console.error(`Webhook processing failed: ${err.message}`);
  
  // Send to dead letter queue
  deadLetterQueue.add('failed-webhook', {
    jobId: job.id,
    payload: job.data,
    error: err.message,
    timestamp: new Date()
  });
});
```

## Testing Webhooks

### Local Testing with ngrok

```bash
# Install ngrok
npm install -g ngrok

# Start your webhook server
node webhook-server.js

# In another terminal, expose local server
ngrok http 3000

# Use the ngrok URL for webhook configuration
juro webhooks create \
  --url "https://abc123.ngrok.io/webhooks/juro" \
  --events "scan.completed"
```

### Webhook Testing Tool

```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Test webhook endpoint
app.post('/test-webhook', (req, res) => {
  console.log('Received webhook:', JSON.stringify(req.body, null, 2));
  res.json({ status: 'received' });
});

// Send test webhook
app.post('/send-test-webhook', async (req, res) => {
  const testPayload = {
    event: 'scan.completed',
    timestamp: new Date().toISOString(),
    data: {
      scanId: 'test_scan_123',
      projectId: 'test_proj_123',
      status: 'completed',
      violations: {
        total: 2,
        critical: 0,
        high: 1,
        medium: 1,
        low: 0
      }
    }
  };
  
  const signature = crypto
    .createHmac('sha256', process.env.JURO_WEBHOOK_SECRET)
    .update(JSON.stringify(testPayload))
    .digest('hex');
  
  await fetch('http://localhost:3000/test-webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Juro-Signature': signature
    },
    body: JSON.stringify(testPayload)
  });
  
  res.json({ status: 'test webhook sent' });
});

app.listen(3000, () => {
  console.log('Test server running on port 3000');
});
```

## Best Practices

### 1. Idempotency

```javascript
const processedEvents = new Set();

function handleWebhook(payload) {
  const eventId = `${payload.event}_${payload.data.scanId}_${payload.timestamp}`;
  
  if (processedEvents.has(eventId)) {
    console.log('Event already processed:', eventId);
    return;
  }
  
  processedEvents.add(eventId);
  
  // Process event
  processEvent(payload);
}
```

### 2. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many webhook requests'
});

app.use('/webhooks/juro', webhookLimiter);
```

### 3. Logging

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'webhook.log' })
  ]
});

function handleWebhook(payload) {
  logger.info('Webhook received', {
    event: payload.event,
    scanId: payload.data.scanId,
    timestamp: payload.timestamp
  });
  
  // Process webhook
  processWebhook(payload);
}
```
