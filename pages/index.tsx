import React from "react";

// components
import { Layout } from "@components/layout";
import FrontPage from "views/frontPage";
import { toast } from "react-toastify";

export default function Home() {
  const notify = () => {
    toast("Jenna Check it out");
  };
  return (
    <>
      <Layout>
        <FrontPage />
        <div onClick={notify}>Notify Me!</div>
      </Layout>
    </>
  );
}
