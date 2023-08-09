import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickOrderCard from "./QuickOrderCard";
import { useQuickOrder } from "../../hooks/GeneralHooks/QuickOrderHooks/quick-order-hook";
// import { dealerAddCartApi } from "../store/slices/cart_page_slice/dealer_addto_cart_slice";
import { useRouter } from "next/router";
import AddToCartApi from "../../services/api/cart-page-api/add-to-cart-api";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";

const QuickOrder = () => {
  const {
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
    selected_currency
  } = useQuickOrder();
  console.log("enter part", partNumbersData);
  const router = useRouter();
  const [ItemCodename, setItemCodename] = useState();
  const [ItemCodeMinQty, setItemCodeMinQty] = useState();

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

  const handleInputChange = (e: any, index: any) => {
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

  let handleRemove = (item: any) => {
    console.log("enter name", item);
    const data = partNumbersData.filter(
      (element: any, i: any) => element.name !== item.name
    );
    setPartNumbersData(data);
  };
  const handleAddCart = async () => {
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
    await AddToCartApi(addCartData, selected_currency,token_value);
    // dispatch(dealerAddCartApi(addCartData));
    handleClearReduxStore();

    router.push("/cart");
  };
  const showMinQty = (wholeProductData: any) => {
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
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <h3>{selectedMultiLangData?.quick_order}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <p>
                {
                  selectedMultiLangData?.you_can_add_upto_25_valid_item_code_oem_part_no_below
                }
              </p>
            </div>
            <div className="col-6">
              <div className="d-flex">
                <button
                  type="button"
                  className="w-50 mb-3 text-uppercase py-2 px-1 me-3"
                  style={{border:'1px solid #0071DC',borderRadius:"7px",backgroundColor:"#0071DC", color:"#fff"}}
                  onClick={handleClearReduxStore}
                  >
                  {selectedMultiLangData?.reset_form}
                </button>
                <button
                  type="button"
                  className="w-50 text-white mb-3 text-uppercase py-2 px-1 standard_btn me-3"
                  style={{border:'1px solid #0071DC',borderRadius:"7px", backgroundColor:"#0071DC", color:"#fff"}}
                  onClick={handleAddCart}
                >
                  {selectedMultiLangData?.add_to_cart}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row cart_heading_bg cart_wrapper">
            <div className="col-3 text-start">
              <h5 className="mb-0 pt-2"> {selectedMultiLangData?.image}</h5>
            </div>
            <div className="col-3 text-start">
              <h5 className="mb-0 pt-2"> {selectedMultiLangData?.details}</h5>
            </div>
            <div className="col-2">
              <h5 className="mb-0 pt-2"> {selectedMultiLangData?.price}</h5>
            </div>
            <div className="col-2">
              <h5 className="mb-0 pt-2">
                {" "}
                {selectedMultiLangData?.quantity_c}
              </h5>
            </div>
            <div className="col-2">
              <h5 className="mb-2 pt-2"> {selectedMultiLangData?.total}</h5>
            </div>
          </div>
          <hr />
        </div>

        <div className="col-12 mt-3 mb-3">
          <QuickOrderCard
            partNumbersData={partNumbersData}
            handleRemove={handleRemove}
            showMinQty={showMinQty}
            handleInputChange={handleInputChange}
            selectedMultiLangData={selectedMultiLangData}
          />
        </div>

        <div className="col-12 mt-5 mb-5">
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
