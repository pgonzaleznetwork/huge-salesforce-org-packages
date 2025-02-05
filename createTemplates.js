const fs = require('fs');
const path = require('path');

// Define the directory for classes
const projectRoot = path.join(__dirname, 'force-app', 'main', 'default', 'email','unfiled$public');

// Ensure the classes directory exists
if (!fs.existsSync(projectRoot)) {
    fs.mkdirSync(projectRoot, { recursive: true });
}

for (let i = 1; i <= 430; i++) {
    const name = `EmailTemplate${i}`;
    const emailFilePath = path.join(projectRoot, `${name}.email`);
    const xmlFilePath = path.join(projectRoot, `${name}.email-meta.xml`);

    // Create the .xml file content
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <EmailTemplate xmlns="http://soap.sforce.com/2006/04/metadata">
        <available>true</available>
        <description>Notification of new password</description>
        <encodingKey>UTF-8</encodingKey>
        <name>${name}</name>
        <style>none</style>
        <subject>Action required: reset your password</subject>
        <type>text</type>
        <uiType>Aloha</uiType>
    </EmailTemplate>`

    // Write the .xml file
    fs.writeFileSync(xmlFilePath, xmlContent, 'utf8');
    fs.writeFileSync(emailFilePath, 'hello!', 'utf8');

    console.log(`Created ${name}.email and ${name}.email-meta.xml`);

}





