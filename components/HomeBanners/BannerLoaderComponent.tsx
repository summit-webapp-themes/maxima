import React from "react";

const BannerLoaderComponent = () => {
  return (
    <>
      <div>
        <a className="card mb-5" id="card-link" target="_blank">
          <div className="banner_card__body">
            <div className="banner_card__body body__text" id="card-details">
              <div className="skeleton banner_skeleton-text banner_skeleton-text__body"></div>
            </div>
            <div className="banner_card__body body__img">
              <img className="skeleton" alt="" id="cover-img" />
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default BannerLoaderComponent;
