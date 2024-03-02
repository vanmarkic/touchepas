import {
  ENERGY_RATIOS,
  EnergyEfficiencyRating,
  RentIndexationArguments,
} from './types-and-constants';
import { roundToTwoDecimals, deriveData, deriveDataWithPEB, findHealthIndex } from './utils';

export const basicFormula =
  (initialIndex: number, initialRent: number) =>
  (newIndex: number): number => {
    return roundToTwoDecimals((initialRent * newIndex) / initialIndex);
  };

const formulaWithEnergyRatio = (
  previousYearIndexedRent: number,
  currentYearIndexedRent: number,
  PEBRatio: number,
) => previousYearIndexedRent + (currentYearIndexedRent - previousYearIndexedRent) * PEBRatio;

export function calculateRentIndexation({
  contractSignatureDate,
  agreementStartDate,
  initialRent,
  yearOfIndexation,
  region,
  energyEfficiencyRating,
}: RentIndexationArguments): number | null {
  const {
    indexBaseYear,
    anniversaryMonth,
    initialIndex,
    newHealthIndex,
    isRequestedAfterEndOfDecree,
    wasIndexationRequestedBeforeStartOfEnergyRatingDecree,
    healthIndexBeforeDecree,
  } = deriveData({ agreementStartDate, contractSignatureDate, yearOfIndexation, region });

  if (region === 'brussels') {
    return roundToTwoDecimals(
      calculateRentIndexationForBxl(
        initialRent,
        initialIndex,
        newHealthIndex,
        energyEfficiencyRating,
        agreementStartDate,
      ) ?? 0,
    );
  }

  // ---- basic formula preapplied with index and rent
  const basicFormulaWithInitialRentAndIndex = basicFormula(initialIndex, initialRent);

  const { previousYearIndexedRent, currentYearIndexedRent } = deriveDataWithPEB({
    agreementStartDate,
    region,
    anniversaryMonth,
    indexBaseYear,
    basicFormulaWithInitialRentAndIndex,
  });

  // ---- made lazy
  const getIndexedRentWithEnergyRatio = () =>
    formulaWithEnergyRatio(
      previousYearIndexedRent,
      currentYearIndexedRent,
      ENERGY_RATIOS[region].peb[energyEfficiencyRating],
    );

  //---- pure business logic
  if (isRequestedAfterEndOfDecree && region === 'wallonia') {
    if (['A', 'B', 'C'].includes(energyEfficiencyRating)) {
      return basicFormulaWithInitialRentAndIndex(newHealthIndex);
    }
    const agreementMonth = agreementStartDate.toLocaleString('en-US', { month: 'long' });
    // const yearOfAdaptedRent = yearOfIndexation - 1;
    // const adaptedIndex = findHealthIndex(yearOfAdaptedRent, 'October', indexBaseYear);

    const ratioEnergetique = ENERGY_RATIOS[region].peb[energyEfficiencyRating];
    const ecartType = (initialRent / initialIndex) * healthIndexBeforeDecree;
    const ecartType2 = ecartType - initialRent;
    const ecartType2Ratio = ecartType2 * ratioEnergetique;
    const october2021Index = findHealthIndex(2021, 'October', indexBaseYear);

    const loyerIndexéOctobre2O21 = (initialRent / initialIndex) * october2021Index;
    const loyerAdapté =
      agreementStartDate >= new Date('01/11/2021') && agreementStartDate <= new Date('12/31/2021')
        ? initialRent + ecartType2Ratio
        : loyerIndexéOctobre2O21 + ecartType2Ratio;

    debugger;
    if (!['November', 'December'].includes(agreementMonth)) {
      debugger;
      return roundToTwoDecimals(loyerAdapté);
    }
    debugger;
    return roundToTwoDecimals((loyerAdapté * newHealthIndex) / healthIndexBeforeDecree);
  }

  return roundToTwoDecimals(
    wasIndexationRequestedBeforeStartOfEnergyRatingDecree
      ? basicFormulaWithInitialRentAndIndex(newHealthIndex)
      : calculerIndexationLoyerDurantDécretEnWallonie(
          currentYearIndexedRent,
          previousYearIndexedRent,
          ENERGY_RATIOS[region].peb[energyEfficiencyRating],
        ),
  );
}

