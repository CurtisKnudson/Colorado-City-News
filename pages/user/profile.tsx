import React, { useState } from "react";
import { NeedsAuthentication } from "@components/authentication";
import { useSession } from "next-auth/client";
import { Layout } from "@components/layout";
import { useUserMediator } from "@mediator/providers/userMediatorProvider";
import { Avatar, UserInfo } from "@components/profile";
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

  const handleSave = async () => {
    if (
      userProfileData.name &&
      userProfileData.email &&
      userProfileData.image
    ) {
      const userProfile = await mediator
        .completeUserProfile(userProfileData)
        .then((res) => {
          return res;
        })
        .catch((err) => {});
      console.log(userProfile);
      return userProfile;
    }
  };

  return (
    <UserProfileContext.Provider value={[userProfileData, setUserProfileData]}>
      <Layout>
        {loading ? (
          <div>Loading please wait</div>
        ) : (
          <NeedsAuthentication>
            <Avatar />
            <UserInfo
              email={
                typeof session!.user!.email! === "string"
                  ? session!.user!.email
                  : "No Email Found"
              }
            />
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
