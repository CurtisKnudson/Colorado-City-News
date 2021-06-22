import { SidebarButtonCollapser } from "components/sidebarButtonCollapser";
import { SvgShareIcon } from "icons/sidebarShareIcon";
import useSideBarOpenContext from "providers/sidebarContext";
import React from "react";

export const Header = () => {
  const [navOpen, setNavOpen] = useSideBarOpenContext();
  return (
    <>
      <div className="mx-4 h-12 grid grid-cols-12">
        <div className="col-span-1 flex items-center justify-center">
          <SidebarButtonCollapser
            open={navOpen}
            setOpen={setNavOpen}
            classes=""
          />
        </div>
        <div className="font-chomsky col-span-7 text-xl flex items-center justify-center">
          Colorado City News
        </div>
        <div className="col-start-12 col-end-13 flex items-center justify-center">
          <SvgShareIcon />
        </div>
      </div>
    </>
  );
};
