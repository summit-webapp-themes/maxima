import React, { useState } from "react";
import UseDealerLedgerHook from "../../hooks/DealerLedgerHooks/dealer-ledger-hook";
import DealerAccounting from "./DealerAccounting";
import { useDispatch, useSelector } from "react-redux";
import { dealerLedgerStore, fetchDealerLedger } from "../../store/slices/dealer-ledger-slice/dealer-ledger-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import DealerLedgerTable from "./DealerLedgerTable";

const DealerLedger = () => {
  const dispatch = useDispatch();
  const { dealerLedgerSummary }: any = UseDealerLedgerHook();

  const dealerledgerData = useSelector(dealerLedgerStore);

  const TokenFromStore: any = useSelector(get_access_token);

  console.log("DealerLedgerSummary in tsx", dealerLedgerSummary);
  console.log("DealerLedgerData in tsx", dealerledgerData);

  let customFromDate: any;
  let customToDate: any;

  const [fieldDisable, setFieldDisable] = useState<boolean>(false);
  const [dlSelectedmonth, setDlSelectedMonth] = useState<any>("");
  const [dlFromDate, setDlFromDate] = useState<any>("");
  const [dlToDate, setDlToDate] = useState<any>("");
  const [showDlData, setDlData] = useState<boolean>(false)

  console.log("showDlData", showDlData)
  const [year, month, day] = dlFromDate.split("-");
  customFromDate = [day, month, year].join("-");
  const [toYear, toMonth, toDay] = dlToDate.split("-");
  customToDate = [toDay, toMonth, toYear].join("-");

  const HandleLedgerData = () => {
    console.log("onsubmit data", dlSelectedmonth, dlFromDate, dlToDate)
    const getDealerLedgerParams = {
      partyName: dealerLedgerSummary?.party_name,
      month: dlSelectedmonth,
      fromDate: customFromDate,
      toDate: customToDate,
      token: TokenFromStore?.token
    }
    dispatch(fetchDealerLedger(getDealerLedgerParams))
    setDlSelectedMonth("")
    setDlFromDate("")
    setDlToDate("")
    setDlData(true)
  }




  return (
    <>
      <div className="container">

        <DealerAccounting dealerLedgerSummary={dealerLedgerSummary} />

        <div className="row text-center dealer-ledger-container">
          <div className="col-lg-3">
            <h5>Account Name :</h5>
            <div className="mt-5 fs-2 bold">
              {dealerLedgerSummary?.party_name}
            </div>
          </div>
          <div className="col-lg-2">
            <div className="text-start">
              <input
                type="radio"
                className="form-check-input"
                id="radio1"
                name="optradio"
                value="option1"
                onClick={() => setFieldDisable(false)}
                defaultChecked
              />
              <label className="form-check-label ms-3" htmlFor="radio1">
                Month
              </label>
            </div>
            <select
              // className="form-select mt-3"
              className={`${fieldDisable ? "" : "disabled"} form-select mt-5`}
              disabled={fieldDisable}
              onChange={(e) => setDlSelectedMonth(e.target.value)}

            >
              <option>SELECT MONTH</option>
              {dealerLedgerSummary?.months?.map(
                (month: string, index: number) => (
                  <>
                    <option key={index} value={month}>
                      {month}
                    </option>
                  </>
                )
              )}
            </select>
          </div>

          <div className="col-lg-4">
            <div className="text-start ms-5">
              <input
                type="radio"
                className="form-check-input"
                id="radio2"
                name="optradio"
                value="option1"
                onClick={() => setFieldDisable(true)}
              />
              <label className="form-check-label ms-3 text-start" htmlFor="radio1">
                Date Range
              </label>
            </div>
            <div className="row mt-3">
              <div className="col-lg-6">
                <input
                  type="date"
                  id="FromDate"
                  value={dlFromDate}
                  name="FromDate"
                  onChange={(e) => setDlFromDate(e.target.value)}
                  className={`${fieldDisable ? "" : "disabled"} mt-2`}
                  disabled={!fieldDisable}


                />
              </div>
              <div className="col-lg-4 ml-5">
                <input
                  type="date"
                  id="toDate"
                  value={dlToDate}
                  name="ToDate"
                  onChange={(e) => setDlToDate(e.target.value)}
                  className={`${fieldDisable ? "" : "disabled"} mt-2`}
                  disabled={!fieldDisable}

                />
              </div>
            </div>
          </div>
          <div className="col-lg-2 ">
            <button className="btn btn-primary rounded-3 my-3" onClick={HandleLedgerData}>Submit</button>
          </div>
        </div>

        {showDlData === true && (
          <DealerLedgerTable dealerLedgerSummary={dealerLedgerSummary} />
        )}
      </div>
    </>
  );
};

export default DealerLedger;
