import React from "react";

const StarRating = (props: any) => {
  const { rating } = props;
  const fullStars = (rating * 10) / 2;
  const emptyStars = 5 - fullStars;
  //   console.log("star rating val", fullStars);
  const renderStar = (type: string) => {
    console.log("star rating", rating);
    if (type === "full") {
      return <i className="fa fa-star fa-lg" aria-hidden="true" style={{color:"#0071dc"}}></i>;
    } else if (type === "half") {
      return <i className="fa fa-star-half-o fa-lg" aria-hidden="true" style={{color:"#0071dc"}}></i>;
    } else {
      return <i className="fa fa-star-o fa-lg" aria-hidden="true" style={{color:"#0071dc"}}></i>;
    }
  };

  return (
    <div className="star-rating">
      {rating !== null && (
        <>
          {fullStars % 1 === 0 ? (
            // BELOW CODE WILL RENDER WILL THE STAR VALUE IS A WHOLE NUMBER
            <>
              {[...Array(fullStars)].map((e: any, i: any) => (
                <span key={i} className="me-2">
                  {renderStar("full")}
                </span>
              ))}
              {[...Array(emptyStars)].map((e: any, i: any) => (
                <span key={i} className="me-2">
                  {renderStar("empty")}
                </span>
              ))}
            </>
          ) : (
            // BELOW CODE WILL RENDER WILL THE STAR VALUE IS A FRACTION NUMBER
            <>
              {[...Array(Math.floor(fullStars))].map((e: any, i: any) => (
                <span key={i} className="me-2 ">
                  {renderStar("full")}
                </span>
              ))}
              {<span className="me-2 ">{renderStar("half")}</span>}
              {[...Array(Math.floor(emptyStars))].map((e: any, i: any) => (
                <span key={i} className="me-2 ">
                  {renderStar("empty")}
                </span>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StarRating;
