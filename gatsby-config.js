/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: 'Touche pas à mon loyer',
    siteUrl: 'https://www.touchepasamonloyer.be',
  },
  pathPrefix: '/touchepas',
  plugins: [
    'gatsby-plugin-styled-components',
    // "gatsby-plugin-google-gtag",
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Touche pas à mon loyer',
        short_name: 'Touche Pas',
        start_url: '/',
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
      resolve: 'gatsby-omni-font-loader',
      options: {
        enableListener: true,
        preconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
        web: [
          {
            name: 'Lexend Bold',
            file: 'https://fonts.googleapis.com/css2?family=Lexend:wght@700&display=swap',
          },
          {
            name: 'Lexend',
            file: 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800;900&display=swap',
          },
        ],
      },
    },
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
