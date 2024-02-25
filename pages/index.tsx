import React, {ChangeEvent, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Head from 'next/head';

import FormComponent from "@/components/MortageCalculator/FormComponent";
import ResultsComponent from "@/components/MortageCalculator/ResultsComponent";
import YearlyBreakdownComponent from "@/components/MortageCalculator/YearlyBreakdownComponent";

import {processDataToGetInterestRate} from "@/utils/processDataToGetInterestRate";
import {
  calculateMonthlyPayment,
  calculateTotalRepayment,
  calculateCapital,
  calculateTotalInterest,
  calculateAffordability,
  calculateYearlyBreakdown,
} from "@/utils/MortgageCalculator";

// Define the structure of the yearly breakdown data
type YearlyBreakdownObject = {
  year: number,
  remainingDebt: number
}

// Define the structure of the initial interest rate data
interface ProcessedData {
  InterestRate: number;
}

// Define the structure of the form data
interface FormData {
  price: string | number;
  deposit: string | number;
  term: string | number;
  interest: ProcessedData;
}

// Define the structure of the component props
interface MortgageCalculatorProps {
  initialInterestRate: ProcessedData;
  price: number,
  deposit: number,
  term: number,
  repaymentsResponseData: {
    monthlyPayment: number,
    totalPayments: number,
    capital: number,
    interest: number,
    affordability: number,
    yearlyBreakdown: YearlyBreakdownObject[],
  };
  error?: string;
}

// Define the server-side props fetching function
export async function getServerSideProps(context: { query: { price: number; deposit: number; term: number; interest: number; }; }) {
  try {
    // Fetch the initial interest rate from your API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const interestRateResponse = await fetch(`${apiUrl}/fetchInterestRate`);
    if (!interestRateResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const interestRateData = await interestRateResponse.text();
    const initialInterestRate = processDataToGetInterestRate(interestRateData);

    const { price = '', deposit = '', term = 25, interest } = context.query;

    // Fetch repayments data from the API
    const repaymentsResponse = await fetch(`${apiUrl}/calculateRepayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: price,
        deposit: deposit,
        term: term,
        interestRate: interest,
      }),
    });

    if (!repaymentsResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const repaymentsResponseData = await repaymentsResponse.json();

    return {
      props: {
        initialInterestRate,
        price,
        deposit,
        term,
        repaymentsResponseData,
      },
    };
  } catch (error: any) {
    console.error('Error:', error.message);
    return {
      props: {
        initialInterestRate: { InterestRate: 0 },
        ...context.query,
        repaymentsResponseData: {},
        error: error.message, // Pass the error message to the component
      },
    };
  }
}

// Define the MortgageCalculator component
const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ initialInterestRate, price, deposit, term, repaymentsResponseData, error  }) => {
  const [formData, setFormData] = useState<FormData>({
    price: price,
    deposit: deposit,
    term: term,
    interest: initialInterestRate,
  });

  const [monthlyPayment, setMonthlyPayment] = useState<number>(repaymentsResponseData.monthlyPayment);
  const [totalRepayment, setTotalRepayment] = useState<number>(repaymentsResponseData.totalPayments);
  const [capital, setCapital] = useState<number>(repaymentsResponseData.capital);
  const [interest, setInterest] = useState<number>(repaymentsResponseData.interest);
  const [affordabilityCheck, setAffordabilityCheck] = useState<number>(repaymentsResponseData.affordability);

  const [yearlyBreakdown, setYearlyBreakdown] = useState<Array<{ year: number; remainingDebt: number }>>(repaymentsResponseData.yearlyBreakdown);

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let numericValue: string | number = value;
    if (name === 'term' || name === 'interest') {
      numericValue = value === '' ? '' : parseFloat(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'interest' ? { InterestRate: numericValue } : numericValue,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate and update state based on form data
    const monthly  = calculateMonthlyPayment(Number(formData.price), Number(formData.deposit), Number(formData.interest.InterestRate), Number(formData.term));

    setYearlyBreakdown(calculateYearlyBreakdown(Number(formData.price), Number(formData.deposit), Number(formData.interest.InterestRate), Number(formData.term)));

    setMonthlyPayment(monthly);
    setTotalRepayment(calculateTotalRepayment(monthly, Number(formData.term)));
    setCapital(calculateCapital(Number(formData.price), Number(formData.deposit)));
    setInterest(calculateTotalInterest(monthly, Number(formData.term), Number(formData.price), Number(formData.deposit)));
    setAffordabilityCheck(calculateAffordability(Number(formData.price), Number(formData.deposit), Number(formData.interest.InterestRate), Number(formData.term)));
  };

  return (
      <Container>
        <Head>
          <title>Mortgage Calculator Test</title>
        </Head>
        <Row className="gap-x-10 pt-3">
          {/* Form Component */}
          <Col className="border-r" md="auto">
            <FormComponent formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
          </Col>
          {/* Results Component */}
          <Col md="auto">
            <h2 className="pb-3">Results</h2>
            {error && (<div className="text-red-600">An error occurred: {error}</div>)}
            {!error && (<ResultsComponent monthlyPayment={monthlyPayment} totalRepayment={totalRepayment} capital={capital} interest={interest} affordabilityCheck={affordabilityCheck}/>)}
          </Col>
          {/* Yearly Breakdown Component */}
          <Col md="auto">
            <h2 className="pb-3">Yearly Breakdown</h2>
            {error && (<div>error loading yearly breakdown data</div>)}
            {!error && (<YearlyBreakdownComponent yearlyBreakdown={yearlyBreakdown} />)}
          </Col>
        </Row>
      </Container>
  );
}

export default MortgageCalculator;
