import { Provider } from "react-redux";
// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import { ToastContainer } from "react-toastify";
import { initializeFirebase } from "../push-notifications";
import { useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import Scrolltop from "../components/ScrollTop";
import Script from "next/script";
import ReactGA from "react-ga";

function MyApp({ Component, pageProps }: AppProps) {
  const articleRef = useRef<null | HTMLParagraphElement>(null);
  initializeFirebase();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered: ", registration);
          // registration.pushManager.subscribe({
          //   userVisibleOnly: true,
          //   // applicationServerKey,
          // })
        })
        .catch((error) => {
          console.error("Service Worker registration failed: ", error);
        });
    }
    const TRACKING_ID = "G-JEKLX6CZRT";
    ReactGA.initialize(TRACKING_ID);
  }, []);

  return (
    <div>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-JEKLX6CZRT"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-JEKLX6CZRT');
        `}
      </Script>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {() => (
            <div ref={articleRef}>
              <Layout>
                {/* <ToastNotification /> */}
                <ToastContainer
                  position="top-right"
                  autoClose={8000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  draggable={false}
                  // pauseOnVisibilityChange
                  closeOnClick
                  pauseOnHover
                />
                <Component {...pageProps} />
                <Scrolltop articleRef={articleRef} />
              </Layout>
            </div>
          )}
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
