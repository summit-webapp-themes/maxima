rm -r ../../cards
rm -r ../../components
rm -r ../../styles
rm -r ../../pages/_app.tsx
rm -r ../../pages/index.tsx
rm -r ../../pages/dealer-ledger.tsx
rm -r ../../pages/quick-order.tsx
rm -r ../../pages/sales-register.tsx
rm -r ../../pages/firmware.tsx
rm -r ../../pages/contact-us.tsx
rm -r ../../pages/about-us.tsx
rm -r ../../support
# rm -r ../../support/warranty-claim.tsx
rm -r ../../public/assets

cp -R cards ../../
cp -R components ../../
cp -R styles ../../
cp -R _app.tsx ../../pages
cp -R index.tsx ../../pages
cp -R dealer-ledger.tsx ../../pages
cp -R quick-order.tsx ../../pages
cp -R sales-register.tsx ../../pages
cp -R firmware.tsx ../../pages
cp -R contact-us.tsx ../../pages
cp -R about-us.tsx ../../pages
cp -R support ../../pages
# cp -R support/warranty-claim.tsx ../../pages
cp -R assets ../../public

