import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Thankyouimg from "../../public/assets/images/thankyou-img.png";
import OrderDetail from "../OrderDetails/OrderDetail";

const ThankYou = ({ }: any) => {

  useEffect(() => {
    // ga.event({
    //     action: "page_view",
    //     params: {
    //       not_set: thankyou[2]
    //     },
    //   });
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="text-center mx-auto col-md-12">
            <Image
              src={Thankyouimg}
              className="mb-1 success_thanku thankyou-img-b2b"
              width={100}
              height={100}
              alt="success_img"
            />
            <h3 className="black bold">Thank You!</h3>
            <h5 className="black mb-8">Your order has been received</h5>
          </div>
        </div>
        <OrderDetail />
      </div>
    </>
  );
};

export default ThankYou;
