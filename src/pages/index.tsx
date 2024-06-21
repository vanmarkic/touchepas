import * as React from 'react';
import Layout from '../components/layout';
import { Regions } from '../formula/types-and-constants';
import { GeneralInformation } from '../components/GeneralInformation';
import { Actualités } from '../components/Actualités';
import { Footer } from '../components/Footer';
import GlobalStyle from '../styles/global';
import { NewsletterForm } from '../components/NewsletterForm';
import { SiteHeading } from '../components/Header';
import styled from 'styled-components';

const StyledH3 = styled.h3`
  text-transform: uppercase;
  color: var(--blue);
  font-size: 1rem;
  text-align: center;
`;

const IndexPage: React.FC<{}> = () => {
  process.env.TEASER_ENABLED;
  const [region, setRegion] = React.useState<Regions>('wallonia');

  const [showTeaser, setShowTeaser] = React.useState<boolean>(false);

  return (
    <>
      <GlobalStyle />
      {showTeaser ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            minHeight: '90vh',
            margin: '1rem auto',
            gap: '1rem',
            maxWidth: '960px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SiteHeading />
          </div>
          <StyledH3>
            Vérifiez l'indexation de votre loyer et défendez vos droits en tant que locataire !
          </StyledH3>
          <div style={{ maxWidth: '90vw' }}>
            Vous êtes locataire à Bruxelles ou en Wallonie ? Votre propriétaire veut indexer votre
            loyer ? <br /> <br />
            Vérifiez le loyer maximum autorisé avec notre calculateur et retrouvez toutes les
            informations pour défendre vos droits sur <a>touchepasàmonloyer.be</a>
            <br />
            <br />
            <p style={{ textAlign: 'center' }}>Bientôt en ligne...</p>
          </div>
          <NewsletterForm>Restez à l'écoute pour notre lancement !</NewsletterForm>
          <Footer />
        </div>
      ) : (
        <Layout handleRegionSwitch={setRegion} region={region}>
          <GeneralInformation region={region} />
          <Actualités region={region} />
          <Footer />
        </Layout>
      )}
    </>
  );
};
export default IndexPage;

export const Head = () => (
  <>
    <html lang="fr" />
    <title>Touche pas à mon loyer</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta
      name="description"
      content="Calculateur d'indexation de loyer du Rassemblement Wallon pour le Droit à l'Habitat"
    />

    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'anonymous'} />

    <link
      rel="preload"
      as="style"
      href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800;900&display=swap"
    />

    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800;900&display=swap"
    />

    <noscript>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800;900&display=swap"
      />
    </noscript>
  </>
);
