import { useUserProfileContext } from "@providers/profile";

export const UserInfo = () => {
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
      <label className="mt-8" htmlFor="name">
        Name:
      </label>
      <input
        type="text"
        name="name"
        value={userProfileData.name}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <label className="mt-8" htmlFor="email">
        Email:
      </label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={userProfileData.email}
        placeholder={userProfileData.email}
      />
      <div className="text-gray-500 italic text-xs mt-8">
        **If you want to comment, post or interact on this website you must have
        a name and profile picture
      </div>
    </div>
  );
};
