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
}: RentIndexationArguments): { explanation: string; rent: number | null } {
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
    return {
      // provide detailed process to obtain the rent
      explanation: `La fonction "calculateRentIndexationForBxl" est utilisée pour calculer l'indexation du loyer pour la région de Bruxelles.
      
      Elle prend en compte plusieurs paramètres, tels que le loyer initial, l'indice santé initial, le nouvel indice de santé, la cote d'efficacité énergétique et la date anniversaire.

      Voici comment elle fonctionne avec des valeurs dynamiques :
      
      Supposons que le loyer initial soit de ${initialRent} euros, l'indice initial soit de ${initialIndex}, le nouvel indice de santé soit de ${newHealthIndex} et la cote d'efficacité énergétique soit de ${energyEfficiencyRating}.
      
      Le loyer indexé est calculé en multipliant le loyer initial (${initialRent} euros) par le nouvel indice de santé (${newHealthIndex}) et en divisant le résultat par l'indice initial (${initialIndex}). Cela donne un loyer indexé.
      
      Ensuite, en fonction de la cote d'efficacité énergétique (${energyEfficiencyRating}), la fonction applique des facteurs de correction spécifiques pour ajuster le loyer indexé. Les cotes A, B, C et D n'ont pas de facteur de correction supplémentaire, tandis que les cotes E, F et G ont des facteurs de correction spécifiques pour chaque mois.
      
      Si la cote d'efficacité énergétique n'est pas sélectionnée ou si une valeur inattendue est fournie, la fonction affiche une alerte demandant de sélectionner une cote valide.
      
      La fonction renvoie le loyer indexé final (${roundToTwoDecimals(
        calculateRentIndexationForBxl(
          initialRent,
          initialIndex,
          newHealthIndex,
          energyEfficiencyRating,
          agreementStartDate,
        ) ?? 0,
      )} euros).
      
      `,
      rent: roundToTwoDecimals(
        calculateRentIndexationForBxl(
          initialRent,
          initialIndex,
          newHealthIndex,
          energyEfficiencyRating,
          agreementStartDate,
        ) ?? 0,
      ),
    };
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
      return {
        explanation: 'wallonia after end of decree and A B or C',
        rent: basicFormulaWithInitialRentAndIndex(newHealthIndex),
      };
    }
    const agreementMonth = agreementStartDate.toLocaleString('en-US', { month: 'long' });

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

    if (!['November', 'December'].includes(agreementMonth)) {
      return {
        explanation:
          'after decree except for november and december in wallonia, for rating of D and worse',
        rent: roundToTwoDecimals(loyerAdapté),
      };
    }
    return {
      explanation: 'after decree for november and december in wallonia, for rating of D and worse',
      rent: roundToTwoDecimals((loyerAdapté * newHealthIndex) / healthIndexBeforeDecree),
    };
  }

  return wasIndexationRequestedBeforeStartOfEnergyRatingDecree
    ? {
        rent: roundToTwoDecimals(basicFormulaWithInitialRentAndIndex(newHealthIndex)),
        explanation: 'before decree in wallonia',
      }
    : {
        explanation: `Différence = Loyer potentiel de l'année en cours ${currentYearIndexedRent} - loyer indexé à l'année précédente ${previousYearIndexedRent}
        Différence soumise au prorata du ratio PEB = différence X ${
          ENERGY_RATIOS[region].peb[energyEfficiencyRating]
        } 
        Loyer indexé final = Loyer indexé précédent ${previousYearIndexedRent} +   Différence soumise au prorata du ratio PEB ${
          currentYearIndexedRent -
          previousYearIndexedRent * ENERGY_RATIOS[region].peb[energyEfficiencyRating]
        } =  ${roundToTwoDecimals(
          calculerIndexationLoyerDurantDécretEnWallonie(
            currentYearIndexedRent,
            previousYearIndexedRent,
            ENERGY_RATIOS[region].peb[energyEfficiencyRating],
          ),
        )}`,
        rent: roundToTwoDecimals(
          calculerIndexationLoyerDurantDécretEnWallonie(
            currentYearIndexedRent,
            previousYearIndexedRent,
            ENERGY_RATIOS[region].peb[energyEfficiencyRating],
          ),
        ),
      };
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
