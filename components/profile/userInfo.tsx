import { useUserProfileContext } from "@providers/profile";
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
}

export interface UserInfoProps {
  id?: string;
  viewOnly?: boolean;
  nonUserProfile?: NonUserProfile;
}

export const UserInfo = ({ id, viewOnly, nonUserProfile }: UserInfoProps) => {
  const [userProfileData, setUserProfileData] = useUserProfileContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            className="pointer-events-none select-none text-gray-300 w-full"
            readOnly
          />
          <ProfileInput
            label="Profile Url:"
            type="text"
            name="profileUrl"
            onChange={handleChange}
            value={userProfileData.profileUrl ? userProfileData.profileUrl : ""}
            placeholder={id ? id : ""}
            className="w-full"
          />
          <div className="text-gray-500 italic text-xs mt-8">
            **If you want to comment, post or interact on this website you must
            add a name**
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
        className={className}
        readOnly={readOnly}
      />
    </div>
  );
};
