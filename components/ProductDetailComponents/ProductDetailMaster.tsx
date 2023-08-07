import useProductDetail from "../../hooks/ProductDetailHook/product-detail-hook";
import { Norecord } from "../NoRecord";
import ProductDetailLoadingLayout from "./ProductDetailLoadingLayout";
import BreadCrumbs from "./ProductDetails/BreadCrumbs";
import CheckStockAvailability from "./ProductDetails/CheckStockAvailabilty";
import ProductDetail from "./ProductDetails/ProductDetail";
import ProductItemsOptions from "./ProductDetails/ProductItemsOptions";
import ProductEnlargeImage from "./ProductEnlargeImage";
import ProductSpecificationMaster from "./ProductSpecifications/ProductSpecificationMaster";
const ProductDetailMaster = () => {
  const {
    productDetailData,
    productVariants,
    selectedVariant,
    thumbnailOfVariants,
    handleVariantSelect,
    productImages,
    handleQuantity,
    handleQuantityIncrement,
    handleQuantityDecrement,
    productQuantity,
    minQty,
    stockAvailabilityTextChanges,
    checkStock,
    handleStockAvail,
    stockAvailability,
    testBtn,
    doesSelectedVariantDoesNotExists,
    stockDoesNotExistsForSelectedVariants,
    productItemOptions,
    productDetailLoading,
  } = useProductDetail();
  console.log(productDetailLoading, "productDetailData");
  return (
    <div className="">
      <div className="container product_detail_container">
        <div className="row">
          <div className="col-12 mt-4">
            <BreadCrumbs />
          </div>
          {productDetailLoading === true ? (
            <div className="row justify-content-center">
              {[...Array(1)].map(() => (
                <>
                  <div className="col-lg-12 mx-auto">
                    <ProductDetailLoadingLayout />
                  </div>
                </>
              ))}
            </div>
          ) : (
            <>
              {Object?.keys(productDetailData)?.length > 0 ? (
                <>
                  <div className="col-lg-6">
                    <ProductEnlargeImage productImages={productImages} />
                  </div>
                  <div className="col-lg-6">
                    <ProductDetail
                      productDetailData={productDetailData}
                      productVariants={productVariants}
                      selectedVariant={selectedVariant}
                      thumbnailOfVariants={thumbnailOfVariants}
                      handleVariantSelect={handleVariantSelect}
                      handleQuantity={handleQuantity}
                      handleQuantityIncrement={handleQuantityIncrement}
                      handleQuantityDecrement={handleQuantityDecrement}
                      productQuantity={productQuantity}
                      minQty={minQty}
                      stockAvailabilityTextChanges={
                        stockAvailabilityTextChanges
                      }
                      handleStockAvail={handleStockAvail}
                      testBtn={testBtn}
                      productDetailLoading={productDetailLoading}
                      doesSelectedVariantDoesNotExists={
                        doesSelectedVariantDoesNotExists
                      }
                      stockDoesNotExistsForSelectedVariants={
                        stockDoesNotExistsForSelectedVariants
                      }
                    />
                  </div>
                </>
              ) : (
                <Norecord
                  heading="Product Not Found!!"
                  content="This Particular Product is not Available Right Now. Soon you can purchase it."
                />
              )}
            </>
          )}
        </div>
        {checkStock === true && (
          <div className="col-lg-12 mt-5">
            <CheckStockAvailability stockAvailability={stockAvailability} />
          </div>
        )}
      </div>
      <div className="mb-2">
        {productDetailData?.prod_specifications?.length > 0 && (
          <ProductSpecificationMaster
            specifications={productDetailData?.prod_specifications}
          />
        )}
      </div>
      {productItemOptions?.length > 0 &&
        productItemOptions !== null &&
        productItemOptions.map((items: any, index: any) => {
          return (
            <>
              <div key={index}>
                {items?.values?.length > 0 && (
                  <ProductItemsOptions items={items} />
                )}
              </div>
            </>
          );
        })}
    </div>
  );
};
export default ProductDetailMaster;
