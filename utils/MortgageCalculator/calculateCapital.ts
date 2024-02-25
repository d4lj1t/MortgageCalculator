/**
 * Calculates the capital.
 *
 * @param price {number} - The price of the property.
 * @param deposit {number} - The deposit amount.
 * @returns {number} The Principal amount of the loan - Capital.
 */

export function calculateCapital(
    price: number,
    deposit: number,
): number {
    return price - deposit;
}
