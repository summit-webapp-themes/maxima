import React from "react";

const MobileFilter = ({
  filtersData,
  selectedFilters,
  handleApplyFilters,
  selectedMultiLangData,
}: any) => {
  return (
    <div className="container-fluid d-block d-lg-none">
      <div className="row sticky_btn_bar">
        <a
          data-bs-toggle="modal"
          data-bs-target="#myFilterModal"
          className="text-uppercase sticky_btn"
        >
          <i className="fa fa-filter me-1" aria-hidden="true"></i>
          {selectedMultiLangData?.filter}
        </a>
      </div>

      <div className="modal" id="myFilterModal">
        <div className="modal-dialog filter-modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{selectedMultiLangData?.filter}</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              {/* <div className="clear_filter mb-1">
                <a href="#" className="clear_filter_link">
                  {selectedMultiLangData?.clear_filter}
                </a>
              </div> */}
              <div className="filter_section">
                <div className="filter_block">
                  <div className="accordion accordion_custom" id="myAccordion">
                    {filtersData && filtersData.length > 0
                      ? filtersData?.map((item: any, index: any) => {
                          return (
                            <div
                              className="accordion-item accordion_item_custom"
                              key={index}
                            >
                              <h2
                                className="accordion-header bold"
                                id={"heading" + index}
                              >
                                <button
                                  type="button"
                                  className="text-uppercase accordion-button bold accordion_btn_custom"
                                  data-bs-toggle="collapse"
                                  data-bs-target={"#collapse" + index}
                                  aria-expanded={index === 0 ? "true" : "false"}
                                  aria-controls={"collapse" + index}
                                >
                                  {item?.section}
                                </button>
                              </h2>

                              <div
                                id={"collapse" + index}
                                className={
                                  index === 0
                                    ? "accordion-collapse collapse custom_collapse_css show "
                                    : "accordion-collapse custom_collapse_css collapsed"
                                }
                                aria-labelledby={"heading" + index}
                              >
                                <div className="card-body p-0">
                                  {item.values.map((vals: any, index: any) => (
                                    <div
                                      className="form_check_filter"
                                      key={index}
                                    >
                                      <input
                                        className="form_check_input"
                                        type="checkbox"
                                        name={item.section}
                                        value={vals}
                                        id="flexCheckDefault"
                                        checked={selectedFilters.some(
                                          (selectedFilter: any) =>
                                            selectedFilter.name ===
                                              item.section &&
                                            selectedFilter.value.includes(vals)
                                        )}
                                        onChange={(e) =>
                                          handleApplyFilters(
                                            e,
                                            item.section,
                                            vals
                                          )
                                        }
                                      />
                                      <label
                                        className="form-check-label filter-label accordion-checkbox"
                                        htmlFor="flexCheckDefault"
                                      >
                                        {vals}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <hr className="hr_line" />
                            </div>
                          );
                        })
                      : ""}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer justify-content-center">
              <button
                type="submit"
                className="btn button_color text-center"
                data-bs-dismiss="modal"
              >
                {selectedMultiLangData?.submit}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="modal" id="mySortByModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Sort By Price</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div> */}

      {/* <div className="modal-body sort-by">
              <div className="p-0 text-right d-flex align-items-center justify-content-end">
                <p>Price:</p>
                <select
                  className="form-select border-0"
                  aria-label="Default select example"
                  onChange={(e: any) => handlePrice(e)}
                >
                  <option value="low_to_high" selected>
                    Low to High
                  </option>
                  <option value="high_to_low">High to Low</option>
                </select>
              </div>
            </div> */}
      {/* </div>
        </div>
      </div> */}
    </div>
  );
};

export default MobileFilter;
