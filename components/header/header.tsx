import { SidebarButtonCollapser } from "components/sidebarButtonCollapser";
import { SvgShareIcon } from "icons/navMenuShareIcon";
import useSideBarOpenContext from "providers/sidebarContext";
import React from "react";

import Link from "next/link";
import { SvgSearchIcon } from "icons/navMenuSearchIcon";

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
        <Link href="/">
          <div className="font-chomsky col-span-7 text-xl flex items-center justify-center cursor-pointer">
            Colorado City News
          </div>
        </Link>

        <div className="col-start-12 col-end-13 flex items-center justify-center">
          <SvgSearchIcon />
        </div>
      </div>
    </>
  );
};
