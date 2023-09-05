import Image from "next/image";
import React from "react";
import { Modal } from "react-bootstrap";
import { CONSTANTS } from "../../services/config/app-config";

const OrderSummaryModal = ({
  show,
  toHide,
  cartListingItems,
  selectedMultiLangData,
}: any) => {
  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <Modal show={show} onHide={toHide}>
        <Modal.Header closeButton>
          <Modal.Title className="bold text-center">
            {selectedMultiLangData?.all_items}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="modals_body">
          <div className="checkout-item" >
            {cartListingItems?.categories?.length > 0 &&
              cartListingItems?.categories.map((value: any, index: any) => {
                return (
                  <div key={index}>
                    {value?.orders?.length > 0 &&
                      value?.orders?.map((data: any, i: any) => (
                        <div className="row border mx-2 my-1 " key={i}>
                          <div className="col-4">
                            <div className="checkout-img mt-3">
                              <Image
                                loader={myLoader}
                                src={`${data?.image_url}`}
                                className="product_img img-fluid"
                                alt="product image"
                                width={120}
                                height={120}
                              />
                            </div>
                          </div>
                          <div className="col-8 ">
                            <div className="checkout_item_details ">
                              <h6 className="mb-0 product_item_name ">
                                {data.item_name}
                              </h6>
                              <table
                                width="100%"
                                className="mb-0 mt-1 table table-borderless"
                              >
                                <tbody>
                                  {data?.details?.map(
                                    (detail: any, index: number) => (
                                      <tr
                                        className="item_options   "
                                        key={index}
                                      >
                                        <td
                                          width="50%"
                                          className="px-0 py-0 pb-1 "
                                        >
                                          <p
                                            className={`text-capitalize mb-0 cart_p`}
                                          >
                                            {detail?.name === "Model No"
                                              ? "Item Code"
                                              : detail?.name}
                                          </p>
                                        </td>
                                        <td
                                          width="50%"
                                          className="px-0 py-0 pb-1"
                                        >
                                          <p
                                            className={`text-capitalize mb-0 cart_p`}
                                          >
                                            :{" "}
                                            {detail?.name === "Price" ? (
                                              <i className="fa fa-inr"></i>
                                            ) : (
                                              ""
                                            )}
                                            {detail?.name === "Model No"
                                              ? detail?.value.split("-")[0]
                                              : "₹" + "" + detail?.value}
                                          </p>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                  <tr className="item_options ">
                                    <td width="50%" className="px-0 py-0 ">
                                      <p className={`mb-0 cart_p`}>
                                        {selectedMultiLangData?.quantity_c}
                                      </p>
                                    </td>
                                    <td width="50%" className="px-0 py-0 ">
                                      <p className={`mb-0 cart_p`}>
                                        : {data?.qty}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr className="item_options ">
                                    <td width="50%" className="px-0 py-0 ">
                                      <p className={`mb-0 cart_p`}>
                                        {
                                          selectedMultiLangData?.total_item_price
                                        }
                                      </p>
                                    </td>
                                    <td width="50%" className="px-0 py-0 ">
                                      <p className={`mb-0 cart_p`}>
                                        : <i className="fa fa-inr"></i>
                                        {data?.amount}{" "}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr className="item_options ">
                                    <td width="50%" className="px-0 py-0 ">
                                      <p className={`mb-0 cart_p`}>
                                        {selectedMultiLangData?.total_item_tax}{" "}
                                      </p>
                                    </td>
                                    <td width="50%" className="px-0 py-0 ">
                                      <p className={`mb-0 cart_p`}>
                                        : <i className="fa fa-inr"></i>
                                        {data?.tax}{" "}
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                );
              })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderSummaryModal;
