/**
 * Affordability Calculator Module
 * This module provides functions for calculating mortgage affordability.
 */

import { calculateMonthlyPayment } from "@/utils/MortgageCalculator/calculateMonthlyRepayment";

/**
 * Calculates the affordability monthly repayment if interest rate increases by 3%.
 *
 * @param {number} price - The price of the property.
 * @param {number} deposit - The deposit amount.
 * @param {number} interestRate - The annual interest rate.
 * @param {number} term - The mortgage term in years.
 * @returns {number} The monthly affordability repayment if interest rate increases by 3%.
 */
export function calculateAffordability(
    price: number,
    deposit: number,
    interestRate: number,
    term: number,
): number {
    return calculateMonthlyPayment(price, deposit, interestRate + 3, term);
}
