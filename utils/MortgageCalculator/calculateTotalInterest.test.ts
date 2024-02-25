import { calculateTotalInterest } from './calculateTotalInterest';

describe('calculateTotalInterest', () => {
    it('calculates the total interest correctly', () => {
        // Arrange: Set up input values
        const monthlyRepayment = 1000;
        const mortgageTerm = 25;
        const propertyPrice = 200000;
        const deposit = 40000;

        // Act: Call the function
        const result = calculateTotalInterest(monthlyRepayment, mortgageTerm, propertyPrice, deposit);

        // Assert: Check the result
        const expectedTotalInterest = 60000;

        // Assert that the calculated result matches the expected result
        expect(result).toEqual(expectedTotalInterest);
    });
});
