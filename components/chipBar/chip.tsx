import React, { useState } from "react";
import styles from "@modules/chipbar.module.css";
import { useEditorInputData } from "@providers/editor/editorInputContext";

export interface EditorChipProps {
  chipLabel: string;
}

export const Chip = ({ chipLabel }: { chipLabel: string }) => {
  const { chipDots } = styles;
  return (
    <>
      <div className={`mr-2 flex items-center justify-between font-lbRegular`}>
        <span className="pr-2">#{chipLabel}</span>
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

export const EditorChip = ({ chipLabel }: EditorChipProps) => {
  const { chipDots } = styles;
  const [selected, setSelected] = useState<boolean>(false);
  const [inputData, setInputData] = useEditorInputData();

  const handleSelected = () => {
    if (!inputData.tags) {
      setInputData({
        ...inputData,
        tags: [chipLabel],
      });
    }
    if (!inputData.tags?.includes(chipLabel)) {
      inputData.tags?.push(chipLabel);
    } else {
      inputData.tags.splice(inputData.tags.indexOf(chipLabel), 1);
    }
    setSelected(!selected);
  };
  console.log(inputData);
  return (
    <>
      <div
        className={`mr-2 flex items-center justify-between font-lbRegular ${
          selected ? "accent" : ""
        }`}
        onClick={handleSelected}
      >
        <span className="pr-2">#{chipLabel}</span>
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
