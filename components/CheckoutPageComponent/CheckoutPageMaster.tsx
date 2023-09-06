import React, { useCallback, useEffect, useState } from "react";
import UseCheckoutPageHook from "../../hooks/CheckoutHooks/checkout-page-hook";
import WebCheckout from "./WebCheckout";
import MobCheckout from "./MobCheckout";
import OrderSummary from "../OrderSummary/OrderSummary";
import Link from "next/link";
import VisitorAddressForm from "./AddressForms/VisitorAddressForm";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import { useSelector } from "react-redux";

const CheckoutPageMaster = () => {
  const {
    shippingAddresses,
    billingAddresses,
    initialShippingAddress,
    setInitialShippingAddress,
    setInitialBillingAddress,
    initialBillingAddress,
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
    handleApplyCouponCode,
    handleDeleteCouponCode,
    couponCode,
    deleteCoupon,
    setCouponCode,
    couponCodeApiRes,
    couponError,
    setStoreCredit,
    handleStoreCredit,
    handlePlaceOrder,
    storeCredit,
    quotationId,
    currencySymbolForSummary,
  } = UseCheckoutPageHook();

  const useMediaQuery = (width: any) => {
    const [targetReached, setTargetReached] = useState<boolean>(true);

    const updateTarget = useCallback((e: any) => {
      if (e.matches) {
        setTargetReached(false);
      } else {
        setTargetReached(true);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(false);
      }

      return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
  };

  const isBreakpoint = useMediaQuery(600);

  const [visitorState, setVisitorState] = useState<any>(null);
  const [shippingCheck, setShippingCheck] = useState<any>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const visitor_login: any = localStorage.getItem("isLoggedIn");
      setVisitorState(visitor_login);
    }
  }, []);

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

  console.log("visitor state", currencySymbolForSummary);
  return (
    <div className="container margin_from_nav_checkout mb-5">
      {isBreakpoint ? (
        <>
          <div className="ps-4 checkout_web_heading">
            <h3>{selectedMultiLangData?.checkout_page}</h3>
            <hr />
          </div>
          <WebCheckout
            shippingAddresses={shippingAddresses}
            billingAddresses={billingAddresses}
            initialShippingAddress={initialShippingAddress}
            initialBillingAddress={initialBillingAddress}
            selectedAddress={selectedAddress}
            Change={Change}
            handleShipping={handleShipping}
            setInitialShippingAddress={setInitialShippingAddress}
            setInitialBillingAddress={setInitialBillingAddress}
            handleChangeSameAsShipping={handleChangeSameAsShipping}
            billingCheckbox={billingCheckbox}
            setBillingCheckbox={setBillingCheckbox}
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
            orderSummary={orderSummary}
            currencySymbolForSummary={currencySymbolForSummary}
            handleApplyCouponCode={handleApplyCouponCode}
            handleDeleteCouponCode={handleDeleteCouponCode}
            couponCode={couponCode}
            deleteCoupon={deleteCoupon}
            setCouponCode={setCouponCode}
            couponCodeApiRes={couponCodeApiRes}
            couponError={couponError}
            setStoreCredit={setStoreCredit}
            handleStoreCredit={handleStoreCredit}
            handlePlaceOrder={handlePlaceOrder}
            selectedMultiLangData={selectedMultiLangData}
          />
        </>
      ) : (
        <div className="mt-5">
          {visitorState !== null ? (
            <MobCheckout
              shippingAddresses={shippingAddresses}
              initialShippingAddress={initialShippingAddress}
              billingAddresses={billingAddresses}
              initialBillingAddress={initialBillingAddress}
              //setinitialShippingAddress={setInitialShippingAddress}
              setinitialBillingAddress={setInitialBillingAddress}
              orderSummary={orderSummary}
              currencySymbolForSummary={currencySymbolForSummary}
              //quotationId={quotationId}
              handleChangeSameAsShipping={handleChangeSameAsShipping}
              billingCheckbox={billingCheckbox}
              setBillingCheckbox={setBillingCheckbox}
              locationHandle={locationHandle}
              selectedState={selectedState}
              textState={textState}
              locationState={locationState}
              transporterState={transporterState}
              transportHandle={transportHandle}
              transporterlist={transporterlist}
              selectedVal={selectedVal}
              queryHandle={queryHandle}
              handleDeleteCouponCode={handleDeleteCouponCode}
              handleApplyCouponCode={handleApplyCouponCode}
              handleStoreCredit={handleStoreCredit}
              handlePlaceOrder={handlePlaceOrder}
              deleteCoupon={deleteCoupon}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              //storeCredit={storeCredit}
              setStoreCredit={setStoreCredit}
              couponCodeApiRes={couponCodeApiRes}
              selectedMultiLangData={selectedMultiLangData}
            />
          ) : (
            <div className=" container row  mb-2 mx-auto">
              <div className="col-lg-8 ">
                <h4 className="text-uppercase bold mt-3">
                  {selectedMultiLangData?.checkout_details}
                </h4>
                <div className="d-flex align-items-center">
                  <button className="btn btn-warning btn-sm rounded-0 bold yellow_btn">
                    <Link href={"/login"} legacyBehavior>
                      <a>{selectedMultiLangData?.login}</a>
                    </Link>
                  </button>
                  <span className="text-muted px-2 fs-4">
                    {selectedMultiLangData?.or}
                  </span>
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
                <div className="border rounded-1 mt-2">
                  <h4 className="px-3 mt-3">
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
                      selectedMultiLangData={selectedMultiLangData}
                    />
                  )}
                </div>
              </div>
              <div
                className={`col-lg-4 mx-auto mt-2 border rounded-1 ordersummary-width mb-0 pb-0`}
              >
                <h5 className="mt-3  bold text-uppercase mb-0 pb-0">
                  {selectedMultiLangData?.order_summary}
                </h5>
                <OrderSummary
                  selectedMultiLangData={selectedMultiLangData}
                  orderSummary={orderSummary}
                  currencySymbolForSummary={currencySymbolForSummary}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutPageMaster;
