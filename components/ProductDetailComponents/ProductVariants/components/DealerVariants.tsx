import React, { useEffect, useState } from "react";

const DealerVariants = ({
  productDetailData,
  variants,
  variantsData,
  selectedMultiLangData,
  minOrderQty,
  setSingleProductForAddToCart,
  singleProductForAddToCart
}: any) => {

  const [newobject, setnewObject] = useState<any>([]);
  let newarry: any;

  useEffect(() => {
    if (variants?.variants?.length > 0) {
    } else {
      if (minOrderQty === 0) {
        let objs: any = {
          item_code: productDetailData?.name,
          quantity: 1,
        };
        let newarrys = singleProductForAddToCart?.filter(
          (item: any) => item?.item_code !== objs?.item_code
        );
        console.log("new object1", newarrys);
        setSingleProductForAddToCart([...newarrys, objs]);
      } else {
        let objs: any = {
          item_code: productDetailData?.name,
          quantity: minOrderQty,
        };
        let newarrys = singleProductForAddToCart?.filter(
          (item: any) => item?.item_code !== objs?.item_code
        );
        console.log("new object1", newarrys);
        setSingleProductForAddToCart([...newarrys, objs]);
      }
    }
  }, []);

  const InputvalchangeHandlerSingleProduct: any = (e: any, variant_code: any) => {
    console.log("input", variant_code, e.target.value, newobject);
    newarry = singleProductForAddToCart?.find((item: any) => {
      return item?.item_code === variant_code;
    });
    if (e?.target?.value !== "") {

      console.log("input updated new array", newarry);
      if (newarry) {
        setSingleProductForAddToCart(
          singleProductForAddToCart?.map((item: any) => {
            if (item?.item_code === variant_code) {
              return { item_code: variant_code, quantity: e?.target?.value };
            } else {
              return item;
            }
          })
        );
      } else {
        let obj: any = { item_code: variant_code, quantity: e?.target?.value };

        setSingleProductForAddToCart([...singleProductForAddToCart, obj]);
      }

    }
  };
  const InputvalchangeHandlerForVariants: any = (e: any, variant_code: any) => {
    console.log("input", variant_code, e.target.value, newobject);
    newarry = newobject?.find((item: any) => {
      return item?.item_code === variant_code;
    });
    if (e?.target?.value !== "") {

      console.log("input updated new array", newarry);
      if (newarry) {
        setnewObject(
          newobject?.map((item: any) => {
            if (item?.item_code === variant_code) {
              return { item_code: variant_code, quantity: e?.target?.value };
            } else {
              return item;
            }
          })
        );
      } else {
        let obj: any = { item_code: variant_code, quantity: e?.target?.value };

        setnewObject([...newobject, obj]);
      }

    } else {
      let objs: any = { item_code: variant_code, quantity: e?.target?.value };
      let newarrys = newobject?.filter(
        (item: any) => item?.item_code !== objs?.item_code
      );
      setnewObject([...newarrys, objs]);
    }
  };
  variantsData(newobject);

  console.log("input qty", newobject, variantsData, singleProductForAddToCart);
  console.log("input qty single", singleProductForAddToCart);
  console.log("detail payload qty", minOrderQty);
  console.log('variant', productDetailData)

  return (
    <div>
      <table className="mx-auto mb-0 inventory_table table table-sm dealer_variants_table">
        <tbody>
          <div className="d-flex">
            <div className="pe-lg-3 pe-0 inventory inventory_font">
              <i className="fa fa-check-circle green my-auto">&nbsp;</i>
              <span className="bold">{selectedMultiLangData?.available}</span>
            </div>
            {/* <div className="pe-lg-3 pe-0 inventory_font">
              <i className="fa fa-clock-o yellow">&nbsp;</i>
              <span className="bold">
                {selectedMultiLangData?.future_availability}
              </span>
            </div> */}
            <div className="pe-lg-3 pe-0 inventory_font">
              <i className="fa fa-times-circle red">&nbsp;</i>
              <span className="bold">{selectedMultiLangData?.sold_out}</span>
            </div>
          </div>

          {productDetailData && productDetailData?.variants.length > 0 ? (
            productDetailData?.variants.map((item: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="b2bborder_bottom">
                    <div>
                      <div className="d-flex mb-1">
                        <div className="pe-3 col-lg-5 col-md-4 col-sm-6 sku_code sku_code_qty">
                          {selectedMultiLangData?.sku_code}:{" "}
                          <span className="bold">{item.variant_code}</span>
                        </div>
                        <div className="pe-3 col-md-6 col-sm-6 variation_code sku_code_qty">
                          {selectedMultiLangData?.variation}:{" "}
                          <span className="bold">
                            {item?.Size}-{item?.Colour}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex mb-1 align-items-center row">
                        <div className="d-flex align-items-center product_quantity col-lg-5 col-md-4 col-sm-6">
                          <div className="pe-3 sku_code_qty">
                            {selectedMultiLangData?.quantity}:
                          </div>
                          <div>
                            <div className="pe-3">
                              <input
                                type="number"
                                className="form-control varient_input"
                                min="0"
                                name={item?.variant_code}
                                defaultValue={0}
                                onChange={(e) => {
                                  InputvalchangeHandlerForVariants(e, item?.variant_code);
                                }}
                                disabled={!item?.stock}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pe-3 col-md-6 col-sm-6">
                          {item?.stock ? (
                            <>
                              <i className="fa fa-check-circle green stock_circle"></i>
                              <span className="bold ps-2">{selectedMultiLangData?.available}</span>

                            </>

                          ) : (
                            <>
                              <i className="fa fa-times-circle red stock_circle"></i>
                              <span className="bold ps-2">{selectedMultiLangData?.sold_out}</span>
                            </>

                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <>
              <div className="b2bborder_bottom mt-3">
                {selectedMultiLangData?.sku_code} : {productDetailData.name}
              </div>
              <div>
                <div className="d-flex mb-1 align-items-center">
                  <div className="d-flex align-items-center product_quantity">
                    <div className="pe-3 sku_code_qty">
                      {" "}
                      {selectedMultiLangData?.quantity}:
                    </div>
                    <div>
                      <div className="pe-3">
                        <input
                          type="number"
                          className="form-control varient_input"
                          min="0"
                          defaultValue={`${minOrderQty === 0 ? "1" : minOrderQty}`}
                          name={productDetailData.name}
                          onChange={(e) => {
                            InputvalchangeHandlerSingleProduct(e, productDetailData.name);
                          }}
                        />
                      </div>
                     
                    </div>
                  
                    <div className="pe-3 quantity_avail">
                      {productDetailData.in_stock_status ? (
                        <>
                          <i className="fa fa-check-circle green stock_circle"></i>
                          <span className="bold ps-3">{selectedMultiLangData?.available}</span>

                        </>

                      ) : (
                        <>
                          <i className="fa fa-times-circle red stock_circle"></i>
                          <span className="bold ps-3">{selectedMultiLangData?.sold_out}</span>
                        </>

                      )}
                    </div>
                  </div>
                </div>
                <>
                     {productDetailData?.min_order_qty !== 0 ? (
                            <p className="">
                              {selectedMultiLangData?.minimum_order_qty}:
                              {productDetailData?.min_order_qty}
                            </p>
                          ) : (
                            ""
                          )}
                    </>
              </div>
            </>
          )
          }
        </tbody>
      </table>
    </div>
  );
};

export default DealerVariants;
