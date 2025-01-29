const fs = require('fs');
const path = require('path');

// Define the directory for classes
const projectRoot = path.join(__dirname, 'force-app', 'main', 'default', 'classes','domain7');

// Ensure the classes directory exists
if (!fs.existsSync(projectRoot)) {
    fs.mkdirSync(projectRoot, { recursive: true });
}

// Generate 1000 classes
for (let i = 1; i <= 2000; i++) {
    const className = `domain7Controller${i}`;
    const classFilePath = path.join(projectRoot, `${className}.cls`);
    const xmlFilePath = path.join(projectRoot, `${className}.cls-meta.xml`);

    // Create the .cls file content
    const clsContent = `public class ${className} {\n    // Your code here\n}`;

    // Create the .xml file content
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<ApexClass xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>58.0</apiVersion>
    <status>Active</status>
</ApexClass>`;

    // Write the .cls file
    fs.writeFileSync(classFilePath, clsContent, 'utf8');

    // Write the .xml file
    fs.writeFileSync(xmlFilePath, xmlContent, 'utf8');

    console.log(`Created ${className}.cls and ${className}.cls-meta.xml`);
}


