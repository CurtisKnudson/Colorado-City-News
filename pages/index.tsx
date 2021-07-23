import React from "react";

// components
import { Layout } from "@components/layout";

import FrontPage from "views/frontPage";
import { useUser } from "hooks/useUser";

export default function Home() {
  const user = useUser({});
  return (
    <Layout>
      <FrontPage />
      <div>{JSON.stringify(user, null, 2)}</div>
    </Layout>
  );
}
