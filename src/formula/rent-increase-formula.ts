import { ENERGY_RATIOS, EnergyEfficiencyRating, RentIndexationArguments } from './types-and-constants';
import { roundToTwoDecimals, deriveData, deriveDataWithPEB } from './utils';

const basicFormula = (initialIndex: number, initialRent: number) => (newIndex: number): number => roundToTwoDecimals((initialRent * newIndex) / initialIndex)

const formulaWithEnergyRatio = (previousYearIndexedRent: number, currentYearIndexedRent: number, PEBRatio: number) => {
  return previousYearIndexedRent + ((currentYearIndexedRent - previousYearIndexedRent) * PEBRatio)
}


export function calculateRentIndexation(
  {
    contractSignatureDate,
    agreementStartDate,
    initialRent,
    yearOfIndexation,
    region,
    energyEfficiencyRating
  }: RentIndexationArguments
): number | null {



  const { indexBaseYear, anniversaryMonth, initialIndex, newHealthIndex, isRequestedAfterEndOfDecree, wasIndexationRequestedBeforeStartOfEnergyRatingDecree, healthIndexBeforeDecree } =
    deriveData({ agreementStartDate, contractSignatureDate, yearOfIndexation, region })


  if (region === 'brussels') {
    calculateRentIndexationForBxl(initialRent, initialIndex, newHealthIndex, energyEfficiencyRating, agreementStartDate)
  }

  // ---- basic formula preapplied with index and rent
  const basicFormulaWithInitialRentAndIndex = basicFormula(initialIndex, initialRent)

  const {
    previousYearIndexedRent,
    currentYearIndexedRent,
  } = deriveDataWithPEB({ agreementStartDate, region, anniversaryMonth, indexBaseYear, basicFormulaWithInitialRentAndIndex })

  // ---- made lazy
  const getIndexedRentWithEnergyRatio = () => formulaWithEnergyRatio(previousYearIndexedRent, currentYearIndexedRent, ENERGY_RATIOS[region].peb[energyEfficiencyRating])

  //---- pure business logic
  if (isRequestedAfterEndOfDecree) {
    return roundToTwoDecimals(getIndexedRentWithEnergyRatio() * newHealthIndex / healthIndexBeforeDecree)
  }

  return wasIndexationRequestedBeforeStartOfEnergyRatingDecree ? basicFormulaWithInitialRentAndIndex(newHealthIndex) : getIndexedRentWithEnergyRatio()

}



type Month = '14-31 October' | 'November' | 'December' | 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | '1-13 October';

interface CorrectionFactors {
  [key: string]: {
    [month in Month]: number;
  };
}

const correctionFactors: CorrectionFactors = {
  'E': {
    '14-31 October': 0.949447646,
    'November': 0.945356473,
    'December': 0.951977401,
    'January': 0.951950895,
    'February': 0.961757813,
    'March': 0.967996216,
    'April': 0.965766823,
    'May': 0.971941594,
    'June': 0.972124068,
    'July': 0.976119286,
    'August': 0.977109655,
    'September': 0.980049682,
    '1-13 October': 0.989805521
  },
  'F': {
    '14-31 October': 0.898895293,
    'November': 0.890712946,
    'December': 0.903954802,
    'January': 0.903901791,
    'February': 0.923515625,
    'March': 0.935992433,
    'April': 0.931533646,
    'May': 0.943883189,
    'June': 0.944248135,
    'July': 0.952238571,
    'August': 0.954219311,
    'September': 0.960099363,
    '1-13 October': 0.979611041
  }
};

function calculateRentIndexationForBxl(initialRent: number, initialIndex: number, newHealthIndex: number, rating: EnergyEfficiencyRating, anniversaryDate: Date): number {
  let indexedRent: number = initialRent * newHealthIndex / initialIndex;

  const month: Month = convertDateToMonth(anniversaryDate);
  rating = rating === 'G' ? 'F' : rating
  const factor = correctionFactors[rating][month];
  if (factor) {
    indexedRent *= factor;
  }

  return indexedRent;
}

function convertDateToMonth(date: Date): Month {
  const month: number = date.getMonth();
  const day: number = date.getDate();

  const monthNames: Month[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', '1-13 October', 'November', 'December'];
  if (month === 9) {
    return day >= 14 && day <= 31 ? '14-31 October' : '1-13 October';
  }
  return monthNames[month];
}