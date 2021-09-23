import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUserMediator } from "@mediator/providers/userMediatorProvider";
import makeContextHook from "hooks/makeContextHooks";

import { User } from "types/user";

export const context = React.createContext<
  [User, React.Dispatch<React.SetStateAction<User>>] | undefined
>(undefined);
export const useUserProfileContext = makeContextHook(context);

const UserProfileContext: React.FC = ({ children }: any) => {
  const { data: session } = useSession({
    required: false,
  });
  const mediator = useUserMediator();
  const [userProfileData, setUserProfileData] = useState<User>({
    _id: "",
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    if (session) {
      mediator.getUserByEmail(session!.user!.email!).then((res) => {
        setUserProfileData({
          ...userProfileData,
          name: res.name ? res.name : "",
          email: res.email ? res.email : "",
          image: res.image ? res.image : "",
          _id: res._id ? res._id : "",
        });
      });
    }
  }, [session]);

  return (
    <context.Provider value={[userProfileData, setUserProfileData]}>
      {children}
    </context.Provider>
  );
};

export default UserProfileContext;
