import healthIndexData from './indices.json';
import { subMonths } from 'date-fns';
import { BASE_YEARS, ENERGY_RATIOS, Regions } from './types-and-constants';

export const getYearOfIndexationWithPEB = (agreementStartDate: Date, region: Regions) => {
  console.log(agreementStartDate)
  if (agreementStartDate >= ENERGY_RATIOS[region].start) {
    return agreementStartDate.getFullYear();
  }

  return agreementStartDate.getMonth() >= ENERGY_RATIOS[region].start.getMonth() ? 2022 : 2023;
}


export function roundToTwoDecimals(result: number) {
  return Math.round(result * 100) / 100;
}

export function getIsAfterDecree(yearOfIndexation: number, region: Regions, agreementStartDate: Date) {
  return yearOfIndexation > ENERGY_RATIOS[region].end.getFullYear() || (yearOfIndexation === ENERGY_RATIOS[region].end.getFullYear() && agreementStartDate.getMonth() > ENERGY_RATIOS[region].end.getMonth());
}

export function getInitialIndex(contractSignatureDate: Date, agreementStartDate: Date, selectedIndexBaseYear: number) {

  if (contractSignatureDate < new Date('1984-01-01')) {
    return 82.54;
  }

  if (agreementStartDate < new Date('1994-02-01')) {
    const agreementAnniversaireDate = new Date(agreementStartDate);
    agreementAnniversaireDate.setMonth(agreementStartDate.getMonth() - 1);
    const agreementSignatureMonth = agreementStartDate.toLocaleString('en-US', { month: 'long' });
    const agreementSignatureYear = agreementStartDate.getFullYear();

    return findHealthIndex(agreementSignatureYear, agreementSignatureMonth, selectedIndexBaseYear);
  }

  const initialIndexDate = new Date(contractSignatureDate);
  initialIndexDate.setMonth(initialIndexDate.getMonth() - 1);
  const initialIndexMonth = initialIndexDate.toLocaleString('en-US', { month: 'long' });
  const initialIndexYear = initialIndexDate.getFullYear();

  return findHealthIndex(initialIndexYear, initialIndexMonth, selectedIndexBaseYear);

}

export function getIndexBaseYear(date: Date): number {
  let selectedIndexBaseYear: typeof BASE_YEARS[number] | 0 = 0

  BASE_YEARS.forEach((year) => {
    if (year <= date.getFullYear() && year > selectedIndexBaseYear) {
      selectedIndexBaseYear = year;
    }
  })
  if (!selectedIndexBaseYear) {
    throw new Error('Error: Could not find base year for given date.');
  }
  return selectedIndexBaseYear
}

export function findHealthIndex(year: number, month: string, baseYear: number) {

  const indexEntry = healthIndexData.facts.find(entry => {
    return entry["Year"] === year.toString() &&
      entry["Month"] === month && entry["Base year"] === baseYear.toString();
  });

  if (!indexEntry) throw new Error('Error: Could not find health index for : date :' + year + ' ' + month + ' - base year :' + baseYear);

  return indexEntry['Health index']
}

export const getIndexDate = (date: Date) => {
  return { year: date.getFullYear(), month: date.toLocaleString('en-US', { month: 'long' }) };
}




export const shouldUsePreviousYear = (anniversaryMonth: string) => anniversaryMonth === "December";
export const getAnniversaryMonth = (agreementStartDate: Date) => subMonths(agreementStartDate, 1).toLocaleString('en-US', { month: 'long' });

export const deriveData = (
  { agreementStartDate, contractSignatureDate, yearOfIndexation, region }:
    { agreementStartDate: Date; contractSignatureDate: Date; yearOfIndexation: number; region: Regions }
) => {
  const indexBaseYear = getIndexBaseYear(contractSignatureDate);
  const anniversaryMonth = getAnniversaryMonth(agreementStartDate);
  const initialIndex = getInitialIndex(contractSignatureDate, agreementStartDate, indexBaseYear)
  const newHealthIndex = findHealthIndex(shouldUsePreviousYear(anniversaryMonth) ? yearOfIndexation - 1 : yearOfIndexation, anniversaryMonth, indexBaseYear);
  const isRequestedAfterEndOfDecree = getIsAfterDecree(yearOfIndexation, region, agreementStartDate)

  const wasIndexationRequestedBeforeStartOfEnergyRatingDecree = yearOfIndexation <= ENERGY_RATIOS[region].start.getFullYear() && agreementStartDate.getMonth() < ENERGY_RATIOS[region].start.getMonth()

  const healthIndexBeforeDecree = findHealthIndex(shouldUsePreviousYear(anniversaryMonth) ? yearOfIndexation - 2 : yearOfIndexation - 1, anniversaryMonth, indexBaseYear)

  return ({
    indexBaseYear, anniversaryMonth, initialIndex, newHealthIndex, isRequestedAfterEndOfDecree, wasIndexationRequestedBeforeStartOfEnergyRatingDecree, healthIndexBeforeDecree
  })
}

export const deriveDataWithPEB = (
  { agreementStartDate, region, anniversaryMonth, indexBaseYear, basicFormulaWithInitialRentAndIndex }:
    { agreementStartDate: Date; region: Regions, anniversaryMonth: string; indexBaseYear: number; basicFormulaWithInitialRentAndIndex: (index: number) => number }
) => {
  const yearOfIndexationWithPEB = getYearOfIndexationWithPEB(agreementStartDate, region)
  const currentYearHealthIndex = findHealthIndex(shouldUsePreviousYear(anniversaryMonth) ? yearOfIndexationWithPEB - 1 : yearOfIndexationWithPEB, anniversaryMonth, indexBaseYear);
  const previousYearHealthIndex = findHealthIndex(shouldUsePreviousYear(anniversaryMonth) ? yearOfIndexationWithPEB - 2 : yearOfIndexationWithPEB - 1, anniversaryMonth, indexBaseYear);

  const previousYearIndexedRent = basicFormulaWithInitialRentAndIndex(previousYearHealthIndex)
  const currentYearIndexedRent = basicFormulaWithInitialRentAndIndex(currentYearHealthIndex)



  return ({
    yearOfIndexationWithPEB,
    currentYearHealthIndex,
    previousYearIndexedRent,
    currentYearIndexedRent
  })
} 