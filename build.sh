#!/usr/bin/bash
set -e


# UI Build
cd web/
npm install
npm run build:prod
cd ../
# End


# Remove output folder
rm -rf target/


# Copying server files into output
cp -rf server/ target/
rm -rf target/public/ui/

# Copying UI compiled files into output/public/ui/
mkdir -p target/public/ui-temp/
cp -rf web/dist/* target/public/ui-temp/
mv target/public/ui-temp/ target/public/ui/


# cleanup
rm -rf target/node_modules/
rm -rf target/package-log.json
