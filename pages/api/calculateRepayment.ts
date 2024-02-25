// pages/api/calculateRepayment.ts

import { NextApiRequest, NextApiResponse } from 'next';
import {
    calculateMonthlyPayment,
    calculateTotalRepayment,
    calculateCapital,
    calculateTotalInterest,
    calculateAffordability,
    calculateYearlyBreakdown,
} from "@/utils/MortgageCalculator";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Extract data from the request body
        const { price, deposit, term, interestRate } = req.body;

        // Calculate the monthly mortgage payment
        const monthlyPayment = calculateMonthlyPayment(
            Number(price),
            Number(deposit),
            Number(interestRate),
            Number(term)
        );

        // Calculate the total repayments over the mortgage term
        const totalPayments = calculateTotalRepayment(
            monthlyPayment,
            Number(term),
        );

        // Calculate the initial capital borrowed
        const capital = calculateCapital(
            Number(price),
            Number(deposit),
        );

        // Calculate the total interest paid over the mortgage term
        const interest = calculateTotalInterest(
            monthlyPayment,
            Number(term),
            Number(price),
            Number(deposit),
        );

        // Calculate the affordability of the mortgage
        const affordability = calculateAffordability(
            Number(price),
            Number(deposit),
            Number(interestRate),
            Number(term),
        );

        // Calculate the yearly breakdown of mortgage repayments
        const yearlyBreakdown = calculateYearlyBreakdown(
            Number(price),
            Number(deposit),
            Number(interestRate),
            Number(term),
        );

        // Return the calculated values in the response
        if (!res) {
            console.error('Response object is not initialized.');
            return;
        }

        /*// Check if any input is not numeric
        if (!isNumeric(price) || !isNumeric(deposit) || !isNumeric(term) || !isNumeric(interestRate)) {
            // If any input is not numeric, respond with a 400 status code
            return res.status(400).json({ error: 'Invalid input. Please provide numeric values for price, deposit, term, and interestRate.' });
        }*/

        return res.status(200).json({
            monthlyPayment,
            totalPayments,
            capital,
            interest,
            affordability,
            yearlyBreakdown,
        });
    } catch (error) {
        // Handle errors and log them
        console.error('Error calculating mortgage values:', error);

        // Ensure that res is always initialized before sending an error response
        if (!res) {
            console.error('Response object is not initialized.');
            return;
        }

        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';

        console.log('Error Message:', errorMessage);

        // Send an error response with a meaningful message
        return res.status(500).json({ message: errorMessage });
    }
}
