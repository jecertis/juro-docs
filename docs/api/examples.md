---
id: examples
title: API Examples
sidebar_label: API Examples
---

# API Examples

Comprehensive examples showing how to use the Juro API and MCP tools in various scenarios.

## Basic Usage

### Simple Codebase Scan

```bash
# Scan entire project for GDPR compliance
juro scan --path ./my-project --rules gdpr

# Scan with multiple compliance standards
juro scan --path ./my-project --rules gdpr,soc2,owasp --format json
```

### File Analysis

```bash
# Analyze specific file
juro analyze --file ./src/auth.js --rules gdpr,owasp

# Analyze with context
juro analyze --file ./src/user.js --rules gdpr --context "User authentication module"
```

## Programming Language Examples

### JavaScript/Node.js

```javascript
const { JuroClient } = require('@juro/sdk');

const client = new JuroClient({
  apiKey: process.env.JURO_API_KEY
});

// Scan codebase
async function scanProject() {
  try {
    const result = await client.scan({
      path: './src',
      rules: ['gdpr', 'owasp'],
      format: 'json'
    });
    
    console.log('Scan results:', result);
  } catch (error) {
    console.error('Scan failed:', error.message);
  }
}

// Analyze specific file
async function analyzeFile() {
  try {
    const result = await client.analyze({
      filePath: './src/auth.js',
      rules: ['gdpr']
    });
    
    console.log('Analysis results:', result);
  } catch (error) {
    console.error('Analysis failed:', error.message);
  }
}

// Ask questions
async function askQuestion() {
  try {
    const result = await client.ask({
      question: "Does my code handle user data securely?",
      context: "./src/user-management.js"
    });
    
    console.log('Answer:', result.answer);
  } catch (error) {
    console.error('Query failed:', error.message);
  }
}
```

### Python

```python
from juro import JuroClient

client = JuroClient(api_key="your-api-key")

# Scan codebase
def scan_project():
    try:
        result = client.scan(
            path="./src",
            rules=["gdpr", "owasp"],
            format="json"
        )
        print("Scan results:", result)
    except Exception as e:
        print(f"Scan failed: {e}")

# Analyze specific file
def analyze_file():
    try:
        result = client.analyze(
            file_path="./src/auth.py",
            rules=["gdpr"]
        )
        print("Analysis results:", result)
    except Exception as e:
        print(f"Analysis failed: {e}")

# Ask questions
def ask_question():
    try:
        result = client.ask(
            question="Does my code handle user data securely?",
            context="./src/user_management.py"
        )
        print("Answer:", result.answer)
    except Exception as e:
        print(f"Query failed: {e}")
```

### Go

```go
package main

import (
    "fmt"
    "log"
    "github.com/juro/go-sdk"
)

func main() {
    client := juro.NewClient("your-api-key")
    
    // Scan codebase
    result, err := client.Scan(juro.ScanRequest{
        Path:   "./src",
        Rules:  []string{"gdpr", "owasp"},
        Format: "json",
    })
    if err != nil {
        log.Fatal("Scan failed:", err)
    }
    fmt.Println("Scan results:", result)
    
    // Analyze specific file
    analysis, err := client.Analyze(juro.AnalyzeRequest{
        FilePath: "./src/auth.go",
        Rules:    []string{"gdpr"},
    })
    if err != nil {
        log.Fatal("Analysis failed:", err)
    }
    fmt.Println("Analysis results:", analysis)
}
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Compliance Check
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Juro CLI
        run: npm install -g @juro/cli
      
      - name: Run Compliance Scan
        run: |
          juro scan --path ./src --rules gdpr,soc2,owasp --format sarif --output compliance-results.sarif
        env:
          JURO_API_KEY: ${{ secrets.JURO_API_KEY }}
      
      - name: Upload SARIF results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: compliance-results.sarif
```

### GitLab CI

```yaml
stages:
  - compliance

compliance_scan:
  stage: compliance
  image: node:18
  before_script:
    - npm install -g @juro/cli
  script:
    - juro scan --path ./src --rules gdpr,soc2,owasp --format json --output compliance-results.json
  artifacts:
    reports:
      junit: compliance-results.json
  variables:
    JURO_API_KEY: $JURO_API_KEY
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    
    environment {
        JURO_API_KEY = credentials('juro-api-key')
    }
    
    stages {
        stage('Compliance Scan') {
            steps {
                sh 'npm install -g @juro/cli'
                sh 'juro scan --path ./src --rules gdpr,soc2,owasp --format json --output compliance-results.json'
            }
        }
        
        stage('Publish Results') {
            steps {
                publishJSON([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    displayName: 'Compliance Results',
                    file: 'compliance-results.json'
                ])
            }
        }
    }
}
```

## MCP Integration Examples

### Claude Desktop

