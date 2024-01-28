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

export const Footer: React.FC<any> = () => {
  return (
    <StyledFooter>
      <StaticImage placeholder="none" height={30} alt="rwdh logo" src="../logo/partners/rwdh.svg" />
      <StaticImage placeholder="none" height={40} alt="csc logo" src="../logo/partners/csc.png" />
      <StaticImage placeholder="none" height={40} alt="csc logo" src="../logo/partners/moc.png" />
      <StaticImage placeholder="none" height={40} alt="csc logo" src="../logo/partners/rapel.png" />
      <StaticImage placeholder="none" height={40} alt="csc logo" src="../logo/partners/FGTB.png" />
      <StaticImage placeholder="none" height={40} alt="csc logo" src="../logo/partners/CEPAG.jpg" />
      <StaticImage placeholder="none" height={40} alt="csc logo" src="../logo/partners/RWADE.jpg" />
      <StaticImage
        placeholder="none"
        height={30}
        alt="csc logo"
        src="../logo/partners/solidaris.png"
      />
    </StyledFooter>
  );
};
