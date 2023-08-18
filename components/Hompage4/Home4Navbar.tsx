import { useCallback, useEffect, useState } from "react";
import useNavbar from "../../hooks/GeneralHooks/NavbarHooks/NavbarHook";
import Home4WebNavbar from "./Navbar/components/Home4WebNavbar";
import MobNavbar from "./Navbar/components/MobNavbar";
import useSearchHook from "../../hooks/GeneralHooks/SearchHooks/search-hook";


const Home4Navbar = () => {
  const {
    navbarData,
    isLoading,
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
    <div className={clicks ? "mmenu-active" : ""} >
      <Home4WebNavbar
        navbarData={navbarData}
        isLoading={isLoading}
        navMenuclick={navMenuclick}
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
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default Home4Navbar;
