import React, { useState } from "react";
import makeContextHook from "hooks/makeContextHooks";
import { InputData } from "types/editor/inputData";

export const context = React.createContext<
  [InputData, React.Dispatch<React.SetStateAction<InputData>>] | undefined
>(undefined);
export const useEditorInputData = makeContextHook(context);

const EditorInputDataContext: React.FC = ({ children }) => {
  const [inputData, setInputData] = useState<InputData>({
    title: "",
    subTitle: "",
    image: "",
    readTime: "",
  });

  return (
    <context.Provider value={[inputData, setInputData]}>
      {children}
    </context.Provider>
  );
};

export default EditorInputDataContext;
