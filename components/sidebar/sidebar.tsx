import * as React from "react";
import Link from "next/link";
import { useUserProfileContext } from "@providers/profile";
import useSideBarOpenContext from "@providers/sidebarContext";
import { signIn, signOut, useSession } from "next-auth/react";

export const Sidebar = ({ children }: any) => {
  const [navOpen, setNavOpen] = useSideBarOpenContext();
  const [userProfileData] = useUserProfileContext();
  const { data: session } = useSession({
    required: false,
  });

  const userProfileUrl = `/user/${userProfileData.profileUrl}`;

  return (
    <div>
      <div
        className={` bg-white cursor-pointer truncate h-screen duration-75 transition-width z-50 ${
          navOpen ? "w-10/12" : "w-0"
        } fixed `}
      >
        <div className="flex flex-col pl-4">
          {!session && (
            <>
              <button onClick={() => signIn()}>Sign In</button>
            </>
          )}
          {session && (
            <>
              <span>
                <small>Signed in as:</small>
                <br />
                <strong>
                  {session.user
                    ? session.user.email || session.user.name
                    : "User not found"}
                </strong>
              </span>
              <MenuItem
                url={userProfileUrl}
                label="Profile"
                setNavOpen={setNavOpen}
              />
              <MenuItem
                url="/write/editor"
                label="Editor"
                setNavOpen={setNavOpen}
              />
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
