import * as React from "react";
import { StyledCategory, StyledProject } from "../components/bodyLayout";
import Layout from "../components/layout";

const IndexPage = () => {
  return (
    <Layout>
      <StyledCategory>
        <StyledProject>
          <div>Hello</div>
        </StyledProject>
      </StyledCategory>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <title>JAJRAG</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </>
);
