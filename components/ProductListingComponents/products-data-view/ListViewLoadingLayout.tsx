import React from 'react'

const ListViewLoadingLayout = () => {
  return (
    <>
    <div>
        <a className="card my-2" id="card-link" target="_blank">
          <div className="listing_card__body ">
            <div className="row  mx-auto my-1 listing_card__body body__text" id="card-details">
              <div className="col-lg-3 col-md-3 col-sm-10 my-lg-4 skeleton listing_skeleton-text listing_skeleton-text__body"></div>
              <div className="col-lg-8 col-md-8 col-sm-10 skeleton listing_skeleton-text listing_skeleton-text__body my-auto"></div>
            </div>
          
          </div>
        </a>
      </div>
    </>
  )
}

export default ListViewLoadingLayout