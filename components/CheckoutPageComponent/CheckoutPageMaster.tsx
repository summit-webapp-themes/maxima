import React, { useCallback, useEffect, useState } from "react";
import UseCheckoutPageHook from "../../hooks/CheckoutHooks/checkout-page-hook";
import WebCheckout from "./WebCheckout";
import MobCheckout from "./MobCheckout";
import OrderSummary from "../OrderSummary/OrderSummary";
import Link from "next/link";
import VisitorAddressForm from "./AddressForms/VisitorAddressForm";

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
  } = UseCheckoutPageHook();

  const useMediaQuery = (width: any) => {
    const [targetReached, setTargetReached] = useState(true);

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

  const [visitorState, setVisitorState] = useState(null);
  const [shippingCheck, setShippingCheck] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const visitor_login: any = localStorage.getItem("isLoggedIn");
      setVisitorState(visitor_login);
    }
  }, []);

  console.log("visitor state", visitorState)
  return (
    <div className="mt-5 mb-5">
      {isBreakpoint ? (
        <>
          <div className="container">
            <h3>Checkout Page</h3>
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
            />
          ) : (
            <div className=" container row  mb-2 mx-auto">
              <div className="col-lg-8 ">
                <h4 className="text-uppercase bold mt-3">checkout details</h4>
                <div className="d-flex align-items-center">
                  <button className="btn btn-warning btn-sm rounded-0 bold yellow_btn">
                    <Link href={"/login"} legacyBehavior>
                      LOGIN
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
                      Login as Guest
                    </label>
                  </div>
                </div>
                <div className="border rounded-1 mt-2">
                  <h4 className="px-3 mt-3">Create new address</h4>
                  <h5 className="bold px-3 mb-0">Shipping</h5>
                  <VisitorAddressForm
                    address_type="Shipping"
                    isSameAsShipping={billingCheckbox}
                    shipping_check={shippingCheck}
                  />
                  <h6 className="bold px-3 mb-1">Billing</h6>
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
                      Same as Shipping Address
                    </label>
                  </div>
                  {billingCheckbox ? null : (
                    <VisitorAddressForm
                      address_type="Billing"
                      isSameAsShipping={billingCheckbox}
                    />
                  )}
                </div>
              </div>
              <div
                className={`col-lg-4 mx-auto mt-2 border rounded-1 ordersummary-width `}
              >
                <h5 className="my-3  bold text-uppercase">Order Summary</h5>
                <OrderSummary />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutPageMaster;
