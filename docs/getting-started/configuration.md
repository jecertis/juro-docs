---
id: configuration
title: Configuration
sidebar_label: Configuration
description: 'Configure Juro for your specific project needs'
keywords: [configuration, setup, custom rules, project settings]
---

# Configuration

Configure Juro to match your project's specific compliance requirements.

## Configuration File

Create a `juro.config.json` file in your project root:

```json
{
  "regulations": ["GDPR", "DORA", "DPDP"],
  "excludePatterns": ["node_modules/**", "dist/**"],
  "customRules": "./custom-rules.json",
  "severity": {
    "high": true,
    "medium": true,
    "low": false
  }
}
```

## Environment Variables

```bash
# Set default regulations
export JURO_REGULATIONS="GDPR,DORA,DPDP"

# Set scan path
export JURO_SCAN_PATH="./src"

# Enable debug mode
export JURO_DEBUG=true
```

## Custom Rules

Define your own compliance rules:

```json
{
  "rules": [
    {
      "id": "custom-password-policy",
      "name": "Password Policy Check",
      "pattern": "password.*=.*['\"][^'\"]{0,7}['\"]",
      "severity": "HIGH",
      "message": "Passwords must be at least 8 characters"
    }
  ]
}
```

## Next Steps

- [Features](/docs/features/compliance-scanning) - Learn about all features
- [Tutorials](/docs/tutorials/custom-rules) - Create custom rules
- [API Reference](/docs/api/mcp-tools) - Use the API
