import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { StyledSection, StyledSection2, TwoColumns, Paragraph } from '../components/bodyLayout';
import Layout, { StyledButtonBlue, HideWhenHorizontal } from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { AccordionContent, AccordionTrigger } from '../components/AccordionTemplate';
import * as Accordion from '@radix-ui/react-accordion';
import { NewsletterForm } from '../components/NewsletterForm';
import { Regions } from '../formula/types-and-constants';
import lettre from '../images/lettre.jpg';
import { StyledA } from '../components/RentCalculator';
import { Article1, Article2, Article3, Article4 } from '../components/Article';
import GlobalStyle from '../styles/global';
import { TitleWithLogo } from '../components/Header';

const IndexPage: React.FC<{}> = () => {
  // return <DefinitiveContent />;
  return (
    <div
      style={{
        display: 'flex',
        margin: 'auto',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <GlobalStyle />
      <TitleWithLogo />
      <NewsletterForm style={{ alignSelf: 'center' }} />
      <p>Something is cooking</p>
    </div>
  );
};

export default IndexPage;

export const DefinitiveContent: React.FC<{}> = () => {
  const [region, setRegion] = React.useState<Regions>('wallonia');

  return (
    <Layout handleRegionSwitch={setRegion}>
      <HeroSection />
      <GeneralInformation region={region} />
      <Actualités />
    </Layout>
  );
};

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

interface Article {
  id: number;
  title: string;
  image: string;
  isExpanded: boolean;
  source: string;
}

const StyledArticleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--blue);
`;
const StyledArticle = styled.div`
  color: var(--blue);
  border: 1px solid var(--blue);
  box-shadow: 1px 1px 1px var(--blue);
  padding: 20px;
  border-radius: var(--radius);
`;

const StyledSource = styled.a`
  color: var(--blue);
  font-size: 0.7rem !important;
  width: 100%;
  display: block;
`;

const StyledArticleInfos = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 10px;
`;
const StyledVignette = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const Actualités: React.FC = () => {
  const articlesData: Article[] = [
    {
      id: 1,
      title: 'Indexa­tion des loyers à Bruxelles: la (grosse) goutte qui fait débor­der le budget',
      image: lettre,
      source: 'Publié le 4 octobre 2023, Les Équipes Populaires.be ',
      isExpanded: false,
    },
    {
      id: 2,
      title: 'La justice sociale exige la suspen­sion de l’in­dexa­tion des loyers!',
      image: lettre,
      source: 'Publié le 16 juin 2022, Les Équipes Populaires.be',
      isExpanded: false,
    },
    {
      id: 3,
      title:
        'A partir du 1er novembre 2023, votre propriétaires pourra de nouveau indexer votre loyer, même si vous vivez dans une passoire énergétique!',
      image: lettre,
      source: 'Publié le 30 octobre 2023, rwdh.be',
      isExpanded: false,
    },
    {
      id: 4,
      title:
        'Les loyers pourront à nouveau être indexés en Wallonie et en Flandre, peu importe le certificat PEB du logement',
      image: lettre,
      source: 'Publié le 31 août 2023, rtbf.be',
      isExpanded: false,
    },
  ];

  const [articles, setArticles] = useState(articlesData);
  const [openArticleId, setOpenArticleId] = useState<number | null>(null);
  const articleRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggleReadMore = (id: number) => {
    setOpenArticleId((prevId) => (prevId === id ? null : id));
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (openArticleId !== null) {
      const isOutsideClick = !articleRefs.current.some(
        (articleRef) => articleRef?.contains(event.target as Node),
      );
      if (isOutsideClick) {
        setOpenArticleId(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [openArticleId]);

  return (
    <StyledSection2 id="news">
      <SectionTitle>Actualités</SectionTitle>
      <StyledArticleList className="article-list">
        {articles.map((article) => (
          <StyledArticle 
          
            key={article.id}
            className={`article ${article.id === openArticleId ? 'open' : ''}`}
            ref={(ref) => (articleRefs.current[article.id] = ref)}
          >
            <StyledVignette >
              <img style={{ width: '30%', borderRadius: 'var(--radius)' }} src={lettre} />
              <StyledArticleInfos>
                <h5>{article.title}</h5>
                <StyledSource>{article.source}</StyledSource>
                <StyledA onClick={() => toggleReadMore(article.id)}>
                  {article.id === openArticleId ? "Fermer l'article" : "Lire l'article"}
                </StyledA>
                <br />
              </StyledArticleInfos>
            </StyledVignette>

            {article.id === openArticleId && (
              <>
                {article.id === 1 && <Article1 />}
                {article.id === 2 && <Article2 />}
                {article.id === 3 && <Article3 />}
                {article.id === 4 && <Article4 />}
              </>
            )}
          </StyledArticle>
        ))}
      </StyledArticleList>
    </StyledSection2>
  );
};
