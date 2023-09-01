import React,{useState} from "react";
import UseBreadCrumbsHook from "../../../hooks/GeneralHooks/breadcrumbs-hook";
import Link from "next/link";
// import { CONSTANTS } from "../../services/config/app-config";
import {CONSTANTS} from "../../../services/config/app-config"

const BreadCrumbs = ( props: any) => {
  const { breadCrumbData } = UseBreadCrumbsHook();
  console.log("breadCrumbData", breadCrumbData);
  const { listItems, handleToggleProductsListingView, selectedMultiLangData } =
  props;

  const [showMissingPartsModal, setShowMissingPartsModal] =
  useState<any>(false);

const handleMissingPartsModalClose: any = () => {
  setShowMissingPartsModal(false);
};



  let sub_sub_cat: String;
  console.log("Data from breadcrumbs - ", breadCrumbData);
  breadCrumbData?.length > 0 &&
    breadCrumbData?.map((item: any, index: number) => {
      if (item?.name === null) {
        sub_sub_cat = item?.link?.split("/")[4];
        console.log("sub sub cat ", sub_sub_cat);
        if (sub_sub_cat === undefined) {
          sub_sub_cat = item?.link?.split("/")[3];
        }
        console.log("Breadcrumb index If item - ", sub_sub_cat);
      }
      console.log(sub_sub_cat);
    });
  return (
    <section className="breadcrumb_section pt-2 " >
      <div className="container pt-0">
        <div className="row">
          <div className="col-lg-9">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/" legacyBehavior>
                    <a href="">
                      <i
                        className="fa fa-home bredcrumb_home_icon"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </Link>
                </li>
                {breadCrumbData?.length > 0 &&
                  breadCrumbData?.map((item: any, index: number) => (
                    <>
                      <li
                        key={index}
                        className="breadcrumb-item active text-color-black"
                        aria-current="page"
                      >
                        <Link href={`${item?.link}?page=1`} legacyBehavior className="text-color-black">
                          {item?.name === null && sub_sub_cat !== "undefined"
                            ? "value is null"
                            : item?.name}
                        </Link>
                      </li>
                    </>
                  ))}
              </ol>
            </nav>
            </div>
            
            <div className="col-lg-3 pe-0">
              <div className="row">
                {CONSTANTS.ENABLE_TOGGLE_PRODUCT_LISTING_VIEW ? (
                  <>
                  
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
                      <div className="col-lg-6 col-4 d-flex justify-content-end">
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
    </section>
  );
};

export default BreadCrumbs;
