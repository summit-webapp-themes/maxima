import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Product_Feature } from '../../dataSets/productFeature';

const ProductFeature = ({ productDetails }: any) => {
  console.log(productDetails.item_name);
  const [filterProductData, setFilterData] = useState<any>('');
  useEffect(() => {
    const filterProductFeacture = Product_Feature.filter(
      (name) => name.name === productDetails.item_name
    );
    setFilterData(filterProductFeacture);
  }, [productDetails]);
  console.log(filterProductData);
  return (
    <div className="container product_feature my-5">
      <div className="row">
        <div className="col-12">
          <h3 className="features-heading mb-2">PRODUCT FEATURE</h3>
          <h5>See a detailed description of the product below</h5>
        </div>
      </div>
      {filterProductData.length > 0 && (
        <>
          <Carousel controls={false} interval={100000}>
            {filterProductData[0].feature.map((data: any, index: number) => {
              console.log(data);
              return (
                <Carousel.Item key={index}>
                  <div className="row feature-carousal">
                    <div className="col-sm-7 img-cont">
                      <img src={`${data.img}`} alt="" className="img-fluid" />
                    </div>
                    <div className="col-sm-5 p-3 detail-cont">
                      <div className="p-5">
                        <h3 className="text-uppercase features-heading">
                          {data.title}
                        </h3>
                        <h5>{data.detail}</h5>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </>
      )}
    </div>
  );
};

export default ProductFeature;
