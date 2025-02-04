const fs = require('fs');
const path = require('path');

// Define the directory for classes
const projectRoot = path.join(__dirname, 'force-app', 'main', 'default', 'permissionsets');

// Ensure the classes directory exists
if (!fs.existsSync(projectRoot)) {
    fs.mkdirSync(projectRoot, { recursive: true });
}

for (let i = 1; i <= 960; i++) {
    const permSetName = `PermSet${i}`;
    const filePath = path.join(projectRoot, `${permSetName}.permissionset-meta.xml`);

    // Create the .xml file content
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <PermissionSet xmlns="http://soap.sforce.com/2006/04/metadata">
        <hasActivationRequired>false</hasActivationRequired>
        <label>${permSetName}</label>
        <license>Salesforce</license>
        <userPermissions>
            <enabled>true</enabled>
            <name>AccessCMC</name>
        </userPermissions>
        <userPermissions>
            <enabled>true</enabled>
            <name>CreateCustomizeReports</name>
        </userPermissions>
        <userPermissions>
            <enabled>true</enabled>
            <name>CreateReportInLightning</name>
        </userPermissions>
        <userPermissions>
            <enabled>true</enabled>
            <name>EnableCommunityAppLauncher</name>
        </userPermissions>
        <userPermissions>
            <enabled>true</enabled>
            <name>GovernNetworks</name>
        </userPermissions>
        <userPermissions>
            <enabled>true</enabled>
            <name>IsotopeLEX</name>
        </userPermissions>
        <userPermissions>
            <enabled>true</enabled>
            <name>LightningExperienceUser</name>
        </userPermissions>
        <userPermissions>
            <enabled>true</enabled>
            <name>ManageNetworks</name>
        </userPermissions>
        <userPermissions>
            <enabled>true</enabled>
            <name>ModerateNetworkUsers</name>
        </userPermissions>
        <userPermissions>
            <enabled>true</enabled>
            <name>RunReports</name>
        </userPermissions>
        <userPermissions>
            <enabled>true</enabled>
            <name>SandboxTestingInCommunityApp</name>
        </userPermissions>
    </PermissionSet>`

    // Write the .xml file
    fs.writeFileSync(filePath, xmlContent, 'utf8');

    console.log(`Created ${permSetName}`);

}





