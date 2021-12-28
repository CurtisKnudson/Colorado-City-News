import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import makeContextHook from "hooks/makeContextHooks";

import { User } from "types/user";

export const context = React.createContext<
  [User, React.Dispatch<React.SetStateAction<User>>] | undefined
>(undefined);
export const useUserProfileContext = makeContextHook(context);

const UserProfileContext: React.FC = ({ children }: any) => {
  const { data: session } = useSession();
  const mediator = useMediator();
  const [userProfileData, setUserProfileData] = useState<User>({
    _id: "",
    name: "",
    email: "",
    image: "",
    profileUrl: "",
    userId: "",
    isAdmin: false,
    isWriter: false,
  });

  useEffect(() => {
    if (session) {
      mediator.getUserByEmail(session!.user!.email!).then((res) => {
        setUserProfileData(res);
      });
    }
  }, [mediator, session]);

  return (
    <context.Provider value={[userProfileData, setUserProfileData]}>
      {children}
    </context.Provider>
  );
};

export default UserProfileContext;
