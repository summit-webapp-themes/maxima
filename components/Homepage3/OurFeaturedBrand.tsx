import React, { useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import useHomeTopBrand from "../../hooks/HomePageHooks/HomeTopBrandHook";
import { CONSTANTS } from "../../services/config/app-config";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Grid,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ListViewLoadingLayout from "../ProductListingComponents/products-data-view/ListViewLoadingLayout";
import ProductDetailLoadingLayout from "../ProductDetailComponents/ProductDetailLoadingLayout";
const OurFeaturedBrand = () => {
  const { brandListing }: any = useHomeTopBrand();
  console.log(brandListing, "brandList");
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div className="container">
        <h3 className="text-center category_heading">Featured Brands</h3>
        <div className="row">
          <div className="col-md-4">
            <Image
              src="/assets/images/ternary-them-brand.png"
              alt="Brand"
              width="800"
              height="600"
              className="hover_border brand-container-img ternary-theme-brandimg"
            />
          </div>
          <div className="col-md-8">
            <div className="row text-center brand-container ">
              {brandListing?.length > 0 &&
                brandListing?.map((imgs: any, i: any) => (
                  <>
                    <div className="col-md-3 mb-4 brand-container-sub" key={i}>
                      <Link href={`${imgs?.url}?page=1`}>
                        <Image
                          loader={imageLoader}
                          src={imgs?.image}
                          alt="Brand"
                          width="123"
                          height="133"
                          className="hover_border brand-container-img ternaryTheme-grayimg"
                        />
                      </Link>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
  
      </div>
    </>
  );
};

export default OurFeaturedBrand;
