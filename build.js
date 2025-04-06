const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'views/pages/index.ejs');
const outputPath = path.join(__dirname, 'public/index.html');

ejs.renderFile(filePath, { title: 'DroneQube', appName: 'DroneQube App' }, (err, str) => {
    if (err) {
        console.error('Error rendering EJS:', err);
        process.exit(1);
    }
    fs.writeFileSync(outputPath, str);
    console.log('Successfully generated public/index.html');
});