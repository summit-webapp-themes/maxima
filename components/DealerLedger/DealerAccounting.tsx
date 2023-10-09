import React from 'react';

const DealerAccounting = ({
  dealerLedgerSummary,
  selectedMultiLangData,
}: any) => {
  return (
    <>
      <div className="col-lg-5 card border-dark border-end-0 rounded-0 color-black">
        <div className="row">
          <div className="col-md-6">
            <div className="text-center fs-3 color-black ledger-container mt-4">
              <h3 className="text-center mt-2 mb-0 color-black">
                {dealerLedgerSummary?.remaining_credit_balance}
              </h3>
              {selectedMultiLangData?.remaining_credit_balance}
            </div>
          </div>
          <div className="col-md-6">
            <div className=" px-3 fs-3 text-center color-black ledger-container mt-4">
              <h3 className="text-center mt-2 mb-0 color-black">
                {dealerLedgerSummary?.remaining_credit_balance}
              </h3>
              {selectedMultiLangData?.total_credit_amount}
            </div>
          </div>
          <div className="col-md-6">
            <div className=" fs-3 text-center ledger-container mt-4">
              <h3 className="text-center mt-2 mb-0 color-black">
                {dealerLedgerSummary?.opening_balance}
              </h3>
              {selectedMultiLangData?.payment_due}
            </div>
          </div>
          <div className="col-md-6">
            <div className=" fs-3 text-center color-black ledger-container mb-4 mt-4">
            <h3 className="text-center mt-2 mb-0 color-black">
                {dealerLedgerSummary?.payment_due_date
                  ?.split('-')
                  ?.reverse()
                  .join('-')}
              </h3>
              {selectedMultiLangData?.due_on}   
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col-lg-3 card border-info mx-auto px-0">
            <div className="card-header fs-3">Due on</div>
            <h3 className="text-center mt-2">
              {dealerLedgerSummary?.payment_due_date
                ?.split("-")
                ?.reverse()
                .join("-")}
            </h3>
          </div> */}
    </>
  );
};

export default DealerAccounting;
