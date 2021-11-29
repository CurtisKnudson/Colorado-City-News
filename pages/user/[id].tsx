import React, { useEffect, useLayoutEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Layout } from "@components/layout";
import { Avatar, UserInfo } from "@components/profile";
import { toast } from "react-toastify";
import { useUserProfileContext } from "@providers/profile";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { User } from "types/user";

const Profile = () => {
  const router = useRouter();
  const mediator = useMediator();
  const { status, data: session } = useSession({
    required: true,
  });
  const { id } = router.query;

  const [userProfileData, setUserProfileData] = useUserProfileContext();

  const handleSave = async () => {
    if (
      userProfileData.name &&
      userProfileData.email &&
      userProfileData.image
    ) {
      const userProfile = async () => {
        let userProfile = await mediator
          .updateUserProfile(userProfileData)
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
      "Please make sure all of your data has been filled out. You must provide at least a Name"
    );
    return;
  };

  useEffect(() => {
    if (session?.user?.email) {
      mediator.getUserByEmail(session.user!.email).then((res: User) => {
        if (!res.profileUrl && typeof id === "string" && session?.user?.email) {
          mediator.addProfileUrl(session.user.email, id).then((res) => {
            console.log(res);
          });
        }
      });
    }
  }, [mediator, id, session]);

  if (status === "loading") {
    return (
      <Layout>
        <div>Loading please wait</div>
      </Layout>
    );
  }
  if (status === "authenticated") {
    return (
      <Layout>
        <>
          <Avatar />
          <UserInfo id={typeof id === "string" ? id : ""} />
          <div
            className="cursor-pointer border rounded w-14 center-all mx-auto mt-4"
            onClick={handleSave}
          >
            Save
          </div>
        </>
      </Layout>
    );
  }
};

export default Profile;
