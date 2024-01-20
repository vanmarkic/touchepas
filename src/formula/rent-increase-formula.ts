import { ENERGY_RATIOS, RentIndexationArguments } from './types-and-constants';
import { roundToTwoDecimals, deriveData, deriveDataWithPEB, findHealthIndex, shouldUsePreviousYear } from './utils';

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

