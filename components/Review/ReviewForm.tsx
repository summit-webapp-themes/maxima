import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import ReviewFormValidation from '../../validation/ReviewFormValidation';

const ReviewForm = ({ reviews }: any) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const initialValues = {
    name: '',
    email: '',
    images: [],
    description: '',
    date: Date(),
  };
  console.log(rating, '@rating');

  const handleFormSubmit = (values: any) => {
    console.log({ ...values, star: rating });
  };
  return (
    <div className="p-3 border review-form">
      <Formik
        initialValues={initialValues}
        validationSchema={ReviewFormValidation}
        onSubmit={(values) => {
          handleFormSubmit(values);
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
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    name="star"
                    type="button"
                    key={index}
                    onClick={() => setRating(index)}
                    className={
                      index <= (hover || rating) ? 'on p-0' : 'off p-0'
                    }
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>

            <div className="d-grid my-3">
              <label htmlFor="images">Images</label>
              <input
                type="file"
                name="images"
                multiple
                onChange={(event: any) => {
                  setFieldValue('images', [...event.currentTarget.files]);
                }}
              />
              {values.images.length > 0 && (
                <div>
                  <div className="d-flex flex-wrap mt-2">
                    {values.images.map((image: any, index: number) => (
                      <div key={index} className="mr-2">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image Preview ${index}`}
                          style={{ width: '100px' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <ErrorMessage name="images" component="div" className="error" />
            </div>

            <div className="d-grid my-3">
              <label htmlFor="description">Description</label>
              <Field as="textarea" name="description" />
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
