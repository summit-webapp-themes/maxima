import React from "react";
import Link from "next/link";
import deleteCatalog from "../../services/api/product-catalog-api/delete-catalog-api";

const CatalogListCard = ({ catalogListItem,handleDeleteCatalog }: any) => {
  console.log(catalogListItem, "catalogListItem");
  return (
    <>
      <div className="row mb-4">
      <h3>Catalog List</h3>
        {catalogListItem?.length>0 && catalogListItem?.map((catalog:any, i:any)=>(
        <div className="col-md-6 mt-4 " key={i}>
          <div className="card">
            <h5 className="card-header text-uppercase">{catalog?.name}</h5>
            <div className="card-body">
              <p className="card-text">
              product counts :{catalog?.product_counts}
              </p>
              <Link href="#" className="btn btn-primary mr-2">
                View Catalog Product
              </Link>
              <Link href="#" className="btn btn-primary mr-2">
               Add Product
              </Link>
              <Link href="#" className="btn btn-primary mr-2" onClick={()=>handleDeleteCatalog(catalog?.name)}>
               Delete Catalog
              </Link>
            </div>
          </div>
        </div>))}
      </div>
    </>
  );
};

export default CatalogListCard;
