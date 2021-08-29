import "../styles/globals.css";
// Providers
import { Provider } from "next-auth/client";
// Types
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
    >
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;

// Providers questions? https://github.com/nextauthjs/next-auth-example/blob/main/pages/_app.js
