import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CONSTANTS } from "../../services/config/app-config";
import CardsLoadingLayout from "../../cards/CardsLoadingLayout";

const SpecialOffers = ({ specialOfferTagListingOfProducts }: any) => {
  console.log(
    "specialOfferTagListingOfProducts",
    specialOfferTagListingOfProducts
  );

  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  const DisplaySpecialOffers = () => {
    return (
      <div>
        {specialOfferTagListingOfProducts?.length > 0 &&
        specialOfferTagListingOfProducts !== null ? (
          <>
            <div className="container" >
              <div className="row justify-content-center">
                {specialOfferTagListingOfProducts.map(
                  (specialItems: any, index: any) => {
                    return (
                      <div
                        className="col-lg-2 col-md-2 mx-md-3 mb-3 card"
                        key={index}
                        style={{ textAlign: "center" }}
                      >
                        <Link href={specialItems.url}>
                          {specialItems.image_url !== null ? (
                            <>
                              <Image
                                loader={imageLoader}
                                src={specialItems.image_url}
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
                            <Link href={specialItems.url}>
                              {specialItems.item_name}
                            </Link>
                          </h4>
                          <div className="product-price">
                            <ins className="new-price">
                              ₹{specialItems?.price}
                            </ins>
                            <del className="old-price">
                              ₹{specialItems?.mrp_price}
                            </del>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
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
      </div>
    );
  };

  return (
    <>
    <div className="newArrival3">
      <div className="container">
        <h3 className="text-center category_heading">Special Offers</h3>
        {DisplaySpecialOffers() as any}
      </div>
    </div>
    </>
  );
};

export default SpecialOffers;
