import { SvgProps } from "types/SvgIconProps";

export const SvgSearchIcon = (props: SvgProps) => {
  const { dimensions, color, classes } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${dimensions ? dimensions : "h-6 w-6"}, ${
        color ? color : ""
      }, ${classes ? classes : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};
