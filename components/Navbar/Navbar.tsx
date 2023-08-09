import { useCallback, useEffect, useState } from "react";
import useNavbar from "../../hooks/GeneralHooks/NavbarHooks/NavbarHook";
import WebNavbar from "./components/WebNavbar";
import MobNavbar from "./components/MobNavbar";
import useSearchHook from "../../hooks/GeneralHooks/SearchHooks/search-hook";
import useMultilangHook from "../../hooks/LanguageHook/Multilanguages-hook";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import { useSelector } from "react-redux";

const Navbar = () => {
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

  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();
  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  console.log("click", clicks);
  return (
    <div className={clicks ? "mmenu-active" : ""}>
      <WebNavbar
        navbarData={navbarData}
        isLoading={isLoading}
        navMenuclick={navMenuclick}
        handleLanguageChange={handleLanguageChange}
        handleCurrencyValueChange={handleCurrencyValueChange}
        selectedCurrencyValue={selectedCurrencyValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        handleKeyDown={handleKeyDown}
        multiLanguagesData={multiLanguagesData}
        selectedMultiLangData={selectedMultiLangData}
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
        multiLanguagesData={multiLanguagesData}
        selectedMultiLangData={selectedMultiLangData}
      />
    </div>
  );
};

export default Navbar;
