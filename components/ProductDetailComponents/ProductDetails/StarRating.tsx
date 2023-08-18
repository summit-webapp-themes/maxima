import React from "react";

const StarRating = (props: any) => {
  const { rating }: any = props;
  const fullStars: any = (rating * 10) / 2;
  const emptyStars: any = 5 - fullStars;

  const renderStar: any = (type: string) => {
    console.log("star rating", rating);
    if (type === "full") {
      return (
        <i
          className="fa fa-star fa-lg"
          aria-hidden="true"
          style={{ color: "#666" }}
        ></i>
      );
    } else if (type === "half") {
      return (
        <i
          className="fa fa-star-half-o fa-lg"
          aria-hidden="true"
          style={{ color: "#666" }}
        ></i>
      );
    } else {
      return (
        <i
          className="fa fa-star-o fa-lg"
          aria-hidden="true"
          style={{ color: "#666" }}
        ></i>
      );
    }
  };

  return (
    <div className="star-rating">
      {rating !== null && (
        <>
          {fullStars % 1 === 0 ? (
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
