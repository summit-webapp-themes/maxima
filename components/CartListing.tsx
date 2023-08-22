import React, { useEffect, useState } from "react";
import UseCartPageHook from "../hooks/CartPageHooks/cart-page-hook";
import Link from "next/link";
import IndianNumber from "./CheckoutPageComponent/IndianNumber";
import { useRouter } from "next/router";
import Image from "next/image";
import { CONSTANTS } from "../services/config/app-config";
import CartCard from "../cards/CartCard";
import MissingPartsModal from "./ProductListingComponents/MissingPartsModal";
import { useDispatch, useSelector } from "react-redux";
import ClearCartApi from "../services/api/cart-page-api/clear-cart-api";
import {
  cart_listing_state,
  fetchCartListing,
} from "../store/slices/cart-listing-page-slice/cart-listing-slice";
import { Norecord } from "./NoRecord";
import UseCheckoutPageHook from "../hooks/CheckoutHooks/checkout-page-hook";
import getQuotationCart from "../services/api/cart-page-api/get-quotation-api";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../store/slices/general_slices/toast_notification_slice";
import { get_access_token } from "../store/slices/auth/token-login-slice";
import { SelectedFilterLangDataFromStore } from "../store/slices/general_slices/selected-multilanguage-slice";
import DeleteProductFromCart from "../services/api/cart-page-api/delete-cart-product";
import { fetchOrderSummary } from "../store/slices/checkoutPage-slice/order-summary";
import ListViewLoadingLayout from "./ProductListingComponents/products-data-view/ListViewLoadingLayout";

