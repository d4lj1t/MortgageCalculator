/**
 * Calculates the total mortgage repayment.
 *
 * @param monthly {number} - The monthly mortgage repayment.
 * @param term {number} - The mortgage term in years.
 * @returns {number} The total mortgage repayment.
 */

export function calculateTotalRepayment (
    monthly: number,
    term: number,
): number {
    return monthly * 12 * term;
}
