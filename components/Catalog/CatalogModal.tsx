import React from "react";
import { Modal } from "react-bootstrap";
import CatalogListCard from "./CatalogListCard";
import useCatalogHook from "../../hooks/CatalogHooks/catalogHook";
import CreateCatalog from "./CreateCatalog";

const CatalogModal = ({
  show,
  toHide,
  name,
  handleClose,
  catalogListItem,
  handleAddProduct,
  handleSubmitCatalogName,
  handleChange,
  selectedMultiLangData,
}: any) => {
  console.log(catalogListItem, name, "name");

  return (
    <>
      <Modal
        show={show}
        size="lg"
        scrollable={true}
        className="catalog-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title className="bold text-center catalog-title">
            {selectedMultiLangData?.add_product_to_catalog}
          </Modal.Title>
          <button className="btn btn-warning mt-3" onClick={handleClose}>
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <CreateCatalog
            handleSubmitCatalogName={handleSubmitCatalogName}
            handleChange={handleChange}
            selectedMultiLangData={selectedMultiLangData}
          />
          <div className="row d-flex justify-content-center">
            <div className="col-lg-11">
              <h4 className="text-center">
                {selectedMultiLangData?.catalog_list}
              </h4>
              {catalogListItem?.length > 0 &&
                catalogListItem?.map((catalog: any, i: any) => (
                  <>
                    <div className="row justify-content-center">
                      <div className="col-lg-12 mt-3">
                        <div className="card modal-catalogBlock">
                          <div className="d-flex justify-content-between">
                            <h5 className="text-uppercase">{catalog?.name}</h5>
                            <button
                              className="btn btn-colors text-dark rounded-3 mr-2"
                              onClick={() =>
                                handleAddProduct(catalog?.name, name)
                              }
                            >
                              {selectedMultiLangData?.add_product}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CatalogModal;
