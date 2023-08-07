import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoginUser,
  login_state,
} from "../../../../store/slices/auth/login_slice";
import { Dropdown, FormControl } from "react-bootstrap";
import { useRouter } from "next/router";
import { cart_listing_state } from "../../../../store/slices/cart-listing-page-slice/cart-listing-slice";
import useWishlist from "../../../../hooks/WishListHooks/WishListHooks";
import LogoutList from "../../../../services/api/auth/logout_api";

const Home4WebNavbar = ({
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
  handleKeyDown
}: any) => {
  const { wishlistCount } = useWishlist();
  console.log("navmenu click", navMenuclick);
  const cartlisting_data: any = useSelector(cart_listing_state);
  const [cartCount, setCartCount] = useState<number>();
  const [isShown, setIsShown] = useState(true);
  const [isId, setId] = useState();
  const [LoggedIn, setLoggedIn] = useState(false);
  const isLoggedIn = useSelector(login_state);

  const dispatch = useDispatch();
  const handleHover = (id: any) => {
    setId(id);
    setIsShown(true);
  };

  useEffect(() => {
    setCartCount(cartlisting_data?.orderCount);
  }, [cartlisting_data]);

  useEffect(() => {
    if (isLoggedIn.user === "LoggedIn") {
      setLoggedIn(true);
    }
  }, [login_state]);

  const router = useRouter();
  console.log("isLoggedIn12", LoggedIn);
  const handleLeave = (id: any) => {
    setId(id);
    setIsShown(false);
  };

  const handleClick = async () => {
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

  // useEffect(() => {
  //   console.log("clear state")
  //   const handleBeforeUnload = async () => {
  //     localStorage.clear();
  //     const logoutAPI = await LogoutList();
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [handleClick]);

  return (
    <>
      <header className="header" >
      <div className="header-bottom sticky-content fix-top sticky-header has-dropdown home4-navbar-header" >
          <div className="container">
            <div className="inner-wrap d-flex justify-content-between">
              <div className="header-left">
              <div className="mobile-nav">
              <Link href="#" legacyBehavior>
                <a
                  className="mobile-menu-toggle  w-icon-hamburger"
                  aria-label="menu-toggle"
                  onClick={navMenuclick}
                ></a>
              </Link>
            </div>
            <div className="mx-2 my-4 logo_containers">
              <Link href="/" legacyBehavior>
                <Image
                  src="/assets/images/summit-logo-homepage4.png"
                  width={100}
                  height={50}
                  alt="logo"
                />
                {/* <h1 className="text-white text-uppercase">Summit</h1> */}
              </Link>
            </div>
             
              
              </div>
              <div className="header-search  hs-expanded hs-round d-none d-md-flex input-wrapper ">
              <input
                type="text"
                className="form-control "
                name="search"
                id="search"
                placeholder="Search ..."
                value={searchValue}
                onChange={(e: any) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                required style={{border:"none"}}
              />
              <button
                className="btn btn-search"
                type="submit"
                onClick={handleSearch} style={{backgroundColor:"#febd69"}}
              >
                <i className="w-icon-search"></i>
              </button>
            </div>
            </div>
            <div className="mx-2">
            <div className=" dropdown cart-dropdown cart-offcanvas text-white mx-lg-3">
              <Link href="/wishlist" legacyBehavior>
                <a className=" cart-toggle label-down link">
                  <i className="w-icon-heart fs-1">
                    <span className="cart-count wishlist_count text-white">
                      {wishlistCount || 0}
                    </span>
                  </i>
                  <span className="wishlist-label d-lg-show">Wishlist</span>
                </a>
              </Link>
            </div>
            </div>
            <div className="mx-2">
            <div className="dropdown cart-dropdown cart-offcanvas text-white mx-lg-4 ml-3">
              <Link href="/cart" legacyBehavior>
                <a className="cart-toggle label-down link">
                  <i className="fa fa-shopping-cart fs-1" aria-hidden="true">
                    <span className="cart-count text-white">
                      {cartCount || 0}
                    </span>
                  </i>
                  <span className="cart-label">Cart</span>
                </a>
              </Link>
            </div>
            </div>
           
    
          </div>
        </div>



        <div className="home4-header-middle navbar-header">
          <div className="container">
         <div className="inner-wrap d-flex justify-content-between">
              <div className="header-left">
               
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
                          <ul className="megamenu">
                            {items.values.map((items_val: any, index: any) => (
                              <li key={index}>
                                <Link
                                  href={`${items_val.url}?page=1&currency=${selectedCurrencyValue}`}
                                  legacyBehavior
                                >
                                  <a>
                                    <h4 className="menu-title menu_titlee">
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
           
           
           
            <div className="mx-3">
              <select
                // value={selectedLanguage}
                onChange={(e) => handleCurrencyValueChange(e.target.value)}
              >
                <option value="INR">₹</option>
                <option value="USD">$</option>
                <option value="EUR">€</option>
              </select>
            </div>
            <div className="mx-3">
            <select onChange={(e) => handleLanguageChange(e.target.value)}>
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                {/* <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
                <option value="ml">മലയാളം</option> */}
                {/* Add more language options here */}
              </select>
            </div>

            <div className={`custom_dropdown`}>
            
            </div>
          </div>
        </div>

       
      </header>
    </>
  );
};

export default Home4WebNavbar;
