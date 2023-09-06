import Link from "next/link";
import React, { useState } from "react";

const MobNavbar = ({
  navbarData,
  navMenuclick,
  setClicks,
  clicks,
  searchValue,
  setSearchValue,
  handleSearch,
  isLoading,
  selectedMultiLangData,
  selectedCurrencyValue,
}: any) => {
  const [arrowIndex, setarrowIndex] = useState<any>(null);
  const [indexVal, setindexVal] = useState<any>(null);

  const onClickCloseNav = () => {
    console.log("click close");
    setClicks(!clicks);
  };

  const mobileHandle = (i: any) => {
    if (indexVal === i) {
      return setindexVal(null);
    }
    setindexVal(i);
    return false;
  };

  const arrowHandle = (index: any) => {
    if (arrowIndex === index) {
      return setarrowIndex(null);
    }
    setarrowIndex(index);
    return false;
  };
  return (
    <>
      <div className="mobile-menu-wrapper" >
        <div className="mobile-menu-overlay"></div>
        <div className="mobile-menu-container scrollable bg-light">
          <div className="d-flex justify-content-end mb-1 ">
            <Link href="#" legacyBehavior>
              <a className="#" onClick={navMenuclick}>
                <i className="btn-close btn_close_btn"></i>
              </a>
            </Link>
          </div>
          <div className="header-search hs-expanded hs-round input-wrapper">
            <input
              type="text"
              className="form-control border"
              name="search"
              id="search"
              placeholder={selectedMultiLangData?.search_in}
              value={searchValue}
              onChange={(e: any) => setSearchValue(e.target.value)}
              required
            />
            <button
              className="btn btn-search text-primary border"
              type="submit"
              onClick={handleSearch}
            >
              <i className="w-icon-search"></i>
            </button>
          </div>
          <div className="tab-content">
            <div className="tab-pane active bg-light" id="categories">
              {navbarData?.length > 0 &&
                navbarData.map((navbardata: any, i: any) => (
                  <ul className="mobile-menu" key={i}>
                    <li className="bg-light">
                      <a
                        href="#"
                        className="text-dark d-flex justify-content-between"
                      >
                        <span>
                          <i className="fa fa-anchor " aria-hidden="true"></i>
                          {navbardata.name}
                        </span>
                        {/* <span
                          className="toggle-btn"
                          onClick={() => mobileHandle(i)}
                        ></span> */}
                        <span>
                          <i
                            className="fa fa-arrow-right fs-2"
                            onClick={() => mobileHandle(i)}
                          ></i>
                        </span>
                      </a>
                      <ul
                        style={{ display: indexVal === i ? "block" : "none" }}
                      >
                        {navbardata?.values?.map(
                          (navbarVal: any, index: any) => (
                            <li key={index}>
                              <Link
                                href={`${navbarVal.url}?page=1&currency=${selectedCurrencyValue}`}
                                legacyBehavior
                              >
                                <a className="text-dark d-flex justify-content-around">
                                  <span className="w-75">{navbarVal.name}</span>
                                  <span className="">
                                    <i
                                      className="fa fa-arrow-right fs-5"
                                      onClick={() => arrowHandle(index)}
                                    ></i>
                                  </span>
                                  {/* <span
                                    className="toggle-btn "
                                    onClick={() => arrowHandle(index)}
                                  ></span> */}
                                </a>
                              </Link>
                              <ul
                                style={{
                                  display:
                                    arrowIndex === index ? "block" : "none",
                                }}
                              >
                                {navbarVal?.values?.map(
                                  (navbarlist: any, i: any) => (
                                    <li key={i}>
                                      <Link
                                        href={`${navbarlist.url}?page=1&currency=${selectedCurrencyValue}`}
                                        legacyBehavior
                                      >
                                        <a
                                          className="text-dark"
                                          onClick={onClickCloseNav}
                                        >
                                          {navbarlist?.name}
                                        </a>
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                  </ul>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobNavbar;
