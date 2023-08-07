import React from "react";
import { CONSTANTS } from "../../services/config/app-config";
import Image from "next/image";
import BannerLoaderComponent from "../HomeBanners/BannerLoaderComponent";
import Link from "next/link";
import useNavbar from "../../hooks/GeneralHooks/NavbarHooks/NavbarHook";
import { useSelector } from "react-redux";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";

const SecondaryThemeHomeTopCategories = ({ homeTopCategories }: any) => {
  console.log("homeTopCategories", homeTopCategories);
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <div className="container my-5 category_heading">
        <div className="row category-banner-wrapper grid">
          {homeTopCategories?.length > 0 && homeTopCategories !== null ? (
            <>
              {homeTopCategories?.length > 0 ? (
                <>
                  <>
                  <div className="grid-item col-lg-3 col-sm-6 height-x1">
                      <div className="banner banner-fixed br-sm banner-sm">
                        <figure>
                        <Link href={`/product-category/${homeTopCategories[6]?.slug}?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}>

                          <Image
                            loader={imageLoader}
                            src={homeTopCategories[6]?.product_img}
                            width={500}
                            height={331}
                            className="topcat_banner"
                            alt="categories banner img"
                          />
                          </Link>
                        </figure>
                      </div>
                    </div>
                    <div className="grid-item col-lg-5 col-md-8 col-sm-7 height-x2">
                      <div className="banner banner-fixed br-sm banner-lg">
                        <figure>
                        <Link href={`/product-category/${homeTopCategories[8]?.slug}?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}>
                          <Image
                            loader={imageLoader}
                            src={homeTopCategories[8]?.product_img}
                            width={500}
                            height={331}
                            className="topcat_banner"
                            alt="categories banner img"
                          />
                          </Link>
                        </figure>
                      </div>
                    </div>
                  
                    <div className="grid-item col-lg-4 col-md-4 col-sm-5 height-x2">
                      <div className="banner banner-fixed br-sm banner-md">
                        <figure>
                        <Link href={`/product-category/${homeTopCategories[0]?.slug}?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}>
                          <Image
                            loader={imageLoader}
                            src={homeTopCategories[0]?.product_img}
                            width={500}
                            height={331}
                            className="topcat_banner"
                            alt="categories banner img"
                          />
                          </Link>
                        </figure>
                      </div>
                    </div>
                  </>
                </>
              ) : (
                <>
                  <div className="col-lg-3 text-end">
                    <Image
                      src="/assets/images/maximaCard.jpg"
                      width="300"
                      height="250"
                      alt="categories banner img"
                      style={{ height: "250px", width: "auto" }}
                    />
                  </div>
                  <div className="col-lg-6" style={{ backgroundColor: "gray" }}>
                    <Image
                      src="/assets/images/maximaCard.jpg"
                      width="300"
                      height="250"
                      alt="categories banner img"
                      style={{ height: "250px", width: "auto" }}
                    />
                  </div>
                  <div className="col-lg-3">
                    <Image
                      src="/assets/images/maximaCard.jpg"
                      width="300"
                      height="250"
                      alt="categories banner img"
                      style={{ height: "250px", width: "auto" }}
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="container">
              <div className="row justify-content-center">
                {[...Array(3)].map(() => (
                  <>
                    <div className="col-lg-3 mx-5">
                      <BannerLoaderComponent />
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SecondaryThemeHomeTopCategories;
