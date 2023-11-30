import * as React from "react";

import { StyledCategory } from "../components/bodyLayout";
import RoomGallery from "../components/RoomGallery";

import Layout from "../components/layout";
import { useStaticQuery, graphql } from "gatsby";

const KitchenPage = () => {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { glob: "projects/kitchen/**" } }) {
        group(field: { relativeDirectory: SELECT }) {
          edges {
            node {
              id
              relativePath
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <StyledCategory>
        <RoomGallery data={allFile} />
      </StyledCategory>
    </Layout>
  );
};

export default KitchenPage;

export { Head } from "./index";
