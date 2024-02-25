import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Data Fetcher API Handler
 * This module defines an API handler for fetching data from a specific URL
 * and sending the response to the client. It handles incoming requests,
 * fetches data from a predefined URL, and responds with the fetched data.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {NextApiResponse} res - The Next.js API response object.
 */
const fetchData = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Fetch data from the specified URL
        const response = await fetch(
            'https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?csv.x=yes&Datefrom=18/Jan/2024&Dateto=18/Feb/2024&SeriesCodes=IUMABEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N'
        );

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        // Extract the text data from the response
        const data = await response.text();

        // Send the data to the client with a 200 OK status
        res.status(200).send(data);
    } catch (error) {
        // Log the error to the console
        console.error('Error fetching data:', error);

        // Extract the error message or provide a default message
        const errorMessage = (error instanceof Error && error.message) || 'Error fetching Bank of England interest rate';

        console.log('Error Message:', errorMessage);

        // Send a 500 Internal Server Error response to the client with the error message
        res.status(500).send(errorMessage);
    }
};

export default fetchData;
