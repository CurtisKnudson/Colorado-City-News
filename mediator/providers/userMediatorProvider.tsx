import React, { createContext, useLayoutEffect, useState } from "react";
// Types
import { IUserMediator } from "mediator/types/mediator/userMediator";
// Hooks
import makeContextHook from "hooks/makeContextHooks";
import { UserMediator } from "mediator/user/userMediator";
import { useUserApi } from "./api/userApiProvider";

const UserMediatorContext = createContext<IUserMediator | undefined>(undefined);
export const useUserMediator = makeContextHook(UserMediatorContext);

const UserMediatorProvider: React.FC = ({ children }) => {
  const api = useUserApi();
  const [userMediator] = useState(() => new UserMediator(api));
  return (
    <UserMediatorContext.Provider value={userMediator}>
      {children}
    </UserMediatorContext.Provider>
  );
};

export default UserMediatorProvider;
