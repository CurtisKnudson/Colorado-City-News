import React from "react";
import { NeedsAuthentication } from "@components/authentication";
import { useSession } from "next-auth/client";
import { Layout } from "@components/layout";
import { useUserMediator } from "@mediator/providers/userMediatorProvider";
import { Avatar, UserInfo } from "@components/profile";
import { toast } from "react-toastify";
import { useUserProfileContext } from "@providers/profile";

const Profile = () => {
  const mediator = useUserMediator();
  const [session, loading] = useSession();
  const [userProfileData, setUserProfileData] = useUserProfileContext();

  console.log(userProfileData);

  const handleSave = async () => {
    if (
      userProfileData.name &&
      userProfileData.email &&
      userProfileData.image
    ) {
      const userProfile = async () => {
        let userProfile = await mediator
          .completeUserProfile(userProfileData)
          .then((res) => {
            setUserProfileData(res);
            return res;
          })
          .catch((err) => {
            return err;
          });
        return userProfile;
      };
      toast
        .promise(userProfile, {
          pending: "Please wait...",
          success: "Your account has been updated! 👌",
          error: "There was an error 🤯. Contact admin@coloradocity.news ",
        })
        .then((res) => {
          return res;
        });
      return;
    }
    toast.warning(
      "Please make sure all of your data has been filled out. You must provide an image"
    );
    return;
  };

  return (
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
          <div
            className="cursor-pointer border rounded w-14 center-all mx-auto mt-4"
            onClick={handleSave}
          >
            Save
          </div>
        </NeedsAuthentication>
      )}
    </Layout>
  );
};

export default Profile;
