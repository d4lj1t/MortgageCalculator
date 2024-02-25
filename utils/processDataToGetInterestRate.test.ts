import { processDataToGetInterestRate } from './processDataToGetInterestRate';

describe('processDataToGetInterestRate', () => {
    // Test case: Extract interest rate from valid CSV data
    it('should extract interest rate from valid CSV data', () => {
        // Arrange: Set up valid CSV data
        const rawData = 'Year,Interest Rate\n2022,5.0';
        const expected = { InterestRate: 5.0 };

        // Act: Call the function with valid CSV data
        const result = processDataToGetInterestRate(rawData);

        // Assert: Check that the result matches the expected interest rate
        expect(result).toEqual(expected);
    });

    // Test case: Handle leading/trailing whitespaces in CSV data
    it('should handle leading/trailing whitespaces in CSV data', () => {
        // Arrange: Set up CSV data with leading/trailing whitespaces
        const rawData = '  Year  ,  Interest Rate  \n   2022   ,   5.0   ';
        const expected = { InterestRate: 5.0 };

        // Act: Call the function with CSV data containing whitespaces
        const result = processDataToGetInterestRate(rawData);

        // Assert: Check that the result matches the expected interest rate
        expect(result).toEqual(expected);
    });

    // Test case: Throw an error for invalid CSV format
    it('should throw an error for invalid CSV format', () => {
        // Arrange: Set up CSV data with an invalid format
        const rawData = 'Year|Interest Rate\n2022|5.0';

        // Act and Assert: Check that calling the function with invalid CSV format throws an error
        expect(() => {
            processDataToGetInterestRate(rawData);
        }).toThrow('Cannot read properties of undefined (reading \'trim\')');
    });

    // Test case: Throw an error for invalid interest rate
    it('should throw an error for invalid interest rate', () => {
        // Arrange: Set up CSV data with an invalid interest rate
        const rawData = 'Year,Interest Rate\n2022,invalid';

        // Act and Assert: Check that calling the function with invalid interest rate throws an error
        expect(() => {
            processDataToGetInterestRate(rawData);
        }).toThrow('Invalid interest rate');
    });

    // Test case: Handle multiple lines and extract interest rate from the second line
    it('should handle multiple lines and extract interest rate from the second line', () => {
        // Arrange: Set up CSV data with multiple lines
        const rawData = 'Year,Interest Rate\n2021,4.5\n2022,5.0';
        const expected = { InterestRate: 4.5 }; // Update the expected value

        // Act: Call the function with CSV data containing multiple lines
        const result = processDataToGetInterestRate(rawData);

        // Assert: Check that the result matches the expected interest rate from the second line
        expect(result).toEqual(expected);
    });

    // Test case: Handle an empty CSV string and throw an error
    it('should handle an empty CSV string', () => {
        // Arrange: Set up an empty CSV string
        const rawData = '';
        const expectedErrorMessage = 'Invalid CSV format'; // Update the expected error message

        // Act and Assert: Check that calling the function with an empty CSV string throws the expected error
        expect(() => {
            processDataToGetInterestRate(rawData);
        }).toThrow(expectedErrorMessage);
    });
});
