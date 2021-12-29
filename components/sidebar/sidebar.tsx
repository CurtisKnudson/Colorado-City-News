import * as React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useUserProfileContext } from "@providers/profile";
import { useSideBarOpenContext } from "@providers/sidebar/sidebarOpenProvider";
import { MenuItem } from "./menuItem";
import { useState } from "react";
import Link from "next/link";

export interface MenuItem {
  label: string;
  subNavItem?: {
    label: string;
    url?: string;
  }[];
  url?: string;
}

export const Sidebar = ({ children }: any) => {
  const { data: session } = useSession();
  const [userProfileData] = useUserProfileContext();
  const [navOpen, setNavOpen] = useSideBarOpenContext();
  const [selected, setSelected] = useState<string>("Front Page");

  const menuItemsArray: MenuItem[] = [
    {
      label: "Front Page",
      url: "/",
    },
    { label: "Social", url: "/" },
    { label: "Jobs", url: "/" },
    { label: "Housing", url: "/" },
    {
      label: "Classifieds",
      url: "/",
      subNavItem: [
        {
          label: "For Sale",
          url: "/",
        },
      ],
    },
    { label: "Obituaries", url: "/" },
    { label: "Sponsors", url: "/" },
  ];

  const userProfileUrl = `/user/${session?.user.profileUrl}`;

  return (
    <div>
      <div
        className={` bg-white cursor-pointer truncate h-screen duration-75 transition-width z-50 ${
          navOpen ? "w-10/12" : "w-0"
        } fixed `}
      >
        <div className="flex flex-col pl-4 mt-12">
          {!session && (
            <div>
              {menuItemsArray.map((item, index) => {
                return (
                  <MenuItem
                    url={item.url ? item.url : "/"}
                    label={item.label}
                    setNavOpen={setNavOpen}
                    selected={item.label === selected}
                    key={index}
                    onClick={() => setSelected(item.label)}
                    subNavItem={item.subNavItem}
                  />
                );
              })}
              <button className="mx-12 mt-16" onClick={() => signIn()}>
                Sign In
              </button>
            </div>
          )}
          {session && (
            <>
              <span>
                <br />
                <strong>
                  {session.user
                    ? session.user.name
                      ? session.user.name
                      : session.user.email
                    : "Sign In"}
                </strong>
              </span>
              <Link href={userProfileUrl}>Profile</Link>
              {userProfileData.isWriter ? (
                <Link href="/write/editor">Editor</Link>
              ) : null}

              <hr className="mt-8" />

              <button onClick={() => signOut()}>Sign Out</button>
            </>
          )}
        </div>
      </div>
      <div className="mx-4"> {children}</div>
    </div>
  );
};
