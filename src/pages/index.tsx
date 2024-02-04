import * as React from 'react';
import Layout from '../components/layout';
import { Regions } from '../formula/types-and-constants';
import { GeneralInformation } from '../components/GeneralInformation';
import { Actualités } from '../components/Actualités';
import { Footer } from '../components/Footer';
import { Redirect } from '@reach/router';
import GlobalStyle from '../styles/global';
import { NewsletterForm } from '../components/NewsletterForm';
import { SiteHeading } from '../components/Header';

const IndexPage: React.FC<{}> = () => {
  const [region, setRegion] = React.useState<Regions>('brussels');
  const [showTeaser, setShowTeaser] = React.useState<boolean>(false);

  return (
    <>
      <GlobalStyle />
      <button
        style={{ fontSize: '8px', border: '1px solid black' }}
        onClick={() => setShowTeaser((prevState) => !prevState)}
      >
        show hide teaser
      </button>
      {showTeaser ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center !important',
            minHeight: '90vh',
            margin: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '50px',
            }}
          >
            <SiteHeading />
          </div>
          <p>
            Vous êtes locataires à Bruxelles ou en Wallonie ? Votre propriétaire veut indexer votre
            loyer ? Vérifiez le loyer maximum autorisé avec notre calculateur et retrouvez toutes
            les informations pour défendre vos droits sur Touche pas à mon loyer.be Bientôt en
            ligne...
          </p>
          <NewsletterForm>Tenez moi au courant du lancement</NewsletterForm>
          <Footer />
        </div>
      ) : (
        <Layout handleRegionSwitch={setRegion} region={region}>
          <GeneralInformation region={region} />
          <Actualités />
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
