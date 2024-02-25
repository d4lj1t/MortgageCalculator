/**
 * Parses CSV data to extract the interest rate.
 *
 * @param {string} rawData - The raw CSV data containing interest rate information.
 * @returns {{ InterestRate: number }} - An object with the extracted interest rate.
 * @throws {Error} - Throws an error for invalid CSV format or an invalid interest rate.
 */
export const processDataToGetInterestRate = (rawData: string) => {
    // Split the CSV data into lines
    const lines = rawData.split('\n');

    // Check if there are at least two lines (header and data)
    if (lines.length < 2) {
        throw new Error('Invalid CSV format');
    }

    // Extract the line containing interest rate
    const interestRateLine = lines[1];

    // Split the line to get the interest rate value
    const interestRate = parseFloat(interestRateLine.split(',')[1].trim());

    // Check if the extracted interest rate is a valid number
    if (isNaN(interestRate)) {
        throw new Error('Invalid interest rate');
    }

    // Return an object with the extracted interest rate
    return {
        InterestRate: interestRate,
    };
};
