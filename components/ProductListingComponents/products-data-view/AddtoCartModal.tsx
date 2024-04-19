import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import useProductDetail from '../../../hooks/ProductDetailHook/product-detail-hook';
import { useSelector } from 'react-redux';
import { SelectedFilterLangDataFromStore } from '../../../store/slices/general_slices/selected-multilanguage-slice';

const AddtoCartModal = ({
  show,
  toHide,
  name,
  item_name,
  handleClose,
  handleAddCart,
  min_order_qty,
  qty,
  setQty,
}: any) => {
  const handleQuantity = (val: any) => {
    const inputValue = parseInt(val);
    if (isNaN(inputValue)) {
      setQty('');
    } else {
      setQty(inputValue);
    }
  };
  console.log('qty', qty);
  const handleQuantityIncrement = () => {
    setQty(parseInt(qty + 1));
  };
  const handleQuantityDecrement = () => {
    setQty((prevQty: number) => (prevQty > 1 ? prevQty - 1 : 1));
  };

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
      <Modal
        show={show}
        size="md"
        scrollable={true}
        className="Cart-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={toHide}
      >
        <Modal.Header>
          <Modal.Title className="text-center">
            {item_name}
          </Modal.Title>
          <button className="btn btn-primary" onClick={handleClose}>
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <h6>item code : {name}</h6>
            </div>
            <div className="d-flex align-items-center mt-5">
              <div className="fs-4 text-muted products-name ">
                {' '}
                {selectedMultiLangData?.quantity}:{' '}
              </div>
              <div>
                <span
                  className="fs-2 ml-lg-2 arrow_pointer products-name"
                  onClick={handleQuantityDecrement}
                >
                  <i className="fa fa-minus fs-4"></i>
                </span>

                <input
                  type="text"
                  value={qty}
                  className="varient_input mx-2 text-center products-name"
                  onChange={(e: any) => handleQuantity(e.target.value)}
                  min={1}
                />

                <span
                  className="fs-2 arrow_pointer products-name"
                  onClick={handleQuantityIncrement}
                >
                  <i className="fa fa-plus fs-4"></i>
                </span>
              </div>
            </div>
            <div className="fs-6 mt-1 text-uppercase text-dark bold products-name">
              {min_order_qty === 0 ? (
                ''
              ) : (
                <p>
                  {selectedMultiLangData?.minimum_order_qty}: {min_order_qty}
                </p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <>
            <button className="btn standard_button_filled cart_btn_gtag  product-font-family me-3"
              onClick={handleAddCart}
             disabled={qty < min_order_qty
              || qty === '' || qty === 0
             }
            >
              Add to Cart
            </button>

            <div className="col-12 text-end">
              <div className="ms-5">
                {qty < min_order_qty ? (
                  <p className="text-danger">
                    {selectedMultiLangData?.minimum_order_qty}:{min_order_qty}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
          </>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddtoCartModal;
