import { SidebarButtonCollapser } from "components/sidebar";
import useSideBarOpenContext from "providers/sidebarContext";
import React from "react";

export const Header = () => {
  const [navOpen, setNavOpen] = useSideBarOpenContext();
  return (
    <>
      I am the header
      <SidebarButtonCollapser open={navOpen} setOpen={setNavOpen} />
    </>
  );
};
