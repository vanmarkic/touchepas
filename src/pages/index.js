import * as React from "react";
import { StyledCategory, StyledView } from "../components/bodyLayout";
import Layout from "../components/layout";

const IndexPage = () => {
  return (
    <Layout>
      <StyledCategory>
        <StyledView>
          <div>Hello</div>
        </StyledView>
        <StyledView>
          <div>Hello 2</div>
        </StyledView>
      </StyledCategory>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <title>Touche pas à mon loyer</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </>
);
