import React from 'react';
import { render, screen } from '@testing-library/react';
import YearlyBreakdownComponent from './YearlyBreakdownComponent';

// Mock the formatCurrency function
jest.mock('../../utils/formatCurrency', () => ({
    formatCurrency: jest.fn((value) => `£${value}`), // Adjust the mock implementation as needed
}));

describe('YearlyBreakdownComponent', () => {
    it('renders YearlyBreakdownComponent correctly', () => {
        // Mock data for the yearly breakdown
        const mockYearlyBreakdown = [
            { year: 2022, remainingDebt: 12000 },
            { year: 2023, remainingDebt: 9000 },
            // Add more entries as needed
        ];

        // Render the component with mock data
        render(<YearlyBreakdownComponent yearlyBreakdown={mockYearlyBreakdown} />);

        // Check if the rendered table headers are present
        expect(screen.getByText(/Year/i)).toBeInTheDocument();
        expect(screen.getByText(/Remaining Debt/i)).toBeInTheDocument();

        // Check if the rendered yearly breakdown data matches the mock data
        mockYearlyBreakdown.forEach((entry) => {
            expect(screen.getByText(entry.year.toString())).toBeInTheDocument();
            expect(screen.getByText(`£${entry.remainingDebt}`)).toBeInTheDocument();
        });
    });
});
