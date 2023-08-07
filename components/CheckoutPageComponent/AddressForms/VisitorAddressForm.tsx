import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  storeCustomerAddresses,
  store_address_state,
} from "../../../store/slices/checkoutPage-slice/store-customer-address-slice";
import { ShippingValidation } from "../../../validation/addressFormValidation";
import {
  FetchCitiesForAddressForm,
  FetchStateForAddressForm,
} from "../../../services/api/general_apis/customer-form-data-api";
import { fetchShippingAddress } from "../../../store/slices/checkoutPage-slice/customer-shipping-address-slice";
import { fetchBillingAddress } from "../../../store/slices/checkoutPage-slice/customer-billing-address-slice";

const VisitorAddress = ({
  address_type,
  shipping_check,
  state,
  setSelectedState,
  selectedStates,
}: any) => {
  const dispatch = useDispatch();

  const storeAddressStore = useSelector(store_address_state);

  let [selectedCity, setSelectedCity] = useState("");

  let [city, setCity] = useState<any>([]);
  const [err, setErr] = useState(false);

  const handleSelectedState = async (stateValue: string) => {
    setSelectedCity("");
    setCity([]);
    const getCitiesFromState = await FetchCitiesForAddressForm(stateValue);
    console.log("cities values", getCitiesFromState);
    if (getCitiesFromState?.length > 0) {
      let citiesValues = getCitiesFromState
        ?.map((item: any) => item?.name)
        .filter((item: any) => item !== null);

      console.log("cities values new", citiesValues);
      setCity(citiesValues);
    }
  };

  const initialValues = {
    name: "",
    address_1: "",
    address_2: "",
    country: "",
    state: "",
    city: "",
    postal_code: "",
    email: "",
    contact: "",
    set_as_default: false,
    address_type: address_type,
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ShippingValidation}
        onSubmit={async (values: any, action: any) => {
          if (shipping_check) {
            console.log("checking address", values);
            dispatch(storeCustomerAddresses({ ...values }, false));

            localStorage.setItem("guestLogin", "true");
            localStorage.setItem("isLoggedIn", "true");

            setTimeout(() => {
              dispatch(fetchShippingAddress());
              dispatch(fetchBillingAddress());
            }, 6000);
          } else {
            console.log("checking address else", values);
            dispatch(storeCustomerAddresses({ ...values }, false));

            localStorage.setItem("guestLogin", "true");
            localStorage.setItem("isLoggedIn", "true");

            setTimeout(() => {
              dispatch(fetchShippingAddress());
              dispatch(fetchBillingAddress());
              // dispatch(navbarAPI());
            }, 6000);
            setTimeout(()=>
            {
              window.location.reload();
            },8000)
          }
        }}
      >
        {({ handleChange, isSubmitting, handleBlur }) => (
          <Form>
            <div className="container mb-3 ">
              <div className="billing-form form-wrap  border-dark  p-lg-2 p-md-3 p-2 ">
                <div className="flex-lg-row row">
                  <div className="col-lg-12">
                    <div className="billing-add-heading"></div>
                  </div>
                  <div className="col-lg-12"></div>
                  <div className="mt-3 mt-lg-0 col-lg-12 mt-3">
                    <div className="fields-group-md mb-4 fs-4">
                      <div className="form-group">
                        <label className="form-Form.Label">
                          Name <span className="red">*</span>
                        </label>
                        <Field
                          type="text"
                          className="form-control rounded-0"
                          id="name"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                        />

                        <span className="error_message text-danger">
                          <ErrorMessage name="name" />
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="form-group mt-3 fs-4">
                        <label className="form-Form.Label ">
                          Address 1<span className="red">*</span>
                        </label>
                        <Field
                          className="form-control rounded-0"
                          id="address_1"
                          name="address_1"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <span className="error_message text-danger ">
                          <ErrorMessage name="address_1" />
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="form-group mt-3 fs-4">
                        <label className="form-Form.Label fs-4">
                          Address 2<span className="red">*</span>
                        </label>
                        <Field
                          as="textarea"
                          className="form-control rounded-0"
                          id="address_2"
                          name="address_2"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></Field>
                      </div>
                    </div>

                    <div>
                      <div className="form-group mt-3 fs-4">
                        <label className="form-Form.Label fs-4">
                          Country <span className="red">*</span>
                        </label>
                        <Field
                          component="select"
                          id="billingCountry"
                          className="form-control rounded-0"
                          name="country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                        >
                          <option value="">Please select a country.</option>
                          <option>India</option>
                        </Field>
                        <span className="error_message text-danger">
                          <ErrorMessage name="country" />
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="form-group mt-3 fs-4">
                        <label className="form-Form.Label fs-4">
                          State/Province <span className="red">*</span>
                        </label>
                        <Field
                          component="select"
                          className="form-control rounded-0"
                          as="select"
                          id="state"
                          name="state"
                          value={selectedStates}
                          onChange={(e: any) => {
                            console.log("selected state", e.target.value);
                            setSelectedState(e.target.value);
                            handleSelectedState(e.target.value);
                          }}
                          onClick={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>
                            Select Select a region, state or province
                          </option>
                          {state?.length > 0 && (
                            <>
                              {state.map((data: any, index: any) => {
                                return (
                                  <>
                                    <option value={data} key={index}>
                                      {data}
                                    </option>
                                  </>
                                );
                              })}
                            </>
                          )}
                        </Field>

                        <span className="error_message text-danger">
                          <ErrorMessage name="state" />
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="form-group mt-3 fs-4">
                        <label className="form-Form.Label fs-4">
                          City <span className="red">*</span>
                        </label>
                        <Field
                          component="select"
                          className="form-control rounded-0"
                          id="city"
                          name="city"
                          value={selectedCity}
                          as="select"
                          onChange={(e: any) => {
                            setSelectedCity(e.target.value);
                            handleChange;
                          }}
                          onClick={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>
                            Please select a region, state, or province.
                          </option>
                          {city?.length > 0 && (
                            <>
                              {city.map((data: any, index: any) => (
                                <option value={data} key={index}>
                                  {data}
                                </option>
                              ))}
                            </>
                          )}
                        </Field>

                        <span className="error_message text-danger">
                          <ErrorMessage name="city" />
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="form-group mt-3 fs-4">
                        <label className="form-Form.Label fs-4">
                          Zip/Postal Code <span className="red">*</span>
                        </label>
                        <Field
                          type="text"
                          className="form-control rounded-0"
                          id="postal_code"
                          name="postal_code"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                        />

                        <span className="error_message text-danger">
                          <ErrorMessage name="postal_code" />
                        </span>
                      </div>
                    </div>

                    <div className=" mt-4">
                      <Field
                        className="form-check-Form.Control mt-1 rounded-0"
                        type="checkbox"
                        id="set_as_default"
                        name="set_as_default"
                        onChange={handleChange}
                      />
                      <span className="fs-4 align-bottom mx-1">
                        Set as default address
                      </span>
                    </div>

                    <div>
                      <div className="form-group  mt-3 fs-4">
                        <label className="form-Form.Label fs-4">
                          Email ID <span className="red">*</span>
                        </label>
                        <Field
                          type="email"
                          className="form-control rounded-0"
                          id="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                        />

                        <span className="error_message text-danger">
                          <ErrorMessage name="email" />
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="form-gr2oup  mt-3 fs-4">
                        <label className="form-Form.Label fs-4">
                          Mobile No <span className="red">*</span>
                        </label>
                        <Field
                          type="text"
                          className="form-control rounded-0"
                          id="contact"
                          name="contact"
                          // value={phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                        />

                        <span className="error_message text-danger">
                          <ErrorMessage name="contact" />
                        </span>
                      </div>
                    </div>

                    <div className="text-center ">
                      <button
                        type="submit"
                        className="btn btn-warning mt-3 px-4 py-3 text-uppercase rounded-0 button_color"
                        disabled={isSubmitting}
                      >
                        Save the address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default VisitorAddress;
