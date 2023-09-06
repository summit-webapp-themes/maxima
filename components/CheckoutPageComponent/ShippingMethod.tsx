import React, { useState } from "react";

const ShippingMethod = ({
  transporterlist,
  transportHandle,
  transporterState,
  selectedVal,
  selectedState,
  queryHandle,
  locationHandle,
  transportCharges,
  locationState,
  textState,
  transportersCharges,
  selectedMultiLangData,
}: any) => {
  const [radioVal, setRadioVal] = useState<any>(false);
  const handleCheck: any = () => {
    setRadioVal(true);
  };
  const handleChecknew: any = () => {
    setRadioVal(false);
  };

  return (
    <>
      <h4 className="mb-1 mt-5 shippingmethod-heading shipping-method-margin products-name " >
        {" "}
        {selectedMultiLangData?.shipping_method}
      </h4>
      <table width="100%" className="mb-0 mt-0 table table-borderless " >
        <tbody className="table-margin products-name">
          <tr className="item_options">
            <td width="50%" className="px-0 py-0 pb-1 ">
              <p className={`text-capitalize mb-0 fs-5  `}>
                {selectedMultiLangData?.preferred_transport}:
              </p>
            </td>
            <td width="50%" className="px-0 py-0 pb-1">
              <div className="d-flex">
                <p className={`text-capitalize mb-0 products-name`}>
                  <select
                    className="form-select form-select-lg products-name"
                    aria-label="Default select example"
                    onChange={transportHandle}
                  >
                    <option value="">
                      {selectedMultiLangData?.select_preferred_transport}
                    </option>
                    {transporterlist?.sort()?.map((list: any, i: any) => (
                      <option key={i}>{list}</option>
                    ))}
                  </select>
                  <p className="mb-0 ms-3 mt-1 shipping-ptag products-name">
                    {
                      selectedMultiLangData?.transport_will_be_subject_to_availability
                    }
                  </p>
                </p>
              </div>
            </td>
          </tr>

          <tr className="item_options products-name ">
            <td width="50%" className="px-0 py-0 products-name">
              <p className={`mb-0 fs-5 `}>
                <label
                  className="form-check-label text-left products-name"
                  htmlFor="flexRadioDefault1"
                >
                  {selectedMultiLangData?.door_delivery}
                </label>
              </p>
            </td>
            <td width="50%" className="px-0 py-0 products-name">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value={0}
                onChange={selectedVal}
                onClick={handleChecknew}
              />
            </td>
          </tr>
          <tr className="item_options products-name">
            <td width="50%" className="px-0 py-0 products-name">
              <p className={`mb-0 fs-5 `}>
                <label
                  className="form-check-label text-left products-name"
                  htmlFor="flexRadioDefault2"
                >
                  {selectedMultiLangData?.godown_delivery}
                </label>
              </p>
            </td>
            <td width="50%" className="px-0 py-0 products-name ">
              <input
                className="form-check-input products-name"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value={1}
                onChange={selectedVal}
                onClick={handleCheck}
              />
            </td>
          </tr>
          <tr className={`item_options ${radioVal ? "" : "d-none"} products-name`}>
            <td width="50%" className="px-0 py-0 ">
              <p className={`mb-0 fs-5 products-name`}>
                {selectedMultiLangData?.Location_godown_tranporter}
              </p>
            </td>
            <td width="50%" className="px-0 py-0 products-name ">
              <input
                type="text"
                className="form-control"
                id="loacation"
                value={locationState}
                placeholder="Preferred Location"
                onChange={locationHandle}
              />
            </td>
          </tr>
          <tr className="item_options products-name">
            <td width="50%" className="px-0 py-0 ">
              <p className={`mb-0  fs-5 products-name`}>
                {selectedMultiLangData?.special_remark_if_any} :{" "}
              </p>
            </td>
            <td width="50%" className="px-0 py-0 products-name">
              <input
                type="text"
                className="form-control products-name"
                id="query"
                value={textState}
                placeholder="Remark if any"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Remark if any")}
                onChange={queryHandle}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ShippingMethod;
