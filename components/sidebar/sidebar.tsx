import useSideBarOpenContext from "@providers/sidebarContext";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import * as React from "react";

export const Sidebar = ({ children }: any) => {
  const [navOpen] = useSideBarOpenContext();
  const { data: session } = useSession({
    required: false,
  });

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
              <button onClick={() => signIn()}>Sign In</button>
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
              <button onClick={() => signOut()}></button>
              <Link href="/write/editor">Editor</Link>
              <Link href="/user/profile">Profile</Link>
            </>
          )}
        </div>
      </div>
      <div className="mx-4"> {children}</div>
    </div>
  );
};
