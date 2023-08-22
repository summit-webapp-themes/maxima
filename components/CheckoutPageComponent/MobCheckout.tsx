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
import { useSelector } from "react-redux";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const MobCheckout = ({
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
}: CheckoutPageInterface) => {
  const [visitorState, setVisitorState] = useState<any>(null);
  let [selectedCity, setSelectedCity] = useState<any>("");
  let [state, setState] = useState<any>([]);
  let [city, setCity] = useState<any>([]);
  const [err, setErr] = useState<boolean>(false);
  let [selectedStates, setSelectedStates] = useState<any>("");
  const [shippingCheck, setShippingCheck] = useState<any>(true);
  const [checkIsDealer, setCheckIsDealer] = useState<any>("");
  const TokenFromStore: any = useSelector(get_access_token);

  let isDealer: any = useRef("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const visitor_login: any = localStorage.getItem("isLoggedIn");
      setCheckIsDealer(localStorage.getItem("isDealer"));
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
  const handleSelectedState = async (stateValue: string) => {
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
                  {checkIsDealer === "true" &&
                    CONSTANTS.SHOW_TRANSPORTERS_LIST_TO_DEALER && (
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
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className=" container row mb-4 mx-auto">
                <div className="col-lg-12 ">
                  <h4 className="text-uppercase bold mt-3">
                    {selectedMultiLangData?.checkout_details}
                  </h4>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm rounded-0 bold button_color">
                      <Link href={"/login"} legacyBehavior>
                        {selectedMultiLangData?.login}
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
                  <div className="row">
                    <div className="col-lg-8 ">
                      <div className="border rounded-1 mt-2">
                        <h4 className="px-3 mt-3">
                          {" "}
                          {selectedMultiLangData?.create_new_address}
                        </h4>
                        <h5 className="bold px-3 mb-0">
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

export default MobCheckout;

// import React, { useEffect, useState } from "react";
// import VisitorAddress from "./AddressForms/VisitorAddressForm";
// import OrderSummary from "../OrderSummary/OrderSummary";
// import Link from "next/link";
// import FinalReviewSection from "./FinalReviewSection";
// import ShippingMethod from "./ShippingMethod";
// import { CONSTANTS } from "../../services/config/app-config";
// import AddNewAddressForm from "./AddressForms/AddNewAddressForm";
// import EditAddressForm from "./AddressForms/EditAddressForm";

// const MobCheckout = ({
//   shippingAddresses,
//   billingAddresses,
//   initialShippingAddress,
//   setinitialShippingAddress,
//   initialBillingAddress,
//   setinitialBillingAddress,
//   orderSummary,
//   quotationId,
//   handleChangeSameAsShipping,
//   billingCheckbox,
//   transporterlist,
//   selectedVal,
//   queryHandle,
//   locationHandle,
//   selectedState,
//   textState,
//   locationState,
//   transporterState,
//   transportHandle,
//   handleDeleteCouponCode,
//   handleApplyCouponCode,
//   handleStoreCredit,
//   handlePlaceOrder,
//   deleteCoupon,
//   setdeleteCoupon,
//   couponCode,
//   setCouponCode,
//   storeCredit,
//   setStoreCredit,
//   couponCodeApiRes,

// }: any) => {
//   const [showEditModal, setshowEditModal] = useState(false);
//   const [detailData, setdetailData] = useState();
//   const [show, setshow] = useState(false);
//   const [type, setType] = useState("");
//   const [visitorState, setVisitorState] = useState(null);
//   const handleShow = (val: any) => {
//     setshow(!show);
//     setType(val);
//   };

//   const handleEditModal = (cardData: any) => {
//     console.log("form edit data", cardData);
//     setshowEditModal(!showEditModal);
//     setdetailData(cardData);
//     console.log("cardData", cardData);
//   };

//   let isDealer: any = localStorage.getItem("isDealer");

//   console.log("isdealer",isDealer)

//   let visitor_login = false;

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const visitor_login: any = localStorage.getItem("isLoggedIn");
//       setVisitorState(visitor_login);
//     }
//   }, []);

//   return (
//     <>
//       <div className="">
//         {/* <div className="mt-0">
//         <button
//           type="button"
//           onClick={handlePlaceOrder}
//           className=" d-block w-100 mx-auto yellow_btn p-3 text-white  bold rounded  place_order_button"
//         >
//           {deleteCoupon}
//           Place Order
//         </button>
//       </div> */}
//         <div className="container ">
//           <div className="row">
//             {isDealer ? null : (
//               <>
//                 {!visitor_login ? (
//                   <div>
//                     <div className="col-lg-12 mb-5 w-100">
//                       <ul className="nav nav-tabs justify-content-center ">
//                         {CONSTANTS.ENABLE_APPLY_COUPON_CODE ? (
//                           <li className="nav-item ">
//                             <a
//                               className="nav-link active bold px-0"
//                               href="#coupon"
//                               data-bs-toggle="tab"
//                               aria-selected="false"
//                               role="tab"
//                               tabIndex={-1}
//                             >
//                               <span
//                                 className="bold couponlink-text"
//                               >
//                                 Apply Coupon Code
//                               </span>
//                             </a>
//                           </li>
//                         ) : null}

//                         {CONSTANTS.ENABLE_STORE_CREDIT ? (
//                           <li className="nav-item">
//                             <a
//                               className="nav-link bold px-0"
//                               href="#store"
//                               data-bs-toggle="tab"
//                               aria-selected="false"
//                               role="tab"
//                               tabIndex={-1}
//                             >
//                               <span
//                                 className="bold couponlink-text"
//                               >
//                                 Use Store Credits
//                               </span>
//                             </a>
//                           </li>
//                         ) : null}
//                       </ul>
//                     </div>

//                     <div className="tab-content">
//                       <div
//                         className="specifications_details mb-3 tab-pane fade active show "
//                         id="coupon"
//                         role="tabpanel"
//                       >
//                         <div className="col-12 ">
//                           <div className="row">
//                             <div
//                               id="collapseOne"
//                               className="accordion-collapse collapse show"
//                               aria-labelledby="headingOne"
//                               data-bs-parent="#accordionExample"
//                             >
//                               <div className="accordion-body py-0">
//                                 <form className="pt-3 fields-group-md">
//                                   <div className="form-group">
//                                     <input
//                                       type="text"
//                                       className="form-control w-75 mx-auto coupon_input"
//                                       id="couponCode"
//                                       name="couponCode"
//                                       value={couponCode}
//                                       onChange={(e: any) =>
//                                         setCouponCode(e?.target?.value)
//                                       }
//                                     />
//                                     <span className="red">
//                                       {couponCodeApiRes
//                                         .replace("LinkValidationError('", "")
//                                         .replace("')", "")}
//                                     </span>
//                                   </div>
//                                   {deleteCoupon ? (
//                                     <div>
//                                       <button
//                                         type="button"
//                                         className="btn btn-sm custom-btn transparent d-block w-100 btn btn-danger mt-2"
//                                         onClick={() => handleDeleteCouponCode()}
//                                       >
//                                         Delete Coupon
//                                       </button>
//                                     </div>
//                                   ) : (
//                                     <div>
//                                       <button
//                                         type="button"
//                                         className="btn btn-sm custom-btn transparent d-block w-100 btn btn-primary mt-2"
//                                         onClick={(e: any) =>
//                                           handleApplyCouponCode(e)
//                                         }
//                                       >
//                                         Apply Coupon
//                                       </button>
//                                     </div>
//                                   )}
//                                 </form>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div
//                         className="tech_details mb-3 tab-pane fade"
//                         id="store"
//                         role="tabpanel"
//                       >
//                         <div className="row container">
//                           <form className="fields-group-md store_balance">
//                             <span>Store credit balance: 0</span>
//                             <div className="form-group pt-3">
//                               <input
//                                 placeholder="Enter credit amount"
//                                 type="text"
//                                 className="form-control "
//                                 value={storeCredit}
//                                 onChange={(e: any) =>
//                                   setStoreCredit(e.target.value)
//                                 }
//                               />
//                               <span className="red"></span>
//                             </div>
//                           </form>
//                           <button
//                             type="button"
//                             className="btn btn-sm transparent custom-btn d-block w-75 mx-auto btn btn-primary mt-2 "
//                             onClick={(e: any) => handleStoreCredit(e)}
//                           >
//                             Use store credit
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <hr className="mt-0" />

//                     <div className="container order_summary_section">
//                       <h5 className="bold">Order Summary</h5>
//                     </div>
//                     <hr />

//                     <OrderSummary orderSummary={orderSummary} />

//                     <div className="container px-0 my-0">
//                       <div className="row">
//                         <h5>{initialShippingAddress}</h5>
//                         <div className="col-lg-12 mb-2 w-100">
//                           <ul className="nav nav-tabs justify-content-center address_header">
//                             <li className="nav-item">
//                               <a
//                                 className="nav-link active bold px-0"
//                                 href="#shipping"
//                                 data-bs-toggle="tab"
//                                 aria-selected="false"
//                                 role="tab"
//                                 tabIndex={-1}
//                               >
//                                 <span className="bold">Shipping Address</span>
//                               </a>
//                             </li>
//                             <li className="nav-item">
//                               <a
//                                 className="nav-link bold px-0"
//                                 href="#billing"
//                                 data-bs-toggle="tab"
//                                 aria-selected="false"
//                                 role="tab"
//                                 tabIndex={-1}
//                               >
//                                 <span className="bold">Billing Address</span>
//                               </a>
//                             </li>
//                           </ul>
//                         </div>

//                         <div className="tab-content ">
//                           <div
//                             className="address_details mb-3 tab-pane fade active show"
//                             id="shipping"
//                             role="tabpanel"
//                           >
//                             <div className="col-12 mt-2">
//                               {initialShippingAddress}
//                               {shippingAddresses &&
//                                 shippingAddresses.map(
//                                   (detail: any, index: any) => (
//                                     <div className="container " key={index}>
//                                       <div className="row ">
//                                         <div className="col-1 pb-4">
//                                           {shippingAddresses &&
//                                           initialShippingAddress ===
//                                             detail.address_id ? (
//                                             <input
//                                               type="radio"
//                                               className="fs-4"
//                                               onClick={() =>
//                                                 setinitialShippingAddress(
//                                                   detail.address_id
//                                                 )
//                                               }
//                                               checked={true}
//                                               id="shipping"
//                                               name="shipping"
//                                               value="shipping"
//                                             />
//                                           ) : (
//                                             <input
//                                               type="radio"
//                                               className="fs-4"
//                                               onClick={() =>
//                                                 setinitialShippingAddress(
//                                                   detail.address_id
//                                                 )
//                                               }
//                                               id="shipping"
//                                               name="shipping"
//                                               value="shipping"
//                                             />
//                                           )}
//                                         </div>
//                                         <label className="col-6">
//                                           Shipping Address
//                                         </label>
//                                         <div className="col text-end edit_button">
//                                           <button
//                                             type="button"
//                                             onClick={() => {
//                                               handleEditModal(detail);
//                                             }}
//                                             className="text-decoration-underline  showmodal_button"
//                                           >
//                                             Edit
//                                           </button>
//                                         </div>
//                                       </div>

//                                       <div className="row">
//                                         <div className="col-6">
//                                           <div className="d-flex ">
//                                             <p className="">{detail.name}</p>
//                                           </div>
//                                         </div>
//                                         <div className="col-6">
//                                           <div className="d-flex">
//                                             <p className="  "></p>
//                                           </div>
//                                         </div>
//                                         <div className="col-6">
//                                           <div className="d-flex ">
//                                             <p className="">
//                                               {detail.address_1}
//                                             </p>
//                                           </div>
//                                         </div>
//                                         <div className="col-6 d-flex ">
//                                           <p className="">{detail.address_2}</p>
//                                         </div>
//                                         <div className="col-6 d-flex ">
//                                           <p className="">{detail.country}</p>
//                                         </div>
//                                         <div className="col-6 d-flex ">
//                                           <p className="">{detail.state}</p>
//                                         </div>
//                                         <div className="col-6 d-flex ">
//                                           <p className="">{detail.city}</p>
//                                         </div>
//                                         <div className="col-6 d-flex">
//                                           <p className="">
//                                             {detail.postal_code}
//                                           </p>
//                                         </div>
//                                         <div className="col-6 d-flex ">
//                                           <a
//                                             className="text-dark"
//                                             href={`mailto:${detail.email}`}
//                                             target="_blank"
//                                             rel="noreferrer"
//                                           >
//                                             {detail.email}
//                                           </a>
//                                         </div>
//                                         <div className="col-6 d-flex ">
//                                           <a
//                                             className="text-dark"
//                                             href={`tel:${detail.contact}`}
//                                             target="_blank"
//                                             rel="noreferrer"
//                                           >
//                                             {detail.contact}
//                                           </a>
//                                         </div>
//                                       </div>
//                                       <hr />
//                                     </div>
//                                   )
//                                 )}
//                             </div>
//                             <span className="d-flex align-items-center mt-2 px-4">
//                               <button
//                                 onClick={() => handleShow("Shipping")}
//                                 className="fs-2 address_icon"
//                               >
//                                 <i className="fa fa-edit text-primary "></i>
//                               </button>

//                               <div className="fs-3 mx-2 mb-1">
//                                 Create New Address
//                               </div>
//                             </span>
//                           </div>

//                           <div
//                             className="tech_details mb-3 tab-pane fade"
//                             id="billing"
//                             role="tabpanel"
//                           >
//                             <div className="col-12 mt-2">
//                               {initialBillingAddress}

//                               <div className="container ">
//                                 <div className="row px-2">
//                                   <div className="form-check">
//                                     <input
//                                       className="form-check-input fs-5 bill_checkbox"
//                                       type="checkbox"
//                                       defaultChecked={true}
//                                       id="flexCheckDefault"
//                                       onChange={(e: any) =>
//                                         handleChangeSameAsShipping(
//                                           e.target.checked
//                                         )
//                                       }
//                                     />
//                                     <label
//                                       className="form-check-label fs-3"
//                                       htmlFor="flexCheckDefault"
//                                     >
//                                       Same as Shipping Address
//                                     </label>
//                                   </div>
//                                 </div>
//                                 <h5>{initialBillingAddress}</h5>

//                                 {!billingCheckbox ? (
//                                   <>
//                                     <div className="d-flex justify-content-between "></div>
//                                     <div className="col-12 mt-2">
//                                       {billingAddresses &&
//                                         billingAddresses.map(
//                                           (detail: any, index: any) => (
//                                             <div className="row " key={index}>
//                                               <div className="col-1 pb-4">
//                                                 {billingAddresses &&
//                                                 initialBillingAddress ===
//                                                   detail.address_id ? (
//                                                   <input
//                                                     type="radio"
//                                                     className="fs-4"
//                                                     onClick={() =>
//                                                       setinitialBillingAddress(
//                                                         detail.address_id
//                                                       )
//                                                     }
//                                                     id="billing"
//                                                     name="billing"
//                                                     value="billing"
//                                                     checked={true}
//                                                   />
//                                                 ) : (
//                                                   <input
//                                                     type="radio"
//                                                     className="fs-4"
//                                                     onClick={() =>
//                                                       setinitialBillingAddress(
//                                                         detail.address_id
//                                                       )
//                                                     }
//                                                     id="billing"
//                                                     name="billing"
//                                                     value="billing"
//                                                   />
//                                                 )}
//                                               </div>
//                                               <label className="col-6">
//                                                 Billing Address
//                                               </label>
//                                               <div className="col text-end edit_button">
//                                                 <button
//                                                   type="button"
//                                                   onClick={() => {
//                                                     handleEditModal(detail);
//                                                   }}
//                                                   className="text-decoration-underline showmodal_button"
//                                                 >
//                                                   Edit
//                                                 </button>
//                                               </div>

//                                               <div className="row">
//                                                 <div className="col-6">
//                                                   <div className="d-flex ">
//                                                     <p className="">
//                                                       {detail.name}
//                                                     </p>
//                                                   </div>
//                                                 </div>
//                                                 <div className="col-6">
//                                                   <div className="d-flex">
//                                                     <p className="  "></p>
//                                                   </div>
//                                                 </div>
//                                                 <div className="col-6">
//                                                   <div className="d-flex ">
//                                                     <p className="">
//                                                       {detail.address_1}
//                                                     </p>
//                                                   </div>
//                                                 </div>
//                                                 <div className="col-6 d-flex ">
//                                                   <p className="">
//                                                     {detail.address_2}
//                                                   </p>
//                                                 </div>
//                                                 <div className="col-6 d-flex ">
//                                                   <p className="">
//                                                     {detail.country}
//                                                   </p>
//                                                 </div>
//                                                 <div className="col-6 d-flex ">
//                                                   <p className="">
//                                                     {detail.state}
//                                                   </p>
//                                                 </div>
//                                                 <div className="col-6 d-flex ">
//                                                   <p className="">
//                                                     {detail.city}
//                                                   </p>
//                                                 </div>
//                                                 <div className="col-6 d-flex">
//                                                   <p className="">
//                                                     {detail.postal_code}
//                                                   </p>
//                                                 </div>
//                                                 <div className="col-6 d-flex ">
//                                                   <a
//                                                     className="text-dark"
//                                                     href={`mailto:${detail.email}`}
//                                                     target="_blank"
//                                                     rel="noreferrer"
//                                                   >
//                                                     {detail.email}
//                                                   </a>
//                                                 </div>
//                                                 <div className="col-6 d-flex ">
//                                                   <a
//                                                     className="text-dark"
//                                                     href={`tel:${detail.contact}`}
//                                                     target="_blank"
//                                                     rel="noreferrer"
//                                                   >
//                                                     {detail.contact}
//                                                   </a>
//                                                 </div>
//                                               </div>
//                                               <hr />
//                                             </div>
//                                           )
//                                         )}
//                                     </div>

//                                     <span className="d-flex align-items-center mt-2 ">
//                                       <button
//                                         onClick={() => handleShow("Billing")}
//                                         className="fs-2 address_icon"
//                                       >
//                                         <i className="fa fa-edit text-primary "></i>
//                                       </button>
//                                       <div className="fs-3 mx-2 mb-1">
//                                         Create New Billing Address
//                                       </div>
//                                     </span>
//                                   </>
//                                 ) : null}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <ShippingMethod
//                         transporterlist={transporterlist}
//                         selectedVal={selectedVal}
//                         queryHandle={queryHandle}
//                         locationHandle={locationHandle}
//                         selectedState={selectedState}
//                         textState={textState}
//                         locationState={locationState}
//                         transporterState={transporterState}
//                         transportHandle={transportHandle}
//                       />
//                       <FinalReviewSection
//                         orderSummary={orderSummary}
//                         handlePlaceOrder={handlePlaceOrder}
//                         deleteCoupon={deleteCoupon}
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <div className=" container row ">
//                       <div className="col-lg-8 ">
//                         <h3 className="text-uppercase bold">
//                           checkout details
//                         </h3>
//                         <div className="d-flex align-items-center">
//                           <button className="btn btn-warning btn-sm rounded-0 bold">
//                             <Link href={"/login"}>LOGIN</Link>
//                           </button>
//                           <span className="text-muted px-2 fs-6">or</span>
//                           <div className="d-flex align-items-center ">
//                             <input
//                               className="form-check-input fs-6"
//                               type="checkbox"
//                               id="flexCheckDefault"
//                             />
//                             <label
//                               className="form-check-label px-2 fs-6 text-muted"
//                               htmlFor="flexCheckDefault"
//                             >
//                               Login as Guest
//                             </label>
//                           </div>
//                         </div>
//                         <div className="col-lg-4 border rounded-1 mt-3">
//                           <h5 className="my-3 bold text-uppercase px-1">
//                             Order Summary
//                           </h5>
//                           <OrderSummary orderSummary={orderSummary} />
//                         </div>

//                         <div className="border rounded-1 mt-2">
//                           <h5 className="px-3">Create new address</h5>
//                           <h6 className="bold px-3 mb-0">Shipping</h6>
//                           <VisitorAddress
//                             address_type="Shipping"
//                             isSameAsShipping={billingCheckbox}
//                           />
//                           <h6 className="bold px-3">Billing</h6>
//                           <div className="d-flex align-items-center px-3">
//                             <input
//                               className={`form-check-input fs-6 `}
//                               type="checkbox"
//                               defaultChecked={false}
//                               id="flexCheckDefault"
//                               onChange={(
//                                 e: React.ChangeEvent<HTMLInputElement>
//                               ) => handleChangeSameAsShipping(e.target.checked)}
//                             />
//                             <label
//                               className="form-check-label px-2 fs-6"
//                               htmlFor="flexCheckDefault"
//                             >
//                               Same as Shipping Address
//                             </label>
//                           </div>
//                           {billingCheckbox ? (
//                             <VisitorAddress
//                               address_type="Billing"
//                               isSameAsShipping={billingCheckbox}
//                             />
//                           ) : null}
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       <hr />

//     {show ? (
//       <AddNewAddressForm
//         show={show}
//         toHide={handleShow}
//         address_type={type}
//       />
//     ) : null}

//     {showEditModal ? (
//       <EditAddressForm
//         show={showEditModal}
//         toHide={handleEditModal}
//         detailData={detailData}
//         address_type={type}
//       />
//     ) : null}
//     </>
//   );
// };

// export default MobCheckout;
