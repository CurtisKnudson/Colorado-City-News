import React from "react";
import { NeedsAuthentication } from "@components/authentication";
import { useSession } from "next-auth/client";
import { Layout } from "@components/layout";

const Profile = () => {
  return (
    <Layout>
      <NeedsAuthentication>
        <div>You can see me if you're authenticated</div>
      </NeedsAuthentication>
    </Layout>
  );
};

export default Profile;
