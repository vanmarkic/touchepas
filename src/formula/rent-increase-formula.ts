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
        explanation: `wallonia after end of decree and A B or C:
        
        La fonction basicFormula est utilisée pour calculer l'indexation de base du loyer. Elle prend en compte trois paramètres : l'indice initial, le loyer initial et le nouvel indice de santé.

        Voici comment elle fonctionne avec des valeurs dynamiques :

        Supposons que l'indice initial soit de ${initialIndex}, le loyer initial soit de ${initialRent} euros et le nouvel indice de santé soit de ${newHealthIndex}.

        La formule de base pour l'indexation du loyer est calculée en multipliant le loyer initial (${initialRent} euros) par le nouvel indice de santé (${newHealthIndex}) et en divisant le résultat par l'indice initial (${initialIndex}). Cela donne un loyer indexé de ${roundToTwoDecimals(
          basicFormulaWithInitialRentAndIndex(newHealthIndex),
        )} euros.
        `,
        rent: basicFormulaWithInitialRentAndIndex(newHealthIndex),
      };
    }
    const agreementMonth = agreementStartDate.toLocaleString('en-US', { month: 'long' });

    const ratioEnergetique = ENERGY_RATIOS[region].peb[energyEfficiencyRating];
    const loyerIndexéAvantDécret = (initialRent / initialIndex) * healthIndexBeforeDecree;
    const ecartType = loyerIndexéAvantDécret - initialRent;
    const ecartTypeAuProrata = ecartType * ratioEnergetique;
    const october2021Index = findHealthIndex(2021, 'October', indexBaseYear);

    const loyerIndexéOctobre2O21 = (initialRent / initialIndex) * october2021Index;
    const loyerAdapté =
      agreementStartDate >= new Date('01/11/2021') && agreementStartDate <= new Date('12/31/2021')
        ? initialRent + ecartTypeAuProrata
        : loyerIndexéOctobre2O21 + ecartTypeAuProrata;

    if (!['November', 'December'].includes(agreementMonth)) {
      return {
        explanation: `after decree except for november and december in wallonia, for rating of D and worse

              Supposons que le mois de l'accord soit ${agreementMonth}, le ratio énergétique soit ${ratioEnergetique}, loyerIndexéAvantDécret soit ${loyerIndexéAvantDécret}, l'écart type soit ${ecartType}, ecartTypeAuProrata soit ${ecartTypeAuProrata}, l'indice d'octobre 2021 soit ${october2021Index}, le loyer indexé d'octobre 2021 soit ${loyerIndexéOctobre2O21} et le loyer adapté soit ${loyerAdapté}.

            La portion de code commence par déterminer le mois de l'accord (${agreementMonth}) à partir de la date de début du contrat.

            Ensuite, elle calcule le ratio énergétique (${ratioEnergetique}) en fonction de la région et de la cote d'efficacité énergétique.

            Elle calcule ensuite loyerIndexéAvantDécret (${loyerIndexéAvantDécret}) en multipliant le loyer initial par l'indice de santé avant le décret et en divisant le résultat par l'indice initial. L'ecartType (${ecartType}) est calculé en soustrayant le loyer initial du loyerIndexéAvantDécret. L'ecartTypeAuProrata (${ecartTypeAuProrata}) est calculé en multipliant l'ecart type par le ratio énergétique.

            Elle trouve ensuite l'indice de santé pour octobre 2021 (${october2021Index}) et calcule le loyer indexé pour octobre 2021 (${loyerIndexéOctobre2O21}) en multipliant le loyer initial par l'indice d'octobre 2021 et en divisant le résultat par l'indice initial.

            Enfin, elle calcule le loyer adapté (${loyerAdapté}) en fonction de la date de début du contrat. Si la date de début du contrat est entre le 1er novembre 2021 et le 31 décembre 2021, le loyer adapté est le loyer initial plus l'écart type au prorata. Sinon, le loyer adapté est le loyer indexé pour octobre 2021 plus l'écart type au prorata.
          
          
          `,
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
        explanation: `Avant décret en Wallonie
        La fonction basicFormula est utilisée pour calculer l'indexation de base du loyer. Elle prend en compte trois paramètres : l'indice initial, le loyer initial et le nouvel indice de santé.

        Voici comment elle fonctionne avec des valeurs dynamiques :

        Supposons que l'indice initial soit de ${initialIndex}, le loyer initial soit de ${initialRent} euros et le nouvel indice de santé soit de ${newHealthIndex}.

        La formule de base pour l'indexation du loyer est calculée en multipliant le loyer initial (${initialRent} euros) par le nouvel indice de santé (${newHealthIndex}) et en divisant le résultat par l'indice initial (${initialIndex}). Cela donne un loyer indexé de ${roundToTwoDecimals(
          basicFormulaWithInitialRentAndIndex(newHealthIndex),
        )} euros.
        `,
      }
    : {
        explanation: `Pendant le décret en Wallonie
        La fonction calculerIndexationLoyerDurantDécretEnWallonie est utilisée pour calculer l'indexation du loyer en Wallonie pendant la période du décret. Elle prend en compte trois paramètres : le loyer indexé de l'année en cours, le loyer indexé de l'année précédente et le ratio d'efficacité énergétique pour la région et la cote d'efficacité énergétique.

        Voici comment elle fonctionne avec des valeurs dynamiques :
        
        Supposons que le loyer indexé de l'année en cours soit de ${currentYearIndexedRent} euros, le loyer indexé de l'année précédente soit de ${previousYearIndexedRent} euros et le ratio d'efficacité énergétique pour la région et la cote d'efficacité énergétique soit de ${
          ENERGY_RATIOS[region].peb[energyEfficiencyRating]
        }.
        
        La fonction calcule l'indexation du loyer en multipliant le loyer indexé de l'année en cours (${currentYearIndexedRent} euros) par le ratio d'efficacité énergétique (${
          ENERGY_RATIOS[region].peb[energyEfficiencyRating]
        }), puis en soustrayant le loyer indexé de l'année précédente (${previousYearIndexedRent} euros). Cela donne un loyer indexé de ${roundToTwoDecimals(
          calculerIndexationLoyerDurantDécretEnWallonie(
            currentYearIndexedRent,
            previousYearIndexedRent,
            ENERGY_RATIOS[region].peb[energyEfficiencyRating],
          ),
        )} euros.
        
        `,
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
