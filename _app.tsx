import { Provider } from "react-redux";
// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import ToastNotification from "../components/ToastNotification";
import { initializeFirebase } from "../push-notifications";
// import { initializeFirebase } from '../public/service-worker';
import { useEffect, useRef } from "react";
import LogoutList from "../services/api/auth/logout_api";
import Scrolltop from "../components/ScrollTop";

function MyApp({ Component, pageProps }: AppProps) {
  const articleRef = useRef<null | HTMLParagraphElement>(null);
  // initializeFirebase();
  // useEffect(()=>
  // {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('/service-worker.js')
  //       .then((registration) => {
  //         console.log('Service Worker registered: ', registration);
  //         // registration.pushManager.subscribe({
  //         //   userVisibleOnly: true,
  //         //   // applicationServerKey,
  //         // })
  //       })
  //       .catch((error) => {
  //         console.error('Service Worker registration failed: ', error);
  //       });
  //   }
  // },[])

  // useEffect(() => {
  //   const handleBeforeUnload = async () => {
  //     localStorage.clear();
  //     const logoutAPI = await LogoutList();
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  return (
    // <div>
    //   <Layout>
    //     <Component {...pageProps} />
    //     {/* <Scrolltop articleRef={articleRef}/> */}
    //   </Layout>
    // </div>

    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {() => (
            <div ref={articleRef}>
              <Layout>
                <ToastNotification />
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
