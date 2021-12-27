import "../styles/globals.css";
import React from "react";
// Providers
import { SessionProvider } from "next-auth/react";
// Types
import type { AppProps } from "next/app";
import UserProfileContext from "@providers/profile/userProfileProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiProvider from "@mediator/providers/api/apiProvider";
import MediatorProvider from "@mediator/providers/mediators/mediatorProvider";
import EditorInputDataContext from "@providers/editor/editorInputContext";
import SelectedTagContext from "@providers/tags/selectedTagContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ApiProvider>
        <MediatorProvider>
          <UserProfileContext>
            <EditorInputDataContext>
              <SelectedTagContext>
                <ToastContainer />
                <Component {...pageProps} />
              </SelectedTagContext>
            </EditorInputDataContext>
          </UserProfileContext>
        </MediatorProvider>
      </ApiProvider>
    </SessionProvider>
  );
}
export default MyApp;

// Providers questions? https://github.com/nextauthjs/next-auth-example/blob/main/pages/_app.js