const CartListing = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    cartListingItems,
    orderSummaryForCart,
    arrayofSelectedItems,
    updateCart,
    callUpdateCartAPI,
    Loadings,
  } = UseCartPageHook();

  const TokenFromStore: any = useSelector(get_access_token);
  const cart_listing_data_store = useSelector(cart_listing_state);
  // const { orderSummary } = UseCheckoutPageHook();
  // const orderSummary:any = []
  console.log("cartListingItems", cartListingItems, Loadings);

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
    let ClearCartRes: any = await ClearCartApi(
      quotation_id,
      TokenFromStore?.token
    );
    if (ClearCartRes?.status === 200) {
      dispatch(fetchCartListing(TokenFromStore?.token));
    }
  };

  const HandleDeleteCart = async (item_code: any, quotationId: any) => {
    let DeleteProduct = await DeleteProductFromCart(
      item_code,
      quotationId,
      TokenFromStore?.token
    );
    if (DeleteProduct?.data?.message?.msg === "success") {
      dispatch(fetchCartListing(TokenFromStore?.token));
      if (Object.keys(cart_listing_data_store?.data).length > 0) {
        const params = {
          quotationId: cart_listing_data_store?.data?.name,
          token: TokenFromStore?.token,
        };
        dispatch(fetchOrderSummary(params));
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

  const handleQuotation = async (e: any, quot_id: any) => {
    e.preventDefault();
    console.log("quot in api", quot_id);
    const getQuotationInCart = await getQuotationCart(
      quot_id,
      TokenFromStore?.token
    ).then((res: any) => {
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
    });
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

  console.log("selected array of cart", arrayofSelectedItems);

  return (
    <div className="margin_from_nav_l">
      {Loadings === "pending" ? (
        <div className="row justify-content-center">
          {[...Array(10)].map(() => (
            <>
              <div className="col-lg-9 mx-auto">
                <ListViewLoadingLayout />
              </div>
            </>
          ))}
        </div>
      ) : (
        <>
          {Object.keys(cartListingItems).length > 0 ? (
            <div className="container py-5">
              <div className="cart_heading mb-3">
                <h2 className="text-uppercase">
                  {selectedMultiLangData?.shopping_cart}
                </h2>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <h5>
                    {" "}
                    {selectedMultiLangData?.customer_name}:{" "}
                    {cartListingItems?.party_name}{" "}
                  </h5>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <div className="me-5">
                    <p className="checkbox-cursor">
                      <a
                        className="clear_cart"
                        onClick={() => ClearCartHandle(cartListingItems.name)}
                      >
                        {selectedMultiLangData?.clear_cart}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="checkbox-cursor">
                      <a
                        className="clear_cart"
                        onClick={() => callUpdateCartAPI()}
                      >
                        {selectedMultiLangData?.update_cart}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="row cart_wrapper">
                <div className="col-12">
                  <div className="row justify-content-between">
                    <div className="col-md-4 text-center">
                      <button
                        type="button"
                        className="w-75 checkout_button mb-3 text-uppercase py-2 px-1 cart-new-btns"
                        // style={{border:'1px solid #0071DC',borderRadius:"7px", backgroundColor:"#fff"}}
                        onClick={goToHomeCheckout}
                      >
                        {selectedMultiLangData?.continue_shopping}
                      </button>
                    </div>
                    <div className="col-md-4 text-center">
                      <Link href="">
                        <button
                          type="button"
                          className="w-75 checkout_button mb-3 text-uppercase py-2 px-1 cart-new-btns"
                          // style={{border:'1px solid #0071DC',borderRadius:"7px", backgroundColor:"#fff"}}
                          onClick={(e: any) =>
                            handleQuotation(e, cartListingItems.name)
                          }
                        >
                          {selectedMultiLangData?.request_for_quotation}
                        </button>
                      </Link>
                    </div>
                    <div className="col-md-4 text-center">
                      <Link href="/checkout">
                        <button
                          type="button"
                          className="w-75 checkout_button mb-3 text-uppercase py-2 px-1"
                          style={{
                            backgroundColor: "#0071DC",
                            color: "#fff",
                            borderRadius: "7px",
                          }}
                          onClick={goToCheckout}
                        >
                          {selectedMultiLangData?.order_checkout}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-12 text-end">
                  <h5 className="mb-0 sub-total-h5">
                    {selectedMultiLangData?.sub_total} (
                    {cartListingItems?.total_qty}{" "}
                    {selectedMultiLangData?.quantity_c}):{" "}
                    <span>
                      {
                        cartListingItems?.categories[0]?.orders[0]
                          ?.currency_symbol
                      }{" "}
                      {cartListingItems?.grand_total_excluding_tax}
                    </span>
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
                                <div className="row cart_heading_bg my-auto">
                                  <div className="col-md-3 col-12">
                                    <h6 className="mt-4">
                                      {" "}
                                      {selectedMultiLangData?.image}
                                    </h6>
                                  </div>
                                  <div className="col-md-9 col-12 d-lg-block d-none">
                                    <div className="row text-center ">
                                      <div className="col-3 text-start my-0">
                                        <h6 className="mt-4">
                                          {
                                            selectedMultiLangData?.item_with_desc
                                          }
                                        </h6>
                                      </div>
                                      <div className="col-2 my-0">
                                        <h6 className="mt-4">
                                          {selectedMultiLangData?.price}
                                        </h6>
                                      </div>
                                      <div className="col-2">
                                        <h6 className="mt-4">
                                          {selectedMultiLangData?.unit_weight}
                                        </h6>
                                      </div>
                                      <div className="col-2">
                                        <h6 className="mt-4">
                                          {selectedMultiLangData?.total_weight}
                                        </h6>
                                      </div>
                                      <div className="col-1">
                                        <h6 className="mt-4">
                                          {selectedMultiLangData?.tax}
                                        </h6>
                                      </div>
                                      <div className="col-1">
                                        <h6 className="mt-4">
                                          {selectedMultiLangData?.quantity_c}
                                        </h6>
                                      </div>
                                      <div className="col-1">
                                        <h6 className="mt-4">
                                          {selectedMultiLangData?.total}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                {/* </div> */}
                                {category?.orders?.length > 0 &&
                                  category?.orders !== null &&
                                  category?.orders.map(
                                    (orders: any, i: any) => {
                                      return (
                                        <div key={i}>
                                          <div className="row">
                                            <div className="col-lg-3 text-center">
                                              {handleRenderingOfCartImages(
                                                orders
                                              )}
                                            </div>
                                            <div className="col-lg-9  ">
                                              <CartCard
                                                orders={orders}
                                                index={i}
                                                selectedMultiLangData={
                                                  selectedMultiLangData
                                                }
                                                arrayofSelectedItems={
                                                  arrayofSelectedItems
                                                }
                                                updateCart={updateCart}
                                                cartListingItems={
                                                  cartListingItems
                                                }
                                                HandleDeleteCart={
                                                  HandleDeleteCart
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                            </div>
                          </>
                        );
                      }
                    )}
                </div>

                <hr />
                <div className="col-12">
                  <div className="row justify-content-end">
                    <div className="col-md-6">
                      <h5>{selectedMultiLangData?.note}:-</h5>
                      <p>{selectedMultiLangData?.note_1}</p>
                      <p>
                        {selectedMultiLangData?.note_2}{" "}
                        <button
                          onClick={handlemodalOpen}
                          className="missing_parts_btn ps-0"
                        >
                          {selectedMultiLangData?.let_us_now}
                        </button>{" "}
                        {selectedMultiLangData?.to_mail_us}{" "}
                      </p>
                    </div>
                    <div className="col-md-6 text-end cart-total">
                      {!orderSummaryForCart ? null : (
                        <>
                          <div className="row justify-content-end">
                            {/* <div className="col-lg-4 col-4 "></div> */}
                            <div className="col-lg-4 col-4 ">
                              {" "}
                              {selectedMultiLangData?.sub_total}{" "}
                            </div>
                            :
                            <div className="col-lg-3 col-6 text-end">
                              {
                                cartListingItems?.categories[0]?.orders[0]
                                  ?.currency_symbol
                              }{" "}
                              {orderSummaryForCart[0]?.value}{" "}
                            </div>
                          </div>
                          <div className="row justify-content-end">
                            {/* <div className="col-md-4"></div> */}
                            <div className="col-lg-4 col-4 ">
                              {" "}
                              {selectedMultiLangData?.tax}{" "}
                            </div>
                            :
                            <div className="col-lg-3 col-6 text-end">
                              {
                                cartListingItems?.categories[0]?.orders[0]
                                  ?.currency_symbol
                              }
                              <IndianNumber
                                value={orderSummaryForCart[1]?.value}
                              />
                            </div>
                          </div>
                          <div className="row justify-content-end">
                            {/* <div className="col-md-4"></div> */}
                            <div className="col-lg-4 col-4 ">
                              {" "}
                              {selectedMultiLangData?.order_total_including_tax}
                            </div>
                            :
                            <div className="col-lg-3 col-6 text-end">
                              {
                                cartListingItems?.categories[0]?.orders[0]
                                  ?.currency_symbol
                              }
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
              heading={selectedMultiLangData?.cart_is_empty}
              content={selectedMultiLangData?.cart_is_empty_s}
              selectedMultiLangData={selectedMultiLangData}
            />
          )}
        </>
      )}

      <MissingPartsModal
        show={show}
        handlemodalclose={handlemodalclose}
        setShow={setShow}
      />
    </div>
  );
};

export default CartListing;
