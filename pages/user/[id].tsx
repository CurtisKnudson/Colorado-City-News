import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Layout } from "@components/layout";
import { Avatar, UserInfo } from "@components/profile";
import { toast } from "react-toastify";
import { useUserProfileContext } from "@providers/profile";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { LOADING, NOTFOUND } from "@constants/authentication";
import { useAsyncValue } from "@mediator/observables/hooks";
import Loading from "@components/loading";
import { NonUserProfile } from "types/user";
import { UserNotFound } from "@components/undraw/userNotFound";
import RecentActivity from "@components/profile/recentActivity";
import { ProfileUrlValidation } from "@components/profile/userInfo";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const { status, data: session } = useSession();
  const [userProfileData, setUserProfileData] = useUserProfileContext();
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
  const mediator = useMediator();
  const nonUserProfile: NonUserProfile | null = useAsyncValue(
    mediator.nonUserProfile
  );

  const handleSave = async () => {
    if (userProfileData.name && userProfileData.email) {
      const userProfile = async () => {
        return await mediator
          .updateUserProfile(userProfileData)
          .then((res) => {
            setUserProfileData(res);
            return res;
          })
          .catch((err) => {
            return err;
          });
      };

      if (userProfileData.profileUrl !== session?.user.profileUrl) {
        await mediator
          .validateProfileUrl(userProfileData.profileUrl)
          .then((res) => {
            if (res === ProfileUrlValidation.INVALID) {
              toast.warning("Invalid Profile Url");
              return;
            }
            window.location.assign(`/user/${userProfileData.profileUrl}`);
          });
        return;
      }
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
    if (typeof id === "string") {
      mediator.viewAnotherUserByProfileUrl(id);
    }
    if (session) {
      setIsCurrentUserProfile(
        session.user?.profileUrl === undefined
          ? false
          : session.user.profileUrl === id
          ? true
          : false
      );
    }
  }, [id, session, mediator]);

  if (status === LOADING) {
    return <Loading />;
  }

  if (isCurrentUserProfile) {
    return (
      <Layout>
        <>
          <Avatar />
          <UserInfo pageId={typeof id === "string" ? id : ""} />
          <div
            className="cursor-pointer border rounded w-14 center-all mx-auto mt-4"
            onClick={handleSave}
          >
            Save
          </div>
          <hr className="mt-8" />
          <RecentActivity
            publishedArticles={
              nonUserProfile?.publishedArticles
                ? nonUserProfile.publishedArticles
                : undefined
            }
            comments={
              nonUserProfile?.comments ? nonUserProfile.comments : undefined
            }
          />
        </>
      </Layout>
    );
  }

  if (nonUserProfile?.message === NOTFOUND) {
    return (
      <Layout>
        <div className="h5Headline mt-8">
          We couldn't find the user you're looking for... Do they exist?
        </div>
        <div className="mt-16">
          <UserNotFound />
        </div>
      </Layout>
    );
  }

  return (
    <>
      {nonUserProfile ? (
        <>
          <Layout>
            <Avatar viewOnly nonUserImage={nonUserProfile.image} />
            <UserInfo
              pageId={typeof id === "string" ? id : ""}
              viewOnly
              nonUserProfile={nonUserProfile}
            />
            <hr className="mx-4 mt-8" />
            <RecentActivity
              publishedArticles={
                nonUserProfile?.publishedArticles
                  ? nonUserProfile.publishedArticles
                  : undefined
              }
              comments={
                nonUserProfile?.comments ? nonUserProfile.comments : undefined
              }
              viewOnly
            />
          </Layout>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;
