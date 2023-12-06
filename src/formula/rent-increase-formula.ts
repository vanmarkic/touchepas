import * as healthIndexData from './health-index.json';

export type Inputs = {
  energyEfficiencyRating: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'none';
  contractSignatureDate: Date;
  rentStartDate: Date;
  originalRentAmount: number;
  yearOfIncrease: number;
  currentHealthIndex: number;
  originalHealthIndex: number;
}

export const energyEfficiencyRatios: Record<Inputs["energyEfficiencyRating"], number> = {
  A: 1,
  B: 1,
  C: 1,
  D: .75,
  E: .5,
  F: 0,
  G: 0,
  none: 0
} as const

export type Outputs = {
  rentIncrease: number;
  increasedRentAmount: number;
  increasePercentage: number
}


function findHealthIndex(year: number, month: string) {
  console.log(year, month)
  const indexEntry = healthIndexData.facts.find(entry => {
    return entry["Year"] === year.toString() &&
      entry["Month"] === month
  });
  console.log(indexEntry)
  return indexEntry ? indexEntry['Health index'] : null;
}


export function calculateRentIndexation(
  contractStartDate: string, agreementStartDate: string,
  basicRent: number): number | null {
  const currentDate = new Date();
  const anniversaryDate = new Date(contractStartDate);
  anniversaryDate.setFullYear(currentDate.getFullYear(), currentDate.getMonth() - 1);

  const anniversaryMonth = anniversaryDate.toLocaleString('en-US', { month: 'long' });
  const anniversaryYear = anniversaryDate.getFullYear();
  const newHealthIndex = findHealthIndex(anniversaryYear, anniversaryMonth);
  if (!newHealthIndex) {
    console.error('Error: Could not find health index for given date.');
    return null;
  }


  let initialIndex;
  if (contractStartDate < '1984-01-01') {
    initialIndex = 82.54;
  } else {
    const agreementSignatureDate = new Date(agreementStartDate);
    agreementSignatureDate.setMonth(agreementSignatureDate.getMonth() - 1);
    const agreementSignatureMonth = agreementSignatureDate.toLocaleString('en-US', { month: 'long' });
    const agreementSignatureYear = agreementSignatureDate.getFullYear();

    if (agreementSignatureDate > anniversaryDate) {
      console.error('Error: agreementStartDate must be on or before contractStartDate.');
      return null;
    }

    if (agreementStartDate < '1994-02-01') {
      initialIndex = findHealthIndex(agreementSignatureYear, agreementSignatureMonth);
      if (!initialIndex) {
        console.error('Error: Could not find health index for given date.');
        return null;
      }
    } else {

      const initialIndexDate = new Date(agreementSignatureDate);
      initialIndexDate.setMonth(initialIndexDate.getMonth() - 1);
      const initialIndexMonth = initialIndexDate.toLocaleString('en-US', { month: 'long' });
      const initialIndexYear = initialIndexDate.getFullYear();
      initialIndex = findHealthIndex(initialIndexYear, initialIndexMonth);
      if (!initialIndex) {
        console.error('Error: Could not find health index for given date.');
        return null;
      }
    }
  }


  return (basicRent * newHealthIndex) / initialIndex;
}


