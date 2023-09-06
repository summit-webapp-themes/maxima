import React, { useState } from "react";
import Link from "next/link";
import IndianNumber from "../components/CheckoutPageComponent/IndianNumber";
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

const CartCard = ({
  orders,
  index,
  selectedMultiLangData,
  arrayofSelectedItems,
  updateCart,
  HandleDeleteCart,
  cartListingItems,
}: any) => {
  console.log("cart orders card data", orders);
  const dispatch = useDispatch();
  const cart_listing_data_store = useSelector(cart_listing_state);
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const TokenFromStore: any = useSelector(get_access_token);
  // const [cartQty, setCartQty] = useState(orders.qty);

  const handleInputChange = (e: any, index: any) => {
    console.log("cart input", e.target.value, index);
    const numericValue = e.target.value.replace(/\D/g, "");
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

  const showValueOfItem = () => {
    const desiredObj = arrayofSelectedItems.find(
      (obj: any) => obj.item_code === orders?.item_code
    );
    return desiredObj?.quantity;
  };

  return (
    <>
      <div className="d-lg-block d-none cart_wrapper-detail" >
        <div className="row text-center ">
          <div className="col-lg-7 text-start">
            <Link
              href={`${orders.product_url}?currency=${currency_state_from_redux?.selected_currency_value}`}
              legacyBehavior
            >
              <a className="prod_name products-name">{orders.item_name}</a>
            </Link>
            <br />
            <b className="products-name item-code-line-height">Item code : {orders.item_code}</b>
            <p>
              <button
                className="astext product-font-family line-height"
                onClick={() =>
                  HandleDeleteCart(orders.item_code, cartListingItems.name)
                }
              >
                <Link href="" className="text-primary product-font-family line-height-delete">
                  {selectedMultiLangData?.delete}
                </Link>
              </button>
            </p>
          </div>
          <div className="col-lg-2 col-3">
            {orders?.details.length > 0 &&
              orders?.details !== null &&
              (orders?.details[1]?.value !== 0 ? (
                <p className="text-center price_font_family products-name">
                  {orders?.currency_symbol}
                  <span className="text-center products-name">
                    <IndianNumber value={orders.details[1]?.value} />
                  </span>
                </p>
              ) : (
                <p className="border button_color price_request products-name ">
                  {selectedMultiLangData?.price_on_request}
                </p>
              ))}
          </div>
          <div className="col-lg-1 col-2">
            <input
              type="text"
              className="w-75 text-center products-name"
              value={showValueOfItem()}
              onChange={(e: any) => {
                updateCart(orders.item_code, e.target.value);
              }}
            />
          </div>
          {/* <div className="col-1 ">
            <p className="products-name">{orders.weight_per_unit}</p>
          </div>
          <div className="col-1">
            <p className="products-name">{orders.total_weight}</p>
          </div> */}
          {/* <div className="col-1 price_font_family">
            <p className="products-name">
              {orders.currency_symbol}
              {orders.tax}
            </p>
          </div> */}
          {/* <div className="col-lg-1 col-2">
            <input
              type="text"
              className="w-75 text-center products-name"
              value={showValueOfItem()}
              onChange={(e: any) => {
                updateCart(orders.item_code, e.target.value);
              }}
            />
          </div> */}
          <div className="col-2 price_font_family">
            <p className="products-name">
              {orders.currency_symbol}
              {orders.amount}
            </p>
          </div>
        </div>
      </div>

      {/* For mobile responsive */}
      <div className="d-lg-none d-block">
        <div className="row">
          <div className="col-6 fs-4 products-name">
            {" "}
            {selectedMultiLangData?.item_with_desc}
          </div>
          :
          <div className="col-5">
            <Link href={`${orders.product_url}`} legacyBehavior>
              <a className="prod_name products-name">{orders.item_name}</a>
            </Link>
            <b>{orders.item_code}</b>
            <p className="my-0">
              <button
                className="astext"
                onClick={() =>
                  HandleDeleteCart(orders.item_code, cartListingItems.name)
                }

              >
                <Link href="" className="text-primary">
                  {selectedMultiLangData?.delete}
                </Link>
              </button>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 fs-4 products-name"> {selectedMultiLangData?.price}</div>:
          <div className="col-5 text-start">
            {orders?.details.length > 0 &&
              orders?.details !== null &&
              (orders.details[1]?.value !== 0 ? (
                <p className="text-start my-0">
                  {" "}
                  <i className="fa fa-inr" aria-hidden="true"></i>{" "}
                  <span className="text-center products-name">
                    <IndianNumber value={orders.details[1]?.value} />
                  </span>
                </p>
              ) : (
                <p className="border button_color price_request products-name">
                  {selectedMultiLangData?.price_on_request}
                </p>
              ))}
          </div>
        </div>
        <div className="row">
          <div className="col-6 fs-4 products-name">{selectedMultiLangData?.unit_weight}</div>
          :<div className="col-5 text-start products-name">{orders.weight_per_unit}</div>
        </div>
        <div className="row">
          <div className="col-6 fs-4 products-name">
            {selectedMultiLangData?.total_weight}
          </div>
          :<div className="col-5 text-start products-name">{orders.total_weight}</div>
        </div>
        <div className="row">
          <div className="col-6 fs-4 products-name">
            {selectedMultiLangData?.tax} </div>:
          <div className="col-5 text-start price_font_family" >
            {orders.currency_symbol}
            {orders.tax}
          </div>
        </div>
        <div className="row my-5">
          <div className="col-6 fs-4 products-name">{selectedMultiLangData?.quantity_c} </div>
          :
          <div className="col-5 ">
            <input
              type="text"
              className="w-50 text-start products-name"
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
          <div className="col-6 fs-4 products-name">{selectedMultiLangData?.total} </div>:
          <div className="col-5 price_font_family products-name">
            {orders.currency_symbol}
            {orders.amount}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
