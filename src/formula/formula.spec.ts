import {
  basicFormula,
  calculateRentIndexation, calculateRentIndexationForBxl,
} from './rent-increase-formula';
import { deriveData, deriveDataWithPEB, findHealthIndex, getAnniversaryMonth, getIndexBaseYear, getInitialIndex, getIsAfterDecree, getYearOfIndexationWithPEB, shouldUsePreviousYear } from './utils';

// Describe the test suite
describe('Formula', () => {
  // Describe individual test cases
  it('Test case 1', () => {

    expect(calculateRentIndexation({
      contractSignatureDate: new Date('1995-12-01'),
      agreementStartDate: new Date('1995-11-01'),
      initialRent: 1000,
      yearOfIndexation: 2023,
      region: 'wallonia',
      energyEfficiencyRating: "A",
    })
    ).toEqual(1786.5);

  });
  // it('Test case 2', () => {

  //   expect(calculateRentIndexation
  //     ({
  //       contractSignatureDate: new Date('2019-02-01'),
  //       agreementStartDate: new Date('2019-03-01'),
  //       initialRent: 1000,
  //       yearOfIndexation: 2023,
  //       region: 'wallonia',
  //       energyEfficiencyRating: "A",
  //     }
  //     )).toEqual(1169.22);

  // });
  it('Test case 3', () => {
    //https://logement.wallonie.be/fr/bail/indexation-loyer
    expect(calculateRentIndexation
      ({
        contractSignatureDate: new Date('2019-09-01'),
        agreementStartDate: new Date('2019-11-01'),
        initialRent: 600,
        yearOfIndexation: 2022,
        region: 'wallonia',
        energyEfficiencyRating: "E",
      }
      )).toEqual(665.24);

  });

  it('Test case 4', () => {
    // https://logement.wallonie.be/fr/bail/indexation-loyer
    const agreementStartDate = new Date('2019-11-01');
    const anniversaryMonth = getAnniversaryMonth(agreementStartDate);
    const indexBaseYear = getIndexBaseYear(agreementStartDate);
    const contractSignatureDate = new Date('2019-09-01');
    const initialRent = 600;
    const initialIndex = getInitialIndex(contractSignatureDate, agreementStartDate, indexBaseYear);
    const basicFormulaWithInitialRentAndIndex = basicFormula(initialIndex, initialRent)
    const { currentYearIndexedRent, previousYearIndexedRent } = deriveDataWithPEB(
      { agreementStartDate, region: 'wallonia', anniversaryMonth, indexBaseYear, basicFormulaWithInitialRentAndIndex })

    expect(previousYearIndexedRent).toBe(626.79);
    expect(currentYearIndexedRent).toBe(703.69);

    expect(calculateRentIndexation
      ({
        contractSignatureDate,
        agreementStartDate,
        initialRent,
        yearOfIndexation: 2022,
        region: 'wallonia',
        energyEfficiencyRating: "D",
      }
      )).toEqual(684.47);

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

    expect(yearOfIndexationWithPEB).toBe(2023);

    const { healthIndexBeforeDecree, newHealthIndex, isRequestedAfterEndOfDecree } = deriveData({ agreementStartDate, contractSignatureDate, yearOfIndexation: 2023, region: 'wallonia' })


    expect(isRequestedAfterEndOfDecree).toBe(true);
    expect(newHealthIndex).toBe(128.30);
    expect(healthIndexBeforeDecree).toBe(127.92);


    expect(calculateRentIndexation
      ({
        contractSignatureDate,
        agreementStartDate,
        initialRent: 600,
        yearOfIndexation: 2023,
        region: 'wallonia',
        energyEfficiencyRating: "D",
      }
      )).toEqual(662.55);




  });
  it('Test case 6', () => {
    // https://logement.wallonie.be/fr/bail/indexation-loyer


    expect(calculateRentIndexation
      ({
        contractSignatureDate: new Date('2021-09-01'),
        agreementStartDate: new Date('2021-11-01'),
        initialRent: 600,
        yearOfIndexation: 2023,
        region: 'wallonia',
        energyEfficiencyRating: "D",
      }
      )).toEqual(662.55);

  });



  it('should be correct when after decree date in wallonia', () => {

    expect(calculateRentIndexation
      ({
        contractSignatureDate: new Date('2021-09-01'),
        agreementStartDate: new Date('2021-11-01'),
        initialRent: 600,
        yearOfIndexation: 2023,
        region: 'wallonia',
        energyEfficiencyRating: "E",
      }
      )).toEqual(642.3);


  });
  it('should be correct when after decree date in brussels', () => {

    expect(calculateRentIndexation
      ({

        contractSignatureDate: new Date('2019-09-01'),
        agreementStartDate: new Date('2019-11-01'),
        initialRent: 550,
        yearOfIndexation: 2023,
        region: 'brussels',
        energyEfficiencyRating: "E",
      }
      )).toEqual(611.62);

    expect(calculateRentIndexation
      ({

        contractSignatureDate: new Date('2019-09-12'),
        agreementStartDate: new Date('2019-12-12'),
        initialRent: 200,
        yearOfIndexation: 2023,
        region: 'brussels',
        energyEfficiencyRating: "E",
      }
      )).toEqual(224.4);

  });

  it('should check whether is after end of decree', () => {
    expect(getIsAfterDecree(2023, 'wallonia', new Date("11-01-2023"))).toBe(true);
    expect(getIsAfterDecree(2023, 'wallonia', new Date("11-01-2030"))).toBe(true);
    expect(getIsAfterDecree(2023, 'wallonia', new Date("10-31-2023"))).toBe(false);
    expect(getIsAfterDecree(2023, 'wallonia', new Date("10-31-2022"))).toBe(false);
  })
});


describe('year of indexation within PEB range', () => {
  it('should return the right year', () => {
    expect(getYearOfIndexationWithPEB(new Date('2022-01-01'), 'wallonia')).toBe(2023);

    expect(getYearOfIndexationWithPEB(new Date('2021-11-01'), 'wallonia')).toBe(2023);

    expect(getYearOfIndexationWithPEB(new Date('2010-01-01'), 'wallonia')).toBe(2023);


    expect(getYearOfIndexationWithPEB(new Date('2010-11-01'), 'wallonia')).toBe(2023);

  })
});
describe('brussels formula', () => {
  describe('calculateRentIndexationForBxl', () => {
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
