import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Layout } from "@components/layout";
import { useUserMediator } from "@mediator/providers/userMediatorProvider";
import { Avatar, UserInfo } from "@components/profile";
import { toast } from "react-toastify";

const Profile = () => {
  const { status } = useSession({
    required: true,
  });

  return (
    <Layout>
      {status === "loading" ? (
        <div>Loading please wait</div>
      ) : (
        <>
          <Avatar />
          <UserInfo />
          <div className="cursor-pointer border rounded w-14 center-all mx-auto mt-4">
            Save
          </div>
        </>
      )}
    </Layout>
  );
};

export default Profile;
