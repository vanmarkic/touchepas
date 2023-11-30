import * as React from "react";

import { StyledCategory } from "../components/bodyLayout";
import RoomGallery from "../components/RoomGallery";

import Layout from "../components/layout";
import { useStaticQuery, graphql } from "gatsby";

const LivingRoomPage = () => {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { glob: "projects/living-room/**" } }) {
        group(field: { relativeDirectory: SELECT }) {
          edges {
            node {
              id
              relativePath
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 1000)
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

export default LivingRoomPage;

export { Head } from "./index";
