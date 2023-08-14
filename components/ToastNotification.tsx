import { Toast, ToastContainer } from "react-bootstrap";
import { notiifcationBar } from "../store/slices/general_slices/toast_notification_slice";
import { useDispatch, useSelector } from "react-redux";
interface props {
  setShow: any;
  show: any;
  content: any;
}

const ToastNotification = () => {
  const selector_state: any = useSelector(notiifcationBar);
  return (
    <ToastContainer className="p-3 toast_custom_css ">
      <Toast show={selector_state?.show} delay={3000} autohide>
        <Toast.Body
          className="p-4 toast_custom"
          style={{ backgroundColor: selector_state?.bgColor, color: "white" }}
        >
          {selector_state?.data}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
export default ToastNotification;
