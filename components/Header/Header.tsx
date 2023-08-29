import { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import favicon from "../../public/img/sns_favicon.png";
interface IMetaData {
  meta_data?: any;
  url: string;
}
const Header = ({ meta_data }: any) => {
  console.log("meta data incoming", meta_data);
  const router = useRouter();
  let isDealer: any;
  if (typeof window !== "undefined") {
    isDealer = localStorage.getItem("isDealer");
  }

  return (
    <Head>
      <title>
        {meta_data !== undefined && meta_data !== null
          ? Object?.keys(meta_data)?.length > 0
            ? meta_data?.meta_title
            : "Summit E-Commerce - A Comprehensive E-Commerce Solution"
          : ""}
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="keywords"
        content={
          meta_data !== undefined &&
          meta_data !== null &&
          Object?.keys(meta_data)?.length > 0
            ? meta_data?.meta_title
            : "Summit E-Commerce - A Comprehensive E-Commerce Solution"
        }
      />
      <meta
        name="description"
        content={
          meta_data !== undefined &&
          meta_data !== null &&
          Object?.keys(meta_data)?.length > 0
            ? meta_data?.description
            : "Summit E-Commerce - A Comprehensive E-Commerce Solution"
        }
      />
      <meta
        name="robots"
        content={
          meta_data !== undefined &&
          meta_data !== null &&
          Object?.keys(meta_data)?.length > 0
            ? meta_data?.robot_name
            : "index"
        }
      />
      <meta property="og:image" content="" />
      <meta
        property="og:title"
        content={
          meta_data !== undefined &&
          meta_data !== null &&
          Object?.keys(meta_data)?.length > 0
            ? meta_data?.meta_title
            : "Summit E-Commerce - A Comprehensive E-Commerce Solution"
        }
      />
      <meta
        property="og:description"
        content={
          meta_data !== undefined &&
          meta_data !== null &&
          Object?.keys(meta_data)?.length > 0
            ? meta_data?.description
            : "Summit E-Commerce - A Comprehensive E-Commerce Solution"
        }
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={``} />
      <link rel="canonical" href="$OG_URL" />
      <meta
        name="description"
        content="Summit E-Commerce - A Comprehensive E-Commerce Solution"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Header;
