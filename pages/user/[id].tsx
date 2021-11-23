import React from "react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { Layout } from "@components/layout";
import { Avatar, UserInfo } from "@components/profile";
import { toast } from "react-toastify";
import { useUserProfileContext } from "@providers/profile";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { connectToDatabase } from "@database/mongodb";

const Profile = () => {
  const mediator = useMediator();
  const { status } = useSession({
    required: true,
  });
  const [userProfileData, setUserProfileData] = useUserProfileContext();

  const handleSave = async () => {
    if (
      userProfileData.name &&
      userProfileData.email &&
      userProfileData.image
    ) {
      if (userProfileData.image === null) {
        toast.warning("You must change something to save profile");
      }
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
      "Please make sure all of your data has been filled out. You must provide an image"
    );
    return;
  };

  return (
    <Layout>
      {status === "loading" ? (
        <div>Loading please wait</div>
      ) : (
        <>
          <Avatar />
          <UserInfo />
          <div
            className="cursor-pointer border rounded w-14 center-all mx-auto mt-4"
            onClick={handleSave}
          >
            Save
          </div>
        </>
      )}
    </Layout>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { db } = await connectToDatabase();
  const { id } = context.query;

  return {
    props: {
      test: "test",
    },
  };
};
