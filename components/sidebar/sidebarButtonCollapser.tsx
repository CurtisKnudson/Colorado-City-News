import { SvgMenuIcon } from "icons";

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
        console.log("clicked");
      }}
    >
      <SvgMenuIcon color="text-white" />;
    </div>
  );
};
