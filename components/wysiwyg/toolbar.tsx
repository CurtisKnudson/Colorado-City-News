import * as React from "react";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

// eslint-disable-next-line react/display-name
export const Toolbar = React.forwardRef(
  ({ className, ...props }: React.PropsWithChildren<BaseProps>, ref: any) => (
    <Menu {...props} ref={ref} className={`${className} my-4`} />
  )
);

// eslint-disable-next-line react/display-name
export const Menu = React.forwardRef(
  ({ className, ...props }: React.PropsWithChildren<BaseProps>, ref: any) => (
    <div {...props} ref={ref} className={` ${className} flex justify-around`} />
  )
);
