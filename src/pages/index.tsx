import * as React from 'react';
import { StyledSection, TwoColumns, Paragraph } from '../components/bodyLayout';
import Layout from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const IndexPage: React.FC<{}> = () => {
  return (
    <Layout>
      <ApartmentsPicture />
      <GeneralInformation />
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

const GeneralInformation = () => {
  return (
    <StyledSection>
      <TwoColumns id="informations">
        <Paragraph>
          <h4>À quelles conditions peut-on indexer mon loyer en Wallonie ?</h4>
          <p>
            Le loyer peut être indexé, chaque année, au plus tôt à la date anniversaire de l'entrée
            en vigueur du bail. L'indexation du loyer est toujours possible, à moins qu'elle n'ait
            été exclue expressément dans une clause du bail ou qu'il s'agisse d'un bail verbal. Pour
            indexer le loyer, il faut un bail écrit. Pour les baux conclus ou renouvelés à partir du
            01/09/2018 que pour les baux en cours au 01/09/2018, il doit être enregistré.
            L'indexation du loyer n'est pas automatique et doit être demandée par écrit. La demande
            d'indexation ne doit pas nécessairement être envoyée par lettre recommandée : elle peut
            être faite par courrier normal, SMS ou e-mail.
          </p>
        </Paragraph>

        <Paragraph>
          <h4>Limitation de l'indexation pour les logements passoires (PEB D, E, F et G)</h4>
          <p>
            Le décret du 19 octobre 2022 a instauré une mesure visant à limiter l'indexation des
            loyers en fonction du certificat PEB qui a été d'application entre 1er novembre 2022 au
            31 octobre 2023. Toute indexation du loyer d&#39;un bail dont la date anniversaire de
            l&#39;entrée en vigueur tombe dans ce créneau temporel est impactée par la mesure. Elle
            s'applique dès la date anniversaire de l'entrée en vigueur du bail se situant entre le
            1er novembre 2022 et le 31 octobre 2023. L'indexation du loyer en fonction du certificat
            PEB ne s'applique pas aux contrats de bail qui ont débuté après le 31 octobre 2022.A
            titre d'exemple, si un contrat de bail est entré en vigueur le 1er novembre 2022, le
            loyer pourra être indexé à partir du 1er novembre 2023 et ce, sans que cette indexation
            ne soit liée au certificat PEB. La limitation de l'indexation durant la période du 1 er
            novembre au 31 octobre 2023: <br />
            - PEB A, B ou C : votre bailleur peut indexer sans limitation pour les logements
            disposant d'un certificat ; <br />
            - PEB D : ne peut être demandée que partiellement (75 % du montant de l'indexation) pour
            les logements disposant d'un certificat; <br />
            - PEB E : ne peut être demandée que partiellement (50 % du montant de l'indexation) pour
            les logements disposant d'un certificat; <br />
            - PEB F ou G n'est pas possible pour les logements disposant d'un certificat; <br />-
            Aucun PEB : l'indexation n'est pas possible.
          </p>
        </Paragraph>
        <Paragraph>
          <h4>Quand peut-on indexer mon loyer ?</h4>
          <p>
            L'indexation du loyer peut se faire chaque année au plus tôt à la date anniversaire de
            l'entrée en vigueur du bail.
          </p>
        </Paragraph>
      </TwoColumns>
    </StyledSection>
  );
};

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const StyledImage = styled.img`
  width: 100%;
`;
const StyledDisplayNoneMobile = styled.div`
  display: static;

  @media (max-aspect-ratio: 1/1) {
    display: none;
  }
`;

const StyledButtonsBlue = styled.div`
  width: 100%;
  position: absolute;
  bottom: 21.5%;
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  margin-top: 40px;

  @media (max-aspect-ratio: 1/1) {
    flex-direction: column;
    /* min-height: 100svh; */
    align-items: center;
    justify-content: center;
    position: static;
  }
`;

const StyledButtonBlue = styled.button`
  align-items: center;
  background-color: var(--blue);
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 0.9;
  height: 42px;
  justify-content: center;
  line-height: 24px;
  min-width: 150px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.7);
  text-transform: uppercase;
  font-weight: 700;
  padding: 0px 20px 0px 20px;
  letter-spacing: 1.5px;

  &:active {
    background-color: white;
    outline: 0;
    color: var(--red);
    border: solid 1px var(--blue);
   
  }

  &:hover {
    background-color: white;
    outline: 0;
    border: solid 1px var(--blue);
    color: var(--red);
  }
`;

const ApartmentsPicture = () => (
  <StyledSection>
    <StyledDisplayNoneMobile>
    <StaticImage
      alt="a building with apartments"
      placeholder="none"
      layout="constrained"
      width={800}
      src={'../images/logements.jpg'}
      loading="eager"
    />
    </StyledDisplayNoneMobile>
    <StyledButtonsBlue>
      <StyledButtonBlue onClick={() => scrollToSection('informations')}>
        Informations
      </StyledButtonBlue>
      <StyledButtonBlue>Informations</StyledButtonBlue>
      <StyledButtonBlue>Informations</StyledButtonBlue>
    </StyledButtonsBlue>
  </StyledSection>
);
