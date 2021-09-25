import { Menu, MenuOpen } from "icons";

interface SidebarButtonCollapser {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export const SidebarButtonCollapser = (props: SidebarButtonCollapser) => {
  const { open, setOpen, className } = props;
  return (
    <div
      onClick={() => {
        setOpen(!open);
      }}
      className={`cursor-pointer h-8 w-8 flex justify-center align-middle ${
        className ? className : ""
      }`}
    >
      {open ? (
        <MenuOpen color="" className="mt-auto mb-auto mr-auto" />
      ) : (
        <Menu color="" className="mt-auto mb-auto mr-auto" />
      )}
    </div>
  );
};
