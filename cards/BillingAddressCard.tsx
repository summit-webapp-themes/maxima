import React, { useState } from "react";
import AddNewAddressForm from "../components/CheckoutPageComponent/AddressForms/AddNewAddressForm";
import EditAddressForm from "../components/CheckoutPageComponent/AddressForms/EditAddressForm";

const BillingAddressCard = ({
  billingAddresses,
  initialBillingAddress,
  initialShippingAddress,
  shippingAddresses,
  selectedAddress,
  Change,
  handleChangeSameAsShipping,
  billingCheckbox,
  setInitialBillingAddress,
  handleShipping,
  handleSelectedState,
  state,
  setSelectedStates,
  setSelectedCity,
  selectedCity,
  selectedStates,
  city,
  selectedMultiLangData,
}: any) => {
  const [showEditModal, setshowEditModal] = useState(false);
  const [detailData, setdetailData] = useState();
  const [show, setshow] = useState(false);
  const [type, setType] = useState("");
  const [selectedbillAddress, setselectedbillAddress] = useState();
  const [changeAddress, setChangeaddress] = useState(false);

  console.log("bill data", billingAddresses);

  const handleShow = (val: any) => {
    setshow(!show);
    setType(val);
  };

  const handleEditModal = (cardData: any) => {
    setshowEditModal(!showEditModal);
    setdetailData(cardData);
  };

  const handleBilling = (e: any) => {
    setselectedbillAddress(e?.target?.value);
    setChangeaddress(true);
  };

  return (
    <>
      <div className=" " >
        <h4 className="mb-1 shipping-margin-t-mob products-name" >{selectedMultiLangData?.billing_addresses}</h4>
        <div className="d-flex align-items-center ml-0 ms-0 ps-0 mb-2" >
          <input 
            className="form-check-input fs-5 bill_checkbox"
            type="checkbox"
            // defaultChecked={true}
            checked={billingCheckbox}
            id="flexCheckDefault"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeSameAsShipping(e?.target?.checked)
            }
          />
          <label
            className="form-check-label px-2 fs-4 "
            htmlFor="flexCheckDefault"
          >
            {selectedMultiLangData?.same_as_shipping_address}
          </label>
        </div>
      </div>

      {/* <h5>
        {changeAddress
          ? selectedbillAddress
          : initialShippingAddress || selectedAddress}
      </h5> */}
      <select
        className="form-select form-select-lg w-50 mb-3 products-name"
        aria-label="Default select example"
        onChange={handleBilling}
      >
        <option value="">
          {" "}
          {selectedMultiLangData?.select_billing_address}
        </option>
        {billingAddresses.map((billing_ad: any, i: any) => (
          <option key={i}>{billing_ad?.address_id}</option>
        ))}
      </select>
      {!billingCheckbox ? (
        <>
          {billingAddresses &&
            billingAddresses
              .filter((val: any) => val?.address_id === selectedbillAddress)
              .map((detail: any, index: any) => (
                <div
                  className="border px-1 addresscard-width"
                  key={detail?.address_id} 
                >
                  <div className="">
                    <p className={`mb-0 addresscard-p`}>{detail.name}</p>
                    <p className="mb-0 card_p">{detail?.address_1}</p>
                    <p className="mb-0 card_p">{detail?.address_2}</p>
                    <p className="mb-0 card_p">{detail?.city}</p>
                    <p className="mb-0 card_p">{detail?.postal_code}</p>
                    <p className="mb-0 card_p">{detail?.state}</p>
                    <p className="mb-0 card_p">{detail?.country}</p>
                    <p className="mb-0 card_p">
                      <a
                        href={`mailto:${detail?.email}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-dark"
                      >
                        {detail.email}
                      </a>
                    </p>
                    <p className="mb-0 card_p ">
                      <a
                        href={`tel:${detail?.phone}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-dark"
                      >
                        {detail.contact}
                      </a>
                    </p>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      onClick={() =>
                        setInitialBillingAddress(detail?.address_id)
                      }
                      className={
                        billingAddresses &&
                        initialBillingAddress === detail?.address_id
                          ? "btn btn-sm d-block w-100 h-100 mt-1  selected_address_button"
                          : "btn btn-sm d-block w-100 h-100 mt-1 address_button"
                      }
                    >
                      {billingAddresses &&
                      initialBillingAddress === detail?.address_id
                        ? "Address Selected"
                        : "Bill to this address"}
                    </button>
                    <div className="mt-2 text-center " >
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
              ))}
          <div className="d-flex align-items-center">
            <button
              className="address_icon "
              onClick={() => handleShow("Billing")}
            >
              <i className="fa fa-edit text-primary fs-2 ship_edit"></i>
            </button>

            <div
              className="fs-4 mt-5 bill_heading"
              onClick={() => handleShow("Billing")}
            >
              {selectedMultiLangData?.create_new_billing_address}
            </div>
          </div>
        </>
      ) : (
        <>
          {shippingAddresses &&
            shippingAddresses
              ?.filter((vals: any) =>
                Change
                  ? vals?.address_id === selectedAddress
                  : vals?.address_id === initialShippingAddress
              )
              ?.map((detail: any, index: any) => (
                <div
                  className="border px-1 addresscard-width"
                  key={detail?.contact_info}
                >
                  <div className="ps-3 pt-1  products-name" >
                    {/* <p>{detail.address_id}</p> */}
                    <p className={`mb-0 addresscard-p`}>{detail?.name}</p>
                    {/* <p className="mb-0">{detail.phone}</p> */}
                    <p className="mb-0 card_p">{detail?.address_1}</p>
                    <p className="mb-0 card_p">{detail?.address_2}</p>
                    <p className="mb-0 card_p">{detail?.city}</p>
                    <p className="mb-0 card_p">{detail?.postal_code}</p>
                    <p className="mb-0 card_p">{detail?.state}</p>
                    <p className="mb-0 card_p">{detail?.country}</p>
                    <p className="mb-0 card_p text-dark">
                      <a
                        href={`mailto:${detail?.email}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-dark products-name"
                      >
                        {detail.email}
                      </a>
                    </p>
                    <p className="mb-0 card_p">
                      <a
                        href={`tel:${detail?.contact}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-dark products-name"
                      >
                        {detail?.contact}
                      </a>
                    </p>
                  </div>
                  <div className="">
                    {/* <button
                      type="button"
                      onChange={() =>
                        setInitialBillingAddress(detail?.address_id)
                      }
                      onClick={() => initialShippingAddress(detail?.address_id)}
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
                    <div className="mt-2 text-center mb-2">
                      {/* <ShippingAddressForm address_type="Shipping" address_id={editId} default_data={defaultData}/> */}

                      <button
                        type="button"
                        onClick={() => {
                          handleEditModal(detail);
                          // setEditId(shippingAddress[index].address_id)
                          // setDefaultData(shippingAddress[index])
                        }}
                        className="showmodal_button" 
                      >
                      <span className="edit_btn_web">{selectedMultiLangData?.edit}</span>  
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </>
      )}

      {show ? (
        <AddNewAddressForm
          show={show}
          toHide={handleShow}
          address_type={type}
          handleSelectedState={handleSelectedState}
          state={state}
          setSelectedStates={setSelectedStates}
          setSelectedCity={setSelectedCity}
          selectedCity={selectedCity}
          selectedStates={selectedStates}
          city={city}
          selectedMultiLangData={selectedMultiLangData}
        />
      ) : null}

      {showEditModal ? (
        <EditAddressForm
          show={showEditModal}
          toHide={handleEditModal}
          detailData={detailData}
          address_type="Billing"
          billingCheckbox={billingCheckbox}
          handleChangeSameAsShipping={handleChangeSameAsShipping}
          handleSelectedState={handleSelectedState}
          state={state}
          setSelectedCity={setSelectedCity}
          selectedCity={selectedCity}
          city={city}
          selectedMultiLangData={selectedMultiLangData}
        />
      ) : null}
    </>
  );
};

export default BillingAddressCard;
