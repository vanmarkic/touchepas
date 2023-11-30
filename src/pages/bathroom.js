import * as React from "react";

import { StyledCategory } from "../components/bodyLayout";
import RoomGallery from "../components/RoomGallery";

import Layout from "../components/layout";
import { useStaticQuery, graphql } from "gatsby";

const BathroomPage = () => {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { glob: "projects/**" } }) {
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

  // const bedroom = useStaticQuery(graphql`
  //   query {
  //     allFile(filter: { relativeDirectory: { glob: "projects/bedroom/**" } }) {
  //       group(field: { relativeDirectory: SELECT }) {
  //         edges {
  //           node {
  //             id
  //             relativePath
  //             childImageSharp {
  //               gatsbyImageData(layout: CONSTRAINED)
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);
  return (
    <Layout>
      <StyledCategory>
        <RoomGallery data={allFile} />
      </StyledCategory>
    </Layout>
  );
};

export default BathroomPage;

export { Head } from "./index";
