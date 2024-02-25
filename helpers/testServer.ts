import { createMocks } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';

export const testServer = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
    return async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: 'GET',
            query: {},
            cookies: {},
            body: {},
            env: {},
        });

        await handler(req, res);

        return { req, res };
    };
};