```json
{
  "mcpServers": {
    "juro": {
      "command": "npx",
      "args": ["@juro/mcp-server"],
      "env": {
        "JURO_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Cursor IDE

```json
{
  "mcp": {
    "servers": {
      "juro": {
        "command": "npx",
        "args": ["@juro/mcp-server"],
        "env": {
          "JURO_API_KEY": "your-api-key-here"
        }
      }
    }
  }
}
```

## Advanced Examples

### Custom Rule Configuration

```json
{
  "rules": {
    "gdpr": {
      "enabled": true,
      "severity": "high",
      "customPatterns": [
        {
          "pattern": "localStorage\\.setItem",
          "message": "Avoid storing sensitive data in localStorage"
        }
      ]
    },
    "owasp": {
      "enabled": true,
      "severity": "critical",
      "excludePatterns": [
        "**/test/**",
        "**/node_modules/**"
      ]
    }
  }
}
```

### Batch Processing

```bash
#!/bin/bash
# Scan multiple projects

PROJECTS=("project1" "project2" "project3")
RULES="gdpr,soc2,owasp"

for project in "${PROJECTS[@]}"; do
    echo "Scanning $project..."
    juro scan --path "./$project" --rules "$RULES" --format json --output "$project-results.json"
done
```

### Webhook Integration

```javascript
const express = require('express');
const { JuroClient } = require('@juro/sdk');

const app = express();
const client = new JuroClient({ apiKey: process.env.JURO_API_KEY });

app.post('/webhook/compliance', async (req, res) => {
  try {
    const { repository, branch, files } = req.body;
    
    // Scan changed files
    const results = await client.scan({
      path: repository.path,
      rules: ['gdpr', 'owasp'],
      files: files
    });
    
    // Send results to Slack
    await sendToSlack(results);
    
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});
```

## Error Handling Examples

### JavaScript Error Handling

```javascript
async function scanWithErrorHandling() {
  try {
    const result = await client.scan({
      path: './src',
      rules: ['gdpr']
    });
    
    return result;
  } catch (error) {
    switch (error.code) {
      case 'AUTH_REQUIRED':
        console.error('Please set your API key');
        break;
      case 'INVALID_PATH':
        console.error('Invalid path provided');
        break;
      case 'RATE_LIMIT_EXCEEDED':
        console.error('Rate limit exceeded, please try again later');
        break;
      default:
        console.error('Unexpected error:', error.message);
    }
    throw error;
  }
}
```

### Python Error Handling

```python
def scan_with_error_handling():
    try:
        result = client.scan(
            path="./src",
            rules=["gdpr"]
        )
        return result
    except juro.AuthError:
        print("Please set your API key")
        raise
    except juro.ValidationError as e:
        print(f"Validation error: {e}")
        raise
    except juro.RateLimitError:
        print("Rate limit exceeded, please try again later")
        raise
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise
```

## Performance Optimization

### Parallel Scanning

```javascript
async function parallelScan() {
  const projects = ['project1', 'project2', 'project3'];
  
  const scans = projects.map(project => 
    client.scan({
      path: `./${project}`,
      rules: ['gdpr']
    })
  );
  
  const results = await Promise.all(scans);
  return results;
}
```

### Caching Results

```javascript
const fs = require('fs');
const path = require('path');

async function scanWithCache(projectPath) {
  const cacheFile = path.join(projectPath, '.juro-cache.json');
  
  // Check if cache exists and is recent
  if (fs.existsSync(cacheFile)) {
    const stats = fs.statSync(cacheFile);
    const age = Date.now() - stats.mtime.getTime();
    
    if (age < 3600000) { // 1 hour
      return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    }
  }
  
  // Perform scan
  const result = await client.scan({
    path: projectPath,
    rules: ['gdpr', 'soc2']
  });
  
  // Cache results
  fs.writeFileSync(cacheFile, JSON.stringify(result, null, 2));
  
  return result;
}
```

## Testing Examples

### Unit Tests

```javascript
const { JuroClient } = require('@juro/sdk');

describe('Juro Client', () => {
  let client;
  
  beforeEach(() => {
    client = new JuroClient({ apiKey: 'test-key' });
  });
  
  test('should scan project successfully', async () => {
    const result = await client.scan({
      path: './test-project',
      rules: ['gdpr']
    });
    
    expect(result).toBeDefined();
    expect(result.violations).toBeInstanceOf(Array);
  });
  
  test('should handle invalid path error', async () => {
    await expect(
      client.scan({ path: '/invalid/path', rules: ['gdpr'] })
    ).rejects.toThrow('INVALID_PATH');
  });
});
```

### Integration Tests

```javascript
describe('Juro Integration', () => {
  test('should complete full scan workflow', async () => {
    // 1. Scan project
    const scanResult = await client.scan({
      path: './test-project',
      rules: ['gdpr', 'owasp']
    });
    
    // 2. Analyze specific file
    const analysisResult = await client.analyze({
      filePath: './test-project/src/auth.js',
      rules: ['gdpr']
    });
    
    // 3. Ask question
    const questionResult = await client.ask({
      question: "Are there any security vulnerabilities?",
      context: "./test-project/src"
    });
    
    expect(scanResult).toBeDefined();
    expect(analysisResult).toBeDefined();
    expect(questionResult).toBeDefined();
  });
});
```
