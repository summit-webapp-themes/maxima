import React from "react";
import UseBreadCrumbsHook from "../../../hooks/GeneralHooks/breadcrumbs-hook";
import Link from "next/link";

const BreadCrumbs = () => {
  const { breadCrumbData } = UseBreadCrumbsHook();
  console.log("breadCrumbData", breadCrumbData);

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
    <section className="breadcrumb_section mb-3 mt-3">
      <div className="container p-0">
        <div className="row">
          <div className="col-12">
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
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        <Link href={`${item?.link}?page=1`} legacyBehavior>
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
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbs;
