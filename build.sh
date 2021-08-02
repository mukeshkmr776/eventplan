cd web
rm -rf node_modules
npm install
npm run build:prod
rm -rf node_modules
cd ..

rm -rf temp/
cp -rf server/ temp/
rm -rf temp/public/ui/
mkdir -p temp/public/ui/
cp -rf web/dist/ temp/public/ui/
cd ..
