import React, { useEffect, useState } from "react";
import useCatalogHook from "../../hooks/CatalogHooks/catalogHook";
import CatalogListCard from "./CatalogListCard";

const CatalogList = () => {
   const {handleChange,handleSubmitCatalogName,catalogListItem,handleDeleteCatalog}:any = useCatalogHook()

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="col-md-7 ">
            <div className="row">
              <h3>Create Catalog</h3>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  id="catalog-name"
                  onChange={handleChange}
                  placeholder="Enter Catalog Name"
                />
              </div>
              <div className="col-md-4">
                <button
                  type="submit"
                  className="btn btn-primary mb-3"
                  onClick={handleSubmitCatalogName}
                >
                  Create Template
                </button>
              </div>
            </div>
          </div>
        </div>
      
        <CatalogListCard catalogListItem={catalogListItem} handleDeleteCatalog={handleDeleteCatalog}/>
      </div>
    </>
  );
};

export default CatalogList;
