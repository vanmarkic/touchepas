import healthIndexData from './indices.json';
import { subMonths } from 'date-fns'
import { Regions, EnergyEfficiencyRating, ENERGY_RATIOS, BASE_YEARS } from './types-and-constants';

export function calculateRentIndexation(
  {
    contractSignatureDate,
    agreementStartDate,
    initialRent,
    yearOfIndexation,
    region,
    energyEfficiencyRating
  }: {
    contractSignatureDate: Date;
    agreementStartDate: Date;
    initialRent: number;
    yearOfIndexation: number;
    region: Regions;
    energyEfficiencyRating: EnergyEfficiencyRating
  }
): number | null {

  const indexBaseYear = getIndexBaseYear(contractSignatureDate);

  const anniversaryMonth = subMonths(agreementStartDate, 1).toLocaleString('en-US', { month: 'long' });

  const shouldUsePreviousYear = anniversaryMonth === "December";

  const newHealthIndex = findHealthIndex(shouldUsePreviousYear ? yearOfIndexation - 1 : yearOfIndexation, anniversaryMonth, indexBaseYear);

  const initialIndex = getInitialIndex(contractSignatureDate, agreementStartDate, indexBaseYear)

  const basicFormula = (newIndex: number): number => roundToTwoDecimals((initialRent * newIndex) / initialIndex)

  const formulaWithEnergyRatio = () => {
    const yearOfIndexationWithPEB = getYearOfIndexationWithPEB(agreementStartDate, region)
    const currentYearHealthIndex = findHealthIndex(shouldUsePreviousYear ? yearOfIndexationWithPEB - 1 : yearOfIndexationWithPEB, anniversaryMonth, indexBaseYear);
    const previousYearHealthIndex = findHealthIndex(shouldUsePreviousYear ? yearOfIndexationWithPEB - 2 : yearOfIndexationWithPEB - 1, anniversaryMonth, indexBaseYear);
    const previousYearIndexedRent = basicFormula(previousYearHealthIndex)
    const currentYearIndexedRent = basicFormula(currentYearHealthIndex)
    const result = previousYearIndexedRent + ((currentYearIndexedRent - previousYearIndexedRent) * ENERGY_RATIOS[region].peb[energyEfficiencyRating])

    return roundToTwoDecimals(result)
  }

  const wasIndexationRequestedBeforeStartOfEnergyRatingDecree = yearOfIndexation <= ENERGY_RATIOS[region].start.getFullYear() && agreementStartDate.getMonth() < ENERGY_RATIOS[region].start.getMonth()

  const isAfterDecree = getIsAfterDecree(yearOfIndexation, region, agreementStartDate)

  if (isAfterDecree) {

    const result = formulaWithEnergyRatio() * newHealthIndex / findHealthIndex(shouldUsePreviousYear ? yearOfIndexation - 2 : yearOfIndexation - 1, anniversaryMonth, indexBaseYear)
    return roundToTwoDecimals(result)

  }

  return wasIndexationRequestedBeforeStartOfEnergyRatingDecree ? basicFormula(newHealthIndex) : formulaWithEnergyRatio()

}


export const getYearOfIndexationWithPEB = (agreementStartDate: Date, region: Regions) => {
  if (agreementStartDate >= ENERGY_RATIOS[region].start) {
    throw new Error('Error: Agreement start date is after the start of the PEB range.');
  }
  return agreementStartDate.getMonth() >= ENERGY_RATIOS[region].start.getMonth() ? 2022 : 2023;
}




function roundToTwoDecimals(result: number) {
  return Math.round(result * 100) / 100;
}

export function getIsAfterDecree(yearOfIndexation: number, region: Regions, agreementStartDate: Date) {
  return yearOfIndexation > ENERGY_RATIOS[region].end.getFullYear() || (yearOfIndexation === ENERGY_RATIOS[region].end.getFullYear() && agreementStartDate.getMonth() > ENERGY_RATIOS[region].end.getMonth());
}

function getInitialIndex(contractSignatureDate: Date, agreementStartDate: Date, selectedIndexBaseYear: number) {

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

function getIndexBaseYear(date: Date): number {
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

function findHealthIndex(year: number, month: string, baseYear: number) {

  const indexEntry = healthIndexData.facts.find(entry => {
    return entry["Year"] === year.toString() &&
      entry["Month"] === month && entry["Base year"] === baseYear.toString();
  });

  if (!indexEntry) throw new Error('Error: Could not find health index for : date :' + year + ' ' + month + ' - base year :' + baseYear);

  return indexEntry['Health index']
}

const getIndexDate = (date: Date) => {
  return { year: date.getFullYear(), month: date.toLocaleString('en-US', { month: 'long' }) };
}

