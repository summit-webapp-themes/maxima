import React from "react";
import { CONSTANTS } from "../../services/config/app-config";
import Image from "next/image";
import BannerLoaderComponent from "../HomeBanners/BannerLoaderComponent";
import Link from "next/link";
import useNavbar from "../../hooks/GeneralHooks/NavbarHooks/NavbarHook";

const HomeTopCategoriesBanner = ({ homeTopCategories }: any) => {
  console.log("homeTopCategories", homeTopCategories);
  const { selectedCurrencyValue } = useNavbar();
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <div className="container my-5">
        <div className="row">
          {homeTopCategories?.length > 0 && homeTopCategories !== null ? (
            <>
              {homeTopCategories.length > 3 ? (
                <>
                  {homeTopCategories
                    ?.slice(3, 5)
                    ?.map((banner: any, index: any) => (
                      <div
                        className="col-lg-6 col-12 text-center mb-lg-0 mb-2"
                        key={banner.name}
                      >
                        <>
                          <Image
                            loader={imageLoader}
                            src={banner.product_img}
                            alt="banner of Topcategory"
                            width={600}
                            height={150}
                            className="topcat_banner"
                          />
                        </>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  <div className="col-lg-6 text-center">
                    <Link
                      href={`/product-category/juicer?page=1&currency=${selectedCurrencyValue}`}
                    >
                      <Image
                        src="/assets/images/jucierBanner.png"
                        alt="banner of Topcategory"
                        width={600}
                        height={350}
                        className="hometopcat_banner"
                      />
                    </Link>
                  </div>
                  <div className="col-lg-6">
                    <Link
                      href={`/product-category/moisturizers?page=1&currency=${selectedCurrencyValue}`}
                    >
                      <Image
                        src="/assets/images/moisturizerBanner.png"
                        alt="banner of Topcategory"
                        width={600}
                        height={350}
                        className="hometopcat_banner"
                      />
                    </Link>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="row justify-content-center">
              {[...Array(2)].map(() => (
                <>
                  <div className="col-lg-6 col-12">
                    <BannerLoaderComponent />
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeTopCategoriesBanner;
