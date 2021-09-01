import { useSession } from "next-auth/client";

export const Avatar = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <GhostAvatar />;
  }
  return (
    <div className="center-all mt-4">
      {session?.user?.image ? (
        <img src={session.user.image} alt="profile picture" />
      ) : (
        <div className="h-44 w-44 bg-gray-400 hover:bg-gray-500 rounded relative cursor-pointer">
          <div className="bg-gray-300 w-full center-all absolute bottom-0">
            Add Profile Picture
          </div>
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
