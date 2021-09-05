import React from "react";
import { NeedsAuthentication } from "@components/authentication";
import { useSession } from "next-auth/client";
import { Layout } from "@components/layout";
import { useUserMediator } from "@mediator/providers/userMediatorProvider";
import { Avatar } from "@components/profile";

const Profile = () => {
  const mediator = useUserMediator();
  const [, loading] = useSession();

  const getEmail = async () => {
    let email = await mediator.getUserByEmail("curtisknudson@gmail.com");

    console.log(email) + "I am being returned from profile.tsx";
  };

  return (
    <Layout>
      {loading ? (
        <div>Loading please wait</div>
      ) : (
        <NeedsAuthentication>
          <Avatar />
          <div className="cursor-pointer" onClick={getEmail}>
            Save
          </div>
        </NeedsAuthentication>
      )}
    </Layout>
  );
};

export default Profile;
