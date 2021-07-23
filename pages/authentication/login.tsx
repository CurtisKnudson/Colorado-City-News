import * as React from "react";
import { Layout } from "@components/layout";

// Hooks
import Login from "@components/authentication/login";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <Layout>
        <Login />
        <div>
          Not on Colorado City News?{" "}
          <Link href="/authentication/signup">
            <span className="cursor-pointer underline">Sign Up</span>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default LoginPage;
