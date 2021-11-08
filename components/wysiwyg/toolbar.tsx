import * as React from "react";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

export const Toolbar = React.forwardRef(
  ({ className, ...props }: React.PropsWithChildren<BaseProps>, ref: any) => (
    <Menu
      {...props}
      ref={ref}
      className={`${className} relative pt-0.5 px-4 pb-4 border border-b-2 mb-5`}
    />
  )
);

export const Menu = React.forwardRef(
  ({ className, ...props }: React.PropsWithChildren<BaseProps>, ref: any) => (
    <div {...props} ref={ref} className={` ${className} inline-block ml-4`} />
  )
);
