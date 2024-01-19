const fs = require('fs');
const path = require('path');

const routesDirectory = '/Users/pgonzalez/Documents/apps/trailheadapps/huge-salesforce-org-packages/sfdx-community-deployment/main/default/experiences/Salto_Support1/routes'; // Change this to the actual path of your "routes" directory

fs.readdir(routesDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(routesDirectory, file);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }

      try {
        const jsonData = JSON.parse(data);

        // Extract label and create devName
        const devName = jsonData.devName;
        //remove __c from devName
        const newDevName = devName.replace('__c','');


        // Add devName property to JSON
        jsonData.devName = newDevName;

        // Save the modified JSON back to the file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
          if (err) {
            console.error(`Error writing file ${file}:`, err);
          } else {
            console.log(`Successfully processed file ${file}`);
          }
        });
      } catch (parseError) {
        console.error(`Error parsing JSON in file ${file}:`, parseError);
      }
    });
  });
});
