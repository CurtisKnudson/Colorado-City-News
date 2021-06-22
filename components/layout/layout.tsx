import React, { useState } from "react";
import { SidebarOpenContext } from "providers/sidebarContext";
import { Header } from "components/header";
import { Sidebar } from "components/sidebar";

interface Layout {
  children?: React.ReactNode;
}

export const Layout = ({ children }: Layout) => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavOpen = () => {
    setNavOpen(!navOpen);
  };

  return (
    <>
      <div>
        <SidebarOpenContext.Provider value={[navOpen, handleNavOpen]}>
          <Header></Header>
          <Sidebar></Sidebar>
          {children}
        </SidebarOpenContext.Provider>
      </div>
    </>
  );
};
