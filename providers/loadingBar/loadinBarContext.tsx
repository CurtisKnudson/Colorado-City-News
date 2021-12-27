import React, { useState } from "react";
import makeContextHook from "hooks/makeContextHooks";

export const context = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);
export const useLoadingBarContext = makeContextHook(context);

const LoadingBarContext: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <context.Provider value={[isLoading, setIsLoading]}>
      {children}
    </context.Provider>
  );
};

export default LoadingBarContext;
