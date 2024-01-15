rm -r cards
rm -r components
rm -r styles
rm -r _app.tsx
rm -r index.tsx
rm -r quick-order.tsx
rm -r dealer-ledger.tsx
rm -r sales-register.tsx
rm -r firmware.tsx
rm -r contact-us.tsx
rm -r about-us.tsx
rm -r support
# rm -r support/warranty-claim.tsx
rm -r assets

cp -R ../../cards .
cp -R ../../components .
cp -R ../../styles .
cp -R ../../pages/_app.tsx .
cp -R ../../pages/index.tsx .
cp -R ../../pages/quick-order.tsx .
cp -R ../../pages/dealer-ledger.tsx .
cp -R ../../pages/sales-register.tsx .
cp -R ../../pages/firmware.tsx .
cp -R ../../pages/contact-us.tsx .
cp -R ../../pages/about-us.tsx .
cp -R ../../support .
# cp -R ../../support/warranty-claim.tsx .
cp -R ../../public/assets .