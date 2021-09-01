import React, { useMemo, createContext } from "react";
import makeContextHook from "hooks/makeContextHooks";
import { IUserApi } from "mediator/types/api";
import { UserApi } from "mediator/api/userApi";

const apiContext = createContext<IUserApi | undefined>(undefined);
export const useUserApi = makeContextHook(apiContext);

const UserApiProvider: React.FC = ({ children }) => {
  const api = new UserApi();
  return <apiContext.Provider value={api}>{children}</apiContext.Provider>;
};

export default UserApiProvider;
