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

import type { AppProps } from "next/app";

function AppIndex({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default AppIndex;
