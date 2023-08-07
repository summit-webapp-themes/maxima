import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ShippingValidation } from "../../../validation/addressFormValidation";
import { useDispatch } from "react-redux";
import { fetchBillingAddress } from "../../../store/slices/checkoutPage-slice/customer-billing-address-slice";
import { fetchShippingAddress } from "../../../store/slices/checkoutPage-slice/customer-shipping-address-slice";
import { storeCustomerAddresses } from "../../../store/slices/checkoutPage-slice/store-customer-address-slice";
import { fetchprofileDataThunk } from "../../../store/slices/general_slices/profile-page-slice";

const EditAddressForm = ({
  show,
  toHide,
  address_type,
  detailData,
  billingCheckbox,
  handleChangeSameAsShipping,
  handleSelectedState,
  setSelectedCity,
  city,
  state,
  selectedCity,
}: any) => {
  const dispatch = useDispatch();
  let [selectedStates, setSelectedStates] = useState(detailData?.state);

  console.log("address_type", address_type);
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
    address_id: detailData.address_id,
    address_type: address_type,
  };

  return (
    <>
      <Modal show={show} onHide={toHide}>
        <Modal.Header closeButton>
          <Modal.Title className="bold">Customer Address Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={detailData || initialValues}
            validationSchema={ShippingValidation}
            onSubmit={(values: any, action: any) => {
              console.log("form shipping/billing address form values", values);
              dispatch(storeCustomerAddresses({ ...values }));
              setTimeout(() => {
                dispatch(fetchShippingAddress());
                dispatch(fetchBillingAddress());
                dispatch(fetchprofileDataThunk());
              }, 1000);
              action.resetForm();
              toHide();
              handleChangeSameAsShipping(!billingCheckbox);
            }}
            enableReinitialize
          >
            {({ handleChange, isSubmitting, handleBlur }) => (
              <Form>
                <div className="container mb-3 ">
                  <div className="billing-form form-wrap  border-dark  p-lg-2 p-md-3 p-2 ">
                    <div className="flex-lg-row row">
                      <div className="col-lg-12">
                        <div className="billing-add-heading">
                          <h4 className="mb-4 my-sm-2 mt-lg-0 fw-bold billing-header">
                            Customer address
                          </h4>
                        </div>
                      </div>
                      <div className="col-lg-12"></div>
                      <div className="mt-3 mt-lg-0 col-lg-12 mt-3">
                        <div className="fields-group-md mb-4 fs-6">
                          <div className="form-group">
                            <label className="form-Form.Label fs-4 text-dark">
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

                            <span className="error_message text-danger fs-5">
                              <ErrorMessage name="name" />
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="form-group mt-3 fs-6">
                            <label className="form-Form.Label fs-4 text-dark">
                              Address 1<span className="red">*</span>
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
                          <div className="form-group mt-3 fs-6">
                            <label className="form-Form.Label fs-4 text-dark">
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
                              <option>Please select a country.</option>
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
                              State/Province <span className="red">*</span>
                            </label>
                            <Field
                              component="select"
                              className="form-control rounded-0"
                              id="state"
                              name="state"
                              value={selectedStates}
                              onBlur={handleBlur}
                              onChange={(e: any) => {
                                console.log("selected state", e?.target?.value);
                                setSelectedStates(e?.target?.value);
                                handleSelectedState(e?.target?.value);
                              }}
                              onClick={handleChange}
                            >
                              <option>
                                Select Select a region, state or province
                              </option>
                              {state?.length > 0 && (
                                <>
                                  {state?.map((data: any, index: any) => {
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
                              City <span className="red">*</span>
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
                              <option>Please select a city.</option>
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
                          <span className="fs-6 align-bottom mx-1 fs-5">
                            Set as default address
                          </span>
                        </div>

                        <div>
                          <div className="form-group  mt-3 fs-6">
                            <label className="form-Form.Label fs-4 text-dark">
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

                            <span className="error_message text-danger fs-5">
                              <ErrorMessage name="email" />
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="form-gr2oup  mt-3 fs-6">
                            <label className="form-Form.Label fs-4 text-dark">
                              Mobile No <span className="red">*</span>
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
                            className="btn btn-warning mt-3 px-2 py-3 text-uppercase rounded-0 button_color"
                            disabled={isSubmitting}
                          >
                            save the address
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

export default EditAddressForm;
