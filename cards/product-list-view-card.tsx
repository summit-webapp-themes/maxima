import Link from "next/link";
import { CONSTANTS } from "../services/config/app-config";
import AddToCartApi from "../services/api/cart-page-api/add-to-cart-api";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartListing } from "../store/slices/cart-listing-page-slice/cart-listing-slice";

import { fetchWishlistUser } from "../store/slices/wishlist-slice/wishlist-slice";

import {
  successmsg,
  failmsg,
  hideToast,
} from "../store/slices/general_slices/toast_notification_slice";
import { login_state } from "../store/slices/auth/login_slice";
import { Router } from "next/router";
import { get_access_token } from "../store/slices/auth/token-login-slice";

const ProductListViewCard = (props: any) => {
  const {
    product_data,
    handleRenderingOfImages,
    wishlistData,
    currency_state_from_redux,
    selectedMultiLangData,
  } = props;
  let wishproducts: any;
  let requestNew: any;
  let requestList: any;
  const dispatch = useDispatch();
  console.log("product card list view", product_data);

  const TokenFromStore: any = useSelector(get_access_token);

  let isLoggedIn: any;
  if (typeof window !== "undefined") {
    isLoggedIn = localStorage.getItem("isLoggedIn");
  }

  const AddToCartProduct = async (name: any) => {
    const addCartData = [];
    addCartData.push({
      item_code: name,
      quantity: 1,
    });
    let AddToCartProductRes: any = await AddToCartApi(
      addCartData,
      currency_state_from_redux?.selected_currency_value,
      TokenFromStore?.token
    );
    if (AddToCartProductRes.msg === "success") {
      dispatch(successmsg("Item Added to cart"));
      dispatch(fetchCartListing(TokenFromStore?.token));
      setTimeout(() => {
        dispatch(hideToast());
      }, 1200);
    } else {
      dispatch(failmsg("Failed to Add to cart"));
      setTimeout(() => {
        dispatch(hideToast());
      }, 1500);
    }
  };

  return (
    <>
      <div className="container">
        <div className=" col-lg-12">
          <div className="product-wrapper ">
            <div className="row w-100 product product-list border rounded py-3">
              <div className="col-md-4 my-auto">
                <div className="product-tags col-md-4">
                  <p className="product_tag text-center my-0">
                    {product_data?.display_tag.length > 0 && (
                      <span className="badge text-bg-primary p-2 fs-5">
                        {product_data?.display_tag.length > 0 &&
                          product_data?.display_tag[0]}
                      </span>
                    )}
                  </p>
                </div>
                <Link
                  href={`${product_data?.url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                >
                  {" "}
                  <div className="product-img list-view-img">
                    {handleRenderingOfImages(
                      product_data?.image_url,
                      product_data?.brand_img
                    )}
                  </div>
                </Link>
              </div>

              <div className="col-md-7 col-lg-7 my-auto">
                <div className="product-details">
                  <h4 className="product-name product-listviewname">
                    <Link
                      href={`${product_data?.url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                      legacyBehavior
                    >
                      <a>{product_data?.item_name}</a>
                    </Link>
                  </h4>
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="fs-5 text-gray">
                        {product_data?.short_description ===
                        product_data?.item_name
                          ? ""
                          : product_data?.short_description}
                      </div>
                      <div className="product-desc text-gray">
                        {selectedMultiLangData?.item_code}: {product_data?.name}
                      </div>

                      {product_data?.weight_per_unit === 0 ||
                      product_data?.weight_per_unit === null ? (
                        ""
                      ) : (
                        <div className="product-desc text-gray">
                          {selectedMultiLangData?.approx_weight}:{" "}
                          {product_data?.weight_per_unit}
                          {""} {product_data?.weight_uom}
                        </div>
                      )}
                      {product_data?.brand !== null && (
                        <div className="sold-by product-desc">
                          {selectedMultiLangData?.brand}: {product_data?.brand}
                        </div>
                      )}

                      {product_data?.price === null ||
                      product_data?.price === 0 ? (
                        ""
                      ) : (
                        <>
                          {CONSTANTS.DISPLAY_PRODUCT_PRICE_ON_PRODUCT_LISTING_CARD && (
                            <div className="product-price">
                              {product_data?.currency_symbol}{" "}
                              {product_data?.price}{" "}
                              <del className="old-price fs-3 pl-1">
                                <span>{product_data?.currency_symbol}</span>{" "}
                                {product_data?.mrp_price}
                              </del>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    {isLoggedIn === "true" ? (
                      <div className="text-center w-50">
                        <button
                          className="btn  standard_button"
                          onClick={() => AddToCartProduct(product_data.name)}
                        >
                          {selectedMultiLangData?.add_to_cart}
                        </button>
                      </div>
                    ) : (
                      <Link href="/login">
                        <div className="text-center w-50">
                          <button className="btn standard_button">
                            Add to cart
                          </button>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-1 col-md-1 mt-1 text-en">
                {wishlistData?.map((values: any) => {
                  if (values.name === product_data?.name) {
                    wishproducts = values?.name;
                  }
                })}
                {!wishproducts ? (
                  <>
                    {isLoggedIn === "true" ? (
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          requestNew = {
                            prod_id: product_data?.name,
                            getWishlist: false,
                            deleteWishlist: false,
                            addTowishlist: true,
                          };
                          requestList = {
                            getWishlist: true,
                            deleteWishlist: false,
                            addTowishlist: false,
                          };
                          dispatch(fetchWishlistUser(requestNew));

                          setTimeout(() => {
                            dispatch(fetchWishlistUser(requestList));
                          }, 900);
                        }}
                      >
                        <i
                          className="fa fa-heart-o text-danger fs-1 "
                          aria-hidden="true"
                          data-bs-toggle="tooltip"
                          title="Add to Wishlist"
                        ></i>
                      </a>
                    ) : (
                      <Link href="/login" legacyBehavior>
                        <a style={{ cursor: "pointer" }}>
                          <i
                            className="fa fa-heart-o text-danger fs-1 "
                            aria-hidden="true"
                            data-bs-toggle="tooltip"
                            title="Add to Wishlist"
                          ></i>
                        </a>
                      </Link>
                    )}
                  </>
                ) : (
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      requestNew = {
                        prod_id: product_data?.name,
                        getWishlist: false,
                        deleteWishlist: true,
                        addTowishlist: false,
                      };
                      requestList = {
                        getWishlist: true,
                        deleteWishlist: false,
                        addTowishlist: false,
                      };
                      dispatch(fetchWishlistUser(requestNew));
                      setTimeout(() => {
                        dispatch(fetchWishlistUser(requestList));
                      }, 900);
                    }}
                  >
                    <i
                      className="fa fa-heart text-danger fs-1 "
                      aria-hidden="true"
                      data-bs-toggle="tooltip"
                      title="Added to Wishlist"
                    ></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductListViewCard;
