import { ACCENT } from "@constants/design";
import { useUserProfileContext } from "@providers/profile";
import { SpinnerDotted } from "spinners-react";
import { NonUserProfile } from "types/user";

export interface ProfileInput {
  className: string;
  label: string;
  type: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
  placeholder: string;
  readOnly?: boolean;
  adornment?: boolean;
  validation?: any;
}

export interface UserInfoProps {
  pageId?: string;
  viewOnly?: boolean;
  nonUserProfile?: NonUserProfile;
}

export const UserInfo = ({
  pageId,
  viewOnly,
  nonUserProfile,
}: UserInfoProps) => {
  const [userProfileData, setUserProfileData] = useUserProfileContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserProfileData({
      ...userProfileData,
      [name]: value,
    });
  };

  const handleChangeProfileUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserProfileData({
      ...userProfileData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col mt-8">
      {viewOnly ? (
        <div className="w-full center-all">
          {" "}
          <input
            type="text"
            name="name"
            value={nonUserProfile?.name ? nonUserProfile.name : "No Name Found"}
            placeholder="Your Name"
            className="text-center outline-none h5Headline"
            readOnly
          />
        </div>
      ) : (
        <>
          <div className="w-full center-all">
            <input
              type="text"
              name="name"
              value={userProfileData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="text-center outline-none h5Headline"
            />
          </div>
          <ProfileInput
            label="Email:"
            type="email"
            name="email"
            onChange={handleChange}
            value={userProfileData.email}
            placeholder={userProfileData.email}
            className="text-gray-300 w-full"
          />
          <ProfileInput
            label="Profile Url:"
            type="text"
            name="profileUrl"
            onChange={handleChangeProfileUrl}
            value={userProfileData.profileUrl ? userProfileData.profileUrl : ""}
            placeholder={pageId ? pageId : ""}
            className="w-full"
            adornment={true}
          />
          <div className="text-gray-500 italic text-xs mt-8">
            {userProfileData.name
              ? null
              : `' **If you want to comment, post or interact on this website you must
            add a name**'`}
          </div>
        </>
      )}
    </div>
  );
};

export const ProfileInput = ({
  className,
  label,
  type,
  name,
  onChange,
  value,
  placeholder,
  readOnly,
  adornment = false,
  validation,
}: ProfileInput) => {
  return (
    <div className="flex mt-4">
      <span className="w-1/3">{label}</span>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={`${className} px-2`}
        readOnly={readOnly}
      />
      {adornment ? (
        <div className="mx-1">
          <SpinnerDotted size={20} thickness={100} speed={100} color={ACCENT} />
        </div>
      ) : null}
    </div>
  );
};
