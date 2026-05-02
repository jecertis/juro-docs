---
id: custom-rules
title: Custom Rules Tutorial
sidebar_label: Custom Rules
---

# Custom Rules Tutorial

Learn how to create and manage custom compliance rules in Juro. Custom rules allow you to define specific compliance requirements for your organization and codebase.

## Prerequisites

- Juro CLI installed (`npm install -g @juro/cli`)
- API key configured (`juro config set api-key YOUR_API_KEY`)
- Basic understanding of compliance requirements
- Familiarity with regular expressions

## Creating Custom Rules

### 1. Basic Rule Structure

Custom rules are defined in JSON format:

```json
{
  "rules": {
    "gdpr": {
      "customPatterns": [
        {
          "id": "no-personal-data-localstorage",
          "pattern": "localStorage\\.setItem.*personal",
          "message": "Personal data should not be stored in localStorage without encryption",
          "severity": "high",
          "suggestion": "Use encrypted storage for personal data"
        }
      ]
    }
  }
}
```

### 2. Rule Components

Each rule consists of:

- **id**: Unique identifier for the rule
- **pattern**: Regular expression pattern to match
- **message**: Description of the violation
- **severity**: Impact level (critical, high, medium, low)
- **suggestion**: Recommended fix for the violation

### 3. Save Custom Rules

Create a `juro.rules.json` file in your project:

```bash
# Create rules file
cat > juro.rules.json << EOF
{
  "rules": {
    "gdpr": {
      "customPatterns": [
        {
          "id": "no-personal-data-localstorage",
          "pattern": "localStorage\\.setItem.*personal",
          "message": "Personal data should not be stored in localStorage without encryption",
          "severity": "high",
          "suggestion": "Use encrypted storage for personal data"
        },
        {
          "id": "no-console-log-personal",
          "pattern": "console\\.log.*email|password",
          "message": "Personal data should not be logged to console",
          "severity": "medium",
          "suggestion": "Remove or mask personal data in logs"
        }
      ]
    }
  }
}
EOF
```

## Rule Types and Examples

### 1. GDPR Rules

```json
{
  "rules": {
    "gdpr": {
      "customPatterns": [
        {
          "id": "data-minimization",
          "pattern": "collect(?:User|Personal)Data\\([^)]*\\{[^}]*ssn[^}]*\\}",
          "message": "Collecting SSN violates GDPR data minimization principle",
          "severity": "high",
          "suggestion": "Only collect necessary personal data"
        },
        {
          "id": "consent-required",
          "pattern": "processData\\([^)]*\\)[^{]*\\{(?!.*checkConsent)",
          "message": "Data processing requires user consent",
          "severity": "critical",
          "suggestion": "Add consent check before processing data"
        },
        {
          "id": "encryption-required",
          "pattern": "storeData\\([^)]*\\)[^{]*\\{(?!.*encrypt)",
          "message": "Personal data must be encrypted before storage",
          "severity": "critical",
          "suggestion": "Use encryption before storing personal data"
        }
      ]
    }
  }
}
```

### 2. Security Rules

```json
{
  "rules": {
    "security": {
      "customPatterns": [
        {
          "id": "sql-injection",
          "pattern": "SELECT.*\\$\\{|SELECT.*\\+\\s*['\"]",
          "message": "Potential SQL injection vulnerability",
          "severity": "critical",
          "suggestion": "Use parameterized queries"
        },
        {
          "id": "xss-vulnerability",
          "pattern": "innerHTML\\s*=|dangerouslySetInnerHTML",
          "message": "Potential XSS vulnerability",
          "severity": "high",
          "suggestion": "Use safe DOM manipulation methods"
        },
        {
          "id": "hardcoded-secrets",
          "pattern": "(password|secret|key)\\s*=\\s*['\"][^'\"]+['\"]",
          "message": "Hardcoded secrets detected",
          "severity": "critical",
          "suggestion": "Use environment variables for secrets"
        }
      ]
    }
  }
}
```

### 3. Code Quality Rules

```json
{
  "rules": {
    "quality": {
      "customPatterns": [
        {
          "id": "no-debugger",
          "pattern": "debugger;",
          "message": "Debugger statement found",
          "severity": "medium",
          "suggestion": "Remove debugger statements before deployment"
        },
        {
          "id": "no-console",
          "pattern": "console\\.(log|debug|info)",
          "message": "Console statement found",
          "severity": "low",
          "suggestion": "Use proper logging system instead of console"
        },
        {
          "id": "todo-comment",
          "pattern": "// TODO:|// FIXME:",
          "message": "TODO or FIXME comment found",
          "severity": "low",
          "suggestion": "Address TODO comments before deployment"
        }
      ]
    }
  }
}
```

## Advanced Rule Features

### 1. Context-Aware Rules

Rules that consider code context:

```json
{
  "rules": {
    "gdpr": {
      "customPatterns": [
        {
          "id": "user-data-context",
          "pattern": {
            "before": "class\\s+User|interface\\s+UserData",
            "match": "email|phone|address",
            "after": "[^;]*;(?!.*encrypt)"
          },
          "message": "User data fields must be encrypted",
          "severity": "high",
          "suggestion": "Add encryption to user data fields"
        }
      ]
    }
  }
}
```

