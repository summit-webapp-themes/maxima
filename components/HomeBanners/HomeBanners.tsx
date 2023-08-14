import Image from "next/image";
import useHomeBanner from "../../hooks/HomePageHooks/HomeBannerHook";
import Carousel from "react-bootstrap/Carousel";
import CarouselCaption from "react-bootstrap/CarouselCaption";
import CarouselItem from "react-bootstrap/CarouselItem";
import { CONSTANTS } from "../../services/config/app-config";
import loaderGIF from "../../public/assets/images/loader-gif.gif";
import CardsLoadingLayout from "../../cards/CardsLoadingLayout";
import BannerLoaderComponent from "./BannerLoaderComponent";

const HomeBanner = () => {
  const { homeBannerData, isLoading }: any = useHomeBanner();
  console.log("homebanner", homeBannerData, isLoading);

  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };

  console.log("home banner loading", isLoading);
  return (
    <>
      {isLoading === "succeeded" && homeBannerData?.length > 0 ? (
        <>
          <Carousel>
            {homeBannerData?.map((banner: any, index: number) => {
              return (
                <CarouselItem key={index}>
                  <Image
                    loader={myLoader}
                    className="d-block w-100"
                    src={`${banner?.img}`}
                    alt="Banner Images"
                    priority
                    width={1200}
                    height={600}
                  />

                  {/* <CarouselCaption className="corousel-captionn">
                    {banner?.btn_info?.map((btn_item: any, index: number) => (
                      <div
                        className={`text-end carousel_capt`}
                        key={index}
                      >
                        <a href={btn_item?.btn_url} className="text-white">
                          <span className="btn btn-primary banner-btn px-3">
                            {btn_item?.btn_title} &nbsp; <i className="fa fa-forward text-light align-items-center"></i>
                          </span>
                        </a>
                      </div>
                    ))}
                  </CarouselCaption> */}
                </CarouselItem>
              );
            })}
          </Carousel>
        </>
      ) : (
        <>
          <div className="mb-3">
            <BannerLoaderComponent />
          </div>
        </>
      )}
    </>
  );
};
export default HomeBanner;
