import React, { FormEventHandler, MouseEventHandler, useState } from 'react';
import {
  ENERGY_RATIOS,
  EnergyEfficiencyRating,
  Regions,
  calculateRentIndexation,
  energyEfficiencyRatings,
} from '../formula/rent-increase-formula';
import styled from 'styled-components';

const RentCalculator: React.FC = () => {
  const [indexationDate, setIndexationDate] = useState<number>(2023);
  const [initialRent, setInitialRent] = useState<number>(0);
  const [contractSignatureDate, setContractSignatureDate] = useState<Date>(new Date());
  const [agreementStartDate, setAgreementStartDate] = useState<Date>(new Date());
  const [newRent, setNewRent] = useState<number | string>(0);
  const [region, setRegion] = useState<Regions>('wallonia');
  const [energyCertificate, setEnergyCertificate] = useState<EnergyEfficiencyRating>('none');

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
        const increasedRent = calculateRentIndexation(
          contractSignatureDate,
          agreementStartDate,
          initialRent,
          indexationDate,
          region,
          energyCertificate,
        );
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
      <h4>Calculateur de loyer</h4>
      <form>
        <StyledLabel htmlFor="indexationDate">
          Année de demande d'indexation:
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
            // defaultValue={initialRent}
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
        <StyledLabel htmlFor="region">
          Région:
          <StyledInput
            type="select"
            disabled
            required
            lang="fr-FR"
            id="region"
            defaultValue="Wallonie"
          />
        </StyledLabel>
        <StyledLabel htmlFor="peb">
          Certificat PEB:
          <StyledSelect
            disabled={
              indexationDate < ENERGY_RATIOS[region].start.getFullYear() ||
              (indexationDate == ENERGY_RATIOS[region].start.getFullYear() &&
                agreementStartDate.getMonth() < ENERGY_RATIOS[region].start.getMonth())
            }
            name="peb"
            id="peb"
            defaultValue={energyCertificate}
            onChange={(e) => setEnergyCertificate(e.target.value as EnergyEfficiencyRating)}
          >
            {energyEfficiencyRatings.map((rating) => (
              <option value={rating}>{rating !== 'none' ? rating : 'Aucun certificat'}</option>
            ))}
          </StyledSelect>
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
      </form>
    </StyledContainer>
  );
};

export default RentCalculator;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  /* padding: 0rem 2rem; */
  border-radius: var(--radius);
  position: relative;
  background-color: #ededed;
  width: 100%;
  height: 100%;
  padding: 35px;
  margin: auto;
`;
const StyledContainerRow = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  position: relative;
  width: 240px;
`;
const StyledNewRent = styled.div`
  display: flex;
  flex-direction: column;
  gap: Orem;
`;

const StyledLabel = styled.label`
  color: var(--blue);
`;

const StyledInput = styled.input`
  border: 1px solid grey;
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: var(--radius);
  background-color: #f8f8f8;
  outline: none;
  width: 240px;
  padding: 5px;

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
  width: 240px;
  box-shadow: 1px 1px 1px grey;

  &:focus {
    border-color: 0px solid var(--blue);
    outline: none;
  }
  &:hover {
    border-color: 0px solid var(--blue);
    outline: none;
  }
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
