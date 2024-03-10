import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ENERGY_RATIOS,
  EnergyEfficiencyRating,
  Enregistrement,
  Regions,
  energyEfficiencyRatings,
  enregistrements,
} from '../formula/types-and-constants';
import { calculateRentIndexation } from '../formula/rent-increase-formula';
import hand from '../images/hand.png';
import { scrollToSection } from './HeroSection';
import * as RadioGroup from '@radix-ui/react-radio-group';
import './RadioGroup.css';
import ExplanationModal from './ExplanationModal';

type TextContentKeys =
  | 'writtenNotification'
  | 'enregistrement'
  | 'noWrittenNotification'
  | 'pebInput'
  | 'unregisteredContract'
  | 'unknownContractRegistration'
  | 'unwritten';

export const StyledA = styled.a`
  font-size: 14px;
  margin-top: 4px;
  text-decoration: underline;
  cursor: pointer;
  color: white;
  width: 220px;
  &:hover {
    color: var(--red);
  }
`;

export const StyledText = styled.p`
  padding-top: 2px;
  color: white;
  font-weight: 300;
  width: 220px;
  font-size: 14px;
  &::before {
    content: '→ ';
  }
`;

const textContent: Record<TextContentKeys, (region: Regions) => React.ReactElement> = {
  writtenNotification: (region) => <></>,
  enregistrement: (region) => <></>,
  noWrittenNotification: (region) => (
    <StyledText>
      Votre propriétaire doit faire la demande par écrit pour indexer votre loyer. Elle peut être
      faite par courrier normal, SMS ou e-mail mais elle est obligatoire pour indexer votre loyer.
    </StyledText>
  ),
  pebInput: (region) => (
    <>
      <StyledText>
        Le certificat de performance énergétique des bâtiments (PEB) est obligatoire en Région
        wallonne pour tous les biens loués depuis le 1er juin 2011. En l'absence de celui-ci, votre
        bailleur ne peut pas indexer votre loyer entre le 1er novembre 2022 et le 31 octobre 2023.
        <br />
      </StyledText>
      <StyledA
        onClick={() => {
          scrollToSection('pebSection');
        }}
      >
        Plus de détails
      </StyledA>
    </>
  ),
  unknownContractRegistration: (region) => (
    <>
      <StyledText>
        Renseignez-vous auprès de votre bailleur et demandez-lui la preuve de l'enregistrement ou
        consultez le portail «MyMinfin» pour vérifier.
        <br />
      </StyledText>
      <StyledA
        href={
          region === 'wallonia'
            ? 'https://www.droitsquotidiens.be/fr/question/comment-savoir-si-mon-bail-est-enregistre-wallonie'
            : 'https://www.droitsquotidiens.be/fr/question/comment-savoir-si-mon-bail-est-enregistre-bruxelles'
        }
        target="_blank"
      >
        Plus de détails
      </StyledA>
    </>
  ),
  unwritten: (region) => (
    <>
      <StyledText>
        Votre propriétaire ne peut pas indexer votre loyer si vous n'avez pas signé de bail !
        <br />
      </StyledText>
      <StyledA
        href="https://www.droitsquotidiens.be/fr/question/je-nai-pas-signe-de-contrat-de-bail-quels-sont-mes-droits-wallonie"
        target="_blank"
      >
        Plus de détails
      </StyledA>
    </>
  ),
  unregisteredContract: (region) => (
    <>
      <StyledText>
        Renseignez-vous auprès de votre bailleur et demandez-lui la preuve de l'enregistrement ou
        consultez le portail «MyMinfin» pour vérifier.
        <br />
      </StyledText>
      <StyledA
        href={
          region === 'brussels'
            ? 'https://www.droitsquotidiens.be/fr/question/lenregistrement-du-bail-est-il-obligatoire-bruxelles'
            : 'https://www.droitsquotidiens.be/fr/question/lenregistrement-du-bail-est-il-obligatoire-wallonie'
        }
        target="_blank"
      >
        Plus de détails
      </StyledA>
    </>
  ),
};

