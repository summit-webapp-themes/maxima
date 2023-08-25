import React from "react";
import { useEffect, useState } from "react";
import { LoginValidation } from "../../validation/loginValidation";
import {
  Formik,
  Form as FormikForm,
  ErrorMessage,
  useFormikContext,
} from "formik";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  fetchLoginUser,
  login_state,
} from "../../store/slices/auth/login_slice";
import { getAccessToken } from "../../store/slices/auth/token-login-slice";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import getOtpFetchApi from "../../services/api/auth/get-otp-api";
import useMultilangHook from "../../hooks/LanguageHook/Multilanguages-hook";

const Loginpage = () => {
  const dispatch = useDispatch();
  const loginSucess: any = useSelector(login_state);
  const [newState, setNewState] = useState<any>([]);
  const [loginStatus, setLoginStatus] = useState<any>("");
  const [newValues, setnewValue] = useState<any>("");
  const [ShowAlertMsg, setShowAlertMsg] = useState<boolean>(false);
  const [messageState, setMessageState] = useState<any>("");
  const [isOtpLoginState, setIsOtpLoginState] = useState<boolean>(false);
  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();
  const { handleLanguageChange, multiLanguagesData }: any = useMultilangHook();
  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);

  let isLoggedIn: any;
  let guestLogin: any;
  const router = useRouter();
  let obj = {
    isGoogleLogin: false,
    visitor: false,
    isOtpLogin: false,
  };
  if (typeof window !== "undefined") {
    guestLogin = localStorage.getItem("guest");
    isLoggedIn = localStorage.getItem("isLoggedIn");
  }

  const handlesubmit = (values: any) => {
    const val = Object.assign(obj, values);

    const user_params = {
      values: values,
      guest: guestLogin,
      isOtpLogin: isOtpLoginState === true ? true : false,
    };
    console.log("userparams", user_params);

    dispatch(getAccessToken(user_params));

    setTimeout(() => {
      const loginStatusFromStorage: any = localStorage.getItem("isLoggedIn");
      setLoginStatus(loginStatusFromStorage);
      setIsOtpLoginState(false);
    }, 2000);
  };
  useEffect(() => {
    if (loginStatus === "true") {
      // dispatch(successmsg("logged in sucessfully"));
      // setTimeout(() => {
      //   dispatch(hideToast());
      // }, 800);
      router.push("/");
      localStorage.removeItem("guest");
      localStorage.removeItem("guestToken");
    }
    // else if (loginStatus === null) {
    //   dispatch(failmsg("Invalid Credential"));
    //   setTimeout(() => {
    //     dispatch(hideToast());
    //   }, 800);
    // }
  }, [handlesubmit]);
  console.log(loginSucess, "loginSucess");

  console.log(isLoggedIn, "newState");
  const FormObserver: React.FC = () => {
    const { values }: any = useFormikContext();
    useEffect(() => {
      setnewValue(values);
    }, [values]);
    return null;
  };

  const HandleGetOtp = async (e: any) => {
    let newObj = {
      email: newValues?.email,
    };
    e.preventDefault();
    let GetOtpApiRes: any = await getOtpFetchApi(newObj);

    if (GetOtpApiRes?.data?.message?.msg === "success") {
      setShowAlertMsg(true);
      setMessageState(GetOtpApiRes?.data?.message?.msg);
      setIsOtpLoginState(true);
      setTimeout(() => {
        setShowAlertMsg(false);
        setMessageState("");
      }, 1000);
    } else {
      setShowAlertMsg(true);
      setMessageState(GetOtpApiRes?.data?.message?.msg);
      setTimeout(() => {
        setShowAlertMsg(false);
        setMessageState("");
      }, 1500);
    }
  };
  return (
    <>
      <div className="container">
        <div className="logo mt-3">
          <Link href="/" className="navbar-brand">
            <Image
              src="/assets/images/maxima_b2b_b.png"
              alt="logo"
              width={150}
              height={55}
            />
          </Link>
        </div>
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginValidation}
            onSubmit={(values) => {
              handlesubmit(values);
            }}
          >
            {({ handleChange, handleBlur }) => (
              <FormikForm>
                <div className="login-form-wrapper">
                  <div className="mainFields-wrapper">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-6 logo-wrapper">
                          <h2 className="login_heading mt-3">
                            {selectedMultiLangData?.login}
                          </h2>
                          <Form.Group controlId="formName">
                            <div className="row mt-3">
                              <div className="col-md-4">
                                <Form.Label className="login-label">
                                  {selectedMultiLangData?.mobile_number} /{" "}
                                  {selectedMultiLangData?.email}:
                                </Form.Label>
                              </div>

                              <div className="col-md-8">
                                <Form.Control
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type="text"
                                  name="email"
                                  className="login_inputs"
                                />
                                <div className="row">
                                  <div className="col-8">
                                    <div className="error_message">
                                      <ErrorMessage name="email" />
                                    </div>
                                  </div>
                                  <div className="col-4 text-end">
                                    <Link
                                      className="linkss"
                                      href="#"
                                      onClick={(e) => HandleGetOtp(e)}
                                    >
                                      {selectedMultiLangData?.get_otp}
                                    </Link>
                                  </div>
                                  {ShowAlertMsg && (
                                    <div
                                      className={`alert ${
                                        messageState === "success"
                                          ? "alert-success"
                                          : "alert-danger"
                                      } otp_alertbox`}
                                      role="alert"
                                    >
                                      {messageState === "success"
                                        ? "OTP send sucessfully on registered email"
                                        : "Please enter valid or registered email"}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Form.Group>

                          <Form.Group controlId="formPassword">
                            <div className="row mt-3">
                              <div className="col-md-4">
                                <Form.Label className="login-label">
                                  {selectedMultiLangData?.password_otp}:
                                </Form.Label>
                              </div>

                              <div className="col-md-8">
                                <Form.Control
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type="password"
                                  name="password"
                                  className="login_inputs"
                                />
                                <div className="row">
                                  <div className="col-6">
                                    <div className="error_message">
                                      <ErrorMessage name="password" />
                                    </div>
                                  </div>
                                  <div className="col-6 text-end">
                                    <Link
                                      className={`linkss`}
                                      href="/forgot-password"
                                    >
                                      {selectedMultiLangData?.forgot_password} ?
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Form.Group>
                          <div className={`mt-5 login_submitbtn`}>
                            <button
                              type="submit"
                              className={` btn button_color`}
                            >
                              {selectedMultiLangData?.submit}
                            </button>
                          </div>
                        </div>

                        <div className="col-lg-6 google_btn">
                          <div className="row">
                            <div className="col-12 text-lg-start text-center">
                              <div className="login-with-google mt-2">
                                {/* <Googlelogin />  */}
                                {/* </button> */}
                              </div>
                            </div>

                            <div
                              className={`col-12 text-lg-start register_account`}
                            >
                              <div className="register ms-2 account-margin">
                                <span className="not_an_account">
                                  {selectedMultiLangData?.not_an_account}?{" "}
                                  <Link className={`linkss`} href="/register">
                                    {selectedMultiLangData?.register}
                                  </Link>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <FormObserver />
              </FormikForm>
            )}
          </Formik>
        </div>
        <hr></hr>
      </div>
    </>
  );
};

export default Loginpage;
