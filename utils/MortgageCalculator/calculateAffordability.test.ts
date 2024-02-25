import { calculateAffordability } from './calculateAffordability';

describe('calculateAffordability', () => {
    it('calculates the affordability monthly repayment correctly with a 3% increased interest rate', () => {
        // Arrange: Set up input values
        const price = 200000;
        const deposit = 40000;
        const interestRate = 4; // 4% annual interest rate
        const term = 30; // 30 years mortgage term

        // Act: Call the function
        const result = calculateAffordability(price, deposit, interestRate, term);

        // Assert: Check the result
        const expectedMonthlyRepayment = 1064.48;

        // Assert that the calculated result matches the expected result
        expect(result).toBeCloseTo(expectedMonthlyRepayment, 2);
    });
});
