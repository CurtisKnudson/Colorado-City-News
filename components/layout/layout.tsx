import React, { useState } from "react";
import { SidebarOpenContext } from "@providers/sidebarContext";
import { Header } from "@components/header";
import { Sidebar } from "@components/sidebar";
interface Layout {
  children?: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: Layout) => {
  const [navOpen, setNavOpen] = useState(false);
  const handleNavOpen = () => {
    setNavOpen(!navOpen);
  };

  return (
    <>
      <div>
        <SidebarOpenContext.Provider value={[navOpen, handleNavOpen]}>
          <Header></Header>
          <Sidebar />
          <div className={className ? className : "mx-4"}>{children}</div>
        </SidebarOpenContext.Provider>
      </div>
    </>
  );
};
