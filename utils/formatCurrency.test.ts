import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  // Test case: Format the given amount with default decimal places
  it('should format the given amount with default decimal places', () => {
    // Arrange: Set up the input amount and expected result
    const amount = 1234.56;
    const expected = '£1,234.56';

    // Act: Perform the formatting by calling the function
    const result = formatCurrency(amount);

    // Assert: Check that the result matches the expected formatted amount
    expect(result).toEqual(expected);
  });

  // Test case: Format the given amount with specified decimal places
  it('should format the given amount with specified decimal places', () => {
    // Arrange: Set up the input amount, specified decimal places, and expected result
    const amount = 1234.5678;
    const decimalPlaces = 3;
    const expected = '£1,234.568';

    // Act: Perform the formatting by calling the function with specified decimal places
    const result = formatCurrency(amount, decimalPlaces);

    // Assert: Check that the result matches the expected formatted amount
    expect(result).toEqual(expected);
  });

  // Test case: Format the given amount with zero decimal places
  it('should format the given amount with zero decimal places', () => {
    // Arrange: Set up the input amount, zero decimal places, and expected result
    const amount = 1234.56;
    const decimalPlaces = 0;
    const expected = '£1,235';

    // Act: Perform the formatting by calling the function with zero decimal places
    const result = formatCurrency(amount, decimalPlaces);

    // Assert: Check that the result matches the expected formatted amount
    expect(result).toEqual(expected);
  });

  // Test case: Format negative amounts correctly
  it('should format negative amounts correctly', () => {
    // Arrange: Set up the input negative amount and expected result
    const amount = -1234.56;
    const expected = '-£1,234.56';

    // Act: Perform the formatting by calling the function
    const result = formatCurrency(amount);

    // Assert: Check that the result matches the expected formatted amount for negative values
    expect(result).toEqual(expected);
  });
});
