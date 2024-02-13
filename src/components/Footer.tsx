import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled, { css } from 'styled-components';

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  padding:  0.5rem 1rem;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 15px;
`;

const StyledA = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledH6 = styled.h6`
 color:var(--blue);
`;
export const Footer: React.FC<any> = () => {
  return (
    <StyledFooter>
      <StyledH6>UNE INITIATIVE DE :</StyledH6>
      <StyledContainer>
        <StyledA href="https://rwdh.be/" target="_blank">
          <StaticImage
            placeholder="none"
            height={60}
            alt="rwdh logo"
            src="../logo/partners/rwdh.svg"
          />
        </StyledA>
      </StyledContainer>
      <StyledH6>AVEC LE SOUTIEN DE :</StyledH6>
      <StyledContainer>
        <StyledA href="https://www.lacsc.be/" target="_blank">
          <StaticImage
            placeholder="none"
            height={40}
            alt="csc logo"
            src="../logo/partners/csc.png"
          />
        </StyledA>

        <StyledA href="https://www.moc.be/" target="_blank">
          <StaticImage
            placeholder="none"
            height={40}
            alt="moc logo"
            src="../logo/partners/moc.png"
          />
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
        <StyledA href="https://www.rwlp.be/" target="_blank">
          <StaticImage
            placeholder="none"
            height={30}
            alt="csc logo"
            src="../logo/partners/Rwlp.png"
          />
        </StyledA>
        <StyledA href="https://www.equipespopulaires.be/" target="_blank">
          <StaticImage
            placeholder="none"
            height={40}
            alt="csc logo"
            src="../logo/partners/EP.png"
          />
        </StyledA>
      </StyledContainer>
    </StyledFooter>
  );
};
