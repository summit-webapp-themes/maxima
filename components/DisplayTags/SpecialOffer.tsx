import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CONSTANTS } from "../../services/config/app-config";
import CardsLoadingLayout from "../../cards/CardsLoadingLayout";
const SpecialOffer = ({ specialTagListing }: any) => {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div className="">
        <div className="container">
          <div className="row banner-product-wrapper pb-1">
            <h3 className="text-center category_heading">Special Offer</h3>
            <div className="banner-product col-xl-3 col-md-4 mb-4 mb-md-0">
              <div className="banner banner-fixed overlay-zoom br-xs">
                <figure className="banner-media h-100">
                  <Image
                    src="/assets/images/verticalBanner.jpg"
                    alt="Product Banner"
                    width="431"
                    height="800"
                  />
                </figure>
                <div className="banner-content">
                  <h5 className="banner-subtitle text-uppercase font-weight-bold">
                    Accessories
                  </h5>
                  <h3 className="banner-title text-capitalize ls-25">
                    All Smartwatches
                    <br />
                    Discount
                  </h3>
                  <a
                    href="demo15-shop.html"
                    className="btn btn-dark btn-md btn-outline btn-rounded btn-icon-right"
                  >
                    Shop Now<i className="w-icon-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="product-wrapper col-xl-9 col-md-8">
              <div className="swiper-container swiper-theme" />
              <div className="row">
                {specialTagListing?.length > 0 && specialTagListing !== null ? (
                  <>
                    {specialTagListing.map((list: any, i: any) => (
                      <div className="col-md-3 mt-5" key={i}>
                        <div className="product-wrap">
                          <div className="product text-center">
                            <figure className="product-media">
                              {list?.image_url !== null &&
                              list?.image_url?.length > 0 ? (
                                <>
                                  <Link href={list.url}>
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
                                  <Link href={list.url}>
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
                                <Link href={list.url}>{list.item_name}</Link>
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
                        <div className="col-lg-3">
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
    </>
  );
};

export default SpecialOffer;
