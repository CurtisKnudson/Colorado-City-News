import useSideBarOpenContext from "@providers/sidebarContext";
import { signIn, signOut, useSession } from "next-auth/client";
import * as React from "react";

export const Sidebar = ({ children }: any) => {
  const [navOpen] = useSideBarOpenContext();
  const [session] = useSession();

  return (
    <div className="mx-4">
      <div
        className={`bg-white cursor-pointer truncate h-screen rounded duration-75 transition-width z-50 ${
          navOpen ? "w-10/12" : "w-0"
        } fixed `}
      >
        <div className="flex flex-col ">
          {!session && (
            <>
              <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              <span>
                <small>Signed in as</small>
                <br />
                <strong>
                  {session.user
                    ? session.user.email || session.user.name
                    : "User not found"}
                </strong>
              </span>
              <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </div>
      </div>
      <div className="mx-4"> {children}</div>
    </div>
  );
};
