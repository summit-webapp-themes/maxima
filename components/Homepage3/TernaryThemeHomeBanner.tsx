import Image from "next/image";
import React from "react";
import { CONSTANTS } from "../../services/config/app-config";
import useHomeBanner from "../../hooks/HomePageHooks/HomeBannerHook";

const TernaryThemeHomeBanner = () => {
    const { homeBannerData, isLoading } = useHomeBanner();
    console.log("homebanner",homeBannerData, isLoading);
  
    const myLoader = ({ src, width, quality }: any) => {
      return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
    };
  return (
    <>
      <div className="intro-section mb-2">
        <div className="row">
          <div className="intro-slide-wrapper col-lg-8">
            <div className="swiper-container swiper-theme animation-slider pg-inner pg-xxl-hide pg-show pg-white nav-xxl-show nav-hide">
              <div className="swiper-wrapper gutter-no row cols-1">
                <div className="banner banner-fixed intro-banner col-lg-12 col-sm-6 br-sm mb-4 d-flex justify-content-around">
                  <figure>
                 { homeBannerData?.length>0 && <Image
                    loader={myLoader}
                    className="d-block w-100"
                    src={homeBannerData[0]?.img}
                    alt="Banner Images"
                    priority
                    width={1200}
                    height={600}
                  />}
                  </figure>
                  <div className="banner-content  ternaryTheme-bannerContent">
                    <a
                      href="shop-banner-sidebar.html"
                      className="btn btn-dark btn-link  btn-icon-right ternaryTheme-btn"
                    >
                      Shop Now<i className="w-icon-long-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="intro-banner-wrapper col-lg-4 ">
            <div className="banner banner-fixed intro-banner col-lg-12 col-sm-6 br-sm mb-1 d-flex justify-content-around">
              <figure>
              { homeBannerData?.length>0 && <Image
                    loader={myLoader}
                    className="d-block w-100"
                    src={homeBannerData[1]?.img}
                    alt="Banner Images"
                    priority
                    width={800}
                    height={600}
                  />}
              </figure>
              <div className="banner-content ternaryTheme-bannerContent">
                <a
                  href="shop-banner-sidebar.html"
                  className="btn btn-dark btn-link ternaryTheme-btn btn-icon-right"
                >
                  Shop Now<i className="w-icon-long-arrow-right"></i>
                </a>
              </div>
            </div>

            <div className="banner banner-fixed intro-banner col-lg-12 col-sm-6 intro-banner2 mb-2 br-sm d-flex justify-content-around">
              <figure>
              { homeBannerData?.length>0 && <Image
                    loader={myLoader}
                    className="d-block w-100"
                    src={homeBannerData[2]?.img}
                    alt="Banner Images"
                    priority
                    width={800}
                    height={600}
                  />}
              </figure>
              <div className="banner-content ternaryTheme-bannerContent">
                <a
                  href="shop-banner-sidebar.html"
                  className="btn btn-white btn-link ternaryTheme-btn btn-icon-right"
                >
                  Shop Now<i className="w-icon-long-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TernaryThemeHomeBanner;
