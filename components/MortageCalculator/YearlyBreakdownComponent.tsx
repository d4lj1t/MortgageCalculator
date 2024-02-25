import React from 'react';
import Table from 'react-bootstrap/Table';
import { formatCurrency } from '@/utils/formatCurrency';

/**
 * Props for the YearlyBreakdownComponent.
 */
interface YearlyBreakdownComponentProps {
    yearlyBreakdown: Array<{ year: number; remainingDebt: number }>;
}

/**
 * YearlyBreakdownComponent: A React functional component representing the yearly breakdown table in the mortgage calculator.
 * @param {YearlyBreakdownComponentProps} props - The properties passed to the component.
 */
const YearlyBreakdownComponent: React.FC<YearlyBreakdownComponentProps> = ({ yearlyBreakdown }) => {
    return (
        <Table className="max-w-52" bordered hover size="sm">
            <thead>
            <tr>
                <th>Year</th>
                <th>Remaining Debt</th>
            </tr>
            </thead>
            <tbody>
            {/* Map through yearly breakdown entries and render each row */}
            {yearlyBreakdown.map((entry) => (
                <tr key={entry.year}>
                    <td>{entry.year}</td>
                    <td>{formatCurrency(entry.remainingDebt)}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default YearlyBreakdownComponent;