const RentCalculator: React.FC<{ region: Regions }> = ({ region }) => {
  const [yearOfIndexation, setYearOfIndexation] = useState<number>();
  const [initialRent, setInitialRent] = useState<number>(0);
  const [contractSignatureDate, setContractSignatureDate] = useState<Date | null>(null);
  const [agreementStartDate, setAgreementStartDate] = useState<Date>();
  const [newRent, setNewRent] = useState<{ rent: number | null; explanation: string }>({
    rent: 0,
    explanation: '',
  });
  const [energyEfficiencyRating, setEnergyEfficiencyRating] = useState<
    EnergyEfficiencyRating | 'unselected'
  >('unselected');

  const [contractRegistrationStatus, setRegistrationStatus] = useState<Enregistrement['value']>();

  const [contentToShow, setContentToShow] = useState<TextContentKeys>('writtenNotification');

  const [showExplanation, setShowExplanation] = useState<boolean | null>(false);

  const [PEBIsValid, setPEBIsValid] = useState<boolean>();

  const isAnniversaryMonthReached = React.useMemo(() => {
    return (
      yearOfIndexation &&
      contractSignatureDate &&
      agreementStartDate &&
      (agreementStartDate.getMonth() >= new Date().getMonth()
        ? yearOfIndexation < new Date().getFullYear()
        : yearOfIndexation <= new Date().getFullYear())
    );
  }, [agreementStartDate, yearOfIndexation]);

  const isValid = React.useMemo(() => {
    return (
      yearOfIndexation &&
      initialRent &&
      contractSignatureDate &&
      agreementStartDate &&
      isAnniversaryMonthReached &&
      yearOfIndexation > agreementStartDate.getFullYear() &&
      agreementStartDate >= contractSignatureDate
    );
  }, [yearOfIndexation, initialRent, contractSignatureDate, agreementStartDate]);

  const handleCalculate = (e: any) => {
    e.preventDefault();

    if (
      isValid &&
      yearOfIndexation &&
      initialRent &&
      contractSignatureDate &&
      agreementStartDate &&
      PEBIsValid &&
      energyEfficiencyRating !== 'unselected'
    ) {
      try {
        const rent = calculateRentIndexation({
          contractSignatureDate,
          agreementStartDate,
          initialRent,
          yearOfIndexation,
          region,
          energyEfficiencyRating,
        });
        if (!rent) {
          setNewRent({ ...newRent, explanation: 'something went wrong' });
          return;
        }
        setNewRent(rent);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const isBeforePEBMeasure =
    yearOfIndexation &&
    (yearOfIndexation < ENERGY_RATIOS[region].start.getFullYear() ||
      (agreementStartDate &&
        yearOfIndexation == ENERGY_RATIOS[region].start.getFullYear() &&
        agreementStartDate.getMonth() < ENERGY_RATIOS[region].start.getMonth()));

  const handleOpenExplanation = (e) => {
    e.preventDefault();
    setShowExplanation(true);
  };
  return (
    <StyledContainer>
      <h4>Mon loyer maximum autorisé</h4>
      <RedSpan>{region === 'wallonia' ? 'en Wallonie' : 'à Bruxelles'}</RedSpan>
      <form style={{ position: 'relative' }}>
        <img
          src={hand}
          style={{ position: 'absolute', top: '195px', pointerEvents: 'none', objectFit: 'cover' }}
        />
        <StyledNewRent>
          <StyledLabel style={{ color: 'white', width: '30%' }}>Loyer Maximum Autorisé</StyledLabel>
          <h4
            style={{
              color: 'var(--white)',
              width: '70%',
              justifyContent: 'flex-end',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: '5px',
            }}
          >
            {newRent ? Number(newRent.rent).toFixed(2).replace('.', ',') : '- '}€
          </h4>
        </StyledNewRent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {contentToShow === 'writtenNotification' || contentToShow === 'noWrittenNotification' ? (
            <StyledLabel htmlFor="writtenNotification">
              Votre propriétaire vous a-t-il envoyé une demande d'indexation par écrit?
              <RadioGroup.Root
                id="writtenNotification"
                className="RadioGroupRoot"
                defaultValue="default"
                aria-label="View density"
                onValueChange={(value) => {
                  if (value === 'false') setContentToShow('noWrittenNotification');
                  if (value === 'true') setContentToShow('enregistrement');
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <RadioGroup.Item className="RadioGroupItem" value="true" id="r1">
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                  </RadioGroup.Item>
                  <label className="Label" htmlFor="r1">
                    Oui
                  </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <RadioGroup.Item className="RadioGroupItem" value="false" id="r2">
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                  </RadioGroup.Item>
                  <label className="Label" htmlFor="r2">
                    Non
                  </label>
                </div>
              </RadioGroup.Root>
            </StyledLabel>
          ) : null}
          {contentToShow === 'noWrittenNotification' ? (
            <>
              {textContent[contentToShow](region)}
              <StyledButton onClick={() => setContentToShow('enregistrement')}>
                Continuer
              </StyledButton>
            </>
          ) : null}

          {!['writtenNotification', 'noWrittenNotification'].includes(contentToShow) ? (
            <StyledLabel htmlFor="enregistrement">
              Le bail est-il enregistré ?
              <StyledSelect
                name="enregistrement"
                id="enregistrement"
                defaultValue={contractRegistrationStatus}
                onChange={(e) => {
                  const selectedValue = e.target.value as Enregistrement['value'];
                  setRegistrationStatus(selectedValue);

                  // Update contentToShow based on selectedValue
                  if (selectedValue === 'yes') {
                    setContentToShow('pebInput');
                    setPEBIsValid(false);
                  } else if (selectedValue === 'no') {
                    setContentToShow('unregisteredContract');
                    setPEBIsValid(false);
                  } else if (selectedValue === 'none') {
                    setContentToShow('unknownContractRegistration');
                    setPEBIsValid(false);
                  } else if (selectedValue === 'unwritten') {
                    setContentToShow('unwritten');
                    setPEBIsValid(false);
                  }
                }}
              >
                <option disabled selected>
                  -- Sélectionnez une option --
                </option>
                {enregistrements.map((enregistrement) => (
                  <option value={enregistrement.value} key={enregistrement.value}>
                    {enregistrement.label}
                  </option>
                ))}
              </StyledSelect>
            </StyledLabel>
          ) : null}
          {contentToShow === 'pebInput' && (
            <StyledLabel htmlFor="peb">
              Certificat PEB:
              <StyledSelect
                disabled={!!isBeforePEBMeasure}
                name="peb"
                id="peb"
                defaultValue={energyEfficiencyRating}
                onChange={(e) => {
                  const selectedValue = e.target.value as EnergyEfficiencyRating | 'unselected';
                  setEnergyEfficiencyRating(selectedValue);
                  if (selectedValue !== 'none' && selectedValue !== 'unselected') {
                    setPEBIsValid(true);
                  }
                  if (selectedValue === 'none') {
                    setPEBIsValid(false);
                  }
                }}
              >
                <option disabled selected value="unselected">
                  -- Sélectionnez une option --
                </option>
                {energyEfficiencyRatings.map((rating) => (
                  <option value={rating}>{rating !== 'none' ? rating : 'Aucun certificat'}</option>
                ))}
              </StyledSelect>
            </StyledLabel>
          )}

          {contentToShow === 'unregisteredContract' && textContent[contentToShow](region)}
          {contentToShow === 'unwritten' && textContent[contentToShow](region)}
          {contentToShow === 'unknownContractRegistration' && textContent[contentToShow](region)}
          {contentToShow === 'pebInput' && energyEfficiencyRating === 'unselected' && null}
          {contentToShow === 'pebInput' &&
            PEBIsValid === false &&
            energyEfficiencyRating !== 'unselected' &&
            textContent[contentToShow](region)}

          {PEBIsValid === true && (
            <>
              <StyledLabel htmlFor="indexationDate">
                Année de l'indexation:
                <StyledInput
                  type="number"
                  min={new Date().getFullYear() - 1}
                  max={new Date().getFullYear()}
                  required
                  lang="fr-FR"
                  id="indexationDate"
                  placeholder={new Date().getFullYear().toString()}
                  onChange={(e) => setYearOfIndexation(Number(e.target.value))}
                />
              </StyledLabel>

              <StyledLabel htmlFor="initialRent">
                Loyer du bail hors charges:
                <StyledInput
                  type="number"
                  id="initialRent"
                  onChange={(e) => setInitialRent(Number(e.target.value))}
                  required
                />
              </StyledLabel>

              <StyledLabel htmlFor="contractSignatureDate">
                Date de signature du bail:
                <StyledInput
                  type="date"
                  min="2000-01-01"
                  max={new Date().toISOString().split('T')[0]}
                  required
                  lang="fr-FR"
                  id="contractSignatureDate"
                  onChange={(e) => setContractSignatureDate(new Date(e.target.value))}
                />
              </StyledLabel>

              <StyledLabel htmlFor="agreementStartDate">
                Date d'entrée en vigueur:
                <StyledInput
                  type="date"
                  min="2000-01-01"
                  max={new Date().toISOString().split('T')[0]}
                  required
                  lang="fr-FR"
                  id="agreementStartDate"
                  onChange={(e) => setAgreementStartDate(new Date(e.target.value))}
                />
              </StyledLabel>

              <StyledContainerRow>
                <StyledButton disabled={!isValid} type="button" onClick={handleCalculate}>
                  Calculer
                </StyledButton>
              </StyledContainerRow>
            </>
          )}
        </div>
        <div>
          {newRent.rent && newRent.explanation !== '' ? (
            <StyledButton onClick={handleOpenExplanation}>Explication</StyledButton>
          ) : null}
          {!isAnniversaryMonthReached &&
          agreementStartDate &&
          contractSignatureDate &&
          yearOfIndexation ? (
            <StyledValidation>
              L'indexation est impossible pour l'instant. Votre propriétaire doit attendre la date
              anniversaire de votre bail pour vous indexer.
            </StyledValidation>
          ) : null}
        </div>
        {showExplanation ? (
          <ExplanationModal setShowExplanationModal={setShowExplanation}>
            {newRent.explanation}
          </ExplanationModal>
        ) : null}
      </form>
    </StyledContainer>
  );
};
export default RentCalculator;

const StyledValidation = styled.p`
  color: var(--red);
  font-size: 12px;
  margin: 5px;
  width: 80%;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: var(--radius);
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  padding: 0.7rem 0.7rem 0rem 0.7rem;
  margin: 0px;
`;

const StyledContainerRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 10px;
`;

const StyledNewRent = styled.div`
  display: flex;
  height: 65px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 15px;
  justify-content: space-between;
  align-items: center;
`;

const StyledLabel = styled.label`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  font-weight: 300;
  max-width: 265px;
  letter-spacing: 0.2px;
  font-size: 15px;
  width: 220px;
`;

export const StyledInput = styled.input`
  border: 1px solid grey;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: var(--radius);
  background-color: #f8f8f8;
  outline: none;
  padding: 5px;
  font-size: 14px;
  font-weight: normal;

  &:focus {
    border-color: 2px solid var(--blue);
    box-shadow: 0 0 0 1px var(--blue);
    outline: none;
  }
  &:hover {
    border-color: 0px solid var(--blue);
    box-shadow: 0 0 0 1px var(--blue);
    outline: none;
  }
`;

const StyledSelect = styled.select`
  border: 1px solid grey;
  border-radius: var(--radius);
  background-color: #ffffff;
  outline: none;
  box-shadow: 1px 1px 1px grey;
  padding: 5px;
  font-size: 14px;

  &:focus {
    border-color: 0px solid var(--blue);
    outline: none;
  }
  &:hover {
    border-color: 0px solid var(--blue);
    outline: none;
  }
`;

export const StyledButton = styled.button`
  pointer-events: ${(props) => (props.disabled ? 'none' : null)};
  align-items: center;
  background-color: ${(props) => (props.disabled ? 'lightgrey' : 'white')};
  border: none;
  border-radius: var(--radius);
  box-sizing: border-box;
  color: ${(props) => (props.disabled ? 'darkgrey' : 'var(--blue)')};
  cursor: pointer;
  display: flex;
  font-size: 0.6rem;
  height: 30px;
  justify-content: center;
  line-height: 24px;
  min-width: 80px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  text-transform: uppercase;
  font-weight: 500;
  padding: 0px 20px 0px 20px;
  letter-spacing: 1.5px;
  box-shadow: ${(props) => (props.disabled ? 'none' : 'var(--shadow)')};

  &:active {
    background-color: var(--dark-red);
    outline: 0;
  }

  &:hover {
    color: var(--dark-red);
    outline: 0;
  }
`;
const RedSpan = styled.h4`
  color: var(--dark-red);
  text-align: center;
  width: 90%;
  margin-bottom: 10px;
`;
