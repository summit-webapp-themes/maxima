import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickOrderCard from "./QuickOrderCard";
import { useQuickOrder } from "../../hooks/GeneralHooks/QuickOrderHooks/quick-order-hook";
// import { dealerAddCartApi } from "../store/slices/cart_page_slice/dealer_addto_cart_slice";
import { useRouter } from "next/router";
import AddToCartApi from "../../services/api/cart-page-api/add-to-cart-api";

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
    handleClearReduxStore 
  } = useQuickOrder();
  console.log("enter part", partNumbersData);
  const router = useRouter();
const[ ItemCodename, setItemCodename] = useState();
const[ ItemCodeMinQty, setItemCodeMinQty] = useState()

  const handleInputChange = (e:any, index:any) => {
    const { value } = e.target;
    console.log("enter min val", value);

    setPartNumbersData((prevState:any) => {
      const updatedPartNumbersData =   [...partNumbersData];
      updatedPartNumbersData[index] = {
        ...updatedPartNumbersData[index],
        min_order_qty: value === '0' || value === ""? '' : Number(value),
        
      };
      console.log("enter index",updatedPartNumbersData[index] , index)
      return updatedPartNumbersData;
    });

  };

  let handleRemove = (item: any) => {
    console.log("enter name", item);
const data = partNumbersData.filter((element:any,i:any)=>(element.name !== item.name))
  setPartNumbersData(data)

  };
  const handleAddCart = async () => {
    const addCartData:any = [];
    partNumbersData
    ?.filter(
      (element: any, i: any) =>
        i ===
        partNumbersData?.findIndex(
          (elem: any) =>
            elem?.oem_part_number === element?.oem_part_number
        )
    ).map((val:any)=>{
      addCartData.push({item_code:val?.name,quantity:val?.min_order_qty})
    })
    console.log(ItemCodename,"mmmm")
   await AddToCartApi(addCartData)
    // dispatch(dealerAddCartApi(addCartData));
    handleClearReduxStore();

    router.push("/cart");
  };
  const showMinQty = (wholeProductData:any) =>
  {
    const productData = minQty.find((val:any)=>val.item_code === wholeProductData.name)
    return(
      <>
      {
       productData?.minQuantity === 0 ? "":
        <p>Min Qty: {productData?.minQuantity}</p> 
      }
      </>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>Quick Order</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <p>You can add upto 25 valid item code &amp; OEM part no below</p>
            </div>
            <div className="col-6">
              <div className="d-flex">
                <button
                  type="button"
                  className="w-50 text-white checkout_button mb-3 text-uppercase py-2 px-1 yellow_btn me-3"
                  onClick={handleClearReduxStore}
                >
                  Reset Form
                </button>
                <button
                  type="button"
                  className="w-50 text-white checkout_button mb-3 text-uppercase py-2 px-1 yellow_btn me-3"
                  onClick={handleAddCart}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row cart_heading_bg cart_wrapper">
            <div className="col-3 text-start">
              <h5 className="mb-0 pt-2">IMAGE</h5>
            </div>
            <div className="col-3 text-start">
              <h5 className="mb-0 pt-2">Details</h5>
            </div>
            <div className="col-2">
              <h5 className="mb-0 pt-2">PRICE</h5>
            </div>
            <div className="col-2">
              <h5 className="mb-0 pt-2">QTY</h5>
            </div>
            <div className="col-2">
              <h5 className="mb-2 pt-2">TOTAL</h5>
            </div>
          </div>
          <hr />
        </div>

        <div className="col-12">
          <QuickOrderCard partNumbersData={partNumbersData} handleRemove={handleRemove} showMinQty={showMinQty} handleInputChange={handleInputChange}/>
        </div>

        <div className="col-12">
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
                placeholder="item code & OEM part no."
              />
            </div>
          )}
 
          {ifInputEmptyErr && (
            <div className="mt-3">
              <span className="error-color">Please Add Part Number </span>
            </div>
          )}
          {ifPartNumberExistsErr && (
            <div className="mt-3">
              <span className="error-color">
                This Part Number is Already Added in the List.{" "}
              </span>
            </div>
          )}

          {inputFieldCount === 25 && (
            <div className="mt-3">
              <span className="error-color">
                You have added 25 Part Numbers.
              </span>
            </div>
          )}
          {itemNotFoundErr && (
            <div className="mt-3">
              <span className="error-color">
                Data Not Found for this Part Number
              </span>
            </div>
          )}
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <p>You can add upto 25 valid item code &amp; OEM part no below</p>
            </div>
            <div className="col-6">
              <div className="d-flex">
                <button
                  type="button"
                  className="w-50 text-white checkout_button mb-3 text-uppercase py-2 px-1 yellow_btn me-3"
                  // onClick={handleClearReduxStore}
                >
                  Reset Form
                </button>
                <button
                  type="button"
                  className="w-50 text-white checkout_button mb-3 text-uppercase py-2 px-1 yellow_btn me-3"
                  onClick={handleAddCart}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickOrder;
