import { useState } from "react";
import { CONSTANTS } from "../../services/config/app-config";

const Topbar = (props: any) => {
  const { listItems, handleToggleProductsListingView, selectedMultiLangData } =
    props;

  const [showMissingPartsModal, setShowMissingPartsModal] =
    useState<any>(false);

  const handleMissingPartsModalClose: any = () => {
    setShowMissingPartsModal(false);
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="total_result">
            <p className="mb-0 pt-0 text-color-black">
              {listItems?.length} {selectedMultiLangData?.products}
            </p>
          </div>
        </div>
      
      </div>
    </>
  );
};

export default Topbar;
