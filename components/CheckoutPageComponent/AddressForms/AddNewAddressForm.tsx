import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ShippingValidation } from "../../../validation/addressFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { fetchShippingAddress } from "../../../store/slices/checkoutPage-slice/customer-shipping-address-slice";
import { fetchBillingAddress } from "../../../store/slices/checkoutPage-slice/customer-billing-address-slice";
import { storeCustomerAddresses } from "../../../store/slices/checkoutPage-slice/store-customer-address-slice";
import { get_access_token } from "../../../store/slices/auth/token-login-slice";

const AddNewAddressForm = ({
  show,
  toHide,
  address_type,
  state,
  handleSelectedState,
  setSelectedStates,
  setSelectedCity,
  city,
  selectedStates,
  selectedCity,
  selectedMultiLangData,
}: any) => {
  const dispatch = useDispatch();
  const TokenFromStore: any = useSelector(get_access_token);

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
      <Modal show={show} onHide={toHide}>
        <Modal.Header closeButton>
          <Modal.Title className="bold">
            {selectedMultiLangData?.customer_address_form}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={ShippingValidation}
            onSubmit={(values: any, action: any) => {
              console.log("form shipping/billing address form values", values);
              const requestParams = {
                value: { ...values },
                token: TokenFromStore?.token,
              };
              dispatch(storeCustomerAddresses(requestParams));
              setTimeout(() => {
                dispatch(fetchShippingAddress(TokenFromStore?.token));
                dispatch(fetchBillingAddress(TokenFromStore?.token));
              }, 1800);
              action.resetForm();
              toHide();
            }}
            enableReinitialize
          >
            {({ handleChange, isSubmitting, handleBlur }) => (
              // <>
              <Form>
                <div className="container mb-3 ">
                  <div className="billing-form form-wrap  border-dark  p-lg-2 p-md-3 p-2 ">
                    <div className="flex-lg-row row">
                      <div className="col-lg-12">
                        <div className="billing-add-heading">
                          <h4 className="mb-4 my-sm-2 mt-lg-0 fw-bold billing-header">
                            {selectedMultiLangData?.customer_address}
                          </h4>
                        </div>
                      </div>
                      <div className="col-lg-12"></div>
                      <div className="mt-3 mt-lg-0 col-lg-12 mt-3">
                        <div className="fields-group-md mb-4 fs-6">
                          <div className="form-group">
                            <label className="form-Form.Label fs-4 text-dark">
                              {selectedMultiLangData?.name}
                              <span className="red">*</span>
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

                            <span className="error_message text-danger fs-5">
                              <ErrorMessage name="name" />
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="form-group mt-3 fs-6">
                            <label className="form-Form.Label fs-4 text-dark">
                              {selectedMultiLangData?.address_1}
                              <span className="red">*</span>
                            </label>
                            <Field
                              className="form-control rounded-0"
                              id="address_1"
                              name="address_1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />

                            <span className="error_message text-danger fs-5">
                              <ErrorMessage name="address_1" />
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="form-group mt-3 fs-6">
                            <label className="form-Form.Label fs-4 text-dark">
                              {selectedMultiLangData?.address_2}
                              <span className="red">*</span>
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
                          <div className="form-group mt-3 fs-6">
                            <label className="form-Form.Label fs-4 text-dark">
                              {selectedMultiLangData?.country}{" "}
                              <span className="red">*</span>
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
                              <option>
                                {selectedMultiLangData?.please_select_a_country}
                              </option>
                              <option>India</option>
                            </Field>
                            <span className="error_message text-danger fs-5">
                              <ErrorMessage name="country" />
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="form-group mt-3 fs-6">
                            <label className="form-Form.Label fs-4 text-dark">
                              {selectedMultiLangData?.state}
                              <span className="red">*</span>
                            </label>
                            <Field
                              component="select"
                              className="form-control rounded-0"
                              id="state"
                              name="state"
                              value={selectedStates}
                              onChange={(e: any) => {
                                setSelectedStates(e?.target?.value);
                                handleSelectedState(e?.target?.value);
                              }}
                              onClick={handleChange}
                              onBlur={handleBlur}
                            >
                              <option>
                                {selectedMultiLangData?.please_select_a_state}
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
                            <span className="error_message text-danger fs-5">
                              <ErrorMessage name="state" />
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="form-group mt-3 fs-6">
                            <label className="form-Form.Label fs-4 text-dark">
                              {selectedMultiLangData?.city}{" "}
                              <span className="red">*</span>
                            </label>
                            <Field
                              component="select"
                              className="form-control rounded-0"
                              id="city"
                              name="city"
                              value={selectedCity}
                              defaultValue=""
                              onChange={(e: any) => {
                                setSelectedCity(e.target.value);
                                handleChange;
                              }}
                              onClick={handleChange}
                              onBlur={handleBlur}
                            >
                              <option>
                                {selectedMultiLangData?.please_select_a_city}
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
                            <span className="error_message text-danger fs-5">
                              <ErrorMessage name="city" />
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="form-group mt-3 fs-6">
                            <label className="form-Form.Label fs-4 text-dark">
                              {selectedMultiLangData?.postal_code}{" "}
                              <span className="red">*</span>
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

                            <span className="error_message text-danger fs-5">
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
                          <span className="fs-5 align-bottom mx-1 text-dark">
                            {selectedMultiLangData?.set_as_default_address}
                          </span>
                        </div>

                        <div>
                          <div className="form-group  mt-3 fs-6">
                            <label className="form-Form.Label fs-4 text-dark">
                              {selectedMultiLangData?.email}{" "}
                              <span className="red">*</span>
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

                            <span className="error_message text-danger fs-5">
                              <ErrorMessage name="email" />
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="form-gr2oup  mt-3 fs-6">
                            <label className="form-Form.Label fs-4 text-dark">
                              {selectedMultiLangData?.mobile_number}{" "}
                              <span className="red">*</span>
                            </label>
                            <Field
                              type="text"
                              className="form-control rounded-0"
                              id="contact"
                              name="contact"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              autoComplete="off"
                            />

                            <span className="error_message text-danger fs-5">
                              <ErrorMessage name="contact" />
                            </span>
                          </div>
                        </div>

                        <div className="text-center ">
                          <button
                            type="submit"
                            className="btn mt-3 px-4 py-3 text-uppercase rounded-0 button_color"
                            disabled={isSubmitting}
                          >
                            {selectedMultiLangData?.save_address}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddNewAddressForm;
