import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import getSubscriber from "../../services/api/general_apis/newsletter-subscription-api";
import { useDispatch } from "react-redux";
import {
  hideToast,
  successmsg,
} from "../../store/slices/general_slices/toast_notification_slice";
// import {navbarData} from "../../datasets/Digitalshelf_dataset/navbar"
const TernaryThemeFooter = () => {
  // const { navbarData } = useNavbar();
  const dispatch = useDispatch();
  const navbarData: any = [];
  const [subScription, setSubscriptions] = useState();
  const handleSubscription = async (event: any) => {
    event?.preventDefault();
    console.log(subScription, "subScription");
    let subScriptionRes = await getSubscriber(subScription);
    console.log("subScriptionRes", subScriptionRes);
    if (subScriptionRes?.data?.message?.msg === "success") {
      dispatch(successmsg("subscribed successfully"));

      setTimeout(() => {
        dispatch(hideToast());
      }, 1200);
    }
  };
  console.log("nav footer", navbarData);
  return (
    <>
      {/* <h1 className='mb-5'>Footer page</h1> */}
      <footer className="footer footer-dark footer-section ternaryfooter">
        <div className="container ">
          <div className="footer-top">
            <div className="row mt-1">
              <div className="col-lg-5 col-sm-6">
                <div className="widget widget-about mt-0">
                  <div className="widget-body">
                    <div className="footer-newsletter p-0">
                      <div className="row justify-content-center align-items-center ">
                        <div className="col-xl-12 col-lg-12">
                          <Link href="" legacyBehavior>
                            <Image
                              src="/assets/images/summit-logo-ree.png"
                              alt="logo-footer"
                              width={150}
                              height={55}
                              className="footer-ternarytheme-logo"
                            />
                          </Link>
                          <div className="icon-box icon-box-side text-dark mt-5">
                            <div className="icon-box-content">
                              <h5 className="icon-box-title text-uppercase font-weight-bold text-white text-left pl-1">
                                Subscribe To Our Newsletter
                              </h5>
                              <p className="text-light">
                                Get all the latest information on Events, Sales
                                and Offers.
                              </p>
                              <form
                                method="get"
                                className="input-wrapper input-wrapper-inline input-wrapper-rounded mt-2"
                              >
                                <input
                                  type="email"
                                  className="form-control mr-2 bg-white text-default"
                                  name="email"
                                  id="email"
                                  onChange={(e: any) =>
                                    setSubscriptions(e?.target?.value)
                                  }
                                  placeholder="Your E-mail Address"
                                  required
                                />
                                <button
                                  className="btn btn-primary btn-rounded btn-left footer-button  ternaryTheme-btn"
                                  type="submit"
                                  onClick={handleSubscription}
                                >
                                  Subscribe
                                  <i className="w-icon-long-arrow-right"></i>
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-sm-6">
                <div className="widget">
                  <h3 className="widget-title ternaryTheme-footerTitle">Company</h3>
                  <ul className="widget-body">
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>About Us</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>Contact Us</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>Order History</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* <label className="label-social d-block text-light">
                  Social Media
                </label>
                <div className="social-icons social-icons-colored pb-2 pt-2">
                  <Link href="#" legacyBehavior>
                    <a className="social-icon social-facebook w-icon-facebook"></a>
                  </Link>
                  <Link href="#" legacyBehavior>
                    <a className="social-icon social-twitter w-icon-twitter"></a>
                  </Link>
                  <Link href="#" legacyBehavior>
                    <a className="social-icon social-instagram w-icon-instagram"></a>
                  </Link>
                  <Link href="#" legacyBehavior>
                    <a className="social-icon social-youtube w-icon-youtube"></a>
                  </Link>
                </div> */}
              </div>
              <div className="col-lg-2 col-sm-6">
                <div className="widget">
                  <h4 className="widget-title ternaryTheme-footerTitle">My Account</h4>
                  <ul className="widget-body">
                    <li>
                      <Link href="/cart" legacyBehavior>
                        View Cart
                      </Link>
                    </li>
                    <li>
                      <Link href="/login" legacyBehavior>
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-sm-6">
                <div className="widget">
                  <h4 className="widget-title ternaryTheme-footerTitle">Customer Service</h4>
                  <ul className="widget-body">
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>Payment Methods</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>Product Returns</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>Term and Conditions</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="widget widget-category">
              {navbarData?.length > 0 && navbarData !== null && (
                <>
                  {navbarData.map((items: any, i: any) => {
                    <div key={i}>
                      {
                        items.values.map((items_name: any) => (
                          <div className="category-box" key={i}>
                            <h6 className="category-name">{items_name.name}:</h6>
                            {items_name.values.map((names: any, index: any) => (
                              <Link href={names.url} legacyBehavior key={index}>
                                <a key={index}>{names.name}</a>
                              </Link>
                            ))}
                          </div>
                        ))
                      }
                    </div>
                  }

                  )}
                </>
              )}
            </div>
          </div>
          <div className="footer-bottom justify-content-center">
            <div className="text-center">
              <p className="copyright">
                Copyright © 2023 Summit. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default TernaryThemeFooter;
