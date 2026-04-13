// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Juro Compliance Platform',
  tagline: 'Automated compliance scanning and AI-powered code analysis for modern development teams',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.jurocompliant.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'juro',
  projectName: 'juro-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/juro/juro-docs/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/juro/juro-docs/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/juro-social-card.jpg',
      navbar: {
        title: 'Juro',
        logo: {
          alt: 'Juro Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/api',
            label: 'API Reference',
            position: 'left',
          },
          {
            to: '/regulations',
            label: 'Regulations',
              position: 'left',
          },
          {
            to: '/integrations',
            label: 'Integrations',
            position: 'left',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left',
          },
          {
            href: 'https://github.com/juro/juro-mcp-server',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started/installation',
              },
              {
                label: 'Features',
                to: '/docs/features/compliance-scanning',
              },
              {
                label: 'Support',
                to: '/docs/support/faq',
              },
            ],
          },
          {
            title: 'Integrations',
            items: [
              {
                label: 'GitHub Actions',
                to: '/docs/integrations/github-actions',
              },
              {
                label: 'CLI Tools',
                to: '/docs/integrations/cli-tools',
              },
              {
                label: 'IDE Setup',
                to: '/docs/integrations/ide-setup',
              },
            ],
          },
          {
            title: 'Compliance',
            items: [
              {
                label: 'GDPR',
                to: '/docs/regulations/gdpr-compliance',
              },
              {
                label: 'SOC 2',
                to: '/docs/regulations/soc2-compliance',
              },
              {
                label: 'OWASP',
                to: '/docs/regulations/owasp-security',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/juro/juro-mcp-server',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/juro',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/juro_dev',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Juro. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'json', 'yaml'],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'YOUR_APP_ID',
        // Public API key: it is safe to commit it
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'juro-docs',
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push
        externalUrlRegex: 'external\\.com|domain\\.com',
        // Optional: Replace parts of the item URLs from Algolia
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp
          to: '/',
        },
        // Optional: Algolia search parameters
        searchParameters: {},
        // Optional: path for search page that enabled by default (`false` to disable)
        searchPagePath: 'search',
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'support_us',
        content:
          '⭐️ If you like Juro, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/juro/juro-mcp-server">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/juro_dev">Twitter</a>!',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },
    }),

  plugins: [
    [
      '@docusaurus/plugin-google-analytics',
      {
        trackingID: 'G-XXXXXXXXXX',
        anonymizeIP: true,
      },
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-XXXXXXXXXX',
        anonymizeIP: true,
      },
    ],
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

  // Custom fields for SEO
  customFields: {
    keywords: [
      'compliance scanning',
      'GDPR compliance',
      'SOC 2 compliance',
      'OWASP security',
      'automated compliance',
      'AI code analysis',
      'GitHub Actions',
      'CI/CD compliance',
      'privacy compliance',
      'security scanning'
    ],
  },
};

module.exports = config;
