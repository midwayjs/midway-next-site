const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
;(
  module.exports = {
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
            // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
          },
          theme: {
            customCss: [require.resolve('./src/css/custom.css')],
          },
        }),
      ],
    ],
    plugins: ['./plugin.js', [require.resolve('@cmfcmf/docusaurus-search-local'), {
      language: 'zh'
    }]],

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
)
