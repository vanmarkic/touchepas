import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
const SlicedMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-aspect-ratio: 1/1) {
    max-width: 350px;
  }
`;
const StyledContact = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuContent = () => {
  return (
    <>
      <SlicedMenu>
        <Link
          to="http://www.google.com"
          style={{ flex: "1 0 29% ", position: "relative" }}
          as="div"
        >
          <p>Hello</p>
        </Link>
        <Link
          to="http://www.google.com"
          style={{ flex: "1 0 29% ", position: "relative" }}
          as="div"
        >
          <p>Hello</p>
        </Link>
      </SlicedMenu>
      <StyledContact>
        <p>Hello</p>
        <p>Hello</p>
      </StyledContact>
    </>
  );
};
