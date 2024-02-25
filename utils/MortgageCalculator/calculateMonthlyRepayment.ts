/**
 * Calculates the monthly mortgage payment.
 *
 * @param propertyPrice {number} - The price of the property.
 * @param deposit {number} - The deposit amount.
 * @param annualInterestRate {number} - The annual interest rate.
 * @param mortgageTermInYears {number} - The mortgage term in years.
 * @returns {number} The monthly mortgage payment.
 */
export function calculateMonthlyPayment(
    propertyPrice: number,
    deposit: number,
    annualInterestRate: number,
    mortgageTermInYears: number
): number {
  // Calculate the adjusted loan amount (property price minus deposit)
  const adjustedLoanAmount = propertyPrice - deposit;

  // Calculate the monthly interest rate
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  // Calculate the total number of payments over the mortgage term
  const numberOfPayments = mortgageTermInYears * 12;

  // Check if the interest rate is zero to avoid division by zero
  if (monthlyInterestRate === 0) {
    return adjustedLoanAmount / numberOfPayments;
  }

  // Calculate the monthly mortgage payment using the amortization formula
  return (
      (adjustedLoanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
  );
}
