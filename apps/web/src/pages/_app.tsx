import type { AppProps } from "next/app";

import { ToastProvider } from "@web/contexts/ToastContext";
import { ReactQueryProvider } from "@web/lib/reactQuery";

import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </ReactQueryProvider>
  );
}
