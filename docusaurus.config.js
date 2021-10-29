const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
const config = {
  title: 'Midway',
  tagline: 'Midway is a fullstack framework for web',
  url: 'https://midwayjs.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'midwayjs', // Usually your GitHub org/user name.
  projectName: 'midway-next-site', // Usually your repo name.
  stylesheets: ['//at.alicdn.com/t/font_2797741_dnh1sm1jan.css'],
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn'],
  },
  plugins: [
    './plugin.js'
  ],
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
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      favicon: 'img/logo.svg',
      metadatas: [{
        name: 'referrer',
        content: 'no-referrer'
      }],
      navbar: {
        title: 'Midway',
        logo: {
          alt: 'midway logo',
          src: 'img/logo.svg',
        },
        items: [
          ...require('./config/navbar'),
          {
            label: 'Node 地下铁',
            href: 'https://subway.midwayjs.org/',
            position: 'right',
          },
        ],
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
      //       title: 'More',
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
      //   copyright: `Copyright © ${new Date().getFullYear()} Midway. Built with Docusaurus.`,
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
