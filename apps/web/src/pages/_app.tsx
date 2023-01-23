import type { AppProps } from "next/app";

import { ReactQueryProvider } from "@web/lib/reactQuery";

import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
    </ReactQueryProvider>
  );
}
