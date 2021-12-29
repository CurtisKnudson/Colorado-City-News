/* eslint-disable unused-imports/no-unused-vars */
import React from "react";
import { Header } from "@components/header";
import { Sidebar } from "@components/sidebar";
import { useSideBarOpenContext } from "@providers/sidebar/sidebarOpenProvider";
export interface Layout {
  children?: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: Layout) => {
  const [navOpen] = useSideBarOpenContext();
  return (
    <>
      <div>
        <Header></Header>
        <Sidebar />
        <div
          className={`${navOpen ? "opacity-60" : ""} ${
            className ? className : "mx-4"
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
};
