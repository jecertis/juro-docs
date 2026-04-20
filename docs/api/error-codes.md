---
id: error-codes
title: Error Codes
sidebar_label: Error Codes
---

# Error Codes

Complete reference for all error codes returned by the Juro API and MCP tools.

## HTTP Status Codes

### 2xx Success
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `202 Accepted` - Request accepted for processing

### 4xx Client Errors
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded

### 5xx Server Errors
- `500 Internal Server Error` - Unexpected server error
- `502 Bad Gateway` - Upstream server error
- `503 Service Unavailable` - Service temporarily unavailable

## API Error Codes

### Authentication Errors

#### `AUTH_REQUIRED`
**Code**: `AUTH_REQUIRED`  
**HTTP Status**: `401`  
**Message**: "Authentication required"  
**Description**: API key is missing or invalid.

**Resolution**:
```bash
# Set your API key
export JURO_API_KEY="your-api-key-here"

# Or use in request header
curl -H "Authorization: Bearer your-api-key-here" \
     https://api.juro.dev/v1/scan
```

#### `INVALID_API_KEY`
**Code**: `INVALID_API_KEY`  
**HTTP Status**: `401`  
**Message**: "Invalid API key provided"  
**Description**: The provided API key is not valid or has been revoked.

**Resolution**:
- Verify the API key is correct
- Check if the key has been regenerated
- Ensure the key has not expired

### Validation Errors

#### `INVALID_PATH`
**Code**: `INVALID_PATH`  
**HTTP Status**: `400`  
**Message**: "The specified path does not exist"  
**Description**: The provided file or directory path is invalid.

**Resolution**:
```bash
# Check if path exists
ls -la /path/to/your/project

# Use absolute path
juro scan --path /absolute/path/to/project

# Use relative path from current directory
juro scan --path ./project
```

#### `INVALID_RULES`
**Code**: `INVALID_RULES`  
**HTTP Status**: `400`  
**Message**: "One or more specified rules are not supported"  
**Description**: The provided compliance rules are not valid.

**Valid Rules**:
- `gdpr` - GDPR compliance
- `dora` - DORA compliance
- `dpdp` - DPDP (India) compliance

**Resolution**:
```bash
# Use valid rules
juro scan --rules gdpr,dora,dpdp

# Check available rules
juro rules list
```

#### `INVALID_FORMAT`
**Code**: `INVALID_FORMAT`  
**HTTP Status**: `400`  
**Message**: "Invalid output format specified"  
**Description**: The specified output format is not supported.

**Valid Formats**:
- `json` - JSON output
- `sarif` - SARIF format
- `text` - Plain text

**Resolution**:
```bash
# Use valid format
juro scan --format json
```

### Rate Limiting

#### `RATE_LIMIT_EXCEEDED`
**Code**: `RATE_LIMIT_EXCEEDED`  
**HTTP Status**: `429`  
**Message**: "Rate limit exceeded. Please try again later."  
**Description**: Too many requests have been made in a short time period.

**Rate Limits**:
- Free tier: 100 requests per hour
- Pro tier: 1,000 requests per hour
- Enterprise: 10,000 requests per hour

**Resolution**:
- Wait for the rate limit to reset
- Upgrade your plan for higher limits
- Implement exponential backoff

### Scan Errors

#### `SCAN_FAILED`
**Code**: `SCAN_FAILED`  
**HTTP Status**: `500`  
**Message**: "Scan operation failed"  
**Description**: The scan operation encountered an error.

**Common Causes**:
- Insufficient disk space
- File permission issues
- Corrupted files
- Network connectivity issues

**Resolution**:
```bash
# Check disk space
df -h

# Check file permissions
ls -la /path/to/project

# Try with verbose output
juro scan --path ./project --verbose
```

#### `SCAN_TIMEOUT`
**Code**: `SCAN_TIMEOUT`  
**HTTP Status**: `408`  
**Message**: "Scan operation timed out"  
**Description**: The scan took too long to complete.

**Resolution**:
- Reduce the scope of the scan
- Use more specific rules
- Exclude large directories
- Contact support for large codebases

### File System Errors

#### `FILE_NOT_FOUND`
**Code**: `FILE_NOT_FOUND`  
**HTTP Status**: `404`  
**Message**: "File not found"  
**Description**: The specified file does not exist.

**Resolution**:
```bash
# Check if file exists
ls -la /path/to/file

# Use correct file path
juro analyze --file ./src/auth.js
```

#### `PERMISSION_DENIED`
**Code**: `PERMISSION_DENIED`  
**HTTP Status**: `403`  
**Message**: "Permission denied accessing file or directory"  
**Description**: Insufficient permissions to access the specified path.

**Resolution**:
```bash
# Check permissions
ls -la /path/to/project

# Fix permissions
chmod -R 755 /path/to/project

# Run with appropriate user
sudo juro scan --path /path/to/project
```

## MCP Tool Errors

### Tool Execution Errors

#### `TOOL_NOT_FOUND`
**Code**: `TOOL_NOT_FOUND`  
**Message**: "Requested tool not found"  
**Description**: The specified MCP tool does not exist.

**Available Tools**:
- `scan_codebase`
- `analyze_file`
- `ask_question`

**Resolution**:
```json
{
  "name": "scan_codebase",
  "parameters": {
    "path": "./my-project"
  }
}
```

#### `INVALID_PARAMETERS`
**Code**: `INVALID_PARAMETERS`  
**Message**: "Invalid parameters provided to tool"  
**Description**: The tool parameters are invalid or missing required fields.

**Resolution**:
- Check tool documentation
- Verify required parameters
- Use correct parameter types

### Configuration Errors

#### `CONFIG_NOT_FOUND`
**Code**: `CONFIG_NOT_FOUND`  
**Message**: "Configuration file not found"  
**Description**: The Juro configuration file is missing.

**Resolution**:
```bash
# Create default config
juro config init

# Or create manually
echo '{"apiKey": "your-key"}' > ~/.juro/config.json
```

#### `INVALID_CONFIG`
**Code**: `INVALID_CONFIG`  
**Message**: "Invalid configuration file"  
**Description**: The configuration file contains invalid JSON or settings.

**Resolution**:
```bash
# Validate config
juro config validate

# Reset to defaults
juro config reset
```

## Error Response Format

All errors follow a consistent format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      "field": "Additional error details",
      "suggestion": "How to fix the error"
    },
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_123456789"
  }
}
```

## Debugging Tips

### 1. Enable Verbose Logging
```bash
juro scan --path ./project --verbose
```

### 2. Check API Status
```bash
curl https://api.juro.dev/health
```

### 3. Validate Configuration
```bash
juro config validate
```

### 4. Test with Simple Request
```bash
juro scan --path ./simple-project --rules gdpr
```

## Getting Help

If you encounter an error not listed here:

1. Check the [FAQ](/docs/support/faq)
2. Review the [API Examples](/docs/api/examples)
3. Contact [Support](/docs/support/contact)
4. Check our [Status Page](https://status.juro.dev)
