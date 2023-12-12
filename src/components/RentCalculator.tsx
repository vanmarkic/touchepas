import React, { FormEventHandler, MouseEventHandler, useState } from 'react';
import { calculateRentIndexation } from '../formula/rent-increase-formula';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 10px;
`;
const StyledNewRent = styled.div`
  display: flex;
  flex-direction: column;
  gap: Orem;
`;

const RentCalculator: React.FC = () => {
  const [indexationDate, setIndexationDate] = useState<Date>(new Date());
  const [initialRent, setInitialRent] = useState<number>(0);
  const [contractSignatureDate, setContractSignatureDate] = useState<Date>(new Date());
  const [agreementStartDate, setAgreementStartDate] = useState<Date>(new Date());
  const [newRent, setNewRent] = useState<number | string>(0);

  const isValid =
    indexationDate &&
    initialRent &&
    contractSignatureDate &&
    agreementStartDate &&
    indexationDate > agreementStartDate &&
    agreementStartDate >= contractSignatureDate;

  const handleCalculate = (e: any) => {
    e.preventDefault();
    const increasedRent = calculateRentIndexation(
      contractSignatureDate,
      agreementStartDate,
      initialRent,
      indexationDate,
    );
    if (!increasedRent) {
      setNewRent('something went wrong');
      return;
    }
    setNewRent(increasedRent);
    return;
  };

  return (
    <StyledContainer>
      <h4>Calculateur de loyer</h4>
      <form>
        <label htmlFor="indexationDate">
          Date de demande d'indexation:
          <input
            type="date"
            min="2000-01-01"
            required
            lang="fr-FR"
            id="indexationDate"
            defaultValue={indexationDate.toISOString().split('T')[0]}
            onChange={(e) => setIndexationDate(new Date(e.target.value))}
          />
        </label>
        <label htmlFor="initialRent">
          Loyer stipulé sur le bail:
          <input
            type="number"
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

        <button disabled={!isValid} type="button" onClick={handleCalculate}>
          Calculer
        </button>
      </form>
      <StyledNewRent>
        <h6>Nouveau loyer autorisé</h6>
        <h2>{Number(newRent).toFixed(2).toLocaleLowerCase('fr-FR')}€</h2>
      </StyledNewRent>
    </StyledContainer>
  );
};

export default RentCalculator;
