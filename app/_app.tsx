"use client";

import { useEffect } from "react";
import type { AppProps } from "next/app";
import { UserProvider } from "@/lib/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(
          (registration) => {
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          },
          (error) => {
            console.log("ServiceWorker registration failed: ", error);
          }
        );
      });
    }
  }, []);

  return (
      <Component {...pageProps} />
  );
}


export default MyApp;
