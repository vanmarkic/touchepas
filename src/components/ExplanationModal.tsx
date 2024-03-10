import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

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
  z-index: 100;
`;

const ModalContent = styled.div`
  white-space: pre-line;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
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

const CloseIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

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
          <Title>Formule utilisée</Title>

          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
          {children}
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default ExplanationModal;
