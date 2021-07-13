import React from "react";
import styles from "@modules/chipbar.module.css";

export const Chip = (props: { chip: { name: string; id: number } }) => {
  const { chipDots } = styles;
  const { chip } = props;
  return (
    <>
      <div
        className={`mr-2 flex items-center justify-between font-lbRegular`}
        key={chip.id}
      >
        <span className="pr-2">#{chip.name}</span>
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
