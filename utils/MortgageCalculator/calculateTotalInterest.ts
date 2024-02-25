/**
 * Calculates the total interest paid over the mortgage term.
 *
 * @param monthly {number} - The monthly mortgage repayment.
 * @param term {number} - The mortgage term in years.
 * @param price {number} - The price of the property.
 * @param deposit {number} - The deposit amount.
 * @returns {number} The total interest paid over the mortgage term.
 */

export function calculateTotalInterest(
    monthly: number,
    term: number,
    price: number,
    deposit: number,
): number {
    return (monthly * 12 * term) - price - deposit;
}
