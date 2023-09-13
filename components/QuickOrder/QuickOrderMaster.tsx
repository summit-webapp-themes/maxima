import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickOrderCard from "./QuickOrderCard";
import { useQuickOrder } from "../../hooks/GeneralHooks/QuickOrderHooks/quick-order-hook";
// import { dealerAddCartApi } from "../store/slices/cart_page_slice/dealer_addto_cart_slice";
import { useRouter } from "next/router";
import AddToCartApi from "../../services/api/cart-page-api/add-to-cart-api";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";
import { fetchCartListing } from "../../store/slices/cart-listing-page-slice/cart-listing-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const QuickOrder = () => {
  const {
    removeSingleItem,
    partNumbersData,
    setPartNumbersData,
    minQty,
    inputFieldCount,
    ifInputEmptyErr,
    ifPartNumberExistsErr,
    itemNotFoundErr,
    partNumberInputField,
    setPartNumberInputField,
    handleKeyDown,
    handleAddToCartQuickOrder,
    handleClearReduxStore,
    token_value,
    selected_currency,
  } = useQuickOrder();

  const router = useRouter();

  const dispatch = useDispatch();
  const [ItemCodename, setItemCodename] = useState<any>();
  const [ItemCodeMinQty, setItemCodeMinQty] = useState<any>();

  const TokenFromStore: any = useSelector(get_access_token);

  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();

  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);

  const handleInputChange: any = (e: any, index: any) => {
    const { value } = e.target;
    console.log("enter min val", value);

    setPartNumbersData((prevState: any) => {
      const updatedPartNumbersData = [...partNumbersData];
      updatedPartNumbersData[index] = {
        ...updatedPartNumbersData[index],
        min_order_qty: value === "0" || value === "" ? "" : Number(value),
      };
      console.log("enter index", updatedPartNumbersData[index], index);
      return updatedPartNumbersData;
    });
  };

  const handleAddToQuickOrder = () => {
    console.log("click");
  };

  let handleRemove: any = (item: any) => {
    console.log("enter name", item);
    const data = partNumbersData.filter(
      (element: any, i: any) => element.name !== item.name
    );
    setPartNumbersData(data);
    dispatch(removeSingleItem(data));
  };
  const handleAddCart: any = async () => {
    const addCartData: any = [];
    partNumbersData
      ?.filter(
        (element: any, i: any) =>
          i ===
          partNumbersData?.findIndex(
            (elem: any) => elem?.oem_part_number === element?.oem_part_number
          )
      )
      .map((val: any) => {
        addCartData.push({
          item_code: val?.name,
          quantity: val?.min_order_qty === 0 ? 1 : val?.min_order_qty,
        });
      });
    console.log(ItemCodename, "mmmm");
    await AddToCartApi(
      addCartData,
      currency_state_from_redux?.selected_currency_value,
      token_value
    );
    // dispatch(dealerAddCartApi(addCartData));
    handleClearReduxStore();
    dispatch(fetchCartListing(TokenFromStore?.token));

    // router.push("/cart");
  };
  const showMinQty: any = (wholeProductData: any) => {
    const productData = minQty.find(
      (val: any) => val.item_code === wholeProductData.name
    );
    return (
      <>
        {productData?.minQuantity === 0 ? (
          ""
        ) : (
          <p>
            {selectedMultiLangData?.minimum_order_qty}:{" "}
            {productData?.minQuantity}
          </p>
        )}
      </>
    );
  };

  return (
    <div className="container  margin_from_nav_quick_o quickorder-main-conatainer-mob products-name">
      <div className="row  mx-0 mt-5  ">
        <div className="col-lg-12  ">
          <div className="row">
            {/* <div className="col-lg-2"></div> */}
            <div className="col-lg-12 ">
              <h3 className="products-name">
                {selectedMultiLangData?.quick_order}
              </h3>
              <div className="row">
                <div className="col-lg-7 my-lg-2 mt-3">
                  {
                    selectedMultiLangData?.you_can_add_upto_25_valid_item_code_oem_part_no_below
                  }
                </div>
                <div className="col-lg-5">
                  <div className="row mt-lg-0 mt-4 btn-quick-margin">
                    <div className="col-lg-7 col-6 text-end ">
                      <button
                        type="button"
                        className=" mb-3 text-uppercase py-2 px-lg-4 px-5 mt-2 reset-btn-mob"
                        style={{
                          border: "1px solid #0071DC",
                          borderRadius: "7px",
                          backgroundColor: "#0071DC",
                          color: "#fff",
                        }}
                        onClick={handleClearReduxStore}
                      >
                        {selectedMultiLangData?.reset_form}
                      </button>
                    </div>
                    <div className="col-lg-5 col-6 text-end ">
                      <button
                        type="button"
                        className=" text-white mb-3 text-uppercase py-2 px-lg-4 px-5 me-0 standard_btn addtoart-btn mt-2 reset-btn-mob "
                        style={{
                          border: "1px solid #0071DC",
                          borderRadius: "7px",
                          backgroundColor: "#0071DC",
                          color: "#fff",
                        }}
                        onClick={handleAddCart}
                      >
                        {selectedMultiLangData?.add_to_cart}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row  mt-5  table-heading-quick-order-mob products-name  ms-3 me-1 ">
        <div className="col-lg-12 text-center cart_heading_bg">
          <div className="row products_title_quick py-3 ">
            {/* <div className="col-lg-2 cart_heading_bg_none"></div> */}
            <div className="col-lg-2 ">
              <h5 className="mb-0 pt-2 text-start ps-lg-4 ">
                {/* {selectedMultiLangData?.image} */}
              </h5>
            </div>
            <div className="col-lg-6  products-name ">
              <h6 className="mb-0 pt-2 text-start ps-lg-5 font-size-quick">
                {selectedMultiLangData?.details}
              </h6>
            </div>
            <div className="col-lg-1  mx-lg-5 ms-5 ps-5 price-title-margin">
              <h6 className="mb-0 pt-2 text-end ps-lg-5 font-size-quick">
                {selectedMultiLangData?.price}
              </h6>
            </div>
            <div className="col-lg-1 col-1 text-start ms-1 ps-5 qty-title-margin">
              <h6 className="mb-0 pt-2 ps-lg-2 font-size-quick">
                {selectedMultiLangData?.quantity_c}
              </h6>
            </div>
            <div className="col-lg-1 col-1 text-start ms-3 total-tiltle-margin">
              <h6 className="mb-2 pt-2 ps-lg-3 font-size-quick">
                {selectedMultiLangData?.total}
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="row mx-lg-5 mt-3">
        <QuickOrderCard
          partNumbersData={partNumbersData}
          handleRemove={handleRemove}
          showMinQty={showMinQty}
          handleInputChange={handleInputChange}
          selectedMultiLangData={selectedMultiLangData}
        />
      </div>

      <div className="row justify-content-center my-5  py-lg-0 py-1">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 col-12">
          {ifInputEmptyErr && (
            <div className="mt-3">
              <span className="error-color">
                {selectedMultiLangData?.please_add_part_number}{" "}
              </span>
            </div>
          )}
          {ifPartNumberExistsErr && (
            <div className="mt-3">
              <span className="error-color">
                {
                  selectedMultiLangData?.this_part_number_is_already_added_in_the_list
                }{" "}
              </span>
            </div>
          )}

          {inputFieldCount === 25 && (
            <div className="mt-3">
              <span className="error-color">
                {selectedMultiLangData?.you_have_added_25_part_numbers}
              </span>
            </div>
          )}
          {itemNotFoundErr && (
            <div className="mt-3">
              <span className="error-color">
                {selectedMultiLangData?.data_not_found_for_this_part_number}
              </span>
            </div>
          )}

          {inputFieldCount === 25 ? (
            <>
              <input type="text" name="inputValue" value="" disabled />
            </>
          ) : (
            <div className="d-flex ">
              <input
                type="text"
                name="inputValue"
                value={partNumberInputField}
                onChange={(e: any) => setPartNumberInputField(e.target.value)}
                onKeyDown={(e: any) => handleKeyDown(e)}
                placeholder={selectedMultiLangData?.item_code}
              />
              <div className="d-lg-none d-block ms-5">
                <button
                  className="btn btn-primary"
                  onClick={(e: any) => handleKeyDown(e)}
                >
                  Add Product
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickOrder;
