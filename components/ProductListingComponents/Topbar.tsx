import { useState } from "react";
import { CONSTANTS } from "../../services/config/app-config";

const Topbar = (props: any) => {
  const { listItems, handleToggleProductsListingView, selectedMultiLangData } =
    props;

  const [showMissingPartsModal, setShowMissingPartsModal] =
    useState<any>(false);

  const handleMissingPartsModalClose: any = () => {
    setShowMissingPartsModal(false);
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <div className="total_result">
            <p className="mb-0">
              {listItems?.length} {selectedMultiLangData?.products}
            </p>
          </div>
        </div>
        <div className="col-lg-9 text-end">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <div className="row">
                {CONSTANTS.ENABLE_TOGGLE_PRODUCT_LISTING_VIEW ? (
                  <>
                    <div className="row">
                      <div className="col-lg-6 col-8">
                        {/* Price :-{" "}
                        <select
                          className={`${styles.form_select}`}
                          aria-label="Default select example"
                        >
                          <option value="low_to_high" selected>
                            Low to High
                          </option>
                          <option value="high_to_low">High to Low</option>
                        </select>
                       */}
                      </div>
                      <div className="col-lg-6 col-4">
                        <div className="ms-3">
                          <i
                            className="fa fa-list fa-lg cursor_pointer"
                            aria-hidden="true"
                            onClick={() =>
                              handleToggleProductsListingView("list-view")
                            }
                          ></i>
                          <i
                            className="fa fa-th fa-lg ms-3 cursor_pointer"
                            aria-hidden="true"
                            onClick={() =>
                              handleToggleProductsListingView("grid-view")
                            }
                          ></i>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-lg-6"></div>
                    <div className="col-lg-6 ">
                      <div>
                        {selectedMultiLangData?.price} :-{" "}
                        <select
                          className="form_select"
                          aria-label="Default select example"
                        >
                          <option value="low_to_high" selected>
                            {selectedMultiLangData?.low_to_high}
                          </option>
                          <option value="high_to_low">
                            {selectedMultiLangData?.high_to_low}
                          </option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
