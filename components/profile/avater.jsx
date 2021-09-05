import React, { useRef, useState } from "react";
import { useSession } from "next-auth/client";
import { Camera } from "icons";

export const Avatar = () => {
  const [, loading] = useSession();
  const [profileImage, setProfileImage] = useState();
  const imageUpload = useRef(null);

  const handleImageClick = () => {
    document.getElementById("imgUpload")?.click();
  };

  const readUrl = (input) => {
    if (input.current.files && input.current.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        if (e.target.result !== null || ArrayBuffer || undefined) {
          setProfileImage(e.target.result);
        }
      };
      reader.readAsDataURL(input.current.files[0]);
    }
  };

  if (loading) {
    return <GhostAvatar />;
  }
  return (
    <div className="center-all mt-4">
      {profileImage ? (
        <img src={profileImage} alt="profile picture" />
      ) : (
        <div
          className="h-44 w-44 bg-gray-400 hover:bg-gray-500 rounded relative cursor-pointer center-all"
          onClick={handleImageClick}
        >
          <Camera />
          <div className="bg-gray-300 w-full center-all absolute bottom-0">
            Add Profile Picture
          </div>

          <input
            type="file"
            id="imgUpload"
            className="h-0 w-0"
            ref={imageUpload}
            onChange={() => readUrl(imageUpload)}
          />
        </div>
      )}
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
