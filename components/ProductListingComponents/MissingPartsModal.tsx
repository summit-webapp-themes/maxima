import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MissingPartsAPI } from "../../services/api/product-listing-page-api/missing-parts-api";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const MissingPartsModal = ({
  show,
  handlemodalclose,
  setShow,
  selectedMultiLangData,
}: any) => {
  const [descriptionVal, setdescriptionval] = useState<any>("");
  const TokenFromStore: any = useSelector(get_access_token);

  const [showToast, setshowToast] = useState(false);
  const [messageNew, setmessageNew] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (descriptionVal !== "") {
      const missingPartsApiRes = await MissingPartsAPI(
        null,
        descriptionVal,
        TokenFromStore?.token
      );
      if (
        missingPartsApiRes?.status === 200 &&
        missingPartsApiRes?.data?.message?.msg === "success"
      ) {
        setdescriptionval("");
      }
      handlemodalclose();
    } else {
      setmessageNew("*Please fill one of the field");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handlemodalclose}>
        <Modal.Header closeButton>
          <h4 className="text-center mt-2">
            {selectedMultiLangData?.what_are_you_searching_today}
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-2">
            <h6 className="text-capitalize">
              {selectedMultiLangData?.choice_product_not_f}
            </h6>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              value={descriptionVal}
              onChange={(e) => (
                setdescriptionval(e?.target?.value), setmessageNew("")
              )}
            ></textarea>
          </div>
          <p className="text-danger">{messageNew}</p>
          <div className="text-right mt-4">
            <button
              className="btn btn-primary text-white"
              style={{
                border: "1px solid #0071DC",
                borderRadius: "7px",
                backgroundColor: "#0071DC",
              }}
              onClick={(e) => handleSubmit(e)}
            >
              {selectedMultiLangData?.submit_enquiry}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default MissingPartsModal;
