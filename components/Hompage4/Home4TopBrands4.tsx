import useHomeTopBrand from "../../hooks/HomePageHooks/HomeTopBrandHook";
import Image from "next/image";
import { CONSTANTS } from "../../services/config/app-config";
import Link from "next/link";
import displayTagList from "../../services/api/home_page_api/home-display-tag-api"

const HomeTopBrands4= () => {
  const { brandListing }: any = useHomeTopBrand();
  console.log(brandListing, "brandList");
  let vals;
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div className="container" >
      <h3 className="text-center mt-5 text-uppercase brand-heading">Featured Brands</h3>
      <div className="row text-center brand-container ">
        {brandListing?.length > 0 &&
          brandListing?.map((imgs: any, i: any) => (
            <>
              <div className="col-md-2 mb-4 brand-container-sub" key={i} >
                <Link href={`${imgs?.url}?page=1`}>
                    <Image
                      loader={imageLoader}
                      src={imgs?.image}
                      alt="Brand"
                      width="120"
                      height="120"
                      className="hover_border brand-container-img brand-img"
                    />
                  </Link>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default HomeTopBrands4;
