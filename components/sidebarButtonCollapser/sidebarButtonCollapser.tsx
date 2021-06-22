import { SvgMenuIcon, SvgMenuIconOpen } from "icons";

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
        <SvgMenuIconOpen color="dark:text-white text-black" classes="m-auto" />
      ) : (
        <SvgMenuIcon color="dark:text-white text-black" classes="m-auto" />
      )}
    </div>
  );
};
