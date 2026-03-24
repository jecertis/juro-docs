# How to Use Juro MCP Server

This guide provides step-by-step instructions for setting up and using the Juro MCP Server to integrate compliance scanning capabilities into your AI tools and workflows.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Installation & Setup](#installation--setup)
3. [Basic Usage](#basic-usage)
4. [Advanced Configuration](#advanced-configuration)
5. [Integration Examples](#integration-examples)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## Quick Start

### 1. Install the Server
```bash
# Clone the repository
git clone https://github.com/your-org/juro-mcp-server.git
cd juro-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

### 2. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm run build && npm start
```

### 3. Test Basic Connectivity
The server will start and listen for MCP connections. You can verify it's running by checking the logs for the startup message.

## Installation & Setup

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Git**

### Step-by-Step Installation

#### Step 1: Environment Setup
```bash
# Copy the example environment file
cp env.example .env

# Edit the environment file with your settings
nano .env
```

#### Step 2: Configure Environment Variables
```bash
# Server Configuration
NODE_ENV=development
MCP_PORT=3000
MCP_HOST=localhost
MCP_PROTOCOL=stdio

# Juro Configuration
JURO_RULE_PACKS_PATH=./rules
LOG_LEVEL=info

# Security (generate a secure key)
SECURITY_API_KEY=your-secure-api-key-here

# Performance Settings
MAX_CONCURRENT_SCANS=5
```

#### Step 3: Install Dependencies
```bash
npm install
```

#### Step 4: Build the Project
```bash
npm run build
```

#### Step 5: Verify Installation
```bash
# Run tests to ensure everything works
npm test

# Check if the server can start
npm run dev
```

## Basic Usage

### Starting the Server

#### Development Mode
```bash
npm run dev
```
This starts the server with hot reloading and detailed logging.

#### Production Mode
```bash
npm run build
npm start
```
This starts the optimized production server.

#### Docker Mode
```bash
# Build the Docker image
docker build -t juro-mcp-server .

# Run the container
docker run -p 3000:3000 juro-mcp-server
```

### Connecting to the Server

The server supports multiple transport protocols:

#### 1. stdio (Default for CLI tools)
```bash
# The server communicates via stdin/stdout
echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize"}' | npm start
```

#### 2. TCP
```bash
# Server listens on TCP port
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "initialize"}'
```

#### 3. WebSocket
```javascript
// Connect via WebSocket
const ws = new WebSocket('ws://localhost:3000');
ws.send(JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize"
}));
```

### Basic MCP Operations

#### 1. Initialize Connection
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {},
    "clientInfo": {
      "name": "My AI Tool",
      "version": "1.0.0"
    }
  }
}
```

#### 2. List Available Tools
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list"
}
```

#### 3. Call a Tool
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "scan_directory",
    "arguments": {
      "path": "./src",
      "regulations": ["GDPR", "DORA"]
    }
  }
}
```

## Advanced Configuration

### Custom Rule Packs

#### 1. Create Custom Rules
```yaml
# rules/custom-gdpr.yml
name: "Custom GDPR Rules"
version: "1.0.0"
regulations: ["GDPR"]
rules:
  - id: "CUSTOM_001"
    name: "Personal Data Detection"
    description: "Detect personal data in code"
    severity: "HIGH"
    patterns:
      - regex: "\\b(email|phone|address|ssn)\\b"
        case_sensitive: false
```

#### 2. Load Custom Rules
```bash
# Set the path to your custom rules
export JURO_RULE_PACKS_PATH=./custom-rules

# Restart the server
npm run dev
```

### Performance Tuning

#### 1. Concurrent Scans
```bash
# Increase concurrent scan limit
export MAX_CONCURRENT_SCANS=10
```

#### 2. Memory Limits
```bash
# Set Node.js memory limits
export NODE_OPTIONS="--max-old-space-size=4096"
```

#### 3. Logging Levels
```bash
# Set logging level
export LOG_LEVEL=debug  # Options: error, warn, info, debug
```

## Integration Examples

### 1. Integration with Claude Desktop

#### Setup Claude Desktop
1. Open Claude Desktop
2. Go to Settings → AI Models
3. Add a new MCP server:
   - **Name**: Juro Compliance
   - **Command**: `node /path/to/juro-mcp-server/dist/index.js`
   - **Working Directory**: `/path/to/juro-mcp-server`

#### Usage in Claude
```
@juro-compliance scan my codebase for GDPR compliance issues
```

### 2. Integration with VS Code

#### Install MCP Extension
1. Install the "Model Context Protocol" extension
2. Configure the server in settings.json:
```json
{
  "mcp.servers": {
    "juro-compliance": {
      "command": "node",
      "args": ["/path/to/juro-mcp-server/dist/index.js"],
      "cwd": "/path/to/juro-mcp-server"
    }
  }
}
```

#### Usage in VS Code
- Use the command palette: `MCP: Call Tool`
- Select `juro-compliance` server
- Choose tool and provide arguments

### 3. Integration with Custom AI Tools

#### Python Example
```python
import json
import subprocess
import sys

