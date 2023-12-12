import { Inputs, Outputs, energyEfficiencyRatios, calculateRentIndexation, } from './rent-increase-formula';

// Describe the test suite
describe('Formula', () => {
  // Describe individual test cases
  it('Test case 1', () => {

    expect(calculateRentIndexation(new Date('1995-12-01'), new Date('1995-11-01'), 1000, new Date('2023-01-01'))).toEqual(1792.89);

  });
  it('Test case 2', () => {

    expect(calculateRentIndexation(new Date('2019-02-01'), new Date('2019-03-01'), 1000, new Date('2023-01-01'))).toEqual(1180.27);

  });
  // Add more test cases as needed
});
