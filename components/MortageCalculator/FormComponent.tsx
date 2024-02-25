import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

/**
 * Props for the FormComponent.
 */
export interface FormComponentProps {
    formData: {
        price: string | number;
        deposit: string | number;
        term: string | number;
        interest: { InterestRate: string | number };
    };
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

/**
 * FormComponent: A React functional component representing a mortgage calculator form.
 * @param {FormComponentProps} props - The properties passed to the component.
 */
const FormComponent: React.FC<FormComponentProps> = ({ formData, handleInputChange, handleSubmit }: FormComponentProps) => {
    return (
        <Form onSubmit={handleSubmit}>
            {/* Property Price Input */}
            <Form.Label htmlFor="price">Property Price</Form.Label>
            <InputGroup className="mb-3">
                <InputGroup.Text>£</InputGroup.Text>
                <Form.Control
                    id="price"
                    name="price"
                    type="number"
                    className="no-spinner"
                    step="any"
                    value={formData.price}
                    onChange={handleInputChange}
                />
            </InputGroup>

            {/* Deposit Input */}
            <Form.Label htmlFor="deposit">Deposit</Form.Label>
            <InputGroup className="mb-3">
                <InputGroup.Text>£</InputGroup.Text>
                <Form.Control
                    id="deposit"
                    name="deposit"
                    type="number"
                    className="no-spinner"
                    step="any"
                    value={formData.deposit}
                    onChange={handleInputChange}
                />
            </InputGroup>

            {/* Mortgage Term Input */}
            <Form.Label htmlFor="term">Mortgage Term</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    id="term"
                    name="term"
                    type="number"
                    step="any"
                    value={formData.term}
                    onChange={handleInputChange}
                />
                <InputGroup.Text>years</InputGroup.Text>
            </InputGroup>

            {/* Interest Rate Input */}
            <Form.Label htmlFor="interest">Interest rate</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    id="interest"
                    name="interest"
                    type="number"
                    step="any"
                    className="no-spinner"
                    value={formData.interest ? formData.interest.InterestRate : ''}
                    onChange={handleInputChange}
                />
                <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>

            {/* Submit Button */}
            <Button className="w-full" variant="primary" type="submit">
                Calculate
            </Button>
        </Form>
    );
};

export default FormComponent;
