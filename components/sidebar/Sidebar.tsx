import useSideBarOpenContext from "@providers/sidebarContext";
import React, { useState } from "react";

export const Sidebar = ({ children }: any) => {
  const [navOpen] = useSideBarOpenContext();
  return (
    <div
      className={`bg-white shadow-nav cursor-pointer truncate h-screen rounded duration-75 transition-width ${
        navOpen ? "w-10/12" : "w-0"
      } fixed `}
    >
      <> {children}</>
    </div>
  );
};
