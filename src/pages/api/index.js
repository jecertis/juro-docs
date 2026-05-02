import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function ApiPage() {
  return (
    <Layout title="API Reference" description="Juro Compliance Platform API Reference">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>API Reference</h1>
            <p className="lead">
              Complete API reference for the Juro Compliance Platform. Access all MCP tools, 
              endpoints, and integration methods.
            </p>
            
            <div className="margin-vert--lg">
              <h2>MCP Tools</h2>
              <p>Model Context Protocol tools for AI agent integration:</p>
              <ul>
                <li><Link to="/docs/api/mcp-tools">MCP Tools Overview</Link></li>
                <li><Link to="/docs/api/error-codes">Error Codes</Link></li>
                <li><Link to="/docs/api/examples">Code Examples</Link></li>
                <li><Link to="/docs/api/webhooks">Webhooks</Link></li>
              </ul>
            </div>

            <div className="margin-vert--lg">
              <h2>Quick Start</h2>
              <div className="card">
                <div className="card__header">
                  <h3>Basic API Usage</h3>
                </div>
                <div className="card__body">
                  <pre><code>{`// Connect to Juro MCP Server
const client = new MCPClient('localhost', 3000);

// Scan directory for compliance
const result = await client.callTool('scan_directory', {
  path: './my-project',
  regulations: ['GDPR', 'DORA']
});

console.log(result.violations);`}</code></pre>
                </div>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>Available Tools</h2>
              <div className="row">
                <div className="col col--6">
                  <div className="card">
                    <div className="card__header">
                      <h4>Compliance Scanning</h4>
                    </div>
                    <div className="card__body">
                      <p>Scan directories and files for compliance violations</p>
                      <ul>
                        <li>scan_directory</li>
                        <li>scan_file</li>
                        <li>get_scan_results</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col col--6">
                  <div className="card">
                    <div className="card__header">
                      <h4>Rule Management</h4>
                    </div>
                    <div className="card__body">
                      <p>Manage compliance rules and regulations</p>
                      <ul>
                        <li>list_rules</li>
                        <li>get_rule_details</li>
                        <li>validate_rule</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>AI Agent Integration</h2>
              <p>Tools for AI agents to run compliance scans and interpret results:</p>
              <ul>
                <li><strong>Natural Language Queries</strong> - Ask questions about your code in plain English</li>
                <li><strong>Intelligent Analysis</strong> - AI-powered code analysis and suggestions</li>
                <li><strong>Auto-Discovery</strong> - Automatically detect project types and regulations</li>
                <li><strong>Learning System</strong> - AI learns from your feedback and improves over time</li>
              </ul>
            </div>

            <div className="margin-vert--lg">
              <h2>Get Started</h2>
              <p>
                Ready to integrate with Juro? Check out our{' '}
                <Link to="/docs/getting-started/installation">installation guide</Link>{' '}
                and <Link to="/docs/api/examples">code examples</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
