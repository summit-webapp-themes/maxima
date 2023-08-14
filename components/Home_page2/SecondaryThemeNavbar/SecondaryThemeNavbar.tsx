import { useCallback, useEffect, useState } from "react";
import useNavbar from "../../../hooks/GeneralHooks/NavbarHooks/NavbarHook";
import Home3WebNavbar from "./components/SecondaryThemeWebNavbar";
import MobNavbar from "./components/MobNavbar";
import useSearchHook from "../../../hooks/GeneralHooks/SearchHooks/search-hook";
import SecondaryThemeWebNavbar from "./components/SecondaryThemeWebNavbar";
import useMultilangHook from "../../../hooks/LanguageHook/Multilanguages-hook";

const SecondaryThemeNavbar = () => {
  const {
    navbarData,
    isLoading,

    handleCurrencyValueChange,
    selectedCurrencyValue,
  } = useNavbar();
  const { searchValue, setSearchValue, handleSearch, handleKeyDown } =
    useSearchHook();
  const { handleLanguageChange, multiLanguagesData } = useMultilangHook();

  const [clicks, setClicks] = useState(false);

  const navMenuclick = (e: any) => {
    console.log("clickk");
    e.preventDefault();
    setClicks(!clicks);
  };

  console.log("click", clicks);
  return (
    <div className={clicks ? "mmenu-active" : ""}>
      <SecondaryThemeWebNavbar
        navbarData={navbarData}
        isLoading={isLoading}
        navMenuclick={navMenuclick}
        multiLanguagesData={multiLanguagesData}
        handleLanguageChange={handleLanguageChange}
        handleCurrencyValueChange={handleCurrencyValueChange}
        selectedCurrencyValue={selectedCurrencyValue}
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
        multiLanguagesData={multiLanguagesData}
        handleLanguageChange={handleLanguageChange}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default SecondaryThemeNavbar;
