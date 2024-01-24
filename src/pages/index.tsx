import * as React from 'react';
import Layout from '../components/layout';
import { Regions } from '../formula/types-and-constants';
import { GeneralInformation } from '../components/GeneralInformation';
import { NavButtons } from '../components/HeroSection';
import { Actualités } from '../components/Actualités';
import { Footer } from '../components/Footer';

const IndexPage: React.FC<{}> = () => {
  const [region, setRegion] = React.useState<Regions>('wallonia');
  const [showCalculator, setShowCalculator] = React.useState<boolean>(false);

  const handleShowCalculator = () => {
    setShowCalculator((prevState) => !prevState);
  };

  return (
    <Layout
      handleRegionSwitch={setRegion}
      showCalculator={showCalculator}
      handleShowCalculator={handleShowCalculator}
    >
      <GeneralInformation region={region} />
      <Actualités />
      <Footer />
    </Layout>
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
