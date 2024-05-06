import CustomerVariants from "./components/CustomerVariants";
import DealerVariants from "./components/DealerVariants";

const VariantsMaster = ({
  productVariants,
  selectedVariant,
  thumbnailOfVariants,
  handleVariantSelect,
  doesSelectedVariantDoesNotExists,
  stockDoesNotExistsForSelectedVariants,
  variantsData,
  selectedMultiLangData,
  // minQty,
  minOrderQty
}: any) => {
  let isDealer: any;
  if (typeof window !== "undefined") {
    isDealer = localStorage.getItem("isDealer");
  }
  console.log("variants data for dealer", productVariants, variantsData);
  return (
    <>
      {isDealer === "true" ? (
        <DealerVariants
          variants={productVariants}
          variantsData={variantsData}
          selectedMultiLangData={selectedMultiLangData}
          // minQty={minQty}
          minOrderQty={minOrderQty}
        />
      ) : (
        <CustomerVariants
          productVariants={productVariants}
          selectedVariant={selectedVariant}
          thumbnailOfVariants={thumbnailOfVariants}
          handleVariantSelect={handleVariantSelect}
          doesSelectedVariantDoesNotExists={doesSelectedVariantDoesNotExists}
          stockDoesNotExistsForSelectedVariants={
            stockDoesNotExistsForSelectedVariants
          }
        />
      )}
    </>
  );
};

export default VariantsMaster;
