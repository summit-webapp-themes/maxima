import React, { useEffect, useState } from "react";
import MyOrderCard from "../../../cards/MyOrderCard";
import { Norecord } from "../../NoRecord";

const PlaceOrder = ({
  orderHistoryItems,
  selectedMultiLangData,
  handleHistoryDate,
  history,
}: any) => {
  console.log("orderHistoryItems", orderHistoryItems);
  const placeorderCount: any =
    orderHistoryItems &&
    orderHistoryItems?.filter(
      (items: any) => items?.payment_status !== "Cancelled"
    );

  return (
    <>
      <div role="tabpanel" aria-hidden="false">
        <div className="row mb-3">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-2 col-sm-4 col-6">
                <select
                  className="form-select placeorder_detail fs-5 w-75"
                  onChange={handleHistoryDate}
                  value={history}
                >
                  <option value="this_month">
                    {selectedMultiLangData?.this_month}
                  </option>
                  <option value="last_30_days">
                    {selectedMultiLangData?.last_30_days}
                  </option>
                  <option value="past_3_months">
                    {selectedMultiLangData?.past_3_months}
                  </option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>
              <div className="col text-end">
                <p className="mb-0 order-ptag">
                  <span className="bold">{placeorderCount?.length}</span>{" "}
                  {selectedMultiLangData?.orders}
                </p>
              </div>
            </div>
          </div>
        </div>

        {orderHistoryItems && orderHistoryItems?.length > 0 ? (
          <>
            {orderHistoryItems &&
              orderHistoryItems
                ?.filter((items: any) => items?.payment_status !== "Cancelled")
                ?.map((data: any, i: any) => (
                  <div className="row" key={i}>
                    <div className="col-lg-12">
                      <div className="order_card cart_table mb-3 card">
                        <MyOrderCard
                          data={data}
                          selectedMultiLangData={selectedMultiLangData}
                        />
                      </div>
                    </div>
                  </div>
                ))}
          </>
        ) : (
          <Norecord
            heading={selectedMultiLangData?.no_orders_found}
            content={selectedMultiLangData?.orders_show_up_here}
            selectedMultiLangData={selectedMultiLangData}
          />
        )}
      </div>
    </>
  );
};

export default PlaceOrder;
