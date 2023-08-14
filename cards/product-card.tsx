import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { CONSTANTS } from "../services/config/app-config";
import { ProductCardProps } from "../interfaces/product-card-interface";
import { fetchWishlistUser } from "../store/slices/wishlist-slice/wishlist-slice";
import { useDispatch, useSelector } from "react-redux";
import AddToCartApi from "../services/api/cart-page-api/add-to-cart-api";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../store/slices/general_slices/toast_notification_slice";
import { fetchCartListing } from "../store/slices/cart-listing-page-slice/cart-listing-slice";
import deleteCatalog from "../services/api/product-catalog-api/delete-catalog-api";
import { get_access_token } from "../store/slices/auth/token-login-slice";
import { useRouter } from "next/router";
import deleteItemFromCatalog from "../services/api/product-catalog-api/delete-item-from-catalog-api";
import { ProductListingThunk } from "../store/slices/product-listing-page-slices/product-listing-slice";
import { filters_selector_state } from "../store/slices/product-listing-page-slices/filters-slice";
import CatalogModal from "../components/Catalog/CatalogModal";

const ProductCard = (props: ProductCardProps) => {
  const {
    key,
    name,
    in_stock_status,
    url,
    img_url,
    display_tag,
    item_name,
    currency_symbol,
    price,
    mrp_price,
    item_slug,
    wishlistData,
    currency_state_from_redux,
    // query,
    selectedMultiLangData,
    catalogListItem,
    handleAddProduct,
    handleSubmitCatalogName,
    handleChange
  } = props;

  let wishproducts: any;
  let requestNew: any;
  let requestList: any;
  const router = useRouter();
  console.log(router, "router45 ");
  const dispatch = useDispatch();
  const tokens = useSelector(get_access_token);
  let isLoggedIn: any;
  const filters_state_from_redux: any = useSelector(filters_selector_state);
  const [showEditModal, setshowEditModal] = useState(false);
  const [show, setshow] = useState(false);

  const { query }: any = useRouter()
  console.log("delete que", query)
  const newSlug = query?.category?.replace(/-/g, " ");
  console.log(newSlug, " newSlug");
  if (typeof window !== "undefined") {
    isLoggedIn = localStorage.getItem("isLoggedIn");
  }
  const handleAddCart = async () => {
    console.log(
      "add currency",
      currency_state_from_redux?.selected_currency_value
    );

    console.log(
      "add currency in else",
      currency_state_from_redux?.selected_currency_value
    );
    const addCartData = [];
    addCartData.push({
      item_code: name,
      quantity: 1,
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
  };
  const handleShow = (val: any) => {
    setshow(true);
  };
  const handleClose = () => {
    setshow(false);
  };

  const handleDeleteCatalogProduct = async () => {
    const deleteApiParams = {
      token: tokens?.token,
      catalog_name: newSlug,
      item_name: name,
    };
    const deleteProductFromCatalog = await deleteItemFromCatalog(deleteApiParams);
    console.log(deleteProductFromCatalog, "deleteProductFromCatalog")
    if (deleteProductFromCatalog.message.msg === "success") {
      dispatch(successmsg(deleteProductFromCatalog?.message?.data))
      setTimeout(() => {
        const storeUsefulParamsForFurtherProductListingApi = {
          router_origin: router.route.split("/")[1],
          url_params: query,
          filterDoctype: filters_state_from_redux?.doctype,
          filterDocname: filters_state_from_redux?.docname.toLowerCase(),
          token: tokens.token,
        };
        console.log(
          storeUsefulParamsForFurtherProductListingApi,
          "storeUsefulParamsForFurtherProductListingApi"
        );
        dispatch(hideToast());
        dispatch(
          ProductListingThunk({
            storeUsefulParamsForFurtherProductListingApi,
          }) as any
        );
      }, 1000);
    }
    else {
      dispatch(failmsg(deleteProductFromCatalog.message.error));
      setTimeout(() => {
        dispatch(hideToast());
      }, 1500);
    }

  };
  return (
    <div key={key} className="border p-3 rounded-3 h-100 ">
      <div className="d-flex justify-content-between mb-1">
        <div
          className={`badge text-bg-primary fs-5 display_tag_badge ${display_tag.length > 0 && display_tag[0] ? "visible" : "invisible"
            }`}
        >
          {display_tag.length > 0 && display_tag[0]}
        </div>

        <div>
          {wishlistData?.map((values: any) => {
            if (values.name === name) {
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
                      prod_id: name,
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
              className="icon_pointer"
              onClick={() => {
                requestNew = {
                  prod_id: name,
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
      <div className="product-wrap">
        <div className="product text-center ">
          <div className="product-media product_card_h">
            {img_url !== "" ? (
              <>
                <Link
                  href={`${url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                >
                  <Image
                    loader={() => `${CONSTANTS.API_BASE_URL}${img_url}`}
                    src={`${CONSTANTS.API_BASE_URL}${img_url}`}
                    alt="product-detail"
                    width={200}
                    height={200}
                  />
                </Link>
              </>
            ) : (
              <>
                <Link href={url}>
                  <Image
                    src={"/assets/images/maximaCard.jpg"}
                    alt="Product"
                    width="200"
                    height="200"
                  />
                </Link>
              </>
            )}
          </div>
          <div className="product-details">
            <h4 className="product-name truncate-overflow">
              <Link
                href={`${url}?currency=${currency_state_from_redux?.selected_currency_value}`}
              >
                {item_name}
              </Link>
            </h4>
            <div className="product-price">
              <ins className="new-price">
                {currency_symbol}
                {price}
              </ins>
              <del className="old-price">
                {currency_symbol}
                {mrp_price}
              </del>
            </div>
            {router.route !== "/catalog/[category]" ? (
              <button
                type="button"
                className={`btn btn-link catalog-btn-size`}
                onClick={handleShow}
              >
                Add To Catalog
              </button>
            ) : (
              ""
            )}
            <button
              type="button"
              className={` btn btn-primary ml-3 cart_btn_gtag listing-cartbtn`}
              onClick={handleAddCart}
            >
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              {/* {multilingualData?.add_to_cart} */}
            </button>
            {router.route === "/catalog/[category]" ? (
              <button
                type="button"
                className={` btn btn-primary ml-3 cart_btn_gtag listing-cartbtn`}
                onClick={handleDeleteCatalogProduct}
              >
                <i className="fa fa-trash-o" aria-hidden="true"></i>
                {/* {multilingualData?.add_to_cart} */}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <CatalogModal
        show={show}
        toHide={handleShow}
        name={name}
        handleClose={handleClose}
        catalogListItem={catalogListItem}
        handleAddProduct={handleAddProduct}
        handleSubmitCatalogName={handleSubmitCatalogName}
        handleChange={handleChange}
      />
    </div>

  );
};

export default ProductCard;