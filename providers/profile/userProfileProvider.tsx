import makeContextHook from "hooks/makeContextHooks";
import React from "react";

export interface UserProfileInfo {
  name: string;
  image: string;
  email: string;
}
export const UserProfileContext = React.createContext<
  | [UserProfileInfo, React.Dispatch<React.SetStateAction<UserProfileInfo>>]
  | undefined
>(undefined);
export const useUserProfileContext = makeContextHook(UserProfileContext);
