import React, { useState } from "react";
import { SidebarOpenContext } from "@providers/sidebarContext";
import { Header } from "@components/header";
import { Sidebar } from "@components/sidebar";
import Link from "next/link";

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
          <Sidebar>
            <div className="flex flex-col">
              <Link href="/authentication/signup">Login</Link>
              <Link href="/api/user/logout">Logout</Link>
            </div>
          </Sidebar>
          <div className="mx-4">{children}</div>
        </SidebarOpenContext.Provider>
      </div>
    </>
  );
};
