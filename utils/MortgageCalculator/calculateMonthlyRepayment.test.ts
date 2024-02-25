import { calculateMonthlyPayment } from "./calculateMonthlyRepayment";

describe("calculateMonthlyPayment", () => {
  // Test case: Calculate monthly payment with interest
  test("should calculate the correct monthly payment with interest", () => {
    // Given a mortgage of $300,000 with a $60,000 deposit, 3.5% interest, and a 30-year term
    const result = calculateMonthlyPayment(300000, 60000, 3.5, 30);

    // Expect the result to be close to $1077.71 (rounded to 2 decimal places)
    expect(result).toBeCloseTo(1077.71, 2);
  });

  // Test case: Calculate monthly payment without interest
  test("should calculate the correct monthly payment without interest", () => {
    // Given a mortgage of $300,000 with a $60,000 deposit, 0% interest, and a 30-year term
    const result = calculateMonthlyPayment(300000, 60000, 0, 30);

    // Expect the result to be close to $666.67 (rounded to 2 decimal places)
    expect(result).toBeCloseTo(666.67, 2);
  });

  // Test case: Calculate monthly payment with a different term
  test("should calculate the correct monthly payment with a different term", () => {
    // Given a mortgage of $300,000 with a $60,000 deposit, 3.5% interest, and a 15-year term
    const result = calculateMonthlyPayment(300000, 60000, 3.5, 15);

    // Expect the result to be close to $1715.72 (rounded to 2 decimal places)
    expect(result).toBeCloseTo(1715.72, 2);
  });
});
