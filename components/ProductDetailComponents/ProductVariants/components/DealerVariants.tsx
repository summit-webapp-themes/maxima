import React, { useState } from "react";

const DealerVariants = ({
  variants,
  variantsData,
  selectedMultiLangData,
}: any) => {
  const [Quanties, setQuanties] = useState<any>();
  const [newobject, setnewObject] = useState<any>([]);

  let newarry: any;

  console.log("dealer variant", variants);

  const InputvalchangeHandler = (e: any, variant_code: any) => {
    console.log("inputtt", variant_code, e.target.value);
    if (e?.target?.value !== "") {
      newarry = newobject?.find((item: any) => {
        return item?.item_code === variant_code;
      });
      console.log(newarry);
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

  return (
    <div>
      <table className="mx-auto mb-0 inventory_table table table-sm dealer_variants_table">
        <tbody>
          <div className="d-flex">
            <div className="pe-3 inventory inventory_font">
              <i className="fa fa-check-circle green ">&nbsp;</i>
              <span className="bold">{selectedMultiLangData?.available}</span>
            </div>
            <div className="pe-3 inventory_font">
              <i className="fa fa-clock-o yellow">&nbsp;</i>
              <span className="bold">
                {selectedMultiLangData?.future_availability}
              </span>
            </div>
            <div className="pe-3 inventory_font">
              <i className="fa fa-times-circle red">&nbsp;</i>
              <span className="bold">{selectedMultiLangData?.sold_out}</span>
            </div>
          </div>

          {Object.keys(variants)?.length > 0 &&
          variants?.variants.length > 0 ? (
            variants?.variants.map((item: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="b2bborder_bottom">
                    <div>
                      <div className="d-flex mb-1">
                        <div className="pe-3 col-lg-5 col-md-4 col-sm-6 sku_code sku_code_qty">
                          {selectedMultiLangData?.sku_code}: :{" "}
                          <span className="bold">{item?.variant_code}</span>
                        </div>
                        <div className="pe-3 col-md-6 col-sm-6 variation_code sku_code_qty">
                          {selectedMultiLangData?.variation}:{" "}
                          <span className="bold">
                            {item?.size}-{item?.colour}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex mb-1 align-items-center">
                        <div className="d-flex align-items-center product_quantity">
                          <div className="pe-3 sku_code_qty">
                            {selectedMultiLangData?.quantity}:
                          </div>
                          <div>
                            <div className="pe-3">
                              <input
                                type="number"
                                className="form-control varient_input"
                                min="0"
                                value={Quanties}
                                name={item?.variant_code}
                                onChange={(e) => {
                                  InputvalchangeHandler(e, item?.variant_code);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pe-3 quantity_avail">
                          {item.stock ? (
                            <i className="fa fa-check-circle green stock_circle"></i>
                          ) : (
                            <i className="fa fa-times-circle red stock_circle"></i>
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
                {selectedMultiLangData?.sku_code} : {variants.item_code}
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
                          value={Quanties}
                          name={variants.item_code}
                          onChange={(e) => {
                            InputvalchangeHandler(e, variants.item_code);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DealerVariants;
