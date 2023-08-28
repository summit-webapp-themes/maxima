import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDisplayTagHooks from "../hooks/HomePageHooks/DisplayTagHooks";
import useHomeTopCategories from "../hooks/HomePageHooks/HomeTopCategoriesHook";
import BestSeller from "./DisplayTags/BestSeller";
import NewArrivals from "./DisplayTags/NewArrivals";
import SpecialOffer from "./DisplayTags/SpecialOffer";
import HomeBanner from "./HomeBanners/HomeBanners";
import HomeTopBrands from "./HomeTopBrand/HomeTopBrands";
import HomeTopCategories from "./HomeTopCategories/HomeTopCategories";
import HomeTopCategoriesBanner from "./HomeTopCategories/HomeTopCategoriesBanner";
import DisplayTagMaster from "./DisplayTags/DisplayTagMaster";
import { askForPermissionToReceiveNotifications } from "../push-notifications";
import useHomeTopBrand from "../hooks/HomePageHooks/HomeTopBrandHook";
import {
  currency_selector_state,
  setDefaultCurrencyValue,
} from "../store/slices/general_slices/multi-currency-slice";
import { setMultiLingualData } from "../store/slices/general_slices/multilang-slice";
import { display_tags } from "../store/slices/home_page_slice/home-display-tag-slice";

const HomePage = ({ default_currency_value, multi_lingual_values }: any) => {
  console.log("multi currency in reducer in home page");
  // useEffect(()=>
  // {
  //   askForPermissionToReceiveNotifications();
  // },[])

  // const dispatch = useDispatch();

  const { homeTopCategories, isLoading, selectedCurrencyVal }: any =
    useHomeTopCategories();
  const { brandListing }: any = useHomeTopBrand();

  const displayTagList: any = useSelector(display_tags);
  // const { allTagsData }: any = useDisplayTagHooks();

  const [displayTagDataFromReducer, setDisplayTagDataFromReducer] =
    useState<any>([]);

  const renderSectionComponent: any = (index: number) => {
    switch (index) {
      case 0:
        return (
          <HomeTopCategoriesBanner
            homeTopCategories={homeTopCategories}
            selectedCurrencyVal={selectedCurrencyVal}
          />
        );
      case 1:
        return <HomeTopBrands brandListing={brandListing} />;
      // Add more cases as needed for other section components
      default:
        return null;
    }
  };

  useEffect(() => {
    if (displayTagList?.tagData?.length > 0) {
      setDisplayTagDataFromReducer([...displayTagList.tagData]);
    } else {
      setDisplayTagDataFromReducer([]);
    }
  }, [displayTagList]);

  return (
    <>
      <HomeBanner />
      <HomeTopCategories
        homeTopCategories={homeTopCategories}
        isLoading={isLoading}
        selectedCurrencyVal={selectedCurrencyVal}
      />

      {displayTagDataFromReducer?.map((data: any, index: number) => (
        <React.Fragment key={index}>
          <DisplayTagMaster data={data} />
          {renderSectionComponent(index)}
        </React.Fragment>
      ))}
    </>
  );
};

export default HomePage;
