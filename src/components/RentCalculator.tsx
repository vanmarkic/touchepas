import React, { useState } from 'react';
import { calculateRentIndexation } from '../formula/rent-increase-formula';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const StyledNewRent = styled.div`
  display: flex;
  flex-direction: column;
  gap: Orem;
`;

const RentCalculator: React.FC = () => {
  const [initialRent, setInitialRent] = useState<number | null>(null);
  const [occupationStartDate, setOccupationStartDate] = useState<string>('');
  const [contractSignatureDate, setContractSignatureDate] = useState<string>('');
  const [newRent, setNewRent] = useState<number>(0);

  // useEffect(() => {
  //   useRentFormula(occupationStartDate, contractSignatureDate, initialRent);
  // }, [occupationStartDate, contractSignatureDate, initialRent]);

  const handleCalculate = (e) => {
    e.preventDefault();
    const increasedRent = calculateRentIndexation(
      occupationStartDate,
      contractSignatureDate,
      initialRent,
    );
    if (!increasedRent) {
      setNewRent(37707);
      return;
    }
    setNewRent(increasedRent);
    return;
  };

  return (
    <StyledContainer>
      <h6>Rent Calculator</h6>
      <form onSubmit={handleCalculate}>
        <label htmlFor="initialRent">Current Rent:</label>
        <input
          type="number"
          id="initialRent"
          value={initialRent}
          onChange={(e) => setInitialRent(Number(e.target.value))}
        />

        <label htmlFor="contractSignatureDate">contractSignatureDate:</label>
        <input
          placeholder="YYYY-MM-DD"
          type="text"
          id="contractSignatureDate"
          value={contractSignatureDate}
          onChange={(e) => setContractSignatureDate(e.target.value)}
        />
        <label htmlFor="occupationStartDate">occupationStartDate:</label>
        <input
          placeholder="YYYY-MM-DD"
          type="text"
          id="occupationStartDate"
          value={occupationStartDate}
          onChange={(e) => setOccupationStartDate(e.target.value)}
        />

        <button type="submit">Calculate</button>
      </form>
      <StyledNewRent>
        <h6>New authorized rent</h6>
        <h4>{Number(newRent).toFixed(2).toLocaleLowerCase('fr-FR')}</h4>
      </StyledNewRent>
    </StyledContainer>
  );
};

export default RentCalculator;
