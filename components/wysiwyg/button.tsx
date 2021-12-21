import React, { forwardRef, PropsWithChildren } from "react";

interface BaseProps {
  className?: string;
  [key: string]: unknown;
}

// eslint-disable-next-line react/display-name
export const Button = forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: any
  ) => (
    <span
      {...props}
      ref={ref}
      className={`${className} ${
        reversed
          ? active
            ? "text-active"
            : "text-gray-400"
          : active
          ? "text-black"
          : "text-gray-300"
      } cursor-pointer`}
    />
  )
);
