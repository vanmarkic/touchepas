import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionContent, AccordionTrigger } from './AccordionTemplate';
import { StyledSection2, SectionTitle, TwoColumns, Paragraph } from './bodyLayout';
import { Regions } from '../formula/types-and-constants';

export const GeneralInformation = ({ region }: { region: Regions }) => {
  return (
    <StyledSection2 id="informations">
      <SectionTitle>Infos utiles</SectionTitle>
      <TwoColumns>
        <Accordion.Root className="AccordionRoot" type="single" defaultValue="item-1" collapsible>
          {/*<Paragraph>
            <Accordion.Item className="AccordionItem" value="item-1">
              <AccordionTrigger>
                {region === 'wallonia'
                  ? 'À quelles conditions peut-on indexer mon loyer en Wallonie ?'
                  : 'À quelles conditions peut-on indexer mon loyer à Bruxelles ?'}
              </AccordionTrigger>
              <AccordionContent>
                {region === 'wallonia'
                  ? "Le loyer peut être indexé, chaque année, au plus tôt à la date anniversaire de l’entrée en vigueur du bail. L'indexation du loyer est toujours possible, à moins qu'elle n'ait été exclue expressément dans une clause du bail ou qu'il s'agisse d'un bail verbal. Pour indexer le loyer, il faut un bail écrit. Pour les baux conclus ou renouvelés à partir du 01/09/2018 que pour les baux en cours au 01/09/2018, il doit être enregistré. L'indexation du loyer n'est pas automatique et doit être demandée par écrit. La demande d’indexation ne doit pas nécessairement être envoyée par lettre recommandée : elle peut être faite par courrier normal, SMS ou e-mail."
                  : 'Contenu Bruxelles'}
              </AccordionContent>
            </Accordion.Item>
              </Paragraph>*/}

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-2">
              <AccordionTrigger><span>#1 </span>Que signifie l’indexation de mon loyer ?</AccordionTrigger>
              <AccordionContent>
                Chaque année, la loi belge permet aux propriétaires d’augmenter le loyer pour tenir
                compte de l’inflation. Cette augmentation est calculée à partir de l’indice santé
                qui suit l’évolution des prix (prix de l’essence, de la nourriture, de l’énergie…).
                L’indexation de votre loyer correspond donc à l’augmentation maximum que votre
                propriétaire peut vous demander une fois par an, moyennant une série de conditions
                (enregistrement du bail, PEB…). Votre propriétaire n’est pas obligé de le faire et
                peut décider de ne pas indexer, ou bien d’indexer moins que le montant autorisé.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-3">
              <AccordionTrigger><span>#2 </span>Comment se calcule l’indexation ?</AccordionTrigger>
              <AccordionContent>
                L’indexation de votre loyer se base sur l’indice santé calculé par Statbel. Mais
                depuis le 1er novembre 2022, le calcul de l’indexation du loyer en Belgique prend en
                compte d’autres règles qui viennent compliquer fortement ce calcul. Les règles de
                calcul varient en fonction de votre lieu de résidence (Flandre, Wallonie ou région
                de Bruxelles-Capitale) et prend en compte l’enregistrement de votre bail, la date de
                signature de votre bail et le niveau de PEB de votre logement. C’est pourquoi nous
                avons développé un calculateur pour vous aider à y voir plus clair ! 
                <br/>Pour connaitre
                les modalités exactes de calcul, rendez-vous sur les sites officiels de
                l’administration où se situe votre logement :<br/> 
                <a target='_blank' href='https://logement.brussels/louer/bail/indexation-des-loyers/indexation-des-loyers-a-partir-du-14-octobre-2023-avec-facteurs-de-correction/'>Région de Bruxelles-Capitale</a>
                <br/>
                <a target='_blank' href='https://www.vlaanderen.be/huurprijs-en-huurwaarborg/huurprijsindexatie-sinds-1-oktober-2023-met-correctiefactoren)'>
                  Région flamande</a><br/>
                <a target='_blank' href='https://logement.wallonie.be/fr/bail/indexation-loyer'>Région wallonne</a><br/>
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-4">
              <AccordionTrigger><span>#3 </span>L’indexation de mon loyer est-elle automatique ?</AccordionTrigger>
              <AccordionContent>
                Non! L’indexation de votre loyer doit vous être demandée par écrit par votre
                propriétaire. Elle ne peut avoir lieu qu’une fois par an, à la date anniversaire de
                l’entrée en vigueur du contrat. Cela vaut pour les trois régions.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-5">
              <AccordionTrigger>
              <span>#4 </span>Qu’est-ce qui se passe si mon propriétaire oublie d’indexer mon loyer ?
              </AccordionTrigger>
              <AccordionContent>
                Le propriétaire qui oublie d’indexer le loyer à la date anniversaire de l’entrée en
                vigueur d’un bail peut toujours le faire, mais à une condition : ne pas récupérer
                plus que les trois mois qui précèdent sa demande. Il ne peut en aucun cas vous
                demander de payer pour les mois durant lesquels il n’a pas perçu l’indexation !
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph id="peb">
            <Accordion.Item className="AccordionItem" value="item-6">
              <AccordionTrigger><span>#5 </span>C’est quoi un certificat PEB ?</AccordionTrigger>
              <AccordionContent>
                Le certificat de performance énergétique des bâtiments (PEB) est un document
                officiel établi par un professionnel agrée qui indique la consommation théorique
                d'énergie de votre logement en fonction de ses caractéristiques (simple ou double
                vitrage, isolation, énergies renouvelables, équipements de chauffage...). C’est sa «
                carte d’identité énergétique ». Le certificat est valide pendant 10ans.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-7">
              <AccordionTrigger>
              <span>#6 </span>Que signifie les lettres A++, B, C, D, E, F et G du certificat PEB ?
              </AccordionTrigger>
              <AccordionContent>
                Le certificat PEB mentionne notamment, pour chaque logement, sa consommation
                d'énergie sur une échelle qui va de A++ jusqu’à G. Une lettre A ou B signifie que
                votre logement est très performant et qu’il consomme très peu d’énergie pour être
                chauffé. Une lettre F ou G signifie que votre logement est très mal isolé et qu’il
                consomme beaucoup d’énergie – et risque donc de vous coûter plus à chauffer. A
                partir de la lettre D, on estime qu’il s’agit d’une « passoire énergétique » et que
                vous habitez un logement mal isolé. Attention toutefois, il s’agit d’un calcul
                théorique ! Il vous permet de comparer des logements entre eux mais ne vous indique
                pas la consommation réelle que vous aurez : celle-ci dépend de vos habitudes, de
                votre présence dans le logement …
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-8">
              <AccordionTrigger><span>#7 </span>A quoi sert un certificat PEB ?</AccordionTrigger>
              <AccordionContent>
                En tant que locataire, le certificat PEB vous permet de connaitre la consommation
                théorique de votre logement et d’avoir une estimation du coût de votre facture de
                chauffage. Le certificat indique aussi des recommandations pour améliorer
                l’isolation du logement et vous permet de savoir quels travaux le propriétaire
                devrait mener en priorité pour que le logement soit mieux isolé.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-9">
              <AccordionTrigger>
              <span>#8 </span>Votre propriétaire est-il obligé d’avoir un certificat PEB pour louer son logement ?
              </AccordionTrigger>
              <AccordionContent>
                Oui, toute personne qui met un logement en vente ou en location doit disposer d'un
                certificat PEB afin de permettre au locataire d'être informé sur la performance
                énergétique du bâtiment. Toute publicité de vente ou de location doit mentionner les
                indicateurs de performance issus du certificat PEB. Votre propriétaire doit donc le
                fournir gratuitement, au plus tard, au moment de la signature du bail en vous
                fournissant une copie de celui-ci.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-10">
              <AccordionTrigger>
              <span>#9 </span>Qui doit faire les démarches pour obtenir un certificat PEB ?
              </AccordionTrigger>
              <AccordionContent>
                C’est à votre propriétaire de réaliser les démarches pour obtenir un certificat.
                Celui-ci n’est valable que 10 ans et doit être renouvelé. Regardez bien la date du
                certificat pour vous assurer qu’il est toujours d’actualité.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-11">
              <AccordionTrigger>
              <span>#10 </span> Mon propriétaire n’a pas de certificat PEB. Que se passe-t-il ?
              </AccordionTrigger>
              <AccordionContent>
                Votre propriétaire peut être sanctionné par des amendes administratives qui varient
                en fonction des régions. Le non-respect de ces obligations est également considéré
                comme un manquement du propriétaire, susceptible d’être sanctionné en justice. Mais
                il y a peu de chances que les juges prononcent la résolution du contrat de bail ou
                la résolution du contrat de bail sur base de ce seul manquement…
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-12">
              <AccordionTrigger>
              <span>#11 </span>Votre propriétaire ne pouvait pas indexer le loyer ou vous a demandé un loyer trop
                élevé ? Comment faire pour demander le remboursement ?{' '}
              </AccordionTrigger>
              <AccordionContent>
                Si votre propriétaire vous a fait indûment payer un loyer indexé, vous pouvez lui
                demander un remboursement. Vous devez lui adresser un courrier recommandé. Vous
                pouvez revenir maximum 5 ans en arrière à partir de votre demande. Avant cela, les
                montants de l'indexation de loyer que vous avez payés sont prescrits. Si votre
                propriétaire ne réagit pas ou n'est pas d'accord de vous rembourser, vous pouvez
                demander au juge de paix de le condamner à vous rembourser. Vous devez le faire au
                plus tard un an après l’envoi du courrier recommandé. En cas de conflit, le juge de
                paix du lieu du logement loué est compétent. Vous souhaitez vous faire aider ?
                Prenez contact avec une association pour voir quelles sont les démarches à
                entreprendre. <br/>
                <a target='_blank' href='https://logement.brussels/acteurs-du-logement/'> Liste des associations par commune sur Bruxelles</a>
                <br/>
                <a target='_blank' href='https://www.flw.be/?pc&type=10#map'>   Liste des associations par région en Wallonie </a>
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>


        </Accordion.Root>
      </TwoColumns>
    </StyledSection2>
  );
};
