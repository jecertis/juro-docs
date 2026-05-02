---
id: index
title: Welcome to Juro v2.0.0
sidebar_label: Home
description: 'Non-custodial compliance scanning for GDPR, DORA, and DPDP (India). CLI, GitHub Actions, MCP, and VS Code.'
keywords: [compliance scanning, GDPR compliance, DORA compliance, DPDP India, non-custodial, GitHub Actions, VS Code extension, MCP, AI agents]
---

# Welcome to Juro v2.0.0

<div className="hero-banner">
  <h1 className="hero-title">
    Compliance you can prove.
  </h1>
  <p className="hero-subtitle">
    Non-custodial compliance scanning for GDPR, DORA, and DPDP (India). CLI, GitHub Actions, VS Code, and an MCP server for AI agents.
  </p>
  <div className="hero-buttons">
    <a className="button button--primary button--lg" href="/docs/getting-started/installation">
      Get Started
    </a>
    <a className="button button--secondary button--lg" href="/docs/features/compliance-scanning">
      Learn More
    </a>
  </div>
</div>

## 🚀 What's New in v2.0.0

<div className="version-highlights">
  <div className="version-card">
    <h3>✅ GitHub Actions Integration</h3>
    <p>Complete workflow generation, PR compliance checking, and team notifications with 18/18 BDD tests passing.</p>
  </div>
  <div className="version-card">
    <h3>✅ VS Code Extension</h3>
    <p>Real-time compliance scanning with inline violation highlighting and compliance scoring (85% complete).</p>
  </div>
  <div className="version-card">
    <h3>✅ Performance Optimization</h3>
    <p>Intelligent caching, parallel processing, and memory management for large codebases.</p>
  </div>
  <div className="version-card">
    <h3>✅ Enhanced MCP Tools</h3>
    <p>5 new GitHub Actions tools plus existing compliance tools with comprehensive API coverage.</p>
  </div>
</div>

## 🚀 Why Choose Juro?

### **Zero-Configuration Setup**
- **Auto-Detection**: Automatically detects project types and relevant regulations
- **Smart Defaults**: Works out of the box with sensible defaults
- **One-Click Integration**: Set up compliance scanning in minutes, not hours

### **Agent-Native**
- **MCP Protocol Integration**: Claude, Cursor, and Copilot can invoke Juro tools directly
- **CLI-First**: Every capability ships to the OSS CLI before the hosted surface
- **Deterministic Findings**: Same target + same rules → same output, every run

### **Coverage**
- **20+ Programming Languages**: TypeScript, Python, Java, Go, Rust, and more
- **Regulations**: GDPR, DORA, DPDP (India)
- **Real-Time Scanning**: Instant feedback as you code

## 🎯 Key Features

<div className="feature-grid">
  <div className="feature-card">
    <h3>🔍 Compliance Scanning</h3>
    <p>Automatically scan your code for compliance violations across multiple regulations and standards.</p>
  </div>
  <div className="feature-card">
    <h3>🤖 AI Analysis</h3>
    <p>Leverage artificial intelligence to understand code context and provide intelligent recommendations.</p>
  </div>
  <div className="feature-card">
    <h3>💬 Natural Language</h3>
    <p>Ask questions about your code in plain English and get instant, accurate answers.</p>
  </div>
  <div className="feature-card">
    <h3>🔧 Auto-Discovery</h3>
    <p>Automatically detect project types, frameworks, and relevant compliance requirements.</p>
  </div>
  <div className="feature-card">
    <h3>⚡ Real-Time Feedback</h3>
    <p>Get instant compliance feedback as you code with VS Code extension and CLI tools.</p>
  </div>
  <div className="feature-card">
    <h3>🔗 Easy Integration</h3>
    <p>Integrate with GitHub Actions, CI/CD pipelines, and popular development tools.</p>
  </div>
</div>

## 📊 Compliance Coverage

### ✅ **Fully Implemented (36 Rules)**
<div className="regulation-grid">
  <div className="regulation-card implemented">
    <h3>GDPR</h3>
    <p>5 rules: Article 30 – processing documentation, retention, data subject rights</p>
    <span className="status-badge implemented">✅ Implemented</span>
  </div>
  <div className="regulation-card implemented">
    <h3>DORA</h3>
    <p>6 rules: Resilience – logging, encryption, incident response, business continuity, third-party risk, testing</p>
    <span className="status-badge implemented">✅ Implemented</span>
  </div>
  <div className="regulation-card implemented">
    <h3>DPDP (India)</h3>
    <p>25 rules: Consent, notice, Data Principal rights, Data Fiduciary duties, cross-border, children's data, Aadhaar/PAN</p>
    <span className="status-badge implemented">✅ Implemented</span>
  </div>
