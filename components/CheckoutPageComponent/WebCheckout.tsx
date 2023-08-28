import React, { useEffect, useRef, useState } from "react";
import { CheckoutPageInterface } from "../../interfaces/checkout-page-interface";
import OrderSummary from "../OrderSummary/OrderSummary";
import Link from "next/link";
import HandleOrderSection from "./HandleOrderSection";
import BillingAddressCard from "../../cards/BillingAddressCard";
import ShippingAddressCard from "../../cards/ShippingAddressCard";
import ShippingMethod from "./ShippingMethod";
import FinalReviewSection from "./FinalReviewSection";
import {
  FetchCitiesForAddressForm,
  FetchStateForAddressForm,
} from "../../services/api/general_apis/customer-form-data-api";
import VisitorAddressForm from "./AddressForms/VisitorAddressForm";
import { CONSTANTS } from "../../services/config/app-config";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import { useSelector } from "react-redux";

const WebCheckout = ({
  shippingAddresses,
  billingAddresses,
  initialShippingAddress,
  setInitialShippingAddress,
  initialBillingAddress,
  setInitialBillingAddress,
  selectedAddress,
  Change,
  handleShipping,
  handleChangeSameAsShipping,
  billingCheckbox,
  setBillingCheckbox,
  transporterlist,
  transporterState,
  transportHandle,
  selectedVal,
  selectedState,
  queryHandle,
  locationHandle,
  transportCharges,
  locationState,
  textState,
  transportersCharges,
  orderSummary,
  handlePlaceOrder,
  handleApplyCouponCode,
  handleDeleteCouponCode,
  couponCode,
  deleteCoupon,
  setCouponCode,
  couponCodeApiRes,
  couponError,
  setStoreCredit,
  handleStoreCredit,
  selectedMultiLangData,
  currencySymbolForSummary,
}: CheckoutPageInterface) => {
  console.log("currencySymbolForSummary in web", currencySymbolForSummary);
  const TokenFromStore: any = useSelector(get_access_token);
  const [visitorState, setVisitorState] = useState<any>(null);
  let [selectedCity, setSelectedCity] = useState<any>("");
  let [state, setState] = useState<any>([]);
  let [city, setCity] = useState<any>([]);
  const [err, setErr] = useState<boolean>(false);
  let [selectedStates, setSelectedStates] = useState<any>("");
  const [shippingCheck, setShippingCheck] = useState<boolean>(true);
  const [checkIsDealer, setCheckIsDealer] = useState<any>("");

  let isDealer: any = useRef("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const visitor_login: any = localStorage.getItem("isLoggedIn");
      if (localStorage.getItem("isDealer") === "true") {
        setCheckIsDealer(true);
      }

      setVisitorState(visitor_login);
    }
  }, []);

  useEffect(() => {
    const getStateData: any = async () => {
      const stateData: any = await FetchStateForAddressForm(
        TokenFromStore?.token
      );
      if (stateData?.length > 0) {
        let stateValues: any = stateData
          .map((item: any) => item?.name)
          .filter((item: any) => item !== null);
        setState(stateValues);
      } else {
        setErr(!err);
      }
    };
    getStateData();
  }, []);
  const handleSelectedState: any = async (stateValue: string) => {
    setSelectedCity("");
    setCity([]);
    const getCitiesFromState: any = await FetchCitiesForAddressForm(
      stateValue,
      TokenFromStore?.token
    );
    console.log("cities values", getCitiesFromState);
    if (getCitiesFromState?.length > 0) {
      let citiesValues: any = getCitiesFromState
        .map((item: any) => item.name)
        .filter((item: any) => item !== null);

      console.log("cities values new", citiesValues);
      setCity(citiesValues);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div>
          {visitorState !== null ? (
            <>
              <div className="row flex-lg-row flex-column-reverse ">
                <div className="col-lg-8">
                  <div className="row flex-lg-row flex-column-reverse ">
                    <div className="col-lg-6">
                      <ShippingAddressCard
                        shippingAddresses={shippingAddresses}
                        initialShippingAddress={initialShippingAddress}
                        setInitialShippingAddress={setInitialShippingAddress}
                        setInitialBillingAddress={setInitialBillingAddress}
                        selectedAddress={selectedAddress}
                        Change={Change}
                        handleShipping={handleShipping}
                        billingCheckbox={billingCheckbox}
                        setBillingCheckbox={setBillingCheckbox}
                        handleSelectedState={handleSelectedState}
                        state={state}
                        setSelectedStates={setSelectedStates}
                        selectedStates={selectedStates}
                        setSelectedCity={setSelectedCity}
                        city={city}
                        selectedCity={selectedCity}
                        selectedMultiLangData={selectedMultiLangData}
                      />
                    </div>
                    <div className="col-lg-6 ">
                      <BillingAddressCard
                        shippingAddresses={shippingAddresses}
                        billingAddresses={billingAddresses}
                        initialBillingAddress={initialBillingAddress}
                        initialShippingAddress={initialShippingAddress}
                        selectedAddress={selectedAddress}
                        Change={Change}
                        handleChangeSameAsShipping={handleChangeSameAsShipping}
                        billingCheckbox={billingCheckbox}
                        setBillingCheckbox={setBillingCheckbox}
                        setInitialBillingAddress={setInitialBillingAddress}
                        handleShipping={handleShipping}
                        handleSelectedState={handleSelectedState}
                        state={state}
                        selectedCity={selectedCity}
                        selectedStates={selectedStates}
                        setSelectedStates={setSelectedStates}
                        setSelectedCity={setSelectedCity}
                        city={city}
                        selectedMultiLangData={selectedMultiLangData}
                      />
                    </div>
                  </div>
                  {CONSTANTS.SHOW_TRANSPORTERS_LIST_TO_DEALER && (
                    <>
                      <div className="col-lg-7">
                        <ShippingMethod
                          transporterlist={transporterlist}
                          transporterState={transporterState}
                          transportHandle={transportHandle}
                          selectedVal={selectedVal}
                          selectedState={selectedState}
                          queryHandle={queryHandle}
                          locationHandle={locationHandle}
                          transportCharges={transportCharges}
                          locationState={locationState}
                          textState={textState}
                          transportersCharges={transportersCharges}
                          selectedMultiLangData={selectedMultiLangData}
                        />
                      </div>
                      <div className="col-lg-10">
                        <FinalReviewSection
                          orderSummary={orderSummary}
                          handlePlaceOrder={handlePlaceOrder}
                          deleteCoupon={deleteCoupon}
                          selectedMultiLangData={selectedMultiLangData}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="col-lg-4">
                  <HandleOrderSection
                    orderSummary={orderSummary}
                    handleApplyCouponCode={handleApplyCouponCode}
                    handleDeleteCouponCode={handleDeleteCouponCode}
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                    deleteCoupon={deleteCoupon}
                    couponCodeApiRes={couponCodeApiRes}
                    couponError={couponError}
                    setStoreCredit={setStoreCredit}
                    handleStoreCredit={handleStoreCredit}
                    handlePlaceOrder={handlePlaceOrder}
                    selectedMultiLangData={selectedMultiLangData}
                    currencySymbolForSummary={currencySymbolForSummary}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className=" container row mb-4 mx-auto">
                <div className="col-lg-12 ">
                  <h4 className="text-uppercase bold mt-3">
                    {" "}
                    {selectedMultiLangData?.checkout_details}
                  </h4>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-warning btn-sm rounded-0 bold button_color">
                      <Link href={"/login"} legacyBehavior>
                        <a>{selectedMultiLangData?.login}</a>
                      </Link>
                    </button>
                    <span className="text-muted px-2 fs-4">or</span>
                    <div className="d-flex align-items-center ">
                      <input
                        className="form-check-input fs-4"
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label px-2 fs-4 text-muted"
                        htmlFor="flexCheckDefault"
                      >
                        {selectedMultiLangData?.login_as_guest}
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-8 ">
                      <div className="border rounded-1 mt-2">
                        <h4 className="px-3 mt-3">
                          {" "}
                          {selectedMultiLangData?.create_new_address}
                        </h4>
                        <h5 className="bold px-3 mb-0">
                          {" "}
                          {selectedMultiLangData?.shipping}
                        </h5>
                        <VisitorAddressForm
                          address_type="Shipping"
                          isSameAsShipping={billingCheckbox}
                          shipping_check={shippingCheck}
                          state={state}
                          setSelectedState={setSelectedStates}
                          selectedStates={selectedStates}
                          selectedMultiLangData={selectedMultiLangData}
                        />
                        <h6 className="bold px-3 mb-1">
                          {selectedMultiLangData?.billing}
                        </h6>
                        <div className="d-flex align-items-center px-3">
                          <input
                            className="form-check-input fs-4 bill_checkbox mb-2"
                            type="checkbox"
                            defaultChecked={true}
                            id="flexCheckDefault"
                            onChange={(e: any) => {
                              setShippingCheck(e?.target?.checked);
                              handleChangeSameAsShipping(e?.target?.checked);
                            }}
                          />
                          <label
                            className="form-check-label px-2 fs-4 pb-2"
                            htmlFor="flexCheckDefault"
                          >
                            {selectedMultiLangData?.same_as_shipping_address}
                          </label>
                        </div>
                        {billingCheckbox ? null : (
                          <VisitorAddressForm
                            address_type="Billing"
                            isSameAsShipping={billingCheckbox}
                            state={state}
                            setSelectedState={setSelectedStates}
                            selectedStates={selectedStates}
                            selectedMultiLangData={selectedMultiLangData}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-lg-4 mt-2 border">
                      <h5 className=" bold text-uppercase">
                        {selectedMultiLangData?.order_summary}
                      </h5>

                      <OrderSummary
                        currencySymbolForSummary={currencySymbolForSummary}
                        orderSummary={orderSummary}
                        selectedMultiLangData={selectedMultiLangData}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WebCheckout;
