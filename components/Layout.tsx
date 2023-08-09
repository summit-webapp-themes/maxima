import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import SecondaryThemeNavbar from "./Home_page2/SecondaryThemeNavbar/SecondaryThemeNavbar";
import SecondaryThemeFooter from "./Home_page2/SecondaryThemeFooter";

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
      {router.pathname === "/home2"
        ? toShowHeader && <SecondaryThemeNavbar />
        : toShowHeader && <Navbar />}
      {children}

      {router.pathname === "/home2"
        ? toShowFooter && <SecondaryThemeFooter />
        : toShowFooter && <Footer />}
    </>
  );
};
export default Layout;
