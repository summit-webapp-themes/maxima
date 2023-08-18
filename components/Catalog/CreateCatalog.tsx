import React from "react";

const CreateCatalog = ({ handleChange, handleSubmitCatalogName }: any) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-lg-7 text-center">
          <div className="row catalogCreate-wrapper mx-auto">
            <h3 className="text-center text-uppercase">Create Catalog</h3>
            <div className="col-lg-8 col-6 px-0 text-end mx-auto ">
              <input
                type="text"
                className="form-control catalog-inputBox w-75"
                id="catalog-name"
                onChange={handleChange}
                placeholder="Enter Catalog Name"
              />
            </div>
            <div className="col-lg-4 col-6 text-lg-start ">
              <button
                type="submit"
                className="btn mb-3 createCatalog-btn"
                onClick={handleSubmitCatalogName}
              >
                Create Catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCatalog;
