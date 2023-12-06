import { Inputs, Outputs, energyEfficiencyRatios, calculateRentIndexation, } from './rent-increase-formula';

// Describe the test suite
describe('Formula', () => {
  // Describe individual test cases
  it('Test case 1', () => {

    expect(calculateRentIndexation('1995-12-01', '1995-11-01', 1000)).toEqual(1792.89);

  });
  it('Test case 2', () => {

    expect(calculateRentIndexation('2019-02-01', '2019-01-01', 1000)).toEqual(1180.27);

  });
  // Add more test cases as needed
});
