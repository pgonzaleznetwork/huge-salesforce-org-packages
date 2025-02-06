const fs = require('fs');
const path = require('path');

// Define the directory for classes
const projectRoot = path.join(__dirname, 'force-app', 'main', 'default', 'flows');

// Ensure the classes directory exists
if (!fs.existsSync(projectRoot)) {
    fs.mkdirSync(projectRoot, { recursive: true });
}

for (let i = 1; i <= 532; i++) {
    const flowName = `Custom_Flow${i}_With${i+1}_Steps`;
    const filePath = path.join(projectRoot, `${flowName}.flow-meta.xml`);

    // Create the .xml file content
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <Flow xmlns="http://soap.sforce.com/2006/04/metadata">
        <apiVersion>62.0</apiVersion>
        <environments>Default</environments>
        <interviewLabel>${flowName} {!$Flow.CurrentDateTime}</interviewLabel>
        <label>${flowName}</label>
        <processMetadataValues>
            <name>BuilderType</name>
            <value>
                <stringValue>LightningFlowBuilder</stringValue>
            </value>
        </processMetadataValues>
        <processMetadataValues>
            <name>CanvasMode</name>
            <value>
                <stringValue>AUTO_LAYOUT_CANVAS</stringValue>
            </value>
        </processMetadataValues>
        <processMetadataValues>
            <name>OriginBuilderType</name>
            <value>
                <stringValue>LightningFlowBuilder</stringValue>
            </value>
        </processMetadataValues>
        <processType>AutoLaunchedFlow</processType>
        <recordUpdates>
            <name>Update_the_name</name>
            <label>Update the name</label>
            <locationX>176</locationX>
            <locationY>287</locationY>
            <inputAssignments>
                <field>Name</field>
                <value>
                    <elementReference>$Flow.InterviewGuid</elementReference>
                </value>
            </inputAssignments>
            <inputReference>$Record</inputReference>
        </recordUpdates>
        <start>
            <locationX>50</locationX>
            <locationY>0</locationY>
            <connector>
                <targetReference>Update_the_name</targetReference>
            </connector>
            <filterLogic>and</filterLogic>
            <filters>
                <field>Name</field>
                <operator>NotEqualTo</operator>
                <value>
                    <stringValue></stringValue>
                </value>
            </filters>
            <object>affiliateProgram__c</object>
            <recordTriggerType>Create</recordTriggerType>
            <triggerType>RecordBeforeSave</triggerType>
        </start>
        <status>Draft</status>
    </Flow>
    `

    // Write the .xml file
    fs.writeFileSync(filePath, xmlContent, 'utf8');

    console.log(`Created ${flowName}`);

}





