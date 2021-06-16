import makeContextHook from "hooks/makeContextHooks";
import React, { createContext, useState } from "react";
export const SidebarOpenContext =
  React.createContext<
    [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
  >(undefined);
const useSideBarOpenContext = makeContextHook(SidebarOpenContext);
export default useSideBarOpenContext;
