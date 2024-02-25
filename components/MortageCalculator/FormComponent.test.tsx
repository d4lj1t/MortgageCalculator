import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FormComponent, { FormComponentProps } from './FormComponent';

describe('FormComponent', () => {
    // Mock form data for testing
    const mockFormData: FormComponentProps['formData'] = {
        price: 150000,
        deposit: 30000,
        term: 30,
        interest: { InterestRate: 4 },
    };

    // Mock functions for handling input change and form submission
    const mockHandleInputChange = jest.fn();
    const mockHandleSubmit = jest.fn();

    // Test case: Rendering FormComponent with mock data
    it('renders FormComponent correctly', () => {
        render(
            <FormComponent
                formData={mockFormData}
                handleInputChange={mockHandleInputChange}
                handleSubmit={mockHandleSubmit}
            />
        );

        // Check if the form input values match the mock data
        expect(screen.getByLabelText(/Property Price/i)).toHaveValue(mockFormData.price);
        expect(screen.getByLabelText(/Deposit/i)).toHaveValue(mockFormData.deposit);
        expect(screen.getByLabelText(/Mortgage Term/i)).toHaveValue(mockFormData.term);
        expect(screen.getByLabelText(/Interest rate/i)).toHaveValue(mockFormData.interest.InterestRate);
    });

    // Test case: Handling form submission
    it('calls handleSubmit when form is submitted', () => {
        render(
            <FormComponent
                formData={mockFormData}
                handleInputChange={mockHandleInputChange}
                handleSubmit={mockHandleSubmit}
            />
        );

        // Simulate a form submission
        fireEvent.submit(screen.getByRole('button', { name: /calculate/i }));

        // Check if mockHandleSubmit is called
        expect(mockHandleSubmit).toHaveBeenCalled();
    });

    // Test case: Handling input change
    it('calls handleInputChange when input changes', () => {
        const mockHandleInputChange = jest.fn();

        render(
            <FormComponent
                formData={mockFormData}
                handleInputChange={mockHandleInputChange}
                handleSubmit={mockHandleSubmit}
            />
        );

        // Simulate a change in the Property Price input
        fireEvent.change(screen.getByLabelText(/Property Price/i), { target: { value: 200000 } });

        // Check if mockHandleInputChange is called
        expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
    });
});
