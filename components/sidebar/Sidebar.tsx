import useSideBarOpenContext from "@providers/sidebarContext";
import React, { useState } from "react";

export const Sidebar = ({ children }: any) => {
  const [navOpen] = useSideBarOpenContext();
  return (
    <div
      className={`bg-white cursor-pointer truncate h-screen rounded duration-75 transition-width z-50 ${
        navOpen ? "w-10/12" : "w-0"
      } fixed `}
    >
      <> {children}</>
    </div>
  );
};
