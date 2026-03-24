import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function BlogPage() {
  return (
    <Layout title="Blog" description="Latest news, updates, and insights from the Juro team">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Juro Blog</h1>
            <p className="lead">
              Stay updated with the latest news, features, and insights about automated 
              compliance scanning and AI-powered code analysis.
            </p>
            
            <div className="margin-vert--lg">
              <h2>Latest Posts</h2>
              <div className="row">
                <div className="col col--6">
                  <article className="card">
                    <div className="card__header">
                      <h3>Introducing Juro Compliance Platform</h3>
                      <small className="text--muted">December 2024</small>
                    </div>
                    <div className="card__body">
                      <p>
                        We're excited to announce the launch of Juro, a comprehensive 
                        compliance scanning platform that brings AI-powered analysis 
                        to your development workflow.
                      </p>
                      <Link to="/blog/introducing-juro" className="button button--primary">
                        Read More
                      </Link>
                    </div>
                  </article>
                </div>
                <div className="col col--6">
                  <article className="card">
                    <div className="card__header">
                      <h3>GDPR Compliance Made Simple</h3>
                      <small className="text--muted">December 2024</small>
                    </div>
                    <div className="card__body">
                      <p>
                        Learn how Juro's automated GDPR compliance scanning helps 
                        developers identify and fix privacy violations before they 
                        become problems.
                      </p>
                      <Link to="/blog/gdpr-compliance-made-simple" className="button button--primary">
                        Read More
                      </Link>
                    </div>
                  </article>
                </div>
              </div>
              
              <div className="row margin-top--md">
                <div className="col col--6">
                  <article className="card">
                    <div className="card__header">
                      <h3>AI-Powered Code Analysis</h3>
                      <small className="text--muted">December 2024</small>
                    </div>
                    <div className="card__body">
                      <p>
                        Discover how our natural language processing capabilities 
                        make compliance scanning more intuitive and effective.
                      </p>
                      <Link to="/blog/ai-powered-code-analysis" className="button button--primary">
                        Read More
                      </Link>
                    </div>
                  </article>
                </div>
                <div className="col col--6">
                  <article className="card">
                    <div className="card__header">
                      <h3>GitHub Actions Integration</h3>
                      <small className="text--muted">December 2024</small>
                    </div>
                    <div className="card__body">
                      <p>
                        Set up automated compliance checks in your CI/CD pipeline 
                        with our new GitHub Actions integration.
                      </p>
                      <Link to="/blog/github-actions-integration" className="button button--primary">
                        Read More
                      </Link>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>Categories</h2>
              <div className="row">
                <div className="col col--3">
                  <div className="card">
                    <div className="card__body">
                      <h4>Product Updates</h4>
                      <p>Latest features and improvements</p>
                    </div>
                  </div>
                </div>
                <div className="col col--3">
                  <div className="card">
                    <div className="card__body">
                      <h4>Compliance</h4>
                      <p>Regulations and standards</p>
                    </div>
                  </div>
                </div>
                <div className="col col--3">
                  <div className="card">
                    <div className="card__body">
                      <h4>AI & ML</h4>
                      <p>Artificial intelligence insights</p>
                    </div>
                  </div>
                </div>
                <div className="col col--3">
                  <div className="card">
                    <div className="card__body">
                      <h4>Tutorials</h4>
                      <p>Step-by-step guides</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>Stay Updated</h2>
              <p>
                Subscribe to our newsletter to get the latest updates, tips, and 
                insights delivered directly to your inbox.
              </p>
              <div className="card">
                <div className="card__body">
                  <div className="row">
                    <div className="col col--8">
                      <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="input"
                        style={{width: '100%'}}
                      />
                    </div>
                    <div className="col col--4">
                      <button className="button button--primary" style={{width: '100%'}}>
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>Community</h2>
              <p>
                Join our community of developers, compliance experts, and security 
                professionals working together to make compliance easier.
              </p>
              <div className="button-group">
                <Link to="/docs/support/community" className="button button--primary">
                  Join Community
                </Link>
                <Link to="https://github.com/juro/juro-mcp-server" className="button button--secondary">
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
