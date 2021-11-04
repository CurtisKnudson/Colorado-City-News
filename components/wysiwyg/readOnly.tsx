import React, { useState, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";

const ReadOnly = ({ content }: { content: Descendant[] }) => {
  const [value, setValue] = useState<Descendant[]>(content);
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);
  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable readOnly />
    </Slate>
  );
};

export default ReadOnly;
