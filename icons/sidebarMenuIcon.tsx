export interface SvgProps {
  dimensions?: string;
  color?: string;
}

export const SvgMenuIcon = (props: SvgProps) => {
  const { dimensions, color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${dimensions ? dimensions : "h-6 w-6"}`}
      fill={`${color ? color : "none"}`}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};
