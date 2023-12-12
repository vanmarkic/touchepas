import healthIndexData from './health-index.json';
import { subMonths } from 'date-fns'



export function calculateRentIndexation(
  contractSignatureDate: Date,
  agreementStartDate: Date,
  initialRent: number,
  dateOfIndexation: Date): number | null {

  if (agreementStartDate < contractSignatureDate) {
    console.error('Error: agreementStartDate must be on or after contractStartDate.');
    return null;
  }

  const selectedIndexBaseYear = getBaseYear(contractSignatureDate);

  if (!selectedIndexBaseYear) {
    console.error('Error: Could not find base year for given date.');
    return null;
  }



  const anniversaryMonth = subMonths(agreementStartDate, 1).toLocaleString('en-US', { month: 'long' });

  const newHealthIndex = findHealthIndex(anniversaryMonth === "December" ? dateOfIndexation.getFullYear() - 1 : dateOfIndexation.getFullYear(), anniversaryMonth, selectedIndexBaseYear);

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
      initialIndex = findHealthIndex(agreementSignatureYear, agreementSignatureMonth, selectedIndexBaseYear);
      if (!initialIndex) {
        console.error('Error: Could not find health index for given date.');
        return null;
      }
    } else {

      const initialIndexDate = new Date(contractSignatureDate);
      initialIndexDate.setMonth(initialIndexDate.getMonth() - 1);
      console.log(initialIndexDate)
      const initialIndexMonth = initialIndexDate.toLocaleString('en-US', { month: 'long' });

      const initialIndexYear = initialIndexDate.getFullYear();

      initialIndex = findHealthIndex(initialIndexYear, initialIndexMonth, selectedIndexBaseYear);
      if (!initialIndex) {
        console.error('Error: Could not find health index for given date.');
        return null;
      }
    }
  }

  // Loyer de base (octobre 2022) * IS [2013] octobre 2023 / IS [2013] septembre 2022


  return (initialRent * newHealthIndex) / initialIndex;
}




function getBaseYear(date: Date) {
  let selectedIndexBaseYear: typeof BASE_YEARS[number] | 0 = 0

  BASE_YEARS.forEach((year) => {
    if (year <= date.getFullYear() && year > selectedIndexBaseYear) {
      selectedIndexBaseYear = year;
    }
  })
  return selectedIndexBaseYear
}

function findHealthIndex(year: number, month: string, baseYear: number) {

  const indexEntry = healthIndexData.facts.find(entry => {
    return entry["Year"] === year.toString() &&
      entry["Month"] === month && entry["Base year"] === baseYear.toString();
  });

  return indexEntry ? indexEntry['Health index'] : null;
}

const getIndexDate = (date: Date) => {

  return { year: date.getFullYear(), month: date.toLocaleString('en-US', { month: 'long' }) };
}



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

const BASE_YEARS = [
  1988,
  1996,
  2004,
  2013,
] as const;
