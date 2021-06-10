// styling for the entire site
import "../styles/globals.scss";

// styling relating to authentication
import "../styles/auth/index.scss";
import "../styles/auth/login.scss";

//styling for sidebar
import "../styles/components/sidebar.scss";
//styling for header
import "../styles/components/header.scss";

//styling for main
import "../styles/components/main.scss";

//styling for page
import "../styles/panel/dashboard.scss";
import "../styles/panel/profile.scss";
import "../styles/panel/contact.scss";
import "../styles/panel/settings.scss";

//styling for loading
import "../styles/components/loading.scss";
import "../styles/auth/verification.scss";
import "../styles/panel/reservation.scss";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import Loading from "../components/loading";
import { ToastContainer } from "react-toastify";
import store from "../store";
import { Provider } from "react-redux";

function AppIndex({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Loading />
        <ToastContainer />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
export default AppIndex;
