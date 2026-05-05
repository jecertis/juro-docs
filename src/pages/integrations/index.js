import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function IntegrationsPage() {
  return (
    <Layout title="Integrations" description="Integrate Juro with your development workflow">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Integrations</h1>
            <p className="lead">
              Seamlessly integrate Juro compliance scanning into your existing development 
              workflow with our comprehensive integration options.
            </p>
            
            <div className="margin-vert--lg">
              <h2>Development Workflow Integrations</h2>
              <div className="row">
                <div className="col col--6">
                  <div className="card">
                    <div className="card__header">
                      <h3>GitHub Actions</h3>
                    </div>
                    <div className="card__body">
                      <p>Automated compliance checks in your CI/CD pipeline with PR comments and status checks.</p>
                      <Link to="/docs/integrations/github-actions" className="button button--primary">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col col--6">
                  <div className="card">
                    <div className="card__header">
                      <h3>CLI Tools</h3>
                    </div>
                    <div className="card__body">
                      <p>Command-line interface for local scanning, custom rules, and automated workflows.</p>
                      <Link to="/docs/integrations/cli-tools" className="button button--primary">
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
                      <h3>IDE Setup</h3>
                    </div>
                    <div className="card__body">
                      <p>Real-time compliance feedback directly in your IDE with instant violation highlighting.</p>
                      <Link to="/docs/integrations/ide-setup" className="button button--primary">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col col--6">
                  <div className="card">
                    <div className="card__header">
                      <h3>MCP Protocol</h3>
                    </div>
                    <div className="card__body">
                      <p>Model Context Protocol integration for AI agent communication and automation.</p>
                      <Link to="/docs/integrations/mcp-protocol" className="button button--primary">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>Quick Setup Examples</h2>
              
              <div className="card">
                <div className="card__header">
                  <h3>GitHub Actions Workflow</h3>
                </div>
                <div className="card__body">
                  <pre><code>{`name: Compliance Check
on: [push, pull_request]

jobs:
  compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Juro Compliance Check
        uses: juro/compliance-action@v1
        with:
          regulations: '["GDPR", "DORA", "DPDP"]'
          fail-on-violations: true`}</code></pre>
                </div>
              </div>

              <div className="card margin-top--md">
                <div className="card__header">
                  <h3>CLI Installation</h3>
                </div>
                <div className="card__body">
                  <pre><code>{`# Install Juro CLI
npm install -g @juro/cli

# Scan your project
juro scan --project ./my-project

# Set up git hooks
juro setup --git-hooks`}</code></pre>
                </div>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>Supported Platforms</h2>
              <div className="row">
                <div className="col col--4">
                  <h4>Version Control</h4>
                  <ul>
                    <li>GitHub</li>
                    <li>GitLab</li>
                    <li>Bitbucket</li>
                    <li>Azure DevOps</li>
                  </ul>
                </div>
                <div className="col col--4">
                  <h4>CI/CD Platforms</h4>
                  <ul>
                    <li>GitHub Actions</li>
                    <li>GitLab CI</li>
                    <li>Jenkins</li>
                    <li>CircleCI</li>
                    <li>Azure Pipelines</li>
                  </ul>
                </div>
                <div className="col col--4">
                  <h4>IDEs & Editors</h4>
                  <ul>
                    <li>VS Code</li>
                    <li>IntelliJ IDEA</li>
                    <li>Vim/Neovim</li>
                    <li>Emacs</li>
                    <li>CLI Tools</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>Get Started</h2>
              <p>
                Choose your integration method and follow our step-by-step guides to get 
                Juro working with your development workflow.
              </p>
              <div className="button-group">
                <Link to="/docs/getting-started/installation" className="button button--primary">
                  Installation Guide
                </Link>
                <Link to="/docs/tutorials/github-setup" className="button button--secondary">
                  GitHub Setup Tutorial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
