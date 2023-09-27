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
import { get_access_token } from "../store/slices/auth/token-login-slice";
import { SelectedFilterLangDataFromStore } from "../store/slices/general_slices/selected-multilanguage-slice";
import DeleteProductFromCart from "../services/api/cart-page-api/delete-cart-product";
import { fetchOrderSummary } from "../store/slices/checkoutPage-slice/order-summary";
import ListViewLoadingLayout from "./ProductListingComponents/products-data-view/ListViewLoadingLayout";
import { showToast } from "./ToastNotificationNew";
import ReactGA from "react-ga";

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
  const [quatationPrint ,setQuatationPrint] =useState("")
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
      showToast("Item delete from cart", "success");
    } else {
      showToast("Failed to delete from cart", "error");
    }
  };

  const handleQuotation = async (e: any, quot_id: any) => {
    e.preventDefault();
    console.log("quot in api", quot_id);
    const getQuotationInCart = await getQuotationCart(
      quot_id,
      TokenFromStore?.token
    ).then((res: any) => {
    setQuatationPrint(res?.data?.message?.data?.print_url)
    window.open (`${res?.data?.message?.data?.print_url}` , '_blank')
    });
    console.log(getQuotationInCart,"getQuotationInCart")

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

  return (
    <div className="container margin_from_nav  mb-0 ">
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
            <div className="cart-ps-container">
              <div className="row">
                <div className="col-9">
                  <div className="cart_heading mb-3">
                    <h2 className=" shopping-cart-heading products-name pb-4">
                      {selectedMultiLangData?.shopping_cart}
                    </h2>
                  </div>
                </div>

                <div className="col-3 d-flex justify-content-end">
                  <p className="checkbox-cursor product-font-family">
                    <a
                      className="clear_cart bold"
                      onClick={() => ClearCartHandle(cartListingItems.name)}
                    >
                      {selectedMultiLangData?.clear_cart}
                    </a>
                  </p>
                </div>
              </div>

              {/* <div className="row">
                <div className="col-md-6"> */}
              {/* <h5>
                    {" "}
                    {selectedMultiLangData?.customer_name}:{" "}
                    {cartListingItems?.party_name}{" "}
                  </h5> */}
              {/* </div> */}
              {/* <div className="col-md-6 d-flex justify-content-end " >
                  <div className="me-5">
                    <p className="checkbox-cursor product-font-family">
                      <a
                        className="clear_cart bold"
                        onClick={() => ClearCartHandle(cartListingItems.name)}
                      >
                        {selectedMultiLangData?.clear_cart}
                      </a>
                    </p>
                  </div> */}
              {/* <div>
                    <p className="checkbox-cursor">
                      <a
                        className="clear_cart"
                        onClick={() => callUpdateCartAPI()}
                      >
                        {selectedMultiLangData?.update_cart}
                      </a>
                    </p>
                  </div> */}
              {/* </div>
              </div> */}

              <div className="row cart_wrapper ">
                {/* <div className="col-12">
                  <div className="row justify-content-between"> */}
                {/* <div className="col-md-4 text-center">
                      <button
                        type="button"
                        className="w-75 checkout_button mb-3 text-uppercase py-2 px-1 cart-new-btns"
                        // style={{border:'1px solid #0071DC',borderRadius:"7px", backgroundColor:"#fff"}}
                        onClick={goToHomeCheckout}
                      >
                        {selectedMultiLangData?.continue_shopping}
                      </button>
                    </div> */}
                {/* <div className="col-md-4 text-center" >
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
                    </div> */}
                {/* <div className="col-md-4 text-center " >
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
                    </div> */}
                {/* </div>
                </div> */}
                {/* <hr />
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
                <hr /> */}

                <div className="col-12 ">
                  {cartListingItems?.categories?.length > 0 &&
                    cartListingItems?.categories !== null &&
                    cartListingItems?.categories.map(
                      (category: any, index: any) => {
                        return (
                          <>
                            <div key={index} className="border ">
                              <div className="container">
                                <h3 className="mt-2 text-decoration-underline products-name category-name-font">
                                  {category.category}
                                </h3>

                                <div className="col-12 ">
                                  <div className="row cart_heading_bg my-auto products-name ">
                                    <div className="col-md-2 col-12">
                                      <h6 className="mt-4">
                                        {" "}
                                        {/* {selectedMultiLangData?.image} */}
                                      </h6>
                                    </div>
                                    <div className="col-md-10 col-12 d-lg-block d-none products-name">
                                      <div className="row text-center products-name product-captilise ">
                                        <div className="col-7 text-start my-0 products-name">
                                          <h6 className="mt-4">
                                            {
                                              selectedMultiLangData?.item_with_desc
                                            }
                                          </h6>
                                        </div>
                                        <div className="col-2 my-0 ">
                                          <h6 className="mt-4">
                                            {selectedMultiLangData?.price}
                                          </h6>
                                        </div>
                                        <div className="col-1">
                                          <h6 className="mt-4">
                                            {selectedMultiLangData?.quantity_c}
                                          </h6>
                                        </div>
                                        {/* <div className="col-1">
                                        <h6 className="mt-4">
                                          {selectedMultiLangData?.unit_weight}
                                        </h6>
                                      </div>
                                      <div className="col-1">
                                        <h6 className="mt-4 ms-2" >
                                          {selectedMultiLangData?.total_weight}
                                        </h6>
                                      </div> */}
                                        {/* <div className="col-1">
                                        <h6 className="mt-4">
                                          {selectedMultiLangData?.tax}
                                        </h6>
                                      </div> */}
                                        {/* <div className="col-1">
                                        <h6 className="mt-4">
                                          {selectedMultiLangData?.quantity_c}
                                        </h6>
                                      </div> */}
                                        <div className="col-2">
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
                                            <div className="row products-name pt-2">
                                              <div className="col-lg-2  text-center products-name cart-image pb-3">
                                                {handleRenderingOfCartImages(
                                                  orders
                                                )}
                                              </div>
                                              <div className="col-lg-10  products-name">
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
                            </div>
                          </>
                        );
                      }
                    )}
                </div>

                <hr />
                <div className="container mb-0 pb-0">
                  <div className="col-12">
                    <div className="row justify-content-start product-font">
                      <div className="col-md-6 note-line-height">
                        <h5>{selectedMultiLangData?.note}:-</h5>
                        <p className="note-line-height">
                          {selectedMultiLangData?.note_1}
                        </p>
                        <p className="note-line-height">
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
                      <div className="col-md-6 text-start  cart-total">
                        {!orderSummaryForCart ? null : (
                          <>
                            <div className="row justify-content-end">
                              <div className="col-lg-4 col-4 bold products-name ">
                                {" "}
                                {selectedMultiLangData?.sub_total}{" "}
                              </div>
                              :
                              <div className="col-lg-3 col-6 text-end price_font_family products-name bold">
                                {
                                  cartListingItems?.categories[0]?.orders[0]
                                    ?.currency_symbol
                                }{" "}
                                {orderSummaryForCart[0]?.value}{" "}
                              </div>
                            </div>
                            <div className="row justify-content-end products-name bold">
                              <div className="col-lg-4 col-4 tax-captilise">
                                {" "}
                                {/* <span className="tax-captilise">{selectedMultiLangData?.tax}{" "}</span>   */}
                              </div>
                              {/* : */}
                              <div className="col-lg-3 col-6 text-end price_font_family products-name bold">
                                {
                                  // cartListingItems?.categories[0]?.orders[0]
                                  //   ?.currency_symbol
                                }
                                {/* <IndianNumber
                                value={orderSummaryForCart[1]?.value}
                              /> */}
                              </div>
                            </div>
                            <div className="row justify-content-end ">
                              <div className="col-lg-4 col-4 products-name bold">
                                {" "}
                                {
                                  selectedMultiLangData?.order_total_including_tax
                                }
                              </div>
                              :
                              <div className="col-lg-3 col-6 text-end products-name bold d-inline-flex">
                                {
                                  cartListingItems?.categories[0]?.orders[0]
                                    ?.currency_symbol
                                }
                                <IndianNumber
                                  value={orderSummaryForCart[10]?.value}
                                />
                              </div>
                              <div className="col-6 ">
                                <div className="row">
                                  <div className="col-12 mt-4">
                                    <div className="text-center">
                                      <Link href="">
                                        <button
                                          type="button"
                                          className=" checkout_button mb-3 requets-mob text-uppercase py-2 px-1 cart-new-btns checkout-btn-link product-font-family"
                                          onClick={(e: any) =>
                                            handleQuotation(
                                              e,
                                              cartListingItems.name
                                            )
                                          }
                                        >
                                          {
                                            selectedMultiLangData?.request_for_quotation
                                          }
                                        </button>
                                      </Link>
                                    </div>
                                  </div>

                                  <div className="col-12  cart-btn-lower-web cart-btn-lower-mob">
                                    <div>
                                      <p className="checkbox-cursor">
                                        <a
                                          className="clear_cart bold update-cart-mob"
                                          onClick={() => callUpdateCartAPI()}
                                        >
                                          {selectedMultiLangData?.update_cart}
                                        </a>
                                      </p>
                                    </div>
                                    <div className=" text-center ">
                                      <Link href="/checkout">
                                        <button
                                          type="button"
                                          className="w-100 checkout_button mb-3 text-uppercase  px-3 product-font-family py-3"
                                          style={{
                                            backgroundColor: "#0071DC",
                                            color: "#fff",
                                            borderRadius: "7px",
                                          }}
                                          onClick={goToCheckout}
                                        >
                                          {
                                            selectedMultiLangData?.order_checkout
                                          }
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
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
