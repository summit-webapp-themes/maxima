import React, { useState } from "react";
import IndianNumber from "./IndianNumber";

const FinalReviewSection = ({
  orderSummary,
  handlePlaceOrder,
  deleteCoupon,
  selectedMultiLangData,
}: any) => {
  const [acceptedTerms, setAcceptedTerms] = useState<any>(false);

  const handleAcceptTerms: any = () => {
    setAcceptedTerms(!acceptedTerms);
  };
  console.log("?.values", orderSummary);
  return (
    <>
      <div className="finalreview pb-3 pr-3">
        <h4 className="mb-3 finalreview-heading ">
          {selectedMultiLangData?.final_review}
        </h4>
        <table width="100%" className="mb-0 mt-1 table table-borderless">
          <tbody>
            <tr className="item_options">
              <td width="50%" className="px-0 py-0 pb-1 ">
                <p className={`text-capitalize mb-0 fs-4 bold `}>
                  {selectedMultiLangData?.sub_total}:
                </p>
              </td>
              <td width="50%" className="px-0 py-0 pb-1">
                <p className={`text-capitalize mb-0`}>
                  {}
                  {orderSummary
                    ?.filter(
                      (vals: any) => vals?.name === "Subtotal Excluding Tax"
                    )
                    .map((vals: any, index: any) => (
                      <IndianNumber value={vals?.value} key={index} />
                    ))}
                </p>
              </td>
            </tr>

            <tr className="item_options ">
              <td width="50%" className="px-0 py-0 ">
                <p className={`mb-0 fs-4 bold `}>
                  {" "}
                  {selectedMultiLangData?.order_total_including_tax}:
                </p>
              </td>
              <td width="50%" className="px-0 py-0 ">
                {}
                {orderSummary
                  ?.filter(
                    (vals: any) => vals?.name === "Subtotal Including Tax"
                  )
                  .map((vals: any, index: any) => (
                    <IndianNumber value={vals?.value} key={index} />
                  ))}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="form-check mt-4">
          <input
            className="form-check-input checkbox-cursor"
            type="checkbox"
            id="flexCheckChecked"
            checked={acceptedTerms}
            onChange={handleAcceptTerms}
          />
          <label
            className="form-check-label text-dark text-label"
            htmlFor="flexCheckChecked"
          >
            {selectedMultiLangData?.place_order_confirmation_text}
          </label>
        </div>
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={!acceptedTerms}
          className="d-grid gap-2 col-lg-10 col-12 btn btn-md standard_button_filled mt-2"
        >
          {deleteCoupon}
          {selectedMultiLangData?.place_order}
        </button>
      </div>
    </>
  );
};

export default FinalReviewSection;
