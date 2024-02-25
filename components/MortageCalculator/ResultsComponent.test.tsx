import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsComponent from './ResultsComponent';

describe('ResultsComponent', () => {
    it('renders ResultsComponent correctly', () => {
        // Mock data for the results
        const mockResults = {
            monthlyPayment: 1200,
            totalRepayment: 14400,
            capital: 12000,
            interest: 2400,
            affordabilityCheck: 20000,
        };

        // Render the component with mock data
        render(
            <ResultsComponent
                monthlyPayment={mockResults.monthlyPayment}
                totalRepayment={mockResults.totalRepayment}
                capital={mockResults.capital}
                interest={mockResults.interest}
                affordabilityCheck={mockResults.affordabilityCheck}
            />
        );

        // Check if the rendered text matches the mock data
        expect(screen.getByText(/Monthly Payment/i).nextSibling).toHaveTextContent('£1,200');
        expect(screen.getByText(/Total Repayment/i).nextSibling).toHaveTextContent('£14,400');
        expect(screen.getByText(/Capital/i).nextSibling).toHaveTextContent('£12,000');
        expect(screen.getByText(/Interest/i).nextSibling).toHaveTextContent('£2,400');
        expect(screen.getByText(/Affordability check/i).nextSibling).toHaveTextContent('£20,000');
    });
});
