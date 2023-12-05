import React, { useState } from 'react';
import ReviewRatingBar from './ReviewRatingBar';
import ReviewForm from './ReviewForm';
// import { reviewProducts } from '../../components/dataSets/reviewProduct';
import ReviewList from './ReviewList';
import useProductReview from '../../hooks/ProductDetailHook/ProductReviewHook/product-review-hook';

const ReviewsMaster = ({ reviewData }: any) => {
  const [writeReview, setWritereview] = useState<boolean>(false);

  console.log('product review', reviewData);
  // const starCounts: any = { 0:0,0.1: 0, 0.2: 0, 0.3: 0, 0.4: 0, 0.5: 0, 0.6: 0, 0.7: 0, 0.8: 0, 0.9: 0, 1: 0 };
  // reviewData.forEach((product:any) => starCounts[product.rating]++);
  // const average5Star = (starCounts[1] / reviewData.length) * 5;
  // console.log('Average from 5-Star Ratings:', average5Star,starCounts);

  const starCounts: any = {
    0: 0,
    0.1: 0,
    0.2: 0,
    0.3: 0,
    0.4: 0,
    0.5: 0,
    0.6: 0,
    0.7: 0,
    0.8: 0,
    0.9: 0,
    1: 0,
  };
  let totalStars: any = 0;
  let totalReviews = 0;

  console.log(reviewData);
  if (reviewData !== null) {
    reviewData.forEach((product: any) => {
      if (starCounts.hasOwnProperty(product.rating)) {
        starCounts[product.rating]++;
        totalStars += product.rating;
        totalReviews++;
      }
    });
  }

  const average5Star = (totalStars / totalReviews) * 5;
  console.log('Average from 5-Star Ratings:', average5Star);
  return (
    <div className="container">
      <div className="row ">
        <div className="col-lg-12">
          <h2 className="fs-1">CUSTOMER REVIEWS</h2>
        </div>
        <div className="col-lg-6">
          <div className="star-rating d-flex align-items-center">
            {[...Array(5)].map((star, index) => {
              index += 1;
              const isHalfStar =
                average5Star >= index - 0.5 && average5Star < index;
              return (
                <button
                  name="star"
                  key={index}
                  className={`star-button ${isHalfStar ? 'half-star' : ''} ${
                    average5Star >= index ? 'on' : 'off'
                  } p-0`}
                >
                  <span className={`star ${isHalfStar ? 'half-star' : ''}`}>
                    &#9733;
                  </span>
                </button>
              );
            })}
            {reviewData !== null && (
              <div className="ml-2">({reviewData.length} Reviews)</div>
            )}
          </div>
        </div>
        <div className="col-lg-6  text-sm-end ">
          <button
            className="btn btn-sm"
            onClick={() => setWritereview(!writeReview)}
          >
            Write a Review
          </button>
        </div>
        {reviewData.length > 0 && <ReviewRatingBar reviewData={reviewData} />}
        <div className="col-lg-12">
          <h2 className="fs-1 ">Reviews ({reviewData.length})</h2>
        </div>
        {writeReview && (
          <div>
            <ReviewForm />
          </div>
        )}
        <div className="p-0">
          <ReviewList reviews={reviewData} />
        </div>
      </div>
    </div>
  );
};

export default ReviewsMaster;
