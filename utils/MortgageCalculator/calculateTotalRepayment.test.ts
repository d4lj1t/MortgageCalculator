import { calculateTotalRepayment } from './calculateTotalRepayment';

describe('calculateTotalRepayment', () => {
    // Test case: Calculate total mortgage repayment
    it('calculates the total mortgage repayment correctly', () => {
        // Arrange: Set up input values
        const monthlyRepayment = 1000; // Monthly repayment amount
        const mortgageTerm = 25; // Mortgage term in years

        // Act: Call the function being tested
        const result = calculateTotalRepayment(monthlyRepayment, mortgageTerm);

        // Assert: Check the result against the expected total repayment
        const expectedTotalRepayment = 300000; // Expected total repayment over the mortgage term

        // Assert that the calculated result matches the expected result
        expect(result).toEqual(expectedTotalRepayment);
    });
});
