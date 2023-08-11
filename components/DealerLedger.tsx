import React from "react";
import UseDealerLedgerHook from "../hooks/DealerLedgerHooks/dealer-ledger-hook";
import DealerAccounting from "./DealerAccounting";

const DealerLedger = () => {
  const leger = UseDealerLedgerHook();
  return (
    <>
      <div className="container">
        <DealerAccounting />

        <div className="row text-center my-5">
          <div className="col-lg-2">
            <h5>Account Name :</h5>
            <select className="custom-select w-75" id="inputGroupSelect01">
              <option selected>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-lg-2">
            <input
              type="radio"
              className="form-check-input"
              id="radio1"
              name="optradio"
              value="option1"
              //   onClick={() => setFieldDisable(true)}
            />
            <label className="form-check-label" htmlFor="radio1">
              Month
            </label>
          </div>
          <div className="col-lg-2">Date Range</div>
          <div className="col-lg-2">
            <button className="btn btn-secondary rounded-3 my-3">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealerLedger;
