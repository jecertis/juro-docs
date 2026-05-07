---
id: dora-compliance
title: DORA Compliance
sidebar_label: DORA Compliance
description: 'Digital Operational Resilience Act compliance for financial sector digital resilience'
keywords: [DORA, financial compliance, operational resilience, security controls, incident response]
---

# DORA Compliance

Learn how Juro's deterministic, signed compliance scanner surfaces DORA (Digital Operational Resilience Act) gaps in your codebase. Coverage is scoped to a defined DORA rule pack — explicit, auditable, and not aspirational.

## ✅ **Current Implementation Status**

Juro includes **6 comprehensive DORA rules** that are fully implemented and actively scanning your code:

### **Implemented Rules**
1. **Logging** - Critical ICT systems must have comprehensive logging
2. **Encryption** - Data at rest and in transit must be encrypted
3. **Incident Response** - Procedures must be documented
4. **Business Continuity** - Disaster recovery must be planned
5. **Third-Party ICT Risk** - Third-party risk management must be implemented
6. **Resilience Testing** - Digital resilience testing must be conducted regularly

### **Coverage Details**
- **Severity Levels**: HIGH, MEDIUM
- **File Types**: All programming languages + configuration files (.env, .yaml, .yml, .sql)
- **Context Patterns**: Security implementation patterns and compliance requirements
- **Real-Time Scanning**: Available in VS Code extension with instant feedback

## Key DORA Requirements

### **ICT Risk Management**
- Comprehensive risk management framework
- Regular risk assessments and updates
- Risk mitigation strategies
- Incident response procedures

### **Incident Reporting**
- Incident detection and classification
- Timely reporting to authorities
- Root cause analysis
- Lessons learned documentation

### **Digital Operational Resilience Testing**
- Regular penetration testing
- Vulnerability assessments
- Business continuity testing
- Crisis communication testing

### **ICT Third-Party Risk Management**
- Third-party risk assessment
- Contract management
- Vendor monitoring
- Exit strategies

## Common DORA Violations

### **Security Controls**
- Weak authentication mechanisms
- Missing encryption for sensitive data
- Inadequate access controls
- Poor password policies

### **Incident Response**
- Missing incident detection systems
- Inadequate response procedures
- Poor escalation mechanisms
- Insufficient documentation

### **Risk Management**
- Incomplete risk assessments
- Missing threat modeling
- Inadequate vulnerability management
- Poor risk monitoring

### **Monitoring & Logging**
- Insufficient audit logging
- Missing security monitoring
- Inadequate log retention
- Poor log analysis

## Juro DORA Scanning

### **Command Line Scanning**
```bash
# Scan for DORA violations
juro scan --path ./src --rules dora --format json

# Scan with specific severity threshold
juro scan --path ./src --rules dora --severity-threshold HIGH

# Generate detailed report
juro scan --path ./src --rules dora --format html --output dora-report.html
```

### **VS Code Extension**
- **Real-Time Scanning**: Violations appear instantly as you type
- **Inline Highlighting**: Visual indicators for DORA violations
- **Hover Tooltips**: Detailed information and fix suggestions
- **DORA Posture Score**: Real-time 0–100 score against the loaded DORA rule pack, with rule-pack version + scope statement always visible (see the [Posture Score contract](https://github.com/jecertis/juro-platform/blob/main/contracts/posture-score.md))

### **GitHub Actions Integration**
```yaml
- name: DORA Compliance Check
  uses: juro/compliance-action@v1
  with:
    api-key: ${{ secrets.JURO_API_KEY }}
    regulations: 'DORA'
    fail-on-critical: true
    comment-on-violations: true
```

## Code Examples

### **Security Controls Implementation**

#### **Good: Strong Authentication**
```javascript
// Multi-factor authentication
const authenticateUser = async (credentials) => {
  const user = await validateCredentials(credentials);
  if (user) {
    const mfaToken = await generateMFAToken(user.id);
    return { user, mfaToken };
  }
  throw new Error('Invalid credentials');
};

// Encrypted password storage
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};
```

#### **Bad: Weak Security**
```javascript
// Plain text password storage
const user = {
  username: 'admin',
  password: 'password123' // ❌ DORA violation
};

// No encryption for sensitive data
localStorage.setItem('userData', JSON.stringify(sensitiveData)); // ❌ DORA violation
```

### **Incident Response Implementation**

#### **Good: Comprehensive Logging**
```javascript
// Security event logging
const logSecurityEvent = (event, severity, details) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    severity,
    details,
    userId: getCurrentUserId(),
    sessionId: getCurrentSessionId()
  };
  
  // Send to security monitoring system
  securityLogger.log(logEntry);
  
  // Alert if critical
  if (severity === 'CRITICAL') {
    alertSecurityTeam(logEntry);
  }
};
```

#### **Bad: Missing Incident Response**
```javascript
// No logging for security events
const processPayment = (paymentData) => {
  // Process payment without logging
  return processPaymentInternal(paymentData); // ❌ DORA violation
};
```

### **Risk Assessment Implementation**

#### **Good: Vulnerability Scanning**
```javascript
// Regular security checks
const performSecurityScan = async () => {
  const vulnerabilities = await scanForVulnerabilities();
  const riskScore = calculateRiskScore(vulnerabilities);
  
  if (riskScore > RISK_THRESHOLD) {
    await notifySecurityTeam(vulnerabilities);
    await generateRiskReport(vulnerabilities);
  }
};

// Automated risk monitoring
setInterval(performSecurityScan, 24 * 60 * 60 * 1000); // Daily
```

#### **Bad: No Risk Management**
```javascript
// No security scanning or risk assessment
const deployToProduction = (code) => {
  // Deploy without security checks
  return deployCode(code); // ❌ DORA violation
};
```

## Compliance Checklist

### **Automated Checks (Juro)**
- [x] **Security Controls** - Automatically scanned
- [x] **Incident Response** - Automatically scanned
- [x] **Risk Assessment** - Automatically scanned
- [x] **Monitoring & Logging** - Automatically scanned

### **Manual Verification**
- [ ] ICT risk management framework is documented
- [ ] Incident response procedures are tested
- [ ] Third-party risk assessments are conducted
- [ ] Regular penetration testing is performed
- [ ] Business continuity plans are updated
- [ ] Staff training on DORA requirements

## DORA Compliance Timeline

### **Phase 1: Foundation (Months 1-6)**
- Implement basic security controls
- Establish incident response procedures
- Set up monitoring and logging
- Conduct initial risk assessment

### **Phase 2: Enhancement (Months 7-12)**
- Strengthen security measures
- Improve incident response capabilities
- Enhance risk management processes
- Implement third-party risk management

### **Phase 3: Optimization (Months 13-18)**
- Advanced security controls
- Automated incident response
- Continuous risk monitoring
- Regular compliance testing

## Resources

- [DORA Official Text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022R2554)
- [EBA DORA Guidelines](https://www.eba.europa.eu/regulation-and-policy/operational-resilience)
- [Juro DORA Scanner](/docs/features/compliance-scanning)

---

**Ready to ensure DORA compliance?** [Get started with Juro's DORA scanning](/docs/getting-started/installation) and automate your financial sector compliance requirements!
