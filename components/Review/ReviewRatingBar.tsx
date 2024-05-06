import { ProgressBar } from 'react-bootstrap';

const ReviewRatingBar = ({ reviewData , selectedMultiLangData }: any) => {
  const starCounts: any = {}; // Object to store the count of each star rating
  console.log(reviewData, 'ratinnng');
  console.log(starCounts, 'ratinnng');

  const reviewDataa: any = [];

  if (reviewData.length > 0) {
    for (const product of reviewData) {
      const star = product.rating.toFixed(1);
      if (starCounts[product.rating]) {
        starCounts[star]++;
      } else {
        starCounts[star] = 1;
      }
    }
    console.log(starCounts, 'ratinnng');

    for (let star = 1; star >= 0.1; star -= 0.1) {
      const starKey = star.toFixed(1);
      const count = starCounts[starKey] || 0;
      const ratio = Math.floor((count / reviewData.length) * 100);
      reviewDataa.push({
        star: parseFloat(starKey),
        total: count.toString(),
        ratio,
      });
    }
  }
  let ratioSum: any = [
    { star: 1, total: 0, ratio: 0 },
    { star: 2, total: 0, ratio: 0 },
    { star: 3, total: 0, ratio: 0 },
    { star: 4, total: 0, ratio: 0 },
    { star: 5, total: 0, ratio: 0 },
  ];

  reviewDataa.forEach((entry: any) => {
    if (entry.star === 0.1 || entry.star === 0.2) {
      ratioSum[0].ratio += entry.ratio;
      ratioSum[0].total += parseInt(entry.total);
    } else if (entry.star === 0.3 || entry.star === 0.4) {
      ratioSum[1].ratio += entry.ratio;
      ratioSum[1].total += parseInt(entry.total);
    } else if (entry.star === 0.5 || entry.star === 0.6) {
      ratioSum[2].ratio += entry.ratio;
      ratioSum[2].total += parseInt(entry.total);
    } else if (entry.star === 0.7 || entry.star === 0.8) {
      ratioSum[3].ratio += entry.ratio;
      ratioSum[3].total += parseInt(entry.total);
    } else if (entry.star === 0.9 || entry.star === 1) {
      ratioSum[4].ratio += entry.ratio;
      ratioSum[4].total += parseInt(entry.total);
    }
  });

  // console.log(ratioSum, 'ratinnng');
  // console.log(reviewDataa, 'ratinnng');

  return (
    <div className="container my-3 ">
      {reviewDataa.length > 0 && (
        <>
          {ratioSum.map((e: any, ind: number) => {
            return (
              <div key={ind} className="row my-2 py-2">
                <div className="col-6 ">
                  <p className="fw-semibold m-0">{e.star} {selectedMultiLangData?.star}</p>
                </div>
                <div className="col-6 text-end">
                  <p>{e.total}</p>
                </div>
                <div>
                  <ProgressBar
                    className="my-progress"
                    variant="primary"
                    now={e.ratio}
                  />
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
