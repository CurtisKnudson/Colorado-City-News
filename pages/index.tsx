import React from "react";
import { Sidebar } from "components/sidebar";

export default function Home() {
  return (
    <div className="bg-black text-white h-screen">
      hello world
      <div>
        <Sidebar>
          <div>Hello world this is the child to the sidebar </div>
        </Sidebar>
      </div>
    </div>
  );
}