type Month =
  | '14-31 October'
  | 'November'
  | 'December'
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | '1-13 October';

interface CorrectionFactors {
  [key: string]: {
    [month in Month]: number;
  };
}

const correctionFactors: CorrectionFactors = {
  E: {
    '14-31 October': 0.949447646,
    November: 0.945356473,
    December: 0.951977401,
    January: 0.951950895,
    February: 0.961757813,
    March: 0.967996216,
    April: 0.965766823,
    May: 0.971941594,
    June: 0.972124068,
    July: 0.976119286,
    August: 0.977109655,
    September: 0.980049682,
    '1-13 October': 0.989805521,
  },
  F: {
    '14-31 October': 0.898895293,
    November: 0.890712946,
    December: 0.903954802,
    January: 0.903901791,
    February: 0.923515625,
    March: 0.935992433,
    April: 0.931533646,
    May: 0.943883189,
    June: 0.944248135,
    July: 0.952238571,
    August: 0.954219311,
    September: 0.960099363,
    '1-13 October': 0.979611041,
  },
};

export function calculateRentIndexationForBxl(
  initialRent: number,
  initialIndex: number,
  newHealthIndex: number,
  rating: EnergyEfficiencyRating,
  anniversaryDate: Date,
): number | void {
  let indexedRent: number = (initialRent * newHealthIndex) / initialIndex;

  const month: Month = convertDateToMonth(anniversaryDate);

  switch (rating) {
    case 'A':
    case 'B':
    case 'C':
    case 'D':
      return indexedRent;
    case 'E':
      return (indexedRent *= correctionFactors['E'][month]);
    case 'F':
    case 'G':
      return (indexedRent *= correctionFactors['F'][month]);
    case 'none':
      alert('Please select a rating');
      break;
    default:
      alert('Please select a rating');
      break;
  }
}

function convertDateToMonth(date: Date): Month {
  const month: number = date.getMonth();
  const day: number = date.getDate();

  const monthNames: Month[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    '1-13 October',
    'November',
    'December',
  ];
  if (month === 9) {
    return day >= 14 && day <= 31 ? '14-31 October' : '1-13 October';
  }
  return monthNames[month];
}

function calculerIndexationLoyerAprèsFinDuDécretEnWallonie(
  loyerBase: number,
  indiceSanteDepart: number,
  indiceSanteAnniversaire: number,
  indiceSanteAnniversaireSuivant: number,
  PEBRatio: number,
): number {
  // Étape 1: Calculer le loyer indexé initial
  let loyerIndexeInitial = (loyerBase * indiceSanteAnniversaire) / indiceSanteDepart;

  // Étape 2: Appliquer la limitation de 75% pour le certificat PEB D
  let augmentationLoyer = (loyerIndexeInitial - loyerBase) * PEBRatio;
  let loyerAdaptePEB = loyerBase + augmentationLoyer;

  // Étape 3: Calculer le loyer indexé pour l'année suivante
  let loyerIndexeSuivant =
    (loyerAdaptePEB * indiceSanteAnniversaireSuivant) / indiceSanteAnniversaire;

  return roundToTwoDecimals(loyerIndexeSuivant); // Arrondit à deux décimales
}

function calculerIndexationLoyerDurantDécretEnWallonie(
  loyerIndexeActuel: number,
  loyerIndexePrecedent: number,
  PEBRatio: number,
) {
  // Calculer le loyer indexé actuel

  // Calculer la différence
  let difference = loyerIndexeActuel - loyerIndexePrecedent;

  // Appliquer la limitation en fonction du certificat PEB
  let augmentationLoyer = difference * PEBRatio;

  // Calculer le loyer indexé final pour l'année en cours
  let loyerIndexeFinal = loyerIndexePrecedent + augmentationLoyer;

  return roundToTwoDecimals(loyerIndexeFinal); // Arrondit à deux décimales
}
