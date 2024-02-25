import axios from 'axios';
import { parse } from 'csv-parse';
import { testServer } from '@/helpers/testServer';

describe('Integration Test', () => {
    it('fetches data from the external URL', async () => {
        // Set up the CORS Anywhere server URL
        const proxyUrl = 'http://localhost:8081';
        // Original URL of the external data
        const originalUrl = 'https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?csv.x=yes&Datefrom=18/Jan/2024&Dateto=18/Feb/2024&SeriesCodes=IUMABEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N';

        const { res } = await testServer(async (req, res) => {
            try {
                // Fetch data from the external URL using CORS Anywhere
                const response = await axios.get(`${proxyUrl}/${originalUrl}`);

                // Parse the CSV data into an array of objects
                const parsedData = await new Promise<any[]>((resolve, reject) => {
                    parse(response.data, { columns: true, skip_empty_lines: true }, (err: any, data: any) => {
                        if (err) reject(err);
                        else resolve(data);
                    });
                });

                // Check if the parsed data has properties 'DATE' and 'IUMABEDR'
                expect(parsedData[0]).toHaveProperty('DATE');
                expect(parsedData[0]).toHaveProperty('IUMABEDR');

            } catch (error: any) {
                // Throw an error if fetching or parsing fails
                throw new Error(`Failed to fetch data from the external URL: ${(error as Error).message}`);
            }
        })();

        // Check if the server response status is 200
        expect(res._getStatusCode()).toBe(200);
    });
});
