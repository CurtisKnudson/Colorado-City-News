import React from "react";
import { SidebarButtonCollapser } from "@components/sidebarButtonCollapser";
import useSideBarOpenContext from "@providers/sidebarContext";
import Link from "next/link";
import { Search } from "icons";

export const Header = () => {
  const [navOpen, setNavOpen] = useSideBarOpenContext();
  return (
    <div className="mx-4 h-16 grid grid-cols-12">
      <div className="col-span-1 flex items-center justify-center">
        <SidebarButtonCollapser open={navOpen} setOpen={setNavOpen} />
      </div>

      <div className="font-chomsky col-span-7 text-xl flex items-center justify-center  select-none">
        <Link href="/" passHref>
          <a
            onClick={(e) => {
              e.stopPropagation(), e.nativeEvent.stopImmediatePropagation();
            }}
            className="cursor-pointer"
          >
            Colorado City News
          </a>
        </Link>
      </div>

      <div className="col-start-12 col-end-13 flex items-center justify-center">
        <Search />
      </div>
    </div>
  );
};
