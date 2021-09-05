import React, { useState } from "react";
import { NeedsAuthentication } from "@components/authentication";
import { useSession } from "next-auth/client";
import { Layout } from "@components/layout";
import { useUserMediator } from "@mediator/providers/userMediatorProvider";
import { Avatar } from "@components/profile";
import { UserProfileContext } from "@providers/profile";
import { UserProfileInfo } from "@providers/profile/userProfileProvider";

const Profile = () => {
  const mediator = useUserMediator();
  const [session, loading] = useSession();
  const [userProfileData, setUserProfileData] = useState<UserProfileInfo>({
    name: "",
    email: "",
    image: "",
  });

  const handleSave = () => {
    console.log(userProfileData);
  };

  return (
    <UserProfileContext.Provider value={[userProfileData, setUserProfileData]}>
      <Layout>
        {loading ? (
          <div>Loading please wait</div>
        ) : (
          <NeedsAuthentication>
            <Avatar />
            <div className="cursor-pointer" onClick={handleSave}>
              Save
            </div>
          </NeedsAuthentication>
        )}
      </Layout>
    </UserProfileContext.Provider>
  );
};

export default Profile;
