import { calculateYearlyBreakdown } from './calculateYearlyBreakdown';

describe('calculateYearlyBreakdown', () => {
    it('calculates the yearly breakdown of mortgage repayments correctly', () => {
        // Arrange: Set up your input values
        const price = 100000;
        const deposit = 20000;
        const interestRate = 3;
        const term = 25;

        // Act: Perform the actual calculation by calling the function
        const result = calculateYearlyBreakdown(price, deposit, interestRate, term);

        // Expected result with breakdown data for each year
        const expectedBreakdownData = [
            { year: 0, remainingDebt: 80000 },
            { year: 1, remainingDebt: 77817.72746821886 },
            { year: 2, remainingDebt: 75569.07902913753 },
            { year: 3, remainingDebt: 73252.0357960195 },
            { year: 4, remainingDebt: 70864.5174757562 },
            { year: 5, remainingDebt: 68404.38050113358 },
            { year: 6, remainingDebt: 65869.4161062895 },
            { year: 7, remainingDebt: 63257.34834363457 },
            { year: 8, remainingDebt: 60565.83204045556 },
            { year: 9, remainingDebt: 57792.45069336707 },
            { year: 10, remainingDebt: 54934.7142987208 },
            { year: 11, remainingDebt: 51990.0571170248 },
            { year: 12, remainingDebt: 48955.83536936529 },
            { year: 13, remainingDebt: 45829.32486376293 },
            { year: 14, remainingDebt: 42607.71854933255 },
            { year: 15, remainingDebt: 39288.12399605018 },
            { year: 16, remainingDebt: 35867.560797864855 },
            { year: 17, remainingDebt: 32342.95789682359 },
            { year: 18, remainingDebt: 28711.15082580704 },
            { year: 19, remainingDebt: 24968.87886740028 },
            { year: 20, remainingDebt: 21112.78212634799 },
            { year: 21, remainingDebt: 17139.398512965538 },
            { year: 22, remainingDebt: 13045.160634797605 },
            { year: 23, remainingDebt: 8826.392593733666 },
            { year: 24, remainingDebt: 4479.306685704646 },
            { year: 25, remainingDebt: 0 },
        ];

        // Assert: Check the result
        // Assert that the calculated result matches the expected result in terms of length
        expect(result.length).toEqual(expectedBreakdownData.length);

        // Check each entry in the result array
        for (let i = 0; i < result.length; i++) {
            // Assert that the year and remaining debt match expected values
            expect(result[i].year).toEqual(expectedBreakdownData[i].year);
            expect(result[i].remainingDebt).toEqual(expectedBreakdownData[i].remainingDebt);
        }
    });
});
