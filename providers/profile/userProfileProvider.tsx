import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { useUserMediator } from "@mediator/providers/userMediatorProvider";
import makeContextHook from "hooks/makeContextHooks";

import { User } from "types/user";

export const context = React.createContext<
  [User, React.Dispatch<React.SetStateAction<User>>] | undefined
>(undefined);
export const useUserProfileContext = makeContextHook(context);

const UserProfileContext: React.FC = ({ children }: any) => {
  const [session] = useSession();
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
          name: res.name,
          email: res.email,
          image: res.image,
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
