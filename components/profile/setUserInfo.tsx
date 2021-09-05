import { useUserProfileContext } from "@providers/profile";

export const UserInfo = (props: { email: string }) => {
  const [userProfileData, setUserProfileData] = useUserProfileContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserProfileData({
      ...userProfileData,
      [name]: value,
      email: props.email,
    });
  };

  return (
    <>
      <input
        name="name"
        value={userProfileData.name}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <input name="email" />
    </>
  );
};
