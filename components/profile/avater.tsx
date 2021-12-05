import React, { createRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Camera } from "icons";
import { useUserProfileContext } from "@providers/profile";

interface AvatarProps {
  viewOnly?: boolean;
  nonUserImage?: string;
}

export const Avatar = ({ viewOnly, nonUserImage }: AvatarProps) => {
  const { status } = useSession();
  // @ts-ignore
  const imageUpload = createRef(null);
  const [userProfileData, setUserProfileData] = useUserProfileContext();

  const handleImageClick = () => {
    document.getElementById("imgUpload")?.click();
  };
  // @ts-ignore
  const readUrl = (input) => {
    if (typeof input.current === null) {
      return;
    }

    if (input.current.files && input.current.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // @ts-ignore
        if (e.target.result !== null || ArrayBuffer || undefined) {
          // @ts-ignore
          setUserProfileData({ ...userProfileData, image: e.target.result });
        }
      };
      reader.readAsDataURL(input.current.files[0]);
    }
  };

  if (status === "loading") {
    return <GhostAvatar />;
  }

  if (viewOnly) {
    return (
      <>
        {nonUserImage ? (
          <div className="center-all mt-8">
            <img
              src={nonUserImage}
              alt="profile picture"
              className="h-44 w-44 rounded cursor-pointer shadow-xl hover:shadow-2xl"
            />
          </div>
        ) : (
          <div className="center-all mt-8">
            <div className="h-44 w-44 rounded shadow-md hover:shadow-xl relative cursor-pointer center-all">
              <Camera />
              <div className="bg-gray-300 w-full center-all absolute bottom-0">
                No Profile Picture
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="center-all mt-8">
      {userProfileData.image ? (
        <>
          <img
            src={userProfileData.image}
            alt="profile picture"
            className="h-44 w-44 rounded cursor-pointer shadow-xl hover:shadow-2xl"
            onClick={handleImageClick}
          />
        </>
      ) : (
        <div
          className="h-44 w-44 rounded shadow-md hover:shadow-xl relative cursor-pointer center-all"
          onClick={handleImageClick}
        >
          <Camera />
          <div className="bg-gray-300 w-full center-all absolute bottom-0">
            Add Profile Picture
          </div>
        </div>
      )}
      <input
        type="file"
        id="imgUpload"
        className="h-0 w-0"
        // @ts-ignore
        ref={imageUpload}
        onChange={() => readUrl(imageUpload)}
      />
    </div>
  );
};

export const GhostAvatar = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="h-44 w-44 bg-gray-400 rounded-full"></div>
    </div>
  );
};
