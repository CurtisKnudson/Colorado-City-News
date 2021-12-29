import { Menu, MenuOpen } from "icons";

export interface SidebarButtonCollapser {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  inSidebar?: boolean;
}

export const SidebarButtonCollapser = (props: SidebarButtonCollapser) => {
  const { open, setOpen, className, inSidebar } = props;
  return (
    <div
      onClick={() => {
        setOpen(!open);
      }}
      className={`cursor-pointer h-8 w-8 flex justify-center align-middle ${
        className ? className : ""
      }`}
    >
      {inSidebar ? (
        <MenuOpen color="" className="mt-auto mb-auto mr-auto" />
      ) : (
        <>
          {open ? (
            <MenuOpen color="" className="mt-auto mb-auto mr-auto" />
          ) : (
            <Menu color="" className="mt-auto mb-auto mr-auto" />
          )}
        </>
      )}
    </div>
  );
};
