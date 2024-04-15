import React, { useEffect, useState } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import ResetPasswordApi from '../services/api/auth/reset-password';
import ResetpasswordValidation from '../validation/resetPasswordValidation';

import { SelectedFilterLangDataFromStore } from '../store/slices/general_slices/selected-multilanguage-slice';
import { showToast } from './ToastNotificationNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface FormValues {
  email: any;
  newPassword: any;

  confirmPassword: any;
}

const ResetPassword: any = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const initialValues: FormValues = {
    email: '',
    newPassword: '',
    confirmPassword: '',
  };

  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  console.log('SelectedLangDataFromStore', SelectedLangDataFromStore);
  const [selectLangData, setLangData] = useState<any>();
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confrimPasswordHidden, setconfrimPasswordHidden] = useState(true);

  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore?.selectedLanguageData]);

  const handleSubmit = async (values: any, action: any) => {
    let resetPasswordApiRes: any = await ResetPasswordApi(values);
    console.log('resetPasswordApiRes', resetPasswordApiRes);
    if (resetPasswordApiRes?.data?.message?.msg === 'success') {
      showToast('Password Changed sucessfully', 'success');
      router.push('/login');
    } else {
      showToast('User With this email Does Not Exists', 'error');
    }
  };

  const handlePassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setPasswordHidden(!passwordHidden);
  };

  const handleConfirmPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setconfrimPasswordHidden(!confrimPasswordHidden);
  };

  return (
    <>
      <div className="container change_pwd margin_from_nav">
        <div className="page_heading text-center">
          <h4 className="text-uppercase change_pwdh4">
            {selectLangData?.reset_your_password}
          </h4>
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
                    <div className="col-md-3 d-flex align-items-center  reset-label-wrapper-mob">
                      <div className="label text-end">
                        <label htmlFor="" className="">
                          {selectLangData?.email}:
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
                    <div className="col-md-3  d-flex align-items-center reset-label-wrapper-mob">
                      <div className="text-end label">
                        <label htmlFor="" className="">
                          {selectLangData?.new_password}:
                        </label>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="password_block">
                        <Field
                          // type="password"
                          type={passwordHidden ? 'password' : 'text'}
                          className="password_field py-4  position-relative"
                          name="newPassword"
                          onChange={handleChange}
                        />
                        <button
                          className="reset_password_icon"
                          onClick={(e: React.MouseEvent) => handlePassword(e)}
                        >
                          {passwordHidden ? (
                            // <i className="fas fa-eye"></i>
                            <VisibilityOffIcon />
                          ) : (
                            // <i className="fas fa-eye-slash"></i>
                            <VisibilityIcon />
                          )}
                        </button>
                        <br />
                        <div className="error_message">
                          <ErrorMessage name="newPassword" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4 pwd_height">
                    <div className="col-md-3  d-flex align-items-center  reset-label-wrapper-mob">
                      <div className="text-end label">
                        <label htmlFor="" className="">
                          {selectLangData?.confirm_password}:
                        </label>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="password_block">
                        <Field
                          // type="password"
                          type={confrimPasswordHidden ? 'password' : 'text'}
                          className="password_field py-4"
                          name="confirmPassword  position-relative"
                          onChange={handleChange}
                        />
                        <button
                          className="reset_password_icon"
                          onClick={(e: React.MouseEvent) =>
                            handleConfirmPassword(e)
                          }
                        >
                          {confrimPasswordHidden ? (
                            // <i className="fas fa-eye"></i>
                            <VisibilityOffIcon />
                          ) : (
                            // <i className="fas fa-eye-slash"></i>
                            <VisibilityIcon />
                          )}
                        </button>
                        <br />
                        <div className="error_message">
                          <ErrorMessage name="confirmPassword" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="custom_btn mt-4">
                    <Link href="/login" style={{ color: '#000000' }}>
                      <button type="button" className="btn standard_button">
                        {selectLangData?.back}
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="btn standard_button text-uppercase bold submit_btn_ms"
                    >
                      {selectLangData?.reset}
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
