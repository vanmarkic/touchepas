import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionContent, AccordionTrigger } from './AccordionTemplate';
import  {StyledSection2, SectionTitle, TwoColumns, Paragraph }from './bodyLayout';
import { Regions } from '../formula/types-and-constants';

export const GeneralInformation = ({ region }: { region: Regions }) => {
    return (
      <StyledSection2 id="informations">
        <SectionTitle>Infos utiles</SectionTitle>
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
                  {region === 'wallonia' ? "Le loyer peut être indexé, chaque année, au plus tôt à la date anniversaire de l’entrée en vigueur du bail. L'indexation du loyer est toujours possible, à moins qu'elle n'ait été exclue expressément dans une clause du bail ou qu'il s'agisse d'un bail verbal. Pour indexer le loyer, il faut un bail écrit. Pour les baux conclus ou renouvelés à partir du 01/09/2018 que pour les baux en cours au 01/09/2018, il doit être enregistré. L'indexation du loyer n'est pas automatique et doit être demandée par écrit. La demande d’indexation ne doit pas nécessairement être envoyée par lettre recommandée : elle peut être faite par courrier normal, SMS ou e-mail." : "Contenu Bruxelles"
                  }
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