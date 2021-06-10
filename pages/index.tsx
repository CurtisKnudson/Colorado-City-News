import { Sidebar } from "components/sidebar";
import React from "react";

export default function Home() {
  return (
    <div className="text-xl text-green-600 bg-blue-800">
      This is the commit that adds TailwindCSS
      <div>
        <Sidebar />
      </div>
    </div>
  );
}
