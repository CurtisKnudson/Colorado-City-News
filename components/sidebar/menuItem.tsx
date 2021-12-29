import * as React from "react";
import Link from "next/link";
import { useState } from "react";

export interface MenuItemProps {
  url: string;
  label: string;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  selected: boolean;
  onClick: any;
  subNavItem?: {
    label: string;
  }[];
}

export const MenuItem = ({
  url,
  label,
  setNavOpen,
  className,
  onClick,
  selected,
  subNavItem,
}: MenuItemProps) => {
  const [subNavOpen, setSubNavOpen] = useState(false);

  const handleSubNavOpen = () => {
    setSubNavOpen(!subNavOpen);
  };
  return (
    <>
      <div
        className={`${
          className ? className : ""
        } mt-4 grid grid-cols-12 select-none`}
        onClick={() => {}}
      >
        {subNavItem ? (
          <div className="col-start-2">
            {subNavOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-5 pt-1 opacity-60 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={handleSubNavOpen}
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-5 pt-1 opacity-60 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={handleSubNavOpen}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        ) : null}
        <Link href={url} passHref>
          <a
            className={`${
              selected ? "font-extrabold" : ""
            } col-start-3 text-xl `}
            onClick={() => {
              onClick();
              setNavOpen(false);
            }}
          >
            {label}
          </a>
        </Link>
      </div>
      <div className={`accordion-panel ${subNavOpen ? "max-h-32" : "max-h-0"}`}>
        {subNavItem && (
          <>
            {subNavItem.map((item, index) => {
              return (
                <div className="mt-3 grid grid-cols-12 text-xl" key={index}>
                  <div className="col-start-3">-</div>
                  <div className="col-start-4">{item.label}</div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
