import * as data from './health-index.json';
const word = data.name;
console.log(word); // output 'testing'
type Inputs = {
  energyEfficiencyRating: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'none';
  contractSignatureDate: Date;
  rentStartDate: Date;
  originalRentAmount: number;
  yearOfIncrease: number;
  currentHealthIndex: number;
  originalHealthIndex: number;
}

const energyEfficiencyRatios: Record<Inputs["energyEfficiencyRating"], number> = {
  A: 0.8,
  B: 0.9,
  C: 1,
  D: 1.1,
  E: 1.2,
  F: 1.3,
  G: 1.4,
  none: 1
}

type Outputs = {
  rentIncrease: number;
  increasedRentAmount: number;
  increasePercentage: number
}

function calculateAuthorizedRentIncrease(
  currentRent: number,
  certificatePEB: string,
  previousRentIndex: number,
  currentRentIndex: number,
  anniversaryDate: Date
): number {
  // Ensure that the current rent index is greater than the previous index
  if (currentRentIndex <= previousRentIndex) {
    throw new Error("Invalid rent indices provided.");
  }

  // Check if the anniversary date falls within the temporary measure period
  const temporaryMeasureStartDate = new Date("2022-11-01");
  const temporaryMeasureEndDate = new Date("2023-10-31");

  if (anniversaryDate >= temporaryMeasureStartDate && anniversaryDate <= temporaryMeasureEndDate) {
    // Temporary measure is applicable, apply exception
    return currentRent;
  }

  // Calculate the difference in indices
  const indexDifference = currentRentIndex - previousRentIndex;

  // Define the percentage limits for different certificate PEB categories
  let percentageLimit: number;
  switch (certificatePEB.toUpperCase()) {
    case "A":
    case "B":
    case "C":
      percentageLimit = 100; // 100% allowed increase
      break;
    case "D":
      percentageLimit = 75; // 75% allowed increase
      break;
    case "E":
      percentageLimit = 50; // 50% allowed increase
      break;
    case "F":
    case "G":
    case "none":
      percentageLimit = 0; // 0% allowed increase
      break;
    default:
      throw new Error("Invalid certificate PEB category.");
  }

  // Calculate the authorized rent increase
  const authorizedIncrease = (currentRent * indexDifference * percentageLimit) / 100;

  // Calculate the new rent
  const newRent = currentRent + authorizedIncrease;

  return newRent;
}

// Example usage:
const currentRent = 600; // Replace with the actual current rent amount
const certificatePEB = "D"; // Replace with the actual certificate PEB category
const previousRentIndex = 626.79; // Replace with the actual previous rent index
const currentRentIndex = 703.69; // Replace with the actual current rent index
const anniversaryDate = new Date("2022-11-15"); // Replace with the actual anniversary date

const newRent = calculateAuthorizedRentIncrease(
  currentRent,
  certificatePEB,
  previousRentIndex,
  currentRentIndex,
  anniversaryDate
);

console.log(`Current Rent: ${currentRent} euros`);
console.log(`Certificate PEB: ${certificatePEB}`);
console.log(`Previous Rent Index: ${previousRentIndex}`);
console.log(`Current Rent Index: ${currentRentIndex}`);
console.log(`Anniversary Date: ${anniversaryDate.toDateString()}`);
console.log(`Authorized Rent Increase: ${newRent.toFixed(2)} euros`);