import React, { createContext, useState } from "react";

interface SidebarContextProps {
  children: JSX.Element;
}
const SidebarContext = createContext(false);
const SidebarContextProvider: React.FC = ({
  children,
}: SidebarContextProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContextProvider };
