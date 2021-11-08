import * as React from "react";
import { useMemo, useState, useCallback } from "react";
import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
} from "slate";
import { Editable, Slate, useSlate, withReact } from "slate-react";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { CustomEditor } from "components/wysiwyg/customEditor";
import { withHistory } from "slate-history";
import { Toolbar } from "./toolbar";
import { Button } from "./button";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const SlateEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

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
      <Toolbar>
        <MarkButton format="bold" />
        <MarkButton format="italic" />
        <MarkButton format="underline" />
        <MarkButton format="code" />
        <BlockButton format="heading-one" />
        <BlockButton format="heading-two" />
        <BlockButton format="block-quote" />
        <BlockButton format="numbered-list" />
        <BlockButton format="bulleted-list" />
      </Toolbar>
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

/* jshint ignore:start */

// @ts-ignore
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  // @ts-ignore
  Transforms.unwrapNodes(editor, {
    // @ts-ignore
    match: (n) =>
      // @ts-ignore
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  // @ts-ignore
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    // @ts-ignore
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor: BaseEditor & ReactEditor, format: any) => {
  const { selection } = editor;
  if (!selection) return false;
  // @ts-ignore
  const [match] = Editor.nodes(editor, {
    // @ts-ignore
    at: Editor.unhangRange(editor, selection),
    // @ts-ignore
    match: (n) =>
      // @ts-ignore
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor: BaseEditor & ReactEditor, format: any) => {
  const marks = Editor.marks(editor);
  // @ts-ignore
  return marks ? marks[format] === true : false;
};

const BlockButton = ({ format }: any) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      // @ts-ignore
      onMouseDown={(event) => {
        event.preventDefault();

        toggleBlock(editor, format);
      }}
    >
      <div>B</div>
    </Button>
  );
};

const toggleMark = (editor: BaseEditor & ReactEditor, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const MarkButton = ({ format }: { format: any }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      // @ts-ignore
      onMouseDown={(event) => {
        event.preventDefault();

        toggleMark(editor, format);
      }}
    >
      <div>M</div>
    </Button>
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

export default SlateEditor;
