import React from 'react';
import styled from 'styled-components';
import lettre from '../images/lettre.jpg';
import bruxelles from '../images/bruxelles.jpg';
import energie from '../images/energie.jpg';
import Street from '../images/Street.png';
import Building from '../images/Building.png';
import { useState, useEffect, useRef } from 'react';
import { StyledSection2, SectionTitle } from '../components/bodyLayout';
import { Article1, Article2, Article3, Article4 } from '../components/Article';
import xmark from "../images/xmark.svg";

interface Article {
  id: number;
  title: string;
  image: string;
  isExpanded: boolean;
  source: string;
}
interface StyledArticleProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

const StyledArticleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: var(--blue);
`;

export const StyledA2 = styled.a<StyledArticleProps>`
  font-size: ${({ isOpen }) => (isOpen ? '30px' : '16px')};
  margin-top: 4px;
  text-decoration: ${({ isOpen }) => (isOpen ? 'none' : 'underline')};
  cursor: pointer;
  color: var(--red);
  &:hover {color: var(--blue);};
  position:${({ isOpen }) => (isOpen ? 'absolute' : 'relative')};
  top:${({ isOpen }) => (isOpen ? '15px' : '0')};
  right:0;
`;

export const StyledH4 = styled.h4`
  font-size: 1rem !important;
  color: var(--blue);
  display: flex;
`;

const StyledArticle = styled.div`
  color: var(--blue);
  border: 1px solid var(--blue);
  box-shadow: 1px 1px 1px var(--blue);
  border-radius: var(--radius);
  width: 100%;
  overflow: hidden;

  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {width: 80%;}
`;

const StyledSource = styled.a`
  color: var(--blue);
  font-size: 13px !important;
  display: block;
  cursor: pointer;
`;

const StyledArticleInfos = styled.div<StyledArticleProps>`
  display: flex;
  flex-direction: column;
  width: ${({ isOpen }) => (isOpen ? '90%' : '70%')};
  gap: 5px;
  padding: 20px 0px;
  margin: auto;
  position: relative;
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    width: 90%;

  }`;

const StyledVignette = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;

  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    flex-direction: column;}
`;

export const Actualités: React.FC = () => {
  const articlesData: Article[] = [
    {
      id: 3,
      title:
        'A partir du 1er novembre 2023, votre propriétaires pourra de nouveau indexer votre loyer, même si vous vivez dans une passoire énergétique!',
      image: energie,
      source: 'Publié le 30 octobre 2023, rwdh.be',
      isExpanded: false,
    },
    {
      id: 1,
      title: 'Indexa­tion des loyers à Bruxelles: la (grosse) goutte qui fait débor­der le budget',
      image: bruxelles,
      source: 'Publié le 4 octobre 2023, Les Équipes Populaires.be ',
      isExpanded: false,
    },
    {
      id: 4,
      title:
        'Les loyers pourront à nouveau être indexés en Wallonie et en Flandre, peu importe le certificat PEB du logement',
      image: Street,
      source: 'Publié le 31 août 2023, rtbf.be',
      isExpanded: false,
    },
    {
      id: 2,
      title: 'La justice sociale exige la suspen­sion de l’in­dexa­tion des loyers!',
      image: Building,
      source: 'Publié le 16 juin 2022, Les Équipes Populaires.be',
      isExpanded: false,
    },

   
  ];
  const [articles, setArticles] = useState(articlesData);
  const [openArticleId, setOpenArticleId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean | false>(false);

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
            <StyledVignette>
              {article.id != openArticleId && (
                <img
                  alt="article"
                  src={article.image}
                  loading="eager"
                  className="imageArticleClosed"
                />
              )}

              <StyledArticleInfos key={article.id} isOpen={article.id === openArticleId}>
                {article.id === openArticleId && (
                  <img alt="article" src={article.image} loading="eager" className="imageArticle" />
                )}
                
                <StyledH4>{article.title}</StyledH4>

                <StyledSource>{article.source}</StyledSource>

                <StyledA2 key={article.id} isOpen={article.id === openArticleId} onClick={() => toggleReadMore(article.id)}>
                  {article.id === openArticleId ?  <img style={{ width: '25px' }} src={xmark} alt="Fermer" /> : "Lire l'article"}
                </StyledA2>

      
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
