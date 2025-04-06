const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// Paths for the EJS template and the output HTML file
const filePath = path.join(__dirname, 'views/pages/index.ejs');
const outputPath = path.join(__dirname, 'public/index.html');

// Render the EJS template into an HTML file
ejs.renderFile(filePath, { title: 'DroneQube', appName: 'DroneQube App' }, (err, str) => {
    if (err) {
        console.error('Error rendering EJS:', err);
        process.exit(1);
    }

    // Write the rendered HTML to the public folder
    fs.writeFileSync(outputPath, str);
    console.log('Successfully generated public/index.html');
});

// Add a serverless function to serve the static file with a cookie
const serverlessFunctionPath = path.join(__dirname, 'api/index.js');
const serverlessFunctionContent = `
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
`;

// Write the serverless function to the api folder
fs.mkdirSync(path.join(__dirname, 'api'), { recursive: true });
fs.writeFileSync(serverlessFunctionPath, serverlessFunctionContent);
console.log('Successfully created api/index.js for serverless function.');