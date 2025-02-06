const fs = require('fs');
const path = require('path');

// Define the directory for classes
const projectRoot = path.join(__dirname, 'force-app', 'main', 'default', 'more-profiles');

// Ensure the classes directory exists
if (!fs.existsSync(projectRoot)) {
    fs.mkdirSync(projectRoot, { recursive: true });
}

const profileContent = fs.readFileSync(path.join(__dirname, 'force-app', 'main', 'default', 'profiles', 'Profile With Dependencies One.profile-meta.xml'), 'utf8');

for (let i = 1; i <= 532; i++) {

    const profileName = `Another Profile ${i}`;
    const filePath = path.join(projectRoot, `${profileName}.profile-meta.xml`);

    // Write the .xml file
    fs.writeFileSync(filePath, profileContent, 'utf8');

    console.log(`Created ${profileName}`);

}





