import CardsLoadingLayout from "../../../cards/CardsLoadingLayout";
import ProductCard from "../../../cards/product-card";
import { ProductsViewProps } from "../../../interfaces/products-view-interface";
import styles from "../../../styles/Product_Listing.module.css";
import { Norecord } from "../../NoRecord";
import Topbar from "../Topbar";

const ProductsGridView = (props: ProductsViewProps) => {
  const {
    loading,
    listItems,
    filtersData,
    productListTotalCount,
    handleLoadMore,
    wishlistData,
    currency_state_from_redux,
    selectedMultiLangData,
  } = props;

  console.log("cube in card", listItems);
  return (
    <div
      className={`${
        filtersData && filtersData?.length > 0 ? "col-lg-9" : "col-lg-12"
      }`}
    >
      <div className="row">
        {loading ? (
          <div className="row justify-content-center">
            {[...Array(10)].map(() => (
              <>
                <div className="col-lg-2 mx-3">
                  <CardsLoadingLayout />
                </div>
              </>
            ))}
          </div>
        ) : listItems.length > 0 ? (
          listItems?.map((items: any, index: number) => (
            <div className="col-md-3 mt-3 my-2" key={index}>
              <ProductCard
                key={index}
                name={items?.name}
                item_name={items?.item_name}
                item_slug={items?.product_slug}
                currency_symbol={items?.currency_symbol}
                price={items?.price}
                mrp_price={items?.mrp_price}
                img_url={items?.image_url}
                in_stock_status={items?.in_stock_status}
                url={items?.url}
                brand={items?.brand}
                brand_img={items?.brand_img}
                display_tag={items?.display_tag}
                star_rating={items?.rating}
                wishlistData={wishlistData}
                currency_state_from_redux={currency_state_from_redux}
                selectedMultiLangData={selectedMultiLangData}
              />
            </div>
          ))
        ) : (
          <Norecord
            heading={selectedMultiLangData?.product_not_found}
            content={selectedMultiLangData?.product_not_found_s}
            selectedMultiLangData={selectedMultiLangData}
          />
        )}
      </div>

      {productListTotalCount > listItems?.length && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="btn btn-primary my-5"
            style={{border:'1px solid #0071DC',borderRadius:"7px", backgroundColor:"#fff"}}

            onClick={handleLoadMore}
          >
            {selectedMultiLangData?.load_more}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsGridView;
