import React, { useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import ProductCard from "../../../cards/product-card";
import useWishlist from "../../../hooks/WishListHooks/WishListHooks";
const ProductItemsOptions: any = ({
  items,
  selectedMultiLangData,
  currency_state_from_redux,
}: any) => {
  const { wishlistData }: any = useWishlist();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    mode: "free",
    slides: {
      perView: 5,
    },
    breakpoints: {
      "(max-width: 480px)": {
        slides: {
          perView: 2,
        },
      },
    },
  });

  return (
    <>
      <>
        <div className="navigation-wrapper" >
          <div className="recommended_title mb-4">
            <h2
              className="title justify-content-center pt-2 pb-2 ls-normal mb-5"
              style={{ backgroundColor: "#bdc3c7" }}
            >
              {selectedMultiLangData?.display_tag_heading} {items?.name}{" "}
              {selectedMultiLangData?.products}
            </h2>
          </div>
          <div ref={sliderRef} className=" keen-slider mx-5">
            {items?.values?.length > 0 &&
              items?.values?.map((newdata: any, i: any) => (
                <div
                  className="keen-slider__slide number-slide1 product ml-2 "
                  key={i}
                >
                  <div className=" col-lg-11 p-3 mb-2 mx-0">
                    <ProductCard
                      key={i}
                      name={newdata?.name}
                      currency_symbol={newdata?.currency_symbol}
                      currency_state_from_redux={currency_state_from_redux}
                      item_name={newdata?.item_name}
                      item_slug={newdata?.product_slug}
                      price={newdata?.price}
                      mrp_price={newdata?.mrp_price}
                      img_url={newdata?.image_url}
                      in_stock_status={newdata?.in_stock_status}
                      url={newdata?.url}
                      brand={newdata?.brand}
                      brand_img={newdata?.brand_img}
                      display_tag={newdata?.display_tag}
                      star_rating={newdata?.rating}
                      wishlistData={wishlistData}
                    />
                  </div>
                </div>
              ))}
          </div>
          {items?.values?.length > 5
            ? loaded &&
              instanceRef?.current && (
                <>
                  <Arrow
                    left
                    onClick={(e: any) =>
                      e.stopPropagation() || instanceRef?.current?.prev()
                    }
                    disabled={currentSlide === 0}
                  />
                  <Arrow
                    onClick={(e: any) =>
                      e.stopPropagation() || instanceRef?.current?.next()
                    }
                    disabled={
                      currentSlide ===
                      instanceRef.current.track.details.slides.length - 1
                    }
                  />
                </>
              )
            : ""}
        </div>
      </>
    </>
  );
};

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default ProductItemsOptions;
