import {
  basicFormula,
  calculateRentIndexation,
  calculateRentIndexationForBxl,
} from './rent-increase-formula';
import { EnergyEfficiencyRating, Regions } from './types-and-constants';
import {
  deriveData,
  deriveDataWithPEB,
  getAnniversaryMonth,
  getIndexBaseYear,
  getInitialIndex,
  getIsAfterDecree,
  getYearOfIndexationWithPEB,
  shouldUsePreviousYear,
} from './utils';

// Describe the test suite
describe('Formula', () => {
  it('From Nov 1st 2023 in Wallonia, right after end of decree', () => {
    //FIXTURES
    const contractSignatureDate: Date = new Date('2018-11-01');
    const agreementStartDate: Date = new Date('2018-11-01');
    const initialRent: number = 575;
    const region: Regions = 'wallonia';
    const yearOfIndexation: number = 2023;
    const energyEfficiencyRating: EnergyEfficiencyRating = 'G';

    //DERIVED FIXTURES
    const {
      indexBaseYear,
      anniversaryMonth,
      initialIndex,
      newHealthIndex,
      isRequestedAfterEndOfDecree,
      wasIndexationRequestedBeforeStartOfEnergyRatingDecree,
      healthIndexBeforeDecree,
    } = deriveData({ agreementStartDate, contractSignatureDate, yearOfIndexation, region });

    const { currentYearIndexedRent, previousYearIndexedRent } = deriveDataWithPEB({
      agreementStartDate,
      region,
      anniversaryMonth,
      indexBaseYear,
      basicFormulaWithInitialRentAndIndex: basicFormula(initialIndex, initialRent),
    });
    const yearOfIndexationWithPEB = getYearOfIndexationWithPEB(agreementStartDate, 'wallonia');

    //ASSERTIONS
    expect(isRequestedAfterEndOfDecree).toBe(true);
    expect(anniversaryMonth).toBe('October');
    expect(yearOfIndexationWithPEB).toBe(2022);
    expect(newHealthIndex).toBe(128.3);
    expect(initialIndex).toBe(108.26);
    expect(healthIndexBeforeDecree).toBe(127.92);
    expect(previousYearIndexedRent).toBe(605.17);

    expect(
      calculateRentIndexation({
        contractSignatureDate,
        agreementStartDate,
        initialRent,
        region,
        yearOfIndexation,
        energyEfficiencyRating,
      }).rent,
    ).toEqual(606.97);
  });

  it('Test case Liège Mont de piété modifié 2022', () => {
    const agreementStartDate = new Date('2022-02-01');
    const anniversaryMonth = getAnniversaryMonth(agreementStartDate);
    expect(anniversaryMonth).toBe('January');

    const indexBaseYear = getIndexBaseYear(agreementStartDate);
    const contractSignatureDate = new Date('2022-02-01');
    const initialRent = 500;
    const initialIndex = getInitialIndex(contractSignatureDate, agreementStartDate, indexBaseYear);
    const basicFormulaWithInitialRentAndIndex = basicFormula(initialIndex, initialRent);
    const { currentYearIndexedRent, previousYearIndexedRent } = deriveDataWithPEB({
      agreementStartDate,
      region: 'wallonia',
      anniversaryMonth,
      indexBaseYear,
      basicFormulaWithInitialRentAndIndex,
    });

    expect(previousYearIndexedRent).toBe(500);
    expect(currentYearIndexedRent).toBe(541.41);

    expect(
      calculateRentIndexation({
        contractSignatureDate,
        agreementStartDate,
        initialRent: initialRent,
        yearOfIndexation: 2024,
        region: 'wallonia',
        energyEfficiencyRating: 'G',
      }).rent,
    ).toEqual(508.55);
  });

  it('Test case Liège Mont de piété', () => {
    const agreementStartDate = new Date('2020-02-01');
    const contractSignatureDate = new Date('2020-02-01');
    const anniversaryMonth = getAnniversaryMonth(agreementStartDate);
    expect(anniversaryMonth).toBe('January');

    const indexBaseYear = getIndexBaseYear(agreementStartDate);
    const initialRent = 500;
    const initialIndex = getInitialIndex(contractSignatureDate, agreementStartDate, indexBaseYear);
    const basicFormulaWithInitialRentAndIndex = basicFormula(initialIndex, initialRent);
    const { currentYearIndexedRent, previousYearIndexedRent } = deriveDataWithPEB({
      agreementStartDate,
      region: 'wallonia',
      anniversaryMonth,
      indexBaseYear,
      basicFormulaWithInitialRentAndIndex,
    });

    // expect(previousYearIndexedRent).toBe(818.06);
    // expect(currentYearIndexedRent).toBe(885.81);

    expect(
      calculateRentIndexation({
        contractSignatureDate,
        agreementStartDate,
        initialRent: 500,
        yearOfIndexation: 2024,
        region: 'wallonia',
        energyEfficiencyRating: 'G',
      }).rent,
    ).toEqual(538.69);
  });
  it('Test case O', () => {
    const agreementStartDate = new Date('2022-02-17');
    const anniversaryMonth = getAnniversaryMonth(agreementStartDate);
    expect(anniversaryMonth).toBe('January');

    const indexBaseYear = getIndexBaseYear(agreementStartDate);
    const contractSignatureDate = new Date('2022-01-01');
    const initialRent = 800;
    const initialIndex = getInitialIndex(contractSignatureDate, agreementStartDate, indexBaseYear);
    const basicFormulaWithInitialRentAndIndex = basicFormula(initialIndex, initialRent);
    const { currentYearIndexedRent, previousYearIndexedRent } = deriveDataWithPEB({
      agreementStartDate,
      region: 'wallonia',
      anniversaryMonth,
      indexBaseYear,
      basicFormulaWithInitialRentAndIndex,
    });

    expect(previousYearIndexedRent).toBe(818.06);
    expect(currentYearIndexedRent).toBe(885.81);

    expect(
      calculateRentIndexation({
        contractSignatureDate,
        agreementStartDate,
        initialRent: 800,
        yearOfIndexation: 2023,
        region: 'wallonia',
        energyEfficiencyRating: 'A',
      }).rent,
    ).toEqual(885.81);
  });

  // Describe individual test cases
  it('Test case 1', () => {
    expect(
      calculateRentIndexation({
        contractSignatureDate: new Date('1995-11-01'),
        agreementStartDate: new Date('1995-11-01'),
        initialRent: 1000,
        yearOfIndexation: 2023,
        region: 'wallonia',
        energyEfficiencyRating: 'A',
      }).rent,
    ).toEqual(1789.36);
  });

  it('Test case 3', () => {
    //https://logement.wallonie.be/fr/bail/indexation-loyer
    //FIXTURES
    const contractSignatureDate: Date = new Date('2019-09-01');
    const agreementStartDate: Date = new Date('2019-11-01');
    const initialRent: number = 600;
    const region: Regions = 'wallonia';
    const yearOfIndexation: number = 2022;
    const energyEfficiencyRating: EnergyEfficiencyRating = 'E';

    //DERIVED FIXTURES
    const anniversaryMonth = getAnniversaryMonth(agreementStartDate);
    const indexBaseYear = getIndexBaseYear(agreementStartDate);
    const initialIndex = getInitialIndex(contractSignatureDate, agreementStartDate, indexBaseYear);
    const { currentYearIndexedRent, previousYearIndexedRent } = deriveDataWithPEB({
      agreementStartDate,
      region,
      anniversaryMonth,
      indexBaseYear,
      basicFormulaWithInitialRentAndIndex: basicFormula(initialIndex, initialRent),
    });
    const yearOfIndexationWithPEB = getYearOfIndexationWithPEB(agreementStartDate, 'wallonia');

    //ASSERTIONS
    expect(anniversaryMonth).toBe('October');
    expect(yearOfIndexationWithPEB).toBe(2022);
    expect(previousYearIndexedRent).toBe(626.79);
    expect(currentYearIndexedRent).toBe(703.69);
    expect(
      calculateRentIndexation({
        contractSignatureDate,
        agreementStartDate,
        initialRent,
        region,
        yearOfIndexation,
        energyEfficiencyRating,
      }).rent,
    ).toEqual(665.24);
  });

  it('Test case 4', () => {
    // https://logement.wallonie.be/fr/bail/indexation-loyer
    const agreementStartDate = new Date('2019-11-01');
    const anniversaryMonth = getAnniversaryMonth(agreementStartDate);
    const indexBaseYear = getIndexBaseYear(agreementStartDate);
    const contractSignatureDate = new Date('2019-09-01');
    const initialRent = 600;
    const initialIndex = getInitialIndex(contractSignatureDate, agreementStartDate, indexBaseYear);
    const basicFormulaWithInitialRentAndIndex = basicFormula(initialIndex, initialRent);
    const { currentYearIndexedRent, previousYearIndexedRent } = deriveDataWithPEB({
      agreementStartDate,
      region: 'wallonia',
      anniversaryMonth,
      indexBaseYear,
      basicFormulaWithInitialRentAndIndex,
    });

    expect(previousYearIndexedRent).toBe(626.79);
    expect(currentYearIndexedRent).toBe(703.69);

    expect(
      calculateRentIndexation({
        contractSignatureDate,
        agreementStartDate,
        initialRent,
        yearOfIndexation: 2022,
        region: 'wallonia',
        energyEfficiencyRating: 'D',
      }).rent,
    ).toEqual(684.47);
  });
  it('Test case 5', () => {
    // https://logement.wallonie.be/fr/bail/indexation-loyer
    const contractSignatureDate = new Date('2021-09-01');
    const agreementStartDate = new Date('2021-11-01');
    const anniversaryMonth = getAnniversaryMonth(agreementStartDate);
    expect(anniversaryMonth).toBe('October');
    const indexBaseYear = getIndexBaseYear(agreementStartDate);
    expect(indexBaseYear).toBe(2013);

    const initialIndex = getInitialIndex(contractSignatureDate, agreementStartDate, indexBaseYear);

    expect(initialIndex).toBe(112.74);

    const usePreviousYear = shouldUsePreviousYear(anniversaryMonth);

    expect(usePreviousYear).toBe(false);

    const yearOfIndexationWithPEB = getYearOfIndexationWithPEB(agreementStartDate, 'wallonia');

    expect(yearOfIndexationWithPEB).toBe(2022);

    const { healthIndexBeforeDecree, newHealthIndex, isRequestedAfterEndOfDecree } = deriveData({
      agreementStartDate,
      contractSignatureDate,
      yearOfIndexation: 2023,
      region: 'wallonia',
    });

    const { previousYearIndexedRent, currentYearIndexedRent } = deriveDataWithPEB({
      agreementStartDate,
      region: 'wallonia',
      anniversaryMonth,
      indexBaseYear,
      basicFormulaWithInitialRentAndIndex: basicFormula(initialIndex, 600),
    });

    // expect(previousYearIndexedRent).toBe(660.59);
    expect(isRequestedAfterEndOfDecree).toBe(true);
    expect(newHealthIndex).toBe(128.3);
    expect(healthIndexBeforeDecree).toBe(127.92);

    expect(
      calculateRentIndexation({
        contractSignatureDate,
        agreementStartDate,
        initialRent: 600,
        yearOfIndexation: 2023,
        region: 'wallonia',
        energyEfficiencyRating: 'D',
      }).rent,
    ).toEqual(662.55);
  });
  it('Test case 6', () => {
    // https://logement.wallonie.be/fr/bail/indexation-loyer

    expect(
      calculateRentIndexation({
        contractSignatureDate: new Date('2021-09-01'),
        agreementStartDate: new Date('2021-11-01'),
        initialRent: 600,
        yearOfIndexation: 2023,
        region: 'wallonia',
        energyEfficiencyRating: 'D',
      }).rent,
    ).toEqual(662.55);
  });
  it('Test case 7', () => {
    // https://logement.wallonie.be/fr/bail/indexation-loyer

    expect(
      calculateRentIndexation({
        contractSignatureDate: new Date('2023-01-01'),
        agreementStartDate: new Date('2023-01-01'),
        initialRent: 700,
        yearOfIndexation: 2024,
        region: 'wallonia',
        energyEfficiencyRating: 'G',
      }).rent,
    ).toEqual(708.98);
  });
  it('Test case bxl logement', () => {
    expect(
      calculateRentIndexation({
        contractSignatureDate: new Date('2022-01-01'),
        agreementStartDate: new Date('2022-11-01'),
        initialRent: 850,
        yearOfIndexation: 2024,
        region: 'brussels',
        energyEfficiencyRating: 'E',
      }).rent,
    ).toEqual(708.98);
  });

  it('should be correct when after decree date in wallonia', () => {
    expect(
      calculateRentIndexation({
        contractSignatureDate: new Date('2021-09-01'),
        agreementStartDate: new Date('2021-11-01'),
        initialRent: 600,
        yearOfIndexation: 2023,
        region: 'wallonia',
        energyEfficiencyRating: 'E',
      }).rent,
    ).toEqual(642.3);
  });
  it('should be correct when after decree date in brussels', () => {
    expect(
      calculateRentIndexation({
        contractSignatureDate: new Date('2019-09-01'),
        agreementStartDate: new Date('2019-11-01'),
        initialRent: 550,
        yearOfIndexation: 2023,
        region: 'brussels',
        energyEfficiencyRating: 'E',
      }).rent,
    ).toEqual(611.62);

    expect(
      calculateRentIndexation({
        contractSignatureDate: new Date('2019-09-12'),
        agreementStartDate: new Date('2019-12-12'),
        initialRent: 200,
        yearOfIndexation: 2023,
        region: 'brussels',
        energyEfficiencyRating: 'E',
      }).rent,
    ).toEqual(224.4);
  });

  it('should be correct during decree date in brussels', () => {
    const contractSignatureDate = new Date('2022-12-20');
    const agreementStartDate = new Date('2022-12-20');
    const initialRent = 600;
    const yearOfIndexation = 2023;
    const region = 'brussels';
    const energyEfficiencyRating = 'F';
    expect(
      calculateRentIndexation({
        contractSignatureDate,
        agreementStartDate,
        initialRent,
        yearOfIndexation,
        region,
        energyEfficiencyRating,
      }).rent,
    ).toBe(605.23);
  });

  it('should check whether is after end of decree', () => {
    expect(getIsAfterDecree(2023, 'wallonia', new Date('11-01-2023'))).toBe(true);
    expect(getIsAfterDecree(2023, 'wallonia', new Date('11-01-2030'))).toBe(true);
    expect(getIsAfterDecree(2023, 'wallonia', new Date('10-31-2023'))).toBe(false);
    expect(getIsAfterDecree(2023, 'wallonia', new Date('11-01-2023'))).toBe(true);
    expect(getIsAfterDecree(2023, 'wallonia', new Date('10-31-2022'))).toBe(false);
    expect(getIsAfterDecree(2023, 'wallonia', new Date('10-31-2022'))).toBe(false);
  });
});

