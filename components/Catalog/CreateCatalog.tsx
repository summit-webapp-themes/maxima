import React from 'react'

const CreateCatalog = ({ handleChange, handleSubmitCatalogName }: any) => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-md-7 ">
                    <div className="row catalogCreate-wrapper">
                        <h3 className="text-center">Create Catalog</h3>
                        <div className="col-md-7">
                            <input
                                type="text"
                                className="form-control catalog-inputBox"
                                id="catalog-name"
                                onChange={handleChange}
                                placeholder="Enter Catalog Name"
                            />
                        </div>
                        <div className="col-md-4">
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
    )
}

export default CreateCatalog