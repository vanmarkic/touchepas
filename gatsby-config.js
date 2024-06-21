/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config({
  path: '.env.' + process.env.NODE_ENV,
});

module.exports = {
  siteMetadata: {
    title: 'Touche pas à mon loyer',
    siteUrl: 'https://www.touchepasamonloyer.be',
  },
  trailingSlash: 'always',
  // pathPrefix: '/touchepas',
  plugins: [
    'gatsby-plugin-styled-components',
    // "gatsby-plugin-google-gtag",
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '183',
        matomoUrl: 'https://piwik.domainepublic.net',
        siteUrl: 'https://touchepasamonloyer.be',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Touche pas à mon loyer',
        short_name: 'Touche Pas',
        // start_url: '/',
        background_color: '#ffffff',
        theme_color: '#150d63',
        display: 'minimal-ui',
        // Generate PWA icons and a favicon
        icon: 'src/logo/favicon/android-chrome-512x512.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-transformer-remark',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-image',
      options: {
        name: 'img',
        path: './src/images/projects/',
        plugins: ['gatsby-plugin-sharp'],
      },
      __key: 'img',
    },
  ],
};
