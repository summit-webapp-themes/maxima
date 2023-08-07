rm -r ../../cards
rm -r ../../components
rm -r ../../styles
rm -r ../../pages/_app.tsx
rm -r ../../pages/index.tsx
rm -r ../../public/assets

cp -R cards ../../
cp -R components ../../
cp -R styles ../../
cp -R _app.tsx ../../pages
cp -R index.tsx ../../pages
cp -R assets ../../public

