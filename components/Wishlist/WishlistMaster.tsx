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
const WishlistMaster = () => {
  const { productQuantity, stockAvailability } = useProductDetail();
  console.log("stock check", stockAvailability);
  const dispatch = useDispatch();
  let requestNew: any;
  let requestList: any;
  const { wishlistData, wishlistCount, Loadings } = useWishlist();
  console.log("wishlist response in render file", wishlistData);

  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const [showToast, setshowToast] = useState(false);
  const [productCounts, setProductCounts] = useState<any>({});
  const [alertMinQty, setAlertMinQty] = useState(false);
  const [showAvailabilityModal, setshowAvailabilityModal] = useState(false);
  const router = useRouter();
  const handleQuantityChange = (event: any, productId: any, min_qty: any) => {
    const inputCount = parseInt(event);
    console.log(inputCount, "inputCount");
    if (!isNaN(inputCount) && inputCount >= 0 && inputCount <= 99999) {
      setProductCounts({
        ...productCounts,
        [productId]: inputCount,
      });
    }
  };

  const incrementCount = (productId: any, min_qty: any) => {
    const currentCount = parseInt(productCounts[productId], 10);
    if (productCounts[productId] === undefined) {
      setProductCounts({
        ...productCounts,
        [productId]: min_qty + 1,
      });
    }
    if (currentCount < 99999) {
      setProductCounts({
        ...productCounts,
        [productId]: (productCounts[productId] || min_qty) + 1,
      });
    }
  };

  const decrementCount = (productId: any, min_qty: any) => {
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

  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  const handleAddCart = async (
    id: any,
    in_stock_status: any,
    productCountsQty: any,
    min_qty: any
  ) => {
    console.log(
      "add to cart id",
      id,
      in_stock_status,
      productCountsQty,
      min_qty
    );
    console.log("cart product count in ", productCounts);

    if (min_qty <= productCountsQty) {
      console.log("add cart success productCountqty");
      const addListMessage = await AddToCartApi(id, productCountsQty);
      if (addListMessage.msg === "success") {
        dispatch(successmsg("item added to cart"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 700);
        router.push("/cart");
      } else {
        dispatch(failmsg("Error in adding item in wishlist"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 700);
      }
      setTimeout(() => {
        dispatch(fetchCartListing());
      }, 5000);
    } else if (productCountsQty === undefined) {
      console.log("add cart failed min qty");
      const addListMessage = await AddToCartApi(id, min_qty);
      if (addListMessage.msg === "success") {
        dispatch(successmsg("item added to cart"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 700);
        router.push("/cart");
      } else {
        dispatch(failmsg("Error in adding item in wishlist"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 700);
      }
    }
  };

  const handleStockModel = (id: any, min_qty: any, productQty: any) => {
    if (typeof productQty === "undefined") {
      console.log("dispatch min ");
      const stockAvailable = {
        item_code: id,
        qty: min_qty,
      };
      setshowAvailabilityModal(false);
      dispatch(fetchStockAvailability(stockAvailable));
    } else if (productQty >= min_qty) {
      const stockAvailable = {
        item_code: id,
        qty: productQty,
      };
      console.log("dispatch min1 ");
      console.log(productQty, "idqty");
      setshowAvailabilityModal(false);
      dispatch(fetchStockAvailability(stockAvailable));
    }
  };

  const handleFutureStockAvailability = (doesFutureStockExists: any) => {
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

  const handleRenderingOfImages = (items: any) => {
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
                <h3 className="wishlist-title">My wishlist</h3>
                <div className="row mt-2 mx-4 ">
                  <h5 className="col-lg-5 col-md-4 d-none d-md-block">
                    Product
                  </h5>
                  <h5 className="col-lg-2 col-md-2 col-3 d-none d-md-block">
                    Price
                  </h5>
                  <h5 className="col-lg-2 col-md-2 col-3 d-none d-md-block ">
                    Quantity
                  </h5>
                  <h5 className="col-lg-3 col-md-2 col-3 d-none d-md-block">
                    Actions
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
                                  };
                                  requestList = {
                                    getWishlist: true,
                                    deleteWishlist: false,
                                    addTowishlist: false,
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
                              <span className="bold">Item Code:</span>
                              {item?.name}
                            </p>
                            <a className="text-dark fs-5 bold" href={`${item?.url}?currency=${currency_state_from_redux?.selected_currency_value}`}>
                              {item?.item_name}
                            </a>
                            <p className="mb-0 fs-6 ">
                              {item?.short_description}
                            </p>
                            <p className="mb-0 fs-5 ">
                              <span className="bold">Brand: </span>
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
                          <p
                            className="border price_request"
                          >
                            Price on Request
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
                            minimum order qty: {item?.min_order_qty}
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
                            style={{border:'1px solid #0071DC',borderRadius:"7px", backgroundColor:"#fff"}}
                            onClick={() =>
                              handleAddCart(
                                item?.name,
                                item?.in_stock_status,
                                productCounts[index],
                                item?.min_order_qty
                              )
                            }
                          >
                            Add to cart
                          </button>
                        </div>
                        {productCounts[index] < item?.min_order_qty ? (
                          <div className="text-danger fs-5">
                            minimum order Qty: {item?.min_order_qty}
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
                  heading="Your Wishlist is empty!!"
                  content="Items added to your Wishlist will show up here"
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
                                  <th
                                    className="text-center wishlisttable-header"
                                  >
                                    Warehouse name
                                  </th>
                                  <th
                                    className="text-center wishlisttable-header"
                                  >
                                    Available Stock Qty
                                  </th>
                                  <th
                                    className="text-center wishlisttable-header"
                                  >
                                    Estimated Incoming Stock Qty
                                  </th>
                                  <th
                                    className="text-center wishlisttable-header"
                                  >
                                    Incoming Stock Date
                                  </th>
                                  <th
                                    className="text-center wishlisttable-header"
                                  >
                                    Additional Qty
                                  </th>
                                  <th
                                    className="text-center wishlisttable-header"
                                  >
                                    Available On
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
