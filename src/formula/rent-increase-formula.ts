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
  contractSignatureDate: Date,
  agreementStartDate: Date,
  initialRent: number,
  dateOfIndexation: Date): number | null {

  console.log(contractSignatureDate, "contractSignatureDate")

  console.log(agreementStartDate, "agreementStartDate");
  if (agreementStartDate < contractSignatureDate) {
    console.error('Error: agreementStartDate must be on or after contractStartDate.');
    return null;
  }


  const anniversaryDate = new Date(contractSignatureDate)
  anniversaryDate.setFullYear(dateOfIndexation.getFullYear(), dateOfIndexation.getMonth() - 1);

  const anniversaryMonth = anniversaryDate.toLocaleString('en-US', { month: 'long' });
  const anniversaryYear = anniversaryDate.getFullYear();
  const newHealthIndex = findHealthIndex(anniversaryYear, anniversaryMonth);
  if (!newHealthIndex) {
    console.error('Error: Could not find health index for given date.');
    return null;
  }


  let initialIndex;
  if (contractSignatureDate < new Date('1984-01-01')) {
    initialIndex = 82.54;
  } else {


    const agreementAnniversaireDate = new Date(agreementStartDate)
    agreementAnniversaireDate.setMonth(agreementStartDate.getMonth() - 1);
    const agreementSignatureMonth = agreementStartDate.toLocaleString('en-US', { month: 'long' });
    const agreementSignatureYear = agreementStartDate.getFullYear();



    if (agreementStartDate < new Date('1994-02-01')) {
      initialIndex = findHealthIndex(agreementSignatureYear, agreementSignatureMonth);
      if (!initialIndex) {
        console.error('Error: Could not find health index for given date.');
        return null;
      }
    } else {

      const initialIndexDate = new Date(agreementStartDate);
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


  return (initialRent * newHealthIndex) / initialIndex;
}


