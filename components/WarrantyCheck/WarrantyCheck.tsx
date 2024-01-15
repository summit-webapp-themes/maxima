import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import useWarrantyCheck from '../../hooks/warranty-check/warranty-check-hook';
import CreateWarrantyClaim from '../../services/api/warranty-check-api/create-warranty-claim';
import { showToast } from '../ToastNotificationNew';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Import Bootstrap styles

interface WarrantyInfo {
  expiryDate: string;
  warrantyPeriod: string;
  salesInvoiceNo: string;
  customerName: string;
}

const WarrantyCheck: React.FC = () => {
  const {
    serialDetails,
    customerWarrantyList,
    warrantyClaim,
    customerWarrantyDetails,
    isLoading,
    handleSearch,
    handleSearchIputValue,
    searchValue,
  } = useWarrantyCheck();

  const [openForm, setOpenForm] = useState<any>(false);
  useEffect(() => {
    setOpenForm(false);
  }, [serialDetails]);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    issue: Yup.string().required('Issue is required'),
    service_address: Yup.string().required('Service Address is required'),
  });

  const initialValues = {
    version: 'v2',
    entity: 'warranty_claim',
    method: 'create_warranty_claim',
    serial_no: searchValue,
    customer: serialDetails?.customer,
    issue: '',
    service_address: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formDataa = {
        ...initialValues,
        ...values,
        serial_no: searchValue,
        customer: serialDetails?.customer,
      };
      const warrantyClaimData = await CreateWarrantyClaim(formDataa as any);

      if (warrantyClaimData?.msg === 'success') {
        showToast(warrantyClaimData?.msg);
        setOpenForm(false);
        handleSearch();
      } else {
        showToast(warrantyClaim?.error);
      }
    },
  });

  return (
    <div className="container margin_from_nav_lp">
      <div className="warranty-check">
        <div className="row">
          <div className="col-12 text-center">
            <h2>Warranty Check</h2>
          </div>

          <div className="offset-md-3 col-6 d-flex justify-content-between">
            <div className="form-group w-50">
              <input
                type="text"
                className="form-control"
                id="serialNumber"
                placeholder="Enter Serial Number"
                value={searchValue}
                onChange={(e) => handleSearchIputValue(e)}
              />
            </div>
            <button
              className="btn btn-primary text-capitalize"
              onClick={handleSearch}
            >
              Check Warranty
            </button>
          </div>

          <div className="col-12  my-5 ">
            {serialDetails !== null && isLoading === 'succeeded' && (
              <>
                <div className=" warranty-cont p-4 custom-card">
                  <div className="p-3">
                    <ol>
                      <li>
                        <h4>Serial No : {serialDetails?.serial_no}</h4>
                      </li>
                      <li>
                        <h4>
                          Warranty Period : {serialDetails?.warranty_period}
                        </h4>
                      </li>
                      <li>
                        <h4>Company Name : {serialDetails?.company}</h4>
                      </li>
                      {serialDetails?.customer_name && (
                        <li>
                          <h4>
                            Customer Name : {serialDetails?.customer_name}
                          </h4>
                        </li>
                      )}
                    </ol>
                  </div>
                  {serialDetails?.warranty_period >= 0 &&
                    warrantyClaim === null && (
                      <div className="text-end">
                        <button
                          className="btn btn-secondary"
                          onClick={() => setOpenForm(true)}
                        >
                          Claim Warranty
                        </button>
                      </div>
                    )}
                  {openForm && (
                    <form onSubmit={formik.handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="issue" className="form-label">
                          Issue:
                        </label>
                        <input
                          type="text"
                          id="issue"
                          name="issue"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.issue}
                        />
                        {formik.touched.issue && formik.errors.issue ? (
                          <div className="text-danger">
                            {formik.errors.issue}
                          </div>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="service_address" className="form-label">
                          Service Address:
                        </label>
                        <input
                          type="text"
                          id="service_address"
                          name="service_address"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.service_address}
                        />
                        {formik.touched.service_address &&
                        formik.errors.service_address ? (
                          <div className="text-danger">
                            {formik.errors.service_address}
                          </div>
                        ) : null}
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  )}

                  {warrantyClaim === null ||
                    (warrantyClaim !== undefined && (
                      <div className="warranty-claim mt-4 p-4">
                        <h2 className="text-danger">Claim Warranty </h2>
                        <h4>Serial No : {warrantyClaim?.serial_no}</h4>
                        <h4>Claim Id : {warrantyClaim?.name}</h4>
                        <h4>
                          Complaint Date : {warrantyClaim?.complaint_date}
                        </h4>
                        <h4>Complaint : {warrantyClaim?.complaint}</h4>
                      </div>
                    ))}
                </div>
              </>
            )}
            {customerWarrantyDetails !== null && (
              <div
                className={`warranty-customer ${
                  customerWarrantyDetails.length > 0 ? 'custom-card' : ''
                }`}
              >
                {customerWarrantyDetails?.map((elem: any, index: number) => (
                  <div key={index} className="card mb-3 custom-card">
                    <div className="card-body d-flex justify-content-around align-items-center">
                      <h4 className="card-text  m-0">
                        Serial No : {elem?.serial_no}
                      </h4>
                      <h4 className="card-text m-0">
                        Claim Id : {elem?.warranty_claim}
                      </h4>
                      <h4
                        className={`card-text m-0 text-white px-5 py-3 rounded-5 ${
                          elem?.status === 'Open' ? 'bg-success' : 'bg-danger'
                        }`}
                      >
                        <FiberManualRecordIcon /> {elem?.status}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyCheck;
