import { calculateRentIndexation, getIsAfterDecree, getYearOfIndexationWithPEB, } from './rent-increase-formula';

// Describe the test suite
describe('Formula', () => {
  // Describe individual test cases
  it('Test case 1', () => {

    expect(calculateRentIndexation(new Date('1995-12-01'), new Date('1995-11-01'), 1000, 2023, 'wallonia', "A")).toEqual(1792.89);

  });
  it('Test case 2', () => {

    expect(calculateRentIndexation(new Date('2019-02-01'), new Date('2019-03-01'), 1000, 2023, 'wallonia', "A")).toEqual(1180.27);

  });
  it('should be correct when after decree date', () => {

    expect(calculateRentIndexation(new Date('2019-09-01'), new Date('2019-11-01'), 550, 2023, 'wallonia', "E")).toEqual(611.61);
    expect(calculateRentIndexation(new Date('2019-09-12'), new Date('2019-12-12'), 200, 2023, 'wallonia', "E")).toEqual(224.4);

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


    expect(getYearOfIndexationWithPEB(new Date('2010-01-01'), 'wallonia')).toBe(2023);


    expect(getYearOfIndexationWithPEB(new Date('2010-11-01'), 'wallonia')).toBe(2022);

  })
});
