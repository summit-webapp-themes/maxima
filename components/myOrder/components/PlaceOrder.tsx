import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FetchOrderListing } from "../../../store/slices/order-listing-page-slice/order-listing-page-slice";
import MyOrderCard from "../../../cards/MyOrderCard";
import { Norecord } from "../../NoRecord";

const PlaceOrder = ({ orderHistoryItems }: any) => {
  const dispatch = useDispatch();
  console.log("orderHistoryItems", orderHistoryItems);
const placeorderCount = orderHistoryItems && orderHistoryItems?.filter((items:any)=>(items?.payment_status !=="Cancelled"))
  const [history, setHistory] = useState("this_month");

  useEffect(() => {
    dispatch(FetchOrderListing(history, ""));
  }, [history]);

  const handleHistoryDate = (e: any) => {
    setHistory(e.target.value);
  };

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
                  <option value="this_month">This Month</option>
                  <option value="last_30_days">last 30 days</option>
                  <option value="past_3_months">past 3 months</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>
              <div className="col text-end">
                <p className="mb-0 order-ptag">
                  <span className="bold">{placeorderCount?.length}</span> orders
                </p>
              </div>
            </div>
          </div>
        </div>

        {orderHistoryItems && orderHistoryItems?.length > 0 ? (
          <>
            {orderHistoryItems && orderHistoryItems?.filter((items:any)=>(items?.payment_status !=="Cancelled"))?.map((data: any, i: any) => (
                <div className="row" key={i}>
                  <div className="col-lg-12">
                    <div className="order_card cart_table mb-3 card">
                      <MyOrderCard data={data} />
                    </div>
                  </div>
                </div>
              ))}
          </>
        ) : (
          <Norecord
          heading="No orders Found!!"
          content="Orders show up here"
        />
        )}
      </div>
    </>
  );
};

export default PlaceOrder;
