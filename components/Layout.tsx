import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const toShowHeader =
    router.pathname === "/login" ||
    router.pathname === "/register" ||
    router.pathname === "/forgot_password"
      ? false
      : true;
  const toShowFooter =
    router.pathname === "/login" ||
    router.pathname === "/register" ||
    router.pathname === "/forgot_password"
      ? false
      : true;

  return (
    <>
      
      {toShowHeader && <Navbar />} 
      {children}
      {toShowFooter && <Footer />}
    </>
  );
};
export default Layout;
