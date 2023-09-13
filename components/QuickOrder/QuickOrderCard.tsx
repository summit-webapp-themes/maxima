import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../services/config/app-config";
import Image from "next/image";
import Link from "next/link";
import IndianNumber from "./IndianNumber";

const QuickOrderCard = (props: any) => {
  const {
    partNumbersData,
    handleRemove,
    showMinQty,
    handleInputChange,
    selectedMultiLangData,
  } = props;
  console.log(partNumbersData, "quickOrderPartNumbersData");
  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  let total: any;

  const showValue = (qty_value: any) => {
    if (qty_value === 0) {
      return 1;
    } else {
      return qty_value;
    }
  };
  return (
    <>
      {partNumbersData?.length > 0 &&
        partNumbersData !== null &&
        partNumbersData
          .filter(
            (element: any, i: any) =>
              i ===
              partNumbersData.findIndex(
                (elem: any) => elem.oem_part_number === element.oem_part_number
              )
          )
          .map((data: any, index: any) => (
            <>
              {/* <div className="col-lg-2 col-2"></div> */}
              <div className="col-lg-2 col-12 text-start ps-lg-0 products-name cart-image " >
                {data.image_url !== null ? (
                  <Image
                    loader={myLoader}
                    src={`${data.image_url}`}
                    // src={maximaCard}
                    alt="product-img"
                    width={150}
                    height={150}
                    className="img-fluid "
                  />
                ) : (
                  <Image
                    loader={myLoader}
                    src={`${data.brand_img}`}
                    // src={maximaCard}
                    alt="product-img"
                    width={150}
                    height={150}
                    className="img-fluid "
                  />
                )}
              </div>
              <div className="col-lg-7 col-12 mb-5 products-name " >

                <p className="mb-0 quick-detail-lh">
                  {" "}
                  {selectedMultiLangData?.item_name}
                  {data.item_name}
                </p>
                <p className="mb-0 bold">
                  {selectedMultiLangData?.item_code}: {data.name}
                </p>
                <p className=" mb-0 quick-detail-lh">
                  {selectedMultiLangData?.brand}: {data.brand}
                </p>

                <Link href="" legacyBehavior>
                  <a
                    onClick={() => {
                      handleRemove(data);
                    }}
                    className="delete-link delete-blue"
                  >
                    {selectedMultiLangData?.delete}
                  </a>
                </Link>
              </div>
              <div className="col-lg-1 col-12 mx-lg-0 mx-4 price_font_family products-name " >
                <p>
                  {data.price !== 0 ? (
                    <>
                      {data.currency_symbol}
                      <IndianNumber value={data?.price} />
                    </>
                  ) : (
                    <p className="border price_request">
                      {selectedMultiLangData?.price_on_request}
                    </p>
                  )}
                </p>
              </div>
              <div className="col-lg-1 col-6 mx-lg-0 mx-4 products-name">
                {
                  <>
                    <input
                      type="number"
                      className="w-50  text-center mb-3"
                      value={showValue(data?.min_order_qty)}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                    <br />
                  </>
                }
              </div>
              <div className="col-lg-1 col-12 mx-lg-0 mx-4 price_font_family products-name mb-3">
                {data.currency_symbol}
                <IndianNumber
                  value={(total = data.price * showValue(data?.min_order_qty))}
                />
              </div>
            </>
          ))}
    </>
  );
};

export default QuickOrderCard;
