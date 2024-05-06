import React, { useEffect, useState } from 'react';
import ReviewRatingBar from './ReviewRatingBar';
import ReviewForm from './ReviewForm';
// import { reviewProducts } from '../../components/dataSets/reviewProduct';
import ReviewList from './ReviewList';
import useProductReview from '../../hooks/ProductDetailHook/ProductReviewHook/product-review-hook';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { SelectedFilterLangDataFromStore } from '../../store/slices/general_slices/selected-multilanguage-slice';

const ReviewsMaster = ({ reviewData }: any) => {
  const [writeReview, setWritereview] = useState<boolean>(false);

  console.log('product review', reviewData);
  // const starCounts: any = { 0:0,0.1: 0, 0.2: 0, 0.3: 0, 0.4: 0, 0.5: 0, 0.6: 0, 0.7: 0, 0.8: 0, 0.9: 0, 1: 0 };
  // reviewData.forEach((product:any) => starCounts[product.rating]++);
  // const average5Star = (starCounts[1] / reviewData.length) * 5;
  // console.log('Average from 5-Star Ratings:', average5Star,starCounts);
  let isLoggedIn: any;
  if (typeof window !== 'undefined') {
    isLoggedIn = localStorage.getItem('isLoggedIn');
  }
  const router = useRouter();
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
  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();

useEffect(() => {
  if (
    Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
  ) {
    setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
  }
}, [SelectedLangDataFromStore]);
  return (
    <div className="container">
      <div className="row ">
        <div className="col-lg-12">
          <h2 className="fs-1">{selectedMultiLangData?.customer_reviews}</h2>
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
              <div className="ml-2">({reviewData.length} {selectedMultiLangData?.reviews})</div>
            )}
          </div>
        </div>
        <div className="col-lg-6  text-sm-end ">
        {
          isLoggedIn === 'true' ? 
          <button
            className="btn btn-sm"
            onClick={() => setWritereview(!writeReview)}
          >
            {selectedMultiLangData?.write_a_review}
          </button>: <button
            className="btn btn-sm"
            onClick={() => router.push('/login')}
          >
            {selectedMultiLangData?.write_a_review}
          </button>
        }
        </div>
        {reviewData.length > 0 && <ReviewRatingBar reviewData={reviewData}  selectedMultiLangData={selectedMultiLangData}/>}
        <div className="col-lg-12">
          <h2 className="fs-1 ">{selectedMultiLangData?.reviews} ({reviewData.length})</h2>
        </div>
        {writeReview && (
          <div>
            <ReviewForm />
          </div>
        )}
        <div className="p-0">
          <ReviewList reviews={reviewData} selectedMultiLangData={selectedMultiLangData} />
        </div>
      </div>
    </div>
  );
};

export default ReviewsMaster;
