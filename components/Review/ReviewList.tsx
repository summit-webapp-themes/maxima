import React, { useEffect, useState } from 'react';
import { CONSTANTS } from '../../services/config/app-config';
import ReactPaginate from 'react-paginate';
import useProductReview from '../../hooks/ProductDetailHook/ProductReviewHook/product-review-hook';
import StarRating from './StarRating';

const ReviewList = ({ reviews }: any) => {
  console.log('product review in props', reviews);
  const { reviewData, loading } = useProductReview();
  console.log('product review', reviewData);

  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);

  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(reviews.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(reviews.length / itemsPerPage));
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  }, [itemOffset, itemsPerPage, reviews]);
  console.log('@Loading items data', currentItems);

  // // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % reviews.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="container review-list">
      {reviews && reviews.length > 0 ? (
        <>
          {currentItems.map((e: any, index: number) => {
            return (
              <div className="row listing-card py-4">
                <div className="col-lg-3 px-5">
                  <p className=" my-1">{e.date}</p>
                  <p className="fs-2 my-3 ">{e.name}</p>
                  <div>
                    <p className="m-0">
                      Verified
                      <span className="ml-2">
                        {e.verified === 1 && (
                          <i
                            className="fa fa-check-circle"
                            aria-hidden="true"
                          ></i>
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="star-rating">
                    <div>
                      <StarRating rating={e?.rating} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 px-5 border-start">
                  <p>{e.comment}</p>
                  <div className="rating-image d-flex flex-wrap">
                    {e.images.length > 0 && (
                      <>
                        {e.images.map((element: any, ind: number) => {
                          return (
                            <div className="image-cont">
                              <img
                                src={`${CONSTANTS.API_BASE_URL}${element?.image}`}
                                alt={e.name}
                                className="w-100 h-100 "
                              />
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <p>Be the first to add Review</p>
        </>
      )}

      {
        reviews && reviews.length > 0 && (

          <div className="col-lg-12">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel="previous"
              containerClassName={'paginationBttns'}
              previousLinkClassName={'previousBttn'}
              activeClassName={'paginationActive'}
            />
          </div>
        )
      }
    </div>
  );
};

export default ReviewList;
