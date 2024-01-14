import React, { FormEventHandler, MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import {
  ENERGY_RATIOS,
  EnergyEfficiencyRating,
  enregistrement,
  Regions,
  energyEfficiencyRatings,
  enregistrements,
} from '../formula/types-and-constants';
import {
  calculateRentIndexation,
} from '../formula/rent-increase-formula';

const RentCalculator: React.FC = () => {
  const [indexationDate, setIndexationDate] = useState<number>(2023);
  const [initialRent, setInitialRent] = useState<number>(0);
  const [contractSignatureDate, setContractSignatureDate] = useState<Date>(new Date());
  const [agreementStartDate, setAgreementStartDate] = useState<Date>(new Date());
  const [newRent, setNewRent] = useState<number | string>(0);
  const [region, setRegion] = useState<Regions>('wallonia');
  const [energyCertificate, setEnergyCertificate] = useState<EnergyEfficiencyRating>('none');
  const [enregistrementResponse, setEnregistrementResponse] = useState<enregistrement>('none');
  const [contentToShow, setContentToShow] = useState<'inputs' | 'text1' | 'text2'>('text2');
  const [showPebFields, setShowPebFields] = useState(false);
  const [initialRentError, setInitialRentError] = useState<string | null>(null);
  const [contractSignatureDateError, setContractSignatureDateError] = useState<string | null>(null);
  const [agreementStartDateError, setAgreementStartDateError] = useState<string | null>(null);
  const isValid =
    indexationDate &&
    initialRent &&
    contractSignatureDate &&
    agreementStartDate &&
    indexationDate > agreementStartDate.getFullYear() &&
    agreementStartDate >= contractSignatureDate;

  const handleCalculate = (e: any) => {
    e.preventDefault();

    // Check and set error messages for the required fields
   console.log(contractSignatureDateError)
      console.log("ce")

    if (!contractSignatureDateError) {
      setContractSignatureDateError('Ce champ est obligatoire.');
    }
    if (!agreementStartDate) {
      setAgreementStartDateError('Ce champ est obligatoire.');
    }
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

  return (
    <StyledContainer>
      <h4>
        Calculateur de loyer </h4> <RedSpan> Wallonnie</RedSpan>
     
      <form>
        <StyledLabel htmlFor="enregistrement">
          Enregistrement du bail
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
          {contentToShow === 'text1' && (
            <StyledText>
              Aussi longtemps que le bail n’est pas enregistré, le loyer ne peut pas être indexé.
              <br />
              Le loyer ne peut pas non plus être révisé. Le bailleur est tenu de faire enregistrer
              le bail dans les deux mois de la signature de celui-ci.
              <br />
              Si l’indexation a été appliquée alors que le bail n’était pas enregistré, le locataire
              peut adresser un recommandé au bailleur pour réclamer des sommes indûment payées au
              cours des 5 ans qui précèdent cette demande.
              <br />
              <StyledA>Plus de détails</StyledA>{' '}
            </StyledText>
          )}
          {contentToShow === 'text2' && (
            <StyledText>
              Renseignez-vous auprès de votre bailleur et demandez-lui la preuve de l’enregistrement
              ou consulter le portail « MyMinfin » pour vérifier.
              <br />
              <StyledA>Plus de détails</StyledA>{' '}
            </StyledText>
          )}
        </StyledLabel>

        {contentToShow === 'inputs' && (
          <StyledLabel htmlFor="peb">
            Certificat PEB:
            <StyledSelect
              disabled={
                indexationDate < ENERGY_RATIOS[region].start.getFullYear() ||
                (agreementStartDate && indexationDate == ENERGY_RATIOS[region].start.getFullYear() &&
                  agreementStartDate.getMonth() < ENERGY_RATIOS[region].start.getMonth())
              }
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
            {contentToShow === 'inputs' && showPebFields === false && (
              <StyledText>
                Le certificat de performance énergétique des bâtiments (PEB) est obligatoire en
                Région wallonne pour tous les biens loués depuis le 1er juin 2011. En l’absence de
                celui-ci, votre bailleur ne peut pas indexer votre loyer entre le 1er novembre 2022
                et le 31 octobre 2023.
                <br />
                <StyledA>Plus de détails</StyledA>{' '}
              </StyledText>
            )}
          </StyledLabel>
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
                defaultValue={2023}
                onChange={(e) => setIndexationDate(Number(e.target.value))}
              />
            </StyledLabel>

            <StyledLabel htmlFor="initialRent">
              Loyer stipulé sur le bail:
              <StyledInput
                type="tel"
                id="initialRent"
                onChange={(e) => setInitialRent(Number(e.target.value))}
                required
              />
              {/* Error message for initialRent */}
              {initialRentError && <p>{initialRentError}</p>}
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
              {/* Error message */}
              {contractSignatureDateError && <p>{contractSignatureDateError}</p>}
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
              {/* Error message */}
              {agreementStartDateError && <p>{agreementStartDateError}</p>}
            </StyledLabel>

            <StyledContainerRow>
              <StyledButton disabled={!isValid} type="button" onClick={handleCalculate}>
                Calculer
              </StyledButton>
              <StyledNewRent>
                <h6>Loyer Indexé</h6>
                <h4>{Number(newRent).toFixed(2).toLocaleLowerCase('fr-FR')}€</h4>
              </StyledNewRent>
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
  background-color: #ededed;
  width: 100%;
  height: calc(100vh - 80px);;
  padding: 25px;
  margin: 0px;
`;
const StyledContainerRow = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  position: relative;
  
  width:90%;
`;
const StyledNewRent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  color: var(--blue);
  display: flex;
  flex-direction: column;
  align-items: start;
  width:90%;
  font-weight: bold;
  letter-spacing: 0.2px;
`;

export const StyledInput = styled.input`
  border: 1px solid grey;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: var(--radius);
  background-color: #f8f8f8;
  outline: none;
  width:90%;
  padding: 5px;
  font-size: medium;
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
  width:90%;
  box-shadow: 1px 1px 1px grey;
  padding: 5px;
  font-size: medium;

  &:focus {
    border-color: 0px solid var(--blue);
    outline: none;
  }
  &:hover {
    border-color: 0px solid var(--blue);
    outline: none;
  }
`;
const StyledA = styled.a`
  font-size: medium;
  text-decoration: underline;
  color: var(--blue);
  &:hover {
    color: var(--red);
  }
`;

const StyledText = styled.p`
  font-style: italic;
  width:90%;
  padding-top: 2px;
  color: var(--red);
  font-weight: normal;
  font-size: medium;
`;

const StyledButton = styled.button`
  align-items: center;
  background-color: var(--blue);
  border: none;
  border-radius: var(--radius);
  box-sizing: border-box;
  color: white;
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
    background-color: var(--dark-red);
    outline: 0;
  }
`;
const RedSpan = styled.h4`
  color: var(--dark-red);
  text-align:center;
  width:90%;
  margin-bottom:50px

`;
