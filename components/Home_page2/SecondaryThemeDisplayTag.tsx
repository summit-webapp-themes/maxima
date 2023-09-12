import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONSTANTS } from "../../services/config/app-config";
import CardsLoadingLayout from "../../cards/CardsLoadingLayout";
import { useSelector } from "react-redux";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";

const SecondaryThemeDisplayTag = (props: any) => {
  const { data } = props;
  console.log("display tag in master", data);
  const [title, setTitle] = useState([]);
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const currency_state_from_redux: any = useSelector(currency_selector_state);

  console.log(currency_state_from_redux, "title");
  // const { bestSellerTagListingOfProducts } =
  //   useDisplayTagHooks();
  return (
    <div className="">
      <div className="container" >
        <div className="row banner-product-wrapper pb-5 ">
          <h3 className="text-center category_heading">{data?.tag_name}</h3>
          <div className="product-wrapper col-xl-12 col-md-12">
            <div className="swiper-container swiper-theme" />
            <div className="row">
              {data?.value?.length > 0 ? (
                <>
                  {data?.value?.length > 0 &&
                    data?.value?.map((list: any, i: any) => (
                      <div className="col-md-3 py-4" key={i}>
                        <div
                          className="h-100 mx-1 mt-5 displaytag-secondaryTheme"
                          key={i}
                        >
                          <div className="product product-widget bb-no">
                            <figure className="product-media">
                              {list?.image_url !== null &&
                              list?.image_url?.length > 0 ? (
                                <>
                                  <Link
                                    href={`${list.url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                                  >
                                    <Image
                                      loader={imageLoader}
                                      src={list?.image_url}
                                      alt="Product"
                                      width="300"
                                      height="300"
                                    />
                                  </Link>
                                </>
                              ) : (
                                <>
                                  <Link
                                    href={`${list.url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                                  >
                                    <Image
                                      // loader={imageLoader}
                                      src={
                                        list?.image_url !== null
                                          ? list?.image_url
                                          : "/assets/images/maximaCard.jpg"
                                      }
                                      alt="Product"
                                      width="300"
                                      height="300"
                                    />
                                  </Link>
                                </>
                              )}
                            </figure>
                            <div className="product-details">
                              <h4 className="product-name">
                                <Link
                                  href={`${list.url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                                >
                                  {list.item_name}
    
                                </Link>
                              </h4>
                              <div className="product-price">
                              <ins className="new-price">₹{list?.price}</ins>
                                 <del className="old-price">
                                 ₹{list?.mrp_price}
                                 </del>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <div className="row justify-content-center">
                  {[...Array(10)].map(() => (
                    <>
                      <div className="col-lg-2 mx-3">
                        <CardsLoadingLayout />
                      </div>
                    </>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryThemeDisplayTag;
