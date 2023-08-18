rm -r cards
rm -r components
rm -r styles
rm -r _app.tsx
rm -r index.tsx
rm -r quick-order.tsx
rm -r dealer-ledger.tsx
rm -r assets

cp -R ../../cards .
cp -R ../../components .
cp -R ../../styles .
cp -R ../../pages/_app.tsx .
cp -R ../../pages/index.tsx .
cp -R ../../pages/quick-order.tsx .
cp -R ../../pages/dealer-ledger.tsx .
cp -R ../../public/assets .