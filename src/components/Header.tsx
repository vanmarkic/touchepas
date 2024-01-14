import * as React from 'react';
import styled from 'styled-components';
import { whenVerticalAspectRatio } from '../styles/global';
import { StaticImage } from 'gatsby-plugin-image';
import { heroSectionID } from '../pages';

import addToMailchimp from 'gatsby-plugin-mailchimp';
import { StyledButton, StyledInput } from './RentCalculator';
import { set } from 'date-fns';
import { HideWhenVertical } from './layout';

export const HEADER_HEIGHT = '80px';

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
`;

const StyledHeader = styled.div`
  padding: 1rem;
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  column-gap: 0.5rem;
  top: 0px;
  background-color: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(5px);
  height: 80px;
  color: var(--blue);
  height: fit-content;
  h4 {
    ${whenVerticalAspectRatio(`
      font-size: 1.2rem;
    `)};
  }
  img {
    max-height: 3rem;
  }
`;

const StyledH6 = styled.h6`
  padding-right: 5px;
  display: flex;
  width: fit-content;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  color: var(--blue);
  height: fit-content;
  font-size: 0.9rem;

  ${whenVerticalAspectRatio(`
     display:none
    `)};
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
  return (
    <StyledHeader>
      <FlexDiv>
        <h4 onClick={scrollToHeroSection}>
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
      <HideWhenVertical>
        <NewsletterForm />
      </HideWhenVertical>
    </StyledHeader>
  );
};

export const NewsletterForm = () => {
  const [email, setEmail] = React.useState('');
  const [result, setResult] = React.useState<{ result: string; msg: string } | null>(null);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    await addToMailchimp(email).then((result: any) => {
      setResult(result);
    });
  };
  return (
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
        onChange={(e) => {
          setEmail(e.target.value);
          setResult(null);
        }}
      />
      <FlexDiv style={{ width: '500px' }}>
        {result ? (
          <h6>{result.msg}</h6>
        ) : (
          <StyledButton onClick={handleSubmit}>Je m'inscris à la newsletter</StyledButton>
        )}
      </FlexDiv>
    </FlexDiv>
  );
};
