import React, { useEffect, useState } from "react";

import StarRating from "./StarRating";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AddToCartApi from "../../../services/api/cart-page-api/add-to-cart-api";
import VariantsMaster from "../ProductVariants/VariantsMaster";
import { fetchCartListing } from "../../../store/slices/cart-listing-page-slice/cart-listing-slice";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../../../store/slices/general_slices/toast_notification_slice";
import Link from "next/link";
import DealerAddToCartApi from "../../../services/api/cart-page-api/dealer-add-to-cart-api";
import { CONSTANTS } from "../../../services/config/app-config";
import { currency_selector_state } from "../../../store/slices/general_slices/multi-currency-slice";
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  WorkplaceShareButton,
} from "react-share";
import { get_access_token } from "../../../store/slices/auth/token-login-slice";
import { showToast } from "../../ToastNotificationNew";
import ReactGA from "react-ga";
import ValidatePincode from "./ValidatePincode";
const ProductDetail = ({
  productDetailData,
  productVariants,
  selectedVariant,
  thumbnailOfVariants,
  handleVariantSelect,
  handleQuantity,
  handleQuantityIncrement,
  handleQuantityDecrement,
  productQuantity,
  minQty,
  stockAvailabilityTextChanges,
  handleStockAvail,
  doesSelectedVariantDoesNotExists,
  stockDoesNotExistsForSelectedVariants,
  selectedMultiLangData,
  newobjectState,
  setnewObjectState,
  pincodeRes,
  setPincode,
  Loadings
}: any) => {
  const dispatch = useDispatch();
  const TokenFromStore: any = useSelector(get_access_token);
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const [addToCartButtonDisabled, setAddToCartButtonDisabled] = useState(false);
  const router = useRouter();

  const handleVariantsData: any = (newData: any) => {
    console.log("input qty new", newData);
    setnewObjectState(newData);
  };

  console.log("quantity", productQuantity, minQty);

  let isLoggedIn: any;
  let isDealer: any;
  if (typeof window !== "undefined") {
    isLoggedIn = localStorage.getItem("isLoggedIn");
    isDealer = localStorage.getItem("isDealer");
  }

  const handleAddCart: any = async () => {
    setAddToCartButtonDisabled(true);
    let DealerCartNewObjects: any =
      newobjectState &&
      newobjectState?.filter((newitems: any) => newitems.quantity !== "");

    const addCartData: any = [];
    addCartData.push({
      item_code: productDetailData?.name,
      quantity: productQuantity,
    });

    if (isDealer === "true") {
      let AddToCartRes: any = await AddToCartApi(
        DealerCartNewObjects,
        currency_state_from_redux?.selected_currency_value,
        TokenFromStore?.token
      );
      console.log("dealer AddToCartRes", AddToCartRes);
      if (AddToCartRes?.msg === "success") {
        showToast("Item Added to cart", "success");
        setAddToCartButtonDisabled(false);
        ReactGA.event({
          category: productDetailData?.item_name,
          action: "Add Cart",
          label: `${productDetailData?.item_name} is added to cart`,
          value: productDetailData.price,
        });
        dispatch(fetchCartListing(TokenFromStore?.token));
      } else {
        showToast(AddToCartRes?.error, "error");
        setAddToCartButtonDisabled(false);
      }
    } else {
      let AddToCartRes: any = await AddToCartApi(
        addCartData,
        currency_state_from_redux?.selected_currency_value,
        TokenFromStore?.token
      );
      if (AddToCartRes?.msg === "success") {
        showToast("Item Added to cart", "success");
        ReactGA.event({
          category: productDetailData?.item_name,
          action: "Add Cart",
          label: `${productDetailData?.item_name} is added to cart`,
          value: productDetailData.price,
        });
        dispatch(fetchCartListing(TokenFromStore?.token));
      } else {
        showToast(AddToCartRes?.error, "error");
      }
    }

    // if (isDealer === "true") {
    //   let newObjects: any =
    //     newobjectState &&
    //     newobjectState?.filter((newitems: any) => newitems.quantity !== "");
    //   console.log("dealer cart", newObjects);
    //   let dealerApi = await DealerAddToCartApi(newObjects);
    //   console.log("dealer api res", dealerApi);
    //   if (dealerApi.msg === "success") {
    //     dispatch(successmsg("Item Added to cart"));
    //     dispatch(fetchCartListing(TokenFromStore?.token));
    //     setTimeout(() => {
    //       dispatch(hideToast());
    //     }, 1200);
    //   } else {
    //     dispatch(failmsg("Failed to Add to cart"));
    //     setTimeout(() => {
    //       dispatch(hideToast());
    //     }, 1500);
    //   }
    // } else {
    //   const addCartData: any = [];
    //   addCartData.push({
    //     item_code: productDetailData?.name,
    //     quantity: productQuantity,
    //   });
    //   let AddToCartRes: any = await AddToCartApi(
    //     addCartData,
    //     currency_state_from_redux?.selected_currency_value,
    //     TokenFromStore?.token
    //   );
    //   if (AddToCartRes?.data?.message?.msg === "success") {
    //     dispatch(successmsg("Item Added to cart"));
    //     dispatch(fetchCartListing(TokenFromStore?.token));
    //     setTimeout(() => {
    //       dispatch(hideToast());
    //     }, 1200);
    //   } else {
    //     dispatch(failmsg("Failed to Add to cart"));
    //     setTimeout(() => {
    //       dispatch(hideToast());
    //     }, 1500);
    //   }
    // }
  };

  // const handleAddCart: any = async () => {
  //   if (isDealer === "true") {
  //     let newObjects: any =
  //       newobjectState &&
  //       newobjectState?.filter((newitems: any) => newitems.quantity !== "");
  //     console.log("dealer cart", newObjects);
  //     let dealerApi = await DealerAddToCartApi(newObjects);
  //     console.log("dealer api res", dealerApi);
  //     if (dealerApi.msg === "success") {
  //       dispatch(successmsg("Item Added to cart"));
  //       dispatch(fetchCartListing(TokenFromStore?.token));
  //       setTimeout(() => {
  //         dispatch(hideToast());
  //       }, 1200);
  //     } else {
  //       dispatch(failmsg("Failed to Add to cart"));
  //       setTimeout(() => {
  //         dispatch(hideToast());
  //       }, 1500);
  //     }
  //   } else {
  //     const addCartData: any = [];
  //     addCartData.push({
  //       item_code: productDetailData?.name,
  //       quantity: productQuantity,
  //     });
  //     let AddToCartRes: any = await AddToCartApi(
  //       addCartData,
  //       currency_state_from_redux?.selected_currency_value,
  //       TokenFromStore?.token
  //     );
  //     if (AddToCartRes?.data?.message?.msg === "success") {
  //       dispatch(successmsg("Item Added to cart"));
  //       dispatch(fetchCartListing(TokenFromStore?.token));
  //       setTimeout(() => {
  //         dispatch(hideToast());
  //       }, 1200);
  //     } else {
  //       dispatch(failmsg("Failed to Add to cart"));
  //       setTimeout(() => {
  //         dispatch(hideToast());
  //       }, 1500);
  //     }
  //   }
  // };
  const [fullUrl, setFullUrl] = useState<any>("");
  const shareUrl = fullUrl !== "" ? fullUrl : "http://3.13.55.94:3004/";
  const shareMessage = `Check out this product: ${shareUrl}`;
  useEffect(() => {
    if (router.asPath) {
      const currentUrl = window.location.origin + router.asPath;
      setFullUrl(currentUrl);
    }
  }, [router.asPath]);
  console.log("details@@", fullUrl);
  const handleRedirect: any = () => {
    router.push("/login");
  };
  return (
    <div>
      <div className="product-info mt-2">
        <b className="product_name products-name products-name-font">
          {productDetailData?.item_name}
        </b>
        <p className=" text-dark  products-name mt-0">
          <span>
            {" "}
            {productDetailData?.short_description ===
              productDetailData.productDetailData_name ||
            productDetailData?.short_description === ""
              ? ""
              : productDetailData?.short_description}
          </span>
        </p>
        <div className="products-name product-line-height rating-container">
          <StarRating
            rating={productDetailData?.rating}
            className="product_brand_name"
          />
        </div>
        <p className="mt-3 text-dark p-tagfont product_item_name products-name product-line-height d-inline-flex">
          {selectedMultiLangData?.item_code}:
          <span>&nbsp; {productDetailData?.name}</span>
        </p>

        {/* <div className=" d-flex justify-content-center product-price">
          <ins className="d-flex new-price">
            <span>{productDetailData?.currency_symbol}</span>
            <span className="product-price-rtl">
              {" "}
              {productDetailData?.price}
            </span>
          </ins>
          <del className="old-price">
            <span>{productDetailData?.currency_symbol}</span>
            <span> {productDetailData?.mrp_price}</span>
          </del>
        </div> */}

        <h3 className="d-flex justify-content-start p_price m-0 price_font_family rating-container">
          <div>
            {productDetailData?.price !== 0 ? (
              <>
                <span className="products-name bold ">
                  {" "}
                  {productDetailData?.currency_symbol}{" "}
                  {productDetailData?.price}
                </span>
                {/* <IndianNumber value={productDetailData?.price} /> */}
              </>
            ) : (
              <button className="button_color p-2 rounded-3 fs-4 mb-2 product-font-family">
                {selectedMultiLangData?.price_on_request}
              </button>
            )}
          </div>
          <div>
            {productDetailData?.mrp_price !== 0 ? (
              <>
                <del className="old-price fs-2 ms-4 price_font_family product-font-family mrp-price-color ">
                  {productDetailData?.currency_symbol}{" "}
                  {productDetailData?.mrp_price}
                </del>
              </>
            ) : (
              ""
            )}
          </div>
        </h3>

        {productDetailData?.price !== 0 ? (
          <div>
            {productDetailData?.tax_value !== null && (
              <p className=" text-dark mt-3 text-uppercase taxx_value products-name">
                &#43; {selectedMultiLangData?.gst} &#x40;{" "}
                {productDetailData?.tax_value}% {selectedMultiLangData?.extra}
              </p>
            )}

            <p className=" text-dark mt-2 text-uppercase taxx_value products-name">
              &#43; {selectedMultiLangData?.cost_of_transportation_extra}
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="product-feature">
          <ul className="list-style-none px-0 products-name">
            <li>
              {Object.keys(productDetailData?.features).length > 0 && (
                <>
                  {productDetailData?.features?.values?.length > 0 &&
                    productDetailData?.features?.values !== null &&
                    productDetailData?.features?.values.map(
                      (featureL: any, index: any) => {
                        return (
                          <li key={index} className="d-flex">
                            <span className="feature_list products-name product-line-height">
                              {" "}
                            </span>
                            <span className="fs-5 products-name ">
                              {featureL.description}
                            </span>
                          </li>
                        );
                      }
                    )}
                </>
              )}
            </li>
          </ul>
        </div>

        {productDetailData?.brand !== null &&
        productDetailData?.brand !== "" ? (
          <p className="text-uppercase p-tagfont product_brand_name products-name product-line-height d-inline-flex my-3">
            {selectedMultiLangData?.brand}:
            <span>&nbsp; {productDetailData?.brand}</span>
          </p>
        ) : (
          ""
        )}
        <div className="py-0">
          {productDetailData?.gst_hsn_code !== null &&
          productDetailData?.gst_hsn_code !== "" ? (
            <p className="text-uppercase p-tagfont  products-name product-line-height d-inline-flex my-3">
              {selectedMultiLangData?.hsn_code}:
              <span> &nbsp;{productDetailData?.gst_hsn_code}</span>
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          {productDetailData?.oem_part_number !== null &&
          productDetailData?.oem_part_number !== "" ? (
            <p className="mt-2 text-uppercase p-tagfont product_brand_name products-name d-inline-flex">
              {selectedMultiLangData?.oem_part_number}:{" "}
              <span>{productDetailData?.oem_part_number}</span>
            </p>
          ) : (
            ""
          )}
        </div>
        {productDetailData?.weight_per_unit !== 0 ? (
          <p className="mt-2 text-uppercase p-tagfont product_brand_name products-name d-inline-flex">
            {selectedMultiLangData?.approx_weight}:{" "}
            <span className="d-inline-flex">
              &nbsp; {productDetailData?.weight_per_unit}{" "}
              <span>{productDetailData?.weight_uom}</span>
            </span>
          </p>
        ) : (
          ""
        )}
      </div>

      <div>
        <VariantsMaster
          productVariants={productVariants}
          selectedVariant={selectedVariant}
          thumbnailOfVariants={thumbnailOfVariants}
          handleVariantSelect={handleVariantSelect}
          doesSelectedVariantDoesNotExists={doesSelectedVariantDoesNotExists}
          variantsData={handleVariantsData}
          WhatsappShareButton={WhatsappShareButton}
          stockDoesNotExistsForSelectedVariants={
            stockDoesNotExistsForSelectedVariants
          }
          selectedMultiLangData={selectedMultiLangData}
          minQty={minQty}
        />
      </div>

      <table className="mx-auto mb-0 inventory_table table table-sm product_qty_sec products-name">
        <tbody>
          <tr>
            <td className="qty_sec_table_data">
              <div>
                {isDealer === "true" ? null : (
                  <>
                    <div className="d-flex align-items-center">
                      <div className="fs-4 text-muted products-name ">
                        {" "}
                        {selectedMultiLangData?.quantity}:{" "}
                      </div>
                      <div>
                        <span
                          className="fs-2 ml-lg-2 arrow_pointer products-name"
                          onClick={handleQuantityDecrement}
                        >
                          <i className="fa fa-minus fs-4"></i>
                        </span>

                        <input
                          type="text"
                          value={productQuantity}
                          className={`${
                            productQuantity < minQty ? "disabled" : "enabled"
                          } varient_input mx-2 text-center products-name`}
                          onChange={(e: any) => handleQuantity(e.target.value)}
                        />

                        <span
                          className="fs-2 arrow_pointer products-name"
                          onClick={handleQuantityIncrement}
                        >
                          <i className="fa fa-plus fs-4"></i>
                        </span>
                      </div>
                    </div>
                    <div className="fs-6 mt-1 text-uppercase text-dark bold products-name">
                      {productDetailData.min_order_qty === 0 ? (
                        ""
                      ) : (
                        <p>
                          {" "}
                          {selectedMultiLangData?.minimum_order_qty}:{" "}
                          {productDetailData.min_order_qty}
                        </p>
                      )}
                    </div>

                    <div
                      className={`${
                        stockAvailabilityTextChanges === true
                          ? "text-success bold"
                          : ""
                      } fs-4 mt-2 products-name`}
                    >
                      {selectedMultiLangData?.check_availability_message}
                    </div>
                  </>
                )}
              </div>

              <div className="row button_sec">
                {CONSTANTS.SHOW_FUTURE_STOCK_AVAILABILITY_TO_GUEST === true ? (
                  <div className="col-lg-4 col-6 align-self-lg-start products-name btn-wrapper">
                    <div className="mt-5">
                      <button
                        type="button"
                        id=""
                        className={`btn standard_button_filled cart_btn_gtag  product-font-family`}
                        onClick={() => handleStockAvail(productDetailData.name)}
                      >
                        {selectedMultiLangData?.check_availability_btn_label}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-lg-4 col-6 btn-wrapper">
                    <div className="mt-5">
                      <Link
                        href="/login"
                        className="btn standard_button_filled cart_btn_gtag products-name"
                      >
                        {selectedMultiLangData?.check_availability_btn_label}
                      </Link>
                    </div>
                  </div>
                )}
                {isLoggedIn === "true" ? (
                  <div className="col-lg-4 col-5 ml-lg-0 ml-3 align-self-lg-start">
                    <div className="mt-5">
                      <div className="row btn-wrapper">
                        <button
                          type="button"
                          className={`${
                            addToCartButtonDisabled === true ? "disabled" : ""
                          } w-75  btn standard_button_filled cart_btn_gtag product-font-family product-font-family`}
                          onClick={handleAddCart}
                          disabled={doesSelectedVariantDoesNotExists}
                        >
                          {selectedMultiLangData?.add_to_cart}
                        </button>
                      </div>
                      <div className="col-12">
                        <div className="ms-5">
                          {productQuantity < minQty ? (
                            <p className="text-danger">
                              {selectedMultiLangData?.minimum_order_qty}:
                              {minQty}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-lg-4 col-4 text-start ">
                    <div className="mt-5">
                      <div className="row btn-wrapper">
                        <button
                          className={`w-75 btn standard_button_filled cart_btn_gtag product-font-family`}
                          onClick={handleRedirect}
                          disabled={doesSelectedVariantDoesNotExists}
                        >
                          {selectedMultiLangData?.add_to_cart}
                        </button>
                      </div>
                      <div className="col-12">
                        {productQuantity < minQty ? (
                          <p className="text-danger product-font-family">
                            {selectedMultiLangData?.minimum_order_qty}: :
                            {minQty}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* WhatsApp share button */}
              <div className="mt-5 d-flex align-items-center">
                <i
                  className="fa fa-share me-2"
                  aria-hidden="true"
                  style={{ fontSize: "18px" }}
                ></i>
                <div className="me-2">
                  <WhatsappShareButton url={shareUrl} title={shareMessage}>
                    <WhatsappIcon size={32} round={true} />
                  </WhatsappShareButton>
                </div>

                <div className="me-2">
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                </div>

                <div>
                  <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>
                </div>
              </div>
              <div className="mt-5">
                <ValidatePincode pincodeRes={pincodeRes} setPincode={setPincode} Loadings={Loadings}/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetail;
