import * as React from 'react';
import { StyledSection, StyledSection2, TwoColumns, Paragraph } from '../components/bodyLayout';
import Layout, { StyledButtonBlue, HideWhenHorizontal } from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { AccordionContent, AccordionTrigger } from '../components/AccordionTemplate';
import * as Accordion from '@radix-ui/react-accordion';
import { NewsletterForm } from '../components/NewsletterForm';
import { Regions } from '../formula/types-and-constants';

const IndexPage: React.FC<{}> = () => {
  const [region, setRegion] = React.useState<Regions>('wallonia');

  return (
    <Layout handleRegionSwitch={setRegion}>
      <HeroSection />
      <GeneralInformation region={region} />
    </Layout>
  );
};

export default IndexPage;

const SectionTitle = styled.h4`
  text-align: left;
  margin: 60px 0px 20px 0px;
`;

const GeneralInformation = ({ region }: { region: Regions }) => {
  return (
    <StyledSection2 id="informations">
      <SectionTitle>Informations générales</SectionTitle>
      <TwoColumns>
        <Accordion.Root className="AccordionRoot" type="single" defaultValue="item-1" collapsible>
          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-1">
              <AccordionTrigger>
                {region === 'wallonia'
                  ? 'À quelles conditions peut-on indexer mon loyer en Wallonie ?'
                  : 'À quelles conditions peut-on indexer mon loyer à Bruxelles ?'}
              </AccordionTrigger>
              <AccordionContent>
                {region === 'wallonia' ? 'Contenu Wallonie' : 'Contenu Bruxelles'}
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-2">
              <AccordionTrigger>Quand peut-on indexer mon loyer ?</AccordionTrigger>
              <AccordionContent>
                L'indexation du loyer peut se faire chaque année au plus tôt à la date anniversaire
                de l'entrée en vigueur du bail.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-3">
              <AccordionTrigger>
                Limitation de l'indexation pour les logements passoires (PEB D, E, F et G)
              </AccordionTrigger>
              <AccordionContent>
                Le décret du 19 octobre 2022 a instauré une mesure visant à limiter l'indexation des
                loyers en fonction du certificat PEB qui a été d'application entre 1er novembre 2022
                au 31 octobre 2023. Toute indexation du loyer d'un bail dont la date anniversaire de
                l'entrée en vigueur tombe dans ce créneau temporel est impactée par la mesure. Elle
                s'applique dès la date anniversaire de l'entrée en vigueur du bail se situant entre
                le 1er novembre 2022 et le 31 octobre 2023. L'indexation du loyer en fonction du
                certificat PEB ne s'applique pas aux contrats de bail qui ont débuté après le 31
                octobre 2022. À titre d'exemple, si un contrat de bail est entré en vigueur le 1er
                novembre 2022, le loyer pourra être indexé à partir du 1er novembre 2023 et ce, sans
                que cette indexation ne soit liée au certificat PEB. La limitation de l'indexation
                durant la période du 1er novembre au 31 octobre 2023: - PEB A, B ou C : votre
                bailleur peut indexer sans limitation pour les logements disposant d'un certificat ;
                - PEB D : ne peut être demandée que partiellement (75 % du montant de l'indexation)
                pour les logements disposant d'un certificat; - PEB E : ne peut être demandée que
                partiellement (50 % du montant de l'indexation) pour les logements disposant d'un
                certificat; - PEB F ou G n'est pas possible pour les logements disposant d'un
                certificat; - Aucun PEB : l'indexation n'est pas possible.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>
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
    object-fit: contain !important;
  }

  @media (max-aspect-ratio: 1/1) {
    display: none;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-aspect-ratio: 1/1) {
    flex-direction: column;
    /* min-height: 100svh; */
    align-items: center;
    justify-content: center;
  }
`;

const ButtonsGroup = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 0px;
  flex-wrap: wrap;
`;

const BigTitle = styled.h1`
  width: fit-content;
  font-size: 3rem;
  padding-left: 20px;
  font-weight: 900;
  color: var(--blue);
  @media (max-aspect-ratio: 1/1) {
    font-size: 1.9rem;
  }
  span {
    color: var(--dark-red);
  }
`;
const HeroSection = () => (
  <StyledSection id={heroSectionID}>
    <FlexDiv>
      <StaticImage
        className="logo"
        alt="a building with apartments"
        placeholder="none"
        layout="fixed"
        src={'../logo/favicon/android-chrome-512x512.png'}
        loading="eager"
        width={140}
      />
      <BigTitle>
        TOUCHE <span> PAS </span>
        <br /> À MON LOYER
      </BigTitle>
    </FlexDiv>

    <ButtonsGroup>
      <StyledButtonBlue onClick={() => scrollToSection('informations')}>
        Informations Générales
      </StyledButtonBlue>
      <StyledButtonBlue onClick={() => scrollToSection('news')}>Actualités</StyledButtonBlue>
    </ButtonsGroup>
    <HideWhenHorizontal>
      <NewsletterForm />
    </HideWhenHorizontal>
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
export const newsSectionID = 'news';
