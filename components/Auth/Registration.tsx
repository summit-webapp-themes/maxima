import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { Form, FormLabel } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { RegistrationValidation } from "../../validation/registrationValidation";
import Image from "next/image";
import { register_details } from "../dataSets/registrationDataset";
import {
  getRegistrationData,
  registration_state,
} from "../../store/slices/auth/registration_slice";
import {
  FetchCitiesForAddressForm,
  FetchStateForAddressForm,
} from "../../services/api/general_apis/customer-form-data-api";

const Registration = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const Register_state = useSelector(registration_state);

  console.log("register details", register_details);
  let [selectedCity, setSelectedCity] = useState("");
  let [selectedStates, setSelectedStates] = useState("");

  let [city, setCity] = useState<any>([]);
  const [err, setErr] = useState(false);
  let [state, setState] = useState([]);

  useEffect(() => {
    const getStateData = async () => {
      const stateData = await FetchStateForAddressForm();
      if (stateData?.length > 0) {
        let stateValues = stateData
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
    const getCitiesFromState = await FetchCitiesForAddressForm(stateValue);
    console.log("cities values", getCitiesFromState);
    if (getCitiesFromState?.length > 0) {
      let citiesValues = getCitiesFromState
        .map((item: any) => item.name)
        .filter((item: any) => item !== null);

      console.log("cities values new", citiesValues);
      setCity(citiesValues);
    }
  };

  const handlesubmit = (values: any, action: any) => {
    console.log("form values", values);
    dispatch(getRegistrationData(values));
    action.resetForm();
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="logo mt-3">
              <Link href="/" legacyBehavior>
                <a>
                  <Image
                    src="/assets/images/summit-logo-bb.jpg"
                    width={130}
                    height={40}
                    alt="logo"
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="registration_form">
          <div className="registr-heading text-center mb-2">
            <h1 className="text-uppercase registration_title">Register</h1>
          </div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              contact: "",
              address_1: "",
              address_2: "",
              gst_number: "",
              city: "",
              state: "",
              postal_code: "",
              confirm_password: "",
            }}
            validationSchema={RegistrationValidation}
            onSubmit={(values, action) => {
              handlesubmit(values, action);
            }}
          >
            {({ handleChange, handleBlur }) => (
              <FormikForm>
                <div className="form-wrapper registration">
                  <div className="mainfields-wrapper">
                    <div className="row justify-content-center">
                      <div className="col-10 main-column">
                        {register_details.map((details: any, i) => (
                          <div className="row mt-3" key={i}>
                            <Form.Group controlId={details?.controlId}>
                              <div className="row">
                                <div className="col-md-4">
                                  <Form.Label className="registration_label">
                                    {details?.label}:
                                  </Form.Label>
                                </div>
                                {details?.name !== "state" &&
                                details?.name !== "city" ? (
                                  <div className="col-md-8">
                                    <Field
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      type={details?.type}
                                      name={details?.name}
                                      className={`${
                                        details?.name === "address"
                                          ? "address_textarea"
                                          : ""
                                      } form-control rounded-0`}
                                    />
                                    <div className="error_message">
                                      <ErrorMessage
                                        className="error_message"
                                        name={details?.name}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}

                                {details?.name === "state" && (
                                  <div className="col-md-8">
                                    <Field
                                      component="select"
                                      className="form-control rounded-0"
                                      id="state"
                                      name="state"
                                      value={selectedStates}
                                      onBlur={handleBlur}
                                      onChange={(e: any) => {
                                        console.log(
                                          "selected state",
                                          e?.target?.value
                                        );
                                        setSelectedStates(e?.target?.value);
                                        handleSelectedState(e?.target?.value);
                                      }}
                                      onClick={handleChange}
                                    >
                                      <option>
                                        Select Select a region, state or
                                        province
                                      </option>
                                      {state?.length > 0 && (
                                        <>
                                          {state?.map(
                                            (data: any, index: any) => {
                                              return (
                                                <>
                                                  <option
                                                    value={data}
                                                    key={index}
                                                  >
                                                    {data}
                                                  </option>
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      )}
                                    </Field>
                                  </div>
                                )}

                                {details?.name === "city" && (
                                  <div className="col-md-8">
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
                                  </div>
                                )}
                              </div>
                            </Form.Group>
                          </div>
                        ))}
                        <div className="row mt-2  d-flex justify-content-center text-center">
                          <div className="d-flex justify-content-center">
                            <div className="m-2">
                              <Link href="/login">
                                <button
                                  className={`btn bold text-uppercase border_btn text-dark`}
                                >
                                  Back
                                </button>
                              </Link>
                            </div>
                            <div className="m-2">
                              <button
                                type="submit"
                                className="btn btn-warning text-uppercase bold button_color"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Registration;
