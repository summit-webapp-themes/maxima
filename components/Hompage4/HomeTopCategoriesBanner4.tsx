import Image from 'next/image'
import React from 'react'
import { CONSTANTS } from '../../services/config/app-config';
import categoriesBanner from "../../public/assets/images/category-banner.jpg";

const HomeTopCategoriesBanner4 = ({ homeTopCategories }: any) => {
  console.log("homeTopCategories banner in render", homeTopCategories)
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div className='container mt-5'>
      <div className='row'>
{/*        
        {
          homeTopCategories?.length > 0 && homeTopCategories.slice(2).map((categoryBanner: any, index: any) => {
            return (
              <div className='col-lg-12 my-5 text-center' key={index}>
                <Image
                  // loader={imageLoader}
                  src={categoriesBanner}
                  // src={categoryBanner.product_img}
                  width={1300}
                  height={200}
                  alt="img"
                  style={{ height: "385px" }}
                />
              </div>

            )
          })
        } */}
         {
          homeTopCategories?.length > 0 && homeTopCategories.slice(0, 2).map((categoryBanner: any, index: any) => {
            return (
              <div className='col-lg-6' key={index}>
                <Image
                  loader={imageLoader}
                  src={categoryBanner.product_img}
                  width={800}
                  height={200}
                  alt="img"
                  style={{ height: "385px" }}
                />
              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default HomeTopCategoriesBanner4