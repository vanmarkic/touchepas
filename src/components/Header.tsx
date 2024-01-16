import * as React from 'react';
import styled from 'styled-components';
import { whenVerticalAspectRatio } from '../styles/global';
import { StaticImage } from 'gatsby-plugin-image';
import { heroSectionID } from '../pages';

import addToMailchimp from 'gatsby-plugin-mailchimp';
import { set } from 'date-fns';
import { HideWhenVertical } from './layout';

export const HEADER_HEIGHT = '80px';

export const StyledInput = styled.input`
  border: 1px solid grey;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: var(--radius);
  background-color: #f8f8f8;
  outline: none;
  width: 280px;
  padding: 6px;
  font-size: medium;
  font-weight: normal;
  max-height: 3rem;

  &:focus {
    border-color: 2px solid var(--blue);
    box-shadow: 0 0 0 1px var(--blue);
    outline: none;
  }
  &:hover {
    border-color: 0px solid var(--blue);
    box-shadow: 0 0 0 1px var(--blue);
    outline: none;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  position: relative;
`;
const FlexEnd = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  cursor: pointer;
  height: 100%;
`;

const StyledHeader = styled.div`
  padding: 0.5rem 1rem;
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
const StyleButton = styled.button`
  color: var(--dark-red);
  border: none;
  background-color: transparent;
`;
const StyledH6 = styled.h6`
  padding-right: 5px;

  width: fit-content;
  position: sticky;
  letter-spacing: 0.6px;
  color: var(--blue);
  height: fit-content;
  font-size: 16px;
  text-transform: uppercase;

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
    <FlexEnd>
      <StyledH6>Inscrivez-vous à la Newsletter</StyledH6>
      <FlexDiv>
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

        {result && result !== null && (
          <p style={{ position: 'absolute', bottom: '-15px', textAlign: 'left', width: '350px', color:"var(--red)" ,fontSize:"12px", fontWeight:"500"}}>
            {result.msg}
          </p>
        )}
        <StyleButton onClick={handleSubmit}>
          <StaticImage
            alt="letter"
            layout="constrained"
            height={80}
            src={'../images/envelope.svg'}
            loading="eager"
          />
        </StyleButton>
      </FlexDiv>
    </FlexEnd>
  );
};
