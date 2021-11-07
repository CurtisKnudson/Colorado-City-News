import React, { useState, useMemo, useCallback } from "react";
import { createEditor, Descendant, BaseEditor } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { CodeElement, DefaultElement, Leaf } from "./editor";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const ReadOnly = ({ content }: { content: CustomElement[] }) => {
  const [value, setValue] = useState<Descendant[]>(content);
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck="false"
        autoCorrect="false"
        autoCapitalize="false"
      />
    </Slate>
  );
};

export default ReadOnly;
