import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import { CONSTANTS } from "../../services/config/app-config";

const CatalogListCard = ({
  catalogListItem,
  handleDeleteCatalog,
  name,
  currency_state_from_redux,
  selectedMultiLangData,
}: any) => {
  console.log(name, "CatalogName");
  const dispatch = useDispatch();
  const tokens = useSelector(get_access_token);
  const token = tokens.token;

  console.log(catalogListItem, "catalogListItem");
  return (
    <>
      <div className="row mt-5 mb-0 d-flex justify-content-center mx-auto pb-0" >
        <div className="col-lg-7 catalog-wrapper text-center  " >
       
          <h4 className="text-captilize pb-2 color-black fs-20" >
            {selectedMultiLangData?.catalog_list}
          </h4>
          

          {catalogListItem?.length > 0 &&
            catalogListItem?.map((catalog: any, i: any) => (
              <div className="col-md-12 col-lg-12 mt-4 mb-0  " key={i}>
                <div className="card catalogListing-card rounded-3 mb-5">
                  <div className="card-header catalogListing-cardHeader d-flex justify-content-between">
                    <h5 className="text-uppercase catalog-heading">
                      {catalog?.name}
                    </h5>
                    <p className="card-text d-inline-flex">
                      {selectedMultiLangData?.product_count} :
                      <span className="catalog-count ps-5">
                        {catalog?.product_counts > 10
                          ? catalog?.product_counts
                          : `0${catalog?.product_counts}`}
                      </span>
                    </p>
                  </div>
                  <div className="row card-body ">
                    <div className="col-lg-5 col-md-4">
                      <Link
                        href={`/${catalog.url}?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}
                        className="btn btn-catalogview btn-colors mr-2"
                      >
                        {selectedMultiLangData?.view_catalog_product}
                        <i className="fa fa-eye px-3" aria-hidden="true"></i>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-4 my-lg-0 my-md-0 my-3 ">
                      <Link
                        href={`/product-category/?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}
                        className="btn btn-catalogAddProduct mr-2 text-dark "
                      >
                        {selectedMultiLangData?.add_product}
                        <i className="fa fa-plus px-3" aria-hidden="true"></i>
                      </Link>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <button
                        className="btn btn-catalogview btn-colors mr-lg-5"
                        onClick={() => handleDeleteCatalog(catalog?.name)}
                      >
                        {selectedMultiLangData?.delete_catalog}
                        <i
                          className="fa fa-trash-o px-3"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CatalogListCard;
