import React, { useState } from "react";
import UseCartPageHook from "../hooks/CartPageHooks/cart-page-hook";
import Link from "next/link";
import IndianNumber from "./CheckoutPageComponent/IndianNumber";
import { useRouter } from "next/router";
import Image from "next/image";
import { CONSTANTS } from "../services/config/app-config";
import CartCard from "../cards/CartCard";
import MissingPartsModal from "./ProductListingComponents/MissingPartsModal";
import { useDispatch } from "react-redux";
import ClearCartApi from "../services/api/cart-page-api/clear-cart-api";
import { fetchCartListing } from "../store/slices/cart-listing-page-slice/cart-listing-slice";
import { Norecord } from "./NoRecord";
import UseCheckoutPageHook from "../hooks/CheckoutHooks/checkout-page-hook";
import getQuotationCart from "../services/api/cart-page-api/get-quotation-api";
import {
  hideToast,
  successmsg,
} from "../store/slices/general_slices/toast_notification_slice";

const CartListing = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartListingItems, orderSummaryForCart } = UseCartPageHook();
  // const { orderSummary } = UseCheckoutPageHook();
  // const orderSummary:any = []

  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const [show, setShow] = useState<any>(false);

  const handlemodalOpen = () => {
    setShow(true);
  };
  const handlemodalclose = () => {
    setShow(false);
  };

  const goToHomeCheckout = () => {
    router.push("/");
  };

  const goToCheckout = () => {
    router.push("/checkout");
  };

  const ClearCartHandle = async (quotation_id: any) => {
    let ClearCartRes: any = await ClearCartApi(quotation_id);
    if (ClearCartRes?.status === 200) {
      dispatch(fetchCartListing());
    }
  };

  const handleQuotation = async (e: any, quot_id: any) => {
    e.preventDefault();
    console.log("quot in api", quot_id);
    const getQuotationInCart = await getQuotationCart(quot_id).then(
      (res: any) => {
        if (res?.data?.message?.msg === "success") {
          dispatch(
            successmsg(
              "Quotation Request has been Created. Please check your Profile"
            )
          );
          setTimeout(() => {
            dispatch(hideToast());
          }, 2000);
        }
      }
    );
    return getQuotationInCart;
  };

  const handleRenderingOfCartImages = (item: any) => {
    if (item?.image_url === null || item?.image_url?.length === 0) {
      return (
        <Image
          src={`${item?.brand_img}`}
          className="product_item_img img-fluid"
          alt="product images"
          width={100}
          height={100}
          loader={myLoader}
        />
      );
    } else {
      return (
        <Image
          loader={myLoader}
          src={`${item?.image_url}`}
          className="product_item_img img-fluid addcart_item"
          alt="product images"
          width={100}
          height={100}
        />
      );
    }
  };

  return (
    <>
      {Object.keys(cartListingItems).length > 0 ? (
        <div className="container py-5">
          <div className="cart_heading mb-3">
            <h2 className="text-uppercase">Shopping cart</h2>
          </div>

          <div className="row">
            <div className="col-md-6">
              <h5>Customer name: {cartListingItems?.party_name} </h5>
            </div>
            <div className="col-md-6 text-end">
              <p className="checkbox-cursor">
                <a
                  className="clear_cart"
                  onClick={() => ClearCartHandle(cartListingItems.name)}
                >
                  Clear Cart
                </a>
              </p>
            </div>
          </div>

          <div className="row cart_wrapper">
            <div className="col-12">
              <div className="row justify-content-between">
                <div className="col-md-4 text-left">
                  <button
                    type="button"
                    className="w-75 checkout_button mb-3 text-uppercase py-2 px-1 button_color"
                    onClick={goToHomeCheckout}
                  >
                    CONTINUE SHOPPING(ADD ITEMS)
                  </button>
                </div>
                <div className="col-md-4 text-center">
                  <Link href="">
                    <button
                      type="button"
                      className="w-75 checkout_button mb-3 text-uppercase py-2 px-1 button_color"
                      onClick={(e: any) =>
                        handleQuotation(e, cartListingItems.name)
                      }
                    >
                      REQUEST FOR QUOTATION
                    </button>
                  </Link>
                </div>
                <div className="col-md-4 text-right">
                  <Link href="/checkout">
                    <button
                      type="button"
                      className="w-75 checkout_button mb-3 text-uppercase py-2 px-1 button_color"
                      onClick={goToCheckout}
                    >
                      ORDER CHECKOUT
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <hr />
            <div className="col-12 text-end">
              <h5 className="mb-0 sub-total-h5">
                Sub total ({cartListingItems?.total_qty} Qty):{" "}
                <span>{cartListingItems?.categories[0]?.orders[0]?.currency_symbol}{" "}{cartListingItems?.grand_total_excluding_tax}</span>
                {/* <p></p>
                <IndianNumber
                  value={cartListingItems?.grand_total_excluding_tax}
                /> */}
              </h5>
            </div>
            <hr />

            <div className="col-12 ">
              {cartListingItems?.categories?.length > 0 &&
                cartListingItems?.categories !== null &&
                cartListingItems?.categories.map(
                  (category: any, index: any) => {
                    return (
                      <>
                        <div key={index}>
                          <h3 className="mt-1 text-decoration-underline">
                            {category.category}
                          </h3>
                          <div className="col-12">
                            <div
                              className="row cart_heading_bg my-auto"
                            >
                              <div className="col-md-3 col-12">
                                <h6 className="mt-4">IMAGE</h6>
                              </div>
                              <div className="col-md-9 col-12 d-lg-block d-none">
                                <div className="row text-center ">
                                  <div className="col-3 text-start my-0">
                                    <h6 className="mt-4">
                                      ITEM WITH DESCRIPTION
                                    </h6>
                                  </div>
                                  <div className="col-2 my-0">
                                    <h6 className="mt-4">PRICE</h6>
                                  </div>
                                  <div className="col-2">
                                    <h6 className="mt-4">UNIT WEIGHT(KG)</h6>
                                  </div>
                                  <div className="col-2">
                                    <h6 className="mt-4">
                                      TOTAL WEIGHT(KG)
                                    </h6>
                                  </div>
                                  <div className="col-1">
                                    <h6 className="mt-4">TAX</h6>
                                  </div>
                                  <div className="col-1">
                                    <h6 className="mt-4">QTY</h6>
                                  </div>
                                  <div className="col-1">
                                    <h6 className="mt-4">TOTAL</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <hr />
                          {/* </div> */}
                          {category?.orders?.length > 0 &&
                            category?.orders !== null &&
                            category?.orders.map((orders: any, i: any) => {
                              return (
                                <div key={i}>
                                  <div className="row">
                                    <div className="col-lg-3 text-center">
                                    {handleRenderingOfCartImages(orders)}
                                    </div>
                                    <div className="col-lg-9  ">
                                     <CartCard orders={orders} index={i} />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        </div>
                      </>
                    );
                  }
                )}
            </div>

            <hr />
            <div className="col-12">
              <div className="row justify-content-end" >
                <div className="col-md-6">
                  <h5>Note:-</h5>
                  <p>
                    1. For item marked as POR (price on request),you can
                    checkout and place order.we shall provide you our price
                    offline and process your order after you provide
                    confirmation.
                  </p>
                  <p>
                    2. If you could not find the item you were looking for press{" "}
                    <button
                      onClick={handlemodalOpen}
                      className="missing_parts_btn ps-0"
                    >
                      Missing Parts
                    </button>{" "}
                    to mail us and we will quote to you offline.
                  </p>
                </div>
                <div className="col-md-6 text-end cart-total">
                  {!orderSummaryForCart ? null : (
                    <>
                      <div className="row justify-content-end">
                      <div className="col-md-4"></div>
                        <div className="col-md-4 text-left">Sub Total </div>:
                        <div className="col-md-3 text-end">
                        {cartListingItems?.categories[0]?.orders[0]?.currency_symbol}{" "}{orderSummaryForCart[0]?.value}{" "}
                        </div>
                      </div>
                      <div className="row justify-content-end">
                      <div className="col-md-4"></div>
                        <div className="col-md-4 text-left">Tax </div>:
                        <div className="col-md-3  text-end">
                          <i
                            className="fa fa-inr pe-1 ps-1 bold"
                            aria-hidden="true"
                          ></i>
                          <IndianNumber value={orderSummaryForCart[1]?.value} />
                        </div>
                      </div>
                      <div className="row justify-content-end">
                      <div className="col-md-4"></div>
                        <div className="col-md-4 text-left">
                          {" "}
                          Order Total Including Tax 
                        </div>:
                        <div className="col-md-3 text-end">
                          <i
                            className="fa fa-inr pe-1 ps-1 bold"
                            aria-hidden="true"
                          ></i>
                          <IndianNumber 
                            value={orderSummaryForCart[10]?.value}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      ) : (
        <Norecord
          heading="Your cart is empty!!"
          content="Items added to your cart will show up here"
        />
      )}

      <MissingPartsModal
        show={show}
        handlemodalclose={handlemodalclose}
        setShow={setShow}
      />
    </>
  );
};

export default CartListing;
