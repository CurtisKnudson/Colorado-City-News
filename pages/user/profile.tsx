import React from "react";
import { NeedsAuthentication } from "@components/authentication";
import { useSession } from "next-auth/client";
import { Layout } from "@components/layout";
import { useUserMediator } from "mediator/providers/userMediatorProvider";

const Profile = () => {
  const mediator = useUserMediator();
  const [session, loading] = useSession();

  console.log(loading);

  return (
    <Layout>
      {loading ? <div>Loading please wait</div> : <div>hello</div>}
    </Layout>
  );
};

export default Profile;
