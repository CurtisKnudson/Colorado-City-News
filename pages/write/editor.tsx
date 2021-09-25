import Editor from "@components/wysiwyg/editor";
import { Layout } from "@components/layout";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";

// https://picsum.photos/1080/1080

const EditorView = () => {
  const { data: session } = useSession();
  return (
    <Layout>
      {session ? (
        <>
          <div className="flex flex-col">
            <EditorInput placeholder="Title" name="title" />
            <EditorInput placeholder="SubTitle" name="subtitle" />
            <EditorInput placeholder="Image Url" name="url" />
          </div>

          <Editor />
        </>
      ) : (
        <>
          <div>You must be signed in to access the editor</div>
          <Link href="/">Return To Home</Link>
        </>
      )}
    </Layout>
  );
};

export const EditorInput = ({
  placeholder,
  name,
}: {
  placeholder: string;
  name: string;
}) => {
  return (
    <div className="flex items-center">
      <input
        className=" w-full focus:outline-none text-xl "
        type="text"
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default EditorView;
