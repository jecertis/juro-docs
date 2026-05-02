---
id: architecture-overview
title: Architecture Overview
sidebar_label: Architecture Overview
description: 'Juro platform architecture with MCP protocol, scanning engine, and compliance pipeline'
keywords: [architecture, MCP protocol, compliance scanning, non-custodial, signed evidence]
---

# Architecture Overview

Juro is built on a non-custodial architecture designed for deterministic, signed, and verifiable compliance artifacts.

## 🏗️ **System Architecture**

### **High-Level Architecture**
```
┌─────────────────────────────────────────────────────────────────┐
│                        Juro Platform                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Web UI    │  │    CLI      │  │  AI Agents  │             │
│  │  (juro-web) │  │  (juro)     │  │   (MCP)     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│                    Integration Layer (MCP)                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Compliance  │  │   Rule      │  │   Lead      │             │
│  │   Engine    │  │  Manager    │  │  Tracking   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│                    Core Services Layer                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   MCP       │  │   HTTP      │  │   Rule      │             │
│  │  Server     │  │   Server    │  │  Packs      │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│                    Data & Storage Layer                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  SQLite     │  │  Evidence   │  │  Config     │             │
│  │  (leads)    │  │  Artifacts  │  │  Storage    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 **Core Components**

### **MCP Server**
- **Protocol**: Model Context Protocol (MCP) implementation
- **Ports**: HTTP API (8080), MCP TCP (3000)
- **Features**: Tool registration (scan_directory, scan_file, list_rules, get_rule_details, validate_rule), request handling, response formatting

### **Compliance Engine**
- **Rule Processing**: Multi-regulation rule processing (GDPR, DORA, DPDP)
- **Pattern Matching**: Regex and context-aware matching
- **Violation Detection**: Deterministic violation identification
- **Evidence Signing**: Cryptographic signatures for reproducible artifacts

## 🔌 **Integration Services**

### **Rule Packs**
```typescript
// Content-addressed rule packs with regulatory citations
interface RulePack {
  regulation: string;       // 'gdpr' | 'dora' | 'dpdp'
  version: string;          // semver
  hash: string;             // content hash for determinism
  rules: Rule[];
}
```

### **Evidence Pipeline**
```typescript
// Deterministic, signed evidence artifacts
interface EvidenceArtifact {
  scanId: string;
  targetHash: string;
  findingsHash: string;
  rulesHash: string;
  timestamp: string;
  signature: string;        // sigstore/OIDC signature
}
```

## 📊 **Data Flow Architecture**

### **Scanning Workflow**
```
1. Request Received (MCP/HTTP)
   ↓
2. Rule Pack Loading (content-addressed, cached)
   ↓
3. File/Directory Scanning
   ↓
4. Compliance Engine Analysis (deterministic)
   ↓
5. Result Aggregation
   ↓
6. Evidence Artifact Generation (signed)
   ↓
7. Response to Client
```

### **Evidence Pipeline**
```
1. Scan Target Identified
   ↓
2. Target Hash Computed (content-addressed)
   ↓
3. Rules Hash Computed (rule pack version)
   ↓
4. Deterministic Scan Execution
   ↓
5. Findings Hash Computed
   ↓
6. Artifact Signed (sigstore/OIDC)
   ↓
7. Log Entry Published (transparency log)
   ↓
8. Artifact Delivered to Customer
```

## 🔒 **Security Architecture**

### **Authentication & Authorization**
- **API Key Management**: Secure API key validation
- **Token-Based Auth**: JWT tokens for service communication
- **Role-Based Access**: Granular permission system
- **Audit Logging**: Comprehensive security event logging

### **Data Protection**
- **Encryption at Rest**: All cached data encrypted
- **Encryption in Transit**: TLS 1.3 for all communications
- **Secure Storage**: Encrypted rule packs and configurations
- **Data Anonymization**: PII protection in logs and metrics

## 📈 **Scalability Architecture**

### **Horizontal Scaling**
- **Load Balancing**: Multiple MCP server instances
- **Service Discovery**: Automatic service registration
- **Health Checks**: Continuous service monitoring
- **Auto-Scaling**: Dynamic resource allocation

### **Vertical Scaling**
- **Memory Optimization**: Efficient memory usage for large scans
- **CPU Optimization**: Multi-core processing
- **I/O Optimization**: Async file operations

## 🔄 **Deployment Architecture**

### **Container Deployment**
```yaml
# Docker Compose Example
version: '3.8'
services:
  juro-mcp-server:
    image: juro/mcp-server:latest
    ports:
      - "3000:3000"
      - "8080:8080"
    environment:
      - NODE_ENV=production
    volumes:
      - ./config:/app/config
      - ./rules:/app/rules
```

### **Kubernetes Deployment**
```yaml
# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: juro-mcp-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: juro-mcp-server
  template:
    metadata:
      labels:
        app: juro-mcp-server
    spec:
      containers:
      - name: juro-mcp-server
        image: juro/mcp-server:v2.0.0
        ports:
        - containerPort: 3000
        - containerPort: 8080
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "2000m"
```

## 📊 **Monitoring & Observability**

### **Metrics Collection**
- **Performance Metrics**: Scan duration, throughput, resource usage
- **Business Metrics**: Compliance scores, violation trends
- **System Metrics**: CPU, memory, disk, network usage
- **Custom Metrics**: User-defined performance indicators

### **Logging Architecture**
- **Structured Logging**: JSON-formatted logs with context
- **Log Levels**: DEBUG, INFO, WARN, ERROR, FATAL
- **Log Aggregation**: Centralized log collection and analysis
- **Log Retention**: Configurable log retention policies

### **Health Checks**
- **Liveness Probes**: Service availability checks
- **Readiness Probes**: Service readiness for traffic
- **Dependency Checks**: External service availability
- **Performance Checks**: Response time and throughput validation

## 🔧 **Configuration Management**

### **Environment Configuration**
```json
{
  "mcp": {
    "port": 3000,
    "host": "0.0.0.0",
    "protocol": "tcp"
  },
  "compliance": {
    "regulations": ["gdpr", "dora", "dpdp"],
    "severityThreshold": "MEDIUM",
    "maxFileSize": "50MB"
  }
}
```

### **Dynamic Configuration**
- **Hot Reloading**: Configuration changes without restart
- **Environment-Specific**: Different configs for dev/staging/prod
- **Secret Management**: Secure handling of sensitive configuration
- **Validation**: Configuration schema validation

## 🚀 **Roadmap**

### **Tier 3 — Private Deploy Agent**
- **In-VPC Agent**: Read-only IAM role for cloud state scanning
- **Local Triage**: Ollama-based analysis with no external LLM calls
- **Signed Evidence**: Deterministic, content-addressed artifacts

### **Transparency Log**
- **Public Append-Only Log**: `{scan_id, target_hash, findings_hash, rules_hash, timestamp, signature}`
- **Sigstore Integration**: OIDC-based signing and verification
- **Auditor Access**: Independent verification of compliance claims

---

**Ready to understand Juro's architecture?** [Explore the technical details](/docs/api/mcp-tools) or [get started with implementation](/docs/getting-started/installation)!
