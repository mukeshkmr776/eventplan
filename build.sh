cd web
npm install
npm run build:prod
rm -rf node_modules
cd ..

rm -rf temp/
cp -rf server/ temp/
rm -rf temp/public/dist/
mkdir temp/public/
cp -rf web/dist/eventplan/ temp/public/dist/

