import React, { createContext, useEffect, useState } from "react";
// Types
import { UserMediator as UserMediatorInterface } from "mediator/types/mediator/userMediator";
// Hooks
import makeContextHook from "hooks/makeContextHooks";
import { UserMediator } from "mediator/user/userMediator";
import { useUserApi } from "../api/userApiProvider";

const UserMediatorContext = createContext<UserMediatorInterface | undefined>(
  undefined
);
export const useUserMediator = makeContextHook(UserMediatorContext);

const UserMediatorProvider: React.FC = ({ children }) => {
  const api = useUserApi();
  const [userMediator] = useState(() => new UserMediator(api));

  useEffect(() => {
    return () => {
      userMediator.dispose();
    };
  }, [userMediator]);
  return (
    <UserMediatorContext.Provider value={userMediator}>
      {children}
    </UserMediatorContext.Provider>
  );
};

export default UserMediatorProvider;
