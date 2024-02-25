import { NextApiRequest, NextApiResponse } from 'next';
import handler from './calculateRepayment';

// Mock the calculateMonthlyPayment function to return a fixed value for testing
jest.mock('../../utils/MortgageCalculator', () => ({
    ...jest.requireActual('../../utils/MortgageCalculator'), // Include actual implementation
    calculateMonthlyPayment: jest.fn(() => 1000), // Mock the calculation function
}));

let req: NextApiRequest;
let res: NextApiResponse;

beforeEach(() => {
    // Initialize req and res for each test case
    req = ({
        method: 'POST',
        body: {
            price: '150000',
            deposit: '30000',
            term: '25',
            interestRate: '5',
        },
    } as unknown) as NextApiRequest;

    // Mock the response methods
    res = {
        status: jest.fn(() => res), // Mock the status function
        json: jest.fn() as any,  // Mock the json function
    } as unknown as NextApiResponse;
});

describe('API handler works', () => {
    // Test case for the normal response
    it('returns the correct response', async () => {
        const req: NextApiRequest = {
            method: 'POST',
            body: {
                price: '150000',
                deposit: '30000',
                term: '25',
                interestRate: '5',
            },
        } as any;

        const res: NextApiResponse = {
            status: jest.fn(() => res),
            json: jest.fn(),
        } as any;

        await handler(req, res);

        // Assertions for the normal response
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                monthlyPayment: expect.any(Number),
                totalPayments: expect.any(Number),
                capital: expect.any(Number),
                interest: expect.any(Number),
                affordability: expect.any(Number),
                yearlyBreakdown: expect.any(Array),
            })
        );
    });

    // Test case for handling errors
    it('handles errors correctly', async () => {
        // Mocking the calculation functions to throw an error
        jest.spyOn(require('../../utils/MortgageCalculator'), 'calculateMonthlyPayment').mockImplementation(() => {
            throw new Error('Calculation error');
        });

        // Call the API handler with the mock request and response
        await handler(req, res);

        // Assertions for the error case
        expect(res.status).toHaveBeenCalledWith(500);
    });

    /*// Test case for invalid input (e.g., non-numeric values)
    it('handles invalid input correctly', async () => {
        const req: NextApiRequest = {
            method: 'POST',
            body: {
                price: 'invalid', // This value is not a number
                deposit: '30000',
                term: '25',
                interestRate: '5',
            },
        } as any;

        const res: NextApiResponse = {
            status: jest.fn(() => res),
            json: jest.fn(),
        } as any;

        await handler(req, res);

        // Assertions for the invalid input case
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Invalid input. Please provide numeric values for price, deposit, term, and interestRate.',
        });
    });*/
});
