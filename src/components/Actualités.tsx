import React from 'react';
import styled from 'styled-components';
import lettre from '../images/lettre.jpg';
import { useState, useEffect, useRef } from 'react';
import { StyledSection2, SectionTitle } from '../components/bodyLayout';
import { Article1, Article2, Article3, Article4 } from '../components/Article';
import { StyledA } from '../components/RentCalculator';

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
  cursor: pointer;
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
            <StyledVignette>
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
