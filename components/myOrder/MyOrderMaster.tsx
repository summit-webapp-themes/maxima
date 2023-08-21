import React, { useEffect, useState } from "react";
import PlaceOrder from "./components/PlaceOrder";
import CancelOrder from "./components/CancelOrder";
import UseCartOrderHistory from "../../hooks/order-listing-page-hook/cart-order-history-hook";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import { useSelector } from "react-redux";

const MyOrderMaster = () => {
  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();

  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  const { orderHistoryItems, handleHistoryDate, history, loadingStatus } =
    UseCartOrderHistory();
  return (
    <>
      <div className="container mt-3">
        <div className="mt-4 row">
          <div className="col-md-6">
            <div className="page_heading">
              <h4 className=" bold text-uppercase mb-3 order-heading">
                {selectedMultiLangData?.your_orders}
              </h4>
            </div>
          </div>
        </div>
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-bs-toggle="tab"
              href="#placed_order"
            >
              {selectedMultiLangData?.orders}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#can_order">
              {selectedMultiLangData?.cancelled}
            </a>
          </li>
        </ul>

        <div className="tab-content ">
          <div id="placed_order" className="container tab-pane active show">
            <br />
            <PlaceOrder
              orderHistoryItems={orderHistoryItems}
              handleHistoryDate={handleHistoryDate}
              selectedMultiLangData={selectedMultiLangData}
              history={history}
              loadingStatus={loadingStatus}
            />
          </div>
          <div id="can_order" className="container tab-pane fade">
            <br />
            <CancelOrder
              orderHistoryItems={orderHistoryItems}
              handleHistoryDate={handleHistoryDate}
              selectedMultiLangData={selectedMultiLangData}
              history={history}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrderMaster;
