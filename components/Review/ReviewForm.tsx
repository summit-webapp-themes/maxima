import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
// import ReviewFormValidation from '../../validation/ReviewFormValidation';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { product_detail_data_selector_state } from '../../store/slices/product-detail-page-slices/product-detail-data-slice';
import UploadReviewPhotoAPI from '../../services/api/product-detail-page-api/product-review-api/upload_review_photo';
import { CONSTANTS } from '../../services/config/app-config';
import PostProductReviewAPI from '../../services/api/product-detail-page-api/product-review-api/post_product_review_api';
import { get_access_token } from '../../store/slices/auth/token-login-slice';
import { fetchProductReview } from '../../store/slices/product-detail-page-slices/product-review-slice/product-review-slice';

const ReviewForm = ({ reviews }: any) => {
  const [value, setValue] = React.useState<any>(1);

  let ratingValues: any = value / 5;
  console.log('rating1 value', ratingValues);
  const product_detail_data_from_redux = useSelector(
    product_detail_data_selector_state
  );
  console.log(
    'product item details data',
    product_detail_data_from_redux?.data?.name
  );
  let product_item_code: any = product_detail_data_from_redux?.data?.name;

  // State variables for file uploads
  const [uploadResponses, setUploadResponses] = useState<
    { file_url: string }[]
  >([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [reviewPhotos, setReviewPhotos] = useState<any[]>([]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedFile = e.target.files?.[0];
    console.log('rating1 new file', newSelectedFile?.name);
    if (newSelectedFile) {
      try {
        const response = await UploadReviewPhotoAPI({ file: newSelectedFile });
        console.log('rating1 response', response);
        // Set the upload response and selected file to the state
        setUploadResponses([...uploadResponses, response]);
        setSelectedFiles([...selectedFiles, newSelectedFile]);

        // Set the file path as value for reviewPhotos
        setReviewPhotos([...reviewPhotos, { image: response.file_url }]);

        // Continue with any other logic you need
      } catch (error) {
        console.error('Upload Error:', error);
      }
    }
  };
  console.log(reviewPhotos, selectedFiles, 'rating1');
  const handleDeleteFile = (index: number) => {
    // Clear the selected file and upload response at the specified index
    const updatedSelectedFiles = [...selectedFiles];
    const updatedUploadResponses = [...uploadResponses];
    const updatedReviewPhotos = [...reviewPhotos];

    updatedSelectedFiles.splice(index, 1);
    updatedUploadResponses.splice(index, 1);
    updatedReviewPhotos.splice(index, 1);

    setSelectedFiles(updatedSelectedFiles);
    setUploadResponses(updatedUploadResponses);
    setReviewPhotos(updatedReviewPhotos);
  };

  const initialValues = {
    name: '',
    email: '',
    item_code: product_item_code,
    images: reviewPhotos, // Updated to use the reviewPhotos array
    comment: '',
    rating: ratingValues,
  };

  const TokenFromStore: any = useSelector(get_access_token);
  const dispatch = useDispatch();
  console.log('cart token', TokenFromStore);
  const handleFormSubmit = async (
    values: any,
    resetForm: any,
    setFieldValue: any
  ) => {
    // Manually set the reviewPhotos array in the values object
    let data1 = { ...values, rating: ratingValues, images: reviewPhotos };

    let response = await PostProductReviewAPI(data1, TokenFromStore.token);
    console.log('rating1 post', response);
    if (response?.msg === 'success') {
      dispatch(fetchProductReview(product_item_code) as any);
    }
    values.images = reviewPhotos;

    setValue('');
    setReviewPhotos([]);
    resetForm();
    console.log('rating1 and images va', values);
    // console.log('rating1 and images rating', values.rating);
    console.log({ ...values, rating: ratingValues }, 'rating1');
    // Continue with your form submission logic
  };

  return (
    <div className="p-3 border review-form">
      <Formik
        initialValues={initialValues}
        // validationSchema={ReviewFormValidation}
        onSubmit={(values, { resetForm, setFieldValue }) => {
          handleFormSubmit(values, resetForm, setFieldValue);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="d-grid my-3">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="d-grid my-3">
              <label htmlFor="email">Email</label>
              <Field type="text" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="star-rating">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Rating
                  name="rating"
                  value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.55 }}
                      sx={{ fontSize: '24px' }}
                    />
                  }
                  sx={{ fontSize: '24px' }}
                />
              </Box>
            </div>

            <div className="d-grid my-3">
              <label htmlFor="images">Images</label>
              <div className="col-md-12">
                {reviewPhotos.map((photo, index) => (
                  <div key={index}>
                    <span>
                      <img
                        src={`${CONSTANTS.API_BASE_URL}${photo.image}`}
                        alt={`Uploaded File ${index}`}
                        style={{ width: '120px' }}
                      />
                    </span>
                    <span
                      className="delete-file"
                      onClick={() => handleDeleteFile(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      X
                    </span>
                  </div>
                ))}
                {/* Display the file upload input */}
                <div className="file file--upload">
                  <label
                    htmlFor="input-file"
                    className="upload-label label-color"
                  >
                    <div className="upload-circle">
                      {/* <i className="fas fa-upload "></i> */}
                    </div>
                  </label>
                  <input
                    id="input-file"
                    type="file"
                    onChange={(e) => handleFileSelect(e)}
                  />
                </div>
              </div>
              <ErrorMessage name="images" component="div" className="error" />
            </div>
            <div className="d-grid my-3">
              <label htmlFor="comment">Description</label>
              <Field as="textarea" name="comment" />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>

            <button className="btn " type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReviewForm;
