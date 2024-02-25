const cors_anywhere = require('cors-anywhere');

const host = '0.0.0.0';
const port = 8081;

cors_anywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
}).listen(port, host, () => {
    console.log(`CORS Anywhere server started on http://${host}:${port}`);
});
