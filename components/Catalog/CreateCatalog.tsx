import React from "react";

const CreateCatalog = ({
  handleChange,
  handleSubmitCatalogName,
  selectedMultiLangData,
}: any) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-lg-7 text-center">
          <div className="row mx-auto">
            <h3 className="text-center text-captilize pb-4">
              {selectedMultiLangData?.create_catalog}
            </h3>
            <div className="col-lg-8 col-12 px-0  d-flex justify-content-center">
              <input
                type="text"
                className="form-control catalog-inputBox  px-3"
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
                {selectedMultiLangData?.create_catalog}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCatalog;
