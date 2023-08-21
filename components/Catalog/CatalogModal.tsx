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
}: any) => {
  console.log(catalogListItem, name, "name");
  // const {
  //     catalogListItem,
  //     handleAddProduct,
  //     handleSubmitCatalogName,
  //     handleChange,
  // }: any = useCatalogHook();
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
            Add Product to Template
          </Modal.Title>
          <button className="btn btn-warning mt-3" onClick={handleClose}>
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <CreateCatalog
            handleSubmitCatalogName={handleSubmitCatalogName}
            handleChange={handleChange}
          />
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <h4 className="text-center">Catalog List</h4>
              {catalogListItem?.length > 0 &&
                catalogListItem?.map((catalog: any, i: any) => (
                  <>
                    <div className="row justify-content-center">
                      <div className="col-md-12 mt-3">
                        <div className="card modal-catalogBlock">
                          <div className="d-flex justify-content-between">
                            <h5 className="text-uppercase">{catalog?.name}</h5>
                            <button
                              className="btn btn-warning btn-catalogview mr-2"
                              onClick={() =>
                                handleAddProduct(catalog?.name, name)
                              }
                            >
                              Add Product
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
          {/* <div className="d-flex justify-content-center">
            <button className="btn btn-warning mt-3" onClick={handleClose}>
              Close Modal
            </button>
          </div> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CatalogModal;
