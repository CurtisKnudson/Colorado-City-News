import React, { ChangeEventHandler } from "react";
import Link from "next/link";
import SlateEditor from "@components/wysiwyg/editor";
import { Layout } from "@components/layout";
import { useSession } from "next-auth/react";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { useUserProfileContext } from "@providers/profile";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { EditorChipBar } from "@components/chipBar/editorChipBar";
import { useEditorInputData } from "@providers/editor/editorInputContext";
import { Article } from "types/article";
import Loading from "@components/loading";

const EditorView = () => {
  const { data: session, status } = useSession({
    required: true,
  });
  const mediator = useMediator();
  const [userProfileData] = useUserProfileContext();
  const [inputData, setInputData] = useEditorInputData();

  const handlePublish = () => {
    const article: Article = {
      id: uuidv4(),
      author: userProfileData.name,
      authorId: userProfileData.userId,
      date: new Date(),
      url: inputData.title
        .trim()
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase(),
      ...inputData,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      content: JSON.parse(window!.localStorage!.getItem!("content")!),
    };
    window.localStorage.removeItem("content");

    toast.promise(mediator.publishArticle(article), {
      pending: "Please wait...",
      success: "Your article has been submitted for review!",
      error: "There was an error 🤯. Have all inputs been filled out?",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  console.log(session);
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <Layout>
      {session?.user.isWriter ? (
        <>
          <div className="flex flex-col">
            <EditorInput
              placeholder="Title"
              name="title"
              value={inputData.title}
              handleChange={handleChange}
            />
            <EditorInput
              placeholder="SubTitle"
              name="subTitle"
              value={inputData.subTitle}
              handleChange={handleChange}
            />
            <EditorInput
              placeholder="Image Url 1800x1200"
              name="image"
              value={inputData.image}
              handleChange={handleChange}
            />
            <EditorInput
              placeholder="Estimate read time"
              name="readTime"
              value={inputData.readTime}
              handleChange={handleChange}
            />
            <EditorChipBar />
          </div>

          <SlateEditor />

          <hr className="mt-4" />
          <button
            className="border cursor-pointer mt-8"
            onClick={handlePublish}
          >
            PUBLISH
          </button>
        </>
      ) : (
        <div className="center-all flex flex-col h-screen pb-32">
          <div>
            You must be an Author with Colorado City News to access the editor
          </div>
          <Link href="/" passHref>
            <a className="underline accent mt-8">Return To Home</a>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export const EditorInput = ({
  placeholder,
  name,
  value,
  handleChange,
}: {
  placeholder: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <div className="flex items-center my-2">
      <input
        className=" w-full focus:outline-none text-xl "
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default EditorView;
