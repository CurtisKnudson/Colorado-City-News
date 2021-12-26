import React from "react";
import styles from "@modules/chipbar.module.css";

export const Chip = ({ name }: { name: string }) => {
  const { chipDots } = styles;
  return (
    <>
      <div className={`mr-2 flex items-center justify-between font-lbRegular`}>
        <span className="pr-2">#{name}</span>
        <span className="flex justify-center flex-col ">
          <span className={chipDots} />
          <span className={chipDots} />
          <span className={chipDots} />
          <span className={chipDots} />
        </span>
      </div>
    </>
  );
};
