import React from "react";
import styles from "@modules/chipbar.module.css";
import { Chip } from "./chip";
import { chipArray } from "@constants/chipArray";

export interface CategoryChip {
  name: string;
  id: number;
}

const ChipBar = () => {
  return (
    <>
      <div
        className={`h-6 mb-6 flex overflow-auto whitespace-nowrap scrollbar-visibility-none ${styles.chipbar}`}
      >
        {chipArray
          .map((chip) => ({ ...chip, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map((chip) => {
            return <Chip name={chip.name} key={chip.id} />;
          })}
      </div>
    </>
  );
};

export default ChipBar;
