import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickOrderCard from "./QuickOrderCard";
import { useQuickOrder } from "../../hooks/GeneralHooks/QuickOrderHooks/quick-order-hook";
// import { dealerAddCartApi } from "../store/slices/cart_page_slice/dealer_addto_cart_slice";
import { useRouter } from "next/router";
import AddToCartApi from "../../services/api/cart-page-api/add-to-cart-api";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";

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

    router.push("/cart");
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
    <div className="container margin_from_nav">
      <div className="row mt-5 justify-content-center">
        <div className="col-lg-10 col-12 px-2">
          <h3>{selectedMultiLangData?.quick_order}</h3>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-12  text-center px-0">
              {
                selectedMultiLangData?.you_can_add_upto_25_valid_item_code_oem_part_no_below
              }
            </div>
            <div className="col-lg-6 col-12 mt-lg-0 mt-3">
              <div className="row">
                <div className="col-lg-3 col-6 text-center ">
                  <button
                    type="button"
                    className=" mb-3 text-uppercase py-2 px-lg-4 px-5 me-3"
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
                <div className="col-lg-6 col-6">
                  <button
                    type="button"
                    className=" text-white mb-3 text-uppercase py-2 px-lg-4 px-5 standard_btn me-3"
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
              {/* <div className="d-flex justify-content-center mt-2 ">
                <button
                  type="button"
                  className="w-25 mb-3 text-uppercase py-2 px-1 me-3"
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
                <button
                  type="button"
                  className="w-25 text-white mb-3 text-uppercase py-2 px-1 standard_btn me-3"
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
              </div> */}
            </div>
          </div>
        </div>
        <div className="col-lg-10  col-12 mx-auto">
          <div className="row justify-content-center cart_heading_bg cart_wrapper">
            <div className="col-2 text-center">
              <h5 className="mb-0 pt-2"> {selectedMultiLangData?.image}</h5>
            </div>
            <div className="col-lg-4 col-3 text-start">
              <h5 className="mb-0 pt-2 ps-lg-5">
                {" "}
                {selectedMultiLangData?.details}
              </h5>
            </div>
            <div className="col-1 text-start mr-lg-0 mr-3">
              <h5 className="mb-0 pt-2 "> {selectedMultiLangData?.price}</h5>
            </div>
            <div className="col-1 text-center mr-lg-0 mr-3">
              <h5 className="mb-0 pt-2">
                {" "}
                {selectedMultiLangData?.quantity_c}
              </h5>
            </div>
            <div className="col-1 text-end">
              <h5 className="mb-2 pt-2"> {selectedMultiLangData?.total}</h5>
            </div>
          </div>
          <hr />
        </div>

        <div className="col-12 mt-3 mb-5">
          <QuickOrderCard
            partNumbersData={partNumbersData}
            handleRemove={handleRemove}
            showMinQty={showMinQty}
            handleInputChange={handleInputChange}
            selectedMultiLangData={selectedMultiLangData}
          />
          <div className="col-lg-6 mt-5 text-center">
            {inputFieldCount === 25 ? (
              <div>
                <input type="text" name="inputValue" value="" disabled />
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  name="inputValue"
                  value={partNumberInputField}
                  onChange={(e: any) => setPartNumberInputField(e.target.value)}
                  onKeyDown={(e: any) => handleKeyDown(e)}
                  placeholder={selectedMultiLangData?.item_code}
                />
              </div>
            )}
          </div>
        </div>

        <div className="col-12 mt-5 mb-5">
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
        </div>
      </div>
    </div>
  );
};

export default QuickOrder;