class JuroMCPClient:
    def __init__(self, server_path):
        self.server_path = server_path
        self.process = None
    
    def start_server(self):
        self.process = subprocess.Popen(
            ['node', self.server_path],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
    
    def send_request(self, method, params=None):
        request = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params or {}
        }
        
        self.process.stdin.write(json.dumps(request).encode() + b'\n')
        self.process.stdin.flush()
        
        response = self.process.stdout.readline()
        return json.loads(response)
    
    def scan_directory(self, path, regulations=None):
        return self.send_request("tools/call", {
            "name": "scan_directory",
            "arguments": {
                "path": path,
                "regulations": regulations or ["GDPR"]
            }
        })

# Usage
client = JuroMCPClient("/path/to/juro-mcp-server/dist/index.js")
client.start_server()
result = client.scan_directory("./src", ["GDPR", "DORA"])
print(result)
```

#### JavaScript/Node.js Example
```javascript
const { spawn } = require('child_process');
const path = require('path');

class JuroMCPClient {
    constructor(serverPath) {
        this.serverPath = serverPath;
        this.process = null;
    }
    
    startServer() {
        this.process = spawn('node', [this.serverPath], {
            stdio: ['pipe', 'pipe', 'pipe']
        });
        
        this.process.stderr.on('data', (data) => {
            console.log('Server stderr:', data.toString());
        });
    }
    
    async sendRequest(method, params = {}) {
        return new Promise((resolve, reject) => {
            const request = {
                jsonrpc: "2.0",
                id: Date.now(),
                method,
                params
            };
            
            this.process.stdin.write(JSON.stringify(request) + '\n');
            
            this.process.stdout.once('data', (data) => {
                try {
                    const response = JSON.parse(data.toString());
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    
    async scanDirectory(path, regulations = ['GDPR']) {
        return this.sendRequest('tools/call', {
            name: 'scan_directory',
            arguments: { path, regulations }
        });
    }
}

// Usage
async function main() {
    const client = new JuroMCPClient('./dist/index.js');
    client.startServer();
    
    try {
        const result = await client.scanDirectory('./src', ['GDPR', 'DORA']);
        console.log('Scan result:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
```

## Troubleshooting

### Common Issues

#### 1. Server Won't Start
```bash
# Check Node.js version
node --version  # Should be >= 18.0.0

# Check if port is already in use
lsof -i :3000

# Check logs for errors
npm run dev 2>&1 | grep -i error
```

#### 2. Connection Issues
```bash
# Test TCP connectivity
telnet localhost 3000

# Check firewall settings
sudo ufw status
```

#### 3. Permission Issues
```bash
# Fix file permissions
chmod +x dist/index.js

# Check directory permissions
ls -la dist/
```

#### 4. Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Check available memory
free -h
```

### Debug Mode

#### Enable Debug Logging
```bash
export LOG_LEVEL=debug
export DEBUG=*
npm run dev
```

#### Check Server Status
```bash
# Check if process is running
ps aux | grep node

# Check server logs
tail -f logs/server.log
```

## Best Practices

### 1. Security
- **Never commit API keys** to version control
- **Use environment variables** for sensitive configuration
- **Regularly rotate API keys**
- **Limit server access** to trusted networks

### 2. Performance
- **Monitor memory usage** during large scans
- **Use appropriate concurrency limits** for your hardware
- **Cache scan results** when possible
- **Implement rate limiting** for external tools

### 3. Reliability
- **Implement retry logic** for failed requests
- **Use health checks** to monitor server status
- **Log all operations** for debugging
- **Implement graceful shutdown** handling

### 4. Monitoring
- **Track scan performance** metrics
- **Monitor error rates** and types
- **Set up alerts** for critical failures
- **Regular log rotation** and cleanup

### 5. Development
- **Write tests** for new features
- **Use TypeScript** for type safety
- **Follow consistent** coding standards
- **Document all** public APIs

## Getting Help

### Resources
- **GitHub Issues**: [Report bugs and request features](https://github.com/your-org/juro-mcp-server/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/your-org/juro-mcp-server/discussions)
- **Project Wiki**: [Detailed documentation](https://github.com/your-org/juro-mcp-server/wiki)
- **API Specification**: [JURO_MCP_SERVER_API_SPECIFICATION.md](../JURO_MCP_SERVER_API_SPECIFICATION.md)

### Support Channels
- **Community Support**: GitHub Discussions
- **Bug Reports**: GitHub Issues
- **Feature Requests**: GitHub Issues
- **Security Issues**: Private security reports

---

**Need more help?** Check the [main README](../README.md) for additional information or open an issue on GitHub.
