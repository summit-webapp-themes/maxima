import React, { useState } from "react";
import Link from "next/link";
import { CONSTANTS } from "../services/config/app-config";
import AddToCartApi from "../services/api/cart-page-api/add-to-cart-api";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartListing } from "../store/slices/cart-listing-page-slice/cart-listing-slice";
import { showToast } from "../components/ToastNotificationNew";

import { fetchWishlistUser } from "../store/slices/wishlist-slice/wishlist-slice";

import {
  successmsg,
  failmsg,
  hideToast,
} from "../store/slices/general_slices/toast_notification_slice";
import { login_state } from "../store/slices/auth/login_slice";
import { Router, useRouter } from "next/router";
import { get_access_token } from "../store/slices/auth/token-login-slice";
import CatalogModal from "../components/Catalog/CatalogModal";
import { profileData_state } from "../store/slices/general_slices/profile-page-slice";

const ProductListViewCard = (props: any) => {
  const {
    product_data,
    handleRenderingOfImages,
    wishlistData,
    currency_state_from_redux,
    selectedMultiLangData,
    catalogListItem,
    handleAddProduct,
    handleSubmitCatalogName,
    handleChange,
  } = props;
  let wishproducts: any;
  let requestNew: any;
  let requestList: any;
  const dispatch = useDispatch();
  console.log("product card list view", product_data);
  const router = useRouter();

  const TokenFromStore: any = useSelector(get_access_token);
  const profileData: any = useSelector(profileData_state);
  const [showEditModal, setshowEditModal] = useState(false);
  const [show, setshow] = useState(false);
  const [addToCartButtonDisabled, setAddToCartButtonDisabled] = useState(false);
  let isLoggedIn: any;
  let partyName: any;
  if (typeof window !== "undefined") {
    isLoggedIn = localStorage.getItem("isLoggedIn");
  }

  const handleShow = (val: any) => {
    setshow(true);
  };
  const handleClose = () => {
    setshow(false);
  };

  const AddToCartProduct = async (name: any) => {
    setAddToCartButtonDisabled(true);
    const addCartData = [];
    addCartData.push({
      item_code: name,
      quantity: 1,
    });
    if (profileData?.partyName !== "") {
      if (Object?.keys(profileData?.partyName)?.length > 0) {
        partyName = profileData?.partyName;
      }
    } else {
      partyName = "Guest";
    }
    let AddToCartProductRes: any = await AddToCartApi(
      addCartData,
      currency_state_from_redux?.selected_currency_value,
      TokenFromStore?.token,
      partyName
    );
    if (AddToCartProductRes.msg === "success") {
      showToast("Item Added to cart", "success");
      dispatch(fetchCartListing(TokenFromStore?.token));
      setAddToCartButtonDisabled(false);
    } else {
      showToast(AddToCartProductRes?.error, "error");
      setAddToCartButtonDisabled(false);
    }
  };

  console.log(" selectedMultiLangData", selectedMultiLangData);

  return (
    <>
      <div className="container-fuild px-3">
        <div className=" col-lg-12 product-grid-view-mobs">
          <div className="product-wrapper product-wrapper-main">
            <div className="row w-100 product product-list border rounded py-4 ">
              <div className="col-md-4">
                <div className="product-tags col-md-4">
                  <p className="product_tag text-lg-center my-0 mt-2 best-seller-wrapper">
                    {product_data?.display_tag.length > 0 && (
                      <span className="badge text-bg-primary p-2 fs-5 best-seller-tag">
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
                  <div className="product-img list-view-img text-center ">
                    {handleRenderingOfImages(
                      product_data?.image_url,
                      product_data?.brand_img
                    )}
                  </div>
                </Link>
              </div>

              <div className="col-md-7 col-lg-7 my-auto">
                <div className="product-details products-name">
                  <h4 className="product-name product-listviewname products-name  ">
                    <Link
                      href={`${product_data?.url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                      legacyBehavior
                    >
                      <a className="products-name products-name-font">
                        {product_data?.item_name}
                      </a>
                    </Link>
                  </h4>
                  <div className="d-flex">
                    <div>
                      <div className="fs-5 products-name">
                        {product_data?.short_description ===
                        product_data?.item_name
                          ? ""
                          : product_data?.short_description}
                      </div>
                      <div className="product-desc text-gray products-name d-inline-flex">
                        {selectedMultiLangData?.item_code}:
                        <span>&nbsp;{product_data?.name}</span>
                      </div>
                      <div>
                        {product_data?.weight_per_unit === 0 ||
                        product_data?.weight_per_unit === null ? (
                          ""
                        ) : (
                          <div className="product-desc text-gray d-inline-flex">
                            {selectedMultiLangData?.approx_weight}:{" "}
                            <span className="d-inline-flex">
                              {" "}
                              &nbsp;
                              {product_data?.weight_per_unit}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        {product_data?.brand !== null && (
                          <div className="sold-by product-desc products-name d-inline-flex">
                            <span>{selectedMultiLangData?.brand}:&nbsp;</span>
                            {product_data?.brand}
                          </div>
                        )}
                      </div>

                      {product_data?.price === null ||
                      product_data?.price === 0 ? (
                        ""
                      ) : (
                        <>
                          {CONSTANTS.DISPLAY_PRODUCT_PRICE_ON_PRODUCT_LISTING_CARD && (
                            <div className="product-price price_font_family products-name">
                              {product_data?.currency_symbol}{" "}
                              {product_data?.price}{" "}
                              <del className="old-price fs-3 pl-1 price_font_family product-font-family">
                                <span>{product_data?.currency_symbol}</span>{" "}
                                {product_data?.mrp_price}
                              </del>
                            </div>
                          )}
                        </>
                      )}
                      <div className="p-0 m-0 row">
                        <div className="col-lg-7">
                          {isLoggedIn === "true" ? (
                            <div className="text-center w-0">
                              <button
                                className={` ${
                                  addToCartButtonDisabled === true
                                    ? "disabled"
                                    : ""
                                } btn standard_button add_cart_btn`}
                                onClick={() =>
                                  AddToCartProduct(product_data.name)
                                }
                              >
                                {selectedMultiLangData?.add_to_cart}
                              </button>
                            </div>
                          ) : (
                            <Link href="/login">
                              <div className="text-center w-50">
                                <button className="btn standard_button">
                                  {selectedMultiLangData?.add_to_cart}
                                </button>
                              </div>
                            </Link>
                          )}
                        </div>
                        <div className="col-lg-5">
                          {isLoggedIn === "true" && (
                            <>
                              {router.route !== "/catalog/[category]" ? (
                                <button
                                  type="button"
                                  className={`btn btn-link catalog-btn-size pt-2 fs-5 products-name text-decoration-none`}
                                  onClick={() => handleShow(product_data.name)}
                                >
                                  <span className="bold">
                                    {selectedMultiLangData?.add_to_catalog}
                                  </span>
                                </button>
                              ) : (
                                ""
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-lg-5 mt-2 ps-5">
                      <div className="col-lg-6"></div>
                      {/* <div className="col-lg-6">
                        {router.route !== "/catalog/[category]" ? (
                          <div className="text-center w-50">
                            <button
                              type="button"
                              className={`btn btn-link catalog-btn-size pt-2`}
                              onClick={() => handleShow(product_data.name)}
                            >
                              Add To Catalog
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-1 col-md-1 mt-1 text-en heart-icon-wrapper heart-icon-wrapper-mob">
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
                            token: TokenFromStore?.token,
                          };
                          requestList = {
                            getWishlist: true,
                            deleteWishlist: false,
                            addTowishlist: false,
                            token: TokenFromStore?.token,
                          };
                          dispatch(fetchWishlistUser(requestNew));

                          setTimeout(() => {
                            dispatch(fetchWishlistUser(requestList));
                          }, 900);
                        }}
                      >
                        <i
                          className="fa fa-heart-o text-danger fs-1"
                          aria-hidden="true"
                          data-bs-toggle="tooltip"
                          title="Add to Wishlist"
                        ></i>
                      </a>
                    ) : (
                      <Link href="/login" legacyBehavior>
                        <a style={{ cursor: "pointer" }}>
                          <i
                            className="fa fa-heart-o text-danger fs-1"
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
                        token: TokenFromStore?.token,
                      };
                      requestList = {
                        getWishlist: true,
                        deleteWishlist: false,
                        addTowishlist: false,
                        token: TokenFromStore?.token,
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
        <CatalogModal
          show={show}
          toHide={handleShow}
          name={product_data.name}
          handleClose={handleClose}
          catalogListItem={catalogListItem}
          handleAddProduct={handleAddProduct}
          handleSubmitCatalogName={handleSubmitCatalogName}
          handleChange={handleChange}
          selectedMultiLangData={selectedMultiLangData}
        />
      </div>
    </>
  );
};
export default ProductListViewCard;
