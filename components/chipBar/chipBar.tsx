import React from "react";
import styles from "@modules/chipbar.module.css";
import { Chip } from ".";

// Eventually this will randomy generate Chips to select, in the meantime I will hard code.

const chipArray = [
  { name: "TechDesign", id: 1 },
  { name: "Reform", id: 2 },
  { name: "Politics", id: 3 },
  { name: "Health", id: 4 },
  { name: "Fitness", id: 5 },
  { name: "Education", id: 6 },
  { name: "Finance", id: 7 },
  { name: "WorldNews", id: 8 },
];
export const ChipBar = () => {
  return (
    <>
      <div
        className={`h-12 flex overflow-auto whitespace-nowrap scrollbar-visibility-none ${styles.chipbar}`}
      >
        {chipArray.map((chip) => {
          return <Chip chip={chip} key={chip.id} />;
        })}
      </div>
    </>
  );
};
