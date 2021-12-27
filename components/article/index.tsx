import React from "react";
import Image from "next/image";
import Link from "next/link";
import SlateEditor from "@components/wysiwyg/editor";
import { DynamicArticleProps } from "pages/article/[id]";
import styles from "@modules/chipbar.module.css";

const Article = ({ article, author }: DynamicArticleProps) => {
  const { name, profileUrl, image } = author;
  return (
    <>
      <div>
        <Image
          src={article.image}
          width={1800}
          height={1200}
          layout="responsive"
          alt="Article Header Image"
          priority
        />
      </div>
      <div className="m-4">
        <div className="flex flex-col">
          {article.tags && (
            <div
              className={`flex overflow-auto whitespace-nowrap scrollbar-visibility-none ${styles.chipbar}`}
            >
              {article.tags.map((tag: string, index) => {
                return (
                  <span
                    key={index}
                    className="font-lfBold uppercase text-xs pr-2"
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}

          <span className="h3Headline leading-tight my-4">{article.title}</span>
          <span className="text-black-60 subtitle2 my-2">
            {article.subTitle}
          </span>
          <AuthorCard name={name} image={image} profileUrl={profileUrl} />
        </div>
      </div>
      <div className="mx-4 mt-8">
        <SlateEditor content={article.content} readOnly />
      </div>
      <hr className="mx-4 mt-8" />
    </>
  );
};

export default Article;

export const AuthorCard = ({
  name,
  image,
  profileUrl,
}: {
  name: string;
  image: string;
  profileUrl: string;
}) => {
  return (
    <div className="flex items-center mt-4">
      <Image
        src={image}
        alt="Author Image"
        width={48}
        height={48}
        className="rounded"
      />
      <span className="mx-4 subtitle2">
        <span className="text-gray-600">by</span>
        <span className=" text-lg border-b-2 font-bold border-gray-600 mx-2 cursor-pointer">
          <Link href={`/user/${profileUrl}`}>{name}</Link>
        </span>
      </span>
    </div>
  );
};
