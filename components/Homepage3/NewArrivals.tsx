import React from "react";
import { CONSTANTS } from "../../services/config/app-config";
import Image from "next/image";
import Link from "next/link";
import LoadingLayout from "../../cards/CardsLoadingLayout";
import CardsLoadingLayout from "../../cards/CardsLoadingLayout";

const NewArrivals = ({ newArrivalTagListingOfProducts }: any) => {
  // console.log("newArrivalTagListingOfProducts", newArrivalTagListingOfProducts);
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  const DisplayNewArrivals = () => {
    return (
      <>
        {newArrivalTagListingOfProducts?.length > 0 &&
        newArrivalTagListingOfProducts !== null ? (
          <>
              <div className="row justify-content-center">
                {newArrivalTagListingOfProducts.map(
                  (arrivalItems: any, index: any) => {
                    return (
                      <div
                        className="col-lg-2 col-md-2 mx-md-3 mb-3 card"
                        style={{ textAlign: "center" }}
                        key={index}
                      >
                        <Link href={arrivalItems.url}>
                          {arrivalItems.image_url !== null ? (
                            <>
                              <Image
                                loader={imageLoader}
                                src={arrivalItems.image_url}
                                width={300}
                                height={300}
                                alt="newArrivals img"
                              />
                            </>
                          ) : (
                            <>
                              <Image
                                src="/assets/images/maximaCard.jpg"
                                width="300"
                                height="300"
                                alt="newArrivals img"
                              />
                            </>
                          )}
                        </Link>
                        <div className="product-details">
                          <h4 className="product-name truncate-overflow">
                            <Link href={arrivalItems.url}>
                              {arrivalItems.item_name}
                            </Link>
                          </h4>
                          <div className="product-price">
                            <ins className="new-price">
                              ₹{arrivalItems?.price}
                            </ins>
                            <del className="old-price">
                              ₹{arrivalItems?.mrp_price}
                            </del>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
          </>
        ) : (
          <div className="row justify-content-center">
            {[...Array(8)].map(() => (
              <>
                <div className="col-lg-2 mx-3">
                  <CardsLoadingLayout />
                </div>
              </>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <>
    <div className="newArrival3">
      <div className="container ">
        <h3 className="text-center category_heading">New Arrivals</h3>
        {DisplayNewArrivals() as any}
      </div>
      </div>
    </>
  );
};

export default NewArrivals;
