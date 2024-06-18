import { get } from 'node:http';
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

  const energyRatio = ENERGY_RATIOS[region].peb[energyEfficiencyRating];

  if (region === 'brussels') {
    return {
      // provide detailed process to obtain the rent
      explanation: `
      À Bruxelles, le loyer indexé est calculé en multipliant le loyer initial (${initialRent} euros) par le nouvel indice de santé (${newHealthIndex}) et en divisant le résultat par l'indice initial (${initialIndex}). Cela donne un loyer indexé.
      
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
        explanation: `
        En Wallonie après fin du décret pour les cotes énérgétiques A, B ou C:
              

        L'indexation du loyer est calculée en multipliant le loyer initial (${initialRent} euros) par le nouvel indice de santé (${newHealthIndex}) et en divisant le résultat par l'indice initial (${initialIndex}). Cela donne un loyer indexé de ${roundToTwoDecimals(
          basicFormulaWithInitialRentAndIndex(newHealthIndex),
        )} euros.
        `,
        rent: basicFormulaWithInitialRentAndIndex(newHealthIndex),
      };
    }

    const agreementMonth = agreementStartDate.toLocaleString('en-US', { month: 'long' });

    const ratioEnergetique = ENERGY_RATIOS[region].peb[energyEfficiencyRating];

    const getLastHealthIndexDateBeforeDecree = () => {
      switch (agreementMonth) {
        case 'February':
          return findHealthIndex(2022, 'January', indexBaseYear);
        case 'March':
          return findHealthIndex(2022, 'February', indexBaseYear);
        case 'April':
          return findHealthIndex(2022, 'March', indexBaseYear);
        case 'May':
          return findHealthIndex(2022, 'April', indexBaseYear);
        case 'June':
          return findHealthIndex(2022, 'May', indexBaseYear);
        case 'July':
          return findHealthIndex(2022, 'June', indexBaseYear);
        case 'August':
          return findHealthIndex(2022, 'July', indexBaseYear);
        case 'September':
          return findHealthIndex(2022, 'August', indexBaseYear);
        case 'October':
          return findHealthIndex(2022, 'September', indexBaseYear);
        case 'November':
          return findHealthIndex(2021, 'October', indexBaseYear);
        case 'December':
          return findHealthIndex(2021, 'November', indexBaseYear);
        case 'January':
          return findHealthIndex(2021, 'December', indexBaseYear);
      }
    };

    const index =
      agreementStartDate < new Date(Date.UTC(2021, 10, 1))
        ? getLastHealthIndexDateBeforeDecree()
        : findHealthIndex(yearOfIndexation - 1, anniversaryMonth, indexBaseYear);

    const loyerIndexéAvantDécret = (initialRent / initialIndex) * index;

    const ecartType = loyerIndexéAvantDécret - initialRent;

    const ecartTypeAuProrata = ecartType * ratioEnergetique;

    const lastHealthIndexBeforeDecree = getLastHealthIndexDateBeforeDecree();

    const dernierLoyerIndexéAvantDécret = () =>
      (initialRent / initialIndex) * lastHealthIndexBeforeDecree;

    const loyerAdapté = () => {
      if (
        agreementStartDate >= new Date(Date.UTC(2021, 10, 1)) &&
        agreementStartDate <= new Date(Date.UTC(2022, 11, 31))
      ) {
        const loyerAdaptéPendantDécret = initialRent + ecartTypeAuProrata;

        return (
          (loyerAdaptéPendantDécret * newHealthIndex) /
          findHealthIndex(yearOfIndexation - 1, anniversaryMonth, indexBaseYear)
        );
      }
      if (agreementStartDate < new Date(Date.UTC(2021, 10, 1))) {
        const loyerAdaptéPEBAprèsDécret = loyerIndexéAvantDécret + ecartTypeAuProrata;

        const previousHealthIndex = findHealthIndex(
          yearOfIndexation - 1,
          anniversaryMonth,
          indexBaseYear,
        );
        const loyerAdapté = ['November', 'December'].includes(agreementMonth)
          ? (loyerAdaptéPEBAprèsDécret * newHealthIndex) / previousHealthIndex
          : loyerAdaptéPEBAprèsDécret;

        return loyerAdapté;
      }
      return dernierLoyerIndexéAvantDécret() + ecartTypeAuProrata;
    };

    if (!['November', 'December'].includes(agreementMonth)) {
      return {
        explanation: `En Wallonie, après le décret et pour une cote d'efficacité énergétique de D, E, F, G ou aucune cote d'efficacité énergétique sélectionnée.:
    
            La formule pour ce cas de figure commence par déterminer le mois de la date d'entrée en vigueur (${agreementStartDate.toLocaleString(
              'fr-FR',
              { month: 'long' },
            )}).

            Ensuite, elle calcule le ratio énergétique (${ratioEnergetique}) en fonction de la région et de la cote d'efficacité énergétique.

            Elle calcule ensuite le loyer indexé avant décret (${roundToTwoDecimals(
              loyerIndexéAvantDécret,
            )}) en multipliant le loyer initial par l'indice de santé avant le décret et en divisant le résultat par l'indice initial. L'écart type (${roundToTwoDecimals(
              ecartType,
            )}) est calculé en soustrayant le loyer initial du loyer indexé avant décret. L'écart type au prorata (${roundToTwoDecimals(
              ecartTypeAuProrata,
            )}) est calculé en multipliant l'ecart type par le ratio énergétique.

            Elle trouve ensuite l'indice de santé pour octobre 2021 (${roundToTwoDecimals(
              lastHealthIndexBeforeDecree,
            )}) et calcule le loyer indexé pour octobre 2021 (${roundToTwoDecimals(
              dernierLoyerIndexéAvantDécret(),
            )}) en multipliant le loyer initial par l'indice d'octobre 2021 et en divisant le résultat par l'indice initial.

            Enfin, elle calcule le loyer adapté (${roundToTwoDecimals(
              loyerAdapté(),
            )}) en fonction de la date de début du contrat. Si la date de début du contrat est entre le 1er novembre 2021 et le 31 décembre 2021, le loyer adapté est le loyer initial plus l'écart type au prorata. Sinon, le loyer adapté est le loyer indexé pour octobre 2021 plus l'écart type au prorata.

          `,
        rent: roundToTwoDecimals(loyerAdapté()),
      };
    }

    return {
      explanation: `
      Après décret en Wallonie, pour novembre ou décembre, avec un cote énergétique D ou pire.
      
            La formule pour ce cas de figure commence par déterminer le mois de la date d'entrée en vigueur (${agreementStartDate.toLocaleString(
              'fr-FR',
              { month: 'long' },
            )}).

            Ensuite, elle calcule le ratio énergétique (${ratioEnergetique}) en fonction de la région et de la cote d'efficacité énergétique.

            Elle calcule ensuite le loyer indexé avant décret (${roundToTwoDecimals(
              loyerIndexéAvantDécret,
            )}) en multipliant le loyer initial par l'indice de santé avant le décret et en divisant le résultat par l'indice initial. L'écart type (${roundToTwoDecimals(
              ecartType,
            )}) est calculé en soustrayant le loyer initial du loyer indexé avant décret. L'écart type au prorata (${roundToTwoDecimals(
              ecartTypeAuProrata,
            )}) est calculé en multipliant l'ecart type par le ratio énergétique.

            Elle trouve ensuite l'indice de santé pour octobre 2021 (${roundToTwoDecimals(
              lastHealthIndexBeforeDecree,
            )}) et calcule le loyer indexé pour octobre 2021 (${roundToTwoDecimals(
              dernierLoyerIndexéAvantDécret(),
            )}) en multipliant le loyer initial par l'indice d'octobre 2021 et en divisant le résultat par l'indice initial.

            Elle calcule ensuite le loyer adapté (${roundToTwoDecimals(
              loyerAdapté(),
            )}) en fonction de la date de début du contrat. Si la date de début du contrat est entre le 1er novembre 2021 et le 31 décembre 2021, le loyer adapté est le loyer initial plus l'écart type au prorata. Sinon, le loyer adapté est le loyer indexé pour octobre 2021 plus l'écart type au prorata.
      
            Et finalement elle multiplie le loyer adapté ${roundToTwoDecimals(
              loyerAdapté(),
            )} par l'indice de santé actuel ${roundToTwoDecimals(
              newHealthIndex,
            )}, divisé par l'indice de santé avant le décret ${roundToTwoDecimals(
              healthIndexBeforeDecree,
            )}.


          `,

      rent: roundToTwoDecimals(loyerAdapté()),
    };
  }

  return wasIndexationRequestedBeforeStartOfEnergyRatingDecree
    ? {
        rent: roundToTwoDecimals(basicFormulaWithInitialRentAndIndex(newHealthIndex)),
        explanation: `Avant décret en Wallonie

        L'indexation du loyer est calculée en multipliant le loyer initial (${roundToTwoDecimals(
          initialRent,
        )} euros) par le nouvel indice de santé (${roundToTwoDecimals(
          newHealthIndex,
        )}) et en divisant le résultat par l'indice initial (${roundToTwoDecimals(
          initialIndex,
        )}). Cela donne un loyer indexé de ${roundToTwoDecimals(
          basicFormulaWithInitialRentAndIndex(newHealthIndex),
        )} euros.
        `,
      }
    : {
        explanation: `Pendant le décret en Wallonie
    
        L'indexation du loyer est calculée en multipliant le loyer indexé de l'année en cours (${currentYearIndexedRent} euros) par le ratio d'efficacité énergétique (${
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
