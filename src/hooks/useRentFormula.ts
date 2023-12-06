import { useState } from 'react';
import { calculateRentIndexation } from '../formula/rent-increase-formula';

const useRentFormula = () => {
  const [rentIndexation, setRentIndexation] = useState<number>(0);

  const calculateRentIndexation = () => {
    const rentIndexation = calculateRentIndexation();
    setRentIndexation(rentIndexation);
  };


  return {
    rentIndexation,
  };
};
