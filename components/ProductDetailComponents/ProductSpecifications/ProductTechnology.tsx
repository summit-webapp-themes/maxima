import Image from "next/image";
import React, { useState } from "react";
import { CONSTANTS } from "../../../services/config/app-config";
import TechnologyModal from "./TechnologyModal";

const ProductTechnology = ({ technologyData, selectedMultiLangData }: any) => {
  console.log("technologies", technologyData);

  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const [showEditModal, setshowEditModal] = useState<boolean>(false);
  const [detailData, setdetailData] = useState<any>();

  const handleEditModal: any = (cardData: any) => {
    setshowEditModal(!showEditModal);
    setdetailData(cardData);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          {technologyData?.details?.length > 0 &&
            technologyData?.details.map((cardDetails: any, index: any) => {
              return (
                <div className="col-lg-3 my-3 my-lg-0" key={index}>
                  <div className="card h-100 rounded-2">
                    <div className="h-100">
                      <Image
                        className="card-img-top px-1"
                        loader={myLoader}
                        src={`${cardDetails?.image}`}
                        alt="technology img"
                        width={140}
                        height={100}
                      />
                    </div>
                    <div className="card-body p-4">
                      <h5 className="card-title products-name">
                        {cardDetails.name}
                      </h5>
                      <p className="card-text products-name">
                        {cardDetails.description}
                      </p>
                      {cardDetails.technology_details?.length > 0 && (
                        <button
                          type="button"
                          className="text-light fs-4 button_color product-font-family"
                          onClick={() => {
                            handleEditModal(cardDetails?.technology_details);
                          }}
                        >
                          {selectedMultiLangData?.learn_more}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {showEditModal ? (
        <TechnologyModal
          show={showEditModal}
          toHide={handleEditModal}
          TechModalData={detailData}
        />
      ) : null}
    </>
  );
};

export default ProductTechnology;
