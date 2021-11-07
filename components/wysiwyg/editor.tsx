import * as React from "react";
import { useMemo, useState, useCallback, useEffect } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { CustomEditor } from "components/wysiwyg/customEditor";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const Editor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const initialValue: CustomElement[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

  const [value, setValue] = useState<Descendant[]>(initialValue);

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
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);

        // Save the value to Local Storage.
        let content = JSON.stringify(value);
        localStorage.setItem("content", content);
      }}
    >
      <div className="border border-black ">
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          // Replace the `onKeyDown` logic with our new commands.
          switch (event.key) {
            case "`": {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            }

            case "b": {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

export const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export const DefaultElement = (props: any) => {
  return (
    <p className="body1-light opacity-60 tracking-wide " {...props.attributes}>
      {props.children}
    </p>
  );
};

export const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

export default Editor;
