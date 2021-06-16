import React, { useState } from "react";
import { SidebarOpenContext } from "providers/sidebarContext";

export const Sidebar = ({ children }: any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <SidebarOpenContext.Provider value={[open, handleOpen]}>
      <div>Hello World, I am the Sidebar</div>
      <div>{children}</div>
    </SidebarOpenContext.Provider>
  );
};
