const fs = require('fs');
const path = require('path');

// Define the directory for classes
const projectRoot = path.join(__dirname, 'source-packages','all-fields','main', 'default', 'objects','Account','fields');

// Ensure the classes directory exists
if (!fs.existsSync(projectRoot)) {
    fs.mkdirSync(projectRoot, { recursive: true });
}

let objects = [
    'Broker__c',
    'LoggerScenario__c',
    'Property__c',
]

for(let object of objects){
    const objectRoot = path.join(__dirname, 'source-packages','all-fields','main', 'default', 'objects',object,'fields');
    if (!fs.existsSync(objectRoot)) {
        fs.mkdirSync(objectRoot, { recursive: true });
    }
    createFields(objectRoot);
}

function createFields(where){
    for (let i = 1; i <= 400; i++) {
        const fieldName = `CustomField${i}`;
        const fieldFilePath = path.join(where, `${fieldName}__c.field-meta.xml`);
    
        // Create the .xml file content
        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
        <CustomField xmlns="http://soap.sforce.com/2006/04/metadata">
            <fullName>${fieldName}__c</fullName>
            <externalId>false</externalId>
            <label>${fieldName}</label>
            <length>50</length>
            <required>false</required>
            <trackTrending>false</trackTrending>
            <type>Text</type>
            <unique>false</unique>
        </CustomField>`;
    
        // Write the .xml file
        fs.writeFileSync(fieldFilePath, xmlContent, 'utf8');
    
        console.log(`Created ${fieldName}`);
    }
}





