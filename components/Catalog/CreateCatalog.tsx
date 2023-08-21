import React from "react";

const CreateCatalog = ({ handleChange, handleSubmitCatalogName }: any) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-lg-7 text-center">
          <div className="row catalogCreate-wrapper mx-auto">
            <h3 className="text-center text-uppercase">Create Catalog</h3>
            <div className="col-lg-8 col-12 px-0  d-flex justify-content-center">
              <input
                type="text"
                className="form-control catalog-inputBox  "
                id="catalog-name"
                onChange={handleChange}
                placeholder="Enter Catalog Name"
              />
            </div>
            <div className="col-lg-4 col-12 mt-lg-0 mt-3 text-lg-center ">
              <button
                type="submit"
                className="btn createCatalog-btn "
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
