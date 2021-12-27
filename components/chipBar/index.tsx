import React, { useEffect, useState } from "react";
import styles from "@modules/chipbar.module.css";
import { Chip } from "./chip";
import { chipArray } from "@constants/chipArray";
import { useSelectedTag } from "@providers/tags/selectedTagContext";

export interface CategoryChip {
  label: string;
  id: number;
}

const ChipBar = () => {
  const [selected, setSelected] = useState<string | undefined>();
  const [tag] = useSelectedTag();

  const handleSelected = (chipLabel: string) => {
    if (selected === chipLabel) {
      setSelected(undefined);
      return;
    }
    setSelected(chipLabel);
  };

  useEffect(() => {
    if (selected !== tag) {
      setSelected(tag);
    }
  }, [selected, tag]);

  return (
    <>
      <div
        className={`h-6 mb-6 flex overflow-auto whitespace-nowrap scrollbar-visibility-none ${styles.chipbar}`}
      >
        {chipArray.map((chip) => {
          return (
            <Chip
              selected={selected === chip.label ? true : false}
              onClick={() => handleSelected(chip.label)}
              setSelected={setSelected}
              chipLabel={chip.label}
              key={chip.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default ChipBar;

// const ToggleButton = (props: IButtonProps) =>{
//   const [number, setNumber] = useState<number>();

//   const buttons = [1,2,3,4,5];

//   return (
//   <FixtureWrapper>
//     {
//     buttons.map( num => {

//       return (
//         <div>
//         <h4>Button {num}</h4>
//         <Button
//         color="infoMain"
//         variant="ghost"
//         selected={num === number}
//         onClick={
//           ()=> setNumber(num)}>
//             {num === number ? 'Selected!' : 'Select'}
//         </Button>
//         </div>
//       )

//     })

//     }
