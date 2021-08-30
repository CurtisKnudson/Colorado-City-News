import React from "react";
import { NeedsAuthentication } from "@components/authentication";
import { useSession } from "next-auth/client";
import { Layout } from "@components/layout";

const Profile = () => {
  const [session] = useSession();
  return (
    <Layout>
      <NeedsAuthentication>
        <div>{session?.user?.email}</div>
      </NeedsAuthentication>
    </Layout>
  );
};

export default Profile;
