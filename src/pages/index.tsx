import * as React from "react";
import { StyledCategory, StyledProject } from "../components/bodyLayout";
import Layout from "../components/layout";

const IndexPage: React.FC<{}> = () => {
  return (
    <Layout>
      <StyledCategory>
        <StyledProject>
          <div>Hello</div>
        </StyledProject>
        <StyledProject>
          <div>Hello 2</div>
        </StyledProject>
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