describe('year of indexation within PEB range', () => {
  it('should return the right year', () => {
    expect(getYearOfIndexationWithPEB(new Date('2022-01-01'), 'wallonia')).toBe(2023);

    expect(getYearOfIndexationWithPEB(new Date('2021-11-01'), 'wallonia')).toBe(2022);

    expect(getYearOfIndexationWithPEB(new Date('2010-01-01'), 'wallonia')).toBe(2023);

    expect(getYearOfIndexationWithPEB(new Date('2010-11-01'), 'wallonia')).toBe(2022);
  });
});
describe('brussels formula', () => {
  describe('for bx', () => {
    it('should return the original rent when category is A', () => {
      const result = calculateRentIndexationForBxl(1000, 100, 100, 'A', new Date('2022-01-01'));
      expect(result).toBe(1000);
    });

    it('should return the original rent when category is B', () => {
      const result = calculateRentIndexationForBxl(1000, 100, 100, 'B', new Date('2022-01-01'));
      expect(result).toBe(1000);
    });

    it('should calculate the rent indexation correctly', () => {
      const result = calculateRentIndexationForBxl(1000, 100, 101, 'G', new Date('2022-01-01'));
      // Perform the necessary calculations here
      expect(result).toBe(912.94080891);
    });

    // Add more tests as needed
  });
});
