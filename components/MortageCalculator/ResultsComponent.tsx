import React from 'react';
import Table from 'react-bootstrap/Table';
import {formatCurrency} from '@/utils/formatCurrency';

/**
 * Props for the ResultsComponent.
 */
interface ResultsComponentProps {
    monthlyPayment: number;
    totalRepayment: number;
    capital: number;
    interest: number;
    affordabilityCheck: number;
}

/**
 * ResultsComponent: A React functional component representing the results table in the mortgage calculator.
 * @param {ResultsComponentProps} props - The properties passed to the component.
 */
const ResultsComponent: React.FC<ResultsComponentProps> = ({
       monthlyPayment,
       totalRepayment,
       capital,
       interest,
       affordabilityCheck,
    }: ResultsComponentProps) => {
    return (
        <Table striped="columns">
            <tbody>
            {/* Monthly Payment Row */}
            <tr className="border-b border-t">
                <td>Monthly Payment</td>
                <td className="text-right">{formatCurrency(monthlyPayment)}</td>
            </tr>

            {/* Total Repayment Row */}
            <tr className="border-b">
                <td>Total Repayment</td>
                <td className="text-right">{formatCurrency(totalRepayment)}</td>
            </tr>

            {/* Capital Row */}
            <tr className="border-b">
                <td>Capital</td>
                <td className="text-right">{formatCurrency(capital)}</td>
            </tr>

            {/* Interest Row */}
            <tr className="border-b">
                <td>Interest</td>
                <td className="text-right">{formatCurrency(interest)}</td>
            </tr>

            {/* Affordability Check Row */}
            <tr className="border-b">
                <td>Affordability check</td>
                <td className="text-right">{formatCurrency(affordabilityCheck)}</td>
            </tr>
            </tbody>
        </Table>
    );
};

export default ResultsComponent;
