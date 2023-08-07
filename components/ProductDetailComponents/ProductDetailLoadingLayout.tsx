import React from "react";
import CardsLoadingLayout from "../../cards/CardsLoadingLayout";
const ProductDetailLoadingLayout = () => {
  return (
    <>
      <div>
        <a className="card my-2" id="card-link" target="_blank">
          <div className="detail_card__body">
            <div
              className="row  mx-auto my-1 detail_card__body body__text"
              id="card-details"
            >
              <div className="col-lg-5 col-md-5 col-sm-10 my-lg-4 skeleton listing_skeleton-text listing_skeleton-text__body"></div>
              <div className="col-lg-6 col-md-6 col-sm-10 ">
                <div className="skeleton skeleton_filter-text w-50 mx-4 my-4"></div>
                <div className="skeleton skeleton_filter-text w-50 mx-4 my-4"></div>
                <div className="d-flex justify-content-between">
                  <div className="skeleton skeleton_filter-text w-75 mx-4 my-2"></div>
                  <div className="skeleton skeleton_filter-text mx-5 my-2 layout_height"></div>
                </div>
                <div className="skeleton skeleton_filter-text w-50 mx-4 my-4"></div>
                <div className="skeleton skeleton_filter-text w-50 mx-4 my-4"></div>
                <div className="d-flex justify-content-between">
                  <div className="skeleton skeleton_filter-text w-75 mx-4 my-2"></div>
                  <div className="skeleton skeleton_filter-text mx-5 my-2 layout_height"></div>
                </div>
                <div className="skeleton skeleton_filter-text w-50 mx-4 my-4"></div>
                <div className="skeleton skeleton_filter-text w-50 mx-4 my-4"></div>
                <div className="d-flex justify-content-between">
                  <div className="skeleton skeleton_filter-text w-75 mx-4 my-2"></div>
                  <div className="skeleton skeleton_filter-text mx-5 my-2 layout_height"></div>
                </div>
                <div className="skeleton skeleton_filter-text w-50 mx-4 my-4"></div>
                <div className="skeleton skeleton_filter-text w-50 mx-4 my-4"></div>
                <div className="d-flex justify-content-between">
                  <div className="skeleton skeleton_filter-text w-75 mx-4 my-2"></div>
                  <div className="skeleton skeleton_filter-text mx-5 my-2 layout_height"></div>
                </div>
                <div className="skeleton skeleton_filter-text w-50 mx-4 my-4"></div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};
export default ProductDetailLoadingLayout;
