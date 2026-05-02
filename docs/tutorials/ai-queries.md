---
id: ai-queries
title: AI Queries Tutorial
sidebar_label: AI Queries
---

# AI Queries Tutorial

Learn how to use Juro's AI-powered natural language queries to analyze your code's compliance. Ask questions about your code in plain English and get intelligent, context-aware answers.

## Prerequisites

- Juro CLI installed (`npm install -g @juro/cli`)
- API key configured (`juro config set api-key YOUR_API_KEY`)
- A project to analyze

## Basic AI Queries

### 1. Simple Compliance Questions

Ask basic questions about your code's compliance:

```bash
# Ask about GDPR compliance
juro ask "Does my code comply with GDPR requirements?"

# Ask about security
juro ask "Are there any security vulnerabilities in my code?"

# Ask about data handling
juro ask "How is user data being handled in my application?"
```

### 2. Specific Code Analysis

Ask questions about specific parts of your code:

```bash
# Ask about authentication
juro ask "Is my authentication system secure?"

# Ask about data storage
juro ask "How is personal data stored in my database?"

# Ask about API security
juro ask "Are my API endpoints secure against common attacks?"
```

### 3. Context-Aware Queries

Provide context to get more accurate answers:

```bash
# Ask with file context
juro ask "Does this authentication code comply with GDPR?" --context "src/auth.js"

# Ask with directory context
juro ask "Are there any privacy issues in my user management code?" --context "src/user/"

# Ask with specific concerns
juro ask "I'm concerned about data encryption in my payment processing code" --context "src/payment.js"
```

## Advanced AI Queries

### 1. Comparative Analysis

Compare different approaches or implementations:

```bash
# Compare authentication methods
juro ask "Which authentication method is more secure: JWT or session-based?"

# Compare data storage approaches
juro ask "Should I use localStorage or encrypted storage for user preferences?"

# Compare encryption methods
juro ask "What's the difference between AES-256 and bcrypt for data encryption?"
```

### 2. Compliance Gap Analysis

Identify gaps in your compliance implementation:

```bash
# GDPR gap analysis
juro ask "What GDPR requirements am I missing in my current implementation?"

# DORA gap analysis
juro ask "What DORA controls do I need to implement for my application?"

# Security gap analysis
juro ask "What security measures am I missing to protect user data?"
```

### 3. Implementation Guidance

Get specific guidance on implementing compliance features:

```bash
# Ask for implementation help
juro ask "How should I implement user consent for GDPR compliance?"

# Ask for best practices
juro ask "What are the best practices for handling user passwords?"

# Ask for architecture advice
juro ask "How should I structure my application for maximum security?"
```

## Query Types and Examples

### Compliance Questions

```bash
# GDPR compliance
juro ask "Does my user registration form comply with GDPR data minimization?"
juro ask "Are there proper consent mechanisms for data collection?"
juro ask "Is user data being encrypted before storage?"

# DORA compliance
juro ask "Does my application meet DORA resilience requirements?"
juro ask "Are there proper access controls for sensitive data?"
juro ask "Is audit logging implemented for data access?"
```

### Security Questions

```bash
# General security
juro ask "What security vulnerabilities exist in my code?"
juro ask "How can I improve the security of my application?"
juro ask "Are there any hardcoded secrets or credentials?"

# Data protection
juro ask "Is sensitive data being properly protected?"
juro ask "Are there any data leaks in my logging or error handling?"
juro ask "Is user input being properly validated and sanitized?"
```

### Architecture Questions

```bash
# System design
juro ask "Is my application architecture secure and compliant?"
juro ask "How should I structure my data layer for compliance?"
juro ask "What are the security implications of my current architecture?"

# Integration security
juro ask "Are my third-party integrations secure?"
juro ask "How should I handle API authentication securely?"
juro ask "What are the security risks of my current integrations?"
```

## Using AI Queries in Different Contexts

### 1. Development Workflow

Integrate AI queries into your development process:

```bash
# Before committing code
juro ask "Are there any compliance issues in my recent changes?" --context "src/"

# During code review
juro ask "Does this pull request introduce any security vulnerabilities?"

# When adding new features
juro ask "How should I implement this feature to be compliant with GDPR?"
```

### 2. Code Review Process

Use AI queries to enhance code reviews:

```bash
# Review specific files
juro ask "Review this authentication code for security issues" --context "src/auth.js"

# Review specific functions
juro ask "Is this data processing function compliant with privacy regulations?" --context "src/data.js:processUserData"

# Review entire modules
juro ask "What compliance issues exist in my user management module?" --context "src/user/"
```

### 3. Compliance Audits

Use AI queries for comprehensive compliance audits:

```bash
# Full compliance audit
juro ask "Perform a comprehensive compliance audit of my application"

# Specific regulation audit
juro ask "Audit my application for GDPR compliance requirements"

# Security audit
juro ask "Conduct a security audit of my application"
```

## Advanced Query Techniques

### 1. Multi-Part Questions

Ask complex questions that require analysis of multiple aspects:

