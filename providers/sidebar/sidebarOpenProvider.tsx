import React, { useState } from "react";
import makeContextHook from "hooks/makeContextHooks";

export const context = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);
export const useSideBarOpenContext = makeContextHook(context);

const SidebarOpenContext: React.FC = ({ children }) => {
  const [navOpen, setNavOpen] = useState<boolean>(false);

  return (
    <context.Provider value={[navOpen, setNavOpen]}>
      {children}
    </context.Provider>
  );
};

export default SidebarOpenContext;
