import useSideBarOpenContext from "@providers/sidebarContext";
import * as React from "react";

export const Sidebar = ({ children }: any) => {
  const [navOpen] = useSideBarOpenContext();
  return (
    <div
      className={`bg-white cursor-pointer truncate h-screen rounded duration-75 transition-width z-50 ${
        navOpen ? "w-10/12" : "w-0"
      } fixed `}
    >
      <div className="mx-4"> {children}</div>
    </div>
  );
};
