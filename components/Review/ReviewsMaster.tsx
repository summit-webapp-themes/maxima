import React, { useState } from 'react';
import ReviewRatingBar from './ReviewRatingBar';
import ReviewForm from './ReviewForm';
import { reviewProducts } from '../../components/dataSets/reviewProduct';
import ReviewList from './ReviewList';

const ReviewsMaster = () => {
  const [writeReview, setWritereview] = useState<boolean>(false);

  const star5Count: number = reviewProducts.filter(
    (product) => product.star === '5'
  ).length;

  return (
    <div className="container">
      <div className="row ">
        <div className="col-lg-12">
          <h2 className="fs-1">CUSTOMER REVIEWS</h2>
        </div>
        <div className="col-lg-6">
          <div className="star-rating d-flex align-items-center">
            {[...Array(5)].map((star: any, index: number) => {
              index += 1;
              return (
                <button
                  name="star"
                  key={index}
                  className={index <= star5Count ? 'on p-0' : 'off p-0'}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
            <div className="ml-2">({reviewProducts.length} Reviews)</div>
          </div>
        </div>
        <div className="col-lg-6 text-end ">
          <button
            className="btn btn-sm"
            onClick={() => setWritereview(!writeReview)}
          >
            Write a Review
          </button>
        </div>
        <ReviewRatingBar reviews={reviewProducts} />
        <div className="col-lg-12">
          <h2 className="fs-1 ">Reviews ({reviewProducts.length})</h2>
        </div>
        {writeReview && (
          <div>
            <ReviewForm />
          </div>
        )}
        <div>
          <ReviewList reviews={reviewProducts} />
        </div>
      </div>
    </div>
  );
};

export default ReviewsMaster;
