import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CONSTANTS } from "../services/config/app-config";
import { currency_selector_state } from "../store/slices/general_slices/multi-currency-slice";
import { useSelector } from "react-redux";

const MyOrderCard = ({ data, selectedMultiLangData }: any) => {
  const [isDealer, setIsDealer] = useState(false);
  console.log("o-d data", data);
  useEffect(() => {
    if (typeof window !== undefined) {
      const checkIsDealer = localStorage.getItem("isDealer");
      if (checkIsDealer === "true") {
        setIsDealer(true);
      }
    }
  }, []);
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  return (
    <>
      <div key={data.id} >
        <div className="card-header myorder-card-header " >
          <div className="row pb-0" >
            <div className=" mb-sm-0 col-md-2 col-6 order-div">
              <p className="text-uppercase gray mb-0 myorder_p">
                {selectedMultiLangData?.order_placed}
              </p>

              <p className="gray mb-0 myorder_p">
                {data?.transaction_date?.split("-")?.reverse()?.join("/")}
              </p>
            </div>
            <div className=" col-md-2 col-6 order-div">
              <p className="text-uppercase gray mb-0 myorder_p" >
                {" "}
                {selectedMultiLangData?.total_price}
              </p>
              {data?.total === 0 ? (
                <p className="border price_request" >
                  {selectedMultiLangData?.price_on_request} 
                </p>
              ) : (
                <p className="gray mb-0 myorder_p price_font_family">
                  {data?.currency_symbol} {data?.total}
                </p>
              )}
            </div>
            <div className="col-md-2 col-4 order-cards" >
              <p className="text-uppercase gray mb-0 myorder_p">
                {selectedMultiLangData?.ship_to}
              </p>
              {data?.addresses?.map((personAddress: any, index: number) => (
                <div className="dropdown text-dark" key={index}>
                  {personAddress?.name === "Shipping Address"
                    ? personAddress?.values.map((addr: any) => (
                      <div key={addr.address_id}>
                        <a
                          className="dropdown-toggle p-0 bold text-dark"
                          role="button"
                          id="ship_to"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {personAddress?.name}
                        </a>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="ship_to"
                        >
                          <li className="ps-1 pe-1 mb-0 ">
                            {addr?.address_title}
                          </li>
                          <li className="ps-1 pe-1 mb-0 ">
                            {addr?.address_1}
                          </li>
                          <li className="ps-1 pe-1 mb-0">
                            {addr?.address_2}
                          </li>
                          <li className="ps-1 pe-1 mb-0">
                            {addr?.city} - {addr?.postal_code}
                          </li>
                          <li className="ps-1 pe-1 mb-0">{addr?.country}</li>
                          <li className="ps-1 pe-1 mb-0">
                            {selectedMultiLangData?.mobile_number}:{" "}
                            {addr?.contact}
                          </li>
                        </ul>
                      </div>
                    ))
                    : null}
                </div>
              ))}
            </div>
            <div className="text-end col-md-6 col-8 order-cards">
              <p className="mb-0 myorder_p">
                {selectedMultiLangData?.orders} # {data?.name}
              </p>

              <div className="d-flex justify-content-end align-items-center">
                <div className="flex-fill detail_link text-capitalize">
                  <Link href={`myOrder/${data?.name}`} legacyBehavior>
                    <a href={`myOrder/${data?.name}`} className="order_details">
                      {selectedMultiLangData?.order_details}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {data?.order_details?.map((detail: any) => (
          <div
            className="cart_item cart_item-myorder-m card-body order_cartdetails" 
            key={detail?.item_name} 
          >
            <div className="d-flex mb-0 pb-0" >
              <div className="flex-fill">
                <h6 className="green text-capitalize bold mb-0 mt-2 order-ptag ">
                  {selectedMultiLangData?.status} : {data?.payment_status}
                </h6>
              </div>
              <div className="justify-content-end d-none d-sm-block align-items-end"></div>
            </div>

            <div className="d-flex align-items-center row" >
              <div className="mb-0 mb-sm-0 col-lg-2 col-md-2 col-4 mt-2">
                <div className="product-img cart-image  mt-2 mb-4">
                  <img
                    src={`${CONSTANTS.API_BASE_URL}/${detail?.img !== null ? detail?.img : detail?.brand_img
                      }`}
                    className="product_img img-fluid orderdetail_img"
                    alt="product-img"
                  />
                </div>
              </div>
              <div className="product_item_details col-lg-6 col-md-7 col-8" >
                <div className="d-flex orderDetail-card">
                  <div className="flex-fill" >
                    <Link href="#" legacyBehavior>
                      <a className="product_item_name bold">
                        {detail?.item_name}
                      </a>
                    </Link>
                    <table width="100%" className="mt-1 table table-borderless" > 
                      <tbody>
                        <tr className="item_options myorder_tr">
                          <td className="px-0 py-0 pb-0 myorder_td">
                            <p className="text-capitalize black mb-0 myorder_p">
                              {selectedMultiLangData?.item_code}
                            </p>
                          </td>
                          <td
                            width="85%"
                            className="px-0 py-0 pb-0 myorder_width"
                          >
                            <p className="text-capitalize black mb-0 myorder_p">
                              : {detail?.name}
                            </p>
                          </td>
                        </tr>

                        <tr className="item_options myorder_tr">
                          <td className="px-0 py-0 pb-0 myorder_td">
                            <p className="text-capitalize black mb-0 myorder_p" >
                              {selectedMultiLangData?.price} 
                            </p>
                          </td>
                          <td
                            width="85%"
                            className="px-0 py-0 pb-0 myorder_width"
                          >
                            <p className="text-capitalize black mb-0 myorder_p">
                              {detail?.prod_info[1]?.value !== 0 ? (
                                <p className="mb-0 price_font_family">
                                  {" "}
                                  : {data?.currency_symbol}{" "}
                                  {detail.prod_info[1]?.value}
                                </p>
                              ) : (
                                <p className="border price_request">
                                  {selectedMultiLangData?.price_on_request}
                                </p>
                              )}
                            </p>
                          </td>
                        </tr>

                        <tr className="item_options myorder_tr">
                          <td className="px-0 py-0 pb-0 myorder_td">
                            <p className="text-capitalize black mb-0 myorder_p">
                              {selectedMultiLangData?.quantity}
                            </p>
                          </td>
                          <td
                            width="85%"
                            className="px-0 py-0 pb-0 myorder_width"
                          >
                            <p className="text-capitalize black mb-0 myorder_p">
                              : {detail?.prod_info[2]?.value}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {isDealer && (
                <div className="product_item_details col-lg-2 col-md-7 col-8">
                  <h5 className="data_heading mb-1">
                    {" "}
                    {selectedMultiLangData?.shipping_method}
                  </h5>
                  <div>
                    <p className="mb-0">
                      {selectedMultiLangData?.transporter}:{" "}
                      {data?.shipping_method?.transporter}
                    </p>

                    {data?.shipping_method.door_delivery === 0 &&
                      data?.shipping_method?.godown_delivery === 0 ? (
                      <p className="mb-0">
                        {selectedMultiLangData?.door_delivery_yes}
                      </p>
                    ) : (
                      ""
                    )}
                    {data?.shipping_method?.door_delivery === 0 &&
                      data?.shipping_method?.godown_delivery !== 0 ? (
                      <>
                        <p className="mb-0">
                          {selectedMultiLangData?.godown_delivery_yes}
                        </p>
                        {data?.shipping_method?.location === null ? (
                          ""
                        ) : (
                          <p className="mb-0">
                            {selectedMultiLangData?.location} :{" "}
                            {data?.shipping_method?.location}
                          </p>
                        )}
                      </>
                    ) : (
                      ""
                    )}

                    {data?.shipping_method?.remarks === null ? (
                      ""
                    ) : (
                      <p className="mb-0">
                        {selectedMultiLangData?.remark} :{" "}
                        {data?.shipping_method?.remarks}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {isDealer ? (
                <div className="text-end col-lg-2 col-md-2 col-12">
                  <button className=" order_links mb-2 d-block text-uppercase">
                    <Link
                      href={`${detail?.product_url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                      legacyBehavior
                    >
                      <a className="orderdetails_btn">
                        {" "}
                        {selectedMultiLangData?.view_product}
                      </a>
                    </Link>
                  </button>
                </div>
              ) : (
                <>
                  <div className=" col-lg-2"></div>
                  <div className="text-end col-lg-2 col-md-2 col-12">
                    <button className=" order_links mb-2 d-block text-uppercase">
                      <Link
                        href={`${detail?.product_url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                        legacyBehavior
                      >
                        <a className="orderdetails_btn">
                          {" "}
                          {selectedMultiLangData?.view_product}
                        </a>
                      </Link>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="row" >
              <div className="mt-0 col-sm-12" ></div>
            </div>
            <hr className="d-block hr_orderdetail"  />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyOrderCard;
