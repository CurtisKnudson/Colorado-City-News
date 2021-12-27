import { chipArray } from "@constants/chipArray";
import * as React from "react";
import { EditorChip } from "./chip";

import styles from "@modules/chipbar.module.css";

export const EditorChipBar = () => {
  return (
    <>
      <div className="my-2">Select Tag(s):</div>
      <div
        className={`h-6 mb-6 flex overflow-auto whitespace-nowrap scrollbar-visibility-none ${styles.chipbar}`}
      >
        {chipArray.map((chip) => {
          return <EditorChip chipLabel={chip.label} key={chip.id} />;
        })}
      </div>
    </>
  );
};
