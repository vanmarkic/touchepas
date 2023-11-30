/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `jajrag`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    // "gatsby-plugin-google-gtag",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    // "gatsby-plugin-manifest",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Architects Daughter`,
            file: `https://fonts.googleapis.com/css2?family=Architects+Daughter:wght@400;600;700&display=swap`,
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: "projects",
    //     path: "./src/images/projects/",
    //   },
    //   __key: "projects",
    // },
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "pages",
    //     path: "./src/pages/",
    //   },
    //   __key: "pages",
    // },
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
