import { SidebarButtonCollapser } from "components/sidebarButtonCollapser";
import useSideBarOpenContext from "providers/sidebarContext";
import React from "react";

export const Header = () => {
  const [navOpen, setNavOpen] = useSideBarOpenContext();
  return (
    <>
      <div className="flex">
        <SidebarButtonCollapser open={navOpen} setOpen={setNavOpen} />
        <div className="font-chomsky">Colorado City News</div>
      </div>
    </>
  );
};
