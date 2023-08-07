rm -r cards
rm -r components
rm -r styles
rm -r _app.tsx
rm -r index.tsx
rm -r assets

cp -R ../../cards .
cp -R ../../components .
cp -R ../../styles .
cp -R ../../pages/_app.tsx .
cp -R ../../pages/index.tsx .
cp -R ../../public/assets .