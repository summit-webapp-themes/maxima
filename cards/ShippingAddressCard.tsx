import Link from "next/link";
import React, { useState } from "react";
import AddNewAddressForm from "../components/CheckoutPageComponent/AddressForms/AddNewAddressForm";
import EditAddressForm from "../components/CheckoutPageComponent/AddressForms/EditAddressForm";

const ShippingAddressCard = ({
  shippingAddresses,
  initialShippingAddress,
  setInitialShippingAddress,
  setInitialBillingAddress,
  selectedAddress,
  Change,
  handleShipping,
  handleSelectedState,
  state,
  selectedCity,
  selectedStates,
  setSelectedStates,
  setSelectedCity,
  city,
  selectedMultiLangData,
}: any) => {
  const [showEditModal, setshowEditModal] = useState(false);
  const [detailData, setdetailData] = useState();

  console.log(
    "shippingAddresses in ship card",
    shippingAddresses,
    initialShippingAddress
  );

  const handleEditModal = (cardData: any) => {
    setshowEditModal(!showEditModal);
    setdetailData(cardData);
  };

  const [show, setshow] = useState(false);
  const [type, setType] = useState("");

  const handleShow = (val: any) => {
    setshow(!show);
    setType(val);
  };

  return (
    <div className="mt-0 pt-0 shipping-margin-t " >
      <h4 className="mb-0 shipping-margin-t-mob products-name">{selectedMultiLangData?.shipping_addresses}</h4>
      {/* <h5>{selectedAddress || initialShippingAddress}</h5> */}
      <div className="d-flex align-items-center mb-0  mt-0 pt-0 cart-checkbox-mg mb-2"  >
        <button className="ms-0 ps-0 address_icon" onClick={() => handleShow("Shipping")}>
          <i className="fa fa-edit text-primary fs-2 ship_edit"></i>
        </button>

        <div
          className="fs-4 mt-1 ms-0 ps-0 ship_heading"
          onClick={() => handleShow("Shipping")}
        >
          {selectedMultiLangData?.create_new_shipping_address}
        </div>
      </div>
      <select
        className="form-select form-select-lg w-50 mb-3 products-name"
        aria-label="Default select example"
        onChange={handleShipping}
      >
        <option value="">
          {selectedMultiLangData?.select_shipping_address}
        </option>
        {shippingAddresses?.map((shipping_ad: any, i: any) => (
          <option key={i}>{shipping_ad?.address_id}</option>
        ))}
      </select>
      {shippingAddresses &&
        shippingAddresses
          .filter((vals: any) =>
            Change
              ? vals?.address_id === selectedAddress
              : vals?.address_id === initialShippingAddress
          )
          ?.map((detail: any) => (
            <>
              <div
                className="border px-1 addresscard-width pb-2" 
                key={detail?.address_id}
              >
                <div className="ps-3 mt-1 mb-1 products-name">
                  <p className={`mb-0 addresscard-p`} >{detail?.name}</p>

                  <p className="mb-0 card_p">{detail?.address_1}</p>
                  <p className="mb-0 card_p">{detail?.address_2}</p>
                  <p className="mb-0 card_p">{detail?.city}</p>
                  <p className="mb-0 card_p">{detail?.postal_code}</p>
                  <p className="mb-0 card_p">{detail?.state}</p>
                  <p className="mb-0 card_p">{detail?.country}</p>
                  <p className="mb-0 card_p ">
                    <a
                      className="text-dark products-name"
                      href={`mailto:${detail?.email}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {detail?.email}
                    </a>
                  </p>
                  <p className="mb-0 card_p ">
                    <a
                      className="text-dark products-name"
                      href={`tel:${detail?.contact}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {detail?.contact}
                    </a>
                  </p>
                </div>
                <div className="" >
                  {/* <button
                    type="button"
                    onChange={() =>
                      setInitialBillingAddress(detail?.address_id)
                    }
                    onClick={() =>
                      setInitialShippingAddress(detail?.address_id)
                    }
                    className={
                      shippingAddresses &&
                      initialShippingAddress === detail?.address_id
                        ? "btn btn-sm d-block w-100 h-100 mt-1  selected_address_button "
                        : "btn btn-sm d-block w-100 h-100 mt-1 address_button "
                    }
                  >
                    {shippingAddresses &&
                    initialShippingAddress === detail?.address_id
                      ? "Address Selected"
                      : "Deliver to this address"}
                  </button> */}
                  <div className="mt-2 text-center ">
                    <button
                      type="button"
                      onClick={() => {
                        handleEditModal(detail);
                      }}
                      className="showmodal_button"
                    >
                    <span className="edit_btn_web">{selectedMultiLangData?.edit}</span>  
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}

      {/* <div className="d-flex align-items-center mb-0 shipping-margin-top"  >
        <button className="address_icon" onClick={() => handleShow("Shipping")}>
          <i className="fa fa-edit text-primary fs-2 ship_edit"></i>
        </button>

        <div
          className="fs-4 mt-5 ship_heading"
          onClick={() => handleShow("Shipping")}
        >
          {selectedMultiLangData?.create_new_shipping_address}
        </div>
      </div> */}

      {show ? (
        <AddNewAddressForm
          show={show}
          toHide={handleShow}
          address_type={type}
          handleSelectedState={handleSelectedState}
          selectedStates={selectedStates}
          state={state}
          setSelectedStates={setSelectedStates}
          setSelectedCity={setSelectedCity}
          city={city}
          selectedCity={selectedCity}
          selectedMultiLangData={selectedMultiLangData}
        />
      ) : null}

      {showEditModal ? (
        <EditAddressForm 
          show={showEditModal}
          toHide={handleEditModal}
          detailData={detailData}
          handleSelectedState={handleSelectedState}
          state={state}
          setSelectedCity={setSelectedCity}
          city={city}
          selectedCity={selectedCity}
          address_type="Shipping"
          selectedMultiLangData={selectedMultiLangData}
        />
      ) : null}
    </div>
  );
};

export default ShippingAddressCard;
