import Image from "next/image";
import useProductListing from "../../hooks/product-listing-hooks/product-listing-hook";
import { CONSTANTS } from "../../services/config/app-config";
import Topbar from "./Topbar";
import WebFilters from "./filters-view/web-filters-view";
import ProductsGridView from "./products-data-view/products-grid-view";
import ProductsListView from "./products-data-view/products-list-view";
import useWishlist from "../../hooks/WishListHooks/WishListHooks";
import BreadCrumbs from "../ProductDetailComponents/ProductDetails/BreadCrumbs";
import MobileFilter from "./filters-view/MobileFilter";
import { useEffect, useState } from "react";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import { useSelector } from "react-redux";
import useCatalogHook from "../../hooks/CatalogHooks/catalogHook";

const ProductListingMaster = () => {
  const {
    productsLoading,
    productListingData,
    productListTotalCount,
    filtersLoading,
    filtersData,
    selectedFilters,
    handleApplyFilters,
    toggleProductListView,
    handleToggleProductsListingView,
    handleLoadMore,
    currency_state_from_redux,
    handlePaginationBtn,
  } = useProductListing();
  console.log("cube ", productListingData);
  const { wishlistData }: any = useWishlist();
  const {
    catalogListItem,
    handleAddProduct,
    handleSubmitCatalogName,
    handleChange,
  }: any = useCatalogHook();
  const [pageOffset, setpageOffset] = useState(0);
  const handlePageClick = (event: any) => {
    console.log("page number", event?.selected);
    handlePaginationBtn(event?.selected);
    setpageOffset(event?.selected);
  };

  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();

  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );

  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const pageCount = Math.ceil(productListTotalCount / 8);
  const handleDisplayOfProductsList = () => {
    switch (toggleProductListView) {
      case "list-view":
        return (
          <ProductsListView
            currency_state_from_redux={currency_state_from_redux}
            product_data={productListingData}
            loading={productsLoading}
            filtersData={filtersData}
            handleLoadMore={handleLoadMore}
            productListTotalCount={productListTotalCount}
            handleRenderingOfImages={handleRenderingOfImages}
            wishlistData={wishlistData}
            selectedMultiLangData={selectedMultiLangData}
            catalogListItem={catalogListItem}
            handleAddProduct={handleAddProduct}
            handleSubmitCatalogName={handleSubmitCatalogName}
            handleChange={handleChange}
            pageCount={pageCount}
            handlePageClick={handlePageClick}
            pageOffset={pageOffset}
          />
        );
      case "grid-view":
        return (
          <ProductsGridView
            currency_state_from_redux={currency_state_from_redux}
            loading={productsLoading}
            listItems={productListingData}
            filtersData={filtersData}
            productListTotalCount={productListTotalCount}
            handleLoadMore={handleLoadMore}
            wishlistData={wishlistData}
            selectedMultiLangData={selectedMultiLangData}
            catalogListItem={catalogListItem}
            handleAddProduct={handleAddProduct}
            handleSubmitCatalogName={handleSubmitCatalogName}
            handleChange={handleChange}
            pageCount={pageCount}
            handlePageClick={handlePageClick}
            pageOffset={pageOffset}
          />
        );

      default:
        break;
    }
  };

  const handleRenderingOfImages = (img_url: any, brand_img: any) => {
    if (img_url !== null) {
      return (
        <Image
          loader={myLoader}
          src={img_url}
          // src={maximaCard}
          alt="product-img"
          width={200}
          height={200}
          className="img-fluid"
        />
      );
    } else if (brand_img !== null) {
      return (
        <Image
          loader={myLoader}
          src={brand_img}
          // src={maximaCard}
          alt="product-img"
          width={200}
          height={200}
          className="img-fluid"
        />
      );
    } else {
      console.log("img null");
      return (
        <Image
          src={""}
          // src={maximaCard}
          alt="product-img"
          width={200}
          height={200}
          className="img-fluid"
        />
      );
    }
  };

  console.log("filters product listing in master", filtersData);
  return (
    <>
      <div className="margin_from_nav">
        <section className="listing-page mt-3">
          <div className="container">
            <div className="mt-3">
              <Topbar
                listItems={productListingData}
                handleToggleProductsListingView={
                  handleToggleProductsListingView
                }
                selectedMultiLangData={selectedMultiLangData}
              />
            </div>
            <BreadCrumbs />
            <div className="row mt-2 ">
              <span className="col-lg-3 handle_display_web_filter">
                <WebFilters
                  filtersData={filtersData}
                  loading={filtersLoading}
                  selectedFilters={selectedFilters}
                  handleApplyFilters={handleApplyFilters}
                  productListingData={productListingData}
                  selectedMultiLangData={selectedMultiLangData}
                />
              </span>
              {handleDisplayOfProductsList()}
            </div>
          </div>
        </section>
      </div>

      <div className="handle_display_mob_filter">
        <MobileFilter
          filtersData={filtersData}
          loading={filtersLoading}
          selectedFilters={selectedFilters}
          handleApplyFilters={handleApplyFilters}
          selectedMultiLangData={selectedMultiLangData}
        />
      </div>
    </>
  );
};

export default ProductListingMaster;
