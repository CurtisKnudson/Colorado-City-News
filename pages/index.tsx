import React from "react";

// components
import { Layout } from "@components/layout";
import FrontPage from "views/frontPage";

// constants
import { config } from "@constants/config";
// types
import { GetStaticProps } from "next";

export default function Home() {
  return (
    <>
      <Layout>
        <FrontPage />
      </Layout>
    </>
  );
}
