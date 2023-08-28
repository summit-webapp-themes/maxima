import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { setDefaultCurrencyValue } from "../store/slices/general_slices/multi-currency-slice";
import { setMultiLingualData } from "../store/slices/general_slices/multilang-slice";

const HomePage = ({ default_currency_value, multi_lingual_values }: any) => {
  // useEffect(()=>
  // {
  //   askForPermissionToReceiveNotifications();
  // },[])

  const dispatch = useDispatch();

  // dispatch(setDefaultCurrencyValue(default_currency_value));
  dispatch(setMultiLingualData(multi_lingual_values));

  const { homeTopCategories, isLoading, selectedCurrencyVal }: any =
    useHomeTopCategories();
  const { brandListing }: any = useHomeTopBrand();
  const { allTagsData }: any = useDisplayTagHooks();

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

  // console.log("display tag in home ", allTagsData);

  return (
    <>
      <HomeBanner />
      <HomeTopCategories
        homeTopCategories={homeTopCategories}
        isLoading={isLoading}
        selectedCurrencyVal={selectedCurrencyVal}
      />

      {allTagsData?.map((data: any, index: number) => (
        <React.Fragment key={index}>
          <DisplayTagMaster data={data} />
          {renderSectionComponent(index)}
        </React.Fragment>
      ))}
    </>
  );
};

export default HomePage;
