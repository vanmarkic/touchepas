import React from 'react';
import { StyleButton } from './NewsletterForm';

export const RegionDialog: React.FC<{
  children: React.ReactNode;
  setShowRegionDialog: (state: boolean) => void;
}> = ({ children, setShowRegionDialog }) => {
  return (
    <>
      <p style={{ fontSize: 'medium' }}>Où se situe le bien que je loue ?</p>

      {children}
      <StyleButton style={{ marginTop: '2rem' }} onClick={() => setShowRegionDialog(false)}>
        <h1>Go</h1>
      </StyleButton>
    </>
  );
};
