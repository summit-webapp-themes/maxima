import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MissingPartsAPI } from "../../services/api/product-listing-page-api/missing-parts-api";

const MissingPartsModal = ({ show, handlemodalclose, setShow }: any) => {
  const [descriptionVal, setdescriptionval] = useState<any>("");
  const [message, setMessage] = useState<any>("");
  const [showToast, setshowToast] = useState(false);
  const [messageNew, setmessageNew] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (descriptionVal !== "") {
      const missingPartsApiRes = await MissingPartsAPI(null, descriptionVal);
      if (
        missingPartsApiRes?.status === 200 &&
        missingPartsApiRes?.data?.message?.msg === "success"
      ) {
        setdescriptionval("");
      }
      handlemodalclose();
      //   setmessageNew("");
      //   setMessage(missingPartsApiRes.msg);
      //   if (missingPartsApiRes?.msg == "success") {
      //     //   setshowToast(true);
      //     dispatch(successmsg("Enquiry Send Sucessfully"));
      //     setTimeout(() => {
      //       dispatch(hideToast());
      //     }, 1200);
      //     setShow(false);
      //   }
    } else {
      setmessageNew("*Please fill one of the field");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handlemodalclose}>
        <Modal.Header closeButton>
          <h4 className="text-center mt-2">Missing Parts</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-2">
            <h6 className="text-capitalize">
              Let us know if you couldn&apos;t Find any Product of your Choice
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
              className="btn btn-primary button_color text-white"
              onClick={(e) => handleSubmit(e)}
            >
              Submit Enquiry
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default MissingPartsModal;
