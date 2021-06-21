import React, { useState } from "react";
import { SidebarOpenContext } from "providers/sidebarContext";
import { SidebarButtonCollapser } from ".";

export const Sidebar = ({ children }: any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <SidebarOpenContext.Provider value={[open, handleOpen]}>
      <div>Hello World, I am the Sidebar</div>
      <div>{children}</div>
      <SidebarButtonCollapser open={open} setOpen={handleOpen} />
    </SidebarOpenContext.Provider>
  );
};
8;
