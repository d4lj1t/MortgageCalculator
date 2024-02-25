/**
 * Calculates the yearly breakdown of mortgage repayments.
 *
 * @param {number} price - The price of the property.
 * @param {number} deposit - The deposit amount.
 * @param {number} interestRate - The annual interest rate.
 * @param {number} term - The mortgage term in years.
 * @returns {Array<{ year: number, remainingDebt: number }>} An array containing objects representing the yearly breakdown of mortgage repayments.
 * Each object includes the year and the remaining debt at the end of that year.
 */
export const calculateYearlyBreakdown = (
    price: number,
    deposit: number,
    interestRate: number,
    term: number,
): Array<{ year: number, remainingDebt: number }> => {
    // Array to store the breakdown data for each year
    const breakdownData = [];

    // Initial remaining debt is the property price minus the deposit
    let remainingDebt = price - deposit;

    // Convert annual interest rate to a monthly interest rate
    const annualInterestRate = interestRate / 100;
    const monthlyInterestRate = annualInterestRate / 12;

    // Calculate the total number of payments over the mortgage term
    const numberOfPayments = term * 12;

    // Loop through each year to calculate the breakdown
    for (let year = 0; year < term; year++) {
        // Calculate the monthly mortgage payment using the formula for an amortizing loan
        const monthlyPayment =
            (remainingDebt * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        let remainingDebtInYear = remainingDebt;

        // Calculate the remaining debt for each month within the current year
        for (let month = 1; month <= year * 12; month++) {
            // Calculate the interest and principal components of the monthly payment
            const interest = remainingDebtInYear * monthlyInterestRate;
            const principal = monthlyPayment - interest;

            // Update the remaining debt for the current year
            remainingDebtInYear -= principal;
        }

        // Store the year and remaining debt in the breakdownData array
        breakdownData.push({
            year,
            remainingDebt: remainingDebtInYear,
        });
    }

    // Add the final year with remaining debt as 0
    breakdownData.push({
        year: term,
        remainingDebt: 0,
    });

    // Return the array containing the yearly breakdown data
    return breakdownData;
};