```bash
# Comprehensive analysis
juro ask "Analyze my application for GDPR compliance, focusing on data collection, storage, and user rights"

# Security and compliance
juro ask "Evaluate both security and compliance aspects of my user authentication system"

# Performance and compliance
juro ask "Assess the performance and compliance implications of my data processing approach"
```

### 2. Scenario-Based Questions

Ask questions about specific scenarios:

```bash
# Data breach scenario
juro ask "How would my application handle a data breach scenario?"

# User consent withdrawal
juro ask "What happens when a user withdraws consent for data processing?"

# Regulatory changes
juro ask "How would new privacy regulations affect my current implementation?"
```

### 3. Comparative Analysis

Compare different approaches or implementations:

```bash
# Compare implementations
juro ask "Compare the security of my current authentication vs OAuth2 implementation"

# Compare frameworks
juro ask "What are the compliance implications of using React vs Vue for my frontend?"

# Compare databases
juro ask "Which database is more secure for storing user data: PostgreSQL or MongoDB?"
```

## Query Best Practices

### 1. Be Specific

```bash
# Good: Specific question
juro ask "Does my password hashing implementation use bcrypt with proper salt rounds?"

# Avoid: Vague question
juro ask "Is my code secure?"
```

### 2. Provide Context

```bash
# Good: With context
juro ask "Does my user registration form comply with GDPR?" --context "src/auth/register.js"

# Avoid: Without context
juro ask "Does my form comply with GDPR?"
```

### 3. Ask Follow-up Questions

```bash
# Initial question
juro ask "Are there any security issues in my authentication code?"

# Follow-up question
juro ask "How can I fix the password storage issues you identified?"

# Further clarification
juro ask "What specific bcrypt configuration should I use for password hashing?"
```

### 4. Use Iterative Approach

```bash
# Start broad
juro ask "What compliance issues exist in my application?"

# Get specific
juro ask "How can I fix the GDPR data minimization violations?"

# Get implementation details
juro ask "Show me how to implement proper data minimization in my user registration form"
```

## Integration with Other Tools

### 1. IDE Integration

Use AI queries directly in your IDE:

```bash
# VS Code integration
juro ask "Analyze this function for security issues" --context "src/auth.js:validateUser"

# IntelliJ integration
juro ask "Review this class for compliance issues" --context "src/user/UserManager.java"
```

### 2. CI/CD Integration

Integrate AI queries into your continuous integration:

```bash
# Pre-commit hook
juro ask "Are there any compliance issues in my staged changes?"

# Pull request analysis
juro ask "Does this pull request introduce any security vulnerabilities?"

# Deployment check
juro ask "Is my application ready for production from a compliance perspective?"
```

### 3. Documentation Generation

Use AI queries to generate compliance documentation:

```bash
# Generate compliance report
juro ask "Generate a compliance report for my application"

# Create security documentation
juro ask "Create security documentation for my authentication system"

# Generate privacy policy
juro ask "Help me create a privacy policy based on my data handling practices"
```

## Troubleshooting

### Common Issues

1. **Vague or unclear answers**
   - Be more specific in your questions
   - Provide more context
   - Ask follow-up questions

2. **No response or error**
   - Check your API key configuration
   - Verify network connectivity
   - Try with a simpler question

3. **Inaccurate answers**
   - Provide more context about your specific use case
   - Ask more specific questions
   - Use iterative questioning approach

### Debug Mode

Enable debug mode to see detailed information:

```bash
juro ask "Analyze my code for security issues" --debug
```

This will show:
- Query processing steps
- Context analysis
- Response generation
- Performance metrics

## Best Practices

### 1. **Start Simple**
Begin with basic questions and gradually increase complexity:

```bash
# Start with basic question
juro ask "Is my code secure?"

# Add context
juro ask "Is my authentication code secure?" --context "src/auth.js"

# Get specific
juro ask "Are there any password storage vulnerabilities in my authentication code?" --context "src/auth.js"
```

### 2. **Use Iterative Approach**
Build understanding through multiple questions:

```bash
# Initial assessment
juro ask "What compliance issues exist in my application?"

# Focus on specific areas
juro ask "How can I fix the GDPR violations in my user data handling?"

# Get implementation details
juro ask "Show me how to implement proper data encryption for user data"
```

### 3. **Combine with Scanning**
Use AI queries to complement scanning results:

```bash
# First scan for violations
juro scan --path ./src --rules gdpr

# Then ask AI about specific issues
juro ask "How can I fix the data minimization violations found in my scan?"
```

## Next Steps

Now that you understand AI queries, you can:

1. **Learn about custom rules** - [Custom Rules Tutorial](/docs/tutorials/custom-rules)
2. **Set up GitHub Actions** - [GitHub Setup Tutorial](/docs/tutorials/github-setup)
3. **Explore advanced features** - [API Examples](/docs/api/examples)
4. **Learn about webhooks** - [Webhooks Documentation](/docs/api/webhooks)

## Getting Help

If you need assistance:

- Check the [FAQ](/docs/support/faq) for common questions
- Review [Error Codes](/docs/api/error-codes) for troubleshooting
- Contact [Support](/docs/support/contact) for additional help

---

*Ready to start asking questions? [Install Juro CLI](https://juro.dev/docs/getting-started/installation) and try your first AI query!*
