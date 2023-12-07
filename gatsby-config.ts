/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Touche pas à mon loyer`,
    siteUrl: `https://www.touchepasamonloyer.be`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    // "gatsby-plugin-google-gtag",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    // "gatsby-plugin-manifest",
    "gatsby-transformer-remark",
    "gatsby-plugin-typescript",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Lexend Bold`,
            file: `https://fonts.googleapis.com/css2?family=Lexend:wght@700&display=swap`,
          },
          {
            name: `Lexend`,
            file: `https://fonts.googleapis.com/css2?family=Lexend:wght@400&display=swap`,
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-image",
      options: {
        name: "img",
        path: "./src/images/projects/",
        plugins: ["gatsby-plugin-sharp"],
      },
      __key: "img",
    },
  ],
};
