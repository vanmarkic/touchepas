import React, { FormEventHandler, MouseEventHandler, useState } from 'react';
import {
  ENERGY_RATIOS,
  EnergyEfficiencyRating,
  Regions,
  calculateRentIndexation,
  energyEfficiencyRatings,
} from '../formula/rent-increase-formula';
import styled from 'styled-components';
import { is } from 'date-fns/locale';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 10px;
`;
const StyledNewRent = styled.div`
  display: flex;
  flex-direction: column;
  gap: Orem;
`;

const StyledButton = styled.button``;

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
        <label htmlFor="indexationDate">
          Année de demande d'indexation:
          <input
            type="number"
            min="1984"
            max={new Date().getFullYear()}
            required
            lang="fr-FR"
            id="indexationDate"
            defaultValue={2023}
            onChange={(e) => setIndexationDate(Number(e.target.value))}
          />
        </label>
        <label htmlFor="initialRent">
          Loyer stipulé sur le bail:
          <input
            type="tel"
            id="initialRent"
            defaultValue={initialRent}
            onChange={(e) => setInitialRent(Number(e.target.value))}
            required
          />
        </label>
        <label htmlFor="contractSignatureDate">
          Date de signature du bail:
          <input
            type="date"
            min="2000-01-01"
            max={new Date().toISOString().split('T')[0]}
            required
            lang="fr-FR"
            id="contractSignatureDate"
            onChange={(e) => setContractSignatureDate(new Date(e.target.value))}
          />
        </label>
        <label htmlFor="agreementStartDate">
          Date d'entrée en vigueur:
          <input
            type="date"
            min="2000-01-01"
            max={new Date().toISOString().split('T')[0]}
            required
            lang="fr-FR"
            id="agreementStartDate"
            onChange={(e) => setAgreementStartDate(new Date(e.target.value))}
          />
        </label>
        <label htmlFor="region">
          Région:
          <input type="select" disabled required lang="fr-FR" id="region" defaultValue="Wallonie" />
        </label>
        <label htmlFor="peb">
          Certificat PEB:
          <select
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
              <option value={rating}>{rating !== 'none' ? rating : 'pas de certificat'}</option>
            ))}
          </select>
        </label>

        <StyledButton disabled={!isValid} type="button" onClick={handleCalculate}>
          Calculer
        </StyledButton>
      </form>
      <StyledNewRent>
        <h6>Nouveau loyer autorisé</h6>
        <h2>{Number(newRent).toFixed(2).toLocaleLowerCase('fr-FR')}€</h2>
      </StyledNewRent>
    </StyledContainer>
  );
};

export default RentCalculator;
