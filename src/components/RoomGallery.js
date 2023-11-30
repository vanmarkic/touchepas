import * as React from "react";
import styled from "styled-components";
// import Img from "gatsby-image";

import { GatsbyImage } from "gatsby-plugin-image";

import { StyledProject } from "../components/bodyLayout";

import { Reset } from "styled-reset";

const StyledButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  width: fit-content;
`;
const RoomGallery = ({ data }) => {
  return (
    <>
      {data.group.map((group) => (
        <StyledProject>
          {group.edges
            .filter((e, i) => i === 0)
            .map((edge) => (
              // <StyledButton className="image" onClick={() => console.log("rrea")}>
              <GatsbyImage
                key={edge.node.id}
                alt={"image"}
                image={edge.node.childImageSharp.gatsbyImageData}
                objectFit="contain"
                loading="eager"
              />
              // </StyledButton>
            ))}
        </StyledProject>
      ))}
    </>
  );
};

export default RoomGallery;
