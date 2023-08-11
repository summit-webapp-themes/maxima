import React from "react";

const DealerAccounting = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row ">
          <div className="col-lg-3 card border-dark mx-auto px-0">
            <div className="card-header fs-3">Remaining Credit Balance</div>
            {/* <h4 className="text-center"></h4> */}
            <hr />
            <div className="px-3 fs-3">Total Credit Amount</div>
          </div>
          <div className="col-lg-3 card border-info mx-auto px-0">
            <div className="card-header fs-3">Payment Due</div>
          </div>
          <div className="col-lg-3 card border-info mx-auto px-0">
            <div className="card-header fs-3">Due on</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealerAccounting;
