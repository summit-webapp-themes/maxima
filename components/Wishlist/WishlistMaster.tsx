import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useWishlist from "../../hooks/WishListHooks/WishListHooks";
import {
  fetchWishlistUser,
  wishlist_state,
} from "../../store/slices/wishlist-slice/wishlist-slice";
import Image from "next/image";
import { CONSTANTS } from "../../services/config/app-config";
import { useEffect, useState } from "react";
import useProductDetail from "../../hooks/ProductDetailHook/product-detail-hook";
import { fetchCartListing } from "../../store/slices/cart-listing-page-slice/cart-listing-slice";
import AddToCartApi from "../../services/api/cart-page-api/add-to-cart-api";
import { Norecord } from "../../components/NoRecord";
import { fetchStockAvailability } from "../../store/slices/product-detail-page-slices/product-stock-availability-slice";
import { useRouter } from "next/router";
import {
  successmsg,
  failmsg,
  hideToast,
} from "../../store/slices/general_slices/toast_notification_slice";
import ListViewLoadingLayout from "../ProductListingComponents/products-data-view/ListViewLoadingLayout";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import {
  get_access_token,
  updateAccessToken,
} from "../../store/slices/auth/token-login-slice";
const WishlistMaster = () => {
  const { productQuantity, stockAvailability } = useProductDetail();
  console.log("stock check", stockAvailability);
  const dispatch = useDispatch();
  let requestNew: any;
  let requestList: any;
  const { wishlistData, wishlistCount, Loadings }: any = useWishlist();
  console.log("wishlist response in render file", wishlistData);

  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const TokenFromStore: any = useSelector(get_access_token);
  const [showToast, setshowToast] = useState<boolean>(false);
  const [productCounts, setProductCounts] = useState<any>({});
  const [alertMinQty, setAlertMinQty] = useState<boolean>(false);
  const [showAvailabilityModal, setshowAvailabilityModal] =
    useState<boolean>(false);
  const router: any = useRouter();

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
  const handleQuantityChange: any = (
    event: any,
    productId: any,
    min_qty: any
  ) => {
    const inputCount: any = parseInt(event);
    console.log(inputCount, "inputCount");
    if (!isNaN(inputCount) && inputCount >= 0 && inputCount <= 99999) {
      setProductCounts({
        ...productCounts,
        [productId]: inputCount,
      });
    }
  };

  const incrementCount: any = (productId: any, min_qty: any) => {
    const currentCount: any = parseInt(productCounts[productId], 10);
    if (productCounts[productId] === undefined) {
      if (min_qty > 0) {
        setProductCounts({
          ...productCounts,
          [productId]: min_qty + 1,
        });
      } else {
        setProductCounts({
          ...productCounts,
          [productId]: min_qty + 2,
        });
      }
    }
    if (currentCount < 99999) {
      setProductCounts({
        ...productCounts,
        [productId]: (productCounts[productId] || min_qty) + 1,
      });
    }
  };

  const decrementCount: any = (productId: any, min_qty: any) => {
    console.log("minqty", productId, min_qty);
    if (productCounts[productId] > min_qty) {
      setProductCounts({
        ...productCounts,
        [productId]: productCounts[productId] - 1,
      });
    }
    console.log("alert", productCounts[productId], min_qty);
    if (productCounts[productId] === min_qty) {
      setAlertMinQty(true);
    }
  };

  const myLoader: any = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  const handleAddCart: any = async (
    id: any,
    in_stock_status: any,
    productCountsQty: any,
    min_qty: any
  ) => {
    console.log("add to cart id", productCountsQty, min_qty);
    console.log("cart product count in ", productCounts);

    // if (min_qty <= productCountsQty) {
    console.log("add cart success productCountqty");
    const addCartData: any = [];
    if (productCountsQty === undefined && min_qty > 0) {
      addCartData.push({
        item_code: id,
        quantity: min_qty,
      });
    } else if (productCountsQty === undefined && min_qty === 0) {
      addCartData.push({
        item_code: id,
        quantity: 1,
      });
    } else if (productCountsQty === 0 && min_qty === 0) {
      addCartData.push({
        item_code: id,
        quantity: 1,
      });
    } else {
      addCartData.push({
        item_code: id,
        quantity: productCountsQty,
      });
    }

    if (productCountsQty !== 0 || min_qty !== 0) {
      let AddToCartProductRes: any = await AddToCartApi(
        addCartData,
        currency_state_from_redux?.selected_currency_value,
        TokenFromStore?.token
      );

      if (AddToCartProductRes?.msg === "success") {
        dispatch(successmsg("Item Added to cart"));

        if (AddToCartProductRes?.data?.access_token !== null) {
          dispatch(updateAccessToken(AddToCartProductRes?.data?.access_token));
          localStorage.setItem(
            "guest",
            AddToCartProductRes?.data?.access_token
          );

          if (AddToCartProductRes?.data?.access_token !== null) {
            dispatch(fetchCartListing(AddToCartProductRes?.data?.access_token));
          }
        } else {
          dispatch(fetchCartListing(TokenFromStore?.token));
        }
        setTimeout(() => {
          dispatch(hideToast());
        }, 1200);
      }
    } else {
      dispatch(failmsg("Failed to Add to cart"));
      setTimeout(() => {
        dispatch(hideToast());
      }, 1500);
    }
  };

  const handleStockModel: any = (id: any, min_qty: any, productQty: any) => {
    if (typeof productQty === "undefined") {
      console.log("dispatch min ");
      const stockAvailable: any = {
        item_code: id,
        qty: min_qty,
      };
      setshowAvailabilityModal(false);
      dispatch(fetchStockAvailability(stockAvailable));
    } else if (productQty >= min_qty) {
      const stockAvailable: any = {
        item_code: id,
        qty: productQty,
      };
      console.log("dispatch min1 ");
      console.log(productQty, "idqty");
      setshowAvailabilityModal(false);
      dispatch(fetchStockAvailability(stockAvailable));
    }
  };

  const handleFutureStockAvailability: any = (doesFutureStockExists: any) => {
    if (doesFutureStockExists?.length > 0) {
      return (
        <>
          {doesFutureStockExists?.length > 0 &&
            doesFutureStockExists?.map((stockData: any, index: number) => {
              return (
                <>
                  <tr key={index}>
                    <td className="text-center">{stockData?.warehouse}</td>
                    <td className="text-center">{stockData?.qty}</td>
                    <td className="text-center">{stockData?.incoming_qty}</td>
                    <td className="text-center">
                      {" "}
                      {stockData?.incoming_date !== ""
                        ? stockData?.incoming_date
                            ?.split("-")
                            .reverse()
                            .join("-")
                        : stockData?.incoming_date === ""}
                    </td>
                    <td className="text-center">{stockData?.additional_qty}</td>
                    <td className="text-center">
                      {stockData?.available_on !== ""
                        ? stockData?.available_on
                            ?.split("-")
                            .reverse()
                            .join("-")
                        : stockData?.available_on === ""}
                    </td>
                  </tr>
                </>
              );
            })}
        </>
      );
    } else {
      return <></>;
    }
  };

  const handleRenderingOfImages: any = (items: any) => {
    console.log("items img", items);
    if (items?.image_url !== null) {
      return (
        <Image
          loader={myLoader}
          src={items?.image_url}
          alt="wishlist-product"
          width={100}
          height={100}
        />
      );
    } else if (items?.brand_img !== null && items?.brand_img !== "") {
      return (
        <Image
          loader={myLoader}
          src={items?.brand_img}
          alt="wishlist-product"
          width={100}
          height={100}
        />
      );
    } else {
      return (
        <Image
          src=""
          // src={maximaCard}
          alt="product-detail"
          width={100}
          height={100}
          className="img-fluid"
        />
      );
    }
  };

  return (
    <>
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
          <div className="container wishlist-container">
            {wishlistCount > 0 ? (
              <>
                <h3 className="wishlist-title">
                  {" "}
                  {selectedMultiLangData?.my_wishlist}
                </h3>
                <div className="row mt-2 mx-4 ">
                  <h5 className="col-lg-5 col-md-4 d-none d-md-block">
                    {selectedMultiLangData?.product}
                  </h5>
                  <h5 className="col-lg-2 col-md-2 col-3 d-none d-md-block">
                    {selectedMultiLangData?.price}
                  </h5>
                  <h5 className="col-lg-2 col-md-2 col-3 d-none d-md-block ">
                    {selectedMultiLangData?.quantity}
                  </h5>
                  <h5 className="col-lg-3 col-md-2 col-3 d-none d-md-block">
                    {selectedMultiLangData?.actions}
                  </h5>
                </div>

                <div className="row  mx-4">
                  {wishlistData?.map((item: any, index: any) => (
                    <div className="row " key={index}>
                      <div className="col-lg-5 col-md-4 w-100">
                        <div className="row">
                          <div className="col-lg-4 col-12">
                            <div className="p-relative d-flex justify-content-center">
                              <div className="">
                                <a href={item.url}>
                                  {handleRenderingOfImages(item)}
                                </a>
                              </div>
                              <button
                                type="submit"
                                className=" btn btn-close fs-6 p-2 mx-2 rounded-circle"
                                onClick={() => {
                                  requestNew = {
                                    prod_id: item?.name,
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
                                  }, 100);
                                }}
                              ></button>
                            </div>
                          </div>
                          <div className="col-lg-7 col-12">
                            <p className="mb-0 fs-5 ">
                              <span className="bold">
                                {" "}
                                {selectedMultiLangData?.item_code}:
                              </span>
                              {item?.name}
                            </p>
                            <a
                              className="text-dark fs-5 bold"
                              href={`${item?.url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                            >
                              {item?.item_name}
                            </a>
                            <p className="mb-0 fs-6 ">
                              {item?.short_description}
                            </p>
                            <p className="mb-0 fs-5 ">
                              <span className="bold">
                                {selectedMultiLangData?.brand}:{" "}
                              </span>
                              {item?.brand}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 product-price">
                        {item?.price !== 0 ? (
                          <ins className="new-price fs-3">
                            {" "}
                            <span>&#x20B9;</span>
                            {item?.price?.toLocaleString("en-IN")}
                          </ins>
                        ) : (
                          <p className="border price_request">
                            {selectedMultiLangData?.price_on_request}
                          </p>
                        )}
                        {item?.mrp_price !== 0 ? (
                          <s className="old-price fs-3 pl-1">
                            <span>&#x20B9;</span>
                            {item?.mrp_price?.toLocaleString("en-IN")}
                            {/* {item?.mrp_price} */}
                          </s>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-lg-2 col-md-3">
                        <div className="d-flex align-items-center  ml-2">
                          <span
                            className="fs-2 ml-lg-2 icon-cursor"
                            onClick={() =>
                              decrementCount(index, item?.min_order_qty)
                            }
                          >
                            -
                          </span>
                          <div className="pe-3 input-width ">
                            <input
                              type="text"
                              // defaultValue={
                              //   item?.min_order_qty
                              // }
                              defaultValue={
                                item?.min_order_qty === 0
                                  ? "1"
                                  : item?.min_order_qty
                              }
                              value={productCounts[index]}
                              // className="w-100 ml-2 "
                              className={`${
                                alertMinQty === true &&
                                productCounts[index] === item?.min_order_qty
                                  ? "text-danger"
                                  : ""
                              } w-100 ml-2 text-center`}
                              onChange={(e: any) =>
                                handleQuantityChange(
                                  +e?.target?.value,
                                  index,
                                  item?.min_order_qty
                                )
                              }
                              min="0"
                              max="99999"
                            />
                          </div>
                          <span
                            className="fs-2 ml-2 ml-md-5 icon-cursor"
                            onClick={() =>
                              incrementCount(index, item?.min_order_qty)
                            }
                          >
                            +
                          </span>
                        </div>
                        {item?.min_order_qty !== 0 ? (
                          <div
                            className={`${
                              alertMinQty === true &&
                              productCounts[index] === item?.min_order_qty
                                ? "text-danger"
                                : "text-dark"
                            } fs-6 mt-1 text-uppercase bold`}
                          >
                            {selectedMultiLangData?.minimum_order_qty}:{" "}
                            {item?.min_order_qty}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-lg-3 col-md-3 ">
                        <div className="">
                          {/* <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#stockModal "
                            className={`${
                              productCounts[index] < item?.min_order_qty
                                ? "disabled"
                                : "enabled"
                            } wish_stock_btn btn text-dark px-2 my-0 my-lg-0 my-2`}
                            style={{border:'1px solid #0071DC',borderRadius:"7px", backgroundColor:"#fff"}}
                            onClick={(id) =>
                              handleStockModel(
                                item?.name,
                                item?.min_order_qty,
                                productCounts[index]
                              )
                            }
                          >
                            Check Availability
                          </button> */}

                          <button
                            className="ml-1 text-dark btn px-3 mt-lg-0 mt-md-2"
                            style={{
                              border: "1px solid #0071DC",
                              borderRadius: "7px",
                              backgroundColor: "#fff",
                            }}
                            onClick={() =>
                              handleAddCart(
                                item?.name,
                                item?.in_stock_status,
                                productCounts[index],
                                item?.min_order_qty
                              )
                            }
                          >
                            {selectedMultiLangData?.add_to_cart}
                          </button>
                        </div>
                        {productCounts[index] < item?.min_order_qty ? (
                          <div className="text-danger fs-5">
                            {selectedMultiLangData?.minimum_order_qty}:{" "}
                            {item?.min_order_qty}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <hr className="horizantal-line" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <Norecord
                  heading={selectedMultiLangData?.your_wishlist_is_empty}
                  content={
                    selectedMultiLangData?.items_added_to_your_wishlist_will_show_up_here
                  }
                  selectedMultiLangData={selectedMultiLangData}
                />
              </>
            )}
          </div>
          <div className="container ">
            <div className="modal" id="stockModal">
              {showAvailabilityModal === false ? (
                <>
                  <div>
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content ">
                        <div className="modal-header">
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>

                        <div className="modal-body">
                          <div className="stock_availibility_table table-responsive">
                            <table className="stock text-center w-100 ">
                              <thead>
                                <tr>
                                  <th className="text-center wishlisttable-header">
                                    {selectedMultiLangData?.warehouse_name}
                                  </th>
                                  <th className="text-center wishlisttable-header">
                                    {selectedMultiLangData?.available_stock_qty}
                                  </th>
                                  <th className="text-center wishlisttable-header">
                                    {
                                      selectedMultiLangData?.estimated_incoming_stock_qty
                                    }
                                  </th>
                                  <th className="text-center wishlisttable-header">
                                    {selectedMultiLangData?.incoming_stock_date}
                                  </th>
                                  <th className="text-center wishlisttable-header">
                                    {selectedMultiLangData?.additional_qty}
                                  </th>
                                  <th className="text-center wishlisttable-header">
                                    {selectedMultiLangData?.available_on}
                                  </th>
                                </tr>
                              </thead>

                              {handleFutureStockAvailability(stockAvailability)}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WishlistMaster;
