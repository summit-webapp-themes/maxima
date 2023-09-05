import { ProductsProps } from "../../../interfaces/products-view-interface";
import ProductListViewCard from "../../../cards/product-list-view-card";
import ListViewLoadingLayout from "./ListViewLoadingLayout";
import { Norecord } from "../../NoRecord";
import ReactPaginate from "react-paginate";

const ProductsListView = (props: ProductsProps) => {
  const {
    productListTotalCount,
    loading,
    product_data,
    filtersData,
    handleRenderingOfImages,
    wishlistData,
    handleLoadMore,
    currency_state_from_redux,
    selectedMultiLangData,
    catalogListItem,
    handleAddProduct,
    handleSubmitCatalogName,
    handleChange,
    pageCount,
    handlePageClick,
    pageOffset,
  } = props;

  console.log("load moreee", productListTotalCount, product_data);

  const isNextButtonDisabled: any =
    productListTotalCount > product_data ||
    productListTotalCount === product_data;
  return (
    <div
      className={`${
        filtersData && filtersData?.length > 0 ? "col-lg-9" : "col-lg-12"
      }`}
    >
      {loading ? (
        <div className="row justify-content-center">
          {[...Array(10)].map(() => (
            <>
              <div className="col-lg-12 mx-3">
                <ListViewLoadingLayout />
              </div>
            </>
          ))}
        </div>
      ) : (
        <div className="row ">
          {product_data && product_data.length > 0 ? (
            product_data.map((product: any, index: number) => {
              return (
                <div key={index} className="p-0 mt-0 my-2">
                  <ProductListViewCard
                    currency_state_from_redux={currency_state_from_redux}
                    product_data={product}
                    key={index}
                    wishlistData={wishlistData}
                    handleRenderingOfImages={handleRenderingOfImages}
                    selectedMultiLangData={selectedMultiLangData}
                    catalogListItem={catalogListItem}
                    handleAddProduct={handleAddProduct}
                    handleSubmitCatalogName={handleSubmitCatalogName}
                    handleChange={handleChange}
                  />
                </div>
              );
            })
          ) : (
            <Norecord
              heading=""
              content="Looking for something specific but couldn't find it?"
              selectedMultiLangData={selectedMultiLangData}
            />
          )}

          {product_data?.length > 0 && (
            <div>
              <ReactPaginate
                previousLabel={selectedMultiLangData?.prev}
                nextLabel={selectedMultiLangData?.next}
                pageCount={pageCount}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                // nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                nextLinkClassName={
                  isNextButtonDisabled ? "paginationDisabled" : "nextBttn"
                }
                activeClassName={"paginationActive"}
                forcePage={pageOffset}
              />
            </div>
          )}
        </div>
      )}

      {/* {productListTotalCount > product_data?.length && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="btn btn-primary my-5"
            style={{ border: '1px solid #0071DC', borderRadius: "7px", backgroundColor: "#fff" }}
            onClick={handleLoadMore}
          >
            {selectedMultiLangData?.load_more}
          </button>
        </div>
      )} */}
    </div>
  );
};
export default ProductsListView;
