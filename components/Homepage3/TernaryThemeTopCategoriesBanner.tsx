import Image from "next/image";
import React from "react";
import useHomeTopCategories from "../../hooks/HomePageHooks/HomeTopCategoriesHook";
import { CONSTANTS } from "../../services/config/app-config";
import BannerLoaderComponent from "../HomeBanners/BannerLoaderComponent";

const TernaryThemeTopCategoriesBanner = ({ homeTopCategories }: any) => {
  // const { homeTopCategories, isLoading } = useHomeTopCategories();
  console.log("homeTopCategories3", homeTopCategories);
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div className="container my-5 category_heading">
        <div className="row">
          {homeTopCategories?.length > 0 && homeTopCategories !== null ? (
            <>
              {homeTopCategories?.length > 0 ? (
                <>

                    <>
                      <div className="col-lg-4">
                        <Image
                          loader={imageLoader}
                          src={homeTopCategories[1]?.product_img}
                          width={500}
                          height={331}
                          className=""
                          alt="categories banner img"
                       
                        />
                      </div>
                      <div className="col-lg-4" >
                        <Image
                          loader={imageLoader}
                          src={homeTopCategories[0]?.product_img}
                          width={500}
                         height={260}
                         className="ternarytheme-topcategory"
                          alt="categories banner img"
                        
                        />
                      </div>
                      <div className="col-lg-4">
                        <Image
                          loader={imageLoader}
                          src={homeTopCategories[2]?.product_img}
                          width={500}
                          height={331}
                          alt="categories banner img"
                        
                        />
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

export default TernaryThemeTopCategoriesBanner;
