import React, { useEffect, useState } from "react";
import { SidebarButtonCollapser } from "@components/sidebarButtonCollapser";
import Link from "next/link";
import { Search } from "icons";
import { useSelectedTag } from "@providers/tags/selectedTagContext";
import { useSideBarOpenContext } from "@providers/sidebar/sidebarOpenProvider";
import { useIsMounted } from "hooks/useIsMounted";

export const Header = () => {
  const [navOpen, setNavOpen] = useSideBarOpenContext();
  const [tag, setTag] = useSelectedTag();
  const [isScrolled, setIsScrolled] = useState<boolean>();
  const isMounted = useIsMounted();

  const handleScroll = () => {
    if (window.screen.width >= 640) {
      setIsScrolled(false);
      return;
    }
    if (window.scrollY > 64) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    if (isMounted) {
      window.addEventListener("scroll", handleScroll);
    }
    () => {
      return window.removeEventListener("scroll", handleScroll);
    };
  }, [isMounted]);

  return (
    <div
      className={`h-16 sticky top-0  z-30 transition-width bg-white ${
        isScrolled && !navOpen
          ? "w-24 m-0 flex justify-between shrunken-header"
          : "grid grid-cols-12 px-4"
      }`}
    >
      <div
        className={`col-span-1 flex items-center justify-center ${
          isScrolled && !navOpen ? "ml-3" : ""
        }`}
      >
        <SidebarButtonCollapser open={navOpen} setOpen={setNavOpen} />
      </div>

      <div
        className={`font-chomsky col-span-7 ${
          isScrolled && !navOpen ? "text-2xl pr-6 pt-0.5" : "text-xl"
        } flex items-center justify-center  select-none`}
      >
        <Link href="/" passHref>
          <a
            onClick={(e) => {
              e.stopPropagation(), e.nativeEvent.stopImmediatePropagation();
              if (tag) {
                setTag(undefined);
              }
            }}
            className="cursor-pointer "
          >
            {isScrolled && !navOpen ? "C" : "Colorado City News"}
          </a>
        </Link>
      </div>

      <div
        className={`col-start-12 col-end-13 flex items-center justify-center ${
          navOpen ? "hidden" : ""
        } ${isScrolled ? "hidden" : ""}`}
      >
        <div>
          <Search />
        </div>
      </div>
    </div>
  );
};
