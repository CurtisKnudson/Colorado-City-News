import * as React from "react";
import Link from "next/link";

// components
import { Layout } from "@components/layout";
import Signup from "@components/authentication/signup";

const LoginPage = () => {
  return (
    <>
      <Layout>
        <Signup />
        <div>
          Already on Colorado City News?
          <Link href="/authentication/login">
            <span className="cursor-pointer underline">Login</span>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default LoginPage;
