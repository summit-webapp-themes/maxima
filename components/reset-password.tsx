import React from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { RootState } from "../store/root-reducer";
import ResetPasswordApi from "../services/api/auth/reset-password";
import ResetpasswordValidation from "../validation/resetPasswordValidation";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../store/slices/general_slices/toast_notification_slice";

interface FormValues {
  email: any;
  newPassword: any;

  confirmPassword: any;
}

const ResetPassword: any = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const initialValues: FormValues = {
    email: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: any, action: any) => {
    let resetPasswordApiRes: any = await ResetPasswordApi(values);
    console.log("resetPasswordApiRes", resetPasswordApiRes);
    if (resetPasswordApiRes?.data?.message?.msg === "success") {
      dispatch(successmsg("Password Changed sucessfully"));
      router.push("/login");
      setTimeout(() => {
        dispatch(hideToast());
      }, 2000);
    } else {
      dispatch(failmsg("User With this email Does Not Exists"));

      setTimeout(() => {
        dispatch(hideToast());
      }, 2000);
    }
  };

  return (
    <>
      <div className="container change_pwd margin_from_nav">
        <div className="page_heading text-center">
          <h4 className="text-uppercase change_pwdh4">Reset Your Password</h4>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={ResetpasswordValidation}
          onSubmit={(values, action) => handleSubmit(values, action)}
        >
          {({ handleChange }) => (
            <FormikForm className="">
              <div className=" text-center mt-4">
                <div className="container">
                  <div className="row mb-4 pwd_height">
                    <div className="col-md-3 d-flex align-items-center justify-content-end">
                      <div className="label text-end">
                        <label htmlFor="" className="">
                          Email ID:
                        </label>
                      </div>
                    </div>
                    <div className="col-md-9 ">
                      <div className="password_block">
                        <Field
                          type="email"
                          className="password_field py-4"
                          name="email"
                          onChange={handleChange}
                        />
                        <br />
                        <div className="error_message">
                          <ErrorMessage name="email" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4 pwd_height ">
                    <div className="col-md-3  d-flex align-items-center justify-content-end">
                      <div className="text-end label">
                        <label htmlFor="" className="">
                          New Password:
                        </label>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="password_block">
                        <Field
                          type="password"
                          className="password_field py-4"
                          name="newPassword"
                          onChange={handleChange}
                        />
                        <br />
                        <div className="error_message">
                          <ErrorMessage name="newPassword" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4 pwd_height">
                    <div className="col-md-3  d-flex align-items-center justify-content-end">
                      <div className="text-end label">
                        <label htmlFor="" className="">
                          Confirm Password:
                        </label>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="password_block">
                        <Field
                          type="password"
                          className="password_field py-4"
                          name="confirmPassword"
                          onChange={handleChange}
                        />
                        <br />
                        <div className="error_message">
                          <ErrorMessage name="confirmPassword" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="custom_btn mt-4">
                    <Link href="/login" style={{ color: "#000000" }}>
                      <button type="button" className="btn standard_button">
                        BACK
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="btn standard_button text-uppercase bold ms-5"
                    >
                      RESET
                    </button>
                  </div>
                </div>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ResetPassword;
