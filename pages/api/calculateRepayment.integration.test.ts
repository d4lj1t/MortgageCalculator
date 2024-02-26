import axios from 'axios';
import { testServer } from '@/helpers/testServer';

describe('Integration Test for calculateRepayment API', () => {
    it('calculates mortgage values correctly', async () => {
        // Set up the CORS Anywhere proxy and the API endpoint URL
        const proxyUrl = 'http://localhost:8081'; // CORS Anywhere proxy
        const apiUrl = `${proxyUrl}/http://localhost:3000/api/calculateRepayment`;

        // Sample data for the API request
        const requestData = {
            price: 300000,
            deposit: 60000,
            term: 30,
            interestRate: 3.5,
        };

        // Execute the test using the testServer utility
        const { res } = await testServer(async () => {
            try {
                // Send a POST request to the API endpoint with the sample data
                const response = await axios.post(apiUrl, requestData);

                // Extract the response data
                const responseData = response.data;

                // Assert the expected structure of the response
                expect(responseData).toHaveProperty('monthlyPayment');
                expect(responseData).toHaveProperty('totalPayments');
                expect(responseData).toHaveProperty('capital');
                expect(responseData).toHaveProperty('interest');
                expect(responseData).toHaveProperty('affordability');
                expect(responseData).toHaveProperty('yearlyBreakdown');

                return responseData;
            } catch (error) {
                // Throw an error if the API request fails
                throw new Error(`Failed to make a request to the API: ${(error as Error).message}`);
            }
        })();

        // Check if the server response status is 200 (successful)
        expect(res._getStatusCode()).toBe(200);
    });
});
