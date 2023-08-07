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

const Loginpage = () => {
  const dispatch = useDispatch();
  const loginSucess = useSelector(login_state);
  const [newState, setNewState] = useState<any>([]);
  const [newValues, setnewValue] = useState<any>("");
  let isLoggedIn: any;
  const router = useRouter();
  let obj = {
    isGoogleLogin: false,
    visitor: false,
    isOtpLogin: false,
  };
  if (typeof window !== "undefined") {
    isLoggedIn = localStorage.getItem("isLoggedIn");
  }

  const handlesubmit = (values: any) => {
    const val = Object.assign(obj, values);
    dispatch(fetchLoginUser(val));
    dispatch(getAccessToken(values))
  };
  useEffect(() => {
    if (loginSucess.user === "LoggedIn") {
      router.push("/");
    }
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

  const otpSubmit = async (e: any) => {
    let newObj = {
      // isGoogleLogin: false,
      // visitor: false,
      isOtpLogin: true,
      email: newValues?.email,
    };
    e.preventDefault();
    dispatch(fetchLoginUser(newObj));
  };
  return (
    <>
      <div className="container">
        <div className="logo mt-3">
          <Link href="/" className="navbar-brand">
            <Image
              src="/assets/images/summit-logo-bb.jpg"
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
                            Login
                            {/* {loginToken} */}
                          </h2>
                          <Form.Group controlId="formName">
                            <div className="row mt-3">
                              <div className="col-md-4">
                                <Form.Label className="login-label">
                                  Mobile No / Email ID:
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
                                      onClick={(e) => otpSubmit(e)}
                                    >
                                      Get Otp
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Form.Group>

                          <Form.Group controlId="formPassword">
                            <div className="row mt-3">
                              <div className="col-md-4">
                                <Form.Label className="login-label">
                                  Password / OTP:
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
                                      Forgot Password ?
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Form.Group>
                          <div className={`mt-5 login_submitbtn`}>
                            <button
                              type="submit"
                              className={` btn btn-warning button_color`}
                            >
                              Submit
                            </button>
                            {/* {isAlertVisible && (
                                    <div
                                      className={`alert ${
                                        message === "success"
                                          ? "alert-success"
                                          : "alert-danger"
                                      } otp_alertbox`}
                                      role="alert"
                                    >
                                      {message === "success"
                                        ? "OTP send sucessfully on registered email"
                                        : "Please enter valid or registered email"}
                                    </div>
                                  )}                  */}
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
                                  Not an account?{" "}
                                  <Link className={`linkss`} href="/register">
                                    Register
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
