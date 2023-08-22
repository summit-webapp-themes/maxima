import React, { useEffect, useState } from "react";
import useCatalogHook from "../../hooks/CatalogHooks/catalogHook";
import CatalogListCard from "./CatalogListCard";
import CreateCatalog from "./CreateCatalog";
import ListViewLoadingLayout from "../ProductListingComponents/products-data-view/ListViewLoadingLayout";

const CatalogList = () => {
  const {
    handleChange,
    handleSubmitCatalogName,
    catalogListItem,
    handleDeleteCatalog,
    handleAddProduct,
    currency_state_from_redux,
    loading
  }: any = useCatalogHook();

  return (
    <>{loading === "pending" ? (
      <div className="row justify-content-center">
        {[...Array(6)].map(() => (
          <>
            <div className="col-lg-7 mx-3">
              <ListViewLoadingLayout />
            </div>
          </>
        ))}
      </div>
    ) :
      <div className="container mt-5">
        <CreateCatalog
          handleSubmitCatalogName={handleSubmitCatalogName}
          handleChange={handleChange}
        />
        <CatalogListCard
          catalogListItem={catalogListItem}
          handleDeleteCatalog={handleDeleteCatalog}
          handleAddProduct={handleAddProduct}
          currency_state_from_redux={currency_state_from_redux}
        />
      </div>}
    </>
  );
};

export default CatalogList;