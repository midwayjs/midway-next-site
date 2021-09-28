const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
const config = {
  title: 'Midway',
  tagline: 'Midway is a fullstack framework for web',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'midwayjs', // Usually your GitHub org/user name.
  projectName: 'midway', // Usually your repo name.
  stylesheets: ['//at.alicdn.com/t/font_2797741_dnh1sm1jan.css'],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./config/sidebar.js'),
          // Please change this to your repo.
          editUrl(params) {
            const url = params.permalink.replace('/docs/', '')
            return `https://www.yuque.com/midwayjs/midway_v2/${url}`
          }
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
      }),
    ],
  ],
  plugins: [
    './plugin.js',
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Midway.js',
        logo: {
          alt: 'midway logo',
          src: 'img/logo.svg',
        },
        items: require('./config/navbar'),
      },
      algolia: {
        apiKey: 'e1ea1dc67df77815018e6503e120586a',
        indexName: 'midway',
        contextualSearch: true,
      },
      // footer: {
      //   style: 'dark',
      //   links: [
      //     {
      //       title: 'Docs',
      //       items: [
      //         {
      //           label: 'Tutorial',
      //           to: '/docs/intro',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Community',
      //       items: [
      //         {
      //           label: 'Stack Overflow',
      //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //         },
      //         {
      //           label: 'Discord',
      //           href: 'https://discordapp.com/invite/docusaurus',
      //         },
      //         {
      //           label: 'Twitter',
      //           href: 'https://twitter.com/docusaurus',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'More',
      //       items: [
      //         {
      //           label: 'Blog',
      //           to: '/blog',
      //         },
      //         {
      //           label: 'GitHub',
      //           href: 'https://github.com/facebook/docusaurus',
      //         },
      //       ],
      //     },
      //   ],
      //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      // },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

if (process.env.USE_LOCAL_SEARCH) {
  config.plugins.push([
    require.resolve("@easyops-cn/docusaurus-search-local"),
    {
      indexBlog: false,
      hashed: true,
      language: ["en", "zh"],
    },
  ])
}

module.exports = config;
