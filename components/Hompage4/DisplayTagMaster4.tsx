import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONSTANTS } from "../../services/config/app-config";
import CardsLoadingLayout from "../../cards/CardsLoadingLayout";
import { useSelector } from "react-redux";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";
import { Tab, Nav, Col, Row } from 'react-bootstrap';

const DisplayTagMaster4 = (props: any) => {
  const { allTagsData } = props; // Receive the entire allTagsData array
  const [title, setTitle] = useState([]);
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  console.log(currency_state_from_redux, "title");

  if (!allTagsData || allTagsData.length === 0) {
    // Handle the case when allTagsData is undefined or empty
    return <div>No data available.</div>;
  }

  return (
    <>
      <div className="container product-offer-container ">
        <Tab.Container id="left-tabs-example" defaultActiveKey={allTagsData[0]?.tag_name}>
          <Row>
            <Col sm={3} className="product-offer-left-container ">
              <Nav variant="pills" className="flex-column text-center ">
                {allTagsData.map((item: any, index: number) => (
                  <Nav.Item key={index} >
                    <Nav.Link eventKey={item.tag_name}>
                      {item.tag_name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9} className="product-offer-right-container">
              <Tab.Content>
                {allTagsData.map((item: any, index: number) => (
                  <Tab.Pane key={index} eventKey={item.tag_name}>
                    <div className="row justify-content-center">
                      {item?.value?.length > 0 ? (
                        <>
                          {item?.value?.length > 0 &&
                            item?.value?.map((list: any, i: any) => (
                              <div
                                className="border mx-2 mt-5 displaytag-list home4-displaytag-list"
                                key={i}
                              >
                                <div
                                  className="product-wrap"
                                  // style={{ border: "2px solid red" }}
                                >
                                  <div className="product text-center">
                                    <figure className="product-media">
                                      {list?.image_url !== null &&
                                      list?.image_url?.length > 0 ? (
                                        <>
                                          <Link
                                            href={`${list.url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                                          >
                                            <Image
                                              loader={imageLoader}
                                              src={list?.image_url}
                                              alt="Product"
                                              width="300"
                                              height="300"
                                            />
                                          </Link>
                                        </>
                                      ) : (
                                        <>
                                          <Link
                                            href={`${list.url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                                          >
                                            <Image
                                              // loader={imageLoader}
                                              src={
                                                list?.image_url !== null
                                                  ? list?.image_url
                                                  : "/assets/images/maximaCard.jpg"
                                              }
                                              alt="Product"
                                              width="300"
                                              height="300"
                                            />
                                          </Link>
                                        </>
                                      )}
                                    </figure>
                                    <div
                                      className="home4-product-details"
                                      // style={{
                                      //   border: "2px solid red",
                                       
                                      // }}
                                    >
                                      <h4 className="product-name truncate-overflow">
                                        <Link
                                          href={`${list.url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                                        >
                                          {list.item_name}
                                        </Link>
                                      </h4>
                                      <div className="product-price">
                                        <ins className="new-price">
                                          ₹{list?.price}
                                        </ins>
                                        <del className="old-price">
                                          ₹{list?.mrp_price}
                                        </del>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </>
                      ) : (
                        <div className="row justify-content-center">
                          {[...Array(10)].map((_, i) => (
                            <div className="col-lg-2 mx-3" key={i}>
                              <CardsLoadingLayout />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
};

export default DisplayTagMaster4;
