import React, { useState } from "react";
import makeContextHook from "hooks/makeContextHooks";

export const context = React.createContext<
  | [
      string | undefined,
      React.Dispatch<React.SetStateAction<string | undefined>>
    ]
  | undefined
>(undefined);
export const useSelectedTag = makeContextHook(context);

const SelectedTagContext: React.FC = ({ children }) => {
  const [tag, setTag] = useState<string | undefined>();

  return <context.Provider value={[tag, setTag]}>{children}</context.Provider>;
};

export default SelectedTagContext;
