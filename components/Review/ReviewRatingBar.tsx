import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const ReviewRatingBar = ({ reviews }: any) => {
  const starCounts: any = {}; // Object to store the count of each star rating
  const totalReviews = reviews.length;

  // Count the number of each star rating
  for (const product of reviews) {
    const star = product.star;
    if (starCounts[star]) {
      starCounts[star]++;
    } else {
      starCounts[star] = 1;
    }
  }

  // Calculate the star ratio and create the result array
  const reviewData: any = [];
  for (let star = 5; star >= 1; star--) {
    const count = starCounts[star] || 0;
    const ratio = Math.floor((count / totalReviews) * 100);
    reviewData.push({ star: star.toString(), total: count.toString(), ratio });
  }
  // console.log(reviewData);

  return (
    <div className="container my-3">
      {reviewData.length > 0 && (
        <>
          {reviewData.map((e: any, ind: number) => {
            return (
              <div key={ind} className="row my-2 py-2">
                <div className="col-6 ">
                  <p className="fw-semibold m-0">{e.star} Star</p>
                </div>
                <div className="col-6 text-end">
                  <p>{e.total}</p>
                </div>
                <div>
                  <ProgressBar variant="danger" now={e.ratio} />
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ReviewRatingBar;
