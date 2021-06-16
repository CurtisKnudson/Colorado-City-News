import { Sidebar } from "components/sidebar";
import React from "react";

export default function Home() {
  return (
    <div className="bg-black text-white h-full">
      This is the commit that adds TailwindCSS is this workign?
      <div className="text-red-900">
        <Sidebar />
      </div>
    </div>
  );
}
