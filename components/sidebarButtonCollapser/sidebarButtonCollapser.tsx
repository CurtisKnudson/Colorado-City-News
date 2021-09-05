import { Menu, MenuOpen } from "icons";

interface SidebarButtonCollapser {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  classes?: string;
}

export const SidebarButtonCollapser = (props: SidebarButtonCollapser) => {
  const { open, setOpen, classes } = props;
  return (
    <div
      onClick={() => {
        setOpen(!open);
      }}
      className={`cursor-pointer h-8 w-8 flex justify-center align-middle ${
        classes ? classes : ""
      }`}
    >
      {open ? (
        <MenuOpen color="" className="m-auto" />
      ) : (
        <Menu color="" className="m-auto" />
      )}
    </div>
  );
};
