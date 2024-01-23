
import * as React from 'react';
import styled from 'styled-components';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import { whenVerticalAspectRatio } from '../styles/global';

import { set } from 'date-fns';

const StyleButton = styled.button`
  color: white;
  border: 1px solid var(--blue);
  border-radius: var(--radius);
  width: fit-content;
  font-size: 14px;
  padding: 0px 10px;
  height: 35px;
  background-color: var(--blue);
  box-shadow: 0 0 0 1px var(--blue);
  &:hover {
    border-color: 1px solid var(--red);
    background-color: transparent;
    color: var(--red);
    box-shadow: 0 0 0 1px var(--red);
    outline: none;
  }
`;
const StyledH6 = styled.h6`
  padding-right: 5px;
  width: 250px;
  top: -18px;
  position: absolute;
  letter-spacing: 0.6px;
  color: var(--blue);
  height: fit-content;
  font-size: 14px;
 
`;

const FlexEnd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  cursor: pointer;
  height: 100%;
  width: 100%;
  position:relative;
  ${whenVerticalAspectRatio(`
     align-items:center;
     margin-bottom:20px;
    `)};
`;

const FlexDiv = styled.div`
  display: flex;
  width:100%;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  position: relative;
  ${whenVerticalAspectRatio(`
      flex-direction:column;
    `)};
`;
export const StyledInput = styled.input`
  border: 1px solid grey;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: var(--radius);
  background-color: #f8f8f8;
  outline: none;
  width: 250px;
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
        <StyledH6>Abonnez-vous à la Newsletter</StyledH6>
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
            <p
              style={{
                position: 'absolute',
                bottom: '-15px',
                textAlign: 'left',
                width: '350px',
                color: 'var(--red)',
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              {result.msg}
            </p>
          )}
  
          <StyleButton onClick={handleSubmit}>S'inscrire</StyleButton>
        </FlexDiv>
      </FlexEnd>
    );
  };
  