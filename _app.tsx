import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { persistor, store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from '../components/Layout';
import '../styles/globals.scss';
import { ToastContainer } from 'react-toastify';
import { initializeFirebase } from '../push-notifications';
import { useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Scrolltop from '../components/ScrollTop';
import Script from 'next/script';
import ReactGA from 'react-ga';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the GoogleOAuthProvider

function MyApp({ Component, pageProps }: AppProps) {
  const articleRef = useRef<null | HTMLParagraphElement>(null);
  initializeFirebase();
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered: ', registration);
          // registration.pushManager.subscribe({
          //   userVisibleOnly: true,
          //   // applicationServerKey,
          // })
        })
        .catch((error) => {
          console.error('Service Worker registration failed: ', error);
        });
    }
    const TRACKING_ID = 'G-JEKLX6CZRT';
    ReactGA.initialize(TRACKING_ID);
  }, []);

  useEffect(() => {
    const isRTL = document.documentElement.dir === 'rtl';
    if (isRTL) {
      const link = document.createElement('link');
      link.href = '../styles/pages/CssLayout-rtl.scss'; // Replace with the correct path
      link.rel = 'stylesheet';
      link.type = 'text/css';
      document.head.appendChild(link);
    }
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
          <GoogleOAuthProvider clientId="167615153572-iv0g38n21f9in6js7mjec0jql03coicm.apps.googleusercontent.com"> {/* Add your Google OAuth Client ID */}
            <div ref={articleRef}>
              <Layout>
                <ToastContainer
                  position="top-right"
                  autoClose={8000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  draggable={false}
                  closeOnClick
                  pauseOnHover
                />
                <Component {...pageProps} />
                <Scrolltop articleRef={articleRef} />
              </Layout>
            </div>
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
