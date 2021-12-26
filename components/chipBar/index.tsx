import React from "react";
import styles from "@modules/chipbar.module.css";
import { Chip } from "./chip";

export interface CategoryChip {
  name: string;
  id: number;
}

const ChipBar = () => {
  const chipArray: CategoryChip[] = [
    { name: "Bulletin", id: 1 },
    { name: "Hildale", id: 2 },
    { name: "Centennial Park", id: 3 },
    { name: "Bee's", id: 4 },
    { name: "School", id: 5 },
    { name: "Jobs", id: 6 },
    { name: "Colorado City", id: 7 },
    { name: "WorldNews", id: 8 },
  ];

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
