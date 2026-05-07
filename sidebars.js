/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/first-scan',
        'getting-started/quick-setup',
        'getting-started/configuration',
      ],
    },
          {
            type: 'category',
            label: 'Features',
            items: [
              'features/compliance-scanning',
              'features/performance-optimization',
            ],
          },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/github-actions',
        'integrations/cli-tools',
        'integrations/ide-setup',
      ],
    },
    {
      type: 'category',
      label: 'Regulations',
      items: [
        'regulations/gdpr-compliance',
        'regulations/dora-compliance',
        'regulations/dpdp-compliance',
      ],
    },
          {
            type: 'category',
            label: 'Architecture',
            items: [
              'architecture/architecture-overview',
            ],
          },
          {
            type: 'category',
            label: 'Support',
            items: [
              'support/faq',
            ],
          },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

module.exports = sidebars;
