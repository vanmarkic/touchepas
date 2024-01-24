import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ENERGY_RATIOS,
  EnergyEfficiencyRating,
  enregistrement,
  Regions,
  energyEfficiencyRatings,
  enregistrements,
} from '../formula/types-and-constants';
import { calculateRentIndexation } from '../formula/rent-increase-formula';
import hand from '../images/hand.png';

const RentCalculator: React.FC<{ region: Regions }> = ({ region }) => {
  const [indexationDate, setIndexationDate] = useState<number>(2023);
  const [initialRent, setInitialRent] = useState<number>(0);
  const [contractSignatureDate, setContractSignatureDate] = useState<Date | null>(null);
  const [agreementStartDate, setAgreementStartDate] = useState<Date>(new Date());
  const [newRent, setNewRent] = useState<number | string>(0);
  const [energyCertificate, setEnergyCertificate] = useState<EnergyEfficiencyRating>('none');
  const [enregistrementResponse, setEnregistrementResponse] = useState<enregistrement>('none');
  const [contentToShow, setContentToShow] = useState<'inputs' | 'text1' | 'text2'>('text2');
  const [showPebFields, setShowPebFields] = useState(false);

  const isValid =
    indexationDate &&
    initialRent &&
    contractSignatureDate &&
    agreementStartDate &&
    indexationDate > agreementStartDate.getFullYear() &&
    agreementStartDate >= contractSignatureDate;

  const handleCalculate = (e: any) => {
    e.preventDefault();

    if (isValid) {
      try {
        const increasedRent = calculateRentIndexation({
          contractSignatureDate: contractSignatureDate,
          agreementStartDate: agreementStartDate,
          initialRent: initialRent,
          yearOfIndexation: indexationDate,
          region: region,
          energyEfficiencyRating: energyCertificate,
        });
        if (!increasedRent) {
          setNewRent('something went wrong');
          return;
        }
        setNewRent(increasedRent);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const isBeforePEBMeasure =
    indexationDate < ENERGY_RATIOS[region].start.getFullYear() ||
    (agreementStartDate &&
      indexationDate == ENERGY_RATIOS[region].start.getFullYear() &&
      agreementStartDate.getMonth() < ENERGY_RATIOS[region].start.getMonth());

  return (
    <StyledContainer>
      <h4>Calculateur de loyer</h4>
      <RedSpan>
        {region === 'wallonia' ? 'Wallonie' : 'Bruxelles (formule en cours de finalisation)'}
      </RedSpan>

      <form style={{ position: 'relative' }}>
        <img
          src={hand}
          style={{ position: 'absolute', top: '145px', pointerEvents: 'none', objectFit: 'cover' }}
        />
        <StyledNewRent>
          <StyledLabel style={{color:"white", }}>Loyer Indexé</StyledLabel>
          <h4
            style={{
              boxShadow: 'inset 2px 2px 2px',
              borderRadius: 'var(--radius)',
              backgroundColor: ' white',
              width: '70%',
            justifyContent:"flex-end",
              height:"100%",
              display:"flex",
              alignItems:"center", 
              padding:"5px",
            }}
          >
            {Number(newRent).toFixed(2).toLocaleLowerCase('fr-FR')}€
          </h4>
        </StyledNewRent>

        <StyledLabel htmlFor="enregistrement">
          Le bail est-il enregistré?
          <StyledSelect
            name="enregistrement"
            id="enregistrement"
            defaultValue={enregistrementResponse}
            onChange={(e) => {
              const selectedValue = e.target.value as enregistrement;
              setEnregistrementResponse(selectedValue);

              // Update contentToShow based on selectedValue
              if (selectedValue === 'Le bail est enregistré') {
                setContentToShow('inputs');
              } else if (selectedValue === "Le bail n'est pas enregistré") {
                setContentToShow('text1');
              } else if (selectedValue === 'none') {
                setContentToShow('text2');
              }
            }}
          >
            {enregistrements.map((enregistrement) => (
              <option value={enregistrement} key={enregistrement}>
                {enregistrement !== 'none' ? enregistrement : 'Je ne sais pas'}
              </option>
            ))}
          </StyledSelect>
        </StyledLabel>
        {contentToShow === 'inputs' && (
          <StyledLabel htmlFor="peb">
            Certificat PEB:
            <StyledSelect
              disabled={isBeforePEBMeasure}
              name="peb"
              id="peb"
              defaultValue={energyCertificate}
              onChange={(e) => {
                const selectedValue = e.target.value as EnergyEfficiencyRating;
                setEnergyCertificate(selectedValue);
                if (selectedValue !== 'none') {
                  setShowPebFields(true);
                }
                if (selectedValue === 'none') {
                  setShowPebFields(false);
                }
              }}
            >
              {energyEfficiencyRatings.map((rating) => (
                <option value={rating}>{rating !== 'none' ? rating : 'Aucun certificat'}</option>
              ))}
            </StyledSelect>
          </StyledLabel>
        )}
        {contentToShow === 'text1' && (
          <>
            <StyledText>
              Aussi longtemps que le bail n’est pas enregistré, le loyer ne peut pas être indexé.
              <br />
              Si l’indexation a été appliquée alors que le bail n’était pas enregistré, le locataire
              peut adresser un recommandé au bailleur pour réclamer des sommes indûment payées au
              cours des 5 ans qui précèdent cette demande.
              <br />
              <br />
            </StyledText>
            <StyledA>Plus de détails</StyledA>
          </>
        )}
        {contentToShow === 'text2' && (
          <>
            <StyledText>
              Renseignez-vous auprès de votre bailleur et demandez-lui la preuve de l’enregistrement
              ou consultez le portail «MyMinfin» pour vérifier.
              <br />
            </StyledText>
            <StyledA>Plus de détails</StyledA>
          </>
        )}
        {contentToShow === 'inputs' && showPebFields === false && (
          <>
            <StyledText>
              Le certificat de performance énergétique des bâtiments (PEB) est obligatoire en Région
              wallonne pour tous les biens loués depuis le 1er juin 2011. En l'absence de celui-ci,
              votre bailleur ne peut pas indexer votre loyer entre le 1er novembre 2022 et le 31
              octobre 2023.
              <br />
            </StyledText>
            <StyledA>Plus de détails</StyledA>
          </>
        )}
        {contentToShow === 'inputs' && showPebFields === true && (
          <>
            <StyledLabel htmlFor="indexationDate">
              Année de l'indexation:
              <StyledInput
                type="number"
                min="1984"
                max={new Date().getFullYear()}
                required
                lang="fr-FR"
                id="indexationDate"
                defaultValue={new Date().getFullYear()}
                onChange={(e) => setIndexationDate(Number(e.target.value))}
              />
            </StyledLabel>

            <StyledLabel htmlFor="initialRent">
              Loyer du bail hors charges:
              <StyledInput
                type="tel"
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
                defaultValue={contractSignatureDate?.toISOString().split('T')[0]}
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
      </form>
    </StyledContainer>
  );
};
export default RentCalculator;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  /* padding: 0rem 2rem; */
  border-radius: var(--radius);
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  padding: 0.7rem;
  margin: 0px;
`;
const StyledContainerRow = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  position: relative;
  margin-top: 10px;
`;
const StyledNewRent = styled.div`
  display: flex;
  height: 65px;
  width: 220px;
  padding: 5px;
  margin-top: 5px;
  justify-content: space-between;
  align-items: center;
`;

const StyledLabel = styled.label`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  font-weight: 300;
  letter-spacing: 0.2px;
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
export const StyledA = styled.a`
  font-size: medium;
  margin-top: 4px;
  text-decoration: underline;
  cursor: pointer;
  color: var(--blue);
  width: 90%;
  &:hover {
    color: var(--red);
  }
`;

export const StyledText = styled.p`
  width: 90%;
  padding-top: 2px;
  color: white;
  font-weight: 300;
  font-size: medium;
  &::before {
    content: '→ ';
  }
`;

export const StyledButton = styled.button`
  pointer-events: ${(props) => (props.disabled ? 'none' : null)};
  align-items: center;
  background-color: ${(props) => (props.disabled ? 'lightgrey' : 'white')};
  border: none;
  border-radius: var(--radius);
  box-sizing: border-box;
  color: var(--blue);
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
  box-shadow: var(--shadow);

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
`;
