import { NextApiRequest, NextApiResponse } from 'next';
import fetchData from './fetchInterestRate';

// Mock the global fetch function with the defined fetchMock
const fetchMock = jest.fn();
global.fetch = fetchMock;

describe('fetchData', () => {
    beforeEach(() => {
        // Clear the mock calls before each test
        fetchMock.mockClear();
    });

    // Test case for handling successful data fetch
    it('handles successful data fetch', async () => {
        // Mock a successful response
        fetchMock.mockResolvedValueOnce({
            ok: true,
            text: jest.fn().mockResolvedValue('Mocked data response'),
        });

        // Mock Next.js API response methods
        const sendMock = jest.fn();
        const statusMock = jest.fn().mockReturnValue({ send: sendMock, status: 200 });

        // Create mock Next.js API request and response objects
        const req = {} as NextApiRequest;
        const res = { status: statusMock } as unknown as NextApiResponse;

        // Call the fetchData function
        await fetchData(req, res);

        // Assert that the fetch function was called with the expected URL
        expect(fetchMock).toHaveBeenCalledWith(expect.any(String));

        // Assert that the response status and send methods were called with the expected values
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledWith('Mocked data response');
    });
});
