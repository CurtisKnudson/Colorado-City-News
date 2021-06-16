import React, { useState } from "react";
import { SidebarOpenContext } from "providers/sidebarContext";

const sessionSidePanelOpenKey = "side-bar-open";
const setSessionSideBar = (bool: boolean) =>
  window.sessionStorage.setItem(sessionSidePanelOpenKey, bool.toString());

export const Sidebar = () => {
  const [open, setOpen] = useState(() => {
    const openUserPref = window.sessionStorage.getItem(sessionSidePanelOpenKey);
    if (openUserPref) {
      return openUserPref === "true";
    }
    return !closed;
  });

  const handleOpen = () => {
    setSessionSideBar(!open);
    setOpen(!open);
  };
  return (
    <SidebarOpenContext.Provider
      value={[open, handleOpen]}
    ></SidebarOpenContext.Provider>
  );
};
