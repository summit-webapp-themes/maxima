import React, { useEffect, useState } from "react";
import useCatalogHook from "../../hooks/CatalogHooks/catalogHook";
import CatalogListCard from "./CatalogListCard";
import CreateCatalog from "./CreateCatalog";
import ListViewLoadingLayout from "../ProductListingComponents/products-data-view/ListViewLoadingLayout";
import { useSelector } from "react-redux";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";

const CatalogList = () => {
  const {
    handleChange,
    handleSubmitCatalogName,
    catalogListItem,
    handleDeleteCatalog,
    handleAddProduct,
    currency_state_from_redux,
    loading,
  }: any = useCatalogHook();

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

  return (
    <>
      {loading === "pending" ? (
        <div className="row justify-content-center">
          {[...Array(6)].map(() => (
            <>
              <div className="col-lg-7 mx-3">
                <ListViewLoadingLayout />
              </div>
            </>
          ))}
        </div>
      ) : (
        <div className="container">
          <CreateCatalog
            handleSubmitCatalogName={handleSubmitCatalogName}
            handleChange={handleChange}
            selectedMultiLangData={selectedMultiLangData}
          />
          <CatalogListCard
            catalogListItem={catalogListItem}
            handleDeleteCatalog={handleDeleteCatalog}
            handleAddProduct={handleAddProduct}
            currency_state_from_redux={currency_state_from_redux}
            selectedMultiLangData={selectedMultiLangData}
          />
        </div>
      )}
    </>
  );
};

export default CatalogList;
