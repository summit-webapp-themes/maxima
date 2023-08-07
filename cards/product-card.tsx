import Image from "next/image";
import Link from "next/link";
import { CONSTANTS } from "../services/config/app-config";
import { ProductCardProps } from "../interfaces/product-card-interface";
import { fetchWishlistUser } from "../store/slices/wishlist-slice/wishlist-slice";
import { useDispatch } from "react-redux";

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
  } = props;

  let wishproducts: any;
  let requestNew: any;
  let requestList: any;

  const dispatch = useDispatch();
  let isLoggedIn: any;
  if (typeof window !== "undefined") {
    isLoggedIn = localStorage.getItem("isLoggedIn");
  }

  return (
    <div key={key} className="border p-3 rounded-3 h-100 ">
      <div className="d-flex justify-content-between mb-1">
        <div
          className={`badge text-bg-primary fs-5 display_tag_badge ${
            display_tag.length > 0 && display_tag[0] ? "visible" : "invisible"
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
          </div>
        </div>
      </div>
    </div>
    // <div className="product_card">
    //   <div className="">
    //     <div className={!in_stock_status ? "out_of_stock" : "in_stock"}>
    //       {<p className="out_of_stock_text mb-0">Out of stock</p>}
    //     </div>
    //   </div>

    //   <div className="card_inner">
    //     <div className="card_img">
    //       <Link href={url} className="">
    // <Image
    //   loader={() => `${CONSTANTS.API_BASE_URL}${img_url}`}
    //   src={`${CONSTANTS.API_BASE_URL}${img_url}`}
    //   alt="product-detail"
    //   width={142}
    //   height={142}
    //   className="img-fluid"
    // />
    //       </Link>
    //     </div>

    //     <div className="row mt-3">
    //       <div className="col-12 d-flex justify-content-between">
    //         <div>
    //           <p className="product_name mb-0">
    //             <div className="display_tag">
    //               {display_tag?.length > 0 ? (
    //                 <>
    //                   {display_tag
    //                     ?.slice(0, 1)
    //                     ?.map((item: any, index: number) => {
    //                       console.log("display in map", item);
    //                       return (
    //                         <>
    //                           <span
    //                             className="d-inline-block px-1 py-0 text-uppercase"
    //                             style={{
    //                               border: "1px solid #96c7ef",
    //                               backgroundColor: "#cae0f1",
    //                               fontSize: "12px",
    //                             }}
    //                           >
    //                             {item}
    //                           </span>
    //                         </>
    //                       );
    //                     })}
    //                 </>
    //               ) : (
    //                 ""
    //               )}
    //             </div>
    //             <Link href={url} className="text-dark">{item_name}</Link>
    //           </p>
    //         </div>
    //         {in_stock_status ? (
    //           <div className="cart ps-2">
    //             <a className="prodCart" style={{ cursor: "pointer" }}>
    //               <span
    //                 className="material-symbols-outlined"
    //                 id="shopping_cart"
    //               >
    //                 shopping_cart
    //               </span>
    //             </a>
    //             {/* </Link> */}
    //           </div>
    //         ) : (
    //           ""
    //         )}
    //       </div>
    //     </div>

    //     <div className="product-price">
    //       <p className="mb-0 price_p">
    //         <i className="fa fa-inr" aria-hidden="true"></i>
    //         <span className="price pe-2 ">{price}</span>
    //         <span className="price">
    //           <s>{mrp_price}</s>
    //         </span>
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProductCard;
