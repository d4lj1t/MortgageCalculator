import { calculateCapital } from './calculateCapital';

describe('calculateCapital', () => {
    it('calculates the capital correctly', () => {
        // Arrange: Set up input values
        const price = 200000;
        const deposit = 40000;

        // Act: Call the function
        const result = calculateCapital(price, deposit);

        // Assert: Check the result
        const expectedCapital = 160000;

        // Assert that the calculated result matches the expected result
        expect(result).toEqual(expectedCapital);
    });
});
