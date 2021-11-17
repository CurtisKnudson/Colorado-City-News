import React, { useState } from "react";
import Link from "next/link";
import SlateEditor from "@components/wysiwyg/editor";
import { Layout } from "@components/layout";
import { useSession } from "next-auth/react";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { useUserProfileContext } from "@providers/profile";
import { toast } from "react-toastify";

export interface InputData {
  title: string;
  subTitle: string;
  image: string;
  readTime: string;
}

const EditorView = () => {
  const { data: session } = useSession();
  const mediator = useMediator();
  const [userProfileData] = useUserProfileContext();
  const [inputData, setInputData] = useState<InputData>({
    title: "",
    subTitle: "",
    image: "",
    readTime: "",
  });

  const handlePublish = () => {
    let article = {
      ...inputData,
      author: userProfileData.name,
      date: new Date(),
      content: JSON.parse(window!.localStorage!.getItem!("content")!),
      url: inputData.title.replace(/\s+/g, "-").toLowerCase(),
    };
    if (
      !article.title ||
      !article.subTitle ||
      !article.image ||
      !article.readTime
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    toast.promise(mediator.publishArticle(article, userProfileData.email), {
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

  return (
    <Layout>
      {session ? (
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
          </div>

          <SlateEditor />
        </>
      ) : (
        <>
          <div>You must be signed in to access the editor</div>
          <Link href="/">Return To Home</Link>
        </>
      )}
      <button className="border cursor-pointer" onClick={handlePublish}>
        PUBLISH
      </button>
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
  value: any;
  handleChange: any;
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
