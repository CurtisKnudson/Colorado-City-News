import * as React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useUserProfileContext } from "@providers/profile";
import { useSideBarOpenContext } from "@providers/sidebar/sidebarOpenProvider";
// import { useState } from "react";

export const Sidebar = ({ children }: any) => {
  const { data: session } = useSession();
  const [userProfileData] = useUserProfileContext();
  const [navOpen, setNavOpen] = useSideBarOpenContext();
  // const [selected, isSelected] = useState(false);

  const menuItemsArray: string[] = [
    "Front Page",
    "Social",
    "Jobs",
    "Housing",
    "Classifieds",
    "Obituaries",
    "Sponsors",
  ];

  const userProfileUrl = `/user/${session?.user.profileUrl}`;

  return (
    <div>
      <div
        className={` bg-white cursor-pointer truncate h-screen duration-75 transition-width z-50 ${
          navOpen ? "w-10/12" : "w-0"
        } fixed `}
      >
        <div className="flex flex-col pl-4">
          {!session && (
            <div>
              <button onClick={() => signIn()}>Sign In</button>
              {menuItemsArray.map((item, index) => {
                return <div key={index}>{item}</div>;
              })}
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
              <MenuItem
                url={userProfileUrl}
                label="Profile"
                setNavOpen={setNavOpen}
              />
              {userProfileData.isWriter ? (
                <MenuItem
                  url="/write/editor"
                  label="Editor"
                  setNavOpen={setNavOpen}
                />
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

const MenuItem = ({
  url,
  label,
  setNavOpen,
}: {
  url: string;
  label: string;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="mt-4" onClick={() => setNavOpen(false)}>
      <Link href={url}>{label}</Link>
    </div>
  );
};
