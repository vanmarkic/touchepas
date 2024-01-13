import * as React from 'react';
import styled from 'styled-components';
import { whenVerticalAspectRatio } from '../styles/global';
import { StaticImage } from 'gatsby-plugin-image';
import { heroSectionID } from '../pages';

import addToMailchimp from 'gatsby-plugin-mailchimp';
import { StyledButton, StyledInput } from './RentCalculator';

export const HEADER_HEIGHT = '70px';
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledHeader = styled.div`
  padding: 0.7rem;
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  column-gap: 0.5rem;
  top: 0px;
  background-color: white;
  color: var(--blue);
  height: fit-content;
  h4 {
    ${whenVerticalAspectRatio(`
      font-size: 1rem;
    `)};
  }
  img {
    max-height: 3rem;
  }
  height: ${HEADER_HEIGHT};
`;

const StyledH6 = styled.h6`
  padding-right: 5px;
  display: flex;
  width: 113px;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  color: var(--blue);
  height: fit-content;
  font-size: 14px;
`;

const RedSpan = styled.span`
  color: var(--dark-red);
`;

const Img = styled.img``;

const scrollToHeroSection = () => {
  const section = document.getElementById(heroSectionID);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

export const Header = () => {
  const [email, setEmail] = React.useState('');
  const [result, setResult] = React.useState<{ result: string; msg: string } | null>(null);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    await addToMailchimp(email).then((result: any) => {
      setResult(result);
    });
    // I recommend setting `result` to React state
    // but you can do whatever you want
  };

  return (
    <StyledHeader>
      <FlexDiv>
        <h4 style={{ cursor: 'pointer' }} onClick={scrollToHeroSection}>
          TOUCHE <RedSpan> PAS </RedSpan> À MON LOYER
        </h4>
        <StaticImage
          alt="logo"
          placeholder="blurred"
          layout="constrained"
          width={50}
          src={'../logo/logo.png'}
          loading="eager"
        />
      </FlexDiv>
      <FlexDiv>
        <StaticImage
          alt="letter"
          layout="constrained"
          height={80}
          src={'../images/envelope.svg'}
          loading="eager"
        />

        <StyledInput
          id="outlined-email-input"
          type="email"
          name="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FlexDiv style={{ width: '300px' }}>
          {result ? (
            <h6>{result.msg}</h6>
          ) : (
            <StyledButton onClick={handleSubmit}>Je m'inscris à la newsletter</StyledButton>
          )}
        </FlexDiv>
      </FlexDiv>
    </StyledHeader>
  );
};