### 2. Rule Dependencies

Rules that work together:

```json
{
  "rules": {
    "security": {
      "customPatterns": [
        {
          "id": "auth-required",
          "pattern": "router\\.get\\(['\"].*['\"]",
          "dependencies": ["auth-middleware"],
          "message": "Route requires authentication",
          "severity": "high",
          "suggestion": "Add authentication middleware"
        },
        {
          "id": "auth-middleware",
          "pattern": "app\\.use\\(.*authenticate.*\\)",
          "message": "Authentication middleware not found",
          "severity": "high",
          "suggestion": "Add authentication middleware to app"
        }
      ]
    }
  }
}
```

### 3. File-Specific Rules

Rules for specific file types:

```json
{
  "rules": {
    "security": {
      "filePatterns": {
        "*.controller.ts": [
          {
            "id": "controller-validation",
            "pattern": "export\\s+class.*Controller[^{]*\\{(?!.*validate)",
            "message": "Controller missing input validation",
            "severity": "high",
            "suggestion": "Add input validation to controller"
          }
        ],
        "*.service.ts": [
          {
            "id": "service-error-handling",
            "pattern": "async\\s+[^(]*\\([^)]*\\)[^{]*\\{(?!.*try)",
            "message": "Service method missing error handling",
            "severity": "medium",
            "suggestion": "Add try-catch block for error handling"
          }
        ]
      }
    }
  }
}
```

## Using Custom Rules

### 1. Apply Rules in Scan

```bash
# Use custom rules file
juro scan --path ./my-project --rules-file juro.rules.json

# Combine with built-in rules
juro scan --path ./my-project --rules gdpr,dora --rules-file juro.rules.json

# Apply specific rule categories
juro scan --path ./my-project --rules-file juro.rules.json --categories security,quality
```

### 2. Rule Testing

Test your custom rules:

```bash
# Test specific rule
juro test-rule --rule no-personal-data-localstorage --file src/auth.js

# Test all rules in file
juro test-rules --rules-file juro.rules.json --test-dir test/samples

# Validate rule syntax
juro validate-rules --rules-file juro.rules.json
```

### 3. Rule Management

Manage your custom rules:

```bash
# List all rules
juro rules list

# Enable/disable rules
juro rules enable no-personal-data-localstorage
juro rules disable no-console-log-personal

# Export rules
juro rules export > my-rules.json

# Import rules
juro rules import my-rules.json
```

## Best Practices

### 1. Rule Organization

```json
{
  "rules": {
    "gdpr": {
      "customPatterns": [],
      "filePatterns": {},
      "dependencies": []
    },
    "security": {
      "customPatterns": [],
      "filePatterns": {},
      "dependencies": []
    },
    "quality": {
      "customPatterns": [],
      "filePatterns": {},
      "dependencies": []
    }
  },
  "settings": {
    "defaultSeverity": "medium",
    "ignorePatterns": ["**/test/**", "**/dist/**"]
  }
}
```

### 2. Pattern Writing

```javascript
// Good: Specific pattern
"pattern": "localStorage\\.setItem\\([^)]*personal[^)]*\\)"

// Avoid: Too broad
"pattern": "localStorage"

// Good: Context-aware
"pattern": {
  "before": "function\\s+process",
  "match": "userData",
  "after": "\\s*=\\s*"
}

// Good: Multiple conditions
"pattern": "(?:email|phone|address)\\s*=\\s*(?!encrypt)"
```

### 3. Rule Testing

Create test cases for your rules:

```javascript
// test/samples/storage.js
const userData = {
  email: 'user@example.com',
  phone: '1234567890'
};

// Should trigger rule
localStorage.setItem('userData', JSON.stringify(userData));

// Should pass
const encryptedData = encrypt(userData);
localStorage.setItem('userData', encryptedData);
```

## Troubleshooting

### Common Issues

1. **Rule Not Triggering**
   - Check pattern syntax
   - Verify file is being scanned
   - Try with simpler pattern first

2. **False Positives**
   - Make patterns more specific
   - Add context conditions
   - Use file-specific rules

3. **Performance Issues**
   - Optimize complex patterns
   - Use file patterns to limit scope
   - Add ignore patterns for irrelevant files

### Debug Mode

Enable debug mode to see rule matching details:

```bash
juro scan --path ./my-project --rules-file juro.rules.json --debug
```

## Next Steps

Now that you understand custom rules, you can:

1. **Set up GitHub Actions** - [GitHub Setup Tutorial](/docs/tutorials/github-setup)
2. **Learn about AI queries** - [AI Queries Tutorial](/docs/tutorials/ai-queries)
3. **Explore advanced features** - [API Examples](/docs/api/examples)
4. **Learn about webhooks** - [Webhooks Documentation](/docs/api/webhooks)

## Getting Help

If you need assistance:

- Check the [FAQ](/docs/support/faq) for common questions
- Review [Error Codes](/docs/api/error-codes) for troubleshooting
- Contact [Support](/docs/support/contact) for additional help

---

*Ready to create your own rules? [Install Juro CLI](https://juro.dev/docs/getting-started/installation) and start customizing your compliance checks!*
