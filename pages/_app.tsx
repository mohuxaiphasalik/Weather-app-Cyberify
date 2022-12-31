import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/cus-slick-theme.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// do this only in root file like _app.tsx
export default wrapper.withRedux(MyApp);
