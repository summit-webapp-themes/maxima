import React, { useEffect, useState } from 'react';
import { CONSTANTS } from '../../services/config/app-config';
import ReactPaginate from 'react-paginate';

const ReviewList = ({ reviews }: any) => {
  console.log('@REVIEW ', reviews);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);

  const itemsPerPage = 7;
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(reviews.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(reviews.length / itemsPerPage));
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  }, [itemOffset, itemsPerPage, reviews]);
  console.log('@Loading items data', currentItems);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % reviews.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="container review-list">
      {reviews.length > 0 && (
        <>
          {currentItems.map((e: any, index: number) => {
            return (
              <div className="row listing-card py-4">
                <div className="col-lg-3 pl-5">
                  <p className=" my-1">{e.date}</p>
                  <p>{e.name}</p>
                  <div>
                    <p>
                      Verified
                      <span className="ml-2">
                        {e.verified && (
                          <i
                            className="fa fa-check-circle"
                            aria-hidden="true"
                          ></i>
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="star-rating">
                    {[...Array(5)].map((star: any, index: number) => {
                      index += 1;
                      return (
                        <button
                          name="star"
                          type="button"
                          key={index}
                          className={index <= e.star ? 'on p-0' : 'off p-0'}
                        >
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="col-lg-9 border-start">
                  <p>{e.description}</p>
                  <div className="rating-image d-flex flex-wrap">
                    {e.images.length > 0 && (
                      <>
                        {e.images.map((element: any, ind: number) => {
                          return (
                            <div className="image-cont">
                              <img
                                src={`http://localhost:3000${element}`}
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
      )}

      <div className='col-lg-12'>
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
    </div>
  );
};

export default ReviewList;
