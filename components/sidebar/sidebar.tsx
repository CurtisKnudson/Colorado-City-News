import * as React from "react";
import useSideBarOpenContext from "@providers/sidebarContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Sidebar = ({ children }: any) => {
  const [navOpen] = useSideBarOpenContext();
  const { data: session } = useSession({
    required: false,
  });

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
              <div className="mt-4">
                <MenuItem url="/auth/signin" label="Sign In" />
              </div>
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
              <MenuItem url="/user/profile" label="Profile" />
              <MenuItem url="/write/editor" label="Editor" />

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

export const MenuItem = ({ url, label }: { url: string; label: string }) => {
  return (
    <div className="mt-4">
      <Link href={url}>{label}</Link>
    </div>
  );
};
