
const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = (req, res) => {
    // Set the cookie
    res.setHeader('Set-Cookie', 'myCookie=value; Path=/; SameSite=None; Secure');

    // Serve the static HTML file
    const html = readFileSync(join(__dirname, '../public/index.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
};
