import SlateEditor from "@components/wysiwyg/editor";
import { Layout } from "@components/layout";
import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import ArticleContext, { useArticleContext } from "@providers/article";
import { useMediator } from "@mediator/providers/mediators/mediatorProvider";
import { useUserProfileContext } from "@providers/profile";

const EditorView = () => {
  const { data: session } = useSession();
  const mediator = useMediator();
  const [articleData, setArticleData] = useArticleContext();
  const [userProfileData] = useUserProfileContext();

  const handlePublish = () => {
    setArticleData({
      ...articleData,
      author: userProfileData.name,
      date: new Date().toLocaleDateString(),
      url: articleData.title.replace(/\s+/g, "-").toLowerCase(),
    });
    let article = {
      ...articleData,
      author: userProfileData.name,
      date: new Date().toLocaleDateString(),
      content: JSON.parse(window!.localStorage!.getItem!("content")!),
      url: articleData.title.replace(/\s+/g, "-").toLowerCase(),
    };

    mediator.publishArticle(article, userProfileData.email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setArticleData({
      ...articleData,
      [name]: value,
    });
    window.localStorage.setItem(name, value);
  };

  return (
    <ArticleContext>
      <Layout>
        {session ? (
          <>
            <div className="flex flex-col">
              <EditorInput
                placeholder="Title"
                name="title"
                value={articleData.title}
                handleChange={handleChange}
              />
              <EditorInput
                placeholder="SubTitle"
                name="subTitle"
                value={articleData.subTitle}
                handleChange={handleChange}
              />
              <EditorInput
                placeholder="Image Url"
                name="image"
                value={articleData.image}
                handleChange={handleChange}
              />
              <EditorInput
                placeholder="Estimate read time"
                name="readTime"
                value={articleData.readTime}
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
        <button className=" border cursor-pointer " onClick={handlePublish}>
          PUBLISH
        </button>
      </Layout>
    </ArticleContext>
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
  const [articleData, setArticleData] = useArticleContext();

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

export const EditorWrapper = () => {
  return (
    <ArticleContext>
      <EditorView />
    </ArticleContext>
  );
};

export default EditorWrapper;
