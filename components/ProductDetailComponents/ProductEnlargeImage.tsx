import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductEnlargeImage = (props: any) => {
  const { productImages }: any = props;
  console.log("images ", productImages);
  return (
    <>
      <ImageGallery items={productImages} />
    </>
  );
};

export default ProductEnlargeImage;
