import { useCallback, useEffect, useState } from "react";
import useNavbar from "../../../hooks/GeneralHooks/NavbarHooks/NavbarHook";
import Home3WebNavbar from "./components/Home3WebNavbar";
import MobNavbar from "./components/MobNavbar";
import useSearchHook from "../../../hooks/GeneralHooks/SearchHooks/search-hook";


const Home3Navbar = () => {
  const {
    navbarData,
    isLoading,
    getSelectedLang,
    handleLanguageChange,
    handleCurrencyValueChange,
    selectedCurrencyValue,
  } = useNavbar();
  const { searchValue, setSearchValue, handleSearch,handleKeyDown } = useSearchHook();
  const [clicks, setClicks] = useState(false);

  const navMenuclick = (e: any) => {
    console.log("clickk")
    e.preventDefault();
    setClicks(!clicks);
  };

  console.log("click",clicks)
  return (
    <div className={clicks ? "mmenu-active" : ""}>
      <Home3WebNavbar
        navbarData={navbarData}
        isLoading={isLoading}
        navMenuclick={navMenuclick}
        handleLanguageChange={handleLanguageChange}
        handleCurrencyValueChange={handleCurrencyValueChange}
        selectedCurrencyValue = {selectedCurrencyValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        handleKeyDown={handleKeyDown}
      />
      <MobNavbar
        navbarData={navbarData}
        isLoading={isLoading}
        navMenuclick={navMenuclick}
        setClicks={setClicks}
        clicks={clicks}
        handleLanguageChange={handleLanguageChange}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default Home3Navbar;
