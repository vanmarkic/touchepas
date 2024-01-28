import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled, { css } from 'styled-components';

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  padding: 2rem;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 60px;
`;
const StyledA=styled.a`
display: flex;
justify-content: center;
align-items: center;
`;

export const Footer: React.FC<any> = () => {

  return (
    <StyledFooter>
      <StyledA href="https://rwdh.be/" target="_blank">
        <StaticImage
          placeholder="none"
          height={30}
          alt="rwdh logo"
          src="../logo/partners/rwdh.svg"
        />
      </StyledA>

      <StyledA href="https://www.lacsc.be/" target="_blank">
        <StaticImage placeholder="none" height={40} alt="csc logo" src="../logo/partners/csc.png" />
      </StyledA>

      <StyledA href="https://www.moc.be/" target="_blank">
        <StaticImage placeholder="none" height={40} alt="moc logo" src="../logo/partners/moc.png" />
      </StyledA>

      <StyledA href="https://rapel.be/" target="_blank">
        <StaticImage
          placeholder="none"
          height={40}
          alt="rapel logo"
          src="../logo/partners/rapel.png"
        />
      </StyledA>

      <StyledA href="https://www.solidaris.be/" target="_blank">
        <StaticImage
          placeholder="none"
          height={30}
          alt="csc logo"
          src="../logo/partners/solidaris.png"
        />
      </StyledA>

      <StyledA href="https://fgtb-wallonne.be/" target="_blank">
        <StaticImage
          placeholder="none"
          height={35}
          alt="csc logo"
          src="../logo/partners/FGTB.jpg"
        />
      </StyledA>

      <StyledA href="https://www.rwade.be/" target="_blank">
        <StaticImage
          placeholder="none"
          height={50}
          alt="csc logo"
          src="../logo/partners/RWADE.jpg"
        />
      </StyledA>

      <StyledA href="https://www.cepag.be/" target="_blank">
        <StaticImage
          placeholder="none"
          height={40}
          alt="csc logo"
          src="../logo/partners/CEPAG.jpg"
        />
      </StyledA>
    </StyledFooter>
  );
};
