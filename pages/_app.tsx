import "../styles/globals.css";
import React from "react";
// Providers
import { Provider as SessionProvider } from "next-auth/client";
// Types
import type { AppProps } from "next/app";
import UserApiProvider from "mediator/providers/api/userApiProvider";
import UserMediatorProvider from "mediator/providers/userMediatorProvider";
import UserProfileContext from "@providers/profile/userProfileProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
    >
      <UserApiProvider>
        <UserMediatorProvider>
          <UserProfileContext>
            <ToastContainer />
            <Component {...pageProps} />
          </UserProfileContext>
        </UserMediatorProvider>
      </UserApiProvider>
    </SessionProvider>
  );
}
export default MyApp;

// Providers questions? https://github.com/nextauthjs/next-auth-example/blob/main/pages/_app.js
