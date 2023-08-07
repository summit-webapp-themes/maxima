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
}: any) => {
  const [radioVal, setRadioVal] = useState<any>(false);
  const handleCheck = () => {
    setRadioVal(true);
  };
  const handleChecknew = () => {
    setRadioVal(false);
  };

  return (
    <>
      <h4 className="mb-3 shippingmethod-heading ">
        Shipping Method
      </h4>
      <table width="100%" className="mb-0 mt-1 table table-borderless">
        <tbody>
          <tr className="item_options">
            <td width="50%" className="px-0 py-0 pb-1 ">
              <p className={`text-capitalize mb-0 fs-5 `}>
                Preferred Transport:
              </p>
            </td>
            <td width="50%" className="px-0 py-0 pb-1">
              <div className="d-flex">
                <p className={`text-capitalize mb-0`}>
                  <select
                    className="form-select form-select-lg"
                    aria-label="Default select example"
                    onChange={transportHandle}
                  >
                    <option value="">Select Preferred Transport</option>
                    {transporterlist?.sort()?.map((list: any, i: any) => (
                      <option key={i}>{list}</option>
                    ))}
                  </select>
                  <p className="mb-0 ms-3 mt-1 shipping-ptag">
                    (Transport will be subject to availability)
                  </p>
                </p>
              </div>
            </td>
          </tr>

          <tr className="item_options ">
            <td width="50%" className="px-0 py-0 ">
              <p className={`mb-0 fs-5 `}>
                <label
                  className="form-check-label text-left"
                  htmlFor="flexRadioDefault1"
                >
                  Door Delivery:
                </label>
              </p>
            </td>
            <td width="50%" className="px-0 py-0 ">
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
          <tr className="item_options ">
            <td width="50%" className="px-0 py-0 ">
              <p className={`mb-0 fs-5 `}>
                <label
                  className="form-check-label text-left"
                  htmlFor="flexRadioDefault2"
                >
                  Godown Delivery:
                </label>
              </p>
            </td>
            <td width="50%" className="px-0 py-0 ">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value={1}
                onChange={selectedVal}
                onClick={handleCheck}
              />
            </td>
          </tr>
          <tr className={`item_options ${radioVal? "" : "d-none"}`}>
            <td width="50%" className="px-0 py-0 ">
              <p className={`mb-0 fs-5`}>
                {" "}
                Location (Preferred godown of Transporter):
              </p>
            </td>
            <td width="50%" className="px-0 py-0 ">
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
          <tr className="item_options ">
            <td width="50%" className="px-0 py-0 ">
              <p className={`mb-0  fs-5`}>Special remark (if any): </p>
            </td>
            <td width="50%" className="px-0 py-0 ">
              <input
                type="text"
                className="form-control"
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
