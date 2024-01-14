import * as React from 'react';
import { StyledSection, StyledSection2, TwoColumns, Paragraph } from '../components/bodyLayout';
import Layout, { StyledButtonBlue } from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { AccordionContent, AccordionTrigger } from '../components/AccordionTemplate';
import * as Accordion from '@radix-ui/react-accordion';
const IndexPage: React.FC<{}> = () => {
  return (
    <Layout>
      <HeroSection />
      <GeneralInformation />
    </Layout>
  );
};

export default IndexPage;

const SectionTitle = styled.h4`
  text-align: left;
`;
const GeneralInformation = () => {
  return (
    <StyledSection2 id="informations">
      <SectionTitle>Informations générales</SectionTitle>
      <TwoColumns>
        <Accordion.Root className="AccordionRoot" type="single" defaultValue="item-1" collapsible>
          <Accordion.Item className="AccordionItem" value="item-1">
            <AccordionTrigger>
              À quelles conditions peut-on indexer mon loyer en Wallonie ?
            </AccordionTrigger>
            <AccordionContent>
              Le loyer peut être indexé, chaque année, au plus tôt à la date anniversaire de
              l'entrée en vigueur du bail. L'indexation du loyer est toujours possible, à moins
              qu'elle n'ait été exclue expressément dans une clause du bail ou qu'il s'agisse d'un
              bail verbal. Pour indexer le loyer, il faut un bail écrit. Pour les baux conclus ou
              renouvelés à partir du 01/09/2018 que pour les baux en cours au 01/09/2018, il doit
              être enregistré. L'indexation du loyer n'est pas automatique et doit être demandée par
              écrit. La demande d'indexation ne doit pas nécessairement être envoyée par lettre
              recommandée : elle peut être faite par courrier normal, SMS ou e-mail.
            </AccordionContent>
          </Accordion.Item>

          <Accordion.Item className="AccordionItem" value="item-2">
            <AccordionTrigger>Quand peut-on indexer mon loyer ?</AccordionTrigger>
            <AccordionContent>
              L'indexation du loyer peut se faire chaque année au plus tôt à la date anniversaire de
              l'entrée en vigueur du bail.
            </AccordionContent>
          </Accordion.Item>

          <Accordion.Item className="AccordionItem" value="item-3">
            <AccordionTrigger>
              Limitation de l'indexation pour les logements passoires (PEB D, E, F et G)
            </AccordionTrigger>
            <AccordionContent>
              Le décret du 19 octobre 2022 a instauré une mesure visant à limiter l'indexation des
              loyers en fonction du certificat PEB qui a été d'application entre 1er novembre 2022
              au 31 octobre 2023. Toute indexation du loyer d'un bail dont la date anniversaire de
              l'entrée en vigueur tombe dans ce créneau temporel est impactée par la mesure. Elle
              s'applique dès la date anniversaire de l'entrée en vigueur du bail se situant entre le
              1er novembre 2022 et le 31 octobre 2023. L'indexation du loyer en fonction du
              certificat PEB ne s'applique pas aux contrats de bail qui ont débuté après le 31
              octobre 2022. À titre d'exemple, si un contrat de bail est entré en vigueur le 1er
              novembre 2022, le loyer pourra être indexé à partir du 1er novembre 2023 et ce, sans
              que cette indexation ne soit liée au certificat PEB. La limitation de l'indexation
              durant la période du 1er novembre au 31 octobre 2023: - PEB A, B ou C : votre bailleur
              peut indexer sans limitation pour les logements disposant d'un certificat ; - PEB D :
              ne peut être demandée que partiellement (75 % du montant de l'indexation) pour les
              logements disposant d'un certificat; - PEB E : ne peut être demandée que partiellement
              (50 % du montant de l'indexation) pour les logements disposant d'un certificat; - PEB
              F ou G n'est pas possible pour les logements disposant d'un certificat; - Aucun PEB :
              l'indexation n'est pas possible.
            </AccordionContent>
          </Accordion.Item>
        </Accordion.Root>
      </TwoColumns>
    </StyledSection2>
  );
};

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const StyledImage = styled.img`
  width: 100%;
`;
const StyledDisplayNoneMobile = styled.div`
  display: flex;
  align-items: center;
  .logo {
    flex: 1 0 auto;
  }

  @media (max-aspect-ratio: 1/1) {
    display: none;
  }
`;

const StyledButtonsBlue = styled.div`
  width: 100%;

  bottom: 21.5%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  flex-wrap: wrap;

  @media (max-aspect-ratio: 1/1) {
    flex-direction: column;
    /* min-height: 100svh; */
    align-items: center;
    justify-content: center;
    position: static;
  }
`;

const BigTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--blue);
  span {
    color: var(--dark-red);
  }
`;
const HeroSection = () => (
  <StyledSection id={heroSectionID}>
    <StyledDisplayNoneMobile>
      <StaticImage
        className="logo"
        alt="a building with apartments"
        placeholder="none"
        layout="fixed"
        src={'../logo/favicon/android-chrome-512x512.png'}
        loading="eager"
        width={200}
      />
      <BigTitle>
        TOUCHE <span> PAS </span> À MON LOYER
      </BigTitle>
    </StyledDisplayNoneMobile>
    <StyledButtonsBlue>
      <StyledButtonBlue onClick={() => scrollToSection('informations')}>
        Informations Générales
      </StyledButtonBlue>
      <StyledButtonBlue>Actualités</StyledButtonBlue>
    </StyledButtonsBlue>
  </StyledSection>
);

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

export const heroSectionID = 'hero-section';
