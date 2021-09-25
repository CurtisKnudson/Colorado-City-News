import React, { useMemo, createContext } from "react";
import makeContextHook from "hooks/makeContextHooks";
import { ApiInterface } from "types/api";
import { Api } from "@mediator/api/api";

const apiContext = createContext<ApiInterface | undefined>(undefined);
export const useApi = makeContextHook(apiContext);

const ApiProvider: React.FC = ({ children }) => {
  const api = new Api();
  return <apiContext.Provider value={api}>{children}</apiContext.Provider>;
};

export default ApiProvider;
