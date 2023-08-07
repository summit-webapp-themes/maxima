import React from "react";
import Image from "next/image";
import notfound404_img from "../public/assets/images/404imgb2b1.png";
import Link from "next/link";
const Pagenotfound = () => {
  return (
    <>
      <div className={`container  notfound_container`}>
        <Image
          src={notfound404_img}
          width={120}
          height={110}
          alt="page not found image"
        ></Image>
        <h3 className="notfound_heading">Looking for something ?</h3>
        <p className="notfound_p">
          We&apos;re sorry. The Web address you entered is not a functioning
          page on our site.
        </p>
        <Link href="/">
          <button className={`btn btn-danger notfound_btn`}>
            Go to Homepage
          </button>
        </Link>
      </div>

    </>
  );
};

export default Pagenotfound;




