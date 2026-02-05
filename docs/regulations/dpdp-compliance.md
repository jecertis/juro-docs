---
id: dpdp-compliance
title: DPDP Compliance (India)
sidebar_label: DPDP (India)
description: 'Digital Personal Data Protection Act 2023 (India) compliance - consent, Data Principal rights, and data fiduciary duties'
keywords: [DPDP, India, data protection, consent, Data Principal, Data Fiduciary, Aadhaar, cross-border transfer, children's data]
---

# DPDP Compliance (India)

Learn how to ensure your code meets India's **Digital Personal Data Protection Act 2023 (DPDP)** requirements with Juro's compliance scanning.

## ✅ **Current Implementation Status**

Juro includes **25 comprehensive DPDP rules** that are fully implemented and actively scanning your code:

### **Implemented Rule Categories**
- **Consent & Notice** (5 rules) – Consent before processing, purpose-specific consent, withdrawal mechanism, privacy notice, multilingual notice
- **Data Principal Rights** (5 rules) – Access, correction, erasure, grievance redressal, nomination
- **Data Fiduciary Duties** (4 rules) – Data accuracy, retention, security safeguards, breach notification
- **Significant Data Fiduciary** (3 rules) – DPO appointment, DPIA, periodic audits
- **Cross-Border & Localization** (2 rules) – Transfer restrictions, data residency
- **Sensitive Data** (3 rules) – Aadhaar, PAN, mobile number handling
- **Children's Data** (2 rules) – Parental consent, no tracking/targeting
- **Documentation** (1 rule) – Processing records

### **Coverage Details**
- **Severity Levels**: CRITICAL, HIGH, MEDIUM
- **File Types**: TypeScript, JavaScript, TSX, JSX, Python, Java, JSON, YAML, HTML, MD
- **Pattern Types**: Variable detection (Indian identifiers), control checks (rights/consent/security), regex (purpose, retention, transfer)
- **CLI**: `./juro scan ./src -r DPDP`

## Key DPDP Requirements

### **Consent (Sections 4–7)**
- Obtain consent before processing personal data
- Consent must be specific to the purpose
- Provide an easy consent withdrawal mechanism

### **Notice (Section 5)**
- Provide clear notice before data collection
- Notice in English and scheduled Indian languages where applicable

### **Data Principal Rights (Sections 8–15)**
- Right to access personal data
- Right to correction
- Right to erasure (when consent withdrawn or data no longer necessary)
- Right to grievance redressal (designated officer, complaint mechanism)
- Right to nominate (for exercising rights after death/incapacity)

### **Data Fiduciary Duties (Section 8)**
- Ensure data accuracy
- Limit retention to what is necessary
- Implement reasonable security safeguards
- Report personal data breaches to the Data Protection Board

### **Significant Data Fiduciary (Sections 10–11)**
- Appoint a Data Protection Officer (based in India)
- Conduct Data Protection Impact Assessments
- Conduct periodic audits by an independent data auditor

### **Cross-Border Transfer (Section 16)**
- Transfer only to countries/territories notified by the Central Government
- Document data localization and residency where required

### **Sensitive Identifiers**
- **Aadhaar**: Encrypt, mask, and strictly control access; follow UIDAI guidelines
- **PAN**: Protect and mask when displayed
- **Mobile numbers**: Treat as personal data; collect only with consent

### **Children's Data (Section 9)**
- Verifiable parental/guardian consent for users under 18
- No tracking, behavioral monitoring, or targeted advertising directed at children

## Common DPDP Violations

### **Consent & Notice**
- Processing Aadhaar, PAN, or mobile without consent
- No privacy notice or purpose statement
- No consent withdrawal mechanism

### **Rights & Grievance**
- No data access, correction, or erasure endpoints
- No designated grievance officer or complaint mechanism

### **Security & Breach**
- No encryption or security safeguards for personal data
- No breach detection or notification procedure

### **Cross-Border & Children**
- Transferring data to restricted countries
- Processing children's data without parental consent or tracking children

## Best Practices

### **Consent and Notice**
```javascript
// Good: Explicit consent and notice
const consent = await getExplicitConsent(userId, purpose);
showPrivacyNotice({ purpose, dataCollected, rights, grievanceContact });

// Bad: No consent or notice
const user = { aadhaar, pan, mobile }; // Collected without consent
```

### **Data Principal Rights**
```javascript
// Good: Implement access, correction, erasure, grievance
app.get('/api/user/data', ensureAuth, dataAccessHandler);
app.put('/api/user/correct', ensureAuth, dataCorrectionHandler);
app.delete('/api/user/data', ensureAuth, dataErasureHandler);
app.post('/api/grievance', grievanceHandler);
```

### **Sensitive Data (Aadhaar, PAN, Mobile)**
```javascript
// Good: Encrypt and mask
const maskedAadhaar = maskAadhaar(encrypt(aadhaar));
// Consent and access controls in place

// Bad: Plain storage, no consent
const user = { aadhaar: 'xxxx-xxxx-1234', pan: 'ABCDE1234F' };
```

## Juro DPDP Scanning

### **CLI**
```bash
# DPDP-only scan
./juro scan ./src -r DPDP -o table

# DPDP + save report
./juro scan ./src -r DPDP -o json -f dpdp-report.json

# Filter by severity
./juro scan ./src -r DPDP --severity HIGH,CRITICAL
```

### **Rule Summary**
- **36 total rules** in Juro (5 GDPR, 6 DORA, 25 DPDP)
- List all: `./juro rules`
- DPDP rules use IDs such as `DPDP-CONSENT-001`, `DPDP-RIGHTS-001`, `DPDP-SENSITIVE-001`, etc.

## Compliance Checklist

### **Automated Checks (Juro)**
- [x] **Consent & Notice** – Scanned
- [x] **Data Principal Rights** – Scanned
- [x] **Data Fiduciary Duties** – Scanned
- [x] **Sensitive Data (Aadhaar, PAN, mobile)** – Scanned
- [x] **Children's Data** – Scanned
- [x] **Cross-Border Transfer** – Scanned

### **Manual Verification**
- [ ] Consent is free, specific, informed, and unambiguous
- [ ] Grievance officer designated and contact details published
- [ ] Breach response and notification process defined
- [ ] Data retention and erasure procedures documented

## Penalties (DPDP Act)

| Violation | Penalty (up to) |
|-----------|-----------------|
| Data breach / unauthorized transfer | ₹250 crore |
| Non-reporting of breach | ₹200 crore |
| Children's data violations | ₹200 crore |
| Other violations | ₹50–150 crore |

## Resources

- [Digital Personal Data Protection Act, 2023 (India)](https://www.meity.gov.in/content/digital-personal-data-protection-act-2023)
- [Juro Getting Started](/docs/getting-started/installation) – Setup and first scan
- [Juro Compliance Scanning](/docs/features/compliance-scanning) – How scanning works
