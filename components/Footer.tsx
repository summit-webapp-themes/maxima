import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import getSubscriber from "../services/api/general_apis/newsletter-subscription-api";
import { useDispatch, useSelector } from "react-redux";
import { SelectedFilterLangDataFromStore } from "../store/slices/general_slices/selected-multilanguage-slice";
import { showToast } from "./ToastNotificationNew";

const Footer = () => {
  const navbarData: any = [];
  const [subScription, setSubscriptions] = useState<any>("");

  const handleSubscriptionInput = (e: any) => {
    setSubscriptions(e?.target?.value);
  };

  const handleSubscription = async (event: any) => {
    event?.preventDefault();
    let subScriptionRes = await getSubscriber(subScription);
    if (subScriptionRes?.data?.message?.msg === "success") {
      showToast("subscribed successfully", "success");
      setSubscriptions("");
    }
  };

  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );

  const [selectLangData, setLangData] = useState<any>();

  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore?.selectedLanguageData]);
  return (
    <>
      <footer className="footer footer-dark footer-section">
        <div className="container ">
          <div className="footer-newsletter">
            <div className="row justify-content-center align-items-center ">
              <div className="col-xl-3 col-lg-2">
                <Link href="" legacyBehavior>
                  <Image
                    src="/assets/images/progearhub_logo.png"
                    alt="logo-footer"
                    width={250}
                    height={55}
                  />
                </Link>
              </div>
              <div className="col-xl-4 col-lg-5">
                <div className="icon-box icon-box-side text-dark ">
                  <div className="icon-box-icon d-inline-flex footer-icon mx-0">
                    <i className="w-icon-envelop3 text-white msg-icon footer-icon "></i>
                  </div>
                  <div className="icon-box-content">
                    <h5 className="icon-box-title text-uppercase font-weight-bold text-white text-left">
                      {selectLangData?.subscribe_to_our_newsletter}
                    </h5>
                    <p className="text-light ">
                      {
                        selectLangData?.get_all_the_latest_information_on_events_sales_offers
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-9 mt-4 mt-lg-0 ">
                <form
                  onSubmit={handleSubscription}
                  method="get"
                  className="input-wrapper input-wrapper-inline input-wrapper-rounded row"
                >
                  <div className="col-8 my-auto">
                    <input
                      type="email"
                      className="form-control mr-2 bg-white text-default subscribe_input"
                      value={subScription}
                      onChange={handleSubscriptionInput}
                      placeholder="Your E-mail Address"
                      required
                    />
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-primary btn-rounded btn-left  footer-button"
                      type="submit"
                    >
                      {selectLangData?.subscribe}
                      <i className="w-icon-long-arrow-right px-2"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="footer-top">
            <div className="row mt-1">
              <div className="col-lg-5 col-sm-6">
                <div className="widget widget-about mt-0">
                  <div className="widget-body">
                    {/* <p className="widget-about-title lh-1 font-size-md ls-normal mb-3">
                      Got Question? Call us 24/7
                    </p>
                    <Link href="tel:18005707777 " legacyBehavior>
                      <a className="widget-about-call mb-4">1-800-570-7777</a>
                    </Link> */}
                    <p className="widget-about-desc ls-normal mb-3 footer-text">
                      {selectLangData?.welcome_to_ecommerce_site}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-sm-6">
                <div className="widget">
                  <h3 className="widget-title"> {selectLangData?.company}</h3>
                  <ul className="widget-body">
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.about_us}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.contact_us}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.order_history}</a>
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
                  <h4 className="widget-title">{selectLangData?.my_account}</h4>
                  <ul className="widget-body">
                    <li>
                      <Link href="/cart" legacyBehavior>
                        <a>{selectLangData?.view_cart}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/login" legacyBehavior>
                        <a>{selectLangData?.sign_in}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.privacy_policy}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-sm-6">
                <div className="widget">
                  <h4 className="widget-title">
                    {" "}
                    {selectLangData?.customer_service}
                  </h4>
                  <ul className="widget-body">
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.payment_methods}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.product_returns}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.terms_and_conditions}</a>
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
                      {items.values.map((items_name: any) => (
                        <div className="category-box" key={i}>
                          <h6 className="category-name">{items_name.name}:</h6>
                          {items_name.values.map((names: any, index: any) => (
                            <Link href={names.url} legacyBehavior key={index}>
                              <a key={index}>{names.name}</a>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>;
                  })}
                </>
              )}
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-left">
              <p className="copyright">{selectLangData?.copyright_text}</p>
            </div>
            <div className="footer-right ">
              <span className="payment-label px-3">
                {selectLangData?.using_safe_payment}
              </span>
              <figure className="payment ">
                <Image
                  src="/assets/images/payment.png"
                  alt="payment"
                  width={159}
                  height={25}
                />
              </figure>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
