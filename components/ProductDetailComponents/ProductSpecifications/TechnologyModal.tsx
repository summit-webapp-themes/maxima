import Image from "next/image";
import React from "react";
import { Modal } from "react-bootstrap";
import { CONSTANTS } from "../../../services/config/app-config";

const TechnologyModal = ({ show, toHide, TechModalData }: any) => {
  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <Modal show={show} onHide={toHide}>
        {TechModalData?.length > 0 &&
          TechModalData.map((details: any, index: any) => {
            return (
              <div key={index}>
                <Modal.Header closeButton>
                  <Modal.Title className="bold fs-1">
                    {details.title}
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  {details.image !== null && details.image !== "" && (
                    <div className="text-center">
                      <Image
                        className="card-img-top px-1 img-fluid"
                        loader={myLoader}
                        src={`${details?.image}`}
                        alt="brand img"
                        width={470}
                        height={264}
                      />
                    </div>
                  )}

                  <p>{details?.description}</p>
                  <p className="card-text features w-100">
                    {details?.video_frame !== null &&
                    details?.video_frame !== "" ? (
                      <div>
                        <iframe
                          src={details?.video_frame}
                          className="w-100 my-2"
                          height="200"
                          allowFullScreen
                          allow="autoplay"
                        ></iframe>
                      </div>
                    ) : (
                      ""
                    )}
                  </p>
                </Modal.Body>
              </div>
            );
          })}
      </Modal>
    </>
  );
};

export default TechnologyModal;
