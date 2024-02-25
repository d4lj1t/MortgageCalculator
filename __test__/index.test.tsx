import React from 'react';
import { waitFor } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import MortgageCalculator from '../pages';
import fetchMock from 'jest-fetch-mock';

// Mock data for getServerSideProps
const serverSidePropsData = {
    initialInterestRate: { InterestRate: 3 },
    price: 100000,
    deposit: 20000,
    term: 25,
    repaymentsResponseData: {
        monthlyPayment: 1000,
        totalPayments: 30000,
        capital: 25000,
        interest: 5000,
        affordability: 500,
        yearlyBreakdown: [{ year: 1, remainingDebt: 20000 }],
    },
};

// Mock the getServerSideProps function
fetchMock.mockResponseOnce(JSON.stringify(serverSidePropsData.repaymentsResponseData));

// Mock the fetchData function
jest.mock('../utils/processDataToGetInterestRate', () => ({
    processDataToGetInterestRate: jest.fn(() => ({ InterestRate: 3 })),
}));

jest.mock('../utils/MortgageCalculator', () => ({
    calculateMonthlyPayment: jest.fn(() => 1000),
    calculateTotalRepayment: jest.fn(() => 30000),
    calculateCapital: jest.fn(() => 25000),
    calculateTotalInterest: jest.fn(() => 5000),
    calculateAffordability: jest.fn(() => 500),
    calculateYearlyBreakdown: jest.fn(() => [{ year: 1, remainingDebt: 20000 }]),
}));

describe('MortgageCalculator', () => {
    it('renders MortgageCalculator correctly', () => {
        // Mock data for getServerSideProps
        const serverSidePropsData = {
            initialInterestRate: { InterestRate: 3 },
            price: 100000,
            deposit: 20000,
            term: 25,
            repaymentsResponseData: {
                monthlyPayment: 1000,
                totalPayments: 30000,
                capital: 25000,
                interest: 5000,
                affordability: 500,
                yearlyBreakdown: [{ year: 1, remainingDebt: 20000 }],
            },
        };

        // Mock the getServerSideProps function
        fetchMock.mockResponseOnce(JSON.stringify(serverSidePropsData.repaymentsResponseData));

        // Render the component with mock data
        render(<MortgageCalculator {...serverSidePropsData} />);

        // Check if the rendered text matches the mock data
        expect(screen.getByText(/Results/i)).toBeInTheDocument();
        expect(screen.getByText(/Monthly Payment/i).nextSibling).toHaveTextContent('£1,000');
        expect(screen.getByText(/Total Repayment/i).nextSibling).toHaveTextContent('£30,000');
        expect(screen.getByText(/Capital/i).nextSibling).toHaveTextContent('£25,000');

        const interestLabel = screen.getByLabelText(/Interest rate/i);
        const interestValue = screen.getByText(/£5,000/);

        expect(interestLabel).toBeInTheDocument();
        expect(interestValue).toBeInTheDocument();

        expect(screen.getByText(/Affordability check/i).nextSibling).toHaveTextContent('£500');

        expect(screen.getByText(/Yearly Breakdown/i).nextSibling).toBeInTheDocument();

        // Use getAllByText to handle multiple elements with the same text
        const yearLabels = screen.getAllByText(/Year/i);
        waitFor(() => {
            // Check if at least one "Year" label is present
            expect(yearLabels.length).toBeGreaterThan(0);

            // Check if the "Year 1" element is present
            const year1Element = screen.getByText(/Year 1/i);
            expect(year1Element).toBeInTheDocument();
        });
    });

    it('handles form input changes correctly', () => {
        // Render the component
        render(<MortgageCalculator {...serverSidePropsData} />);

        // Simulate user input
        fireEvent.change(screen.getByLabelText(/Property Price/i), { target: { value: '150000' } });
        fireEvent.change(screen.getByLabelText(/Deposit/i), { target: { value: '30000' } });
        fireEvent.change(screen.getByLabelText(/Mortgage Term/i), { target: { value: '25' } });
        fireEvent.change(screen.getByLabelText(/Interest rate/i), { target: { value: '3' } });

        // Assert: Check the values using custom matcher
        expect(screen.getByLabelText(/Property Price/i)).toHaveValue(150000);
        expect(screen.getByLabelText(/Deposit/i)).toHaveValue(30000);
        expect(screen.getByLabelText(/Mortgage Term/i)).toHaveValue(25);
        expect(screen.getByLabelText(/Interest rate/i)).toHaveValue(3);
    });

    it('handles form submission correctly', async () => {
        // Render the component
        render(<MortgageCalculator {...serverSidePropsData} />);

        // Simulate form submission
        fireEvent.submit(screen.getByRole('button', { name: /Calculate/i }));
    });

    it('handles errors correctly', async () => {
        // Modify fetchMock to reject the request
        fetchMock.mockReject(new Error('Fetch failed'));

        // Render the component
        render(<MortgageCalculator {...serverSidePropsData} />);

        // Use waitFor to wait for the error message
        waitFor(() => {
            // Assert that the error message is displayed in the component
            expect(screen.getByText('Your specific error message')).toBeInTheDocument();
        });
    });

});
