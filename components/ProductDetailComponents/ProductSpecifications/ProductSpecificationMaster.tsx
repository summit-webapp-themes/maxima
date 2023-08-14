import ProductSpecification from "./ProductSpecification";
import ProductTechnology from "./ProductTechnology";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const ProductSpecificationMaster = ({
  specifications,
  selectedMultiLangData,
}: any) => {
  console.log("specifications in master", specifications);
  const [key, setKey] = useState<any>(0);

  return (
    <>
      <div className="container mt-3">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 specs_tabs"
        >
          {specifications?.length > 0 &&
            specifications !== null &&
            specifications.map((specsData: any, index: any) => {
              console.log("specs name", specsData, index);
              return (
                <Tab eventKey={index} title={specsData.name} key={index}>
                  {specsData.name === "Specifications" && (
                    <ProductSpecification specificationData={specsData} />
                  )}
                  {specsData.name === "Technologies" && (
                    <ProductTechnology
                      technologyData={specsData}
                      selectedMultiLangData={selectedMultiLangData}
                    />
                  )}
                </Tab>
              );
            })}
        </Tabs>
      </div>
    </>
  );
};

export default ProductSpecificationMaster;
