import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function RegulationsPage() {
  return (
    <Layout title="Compliance Regulations" description="Supported compliance regulations and standards">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Compliance Regulations</h1>
            <p className="lead">
              Juro supports comprehensive compliance scanning across multiple regulations 
              and standards to ensure your code meets industry requirements.
            </p>
            
            <div className="margin-vert--lg">
              <h2>Supported Regulations</h2>
              <div className="row">
                <div className="col col--6">
                  <div className="card">
                    <div className="card__header">
                      <h3>GDPR</h3>
                      <span className="badge badge--primary">Data Privacy</span>
                    </div>
                    <div className="card__body">
                      <p>General Data Protection Regulation compliance for data privacy and protection.</p>
                      <ul>
                        <li>Data anonymization checks</li>
                        <li>Consent management validation</li>
                        <li>Data retention policies</li>
                        <li>Privacy by design principles</li>
                      </ul>
                      <Link to="/docs/regulations/gdpr-compliance" className="button button--primary">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col col--6">
                  <div className="card">
                    <div className="card__header">
                      <h3>DORA</h3>
                      <span className="badge badge--primary">EU</span>
                    </div>
                    <div className="card__body">
                      <p>Digital Operational Resilience Act — ICT risk, incident response, third-party oversight for financial entities.</p>
                      <ul>
                        <li>Resilience and incident response checks</li>
                        <li>Third-party ICT risk surfacing</li>
                        <li>Operational continuity validation</li>
                        <li>Logging and encryption controls</li>
                      </ul>
                      <Link to="/docs/regulations/dora-compliance" className="button button--primary">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row margin-top--md">
                <div className="col col--6">
                  <div className="card">
                    <div className="card__header">
                      <h3>DPDP (India)</h3>
                      <span className="badge badge--warning">India</span>
                    </div>
                    <div className="card__body">
                      <p>Digital Personal Data Protection Act — consent, notice, Data Principal rights, Data Fiduciary duties.</p>
                      <ul>
                        <li>Consent and notice patterns</li>
                        <li>Data Principal rights (access, correction, erasure)</li>
                        <li>Cross-border transfer checks</li>
                        <li>Children's data handling</li>
                      </ul>
                      <Link to="/docs/regulations/dpdp-compliance" className="button button--primary">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>Additional Standards</h2>
              <div className="row">
                <div className="col col--4">
                  <div className="card">
                    <div className="card__header">
                      <h4>WCAG</h4>
                    </div>
                    <div className="card__body">
                      <p>Web Content Accessibility Guidelines for inclusive design.</p>
                    </div>
                  </div>
                </div>
                <div className="col col--4">
                  <div className="card">
                    <div className="card__header">
                      <h4>CSP</h4>
                    </div>
                    <div className="card__body">
                      <p>Content Security Policy implementation and validation.</p>
                    </div>
                  </div>
                </div>
                <div className="col col--4">
                  <div className="card">
                    <div className="card__header">
                      <h4>DORA</h4>
                    </div>
                    <div className="card__body">
                      <p>Digital Operational Resilience Act compliance for financial services.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>Compliance Scanning Features</h2>
              <div className="row">
                <div className="col col--6">
                  <h4>Automated Detection</h4>
                  <ul>
                    <li>Project type recognition</li>
                    <li>Framework detection</li>
                    <li>Regulation mapping</li>
                    <li>Risk assessment</li>
                  </ul>
                </div>
                <div className="col col--6">
                  <h4>Intelligent Analysis</h4>
                  <ul>
                    <li>Context-aware scanning</li>
                    <li>False positive reduction</li>
                    <li>Priority scoring</li>
                    <li>Remediation suggestions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>Getting Started</h2>
              <p>
                Ready to ensure your code meets compliance standards? Start with our{' '}
                <Link to="/docs/getting-started/first-scan">first scan guide</Link>{' '}
                or explore specific regulations.
              </p>
              <div className="button-group">
                <Link to="/docs/getting-started/first-scan" className="button button--primary">
                  Run Your First Scan
                </Link>
                <Link to="/docs/features/compliance-scanning" className="button button--secondary">
                  Learn About Scanning
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
