import "../styles/globals.css";
// Providers
import { Provider as SessionProvider } from "next-auth/client";
// Types
import type { AppProps } from "next/app";
import UserApiProvider from "mediator/providers/api/userApiProvider";
import UserMediatorProvider from "mediator/providers/userMediatorProvider";

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
          <Component {...pageProps} />
        </UserMediatorProvider>
      </UserApiProvider>
    </SessionProvider>
  );
}
export default MyApp;

// Providers questions? https://github.com/nextauthjs/next-auth-example/blob/main/pages/_app.js
