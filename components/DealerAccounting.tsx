import React from "react";

const DealerAccounting = ({ dealerLedgerSummary }: any) => {
  return (
    <>
      <div className="container my-5">
        <div className="row ">
          <div className="col-lg-3 card border-dark mx-auto px-0">
            <div className="card-header  text-center fs-3">
              Remaining Credit Balance
            </div>
            <h3 className="text-center mt-2 mb-0">
              {dealerLedgerSummary?.remaining_credit_balance}
            </h3>

            <div className="card-header px-3 fs-3 my-0 mt-2 text-center">
              Total Credit Amount
            </div>
            <h3 className="text-center mt-2">
              {dealerLedgerSummary?.remaining_credit_balance}
            </h3>
          </div>
          <div className="col-lg-3 card border-info mx-auto px-0">
            <div className="card-header fs-3">Payment Due</div>
            <h3 className="text-center mt-2">
              {dealerLedgerSummary?.opening_balance}
            </h3>
          </div>
          <div className="col-lg-3 card border-info mx-auto px-0">
            <div className="card-header fs-3">Due on</div>
            <h3 className="text-center mt-2">
              {dealerLedgerSummary?.payment_due_date
                ?.split("-")
                ?.reverse()
                .join("-")}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealerAccounting;
