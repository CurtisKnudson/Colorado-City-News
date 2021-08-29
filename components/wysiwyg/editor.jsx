import * as React from "react";
import { useMemo, useState, useCallback } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { CustomEditor } from "components/wysiwyg/customEditor";
import { useSaveToMongo } from "@utils/saveToMongo";
import { useSession } from "next-auth/client";
import Link from "next/link";

const Editor = () => {
  const [session] = useSession();
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);
  const content = JSON.stringify(value);

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
    <>
      {session && (
        <>
          <div>Editor</div>
          <div>Title</div>
          <Slate
            editor={editor}
            value={value}
            onChange={(value) => {
              setValue(value);

              // Save the value to Local Storage.

              localStorage.setItem("content", content);
            }}
          >
            <div>
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
          <div onClick={() => useSaveToMongo(value)}>Save</div>
        </>
      )}
      {!session && (
        <>
          <div>You must be signed in to access the editor</div>
          <Link href="/">Return To Home</Link>
        </>
      )}
    </>
  );
};

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props) => {
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
