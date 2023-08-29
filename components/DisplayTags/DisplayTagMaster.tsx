import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONSTANTS } from "../../services/config/app-config";
import CardsLoadingLayout from "../../cards/CardsLoadingLayout";
import { useSelector } from "react-redux";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";

const DisplayTagMaster = (props: any) => {
  const { data } = props;
  console.log("display tag in master", data);
  const [title, setTitle] = useState<any>([]);
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const currency_state_from_redux: any = useSelector(currency_selector_state);

  console.log(currency_state_from_redux, "title");
  // const { bestSellerTagListingOfProducts } =
  //   useDisplayTagHooks();
  return (
    <div className="">
      <div className="container">
        <div className="row banner-product-wrapper pb-1">
          <h3 className="text-center mb-0 mt-5">{data?.tag_name}</h3>
          <div className="banner-product col-lg-3 col-md-4 d-lg-block d-none mb-4 mb-md-0">
            <div className="banner banner-fixed overlay-zoom br-xs">
              <figure className="banner-media h-100 displaytag-container">
                <Image
                  src={
                    data?.tag_name === "Special Offer"
                      ? "/assets/images/specialOffer.png"
                      : data?.tag_name === "Best Seller"
                      ? "/assets/images/bestseller.png"
                      : data?.tag_name === "New Arrival"
                      ? "/assets/images/newarrival.png"
                      : ""
                  }
                  alt="Product Banner"
                  width="431"
                  height="800"
                />
              </figure>
            </div>
          </div>
          <div className="product-wrapper col-lg-9 col-md-12">
            <div className="swiper-container swiper-theme" />
            <div className="row justify-content-center">
              {data?.value?.length > 0 ? (
                <>
                  {data?.value?.length > 0 &&
                    data?.value?.map((list: any, i: any) => (
                      <div className="border mx-2 mt-5 displaytag-list" key={i}>
                        <div className="product-wrap">
                          <div className="product text-center">
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
                              <h4 className="product-name truncate-overflow">
                                <Link
                                  href={`${list.url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                                >
                                  {list.item_name}
                                </Link>
                              </h4>
                              <div className="product-price">
                                <ins className="new-price">
                                  {list?.currency_symbol} {list?.price}
                                </ins>
                                <del className="old-price">
                                  {list?.currency_symbol} {list?.mrp_price}
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

export default DisplayTagMaster;
