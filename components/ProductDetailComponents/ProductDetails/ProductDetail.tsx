import React, { useEffect, useState } from "react";
import IndianNumber from "../../CheckoutPageComponent/IndianNumber";
import StarRating from "./StarRating";
import { useDispatch, useSelector } from "react-redux";
import * as ga from "../../../lib/ga";
import { useRouter } from "next/router";
import AddToCartPostApi from "../../../services/api/cart-page-api/add-to-cart-api";
import AddToCartApi from "../../../services/api/cart-page-api/add-to-cart-api";
import VariantsMaster from "../ProductVariants/VariantsMaster";
import { fetchCartListing } from "../../../store/slices/cart-listing-page-slice/cart-listing-slice";
import styles from "../../../styles/Product_Detail.module.css";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../../../store/slices/general_slices/toast_notification_slice";
import Link from "next/link";
import useMultiLingual from "../../../hooks/LanguageHook/multilingual-hook";
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
  testBtn,
  doesSelectedVariantDoesNotExists,
  stockDoesNotExistsForSelectedVariants,
  productDetailLoading,
}: any) => {
  console.log("product detail", productVariants);
  const dispatch = useDispatch();
  const currency_state_from_redux = useSelector(currency_selector_state);
  const router = useRouter();

  const languageData = useMultiLingual();

  const [newobjectState, setnewObjectState] = useState<any>([]);

  const handleVariantsData = (newData: any) => {
    setnewObjectState(newData);
  };

  let isLoggedIn: any;
  let isDealer: any;
  if (typeof window !== "undefined") {
    isLoggedIn = localStorage.getItem("isLoggedIn");
    isDealer = localStorage.getItem("isDealer");
  }

  const handleAddCart = async () => {
    console.log(
      "add currency",
      currency_state_from_redux?.selected_currency_value
    );
    if (isDealer === "true") {
      console.log("dealer cart", newobjectState);
      let newObjects =
        newobjectState &&
        newobjectState?.filter((newitems: any) => newitems.quantity !== "");
      let dealerApi = await DealerAddToCartApi(newObjects);
      console.log("dealer api res", dealerApi);
      if (dealerApi.msg === "success") {
        dispatch(successmsg("Item Added to cart"));
        dispatch(fetchCartListing());
        setTimeout(() => {
          dispatch(hideToast());
        }, 1200);
      } else {
        dispatch(failmsg("Failed to Add to cart"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 1500);
      }
      // ga.event({
      //   action: "add_to_cart",
      //   params: {
      //     not_set: JSON.stringify(newobjectState),
      //   },
      // });
    } else {
      console.log(
        "add currency in else",
        currency_state_from_redux?.selected_currency_value
      );
      const addCartData = [];
      addCartData.push({
        item_code: productDetailData?.name,
        quantity: productQuantity,
      });
      let AddToCartRes: any = await AddToCartApi(
        addCartData,
        currency_state_from_redux?.selected_currency_value
      );
      if (AddToCartRes.msg === "success") {
        dispatch(successmsg("Item Added to cart"));
        dispatch(fetchCartListing());
        setTimeout(() => {
          dispatch(hideToast());
        }, 1200);
      } else {
        dispatch(failmsg("Failed to Add to cart"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 1500);
      }
    }
  };
  const [fullUrl, setFullUrl] = useState("");
  const shareUrl = fullUrl !== "" ? fullUrl : "http://3.13.55.94:3004/";
  const shareMessage = `Check out this product: ${shareUrl}`;
  useEffect(() => {
    if (router.asPath) {
      const currentUrl = window.location.origin + router.asPath;
      setFullUrl(currentUrl);
    }
  }, [router.asPath]);
  console.log("details@@", fullUrl);
  const handleRedirect = () =>{
    router.push('/login')
  }
  return (
    <div>
      <div className="product-info">
        <b className="product_name">{productDetailData?.item_name}</b>
        <p className=" text-dark mt-1">
          <span>
            {" "}
            {productDetailData?.short_description ===
              productDetailData.productDetailData_name ||
            productDetailData?.short_description === ""
              ? ""
              : productDetailData?.short_description}
          </span>
        </p>
        <div style={{ marginTop: "-12px" }}>
          <StarRating rating={productDetailData?.rating} />
        </div>
        <p className="mt-3 text-dark p-tagfont product_item_name">
          Item Code: {productDetailData?.name}
        </p>

        <h3 className="p_price m-0">
          {productDetailData?.price !== 0 ? (
            <>
              {productDetailData?.currency_symbol} {productDetailData?.price}
              {/* <IndianNumber value={productDetailData?.price} /> */}
            </>
          ) : (
            <button className="button_color p-2 rounded-3 fs-4 mb-2">
              Price on Request
            </button>
            // <p
            //   className="border text-center"
            //   style={{
            //     width: "150px",
            //     margin: "0",
            //     background: "#f15622",
            //     color: "white",
            //     borderRadius: "5px",
            //   }}
            // >
            //   Price on Request
            // </p>
          )}

          {productDetailData?.mrp_price !== 0 ? (
            <>
              <s className="old-price currency_symbol">
                {productDetailData?.currency_symbol}{" "}
                {productDetailData?.mrp_price}
                {/* <IndianNumber value={productDetailData?.mrp_price} /> */}
              </s>
            </>
          ) : (
            ""
          )}
        </h3>

        {productDetailData?.price !== 0 ? (
          <div>
            {productDetailData?.tax_value !== null && (
              <p className="bold text-dark mt-3 text-uppercase taxx_value">
                &#43; GST &#x40; {productDetailData?.tax_value}% extra
              </p>
            )}

            <p className="bold text-dark mt-2 text-uppercase taxx_value">
              &#43; cost of transportation extra
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="product-feature">
          <ul className="list-style-none px-0">
            <li>
              {Object.keys(productDetailData?.features).length > 0 && (
                <>
                  {productDetailData?.features?.values?.length > 0 &&
                    productDetailData?.features?.values !== null &&
                    productDetailData?.features?.values.map(
                      (featureL: any, index: any) => {
                        return (
                          <li key={index} className="d-flex">
                            <span className="feature_list"> </span>
                            <span className="fs-5 py-1">
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
          <p className="mt-2 text-uppercase p-tagfont product_brand_name">
            {languageData?.brand}: {productDetailData?.brand}
            {/* {multilingualData?.brand}: {productDetailData?.brand} */}
          </p>
        ) : (
          ""
        )}
        {productDetailData?.gst_hsn_code !== null &&
        productDetailData?.gst_hsn_code !== "" ? (
          <p className="mt-2 text-uppercase p-tagfont product_brand_name">
            Hsn code: {productDetailData?.gst_hsn_code}
          </p>
        ) : (
          ""
        )}
        {productDetailData?.oem_part_number !== null &&
        productDetailData?.oem_part_number !== "" ? (
          <p className="mt-2 text-uppercase p-tagfont product_brand_name">
            OEM PART Number: {productDetailData?.oem_part_number}
          </p>
        ) : (
          ""
        )}
        {productDetailData?.weight_per_unit !== 0 ? (
          <p className="mt-2 text-uppercase p-tagfont product_brand_name">
            APPROX WEIGHT: {productDetailData?.weight_per_unit}{" "}
            {productDetailData?.weight_uom}
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
        />
      </div>

      <table className="mx-auto mb-0 inventory_table table table-sm product_qty_sec">
        <tbody>
          <tr>
            <td className="qty_sec_table_data">
              <div>
                {isDealer === "true" ? null : (
                  <>
                    <div className="d-flex align-items-center">
                      <div className="fs-4 text-muted ">Quantity: </div>
                      <div>
                        <span
                          className="fs-2 ml-lg-2 arrow_pointer"
                          onClick={handleQuantityDecrement}
                        >
                          <i className="fa fa-minus fs-4"></i>
                        </span>

                        <input
                          type="text"
                          value={productQuantity}
                          className={`${
                            productQuantity < minQty ? "disabled" : "enabled"
                          } varient_input mx-2 text-center`}
                          onChange={(e: any) => handleQuantity(e.target.value)}
                        />

                        <span
                          className="fs-2 arrow_pointer"
                          onClick={handleQuantityIncrement}
                        >
                          <i className="fa fa-plus fs-4"></i>
                        </span>
                      </div>
                    </div>
                    <div className="fs-6 mt-1 text-uppercase text-dark bold">
                      {productDetailData.min_order_qty === 0 ? (
                        ""
                      ) : (
                        <p>
                          {" "}
                          minimum order qty: {productDetailData.min_order_qty}
                        </p>
                      )}
                    </div>

                    <div
                      className={`${
                        stockAvailabilityTextChanges === true
                          ? "text-success bold"
                          : ""
                      } fs-4 mt-2`}
                    >
                      {languageData !== undefined &&
                        languageData[
                          "check_stock_availability_to_get_delivery_date"
                        ]}
                    </div>
                  </>
                )}
              </div>

              <div className="row button_sec">
                {CONSTANTS.SHOW_FUTURE_STOCK_AVAILABILITY_TO_GUEST === true ? (
                  <div className="col-md-6 text-start">
                    <div className="mt-5">
                      <button
                        type="button"
                        id=""
                        className={`btn btn-primary cart_btn_gtag button_color`}
                        onClick={() => handleStockAvail(productDetailData.name)}
                      >
                        {languageData !== undefined &&
                          languageData["check_future_stock_availability"]}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-md-6">
                    <div className="mt-5">
                      <Link
                        href="/login"
                        className="btn btn-primary button_color cart_btn_gtag "
                      >
                        {languageData !== undefined &&
                          languageData["check_future_stock_availability"]}
                        {/* {multilingualData?.check_future_stock_availability} */}
                      </Link>
                    </div>
                  </div>
                )}
                {isLoggedIn === "true" ? (
                  <div className="col-md-6">
                    <div className="mt-5">
                      <div className="row">
                        <button
                          type="button"
                          className={`w-50 btn btn-primary button_color cart_btn_gtag`}
                          onClick={handleAddCart}
                          disabled={doesSelectedVariantDoesNotExists}
                        >
                          {languageData !== undefined &&
                            languageData["add_to_cart"]}
                          {/* {multilingualData?.add_to_cart} */}
                        </button>
                      </div>
                      <div className="col-12">
                        <div className="ms-5">
                          {productQuantity < minQty ? (
                            <p className="text-danger">
                              Minimum Order Qty:{minQty}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-md-6 mx-auto">
                    <div className="mt-5">
                      <div className="row">
                        <button
                          className={`w-75 btn btn-primary button_color cart_btn_gtag `}
                          onClick={handleRedirect}
                          disabled={doesSelectedVariantDoesNotExists}
                        >
                         
                            {languageData !== undefined &&
                              languageData["add_to_cart"]}
                        
                        </button>
                      </div>
                      <div className="col-12">
                        {productQuantity < minQty ? (
                          <p className="text-danger">
                            Minimum Order Qty:{minQty}
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
              <div className="mt-3 d-flex align-items-center">
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetail;
