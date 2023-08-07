import Image from "next/image";
import React from "react";
import useHomeTopCategories from "../../hooks/HomePageHooks/HomeTopCategoriesHook";
import { CONSTANTS } from "../../services/config/app-config";
import BannerLoaderComponent from "../HomeBanners/BannerLoaderComponent";

const SecondaryThemeTopCategoriesBanner = ({ homeTopCategories }: any) => {
  // const { homeTopCategories, isLoading } = useHomeTopCategories();
  console.log("homeTopCategories3", homeTopCategories);
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div className="container category_heading">
        <div className="row">
          {homeTopCategories?.length > 0 && homeTopCategories !== null ? (
            <>
              {homeTopCategories?.length > 0 ? (
              
                <>
                  {homeTopCategories
                    ?.slice(4, 6)
                    ?.map((banner: any, index: any) => (
                      <div className="col-lg-6 col-12" key={banner.name}>
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
                  <div className="col-lg-3 text-end">
                    <Image
                      src="/assets/images/maximaCard.jpg"
                      width="300"
                      height="250"
                      alt="categories banner img"
                      style={{ height: "250px",width:"auto" }}
                    />
                  </div>
                  <div className="col-lg-6" style={{ backgroundColor: "gray" }}>
                    <Image
                      src="/assets/images/maximaCard.jpg"
                      width="300"
                      height="250"
                      alt="categories banner img"
                      style={{ height: "250px",width:"auto" }}
                    />
                  </div>
                  <div className="col-lg-3">
                    <Image
                      src="/assets/images/maximaCard.jpg"
                      width="300"
                      height="250"
                      alt="categories banner img"
                      style={{ height: "250px",width:"auto" }}
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

export default SecondaryThemeTopCategoriesBanner;
