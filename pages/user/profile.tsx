import React from "react";
import { NeedsAuthentication } from "@components/authentication";
import { useSession } from "next-auth/client";
import { Layout } from "@components/layout";
import { useUserMediator } from "@mediator/providers/userMediatorProvider";
import { Avatar } from "@components/profile";

const Profile = () => {
  const mediator = useUserMediator();
  const [, loading] = useSession();

  return (
    <Layout>
      {loading ? (
        <div>Loading please wait</div>
      ) : (
        <NeedsAuthentication>
          <Avatar />
        </NeedsAuthentication>
      )}
    </Layout>
  );
};

export default Profile;
