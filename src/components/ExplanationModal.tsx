import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { StyledCalculatorButton } from './layout';
import xmark from '../images/xmark.svg';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 7;
`;

const ModalContent = styled.div`
  white-space: pre-line;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 32px;
  overflow: auto;
`;

const Title = styled.h2`
  text-align: center;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;

const ExplanationModal: React.FC<{
  children: ReactNode;
  setShowExplanationModal: (isOpen: boolean) => void;
}> = ({ children, setShowExplanationModal }) => {
  const handleClose = (e) => {
    e.preventDefault();
    setShowExplanationModal(false);
  };

  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <p>
            Ce calculateur n'est pas infaillible compte tenu de la complexité de la législation et
            des nombreux cas particuliers. Nous vous invitons à vérifier le calcul auprès de
            l'administration compétente si vous pensez que votre indexation est erronée.
            <br />
            <br />
            Notre responsabilité ne pourra être engagée en cas d'erreur.
            <br />
            <br />
            <br />
            <br />
          </p>
          <Title>Formule utilisée</Title>
          <StyledCalculatorButton onClick={handleClose}>
            <img style={{ width: '25px' }} src={xmark} alt="Fermer" />
          </StyledCalculatorButton>
          {children}
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default ExplanationModal;
