import { SvgMenuIcon, SvgMenuIconOpen } from "icons";

interface SidebarButtonCollapser {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarButtonCollapser = (props: SidebarButtonCollapser) => {
  const { open, setOpen } = props;
  return (
    <div
      onClick={() => {
        setOpen(!open);
      }}
      className="cursor-pointer"
    >
      {open ? (
        <SvgMenuIconOpen color="dark:text-white text-black" />
      ) : (
        <SvgMenuIcon color="dark:text-white text-black" />
      )}
    </div>
  );
};
