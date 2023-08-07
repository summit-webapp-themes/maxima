import Image from "next/image";
import { CONSTANTS } from "../../../../services/config/app-config";
import useMultiLingual from "../../../../hooks/LanguageHook/multilingual-hook";

const CustomerVariants = ({
  productVariants,
  selectedVariant,
  thumbnailOfVariants,
  handleVariantSelect,
  doesSelectedVariantDoesNotExists,
  stockDoesNotExistsForSelectedVariants,
}: any) => {
  const languageData = useMultiLingual();

  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  const showThumbnailOnBtn = (attr: any) => {
    if (Object.keys(thumbnailOfVariants).length > 0 && attr?.field_name) {
      return (
        <>
          {attr?.values?.map((attribute_value: string, index: number) => {
            console.log(
              "thumbnail of variants each",
              thumbnailOfVariants[attr?.field_name][index]
            );
            return (
              <>
                <button
                  type="button"
                  className={`btn mb-3 btn_thumb_size p-0 mx-3
                              ${
                                attribute_value ===
                                selectedVariant[attr?.field_name]
                                  ? "active"
                                  : ""
                              }
                              `}
                  onClick={() =>
                    handleVariantSelect(attr.field_name, attribute_value)
                  }
                  value={attribute_value}
                  key={index}
                >
                  <Image
                    loader={myLoader}
                    src={`${thumbnailOfVariants[attr?.field_name][index]}`}
                    alt="variant image"
                    className="img-fluid"
                    width={50}
                    height={50}
                  />
                </button>
              </>
            );
          })}
        </>
      );
    }
    return 0;
  };
  return (
    <div className="size_btn_block">
      <div>
        {productVariants?.attributes?.length > 0 &&
          productVariants?.attributes?.map((attribute: any, index: number) => {
            return (
              <>
                <div>
                  <h6 className="product_feature_heading">
                    {attribute?.label}:
                    <span className="product_feature_heading_span">
                      {" "}
                      {selectedVariant[attribute.field_name]}
                    </span>{" "}
                  </h6>
                </div>

                <div className="d-flex flex-wrap">
                  {attribute?.display_thumbnail ? (
                    showThumbnailOnBtn(attribute)
                  ) : (
                    <>
                      {attribute?.values?.map(
                        (attribute_value: string, index: number) => {
                          return (
                            <>
                              <button
                                type="button"
                                className={`btn mb-3 btn_size mx-2 py-3 
                    ${
                      attribute_value === selectedVariant[attribute?.field_name]
                        ? "active"
                        : ""
                    }
                    `}
                                onClick={() =>
                                  handleVariantSelect(
                                    attribute.field_name,
                                    attribute_value
                                  )
                                }
                                value={attribute_value}
                                key={index}
                              >
                                {attribute_value}
                              </button>
                            </>
                          );
                        }
                      )}
                    </>
                  )}
                </div>
              </>
            );
          })}
      </div>
      {doesSelectedVariantDoesNotExists && (
        <p style={{ color: "red" }}>{languageData?.currently_unavailable}</p>
      )}
      {stockDoesNotExistsForSelectedVariants && (
        <p style={{ color: "red" }}>{languageData?.item_out_of_stock}</p>
      )}
    </div>
  );
};

export default CustomerVariants;