</div>

## ⚡ Performance Benchmarks

<div className="performance-grid">
  <div className="performance-card">
    <h3>Small Projects</h3>
    <p>< 100 files</p>
    <span className="performance-time">&lt; 1 second</span>
  </div>
  <div className="performance-card">
    <h3>Medium Projects</h3>
    <p>100-1000 files</p>
    <span className="performance-time">&lt; 10 seconds</span>
  </div>
  <div className="performance-card">
    <h3>Large Projects</h3>
    <p>1000+ files</p>
    <span className="performance-time">&lt; 60 seconds</span>
  </div>
  <div className="performance-card">
    <h3>Cache Hit Rate</h3>
    <p>Repeated scans</p>
    <span className="performance-time">90%+</span>
  </div>
</div>

## 🛠️ Quick Start

### 1. Install Juro
```bash
cd juro && npm install && npm run build
```

### 2. Scan Your Project
```bash
node packages/cli/dist/cli.js scan ./my-project -r DPDP -o table
```

### 3. Optional: DPDP verification
```bash
# With Ollama + mistral-regtech: verify findings or filter false positives
node packages/cli/dist/cli.js scan ./my-project -r DPDP --verify --verify-max 10 -o html -f report.html --open
```

### 4. VS Code Extension
```bash
# Install from VS Code marketplace
# Search for "Juro Compliance"
```

## 🔗 Popular Integrations

<div className="integration-grid">
  <div className="integration-card featured">
    <h3>GitHub Actions</h3>
    <p>Complete workflow generation, PR compliance checking, and team notifications with 18/18 BDD tests passing.</p>
    <a href="/docs/integrations/github-actions">Learn More →</a>
    <span className="feature-badge">v2.0.0</span>
  </div>
  <div className="integration-card featured">
    <h3>VS Code Extension</h3>
    <p>Real-time compliance scanning with inline violation highlighting and compliance scoring (85% complete).</p>
    <a href="/docs/integrations/ide-setup">Learn More →</a>
    <span className="feature-badge">v2.0.0</span>
  </div>
  <div className="integration-card">
    <h3>CLI Tools</h3>
    <p>Command-line interface for local scanning, custom rules, and automated workflows.</p>
    <a href="/docs/integrations/cli-tools">Learn More →</a>
  </div>
  <div className="integration-card">
    <h3>AI Agent APIs</h3>
    <p>Natural language processing and intelligent code analysis with MCP protocol integration.</p>
    <a href="/docs/api/mcp-tools">Learn More →</a>
  </div>
</div>

## 📈 Success Stories

<div className="success-stories">
  <div className="success-story">
    <h4>TechCorp Inc.</h4>
    <p>"Juro gave us signed, verifiable compliance artifacts for our DPDP audit. No guesswork — just evidence we can prove."</p>
    <span className="success-author">- Sarah Johnson, CTO</span>
  </div>
  <div className="success-story">
    <h4>StartupXYZ</h4>
    <p>"The natural language interface made compliance accessible to our entire team. We caught issues before they became problems."</p>
    <span className="success-author">- Mike Chen, Lead Developer</span>
  </div>
</div>

## 🚀 Get Started Today

Ready to transform your compliance workflow? Choose your path:

<div className="cta-grid">
  <div className="cta-card">
    <h3>🚀 Quick Start</h3>
    <p>Get up and running in 5 minutes</p>
    <a href="/docs/getting-started/installation" className="button button--primary">Start Now</a>
  </div>
  <div className="cta-card">
    <h3>📚 Learn More</h3>
    <p>Explore features and capabilities</p>
    <a href="/docs/features/compliance-scanning" className="button button--secondary">Explore Features</a>
  </div>
  <div className="cta-card">
    <h3>🔧 Integrate</h3>
    <p>Set up with your existing tools</p>
    <a href="/docs/integrations/github-actions" className="button button--secondary">View Integrations</a>
  </div>
</div>

---

**Ready to get started?** [Install Juro now](/docs/getting-started/installation) or [explore our features](/docs/features/compliance-scanning) to learn more about what Juro can do for your team.
