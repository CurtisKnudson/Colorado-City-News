import React, { createContext, useState } from "react";

// Types
import { IUserApi } from "mediators/types";
import makeContextHook from "hooks/makeContextHooks";
import { useUpdateEffect } from "hooks/useUpdateEffect";

const userApiContext = createContext<IUserApi | undefined>(undefined);

export const useUserMediator = makeContextHook(userApiContext);

interface IUserApiProviderProps {
  api?: IUserApi;
}

const OmniTextApiProvider: React.FC<IUserApiProviderProps> = ({
  children,
  api,
}) => {
  const [omniApiAdapter, setAdapter] = useState(() =>
    api ? api : new OmniTextApiGrpcAdapter()
  );

  useUpdateEffect(() => {
    setAdapter(api ? api : new OmniTextApiGrpcAdapter());
  }, [api]);

  return (
    <omniTextApiContext.Provider value={omniApiAdapter}>
      {children}
    </omniTextApiContext.Provider>
  );
};

export default OmniTextApiProvider;
