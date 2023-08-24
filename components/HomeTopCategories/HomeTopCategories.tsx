import Image from "next/image";
import { CONSTANTS } from "../../services/config/app-config";
import Link from "next/link";
const HomeTopCategories = ({
  homeTopCategories,
  isLoading,
  selectedCurrencyVal,
}: any) => {
  console.log('display tag in home home top categories');
  // const { homeTopCategories, isLoading } = useHomeTopCategories();
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };
  const handleRenderingOfTopCategories = () => {
    if (isLoading === "pending") {
      <div>Loading ...</div>;
    } else if (homeTopCategories?.length > 0) {
      return (
        <div>
          <div className="intro-wrapper text-center container">
            <div className="row topcategory_row">
              <div className="col-md-6">
                <Link
                  href={`/product-category/nail-polish?page=1&currency=${selectedCurrencyVal}`}
                  className="banner-title text-white text-capitalize ls-25 homecategory_btnlink"
                >
                  <div className="category-banner banner banner-fixed ">
                    <Image
                      loader={imageLoader}
                      src={homeTopCategories[0]?.product_img}
                      alt="Picture of the author"
                      width={700}
                      height={1000}
                      className="topcat_banner"
                    />
                    {/* <div className="banner-content homecategory_btn3">
                         View All
               
                </div> */}
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-12 mb-4">
                    <Link
                      href={`/product-category/juicer?page=1&currency=${selectedCurrencyVal}`}
                      className="banner-title text-white text-capitalize ls-25 homecategory_btnlink"
                    >
                      <div className="category-banner banner banner-fixed ">
                        <figure>
                          <Image
                            loader={imageLoader}
                            src={homeTopCategories[1]?.product_img}
                            alt="Picture of the author"
                            width={100}
                            height={100}
                          />
                        </figure>
                      </div>
                    </Link>
                  </div>
                  <div className="col-12  mb-4">
                    <Link
                      href={`/product-category/t-shirt?page=1&currency=${selectedCurrencyVal}`}
                      className="banner-title text-white text-capitalize ls-25 mb-3 homecategory_btnlink"
                    >
                      <div className="category-banner banner banner-fixed">
                        <figure>
                          <Image
                            loader={imageLoader}
                            src={homeTopCategories[2]?.product_img}
                            alt="Picture of the author"
                            width={100}
                            height={100}
                          />
                        </figure>
                        {/* <div className="banner-content homecategory_btn2">
                      
                        View All
                 
                      </div> */}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-3">
                <Image
                  loader={imageLoader}
                  src={homeTopCategories[0]?.product_img}
                  alt="Picture of the author"
                  width={700}
                  height={200}
                />
              </div> */}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="top_categories_section mt-5">
      <div>
        <h3 className="text-center">Our Handpicked Categories for You</h3>
      </div>
      <div>{handleRenderingOfTopCategories()}</div>
    </div>
  );
};

export default HomeTopCategories;
