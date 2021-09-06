import React from "react";

// components
import { Layout } from "@components/layout";
import FrontPage from "views/frontPage";
import { toast } from "react-toastify";

export default function Home() {
  return (
    <>
      <Layout>
        <FrontPage />
      </Layout>
    </>
  );
}
