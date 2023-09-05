import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoginUser,
  login_state,
} from "../../../store/slices/auth/login_slice";
import { Dropdown, FormControl } from "react-bootstrap";
import { useRouter } from "next/router";
import useSearchHook from "../../../hooks/GeneralHooks/SearchHooks/search-hook";
import { cart_listing_state } from "../../../store/slices/cart-listing-page-slice/cart-listing-slice";
import useWishlist from "../../../hooks/WishListHooks/WishListHooks";
import LogoutList from "../../../services/api/auth/logout_api";
import LinguisticsAndForex from "./LinguisticsAndForex";
import { currency_selector_state } from "../../../store/slices/general_slices/multi-currency-slice";
const WebNavbar = ({
  navbarData,
  isLoading,
  navMenuclick,
  getSelectedLang,
  searchValue,
  setSearchValue,
  handleSearch,
  handleLanguageChange,
  handleCurrencyValueChange,
  selectedCurrencyValue,
  handleKeyDown,
  multiLanguagesData,
  selectedMultiLangData,
}: any) => {
  const { wishlistCount } = useWishlist();
  console.log("navmenu click", navMenuclick);
  const cartlisting_data: any = useSelector(cart_listing_state);
  // const currency_state_from_redux: any = useSelector(currency_selector_state);
  // const [selectedCurrencyValue, setSelectedCurrencyValue] = useState("");
  const [cartCount, setCartCount] = useState<number>();
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isId, setId] = useState<any>();
  const [LoggedIn, setLoggedIn] = useState<boolean>(false);

  const dispatch = useDispatch();
  const handleHover = (id: any) => {
    setId(id);
    setIsShown(true);
  };

  useEffect(() => {
    setCartCount(cartlisting_data?.orderCount);
  }, [cartlisting_data]);
  // useEffect(() => {
  //   setSelectedCurrencyValue(
  //     currency_state_from_redux?.selected_currency_value
  //   );
  // }, [currency_state_from_redux]);

  let isLoggedIn: any;
  if (typeof window !== "undefined") {
    isLoggedIn = localStorage.getItem("isLoggedIn");
  }

  // useEffect(() => {
  //   if (isLoggedIn.user === "LoggedIn") {
  //     setLoggedIn(true);
  //   }
  // }, [login_state]);

  const router = useRouter();
  console.log("isLoggedIn12", LoggedIn);
  const handleLeave: any = (id: any) => {
    setId(id);
    setIsShown(false);
  };

  const handleClick: any = async () => {
    let obj = {
      Logouts: true,
    };

    dispatch(fetchLoginUser(obj));
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isDealer");
    localStorage.removeItem("isSuperAdmin");
    setLoggedIn(false);
    router.push("/login");

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  };

  const handleBeforeUnload = async () => {
    localStorage.clear();
    const logoutAPI = await LogoutList();
  };

  return (
    <div>
      <header className="header fixed-header">
        <div className="header-middle">
          <div className="container justify-content-sm-start justify-content-md-end justify-content-lg-end  justify-content-xl-end">
            <div className="mobile-nav d-flex justify-content-sm-between">
              <Link href="#" legacyBehavior>
                <a
                  className="mobile-menu-toggle  w-icon-hamburger"
                  aria-label="menu-toggle"
                  onClick={navMenuclick}
                ></a>
              </Link>
            </div>
            <div className="mx-0  logo_containers my-2">
              <Link href="/" legacyBehavior>
                <Image
                  src="/assets/images/progearhub_logo.png"
                  width={270}
                  height={60}
                  alt="logo"
                  className="mob-logo-img1"
                />
              </Link>
            </div>
            <div className="header-search  hs-expanded hs-round d-none d-md-flex input-wrapper rounded-searchbar">
              <input
                type="text"
                className="form-control "
                name="search"
                id="search"
                placeholder={selectedMultiLangData?.search_in}
                value={searchValue}
                onChange={(e: any) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
              <button
                className="btn btn-search search_button"
                type="submit"
                onClick={handleSearch}
              >
                <i className="w-icon-search"></i>
              </button>
            </div>

            <div className="navbar-left-icon1 d-flex align-items-center text-center">
              <div className=" dropdown cart-dropdown cart-offcanvas text-white mx-lg-3 d-flex align-items-center heart-icon-margin">
                <Link href="/wishlist" legacyBehavior>
                  <a className=" cart-toggle label-down link">
                    <i className="w-icon-heart wish_iconn ">
                      <span className="cart-count wishlist_count text-white">
                        {wishlistCount || 0}
                      </span>
                    </i>
                    {/* <span className="wishlist-label d-lg-show">
                      {selectedMultiLangData?.wishlist}
                    </span> */}
                  </a>
                </Link>
              </div>
              <div className="dropdown cart-dropdown cart-offcanvas text-white mx-lg-4 ml-3  d-flex align-items-center">
                <Link href="/cart" legacyBehavior>
                  <a className="cart-toggle label-down link">
                    <i className="w-icon-cart cart_iconn ">
                      <span className="cart-count text-white">
                        {cartCount || 0}
                      </span>
                    </i>
                    {/* <span className="cart-label">
                      {selectedMultiLangData?.cart}
                    </span> */}
                  </a>
                </Link>
              </div>
              <div className="nav_custom_dropdown  d-flex align-items-center">
                <Dropdown>
                  {isLoggedIn === "true" ? (
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="dropdown-icon dropdown_active_icon"
                    >
                      <i
                        className=" fa fa-user-o d-flex align-items-center mt-5 mb-2 logout-icon"
                        aria-hidden="true"
                      ></i>
                    </Dropdown.Toggle>
                  ) : (
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="dropdown-icon dropdown_active_icon"
                    >
                      <i
                        className=" fa fa-user-o d-flex align-items-center mt-5 mb-2 logout-icon"
                        aria-hidden="true"
                      ></i>
                    </Dropdown.Toggle>
                  )}

                  {isLoggedIn === "true" ? (
                    <Dropdown.Menu className="fs-4">
                      <Dropdown.Item className="nav_dropdown">
                        <Link href="/quick-order" className="text-dark">
                          {selectedMultiLangData?.quick_order}
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item className="nav_dropdown dropdown-link">
                        <Link href="/profile" className="text-dark">
                          {selectedMultiLangData?.my_account}
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="nav_dropdown dropdown-link">
                        <Link href="/dealer-ledger" className="text-dark">
                          {selectedMultiLangData?.dealer_ledger}
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="nav_dropdown dropdown-link">
                        <Link href={`/catalog`} className="text-dark">
                          {selectedMultiLangData?.view_catalogs}
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="nav_dropdown dropdown-link">
                        <Link href="/myOrder" className="text-dark">
                          {selectedMultiLangData?.my_order}
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="nav_dropdown text-dark"
                        onClick={handleClick}
                      >
                        {selectedMultiLangData?.logout}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu className="fs-3">
                      <Dropdown.Item className="nav_dropdown">
                        {" "}
                        <Link href="/login" className="text-dark ">
                          {selectedMultiLangData?.login}
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom sticky-content fix-top sticky-header has-dropdown">
          <div className="container">
            <div className="inner-wrap d-flex justify-content-between">
              <div className="header-left">
                <div className="dropdown category-dropdown nav-dropdown">
                  <Link href="#" legacyBehavior>
                    <a
                      className="category-toggle text-white bg-primary text-capitalize"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                      data-display="static"
                      title="Browse Categories"
                    >
                      <i className="w-icon-category"></i>
                      <span>{selectedMultiLangData?.browse_categories}</span>
                    </a>
                  </Link>

                  <div className="dropdown-box text-default">
                    <ul className="menu vertical-menu category-menu">
                      {isLoading === "succeeded" &&
                        navbarData?.length > 0 &&
                        navbarData.map((items: any, index: number) => (
                          <li key={index}>
                            <a>
                              <i className="w-icon-tshirt2"></i>
                              {items.label}
                            </a>
                            <ul className="megamenu">
                              {items?.values?.length > 0 &&
                                items.values.map((items_val: any, i: any) => (
                                  <li key={i}>
                                    <Link
                                      href={`${items_val.url}?page=1&currency=${selectedCurrencyValue}`}
                                      legacyBehavior
                                    >
                                      <a>
                                        <h4 className="menu-title ">
                                          {items_val.label}
                                        </h4>
                                      </a>
                                    </Link>
                                    <hr className="divider" />
                                    <ul>
                                      {items_val.values.map(
                                        (new_val: any, index: number) => (
                                          <li key={index}>
                                            <Link
                                              href={`${new_val.url}?page=1&currency=${selectedCurrencyValue}`}
                                              legacyBehavior
                                            >
                                              <a>{new_val.label}</a>
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <nav className="main-nav">
                  <ul className="menu active-underline">
                    {navbarData?.length > 0 &&
                      navbarData.map((items: any, i: any) => (
                        <li
                          className={`${isId === i && isShown ? "active" : ""}`}
                          onMouseEnter={(i) => handleHover(i)}
                          onMouseLeave={(i) => handleLeave(i)}
                          key={i}
                        >
                          <a className="menu_titlee">{items.name}</a>
                          <ul className="megamenu ms-3 py-3">
                            {items?.values.map((items_val: any, index: any) => (
                              <li key={index}>
                                <Link
                                  href={`${items_val.url}?page=1&currency=${selectedCurrencyValue}`}
                                  legacyBehavior
                                >
                                  <a>
                                    <h4 className="menu-title menu_heading">
                                      {items_val.label}
                                    </h4>
                                  </a>
                                </Link>
                                <ul>
                                  {items_val.values.map(
                                    (new_val: any, i: any) => (
                                      <li className="menu_list" key={i}>
                                        <Link
                                          href={`${new_val.url}?page=1&currency=${selectedCurrencyValue}`}
                                          legacyBehavior
                                        >
                                          <a>{new_val.label}</a>
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                  </ul>
                </nav>
              </div>
            </div>
            <LinguisticsAndForex />
          </div>
        </div>
      </header>
    </div>
  );
};

export default WebNavbar;
