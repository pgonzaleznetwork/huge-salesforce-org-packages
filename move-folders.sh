#!/bin/bash

# Define source and destination paths
source_path="/Users/pgonzalez/Documents/apps/trailheadapps/NebulaLogger/nebula-logger/core"
destination_path="/Users/pgonzalez/Documents/apps/trailheadapps/huge-salesforce-org-packages/nebula-logger"

# Check if the source directory exists
if [ -d "$source_path" ]; then
    # Check if the destination directory exists, if not, create it
    if [ ! -d "$destination_path" ]; then
        mkdir -p "$destination_path"
    fi

    # Move the contents of the source directory to the destination directory
    mv "$source_path"/* "$destination_path"/

    echo "Move completed successfully!"
else
    echo "Source directory not found: $source_path"
fi
