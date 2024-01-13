export const BASE_YEARS = [
  1988,
  1996,
  2004,
  2013,
] as const;

export type Regions = 'wallonia' | 'flanders' | 'brussels';

export const ENERGY_RATIOS: Record<Regions, { start: Date, end: Date, peb: Record<EnergyEfficiencyRating, number> }> = {
  wallonia: {
    start: new Date('2022-11-01'),
    end: new Date('2023-10-31'),
    peb: {
      A: 1,
      B: 1,
      C: 1,
      D: .75,
      E: .5,
      F: 0,
      G: 0,
      none: 0
    }
  },
  flanders: {
    start: new Date('2022-10-01'),
    end: new Date('2023-09-30'),
    peb: {
      A: 1,
      B: 1,
      C: 1,
      D: .5,
      E: 0,
      F: 0,
      G: 0,
      none: 0
    }
  },
  brussels: {
    start: new Date('2022-10-14'),
    end: new Date('2023-10-13'),
    peb: {
      A: 1,
      B: 1,
      C: 1,
      D: 1,
      E: .5,
      F: 0,
      G: 0,
      none: 0
    }
  },
};

export const energyEfficiencyRatings = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'none'] as const

export type EnergyEfficiencyRating = typeof energyEfficiencyRatings[number]