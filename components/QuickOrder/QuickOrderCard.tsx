import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../services/config/app-config";
import Image from "next/image";
import Link from "next/link";
import IndianNumber from "./IndianNumber";

const QuickOrderCard = (props: any) => {
  const { partNumbersData, handleRemove, showMinQty, handleInputChange } =
    props;
  console.log(partNumbersData, "quickOrderPartNumbersData");
  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  let total: any;
  return (
    <>
      <div className="mt-3">
        <div className="col-12"></div>

        {partNumbersData?.length > 0 &&
          partNumbersData !== null &&
          partNumbersData
            .filter(
              (element: any, i: any) =>
                i ===
                partNumbersData.findIndex(
                  (elem: any) =>
                    elem.oem_part_number === element.oem_part_number
                )
            )
            .map((data: any, index: any) => (
              <>
                <div className="row mt-3 mb-3">
                  <div className="col-3 text-start">
                    {data.image_url !== null ? (
                      <Image
                        loader={myLoader}
                        src={`${data.image_url}`}
                        // src={maximaCard}
                        alt="product-img"
                        width={100}
                        height={100}
                        className="img-fluid"
                      />
                    ) : (
                      <Image
                        loader={myLoader}
                        src={`${data.brand_img}`}
                        // src={maximaCard}
                        alt="product-img"
                        width={100}
                        height={100}
                        className="img-fluid"
                      />
                    )}
                  </div>
                  <div className="col-3 text-start">
                    <p className="mb-0">Item Code: {data.item_name}</p>
                    <p className="mt-2 mb-0">Brand: {data.brand}</p>

                    <Link href="" legacyBehavior>
                      <a
                        onClick={() => {
                          handleRemove(data);
                        }}
                        className="delete-link"
                      >
                        Delete
                      </a>
                    </Link>
                  </div>
                  <div className="col-2">
                    <p>
                      {data.price !== 0 ? (
                        <IndianNumber value={data?.price} />
                      ) : (
                        <p
                          className="border price_request"
                        >
                          Price on Request
                        </p>
                      )}
                    </p>
                  </div>
                  <div className="col-2">
                    {
                      <>
                        <input
                          type="number"
                          className="w-25 text-center mb-3"
                          value={data?.min_order_qty}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                        <br />
                      </>
                    }
                  </div>
                  <div className="col-2">
                    <p>
                      <IndianNumber
                        value={(total = data.price * data.min_order_qty)}
                      />
                    </p>
                  </div>
                </div>
              </>
            ))}
      </div>
    </>
  );
};

export default QuickOrderCard;
