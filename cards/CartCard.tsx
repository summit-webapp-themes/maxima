import React, { useState } from "react";
import Link from "next/link";
import IndianNumber from "../components/CheckoutPageComponent/IndianNumber";
import AddToCartApi from "../services/api/cart-page-api/add-to-cart-api";
import { useDispatch, useSelector } from "react-redux";
import {
  cart_listing_state,
  fetchCartListing,
} from "../store/slices/cart-listing-page-slice/cart-listing-slice";
import DeleteProductFromCart from "../services/api/cart-page-api/delete-cart-product";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../store/slices/general_slices/toast_notification_slice";
import { fetchOrderSummary } from "../store/slices/checkoutPage-slice/order-summary";
import { product_listing_selector_state } from "../store/slices/product-listing-page-slices/product-listing-slice";
import { currency_selector_state } from "../store/slices/general_slices/multi-currency-slice";
import { get_access_token } from "../store/slices/auth/token-login-slice";

const CartCard = ({ orders, index, selectedMultiLangData,arrayofSelectedItems,updateCart }: any) => {
  console.log("cart orders card data", orders);
  const dispatch = useDispatch();
  const tokens = useSelector(get_access_token);
  const cart_listing_data_store = useSelector(cart_listing_state);
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const product_listing_state_from_redux: any = useSelector(
    product_listing_selector_state
  );
  // const [cartQty, setCartQty] = useState(orders.qty);

  const handleInputChange = (e: any, index: any) => {
    console.log("cart input", e.target.value, index);
    const numericValue = e.target.value.replace(/\D/g, "");
    // setCartQty(numericValue);
  };

  // const UpdateCart = async (item_code: any) => {
  //   let AddToCartRes: any = await AddToCartApi(item_code, cartQty);
  //   console.log(" cart updated", AddToCartRes);
  //   if (AddToCartRes.msg === "success") {
  //     dispatch(fetchCartListing());
  //     if (Object.keys(cart_listing_data_store?.data).length > 0) {
  //       dispatch(fetchOrderSummary(cart_listing_data_store?.data?.name));
  //     }
  //   }
  // };

  const showValueOfItem = () =>
  {
    const desiredObj = arrayofSelectedItems?.find((obj:any) => obj.item_code === orders?.item_code);
    return desiredObj?.quantity;
  }

  const HandleDeleteCart = async (item_code: any) => {
    let DeleteProduct = await DeleteProductFromCart(item_code,tokens?.token);
    if (DeleteProduct?.data?.message?.msg === "success") {
      dispatch(fetchCartListing());
      if (Object.keys(cart_listing_data_store?.data).length > 0) {
        dispatch(fetchOrderSummary(cart_listing_data_store?.data?.name));
      }
      dispatch(successmsg("Item delete from cart"));
      setTimeout(() => {
        dispatch(hideToast());
      }, 1200);
    } else {
      dispatch(failmsg("Failed to delete from cart"));
      setTimeout(() => {
        dispatch(hideToast());
      }, 1500);
    }
  };
  return (
    <>
      <div className="d-lg-block d-none">
        <div className="row text-center ">
          <div className="col-lg-3 text-start">
            <Link
              href={`${orders.product_url}?currency=${currency_state_from_redux?.selected_currency_value}`}
              legacyBehavior
            >
              <a className="prod_name">{orders.item_name}</a>
            </Link>
            <br />
            <b>{orders.item_code}</b>
            <p>
              <button
                className="astext"
                onClick={() => HandleDeleteCart(orders.item_code)}
              >
                <Link href="" className="text-primary">
                  {selectedMultiLangData?.delete}
                </Link>
              </button>
            </p>
          </div>
          <div className="col-lg-2 col-3">
            {orders?.details.length > 0 &&
              orders?.details !== null &&
              (orders.details[1]?.value !== 0 ? (
                <p className="text-center">
                  {" "}
                  <i className="fa fa-inr" aria-hidden="true"></i>{" "}
                  <span className="text-center">
                    <IndianNumber value={orders.details[1]?.value} />
                  </span>
                </p>
              ) : (
                <p className="border button_color price_request ">
                  {selectedMultiLangData?.price_on_request}
                </p>
              ))}
          </div>
          <div className="col-2">
            <p>{orders.weight_per_unit}</p>
          </div>
          <div className="col-2">
            <p>{orders.total_weight}</p>
          </div>
          <div className="col-1">
            <p>₹ {orders.tax}</p>
          </div>
          <div className="col-lg-1 col-2">
            <input
              type="text"
              className="w-75 text-center"
              value={showValueOfItem()}
              onChange={(e: any) => {
                updateCart(orders.item_code, e.target.value);
              }}
            />
          </div>
          <div className="col-1">
            <p>₹ {orders.amount}</p>
          </div>
        </div>
      </div>

      {/* For mobile responsive */}
      <div className="d-lg-none d-block">
        <div className="row">
          <div className="col-6 fs-4">
            {" "}
            {selectedMultiLangData?.item_with_desc}
          </div>
          :
          <div className="col-5">
            <Link href={`${orders.product_url}`} legacyBehavior>
              <a className="prod_name">{orders.item_name}</a>
            </Link>
            <b>{orders.item_code}</b>
            <p className="my-0">
              <button
                className="astext"
                onClick={() => HandleDeleteCart(orders.item_code)}
              >
                <Link href="" className="text-primary">
                  {selectedMultiLangData?.delete}
                </Link>
              </button>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 fs-4"> {selectedMultiLangData?.price}</div>:
          <div className="col-5 text-start">
            {orders?.details.length > 0 &&
              orders?.details !== null &&
              (orders.details[1]?.value !== 0 ? (
                <p className="text-start my-0">
                  {" "}
                  <i className="fa fa-inr" aria-hidden="true"></i>{" "}
                  <span className="text-center">
                    <IndianNumber value={orders.details[1]?.value} />
                  </span>
                </p>
              ) : (
                <p className="border button_color price_request">
                  {selectedMultiLangData?.price_on_request}
                </p>
              ))}
          </div>
        </div>
        <div className="row">
          <div className="col-6 fs-4">
            {" "}
            {selectedMultiLangData?.unit_weight}
          </div>
          :<div className="col-5 text-start">{orders.weight_per_unit}</div>
        </div>
        <div className="row">
          <div className="col-6 fs-4">
            {" "}
            {selectedMultiLangData?.total_weight}
          </div>
          :<div className="col-5 text-start">{orders.total_weight}</div>
        </div>
        <div className="row">
          <div className="col-6 fs-4">{selectedMultiLangData?.tax} </div>:
          <div className="col-5 text-start">₹ {orders.tax}</div>
        </div>
        <div className="row my-5">
          <div className="col-6 fs-4">{selectedMultiLangData?.quantity_c} </div>
          :
          <div className="col-5 ">
            <input
              type="text"
              className="w-50 text-start"
              value={orders?.qty}
              onChange={(e: any) => {
                handleInputChange(e, index);
              }}
            />
            <br />
            <button
              type="button"
              className="text-start astext"
              // onClick={() => UpdateCart(orders.item_code)}
            >
              <Link href="" legacyBehavior>
                <a className="text-primary">{selectedMultiLangData?.update}</a>
              </Link>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-6 fs-4">{selectedMultiLangData?.total} </div>:
          <div className="col-5 ">₹ {orders.amount}</div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
