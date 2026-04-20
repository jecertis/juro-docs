---
id: compliance-scanning
title: Compliance Scanning
sidebar_label: Compliance Scanning
description: 'Comprehensive compliance scanning across multiple regulations and standards'
keywords: [compliance scanning, regulations, GDPR, DORA, DPDP India, SOC2, OWASP, automated scanning]
---

# Compliance Scanning

Juro v2.0.0 provides comprehensive compliance scanning across multiple regulations and standards with high-throughput performance optimization and real-time IDE integration.

## Current Implementation Status

### ✅ **Fully Implemented (36 Rules)**
- **GDPR**: 5 rules (Article 30 – processing documentation, retention, data subject rights)
- **DORA**: 6 rules (Resilience – logging, encryption, incident response, business continuity, third-party risk, testing)
- **DPDP (India)**: 25 rules (Consent, notice, Data Principal rights, Data Fiduciary duties, cross-border, children's data, Aadhaar/PAN/mobile)

## Advanced Scanning Features

### **Real-Time Scanning (VS Code Extension)**
- **Instant Feedback**: Get compliance violations as you type
- **Inline Highlighting**: Visual indicators for violation severity
- **Hover Tooltips**: Rich information with fix suggestions
- **Compliance Scoring**: Real-time compliance score updates
- **Zero Configuration**: Works out of the box

### **Performance Optimization**
- **Intelligent Caching**: 90%+ cache hit rate for repeated scans
- **Parallel Processing**: Multi-threaded file scanning with configurable worker pools
- **Memory Management**: Efficient handling of large files with chunked processing
- **Incremental Scanning**: Only scan changed files for faster subsequent runs

### **Core Features**
- **Auto-Detection Engine**: Automatically detects project types and relevant regulations
- **Smart Configuration**: Auto-generates compliance configurations
- **Context-Aware Analysis**: Advanced pattern matching for actual data vs. configuration
- **False Positive Reduction**: Intelligent filtering to avoid false alarms

## Performance Benchmarks

### **Scanning Speed**
- **Small Projects** (< 100 files): < 1 second
- **Medium Projects** (100-1000 files): < 10 seconds  
- **Large Projects** (1000+ files): < 60 seconds
- **Cache Hit Rate**: 90%+ for repeated scans

### **Resource Optimization**
- **Worker Pool**: Configurable 1-8 workers for optimal performance
- **Memory Management**: 10MB chunk size for large file processing
- **Parallel Processing**: Up to 4x faster than sequential scanning
- **File Size Support**: Up to 50MB files with memory-optimized streaming

## Scanning Examples

### **GDPR Compliance Scanning**
```bash
# Scan for GDPR violations (from juro repo root)
node packages/cli/dist/cli.js scan ./src -r GDPR -o json -f report.json
```

### **DORA Financial Compliance**
```bash
# Scan for DORA compliance
node packages/cli/dist/cli.js scan ./src -r DORA --severity HIGH,CRITICAL
```

### **DPDP (India) Compliance**
```bash
# Scan for DPDP violations
node packages/cli/dist/cli.js scan ./src -r DPDP -o table

# DPDP with JSON report
node packages/cli/dist/cli.js scan ./src -r DPDP -o json -f dpdp-report.json

# Scan a website and open HTML report
node packages/cli/dist/cli.js scan --url https://example.com -r DPDP -o html -f report.html --open
```

### **Multi-Regulation Scanning**
```bash
node packages/cli/dist/cli.js scan ./src -r DPDP,GDPR,DORA -o table
```

## Integration Options

### **VS Code Extension**
- Real-time compliance scanning
- Inline violation highlighting
- Compliance score visualization
- Zero configuration required

### **GitHub Actions**
- Automated CI/CD compliance checks
- PR comment integration
- Team notifications
- Custom workflow generation

### **CLI Tools**
- Command-line scanning
- Custom rule support
- Batch processing
- Report generation

## Getting Started

- [First Scan](/docs/getting-started/first-scan) - Run your first scan
- [VS Code Extension](/docs/integrations/ide-setup) - Real-time IDE integration
- [GitHub Actions](/docs/integrations/github-actions) - CI/CD automation
- [Configuration](/docs/getting-started/configuration) - Configure scanning
- [Tutorials](/docs/tutorials/basic-scanning) - Learn scanning techniques
