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
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import RegistrationApi from "../../services/api/auth/registration_api";
import useMultilangHook from "../../hooks/LanguageHook/Multilanguages-hook";
import { showToast } from "../ToastNotificationNew";

const Registration = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const TokenFromStore: any = useSelector(get_access_token);

  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();
  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const { handleLanguageChange, multiLanguagesData }: any = useMultilangHook();
  const RegistrationDataFromStore: any = useSelector(registration_state);
  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  console.log("register details", RegistrationDataFromStore);
  let [selectedCity, setSelectedCity] = useState<any>("");
  let [selectedStates, setSelectedStates] = useState<any>("");

  let [city, setCity] = useState<any>([]);
  const [err, setErr] = useState<boolean>(false);
  let [state, setState] = useState<any>([]);

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

  const handlesubmit: any = async (values: any, action: any) => {
    let RegistrationApiRes: any = await RegistrationApi(values);

    if (RegistrationApiRes?.data?.message?.msg === "success") {
      showToast("Registerd sucessfully", "success");
      router.push("/login");
    } else {
      showToast(RegistrationApiRes?.data?.message?.error, "error");
    }
    action.resetForm();
  };

  const HandleRegistrationForm: any = (details: any) => {
    if (details.label === "Name") {
      return selectedMultiLangData?.name;
    } else if (details.label === "Email") {
      return selectedMultiLangData?.email;
    } else if (details.label === "Mobile No") {
      return selectedMultiLangData?.mobile_number;
    } else if (details.label === "Flat No") {
      return selectedMultiLangData?.address_1;
    } else if (details.label === "Street / Road Name") {
      return selectedMultiLangData?.address_2;
    } else if (details.label === "GST Number") {
      return selectedMultiLangData?.gst;
    } else if (details.label === "State") {
      return selectedMultiLangData?.state;
    } else if (details.label === "City") {
      return selectedMultiLangData?.city;
    } else if (details.label === "Pincode") {
      return selectedMultiLangData?.postal_code;
    } else if (details.label === "Password") {
      return selectedMultiLangData?.password;
    } else if (details.label === "Confirm Password") {
      return selectedMultiLangData?.confirm_password;
    }
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
                    src="/assets/images/maxima_b2b_b.png"
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
            <h1 className="text-uppercase registration_title">
              {selectedMultiLangData?.register}
            </h1>
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
              action.resetForm();
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
                                    {HandleRegistrationForm(details)}:
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
                                      placeholder={`Enter ${details?.label}`}
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
                                        {
                                          selectedMultiLangData?.please_select_a_state
                                        }
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
                                      <option>
                                        {
                                          selectedMultiLangData?.please_select_a_city
                                        }
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
                                  {selectedMultiLangData?.back}
                                </button>
                              </Link>
                            </div>
                            <div className="m-2">
                              <button
                                type="submit"
                                className="btn btn-warning text-uppercase bold button_color"
                              >
                                {selectedMultiLangData?.submit}
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
