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
          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-2">
              <AccordionTrigger>
                <span>#1 </span>Que signifie l'indexation de mon loyer ?
              </AccordionTrigger>
              <AccordionContent>
                La loi belge permet aux propriétaires de demander une adaptation de leur loyer pour
                tenir compte de l'inflation. Cette augmentation est calculée à partir de l'indice
                santé qui suit l'évolution des prix (prix de l'essence, de la nourriture, de
                l'énergie…). L'indexation de votre loyer correspond donc au montant maximum que
                votre propriétaire peut vous demander à condition que celui-ci respecte une série de
                conditions (demande par écrit, enregistrement du bail,…).
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-3">
              <AccordionTrigger>
                <span>#2 </span>L'indexation de mon loyer est-elle automatique ?
              </AccordionTrigger>
              <AccordionContent>
                Non! L'indexation de votre loyer doit vous être demandée par écrit par votre
                propriétaire. Elle ne peut avoir lieu qu'une fois par an, au plus tôt, à la date
                anniversaire de l'entrée en vigueur du contrat. Votre propriétaire est donc libre de
                ne pas vous indexer et peut décider de vous indexer en dessous du montant maximum
                autorisé par la loi.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-4">
              <AccordionTrigger>
                <span>#3 </span>Comment se calcule l'indexation et à quelles conditions peut-on
                indexer mon loyer ?
              </AccordionTrigger>
              <AccordionContent>
                L'indexation de votre loyer se base sur l'indice santé calculé par Statbel chaque
                mois et se réfère à la date de signature de votre bail, la date d'entrée en vigueur
                du bail et prend en compte, dans certains cas, votre certificat PEB.
                <br />
                <br />
                Pour indexer votre loyer, votre propriétaire doit en faire la demande par écrit,
                avoir enregistré votre bail. A Bruxelles, il doit également disposer d'un certificat
                PEB.
                <br />
                <br />
                Depuis l'automne 2022, pour contrer les effets de l'inflation et l'augmentation des
                prix de l'énergie, les gouvernements des différentes régions ont pris des mesures
                temporaires pour limiter l'indexation de certains logements qui avaient un mauvais
                PEB. Bien que les mesures aient été levé depuis le 14 octobre 2023 pour la Région de
                Bruxelles-Capitale et depuis le 31 octobre 2023 pour la Wallonie, elles ont encore
                un impact dans les calculs de l'indexation de certains logements à l'heure actuelle.
                <br />
                <br />
                En tant que locataire, il est donc devenu très difficile de vérifier si son
                indexation est juste et c'est pourquoi nous avons développé Touche pas à mon loyer.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-5">
              <AccordionTrigger>
                <span>#4 </span>Quelle est la différence entre la date de signature de mon bail et
                la date d'entrée en vigueur de celui-ci ?
              </AccordionTrigger>
              <AccordionContent>
                La date d'entrée en vigueur du bail correspond à la date à partir de laquelle vous
                avez dû commencer à vous acquitter du loyer. La date de signature du bail peut
                différer de la date d'entrée en vigueur si aviez par exemple réserver votre logement
                à l'avance en signant le bail bien avant d'entrer dans celui-ci. La date de
                signature peut donc être antérieure de plusieurs semaines à votre entrée dans votre
                logement et avoir un impact dans le calcul de l'indexation.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-6">
              <AccordionTrigger>
                <span>#5 </span>Comment savoir si je suis concerné par les mesures temporaires de de
                gel de l'indexation?
              </AccordionTrigger>
              <AccordionContent>
                Si vous habitez à Bruxelles, la mesure concerne les baux qui sont entré en vigueur
                <strong> avant le 14 octobre 2022 </strong>
                et ceux qui disposent d'un
                <strong> certificat PEB </strong>
                du logement est
                <strong> E, F ou G. </strong>
                <br />
                <br />
                Si vous habitez en Wallonie, l'indexation du loyer en fonction du certificat PEB
                s'applique aux contrats de bail qui ont débuté avant le 31 octobre 2022, qui ne
                disposent d'aucun PEB ou qui dispose d'un certificat PEB D, E, F ou G. À titre
                d'exemple, si un contrat de bail est entré en vigueur le 1er novembre 2022, le loyer
                pourra être indexé à partir du 1er novembre 2023 et ce, sans que cette indexation ne
                soit liée au certificat PEB puisque la mesure de gel temporaire a été levée depuis
                le 1er novembre 2023.
                <br />
                <br />
                Pour connaitre les modalités exactes de calcul en fonction du PEB, rendez-vous sur
                les sites officiels de l'administration où se situe votre logement :
                <br />
                <br />
                <a
                  href="https://logement.brussels/louer/bail/indexation-des-loyers/indexation-des-loyers-a-partir-du-14-octobre-2023-avec-facteurs-de-correction/"
                  target="_blank"
                >
                  Région de Bruxelles-Capitale
                </a>
                <br />
                <br />
                <a target="_blank" href="https://logement.wallonie.be/fr/bail/indexation-loyer">
                  Région wallonne
                </a>
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>
          <Paragraph id="pebSection">
            <Accordion.Item className="AccordionItem" value="item-6">
              <AccordionTrigger>
                <span>#6 </span>À quoi sert un certificat PEB ?
              </AccordionTrigger>
              <AccordionContent>
                Le certificat de performance énergétique des bâtiments (PEB) est un document
                officiel établi par un professionnel agrée qui indique la consommation théorique
                d'énergie de votre logement en fonction de ses caractéristiques (simple ou double
                vitrage, isolation, énergies renouvelables, équipements de chauffage...). C'est sa «
                carte d'identité énergétique ». Le certificat est valide pendant 10ans. Le
                certificat indique aussi des recommandations pour améliorer l'isolation du logement
                et vous permet de savoir quels travaux le propriétaire devrait mener en priorité
                pour que le logement soit mieux isolé.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-7">
              <AccordionTrigger>
                <span>#7 </span>Que signifient les lettres A, B, C, D, E, F et G du certificat PEB ?
              </AccordionTrigger>
              <AccordionContent>
                Le certificat PEB mentionne pour chaque logement, sa consommation d'énergie sur une
                échelle qui va de A++ (le plus performant) jusqu'à G (le moins performant). Une
                lettre F ou G signifie donc que votre logement est très mal isolé et qu'il consomme
                potentiellement beaucoup d'énergie et risque donc de vous coûter plus à chauffer.
                <br />
                <br />
                Attention, il s'agit d'un calcul théorique ! Il vous permet de comparer des
                logements entre eux mais ne vous indique pas la consommation réelle que vous aurez :
                celle-ci dépend de vos habitudes, de votre présence dans le logement …
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-9">
              <AccordionTrigger>
                <span>#8 </span>Votre propriétaire est-il obligé d'avoir un certificat PEB pour
                louer son logement ?
              </AccordionTrigger>
              <AccordionContent>
                Oui, tous les logements mis en vente ou en location en Région bruxelloise ou
                wallonne doit disposer d'un certificat PEB. Votre propriétaire doit donc le fournir
                gratuitement, au plus tard, au moment de la signature du bail en vous fournissant
                une copie de celui-ci. C'est à votre propriétaire de réaliser les démarches pour
                obtenir un certificat.
                <br />
                <br />
                Pour les biens déjà loués, le situation varie en fonction des régions et
                l'obligation n'est pas de mise, sauf si le propriétaire souhaite indexer.
                <br />
                <br />
                Attention, celui-ci n'est valable que 10 ans et doit être renouvelé. Regardez bien
                la date du certificat pour vous assurer qu'il est toujours d'actualité.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          {/* <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-10">
              <AccordionTrigger>
                <span>#9 </span>Qui doit faire les démarches pour obtenir un certificat PEB ?
              </AccordionTrigger>
              <AccordionContent>
                C'est à votre propriétaire de réaliser les démarches pour obtenir un certificat.
                Celui-ci n'est valable que 10 ans et doit être renouvelé. Regardez bien la date du
                certificat pour vous assurer qu'il est toujours d'actualité<div className=""></div>
              </AccordionContent>
            </Accordion.Item>
          </Paragraph> */}

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-11">
              <AccordionTrigger>
                <span>#9 </span> Mon propriétaire n'a pas de certificat PEB. Que se passe-t-il ?
              </AccordionTrigger>
              <AccordionContent>
                Votre propriétaire peut être sanctionné par des amendes administratives qui varient
                en fonction des régions. Le non-respect de ces obligations est également considéré
                comme un manquement du propriétaire, susceptible d'être sanctionné en justice. Mais
                il y a peu de chances que les juges prononcent la résolution du contrat de bail ou
                la résolution du contrat de bail sur base de ce seul manquement…
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>

          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-12">
              <AccordionTrigger>
                <span>#10 </span>Mon propriétaire ne pouvait pas indexer le loyer. Puis-je lui
                demander de me rembourser ce que j'ai payé en trop ?
              </AccordionTrigger>
              <AccordionContent>
                Si votre propriétaire vous a fait indûment payer un loyer indexé, vous pouvez lui
                demander un remboursement. Pour ce faire, vous devez lui adresser un courrier
                recommandé. Vous pouvez revenir maximum 5 ans en arrière à partir de votre demande.
                Avant cela, les montants de l'indexation de loyer que vous avez payés sont
                prescrits. Vous ne pouvez plus lui demander de vous rembourser. Si votre
                propriétaire ne réagit pas, vous avez<strong> 1 an </strong>
                pour demander au
                <strong> juge de paix </strong>
                de le condamner à vous rembourser.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>
          <Paragraph>
            <Accordion.Item className="AccordionItem" value="item-13">
              <AccordionTrigger>
                <span>#11 </span>Que faire en cas de désaccord avec mon propriétaire ?
              </AccordionTrigger>
              <AccordionContent>
                La première chose à faire est de contacter l'administration compétente ou une
                association d'aide aux locataires pour bien vous assurer d'être dans votre bon droit
                et demander conseil sur la marche à suivre en fonction de votre situation. En cas de
                conflit persistant c'est le juge de paix du lieu où se trouve le logement loué qui
                est compétent.
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>
          <Paragraph id="needhelp">
            <Accordion.Item className="AccordionItem" value="item-14">
              <AccordionTrigger>
                <span>#12 </span> Où m'adresser si j'ai besoin d'aide ?
              </AccordionTrigger>
              <AccordionContent>
                Si le montant indexé vous paraît très élevé ou si vous avez des questions en lien
                avec votre logement, voici quelques adresses utiles
                <br />
                <br />
                <strong>En Wallonie :</strong>
                <br />
                <br />
                <ul>
                  <li>
                    Prenez contact avec le "Info-Conseils Logement" par téléphone au 081/33.23.10
                    (9h00 à 12h00 et 14h00 à 16h00) ou par mail :
                    <a target="_blank" href="mailto:infobail@spw.wallonie.be">
                      {' '}
                      infobail@spw.wallonie.be
                    </a>
                  </li>
                  <br />
                  <li>
                    Vous pouvez vous rendre dans une Association de promotion au logement (APL).
                    Pour trouver une APL près de chez vous, vous pouvez vous rendre sur le{' '}
                    <a target="_blank" href="https://www.flw.be/#carte">
                      site du Fonds du Logement Wallon
                    </a>
                    . En y mettant votre code postal, la carte vous renseignera l'association de
                    promotion du logement la plus proche de chez vous. Des permanences physiques
                    sont assurées.
                  </li>

                  <br />
                  <li>
                    <a
                      target="_blank"
                      href="https://logement.wallonie.be/fr/page/info-conseils-logement"
                    >
                      Des permanences physiques « info-conseil logement » ont lieu dans chaque
                      province
                    </a>
                  </li>
                </ul>
                <br />
                <br />
                <strong>À Bruxelles :</strong>
                <br />
                <br />
                <ul>
                  <li>
                    Prenez contact avec « Bruxelles Logement » au +32 (0)800 40 400 ou par e-mail à
                    <a href="mailto:logement@sprb.brussels" target="_blank">
                      {' '}
                      logement@sprb.brussels
                    </a>
                  </li>
                  <br />
                  <li>
                    Vous pouvez vous rendre dans une Les associations œuvrant à l'insertion par le
                    logement (AIPL) près de chez vous. Vous trouverez la{' '}
                    <a target="_blank" href="https://logement.brussels/acteurs-du-logement/">
                      liste des associations sur le site de Bruxelles-Logement.
                    </a>
                  </li>
                </ul>
              </AccordionContent>
            </Accordion.Item>
          </Paragraph>
        </Accordion.Root>
      </TwoColumns>
    </StyledSection2>
  );
};
